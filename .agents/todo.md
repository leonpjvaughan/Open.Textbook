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

**Every item from 79 to 153 is closed,** each with its measurement and fix in
`.agents/todo-closed.md`. Items 154–159 are open, all from
`research/review/maths-applied-and-numerical-methods-ii.md`, which also carries the
design proposals those six defects do not cover. A new item goes
at the number after the last one, with its diagnosis, its fix and its own done-means. The
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

## 154. `dynamics-table` draws its rows below its own viewBox, so §1.6's figure is an empty frame

**What is wrong.** `maths-applied` §1.6 mounts `dynamics-table`, and 17 of the
figure's 22 `<text>` elements sit at y = 304…508 in a `0 0 560 300` canvas. The
reader sees a bordered box with two rules, two floating column heads, a slider and
a readout, while the prose under it says "Each column is an integration" and the
caption says "Every column is one integration of the vendored kernel". There are no
columns.

Measured on the built page:

```
viewBox 0 0 560 300, rendered 560×300
textYs  [304,304,287,35,20,20,20,316,316,316,364,364,364,412,412,412,460,460,460,508,508,508]
outside 17 of 22
```

**The cause is one line.** `books/maths-applied/docs/assets/figures/dynamics-table.js:95`
reads `box.y0 + 34 + index * 48`. `axes()` returns `y0 = height - margin.bottom`
(the bottom edge, 282) and `y1 = margin.top` (the top, 30) —
`assets/figures/src/kit/draw.ts:470` — so the rows start 34 px below the bottom rule
and march off the canvas. Every other module uses `box.y0 + 34` for a single label
placed near the bottom **inside** the plot, which is why the idiom looked right.
The line has been wrong since the file was created (`d95a3d98`).

**Why nothing caught it.** `audit` measures paint (contrast, font size): an element
outside the viewBox is painted correctly. `readout --verify` recomputes the
arithmetic: the numbers are right, they are in the wrong place. `kit site` checks
the DOM contract. The collection has a strong contract on what a figure says and
how it is painted, and none on whether it is inside its own canvas.

**The fix.** `box.y1 + 34 + index * 48` (64, 112, 160, 208, 256 against a box of
30…282), which is one line. Then make the measurement: for every `maths-figure`,
transform each unrotated `<text>`'s and each mark's `getBBox()` into the SVG's user
space and fail outside the `viewBox`. The transform is the whole work — a rotated
axis label's own `getBBox` is not in the parent's space, which is why a naive
version reports 14 false positives across these two books and exactly one true one.

**Done means**

- [ ] §1.6's `dynamics-table` shows five labelled rows with both columns inside the
      drawing at 390px and at 1280px, in both schemes
- [ ] a tool check fails on a figure that draws outside its `viewBox`, and its case
      list in `tests/test_figures.py` includes this defect
- [ ] the check reports 0 findings on the whole site, and 1 when the old `rowY` is
      restored

## 155. On a phone the whole book is printed above every page

**What is wrong.** At 390px `shell.css:253` collapses `.layout` to one column and
makes `.sidebar` static, so the navigation becomes the first block of every page.
Measured on the built site:

```
route                                       navH  navLinks  h1Top  pageH
/numerical-methods/                          614      31      798   11388
/numerical-methods/root/                     670      31      854    7608
/maths-applied/chapter-1/section-1.2/learn/  460      16      644   10649
```

A reader's first screenful is the table of contents and the page title is below
the fold. It is the shared shell, so every book does it; it bites hardest where the
registry is longest, and `numerical-methods` is 31 links on a page that is already
23,138px tall.

**The fix.** Collapse the sidebar behind a native `<details>` disclosure at phone
width — no script and no focus trap, and `details` is already the collection's
progressive-disclosure primitive. The summary line should carry the book's name and
the page's own section, which is the one thing a reader 600px into a nav wants.

**Done means**

- [ ] the `h1` of every route is above 300px at 390px, measured over both books
- [ ] the drawer is one focus stop, opens with `Enter`, and is inert at ≥60rem
- [ ] `tools check-mobile site` still reports 0 pages wider than the screen

## 156. The nine-kinds table is starved at every width

**What is wrong.** The home page of `numerical-methods` says "Read the last column
first", and that column is 142px at 1280px — about 18 characters — so each cell
wraps to five lines and a row is 126px tall. Measured:

```
1280px  table 662, columns 116/184/210/142, rows 98–154, table ~1,200 tall
 390px  table 544 inside a 358 scroll box, rows 210–266, 34% off screen
1600px  table still exactly 662 — the width is the prose measure, not the screen
```

The book's central artefact is the hardest object on its own home page, and the
same defect with the same remedy was already fixed once in this book: the A–Z was
measured at 12,500px tall and became one card per method with a sticky section
heading (`books/numerical-methods/docs/assets/stylesheets/book-local.css` records
it). The nine-kinds table is the same object and the more important one.

**The fix.** Below 60rem, one card per kind: the kind as a linked heading, then the
question, the model and the recognition line as three labelled lines — the
`techniques` pattern. Above 60rem, a wide-table variant that takes the grid column
rather than `70ch`, capped near 56rem, which takes the recognition column from
142px to about 240px.

**Done means**

- [ ] at 390px the nine kinds need no horizontal scroll and no row is taller than
      140px
- [ ] at 1280px the recognition column is at least 220px and the table's height
      falls by a third
- [ ] `tests/test_reference_books.py` still holds the table's rows to the registry

## 157. `root` and `elliptic` render the signature's list as hyphens in a paragraph

**What is wrong.** Python-Markdown needs a blank line before a list, and both
pages omit it, so the built HTML is one `<p>` containing `The difficulty is: -
which of the solutions you land in; - …`. On both pages the broken list sits inside
**The signature** — the section the home page tells a reader to read first. Six
built pages still do this, down from 22; the other four are Irish.

The earlier review measured 22 and specified the rule; the fix reached 16 of them
and missed these two.

**The fix.** The blank line on both pages, plus the lint rule: a line matching
`^\s{0,3}([-*+]|\d+\.)\s` immediately after a prose line with no blank between
is a finding. `lint.py:62` already has the pattern and `prose_paragraphs` already
treats a list item as structure; the rule is four lines and turns the remaining
four defects into a build failure in the same commit.

**Done means**

- [ ] `grep '<p>[^<]*: - '` over `site/` prints nothing
- [ ] a page that opens a list without a blank line fails `python -m textbook.lint`
- [ ] `tests/test_lint.py` carries the case

## 158. Nine signatures, eighteen wordings, and no check that they agree

**What is wrong.** `map.yaml` gives each class one `signature`, which `:::class`
prints under the link in another book; each class page also opens with "**You have
one of these when**", which is the same sentence written again. Two of the nine do
not just differ in wording but in claim: `root`'s signature adds "the rule bends
with the answer" and `hyperbolic`'s adds "keeps its shape", and neither appears on
the page. A reader who follows `:::class root` from `maths-applied` meets a page
that defines the class in different words.

`tests/test_reference_books.py` holds the registry, the home page's table and the
nav together, and does not hold the signature to the page.

**The fix.** One sentence per class, printed in both places: the page keeps its
`**You have one of these when**` lead-in and uses the registry's sentence, and a
clause the page needs moves into the registry.

**Done means**

- [ ] each class page contains its registry signature verbatim
- [ ] `tests/test_reference_books.py` fails when one is edited and the other is not
- [ ] the home page's nine-kinds table still matches both

## 159. The comparisons both books are built on are never drawn

**What is wrong.** `maths-applied` §1.5's answer is a comparison — the effect the
simpler model leaves out against the tolerance the question asks for — and the same
tolerance on two different quantities gives answers **nine times apart** (1.8 MN/m
against 0.2 MN/m). It is stated in tables on three pages and drawn on none:
`stiffness-agreement` plots camber against travel, which is what the section is not
about. In `numerical-methods` the thesis sentence "you need the method that answers
your question" has no figure either, in a book where every class page has one.

**The fix.** One figure on §1.5: stiffness on a log x-axis, |difference from the
rigid model| on a log y-axis, two curves ("at rest", "change over the travel"),
and a horizontal dashed rule at 0.1°. The two crossings are the two answers and the
gap between them is a distance on the page. The numbers already exist in the model
the page imports and the crossing is a bisection over the same `compliant()` call.

**Done means**

- [ ] the figure mounts with a static frame that carries the two crossings on its own
- [ ] both crossings are declared with `claim()` and `readout --verify` passes
- [ ] the prose quotes the numbers the figure prints, not a second set



## 154 — 257 answers in the Leaving Certificate bank carry display maths a folded scalar flattened

**What is wrong.** `answer_text: >-` folds every single newline into a space, so a
`$$…$$` block written under it arrives on one line and the renderer puts it after
`**Answer:**`, inside a paragraph. The reader gets a display equation that is not
displayed. Measured over `books/*/problems/*.yaml` on 2026-10-30: **257 answers**, all
of them `ie-lc-maths`.

Same defect class as W3 (fixed in item 153): the source reads as structure and only the
built page shows what happened. W3 was the list case, and it was found by grepping the
built site for a hyphen inside a `<p>`; display maths has no such tell, which is why
this was not in that sweep.

**The fix.** Switch those scalars to `|-` so the lines survive, in the same way W3's
four answers were fixed, and keep the text unchanged apart from the newlines. Then hold
it: extend `test_no_rendered_answer_has_a_list_inside_a_paragraph` (or add its
sibling) so a rendered answer whose text contains `$$` must carry it in a paragraph of
its own, which fails today for these 257 and passes after the switch.

**Done means:**

- `grep -rn 'answer_text: >-' books/*/problems/*.yaml` returns nothing that loads with
  `$$` inside its string;
- every affected page's built HTML contains `<math display="block">` for those
  equations rather than an inline `<math>` inside a `<p>`;
- the new test fails on a planted folded answer and passes on the tree;
- `uv run python -m textbook.verify books/ie-lc-maths/problems` reports `ok` for every
  file, `python -m textbook.lint` is clean, and `scripts/check.sh` exits 0.
