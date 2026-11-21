# AGENTS.md — the shared engine

`textbook` is one installable package under `engine/src/` — a **src layout**, so
the importable package is not the project directory and a root module cannot
shadow it. It is a uv workspace member with its own `pyproject.toml` (hatchling,
`packages = ["src/textbook"]`). It renders every book to static HTML, generates
the docs tree and CSS, verifies the problem banks and builds the landing page.
Nothing here knows a subject.

**The depth-dependent line:** `book.repo_root()` walks up from the working
directory for `collection.yaml`, falling back to
`Path(__file__).resolve().parents[3]`. Everything else resolves through
`config.py` or `Path(__file__).parent`.

Read the root `AGENTS.md` first; this file owns the **Maths** and **Hooks** traps.

## What lives here

| Path | What it does |
|---|---|
| `engine/src/textbook/pipeline.py` | **The site**: nav, Pagefind, links, sitemap, 404 |
| `engine/src/textbook/hooks/` | The page hooks, in an explicit order |
| `engine/src/textbook/hooks/maths.py` | `$…$` / `$$…$$` to MathML via KaTeX at build time |
| `engine/src/textbook/book.py` | Loads `book.yaml`, `collection.yaml`; scheme tokens |
| `engine/src/textbook/config.py` | Resolves hook paths from `config.extra` |
| `engine/src/textbook/scaffold.py` | Docs tree, book CSS, `themes.css`, curriculum map |
| `engine/src/textbook/legal.py` | Disclaimer, terms, compiled acknowledgements |
| `engine/src/textbook/booklet.py` | Validates booklet data; emits JSON and MathML |
| `engine/src/textbook/portal.py` | Collection landing page |
| `engine/src/textbook/lint.py` | Voice, style, structure checks |
| `engine/src/textbook/verify/` | Verifier, oracle registry (`oracles/`), SymPy boundary, renderer |
| `engine/src/textbook/plan.py` | Build matrix: book × profile |

## Maths

- Markdown escapes `<`, `>` and `&` inside `$…$`; the maths hook unescapes before
  KaTeX — bypass it and maths breaks.
- KaTeX runs with `throwOnError`: a bad expression becomes `.math-error` and the
  build **still exits 0**. Grep for `math-error` after every build.
- Prefer `\pounds` or currency outside maths; a raw `£` in an equation is a trap.
  `aligned` works; `latex2mathml` does not — do not reintroduce it.

## Hooks

- Never name a hook parameter `html`; it shadows the module.
- Resolve paths from `config.extra` through `textbook/config.py`, never
  `__file__`: a guessed location works for one book and silently breaks the next.
- Hook order is declared in `hooks/__init__.py` and read by
  `pipeline.MARKDOWN_HOOKS`; add a hook to both, and the tests pin them together.
- Slugs are auto-discovered from `books/<id>/docs/assets/figures/*.js` **and the
  shared library** `assets/figures/*.js`, copied flat into every book. Filename
  must equal the slug; an unknown `:::figure` slug fails the build. **A book may
  not reuse a shared module's name**: two mounts for one slug would depend on
  directory order, so `hooks/figures.py` raises and names both files.
- Use `:::figure`, not raw `<maths-figure>`: only the directive injects the
  loader. Modules export `mount(el)`.

## Rules local to the engine

- **One renderer.** `pipeline.py` is the site; no MkDocs, no plugin system.
- **No colour in the engine.** Bundles (`themes/*.yaml`) apply it through
  `assets/stylesheets/themes.css`; a book contributes only its tint.
- **Generated output is diffed.** `scaffold`, `booklet` and `portal` write
  committed files; `scripts/check.sh` regenerates and fails on a diff.
- **The verifier proves algebra, not argument.** Limits are the contract in
  `PROBLEMS.md`; never present a proof of method as verified. A general solution
  of a differential equation or recurrence is verified by substitution
  (`checkodesol`, `rsolve`), because the arbitrary constant makes its form
  non-unique.

## Common tasks

- **Adding a hook** — change `hooks/__init__.py` and
  `pipeline.MARKDOWN_HOOKS`, then add a case to `tests/test_render_hooks.py`.
- **Maths rendering** — `hooks/maths.py` and
  `engine/src/textbook/js/katex-render.mjs`; the toolchain test pins the renderer.
- **Page shell** — `engine/src/textbook/templates/page.html` and
  `engine/src/textbook/css/`; check both schemes and the preferences script.
- **Verification oracle** — a module under
  `engine/src/textbook/verify/oracles/`, its name in `ORACLE_MODULES`, its kinds
  in `KIND_ORACLE`; `tests/test_verify_oracles.py` pins the table.
- **Generated file** — teach `scaffold.py`, then extend
  `python -m textbook.plan --generated`.

## Read next

`SHAPE.md`, `PROBLEMS.md`, and the root's **Build and verify**.
