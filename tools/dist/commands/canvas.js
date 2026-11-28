/*
 * Fail when a figure draws outside its own `viewBox`.
 *
 * **Two rules, because one is wrong.** A text element must be inside: half a clipped
 * word is not a label. A mark may cross the edge on purpose, cropped by the `viewBox`.
 * Measured at 1280px in one scheme; this is geometry, so the viewBox is the same in
 * every theme. The cases run under plain `node` (`canvas --cases`).
 */
import fs from "node:fs";
import path from "node:path";
import { launchBrowser, openContext, serveStatic, ORIGIN } from "../lib/browser.js";
import { outside, transformBox, STROKE_TOLERANCE, TEXT_SLACK, } from "../lib/canvas.js";
import { mapPool } from "../lib/pool.js";
import { parseArgs } from "../lib/flags.js";
import { Report } from "../lib/report.js";
import { discoverFigures } from "../lib/site.js";
const CANVAS_DEBT = {};
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
        font: {
            kind: "string",
            help: "measure with every label in this font family, to find labels a reader's font grows past the frame",
        },
        shard: {
            kind: "string",
            help: "run one part of the figures, N/M in sorted order",
        },
    },
};
/**
 * Read a figure's drawing and the local box of every element in it.
 *
 * The box is **not** the `y` attribute: use `getBBox()` in the element's own space and
 * `getScreenCTM()` against the SVG root's.
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
            fontSize: parseFloat(style.fontSize) || 16,
        });
    }
    return { slug, viewBox, hasSvg: true, drawings: elements.length, elements };
}
export function shardSlugs(slugs, spec) {
    const match = /^(\d+)\/(\d+)$/.exec(spec);
    const part = match ? Number(match[1]) : 0;
    const total = match ? Number(match[2]) : 0;
    if (!match || total < 1 || part < 1 || part > total) {
        throw new Error(`--shard needs N/M with 1 <= N <= M, not ${JSON.stringify(spec)}`);
    }
    return slugs.filter((_, index) => index % total === part - 1);
}
export function cases() {
    const failures = [];
    const check = (name, ink, box, canvas, want) => {
        const got = outside(ink, box, canvas, ink === "text" ? 8 : STROKE_TOLERANCE);
        if (got.outside !== want) {
            failures.push(`${name}: wanted outside=${want}, got ${got.outside} (over ${got.over})`);
        }
    };
    const dynamics = { x: 0, y: 0, width: 560, height: 300 };
    check("dynamics-table's first row (a label 20 units below the frame)", "text", { x: 4, y: 300, width: 93, height: 20 }, dynamics, true);
    check("dynamics-table's last row (212 units below the frame)", "text", { x: 4, y: 492, width: 78, height: 20 }, dynamics, true);
    check("a label five units past the right edge (the em box's slack)", "text", { x: 516, y: 255, width: 49, height: 17 }, { x: 0, y: 0, width: 560, height: 300 }, false);
    check("a label twenty units past the right edge", "text", { x: 540, y: 255, width: 40, height: 17 }, { x: 0, y: 0, width: 560, height: 300 }, true);
    check("wishbone-hero's ray to an instant centre off the drawing", "mark", { x: -1295, y: 269, width: 1337, height: 16 }, { x: 0, y: 0, width: 520, height: 323 }, false);
    check("a mark wholly outside the drawing", "mark", { x: -400, y: 10, width: 90, height: 10 }, { x: 0, y: 0, width: 560, height: 300 }, true);
    check("a label that ends exactly on the right edge", "text", { x: 500, y: 10, width: 60, height: 18 }, { x: 0, y: 0, width: 560, height: 300 }, false);
    const rotated = transformBox({ x: 500, y: 30, width: 60, height: 18 }, [0, 1, -1, 0, 0, 0]);
    const turned = outside("text", rotated, { x: 0, y: 0, width: 560, height: 300 }, 0.5);
    if (!turned.outside) {
        failures.push("a rotated label is not in its parent's space, and the transform missed it");
    }
    const parts = [1, 2, 3].map((part) => shardSlugs(["a", "b", "c", "d", "e"], `${part}/3`));
    if (JSON.stringify(parts) !== JSON.stringify([["a", "d"], ["b", "e"], ["c"]])) {
        failures.push(`--shard did not partition the figures: ${JSON.stringify(parts)}`);
    }
    try {
        shardSlugs(["a"], "0/2");
        failures.push("--shard accepted 0/2");
    }
    catch { }
    return failures;
}
export async function run(argv) {
    const { values, positional } = parseArgs(argv, SURFACE);
    if (values.cases === true) {
        const failures = cases();
        for (const failure of failures)
            console.log(`FAIL  canvas: ${failure}`);
        console.log(`canvas: 9 cases examined, ${failures.length} errors, 0 warnings`);
        return failures.length ? 1 : 0;
    }
    const siteDir = positional[0] ?? "site";
    if (!fs.existsSync(siteDir))
        throw new Error(`no build at ${siteDir}; build the site first`);
    const only = values.only ? String(values.only) : "";
    const jsonOut = values.json ? String(values.json) : "";
    const jobs = Math.max(1, Math.min(Number(values.jobs) || 1, 8));
    const font = values.font ? String(values.font) : "";
    const shard = values.shard ? String(values.shard) : "";
    const pages = discoverFigures(siteDir);
    let slugs = Object.keys(pages).sort();
    if (only)
        slugs = slugs.filter((slug) => slug === only);
    if (shard) {
        try {
            slugs = shardSlugs(slugs, shard);
        }
        catch (error) {
            console.error(String(error));
            return 2;
        }
    }
    if (!slugs.length) {
        console.error(`no figures found under ${siteDir}`);
        return 2;
    }
    const report = new Report(shard ? `canvas ${shard}` : "canvas");
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
        let measured = false;
        let drawings = 0;
        // Three routes at most per slug, and one attempt each: a figure that mounts no `svg`
        for (const route of pages[slug].slice(0, 3)) {
            let figure = null;
            for (let attempt = 1; attempt <= 2 && !figure; attempt += 1) {
                try {
                    await page.goto(`${ORIGIN}${route}`, { waitUntil: "load" }).catch(() => { });
                    if (font)
                        await page.addStyleTag({ content: `svg text { font-family: ${font} !important; }` }).catch(() => { });
                    await page
                        .waitForFunction((s) => {
                        const host = document.querySelector(`maths-figure[data-figure="${s}"]`);
                        if (!host)
                            return false;
                        const svg = host.querySelector("svg");
                        if (svg && svg.childElementCount > 0)
                            return true;
                        // full timeout for an `svg` that is never coming.
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
                continue;
            }
            drawings = figure.drawings;
            records.push({ ...figure, slug });
            report.examined += 1;
            let worst = { over: 0, what: "" };
            let count = 0;
            for (const element of figure.elements) {
                const drawn = transformBox(element.box, element.matrix);
                const slack = element.ink === "text" ? element.fontSize * TEXT_SLACK : STROKE_TOLERANCE;
                const verdict = outside(element.ink, drawn, figure.viewBox, slack);
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
    // unmeasured; whatever is still unmeasured is named in the summary.
    const retry = unmeasured.splice(0);
    if (retry.length) {
        await mapPool(retry, jobs, async (slug, index) => {
            const page = pool[index % jobs];
            for (const route of pages[slug].slice(0, 3)) {
                try {
                    await page.goto(`${ORIGIN}${route}`, { waitUntil: "load" }).catch(() => { });
                    if (font)
                        await page.addStyleTag({ content: `svg text { font-family: ${font} !important; }` }).catch(() => { });
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
                        const slack = element.ink === "text" ? element.fontSize * TEXT_SLACK : STROKE_TOLERANCE;
                        const verdict = outside(element.ink, drawn, figure.viewBox, slack);
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
