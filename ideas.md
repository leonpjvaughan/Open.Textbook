# Ideas — interactive and visual aids (open backlog)

What the collection could still *show* rather than state. Built items (the kit's `drag`, `stepper`, `plot`, `table`, `assemble`, `field`, `solid3d`, `check`, `generate`, `animate`, `notate`, `diagram`, `numberLine`, `venn`, the shared `assets/figures/` library, the stored relevance prompt and the Warm-up gate) live in code and git history, not here. Rules an idea must obey: `AGENTS.md` (chapter formula P6: guided Predict → Test → Explain, no sandboxes) and `assets/AGENTS.md` (figure contract). Evidence: `research/pedagogy.md`.

## Admission test

An idea earns a figure only if the visual **is** the idea (one figure per Learn page, ≤ ¼ of a chapter), a reader can predict then test it, it has a static frame for reduced motion, and no other book already draws it (share it via `assets/figures/` instead of duplicating).

## Open figure menu by book

A menu, not a plan; build where the picture carries the idea and leave the rest to prose.

- **ie-jc-maths** (largest gap): zoomable ℕ/ℤ/ℚ number line; regrouping dot array (distributive law); factor tree + HCF/LCM; bar-model ratio; direct vs inverse proportion; simple vs compound interest gap; dot-pattern general term and linear/quadratic/exponential curves; area-model expansion; half-plane inequality; `y = mx + c` sliders; unrolled circumference/area; net folding into a solid (`solid3d()`); prism cross-section volume; line from two points; Pythagoras rearrangement; trig ratio invariance; transformations chooser; construction step-through (`stepper()`); two-way table + tree in step; sampled spinner (`sample()`); chart chooser; box plot with draggable quartiles; scatter with draggable point; misleading-axis pair. Reuse existing GCSE/LC modules (`ch3-index-laws`, `rounding-slider`, `ch4-fraction-strip`, `ch5-proportion`, `ch6-interest`, `ch12-expand-factorise`, `ch11-gradient-intercept`, `ch19-circle-measures`, `ch24-chart-choice`, `ch25-boxplot`, `line-two-points`, `enlargement-grid`) as patterns or shared promotions.
- **ie-lc-maths:** standard deviation and the normal distribution; further sections lacking figures where the picture is the idea.
- **ie-lc-physics:** heating curve with plateaux; electric field lines (`field()`); standing waves, beats, Doppler; Coulomb force with one shared constant-chooser figure; EM spectrum line.
- **ie-lc-applied-maths:** projectile with obstacle, pulleys (`assemble()`/`drag()`), terminal velocity, restitution bounce, SHM circle-and-graph, logistic growth with carrying capacity and slope field.
- **English books:** one `plot()`-based family per book so axes look the same each chapter.
- **proofs:** 11 of 23 proof pages have no figure; a `stepper()` for proofs whose reasons build up.

## Engagement aids not yet built

- **Interleaved whole-book practice** from a seeded generator (tension: answers are CI-proved; generated ones claim internal consistency only).
- **Visible reading progress** in the nav (local only, never a score, never a gate).
- **"Which formula am I given?" marker** joining pages to booklet `provision`.
- **Walkthrough worked-example fade** via per-step reveal (`stepper()`).
- **Glossary first-use links** generated from the glossary.
- **Print/PDF build output** (largest item; print CSS and a print-render test already exist).
- **Migrate hand-written `<text>` and number formatting to `label()` / `fmt()`** where modules still bypass the kit.

## Not building

Scores, streaks, leaderboards; accounts or login; an AI tutor; unguided sandboxes; figures that print their own explanation; a figure on every page; Pyodide as an entry point; motion without a static frame; second implementations of a figure another book already has.
