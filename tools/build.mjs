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
 *             One output file per source, so a stack trace names `kit/draw.js` and a
 *             module can reach one layer. `--outbase=src` keeps `src/kit/draw.ts` at
 *             `kit/draw.js`, which `SHARED_DIRS` and `pipeline.copy_assets` depend on.
 *             Prose comments are stripped: JSDoc blocks carrying `@param`/`@typedef`
 *             stay, because `tsconfig.json` type-checks the shipped copy through them.
 *
 *   the tools `tools/src/**` -> `tools/dist/**`
 *             One output file per source, not a bundle: `tools kit` serves
 *             `tools/dist/lib/kit-contract.js` to the page at `/__kit-contract.js`, so
 *             the module must be its own file with no runtime imports.
 *
 * The output is committed and drift-checked, like `themes.css`: a clone works with no
 * build step and `scripts/check.sh` fails when the committed output goes stale.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { rm } from "node:fs/promises";

const KIT_OUT = ["assets/figures/kit.js", "assets/figures/kit"];

/** Every JavaScript file the kit build wrote, barrel and layers. */
function emittedKitFiles() {
  const files = ["assets/figures/kit.js"];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".js")) files.push(full);
    }
  };
  walk("assets/figures/kit");
  return files;
}

function run(command, args) {
  execFileSync(command, args, { stdio: "inherit", cwd: process.cwd() });
}

/** Drop comments that carry no type information; keep JSDoc blocks that do. */
function stripProseComments(text) {
  const blocks = text.replace(/\/\*[\s\S]*?\*\//g, (block) => (block.includes("@") ? block : ""));
  return blocks.replace(/^[ \t]*\/\/.*\n/gm, "");
}

async function buildKit() {
  // `tsc` emits, then the prose comments go, then `prettier` restores the repository's
  // own style because the generated file is committed.
  run("node_modules/.bin/tsc", ["-p", "tsconfig.kit.json"]);
  for (const file of emittedKitFiles()) {
    writeFileSync(file, stripProseComments(readFileSync(file, "utf8")));
  }
  run("node_modules/.bin/prettier", ["--write", "--log-level", "warn", ...KIT_OUT]);

  // `// @ts-nocheck` on every emitted file: `tsconfig.json` checks the shipped
  // JavaScript, and `tsc` strips annotations when it emits, so the copy can only be
  // inferred from destructuring defaults and reports errors the source does not have.
  for (const file of emittedKitFiles()) {
    const text = readFileSync(file, "utf8");
    if (!text.startsWith("// @ts-nocheck")) {
      writeFileSync(file, `// @ts-nocheck\n${text}`);
    }
  }
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
