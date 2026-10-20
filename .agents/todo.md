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
are checked against each other on every pass. One item is open, and it says which
single line is not met.

The *interactive-aid backlog* — which figures and interactions a book still wants —
is `ideas.md`. It is a plan rather than a defect list, and it is written for the
author choosing what to build next.

**Open, and the list is the index:**

- [ ] 83. §1.5's ladder is the page's model and the export's baseline is not the page's —
      the package has the joint, the axis and (in 0.7.0) the kernel; the open question
      is where the corner's other compliance lives

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

---

## 83. §1.5's ladder is the page's model, and the export's baseline is not the page's — **open, one decision**

**What is wrong.** `Maths Applied` §1.5 quotes a stiffness ladder (1.92°/1.94°/1.95° over the
travel at 0.2/1/10/100 MN/m) from the page's own equilibrium model. The ladder is the one place in
the chapter where two routes would be evidence, and it has only ever had one.

**The package's half is done.** `suspension-kinematics` 0.6.0 added the joint — `uca-up` with its
three translations compliant, a per-joint `modes:` override, no new kind — and a **stiffness axis**
on the study, so one model sweeps 0.2, 1, 10 and 100 MN/m in a single export of 164 frames.
Camber responds to it monotonically. 0.7.0 adds the compiled kernel for that model, which the
earlier one-free-direction equilibrium path refused.

**Measured 2026-10-20, on the 0.6.0 bundle**, reading `models/double-wishbone-ubj/out.js` the way a
page would. Rest is the frame at zero drive, 40 mm is wheel travel from there:

| stiffness | camber at rest | change over ±40 mm |
|---|---|---|
| 0.2 MN/m | 0.909° | 1.873° |
| 1 MN/m | 0.180° | 1.834° |
| 10 MN/m | 0.018° | 1.825° |
| 100 MN/m | 0.002° | 1.824° |

Two conventions to apply before comparing anything: the export's camber is **positive outboard**,
the opposite of §1.2, and its travel band is ±0.1 rad of the lower arm, which is +1 to +86 mm of
wheel travel because the loads push the corner into bump.

**The measurement, and a hypothesis that did not survive it.** The page's camber carries a static
−1.0° at the design position (`CAMBER0` in `mechanism.js`), and the export's is 0 there by
construction: that accounts for exactly one degree of the gap and is a convention, not a difference.

The rest is a model. With the page's own load case — one lateral 3 kN at the contact patch — the
package's bush deflects **2.508 mm** at 0.2 MN/m where the page's model says **6.8 mm**, and the
camber shift at rest is **0.308°** where the page's is **1.05°**. Softening the tie rod was the
first suspect — a front view has no tie rod, so the package's mechanism might be sharing the load
with it — and it is **ruled out**: at 1e-5 m/N the deflection moves from 2.508 to 2.561 mm, two per
cent, and the camber shift falls. So the page's model has something the package's has not, on the
page's side: the patch's position, or how `F x_P` distributes the force, is the place to look.

**The decision.** The package half is done and the export is the real 3D corner; the page's model is
a front-view idealisation. Two routes, and the second is now the better-evidenced one:

- **(a)** find the page's difference, change the example to match, and reproduce the page's ladder —
  but the example is the mechanism §1.2 and §1.4 already use, so this means altering what the
  chapter's other sections are built on;
- **(b)** §1.5 adopts the export's ladder and the page says what its own model idealises away. The
  gap is then the evidence for the section's thesis rather than a defect in it: two models of one
  corner, neither wrong, differing by exactly what the simpler one leaves out.

**Done means**

- [x] A compliant-ubj model in the package sweeps stiffness and its export reports the ladder.
- [ ] The decision above is taken and §1.5's table follows from it.
- [ ] §1.5's table is generated from the vendored export rather than typed, or a test asserts it
      against the export so a release that moves it fails.
- [ ] `grep -n "one stiffness" books/maths-applied/docs` prints nothing.
