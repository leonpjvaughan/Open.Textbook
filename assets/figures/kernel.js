/**
 * The shared loader for a generated `ot-solve` kernel module.
 *
 * A generated module (`assets/data/solvers/<id>/kernel.js`) is data: a manifest and
 * the wasm as base64. It calls `define` once, at module evaluation, and exports the
 * result. Because the generated module uses top-level await, a figure imports a
 * *value* rather than a promise, and the figure loader's own `await import(...)`
 * already waits for it.
 *
 * The contract is in `solvers/ABI.md`. The loader's job is to refuse a wasm whose
 * ABI, slot count or layout digest does not match the manifest beside it, then to
 * expose the four blocks as typed arrays. It never allocates in the wasm: the arena
 * is fixed at compile time.
 */

/** The status codes, in the order `solvers/ot-solve/src/abi.rs` declares them. */
const STATUS = [
  "ok",
  "unstable: the scheme passed its stability limit",
  "not converged",
  "bad parameter",
  "not initialised",
];

/**
 * Decode the base64 string a generated module carries.
 * @param {string} base64
 */
function bytes(base64) {
  const binary = atob(base64);
  const out = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    out[index] = binary.charCodeAt(index);
  }
  return out;
}

/**
 * Instantiate a generated kernel.
 *
 * @param {any} manifest the manifest the build wrote
 * @param {string} base64 the wasm bytes, base64-encoded
 * @returns {Promise<Kernel>}
 */
export async function define(manifest, base64) {
  const module = await WebAssembly.instantiate(bytes(base64), {});
  const instance = module.instance;
  const exports = /** @type {any} */ (instance.exports);
  const name = manifest.id;

  const fail = (/** @type {string} */ what) => {
    throw new Error(`${name}: the wasm and the manifest disagree about ${what}`);
  };
  if ((exports.abi() >>> 0) !== manifest.abi) fail("the ABI version");
  if ((exports.slots() >>> 0) !== manifest.layout.slots) fail("the slot count");
  if ((exports.layout() >>> 0) !== manifest.layout.hash) fail("the layout");
  if (!(exports.memory instanceof WebAssembly.Memory)) fail("the memory export");

  const base = exports.arena() >>> 0;
  if (base + manifest.layout.slots * 8 > exports.memory.buffer.byteLength) {
    fail("the arena's size");
  }

  return new Kernel(manifest, exports, base);
}

/** One instantiated kernel, with its four blocks as `Float64Array` views. */
export class Kernel {
  /**
   * @param {any} manifest
   * @param {any} exports
   * @param {number} base
   */
  constructor(manifest, exports, base) {
    this.manifest = manifest;
    this.exports = exports;
    this.base = base;
    this.status = 0;
    this.params = this.#view("params");
    this.state = this.#view("state");
    this.out = this.#view("out");
    this.diag = this.#view("diag");
  }

  /** @param {string} block */
  #view(block) {
    const layout = this.manifest.layout.blocks[block];
    if (!layout) throw new Error(`${this.manifest.id}: no ${block} block`);
    return new Float64Array(
      this.exports.memory.buffer,
      this.base + layout.offset * 8,
      layout.size,
    );
  }

  /**
   * The index of a parameter, or an error that names the kernel and the name.
   * @param {string} name
   */
  index(name) {
    const index = this.manifest.params.findIndex((/** @type {any} */ param) => param.name === name);
    if (index < 0) throw new Error(`${this.manifest.id}: no parameter '${name}'`);
    return index;
  }

  /**
   * Write one parameter by name.
   * @param {string} name
   * @param {number} value
   */
  set(name, value) {
    this.params[this.index(name)] = value;
  }

  /**
   * Read one parameter by name.
   * @param {string} name
   */
  get(name) {
    return this.params[this.index(name)];
  }

  /** Validate the parameters and reset the state. Returns the status code. */
  init() {
    this.status = this.exports.init() | 0;
    return this.status;
  }

  /** Advance one step. Returns the status code. */
  step() {
    this.status = this.exports.step() | 0;
    return this.status;
  }

  /**
   * Advance at most `n` steps, stopping at the first non-zero status.
   * @param {number} n
   */
  run(n) {
    this.status = this.exports.run(n) | 0;
    return this.status;
  }

  /**
   * One output array, by name, as a copy.
   * @param {string} name
   */
  output(name) {
    const output = this.manifest.outputs.find((/** @type {any} */ entry) => entry.name === name);
    if (!output) throw new Error(`${this.manifest.id}: no output '${name}'`);
    const block = this.manifest.layout.blocks[output.block];
    return Array.from(
      new Float64Array(
        this.exports.memory.buffer,
        this.base + (block.offset + output.offset) * 8,
        output.length,
      ),
    );
  }

  /**
   * One scalar output by name. Diagnostics are outputs of length one.
   * @param {string} name
   */
  scalar(name) {
    return this.output(name)[0];
  }

  /**
   * A parameter's declared range, for building a control.
   * @param {string} name
   */
  spec(name) {
    return this.manifest.params[this.index(name)];
  }

  /** The status's human sentence, for a readout. */
  statusText() {
    return STATUS[this.status] || `unknown status ${this.status}`;
  }
}
