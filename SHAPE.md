# Repository shape

Shared engine and design system; per-book curriculum, content, problem banks, and booklets. Authoring rules live in `AGENTS.md`.

## Layout

| Path | Role | Scope |
|---|---|---|
| `engine/src/textbook/` | Pipeline, hooks, scaffold, lint, booklet builder, verifier, portal | shared |
| `assets/` | Shared CSS, figure kit (`assets/figures/src/` → compiled `assets/figures/`), shared figures, booklet/settings/offline runtimes | shared |
| `themes/` | Six light/dark theme bundles (`*.yaml` → generated `assets/stylesheets/themes.css`) | shared |
| `tools/` | TypeScript audit & verification CLI (`tools/src/` → `tools/dist/cli.js`) | shared |
| `solvers/` | Rust → wasm numerical kernels (`ot-solve`, `otkd`) sharing `solvers/ABI.md` | shared |
| `research/` | Pedagogy evidence (`pedagogy.md`), legal basis (`legal/`), fetched primary sources (`sources/`) | shared |
| `books/<id>/` | Self-contained book: `book.yaml`, `curriculum.yaml`, `sources.yaml`, `AGENTS.md`, `docs/`, `problems/`, `booklet/` | per book |
| `scripts/`, `tests/`, `.github/workflows/` | Orchestration scripts, pytest suite, CI matrix | shared |

## Build model

- **One build per book × profile.** Tier filtering strips Higher-only pages and blocks at build time, so `python -m textbook.pipeline --book <id> --profile <profile>` emits each profile under `site/<book>/<profile>/` with its own `site_url`, sitemap, Pagefind index, and 404.
- **Root portal (`python -m textbook.portal`)** generates `site/index.html`, `404.html`, `_headers`, `robots.txt`, `sitemap.xml`, `version.json`, `manifest.webmanifest`, `sw.js`, `terms/`, `acknowledgements/`. Cards group by `book.yaml → qualification` and inherit each book's accent tint.
- **Shared assets are copied at build time** (no symlinks). `scaffold.SHARED_FILES` and `scaffold.SHARED_DIRS` are copied by `pipeline.copy_assets`. `assets/figures/` is the shared figure library — any module there is mountable by bare slug in any book; a book cannot shadow a shared slug.
- **Hooks** live in `engine/src/textbook/hooks/` and run in the order declared in `hooks/__init__.py` / `pipeline.MARKDOWN_HOOKS`.

## Theming

- **Bundles (`themes/<id>.yaml`)** own surfaces, ink, semantic tokens, and typography across every book.
- **Books (`book.yaml → theme`)** contribute only `--tb-book-*` subject tints (composed via `var(--tb-book-accent, fallback)` unless the bundle lists the token under `fixed:`).
- **Cascade:** `assets/stylesheets/extra.css` (structure, zero colours) → `assets/stylesheets/themes.css` (generated from `themes/`) → `book.css` (generated subject tint) → `book-local.css` (authored per-book overrides).
- **Preferences:** origin-wide `localStorage` keys `textbooks:scheme` (`default`|`slate`) and `textbooks:theme` (bundle id), applied pre-paint by `page.html` / `portal.html` and written by `assets/settings/settings.js`.
- **Contrast & surface invariants:** `tests/test_themes.py` checks WCAG + APCA contrast across every bundle × book × scheme plus `code_bg` ΔE separation.

## Adding a book

1. Create `books/<id>/` with `book.yaml`, `curriculum.yaml`, `sources.yaml`, `AGENTS.md`, `docs/`, `problems/`, and (if applicable) `booklet/`.
2. Register `<id>` in `collection.yaml`.
3. Run `python -m textbook.scaffold`, `python -m textbook.booklet`, and `python -m textbook.portal`. CI discovers the new book automatically via `python -m textbook.plan`.

### Book declarations

- `book.yaml → section_pages`: reader-facing page subset (`learn`, `practise-with-help`, `practise`; default all three). Drives scaffold, nav, URLs, and lint.
- `book.yaml → oracles`: verification oracles allowed in this book's banks (`[sympy]` or `[sympy, units]`). New oracles go under `engine/src/textbook/verify/oracles/`.
- `curriculum.yaml → sections[].deeper`: optional `{slug, title}` depth pages at `Chapter N/Section M/Deeper/<slug>/`, linked via `:::deeper <slug>` (never scaffolded).
- `docs/assets/data/` and `docs/assets/images/` are copied verbatim; `docs/assets/figures/` holds `mount()` modules only.
- **Reference works** (`qualification: Reference`, e.g. `proofs`, `numerical-methods`) have no chapters, strands, tiers, boards, banks, or booklets; `curriculum:` points to `proofs.yaml` (read by `:::prove`) or `map.yaml` (nav only). Cross-book links to `/proofs/<id>/` are skipped by single-book `check_links` and verified by `tests/test_proofs.py`.

## Hosting

Static files deployed to Cloudflare Workers (`wrangler.jsonc`) at `https://open-textbook.org/`. Security headers ship in generated `site/_headers` (no `Cache-Control`; Workers' `max-age=0, must-revalidate` + `ETag` ensures instant deploys). PWA (`manifest.webmanifest`, `sw.js`) and booklet/settings runtimes are progressive enhancements; prose and build-time MathML require no JS. See `DEPLOY.md`.
