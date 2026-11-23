# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

**This file holds open items only.** Closed items are deleted (git history keeps their diagnosis). A new item goes at the next number, with its diagnosis, its fix and its own done-means. Open: **223**, **224**, **225**.

Accepted limitations live where the check that records them lives (`tests/test_verify_coverage.py`, `books/*/curriculum.yaml`), not here.

---

## 223 — a chapter above the lower tier still publishes its Review page

**What is wrong, part one (fixed 2026-11-23).** `:::problems` and `:::answers`
rendered every record in a bank whatever its `tier`, so an `H` record on a shared
Review page shipped to the Foundation build marked **H**. `select()` now drops the
records the build does not include (`hooks/tier.py → included_tiers`), before
numbering, and `tests/test_markers.py` pins it against `chapter-09-review`.
`var/check-foundation/chapter-9/review/index.html` no longer carries the two
quadratic inequalities.

**What is wrong, part two.** A bank wholly above the build still renders every
record. Nine Review pages belong to chapters no lower-tier reader studies, yet
their pages are built and listed:

```
ie-lc-maths   Chapters 5, 7, 8, 9, 15, 16, 17, 18   (lowest section tier O)
gcse-maths    Chapter 13                            (every section H)
```

Measured: `site/gcse-maths/foundation/chapter-13/review/index.html` exists and
`site/gcse-maths/foundation/chapter-13/` contains no section page. The chapter
opener and Review are the only pages of the chapter a Foundation reader sees.

**The fix.** A chapter with no section at or below the build's tier should not be
built, listed or linked. The tier must come from the curriculum chapter entry
(`scaffold.build_nav_list` currently appends `{"Review": …}` unconditionally), and
`paths = nav_paths(full)` must already have pruned those pages so the nav cannot
link a page the build does not write. Tagging only the page is not enough: the nav
still lists Review and would 404. Then give each of the nine pages the chapter's
minimum tier in front matter.

**Done means**

- [x] a mixed F/H bank renders only the F questions on a Foundation build,
      numbered from 1, and both on a Higher build.
- [x] `var/check-foundation/chapter-9/review/index.html` contains neither
      quadratic inequality, and the Higher build still contains both.
- [x] `books/gcse-physics/docs/Chapter 10/Review/index.md` no longer ships its two
      `tier: H` questions to the Foundation profile.
- [ ] no lower-tier build contains a chapter page whose sections are all above it:
      `site/gcse-maths/foundation/chapter-13/` and the eight `ie-lc-maths` chapters
      are absent, and no sidebar link points at them.
- [ ] a test builds a book whose chapter is above the lowest profile and asserts
      the page is neither written nor listed.

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

## 225 — a `structured` answer prints its model-answer bullets and its prose twice

**What is wrong.** `engine/src/textbook/verify/render.py → render_problem` prints
every `check.points[].text` as a bullet list for a `structured` check, and then
prints `answer_text` as **Answer:** when the record carries both. The two say the
same thing in different words, so a reader meets the method twice.

Measured on the physics pilot and every Review bank written in this pass:
`books/ie-lc-physics/docs/Chapter 1/Review/index.md` renders question 1 with the
three declared steps as bullets, followed by the same three steps as a paragraph.

**The fix.** One of the two is the reader's answer. Either the bullets are the
answer and `answer_text` is only the verifier's model answer (never rendered), or
`answer_text` is rendered and the bullets are suppressed when it exists. Pick one
in `render_problem` and apply it everywhere, so a bank author cannot produce a
double answer by supplying both.

**Done means**

- [ ] one rendered answer per question, whichever combination of `points` and
      `answer_text` the record carries.
- [ ] the existing `structured` records (physics Reviews, `ie-lc-physics` practice
      banks, the new Review banks) render once, not twice.
- [ ] a test in `tests/test_problem_bank.py` fails if a record prints both.
