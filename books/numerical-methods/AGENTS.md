# AGENTS.md — Numerical Methods

Root and `books/AGENTS.md` first. **A reference work, not a course**: `book.yaml` carries no
curriculum, chapters, tiers or exam board — only `qualification: Reference`, `tier_axis: {}`,
`oracles: []`, `theme: {}`.

A map: system → how it was modelled → **class**, and what goes wrong if you answer it as
another class → **flags**, which change the technique and not the class → **techniques** →
**systems** → what a wrong answer looks like. *You need the method that answers your
question, and the honesty to know which class your model is in.*

`books/maths-applied/`'s four rules are **not universal** here: a model earns its place by
**failing**, **one mechanism**, a thread **readable end to end**, nothing may **assume a
level**. A lookup is entered, not derived; it may name a method and link the textbook.

## Reference machinery

- Registry, not curriculum: every page authored, nav from the registry; `Book.pages` reads
  `map.yaml → pages`, `build_nav_list` lists them.
- **Never chapters or sections**: the scaffold would stub a Walkthrough per section, and lint
  demands `## The chapter problem`, `You should now be able to`, `Watch out`.
- `proofs:` is the other registry, read by `:::prove`, not the nav; `books.proof_book()` is
  the proof book's alone; `tests/test_proofs.py` fails on two books declaring a proof registry.
- **No tier, no boards, no booklet, no Review**; **`oracles: []`** — no bank, nothing
  verified, provenance in `sources.yaml`.
- **Statistics is no separate book**: `averaging` is one box under the same three flags.

## Classes and flags

`docs/index.md` is the source of truth: it holds the nine-kinds table (optimisation,
averaging, eigenvalues, linear system, root finding, elliptic, saddle point, parabolic,
hyperbolic) and a class missing from it is unreachable. Order is the registry's (`pages:` in
`map.yaml`), held by `tests/test_reference_books.py`. `averaging` is **one page**, not a
sub-map — entered by the question, methods named and priced, not derived.

- **"Linear system" is a box, not part of elliptic**: solved in one step, so the work is the
  matrix; a bending rule is iterated, so the work includes the start.
- **Stiffness is a flag, not a box**: a property of the discretisation, not the physics; a
  flag modifies the technique, a box multiplies the taxonomy.
- **Hamiltonian problems are a flag too**: symplectic integration for a hyperbolic or
  parabolic problem whose structure must survive a long run; a tenth box needs a case the
  flag cannot carry.

## What a page is

One page per class, named by its slug in `map.yaml`. Its eleven headings, and the six of a
detail page, are fixed by the page contract and `tests/test_page_rules.py`: the reader's
question, the system, the model, the discretisation, the signature, the flags, the
techniques, the systems, what goes wrong, where it is used, what to read next. Two indexes
serve the other directions: `techniques/` method → class, `symptoms/` wrong answer → class.

**Techniques** carries the **property table** first — *what your model is · the methods that
fit · the price* — then the **method table**, marked `<!-- table: cards -->`, one sentence
saying they are one list sorted two ways. **A cell naming one method links to its A–Z entry;
naming several is text**: `[Monte Carlo](../techniques/#monte-carlo)` links, `Monte Carlo,
quasi-Monte Carlo` does not; `tests/test_reference_books.py` holds both halves.

A **detail page** is the working under a class page: the algebra, a program printing a
number, why the method works. It sits under its class (`averaging/error-bars/`) or, for the
three that cross every class, at top level (`error/`, `order/`, `checking/`); a top-level one
carries no `signature`.

Checked, not suggested:

- **`sympy` and the standard library only.** No numpy, no scipy; needing one is an
  escalation, not a new dependency.
- **The printed output is on the page, and a test runs the program** and compares.
- **Prose 80 columns, code 72**, hard-wrapped at word boundaries; table rows, fenced lines,
  display maths and link URLs exempt. **A listing over ten lines folds** in native
  `<details markdown="1">` with a summary naming what is inside, and no `:::` directive
  inside one.
- **Every claim about a method comes from `sources.yaml`**, with a `role` saying source or
  further reading.
- **`tests/test_page_rules.py`** fails one case per violation over every detail page;
  **`tests/test_reference_books.py`** runs every program and compares its output.

## Voice

The root's **Voice and language** applies in full, plus four: **name the class and the
alternative** ("This is elliptic, and the method that works for parabolic problems will not
work here"); **do not rank methods** — say when one wins and when it is wrong; **never imply
more precision than the claim has** ("close to linear in the number of unknowns", not
"O(n)"); **every claim about a method comes from `sources.yaml`**. Banned on top of the
root's list: **"advanced"**, **"powerful"**, **"state of the art"**.

## Figures

`assets/AGENTS.md` is binding.

**The map is a table, not a drawing.** Never revive the `class-map` decision tree: it asks
*which box am I in?*, the wrong question for a reader with no model yet. The home page's table
of nine kinds has four columns — the kind, the question and the shape of its answer, the model
it writes down, how to recognise it — plus the three circumstances that decide the method
inside a kind. **The home page's one figure is a gallery, not a map**:
`:::figure kind-shapes` draws each answer's shape in the table's order, with no navigation,
decision or arrows between panels.

**Class pages mount the shared kernel labs**: `heat-lab` on parabolic, `wave-lab` on
hyperbolic, `cg-lab` on elliptic and linear-system, `power-lab` on eigenvalue, `newton-lab`
on root, `gradient-lab` on optimisation, `monte-carlo-lab` on averaging. They live in
`assets/figures/`, not this book's directory, and are not `claim()`ed: a simulated number is
proved by the kernel's selftest.

## How another book points here

```markdown
:::class saddle-point
```

`engine/src/textbook/hooks/classes.py` resolves the slug against `map.yaml → pages`, emits a
root-absolute `/numerical-methods/<slug>/` href inside one small aside, and prints the
entry's `signature` under the link. An unknown slug fails the build, and so does a registry
page with no signature. `:::used` reads every book's pages for `:::class` at build time, so
the list cannot rot, and prints a sentence rather than nothing when a class is not used yet.

- **Put it where the class first becomes true**, not in a list at the chapter top.
- **Do not restate the signature**: if aside and prose say it twice, one drifts.

## Traps

- **No `scaffold:stub` under `docs/`**; `tests/test_reference_books.py` checks that every page
  in `map.yaml` exists and appears on the home page.
- **The class is a choice**: every page states its class came from how the model was written
  down; calling it a fact about nature contradicts `docs/index.md`.
- **One page, several boxes**: a system in three classes is normal (`saddle-point` and
  `hyperbolic` both name Navier–Stokes); claiming exactly one class is wrong.

## Adding to the map

**A new class page** needs four places: the page, its entry in `map.yaml → pages` in tree
order, its row in the nine-kinds table in `docs/index.md`, and its place in `techniques/` and
`symptoms/`. `tests/test_reference_books.py` fails when they disagree — including the counts
the home page opens with. **A new technique** is a row in `techniques/` under its family,
naming the class, the step in symbols and the price; a row with no arithmetic is a glossary
entry and fails `test_every_method_states_its_step_in_symbols`. It gets no page of its own
until two class pages need the same derivation.
