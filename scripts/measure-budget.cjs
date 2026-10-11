// Measure the performance budget of a page the pipeline actually ships.
//
// DEPLOY.md records a budget as bytes over the wire on a first load: the
// `transferSize` of the navigation entry plus the sum over
// `performance.getEntriesByType("resource")`, with the Worker's
// `Cache-Control: public, max-age=0, must-revalidate` reproduced by a local
// server. This is that measurement, and the recorded numbers come from it.
//
// A real server is bound on an ephemeral port rather than served through request
// interception, because `transferSize` is only populated for a request that
// crossed the network stack; an intercepted response reports 0 and the budget
// would read as far too small.
//
// Usage:
//   node scripts/measure-budget.cjs [siteDir] [route] [--compress]
//
// Defaults: site and /gcse-maths/higher/chapter-1/section-1.1/learn/
//
// The server sends the file as it is on disk, with no compression, which is the
// method DEPLOY.md's recorded numbers use. `--compress` gzips compressible types
// as a CDN in front of the Worker would, to show the difference.
//
// Requires Playwright and Chrome, like test/theme-preview.cjs. Set
// PLAYWRIGHT_PATH (and CHROME_PATH for a non-default browser) if they are not
// resolvable.

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const zlib = require("node:zlib");

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
  ".html": "text/html; charset=utf-8",
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
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
};

const COMPRESSIBLE = new Set([".html", ".js", ".mjs", ".css", ".svg", ".json", ".webmanifest", ".txt", ".xml"]);

async function main() {
  const argv = process.argv.slice(2);
  const compress = argv.includes("--compress");
  const positional = argv.filter((arg) => !arg.startsWith("--"));
  const siteDir = path.resolve(positional[0] || "site");
  const route = positional[1] || "/gcse-maths/higher/chapter-1/section-1.1/learn/";

  const server = http.createServer((req, res) => {
    let rel = decodeURIComponent(new URL(req.url, "http://local").pathname);
    if (rel.endsWith("/")) rel += "index.html";
    const file = path.join(siteDir, rel);
    if (!file.startsWith(siteDir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("not found");
    }
    const type = TYPES[path.extname(file)] || "application/octet-stream";
    const headers = { "Content-Type": type };
    let body = fs.readFileSync(file);
    // Mirror the Worker's freshness policy. The default is the bytes on disk,
    // which is the method the recorded budget uses; `--compress` adds what a CDN
    // in front of the Worker would.
    headers["Cache-Control"] = "public, max-age=0, must-revalidate";
    const wants = /\bgzip\b/.test(req.headers["accept-encoding"] || "");
    if (compress && wants && COMPRESSIBLE.has(path.extname(file))) {
      body = zlib.gzipSync(body, { level: 9 });
      headers["Content-Encoding"] = "gzip";
    }
    headers["Content-Length"] = body.length;
    res.writeHead(200, headers);
    res.end(body);
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;

  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({
    channel: process.env.CHROME_CHANNEL || "chrome",
    executablePath: process.env.CHROME_PATH || undefined,
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    serviceWorkers: "block",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("requestfailed", (request) => errors.push(`${request.url()} ${request.failure()?.errorText}`));
  await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: "load" });
  // The service worker's registration script is fetched after `load`, so wait
  // for the network to settle before reading the resource list.
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1500);

  const measured = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource").map((entry) => ({
      path: new URL(entry.name).pathname,
      initiatorType: entry.initiatorType,
      transferSize: entry.transferSize,
      decodedBodySize: entry.decodedBodySize,
      duration: Math.round(entry.duration),
    }));
    const stylesheets = [...document.querySelectorAll('link[rel="stylesheet"]')].map((link) => ({
      href: link.getAttribute("href"),
      media: link.getAttribute("media") || "all",
      disabled: link.disabled,
    }));
    return {
      nav: {
        transferSize: nav.transferSize,
        decodedBodySize: nav.decodedBodySize,
        domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
        load: Math.round(nav.loadEventEnd),
      },
      resources,
      stylesheets,
    };
  });

  const kb = (bytes) => `${(bytes / 1024).toFixed(0)} kB`;
  const resources = measured.resources.sort((a, b) => b.transferSize - a.transferSize);
  const total = measured.nav.transferSize + resources.reduce((sum, r) => sum + r.transferSize, 0);
  const byInit = (kind) => resources.filter((r) => r.initiatorType === kind);
  const largest = resources[0];

  console.log(`route            ${route}`);
  console.log(`server           http${compress ? ", gzip for compressible types" : ", no compression"}`);
  console.log(`requests         ${1 + resources.length}`);
  console.log(`transferred      ${kb(total)}`);
  console.log(`document         ${kb(measured.nav.transferSize)}`);
  console.log(`stylesheets      ${measured.stylesheets.length} linked, all render-blocking`);
  console.log(`scripts          ${byInit("script").map((r) => `${r.path.split("/").pop()} ${kb(r.transferSize)}`).join(", ")}`);
  console.log(`largest          ${largest.path} ${kb(largest.transferSize)}`);
  console.log(`load             DOMContentLoaded ${measured.nav.domContentLoaded} ms, load ${measured.nav.load} ms`);
  console.log("\nresources, largest first");
  for (const r of resources) {
    console.log(`  ${String(r.transferSize).padStart(7)} B  ${r.initiatorType.padEnd(6)} ${r.path}`);
  }
  console.log("\nstylesheets, in document order");
  for (const s of measured.stylesheets) console.log(`  ${s.href} (media=${s.media}, disabled=${s.disabled})`);
  if (errors.length) {
    console.error(`\n${errors.length} request(s) failed:`);
    for (const error of errors) console.error(`  ${error}`);
    process.exitCode = 1;
  }

  await browser.close();
  server.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
