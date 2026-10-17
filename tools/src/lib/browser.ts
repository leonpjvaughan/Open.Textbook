/*
 * The browser plumbing the checks share.
 *
 * Five scripts used to carry their own copy of this: the same candidate list for
 * finding Playwright, the same `CHROME_PATH` branch, the same MIME table and the same
 * route handler that serves a built directory by request interception. That was about
 * 150 duplicated lines, and the duplication had already drifted — `check-mobile` and
 * `measure-budget` passed `executablePath`, `audit-figures` and `check-figure-kit`
 * set it on a `launch` object, and `screenshot` ignored `CHROME_PATH` entirely and
 * hardcoded `channel: "chrome"`.
 *
 * So it lives here once, with the environment read in one place.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

// The package is ESM, so `require` is not in scope. `createRequire` is how a module
// resolves a specifier chosen at runtime, which is exactly what finding Playwright is.
const require = createRequire(import.meta.url);

/** Playwright's own type surface, kept loose on purpose: it is an optional local
 *  dependency resolved at runtime, so importing its types would make the whole
 *  `tools` package fail to type-check on a machine that has not installed it. */
export type Browser = any;
export type BrowserContext = any;
export type Page = any;

/** The candidate list, in order, for finding Playwright without installing it. */
export function loadPlaywright(): any {
  const candidates = [
    process.env.PLAYWRIGHT_PATH,
    "playwright",
    "/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright",
  ].filter(Boolean) as string[];
  for (const candidate of candidates) {
    try {
      // `require` rather than `import`: the candidate is a path or a bare specifier
      // chosen at runtime, which a static import cannot express.
      return require(candidate);
    } catch {
      /* try the next one */
    }
  }
  throw new Error(
    "playwright not found; set PLAYWRIGHT_PATH to its install directory",
  );
}

export type LaunchOptions = {
  /** Headless by default; the audits never need a window. */
  headless?: boolean;
};

/**
 * Launch Chromium, honouring `CHROME_PATH`.
 *
 * The two branches matter: a `CHROME_PATH` names a specific binary and must be passed
 * as `executablePath`, while the absence of one means "use the channel Playwright
 * manages". Passing `channel: "chrome"` *and* `executablePath` is an error, and three
 * of the five scripts had a different opinion about which to use.
 */
export async function launchBrowser(options: LaunchOptions = {}): Promise<Browser> {
  const { chromium } = loadPlaywright();
  const launch: Record<string, unknown> = { headless: options.headless ?? true };
  if (process.env.CHROME_PATH) launch.executablePath = process.env.CHROME_PATH;
  else launch.channel = "chrome";
  try {
    return await chromium.launch(launch);
  } catch (error) {
    // A machine with no `chrome` channel still has Playwright's own Chromium. Two of
    // the five scripts had this retry and three did not, which is how a check that
    // worked locally failed in a container for a reason unrelated to the figure.
    if (launch.executablePath) throw error;
    delete launch.channel;
    return chromium.launch(launch);
  }
}

/** Extensions the built site serves. A route that is not one of these is a 404. */
export const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

/**
 * Serve a built directory through request interception.
 *
 * Not a listening socket, and that is a choice rather than a workaround: a sandbox
 * that blocks ports is one problem, and a port that clashes with a running server is
 * another. Interception has neither, and the route is the whole server.
 *
 * **A route maps to a file, and a trailing slash is the only thing that appends
 * `index.html`.** So an extension-less route 404s — and because every route then
 * returns the same 404 page, a broken run looks like a successful one. Callers that
 * capture must compare their captures; `assertCapturesDiffer` below exists for that.
 */
export async function serveStatic(
  context: BrowserContext,
  siteDir: string,
  options: { onMiss?: (pathname: string) => void } = {},
): Promise<void> {
  const root = path.resolve(siteDir);
  await context.route("**/*", (route: any) => {
    const url = new URL(route.request().url());
    let rel = decodeURIComponent(url.pathname);
    if (rel.endsWith("/")) rel += "index.html";
    const file = path.join(root, rel);
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      // Two callers, two correct answers to a miss. The audits want a 404, because
      // they are measuring a site they were pointed at. The theme preview wants an
      // **abort** and a note, because it asserted every route before the browser
      // started: a miss during the run means the tree changed underneath it, and a
      // 404 body measured as a page reads as a pass. The difference is the caller's,
      // so it is a parameter rather than a second copy of this function.
      if (options.onMiss) {
        options.onMiss(rel);
        return route.abort();
      }
      return route.fulfill({ status: 404, body: "not found" });
    }
    return route.fulfill({
      status: 200,
      contentType: MIME_TYPES[path.extname(file)] ?? "application/octet-stream",
      body: fs.readFileSync(file),
    });
  });
}

export type ContextOptions = {
  /** The media preference. The site does not read it — see `scheme` below. */
  scheme?: "light" | "dark";
  /** The bundle id, seeded into `textbooks:theme`. */
  theme?: string;
  width?: number;
  height?: number;
  deviceScaleFactor?: number;
  /** A phone viewport: emulates the device rather than only narrowing the window. */
  mobile?: boolean;
  touch?: boolean;
  /**
   * Block service workers.
   *
   * A page under test that is served from a cache is not the page that was built, and
   * an overflow hidden behind a cached stylesheet reads as a pass.
   */
  blockServiceWorkers?: boolean;
};

/**
 * A page context with the reader's preferences already set.
 *
 * **Both preferences are set, and that is the point.** `colorScheme` sets the *media*
 * query, which this site does not read: the reader's scheme lives in `localStorage`
 * under `textbooks:scheme` and `hooks/prefs.py` applies it before the first paint.
 * Setting only the media query produced two byte-identical captures for every route —
 * a light and a dark image that were the same image. That looks like a successful run
 * and would pass a figure that is invisible on the dark scheme.
 */
export async function openContext(
  browser: Browser,
  options: ContextOptions = {},
): Promise<BrowserContext> {
  const scheme = options.scheme ?? "light";
  const context = await browser.newContext({
    viewport: { width: options.width ?? 1440, height: options.height ?? 1000 },
    colorScheme: scheme,
    deviceScaleFactor: options.deviceScaleFactor ?? 2,
    ...(options.mobile ? { isMobile: true } : {}),
    ...(options.touch ? { hasTouch: true } : {}),
    ...(options.blockServiceWorkers ? { serviceWorkers: "block" } : {}),
  });
  await context.addInitScript((chosen: string) => {
    try {
      localStorage.setItem("textbooks:scheme", chosen);
    } catch {
      /* a context that forbids storage is not a failure here */
    }
  }, scheme === "dark" ? "slate" : "default");
  if (options.theme) {
    await context.addInitScript((chosen: string) => {
      try {
        localStorage.setItem("textbooks:theme", chosen);
      } catch {
        /* as above */
      }
    }, options.theme);
  }
  return context;
}

/** The origin every route is requested under. Nothing resolves it; the route does. */
export const ORIGIN = "http://textbook.local";

/**
 * Fail when captures that should differ do not.
 *
 * The check is on the bytes rather than on the method, because the two ways this has
 * gone wrong — a 404 served for every route, and a scheme preference the site never
 * read — both reported success.
 */
export function assertCapturesDiffer(
  outDir: string,
  names: string[],
  schemes: string[],
): string[] {
  if (schemes.length < 2) return [];
  const identical: string[] = [];
  for (const name of names) {
    const first = fs.readFileSync(path.join(outDir, `${name}.png`));
    for (const scheme of schemes.slice(1)) {
      const other = fs.readFileSync(path.join(outDir, `${name}-${scheme}.png`));
      if (first.equals(other)) identical.push(`${name} (${schemes[0]} and ${scheme})`);
    }
  }
  return identical;
}


export type HttpServer = {
  /** The origin to navigate to, with the ephemeral port already resolved. */
  origin: string;
  close: () => void;
};

/**
 * Serve a built directory over a real socket, as the Worker would.
 *
 * **The one case interception cannot serve, and the reason it is here.** A navigation
 * entry's `transferSize` is populated only for a request that crossed the network
 * stack; an intercepted response reports 0, so a performance budget measured through
 * `serveStatic` would read as far too small and look like an excellent result. So the
 * budget binds a port and everything else intercepts.
 *
 * It reproduces the Worker's freshness policy — `public, max-age=0, must-revalidate` —
 * because a cached response is not a first load, and the budget is a first-load figure.
 * `compress` adds what a CDN in front of the Worker would send, which is the comparison
 * the uncompressed number is worth having.
 */
export async function serveHttp(
  root: string,
  options: { compress?: boolean } = {},
): Promise<HttpServer> {
  const http = await import("node:http");
  const zlib = await import("node:zlib");
  const base = path.resolve(root);
  const compressible = new Set([
    ".html",
    ".js",
    ".mjs",
    ".css",
    ".svg",
    ".json",
    ".webmanifest",
    ".txt",
    ".xml",
  ]);

  const server = http.createServer((req: any, res: any) => {
    let rel = decodeURIComponent(new URL(String(req.url), "http://local").pathname);
    if (rel.endsWith("/")) rel += "index.html";
    const file = path.join(base, rel);
    if (!file.startsWith(base) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("not found");
      return;
    }
    const extension = path.extname(file);
    const headers: Record<string, string | number> = {
      "Content-Type": MIME_TYPES[extension] ?? "application/octet-stream",
      "Cache-Control": "public, max-age=0, must-revalidate",
    };
    let body: Buffer = fs.readFileSync(file);
    const wantsGzip = /\bgzip\b/.test(String(req.headers["accept-encoding"] ?? ""));
    if (options.compress && wantsGzip && compressible.has(extension)) {
      body = zlib.gzipSync(body, { level: 9 });
      headers["Content-Encoding"] = "gzip";
    }
    // Content-Length is set from the bytes actually sent, so a compressed response
    // does not advertise its uncompressed size.
    headers["Content-Length"] = body.length;
    res.writeHead(200, headers);
    res.end(body);
  });

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const port = (server.address() as { port: number }).port;
  return { origin: `http://127.0.0.1:${port}`, close: () => server.close() };
}
