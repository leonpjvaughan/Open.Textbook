# AGENTS.md — Proofs

Read the root `AGENTS.md` and `books/AGENTS.md` first; this file adds what is
particular to this book.

**A reference work, not a course.** No curriculum, chapters, tiers or exam board:
`book.yaml` has `qualification: Reference` and `tier_axis: {}`. Every book links
here from the line that states an unproved result.

## What a page is

One page per proof, named by its slug in `proofs.yaml`, which is what
`:::prove <slug>` expands to. A page is:

- the statement;
- the proof, in the shortest form a reader can follow rather than the shortest
  form;
- a figure where the proof *is* a picture — a rearrangement, a triangulation, a
  perpendicular.

## `proofs.yaml`

Each entry records the slug, the title, and **who is examined on it**, so a page
reads *Prove it to me* in the course that teaches it and **Beyond your course** in
one that does not. A new proof means an entry, a page, and the `:::prove` link in
the book that needs it.

## Traps local to this book

- **A definition is not a theorem and a convention is not a theorem.** The test is
  whether a reader could reasonably ask *why*.
- **`oracles: []`** — no verifiable computation. A bank added here would need an
  oracle, not a special case.
- **No tier axis**: a page carries no `tier:` and no profile filters it.
