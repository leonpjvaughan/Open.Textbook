// Fail when a phone-width page is wider than the screen.
//
// The reader's report was a settings button they could not reach: the masthead is
// three controls beside a book title, and at 360px it ran off the right edge. Two
// things had been widening every page — a wide table and a wide display equation,
// neither of which was in a scroll container — and all three were invisible to a
// desktop browser and to every other check in the gate.
//
// So this asserts the two things a reader actually needs, at four widths:
//
//   * the document is no wider than the viewport, and
//   * the settings trigger is inside the viewport, because it is the control a
//     reader needs to change the theme back.
//
// Usage: node scripts/check-mobile.cjs [siteDir]
//
// Needs Chrome: CHROME_PATH locally, the runner's Chrome in CI.

const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");

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
      /* next */
    }
  }
  throw new Error("playwright not found; set PLAYWRIGHT_PATH");
}

const TYPES = {
  ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml",
  ".png": "image/png", ".woff2": "font/woff2", ".xml": "application/xml",
  ".txt": "text/plain",
};

// Android's common widths first: the report came from a phone. 480 is the top of
// the range where the masthead has to wrap, so it guards the breakpoint itself.
const WIDTHS = [320, 360, 390, 412, 480];
const ROUTES = [
  ["landing", "/"],
  ["learn", "/gcse-maths/higher/chapter-1/section-1.1/learn/"],
  ["practise", "/gcse-maths/higher/chapter-1/section-1.1/practise/"],
];

function serve(root) {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    let file = path.join(root, p);
    if (p.endsWith("/")) file = path.join(file, "index.html");
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404);
      return res.end("not found");
    }
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

(async () => {
  const root = path.resolve(process.argv[2] || "site");
  if (!fs.existsSync(root)) {
    console.error(`no build at ${root}; build the site first`);
    process.exit(2);
  }

  const { chromium } = loadPlaywright();
  const server = await serve(root);
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({
    channel: process.env.CHROME_PATH ? undefined : "chrome",
    executablePath: process.env.CHROME_PATH || undefined,
  });

  const failures = [];
  let checked = 0;
  for (const width of WIDTHS) {
    const context = await browser.newContext({
      viewport: { width, height: 800 },
      isMobile: true,
      hasTouch: true,
      // A service worker would serve from cache and hide a real overflow.
      serviceWorkers: "block",
    });
    const page = await context.newPage();
    for (const [name, route] of ROUTES) {
      await page.goto(base + route, { waitUntil: "load" });
      await page.waitForTimeout(120);
      const result = await page.evaluate(() => {
        const doc = document.documentElement;
        const vw = doc.clientWidth;
        // The widest thing that is *not* allowed to scroll is what widens a page.
        let worst = null;
        for (const el of document.querySelectorAll("body *")) {
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.right <= vw + 1) continue;
          const overflowX = getComputedStyle(el).overflowX;
          if (overflowX === "auto" || overflowX === "scroll" || overflowX === "hidden") continue;
          if (!worst || rect.right > worst.right) {
            worst = {
              right: Math.round(rect.right),
              sel:
                el.tagName.toLowerCase() +
                (el.className && typeof el.className === "string" && el.className.trim()
                  ? "." + el.className.trim().split(/\s+/).join(".")
                  : ""),
              text: (el.textContent || "").trim().slice(0, 40),
            };
          }
        }
        const trigger = document.querySelector("#tb-settings");
        const t = trigger ? trigger.getBoundingClientRect() : null;
        return {
          vw,
          scrollWidth: doc.scrollWidth,
          widest: worst,
          trigger: t ? { left: Math.round(t.left), right: Math.round(t.right), shown: getComputedStyle(trigger).display !== "none" } : null,
        };
      });
      checked += 1;
      const where = `${width}px ${name}`;
      if (result.scrollWidth > result.vw) {
        const detail = result.widest ? ` — widest: ${result.widest.sel} right=${result.widest.right}` : "";
        failures.push(`${where}: page is ${result.scrollWidth}px wide in a ${result.vw}px viewport${detail}`);
      }
      if (result.trigger && (result.trigger.right > result.vw || result.trigger.left < 0)) {
        failures.push(
          `${where}: the settings trigger is outside the viewport (${result.trigger.left}..${result.trigger.right} of ${result.vw})`,
        );
      }
    }
    await context.close();
  }
  await browser.close();
  server.close();

  if (failures.length) {
    console.error(`mobile check failed on ${failures.length} of ${checked}:\n  ` + failures.join("\n  "));
    process.exit(1);
  }
  console.log(`mobile ok: ${WIDTHS.length} widths x ${ROUTES.length} routes = ${checked} pages, no horizontal overflow, settings reachable`);
})();
