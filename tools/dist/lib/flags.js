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
export function usageLines(surface, indent = 0, width = 90) {
    return wrapWords(usageWords(surface), indent, width);
}
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
export function surfaceProblems(commands) {
    const problems = [];
    const note = (command, what) => problems.push({ command, what });
    for (const { name, surface, usage } of commands) {
        const declared = Object.keys(surface.flags);
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
            try {
                parseArgs([...dummies, `--${flag}-typo`], surface);
                note(name, `--${flag}-typo was accepted, so an unknown flag is not rejected`);
            }
            catch {
            }
            if (spec.kind === "string") {
                try {
                    parseArgs([...dummies, `--${flag}`], surface);
                    note(name, `--${flag} was accepted with no value`);
                }
                catch {
                }
            }
        }
        try {
            const parsed = parseArgs([...dummies, "--", "--not-a-flag"], surface);
            if (!parsed.positional.includes("--not-a-flag")) {
                note(name, "`-- --not-a-flag` did not reach the command as a positional");
            }
        }
        catch (error) {
            note(name, `\`--\` no longer ends the flags: ${String(error)}`);
        }
        if (required) {
            try {
                parseArgs(Array(required - 1).fill("x"), surface);
                note(name, `${required} positional(s) are required but ${required - 1} was accepted`);
            }
            catch {
            }
        }
    }
    return problems;
}
