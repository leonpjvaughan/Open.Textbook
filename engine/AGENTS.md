# AGENTS.md — the shared engine

The engine is one installable package, `textbook`, under `engine/`. It renders
every book to static HTML, generates the docs tree and the CSS, verifies the
problem banks and builds the landing page. Nothing here knows a subject.

Read the root `AGENTS.md` first. The cross-cutting rules — the chapter formula,
voice, Theming, Repository map, Conventions and Toolchain — still apply. This
file adds what is particular to the engine, and it now owns the **Maths** and
**Hooks** traps that used to sit in the root's `## Watch out for`.

## What lives here

| Path | What it does |
|---|---|
| `engine/textbook/pipeline.py` | **The site.** Renders a book to static HTML: nav, Pagefind search, link checking, sitemap, 404 |
| `engine/textbook/hooks/` | The page hooks, composed in an explicit order |
| `engine/textbook/hooks/maths.py` | Renders `$…$` / `$$…$$` to MathML through KaTeX at build time |
| `engine/textbook/book.py` | Loads `book.yaml` and `collection.yaml`; the scheme tokens |
| `engine/textbook/config.py` | Resolves hook paths from the build's `config.extra` |
| `engine/textbook/scaffold.py` | Generates the docs tree, book CSS, `themes.css`, the curriculum map |
| `engine/textbook/booklet.py` | Validates booklet data, emits JSON and MathML |
| `engine/textbook/portal.py` | The collection landing page |
| `engine/textbook/lint.py` | The voice, style and structure checks |
| `engine/textbook/verify/` | The verifier, its oracle registry (`oracles/`), SymPy boundary and renderer |
| `engine/textbook/plan.py` | The build matrix: book × profile |

## Maths

These are properties of the maths hook and its KaTeX renderer, so they live here. Content authors meet them through
`books/AGENTS.md`.

- Markdown escapes `<`, `>` and `&` inside `$…$`; the maths hook unescapes before
  KaTeX. If you bypass the hook you will see `&lt;` and broken maths.
- KaTeX runs with `throwOnError`, so a bad expression becomes a `.math-error`
  span and the build **still exits 0**. Always grep for `math-error` after a
  build; the exit code does not catch it.
- Prefer `\pounds` or write currency outside maths; a raw `£` in an equation is
  a trap. `aligned` works; `latex2mathml` does not — do not reintroduce it.

## Hooks

- Never name a hook parameter `html`; it shadows the `html` module.
- Hooks resolve every path from the build's `config.extra` block, through
  `textbook/config.py` — never from `__file__`. A hook that guesses its own
  location works for one book and silently breaks for the next.
- Hook order is declared once, in `engine/textbook/hooks/__init__.py`, and the
  pipeline reads the same order from `pipeline.MARKDOWN_HOOKS`. Adding a hook
  means adding it to both, and the tests pin the two together.
- Figure slugs are auto-discovered from `books/<id>/docs/assets/figures/*.js`.
  The filename must equal the slug, and an unknown `:::figure` slug fails the
  build.
- Use the `:::figure` directive, not raw `<maths-figure>` HTML: only the
  directive triggers the per-page loader injection. Modules export `mount(el)`.

## Rules local to the engine

- **One renderer.** `pipeline.py` is the site. There is no MkDocs and no plugin
  system, so a change to the shell is a change here, not a new plugin.
- **The engine declares no colour.** Colour lives in the bundles
  (`themes/*.yaml`), applied through `assets/stylesheets/themes.css`; a book
  contributes only its tint. See the root's **Theming**.
- **Generated output is diffed.** `scaffold`, `booklet` and `portal` produce
  committed files; `scripts/check.sh` regenerates them and fails on a diff.
- **The verifier proves the algebra, not the argument.** Its limits are the
  contract in `PROBLEMS.md`; do not present a proof of method as verified. A
  general solution of a differential equation or recurrence is verified by
  substitution (`checkodesol`, `rsolve`), because the arbitrary constant makes
  its form non-unique.

## Common tasks

- **Adding a hook** — change `hooks/__init__.py` and `pipeline.MARKDOWN_HOOKS`
  together, then add a case to `tests/test_render_hooks.py`.
- **Changing maths rendering** — edit `hooks/maths.py` and
  `engine/textbook/js/katex-render.mjs`; the toolchain test pins the renderer.
- **Changing the page shell** — `engine/textbook/templates/page.html` and
  `engine/textbook/css/`; check both schemes and the reader preferences script.
- **Adding a verification oracle** — a module under
  `engine/textbook/verify/oracles/` and its name in `ORACLE_MODULES`, plus the
  kinds it owns in `KIND_ORACLE`; `tests/test_verify_oracles.py` pins the table.
- **Adding a generated file** — teach `scaffold.py`, then extend
  `python -m textbook.plan --generated` so the drift check covers it.

## Read next

`SHAPE.md` for the repository shape, `PROBLEMS.md` for the verifier contract,
and the root's **Build and verify** and **Toolchain** for the commands and the
preconditions they depend on.
