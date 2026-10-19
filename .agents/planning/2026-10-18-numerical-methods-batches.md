# The map of numerical methods — batches

**Dated:** 2026-10-18. **State at writing:** the reference work
`books/numerical-methods/` is built and green (7667 tests, figure audits clean in
both schemes and at 390px) but **unreachable**: no page in any other book links to
it, because the `:::class` directive it needs does not exist.

This is the record of how the remaining work was cut into batches, and why in that
order. The queue items are 78–81 in `.agents/todo.md`; the book's own contract is
`books/numerical-methods/AGENTS.md`.

## Why batches at all

The gate is 17.5 minutes and `pytest tests/` is 3.5 minutes. A change that touches
the engine, four books' sections, a page tree and a figure cannot be reviewed as
one diff, and a failure inside it does not say which part failed. So the work is cut
where the *kind* of verification changes:

- **structure** — a tree, a registry, a directive: checked by tests, links and lint;
- **lookup** — generated cross-references: checked by a drift diff;
- **prose** — pages that have to earn a claim: checked by a reader;
- **figures** — measured in a browser, in both schemes, at 390px.

Mixing a figure audit with a structural change is how a broken link hides behind an
on-press colour failure.

## Batch A — the spine

**Goal:** the tree is right, and the book is reachable.

1. **A linear-system box.** The map sends "a finite list of unknowns" straight to
   root finding, so `Ax = b` — the most common problem in numerical work, and the
   one a reader is most likely to arrive holding — has no branch. Its methods
   currently live inside `elliptic`, as if a linear system could only come from a
   discretised PDE. The new box is the *linear* arm of the same question: the rule
   is linear, so the work is in the matrix, not in an iteration over the model.
2. **A `:::class <slug>` directive.** A near-copy of `:::prove`: registry-resolved
   against `map.yaml → pages`, root-absolute href, plain `<a>`, build fails on an
   unknown slug. It is the door.
3. **Callbacks.** One directive per section, at the point the class is first true.
   Added in `maths-applied` (§1.2 root, §1.4 linear system, §1.5 root, §1.6 saddle
   point and parabolic) and `a-level-maths` (9.3 Newton–Raphson: root).

   **Dropped: the physics callbacks.** `a-level-physics` 5.4 (capacitance) and 8.3
   (radioactive decay) solve analytically, and the wave chapter derives rather than
   computes. A "kind of problem" aside there would decorate a chapter and change
   nothing a reader does — the defect this reference work exists to avoid. They go
   back in when a physics section actually runs a numerical method.

**Must not:** add a tenth box, add a figure, or grow the directive into a widget.

**Done 2026-10-18.** `linear-system` is the ninth box on the linear arm of Q3;
`:::class` renders one link and the registry's signature sentence, fails the build
on an unknown slug or on an index page, and is checked by `tests/test_class_links.py`
(7 tests). Five callbacks in `maths-applied`, one in `a-level-maths`. Lint clean for
both books; both build with 0 broken links; the figure re-audited at 502/502 in both
schemes and 0 labels below 9px at 390px.

## Batch B — lookup quality

Cheap, mechanical, one cycle:

- the techniques table's class column becomes links, and the tables get anchors so a
  class page can point at a row;
- each class page gains a generated **Used in this collection** line, built from the
  callbacks and drift-checked by `textbook.plan --generated`, so a backlink cannot
  rot;
- a test that every class page carries the ten headings in the order `AGENTS.md`
  states;
- the proof book's About prose moves from `scaffold.colophon_page` into
  `books/proofs/proofs.yaml` — now that a reference work can state
  `meta.what_it_is`, the engine should hold no book's prose.

**Must not:** change what any class page says about a method.

**Done 2026-10-18.** The class column of `techniques/` is links in both directions,
with an anchor per family (`<a id=…>` — this engine renders headings without ids, so
an anchor has to be written). `:::used` derives each class page's backlink list from
the `:::class` callbacks at build time, so it cannot rot; four classes say plainly
that nothing uses them yet. The ten-heading skeleton is tested. The proof book's About
prose moved into `books/proofs/proofs.yaml`, and `scaffold` now refuses a reference
work that does not say what it is.

## Batch C1 — the pages that carry the argument

Two pages, no figures:

- **`choosing-the-class`** — the thesis, with three cases where the same system was
  written two ways and one did not run: elliptic vs hyperbolic gauge in numerical
  relativity, projection vs artificial compressibility in a fluid, and elimination
  vs a saddle-point formulation of the same constraint.
- **the worked case** — the suspension corner posed five ways (root, saddle point,
  optimisation, eigenvalue, parabolic) with the numbers the model already prints.
  This is what makes the map prove rather than assert, and it gives
  `books/maths-applied/` something better to link to than a badge.

**Must not:** state a number the module in `maths-applied` does not compute.

**Done 2026-10-18.** `choosing-the-class` (relativity, incompressible flow, the
corner) and `worked-case` (the corner five ways, with the rigidity sweep
−2.070°/−1.107°/−1.011° at rest and 1.070°/0.107°/0.011° from the rigid model, all
printed by running `mechanism.js`). Two of the five have no model in the book yet and
the page says so instead of borrowing a number.

## Batch C2 — the two figures that earn it

- **The Δx² wall** on `parabolic`: explicit time-step limit against mesh size on log
  axes, with the implicit step count beside it.
- **Energy drift** on `hyperbolic`: one wave problem run long with a general method
  and with a structure-preserving one. This settles the Hamiltonian question in
  item 76 with a curve rather than an opinion.

**Must not:** ship without `audit` in both schemes, `audit --mobile` ≥ 9px, and
`readout --verify` clean.

**Done 2026-10-18.** `step-limit` (explicit step against resolution, `2N²`, every
printed number declared through `claim()`) and `energy-drift` (RK4 against velocity
Verlet, 2000 periods). Audits: 506/506 figures in both schemes, 208 measured at
390px with 0 below 9px, 640 claims across 41 figures with 0 untrue.

## Order

A, then B, then C1, then C2. A is where the risk is concentrated and where the
payoff is largest; C2 is where a browser is required, so it goes last, when the
pages it measures have stopped moving.
