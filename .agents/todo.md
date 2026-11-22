# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

**This file holds open items only.** Closed items are deleted (git history keeps their diagnosis). A new item goes at the next number, with its diagnosis, its fix and its own done-means. Open: **187**, **188**, **192**, **200**, **203**, **217**, **218**, **219**, **220**, **221**, **222**, **223**, **224**.

Accepted limitations live where the check that records them lives (`tests/test_verify_coverage.py`, `books/*/curriculum.yaml`), not here.

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
- [ ] the before/after pair is re-rendered at 1280 and 390 in both schemes and the after reads
      as a block a reader can find while scanning;
- [ ] the hook's test reports 757 + 1 classified and the other 4,272 quote lines untouched;
- [ ] if the tint is taken, `preview --audit` passes for the six bundles in both schemes;
- [ ] no figure changes, and `tests/test_figures.py` is untouched.

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

## 217 — The context cleanup stopped at ~20% of the code comments

**What is wrong.** The 2026-11 cleanup deleted the historical corpus (`research/review/`,
`research/curriculum/`, `research/design/`, `research/pedagogy-audit/`, `.agents/planning/`,
`.agents/todo-closed.md`, the two handoff files, `solvers/otkd/HANDOFF.md` and three
documents beside it — 38k lines) and rewrote
the root reference docs (`ideas.md` 56.7k → 3.8k, `SHAPE.md` 22.3k → 4.8k, `DECISIONS.md` 23k →
3.0k, `PROBLEMS.md` 25.2k → 5.1k, `DEPLOY.md` 24.5k → 4.6k, `BOOKLETS.md` 8.5k → 2.0k), cut
every figure module's boilerplate header (275 files, 72 KB) and stripped untyped comments from
the shipped kit (116 → 82 KB, code-identical after minify). Two things did not finish:

- `AGENTS.md` files total **126 KB**, from 177 KB. Each is still 60–75% of its old size, not the
  55% target: `assets/AGENTS.md` 13.5k, `books/gcse-physics/AGENTS.md` 8.0k,
  `books/numerical-methods/AGENTS.md` 10.5k, `solvers/otkd/AGENTS.md` 6.3k,
  `solvers/AGENTS.md` 5.1k, `books/ie-lc-maths/AGENTS.md` 2.8k, and the four small Irish/book
  files are untouched.
- Comment lines in code are down ~20%, not 50%: `engine/src/` 1221 → 936, `tools/src/` 1355 →
  1157, `tests/` 1105 → 873, `assets/` 2829 → 2276. Biggest remaining: `tools/src/lib/browser.ts`
  (99), `commands/preview.ts` (87), `commands/offline.ts` (86), `commands/assets.ts` (70),
  `lib/routes.ts` (69), `engine/src/textbook/book.py` (62), `portal.py` (50), `assets/booklet/booklet.js`
  (200), `assets/sw.js` (120), `assets/figures/src/kit/text.ts` (192), `frame.ts` (177),
  `controls.ts` (172), `tests/test_book_structure.py`, `test_pwa.py`, `test_render_hooks.py`,
  and `scripts/*.sh`.

**The fix.** Continue the same pass, one file at a time, with the rule that is already in the
tree: keep every normative instruction, path, threshold, trap and `JSDoc` tag; delete history,
rot-prone counts and restatement. A script cannot do it — a 900 s agent pass compresses roughly
one 15 KB file, so budget one file per pass.

**Done means**

- [ ] `find . -name AGENTS.md | xargs cat | wc -c` ≤ 90,000;
- [ ] the comment-line counts above at least halve in `tools/src/`, `engine/src/`, `assets/` and
      `tests/` (`python3` count of lines starting `#`, `//`, `*`), with `compileall`, `node --check`
      and `node tools/dist/cli.js types` clean;
- [ ] `git diff` after the pass changes no code line: the AST check
      (`ast.dump` with docstrings stripped, and esbuild `minify` for JS/TS) reports no difference;
- [ ] `python -m pytest tests/ -q` passes.

## 218 — the SVD diagnosis takes a rank tolerance it does not pass to the rank test

**What is wrong.** `solvers/otkd/src/open_textbook/otkd/solvers/svd.py` declares
`diagnose(..., rtol: float = 1e-9)` and uses `rtol` only to decide which dependent rows
it names. The rank comes from `left_null(jac, rtol=1e-10)`, a different, hard-coded
number. A caller who changes `rtol` to examine a borderline rank still gets the `1e-10`
rank, while `Diagnosis.rank` and `Diagnosis.dependent_rows` read as if one decision
produced both. The same object then reports a rank and a row set chosen by two
different thresholds.

**The fix.** Decide which number governs rank and make the API say so. The smallest
change is `left_null(jac, rtol=rtol)` with the default moved to `1e-10`. If the two
thresholds are genuinely different questions, name them `rank_rtol` and `row_rtol`,
document what each controls, and let the caller set both. Pin the choice with a test at
a singular value that straddles the cutoff, so a later refactor cannot silently move
it.

**Done means**

- [ ] the rank and the named dependent rows both follow the documented argument, or the
      two arguments are separate and documented.
- [ ] a test fixes the rank at a singular value chosen to straddle the cutoff.
- [ ] `uv run --project solvers/otkd pytest -q` passes.
- [ ] `docs/problem-mapping.md` states which tolerance governs which decision, if the
      public signature changes.

## 219 — most Review pages carry no verified answer block

**What is wrong.** Chapters 1-6 of `ie-lc-physics` now render their questions and
answers from `problems/chapter-NN-review.yaml`, and the verifier proves every one.
Every other Review page either has no answers or has hand-written ones.

```
$ for f in books/*/docs/Chapter\ */Review/index.md; do
    grep -q ':::answers' "$f" || echo "$f"
  done | awk -F/ '{print $2}' | sort | uniq -c | sort -rn
     24 gcse-maths
     22 ie-jc-maths
     18 ie-lc-maths
     16 ie-lc-physics
      9 ie-lc-applied-maths
      5 a-level-maths
      1 maths-applied
```

The maths books are not empty: `gcse-maths` and `a-level-maths` wrap their
answers in a hand-written `<details>` block, so no verifier has seen the
arithmetic, and the block cannot be regenerated when a question changes. The
brief that commissioned the pilot said the gap was only the Irish books; the
count above says otherwise.

**The fix.** Take one chapter at a time, as the pilot did. Move the questions
and the answers into `books/<id>/problems/chapter-NN-review.yaml`, one record per
question, using the check kind that fits (`convert`, `dimensions`, `sigfigs`,
`uncertainty`, `gradient`, `intercept`, `area`, `evaluate`/`approx`) and a
`structured` component wherever the question asks for a judgement. Re-derive
every number rather than copying it from the old answer block. Replace the list
with `:::problems <bank>` and `:::answers <bank>`, and change nothing else on
the page. Never invent a numeric check for a judgement: say in the bank comment
what the oracle cannot prove.

**Done means**

- [ ] every `books/<id>/docs/Chapter */Review/index.md` renders its mixed practice
      from a bank, with no hand-written answer block left behind.
- [ ] `uv run python -m textbook.verify books/<id>/problems/` reports `ok` for every
      file, and `uv run python -m textbook.lint` reports nothing.
- [ ] each book's profile builds with no `math-error` page, and no page text changes
      except the two marker lines.
- [ ] the bank comment on each Review names the question, if any, whose judgement
      the verifier cannot prove.

## 220 — Tier-excluded section references survive in plain text

**What is wrong.** The tier hook unlinks a markdown link to a page the profile drops,
but a plain `Section n.m` reference is left alone and the build still passes. Measured
on 2026-11-22: 172 references to a section above the page's tier across the six tiered
books, 82 of them in `ie-lc-maths`. `Chapter 2/Section 2.1` is an F page and sends the
reader to 2.5, which is H; `Chapter 17/Section 17.2` is an O page and says the proof is
"one click away" in 17.7, which that build does not contain. The reader is told to
follow a route that is not there.

**The fix.** Extend the tier hook (or add a lint rule) to find `Section n.m` and
`§n.m` in the body, strip inline `<!-- tier:h -->` spans first, and rewrite or remove a
reference to a section above the page's profile. Start with `ie-lc-maths`, where the
two examples are, then apply the same rule to the other tiered books. A reference
inside a sentence that already says "Higher only" can stay if it does not promise a
link.

The gate is now in `tests/test_content_contracts.py` (`TIER_DEBT`, 115 references:
2 `gcse-maths`, 5 `ie-jc-maths`, 14 `ie-lc-applied-maths`, 75 `ie-lc-maths`, 19
`ie-lc-physics`). It counts only plain prose references, after inline tier spans and
markdown links are removed; a new one fails. The remaining work is to rewrite the
115 and lower the ceiling to 0.

**Done means**

- [ ] a test scans every page at its own tier, with tier spans stripped, and fails on a
      plain reference to a section that profile excludes.
- [ ] the two examples in `ie-lc-maths` 2.1 and 17.2 are rewritten and read correctly
      in both the Foundation/Ordinary and Higher builds.
- [ ] the other tiered books are scanned, and their debt is either fixed or recorded in
      the same test with a ceiling that may only go down.
- [ ] `python -m pytest tests/ -q` and every profile build pass.

## 221 — the phone drawer costs 0.74 CLS when the script closes it

**What is wrong.** The drawer ships `open` in the markup so a phone reader with scripting
off keeps the navigation, and the module script at the foot of the page closes it below
60rem. Closing it moves the whole main column up, after the content has been painted.
Measured with Playwright at 390×844 on
`/gcse-maths/higher/chapter-1/section-1.1/learn/` (Chrome 153, service workers blocked,
window load plus 1.2 s): cumulative layout shift **0.822**, of which **0.738** is one
entry at t = 354 ms whose only source is `MAIN.content` moving from y = 0 to y = 196.
With the drawer's inline module removed the same page measures **0.056**, and the drawer
stays at y = 2515 where the reader can see it. The number is identical with cross-document
transitions on and off, so it is not the motion work: it is the close itself. Google's
"good" threshold is 0.1.

**The fix.** The close is the shift, so move the work rather than the drawer's default.
The cleanest is to put the drawer after `main` in the DOM and give the wide layout a grid
area above it, so a phone collapse cannot move the content; the wide layout is unaffected
because the sidebar is a grid column there. A second option is to keep the drawer before
`main` and reserve its measured height for the first frame, then release it after the
script has decided, but that still animates a jump. Do not drop `open`: a phone reader
with scripting off then loses the only navigation on the page.

**Done means**

- [ ] Playwright at 390 on a Learn page, a Practise page and a figure page measures CLS
      below 0.1, with reduced motion on and off.
- [ ] a phone reader with scripting off still sees the drawer open and can walk the
      chapter; the drawer still closes to `Contents` at phone width with scripting on.
- [ ] a test records the measurement rather than asserting the fix in prose.

## 222 — The books' own corners and pills were left outside the editorial wave

**What is wrong.** Wave 4 (U14) gave the portal one radius and removed its pills, but
the books' shared sheet kept its own set. Measured on 2026-11-22 in
`assets/stylesheets/extra.css`: `border-radius` takes 3px (2 rules), 4px (3), 6px (6),
12px (1), 16px (2), 999px (4) and one 0; `settings.css` ships three 6px corners
against the portal's 8px token; `engine/src/textbook/css/shell.css` has a 6px and a
0.6rem. The figure lab's part buttons (`.fig-parts button`) and the booklet's chips
(`.bk-chip`) and meta tag (`.bk-item__meta`) are 999px pills — the same shape U14
removed from the front door. The handoff (§7, note 4) said to keep the wave to the
portal and the chapter opener and queue the rest rather than redesign everything at
once.

**The fix.** Replace every *surface* radius in `extra.css` and `settings.css` with
`var(--tb-radius)`, and keep the micro-radii (inline code, `pre`, a table corner) only
where a square corner would read as a rendering error, with the exception named in a
comment. Turn the figure lab's part buttons and the booklet's chips into the same
underlined link or square label the portal now uses, or drop the radius and keep the
control's hit area. Extend
`tests/test_measure.py::test_the_radius_is_declared_once_and_agrees_with_the_portal` to
assert both shared sheets use the token plus the documented micro set, and that no
`999px` survives.

**Done means**

- [ ] `grep -rn "border-radius" assets/stylesheets/ engine/src/textbook/css/` shows
      only `var(--tb-radius)` and the documented micro set.
- [ ] no `999px` remains in any shared stylesheet.
- [ ] the radius test covers both sheets, and fails on a hard-coded value.
- [ ] `scripts/preview-themes.sh`, `node tools/dist/cli.js targets site` and the figure
      audits stay green.

## 223 — a bank question marked Higher-only still reaches a Foundation reader

**What is wrong.** `:::problems` and `:::answers` render every record in the bank,
whatever its `tier`. `engine/src/textbook/verify/render.py → render_problem_list`
only *marks* an `H` record with **H**; `engine/src/textbook/hooks/problems.py →
select()` takes `page` and `config` and uses neither to filter. So a `tier: H`
record on an F page ships to the Foundation build, where the reader sees
"**H** Solve ..." instead of the section being absent.

Measured on 2026-11-22, after Chapter 9 of `gcse-maths` moved onto
`problems/chapter-09-review.yaml` (questions 6 and 7, quadratic inequalities,
Section 9.6, `tier: H`):

```
$ grep -o 'H Solve (x+1).*' var/check-foundation/chapter-9/review/index.html
H Solve (x+1)(x−4)≥0 ...
```

The page had wrapped those two questions in `<!-- tier:h -->`, so the Foundation
build used to drop them. The same leak already exists in
`books/gcse-physics/problems/chapter-10-review.yaml`, which has two `tier: H`
records behind a single `:::problems chapter-10-review`.

**The fix.** Give `select()` the build's included tiers (`hooks/tier.py →
included_tiers(config)`, which already resolves the profile's `tier_filter`) and
drop every record whose tier the build does not include, before numbering, so the
list and the answers block stay in step. A page whose whole bank is excluded
should fail loudly, naming the page and the bank: that page needs `tier: H`
front matter, not a silently empty set. Do not "fix" it by leaving higher content
in place.

**Done means**

- [ ] a bank with F and H records renders only the F question on a Foundation
      build, numbered from 1, and both on a Higher build.
- [ ] `var/check-foundation/chapter-9/review/index.html` contains neither
      quadratic inequality, and the Higher build still contains both.
- [ ] `books/gcse-physics/docs/Chapter 10/Review/index.md` no longer ships its two
      `tier: H` questions to the Foundation profile.
- [ ] a test builds a small bank with both tiers through the hook and asserts the
      filter, including the all-excluded failure.

## 224 — Chapter 6 of `gcse-maths` shows 51 Review questions and six answers

**What is wrong.** Chapter 6 was the one Review page already rendering from banks,
but it does so by dumping five whole practice sets and answering almost none of
them:

```markdown
:::problems chapter-6-practice-6.1   ... :::problems chapter-6-practice-6.5
:::answers chapter-6-practice-6.1#p8-compare-methods
:::answers chapter-6-practice-6.2#p10-two-step
:::answers chapter-6-practice-6.3#p8-compare
:::answers chapter-6-practice-6.4#p5-compare,p9-meaning
:::answers chapter-6-practice-6.5#p7-comparison
```

The five banks hold 51 records between them, so 45 of the questions the reader is
asked have no answer in the Review. The page also repeats questions that already
appear on the chapter's *Practise* pages.

**The fix.** Decide what the Chapter 6 Review is for, then make one bank for it:
either a curated `problems/chapter-06-review.yaml` of the mixed set the page
promises (one record per question, every one answered), or, if the practice sets
really are the Review, list every rendered id in the answers markers. A curated
bank is the better answer; it also stops the Review duplicating the practice
pages. Keep the page's prose and choose questions already in the banks so the
mathematics does not change.

**Done means**

- [ ] every question on `books/gcse-maths/docs/Chapter 6/Review/index.md` is
      answered in the same rendered block, with no `#id` selection hiding one.
- [ ] the page calls one review bank, not five practice banks.
- [ ] `python -m textbook.verify books/gcse-maths/problems/` reports `ok` for it.
