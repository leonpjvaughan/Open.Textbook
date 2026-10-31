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

**Every item from 79 to 164 is closed,** each with its measurement, its fix, its outcome
and its ticked done-means in `.agents/todo-closed.md`. Items 165–174 are open: three
defects the second review measured (165–167), five designs it proposed (168–172), and the
two ways into the map the third review measured (173–174). A new item goes at the number after the
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

The five **design proposals** in `research/review/maths-applied-and-numerical-methods-ii.md`
are adopted as items **168–172**, listed in the paragraph above; `ideas.md` §12 holds the
argument and the citations, and the review holds the measurement. The two indexes in
`research/review/maths-applied-and-numerical-methods-iii.md` are items **173–174**, and that
review holds their measurement.

---

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

**What is wrong.** `grep -rhoi stiff books/numerical-methods/docs` finds **40**: 24
`stiff`/`Stiff`, one `stiffly` and 15 `stiffness`. The first use in reading order is on the Averaging
page (`averaging/index.md:21`), and it means a bush's *stiffness* — the engineering
noun, not the numerical flag. The flag is defined once, in
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
/numerical-methods/techniques/    22,574      83   (h2: 6, the rest h3)
/numerical-methods/              11,388      14
/maths-applied/…/section-1.5/    10,649      14
```

`techniques` is a lookup page with 77 entries; its five class headings are sticky, which
tells a reader which section they are in but not what is in it. The reader's only way to
the right entry is find-in-page or the site search.

**The fix.** A `:::contents` directive reading the heading list the `toc` extension
already produces, printed as a compact two-column list under a page's first paragraph
when the page has **six or more** `h2`s — six, not "more than six", because `techniques`
has exactly six and is the page this exists for. It cannot rot, because it is the same
list the ids come from.

**Done means**

- [ ] `:::contents` renders from the `toc` extension's own list, and a test fails if a
      heading is added and the list is not
- [ ] `techniques` carries it, and the page's height at 390px falls by at least 2,000px
      (the list replaces scrolling, and it is priced, not asserted)
- [ ] a page with five or fewer `h2`s gets no list

## 168 — Every class page's techniques table is keyed by method, so a reader who has a model reads eleven rows

**What is wrong.** A reader arrives at a class page holding a property of their matrix —
sparse, symmetric, indefinite — and the table is keyed by the **method**:
`| technique | what it does | when it wins | when it is the wrong tool |`. `linear-system`
already carries the inverted key as five bullets ("Dense and small", "Sparse and large", …),
but those do not name a method, and the eleven methods do not name a property. Recognition
over recall (Chi, Feltovich & Glaser 1981): a reference work that sorts by the method's name
asks the reader to know the answer before they can look it up. The argument and the evidence
are `research/review/maths-applied-and-numerical-methods-ii.md`'s first proposal and
`ideas.md` §12.1.

**The fix.** One table keyed by the property — what your model is, the methods that fit, the
price — on each class page. The method-keyed table stays as the lookup; both state a price and
neither ranks methods, so the book's rule against a league table is not at risk.

**Done means**

- [ ] each class page's techniques section opens with a property-keyed table, and the
      property names are the ones the class page's own bullets use
- [ ] every method in the method-keyed table appears in the property-keyed one, and a test
      fails if one does not
- [ ] no row states that a method is best

## 169 — No class page names the look-alike it is most likely to be mistaken for

**What is wrong.** Classification is learned by discriminating near-misses, and the book has
no page in that direction: `worked-case` takes one corner and five kinds (the right
direction), and nothing takes one kind and the look-alikes a reader will confuse it with. The
map therefore has one axis — "which box am I in" — and not the second one, "which neighbouring
box will I mistake this for". `research/review/…-ii.md`'s second proposal.

**The fix.** A two-line **"this, not that"** row on each class page, in the book's existing
format, naming the class a reader is most likely to have instead and the one fact that
separates them: "**Root, not linear system.** A rule that bends is iterated; a rule that is
linear is solved."

**Done means**

- [ ] all nine class pages carry the row, each naming a different neighbour
- [ ] the neighbour it names is a class the page already links, so the reader can go there
- [ ] `tests/test_reference_books.py` fails if a row is missing or names a class that is not
      in the registry

## 170 — `symptoms` lists the systems instead of asking the reader to classify one

**What is wrong.** `Systems that live here` on each class page lists 5–8 systems per class, 64
in the book — and they confirm a class the reader has already been told. The same content
asked the other way is retrieval practice with feedback, which is what P4 asks of every page
and the one thing a reference work cannot do for itself. `symptoms` is entered by a wrong
answer, which is where a reader is most motivated and where the book currently has no
exercise. `research/review/…-ii.md`'s third proposal, `ideas.md` §12.3.

**The fix.** Native `<details markdown="1">` on `symptoms`: the system as the summary, the
class and the one-line reason as the answer, linking the page that argues it. No script, and
the answer already exists.

**Done means**

- [ ] `symptoms` carries at least ten of them, each summary naming a system from a class
      page's own list and each answer linking that class page
- [ ] they work with scripting off, and `tools kit site` still passes (native disclosure, one
      focus stop each)
- [ ] a test fails if an answer names a class the registry does not have

## 171 — Four figures state their numbers in a paragraph instead of the page's own columns

**What is wrong.** `wishbone-hero` prints five quantities in six sentences and about 90 words;
the page's table prints the same five in five columns, with signs rather than the direction
words the readout uses ("1.00 degrees inboard" against "−1.00°"), and §1.1 makes the sign
convention its first *Watch out*. So a reader who wants the number the figure is showing does
extraction work at the moment the figure exists to remove it — and converts between two
presentations of one quantity. `quarter-car`, `kernel-camber` and `stiffness-agreement` have
the same habit. Spatial contiguity and signalling (Mayer); `research/review/…-ii.md`'s fourth
proposal, `ideas.md` §12.4.

**The fix.** A readout of label/value rows, in the table's order and the table's signs, drawn
with the kit's `label()` as `dynamics-table`'s rows are.

**Done means**

- [ ] each of the four figures' readout is a list of label/value rows, and the value is the
      one the page's table prints for the same quantity
- [ ] every number in the readout is declared with `claim()` and `readout --verify` passes
- [ ] the figures still pass `canvas`, `audit` and `kit`

## 172 — `maths-applied` teaches two procedures and presents them as one

**What is wrong.** The **tolerance comparison** (which model do I need? — 1.85 MN/m against
0.034) and the **limit test** (is this model the generalisation of that one? — the ladder's
monotone approach) are two, and a reader who leaves with one of them is missing the other. The
first lives inside a table caption in §1.5 and is restated in the Review; the second is the
Review's *Reflection*, presented as though it were the same sentence in other words. It is the
only content in the book a reader can carry to a *different* mechanism, which is what a book
about modelling is for. `research/review/…-ii.md`'s fifth proposal, `ideas.md` §12.5.

**The fix.** A boxed panel at the end of §1.5 with four rows — the procedure, the question it
answers, the number that earned it — and the Review pointing at the panel instead of restating
it in other words.

**Done means**

- [ ] §1.5 ends with the panel, two rows per procedure, and the Review links it
- [ ] the numbers in the panel are the ones the figures and the ladder print, and a test
      recomputes them
- [ ] the Review's *Reflection* no longer presents the limit test as a restatement

## 173 — *Methods, A to Z* is not alphabetical, and a reader holding a name cannot reach its entry

**What is wrong.** The page calls itself the inverse lookup — "You have heard of a method and
want to know where it applies" — and then sorts by method family, and within a family by the
order the class page happens to use. Measured on the built page:

```
$ grep '^### ' books/numerical-methods/docs/techniques/index.md | head -5
### Bisection
### Secant, false position
### Newton
### Quasi-Newton (Broyden)
### Brent
```

`Bisection` before `Brent` before `Newton` is a teaching order, not an alphabetical one. At
390px the page is **22,580px**; `Uzawa` is at **9,598px** and `Monte Carlo` at **19,108px**.
The only name-based route is find-in-page or the site search, and a search result opens the
page at the top, not at the anchor. The title promises a lookup the page does not offer.

This is not 167. That item lists the page's five family headings; a reader who has the name
`Uzawa` does not need to know it is a linear-system method before they can find it.

**The fix.** A compact index at the top, one line per initial letter, each method name linking
to the anchor that already exists (`<a id="uzawa"></a>` and 76 others). Generate it from those
anchors rather than typing it: a hand-kept list of 77 names is a second copy, and item 167's
argument against a second copy is the same argument here. If generation is too much for one
change, sort the method blocks alphabetically inside each family and keep the five family
anchors as fragment targets — but then the family grouping stops being a reading order and
the page's opening paragraph has to say so.

**Done means**

- [ ] a reader at the top of the page can reach any of the 77 entries in one click
- [ ] every method anchor appears exactly once, sorted by its display name, and a test fails
      when one is missing, duplicated or out of order
- [ ] every index link resolves to an anchor the page carries, and a test fails on a stale one
- [ ] the page height at 390px does not grow by more than the index's own measured height
- [ ] `python -m textbook.lint numerical-methods` is clean

## 174 — No way into the map by system, although the book counts 64 of them

**What is wrong.** The home page's opening number is **64 systems** the nine kinds are used
on. Every one of them is a bullet under **Systems that live here** on a class page, and nowhere
else. A reader who arrives holding "incompressible flow", "a tyre's slip angle" or "weather
ensembles" has to guess which of nine pages lists it, or read all nine. The book states three
ways in — a model, a method name, a wrong answer — and the most concrete thing a reader often
holds, the system they are trying to model, is not one of them.

The other directions are already written: `symptoms` goes wrong answer → class, `techniques`
goes method → class, `reading-the-class` goes equation → class. This is the missing fourth,
and the content already exists and is already linked.

**The fix.** One page, `systems/`, listing each system, the class it lives in, and the class
page that argues it — derived from the class pages' own lists the way `:::used` is derived
from the `:::class` callbacks, so it cannot fall behind. Add it to `map.yaml → pages` and to
the home page's ways in, and count it from the pages rather than typing 64 a second time.

**Done means**

- [ ] every system in a class page's *Systems that live here* appears in the index with that
      class, and a test fails when a class page adds one the index lacks
- [ ] every entry links the class page that argues it, and a test fails on a stale link
- [ ] the home page's "Three ways in" becomes four, or links the index from the section
- [ ] the page is listed in `map.yaml`, reachable from the home page, and `tests/test_reference_books.py`
      holds the three places together
- [ ] `python -m textbook.lint numerical-methods` is clean
