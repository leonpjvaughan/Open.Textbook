# Reuse and modularity — a measured audit

**Why this exists.** The collection is about to grow from five books to nine, and then
to cover four Irish courses. Every standard that is only in an author's head becomes a
defect at scale, so this file measures what is actually shared today, what is repeated
without being shared, and what that would cost at 300 figures rather than 177.

**Retrieved:** 2026-10-15. Every number below is a command and its output. Nothing here
is an impression.

---

## 1. What is genuinely shared, and it is working

| Surface | Size | State |
|---|---|---|
| `assets/figures/kit.js` | 287 lines | **177 of 177** figure modules import it |
| `assets/figures/figures.js` | 23 lines | the loader, one copy |
| `engine/src/textbook/css/shell.css` | 285 lines | the engine's own stylesheet |
| `assets/stylesheets/` | 1,320 lines | `extra`, `themes`, `settings`, `portal` |
| `themes/*.yaml` | 6 bundles | complete and consistent (below) |

```bash
$ total=$(ls books/*/docs/assets/figures/*.js | wc -l); \
  kit=$(grep -l 'from "./kit.js"' books/*/docs/assets/figures/*.js | wc -l)
$ echo "$kit of $total"
177 of 177
```

That is the single most important number here, and it is the result of work already
done: before it, **not one module imported a shared line** — 176 own `innerHTML`, 173
own slider wiring, 154 own formatting, 18,773 lines.

## 2. Colour: no leaks, and the invariant is complete

```bash
$ grep -rnE '#[0-9a-fA-F]{3,8}\b|rgb\(|rgba\(|hsl\(' \
    books/*/docs/assets/figures/*.js assets/figures/*.js | wc -l
0
$ grep -rnE 'style="[^"]*(color|background)' books/*/docs --include=*.md | wc -l
0
```

**Zero hardcoded colours in any figure, and zero in any page.** The one exception the
rules allow is the icons, and they are not figures.

**Every `fig-*` / `text-*` class a module uses is defined.** Ten used, ten defined, no
orphans:

| Class | Used by | Class | Used by |
|---|---|---|---|
| `fig-ink` | 619 places | `text-ink` | 115 |
| `fig-grid` | 181 | `text-accent` | 21 |
| `fig-accent` | 180 | `text-warn` | 17 |
| `fig-warn` | 121 | `text-good` | 15 |
| `fig-good` | 80 | `fig-line` | 24 |

### The bundles are complete

Fourteen tokens — `accent`, `accent_light`, `accent_dark`, `accent_ink`, `paper`,
`ink`, `ink_soft`, `ink_lighter`, `rule`, `link`, `code_bg`, `fig_good`, `fig_grid`,
`fig_warn` — are defined by **all six bundles in both schemes**. A missing token would
fall back to a hardcoded default in `themes.css`, which is how one bundle silently
renders in another's palette; none is missing.

The composition is the right shape too. A bundle writes
`--tb-accent: var(--tb-book-accent-light, #6ea8d8)`, so a book's subject tint is
**offered** and the bundle decides whether to take it. `clean` refuses it. Nothing in a
page or a figure knows a colour.

### The measurement that backs it

`scripts/audit-figures.cjs` measures every figure in a browser, in both schemes, and
`research/design/figure-audit.md` is the result. It is why the invariant exists: it
found 18 SVG labels painted black — `.text-*` sets `color` and **an SVG `<text>` is
painted with `fill`**, so the words were invisible at 1.4:1 in dark mode — and it found
`fig_accent` had no threshold against the figure panel at 12 book×bundle pairs.

---

## 3. What is repeated and not shared

This is the part that does not scale, and it is the reason this audit exists.

```bash
$ find books/*/docs/assets/figures -name '*.js' ! -name 'kit.js' ! -name 'figures.js' | wc -l
177
$ ... | xargs cat | wc -l
20642          # mean 117 lines per module
```

### 3.1 Fourteen font sizes, chosen per module

```bash
$ grep -hoE 'font-size="[0-9]+"' books/*/docs/assets/figures/*.js | sort | uniq -c | sort -rn
117 font-size="16"    18 font-size="20"    4 font-size="11"
 74 font-size="18"    18 font-size="15"    2 font-size="21"
 63 font-size="17"    11 font-size="14"    2 font-size="10"
 48 font-size="19"    10 font-size="12"    1 font-size="23"
                                           1 font-size="22"
$ ... | sort -u | wc -l
14
```

**This is the highest-risk finding, and it is the exact mechanism of a defect already
fixed by hand.** The figure audit found five figures whose smallest label fell below
9px at phone width, because the kit's `font: 14px` leaked into the drawing and scaled
with the viewBox: `14 × 0.617 = 8.6px`. Removing that one declaration fixed five
figures. But the modules still each choose their own number, so nothing prevents the
next figure from choosing 10 — and **four modules already have**.

A named scale is the fix. A module should say `SIZE.label`, not `16`.

### 3.2 Every label hand-writes its own anchor

```bash
$ grep -l 'text-anchor' books/*/docs/assets/figures/*.js | wc -l
107
```

One hundred and seven of 177 modules write

```
<text x="…" y="…" font-size="16" text-anchor="middle" class="text-ink">…</text>
```

by hand. The attributes are always the same four in the same order; what varies is the
position, the words and the size. That is a `label()` helper, and at 300 figures it is
300 more chances to forget `class="text-ink"` and ship black text on a dark panel —
which is the defect that was already found 18 times.

### 3.3 Twenty modules build a coordinate mapping by hand

```bash
$ grep -lE 'const (sx|sy|tx|ty|toX|toY|scaleX|scaleY|xFor|yFor)\s*=' \
    books/*/docs/assets/figures/*.js | wc -l
20
```

Every one re-derives the same thing: map a value in its own units to an SVG coordinate.
The arithmetic is identical and the sign errors are not. This is the largest single
block of duplicated *logic* in the collection.

### 3.4 What is repeated but **correctly** not shared

Worth recording, so a later reader does not "fix" it:

- **`stroke-dasharray` in 64 modules**, with genuinely different patterns — `4 3`,
  `5 4`, `2 3`. The dash is semantic: it distinguishes one series from another without
  colour, which is a requirement. Shared would be wrong.
- **`toFixed(1)` 1,709 times.** These are SVG coordinates, where a fixed precision is
  correct and `fmt` is not — `fmt` is for the reader-facing readout. Only 6 modules use
  `fmt`, and they are the 6 that have a readout to format.
- **`innerHTML` in 175 modules.** Building markup as a string is the right choice here;
  the alternative is 40 lines of `createElementNS` per shape.
- **`Math.min`/`Math.max` clamping in 11 modules.** Different clamps.

---

## 4. The widget and component surface

| Component | Shared by | State |
|---|---|---|
| `assets/booklet/booklet.js` | the 5 books that declare a booklet | one copy, board- and group-aware |
| `assets/settings/settings.js` | every book | one copy |
| `kit.js` panel / slider / toggle / chooser | 177 modules | 7 exports |

The kit exports exactly seven functions — `panel`, `slider`, `toggle`, `chooser`,
`fmt`, `signed`, `react` — and its own docstring is explicit that **it is metric-only
and does not draw**, because a framework for 177 bespoke diagrams would be a framework
around nothing. That judgement is right. The additions proposed in §5 are the ones that
are *not* drawings: a size scale, a label, and a coordinate mapping.

## 5. What to do, in order of value

| # | Change | Fixes | Reach |
|---|---|---|---|
| 1 | **A font-size scale in the kit** | 14 sizes chosen per module, 4 already below the floor | every figure |
| 2 | **`label()`** — position, text, anchor, size, class | 107 hand-written text elements | 107 modules |
| 3 | **`scale()`** — map a domain to a range, with the axis | 20 hand-built mappings | 20 modules, growing |
| 4 | **A check that fails on a bare `font-size=` in a module** | the next figure that picks 10px | every figure |
| 5 | **A check that fails on a `<text>` with no `fig-*`/`text-*` class** | the 18 black-on-dark labels recurring | every figure |

Items 4 and 5 are the ones that make 1–3 stick. A standard that is not checked is a
standard that decays, and both defects above were found by measurement rather than by
reading.

## 6. What is already checked, and where

| Check | Guards |
|---|---|
| `scripts/audit-figures.cjs` | the panel, the computed paint of every element, the ratio between them, both schemes; vacuity (a figure that mounts nothing) |
| `scripts/check-figure-kit.cjs` | every module mounts through the kit |
| `tests/test_figures.py` | no colour literal, `mount()` exported, accessible names |
| `tests/test_figure_browser.py` | the same, in a real browser, across all six bundles |
| `tests/test_themes.py` | the contrast invariant, every book × bundle pair |
| `tests/test_content_hygiene.py` | tabs, internal words, stray DfE codes |

The gap is not coverage of *colour* — that is thorough. The gap is that **the drawing
internals of a figure are almost entirely unconstrained**, which is where §3 lives.
