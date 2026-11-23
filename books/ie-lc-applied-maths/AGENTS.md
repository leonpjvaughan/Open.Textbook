# AGENTS.md — Leaving Certificate Applied Mathematics

Root and `books/AGENTS.md` first. **Leaving Certificate Applied Mathematics** (2019
specification), `O`/`H`: 180 hours of class contact, assessed by a written examination worth
**80%** and a **modelling project worth 20%** set on an annual SEC brief.

## What is different from the English books

- **Strand 1 is not content.** *Mathematical modelling* is the process the other three
  strands are applied through, delivered by the chapter formula and by Chapter 1.
- **Strand 2 has no counterpart anywhere in this collection.** Networks, spanning trees,
  shortest paths, adjacency-matrix algebra and dynamic programming appear in no English book.
  Do not adapt a chapter from another book.
- **The specification numbers only its strands**, so a section's `refs:` is `S2`, never
  `S2.3`, and the coverage check reaches no finer than "all four strands are taught".
- **The modelling project is 20% of the mark**, and Chapter 9 teaches it. A figure that
  models a real situation is closer to the examined task than one that draws a graph.

## Traps local to this book

- **`sympy` and `units`.** `dimensions` for a quantity with a unit, `sigfigs` where rounding
  is claimed, `evaluate`/`solve` for the algebra. A missing unit is most likely and most
  costly here.
- **Mechanics notation is the SEC's**: $g = 9.8\ \text{m s}^{-2}$, $i$ and $j$ for the unit
  vectors. Do not substitute the English books' conventions.
- **The chapter problem is chosen by the author** where `curriculum.yaml` has no `anchor`.

## Figures

Six: `circular-motion`, `dijkstra-stepper`, `graph-basics`, `hookes-law`, `model-fit`,
`mst-stepper`. A procedure is drawn as a stepper — Kruskal beside Prim, Dijkstra settlement
by settlement — and that is the pattern for every procedure figure. `ideas.md` ranks
projectiles, pulleys, restitution and simple harmonic motion next.
