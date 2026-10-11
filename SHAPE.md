# Repository shape

This repository is a **collection of textbooks** that share one engine. GCSE
Mathematics was the first; GCSE Physics, A-level Mathematics and A-level Physics
are the intended next ones. This file records the shape, the reasons for it, and
the extension points — in particular per-book theming.

`AGENTS.md` is still the operative summary for anyone authoring content. This
file is about the structure of the repository itself.

## The two layers

The split that everything follows: **the engine and the design system are
shared; the curriculum, the content and the verification data are per book.**

| Layer | Lives in | Shared? |
|---|---|---|
| MkDocs adapter (base config, hook entry point, generated per-book configs) | `renderers/mkdocs/` | shared |
| Engine (hooks, scaffold, lint, booklet build, verifier, portal) | `engine/textbook/` | shared |
| Design system and runtime widgets (CSS, figure loader, booklet widget) | `assets/` | shared |
| Evidence base and primary sources | `research/` | shared, with per-book folders |
| Design exploration (not published) | `research/design/` | shared |
| Curriculum, chapter plan, tier refs | `books/<id>/books/gcse-maths/curriculum.yaml` | per book |
| Content pages | `books/<id>/docs/` | per book |
| Problem banks | `books/<id>/books/gcse-maths/problems/` | per book |
| Formulae booklet data | `books/<id>/booklet/` | per book |
| Provenance manifest for the curriculum claims | `books/<id>/sources.yaml` | per book |
| Per-book theme tokens and overrides | `books/<id>/docs/assets/stylesheets/` | per book |

```
repo/
├── AGENTS.md                 # global authoring conventions, voice, watch-outs
├── SHAPE.md                  # this file
├── collection.yaml           # collection title and deployment base URL
├── engine/textbook/          # the shared engine (installable package)
├── assets/                   # shared design system and runtime widgets
├── research/                 # pedagogy, notes, fetched sources
├── books/<id>/               # one self-contained book
├── renderers/mkdocs/         # MkDocs adapter; per-book configs are generated
├── scripts/                  # thin developer entry points
├── tests/                    # engine and content tests
└── .github/workflows/        # CI, one matrix over book × profile
```

## Why one build per book, per profile

A tier profile is a **whole-build filter**: it drops Higher-only pages and strips
in-page Higher blocks. The same book cannot therefore be both a Foundation build
and a Higher build inside one `site_dir` — the same chapter would have to exist
twice. So the deployment is **N builds merged into one directory**:

```
site/
├── index.html                      # the landing page
├── assets/stylesheets/extra.css
├── gcse-maths/foundation/…
├── gcse-maths/higher/…
└── gcse-physics/higher/…
```

This is a generalisation of what the repository already did: `mkdocs.yml` and
`mkdocs.foundation.yml` were two builds from one source. Now it is
`<book>.<profile>` in a matrix.

Two consequences worth knowing:

- Each profile needs its own `site_url`, or canonical links and the sitemap will
  be wrong under a deployment subpath.
- The landing page is a **separate artefact** from the books, so a broken chapter
  in one book cannot take the collection's front door down.

### Two mechanisms, both verified

- **Shared assets** reach each book through a symlink from
  `books/<id>/docs/assets/…` into `assets/`. MkDocs follows the symlink under
  `--strict` and copies real files into the output. Caveat: Git stores the
  symlink, so a checkout needs `core.symlinks` (true on Linux and macOS) and CI
  must run on a platform that honours it.
- **Shared hooks** reach MkDocs through a two-line file,
  `renderers/mkdocs/hooks/entry.py`, which re-exports the engine's hooks. MkDocs
  requires a *file* path for the `hooks:` setting — a dotted module path is
  rejected — so the shim is permanent, not a workaround.

## The landing page

`engine/textbook/portal.py` generates `site/index.html` from every
`books/*/book.yaml` plus `collection.yaml`. The template is
`engine/textbook/templates/portal.html`, and the generated page is covered by
the CI drift check like every other generated file.

**Cards are grouped by qualification.** Each card carries the book's title,
subject, exam boards, chapter and section counts, and one link per profile:

```
GCSE
  ┌───────────────────────┐  ┌───────────────────────┐
  │ GCSE Mathematics      │  │ GCSE Physics          │
  │ AQA · Edexcel · OCR   │  │ AQA · Edexcel · OCR   │
  │ 25 chapters · 133 sec │  │ …                     │
  │ [Foundation] [Higher] │  │ [Foundation] [Higher] │
  └───────────────────────┘  └───────────────────────┘
A-level
  ┌───────────────────────┐  ┌───────────────────────┐
  │ A-level Mathematics   │  │ A-level Physics       │
  │ …                     │  │ …                     │
  └───────────────────────┘  └───────────────────────┘
```

Grouping comes from `book.yaml` metadata, not from the directory layout, so a
new qualification is a new `qualification` value and never a new directory.

### Cards use the book's theme

Each card is tinted with the book's accent colour, read from
`book.yaml → theme.accent` and applied as a per-card custom property. So the
landing page already reflects per-book identity — and will keep doing so as
books diverge.

## Per-book theming

**Each book carries its own theme, expressed as a light variation and a dark
variation.** A book names only what makes it itself; everything else stays the
house default. The cascade is:

1. `assets/stylesheets/extra.css` — the **design system**. Both schemes are a
   complete set of tokens (`--tb-*`), and the mapping onto Material's `--md-*`
   variables is written once, from those tokens. This is the only file that sets
   house defaults, and it is shared by every book.
2. `books/<id>/docs/assets/stylesheets/book.css` — **generated** from
   `book.yaml → theme:` by the scaffold, as one block per scheme. It overrides
   tokens only. Do not hand-edit it; edit `book.yaml`.
3. `books/<id>/docs/assets/stylesheets/book-local.css` — **authored**, loaded
   last, empty by default. The escape hatch for component-level changes that a
   book genuinely needs (a diagram style, a subject-specific block). Keep it
   small: a book should be recognisable, not a different design system.
4. The portal card is tinted from the **same two accents**, so a book's identity
   holds from the front door inwards, in both schemes, rather than being the
   light accent darkened.

```yaml
theme:
  light:
    accent: "#2f6690"
    accent_light: "#4a7fae"
    accent_dark: "#24506f"
  dark:
    accent: "#6ea8d8"
```

The themable tokens are `accent`, `accent_light`, `accent_dark`, `paper`, `ink`,
`ink_soft`, `rule`, `link`, `code_bg`, `fig_warn`, `fig_good` and `fig_grid`. An
unknown key is an error rather than a silent no-op, because a typo that changes
nothing is the worst kind. Token names are subject-neutral (`--tb-paper`,
`--tb-accent`, `--tb-fig-warn`), because the same sheet serves physics and
A-level as well as GCSE.

A diagram tints itself by reading the book's accent, so setting one accent per
scheme re-tints every figure in the book.

The rule this protects: **a per-book theme must be expressible as token values.**
Anything that needs new structure belongs in the shared design system, where
every book benefits from it; anything that is genuinely one book's own belongs in
its `book-local.css`. Both are supported, and neither forks the design system for
everyone else.

## Theme preference

The reader's light/dark choice is stored once, under the origin-wide key
`textbooks:scheme`, and shared by every book profile and by the landing page.

Material does not do this by itself: it scopes its palette storage to the root of
each built site, so a choice made in GCSE Mathematics Higher is invisible to
GCSE Mathematics Foundation, to another book, and to the landing page. The bridge
is `engine/textbook/hooks/scheme.py`, which injects a small inline script into
the `<head>` of every page. It does two things:

1. **Before Material paints**, it seeds Material's own storage from the shared
   key, using Material's `__md_set`. The correct theme therefore applies on the
   first frame — there is no flash to correct afterwards.
2. On every palette change, it records the chosen scheme under the shared key.

The payload is generated from `theme.palette` in `renderers/mkdocs/base.yml`, so
editing the palette list cannot silently break the bridge. The key is deliberately
not namespaced by path: renaming the repository or moving a book must not cost a
reader their preference.

The landing page is not a Material page, so it does not use that mechanism. The
portal template replays the same key as `<html data-scheme="dark">` before paint,
and `portal.css` lets an explicit choice win over the system preference.

This is a second deliberate exception to the no-runtime-JS rule, alongside the
booklet widget: a few lines of inline script, no request, and nothing that
matters if JavaScript is unavailable — the reader simply gets their system
preference, as before.

## What a new book requires

Adding a book is one directory and one registration:

```
books/<id>/
├── book.yaml                 # identity, profiles, tier axis, theme, paths
├── books/gcse-maths/curriculum.yaml           # the chapter plan (source of truth)
├── sources.yaml              # tracked provenance manifest
├── AGENTS.md                 # subject-specific conventions and pitfalls
├── docs/                     # content; assets/ symlinked to the shared tree
├── books/gcse-maths/problems/                 # verified problem banks
└── booklet/                  # formulae and tables data
```

Then:

1. Add the book to `collection.yaml` if it should appear on the landing page.
2. Run `python -m textbook.scaffold` — it generates the docs tree, the per-book
   MkDocs configs, the theme CSS and the curriculum map.
3. Run `python -m textbook.portal` — the landing page picks the card up.
4. CI discovers the new configs automatically; there is no workflow to edit.

A book that uses a different verification oracle (units and significant figures
for physics, rather than symbolic equivalence) declares it in
`book.yaml → oracles`. Adding an oracle is a new module under
`engine/textbook/verify/oracles/`, registered by check kind — the loader,
relations, renderer and CLI are shared.

### Booklets are per qualification and subject

One booklet per book, built from the awarding body's own document, because there
is no shared national booklet: provision differs by subject, qualification and
tier, and it is set for a period and then reviewed. The target set — GCSE
mathematics, physics, chemistry and combined science; A-level mathematics,
further mathematics, physics and chemistry — and the contract every booklet must
meet are in `BOOKLETS.md`. A periodic table or a table of constants is expressed
as `tables`, which the widget already renders.

The data belongs to the book; the widget belongs to the collection, and is loaded
only by books that declare a booklet.

## Build and verify

```bash
uv sync                                  # Python toolchain and the local engine
npm install                              # build-time KaTeX
python -m textbook.scaffold              # docs tree, per-book configs, theme CSS
python -m textbook.booklet               # validate booklet data, emit JSON
python -m textbook.portal                # landing page
python -m textbook.lint                  # voice, style, structure
python -m textbook.verify books/         # verify every problem bank
uv run mkdocs build -f renderers/mkdocs/gcse-maths.higher.yml --strict
uv run mkdocs build -f renderers/mkdocs/gcse-maths.foundation.yml --strict
uv run pytest tests/ -q
test/run.sh                              # figure-hook and tier evaluation
```

## Deliberate limits

- **One MkDocs build per profile, not one site for everything.** Blending the
  books into a single build would remove tier separation for readers who need it,
  and would let one book's error block every other book's deployment.
- **Symlinks, not copies, for shared assets.** A copy would drift; the CI drift
  check would then have to police two truths instead of one.
- **No third-party MkDocs plugins.** `mkdocs-macros-plugin` was evaluated and
  rejected (it aborted a build on a literal `{{ … }}` in prose, which is a real
  hazard in mathematics). MkDocs 2.0 removes the plugin system, so the engine
  stays on plain hooks and a shim.
