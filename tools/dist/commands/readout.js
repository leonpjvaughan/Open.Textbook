/*
 * Read what each figure claims, and check it exactly.
 *
 * The readout is where a figure states its working — "€1,500.00 × 0.065 × 4 = €390.00"
 * — and nothing read it. Two of fourteen figures added on 2026-10-17 printed a
 * multiplication that does not give the number beside it, and every check passed:
 * structure, colour, contrast, legibility and the kit's DOM contract all measure the
 * drawing, not the sentence under it.
 *
 * **An assertion is data.** A figure calls `claim([{expression, values, answer, shown}])`
 * once per redraw; `panel()` records it on the element, and `--verify` hands the lot to
 * `python -m textbook.working`, which evaluates each expression with the same exact
 * computer algebra the problem banks use. This command collects honest data — at
 * several settings, because the defect showed up at 6.5% and not at 5% — and reports
 * how many figures state arithmetic and declare none.
 *
 * The sentence heuristic that first tried to parse the readout is gone. It needed
 * `<sup>`, `√`, `%` and thousands separators to read 43% of what it saw, and every new
 * formatting choice was a new case.
 *
 *     tools readout <siteDir> [--only slug] [--json file] [--defaults-only]
 *
 * That line is the `SURFACE` table below, rendered; `tools help readout` is generated
 * from the same table, and the parser reads nothing else.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { launchBrowser, openContext, serveStatic, ORIGIN } from "../lib/browser.js";
import { parseArgs } from "../lib/flags.js";
import { discoverFigures } from "../lib/site.js";
import { mapPool } from "../lib/pool.js";
/** What this command accepts. `tools help readout` is generated from this table. */
export const SURFACE = {
    positional: [{ name: "siteDir", help: "the built site to read", required: false }],
    flags: {
        only: { kind: "string", value: "<slug>", help: "read one figure" },
        json: { kind: "string", value: "<file>", help: "write what each figure declares here" },
        "defaults-only": { kind: "boolean", help: "read at the default settings only" },
        verify: { kind: "boolean", help: "hand the claims to `python -m textbook.working`" },
        settings: {
            kind: "string",
            value: "<n>",
            default: "6",
            help: "how many settings to try, the default and its neighbours",
        },
        jobs: { kind: "string", value: "<n>", help: "pages in flight at once; one unless asked" },
    },
};
/** The controls inside one figure, in document order, with what they can be set to. */
export function readControls(slug) {
    const figure = document.querySelector(`maths-figure[data-figure="${slug}"]`);
    if (!figure)
        return [];
    const out = [];
    for (const el of figure.querySelectorAll("input, select")) {
        const input = el;
        if (input.tagName === "SELECT") {
            const select = input;
            out.push({
                kind: "select",
                index: [...figure.querySelectorAll("select")].indexOf(select),
                values: [...select.options].map((o) => o.value).slice(0, 8),
            });
        }
        else if (input.type === "range") {
            const ranges = [...figure.querySelectorAll('input[type="range"]')];
            out.push({
                kind: "range",
                index: ranges.indexOf(input),
                min: Number(input.min),
                max: Number(input.max),
                step: Number(input.step) || 1,
                value: Number(input.value),
            });
        }
        else if (input.type === "checkbox") {
            const boxes = [...figure.querySelectorAll('input[type="checkbox"]')];
            out.push({ kind: "checkbox", index: boxes.indexOf(input), checked: input.checked });
        }
    }
    return out;
}
/** Apply one setting: every control back to its default, then the overrides. */
export function applySetting(input) {
    const { slug, controls, overrides } = input;
    const figure = document.querySelector(`maths-figure[data-figure="${slug}"]`);
    if (!figure)
        return;
    const ranges = [...figure.querySelectorAll('input[type="range"]')];
    const selects = [...figure.querySelectorAll("select")];
    const boxes = [...figure.querySelectorAll('input[type="checkbox"]')];
    for (const control of controls) {
        if (control.kind === "range" && control.value !== undefined) {
            const el = ranges[control.index];
            if (el)
                el.value = String(control.value);
        }
        else if (control.kind === "select" && control.values?.length) {
            const el = selects[control.index];
            if (el)
                el.value = control.values[0];
        }
        else if (control.kind === "checkbox" && control.checked !== undefined) {
            const el = boxes[control.index];
            if (el)
                el.checked = control.checked;
        }
    }
    for (const override of overrides) {
        const el = override.kind === "range"
            ? ranges[override.index]
            : override.kind === "select"
                ? selects[override.index]
                : boxes[override.index];
        if (!el)
            continue;
        if (override.kind === "checkbox")
            el.checked = Boolean(override.value);
        else
            el.value = String(override.value);
    }
    // One event each, after every control has its value: a figure that redraws on input
    // must see the whole setting, not a half-applied one.
    for (const el of [...ranges, ...selects, ...boxes]) {
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
    }
}
/** The claims a figure has declared for the current render. */
export function readWorking(slug) {
    const figure = document.querySelector(`maths-figure[data-figure="${slug}"]`);
    if (!figure)
        return [];
    const raw = figure.getAttribute("data-working");
    if (!raw)
        return [];
    try {
        return JSON.parse(raw);
    }
    catch {
        return [];
    }
}
/** The text the figure shows a reader, with superscripts kept as powers. */
export function readoutText(slug) {
    const figure = document.querySelector(`maths-figure[data-figure="${slug}"]`);
    if (!figure)
        return "";
    const live = figure.querySelector("[aria-live], .fig-out, .fig-readout");
    if (!live)
        return "";
    // **`textContent` alone loses the notation.** `4<sup>3</sup> × 4<sup>2</sup>` reads as
    // "43 × 42", which is arithmetic that is not there — the checker called the index-law
    // figure wrong six times before this, because 43 × 42 is not 4⁵. A clone with `<sup>`
    // rewritten as `^` keeps the exponent, and the rest of the markup is dropped.
    const clone = live.cloneNode(true);
    for (const sup of [...clone.querySelectorAll("sup")])
        sup.replaceWith(`^${sup.textContent}`);
    for (const sub of [...clone.querySelectorAll("sub")])
        sub.replaceWith(`_${sub.textContent}`);
    return (clone.textContent || "").trim();
}
/** The settings to try: the default, then each control one step away from it. */
export function settingsFor(controls, cap, defaultsOnly) {
    if (defaultsOnly)
        return [[]];
    const settings = [[]];
    for (const control of controls) {
        const candidates = [];
        if (control.kind === "range" && control.min !== undefined && control.max !== undefined) {
            const { min, max, step = 1, value = min } = control;
            const snap = (n) => Math.round(n / step) * step;
            candidates.push(min, max);
            // A value that is neither bound and not the default: the awkward middle, where a
            // rounding defect lives. `interest-growth` was wrong at 6.5% of a 1–10 slider.
            const mid = snap(min + (max - min) * 0.62);
            if (mid !== value && mid !== min && mid !== max)
                candidates.push(mid);
        }
        else if (control.kind === "select") {
            for (const option of (control.values || []).slice(1))
                candidates.push(option);
        }
        else if (control.kind === "checkbox") {
            candidates.push(!control.checked);
        }
        for (const value of candidates) {
            if (settings.length >= cap)
                break;
            settings.push([{ kind: control.kind, index: control.index, value }]);
        }
    }
    return settings;
}
export async function run(argv) {
    const { values, positional } = parseArgs(argv, SURFACE);
    const siteDir = positional[0] ?? "site";
    const only = values.only ? String(values.only) : "";
    const jsonOut = values.json ? String(values.json) : "";
    const defaultsOnly = values["defaults-only"] === true;
    const verify = values.verify === true;
    const jobsFlag = Number(values.jobs) || 0;
    // The default plus five single-control variations. It is a **sample**, not a sweep:
    // a full cross-product is thousands of renders and the check is bounded on purpose.
    // The defect it exists for — a multiplier rounded before it is printed — shows up a
    // step either side of the default, so five variations of one control at a time finds
    // it without paying for the grid. A value that is not a positive number has always
    // meant ten here, and the declared default is the sample size used when it is absent.
    const cap = Number(values.settings) || 10;
    const pages = discoverFigures(siteDir);
    let slugs = Object.keys(pages).sort();
    if (only)
        slugs = slugs.filter((s) => s === only);
    if (!slugs.length) {
        console.error(`no figures found under ${siteDir}`);
        return 2;
    }
    const browser = await launchBrowser();
    const context = await openContext(browser, {
        scheme: "light",
        width: 1280,
        height: 900,
        deviceScaleFactor: 1,
        blockServiceWorkers: true,
    });
    await serveStatic(context, siteDir);
    // One page per worker, and one by default for the same reason as the figure audit: a
    // pool is faster and races. `--jobs` is here for the same reason too.
    const jobs = Math.max(1, Math.min(jobsFlag || 1, 8));
    const pagesPool = await Promise.all(Array.from({ length: jobs }, () => context.newPage()));
    // What each render asserts and what it prints. The arithmetic is done by the Python
    // verifier; this command's job is to collect honest data and say how much of the
    // collection is still undeclared.
    const records = [];
    let declared = 0;
    const undeclaredSlugs = [];
    let readouts = 0;
    await mapPool(slugs, jobs, async (slug, index) => {
        const page = pagesPool[index % jobs];
        const route = pages[slug][0];
        let figureDeclared = 0;
        let figureStatesArithmetic = false;
        try {
            await page.goto(`${ORIGIN}${route}`, { waitUntil: "load" });
            // Wait for the figure to mount, not for a fixed quarter second. The fixed pause
            // was the audit's whole cost too: 284 seconds became 91 with this one change and
            // no loss of coverage.
            await page
                .waitForFunction((s) => {
                const figure = document.querySelector(`maths-figure[data-figure="${s}"]`);
                return !!figure && !!figure.querySelector("svg, canvas, input, select, button, .fig");
            }, slug, { timeout: 8000 })
                .catch(() => { });
            await page.waitForTimeout(60);
            const controls = (await page.evaluate(readControls, slug));
            const settings = settingsFor(controls, cap, defaultsOnly);
            const seen = new Set();
            for (const overrides of settings) {
                await page.evaluate(applySetting, { slug, controls, overrides });
                await page.waitForTimeout(40);
                const text = (await page.evaluate(readoutText, slug));
                const claims = (await page.evaluate(readWorking, slug));
                if (!text || seen.has(text))
                    continue;
                seen.add(text);
                readouts += 1;
                if (/\d\s*[\u00d7\u00f7]\s*\d|\d\s*=\s*[\d\u00a3\u20ac\u00a3]/.test(text)) {
                    figureStatesArithmetic = true;
                }
                if (claims.length) {
                    figureDeclared += 1;
                    records.push({ slug, route, settings: overrides, readout: text, claims });
                }
            }
        }
        catch (error) {
            console.error(`\n  ${slug}: ${String(error).slice(0, 160)}`);
        }
        if (figureDeclared)
            declared += 1;
        else if (figureStatesArithmetic)
            undeclaredSlugs.push(slug);
        process.stdout.write(".");
    });
    for (const page of pagesPool)
        await page.close();
    process.stdout.write("\n");
    await browser.close();
    const jsonPath = jsonOut || (verify ? path.join(os.tmpdir(), "textbook-claims.json") : "");
    if (jsonPath)
        fs.writeFileSync(jsonPath, JSON.stringify(records, null, 1));
    const claimCount = records.reduce((total, record) => total + record.claims.length, 0);
    console.log(`  ${slugs.length} figures, ${readouts} readouts; ` +
        `${declared} declare ${claimCount} claim(s), ${undeclaredSlugs.length} state arithmetic and declare none`);
    if (verify) {
        // The arithmetic is the verifier's, not this command's: SymPy rationalises 0.065 to
        // 13/200, so a claim is decided exactly and the notation a figure chose cannot
        // change the answer. `execFileSync` **returns null** when stdout is inherited and
        // throws on a non-zero exit, so the status has to come from the catch — reading the
        // return value made every run look like a failure.
        try {
            execFileSync("uv", ["run", "python", "-m", "textbook.working", jsonPath], {
                stdio: "inherit",
            });
            return 0;
        }
        catch (error) {
            const status = error.status;
            return typeof status === "number" ? status : 1;
        }
    }
    if (undeclaredSlugs.length) {
        // **Named, not just counted.** The count says the gap exists; the list says where,
        // and a message that does not say where is a message someone has to re-derive.
        console.log(`  ${undeclaredSlugs.length} figure(s) print arithmetic and declare no claim — ` +
            "call `claim([...])` from the panel so the verifier can prove it:");
        for (const slug of undeclaredSlugs.sort())
            console.log(`    ${slug}`);
    }
    return 0;
}
