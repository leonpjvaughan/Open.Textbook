# AGENTS.md — Junior Cycle Mathematics

Read the root `AGENTS.md` and `books/AGENTS.md` first. They hold the chapter formula,
voice, Theming and Conventions, and the traps common to every book. This file adds what
is particular to this one.

**Junior Cycle Mathematics**, `SEC` examines it, `O`/`H` — Ordinary and Higher, and
nothing else. Read `research/curriculum/ie-curriculum.md` for the specification and
`research/curriculum/ie-textbook-contents.md` for how the market splits the same material.

## What is different from the English books

- **There is no Foundation level.** The 2015 specification is offered at Ordinary and
  Higher only, so `tier_axis` has two codes and `O` is the lowest. Do not add an `F`.
- **The specification is a list of learning outcomes, not a syllabus.** Each section's
  `refs:` names the outcome (`AF.1`, `SP.4`), and the coverage check reads that field.
  Copy the code from `curriculum.yaml`; do not invent one.
- **A chapter is 3–7 sections and a section is the unit.** The Junior Cycle chapter in
  *Destination Maths* runs to 3–6 sections, which is what this book's `curriculum.yaml`
  already matches.
- **Geometry is four chapters**, not one — theorems, further theorems, constructions and
  transformations — because that is how the market splits it and how the specification
  separates them.
- **Proof is content.** Chapter 20 is where the theorems and the constructions live, and a
  result that is stated and not proved carries a `:::prove <slug>` link to
  `books/proofs/proofs.yaml`. The slugs that exist are `pythagoras`,
  `angles-in-a-triangle`, `angle-in-a-semicircle` and `angle-at-the-centre`.

## The reader

12–14. The reading age matters more here than anywhere else in the collection: keep
sentences short, define every term on first use, and never let a symbol appear before the
idea it stands for. The chapter formula's "low-stakes first contact" is not decoration at
this age — it is the difference between a reader who continues and one who does not.

## Traps local to this book

- **The chapter problem is chosen by the author.** `curriculum.yaml` has an `anchor` for
  only some chapters; where it has none, the author writes one, sets it on the index,
  returns to it in every section's `Progress check` and resolves it on the Review.
- **`sympy` only.** The book declares `oracles: [sympy]`, so a `structured` record or a
  `sigfigs` check needs the `units` oracle declared *at bank level* — which is permitted —
  rather than in `book.yaml`.
- **Eight to twelve problems per bank.** A Junior Cycle practice set is longer than a
  Leaving Certificate one.

## Figures

`docs/assets/figures/` holds two so far — `growth-curves` (9.4) and `cuboid-volume` (16.5)
— and `index-laws-practice` (2.2), which is the collection's first generated-practice
figure. The kit, its rules and the shared library are in `assets/AGENTS.md`; the queue of
what to build next is `ideas.md`, which lists this book as the largest gap.
