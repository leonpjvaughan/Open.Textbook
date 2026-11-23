# AGENTS.md — the shared engine

`textbook` is one installable package under `engine/src/` — a **src layout**, so the
importable package is not the project directory and a root module cannot shadow it. It is a
uv workspace member with its own `pyproject.toml` (hatchling, `packages = ["src/textbook"]`).
It renders every book to static HTML, generates the docs tree and CSS, verifies the problem
banks and builds the landing page. Nothing here knows a subject.

**The depth-dependent line:** `book.repo_root()` walks up from the working directory for
`collection.yaml`, falling back to `Path(__file__).resolve().parents[3]`. Everything else
resolves through `config.py` or `Path(__file__).parent`.

## What lives here

`pipeline.py` is the site (nav, links, sitemap, 404); `hooks/` holds the page hooks in an
explicit order, `hooks/maths.py` rendering `$…$` to MathML; `book.py` loads the YAML and the
scheme tokens; `config.py` resolves hook paths; `scaffold.py` writes the docs tree, book CSS,
`themes.css` and the curriculum map; `booklet.py`, `portal.py`, `legal.py`, `lint.py` and
`plan.py` do what their names say; `verify/` holds the verifier, the oracle registry and the
SymPy boundary. `search.py` builds the collection's one Pagefind index. `SHAPE.md` has the
full layout.

## Maths

- Markdown escapes `<`, `>` and `&` inside `$…$`; the maths hook unescapes before KaTeX —
  bypass it and maths breaks.
- KaTeX runs with `throwOnError`: a bad expression becomes `.math-error` and the build
  **still exits 0**. Grep for `math-error` after every build.
- Prefer `\pounds` or currency outside maths; a raw `£` in an equation is a trap. `aligned`
  works; `latex2mathml` does not — do not reintroduce it.

## Hooks

- Never name a hook parameter `html`; it shadows the module.
- Resolve paths from `config.extra` through `textbook/config.py`, never `__file__`: a guessed
  location works for one book and silently breaks the next.
- Hook order is declared in `hooks/__init__.py` and read by `pipeline.MARKDOWN_HOOKS`; add a
  hook to both, and the tests pin them together.
- Slugs are auto-discovered from `books/<id>/docs/assets/figures/*.js` **and the shared
  library** `assets/figures/*.js`, copied flat into every book. Filename must equal the slug;
  an unknown `:::figure` slug fails the build. **A book may not reuse a shared module's
  name**: `hooks/figures.py` raises and names both files.
- Use `:::figure`, not raw `<maths-figure>`: only the directive injects the loader. Modules
  export `mount(el)`.

**`:::method-index`** is `hooks/contents.py`'s other marker: the name index of a page
whose entries are `h3`s (*Methods, A to Z*). It emits one `<details>` per initial
letter, the summary the letter and its count, the first letter open, and each name a
link to the `h3` the page already carries — so the closed index is a rail of twenty
chips rather than a wall of names, and a reader on a phone opens a letter instead of
scrolling the list. It is native markup with no script, generated from the page's own
headings, so a method added to the page appears in the index with no second edit. The
markup is styled by `.method-index__*` in `assets/stylesheets/extra.css`; the tests are
`tests/test_reference_books.py`'s two `name_index` cases.

## Rules local to the engine

- **One renderer.** `pipeline.py` is the site; no MkDocs, no plugin system.
- **No colour in the engine.** Bundles apply it through `assets/stylesheets/themes.css`; a
  book contributes only its tint.
- **Generated output is diffed.** `scaffold`, `booklet` and `portal` write committed files;
  `scripts/check.sh` regenerates and fails on a diff.
- **The verifier proves algebra, not argument.** Limits are the contract in `PROBLEMS.md`. A
  general solution of a differential equation or recurrence is verified by substitution
  (`checkodesol`, `rsolve`), because the arbitrary constant makes its form non-unique.

## Common tasks

- **Adding a hook** — change `hooks/__init__.py` and `pipeline.MARKDOWN_HOOKS`, then add a
  case to `tests/test_render_hooks.py`.
- **Maths rendering** — `hooks/maths.py` and `engine/src/textbook/js/katex-render.mjs`; the
  toolchain test pins the renderer.
- **Page shell** — `engine/src/textbook/templates/page.html` and
  `engine/src/textbook/css/`; check both schemes and the preferences script. The two inline
  modules at the foot of it are the phone drawer (filter, chapter level, Escape) and the ToC's
  current section; both are enhancements, and the page must stay whole with scripting off.
- **Verification oracle** — a module under `engine/src/textbook/verify/oracles/`, its name in
  `ORACLE_MODULES`, its kinds in `KIND_ORACLE`; `tests/test_verify_oracles.py` pins the table.
- **Generated file** — teach `scaffold.py`, then extend `python -m textbook.plan --generated`.
