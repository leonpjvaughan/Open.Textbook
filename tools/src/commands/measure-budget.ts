/*
 * Measure the performance budget of a page the pipeline actually ships.
 *
 * DEPLOY.md records a budget as bytes over the wire on a first load: the
 * `transferSize` of the navigation entry plus the sum over
 * `performance.getEntriesByType("resource")`. This is that measurement, and the
 * recorded numbers come from it — so the server it runs against reproduces the
 * Worker's cache headers, and it binds a real port, because `transferSize` is only
 * populated for a request that crossed the network stack.
 */
import path from "node:path";
import { launchBrowser, openContext, serveHttp } from "../lib/browser.js";
import { parseArgs, type Surface } from "../lib/flags.js";

const DEFAULT_ROUTE = "/gcse-maths/higher/chapter-1/section-1.1/learn/";

/**
 * What the page reports about its own load, as `evaluate` below builds it.
 *
 * `page` has no static type — Playwright is resolved at runtime, so it arrives as
 * `any` — and without a name for the shape every field read off it would be a read off
 * `any`, including the `sort` and `reduce` callbacks that carry the measurement.
 */
interface Measured {
  nav: {
    transferSize: number;
    decodedBodySize: number;
    domContentLoaded: number;
    load: number;
  };
  resources: Array<{
    path: string;
    initiatorType: string;
    transferSize: number;
    decodedBodySize: number;
    duration: number;
  }>;
  stylesheets: Array<{ href: string | null; media: string; disabled: boolean }>;
}

/** What this command accepts. `tools help budget` is generated from it. */
export const SURFACE: Surface = {
  positional: [
    { name: "siteDir", help: "the built site to serve", required: false },
    { name: "route", help: `the page to measure (default: ${DEFAULT_ROUTE})`, required: false },
  ],
  flags: {
    compress: { kind: "boolean", help: "serve compressed, as the Worker does for compressible types" },
  },
};

export async function run(argv: string[]): Promise<number> {
  const { values, positional } = parseArgs(argv, SURFACE);
  const siteDir = path.resolve(positional[0] ?? "site");
  const route = positional[1] ?? DEFAULT_ROUTE;
  const compress = values.compress === true;

  const server = await serveHttp(siteDir, { compress });
  const browser = await launchBrowser();
  const context = await openContext(browser, {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    blockServiceWorkers: true,
  });
  const page = await context.newPage();
  const failed: string[] = [];
  page.on("requestfailed", (request: any) =>
    failed.push(`${request.url()} ${request.failure()?.errorText}`),
  );

  await page.goto(`${server.origin}${route}`, { waitUntil: "load" });
  // The service worker's registration script is fetched after `load`, so wait for the
  // network to settle before reading the resource list.
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1500);

  const measured: Measured = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const resources = (performance.getEntriesByType("resource") as PerformanceResourceTiming[]).map(
      (entry) => ({
        path: new URL(entry.name).pathname,
        initiatorType: entry.initiatorType,
        transferSize: entry.transferSize,
        decodedBodySize: entry.decodedBodySize,
        duration: Math.round(entry.duration),
      }),
    );
    const stylesheets = [...document.querySelectorAll('link[rel="stylesheet"]')].map((link) => ({
      href: link.getAttribute("href"),
      media: link.getAttribute("media") ?? "all",
      disabled: (link as HTMLLinkElement).disabled,
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

  const kb = (bytes: number) => `${(bytes / 1024).toFixed(0)} kB`;
  const resources = measured.resources.sort((a, b) => b.transferSize - a.transferSize);
  const total = measured.nav.transferSize + resources.reduce((sum, r) => sum + r.transferSize, 0);
  const byInit = (kind: string) => resources.filter((r) => r.initiatorType === kind);
  const largest = resources[0]!;

  console.log(`route            ${route}`);
  console.log(`server           http${compress ? ", gzip for compressible types" : ", no compression"}`);
  console.log(`requests         ${1 + resources.length}`);
  console.log(`transferred      ${kb(total)}`);
  console.log(`document         ${kb(measured.nav.transferSize)}`);
  console.log(`stylesheets      ${measured.stylesheets.length} linked, all render-blocking`);
  console.log(
    `scripts          ${byInit("script")
      .map((r) => `${r.path.split("/").pop()} ${kb(r.transferSize)}`)
      .join(", ")}`,
  );
  console.log(`largest          ${largest.path} ${kb(largest.transferSize)}`);
  console.log(
    `load             DOMContentLoaded ${measured.nav.domContentLoaded} ms, load ${measured.nav.load} ms`,
  );
  console.log("\nresources, largest first");
  for (const r of resources) {
    console.log(`  ${String(r.transferSize).padStart(7)} B  ${r.initiatorType.padEnd(6)} ${r.path}`);
  }
  console.log("\nstylesheets, in document order");
  for (const s of measured.stylesheets) {
    console.log(`  ${s.href} (media=${s.media}, disabled=${s.disabled})`);
  }

  await browser.close();
  server.close();

  if (failed.length) {
    console.error(`\n${failed.length} request(s) failed:`);
    for (const error of failed) console.error(`  ${error}`);
    return 1;
  }
  return 0;
}
