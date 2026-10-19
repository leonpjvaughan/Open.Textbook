# The `suspension-kinematics` payload, vendored

Everything in this directory comes from https://github.com/leonpjvaughan/suspension-kinematics
and is copied here unchanged, so the page needs no build step, no network and no
Python. `tests/test_maths_applied_data.py` checks that what is here is what the
provenance records.

| path | what it is |
|---|---|
| `double-wishbone/out.js` | the package's committed export: `meta`, `sweep.frames[]`, `iterations[]`, `agreement` |
| `double-wishbone/kernel.js` | the generated solver, an ES module with the WebAssembly binary embedded as base64, so one import is all a page needs |
| `double-wishbone/kernel.wasm` | the same binary as a file, for provenance and for anyone who wants to inspect it |
| `double-wishbone/kernel.json` | the ABI: buffer layout, sizes, offsets, metric and point names |
| `double-wishbone/provenance.json` | generator version, rustc version, the sha256 of every source and of the binary |
| `double-wishbone/geometry.yaml` | the package's example geometry, unchanged |
| `double-wishbone/geometry.js` | that geometry as an ES module — generated from the YAML here, and `tests/test_maths_applied_data.py` fails if the two disagree |
| `double-wishbone-two-leg/out.js`, `double-wishbone-compliant/out.js`, `ride-height/out.js` | the other three exports, for the sections that quote them |

## How it was produced

```bash
git clone https://github.com/leonpjvaughan/suspension-kinematics
cd suspension-kinematics && uv sync && uv run pytest -q     # 71 passed
uv run otkd emit examples/double-wishbone out.js                 # the export
uv run otkd emit examples/double-wishbone kernel --format wasm   # kernel.{js,wasm,json}
```

`uv run otkd emit examples/double-wishbone-compliant … --format wasm` **refuses**, on
purpose: "the WASM kernel cannot solve this model yet: it is 'equilibrium'; a
compliant model needs the equilibrium root-find, which is not compiled yet". That is
why §1.5's compliant sweep still reads the page's own model, and it is recorded in
`.agents/todo.md` item 72 rather than worked around here.

## What the kernel is, and is not

It solves the **square Newton** path: as many equations as unknowns, for the rigid
mechanism. It is generated from the same sympy derivation as the package's Python
engine, and the package's own tests assert that its poses, Jacobian and metrics agree
with that engine exactly. It is not a second implementation written by hand, which is
the only kind of second implementation this book would trust.
