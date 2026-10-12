# AGENTS.md — the books

One directory per book. A book owns its curriculum, its content, its problem
banks, its booklet data and its provenance; the engine and the design system are
shared. Everything a reader reads ends up here.

Read the root `AGENTS.md` first. The chapter formula, voice, Theming, Conventions
and Toolchain still apply. This file adds what is common to every book, and it
now owns the **Tiers**, **Generated files**, **Content**, **Problem bank** and
**booklet data** traps that used to sit in the root's `## Watch out for`.

The nearest file wins. For the first book, `books/gcse-maths/AGENTS.md` extends
this one with its exam boards, its tier axis and its subject pitfalls.

## What lives in a book

| Path | What it holds |
|---|---|
| `books/<id>/book.yaml` | Identity, profiles, tier axis, subject tint, paths |
| `books/<id>/curriculum.yaml` | Source of truth: chapters, sections, tier, curriculum refs |
| `books/<id>/AGENTS.md` | The book's own rules |
| `books/<id>/docs/` | Canonical content (marimo markdown). Never edit generated files by hand |
| `books/<id>/problems/` | Verifiable problem banks, one YAML per practice set |
| `books/<id>/booklet/` | Formulae-and-tables data (source of truth) |
| `books/<id>/sources.yaml` | Tracked provenance for the curriculum and booklet claims |

## Tiers

Moved from the root's `## Watch out for`.

- Foundation drops `tier: H` pages; a plain markdown link from an `F` page to an
  `H` page breaks the strict build. Wrap such links in
  `<!-- tier:h -->…<!-- /tier:h -->` or omit them.
- Verify every `F`/`H` tag against the AQA 8300 tier columns before publishing.

## Generated files

Moved from the root's `## Watch out for`.

- `books/<id>/docs/**` stubs, `books/<id>/docs/assets/stylesheets/book.css`
  and `books/<id>/CURRICULUM-MAP.md` are generated. Never hand-edit them; edit
  `book.yaml` or `curriculum.yaml` and re-run `python -m textbook.scaffold`.
- A stub is rewritten only while it carries `<!-- scaffold:stub -->`; authored
  pages must never contain that marker.

## Content

Moved from the root's `## Watch out for`.

- The build checks links, maths and structure — **not** mathematical correctness.
  Re-derive every answer and check the arithmetic in worked examples.
- `<details>` blocks need `markdown="1"` (via `md_in_html`) or the inner
  markdown renders literally.
- The anchor problem must be genuinely solvable by the chapter's end; keep hooks,
  applications and tools within the ~¼ budget.
- Figures must use the `fig-*` classes (`fig-accent`, `fig-warn`, `fig-good`,
  `fig-ink`, `fig-grid`) and the `text-*` classes, never hard-coded colours, so
  they adapt to dark mode.
- Never put `$...$` in text a figure injects at runtime: the maths hook runs at
  build time, so runtime LaTeX is not rendered. Use plain text or HTML.

## Problem bank

Moved from the root's `## Watch out for`. `PROBLEMS.md` is the schema and the
statement of what the verifier can and cannot prove.

- Keep units, words and `%` out of the CAS fields; they belong in `statement`.
  `£`, `p` and commas will not parse.
- Declare assumptions (`symbols: {x: {real: true}}`) or the verifier will reject
  valid steps such as `sqrt(x**2) -> x` when `x` can be negative.
- Decimals are rationalised before checking, so write exact values rather than
  rounded ones. Rounding needs an interval check, not equality.
- Squaring both sides or multiplying by a variable can add roots; those steps
  need a weaker relation and an explicit extraneous-root check. See `PROBLEMS.md`.
- A step that is not an equivalence (differentiate, substitute, integrate) must
  declare `relation: apply` with the operation. Do not fake calculus as an
  `equivalent` step. The verifier proves the algebra, not the argument.
- Markers are fence-aware. A real `:::answers` or `:::figure` marker inside a
  code fence is left alone, so never rely on a fenced marker expanding.
- The verifier proves the mathematics, not the method. A correct answer reached
  by an unexpected route still passes.

## Booklet data

Moved from the root's `## Watch out for`. The widget that renders it is shared;
see `assets/AGENTS.md`.

- `BOOKLETS.md` is the contract: one booklet per qualification and subject, built
  from the board's own document, not from another board's sheet or from memory.
  Any subject whose board provides a sheet — mathematics, physics, chemistry,
  combined science — should have one, at GCSE and at A-level.
- `books/<id>/booklet/<subject>.yaml` is the source of truth;
  `books/<id>/docs/assets/booklet/booklet.json` is generated. Edit the YAML and
  run `python -m textbook.booklet`. A book that declares no booklet ships no
  widget.
- Provision is per board and tier. Selecting a board hides every item that board
  does not provide, so a wrong tag is a content bug. Since Ofqual's October 2024
  decision, all boards provide the same DfE-based sheets for 2025–2027; AQA and
  OCR 2026 sheets were checked directly, and Edexcel follows the same set.
- The page's answer blocks come from the bank. Write `:::answers <bank>` (or
  `:::answers <bank>#<id>`) instead of hand-writing answers, so the reader sees
  exactly what CI verified. `engine/textbook/verify/render.py` builds the block.

## Maths

The traps for writing `$…$` — the markdown escape, the `throwOnError` build
trap, `\pounds` and `latex2mathml` — are the maths hook's, so they now live in
`engine/AGENTS.md`. Read that section before you author or check maths.

## Common tasks

- **Authoring a chapter** — load the `author-textbook-chapter` skill and read
  `.agents/chapter-brief.md`.
- **Editing prose** — load `write-textbook-prose`; the voice rules in the root
  are binding.
- **Writing a bank** — load `build-practice-set` and read `PROBLEMS.md`.
- **Building a figure** — load `build-guided-figure` and read
  `assets/AGENTS.md`.
- **Adding a booklet** — read `BOOKLETS.md`.
- **Adding a book** — read `SHAPE.md` and the root's **Repository map**.

## Read next

The book's own `AGENTS.md` for its identity, then `SHAPE.md` for what a new book
requires.
