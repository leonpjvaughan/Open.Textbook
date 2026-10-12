// Measure what every figure actually paints, in both schemes, and capture it.
//
// A figure's colours come from `fig-*` classes and `--tb-*` tokens, and
// `tests/test_themes.py` proves those tokens clear their contrast thresholds. That
// is necessary and not sufficient: it cannot see what a *module* does with them.
// A module can draw an element with no fill at all — SVG's initial `fill` is
// black, so it vanishes on a dark panel — or use two tokens that are close enough
// together that two series look like one.
//
// So this does not read the source. It loads each figure in a browser, asks for
// the computed paint of every element it contains, and measures each one against
// the panel it sits on. The static scans agree with it and are not trusted
// instead of it.
//
// Usage:
//   node scripts/audit-figures.cjs <siteDir> [--schemes light,dark] [--theme id]
//       [--maps <figure-pages.json>] [--shots <dir>] [--json <file>] [--only slug]
//
// The JSON is the report; the screenshots are the record for a human to look at.

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
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".json": "application/json",
  ".ico": "image/x-icon",
};

// WCAG 2.1 relative luminance and contrast ratio, run inside the page.
const MEASURE = `
(function (slug) {
  const TAGS_DRAWN = new Set(["rect","circle","ellipse","line","path","polygon","polyline","text","tspan"]);
  const PAINTED = TAGS_DRAWN;
  function parse(c) {
    if (!c || c === "none" || c === "transparent") return null;
    // rgb() takes 0-255; color(srgb …) — what Chrome returns for a
    // color-mix() — takes 0-1. Reading one as the other makes every ratio
    // wrong while still looking plausible, so both are handled explicitly.
    const m = c.match(/rgba?\\(([^)]+)\\)/);
    if (m) {
      const parts = m[1].split(/[,\\s/]+/).filter(Boolean).map(Number);
      if (parts.length < 3) return null;
      return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
    }
    const s = c.match(/color\\(\\s*srgb\\s+([^)]+)\\)/);
    if (s) {
      const parts = s[1].split(/[,\\s/]+/).filter(Boolean).map(Number);
      if (parts.length < 3) return null;
      return {
        r: parts[0] * 255,
        g: parts[1] * 255,
        b: parts[2] * 255,
        a: parts.length > 3 ? parts[3] : 1,
      };
    }
    return null;
  }
  function over(fg, bg) {
    if (!fg) return null;
    const a = fg.a == null ? 1 : fg.a;
    return {
      r: fg.r * a + bg.r * (1 - a),
      g: fg.g * a + bg.g * (1 - a),
      b: fg.b * a + bg.b * (1 - a),
      a: 1,
    };
  }
  function lum(c) {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  }
  function ratio(a, b) {
    if (!a || !b) return null;
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  const box = document.querySelector('maths-figure[data-figure="' + slug + '"]');
  if (!box) return { error: "not on this page" };

  // The panel the figure is drawn on: the nearest opaque background above it.
  function panel(node) {
    let el = node;
    while (el && el !== document.documentElement) {
      const c = parse(getComputedStyle(el).backgroundColor);
      if (c && (c.a == null || c.a > 0.9)) return { c, from: el.className || el.tagName };
      el = el.parentElement;
    }
    const body = parse(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
    return { c: body, from: "body" };
  }
  const panelInfo = panel(box);
  const bg = panelInfo.c;

  function visible(el) {
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden") return false;
    if (Number(s.opacity) === 0) return false;
    return true;
  }

  const paints = new Map();   // colour -> { count, kinds:Set, example }
  const problems = [];
  const all = [box, ...box.querySelectorAll("*")];
  for (const el of all) {
    if (el === box) continue;
    if (!visible(el)) continue;
    const s = getComputedStyle(el);
    const isSvg = el.namespaceURI === "http://www.w3.org/2000/svg";
    const tag = el.tagName.toLowerCase();
    // Only elements that paint themselves. A <g> inherits fill:black and paints
    // nothing, so counting it would report a bug that is not there — which is
    // how a check earns the right to be ignored.
    const draws = isSvg && PAINTED.has(tag);
    const isSvgText = isSvg && (tag === "text" || tag === "tspan");
    const isHtmlText = !isSvg && el.children.length === 0 && (el.textContent || "").trim().length > 0;
    if (!draws && !isHtmlText) continue;
    if (isSvgText && !(el.textContent || "").trim()) continue;
    // A zero-size box is not painted. The <option> element is the case that
    // matters: Chrome lays it out in the native widget, so computed style reports
    // the *initial* colour — black — and measuring it would report ten defects
    // that are not there. A check that cries wolf is a check that gets ignored.
    // Both axes must be zero: a vertical <line> is legitimately 0 wide, and drawn.
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;

    // Text sits on its own background when the element paints one, and on the
    // panel when it does not. Measuring against the panel regardless would miss
    // dark text on a dark chip.
    const own = parse(s.backgroundColor);
    const onBg = own && (own.a == null || own.a > 0.9) ? own : bg;

    const found = [];
    if (isSvg) {
      const fill = parse(s.fill);
      const stroke = parse(s.stroke);
      const w = parseFloat(s.strokeWidth || "0");
      if (isSvgText) {
        // SVG text is painted with fill; that is its colour, at the text
        // threshold. Pushing fill as a shape too would double-count one defect.
        if (fill) found.push({ kind: "text", colour: fill, bg: onBg });
      } else {
        if (fill) found.push({ kind: "fill", colour: fill, bg: onBg });
        if (stroke && w > 0) found.push({ kind: "stroke", colour: stroke, bg: onBg });
      }
    } else {
      const c = parse(s.color);
      if (c) found.push({ kind: "text", colour: c, bg: onBg });
    }

    for (const f of found) {
      const solid = over(f.colour, f.bg);
      const key = solid ? \`\${Math.round(solid.r)},\${Math.round(solid.g)},\${Math.round(solid.b)}\` : "?";
      if (!paints.has(key)) {
        paints.set(key, { colour: solid, kinds: new Set(), count: 0, example: el.tagName.toLowerCase() + (el.className.baseVal || el.className || "") });
      }
      const rec = paints.get(key);
      rec.kinds.add(f.kind);
      rec.count += 1;
      const r = ratio(solid, f.bg);
      const need = f.kind === "text" ? 4.5 : 3.0;
      if (r != null && r < need) {
        problems.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className.baseVal || el.className || "").toString().slice(0, 40),
          kind: f.kind,
          ratio: Math.round(r * 100) / 100,
          need,
          example: (el.textContent || "").trim().slice(0, 30),
        });
      }
    }
  }
  return {
    slug,
    panel: panelInfo.c,
    panelFrom: String(panelInfo.from).slice(0, 40),
    paints: [...paints.values()].map((p) => ({
      rgb: [Math.round(p.colour.r), Math.round(p.colour.g), Math.round(p.colour.b)],
      kinds: [...p.kinds],
      count: p.count,
      example: p.example,
      ratio: Math.round(ratio(p.colour, bg) * 100) / 100,
    })),
    problems,
    box: (() => { const r = box.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; })(),
  };
})
`;

async function main() {
  const argv = process.argv.slice(2);
  const siteDir = path.resolve(argv.shift());
  let schemes = ["light", "dark"];
  let theme = null;
  let maps = "/tmp/figure-pages.json";
  let shots = null;
  let jsonOut = null;
  let only = null;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--schemes") schemes = argv[(i += 1)].split(",");
    else if (argv[i] === "--theme") theme = argv[(i += 1)];
    else if (argv[i] === "--maps") maps = argv[(i += 1)];
    else if (argv[i] === "--shots") shots = path.resolve(argv[(i += 1)]);
    else if (argv[i] === "--json") jsonOut = path.resolve(argv[(i += 1)]);
    else if (argv[i] === "--only") only = argv[(i += 1)];
  }
  if (shots) fs.mkdirSync(shots, { recursive: true });

  const pages = JSON.parse(fs.readFileSync(maps, "utf8"));
  let slugs = Object.keys(pages).sort();
  if (only) slugs = slugs.filter((s) => s === only);

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

  const SCHEME_VALUE = { light: "default", dark: "slate" };
  const report = {};
  for (const scheme of schemes) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      deviceScaleFactor: 2,
    });
    await context.addInitScript(
      ({ schemeKey, themeKey, bundle }) => {
        try {
          localStorage.setItem(schemeKey, bundle);
          if (themeKey) localStorage.setItem("textbooks:theme", themeKey);
        } catch (err) {}
      },
      { schemeKey: "textbooks:scheme", themeKey: theme, bundle: SCHEME_VALUE[scheme] }
    );
    await context.route("**/*", (route) => {
      const url = new URL(route.request().url());
      let rel = decodeURIComponent(url.pathname);
      if (rel.endsWith("/")) rel += "index.html";
      const file = path.join(siteDir, rel);
      if (!file.startsWith(siteDir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        return route.fulfill({ status: 404, body: "not found" });
      }
      return route.fulfill({
        status: 200,
        contentType: TYPES[path.extname(file)] || "application/octet-stream",
        body: fs.readFileSync(file),
      });
    });
    const page = await context.newPage();

    for (const slug of slugs) {
      const route = pages[slug][0];
      // Created once: rebuilding it per scheme would keep only the last one.
      if (!report[slug]) report[slug] = { page: route, schemes: {} };
      const entry = report[slug];
      try {
        await page.goto(`http://figures.local${route}`, { waitUntil: "load" });
        await page.waitForTimeout(500);
        const res = await page.evaluate(`${MEASURE}(${JSON.stringify(slug)})`);
        entry.schemes[scheme] = res;
        if (shots && !res.error) {
          const el = await page.$(`maths-figure[data-figure="${slug}"]`);
          if (el) {
            await el.screenshot({ path: path.join(shots, `${slug}${scheme === "light" ? "" : "-dark"}.png`) });
          }
        }
      } catch (err) {
        entry.schemes[scheme] = { error: String(err).slice(0, 120) };
      }
      process.stdout.write(".");
    }
    process.stdout.write(` ${scheme}\n`);
    await context.close();
  }
  await browser.close();

  if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(report, null, 1));

  // Summary.
  let bad = 0, errs = 0;
  for (const [slug, entry] of Object.entries(report)) {
    for (const [scheme, res] of Object.entries(entry.schemes)) {
      if (res.error) { errs += 1; continue; }
      if (res.problems.length) {
        bad += 1;
        console.log(`\n${slug} [${scheme}]  panel rgb(${res.panel.r},${res.panel.g},${res.panel.b})`);
        for (const p of res.problems.slice(0, 4)) {
          console.log(`   ${p.tag} .${p.cls} ${p.kind} ${p.ratio}:1 (needs ${p.need}) ${p.example}`);
        }
      }
    }
  }
  console.log(`\nfigures: ${slugs.length}  schemes: ${schemes.join(",")}`);
  console.log(`  measurements with a contrast failure: ${bad}`);
  console.log(`  figures that could not be measured: ${errs}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
