# Engine review — `engine/src/textbook/`

A review of the bespoke renderer and its supporting modules, against the criteria
in the brief: correctness and fragility, duplicated or divergent logic, silent
failure, untested behaviour, path and config resolution, and scale. **Nothing was
changed.** Every finding cites a file and line I read, and the two live defects
are reproduced from the committed `site/` output.

Evidence baseline: `uv run python -m pytest tests/ -q` → **3724 passed, 7
deselected, 1 warning in 145s**, so every finding below is latent — none of them
is an existing test failure, which is itself part of the point. A full
`gcse-maths/higher` build was timed at 24.6s for 458 pages.
`scripts/check.sh` was not run (per the brief).

## Count by severity

| Severity | Count |
|---|---|
| Blocking | 2 |
| Worth doing | 10 |
| Taste | 9 |
| **Total** | **21** |

## The three most significant

1. **Every Foundation page publishes a canonical URL pointing at the Higher
   book, and every Foundation sitemap lists the Higher URLs.**
   `pipeline.canonical_url` (`engine/src/textbook/pipeline.py:447-453`) and
   `pipeline.sitemap` (`:458-468`) both hardcode `book.default_profile.id`
   instead of the profile being built. Measured on the committed output: 335 of
   336 pages in `site/gcse-maths/foundation/` and 130 of 131 in
   `site/gcse-physics/foundation/` carry `rel="canonical"` to `/higher/`, and all
   130 `<loc>` entries of `site/gcse-physics/foundation/sitemap.xml` point at
   `/higher/`. This contradicts `SHAPE.md` ("Each profile needs its own
   `site_url`, or canonical links and the sitemap will be wrong"), and the test
   that was supposed to catch it asserts the implementation
   (`tests/test_deploy.py:264-269` compares `canonical_url(book, "")` with
   `scaffold.site_url(book, default.id)` — both use the default, so it passes).

2. **A `--chapter` build checks no links at all, while reporting `broken 0`.**
   `build` passes `scope=f"Chapter {chapter}"` (`pipeline.py:709`, `:766` — a
   *source* path prefix), but `check_links` compares it against slugged output
   paths (`pipeline.py:645`: `candidate.startswith(f"{scope}/")`, where
   `candidate` derives from `RenderedPage.output` → `chapter-1/...`). No candidate
   ever starts with `Chapter 1/`, so every internal link is skipped. Reproduced:
   with a genuinely broken in-chapter link, `scope="Chapter 1"` returns `[]` and
   `scope="chapter-1"` returns both the good and the broken link.
   `tests/test_pipeline.py:334-338` passes the *slug* form, so the test pins the
   function's contract and never exercises the caller.

3. **The tier axis is driven by a literal profile id in one place and the
   declared `tier_filter` in another — the third "same fact in two places".**
   `pipeline.py:689` (`include_higher = profile != "foundation"`) and
   `hooks/tier.py:51,63` compare the *id* to `"foundation"`, while
   `book.yaml` declares `tier_filter: foundation`/`higher` (`book.py:81,89`),
   `config.profile` reads the field (`config.py:54`), and
   `tests/test_colophon.py:45` already uses the field. Rename the Foundation
   profile, or add a book whose id is not `foundation`, and Higher-only pages
   ship to Foundation readers with no error.

---

## Blocking

### B1. Canonical and sitemap ignore the profile being built

- **Where:** `engine/src/textbook/pipeline.py:414` (the `canonical=` argument),
  `:447-453` (`canonical_url`), `:458-468` (`sitemap`), called at `:758`.
- **Wrong:** both write `book.deploy_path(book.default_profile.id)`. The profile
  that is actually building is available (`config["extra"]["tier_profile"]`,
  `pipeline.build`'s `profile` local) and is never passed.
- **How it fails:** the committed output shows it: every non-default profile
  declares the default profile as its canonical, and its sitemap advertises the
  default profile's URLs. For `gcse-maths` the default is `higher`
  (`books/gcse-maths/book.yaml:24`), so the Foundation book — 335 pages of
  different content — tells a crawler that the Higher book is the original and
  the Foundation URL is a duplicate.
- **Impact:** the Foundation editions can be dropped from search results, which
  is the reader-facing half of a two-tier book. It is live in the current
  deployment (`site/`), not a future risk.
- **Smallest remediation:** give `canonical_url` and `sitemap` the profile id
  (`canonical_url(book, profile, url)`, `sitemap(book, profile, pages)`) and pass
  `profile` from `render_page`/`build`. Then fix
  `tests/test_deploy.py:264` to iterate over *every* profile and compare each
  build's canonical with that profile's `site_url`, which is what its docstring
  already claims.

### B2. The subset build's link check is a no-op

- **Where:** `engine/src/textbook/pipeline.py:709` (`subset = f"Chapter {chapter}"`),
  `:645` (the scope comparison), `:766` (`scope=subset`).
- **Wrong:** the scope is in source form (`Chapter 1`) and the candidates are in
  URL form (`chapter-1/…`), so the guard `not candidate.startswith(f"{scope}/")`
  is true for every candidate and each is `continue`d.
- **How it fails:** reproduced directly — a page with a good link and a broken
  link, called with `scope="Chapter 1"`, returns `[]`; with `scope="chapter-1"`
  it returns both. `python -m textbook.pipeline --chapter N` (documented in the
  module docstring as "a subset, for fast checks") therefore prints `broken 0`
  whatever the links say.
- **Impact:** the fast-check workflow and `--serve` lose link checking entirely;
  the repository rule that "a check that cannot fail is not a check" is violated
  by a check that reports success. `tests/test_pipeline.py:357` asserts
  `subset.ok`, which is now trivially true.
- **Smallest remediation:** pass the slugged prefix —
  `scope=url_for(f"Chapter {chapter}/index.md").rstrip("/")` — or, better, make
  `check_links` take the *set of built page URLs* rather than a prefix string.
  Add the negative case to `tests/test_pipeline.py`: build a subset of a fixture
  containing a broken link and assert it is reported.

---

## Worth doing

### W1. Profile behaviour keyed on the literal id `"foundation"`

- **Where:** `engine/src/textbook/pipeline.py:689`; `engine/src/textbook/hooks/tier.py:51`
  and `:63`.
- **Wrong:** the engine's own declared mechanism is `Profile.tier_filter`
  (`book.py:81-89`), read by `config.profile` (`config.py:54`) and used by
  `tests/test_colophon.py:45`; but the two places that actually change behaviour
  compare the profile *id*. For `gcse-maths` and `gcse-physics` the id happens to
  equal the filter, so nothing is visibly wrong today — this is exactly the shape
  of the two bugs the repository already recorded (a chain or a value stated
  twice).
- **How it fails:** a new book with `id: core` / `tier_filter: foundation`, or a
  rename of `foundation`, silently includes every Higher-only section in the
  Foundation build and never strips `<!-- tier:h -->` blocks. No test fails,
  because the tests use the same ids.
- **Impact:** the wrong tier's content is published, which is a correctness and
  inclusion failure, not cosmetics.
- **Smallest remediation:** one helper, e.g.
  `def include_higher(book, profile_id): return book.profile(profile_id).tier_filter != "foundation"`,
  used by `build` and by `hooks/tier.py`, and a test that drives it with a profile
  whose id differs from its filter.

### W2. The maths hook never checks the renderer returned one result per item

- **Where:** `engine/src/textbook/hooks/maths.py:82-84`.
- **Wrong:** `rendered = render(items)` is iterated with `enumerate` and each
  placeholder is replaced, with no comparison of lengths. Reproduced: forcing
  `render` to return one result for two items leaves the literal
  `\x00MATH1\x00` in the returned HTML.
- **How it fails:** the current `katex-render.mjs` always emits exactly
  `items.map(...)`, so this is latent — but it becomes reachable the moment the
  protocol emits a progress line, a partial write, or a second response shape,
  and the failure is invisible: not a `.math-error`, so the gate's grep misses
  it, and not a broken link, so `check_links` misses it. A NUL-delimited token
  ships to readers.
- **Impact:** silent corruption of a page's mathematics route, with no signal to
  the build or the gate.
- **Smallest remediation:** after `render`, if `len(rendered) != len(items)`,
  log the mismatch and fall back to error spans (as the exception path already
  does at `:55-57`). Related: the persistent process at `:33-43` has **no
  timeout** — `booklet.render_mathml` uses `timeout=60` (`booklet.py:36-43`) for
  the same renderer — so a hung `node` hangs the build rather than failing it.

### W3. `kind: all` with no sub-checks verifies nothing

- **Where:** `engine/src/textbook/verify/oracles/sympy.py:15-18` (`for sub in check.get("checks", [])`).
- **Wrong:** an empty or absent `checks` list produces no error and no warning.
  Reproduced: `verify_check({"kind": "all"}, …)` returns `errors == []`. The
  units oracle guards the identical case explicitly — `check_structured`
  (`oracles/units.py:1009-1025`) errors with *"a check that asserts nothing is not
  a check"*.
- **How it fails:** a record with `check: {kind: all}` and an `answer_text` passes
  the verifier (the `_verify_renders` guard in `verify.py:180-188` is satisfied by
  the answer text) while asserting nothing about the mathematics.
- **Impact:** the "answers are checked by a computer" claim (`scaffold.colophon_page`)
  is false for that record. No bank currently has one — verified by walking every
  `books/*/problems/*.yaml` — so this is latent.
- **Smallest remediation:** the same guard as `check_structured`:
  `if not check.get("checks"): report.errors.append(...)`, plus a
  `test_verify_oracles.py` case.

### W4. The verifier raises on a malformed record instead of returning a Report

- **Where:** `engine/src/textbook/verify/verify.py:9-11` states the contract
  ("It returns a report rather than raising, so the caller decides"); broken by
  `oracles/sympy.py:21` (`check_evaluate`), `:225` (`check_rounded`), `:251`
  (`check_between`), `:400` (`check_compare`) and others that index the check
  dict directly.
- **Wrong / how it fails:** reproduced with five malformed records:

  | record | result |
  |---|---|
  | `{kind: evaluate}` | `KeyError: 'expression'` |
  | `{kind: rounded, value: 1.2}` | `KeyError: 'rounded'` |
  | `{kind: compare, lhs, rhs}` | `KeyError: 'relation'` |
  | `{kind: between, low}` | `KeyError: 'value'` |
  | `{kind: hypothesis, distribution}` | report (guarded) |

  Handlers are inconsistent: some catch `KeyError` around their body
  (`check_distribution`, `check_vector`, …), most do not.
- **Impact:** an author's typo in a bank crashes `python -m textbook.verify` with
  a traceback that names no record id, instead of the per-record report the CLI
  is built to print (`verify/__main__.py:36-43`). A bank is then unusable to the
  person who has to fix it.
- **Smallest remediation:** one `try/except (KeyError, TypeError, ValueError)` in
  `oracles.verify_check` (`oracles/__init__.py:149-167`) that appends
  `f"check: malformed ({err})"` to the report, so every handler inherits the
  contract; or a per-kind required-key table checked before dispatch.

### W5. The linter reads multi-line display maths as prose

- **Where:** `engine/src/textbook/lint.py:31` (`DISPLAY_MATH`), `:44-45` (the regex is
  applied to one line at a time).
- **Wrong:** a `$$ … $$` block spanning lines is never matched, so the LaTeX
  between the delimiters is linted as prose. Reproduced on a real page:
  `books/a-level-maths/docs/Chapter 16/Section 16.5/Walkthrough/index.md:148-150`
  is reported as `mechanics:missing-space` for the `\,` in
  `\sqrt{3}\,T_2`, and `US_SPELLINGS` flags `\color{red}` as a US spelling —
  mathematics is being told to use British English.
- **How it fails:** `uv run python -m textbook.lint` currently reports
  `mechanics:missing-space: 2`, both LaTeX, and `style:long-line: 38` partly on
  maths-heavy lines. `lint` is deliberately advisory (see below), so the cost is
  the one the linter's own test file warns about: false positives train the author
  to ignore the gate.
- **Impact:** noise that hides real findings, and a class of false positive that
  grows with every multi-line derivation.
- **Smallest remediation:** strip display maths at *text* level before splitting
  into lines, the way `FENCE` already does (`:43`), replacing each match with the
  same number of newlines so line numbers stay right.

### W6. Link fragments are never checked

- **Where:** `engine/src/textbook/pipeline.py:628` (`target.split("#")[0]`).
- **Wrong:** the fragment is discarded, so `<a href="./#the-answer">` is checked
  as `./` and passes whether or not `#the-answer` exists — including an anchor
  that was deleted, or a heading whose slug changed.
- **How it fails:** a reader following a "see below" link lands at the top of the
  page and cannot find the section. Nothing in the pipeline or the tests notices.
- **Impact:** a check that cannot fail, in the one place the engine claims to
  replace `mkdocs build --strict`'s link validation (which also did not check
  fragments). The proof book's own cross-references are the likely consumers.
- **Smallest remediation:** after the path resolves, extract the ids from the
  target file's HTML (`id="…"`) and require the fragment among them; the `built`
  set already holds every output path, so this is a per-target regex over a file
  already being read.

### W7. `--serve` watches the wrong set of files

- **Where:** `engine/src/textbook/pipeline.py:798-807` (`watch_paths`).
- **Wrong:** the watched set is `book.docs.rglob("*.md")`, the shared `assets/`,
  and the engine's `*.py/*.html/*.css`. Missing: `book.curriculum.yaml`,
  `book.booklet`, `book.yaml`, `books/<id>/docs/assets/figures/*.js`,
  `themes/*.yaml` and `collection.yaml` — all of which change what a build
  produces (the nav, the figure modules `copy_assets` copies, the bundle list in
  the before-paint script).
- **How it fails:** a developer using `python -m textbook.pipeline --book X --serve`
  (an advertised mode, and the argument for `watch_paths` existing) edits a figure
  module or `curriculum.yaml`, sees no rebuild, and concludes the change did
  nothing. Once the process was started, `--serve` is silently stale.
- **Impact:** developer-facing only — but it is a documented workflow whose
  central promise ("rebuild when a source changes", `:809`) does not hold.
- **Smallest remediation:** yield `book.curriculum`, `book.root / "book.yaml"`,
  `book.docs / "assets"`, `repo_root()/themes`, and `collection.yaml`; a test can
  assert that a figure module appears in `watch_paths` while `watch_paths` has no
  test today.

### W8. The navigation is re-rendered for every page: 4.9s of a 24.6s build

- **Where:** `engine/src/textbook/pipeline.py:203-236` (`render_nav`), called once per
  page at `:416`.
- **Wrong:** the leaf-URL cache (`leaf_urls`, `:210-216`) is local to one call, so
  the whole 25-chapter nav is slugged and rebuilt for each of the 458 pages. The
  docstring's claim — "precomputes the leaf set once per node, so rendering a
  25-chapter sidebar is linear rather than quadratic" — is true per page, and the
  repetition across pages is the cost.
- **How it fails / impact:** measured on `gcse-maths/higher`:
  `render_nav` over all 458 pages takes **4.9s** of a **24.6s** build (~20%). The
  gate builds seven profiles, so ~35s of the two-minute gate is this. It grows
  with pages × nav size, exactly the shape that "will bite" when a fourth book
  adds chapters.
- **Smallest remediation:** hoist the `leaf_urls` cache to the build (a dict
  passed in), or memoise `render_nav` on `(id(nav), current_url)` — the nav object
  is shared by every page of one build (`:711`).

### W9. `colophon.md` is generated but absent from `plan --generated`

- **Where:** generated by `engine/src/textbook/scaffold.py:81-92` and written
  unconditionally at `:694`; `engine/src/textbook/plan.py:38-52` lists only
  `themes.css`, `CURRICULUM-MAP.md`, `book.css` and `booklet.json`.
- **Wrong:** `engine/AGENTS.md` records the procedure — "**Adding a generated
  file** — teach `scaffold.py`, then extend `python -m textbook.plan --generated`
  so the drift check covers it" — and it was not followed for the colophon (nor
  for `docs/assets/stylesheets/book-local.css`, which is authored-once and
  correctly excluded). `scripts/check.sh:18-39` diffs only that list, while CI
  uses an unfiltered `git diff --exit-code` (`.github/workflows/verify.yml:72-77`).
- **How it fails:** `scripts/check.sh` is documented as "everything CI enforces,
  in one call"; for a book other than `gcse-maths` it is not. Change
  `collection.yaml → licence`, regenerate, commit nothing, and the local gate
  passes while CI fails. `tests/test_colophon.py:32-35` catches staleness only for
  `gcse-maths` (`MATHS` at `:20`).
- **Impact:** a local gate weaker than advertised, on five committed files.
- **Smallest remediation:** append `book.docs / scaffold.COLOPHON_FILE` in
  `plan.generated_paths()`, and make `tests/test_colophon.py` parametrise over
  `discover_books()`.

### W10. The units oracle's docstring is an invalid escape sequence

- **Where:** `engine/src/textbook/verify/oracles/units.py:14` — `$\pi$-based value …`
  in a non-raw docstring.
- **Wrong:** Python emits `SyntaxWarning: invalid escape sequence '\p'` on import.
  It is the only one in the engine (verified by parsing every module under
  `-W error::SyntaxWarning`), and it is the single warning in the whole test run.
- **How it fails:** `python -m textbook.verify` prints the warning to stderr on
  every invocation; a future Python turns it into a `SyntaxError`, and any
  `-W error` run fails today.
- **Impact:** small, but it is a build-blocking landmine on a pinned interpreter
  upgrade, and the fix is one character.
- **Smallest remediation:** `r"""…"""` on the module docstring (or escape it).

---

## Taste

### T1. The page-kind vocabulary lives in three places

`pipeline.py:113-116` maps directory → URL slug (`"Walkthrough" → "learn"`),
`scaffold.py:168-172` maps directory → reader-facing title
(`"Guided problems" → "Practise with help"`), and `scaffold.py:629-633` builds the
same three pages from the reader-facing titles. Adding or renaming a page kind
means editing three files, and the test that comes closest
(`tests/test_pipeline.py:44-56`) pins the slug map alone. A single
`PAGE_KINDS = (("Walkthrough", "Learn", "learn"), …)` in the engine, read by the
scaffold and the URL shaper, is the shape that would make the fourth page kind a
one-line change.

### T2. Two lists of "the shared assets"

`scaffold.SHARED_ASSETS` (`scaffold.py:43-47`) governs the symlinks in a book's
`docs/assets/`; `pipeline.SHARED_CSS` (`pipeline.py:82`) plus the body of
`copy_assets` (`:472-566`) governs what is actually shipped. Nothing ties them
together, so a new shared asset added to one and not the other is a broken
symlink or a missing file. The build's link check catches an asset a page
*references*; it cannot catch one that is only reached at runtime (a stylesheet
imported by another, a font, a worker chunk). A test asserting
`{name for _, name in SHARED_ASSETS}` is a subset of what `copy_assets` promises
would close it.

### T3. The engine declares five colours

`book.py:26-30` defines `HOUSE_ACCENT`, `HOUSE_ACCENT_LIGHT`, `HOUSE_ACCENT_DARK`,
`HOUSE_ACCENT_DARK_SCHEME`, `HOUSE_ACCENT_LIGHT_SCHEME`. `engine/AGENTS.md` says
"The engine declares no colour. Colour lives in the bundles … a book contributes
only its tint". Three of the five (`*_LIGHT`, `*_DARK`, `*_LIGHT_SCHEME`) are
unused — only `HOUSE_ACCENT` and `HOUSE_ACCENT_DARK_SCHEME` are read, at
`book.py:125`. **Escalation:** this contradicts a recorded decision, so I am
arguing with it rather than reporting it as an oversight. The decision's own logic
(“the bundle owns the design, the subject keeps its identity”) argues for the
fallback to be the *bundle's* accent — i.e. `Scheme.accent` should return nothing
and `portal.card` should fall back to a `--tb-*` bundle token — rather than for
the engine to carry a copy of the first book's palette
(`HOUSE_ACCENT == gcse-maths theme.light.accent`, `HOUSE_ACCENT_LIGHT ==
theme.light.accent_light`, `HOUSE_ACCENT_DARK == accent_dark`, verbatim from
`books/gcse-maths/book.yaml:33-40`). Smallest remediation: delete the three unused
constants and move the two that remain into one documented place with a test that
pins them against the bundle registry.

### T4. `scaffold` imports a symbol through a module that only happens to own it

`scaffold.py:22` — `from .config import book_by_id`. `book_by_id` is defined in
`book.py`; `config.py:15` imports it for its own use. Removing that import from
`config` breaks `scaffold` with an `ImportError` at a distance. Import it from
`book`, where it lives.

### T5. The MkDocs compatibility surface is dead and one docstring depends on it

`hooks/__init__.py:36-47` exports `on_files`, `on_page_markdown` and
`on_page_content`; no renderer calls any of them — the pipeline inlines the loop
(`pipeline.py:395-396`) and calls `maths.on_page_content` directly (`:399`).
`tier.on_files` (`hooks/tier.py:50-58`) is reachable only from
`tests/test_render_hooks.py:211,221`. Yet `frontmatter.py:9-13` justifies strict
parsing with "the tier filter depends on it" — the pipeline filters by
`curriculum.yaml`, not by page front matter, so the premise no longer holds.
Either delete the wrappers (and say in `frontmatter.py` what the parser is still
for: the lint report and the pipeline's own `tier:`-in-nav reasoning), or have
the pipeline call them, so the interface that exists is the interface that runs.
Note this is also a *duplicated composition*: the order is one object, but
"run every hook in order" is written twice.

### T6. Two implementations of the same prefix arithmetic

`pipeline.prefix_for` (`pipeline.py:160-163`) and `hooks/figures.root_prefix`
(`hooks/figures.py:33-37`) compute the same `"../" * depth` by different means
(segment count vs `str.count("/") + 1`). They agree for every URL shape `url_for`
produces, and a divergence would be caught by `check_links` (the figure loader's
`src` is checked), so this is taste rather than risk — but one of them should call
the other.

### T7. `SystemExit` and uncaught `ValueError` from library code

`chapter_subset` raises `SystemExit` (`pipeline.py:258`); `booklet.fail` calls
`sys.exit` from inside `validate`/`build` (`booklet.py:29-31`, used at `:48-76`),
so `booklet.build()` can terminate its caller. In the CLI, `main` catches
`FrontMatterError` and `KeyError` (`pipeline.py:877-886`) but not the authoring
`ValueError`s from `figures`, `problems`, `proofs` and `backgrounds` — so an
unknown `:::figure` slug, the exact counterpart of the `FrontMatterError` case,
prints a traceback rather than the log line the code took care to write
(`:878-882`). The build does fail, which is the important half; the diagnostic
half is inconsistent.

### T8. `run_pagefind`'s `False` is not part of `BuildResult.ok`

`pipeline.py:432-444` returns `False` when Pagefind is missing or exits non-zero,
and `:749` stores it in `result.indexed`, which `ok` (`:671`) ignores. There
*is* a guard — `tests/test_pipeline.py:234-239` asserts the module-scoped `subset`
build was indexed — but it indexes a one-chapter build, so a Pagefind failure that
affects only a full book (or only a real profile build) ships a site whose search
box says "Search is unavailable" while the gate is green. If search is a feature,
`ok` should require it, or `build` should fail when Pagefind is present but fails.

### T9. Module-level paths resolved at import time

`pipeline.PAGEFIND` (`:103`), `portal.ROOT/ASSETS/SITE` (`portal.py:50-53`) and
`lint.ROOT` (`lint.py:26`) are computed from `books.repo_root()` at import, which
reads `TEXTBOOK_ROOT` and the cwd. Tests work around this by monkeypatching
(`tests/test_lint.py:37`), which is the tell: a caller
that legitimately wants a different root after import gets the first one. The
`lru_cache`s on `book`, `collection` and `bundles` are explicit about being
process-wide, which is fine and documented; these four are not. Low impact for a
CLI, but it is the same class of path-resolution hazard the hooks were fixed for.

---

## Modules that are clean

Saying so rather than manufacturing a finding:

- **`frontmatter.py`** — small, strict, one rule, and the reason for strictness is
  measured and recorded (six pages that shipped with no tier). Its own docstring's
  premise is the one thing that has drifted (T5); the code is right.
- **`headers.py`** — a constant and a writer, with the three easy-to-get-wrong
  `_headers` rules stated and no logic to be wrong.
- **`backgrounds.py`** — a registry seam with `validate` that fails loudly on an
  unknown id, and `resolve` whose documented precedence (section → chapter →
  default → site) matches the code line for line.
- **`proofs.py`** — every path through `config.extra` with a documented discovery
  fallback, and `beyond_course`'s empty-list rule is stated and tested.
- **`verify/oracles/__init__.py`** — the kind→oracle table is checked against each
  module's own `CHECKS` at load, so a table and an implementation cannot drift;
  this is the pattern the rest of the engine should copy.
- **`verify/render.py`** — one function decides what an answer renders as, shared
  by the renderer and the verifier; the bug it fixed (a record that verified and
  printed nothing) is described in the docstring that guards it.
- **`hooks/_fences.py`** — a correct small parser (fence length, indent, matching
  character) with a stated reason. Note that `lint.py:30` re-implements a weaker
  version of exactly this; `_fences` is the one that should be reused.
- **`themes.py`** — the contrast invariant, its thresholds and the surface mixes
  are each justified against a measurement, and the one place a role could
  silently resolve to nothing (`fig_accent`) is explicitly aliased with a comment
  naming that failure mode.

## Method note

Every file under `engine/src/textbook/**` was read; every claim above was reproduced
either from the committed `site/` output, from a direct call in a Python session,
or from the test suite. The two blocking findings are live in the current
deployment; the rest are latent and are labelled as such, except where a
reproduction shows a check that cannot fail today.
