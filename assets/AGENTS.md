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

`assets/figures/kit.js` is the shared surface for every figure — **177 of 177 modules
import it**. It does not draw: a framework for 177 bespoke diagrams would be a framework
around nothing. What it owns is everything *around* the drawing, and the three rules
below are checked rather than trusted. The measurements and the reasoning are in
`research/design/reuse-audit.md`.

- **Choose no size. Use `SIZE`.** An SVG scales by rendered width over viewBox width, so
  a `font-size` is not the size a reader sees. A 560-unit viewBox in a 358px phone panel
  draws at **0.64**, so `font-size="16"` is 10.2px and `13` is 8.3px — below the 9px
  floor. Fourteen distinct sizes were in use across 177 modules before the scale
  existed, and four had drifted below the floor with every one of their own attributes
  looking reasonable. `SIZE.tick` is the smallest that clears it.
- **Use `label()` for text, never a hand-written `<text>`.** 107 modules wrote the same
  four attributes by hand. The class defaults to `text-ink`, because a `<text>` with no
  colour class is painted with `fill`'s initial black and vanishes on a dark panel — a
  defect found **eighteen times** by measurement. Never put `$...$` in a label: the maths
  hook runs at build time.
- **Use `scale()` to map a domain onto a range.** 20 modules built it by hand, and the
  y-axis case is the one that gets flipped when written by hand. It raises on a domain
  with no width, where the hand-built version divides by zero and produces `NaN`.

`scripts/check-figure-kit.cjs` verifies all three, including the phone-floor arithmetic,
in CI. `scripts/audit-figures.cjs --mobile` measures what actually reaches a 390px
screen; the current state is **0 figures below 9px**.

## Before you add a shared thing

The collection is nine books and will be more. Two rules keep it from turning into nine
copies of the same component.

- **If two books need it, it belongs in `assets/`, not in a book.** A book's
  `docs/assets/` holds only what is that book's own. Shared files are declared once in
  `scaffold.SHARED_FILES` and **the build places them** — nothing in this repository is a
  symlink, because git checks one out as a small plain file wherever `core.symlinks` is
  false and a green build then ships a 36-byte `kit.js` holding a path.
- **If two figures do the same thing, it belongs in the kit.** Before writing a helper
  into a module, run `grep -l` for the idiom across the other modules. `research/design/reuse-audit.md`
  records what was measured already, including the idioms that are deliberately **not**
  shared and the reason for each.
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
   `SCHEME_TOKENS` (`engine/textbook/book.py`), in both `light:` and `dark:`.
2. Add the id to `themes:` in `collection.yaml`. That list is the menu order.
3. `python -m textbook.scaffold` — regenerates `assets/stylesheets/themes.css`.
   No book is rebuilt to gain a theme.
4. `pytest tests/test_themes.py` — the contrast invariant will tell you if the
   palette is not readable against a book's tint.

### Reader preferences

Both preferences are the reader's and are shared by every book and the landing
page, under origin-wide keys: `textbooks:scheme` (`default` / `slate`) and
`textbooks:theme` (a bundle id). They are applied before the first paint by an
inline script at the top of `engine/textbook/templates/page.html`, which reads
the two keys and sets `data-theme` and `data-md-color-scheme`; the landing page
carries the same script, and both pages expose the same store to the shared
Settings runtime. Keep the script ahead of every stylesheet in that template, so
the chosen bundle paints with no flash.

Do not make the theme key path-scoped either — renaming the repository must not
cost a reader their preferences.

### Previewing a bundle

```bash
node scripts/screenshot.cjs site ~/out --schemes light,dark --theme neon -- \
  "chapter:/gcse-maths/higher/Chapter 6/Section 6.4/Walkthrough/" "landing:/"
```

## Layout

- Shared CSS and runtime widgets live **once**, in `assets/`, and are listed in
  `scaffold.SHARED_FILES`. The build copies each one to the same path in the
  output, so a book never holds a copy and cannot drift from the shared file. Edit
  the file in `assets/`; there is nothing in a book's tree to edit.
- **Nothing in this repository is a symlink**, deliberately. A link is checked out
  as a small plain file holding its target wherever `core.symlinks` is false — a
  Windows clone without developer mode — which shipped a 36-byte `kit.js` to the
  site and broke every figure while the build stayed green. If you are tempted to
  add one, add the file to `SHARED_FILES` instead and let the build place it.
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
