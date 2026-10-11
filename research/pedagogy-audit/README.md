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

1. Fix Chapter 7's chapter problem so it is solvable as set.
2. Rewrite the fade in Chapters 19, 23 and 24.
3. Give Chapter 5's Guided pages more than one question each, and remove the false
   claim about a later question.
4. Replace the nine repeated warm-ups with retrieval from what each section
   actually depends on.
5. Turn the answer-printing progress checks into questions (17, 18, 22, 23).
6. Put interleaving and a method choice into the problem banks, not only the
   Reviews.
7. Move the five mis-ordered figures below their Predict prompt.

Each of these should be done with the skills in `.agents/skills/` —
`author-textbook-chapter` for the rewrite, `write-textbook-prose` for the voice,
`build-practice-set` for the banks, `build-guided-figure` for the figures — and
gated with `verify-textbook-change` before it is called done.
