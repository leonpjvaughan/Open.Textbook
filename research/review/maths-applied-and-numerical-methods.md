# Review: Maths Applied and Numerical Methods — UX, and making the hard parts easy

A review of the two reference-shaped books — `books/maths-applied/` (15 authored pages,
14,100 words) and `books/numerical-methods/` (15 authored pages, 20,800 words, 76 methods)
— for two questions at once: **what a reader meets before they meet the mathematics**, and
**whether the hard ideas land**.

**Nothing was changed.** This file is the only artifact. Every claim below is a command and
its output, or a file and line I read.

Evidence baseline: `uv run python -m pytest tests/test_reference_books.py
tests/test_maths_applied_numbers.py tests/test_maths_applied_ladder.py -q` → **80 passed in
3.37s**. `uv run python -m textbook.lint maths-applied numerical-methods` → `scanned 34
pages`, no findings. So nothing below is an existing failure of a check; that is part of the
point.

---

## Verdict

**The prose is not the problem, and the figures are not the problem.** Both are better than
the collection's median and both are measured: 19 figures between the two books (8 in
`maths-applied`, 11 in `numerical-methods`), every one clearing 4.5:1 on text and 3:1 on
shapes in both schemes. Seven of them declare 25 claims between them, and none is untrue
(`node tools/dist/cli.js audit site --json`, `readout site --verify`, both filtered by
book). Reading-grade is 8.7 for `maths-applied` and 8.55 for `numerical-methods`, which
is inside the house register; the lint's own sentence ceiling finds 0 long sentences on the
largest page in either book.

**The problem is the layer between the prose and the reader.** Four things, in order of how
much they cost a reader:

1. **Neither book has in-page structure a reader can navigate, and both are long.** The
   Markdown `toc` extension is not enabled, so **0 of 4,504 built pages carry an `id` on a
   body heading** — and `numerical-methods` ends up hand-writing all 83 of its anchors as
   `<a id>` in the source to work around it. The two consequences are worse than the
   absent table of contents: a deep link lands **97px under a sticky masthead** (measured),
   and `techniques/` — 4,572 words, 21,847px at 390px — has five sticky `h2`s that
   **all stack at `top: 0`** and are then covered by the masthead.
2. **`numerical-methods` uses its own vocabulary before it defines it, in the exact places a
   reader goes first.** `stiff` 36 times, defined once, on the home page; `preconditioner`
   19 times and never defined on a class page; `Krylov` 17 times, first used on
   `eigenvalue`; `LBB` 2 times, never expanded; `CFL` 4 times, expanded nowhere. All five
   appear first inside a **table cell** or a **price line**, which is the one place a
   definition cannot go.
3. **No class page works an example through to a number.** Digits in prose outside tables
   run 0–6 per page, and `averaging` and `eigenvalue` have **none at all**. A reader is told
   the class and given the equation, and never sees the equation produce a number. That is
   precisely the gap a reader of this book arrives wanting closed.
4. **`maths-applied` states one agreement comparison in two different numbers, on four
   pages, and no check reads any of them** — `10⁻¹⁶ m` on §1.3 and §1.4, `10⁻¹² m` on the
   Review and §1.1's depth page. The model's own value is `9.6 × 10⁻¹⁷ m`.

Plus four smaller UX defects, each measured: a 271 kB photograph for a 352px slot, a
near-duplicate paragraph between §1.5's depth page and §1.6's *Watch out*, a bullet list
that renders as literal `- ` text on two class pages (and 20 more pages elsewhere in the
collection), and `0 chapters / 0 sections` printed on the landing-page card for
`numerical-methods`.

---

## Count by severity

| Severity | Count |
|---|---|
| Blocking | 4 |
| Worth doing | 7 |
| Taste | 3 |
| **Total** | **14** |

---

## Blocking

### B1. No heading has an `id`, so neither book can be navigated, deep-linked or read in print

**Measured.**

```
$ # pages whose body headings carry an id
pages whose body headings carry an id: 0 of 4504
```

`engine/src/textbook/pipeline.py:231` names the cause in a comment that is true and has a
consequence nobody costed:

```python
EXTENSIONS = [
    "md_in_html", "tables", "fenced_code", ArithmatexExtension(generic=True),
]
# Headings carry none (the Markdown ``toc`` extension is not enabled), so a fragment
# naming a heading slug is reported rather than silently accepted   # :1150
```

`pipeline.check_links` (`:1134`) is built on that: a fragment must name an explicit
`<a id>`. So the only way to link a section is to hand-write the anchor — and
`numerical-methods` has done it 83 times:

```
$ grep -c '<a id="' books/numerical-methods/docs/**/*.md | ...
hand-written <a id> anchors: 83 across 3 files
  maths-applied: 0
  numerical-methods: 83
```

Those 83 anchors are invisible to the reader: they are empty `<p><a id="…"></a></p>`
elements above a heading, so **nothing on the page is a link**, and there is no table of
contents anywhere in either book.

Three defects follow, and two of them I measured in a browser.

**A deep link lands under the masthead.** The masthead is `position: sticky; top: 0;
z-index: 5` (`engine/src/textbook/css/shell.css:46`), and there is no `scroll-margin-top`
anywhere in the repository:

```
$ grep -rn "scroll-margin\|scroll-padding" engine/src/textbook/css/ assets/stylesheets/ …
(no output)

/numerical-methods/choosing-the-class/#the-same-equations-classified
   {"mastBottom":97,"anchorTop":0,"hiddenByMasthead":"97px",
    "following":"H2 The same equations, classified"}
/numerical-methods/worked-case/#what-a-kernel-is
   {"mastBottom":97,"anchorTop":0,"hiddenByMasthead":"97px",
    "following":"H2 What a kernel is"}
```

Both of those are links **from `numerical-methods/docs/index.md`** — the home page sends a
reader to a heading that arrives 97px under the bar, so the heading they were promised is
invisible and they see the middle of the previous paragraph.

**`techniques/` sticky headings all stack at the same offset.** `book-local.css:62` sets
`position: sticky; top: 0` with the comment "`top` clears the masthead, which is not sticky"
— but the masthead *is* sticky, and the headings are not one sticky heading, they are five:

```
$ # after scrolling into the Linear systems section, at 1280px
{"mastBottom":57,"stuckHeadings":[{"t":"Finding a state","top":0},{"t":"Linear systems","top":0}],
 "covered_by":"DIV.wrap masthead__inner"}
```

`elementFromPoint` at the top of the viewport returns the masthead, i.e. the sticky
headings are behind it. At 390px the masthead is 97px tall, so **the first 97px of every
stuck section heading is hidden** and the reader scrolling a 21,847px page has no idea which
of the five sections they are in. This is the one feature on the page that exists to solve
exactly that problem, and it does not work.

**What it costs.** A reader arriving from search, or from a `:::deeper` link, or following
one of the 19 fragment links in these two books, lands in the wrong place. This is
`research/design/navigation.md`'s subject — that file argued for a pager because "a reader
who has just finished a section is exactly the reader most likely to carry on" — and the
same argument applies within a page and was not made.

**The fix, in the order it should be done.**

1. Enable Python-Markdown's `toc` extension with `slugify` and `permalink` in `EXTENSIONS`,
   so every `##` gets an `id` and a stable slug. This is one line plus a test.
2. Replace `check_links`' rule "a fragment must name an explicit `<a id>`" with "a fragment
   must name an `id` in the target, however it got there". The 83 hand-written anchors keep
   working; nothing has to be rewritten.
3. Add `scroll-margin-top: calc(var(--tb-masthead-height))` to `:is(h1,h2,h3,h4,[id])`,
   with the masthead height exported as a token rather than guessed, and a test that reads
   the computed offset. `--tb-masthead-height` also fixes `book-local.css`'s `top: 0`.
4. Add a small in-page contents list to pages over a word ceiling — `techniques/` and the
   five longest class pages in `numerical-methods`, and `maths-applied` §1.2, §1.5 and §1.6
   (1,629 / 1,800 / 1,789 words). It is a `:::contents` directive reading the same heading
   list the `toc` extension produced, so it cannot rot.
5. Delete the 83 `<a id>` lines the `toc` slugs now cover, checking each against the slugs
   the extension produces, because `augmented-lagrangian` and `quasi-newton-broyden` are
   slugs an author chose and the extension would generate as
   `quasi-newton-broyden` and `augmented-lagrangian` — those agree — but
   `sparse-direct-cholesky` (author's) against `sparse-direct-cholesky-lu-multifrontal`
   (generated) does not. **31 of the 81 anchors on `techniques/` would be named differently
   by the extension** (measured: `markdown.Markdown(extensions=["toc"])` run over each
   heading), so every one of those 31 keeps a hand-written anchor and gains the slug alias.

### B2. `numerical-methods` uses technical words before defining them, and always in a table

**Measured**, first appearance of each term by page order, and whether a
`X is/are …` definition exists anywhere in the book:

| term | uses | first appears | defined |
|---|---|---|---|
| `stiff` | 36 | `index.md` 69, inside a table cell | once, same cell |
| `preconditioner` | 19 | `linear-system` 98, inside a technique table | **never** |
| `Krylov` | 17 | `eigenvalue` 40, in a bullet | only as "$\mathcal K_k$ is the Krylov space spanned by $b$, $Ab$" in the A–Z symbols block |
| `CFL` | 4 | `hyperbolic` 40 | expanded once as "the **CFL condition**", never as "Courant–Friedrichs–Lewy" |
| `LBB` | 2 | `saddle-point` 115, inside a symptom table | **never** |
| `smoother` | 6 | `elliptic` 80, inside a technique table | **never** |
| `discretis*` | 14 | `index.md` 103 | **never** |
| `condition number` | 6 | `linear-system` 67 | yes, in the A–Z symbols block only |

```
$ grep -rn -i "a preconditioner is\|preconditioner is a\|preconditioning is" books/numerical-methods/docs
(no output)
$ grep -rn "LBB" books/numerical-methods/docs
saddle-point/index.md:115:| The pressure has a checkerboard pattern | … | An LBB-stable pair, or stabilisation |
symptoms/index.md:47:| The pressure has a checkerboard pattern | … | An LBB-stable pair, or stabilisation |
```

**Why this is blocking and not a glossary item.** `AGENTS.md` says "explain every term on
first use", and this book's own voice section says "**Name the class, and name the
alternative**" — so the book already believes in naming things precisely. The failure is
positional: a reader who meets `preconditioner` in a table's *when it wins* column has no
room in that cell for a definition, so the word arrives as an unexplained price. There is
no page they can go to.

The A–Z does carry deflationary one-liners — `M$ is a preconditioner that approximates $A$`
(`techniques/index.md:420`) — but the A–Z is the *fourth* page of this book a reader reaches,
and it is 4,572 words long with no contents. So the one sentence that would have explained
the word sits 20 pages after the word.

**The fix.** Two paragraphs, both in the book's existing voice, both short:

- **On `linear-system`**, where `κ` already appears: one paragraph on what a preconditioner
  is — "the iteration solves an easier problem with the same answer, and then corrects it",
  with the A–Z row's `M⁻¹Ax = M⁻¹b` as the step — because `linear-system` is where the
  iteration count is the topic and it is the page that says "the work is in the matrix".
- **On `elliptic`**, where the smoother appears: one sentence that a smoother is one sweep
  of Jacobi or Gauss–Seidel, and that multigrid's idea is to use a *coarse* mesh for the part
  of the error a sweep cannot see. That is the page whose whole argument is why a Krylov
  method is "crippled" (`elliptic:51`) — and it uses "smoother" and "Krylov" both before
  either exists for the reader.

Then `LBB` and `CFL` get spelled out on first use (`saddle-point`, `hyperbolic`), which is a
word each. `discretis` needs one sentence on the home page, because the home page uses it to
explain why `linear-system` exists at all (`index.md:103`).

**And a check, or it will happen again.** `tests/test_reference_books.py` already has 50
tests and reads both indexes; add one that fails when a term in a small list (`stiff`,
`preconditioner`, `Krylov`, `CFL`, `LBB`, `smoother`, `discretise`) appears before its
definition — the same shape as `test_every_method_states_its_step_in_symbols`, which is the
precedent for "a row with no arithmetic is a glossary entry".

### B3. No class page works an example through to a number, and two have none at all

**Measured.** Digits in a class page's prose, excluding tables and headings:

| page | digits in prose | display equations containing a number |
|---|---|---|
| `optimisation` | 3 | 1 |
| `averaging` | **0** | 1 |
| `eigenvalue` | **0** | 0 |
| `linear-system` | 6 | 0 |
| `root` | 2 | 2 |
| `saddle-point` | 1 | 3 |
| `elliptic` | 1 | 0 |
| `parabolic` | 3 | 0 |
| `hyperbolic` | 3 | 1 |

The two with zero are the two whose pages are the book's thinnest (`averaging` is 937 words
with ten priced methods and no derivation — that is item 139 in `.agents/todo.md`, which
is about a *detail track*, a larger and separate job; this is nine lines of prose).

**What a reader gets.** `averaging` says the error falls as `1/√N` and that "four times the
work halves the error", then hands over a Monte Carlo figure and a ten-row table of methods.
Nothing in the prose says **how big the error is at the figure's own settings**, so a reader
cannot check the claim against the thing on the page. `eigenvalue` says `Av = λv`, prices
nine methods, and never shows a matrix whose eigenvalues are 2 and 3. The figure
(`power-lab`) does compute those numbers — its readout prints `λ` and the angle — and the
prose beside it discusses the ratio in words without quoting either.

**Why this is blocking for these two books specifically.** `maths-applied` is the book whose
entire thesis is *"with a number"*: "Where two models overlap, show that they agree — with a
number", "the section names the model", "an agreement panel shows a number". A reader who
crosses from `maths-applied` §1.5 into `numerical-methods`'s `root` page — which
`:::class root` invites them to do — meets a page with no numbers at all. The reference work
does not keep the promise the course-shaped book just made.

**The fix.** One worked line per class page, in the *What it becomes on a computer* section,
computed rather than typed, in the pattern the book already uses on
`reading-the-class` (a printed program and its printed output). For the two thinnest:

- `averaging`: the figure's own settings. "The figure draws 1,000 samples of a quantity with
  σ = 1: the error bar is 0.03, and a thousand more samples would make it 0.022, because
  1/√2 is 0.71." That number already exists in `monte-carlo-lab`'s readout, so it is a
  `claim()` away from being checkable.
- `eigenvalue`: `[[2, 1], [1, 2]]` has eigenvalues 1 and 3 with eigenvectors `(1, −1)` and
  `(1, 1)`, and `power-lab`'s ratio is 3 after one step. One matrix, two eigenvalues, and
  the figure that already draws it.

Register this as a defect in the two class pages, not as a demand for the detail track:
item 139 is a different, larger job, and this one is nine lines of prose and nine `claim()`
calls.

### B4. `maths-applied` states one agreement comparison as two different numbers, and no check reads either

**Measured.** Four places, two numbers, one comparison:

```
$ grep -rn "10⁻¹²\|10⁻¹⁶" books/maths-applied/docs --include='*.md'
Review/index.md:55:| Three-row least squares | §1.2's closed form | the same pose, to 10⁻¹² m |
Review/index.md:81:4. A model has a least-squares residual of 10⁻¹² mm and a null vector with
Section 1.1/Deeper/the-four-models/index.md:23:| Two legs | … | the same pose, to 10⁻¹² m |
Section 1.3/Walkthrough/index.md:110:| Least squares, after five steps | agrees with §1.2's closed form to 10⁻¹⁶ m |
Section 1.4/Walkthrough/index.md:122:| Least squares with all three rows | same point as §1.2, to 10⁻¹⁶ m |

$ grep -rn "10⁻¹²\|10⁻¹⁶\|1e-12\|1e-16" tests/test_maths_applied_numbers.py tests/test_reference_books.py
(no output)
```

**Three separate problems in those lines.**

1. **No test reads any of them.** `test_maths_applied_numbers.py` is 611 lines of exactly
   this discipline — "Chapter 1's prose numbers, recomputed from the models that produce
   them" — and it pins the singular values, the arm lengths, the rigid change, the ladder,
   the trajectory. The chapter's most load-bearing agreement claim is the one it does not
   pin.
2. **They disagree, and no page says which number is the achievement.** §1.3 and §1.4 say
   `10⁻¹⁶ m`; the Review and §1.1's depth page say `10⁻¹² m`. Run the model the §1.3 figure
   imports, from the figure's own start (`[0.75, 0.6]` at 5.32°), and the residual at step 5
   is **9.6 × 10⁻¹⁴ mm**, which is **9.6 × 10⁻¹⁷ m** — so `10⁻¹⁶ m` is the honest statement
   and `10⁻¹² m` is four orders weaker than what the model achieves. The *pose* difference
   at step 5 is stronger still: it is **exactly 0.0 m**, because the two poses are the same
   doubles. So two pages understate the result by four orders, two pages state it, and the
   strongest and simplest form of the claim — "the same pose" — appears on none of them.
3. **The claim changes shape as it travels.** On §1.3 and §1.4 it is a *distance* (`10⁻¹⁶ m`);
   in the Review's table it is a *pose* (`the same pose, to 10⁻¹² m`); and in the Review's
   question 4 it becomes a *residual* (`10⁻¹² mm`), which is a third quantity in a third
   unit. A reader following the chapter's own cross-references meets what looks like three
   different agreements.

The same measurement shows the number is *round-off*, not a modelling achievement — §1.3's
own text says so ("the smallest number a double precision float can tell apart from
nothing"). So stating it at three different precisions invites a reader to read precision
into noise, which is the one thing `books/maths-applied/AGENTS.md` forbids: "A model whose
geometry is illustrative does not get four decimal places."

**The fix.** One sentence, one number, one test.

- State the agreement as **"to the last bit of a double, about 10⁻¹⁶ m"** where the
  comparison is arithmetic (§1.3, §1.4), and **"the same pose"** where the point is
  structural (§1.1's depth page, the Review) — because a row whose claim is "these are one
  equation" does not need a distance at all.
- Add `test_section_1_3_and_the_review_agree_on_the_roundoff_floor` to
  `test_maths_applied_numbers.py`, reading both pages and the model's own last-iteration
  pose difference, in the shape of the existing `test_three_pages_state_the_same_rigid_change`
  (which already exists precisely because this class of drift happened once, on the 1.95°).
- Add a test for the instant-centre distance on §1.2, which is unread and is stated three
  **different** ways on the page and its figure. Measured against `mechanism.js` at rest:
  `ic.x = −1.6024`, the wheel centre is at `x = 0.76`, so **`|ic.x| = 1.60 m` (distance from
  the car's centreline, `x = 0`) and `hub.x − ic.x = 2.36 m` (distance from the hub)`**. The
  prose says "It is 2.36 m from the hub" — correct. The table's column says "1.60 m
  inboard" — correct, if "inboard" means from the centreline. **The figure's readout says
  "The instant centre is 1.60 m inboard of the hub"**, which is a number from the
  centreline carrying the hub's name, and it contradicts the prose by 0.76 m on the same
  page. `wishbone-hero.js:253` is `Math.abs(state.ic[0])`, so the readout can only ever
  print the centreline distance. One of the two words has to move: either "inboard of the
  car's centre" in the figure and the table, or `hub.x − ic.x` in the figure with the
  table following. It is the same defect as the `10⁻¹²`/`10⁻¹⁶` pair — a number whose
  definition lives in the code and not on the page — and it is the one that a reader with a
  tape measure would catch.

---

## Worth doing

### W1. The one photograph is 271 kB for a 352-pixel slot

```
$ du -b books/maths-applied/docs/assets/images/front-corner.jpg
277362   (900 × 1319)
$ node tools/dist/cli.js budget site "/maths-applied/chapter-1/section-1.1/learn/"
largest   /maths-applied/assets/images/front-corner.jpg 271 kB
transferred 896 kB
```

`.corner-photo { max-width: min(100%, 22rem) }` — so the slot is 352 CSS px, and a 2×
display needs 704px, which is 78% of the image's width. **The single largest byte on the page
is delivered at 2.56× the linear resolution it can display**, and it is on §1.1, the first
page a reader opens.

**Fix.** Re-encode once at 704×1032, and ship a `srcset` at 352 and 704 with `sizes="22rem"`.
Encoding at quality 80 for a photograph of painted metal saves most of the 271 kB. The
`<img>` is the only one in either book (`grep '<img ' books/*/docs` → 1 hit), so this is a
one-file job, and `tools budget` will show the number move.

### W2. §1.6's *Watch out* repeats §1.5's depth page, and the better version is the one that is optional

The two passages say the same thing:

- `Section 1.5/Deeper/equilibrium-without-time/index.md`, "The trap: simulating your way to
  a steady state": *"The expensive way to find a static answer is to add mass, run the
  dynamics, wait for the motion to die away, and read the answer off the end. It usually
  gives the right number and it is usually a bad trade. It costs a time step, an integrator,
  a set of initial conditions and a stopping rule."*
- `Section 1.6/Walkthrough/index.md`, "Watch out": *"The tempting shortcut is to run a
  dynamic simulation, wait for it to stop moving, and call the result the steady answer. It
  usually is, and it usually takes long enough that nobody checks."*

The §1.5 version is **better** — it names the four costs — and it is on the page a reader is
explicitly told they do not need. §1.6 is a main-thread section that §1.5's depth page
promises: "Mass is not a cost to be paid for accuracy. It is the right model for a different
question — what happens *during* the movement — and §1.6 is where that question lives." So
the depth page hands the reader forward to §1.6, and §1.6 then repeats the depth page in
weaker words.

**Fix.** §1.6's *Watch out* keeps only the part that is §1.6's own: the dynamic model's
camber must equal the static model's at the same travel, to 0.001°, and the massless limit
is the sharper test this model cannot run. The "do not simulate your way to a steady state"
paragraph is deleted from §1.6 and one clause added to the §1.5 depth page's forward
reference — so the argument appears once, in the place where the choice is made.

### W3. Two bullet lists render as literal `- ` text, and the class pages are two of the 22

```
$ # built pages that render a bullet list as literal "- " text inside a paragraph
22 built pages …
   site/numerical-methods/elliptic/index.html
   site/numerical-methods/root/index.html
   … and 20 pages in ie-lc-maths, ie-lc-physics, ie-lc-applied-maths
```

`root/index.md:57` is the source:

```markdown
in closed form. There is no region and no time. The difficulty is:
- which of the solutions you land in;
```

Python-Markdown needs a blank line before a list. `engine/src/textbook/lint.py:62` already has
the pattern (`LIST_ITEM`) and `prose_paragraphs` (`:66`) uses it to treat a list item as
structure — but nothing checks whether the list is *preceded* by one, so the defect ships.

**Why it matters more than one missing blank line.** The 22 pages are the collection's
evidence that this is a *class* of defect and not a typo. On `root` and `elliptic` the
broken list is in the *signature* section — the three lines that tell a reader what makes
this class this class — so the most important content on the page renders as a paragraph
with three hyphens in it.

**Fix.** A blank line on both `numerical-methods` pages, and a lint rule that fires on a
line immediately following a prose line and matching `^\s{0,3}([-*+]|\d+\.)\s` with no blank
line between. The rule is four lines and it turns 22 existing defects into a build failure,
so the 20 elsewhere need the same blank line in the same commit — a mechanical edit,
verified by rebuilding and grepping the 22 routes for `\n- ` inside a `<p>`.

### W4. `numerical-methods`'s landing-page card says `0 chapters / 0 sections`

```
$ # site/index.html, the Numerical Methods card
<li>0 chapters</li>  <li>0 sections</li>
```

`engine/src/textbook/portal.py:152` already solved this for the proof book — "A course counts
chapters and sections; a reference work has neither, and `0 chapters` is not a fact about it
— the proofs are" — and the condition is:

```python
if book.proofs:
    facts = [f"{len(book.proofs)} proofs"]
else:
    facts = [f"{book.chapter_count} chapters", f"{book.section_count} sections"]
```

`numerical-methods` has no `proofs:`, so it falls to the else. The comment beside it is
correct and the branch does not implement it: it discriminates "has a proof registry" from
"has a syllabus", and there is a third case.

**Fix.** Branch on `book.qualification == books.REFERENCE`: a reference work with proofs
counts proofs, and one without counts **pages and methods** — `15 pages`, `76 methods` for
this book, both already computed by `Book.pages` and the A–Z. The number is then a fact
about the book rather than a zero.

### W5. `maths-applied` cross-references `§1.x` sixty times and links none of them

```
$ # §-references against links to a section page
Chapter 1/Section 1.1/Deeper/the-four-models/index.md  §-refs=14  links-to-sections=0
Chapter 1/Section 1.3/Walkthrough/index.md             §-refs= 8  links-to-sections=0
Chapter 1/Section 1.6/Walkthrough/index.md             §-refs= 8  links-to-sections=0
Chapter 1/Section 1.5/Walkthrough/index.md             §-refs= 6  links-to-sections=0
Chapter 1/Review/index.md                              §-refs= 5  links-to-sections=0
…
```

60 `§`-references, **zero** links. `maths-applied` is a single chapter of seven sections, so
every "§1.2 says" is a short scroll away and the absence is survivable — but the book is
read in a browser, every section is a page with a URL, and the pager
(`research/design/navigation.md`) exists because this repository believes a reader should be
able to move without the contents drawer.

**Fix.** Not 60 hand-written links: one lint pass that rewrites `§1.N` on first use per
page into `[§1.N](../Section 1.N/Walkthrough/index.md)` — the paths are already mechanical,
since `curriculum.yaml` owns them. Then the *deeper* pages keep plain `§1.N` for repeats,
which is how `books/AGENTS.md` already handles a repeated reference.

### W6. `numerical-methods`'s home page promises a route it does not give: a class page has no way back to the nine kinds

The home page's argument is the nine-kinds table, and it ends "Three ways in". But a class
page's *Read next* lists two or three neighbours and never the map:

```
$ # Read next on all nine class pages
root  → saddle-point, optimisation, symptoms
elliptic → saddle-point, parabolic, techniques, symptoms
```

The sidebar gives the list, so a desktop reader is fine. On a phone the sidebar is a drawer,
and the page a reader arrives at from a search hit for "preconditioner" has no visible route
to the map that would have told them which class they are in. That is the one navigation
move this book exists to support, and it is the one it does not offer.

**Fix.** One last bullet on every class page's *Read next*: **"the nine kinds"**, linking
`../index.md`. It is a line per page and `tests/test_reference_books.py` can assert it in
one line, beside the assertion already in `test_a_class_page_names_itself_and_its_neighbours`
(`:313`) that every class page can reach `../symptoms/index.md`.

### W7. The `techniques/` symbols blocks are five 250-word walls

```
$ # the five "The symbols" blocks
block at 5908:  275 words, 16 sentences, longest 38
block at 12937: 296 words, 18 sentences, longest 31
block at 16662: 160 words, 10 sentences, longest 29
block at 22371: 271 words, 14 sentences, longest 30
block at 26850: 252 words, 11 sentences, longest 39
```

1,254 words of symbol definitions in five undifferentiated paragraphs, at the *end* of each
class section — below the 19–20 method blocks, and the first of them is 19 `###` headings
down a 4,572-word page. A reader who meets `$\operatorname{IQI}(a,b,c)$` in the Brent row has
to scroll past eighteen more methods to find out what `c` is, and then the definitions are
ordered by nothing a reader can search: they follow the method order, so the reader must
scan 275 words for one symbol.

**Fix, and it is the same fix as B1.** The symbols block becomes a two-column `<dl>` — symbol,
meaning — inside a `<details>`, opening on the reader's click at the point of use. The words
do not change; the markup does. `diagram()` and `table()` already exist in the kit, and
Python-Markdown's `md_in_html` is already enabled, so `<details markdown="1">` works.

---

## Taste

### T1. The masthead says the wrong thing on every `maths-applied` section page

`<title>1.5 Bushes are not rigid — Learn — Maths Applied</title>` and the sidebar entry is
`Learn`. `books/maths-applied/AGENTS.md` says "use the friendly names (`Learn`, `Practise
with help`, …)" — but this book has **no other kind of page**, so "Learn" distinguishes
nothing; the reader sees `1.1 The question / Learn`, `1.2 One rigid triangle / Learn`, seven
times. The `deeper` pages are named by their own titles, which is right.

The engine has one word for the page kind in `scaffold.py:184`
(`("Walkthrough", "walkthrough", "Learn", "learn")`), and a book that declares
`section_pages: [learn]` could say what its one page kind is called. One field in
`book.yaml`, and the sidebar becomes `1.1 The question` with no child.

### T2. `numerical-methods` never says what the reading order is, and it has one

`map.yaml` says "the order of `pages:` **is** the reading order, and it is the order of the
decision tree" — an author-facing comment. The reader-facing home page says "The order is
the order the questions reach them" in one clause inside a paragraph about the table, and
then offers "Three ways in" that are all lookups. Nothing tells a reader who wants to read
the book that the nine pages are in a deliberate sequence, so the most likely reading — the
sidebar, top to bottom — looks arbitrary (Optimisation, Averaging, Eigenvalues, Linear
system, Root finding, …) when it is not.

**Fix.** One sentence in "Three ways in": a fourth way in, "**You want to read it.** Start at
Optimisation and take the sidebar in order; each page is one kind, and the kinds are ordered
by the question they answer." Cheap, and it is the only place the book's shape is invisible.

### T3. `maths-applied` states the chapter problem three times, in two wordings

The chapter problem appears at `Chapter 1/index.md:15` ("**The chapter problem.** A wheel
moves 40 mm up and 40 mm down…"), at `Section 1.1/Walkthrough/index.md:24` as
"**This chapter's question.**" with near-identical wording, and in full again at
`Chapter 1/Review/index.md:9` ("## The chapter problem, answered"). A scan for
near-duplicate sentences across all 15 pages finds this as the only one in the book:

```
['Chapter 1/index.md', 'Chapter 1/Review/index.md'] :: how far does its camber change, and
what is the simplest model that gives an ans
```

The repetition is defensible — P2 wants the destination stated at the start and returned to
at the end — and the copy on §1.1 is the one a reader meets first in the main thread. Taste,
not a defect; I would leave it, and note it only because the lint has no rule against it and
a future edit might add a fourth.

---

## What would make the hard concepts easy: three concrete changes

The four blocking items are defects. This section is the part of the brief that asks a
design question, and it is deliberately short: the two books are good at this, and the
openings are specific.

### 1. The class pages need one *worked* wrong answer, with its number in the prose

The figures already do the hard part. Five class pages mount a figure whose Predict line is a
failure rather than a success — `gradient-lab` ("which step is too large — 0.3 or 2.5?"),
`heat-lab` ("at r = 0.40 the kink smooths. What will r = 0.60 do?"), `wave-lab` ("c = 0.7
lets the pulse travel. What does c = 1.1 do?"), `step-limit`, `energy-drift` — and
`step-limit` is the best idea in either book: it counts the steps a finer mesh costs, so the
class's character is one number.

The gap is that the **prose does not quote the number the figure computed**, and two pages
have no such figure at all:

- `saddle-point` has **no figure** (the only class page without one), and its "checkerboard"
  symptom is the single place a reader learns what LBB is about. One still figure of
  equal-order velocity and pressure on a small mesh would show the pattern the word names.
- `elliptic` mounts `cg-lab` and says "needs as many steps as the mesh is wide in every
  direction" — an unmeasured claim about the class's defining difficulty, with the count
  already in the figure's readout.
- `averaging` mounts `monte-carlo-lab` and says the error falls as `1/√N`, without ever
  quoting the figure's own error bar at its own settings.

So the pattern is: **the wrong answer is drawn but not stated.** A reader who moves the
slider sees the failure; a reader who reads the page gets the rule without the number that
makes it memorable. Writing the figure's own number into the sentence beside it is one line
per page and a `claim()` where the figure has one.

### 2. `maths-applied` should name the tolerance question as a repeatable procedure, once

§1.5 is the chapter's intellectual centre and it is 1,800 words inside a section about
bushes. The procedure it derives is three sentences:

> Compare the effect the simpler model leaves out with the tolerance the question asks for.
> Make the comparison against the quantity the question is about. If the effect is smaller,
> the simpler model is the correct one.

A reader meets this inside a table-caption, in the middle of a page about equilibrium, and
the Review restates it as "take the parameter to the edge and check the model becomes the
simpler one it should become" — which is a *different* procedure (the limit test) presented
as though it were the same one. They are two, and the chapter would be easier with both
named and given the number they produced:

| the procedure | what it answers | where it earned its keep |
|---|---|---|
| **The tolerance comparison** | which model do I need? | 0.2 MN/m vs 1.8 MN/m — nine times apart |
| **The limit test** | is this model the generalisation of that one? | 1.91° → 1.95°, monotone over four stiffnesses |

**Fix.** A short boxed panel at the end of §1.5 — not a new page — with the two procedures,
the quantity each is a test of, and the number each produced. The Review then refers to the
panel rather than re-deriving a third phrasing. This is the single highest-value edit in
either book for a reader who wants to take the method away and use it on a different
mechanism.

### 3. The `:::class` callback is good and is under-used in the direction that helps most

`:::class` appears 8 times in the collection — 7 in `maths-applied`, 1 in A-level §9.3 —
and `:::used` derives the reverse list, so the two books are wired together. But the callback
is always placed *after* the reader has met the class:

- `maths-applied` §1.2: `:::class root` after "Two answers from one rule is the signature of
  this kind of problem" (`:81`).
- §1.5: `:::class root` after equilibrium, `:::class optimisation` after the tolerance
  question.

That is right per the book's rule ("put it where the class first becomes true"). What is
missing is the reverse: **`numerical-methods` never sends a reader back with a number.** Its
`worked-case` page quotes `maths-applied`'s numbers, and its class pages' *Systems that live
here* name "the position of a four-bar linkage" and "the equilibrium of a bushed linkage" as
prose. A one-line `:::example` on `root` saying "**Where this is worked:** `maths-applied`
§1.2 solves this class in closed form and prints the pose" would close the loop, and it is
the only place the reference work can show that its classes are real.

`worked-case` is that page, and it is excellent — but it is the twelfth of the fifteen items
in the sidebar, and no class page links it.

---

## What I would not change

- **The `maths-applied` chapter formula.** "A model earns its place by failing" is why §1.3
  is interesting at all, and the agreement panels are the mechanism. B4 is a bug in the
  numbers, not in the design.
- **The nine boxes in `numerical-methods`.** The decision record in its `AGENTS.md` is
  right, and the `kind-shapes` gallery is the right answer to "what does the answer look
  like" — as long as nobody adds arrows to it, which that file already forbids.
- **The figure vocabulary.** 19 figures, every one above its contrast floor, 25 declared
  claims and none untrue. The five that are still drawings
  (`step-limit`, `energy-drift`, `kind-shapes`, `kernel-camber`, `quarter-car`) are drawings
  on purpose, and `step-limit` is the best idea in either book: it counts the steps a finer
  mesh costs, which is the class's whole character in one number.
- **The prose.** 8.7 and 8.55 on Flesch–Kincaid, 0 sentences over the lint ceiling, 0
  shaming words, no near-duplicate sentences except the one noted in T3. There is nothing to
  fix here, which is why nothing above is about wording except B2 and T1.

---

## Method, and what I did not measure

**Run.**

- `uv run python -m pytest tests/test_reference_books.py tests/test_maths_applied_numbers.py
  tests/test_maths_applied_ladder.py -q` → 80 passed.
- `uv run python -m textbook.lint maths-applied numerical-methods` → 34 pages scanned, no
  findings.
- `node tools/dist/cli.js audit site --json /tmp/aud2.json` → 528 measurements; I read every
  one of the 19 figures in the two books for text ≥ 4.5:1 and shape ≥ 3:1 in both schemes:
  all pass, lowest shape 3.33 (light) / 3.41 (dark), lowest text 4.98 (`solver-loop`, light).
- `node tools/dist/cli.js audit site --mobile` → 219 figures at 390px, 0 below 9px, median
  smallest label 9.5px. (This command does not take a book filter, so the number is the
  whole site's.)
- `node tools/dist/cli.js readout site --verify` → collection-wide: 1,269 readouts over 264
  figure renders, 651 claims, 0 render untrue. Filtered to these two books: 7 figures, 20
  renders, 25 claims, 0 untrue.
- `node tools/dist/cli.js budget site "/maths-applied/chapter-1/section-1.1/learn/"` → 896 kB,
  42 requests, largest `front-corner.jpg` at 271 kB.
- Three Playwright scripts of my own (not committed) over all 4,503 built book routes at
  390px: document width against viewport, sticky-heading position and `elementFromPoint`,
  and a fragment-link landing offset. The numbers quoted in B1 and the route counts come
  from those. The heading-`id` count (0 of 4,504) is over every `index.html` under `site/`,
  which includes the collection's own pages.
- `grep`, `node -e` against `mechanism.js` and `quarter-car/trajectory.js` for the numbers in
  B4.

**Not measured, and said so.**

- **No screen reader.** `research/accessibility.md` already records that boundary and I did
  not move it. B1's fragment problem is a visual measurement; a screen reader user is
  affected differently and probably worse.
- **No reader.** Nothing here is evidence about learning. The pedagogical recommendations in
  "What would make the hard concepts easy" lean on `research/pedagogy.md` P4 (retrieval),
  P6 (Predict → Test → Explain) and the accuracy/fluency distinction, plus Chi, Feltovich &
  Glaser (1981, *Cognitive Science* 5, 121–152, doi:10.1207/s15516709cog0502_2) on experts
  categorising by principle — which is what the nine boxes *are* — and Chi et al. (1989,
  *Cognitive Science* 13, 145–182, doi:10.1207/s15516709cog1302_1) on self-explanation, which
  is why every figure's *Explain* line matters. Both DOIs were resolved against Crossref on
  2026-10-28. Neither is a claim that these books teach better than another arrangement; it
  is a claim about which defect is worth fixing first.
- **`maths-applied` §1.7's "outline" status** is deliberate and its page says so in the
  reader's words; I have not treated it as an unfinished section.
- I did not read the `otkd` package or the Rust kernels. Every kernel number in this file is
  quoted from a page or from `mechanism.js`, not from the solver's source.

---

## The queue entries this becomes

If this is turned into work, it is **four new items in `.agents/todo.md`**, not fourteen:
B1 (headings, deep links, and the sticky headings, one engine change and one check), B3+W7
(class pages gain a worked number and the symbols become a list), B2 (define the five words
and add the lint), and B4+W1+W2 (the `maths-applied` prose and asset pass). W3, W4, W5 and W6
are small enough to ride along with the item whose files they touch; T1–T3 are notes for
whoever next edits those pages rather than queue entries.
