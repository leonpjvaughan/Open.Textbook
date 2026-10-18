/*
 * Type-check the browser runtime and the tools, and refuse to let either get worse.
 *
 * `tsc` reports a number that is not zero, because the runtime was written before
 * types existed and the annotations are a work list rather than a switch. A check that
 * always fails gets deleted, so this one **ratchets**: it passes at the recorded
 * count, fails the moment the count grows, and fails when it falls without the
 * baseline being lowered — so the number can only come down.
 *
 * The baseline lives in this file, which is committed, rather than in the build output.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { parseArgs } from "../lib/flags.js";
/*
 * Errors over the runtime sources and the tools, at the settings in `tsconfig.json`.
 *
 * The count went 163 -> 338 when the check was pointed at the kit's TypeScript source
 * instead of only its compiled output, and 338 -> 368 when the tools CLI was ported in
 * from `scripts/`. Both rises are the migration's own untyped code, and both are the
 * work list: annotating a parameter lowers this number, and it cannot rise again
 * without a reason in the commit message.
 */
const BASELINE = 0;
const TARGET = 0;
const SELF = fileURLToPath(import.meta.url);
/** What this command accepts. `tools help types` is generated from this table. */
export const SURFACE = {
    flags: {
        list: { kind: "boolean", help: "print the error count per file, largest first" },
        update: { kind: "boolean", help: "record the current count as the new baseline" },
    },
};
/** The TypeScript source of this file, which is where the baseline is committed. */
function baselineSource() {
    const compiled = path.relative(path.join(repoRoot(), "tools", "dist"), SELF);
    return path.join(repoRoot(), "tools", "src", compiled.replace(/\.js$/, ".ts"));
}
/** Walk up from this file to the directory that holds `tsconfig.json`. */
function repoRoot() {
    let dir = path.dirname(SELF);
    for (;;) {
        if (fs.existsSync(path.join(dir, "tsconfig.json")))
            return dir;
        const parent = path.dirname(dir);
        if (parent === dir)
            throw new Error("tsconfig.json not found above " + SELF);
        dir = parent;
    }
}
function runTsc() {
    try {
        return execFileSync(path.join(repoRoot(), "node_modules/.bin/tsc"), ["-p", "tsconfig.json"], {
            cwd: repoRoot(),
            encoding: "utf8",
        });
    }
    catch (error) {
        // `tsc` exits non-zero when it has findings, which is the normal case here. But a
        // `tsc` that could not run at all also exits non-zero and prints nothing — and
        // counting that as "0 errors" is how this check passed while reporting nothing.
        // An empty stdout with a non-zero exit is a failure of the check, not a clean run.
        const stdout = String(error.stdout ?? "");
        const stderr = String(error.stderr ?? "");
        if (!stdout.trim()) {
            throw new Error(`tsc produced no output and exited non-zero:\n${stderr.trim()}`);
        }
        return stdout;
    }
}
export async function run(argv) {
    const { values } = parseArgs(argv, SURFACE);
    const errors = runTsc()
        .split("\n")
        .filter((line) => /error TS\d+/.test(line));
    if (values.list === true) {
        const byFile = new Map();
        for (const line of errors) {
            const file = line.slice(0, line.indexOf("("));
            byFile.set(file, (byFile.get(file) ?? 0) + 1);
        }
        for (const [file, count] of [...byFile].sort((a, b) => b[1] - a[1])) {
            console.log(`${String(count).padStart(4)}  ${file}`);
        }
        console.log(`\n${errors.length} errors, baseline ${BASELINE}, target ${TARGET}`);
        return 0;
    }
    if (values.update === true) {
        // The baseline lives in the **source**, not in the compiled copy that is running:
        // rewriting `SELF` would write into `tools/dist/`, which the next build overwrites,
        // and the update would silently do nothing. `SELF` is `tools/dist/commands/types.js`,
        // so the source is the same path under `src/` with a `.ts` suffix.
        const source = readFileSync(baselineSource(), "utf8");
        writeFileSync(baselineSource(), source.replace(/^const BASELINE = \d+;/m, `const BASELINE = ${errors.length};`));
        console.log(`baseline: ${BASELINE} -> ${errors.length}`);
        return 0;
    }
    if (errors.length > BASELINE) {
        console.error(`types: ${errors.length} errors, up from ${BASELINE}. Run ` +
            `\`tools types --list\` to see which file gained them.`);
        return 1;
    }
    if (errors.length < BASELINE) {
        console.error(`types: ${errors.length} errors, down from ${BASELINE} — lower the baseline with ` +
            `\`tools types --update\` in this change.`);
        return 1;
    }
    console.log(`types: ${errors.length} errors, holding at the baseline (target ${TARGET})`);
    return 0;
}
