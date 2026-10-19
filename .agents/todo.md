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

- [ ] 70. The gate is 17.5 minutes on four runners — one lever left, measured
- [ ] 83. §1.5's ladder is still the page's model — the package's compliant export
      carries one stiffness, and its kernel refuses to compile

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

---

## 70. The browser suite is 206 s; the gate's clock is the host's eight cores

**Three runs, measured 2026-10-18:**

| Run | Change | Job time | Wall clock |
|---|---|---|---|
| — | one matrix row per profile (13 rows) | 2601 s / 24 jobs | **26 min** |
| `39120728135` | `scripts/build-all.sh`: one job, 4 profiles at a time | 1599 s / 9 jobs | **16 min** |
| `39124299954` | two workers per job (`BUILD_JOBS=2`, `pytest -n 2`) | **1280 s / 8 jobs** | **17.5 min** |

Collapsing the matrix halved job time. **Reducing per-job parallelism lowered the sum and
left the critical path alone**, because the gate is two ~7-minute jobs that overlap —
`theme preview` 448 s, `banks, tests and voice` 441 s — and then `deploy` 344 s that cannot
start until the gate is green. `theme preview` is itself several concurrent browser checks
and already uses the whole machine, so tuning its workers was the wrong knob.

**Done since:**

- **The claim sweep rides the contrast walk.** `audit --claims <file>` sweeps each
  figure's controls in the pass it was already making, so the arithmetic is proved from
  the page the contrast check loaded. `readout` stays as a focused command (`--only`,
  `--self-test`); the gate runs five processes, not six, and the claims went **up** — 668
  across 37 figures, against 588 across 33.
  **The clock did not fall: 206 s against 194 s, and the reason is the useful part.** The
  readout's 106 s was mostly the *sweep* — six settings × 40 ms × 245 figures is 59 s of
  sleep before any control manipulation — not the page loads. Sharing the navigation
  removed work that was never the cost. Kept for the coverage and the one fewer process,
  not for a time it did not save.
- **`deploy` builds in parallel.** It walked the profiles one at a time, 82 s of the last
  job in the gate; `scripts/build-all.sh` does it in ~25 and is now the **one** build
  script — the `build` job, `deploy.sh` and `preview-themes.sh` all call it, where three
  copies of that loop used to live.

**The honest position.** The browser suite is 206 s on an idle machine, inside the
three-minute rule. The *gate* is 17 minutes because two ~7-minute jobs overlap on eight
cores and the deploy waits for both. The next lever is not another merge but **fewer
CPU-heavy things at once**: a runner dedicated to `theme preview`, or accepting that the
wall clock is bounded by the host rather than by the workflow.

**Done means**

- [x] `theme preview` is one command that walks each figure page once for paint, phone
  size and claims.
- [x] One build script, called by the build job, the deploy and the preview.
- [ ] The gate's wall clock is under 10 minutes on four runners, measured on a run.
- [ ] `.github/AGENTS.md`'s timing table records the numbers from the run that proves it.


## 83. §1.5's ladder is still the page's model — **open**

**What is wrong.** `books/numerical-methods`'s worked case and `Maths Applied` §1.5
quote a stiffness ladder (1.92°/1.94°/1.95° over the travel at 0.2/1/10/100 MN/m).
Those numbers come from the page's own equilibrium model. The package's compliant
export is vendored — `data/package/double-wishbone-compliant/out.js` — but it carries
**one** stiffness, and `otkd emit --format wasm` refuses it by name:

```
the WASM kernel cannot solve this model yet: it is 'equilibrium'; a compliant model
needs the equilibrium root-find, which is not compiled yet
```

The page says so in one sentence, which is the honest position, but it is not the
position the chapter's argument wants: a ladder generated from the export, checked
against the page's model, is two routes.

**The fix.** When the package can solve the compliant model, emit a study that sweeps
the stiffness (`study.yaml` already has the shape), vendor the export, and generate
§1.5's table from `sweep.frames[]` — then assert the page's model agrees with it to
the panel's rounding.

**Done means**

- [ ] `otkd emit examples/double-wishbone-compliant … --format wasm` succeeds, or the
      compliant study is emitted as a `js` export with a stiffness axis.
- [ ] §1.5's table is generated from the vendored export rather than typed.
- [ ] The page's model and the export agree to the rounding shown, and the panel says
      which is which.
- [ ] `grep -n "one stiffness" books/maths-applied/docs` prints nothing.
