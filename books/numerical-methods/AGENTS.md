# AGENTS.md — Numerical Methods

Read the root `AGENTS.md` and `books/AGENTS.md` first. **A reference work, not a
course**: `book.yaml` carries no curriculum, chapters, tiers or exam board, only
`qualification: Reference`, `tier_axis: {}`, `oracles: []`, `theme: {}`.

A map: system → how it was modelled → **class**, and what goes wrong if you answer it as
another class → **flags**, which change the technique and not the class → **techniques**
→ **systems** → what a wrong answer looks like. *You need the method that answers your
question, and the honesty to know which class your model is in.*

`books/maths-applied/`'s four rules are **not universal** here: a model earns its place
by **failing**, **one mechanism**, a thread **readable end to end**, nothing may
**assume a level**. A lookup is entered, not derived; it may name a method and link the
textbook.

## Reference machinery

- Registry, not curriculum: every page authored, nav from the registry; `Book.pages`
  reads `map.yaml → pages`, `build_nav_list` lists them.
- **Never chapters or sections**: the scaffold would stub a Walkthrough per section, and
  lint demands `## The chapter problem`, `You should now be able to`, `Watch out`.
- `proofs:` is the other registry, read by `:::prove`, not the nav;
  `books.proof_book()` is the proof book's alone; `tests/test_proofs.py` fails on two
  books declaring a proof registry.
- **No tier, no boards, no booklet, no Review**; **`oracles: []`** — no bank, nothing
  verified, provenance in `sources.yaml`.
- **Statistics is no separate book**: `averaging` is one box under the same three flags;
  a Monte Carlo estimate and a suspension sweep are the same kind of answer.

## The nine boxes and the three flags

`docs/index.md` is the source of truth: a class missing from its nine-kinds table is
unreachable. Order is the registry's (`pages:` in `map.yaml`, also the tree's), held by
`tests/test_reference_books.py`.

| Kind | Box |
|---|---|
| Optimisation | the best one |
| Averaging | how likely, how spread out; the statistical half |
| Eigenvalues | which values are allowed |
| Linear system | linear rules, work in the matrix |
| Root finding | a rule that must hold at a point, and it bends |
| Elliptic | everywhere at once, nothing travels |
| Saddle point | a rule everywhere, paid for by a second unknown |
| Parabolic | moves, and forgets |
| Hyperbolic | moves, and remembers |

- **"Linear system" is a box, not part of elliptic**: solved in one step, so the work is
  the matrix; a bending rule is iterated, so the work includes the start.
- **One page per box, statistical half included**: `averaging` is one page, not a
  sub-map — entered by the question, methods named and priced, not derived; derivations
  in `techniques/` and `sources.yaml`.
- **Stiffness is a flag, not a box**: a property of the discretisation, not the physics; a
  flag modifies the technique, a box multiplies the taxonomy.
- **Hamiltonian problems are a flag too**: symplectic integration for a hyperbolic or
  parabolic problem whose structure must survive a long run, on `hyperbolic`; a tenth box
  needs a case the flag cannot carry.

## What a page is

One page per class, named by its slug in `map.yaml`; fixed order:

| # | Heading | Says |
|---|---|---|
| 1 | **You have one of these when** | one sentence, the reader's words |
| 2 | **What you are modelling** | the system, not the mathematics |
| 3 | **The model you write down** | the equation and each part |
| 4 | **What it becomes on a computer** | the discretisation, and what it changes |
| 5 | **The signature** | the property that makes it this class, testable |
| 6 | **Flags that matter here** | the three that apply, and what each changes |
| 7 | **Techniques** | what it does, when it wins, when it is wrong |
| 8 | **Systems that live here** | at least one outside this collection |
| 9 | **What goes wrong** | symptom, cause, fix |
| 10 | **Used in this collection** | `:::used`, from the callbacks, saying so when none |
| 11 | **Read next** | the two or three neighbours |

Two indexes serve the other directions: `techniques/` method → class, `symptoms/` wrong
answer → class.

**Techniques** carries the **property table** first — *what your model is · the methods
that fit · the price*, keyed by the reader's property — then the **method table**, marked
`<!-- table: cards -->`, one sentence between saying they are one list sorted two ways.
**A cell naming one method links to its A–Z entry; naming several is text**:
`[Monte Carlo](../techniques/#monte-carlo)` links, `Monte Carlo, quasi-Monte Carlo` does
not; `tests/test_reference_books.py` holds both halves.

### Detail pages

A **detail page** is the working under a class page: the algebra, a program printing a
number, why the method works. It sits under its class (`averaging/error-bars/`) or, for
the three that cross every class, at top level (`error/`, `order/`, `checking/`); a
top-level one carries no `signature`. Six headings, in order:

| # | Heading | Says |
|---|---|---|
| 1 | **What this page answers** | one sentence, and the question the class page left |
| 2 | **The mathematics** | the derivation, a reasoning line per algebra line, a checkable statement at the end |
| 3 | **The code** | the program, folded if over ten lines, output beside it |
| 4 | **The theory** | why it works, what it assumes, when it stops |
| 5 | **What this cost** | work, memory, accuracy, what it will not do |
| 6 | **Back to the map** | the parent class page and at least one sibling |

Checked, not suggested:

- **`sympy` and the standard library only.** No numpy, no scipy; needing one is an
  escalation, not a new dependency.
- **The printed output is on the page, and a test runs the program** and compares.
- **Prose 80 columns, code 72**, hard-wrapped at word boundaries; table rows, fenced
  lines, display maths and link URLs exempt.
- **A listing over ten lines folds** in native `<details markdown="1">` with a summary
  naming what is inside; the page reads complete with every fold closed, and no `:::`
  directive inside one.
- **Every claim about a method comes from `sources.yaml`**, with a `role` saying source
  or further reading.
- **`tests/test_page_rules.py`** fails one case per violation over every detail page;
  **`tests/test_reference_books.py`** runs every program and compares its output.

## Voice

The root's **Voice and language** applies in full, plus four: **name the class and the
alternative** ("This is elliptic, and the method that works for parabolic problems will
not work here", not "choose the right tool"); **do not rank methods** — say when one wins
and when it is wrong, never that one is best; **never imply more precision than the claim
has** ("Multigrid is close to linear in the number of unknowns", not "Multigrid is O(n)");
**every claim about a method comes from `sources.yaml`**, and `role` never blurs source
with further reading.

Banned on top of the root's list: **"advanced"**, **"powerful"**, **"state of the art"**.

## Figures

`assets/AGENTS.md` is binding; this book adds one rule.

**The map is a table, not a drawing.** Never revive the `class-map` decision tree: it asks
*which box am I in?*, the wrong question for a reader with no model yet. The home page's
table of nine kinds has four columns — the kind, the question and the shape of its answer,
the model it writes down, how to recognise it — plus the three circumstances that decide
the method inside a kind. Read, not walked.

**The home page's one figure is a gallery, not a map.** `:::figure kind-shapes` draws each
answer's shape in the table's order: a point, a set, or a field, and for field problems
what the field does over time. No navigation, no decision, no arrows between panels.

**The other two figures are on class pages**, mounting in a state that already carries the
idea.

**Class pages mount the shared kernel labs**: `heat-lab` on parabolic, `wave-lab` on
hyperbolic, `cg-lab` on elliptic and linear-system, `power-lab` on eigenvalue,
`newton-lab` on root, `gradient-lab` on optimisation, `monte-carlo-lab` on averaging. They
live in `assets/figures/`, not this book's directory, and are not `claim()`ed: a simulated
number is proved by the kernel's selftest, each Predict line is in the figure, and the
prose states the model, not the result.

## How another book points here

```markdown
:::class saddle-point
```

`engine/src/textbook/hooks/classes.py` resolves the slug against `map.yaml → pages`, emits
a root-absolute `/numerical-methods/<slug>/` href inside one small aside, and prints the
entry's `signature` under the link. An unknown slug fails the build, and so does a registry
page with no signature — the two indexes are not kinds of problem.

`:::used`, under **Used in this collection**, reads every book's pages for `:::class` at
build time, so the list cannot rot, and prints a sentence rather than nothing when a class
is not used yet.

- **Put it where the class first becomes true**, not in a list at the chapter top; the
  reader needs it when the method is chosen.
- **Do not restate the signature**: if aside and prose say it twice, one drifts.

## Traps

- **No `scaffold:stub` under `docs/`**; `tests/test_reference_books.py` checks that every
  page in `map.yaml` exists and appears on the home page.
- **The class is a choice**: every page states its class came from how the model was
  written down; calling it a fact about nature contradicts `docs/index.md`.
- **One page, several boxes**: a system in three classes is normal (`saddle-point` and
  `hyperbolic` both name Navier–Stokes); claiming exactly one class is wrong.

## Adding to the map

**A new class page** needs four places: the page, its entry in `map.yaml → pages` in tree
order, its row in the nine-kinds table in `docs/index.md` with the four columns the others
use, and its place in `techniques/` and `symptoms/`. `tests/test_reference_books.py` fails
when they disagree — including on the counts the home page opens with, which are measured
from the pages, not typed.

**A new technique** is a row in `techniques/` under its family, naming the class, the step
in symbols and the price. The step is the update the method repeats or the equation it
solves; a family may show its representative member, but a row with no arithmetic is a
glossary entry and fails `test_every_method_states_its_step_in_symbols`. It gets no page of
its own until two class pages need the same derivation.
