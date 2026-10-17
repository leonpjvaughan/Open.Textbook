# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

**Two queues, and this is the one that holds defects.** An item here is something
wrong: a broken check, a wrong count, a page that ships a lie. The *interactive-aid
backlog* — which figures and interactions a book still wants — is `ideas.md`, which is
a plan rather than a defect list, and is written for the author choosing what to build
next. An item here may point there rather than restating it.

**Finished items move to `.agents/todo-closed.md`, in full.** That file was 3,575 lines
and 61 items, of which 57 were closed; reading it to find the four open ones was the
work. Splitting it means this file is the queue and that one is the record. Nothing is
compressed on the way across: the diagnosis — what was wrong, how it was measured, what
fixed it — is the valuable part, and a one-line summary of it keeps the number and
deletes the reasoning.

The list below is the index. A closed item's line stays here and its section is in the
archive; the two are kept in step by the `**done**` marker in the heading, which is what
the split is derived from.

- [x] 1. Theme menu — reader settings in the header (book pages and the landing page, one runtime)
- [x] 2. Custom domain — `open-textbook.org` resolves
- [x] 3. `www` redirect — DNS imported, rule live, 301 with path and query preserved
- [x] 4. Zone security and response headers — DNSSEC complete, CAA verified and enabled; only the CAA import and Bot Fight Mode left
- [x] 5. Worker version URLs closed; rollback is a manual workflow, command recorded
- [x] 6. Crawlability: our own `robots.txt` and a sitemap index
- [x] 7. Account, credential and dependency hygiene — 2FA, registrar lock, token rotation, secret scanning, Dependabot, recovery
- [x] 8. One site, two renderers — decided: the bespoke pipeline replaces MkDocs
- [x] 9. Nothing says which commit is live
- [x] 10. Accessibility: turn the claims into checks
- [x] 11. Licence, colophon and a way to report an error
- [x] 12. Installable and printable
- [x] 13. Improve the maths book content — audits done and gated; the deferred rewrites are the programme
- [x] 14. Two figure modules break the figure contract
- [x] 15. `extra.css` and `portal.css` declare literal colours
- [x] 16. Material keyboard gaps found by the audit
- [x] 17. Text drawn on the accent is not AA
- [x] 18. Theme bundles — six original light/dark groups; the third-party palettes replaced (see DECISIONS.md)
- [x] 19. The pipeline's 404 page declares literal colours
- [x] 20. The pipeline ships no Formulae booklet and no `book-local.css`
- [x] 21. Recheck and verify — what the theme work could not settle (only the landing-page sample is thin, and it needs a second book)
- [x] 22. Follow-ups from the MkDocs deletion
- [x] 23. Stale theme references in the out-of-scope preview files
- [x] 24. Animated backgrounds on the vivid themes — deferred by the author
- [x] 25. An iOS home-screen icon (`apple-touch-icon`) — shipped, with the drift guarded
- [x] 26. Declare the ready state — published 2026-10-11, release 26.284.0

Items 27 onward were added after this list was written and had no line here, so the
file could not answer "what is left?" without reading every section. They are listed
now, and the four marked open are the ones verified open on 2026-10-17.

- [x] 27. A-level Mathematics — scaffolded; booklet and verifier outstanding
- [x] 28. GCSE Physics — research done, book not started
- [x] 29. A-level Physics — research done, book not started
- [x] 30. A physics oracle — **done, and in use**
- [x] 31. A book's `AGENTS.md` could shadow its parent's
- [x] 32. A-level Mathematics formulae booklet
- [x] 33. The colophon's attribution links were hard-coded to GCSE
- [x] 34. The scaffold did not create `problems/` for a new book
- [x] 35. Edexcel's current physics equations/inserts were not retrieved
- [x] 36. The A-level physics booklet transcribes the core only
- [x] 37. `kilogram` was reported as a US spelling, and the fix was a no-op
- [x] 38. A bank record whose check renders no answer
- [x] 39. `uncertainty: add-percentages` could not model a quotient
- [x] 40. A new figure module failed the runtime-LaTeX check
- [x] 41. `dimensions` could not check a magnitude needing a square root
- [x] 42. The internal-words lint flagged the literal phrase "the bank"
- [x] 43. A-level Mathematics Chapter 6 was missing, and the plan thought it was built
- [x] 44. An equations-coverage check needs a declaration the banks do not carry
- [x] 45. The remaining undeclared records, book by book
- [x] 46. Every figure, measured — and the two defects it found
- [x] 47. "Prove it to me" — a proof behind every unproved claim
- [x] 48. Eleven converted GCSE Physics figures gained a slider value display the page never had
- [x] 49. The figure-kit phone-floor guard measured the wrong box, and passed a size that is too small
- [x] 50. `evaluate` cannot check a `solve()` result, so a roots answer must be checked root by root
- [x] 51. The published Irish books serve 2,741 pages that say "Stub"
- [x] 52. A euro sign inside maths renders as nothing, and KaTeX only warns
- [x] 53. An unquoted title with a colon is invalid YAML, and one shipped
- [x] 54. `textbook.verify` stops at the first bank that will not parse, and a short run looks like a clean one
- [x] 55. The home page listed "Higher only" as a tier
- [x] 56. The figure panel's tint was spending the contrast margin
- [ ] 57. The browser runtime has no types, and `tsc` reports 190 errors
- [x] 58. Thirteen loose scripts, five copies of the same browser plumbing
- [x] 59. The figure gaps in four books
- [x] 60. Three Irish books have no booklet, and two of them should
- [ ] 61. A figure's readout can state false working, and no check looks
- [x] 62. The linter printed its findings and exited 0
- [x] 63. `test/` sat one letter from `tests/`, and held the last loose script
- [x] 64. The booklet gap was measured at the top level only
- [ ] 65. The booklet has no modulus form, and does not define λ
- [ ] 66. 137 of 250 figure modules hand-write a `<text>` element

---

## 13. Improve the maths book content — **done**

**Closed 2026-10-17.** All four of its own done-means are met and were already
marked `[x]` in the item: the pedagogy audit ran over all 25 chapters and is recorded
in `research/pedagogy-audit/`, every finding is fixed or deferred with a reason,
Chapters 7, 19, 23 and 24 stand as the rebuilt reference, and everything the audit
found more than once is a lint rule or a test. The heading was the only thing still
saying otherwise.

**What it leaves behind, and it is not nothing.** The deferred rewrites are ranked in
`research/pedagogy-audit/README.md` — Chapters 19, 23, 24, 5 and 15. They are a
programme rather than a defect, and the item's own words are the reason to leave them
where they are: "this is a programme, not a single change: it re-runs on the next
book". A queue of open items is the wrong home for work that re-runs.

**This is the product.** Every other item in this file is about shipping it; this
one is about the thing being shipped. `AGENTS.md` states the chapter formula,
`research/pedagogy.md` maps each principle to its evidence, and `.agents/skills/`
now carries the method as five skills: `author-textbook-chapter`,
`write-textbook-prose`, `build-practice-set`, `build-guided-figure` and
`verify-textbook-change`.

**State (checked 2026-10-11).** The book is structurally complete, so this is not
about coverage:

- 25 chapters, 133 sections, with 133 Walkthrough / Guided problems / Problems
  pages and 25 Reviews. No `<!-- scaffold:stub -->` markers remain.
- 138 `:::problems` / `:::answers` marker pairs, 139 verified banks.
- **`textbook.lint` already enforces the structure.** Every chapter has
  `## The chapter problem` and `By the end of this chapter`; every Walkthrough has
  `You should now be able to` and `Watch out`; every Guided problems page has
  `Warm-up: remember`; every Problems page has both markers.
- All 133 Walkthroughs do carry a `> **Watch out.**` misconception callout.

So the gap is exactly the part a linter cannot see — the **pedagogy audit** in
`verify-textbook-change`, which is manual by design.

**What is unchecked, and is the work.**

- **Fade (P1).** Lint proves a hint block exists, not that support *withdraws*:
  worked example → partial example → hint → independent. It also cannot see a
  Walkthrough that opens with an unguided task a novice cannot start.
- **The chapter problem (P2).** Lint proves one is *stated*. It cannot prove it is
  *returned to* at 2–3 checkpoints and *resolved* on the Review page.
- **Relevance (P3).** Whether the chapter asks the reader to construct their own
  connection, or merely asserts the topic is useful.
- **Interleaving (P5).** Whether later Problems pages mix earlier topics and ask
  "which method applies, and why?".
- **Guided figures (P6).** Only **27 `:::figure` uses across 25 chapters** — about
  one per chapter — and nothing checks the Predict → Test → Explain shape.
  **`ch5-map-scale` is wired to no `:::figure` directive at all.**
- **Correctness.** The verifier proves the bank algebra, not the method and not
  the teaching.

**Method.** Work chapter by chapter, with the skills in order:

1. `verify-textbook-change` — run its pedagogy audit over the chapter, unmodified,
   and record the findings. The measurement comes before any edit.
2. `author-textbook-chapter` — revise against the two arcs and the six principles.
3. `write-textbook-prose` for the voice, `build-practice-set` for the practice and
   its bank, `build-guided-figure` where a figure is missing or unguided.
4. Re-run the audit, then `scripts/check.sh`.

**Cheapest first pass:** the audit across all 25 chapters, recorded in one place,
so the fixes are chosen by evidence rather than by mood. Then rebuild the worst
chapter end to end as the reference for the rest.

**Where it lands.** This is a programme, not a single change: it re-runs on the
next book (physics, then A-level). Anything the audit finds more than once should
become a lint rule or a test, so the floor rises and the manual audit shrinks.

**Done means.**

- [x] The pedagogy audit has been run over all 25 chapters, findings recorded in
      one place — `research/pedagogy-audit/`, two reports plus a README that ranks
      the work.
- [x] Every finding is fixed, or deferred with a reason. Chapter 7's chapter
      problem, the fade in Chapters 19, 23 and 24, Chapter 5's Guided pages, all
      nine repeated warm-ups, eleven answer-printing checks and the five
      mis-ordered figures are fixed. **Deferred, ranked in the audit README:** Chapters 19, 23, 24, 5 and 15 need rewrites; Chapter 7's
      chapter problem is not solvable as set.
- [x] The worst chapters have been rebuilt end to end and stand as the reference:
      Chapters 7, 19, 23 and 24.
- [x] Every `:::figure` follows Predict → Test → Explain, and `ch5-map-scale`
      **wired up**: it is a scale-diagram investigation that matched no page, and
      Section 5.5 — scale factors, diagrams and maps — had no figure. It now has a
      Predict / Test / Explain section, and the book has no unused figure module. Five of twelve render above their own Predict
      prompt.
- [x] Anything the audit found more than once is now a lint rule or a test: the
      `DfE coverage` and `Guided problems` leaks are gated by
      `tests/test_content_hygiene.py`, and a chapter that repeats one warm-up
      across its sections is reported as `structure:guided-warmup-repeated`.

---

## 24. Animated backgrounds on the vivid themes — **decided, not built**

**Closed as a decision, 2026-10-17, and the decision was the author's.** The item says
so itself: "**Deferred indefinitely by the author, 2026-10-12** ... Not a gap to close".
It sat in the open list because its heading carried no marker, not because anything was
waiting.

The reading is that motion competes with a reader's attention on a page whose job is to
make them think, and the collection's own rule is that decoration sits inside the
practice budget. The seam is built (`engine/src/textbook/backgrounds.py`), the
measurements are in `research/design/background-effects.md`, and an effect is a registry
entry rather than a change to the shell — so the decision is cheap to revisit and
nothing is lost by not revisiting it.

**Deferred indefinitely by the author, 2026-10-12.** The design work stands and is
recorded in `DECISIONS.md` and `research/design/background-effects.md`; the seam is
built (`engine/src/textbook/backgrounds.py`) so an effect is a registry entry rather
than a change to the shell. Nothing ships one, and nothing will until a topic needs
one. Not a gap to close: the honest reading of the measurements is that motion
competes with a reader's attention on a page whose job is to make them think, and
the collection's own rule is that decoration is inside the practice budget.

**Decided, not built.** `DECISIONS.md` (2026-10-11) and the measurements in
`research/design/background-effects.md` settle the shape: opt-in, remembered per
reader, on the three vivid themes, and **never a CSS animation** — the CSS
gradient was the worst citizen measured, because it cannot stop (180 ms/s idle,
435 ms/s throttled to 4× CPU), while a WebGL field and a fluid solver idle below
the baseline. The prototypes and the harness are in
`research/design/background-effects/`.

**What remains.** Nothing of it is shipped:

- The effect module, mounted like a figure — a Tier-1 pure-JS module, not a
  plugin, and it must fail to nothing with scripting off (measured: it does).
- A reader preference, alongside `textbook:theme` and `textbook:scheme`, with the
  same origin-wide key discipline, and a control in the Settings overlay.
- `prefers-reduced-motion`, `visibilitychange` and an `IntersectionObserver`, all
  of which the prototypes already do.
- A budget check: the fluid is +22 kB and the field +12 kB, and
  `DOMContentLoaded` must not move.
- The three vivid bundles are `neon`, `phosphor` and `glass`.

**Not a gate.** The site is publishable without it, and the honest prior is that
motion distracts a reader reading mathematics — which is the whole argument for
opt-in.

**Done means.**

- [ ] A reader on a vivid theme can turn a background on from Settings, and it
      survives a reload on the origin-wide key.
- [ ] It stops on `prefers-reduced-motion`, when offscreen, and when the tab is
      hidden; the page is complete without it.
- [ ] The measured addition stays inside ~25 kB and `DOMContentLoaded` does not
      regress against `scripts/measure-budget.cjs`.
- [ ] `scripts/preview-themes.sh` covers the themes that gain it.

---

## 57. The browser runtime has no types, and `tsc` reports 190 errors

**What is wrong.** Every line the reader's browser runs — the figure kit, the loader, the
settings panel, the booklet widget, the service worker — is JavaScript with no type
information. Measured 2026-10-16, with `checkJs` over `assets/` and no other change:

| Config | Errors |
|---|---|
| `checkJs`, `strict` off | **163** |
| `checkJs`, `strict` on | 460 |
| `checkJs`, `strict` + `noUncheckedIndexedAccess` | 475 |

By file, at the current setting: `kit/draw.js` 105, `kit/interact.js` 28,
`settings.js` 13, `kit/controls.js` 9, and seven more in single figures. The errors are
overwhelmingly `TS7006`/`TS7005` — a parameter or variable whose type was never stated —
which is the annotation work itself rather than a defect list.

**What was done, 2026-10-16.** `tsconfig.json` (`allowJs`, `checkJs`, `noEmit`) and
`scripts/check-types.mjs`, which **ratchets**: it passes at 163, fails when the count
grows, and fails when it falls without the baseline being lowered. It is in
`scripts/check.sh`, so it gates. Nothing is compiled and nothing is emitted — the build
still copies these files, so this added a check and no moving parts. `typescript` is a
devDependency.

**What was fixed on 2026-10-17, and the one finding worth keeping.** Two
annotations were worse than none: `axes()` declared `@returns {{draw: string, x:
Function, y: Function, box: object}}`, which threw away the two things a caller needs,
and `line()` and `dots()` had no `@param` at all, so TypeScript inferred their parameter
type from the destructuring defaults. 378 errors to 344, a net decrease of 34 across a
change that *added* a module.

**The count is 353 on 2026-10-17, not 344.** `diagram()` was added and its own
annotation is this item's work, so the baseline went up by 9. A first attempt at the
marks' JSDoc raised it to 365 instead: the insertion script put `@param` inside a
one-line `/** … */`, which TS reads as description text, so the block has to be
multi-line before a parameter can be added to it. Reverted rather than shipped.

**A JSDoc `@param` does not apply to a destructured binding that has a default.**
`axes()`'s `x` and `y` are declared as `@param {AxisOptions} [o.x]` and are still typed
`{}` inside the function, because `x = {}` in the destructuring pattern supplies the
type and the annotation is ignored. `line()`'s `o.x1` *does* apply, because `x1` has no
default. So the reliable form for a destructured option with a default is to destructure
it **without** one and apply the default in the body, or to take the whole object and
destructure inside. Both were tried here and neither is a one-line change, which is why
`axes` is still 23 of the 344.

**The rest of the fix, in the order it pays.**

1. **Annotate the kit's public surface** — the 50 exports in `kit.js`, in JSDoc. This is
   the part the 212 figure modules call, so it is what makes a figure's own mistakes
   visible. `kit/draw.js` alone is 105 of the 163.
2. **Bring the count to zero**, lowering `BASELINE` in the same change each time.
3. **Turn `strict` on** and expect the count to jump to 460. Ratchet again.
4. **Add `books/*/docs/assets/figures/**/*.js` to `include`** — 212 content modules,
   ~27,000 lines. This is the last step, and the one that catches a figure calling
   `label()` with the wrong argument.

**A decision to make, not a task.** The kit is 2,400 lines of primitives with a real
contract, and it is the only part of the runtime that would gain from being TypeScript
properly (`.ts` with an emit step). The 212 figure modules are **content**, they live
inside book trees because a book is self-contained, and they should not move into a
package to be typed — `checkJs` reaches them where they are. So the fork is whether to
convert `assets/figures/kit/` to `.ts` and add an esbuild step, or to keep `.js` +
JSDoc forever. JSDoc first is the cheaper order, and it does not foreclose the other.

**Done means**

- `node scripts/check-types.mjs` reports 0 at `strict: true`.
- `npm run types:list` prints an empty file list.
- The build emits no compiled artefact: `git status` is clean after `scripts/check.sh`.

---

## 60. Three Irish books have no booklet, and two of them should — **done**

**What is wrong.** `BOOKLETS.md`'s target set names only the English qualifications, and
`ie-jc-maths`, `ie-lc-applied-maths` and `ie-lc-physics` have no `booklet/` directory.
Measured 2026-10-17: **252 bank records carry symbols and declare no booklet equation**,
and not one of them can carry a `plays:` while the book has no booklet to resolve against.

| Book | Records | Should it have one? |
|---|---|---|
| `ie-jc-maths` | 87 | **No.** The SEC publishes no booklet for Junior Cycle Mathematics. The reason is "there is nothing to have", and that is worth writing down rather than leaving as a blank. |
| `ie-lc-applied-maths` | 157 | **Yes.** Applied Mathematics is examined with the same SEC booklet. |
| `ie-lc-physics` | 8 | **Yes.** Physics is examined with the same SEC booklet. |

**The source is already in the repository.** `research/sources/ie-lc-maths/` holds
`SEC_Formulae_and_Tables.pdf`, the extracted `SEC_Formulae_and_Tables.txt`, and an
`EXTRACTION-NOTE.md` that records the one thing that matters: the booklet's **CropBox is
612 x 238 pt but its content runs to x = 799 and y = 520**, so a default extraction loses
most of every page. The command that works is

```
pdftotext -layout -x 0 -y 0 -W 900 -H 800 SEC_Formulae_and_Tables.pdf SEC_Formulae_and_Tables.txt
```

and the text already contains the sections the two books need:

| Section | Page |
|---|---|
| Particle physics | 48 |
| Mechanics | 50 |
| Heat and temperature | 58 |
| Light and sound | 59 |
| Electricity | 61 |
| Electrical circuit symbols | 72 |

**Why this is not just a copy.** `ie-lc-maths` reproduces pages 8 to 44 — the mathematics
sections — and stops. The physics sections are pages 48 to 72, so they were never
transcribed. `ie-lc-physics` needs them, and its own `book.yaml` would then declare the
same document under its own `booklet:` key, with the same provenance. A shared file across
two books is the wrong shape: a book is self-contained, and `scaffold` copies per book.

**What it buys.** `ie-lc-physics`'s 8 undeclared records become declarable, and — more
usefully — the physics book gains the reader-facing property the English physics books
have: a page must not ask a reader to recall a formula the booklet supplies. That check is
live for `a-level-physics` (105 items) and `gcse-physics` (101) and absent for this book.

**Done means**

- `books/ie-lc-physics/booklet/ie-lc-physics.yaml` exists, with `meta.provenance` naming
  SEC567/14-V5-Dec2014 and `meta.basis` naming pages 48 to 72.
- `python -m textbook.verify` reports `booklet items > 0` for `ie-lc-physics`.
- Every item is `given`, because the superintendent issues the booklet to every candidate.
- `BOOKLETS.md`'s target set names the Irish qualifications and says which are exempt.
- `ie-lc-applied-maths` either gains the same sections or records why it does not need
  them.

---

## 61. A figure's readout can state false working, and no check looks

**What is wrong.** Two of the fourteen figures added on 2026-10-17 showed a
calculation that does not produce the number printed beside it, and **every check
passed**: `tests/test_figures.py` (structure, colours, slider flags), the build's
math-error scan, `tools audit` (contrast and legibility), `tools kit` (the DOM
contract). None of them reads a number.

- `interest-growth` printed `€1,500.00 × 0.07 × 4 = €390.00`. The rate is 6.5%, so
  the multiplier is 0.065; `fmt(r, 2)` rounded it to 0.07 and 1500 × 0.07 × 4 is
  €420. The total beside it was computed from the exact rate and was right, which
  is what makes it hard to notice.
- `ratio-share` printed `3 × 14.29 = 42.86` where 100 ÷ 7 was already rounded to
  14.29; 3 × 14.29 is 42.87. It triggers on most total/parts combinations.

Both were found by a sub-agent driving the figures in a browser and recomputing
each readout by hand, which is not a check — it is one careful reader, once.

**The fix.** A figure whose readout states a calculation should carry the numbers
it claims as data, so a check can recompute them: e.g. the module exports, or the
readout exposes, the `{ expression, shown }` pairs, and `tools kit` evaluates each
and compares. That is the same contract `check()` already applies to a reader's
answer — an expression and an answer that must agree — applied to the figure's own
working. It is not obviously the right shape for every figure, so the first step
is to measure how many of the 250 modules print a calculation at all.

**Done means**

- The modules that print a calculation are counted, and the count is recorded.
- For those that do, a check recomputes the printed result and fails on a
  mismatch; `interest-growth` at 6.5% and `ratio-share` at 3:4 are fixtures that
  would have failed before the fix.
- `tools kit` (or a sibling) fails, not prints, on a readout whose working is false.

---

## 62. The linter printed its findings and exited 0 — **done**

**What is wrong.** `python -m textbook.lint` returned 0 whatever it found, so
`scripts/check.sh` reported "all checks passed" while **42 findings sat in five
books** — and the repository's own definition of done says the linter reports
nothing for a book. A gate that prints is not a gate.

The findings were under-counted when they were last looked at, because the
whole-repo report was read from its tail, which showed only the last book's one
line. Measured properly: GCSE Mathematics 38 long paragraphs, three Irish
colophons one each, the proof book one long sentence.

**Done (2026-10-17).** 38 paragraphs split at sentence boundaries with the words
asserted unchanged; the three colophons fixed at source (the Irish
`booklet_note` was a YAML folded scalar, which folds every line into one); the
proof-book sentence rewritten. `main` returns 1 when there are findings, and
`tests/test_lint.py` pins both halves: the collection must be clean, and `main`
must exit non-zero when it is not.

---

## 63. `test/` sat one letter from `tests/`, and held the last loose script — **done**

**What is wrong.** `test/theme-preview.cjs` was the last of the thirteen loose
scripts (item 58) and carried its own Playwright resolution, MIME table and route
handler — the duplication the other five browser scripts had already shed. The
directory name was one letter from `tests/`, which is a trap for a reader and a
worse one for a glob.

**Done (2026-10-17).** It is `tools preview` (`tools/src/commands/preview.ts`),
verified byte-identical against the old script on the same routes with the same
three error paths. `serveStatic` gained an `onMiss` callback, because this caller
wants an **abort** on a miss while the audits want a 404: it asserted every route
before the browser started, and a 404 body measured as a page reads as a pass.
`test/README.md` is preserved as `tests/README.md`. `tsconfig.json` gained
`types: ["node"]` and `@types/node`, which took the type count from 227 to 190 —
`tools/` is Node programs that were being checked as though Node did not exist.

---

## 64. The booklet gap was measured at the top level only — **done**

**What is wrong.** `coverage.undeclared` read `check.expression` and
`check.consistency` at the top level of a record, and `kind: all` nests its
sub-checks. So every formula-bearing composite was invisible, and the number
printed was a lower bound presented as a measurement. Item 45's per-book
classification was made against those numbers.

**Done (2026-10-17).** `coverage.expressions` walks the check tree. The honest
counts are much larger — GCSE Physics 0 → 503, `ie-lc-physics` 4 → 337, A-level
Mathematics 273 → 342 — which is the point: the gap is now a measurement. The
same pass declared 193 records in `ie-lc-applied-maths` (157 → 42) now that it has
a booklet.

---

## 65. The booklet has no modulus form, and does not define λ

**What is wrong.** `am7-5-modulus-tension` works with `T = λx/L` for the tension in
an elastic string. The SEC booklet carries `F = −ks`, and Young's modulus
`E = σ/ε`, but never the modulus form and never a definition of λ. The record
declares `hookes-law`, which is the nearest supplied item — so the check passes
while a reader who has not met λ is still asked to know it. Found while declaring
the Applied Mathematics banks (item 61's pass).

**The fix.** Decide which is true: λ is defined on the page that first uses it
(then the page carries the definition and the declaration is enough), or the
booklet gap is real (then the record needs `know`-style treatment, or the page
must not use the form). Then make the page say it.

**Done means**

- `books/ie-lc-applied-maths/docs/Chapter 7/Section 7.5/` defines λ on first use, or
  `am7-5-modulus-tension` no longer uses the form.
- The same question is asked of the other three records the declaration pass
  flagged as near-misses: the projectile range/time/max-height forms, the drag
  laws `D = kv` and `D = kv²`, and the elastic energy-loss formula.

---

---

## 66. 137 of 250 figure modules hand-write a `<text>` element

**What is wrong.** The kit exists so a figure cannot choose a font size or a colour by
accident: `label()` takes a `SIZE` and applies a `text-*` class, and `fig-*`/`text-*`
are what make a drawing follow the reader's theme. Measured 2026-10-17: **137 of the
250 modules write `<text>` by hand**, and while only **3** of those elements carry no
`class` at all — so the black-on-dark trap the kit was built to close is very nearly
closed — the hand-written ones also choose their own `font-size` and their own
positioning, which is the drift `SIZE` was introduced to stop.

**The fix.** Replace each hand-written `<text …>` with `label({ x, y, text, size, class })`.
It is mechanical, and the tests already check the parts that matter (no literal colour,
no unclassed text), so the risk is a visual regression rather than a silent defect.

**Done means**

- `grep -c '<text' books/*/docs/assets/figures/*.js assets/figures/*.js` reports 0 outside the kit.
- Every figure still passes `tools audit site` in both schemes and `tools kit site`.
- The 137 modules' smallest label at 390px is unchanged or larger (the mobile audit is
  the measurement, and `scripts/preview-themes.sh` runs it).

---

---

## The Irish books are finished (2026-10-16)

**All 71 chapters of the four Irish books are authored end to end.** 429 sections, every
page, and every glossary and home page. `grep -rl 'scaffold:stub' books/*/docs/` prints
nothing and the built site has 0 stub pages. All 429 banks verify with the oracle, every
profile builds with no `math-error`, the lint is clean for all four books, and 165
figures measure with none below the 9px phone floor.

The record of how it was done, and what it found, is below and in the numbered items.

| Book | Chapters | Sections | Banks | State |
|---|---|---|---|---|
| `ie-jc-maths` | 22 | 129 | 129 | complete |
| `ie-lc-maths` | 18 | 134 | 134 | complete |
| `ie-lc-applied-maths` | 9 | 67 | 67 | complete |
| `ie-lc-physics` | 22 | 99 | 99 | complete |

Every chapter is the same shape: an index that sets a chapter problem, every section's
three pages (Learn, Practise with help, Practise), a Review that resolves the chapter
problem with mixed practice and a reflection, and a bank in which the oracle proves every
answer. A stated result that is not proved carries a `:::prove` link to a page in
`books/proofs/proofs.yaml` — `pythagoras`, `angles-in-a-triangle`, `angle-in-a-semicircle`
and `angle-at-the-centre` are the four the geometry chapters use.

Work the same way again with `delegate` and this handoff: name the book and chapter, tell
the child to read the pattern chapters and `.agents/chapter-brief.md`, give it the file
list and the expected page count, and require the five checks — `textbook.verify`,
`textbook.pipeline` with no `math-error`, `textbook.lint`, no `scaffold:stub`, and
`pytest tests/`. A chapter of six sections takes about fifteen minutes; the delegation
reports a timeout at 900s but the files are usually written by then, so **check the
filesystem before re-delegating**.

**What is already in hand, so nobody re-fetches it:**

| | Where |
|---|---|
| The four curricula, outcome by outcome | `books/ie-*/curriculum.yaml`, `research/curriculum/ie-curriculum.md` |
| **511 official SEC papers and 475 marking schemes** — 986 files, every level | git-ignored in `research/sources/ie-*/papers/`; the fetch recipe is in its `README.md` |
| The Formulae and Tables booklet, 96 formulae | `books/ie-lc-maths/booklet/` |
| The verified assessment format for every level | `research/curriculum/ie-curriculum.md` §8a |
| **The market's tables of contents** | `research/curriculum/ie-textbook-contents.md` |
| Networks and graphs — no counterpart in the collection | `ie-lc-applied-maths` Strand 2 |

**The known gaps, stated so they are not discovered late:**

- **Textbook table-of-contents research is now in hand.**
  `research/curriculum/ie-textbook-contents.md` holds the real contents pages of the
  market leaders — the Gill Ordinary and Higher Level Mathematics courses, two Junior
  Cycle Mathematics courses (including the 2017 *Destination Maths*, whose section
  lists show the chapter granularity), and *Investigating Physics*. Read off the
  publishers' own samples, not recalled; the method to extend it is in the file. What
  it changes is recorded there: **proof is content in Ireland** (two Higher Level
  chapters, and 1,468 `Show that`/`Prove` in the corpus), and **Junior Cycle geometry
  is four chapters, not one**.
- **No topic-weighted paper analysis.** Command words and mark values have been
  measured (below); which strand each question comes from has not.
- **Ordinary and Foundation Physics and Applied Mathematics papers are thinner** than
  Higher. See §8a.

**Method, and it is binding:**

1. **The standard is the one in this file**, not a new one. Figures go through
   `kit.js` with `SIZE`, `label()` and `scale()` — see *Figures: draw through the kit*.
2. **A component two books need belongs in `assets/`**, not in one of them. See
   *Before you add a shared thing*.
3. **Every answer is in a verified bank.** `:::problems` and `:::answers` render it, so
   the reader sees what CI proved.
4. **`.agents/chapter-brief.md`** with `BOOK_ID` and `CHAPTER_ID` is the per-chapter
   contract, and it was rewritten for the Irish books on 2026-10-15.

**Priority order, and the reason for it:**

1. **`ie-lc-applied-maths` Chapter 2 — networks and graphs.** Strand 2 has no
   counterpart anywhere in this collection: spanning trees, Dijkstra, Bellman,
   adjacency-matrix algebra. It is the material most likely to be reused by another
   book and the least likely to be right if adapted from an existing chapter.
2. **`ie-lc-maths`** — the largest book, three levels, and the one with a real
   examination population.
3. The rest, against the two authored chapters as the pattern.

**Measured from the corpus, for shaping practice.** Across 275 Leaving Certificate
Mathematics papers the command words are `Find` 6,261, `Show` 3,767, `State` 1,167,
`Show that` 928, `Draw` 861, `Express` 729, `Calculate` 652, `Write down` 589,
`Hence` 567, `Solve` 557, `Prove` 540, `Estimate` 488, `Work out` 439, `Construct` 268.
**`Show that` and `Prove` together appear 1,468 times**, which is the single strongest
signal about what an Irish practice set must contain — and it is not the shape of the
English books, which are lighter on proof.

**Two gaps recorded here are still open**, and were in the section this one replaces:

- **Nine A-level Mathematics booklet items cannot be parsed** by `sympy.parsing.latex`,
  so a problem declaring one gets no coverage check. They are listed with reasons in
  `tests/test_verify_coverage.py`, and the test fails when a tenth appears.
- **The Applied Mathematics specification numbers only its strands**, so its coverage
  check reaches no finer than "all four strands are taught" — recorded in its
  `curriculum.yaml`.
