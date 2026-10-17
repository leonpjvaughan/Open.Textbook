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
- [ ] 61. A figure's readout can state false working — mechanism done, 117 figures to declare
- [x] 62. The linter printed its findings and exited 0
- [x] 63. `test/` sat one letter from `tests/`, and held the last loose script
- [x] 64. The booklet gap was measured at the top level only
- [x] 65. The booklet has no modulus form, and does not define λ
- [x] 66. 137 of 250 figure modules hand-write a `<text>` element
- [ ] 67. Checks that parse prose or enumerate notation, and where else they appear

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

## 61. A figure's readout can state false working — **mechanism done, migration open**

**What is wrong.** Two of the fourteen figures added on 2026-10-17 printed a
calculation that does not produce the number printed beside it, and **every check
passed**: `tests/test_figures.py`, the build's math-error scan, `tools audit` and
`tools kit`. None of them reads a number.

- `interest-growth` printed `€1,500.00 × 0.07 × 4 = €390.00`. The rate is 6.5%, so
  the multiplier is 0.065; `fmt(r, 2)` rounded it to 0.07, and 1500 × 0.07 × 4 is
  €420.
- `ratio-share` printed `3 × 14.29 = 42.86` where 100 ÷ 7 was already rounded.

**The first fix was wrong, and how it was wrong is the lesson.** It parsed the
printed sentence back out of the text, and by the end it needed `<sup>`, `√`, `%`,
thousands separators, a trailing sentence period and the words "and"/"is" to read
**43%** of what it saw. Every new formatting choice was a new case; every new figure
was a new chance to be silently unreadable.

**Done (the mechanism, 2026-10-17).** An assertion is data. `panel()` returns
`claim`; a figure calls `claim([{ expression, values, answer, shown }])` once per
redraw; `python -m textbook.working` proves each with the same exact CAS the banks
use (`cas._rationalize` makes 0.065 `13/200`, so there is no tolerance to tune) and
requires the readout to contain the claimed string. `tools readout site --verify` is
in `scripts/preview-themes.sh`. Verified against the defect itself: reintroducing
`fmt(r, 2)` while claiming `fmt(r, 3)` fails with *"claims to show '0.065', but the
readout does not contain it"*. Three figures converted — `interest-growth`,
`ratio-share`, `restitution` — with the `√` case proving no notation table is needed.
The text heuristic survives only as `--text`, and is documented as a hint.

**What is left.** `tools readout` reports **117 figures that print arithmetic and
declare no claim**. That number is the migration, not a pass — the same rule the
booklet-coverage check follows.

**Done means**

- `node tools/dist/cli.js readout site` reports **0** figures that state arithmetic
  and declare none.
- Every remaining figure declares its printed numbers, not only its totals.
- `--text` is deleted, because nothing depends on the heuristic.

---

## 67. The same shape elsewhere: checks that parse prose or enumerate notation

**Why this is an item.** Item 61 was one instance of a pattern, and the pattern is
what to fix: a check that re-parses a *rendered* form, or that lists the notations it
knows, fails on the next thing that is new. Each of these is the same shape, with the
cost measured where it has been paid.

| Where | What it does | The general form |
|---|---|---|
| `tools/src/lib/readout-arithmetic.ts` | parsed printed arithmetic; needed a case per notation and read 43% | **replaced** by `claim` + SymPy (item 61) |
| `tests/test_verify_coverage.py` → `UNPARSABLE_NOTATION` | a list of eight LaTeX notations the parser cannot read; a ninth kind fails the test | an item declares `symbolic: false` **with a reason**, so the exemption is data and a new notation needs no code |
| `engine/.../lint.py` → `STYLE_WORDS`, `US_SPELLINGS` | regexes that grew per finding ("meter" needed "an instrument is a meter; only the unit is a metre") | a table of **allowed phrases** read as data, so a false positive is a row, not a regex rewrite |
| `tests/test_figures.py` → `slider_calls`, `_calls` | balanced-parenthesis scanning of JavaScript; defeated twice by a nested call and a string | a real parser (acorn) over the module's AST — the JS equivalent of asking SymPy instead of parsing the sentence |
| `assets/figures/src/kit/text.ts` → `fmt`'s `.map` detection | identifies `Array.prototype.map` by its third argument | a typed API (`fmt.map(values)`), so the ambiguity cannot be expressed |
| `coverage.infer` | shape-matches an expression against booklet items | fine: it is documented as a suggestion and never decides a pass |

**The rule to apply.** A check may branch on *data it was given*; it may not branch on
the *shape of a rendered thing*. Where a check needs to know something the render
threw away, the renderer must publish it — as `claim()` does, as `data-figure` does,
as the banks' `expression`/`values` does.

**Done means**

- The three middle rows are converted, or each is recorded with a reason it must not be.
- No check in `tools/` or `tests/` contains a list of notations, spellings or formats
  that a new content change could extend.

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

## 65. The booklet has no modulus form, and does not define λ — **done**

**What was wrong.** `am7-5-modulus-tension` works with `T = λx/L` for the tension in
an elastic string. The SEC booklet carries `F = −ks` and Young's modulus `E = σ/ε`,
but never the modulus form, and the record declares `hookes-law`, which looked like
the nearest available item rather than the right one. Found while declaring the
Applied Mathematics banks.

**Resolved: the declaration was right and the premise was wrong.** λ is the
**modulus of elasticity in newtons**, and `T = λx/L` *is* Hooke's law — the same law
with `k = λ/L`. The page says so already, in Section 7.5's "The modulus of
elasticity" heading: it names λ, gives it the unit, calls it a property of the string,
and states `λ = kL` so that "the two forms are the same law written two ways". A
reader is given λ in the question ("natural length 0.8 m and modulus 80 N") and the
page relates it to the form they have met. So there is no content gap, and no
`know`-style treatment is needed.

**The gap that was real was findability.** The booklet's `hookes-law` item carried
`hooke, spring, extension`, so a reader who searched it for "modulus" — the word the
page uses — found nothing, or found `youngs-modulus`, which is a different modulus.
Both booklets now carry `elastic, modulus, lambda, string` on that item, so both
moduli come back and the one an elastic string uses is among them.

**Done means**

- [x] The page defines λ on first use and states `λ = kL` — it did.
- [x] `am7-5-modulus-tension` declares `hookes-law`, and that is the correct item.
- [x] The booklet's search keywords reach it from "modulus" and "lambda".
- [x] The near-misses the same pass flagged were checked: the projectile
  range/time/max-height forms and the drag laws `D = kv`/`D = kv²` are derived
  in-chapter from supplied suvat items or stated in the question, and the
  elastic energy-loss formula likewise.

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
