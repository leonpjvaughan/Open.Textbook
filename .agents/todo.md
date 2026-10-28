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
are checked against each other on every pass.

**Items 79–138 are all closed,** each with its measurement and fix in
`.agents/todo-closed.md`. Items **139–149 are open** and were found in one pass over the
statistics chapters; the full evidence for each — the command, its output, and what
reading the page added — is **Appendix B of `.agents/numerical-methods-handoff.md`**, and
the lines below are the queue entry that points at it. Items **150–153** are the four
review findings from `research/review/maths-applied-and-numerical-methods.md`, which holds
the measurements; the entries below state the defect, the fix and the check that proves
it. A new item goes at the number after the last one, with its diagnosis, its fix and its
own done-means. The
*interactive-aid backlog* — which figures and interactions a book still wants — is
`ideas.md`; it is a plan rather than a defect list, and it is written for the
author choosing what to build next.

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

---

## 139 — The detail track under the map, starting with `averaging`

**What is wrong.** `books/numerical-methods/docs/averaging/index.md` is 1,028 words and
names eleven methods without deriving one; the book has 1 program in 15 pages, and 0
occurrences of round-off, machine epsilon, Richardson, von Neumann, consistency, a
regression, a confidence interval or a sensitivity. The summary is right and the working
is absent.

**The fix.** Exactly as `.agents/numerical-methods-handoff.md` specifies: Phase A (the
front door and three spine pages), Phase B (four `averaging` detail pages, end to end),
then **stop for review** before Phase C.

**Done means:** the handoff's own ACCEPTANCE, VERIFICATION and width/fold rules, plus
`scripts/check.sh`.

---

## 140 — The statistics strand states results it never proves, and `proofs` has no statistics page

**What is wrong.** `grep -rn ":::prove" books/*/docs/Chapter*/Section*/Walkthrough/index.md`
never touches a statistics section, and `proofs.yaml`'s 21 entries are algebra, calculus,
geometry, mensuration, sequences and trigonometry — statistics is the only strand with
zero. Five stated results are unproved: $|r|\le1$; the deviations adding to zero; the mean
minimising the squared error (the proof book already owns the completing-the-square page);
the CLT (not provable, and must be reworded to say so); the CI/test equivalence in
ie-lc 11.9.

**The fix.** Two proof pages — `correlation-between-minus-one-and-one` (`[A-level]`) and
`mean-minimises-squared-error` (`[GCSE, A-level]`), both `strand: statistics` — linked from
the six stating lines, and the CLT line reworded.

**Done means:** both pages exist and are listed in `proofs.yaml` and
`books/proofs/docs/index.md`; at least five `:::prove` links in statistics sections;
`uv run python -m pytest tests/test_proofs.py tests/test_proof_maths.py -q` passes.

---

## 141 — No page in the collection derives the least-squares line, and four courses use it

**What is wrong.** `grep -rnE "S_\{?xy|n\\sum xy" books/*/docs --include='*.md'` is 0.
A-level 11.4 defines the regression line as one "drawn through the middle of the points";
ie-lc 11.10 names least squares and does not say how. Meanwhile `PROBLEMS.md` documents
`correlation`/`regression` kinds, `verify/cas.py:901-935` computes both, and three banks
carry four `kind: regression` items — so the collection **checks** a line no page explains.
The one fact the a-level bank asserts in answer text, that the line passes through
$(\bar x,\bar y)$, is in no page.

**The fix.** The `averaging/regression` detail page from Phase B, with the geometry a link
to `maths-applied` §1.3's deeper page and overfitting a link to `ie-lc-applied-maths` §9.4
— never a restatement of either.

**Done means:** the page exists; `grep -rn "bar{y}" books/a-level-maths/docs` finds it
linked from 11.4; the page cites both existing derivations it does not repeat.

---

## 142 — The map has no `Least-squares fit` entry, so the commonest statistical computation has no row

**What is wrong.** `grep -niE "^### .*(regress|least squares|fit)"`
`books/numerical-methods/docs/techniques/index.md` finds nothing. Fitting is reachable only
as `Gauss–Newton`'s price line and as `### Normal equations`.

**The fix.** One A–Z entry, `Least-squares fit`,
`Class: [Optimisation](../optimisation/), [Linear system](../linear-system/)`, the normal
equations as its step, "a small residual is not a good fit" as its price. Two classes on
one `Class:` line is already the pattern (`Newton`).

**Done means:** the entry and anchor exist; home-page and A–Z counts recomputed;
`uv run python -m pytest tests/test_reference_books.py -q` passes.

---

## 143 — The map's statistical box has no callback from any page

**What is wrong.** `:::class` appears 0 times in the four statistics chapters, and the
built `averaging` page prints *"No page in this collection names this class yet."* The
callback counts, from `textbook.hooks.usedin`, are `averaging` 0, `optimisation` 1, `root` 3,
`linear-system` 2, `eigenvalue` 1, `saddle-point` 1, and `elliptic`, `parabolic`,
`hyperbolic` all 0.

**The fix.** Add `:::class averaging` where a standard error first appears (a-level 14.3
§2, ie-lc 11.7 and 11.9), and `:::class optimisation` / `:::class linear-system` where a
line is fitted.

**Done means:** `site/numerical-methods/averaging/index.html` lists at least three sections
under *Used in this collection*; `tests/test_class_links.py` passes.

---

## 144 — The A–Z counting table over-states every class by one, and says 81 where the book says 76

**What is wrong.** The `methods` column of the counting table in `techniques/index.md`
reads 20, 21, 9, 20, 11 — sum 81 — against 19, 20, 8, 19, 10 method blocks (sum 76). The
origin: before `b86f6fb8` the column was the old four-column table's row count **including
its header row**, and the conversion carried the number over. No test reads the column.

**The fix.** Count `### ` blocks, relabel the column `entries`, footnote that a family is
one entry and a method in two classes appears in both, add the test that the column sums to
the block count, and settle the home page's label (76 entries, 97 named methods).

**Done means:** the column sums to 76; a new test fails when it does not;
`uv run python -m pytest tests/test_reference_books.py -q` passes.

---

## 145 — A-level says $r$ is never computed, and a review bank requires computing it

**What is wrong.** A-level 14.4: "the value of $r$ is always given. The calculation of $r$
is not required". `chapter-13-review.yaml` items `r6`/`r7` then ask for $r$ and for a
least-squares line, both excluded by the DfE content this book follows
(`dfe_a_level_content.txt:514-516`, `:583`; AQA `875`, `952`).

**The fix.** A decision, not a patch: either those two items become "here is $r$;
interpret and test it", or the books say plainly that the fit and the coefficient are
computed for the reader because a computer can, and never required.

**Done means:** the decision is recorded in `DECISIONS.md`; the banks and the Learn pages
agree.

---

## 146 — GCSE claims S4 and teaches neither the modal class nor an estimate from grouped data

**What is wrong.** `grep -rn -i "modal" books/gcse-maths/` is 0, and no GCSE page teaches an
estimated mean from class midpoints, while S4 requires "modal class"
(`dfe_content.txt:432-433`) and OCR 12.03a requires "estimates of the range, mean and
median for grouped data, and understand why they are estimates" (`ocr_spec.txt:2231-2238`).
`CURRICULUM-MAP.md:132` claims S4 is covered by 24.3/24.4/25.1/25.5. A-level's bank already
asks for it (11.3 item `p7-grouped-mean`) with `refs: [L1]`, which is not the right reference.

**The fix.** One subsection in GCSE 24.4 for the grouped estimate with its "why it is an
estimate" sentence, one in 24.3/24.4 for the modal class, the equivalent half-page in
a-level 11.5, and `p7`'s refs corrected.

**Done means:** `grep -rn -i "modal" books/gcse-maths/docs` is at least 5;
`grep -rn -i midpoint books/a-level-maths/docs/Chapter\ 11/*/*/index.md` includes a Learn
page; `uv run python -m textbook.verify books/gcse-maths/problems/` reports `ok`.

---

## 147 — `ie-lc-maths` Chapter 11 is the largest statistics unit in the collection and has no figure

**What is wrong.** 11 sections, 19,848 words, 0 figures — including 11.7 (margin of error),
11.8 (CLT) and 11.9 (tests and intervals). All eleven figures in the chapter are the
warm-up gate.

**The fix.** Fix 148 first, then move `ch11-sampling-variability`, `ch14-binomial-tail` and
`ch14-normal-test` into `assets/figures/` (they are generic tools) and mount them on
ie-lc 11.7–11.9 with `Predict → Test → Explain`.

**Done means:** the chapter has at least three figures besides the gate; both figure audits
pass; `tests/test_figures.py` passes.

---

## 148 — The figure the 11.1 investigation runs on uses `Math.random`, and nothing checks the rule

**What is wrong.** `books/a-level-maths/docs/assets/figures/ch11-sampling-variability.js:48`
uses `Math.random`, against the unconditional rule at `assets/AGENTS.md:78`. The figure is
the one "Take a new sample" investigation in a-level 11.1, so two readers comparing what
they saw are comparing different data. No test looks for it: 22 tests in
`tests/test_figures.py` and 23 `read_text` calls, none for randomness.

**The fix.** `seed(1)` and `rng.int(0, POPULATION.length - 1)`, plus the missing test beside
the others so the next figure cannot repeat it.

**Done means:** `grep -rn "Math.random" books/*/docs/assets/figures/` prints nothing; a test
fails when a module contains it; the figure draws the same sample twice on reload.

---

## 149 — The Leaving Certificate booklet widget cannot show the normal table its own pages point at

**What is wrong.** `books/ie-lc-maths/booklet/ie-lc-maths.yaml` has no `tables:` key at all —
all 96 items are under `sections`. ie-lc 11.6 says "The standard normal table in the booklet
gives $P(Z \le z)$", and the widget carries only the *formula*
$f(Z)=\frac{1}{\sqrt{2\pi}}e^{-Z^2/2}$. The SEC document prints the grid, Spearman's
critical values and the Pearson significance formula
(`research/sources/ie-lc-maths/SEC_Formulae_and_Tables.txt:869-1055`), and
`BOOKLETS.md` records this booklet as **built**.

**The fix.** A `tables:` section with the standard normal grid, the Pearson and Spearman
critical values, `provision: {sec: given}`, keywords, and a source note.

**Done means:** `len(d['tables'])` is at least 2; `uv run python -m textbook.booklet` prints
`(96 formulae, 2 tables)` or more for this book and reports nothing; the widget shows both
on `ie-lc-maths` and neither on `a-level-maths`; `tests/test_pipeline.py`'s booklet test
passes.

---

## 150 — No body heading has an `id`, so a deep link lands under the masthead (B1)

**What is wrong.** The `toc` extension is not enabled, so 0 of 4,504 built pages carry an
`id` on a body heading. `pipeline.check_links` therefore requires a fragment to name an
explicit `<a id>`, and `numerical-methods` has hand-written 83 of them — invisible empty
elements above headings, so nothing on the page is a link and neither book has an in-page
contents list. The masthead is sticky and 97px tall at 390px with no `scroll-margin-top`
anywhere, so `/numerical-methods/choosing-the-class/#the-same-equations-classified` arrives
with the heading 97px under the bar. `book-local.css:62` puts five sticky `h2`s at `top:
0` on `techniques/`, where they stack and are covered by the masthead; `elementFromPoint`
returns the masthead, not the heading. Full measurements: the review, B1.

**The fix.** Enable `toc` with a `slugify` and `permalink`; make `check_links` accept any
`id` in the target rather than only an explicit `<a id>`; add
`scroll-margin-top: calc(var(--tb-masthead-height))` and export the masthead height as a
token, which also fixes `book-local.css`; add a `:::contents` directive for pages over a
word ceiling; keep a hand-written anchor only where the generated slug differs (31 of the
81 on `techniques/`, measured). Ride-alongs: W4, the reference landing card's `0 chapters
/ 0 sections`.

**Done means:** every body heading in both books has an `id`; a fragment naming a heading
slug resolves and lands below the masthead at 390px; the `techniques/` sticky headings
clear the masthead; a test fails when a heading has no `id` or a fragment does not resolve;
`node tools/dist/cli.js check-mobile site` reports nothing.

---

## 151 — `numerical-methods` uses its own vocabulary before defining it (B2)

**What is wrong.** Measured first use and whether a definition exists anywhere:
`preconditioner` 19 uses, never defined; `LBB` 2, never expanded; `smoother` 6, never
defined; `discretis*` 14, never defined; `CFL` 4, expanded once as a name and never as
Courant–Friedrichs–Lewy; `Krylov` 17, explained only in the A–Z symbols block; `stiff` 36,
defined once on the home page. Every first use is inside a table cell or a price line,
which is the one place a definition cannot go, and the A–Z is the fourth page a reader
reaches. Full table and greps: the review, B2.

**The fix.** One paragraph on `linear-system` on what a preconditioner is, with
`M⁻¹Ax = M⁻¹b` as the step; one sentence on `elliptic` on a smoother and the coarse-mesh
idea; spell out LBB on `saddle-point` and CFL on `hyperbolic`; one sentence for
`discretise` on the home page; add a test that fails when a listed term appears before its
definition. Ride-alongs: W6, a route from a class page back to the nine kinds; T2, the
book's reading order.

**Done means:** each listed term has a definition before its first use; the new test fails
on a deliberate violation and passes on the tree; `uv run python -m textbook.lint
numerical-methods` reports nothing.

---

## 152 — No class page works an example through to a number (B3, W7)

**What is wrong.** Digits in class-page prose outside tables: `averaging` 0,
`eigenvalue` 0, and the other seven between 1 and 6. `averaging` says the error falls as
`1/√N` and hands over a figure whose readout already prints the number, without quoting
it; `eigenvalue` never shows a matrix whose eigenvalues are 2 and 3, though `power-lab`
computes them. A reader crossing from `maths-applied`, whose thesis is to show agreement
"with a number", meets a reference page with none. Separately, `techniques/`'s five
symbols blocks are five 250-word walls (W7). Full table: the review, B3.

**The fix.** One worked line per class page in *What it becomes on a computer*, computed
and pinned by a `claim()`, in the `reading-the-class` pattern. `averaging`: 1,000 samples
with σ = 1 give an error bar of 0.03, and 2,000 give 0.022. `eigenvalue`: `[[2, 1], [1,
2]]` has eigenvalues 1 and 3, and `power-lab`'s ratio is 3 after one step. Turn the five
symbols blocks into a list.

**Done means:** every class page has at least one worked line ending in a number; a test
recomputes each from the figure or program that produces it; the symbols blocks are lists;
`node tools/dist/cli.js readout site --verify` reports no untrue claim.

---

## 153 — `maths-applied` states one agreement comparison as two numbers, and no check reads either (B4, W1, W2)

**What is wrong.** Four lines, two numbers, one comparison: §1.3 and §1.4 say `10⁻¹⁶ m`,
the Review and §1.1's depth page say `10⁻¹² m`, and the Review's question 4 calls it a
residual of `10⁻¹² mm`, a third quantity in a third unit. The model's step-5 residual is
**9.6 × 10⁻¹⁴ mm = 9.6 × 10⁻¹⁷ m** and its pose difference is **exactly 0.0 m**, so the
stronger claim is available and two pages understate it by four orders. No test reads any
of the four lines. The same defect appears on §1.2: the prose says the instant centre is
2.36 m from the hub, the table says 1.60 m inboard, and the figure's readout says 1.60 m
inboard *of the hub* because `wishbone-hero.js:253` prints `Math.abs(state.ic[0])`. Also:
`front-corner.jpg` is 271 kB for a 352-pixel slot (W1), and §1.6's *Watch out* repeats
§1.5's depth page (W2). Full measurements: the review, B4, W1, W2.

**The fix.** State the arithmetic agreement as "to the last bit of a double, about 10⁻¹⁶
m" and the structural one as "the same pose"; make the figure print `hub.x − ic.x` or
relabel the table and figure "from the car's centre"; add one test in the shape of
`test_three_pages_state_the_same_rigid_change` that reads the pages and the model; replace
or re-encode the photograph; delete the duplicated *Watch out*. Ride-alongs: W3, the two
literal `- ` lists (one here, one on a class page); W5, the sixty unlinked `§1.x`
cross-references; T1, the masthead naming; T3, the chapter problem stated three times.

**Done means:** the four agreement lines state one number in one unit, and the instant
centre one statement; the new tests recompute both from `mechanism.js` and fail on drift;
`node tools/dist/cli.js budget site "/maths-applied/chapter-1/section-1.1/learn/"` is
under budget; `grep -rn "§1\\."` links rather than names; lint and the maths-applied tests
pass.
