# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

**This file holds open items only.** Closed items are deleted (git history keeps their diagnosis). A new item goes at the next number, with its diagnosis, its fix and its own done-means. Open: **187**, **188**, **192**, **200**, **203**, **217**, **218**, **219**.

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
