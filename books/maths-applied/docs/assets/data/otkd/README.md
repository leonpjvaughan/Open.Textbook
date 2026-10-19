# The `otkd` bundle, vendored

Written by `scripts/vendor-otkd.sh`. Do not edit anything here: change `VERSION` in
that script, run it, and commit what it writes.

| | |
|---|---|
| generator | `otkd 0.4.0` |
| release | <https://github.com/leonpjvaughan/suspension-kinematics/releases/tag/0.4.0> |
| zip sha256 | `4bcd68886092c4fd0aa3218967d091e4700f9e3bcaa4b7b80adf3fdacae08959` |

`models/<name>/out.js` is the model's static payload (`meta`, `sweep.frames[]`,
`iterations[]`, `agreement`); `models/<name>/kernel/` is its solver — `kernel.js` is
self-contained, with the WebAssembly binary inlined, so one import is all a page needs.
`quarter-car` has neither: a dynamics study yields a trajectory, not a sweep, and the
manifest says so.

## One known disagreement with the book

The examples declare `tyre-radius: 0.200` while the wheel centre sits at `z = 0.32`, so
the exported contact patch is 120 mm above the ground and the exported roll centre is
**39 mm lower** than §1.2's front view, which uses a 0.32 m tyre standing on `z = 0`.
Camber and toe are unaffected — that is why §1.2's panel compares them and is sound —
but **do not plot `rc` from this bundle beside the chapter's table**. Tracked in
`.agents/todo.md` item 75; the fix is in the package's example geometry, not here.

`scripts/vendor-otkd.sh --check` verifies every file against `SHA256SUMS`, offline.
