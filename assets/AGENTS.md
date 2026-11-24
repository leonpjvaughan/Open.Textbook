# AGENTS.md — the shared design system

`assets/` reaches every book. The root's **Theming**, **Conventions** and **Toolchain**
apply; this file owns the figure contract, **Layout**, the **booklet** traps and the
**theme model**.

## Figures: draw through the kit, choose no number

`assets/figures/kit.js` is every figure's surface; `assets/figures/` is the shared library.
Source is TypeScript in `assets/figures/src/`; `node tools/build.mjs kit` emits to
`assets/figures/`, and the output is **committed** — `scripts/check.sh` fails on drift.
`tsc`, not a bundler; one output file per source; `tsconfig.kit.json` sets `noCheck`, so
emit and check stay separate and `tools types` ratchets. Import only the layer you need:
`kit/text.js`, `kit/frame.js`, `kit/draw.js`, `kit/controls.js`, `kit/interact.js`,
`kit/drag.js`.

### The rules, each checked rather than trusted

- **`SIZE`, never a hand-chosen number.** A 560-unit viewBox at 322.8px scales at **0.576**:
  `16` renders 9.2px, `15` 8.6px, under the **9px floor**; `SIZE.tick` clears it.
- **`label()`, never a hand-written `<text>`**: it defaults to `text-ink`; an unclassed
  `<text>` is `fill`'s initial black, invisible on a dark panel.
- **`scale()`: domain → range, `.invert` back.** It raises on a zero-width domain, where
  hand-built code yields `NaN`.
- **`axes()` for a graph area**: returns **the mappers as well as the string**. `line`,
  `circle`, `rect`, `polygon`, `path`, `arrow`, `curve`, `graph`, `area`, `dots`, `bars` are
  pure, returning strings.
- **`sigfig()` for a rounded answer**: `6`, `6.0` and `6.00` are three claims;
  `sigfig(300, 2)` is `"3.0e2"`.
- **`seed()`, never `Math.random`**: two readers must compare the same data.
- **A draggable handle needs a backing control; `draggable()` enforces it**: the control
  holds the value and the keyboard path, the handle writes to it, no `tabindex`, no second
  focus stop.
- **An animation needs a scrubber and a still**: `animate()` gives a range input over the
  frame range and honours `prefers-reduced-motion`.
- **A self-check compares against a value the bank proved**: `check()` is numeric, with a
  tolerance and a normalised string match, **not** an algebra engine.
- **Composite controls carry a `.value`** (`segmented`, `stepper`, `table`), so
  `react(control, draw)` binds any; every control is a native element.
- **`camera3d()` for a solid**: fixed camera, painter's algorithm, dashed hidden edges; face
  visibility is its normal turned outward from the centroid, so vertex order is free.
- **`vectorField()` for a grid of arrows**: data units → a direction *through the mappers*,
  so a flipped axis cannot flip the arrows.
- **`venn()` places the labels**: a region is a predicate, its label at the point furthest
  inside.
- **`builder()` assembles and validates in the module**: the kit owns palette, order and
  keyboard; whether an assembly is right is the page's lesson.
- **`practice()`/`exercise()` generate questions and never claim they are checked**: the
  *generator* is checked, the answer is computed by the function that wrote the question.
  Never say "checked by a computer".
- **A figure that states arithmetic declares it**: `panel()` returns `claim`; call
  `claim([{ expression, values, answer, shown }])` once per redraw. `python -m
  textbook.working` proves each with the banks' exact CAS (`0.065` is `13/200`) and requires
  the readout to contain the claimed string. **Claim the numbers you print, not only the
  totals**; never parse the readout back out (`DECISIONS.md`).
- **Never runtime LaTeX**: `$…$` injected at runtime reaches the reader as dollar signs.
- **`diagram()` when the meaning is its named parts**: one name is right for a graph and
  wrong for six labels. It puts a **button** per part under the drawing, and **the buttons
  are the focus stops** — a focusable `<g>` too would be two stops for one thing.

`node tools/dist/cli.js kit site` checks all of this through a real page, phone-floor
arithmetic included; `kit-pure` checks the drawing and formatting layers under plain `node`.
They assert every Venn label lands inside its region, for two sets and three, and that a
cube's hidden edges number exactly three. `audit site --mobile` measures a 390px screen.

### Kernels

`assets/data/solvers/` is the committed `ot-solve` bundle: per kernel a directory with
`kernel.js` beside `manifest.json`, `selftest.json` and `kernel.wasm`. Import
`../data/solvers/<id>/kernel.js`; its top-level `await` makes it a **value** at import, so
`mount` stays synchronous. `assets/figures/kernel.js` loads it (ABI, slot count, layout
digest, typed-array views); `assets/figures/kernel-lab.js` is the shared visual language:
`field`, `line`, `plane`, `estimate`, each above a trace.

- **Never `claim()` a simulated number**: the selftest proves it.
- **Controls come from the manifest**: `kernelLab` reads `kernel.spec(name)` for the range.
- **A status is not a verdict**: `r > 1/2` is the page's claim; `Unstable` means only that
  the numbers stopped being usable.
- **Never edit the bundle or a generated module**: change `solvers/ot-solve`, run
  `scripts/build-solvers.sh`, commit what it writes. `solvers/ABI.md` is the contract.

## Before you add a shared thing

- **Two books needing it: `assets/`, never a book.** A book's `docs/assets/` holds only its
  own. **A figure module goes in `books/<id>/docs/assets/figures/`** and loads the
  `build-guided-figure` skill.
- **Two figures doing the same thing: the kit.** `grep -l` the idiom across the modules.
- **Two books wanting the same figure: `assets/figures/`** — mountable by filename in every
  book. A book may not define a module of the same name: the build fails. A generic tool
  belongs here; `circular-motion`, `radiation-penetration`, `transformer-turns` and
  `vector-addition` do not; a set-notation diagram, number line or coordinate grid does.
- **Read `ideas.md` before a new interaction**: build an idea that is there and move it to
  **Built**; otherwise add it with the evidence that made you think of it.

## Files, colour and layout

`assets/stylesheets/extra.css` is shared plumbing and **must not declare a colour token**: a
declaration there outranks every bundle, silently, and `tests/test_themes.py` enforces it.
`assets/stylesheets/themes.css` is generated from `themes/*.yaml`; each book's
`docs/assets/stylesheets/book.css` carries only its subject tint, `book-local.css` its own
components. `assets/figures/figures.js` is the loader, `assets/booklet/booklet.js` the booklet
widget, `assets/settings/settings.js` the only writer of the preference keys. `assets/icons/`
is the one allowed fixed colour; `assets/sw.js` is a deliberate exception to the no-JS rule.

### The theme model

A book's look multiplies the **bundle** the reader chose and the **subject tint** the book
contributes. Keep them apart.

- A **bundle** (`themes/<id>.yaml`) is the reading experience: a complete light and dark
  palette plus typography, chosen by the **reader**, applied to **every book**. One file per
  bundle, plus a line in `collection.yaml`.
- A book contributes only its **subject tint** (`book.yaml → theme`): an accent and any
  surface it moves, per scheme, as `--tb-book-*` values each bundle composes
  (`--tb-accent: var(--tb-book-accent, #6ea8d8);`). A bundle may **refuse** a token under
  `fixed:`; `clean` refuses the accent.

### Colour on a page or in a figure

Nothing in a page or a figure may carry a colour. Use the `fig-*` classes (`fig-accent`,
`fig-warn`, `fig-good`, `fig-ink`, `fig-grid`) and `text-*`, and read the tokens.

**`fig-*` paints; `fig-grid`/`fig-line` do not.** A class setting `fill` beats a
`fill="none"` *attribute*, so `class="fig-accent" fill="none"` is a filled shape. Use
`fig-line` for an accent stroke with no fill, `fig-grid` for a grey one, or
`style="fill:none"`; the kit's `path()` does it for you.

**Over five `h2`s a page prints its own contents**: `engine/src/textbook/hooks/contents.py`
renders a two-column `<nav>` of heading ids after the first paragraph. Place it with
`:::contents`, opt out with `:::no-contents` where it would duplicate the page's own index.
The nav carries `data-scrollspy`, and the page script marks the current section
(`:target-current` where the platform has it, an `IntersectionObserver` where it does not)
with an underline, a gutter bar and `aria-current="location"` — never colour alone, and
never weight, which would rewrap the label.

**Icons are the only fixed colour.** `assets/icons/app-icon.svg` (home screen) keeps the page
rules, `assets/icons/favicon.svg` (tab) drops them; `tests/test_pwa.py` pins the two palettes.
`apple-touch-icon.png` is the one committed raster: iOS ignores the manifest and sizes its own
PNG (`assets/icons/README.md`); a test pins the SVG's hash.

### The contrast invariant

`tests/test_themes.py` computes the WCAG ratio for every bundle × book × scheme and fails
below **ink 7:1, link 4.5:1, accent 4.5:1**, and below **`accent_ink` 4.5:1 on the accent**:
text knocked out of the accent uses `accent_ink`, never the paper. **Fix the palette, not the
threshold.**

### Adding a bundle

1. Copy a file in `themes/`, change `id`, `title`, `description`, the palettes and the
   typography. Both palettes must be complete: every token in `SCHEME_TOKENS`
   (`engine/src/textbook/book.py`), in both `light:` and `dark:`.
2. Add the id to `themes:` in `collection.yaml`; that list is the menu order.
3. `python -m textbook.scaffold` regenerates `assets/stylesheets/themes.css`.
4. `pytest tests/test_themes.py` says if the palette is unreadable against a book's tint.

### Reader preferences

Both are shared by every book and the landing page, under origin-wide keys:
`textbooks:scheme` (`default` / `slate`) and `textbooks:theme` (a bundle id). An inline script
at the top of `engine/src/textbook/templates/page.html` sets `data-theme` and
`data-md-color-scheme` from them before the first paint. **Keep the script ahead of every
stylesheet**, so the chosen bundle paints with no flash. Never path-scope the theme key.
Preview one with `node tools/dist/cli.js screenshot site ~/out --schemes light,dark --theme
neon -- "chapter:<route>" "landing:/"`.

## Layout

- Shared CSS and runtime widgets live **once**, in `assets/`, listed in
  `scaffold.SHARED_FILES` — or a wholly shared directory in `scaffold.SHARED_DIRS`, copied
  recursively. **A figure module is the exception**: `assets/figures/*.js` is copied *flat*
  into each book's figures directory, because a figure is mounted by bare slug.
- **Nothing here is a symlink**: a link becomes a plain file holding its target wherever
  `core.symlinks` is false, shipping a 36-byte `kit.js` to the site. Add the file to
  `SHARED_FILES` (or its directory to `SHARED_DIRS`) and let the build place it.

## Layouts

A layout is **pure geometry over one DOM**: `assets/stylesheets/layouts/<id>.css` changes size,
spacing, measure and grid, never colour, and no Python or template code branches on its id.
The colour bundle owns font **families**; a layout owns font size and measure. Reader
choices are three axes: `textbooks:scheme`, `textbooks:theme` and `textbooks:style` (the
layout id, written to `<html data-style>`).

The contract, enforced by `tests/test_layout_contract.py` with a real CSS parser:

- The whole file is one `@layer layout { ... }` block, and every selector starts with
  `:root[data-style="<id>"]`. No nesting, no `!important`.
- Only allowlisted properties: display, grid, flex, box model, type size and shape, lists,
  `color`, borders (not `border-image*`), and `break-inside: avoid`. Custom properties are named `--<id>-*`, must be
  declared in the same file, and are resolved before any value is checked.
- No literal colours and no `url()`, gradient or image. `color` takes only the text tokens the
  palette audit checks on paper; `background` is `transparent`; borders and `column-rule`
  use `--tb-rule`, `--tb-accent` or `--card-accent-active`; `font-family` is `--tb-font-*`;
  every `var()` names a known token.
- `display: none` only where every subject compound has `[data-optional]` and no `:has()`,
  `:is()`, `:where()` or `:not()`. No hiding by size: `width`, `max-width`, `height`,
  `max-height` and `font-size` are never zero, and a negative margin is a literal of at most
  2px. No px in widths or query conditions.
- No `@import`, `@font-face`, `@keyframes`, `@property`, `@page`, `prefers-color-scheme`, any
  selector token containing `tb-settings`, `tb-search` or a colour-scheme attribute, a class
  or id matched by attribute, or a partial attribute match.
- Body text of at least 17px, line height of at least 1.5 and a 45 to 75ch measure are
  measured in a browser, not by the parser: `tests/test_layouts_browser.py` checks them,
  with overflow, 24px targets, phone figure labels and print, for every layout.

`tests/fixtures/layouts/` holds one bad file per rule and one good file, so the checker is
itself tested. `tests/test_cascade_layers.py` pins the layer order declared first in
`themes.css`: `@layer palette, base, shell, layout, book, chrome;`.

**Add a layout.** Write `assets/stylesheets/layouts/<id>.css` and its wireframe
`<id>.svg` (viewBox `0 0 120 80`, painted only in `currentColor`, the accent marks classed
`tb-thumb__accent`; the Settings dialog inlines it, and `validate_collection` refuses a layout
without one), add `{id, title, description}` to `layouts` in `collection.yaml`, and run the tests. The build
concatenates the layouts into `layouts.css`. The reader's **Layout** choice appears
automatically once there are two; with one, neither the fieldset nor the pre-paint read of
`textbooks:style` is emitted. New hooks paint (a tint, a swatch) in base CSS, never in a
layout.

## The booklet widget

The booklet **data** is per book and lives in `books/AGENTS.md`; the widget is shared.

- It renders formulae from build-time MathML, never `$...$` at runtime.
- Pop-out uses the Document Picture-in-Picture API, Chromium-only; the button is hidden
  elsewhere and the in-page panel is the baseline.
- It is site-wide runtime JS, a deliberate exception to the Tier-0 no-JS rule; keep it
  deferred and lazy: nothing beyond the button loads until a reader opens it.
