/*
 * A command's argument surface, declared once.
 *
 * A command used to declare its flags in the parser and *describe* them in a prose
 * `usage` string in `cli.ts`, and nothing compared the two. `audit` accepted `--maps`
 * that `tools help` never mentioned. `readout` and `preview` carried their own
 * hand-written loops in which an unknown flag was **silently ignored**, so a typo in
 * CI read as a passing run — the worst kind of difference from the five commands that
 * rejected it.
 *
 * So the surface is one table per command: the flag names, what each one takes, its
 * default, and the sentence that explains it. Three things are read from that table
 * and nothing else:
 *
 *   * `parseArgs` accepts exactly those names, with those kinds and those defaults;
 *   * `usageLines` renders exactly those names into `tools help`;
 *   * `surfaceProblems` drives the parser with every name in the rendered line and
 *     with a misspelling of each, so "the help line and the parser agree" is proved
 *     before anything is printed rather than assumed.
 *
 * A flag that exists in one of the three and not the others is the defect this file
 * is for, and the last of the three is what makes it impossible.
 */
/**
 * Parse `--flag value` pairs and positionals against a surface, rejecting an unknown
 * flag, a value-less string flag and a missing required positional.
 *
 * A declared `default` is filled in for a flag that is absent, so the value the help
 * line reports and the value the command reads cannot come apart. `--` ends the
 * flags: everything after it is positional, even if it starts with `--` (the routes
 * `preview` and `screenshot` take are passed that way).
 */
export function parseArgs(argv, surface) {
    const values = {};
    for (const [name, flag] of Object.entries(surface.flags)) {
        if (flag.default !== undefined)
            values[name] = flag.default;
    }
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
            const flag = surface.flags[name];
            if (!flag)
                throw new Error(`unknown option --${name}`);
            if (flag.kind === "boolean") {
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
    for (const [index, arg] of (surface.positional ?? []).entries()) {
        if (arg.required === false)
            continue;
        if (positional[index] === undefined)
            throw new Error(`missing argument <${arg.name}>`);
    }
    return { values, positional };
}
/** The words of the usage line: positionals in order, then flags in table order. */
export function usageWords(surface) {
    const words = [];
    for (const arg of surface.positional ?? []) {
        words.push(arg.required === false ? `[${arg.name}]` : `<${arg.name}>`);
    }
    for (const [name, flag] of Object.entries(surface.flags)) {
        words.push(flag.kind === "boolean" ? `[--${name}]` : `[--${name} ${flag.value ?? "<value>"}]`);
    }
    return words;
}
/** Wrap words into lines of at most `width` columns, every line indented. */
export function wrapWords(words, indent, width = 90) {
    const pad = " ".repeat(indent);
    const lines = [];
    let line = "";
    for (const word of words) {
        if (!line)
            line = pad + word;
        else if (line.length + 1 + word.length > width) {
            lines.push(line);
            line = pad + word;
        }
        else
            line += " " + word;
    }
    if (line.trim())
        lines.push(line);
    return lines;
}
/** The usage line, wrapped, with every flag the parser accepts named in it. */
export function usageLines(surface, indent = 0, width = 90) {
    return wrapWords(usageWords(surface), indent, width);
}
/** The rows `tools help <command>` prints, in the order the usage line reads them. */
export function helpRows(surface) {
    const rows = [];
    for (const arg of surface.positional ?? []) {
        rows.push({
            left: arg.name,
            right: arg.help + (arg.required === false ? "" : " (required)"),
        });
    }
    for (const [name, flag] of Object.entries(surface.flags)) {
        const left = flag.kind === "boolean" ? `--${name}` : `--${name} ${flag.value ?? "<value>"}`;
        const right = flag.default === undefined ? flag.help : `${flag.help} (default: ${flag.default})`;
        rows.push({ left, right });
    }
    return rows;
}
/**
 * Prove that a command's rendered usage line and its parser describe the same surface.
 *
 * This is the check the review asked for, run in-process before `tools help` prints:
 * every flag in the table is named in the line, the line names nothing the table does
 * not have, the parser accepts each declared flag and rejects a misspelling of each,
 * a string flag with no value is an error rather than a crash, `--` still ends the
 * flags, and a required positional is still required.
 */
export function surfaceProblems(commands) {
    const problems = [];
    const note = (command, what) => problems.push({ command, what });
    for (const { name, surface, usage } of commands) {
        const declared = Object.keys(surface.flags);
        // Parsing a flag on its own would fail for a different reason — the required
        // positional is missing — so every probe fills the positionals first.
        const required = (surface.positional ?? []).filter((arg) => arg.required !== false).length;
        const dummies = Array(required).fill("x");
        const named = new Set([...usage.join(" ").matchAll(/--([a-z0-9][a-z0-9-]*)/g)].map((match) => match[1]));
        for (const flag of declared) {
            if (!named.has(flag))
                note(name, `--${flag} is accepted but the help line never names it`);
        }
        for (const flag of named) {
            if (!declared.includes(flag)) {
                note(name, `the help line names --${flag}, which the parser rejects`);
            }
        }
        // The positionals named in the line have to be the ones the parser requires.
        for (const arg of surface.positional ?? []) {
            const shown = arg.required === false ? `[${arg.name}]` : `<${arg.name}>`;
            if (!usage.join(" ").includes(shown))
                note(name, `the help line does not show ${shown}`);
        }
        for (const [flag, spec] of Object.entries(surface.flags)) {
            if (!spec.help.trim())
                note(name, `--${flag} has no help text`);
            if (spec.kind === "boolean" && spec.default !== undefined) {
                note(name, `--${flag} is a boolean and cannot have a default`);
            }
            const argv = spec.kind === "string" ? [`--${flag}`, "probe"] : [`--${flag}`];
            try {
                const parsed = parseArgs([...dummies, ...argv], surface);
                const want = spec.kind === "string" ? "probe" : true;
                if (parsed.values[flag] !== want) {
                    note(name, `--${flag} parsed to ${JSON.stringify(parsed.values[flag])}`);
                }
            }
            catch (error) {
                note(name, `--${flag} is in the table but the parser rejected it: ${String(error)}`);
            }
            // A misspelling must fail, which is the difference the two hand-written parsers
            // did not have: they ignored it, so a typo in CI looked like a passing run.
            try {
                parseArgs([...dummies, `--${flag}-typo`], surface);
                note(name, `--${flag}-typo was accepted, so an unknown flag is not rejected`);
            }
            catch {
                /* that is the behaviour being asserted */
            }
            if (spec.kind === "string") {
                try {
                    parseArgs([...dummies, `--${flag}`], surface);
                    note(name, `--${flag} was accepted with no value`);
                }
                catch {
                    /* that is the behaviour being asserted */
                }
            }
        }
        // `--` ends the flags: what follows is positional, whatever it looks like.
        try {
            const parsed = parseArgs([...dummies, "--", "--not-a-flag"], surface);
            if (!parsed.positional.includes("--not-a-flag")) {
                note(name, "`-- --not-a-flag` did not reach the command as a positional");
            }
        }
        catch (error) {
            note(name, `\`--\` no longer ends the flags: ${String(error)}`);
        }
        // A required positional is still required.
        if (required) {
            try {
                parseArgs(Array(required - 1).fill("x"), surface);
                note(name, `${required} positional(s) are required but ${required - 1} was accepted`);
            }
            catch {
                /* that is the behaviour being asserted */
            }
        }
    }
    return problems;
}
