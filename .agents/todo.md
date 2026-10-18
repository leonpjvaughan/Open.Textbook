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
are checked against each other on every pass. Six items are open, and two of
them say which single line is not met.

The *interactive-aid backlog* — which figures and interactions a book still wants —
is `ideas.md`. It is a plan rather than a defect list, and it is written for the
author choosing what to build next.

**Open, and the list is the index:**

- [ ] 61. A figure's readout can state false working — 588 claims, 0 untrue; only
      `--text` is left to settle
- [ ] 69. The generalisation review — rows 1–8 done, `quantity()` not built
- [ ] 70. The gate is 17.5 minutes on four runners — one lever left, measured
- [ ] 71. `tools/build.mjs` says the tools build is bundled, and it is not
- [ ] 72. Maths Applied's agreement panels read the page's model, not the solver's
      export — 6 `TODO(phase-a)` markers wait on `suspension-kinematics`
- [ ] 73. The chapter has no photograph of a real corner — the diagram is drawn
      instead, and the build can now ship one

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

---

## 61. A figure's readout can state false working — **done except `--text`**

**What is wrong.** Two of the fourteen figures added on 2026-10-17 printed a
calculation that does not produce the number printed beside it, and **every check
passed**: `tests/test_figures.py`, the build's math-error scan, `tools audit` and
`tools kit`. None of them reads a number.

- `interest-growth` printed `€1,500.00 × 0.07 × 4 = €390.00`. The rate is 6.5%, so
  the multiplier is 0.065; `fmt(r, 2)` rounded it to 0.07, and 1500 × 0.07 × 4 is
  €420.
- `ratio-share` printed `3 × 14.29 = 42.86` where 100 ÷ 7 was already rounded.

**The first fix was wrong, and how it was wrong is the lesson.** It parsed the
printed sentence back out of the text, and by the end it needed `<sup>`, `√`, `%`,
thousands separators, a trailing sentence period and the words "and"/"is" to read
**43%** of what it saw. Every new formatting choice was a new case; every new figure
was a new chance to be silently unreadable.

**Done (the mechanism, 2026-10-17).** An assertion is data. `panel()` returns
`claim`; a figure calls `claim([{ expression, values, answer, shown }])` once per
redraw; `python -m textbook.working` proves each with the same exact CAS the banks
use (`cas._rationalize` makes 0.065 `13/200`, so there is no tolerance to tune) and
requires the readout to contain the claimed string. `tools readout site --verify` is
in `scripts/preview-themes.sh`. Verified against the defect itself: reintroducing
`fmt(r, 2)` while claiming `fmt(r, 3)` fails with *"claims to show '0.065', but the
readout does not contain it"*. Three figures converted — `interest-growth`,
`ratio-share`, `restitution` — with the `√` case proving no notation table is needed.
The text heuristic survives only as `--text`, and is documented as a hint.

**Done (2026-10-18).** `tools readout` reports **0 figures that state arithmetic and
declare none** — 33 figures declare **588 claims**, and `readout site --verify` proves
all 588 with SymPy: **0 untrue**. The command now names any remaining figure rather than
only counting them, because a count says the gap exists and a list says where.

**Done means**

- `node tools/dist/cli.js readout site` reports **0** figures that state arithmetic
  and declare none (35 remain, measured 2026-10-17).
- Every remaining figure declares its printed numbers, not only its totals.
- [ ] `--text` is deleted, because nothing depends on the heuristic. **Not met:** the
      flag still ships, documented as a hint (`tools/AGENTS.md`); nothing depends on it,
      and `readout site` reports 0 without it. Either delete the heuristic or replace
      this line with the measurement that it is unused — the other two are proved.

---
## 69. The generalisation review — **rows 1–8 done; `quantity()` is not built**

**Why this is an item.** An architecture review applied one test to each candidate:
*is this the same thing written twice, or two different things that look alike?* Only
the first is worth generalising — `scaffold.PAGE_KINDS` exists because "there were four
places that had to agree and no test between them", and `DECISIONS.md` rejects the
other direction ("a framework for 177 bespoke diagrams would be a framework around
nothing"). These are the first kind.

| # | Where | The repeat | State |
|---|---|---|---|
| 1 | `config.from_parts` | six test files hand-wrote the hook config; two had already drifted — one wrote `tier_filter` (`"H"`) where production writes a profile **id**, and none carried the proof book | **done 2026-10-17** |
| 2 | `themes.contrast_problems` | five near-identical loops; only one resolved its alias, and its comment records that forgetting it makes "a check that cannot fail" | **done 2026-10-17** |
| 3 | `tools` flag schema | `cli.ts` documents flags in a `usage` string and each command parses its own; `audit` accepts `--maps` that `help` does not mention, and `readout`/`preview` re-implement `parseArgs` | open |
| 4 | tests: no `conftest.py` | `_problem` ×3, `_write` ×2, two hand-written JS brace-counters | **done** — `tests/conftest.py` + `tests/support.py`. The two `colour_literals` and the two brace helpers turned out to be **different scanners** and say so in their docstrings |
| 5 | `kit.ts` / `kit-pure.ts` | two hand-written lists of one contract: 54 and 43 `want()` calls, 13 verbatim in both, 28 in only one tier | **done** — `tools/src/lib/kit-contract.ts`, **129 rows** over three tiers, **all 51 exports** covered; a row whose tier no runner reads now fails |
| 6 | `units.py` | the same tolerance parse ×4 and seven hand-written compare-and-report pairs in three sentence shapes | **done** |
| 7 | `pipeline.copy_assets` | five bespoke blocks in a 153-line, 23-branch function | **done** — entries of `(predicate, sources, destination)`; generated output byte-identical |
| 8 | `scaffold` stubs | five stub builders share one preamble | **done** — `stub_page`; generated output byte-identical |

**Measured, so the size is not a guess:** 201 of 250 figure modules hand-write
`<line>`/`<rect>`/`<path>`/`<polygon>`, 47 hand-roll a domain→pixel mapping, and 76
format a number with its unit by hand because the kit has `fmt`/`sigfig`/`signed` and
**no `quantity(value, unit)`**. The kit's own history says this is worth doing — "the
same five drawings re-earned two hundred times" — and the gap is adoption plus that one
missing helper.

**What must NOT be generalised**, recorded so a later pass does not try: the 173
`update()` bodies (the same signature, and the body *is* the mathematics), the
near-duplicate figures across books (`DECISIONS.md` settled that they teach different
readers), and `innerHTML` markup with per-module `toFixed` (`reuse-audit.md` §3.4).

**Done means**

- [x] 1 and 2, each with the test that keeps it: the keys cannot drift, and every
  declared threshold resolves to a token and can fail.
- [x] 3–8 converted, each with a check that fails if the copy returns. **Done
      2026-10-18:** 3 is `tools/src/lib/flags.ts` and `tools help --check`; 5 is
      `tools/src/lib/kit-contract.ts` (129 rows, all 51 exports); 4, 6, 7 and 8 were
      done on 2026-10-17.
- [ ] `quantity()` exists and the number-with-unit count falls from 76.

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

## 71. `tools/build.mjs` says the tools build is bundled, and it is not

**What is wrong.** The header of `tools/build.mjs` describes the tools target as
"Bundled, because it is a program rather than a library". It is not: `buildTools` runs
`tsc -p tsconfig.tools.json`, which emits one file per source into `tools/dist/` —
`dist/commands/kit.js`, `dist/lib/browser.js`, and so on. Measured 2026-10-18: `ls
tools/dist/lib` prints seven files, and adding a module to `tools/src/lib/` adds a
seventh to `dist/lib/`.

It stopped being a cosmetic error when `tools kit` began serving
`tools/dist/lib/kit-contract.js` to the page at `/__kit-contract.js`. That works only
because the module is emitted as its own file with no runtime imports; a bundle would
have to be split or copied to be reachable from the page again.

**The fix.** Correct the comment to describe what `buildTools` does, and record why one
file per source is worth keeping: a module in `tools/lib/` can be imported by the page
under test, which a bundle cannot.

**Done means**

- [ ] the header of `tools/build.mjs` describes both targets truthfully.

## 72. Maths Applied's agreement panels read the page's model, not the solver's export

**What is wrong.** `books/maths-applied` was written against a solver repository
that has a specification and no code yet. Four section pages, the Review and the
book's own `AGENTS.md` carry a `TODO(phase-a)` marker — measured 2026-10-18:

```
grep -rn "TODO(phase-a)" books/maths-applied/docs/ | wc -l   # 6, across 5 pages
```

Each marker stands where a number should come from
`examples/*/out.js` in [`suspension-kinematics`](https://github.com/leonpjvaughan/suspension-kinematics):
`agreement.max_abs_diff` for §1.2, `iterations[].{residual,singular_values}` for
§1.3, the null-space basis and dependent row indices from `svd_diagnose` for §1.4,
and the compliant sweep's stiffness ladder for §1.5. Until those exist, each panel
prints what the page's own front-view model computes, which is honest and is
labelled as such — but it is one route to the number, and the chapter's argument is
that two routes are evidence.

`docs/assets/data/` currently holds `mechanism.js`: the page's model, shared by the
figures so the hero's camber curve and the agreement figure's cannot drift apart.
The pipeline now copies `docs/assets/data/` (row added for this book), so the
exported modules have a home the moment they exist.

**The fix.** Execute `HANDOFF.md` in `suspension-kinematics` — the spec, the four
load-bearing tests, and ten open questions the author must answer — then export the
three examples into `books/maths-applied/docs/assets/data/` and swap each panel to
read the exported object. Keep `mechanism.js`: it becomes the *second* route, which
is what makes the panel a check rather than a printout.

The fifth section's pseudocode is checked by nothing yet either, and the brief asks
for a light guard: a test that the names a page's pseudocode uses exist in the module
the page links to — not that the text matches, which would defeat the point of
pseudocode. It cannot be written until there is a module to read.

**Done means**

- [ ] `suspension-kinematics` passes its four acceptance tests, and its `out.js`
      files are committed and byte-reproducible.
- [ ] `grep -rn "TODO(phase-a)" books/maths-applied/` prints nothing.
- [ ] Every agreement panel reads `agreement`, `iterations` or the compliant sweep
      from `docs/assets/data/`, and none types a number.
- [ ] §1.5's ladder test asserts monotone convergence in the solver's own suite, and
      the page's table is generated from it.
- [ ] The two routes agree: the page's model and the exported sweep differ by less
      than the panel's rounding, and the panel says so.

## 73. The chapter has no photograph of a real corner

**What is wrong.** The book was asked for a free-licence reference photograph of a
double wishbone above the hero, CC0 or CC BY-SA, free of trade dress and sponsor
livery. No clean one was found offline, so §1.1 draws a labelled anatomy diagram
instead — which the brief allows, and which is arguably the better teaching object,
since it names the parts. But the reader never sees the object the chapter is
about, and the drawn diagram cannot show how small the linkage is against a car.

The build now copies a book's `docs/assets/images/` (there was no such row before,
so no photograph of any kind could have shipped), and `sources.yaml` records what a
photograph would need: `url`, `retrieved`, `role`, and a credit line in the caption.

**The fix.** Find one CC0 or CC BY-SA photograph of a double wishbone corner with no
livery, put it in `books/maths-applied/docs/assets/images/`, add it to `sources.yaml`
with `attribution: false` unless the licence requires a link, and credit it in the
caption. If none is clean, say so in `sources.yaml` and leave the diagram.

**Done means**

- [ ] The licence is CC0 or CC BY-SA, and the file records where it came from and
      when.
- [ ] Nothing in the frame is a team's livery, badge or championship branding.
- [ ] The caption credits the photographer, and `sources.yaml` names the licence.
- [ ] The image is in the built page (not a hotlink) and needs no network.
