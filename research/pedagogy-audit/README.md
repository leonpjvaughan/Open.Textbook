# Pedagogy audit — GCSE Mathematics

Two measurement passes over the whole book against the chapter formula in
`AGENTS.md`. Run 2026-10-11, before any fix, so the findings describe the book as
it stood at commit `3bc6594`.

| File | Covers |
|---|---|
| `chapters-01-13.md` | Chapters 1–13. Chapters and Reviews read in full; the rest pattern-matched and labelled as such. |
| `chapters-14-25.md` | Chapters 14–25. Same method, same labels. |

Each report states which questions were answered by reading and which by pattern
matching only. Nothing here is a guess dressed as a finding.

## What this is not

This is not a pass/fail. `textbook.lint` already enforces the **structure** —
every chapter has a chapter problem and an outcomes block, every Walkthrough has a
`Watch out` callout and a checklist, every Guided problems page has a warm-up,
every Problems page has both markers. Those are green. What these reports cover is
the part a linter cannot see: whether the teaching actually does what the formula
says it does.

## Headline

The book is structurally complete and the anchors work. Every chapter states a
problem and every Review resolves it. The weaknesses are in the *middle* of the
fade and in the retrieval, exactly where a linter has nothing to grip:

- **Retrieval starters are copy-pasted across a chapter.** Nine chapters reuse one
  warm-up on most or all of their sections. Now a lint rule
  (`structure:guided-warmup-repeated`); the fixes are content work.
- **Some progress checks give the answer rather than asking.** Concentrated in
  Chapters 17, 18, 22 and 23.
- **Two chapters lose the fade entirely.** Chapter 24's `Next step` is
  byte-identical to its `Full working`; Chapter 19's supported items are verbatim
  copies of its independent ones. Chapter 5's Guided pages carry a single question
  each and promise "a later question" that does not exist.
- **Chapter 7's chapter problem is not solvable as set** — the opener gives no
  data and the Review supplies it. That is a book bug, not a style point.
- **Interleaving lives only on Review pages.** Problem banks are blocked by topic
  and only 2 of 63 ask "which method applies, and why?", so P5 is doing less work
  than the formula asks for.
- **Five of twelve figures render above their own Predict prompt.**

The chapters most needing a rewrite, in order: **19, 23, 24, 5, 15**.

## What the audit already changed

Findings it made mechanical are now gates, so the floor rose and the next pass
starts higher:

| Finding | Now |
|---|---|
| `**DfE coverage:** G3` printed to readers in five Chapter 16 Walkthroughs | Rule + gate; the refs already live in front matter as `dfe: [G3]` |
| Four pages said "Guided problems" where the navigator says "Practise with help" | Rule + gate — `tests/test_content_hygiene.py` |
| Nine chapters repeat one warm-up across sections | `structure:guided-warmup-repeated` (advisory) |

## What is left

The reports are the specification; the work is content. In the order the formula
values it:

1. **Done.** Chapter 7's chapter problem is now solvable as set.
2. **Done.** Rewrite the fade in Chapters 19, 23 and 24. Chapter 19's six
   Guided pages and Chapter 24's broken four are rebuilt; Chapter 23's defect
   was its checks, not its fade, and is item 5.
3. **Done.** Chapter 5's Guided pages now carry a real fading set.
4. **Done.** All nine repeated warm-ups are replaced — and Chapter 24's, which
   that pass missed, is fixed in the del-22 pass below.
5. **Done.** The answer-printing progress checks are questions (17, 18, 22, 23).
6. **Partly done.** Del-22 adds ten method-choice items to later-section banks.
   The rest of the range remains blocked by topic.
7. **Done.** The five mis-ordered figures now sit below their Predict prompt.

Each of these should be done with the skills in `.agents/skills/` —
`author-textbook-chapter` for the rewrite, `write-textbook-prose` for the voice,
`build-practice-set` for the banks, `build-guided-figure` for the figures — and
gated with `verify-textbook-change` before it is called done.

## Fix pass — 2026-10-11 (after the audit)

A separate pass fixed the four highest-certainty defects. It changed only
`books/gcse-maths/docs/**`; no bank changed, so no answer moved.

**1. Chapter 7's chapter problem.** The opener stated a question with no data and
the Review supplied the numbers. The opener now carries the three measurements
(scale $1:25\,000$, path $3.2$ cm, walker $10$ minutes, mass $0.0042$ kg to 2 s.f.)
and names the three tasks, so the problem is answerable from the opener alone.
The Review's "Suppose the map uses scale…" is now "The map uses scale…", and its
figures agree.

- `Chapter 7/index.md:9` — before: "A survey team measures a path on a map, … How
  can you convert the measurements…" with no numbers; after: the three bullets
  and the three tasks.
- `Chapter 7/Review/index.md:11` — "Suppose the map uses scale" → "The map uses
  scale".

**2. Five figures above their Predict prompt.** Each now reads
Predict → figure → Test → Explain, matching 21.2: `15.1` (Walkthrough:38–44),
`17.3` (48–54), `22.1` (45–52), `24.2` (45–51), `25.1` (46–53). While there,
**5.3**'s figure gained the Test beat the audit found missing
(`Chapter 5/Section 5.3/Walkthrough/index.md:56`).

**3. Chapter 5's Guided pages.** Each of 5.1–5.6 now has four questions, every one
fading `Hint` → `Next step` → `Full working`, the last drawn from earlier
material (Chapter 4 fractions, Chapter 1 negatives, Chapter 3 powers). The false
line "At least one later question asks you to connect this method with material
from an earlier section" is gone from all six pages.

**4. Repeated warm-ups.** All nine chapters now give each section a closed-book
retrieval starter from what that section depends on, with a corrective route
naming the section to revisit. The lint's `structure:guided-warmup-repeated` count
goes from 9 to 0. Chapter 20 (8 sections) and Chapter 5 (6 sections) went first,
end to end, then 8, 9, 12, 14, 15, 17 and 18.

**Verification.** `textbook.lint` exits 0 with no `voice:internal` finding and no
`structure:guided-warmup-repeated`. `textbook.verify` passes every bank.
`pytest tests/ -q` is 750 passed. Both profiles of `gcse-maths` build with no
broken link and `grep -rl math-error site` is empty.

**Left, and why.** The Chapter 19 and 24 fades and the Chapter 23 statements are
unfinished by choice (item 2). The answer-printing progress checks (item 5) and
bank interleaving (item 6) are untouched. Two lesser observations stand: 9.6
(quadratic inequalities) has a hard prerequisite — factorising quadratics —
taught later, in Chapter 12, so its warm-up retrieves the within-chapter
number-line work instead; and 17.1, 17.2 and 18.6 retrieve general KS3 shape
knowledge rather than an earlier chapter, because the book has no earlier
section for those prerequisites.

## Retrieval and fade pass — del-22 (2026-10-11)

The pass the README ranked second, fifth and sixth. Scope:
`books/gcse-maths/docs/**` and `books/gcse-maths/problems/*.yaml`; no engine,
asset or theme file was changed.

**1. The Chapter 19 fade collapse (item 2).** In all six sections the three
"supported" problems were the first three bank items verbatim, so the reader
worked the same three questions twice and the support withdrew nothing. Every
Guided page now carries three problems that appear only there, each with a
`Hint` → `Next step` → `Full working` whose blocks each add something. Example,
`Chapter 19/Section 19.1/Guided problems/index.md`:

- before (`:30`): "Work out the perimeter of a rectangle with length 8 cm and
  width 3 cm." — identical to `chapter-19-practice-19.1.yaml` problem 1;
- after (`:41`): "A rectangular flower bed is 11 m long and 6 m wide. Work out
  its perimeter."

The Chapter 19 anchor thread is tightened at the same time. 19.1 had no
`Progress check` at all and 19.4–19.6 were generic, so 19.1 gains one
(`19.1/Walkthrough/index.md:58`) and 19.2–19.6's checks become `## Progress
check` headings tied to the pond (e.g. `19.4:52`, `19.6:60`).

**2. The Chapter 24 fade (item 2).** In 24.2–24.5 every `Next step` was
byte-identical to its `Full working` (`24.2/Guided problems/index.md:34` and
`:39` were both "A bar chart uses separate bars with gaps."). Each question now
has a real next step and a full working. The pass also replaced Chapter 24's
warm-up — `Work out $3+4$ and write $0.25$ as a fraction`, byte-identical in all
five sections — which the earlier warm-up pass missed, so item 4's "all nine" is
now true.

**3. The answer-printing progress checks (item 5).** Every check that stated its
answer now asks for it:

- 17.2–17.5, 18.1, 18.2, 18.3, 18.5, 18.6, 22.2 and 22.3. E.g.
  `18.2/Walkthrough/index.md` before: "…the scale factor is $9\div6=1.5$"; after
  (`:48`): "Work out the scale factor. Then work out the matching length…".
- Chapter 23, all six. Before (`23.2:44`): "If a spinner lands on red 32 times
  in 50 spins, its relative frequency is $\frac{32}{50}=0.64$…"; after (`:44`):
  "Work out the relative frequency of red. Use it to estimate…". Every Chapter 23
  check now names the spinner, so the chapter problem is returned to in every
  section rather than zero.

**4. Bank interleaving (item 6), partly.** Ten later-section banks gained a
method-selection item that mixes this section with an earlier one and asks which
method applies and why: 14.5, 15.5, 17.5, 18.6, 19.6, 20.8, 22.3, 23.6, 24.5 and
25.5. Each is SymPy-verified like every other bank record. A method-choice prompt
now appears in 12 of the 63 banks in Chapters 14–25, up from 2. The rest of the
range remains blocked by topic.

**Verification.** `uv run python -m textbook.lint` exits 0; the only finding is
`style:long-line: 38`, unchanged. `textbook.verify` passes all 139 banks.
`pytest tests/ -q` is 721 passed at the time of this pass (the other, concurrent
workstream's pipeline and PWA tests added five to the 716 baseline). Both
`gcse-maths` profiles build, and `grep -rl math-error site --include='*.html'` is
empty. The audit script's `fade-collapse` findings for Chapter 24 are gone, and
no new `structure:*` or `voice:internal` finding appears.

**Still open, and not attempted here.** The chapter-formula checks the audit
raised that this pass did not own: relevance-heading drift (five headings);
opener heading drift (Chapters 10 and 21 rename the roadmap, and Chapters 18 and
19 use bold text rather than a heading for the outcomes); `covers-in-prose` (17
pages print `**Covers:**`); the Chapter 1 Problems `prose-before-h1` and
duplicate paragraph; the repeated `generic-fade` hints in Chapters 8 and 9; and
the unresolved question of whether the warm-up counts as the Guided page's
"earlier item". The bank interleaving programme (the rest of the 63-bank range)
is started, not finished.
