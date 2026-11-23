/*
 * Check the figure kit's **DOM** contract through a real page.
 *
 * The list of claims is not here: it is `lib/kit-contract.ts`, one table that this
 * command and `tools kit-pure` both read. This is the half that needs a browser, because
 * most of the kit's promises are DOM behaviour — a `role`, a live region that can
 * announce a value, one focus stop per control, a mark that carries a colour class
 * rather than a colour — and only a page can answer them.
 *
 * The table is not copied into the page either: the compiled module is served at
 * `/__kit-contract.js` and imported there, so the rows the browser runs are the rows
 * `tools kit-pure` ran, from the same file. Each row gets a fresh `<maths-figure>`, the
 * element the loader hands a module, so no row can pass on another row's leftovers.
 *
 * Every judgement happens here, in Node, from what the page observed — one `compare`,
 * one set of messages, two runtimes.
 *
 * The page and the kit are the build's answer, not a book's name: this used to default
 * to a gcse-maths book root, so every other book's build failed on a module the server
 * could not find. The first page that mounts a figure says where its own kit is.
 *
 * Usage: tools kit [siteDir] [route] — the `SURFACE` table below, which is what
 * `tools help kit` prints.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "../lib/flags.js";
import { figureAssets, figurePage } from "../lib/routes.js";
import { ORIGIN, launchBrowser, openContext, serveStatic, } from "../lib/browser.js";
import { conclude, judge, listLines, rowsFor, } from "../lib/kit-contract.js";
export const SURFACE = {
    positional: [
        { name: "siteDir", help: "the built site to check against", required: false },
        { name: "route", help: "the page to mount the kit on", required: false },
    ],
    flags: {
        list: { kind: "boolean", help: "print every row this tier runs, with its tier and what it covers" },
    },
};
function contractFile() {
    return fileURLToPath(new URL("../lib/kit-contract.js", import.meta.url));
}
/**
 * The page's half: import the kit and the table, run every DOM row, hand back what was
 * seen.
 *
 * Playwright sends this function's text into the page, so it may close over nothing in
 * this module — its arguments are the only inputs, and both of them are URLs.
 */
async function runInPage({ kitPath, contractUrl }) {
    const kit = await import(kitPath);
    const contract = await import(contractUrl);
    return {
        observed: contract.observe(contract.rowsFor("dom"), kit),
        kitExports: Object.keys(kit),
    };
}
export async function run(argv) {
    const { values, positional } = parseArgs(argv, SURFACE);
    if (values.list === true) {
        for (const line of listLines("dom"))
            console.log(line);
        return 0;
    }
    const siteDir = path.resolve(positional[0] ?? "site");
    const given = positional[1];
    const derived = given === undefined ? figurePage(siteDir) : null;
    if (!derived && given === undefined) {
        throw new Error(`no page in ${siteDir} mounts a figure module; name one with [route]`);
    }
    const mounted = given === undefined ? derived : figureAssets(siteDir, given);
    if (!mounted) {
        throw new Error(`${String(given)} mounts no figures from ${siteDir}; pass a page that does, or a site that has one`);
    }
    const { route } = derived ?? { route: String(given) };
    const kitPath = mounted.kit;
    const contractUrl = "/__kit-contract.js";
    console.log(`kit: ${kitPath} through ${route}`);
    const browser = await launchBrowser();
    let result;
    try {
        const context = await openContext(browser, { deviceScaleFactor: 1 });
        await serveStatic(context, siteDir);
        // Registered after `serveStatic`, because Playwright tries the most recently added
        await context.route("**/__kit-contract.js", (intercepted) => intercepted.fulfill({
            status: 200,
            contentType: "text/javascript",
            body: fs.readFileSync(contractFile()),
        }));
        const page = await context.newPage();
        await page.goto(`${ORIGIN}${route}`, { waitUntil: "load" });
        result = await page.evaluate(runInPage, { kitPath, contractUrl });
        await context.close();
    }
    finally {
        await browser.close();
    }
    const rows = rowsFor("dom");
    return conclude({
        tier: "dom",
        kitExports: result.kitExports,
        verdicts: judge(rows, result.observed),
        title: "the figure kit",
    });
}
