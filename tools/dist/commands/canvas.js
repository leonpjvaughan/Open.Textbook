/*
 * Fail when a figure draws outside its own `viewBox`.
 *
 * `dynamics-table` put five rows of numbers at y = 300…512 in a 300-unit canvas: the
 * reader saw an empty bordered frame, the prose under it said "each column is an
 * integration", and every check passed. `audit` measures paint and passed — an element
 * outside the box is styled correctly. `readout --verify` recomputed the arithmetic and
 * passed — the numbers were right, in the wrong place. `kit` checked the DOM contract
 * and passed. So the collection had a contract on what a figure says and on how it is
 * painted, and none on where it puts the ink.
 *
 * **Two rules, because one is wrong.** A text element must be inside: half a clipped
 * word is not a label. A mark may cross the edge, and `wishbone-hero` does on purpose —
 * its rays run to an instant centre 1,295 units off a 520-unit canvas, cropped by the
 * `viewBox`. Applying the text rule to marks would fail it; applying the mark rule to
 * texts would miss the five rows.
 *
 * Measured at 1280px in one scheme: this is geometry, and the viewBox is the viewBox in
 * every theme. The cases run under plain `node` (`canvas --cases`), so the rule is in
 * the ordinary gate and not only in the browser one.
 *
 * **The debt is empty, and why it is still a table.** The first sweep of 254 figures on
 * 2026-10-30 found 39 labels that overhang their frame, in 31 modules, and they were one
 * authoring habit: a y-axis title written horizontally with `anchor: "end"` a few units
 * left of the axis, so a 60–220-unit label runs off the canvas (`internal-resistance`
 * loses 168 units of "terminal potential difference / V"). Item 164 fixes them. Naming
 * them here, in the same shape as `lint.LIST_DEBT`, kept the check strict while they were
 * being fixed. All 39 are inside their frames now (item 164), so the table is empty and a
 * figure written from today gets no allowance at all.
 */
import fs from "node:fs";
import path from "node:path";
import { launchBrowser, openContext, serveStatic, ORIGIN } from "../lib/browser.js";
import { outside, transformBox } from "../lib/canvas.js";
import { mapPool } from "../lib/pool.js";
import { parseArgs } from "../lib/flags.js";
import { Report } from "../lib/report.js";
import { discoverFigures } from "../lib/site.js";
/**
 * Labels that overhang their frame today, counted on 2026-10-30.
 *
 * Down-only, and a figure not named here has no allowance at all. Every entry is a
 * y-axis title placed horizontally to the left (or above) of its drawing — the fix is
 * `label()`'s `rotate`, which is why this is one habit and not 32 unrelated mistakes.
 * The largest is `internal-resistance`, whose "terminal potential difference / V" loses
 * 168 of its 221 units. Item 164 carries the measurement and the list.
 *
 * Measured on the build of 2026-10-30: 39 labels in 31 figures, over 254 figures that
 * draw (a further 12 mount a control and no drawing at all).
 */
const CANVAS_DEBT = {};
/** What this command accepts. `tools help canvas` is generated from it. */
export const SURFACE = {
    positional: [{ name: "siteDir", help: "the built site to measure", required: false }],
    flags: {
        only: { kind: "string", help: "measure one figure by slug" },
        json: { kind: "string", help: "write what every figure drew here" },
        jobs: {
            kind: "string",
            help: "pages in flight at once; one unless asked",
            default: "1",
        },
        cases: {
            kind: "boolean",
            help: "run the rules' own cases under plain node, and no browser",
        },
    },
};
/**
 * Read a figure's drawing and the local box of every element in it.
 *
 * The box is **not** the `y` attribute: a `<text>` at y = 492 with a 20-unit glyph box
 * starting there is inside the frame, and `dynamics-table`'s five rows were 15 elements,
 * not the 17 that reading attributes reports. `getBBox()` in the element's own space,
 * then `getScreenCTM()` against the SVG root's, is the transform that answers the
 * question the eye asks.
 */
export function readInk(slug) {
    const host = document.querySelector(`maths-figure[data-figure="${slug}"]`);
    if (!host)
        return { slug, viewBox: null, hasSvg: false, drawings: 0, elements: [] };
    const svg = host.querySelector("svg");
    if (!svg)
        return { slug, viewBox: null, hasSvg: false, drawings: 0, elements: [] };
    const vb = svg.viewBox.baseVal;
    const viewBox = { x: vb.x, y: vb.y, width: vb.width, height: vb.height };
    const rootScreen = svg.getScreenCTM();
    if (!rootScreen || !viewBox.width || !viewBox.height) {
        return { slug, viewBox: null, hasSvg: true, drawings: 0, elements: [] };
    }
    const rootInverse = rootScreen.inverse();
    const skip = new Set(["defs", "clipPath", "marker", "pattern", "mask", "symbol"]);
    const elements = [];
    // `getBBox()` and `getScreenCTM()` are on `SVGGraphicsElement`, not on the
    // `SVGElement` the selector returns — the same two methods the browser has had on
    // every one of these tags since SVG 1.1.
    const nodes = Array.from(svg.querySelectorAll("text, line, rect, circle, ellipse, path, polyline, polygon, image, use"));
    for (const node of nodes) {
        let inSkipped = false;
        for (let p = node.parentNode; p && p !== svg; p = p.parentNode) {
            if (skip.has(p.nodeName)) {
                inSkipped = true;
                break;
            }
        }
        if (inSkipped)
            continue;
        const style = getComputedStyle(node);
        if (style.display === "none" || style.visibility === "hidden")
            continue;
        const ctm = node.getScreenCTM();
        if (!ctm)
            continue;
        let box;
        try {
            box = node.getBBox();
        }
        catch {
            continue;
        }
        if (!box || (box.width === 0 && box.height === 0))
            continue;
        const m = rootInverse.multiply(ctm);
        elements.push({
            tag: node.nodeName,
            ink: node.nodeName === "text" ? "text" : "mark",
            text: (node.textContent || "").slice(0, 32),
            box: { x: box.x, y: box.y, width: box.width, height: box.height },
            matrix: [m.a, m.b, m.c, m.d, m.e, m.f],
        });
    }
    return { slug, viewBox, hasSvg: true, drawings: elements.length, elements };
}
/**
 * The rule's own cases, under plain `node`.
 *
 * Three of them are the defects the first sweep of both books found — the shape of each
 * is the reason the rules differ — and the rest are the edges: a label exactly on the
 * frame, a mark wholly outside, and a box that only touches the edge.
 */
export function cases() {
    const failures = [];
    const check = (name, ink, box, canvas, want) => {
        const got = outside(ink, box, canvas, 0.5);
        if (got.outside !== want) {
            failures.push(`${name}: wanted outside=${want}, got ${got.outside} (over ${got.over})`);
        }
    };
    const dynamics = { x: 0, y: 0, width: 560, height: 300 };
    check("dynamics-table's first row (a label 20 units below the frame)", "text", { x: 4, y: 300, width: 93, height: 20 }, dynamics, true);
    check("dynamics-table's last row (212 units below the frame)", "text", { x: 4, y: 492, width: 78, height: 20 }, dynamics, true);
    check("kernel-camber's last tick label (5 units past the right edge)", "text", { x: 516, y: 255, width: 49, height: 17 }, { x: 0, y: 0, width: 560, height: 300 }, true);
    check("wishbone-hero's ray to an instant centre off the drawing", "mark", { x: -1295, y: 269, width: 1337, height: 16 }, { x: 0, y: 0, width: 520, height: 323 }, false);
    check("a mark wholly outside the drawing", "mark", { x: -400, y: 10, width: 90, height: 10 }, { x: 0, y: 0, width: 560, height: 300 }, true);
    check("a label that ends exactly on the right edge", "text", { x: 500, y: 10, width: 60, height: 18 }, { x: 0, y: 0, width: 560, height: 300 }, false);
    // A rotated label's own box is in its own space, so the transform is the whole point:
    // an unrotated 60×18 box at the top of the frame becomes a 18×60 box running off the
    // top once it is turned, and reading the attributes would call it inside.
    const rotated = transformBox({ x: 500, y: 30, width: 60, height: 18 }, [0, 1, -1, 0, 0, 0]);
    const turned = outside("text", rotated, { x: 0, y: 0, width: 560, height: 300 }, 0.5);
    if (!turned.outside) {
        failures.push("a rotated label is not in its parent's space, and the transform missed it");
    }
    return failures;
}
export async function run(argv) {
    const { values, positional } = parseArgs(argv, SURFACE);
    if (values.cases === true) {
        const failures = cases();
        for (const failure of failures)
            console.log(`FAIL  canvas: ${failure}`);
        console.log(`canvas: 7 cases examined, ${failures.length} errors, 0 warnings`);
        return failures.length ? 1 : 0;
    }
    const siteDir = positional[0] ?? "site";
    if (!fs.existsSync(siteDir))
        throw new Error(`no build at ${siteDir}; build the site first`);
    const only = values.only ? String(values.only) : "";
    const jsonOut = values.json ? String(values.json) : "";
    const jobs = Math.max(1, Math.min(Number(values.jobs) || 1, 8));
    const pages = discoverFigures(siteDir);
    let slugs = Object.keys(pages).sort();
    if (only)
        slugs = slugs.filter((slug) => slug === only);
    if (!slugs.length) {
        console.error(`no figures found under ${siteDir}`);
        return 2;
    }
    const report = new Report("canvas");
    const browser = await launchBrowser();
    const context = await openContext(browser, {
        scheme: "light",
        width: 1280,
        height: 900,
        deviceScaleFactor: 1,
        blockServiceWorkers: true,
    });
    await serveStatic(context, siteDir);
    const pool = await Promise.all(Array.from({ length: jobs }, () => context.newPage()));
    const records = [];
    let noDrawing = 0;
    const unmeasured = [];
    await mapPool(slugs, jobs, async (slug, index) => {
        const page = pool[index % jobs];
        // **Every route the figure appears on is a candidate.** A slug's first route
        // alphabetically can be a page where the figure does not mount — the audit and the
        // readout sweep both learned this — and a route that mounts nothing would otherwise
        // read as "draws nothing" on one run and as a finding on the next. So the routes are
        // tried in turn, and a figure is only called drawing-free when none of them has one.
        let measured = false;
        let drawings = 0;
        // Three routes at most per slug, and one attempt each unless the browser threw: a
        // figure that mounts no `svg` will not mount one on a second look, and the wait is
        // what a sweep costs. Retrying a missing drawing took this command from four
        // minutes to over forty.
        for (const route of pages[slug].slice(0, 3)) {
            let figure = null;
            for (let attempt = 1; attempt <= 2 && !figure; attempt += 1) {
                try {
                    // A page that reloads itself — the tier redirect and the settings runtime both
                    // can — interrupts the navigation that asked for it. The document that is
                    // there afterwards is the one to measure, so the failure is swallowed and the
                    // wait below decides whether a figure arrived.
                    await page.goto(`${ORIGIN}${route}`, { waitUntil: "load" }).catch(() => { });
                    // Wait for the figure to mount, not for a fixed pause: every figure here is
                    // drawn by a module that may await a kernel, and 60ms of sleep measured the
                    // empty frame before it drew — which reads as a clean result.
                    await page
                        .waitForFunction((s) => {
                        const host = document.querySelector(`maths-figure[data-figure="${s}"]`);
                        if (!host)
                            return false;
                        const svg = host.querySelector("svg");
                        if (svg && svg.childElementCount > 0)
                            return true;
                        // A figure with a control and no drawing has mounted; waiting the full
                        // timeout for an `svg` that is never coming is what made this sweep
                        // unstable in wall-clock and in what it counted.
                        return !!host.querySelector("input, select, button, .fig");
                    }, slug, { timeout: 20000 })
                        .catch(() => { });
                    await page.waitForTimeout(80);
                    figure = (await page.evaluate(readInk, slug));
                }
                catch (error) {
                    const transient = /Execution context was destroyed|interrupted by another|not attached to an active page|Target closed/.test(String(error));
                    if (!transient) {
                        report.error(`${slug} on ${route}`, `could not be measured: ${String(error).slice(0, 120)}`);
                        break;
                    }
                    await page.waitForTimeout(200);
                }
            }
            if (!figure)
                continue;
            if (!figure.viewBox) {
                // An `<svg>` with no `viewBox` cannot be measured and cannot be read either.
                if (figure.hasSvg) {
                    report.error(`${slug} on ${route}`, "the drawing has no viewBox to measure against");
                    break;
                }
                continue; // this route mounts nothing; the next one may
            }
            drawings = figure.drawings;
            records.push({ ...figure, slug });
            report.examined += 1;
            let worst = { over: 0, what: "" };
            let count = 0;
            for (const element of figure.elements) {
                const drawn = transformBox(element.box, element.matrix);
                const verdict = outside(element.ink, drawn, figure.viewBox, 0.5);
                if (!verdict.outside)
                    continue;
                count += 1;
                if (verdict.over > worst.over) {
                    worst = {
                        over: verdict.over,
                        what: `${element.ink === "text" ? "label" : element.tag.toLowerCase()} ${element.text ? `"${element.text}" ` : ""}by ${Math.round(verdict.over)} units`,
                    };
                }
            }
            if (count > (CANVAS_DEBT[slug] ?? 0)) {
                report.error(`${slug} on ${route}`, `${count} of ${figure.drawings} elements are outside the viewBox` +
                    (CANVAS_DEBT[slug] ? `, and the debt is ${CANVAS_DEBT[slug]}` : "") +
                    `; the furthest is ${worst.what}`);
            }
            measured = true;
            break;
        }
        if (!measured && !drawings)
            unmeasured.push(slug);
        process.stdout.write(".");
    });
    // **One more pass over what measured nothing.** A figure whose module is slow on the
    // first visit mounts on the second: a sweep reported 17, 19, 22 and 25 figures with no
    // drawing on four consecutive runs of the same build, and a figure that is skipped is
    // a figure whose overhang is not measured. The second pass gives the remainder the
    // benefit of a warm page, and whatever is still unmeasured is named in the summary —
    // never silently counted as clean.
    const retry = unmeasured.splice(0);
    if (retry.length) {
        await mapPool(retry, jobs, async (slug, index) => {
            const page = pool[index % jobs];
            for (const route of pages[slug]) {
                try {
                    await page.goto(`${ORIGIN}${route}`, { waitUntil: "load" }).catch(() => { });
                    // The same mount wait as the first pass: a kernel figure is slower than 600ms,
                    // and a retry that waits less than the pass it is repeating measures less.
                    await page
                        .waitForFunction((s) => {
                        const host = document.querySelector(`maths-figure[data-figure="${s}"]`);
                        if (!host)
                            return false;
                        const svg = host.querySelector("svg");
                        if (svg && svg.childElementCount > 0)
                            return true;
                        return !!host.querySelector("input, select, button, .fig");
                    }, slug, { timeout: 20000 })
                        .catch(() => { });
                    await page.waitForTimeout(120);
                    const figure = (await page.evaluate(readInk, slug));
                    if (!figure.viewBox)
                        continue;
                    records.push(figure);
                    report.examined += 1;
                    let count = 0;
                    let worst = { over: 0, what: "" };
                    for (const element of figure.elements) {
                        const drawn = transformBox(element.box, element.matrix);
                        const verdict = outside(element.ink, drawn, figure.viewBox, 0.5);
                        if (!verdict.outside)
                            continue;
                        count += 1;
                        if (verdict.over > worst.over) {
                            worst = {
                                over: verdict.over,
                                what: `${element.ink === "text" ? "label" : element.tag.toLowerCase()} by ${Math.round(verdict.over)} units`,
                            };
                        }
                    }
                    if (count > (CANVAS_DEBT[slug] ?? 0)) {
                        report.error(`${slug} on ${route}`, `${count} of ${figure.drawings} elements are outside the viewBox; the furthest is ${worst.what}`);
                    }
                    return;
                }
                catch {
                    /* the next route may mount it */
                }
            }
            noDrawing += 1;
            unmeasured.push(slug);
        });
    }
    for (const page of pool)
        await page.close();
    await browser.close();
    if (slugs.length > 8)
        process.stdout.write("\n");
    if (jsonOut) {
        fs.writeFileSync(path.resolve(jsonOut), JSON.stringify(records.sort((a, b) => a.slug.localeCompare(b.slug)), null, 1) + "\n");
    }
    report.print("figures");
    if (noDrawing) {
        console.log(`canvas: ${noDrawing} figure(s) never mounted a drawing, and were not measured: ` +
            unmeasured.sort().join(", "));
    }
    return report.exitCode();
}
