#!/usr/bin/env node
import { SURFACE as ASSETS, run as runAssets } from "./commands/assets.js";
import { SURFACE as AUDIT, run as runAuditFigures } from "./commands/audit-figures.js";
import { SURFACE as CHECK_MOBILE, run as runCheckMobile } from "./commands/check-mobile.js";
import { SURFACE as KIT, run as runKit } from "./commands/kit.js";
import { SURFACE as KIT_PURE, run as runKitPure } from "./commands/kit-pure.js";
import { SURFACE as OFFLINE, run as runOffline } from "./commands/offline.js";
import { SURFACE as BUDGET, run as runMeasureBudget } from "./commands/measure-budget.js";
import { SURFACE as CANVAS, run as runCanvas } from "./commands/canvas.js";
import { SURFACE as PREVIEW, run as runPreview } from "./commands/preview.js";
import { SURFACE as READOUT, run as runReadout } from "./commands/readout.js";
import { SURFACE as SCREENSHOT, run as runScreenshot } from "./commands/screenshot.js";
import { SURFACE as TARGETS, run as runTargets } from "./commands/target-size.js";
import { SURFACE as TYPES, run as runTypes } from "./commands/types.js";
import { helpRows, surfaceProblems, usageWords, wrapWords, } from "./lib/flags.js";
const COMMANDS = {
    assets: {
        summary: "check every asset a built site's pages reach for, and every manifest entry",
        surface: ASSETS,
        run: runAssets,
    },
    "check-mobile": {
        summary: "fail when a phone-width page is wider than the screen",
        surface: CHECK_MOBILE,
        run: runCheckMobile,
    },
    audit: {
        summary: "measure every figure's paint in both schemes, and its legibility at 390px",
        surface: AUDIT,
        run: runAuditFigures,
    },
    budget: {
        summary: "measure the bytes over the wire on a first load",
        surface: BUDGET,
        run: runMeasureBudget,
    },
    canvas: {
        summary: "fail when a figure draws its ink outside its own viewBox",
        surface: CANVAS,
        run: runCanvas,
    },
    kit: {
        summary: "the kit's DOM contract, checked through a real page",
        surface: KIT,
        run: runKit,
    },
    offline: {
        summary: "read a book with the network off, after a deploy emptied the runtime cache",
        surface: OFFLINE,
        run: runOffline,
    },
    preview: {
        summary: "every theme bundle in both schemes, with the reader's preference and contrast checked",
        surface: PREVIEW,
        run: runPreview,
    },
    readout: {
        summary: "recompute the arithmetic every figure prints, at several settings",
        surface: READOUT,
        run: runReadout,
    },
    "kit-pure": {
        summary: "the kit's drawing and formatting layers, with no browser",
        surface: KIT_PURE,
        run: runKitPure,
    },
    targets: {
        summary: "fail when an interactive control is under 24x24 at 390px",
        surface: TARGETS,
        run: runTargets,
    },
    types: {
        summary: "type-check the runtime and the tools, and fail if the count grows",
        surface: TYPES,
        run: runTypes,
    },
    screenshot: {
        summary: "capture the built site, one image per route per scheme",
        surface: SCREENSHOT,
        run: runScreenshot,
    },
};
const WIDTH = 90;
function commandUsage(name, command) {
    return wrapWords([`tools ${name}`, ...usageWords(command.surface)], 6, WIDTH);
}
function listed() {
    return Object.entries(COMMANDS).map(([name, command]) => ({
        name,
        command,
        usage: commandUsage(name, command),
    }));
}
function disagreeing(commands) {
    const problems = surfaceProblems(commands.map(({ name, command, usage }) => ({ name, surface: command.surface, usage })));
    if (!problems.length)
        return 0;
    console.error("the parser and the help line disagree, so the help is not printed:");
    for (const problem of problems)
        console.error(`  ${problem.command}: ${problem.what}`);
    console.error("\nEach command's `SURFACE` in `tools/src/commands/` is the one place to fix.");
    return 1;
}
function check(commands) {
    let flags = 0;
    for (const { name, command } of commands) {
        const count = Object.keys(command.surface.flags).length;
        flags += count;
        const positionals = (command.surface.positional ?? []).length;
        console.log(`  ${name.padEnd(12)} ${String(count).padStart(2)} flag(s), ` +
            `${String(positionals).padStart(2)} positional(s) — the help line and the parser agree`);
    }
    if (!commands.length || !flags) {
        console.error("\nsurface check found no commands or no flags at all, which is not a pass");
        return 1;
    }
    console.log(`\nsurfaces: ${commands.length} commands, ${flags} flags, every one named in its help`);
    return 0;
}
function show(name, command) {
    console.log(`${name} — ${command.summary}\n`);
    console.log("usage:");
    for (const line of commandUsage(name, command))
        console.log(line);
    const rows = helpRows(command.surface);
    if (!rows.length) {
        console.log("\n      this command takes no arguments");
        return;
    }
    console.log("");
    const column = Math.min(Math.max(...rows.map((row) => row.left.length)), 30);
    for (const row of rows) {
        const head = `      ${row.left.padEnd(column)}  `;
        const body = wrapWords(row.right.split(" "), head.length, WIDTH);
        console.log(head + body[0].slice(head.length));
        for (const line of body.slice(1))
            console.log(line);
    }
}
function help(argv) {
    const commands = listed();
    const wrong = disagreeing(commands);
    if (wrong)
        return wrong;
    if (argv[0] === "--check")
        return check(commands);
    if (argv[0]) {
        const command = COMMANDS[argv[0]];
        if (!command) {
            console.error(`unknown command: ${argv[0]}\n`);
            return 2;
        }
        show(argv[0], command);
        return 0;
    }
    console.log("tools — the checks and measurements for this repository\n");
    console.log("usage: tools <command> [options]");
    console.log("       tools help <command>   every flag that command takes");
    console.log("       tools help --check     prove each help line matches its parser\n");
    const width = Math.max(...Object.keys(COMMANDS).map((name) => name.length));
    for (const { name, command, usage } of commands) {
        const summary = wrapWords(command.summary.split(" "), width + 4, WIDTH);
        console.log(`  ${name.padEnd(width)}  ${summary[0].slice(width + 4)}`);
        for (const line of summary.slice(1))
            console.log(line);
        for (const line of usage)
            console.log(line);
    }
    console.log(`\n  ${"help".padEnd(width)}  this list, or one command's flags`);
    return 0;
}
async function main() {
    const [name, ...argv] = process.argv.slice(2);
    if (!name || name === "--help" || name === "-h")
        return help([]);
    if (name === "help")
        return help(argv);
    const command = COMMANDS[name];
    if (!command) {
        console.error(`unknown command: ${name}\n`);
        help([]);
        return 2;
    }
    return command.run(argv);
}
main()
    .then((code) => process.exit(code))
    .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
});
