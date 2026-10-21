# AGENTS.md — Maths Applied

Read the root `AGENTS.md` first, then `books/AGENTS.md`. This file replaces the
parts of them that assume a course, and says what this book does instead. Where
the two disagree, **this file wins for `books/maths-applied/`** — except for
Theming, which is not negotiable anywhere.

## What this book is

**Maths Applied** is a book about modelling, worked out on one mechanism. It is
not a course. Nothing here is examined, no syllabus binds it, it has no tiers, no
boards, no problem banks, no booklet and no answers to mark.

The reader may be anyone: a student who has met trigonometry and wants to see it
used, an engineer reading for pleasure, someone who fixes cars. **Do not assume an
exam, a syllabus, a lecturer or a level.** The mathematics has to be the only
difficulty, and it has to be introduced where it is needed rather than where a
qualification would put it.

The one sentence the whole book serves:

> You do not need the full model. You need the model that answers your question,
> and the honesty to know which one that is.

## The rules that replace the chapter formula

The root's P1–P6 chapter formula is a *teaching* contract: teach first, then fade,
retrieve over gaps, interleave with earlier material. It assumes a reader working
through a course. This book keeps what is transferable — nothing opens on an
unguided task, every section has a destination, every interactive is guided — and
drops the rest. What it puts in their place is below, and it is binding.

### A model earns its place by failing

**Never introduce a more complex model until the simpler one has visibly stopped
answering the question being asked.** The order is the content: a rigid triangle
first, and only when it cannot answer "what happens when the wishbone has two
legs" does the second model appear. A section that opens with the complex model
has thrown away the chapter's argument.

The test for a new section: *what question does the previous model get wrong?*
Name it in the first paragraph. If the answer is "it does not get anything wrong,
the new one is more detailed", there is no section.

### Complexity is not correctness

The one-degree-of-freedom model is **correct** for the questions it answers. The
elaborate model answers a *different* question. The book never apologises for a
simple model, and never treats complexity as maturity.

- Write "the simplest model that answers this", not "a simplified model".
- Do **not** call a model naive, toy, crude, simplistic or a starting point for
  something "proper". Those words tell a reader that the honest answer is the
  complicated one, which is the opposite of the book's thesis.
- Banned outright when describing a model: **naive, toy, just, simply, properly,
  obviously, real, full**. ("Real" and "full" are the seductive ones: "the real
  model" implies every other model is a lie. Write the model's name instead —
  "the compliant model", "the two-leg model".)
- The lint rules already ban `just`, `simply`, `obviously`, `clearly`, `easy`,
  `trivial`. The rest is on you, and on review.

### Where two models overlap, show that they agree — with a number

Agreement is evidence, and evidence is a number a computer produced. Every section
ends by naming the earlier model, giving the number where the two agree, and
saying what the extra model actually bought.

- The number comes from data, **never** from prose written by hand. An agreement
  panel reads the exported `agreement` object (see **Data**), and the page must be
  rebuildable without a human touching the figure.
- Where the models **disagree**, that disagreement *is* the lesson. Name it, put it
  on the page, and explain it. Do not tune the model until it agrees.

### Two tracks, and the main thread stands alone

- The **main thread** must be readable end to end without opening a single depth
  page. Depth is offered, never required, and a reader who skips every one of them
  has still read the book.
- A depth page is a real page at a real URL, declared in `curriculum.yaml` under
  the section's `deeper:` list. The scaffold does **not** write it: it exists
  because somebody wrote it. `:::deeper <slug>` in the section's page is the only
  link needed, and it is a plain link with no script.
- Say on the depth page what the main thread already covered, so a reader who
  arrives there from search is not lost.

### Every interactive has a static frame

This is a repository rule and here it is load-bearing: a general reader was not
told to sit through an animation. A figure mounts in a state that already carries
the idea — the linkage drawn, the instant centre visible, the rigid curve on the
axes — and every value is reachable by the control without motion.

## Voice

The root's **Voice and language** applies in full: active voice, ~15–20 words a
sentence, plain English, no negative contractions, no shaming words, no slang or
idioms or cultural references, UK English, `you` for the reader and `we` for
reasoning together. Three things are particular to this book.

- **Name the model, always.** "The rigid model", "the two-leg model", "the
  compliant model" — never "the model" alone once there are two of them. A reader
  who loses track of which model is speaking has lost the chapter.
- **Numbers carry their meaning.** "The camber changes by 1.2° over 40 mm of
  travel" is worth more than "the camber changes a little", and less than "camber
  gain is 0.03°/mm". Give the size, the range, and what it is compared with.
- **Never imply more precision than the model has.** A model whose geometry is
  illustrative does not get four decimal places. Round to what the figure draws,
  and say when a number is illustrative.

## Structure of this book

- `book.yaml → section_pages: [learn]`. **A section is one page.** There is no
  Practise page and no verified bank, so `:::problems` / `:::answers` never appear
  here, and a section that needs practice is a section with a figure missing.
- `curriculum.yaml` is the source of truth for chapters, sections and deeper pages.
  `CURRICULUM-MAP.md` is generated; never edit it.
- `Chapter 1` is the whole book for now: §1.1–§1.5 are authored, §1.6–§1.7 are
  drafted as the destination. A drafted section says so on its page, in the reader's
  words, and stops rather than pretending.

## Figures

`assets/AGENTS.md` is binding: no colour anywhere, `kit.js` only, `SIZE` instead of
a font size, `label()` instead of a hand-written `<text>`, `scale()` instead of a
hand-built mapping, `animate()` with a scrubber and a still, `diagram()` when the
drawing's meaning is its named parts.

Three rules particular to this book:

- **The figure may not choose a number that the prose states.** If it prints 1.24°,
  the number comes from the model, not from a constant chosen to look right.
- **Geometry constants are the model's.** The linkage points are the same numbers
  in every figure and in the code that solves it. A figure that draws a different
  car from the one the prose describes is a bug, even if it looks better.
- **A 3D figure is a diagram, not a solver.** `camera3d()` gives a projection and a
  depth; drawing a linkage with it is fine. Do not grow a second 3D engine in a
  module — and remember a projected line is drawn by `line()` after `project()`,
  sorted by mean depth, with the scale computed **once** so the drawing does not
  breathe as the mechanism moves.

## Data

The numbers a figure draws come from a sweep of the mechanism, emitted as a static
ES module by the `suspension-kinematics` package, and copied into the site from
`docs/assets/data/`.

- **The payload shape is a contract**: `meta`, `sweep.input.values`,
  `sweep.frames[]`, `iterations[]`, `agreement`. Read the shape from
  `HANDOFF.md` in that repository before consuming a key.
- **`agreement` is evidence, not decoration.** An agreement panel reads it, or says
  in one sentence where its number comes from and what is not available. What it must
  never do is print a number a human typed. The package's four exports and one kernel
  are now vendored under `docs/assets/data/otkd/`, so there is nothing left to
  fetch: a panel that needs a value the package does not export says which value and
  why, in the reader's words, rather than leaving a marker in the page.
- A figure may solve a small closed-form problem in its own module (two circles
  meeting is arithmetic, not a solver). It may **not** carry a second implementation
  of the general solver, and it may not print iteration data it invented.

**Where a page's numbers come from, figure by figure.** Audited 2026-10-21: every figure that
displays an *engine result* reads `docs/assets/data/otkd/` — `kernel-camber` imports the rigid
kernel, `quarter-car` plots the vendored trajectory. The three that compute for themselves
(`wishbone-hero`, `solver-loop`, `stiffness-agreement`) are the three that teach a model, and they
are the book's on purpose: §1.2's evidence is that its front view agrees with the kernel, which
needs both. A new figure that needs an engine answer imports the bundle; it does not get a second
solver. The package's `docs/handoff-from-maths-site.md` carries the same table.

**A generated solver is not a second implementation.** `docs/assets/data/otkd/` holds
the `suspension-kinematics` package's own bundle: one `out.js` per model and a solver
it compiled to WebAssembly — the same derivation as its Python engine, not a hand
copy. A figure may import one
(`../data/otkd/models/double-wishbone/kernel/kernel.js`) and solve in the page. Four
rules:

- **Vendored means unchanged.** Do not edit anything under `otkd/`. Bump `VERSION` and
  `ZIP_SHA256` in `scripts/vendor-otkd.sh`, run it, and commit what it writes; CI runs
  `scripts/vendor-otkd.sh --check`, which verifies every file against the bundle's own
  `SHA256SUMS` with no network. `tests/test_maths_applied_data.py` also checks each
  kernel's embedded base64 against its `.wasm`.
- **One import, no fetch.** The binary travels inside `kernel.js` as base64, so a page
  needs no second request, no MIME type and no network. The `.wasm` file is there for
  provenance and inspection.
- **Say which model is speaking.** The kernel solves the three-dimensional mechanism
  and reports camber with the opposite sign to this book. A figure that uses it says
  both, as §1.2's does — and a difference between the two models is printed, never
  tuned away.

## The solver's findings are chapter material

`docs/handoff-from-maths-site.md` in `suspension-kinematics` carries a section — *Solver findings
the book could teach* — which the package keeps as part of its own instructions. Each entry is a
finding with a **tell**: a measurement that separates two explanations, which is what a reader can
reproduce. The energy error that did not shrink when the step was quartered. The residual that did
not move when the load changed by three orders of magnitude. The iteration trace that differed
between two machines while every frame was identical.

These are candidates, not a plan: the book decides how to teach one, and this chapter is where
several of them belong, because it is the chapter about modelling rather than about the answers.
When a section is written or revised, read that list and ask whether one of its tells would serve
the page better than a statement of the result. A wrong number with a reproducible reason teaches
more than a right one, and the package's own tests are where the tell was found.

## Snippets: pseudocode, not source

Each section shows its mathematics as **Python-style pseudocode** — the residual,
the Jacobian, the step, the rank test — with real names and real shapes and the
implementation elided. Then a link to the corresponding file in
`suspension-kinematics`.

Do **not** paste the package's source. A snippet that drifts from the code is a
lie; a snippet that must be kept identical to the code is a second copy of it.
What is checked is that the symbols the pseudocode uses exist in the real module —
not that the text matches.

## Before you publish a section

- The main thread is readable with every depth page closed.
- The section names the model, and names the question the previous model failed.
- An agreement panel shows a number, and that number came from data.
- Every figure mounts, in both schemes, at 390px, with a static frame that carries
  the idea on its own.
- The prose has no banned word, and no sentence that implies a simple model is a
  compromise.
- `python -m textbook.lint maths-applied` reports nothing, and the drift check is
  clean after `python -m textbook.scaffold`.

## What the book could hold next

Chapter 1 is one mechanism and four models. A second chapter should be a **different
mechanism**, chosen because a simple model of it fails in a way a reader can watch —
that is the pattern the book is built on, and a chapter without a failure at its centre
is a chapter of exercises.

Each proposal below states the question, the model that answers it first, the thing
that model cannot do, and the limit test that would connect the two. The limit test is
the entry condition: no test, no chapter.

1. **Steering: where the wheels point.** Two front wheels cannot both roll without
   slipping unless the inner one turns further — Ackermann's geometry, which is a
   four-bar problem and uses §1.2's machinery directly. The simple model predicts a
   turning circle from the wheelbase and the steer angle, and it is wrong at any speed,
   because a tyre turns because it slips. The bicycle model with slip angles fixes
   that. **Limit test:** as speed goes to zero the slip angles vanish and the bicycle
   model's radius becomes Ackermann's. Two routes, one number.
2. **The differential: two degrees of freedom.** Count the mobility of a bevel-gear
   differential and it comes out at two, not one — which is why a car can go round a
   corner at all, and why one wheel on ice stops it. The simple model (both wheels turn
   together) is a locked axle, and it fails at the first corner. **Limit test:** with
   the differential's own constraint the two output speeds average to the input's, and
   in a straight line they are equal — the locked model's answer, recovered as a case.
3. **Mass and the quarter car** (§1.6, finished). One mass on a spring gives a natural
   frequency, and it is the wrong frequency, because the wheel has mass too. **Limit
   test:** as the unsprung mass goes to zero the two-mass model's first mode becomes
   the one-mass frequency, monotonically.
4. **Progressive springs and bump stops.** A linear spring is right in the middle of
   the travel and wrong at the ends, where the bump stop takes over. **Limit test:** at
   small travel the piecewise model is the linear one, exactly, and the difference grows
   with travel — the same shape of argument as §1.5's stiffness ladder.
5. **Measuring it: how you know a model is right.** Every comparison in Chapter 1 is
   between two models. This chapter would compare a model with a car: error bars,
   regression, residual degrees of freedom, and the difference between "these agree"
   and "this is right". It is the chapter the book owes its reader, and the only one
   that cannot be written from a figures-only model.
6. **The bicycle that stays up.** The famous case of a simple explanation that is
   incomplete: gyroscopic effects are not what keeps a bicycle upright. **Limit test:**
   the model must reproduce the known result that a bicycle with no gyroscopic effect
   can still be self-stable — which is a test of the *explanation*, not of a curve.

**Kinds of question are not a chapter of this book.** A map of problem classes was
proposed as chapter 0 and rejected: this book's rules (a model earns its place by
failing; one mechanism; the main thread stands alone) cannot host a lookup, and the
map is entered by symptom rather than read in order. It is a reference work of its
own — `books/numerical-methods/`, which records the decision in its `AGENTS.md`.
The callbacks are not written yet: a section that names a class should link there
with a root-absolute href, `/numerical-methods/<slug>/`, the way `:::prove` links a
proof. Until then, a section names the class in words and links the page plainly.
