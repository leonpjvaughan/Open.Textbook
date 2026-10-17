# AGENTS.md — Leaving Certificate Applied Mathematics

Read the root `AGENTS.md` and `books/AGENTS.md` first. This file adds what is particular
to this book.

**Leaving Certificate Applied Mathematics** (2019 specification), `O`/`H`. 180 hours of
class contact, assessed by a written examination worth **80%** and a **modelling project
worth 20%** set on an annual SEC brief. The specification is in
`research/curriculum/ie-curriculum.md`.

## What is different from the English books

- **Strand 1 is not content.** *Mathematical modelling* is the process the other three
  strands are applied through — not a topic with chapters. It is delivered by the chapter
  formula and by Chapter 1, which teaches the process explicitly.
- **Strand 2 has no counterpart anywhere in this collection.** Networks, spanning trees,
  shortest paths, adjacency-matrix algebra and dynamic programming appear in no English
  book. Do not adapt a chapter from another book: there is nothing to adapt from.
- **The specification numbers only its strands.** So the coverage check reaches no finer
  than "all four strands are taught" — recorded in `curriculum.yaml` — and the outcome
  reference in a section's `refs:` is `S2` rather than `S2.3`.
- **The modelling project is 20% of the mark**, and Chapter 9 teaches it. A figure that
  models a real situation is closer to the examined task than a figure that draws a graph.

## Traps local to this book

- **`sympy` and `units`.** `dimensions` for a quantity with a unit, `sigfigs` where
  rounding is claimed, `evaluate`/`solve` for the algebra. Applied mathematics is where a
  missing unit is most likely and most costly.
- **Mechanics notation is the SEC's**: $g = 9.8\ \text{m s}^{-2}$, $i$ and $j$ for the unit
  vectors. Do not substitute the English books' conventions.
- **The chapter problem is chosen by the author** where `curriculum.yaml` has no `anchor`.

## Figures

Six: `circular-motion`, `dijkstra-stepper`, `graph-basics`, `hookes-law`, `model-fit` and
`mst-stepper`. The two steppers are the collection's first — Kruskal beside Prim, and
Dijkstra settlement by settlement — and they are the pattern for every procedure figure.
`ideas.md` ranks projectiles, pulleys, restitution and simple harmonic motion as the next
four.
