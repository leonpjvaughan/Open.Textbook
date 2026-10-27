# AGENTS.md — the shared design system

Everything in `assets/` reaches every book. It is the shared reading experience:
the design system, the runtime widgets and the installable-site assets. Nothing
here belongs to one book.

Read the root `AGENTS.md` first. The root's **Theming**, **Conventions** and
**Toolchain** still apply. This file adds what is particular to the shared
assets, and it owns the **Layout** traps, the **booklet widget** traps and the
whole **theme model** — the cascade, the contrast invariant, reader preferences
and adding or previewing a bundle — that used to sit in the root.

## Figures: draw through the kit, and choose no number

`assets/figures/kit.js` is the shared surface for every figure — **213 of 213 modules
import it** — and `assets/figures/` is also the **shared figure library**, so a module
that more than one book wants identically is written once and mounted by both. The kit is
a barrel over six layers, and a module imports only what it needs:

| Layer | File | The question it answers |
|---|---|---|
| text | `kit/text.js` | what does it say, and at what size? |
| frame | `kit/frame.js` | what is the figure, and where does it live? |
| draw | `kit/draw.js` | what does it look like? |
| controls | `kit/controls.js` | what can the reader change? |
| interact | `kit/interact.js` | what happens over time, or in response? |
| drag | `kit/drag.js` | what can the reader move directly? |

**The kit is TypeScript with a build, and the compiled JavaScript is committed.** The
source is `assets/figures/src/` — a src layout, so the directory the build copies holds
only what ships and no filter is needed. `node tools/build.mjs kit` compiles it to
`assets/figures/`, exactly where the loader looks, and `scripts/check.sh` fails if the
committed output stops matching the source.

- **`tsc`, not a bundler**, for one reason: it keeps the comments. The kit's prose is the
  design record — why a handle gets no `tabindex`, why a normal is oriented from the
  centroid, why the panel tint moved from 8% to 4% — and esbuild strips it.
- **One output file per source file.** The layer design survives into the shipped tree,
  so a stack trace names `kit/draw.js` rather than a line in a bundle.
- **`tsconfig.kit.json` sets `noCheck`.** Emit and check are separate jobs: `tools types`
  checks and ratchets, and a build that refused to emit until every annotation existed
  would be a build nobody runs.

The kit began as ten functions and deliberately did not draw, on the argument that "a
framework for 177 bespoke diagrams would be a framework around nothing". That was right
about *bespoke* drawing and wrong about *repeated* drawing, and the measurements settled
it: **162 of 213 modules draw a straight line in a `fig-*` class by hand, 68 a `<rect>`, 54
a `<polygon>`, 44 a `<path>`, and only 22 call `scale()`.** Those are the same five drawings re-earned two hundred times, and the
re-earning is where the legibility defects came from. So the marks are shared and the
*arrangement* stays bespoke — which is the line the first kit was reaching for. The
measurements and the reasoning are in `research/design/reuse-audit.md`.

### The rules, each checked rather than trusted

- **Choose no size. Use `SIZE`.** An SVG scales by rendered width over viewBox width, so
  a `font-size` is not the size a reader sees. A 560-unit viewBox in a 322.8px phone
  drawing panel scales at **0.576**, so `font-size="16"` is 9.2px and `15` is 8.6px —
  below the 9px floor. Fourteen distinct sizes were in use across 177 modules before the
  scale existed, and four had drifted below the floor with every one of their own
  attributes looking reasonable. `SIZE.tick` is the smallest that clears it.
- **Use `label()` for text, never a hand-written `<text>`.** 136 modules still write the
  same four attributes by hand and never call it. The class defaults to `text-ink`,
  because a `<text>` with no colour class is painted with `fill`'s initial black and
  vanishes on a dark panel — a defect found **eighteen times** by measurement. Never put
  `$...$` in a label: the maths hook runs at build time.
- **Use `scale()` to map a domain onto a range, and `.invert` to come back.** 24 modules
  built it by hand, and the y-axis case is the one that gets flipped when written by
  hand. It raises on a domain with no width, where the hand-built version divides by zero
  and produces `NaN`.
- **Use `axes()` for a graph area.** It returns **the mappers as well as the string**, so
  a module draws its data with the same geometry its own axes used and the two cannot
  disagree. `line`, `circle`, `rect`, `polygon`, `path`, `arrow`, `curve`, `graph`,
  `area`, `dots` and `bars` are pure functions returning strings, so the arrangement
  stays yours.
- **Use `sigfig()` for a rounded answer.** It is the reader's side of the bank's
  `sigfigs` check: `6`, `6.0` and `6.00` are three different claims, and `sigfig(300, 2)`
  is `"3.0e2"` because a trailing zero that holds a place is not a significant figure.
- **Use `seed()` for randomness, never `Math.random`.** A figure that samples must be
  reproducible: two readers comparing what they saw must be comparing the same data, and
  the browser check cannot assert anything about data that changes on every load.
- **A draggable handle must have a backing control, and `draggable()` enforces it.** A
  pointer is not a keyboard. The control is the value and the keyboard path; the handle is
  an enhancement that writes to it, and it gets no `tabindex` of its own, so a reader
  tabbing through the figure meets one focus stop per value rather than two.
- **An animation must have a scrubber and a still.** `animate()` gives a range input over
  the whole frame range and honours `prefers-reduced-motion` by not starting: every frame
  is reachable without motion, and the figure is complete for a reader who asked for less.
- **A self-check compares against an answer the bank already proved.** `check()` is a
  numeric comparison with a tolerance and a normalised string match — **not** an algebra
  engine. The collection's promise is that a computer checks every answer, and the
  verifier does that at build time; this is the reader's side of the same promise.
- **Composite controls carry a `.value`.** `segmented`, `stepper` and `table` read and
  write like a `<select>`, so `react(control, draw)` binds any of them and a module has one
  shape to learn rather than two.
- **Every control is a native element.** `<input>`, `<select>`, `<button>`, `<textarea>` —
  so the keyboard, the screen reader and the platform work without being rebuilt.
- **Use `camera3d()` for a solid, not a flat drawing.** A fixed camera and a painter's
  algorithm are enough for a cuboid with its hidden edges dashed, and "can't do 3D" is a
  content limit rather than a presentational one: nets, prisms, stacks of layers and
  three perpendicular axes are all in the specifications. A face's visibility is decided
  by turning its normal outward from the solid's own centroid, so the order a module
  writes its vertices does not matter — and `drawMesh` fits the geometry to the box,
  because the camera has no idea how big the solid is.
- **Use `vectorField()` for arrows on a grid.** Six modules in one book hand-build it and
  each re-derives the arrow's direction and the SVG y-axis, which counts the other way.
  The field is given in data units and turned into a direction *through the mappers*, so
  a flipped axis cannot flip the arrows.
- **Use `venn()` for set regions, and let it place the labels.** An atom in the wrong
  region teaches the opposite of the truth, so a region is declared as a predicate and
  the label goes at the point furthest inside it. Never place a Venn region by hand.
- **Use `builder()` to assemble and validate in the module.** The kit owns the palette,
  the order and the keyboard; whether an assembly is right is the page's lesson.
- **Use `practice()` and `exercise()` for generated questions — and never claim they are
  checked.** A banked answer is proved by a CAS at build time; a generated one cannot be,
  so the claim is only that the answer is computed by the same function that wrote the
  question, and the two cannot disagree. The *generator* is what is checked, and a page
  built on it must not say "checked by a computer".
- **A figure that states arithmetic declares it.** `panel()` returns `claim`, and a
  figure that prints a calculation calls `claim([{ expression, values, answer, shown }])`
  once per redraw. `python -m textbook.working` proves each one with the same exact CAS
  the problem banks use — `0.065` is `13/200`, so the comparison is exact — and requires
  the readout to contain the string claimed. **Claim the numbers you print, not only the
  totals**: that is what makes a rounded intermediate a failure rather than a styling
  choice. Do not parse the readout back out of the text; a checker that did needed a new
  case for every notation and could read 43% of what it saw (`DECISIONS.md`).
- **A generated question is plain text, not LaTeX.** The maths hook runs at build time,
  so `$…$` a module injects at runtime reaches the reader as dollar signs.
- **Use `diagram()` when the drawing's meaning is its named parts.** `panel()` gives a
  figure one name and one description, which is right for a graph — the shape is the
  message — and wrong for a diagram with six labels, which is one undifferentiated
  picture to a screen reader. `diagram()` puts a **button** per part under the drawing and
  the drawing follows the focus, so the reader moves part by part with the keyboard and
  hears what each one is. **The buttons are the focus stops**: making the `<g>` focusable
  as well would be two stops that do the same thing, which is the trap `draggable()`
  avoids by refusing a pointer with no backing control. A figure uses `diagram()` or
  `panel()`, not both — two navigation models in one drawing is worse than one.

`scripts/check-figure-kit.cjs` verifies all of this through a real page, including the
phone-floor arithmetic, and `scripts/check-figure-kit-pure.mjs` verifies the drawing and
formatting layers under plain `node`, so they are in the ordinary gate rather than only
where Playwright is configured. Between them they check the invariant that matters most
for a Venn diagram — that every region's label lands inside the region it names, for two
sets and three — and for a solid, that a cube's hidden edges number exactly three. `node tools/dist/cli.js audit site --mobile` measures what
actually reaches a 390px screen; the current state is **0 figures below 9px**.

### Kernels in figures

`assets/data/solvers/` is the committed `ot-solve` bundle: one directory per kernel,
with `kernel.js` beside `manifest.json`, `selftest.json` and `kernel.wasm`. A figure
imports `../data/solvers/<id>/kernel.js`. The module uses top-level `await`, so it is a
**value** by the time the figure imports it and `mount` stays synchronous.
`assets/figures/kernel.js` is the loader — ABI, slot count, layout digest, typed-array
views — and `assets/figures/kernel-lab.js` is the shared visual language: `field`,
`line`, `plane` and `estimate`, each above a trace.

- **Do not `claim()` a simulated number.** `claim()` is arithmetic the CAS proves; a
  number that came out of a time step is proved by the kernel's selftest. Printing it as
  exact is the defect, not a missing claim.
- **Build the controls from the manifest.** `kernelLab` reads `kernel.spec(name)` for the
  range; the manifest is generated from the Rust, so a slider cannot drift from the
  kernel.
- **A status is not a verdict.** `r > 1/2` is the page's claim; the kernel's `Unstable`
  means only that the numbers stopped being usable. The figure says which.
- **Never edit the bundle or a generated module.** Change `solvers/ot-solve`, run
  `scripts/build-solvers.sh`, and commit what it writes. `solvers/ABI.md` is the contract.

## Before you add a shared thing

The collection is eleven books and will be more. Two rules keep it from turning into
eleven copies of the same component.

- **If two books need it, it belongs in `assets/`, not in a book.** A book's
  `docs/assets/` holds only what is that book's own. Shared files are declared once in
  `scaffold.SHARED_FILES` and **the build places them** — nothing in this repository is a
  symlink, because git checks one out as a small plain file wherever `core.symlinks` is
  false and a green build then ships a 36-byte `kit.js` holding a path. A **directory**
  whose whole contents are shared is declared in `scaffold.SHARED_DIRS` and copied
  recursively: the kit is six files behind a barrel, and a list of files would have to be
  edited whenever a layer is added — and a layer missed that way breaks every figure in
  every book at runtime, where the build's own link check cannot see it.
- **If two figures do the same thing, it belongs in the kit.** Before writing a helper
  into a module, run `grep -l` for the idiom across the other modules. `research/design/reuse-audit.md`
  records what was measured already, including the idioms that are deliberately **not**
  shared and the reason for each.
- **If two books want the same figure, it belongs in `assets/figures/`.** That directory
  is the shared figure library: a module dropped in beside the loader is mountable by its
  filename in every book, because a figure is mounted by bare slug and the build copies
  the library flat into each book's figures directory. A book may not define its own
  module with the same name — the build fails and says so, because two modules with one
  slug would make a page's meaning depend on build order.
  **This is for a generic tool, not for a topic two syllabi treat differently.** The four
  figures that were duplicated before the library existed — `circular-motion`,
  `radiation-penetration`, `transformer-turns`, `vector-addition` — are each two books
  solving one topic for different readers, which is a legitimate choice. What belongs
  here is the same set-notation diagram, the same number line, the same coordinate grid.
- **Before building a new interaction, read `ideas.md`.** It holds the queue of visual and
  interactive aids for the whole collection, the measured state of what exists, the evidence
  for each idea, and what a new one would cost. If the idea is there, build it and move it
  to **Built**; if it is not, add it with the evidence that made you think of it — a count,
  a command and its output — rather than adding the figure and leaving the reasoning in a
  commit message.


## What lives here

| Path | What it does |
|---|---|
| `assets/stylesheets/extra.css` | The plumbing: the Material mapping, components, fonts as tokens. **Declares no colour** |
| `assets/stylesheets/themes.css` | Generated from `themes/*.yaml`: every `--tb-*` per scheme, per bundle |
| `assets/figures/figures.js` | The figure loader, injected on pages that use `:::figure` |
| `assets/booklet/booklet.js` | The formulae-and-tables widget, loaded only by books that declare a booklet |
| `assets/settings/settings.js` | The reader's scheme and theme control, and the only writer of the preference keys |
| `assets/icons/` | The app icon and the favicon; the one place a fixed colour is allowed |
| `assets/sw.js` | The service worker; a deliberate exception to the no-JS rule |

## The theme model

How a book looks is two independent things that multiply: the **bundle** the
reader chose and the **subject tint** the book contributes. Keeping them apart is
the point, and it is the decision most easily undone by accident.

- A **bundle** (`themes/<id>.yaml`) is the *reading experience*: a complete light
  and dark palette plus its typography. It is chosen by the **reader** and applies
  to **every book**, so moving from mathematics to physics never moves the theme.
  One file per bundle, plus a line in `collection.yaml`.
- A book contributes only its **subject tint** (`book.yaml → theme`): an accent,
  and any surface it wants moved, given per scheme. It is supplied as
  `--tb-book-*` values, and each bundle composes them in:

  ```css
  --tb-accent: var(--tb-book-accent, #6ea8d8);
  ```

  A bundle may **refuse** a token by listing it under `fixed:`. `clean` refuses the
  accent, so every book is monochrome there — by design, not by omission.

Never put a surface or a font in a book, and never put a subject's identity in a
bundle. A book states its tint once and every bundle decides how to use it.

### The cascade

| Layer | File | Owner |
|---|---|---|
| Plumbing: the Material mapping, components, fonts as tokens | `assets/stylesheets/extra.css` | shared, **declares no colour** |
| Bundles: every `--tb-*` per scheme, per bundle | `assets/stylesheets/themes.css` | generated from `themes/*.yaml` |
| Subject tint: `--tb-book-*` per scheme | `books/<id>/docs/assets/stylesheets/book.css` | generated from `book.yaml → theme` |
| A book's own component changes | `books/<id>/docs/assets/stylesheets/book-local.css` | authored, empty by default |

`extra.css` must not declare a colour token: a declaration there outranks every
bundle, silently. A test enforces this.

### What a page or a figure may do

Nothing in a page, and nothing in a figure, may carry a colour.

- Use the `fig-*` classes (`fig-accent`, `fig-warn`, `fig-good`, `fig-ink`,
  `fig-grid`) and the `text-*` classes.
- **A `fig-*` class paints, and `fig-grid`/`fig-line` do not.** In SVG a shape is
  painted with `fill` and `stroke`; a class that sets `fill` beats a `fill="none"`
  *attribute*, so `class="fig-accent" fill="none"` is a filled shape. Use `fig-line`
  for an accent stroke with no fill, `fig-grid` for a grey one, or an inline
  `style="fill:none"`. The kit's `path()` does this for you.
- A figure reads the tokens (`var(--tb-accent)`, `var(--tb-fig-warn)`, …), so it
  adapts to every bundle and both schemes without being revisited.
- Never put `$...$` in text a figure injects at runtime: the maths hook runs at
  build time, so runtime LaTeX is not rendered. Use plain text or HTML.

The two icons are the exception, and the only one. `assets/icons/app-icon.svg`
(the home-screen icon) and `assets/icons/favicon.svg` (the browser tab) are fixed
images drawn in the house ink and paper, because a launcher tile and a tab cannot
follow the reader. They differ only in how much survives at their size: the
launcher icon keeps the page rules, the tab icon drops them and spends the room on
the book. `tests/test_pwa.py` pins their palettes together, and both the book
template and the portal link the tab icon. `apple-touch-icon.png` is the
third: iOS ignores the manifest and wants a PNG it can size itself, so it
is the one committed raster in the repository — `assets/icons/README.md`
says why, and a test pins the SVG's hash so it cannot go stale quietly. No other image may hard-code a colour.

### The contrast invariant

Bundles and subjects multiply, so a subject accent that is comfortable on one
bundle's paper can be unreadable on another's. This is not left to review.
`tests/test_themes.py` computes the WCAG ratio for every bundle × book × scheme
and fails below **ink 7:1, link 4.5:1, accent 4.5:1**, plus **`accent_ink` 4.5:1
on the accent** — text knocked out of the accent uses a dedicated `accent_ink`
token, never the paper, because a bundle's paper can sit too close to its own
accent to read.

When a new bundle or a new book fails it, **fix the palette, not the threshold.**
The check has already caught two stock Omarchy palettes — catppuccin-latte's own
link at 4.34:1 and gruvbox's at 4.40:1 — neither of which is visible by looking.

### Adding a bundle

1. Copy an existing file in `themes/`, change `id`, `title`, `description`, the
   two palettes and the typography. Both palettes must be complete: every token in
   `SCHEME_TOKENS` (`engine/src/textbook/book.py`), in both `light:` and `dark:`.
2. Add the id to `themes:` in `collection.yaml`. That list is the menu order.
3. `python -m textbook.scaffold` — regenerates `assets/stylesheets/themes.css`.
   No book is rebuilt to gain a theme.
4. `pytest tests/test_themes.py` — the contrast invariant will tell you if the
   palette is not readable against a book's tint.

### Reader preferences

Both preferences are the reader's and are shared by every book and the landing
page, under origin-wide keys: `textbooks:scheme` (`default` / `slate`) and
`textbooks:theme` (a bundle id). They are applied before the first paint by an
inline script at the top of `engine/src/textbook/templates/page.html`, which reads
the two keys and sets `data-theme` and `data-md-color-scheme`; the landing page
carries the same script, and both pages expose the same store to the shared
Settings runtime. Keep the script ahead of every stylesheet in that template, so
the chosen bundle paints with no flash.

Do not make the theme key path-scoped either — renaming the repository must not
cost a reader their preferences.

### Previewing a bundle

```bash
node tools/dist/cli.js screenshot site ~/out --schemes light,dark --theme neon -- \
  "chapter:/gcse-maths/higher/Chapter 6/Section 6.4/Walkthrough/" "landing:/"
```

## Layout

- Shared CSS and runtime widgets live **once**, in `assets/`, and are listed in
  `scaffold.SHARED_FILES` — or, where a whole directory is shared, declared in
  `scaffold.SHARED_DIRS` and copied recursively. The build copies each one to the
  same path in the output, so a book never holds a copy and cannot drift from the
  shared file. Edit the file in `assets/`; there is nothing in a book's tree to edit.
  **A figure module is the exception to the path rule**: `assets/figures/*.js` is the
  shared figure library, and the build copies it *flat* into each book's figures
  directory, because a figure is mounted by bare slug beside the loader.
- **Nothing in this repository is a symlink**, deliberately. A link is checked out
  as a small plain file holding its target wherever `core.symlinks` is false — a
  Windows clone without developer mode — which shipped a 36-byte `kit.js` to the
  site and broke every figure while the build stayed green. If you are tempted to
  add one, add the file to `SHARED_FILES` (or its directory to `SHARED_DIRS`)
  instead and let the build place it.
- Anything to do with colour, fonts or bundles: see **The theme model** above.

## The booklet widget

The booklet **data** is per book and lives in `books/AGENTS.md`; the widget is
shared and its rules are here.

- The booklet renders formulae from build-time MathML, so never put `$...$` into
  it at runtime. Tables are plain text and data.
- Pop-out uses the Document Picture-in-Picture API, which is Chromium-only; the
  button is hidden elsewhere and the in-page panel is the baseline.
- The widget is site-wide runtime JS, a deliberate exception to the Tier-0
  no-JS rule. Keep it deferred and lazy: nothing beyond the button loads until a
  reader opens it.

## Rules local to the assets

- **`extra.css` declares no colour.** A declaration there outranks every bundle,
  silently; `tests/test_themes.py` enforces it. Set a subject tint in
  `books/<id>/book.yaml → theme`, and a book's own components in its
  `book-local.css`.
- **A figure carries no colour.** Use the `fig-*` classes (`fig-accent`,
  `fig-warn`, `fig-good`, `fig-ink`, `fig-grid`) and the `text-*` classes; read
  the tokens (`var(--tb-accent)`, `var(--tb-fig-warn)`, …) so a figure adapts to
  every bundle and both schemes.
- **No runtime LaTeX.** The maths hook runs at build time, so text a figure
  injects at runtime is never rendered. Use plain text or HTML.
- **The icons are the only fixed colour.** A launcher tile and a browser tab
  cannot follow the reader; `tests/test_pwa.py` pins the two palettes together,
  and the SVG hash is pinned against quiet drift.

## Common tasks

- **Restyling the shell** — edit `assets/stylesheets/extra.css`; it must stay
  colourless.
- **Adding a theme bundle** — a file in `themes/` plus a line in
  `collection.yaml`; no book is rebuilt. Follow **Adding a bundle** above.
- **Adding a figure** — the module goes in the book's
  `books/<id>/docs/assets/figures/`, using this loader. Load the
  `build-guided-figure` skill.

## Read next

`SHAPE.md` for the cascade and the theme model, **The theme model** above for the
contract, and `BOOKLETS.md` for the data the widget renders.
