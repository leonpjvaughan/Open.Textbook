"""The Settings dialog in a real browser: Match device, the overrides, the live region
and Reset appearance, on the landing page and a book page.

Browser tests over a built `site/`, skipped where the site or Playwright is absent.
"""

from __future__ import annotations

import json
import shutil
import subprocess

import pytest

from textbook.book import repo_root
from textbook.themes import default_bundle

ROOT = repo_root()
SITE = ROOT / "site"
BROWSER_LIB = ROOT / "tools" / "dist" / "lib" / "browser.js"
ROUTES = ("/", "/gcse-maths/higher/")

pytestmark = pytest.mark.browser

SCRIPT = r"""
import { pathToFileURL } from "node:url";
const [lib, site, payload] = process.argv.slice(2);
const { ORIGIN, launchBrowser, serveStatic } = await import(pathToFileURL(lib).href);
const { routes } = JSON.parse(payload);
const browser = await launchBrowser();
const out = {};
for (const route of routes) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: "light" });
  await context.route(/\/(service-worker|sw)\.[^/]*js$/, (r) => r.fulfill({ status: 404, body: "" }));
  await serveStatic(context, site);
  const page = await context.newPage();
  await page.goto(ORIGIN + route, { waitUntil: "load" });
  const scheme = () => page.evaluate(() => document.body.getAttribute("data-md-color-scheme"));
  const stored = () => page.evaluate(() => localStorage.getItem("textbooks:scheme"));
  const checked = (name) => page.evaluate((n) => {
    const input = document.querySelector('#tb-settings-dialog input[name="' + n + '"]:checked');
    return input ? input.value : null;
  }, name);
  const status = () => page.textContent("#tb-settings-status");
  const pick = (name, value) => page.click('#tb-settings-dialog input[name="' + name + '"][value="' + value + '"] + .tb-settings__card');
  const device = async (colorScheme) => {
    await page.emulateMedia({ colorScheme });
    await page.waitForTimeout(100);
  };
  const steps = [];
  const frame = () => page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
  const record = async (step) => (await frame(), steps.push({ step, scheme: await scheme(), stored: await stored(),
    choice: await checked("tb-scheme"), theme: await page.evaluate(() => document.documentElement.dataset.theme),
    storedTheme: await page.evaluate(() => localStorage.getItem("textbooks:theme")), status: await status() }));

  await page.click("#tb-settings");
  await record("open");
  await device("dark");
  await record("device dark");
  await pick("tb-scheme", "default");
  await record("light");
  await device("light");
  await device("dark");
  await record("device dark again");
  await pick("tb-scheme", "auto");
  await record("match device");
  await pick("tb-theme", "neon");
  await record("neon");
  await pick("tb-scheme", "slate");
  await page.click("#tb-settings-reset");
  await record("reset");
  out[route] = steps;
  await context.close();
}
await browser.close();
process.stdout.write(JSON.stringify(out));
"""


@pytest.fixture(scope="module")
def walk(tmp_path_factory) -> dict:
    node = shutil.which("node")
    if node is None or not BROWSER_LIB.is_file():
        pytest.skip("node or the compiled browser library is missing (run `node tools/build.mjs`)")
    if not (SITE / "index.html").is_file() or not (SITE / "gcse-maths" / "higher" / "index.html").is_file():
        pytest.skip("site/ is not built")
    script = tmp_path_factory.mktemp("settings") / "walk.mjs"
    script.write_text(SCRIPT, encoding="utf-8")
    done = subprocess.run(
        [node, str(script), str(BROWSER_LIB), str(SITE), json.dumps({"routes": list(ROUTES)})],
        capture_output=True, text=True, check=False, timeout=240,
    )
    if done.returncode and "cannot find" in done.stderr.lower() and "playwright" in done.stderr.lower():
        pytest.skip(f"Playwright is not available: {done.stderr.strip()[:200]}")
    assert done.returncode == 0, done.stderr
    return json.loads(done.stdout)


@pytest.mark.parametrize("route", ROUTES)
def test_match_device_is_the_default_and_follows_the_device(walk, route):
    opened, device_dark = walk[route][0], walk[route][1]
    assert opened["choice"] == "auto" and opened["stored"] is None, opened
    assert opened["scheme"] == "default", opened
    assert device_dark["scheme"] == "slate", "Match device does not follow a live device change"


@pytest.mark.parametrize("route", ROUTES)
def test_light_overrides_the_device_and_match_device_clears_it(walk, route):
    steps = {row["step"]: row for row in walk[route]}
    assert steps["light"]["stored"] == "default" and steps["light"]["scheme"] == "default"
    assert steps["device dark again"]["scheme"] == "default", "the device moved a stored Light"
    assert steps["match device"]["stored"] is None, "Match device left an override stored"
    assert steps["match device"]["scheme"] == "slate", "Match device did not return to the device"


@pytest.mark.parametrize("route", ROUTES)
def test_each_change_is_announced(walk, route):
    steps = {row["step"]: row for row in walk[route]}
    assert steps["light"]["status"] == "Colour scheme: Light."
    assert steps["match device"]["status"] == "Colour scheme: Match device."
    assert steps["neon"]["status"] == "Colour: Neon."
    assert steps["neon"]["theme"] == "neon"


@pytest.mark.parametrize("route", ROUTES)
def test_reset_restores_every_default(walk, route):
    reset = walk[route][-1]
    assert reset["stored"] is None and reset["storedTheme"] is None, reset
    assert reset["choice"] == "auto", reset
    assert reset["scheme"] == "slate", "after reset the page does not match the (dark) device"
    assert reset["theme"] == default_bundle().id, reset
    assert reset["status"].startswith("Appearance reset. Colour scheme: Match device. Colour: "), reset


SCENES = r"""
import { pathToFileURL } from "node:url";
const [lib, site, payload] = process.argv.slice(2);
const { ORIGIN, launchBrowser, serveStatic } = await import(pathToFileURL(lib).href);
const { route, theme, layout } = JSON.parse(payload);
const browser = await launchBrowser();
const out = {};

async function context({ width = 1280, blocked = false } = {}) {
  const made = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: "light", serviceWorkers: "block" });
  if (blocked) {
    await made.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        configurable: true,
        get() { throw new DOMException("blocked", "SecurityError"); },
      });
    });
  }
  await serveStatic(made, site);
  return made;
}
const pick = (page, name, value) =>
  page.click('#tb-settings-dialog input[name="' + name + '"][value="' + value + '"] + .tb-settings__card');
const state = (page) => page.evaluate(() => {
  const ticked = (name) => {
    const input = document.querySelector('#tb-settings-dialog input[name="' + name + '"]:checked');
    return input ? input.value : null;
  };
  const read = (key) => { try { return localStorage.getItem(key); } catch (err) { return "blocked"; } };
  return {
    scheme: document.body.getAttribute("data-md-color-scheme"),
    theme: document.documentElement.getAttribute("data-theme"),
    style: document.documentElement.getAttribute("data-style"),
    tickedScheme: ticked("tb-scheme"),
    tickedTheme: ticked("tb-theme"),
    tickedLayout: ticked("tb-layout"),
    storedScheme: read("textbooks:scheme"),
    storedTheme: read("textbooks:theme"),
    storedStyle: read("textbooks:style"),
  };
});

{
  const made = await context({ blocked: true });
  const page = await made.newPage();
  await page.goto(ORIGIN + route, { waitUntil: "load" });
  await page.click("#tb-settings");
  await pick(page, "tb-scheme", "slate");
  const dark = await state(page);
  await page.emulateMedia({ colorScheme: "dark" });
  await page.emulateMedia({ colorScheme: "light" });
  await page.waitForTimeout(100);
  const afterDevice = await state(page);
  await pick(page, "tb-scheme", "default");
  await page.emulateMedia({ colorScheme: "dark" });
  await page.waitForTimeout(100);
  const light = await state(page);
  out.blocked = { dark, afterDevice, light };
  await made.close();
}

{
  const made = await context();
  const first = await made.newPage();
  const second = await made.newPage();
  await first.goto(ORIGIN + route, { waitUntil: "load" });
  await second.goto(ORIGIN + route, { waitUntil: "load" });
  await second.click("#tb-settings");
  await first.click("#tb-settings");
  await pick(first, "tb-scheme", "slate");
  await pick(first, "tb-theme", theme);
  await pick(first, "tb-layout", layout);
  await second.waitForFunction((id) => document.documentElement.getAttribute("data-style") === id, layout, { timeout: 5000 }).catch(() => {});
  out.tabs = { first: await state(first), second: await state(second) };
  await made.close();
}

{
  const made = await context();
  const page = await made.newPage();
  await page.goto(ORIGIN + route, { waitUntil: "load" });
  await page.click("#tb-settings");
  await pick(page, "tb-scheme", "slate");
  await pick(page, "tb-theme", theme);
  await pick(page, "tb-layout", layout);
  const chosen = await state(page);
  await page.evaluate(() => {
    const status = document.getElementById("tb-settings-status");
    window.__said = [];
    new MutationObserver(() => window.__said.push(status.textContent)).observe(status, { childList: true, characterData: true, subtree: true });
  });
  await page.click("#tb-settings-reset");
  await page.waitForTimeout(100);
  const once = await page.evaluate(() => window.__said.length);
  await page.click("#tb-settings-reset");
  await page.waitForTimeout(100);
  const said = await page.evaluate(() => window.__said);
  const reset = await state(page);
  await page.reload({ waitUntil: "load" });
  const reloaded = await state(page);
  out.reset = { chosen, reset, reloaded, said, once };
  await made.close();
}

out.overlap = {};
for (const width of [390, 1280]) {
  const made = await context({ width });
  const page = await made.newPage();
  await page.goto(ORIGIN + route, { waitUntil: "load" });
  await page.click("#tb-settings");
  await page.evaluate(() => document.fonts.ready);
  out.overlap[width] = await page.evaluate(() => {
    const dialog = document.getElementById("tb-settings-dialog");
    const box = (el, kind) => {
      const r = el.getBoundingClientRect();
      return { kind, name: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30), left: r.left, right: r.right, top: r.top, bottom: r.bottom };
    };
    const cards = [...dialog.querySelectorAll(".tb-settings__card")].map((el) => box(el, "card"));
    const legends = [...dialog.querySelectorAll("legend")].map((el) => box(el, "legend"));
    const shown = (b) => b.right - b.left > 0 && b.bottom - b.top > 0;
    const cross = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 0.5
      && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 0.5;
    const clashes = [];
    const all = [...cards, ...legends].filter(shown);
    for (let i = 0; i < all.length; i += 1) {
      for (let j = i + 1; j < all.length; j += 1) {
        if (all[i].kind === "legend" && all[j].kind === "legend") continue;
        if (cross(all[i], all[j])) clashes.push(all[i].kind + " " + all[i].name + " / " + all[j].kind + " " + all[j].name);
      }
    }
    return { cards: cards.filter(shown).length, legends: legends.filter(shown).length, clashes };
  });
  await made.close();
}

await browser.close();
process.stdout.write(JSON.stringify(out));
"""

LAYOUT_ROUTE = "/gcse-maths/higher/"


@pytest.fixture(scope="module")
def scenes(tmp_path_factory) -> dict:
    from textbook.book import default_layout, load_collection

    node = shutil.which("node")
    if node is None or not BROWSER_LIB.is_file():
        pytest.skip("node or the compiled browser library is missing (run `node tools/build.mjs`)")
    if not (SITE / "gcse-maths" / "higher" / "index.html").is_file():
        pytest.skip("site/ is not built")
    collection = load_collection()
    layouts = [str(entry["id"]) for entry in collection.get("layouts", [])]
    themes = [str(theme) for theme in collection.get("themes", [])]
    if len(layouts) < 2:
        pytest.skip("one layout offers no choice")
    payload = {
        "route": LAYOUT_ROUTE,
        "theme": next(t for t in reversed(themes) if t != default_bundle().id),
        "layout": next(i for i in layouts if i != default_layout()),
    }
    script = tmp_path_factory.mktemp("settings") / "scenes.mjs"
    script.write_text(SCENES, encoding="utf-8")
    done = subprocess.run(
        [node, str(script), str(BROWSER_LIB), str(SITE), json.dumps(payload)],
        capture_output=True, text=True, check=False, timeout=240,
    )
    if done.returncode and "cannot find" in done.stderr.lower() and "playwright" in done.stderr.lower():
        pytest.skip(f"Playwright is not available: {done.stderr.strip()[:200]}")
    assert done.returncode == 0, done.stderr
    return {**json.loads(done.stdout), **payload, "default_layout": default_layout()}


def test_light_and_dark_hold_when_storage_is_blocked(scenes):
    blocked = scenes["blocked"]
    assert blocked["dark"]["storedScheme"] == "blocked", "storage was not blocked, so this proves nothing"
    assert blocked["dark"]["scheme"] == "slate", "Dark did nothing with storage blocked"
    assert blocked["dark"]["tickedScheme"] == "slate", blocked["dark"]
    assert blocked["afterDevice"]["scheme"] == "slate", "a device change undid Dark with storage blocked"
    assert blocked["light"]["scheme"] == "default", "Light did nothing with storage blocked"


def test_a_change_in_another_tab_reaches_this_one(scenes):
    first, second = scenes["tabs"]["first"], scenes["tabs"]["second"]
    assert first["scheme"] == "slate" and first["theme"] == scenes["theme"], first
    assert first["style"] == scenes["layout"], first
    for axis in ("scheme", "theme", "style"):
        assert second[axis] == first[axis], f"the other tab kept its {axis}: {second}"
    assert second["tickedScheme"] == "slate", second
    assert second["tickedTheme"] == second["theme"], second
    assert second["tickedLayout"] == second["style"], second


def test_reset_clears_the_layout_and_restores_every_default(scenes):
    chosen, reset, reloaded = scenes["reset"]["chosen"], scenes["reset"]["reset"], scenes["reset"]["reloaded"]
    assert chosen["storedStyle"] == scenes["layout"] and chosen["style"] == scenes["layout"], chosen
    for state in (reset, reloaded):
        assert state["storedStyle"] is None and state["storedTheme"] is None and state["storedScheme"] is None, state
        assert state["style"] == scenes["default_layout"], state
        assert state["theme"] == default_bundle().id, state
        assert state["scheme"] == "default", state
    assert reset["tickedScheme"] == "auto" and reset["tickedLayout"] == scenes["default_layout"], reset
    assert reset["tickedTheme"] == default_bundle().id, reset


def test_the_same_message_twice_is_announced_twice(scenes):
    said, once = scenes["reset"]["said"], scenes["reset"]["once"]
    second = said[once:]
    assert "" in second and second[-1].startswith("Appearance reset."), (
        f"the live region was not cleared before the repeated message: {said}"
    )


@pytest.mark.parametrize("width", ["390", "1280"])
def test_no_card_overlaps_another_card_or_a_legend(scenes, width):
    found = scenes["overlap"][width]
    assert found["cards"] > 3 and found["legends"] > 1, found
    assert not found["clashes"], f"at {width}px: {found['clashes']}"
