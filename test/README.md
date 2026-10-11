# `test/` — figure-hook and tier-strategy evaluation

Two design questions had to be answered before authoring the vertical slice:

1. **How should a figure be embedded**, so that a parameter can be manipulated
   without breaking portability to the other three renderers?
2. **How should Foundation vs Higher be delivered** — one site with a toggle, or
   two sites built from one source?

This directory answers both by building the same fixtures several ways and
asserting the behaviour that matters.

## Run it

```bash
uv sync                       # pinned in pyproject.toml
test/run.sh                   # builds every prototype, 24 assertions
```

`test/site/` holds the build output and one `.build.log` per config.

## Layout

```
content-figures/   one source page per authoring style (+ a plain Tier-0 page)
content-tiers/     one source with F pages, H pages and in-page H blocks
hooks/             figures_hook.py (directive → element), tier_filter.py (profiles)
configs/           one mkdocs.yml per prototype, all sharing the fixtures
```

## Result

```
pass: 24   fail: 0
```

## 1. Figure hooks

Three mechanisms, all rendering to the same portable
`<maths-figure data-figure="…">` custom element:

| | **raw HTML** | **mkdocs-macros-plugin** | **repo-owned hook** |
|---|---|---|---|
| Author writes | `<maths-figure data-figure="gradient">` | `{{ figure("gradient") }}` | `:::figure gradient` |
| Build dependency | none | `mkdocs-macros-plugin` | none |
| Tier-0 page JS | **global loader on every page** | **global loader on every page** | **none — injected per page** |
| Loader path | handled by `extra_javascript` | handled by `extra_javascript` | computed relative to the page |
| Unknown slug | rendered, fails silently in the browser | build aborts | build aborts |
| Collision risk | none | **any literal `{{ … }}` in prose/maths aborts the build** (observed) | none; `:::` is line-anchored |
| Portability | raw HTML works in every renderer | MkDocs-plugin syntax | MkDocs-hook syntax |
| Owned/tested here | yes (platform) | no (third party) | yes (repo code) |

Findings, all reproduced by `test/run.sh`:

- The **macro plugin aborted the build** on a page that merely contained a
  literal double-brace sequence in prose. At GCSE, maths and code snippets make
  that a real hazard.
- Both the macro plugin and the raw-HTML approach must load the figure loader
  site-wide, so **Tier-0 pages ship runtime JS**. Only the hook can inject the
  loader per page.
- The **raw-HTML substrate is the only mechanism that is portable as-is**. It was
  deliberately chosen as the wire format so the shorthand is pure sugar.

**Decision — canonical substrate + repo-owned hook.**
The wire format is the portable `<maths-figure>` custom element (raw HTML, works
in MkDocs, Quarto, MyST and MDX). On MkDocs the author writes the line-anchored
directive `:::figure slug`, which `hooks/figures_hook.py` expands while injecting
the loader only into pages that need it. `mkdocs-macros-plugin` is dropped.

Portability of the substrate itself is **expected from the renderers' documented
handling of raw HTML, but not yet CI-verified** — that remains the job of the
`HANDOFF.md` D4 port work. What *is* verified here: MkDocs builds all three
authoring styles, the hook fails loudly on an unknown slug, and Tier-0 pages get
no figure JS.

## 2. Tier strategies

| | **single-site toggle** | **two-site build profiles** |
|---|---|---|
| Builds | 1 | 1 per tier |
| Foundation reader receives H content | yes (hidden by JS) | no |
| Works without JS | no (H shown) | yes |
| Matches GCSE structure (separate papers) | loosely | yes |
| Deep-linkable per-tier URL | no | yes |
| Extra cost to also offer the toggle | — | one more config |

Both are produced from **one source** by `hooks/tier_filter.py`, selected with
`extra.tier_profile`:

- `foundation` drops `tier: H` pages (`on_files`) and strips
  `<!-- tier:h -->…<!-- /tier:h -->` blocks (`on_page_markdown`);
- `higher` keeps everything;
- `toggle` keeps everything and tags H blocks with `data-tier="higher"` for the
  runtime switch.

**Decision — two sites first, toggle as a bonus.** The two-site build is the
product: it matches the two GCSE tiers, keeps Higher content out of the
Foundation payload, and works without JavaScript. Because it costs one extra
config, the combined toggle site can also be published from the same source. The
portable interface is the front matter (`tier: H`) plus the HTML-comment block;
both survive the other renderers (the comment degrades to visible content, which
a port codemod strips).

## 3. Theme preview

`theme-preview.cjs` previews every bundle on the **built** site, in both schemes,
and checks the two things a screenshot cannot: that the reader's preference
actually reached the page, and that the text on it has enough contrast.

```bash
# The whole matrix, with a full-page text audit per route
node test/theme-preview.cjs --audit --out /tmp/theme-preview -- \
  "landing:/" \
  "learn:/gcse-maths/higher/Chapter%201/Section%201.1/Walkthrough/"

# One bundle, dark only, no images
node test/theme-preview.cjs --themes synthwave --schemes dark --no-shots -- \
  "learn:/gcse-maths/higher/Chapter%201/Section%201.1/Walkthrough/"
```

It seeds **both** origin-wide keys (`textbooks:theme`, `textbooks:scheme`) before
the first paint, then asserts `data-theme` on `<html>` and
`data-md-color-scheme` on `<body>`. Ratios are read twice: from the `--tb-*`
tokens, and from real elements against the first ancestor that painted a
background, so a token that is defined but not *applied* cannot pass.

`--audit` walks every element that paints text — 582 of them on a Walkthrough —
and reports any below WCAG AA, with the element, its colours and the ratio. This
is what found the four defects recorded in `todo.md` item 18, including Material's
palette stylesheet out-ranking our link mapping in dark mode, and the header's
white-on-accent title. Both were invisible to the palette tests. The script exits
non-zero on any failure, so it can be wired into CI; it needs Chrome, so it is not
part of `test/run.sh`.

## Risks noted

- `mkdocs-material` prints a banner warning that **MkDocs 2.0 will break plugins
  and theme overrides** and is currently unlicensed for production. We pin MkDocs
  1.6.1 and Material 9.7.7, which work today, but the ship target should be
  re-evaluated if MkDocs 2.0 lands. This does not affect the figure or tier
  mechanisms, both of which are plain MkDocs hooks.
