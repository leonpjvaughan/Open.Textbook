# Review IV: Maths Applied and Numerical Methods

A fourth pass over the two reference-shaped books, after
`maths-applied-and-numerical-methods.md` (14 items),
`maths-applied-and-numerical-methods-ii.md` (10 findings, 5 designs) and
`maths-applied-and-numerical-methods-iii.md` (6 findings, 2 indexes). Those three
are not edited. This pass asks a question the earlier ones answered as a premise
rather than as a measurement:

> The content is in good shape. Is the **text**?

The second review wrote "the class pages' difficulty is not in their sentences",
and the third wrote "the content is in good shape: every class page works a
number, every figure has a static frame". Both were about structure and about
what a page contains. Neither had scanned what a reader's eye lands on: literal
asterisks, unclosed emphasis, a sentence with no space after its full stop, and a
reference printed as `[§1.3]` because its link target had been lost.

It was not in good shape. `maths-applied`'s main thread carried **26** of those
defects across eight pages of the chapter — every section page and the Review —
and the map's system index printed raw markdown for two of its 64 entries. Every
one renders without an error, so no check in the collection could see it.

**Changed in this pass:** eleven files of `maths-applied`, eleven of
`numerical-methods`, the `:::systems` hook, the shared stylesheet, two tests, and
the `:::contents` list on the six long section pages. The rest is recorded here
and filed as items 175–177.

Evidence baseline, so that nothing below is an existing failure of a check:

```
$ uv run python -m textbook.lint maths-applied numerical-methods
scanned 50 pages                                     (no findings)

$ uv run python -m pytest tests/ -q
8807 passed, 50 skipped, 12 deselected in 778.48s

$ grep -rl math-error site/maths-applied site/numerical-methods --include='*.html'
                                                     (nothing)
```

Every measurement below is against the built site with the same route handler the
figure audits use, at 390 and 1280, and the pages were rebuilt with
`python -m textbook.pipeline --book <id>` before each number was taken.

---

## Verdict

**The pages were sound and their prose was not.** Three sentences in
`maths-applied` printed their own markup — `**This chapter's question.`, a stray
`****`, and one sentence with a broken code span in the middle of the agreement
panel — and thirteen sentences ran into the one after them. Those are the pages
that carry the chapter's argument: §1.1's statement of the question, §1.3's claim
about round-off, §1.5's punchline about the two tolerances, §1.6's statement of
what the dynamic model agrees with. A reader can follow all of them, and two of
them look like a book that was assembled by a script.

The cause is visible in the shape of the damage. A pass that rewrote long
sentences replaced the sentence's text and re-wrapped the paragraph, and where it
landed on a boundary it took a `**` or the space after a full stop with it:

```
the words.A car's front corner is a mechanism of seven parts
notices.A soft bush of 0.2 MN/m shifts the whole curve
a model earns its place by failing, and that agreement is a number.[§1.6]'s
travel.****
There is one residual vector and one set of singular values per Newton step.js`,
```

The second half of the verdict is about **ways to see**. A reader arriving at a
6,500–12,900px page on a phone had no list of its own sections; a five-column
table cut its last column off at 390px, in the section whose whole point is that
column; and a table of 64 systems contained one cell of 342 characters. None of
those is a content problem, and all three are the reading surface.

## N1. Twenty-six marks that render as themselves, in the pages that argue the chapter (fixed)

Two scans, both on the source, both written as a test in this pass:

| shape | before | after |
|---|---|---|
| a sentence run into the next (`it.A projection`) | **13** | 0 |
| an unclosed `**` (`**This chapter's question. It is …`) | **3** | 0 |
| two bold runs touching (`travel.****`) | **1** | 0 |
| a section reference with no link target (`[§1.3]`) | **9** | 0 |

Measured against `2b819f20`, the commit before this pass, by joining wrapped lines
back into paragraphs so a boundary could not hide at a line end. By page:

| page | what a reader saw |
|---|---|
| §1.1 | `**This chapter's question. It is [the chapter problem] and this section …` — the marker, printed at the start of the paragraph that states the question |
| §1.2 | `that [§1.3] meets` — square brackets, no link |
| §1.3 | `It is worth knowing the difference.A residual that` … and, in the agreement panel, `per Newton step.js`, and it does carry `iterations`: per Newton step.` |
| §1.4 | `**Deleting a row is only safe when it is the spare one. Delete a row …` — the warning about dropping the wrong row opened with two asterisks |
| §1.5 | `notices.A soft bush`, `the second.A reader`, `"more correct".Which model`, `[§1.2]'s model` |
| §1.6 | `settled?Nothing`, `number.[§1.6]'s agreement`, `travel.****`, `keeping.**[§1.2]'s`, `decides the motion.A reader`, `far.**A sideways` |
| §1.7 | `more true.A full vehicle model` |
| Review | `` `tests/test_maths_applied_ladder.py`.The page's front view `` |

The §1.3 panel is the worst of them, because it is the page's evidence against a
secant model: it printed a fragment ``.js`, and it does carry `` and then a
**second** copy of the same sentence. That is a sentence that was replaced by
index and not removed.

The fix is the text, restored by hand, with the nine bare references made into
links to the pages they name — which is also the way a reader wants to use them.
The §1.6 equation's symbols were repaired at the same time: the prose named `J`,
`f` and `g` while the equation wrote `Φ_q`, `Q` and `Φ(q)`, so the one equation
the section turns on used five symbols for three quantities.

**The check is the important half.** `tests/test_content_hygiene.py` gains four
rules, each with the page it was found on named in the docstring: no paragraph
with an odd number of `**`, no four asterisks in a row, no sentence boundary
without a space, no `[§…]` without a target. They are source rules and not output
rules because the output has no trace of a space that should be there. Each was
checked by re-introducing the defect it catches. A false-positive survey over
every book found 43 candidates, all of them initialised acronyms (`A.C.`,
`R.M.S.`) or the name `Open.Textbook`, so the rule skips an acronym line and
allows the licence holder.

## N2. The system index printed raw markdown, and one of its cells was a paragraph (fixed)

`:::systems` derives the index from the class pages' own bullets, which is the
right design and is what makes it impossible to fall behind. It reduced links and
`$…$` to their text and left everything else:

```
The `double-wishbone` example&#x27;s Jacobian: … of which **161 are not zero** — …
```

Two entries carried markup into the page (`linear-system`, `elliptic`), and the
same bullet in `linear-system` was **342 characters** against a median of **58**
for the other 63 — a paragraph in a table of system names, and one that repeated
the page's whole argument about sparsity.

Three fixes, in the order the rules wanted:

1. **`_plain` strips what the index cannot render** — backticks, `**`, `*…*` —
   next to the link and maths reduction it already did.
2. **The bullet became a system name** — `21 equations, 161 of 441 entries
   non-zero` — and the explanation moved to the class page's *What it becomes on
   a computer*, which is the paragraph a reader reaches when they have the
   question. The `worked-case` link that was in the bullet went with it, to a
   sentence where it reads as a reference rather than as a footnote.
3. **A cap, tested.** `MAX_SYSTEM = 120` in `tests/test_reference_books.py`,
   with the index's own numbers in the docstring: the median is 58, and the
   longest honest row ("linear stability of a flow, where the eigenvalues of the
   linearised operator decide whether a disturbance grows") is 111. The index
   now has no entry over 120 and none carrying a mark.

## N3. A table five columns wide cut off the column the section was about (fixed)

§1.5's bush ladder at 390px:

```
container  x=16  width=358
table      width=473, scrollWidth=473
columns    Bush stiffness      x=18   w=90
           Bush deflection     x=110  w=101
           Camber at rest      x=213  w=84
           Difference at rest  x=299  w=104
           Change over travel  x=404  w=83      ← the viewport is 390
```

The fifth column began **past the right edge**, and the section's surprise is in
that column: the bush *shifts* the curve and barely *tilts* it, which is why the
softest exported row already meets the tolerance. A reader on a phone saw four
columns and an edge.

The engine already had the answer — `<!-- table: cards -->` turns each row into a
labelled card below 60rem — and it did nothing, because the **presentation** of
that class lived only in `books/numerical-methods/docs/assets/stylesheets/book-local.css`.
The marker is read by the pipeline, so every other book emitted a class no rule
matched. Measured on the ladder: 473px, then 358px after the move, with all five
values labelled and none hidden.

So the phone card layout moved to `assets/stylesheets/extra.css`, where a shared
component belongs, and what stays in the book's own stylesheet is what is about
*that* table (the nine-kinds grid's content width and its four column widths).
The move is behaviour-preserving for the page it was written for: the nine-kinds
table measures 930px tall at 390 with rows 95/96/112/96/112/113/96/96/112 before
and after.

**Sixty-eight tables across the two books were then measured, and eighteen of them
in eleven pages were wider than their container** — the §1.5 ladder above, then
seventeen more up to 172px over: the five-column *four models* table in §1.1's
depth page, the *slicing* table on `choosing-the-class`, and all five symptom
tables on `symptoms`. Each is a row of records, so each now carries the marker.
After: **no table in either book is wider than its container at 390px.**

## N4. The six longest pages had no list of their own sections (fixed)

`maths-applied`'s section pages are the collection's longest reading unit that is
not an index — 6,573 to 12,870px at 390, with 9 to 11 `h2`s — and none of them
carried the **On this page** list the engine has had since the third review. The
list is derived from the headings, so it cannot fall behind; it was simply never
asked for. The six pages now carry it, and every list matches its page:

| page | h2 | list items |
|---|---|---|
| §1.1 | 9 | 9 |
| §1.2 | 11 | 11 |
| §1.3 | 9 | 9 |
| §1.4 | 11 | 11 |
| §1.5 | 10 | 10 |
| §1.6 | 10 | 10 |

`numerical-methods` has the same gap at a larger scale and it is **not** fixed
here, because whether every class page wants a list of its ten fixed headings is
a design question rather than an omission — item 177.

## N5. Two cross-book references named a page without linking it (fixed)

A reference work that says "§1.5 prints the same ladder" and does not link §1.5
asks the reader to leave, find the other book and guess the URL. `root`'s
counterexample, the stiffness and frequency sections in `worked-case`, and the
agreement panels in `checking` were all prose-only in the map. Six of them are now
links, and the `worked-case` link moved out of a systems bullet and into the
sentence that uses it.

## N6. One defect the four source rules could not catch (recorded)

`:::systems` was fixed by N2, but the *class* it belongs to is "a derived page
inherits the source's raw characters". A source rule cannot see it, because the
source is correct. What holds it now is one test on one hook.

There is no general check for the next derived page. The two in the collection are
`:::used` (built from `:::class` callbacks, whose text is a registry signature)
and `:::systems`; both are now held, by different tests, at the two ends. That is
adequate rather than systematic, and it is written here rather than queued because
the fix would be a render-and-scan over every page — 4 minutes of test time for a
class of defect that has appeared twice.

---

## What remains, and the three I would file

### 1. The hardest idea in `maths-applied` is drawn nowhere — item 175

§1.4 is the page where a reader meets a singular value decomposition, a left null
space, and the sentence "the two legs are one equation". It has one figure,
`wishbone-3d`, and that figure is about the legs in three dimensions, not about
the decomposition. The three rows of the Jacobian, the fact that two of them are
equal, and the direction `(0.707, −0.707, 0)` in which they cancel are all text:

```
Which combination? That is a vector in the left null space, and here it is:

$$ w = \left(0.707,\ -0.707,\ 0.000\right). $$
```

A reader who does not already know what a null space is has to build one from a
sentence and a row vector. Three short lines drawn as three arrows with the
cancelling pair marked would carry it in one glance, and the numbers are already
on the page and already verified — `tests/test_maths_applied_numbers.py` computes
the singular values and the null vector.

This is the one finding I would spend a figure on, and the reason it is an item
rather than a paragraph is that a figure here has to obey `assets/AGENTS.md`
(`SIZE`, `label()`, `scale()`, both schemes, 390px, a static frame) and declare
its arithmetic through `claim()`.

### 2. A table wider than a phone has no gate — item 176

Sixteen tables in these two books, two more in a 150-page sample of
`proofs` and `a-level-maths` (27px on `chapter-11/review`, 5px on
`chapter-13/section-13.3`). `check-mobile` cannot see them: a table inside
`.table-scroll` never widens the page, by design, so the check that exists is
satisfied by the very wrapper that hides the problem.

The measurement is one `getBoundingClientRect` per table at 390. The rule would be
`scrollWidth > clientWidth` on any table that is not `table--cards`, and the fix
for each is either a marker or a shorter header. Not filed as a defect in these
two books, which are now clean, but as a gate the collection lacks.

### 3. `:::contents` is opt-in, and 767 pages are over its own threshold — item 177

`hooks/contents.py` says a page with fewer than five `h2`s gets nothing, and
renders the list only where the page writes `:::contents`. Measured over every
book: **767 pages** carry five or more `h2`s and no marker, including all nine
class pages in the map (11 on `averaging`) and 21 pages of the proof book.

So the engine has a threshold and the pages decide for themselves. Either the
list is furniture that a page should ask for, and 767 pages have correctly not
asked, or it is what a long page owes a reader, and the hook should render it
without being asked. The six pages changed here are the argument for the second:
they are 6,500–12,900px long, and the list is nine lines.

---

## What I would not change

- **The derived indexes.** `:::systems` printing raw markdown was a defect; the
  design that produces it from the class pages is not. One source of truth, and
  the index cannot fall behind — the reason both defects were one-line fixes.
- **The `Worked number` line, the nine headings, the look-alike sentence.** All
  three do work no other element does, and none of them was touched.
- **The `<details>` retrieval on `symptoms`.** Ten answers behind native
  disclosure, no script. It is the one place in either book where the reader
  produces the classification rather than reading it, and it survived this pass
  unchanged.
- **The number of `h2`s.** §1.2's eleven headings are eleven different jobs, and
  the page reads better for them. The answer to a long page is a list of its
  sections, not fewer sections — which is why N4 is a list and not a merge.

## Method

- The markup rules were run against `2b819f20` (the commit before this pass) and
  against the working tree, over both books, joining wrapped lines into paragraphs
  first. A line-based scan under-reports: three of the thirteen boundaries only
  appeared once the paragraph was joined.
- Table geometry is Playwright's, at 390×900 and 1280×900, against `site/` served
  by request interception. Each table's `scrollWidth` was compared with its
  parent's `clientWidth`, and the columns' `x` offsets read off for the one case
  that needed a number in the prose.
- The card layout's move was verified by before/after measurement of the page it
  was written for, not by eye: the nine-kinds table's height and every row height
  are identical.
- Every page was rebuilt with `python -m textbook.pipeline --book <id>` after the
  edits; `textbook.lint` is clean over 50 pages; `math-error` appears in neither
  book; the whole suite passes (8807 passed).
- What was not measured: whether a card reads better than a scrolling table for
  the five-column ladder. That needs a reader, and the fallback is one marker per
  table in the source.
