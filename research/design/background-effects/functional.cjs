// Functional checks for the prototype, separate from the performance numbers.
//
//   node research/design/background-effects/functional.cjs
//
// Checks, against the built site served with the shipped CSP:
//   1. each effect paints something (canvas is not left blank),
//   2. the palette really is read from --tb-* and changes when the reader
//      changes bundle or scheme, with no reload and no re-mount,
//   3. pointer events reach the page (the background does not swallow them),
//   4. prefers-reduced-motion stops the loop,
//   5. a blob worker is blocked by the shipped CSP and a same-origin module
//      worker is not.
//
// Screenshots land in --out (default /tmp/pi-delegate/del-20/shots).

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

function loadPlaywright() {
  const candidates = [
    process.env.PLAYWRIGHT_PATH,
    "playwright",
    "/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright",
  ].filter(Boolean);
  for (const candidate of candidates) {
    try { return require(candidate); } catch { /* next */ }
  }
  throw new Error("playwright not found; set PLAYWRIGHT_PATH");
}
const { chromium } = loadPlaywright();

const BG_DIR = __dirname;
const SITE = process.env.BG_SITE || "/tmp/pi-delegate/del-20/site-snapshot";
const OUT = process.argv.includes("--out")
  ? process.argv[process.argv.indexOf("--out") + 1]
  : "/tmp/pi-delegate/del-20/shots";
const ROUTE = process.argv.includes("--route")
  ? process.argv[process.argv.indexOf("--route") + 1]
  : "/gcse-maths/higher/chapter-1/section-1.1/learn/";
const HEADLESS = process.env.CHROME_PATH
  || "/home/leon/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json", ".webmanifest": "application/manifest+json", ".ico": "image/x-icon", ".txt": "text/plain", ".xml": "application/xml", ".woff2": "font/woff2" };

function headers() {
  const out = {};
  let current = null;
  for (const raw of fs.readFileSync(path.join(SITE, "_headers"), "utf8").split("\n")) {
    if (!raw.trim()) continue;
    if (!raw.startsWith(" ")) { current = raw.trim(); continue; }
    if (current !== "/*") continue;
    const i = raw.indexOf(":");
    out[raw.slice(0, i).trim()] = raw.slice(i + 1).trim();
  }
  return out;
}

function startServer(variant) {
  const csp = headers();
  const server = http.createServer((req, res) => {
    let rel = decodeURIComponent(new URL(req.url, "http://local").pathname);
    let file;
    if (rel.startsWith("/__bg/")) file = path.join(BG_DIR, rel.slice(6));
    else { if (rel.endsWith("/")) rel += "index.html"; file = path.join(SITE, rel); }
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end("nope"); }
    const type = TYPES[path.extname(file)] || "application/octet-stream";
    let body = fs.readFileSync(file);
    if (type.startsWith("text/html")) {
      const boot = variant === "none" ? "" : `
<script>window.__bgCspViolations = []; document.addEventListener("securitypolicyviolation", (e) => window.__bgCspViolations.push({ directive: e.violatedDirective, blockedURI: e.blockedURI }));</script>
<script async type="module" src="/__bg/dist/${variant}.js"></script>
<script>(function poll(n){ if (window.__bgBoot) { window.__bgBoot(); } else if (n < 400) { setTimeout(function(){ poll(n + 1); }, 25); } })(0);</script>`;
      body = Buffer.from(body.toString("utf8").replace("</body>", `${boot}</body>`), "utf8");
    }
    res.writeHead(200, { "Content-Type": type, ...csp, "Content-Length": body.length });
    res.end(body);
  });
  return server;
}

function canvasProbe(page) {
  // WebGL canvases with preserveDrawingBuffer:false read back blank outside the
  // frame that drew them, so the read is scheduled inside a rAF that runs after
  // the module's own frame. This is what "it paints something" is measured on.
  return page.evaluate(() => new Promise((resolve) => {
    const canvas = document.querySelector("canvas[class^='tb-bg']");
    const layer = document.querySelector(".tb-bg-gradient");
    if (!canvas) {
      resolve({ found: false, gradientLayer: !!layer, layerBackground: layer ? getComputedStyle(layer).backgroundImage.slice(0, 60) : null });
      return;
    }
    const rect = canvas.getBoundingClientRect();
    requestAnimationFrame(() => {
      const c2 = document.createElement("canvas");
      c2.width = 64;
      c2.height = 64;
      const ctx = c2.getContext("2d");
      let nonzero = 0;
      let sum = 0;
      try {
        ctx.drawImage(canvas, 0, 0, 64, 64);
        const d = ctx.getImageData(0, 0, 64, 64).data;
        for (let i = 0; i < d.length; i += 4) { if (d[i + 3] > 0) nonzero++; sum += d[i + 3]; }
      } catch (err) {
        resolve({ found: true, readError: String(err) });
        return;
      }
      resolve({
        found: true,
        width: canvas.width,
        height: canvas.height,
        cssWidth: Math.round(rect.width),
        cssHeight: Math.round(rect.height),
        zIndex: getComputedStyle(canvas).zIndex,
        pointerEvents: getComputedStyle(canvas).pointerEvents,
        paintedPixels64: nonzero,
        meanAlpha: +(sum / 4096).toFixed(2),
        palette: window.__bgHandle && window.__bgHandle.palette ? window.__bgHandle.palette().tokens : null,
      });
    });
  }));
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: HEADLESS, args: ["--enable-unsafe-swiftshader"] });
  const report = {};

  for (const variant of ["fluid", "field-gl", "field-2d", "dots", "gradient-static", "gradient-animated"]) {
    const server = startServer(variant);
    await new Promise((r) => server.listen(0, "127.0.0.1", r));
    const port = server.address().port;
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: "block" });
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:${port}${ROUTE}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__bgReady === true, null, { timeout: 15000 }).catch(() => {});
    await page.mouse.move(600, 420);
    await page.mouse.move(800, 500, { steps: 12 });
    await page.waitForTimeout(1200);

    const info = await canvasProbe(page);
    await page.screenshot({ path: path.join(OUT, `${variant}.png`) });

    // Change the reader's bundle and scheme the way the Settings runtime does.
    const before = info.palette;
    await page.evaluate(() => {
      document.documentElement.dataset.theme = "neon";
      document.body.dataset.mdColorScheme = "slate";
    });
    await page.waitForTimeout(400);
    const after = await page.evaluate(() => {
      const h = window.__bgHandle;
      const p = h && h.palette ? h.palette() : null;
      return p ? p.tokens : null;
    });

    report[variant] = {
      canvas: info,
      paletteBefore: before,
      paletteAfterThemeSwitch: after,
      paletteChanged: JSON.stringify(before) !== JSON.stringify(after),
      cspViolations: await page.evaluate(() => window.__bgCspViolations || []),
      errors: await page.evaluate(() => window.__bgErrors || []),
    };
    await context.close();
    server.close();
  }

  // Pointer events must reach the page under the background.
  {
    const server = startServer("fluid");
    await new Promise((r) => server.listen(0, "127.0.0.1", r));
    const port = server.address().port;
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: "block" });
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:${port}${ROUTE}`, { waitUntil: "load" });
    await page.waitForTimeout(500);
    report.pointerEventsReachPage = await page.evaluate(() => {
      const el = document.elementFromPoint(600, 420);
      const canvas = document.querySelector("canvas[class^='tb-bg']");
      return {
        topElement: el ? `${el.tagName}.${el.className || ""}`.slice(0, 60) : null,
        canvasIsTopElement: !!(canvas && el === canvas),
        canvasPointerEvents: canvas ? getComputedStyle(canvas).pointerEvents : null,
      };
    });
    await context.close();
    server.close();
  }

  // prefers-reduced-motion: the loop must be off, and the first frame still drawn.
  {
    const server = startServer("fluid");
    await new Promise((r) => server.listen(0, "127.0.0.1", r));
    const port = server.address().port;
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: "block", reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:${port}${ROUTE}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__bgReady === true, null, { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(1200);
    report.reducedMotion = await page.evaluate(() => {
      const h = window.__bgHandle;
      return h ? { ...h.stats(), reduceQuery: matchMedia("(prefers-reduced-motion: reduce)").matches } : null;
    });
    await context.close();
    server.close();
  }

  // CSP: blob worker blocked, same-origin module worker allowed.
  {
    for (const variant of ["module-worker", "blob-worker"]) {
      const server = startServer("none");
      await new Promise((r) => server.listen(0, "127.0.0.1", r));
      const port = server.address().port;
      const context = await browser.newContext({ viewport: { width: 800, height: 600 }, serviceWorkers: "block" });
      const page = await context.newPage();
      await page.goto(`http://127.0.0.1:${port}${ROUTE}`, { waitUntil: "load" });
      const outcome = await page.evaluate(async (v) => {
        const breaches = [];
        document.addEventListener("securitypolicyviolation", (e) => breaches.push(`${e.violatedDirective} ${e.blockedURI}`));
        const { mount } = await import("/__bg/index.js");
        const handle = await mount({ variant: v });
        return { outcome: handle && handle.stats ? handle.stats().outcome : null, breaches };
      }, variant);
      report[`csp-${variant}`] = outcome;
      await context.close();
      server.close();
    }
  }

  fs.writeFileSync(path.join(OUT, "functional.json"), JSON.stringify(report, null, 2));
  await browser.close();
  console.log(JSON.stringify(report, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
