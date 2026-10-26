# AGENTS.md — Numerical Methods

Read the root `AGENTS.md` and `books/AGENTS.md` first. This file adds what is
particular to this book, and it is the record of the decisions taken to create it.

**This is a reference work, not a course.** It has no curriculum, no chapters, no
tiers and no exam board; `book.yaml` says `qualification: Reference` and
`tier_axis: {}`. It exists because the collection models systems in several books
and none of them said how you know what kind of problem a model has become.

## What this book is

A map. A reader arrives with a system, says how they modelled it, and finds:

- the **class** the model falls into;
- what goes wrong if you answer it as a different class;
- the **flags** that change the technique without changing the class;
- the **techniques** that work, one class to many methods;
- the **systems** that live in that class, from a suspension bush to a black hole;
- what a wrong answer in that class looks like, and why.

The one sentence the book serves:

> You do not need the best method. You need the method that answers your question,
> and the honesty to know which class your model is in.

## The decision this book records: a reference work, not a chapter

The proposal that started this book was chapter 0 of `books/maths-applied/`. It is
not, and the reason matters more than the outcome.

`books/maths-applied/AGENTS.md` replaces the chapter formula with four rules that a
lookup cannot obey:

| the rule in `maths-applied` | why it cannot host this book |
|---|---|
| a model earns its place by **failing** | a taxonomy has nothing to fail. It is entered, not derived |
| the book is **one mechanism**, worked out on one corner | a map of classes is deliberately about systems the book does not model |
| the main thread must be **readable end to end** | a lookup is read one entry at a time, in any order |
| nothing may **assume a level** | a chapter must introduce its mathematics where it is needed; a reference page may name a method and link the textbook |

Those rules are right for that book. The error was reading them as universal.

**So the map is a second reference work**, beside `books/proofs/`, and the collection
already had the machinery for one: `qualification: Reference`, no chapters, a
registry instead of a curriculum, every page authored, and the nav built from the
registry. Two engine changes were needed and are the only ones this book caused:

- `Book.pages` reads `map.yaml → pages`, and `build_nav_list` lists them
  (`proofs:` is the other registry, and it is read by the `:::prove` directive, not
  by the nav).
- `books.proof_book()` replaces `books.reference_book()`, because "the reference
  work" stopped meaning "the proof book". `tests/test_proofs.py` fails on two books
  declaring a proof registry.

**Rejected: chapters and sections.** Writing the map as `chapters:` with sections
would have made the scaffold generate a Walkthrough stub for every section, and the
lint demand `## The chapter problem`, `You should now be able to` and `Watch out` on
each. That is course furniture, and a reference work with a chapter problem is a
course that has lost its syllabus.

**Rejected: a separate book for the statistical half.** Statistics is not a second
discipline in this map; it is one answer to the first question. A reader asking "how
likely, how spread out" lands in `averaging`, beside a reader asking "the best one",
and the same three flags apply. Splitting it would bury the fact that a Monte Carlo
estimate and a suspension sweep are the same kind of answer: an estimate with an
error bar.

## The nine boxes, and the three flags

`docs/index.md` is the source of truth: the table of nine kinds there is the map,
and a class missing from it is a kind a reader cannot reach from the argument. In
order (the registry's order is the tree's, and `tests/test_reference_books.py`
holds the two together):

1. **Optimisation** — the best one.
2. **Averaging** — how likely, how spread out. The statistical half.
3. **Eigenvalues** — which values are allowed.
4. **Linear system** — the rules are linear, and the work is in the matrix.
5. **Root finding** — a rule that must hold at a point, and it bends.
6. **Elliptic** — everywhere at once, nothing travels.
7. **Saddle point** — a rule everywhere, paid for by a second unknown.
8. **Parabolic** — moves, and forgets.
9. **Hyperbolic** — moves, and remembers.

**Why "linear system" is a box and not a part of elliptic.** It is the most common
problem in numerical work, and a reader can arrive holding one without ever having
written a differential equation — from a network, a circuit, or a fit. Burying its
methods inside a PDE page was the largest hole in the first version of this map. The
distinction from `root` is deliberate: a linear rule is solved in one step, so the
work is the matrix; a rule that bends is solved by iteration, so the work includes
the start.

**One page per box, including the statistical half.** `averaging` is one page, not a
sub-map: the box is entered by the question ("how likely, how spread out"), and the
methods are named and priced rather than derived. If a reader needs the derivation,
`techniques/` and `sources.yaml` are the route. Splitting statistics into its own
book was considered and rejected in the decision record above; splitting it into
five pages would fail for the same reason, one level down.

**Stiffness is a flag, not a box.** It is a property of the discretisation, not of
the physics: the same diffusion equation is stiff at one mesh and not at another.
A flag modifies the technique; a box would multiply the taxonomy.

**Hamiltonian problems are a flag too, for now.** Symplectic integration is a real
choice, and it is not a class: it is what you do when a hyperbolic or parabolic
problem has a structure that must survive a long run. The book has not given it a
tenth box, and the reason is that the answer needs a page that shows the loss: the
`hyperbolic` page carries that page, one oscillator run with a general method and
with a structure-preserving one. A tenth box would need a case the flag cannot
carry.

## What a page is

One page per class, named by its slug in `map.yaml`. The page order is fixed,
because nine pages that each invent their own order stop being a map:

1. **You have one of these when** — one sentence, in the reader's words.
2. **What you are modelling** — the system, not the mathematics.
3. **The model you write down** — the equation, and what each part of it is.
4. **What it becomes on a computer** — the discretisation, and what that changes.
5. **The signature** — the property that makes it this class, testable.
6. **Flags that matter here** — which of the three apply, and what each changes.
7. **Techniques** — a table: what it does, when it wins, when it is the wrong tool.
8. **Systems that live here** — named systems, at least one outside this collection.
9. **What goes wrong** — symptom, cause, fix, as a table.
10. **Used in this collection** — `:::used`, which derives the list from the
    callbacks rather than from a hand-typed one, and says so when there are none.
11. **Read next** — the two or three pages that neighbour this one.

Two indexes sit outside that order and exist for the other directions of lookup:
`techniques/` goes method → class, and `symptoms/` goes wrong answer → class.

## Voice, and the words to avoid

The root's **Voice and language** applies in full. Four things are particular:

- **Name the class, and name the alternative.** "This is elliptic, and the method
  that works for parabolic problems will not work here" beats "choose the right
  tool".
- **Do not rank methods.** The techniques table says when a method wins and when it
  is the wrong tool. It never says one is best, because the honest answer depends on
  the class, the size and the accuracy you need. A league table would be a claim the
  book cannot support.
- **Never imply more precision than the claim has.** "Multigrid is close to linear
  in the number of unknowns" is the claim. "Multigrid is O(n)" invites a measurement
  the book did not make.
- **Every claim about a method comes from `sources.yaml`.** The `role` says whether
  a reference is the source of a claim or further reading, and the two are never
  blurred.

Banned here in addition to the root's list: **"advanced"**, **"powerful"**,
**"state of the art"**. They rank without evidence, and a reader who is told a
method is advanced learns nothing about whether it applies.

## Figures

`assets/AGENTS.md` is binding, and this book adds one rule.

**The map is a table, not a drawing.** The book used to mount a `class-map` figure
on its home page: a decision tree, stepped through one question at a time. It was
retired on 2026-10-22, and the reason is worth keeping, because a new one would hit
the same wall.

- **Its graph was wrong.** The five questions were drawn on one unbroken spine, so
the picture said `Q1 → Q2 → Q3 → Q4 → Q5`. The tree is not a chain: Q3 is reached only
when Q2 answers *no*, Q4 only when Q3 answers *at every point*, and Q5 comes from Q2
with Q3 and Q4 skipped. The skip was a hairpin down the left margin, parallel to the
spine and indistinguishable from it.
- **It was the third copy of one list.** The figure drew the same nine boxes as the
Markdown tree, which links them, and both sat under a prose list of the same nine.
A reader met the index three times before meeting an instance.
- **It answered the wrong question.** A tree is a navigation device: it asks *which
box am I in?* A reader who has no model yet needs the opposite — what the nine kinds
are, what each is for, and how to recognise one. A table does that in one screen, it
works with scripting off, it is searchable, and every cell can link.

So this book's home page carries a table of nine kinds with four columns — the kind,
the question and the shape of its answer, the model the kind writes down, and how to
recognise it — and the three circumstances that decide the method inside a kind.
That is the whole map, and it is read rather than walked.

**The one figure on the home page is a gallery, not a map.** `:::figure kind-shapes`
draws the shape of each answer in the same order as the table: a point, a set, or a
field, and for the field problems what the field does over time. It is not the retired
tree in another form. It answers "what does the answer look like?", which the table's
recognition column cannot show, and it carries no navigation and no decision. If a
future edit is tempted to add arrows between its panels, it has become the tree again.

The other two figures are on class pages, and they obey the ordinary rule: they mount
in a state that already carries the idea.

## How another book points here

A section that names a class links it with one line, and gets the map's own sentence
back rather than restating it:

```markdown
:::class saddle-point
```

The directive is `engine/src/textbook/hooks/classes.py`. It resolves the slug against
`map.yaml → pages`, emits a root-absolute `/numerical-methods/<slug>/` href inside one
small aside, and prints the entry's `signature` under the link. An unknown slug fails
the build, and so does a page in the registry with no signature — the two indexes are
not kinds of problem, and linking one as a kind would put "Kind of problem" in front
of a table.

The other direction is `:::used`, which a class page carries under **Used in this
collection**: it reads every book's pages for `:::class` at build time, so the list
cannot rot, and it prints a sentence rather than nothing when a class is not used yet.

Two rules for the section that uses it:

- **Put it where the class first becomes true**, not in a list at the top of the
  chapter. The reader needs it at the moment the method is chosen.
- **Do not restate the signature.** If the aside and the prose say the same thing in
  different words, one of them will drift. The prose says what the reader's model is;
  the aside says what kind of problem that makes it.

## Traps local to this book

- **No `scaffold:stub` under `docs/`.** A page listed in `map.yaml` exists because
  somebody wrote it. `tests/test_reference_books.py` checks that every listed page
  exists and appears on the home page.
- **`oracles: []`** — there is no bank and nothing is verified. The provenance is
  `sources.yaml`, and it is the only claim the book makes about being right.
- **No tier, no boards, no booklet, no Review.** Adding any of them makes it a
  course.
- **The class is a choice.** Every page that states a class also says that the class
  came from how the model was written down. A page that presents the class as a fact
  about nature contradicts `docs/index.md`, which is the page the whole book rests
  on.
- **One page, several boxes.** A system that belongs to three classes is normal, and
  `saddle-point` and `hyperbolic` both name Navier–Stokes to show it. A page that
  claims a system belongs to exactly one class is wrong.

## Adding to the map

A new class page: add the page, add its entry to `map.yaml → pages` in tree order,
add its row to the nine-kinds table in `docs/index.md` with the four columns the
others use, and add it to `techniques/` and `symptoms/` where it appears. Four
places, and `tests/test_reference_books.py` fails when they disagree — including
on the counts the home page opens with, which are measured from the pages rather
than typed.

A new technique: a row in `techniques/` under its family, naming the class, the step
in symbols, and the price. The step is the update the method repeats or the equation
it solves; a family may show its representative member, but a row with no arithmetic
is a glossary entry and fails `test_every_method_states_its_step_in_symbols`. It does
not get a page of its own until two class pages need the same derivation, because a
method page that is one paragraph is a table row with a URL.
