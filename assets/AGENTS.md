# AGENTS.md — the shared design system

Everything in `assets/` reaches every book. It is the shared reading experience:
the design system, the runtime widgets and the installable-site assets. Nothing
here belongs to one book.

Read the root `AGENTS.md` first. The root's **Theming**, **Conventions** and
**Toolchain** still apply. This file adds what is particular to the shared
assets, and it now owns the **Layout** traps and the **booklet widget** traps
that used to sit in the root's `## Watch out for`.

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

## Layout

Moved from the root's `## Watch out for`.

- Shared CSS and runtime widgets reach each book by symlink:
  `books/<id>/docs/assets/{stylesheets/extra.css,stylesheets/themes.css,figures/figures.js,booklet/booklet.js}`
  point into the root `assets/`. Edit the file in `assets/` — never replace a
  symlink with a copy, or the books drift apart. The scaffold creates these, so a
  new book gets them by running it.
- A broken symlink under `docs_dir` breaks the book: the scaffold creates the
  shared symlinks and the tests check they resolve, because a tool that walks the
  tree meets them whether or not a page references them.
- Anything to do with colour, fonts or bundles: see the root's **Theming**.

## The booklet widget

Moved from the root's `## Watch out for`. The booklet **data** is per book and
lives in `books/AGENTS.md`; the widget is shared and its rules are here.

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
  `collection.yaml`; no book is rebuilt. Follow the root's **Adding a bundle**.
- **Adding a figure** — the module goes in the book's
  `books/<id>/docs/assets/figures/`, using this loader. Load the
  `build-guided-figure` skill.

## Read next

`SHAPE.md` for the cascade and the theme model, the root's **Theming** for the
contract, and `BOOKLETS.md` for the data the widget renders.
