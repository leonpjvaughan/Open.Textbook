# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

**This file holds open items only.** `.agents/todo-closed.md` holds every closed
one **in full** — the diagnosis is the valuable part: what was wrong, how it was
measured and what fixed it. A one-line summary keeps the number and deletes the
reasoning, so nothing is compressed on the way across and nothing is deleted.

**An item is here because it is still true.** Before closing one, run its own
done-means; an item whose heading says done and whose checklist does not is the
failure this file has had twice, so the list below, the headings and the boxes
are checked against each other on every pass. Two items are open, and two of them
say which single line is not met.

The *interactive-aid backlog* — which figures and interactions a book still wants —
is `ideas.md`. It is a plan rather than a defect list, and it is written for the
author choosing what to build next.

**Open, and the list is the index:**

- [ ] 75. The solver's example declares a 0.2 m tyre on a 0.32 m wheel centre, so the
      roll centre it exports is 39 mm low — camber is unaffected, which is why §1.2's
      panel is sound
- [ ] 83. §1.5's ladder is still the page's model — 0.4.0 compiles an equilibrium
      kernel, but its compliance is the tie rod and the loads never reach the solve
- [ ] 84. §1.6 can now be written — 0.4.0 ships the quarter-car model, and the
      section is still a draft with no numbers

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

---

## 83. §1.5's ladder is still the page's model — **open, half unblocked by 0.4.0**

**What is wrong.** `books/numerical-methods`'s worked case and `Maths Applied` §1.5
quote a stiffness ladder (1.92°/1.94°/1.95° over the travel at 0.2/1/10/100 MN/m).
Those numbers come from the page's own equilibrium model, and the ladder is the one
place in the chapter where two routes would be evidence.

**Measured 2026-10-19, on the 0.4.0 bundle.** The package now **does** compile the
compliant model: `otkd emit examples/double-wishbone-compliant --format wasm` writes a
kernel with `solver: "equilibrium"` and two number slots —
`[{kind: "length", joint: "tie-rod"}, {kind: "compliance", joint: "tie-rod",
component: "length"}]` — so a page can set a compliance at run time. The manifest lists
kernels for all four kinematic models.

**Why the ladder still cannot come from it.** Two independent reasons, both measured:

- **The compliance is in the wrong place.** The package's compliant example softens the
  **tie rod**; §1.5 softens the **upper ball joint**, and asks how stiff that bush must
  be. Different joint, different curve, and the ladder is a statement about the second.
- **The load does not reach the solve.** At the design position the compliant export
  reports camber **−0.0003°** and toe **0.0094°**, and its camber change over the sweep
  is **−2.028°** against the rigid model's −2.029° — the compliant export is the rigid
  curve. The study's two loads (3500 N down, 1800 N lateral) do not appear in
  `kernel.rs`, so the equilibrium kernel solves unloaded.

So the page's sentence stands: the table is the page's model, and it says so.

**The fix, when the package can express it.** A compliant joint (`ubj`) in the
topology, a stiffness axis in the study, and loads compiled into the kernel; then emit
a ladder, vendor it, and generate §1.5's table from `sweep.frames[]` while asserting
the page's model agrees to the panel's rounding.

**Done means**

- [ ] A compliant-ubj model in the package sweeps stiffness and its export reports the
      ladder.
- [ ] §1.5's table is generated from the vendored export rather than typed.
- [ ] The page's model and the export agree to the rounding shown, and the panel says
      which is which.
- [ ] `grep -n "one stiffness" books/maths-applied/docs` prints nothing.
## 75. The solver's example declares a 0.2 m tyre on a 0.32 m wheel centre, so its roll centre is 39 mm low

**What is wrong.** `suspension-kinematics`'s example geometry has the wheel centre at
`z = 0.320` and `tyre-radius: 0.200`, so its contact patch lands at `z = 0.120` and every
height it reports is measured from a plane 120 mm below the one the car stands on. The
page's vendored copy inherits it. Measured 2026-10-19 on
`examples/double-wishbone/out.js`, frame 40 (design):

```
contact  [0.81, 0.12]        the tyre's lowest point, 120 mm above z = 0
ic       [-1.6223, 0.1755]
rc       [0, 0.138488]       so 18.5 mm above the contact patch, not 138 mm
```

The book's front-view model uses `tyre-radius: 0.320`, because its drawing stands the
tyre on `z = 0`. The two agree about the instant centre to about 2 cm, and about camber
and toe exactly (which is what §1.2's panel compares, and why that panel is sound). They
disagree about the roll centre:

| | book's front view | the package |
|---|---|---|
| tyre radius | 0.320 | 0.200 |
| contact patch | `[0.76, 0.00]` | `[0.81, 0.12]` |
| roll centre above the contact patch | 57 mm | 18 mm |

A secondary point, measured on the same frame: `outputs.py::_contact` takes the wheel
centre as the midpoint of the two axle points, so with the axle given as `[wc, wco]` the
patch is 50 mm outboard of `wc` (`contact[0]` is 0.81, not 0.76). Its effect on the roll
centre is about 1 mm — cosmetic next to the radius, but it means `contact[0]` is not the
wheel centre's lateral position.

**Why it is here rather than in the package's tracker.** That repository has issues
switched off; its own queue is `docs/follow-ups.md` there. The vendored
`books/maths-applied/docs/assets/data/otkd/README.md` states the disagreement and the
numbers, so nobody plots `rc` from the payload beside the chapter's table.

**Measured on 0.4.0 (2026-10-19): unchanged.** Both kinematic examples still declare
`tyre-radius: 0.200`, the design contact patch is `[0.81, 0.12]`, and the exported roll
centre is `0.1385` — 138 mm, against the page's 57 mm. The bundle's kernel carries the
same numbers, so the fix is upstream as described, not in the vendoring.

**The fix.** In the package, declare `tyre-radius: 0.320` in the examples — the contact
patch moves to `z = 0` and the roll centre to 57 mm, and every output then agrees with the
page. Failing that, document that `tyre-radius` defines the ground plane. Then re-vendor
the four exports and re-run the payload tests here.

**Done means**

- [ ] The example's `tyre-radius` and wheel-centre height agree about the wheel, and the
      package's own tests pin the contact patch's `z`.
- [ ] Re-vendored `out.js` gives a roll centre within 2 mm of the page's front view, and
      `package/README.md` says so instead of explaining a 39 mm gap.
- [ ] A book figure may plot `rc` from the payload, and §1.2's panel gains that row.

## 84. §1.6 can now be written — the quarter-car model exists — **open**

**What changed.** `suspension-kinematics` 0.4.0 ships `examples/quarter-car`: a dynamics
study (`analysis: dynamics`, 0.5 s, 101 steps) over topology, geometry and a study.
`otkd solve examples/quarter-car --json` prints the trajectory, and the bundle's
manifest records why it has neither payload nor kernel — *"none (dynamics)"*.

§1.6 is drafted and stops rather than pretending, because the model it describes did
not exist. It does now, in the package, with its own tests (`docs/dynamics.md`,
"dynamics v2.2 and the velocity-product fix" is the 0.4.0 headline).

**The fix.** Solve the quarter-car study, vendor the trajectory (the bundle does not
carry it — it is `otkd solve --json` output, so each vendoring records how it was
produced), and write §1.6's numbers from it: the transient camber during a bump, the
natural frequencies, and the limit test the section already promises — with the masses
taken to zero, the dynamic model must settle to §1.2's quasi-static sweep, in the
limit rather than close to it. The quarter-car's camber is relative and signed the
package's way; §1.2's convention note applies.

**Done means**

- [ ] The quarter-car trajectory is vendored with its provenance (the command, the
      version, the digest of the output).
- [ ] §1.6's "Draft" banner is replaced by numbers, and every one of them comes from
      the trajectory.
- [ ] The limit test is asserted in the package's suite, or in this repository if the
      package's suite cannot express it.
- [ ] A figure shows the transient, and `audit`/`readout` pass on it.
- [ ] Item 83's note and §1.6's text no longer say the model has not been built.
