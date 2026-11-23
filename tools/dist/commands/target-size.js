/*
 * Fail when an interactive control is smaller than a thumb.
 *
 * WCAG 2.2's 2.5.8 asks for 24x24 CSS pixels, and before this nothing outside a
 * figure had a floor: `audit site --mobile` measured the size of *text drawn inside
 * SVG*, which is a different question. Measured at 390px, eight controls were under
 * it on one Learn page — six "On this page" links at 23px tall, and two figure range
 * inputs at 16px — and every gate was green.
 *
 * The rule is the platform's, with its own exemption: a link inside a sentence is not
 * a target of its own, so `display: inline` elements are skipped. Everything else —
 * a block link, a button, a field, a disclosure summary, a slider — is measured, and
 * the drawer is opened first because its rows are behind a control and are the rows
 * a phone reader uses most.
 *
 * The command measures the build it is given, not a named book's page: the routes
 * come from `lib/routes.ts`, as they do for `check-mobile`.
 */
import fs from "node:fs";
import path from "node:path";
import { launchBrowser, openContext, serveStatic } from "../lib/browser.js";
import { parseArgs } from "../lib/flags.js";
import { Report } from "../lib/report.js";
import { firstFigureRoute, routeFile, sampleRoutes } from "../lib/routes.js";
export const SURFACE = {
    positional: [{ name: "siteDir", help: "the built site to measure", required: false }],
    flags: {
        route: {
            kind: "string",
            value: "<path>",
            help: "measure this page instead of the ones the build's own pages suggest",
        },
        schemes: {
            kind: "string",
            value: "<a,b>",
            default: "light,dark",
            help: "the schemes to measure, comma separated",
        },
    },
};
/** WCAG 2.2 target size (minimum), in CSS pixels. */
const MIN = 24;
/** The phone the reader reports from, and the one the type scale is measured at. */
const WIDTH = 390;
/**
 * The pages this run measures: one of each kind from every book, the front page, and
 * a page that mounts a figure.
 *
 * The figure page is not optional: a slider is the one control a book page adds, and
 * the first Learn page of a book may mount no figure at all — which is how the two
 * 16px sliders went unmeasured.
 */
function pagesToMeasure(root, override) {
    if (override !== undefined) {
        if (!routeFile(root, override)) {
            throw new Error(`no page at ${override} in ${root}; nothing was measured`);
        }
        return [{ name: override, route: override }];
    }
    const sampled = sampleRoutes(root);
    const figure = firstFigureRoute(root);
    if (figure && !sampled.some(({ route }) => route === figure)) {
        sampled.push({ name: "a page with a figure", route: figure });
    }
    if (sampled.length === 0)
        throw new Error(`no pages in ${root}; build the site first`);
    return sampled;
}
/**
 * The controls on the page that are under 24x24.
 *
 * `display: inline` is the platform's exemption for a link in a sentence; a hidden
 * element has no target to hit and is skipped, because a closed dialog is not a
 * control the reader can reach. Everything else is measured as laid out.
 */
const MEASURE = `(() => {
  const small = [];
  let counted = 0;
  const selector =
    'a[href], button, input, select, textarea, summary, [tabindex]:not([tabindex="-1"])';
  for (const el of document.querySelectorAll(selector)) {
    const style = getComputedStyle(el);
    if (style.display === "inline") continue;
    if (style.visibility === "hidden" || style.display === "none") continue;
    if (Number(style.opacity) === 0) continue;
    const box = el.getBoundingClientRect();
    if (box.width === 0 || box.height === 0) continue;
    counted += 1;
    if (box.width >= ${MIN} && box.height >= ${MIN}) continue;
    small.push({
      tag: el.tagName.toLowerCase(),
      cls: String(el.className || "").slice(0, 60),
      w: Math.round(box.width * 10) / 10,
      h: Math.round(box.height * 10) / 10,
      text: (el.textContent || "").trim().replace(/\\s+/g, " ").slice(0, 40),
    });
  }
  return { small, counted };
})()`;
function describe({ tag, cls, text }) {
    const name = tag + (cls ? "." + cls.trim().split(/\s+/).join(".") : "");
    return text ? `${name} "${text}"` : name;
}
export async function run(argv) {
    const { positional, values } = parseArgs(argv, SURFACE);
    const root = path.resolve(positional[0] ?? "site");
    if (!fs.existsSync(root))
        throw new Error(`no build at ${root}; build the site first`);
    const routes = pagesToMeasure(root, values.route === undefined ? undefined : String(values.route));
    const schemes = String(values.schemes ?? "light,dark")
        .split(",")
        .map((scheme) => scheme.trim())
        .filter(Boolean);
    if (schemes.length === 0)
        throw new Error("--schemes named no scheme; nothing was measured");
    console.log(`measuring ${String(routes.length)} page(s) at ${WIDTH}px in ${root}`);
    for (const { name, route } of routes)
        console.log(`  ${name}: ${route}`);
    const report = new Report("targets");
    const browser = await launchBrowser();
    for (const scheme of schemes) {
        const context = await openContext(browser, {
            width: WIDTH,
            height: 844,
            scheme: scheme === "dark" ? "dark" : "light",
            deviceScaleFactor: 1,
            mobile: true,
            touch: true,
            blockServiceWorkers: true,
        });
        await serveStatic(context, root);
        const page = await context.newPage();
        for (const { name, route } of routes) {
            await page.goto(`http://textbook.local${route}`, { waitUntil: "load" });
            await page.evaluate(() => document.fonts.ready);
            await page
                .waitForFunction(() => [...document.querySelectorAll("maths-figure")].every((el) => el.childElementCount > 0), undefined, { timeout: 3000 })
                .catch(() => { });
            let counted = 0;
            let small = [];
            for (const open of [false, true]) {
                // reader uses most, so they are opened and measured rather than skipped.
                if (open) {
                    await page.evaluate(() => {
                        const drawer = document.querySelector("details.nav-drawer");
                        if (drawer instanceof HTMLDetailsElement)
                            drawer.open = true;
                    });
                    // Let the disclosure finish opening before its rows are measured.
                    await page.waitForTimeout(250);
                }
                let stable = null;
                let last = -1;
                for (let attempt = 0; attempt < 6; attempt += 1) {
                    const current = (await page.evaluate(MEASURE));
                    if (current.counted === last) {
                        stable = current;
                        break;
                    }
                    last = current.counted;
                    await page.waitForTimeout(75);
                }
                if (!stable) {
                    throw new Error(`${scheme} ${name}: the control count did not settle, so this pass cannot be trusted`);
                }
                counted += stable.counted;
                small = small.concat(stable.small);
            }
            report.examined += counted;
            for (const control of small) {
                report.error(`${scheme} ${name}`, `${describe(control)} is ${control.w}×${control.h}, under the ${MIN}×${MIN} target floor`);
            }
        }
        await context.close();
    }
    await browser.close();
    if (report.examined === 0) {
        report.error(root, "no interactive element was measured, so this is not a pass");
    }
    report.print("controls");
    return report.exitCode();
}
