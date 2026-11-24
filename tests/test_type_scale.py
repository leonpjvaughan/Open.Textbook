"""The type and target floors a phone reader depends on.

Nothing asserted a minimum type size or hit target outside a figure: the only floor
in the suite was `audit site --mobile`'s 9px for labels drawn in SVG. So
cards-mode table cells at 12.48px on 1.3 with 0.8px rows, in-page contents links with
15px boxes, and a 13.6px search field all shipped while every gate was green.

Two halves, because they answer different questions:

* **the declarations** (always checked) — the size each stylesheet asks for, read
  from the CSS rather than from a comment, so a regression fails in a second;
* **the computed sizes at 390px** (`browser` marker) — what the reader's browser
  actually lays out, which is the only thing that can catch a cascade surprise.

Floors, and where each number comes from: reading text 16px (the prose is 17px and
iOS zooms a focused field below 16), labels and captions 12px (WCAG's small-text
comfort and the size a `::before` label has to stay above), and the contents link's
box 22px, which is what `line-height: 1.7` buys on 13.6px text.
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
from pathlib import Path

import pytest

from textbook.book import repo_root

ROOT = repo_root()
EXTRA = ROOT / "assets" / "stylesheets" / "extra.css"
SHELL = ROOT / "engine" / "src" / "textbook" / "css" / "shell.css"
SETTINGS = ROOT / "assets" / "stylesheets" / "settings.css"
SITE = ROOT / "site"
REM = 16.0
LEARN = SITE / "gcse-maths" / "higher" / "chapter-1" / "section-1.1" / "learn" / "index.html"
PORTAL = SITE / "index.html"

PLAYWRIGHT_CANDIDATES = (
    "playwright",
    "/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright",
)


def declarations(path: Path, css: str | None = None, prefix: str = ""):
    """(selector, property, value) for every declaration, in file order.

    The media query stays on the selector — `@media (max-width: 48rem) .search
    input` — because a rule's *context* is half of its meaning here: the same size
    is right on a phone and wrong on a desk, and a reader that dropped the query
    would have called the phone rule the global one.
    """
    if css is None:
        css = path.read_text(encoding="utf-8")
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    index = 0
    while index < len(css):
        match = re.search(r"([^{}]*)\{", css[index:])
        if not match:
            return
        selector = " ".join(match.group(1).split())
        start = index + match.end()
        depth, end = 1, start
        while end < len(css) and depth:
            if css[end] == "{":
                depth += 1
            elif css[end] == "}":
                depth -= 1
            end += 1
        body = css[start:end - 1]
        if selector.startswith("@layer"):
            yield from declarations(path, body, prefix)
        elif selector.startswith(("@media", "@supports")):
            yield from declarations(path, body, prefix + selector + " ")
        else:
            for declaration in body.split(";"):
                if ":" not in declaration:
                    continue
                prop, value = declaration.split(":", 1)
                yield (prefix + selector).strip(), prop.strip().lower(), value.strip()
        index = end


def px(value: str) -> float:
    """A CSS length in pixels, for the rem and px values these sheets use."""
    match = re.fullmatch(r"([\d.]+)(rem|px|em)", value.strip())
    assert match, f"cannot read {value!r} as a length"
    number, unit = float(match.group(1)), match.group(2)
    return number * (REM if unit in {"rem", "em"} else 1.0)


def last(path: Path, selector_fragment: str, prop: str) -> str:
    """The last declaration for the rule whose selector *ends* with the fragment.

    Ends rather than contains, because `table--cards td` is a prefix of
    `table--cards td:first-child` — and the heading rule is one step larger, so a
    "contains" lookup would read the heading's size while the values stayed small.
    This is exactly what the planted check caught.
    """
    def matches(selector: str) -> bool:
        return any(part.strip().endswith(selector_fragment) for part in selector.split(","))

    found = [
        value for selector, property_name, value in declarations(path)
        if matches(selector) and property_name == prop
    ]
    assert found, f"no `{prop}` for a rule ending {selector_fragment!r} in {path.name}"
    return found[-1]


def test_the_type_floor_scanner_reads_what_the_sheets_say():
    """Guard the guard: a scanner that finds nothing reports success."""
    assert px(last(EXTRA, ".contents__list", "font-size")) == pytest.approx(13.6)


@pytest.mark.parametrize(
    ("fragment", "prop", "floor_px", "path"),
    [
        ("table--cards td", "font-size", 16.0, EXTRA),
        ("table--cards td::before", "font-size", 12.0, EXTRA),
        ("maths-figure figcaption", "font-size", 12.0, EXTRA),
        ("tb-settings__option-desc", "font-size", 12.0, SETTINGS),
    ],
    ids=["cards-value", "cards-label", "figure-caption", "settings-desc"],
)
def test_no_content_is_declared_below_its_floor(fragment, prop, floor_px, path):
    value = last(path, fragment, prop)
    assert px(value) >= floor_px, (
        f"{path.name}: {fragment} is declared at {value} ({px(value):.1f}px), below "
        f"the {floor_px:.0f}px floor. A phone reader meets this text before any prose."
    )


def test_the_contents_link_box_is_thumb_height():
    """24.5px: `line-height: 1.8` on 13.6px text.

    Measured before this at 1.7, which is 23px — six links on every Learn page under
    WCAG 2.2's 24px target floor, and `tools targets` now fails the gate if they
    return.
    """
    font = px(last(EXTRA, ".contents__list", "font-size"))
    line_height = float(last(EXTRA, ".contents__list", "line-height"))
    assert font * line_height >= 24.0, (
        f"the contents link box is {font * line_height:.1f}px tall "
        f"({font:.1f}px on {line_height}); WCAG 2.2 asks for 24."
    )


def test_a_figure_slider_clears_the_target_floor():
    """The platform draws a range 16px tall; `min-height` gives the thumb 24."""
    height = px(last(EXTRA, 'input[type="range"]', "min-height"))
    assert height >= 24.0, (
        f"a range input is {height:.0f}px tall, under WCAG 2.2's 24px floor"
    )


def test_a_drawer_row_is_a_thumb_target():
    """Up to 335 rows behind one disclosure control, so the row is the target."""
    height = px(last(SHELL, ".nav__link", "min-height"))
    assert height >= 44.0, (
        f"a drawer row is {height:.0f}px tall; the drawer is the phone's navigation "
        "and a row is a thumb target"
    )


def test_the_search_field_is_not_below_sixteen_on_a_phone():
    """Below 16px a focused field makes a phone zoom the page under the thumb."""
    sizes = [
        value for selector, prop, value in declarations(SHELL)
        if prop == "font-size" and "48rem" in selector and ".tb-search__input" in selector
    ]
    assert sizes, "the phone block no longer sets a size for the search field"
    assert px(sizes[-1]) >= 16.0, (
        f"the search field is {sizes[-1]} on a phone; measured before this was fixed: "
        "13.6px, and Safari zooms below 16."
    )


def _playwright_path() -> str | None:
    """The resolved absolute Playwright path this machine can load, or None.

    Returned as an absolute path rather than a bare package name: the measuring
    script lives in pytest's tmp directory, so a bare `require("playwright")`
    there resolves against /tmp and fails when Playwright lives in repo
    `node_modules/` (such as in CI).
    """
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


SCRIPT = r"""
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const [site, learn, portal] = process.argv.slice(2);
const browser = await (async () => {
  try { return await chromium.launch({ headless: true, channel: "chrome" }); }
  catch { return await chromium.launch({ headless: true }); }
})();
const out = { sizes: {}, tabs: {} };
async function open(file) {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await page.goto("file://" + file, { waitUntil: "load" });
  return page;
}
{
  const page = await open(learn);
  out.sizes = await page.evaluate(() => {
    const cell = document.querySelector("table.table--cards td");
    const before = cell ? getComputedStyle(cell, "::before").fontSize : null;
    const link = document.querySelector(".contents__list a");
    const caption = document.querySelector("figcaption");
    const search = document.querySelector("#search-input");
    const size = (el) => (el ? parseFloat(getComputedStyle(el).fontSize) : null);
    return {
      cell: size(cell),
      cellLabel: before ? parseFloat(before) : null,
      contentsBox: link ? Math.round(link.getBoundingClientRect().height) : null,
      caption: size(caption),
      search: size(search),
    };
  });
  await page.keyboard.press("Tab");
  out.tabs.learn = await page.evaluate(() => document.activeElement.textContent.trim());
  await page.close();
}
{
  const page = await open(portal);
  await page.keyboard.press("Tab");
  out.tabs.portal = await page.evaluate(() => document.activeElement.textContent.trim());
  out.portal390 = await page.evaluate(() =>
    [...document.querySelectorAll(".band__grid")].map((grid) => ({
      count: grid.querySelectorAll(".card").length,
      widths: [...grid.querySelectorAll(".card")].map((c) => Math.round(c.getBoundingClientRect().width)),
      rows: new Set([...grid.querySelectorAll(".card")].map((c) => Math.round(c.getBoundingClientRect().top))).size,
    }))
  );
  await page.setViewportSize({ width: 1280, height: 900 });
  out.portal1280 = await page.evaluate(() =>
    [...document.querySelectorAll(".band__grid")].map((grid) => ({
      gridWidth: Math.round(grid.getBoundingClientRect().width),
      count: grid.querySelectorAll(".card").length,
      widths: [...grid.querySelectorAll(".card")].map((c) => Math.round(c.getBoundingClientRect().width)),
      rows: new Set([...grid.querySelectorAll(".card")].map((c) => Math.round(c.getBoundingClientRect().top))).size,
    }))
  );
  await page.close();
}
await browser.close();
console.log(JSON.stringify(out));
"""


@pytest.mark.browser
def test_the_floors_hold_when_a_phone_renders_the_page(tmp_path):
    """The same floors, measured in a browser at 390px."""
    if shutil.which("node") is None:
        pytest.skip("node is not on PATH; the browser measurement cannot run")
    if not LEARN.is_file():
        pytest.skip("site/ is not built; run `uv run python -m textbook.pipeline` first")
    module = _playwright_path()
    if module is None:
        pytest.skip("playwright is not installed; set PLAYWRIGHT_PATH")

    script = tmp_path / "type-scale.mjs"
    script.write_text(SCRIPT, encoding="utf-8")
    result = subprocess.run(
        ["node", str(script), str(SITE), str(LEARN), str(PORTAL)],
        capture_output=True, text=True, check=False, cwd=str(ROOT),
        env={**os.environ, "PLAYWRIGHT_PATH": module},
    )
    assert result.returncode == 0, f"the measurement failed:\n{result.stdout}\n{result.stderr}"
    data = json.loads(result.stdout)

    assert data["sizes"]["cell"] >= 16.0, data["sizes"]
    assert data["sizes"]["cellLabel"] >= 12.0, data["sizes"]
    assert data["sizes"]["contentsBox"] >= 22, data["sizes"]
    assert data["sizes"]["search"] >= 16.0, data["sizes"]
    if data["sizes"]["caption"] is not None:
        assert data["sizes"]["caption"] >= 12.0, data["sizes"]
    assert data["tabs"]["learn"].startswith("Skip to content"), data["tabs"]
    assert data["tabs"]["portal"].startswith("Skip to content"), data["tabs"]

    one_card = [g for g in data["portal1280"] if g["count"] == 1]
    several = [g for g in data["portal1280"] if g["count"] >= 2]
    assert one_card, "expected at least one single-card band on the portal"
    assert several, "expected at least one band of two or more cards on the portal"
    for g in one_card:
        assert g["widths"][0] <= 0.6 * g["gridWidth"], f"a lone card stretched across its band: {g}"
    for g in several:
        assert g["rows"] < g["count"], f"a band stayed single-column at 1280: {g}"
    for g in data["portal390"]:
        assert g["rows"] == g["count"], f"portal did not stay single-column at 390: {g}"
