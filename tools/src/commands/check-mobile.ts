/*
 * Fail when a phone-width page is wider than the screen.
 *
 * The reader's report was a settings button they could not reach: the masthead is
 * three controls beside a book title, and at 360px it ran off the right edge. Two
 * things had been widening every page — a wide table and a wide display equation,
 * neither of which was in a scroll container — and all three were invisible to a
 * desktop browser and to every other check in the gate.
 *
 * So this asserts the two things a reader actually needs, at five widths:
 *
 *   * the document is no wider than the viewport, and
 *   * the settings trigger is inside the viewport, because it is the control a reader
 *     needs to change the theme back.
 */
import fs from "node:fs";
import path from "node:path";
import { launchBrowser, openContext, serveStatic } from "../lib/browser.js";
import { parseArgs, type Surface } from "../lib/flags.js";
import { Report } from "../lib/report.js";

/** What this command accepts. `tools help check-mobile` is generated from it. */
export const SURFACE: Surface = {
  positional: [{ name: "siteDir", help: "the built site to measure", required: false }],
  flags: {},
};

// Android's common widths first: the report came from a phone. 480 is the top of the
// range where the masthead has to wrap, so it guards the breakpoint itself.
const WIDTHS = [320, 360, 390, 412, 480];
const ROUTES: [string, string][] = [
  ["landing", "/"],
  ["learn", "/gcse-maths/higher/chapter-1/section-1.1/learn/"],
  ["practise", "/gcse-maths/higher/chapter-1/section-1.1/practise/"],
];

export async function run(argv: string[]): Promise<number> {
  const { positional } = parseArgs(argv, SURFACE);
  const root = path.resolve(positional[0] ?? "site");
  if (!fs.existsSync(root)) throw new Error(`no build at ${root}; build the site first`);

  const report = new Report("mobile");
  const browser = await launchBrowser();

  for (const width of WIDTHS) {
    const context = await openContext(browser, {
      width,
      height: 800,
      deviceScaleFactor: 1,
      mobile: true,
      touch: true,
      blockServiceWorkers: true,
    });
    await serveStatic(context, root);
    const page = await context.newPage();
    for (const [name, route] of ROUTES) {
      await page.goto(`http://textbook.local${route}`, { waitUntil: "load" });
      await page.waitForTimeout(120);
      const result = await page.evaluate(() => {
        const doc = document.documentElement;
        const vw = doc.clientWidth;
        // The widest thing that is *not* allowed to scroll is what widens a page.
        let worst: { right: number; sel: string; text: string } | null = null;
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
          widest: worst as { right: number; sel: string } | null,
          trigger:
            t && trigger
              ? {
                  left: Math.round(t.left),
                  right: Math.round(t.right),
                  shown: getComputedStyle(trigger).display !== "none",
                }
              : null,
        };
      });
      report.examined += 1;
      const where = `${width}px ${name}`;
      if (result.scrollWidth > result.vw) {
        const detail = result.widest
          ? ` — widest: ${result.widest.sel} right=${result.widest.right}`
          : "";
        report.error(
          where,
          `page is ${result.scrollWidth}px wide in a ${result.vw}px viewport${detail}`,
        );
      }
      if (result.trigger && (result.trigger.right > result.vw || result.trigger.left < 0)) {
        report.error(
          where,
          `the settings trigger is outside the viewport (${result.trigger.left}..${result.trigger.right} of ${result.vw})`,
        );
      }
    }
    await context.close();
  }
  await browser.close();

  report.print("pages");
  return report.exitCode();
}
