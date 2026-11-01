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

**Every item from 79 to 174 is closed,** each with its measurement, its fix, its outcome
and its ticked done-means in `.agents/todo-closed.md`. Items **175–177** are open: the three
the fourth review measured (`research/review/maths-applied-and-numerical-methods-iv.md`).
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
