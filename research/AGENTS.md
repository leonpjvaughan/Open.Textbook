# AGENTS.md — the research corpus

`research/` holds the evidence and the background work. It is **not build
input**: nothing here renders into a book, and nothing here is fetched by the
site. It informs the writing, and it is cited from `books/<id>/sources.yaml`.

Read the root `AGENTS.md` first. The root's **Evidence** and **Capturing work**
still apply, and they are binding. This file adds what is particular to the
corpus.

## What lives here

| Path | What it holds |
|---|---|
| `research/pedagogy.md` | The mapping from the evidence briefing to the chapter formula, and its limits |
| `research/accessibility.md` | Accessibility notes and sources |
| `research/curriculum/` | Per-subject curriculum drafts and their source manifests |
| `research/sources/` | Fetched primary sources — git-ignored, not build input |
| `research/design/` | Design exploration and mocks; not published |
| `research/notes/` | Working notes |
| `research/pedagogy-audit/` | Chapter-by-chapter audits against the formula |

## Rules local to the corpus

- **Do not overclaim.** The synthesis is explicit that its causal evidence is
  mostly US, secondary science or early-secondary maths, and that effects are
  not a ranking of methods. Keep claims to what the briefing supports; the root's
  **Evidence** is the rule.
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

`SHAPE.md` for how the corpus relates to the books, and the root's **Evidence**
and **Capturing work**.
