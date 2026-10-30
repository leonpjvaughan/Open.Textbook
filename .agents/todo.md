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

**Every item from 79 to 155 is closed,** each with its measurement, its fix and its
outcome in `.agents/todo-closed.md`. Items 156–161 are the review's six defects, from
`research/review/maths-applied-and-numerical-methods-ii.md`, which also carries the
design proposals those six do not cover; 162 is that review's figure measurement
re-run, which found two figures its own section on the check did not; 163 is the
prose half of 154, measured while closing it. A new item goes at the number after the
last one, with its diagnosis, its fix and its own done-means. The
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

## 156 — `dynamics-table` draws its rows below its own viewBox, so §1.6's figure is an empty frame

**What is wrong.** `maths-applied` §1.6 mounts `dynamics-table`, and 15 of the
figure's 22 `<text>` elements have a box below the frame — the five rows of three
cells. The reader sees a bordered box with two rules, two floating column heads, a
slider and a readout, while the prose under it says "Each column is an integration"
and the caption says "Every column is one integration of the vendored kernel". There
are no columns.

Measured on the built page:

```
viewBox 0 0 560 300, rendered 560×300
textYs  [304,304,287,35,20,20,20,316,316,316,364,364,364,412,412,412,460,460,460,508,508,508]
outside 15 of 22 texts (33 marks in all)
```

The `y` attributes say 304…508; a transformed `getBBox()` says fifteen, because two
of those attributes belong to elements inside the frame. The count the check reports
is the one to use.

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
transform each element's `getBBox()` into the SVG's user space and compare it with the
`viewBox`. Two rules, not one: **a `<text>` must be inside**, and **a mark may cross
the edge but must have ink inside** — `wishbone-hero` draws its rays to the instant
centre, 1,295 units off-canvas, and a single rule would fail it. The transform is the
work — an element's own `getBBox()` is in its parent's space, which is why reading
attributes reported one offender where there are three.

**Done means**

- [ ] §1.6's `dynamics-table` shows five labelled rows with both columns inside the
      drawing at 390px and at 1280px, in both schemes
- [ ] a tool check fails on a figure that draws outside its `viewBox`, and its case
      list in `tests/test_figures.py` includes this defect
- [ ] the check reports 0 findings on the whole site with the text/mark rule 162
      states, and fails when the old `rowY` is restored

## 157 — On a phone the whole book is printed above every page

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

**The mechanism has to be named, or the done-means cannot pass.** One page is built
for every width, so CSS cannot set `open` by media query: a `<details open>` leaves
the `h1` at 798px on a phone, and a `<details>` without `open` cannot be shown at
desktop without something to open it. Three answers are workable — override the user
agent's closed-content rendering at ≥60rem (the new `::details-content`, not in every
browser), reveal a fixed drawer on `:focus-within` (the skip link is already that
stop), or a dozen lines of script on `matchMedia`. Pick one in the fix.

**Done means**

- [ ] the `h1` of every route is above 300px at 390px, measured over both books
- [ ] the drawer is one focus stop, opens with `Enter`, and is inert at ≥60rem
- [ ] `tools check-mobile site` still reports 0 pages wider than the screen

## 158 — The nine-kinds table is starved at every width

**What is wrong.** The home page of `numerical-methods` says "Read the last column
first", and that column is 142px at 1280px — about 18 characters — so each cell
wraps to five lines and a row is 126px tall. Measured:

```
1280px  table 662 × 1,308, columns 116/184/210/142, row 126
 390px  table 544 inside a 358 scroll box, row 210, 34% off screen
1600px  table still exactly 662 — `.content`'s `70ch` cap, not the screen
```

The book's central artefact is the hardest object on its own home page, and the
same defect with the same remedy was already fixed once in this book: the A–Z was
measured at 12,500px tall and became one card per method with a sticky section
heading (`books/numerical-methods/docs/assets/stylesheets/book-local.css` records
it). The nine-kinds table is the same object and the more important one.

**The fix.** Below 60rem, one card per kind: the kind as a linked heading, then the
question, the model and the recognition line as three labelled lines — the
`techniques` pattern. Above 60rem, a wide-table variant that escapes `.content`'s
`max-width: var(--tb-measure)` (`engine/src/textbook/css/shell.css:172`) and takes
the grid column instead — about 234px of headroom at 1280px — capped near 56rem,
which takes the recognition column from 142px to about 280px.

**Done means**

- [ ] at 390px the nine kinds need no horizontal scroll and no row is taller than
      140px
- [ ] at 1280px the recognition column is at least 220px and the table's height
      falls by a third
- [ ] `tests/test_reference_books.py` still holds the table's rows to the registry

## 159 — Nine signatures, eighteen wordings, and no check that they agree

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

## 160 — The comparisons both books are built on are never drawn

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
- [ ] both crossings are held by a check that can recompute them — `claim()` and
      `readout --verify` handle closed-form arithmetic only, so this is either a new
      interval kind in the verifier or a recompute test in
      `tests/test_maths_applied_numbers.py`
- [ ] the log axes are drawn by a scale the kit owns, or by an explicit `log10`
      mapping whose ticks are relabelled
- [ ] the prose quotes the numbers the figure prints, not a second set

## 161 — `linear-system` splits its five-item list into three, with the definition of `preconditioner` in the gap

**What is wrong.** The first pass's B2 fix added the `preconditioner` definition and
put it in the middle of the list that states the five matrix situations deciding the
method. On the built page the section is `<ul>` with one item ("Dense and small"),
then a paragraph, then a second `<ul>` with the other four. The five items are the
reader's own vocabulary and the most useful paragraph on the page; splitting them
hides both.

**The fix.** Move the definition above the list as a lead-in, or below it as a
closing paragraph. One paragraph moves and the list is whole.

**Done means**

- [ ] the built page has one `<ul>` of five items in *What it becomes on a computer*
- [ ] `preconditioner` is still defined on the page before the technique table
- [ ] `python -m textbook.lint numerical-methods` is clean

## 162 — two more figures draw outside their canvas, and they decide what the 156 check may call a defect

**What is wrong.** The sweep item 156 specifies — every mark's `getBBox()` transformed
into the SVG's own user space, compared with the `viewBox` — was run over both books'
19 routes and 21 modules on a build at HEAD (`f296ff8`). It finds three figures, not
one:

```
dynamics-table   15 of 33 marks outside   rows at y = 300…492 in a 300 canvas
dynamics-table   (5 rows × 3 cells; the y attributes read 304…508)
kernel-camber     1 of 38   text "40 mm"  bbox x 516…565, viewBox width 560
wishbone-hero     2 of 24   fig-grid rays to x = −1295, viewBox width 520
```

The `kernel-camber` one is a clipped tick label: the right-most x label loses its
last four units, about a glyph. The `wishbone-hero` rays are **intentional** — the
module draws each wishbone's line to the instant centre, which is off the drawing
("so they run to the edge" is the comment) — but they run to the point itself, 1,295
units off-canvas, and only the `viewBox` hides that.

So the check has to separate the two cases or it cannot reach the "0 findings"
item 156 asks for: **a `<text>` must be inside; a mark may cross the edge but must
have ink inside.** A rule applied to both fails `wishbone-hero`, which is correct
as drawn.

**The fix.** Clamp the ray to the canvas edge in `wishbone-hero` (or accept the
crossing and keep the rule above), move the `kernel-camber` tick label inside (the
last tick's `anchor` or the domain's end), and say the text-versus-mark rule in the
check's own docstring, because it is the difference between three findings and
false positives.

**Done means**

- [ ] the "40 mm" label is fully inside its `viewBox` at 390px and 1280px, both schemes
- [ ] the check from 156 passes every figure in every book at HEAD with the text/mark rule
- [ ] the check fails each of the three cases when the old code is restored, and its
      case list in `tests/test_figures.py` names them

## 163 — 473 display equations in page prose keep their dollars, because they share a paragraph with the text

**What is wrong.** Item 154 fixed this in the problem banks. Page prose has the same
defect, and in four books. Measured on the built site after the banks were rebuilt:

```
stray `$` before `<math>`   ie-lc-maths 449   ie-lc-physics 15
                            ie-lc-applied-maths 6   proofs 3
```

`> **The addition rule.**` followed by `> $$P(A \cup B) = \ldots$$` is one paragraph, so
the delimiters survive, and the reader sees a dollar, the equation set on the line of
the sentence, and a dollar. A state machine over the source finds **556** lines that
need a blank line on one side of them — 185 before and 253 after in plain prose, 69
before and 35 after inside block quotes, and 14 inside indented blocks.

**The fix.** The rule first: `lint.display_maths_without_a_blank_line`, the maths
sibling of `lists_without_a_blank_line`, reusing the `$$` state machine item 155 added.
It has to exempt a display equation in a table cell, which is inline by design. Then a
fixer over the 556 — insert a blank line, or a line carrying the quote prefix — and the
finding is zero with no debt entry.

**Done means**

- [ ] the lint rule reports nothing over the collection, with no debt entry
- [ ] a scan of the built site finds 0 pages with a bare `$` before a `<math>`
- [ ] `tests/test_lint.py` fails when a planted `$$` line loses its blank line
- [ ] the four affected books rebuild with no `math-error` page
