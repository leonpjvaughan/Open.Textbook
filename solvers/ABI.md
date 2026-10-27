# The kernel ABI

**Version 1.** `solvers/ot-solve/src/abi.rs` is the implementation; this file is the
contract. A change to any sentence here is a change to the version.

A kernel is one WebAssembly module compiled from one Rust module. It owns a fixed
arena of `f64` slots, arranged in four named blocks, behind seven functions and the
memory they read. JavaScript writes the parameters and the initial state, calls
`init`, then `step` or `run`, and reads the outputs. Nothing is allocated, nothing is
returned by pointer, and a failure is a number rather than a trap.

## The arena

```
slots:  [ params | state | out | diag ]
        ^ offset 0, each block begins where the previous one ends
```

| block | what it holds | written by |
|---|---|---|
| `params` | one `f64` per declared parameter, in declaration order | JavaScript, before `init` |
| `state` | the kernel's working state; `state[0..cells]` is the caller's initial field | JavaScript, then the kernel |
| `out` | every array a figure draws, plus a copy of the current field | the kernel |
| `diag` | every scalar a figure reads: step count, norm, residual, status flags | the kernel |

Capacity is compile-time. A parameter such as `cells` chooses how much of a block is
used; it can never exceed the capacity the manifest declares. An arena never grows.

## The exports

| export | signature | meaning |
|---|---|---|
| `abi` | `() -> i32` | the ABI version; the loader refuses a mismatch |
| `arena` | `() -> i32` | the byte offset of the arena in linear memory |
| `slots` | `() -> i32` | how many `f64` the active kernel uses |
| `layout` | `() -> i32` | FNV-1a of the four block sizes; the loader compares it with the manifest |
| `init` | `() -> i32` | validate the parameters and reset the state |
| `step` | `() -> i32` | advance one step |
| `run` | `(i32) -> i32` | advance at most `n` steps, stopping at the first non-zero status |
| `memory` | `Memory` | the linear memory the views are made from |

That is eight rows: seven functions and one memory. No other export is part of the
contract. A kernel that needs one has outgrown the ABI, and that is a design
conversation.

## Status

| code | name | meaning |
|---|---|---|
| 0 | `Ok` | the step ran |
| 1 | `Unstable` | the scheme overflowed or stopped being representable |
| 2 | `NotConverged` | an iteration could not take its step (a zero derivative) |
| 3 | `BadParameter` | a parameter is outside its range or not finite |
| 4 | `NotInitialised` | `step` or `run` was called before `init` |

**A status is not a verdict on the method.** A diffusion scheme with `r > 1/2` is
unstable from its first step, but its answer is finite and the figure should draw it;
the page decides that from `r`, not from the kernel. `Unstable` is reserved for the
point where the numbers stop being usable. This distinction is why the label is the
kernel's ability to continue, not the mathematics' stability.

## The manifest

The build writes `manifest.json` from the Rust declaration. It is never edited.

```json
{
  "abi": 1,
  "exact": true,
  "id": "heat-explicit",
  "title": "...",
  "summary": "...",
  "capacity": { "cells": 256 },
  "layout": {
    "slots": 774,
    "hash": 3264,
    "blocks": {
      "params": { "offset": 0, "size": 2 },
      "state": { "offset": 2, "size": 512 },
      "out": { "offset": 514, "size": 256 },
      "diag": { "offset": 770, "size": 4 }
    }
  },
  "params": [
    { "name": "cells", "label": "Cells", "default": 64, "min": 4, "max": 256, "step": 1, "unit": "" }
  ],
  "outputs": [
    { "name": "u", "label": "Temperature", "block": "out", "offset": 0, "length": 256, "unit": "" },
    { "name": "norm", "label": "Largest |u|", "block": "diag", "offset": 1, "length": 1, "unit": "" }
  ],
  "selftest": "selftest.json"
}
```

`exact` says whether a native run and the wasm must agree **bit for bit**. It is true
for a kernel that uses only `+ - * / sqrt`; a kernel that calls `sin`, `exp` or
`atan2` sets it false, because the host libm and the wasm libm may differ in the last
bit. The selftest comparison uses `1e-12` relative tolerance for those.

Every number the page reads is named. A diagnostic is an output of length one in the
`diag` block; there is no hidden index a figure has to know.

## The selftest

The build runs each kernel's cases natively, captures the pre-`init` state and the
post-run outputs, and writes them to `selftest.json`. `scripts/check-solvers.mjs` loads
the generated module through the same loader a figure uses, replays every case, and
compares status, outputs and diagnostics. That catches the failures a Rust test cannot:
a stale artifact, a wrong offset, a wrong endianness, a broken base64 string.

## Determinism

No clock, no unseeded randomness, no threads. The same parameters produce the same
bits. A kernel that samples takes its seed from a parameter; two readers comparing what
they saw see the same sequence.

## Adding a kernel

1. `solvers/ot-solve/src/kernels/<name>.rs`: a `META`, an `init`, a `step`, and the
   selftest cases.
2. A feature of the same name in `solvers/ot-solve/Cargo.toml`.
3. A line in `solvers/ot-solve/src/kernels/mod.rs` and a feature arm in `lib.rs`.
4. `scripts/build-solvers.sh` and a figure. No browser code changes: the loader and the
   manifest already describe it.
5. `node scripts/check-solvers.mjs` and `scripts/build-solvers.sh --check`.
