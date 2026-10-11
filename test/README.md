# `test/` — theme preview

Two design questions had to be answered before authoring the vertical slice:

1. **How should a figure be embedded**, so that a parameter can be manipulated
   without breaking portability to the other renderers?
2. **How should Foundation vs Higher be delivered** — one site with a toggle, or
   two sites built from one source?

Both are settled, and the evaluation that settled them has moved out of this
directory. The fixture books, their MkDocs configurations and `run.sh` are gone:
the pipeline uses the same hook chain (`MARKDOWN_HOOKS = (tier, toc, figures,
problems)` in `engine/textbook/pipeline.py`), so the behaviour is now pinned
against the hooks themselves, in pytest, where it runs as part of
`scripts/check.sh`.

```
tests/test_render_hooks.py    # figure hook + tier strategies (the old 24 assertions)
tests/test_figures.py         # every figure carries an accessible name and no literal colour
tests/test_pipeline.py        # the renderer's last mile: URLs, nav, links, search, the shell
```

## Result

```
pass: 24   fail: 0
```

was the old `test/run.sh` summary. The assertions survive here:

| Old assertion | Where it lives now |
|---|---|
| raw HTML element passes through | `test_the_portable_substrate_passes_through_untouched` |
| `:::figure` expands to `<maths-figure>` | `test_the_directive_expands_to_the_portable_element` |
| loader injected per page, page-relative | `test_the_loader_is_injected_relative_to_the_page` |
| no figure JS on a Tier-0 page | `test_a_page_without_a_figure_ships_no_figure_javascript` |
| unknown slug fails the build | `test_an_unknown_slug_fails_the_build` |
| Jinja marker left untouched | `test_another_systems_marker_is_left_alone` |
| Foundation drops a Higher-only page | `test_foundation_drops_a_higher_only_page` |
| Foundation strips an in-page Higher block | `test_foundation_strips_the_in_page_higher_block` |
| Foundation keeps shared content | asserted in the same test |
| Higher keeps the Higher-only page | `test_the_profiles_agree_with_the_tier_axis[higher]` |
| Higher keeps the in-page Higher block | `test_higher_keeps_the_in_page_higher_block` |
| toggle tags the Higher block | `test_the_toggle_tags_the_higher_block_for_the_switch` |

The build-success assertions (`fig-raw builds`, `fig-macros builds`, `fig-hook
builds`, `foundation builds`, `higher builds`, `toggle builds`) are the tests
themselves: a hook that raised would fail them.

Three assertions were **comparison points**, not behaviour, and are recorded
rather than ported:

- **`raw: loader on every page` and `macros: loader on every page`** contrasted
  the rejected mechanisms, both of which load the figure loader site-wide, with
  the hook, which injects it per page. The hook is now the only mechanism, and
  the guarantee that survives is `test_a_page_without_a_figure_ships_no_figure_javascript`.
- **`raw: directive is NOT understood` and `macros: directive is NOT understood`
  and `macros: jinja marker expands`** measured the mechanisms that are gone.
  `mkdocs-macros-plugin` is dropped; the substrate's portability is pinned by
  `test_the_portable_substrate_passes_through_untouched` instead.
- **`toggle: switch script present`** was the fixture's own `assets/tier-toggle.js`
  listed in the fixture's MkDocs config, not engine behaviour. There is no
  engine switch script: the toggle profile tags the block
  (`data-tier="higher"`) and the runtime that reacts to the tag is content, not
  the engine. `test_the_toggle_tag_renders_as_an_element_a_script_can_select`
  keeps the half that is the engine's.

## 1. Figure hooks

Three mechanisms were compared; all rendered the same portable
`<maths-figure data-figure="…">` custom element:

| | **raw HTML** | **mkdocs-macros-plugin** | **repo-owned hook** |
|---|---|---|---|
| Author writes | `<maths-figure data-figure="gradient">` | `{{ figure("gradient") }}` | `:::figure gradient` |
| Build dependency | none | `mkdocs-macros-plugin` | none |
| Tier-0 page JS | **global loader on every page** | **global loader on every page** | **none — injected per page** |
| Unknown slug | rendered, fails silently in the browser | build aborts | build aborts |
| Collision risk | none | **any literal `{{ … }}` in prose/maths aborts the build** (observed) | none; `:::` is line-anchored |
| Portability | raw HTML works in every renderer | MkDocs-plugin syntax | MkDocs-hook syntax |

**Decision — canonical substrate + repo-owned hook.** The wire format is the
portable `<maths-figure>` custom element (raw HTML, works in MkDocs, Quarto, MyST
and MDX). The author writes the line-anchored directive `:::figure slug`, which
`engine/textbook/hooks/figures.py` expands while injecting the loader only into
pages that need it. `mkdocs-macros-plugin` is dropped.

Portability of the substrate itself is **expected from the renderers' documented
handling of raw HTML, but not CI-verified** — that remains the job of the
`HANDOFF.md` D4 port work. What *is* verified: the directive expands, the hook
fails loudly on an unknown slug, and Tier-0 pages get no figure JS.

## 2. Tier strategies

| | **single-site toggle** | **two-site build profiles** |
|---|---|---|
| Builds | 1 | 1 per tier |
| Foundation reader receives H content | yes (hidden by JS) | no |
| Works without JS | no (H shown) | yes |
| Deep-linkable per-tier URL | no | yes |

Both are produced from **one source** by `engine/textbook/hooks/tier.py`, selected
with `extra.tier_profile`:

- `foundation` drops `tier: H` pages (`on_files`) and strips
  `<!-- tier:h -->…<!-- /tier:h -->` blocks (`on_page_markdown`);
- `higher` keeps everything;
- `toggle` keeps everything and tags H blocks with `data-tier="higher"` for the
  runtime switch.

**Decision — two sites first, toggle as a bonus.** The two-site build is the
product: it matches the two GCSE tiers, keeps Higher content out of the
Foundation payload, and works without JavaScript. The portable interface is the
front matter (`tier: H`) plus the HTML-comment block; both survive the other
renderers (the comment degrades to visible content, which a port codemod strips).

## 3. Theme preview

`theme-preview.cjs` previews every bundle on the **built** site, in both schemes,
and checks the two things a screenshot cannot: that the reader's preference
actually reached the page, and that the text on it has enough contrast.

**The route layout is asserted before a browser starts.** The routes really did
change when the renderer did: MkDocs served
`/gcse-maths/higher/Chapter 1/Section 1.1/Walkthrough/`, the pipeline serves
`/gcse-maths/higher/chapter-1/section-1.1/learn/`. The harness names the layout it
expects (`--layout pipeline`, the default; `--layout mkdocs` for the parked
shell), checks that layout's witness page exists under `--root`, and resolves
every route to a built file. Any miss exits 2 and prints the layout it expected,
with the known layouts. This is not theoretical: a miss was once served to the
audit as a `not found` body, which it then measured as 738 "text elements" and
reported as a pass.

```bash
# The whole matrix, with a full-page text audit per route
node test/theme-preview.cjs --audit --out /tmp/theme-preview -- \
  "landing:/" \
  "learn:/gcse-maths/higher/chapter-1/section-1.1/learn/"

# One bundle, dark only, no images
node test/theme-preview.cjs --themes synthwave --schemes dark --no-shots -- \
  "learn:/gcse-maths/higher/chapter-1/section-1.1/learn/"
```

The repository's own matrix — every bundle and the three routes that can carry a
defect — is `scripts/preview-themes.sh`, which builds the site first:

```bash
scripts/preview-themes.sh            # build, then 9 bundles x 2 schemes x 3 routes
scripts/preview-themes.sh --shots    # the same, writing var/theme-preview/*.png
```

### It is in a gate

The `preview` job in `.github/workflows/verify.yml` runs
`scripts/preview-themes.sh` on every push and pull request, and the `gate` job
requires it, so it is part of the check branch protection enforces. It needs
Chrome, which pytest and `scripts/check.sh` cannot assume, so it is deliberately
in neither. The job installs the Playwright client (`playwright@1.64.0`, not a
`package.json` dependency) with the browser download skipped, and drives the
Google Chrome the `ubuntu-latest` runner ships. Locally, the same script uses
whatever `PLAYWRIGHT_PATH` and `CHROME_PATH` point at, falling back to
Playwright's own defaults.

### What it cannot see

`--audit` walks every element that owns a text node, which is what makes it
measure what the page actually paints rather than what the palette declares. It
is blind to what a text node does not carry. That is a recorded limit, not an
implied claim of coverage:

- pseudo-elements — `::marker` and `::before`/`::after` content. The sidebar's
  `<summary>` disclosure marker draws `--tb-ink-lighter`, and a below-3:1 pair in
  catppuccin and kanagawa light went unseen for exactly this reason;
- `input::placeholder` text, including the search box's;
- SVG `fill`, so no icon is measured.

Growing the check means reading pseudo-element computed styles and SVG
presentation attributes as well.

It seeds **both** origin-wide keys (`textbooks:theme`, `textbooks:scheme`) before
the first paint, then asserts `data-theme` on `<html>` and
`data-md-color-scheme` on `<body>`. Ratios are read twice: from the `--tb-*`
tokens, and from real elements against the first ancestor that painted a
background, so a token that is defined but not *applied* cannot pass. Service
workers are blocked in the preview browser: their fetches are not seen by the
harness's request interception, and the preview host is not real, so a
controlled navigation would fail instead of measuring.

`--audit` reports any element below WCAG AA with its colours and ratio — 730
elements on a Learn page. This is what found the four defects recorded in
`todo.md` item 18, including Material's palette stylesheet out-ranking our link
mapping in dark mode, and the header's white-on-accent title. Both were invisible
to the palette tests. The script exits non-zero on any failure.
