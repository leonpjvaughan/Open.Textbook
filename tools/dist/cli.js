#!/usr/bin/env node
/*
 * One entry point for every check and measurement in this repository.
 *
 * There were thirteen loose files in `scripts/` and no way to find out what any of
 * them did without opening it. The name said `check-figure-kit` and the usage was
 * inside, in a comment, in a format only the author knew. So the commands are named
 * here, once, with their arguments, and `tools help` is the index.
 *
 * What stayed in `scripts/` is what is genuinely shell: `check.sh`, `preview-themes.sh`
 * and `deploy.sh` orchestrate Python and Node processes and branch on their exit codes,
 * and bash is the right language for that. What moved is the work those shell scripts
 * call into, which is Node and needed types and shared plumbing.
 *
 *     tools <command> [options]
 *     tools help
 */
import { run as runAuditFigures } from "./commands/audit-figures.js";
import { run as runCheckMobile } from "./commands/check-mobile.js";
import { run as runKit } from "./commands/kit.js";
import { run as runKitPure } from "./commands/kit-pure.js";
import { run as runMeasureBudget } from "./commands/measure-budget.js";
import { run as runPreview } from "./commands/preview.js";
import { run as runReadout } from "./commands/readout.js";
import { run as runScreenshot } from "./commands/screenshot.js";
import { run as runTypes } from "./commands/types.js";
const COMMANDS = {
    "check-mobile": {
        summary: "fail when a phone-width page is wider than the screen",
        usage: "[siteDir]",
        run: runCheckMobile,
    },
    audit: {
        summary: "measure every figure's paint in both schemes, and its legibility at 390px",
        usage: "<siteDir> [--schemes light,dark] [--theme id] [--shots dir] [--json file] [--only slug] [--table file] [--mobile]",
        run: runAuditFigures,
    },
    budget: {
        summary: "measure the bytes over the wire on a first load",
        usage: "[siteDir] [route] [--compress]",
        run: runMeasureBudget,
    },
    kit: {
        summary: "the kit's DOM contract, checked through a real page",
        usage: "[siteDir] [route]",
        run: runKit,
    },
    preview: {
        summary: "every theme bundle in both schemes, with the reader's preference and contrast checked",
        usage: "[--root dir] [--layout id] [--out dir] [--themes a,b] [--schemes light,dark] [--viewport WxH] [--full] [--no-shots] [--audit] [--audit-limit n] -- name:route ...",
        run: runPreview,
    },
    readout: {
        summary: "recompute the arithmetic every figure prints, at several settings",
        usage: "[siteDir] [--only slug] [--settings n] [--defaults-only] [--json file] [--self-test]",
        run: runReadout,
    },
    "kit-pure": {
        summary: "the kit's drawing and formatting layers, with no browser",
        usage: "[kitPath]",
        run: runKitPure,
    },
    types: {
        summary: "type-check the runtime and the tools, and fail if the count grows",
        usage: "[--list | --update]",
        run: runTypes,
    },
    screenshot: {
        summary: "capture the built site, one image per route per scheme",
        usage: "<siteDir> <outDir> [--schemes light,dark] [--theme <bundle>] -- name:route ...",
        run: runScreenshot,
    },
};
function help() {
    console.log("tools — the checks and measurements for this repository\n");
    console.log("usage: tools <command> [options]\n");
    const width = Math.max(...Object.keys(COMMANDS).map((name) => name.length));
    for (const [name, command] of Object.entries(COMMANDS)) {
        console.log(`  ${name.padEnd(width)}  ${command.summary}`);
        console.log(`  ${" ".repeat(width)}  ${command.usage}`);
    }
    console.log("\n  help".padEnd(width + 4) + "  this list");
}
async function main() {
    const [name, ...argv] = process.argv.slice(2);
    if (!name || name === "help" || name === "--help" || name === "-h") {
        help();
        return 0;
    }
    const command = COMMANDS[name];
    if (!command) {
        console.error(`unknown command: ${name}\n`);
        help();
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
