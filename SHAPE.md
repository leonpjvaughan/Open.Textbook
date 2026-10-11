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

**Today every book uses the house theme.** The structure is deliberately open to
per-book themes, so that a decision to differentiate them later is a data change
rather than a refactor. The cascade is:

1. `assets/stylesheets/extra.css` — the **design system**. Every colour,
   measure and palette entry is a custom property (`--tb-*`), plus the mapping
   onto Material's `--md-*` variables. This is the only file that sets house
   defaults, and it is shared by every book.
2. `books/<id>/docs/assets/stylesheets/book.css` — **generated** from
   `book.yaml → theme:` by the scaffold. It overrides the `--tb-*` tokens only.
   Do not hand-edit it; edit `book.yaml`.
3. `books/<id>/docs/assets/stylesheets/book-local.css` — **authored**, loaded
   last, empty by default. The escape hatch for component-level changes that a
   book genuinely needs (a diagram style, a subject-specific block). Keep it
   small: a book should be recognisable, not a different design system.
4. The portal card reads the same `theme.accent`, so a book's identity is
   consistent from the front door inwards.

Token names are subject-neutral (`--tb-paper`, `--tb-accent`, `--tb-fig-warn`),
because the same sheet now serves physics and A-level as well as GCSE.

The rule this protects: **a per-book theme must be expressible as token values.**
Anything that needs new structure belongs in the shared design system, where
every book benefits from it.

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
