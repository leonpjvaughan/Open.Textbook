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

**Every item from 79 to 163 is closed,** each with its measurement, its fix and its
outcome in `.agents/todo-closed.md`, except 164, which the figure check measured and
carries in a debt table. The review that filed 159–161 also carries five design
proposals, which are not items; 163 is the prose half of 154,
measured while closing it, and 164 is the label tail the figure check measured. A new
item goes at the number after the last one, with its diagnosis, its fix and its own
done-means. The
*interactive-aid backlog* — which figures and interactions a book still wants — is
`ideas.md`; it is a plan rather than a defect list, and it is written for the
author choosing what to build next.

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

The five **design proposals** in `research/review/maths-applied-and-numerical-methods-ii.md`
are adopted, and they are in `ideas.md` §12 rather than here, because they are a plan
for how the books *show* mathematics and not defects: inverting the techniques table,
a look-alike per class, retrieval on `symptoms`, a figure readout in the page's own
columns, and the two procedures named once with the number each produced.

---

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

## 165 — `maths-applied`'s required pages are the longest-winded ones, and the tail from 25 to 32 words is unpoliced

**What is wrong.** Measured over prose only — table rows, headings, code, display
maths and directives removed, list items kept — the eight pages a reader of
`maths-applied` has to read average **19.1 words a sentence**, with 18.6% of their
sentences over 25 words; the five pages it calls optional average 16.2 and 11.4%. The
calmest prose in the book is in the pages the book says are not needed. The worst are
the three hardest sections: §1.7 (21.5 words, 23% over 25), §1.2 (20.2, 21%) and §1.6
(19.0, 20%); the chapter index is 21.7 and the Review 19.2.

That is inside the house register ("~15–20 words, one idea each") and outside what the
check enforces: `lint.py:183` fails only a sentence over **32** words, so the tail from
25 to 32 is unpoliced — **57 sentences** across the seven sections.

**The fix.** A ceiling of 25 words on a section page, keyed to the page kind, with the
existing `SENTENCE_DEBT` ratchet so the other books are untouched; then a pass over
those 57. Not a rewrite: the point is that the *required* page should be the easiest
one, and today it is the other way round.

**Done means**

- [ ] `textbook.lint` fails a 26-word sentence on a section page, and `tests/test_lint.py`
      holds that case
- [ ] `maths-applied`'s eight required pages average under 17 words a sentence, with
      under 12% over 25
- [ ] every other book's `SENTENCE_DEBT` is unchanged, and `textbook.lint` is clean

## 166 — `stiff` meets the reader in the wrong sense first, and `discretise` is defined nowhere

**What is wrong.** `stiff` is used **40** times in `numerical-methods`; the first use in
reading order is on the Averaging page (`averaging/index.md:21`), and it means a bush's
*stiffness* — the engineering noun, not the numerical flag. The flag is defined once, in
a table cell on the home page (`index.md:69`, under "Stiff: the model contains a fast
change you do not care about"), which is the one place a definition cannot go: a reader
skimming for a definition does not read a cell in a table of flags.

`discretise` is used **19** times and defined nowhere. Its first use is the sentence on
Averaging that says why averaging is not a field problem.

**The fix.** Each of the three flags the home page's table names — non-linear, stiff,
geometry not known in advance — gets a paragraph of its own, or a page; a flag that
changes the method in every class is not a cell. The bush sense becomes "the bush's
stiffness" everywhere in this book, so one word has one meaning; `discretise` is defined
where it first appears, in one sentence.

**Done means**

- [ ] no table cell carries the only definition of a flag
- [ ] a reader searching the book for `discretise` finds a definition before its first use
- [ ] the word `stiff` is not used of a bush anywhere in `numerical-methods`
- [ ] `textbook.lint numerical-methods` is clean

## 167 — No page carries a contents list, and `techniques` is 23,144px on a phone

**What is wrong.** Heading ids exist, so a fragment works. Nothing prints them:
`:::contents` does not exist anywhere in the engine, and no page carries a list of its
own headings. Measured at 390px:

```
page                              height    h2/h3
/numerical-methods/techniques/    23,144      83
/numerical-methods/              11,388      14
/maths-applied/…/section-1.5/    10,649      14
```

`techniques` is a lookup page with 77 entries; its five class headings are sticky, which
tells a reader which section they are in but not what is in it. The reader's only way to
the right entry is find-in-page or the site search.

**The fix.** A `:::contents` directive reading the heading list the `toc` extension
already produces, printed as a compact two-column list under a page's first paragraph
when the page has more than six `h2`s. It cannot rot, because it is the same list the ids
come from. On `techniques` it is the index the page is missing.

**Done means**

- [ ] `:::contents` renders from the `toc` extension's own list, and a test fails if a
      heading is added and the list is not
- [ ] `techniques` carries it, and the page's height at 390px falls by at least 2,000px
      (the list replaces scrolling, and it is priced, not asserted)
- [ ] a page with six or fewer `h2`s gets no list
