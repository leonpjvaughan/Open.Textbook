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

**Every item from 79 to 156 is closed,** each with its measurement, its fix and its
outcome in `.agents/todo-closed.md`. Items 157–161 are the review's remaining five
defects, from `research/review/maths-applied-and-numerical-methods-ii.md`, which also
carries the design proposals those five do not cover; 162 (now closed) was that
review's figure measurement re-run, 163 is the prose half of 154, measured while closing
it, and 164 is the label tail the figure check measured. A new item goes at the number
after the last one, with its diagnosis, its fix and its own done-means. The
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

## 164 — 39 labels in 31 figures overhang their frame, mostly a y-axis title written the wrong way round

**What is wrong.** The `canvas` check measures every element against its drawing. After
156 and 162 fixed the figures that were wholly misplaced, **39 `<text>` elements in 31
modules** still cross the edge. The largest are not marginal:

```
internal-resistance   "terminal potential difference / V"   168 units of 221 outside
fission-chain-reaction "A neutron strikes the nucleus. …"    98
model-fit             "temperature / degC"                   95
hooke-law             "spring"                               56
ch4-model-explorer    "Right bar: multiply by 1.1 each …"     48
ch16-pull-at-an-angle "acceleration a = 2.25 m/s²"           34
ohms-law-graph        "current / A"                          21
growth-curves         "Aoife", "Cara", "Ben"              19, 17, 11
ice-heating-curve     "temperature (C)"                      17
```

**The cause is one habit, not 31 mistakes.** A y-axis title is written horizontally —
`label({ x: PLOT.x0 - 6, text: "terminal potential difference / V", anchor: "end" })` — so
a 221-unit label ending 6 units left of the axis begins 168 units outside a 420-unit
drawing. The reader sees the last two words of it, or none. `label()` already rotates
(`rotate`, about the label's own position, added when nine modules were moved off
hand-written `<text>`), so the fix is a title that runs *up* the axis instead of off it.

Three of the 39 are not axis titles — a label above the top edge (`enlargement-grid`'s "y",
`profit-slider`'s "£114.00", `coulomb-force`'s "+q") — and each needs its own nudge.

**The fix.** Rotate each y-axis title with `label({ rotate: -90, anchor: "start" })` at the
plot's bottom-left, and nudge the three overhead labels inside. Then delete the figure from
`CANVAS_DEBT` in `tools/src/commands/canvas.ts`, one at a time: the table is the list.

**Done means**

- [ ] `CANVAS_DEBT` is empty, and `node tools/dist/cli.js canvas site` reports 0 errors
- [ ] every rotated title reads as a title in a capture at 390px and at 1280px, both schemes
- [ ] `scripts/preview-themes.sh` still reports 0 findings on `audit`, `kit`, `canvas` and
      `check-mobile`
