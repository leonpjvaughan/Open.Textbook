# HANDOFF — Maths Applied, Chapter 1: Suspension Kinematics

**Status:** executed, and kept as the record
**Written:** 2026-10-18
**Spans:** two repositories, then — `suspension-kinematics` and this one; one now, at
`solvers/otkd` (the old repository is archived)
**Reader of this file:** an agent with no prior context for this work

> **Historical, 2026-10-26.** This handoff was carried out. The package it tells you to
> create lives in this repository at `solvers/otkd`, imports as `open_textbook.otkd`,
> and the repository it was created in is archived. Every command below that names
> `suspension-kinematics` or a `scripts/*.cjs` helper is the state of the work on the day
> it was written: the helpers became `node tools/dist/cli.js <command>`, and the paper
> path is in `DECISIONS.md` under 2026-10-26. The decisions are still the book's, which
> is why the file is kept.

You are building a new book in an existing, opinionated repository. Read the
repository before you write anything; most of the rules you need already exist and
are binding. This file adds the decisions that were made for *this* book and
nothing else.

---

## Read first

In `maths-site`, in this order:

1. `AGENTS.md` — the operative rules. Note especially **The chapter formula**,
   **Voice and language**, **Theming**, **Conventions**, and the rule that a
   reference work is not a course.
2. `SHAPE.md` — what a new book requires, how builds and profiles work.
3. `DECISIONS.md` — the reasoning behind the shape. Two matter here: *"An
   assertion is data; display is free"* and *"The figure kit is a library, and
   `assets/figures/` is shared"*.
4. `ideas.md` §4.7 (`solid3d()`) and §4.10 (`animate()`) — the 3D and animation
   primitives, and the evidence behind them.
5. `assets/AGENTS.md` — the figure kit and the rules a figure obeys.
6. `books/proofs/` — the precedent for **a book that is not a course**.
7. `books/ie-jc-maths/docs/assets/figures/fraction-strip.js` — the shape of a
   real interactive figure: `mount(el)`, `panel()`, `slider()`, `react()`, no
   colour anywhere.

Also read the contents of this handoff's appendix, which is short.

---

## MISSION

Deliver two phases, in order.

**Phase A.** Create a new public Python repository, `suspension-kinematics`: a
configurable multibody kinematics solver, with the mechanism's *topology* and its
*geometry* as separate pydantic configs, plus examples, tests, and a CLI that
emits figure data as an ES module.

**Phase B.** Add a new book, `books/maths-applied/`, to `maths-site`, containing
one finished chapter on suspension kinematics. Sections §0–§4 fully authored and
interactive; §5–§6 drafted as the chapter's destination.

Each phase is independently verifiable. **Phase B depends on Phase A.** Finish and
verify Phase A before starting Phase B; the book consumes the export, and a moving
contract will cost more than it saves.

---

## SCOPE

**Phase A owns:** the whole of `github.com/leonpjvaughan/suspension-kinematics`.

**Phase B owns:** `books/maths-applied/**`, plus exactly two edits elsewhere in
`maths-site`:

- one entry in `collection.yaml` (the `Misc` qualification);
- one figure-data location under the book's own `docs/assets/`, if the pipeline
  does not already copy it (verify first, see **Escalate when**).

Nothing else in `maths-site` is in scope.

---

## OUT_OF_SCOPE

- No changes to other books, `themes/`, the portal template, or `engine/` beyond a
  single optional hook for the `:::deeper` track.
- No new `engine/` Python dependency. **No `scipy` in `engine/`.**
- No problem banks, no tiers, no boards, no booklet, no profiles.
- No Pyodide in v1. Design the seam; do not build it.
- No full-vehicle or aerodynamic simulation in v1.
- Do not restructure the collection, rename existing books, or "improve" shared
  assets while you are here.

---

## CONTEXT — accepted decisions

These were decided with the author. Do not relitigate them; if one is impossible,
escalate rather than substitute.

| Decision | Value |
|---|---|
| Reader | **Anyone interested.** Not tied to any curriculum. Two tracks: an accessible main thread, and optional depth for a reader who wants more. |
| Book id | `maths-applied` |
| Book title | **Maths Applied** |
| Collection group | `Misc` (new qualification) |
| Structure | No tiers, no boards, single profile, no banks, no booklet |
| Code repo | `suspension-kinematics`, public, MIT |
| Config split | `Topology` (connectivity, no numbers) + `Geometry` (every number) |
| Computation | **Precomputed `.js` data modules.** Pyodide seam designed but unbuilt. |
| 3D | 2D front view for derivation; `camera3d()` for the hero. |
| v1 cut | §0–§4 authored and interactive; §5–§6 drafted. |
| Snippets | **Python-style pseudocode of the maths**, not extracted source. |

### Why precomputed rather than live

A 1-DOF mechanism needs about two hundred frames of a handful of numbers each —
tens of kilobytes. Precomputing means no network at runtime, no 30 MB download on
a phone, no async race, and it works offline under the service worker the
repository already ships.

The **same payload shape** is produced whether a sweep is generated by a CLI at
build time or in a Web Worker at runtime, so a later Pyodide path is a drop-in for
the one panel where the reader types their own geometry: loaded on idle, in a
worker, cached by the service worker. Leave that seam visible in the code and in a
comment. Do not build it.

### Why `scipy` is allowed in Phase A

`DECISIONS.md` declines `scipy` **as a verification oracle** — because a textbook
answer needs a stated accuracy rather than machine precision, and a compiled
dependency was not worth it there. That decision is about `engine/` and the problem
banks. It does not apply to an independent solver package, where
`scipy.optimize.least_squares` and `scipy.linalg.svd` are the right tools.

Keep `scipy` out of `engine/`. That keeps the existing decision intact.

---

# PHASE A — `suspension-kinematics`

## A1. Create the repository

```bash
gh repo create leonpjvaughan/suspension-kinematics --public \
  --description "Configurable multibody kinematics for suspension geometry" \
  --license MIT --clone
```

Layout, `src` layout, hatchling, managed with `uv`:

```
pyproject.toml
README.md
LICENSE
src/suspension/
  __init__.py
  config.py       Topology, Geometry, Model, Driver, validation
  joints.py       revolute / spherical / distance: residual contributions
  derive.py       sympy: residual + Jacobian -> lambdify(cse=True)
  analytic.py     circle-circle, circle-sphere closed forms
  solve.py        newton(), least_squares(), svd_diagnose()
  sweep.py        drive the DOF, tabulate, enforce branch continuity
  outputs.py      camber, toe, instant centre, roll centre, track change
  export.py       emit an ES module
  cli.py          `suspension export <model> <out>`
examples/
  double-wishbone/
    topology.yaml
    geometry.yaml
    sweep.py
tests/
```

## A2. The config split — do this first

This is the design that everything else rests on. Get it right before writing the
solver.

```python
class Joint(BaseModel):
    name: str
    kind: Literal["revolute", "spherical", "distance"]
    body_a: str                 # body name; "ground" is the chassis
    body_b: str


class Topology(BaseModel):
    """Connectivity only. No coordinates, no lengths, no masses."""
    bodies: list[str]
    joints: list[Joint]
    driver: Driver              # which joint, which axis, swept over what


class Geometry(BaseModel):
    """Every number, keyed by names the Topology declares."""
    points: dict[str, Vec3]
    axes: dict[str, Vec3]
    lengths: dict[str, float]
    stiffness: dict[str, float] = {}


class Model(BaseModel):
    topology: Topology
    geometry: Geometry
```

Requirements:

- `Topology` contains **no numbers**. `Geometry` contains **all of them**.
- `Model` validates that every name `Topology` references exists in `Geometry`, and
  fails loudly and specifically when it does not.
- One topology, many geometries. This is what makes a sweep a loop over `Geometry`
  only, and what makes design optimisation possible later without re-deriving the
  constraints.

## A3. The solver

- Derive the residual **and** the Jacobian symbolically with `sympy` in
  `derive.py`, then `lambdify(..., cse=True, modules="numpy")`. Never
  hand-differentiate. The Jacobian is where the bugs live; sympy cannot get it
  wrong.
- `newton()` — square system, with a documented step limit and a residual
  tolerance.
- `least_squares()` — `scipy.optimize.least_squares`, `method="lm"`. Return
  `cost`, `optimality`, and the singular values of `J` at the solution.
- `svd_diagnose()` — return the singular values, the null-space basis over
  constraint rows, and **which row indices are dependent**. Section §3 displays
  exactly this; do not compute it in JavaScript.
- `analytic.py` — closed-form circle-circle and circle-sphere. Used both as the
  fast path and as the independent cross-check for the numeric solver.
- **Branch continuity is mandatory.** Every solve seeds from the previous frame
  and records when the selected branch changed. A silent branch flip destroys a
  camber curve and looks like a physics bug.

## A4. Export contract

`export.py` emits an **ES module, not JSON** — static import, no fetch, no async,
works offline:

```js
export const meta = { model: "dw-1dof", units: "m", branch: "upper" };
export const sweep = {
  input: { name: "theta", unit: "rad", values: [ /* ... */ ] },
  frames: [
    { theta, lbj: [x, z], ubj: [x, z], camber, toe, ic, rc, track },
    // ...
  ],
};
export const iterations = [
  { k, residual: [ /* ... */ ], singular_values: [ /* ... */ ] },
];
export const agreement = {
  analytic: [ /* ... */ ],
  numeric: [ /* ... */ ],
  max_abs_diff: 1.2e-14,
};
```

Round to what the figure draws. `agreement` is **not** decoration — it is
asserted in CI and it is read by the book's agreement panels.

## A5. Acceptance — Phase A

`uv run pytest` passes, and it includes these four tests, which are the
load-bearing ones:

1. **analytic ≡ numeric.** Over the full travel range, the closed form and Newton
   agree to `|Δ| < 1e-9`.
2. **least-squares ≡ direct.** With the redundant constraint removed, the
   least-squares solution equals the square direct solve.
3. **SVD identifies exactly one null direction** in the two-leg model, and
   dropping that row restores a well-conditioned system whose solution matches
   (2).
4. **stiffness → ∞ converges to rigid.** The elastokinematic camber curve
   approaches the kinematic one monotonically as bushing stiffness increases.

Also:

- `suspension export` is deterministic: re-running it reproduces the committed
  `.js` byte for byte.
- The README states the limits honestly: rigid bodies, small deformations, no
  friction, no tyre deflection, no dynamics.

These four tests are not incidental. They are the chapter's argument, executed. The
book claims that a simple model and a complex model agree wherever both apply; the
test suite is where that claim is proved.

---

# PHASE B — `maths-site`

## B1. Registration

Add to `collection.yaml` under `qualifications:`:

```yaml
  - id: Misc
    title: Misc
    note: Material that belongs to no qualification.
```

Create `books/maths-applied/book.yaml`:

- `id: maths-applied`
- `title: Maths Applied`
- `qualification: Misc`
- `subject: Applied Mathematics`
- one profile: `id: book`, `name: Read`, `tier_filter: all`, `default: true`
- **no** `boards`, **no** `tier_axis`, **no** `oracles`
- a subject tint in `theme`, chosen to be legible on every bundle (the contrast
  test decides, not taste)

Then:

```bash
python -m textbook.scaffold
python -m textbook.portal
```

Author over the stubs. `books/maths-applied/curriculum.yaml` is the source of
truth for the chapter and its sections; `CURRICULUM-MAP.md` is generated.

## B2. The book's `AGENTS.md` — the voice

This is a deliverable, not a formality. The root `AGENTS.md` fixes the reader at
14–16 with the P1–P6 chapter formula. **That does not apply here**, and the book's
own `AGENTS.md` must say so and say what replaces it.

Write it to say, in substance:

- **A model earns its place by failing.** Never introduce a more complex model
  until the simpler one has visibly stopped answering the question being asked.
- **Complexity is not correctness.** The one-degree-of-freedom model is correct for
  the questions it answers. The elaborate model answers a *different* question.
  The book never apologises for a simple model and never treats complexity as
  maturity.
- **Where two models overlap, show that they agree, with a number.** Agreement is
  evidence. Where they disagree, that disagreement *is* the lesson — name it.
- **Words banned when describing a simple model:** "naive", "toy", "just",
  "simply", "properly", "obviously", "real", "full". Prefer "the simplest model
  that answers this".
- **Every interactive has a static frame** that carries the idea. This is a
  repository rule, and here it is load-bearing: a general reader is not a cohort
  who was told to sit through the animation.
- **Two tracks.** The main thread must be readable end to end without opening a
  single `:::deeper` page. Depth is offered, never required.
- The reader may be anyone. Do not assume an exam, a syllabus, or a lecturer.

## B3. Chapter outline

Each section has: a main thread → one interactive → an **agreement panel** → a
`:::deeper` branch.

| § | Title | Model | Method | Agreement panel |
|---|---|---|---|---|
| 0 | The question | — | — | — |
| 1 | One rigid triangle | wishbone = 1 body, 1 DOF | **direct** — square system, closed form | closed form ≡ Newton to 1e-14. *The expensive solver earned nothing.* |
| 2 | Two legs, one contradiction | wishbone = 2 legs | **least squares** | residual floors near 1e-15; `J` has a zero singular value |
| 3 | The redundancy was ours | same | **SVD → drop → direct** | least-squares ≡ reduced direct |
| 4 | Bushes are not rigid | springs replace a constraint | **equilibrium — still algebraic, still sweepable** | stiffness → ∞ ≡ §1's rigid curve |
| 5 | Mass and dampers *(draft)* | quarter car | DAE, time integration | mass, damping → 0 ≡ quasi-static |
| 6 | Full vehicle *(outline)* | tyre, road, aero | coupling | — |

**§4 is the centrepiece.** A stiffness slider drags the compliant camber curve
until it lies on the rigid one. That is the book's thesis, made draggable, and it
is the clearest possible payoff for the "do not go full complexity just because"
ethos.

Each section should end with a throw-back: name the earlier model, show the
number where the two agree, and say what the extra model actually bought.

## B4. Figures

Modules under `books/maths-applied/docs/assets/figures/`, data under
`books/maths-applied/docs/assets/data/`, mounted with `:::figure <slug>`. Build
with the existing kit — `panel`, `slider`, `animate`, `camera3d`, `line`, `label`,
`react`. **No colours anywhere. No number chosen by the figure.**

- `wishbone-hero` — 2D front view; θ slider; live readout of camber, toe, instant
  centre and roll centre; the linkage redrawn each frame.
- `wishbone-3d` — the same model through `camera3d()`, rods and lines.
  **Verify first** that `camera3d()` can draw arbitrary 3D segments; see
  **Escalate when**.
- `solver-loop` — the cycle residual → Jacobian → linear solve → step, as a
  diagram with a step-through over the exported `iterations`.
- `stiffness-agreement` — the §4 slider, both curves drawn, the gap shrinking to
  zero.

Above the hero, include a **free-licence reference photograph** of a double
wishbone (Formula-style or road car) for comparison:

- Wikimedia Commons **CC0 or CC BY-SA** only.
- Record it in `books/maths-applied/sources.yaml` with `url`, `retrieved` date,
  and `role`.
- Credit it in the caption.
- **No team trade dress, sponsor livery, or identifiable championship branding.**
  If you cannot find one that is clean, draw the comparison diagram instead.

## B5. The `:::deeper` track

Prefer the smallest possible addition. In order:

1. A styled aside in the page with a relative link. No engine change at all.
2. If a directive is genuinely needed, add **one** hook alongside `:::prove` that
   expands to a link and nothing else — no script, no dialog — because a reader
   with scripting off must still reach the page.

Do not touch the nav, the scaffold, or the curriculum map to achieve this.

## B6. Pseudocode, not source

Each section presents the maths as **Python-style pseudocode**: the residual, the
Jacobian, the step, the rank test. Real names, real shapes, implementation elided.
Then a link to the corresponding file in `suspension-kinematics`.

Guard against drift lightly: a test that asserts the symbols used in the
pseudocode exist in the real module. **Not** byte equality — that would defeat the
point of pseudocode.

## B7. Acceptance — Phase B

- §0–§4 authored end to end. `grep -rl 'scaffold:stub' books/maths-applied/docs/`
  prints nothing for those sections.
- Every figure mounts and renders in **both** schemes; passes
  `node tools/dist/cli.js audit site` at 390px.
- Every animation has a static frame that carries the idea on its own.
- Every agreement panel's numbers come from the exported `agreement` object, not
  from prose written by hand.
- `python -m textbook.lint` reports nothing for the book.
- The pipeline builds with no broken links and no `math-error` page.
- `pytest tests/ -q` and `scripts/check.sh` pass.

---

## VERIFICATION

```bash
# Phase A — now `solvers/otkd` in this repository
uv run --project solvers/otkd --frozen pytest -q
scripts/build-otkd.sh --verify                # the committed bundle matches its sums

# Phase B
cd maths-site
python -m textbook.scaffold
python -m textbook.portal
python -m textbook.lint
while read -r -a b; do python -m textbook.pipeline "${b[@]}"; done \
  < <(python -m textbook.plan --configs)
grep -rl 'math-error' site --include='*.html'   # must print nothing
node tools/dist/cli.js audit site
node tools/dist/cli.js audit site --mobile
pytest tests/ -q
scripts/check.sh
```

---

## ESCALATE WHEN

Stop and report, rather than working around:

- `camera3d()` cannot draw arbitrary 3D line segments (it may be solid-only).
  Stop **before** building `wishbone-3d`; do not build a second 3D engine.
- The pipeline does not copy `docs/assets/data/`, or the figure loader cannot
  resolve a relative import to it. This is a pipeline question, not a book one.
- `:::deeper` cannot be done as one hook without touching the nav or scaffold.
- The two-leg model turns out **inconsistent** rather than merely redundant. That
  is a *better* §2 — "least squares copes" becomes "your model is wrong" — but it
  is a different section, so confirm before rewriting.
- No CC0/CC BY-SA photograph exists that is free of trade dress.
- The `Misc` group needs a portal template change to render sensibly.
- Any existing `maths-site` test fails for reasons unrelated to this work.

---

## EXECUTION

- **Model class:** high. **Effort:** high. **Isolation:** isolated context.
- **Tools:** full during Phase A. Phase B must not write outside its scope.
- **Order:** Phase A verified, then Phase B. Do not start the book against an
  unverified export.
- Persist durable state in `suspension-kinematics` issues (Phase A) and
  `.agents/todo.md` (Phase B). Do not persist progress in the transcript.

---

## Appendix — what this book is not

Stated plainly, because the temptation is real:

- It is **not** an exam text. Nothing here is examined, and no board's wording
  binds it.
- It is **not** a vehicle dynamics textbook. It is a book about *modelling* — about
  choosing the simplest model that answers the question, and knowing when to stop.
- It is **not** a software manual. The code is a means of showing the maths, and
  the pseudocode is the maths.
- It is **not** exhaustive. §6 is where the book points, not where it ends.

The one sentence the whole book serves:

> You do not need the full model. You need the model that answers your question,
> and the honesty to know which one that is.
