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

**Every item from 79 to 173 is closed,** each with its measurement, its fix, its outcome
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
