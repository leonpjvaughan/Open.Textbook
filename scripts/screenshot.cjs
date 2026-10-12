// Screenshot the built site without binding a port: Playwright serves the static
// files through request interception. Useful in sandboxes that block listening
// sockets, and for producing review images.
//
// Usage:
//   node scripts/screenshot.cjs <siteDir> <outDir> [--schemes light,dark]
//       [--theme <bundle>] -- name:path [name:path ...]
//
// --theme seeds the collection-wide "textbooks:theme" key before each page loads,
// so a bundle can be captured the way a reader would see it.
// Example:
//   node scripts/screenshot.cjs site/gcse-maths/higher /tmp/shots -- schemes light,dark -- \
//     home:/ "anchor:/Chapter 1/"
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
      /* try next */
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

async function main() {
  const argv = process.argv.slice(2);
  const siteDir = path.resolve(argv.shift());
  const outDir = path.resolve(argv.shift());
  let schemes = ["light"];
  let theme = null;
  const entries = [];
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--schemes") {
      schemes = argv[(i += 1)].split(",");
    } else if (argv[i] === "--theme") {
      theme = argv[(i += 1)];
    } else if (argv[i] === "--") {
      /* separator */
    } else {
      const [name, ...rest] = argv[i].split(":");
      entries.push({ name, route: rest.join(":") });
    }
  }
  fs.mkdirSync(outDir, { recursive: true });

  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ channel: "chrome" });

  for (const scheme of schemes) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      // `colorScheme` sets the *media* preference. The site does not read it: the
      // reader's scheme lives in `localStorage` under `textbooks:scheme`, which
      // `hooks/prefs.py` applies before the first paint. Setting only the media
      // query produced two byte-identical captures for every route — a light and a
      // dark image that were the same image, which looks like a successful run and
      // would pass a figure that is invisible on the dark scheme. Both are set.
      colorScheme: scheme,
      deviceScaleFactor: 2,
    });
    await context.addInitScript((chosen) => {
      try {
        localStorage.setItem("textbooks:scheme", chosen);
      } catch (err) {}
    }, scheme === "dark" ? "slate" : "default");
    if (theme) {
      await context.addInitScript((chosen) => {
        try {
          localStorage.setItem("textbooks:theme", chosen);
        } catch (err) {}
      }, theme);
    }
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
    for (const { name, route } of entries) {
      await page.goto(`http://gcse.local${route}`, { waitUntil: "load" });
      await page.waitForTimeout(900);
      const suffix = scheme === "light" ? "" : `-${scheme}`;
      const out = path.join(outDir, `${name}${suffix}.png`);
      await page.screenshot({ path: out, fullPage: true });
      console.log(`${out}`);
    }
    await context.close();
  }
  await browser.close();

  // The guard, and the reason AGENTS.md says to check the captures differ: a run
  // where every image is the same image reports success. It happened here by two
  // different routes — a 404 served for every route, and a scheme preference the
  // site never read — so the check is on the bytes rather than on the method.
  if (schemes.length > 1) {
    const identical = [];
    for (const { name } of entries) {
      const first = Buffer.from(fs.readFileSync(path.join(outDir, `${name}.png`)));
      for (const scheme of schemes.slice(1)) {
        const other = Buffer.from(fs.readFileSync(path.join(outDir, `${name}-${scheme}.png`)));
        if (first.equals(other)) identical.push(`${name} (light and ${scheme})`);
      }
    }
    if (identical.length) {
      console.error(
        `\nwarning: these captures are byte-identical across schemes: ${identical.join(", ")}. `
          + "Either the scheme never reached the page or the route did not render — "
          + "a reader on the dark scheme is seeing something these images do not show."
      );
      process.exitCode = 1;
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
