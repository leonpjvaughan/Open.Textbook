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
| Engine (hooks, pipeline, scaffold, lint, booklet build, verifier, portal) | `engine/src/textbook/` | shared |
| Design system and runtime widgets (CSS, figure loader, booklet widget) | `assets/` | shared |
| Theme bundles: the core themes a reader chooses between | `themes/` | shared |
| Evidence base and primary sources | `research/` | shared, with per-book folders |
| Design exploration (not published) | `research/design/`, `themes/` | shared; bundles are published, the mocks are not |
| Curriculum, chapter plan, tier refs | `books/<id>/curriculum.yaml` | per book |
| Content pages | `books/<id>/docs/` | per book |
| Problem banks | `books/<id>/problems/` | per book |
| Formulae booklet data | `books/<id>/booklet/` | per book |
| Provenance manifest for the curriculum claims | `books/<id>/sources.yaml` | per book |
| Subject tint and per-book style overrides | `books/<id>/docs/assets/stylesheets/` | per book |

```
repo/
├── AGENTS.md                 # global authoring conventions, voice, watch-outs
├── SHAPE.md                  # this file
├── collection.yaml           # collection title and deployment base URL
├── engine/                   # the build, as a uv workspace member
│   ├── pyproject.toml        #   its own package metadata (hatchling)
│   └── src/textbook/         #   the shared engine, in a src layout
├── assets/                   # the shared design system and the runtime widgets
│   └── figures/              #   the kit (compiled) and the shared figure library
│       └── src/              #   the kit's TypeScript source
├── tools/                    # the checks and measurements, as one TypeScript package
├── solvers/                  # the numerical kernels: Rust -> wasm, and the otkd package
│   ├── ot-solve/             #   hand-written kernels, one wasm module per kernel
│   ├── ot-solve-build/       #   the host tool that writes the manifest and the module
│   └── otkd/                 #   the mechanism compiler, a nested uv project
├── research/                 # pedagogy, notes, fetched sources
├── books/<id>/               # one self-contained book
├── scripts/                  # shell entry points; they orchestrate, they do not compute
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

This is a generalisation of an earlier shape: `mkdocs.yml` and
`mkdocs.foundation.yml` were two builds from one source. Now it is
`--book <id> --profile <profile>` in a matrix, and the pipeline reads
`curriculum.yaml` directly.

Two consequences worth knowing:

- Each profile needs its own `site_url`, or canonical links and the sitemap will
  be wrong under a deployment subpath.
- The landing page is a **separate artefact** from the books, so a broken chapter
  in one book cannot take the collection's front door down.

### Shared assets and hooks

- **Shared assets** are declared once, in `scaffold.SHARED_FILES`, and
  **materialised by the build**: `pipeline.copy_assets` copies each one from
  `assets/` to the same path in the output. Nothing in the repository is a
  symlink.

  They used to be symlinked into each book's `docs/assets/`, so a book's tree
  showed which shared files it used. That was MkDocs's requirement — it served
  only `docs_dir` — and the bespoke pipeline reads `assets/` directly, so the
  links became decoration. Decoration that breaks: **git checks a symlink out as
  a small plain file containing its target** wherever `core.symlinks` is false
  (Windows without developer mode, FAT), so a build copied a 36-byte `kit.js`
  holding a path into the site, reported success, and left every figure unable to
  import its scaffolding.

  The shape is the one Hugo calls a directory *mount* and Eleventy calls
  *passthrough copy*: say what is shared, let the tool place it.
- **A shared directory** is declared in `scaffold.SHARED_DIRS` and copied
  recursively. The figure kit is one: `kit.js` is a barrel over `kit/*.js`, and a
  list of files would have to be edited whenever a layer is added — a layer missed
  that way breaks every figure in every book at runtime, where the build's link
  check cannot see it.
- **The shared figure library is `assets/figures/`.** A figure module there is
  mountable by its filename in **every** book, because a figure is mounted by bare
  slug and the build copies the library flat into each book's figures directory. A
  book may not define its own module with the same name; the build fails and says
  so. This is for a **generic tool** — the same set diagram, the same number line,
  the same slope field — not for a topic two syllabi treat differently, which is
  usually two figures rather than one.
- **Shared hooks** live in `engine/src/textbook/hooks/` and are composed in one
  place. `engine/src/textbook/hooks/__init__.py` states the order, and the pipeline
  reads the same order from `pipeline.MARKDOWN_HOOKS`; a test pins the two
  together.

## The landing page

`engine/src/textbook/portal.py` generates `site/index.html` from every
`books/*/book.yaml` plus `collection.yaml`. The template is
`engine/src/textbook/templates/portal.html`, and the generated page is covered by
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

## Theme bundles

A **bundle** is the reading experience: a complete light and dark palette plus its
typography. A **book** contributes only its subject identity. They multiply:
four bundles times every book times two schemes, from two independent pieces of
data.

```
themes/<id>.yaml          core theme: --tb-* per scheme, plus fonts, plus `fixed:`
books/<id>/book.yaml      subject tint: accent (and any surface it wants moved)
        │
        ▼
assets/stylesheets/themes.css     generated: every bundle, once, for the collection
books/<id>/docs/assets/stylesheets/book.css   generated: the book's tint
```

### Why bundles are chosen by the reader, not by the subject

This is the decision that makes the model work. A reader picks a bundle once and
it applies to **every** book, so moving from mathematics to physics never moves
the theme. If theming were per subject, a reader taking three subjects would get
three reading experiences and a context switch each time — the opposite of what
theming is for.

So the subject's contribution is deliberately small: a hue, and optionally a
surface or two. Enough to know which book you are in. Not enough to relearn.

### How they compose

A bundle declares each token as a passthrough with its own value as the fallback:

```css
--tb-accent: var(--tb-book-accent, #6ea8d8);
```

and the book supplies `--tb-book-*` values, one set per scheme. There is no
specificity contest and no build step: the bundle owns the design, the subject
keeps its identity, and everything resolves in CSS.

A bundle can **refuse** a token by listing it under `fixed:`. The `clean` bundle
does exactly that for the accent, so every book is monochrome there — the point of
a clean group is that a reader who wants no colour wants it everywhere.

A bundle is not obliged to consume a subject value either; refusing one is a
design position, not a failure.

### Typography belongs to the bundle

Fonts are part of the reading experience, so they travel with the bundle rather
than with the subject — the same reasoning as above, and the reason the earlier
worry about subject-specific fonts does not apply here. Sizes are shared, so a
bundle changes the voice without changing the reading measure.

### The contrast invariant

Because a bundle and a subject multiply, a subject accent that is comfortable on
one bundle's paper may be unreadable on another's. That is not left to review:
`tests/test_themes.py` computes the WCAG ratio for every bundle × book × scheme
and fails below ink 7:1, link 4.5:1, accent 4.5:1, and `accent_ink` 4.5:1 on the
accent (text knocked out of the accent uses its own token, not the paper).

It earned its place immediately. It caught catppuccin-latte's own link colour at
4.34:1 on its own paper and gruvbox's at 4.40:1 — both stock Omarchy palettes,
both just under the threshold, neither visible by looking. Both are darkened in
the bundle with a comment saying so.

### The cascade

| Layer | File | Owner |
|---|---|---|
| Plumbing: the Material mapping, components, fonts as tokens | `assets/stylesheets/extra.css` | shared, **defines no colour** |
| Bundles: every `--tb-*` per scheme, per bundle | `assets/stylesheets/themes.css` | generated from `themes/*.yaml` |
| Subject tint: `--tb-book-*` per scheme | `books/<id>/docs/assets/stylesheets/book.css` | generated from `book.yaml → theme` |
| A book's own component changes | `books/<id>/docs/assets/stylesheets/book-local.css` | authored, empty by default |

The rule that keeps this honest: **a bundle is a palette and a typography, and
nothing else.** Anything structural belongs in `extra.css`, where every book
benefits; anything genuinely one book's own belongs in its `book-local.css`.

Adding a bundle is one file in `themes/` plus a line in `collection.yaml`, and it
is covered by the drift check. No book is rebuilt to gain a theme.

## Theme preference

Both reader preferences are stored once, origin-wide, and shared by every book and
by the landing page:

| Key | Values | Meaning |
|---|---|---|
| `textbooks:scheme` | `default`, `slate` | light or dark |
| `textbooks:theme` | a bundle id | which reading experience |

The pipeline applies both before the first paint: an inline script at the top of
`engine/src/textbook/templates/page.html` reads the two keys and sets `data-theme` and
`data-md-color-scheme` on the document, so the right bundle and scheme paint on
the first frame with no flash. The landing page carries the same script (see
`engine/src/textbook/templates/portal.html`), and the reader's Settings control
(`assets/settings/settings.js`) is the only writer. `engine/src/textbook/hooks/prefs.py`
owns the key names.

Neither key is namespaced by path: renaming the repository or moving a book must
not cost a reader their preferences. The bundle menu can be withdrawn with
`theme_selector: false` in `collection.yaml` once a default is settled on, without
affecting the stored preference.

This is a deliberate exception to the no-runtime-JS rule, alongside the booklet
widget: a few lines of inline script, no request, and nothing that matters if
JavaScript is unavailable — without it a reader gets the default bundle in their
system's scheme, which is a perfectly good book.

## What a new book requires

Adding a book is one directory and one registration:

```
books/<id>/
├── book.yaml                 # identity, profiles, tier axis, theme, paths
├── curriculum.yaml           # the chapter plan (source of truth)
├── sources.yaml              # tracked provenance manifest
├── AGENTS.md                 # subject-specific conventions and pitfalls
├── docs/                     # content; shared assets come from assets/ at build time
├── problems/                 # verified problem banks
└── booklet/                  # formulae and tables data
```

Then:

1. Add the book to `collection.yaml` if it should appear on the landing page.
2. Run `python -m textbook.scaffold` — it generates the docs tree, themes.css,
   the book's tint and the curriculum map.
3. Run `python -m textbook.portal` — the landing page picks the card up.
4. CI discovers the new build automatically; there is no workflow to edit.

### A book declares its own shape

Two declarations are a book's own, and the engine reads them rather than assuming a
course:

- **`book.yaml → section_pages`** — which pages a section has, by their reader-facing
  name (`learn`, `practise-with-help`, `practise`). The default is all three. The
  scaffold, the navigation, the URL shaper and `textbook.lint` all read this one
  property, so a book cannot be given a page its own `book.yaml` says it does not
  have — and a book with no `Practise` page needs no problem bank and no exemption.
- **`curriculum.yaml → sections[].deeper`** — an optional list of `{slug, title}`
  depth pages, each at `Chapter N/Section M/Deeper/<slug>/`, listed as a child of its
  section and reachable with `:::deeper <slug>`, which expands to one link and
  nothing else. The scaffold writes no stub for one: a depth page exists because
  somebody wrote it.

A book's `docs/assets/data/` and `docs/assets/images/` are copied into the build.
Data is not a figure — every file in `figures/` must export `mount()` — and an image
cannot be one either, because a figure follows the reader's bundle and a photograph
cannot.

### A reference work is not a course

`books/proofs/` and `books/numerical-methods/` are books because that is how the
collection publishes, navigates and themes a body of pages, and for no other
reason. Each declares:

- **no chapters and no strands**, so the scaffold generates no stub pages, no
  glossary and no curriculum map, and every page under `docs/` is authored;
- **no tier axis and no boards**, because a proof belongs to no tier and a class of
  problem to no awarding body;
- **no booklet and no banks**, because nothing here is given to a reader or
  practised by one.

Its `curriculum:` points at a **registry** rather than a chapter plan, and there are
two kinds. `proofs.yaml` lists proofs with the qualifications examined on them, and
is read by the `:::prove` directive as well as by the nav. `map.yaml` lists pages
with a title and a path, and is read only for the nav — a reference work entered by
symptom needs a sidebar, not a syllabus. The engine reads the second as
`Book.pages`.

The reference works are found by the `Reference` qualification rather than by
directory name, so renaming one is a rename. **Several books may declare it.** The
proof registry belongs to exactly one of them — `books.proof_book()` finds the book
that declares `proofs:` — and `tests/test_proofs.py` fails on two.

A book linking into the proof book emits a root-absolute href, `/proofs/<id>/`.
That link is outside the linking book's own build, so `check_links` skips it by
design — the other book's build checks its own links, and `tests/test_proofs.py`
covers what the skip leaves open.

A book that uses a different verification oracle (units and significant figures
for physics, rather than symbolic equivalence) declares it in
`book.yaml → oracles`. Adding an oracle is a new module under
`engine/src/textbook/verify/oracles/`, registered by check kind — the loader,
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
python -m textbook.scaffold              # docs tree, generated CSS, themes.css
python -m textbook.booklet               # validate booklet data, emit JSON
python -m textbook.portal                # landing page
python -m textbook.lint                  # voice, style, structure
python -m textbook.verify books/         # verify every problem bank
while read -r -a b; do uv run python -m textbook.pipeline "${b[@]}"; done \
    < <(uv run python -m textbook.plan --configs)   # both profiles, link-checked
uv run pytest tests/ -q                  # includes the figure-hook and tier evaluation
```

## Deployment and platform targets

The collection is published as **static files** to Cloudflare Workers, served from
the apex of `open-textbook.org` (registered through Cloudflare Registrar, DNS on
Cloudflare). Nothing runs on a server. The intended shape of a book's URL is
`/<qualification>/<subject>/<profile>/` — `gcse/maths/higher/` — so a new
qualification or subject extends the tree rather than inventing a new one.

`DEPLOY.md` is the runbook: the one-time credential and domain setup, how a deploy
happens, and how to check one.

Three consequences shape everything else:

- **The host must allow custom response headers.** Workers does, through a
  `_headers` file in the asset directory, and we ship one: `engine/src/textbook/
  headers.py` is emitted into `site/_headers` for the content security policy
  and the baseline headers. It deliberately sets **no** `Cache-Control`.
  Workers' default for static assets is `Cache-Control: public, max-age=0,
  must-revalidate` with an `ETag`, which already gives us what we need — a deploy
  takes effect immediately and unchanged files come back as `304`. This is also
  what GitHub Pages would not allow: it pins `max-age=600` on every asset, which
  is what makes a service worker unsafe to ship there. What remains for the PWA
  is `sw.js` itself, with its own cache rule.
- **The site is meant to be installable on a phone.** A reader should be able to
  add a book to a home screen and read it offline.
- **The PWA is a deliberate exception to the Tier-0 no-JS rule**, in the same way
  the booklet widget is one. Registered deferred, it must not affect how prose or
  mathematics renders. It belongs in this list rather than arriving later as an
  unexplained regression.

`site/` is assembled by the engine, so the root of the deployment is ours:
`site/index.html`, `site/404.html`, `site/terms/index.html` and
`site/acknowledgements/index.html` come from `textbook.portal`, with one
pipeline build per book profile beside them. A Worker whose static assets are that
directory therefore serves the whole collection from one place, and the service
worker's scope will be the whole site without needing a header at all.

**The bespoke renderer is the site.** `engine/src/textbook/pipeline.py` renders a book
to static HTML — nav, Pagefind search, link checking, a sitemap and a 404 per
profile — and it is the only renderer. It is the one we control: no third-party
theming to be rewritten under us, no plugin system to lose, no licence notice, and
one place to change the shell. It replaced MkDocs in October 2026; see `.agents/todo.md`
item 8 for the migration record.

## Deliberate limits

- **One build per profile, not one site for everything.** Blending the
  books into a single build would remove tier separation for readers who need it,
  and would let one book's error block every other book's deployment.
- **Symlinks, not copies, for shared assets.** A copy would drift; the CI drift
  check would then have to police two truths instead of one.
- **No third-party site-generator plugins.** A template-plugin mechanism was
  evaluated and rejected (it aborted a build on a literal `{{ … }}` in prose,
  which is a real hazard in mathematics), so the engine stays on plain hooks.
