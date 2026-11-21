# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

**This file holds open items only.** `.agents/todo-closed.md` holds every closed
one **in full** — the diagnosis is the valuable part: what was wrong, how it was
measured and what fixed it. A one-line summary keeps the number and deletes the
reasoning, so nothing is compressed on the way across and nothing is deleted.

**An item is here because it is still true.** Before closing one, run its own
done-means; an item whose heading says done and whose checklist does not is the
failure this file has had twice, so the list below, the headings and the boxes
are checked against each other on every pass.

**Every item from 79 to 191 is closed except 187 and 188,** each with its measurement, its
fix, its outcome and its ticked done-means in `.agents/todo-closed.md`. A new item goes at
the number after the last one, with its diagnosis, its fix and its own done-means. Open:
**187** and **188** from `research/review/maths-applied-and-numerical-methods-v.md`, **192**,
filed while closing 186, 190 and 191, and **200–216** of the UX queue from
`research/design/ux-plan.md` — the four auditor reports and the two reviews behind it are
summarised there, not here. **193–199 and 202** are closed in stage 1 of that plan.

The UX queue is ordered as `ux-plan.md` §4 ranks it. One dependency matters before starting:
the size report (**209**) is the gate that **197**, **201**, **203** and **204** are verified
against, so it may be done first without renumbering anything.

Two items were both filed as 182 by different passes; the label-and-font one is now **189**,
and the duplicate number is gone.

The *interactive-aid backlog* — which figures and interactions a book still wants — is
`ideas.md`; it is a plan rather than a defect list, and it is written for the author
choosing what to build next.

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

The five **design proposals** in `research/review/maths-applied-and-numerical-methods-ii.md`
are adopted as items **168–172**, listed in the paragraph above; `ideas.md` §12 holds the
argument and the citations, and the review holds the measurement. The two indexes in
`research/review/maths-applied-and-numerical-methods-iii.md` were items **173–174**, and that
review holds their measurement.

---

## 187 — `numerical-methods` draws five things and explains 77 methods in words

**What is wrong.** The book has 32 pages, 77 methods and 64 systems, and five figure
modules: `discriminant.js`, `energy-drift.js`, `kind-shapes.js`, `order-rate.js`,
`step-limit.js`. Each draws a *shape* — the three cases of a discriminant, the shape of a
kind, a step limit, an order rate, an error that does not shrink. Not one draws a *method*,
so the book's difficult ideas are carried entirely by prose and by displayed algebra: a
Newton step leaving the tangent and crossing the axis, a secant through two iterates, a
bracket that bisection halves, an iteration on a plane converging along one direction
because the others were divided away, a Krylov subspace slicing a spectrum, a Jacobi
splitting's diagonal and off-diagonal halves, a multigrid restriction between two grids, a
condition number turning a circle into an ellipse.

`maths-applied` has 11 modules for 16 pages. This book has 5 for 32, and they are the ones
that were easiest to draw rather than the ones the reading needs.

**The fix.** Draw the first four from that list, in the order a reader meets them, each
mounted on the class page whose paragraph currently describes it. The rule the review
established holds: the numbers come from the page's own model or from a kernel, never typed
to look right, and `claim()` declares the arithmetic. A figure whose claim is
pose-independent stays static; a methods page whose claim *is* the step wants one scrubber.

**Done means**

- [ ] four new modules in `books/numerical-methods/docs/assets/figures/`, each mounted by
      `:::figure` on the class page it explains, beside the paragraph that describes it.
- [ ] every number a figure prints comes from the page's model or a kernel, and
      `node tools/dist/cli.js readout site --verify` passes for the new claims.
- [ ] `canvas`, `kit` and `audit site --mobile` pass in both schemes, with no label under
      9 px at 390 px.
- [ ] no new colour: the drawings use `fig-*`/`text-*` and the `--tb-*` tokens only.
- [ ] the class pages that gain a figure lose the sentence that only described the picture.

## 188 — The book's front door is 91 screens long on a phone and cannot be skimmed

**What is wrong.** `/techniques/` is the alphabetical index of every method, and at 390 px
it measures 23,511 px tall, 5,291 words and 6 `<h2>` for 77 entries:

```
$ node /tmp/probe.mjs      # 390 px viewport, built site, offsetHeight of <main>
/techniques/   23511 px   5291 words   6 h2   77 entries
```

Its job is "find the method you want". The five family cards at the top do that job well.
The `:::method-index` block below them expands every entry into a full row, so a reader on
a phone scrolls ninety screens, cannot jump to a letter, and cannot narrow the list.

**The fix.** Keep the cards and the marker. Make the index skimmable at a narrow width:
either a letter rail that jumps to the entry's anchor, or per-letter `<details>` groups with
the first letter's group open — no script, because a reader with scripting off must still
reach every method. At a wide viewport the same markup reads as the current two columns.

**Done means**

- [ ] the default state of `/techniques/` at 390 px is measurably shorter than today, with
      the measurement in the closing note.
- [ ] every one of the 77 methods is still reachable and still carries its anchor, with
      scripting off, and the A–Z index still lists each name once.
- [ ] `:::method-index`'s hook and its test are updated together, and the marker's
      documentation in `engine/AGENTS.md` matches the new markup.
- [ ] no colour and no script is added; the page passes `audit site --mobile`.

## 192 — The offline check fetches a loader URL that cannot exist, so its own probe is dead

**What is wrong.** `tools/src/commands/offline.ts` builds the file it fetches to warm the
runtime cache as

```js
const loader = target + "assets/figures/figures.js";
```

where `target` is the route itself (`route.replace(/[^/]*$/, "")` leaves a trailing slash
alone). For the route the check samples by default that is
`/a-level-maths/chapter-1/section-1.3/learn/assets/figures/figures.js`, and no build has a
file there: the loader lives at `/a-level-maths/assets/figures/figures.js`, one book root up,
and the page reaches it relatively (`../../../assets/figures/figures.js`).

Measured on this tree: `ls site/a-level-maths/chapter-1/section-1.3/learn/assets` → no such
directory, while `site/a-level-maths/assets/figures/figures.js` exists. So the fetch 404s, and
the loader that lands in the runtime cache is the one the page's own `<script src>` asked for.

The check still answers its question, because a page that lost its loader would fail. What is
wrong is that the probe written out in the source is not the thing being measured: a page that
imported a loader from somewhere else would pass on that import alone, and the 404 is silent.

**The fix.** Resolve the loader from the page, the way `kit` already does:
`figureAssets()` in `tools/src/lib/routes.ts` reads the page's own `src` and names the file.
Fetch that URL and drop the hand-built concatenation. A page that mounts no figure should be
reported as such rather than fetching a path that cannot exist.

**Done means**

- [ ] `offline` fetches the loader URL the page itself names, and no route-plus-path
      concatenation for `figures.js` remains in the file;
- [ ] a planted page that names its loader at an unusual path has that path fetched, and a
      page with no loader fails with the message it gives today;
- [ ] `node tools/dist/cli.js offline site` still reports 6 cache checks, 0 errors, and
      `scripts/preview-themes.sh` is green.

## 200 — The mandated common-error callout has no signature beyond a 40px indent

**What is wrong.** Every common-error *Watch out* callout and every *Check* prompt is a plain
`<blockquote>`: measured `margin: 0 40px`, `padding-left: 0`, `border-left: 0px none`,
`background: transparent`, `::before: none`, body ink (3/3 on a Learn page). The only rule
touching them, `extra.css:93-95`, sets a max width. The chapter formula *requires* a common-error
callout on every Learn page, so the mandated pedagogy's only marker is 40px of indent — which
also costs the reader 40px of the 70ch measure.

Over `books/*/docs/**/*.md`: **5,030** blockquote lines, of which **757** open `> **Watch out.`
and exactly **1** opens `> **Check.**` — 758 callouts and **4,272** quotations that a blanket rule
would repaint. The marker must match the bold lead *exactly*: `books/a-level-maths/docs/Chapter 1/Section 1.3/Walkthrough/index.md:123`
is `> **Checking forever.**`, which a prefix match on `Check` would misclassify.

**The fix.** Staged. (1) A build hook that turns a blockquote whose first inline is exactly
`**Watch out.**` or `**Check.**` into `<aside class="callout callout--error|callout--check">`, with
a test that the count is 758 and the other 4,272 quote lines are untouched. (2) A **neutral** signature — `1px`
`--tb-rule` border, `3px` `--tb-rule` left rule, `var(--tb-radius)`, `0.6rem 0.95rem`
padding — the shape `.prove` (`extra.css:466`) already uses, which cannot change any contrast
ratio. (3) Only if a measured review still asks for it, the error callout alone takes
`--tb-fig-warn` on the left rule and a 6% tint, drawn on the element box and never a `::before`,
because `preview --audit` is blind to pseudo-elements. Plan: P1; the hue question is D1.

**Done means**

- [ ] a Learn page shows its common-error callout as a distinct block in both schemes;
- [ ] the before/after pair is re-rendered at 1280 and 390 in both schemes (the frames described
      in `ux-plan.md` §3) and the after reads as a block a reader can find while scanning;
- [ ] the hook's test reports 757 + 1 classified and the other 4,272 quote lines untouched;
- [ ] if the tint is taken, `preview --audit` passes for the six bundles in both schemes;
- [ ] no figure changes, and `tests/test_figures.py` is untouched.

## 201 — Cards-mode table cells are smaller than the prose that explains them

**What is wrong.** At ≤60rem a `table--cards` body cell is `0.78rem` = 12.48px on
`line-height: 1.3` with `padding: 0.05rem 0` = 0.8px, and its `::before` label is `0.7rem` =
11.2px (`extra.css:171-184`); only the first cell is `0.92rem` = 14.72px, which is the number the
probe reports. The header row is clipped, so all the context lives in the 11.2px labels.

**The fix.** Body cells `1rem` (16px) on `line-height: 1.45` with `padding: 0.15rem 0`; labels
`0.85rem` (13.6px) — the cell reaches the size report's reading floor instead of sitting two steps
under the prose. No colour.
Plan: P5.

**Done means**

- [ ] at 390 the value text is ≥16px, the label ≥13.6px, the row padding ≥4.5px;
- [ ] the block's 140px height budget is re-measured at the new size, not assumed;
- [ ] the size report of 209 covers `table--cards td` and passes both schemes.

## 203 — All twelve practice answers sit behind one disclosure

**What is wrong.** `engine/src/textbook/verify/render.py:151` wraps the join of every answer in
one `<details>`; measured on `/practise/`: 12 `<ol>` items, one summary "Answers and concise
solutions", a 46-line body. To check answer 9 the reader opens and scrolls everything, which
undercuts the retrieval the page is for. (The first draft of the plan claimed "the title the
renderer already knows"; `render.py:104-110` builds a label from `answer_label` or the whole
statement, and no problem carries a title.)

**The fix.** One `<details>` per item, its summary `9. Show the answer`, grouped under a labelled
section — what `npm run guidance -- retrieve accordion` asks for. Nothing else is invented.
Plan: P4.

**Done means**

- [ ] answer 9 is one tap from item 9, and each summary names its own number;
- [ ] no answer text, working or ordering changes, and the bank tests still pass;
- [ ] `tests/test_render_hooks.py` asserts the summary/item pairing.

## 204 — Nineteen font sizes, and the ladder says nothing

**What is wrong.** `extra.css` declares 19 `font-size` values: 16 distinct `rem` values from
`0.66rem` to `1.1rem` plus three `em`/px outliers. One Learn page paints nine sizes and twelve
size/weight combinations (34/700, 25.5/700, 19.89/700, 17/400, 17/700, 17.85/400 MathML, 16/400,
18/400, 14/400, 13.6/400, 12.8/400, 17/600), so nothing distinguishes a label from an aside from
prose.

**The fix.** The body stays at 17px (`extra.css:77`) and the outliers collapse **onto** it: reading
text `1.0625rem`, label `0.85rem`, small label `0.78rem`, headings unchanged. Do not shrink the
body to 16px: that contradicts 197, 201 and 202 in the same queue and is the wrong direction for
this reader. No colour. Plan: P9.

**Done means**

- [ ] `grep -oE 'font-size: *[0-9.]+rem' extra.css | sort -u` reports ≤8 values;
- [ ] the body still computes 17px, and the Learn-page inventory reports ≤5 combinations outside
      MathML;
- [ ] a `pre` block, a table, the booklet, print and `maths-figure figcaption` are photographed at
      390 in both schemes before and after.

## 205 — The spacing contradicts the hierarchy

**What is wrong.** `extra.css` uses margins of 0.4, 0.5, 0.6, 0.8, 1.1, 1.2, 1.3 and 1.4rem plus
`0.8rem 0 0.4rem`. Measured on one Learn page that lands as gaps of 17, 21, 22 and 23px, and a
heading sits **21px** from its own paragraph while a paragraph sits 17px from the contents panel.

**The fix.** Scoped, so it cannot reach headings outside the article:
`.md-typeset h2, .md-typeset h3 { margin: 1.4rem 0 0.5rem }` and
`.md-typeset > p { margin: 0 0 0.9rem }`, with the outliers collapsed onto 0.25 / 0.5 / 1 /
1.4rem. No colour. Plan: P10.

**Done means**

- [ ] every heading→text gap is smaller than every text→heading gap in the probe's rhythm list;
- [ ] no two adjacent gaps differ by 1px;
- [ ] headings outside `main.md-typeset` are unchanged (check the booklet panel and print).

## 206 — A `fig-*` name is unexamined, and four modules use one that does not exist

**What is wrong.** `tests/test_figures.py:434` (`text_classes_in`) polices `text-*` only. Most
`fig-*` names are structural and the kit owns them (`fig-caption`, `fig-control`, `fig-controls`,
`fig-hidden`, `fig-part-button`, `fig-parts`, `fig-question`, `fig-row-active`, `fig-segment`,
`fig-table`, `readout`), but **four modules** set `fig-note` — `ch9-change-of-sign.js:86`,
`ch9-cobweb.js:137`, `ch9-newton-raphson.js:119`, `ch9-trapezium.js:103` — which no stylesheet and
no kit layer defines. Today those are HTML labels, so they inherit body ink and adapt by luck; the
day one is an SVG `<text>` it is the initial-black defect `extra.css:341-350` records.

**The fix.** A check over both prefixes that knows the kit's structural classes and the CSS's
colour classes and flags anything in neither. Then make the four labels `text-ink`. Plan: G2.

**Done means**

- [ ] the check fails on `fig-note` and passes once the four are changed;
- [ ] a colour class defined in extra.css with no user also fails;
- [ ] the kit's structural classes are named in one list, with the file that owns them.

## 207 — Nothing reads the booklet badge's colour

**What is wrong.** `grep -rn 'bk-badge'` finds only the JS emitter and the CSS, so no test would
notice 196 — which is why the swapped tokens shipped and stayed.

**The fix.** Assert each badge variant's background resolves to its semantic token, in
`tests/test_themes.py`, for both schemes. Plan: G7.

**Done means**

- [ ] the assertion fails on the un-fixed `extra.css` and passes after 196;
- [ ] the muted variant is asserted to be neutral, not merely "not warn";
- [ ] no colour literal is added to the test.

## 208 — A paint transition would fool the figure audit

**What is wrong.** `extra.css` has zero `transition` and zero `animation` today, so nothing has
ever exercised the question. A `transition: fill` makes `audit site` sample an interpolated
colour — a false pass or a flake — and `tools/src/commands/audit-figures.ts:347` already documents
that a figure which mounts nothing passes every contrast check.

**The fix.** A test that fails any `transition` or `animation` inside a `maths-figure`/`fig-*`
rule naming `fill`, `stroke`, `color`, `background` or a `--tb-*`. `npm run guidance -- retrieve
motion` is the citation: animate `opacity`/`transform`, never paint. Plan: G3.

**Done means**

- [ ] a hand-written violating rule fails the test;
- [ ] `opacity`/`transform` under `prefers-reduced-motion: no-preference` passes;
- [ ] the test names the file and line of the offending rule.

## 209 — Nothing measures type or target size outside a figure

**What is wrong.** The only size floor in the suite is `audit site --mobile`'s 9px for figures.
Nothing asserts a minimum size or target for prose, `table--cards td` (12.48px), `.contents__list
a` (15px), a `details > summary`, or `.search input` (13.6px), which is how those shipped.

**The fix.** One home, `tests/test_type_scale.py`, at 390 in both schemes: reading text ≥16px
(`table--cards td`, `details > p`, `.search input`), labels and captions ≥12px (`td::before`,
`figcaption`, `.fig-parts button`), `.contents__list a` line box ≥22px, and the tab order of a
Learn page and the portal. Two floors, not four, and the same two the other items target.
Plan: G6.

**Done means**

- [ ] the report names each selector, its computed size and its binding floor;
- [ ] it fails at the floor and passes after 195, 197, 201, 202 and 204 — 201 by raising the
      cards cell to 16px, which is the floor this report asserts;
- [ ] it covers text inside `maths-figure`, which `audit site` cannot see.

## 210 — The label-size guard would evaluate the wrong width

**What is wrong.** The obvious static guard,
`(46rem − 2×padding)/520 ≥ 9/16`, is dimensionally wrong: at 46rem it evaluates to ≈1.35 and can
never fire. The binding width is the phone column, not `max-width`, so the assertion that is
supposed to protect the 9px floor protects nothing. `tests/test_figures.py:544` guards the
*written* `size:` (16 units) and only `audit site --mobile` measures the rendered result.

**The fix.** Evaluate at the real phone content width —
`(390 − 2×page-padding − 2×panel-padding) / viewBox-width × SIZE.tick ≥ 9` — and print both
numbers in the failure message. Plan: G4.

**Done means**

- [ ] raising the panel padding to 1.5rem fails with "8.4px at 390";
- [ ] the current tree passes with its measured value printed;
- [ ] the assertion lives beside 209's report, not in a second home.

## 211 — The two figure audits are the two a branch may skip

**What is wrong.** `scripts/check.sh:98,111` runs `check-mobile` and `canvas` but not `audit`;
the paint and phone audits run in `scripts/preview-themes.sh:89,96`, whose CI job
`.github/workflows/verify.yml:601-614` permits to be `skipped` on a branch. `check.sh:113` also
announces a skip when Playwright is absent. So a branch can land a figure-paint regression that
appears only on `main`, and "mandatory" has to mean "fail", not "announce".

**The fix.** Add `audit site` and `audit site --mobile` to `scripts/check.sh`, drop the `skipped`
allowance for the preview job, and add an explicit allowance list for the **43 slugs** the audit
cannot mount (`var/ux-audit/m/paint.json`), each with its reason, so the gate fails on a new miss
and not on the known ones. Plan: G1.

**Done means**

- [ ] a branch with a deliberately broken `fig-*` rule fails `scripts/check.sh`;
- [ ] the allowance list holds 43 entries with their reasons, and a 44th fails;
- [ ] the added run time is recorded in the pull request that lands it.

## 212 — Dark `code_bg` is not a surface, and nothing measures text on it

**What is wrong.** Measured CIE76 distance from `paper` in the dark scheme: clean 4.1, editorial
4.5, glass **1.9**, harbour 3.4, neon 6.6, phosphor **1.6** — so a code block in glass or
phosphor dark reads as the page rather than as a second surface. Light `code_bg` is 3.2–6.1 for
comparison. No test asserts anything about `code_bg` (`book.py:60` is its only mention), and the
audit's own header says it measures text backgrounds, not surfaces.

**The fix.** Add the invariant before touching the palette: `ΔE(paper, code_bg) ≥ 3` per bundle
per scheme, and ink on `code_bg` ≥ 7:1. Then move glass and phosphor's dark value by the smallest
amount that clears both, chosen by the implementer and measured with `preview --audit`. Plan: P14.

**Done means**

- [ ] both new assertions pass for six bundles × two schemes;
- [ ] the two moved values and their measured distances are recorded in the commit body;
- [ ] `preview --audit` passes, and no other token moves.

## 213 — Warn and good are distinguishable by hue only

**What is wrong.** Simulated for a deuteranope (Machado severity 1.0), the pair collapses in glass
light (ΔE 4.9 against 82.1 normal) and neon light (5.8 against 91.5); eight of twelve
bundle×scheme pairs are marginal, and `npm run guidance -- retrieve color` states the rule:
"don't use color alone to indicate state". The concrete case is
`books/a-level-maths/docs/assets/figures/ch8-antiderivative-family.js:90,98` — a secant
`fig-warn` and a tangent `fig-good` on one axes with no other difference — whose readout at `:106`
says "The orange line is f of x equals 2x". Corpus counts: 243 `fig-warn` + 151 `fig-good` = 394.

**The fix.** A non-hue difference only where colour is the only signal (that pair and its
siblings), not on every warn stroke — and **not a dashed stroke**: `assets/figures/src/kit/draw.ts:532`
already gives a dash the meaning "guide". Use a marker or a weight. The readout prose names the
role: "The straight line is f of x equals 2x." Plan: P15.

**Done means**

- [ ] every warn/good pair is distinguishable in greyscale;
- [ ] `grep -rn 'the (orange|green|red|blue) line' books/` is empty;
- [ ] `readout site --verify`, `canvas site` and `audit site --mobile` pass.

## 214 — Three figure modules paint colour outside the figure classes, in four places

**What is wrong.** Four colour reads across **three** modules: `ch16-point.js:49`,
`ch4-fraction-strip.js:47-49` (two reads in three lines) and `ch7-scale.js:22` set
HTML `background`s to `--tb-fig-accent`, `--tb-fig-warn`, `--tb-ink` and a `color-mix` — a breach
of "nothing in a figure may carry a colour", and `tools/src/commands/audit-figures.ts:409-417`
reads SVG `fill`/`color` only, so those bars are measured by no gate at all.

**The fix.** Route them through the existing `fig-*` classes on a generated SVG `<rect>`, and
extend the audit to read HTML `backgroundColor`/`background-image` inside `maths-figure`, failing
on a `var()` it cannot resolve. Land after 211, or the extension is unmeasurable. Plan: P18.

**Done means**

- [ ] the three modules use only `fig-*` classes;
- [ ] the extended audit fails if a `var(--tb-*)` background is reintroduced in a figure;
- [ ] `audit site` passes for the three figures in both schemes.

## 215 — The portal leaves two blank columns beside a single-card group

**What is wrong.** `.cards` is `repeat(auto-fill, minmax(280px, 1fr))` (`portal.css:140`);
measured at 1280 it makes three 321.3px tracks, and the groups that hold one card (Junior Cycle,
Misc) leave two empty cells. It is cosmetic — no reader is blocked by whitespace — which is why
it is not in the ranked plan.

**The fix.** Cap the track so a lone card stays card-sized: `minmax(280px, 26rem)`. Do not use
`auto-fit`, which would stretch one card to 960px. Plan: §5, not queued there.

**Done means**

- [ ] a one-card group renders a card no wider than 26rem at 1280;
- [ ] a three-card group still fills its row, and the 390px single column is unchanged;
- [ ] no colour, no shadow and no new token is introduced.

## 216 — A print render has never been made

**What is wrong.** `grep -rln "emulateMedia" tests/` finds nothing and the print block
(`extra.css:812-905`) has only ever been read, not printed: `maths-figure` gets
`break-inside: avoid` (`:866`), and the block hides `.sidebar`, `.search`, `.bk-fab`, `.bk-panel`
with `!important`, so a panel added inside a figure could print away unnoticed. The plan dropped
this guard because no print defect had been measured; the gap is real even so.

**The fix.** One Playwright capture with `media: "print"` on a Learn route, asserting the figure's
box is non-zero and that no element inside `maths-figure` is `display: none`. Do it before any
layout change to a figure's box (204, 205). Plan: §7.

**Done means**

- [ ] the capture runs in the gate and stores the PDF/PNG it judged;
- [ ] a rule that hides a figure part in print fails it;
- [ ] a figure taller than one sheet is reported rather than silently split.
