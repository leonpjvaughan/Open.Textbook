# AGENTS.md — the test suite

`tests/` is the pytest suite that keeps the engine, the banks, the collection
shape and the generated files honest. It is what CI runs, and what a developer
should run before pushing.

Read the root `AGENTS.md` first. The root's **Build and verify**, **Conventions**
and **Toolchain** still apply. This file adds what is particular to the tests.

The older `test/` directory is different: it holds the figure-hook and
tier-profile evaluation, now folded into `tests/test_render_hooks.py`. Its
`README.md` says so.

## What lives here

- **Engine tests** — `test_pipeline.py`, `test_render_hooks.py`,
  `test_markers.py`, `test_frontmatter.py`.
- **Content and shape tests** — `test_content_hygiene.py`,
  `test_problem_bank.py`, `test_collection.py`, `test_figures.py`.
- **Platform tests** — `test_themes.py`, `test_pwa.py`, `test_mobile.py`,
  `test_prefs.py`, `test_settings.py`, `test_no_javascript.py`, `test_print.py`,
  `test_backgrounds.py`, `test_colophon.py`, `test_deploy.py`, `test_release.py`.
- **Preconditions** — `test_toolchain.py` fails loudly when Node or
  `node_modules` is missing, rather than letting the maths degrade to
  `.math-error`.
- **This context map** — `test_agent_context.py`.

## Rules local to the tests

- **Use `repo_root()`** from `textbook.book` for the repository root. Never
  guess it from `__file__`; the engine must work for every book.
- **Do not write into the repository.** Use `tmp_path` for anything a test
  creates.
- **A test pins the two halves of a pair.** Hook order is in both
  `hooks/__init__.py` and `pipeline.MARKDOWN_HOOKS`; generated files are in both
  the generator and the committed bytes. When you change one, the test is what
  fails if you forget the other.
- **The suite proves the mathematics, not the method.** `test_problem_bank.py`
  checks the SymPy oracle; a correct answer by another route still passes.
- **Keep the map honest.** `test_agent_context.py` fails when a path named in
  the root's routing table or repository map does not exist, or when a top-level
  directory is missing from the map. Update the map in the same change.

## Common tasks

- **Running everything** — `uv run pytest tests/ -q`, or `scripts/check.sh` for
  the whole gate.
- **Adding a test** — put it in the file that owns the behaviour; keep the
  module docstring in the house register (what the test protects and why).
- **Testing a book** — load the `verify-textbook-change` skill.

## Read next

`scripts/AGENTS.md` for what `check.sh` runs, and the root's **Build and
verify** for the commands.
