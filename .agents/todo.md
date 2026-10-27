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

**Items 79–123 are closed,** each with its measurement and fix in
`.agents/todo-closed.md`; 136 and 137 below are open; everything before them is closed. The
*interactive-aid backlog* — which figures and interactions a book still wants — is
`ideas.md`; it is a plan rather than a defect list, and it is written for the
author choosing what to build next.

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

## 136 — Most books' formulas name none of the symbols they use

**What is wrong.** The rule is now written down — "every symbol in a formula is
defined where the reader meets it" — and only the two reference books follow it.
The rest of the collection carries a large number of displayed formulas whose
letters are never named. Measured by counting `$$` pairs and table rows that open
with maths:

```
$ for b in books/*/; do ...; done
a-level-maths        2251 display formulas   98 table rows with maths
ie-jc-maths          2498                   32
ie-lc-maths          2158                   81
ie-lc-physics        1585                   10
ie-lc-applied-maths  1447                   37
a-level-physics       586                    2
gcse-physics          373                    0
gcse-maths            306                   10
proofs                174                    3
maths-applied          24                    0
numerical-methods      19                    3
```

`numerical-methods` is the one book whose formula tables now carry a **The symbols**
list (`techniques/index.md`, five sections). The others were written under the old
rule, so a formula like `$v = u + at$` reaches a 14-year-old with three letters and
no definitions.

**The fix.** Sweep book by book, starting with the four Irish books and
`a-level-maths`, whose pages are the formula-dense ones. For each displayed formula
add a `where …` clause, or one **The symbols** list under a table of formulas. A
symbol defined in the question stem of a worked example counts as defined, so the
sweep is over displayed formulas rather than every `$…$`. Editorial decisions —
which symbols a page should rename for consistency — are part of it, not a blocker.

**done means**

- [ ] every displayed formula in each book is followed by a definition of each
      symbol it uses, or sits under a table that has one
- [ ] no page defines the same letter twice for different things in one section
- [ ] `textbook.lint` reports nothing for each book as it is swept
- [ ] the inventory above is re-measured and each book's row is closed with its
      count, in `.agents/todo-closed.md`

## 137 — The A–Z table is clipped on a phone, and the formula is the column that goes

**What is wrong.** `books/numerical-methods/docs/techniques/index.md` is four
columns of dense content, sized for a desktop. At 390px the table is 650px wide
inside a 358px scroll box:

```
$ node var/measure-z.mjs
{"viewport":390,"data":[{"tableWidth":650,"boxClient":358,"boxScroll":650}]}
```

So 45% of it is off-screen, and the reader's first sight is a table whose second
column is cut mid-word — the screenshot that prompted this reads "ass | the step,
in symbols | what … and c". The horizontal scroll exists (`.table-scroll`) and the
page does not overflow, so `check-mobile` passes: the defect is legibility, not
layout, and no check can see it.

**The fix, and the choice it needs.** Either (a) turn each table into a card per
method below ~44rem — the method as a heading, the class as a link, the formula as
a display line, the price as a sentence — which is what a reader on a phone
actually wants, or (b) keep the table and drop the `class` column below `44rem`,
since the class is already the section heading above it. (a) is more work and much
better; (b) is a rule in `book-local.css` and no content change. Decide with the
section's own reading in front of you, then measure both widths again.

**done means**

- [ ] at 390px a reader sees the method, the formula and its price without a
      sideways scroll, in both schemes
- [ ] the symbol lists under each table stay full width and read as prose
- [ ] `node tools/dist/cli.js check-mobile site` still reports 0 errors
- [ ] the A–Z's five tables still fit at 1024px and 1280px, with no scroll

