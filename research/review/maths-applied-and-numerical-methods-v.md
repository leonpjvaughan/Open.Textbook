# Review V: Maths Applied and Numerical Methods

A fifth pass over the two reference-shaped books, after
`maths-applied-and-numerical-methods.md` (14 items),
`-ii.md` (10 findings, 5 designs), `-iii.md` (6 findings, 2 indexes) and `-iv.md`
(prose defects, 3 items). Those four are not edited and their findings are not
repeated here.

The four earlier passes looked at structure, then at prose. This one asked a
question none of them had measured, because it needs a browser rather than a
reading:

> The books read well on a laptop. Do they work on the phone they are read on?

and, while in a browser, the second question that the figures of `maths-applied`
raised in Review II and that the queue has carried ever since:

> §1.2 says the two circles meet twice and gives both answers. Is that drawn?

**Changed in this pass:** one new figure in `maths-applied`, mounted on the depth
page that argues the two-answer case, plus the record of the three findings not
fixed. Everything else below is a measurement, not a claim.

Evidence baseline, so that nothing below is an existing failure of a check:

```
$ uv run python -m textbook.pipeline --book maths-applied --out /tmp/ma
pages 16                                        (no math-error, 0.47s)

$ uv run python -m textbook.lint maths-applied numerical-methods
scanned 50 pages                                (no findings)

$ uv run python -m pytest tests/ -q
8854 passed, 50 skipped, 12 deselected in 785.93s
```

## 1. The phone question: both books are clean, and the tool cannot say so

Every page of `maths-applied` (26) and fifteen of `numerical-methods` (31) were
opened at 390 px and measured for horizontal overflow, the defect that makes a
phone reader scroll sideways and lose the line.

```
$ node /tmp/probe.mjs          # playwright, static server, 390 px viewport
maths-applied        scrollWidth 390 on 26/26 pages, wideTables 0, tableWorst 0
numerical-methods    scrollWidth 390 on 15/15 pages, wideTables 0, tableWorst 0
```

So there is no overflow to fix: every table is inside a `.table-scroll` or is a
`table--cards`, and the widest table is narrower than the viewport before it
scrolls. That is the good news, and it is the whole of the good news on this
question.

The tool that should have told us this cannot check either book:

```
$ node tools/dist/cli.js check-mobile /tmp/ma
FAIL 412px learn      page is 981px wide in a 980px viewport
FAIL 412px practise   page is 981px wide in a 980px viewport
FAIL 480px learn      page is 981px wide in a 980px viewport
FAIL 480px practise   page is 981px wide in a 980px viewport
                                       (same four for numerical-methods)
```

Four failures, none of them the book's. `tools/src/commands/check-mobile.ts`
hard-codes `ROUTES` as `/gcse-maths/higher/chapter-1/section-1.1/{learn,practise}/`;
neither book has that route, so every request 404s into the server's fallback —
a 980 px page — and the measurement reports the fallback's width. The same
hard-coding makes `node tools/dist/cli.js kit /tmp/ma` fail outright:

```
$ node tools/dist/cli.js kit /tmp/ma
page.evaluate: TypeError: Failed to fetch dynamically imported module:
  http://textbook.local/gcse-maths/higher/assets/figures/kit.js
```

`canvas`, `readout` and `audit` do not hard-code a route: they enumerate the
figure modules of the build they are given, and all three ran clean on
`/tmp/ma` (11 figures, 24 readouts, 24 measurements in both schemes). Filed as
item 186: the two commands should derive their routes from the site, not from a
book's name.

**What this means for the two books:** nothing to fix, and no evidence anywhere in
the collection that the phone reading path of these two books has ever been
checked. The four commands that do work are the four that were run.

## 2. §1.2's two answers are now drawn

The chapter's central claim about modelling — *the equations have two answers and
neither is wrong; which assembly the mechanism is in is a fact about the object* —
was carried entirely by a table and a paragraph:

```
| the one the car is built on | (0.68, 0.52) m |
| the other one               | (0.35, 0.17) m |
```

`null-vector` already drew the *consequence* in §1.4: the Jacobian's three rows,
two of them coincident, and the singular direction walking out of the plane. What
no figure drew was the cause. Two circles, two crossings, and the right angle that
turns them into the section's own `along` and `across`.

`books/maths-applied/docs/assets/figures/two-circles.js`, mounted on
`Section 1.2/Deeper/two-solutions`, draws it. Design decisions worth recording:

- **Nothing is typed.** The pivots, both radii and both meeting points come from
  `lowerJoint` and `upperJoint` in `data/mechanism.js` at the design pose, which
  is what the page's own table quotes. `along` and `across` are recovered from the
  chord the two answers subtend, not copied from the solver, so the figure states
  the section's triangle instead of repeating its arithmetic. The six facts are
  declared to `claim()`, and `node tools/dist/cli.js readout /tmp/ma` replays them
  (`7 declare 25 claim(s), 0 state arithmetic and declare none`).
- **The two assemblies are told apart by line style, not by colour.** The upright
  as built is solid and accent; the same rigid part folded down past the lower arm
  is dashed and warning. Colour alone would carry the distinction for nobody
  reading in monochrome, and this is the figure whose entire point is that two
  things look different and are equally valid.
- **It is static.** The claim is pose-independent — two circles meet twice at
  every pose the chapter sweeps — so there is no control to drag, and the frame a
  reader lands on already carries the idea.
- **The legs are named in the legend, not on the drawing.** Both legs are 35 px
  and 63 px long at this scale, and every place beside them is the chord, the
  upright or an arc: the first version put `along` over the pivot dot and `across`
  under the upright. The legend carries the same green swatch and the two numbers.
- **The first answer's label sits out to the right.** That point is on the upper
  arm's circle by definition, so a label directly above it is crossed by the arc
  that proves it.

Measured, both schemes, at three widths:

```
$ node tools/dist/cli.js canvas /tmp/ma
canvas: 11 figures examined, 0 errors, 0 warnings
$ node tools/dist/cli.js audit /tmp/ma
measurements taken: 24 of 24                      (legibility floor 9 px, both schemes)
```

The drawing was also inspected at 390 px in the dark scheme, where the small
labels sit at 10.2 px: above the floor, and the drawing was enlarged to fill the
width rather than sitting in a half-width box (`HEIGHT` 380, `BOX.right` 348) after
the phone capture showed two circles at 44 px radius.

## 3. `numerical-methods` is figure-poor, and the count is the smaller half

`maths-applied` has 11 figure modules for 16 pages. `numerical-methods` has five
for 32:

```
discriminant.js  energy-drift.js  kind-shapes.js  order-rate.js  step-limit.js
```

77 methods and 64 systems, and the figures that exist are the ones that describe a
*shape* (a discriminant's three cases, a kind's shape, a step limit, an order
rate, an energy drift). Nothing draws a *method*: no figure shows a Newton step
crossing an axis, a secant's two points, a Krylov plane slicing a spectrum, a
multigrid restriction, or the difference between a matrix's diagonal and its
off-diagonal splitting. Those are the book's difficult concepts, and each is a
picture that a page currently describes in words. Filed as item 187, with the
shortlist.

## 4. The index page a reader has to scroll

`/techniques/` is the book's front door and, measured at 390 px, it is:

```
23,511 px tall      5,291 words      6 <h2>      77 method entries
```

Ninety-one screens for a page whose job is *find the method you want*. The five
family cards at the top are good and they do that job; below them the marker
`:::method-index` expands every entry into a full row. A reader on a phone cannot
skim the list, cannot jump to a letter, and has no way to narrow it. Filed as item
188: the alphabetical index wants to be collapsible by letter, or to fall back to a
letter picker under a narrow viewport.

## What this pass did not do

The two books' prose, structure, numbers, links and figures were re-read and
re-measured, and no defect was found beyond the four above. That is consistent
with Review IV, which found the prose defects and had them fixed. The finding
worth carrying forward is the shape of the three open items: none is a mistake in
a page, all three are a check that cannot see, a page that cannot be skimmed and a
book that cannot show what it explains.
