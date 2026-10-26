# The `ot-solve` bundle

Written by `scripts/build-solvers.sh` from `solvers/ot-solve`. Do not edit anything here:
change the Rust, run the script, and commit what it writes.

Every directory is one kernel, and every kernel is one wasm module:

- `kernel.wasm` — the artifact the digest names, for provenance and for a non-JS consumer;
- `kernel.js` — the module a figure imports; the wasm is inlined as base64;
- `manifest.json` — parameters, outputs, layout and capacity, generated from the Rust;
- `selftest.json` — inputs and expected outputs from the native run, replayed in Node.

`bundle.json` records the compiler, the ABI and each kernel's digest. `SHA256SUMS` covers
every file; `sha256sum -c SHA256SUMS` verifies the tree without a Rust toolchain.
