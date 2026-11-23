"""How much text a reader gets per line.

The column used to be `70ch`, and this suite had no opinion about it: measured on a
Learn page it was 662px wide and carried 91 characters per line, well past the 70-78
the type rules ask for, while every gate was green. The handoff's estimate was that
`58ch` would be about 545px and 75 characters; measured, it was 69 — inside the range
only at its floor — so the token was recomputed rather than copied.

`ch` is the width of "0", not of the alphabet, and word wrapping costs a few
characters per line, so this cannot be an arithmetic check on the token. The second
half measures the built site in a browser: the characters on each full line of every
long paragraph, at 1280 and at 390, and it asserts the median against the range.

The first half is browser-free and pins the decisions that make the measurement
possible, so deleting one fails in the ordinary gate rather than only in the preview.
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
SITE = ROOT / "site"
EXTRA = ROOT / "assets" / "stylesheets" / "extra.css"
PORTAL = ROOT / "assets" / "stylesheets" / "portal.css"
SHELL = ROOT / "engine" / "src" / "textbook" / "css" / "shell.css"

AT_1280 = (70, 78)
AT_390 = (40, 48)

PLAYWRIGHT_CANDIDATES = (
    "playwright",
    "/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright",
)


def declarations(path: Path, css: str | None = None, prefix: str = "") -> list[tuple[str, str, str]]:
    """(selector, property, value) for every declaration, media queries kept."""
    if css is None:
        css = path.read_text(encoding="utf-8")
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    found: list[tuple[str, str, str]] = []
    index = 0
    while index < len(css):
        match = re.search(r"([^{}]*)\{", css[index:])
        if not match:
            return found
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
        if selector.startswith(("@media", "@supports")):
            found.extend(declarations(path, body, prefix + selector + " "))
        else:
            for declaration in body.split(";"):
                if ":" not in declaration:
                    continue
                prop, value = declaration.split(":", 1)
                found.append((prefix + selector, prop.strip().lower(), value.strip()))
        index = end
    return found


def measure(root: str = "--tb-measure") -> str:
    values = {
        value for _selector, prop, value in declarations(EXTRA) if prop == root
    }
    assert len(values) == 1, f"extra.css declares {root} as {sorted(values)}"
    return values.pop()


def test_the_measure_is_declared_once_and_agrees_with_the_portal():
    """One token for the books, and the landing page must not keep the old one.

    `portal.css` loads after `extra.css`, so a second `:root` declaration there wins;
    it said `70ch` and would have kept the portal at 91 characters per line.
    """
    from_extra = measure()
    from_portal = {
        value for _selector, prop, value in declarations(PORTAL) if prop == "--tb-measure"
    }
    assert from_portal == {from_extra}, (
        f"portal.css says {sorted(from_portal)} and extra.css says {from_extra}; the two "
        "sheets disagree about the reader's reading measure"
    )


MICRO_RADII = {
    ("assets/stylesheets/extra.css", ".md-typeset pre"): "3px",
    ("assets/stylesheets/extra.css", ".md-typeset :not(pre) > code"): "3px",
    ("engine/src/textbook/css/shell.css", ".table-scroll:focus-visible"): "3px",
}


def shared_stylesheets() -> list[Path]:
    """Every shared stylesheet in assets/ and the engine shell."""
    return sorted((ROOT / "assets" / "stylesheets").glob("*.css")) + sorted(
        (ROOT / "engine" / "src" / "textbook" / "css").glob("*.css")
    )


def test_the_radius_is_declared_once_and_agrees_with_the_portal():
    """One collection has one corner, and no pill survives in any shared sheet.

    The portal said 10px and the books 8px, so a card corner changed as the reader
    moved from the front door into a book. The portal does not load `extra.css`, so
    the value is written in both sheets — and pinned here, because two declarations
    that agree today are two declarations that can drift. Every surface radius in
    `assets/stylesheets/` and `engine/src/textbook/css/` must use `var(--tb-radius)`
    or `0`, apart from the documented micro-radii, and no `999px` pill may survive.
    """
    from_extra = {
        value for _selector, prop, value in declarations(EXTRA) if prop == "--tb-radius"
    }
    from_portal = {
        value for _selector, prop, value in declarations(PORTAL) if prop == "--tb-radius"
    }
    assert len(from_extra) == 1, f"extra.css declares the radius as {sorted(from_extra)}"
    assert from_portal == from_extra, (
        f"portal.css says {sorted(from_portal)} and extra.css says {from_extra}; the two "
        "sheets disagree about the reader's corner radius"
    )

    offenders: list[str] = []
    seen_micro: set[tuple[str, str]] = set()
    for sheet in shared_stylesheets():
        rel = sheet.relative_to(ROOT).as_posix()
        raw = re.sub(r"/\*.*?\*/", "", sheet.read_text(encoding="utf-8"), flags=re.S)
        assert not re.search(r"(?<![0-9-])999px\b", raw), f"{rel} still carries a 999px pill"
        for selector, prop, value in declarations(sheet):
            if not (prop == "border-radius" or (prop.startswith("border-") and prop.endswith("-radius"))):
                continue
            key = (rel, selector)
            if key in MICRO_RADII:
                seen_micro.add(key)
                if value != MICRO_RADII[key]:
                    offenders.append(
                        f"{rel} ({selector}): {prop}: {value} (expected micro-radius {MICRO_RADII[key]})"
                    )
                continue
            parts = value.split()
            if not parts or not all(part in {"var(--tb-radius)", "0"} for part in parts):
                offenders.append(f"{rel} ({selector}): {prop}: {value}")

    assert not offenders, (
        "shared stylesheets carry hard-coded border-radius values outside "
        "var(--tb-radius), 0, and MICRO_RADII:\n  " + "\n  ".join(offenders)
    )
    stale = sorted(set(MICRO_RADII) - seen_micro)
    assert not stale, f"MICRO_RADII lists selectors that no longer exist: {stale}"


def test_the_prose_is_capped_and_the_figures_are_not():
    """The column must not be capped at the prose measure.

    Figures, tables, display maths and code are allowed a wider track: clipping them
    at the prose width squeezed every diagram on every page. The content box is what
    the old rule capped, so it is the one that must not hold `--tb-measure`.
    """
    content = [
        value
        for selector, prop, value in declarations(SHELL)
        if selector.endswith(".content") and prop == "max-width"
    ]
    assert content, "shell.css no longer sizes the content column"
    assert "var(--tb-measure)" not in content[-1], (
        "the content column is capped at the prose measure, so figures and tables are "
        "clipped to it"
    )
    capped = [
        selector
        for selector, prop, value in declarations(EXTRA)
        if prop == "max-width" and value == "var(--tb-measure)"
    ]
    assert any(".md-typeset > p" in selector for selector in capped), (
        "nothing caps a paragraph at the measure, so the column decides the line length"
    )


SCRIPT = r"""
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const pages = JSON.parse(process.argv[2]);
const browser = await (async () => {
  try { return await chromium.launch({ headless: true, channel: "chrome" }); }
  catch { return await chromium.launch({ headless: true }); }
})();

// Every character's own box, grouped by line: the count per line is the measure,
// and the last line of a paragraph is excluded because it is whatever is left.
// One self-contained function: Playwright serialises its source, so a helper
// closed over from outside the function would arrive undefined.
const MEASURE = () => {
  const lines = (el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    const rows = [];
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node.textContent || "";
      for (let i = 0; i < text.length; i += 1) {
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const box = range.getBoundingClientRect();
        if (box.height === 0) continue;
        const at = rows.findIndex((row) => Math.abs(row.top - box.top) <= 1);
        if (at < 0) rows.push({ top: box.top, count: 1 });
        else rows[at].count += 1;
      }
    }
    return rows.map((row) => row.count);
  };
  const median = (values) => {
    if (!values.length) return null;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
  };
  const full = [];
  for (const p of document.querySelectorAll("main p")) {
    /* The reading column, not an inset. A paragraph inside a callout, a list or a
     * disclosure is narrower by design; including it measured the callout's
     * padding as if it were the column and pulled the median a character below
     * the phone range. */
    if (!p.parentElement || !p.parentElement.matches(".md-typeset, main")) continue;
    if ((p.textContent || "").trim().length <= 200) continue;
    const counts = lines(p);
    full.push(...counts.slice(0, -1));
  }
  return {
    paragraphs: document.querySelectorAll("main p").length,
    measured: full.length,
    median: median(full),
    min: full.length ? Math.min(...full) : null,
    max: full.length ? Math.max(...full) : null,
    bundle: document.documentElement.getAttribute("data-theme"),
    font: getComputedStyle(document.querySelector("main p") || document.body).fontFamily,
  };
};

const out = [];
for (const page of pages) {
  const row = { route: page.route, book: page.book };
  for (const width of [1280, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      colorScheme: "light",
      deviceScaleFactor: 1,
    });
    const tab = await context.newPage();
    await tab.goto("file://" + page.file, { waitUntil: "load" });
    row[String(width)] = await tab.evaluate(MEASURE);
    await context.close();
  }
  out.push(row);
}
await browser.close();
console.log(JSON.stringify(out));
"""


def _playwright_path() -> str | None:
    """The absolute Playwright path this machine can load, or None.

    Absolute rather than a bare name: the measuring script lives in pytest's tmp
    directory, where a bare `require` would resolve against /tmp.
    """
    for candidate in (os.environ.get("PLAYWRIGHT_PATH"), *PLAYWRIGHT_CANDIDATES):
        if not candidate:
            continue
        result = subprocess.run(
            ["node", "-e", f"console.log(require.resolve({json.dumps(candidate)}))"],
            capture_output=True,
            text=True,
            check=False,
            cwd=str(ROOT),
        )
        if result.returncode == 0 and result.stdout.strip():
            return result.stdout.strip()
    return None


def learn_pages() -> list[dict[str, str]]:
    """One Learn page per book in the build, with the book it belongs to."""
    if not SITE.is_dir():
        return []
    chosen: dict[str, Path] = {}
    for path in sorted(SITE.rglob("*/learn/index.html")):
        book = path.relative_to(SITE).parts[0]
        chosen.setdefault(book, path)
    return [
        {"book": book, "route": "/" + str(path.relative_to(SITE).parent) + "/", "file": str(path)}
        for book, path in chosen.items()
    ]


@pytest.mark.browser
def test_a_long_paragraph_is_a_readable_number_of_characters_per_line(tmp_path):
    if shutil.which("node") is None:
        pytest.skip("node is not on PATH; the measurement cannot run")
    pages = learn_pages()
    if not pages:
        pytest.skip("site/ is not built; run `scripts/build-all.sh` first")
    module = _playwright_path()
    if module is None:
        pytest.skip("playwright is not installed; set PLAYWRIGHT_PATH")

    script = tmp_path / "measure.mjs"
    script.write_text(SCRIPT, encoding="utf-8")
    result = subprocess.run(
        ["node", str(script), json.dumps(pages)],
        capture_output=True,
        text=True,
        check=False,
        cwd=str(ROOT),
        env={**os.environ, "PLAYWRIGHT_PATH": module},
    )
    assert result.returncode == 0, f"the measurement failed:\n{result.stdout}\n{result.stderr}"
    rows = json.loads(result.stdout)

    measured = [row for row in rows if (row.get("1280") or {}).get("median") is not None]
    assert measured, (
        "no Learn page in the build holds a paragraph longer than 200 characters, so "
        "nothing was measured and this is not a pass"
    )

    # Recorded, not just asserted: the log says which bundle and font were measured.
    for row in measured:
        print(
            f"{row['book']}: bundle {row['1280']['bundle']}, font {row['1280']['font']}, "
            f"1280 median {row['1280']['median']} (range {row['1280']['min']}-{row['1280']['max']}), "
            f"390 median {row['390']['median']} (range {row['390']['min']}-{row['390']['max']})"
        )

    def median(values: list[int]) -> int:
        ordered = sorted(values)
        middle = len(ordered) // 2
        return (
            ordered[middle]
            if len(ordered) % 2
            else round((ordered[middle - 1] + ordered[middle]) / 2)
        )

    at_1280 = median([row["1280"]["median"] for row in measured])
    at_390 = median([row["390"]["median"] for row in measured])
    print(f"across {len(measured)} books: 1280 median {at_1280}, 390 median {at_390}")

    assert AT_1280[0] <= at_1280 <= AT_1280[1], (
        f"a line carries a median of {at_1280} characters at 1280, outside "
        f"{AT_1280[0]}-{AT_1280[1]}"
    )
    assert AT_390[0] <= at_390 <= AT_390[1], (
        f"a line carries a median of {at_390} characters at 390, outside "
        f"{AT_390[0]}-{AT_390[1]}"
    )
