# AGENTS.md — Maths Applied

Root and `books/AGENTS.md` first. Where they assume a course, **this file wins for
`books/maths-applied/`** — except Theming, which is not negotiable anywhere.

## What this book is

A book about modelling, worked out on one mechanism. Not a course: nothing examined, no
syllabus, no tiers, boards, banks, booklet or answers to mark. **Do not assume an exam, a
syllabus, a lecturer or a level.** The mathematics must be the only difficulty, introduced
where it is needed.

> You do not need the full model. You need the model that answers your question, and the
> honesty to know which one that is.

## Rules that replace the chapter formula

The root's P1–P6 is a *teaching* contract. Keep what transfers: nothing opens on an unguided
task, every section has a destination, every interactive is guided. Drop the rest.

### A model earns its place by failing

**Never add a more complex model until the simpler one has visibly stopped answering the
question.** Rigid triangle first; the second model when the first cannot answer "what if the
wishbone has two legs".

New-section test: *which question does the previous model get wrong?* Name it in the first
paragraph. "Nothing — the new one is more detailed" means no section.

### Complexity is not correctness

One degree of freedom is **correct** for the questions it answers; the elaborate model
answers a *different* question. Never apologise for a simple model or treat complexity as
maturity.

- "the simplest model that answers this", never "a simplified model".
- Never call a model naive, toy, crude, simplistic or a starting point for something "proper".
- **Linted:** `naive`, `toy`, and every book's `just`, `simply`, `obviously`, `clearly`,
  `easy`, `easily`, `trivial`. "The naive error bar" and "a toy car" are ordinary senses: each
  a row in `ALLOWED_PHRASES`, fixed there, never by narrowing the rule.
- `real`, `full`, `properly`: review rule, not lint; write the model's name ("the compliant
  model", "the two-leg model"). `crude`, `simplistic`: banned, not linted yet.

### Where two models overlap, show they agree — with a number

- Every section ends naming the earlier model, the number where the two agree, and what the
  extra model bought.
- That number comes from data, **never** hand-written prose: an agreement panel reads the
  exported `agreement` object (see **Data**).
- Where they **disagree** the disagreement *is* the lesson: name it, put it on the page,
  explain it. Never tune the model until it agrees.

### Two tracks, and the main thread stands alone

- The **main thread** reads end to end without opening a depth page. Depth is offered, never
  required.
- A depth page is a real page at a real URL, declared in `curriculum.yaml` under the
  section's `deeper:`; the scaffold does **not** write it. `:::deeper <slug>` is the only
  link needed — a plain link, no script. Say on it what the main thread covered.
- **The sidebar says "Main thread", not "Overview"**: `book.yaml → section_page_label` names
  the engine's "Overview" in this book's vocabulary.

### Every interactive has a static frame

A figure mounts in a state that already carries the idea — linkage drawn, instant centre
visible, rigid curve on the axes — and every value is reachable by the control without
motion.

## Voice

The root's **Voice and language** binds in full. Three rules are particular to this book.

- **Name the model, always** — "the rigid model", "the two-leg model" — never "the model"
  once there are two.
- **Numbers carry their meaning**: "camber gain is 0.03°/mm", not "the camber changes a
  little"; give size, range and comparison.
- **Never imply more precision than the model has**: an illustrative geometry does not get
  four decimal places; round to what the figure draws, and say when a number is illustrative.

## Structure of this book

- `book.yaml → section_pages: [learn]`: **a section is one page.** No Practise page, no
  verified bank, so `:::problems` / `:::answers` never appear; a section needing practice is
  a section with a figure missing.
- `curriculum.yaml` is the source of truth for chapters, sections and depth pages.
  `CURRICULUM-MAP.md` is generated; never edit it.
- `Chapter 1` is the whole book so far. An outline section says so on its page, in the
  reader's words, and stops rather than pretending.

## Figures

`assets/AGENTS.md` binds: no colour, `kit.js` only, `SIZE`, `label()`, `scale()`,
`animate()` with a scrubber and a still, `diagram()` when the meaning is its named parts.

- **The figure may not choose a number the prose states**: a printed 1.24° comes from the
  model, never from a constant chosen to look right.
- **Geometry constants are the model's**: the same linkage points in every figure and in the
  code that solves it. A figure drawing a different car from the prose is a bug.
- **A 3D figure is a diagram, not a solver**: `camera3d()` gives a projection and a depth;
  never grow a second 3D engine in a module. A projected line is drawn by `line()` after
  `project()`, sorted by mean depth, with the scale computed **once**.

## Data

Numbers come from a mechanism sweep: a static ES module from the `otkd` package, copied into
the site from `docs/assets/data/`.

- Payload contract: `meta`, `sweep.input.values`, `sweep.frames[]`, `iterations[]`,
  `agreement`. Read `docs/assets/data/otkd/README.md` before consuming a key.
- `agreement` is evidence, not decoration. A panel reads it, or states in one sentence where
  its number comes from and what is missing. Never print a number a human typed.
- Nothing is fetched: exports and kernel are vendored under `docs/assets/data/otkd/`. A panel
  needing an unexported value names it and why, in the reader's words, never as a page marker.
- A figure may solve a small closed-form problem in its module (two circles meeting is
  arithmetic, not a solver). Never a second general solver; never invented iteration data.
- `docs/assets/data/otkd/` is built from `solvers/otkd`: one `out.js` per model, plus a
  solver compiled to WebAssembly from the same derivation as its Python engine. Import one:
  `../data/otkd/models/double-wishbone/kernel/kernel.js`. Vendored means unchanged: edit
  nothing under `otkd/`, change `solvers/otkd`, run `scripts/build-otkd.sh`, commit what it
  writes. The gate and deploy run `--verify` against `SHA256SUMS` offline; changed-path CI
  rebuilds and diffs. `tests/test_maths_applied_data.py` checks each kernel's base64 against
  its `.wasm`.
- One import, no fetch: the binary is base64 inside `kernel.js`; the `.wasm` is provenance.
- Say which model is speaking: the kernel solves the three-dimensional mechanism and reports
  camber with the opposite sign to this book. A figure that uses it says both. A difference
  between models is printed, never tuned away.

## The solver's findings are chapter material

`solvers/otkd/AGENTS.md` carries *Solver findings are teaching material*: each entry is a
finding with a **tell**, a measurement that separates two explanations and that a reader can
reproduce. When writing or revising a section, ask whether a tell serves the page better
than a statement of the result.

## Snippets: pseudocode, not source

Each section shows its mathematics as **Python-style pseudocode** — residual, Jacobian, step,
rank test — with real names and shapes, the implementation elided, then links the
corresponding file in `otkd`.

Do **not** paste the package's source. Checked is that the symbols exist in the real module,
not that the text matches.

## Before you publish a section

- The main thread is readable with every depth page closed.
- The section names the model, and the question the previous model failed.
- An agreement panel shows a number, and that number came from data.
- Every figure mounts, in both schemes, at 390px, with a static frame that carries the idea.
- The prose has no banned word, and no sentence implying a simple model is a compromise.
- `python -m textbook.lint maths-applied` reports nothing, and the drift check is clean after
  `python -m textbook.scaffold`.

## What the book could hold next

A second chapter must be a **different mechanism** whose simple model fails in a way a reader
can watch: state the question, the first model, what it cannot do, and a **limit test**. No
test, no chapter; candidates with their limits are in `ideas.md`.

**Kinds of question are not a chapter of this book**: that map is `books/numerical-methods/`.
`:::class <slug>` resolves against `map.yaml → pages`, emits a root-absolute
`/numerical-methods/<slug>/` href in one small aside, prints the entry's `signature`, and
fails the build on an unknown slug. Put it where the class first becomes true.
