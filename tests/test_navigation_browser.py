"""Where the reader is, measured in a browser: the ToC, the line, and the drawer.

`test_navigation_state.py` pins the markup, the stylesheets and the script. This drives
a real build, because the three claims that matter are runtime claims: the section on
screen is marked in both the visual and the accessibility tree, a 2px line fills with
the page and adds nothing to the masthead, and a phone drawer opens on the chapter the
reader is in and closes on Escape.

Marked `browser` and deselected by default. It needs `site/` built and Playwright;
without either it skips rather than passing vacuously.

    scripts/build-all.sh && uv run python -m pytest tests/test_navigation_browser.py -m browser -q
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess

import pytest

from textbook.book import repo_root

pytestmark = pytest.mark.browser

ROOT = repo_root()
SITE = ROOT / "site"
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
            cwd=str(ROOT),
        )
        if result.returncode == 0 and result.stdout.strip():
            return result.stdout.strip()
    return None


def _links(page: str) -> int:
    nav = page[page.index('<nav class="contents"') :]
    return nav[: nav.index("</nav>")].count('href="#')


def routes() -> tuple[str, str] | tuple[None, None]:
    """One page with a contents list, and one deep enough down a book for the drawer.

    Chosen from the build rather than named: a route in a test is a measurement that
    can only ever be about one book, and the site is nine books' worth of pages that
    no one of them represents.
    """
    if not SITE.is_dir():
        return (None, None)
    toc = None
    for path in sorted(SITE.rglob("*/learn/index.html")):
        text = path.read_text(encoding="utf-8")
        if "data-scrollspy" in text and _links(text) >= 5:
            toc = "/" + str(path.relative_to(SITE).parent) + "/"
            break
    deepest: tuple[int, str] | None = None
    for path in sorted(SITE.rglob("*/chapter-*/section-*/practise/index.html")):
        text = path.read_text(encoding="utf-8")
        if '<details class="nav-drawer"' not in text or 'aria-current="page"' not in text:
            continue
        chapter = int(re.search(r"chapter-(\d+)/", path.as_posix()).group(1))
        if text.count("nav__link") < 20:
            continue
        if deepest is None or chapter > deepest[0]:
            deepest = (chapter, "/" + str(path.relative_to(SITE).parent) + "/")
    return (toc, deepest[1] if deepest else None)


SCRIPT = r"""
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const [siteDir, tocRoute, drawerRoute] = process.argv.slice(2);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".wasm": "application/wasm",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

const browser = await (async () => {
  try { return await chromium.launch({ headless: true, channel: "chrome" }); }
  catch { return await chromium.launch({ headless: true }); }
})();

async function open({ width, scheme = "light", reducedMotion = "no-preference", javaScript = true }) {
  const context = await browser.newContext({
    viewport: { width, height: 844 },
    colorScheme: scheme,
    reducedMotion,
    javaScriptEnabled: javaScript,
    serviceWorkers: "block",
    deviceScaleFactor: 1,
  });
  await context.route("http://navstate.test/**", (route) => {
    const url = new URL(route.request().url());
    let rel = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    if (!rel || rel.endsWith("/")) rel += "index.html";
    const file = path.join(siteDir, rel);
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      return route.fulfill({ status: 404, body: "not found" });
    }
    const ext = path.extname(file).toLowerCase();
    return route.fulfill({
      status: 200,
      contentType: MIME[ext] || "application/octet-stream",
      body: fs.readFileSync(file),
    });
  });
  const page = await context.newPage();
  return { context, page };
}

const TOC = () => {
  const nav = document.querySelector("[data-scrollspy]");
  if (!nav) return { present: false };
  const native = [...nav.querySelectorAll("a:target-current")].map((a) => a.getAttribute("href"));
  const aria = [...nav.querySelectorAll("a[aria-current]")].map((a) => a.getAttribute("href"));
  const current = nav.querySelector("a:target-current");
  const sibling = nav.querySelector("a:not(:target-current)");
  const style = current ? getComputedStyle(current) : null;
  const other = sibling ? getComputedStyle(sibling) : null;
  return {
    present: true,
    usable: CSS.supports("scroll-target-group: auto"),
    native,
    aria,
    currentClass: current ? current.className : null,
    thickness: style ? style.textDecorationThickness : null,
    siblingThickness: other ? other.textDecorationThickness : null,
    decoration: style ? style.textDecorationLine : null,
    bar: current && current.parentElement ? getComputedStyle(current.parentElement).boxShadow : null,
    fallbackMarked: [...nav.querySelectorAll("a.contents__current")].map((a) => a.getAttribute("href")),
    listHeight: Math.round(nav.getBoundingClientRect().height * 10) / 10,
    links: nav.querySelectorAll(".contents__list a").length,
  };
};

const LINE = () => {
  const bar = document.querySelector(".progress");
  const masthead = document.querySelector(".masthead");
  if (!bar) return { present: false };
  const box = bar.getBoundingClientRect();
  const withLine = masthead.getBoundingClientRect().height;
  bar.style.display = "none";
  const withoutLine = masthead.getBoundingClientRect().height;
  bar.style.removeProperty("display");
  return {
    present: true,
    hidden: bar.getAttribute("aria-hidden"),
    text: bar.textContent.trim(),
    height: box.height,
    display: getComputedStyle(bar).display,
    mastheadWithLine: Math.round(withLine * 10) / 10,
    mastheadWithoutLine: Math.round(withoutLine * 10) / 10,
  };
};

const SCALE = () => {
  const bar = document.querySelector(".progress");
  if (!bar) return null;
  const match = getComputedStyle(bar).transform.match(/matrix\(([^,]+)/);
  return match ? Math.round(Number(match[1]) * 1000) / 1000 : null;
};

const DRAWER = () => {
  const drawer = document.querySelector(".nav-drawer");
  const sidebar = drawer.querySelector(".sidebar");
  const filter = drawer.querySelector("[data-nav-filter]");
  const field = drawer.querySelector("[data-nav-filter-input]");
  const current = sidebar.querySelector('a[aria-current="page"]');
  const box = sidebar.getBoundingClientRect();
  const row = current ? current.getBoundingClientRect() : null;
  const links = [...sidebar.querySelectorAll("a[href]")];
  return {
    open: drawer.open,
    height: Math.round(drawer.getBoundingClientRect().height),
    scrollY: Math.round(window.scrollY),
    boxHeight: Math.round(box.height),
    scrollTop: Math.round(sidebar.scrollTop),
    scrollHeight: sidebar.scrollHeight,
    clientHeight: sidebar.clientHeight,
    currentVisible: Boolean(row) && row.top >= box.top - 1 && row.bottom <= box.bottom + 1,
    openDetails: [...drawer.querySelectorAll("details")].filter((node) => node.open).length,
    details: drawer.querySelectorAll("details").length,
    filterRevealed: filter ? !filter.hidden : false,
    inputHeight: field ? Math.round(field.getBoundingClientRect().height) : 0,
    visibleLinks: links.filter((a) => a.getBoundingClientRect().height > 0).length,
    totalLinks: links.length,
    empty: (() => {
      const note = drawer.querySelector("[data-nav-filter-empty]");
      return note ? !note.hidden : null;
    })(),
    focus: document.activeElement ? document.activeElement.className : null,
  };
};

const out = { toc: {}, line: {}, drawer: {}, reduced: {}, fallback: {}, scriptless: {} };

for (const scheme of ["light", "dark"]) {
  for (const width of [1280, 390]) {
    const { context, page } = await open({ width, scheme });
    await page.goto("http://navstate.test" + tocRoute, { waitUntil: "load" });
    await page.waitForTimeout(250);
    const key = `${scheme}-${width}`;
    const top = await page.evaluate(TOC);
    const line = await page.evaluate(LINE);
    const scaleTop = await page.evaluate(SCALE);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.5));
    await page.waitForTimeout(500);
    const half = await page.evaluate(TOC);
    const scaleHalf = await page.evaluate(SCALE);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(500);
    const bottom = await page.evaluate(TOC);
    const scaleBottom = await page.evaluate(SCALE);
    out.toc[key] = { top, half, bottom };
    out.line[key] = { ...line, scaleTop, scaleHalf, scaleBottom };
    await context.close();
  }
}

{
  const { context, page } = await open({ width: 390, reducedMotion: "reduce" });
  await page.goto("http://navstate.test" + tocRoute, { waitUntil: "load" });
  await page.waitForTimeout(250);
  out.reduced = { ...(await page.evaluate(LINE)), scale: await page.evaluate(SCALE) };
  await context.close();
}

{
  // The fallback, forced: the property is denied before the page's own modules run, so
  // the only thing that can paint the mark is the IntersectionObserver and its class.
  const { context, page } = await open({ width: 390 });
  await context.addInitScript(() => {
    const supports = CSS.supports.bind(CSS);
    CSS.supports = (property, value) =>
      property === "scroll-target-group: auto" ? false : supports(property, value);
  });
  await page.goto("http://navstate.test" + tocRoute, { waitUntil: "load" });
  await page.waitForTimeout(250);
  const fallbackTop = await page.evaluate(TOC);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.5));
  await page.waitForTimeout(500);
  const fallbackHalf = await page.evaluate(TOC);
  out.fallback = { top: fallbackTop, half: fallbackHalf };
  await context.close();
}

for (const scheme of ["light", "dark"]) {
  const { context, page } = await open({ width: 390, scheme });
  await context.addInitScript(() => {
    window.__layout = { value: 0, sources: [] };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.hadRecentInput) continue;
        window.__layout.value += entry.value;
        for (const source of entry.sources || []) {
          const node = source.node;
          window.__layout.sources.push({
            value: Math.round(entry.value * 10000) / 10000,
            node: node && node.nodeType === 1 ? node.tagName + "." + node.className : String(node),
          });
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("http://navstate.test" + drawerRoute, { waitUntil: "load" });
  await page.waitForTimeout(250);
  const closed = await page.evaluate(DRAWER);
  const layout = await page.evaluate(() => window.__layout);
  out.layout = out.layout || {};
  out.layout[scheme] = { ...layout, drawerOpen: closed.open };
  await page.click(".nav-drawer__summary");
  await page.waitForTimeout(300);
  const opened = await page.evaluate(DRAWER);
  await page.fill("[data-nav-filter-input]", "fraction");
  await page.waitForTimeout(200);
  const filtered = await page.evaluate(DRAWER);
  await page.fill("[data-nav-filter-input]", "qqqzzz");
  await page.waitForTimeout(200);
  const none = await page.evaluate(DRAWER);
  await page.fill("[data-nav-filter-input]", "");
  await page.waitForTimeout(200);
  const cleared = await page.evaluate(DRAWER);
  await page.focus("[data-nav-filter-input]");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);
  const escaped = await page.evaluate(DRAWER);
  out.drawer[scheme] = { closed, opened, filtered, none, cleared, escaped };
  await context.close();
}

{
  const { context, page } = await open({ width: 390, javaScript: false });
  await page.goto("http://navstate.test" + drawerRoute, { waitUntil: "load" });
  await page.waitForTimeout(150);
  const before = await page.evaluate(DRAWER);
  await page.click(".nav-drawer__summary");
  await page.waitForTimeout(150);
  const closed = await page.evaluate(DRAWER);
  await page.click(".nav-drawer__summary");
  await page.waitForTimeout(150);
  const reopened = await page.evaluate(DRAWER);
  await page.goto("http://navstate.test" + tocRoute, { waitUntil: "load" });
  await page.waitForTimeout(150);
  const toc = await page.evaluate(() => {
    const nav = document.querySelector("[data-scrollspy]");
    return {
      present: Boolean(nav),
      links: nav ? nav.querySelectorAll("a[href]").length : 0,
      hiddenLinks: nav
        ? [...nav.querySelectorAll("a[href]")].filter((a) => a.getBoundingClientRect().height === 0).length
        : 0,
      marked: nav ? nav.querySelectorAll("a[aria-current]").length : 0,
    };
  });
  out.scriptless = { before, closed, reopened, toc };
  await context.close();
}

await browser.close();
console.log(JSON.stringify(out));
"""


@pytest.fixture(scope="module")
def measured(tmp_path_factory):
    if shutil.which("node") is None:
        pytest.skip("node is not on PATH; the measurement cannot run")
    toc, drawer = routes()
    if not toc or not drawer:
        pytest.skip("site/ is not built; run `scripts/build-all.sh` first")
    module = _playwright_path()
    if module is None:
        pytest.skip("playwright is not installed; set PLAYWRIGHT_PATH")

    script = tmp_path_factory.mktemp("navigation") / "measure.mjs"
    script.write_text(SCRIPT, encoding="utf-8")
    result = subprocess.run(
        ["node", str(script), str(SITE), toc, drawer],
        capture_output=True,
        text=True,
        check=False,
        cwd=str(ROOT),
        env={**os.environ, "PLAYWRIGHT_PATH": module},
    )
    assert result.returncode == 0, f"the measurement failed:\n{result.stdout}\n{result.stderr}"
    data = json.loads(result.stdout)
    data["routes"] = {"toc": toc, "drawer": drawer}
    return data


def test_the_current_section_is_marked_in_both_trees(measured):
    """The visual state and `aria-current` name the same link, at every scroll position.

    A visual-only state is the failure the guidance calls out: the list would appear to
    track the page and a screen reader would hear six undifferentiated links.
    """
    for key, states in measured["toc"].items():
        assert states["top"]["present"], f"{key}: no contents list on the page"
        assert states["top"]["usable"], (
            f"{key}: the browser has no scroll-target-group, so this measures the "
            "fallback and not the native state"
        )
        seen = []
        for name in ("top", "half", "bottom"):
            state = states[name]
            assert state["native"] == state["aria"], (
                f"{key} at {name}: the list marks {state['native']} and the "
                f"accessibility tree says {state['aria']}"
            )
            assert len(state["native"]) == 1, f"{key} at {name}: {state['native']}"
            seen.append(state["native"][0])
        assert len(set(seen)) == 3, (
            f"{key}: the mark did not move through the page, it stayed on {seen}"
        )
        print(f"{key}: {seen[0]} -> {seen[1]} -> {seen[2]}")


def test_the_mark_is_not_colour_alone_and_does_not_reflow_the_list(measured):
    """A 2px rule and a gutter bar, and a list that keeps its height in every state."""
    for key, states in measured["toc"].items():
        heights = {states[name]["listHeight"] for name in ("top", "half", "bottom")}
        assert len(heights) == 1, (
            f"{key}: the list is {sorted(heights)} tall as the mark moves, so marking a "
            "section rewraps the list and shifts the article"
        )
        for name in ("top", "half", "bottom"):
            state = states[name]
            assert state["decoration"] == "underline"
            assert state["thickness"] == "2px", (
                f"{key} at {name}: the current link's rule is {state['thickness']}"
            )
            assert state["siblingThickness"] != "2px", (
                f"{key} at {name}: every link has the same rule, so the mark is colour only"
            )
            assert state["bar"] not in (None, "none"), (
                f"{key} at {name}: the mark has no shape a reader can see without colour"
            )
            assert state["currentClass"] == "", (
                f"{key} at {name}: the fallback class is painting the mark, so the "
                "native path is not the one under test"
            )
        print(
            f"{key}: mark {states['half']['thickness']} rule + {states['half']['bar']}, "
            f"siblings {states['half']['siblingThickness']}, list {heights.pop()}px"
        )


def test_the_progress_line_fills_and_costs_no_layout(measured):
    """2px, driven by the scroll, and the masthead measures the same without it."""
    for key, line in measured["line"].items():
        assert line["present"], f"{key}: no progress line"
        assert line["height"] == 2, f"{key}: the line is {line['height']}px tall"
        assert line["hidden"] == "true" and line["text"] == "", (
            f"{key}: a decorative bar is in the accessibility tree"
        )
        assert line["mastheadWithLine"] == line["mastheadWithoutLine"], (
            f"{key}: the masthead is {line['mastheadWithLine']}px with the line and "
            f"{line['mastheadWithoutLine']}px without it, so the line moves the page"
        )
        assert line["scaleTop"] == 0.0, f"{key}: the line is not empty at the top"
        assert line["scaleBottom"] == 1.0, f"{key}: the line is not full at the bottom"
        assert 0.5 <= line["scaleHalf"] <= 0.95, (
            f"{key}: halfway down the page the line is {line['scaleHalf']} full"
        )
        print(
            f"{key}: {line['height']}px, masthead {line['mastheadWithLine']}px with and "
            f"{line['mastheadWithoutLine']}px without, fill {line['scaleTop']} -> "
            f"{line['scaleHalf']} -> {line['scaleBottom']}"
        )


def test_the_progress_line_is_not_drawn_for_a_reader_who_asked_for_less_motion(measured):
    reduced = measured["reduced"]
    assert reduced["display"] == "none", (
        f"under prefers-reduced-motion the line is {reduced['display']}"
    )
    assert reduced["scale"] is None, "the reduced-motion line is still animating"
    print(f"reduced motion: display {reduced['display']}, no animation")


def test_the_fallback_marks_the_link_the_accessibility_tree_names(measured):
    """Where the platform cannot do it, the observer's class and `aria-current` agree.

    At the very top of a page the observer has nothing to mark yet — no section has
    passed the masthead — and the native path and the fallback may disagree about
    that. What must not disagree is the two trees *within* one path, which is what this
    checks; the half-way position is the one both have an answer for.
    """
    fallback = measured["fallback"]
    for name in ("top", "half"):
        state = fallback[name]
        assert state["usable"] is False, (
            "the native state was not denied, so this is not the fallback"
        )
        assert state["fallbackMarked"] == state["aria"] and len(state["aria"]) <= 1, (
            f"{name}: the class marks {state['fallbackMarked']} and aria says {state['aria']}"
        )
    assert len(fallback["half"]["aria"]) == 1, "the fallback marked nothing halfway down"
    assert fallback["top"]["fallbackMarked"] != fallback["half"]["fallbackMarked"], (
        "the fallback marked the same link after scrolling"
    )
    print(
        f"fallback: {fallback['top']['fallbackMarked']} -> {fallback['half']['fallbackMarked']}"
    )


def test_the_drawer_opens_at_the_current_chapter(measured):
    """At 390 a book's whole tree is a scroll away from the reader's own chapter."""
    for scheme, states in measured["drawer"].items():
        opened = states["opened"]
        assert opened["open"], f"{scheme}: the drawer did not open"
        assert opened["currentVisible"], (
            f"{scheme}: the current page is not in the drawer's box after it opens"
        )
        assert opened["scrollTop"] > 0, (
            f"{scheme}: the drawer did not scroll to the reader's chapter"
        )
        assert opened["scrollY"] == 0, (
            f"{scheme}: opening the drawer scrolled the article to y={opened['scrollY']}"
        )
        assert opened["openDetails"] <= 3, (
            f"{scheme}: {opened['openDetails']} of {opened['details']} branches are "
            "open, so the drawer did not open at chapter level"
        )
        assert 300 <= opened["height"] <= 640, (
            f"{scheme}: the open drawer is {opened['height']}px tall, so it is not the "
            "bounded box a drawer is"
        )
        assert opened["filterRevealed"] and opened["inputHeight"] >= 24, (
            f"{scheme}: the filter is not there, or is under the 24px target floor"
        )
        print(
            f"{scheme} drawer at 390: {opened['height']}px open, box {opened['boxHeight']}px, "
            f"scrolled to {opened['scrollTop']} of {opened['scrollHeight']}, "
            f"{opened['openDetails']}/{opened['details']} branches open"
        )


def test_the_filter_narrows_the_tree_and_says_when_nothing_matches(measured):
    for scheme, states in measured["drawer"].items():
        filtered = states["filtered"]
        assert 0 < filtered["visibleLinks"] < filtered["totalLinks"], (
            f"{scheme}: the filter left {filtered['visibleLinks']} of "
            f"{filtered['totalLinks']} links"
        )
        assert filtered["empty"] is False, f"{scheme}: an empty state with matches shown"
        none = states["none"]
        assert none["visibleLinks"] == 0 and none["empty"] is True, (
            f"{scheme}: a word that matches nothing shows {none['visibleLinks']} links "
            f"and an empty state of {none['empty']}"
        )
        cleared = states["cleared"]
        assert cleared["currentVisible"] and cleared["scrollTop"] > 0, (
            f"{scheme}: clearing the filter does not return the reader to where they are"
        )
        print(
            f"{scheme} filter: {filtered['visibleLinks']}/{filtered['totalLinks']} on "
            f"'fraction', {none['visibleLinks']} and a message on no match"
        )


def test_escape_closes_the_drawer_and_returns_the_summary(measured):
    for scheme, states in measured["drawer"].items():
        escaped = states["escaped"]
        assert escaped["open"] is False, f"{scheme}: Escape did not close the drawer"
        assert escaped["focus"] == "nav-drawer__summary", (
            f"{scheme}: focus went to {escaped['focus']} instead of the control"
        )
        print(f"{scheme}: Escape closed the drawer, focus on the summary")


def test_without_scripting_the_drawer_and_every_link_still_work(measured):
    """The filter is the enhancement; the tree is the page."""
    scriptless = measured["scriptless"]
    before = scriptless["before"]
    assert before["open"], "the drawer is closed with scripting off, so the nav is hidden"
    assert before["filterRevealed"] is False, (
        "the filter is revealed without the script that makes it work"
    )
    assert before["visibleLinks"] == before["totalLinks"] and before["totalLinks"] > 20, (
        f"scripting off: {before['visibleLinks']} of {before['totalLinks']} links visible"
    )
    assert scriptless["closed"]["open"] is False, "the summary does not close without script"
    assert scriptless["reopened"]["open"] is True, "the summary does not reopen"
    toc = scriptless["toc"]
    assert toc["present"] and toc["links"] >= 5 and toc["hiddenLinks"] == 0, (
        f"scripting off: {toc}"
    )
    assert toc["marked"] == 0, "the scrollspy marked a section without script"
    print(
        f"scripting off: drawer {before['height']}px, {before['visibleLinks']} links, "
        f"toggles on the summary, {toc['links']} contents links, none hidden"
    )


def test_the_phone_drawer_is_already_closed_and_shifts_nothing(measured):
    """TODO 221: the drawer ships open and must be collapsed before `main` parses.

    Closing it from the deferred module moved `<main>` up after first paint and
    scored 0.82 CLS at 390px, eight times Google's "good" limit. The drawer's own
    inline script now runs before the tree and `<main>` parse, so the first paint
    is already collapsed and no layout shift is attributed to the page.
    """
    layout = measured.get("layout") or {}
    assert layout, "the layout-shift measurement did not run"
    for scheme, state in layout.items():
        value = state["value"]
        assert value < 0.1, (
            f"{scheme}: the phone page shifts by {value:.3f} CLS "
            f"(good is under 0.1); sources: {state['sources']}"
        )
        assert state["drawerOpen"] is False, (
            f"{scheme}: the drawer is still open after first paint, so the closed "
            "state is a later script rather than the first paint"
        )
        print(f"{scheme}: CLS {value:.4f}, drawer closed at first paint")
