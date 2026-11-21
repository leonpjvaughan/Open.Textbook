# AGENTS.md — Junior Cycle Mathematics

Read the root `AGENTS.md` and `books/AGENTS.md` first; they hold the chapter
formula, voice, Theming and Conventions, and the traps common to every book.

**Junior Cycle Mathematics**, examined by the `SEC` at `O`/`H` — Ordinary and
Higher, and nothing else.

## What is different from the English books

- **There is no Foundation level.** `tier_axis` has two codes and `O` is the
  lowest. Do not add an `F`.
- **The specification is a list of learning outcomes**, so each section's `refs:`
  names the outcome (`AF.1`, `SP.4`). Copy the code from `curriculum.yaml`; do not
  invent one.
- **A chapter is 3–7 sections**, and a section is the unit.
- **Geometry is four chapters** — theorems, further theorems, constructions and
  transformations.
- **Proof is content.** Chapter 20 holds the theorems and the constructions; a
  stated, unproved result carries a `:::prove <slug>` link to
  `books/proofs/proofs.yaml`. The slugs that exist are `pythagoras`,
  `angles-in-a-triangle`, `angle-in-a-semicircle` and `angle-at-the-centre`.

## The reader

12–14. Keep sentences short, define every term on first use, and never let a
symbol appear before the idea it stands for. The chapter formula's low-stakes
first contact decides whether the reader continues.

## Traps local to this book

- **The chapter problem is chosen by the author.** Where `curriculum.yaml` has no
  `anchor`, write one, set it on the index, return to it in every section's
  `Progress check` and resolve it on the Review.
- **`sympy` only.** The book declares `oracles: [sympy]`, so a `structured`
  record or a `sigfigs` check declares the `units` oracle at bank level, not in
  `book.yaml`.
- **Eight to twelve problems per bank**, longer than a Leaving Certificate set.

## Figures

`docs/assets/figures/` holds `growth-curves`, `cuboid-volume` and
`index-laws-practice`, the collection's first generated-practice figure. The kit's
rules and the shared library are in `assets/AGENTS.md`; `ideas.md` lists this book
as the largest gap.
