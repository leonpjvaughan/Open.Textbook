/*
 * How a check reports, and what its exit code means.
 *
 * Every check here answers the same question — "is this acceptable?" — and the answer
 * has to be legible in a CI log and usable from a shell. Two rules, both learned from
 * the scripts this replaces:
 *
 *   * **a check that finds nothing prints that it found nothing**, with the number it
 *     examined. "no output" and "did not run" are indistinguishable otherwise, and the
 *     figure audits have twice reported success over an empty set;
 *   * **a warning is not an error unless the caller says so.** The distinction is in
 *     the exit code, so `scripts/preview-themes.sh` can decide.
 */
/** Collect findings, and count what was examined so a run cannot look empty. */
export class Report {
    title;
    findings = [];
    examined = 0;
    constructor(title) {
        this.title = title;
    }
    error(where, what) {
        this.findings.push({ severity: "error", where, what });
    }
    warn(where, what) {
        this.findings.push({ severity: "warning", where, what });
    }
    get errors() {
        return this.findings.filter((finding) => finding.severity === "error").length;
    }
    get warnings() {
        return this.findings.filter((finding) => finding.severity === "warning").length;
    }
    /** Print the findings and a summary that always states the count examined. */
    print(unit) {
        for (const { severity, where, what } of this.findings) {
            console.log(`${severity === "error" ? "FAIL" : "WARN"}  ${where}: ${what}`);
        }
        const summary = `${this.title}: ${this.examined} ${unit} examined, ${this.errors} errors, ${this.warnings} warnings`;
        console.log(summary);
    }
    /** The exit code: non-zero when an error was recorded, never for a warning alone. */
    exitCode(options = {}) {
        if (this.errors > 0)
            return 1;
        if (options.warningsAreErrors && this.warnings > 0)
            return 1;
        return 0;
    }
}
/** Parse `--flag value` pairs and positionals, rejecting an unknown flag. */
export function parseArgs(argv, spec) {
    const values = {};
    const positional = [];
    let i = 0;
    while (i < argv.length) {
        const arg = argv[i];
        if (arg === "--") {
            positional.push(...argv.slice(i + 1));
            break;
        }
        if (arg.startsWith("--")) {
            const name = arg.slice(2);
            const kind = spec.flags[name];
            if (!kind)
                throw new Error(`unknown option --${name}`);
            if (kind === "boolean") {
                values[name] = true;
                i += 1;
            }
            else {
                const value = argv[i + 1];
                if (value === undefined)
                    throw new Error(`--${name} needs a value`);
                values[name] = value;
                i += 2;
            }
        }
        else {
            positional.push(arg);
            i += 1;
        }
    }
    for (const [index, name] of spec.positional.entries()) {
        if (positional[index] === undefined)
            throw new Error(`missing argument <${name}>`);
    }
    return { values, positional };
}
