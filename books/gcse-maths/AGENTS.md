# AGENTS.md — GCSE Mathematics

Read the root `AGENTS.md` and `books/AGENTS.md` first; this file adds what is
particular to this book.

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

- `F` — Foundation **and** Higher. `H` — **Higher only**; the Foundation profile
  drops these pages and strips `<!-- tier:h -->…<!-- /tier:h -->` spans.
- Tag every tier against the **AQA 8300** tier columns. When AQA is silent, take
  the stricter (Foundation-inclusive) reading and note it in `sources.yaml`.
- A plain markdown link from an `F` page to an `H` page breaks the Foundation
  strict build. The tier hook unlinks roadmap links for that profile, but prefer
  the `<!-- tier:h -->` span for in-page extensions.

## Curriculum and coverage

`curriculum.yaml` is the source of truth for chapters, sections, tier and
curriculum references. `coverage:` declares the reference ranges the scaffold
checks; a reference with no section fails the build. `CURRICULUM-MAP.md` is the
generated reverse index — never edit it by hand.

Curriculum references come from the DfE subject content (`N`, `A`, `R`, `G`,
`P`, `S`), which is also how AQA 8300 labels its columns.

## Problem banks

Banks live in `problems/`, one per practice set; the SymPy oracle verifies every
record in CI. `PROBLEMS.md` is the schema. Two traps:

- **Single-quote every string that contains maths.** Double-quoted YAML turns
  `\a` and `\f` into control characters, silently corrupting LaTeX.
- **No multi-line quoted scalars.** Keep one value to one line; folded strings
  have produced invalid banks.

## Booklet

`booklet/gcse-maths.yaml` is the source of truth;
`docs/assets/booklet/booklet.json` is generated. All boards provide the same
DfE-based sheets for 2025–2027 (Ofqual, October 2024), so the per-board provision
is the common set. There are **no log tables** in GCSE mathematics — logarithms
are not on the specification.
