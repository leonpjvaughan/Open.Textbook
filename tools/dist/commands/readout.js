/*
 * Check the arithmetic a figure prints.
 *
 * The readout is where a figure states its working — "€1,500.00 × 0.065 × 4 = €390.00" —
 * and nothing read it. Two of fourteen figures added on 2026-10-17 printed a
 * multiplication that does not give the number beside it, and every existing check
 * passed: structure, colour, contrast, legibility, and the kit's DOM contract all
 * measure the drawing, not the sentence under it.
 *
 * So this reads the sentence. For each figure it takes the readout at several settings
 * — the default, then each control at its extremes and one value in between, because
 * `interest-growth` was wrong at 6.5% and right at 5% — and recomputes every
 * `left = right` where both sides are pure numbers.
 *
 * **What it does not do, and says so.** It cannot read a formula with symbols, a
 * complex number, or a statement it cannot parse; those are counted as *unread* and
 * reported. A check that silently skipped what it could not read would be a check that
 * says "0 wrong" about nothing.
 *
 *     tools readout <siteDir> [--only slug] [--json file] [--defaults-only]
 *     tools readout --self-test
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { launchBrowser, openContext, serveStatic, ORIGIN } from "../lib/browser.js";
import { discoverFigures } from "../lib/site.js";
import { checkArithmetic } from "../lib/readout-arithmetic.js";
/** The controls inside one figure, in document order, with what they can be set to. */
function readControls(slug) {
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
function applySetting(input) {
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
function readWorking(slug) {
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
function readoutText(slug) {
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
function settingsFor(controls, cap, defaultsOnly) {
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
const SELF_TEST = [
    // The two real defects, as they were printed.
    ["Simple interest is €1,500.00 × 0.07 × 4 = €390.00, so the total is €1,890.00.", false],
    ["The shares are 3 × 14.29 = 42.86 and 4 × 14.29 = 57.14.", false],
    // The same statements once fixed.
    ["Simple interest is €1,500.00 × 0.065 × 4 = €390.00, so the total is €1,890.00.", true],
    ["The first share is 3 parts, which is 42.86 to 2 decimal places.", true],
    // Legitimate rounding: the result is the expression rounded to the places shown.
    ["One part is 100 ÷ 7, which is 14.29 to 2 decimal places.", true],
    ["100 ÷ 7 = 14.29", true],
    // Powers, superscripts and percentages.
    ["Compound interest gives €1,500.00 × 1.065^4 = €1,929.70.", true],
    ["The kinetic energy is 0.5 × 2 × 3² = 9 J.", true],
    ["50% of 240 is 50/100 × 240 = 120.", true],
    // Not this check's business: a definition, a comparison, an approximation.
    ["z = 3.0 + 4.0i", true],
    ["x < 5, so the shading runs to the left.", true],
    ["The gradient is about 6.55 ≈ 6.6.", true],
    ["A = lw", true],
];
function selfTest() {
    let failed = 0;
    for (const [text, shouldPass] of SELF_TEST) {
        const result = checkArithmetic(text);
        const passed = result.wrong.length === 0;
        if (passed !== shouldPass) {
            failed += 1;
            const detail = result.wrong[0];
            console.error(`  FAIL ${JSON.stringify(text)}\n       expected ${shouldPass ? "no finding" : "a finding"}` +
                (detail
                    ? `, got ${detail.left} = ${detail.computed} but shown ${detail.shown}`
                    : ", got none"));
        }
    }
    const wrongCount = SELF_TEST.filter(([t]) => checkArithmetic(t).wrong.length).length;
    console.log(`  self-test: ${SELF_TEST.length} statements, ${wrongCount} deliberately wrong, ${failed} disagreement(s)`);
    return failed ? 1 : 0;
}
export async function run(argv) {
    if (argv.includes("--self-test"))
        return selfTest();
    let siteDir = "site";
    let only = "";
    let jsonOut = "";
    let defaultsOnly = false;
    let textOnly = false;
    let verify = false;
    let cap = 10;
    for (let i = 0; i < argv.length; i += 1) {
        const arg = argv[i];
        if (arg === "--only")
            only = argv[(i += 1)];
        else if (arg === "--json")
            jsonOut = argv[(i += 1)];
        else if (arg === "--defaults-only")
            defaultsOnly = true;
        else if (arg === "--text")
            textOnly = true;
        else if (arg === "--verify")
            verify = true;
        else if (arg === "--settings")
            cap = Number(argv[(i += 1)]) || 10;
        else if (!arg.startsWith("--"))
            siteDir = arg;
    }
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
    const page = await context.newPage();
    // What each render asserts and what it prints. The arithmetic is done by the Python
    // verifier; this command's job is to collect honest data and say how much of the
    // collection is still undeclared.
    const records = [];
    let declared = 0;
    let undeclared = 0;
    let readouts = 0;
    // Only the text heuristic uses these, which is why they are declared beside it and
    // not at the top: the declared-claim path needs no parser state at all.
    let statements = 0;
    let right = 0;
    let unread = 0;
    const wrong = [];
    for (const slug of slugs) {
        const route = pages[slug][0];
        let figureDeclared = 0;
        let figureStatesArithmetic = false;
        try {
            await page.goto(`${ORIGIN}${route}`, { waitUntil: "load" });
            await page.waitForTimeout(250);
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
                else if (textOnly) {
                    // The text heuristic. It is a hint and never a guarantee: it cannot read most
                    // of what it sees, and every new formatting choice was a new case.
                    const result = checkArithmetic(text);
                    statements += result.right + result.wrong.length;
                    right += result.right;
                    unread += result.unread.length;
                    for (const detail of result.wrong)
                        wrong.push({ slug, where: route, detail });
                }
            }
        }
        catch (error) {
            console.error(`\n  ${slug}: ${String(error).slice(0, 160)}`);
        }
        if (figureDeclared)
            declared += 1;
        else if (figureStatesArithmetic)
            undeclared += 1;
        process.stdout.write(".");
    }
    process.stdout.write("\n");
    await browser.close();
    const jsonPath = jsonOut || (verify ? path.join(os.tmpdir(), "textbook-claims.json") : "");
    if (jsonPath)
        fs.writeFileSync(jsonPath, JSON.stringify(records, null, 1));
    const claimCount = records.reduce((total, record) => total + record.claims.length, 0);
    console.log(`  ${slugs.length} figures, ${readouts} readouts; ` +
        `${declared} declare ${claimCount} claim(s), ${undeclared} state arithmetic and declare none`);
    if (textOnly) {
        console.log(`  text heuristic: ${statements} statements readable (${right} right, ${wrong.length} wrong), ` +
            `${unread} unreadable`);
        for (const finding of wrong.slice(0, 20)) {
            const d = finding.detail;
            console.error(`\n  ${finding.slug} [${d.left}]\n     ${d.statement}`);
            console.error(`     ${d.left} = ${d.computed.toFixed(6)}, but the figure says ${d.shown}`);
        }
        if (wrong.length) {
            console.error(`\n  readout arithmetic failed: ${wrong.length} statement(s)`);
            return 1;
        }
    }
    if (verify) {
        // The arithmetic is the verifier's, not this command's: SymPy rationalises 0.065 to
        // 13/200, so a claim is decided exactly and the notation a figure chose cannot
        // change the answer.
        const code = execFileSync("uv", ["run", "python", "-m", "textbook.working", jsonPath], { stdio: "inherit" });
        return code === null ? 1 : 0;
    }
    if (undeclared) {
        console.log(`  ${undeclared} figure(s) print arithmetic and declare no claim — ` +
            "call `claim([...])` from the panel so the verifier can prove it");
    }
    return 0;
}
