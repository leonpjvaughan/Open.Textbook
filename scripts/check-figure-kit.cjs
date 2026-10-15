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

    // The size scale and the two string helpers. `SIZE` is checked by value because
    // the phone floor is arithmetic: rendered size is `font-size` times the panel's
    // width over the viewBox width, so a 15-unit label is 9.6px at 390px and a
    // 13-unit one is 8.3px. The floor is 9px, and four modules had drifted below it
    // while every module's own attributes looked reasonable.
    size: kit.SIZE,

    // `label` must produce a well-formed element with a colour class by default,
    // because a `<text>` with no `fig-*`/`text-*` class is painted with `fill`'s
    // initial black and disappears on a dark panel. That defect was found 18 times.
    labelDefault: kit.label({ x: 10, y: 20, text: "Hi" }),
    labelAnchored: kit.label({ x: 1, y: 2, text: "0", anchor: "end", size: 15 }),
    labelEscaped: kit.label({ x: 0, y: 0, text: "a & b < c" }),

    // `scale` maps a domain onto a range. The y-axis case is the one that gets
    // flipped by hand, so it is checked directly.
    scaleX: [0, 5, 10].map(kit.scale({ domain: [0, 10], range: [100, 500] })),
    scaleY: [0, 10].map(kit.scale({ domain: [0, 10], range: [400, 40] })),
    scaleDegenerate: (() => {
      try {
        kit.scale({ domain: [3, 3], range: [0, 1] });
        return "no error";
      } catch (e) {
        return e.message;
      }
    })(),
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

  // ── the size scale ────────────────────────────────────────────────────────
  //
  // Grounded in measurement, not taste: at 390px a 560-unit viewBox draws at 0.64 of
  // its stated size, so the smallest named size must clear 9px. A module choosing its
  // own number is how four figures drifted below the floor while every one of their own
  // attributes looked reasonable. `audit-figures.cjs --mobile` measures what actually
  // reaches the screen; this checks the scale the modules are told to use.
  const PHONE_SCALE = 358 / 560;
  const FLOOR_PX = 9;
  if (!result.size || !Object.keys(result.size).length) {
    problems.push("the kit exports no SIZE scale, so every module picks its own number");
  }
  for (const [name, units] of Object.entries(result.size || {})) {
    const onPhone = units * PHONE_SCALE;
    if (onPhone < FLOOR_PX) {
      problems.push(
        `SIZE.${name} is ${units} units, which is ${onPhone.toFixed(1)}px at phone ` +
          `width - below the ${FLOOR_PX}px floor`,
      );
    }
  }

  // ── label ─────────────────────────────────────────────────────────────────
  //
  // A `<text>` with no `fig-*`/`text-*` class is painted with `fill`'s initial black and
  // disappears on a dark panel. That defect was found eighteen times by measurement, so
  // the helper carries the class by default rather than leaving it to the caller.
  const defaultLabel = result.labelDefault || "";
  if (!/^<text /.test(defaultLabel)) {
    problems.push(`label() does not return a <text> element: ${defaultLabel.slice(0, 60)}`);
  }
  if (!/class="text-ink"/.test(defaultLabel)) {
    problems.push(
      "label() has no default colour class, so a caller that forgets one gets " +
        "initial-black text on a dark panel",
    );
  }
  if (!/font-size="16"/.test(defaultLabel)) {
    problems.push(`label() does not default to SIZE.label: ${defaultLabel.slice(0, 60)}`);
  }
  if (!/text-anchor="end"/.test(result.labelAnchored || "")) {
    problems.push("label() ignores its `anchor` argument");
  }
  if (!/font-size="15"/.test(result.labelAnchored || "")) {
    problems.push("label() ignores its `size` argument");
  }
  if (!/a &amp; b &lt; c/.test(result.labelEscaped || "")) {
    problems.push(`label() does not escape its text: ${result.labelEscaped}`);
  }

  // ── scale ─────────────────────────────────────────────────────────────────
  //
  // The y-axis case is the one that gets flipped when written by hand: a value that
  // counts upwards onto an axis that counts downwards.
  const scaleX = result.scaleX || [];
  want("scale maps the domain's low end", scaleX[0], 100);
  want("scale maps the domain's middle", scaleX[1], 300);
  want("scale maps the domain's high end", scaleX[2], 500);
  const scaleY = result.scaleY || [];
  want("scale handles a range that counts down", scaleY[0], 400);
  want("scale handles a range that counts down at the top", scaleY[1], 40);
  if (!/no width/.test(result.scaleDegenerate || "")) {
    problems.push(
      "scale() accepts a domain with no width, which would divide by zero and " +
        "produce NaN coordinates rather than failing",
    );
  }


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
