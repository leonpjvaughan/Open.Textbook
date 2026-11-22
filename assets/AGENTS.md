# AGENTS.md — the shared design system

`assets/` reaches every book. The root `AGENTS.md` **Theming**, **Conventions** and
**Toolchain** apply; this file owns the figure contract, the **Layout** and **booklet**
traps, and the **theme model**.

## Figures: draw through the kit, choose no number

`assets/figures/kit.js` is every figure's surface; `assets/figures/` is the shared library.
Source is TypeScript in `assets/figures/src/`; `node tools/build.mjs kit` emits to
`assets/figures/`, where the loader looks, and the output is **committed**: `scripts/check.sh`
fails if it stops matching source. `tsc`, not a bundler; one output file per source file;
`tsconfig.kit.json` sets `noCheck`, so emit and check stay separate and `tools types`
ratchets. Import only the layer you need: `kit/text.js`, `kit/frame.js`, `kit/draw.js`,
`kit/controls.js`, `kit/interact.js`, `kit/drag.js`.

### The rules, each checked rather than trusted

- **`SIZE`, never a hand-chosen number.** A 560-unit viewBox at 322.8px scales at **0.576**:
  `16` renders 9.2px, `15` 8.6px, under the **9px floor**; `SIZE.tick` clears it.
- **`label()`, never a hand-written `<text>`**: it defaults to `text-ink`; an unclassed
  `<text>` is `fill`'s initial black, invisible on a dark panel. Never `$...$` in a label.
- **`scale()`: domain → range, `.invert` back.** The y-axis is the trap. It raises on a
  zero-width domain, where hand-built code yields `NaN`.
- **`axes()` for a graph area**: returns **the mappers as well as the string**. `line`,
  `circle`, `rect`, `polygon`, `path`, `arrow`, `curve`, `graph`, `area`, `dots`, `bars` are
  pure, returning strings; the arrangement is yours.
- **`sigfig()` for a rounded answer**: `6`, `6.0` and `6.00` are three claims;
  `sigfig(300, 2)` is `"3.0e2"`.
- **`seed()`, never `Math.random`**: two readers must compare the same data.
- **A draggable handle needs a backing control; `draggable()` enforces it.** The control
  holds the value and the keyboard path; the handle writes to it, no `tabindex`, no second
  focus stop.
- **An animation needs a scrubber and a still**: `animate()` gives a range input over the
  whole frame range and honours `prefers-reduced-motion` by not starting.
- **A self-check compares against a value the bank proved**: `check()` is numeric, with a
  tolerance and a normalised string match, **not** an algebra engine.
- **Composite controls carry a `.value`**: `segmented`, `stepper` and `table` read and write
  like a `<select>`, so `react(control, draw)` binds any.
- **Every control is a native element**: `<input>`, `<select>`, `<button>`, `<textarea>`.
- **`camera3d()` for a solid, not a flat drawing**: fixed camera, painter's algorithm, dashed
  hidden edges. Face visibility is its normal turned outward from the centroid, so vertex
  order is free; `drawMesh` fits the geometry to the box.
- **`vectorField()` for a grid of arrows**: data units → a direction *through the mappers*,
  so a flipped axis cannot flip the arrows.
- **`venn()` places the labels**: a region is a predicate, its label at the point furthest
  inside. Never place a region by hand.
- **`builder()` assembles and validates in the module**: the kit owns palette, order and
  keyboard; whether an assembly is right is the page's lesson.
- **`practice()`/`exercise()` generate questions and never claim they are checked**: the
  *generator* is checked, the answer is computed by the function that wrote the question.
  Never say "checked by a computer".
- **A figure that states arithmetic declares it**: `panel()` returns `claim`; call
  `claim([{ expression, values, answer, shown }])` once per redraw. `python -m
  textbook.working` proves each with the banks' exact CAS (`0.065` is `13/200`) and requires
  the readout to contain the claimed string. **Claim the numbers you print, not only the
  totals.** Never parse the readout back out of the text (`DECISIONS.md`).
- **Never runtime LaTeX**: `$…$` injected at runtime, in a figure or a generated question,
  reaches the reader as dollar signs. Plain text or HTML only.
- **`diagram()` when the meaning is its named parts**: `panel()` gives one name and one
  description, right for a graph and wrong for six labels. `diagram()` puts a **button** per
  part under the drawing, and the drawing follows the focus. **The buttons are the focus
  stops**; a focusable `<g>` too would be two stops for one thing. Use one, not both.

`node tools/dist/cli.js kit site` checks all of this through a real page, phone-floor
arithmetic included; `kit-pure` checks the drawing and formatting layers under plain `node`.
They assert every Venn label lands inside its region, for two sets and three, and that a
cube's hidden edges number exactly three. `node tools/dist/cli.js audit site --mobile`
measures what reaches a 390px screen.

### Kernels

`assets/data/solvers/` is the committed `ot-solve` bundle: per kernel a directory with
`kernel.js` beside `manifest.json`, `selftest.json` and `kernel.wasm`. Import
`../data/solvers/<id>/kernel.js`; its top-level `await` makes it a **value** at import, so
`mount` stays synchronous. `assets/figures/kernel.js` loads it (ABI, slot count, layout
digest, typed-array views); `assets/figures/kernel-lab.js` is the shared visual language:
`field`, `line`, `plane`, `estimate`, each above a trace.

- **Never `claim()` a simulated number**: a time step's number is proved by the kernel's
  selftest.
- **Controls come from the manifest**: `kernelLab` reads `kernel.spec(name)` for the range;
  the manifest is generated from the Rust.
- **A status is not a verdict**: `r > 1/2` is the page's claim; `Unstable` means only that
  the numbers stopped being usable. The figure says which.
- **Never edit the bundle or a generated module**: change `solvers/ot-solve`, run
  `scripts/build-solvers.sh`, commit what it writes. `solvers/ABI.md` is the contract.

## Before you add a shared thing

- **Two books needing it: `assets/`, never a book.** A book's `docs/assets/` holds only its
  own; shared files and directories are placed by the build (see **Layout**). **A figure
  module goes in `books/<id>/docs/assets/figures/`** and loads the `build-guided-figure`
  skill.
- **Two figures doing the same thing: the kit.** `grep -l` the idiom across the modules
  before writing a helper into one.
- **Two books wanting the same figure: `assets/figures/`** — a module beside the loader is
  mountable by filename in every book. A book may not define a module of the same name: the
  build fails, two modules with one slug making a page's meaning depend on build order. A
  generic tool belongs here; `circular-motion`, `radiation-penetration`, `transformer-turns`
  and `vector-addition` do not. The same set-notation diagram, number line or coordinate grid
  does.
- **Read `ideas.md` before a new interaction**: build an idea that is there and move it to
  **Built**; otherwise add it with the evidence that made you think of it (a count, a command
  and its output), not in a commit message.

## Files and the cascade

| Path | Role |
|---|---|
| `assets/stylesheets/extra.css` | Shared plumbing: Material mapping, components, fonts as tokens; **no colour** |
| `assets/stylesheets/themes.css` | Generated from `themes/*.yaml`: every `--tb-*` per scheme, per bundle |
| `books/<id>/docs/assets/stylesheets/book.css` | Subject tint `--tb-book-*` per scheme, from `book.yaml → theme` |
| `books/<id>/docs/assets/stylesheets/book-local.css` | A book's own components; authored, empty by default |
| `assets/figures/figures.js` | Figure loader, injected on pages using `:::figure` |
| `assets/booklet/booklet.js` | Formulae-and-tables widget, only in books declaring a booklet |
| `assets/settings/settings.js` | Scheme and theme control, the only writer of the preference keys |
| `assets/icons/` | The app icon and favicon, the one allowed fixed colour |
| `assets/sw.js` | Service worker, a deliberate exception to the no-JS rule |

`extra.css` must not declare a colour token: a declaration there outranks every bundle,
silently, and `tests/test_themes.py` enforces it. Set a subject tint in `books/<id>/book.yaml
→ theme`, and a book's own components in its `book-local.css`.

### The theme model

A book's look multiplies two independent things: the **bundle** the reader chose and the
**subject tint** the book contributes. Keep them apart.

- A **bundle** (`themes/<id>.yaml`) is the reading experience: a complete light and dark
  palette plus typography, chosen by the **reader**, applied to **every book**. One file per
  bundle, plus a line in `collection.yaml`.
- A book contributes only its **subject tint** (`book.yaml → theme`): an accent and any
  surface it moves, per scheme, as `--tb-book-*` values each bundle composes:

  ```css
  --tb-accent: var(--tb-book-accent, #6ea8d8);
  ```

  A bundle may **refuse** a token under `fixed:`; `clean` refuses the accent.

Never put a surface or a font in a book, or a subject's identity in a bundle.

### Colour on a page or in a figure

Nothing in a page or a figure may carry a colour.

- Use the `fig-*` classes (`fig-accent`, `fig-warn`, `fig-good`, `fig-ink`, `fig-grid`) and
  `text-*`, and read the tokens (`var(--tb-accent)`, `var(--tb-fig-warn)`, …), so a figure
  adapts to every bundle and both schemes.
- **`fig-*` paints; `fig-grid`/`fig-line` do not.** A class setting `fill` beats a
  `fill="none"` *attribute*, so `class="fig-accent" fill="none"` is a filled shape. Use
  `fig-line` for an accent stroke with no fill, `fig-grid` for a grey one, or
  `style="fill:none"`; the kit's `path()` does it for you.
- **No runtime LaTeX**: plain text or HTML only.

**Over five `h2`s a page prints its own contents**: `engine/src/textbook/hooks/contents.py`
renders a two-column `<nav>` of the page's heading ids after the first paragraph. Place it
with `:::contents`, opt out with `:::no-contents` where it would duplicate the page's own
index. The nav carries `data-scrollspy`, and the page script marks the section the reader
is in (`:target-current` where the platform has it, an `IntersectionObserver` where it does
not) with an underline, a gutter bar and `aria-current="location"` — never colour alone,
and never weight, which would rewrap the label and shift the article.

**Icons are the only fixed colour.** `assets/icons/app-icon.svg` (home screen) keeps the page
rules, `assets/icons/favicon.svg` (tab) drops them; `tests/test_pwa.py` pins the two
palettes, and the book template and the portal link the tab icon. `apple-touch-icon.png` is
the one committed raster: iOS ignores the manifest and sizes its own PNG
(`assets/icons/README.md`), and a test pins the SVG's hash. No other image may hard-code a
colour.

### The contrast invariant

`tests/test_themes.py` computes the WCAG ratio for every bundle × book × scheme and fails
below **ink 7:1, link 4.5:1, accent 4.5:1**, and below **`accent_ink` 4.5:1 on the accent**:
text knocked out of the accent uses `accent_ink`, never the paper. When a bundle or a book
fails, **fix the palette, not the threshold.**

### Adding a bundle

1. Copy a file in `themes/`, change `id`, `title`, `description`, the two palettes and the
   typography. Both palettes must be complete: every token in `SCHEME_TOKENS`
   (`engine/src/textbook/book.py`), in both `light:` and `dark:`.
2. Add the id to `themes:` in `collection.yaml`; that list is the menu order.
3. `python -m textbook.scaffold` regenerates `assets/stylesheets/themes.css`; no book is
   rebuilt to gain a theme.
4. `pytest tests/test_themes.py` says if the palette is unreadable against a book's tint.

### Reader preferences

Both are shared by every book and the landing page, under origin-wide keys:
`textbooks:scheme` (`default` / `slate`) and `textbooks:theme` (a bundle id). An inline
script at the top of `engine/src/textbook/templates/page.html` sets `data-theme` and
`data-md-color-scheme` from those keys before the first paint; the landing page carries the
same script, and both expose the same store to the shared Settings runtime. **Keep the
script ahead of every stylesheet** in that template, so the chosen bundle paints with no
flash. Never path-scope the theme key: renaming the repository must not cost a reader their
preferences.

### Previewing a bundle

```bash
node tools/dist/cli.js screenshot site ~/out --schemes light,dark --theme neon -- \
  "chapter:/gcse-maths/higher/chapter-6/section-6.4/learn/" "landing:/"
```

## Layout

- Shared CSS and runtime widgets live **once**, in `assets/`, listed in
  `scaffold.SHARED_FILES` — or a wholly shared directory in `scaffold.SHARED_DIRS`, copied
  recursively. The build copies each to the same path in the output, so a book never holds a
  copy: edit the file in `assets/`, there is nothing in a book's tree to edit. **A figure
  module is the exception**: `assets/figures/*.js` is copied *flat* into each book's figures
  directory, because a figure is mounted by bare slug beside the loader.
- **Nothing here is a symlink**: a link becomes a plain file holding its target wherever
  `core.symlinks` is false, shipping a 36-byte `kit.js` to the site. Add the file to
  `SHARED_FILES` (or its directory to `SHARED_DIRS`) and let the build place it.
- Colour, fonts, bundles: **The theme model** above.

## The booklet widget

The booklet **data** is per book and lives in `books/AGENTS.md`; the widget is shared.

- It renders formulae from build-time MathML, so never put `$...$` into it at runtime.
  Tables are plain text and data.
- Pop-out uses the Document Picture-in-Picture API, Chromium-only; the button is hidden
  elsewhere and the in-page panel is the baseline.
- It is site-wide runtime JS, a deliberate exception to the Tier-0 no-JS rule. Keep it
  deferred and lazy: nothing beyond the button loads until a reader opens it.
