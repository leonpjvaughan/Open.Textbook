# IDEAS — interactive and visual aids

**What this is.** The design queue for how this collection *shows* mathematics, as
opposed to how it states it. Every idea here is judged by what it helps a reader do, not
by whether the kit can do it today — **the kit is ours and it is extensible**, and a
missing interaction is a design task rather than a reason to drop an idea.

**Where it sits.** Alongside `SHAPE.md`, `PROBLEMS.md` and `BOOKLETS.md` as a root
document: read by a person as often as by an agent, and about the collection rather than
one book. The rules an idea must obey are in `AGENTS.md`; the figure contract is in
`assets/AGENTS.md`; the reasoning behind guided investigations is in
`research/pedagogy.md`; the measured state of what exists is in
`research/design/reuse-audit.md` and `research/design/figure-audit.md`.

**Retrieved:** 2026-10-16. Every count below is a command and its output. Anything not
measured says so.

---

## 1. What exists, measured

```
$ find books/*/docs/assets/figures -name '*.js' ! -name kit.js ! -name figures.js | wc -l
209

$ # per book
  gcse-maths              39 modules   25 chapters
  a-level-maths           58 modules   16 chapters
  gcse-physics            37 modules   10 chapters
  a-level-physics         30 modules    9 chapters
  proofs                  12 modules   23 proof pages (12 carry a figure)
  ie-lc-maths              8 modules   18 chapters
  ie-lc-applied-maths      6 modules    9 chapters
  ie-lc-physics           19 modules   22 chapters
  ie-jc-maths              0 modules   22 chapters
```

The four English books together are **164 modules across 60 chapters**, about 2.7 each.
The Irish books are **33 modules across 71 chapters**, and 22 of those chapters have none
at all.

**Junior Cycle Mathematics has no interactive figure at all** — 22 chapters and 129
sections of prose, worked examples and practice. It is both the largest gap and the one
where a visual pays most, because its reader is 12–14.

### The interaction vocabulary in practice

```
$ # counting the 209 modules
  209  call panel()          the frame, the accessible name, the readout
  208  call react()          redraw on input
  202  call slider()         the dominant control by a wide margin
   24  call chooser()        a select, for 3-6 named alternatives
   12  call toggle()         a checkbox, for on/off
   22  call scale()          map a domain onto a range
   35  call label()          positioned text, with a colour class by default
   31  call fmt()            a reader-facing number
  173  call toFixed()        a coordinate — not a reader-facing value
    0  use requestAnimationFrame
    0  handle a key event
   10  handle a pointer event (all 10 also create a native <button>)
    0  create a <table>
```

One shape accounts for nine modules in ten:

> **a panel, one or two sliders, a hand-drawn SVG that redraws, and a live readout.**

That is the pattern that has survived 209 authors, and it is cheap to build and easy to
check. It is also, on this evidence, the *only* one — which is the interesting fact. Nine
interaction forms in §3 have no kit support at all.

**Every module is keyboard-operable.** 208 mount a kit control (a native `<input>` or
`<select>`); the one that mounts none (`gcse-physics/radiation-penetration.js`) creates
`<button>` elements with `aria-pressed`. Nothing here needs a keyboard fix. That is a
property worth keeping as the kit grows: **a new interaction must arrive keyboard-operable
or not arrive.**

**Nothing animates.** Zero modules call `requestAnimationFrame`. Motion exists only in the
optional page backgrounds, which honour `prefers-reduced-motion`.

### Where the figures are not yet using the kit

```
$ 136 of 209  hand-write a <text> element and never call label()
$  35 of 209  call label()
```

`label()` exists because a `<text>` with no `fig-*`/`text-*` class is painted with
`fill`'s initial black and disappears on a dark panel — a defect `scripts/audit-figures.cjs`
found eighteen times. Those 136 modules are protected only because the audit measures
rendered contrast on every build; the trap is live in them.

### What a figure cannot currently be shared

```
$ grep -A7 '^SHARED_FILES' engine/textbook/scaffold.py
SHARED_FILES = (
    "assets/stylesheets/themes.css", "assets/stylesheets/extra.css",
    "assets/stylesheets/settings.css", "assets/settings/settings.js",
    "assets/figures/figures.js", "assets/figures/kit.js",
)

$ find books -name '*.js' -printf '%f\n' | sort | uniq -d
  circular-motion.js        a-level-physics  +  ie-lc-applied-maths
  radiation-penetration.js  gcse-physics     +  ie-lc-physics
  transformer-turns.js      gcse-physics     +  ie-lc-physics
  vector-addition.js        a-level-physics  +  ie-lc-maths
$ # and none of the four pairs is a copy
  circular-motion.js — differs (140 vs 104 lines)
  radiation-penetration.js — differs (137 vs 113 lines)
  transformer-turns.js — differs (99 vs 103 lines)
  vector-addition.js — differs (171 vs 180 lines)
```

A figure module cannot be used by two books. Four ideas are therefore implemented twice,
and none of the four pairs is a copy — each pair is the same lesson written twice,
differently. Every idea in §5 will be built at least twice unless this changes first.

### What the reader gets besides pages

- **Search**, by Pagefind, over the built site.
- **A theme menu** and a light/dark preference, remembered in `localStorage`.
- **A booklet widget** — the SEC Formulae and Tables for `ie-lc-maths`, board- and
  tier-aware, with the board choice remembered.
- **Offline reading** — a service worker (`assets/settings/service-worker.js`, 144 lines
  of precache and fetch) and a web manifest. The collection is an installable PWA.
- **Answers in a collapsed block** on every Practise page, so a reader attempts first.

There is **no** progress, no retrieval scheduling, no self-check, no notes, no
bookmarking. `localStorage` is used by exactly two files, for a theme and a board. The
relevance prompt that `research/pedagogy.md` describes as "stored client-side" is prose on
the chapter index and is **not stored**.

---

## 2. What decides whether an idea is worth building

Only two things, and neither is technical.

**It must teach, not decorate.** `research/pedagogy.md` P6: guidance is what improves
outcomes from an investigation (Lazonder & Harmsen, d = 0.50), and the EEF recommends
eliciting a prediction, justifying it, and reconsidering it with evidence. Every figure
therefore runs **Predict → Test → Explain**, the explanation is asked for and never
printed, and there is no unguided sandbox. A figure does not count as teaching, and the
budget is one guided figure per Learn page with hooks, applications and tools together
under about a quarter of a chapter.

**It must be usable by everyone or not ship.** Native controls so the keyboard works;
never colour as the only signal; no colour literals, only `fig-*`/`text-*` and `--tb-*`;
a drawing has `role="img"` and a name and a readout is a live region without `role="img"`.
Six of these are enforced by `tests/test_figures.py`, and the rendered contrast of every
figure in both schemes is measured by `scripts/audit-figures.cjs` on every build.

Everything else — how many sliders, whether it animates, whether it needs a new primitive,
whether it wants a library — is an engineering decision to be made per idea. That is the
point of this file.

---

## 3. The design space — what a reader can *do*

Ordered by how much of the space is unexplored. "Today" is the measured count from §1.

| Form | What the reader does | Today | What it needs | Where it pays |
|---|---|---|---|---|
| **Parameter** | moves a slider and watches one quantity change | 202 | — | everything |
| **Alternative** | picks from a few named options | 24 | — | method choice, cases, models |
| **Switch** | turns a layer on or off | 12 | — | overlays, sign conventions, units |
| **Step** | advances a procedure one step at a time | 4 | a `stepper()` primitive | constructions, algorithms, proofs |
| **Drag** | moves an object to a place | 0 (10 ad-hoc) | `drag()`, with arrow-key support | geometry, algebra tiles, statistics, vectors |
| **Build** | assembles a whole from parts | 1 (`atom-builder`) | `assemble()` | circuits, trees, Venn regions, atoms |
| **Plot** | reads a graph of a function it chose | 22 call `scale()`; 44 draw a curve with `<path>` | `plot()` | calculus, functions, statistics |
| **Table** | reads values beside their graph | 1 | `table()` | sequences, probability, data |
| **Sample** | draws a random sample and watches it vary | 1 uses `Math.random` | `sample()` + a seed, so it is reproducible | statistics, probability |
| **Field** | sees a field as arrows or lines | 6 ad-hoc (`ie-lc-physics`) | `field()` | electricity, magnetism, slope fields |
| **Shade** | reads a region, a bar or an area | 68 draw a `<rect>`; 54 a `<polygon>` | `plot()` with a fill | integrals, probability, areas |
| **Solid** | turns a 3D object | 0 | `solid3d()` | volume, surface area, nets, 3D vectors |
| **Animate** | watches a process unfold in time | 0 | `animate()`, with a static frame | waves, decay, motion, algorithms |
| **Answer** | types an answer and is told whether it is right | 0 | `check()`, against a value CI already proved | every Practise set |
| **Fresh** | gets a new problem of the same kind | 0 | `generate()`, seeded | every Practise set |
| **Notate** | types mathematics, not typing | 0 | `notate()`, inserting plain text | algebra, calculus |
| **Explore** | focuses a labelled part of a diagram | 0 | `diagram()` with focusable hotspots | anatomy of a formula, a cell, a circuit |

Three of these seventeen forms have a kit primitive — a parameter, an alternative, a
switch. The other fourteen are hand-built where they exist at all, or do not exist. That is
the opportunity.

---

## 4. Kit extensions worth having

Each names the evidence that it would be used, what it unlocks, roughly what it costs, and
the check that would stop it rotting. The kit is 379 lines and 6.3 kB gzipped; these are
additions to it, not a framework.

### 4.1 `drag()` — direct manipulation with a keyboard path

**Evidence.** Ten modules already handle a pointer event with no kit help, and 0 of 209
handle a key event. So the ad-hoc ones only stay accessible because they *also* offer a
slider or a button. The forms that most want dragging are the ones a slider serves worst:
moving a point on a scatter graph, a vertex of a triangle, a force vector, a tile in an
algebra model, a boundary on a number line.

**What it would be.** Not "a draggable SVG" — that is the accessibility trap. It is **a
control whose value is the position of an on-screen handle**, so the same state has three
ways in: pointer, arrow keys, and a slider. Snap to a grid, a line or a curve, because the
mathematics usually snaps.

**Cost.** The largest single design job here, and the one to get right first.

**Guard.** A test that a module using `drag()` contains no pointer listener it did not get
from the kit; the existing `test_every_slider_says_whether_it_shows_its_value` is the model.

### 4.2 `stepper()` — a procedure the reader advances

**Evidence.** Four modules hand-build it and two are the most useful figures in the Irish
books: `mst-stepper` (Kruskal and Prim side by side) and `dijkstra-stepper` (one
settlement at a time). Long division, column addition, a compass construction, an
induction proof, a nuclear decay chain, Gaussian elimination, a hypothesis test and a
sorting algorithm are all the same shape.

**What it would be.** A list of steps, each with a drawing and a sentence, plus a step
slider and a pair of native buttons. The narration goes in the live readout, so a screen
reader hears each step.

**Cost.** Small. Two existing uses prove the interface.

### 4.3 `plot()` — axes, ticks, a curve, and an area

**Evidence.** 162 of the 209 modules draw a straight line in a `fig-*` class — an axis, a
tick, a guide or an edge — and only 22 call `scale()`, so the axis-plus-curve idiom is
re-invented wherever there is a graph. It is also where the legibility defects came from:
the audit found five figures whose smallest label fell below 9px because a title, a tick
and an axis label were each a different hand-chosen size.

**What it would be.** Domain, range, optional ticks, a function, and a returned mapper.
Optionally a shaded region between two curves, which is what the calculus and statistics
figures all want and all hand-build.

**Cost.** Moderate, and the biggest single saving. It must stay a plotting *panel*, not a
charting library.

**Guard.** It draws only through `label()` and `SIZE`, so the phone floor is decided in
one place.

### 4.4 `table()` — values beside their graph

**Evidence.** One module builds a table by hand, and the topics that need one are
everywhere: a sequence and its differences, a probability distribution, grouped frequency,
input-output for a function, readings from an experiment, a truth table.

**What it would be.** A small grid with a highlighted row or column that follows the
control, so **table → rule → graph → formula** can be the same figure four times with a
different highlight.

**Cost.** Small, and it unlocks a family.

### 4.5 `assemble()` — build a whole from parts

**Evidence.** One ad-hoc use: `gcse-physics/atom-builder`, where the reader adds protons,
neutrons and electrons. The same shape fits a circuit, a tree diagram, a Venn region, a
prime-factor tree, a net folding into a solid, a nuclear equation, a proof assembled from
reasons.

**What it would be.** A palette of parts, a target area, and a validation that says *why*
an arrangement is not yet right — which is the teaching moment, and the reason this is a
guided tool rather than a sandbox.

**Cost.** Moderate. The palette is a `chooser` or a row of buttons; the validation is the
interesting part.

### 4.6 `field()` — arrows, field lines and slope fields

**Evidence.** Six ad-hoc implementations in `ie-lc-physics` alone (`bar-magnet-field`,
`field-around-wire`, `coulomb-force`, `charge-in-field`, `force-on-conductor`,
`dc-motor`). Slope fields for differential equations (`ie-lc-applied-maths` 8.7) and the
gradient field for calculus are the same drawing.

**What it would be.** A grid of arrows from a vector function, optional streamlines, and a
marker the reader can move to read the field at a point.

**Cost.** Small-to-moderate, and it removes six hand-built renderers.

### 4.7 `solid3d()` — one small projection, no WebGL

**Evidence.** Zero uses today, and the topics are all in Junior Cycle Mathematics:
nets folding (`ie-jc-maths` 16.4), volume of prisms and spheres (16.5), surface area
(16.6), composite solids (16.7), and 3D vectors later. A net that folds is one of the
clearest ideas in all of school geometry and there is no way to show it now.

**What it would be.** A fixed camera, a painter's-algorithm sort, and vertices the reader
can change. Not a 3D engine: a way to draw a box, a cylinder and a sphere with hidden
lines dashed.

**Cost.** Moderate. Worth it because "can't do 3D" is a real content limit, not a
presentational one.

### 4.8 `check()` — a self-check against an answer CI already proved

**Evidence.** Every Practise set already ships its answers, verified by the oracle, in a
collapsed block. A reader who wants to test themselves has to trust themselves. There is
no self-check anywhere in the collection.

**What it would be.** An input, a comparison against the declared answer, and feedback.
The comparison is a **numeric value with a tolerance**, or a small normalised string
match — not a CAS. It compares against the same string the bank holds, so the promise "a
computer checked this" is unchanged: CI proved the answer, and the browser only compares
your attempt with it.

**Cost.** Small, provided it stays numeric and string. The moment it tries to judge
algebraic equivalence it needs a CAS and becomes a different project.

**Why it is worth it.** This is the one idea here that changes what a reader *does* rather
than what they see, and it supports retrieval, which `research/pedagogy.md` calls its most
secure recommendation.

### 4.9 `generate()` — endless practice, seeded

**Evidence.** Practice sets are fixed at 6–12 items per section. A reader who wants more
has nothing, and `research/pedagogy.md` P5 wants interleaved practice at chapter scale,
which fixed banks cannot supply on demand.

**What it would be.** A parameterised template plus a seeded generator, so a set is
reproducible from its seed and a reader can ask for another. The generated arithmetic is
checked by construction, not by the oracle — so the generator's template is what CI must
prove, once, rather than each instance.

**Cost.** Moderate, and it has a real design tension with "every answer in a verified
bank" that has to be answered in writing before it is built.

### 4.10 `animate()` — a process in time, with a static frame

**Evidence.** Nothing animates today, and the one documented performance study
(`research/design/background-effects.md`) found the *looks-free* CSS animation was the
worst citizen — 180 ms/s of main-thread time on an idle page — while an explicit render
loop idled below baseline. So if motion arrives it should be an explicit loop with a
stopping point, and it must honour `prefers-reduced-motion`.

**What it would be.** A tick function and a control, plus the rule that **every animation
has a static frame that carries the idea**, so a reader with reduced motion or a slow
device is not left out. Waves, decay, projectile motion, an algorithm running.

**Cost.** Moderate. The animation is easy; the static frame and the stop are the work.

### 4.11 `notate()` — a small maths keyboard

**Evidence.** No module takes a mathematical answer today (see 4.8). The obstacle is
typing `x^2` and `3/4` on a phone. `mathlive` measures **5.6 MB unpacked** and would be
the largest dependency in the project.

**What it would be.** A row of buttons that insert plain text into an ordinary input —
`/`, `^`, `√`, `π`, `x`, brackets — and a tiny parser that recognises the handful of forms
a section's answers take. Not a formula editor; a keyboard.

**Cost.** Small, and it keeps the answer as text the checker can read.

### 4.12 `diagram()` — a labelled figure whose parts are focusable

**Evidence.** Zero uses. 136 modules hand-write `<text>` with no structure, so nothing is
explorable part by part.

**What it would be.** A drawing with named parts, each focusable and each with a
description, so a reader can move part by part with the keyboard and hear what each is.
This is the accessibility answer to a dense figure, and the exploration answer for a
diagram with six labels.

**Cost.** Small-to-moderate.

### 4.13 `numberLine()`, and migrating the 136 modules to `label()`

A number line is a `plot()` with one axis; the interval-and-arrow drawing is its own small
job and inequalities, integers, rounding, error intervals, absolute value and the modulus
all want one. And the 136 modules that hand-write `<text>` should be moved to `label()` —
not a feature, a debt, verifiable by the existing tests.

---

## 5. Ideas by book

An idea names the section it belongs on and the pattern it can copy. The module cannot be
shared (§1), but the *approach* can.

### Junior Cycle Mathematics — 22 chapters, nothing built

The largest gap, and the reader is the youngest. In the order I would build them:

| Section | Idea | Why it earns its place |
|---|---|---|
| 1.1 ℕ, ℤ and ℚ | a number line the reader can zoom, where fractions and surds appear as you zoom | the number systems are defined by what they contain, and that is a picture |
| 1.5 commutative, associative, distributive | a dot array that regroups | the distributive law is the one that carries into algebra |
| 2.2 laws of indices | the index-law grid (`gcse-maths/ch3-index-laws`) | multiplying powers by seeing the count |
| 3.2 prime factorisation | a factor tree built from a slider, then HCF and LCM as list intersection | the two ideas are one picture |
| 4.1 rounding and significant figures | a number line with both candidate values marked (`gcse-maths/rounding-slider`) | the boundary is what is misunderstood |
| 5.1–5.3 fractions | a fraction strip with an adjustable part count, and an area model for multiplication (`gcse-maths/ch4-fraction-strip`) | a reader who sees 2/3 of 3/4 does not forget it |
| 6.1–6.2 ratio | a bar model that redistributes a quantity | sharing in a ratio is the first proportional idea |
| 6.3–6.4 proportion | direct and inverse on one pair of axes (`gcse-maths/ch5-proportion`) | the two look nothing alike on a graph |
| 7.5 interest | simple against compound, the gap drawn as an area (`gcse-maths/ch6-interest`) | the gap *is* the lesson |
| 8.4 Venn diagrams | two and three circles with a **draggable** point that reports its region | set notation read off the picture |
| 9.2–9.4 patterns | a dot pattern whose general term updates with the term number, then linear/quadratic/exponential on one pair of axes | the general term is a formula for the picture; the three growth curves are the most useful graph in the book |
| 11.3 expanding two brackets | an area model that fills as you multiply (`gcse-maths/ch12-expand-factorise`) | expansion and factorising are one rectangle read two ways |
| 12.6 graphing an inequality | the half-plane shading | the solution set is a region |
| 14.3–14.4 graphing functions | `y = mx + c` with sliders for `m` and `c` (`gcse-maths/ch11-gradient-intercept`) | the two numbers have two jobs |
| 16.2 circle measures | circumference and area, with the length unrolled (`gcse-maths/ch19-circle-measures`) | why the area is πr² and not πd |
| 16.4 nets of solids | **a net folding into its solid** — needs `solid3d()` | a net question, and folding is the point |
| 16.5–16.6 volume, surface area | a prism whose cross-section the reader changes, drawn in 3D | volume as a stack of layers |
| 17.3–17.5 the line | two points, the slope between them, the equation appearing (`ie-lc-maths/line-two-points`) | slope is a rate before it is a formula |
| 18.1 Pythagoras | a rearrangement proof figure, linked from the theorem | the proof page already exists and links back |
| 18.3–18.5 trig ratios | a right triangle whose angle moves while the ratio stays | the ratio *is* the invariant |
| 19.1–19.4 transformations | a shape on a grid with each transformation as a chooser (`ie-lc-maths/enlargement-grid`) | four transformations, four coordinate rules |
| 20.2 the constructions | **a step-through of each construction** — needs `stepper()` | a construction is a procedure |
| 21.5–21.6 combining events | a two-way table and a tree kept in step | the rules are read off the two diagrams |
| 21.8 expected frequency | **a sample** from a spinner, many times — needs `sample()` | expected value becomes a prediction you can test |
| 22.4 charts | a chart chooser over one data set (`gcse-maths/ch24-chart-choice`) | which chart answers which question |
| 22.6 spread | a box plot with draggable quartiles (`gcse-maths/ch25-boxplot`) | the interquartile range is the middle half, visibly |
| 22.7 scatter and correlation | a scatter with one point draggable (`a-level-maths/ch11-scatter-explorer`) | one point can carry a correlation |
| 22.9 misleading graphs | the same data, two axes, side by side | the truncated axis is a picture |

That is 26 candidates for 22 chapters and it is a menu, not a plan. With the budget of one
figure per Learn page, I would build the ten or twelve where the visual *is* the idea —
indices, fractions, proportion, expansion, the line, trig ratios, transformations,
constructions, charts, spread — and leave the rest to prose.

### Leaving Certificate Mathematics — 8 figures for 18 chapters

Present: `argand-diagram`, `circle-centre-radius`, `circle-tangent`, `enlargement-grid`,
`line-two-points`, `reflection-grid`, `unit-circle`, `vector-addition`. Missing, in order:

| Section | Idea | Note |
|---|---|---|
| 7.1 derivative from first principles | a chord between two points that becomes a tangent as h → 0 | the definition *is* a limit of pictures |
| 7.2–7.5 differentiating | a graph and its derivative, both drawn, as the reader moves a point | the derivative is a function, not a number |
| 7.8 stationary points, concavity | the sign of f′ and f″ as a band under the curve | the sign table becomes a picture |
| 8.2–8.4 the definite integral | Riemann strips whose count the reader sets — needs `plot()` with a fill | the integral is a sum of strips |
| 8.4 area between curve and axis | the signed contribution either side of the axis | the sign is the common error |
| 9.4 infinite series | partial sums converging on a line, with r as a slider (`a-level-maths` pattern) | convergence is a sequence of sums |
| 10.2–10.3 permutations, combinations | n! and nCr with n and r as sliders, and the redundancy shown | why nCr divides by r! |
| 10.6–10.7 conditional, independence | a two-way table and a tree in step (`a-level-maths/ch12-independence`) | |
| 11.3 histograms | unequal class widths, area shaded to equal frequency (`a-level-maths/ch11-histogram-density`) | |
| 11.5 standard deviation | a dot plot with a spread slider | why a spread measure is needed |
| 11.6 the normal distribution | the curve with a movable bound (`a-level-maths/ch13-normal-explorer`) | the table is a picture of an area |
| 11.7–11.8 sampling, CLT | **take a sample and watch the mean vary** — needs `sample()` (`a-level-maths/ch11-sampling-variability`) | the most counter-intuitive idea in the course |
| 11.9 hypothesis testing | the null distribution, critical region and p-value shaded (`a-level-maths/ch14-binomial-tail`) | the p-value is an area |
| 12.4–12.6 cosine rule, area | a triangle with **a draggable** side or angle | the obtuse case is where it is misapplied |
| 13.4–13.7 the circle | a line and a circle with the discriminant shown as the line moves | why tangency is a discriminant condition |
| 15.2 construction of √2 and √3 | a step-through | it is in the specification and it is a procedure |
| 16.3–16.6 similarity | a scaler showing k, k², k³ together (`gcse-maths/ch18-similarity-scale`) | |
| 18.2–18.6 vectors | the dot product and the angle; components (`ie-lc-maths/vector-addition` exists) | perpendicularity is a dot product of zero |

The two worth building first are **7.1 (chord → tangent)** and **8.2 (Riemann strips)**. A
reader who has seen those two has understood what calculus is.

### Leaving Certificate Physics — 19 figures for 22 chapters

Electricity, magnetism and modern physics are close to one figure per chapter. The gaps
are mechanics, heat and waves:

| Chapter | Idea |
|---|---|
| 6 gravity | two masses and the force between them, with the inverse square visible — the same law as `ie-lc-physics/coulomb-force`, so build one figure with a constant chooser |
| 8 heat | a heating curve with the **plateaux** explained — needs `animate()` or a step-through |
| 11 sound | a standing wave with movable nodes; beats from two frequencies; the Doppler shift from a moving source |
| 12 light and EM radiation | the spectrum as a wavelength-to-frequency line (`gcse-physics/em-spectrum`) |
| 13 charge and electric fields | field lines between two charges and between two plates — needs `field()` |

### Leaving Certificate Applied Mathematics — 6 figures for 9 chapters

Present: `circular-motion`, `dijkstra-stepper`, `graph-basics`, `hookes-law`, `model-fit`,
`mst-stepper`. Missing, and these are what the book is about:

| Section | Idea |
|---|---|
| 3.7–3.9 projectiles | launch angle and speed as sliders, the path drawn with the obstacle marked (`a-level-maths/ch15-projectile`) |
| 4.6 pulleys | two masses over a pulley with acceleration and tension shown — needs `drag()` or an `assemble()` |
| 5.6 terminal velocity | drag against gravity, approaching terminal speed |
| 6.4 restitution | a ball bouncing with a restitution slider, the height sequence shown — `animate()` |
| 7.6 simple harmonic motion | the graph and the circle it projects from, kept in step |
| 8.2, 8.6 growth and the logistic model | the two curves with the carrying capacity marked; and a **slope field** for 8.7 |

### The English books

They are not short of figures — 164 modules across 60 chapters, about 2.7 each — so the
ideas here are additions. The one I would make is structural: **one `plot()`-based family**
per book, so a reader meets the same axes in every chapter and only the curve changes.

### Proofs

Twelve of 23 proof pages carry a figure. The figures are not named after the proofs they
serve — the proof `pythagoras` uses `pythagoras-rearrangement`, the proof `sine-rule` uses
`sine-rule-perpendicular` — so the check is per page, not per slug. The obvious additions
are the eleven that have none, and a `stepper()` for a proof whose reasons build up.

---

## 6. Engagement aids beyond figures

### 6.1 Store the relevance prompt (the pedagogy asks for it; it is not built)

`research/pedagogy.md` P3 says the relevance prompt should "recur, revisit, and be stored
client-side". It recurs and is not stored, so a reader who writes three paragraphs over a
chapter cannot read them back. A `textarea`, a storage key per chapter, and a "you wrote
this earlier — has it changed?" prompt on the Review.

### 6.2 A self-check on the Warm-up — needs `check()` (§4.8)

Every *Practise with help* page opens with closed-book recall, and the answers are in a
`<details>` a reader can open before thinking. A gate that reveals after an attempt — no
score, no storage — makes the retrieval real. **Retrieval is the pedagogy's most secure
recommendation**, so this and 6.1 are the highest-value non-figure ideas here.

### 6.3 Practise across the whole book, interleaved — needs `generate()` (§4.9)

P5 wants interleaved practice and a method-choice prompt, and the Review page does this
within a chapter. Across a book it needs a pool the reader can draw from at will, which is
what a seeded generator supplies. This is the idea that would most change how a reader
revises, and it is the one with the real tension against "answers are proved by CI".

### 6.4 Progress the reader can see

The cheapest honest version: the navigation shows which pages have been read, stored
locally. It must never show a score and must never gate anything — the modality is a
reading aid, not an assessment.

### 6.5 A "which formula am I given?" marker

`ie-lc-maths` ships the SEC Formulae and Tables. A reader cannot tell from the page whether
a formula in front of them is supplied in the exam. The data is already in the booklet, so
the marker is a join rather than new content.

### 6.6 Worked-example fade as a control

The Guided problems pages fade hint → next step → full working. The *Walkthrough* pages do
not: they show every step. A per-step reveal would make "teach first, then fade" something
the reader does rather than something the page does for them. A `stepper()` does it.

### 6.7 Glossary terms linked at first use

Every term is defined once on a strand page. Linking the first use of each in a chapter is
mechanical if the glossary is the source, and currently hand-done.

### 6.8 A print or PDF path

The site installs and reads offline, but a reader revising on paper has nothing. This is a
build-output job, not a page job, and it is the largest idea in this section.

### 6.9 What I would still not build here

- **Score, streak, leaderboard.** The pedagogy warns against expecting a motivation
  exercise to compensate for gaps in teaching, and the promise is that answers are checked,
  not that the reader is graded.
- **Accounts or a login.** The site is backend-free by design (`SHAPE.md`).
- **An AI tutor.** Out of scope, and not in the collection's voice.

---

## 7. The dependency question, measured

The kit is hand-written and 6.3 kB gzipped. A library would be 10–40× that:

```
$ # browser bundles, gzipped. `min` means the file is a minified bundle; where only an
$ # unminified build is published the row says so, because that number is the upper bound.
  function-plot (a grapher on d3)      61 kB   (min)
  d3                                   90 kB   (min)
  three (3D)                          128 kB   (unminified build; three.mjs is 647 kB raw)
  math.js (expression and units)      171 kB   (min)
  jsxgraph (geometry and plotting)    252 kB   (unminified; jsxgraphcore.js is 970 kB raw)
  mathlive (maths input)         5.6 MB unpacked, no browser bundle published at that path
$ # and what the collection ships today
  kit.js                                6 kB gz
  all js in the built site      1,982 kB across 418 files
```

Two things follow, and they point the same way. The project has twice chosen to **write its
own** rather than depend — the six theme bundles replaced third-party palettes to avoid
attribution risk (`DECISIONS.md`), and the backgrounds were measured rather than assumed —
and the kit's 6 kB is smaller than any of the candidates by an order of magnitude. But the
site is already a 350 MB PWA with a service worker, so 60 kB for a grapher is not
automatically wrong; it is a trade against writing `plot()` ourselves, which §4.3 says is
the single most repeated piece of drawing in the collection.

**The test.** A dependency earns its place if it does something we would not write as well
and would otherwise not attempt. That is an argument for `three` if 3D matters (writing a
renderer is a project), and against `d3` for plotting (writing axes is an afternoon). It is
an argument against `mathlive` in every case, since `notate()` is a keyboard.

---

## 8. What would still not earn its place

- **An unguided sandbox.** P6 forbids it. No prediction, no explanation prompt, no lesson.
- **A figure that prints the explanation.** The third beat is the reader's.
- **A figure on every page.** One per Learn page, and a quarter of the chapter at most.
- **Pyodide.** Tier 3/4, and never the entry point to a chapter.
- **Animation for its own sake.** It must have a static frame that carries the idea, or it
  excludes the reader who has asked for less motion.
- **A second implementation of a figure that exists in another book.** See §9.

---

## 9. The structural idea that makes the rest cheaper

**Figure modules cannot be shared between books.** Four ideas are already implemented
twice, and all four pairs differ (§1). Every idea in §5 will be built at least twice
unless this changes.

The shape of the fix is a **shared figure library**: a directory of modules more than one
book uses, mounted by slug like any other, held to the same contract and measured by the
same audit. It is the same move the repository made for the CSS, the settings widget and
the kit. It is the largest idea in this file and the one that decides whether the next
fifty figures are cheap or expensive.

The alternative — a copy per book — is defensible, because a book can then tune a figure
to its own specification. But it should be a decision, not the accident it is now.

---

## 10. Priority

1. **Store the relevance prompt (§6.1)** and **`check()` for the Warm-up (§6.2, §4.8)**.
   Retrieval is the most secure recommendation in the pedagogy and the relevance prompt is
   where the reader writes in their own words. Neither needs a new drawing.
2. **`plot()`, `stepper()`, `table()`** (§4.3, §4.2, §4.4), which between them cover most
   of §5, and `stepper()` has two working uses to be built from.
3. **`drag()`** (§4.1) — the largest design job, and the one that unlocks geometry, algebra
   tiles and statistics at once. It must be designed before it is written.
4. **Ten figures for `ie-jc-maths`** (§5): indices, fractions, ratio and proportion,
   expanding, the line, trig ratios, transformations, one construction, charts, spread.
5. **Chord → tangent and Riemann strips for `ie-lc-maths`** (§5).
6. **`field()`** (§4.6) — six hand-built renderers in one book, and slope fields want one.
7. **Sound, gravity and the EM spectrum for `ie-lc-physics`**; **projectiles, pulleys,
   restitution and SHM for `ie-lc-applied-maths`** (§5).
8. **Decide the shared-figure-library question (§9)** before the count doubles, and
   **migrate the 136 modules to `label()`** (§4.13).

---

## 11. How to record progress here

This file is the queue, so an idea leaves it by being built.

- Move it to **Built**, below, with the book, the section, the module slug and the date.
- A new kit primitive goes into `assets/figures/kit.js` with its check added to
  `scripts/check-figure-kit.cjs` and its rule written into `assets/AGENTS.md` **in the same
  change** — the three have drifted apart before.
- A defect it reveals goes to `.agents/todo.md` as a numbered item with the command that
  found it, not here.
- If it changes a rule, change the rule and leave a note saying why.

### Built

| Book | Section | Module | Date |
|---|---|---|---|
| — | — | *nothing from this file yet* | — |
