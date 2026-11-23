# AGENTS.md — the test suite

`tests/` is the pytest suite that keeps the engine, the banks, the collection shape and the
generated files honest. It is what CI runs. The root's **Build and verify**, **Conventions**
and **Toolchain** still apply; this file adds what is particular.

## What lives here

- **Engine** — `test_pipeline.py`, `test_render_hooks.py`, `test_markers.py`,
  `test_frontmatter.py`, `test_plan.py`, `test_maths_escapes.py`, `test_lint.py`.
- **Content and shape** — `test_content_hygiene.py`, `test_content_contracts.py` (Review
  answers, the fade, practice size, the warm-up gate, the front block, figure guidance and
  silent maths, each with a recorded debt), `test_problem_bank.py`, `test_collection.py`,
  `test_home_page.py`, `test_proofs.py`, `test_proof_maths.py`.
- **Figures** — `test_figures.py` (the module contract: an accessible name, no colour
  literal, no runtime LaTeX, `show:` on every slider) and `test_figure_browser.py` (the same
  in a real browser across all six bundles, and the phone-width audit).
- **Verification oracles** — `test_verify_algebra.py`, `test_verify_oracles.py`,
  `test_verify_coverage.py`, `test_verify_units.py`, `test_verify_statistics.py`.
- **Layouts and cascade** — `test_layout_contract.py` (the layout contract, parsed with
  tinycss2 by `layout_contract.py`, with one bad file per rule in `fixtures/layouts/`) and
  `test_cascade_layers.py` (the layer order and every sheet inside its layer).
- **Platform** — `test_themes.py`, `test_pwa.py`, `test_hashed_assets.py`,
  `test_offline_browser.py`, `test_mobile.py`, `test_motion.py`, `test_prefs.py`,
  `test_settings.py`, `test_no_javascript.py`, `test_print.py`, `test_backgrounds.py`,
  `test_colophon.py`, `test_deploy.py`, `test_release.py`.
- **Where the reader is** — `test_navigation_state.py` pins the markup, the paint of the
  current-section mark, the progress line's feature gate and reduced-motion rule, and the
  drawer's filter and Escape handling; `test_navigation_browser.py` measures the ToC's
  `aria-current`, the line's 2px and its unchanged masthead, and the drawer at 390, in both
  schemes.
- **Preconditions** — `test_toolchain.py` fails loudly when Node or `node_modules` is
  missing, rather than letting the maths degrade to `.math-error`.
- **This context map** — `test_agent_context.py`.
- **Shared plumbing** — `conftest.py` holds the fixtures (per-test state): `write` writes a
  file into `tmp_path`, making parent directories, and returns the path. `support.py` holds
  the plain functions a test imports — `problem_record`, which builds a bank record, and
  `call_expressions`, which lists the `name(...)` calls in a JavaScript module by balancing
  parentheses and skipping string literals. Import it as `from support import ...`; `tests/`
  is not a package and pytest puts this directory on the path.

A test marked `browser` is deselected by default (`addopts` in `pyproject.toml`): measuring
every figure under all six bundles takes about twelve minutes. **CI runs the substance of
them** in `scripts/preview-themes.sh` — the kit's contract, the contrast audit, the phone
audit and `tools offline` — so a browser-only defect still fails the gate. Run them by hand
with `uv run python -m pytest -m browser`.

## Rules local to the tests

- **Use `repo_root()`** from `textbook.book` for the repository root. Never guess it from
  `__file__`; the engine must work for every book.
- **Do not write into the repository.** Use `tmp_path` for anything a test creates.
- **A test pins the two halves of a pair.** Hook order is in both `hooks/__init__.py` and
  `pipeline.MARKDOWN_HOOKS`; generated files are in both the generator and the committed
  bytes. When you change one, the test is what fails if you forget the other.
- **The suite proves the mathematics, not the method.** `test_problem_bank.py` checks the
  SymPy oracle; a correct answer by another route still passes.
- **Keep the map honest.** `test_agent_context.py` fails when a path named in the root's
  routing table or repository map does not exist, or when a top-level directory is missing
  from the map. Update the map in the same change.
- **A helper is defined once.** A builder two files both need is a fixture in `conftest.py`
  when it takes `tmp_path`, and a plain function in `support.py` when it is pure; two copies
  drift. Two near-misses stay apart:
  `test_figures.figure_colour_literals` reads JavaScript (a named colour counts only where a
  colour value belongs) and `test_themes.colour_literals` reads a stylesheet or a Python file
  (a CSS named colour, comments stripped) — different patterns, different answers on the same
  text. `test_pwa.function_body` is not a third copy: it extracts a named top-level function
  with an assertion that it exists, and balances nothing.
- **Adding a test** — put it in the file that owns the behaviour; keep the module docstring
  in the house register (what the test protects and why). Load the `verify-textbook-change`
  skill for a book change.

## Common tasks

- **Everything** — `uv run pytest tests/ -q`, or `scripts/check.sh` for the whole gate.
- **The browser sweep** — `uv run python -m pytest -m browser`.
