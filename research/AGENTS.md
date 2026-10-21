# AGENTS.md — the research corpus

`research/` holds the evidence and the background work. It is **not build
input**: nothing here renders into a book, and nothing here is fetched by the
site. It informs the writing, and it is cited from `books/<id>/sources.yaml`.

Read the root `AGENTS.md` first. The root's **Capturing work** still applies,
and it is binding. This file adds **Evidence** and what is particular to the
corpus.

## Evidence

Do not overclaim. The synthesis says its causal evidence is mostly US, secondary
science or early-secondary maths, and that effects are not a ranking of methods;
keep claims to what the briefing supports. See `research/pedagogy.md`.

## What lives here

| Path | What it holds |
|---|---|
| `research/pedagogy.md` | The mapping from the evidence briefing to the chapter formula, and its limits |
| `research/accessibility.md` | Accessibility notes and sources |
| `research/curriculum/ie-curriculum.md` | **The four Irish curricula**: what each specification says, which Physics specification is current and why, and the verified assessment format per level (§8a) |
| `research/curriculum/ie-textbook-contents.md` | The market's tables of contents, read off the publishers' own samples — what an Irish chapter is shaped like |
| `research/curriculum/a-level-maths-textbooks-and-exams.md`, `physics-textbooks-and-exams.md` | The same for the English books: command words, mark schemes, examiner reports |
| `research/curriculum/` (the `.draft.yaml` and `.sources.yaml`) | Drafts and their manifests. Never the source of truth — a book's `curriculum.yaml` is |
| `research/design/reuse-audit.md` | **What is shared and what is repeated**, measured: the evidence behind the kit's rules |
| `research/design/figure-audit.md` | **Every figure, measured in a browser** in both schemes, and the defects it found |
| `research/design/navigation.md` | **Previous/next at the end of a page**: the pattern, the two places this book differs from it, what was rejected and why |
| `research/design/background-effects.md` | The measurement behind opt-in backgrounds |
| `research/legal/disclaimer-and-terms.md` | **The legal wording and its limits**: the precedents, the statutory carve-outs, and what a disclaimer cannot do |
| `research/sources/` | Fetched primary sources — git-ignored, not build input |
| `research/notes/` | Working notes |
| `research/pedagogy-audit/` | Chapter-by-chapter audits against the formula |

## Rules local to the corpus

- **Do not overclaim.** The synthesis is explicit that its causal evidence is
  mostly US, secondary science or early-secondary maths, and that effects are
  not a ranking of methods. Keep claims to what the briefing supports; the
  **Evidence** section above is the rule.
- **The tracked manifest is the book's `sources.yaml`.** `research/sources/` is
  fetched by `scripts/fetch_sources.sh` and is git-ignored, so a citation must
  point at the manifest and the source's own URL, not at the fetched copy.
- **`research/curriculum/` is another workstream's output.** Do not treat a
  draft here as a committed curriculum; `books/<id>/curriculum.yaml` is the
  source of truth.
- **A claim needs a date.** Provision and specification facts are time-bound;
  record when each was checked.
- **Nothing here is reader-facing**, so the voice rules do not apply — but the
  rules about not overclaiming do.

## Common tasks

- **Checking the evidence behind a teaching choice** — `research/pedagogy.md`.
- **Auditing a chapter** — `research/pedagogy-audit/`, then the
  `verify-textbook-change` skill.
- **Adding a source** — record it in the book's `sources.yaml`, not only here.

## Read next

`SHAPE.md` for how the corpus relates to the books, and the root's **Capturing
work**.
