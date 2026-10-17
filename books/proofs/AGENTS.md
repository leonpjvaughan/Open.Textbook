# AGENTS.md — Proofs

Read the root `AGENTS.md` and `books/AGENTS.md` first. This file adds what is particular to
this book.

**This is a reference work, not a course.** It has no curriculum, no chapters, no tiers and
no exam board; `book.yaml` says `qualification: Reference` and `tier_axis: {}`. It exists
because a stated result that is not proved is a promise to write one, and every book in the
collection links here from the line that states it.

## What a page is

One page per proof, named by its slug in `proofs.yaml`, and the slug is what a
`:::prove <slug>` directive expands to. A page is:

- the statement;
- the proof, in the shortest form a reader can follow rather than the shortest form;
- a figure where the proof *is* a picture — a rearrangement, a triangulation, a
  perpendicular — because that is where a diagram carries the argument rather than
  decorating it.

## `proofs.yaml`

Each entry records the proof's slug, its title, and **who is examined on it**, so the same
page reads *Prove it to me* in the course that teaches it and **Beyond your course** in one
that does not. Adding a proof means adding an entry, a page, and the `:::prove` link in the
book that needs it.

## Traps local to this book

- **A definition is not a theorem and a convention is not a theorem.** The test is whether a
  reader could reasonably ask *why*.
- **`oracles: []`** — the proofs contain no verifiable computation of their own. A bank
  added here later would need an oracle, not a special case.
- **No tier axis**, so a page carries no `tier:` and no profile filters it.
