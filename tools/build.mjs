#!/usr/bin/env node
/*
 * Build the TypeScript that the browser runs.
 *
 * This is the one file in `tools/` that is plain JavaScript, and it has to be: it
 * compiles the TypeScript that everything else is written in, so it cannot itself
 * need compiling. It is deliberately short for the same reason.
 *
 * Two targets:
 *
 *   the kit   `assets/figures/src/**` -> `assets/figures/**`
 *             One output file per source file, so the layer design survives into
 *             the shipped tree: a module that imports `./kit.js` gets the barrel and
 *             a module that wants one layer can still reach it. `--outbase=src` is
 *             what keeps `src/kit/draw.ts` landing at `kit/draw.js` rather than
 *             `src/kit/draw.js`, which matters because `SHARED_DIRS` copies
 *             `assets/figures/kit/` and `pipeline.copy_assets` globs `assets/figures/*.js`.
 *
 *   the tools `tools/src/cli.ts` -> `tools/dist/cli.js`
 *             Bundled, because it is a program rather than a library.
 *
 * The output is committed and drift-checked, like `themes.css`: a clone then works
 * with no build step, and `scripts/check.sh` fails if the committed output stops
 * matching the source. Nothing is minified — a figure that misbehaves is read in the
 * browser's debugger, and a stack trace is worth more than the bytes.
 */
import { execFileSync } from "node:child_process";
import { rm } from "node:fs/promises";

const KIT_OUT = ["assets/figures/kit.js", "assets/figures/kit"];

function run(command, args) {
  execFileSync(command, args, { stdio: "inherit", cwd: process.cwd() });
}

async function buildKit() {
  // `tsc` emits, and `prettier` restores the repository's own style. `tsc` always
  // indents by four spaces and always expands a single-line `if`; the generated file
  // is committed, so it has to read like the rest of the tree. It keeps the comments,
  // which is why the compiler is `tsc` and not a bundler.
  run("node_modules/.bin/tsc", ["-p", "tsconfig.kit.json"]);
  run("node_modules/.bin/prettier", ["--write", "--log-level", "warn", ...KIT_OUT]);
  console.log(`built kit -> ${KIT_OUT.join(", ")}`);
}

async function buildTools() {
  await rm("tools/dist", { recursive: true, force: true });
  run("node_modules/.bin/tsc", ["-p", "tsconfig.tools.json"]);
  console.log("built tools -> tools/dist/cli.js");
}

const targets = { kit: buildKit, tools: buildTools };
const wanted = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
const chosen = wanted.length ? wanted : Object.keys(targets);

for (const name of chosen) {
  if (!targets[name]) {
    console.error(`unknown build target: ${name} (have ${Object.keys(targets).join(", ")})`);
    process.exit(2);
  }
  await targets[name]();
}
