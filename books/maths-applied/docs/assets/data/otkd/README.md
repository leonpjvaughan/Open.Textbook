# The `otkd` bundle, built here

Written by `scripts/build-otkd.sh` from `solvers/otkd`. Do not edit anything here:
change the source in `solvers/otkd`, run the script, and commit what it writes.

| | |
|---|---|
| generator | `otkd 26.299.0` |
| source | `solvers/otkd` in this repository |
| rustc | `rustc 1.99.1 (58cf8f9c3 2026-10-13)` |

`models/<name>/out.js` is the model's static payload (`meta`, `sweep.frames[]`,
`iterations[]`, `agreement`); `models/<name>/kernel/` is its solver — `kernel.js` is
self-contained, with the WebAssembly binary inlined, so one import is all a page needs.
`quarter-car` has no payload: a dynamics study yields a trajectory, not a sweep, and
the manifest says so.

## The ground plane, and why the radius matters

The examples declare `tyre-radius: 0.200` with the wheel centre at `z = 0.32`, so the
ground is the tyre's lowest point at **`z = 0.12`**, not `z = 0`. The book adopts that
radius (`GEOMETRY.tyreRadius` in `mechanism.js`) and measures every height above the
ground from it, so §1.2's roll centre and the exported `rc` agree to **1 mm**. A page
that assumed a 0.32 m tyre on `z = 0` would report a roll centre 39 mm higher than the
payload's, which is what item 75 was about.

`scripts/build-otkd.sh --verify` verifies every file against `SHA256SUMS`, offline.
