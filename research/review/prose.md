# Review — reader-facing prose

A review of the reader-facing prose in the collection: the five books, the
proof book, and the prose in `engine/src/textbook/templates/*.html`. **Nothing was
changed.** This file is the only artifact created.

Commands run (the mission forbade `scripts/check.sh`):

```
uv run python -m textbook.lint                                    # voice lint
uv run python .agents/skills/verify-textbook-change/scripts/textbook-audit.py   # pedagogy audit
uv run python .agents/skills/verify-textbook-change/scripts/textbook-audit.py --strict
# plus targeted reading/grep over books/*/docs/**, books/proofs/docs/**, engine/src/textbook/templates
```

## Counts by severity

| Severity | Findings |
|---|---|
| **Blocking** | **6** |
| **Worth doing** | **16** |
| **Taste** | **5** |

The prose is, on the whole, in the house voice. The two quantitative checks say
so: the linter found only 6 shaming-word hits, 1 long sentence and 38
long source lines (mostly wrapped markdown, not long sentences), and my own
sentence scan of every authored page found exactly **one** sentence of 30+ words.
The defects that matter are structural and factual, not stylistic.

## The sample (auditable)

Pages read in full, by book:

- **gcse-maths**: `Chapter 1/index.md`, `1.1/{Walkthrough,Guided problems,Problems}`,
  `Chapter 1/Review`; `Chapter 5/Section 5.1/Walkthrough`;
  `Chapter 8/Section 8.1/Walkthrough`; `Chapter 9/Section 9.1/Problems`;
  `Chapter 11/index.md`, `11.5/Walkthrough`; `Chapter 12/Section 12.2/Walkthrough`;
  `Chapter 13/Section 13.2/Walkthrough`; `Chapter 17/Section 17.1/Guided problems`;
  `Chapter 20/Review`, `20.6/Problems`, `20.7/{Walkthrough,Guided problems}`;
  `index.md`, `colophon.md`, `Glossary/number.md`, `Glossary/algebra.md`.
- **a-level-maths**: `Chapter 1/index.md`, `1.1/Walkthrough`, `Chapter 1/Review`;
  `Chapter 4/Section 4.5/Walkthrough`; `Chapter 11/index.md`, `Chapter 11/Review`;
  `Chapter 13/Section 13.4/Guided problems`;
  `Chapter 16/Section 16.3/Guided problems`, `16.5` and `16.7/Walkthrough`;
  `Chapter 7/Section 7.7/Walkthrough`; `index.md`, `colophon.md`.
- **gcse-physics**: `Chapter 1/index.md`, `1.1/Walkthrough`, `Chapter 1/Review`;
  `Chapter 5/Section 5.5/Walkthrough`; `index.md`, `colophon.md`.
- **a-level-physics**: `Chapter 1/Section 1.1/Walkthrough`; reviews of Chapters
  1, 2, 3, 4, 6 (reasoned-answer wording); `index.md`, `colophon.md`.
- **proofs**: `docs/index.md`, `angle-in-a-triangle`, `pythagoras`,
  `quadratic-formula`, `chain-rule`; `colophon.md`.
- **engine**: `templates/page.html`, `templates/portal.html`; the reader-facing
  strings in `portal.py` and `hooks/proofs.py`.

Page kinds covered: Walkthrough (Learn), Guided problems (Practise with help),
Problems (Practise), Review, chapter index, book landing page, colophon,
glossary, proof page, and the shell templates.

---

## Blocking

### B1. The proof book's "About this book" is generated for a course it is not

`books/proofs/docs/colophon.md:8`, `:12`, `:23`

> "This is a complete Reference Mathematics book for England." (line 8)
> "Every section has three pages. **Learn** teaches the ideas and the method."
> (line 12)

**Rule / need.** The book's own `book.yaml` says it has "no chapters", "no
problem banks", "no tier axis"; every page under `docs/` is authored and each
one is a proof. The generated colophon describes a Learn / Practise with help /
Practise / Review course with questions and answers. It is false for this book.
The built page confirms it: `site/proofs/colophon/index.html` reads
"complete Reference Mathematics book for England".

**Impact.** A reader who opens *About this book* is told the proof book is a
course with three kinds of page, a chapter problem and a Review — none of which
exists. The "Answers are checked by a computer" section (line 23) is also false
here: the proofs are hand-written prose, not bank items.

**Smallest remediation.** The generator already special-cases a reference work
for the landing card (`portal.py:88-95`). Do the same in
`scaffold.colophon_page`: when `book.qualification == REFERENCE`, emit a
reference-work "What this book is" and drop the "Answers are checked by a
computer" section. Fix the generator, not the generated file.

### B2. "Every answer in this book is checked by a computer algebra system" — an overclaim

`books/gcse-maths/docs/index.md:35`; `engine/src/textbook/templates/portal.html:48-49`;
`collection.yaml:9`

> "Every answer in this book is checked by a computer algebra system when the
> book is built. If a worked step were wrong, the build would fail."

**Rule / need.** `write-textbook-prose` says "Do not overclaim", and the repo's
own `verify-textbook-change` skill states the gate "does not prove … the
mathematics of a worked example outside a bank". The Review pages, the Guided
problems "Full working" blocks and every Learn worked example are hand-written
markdown and are not touched by `textbook.verify`. `books/gcse-physics/docs/index.md`
and `books/a-level-physics/docs/index.md` get this right ("It cannot check the
physics"), and the physics Reviews say the same in-page
(`books/gcse-physics/docs/Chapter 1/Review/index.md:76-78`:
"It is not the kind of claim a computer can check"). The portal footer's blanket
"Every answer in **these books**", and `collection.yaml`'s "Free, interactive
textbooks with computer-checked answers", make the strongest form of the claim
over the whole collection.

**Impact.** The reader is told the checking is wider than it is, which is exactly
the trust the collection exists to earn. It is also false for the proof book,
which has no answers at all.

**Smallest remediation.** Narrow the wording to what is true: "Every answer in a
**Practise** set is checked…". Use the physics books' sentence as the house
sentence, in `gcse-maths/docs/index.md`, the portal footer and
`collection.yaml:9`.

### B3. DfE curriculum codes are printed to the reader on 24 pages

`books/gcse-maths/docs/Chapter 3/Section 3.1/Walkthrough/index.md:22`
(24 files; 6 chapters)

> "This section covers N6."

**Rule / need.** Root `AGENTS.md`, "Internal words must never reach the reader":
"never print DfE codes". The audit's `covers-in-prose` check only looks for
`**Covers:**`, so it misses every one of these. Other exemplars:
`Chapter 12/Section 12.2/Walkthrough/index.md:19` ("This extends A4."),
`Chapter 14/Section 14.1/Walkthrough/index.md:16` ("This page covers A19."),
`Chapter 12/Section 12.3/Walkthrough/index.md:20` ("This covers A11 and A12.").
Chapters 3, 10, 12, 14, 16 and 17 of gcse-maths are affected. Six pages also
carry the invisible source comment `<!-- Curriculum coverage: … -->`
(e.g. `Chapter 12/Section 12.2/Walkthrough/index.md:13`).

**Impact.** Internal reference codes are meaningless to a 14–16 reader and
signals "this was written for an auditor". The audience is mixed-attainment and
includes EAL readers.

**Smallest remediation.** Delete the trailing clause from each `**Objectives:**`
line (the code already lives in front matter `dfe:`), and drop the six
`<!-- Curriculum coverage -->` comments. All 24 are one-line deletions.

### B4. The cosine rule is stated, its proof exists, and nothing links to it

`books/gcse-maths/docs/Chapter 20/Section 20.7/Walkthrough/index.md:18`

> "The **cosine rule** finds a side from two sides and their included angle:
> $a^2=b^2+c^2-2bc\cos A$."

**Rule / need.** Root `AGENTS.md`: "every result that is stated and not proved
must have a page in the shared proof book, linked from the line that states it."
`books/proofs/proofs.yaml:57-63` lists `cosine-rule` with
`qualifications: [GCSE, A-level]`, and `books/proofs/docs/cosine-rule/index.md`
exists. But `grep -rn ':::prove' books` shows the directive is used 19 times and
**never** for `cosine-rule`. The rule is stated here with no justification and no
link.

**Impact.** The reader most likely to wonder "why is that true?" — a GCSE Higher
reader on 20.7 — is the one with no route to the proof, which defeats the whole
point of the proof book.

**Smallest remediation.** Add `:::prove cosine-rule` on its own line directly
under the statement at `20.7:18`. (`arithmetic-series` is a weaker version of the
same gap — see W16.)

### B5. A proof in a-level-maths Chapter 1 reverses the divisor

`books/a-level-maths/docs/Chapter 1/Review/index.md:50`

> "Each prime $p_i$ divides the product, so each leaves remainder $1$ on division
> by $N$."

**Rule / need.** This is not true as written: $p_i$ divided by $N$ leaves
remainder $p_i$, not 1. The intended and correct statement is that **$N$ leaves
remainder 1 when divided by each $p_i$**, which is what makes the next sentence
("No prime in the list divides $N$") follow. The Euclid argument survives; the
sentence describing it does not.

**Impact.** A reader following the reasoning is told something false at the hinge
of the contradiction proof, in the review that is meant to be the chapter's
payoff.

**Smallest remediation.** Rewrite as "Each prime $p_i$ divides the product, so
$N$ leaves remainder $1$ when divided by each $p_i$."

### B6. Fifteen Practise pages have no heading at all

`books/gcse-maths/docs/Chapter 9/Section 9.1/Problems/index.md:12`

> `:::problems chapter-9-practice-9.1`

**Rule / need.** The page has front matter, then blank, then the directive: there
is no `#` heading. The built output confirms it — `site/gcse-maths/higher/chapter-9/section-9.1/practise/index.html`
contains no `<h1>`; the reader lands on a bare numbered list. The affected 15
pages are Chapters 5 (6), 9 (6) and 22 (3) of gcse-maths. Every other book's
Practise page carries the `# n.m Title — Practise` heading.

**Impact.** No visible page title, and no accessible name for the main region for
a screen reader. It also makes the three page kinds indistinguishable at a
glance.

**Smallest remediation.** Add `# <section title> — Practise` after the front
matter, matching the 118 gcse-maths pages that already have it.

---

## Worth doing

### W1. 59 gcse-maths Practise pages lose the framing sentence (and with it the "H" key)

`books/gcse-maths/docs/Chapter 4/Section 4.1/Problems/index.md:12` (59 files)

Chapter 1's page says: "Work through these on your own… Questions marked **H**
are for Higher tier. Both the questions and the answers below come from a set
that is checked by computer every time the book is built." Chapter 4's page goes
straight from the heading to `:::problems`. The engine does render the `**H**`
marker (`engine/src/textbook/verify/render.py:127`), but on these pages nothing tells
the reader what it means. 44 of the 59 have the heading; 15 have neither heading
nor sentence (B6).

**Remediation.** Paste the two-sentence framing paragraph from Chapter 1 onto the
59 pages; fix B6 at the same time.

### W2. 59 gcse-maths "Practise with help" pages skip the middle tier of the fade

`books/gcse-maths/docs/Chapter 20/Section 20.7/Guided problems/index.md:35,40`

The page has `Hint` then `Full working`, and no `Next step`. Chapters 1, 3, 6, 7,
10, 14, 15, 16, 20, 23 and 25 are affected (59 of 133 pages). Every other book
has all three tiers on every page, and the audit's `--strict` fade checks do not
look for a *missing* tier.

**Remediation.** Add a `Next step` block that performs the first concrete move
for each item, between the hint and the full working. This is the P1 contract
("hint → next step → full working") in root `AGENTS.md`.

### W3. "Progress check" does two different jobs in two books

`books/gcse-maths/docs/Chapter 1/Section 1.5/Walkthrough/index.md:81-84`
versus `books/gcse-physics/docs/Chapter 1/Section 1.1/Walkthrough/index.md:261`

gcse-maths gives the answer:

> "The stall's profit was $£39.20$. Round it to the nearest pound for a poster:
> $£39.20 \approx £39$."

gcse-physics asks:

> "Return to the chapter problem. The stream brings 30 kg of water to the wheel
> each second… 1. … 2. … 3. …"

**Impact.** A gcse-maths reader who learned that a Progress check is something to
attempt meets a block that hands over the chapter problem's final value in
Section 1.5, three sections before the Review "solves" it again. It also removes
the retrieval opportunity P2 exists to create.

**Remediation.** Make the gcse-maths Progress checks questions, as gcse-physics
and both a-level books already do. Keep the worked value for the Review.

### W4. 62 Walkthroughs have no Progress check; a-level-maths Chapter 11 has none in the chapter

`books/a-level-maths/docs/Chapter 11/index.md` (no Progress check in any of its
eight sections)

40 a-level-maths and 22 gcse-maths Walkthroughs lack the heading. P2 asks for
2–3 returns; Chapter 11's anchor is returned only at the Review. The pair
`The chapter problem: is the bus company's claim believable?` (Chapter 11 opener)
and its first resolution in the Review is a long gap.

**Remediation.** Add one return per chapter that currently has none; Chapter 11
is the clearest case because it has zero.

### W5. a-level-maths Chapter 11's second first-contact prediction is never returned to

`books/a-level-maths/docs/Chapter 11/index.md:39-40`

> "Then count how many of the 30 journeys took longer than 30 minutes. Predict
> that number before you count. Keep both predictions for the Review."

The Review resolves the mean prediction (24.97 min) and the outlier, but never
mentions the count of journeys over 30 minutes (the data give 5). The reader is
told to keep a prediction that is then abandoned.

**Remediation.** Add one line to `Chapter 11/Review` Step 4 or Step 6 giving the
count (5) and asking the reader to compare it with their prediction.

### W6. gcse-maths Chapter 4 Practise sets have 5 items, not 8–15

`books/gcse-maths/problems/chapter-4-practice-4.1.yaml` (and 4.2–4.5; 5 items
each)

Root `AGENTS.md` page contracts: "Practise: 8–15 items". All five Chapter 4
banks carry 5. Every other practice bank in the collection is in range.

**Remediation.** Add 3–5 more verified items to each of the five banks. (Note:
Chapter 4's practice is also where W1's missing framing and W2's missing
`Next step` both bite, so it is the weakest chapter in the sample.)

### W7. gcse-maths chapter-opener drift

- 21 of 25 chapter openers have no "Where it is used" section. Every one of the
  35 openers in the three other courses has it. Example:
  `books/gcse-maths/docs/Chapter 11/index.md` (no such heading) versus
  `books/a-level-maths/docs/Chapter 11/index.md` ("## Where it is used").
- 12 of 25 use a bare `## The chapter problem` heading instead of
  `## The chapter problem: <title>`. Example:
  `books/gcse-maths/docs/Chapter 11/index.md:9`.
- 11 of 25 Reviews have no "What you can now do" closing list
  (Chapters 2, 3, 5, 8, 15, 16, 18, 19, 20, 23, 24).
- 18 Walkthroughs (Chapters 5, 7, 11) use an `## Objectives` heading where the
  other 103 use an inline `**Objectives:**` line; 18 (Chapters 4, 5, 8) use
  `## Learn the method` and `## Key terms`, which appear nowhere else. Example:
  `books/gcse-maths/docs/Chapter 5/Section 5.1/Walkthrough/index.md:11-16`.

**Impact.** The same page kind does a different thing depending on the chapter,
so a reader cannot carry a habit from one chapter to the next. The audit's
opener-heading check only inspects the chapter index and does not see this.

**Remediation.** Bring the drifted gcse-maths openers, Reviews and Walkthroughs
onto the house pattern. This is a mechanical, chapter-by-chapter clean-up.

### W8. gcse-maths Chapter 5 objectives switch to first person

`books/gcse-maths/docs/Chapter 5/Section 5.1/Walkthrough/index.md:66-68`

> "- I can simplify ratios by multiplying or dividing each part by the same
> factor."

The heading is "You should now be able to". Every other book's bullets are
implied-second-person ("state the value of any digit…"). Root voice rules:
address the reader as `you`.

**Remediation.** Drop the "I can" prefix so the bullets read as the rest of the
collection.

### W9. gcse-maths 11.5 has a Progress check that answers the chapter problem, and a stray ".;"

`books/gcse-maths/docs/Chapter 11/Section 11.5/Walkthrough/index.md:38` and `:45`

> "The walker covers 2 km in 0.5 hours, so the speed is $2/0.5=4$ km/h. In one
> hour, the walker is 4 km from home."

The chapter problem (Chapter 11 opener) asks the reader to predict the distance
after one hour; this block states it, with no task. Line 45 ends a bullet with
"— including speed on a distance-time graph.;" (semicolon then full stop).

**Remediation.** Turn the Progress check into a question, and delete the stray
semicolon.

### W10. An idiom in a-level-maths Chapter 1

`books/a-level-maths/docs/Chapter 1/index.md:56`

> "It could be a rule of thumb about money, travel, games or sport."

Root voice rules and `write-textbook-prose`: "No slang, idioms or cultural
references. They exclude EAL readers." "Rule of thumb" is an idiom.

**Remediation.** "It could be a rough rule you use about money, travel, games or
sport."

### W11. The proof label reads two different ways

`books/proofs/docs/index.md:41` versus `engine/src/textbook/proofs.py:39`

The proof book says a proof out of course "carries a **Beyond the course**
note"; the badge the reader actually sees is `BEYOND_LABEL = "Beyond your
course"`. Root `AGENTS.md` also says "Beyond your course".

**Remediation.** Change the proof-book sentence to "Beyond your course".

### W12. The Review mixed-practice heading differs across books

`books/gcse-maths/docs/Chapter 1/Review/index.md:39`
versus `books/a-level-maths/docs/Chapter 1/Review/index.md:58`

gcse-maths: "Mixed practice: choose a method and explain why". a-level-maths,
gcse-physics and a-level-physics: "Mixed practice — choose the method first".
Same ritual, two names.

**Remediation.** Pick one and apply it to gcse-maths (the odd book out).

### W13. Chapter 17 Guided problems rename the fade labels

`books/gcse-maths/docs/Chapter 17/Section 17.1/Guided problems/index.md`
(`<summary>` labels)

The five Chapter 17 pages use "Check the warm-up" and "Full answer" where all
other pages use "Answers" and "Full working". The friction is small but the
reader meets an inconsistent vocabulary inside one book.

**Remediation.** Rename to the house labels.

### W14. 89 of 315 common-error callouts state the trap without a re-check

`books/gcse-maths/docs/Chapter 7/Section 7.1/Walkthrough/index.md:59`

> "A common error is to multiply a square measure by $100$…"

Root `AGENTS.md`: "a common-error callout (state it, show the contrast,
re-check)". `Watch out` callouts in this collection almost always state and
contrast; an explicit re-check sentence is present in 226 of 315. This is an
aggregate, low-impact gap, not a defect on any single page.

**Remediation.** When a callout is next edited, add the "Re-check by asking…"
sentence (as Chapter 1 Section 1.1 and gcse-physics Chapter 1 Section 1.1
already do). Not worth a bulk pass.

### W15. Proof-page structure is not uniform

`books/proofs/docs/angles-in-a-triangle/index.md` (no common-error note; ends
with "Where this goes next") versus `books/proofs/docs/pythagoras/index.md`
(ends with "A common error").

9 of 21 proof pages have no "A common error" heading, 3 have no "Predict first"
section, and the closing section varies ("Where this goes next", "What the proof
tells you for free", "A common error"). This is a reference work rather than a
course, so some variation is reasonable — the inconsistency is worth a decision
rather than an immediate fix.

**Remediation.** Decide whether "A common error" is part of every proof page and
apply it uniformly, or drop it from all of them.

### W16. The sum of an arithmetic series is stated without a proof link

`books/a-level-maths/docs/Chapter 4/Section 4.5/Walkthrough/index.md:59-62`

The formula $S_n=\frac{n}{2}(2a+(n-1)d)$ is introduced, then justified in outline
by pairing ("There is a neat reason…"). `books/proofs/proofs.yaml:159-164` records
`arithmetic-series` with `qualifications: [A-level]` and the page exists, but no
`:::prove arithmetic-series` appears anywhere. Because the page does give an
argument, this is weaker than B4 — a reader can see the reason here — but the
promise ("linked from the line that states it") is still not kept.

**Remediation.** Add `:::prove arithmetic-series`, or confirm the in-page pairing
argument is the proof the collection intends and remove the proof page from the
registry.

---

## Taste

### T1. "a lot of" in gcse-physics

`books/gcse-physics/docs/Chapter 1/Section 1.1/Walkthrough/index.md:160`
("takes a lot of energy"), `Chapter 5/Section 5.5/Walkthrough/index.md:174`
("absorbs a lot of infrared"). Plain English, not slang, but the house voice is
more precise. "needs a large amount of energy" reads better for EAL readers.
Matter of taste.

### T2. `Watch out.` versus `A common error is to…`

The callout label is "Watch out" in the courses, but many bodies open "A common
error is to…", and the proof book uses "A common error" as a heading. Not wrong;
the label vocabulary is just less settled than the page names are. Taste.

### T3. The a-level-maths Chapter 1 opener hint goes off-task

`books/a-level-maths/docs/Chapter 1/index.md:29-31`

The first-contact task asks the reader to doubt Claim B; the "If you are not sure
where to start" hint then says "Now test Claim A for n = 3 and n = 4, and write
down the first six prime numbers" — Claim A is unrelated to the question just
asked, and Claim C is what the primes hint at. The hint works, but it jumps.

### T4. gcse-maths Chapter 20 Review folds a reflection question into the answers block

`books/gcse-maths/docs/Chapter 20/Review/index.md`
(a `**Reflection:**` line inside the `<details>` answers, alongside the separate
"## Your relevance reflection" heading). Every other review keeps the reflection
outside the answers. Cosmetic.

### T5. Chapter 17's five-item structure

The Chapter 17 Guided problems pages use a different internal shape ("Try these
with help", "Question 1/2/3"). It is readable and consistent within the chapter;
it is only drift when set against the other 128 pages (see W13).

---

## Genuinely clean

Saying so, because the brief asks for it rather than for volume:

- **Sentence length.** Across all five books, one sentence in the whole corpus
  reaches 30 words (`books/gcse-maths/docs/Chapter 19/Section 19.6/Guided problems/index.md:42`).
  The audit's reported maxima (50, 58 words) are an artefact of stripping
  `$…$` to a placeholder and not re-splitting; they are not real sentences. Mean
  sentence length is 8.8–12.6 across the books, Flesch–Kincaid grade 4.9–6.1 —
  inside the 12–14 reading-age target.
- **Passive voice.** I read for it page by page. "X is called Y" definitions are
  the only common passive, and they are the clearest construction for a
  definition. Nothing hides the actor in a way that costs comprehension.
- **Matey register.** No second-person jokes, no "let's", no contractions. The
  only informal item found was the idiom in W10.
- **The proofs book's proof pages.** `pythagoras`, `quadratic-formula` and
  `chain-rule` are models of the house voice: short active sentences, every term
  defined on first use, and an honest "here is the gap in the usual argument"
  (chain-rule). Reading age is the lowest of the five books (12.6 mean, grade
  4.9) — excellent, not a defect.
- **gcse-physics and a-level-physics Reviews.** The "This final judgement is a
  reasoned answer. It is not the kind of claim a computer can check" sentence
  (e.g. `books/gcse-physics/docs/Chapter 1/Review/index.md:74`) is exactly the
  honesty the collection's own rules ask for, and it is used consistently.
- **`engine/src/textbook/templates/page.html`.** The reader-facing strings ("Skip to
  content", "Search this book", "All books", "Search is unavailable.") are
  plain, short and correct. The only template problem is the portal footer
  (B2).
- **The linter findings.** 6 `just` hits, 1 long sentence and 38 long source
  lines. The `just` hits are almost all the spatial sense ("just before it
  lands", "just below zero"), which is not the shaming sense the rule targets;
  the linter cannot tell the two apart. The 38 long lines are wrapped source
  lines, not long sentences. There is no backlog of linter-visible voice work.

## Note on the audit script

`textbook-audit.py` reported 5 `duplicate-paragraph` findings. I checked all
five by hand and **all five are false positives**: the script replaces `$…$`
with `MATH` before comparing, so `Chapter 13/Section 13.4/Guided problems`
("The random variable $X \sim B(20,0.5)$…" and "…$B(100,0.3)$…"), `16.3`
(upward and downward lift), `16.8`, and the calculus walkthroughs 7.7 and 8.5
become identical once the numbers are removed. No duplicate paragraph was found
in the sample. The script is a useful gate but its duplicate check needs
judgement on every hit.
