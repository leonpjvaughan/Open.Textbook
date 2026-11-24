"""The print rules must target the shell that actually ships.

When MkDocs was deleted, every `@media print` rule kept hiding Material's class
names — `.md-header`, `.md-sidebar`, `.md-search` — which the bespoke shell does
not emit. Nothing failed: the stylesheet still parsed, the tests still passed,
and item 12's claim that "printing a Walkthrough gives a readable page without
the sidebar" quietly became false. Printing a page included the masthead, the
sidebar and the search box.

That is the failure this guards. A hide-list is a claim about markup, so it is
checked against the markup.
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
from pathlib import Path

import pytest

from textbook.book import default_layout, load_collection, repo_root

ROOT = repo_root()
EXTRA_CSS = ROOT / "assets" / "stylesheets" / "extra.css"
PAGE = ROOT / "engine" / "src" / "textbook" / "templates" / "page.html"
PORTAL = ROOT / "engine" / "src" / "textbook" / "templates" / "portal.html"
SITE = ROOT / "site"
LEARN_ROUTE = "/gcse-maths/higher/chapter-1/section-1.1/learn/"
PRINT_OUT = ROOT / "var" / "print-render"

SHEET_HEIGHT_PX = 1026.0

PLAYWRIGHT_CANDIDATES = (
    "playwright",
    "/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright",
)

CLASS = re.compile(r"\.([a-zA-Z][\w-]*)")


def print_block() -> str:
    """The `@media print` block from `extra.css`, or nothing."""
    css = EXTRA_CSS.read_text(encoding="utf-8")
    start = css.index("@media print")
    depth, index = 0, start
    while index < len(css):
        if css[index] == "{":
            depth += 1
        elif css[index] == "}":
            depth -= 1
            if depth == 0:
                return css[start : index + 1]
        index += 1
    raise AssertionError("the @media print block is never closed")


def hidden_classes() -> set[str]:
    """The classes the print block switches off."""
    block = print_block()
    inner = re.sub(r"/\*.*?\*/", "", block, flags=re.S)
    # Then strip the `@media print {` wrapper: otherwise the first `{` a rule
    inner = inner[inner.index("{") + 1 : inner.rindex("}")]
    hidden: set[str] = set()
    for rule in inner.split("}"):
        if "display: none" in rule and "{" in rule:
            selectors = rule.split("{", 1)[0]
            hidden.update(CLASS.findall(selectors))
    return hidden


def test_the_print_block_hides_something():
    assert hidden_classes(), (
        "the @media print block hides nothing; printing a page now includes the "
        "masthead and the sidebar"
    )


def test_each_hidden_class_exists_in_the_shell():
    """Every hidden class must be emitted by a template, not only named here.

    `.bk-fab`/`.bk-panel` are injected by the booklet widget and styled in
    `extra.css` outside the print block, so the check is "named somewhere other
    than the rule that hides it".
    """
    shell = PAGE.read_text(encoding="utf-8") + PORTAL.read_text(encoding="utf-8")
    css = EXTRA_CSS.read_text(encoding="utf-8")
    outside = css.replace(print_block(), "")

    orphans = sorted(
        name
        for name in hidden_classes()
        if f'"{name}' not in shell
        and f" {name}" not in shell
        and f'class="{name}' not in shell
        and f".{name}" not in outside
    )
    assert not orphans, (
        "the print block hides classes the shell does not emit, so printing "
        "leaves them on the page: "
        + ", ".join(f".{name}" for name in orphans)
    )


def test_the_print_block_does_not_name_the_deleted_renderer():
    """Material's classes are the specific mistake this file exists for."""
    material_only = {".md-header", ".md-sidebar", ".md-search", ".md-footer"}
    present = {f".{name}" for name in hidden_classes()}
    stale = sorted(present & material_only)
    assert not stale, (
        "the print block still hides Material's classes, which the bespoke shell "
        f"never emits: {', '.join(stale)}. Printing is no longer covered."
    )


def _playwright_path() -> str | None:
    """Resolve an absolute path to Playwright so a script under /tmp can require it."""
    for candidate in (os.environ.get("PLAYWRIGHT_PATH"), *PLAYWRIGHT_CANDIDATES):
        if not candidate:
            continue
        result = subprocess.run(
            ["node", "-e", f"console.log(require.resolve({json.dumps(candidate)}))"],
            capture_output=True, text=True, check=False, cwd=str(ROOT),
        )
        if result.returncode == 0 and result.stdout.strip():
            return result.stdout.strip()
    return None


PRINT_SCRIPT = r"""
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const [siteDir, route, outDir, injectCss, style] = process.argv.slice(2);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".wasm": "application/wasm",
};

const browser = await (async () => {
  try { return await chromium.launch({ headless: true, channel: "chrome" }); }
  catch { return await chromium.launch({ headless: true }); }
})();

const context = await browser.newContext({
  viewport: { width: 794, height: 1123 },
  serviceWorkers: "block",
});
if (style) {
  await context.addInitScript((id) => localStorage.setItem("textbooks:style", id), style);
}
await context.route("http://print.test/**", async (r) => {
  const url = new URL(r.request().url());
  let rel = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  if (!rel || rel.endsWith("/")) rel += "index.html";
  const file = path.join(siteDir, rel);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    return r.fulfill({ status: 404, body: "not found" });
  }
  const ext = path.extname(file).toLowerCase();
  return r.fulfill({
    status: 200,
    contentType: MIME[ext] || "application/octet-stream",
    body: fs.readFileSync(file),
  });
});

const page = await context.newPage();
await page.goto("http://print.test" + route, { waitUntil: "load" });
await page.waitForFunction(
  () => {
    const figs = [...document.querySelectorAll("maths-figure")];
    return figs.length > 0 && figs.every((f) => f.querySelector("svg, canvas, .fig"));
  },
  { timeout: 8000 },
);
await page.waitForTimeout(80);
if (injectCss) {
  await page.addStyleTag({ content: injectCss });
}
await page.emulateMedia({ media: "print" });
await page.waitForTimeout(40);

if (outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  await page.pdf({ path: path.join(outDir, "learn-print.pdf"), format: "A4", printBackground: true });
  await page.screenshot({ path: path.join(outDir, "learn-print.png"), fullPage: true });
}

const report = await page.evaluate(() => {
  const SKIP_TAGS = new Set(["style", "defs", "title", "desc", "script", "clippath", "mask", "marker"]);
  const chrome = {};
  for (const sel of [".masthead", ".sidebar", ".search", ".nav-drawer"]) {
    const el = document.querySelector(sel);
    chrome[sel] = el ? getComputedStyle(el).display : null;
  }
  const figures = [...document.querySelectorAll("maths-figure")].map((fig) => {
    const box = fig.getBoundingClientRect();
    const hidden = [];
    for (const el of fig.querySelectorAll("*")) {
      const tag = el.tagName.toLowerCase();
      if (SKIP_TAGS.has(tag)) continue;
      if (el.hasAttribute("hidden") || el.classList.contains("fig-hidden")) continue;
      if (getComputedStyle(el).display === "none") {
        hidden.push(tag + (el.className ? "." + String(el.className.baseVal ?? el.className).trim() : ""));
      }
    }
    return {
      slug: fig.dataset.figure || "",
      width: Math.round(box.width * 10) / 10,
      height: Math.round(box.height * 10) / 10,
      hidden,
    };
  });
  return { chrome, figures, style: document.documentElement.dataset.style || "" };
});

await browser.close();
console.log(JSON.stringify(report));
"""


def _run_print_probe(
    tmp_path: Path, out_dir: Path | None, inject_css: str = "", style: str = ""
) -> dict:
    if shutil.which("node") is None:
        pytest.skip("node is not on PATH; the browser print check cannot run")
    target = SITE / LEARN_ROUTE.strip("/") / "index.html"
    if not target.is_file():
        pytest.skip("site/ is not built; run `uv run python -m textbook.pipeline` first")
    module = _playwright_path()
    if module is None:
        pytest.skip("playwright is not installed; set PLAYWRIGHT_PATH")

    script = tmp_path / "print-check.mjs"
    script.write_text(PRINT_SCRIPT, encoding="utf-8")
    result = subprocess.run(
        ["node", str(script), str(SITE), LEARN_ROUTE, str(out_dir) if out_dir else "", inject_css, style],
        capture_output=True, text=True, check=False, cwd=str(ROOT),
        env={**os.environ, "PLAYWRIGHT_PATH": module},
    )
    assert result.returncode == 0, f"print probe failed:\n{result.stdout}\n{result.stderr}"
    return json.loads(result.stdout)


@pytest.mark.browser
@pytest.mark.parametrize("style", [str(entry["id"]) for entry in load_collection().get("layouts", [])])
def test_a_learn_page_prints_its_figures_intact(tmp_path, style):
    """Render a real Learn page under `@media print`, in every layout, and judge its figures.

    Saves the judged PDF and PNG for the default layout under `var/print-render/`
    (git-ignored) so a human can inspect what the browser actually laid out on paper.
    """
    keep = style == default_layout()
    data = _run_print_probe(tmp_path, PRINT_OUT if keep else None, style=style)
    assert data["style"] == style, f"the page applied {data['style']}, not {style}"
    if keep:
        assert (PRINT_OUT / "learn-print.pdf").stat().st_size > 0
        assert (PRINT_OUT / "learn-print.png").stat().st_size > 0

    for sel, display in data["chrome"].items():
        if display is not None:
            assert display == "none", f"{sel} was not hidden in print (display: {display})"

    assert data["figures"], f"expected at least one mounted figure on {LEARN_ROUTE}"
    for fig in data["figures"]:
        assert fig["width"] > 0 and fig["height"] > 0, (
            f"figure {fig['slug']!r} collapsed to zero box in print: {fig}"
        )
        assert not fig["hidden"], (
            f"figure {fig['slug']!r} had parts hidden with display:none in print: {fig['hidden']}"
        )
        assert fig["height"] <= SHEET_HEIGHT_PX, (
            f"figure {fig['slug']!r} is {fig['height']}px tall in print, exceeding one A4 sheet "
            f"({SHEET_HEIGHT_PX}px) so the paginator will split it despite break-inside: avoid"
        )


@pytest.mark.browser
def test_a_rule_hiding_a_figure_part_in_print_is_caught(tmp_path):
    """Guard the guard: a print rule that hides a figure's SVG must be reported."""
    data = _run_print_probe(
        tmp_path, None, inject_css="@media print { maths-figure svg { display: none !important; } }"
    )
    assert any(fig["hidden"] for fig in data["figures"]), (
        "injecting `display: none` on `maths-figure svg` in print was not reported"
    )
