/**
 * Check the committed `ot-solve` bundle.
 *
 * Three questions, all of them about the bytes a page will actually load:
 *
 *   1. does every file match `SHA256SUMS`, and every kernel match `bundle.json`?
 *   2. does the wasm, loaded through the same loader a figure uses, reproduce the
 *      native run recorded in `selftest.json` — status, outputs and diagnostics?
 *   3. is each kernel inside the size budget (32 kB raw, 16 kB gzip)?
 *
 * The first is provenance, the second is the ABI (offsets, endianness, base64,
 * the shim) and the third is the cost a reader pays. A Rust unit test cannot see
 * any of the three; this runs under plain `node`, in `scripts/check.sh`, and in CI.
 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TREE = path.join(ROOT, "assets", "data", "solvers");
const RAW_BUDGET = 32 * 1024;
const GZIP_BUDGET = 16 * 1024;

let failures = 0;

/** Report a failure and keep going, so one broken kernel does not hide another. */
function fail(message) {
  failures += 1;
  console.error(`  FAIL ${message}`);
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function equal(expected, actual, exact) {
  if (Object.is(expected, actual)) return true;
  if (exact) return false;
  // A kernel that calls a transcendental function may differ from the host libm
  // in the last bit; a stale byte or a wrong offset is many orders larger.
  const scale = Math.max(1, Math.abs(expected), Math.abs(actual));
  return Math.abs(expected - actual) <= 1e-12 * scale;
}

function same(a, b, exact) {
  return a.length === b.length && a.every((value, index) => equal(value, b[index], exact));
}

function firstDifference(expected, actual, exact) {
  const length = Math.max(expected.length, actual.length);
  for (let index = 0; index < length; index += 1) {
    if (!equal(expected[index], actual[index], exact)) {
      return `index ${index}: expected ${expected[index]}, got ${actual[index]}`;
    }
  }
  return "no difference";
}

const bundle = JSON.parse(readFileSync(path.join(TREE, "bundle.json"), "utf8"));
if (bundle.abi !== 1) fail(`bundle ABI ${bundle.abi}, expected 1`);

// 1. The digests, in both directions: the sums file covers every file, and every
// kernel's wasm is the one `bundle.json` names.
const sums = readFileSync(path.join(TREE, "SHA256SUMS"), "utf8")
  .split("\n")
  .filter((line) => line.trim() !== "");
const seen = new Set();
for (const line of sums) {
  const [hash, relative] = line.trim().split(/\s+/);
  const absolute = path.join(TREE, relative);
  let bytes;
  try {
    bytes = readFileSync(absolute);
  } catch {
    fail(`SHA256SUMS names ${relative}, which is not there`);
    continue;
  }
  seen.add(relative);
  if (sha256(bytes) !== hash) fail(`${relative} does not match SHA256SUMS`);
}
for (const relative of walk(TREE)) {
  if (relative === "SHA256SUMS") continue;
  if (!seen.has(relative)) fail(`${relative} is not in SHA256SUMS`);
}

for (const entry of bundle.kernels) {
  const wasm = readFileSync(path.join(TREE, entry.id, "kernel.wasm"));
  if (sha256(wasm) !== entry.sha256) fail(`${entry.id}: kernel.wasm does not match bundle.json`);
  if (wasm.length !== entry.bytes) fail(`${entry.id}: ${wasm.length} bytes, bundle says ${entry.bytes}`);
  if (entry.bytes > RAW_BUDGET) fail(`${entry.id}: ${entry.bytes} bytes is over the ${RAW_BUDGET} budget`);
  if (entry.gzip > GZIP_BUDGET) fail(`${entry.id}: ${entry.gzip} gzip bytes is over the ${GZIP_BUDGET} budget`);
}

// 2. The ABI, through the same loader a figure imports.
let cases = 0;
let raw = 0;
let gzip = 0;
for (const entry of bundle.kernels) {
  const directory = path.join(TREE, entry.id);
  const manifest = JSON.parse(readFileSync(path.join(directory, "manifest.json"), "utf8"));
  const selftest = JSON.parse(readFileSync(path.join(directory, "selftest.json"), "utf8"));
  const exact = manifest.exact !== false;
  if (manifest.id !== entry.id) fail(`${entry.id}: manifest names ${manifest.id}`);

  for (const param of manifest.params) {
    if (manifest.params.indexOf(param) >= manifest.layout.blocks.params.size) {
      fail(`${entry.id}: parameter ${param.name} is outside the params block`);
    }
  }
  for (const output of manifest.outputs) {
    const block = manifest.layout.blocks[output.block];
    if (!block) {
      fail(`${entry.id}: output ${output.name} names no block`);
    } else if (output.offset + output.length > block.size) {
      fail(`${entry.id}: output ${output.name} runs past the ${output.block} block`);
    }
  }

  const module = await import(pathToFileURL(path.join(directory, "kernel.js")).href);
  const kernel = module.default;
  if (kernel.manifest.id !== entry.id) fail(`${entry.id}: the loaded module names another kernel`);

  for (const test of selftest.cases) {
    cases += 1;
    for (const [name, value] of Object.entries(test.params)) kernel.set(name, value);
    kernel.state.set(test.state);
    kernel.init();
    kernel.run(test.steps);
    if (kernel.status !== test.status) {
      fail(`${entry.id} / ${test.name}: status ${kernel.status} (${kernel.statusText()}), expected ${test.status}`);
    }
    if (!same(test.out, Array.from(kernel.out), exact)) {
      fail(`${entry.id} / ${test.name}: out differs at ${firstDifference(test.out, Array.from(kernel.out), exact)}`);
    }
    if (!same(test.diag, Array.from(kernel.diag), exact)) {
      fail(`${entry.id} / ${test.name}: diag differs at ${firstDifference(test.diag, Array.from(kernel.diag), exact)}`);
    }
  }
  raw += entry.bytes;
  gzip += entry.gzip;
}

function walk(directory, prefix = "") {
  const files = [];
  for (const name of readdirSync(directory).sort()) {
    const absolute = path.join(directory, name);
    const relative = prefix ? `${prefix}/${name}` : name;
    if (statSync(absolute).isDirectory()) files.push(...walk(absolute, relative));
    else files.push(relative);
  }
  return files;
}

if (failures > 0) {
  console.error(`solvers: ${failures} failure${failures === 1 ? "" : "s"}`);
  process.exit(1);
}

console.log(
  `solvers: ${bundle.kernels.length} kernels, ${cases} selftest cases, ` +
    `${(raw / 1024).toFixed(0)} kB wasm (${(gzip / 1024).toFixed(0)} kB gzip), all true`,
);
