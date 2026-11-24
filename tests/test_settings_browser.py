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
  const record = async (step) => steps.push({ step, scheme: await scheme(), stored: await stored(),
    choice: await checked("tb-scheme"), theme: await page.evaluate(() => document.documentElement.dataset.theme),
    storedTheme: await page.evaluate(() => localStorage.getItem("textbooks:theme")), status: await status() });

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
