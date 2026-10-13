// Check the shared figure kit's own contract.
//
// `assets/figures/kit.js` is where the accessibility contract now lives: it is
// what puts `role="img"` on a drawing, keeps it off a readout, refuses to give an
// SVG a fixed height, and formats a number for a reader. Every converted figure
// inherits whatever it does, so a defect here reaches all of them at once — which
// is why it is checked directly rather than only through the modules that use it.
//
// Every assertion below is a defect that reached production before the kit
// existed: `role="img"` on a live readout (four modules), a pixel `height` that
// shrank a phone's labels (70 modules), `fmt` obeyed when called as a `map`
// callback, and a signed number with no space.
//
// Usage: node scripts/check-figure-kit.cjs <siteDir> [route]
// Exit 0 when the kit keeps its contract, 1 when it does not.

const fs = require("node:fs");
const path = require("node:path");

function loadPlaywright() {
  const candidates = [
    process.env.PLAYWRIGHT_PATH,
    "playwright",
    "/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright",
  ].filter(Boolean);
  for (const candidate of candidates) {
    try {
      return require(candidate);
    } catch {
      /* try the next one */
    }
  }
  throw new Error("playwright not found; set PLAYWRIGHT_PATH");
}

const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".json": "application/json",
  ".woff2": "font/woff2",
};

// Run inside the page. It imports the *built* kit, so what is checked is what a
// reader receives rather than what the source says.
//
// A function, not a string: `page.evaluate` treats a string as an expression and
// cannot pass an argument to it, so a string version returns `undefined` and every
// assertion then reads off `undefined` — which looks like a dozen failures of the
// kit rather than one mistake in the check.
async function probe(kitPath) {
  const kit = await import(kitPath);

  const el = document.createElement("maths-figure");
  document.body.append(el);
  const { svg, readout, controls } = kit.panel(el, {
    label: "A drawing for the check",
    width: 200,
    height: 100,
  });
  kit.slider(el, { id: "plain", label: "Plain", min: 0, max: 10, value: 3 });
  kit.slider(el, { id: "quiet", label: "No value shown", min: 0, max: 10, value: 4, show: false });
  kit.slider(el, { id: "unit", label: "With a unit", min: 0, max: 300, value: 200, unit: "\u03a9" });
  const quiet = el.querySelector("input.quiet");

  const bare = document.createElement("maths-figure");
  document.body.append(bare);
  const made = kit.panel(bare, { drawing: false });

  return {
    svgRole: svg.getAttribute("role"),
    svgLabel: svg.getAttribute("aria-label"),
    svgHasHeight: svg.hasAttribute("height"),
    readoutLive: readout.getAttribute("aria-live"),
    readoutRole: readout.getAttribute("role"),
    controlsIsElement: !!controls && controls.tagName === "DIV",
    quietHasOutput: !!quiet.closest("label").querySelector("output"),
    unitOutput: [...el.querySelectorAll("output")].pop().textContent,
    fmtAsMapCallback: [1.23456, 7.89012, 3.45678].map(kit.fmt),
    signedPositive: kit.signed(3),
    signedNegative: kit.signed(-3.5),
    bareSvg: made.svg,
    bareSurfaces: bare.querySelectorAll("svg").length,
  };
}

async function main() {
  const siteDir = path.resolve(process.argv[2] || "site");
  const route = process.argv[3] || "/gcse-maths/higher/";
  const kitPath = `${route.replace(/\/$/, "")}/assets/figures/kit.js`;

  const { chromium } = loadPlaywright();
  const launch = { channel: "chrome" };
  if (process.env.CHROME_PATH) launch.executablePath = process.env.CHROME_PATH;
  let browser;
  try {
    browser = await chromium.launch(launch);
  } catch (err) {
    delete launch.channel;
    browser = await chromium.launch(launch);
  }

  let result;
  try {
    const context = await browser.newContext();
    await context.route("**/*", (r) => {
      const url = new URL(r.request().url());
      const file = path.join(siteDir, decodeURIComponent(url.pathname));
      if (!file.startsWith(siteDir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        return r.fulfill({ status: 404, body: "not found" });
      }
      return r.fulfill({
        status: 200,
        contentType: TYPES[path.extname(file)] || "application/octet-stream",
        body: fs.readFileSync(file),
      });
    });
    const page = await context.newPage();
    await page.goto(`http://figures.local${route}`, { waitUntil: "load" });
    result = await page.evaluate(probe, kitPath);
    await context.close();
  } finally {
    await browser.close();
  }

  const problems = [];
  const want = (what, got, expected) => {
    if (got !== expected) problems.push(`${what}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(got)}`);
  };

  want("the surface's role", result.svgRole, "img");
  if (!result.svgLabel) problems.push("the surface has no accessible name");
  want("the surface sets no pixel height", result.svgHasHeight, false);
  want("the readout is a live region", result.readoutLive, "polite");
  want("the readout is not role=img", result.readoutRole, null);
  want("panel returns its controls column", result.controlsIsElement, true);
  want("`show: false` adds no value display", result.quietHasOutput, false);
  want("a unit follows the number", result.unitOutput, "200 \u03a9");
  want("fmt as a map callback ignores the index", JSON.stringify(result.fmtAsMapCallback),
       JSON.stringify(["1", "7.9", "3.46"]));
  want("a positive signed number", result.signedPositive, "+ 3");
  want("a negative signed number", result.signedNegative, "\u2212 3.5");
  want("a figure with no drawing makes no surface", result.bareSvg, null);
  want("and puts none on the page", result.bareSurfaces, 0);

  if (problems.length) {
    console.error("the figure kit does not keep its contract:");
    for (const problem of problems) console.error(`   ${problem}`);
    process.exit(1);
  }
  console.log("figure kit: contract kept");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
