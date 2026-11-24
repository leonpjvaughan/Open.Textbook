"""The search a reader actually uses: a term typed into a real page.

`test_search.py` pins what the build emits. This drives the browser, because the
three claims that matter are runtime claims: a term returns rows, every row carries
a page type and an excerpt, and `aria-activedescendant` on the field follows the
highlight while focus stays in the field.

Marked `browser` and deselected by default. It needs `site/` built with its root
index (`scripts/build-all.sh`) and Playwright; without either it skips rather than
passing vacuously.

    scripts/build-all.sh && uv run python -m pytest tests/test_search_browser.py -m browser -q
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
from pathlib import Path

import pytest

from textbook.book import repo_root

SITE = repo_root() / "site"
INDEX = SITE / "pagefind" / "pagefind.js"
LEARN_ROUTE = "/gcse-maths/higher/chapter-1/section-1.1/learn/"
PLAYWRIGHT_CANDIDATES = (
    "playwright",
    "/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright",
)


def _playwright_path() -> str | None:
    for candidate in (os.environ.get("PLAYWRIGHT_PATH"), *PLAYWRIGHT_CANDIDATES):
        if not candidate:
            continue
        result = subprocess.run(
            ["node", "-e", f"console.log(require.resolve({json.dumps(candidate)}))"],
            capture_output=True,
            text=True,
            check=False,
            cwd=str(repo_root()),
        )
        if result.returncode == 0 and result.stdout.strip():
            return result.stdout.strip()
    return None


PROBE = r"""
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const [siteDir, learnRoute] = process.argv.slice(2);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pf_meta": "application/octet-stream",
  ".pf_filter": "application/octet-stream",
  ".pf_fragment": "application/octet-stream",
  ".pf_index": "application/octet-stream",
  ".wasm": "application/wasm",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

const browser = await (async () => {
  try { return await chromium.launch({ headless: true, channel: "chrome" }); }
  catch { return await chromium.launch({ headless: true }); }
})();

async function open(width, height, route) {
  const context = await browser.newContext({
    viewport: { width, height },
    serviceWorkers: "block",
  });
  await context.route("http://search.test/**", async (r) => {
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
  await page.goto("http://search.test" + route, { waitUntil: "load" });
  return { context, page };
}

async function search(page, selector, term) {
  await page.locator(selector).fill(term);
  await page.waitForSelector(".tb-search__row, .tb-search__empty", { timeout: 15000 });
  return page.evaluate(() =>
    [...document.querySelectorAll(".tb-search__row")].map((row) => {
      const link = row.querySelector("a");
      const type = row.querySelector(".tb-search__type");
      const title = row.querySelector(".tb-search__title");
      const excerpt = row.querySelector(".tb-search__excerpt");
      const chapter = row.querySelector(".tb-search__chapter");
      return {
        id: link ? link.id : "",
        href: link ? link.getAttribute("href") : "",
        type: type ? type.textContent.trim() : "",
        title: title ? title.textContent.trim() : "",
        excerpt: excerpt ? excerpt.textContent.trim() : "",
        chapter: chapter ? chapter.textContent.trim() : "",
      };
    })
  );
}

const out = {};

{
  const { context, page } = await open(1280, 900, "/");
  const visible = await page.evaluate(() => {
    const field = document.getElementById("portal-search");
    return field ? !field.closest("[data-search]").hidden : false;
  });
  const rows = await search(page, "#portal-search", "fraction");
  await page.keyboard.press("ArrowDown");
  const first = await page.evaluate(() => ({
    focus: document.activeElement ? document.activeElement.id : "",
    active: document.getElementById("portal-search").getAttribute("aria-activedescendant"),
    marked: [...document.querySelectorAll(".tb-search__link.is-active")].map((a) => a.id),
  }));
  await page.keyboard.press("ArrowDown");
  const second = await page.evaluate(() => ({
    active: document.getElementById("portal-search").getAttribute("aria-activedescendant"),
    marked: [...document.querySelectorAll(".tb-search__link.is-active")].map((a) => a.id),
  }));
  const geometry = await page.evaluate(() => {
    const panel = document.querySelector("[data-search-panel]").getBoundingClientRect();
    const cards = document.querySelector(".band__grid").getBoundingClientRect();
    return {
      panel: { top: panel.top, bottom: panel.bottom, height: panel.height, width: panel.width },
      contentTop: cards.top,
      viewport: { width: innerWidth, height: innerHeight },
    };
  });
  await page.keyboard.press("Escape");
  const closed = await page.evaluate(
    () => document.querySelector("[data-search-panel]").hidden
  );
  await page.locator("#portal-search").fill("qwertyuiopasdfgh");
  await page.waitForSelector(".tb-search__empty", { timeout: 15000 });
  const empty = await page.evaluate(() => {
    const node = document.querySelector(".tb-search__empty");
    return node ? node.textContent.trim() : "";
  });
  out.portal1280 = { visible, rows, first, second, geometry, closed, empty };
  await context.close();
}

{
  const { context, page } = await open(390, 844, "/");
  await search(page, "#portal-search", "fraction");
  out.portal390 = await page.evaluate(() => {
    const field = document.getElementById("portal-search").getBoundingClientRect();
    const panelEl = document.querySelector("[data-search-panel]");
    const panel = panelEl.getBoundingClientRect();
    return {
      hidden: panelEl.hidden,
      fieldBottom: field.bottom,
      panel: { top: panel.top, bottom: panel.bottom, height: panel.height, width: panel.width },
      viewport: { width: innerWidth, height: innerHeight },
      closeVisible: getComputedStyle(document.querySelector("[data-search-close]")).display !== "none",
    };
  });
  await context.close();
}

{
  const { context, page } = await open(1280, 900, learnRoute);
  const rows = await search(page, "#search-input", "fraction");
  out.book1280 = await page.evaluate(
    (results) => {
      const panel = document.querySelector("[data-search-panel]").getBoundingClientRect();
      const main = document.querySelector("main").getBoundingClientRect();
      return {
        rows: results,
        panel: { top: panel.top, bottom: panel.bottom, height: panel.height },
        contentTop: main.top,
      };
    },
    rows
  );
  await context.close();
}

await browser.close();
console.log(JSON.stringify(out));
"""


def _run_probe(tmp_path: Path) -> dict:
    if shutil.which("node") is None:
        pytest.skip("node is not on PATH")
    if not INDEX.is_file():
        pytest.skip("site/ has no search index; run `scripts/build-all.sh` first")
    module = _playwright_path()
    if module is None:
        pytest.skip("playwright is not installed; set PLAYWRIGHT_PATH")
    script = tmp_path / "search-probe.mjs"
    script.write_text(PROBE, encoding="utf-8")
    result = subprocess.run(
        ["node", str(script), str(SITE), LEARN_ROUTE],
        capture_output=True,
        text=True,
        check=False,
        cwd=str(repo_root()),
        env={**os.environ, "PLAYWRIGHT_PATH": module},
    )
    assert result.returncode == 0, f"search probe failed:\n{result.stdout}\n{result.stderr}"
    return json.loads(result.stdout)


@pytest.fixture(scope="module")
def probe(tmp_path_factory) -> dict:
    return _run_probe(tmp_path_factory.mktemp("search-probe"))


@pytest.mark.browser
def test_the_portal_field_is_reachable_and_returns_rows(probe):
    portal = probe["portal1280"]
    assert portal["visible"], "the portal field stayed hidden with scripting on"
    assert portal["rows"], "typing a term returned no rows"
    for row in portal["rows"]:
        assert row["type"], f"a row has no page type: {row}"
        assert row["excerpt"], f"a row has no excerpt: {row}"
        assert row["href"].startswith("/"), f"a result URL is not root-absolute: {row['href']}"


@pytest.mark.browser
def test_arrow_keys_move_the_highlight_and_the_field_keeps_focus(probe):
    portal = probe["portal1280"]
    first_row = portal["rows"][0]["id"]
    second_row = portal["rows"][1]["id"] if len(portal["rows"]) > 1 else first_row
    assert portal["first"]["focus"] == "portal-search", (
        "ArrowDown took focus out of the field instead of moving the highlight"
    )
    assert portal["first"]["active"] == first_row, (
        "aria-activedescendant does not name the highlighted row"
    )
    assert portal["first"]["marked"] == [first_row]
    assert portal["second"]["active"] == second_row
    assert portal["second"]["marked"] == [second_row]


@pytest.mark.browser
def test_the_desktop_panel_does_not_cover_the_reading_column(probe):
    portal = probe["portal1280"]
    geometry = portal["geometry"]
    assert geometry["panel"]["bottom"] <= geometry["contentTop"] + 1, (
        "the panel covers the cards it is meant to leave visible"
    )
    assert portal["closed"], "Escape did not close the panel"


@pytest.mark.browser
def test_the_phone_panel_is_a_full_height_sheet_below_the_field(probe):
    phone = probe["portal390"]
    assert not phone["hidden"]
    assert phone["panel"]["top"] >= phone["fieldBottom"] - 1, (
        "the sheet covers the field the reader is typing in"
    )
    assert phone["panel"]["bottom"] >= phone["viewport"]["height"] - 2, (
        "the sheet does not reach the bottom of the screen"
    )
    assert phone["panel"]["height"] > phone["viewport"]["height"] / 2
    assert phone["closeVisible"], "the sheet has no visible way out for a thumb"


@pytest.mark.browser
def test_the_empty_state_names_the_term(probe):
    empty = probe["portal1280"]["empty"]
    assert empty == "No results for “qwertyuiopasdfgh”", empty


@pytest.mark.browser
def test_the_in_book_search_uses_the_same_index(probe):
    book = probe["book1280"]
    assert book["rows"], "the in-book field returned no rows"
    keys = set()
    for row in book["rows"]:
        assert row["href"].startswith("/"), row["href"]
        assert row["type"] and row["excerpt"]
        key = (row["type"], row["title"], row["chapter"])
        assert key not in keys, f"the same page is listed twice: {key}"
        keys.add(key)
    assert not any(
        row["href"].startswith("/gcse-maths/foundation/") for row in book["rows"]
    ), "a Higher reader was offered the Foundation edition of a page the Higher book has"
    assert any(
        row["href"].startswith("/gcse-maths/higher/") for row in book["rows"]
    ), "the open book contributed no result"
    assert book["panel"]["bottom"] <= book["contentTop"] + 1, (
        "the panel covers the reading column in a book"
    )
