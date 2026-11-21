# AGENTS.md — the books

Each book owns its curriculum, content, problem banks, booklet data and provenance;
engine and design system are shared. **Every book has its own `AGENTS.md`** (boards,
level axis, assessment, pitfalls); without one it inherits only the root and this
file, and `tests/test_agent_context.py` fails.

## What lives in a book

All under `books/<id>/`: `book.yaml`, `curriculum.yaml` (source of truth),
`AGENTS.md`, `docs/`, `problems/`, `booklet/`, `sources.yaml`.

## The Irish books

Four Irish books in `collection.yaml`: `ie-jc-maths`, `ie-lc-maths` (**Foundation,
Ordinary, Higher**), `ie-lc-applied-maths`, `ie-lc-physics`.

- **The tier axis is ordered and may have more than two codes.** `tier_axis` lists
  levels lowest first: `F`/`H` England, `O`/`H` Ireland, `F`/`O`/`H` Leaving
  Certificate Mathematics. `tier_filter` is the tier a profile builds; a build
  includes **every level at or below its own**. A filter naming neither a tier code
  nor `all`/`toggle` raises: never fall through to "include everything" and ship
  higher-only pages to a lower-tier reader.
- **Section references are `refs:`, not `dfe:`** (the NCCA learning outcome or
  strand).
- **The Unifying strand is not a strand of chapters** — Junior Cycle Mathematics and
  Leaving Certificate Physics each have one, processes not content. Deliver it
  through the chapter formula, reference it from the sections that exercise it;
  never make it a chapter.

## Tiers

- Foundation drops `tier: H` pages; a plain markdown link from an `F` page to an `H`
  page breaks the strict build — wrap it in `<!-- tier:h -->…<!-- /tier:h -->` or
  omit it.
- Verify every tier tag against the specification: English `F`/`H` from AQA 8300
  tier columns; Irish from the NCCA specifications, recorded per book.

## Generated files

`books/<id>/docs/**` stubs, `books/<id>/docs/assets/stylesheets/book.css` and
`books/<id>/CURRICULUM-MAP.md` are generated: edit `book.yaml` or
`curriculum.yaml` and re-run `python -m textbook.scaffold`, never by hand. A stub
is rewritten only while it carries `<!-- scaffold:stub -->`; authored pages must
never contain that marker.

## Content

- The build checks links, maths and structure, **not** mathematical correctness:
  re-derive every answer and check worked-example arithmetic.
- `<details>` needs `markdown="1"` (via `md_in_html`) or inner markdown renders
  literally.
- The anchor problem must be solvable by the chapter's end; keep hooks,
  applications and tools within the ~¼ budget.
- Never put `$...$` in runtime figure text; the maths hook runs at build time. Use
  plain text or HTML.

## Problem bank

`PROBLEMS.md` is the schema and states what the verifier can and cannot prove.

- Keep units, words and `%` in `statement`, not CAS fields (`£`, `p`, commas will
  not parse).
- Declare assumptions (`symbols: {x: {real: true}}`), or the verifier rejects valid
  steps such as `sqrt(x**2) -> x` for negative `x`.
- Write exact decimals: they are rationalised before checking, and rounding needs an
  interval check, not equality.
- Squaring both sides or multiplying by a variable can add roots: use a weaker
  relation and an explicit extraneous-root check (see `PROBLEMS.md`).
- A non-equivalence step (differentiate, substitute, integrate) declares
  `relation: apply` with the operation; never fake calculus as `equivalent` — the
  verifier proves algebra, not argument.
- Markers are fence-aware: a real `:::answers` or `:::figure` in a code fence is
  left alone, so never rely on a fenced marker expanding.
- A correct answer by an unexpected route still passes.

## Booklet data

- `BOOKLETS.md` is the contract: one booklet per qualification and subject, from
  the board's own document, never another board's sheet or memory; every subject
  with a board sheet — mathematics, physics, chemistry, combined science — needs
  one, at GCSE and A-level.
- `books/<id>/booklet/<subject>.yaml` is the source of truth,
  `books/<id>/docs/assets/booklet/booklet.json` generated: edit the YAML, run
  `python -m textbook.booklet`. No declaration, no widget.
- Provision is per board and tier: selecting a board hides every item it does not
  provide, so a wrong tag is a content bug; all boards provide the same DfE-based
  2025–2027 sheets.
- Answer blocks come from the bank: write `:::answers <bank>` (or
  `:::answers <bank>#<id>`), never hand-written, so the reader sees what CI
  verified; `engine/src/textbook/verify/render.py` builds it.

## Maths

The `$…$` traps — markdown escape, `throwOnError` build trap, `\pounds`,
`latex2mathml` — live in `engine/AGENTS.md`; read it before authoring or checking
maths. **Define every symbol where the reader meets it**: a `where …` line under
the formula names each, or one **The symbols** list covers a whole table of
formulas; `write-textbook-prose` has the pattern.
