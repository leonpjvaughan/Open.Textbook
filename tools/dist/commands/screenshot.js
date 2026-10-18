/*
 * Capture the built site, one image per route per scheme.
 *
 * The site is served through request interception rather than a listening socket; the
 * server is `lib/browser.ts`. This module is only what is particular to screenshots:
 * which routes, which schemes, and the guard that the captures differ.
 */
import fs from "node:fs";
import path from "node:path";
import { ORIGIN, assertCapturesDiffer, launchBrowser, openContext, serveStatic, } from "../lib/browser.js";
import { parseArgs } from "../lib/flags.js";
/** What this command accepts. `tools help screenshot` is generated from it. */
export const SURFACE = {
    positional: [
        { name: "siteDir", help: "the built site to capture" },
        { name: "outDir", help: "write the PNGs here" },
        {
            name: "name:route ...",
            help: "one capture per name, of a route, passed after `--`",
            required: false,
        },
    ],
    flags: {
        schemes: {
            kind: "string",
            value: "<a,b>",
            default: "light",
            help: "the schemes to capture, comma separated",
        },
        theme: {
            kind: "string",
            value: "<bundle>",
            help: "the bundle to force instead of the reader's preference",
        },
    },
};
export async function run(argv) {
    const { values, positional } = parseArgs(argv, SURFACE);
    const siteDir = path.resolve(positional[0]);
    const outDir = path.resolve(positional[1]);
    const schemes = String(values.schemes ?? "light").split(",");
    const theme = values.theme ? String(values.theme) : undefined;
    // The remaining positionals are `name:route`, and a route contains slashes and may
    // contain a colon, so only the first colon separates.
    const entries = positional.slice(2).map((entry) => {
        const at = entry.indexOf(":");
        return { name: entry.slice(0, at), route: entry.slice(at + 1) };
    });
    if (entries.length === 0)
        throw new Error("no routes given; pass name:route");
    fs.mkdirSync(outDir, { recursive: true });
    const browser = await launchBrowser();
    for (const scheme of schemes) {
        const context = await openContext(browser, { scheme, theme });
        await serveStatic(context, siteDir);
        const page = await context.newPage();
        for (const { name, route } of entries) {
            await page.goto(`${ORIGIN}${route}`, { waitUntil: "load" });
            await page.waitForTimeout(900);
            const suffix = scheme === "light" ? "" : `-${scheme}`;
            const out = path.join(outDir, `${name}${suffix}.png`);
            await page.screenshot({ path: out, fullPage: true });
            console.log(out);
        }
        await context.close();
    }
    await browser.close();
    const identical = assertCapturesDiffer(outDir, entries.map((entry) => entry.name), schemes);
    if (identical.length) {
        console.error(`\nwarning: these captures are byte-identical across schemes: ${identical.join(", ")}. ` +
            "Either the scheme never reached the page or the route did not render — " +
            "a reader on the dark scheme is seeing something these images do not show.");
        return 1;
    }
    return 0;
}
