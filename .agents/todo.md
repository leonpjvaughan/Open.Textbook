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

- [ ] 83. §1.5's ladder is still the page's model — the compliant kernel exists, but
      the joint it softens is the tie rod; the request is with the package
- [ ] 85. §1.6's numbers depend on the package's quarter car, whose coil has no
      damper; the trajectory records its source digests, and a release must re-derive it

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

---

## 83. §1.5's ladder is still the page's model — **open, blocked on the joint**

**What is wrong.** `books/numerical-methods`'s worked case and `Maths Applied` §1.5
quote a stiffness ladder (1.92°/1.94°/1.95° over the travel at 0.2/1/10/100 MN/m).
Those numbers come from the page's own equilibrium model, and the ladder is the one
place in the chapter where two routes would be evidence.

**Measured 2026-10-19, on the 0.4.0 bundle.** The package does compile the compliant
model: `solver: "equilibrium"`, with two number slots — tie-rod length and tie-rod
compliance — settable at run time. The manifest lists kernels for all four kinematic
models.

**Correction, made after a second measurement.** An earlier version of this item said
the loads never reach the solve, because the design pose shows camber −0.0003° and toe
0.0094° and the export looks like the rigid curve. That was wrong. Sweeping the
compliance on the kernel shows the loads are compiled in — they move **toe**:

| tie-rod compliance | toe | camber |
|---|---|---|
| 10⁻⁶ m/N | 0.009° | −0.0003° |
| 10⁻⁴ m/N | 0.58° | −0.015° |
| 10⁻² m/N | 1.46° | −0.037° |

A hundred times softer moves the toe by 1.5° and the camber by 0.04°, because the tie rod
is the fore-aft link. So the single blocker is **the joint**: the package softens the tie
rod; §1.5 softens the upper ball joint. The section now uses the tie-rod sweep for exactly
what it teaches — *which joint you soften decides which angle moves* — and the ladder it
asks for is still the page's model.

**The request is with the package**, on branch `handoff/maths-site` of
`suspension-kinematics`, as `docs/handoff-from-maths-site.md`: a compliant upper joint, a
stiffness axis in the study, a dynamics pose export, and the SVD diagnosis in `out.js`,
each with its acceptance test.

**The fix.** When the handoff lands: a compliant `ubj`, a stiffness axis in the study, and
an export of the ladder; then generate §1.5's table from `sweep.frames[]` and assert the
page's model agrees to the panel's rounding.

**Done means**

- [ ] A compliant-ubj model in the package sweeps stiffness and its export reports the
      ladder.
- [ ] §1.5's table is generated from the vendored export rather than typed.
- [ ] The page's model and the export agree to the rounding shown, and the panel says
      which is which.
- [ ] `grep -n "one stiffness" books/maths-applied/docs` prints nothing.

## 85. §1.6 quotes a spring with no damper, and a release may add one — **open**

**What is wrong.** The book's §1.6 numbers (0 → 212.8 mm every 0.625 s, five identical peaks,
camber 0° to −9.53°) are a property of the quarter-car example's coil, which is
`modes: {length: spring}` — a spring with no damper. That is stated on the page and in the
data README, so it is not a claim about every quarter car. But it is a dependency on another
repository's example, and nothing fails if that example changes: the trajectory is vendored
separately from the `otkd` bundle (the bundle ships no payload for a dynamics study).

**The guard that exists.** `meta.sources` in `trajectory.js` records the sha256 of the three
config files the run used, and the README repeats them. A release that changes the quarter car
is detectable by re-extracting — but only by a person who thinks to look.

**The fix.** When a release changes the quarter car, re-run
`data/quarter-car/extract.py`, replace `trajectory.js`, update the README's digest, and
re-derive §1.6's table, figure and the 0.006° agreement. If the release ever vendors the
quarter-car sources (the manifest currently lists the model with "none (dynamics)"), add a
test that compares `meta.sources` against the vendored bytes.

**Done means**

- [ ] The package's quarter car is unchanged at the vendored version, or §1.6 is re-derived.
- [ ] If the sources are ever vendored, `tests/test_maths_applied_data.py` compares the
      trajectory's source digests with the bundle's files.
- [ ] §1.6's table and figure are regenerated together, never one without the other.
