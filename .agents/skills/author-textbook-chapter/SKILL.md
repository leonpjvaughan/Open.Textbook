---
name: author-textbook-chapter
description: Plan, author, or revise one chapter of a textbook in this collection, running the interest arc (chapter problem → maintain → learner-constructed relevance → invite) and the memory arc (encode → retrieve → space → interleave) across its pages. Use when writing or reviewing a chapter, a section, a Walkthrough, a Review, or a chapter opener. Pair it with write-textbook-prose, build-practice-set, build-guided-figure, and verify-textbook-change.
---

# Author a textbook chapter

## Authority

The binding rules are the root `AGENTS.md` (the chapter formula, voice, page
contracts, budget) and `books/<id>/AGENTS.md` (that book's exam boards, tier
axis and pitfalls). The evidence and its limits are in `research/pedagogy.md`.
This skill turns those rules into a procedure. Where they disagree, they win.

## Scope

Work inside one chapter only:

- `books/<id>/curriculum.yaml` — read the chapter entry. It holds the sections
  with their `tier` and `dfe` refs, plus the chapter's `anchor`, `application`,
  `relevance_prompt` and `tools`. This is the source of truth for what to teach.
- `books/<id>/docs/Chapter <n>/` — the opener, the sections, the Review.
- The glossary strand page the chapter's new terms belong to.
- The problem banks and figures the chapter needs.

Never edit `curriculum.yaml`, the generated `nav.yml`, `CURRICULUM-MAP.md`, a
generated MkDocs config, or another chapter. If the curriculum is wrong, finish
the chapter and raise it (see Escalating).

## Step 1 — Plan the two arcs before writing prose

Write the plan down in a scratch note. A chapter runs two arcs at once and
neither delivers the other.

**Interest arc.** The chapter problem from `curriculum.yaml → anchor` is the
destination. It must be genuinely solvable using only this chapter. Its first
contact is low-stakes — predict, estimate, notice, never fail. It returns at
2–3 `## Progress check` points tied to named sections, and the Review resolves
it. Relevance is constructed, not announced: the opener carries one prompt from
`relevance_prompt` that asks the reader to write their own connection, and the
Review asks them to return to it.

**Memory arc.** Each section teaches first, then fades support: Learn (narrated
worked example) → Practise with help (hint → step → full working) → Practise
(independent). Every Practise with help page opens with closed-book recall of
*earlier* material. Later sections and the Review interleave earlier topics and
ask which method applies and why.

**Budget check.** Hooks, applications and tools together are at most about a
quarter of the chapter. Practice dominates. A lively activity never substitutes
for teaching or understanding.

## Step 2 — Write the pages in order

| Page | Friendly name the reader sees | Purpose |
|---|---|---|
| `Chapter <n>/index.md` | the chapter opener | chapter problem, "By the end of this chapter", roadmap, relevance prompt |
| `Section <n.m>/Walkthrough/index.md` | **Learn** | explicit teaching, worked examples, one misconception callout, at most one guided figure |
| `Section <n.m>/Guided problems/index.md` | **Practise with help** | closed-book warm-up, then fading support |
| `Section <n.m>/Problems/index.md` | **Practise** | 8–15 independent items |
| `Chapter <n>/Review/index.md` | **Review** | resolve the chapter problem, mixed practice, reflection |

Use those friendly names in headings and links. The internal words — chapter
problem, retrieval starter, Walkthrough / Guided problems / Problems, tier F/H,
DfE refs, scaffold — must never reach a page. `write-textbook-prose` has the
full substitution table.

**Opener.** Keep the canonical headings stable, chapter to chapter, so the
reader meets one ritual:

```
## The chapter problem[: <name>]
## By the end of this chapter you will be able to
## Where it is used
## <one relevance heading, used consistently>
## Roadmap
```

**Learn.** Prerequisites → objectives → teaching → worked examples with one line
of reasoning per line of algebra → at least one `> **Watch out.**` misconception
callout that states the error, shows the contrast, and re-explains with a check →
at most one guided figure (`build-guided-figure`) → `## You should now be able
to`. Record the `dfe` items this page delivers in its front matter, and cover
each with a worked example.

**Practise with help.** `## Warm-up: remember` first (see `build-practice-set`),
then problems whose support fades. Each `<details markdown="1">` block must add
something the previous one did not; a "Next step" that repeats the "Full working"
is a defect, not a shortcut.

**Practise.** Use `:::problems <bank>` and `:::answers <bank>`; never transcribe
a question or an answer by hand. Mark Higher-only items **H** even on an
otherwise Foundation page.

**Review.** Resolve the chapter problem in full. Then mixed practice across the
chapter and earlier chapters, opening with "say which method you will use before
you calculate". Close with "What you can now do" and a return to the relevance
prompt.

## Step 3 — Keep the chapter coherent

- **Coverage.** Every `dfe` item in the chapter's list appears in at least one
  Learn page and one practice page. Grep the refs and show the result.
- **Tier.** Check each `F`/`H` against the book's tier columns (GCSE Maths: the
  AQA 8300 columns). Do not invent a tag. A plain link from an `F` page to an
  `H` page breaks the strict Foundation build; wrap Higher-only in-page
  extensions in `<!-- tier:h -->…<!-- /tier:h -->`.
- **Glossary.** Define a term once on its strand page, then link to it.
- **Maths.** `$…$` and `$$…$$`. `aligned` is supported. A raw `£` inside maths is
  a trap — use `\pounds` or put currency outside the maths.
- **Figures and tools.** Only when they earn their keep; see
  `build-guided-figure`.

## Step 4 — Verify before claiming done

Hand off to `verify-textbook-change`. In short: `uv run python -m textbook.scaffold`
must report the chapter's files as **skipped**, not rewritten; the banks must
verify; the lint must be clean; both profiles must build strict with no
`math-error`; and the tests must pass. Report the literal commands and their
literal output — never an assertion of success.

## Escalating

Stop and hand back with evidence if:

- a `dfe` item cannot be taught honestly at the section granularity given;
- the figure hook or bank marker you were told to use does not exist or does not
  work;
- a tier tag conflicts with the board's columns;
- covering a section honestly would need content outside the curriculum.

Do not silently move, drop, or invent curriculum content, and do not edit
another chapter to make yours work.
