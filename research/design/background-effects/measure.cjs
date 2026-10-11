// Measure background effects against a page the pipeline actually ships.
//
// This is `scripts/measure-budget.cjs` extended: it serves `site/` from a real
// HTTP server (so `transferSize` is populated), sends the *shipped* content
// security policy from `site/_headers`, injects one prototype variant into the
// real page, and records frame timing, main-thread cost, bytes, the idle
// behaviour and — with `--reduced-motion` — what `prefers-reduced-motion` does.
//
// Usage:
//   node research/design/background-effects/measure.cjs \
//     --variants baseline,gradient-static,gradient-animated,dots,field-2d,field-gl,fluid \
//     --seconds 8 --gpu real --cpu 1 --inject bundle --repeat 5 \
//     --json /tmp/pi-delegate/del-20/real-gpu.json
//
// Flags:
//   --variants a,b,c   variants to measure (`baseline` = no injection)
//   --seconds N        length of the active window (default 8)
//   --gpu real|headless|swiftshader
//   --cpu N            CPU throttle rate (default 1 = none)
//   --inject bundle|module|async   how the variant reaches the page (default bundle)
//   --repeat N         page loads used for the budget median (default 5)
//   --route PATH       route under site/ (default the chapter-1 Learn page)
//   --site DIR         build directory (default site)
//   --reduced-motion   also measure each variant with reduce forced
//   --nogl             also measure each variant with WebGL forced unavailable
//   --json FILE        write the full result as JSON
//   --quiet            only write the JSON
//
// Requires Playwright and Chrome. Set PLAYWRIGHT_PATH / CHROME_PATH if they do
// not resolve.

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const zlib = require("node:zlib");
const { execFileSync } = require("node:child_process");

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
const HEADLESS_SHELL = process.env.CHROME_PATH
  || "/home/leon/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
};

const CSP_PROBE = `
  window.__bgCspViolations = [];
  document.addEventListener("securitypolicyviolation", (e) =>
    window.__bgCspViolations.push({ directive: e.violatedDirective, blockedURI: e.blockedURI }));
`;

const NOGL_OVERRIDE = `
  (function () {
    const orig = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type) {
      if (String(type).indexOf("webgl") === 0) return null;
      return orig.apply(this, arguments);
    };
  })();
`;

function injection(variant, mode, nogl) {
  if (variant === "baseline") return { head: "", tail: "" };
  const guard = nogl ? `<script>${NOGL_OVERRIDE}</script>` : "";
  if (mode === "bundle") {
    if (!fs.existsSync(path.join(BG_DIR, "dist", `${variant}.js`))) {
      return injection(variant, "async", nogl);
    }
    return {
      head: `${guard}<script>${CSP_PROBE}</script><script async type="module" src="/__bg/dist/${variant}.js"></script>`,
      tail: `<script>(function poll(n){ if (window.__bgBoot) { window.__bgBoot(); } else if (n < 400) { setTimeout(function(){ poll(n + 1); }, 25); } })(0);</script>`,
    };
  }
  if (mode === "async") {
    return {
      head: `${guard}<script>${CSP_PROBE}</script>`,
      tail: `<script>import("/__bg/index.js").then(function (m) { return m.mount({ variant: ${JSON.stringify(variant)} }); }).then(function (h) { window.__bgHandle = h; window.__bgReady = true; });</script>`,
    };
  }
  if (mode === "module") {
    return {
      head: `${guard}<script>${CSP_PROBE}</script>`,
      tail: `<script type="module">import { mount } from "/__bg/index.js"; mount({ variant: ${JSON.stringify(variant)} }).then(function (h) { window.__bgHandle = h; window.__bgReady = true; });</script>`,
    };
  }
  throw new Error(`unknown inject mode ${mode}`);
}

function parseHeaders(siteDir) {
  const file = path.join(siteDir, "_headers");
  const headers = {};
  if (!fs.existsSync(file)) return headers;
  let current = null;
  for (const raw of fs.readFileSync(file, "utf8").split("\n")) {
    if (!raw.trim()) continue;
    if (!raw.startsWith(" ")) { current = raw.trim(); continue; }
    if (current !== "/*") continue;
    const idx = raw.indexOf(":");
    if (idx < 0) continue;
    headers[raw.slice(0, idx).trim()] = raw.slice(idx + 1).trim();
  }
  return headers;
}

function parseArgs(argv) {
  const args = {
    variants: null, seconds: 8, gpu: "real", cpu: 1, inject: "bundle", repeat: 5,
    route: null, site: "site", reducedMotion: false, nogl: false, json: null, quiet: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--variants") args.variants = argv[++i].split(",").map((s) => s.trim()).filter(Boolean);
    else if (a === "--seconds") args.seconds = Number(argv[++i]);
    else if (a === "--gpu") args.gpu = argv[++i];
    else if (a === "--cpu") args.cpu = Number(argv[++i]);
    else if (a === "--inject") args.inject = argv[++i];
    else if (a === "--repeat") args.repeat = Number(argv[++i]);
    else if (a === "--route") args.route = argv[++i];
    else if (a === "--site") args.site = argv[++i];
    else if (a === "--json") args.json = argv[++i];
    else if (a === "--reduced-motion") args.reducedMotion = true;
    else if (a === "--nogl") args.nogl = true;
    else if (a === "--quiet") args.quiet = true;
    else throw new Error(`unknown argument ${a}`);
  }
  return args;
}

const DEFAULT_ROUTE = "/gcse-maths/higher/chapter-1/section-1.1/learn/";

function startServer(siteDir, cspHeaders, variant, mode, nogl) {
  const { head, tail } = injection(variant, mode, nogl);
  const server = http.createServer((req, res) => {
    let rel = decodeURIComponent(new URL(req.url, "http://local").pathname);
    let file;
    if (rel.startsWith("/__bg/")) file = path.join(BG_DIR, rel.slice("/__bg/".length));
    else {
      if (rel.endsWith("/")) rel += "index.html";
      file = path.join(siteDir, rel);
    }
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("not found");
    }
    const type = TYPES[path.extname(file)] || "application/octet-stream";
    let body = fs.readFileSync(file);
    if (type.startsWith("text/html")) {
      const html = body.toString("utf8");
      const injected = html
        .replace("</head>", `${head}</head>`)
        .replace("</body>", `${tail}</body>`);
      body = Buffer.from(injected, "utf8");
    }
    const headers = { "Content-Type": type, ...cspHeaders };
    headers["Content-Length"] = body.length;
    res.writeHead(200, headers);
    res.end(body);
  });
  return server;
}

function launchOptions(gpu) {
  if (gpu === "real") {
    return {
      channel: "chrome",
      headless: false,
      args: [
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
        "--disable-background-timer-throttling",
        "--window-size=1280,900",
      ],
    };
  }
  return { executablePath: HEADLESS_SHELL };
}

async function cdpMetrics(client) {
  const { metrics } = await client.send("Performance.getMetrics");
  const out = {};
  for (const m of metrics) out[m.name] = m.value;
  return out;
}

function diffMetrics(a, b) {
  const out = {};
  for (const key of Object.keys(b)) {
    if (typeof b[key] === "number" && typeof a[key] === "number") out[key] = b[key] - a[key];
  }
  return out;
}

function frameStats(frames) {
  if (!frames.length) return { count: 0, fps: 0, p50Ms: 0, p95Ms: 0, p99Ms: 0, meanMs: 0, maxMs: 0, dropped: 0, droppedPct: 0 };
  const sorted = [...frames].sort((a, b) => a - b);
  const q = (p) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))];
  const mean = frames.reduce((s, v) => s + v, 0) / frames.length;
  const median = q(0.5);
  const dropped = frames.filter((v) => v > median * 1.5).length;
  return {
    count: frames.length,
    fps: 1000 / mean,
    p50Ms: median,
    p95Ms: q(0.95),
    p99Ms: q(0.99),
    meanMs: mean,
    maxMs: sorted[sorted.length - 1],
    dropped,
    droppedPct: (dropped / frames.length) * 100,
  };
}

function median(values) {
  const s = [...values].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

async function collectBudget(page) {
  return page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource").map((e) => ({
      path: new URL(e.name).pathname,
      initiatorType: e.initiatorType,
      transferSize: e.transferSize,
    }));
    return {
      nav: {
        transferSize: nav.transferSize,
        domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
        load: Math.round(nav.loadEventEnd),
      },
      resources,
      total: nav.transferSize + resources.reduce((s, r) => s + r.transferSize, 0),
      requests: 1 + resources.length,
      added: resources.filter((r) => r.path.startsWith("/__bg/")).map((r) => r.path),
    };
  });
}

async function loadOnce(page, url) {
  await page.goto(url, { waitUntil: "load" });
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(300);
  return collectBudget(page);
}

async function measureVariant(browser, args, port, variant, opts = {}) {
  const { reduced = false, nogl = false } = opts;
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    serviceWorkers: "block",
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const badResponses = [];
  page.on("console", (msg) => { if (msg.type() === "error" && !/^Failed to load resource/.test(msg.text())) consoleErrors.push(msg.text()); });
  page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));
  page.on("response", (res) => {
    if (res.status() >= 400 && !res.url().endsWith("/favicon.ico")) badResponses.push(`${res.status()} ${new URL(res.url()).pathname}`);
  });

  const client = await page.context().newCDPSession(page);
  await client.send("Performance.enable");
  if (args.cpu > 1) await client.send("Emulation.setCPUThrottlingRate", { rate: args.cpu });

  const url = `http://127.0.0.1:${port}${args.route}`;

  // Budget: several loads, report the median. A single load on a shared
  // machine is noisy enough to matter (the same page moved by 60 ms DCL
  // between two runs).
  const budgets = [];
  for (let i = 0; i < args.repeat; i++) budgets.push(await loadOnce(page, url));
  const budget = {
    requests: median(budgets.map((b) => b.requests)),
    total: median(budgets.map((b) => b.total)),
    document: median(budgets.map((b) => b.nav.transferSize)),
    dcl: median(budgets.map((b) => b.nav.domContentLoaded)),
    dclAll: budgets.map((b) => b.nav.domContentLoaded),
    added: [...new Set(budgets.flatMap((b) => b.added))],
  };

  if (variant !== "baseline") {
    await page.waitForFunction(() => window.__bgReady === true, null, { timeout: 15000 }).catch(() => {});
  }

  // Active window: keep the module awake with real pointer moves, as a reader
  // scrolling and moving the mouse would.
  await page.evaluate(() => {
    window.__frames = [];
    window.__longtasks = [];
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) window.__longtasks.push({ start: e.startTime, duration: e.duration });
      }).observe({ entryTypes: ["longtask"] });
    } catch { /* unsupported */ }
    let last = performance.now();
    const tick = (t) => { window.__frames.push(t - last); last = t; window.__raf = requestAnimationFrame(tick); };
    window.__raf = requestAnimationFrame(tick);
  });
  const before = await cdpMetrics(client);
  const deadline = Date.now() + args.seconds * 1000;
  while (Date.now() < deadline) {
    await page.mouse.move(200 + Math.random() * 880, 200 + Math.random() * 500, { steps: 4 });
    await page.waitForTimeout(250);
  }
  const activeRaw = await page.evaluate(() => {
    cancelAnimationFrame(window.__raf);
    return { frames: window.__frames, longtasks: window.__longtasks };
  });
  const after = await cdpMetrics(client);
  const activeCdp = diffMetrics(before, after);
  const handleActive = await page.evaluate(() => (window.__bgHandle && window.__bgHandle.stats ? window.__bgHandle.stats() : null));

  // Idle: no input for longer than idleMs, then a two-second window.
  await page.waitForTimeout(3500);
  const idleBefore = await cdpMetrics(client);
  await page.waitForTimeout(2000);
  const idleAfter = await cdpMetrics(client);
  const idleCdp = diffMetrics(idleBefore, idleAfter);
  const handleIdle = await page.evaluate(() => (window.__bgHandle && window.__bgHandle.stats ? window.__bgHandle.stats() : null));

  const errors = await page.evaluate(() => window.__bgErrors || []);
  const cspViolations = await page.evaluate(() => window.__bgCspViolations || []);

  await context.close();

  return {
    variant,
    reducedMotion: reduced,
    nogl,
    budget,
    active: {
      frames: frameStats(activeRaw.frames),
      wallMs: args.seconds * 1000,
      longTasks: {
        count: activeRaw.longtasks.length,
        totalMs: activeRaw.longtasks.reduce((s, t) => s + t.duration, 0),
        maxMs: activeRaw.longtasks.reduce((s, t) => Math.max(s, t.duration), 0),
      },
      cdp: activeCdp,
      handle: handleActive,
    },
    idle: { cdp: idleCdp, handle: handleIdle },
    errors,
    cspViolations,
    consoleErrors,
    badResponses,
  };
}

async function tier0Check(browser, args, port) {
  // With scripting off, the page must be unchanged and readable: this is the
  // collection's Tier-0 rule, and a background must fail to nothing.
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:${port}${args.route}`, { waitUntil: "load" });
  const html = await page.content();
  await context.close();
  const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return {
    textChars: text.length,
    mathElements: (html.match(/<math\b/g) || []).length,
    hasChapterHeading: /Chapter 1/i.test(text),
    canvasElements: (html.match(/<canvas\b/g) || []).length,
  };
}

function gzip(file) {
  return zlib.gzipSync(fs.readFileSync(file), { level: 9 }).length;
}

function fileSizes() {
  const out = {};
  for (const f of ["index.js", "palette.js", "fluid.js", "field-gl.js", "field-2d.js", "dots.js", "gradient.js"]) {
    const p = path.join(BG_DIR, f);
    out[f] = { raw: fs.statSync(p).size, gzip: gzip(p) };
  }
  for (const f of fs.readdirSync(path.join(BG_DIR, "dist"))) {
    const p = path.join(BG_DIR, "dist", f);
    out[`dist/${f}`] = { raw: fs.statSync(p).size, gzip: gzip(p) };
  }
  return out;
}

function kb(n) { return n == null ? "?" : `${(n / 1024).toFixed(1)} kB`; }

function printSummary(output) {
  const { meta, results } = output;
  const active = results.filter((r) => !r.reducedMotion && !r.nogl);
  console.log(`route   ${meta.route}`);
  console.log(`gpu     ${meta.gpu}   cpu throttle ${meta.cpuRate}x   window ${meta.seconds}s   inject ${meta.inject}   repeat ${meta.repeat}`);
  console.log("");
  console.log("active window (pointer kept moving)");
  console.log("  variant            fps    p50    p95    max  drop%  longMs  taskMs  scriptMs  submitMs  heapMB");
  for (const r of active) {
    const f = r.active.frames;
    const c = r.active.cdp;
    const h = r.active.handle || {};
    const submit = typeof h.submitMsMean === "number" ? h.submitMsMean.toFixed(3) : "-";
    console.log(
      `  ${r.variant.padEnd(17)}` +
      `${f.fps.toFixed(1).padStart(5)}  ` +
      `${f.p50Ms.toFixed(1).padStart(5)}  ` +
      `${f.p95Ms.toFixed(1).padStart(5)}  ` +
      `${f.maxMs.toFixed(0).padStart(5)}  ` +
      `${f.droppedPct.toFixed(1).padStart(5)}  ` +
      `${(r.active.longTasks.totalMs).toFixed(0).padStart(6)}  ` +
      `${((c.TaskDuration || 0) * 1000).toFixed(0).padStart(6)}  ` +
      `${((c.ScriptDuration || 0) * 1000).toFixed(0).padStart(8)}  ` +
      `${String(submit).padStart(8)}  ` +
      `${((c.JSHeapUsedSize || 0) / 1048576).toFixed(1).padStart(6)}`,
    );
  }
  console.log("");
  console.log("budget (median of " + meta.repeat + " first loads)");
  console.log("  variant            requests  transfer  document  DCL(ms)  added");
  for (const r of active) {
    console.log(
      `  ${r.variant.padEnd(17)}` +
      `${String(r.budget.requests).padStart(8)}  ` +
      `${kb(r.budget.total).padStart(8)}  ` +
      `${kb(r.budget.document).padStart(8)}  ` +
      `${String(r.budget.dcl).padStart(7)}  ` +
      `${r.budget.added.join(",")}`,
    );
  }
  console.log("");
  console.log("idle (no input for 3.5 s, then a 2 s window)");
  console.log("  variant            looping  taskMs(2s)  taskMs/s");
  for (const r of active) {
    const looping = r.idle.handle ? String(r.idle.handle.looping) : "n/a";
    const task = (r.idle.cdp.TaskDuration || 0) * 1000;
    console.log(`  ${r.variant.padEnd(17)}${looping.padStart(7)}  ${task.toFixed(1).padStart(10)}  ${(task / 2).toFixed(2).padStart(8)}`);
  }
  const reduced = results.filter((r) => r.reducedMotion);
  if (reduced.length) {
    console.log("\nprefers-reduced-motion: reduce");
    console.log("  variant            reduce  looping  fps    taskMs(window)");
    for (const r of reduced) {
      const h = r.active.handle;
      console.log(
        `  ${r.variant.padEnd(17)}` +
        `${String(h && h.reducedMotion).padStart(6)}  ` +
        `${String(h && h.looping).padStart(7)}  ` +
        `${r.active.frames.fps.toFixed(1).padStart(5)}  ` +
        `${(((r.active.cdp.TaskDuration || 0) * 1000)).toFixed(0).padStart(9)}`,
      );
    }
  }
  const nogl = results.filter((r) => r.nogl);
  if (nogl.length) {
    console.log("\nWebGL forced unavailable (fail-to-nothing)");
    console.log("  variant            handle  errors");
    for (const r of nogl) {
      console.log(`  ${r.variant.padEnd(17)}${String(r.active.handle === null).padStart(6)}  ${r.errors.join(" | ")}`);
    }
  }
  if (output.tier0) {
    console.log(`\nTier-0 (scripting off): ${output.tier0.textChars} chars of text, ${output.tier0.mathElements} MathML elements, canvas elements ${output.tier0.canvasElements}`);
  }
  console.log("");
  const problems = results.filter((r) => r.errors.length || r.cspViolations.length || r.badResponses.length || r.consoleErrors.length);
  if (problems.length) {
    console.log("errors / csp / console");
    for (const r of problems) {
      console.log(`  ${r.variant}${r.reducedMotion ? " [reduce]" : ""}${r.nogl ? " [nogl]" : ""}`);
      for (const e of new Set(r.errors)) console.log(`    module: ${e}`);
      for (const v of r.cspViolations) console.log(`    csp: ${v.directive} blocked ${v.blockedURI}`);
      for (const b of new Set(r.badResponses)) console.log(`    http: ${b}`);
      for (const e of new Set(r.consoleErrors)) console.log(`    console: ${e}`);
    }
  } else {
    console.log("errors / csp / console: none");
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const siteDir = path.resolve(args.site);
  args.route = args.route || DEFAULT_ROUTE;
  const variants = args.variants || ["baseline", "gradient-static", "gradient-animated", "dots", "field-2d", "field-gl", "fluid", "blob-worker", "module-worker"];

  const headers = parseHeaders(siteDir);
  const browser = await chromium.launch(launchOptions(args.gpu));
  const results = [];
  let tier0 = null;
  try {
    for (const variant of variants) {
      const server = startServer(siteDir, headers, variant, args.inject, false);
      await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
      const port = server.address().port;
      results.push(await measureVariant(browser, args, port, variant, {}));
      server.close();
    }
    if (args.reducedMotion) {
      for (const variant of variants) {
        const server = startServer(siteDir, headers, variant, args.inject, false);
        await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
        const port = server.address().port;
        results.push(await measureVariant(browser, args, port, variant, { reduced: true }));
        server.close();
      }
    }
    if (args.nogl) {
      for (const variant of ["fluid", "field-gl", "field-2d", "dots"]) {
        const server = startServer(siteDir, headers, variant, args.inject, true);
        await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
        const port = server.address().port;
        results.push(await measureVariant(browser, args, port, variant, { nogl: true }));
        server.close();
      }
    }
    {
      const server = startServer(siteDir, headers, "baseline", args.inject, false);
      await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
      tier0 = await tier0Check(browser, args, server.address().port);
      server.close();
    }
  } finally {
    await browser.close();
  }

  const output = {
    meta: {
      route: args.route,
      site: siteDir,
      seconds: args.seconds,
      cpuRate: args.cpu,
      gpu: args.gpu,
      inject: args.inject,
      repeat: args.repeat,
      generatedAt: new Date().toISOString(),
      csp: headers["Content-Security-Policy"] || null,
    },
    bytes: fileSizes(),
    tier0,
    results,
  };

  if (args.json) {
    fs.mkdirSync(path.dirname(args.json), { recursive: true });
    fs.writeFileSync(args.json, JSON.stringify(output, null, 2));
  }
  if (!args.quiet) printSummary(output);
}

main().catch((err) => { console.error(err); process.exit(1); });
