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
are checked against each other on every pass. Ten items are open, and they all came
out of one reading of the two reference works.

The *interactive-aid backlog* — which figures and interactions a book still wants —
is `ideas.md`. It is a plan rather than a defect list, and it is written for the
author choosing what to build next.

**Open, and the list is the index:**

- [ ] 88. Chapter 1 states numbers its own model does not produce
- [ ] 89. Nothing recomputes Chapter 1's prose numbers, and that is how 88 happened
- [ ] 90. `worked-case`'s stiffness ladder contradicts §1.5's tested one
- [ ] 91. §1.6's *Watch out* asserts the limit test the section says was removed
- [ ] 92. §1.6 is "drafted" in four places and "finished" in two
- [ ] 93. The map's pager says "Next chapter", in a book with no chapters
- [ ] 94. The About page is an exam-shaped disclaimer, in books that have no exam
- [ ] 95. Five of the map's nine classes have no worked example anywhere
- [ ] 96. *Methods, A to Z* is missing 13 methods it says holds them all
- [ ] 97. The style lint does not enforce this book's own ban list


**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

---

---

---

## 88. Chapter 1 states numbers its own model does not produce

**What is wrong.** Five numbers in `books/maths-applied/` no longer come from `docs/assets/data/mechanism.js` or from the vendored `otkd` payload, and two of them contradict the figure on the same page. Every one was measured on 2026-10-22 against the geometry the book ships.

| Page | It states | The model gives |
|---|---|---|
| §1.2 agreement panel | the 3D kernel agrees "within **0.088°**" | **0.033°** over ±40 mm. The page's own figure prints *"differ by at most 0.033°, at 40 mm of travel"* — `node tools/dist/cli.js readout site --only kernel-camber` — and a direct run of `kernel.js` over 21 samples gives 0.0327 |
| §1.2 "What the model says" | "the track narrows by **9.7 mm** at the bump end" | **4.59 mm** at the wheel on one side (+40 mm), which is 9.18 mm of track: `pose(thetaFor(40)).W[0] - pose(0).W[0]` |
| §1.4 body | σ = (**1.446, 0.953**, 0) "for the pose at the bump end of the travel" | design pose (1.415, 0.998, 0); bump end (1.430, 0.978, 0). No pose in this geometry gives 1.446/0.953 |
| §1.4 "worth a number" + depth page `singular-values` | front-view arm **0.30829 m**, the wishbone's legs "project to **0.30717** and **0.30948** m", so "the view's single arm sits between them, within about a millimetre" | front view **0.30336 m** (`FRONT.RB`); the two legs are **0.31875** and **0.32016** m, so the projection is **shorter than both** — by 15 mm and 17 mm — and is not between them |
| §1.5 and the Review | "the rigid model gives a camber change of **1.91°**, from −1.86° at 40 mm of droop to +0.05° at 40 mm of bump" | the rigid front view gives **1.950°**, from **−1.869°** to **+0.082°**, which is what §1.2's table says. 1.91°/−1.86°/+0.05° is the exported **compliant** model at 100 MN/m — a different model, called by the rigid model's name |

The pattern is one cause: `mechanism.js` adopted the package's four chassis points (its own comment says so), the numbers above were typed against the geometry before that, and nothing recomputes prose. §1.2's panel and the figure on the same page disagreeing is the tell.

**The fix.** Recompute each from `mechanism.js` or the vendored export and write the number, naming the model it came from. Two need a decision rather than a substitution: §1.4's σ set must be one pose (the design one, which the panel already prints, or the bump end, which the body claims) and the panel and the depth page must carry whichever is chosen; and §1.5/Review must say *either* the rigid change (1.95°) *or* that they are quoting the export at 100 MN/m, because the section's argument turns on the difference.

**Done means**

- [ ] every row of the table above reads the model's number
- [ ] `tools readout site --only kernel-camber` and §1.2's panel state the same figure
- [ ] §1.2, §1.5 and the Review agree on the rigid model's change and its two endpoints
- [ ] §1.4 and `singular-values` carry the same σ set, and the σ₁/σ₂ row follows it
- [ ] §1.4's arm-length paragraph keeps its point (a projection is not a rigid copy) with correct numbers

## 89. Nothing recomputes Chapter 1's prose numbers, and that is how 88 happened

**What is wrong.** `tests/test_maths_applied_ladder.py` pins §1.5's four stiffness rows, the crossing at 1.8 MN/m, and the page's rounding. Nothing else in the chapter is checked: not the §1.2 travel table, not the camber change, not the kernel agreement, not the singular values, not §1.6's trajectory numbers. The book's promise is stronger than its tests — `sources.yaml` says "every number in a figure is computed by the model the page describes", and the panels are the chapter's evidence, so a number in prose that has drifted is the one defect the method cannot catch.

**The fix.** A `tests/test_maths_applied_numbers.py` built the way the ladder test is: read the number out of the page, read the model's answer out of `data/mechanism.js` or the vendored payload, compare at the precision the page prints. `mechanism.js` is DOM-free by design and runs under `node`, which CI has; `sources.yaml` already treats the file as the single source for the geometry.

**Done means**

- [ ] the test fails if any number in item 88's table is put back
- [ ] it covers §1.2's five-row table, the full-travel camber change, the kernel-vs-front-view worst difference, §1.4's σ set and arm lengths, and §1.6's `212.8 mm / 0.625 s / 6.3 × 10⁻⁸`
- [ ] it needs no browser: node and the vendored files are enough
- [ ] `pytest tests/ -q` passes

## 90. `worked-case`'s stiffness ladder contradicts §1.5's tested one

**What is wrong.** `books/numerical-methods/docs/worked-case/index.md` quotes a bush ladder and attributes it to `Maths Applied` §1.5 ("§1.5 prints the table"). Its 0.2 MN/m row is `−2.053° / 1.053° / 1.916°`; §1.5's tested row is `−1.91° / 0.91° / 1.96°`, which is what the vendored `double-wishbone-ubj` payload says (`tests/test_maths_applied_ladder.py` computes `rest −1.9086, difference −0.9086, change 1.9558`). It also uses 0.2/2/20 MN/m where the export carries 0.2/1/10/100, and concludes "a stiffness chosen for a tenth of a degree is **2 MN/m**" where the export and §1.5 both give **1.8 MN/m**. The 2 MN/m figure does match this book's front view, so the table mixes two models — the one thing both books forbid.

**The fix.** Replace the table with the export's own ladder at the stiffnesses the export has, and let §1.5's test's arithmetic decide the crossing. If the page wants 2 and 20 MN/m, the export needs those axis values first; interpolating two rows is not a number the bundle carries.

**Done means**

- [ ] every cell of `worked-case`'s table equals §1.5's for the same stiffness
- [ ] the stiffness named for a tenth of a degree is 1.8 MN/m, or the page says which model gives 2
- [ ] a test compares the two tables, so the pair cannot drift again

## 91. §1.6's *Watch out* asserts the limit test the section says was removed

**What is wrong.** The body says: "A third test was written and taken out: *as the masses go to zero the model must become the algebraic one*. A free quarter car cannot run it … and stating it would need a driven model." Twenty lines later, **Watch out** says "The limit test exists because 'usually' is not evidence. Take the mass to zero and the model must *become* the algebraic one, exactly, at any stiffness", and **You should now be able to** asks the reader to "state the limit in which the dynamic model must reproduce §1.2's answers". One section, two answers to whether the test exists, and a reader is asked to state a limit the page has just said it cannot run.

**The fix.** Point *Watch out* at the comparison the section did make — the dynamic camber equals the static camber at the same travel, to 0.006° — and say plainly that the mass-to-zero test is the one that would settle it and is not available to a free quarter car. Rewrite the closing bullet to match.

**Done means**

- [ ] the body, *Watch out* and *You should now be able to* agree on which tests exist
- [ ] the reader is asked only for what the page has shown
- [ ] `python -m textbook.lint maths-applied` reports nothing

## 92. §1.6 is "drafted" in four places and "finished" in two

**What is wrong.** §1.6 now has a model, a figure, a second figure with re-runs, vendored data with digests, and numbers a test can check (`data/quarter-car/`). It is still described as unfinished by `curriculum.yaml` ("This section is drafted rather than finished"), `docs/index.md` ("Then, drafted: mass and dampers"), the chapter index ("§1.6 and §1.7 are … drafted, they say so" and the section table's "drafted"), and `books/numerical-methods/docs/worked-case/index.md` ("§1.6 is drafted and not finished … it prints no numbers, because the model that would produce them is not written" — it prints a dozen). Against that, `books/maths-applied/AGENTS.md` lists the section as "(§1.6, finished)". §1.7 is the only page that carries an *Outline* banner and the only one that is an outline.

**The fix.** Decide once. If the section is finished, drop "drafted" from the five statements and leave §1.7 as the outline; the page already says what it does not do. If it is not finished, say in the page what is missing — the mass-to-zero test of item 91 and the driven model that would state it — because "drafted" on a page with three figures and verified data tells a reader nothing they can use.

**Done means**

- [ ] one status for §1.6, and the same word in `curriculum.yaml`, both index pages, the Review and `worked-case`
- [ ] `worked-case` no longer says the section prints no numbers
- [ ] §1.7 is the only page whose front matter or first block calls it an outline

## 93. The map's pager says "Next chapter", in a book with no chapters

**What is wrong.** `engine/src/textbook/pipeline.py::_pager_eyebrow` returns "Next chapter"/"Previous chapter" for any neighbour at `depth 2`, which is every page of a reference work (`optimisation/index.md` → `averaging/index.md`). Every page of `numerical-methods` therefore ends with "Previous chapter · Linear system / Next chapter · Saddle point", in a book whose first line of `AGENTS.md` is "It has no curriculum, no chapters, no tiers and no exam board" and whose home page says the classes "are not chapters to work through".

**The fix.** The eyebrow should read the book's kind, which the engine already knows: a reference work's neighbours are pages, so "Next page" / "Previous page" (or "Next box", if the map's own word is wanted). The proofs book has the same fault and the same fix.

**Done means**

- [ ] no page of `numerical-methods` or `proofs` prints "chapter" in its pager
- [ ] course books are unchanged: "Next section" and "Chapter review" still appear
- [ ] `tests/test_pager.py` covers a reference book's eyebrows

## 94. The About page is an exam-shaped disclaimer, in books that have no exam

**What is wrong.** `legal.disclaimer_lines()` and `legal.disclaimer_html()` are one fixed text for all eleven books. On `numerical-methods` and `maths-applied` that text says the book "builds on what your school or college provides", is "not a replacement for your teacher … or your exam board's current specification", "If this book disagrees with your specification or your teacher, follow them", and "We check the answers with a computer". Two of those books declare `oracles: []` and have no answers at all, and their own rules forbid assuming a reader has a teacher, an exam board or a level: `maths-applied/AGENTS.md` says the reader "may be anyone: a student … an engineer reading for pleasure, someone who fixes cars". The About page is the first page a general reader opens, and it tells them this is for someone else.

**The fix.** One branch on the book, not eleven texts: a reference work's note says it is not a course, has no answers to check, and its claims rest on `sources.yaml`; a book with no `oracles` cannot say the answers were computer-checked. `DISCLAIMER_SUMMARY` ("Using this book alongside your course") has the same fault.

**Done means**

- [ ] `numerical-methods` and `maths-applied` say nothing about exam boards, teachers or specifications
- [ ] no book without a bank claims its answers were checked by a computer
- [ ] a course book's About page is byte-identical to today's, so the change is provably local
- [ ] `tests/test_legal.py` covers both kinds

## 95. Five of the map's nine classes have no worked example anywhere

**What is wrong.** `:::used` reports "No page in this collection names this class yet" on **optimisation, averaging, eigenvalue, elliptic and hyperbolic** — five of the nine boxes — so half the map's pages end in a dead end. The pair already knows better: `worked-case` calls "how stiff should the bush be" an optimisation, and §1.5 names only `:::class root`; it says "how the wheel hops and how the body heaves are eigenvalues of the linearised system", and §1.6 carries `:::class parabolic` and `:::class saddle-point` and not eigenvalues. The callbacks are cheap and the map's own page already asserts them.

**The fix.** Two lines: `:::class optimisation` in §1.5 where the tolerance is compared with the effect, and `:::class eigenvalue` in §1.6 where the natural frequencies are named. That leaves averaging, elliptic and hyperbolic, which need a chapter rather than a directive — the real answer is maths-applied chapters 2+, and the steering, differential and progressive-spring proposals in `books/maths-applied/AGENTS.md` are the natural home for at least one of them.

**Done means**

- [ ] §1.5 links `optimisation` and §1.6 links `eigenvalue`, both where the class becomes true
- [ ] the map's own `:::used` list for each agrees with what `worked-case` says
- [ ] what remains of the dead end is written down, with the chapter that would fill it

## 96. *Methods, A to Z* is missing 13 methods it says holds them all

**What is wrong.** Every class page carries the sentence "Every method named here is in **Methods, A to Z**". Thirteen methods named in those tables appear nowhere in `techniques/index.md`: fixed-point iteration, trust region, stratified and Latin hypercube sampling, subspace iteration, contour integral (FEAST), augmented Lagrangian, constraint elimination, boundary element, spectral methods, exponential integrators, Lax–Wendroff, spectral element, and Jacobi/Gauss–Seidel/SOR. `grep -niE 'fixed-point|trust region|stratified|latin|subspace iteration|feast|augmented lagrangian|boundary element|spectral methods|exponential integrator|lax.wendroff|spectral element|gauss.seidel|SOR\b' techniques/index.md` prints nothing. The reverse direction is also loose: the class pages' *What goes wrong* tables and `symptoms/index.md` are two hand-kept copies of one list with different wording, so "the smallest eigenvalue is wrong" and "the smallest eigenvalue comes out wrong" are both in the book.

**The fix.** Add the thirteen to the A–Z with the same three columns, or drop the claim from the pages that make it. Then make the pair checkable: one test that every method named on a class page appears in the A–Z, and one that every symptom on a class page appears on the symptoms page with the same cause and fix — the same shape as the ladder test and `:::used`.

**Done means**

- [ ] no class page names a method the A–Z lacks
- [ ] each symptom row exists once, in one wording, on both pages that need it
- [ ] a test fails if a class page gains a method or a symptom and the index does not
- [ ] `pytest tests/test_reference_books.py -q` passes

## 97. The style lint does not enforce this book's own ban list

**What is wrong.** `books/maths-applied/AGENTS.md` bans **naive, toy, just, simply, properly, obviously, real and full** "when describing a model", and calls the last two "the seductive ones". `engine/src/textbook/lint.py::STYLE_WORDS` enforces obviously, clearly, simply, easy, easily, trivial and just — so four of the eight are notes rather than rules. §1.4 said "The toy is not a toy in this respect" and §1.6 "would be needed to state it properly"; both are rewritten now, which removes the evidence and not the gap. A blanket rule would be wrong, because `real numbers`, `a toy car` and `full travel` are ordinary English and appear across the collection.

**The fix.** Decide whether the list is a rule or a note, because it is written as a rule. If a rule: add `naive` outright (no legitimate use in the collection), and add `toy`, `properly`, `real` and `full` as `Word`s whose allowlist carries the ordinary senses, the way `just` already does with its follower table. If a note, say so in `AGENTS.md` and delete "Banned outright".

**Done means**

- [ ] the words `maths-applied/AGENTS.md` bans are either enforced or no longer called banned
- [ ] no page in the collection is reported for an ordinary English use
- [ ] `tests/test_lint.py` has a case for each new word and each exemption
