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
are checked against each other on every pass. One item is open and it says what it
waits on.

The *interactive-aid backlog* — which figures and interactions a book still wants —
is `ideas.md`. It is a plan rather than a defect list, and it is written for the
author choosing what to build next.

**Open, and the list is the index:**

- [ ] 86. §1.6 could tabulate the engine's answer under a control — the kernel it needs
      now exists, so the free value is the coil's compliance and the numbers are a table

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

---

---

## 86. §1.6 shows one trajectory; the engine can show a family — **open, needs a page**

**What is wrong.** §1.6 quotes one run. The section's own point is that a damper or a stiffness
changes the motion, and a reader cannot see that from a single curve of numbers.

**What makes it possible now.** `suspension-kinematics` 0.8.0 compiles an **integrator** for a
dynamics study, and the vendored `models/quarter-car/kernel/` is one: `solver: "dynamics"`, the
coil's compliance as a run-time **number slot**, and `integrate(steps)` filling a trajectory buffer
that `trajectory()` and `velocities()` read. So a page can re-run the engine rather than replay a
recording.

**What a table would need.** No figure machinery: a control writes one number
(`setGeometry({ numbers })` on the coil's compliance slot), `integrate(steps)` runs, and the table
shows what came out — peak heave, the period, the energy drift the kernel reports, the camber at a
chosen instant. Three or four free values would sit in a row.

**Done means**

- [ ] A §1.6 table whose numbers come from the vendored kernel, with the free value named on the
      page and the run's energy drift printed beside it.
- [ ] A browser check that the table agrees with the kernel — the `claim()` pattern the other
      figures use — so a release that changes the integrator fails rather than drifts.
- [ ] The page says the coil has no damper, so what the slider changes is stiffness, not damping.
