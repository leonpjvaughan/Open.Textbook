# HANDOFF — Expanding beyond summary: the detail track for Numerical Methods

**Status:** proposed. Nothing has been written yet.
**Written:** 2026-10-27
**Revised:** 2026-10-27 — **Appendix B** added after a review of the statistics chapters;
see the note below, then read it before starting work.
**Reader of this file:** an agent with no prior context for this work
**Subject:** `books/numerical-methods/` — the collection's map of problem classes

> **Read Appendix B first if you are about to write a statistics page.** A review of the
> four books' statistics chapters found ten things, and four of them change what the
> `averaging` pilot must contain, link to or avoid repeating. They are numbered 140–149
> and are also in `.agents/todo.md`, so nothing in them is lost if this file is skimmed.

> **What this is.** The map is finished as a *summary*: nine class pages, two indexes
> and three argument pages, 15 pages and about 21,900 words, every page authored,
> every page passing the gate. It is deliberately thin — it names 76 methods and
> derives none of them, and it contains exactly one program. The author wants the
> book to grow a second layer under the summary, where **the mathematics, the code
> and the theory sit together**, without losing the summary as a front door.
>
> The one-sentence mission: **keep the map, and put the working underneath it.**

---

## Read first

In `maths-site`, in this order. Most of the rules you need already exist and are
binding; this file adds only the decisions taken for *this* extension.

1. `AGENTS.md` — especially **Voice and language**, **Theming**, **Conventions**, and
   the paragraph *A theorem stated without proof is a promise to write one*.
2. `books/AGENTS.md` — what is common to every book.
3. `books/numerical-methods/AGENTS.md` — **the contract for this book**, and the
   record of why it is a reference work rather than a course. Read all of it. The
   sections you will be tempted to break are named there, and the reason is given.
4. `books/numerical-methods/map.yaml` — the page registry. The nav is built from it.
5. `books/numerical-methods/docs/index.md` — the book's argument. It is also the
   page that becomes the summary front door.
6. `assets/AGENTS.md` and `assets/figures/kit.js` — the figure rules and the kit.
7. `research/pedagogy.md` — the evidence base. Only the parts about dual coding,
   worked examples and retrieval are load-bearing here.
8. `.agents/chapter-brief.md` — the per-chapter contract. It does **not** bind a
   reference work, but its definition of *done* for a page is the standard to match.

Also read `tests/test_reference_books.py` before you write a page. It is 50 tests and
it is the real specification of this book: the nine classes, the fixed page skeleton,
the symptom table that must match on two pages, the counts the home page prints, and
the two programs that must print what the page says. You will be editing it.

---

## MISSION

Add a **detail track** under the existing map, so that a reader who wants the working
can get the mathematics, the code and the theory together, and a reader who wants the
map still gets one screen of it.

Four things, in order:

1. **The summary front door.** `docs/index.md` keeps its argument and gains a section
   that points at the detail, so the page a reader lands on is a summary with
   references forward rather than a dead end.
2. **Three shared spine pages**, because the biggest gaps in the book cut across all
   nine kinds: error and conditioning, convergence and order, and verification.
3. **Detail pages under the class pages**, that carry the mathematics, a short
   program and the theory for one method family — with the program's output on the
   page and checked by a test. Four for `averaging`, then **one per class** for the
   other eight: a class page that wants a second detail page has to say which gap it
   closes and not repeat one already closed at the top level.
4. **One class done first, end to end**, as the pattern: `averaging`. It is the
   thinnest page (1,028 words, 11 named methods, no derivation) and it is where
   statistics — the thing the author asked about first — lives.

---

## SCOPE

Owned:

- `books/numerical-methods/map.yaml` — new entries under `pages:`.
- `books/numerical-methods/docs/**` — new detail pages, and edits to `index.md` and
  the class pages' *Read next* sections.
- `books/numerical-methods/AGENTS.md` — the detail-track contract is added to it.
- `books/numerical-methods/sources.yaml` — one reference per new claim.
- `books/numerical-methods/docs/assets/stylesheets/book-local.css` — only if a
  detail-page component needs a rule.
- `engine/src/textbook/scaffold.py` → `build_nav_list` — **one** change, for nesting.
- `tests/test_reference_books.py` — the tests that pin the new structure.

Escalate before touching anything else in `engine/`, and do not touch another book.

---

## OUT_OF_SCOPE

| Not this | Why |
|---|---|
| **A second book for statistics** | `books/numerical-methods/AGENTS.md` records the decision: averaging is one answer to the first question, and splitting it buries the fact that a Monte Carlo estimate and a suspension sweep are the same kind of answer — an estimate with an error bar. Statistics gets *detail pages*, not a book. |
| **Making it a course** | No chapters, no tiers, no boards, no booklet, no problem bank, no Review, no `scaffold:stub`. `oracles: []` stays empty. |
| **A tenth class** | Stiffness and Hamiltonians are flags, for the reasons in the book's `AGENTS.md`. A new class needs a case the flags cannot carry, and that is an escalation, not a task. |
| **Rewriting the nine class pages** | They are the summary and they are correct. You may add *Read next* links and nothing else until the pilot is reviewed. |
| **A general numerics library** | The code on a page is a demonstration of the mathematics beside it. It is not a package, it is not importable by a reader, and it is not benchmarked. |
| **Shrinking the summary** | The summary is not a teaser for the detail. Both stand alone. |
| **Pyodide, or any runtime Python** | The collection ships maths as MathML at build time and has no backend. Code is printed and folded. |

---

## CONTEXT — facts and accepted decisions

### The measured state of the book, 2026-10-27

| Measure | Value |
|---|---|
| Pages | 15 (nine classes, three argument pages, two indexes, colophon) |
| Words | 21,900 |
| Display equations outside `techniques/` | 21 |
| Named methods | 76, in `techniques/index.md` |
| Systems named | 64 |
| **Programs in the whole book** | **1** (`reading-the-class`, 43 lines, sympy) |
| Pages containing no code | 14 of 15 |
| Non-table lines over 80 columns | 477 — 349 plain prose, 128 containing maths |

### The gaps, measured — grep the pages, they are all empty

| Topic | Occurrences in `docs/` | Why it matters |
|---|---|---|
| round-off | 0 | The book's own symptom table says "ill-conditioned" four times and never says what that means numerically |
| machine epsilon | 0 | No reader can compute a tolerance from this book |
| Richardson | 0 | No observed-versus-theoretical order anywhere |
| manufactured | 0 | Nothing on knowing a solver is right |
| von Neumann | 0 | Stability is asserted in `parabolic` and `hyperbolic`, never analysed |
| consistency / well-posed | 0 | The three-part argument (consistency, stability, convergence) is absent |
| regression / confidence interval | 0 | The statistical half is a list of sampler names |
| R-hat / effective sample size | 0 | MCMC is named and its diagnostics are not |
| sensitivity / uncertainty | 0 | Uncertainty quantification is absent from a book that says every answer needs an error bar |

**These are the destination.** A detail page is worth writing when it closes one of
these rows, and a page that closes none of them is a page the book did not need.

### Accepted decisions — do not relitigate

| Decision | Value |
|---|---|
| Front door | `docs/index.md` stays the summary. It gains a **Where the working is** section; it does not become a table of contents |
| Detail home | Under the class page it belongs to: `averaging/error-bars/`, not a flat `detail/` directory |
| Spine pages | Three, at the top level of `docs/`, because they cross all nine kinds |
| Lanes | Every detail page runs **the mathematics, the code, the theory** in that order, interleaved rather than in three sections |
| Code | Printed, never executed at runtime. **Long listings are folded** in native `<details>` |
| Code width | **72 columns maximum**, a hard rule with a check |
| Prose width | **80 columns**, hard-wrapped at word boundaries, a hard rule with a check |
| Output | A program's printed output is on the page, and **a test runs the program** and compares |
| Arithmetic | **`sympy` only.** No numpy, no scipy — see *Why no numpy* below |
| Figures | None required on a detail page except the pilot. A page with nothing to measure gets no figure |
| Order of work | `averaging` end to end, then review, then the other eight |

### Why no numpy or scipy

`engine/pyproject.toml` declares `PyYAML`, `sympy==1.14.0`, `markdown` and
`pymdown-extensions`. `numpy` and `scipy` are **not** installed and `DECISIONS.md`
declines scipy as a verification oracle. So a page's program must run in an
environment that has sympy and nothing else. That is a constraint on the *code*, not
on the mathematics: a `matplotlib`-style demonstration is a table of numbers, and a
`numpy.linalg.solve` is a four-line LU with partial pivoting written out on the page.

**If a page genuinely needs numpy, escalate.** Do not add it to `engine/`.

### The fold convention — verified, not proposed

`engine/src/textbook/pipeline.py → EXTENSIONS` contains `"md_in_html"`.
`pymdownx.details` is **not** installed, and is not needed. This was measured on
2026-10-27 against the real extension list: a native `<details markdown="1">` passes
fenced code blocks, tables and `$$…$$` through intact and emits ordinary
`<details><summary>`. The collection already uses the pattern **15,681 times across
839 pages**, mostly in problem answer blocks and on Review pages, so the markup is
proven rather than novel.

```markdown
<details markdown="1">
<summary>Least squares, in full</summary>

```python
... 72 columns or fewer ...
```

```text
... what it prints ...
```

</details>
```

Rules for a fold:

- The `<details markdown="1">` marker and the blank line after it are required, or
  the Markdown inside is not parsed.
- A **short** listing (10 lines or fewer) is **not** folded. A fold around a
  five-line program costs a click and saves nothing.
- The summary names what is inside — "The full listing", not "Click here". It is the
  only thing a reader sees, so it has to be a contents entry.
- **The page must still read as complete with every fold closed.** The prose before
  the fold must say what the program establishes and what it prints, and the prose
  after must use the result. A fold is never the only place a fact lives.
- No `<details>` nesting inside `<details>`.

### The width rules

**Measured, not assumed** (2026-10-27, Chromium, the built site, the page's own
stylesheet, `var/z-width.mjs`):

| viewport | code box, inside padding | columns that fit | 72 columns | document overflow |
|---|---|---|---|---|
| 360 | 299px | **35** | 602px | 0 |
| 390 | 329px | **39** | 602px | 0 |
| 414 | 353px | **42** | 602px | 0 |
| 768 | 633px | 75 | 602px | 0 |

One monospace column is 8.36px at the shipped `0.82em` over a 17px root. So on a phone
**39 columns fit**, and any rule above 39 means a listing that scrolls sideways. That
is a real cost and the measurement decides how to pay it.

**The rule is 72 columns of code, and the reasoning is about the fold.** A 72-column
block is 602px wide: it scrolls at 390px and fits at 768px. Scrolling a *listing* is
accepted — the collection already scrolls every wide table and every wide display
equation, and a wrapped listing is a different listing. What is not accepted is
scrolling a *sentence*, because prose has no columns to preserve and wrapping it costs
nothing.

72 rather than 88 is still the right number, and the measurement says what it buys: a
program written to 72 columns scrolls on a phone by at most 1.8 screens and fits
without scrolling on a tablet. At 88 it would be 735px and scroll everywhere below a
desktop. The alternative — one page per class at the widest setting a phone holds
(39) — was rejected: 39 columns of Python forces names like `e` and `n`, which is
worse mathematics than a scroll.

A listing of 10 lines or fewer should be **written to fit**: if a demonstration fits in
39 columns it should, because a fold would otherwise hide it and a scroll would waste
the reader's attention. Long listings are folded, and the fold is why 72 is affordable
— a reader who does not want the listing never meets its width.

Therefore:

- **Prose: 80 columns.** Hard-wrap at word boundaries. A table row, a fenced line, a
  display equation and a link URL are exempt. The content column is `70ch`, so 80
  columns of prose at `1.0625rem` is wider than the column and wraps by itself — the
  limit is a limit on the **source line**, which is what makes a diff readable, not on
  the rendered line.

  **This rule is already the collection's best-wrapped book, measured.** Prose line
  widths across the tree (non-table, non-fence, list markers stripped):

  | book | lines | p50 | p90 | p99 | over 80 |
  |---|---|---|---|---|---|
  | `a-level-maths` | 21,996 | 57 | 79 | 85 | **2.7%** |
  | `numerical-methods` | 1,347 | 76 | 84 | 120 | 32% |
  | `gcse-maths` | 10,245 | 45 | 91 | 186 | 14% |

  `a-level-maths` was written to a 79-column rule and is the precedent, not an
  invention. `numerical-methods`'s p50 of 76 says the book is mostly wrapped already;
  its 32% is list items, headings and lines broken by inline maths, which is where the
  reflow goes if it is ever done.
- **Code: 72 columns.** `black`'s default is 88; this is that, less 16, because a
  listing is the one thing on the page that has to be read in a column.
- **Inline maths counts toward the prose limit**, because it renders at reading size.
  If a line is over because of `$\Delta t \propto \Delta x^2$`, shorten the sentence.
- Both are checked. A check with no test rots — see **Acceptance**.

---

## PLAN

### Phase A — the front door, and the three spine pages

**A1. `docs/index.md` gains a section.** After *What decides the method, once you
know the kind*, add **Where the working is**: a table, one row per spine page and per
class that has detail, with a one-line note per row. The opening arithmetic claim
(76 methods, 64 systems, nine kinds) stays. The page does not become a contents
table: a summary with a map forward, not an index.

The sentence to write, in the book's own voice:

> Nine kinds is the whole of the map, and the map is summary. Under each kind there
> are pages with the working on them: the algebra, a program that prints a number,
> and the argument for why the method does what it does. They are optional in the
> same way that the class pages are: nothing here needs them, and a reader who wants
> to know why an error falls as $1/\sqrt N$ rather than being told that it does has
> somewhere to go.

**A2. Three spine pages**, at the top of `docs/`, each listed in `map.yaml` **after the
nine classes and before the two indexes**:

| slug | title | what closes a measured gap |
|---|---|---|
| `error` | `Error, and what a tolerance is` | Round-off, machine epsilon, cancellation, forward against backward error, the conditioning of a problem against the stability of a method, and how a tolerance is chosen. **The largest hole in the book.** |
| `order` | `Convergence, and how to measure it` | Observed against theoretical order, Richardson extrapolation, a convergence table built by a program that prints its own orders, and what a rate does and does not promise |
| `checking` | `Knowing the answer is right` | Manufactured solutions, grid convergence, comparing two methods, residual as evidence, and the difference between verified and validated |

Each is a normal detail page and runs the three lanes. Each carries a figure only if
it has something to measure; `order` will, because a rate is a line.

**A3. Register them.** `map.yaml` gains three entries **with no `signature`**. The
signature is what makes an entry linkable as a class, and these are not classes —
`tests/test_reference_books.py` asserts that a registry entry without one is not
reachable by `:::class`, and `tests/test_class_links.py` asserts the registry has
exactly the nine linkable ones. That test is the guard on this phase: if a spine page
gets a signature, `:::class error` starts to work and the map has ten kinds.

### Phase B — the pilot, `averaging`, end to end

`averaging/index.md` is 1,028 words and names eleven methods without deriving one.
It becomes the parent of four detail pages.

| slug | title | what in the mathematics it settles, and the theory behind it |
|---|---|---|
| `averaging/error-bars` | `An average, and its error bar` | The variance of an estimate, and the $\sigma/\sqrt N$ that follows → a program that draws fixed-seed samples and prints the estimate and its two-standard-error bar at four values of $N$ → why the rate is $\sqrt N$, and what breaks it |
| `averaging/correlated` | `When the samples are not independent` | Autocorrelation and the effective sample size $N/\tau$ → a program that builds a correlated sequence and prints the naive bar and the honest one → why the naive bar is too small, sometimes by a hundred |
| `averaging/mcmc` | `Walking a chain that settles` | The transition rule and detailed balance → a program that runs a random walk on a small target and prints R-hat and the effective sample size → the diagnostics, and what a chain that has not settled looks like |
| `averaging/regression` | `Fitting, and what the fit does not say` | Least squares as a maximum-likelihood estimate, the normal equations, and the covariance of the fitted parameters → a program that fits a line to numbers it prints and prints the slope with its standard error → why a small residual is not a good fit |

That is four pages, four programs, and every one of them closes a measured gap in the
table above. It also settles the pattern: whether the three lanes interleave well,
whether a 72-column program reads well in a fold, and whether the summary-to-detail
link is enough.

**B1. Each detail page's skeleton.** Not the class skeleton — that is for classes.
This one:

1. **What this page answers** — one sentence, and the question it settles that the
   class page raised.
2. **The mathematics** — the derivation, one reasoning line per algebra line, ending
   in something the reader can check.
3. **The code** — a program, folded if long, with its printed output below it.
4. **The theory** — why it works, what it assumes, and the condition under which it
   stops working. This is where the reference is cited.
5. **What this cost** — the price, in the book's existing idiom: work, memory,
   accuracy, and what it will not do.
6. **Back to the map** — one link up to the class page, and one sideways to a sibling
   detail page.

Six headings, in that order, on every detail page, for the same reason the class
pages have eleven: a set of pages that each invent their own order stops being a map.

### Phase C — the other eight classes

Do not start this until Phase B has been reviewed. The shape of a detail page is the
thing being tested, and eight classes written against an unreviewed shape is eight
rewrites.

When it starts, the class-by-class disposition is. **One page per class**, not the
two or three a class could absorb: the book gains sixteen pages, not forty, and each
one closes a row of the measured-gap table rather than restating a class page.

| Class | The one detail page | Which gap it closes |
|---|---|---|
| `optimisation` | `optimisation/descent` — why a step direction and a step length are two decisions | line search, and the curvature a gradient ignores |
| `eigenvalue` | `eigenvalue/shift-and-invert` — how a method that finds the largest value finds a chosen one | nothing measured, but it is the method the symptom index already sends readers to |
| `linear-system` | `linear-system/conditioning` — the worked version of the spine page, on one matrix | round-off, condition number, forward against backward error |
| `root` | `root/order-of-newton` — quadratic convergence, and what a folded derivative does to it | Richardson and observed order |
| `saddle-point` | `saddle-point/the-multiplier` — what the second unknown is, and why recovering it badly gives right displacements and wrong forces | consistency, and the symptom the page already lists |
| `elliptic` | `elliptic/the-weak-form` — where the matrix comes from | discretisation, which the book describes and never derives |
| `parabolic` | `parabolic/stability` — von Neumann, and the $\Delta t \propto \Delta x^2$ limit derived rather than asserted | von Neumann, consistency |
| `hyperbolic` | `hyperbolic/the-cfl-condition` — the condition derived from the domain of dependence | the derivation behind the assertion |

A class whose page cannot close a gap in that table gets no page. The spine pages
cover what is common; a class page that repeats a spine page one level down is the
second copy that rots.

---

## ACCEPTANCE

### A detail page is done when all of these are true

- It follows the six-heading skeleton, in order.
- Its mathematics ends in a statement the reader can check, and every algebra step
  carries one line of reasoning. No step is "after some algebra".
- Its code runs in an environment with `sympy` and **no** `numpy` or `scipy`, and its
  printed output is on the page.
- **A test runs the program and compares the output.** This is the rule
  `reading-the-class` already sets: a printed output is evidence, and evidence nobody
  runs is a number typed into a fence.
- Every line of prose is 80 columns or fewer and every line of code is 72 or fewer.
- Every folded listing has a summary that says what is inside, and the page reads as
  complete with all folds closed.
- Every claim about a method comes from `sources.yaml`, with a `role` that says
  whether the reference is the claim's source or further reading.
- It names its parent class page and at least one sibling.
- No colour, no `:::figure` unless the page has something to measure, and any figure
  goes through `kit.js` with `SIZE`, `label()` and `scale()`.

### The whole work is done when

```bash
uv run python -m textbook.lint numerical-methods     # reports nothing
uv run python -m pytest tests/ -q                    # passes
while read -r -a b; do uv run python -m textbook.pipeline "${b[@]}"; done \
    < <(uv run python -m textbook.plan --configs)
grep -rl 'math-error' site --include='*.html'        # prints nothing
node tools/dist/cli.js audit site                    # no figure defect, both schemes
node tools/dist/cli.js audit site --mobile           # no figure below 9px at 390px
node tools/dist/cli.js check-mobile site             # no page wider than the screen
scripts/check.sh
```

and, for the new rules:

- A test fails when a code line exceeds 72 columns.
- A test fails when a prose line exceeds 80 columns.
- A test fails when a `<details>` has no summary, or a summary does not name its
  contents.
- A test fails when a page has a fenced program and no output block, or an output
  block that the program does not print.
- `map.yaml` lists every new page, `docs/index.md` links it, and no spine page
  carries a `signature`.

---

## VERIFICATION

Beyond `scripts/check.sh`, the checks that are particular to this work:

```bash
# 1. The counts the home page prints are recomputed by a test already
#    (test_the_home_page_states_the_counts_it_claims). Adding methods or systems
#    without updating index.md fails here.
uv run python -m pytest tests/test_reference_books.py -q

# 2. The fold and width rules, once written
uv run python -m pytest tests/test_reference_books.py -q -k "fold or width"

# 3. Every program on a detail page prints what the page says
uv run python -m pytest tests/test_reference_books.py -q -k "program or output"

# 4. The nav nests the detail pages under their class, and the spine pages sit
#    between the classes and the two indexes
uv run python -m pytest tests/test_reference_books.py -q -k "tree_order or listed"

# 5. Read it at 390px before you claim it reads at 390px. A listing that scrolls is
#    fine; a sentence that scrolls is not. Routes are passed after `--`. A route maps
#    to a file under the site directory, appending `index.html` only for a trailing
#    slash, so every route below keeps its slash. A capture of a 404 page looks like
#    a success, which is why the command fails when the two schemes are identical.
uv run python -m textbook.pipeline --book numerical-methods --profile all
node tools/dist/cli.js screenshot site var/nm-shots --width 390 \
    -- error:numerical-methods/error/ order:numerical-methods/order/ \
       pilot:numerical-methods/averaging/error-bars/
```

---

## ESCALATE WHEN

Stop and report, rather than working around:

- **A page needs a number that `sympy` cannot produce in under a second.** The
  temptation is to paste the output of a program that is not on the page, which is a
  number typed into a fence. Either find the sympy route or escalate.
- **`build_nav_list` needs more than a nesting loop.** The nav is one function with
  two shapes already; a third shape is a design decision.
- **A detail page wants to be a class.** If the page's subject is a *kind of
  question* rather than a *working of an answer*, it is a tenth class, and that
  contradicts the book's own argument. Escalate rather than shipping it quietly.
- **The fold convention breaks a `:::` directive or a figure.** `md_in_html` means the
  hooks see content inside `<details>`; `transform_outside_fences` skips fenced
  blocks but knows nothing about `<details>`, and `figures` injects its loader once
  per page. So a `:::figure` or `:::prove` **inside** a fold is untested territory:
  it may expand, or it may expand into a page whose loader the hook placed wrongly.
  The rule for the pilot is that no `:::` directive goes inside a fold. If a page
  needs one, that is the engine question, and it is an escalation.
- **The 80-column prose rule collides with the existing pages.** 349 non-table prose
  lines in the book are already over it, the widest at 215 columns in
  `techniques/index.md`. Deciding whether the rule applies to the nine class pages
  (and so requires a book-wide reflow) or only to new pages is a scope decision, not
  a task decision. The recommendation, not a decision: **new pages only** now, and a
  separate reflow item for the old ones, because a book-wide reflow in the same
  change makes the diff unreviewable.
- **`test_reference_books.py` fails for a reason unrelated to this work.**

---

## EXECUTION

- **Model class:** high. **Effort:** high for Phase A and B; the pilot is the hard
  part. **Isolation:** isolated context is fine — everything needed is in this file
  and the documents it names.
- **Order:** Phase A, then the pilot in Phase B, then **stop for review**. Phase C
  against an unreviewed page shape is the expensive mistake.
- **Tools:** read, grep, edit, write, bash. No new dependencies.
- **State:** add item 139 to `.agents/todo.md` with this diagnosis before starting,
  and close it in `.agents/todo-closed.md` with the measurement that shows it worked.
  Do not persist progress in the transcript.
- **Return:** `STATUS: DONE|BLOCKED|ESCALATE`, the pages written, the verification
  actually performed with its output, and a decision request only where one is
  genuinely required.

---

## Appendix A — the sentences that decide this work

Three paragraphs out of the book's own contract, which the pages must not contradict:

> **One page per box, including the statistical half.** `averaging` is one page, not
> a sub-map: the box is entered by the question ("how likely, how spread out"), and
> the methods are named and priced rather than derived. If a reader needs the
> derivation, `techniques/` and `sources.yaml` are the route.

That sentence is what this work changes, and it changes it honestly: the derivation
now has a page, and the route it names gets an intermediate stop.

> **Do not rank methods.** The techniques table says when a method wins and when it
> is the wrong tool. It never says one is best, because the honest answer depends on
> the class, the size and the accuracy you need.

A detail page shows that a method *works*, and never that it is the best one.

> **Never imply more precision than the claim has.** "Multigrid is close to linear in
> the number of unknowns" is the claim. "Multigrid is O(n)" invites a measurement the
> book did not make.

A detail page that prints a convergence rate has made a measurement, and the rate it
prints is the rate it measured — not the textbook's, unless the two agree and the page
says so.

---

## Appendix B — what reviewing the statistics chapters found

**Written:** 2026-10-27, at commit `48fccea5`, after reading the four books' statistics
chapters, the two reference works and the banks. Every number below is a command and its
output, taken on that commit. Nothing here has been fixed.

**Scope of the review, as asked:** the *methods*, not data cleaning. So A-level 11.6
(outliers and data cleaning) and 11.7 (the large data set) are read but not reported on,
and neither is any missing-value or transcription complaint.

**Why it belongs in this file.** Phase B of the plan above is four `averaging` detail
pages. Four of the findings below change what those pages must contain or link to (140,
141, 142, 143), and one is a prerequisite defect in a figure the pilot's neighbours will
mount (148). The rest are defects in the four course books and in the map, and they are
numbered **140–149** so they can be lifted into `.agents/todo.md` unchanged; item **139**
is the detail track itself, as the *EXECUTION* section above already requires.

### The surface, measured

```
$ # sections (one Section directory each), words in every page of the section
$ # (Learn, Practise with help, Practise), figures excluding the warm-up gate, and
$ # bank items counted by parsing each bank's `problems:` list, not by grepping
        unit                     sections  words   figures  bank items
  gcse-maths   Chapter 24              5     3267      1        92  (ch24+ch25)
  gcse-maths   Chapter 25              5     3092      1
  a-level      Chapter 11              7    14489      4       283  (ch11-14)
  a-level      Chapter 12              3     7706      3
  a-level      Chapter 13              5    11033      4
  a-level      Chapter 14              4    11237      2
  ie-jc        Chapter 22              9    15982      3        98
  ie-lc        Chapter 11             11    19848      0        90
  ----------------------------------------------------------------
  total                               49    86654     18       563
```

(Of those 86,654 words, 47,214 are in the 49 Learn pages and the rest are the guided and
independent practice beside them.)

Two rows are the whole shape of the problem: **`ie-lc-maths` Chapter 11 is the largest
statistics unit in the collection and carries no figure at all**, and across 563 verified
statistics items only **12** statements ask which method to use or why:

```
$ uv run python -  # parses each bank, tests each `statement` against
                   # which (method|measure|average|chart|diagram|model|test|distribution)
                   # | give a reason | justify
  gcse-maths ch24+25       items=  92 names a choice=2
  a-level-maths ch11-14    items= 283 names a choice=7
  ie-lc-maths ch11         items=  90 names a choice=1
  ie-jc-maths ch22         items=  98 names a choice=2
  TOTAL 563 12
```

P5 asks the learner to choose the method, and it is the one part of the chapter formula
the statistics banks almost wholly omit. (An earlier pass counted 674 items here by
grepping `- id:` lines; that over-counts by the nested `checks` ids. The number above is
the parsed one.)

### 140 — The statistics strand states results it never proves and never links

**Measured.** The root contract: *a theorem stated without proof is a promise to write
one*, and the promise is a `:::prove` link. In the statistics sections of all four books:

```
$ grep -rn ":::prove" books/gcse-maths/docs/Chapter\ 2[45] \
      books/a-level-maths/docs/Chapter\ 1[1-4] \
      books/ie-lc-maths/docs/Chapter\ 11 books/ie-jc-maths/docs/Chapter\ 22 | wc -l
0
$ grep -n "strand:" books/proofs/proofs.yaml | awk '{print $3}' | sort | uniq -c
      6 algebra      3 calculus      5 geometry
      1 mensuration  3 sequences     3 trigonometry
```

Statistics is the only strand in the collection with **zero** proof pages, and the
results it states without one are exactly the kind a reader can reasonably ask *why*
about:

| stated where | the claim | provable at what level |
|---|---|---|
| a-level 14.4 §1, ie-lc 11.10, a-level glossary | $r$ "always lies between $-1$ and $1$" | Cauchy–Schwarz on the centred vectors — two lines |
| a-level 11.5 §Watch out, ie-lc 11.5 | the deviations "add to zero for any data set" | one line of algebra |
| nowhere | the mean is the value that minimises the sum of squared deviations | completing the square — and `proofs` **already** has that page |
| ie-lc 11.8 §The central limit theorem | the sample mean is "approximately normal, whatever shape the population has" | not provable at this level; must stay a *named* model, not a promise |
| ie-lc 11.9 | a 95% interval contains exactly the values a two-tailed 5% test retains | one line, from the definition of the tails |

**The fix.** Two proof pages (`correlation-between-minus-one-and-one`,
`mean-minimises-squared-error`) linked from the six stating lines, and the CLT line
reworded so it says it is a theorem being *used* rather than one being derived.

- `correlation-between-minus-one-and-one` → `qualifications: [A-level]`,
  `strand: statistics`. The proof is Cauchy–Schwarz on the centred vectors; at A level it
  can be written without naming Cauchy–Schwarz, by noting that
  $(\sum uv)^2 \le (\sum u^2)(\sum v^2)$ is the discriminant of a quadratic that cannot
  go negative.
- `mean-minimises-squared-error` → `qualifications: [GCSE, A-level]`,
  `strand: statistics`. It is completing the square, so it should cross-link
  `:::prove completing-the-square`, which the proof book already has
  (`proofs.yaml:97`).

`strand` is a free-form string — no test constrains it (`grep -n strand
engine/src/textbook/proofs.py tests/test_proofs.py` gives one hit, and it is
`assert REFERENCE.strands == []`) — so `statistics` is a new value the book's index will
render without any engine change.

**Done means:** `grep -rn ":::prove" books/*/docs/Chapter*/Section*/Walkthrough/index.md
| wc -l` includes five statistics hits; both pages exist under `books/proofs/docs/`, are
listed in `proofs.yaml` **and** in `books/proofs/docs/index.md` (the hand-written list at
the top, not generated), and
`uv run python -m pytest tests/test_proofs.py tests/test_proof_maths.py -q` passes.

### 141 — No page in the collection derives the least-squares line, and four courses use it

**Measured.**

```
$ grep -rnE "S_\{?xy|\bn\sum xy|sum of the products" books/*/docs --include='*.md' | wc -l
0
$ grep -rn "least" books/a-level-maths/docs/Chapter\ 11/Section\ 11.4/Walkthrough/index.md
(no match)
$ grep -n "least-squares" books/ie-lc-maths/docs/Chapter\ 11/Section\ 11.10/Walkthrough/index.md
101:regression line** $y = a + bx$, which makes the sum of the squared vertical distances from
103:the points to the line as small as possible.
```

A-level 11.4 defines the regression line as "a straight line drawn through the middle of
the points" — a line by eye — and then every prediction item in its bank reads a line it
was given. IE-LC 11.10 says least squares minimises the squared vertical distances and
then says the calculator "does not draw the line by eye", without saying how. Meanwhile
the machinery to prove it exists and is used: `PROBLEMS.md` §*Statistics* documents exact
`correlation` and `regression` kinds, `engine/src/textbook/verify/cas.py:901-935` computes
both over rationals, and four items in three banks carry `kind: regression`
(`a-level-maths` 2.12 and ch13 review, `ie-lc-maths` 11.10 ×2). So the collection
**proves** a least-squares line for the reader while **no page explains what one is** —
and the one fact the a-level bank asserts in answer text, that the line passes through
$(\bar x, \bar y)$ (`chapter-11-practice-11.4.yaml` item `p9-means-on-line`), appears in
no page:

```
$ grep -rn 'bar{y}' books/a-level-maths/docs --include='*.md' | grep -vc assets
0        # \bar{x} appears 15 times, so the mean of y is never named
$ grep -rniE "mean point|point of averages|passes through the mean" books/*/docs | wc -l
0
```

**Why this is Phase B's problem, not a new page.** The plan's `averaging/regression` row
says "least squares as a maximum-likelihood estimate, the normal equations, and the
covariance of the fitted parameters". That is right, and this measurement is why the page
is not optional: it is the only derivation of a method that four course books use.

**What the page must not repeat.** `books/maths-applied/docs/Chapter 1/Section 1.3/Deeper/
what-least-squares-does/index.md` already derives the geometry — why squares, why the
normal equations have the shape they have, the projection property, and "the residual is
an error bar on the *solver*, not on the *model*". A regression detail page restating that
would be the second copy that rots. So the split is:

- the **statistical** part is new: least squares as the maximum-likelihood fit under
  Gaussian noise, the covariance of $\hat b$, why a small residual is not a good fit;
- the **geometric** part is a link to maths-applied §1.3's deeper page;
- the **model-criticism** part is a link to `ie-lc-applied-maths` §9.3–9.4, which is the
  only place in the collection where overfitting is taught (`grep -ril overfit books/`
  returns four files, all there).

### 142 — The map has no fitting entry, so the commonest statistical computation has no row

**Measured.**

```
$ grep -niE "^### .*(regress|least squares|fit)" books/numerical-methods/docs/techniques/index.md
(no output)
$ grep -n "### Gauss–Newton" -A6 books/numerical-methods/docs/techniques/index.md
132:### Gauss–Newton
134-Class: [Optimisation](../optimisation/)
136:$\delta=-(J^{\mathsf T}J)^{-1}J^{\mathsf T}r$, then $x_{k+1}=x_k+\delta$
138:A least-squares residual and its Jacobian. The fitting workhorse
```

A reader who arrives holding "fit a line to this data" — the one statistical computation
every course in the collection asks for — has no row in the reverse index. The work is
reachable only as the *price* line of `Gauss–Newton` and as `### Normal equations`.

**The fix.** One A–Z entry, `Least-squares fit`, with
`Class: [Optimisation](../optimisation/), [Linear system](../linear-system/)`, the normal
equations as its step, and "a small residual is not a good fit" as its price. This is not
a tenth class: the `Class:` line already accepts two, as `Newton` does
(`Class: [Root](../root/), [Optimisation](../optimisation/)`).

**Done means:** the entry exists with its anchor, the counting rules below still hold,
`tests/test_reference_books.py` passes, and the home page's number is recomputed (it is
one more).

### 143 — The map's statistical box is unreachable from the pages that stand in it

**Measured.** `:::class` is how a chapter says "this is the kind of problem you now have".
In the four statistics chapters:

```
$ grep -rn ":::class" books/gcse-maths/docs/Chapter\ 2[45] \
      books/a-level-maths/docs/Chapter\ 1[1-4] \
      books/ie-lc-maths/docs/Chapter\ 11 books/ie-jc-maths/docs/Chapter\ 22 | wc -l
0
$ # and the box it should point at, built, prints:
$ python3 … site/numerical-methods/averaging/index.html
averaging: Used in this collection  No page in this collection names this class yet.
```

So the one box the map calls "the statistical half" has **no callback from anywhere**,
while 86,654 words of statistics teaching stand inside it (47,214 of them in the Learn
pages). The other boxes, measured the same way:

```
$ uv run python -c "from textbook.hooks import usedin; …"
  averaging      0        linear-system  2        parabolic      0
  optimisation   1        eigenvalue     1        hyperbolic     0
  root           3        saddle-point   1        elliptic       0
```

**The fix, and it needs no new page.** Add `:::class averaging` where a standard error
first appears — a-level 14.3 §2 *The standard error*, ie-lc 11.7 (margin of error) and
11.9 (confidence intervals) — and `:::class optimisation`/`linear-system` where a line is
fitted. That populates `averaging`'s list from the derived scan, which is what `:::used`
was built to do.

**Done means:** `site/numerical-methods/averaging/index.html` lists at least three
sections under *Used in this collection*; `tests/test_class_links.py` passes (it checks the
emitted href against the registry).

### 144 — The A–Z counting table says 81 methods; the page names 76; the home page says 76

**Measured.** The per-class column of the table at the top of `techniques/index.md`
against the method blocks actually in each section:

```
  section            blocks  table
  Finding a state        19     20
  Linear systems         20     21
  Eigenvalues             8      9
  Moving problems        19     20
  Averaging              10     11
  totals                 76     81
```

The diagnosis is exact, and it is one row. Before `b86f6fb8` each class was a four-column
table, and the counting column was taken from **that table's row count including its
header row**:

```
$ git show b86f6fb8^:books/numerical-methods/docs/techniques/index.md > /tmp/pre.md
$ # data rows / header rows per section, in the old shape
  Finding a state    data=19 header=1  -> 20
  Linear systems     data=20 header=1  -> 21
  Eigenvalues        data= 8 header=1  ->  9
  Moving problems    data=19 header=1  -> 20
  Averaging          data=10 header=1  -> 11
$ git show b86f6fb8^:…/techniques/index.md | grep -c '^| '
81
```

So every figure is one too high: 81 − 5 header rows = 76, which is exactly the number
`test_every_method_states_its_step_in_symbols` asserts and the home page prints. The
conversion to blocks carried the number over and the header row went with it. **No test
reads the per-class column**, so it has been free to be wrong since the conversion.

With the header removed the column sums to 76, which is right for a count of *entries*.
Two labelling facts still need stating rather than patching:

1. 19 of the 76 entries name a family (`Secant, false position`; `Lanczos, Arnoldi`; …).
   Splitting those on their commas gives 97 named methods, so the home page's label
   "methods named in Methods, A to Z" claims 76 while the page names 97 — the over-claim
   the book's own appendix warns against ("never imply more precision than the claim
   has").
2. the cross-class methods (`Newton`, `Quasi-Newton (Broyden)`, `Multigrid`) appear once
   in the total and once in each class they belong to, which is right for a column of
   *entries* and wrong for a column of *methods*.

**The fix.** Subtract the header (or count `### ` blocks, which is what the test does),
relabel the column `entries`, footnote that a family is one entry and a method in two
classes appears in both, and add the test: the column sums to the number of method
blocks. Then choose one label for the home page — `method entries`, or
`76 entries covering 97 named methods` — and make `_counts()` agree.

### 145 — A-level tells the reader $r$ is never computed, and a review bank requires it

**Measured.**

```
$ sed -n 37,38p "books/a-level-maths/docs/Chapter 14/Section 14.4/Walkthrough/index.md"
In this section the value of $r$ is always given. The calculation of $r$ is not
required; the work is to interpret the value and to test it.
$ grep -n "statement:.*Pearson\|statement:.*least-squares" \
      books/a-level-maths/problems/chapter-13-review.yaml
79:   … Work out Pearson product-moment correlation coefficient $r$.
91:   … find the least-squares regression line $y = a + bx$.
```

Both are excluded by the specification the book follows, in the book's own recorded words:
`research/sources/a-level-maths/dfe_a_level_content.txt:514-516` — L2, "(calculations
involving regression lines are excluded)" — and `:583` — O1, "(calculation of correlation
coefficients is excluded)". AQA 7357 repeats both (`aqa_7357_spec.txt:875`, `:952`).

So the collection teaches the reader that these two calculations are not required, and
then a mixed-review bank in another chapter requires them. The items are *checkable* —
that is why they exist — but a bank that asks for an excluded computation sets a
different syllabus from the one the page states.

**The question, not a decision.** Two readings, and the author should choose: either the
two review items become "here is $r$; interpret it and test it" (which is what the DfE
asks for), or the books say plainly that the fit and the coefficient are computed for the
reader because a computer can, and never required. The second is defensible for
`maths-applied` 2.12, where fitting *is* the modelling; it is harder to defend in a
Chapter 13 review of distributions. Escalate rather than pick.

### 146 — GCSE claims S4 and teaches neither the modal class nor an estimate from grouped data

**Measured.**

```
$ grep -rn -i "modal" books/gcse-maths/ | wc -l
0
$ grep -rniE "midpoint of (each|the) class|estimated mean|mid-interval" books/*/docs/ | wc -l
0
$ grep -rn "answer_label: 'The estimated mean'" books/*/problems/*.yaml
books/a-level-maths/problems/chapter-11-practice-11.3.yaml:78
```

The only trace of the method in the collection is one bank item's answer label.

S4 requires "appropriate measures of central tendency (median, mean, mode and **modal
class**)" (`research/sources/gcse-maths/dfe_content.txt:432-433`), and OCR's 12.03a
elaborates: "Find the **modal class**, and calculate **estimates of the range, mean and
median for grouped data**, and understand why they are estimates"
(`ocr_spec.txt:2231-2238`). The book says S4 is covered —
`CURRICULUM-MAP.md:132` maps it to 24.3, 24.4, 25.1, 25.5 — and 24.4's own objective
narrows itself to "a frequency table **where the data values are given**", i.e. ungrouped.
Chapter 25's Review then promises the other half without teaching it:

```
24:$26.5+1.5\times9=40$, so 42 is a possible outlier. The data are not grouped,
25:so you can make a box plot directly. Grouped data would give estimates from a
26:cumulative frequency graph or histogram.
```

**And the collection asks for it anyway.** `books/a-level-maths/problems/
chapter-11-practice-11.3.yaml`, item `p7-grouped-mean`, asks the reader to "estimate the
mean" from a grouped table using midpoints 5, 15 and 25 — with no Learn page in any book
that teaches it:

```
$ grep -rn -i "midpoint" books/a-level-maths/docs/Chapter\ 11/*/*/index.md
…/Section 11.1/Guided problems/index.md:156: Find the midpoint of $3.1$ and $3.5$: add them and divide by 2.
```

That is the only hit in the chapter, and it is a hint about averaging two numbers. The item
also carries `refs: [L1]`, and L1 is "interpret diagrams … area in a histogram represents
frequency" — estimating a mean from class midpoints is not L1. The nearest honest label
is L3 ("interpret measures of central tendency and variation"), and even that is a stretch:
the DfE content does not name the grouped estimate at all, only OCR's elaboration does.

**The fix.** One new subsection in GCSE 24.4 (estimated mean from a grouped table, with
the "why it is an estimate" sentence S4/OCR ask for) and one in 24.3 or 24.4 for the modal
class; the equivalent half-page in a-level 11.5, because its bank already asks; and `p7`'s
refs corrected to `[L3]` (or to whatever the author judges right, with the reason written
down). That is a methods change, not a data-cleanup one: choosing a class midpoint is a
modelling decision with a stated cost.

**Done means:** `grep -rn -i "modal" books/gcse-maths/docs/ | wc -l` is at least 5;
`grep -rniE "midpoint" books/a-level-maths/docs/Chapter\ 11/*/*/index.md` includes a Learn
page, not only a hint; the two banks gain items whose answers the `statistic` kind can
prove; `uv run python -m textbook.verify books/gcse-maths/problems/` and the a-level
equivalent both report `ok`.

### 147 — The statistical half is thin where the collection already knows the figure

**Measured.** `ie-lc-maths` Chapter 11: 11 sections, 19,848 words, **0 figures**. Its
Higher sections are 11.7 (margin of error), 11.8 (the central limit theorem), 11.9
(hypothesis testing and confidence intervals) — the three most counter-intuitive ideas in
the collection, all prose. `ideas.md` §5 already names the figures for them, and the
collection already owns three that carry the ideas:

```
$ ls books/a-level-maths/docs/assets/figures | grep -E "sampl|tail|normal-test"
ch11-sampling-variability.js   the sample mean varying with n
ch14-binomial-tail.js          the null distribution, critical region and p-value
ch14-normal-test.js            z, the SE and the tail as the reader moves xbar, sigma and n
```

None is mounted in `ie-lc-maths`. But `ch11-sampling-variability` uses `Math.random`
(see 148), so promoting it as it stands would export a defect.

**The fix, in this order.** Fix the seeding (148), then move those three modules into
`assets/figures/` — they are generic tools, not one book's lesson, which is the library's
stated purpose (`assets/AGENTS.md`, and `tests/test_figures.py:625`
`test_a_book_may_not_shadow_a_shared_module`) — and mount them on ie-lc 11.7–11.9 with a
`Predict → Test → Explain` frame per `research/pedagogy.md` P6. Moving a module means
updating the module's header comment, which names the section it was written for.

### 148 — The guided-investigation figure the statistics teaching leans on is not reproducible

**Measured.**

```
$ grep -rn "Math.random" books/*/docs/assets/figures/*.js assets/figures/*.js
books/a-level-maths/docs/assets/figures/ch11-sampling-variability.js:48:
    const value = POPULATION[Math.floor(Math.random() * POPULATION.length)];
$ grep -rn "Math\.random" tests/ tools/src --include="*.py" --include="*.ts" | wc -l
0
```

`assets/AGENTS.md:78` is unconditional: "Use `seed()` for randomness, never
`Math.random`. A figure that samples must be reproducible: two readers comparing what they
saw must be comparing the same data, and the browser check cannot assert anything about
data that changes on every load." The kit's own docstring gives a third reason — "a reader
who wants another sample should get one on purpose, not by accident"
(`assets/figures/src/kit/interact.ts:209-220`). The module is the one the 11.1 investigation
runs on ("Set the sample size to its smallest value and take several samples"), so the
rule is broken exactly where it matters most. Nothing enforces it: no test reads a module's
text for randomness — `tests/test_figures.py` has 22 tests and 23 `read_text` calls, and
not one of them looks for `Math.random`.

**The fix.** `import { …, seed }`, `const rng = seed(1)`, and
`rng.int(0, POPULATION.length - 1)`; then the missing test, beside the others, so that the
next figure cannot repeat it.

**Done means:** `grep -rn "Math.random" books/*/docs/assets/figures/` prints nothing;
`tests/test_figures.py` has a test that fails on a module containing `Math.random`; the
figure draws the same sample twice on reload.

### 149 — The Leaving Certificate booklet widget cannot show the two tables its own pages tell the reader to use

**Measured.**

```
$ python3 -c "import yaml,pathlib; d=yaml.safe_load(<ie-lc-maths booklet>); print('tables' in d)"
False
$ grep -c "  - id:" books/ie-lc-maths/booklet/ie-lc-maths.yaml
96          # all under `sections`; no `tables:` key at all
$ grep -n "standard normal table" books/ie-lc-maths/docs/Chapter\ 11/Section\ 11.6/Walkthrough/index.md
19:standard normal table.
88:The standard normal table in the booklet gives $P(Z \le z)$, the area to the left of
```

11.6 sends the reader to "the standard normal table in the booklet", and the booklet
widget cannot render it. What the widget *does* carry is `standard-normal-density`, the
**formula** $f(Z)=\frac{1}{\sqrt{2\pi}}e^{-Z^2/2}$ — a different thing from the grid of
areas, and not what a reader who needs $P(Z\le1.88)$ is being pointed at.

The SEC document contains the grid ("Dóchúlachtaí don dáileadh normalach caighdeánach /
Probabilities for the standard normal distribution"), Spearman's rank-order critical values,
and the Pearson significance formula $t = r\sqrt{n-2}/\sqrt{1-r^2}$, $\nu = n-2$, all in
the statistical-tables run of the booklet
(`research/sources/ie-lc-maths/SEC_Formulae_and_Tables.txt`: Pearson formula at 869-871,
the normal grid at 875-1008, Spearman at 1043-1055). Cite line ranges rather than page
numbers when writing it up: the extraction prints the page footer **after** the page's
content, so a page number read off it is off by one.
`ie-lc-physics` models its two tables under `tables:` (`particle-physics`, `quarks`), and
`gcse-maths` models three — so the mechanism exists, is used, and this booklet does not
use it. `BOOKLETS.md` records the LC Mathematics booklet as **built**, which is true of
the formulae and false of the tables.

**The fix.** Add a `tables:` section to `books/ie-lc-maths/booklet/ie-lc-maths.yaml` with
the standard normal table — what the document prints is 31 rows, $z = 0.0$ to $3.0$ in
steps of 0.1, each with the ten columns 0.00–0.09 — and the Pearson/Spearman critical
values, `provision: {sec: given}` on each, keywords for search, and the line range in a
`note`. This is the one finding in this appendix that is **data rather than method**, and
it is here because 11.6, 11.8 and 11.10 all name the table and `11.10`'s whole Higher
extension is "match a coefficient to a critical value".

**Done means:** `python3 -c "import yaml…; print(len(d['tables']))"` is 2 or more; the
booklet widget shows both on `ie-lc-maths` and neither on `a-level-maths`; the two pages
that name the table link to it; `grep -rn "standard normal table" books/ie-lc-maths/docs/`
still reads the same, because the promise was already true of the paper booklet.

### On machine learning, which is what the question keeps pointing at

**Measured.** In the whole collection:

```
$ grep -rin "machine learning" books/ | wc -l
1            # one table cell: optimisation, "Stochastic gradient, Adam … | Machine learning"
$ for t in "classification" "clustering" "training set" "test set" "cross-validation" \
           "regularisation" "loss function" "neural" "logistic"; do …; done
            0-4 each; every hit for "classification" is the PDE classification
```

So machine learning is currently **one price cell**, and the book is honest about that:
nothing claims to cover it.

**And it has no specification home.** The collection follows DfE content, and the DfE's
current A-level content is unchanged; the plan for data science and AI is a *level 3*
qualification announced in the Curriculum and Assessment Review, not an A-level subject
(`research/curriculum/a-level-maths.md:634`, `car_response.txt:882`). A course chapter on
it would be a claim the specifications do not make.

**Where it honestly belongs, given the map's own argument.** Every supervised method is
one of the nine boxes already: training is an **optimisation** (minimise a loss over
parameters), an expectation over data is an **averaging**, and the direction a high-
dimensional cloud varies in is an **eigenvalue** problem — which the eigenvalue page
already names, in one line: "Principal components: the directions in which data varies
most" (`eigenvalue/index.md:97`). So the map needs no tenth box and no new book, and three
small additions carry it:

1. the `Least-squares fit` A–Z entry in 142, whose step is the normal equations;
2. the `averaging/regression` detail page from Phase B, which is where least squares
   becomes *maximum likelihood* — the single conceptual bridge from a course statistics
   chapter to a learning method;
3. one line of prose on `optimisation` saying that "a model" in that setting is a
   parameterised function and "training" is the fit, so the reader who arrives from a
   machine-learning tutorial recognises the box they are in.

Anything more — a chapter, a book, a classifier catalogue — is a decision for the author
and contradicts nothing here, but it would not be a course chapter, and the reference work
is the only honest home for it.

### What this changes in the plan above

No rewrite; four amendments, all of them small:

| Where | Was | Is |
|---|---|---|
| Phase B, `averaging/regression` row | "why a small residual is not a good fit" | add: link maths-applied §1.3's deeper page for the geometry, and `ie-lc-applied-maths` §9.4 for overfitting, rather than restating either |
| Phase B, `averaging/error-bars` | the $\sigma/\sqrt N$ derivation | it is also the page a-level 14.3 and ie-lc 11.9 need a callback to (143) |
| Phase C, `optimisation` row | `optimisation/descent` | unchanged, but the `Least-squares fit` A–Z entry (142) is a prerequisite of the `averaging/regression` page's *Read next* |
| Acceptance | — | add: a page that derives least squares must cite the two existing derivations it does not repeat |

And one thing this review would add to the plan's reasoning. `averaging`'s four detail
pages are, between them, the only place in the collection where a statistical method is
*derived*. The four course books state 49 sections and 86,654 words of statistics, and
of the four methods they use, none is derived and two are not explained at all:

| method | how the course books treat it |
|---|---|
| the standard deviation | stated as a formula and used — which is defensible: a formula is a definition, not a theorem |
| the standard error | stated as $\sigma/\sqrt n$ in a-level 14.3 §2 and ie-lc 11.9, with no reason given |
| $r$ | "a calculator or spreadsheet finds $r$" (ie-lc 11.10), "the calculation is not required" (a-level 14.4) |
| the least-squares line | "found from the data" and the calculator gives it (ie-lc 11.10 §the least-squares line); 141 has the rest |

That makes the pilot a higher-stakes page than the plan implies — it is not only the shape
of a detail page being tested, it is the only derivation in the subject — and it is the
second argument for stopping for review after Phase B, which the plan already says.
