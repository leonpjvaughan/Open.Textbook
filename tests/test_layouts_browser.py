"""A page is complete without its layout, and every layout survives the widest font.

A layout is geometry over one DOM, so two promises hold or the seam is a lie:

* **bare** — with `layouts.css` answered empty, the portal, a book's home and a Learn
  page still show every heading, link and list item in `main`, and nothing is wider
  than a 390px screen. The base sheets are the page; a layout only arranges it.
* **widest font** — a bundle owns the font families, and a monospaced one is far wider
  per character than the sans-serif a layout is drawn against. For each layout, the
  bundle whose body, display and mono `ch` sum widest in the browser must not push any
  of those pages
  wider than the screen at 390 or 1280, in either scheme.

Browser tests over a built `site/`, skipped where the site or Playwright is absent.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
from pathlib import Path

import pytest

from textbook.book import load_collection, repo_root

ROOT = repo_root()
SITE = ROOT / "site"
LAYOUTS_DIR = ROOT / "assets" / "stylesheets" / "layouts"
BROWSER_LIB = ROOT / "tools" / "dist" / "lib" / "browser.js"
ROUTES = (
    "/",
    "/gcse-maths/higher/",
    "/gcse-maths/higher/chapter-1/section-1.1/learn/",
)

PLAYWRIGHT_CANDIDATES = (
    "playwright",
    "/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright",
)

pytestmark = pytest.mark.browser

SCRIPT = r"""
import { pathToFileURL } from "node:url";
const [lib, site, mode, payload] = process.argv.slice(2);
const { ORIGIN, launchBrowser, openContext, serveStatic } = await import(pathToFileURL(lib).href);
const { routes, layouts, themes } = JSON.parse(payload);

const browser = await launchBrowser();
const out = [];

async function open({ route, width, scheme = "light", theme, bare = false, layout }) {
  const context = await openContext(browser, { width, height: 900, scheme, theme, blockServiceWorkers: true });
  await serveStatic(context, site);
  if (bare) {
    await context.route(/\/layouts\.[0-9a-f]{8}\.css$/, (r) =>
      r.fulfill({ status: 200, contentType: "text/css", body: "" }));
  }
  const page = await context.newPage();
  await page.goto(ORIGIN + route, { waitUntil: "load" });
  if (layout) await page.evaluate((id) => { document.documentElement.dataset.style = id; }, layout);
  await page.evaluate(() => document.fonts.ready);
  return { context, page };
}

const overflow = () => {
  const root = document.documentElement;
  return Math.max(root.scrollWidth, document.body.scrollWidth) - root.clientWidth;
};

if (mode === "bare") {
  for (const route of routes) {
    const { context, page } = await open({ route, width: 390, bare: true });
    const result = await page.evaluate((overflowSource) => {
      const sheets = [...document.styleSheets].map((s) => s.href || "");
      const layoutLinked = sheets.some((h) => /\/layouts\.[0-9a-f]{8}\.css$/.test(h));
      const layoutRules = [...document.styleSheets]
        .filter((s) => /\/layouts\./.test(s.href || ""))
        .reduce((n, s) => n + s.cssRules.length, 0);
      const missing = [];
      let checked = 0;
      for (const el of document.querySelectorAll("main :is(h1, h2, h3, h4, h5, h6, a, li)")) {
        if (el.closest("[hidden], .visually-hidden, template")) continue;
        const closed = el.closest("details:not([open])");
        if (closed && !el.closest("summary")) continue;
        checked += 1;
        const box = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        if (box.width === 0 || box.height === 0 || style.visibility === "hidden" || style.display === "none") {
          missing.push(`${el.tagName.toLowerCase()}: ${(el.textContent || "").trim().slice(0, 40)}`);
        }
      }
      return { layoutLinked, layoutRules, checked, missing: missing.slice(0, 10), overflow: new Function(`return (${overflowSource})()`)() };
    }, overflow.toString());
    out.push({ route, ...result });
    await context.close();
  }
} else {
  const probe = await open({ route: routes[0], width: 1280 });
  const widths = {};
  for (const theme of themes) {
    widths[theme] = await probe.page.evaluate(async (id) => {
      document.documentElement.setAttribute("data-theme", id);
      await document.fonts.ready;
      let total = 0;
      for (const token of ["--tb-font-body", "--tb-font-display", "--tb-font-mono"]) {
        const span = document.createElement("span");
        span.style.cssText = `position:absolute;visibility:hidden;font-family:var(${token});font-size:16px;white-space:nowrap`;
        span.textContent = "0".repeat(40);
        document.body.append(span);
        await document.fonts.load(`16px ${getComputedStyle(span).fontFamily}`, "0");
        total += span.getBoundingClientRect().width / 40;
        span.remove();
      }
      return total;
    }, theme);
  }
  await probe.context.close();
  const widest = Object.entries(widths).sort((a, b) => b[1] - a[1])[0][0];
  for (const layout of layouts) {
    for (const scheme of ["light", "dark"]) {
      for (const width of [390, 1280]) {
        for (const route of routes) {
          const { context, page } = await open({ route, width, scheme, theme: widest, layout });
          const result = await page.evaluate((overflowSource) => ({
            theme: document.documentElement.getAttribute("data-theme"),
            style: document.documentElement.dataset.style,
            overflow: new Function(`return (${overflowSource})()`)(),
          }), overflow.toString());
          out.push({ layout, scheme, width, route, widest, widths, ...result });
          await context.close();
        }
      }
    }
  }
}

await browser.close();
console.log(JSON.stringify(out));
"""


def _playwright_path() -> str | None:
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


def _run(tmp_path: Path, mode: str) -> list[dict]:
    if shutil.which("node") is None:
        pytest.skip("node is not on PATH; the browser check cannot run")
    for route in ROUTES:
        if not (SITE / route.strip("/") / "index.html").is_file():
            pytest.skip(f"site/ has no {route}; build the portal and gcse-maths first")
    if not BROWSER_LIB.is_file():
        pytest.skip("the tools are not built; run `node tools/build.mjs`")
    module = _playwright_path()
    if module is None:
        pytest.skip("playwright is not installed; set PLAYWRIGHT_PATH")
    payload = {
        "routes": list(ROUTES),
        "layouts": sorted(path.stem for path in LAYOUTS_DIR.glob("*.css")),
        "themes": list(load_collection().get("themes", [])),
    }
    script = tmp_path / "layouts.mjs"
    script.write_text(SCRIPT, encoding="utf-8")
    result = subprocess.run(
        ["node", str(script), str(BROWSER_LIB), str(SITE), mode, json.dumps(payload)],
        capture_output=True, text=True, check=False, cwd=str(ROOT),
        env={**os.environ, "PLAYWRIGHT_PATH": module},
        timeout=600,
    )
    assert result.returncode == 0, f"the measurement failed:\n{result.stdout}\n{result.stderr}"
    return json.loads(result.stdout.strip().splitlines()[-1])


def test_a_page_without_its_layout_is_complete_and_fits_a_phone(tmp_path):
    for found in _run(tmp_path, "bare"):
        route = found["route"]
        assert found["layoutLinked"], f"{route} does not link layouts.css, so this proves nothing"
        assert found["layoutRules"] == 0, f"{route}: layouts.css was not emptied"
        assert found["checked"] > 0, f"{route}: no heading, link or list item in main was checked"
        assert not found["missing"], f"{route} hides content without its layout: {found['missing']}"
        assert found["overflow"] <= 1, (
            f"{route} is {found['overflow']}px wider than a 390px screen without its layout"
        )


def test_every_layout_fits_the_widest_bundle_font(tmp_path):
    results = _run(tmp_path, "widest")
    assert results, "no layout was measured"
    widths = results[0]["widths"]
    assert len({round(w, 2) for w in widths.values()}) > 1, (
        f"every bundle measured the same character width, so the fonts did not load: {widths}"
    )
    for found in results:
        assert found["theme"] == found["widest"], f"the bundle did not apply: {found}"
        assert found["style"] == found["layout"], f"the layout did not apply: {found}"
        assert found["overflow"] <= 1, (
            f"{found['layout']} with {found['widest']} ({found['scheme']}) is "
            f"{found['overflow']}px wider than {found['width']}px on {found['route']}"
        )
