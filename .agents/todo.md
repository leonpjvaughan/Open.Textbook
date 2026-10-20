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

- [ ] 83. §1.5's ladder and the export's are different experiments — the package has the
      joint, the axis and (in 0.7.0) the kernel; the open question is which load case,
      and whether the figure is driven by the engine's own kernel

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

---

## 83. §1.5's ladder and the export's are different experiments — **open, one decision**

**What is wrong.** §1.5 quotes a stiffness ladder (1.92°/1.94°/1.95° over the travel, 6.8/1.37/0.14/0.014 mm of bush deflection at 0.2/1/10/100 MN/m) from the page's own front-view model, and the
ladder is the one place in the chapter where two routes would be evidence. The package now has the
route — `double-wishbone-ubj` sweeps that joint in one export, and 0.7.0 ships its compiled kernel —
so the question is no longer whether the export can produce a ladder, but *which experiment* the
ladder is about.

**Measured 2026-10-20, 0.7.0.** The two models disagree by a factor of **2.7** on the same load.
The page's table agrees with the export to about ten per cent only because the two carry **different
loads**:

| load case | 0.2 MN/m | 1 MN/m | 10 MN/m | 100 MN/m | bush deflection |
|---|---|---|---|---|---|
| the page's model, 3 kN lateral at the patch | 6.8 mm | 1.37 mm | 0.14 mm | 0.014 mm | its own table |
| the **export**, 3 kN lateral at the patch | 2.51 mm | 0.50 mm | 0.050 mm | 0.005 mm | same load, 2.7× smaller |
| the **export**, the example's own load: 1.8 kN lateral **and 3.5 kN down** at the wheel centre | 6.14 mm | 1.22 mm | 0.12 mm | 0.012 mm | a different experiment |

So a table generated from the export as it stands would silently change the *experiment*, not just
the numbers. Two earlier attempts at this item are withdrawn: the "baseline gap" reading (the static
`CAMBER0` accounts for exactly one degree and is a convention) and the "structural 2.7× unexplained"
reading (it is explained — the front view has no fore-aft structure, so the three-dimensional
mechanism's tie rod and spherical lower joint share the load; softening the tie rod does not
reproduce the front view because a rigid constraint removes a direction rather than adding a spring).

**The decision, and a recommendation.** The section has one slider, one table and one load case to
choose, and the page's figure and the package should not be two experiments:

- **(a) the page's load case** — re-run the example with 3 kN lateral at the patch, and §1.5's table
  becomes 2.51/0.50/0.050/0.005 mm with the camber column moved with it. The page's own figure then
  disagrees with its own table by 2.7× unless the figure changes too.
- **(b) the engine's model, and the figure driven by it.** The bundle now ships
  `double-wishbone-ubj/kernel/kernel.js`, and that kernel takes the bush's compliance as a run-time
  **number slot** — the same pattern `kernel-camber.js` already uses for the rigid kernel. The
  slider can drive the engine, the table can be generated from the same payload, and the page's
  front-view model becomes what it is: the idealisation whose cost the section can then *measure*
  (2.7×), which is the section's own thesis.

(b) is the recommendation: it removes the second model rather than reconciling it, and it keeps the
chapter's comparison — idealisation against engine — as evidence instead of as drift.

**Done means**

- [x] A compliant-ubj model in the package sweeps stiffness, and its kernel ships in the bundle.
- [ ] The load case is decided, and §1.5's figure, table and text use one experiment.
- [ ] The table is generated from the vendored export (or a test binds it to the payload) so a
      release that moves the ladder fails here.
- [ ] `grep -n "one stiffness" books/maths-applied/docs` prints nothing.
