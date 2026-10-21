# The `otkd` bundle, vendored

Written by `scripts/vendor-otkd.sh`. Do not edit anything here: change `VERSION` in
that script, run it, and commit what it writes.

| | |
|---|---|
| generator | `otkd 0.8.0` |
| release | <https://github.com/leonpjvaughan/suspension-kinematics/releases/tag/0.8.0> |
| zip sha256 | `d113d77bdec802ad73eb2768b31e5ed8d4d1232d44016a50f24459d1f0d5caf4` |

`models/<name>/out.js` is the model's static payload (`meta`, `sweep.frames[]`,
`iterations[]`, `agreement`); `models/<name>/kernel/` is its solver — `kernel.js` is
self-contained, with the WebAssembly binary inlined, so one import is all a page needs.
`quarter-car` has neither: a dynamics study yields a trajectory, not a sweep, and the
manifest says so.

## The ground plane, and why the radius matters

The examples declare `tyre-radius: 0.200` with the wheel centre at `z = 0.32`, so the
ground is the tyre's lowest point at **`z = 0.12`**, not `z = 0`. The book adopts that
radius (`GEOMETRY.tyreRadius` in `mechanism.js`) and measures every height above the
ground from it, so §1.2's roll centre and the exported `rc` agree to **1 mm**. A page
that assumed a 0.32 m tyre on `z = 0` would report a roll centre 39 mm higher than the
payload's, which is what item 75 was about.

`scripts/vendor-otkd.sh --check` verifies every file against `SHA256SUMS`, offline.
