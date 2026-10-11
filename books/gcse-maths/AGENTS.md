# AGENTS.md — GCSE Mathematics

Book-specific instructions. The repository-wide conventions — the chapter
formula, the voice and language rules, and the cross-cutting watch-outs — live in
the root `AGENTS.md`; read that first. This file covers what is particular to
**this** book.

## Identity

| | |
|---|---|
| Book id | `gcse-maths` |
| Qualification | GCSE |
| Subject | Mathematics |
| Exam boards | AQA 8300, Pearson Edexcel 1MA1, OCR J560 |
| Tiers | Foundation and Higher |
| Profiles | `higher` (default), `foundation` |

Declared in `book.yaml`. Change the identity there, not in the generated files.

## Tier conventions

- `F` — Foundation **and** Higher.
- `H` — **Higher only**. The Foundation profile drops these pages and strips
  `<!-- tier:h -->…<!-- /tier:h -->` spans.
- Tag every tier against the **AQA 8300** tier columns. When AQA is silent,
  take the stricter (Foundation-inclusive) reading and note it in `sources.yaml`.

A plain markdown link from an `F` page to an `H` page breaks the Foundation
strict build. The tier hook unlinks roadmap links for that profile, but do not
rely on it: prefer the `<!-- tier:h -->` span for in-page extensions.

## Curriculum and coverage

`curriculum.yaml` is the source of truth for chapters, sections, tier and
curriculum references. `coverage:` declares the reference ranges the scaffold
checks; a reference with no section fails the build. `CURRICULUM-MAP.md` is the
generated reverse index — never edit it by hand.

Curriculum references come from the DfE subject content (`N`, `A`, `R`, `G`,
`P`, `S`), which is also how AQA 8300 labels its columns.

## Problem banks

Banks live in `problems/`, one per practice set. Every record is verified by the
SymPy oracle when CI runs. See `PROBLEMS.md` at the repository root for the
schema, and follow these two traps that have cost us before:

- **Single-quote every string that contains maths.** Double-quoted YAML turns
  `\a` and `\f` into control characters, silently corrupting LaTeX.
- **No multi-line quoted scalars.** YAML folded strings here have produced
  invalid banks repeatedly; keep one value to one line.

## Booklet

`booklet/gcse-maths.yaml` is the source of truth for the formulae and tables
widget; `docs/assets/booklet/booklet.json` is generated. Since Ofqual's October
2024 decision all boards provide the same DfE-based sheets for 2025–2027, so the
per-board provision is the common set. There are **no log tables** in GCSE
mathematics — logarithms are not on the specification.

## Style

- `assets/stylesheets/extra.css` is shared with every other book. Do not fork it
  here; set tokens in `book.yaml → theme` or add to `book-local.css`.
- Figures use the `fig-*` classes and `--tb-fig-*` variables, never hard-coded
  colours, so they adapt to dark mode.
