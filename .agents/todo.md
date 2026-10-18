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
are checked against each other on every pass. Four items are open, and two of
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
## 70. The gate is 17.5 minutes on four runners — one lever left, measured

**Three runs, measured on 2026-10-18:**

| Run | Change | Job time | Wall clock |
|---|---|---|---|
| — | one matrix row per profile (13 rows) | 2601 s / 24 jobs | **26 min** |
| `39120728135` | `scripts/build-all.sh`: one job, 4 profiles at a time | 1599 s / 9 jobs | **16 min** |
| `39124299954` | two workers per job (`BUILD_JOBS=2`, `pytest -n 2`) | **1280 s / 8 jobs** | **17.5 min** |

**The build collapse was right and halved job time. The worker reduction did not help the
wall clock**, and the numbers say why: it is now two ~7.4-minute jobs —
`theme preview` 448 s and `banks, tests and voice` 441 s — that overlap, then `deploy`
344 s that cannot start until the gate is green. Reducing per-job parallelism lowered the
sum and left the critical path alone, because **`theme preview` is itself six concurrent
browser checks** and already using the whole machine.

**So the lever left reduces work, not scheduling:**

**The lever left: merge the three figure passes into one browser session.**
`scripts/preview-themes.sh` runs `audit` (contrast, 91 s), `audit --mobile` (95 s) and
`readout` (106 s), and each navigates every figure page: **292 s of page loads for one
walk**. One command that loads a page once and takes the paint measurement, the phone
measurement and the readout at both viewports is the single biggest remaining win, and it
would put `theme preview` under the three-minute rule on its own.


**Done on 2026-10-18: `deploy` builds in parallel.** It walked the profiles one at a
time, 82 seconds of the last job in the gate; `scripts/build-all.sh` does the same work in
~25 and is the script the `build` job already runs, so a deploy and a check build the
site the same way. A full artifact split (build in parallel with the checks, transfer
the site) was **not** done: the site is ~350 MB and the transfer would likely cost
what the build does — so `deploy`'s 344 s is still the last serial step.

**Also measured, and not the lever:** `generated files are in sync` is 88 s, of which
most is `npm ci`; `plan` is 31 s.

**Done means**

- The gate's wall clock is under 10 minutes on four runners, measured on a run.
- `theme preview` is under three minutes on its own, with the three passes merged.
- `.github/AGENTS.md`'s timing table records the numbers from the run that proves it.

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
