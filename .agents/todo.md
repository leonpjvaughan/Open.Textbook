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

**Every item from 79 to 174, and 181, is closed,** each with its measurement, its fix, its
outcome and its ticked done-means in `.agents/todo-closed.md`. Items **175–177, 179 and 180** are open:
the fourth review's three, and three more from the pass that followed it.
A new item goes at the number after the last one, with its diagnosis, its fix and its own
done-means.

The *interactive-aid backlog* — which figures and interactions a book still wants — is
`ideas.md`; it is a plan rather than a defect list, and it is written for the author
choosing what to build next.

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

The five **design proposals** in `research/review/maths-applied-and-numerical-methods-ii.md`
are adopted as items **168–172**, listed in the paragraph above; `ideas.md` §12 holds the
argument and the citations, and the review holds the measurement. The two indexes in
`research/review/maths-applied-and-numerical-methods-iii.md` were items **173–174**, and that
review holds their measurement.

---

## 175 — The hardest idea in `maths-applied` is drawn nowhere

**What is wrong.** §1.4 is where a reader meets a singular value decomposition, a left
null space, and the sentence "the two legs are one equation". The page's only figure is
`wishbone-3d`, which is about the legs in three dimensions; the decomposition itself is
text and one row vector:

```
$$ \sigma = \left(1.415,\ 0.998,\ 0.000\right). $$
Which combination? That is a vector in the left null space, and here it is:
$$ w = \left(0.707,\ -0.707,\ 0.000\right). $$
```

A reader who does not already know what a null space is has to build one from a sentence
and a row vector, on the page the chapter's argument turns on. The third review's rule
was "every class page works a number"; this page works one and shows none of it.

**The fix.** One figure, `null-vector`: the three rows of the Jacobian drawn as three
arrows from one origin, the first two visibly the same arrow, and the cancellation
`0.707·row1 − 0.707·row2` drawn as the pair that closes on nothing. Labels carry the
numbers the page already prints (`1.415`, `0.998`, `0`; `0.707`, `−0.707`), read from the
page's own model at build time. It mounts with the cancellation already drawn — the
static frame carries the idea — and it has no control, because the pose does not change
the pattern: §1.4 already says a different pose gives the same `w`.

**Done means**

- [ ] the figure is in `books/maths-applied/docs/assets/figures/`, drawn through
      `kit.js` with `SIZE`, `label()` and `scale()`, and no colour of its own
- [ ] the numbers it prints are computed from the page's model, not typed, and a test
      compares them with `tests/test_maths_applied_numbers.py`'s singular values and null
      vector
- [ ] `node tools/dist/cli.js audit site` reports it in both schemes with no contrast
      failure, and `--mobile` reports no label below 9px
- [ ] `node tools/dist/cli.js canvas site --only null-vector` draws inside its viewBox
- [ ] §1.4 mounts it beside the paragraph that names `w`, and the prose stops restating
      what the figure shows
- [ ] `python -m textbook.lint maths-applied` is clean and `pytest tests/ -q` passes

## 176 — A table can be wider than a phone and no check notices

**What is wrong.** `tools check-mobile` fails when a page is wider than the screen. A
table cannot make a page wider, because `wrap_tables` puts every one of them in a
`.table-scroll` — so the check is satisfied by the wrapper that hides the problem. A
table whose last column sits past the right edge therefore reads as a pass.

Measured at 390px, before this pass: **18 tables in 11 pages** of `maths-applied` and
`numerical-methods`, the worst 172px over — and §1.5's five-column ladder put its fifth
column at `x=404` in a 390 viewport, which is the column that carries the section's
point. All 18 are fixed (marked `<!-- table: cards -->`, or shortened) and both books now
measure zero. The collection has not been swept: a 150-page sample of `proofs` and
`a-level-maths` found two more (`chapter-11/review` 27px, `chapter-13/section-13.3`
5px), so the rest of the library is unaudited.

**The fix.** A fourth check in `tools/src/commands/check-mobile.ts`: for each examined
page, every `main table` whose `scrollWidth > clientWidth + 1` and which does not carry
`table--cards` is an error, naming the table's first heading and the overflow in pixels.
Then sweep every book and fix each finding with the marker where the rows are records,
or a shorter header where they are numbers.

**Done means**

- [ ] `tools check-mobile site` fails on a table 40px wider than its container, and a test
      in `tests/test_mobile.py` pins the failure
- [ ] every book in the collection reports zero overflowing tables at 390px
- [ ] `scripts/check.sh` runs the new check and is green
- [ ] the check's help line and `tools help --check` agree

## 177 — `:::contents` is opt-in, and 767 pages are over the hook's own threshold

**What is wrong.** `hooks/contents.py` refuses to render below five `h2`s, which is a
designed threshold, and then renders only where the page writes `:::contents`, which is a
per-page decision nobody has made. Measured over every book: **767 pages** carry five or
more `h2`s and no marker — including all nine class pages in the map (`averaging` has 11)
and 21 pages of the proof book.

The six `maths-applied` section pages fixed in this pass are the argument for the other
answer: they are 6,573–12,870px at 390 and the list is nine lines. But a class page's ten
headings are the same ten on every class page, and a list of them may be furniture a
reader learns once. The two cases cannot both be right, and the hook currently says
nothing about which it is.

**The fix.** Decide, and make the decision the hook's: either `on_page_content` renders
the list whenever a page has five `h2`s (the marker becomes unnecessary and is retired),
or the marker stays and `books/AGENTS.md` says which pages owe one — with a lint rule for
a page that has the `h2`s and not the list. The measurement that decides it is a reader's:
a list on a class page is eleven links to eleven sections of one screen of prose.

**Done means**

- [ ] the decision is written in `books/AGENTS.md` (or in `hooks/contents.py`'s docstring
      if the hook decides for itself)
- [ ] every page over the threshold either carries the list or is exempt by a rule a test
      can apply
- [ ] if the marker is retired, every `:::contents` in the collection is removed and the
      pages that wanted a list still have one
- [ ] `pytest tests/ -q` passes, including the existing contents test in
      `tests/test_reference_books.py`

## 178 — Two tables on every class page listed the same methods, and only one was linked — **done**

**What is wrong.** Each of the nine class pages carries a **property table** ("what your
model is | the methods that fit | the price") and, below it, a **method table** marked
`<!-- table: cards -->` whose first column links into `techniques/index.md`. The prose
between them says they are the same list: "The method-keyed table below is the same list
sorted by name." Measured across the nine pages, the property table has **55 rows and 0
links** — `averaging` 8, `eigenvalue` 6, `elliptic` 6, `hyperbolic` 6, `linear-system` 5,
`optimisation` 6, `parabolic` 6, `root` 6, `saddle-point` 5 — while every name in it
("Monte Carlo", "Power iteration", "GMRES, BiCGSTAB", "Simplex method, interior point,
sequential quadratic programming") has an anchor in the A–Z.

The counter-argument is real and is why this is a decision rather than a repair: the
property table is a *decision aid* read by scanning a column, and a cell naming four
methods would become four links, which is link soup at 390px. The card table below already
carries the hop, and the sentence above the property table already names the family anchor
(`../techniques/#finding-a-state`).

**The fix.** Decide, and say so in the page-level paragraph rather than leaving a reader to
notice:

- either link only the cells that name **one** method (Bisection/Brent, Monte Carlo) and
  leave multi-method cells as text — the asymmetry is then a rule, not an omission;
- or link every name through the A–Z's short anchors, and accept the density.

Whichever it is, `tests/test_reference_books.py` gets a test beside
`test_every_method_a_class_page_names_links_to_its_entry` that applies it to the property
table, so a name added later cannot arrive unlinked.

**Done means**

- [ ] the rule is written where the property tables are authored (`books/AGENTS.md`
      or `books/numerical-methods/AGENTS.md`)
- [ ] all nine class pages obey it, and a test fails when a new name in a property table
      breaks it
- [ ] `node tools/dist/cli.js audit site --mobile` reports no contrast or size failure on
      the changed cells
- [ ] `python -m textbook.lint numerical-methods` is clean and `pytest tests/ -q` passes

**Outcome, 2026-11-02.** The decision, and the rule that states it.

**A cell that names one method is a link; a cell that names several is text.** The
asymmetry is the rule, not an omission, and it is written where the tables are authored —
`books/numerical-methods/AGENTS.md`, **The two technique tables, and which cells are
links**. Four links in one cell is link soup at 390px, the method table below already
carries every hop with the method it belongs to, and the property table is a decision aid
read by scanning a column.

Measured after the change, over the nine class pages: **54 property rows, 21 carrying a
link** — every cell that names exactly one A–Z entry. The matching is by the entry's
heading, with the parenthetical tail part of the name, so `Sparse direct (Cholesky, LU)` is
one method and matches `Sparse direct (Cholesky, LU, multifrontal)`. Two cells needed
saying exactly what they name: `Adaptive step control around the implicit methods` became
`Adaptive step control`, the A–Z's entry.

Held by `test_a_single_method_in_a_property_table_is_a_link` (nine parameters): a cell
naming one A–Z entry must carry exactly the link to that entry, and a cell naming several
must carry none — so a name added later cannot arrive unlinked, and a link added to a
multi-method cell fails too.

Evidence: `node tools/dist/cli.js audit site --mobile` — 221 figures at 390px, **0 below
9px**, median smallest label 9.3px; `textbook.lint numerical-methods` clean over 32 pages;
`pytest tests/ -q` — **8,818 passed, 50 skipped**. One repair on the way: the linker joined
`<!-- table: cards -->` to the method table's header line on all nine pages, which the
existing marker test caught; the newline is restored.


## 179 — The symptom fix column names the technique and never links it

**What is wrong.** Measured across every `| symptom | cause | fix |` table in the map:
**103 rows, 0 fix cells containing a link, 46 fix cells naming no technique entry at all.**
The rows that do name one — "Multigrid, or AMG", "Precondition the Schur complement as well
as $A$", "An LBB-stable pair, or stabilisation", "Arc-length continuation, or
re-parameterise the step" — send a reader back to the A–Z to find by hand what the page
already named. `symptoms/index.md` and the class pages carry the same rows, so each fix is
made twice.

The 46 that name nothing are the harder half and are not a linking problem: "Check the
residual at the start; the rule may be contradictory" is advice, not a technique. Those
rows are what a reference work should either lift into an entry or stop pretending to have
a fix for.

**The fix.** Link the fix cells that name an A–Z entry, using the same anchor form the card
tables use, in both the class page and `symptoms/index.md` (one wording, two pages, per the
existing symptom test). Then triage the 46: each becomes either a link to the entry it
really means, or a row whose fix says what to *check* rather than what to switch to.

**Done means**

- [ ] every fix cell that names an A–Z entry links to it, on both pages, and
      `test_every_symptom_is_one_row_in_one_wording_on_both_pages` still passes
- [ ] a new test fails when a fix cell names a technique and links nothing
- [ ] the 46 unlinked rows are triaged and the count of rows naming no entry is a number
      the file records, not an accident
- [ ] `pytest tests/ -q` passes

## 180 — A `maths-applied` section is called "Overview" in the sidebar

**What is wrong.** `scaffold.py` names a section's own page "Overview" once the section has
children, and for `maths-applied` the children are the optional depth pages. So the sidebar
shows

```
1.2 A compass, not a ruler
    Overview
    Why two circles meet twice
```

for a book whose sections are **one page each**: `section_pages: [learn]`. "Overview" is the
chapters' word for a section's landing page between the title and its page kinds; here it is
the only content page, and it reads as a summary a reader may skip. §1.1, §1.6 and §1.7 —
the sections with no depth page — are labelled `1.1 The question` and so on, so the same
book names its sections two ways depending on whether an optional page exists.

**The fix.** In `scaffold.py`, the label for the section's own page is the book's, not the
chapters': when `len(kinds) == 1` the section page keeps a name from the book's own
vocabulary (`page title`, or the kind's title) instead of "Overview". The `kinds == 1`
branch is already there and already special; the word is the only thing left to decide.
The reference-work branch above it also uses "Overview" for a class page and should stay
as it is, because there the class page *is* an overview of its children.

**Done means**

- [ ] `site/maths-applied/chapter-1/section-1.2/learn/` is linked from the sidebar by a
      name that is not "Overview", and the six sections with a depth page agree with the
      one without
- [ ] no course book's sidebar changes (the `kinds > 1` branch is untouched)
- [ ] the reference work's class pages still read "Overview"
- [ ] a test in `tests/test_book_structure.py` pins the label for both shapes
- [ ] `pytest tests/ -q` passes
