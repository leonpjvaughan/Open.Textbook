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
are checked against each other on every pass. One item is open, and it is a modelling decision
rather than a defect.

The *interactive-aid backlog* — which figures and interactions a book still wants —
is `ideas.md`. It is a plan rather than a defect list, and it is written for the
author choosing what to build next.

**Open, and the list is the index:**

- [ ] 87. §1.6's table can sweep stiffness but not force — the engine can now set a
      load at run time, and the quarter car carries none to set

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

---

---

---

## 87. §1.6's control moves stiffness; the engine can also move a force — **open, one decision**

**What is wrong.** The table under §1.6 changes the coil's stiffness and nothing else. A reader of a
section about *loads and masses* would reasonably expect to change the load, and the engine now
supports it: `suspension-kinematics` 0.10.0 gives a dynamics kernel a load buffer, and the kernel
agrees with the package's own Python integration at the study's load and at twice it, to `1e-8` m.

**Why the table cannot use it yet.** The quarter car carries no *study* load. Its load is gravity,
which is a property of the model rather than the study, so its kernel has no load slots at all. The
example is a chassis on a spring with no applied force, and §1.6's numbers — 212.8 mm of heave, the
0.006° agreement, the five peaks — are all derived from that.

**The decision.** Give the quarter car the corner's own load — 3.5 kN down and 1.8 kN sideways at
the wheel centre — and:

- §1.6's quoted numbers change, every one of them, because the equilibrium moves;
- `data/quarter-car/` is re-extracted, its digest and README updated, and the section re-derived;
- in exchange the table gains a second control, and the section can show the two effects side by
  side: stiffness changes the *period*, load changes where the corner *sits*.

**Done means**

- [ ] The decision is taken: the quarter car keeps gravity alone, or gains the corner's load.
- [ ] If it gains one: §1.6 re-derived, the trajectory re-vendored with its digest, and the table
      given a load control through `kernel.setLoads`.
- [ ] Either way the page says which loads its numbers were computed under.
