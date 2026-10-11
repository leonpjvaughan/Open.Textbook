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
| Engine (hooks, pipeline, scaffold, lint, booklet build, verifier, portal) | `engine/textbook/` | shared |
| Design system and runtime widgets (CSS, figure loader, booklet widget) | `assets/` | shared |
| Theme bundles: the core themes a reader chooses between | `themes/` | shared |
| Evidence base and primary sources | `research/` | shared, with per-book folders |
| Design exploration (not published) | `research/design/`, `themes/` | shared; bundles are published, the mocks are not |
| Curriculum, chapter plan, tier refs | `books/<id>/books/gcse-maths/curriculum.yaml` | per book |
| Content pages | `books/<id>/docs/` | per book |
| Problem banks | `books/<id>/books/gcse-maths/problems/` | per book |
| Formulae booklet data | `books/<id>/booklet/` | per book |
| Provenance manifest for the curriculum claims | `books/<id>/sources.yaml` | per book |
| Subject tint and per-book style overrides | `books/<id>/docs/assets/stylesheets/` | per book |

```
repo/
├── AGENTS.md                 # global authoring conventions, voice, watch-outs
├── SHAPE.md                  # this file
├── collection.yaml           # collection title and deployment base URL
├── engine/textbook/          # the shared engine (installable package)
├── assets/                   # shared design system and runtime widgets
├── research/                 # pedagogy, notes, fetched sources
├── books/<id>/               # one self-contained book
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

- **Shared assets** reach each book through a symlink from
  `books/<id>/docs/assets/…` into `assets/`. The scaffold creates the symlinks and
  the tests check they resolve; the pipeline copies the shared bytes from
  `assets/` into the build output. Caveat: Git stores the symlink, so a checkout
  needs `core.symlinks` (true on Linux and macOS) and CI must run on a platform
  that honours it.
- **Shared hooks** live in `engine/textbook/hooks/` and are composed in one
  place. `engine/textbook/hooks/__init__.py` states the order, and the pipeline
  reads the same order from `pipeline.MARKDOWN_HOOKS`; a test pins the two
  together.

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
--tb-accent: var(--tb-book-accent, #89b4fa);
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
`engine/textbook/templates/page.html` reads the two keys and sets `data-theme` and
`data-md-color-scheme` on the document, so the right bundle and scheme paint on
the first frame with no flash. The landing page carries the same script (see
`engine/textbook/templates/portal.html`), and the reader's Settings control
(`assets/settings/settings.js`) is the only writer. `engine/textbook/hooks/prefs.py`
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
├── books/gcse-maths/curriculum.yaml           # the chapter plan (source of truth)
├── sources.yaml              # tracked provenance manifest
├── AGENTS.md                 # subject-specific conventions and pitfalls
├── docs/                     # content; assets/ symlinked to the shared tree
├── books/gcse-maths/problems/                 # verified problem banks
└── booklet/                  # formulae and tables data
```

Then:

1. Add the book to `collection.yaml` if it should appear on the landing page.
2. Run `python -m textbook.scaffold` — it generates the docs tree, themes.css,
   the book's tint and the curriculum map.
3. Run `python -m textbook.portal` — the landing page picks the card up.
4. CI discovers the new build automatically; there is no workflow to edit.

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
  `_headers` file in the asset directory, and we ship one: `engine/textbook/
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
`site/index.html` and `site/404.html` come from `textbook.portal`, with one
pipeline build per book profile beside them. A Worker whose static assets are that
directory therefore serves the whole collection from one place, and the service
worker's scope will be the whole site without needing a header at all.

**The bespoke renderer is the site.** `engine/textbook/pipeline.py` renders a book
to static HTML — nav, Pagefind search, link checking, a sitemap and a 404 per
profile — and it is the only renderer. It is the one we control: no third-party
theming to be rewritten under us, no plugin system to lose, no licence notice, and
one place to change the shell. It replaced MkDocs in October 2026; see `todo.md`
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
