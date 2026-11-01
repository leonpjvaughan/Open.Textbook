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

**Every item from 79 to 169 is closed,** each with its measurement, its fix, its outcome
and its ticked done-means in `.agents/todo-closed.md`. Items 166–174 are open: three
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
