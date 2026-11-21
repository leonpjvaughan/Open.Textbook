# AGENTS.md — Leaving Certificate Mathematics

Read the root `AGENTS.md` and `books/AGENTS.md` first; this file adds what is
particular to this book.

**Leaving Certificate Mathematics**, examined by the `SEC`. It is the only book
with **three nested levels**: `F`/`O`/`H`.

## The three-level axis

`tier_axis` is ordered, lowest first, and a profile includes **every level at or
below its own**: a Foundation build carries `F`, `O` and `H` content; an Ordinary
build carries `O` and `H`; a Higher build carries everything.

- **`F` means "Foundation, Ordinary and Higher"**, not "Foundation only". It is
  the lowest code, not a filter that drops the others.
- **A tier filter that names neither a tier code nor `all`/`toggle` raises.**
  Never let one fall through to "include everything".

## The booklet

`booklet/ie-lc-maths.yaml` is the SEC's own *Foirmlí agus Táblaí* — one national
document for every level of Mathematics, Physics, Chemistry and Applied
Mathematics. It is not per-board and not per-tier: the SEC publishes one booklet
and every candidate is handed the same copy. `BOOKLETS.md` is the contract.

**Check it before asking a reader to recall a formula.** A page that asks a
reader to remember what the booklet supplies is teaching the wrong thing.

## What is different from the English books

- **Proof is content.** Chapter 15 (synthetic geometry: foundations) holds the
  theorems; a result stated and not proved carries a `:::prove <slug>` link. The
  chapter also teaches what a proof *is* — axiom, theorem, corollary, converse.
- **The references are `refs:`, not `dfe:`**, and they name the NCCA learning
  outcome.
- **Ordinary Level is the same exam shape as Higher**: two papers, 300 marks, a
  150-mark Section A of six 30-mark questions and a 150-mark Section B of four
  50-mark questions. Foundation is one 300-mark paper.
- **The 2021 and 2022 papers were 220 marks**, not 300. A chapter written against
  one of those would be wrong.

## Traps local to this book

- **`sympy` and `units`.** `evaluate`/`solve` for the algebra, `structured` for an
  explanation. A differentiation or integration step is `relation: apply`, never
  `equivalent` — see `PROBLEMS.md`.
- **Two `$$…$$` blocks on consecutive lines are one expression to the maths hook**
  and fail to parse. Put a blank line between them, or use one `aligned` block.
- **The chapter problem is chosen by the author** where `curriculum.yaml` has no
  `anchor`.

## Figures

`argand-diagram`, `circle-centre-radius`, `circle-tangent`, `enlargement-grid`,
`line-two-points`, `reflection-grid`, `unit-circle`, `vector-addition`. `ideas.md`
ranks the two that matter most — chord → tangent for 7.1 and Riemann strips for
8.2 — because a reader who has seen those two has understood what calculus is.
