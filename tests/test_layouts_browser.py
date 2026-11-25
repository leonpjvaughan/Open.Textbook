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

* **choice** — with more than one layout the Settings dialog offers each one, choosing
  it changes `html[data-style]` at once and after a reload, and the colour scheme and
  bundle the reader stored are untouched: the three axes are independent. A stored id
  that is not a layout falls back to the default.
* **formatting** — every layout, on the portal, a book's home, a Learn page and a
  Practise page, at 390 and 1280 and in both schemes: nothing wider than the screen, and
  the prose at 17px or more on a line height of 1.5 or more. Every full line of every
  paragraph, callouts included, is counted: at 1280 at least 90% hold 45 to 78
  characters and none more than 80; at 390 none more than 78. The 78 is
  `test_measure.AT_1280`'s ceiling: `62ch` renders 66 to 78 characters on a Learn page,
  so a 75 ceiling would fail the default column the house measure was tuned to. Every layout but the default also runs the `targets` and phone
  figure-label sweeps with `--style`; the gate already runs both on the default.

Browser tests over a built `site/`, skipped where the site or Playwright is absent.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
from pathlib import Path

import pytest

from test_measure import AT_1280
from textbook.book import default_layout, load_collection, repo_root

ROOT = repo_root()
SITE = ROOT / "site"
LAYOUTS_DIR = ROOT / "assets" / "stylesheets" / "layouts"
BROWSER_LIB = ROOT / "tools" / "dist" / "lib" / "browser.js"
ROUTES = (
    "/",
    "/gcse-maths/higher/",
    "/gcse-maths/higher/chapter-1/section-1.1/learn/",
    "/gcse-maths/higher/chapter-1/section-1.1/practise/",
)

PLAYWRIGHT_CANDIDATES = (
    "playwright",
    "/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright",
)

pytestmark = pytest.mark.browser

BODY_PX = 17
LINE_HEIGHT = 1.5
MEASURE_CH = (45, AT_1280[1])
MEASURE_SHARE = 0.9
MEASURE_CEILING = 80


def layout_ids() -> list[str]:
    return [str(entry["id"]) for entry in load_collection().get("layouts", [])]

SCRIPT = r"""
import { pathToFileURL } from "node:url";
const [lib, site, mode, payload] = process.argv.slice(2);
const { ORIGIN, launchBrowser, openContext, serveStatic } = await import(pathToFileURL(lib).href);
const { routes, layouts, titles, defaultLayout, themes, measure } = JSON.parse(payload);

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
} else if (mode === "choice") {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: "block" });
  await serveStatic(context, site);
  const page = await context.newPage();
  const stored = () => ({
    style: document.documentElement.dataset.style || "",
    scheme: localStorage.getItem("textbooks:scheme"),
    theme: localStorage.getItem("textbooks:theme"),
    appliedTheme: document.documentElement.getAttribute("data-theme"),
    appliedScheme: document.body.getAttribute("data-md-color-scheme"),
  });
  const otherTheme = themes[themes.length - 1];
  for (const route of routes.slice(0, 2)) {
    await page.goto(ORIGIN + route, { waitUntil: "load" });
    await page.evaluate((theme) => {
      localStorage.clear();
      localStorage.setItem("textbooks:scheme", "slate");
      localStorage.setItem("textbooks:theme", theme);
    }, otherTheme);
    await page.reload({ waitUntil: "load" });
    const before = await page.evaluate(stored);
    const offered = await page.$$eval('input[name="tb-layout"]', (inputs) => inputs.map((i) => i.value));
    const chosen = [];
    for (const layout of [...layouts.slice(1), layouts[0]]) {
      await page.click("#tb-settings");
      const radio = page.getByRole("radio", { name: new RegExp("^" + titles[layout]) });
      await page.locator("label", { has: radio }).click();
      const now = await page.evaluate(stored);
      await page.keyboard.press("Escape");
      await page.reload({ waitUntil: "load" });
      const reloaded = await page.evaluate(stored);
      const ticked = await page.$eval('input[name="tb-layout"]:checked', (i) => i.value).catch(() => null);
      await page.click("#tb-settings");
      const tickedOpen = await page.$eval('input[name="tb-layout"]:checked', (i) => i.value).catch(() => null);
      await page.keyboard.press("Escape");
      chosen.push({ layout, now, reloaded, ticked, tickedOpen, storedStyle: await page.evaluate(() => localStorage.getItem("textbooks:style")) });
    }
    await page.evaluate(() => localStorage.setItem("textbooks:style", "no-such-layout"));
    await page.reload({ waitUntil: "load" });
    const unknown = await page.evaluate(stored);
    out.push({ route, before, otherTheme, offered, chosen, unknown, defaultLayout });
  }
  await context.close();
} else if (mode === "drawer") {
  for (const layout of layouts) {
    for (const scheme of ["light", "dark"]) {
      const context = await openContext(browser, { width: 390, height: 900, scheme, style: layout, deviceScaleFactor: 1, blockServiceWorkers: true });
      await serveStatic(context, site);
      const page = await context.newPage();
      await page.goto(ORIGIN + routes.find((r) => /\/learn\/$/.test(r)), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(() => {
        const summary = document.querySelector(".nav-drawer__summary").getBoundingClientRect();
        const label = document.querySelector(".nav-drawer__label").getBoundingClientRect();
        const title = document.querySelector("main h1").getBoundingClientRect();
        return {
          summary: summary.height,
          offCentre: Math.abs((label.top + label.bottom) / 2 - (summary.top + summary.bottom) / 2),
          gap: title.top - label.bottom,
        };
      });
      out.push({ layout, scheme, ...result });
      await context.close();
    }
  }
} else if (mode === "format") {
  const PROSE = (MEASURE) => {
    const lines = (el) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      const rows = [];
      const ownLine = (node) => {
        for (let at = node.parentElement; at && at !== el; at = at.parentElement) {
          if (/^(block|flex|grid|list-item|table)$/.test(getComputedStyle(at).display)) return true;
        }
        return false;
      };
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (ownLine(node)) continue;
        const text = node.textContent || "";
        for (let i = 0; i < text.length; i += 1) {
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          const box = range.getBoundingClientRect();
          if (box.height === 0 || box.width === 0) continue;
          const at = rows.findIndex((row) => Math.abs(row.top - box.top) <= 1);
          if (at < 0) rows.push({ top: box.top, count: 1 });
          else rows[at].count += 1;
        }
      }
      return rows.map((row) => row.count);
    };
    const full = [];
    const sizes = [];
    const ratios = [];
    for (const p of document.querySelectorAll("main p")) {
      if (!p.getClientRects().length) continue;
      if (p.parentElement && p.parentElement.matches(".md-typeset, main")) {
        const style = getComputedStyle(p);
        const size = parseFloat(style.fontSize);
        sizes.push(size);
        ratios.push(style.lineHeight === "normal" ? 0 : parseFloat(style.lineHeight) / size);
      }
      full.push(...lines(p).slice(0, -1));
    }
    const sorted = [...full].sort((a, b) => a - b);
    return {
      paragraphs: sizes.length,
      size: sizes.length ? Math.min(...sizes) : null,
      ratio: ratios.length ? Math.min(...ratios) : null,
      lines: full.length,
      within: full.filter((n) => n >= MEASURE[0] && n <= MEASURE[1]).length,
      over: full.filter((n) => n > MEASURE[1]).length,
      max: full.length ? Math.max(...full) : null,
      median: sorted.length ? sorted[Math.floor(sorted.length / 2)] : null,
      short: sorted.slice(0, 5),
    };
  };
  for (const layout of layouts) {
    for (const scheme of ["light", "dark"]) {
      for (const width of [390, 1280]) {
        const context = await openContext(browser, { width, height: 900, scheme, style: layout, deviceScaleFactor: 1, blockServiceWorkers: true });
        await serveStatic(context, site);
        const page = await context.newPage();
        for (const route of routes) {
          await page.goto(ORIGIN + route, { waitUntil: "load" });
          await page.evaluate(() => document.fonts.ready);
          const result = await page.evaluate((overflowSource) => ({
            style: document.documentElement.dataset.style,
            overflow: new Function(`return (${overflowSource})()`)(),
          }), overflow.toString());
          const prose = /\/(learn|practise)\/$/.test(route) ? await page.evaluate(PROSE, measure) : null;
          out.push({ layout, scheme, width, route, prose, ...result });
        }
        await context.close();
      }
    }
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
    collection = load_collection()
    payload = {
        "routes": list(ROUTES),
        "layouts": layout_ids(),
        "titles": {entry["id"]: entry["title"] for entry in collection.get("layouts", [])},
        "defaultLayout": default_layout(),
        "themes": list(collection.get("themes", [])),
        "measure": list(MEASURE_CH),
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


def test_the_phone_drawer_is_a_44px_target_close_to_the_title(tmp_path):
    results = _run(tmp_path, "drawer")
    assert {r["layout"] for r in results} == set(layout_ids())
    failures = []
    for found in results:
        where = f"{found['layout']} {found['scheme']}"
        print(where, found)
        if abs(found["summary"] - 44) > 0.5:
            failures.append(f"{where}: the summary is {found['summary']}px tall, not 44")
        if found["offCentre"] > 2:
            failures.append(f"{where}: the label is {found['offCentre']:.1f}px off the summary's centre")
        if found["gap"] >= 60:
            failures.append(f"{where}: the title starts {found['gap']:.0f}px below the label")
    assert not failures, "\n".join(failures)


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


def test_the_reader_chooses_each_layout_and_nothing_else_changes(tmp_path):
    layouts = layout_ids()
    assert len(layouts) > 1, "one layout offers no choice, so there is nothing to test"
    results = _run(tmp_path, "choice")
    assert results, "no page was measured"
    for found in results:
        route, before = found["route"], found["before"]
        assert before["style"] == found["defaultLayout"], f"{route} did not open on the default layout"
        assert before["theme"] == found["otherTheme"] and before["appliedTheme"] == found["otherTheme"]
        assert before["scheme"] == "slate" and before["appliedScheme"] == "slate"
        assert found["offered"] == layouts, f"{route} offers {found['offered']}, not {layouts}"
        assert [c["layout"] for c in found["chosen"]] == [*layouts[1:], layouts[0]]
        for chosen in found["chosen"]:
            layout = chosen["layout"]
            for when in ("now", "reloaded"):
                state = chosen[when]
                assert state["style"] == layout, f"{route}: chose {layout}, {when} shows {state['style']}"
                for axis in ("scheme", "theme", "appliedTheme", "appliedScheme"):
                    assert state[axis] == before[axis], (
                        f"{route}: choosing {layout} changed {axis} from {before[axis]} to {state[axis]} ({when})"
                    )
            assert chosen["storedStyle"] == layout
            assert chosen["ticked"] == layout, f"{route}: after a reload the closed dialog ticks {chosen['ticked']} on {layout}"
            assert chosen["tickedOpen"] == layout, f"{route}: the dialog ticks {chosen['tickedOpen']} on {layout}"
        assert found["unknown"]["style"] == found["defaultLayout"], (
            f"{route}: an unknown stored layout applied {found['unknown']['style']}"
        )


def test_every_layout_fits_and_keeps_the_reading_measure(tmp_path):
    results = _run(tmp_path, "format")
    layouts = layout_ids()
    assert {r["layout"] for r in results} == set(layouts)
    assert len(results) == len(layouts) * 2 * 2 * len(ROUTES)
    failures = []
    for found in results:
        where = f"{found['layout']} {found['scheme']} {found['width']}px {found['route']}"
        if found["style"] != found["layout"]:
            failures.append(f"{where}: the page applied {found['style']}")
            continue
        if found["overflow"] > 1:
            failures.append(f"{where}: {found['overflow']}px wider than the screen")
        prose = found["prose"]
        if prose is None:
            continue
        if not prose["paragraphs"] or not prose["lines"]:
            failures.append(f"{where}: no prose was measured")
            continue
        if prose["size"] < BODY_PX - 0.01:
            failures.append(f"{where}: body text {prose['size']}px, under {BODY_PX}px")
        if prose["ratio"] < LINE_HEIGHT - 0.01:
            failures.append(f"{where}: line height {prose['ratio']:.2f}, under {LINE_HEIGHT}")
        if found["width"] == 1280:
            share = prose["within"] / prose["lines"]
            if share < MEASURE_SHARE:
                failures.append(
                    f"{where}: {share:.0%} of {prose['lines']} full lines hold {MEASURE_CH} "
                    f"characters, under {MEASURE_SHARE:.0%} (median {prose['median']}, "
                    f"shortest {prose['short']}, longest {prose['max']})"
                )
            if prose["max"] > MEASURE_CEILING:
                failures.append(f"{where}: a line holds {prose['max']} characters, over {MEASURE_CEILING}")
        elif prose["over"]:
            failures.append(
                f"{where}: {prose['over']} full lines hold more than {MEASURE_CH[1]} characters "
                f"(longest {prose['max']})"
            )
    for found in results:
        if found["prose"] and found["scheme"] == "light":
            print(f"{found['layout']} {found['width']}px: {found['prose']}")
    assert not failures, "\n".join(failures)


@pytest.mark.parametrize("layout", [i for i in layout_ids() if i != default_layout()])
@pytest.mark.parametrize("command", [("targets", "site"), ("audit", "site", "--mobile")], ids=["targets", "phone-labels"])
def test_every_layout_passes_the_phone_sweeps(layout, command):
    if shutil.which("node") is None:
        pytest.skip("node is not on PATH; the browser check cannot run")
    if not (SITE / "index.html").is_file():
        pytest.skip("site/ is not built")
    module = _playwright_path()
    if module is None:
        pytest.skip("playwright is not installed; set PLAYWRIGHT_PATH")
    result = subprocess.run(
        ["node", str(ROOT / "tools" / "dist" / "cli.js"), *command, "--style", layout],
        capture_output=True, text=True, check=False, cwd=str(ROOT),
        env={**os.environ, "PLAYWRIGHT_PATH": module},
        timeout=1200,
    )
    print(result.stdout[-600:])
    assert result.returncode == 0, f"{command[0]} with {layout}:\n{result.stdout[-3000:]}\n{result.stderr[-2000:]}"
