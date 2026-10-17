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

async function buildKit() {
  // `tsc` emits, and `prettier` restores the repository's own style. `tsc` always
  // indents by four spaces and always expands a single-line `if`; the generated file
  // is committed, so it has to read like the rest of the tree. It keeps the comments,
  // which is why the compiler is `tsc` and not a bundler.
  run("node_modules/.bin/tsc", ["-p", "tsconfig.kit.json"]);
  run("node_modules/.bin/prettier", ["--write", "--log-level", "warn", ...KIT_OUT]);

  // **`// @ts-nocheck` on every emitted file, because the artefact is the source minus
  // its types.** `tsconfig.json` checks the JavaScript that ships, and a book module
  // reaches `./kit.js`, which pulls the generated copy into the program. But `tsc`
  // strips annotations when it emits, so the generated copy can only be inferred from
  // destructuring defaults — `label({ x, y, text, anchor = "middle" })` becomes a type
  // that has `anchor` and not `x`, and every property read reports an error the source
  // does not have. That was 74 of the type ratchet's errors, all of them artefacts.
  // The source is checked; the copy is not, and saying so in the copy is the honest
  // way to express it.
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
