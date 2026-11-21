# UX and visual improvement plan

**Plan only.** Nothing in `engine/`, `assets/`, `themes/`, `books/`, `tools/` or `tests/` was
changed to produce this document. It is the deliverable of a four-surface audit run in parallel,
then two independent reviews, and every claim below was measured on this checkout.

**Revision record.** Two reviewers who did not write the plan rejected parts of the first draft
(`var/ux-review/a.md`, `var/ux-review/b.md`). What changed: the callout item is now staged behind
a class hook after a reviewer showed `.md-typeset > blockquote` would repaint **4,272** quoted
lines; G4's label formula was dimensionally wrong and is now evaluated at the phone width; G6 has
one floor and one home instead of two of each; P4's "title the renderer already knows" was false;
P9 no longer shrinks the body text; P12 has one fix instead of two; P14 states a constraint
instead of two hexes that were lighter than paper; P15 counts 394 uses, not 468, and no longer
borrows the dash that already means "guide"; the print guard, the token-duplication item and the
`family` item were dropped; and the reader-visible changes now rank above the tooling. A second
pass, after a completion audit, corrected the callout counts (758 callouts, not 759; 4,272
quotations, not 4,273, with the `**Checking forever.**` near-miss named), the P5/G6 floor
contradiction (the cards-mode cell now reaches the same 16px floor the size report asserts),
P18's module count (three modules, four reads) and five stale line citations.

Evidence lives beside this plan while it is being worked on and is not committed:
`var/ux-audit/{shell,content,themes,figures}.md` (the four auditor reports),
`var/ux-review/{a,b}.md` (the two reviews), `var/ux-audit/m/preview-audit.txt`,
`var/ux-audit/m/paint.json`, `var/ux-audit/m/probe-learn-{1280,390}.json`, and the probes
`var/ux-audit/probe.mjs` (type inventory, line length, rhythm, tables, contents, pager) and
`var/ux-audit/probe-block.mjs` (the callout measurement).

## 0. How to re-measure

```bash
# the baseline captures the audit judged against (1280 and 390, clean and harbour)
node tools/dist/cli.js screenshot site var/ux-baseline --schemes light,dark --theme clean --width 1280 \
  -- "portal:/" "learn:/gcse-maths/higher/chapter-1/section-1.1/learn/" "practise:/gcse-maths/higher/chapter-1/section-1.1/practise/"
# contrast, per bundle per scheme, measured on the page
node tools/dist/cli.js preview --root site --no-shots --audit --themes clean,editorial,glass,harbour,neon,phosphor
# every figure's paint, then the phone floor
node tools/dist/cli.js audit site --jobs 6 --json var/ux-audit/m/paint.json
node tools/dist/cli.js audit site --mobile
# the kit, with and without a browser
node tools/dist/cli.js kit-pure
node tools/dist/cli.js kit site
# the rendered type and hit-size measurements behind §4
(cd site && python3 -m http.server 8823 &) && node var/ux-audit/probe.mjs 1280 "/gcse-maths/higher/chapter-1/section-1.1/learn/"
node var/ux-audit/probe-block.mjs
# the guidance, pinned
npm run guidance -- search "<query>" && npm run guidance -- retrieve "<id>"
```

## 1. The contract every change must satisfy

The cascade has **six** shared stylesheets, and the one that is easy to miss is the shell:

| Layer | File | Rule |
|---|---|---|
| Bundles | `assets/stylesheets/themes.css` (generated) | every `--tb-*`, per scheme, per bundle |
| Plumbing and components | `assets/stylesheets/extra.css` | **declares no colour** |
| Subject tint | `books/<id>/docs/assets/stylesheets/book.css` (generated) | `--tb-book-*` only |
| A book's components | `books/<id>/docs/assets/stylesheets/book-local.css` | authored, empty by default |
| **The shell** | `engine/src/textbook/css/shell.css` → `assets/stylesheets/shell.css` at build | masthead, drawer, skip link, pager, search; **declares no colour** |
| Reader settings | `assets/stylesheets/settings.css` | the dialog |

`engine/src/textbook/pipeline.py:79-84` is the list the build copies; `:101` shows the shell is
engine-owned and placed, not authored in `assets/`.

- A bundle **is** a palette plus typography, and a book **is** a tint. Nothing else may own a
  surface.
- Nothing in a page and nothing in a figure may carry a colour. The only classes are
  `fig-accent`, `fig-warn`, `fig-good`, `fig-ink`, `fig-grid`, `fig-line`, `fig-diagram`,
  `fig-part`, `fig-parts` and `text-accent`, `text-good`, `text-ink`, `text-warn`.
- `fig-*` paints a shape (`fill`/`stroke`); a `text-*` class paints words (`color`), and an SVG
  `<text>` is painted with `fill` — which is why `label()` defaults to `text-ink`.
- A change needing a **new token** costs `SCHEME_TOKENS` (`engine/src/textbook/book.py:46`), all
  six `themes/*.yaml` × two schemes, and the contrast invariant in `tests/test_themes.py`. No
  proposal below needs one; every one that would is in §6.

The gate that decides each class of regression is the table in `var/ux-baseline/contract.md` §3.
Two of those gates are **not** in the mandatory gate today, which is item **G1**.

## 2. What already passes — do not churn

Measured, and each of these was suspected then disproved:

- **Contrast.** `preview --no-shots --audit` over 6 bundles × 2 schemes × 3 routes: *"All checks
  passed"*, 0 failures, ~745 text elements per page. Lowest link-on-paper 5.96, accent-on-paper
  7.11, accent-ink-on-accent 5.91. Contrast is not the available defect; the available defects
  are product ones.
- **The kit.** `kit-pure` keeps its contract: 99 rows, all 52 exports covered.
- **Figure paint.** `audit site` measured 493 of 536 figure/scheme pairs with **0 contrast
  failures**; the 43 unmeasured are slugs the page map could not mount ("not on this page"), not
  a colour defect.
- **The pager.** Checked against `research/design/navigation.md`: two links, destination title
  as label, eyebrow naming the move, `rel="prev"/"next"` plus `<link rel>` (`pipeline.py:730`),
  a spacer for a missing side, `min-height: 44px`, measured 70px per link and 174px stacked at
  390. There is no gap to close.
- **The settings dialog's dismissal.** `closedby="any"` (`portal.py:369`), focus returned to the
  trigger (`settings.js:121`), outside-click polyfilled (`settings.js:136`). Retrieved
  `light-dismiss-a-dialog` to check it and it already complies.
- **Line length.** Longest prose line 68–71 characters at 1280 in a 661.82px column against
  `--tb-measure: 70ch`; 38 at 390. Inside the house measure and inside `typography`'s cap.
- **Print keeping answers closed** (`extra.css:886`): retrieval integrity, and the summary marker
  prints, so the affordance survives. Do not force `details[open]` in print.
- **`fill="none"` versus a `fig-*` fill.** Zero occurrences in the corpus, blocked by
  `tests/test_figures.py:352`. The scenario is impossible by construction.
- **The nine figure files that import no kit** — they are `figures.js` (the loader) and eight
  `*-lab.js` helpers, not figure modules. Not a defect.
- **The 4% figure-panel tint** (`extra.css:196-212`): at 8% the accent cleared its floor by 0.02.
  Do not touch it without re-running `preview --audit`.

## 3. The visual direction

OpenDesign's daemon (v0.23.1, `:7456`) was read through `open-design tools directions --json`
and `--id <id> --json`. Three of the five built-in directions matter here:

| Direction | What it is | What the house already shares |
|---|---|---|
| `editorial-monocle` | Iowan Old Style display over a system body, paper/ink/one accent, "borders + whitespace do the work, no shadows, no rounded cards" | **The house display face is already `Iowan Old Style`** (`extra.css:17`), and the reading page already carries no rounded cards |
| `modern-minimal` | system display and body, hairline borders, tabular numerals, "the chrome stays restrained while interaction states carry colour" | the body face, the hairline table rules, `font-variant-numeric` on numeric tables |
| `human-approachable` | warmer, rounder, more affordance per control | the tier chips and the settings cards, partly |

The reading experience is therefore already closer to the right direction than to the wrong one,
and the plan does **not** propose a direction change: it closes the gap between what the house
*says* it is (editorial display, restrained chrome, **one** accent) and what one page delivers,
where a dozen type sizes, a signature-less callout and an invisible focus stop contradict that
posture. Two consequences are load-bearing:

1. **Distinction without hue is the house's own idea.** `--tb-rule` borders and `color-mix` tints
   at 4–6% are already the vocabulary, and `.prove` (`extra.css:466`) is the proof it works. A
   second accent colour in prose is not part of that vocabulary, which is why the callout item
   starts neutral (§4, P1).
2. **`modern-minimal`'s "interaction states carry the colour"** is where a restrained chrome can
   still be expressive — and the settings trigger, the drawer and the search box are exactly those
   states, which is where §4 finds its cheapest wins.

Guidance was retrieved, not remembered: `typography` (80-character cap, no `nowrap` on running
text, unitless `line-height`), `accordion` (group items under an accessible name; do not put
headings in `summary`), `color` ("don't use color alone to indicate state", WCAG 1.4.1),
`dark-mode` (`color-scheme` on `:root`), `motion` (animate `opacity`/`transform` only),
`styling-web-components` (a shadow boundary is what would block page rules — `maths-figure` has
none), `navigation-drawer` and `light-dismiss-a-dialog`.

### The frame that settled the callout shape

`editorial-monocle`'s posture — "no shadows, no rounded cards, borders and whitespace do the
work" — is the reference P1 was judged against, and the judgement was made by looking at a
frame rather than by describing one. The frame is **the built page**, not a mock: a scratch
Playwright script opened
`/gcse-maths/higher/chapter-1/section-1.1/learn/` at 1280 and 390 in both schemes, injected the
three rules in P1's stage 2 into the live document, and captured the common-error callout before
and after. Files (scratch, deliberately uncommitted):
`var/ux-frames/callout-{default,slate}-{1280,390}-{before,after}.png`.

What the comparison showed, and what it changed:

- **Before**, the callout is indistinguishable from a paragraph except for its indent: bold
  `Watch out.` is the only signal, and the indent costs 40px of the 70ch measure.
- **After**, a 1px `--tb-rule` border with a 3px left rule and `--tb-radius` makes it a block a
  reader can find while scanning, at both widths and in both schemes, **with no hue** — so no
  contrast ratio moves and no bundle is re-measured.
- In the dark scheme the border is visible but quiet, which is what P1's optional stage 3 (the
  `--tb-fig-warn` left rule on the error callout alone) exists to answer if a reader test still
  wants the block to shout.

To re-render: serve `site/` (`python3 -m http.server 8823` from `site/`), open the route with a
browser, and add the block from P1 stage 2 to the document. Three rules are the whole
comparison, which is why the frame needs no harness.

### Baseline check

The platform features the plan leans on were checked against the Baseline dataset
(`https://api.webstatus.dev/v1/features`, the data behind web.dev/baseline) rather than
remembered, on 2026-11-21:

| feature | Baseline | interoperable since |
|---|---|---|
| `details` / `summary` — the drawer, every disclosure | widely | 2020-01-15 |
| `dialog` — the settings panel | widely | 2022-03-14 |
| `color-scheme` — the dark scheme | widely | 2022-02-03 |
| `prefers-reduced-motion` | widely | 2020-01-15 |
| `color-mix()` — the 4–6% tints | widely | 2023-05-09 |
| `:has()` | widely | 2023-12-19 |
| `closedby` | **not in the dataset** | — |

So nothing here needs a fallback in a supported browser; `:has()` is available, though the plan
still forbids it inside a figure for specificity reasons, not availability; and `closedby` is the
one Chrome-only property, which is why the settings dialog's outside-click polyfill
(`settings.js:136`) is not redundancy.

## 4. The plan

Ordered so that what a reader feels lands before what a tool measures, and so that no palette is
edited before the invariant that would catch it exists.

| # | Item | Surface | Effort | Gate today |
|---|---|---|---|---|
| **P2** | Make the skip link visible on focus, and give the portal one | shell | S | none |
| **P8** | The drawer says "Contents" | shell | S | none |
| **P7** | Settings: a 44px trigger, two columns at 390 | shell | S | none |
| **P12** | The muted badge is painted with the warning token | booklet | S | none |
| **P3** | Contents-list line boxes | reading page | S | none |
| **P11** | `.prove__ask` may wrap | reading page | S | `typography` |
| **P13** | A theme chooser a reader can choose from | settings | M | bundle-coverage tests |
| **P1** | Classify the callout, then give it a signature | reading page | M | `preview --audit` (paint) |
| **P5** | Cards-mode table legibility | reading page | S | none |
| **P6** | Search: phone size, keyboard path, empty state | shell | M | none |
| **P4** | One disclosure per practice answer | reading page | M | bank tests |
| **P9** | Collapse the type ladder onto the body size | reading page | M | none |
| **P10** | A spacing system, not nine margins | reading page | M | none |
| **G2** | A colour-class guard over both prefixes | tooling | S | partial |
| **G7** | A badge-colour assertion | tooling | S | none |
| **G3** | A paint-transition guard | tooling | S | none |
| **G6** | A type- and target-size report | tooling | M | none |
| **G4** | A label-size assertion at the phone width | tooling | S | partial |
| **G1** | Make the figure audits mandatory, with an allowance | tooling | S | — |
| **P14** | Dark `code_bg` is not a surface in glass and phosphor | themes | S | none |
| **P15** | Warn/good needs a signal that is not hue | figures + prose | M | `test_figures.py`, `canvas` |
| **P18** | The four HTML colour reads in figures | figures | S | none |

Wave boundaries are the table's groups: **1** P2–P1, **2** P5–P10, **3** G2–P18.

### Wave 1 — the reader's first minute

**P2 — The skip link is an invisible focus stop.** `shell.css:39` is
`.skip { position: absolute; left: -9999px }` and there is no `:focus` or `:focus-visible` rule
anywhere (the only other match, `extra.css:837`, is the print block); measured, the link is tab
stop **#1** of every book page at `x = -9999`. A keyboard reader's first Tab leaves the screen.
The portal has no skip link at all (`templates/portal.html`), and its first tab stop is Settings.
*Change:* bring the link into flow on `:focus` (`position: static; display: block; padding:
0.5rem 1rem`) — no colour, because page paper and `--tb-ink` already read — and add the same
markup to the portal template. *Gate:* none today; the report in G6 records the tab order of both
pages at 390 so the portal half is covered too. *Done means:* first Tab on a book page and on the
portal shows a readable, on-screen link, and the probe prints its box.

**P8 — The drawer does not say what it opens.** The `<summary>` carries the book title and the
section (`page.html:73-78`), measured 358×72 at 390 with the drawer closed — a label, not a
control; and a reader who opens it inserts 458 nav links before the page.
*Change:* a visible `Contents` word in the existing `--tb-ink-soft` inside the summary; the nav
keeps its `aria-label="Book contents"`. *Gate:* a copy assertion in the structure test.
*Done means:* a phone reader sees the word Contents without opening anything, and the summary's
box is measured before and after.

**P7 — Settings: a 36×36 icon-only trigger, and a panel that clips at 390.**
`shell.css:124-130` is `width/height: 2.25rem` (36px) and `portal.css:97-98` is 42px; `aria-label`
and `title` are "Settings" with empty text. The repository states its own floor two screens away
(`shell.css:369`: "under the 44px a thumb needs"). In the dialog at 390 the options stack:
`.tb-settings__options` collapses to one column at `max-width: 480px` (`settings.css:142-146`),
measured **8** option cards, dialog 358×706, `scrollHeight` 742 — the last row is clipped.
*Change:* `2.75rem` in both files; at `min-width: 48rem` show the existing label word beside the
cog; move the options breakpoint to `360px` or `minmax(7rem, 1fr)` so two 145px columns fit in
358px. No colour, no token. *Gate:* G6. *Done means:* the trigger measures ≥44px at 390 on both
the portal and a book page, and the dialog's `scrollHeight` fits the viewport at 390.

**P12 — The muted badge is painted with the warning token.** `extra.css:764-765`:
`.bk-badge--muted` uses `--tb-fig-warn` and `.bk-badge--warn` uses `--tb-fig-good`, and
`booklet.js:258` defaults a toneless badge to `muted` — so the default badge wears the warning hue
and a "warn" badge the good hue, in all six bundles and both schemes.
*Change:* **one** fix, not a swap: muted becomes the neutral
`color-mix(in srgb, var(--tb-ink) 10%, transparent)`, and warn keeps `--tb-fig-warn` (the swap
alone would leave the default badge green). No literal, no token. *Gate:* G7.
*Done means:* a toneless badge is neutral in both schemes, a warn badge is warm, and G7's
assertion fails on the un-fixed file.

**P3 — The contents list is a set of 15px targets.** `.contents__list` is `0.85rem` with
`line-height: 1.45` (`extra.css:930-936`), measured `listFs: 13.6px`, `linkHeight: 15` at both
1280 and 390, six items. Take the **line-height-only** option (`line-height: 1.7`, and
`a { display: inline-block }`) rather than raising the font size as well: it buys ~22px boxes with
no new panel height, where the full fix adds 80px of scroll at 390 — which the reviewer priced and
rejected for a reader who is already scrolling 4,430px. *Gate:* G6. *Done means:* the measured
link box is ≥22px at 390 and 1280, and the panel height is unchanged.

**P11 — `.prove__ask` refuses to wrap.** `extra.css:481-485` sets `white-space: nowrap` on three
words of running text, against `typography` and WCAG 1.4.12, inside a flex row that already
declares `flex-wrap: wrap`.
*Change:* delete the declaration; the `::after` arrow stays attached. No colour. *Gate:* the
390px preview captures. *Done means:* at 200% text zoom the affordance wraps and nothing clips.

**P13 — A theme chooser a reader can choose from.** The dialog offers Light/Dark and six bundles
as title + description in one flat grid (`portal.py:303-345`, `settings.css:136`). The
descriptions ask the reader to *look*, and the vivid three add jargon — "glassmorphism developer
OS", "A CRT terminal", "cyberpunk glass terminal" — outside a 12–14 reading age. Each bundle is a
*pair* whose member names are loaded and tested (Paper/Ink, Daybreak/Shell, Daylight/Nightfall,
`tests/test_themes.py:262`) but never shown, and `mood` reaches the reader only as list order.
*Change:* two sub-fieldsets whose legends come from `mood` ("Quiet themes" / "Bold themes"),
reusing `.tb-settings__group`/`__legend`; append the pair's member names from `provenance`; and
rewrite the six descriptions. The strings, so the item is executable rather than a promise:

| bundle | description |
|---|---|
| clean | Plain black on white, with no colour at all. |
| editorial | Warm cream paper and dark ink. |
| glass | Near-black with green and lime. |
| harbour | Blue-grey paper with a steady blue. |
| neon | Dark violet with bright pink. |
| phosphor | Dark brown with amber, like an old screen. |

*Gate:* the bundle-coverage tests, plus a hand pass against the voice rules — nothing automated
reads YAML copy (`python -m textbook.lint` checks book prose, and `voice:contraction` is one of its
rules, but it does not open `themes/*.yaml`). *Done means:* a reader who
cannot see the palettes can tell the six apart from the words, and no description exceeds 12 words
or contains a jargon term.

**P1 — Classify the callout, then give it a signature.** This is the plan's highest-value change
and it is now **staged**, because the first draft would have repainted every quotation in eleven
books. Measured over `books/*/docs/**/*.md` (2,614 files): **5,030** blockquote lines, of which **757**
open `> **Watch out.` and exactly **1** opens `> **Check.**` — 758 callouts, and **4,272**
quotations or other prose that a blanket rule would repaint. The marker has to match the bold lead
*exactly*: `books/a-level-maths/docs/Chapter 1/Section 1.3/Walkthrough/index.md:123` is
`> **Checking forever.**`, which a prefix match on `Check` would misclassify. Every callout today is a plain `<blockquote>`: `margin: 0 40px`,
`padding-left: 0`, `border-left: 0px none`, `background: transparent`, `::before: none`, body ink
(`probe-block.mjs`, 3/3). The only rule touching it, `extra.css:93-95`, sets a max width. The
chapter formula *requires* a common-error callout on every Learn page, so the mandated pedagogy's
only visual marker is a 40px indent — which also costs the reader 40px of the 70ch measure.

*Stage 1, a class.* A build hook that turns a blockquote whose first inline is exactly
`**Watch out.**` or `**Check.**` into `<aside class="callout callout--error|callout--check">`. This is the
only way to tell a callout from a quotation, and it is what `accordion` and the house's own
`.prove` both assume: a named block, not a bare quote. It also removes the unscoped-selector risk
from stage 2 entirely.

*Stage 2, a neutral signature.*

```css
.callout {
  margin: 1.1rem 0;
  padding: 0.6rem 0.95rem;
  border: 1px solid var(--tb-rule);
  border-left: 3px solid var(--tb-rule);
  border-radius: var(--tb-radius);
}
.callout > p { margin: 0.35rem 0; }
```

Neutral first: it is the shape `.prove` already uses, it introduces no second accent into prose,
and it cannot change any contrast ratio (the paper stays the paper). *Stage 3, hue only if a
measured review still wants it:* the common-error callout alone takes
`border-left-color: var(--tb-fig-warn)` and
`background: color-mix(in srgb, var(--tb-fig-warn) 6%, transparent)` — computed ink-on-tint is
15.5–16.9 in glass and phosphor, both schemes, so it clears the invariant — but it must be drawn
on the element box, never a `::before`, because `preview --audit` is blind to pseudo-elements.

*Risk and gate:* the hook is a build change over 758 authored callouts and needs a test that the
count matches and no quotation is classified; stage 2 is paint-free apart from the rule colour;
stage 3 is caught by `preview --audit` in both schemes and all six bundles. *Done means:* a Learn
page shows its common-error callout as a distinct block; the hook classifies exactly 758 blocks
and leaves the other 4,272 quote lines untouched; `preview --audit` passes; no `<blockquote>` gains a border except through
the class.

### Wave 2 — the reading page's legibility

**P5 — Cards-mode tables are smaller than the prose that explains them.** At ≤60rem a
`table--cards` body cell is `0.78rem` = 12.48px on `line-height: 1.3` with
`padding: 0.05rem 0` = 0.8px, and its `::before` label is `0.7rem` = 11.2px (`extra.css:171-184`);
the first cell alone is `0.92rem` = 14.72px, which is the number the probe reports — the inversion
is hidden in the summary and visible on the page. The header row is clipped, so all context lives
in the 11.2px labels.
*Change:* body cells to `1rem` on `line-height: 1.45` with `padding: 0.15rem 0`, labels to
`0.85rem` — 16px of text, which is G6's reading floor, and 13.6px of label. No colour.
*Risk:* taller cards (the block budgets 140px); re-measure with `probe.mjs 390`. *Gate:* G6.
*Done means:* at 390 a card's value text is ≥16px, its label ≥13.6px, its row padding ≥4.5px, and
the block's 140px height budget is re-measured at the new size rather than assumed.

**P6 — Search: 13.6px on a phone, no keyboard path, no empty state.** `.search input` is
`0.85rem` (`shell.css:246-257`), measured 13.6px in a 358×36 box at 390; iOS zooms a focused input
below 16px, so the layout shifts while the reader types. The input is a bare `<input type="search">`
+ `<ul>` with no `aria-expanded`, `aria-controls` or `aria-live` (`page.html:53-56`), `ArrowDown`
leaves focus in the input, result anchors are 33px tall, and `.search__results:empty { display:
none }` (`shell.css:280`) means an unmatched query makes the panel vanish with no message.
*Change:* `font-size: 1rem` for `.search input` in the existing phone block; `aria-expanded`/
`aria-controls` on the input; `role="status" aria-live="polite"` on the list; a plain
`<li>No results</li>` when the array is empty, with `hidden` replacing `:empty`; `ArrowDown` /
`Escape` / `Enter` in the existing module; `min-height: 44px` on result links. No colour.
*Gate:* a markup test over the shipped `page.html`. *Done means:* a nonsense query says so;
`ArrowDown` reaches the first result; the input computes ≥16px at 390.

**P4 — All twelve practice answers sit in one disclosure.** `verify/render.py:151` wraps the join
of every answer in one `<details>`; measured on `/practise/`: 12 `<ol>` items, one summary
"Answers and concise solutions", a 46-line body. To check answer 9 the reader opens everything.
The first draft claimed "the title the renderer already knows" — **false**: `render.py:104-110`
builds a label from `answer_label` or the whole statement, and no problem carries a title.
*Change:* one `<details>` per item, summary `9. Show the answer` (number plus three words), the
group under a labelled section — which is what `accordion` asks for. Nothing else is invented.
*Risk:* twelve borders on a page; `extra.css:263` already styles the disclosure, so this is
markup. *Gate:* the bank tests prove the answers; add the summary/item pairing to
`tests/test_render_hooks.py`. *Done means:* answer 9 is one tap from item 9, each summary names
its number, and no answer text moves.

**P9 — Collapse the type ladder *onto* the body size.** `extra.css` declares 19 `font-size`
values: 16 distinct `rem` values between `0.66rem` and `1.1rem`, plus three `em`/px outliers. One
Learn page paints nine sizes and twelve size/weight combinations (34/700, 25.5/700, 19.89/700,
17/400, 17/700, 17.85/400 MathML, 16/400, 18/400, 14/400, 13.6/400, 12.8/400, 17/600). Nothing
distinguishes a label from an aside from prose, which is why the callout needed P1 to be findable
at all.
*Change:* the body **stays at 17px** (`extra.css:77`) and the outliers collapse *upward onto it*
or down onto two label steps: reading text `1.0625rem`, label `0.85rem`, small label `0.78rem`,
headings unchanged. The first draft shrank the body to 16px, which contradicted P3, P5 and P6 in
the same plan and is the wrong direction for this reader. No colour. *Risk:* a `pre` block, a
table, the booklet (`extra.css:740+`), print (`:812-871`) and `maths-figure figcaption`
(`:221`, `0.9rem`) all inherit; each is checked at 390 in both schemes because no gate measures
text *inside* a figure. *Gate:* G6, whose selector list includes the figcaption and `.fig-parts`.
*Done means:* `grep -oE 'font-size: *[0-9.]+rem' extra.css | sort -u` reports ≤8 values, the body
still computes 17px, and the four block shapes plus a figure caption are photographed at 390 in
both schemes.

**P10 — A spacing system, not nine margins.** The same file uses margins of 0.4, 0.5, 0.6, 0.8,
1.1, 1.2, 1.3 and 1.4rem plus `0.8rem 0 0.4rem`. On one page that lands as gaps of 17, 21, 22 and
23px, and a heading sits **21px** from its own paragraph while a paragraph sits 17px from the
contents panel — so the spacing contradicts the hierarchy.
*Change:* scope it (`.md-typeset h2, .md-typeset h3 { margin: 1.4rem 0 0.5rem }`,
`.md-typeset > p { margin: 0 0 0.9rem }`) so every heading→text gap is smaller than every
text→heading gap by construction, and collapse the outliers onto 0.25 / 0.5 / 1 / 1.4rem. The
first draft's unscoped `h2, h3` would have reached headings outside the article. *Gate:* G6's
rhythm report. *Done means:* the probe shows heading→text below text→heading for every pair, and
no two adjacent gaps differ by 1px.

### Wave 3 — integrity: the guards, then the palettes they protect

**G2 — A colour-class guard.** `tests/test_figures.py:434` (`text_classes_in`) polices `text-*`
only, so a `fig-*` name is unexamined. Most of them are structural and the kit owns them
(`fig-caption`, `fig-control`, `fig-controls`, `fig-hidden`, `fig-part-button`, `fig-parts`,
`fig-question`, `fig-row-active`, `fig-segment`, `fig-table`, `readout` — `assets/figures/src/kit/`),
but **four modules** set `fig-note` (`ch9-change-of-sign.js:86`, `ch9-cobweb.js:137`,
`ch9-newton-raphson.js:119`, `ch9-trapezium.js:103`), which no stylesheet and no kit layer
defines. Today those are HTML labels, so they inherit body ink and adapt only by luck; the day one
is an SVG `<text>` it is the initial-black defect `extra.css:341-350` records having already
shipped once. *Change:* a check over both prefixes that knows the kit's structural classes and the
CSS's colour classes, and flags anything in neither. *Done means:* `fig-note` fails until it is a
`text-ink` label, and a genuinely dead colour class fails too.

**G7 — A badge-colour assertion.** Nothing reads `bk-badge` colour (`grep` finds only the JS
emitter), which is why P12 is live. *Change:* assert each variant's background resolves to the
semantic token, in `tests/test_themes.py`. *Done means:* the un-fixed `extra.css` fails it.

**G3 — A paint-transition guard.** `extra.css` has zero `transition` and zero `animation`, so
nothing has ever exercised the question; a `transition: fill` makes the paint audit sample an
interpolated colour — a false pass or a flake, and `audit-figures.ts:347` already documents that a
figure which mounts nothing passes every check. *Change:* a test that fails any
`transition`/`animation` inside a `maths-figure`/`fig-*` rule naming `fill`, `stroke`, `color`,
`background` or a `--tb-*`; `motion` is the citation. *Done means:* a hand-written violating rule
fails, and `opacity`/`transform` under `prefers-reduced-motion: no-preference` passes.

**G6 — One type- and target-size report, with one floor.** Nothing today asserts a minimum type
size outside figures, which is how 12.48px table cells and 15px contents links ship.
*Change:* **one** home, `tests/test_type_scale.py`, measuring at 390 in both schemes: reading text
≥ **16px** (`table--cards td`, `details > p`, `.search input`), labels and captions ≥ **12px**
(`td::before`, `figcaption`, `.fig-parts button`, `.contents__list a` line box ≥ 22px as a
*target*, which is the number the evidence supports), and the tab order of the learn page and the
portal. P5 raises the cards-mode cell **to** this 16px floor, which is the only way both items can
pass; a cell left at 13.6px would fail the report this item asks for. The draft had two floors and
two homes and contradicted P3 and P5. *Done means:* the
report names each selector and its computed size, fails at the floor, and its two floors are the
same two the plan's items target.

**G4 — A label-size assertion at the phone width.** The draft's formula
`(46rem − 2×padding)/520 ≥ 9/16` is dimensionally wrong: at 46rem it evaluates to ~1.35 and can
never fire, because the binding width is the phone column, not `max-width`. *Change:* evaluate at
the real phone content width —
`(390 − 2×page-padding − 2×panel-padding) / viewBox-width × SIZE.tick ≥ 9` — and print both
numbers. *Gate:* the same file as G6. *Done means:* raising the panel padding to 1.5rem fails with
"8.4px at 390", and the current tree passes with its measured value.

**G1 — Make the figure audits mandatory, with an allowance.** `scripts/check.sh:92-115` runs
`check-mobile` and `canvas` but **not** `audit`; the audits run in `scripts/preview-themes.sh:89,96`
and the `preview` CI job, which `.github/workflows/verify.yml:601-614` permits to be `skipped` on
a branch — and `check.sh:100,113` already announces a skip when Playwright is absent, so "make it
mandatory" has to mean "fail, not announce".
*Change:* add `audit site` and `audit site --mobile` to `scripts/check.sh`, drop the `skipped`
allowance for the preview job, and add an explicit allowance list for the **43 slugs** the audit
cannot mount (`var/ux-audit/m/paint.json`), each with the reason, so the gate fails on a new miss
rather than on the known ones. *Risk:* CI minutes. *Done means:* a branch with a deliberately
broken `fig-*` rule fails `scripts/check.sh`; the allowance list has 43 entries and a comment; the
run time is recorded in the PR.

**P14 — Dark `code_bg` is not a surface in glass or phosphor, and nothing measures it.** The
auditor's computed distances (CIE76 from `paper`, dark scheme): clean 4.1, editorial 4.5, glass
**1.9**, harbour 3.4, neon 6.6, phosphor **1.6**; light `code_bg` is 3.2–6.1 for comparison. So a
code block in glass or phosphor dark reads as the page, not as a second surface. **And no test
asserts text on `code_bg` at all** (`book.py:60` is its only mention) — so the first draft's two
hexes were a palette edit with no floor watching it, and both were *lighter* than paper, which is
the wrong direction.
*Change, a constraint rather than a hex:* add `code_bg` to the contrast invariant as a surface
(`ΔE(paper, code_bg) ≥ 3` per bundle per scheme) and as a text background (ink on `code_bg` ≥ 7:1),
then move glass's and phosphor's dark value by the smallest amount that clears both, measured with
`preview --audit`. *Gate:* `tests/test_themes.py`. *Done means:* the two new assertions pass for
all six bundles in both schemes, and the exact values are chosen by the implementer and recorded.

**P15 — Warn and good need a signal that is not hue.** Simulated for a deuteranope (Machado
severity 1.0), the pair collapses in glass light (ΔE 4.9 against 82.1 normal) and neon light (5.8
against 91.5); eight of twelve bundle×scheme pairs are marginal, and `color` states the rule
directly. The instance that makes it concrete is
`books/a-level-maths/docs/assets/figures/ch8-antiderivative-family.js:90,98`: a secant
`fig-warn` and a tangent `fig-good` on the same axes with no other difference, and the readout at
`:106` says "The orange line is f of x equals 2x" — a colour name that is wrong for that reader.
Corpus counts: **243** `fig-warn` + **151** `fig-good` = **394**, not the 468 of the first draft.
*Change:* a non-hue difference **only where colour is the only signal** (the pair above and its
siblings), not on every warn stroke — a marker or a line weight, chosen so it does not collide
with `draw.ts:532`: a dash already means "guide". And the readout prose names the role: "The
straight line is f of x equals 2x." *Risk:* each figure that changes must stay inside the kit's
marks and the 9px floor; the corpus count is the scope. *Gate:* `tests/test_figures.py`,
`canvas site`, `audit site --mobile`, `readout site --verify` (the readout is checked arithmetic),
and a new grep for `the (orange|green|red|blue) line`. *Done means:* every warn/good pair is
distinguishable in greyscale, the readout grep is empty, and `readout --verify` passes.

**P18 — Three figure modules paint colour outside the class system, in four places.**
`ch16-point.js:49`, `ch4-fraction-strip.js:47-49` (two reads in three lines) and `ch7-scale.js:22`
set HTML `background`s to `--tb-fig-accent`,
`--tb-fig-warn`, `--tb-ink` and a `color-mix` — a live breach of "nothing in a figure may carry a
colour", and `audit-figures.ts:409-417` reads SVG `fill`/`color` only, so those bars are measured
by no gate. This was a sign-off row in the first draft; a reviewer was right that it is an item,
not a decision.
*Change:* route them through the existing `fig-*` classes on a generated SVG `<rect>`, and extend
the audit to read HTML `backgroundColor`/`background-image` inside `maths-figure`, failing on an
unmeasurable `var()`. *Order:* after G1, or the extension is unmeasurable. *Gate:* `audit site`.
*Done means:* the three modules use only `fig-*` classes, and the extended audit fails if a
`var(--tb-*)` background is reintroduced.

## 5. What was measured and rejected

- **"Inline links are smaller than the prose."** Not reproducible: prose anchors compute 17px;
  the 13.6px/15px boxes are the six contents links (P3).
- **A drawer rewrite as `<dialog>`.** Rejected in `research/design/navigation.md`: it would lose
  the no-JS default. The defect is the label (P8), not the primitive.
- **`auto-fit` on the portal's card grid.** `portal.css:140` is
  `repeat(auto-fill, minmax(280px, 1fr))`; measured at 1280 it makes three 321.3px tracks and the
  two single-card groups leave two empty cells. `auto-fit` would stretch a lone card to 960px;
  capping the track at `minmax(280px, 26rem)` is the correct fix, and it is cosmetic — no reader is
  blocked by whitespace. Not queued.
- **Below the ranked line, and still queued.** Two items are filed in `.agents/todo.md` without a
  row in §4: the portal's card grid (**215**, cosmetic — the `auto-fill` note below) and the
  missing print render (**216**, a gap recorded in §7). Both sit after the 22 ranked items and
  nothing in the ranked table depends on them.
- **A print render (dropped from the plan).** The premise — "no test renders print media" — is
  true, but no print defect was ever measured; the finding rested on reading CSS. It belongs in
  `§7` as a gap, not as a guard ranked above a reader's first Tab.
- **Token duplication (dropped).** `accent_ink` is `#ffffff` in all six light palettes and dark
  `fig_good` repeats between editorial and harbour: a ΔE-2 nudge that no reader can perceive,
  spending a measured contrast margin for tidiness.
- **`family` (dropped).** Six one-member families that the template never renders; renaming or
  documenting them is metadata churn, not UX.
- **A "no colour in the theme" bundle.** Contrast passes for all six; no bundle is proposed for
  removal.
- **`fig_grid` as the weak figure token.** No: every dark `fig_grid` is ΔE 30+ from paper,
  measured at its own 3:1 floor.
- **Moving backgrounds.** Measured and rejected in `research/design/background-effects.md`; the
  CSS animation was the worst citizen because it never stops.
- **A dedicated `.prove` tint token.** A `SCHEME_TOKENS` change for a 5–9 point surface
  difference that the border already carries.

## 6. Decisions still open

| # | Decision | Cost | Recommendation |
|---|---|---|---|
| D1 | The callout hook's shape: two classes (`--check`, `--error`) or one neutral class | the hook is already P1's stage 1; two classes cost one more selector and a migration test | two classes, so the hue in stage 3 can be given to the error alone |
| D2 | Collection-level search on the portal | a root Pagefind index across eleven books; changes `textbook.portal` and the worker | not now; the portal's skip link is P2 |
| D3 | A "back to page" escape after the drawer's 458 links | a decision about whether the drawer is a landmark | separate item; P8 is the cheap half |
| D4 | Any new token | `SCHEME_TOKENS` + six bundles × two schemes + the invariant | none needed; every item is expressible today |
| D5 | The visual direction | none | keep it: editorial display, restrained chrome, one accent (§3) |

## 7. Where this audit is still thin

- `probe.mjs` assumes a `main.md-typeset`; it dies on the portal (`/`), so the portal's type
  inventory is unmeasured. P7's panel measurement came from a second probe (not committed), which
  should be folded into `probe.mjs` before the plan is executed.
- Nothing measures text **inside** a figure — `figcaption`, `.fig-parts button`, the readout — so
  P9 and P10 can shrink it and only a photograph would show it. G6's selector list is the fix.
- `@media (forced-colors: active)` in `extra.css` is unmeasured, and no `forced-colors` guide came
  back from the guidance search.
- The 43 figures the paint audit could not mount must be explained before G1 makes that audit a
  required gate, or the gate needs the allowance list P1 asks for.
- A print render has never been made; the print findings rest on CSS. This is the one gap the
  dropped item leaves, and it should be a small item of its own before any layout change to a
  figure's box.
