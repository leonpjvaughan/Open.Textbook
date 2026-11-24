/*
 * The browser plumbing the checks share: Playwright, the Chromium launch, static
 * serving, and a page context with the reader's preferences already set.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/** Playwright's type surface, loose on purpose: it is an optional local dependency
 *  resolved at runtime, so importing its types would break a machine without it. */
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
      return require(candidate);
    } catch {
    }
  }
  throw new Error(
    "playwright not found; set PLAYWRIGHT_PATH to its install directory",
  );
}

export type LaunchOptions = {
  headless?: boolean;
};

/**
 * Launch Chromium, honouring `CHROME_PATH`, which names a specific binary and must be
 * `executablePath`; without one, the channel Playwright manages is used. Passing both
 * is an error.
 */
export async function launchBrowser(options: LaunchOptions = {}): Promise<Browser> {
  const { chromium } = loadPlaywright();
  const launch: Record<string, unknown> = { headless: options.headless ?? true };
  if (process.env.CHROME_PATH) launch.executablePath = process.env.CHROME_PATH;
  else launch.channel = "chrome";
  try {
    return await chromium.launch(launch);
  } catch (error) {
    // A machine with no `chrome` channel still has Playwright's own Chromium.
    if (launch.executablePath) throw error;
    delete launch.channel;
    return chromium.launch(launch);
  }
}

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
  scheme?: "light" | "dark";
  theme?: string;
  style?: string;
  width?: number;
  height?: number;
  deviceScaleFactor?: number;
  /** A phone viewport: emulates the device rather than only narrowing the window. */
  mobile?: boolean;
  touch?: boolean;
  blockServiceWorkers?: boolean;
};

/**
 * A page context with the reader's preferences already set.
 *
 * **Both preferences are set, and that is the point.** `colorScheme` sets the *media*
 * query, which this site does not read: the reader's scheme lives in `localStorage`
 * under `textbooks:scheme`, applied by `hooks/prefs.py` before the first paint. Only the
 * media query gives byte-identical light and dark captures.
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
    }
  }, scheme === "dark" ? "slate" : "default");
  if (options.theme) {
    await context.addInitScript((chosen: string) => {
      try {
        localStorage.setItem("textbooks:theme", chosen);
      } catch {
      }
    }, options.theme);
  }
  if (options.style) {
    await context.addInitScript((chosen: string) => {
      try {
        localStorage.setItem("textbooks:style", chosen);
      } catch {
      }
    }, options.style);
  }
  return context;
}

/** Throw unless the page applied the layout a run asked for, so a typo is not a pass. */
export async function assertStyle(page: Page, style: string | undefined): Promise<void> {
  if (!style) return;
  const applied = await page.evaluate(() => document.documentElement.dataset.style ?? "");
  if (applied !== style) {
    throw new Error(`asked for layout ${style} but the page applied ${applied || "none"}`);
  }
}

export const ORIGIN = "http://textbook.local";

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
  origin: string;
  close: () => void;
};

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
    headers["Content-Length"] = body.length;
    res.writeHead(200, headers);
    res.end(body);
  });

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const port = (server.address() as { port: number }).port;
  return { origin: `http://127.0.0.1:${port}`, close: () => server.close() };
}
