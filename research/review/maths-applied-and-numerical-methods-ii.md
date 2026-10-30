# Review II: Maths Applied and Numerical Methods

A second pass over the two reference-shaped books, for two questions at once:
**what a reader meets before they meet the mathematics**, and **whether the hard
ideas land**.

This is a follow-up to `research/review/maths-applied-and-numerical-methods.md`
(the first pass, 14 items). That file is not edited: this one records which of
its items closed, and what is left that it did not see.

**Nothing was changed.** Every claim below is a command and its output, or a
file and line I read. The two changes I would make first are in
`.agents/todo.md` as items 154 and 155.

Evidence baseline, so that nothing here is an existing failure of a check:

```
$ uv run python -m textbook.lint maths-applied numerical-methods
scanned 49 pages                                   (no findings)

$ uv run python -m pytest tests/test_reference_books.py \
      tests/test_maths_applied_numbers.py -q
82 passed in 3.22s
```

The books: `maths-applied` 16 authored pages and 14,810 words; `numerical-methods`
31 authored pages, 29 of them in `map.yaml`, 32,257 words, 77 method entries.
Between them 22 figure mounts from 20 modules.

---

## Verdict

**The first pass was right about what was wrong, and most of it has been fixed
well.** Headings carry ids, deep links land correctly, sticky headings clear the
masthead, every class page works a number, `LBB` and `CFL` are spelled out, the
photograph is 118 kB instead of 271 kB, the landing-page card says `29 pages / 77
methods`, and the round-off floor is one statement in one unit with a test behind
it.

**What is left is a different layer: the surface a reader meets before any of that
prose.** Four things, in order of cost.

1. **One figure in `maths-applied` draws its content outside its own canvas.** §1.6's
   `dynamics-table` is an empty frame, and 17 of its 22 labels are clipped. The
   section's prose then refers to "each column" of a table the reader cannot see.
   Nothing in `tools` measures where a figure puts its ink, so this shipped and
   stayed shipped.
2. **On a phone, every page of both books opens with the whole book above it.** The
   sidebar becomes a static block above the content at 60rem, so a `numerical-methods`
   page starts with 614–670 px of navigation and its title is at y = 798–854.
3. **The central artefact of `numerical-methods` is starved at every width.** The
   nine-kinds table is 662 px wide in a 1280 px window with 116/184/210/142 px
   columns and 98–154 px rows, and on a phone it is 544 px inside a 358 px scroll
   box. The book opens by telling a reader to read a table's last column first, and
   that table is the hardest object on the page to read.
4. **Two class pages still render a bullet list as hyphens inside a paragraph**, in
   the *signature* section — the three lines that say what makes this class this
   class.

Then, measured rather than fixed: the entry surface is the hardest-reading text in
either book (grade 12.3 on the nine class pages against 9.2 under them), the nine
`signature` sentences exist in eighteen wordings, and the one comparison both
books are built on — an effect against a tolerance — is drawn nowhere.

---

## What closed since the first pass

| First-pass item | Status | Evidence |
|---|---|---|
| B1 heading ids, deep links, sticky offsets | **closed** | 18,579 of 18,622 `h2`/`h3` carry an `id`; `TocExtension` in `pipeline.py:232`; `scroll-margin-top` in `shell.css:56`; `book-local.css` sticky `top` now reads `--tb-masthead-height` |
| B2 terms defined before use | **closed for 5 of 7** | `preconditioner` (`linear-system`), `smoother` (`elliptic`), `Krylov` (`eigenvalue`), `LBB` (`saddle-point:119`), `CFL` as *Courant–Friedrichs–Lewy* (`hyperbolic/the-cfl-condition:42`). `discretise` still has no definition; see N7 |
| B3 a worked number per class page | **closed** | all nine class pages carry `**Worked number.**` |
| B4 the round-off floor in one unit | **closed** | `tests/test_maths_applied_numbers.py:614` `test_the_roundoff_floor_is_stated_once_in_one_unit`; both pages say "the last bit of a double, about 10⁻¹⁶ m" |
| W1 the 271 kB photograph | **closed** | `du -b` → 118,532 |
| W2 the duplicated paragraph | **closed** | §1.6's *Watch out* now states the 0.001° comparison and nothing else |
| W3 the bullet list rendered as hyphens | **not closed** | see N4: `root` and `elliptic` still render it; 6 pages collection-wide |
| W4 `0 chapters / 0 sections` | **closed** | portal card reads `29 pages`, `77 methods` |
| W5 60 unlinked `§`-references | **mostly closed** | 59 of 64 `§1.N` now link |
| W6 no route from a class page to the map | **closed** | 197e1fc8; every class page ends "Back to the map" |
| W7 the five symbols walls | **partly closed** | labelled `**The symbols used above.**` and turned into lists; still below 19 method entries, still not a `<dl>` in a `<details>` |
| T1 "Learn" on every section page | **closed** | masthead names the section; sidebar says `Overview` |
| T2 no stated reading order | **open** | "Three ways in" still lists three lookups and no reading order |
| T3 the chapter problem stated thrice | **closed** | stated once in the masthead of each section (fd4d690d) |

Seven new findings follow. Four are defects with a checkable fix; three are the
design argument the brief asks for.

---

## N1. `dynamics-table` draws its rows below its own viewBox, and no check looks

**Measured, on the built page.**

```
$ # maths-applied §1.6, the dynamics-table figure
{"viewBox":"0 0 560 300","rendered":{"w":560,"h":300},
 "textYs":[304,304,287,35,20,20,20,316,316,316,364,364,364,412,412,412,
           460,460,460,508,508,508],
 "outside":[304,304,316,316,316,364,364,364,412,412,412,460,460,460,508,508,508],
 "minY":20,"maxY":508}
```

**17 of the figure's 22 `<text>` elements are at y = 304…508 in a 300-unit canvas.**
The visible result is an empty bordered box with two rules and two floating column
heads, a slider, and a readout. The row labels — `peak heave`, `resting height`,
`travel`, `period`, `constraint` — and every number beside them are clipped away.

**The cause is one line.** `assets/figures/dynamics-table.js:95`:

```js
const rowY = (index) => box.y0 + 34 + index * 48;
```

`axes()` returns `box` with `y0 = height - margin.bottom` (the **bottom** edge, 282
here) and `y1 = margin.top` (the top, 30) — `assets/figures/src/kit/draw.ts:470`.
So the rows start 34 px *below* the bottom rule and march down the canvas. Every
other module uses `box.y0 + 34` for a single label placed near the bottom inside
the plot, which is why the idiom looked right and is not:

```
$ grep -rn "box.y0 + 34" assets/figures books/*/docs/assets/figures
books/maths-applied/docs/assets/figures/dynamics-table.js:95   ← the only one that steps
books/numerical-methods/docs/assets/figures/energy-drift.js:134
books/numerical-methods/docs/assets/figures/order-rate.js:65
books/numerical-methods/docs/assets/figures/step-limit.js:69
```

**Why no check caught it.** Three run over this figure and all three pass:

- `tools audit` measures the *paint* of every element — contrast and font size. Both
  are fine; an element outside the viewBox is still styled correctly.
- `tools readout --verify` recomputes the arithmetic the figure declares. The
  numbers are right; they are drawn in the wrong place.
- `tools kit site` checks the DOM contract: native controls, one focus stop, a
  static frame. All true.

So the collection has a strong contract on **what a figure says** and on **how it
is painted**, and none at all on **whether it is inside its own canvas**.

**What it costs.** This is the figure for the sentence "the stiffness decides the
motion", the only place §1.6 lets a reader watch a family of runs instead of taking
one on trust. The prose under it says "Each column is an integration, not a
recording" and the caption says "Every column is one integration of the vendored
kernel" — describing columns that are not there. A reader concludes the page is
broken, and the page is the book's only finished section with mass in it.

**The fix, and the check that makes it not happen again.**

1. `rowY` steps down from the top: `box.y1 + 34 + index * 48` (64, 112, 160, 208,
   256 against a box of 30…282). One line.
2. Add the measurement to `tools`, in the shape the other checks already have:
   for every `maths-figure`, take each unrotated `<text>` and every mark's
   `getBBox()`, transform it into the SVG's user space, and fail when it falls
   outside the `viewBox`. A rotated axis label's own `getBBox` is not in the parent
   space, which is why a naive check reports 14 false positives across these two
   books and exactly one true one — the check has to transform, and that is the
   whole work.
3. Add the case to `tests/test_figures.py`, whose contract already pins "a new
   figure cannot repeat a defect the measurement found".

---

## N2. On a phone the book is printed above every page

**Measured at 390 px, on the built site.**

```
route                                          navH  navLinks  h1Top  pageH
/numerical-methods/                             614      31      798   11388
/numerical-methods/root/                        670      31      854    7608
/numerical-methods/techniques/                  614      31      798   23138
/maths-applied/chapter-1/section-1.2/learn/     460      16      644   10649
```

`engine/src/textbook/css/shell.css:253`:

```css
@media (max-width: 60rem) {
  .layout { grid-template-columns: 1fr; }
  .sidebar { position: static; max-height: none; border-bottom: 1px solid var(--tb-rule); }
}
```

The sidebar stops being a column and becomes the first block on the page: at 390 px
a `numerical-methods` page begins with **614–670 px of navigation, 31 links**, and
its `<h1>` is 798–854 px down. The reader's first screenful is the table of
contents, the second screenful is the rest of it, and the page's own title is a
small heading below the fold. On a 23,138 px page (`techniques`), which is a
lookup, that is the whole cost of arrival.

**Why it is worse here than elsewhere.** The shell is shared, so this is every
book's phone layout. It bites hardest where the registry is longest: 31 links for
this book against 16 for `maths-applied` and 7 sections for a course book. The
first pass measured the sticky-heading offset on this same page and did not
measure where the content starts.

**The fix.** Collapse the sidebar behind a native disclosure at phone width — no
script, no focus trap, no ARIA to get wrong:

```html
<details class="nav-drawer"><summary>Contents</summary>…</details>
```

`<details>` is already the collection's progressive-disclosure primitive
(`.md-typeset details` in `extra.css`, used for every folded listing and the
disclaimer), so this reuses a component a reader has already met. The summary line
can carry the book's name and the page's own section, which is the one thing a
reader scrolling a 600 px nav wants and cannot get.

**Done means** the `h1` of `/numerical-methods/` is above 300 px at 390 px, the
drawer is a focus stop that opens with the keyboard, and `tools check-mobile`
still reports 0 pages wider than the screen.

---

## N3. The nine-kinds table is starved at both widths

**Measured on `/numerical-methods/`.**

```
1280px viewport
  table 662 × ~1,200    columns 116 / 184 / 210 / 142    rows 98–154
390px viewport
  .table-scroll   358 wide, scrollWidth 544             rows 210–266
  columns 115 / 113 / 203 / 104                         34% off screen
```

The home page's own words: "Read the last column first: it says how to
recognise the kind from the model in front of you." That column is 142 px at
1280 — about 18 characters — so each cell wraps to five lines and a 126 px row
tall. To compare two rows, which is the only thing a table is for, a reader tracks
across 662 px through five-line cells.

And the 662 px is not a constraint of the screen. At 1280 px the window spends
240 px on the sidebar and leaves roughly 600 px unused, and at 1600 px the table
is still exactly 662 px (measured at both widths). The measure is `70ch` for
prose, which is right, and the table inherits it, which is not.

**This has already been solved once in this exact book, and the fix was not
applied to the home page.** `books/numerical-methods/docs/assets/stylesheets/book-local.css`
carries the record: the A–Z was five four-column tables until 2026-10-27, was
measured "12,500px tall at a 1280px viewport", and became one card per method with
the class heading sticky. The nine-kinds table is the same object — a record per
row, four fields, read one row at a time — and it is the more important one,
because it is the page the book rests on.

**The fix, in the order it should be done.**

1. **Below 60rem, one card per kind**: the kind as a heading (linked), then the
   question, the model, and the recognition line as three labelled lines. That is
   the `techniques` pattern, already written and already measured, and it removes
   the 34% off-screen in one change.
2. **Above 60rem, let a wide table out of the prose measure.** A `table--wide`
   variant that takes the grid column's full width rather than 70ch, capped at
   about 56rem, takes the recognition column from 142 px to roughly 240 px at
   1280 px. The measure rule in `extra.css` already scopes itself to `> p, > ul,
   > ol, > blockquote`, so cells are not the problem; the table's own width is.
3. **State the reading order on the table.** The instruction "read the last column
   first" is in prose above a table whose columns are in the opposite order. Put
   "how you know it is this one" second, or number the instruction against the
   column heading.

---

## N4. Two class pages render the signature's list as hyphens in a paragraph

**Measured on the built pages.**

```
/numerical-methods/root/
  <p>The rule holds at a point, and the point is found — usually by iteration,
     sometimes in closed form. There is no region and no time. The difficulty is:
     - which of the solutions you land in; - whether the Jacobian is invertible
     where you need it; - whether your start is inside the region where the method
     converges.</p>

/numerical-methods/elliptic/
  <p>Two consequences follow: - <strong>Multigrid is not an optimisation of
     another method; …</strong> … - <strong>The solution is smooth even when the
     data is not.</strong> …</p>
```

Six built pages still do this, down from 22: these two and four Irish ones.

**Why it matters more than a missing blank line.** Python-Markdown needs a blank
line before a list, and `lint.py:62` already has the pattern to see a list item
(`LIST_ITEM`) but nothing checks that the list is *preceded* by one. On `root` and
`elliptic` the broken list sits inside **The signature** — the section the home
page tells a reader to read first, and the three lines that state what makes the
class the class. The most important paragraph on the page renders as a run-on
sentence with hyphens in it, and the run-on also breaks the sentence-length
measurement that would otherwise have flagged it (37 words, counted as one).

**Fix.** The blank line on both pages, and the four-line lint rule the first pass
specified, which turns the remaining four defects into a build failure in the same
commit.

---

## N5. Nine signatures, eighteen wordings, and no check that they agree

`map.yaml` gives each class one `signature`, which `:::class` prints under the link
in another book. Each class page also opens with "**You have one of these when**",
which is the same sentence written again. Measured, all nine:

| class | `signature` in `map.yaml` | the page's own line |
|---|---|---|
| Optimisation | One score, one set of choices, and you want the best one. | you can score any candidate answer with a single … |
| Averaging | The answer is a distribution, or an average over what you cannot list. | the answer is not a number but a distribution, or … |
| Eigenvalues | You are asking which values are allowed, not what one of them is. | you ask which values are allowed — which … |
| Linear system | Every rule is linear, and the unknowns are a finite list. | every rule in the model is linear in the … |
| Root finding | A rule has to hold at a point, **and the rule bends with the answer**. | the unknowns are a finite list, the rule is an … |
| Saddle point | A rule holds everywhere, and a second unknown pays for it. | a rule has to hold everywhere, and the model pays … |
| Elliptic | The answer is a value at every point, and nothing travels. | the answer is a value at every point in a region, … |
| Parabolic | The answer moves forward and forgets where it started. | the answer moves forward in time and smooths as … |
| Hyperbolic | The answer moves along paths **and keeps its shape**. | information travels at a finite speed along … |

Two of them do not just differ in wording, they differ in claim. `root`'s
signature adds "the rule bends with the answer", which the page's line does not
say; `hyperbolic`'s signature adds "keeps its shape", which the page's line also
does not say. And the page never shows the sentence other books print about it, so
a reader who arrived from `:::class root` in `maths-applied` and followed the link
meets a page that defines the class in different words.

`tests/test_reference_books.py` already holds the registry, the home page's table
and the nav together. It does not hold the signature to the page.

**Fix.** One sentence per class, printed in both places. The page keeps a
`**You have one of these when**` lead-in and uses the registry's sentence; the
test asserts the sentence appears on the page it names. Where the page needs the
extra clause, the clause goes in the registry.

---

## N6. The entry surface is the hardest reading in either book

**Measured** per page: Flesch reading ease, Flesch–Kincaid grade, and mean words
per sentence, over prose only (tables, code, display maths and link URLs removed).

| group | pages | mean words/sentence | FRE | grade |
|---|---|---|---|---|
| the nine class pages | 9 | **23.7** | 42–56 | **12.3** |
| the twelve detail pages | 12 | 19.1 | 60–72 | 9.2 |
| the seven spine pages | 7 | 19.4 | 54–67 | 8.9 |
| `maths-applied`, main thread | 7 | **21.7** | 58–68 | 9.6 |
| `maths-applied`, depth pages | 5 | 20.0 | 58–73 | 9.3 |

The hardest pages are the ones a lost reader opens: `elliptic` (26.9 words a
sentence, grade 13.7), `linear-system` (24.8, 13.6), `averaging` (26.0, 13.0),
`hyperbolic` (22.9, 12.1), `eigenvalue` (21.6, 11.9). The pages a reader reaches
*after* deciding they are interested — the detail pages, 19.1 words and grade 9.2
— are three reading years easier. The relationship is backwards.

`maths-applied` is the same shape: the main thread averages 21.7 words a sentence
and 24% of its sentences are over 25 words (§1.2 28%, §1.7 30%), while its depth
pages are the calmest prose in the book.

**Why the checks do not see it.** `lint.py:114` fails a sentence over **32**
words. The house contract in `AGENTS.md` says "~15–20 words, one idea each". The
checked ceiling is 60% above the stated one, and at 32 the pages above pass with
"0 long sentences" — which is exactly what the first pass reported. The rules and
the check are measuring different registers.

This is not an argument for a rewrite. It is an argument that the ceilings are in
the wrong place for the pages that matter: the class page is the one place a
reader has no context and no commitment, and it is where the longest sentences and
the most technical nouns are.

**Fix.** Lower the ceiling for a **class page and a section page** to 25 words in
`lint.py`, book by book and page kind by page kind, with the existing ratchet
(`SENTENCE_CEILING` in the same file is already a count that "may only go down"),
so a new book starts at 0 and these two shrink. There are 47 sentences over 25
words across the nine class pages and the seven `maths-applied` sections; that is
a morning's work, and the measurement above says where to start.

---

## N7. `stiff` meets the reader in the wrong sense first, and `discretise` is never defined

The first pass's B2 was closed term by term. Two are left, and one of them is
worse than "undefined":

```
$ grep -rin "stiff" books/numerical-methods/docs --include='*.md' | head -1
averaging/index.md:21:corner whose bush stiffness is only known to within ten per cent is an averaging
```

`stiff` is used 40 times. The first use in reading order is on **Averaging**, and
it means a bush's *stiffness* — the engineering noun, not the numerical flag. The
flag itself is defined once, on the home page, inside a table cell ("the model
contains a fast change you do not care about, and that change decides your step").
So a reader who reads the sidebar top to bottom meets a familiar engineering word
in its ordinary sense eleven pages before the book redefines it, and the
redefinition is in a cell, which is the one place a definition cannot go.

`discretise` is used 19 times and defined nowhere; its first use is on `averaging`
in the sentence that explains why averaging is not a field problem.

**Fix.** The flag gets its own sentence where it first becomes true — the
`optimisation`, `eigenvalue` or `averaging` page carries no flag, so the home
page's "Non-linear / Stiff / Geometry not known in advance" rows deserve one
paragraph each, or a page. And the bush sense is renamed ("the bush's stiffness"
is already how the maths-applied book writes it) so one word has one meaning in
one book.

This is the smallest item here and the one that most of a reader's first ten
minutes turns on.

---

## N8. No page carries a contents list, and the longest page is 23,138 px

The ids exist now, so a fragment works. Nothing prints them. `:::contents` does
not exist anywhere in the engine, and no page carries one.

```
page                          height at 1280   height at 390   h2/h3
/numerical-methods/techniques/     16,812          23,138       83
/numerical-methods/                7,074          11,388       14
/maths-applied/…/section-1.5/      7,449          10,649       14
```

`techniques` is a lookup page with 77 entries and 83 headings; its five class
headings are sticky, which tells a reader which section they are in but not what is
in it. A reference work's central affordance is arriving at the right entry, and
the reader's only tool for that here is the browser's find-in-page or the site
search — which is a real tool and is why this is worth doing rather than blocking.

**Fix.** A `:::contents` directive, reading the heading list the `toc` extension
already produced, printed as a compact two-column list under the page's first
paragraph when a page has more than six `h2`s. It cannot rot, because it is the
same list the ids came from. On `techniques` it is the index the page is missing;
on a class page it is the eleven-heading map, which is the page's contract and is
currently invisible.

---

## N9. The one comparison both books are built on is drawn nowhere

`maths-applied` §1.5 is the chapter's centre, and its answer is a comparison: the
effect a simpler model leaves out, against the tolerance the question asks for.
The numbers are all in tables:

```
| 0.2 MN/m | 6.1 mm | −1.91° | −0.91° | 1.96° |
| 100 MN/m | 0.012 mm | −1.00° | −0.002° | 1.91° |
| Bush stiffness for a tenth of a degree at rest | about 1.8 MN/m |
| Bush stiffness for a tenth of a degree in the change | 0.2 MN/m or softer |
```

and no figure in either book plots an effect against its tolerance:

```
$ grep -rn "tolerance\|threshold\|0\.1" books/maths-applied/docs/assets/figures/*.js
dynamics-table.js:33:const DESIGN = 0.1;          ← a stiffness, not a tolerance
stiffness-agreement.js:46:    min: 0.1,           ← a control's minimum
kernel-camber.js:168:  "inside the tenth of a "   ← prose in a caption
```

`stiffness-agreement` is the figure for this section and it plots what the section
is *not* about: camber against travel, two curves converging. The reader is asked
to hold 1.96, 1.91, and 0.1 in working memory and do the subtraction and the
comparison themselves — and the section's own punchline is that the same tolerance
attached to two different quantities gives answers **nine times apart**. That is
the hardest idea in the book and it is currently a table.

**The figure that carries it**: stiffness on a logarithmic x-axis, |difference from
the rigid model| on a logarithmic y-axis, two curves — "at rest" and "change over
the travel" — and a horizontal dashed rule at 0.1°. The two crossings are the two
answers, 1.8 MN/m and 0.2 MN/m, and the nine-times gap is a distance on the page.
Nothing in the prose changes; the numbers already exist in the model the page
imports, and the crossing is found by bisection over the same `compliant()` call
the existing figure uses.

**The same shape is missing in `numerical-methods`, once.** `elliptic` says "needs
as many steps as the mesh is wide in every direction", `step-limit` counts steps
against the mesh, and no page puts a method's cost beside the tolerance the reader
needs. The book's own thesis sentence — "You do not need the best method. You need
the method that answers your question" — has no picture, in a book where every
class page has one.

---

## What would make the hard concepts easy

Five proposals, each with the principle it leans on and the reason it applies to
*these* books rather than to a textbook in general. None is a rewrite; four are
markup or one figure.

### 1. Turn the technique table's key around

Every class page's techniques table is keyed by the **method**: `| technique | what
it does | when it wins | when it is the wrong tool |`. A reader arrives holding a
*model* — "sparse, symmetric, indefinite" — and has to read eleven rows to find the
two that apply. `linear-system` already contains the inverted form as a bullet
list ("Dense and small", "Sparse and large", "Symmetric positive definite",
"Symmetric indefinite", "Rectangular"), which is the reader's own vocabulary, but
those five bullets do not name a method and the eleven methods do not name a
property.

Merging them is one table:

| what your matrix is | the methods that fit | the price |
|---|---|---|
| dense and a few thousand | LU, Cholesky | cubic, once |
| sparse and large | CG (SPD), GMRES (general), preconditioned | the iteration count is the flag |
| symmetric indefinite | MINRES, a block method | see the saddle point |

The principle is **recognition over recall** (Nielsen; and the same distinction
Chi, Feltovich & Glaser 1981, doi:10.1207/s15516709cog0502_2, measured when expert
physicists sort problems by principle and novices by surface feature). A reference
work that sorts by the method's name asks a reader to already know the answer.
Keeping the method-keyed table as well is fine — one is a lookup, the other is a
recognition aid — but the book's own rule against ranking methods is not at risk
either way: both tables state a price, not a winner.

### 2. Give each class one look-alike it is not

The book has `worked-case`: one corner, five kinds, the right direction. It has no
page in the other direction — one kind, and the look-alikes a reader will confuse
it with. Classification is learned by discriminating near-misses, not by reading
definitions, and the book's own evidence for that is in it: `choosing-the-class`
takes the Einstein equations, writes them two ways, and shows the one sign that
decides the class. That page is the best teaching in the book and it appears once.

A **"this, not that"** row on each class page, in the book's existing format and
two lines long:

> **Root, not linear system.** A rule that bends is iterated; a rule that is
> linear is solved. If every row is a sum of the unknowns, the iteration is doing
> nothing but rediscovering a factorisation.

Nine of those is nine minutes of work and gives the map the second axis a map
needs: not only "which box am I in" but "which neighbouring box will I mistake
this for".

### 3. Make the recognition a retrieval exercise that needs no JavaScript

The label `Systems that live here` lists 5–8 systems per class, 64 in the book,
and they are the ideal self-test: a system, and the class it belongs to. Today they
are a flat list inside a class page, so they confirm a class the reader has already
been told.

The same content, asked the other way, is retrieval practice with feedback — the
one thing `research/pedagogy.md` P4 asks of every page and the one thing a
reference work cannot do for itself:

```markdown
<details markdown="1">
<summary>A tyre's slip angle at a given load</summary>

[Root finding](../root/index.md). The rule holds at a point, and nothing travels.
</details>
```

Native `<details>`, no script, works with scripting off, and the answer is a link
into the page that argues it. Ten of these on `symptoms` — which is entered by a
wrong answer, the one moment a reader is most motivated — turns the book's weakest
page into its best exercise. The evidence that this is worth the space is Rohrer
& Taylor (2007, doi:10.1007/s11251-007-9015-8) and the whole of P4; the reason it
fits *this* book is that the answers are already written and already linked.

### 4. Give a figure's readout the page's own columns

`wishbone-hero` prints five quantities in **six sentences and about 90 words**:

> At 0 mm of travel the lower arm has turned through −0.00 degrees. Camber is 1.00
> degrees inboard of vertical, which is 0.00 degrees from where it sits at rest.
> The instant centre is 1.60 m inboard of the car's centreline and 0.06 m above the
> ground, so the roll centre is 19 mm above the ground. The track has moved by 0.0
> mm. The solid tyre is where it is now; the dashed one is where it sits at rest.
> The thin dashed lines run to the instant centre, which is off the drawing.

The page's table prints the same five quantities in **five columns**: wheel travel,
lower arm turns, camber, instant centre, roll centre. So the reader who wants the
number the figure is showing must parse a sentence for it, and then convert
between two presentations of one quantity: the readout gives a **magnitude and a
direction word** ("1.00 degrees inboard"), the table gives a **signed number**
("−1.00°"), and §1.1 makes the sign convention its first *Watch out*.

A readout of five label/value rows, in the table's order and the table's signs,
gives the reader the number in one glance, in the notation the rest of the chapter
uses. The principle is **spatial contiguity** and **signalling** (Mayer, *Multimedia
Learning*): a number belongs next to its label in the same visual form as the text
it is compared with. The kit's `label()` already draws exactly this; `dynamics-table`
is already shaped as label/value rows, once its rows are on the canvas (N1).

`quarter-car`, `kernel-camber` and `stiffness-agreement` have the same habit: a
readout that is a paragraph. None is wrong; all of them ask a reader to do
extraction work at the exact moment the figure exists to remove it.

### 5. Name the two procedures, once, and give each the number it produced

`maths-applied` teaches two distinct procedures and presents them as one.

| the procedure | the question it answers | the number that earned it |
|---|---|---|
| **the tolerance comparison** — measure the effect the simpler model leaves out, compare it with the tolerance the question asks for, and make sure the tolerance is on the quantity the question is about | which model do I need? | 1.8 MN/m against 0.2 MN/m, nine times apart |
| **the limit test** — take the parameter to the edge and check the model becomes the simpler one it should | is this model the generalisation of that one? | 1.91° at 100 MN/m against 1.95° rigid, monotone over four stiffnesses |

The first is stated inside a table caption in §1.5 and restated in the Review. The
second is the Review's *Reflection* — "Take the parameter to the edge and check the
model becomes the simpler one it should become" — presented as though it were the
same sentence in other words. They are two, and a reader who leaves with one of
them is missing the other.

A boxed panel at the end of §1.5, four rows of the table above, and the Review
points at the panel. This was the first pass's second design proposal and it is
still the highest-value edit in either book, because it is the only content here a
reader can take to a *different* mechanism — which is what a book about modelling
is for.

---

## What I would not change

- **The chapter's structure in `maths-applied`.** A model earns its place by
  failing, and the failure is stated before the replacement. That is refutation-text
  structure, which is the best-evidenced way to move a reader off a wrong mental
  model (Guzzetti, Snyder, Glass & Gamas 1993, doi:10.2307/747886), and §1.3's
  redundancy and §1.4's diagnosis are the chapter working exactly as designed.
- **The nine boxes, and `kind-shapes` as a gallery.** The decision record in
  `books/numerical-methods/AGENTS.md` is right, and the figure is the right answer
  to "what does an answer look like" as long as nobody adds arrows to it.
- **`worked-case` and the `:::class` / `:::used` pair.** Two books wired to each
  other in both directions, with the numbers travelling. That is the collection's
  most interesting structural idea and it is working.
- **The figure vocabulary.** 22 mounts, every one above its contrast floor in both
  schemes at 390 px. N1 is one module's arithmetic, not a fault in the kit or the
  contract.
- **The prose in the detail pages.** 19.1 words a sentence, grade 9.2, on the
  hardest mathematics in either book. That is the model the class pages should be
  brought to, not the other way round.

---

## Method

**Run.**

- `uv run python -m textbook.lint maths-applied numerical-methods` → 49 pages, no findings.
- `uv run python -m pytest tests/test_reference_books.py tests/test_maths_applied_numbers.py -q` → 82 passed.
- `node tools/dist/cli.js screenshot site /tmp/shots …` for six routes, then a
  Playwright script of my own over both books' built routes at 390 and 1280 px for
  the nav, table, heading and page-height measurements. The figure sweep transforms
  no labels: it reads each `<text>`'s own `y` attribute and skips every text with a
  `transform`, which is why it reports one true positive (17 elements) instead of
  fourteen.
- A sentence and readability pass over every page in both books: prose only, tables
  and code and display maths and URLs removed, syllables by vowel group. The same
  pass at 25 words is what N6's fix would enforce.
- `grep`, `du -b`, `git log -L` for the provenance of `dynamics-table`'s `rowY`
  line (present since the file was created, `d95a3d98`).
- DOIs in this file were resolved against `api.crossref.org` on 2026-10-28 and the
  title, journal and first three authors checked against what is printed above.

**Not measured, and said so.**

- **No reader and no learning outcome.** Nothing here is evidence that these books
  teach; it is evidence about which defect costs a reader most. The design section
  leans on recognition-over-recall, retrieval practice, refutation text, and
  spatial contiguity, and on P4 and P6 of `research/pedagogy.md`.
- **No screen reader.** The `<details>` proposal in 3 is keyboard-native, but I did
  not test its announcement.
- **No print.** The print sheet rules exist in `extra.css` and I read them; I did
  not render a PDF of either book.
- **`maths-applied` §1.7** is an outline on purpose and is not treated as unfinished.
