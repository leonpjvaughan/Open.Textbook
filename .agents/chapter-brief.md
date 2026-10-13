# SUB-AGENT BRIEF — author one chapter

You are authoring **one chapter** of one interactive textbook in this collection.
Everything you need is in the repository. Do not invent content that is not on the
curriculum, and do not touch work outside your chapter.

## Your input

Invoke with `BOOK_ID=<book>` and `CHAPTER_ID=<n>`.

At the time of writing the books are `gcse-maths`, `gcse-physics`, `a-level-maths`,
`a-level-physics`, `proofs`, `ie-jc-maths`, `ie-lc-maths`, `ie-lc-applied-maths` and
`ie-lc-physics`. `ls books/` is the authority; the list here is a convenience.

Read, in order:

1. `AGENTS.md` — the operative **chapter formula** (six principles, page contracts,
   the ~¼ budget for extras). This is binding. The **Irish books** section tells you
   what is different about the four `ie-*` books.
2. `research/pedagogy.md` — the evidence and its limits, so you do not overclaim.
3. `.agents/planning/plan.md` §4–§6 — folder conventions, content contract,
   interactivity policy.
4. `books/<book>/curriculum.yaml` — find `chapters[?id=<n>]`. This is your scope: every
   section, its `tier`, its `refs`, and the chapter's `anchor`, `application`,
   `relevance_prompt` and `tool` metadata.
5. `books/<book>/CURRICULUM-MAP.md` — confirm exactly which items you must deliver.
6. `books/<book>/sources.yaml` and the primary sources in
   `research/sources/<book>/` (run `scripts/fetch_sources.sh <book>` if empty). Use
   them to confirm scope and tier. **Quote nothing** — summarise and cite.
7. `PROBLEMS.md` — the problem-bank schema and its verification limits. Read the
   list of `check.kind` values before you write a check; the ones you need may be in
   the `units` oracle rather than the `sympy` one.

## Two things that differ by book

**The tier codes are the book's.** `tier_axis` in `book.yaml` is an ordered list,
lowest level first. England uses `F` (Foundation and Higher) and `H` (Higher only).
Ireland uses `O` (Ordinary and Higher) and `H`. Leaving Certificate Mathematics has
**three**: `F`, `O`, `H`, and a build includes every level at or below its own. Take
the codes from the curriculum you are given; do not assume `F`/`H`.

**A section's references are `refs:`, not `dfe:`.** For an English book they are DfE
subject-content items (`A17`); for an Irish book they are NCCA learning outcomes
(`N.1`, `GT.3`) or specification sections (`3.2`, `S2`). They already live in the
page's front matter, so **never write a ref into the prose** — `lint` rejects
`DfE refs`, `Delivers DfE` and `DfE coverage` for exactly that reason.

## Your deliverables

For every section `s` in your chapter, replace the three `<!-- scaffold:stub -->`
pages:

```
books/<book>/docs/Chapter <n>/Section <n.m>/Walkthrough/index.md
books/<book>/docs/Chapter <n>/Section <n.m>/Guided problems/index.md
books/<book>/docs/Chapter <n>/Section <n.m>/Problems/index.md
```

Plus two chapter-level pages:

```
books/<book>/docs/Chapter <n>/index.md            # chapter problem, outcomes, roadmap, relevance prompt
books/<book>/docs/Chapter <n>/Review/index.md     # resolves the chapter problem; interleaved mixed practice
```

Keep the front matter. Update it if the scope genuinely shifted, but do not change
`id`, `tier` or `refs` without recording why. **Delete the `<!-- scaffold:stub -->`
marker**, or the scaffold will overwrite your work on the next run.

Also:

- Append any new terms to `books/<book>/docs/Glossary/<strand>.md`, alphabetically, one
  definition each. Define a term once in the book.
- Add a figure under `books/<book>/docs/assets/figures/<slug>.js` when — and only when
  — moving a parameter shows something the prose cannot. Use `assets/figures/kit.js`
  (`panel`, `slider`, `toggle`, `chooser`, `fmt`, `signed`, `react`) and the `fig-*`
  classes. Never a colour. See `.agents/skills/build-guided-figure/SKILL.md`.
- Add every answer and worked solution to `books/<book>/problems/chapter-<n>-*.yaml`,
  with an independent `check`. Run `python -m textbook.verify books/<book>/problems/`
  — it must pass. **A check that cannot fail is not a check**: write the *computation*
  in `expression` and your claimed answer in `answer`, so the CAS proves the two agree
  rather than comparing a number with itself.
- Render the questions and answers with `:::problems <bank>` and
  `:::answers <bank>`, never by hand, so the reader sees exactly what CI verified.
- Do **not** edit `books/<book>/curriculum.yaml`, `CURRICULUM-MAP.md`,
  `.agents/planning/plan.md`, `collection.yaml`, or any file outside your chapter.
  Generated files are regenerated, never hand-edited.

## Before you call it done

```bash
python -m textbook.verify books/<book>/problems/          # every check passes
python -m textbook.lint                                   # no findings in your pages
python -m textbook.pipeline --book <book> --profile <p> --out /tmp/<book>-<n>
grep -rl 'math-error' /tmp/<book>-<n> --include='*.html'   # must print nothing
```

A build exits 0 even when KaTeX fails, so the `grep` is not optional.

Read `.agents/skills/author-textbook-chapter/SKILL.md` and
`.agents/skills/write-textbook-prose/SKILL.md` before you write prose. The voice rules
are binding: plain English, active voice, short sentences, no negative contractions, no
shaming words (`obviously`, `clearly`, `simply`, `just`, `easy`), `you` and never
`one`, and **no internal word ever reaches the reader** — the reader sees `Learn`,
`Practise with help`, `Practise` and `Progress check`, not the names we use for them.
