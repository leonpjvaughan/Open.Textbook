# Formula and data booklets

Per-book exam reference sheets (`books/<id>/booklet/<subject>.yaml` → generated `booklet.json`), rendered by the shared widget `assets/booklet/booklet.js` (loaded only by books declaring `book.yaml → booklet`).

## Status by book

| Book | Booklet | Notes |
|---|---|---|
| `gcse-maths`, `gcse-physics` | built | Tiered (`F`/`H`), per-board (AQA/Edexcel/OCR) |
| `a-level-physics` | built | Per-board data & formulae |
| `a-level-maths` | built | Formulae & statistical tables |
| `ie-lc-maths`, `ie-lc-physics`, `ie-lc-applied-maths` | built | Sections from SEC *Foirmlí agus Táblaí* (all `given`, untiered) |
| `ie-jc-maths` | exempt | SEC publishes no Junior Cycle booklet |
| Reference / modelling books (`proofs`, `numerical-methods`, `maths-applied`) | none | Not exam courses |

## Data schema

Each item in `books/<id>/booklet/<subject>.yaml`:

- `id`: unique within booklet
- `name`: reader-facing label
- `latex`: exact board formula (rendered to MathML at build time)
- `note`: optional plain-English gloss (resolve ambiguity here, never by altering `latex`)
- `provision`: per-board status — `given` (on sheet), `question` (supplied in question), or `know` (must recall)
- `tier`: subset of the book's `tier_axis`
- `keywords`: extra search terms

Tables of constants or values use the `tables` section. Every booklet records `meta.provenance` and `meta.basis`, with retrieved documents cited in `books/<id>/sources.yaml`.

## Rules & verification

- Reproduce the board's exact wording, notation, and ordering — do not normalise formulae or infer one board's provision from another's.
- Never hand-edit generated `booklet.json`; run `python -m textbook.booklet` to validate and regenerate.
- CI fails on missing `latex`, duplicate `id`, unknown board/group/tier, KaTeX error, mismatched table row widths, or stale `booklet.json`.
- Problem banks may declare `plays: <booklet-id>`; `textbook.verify` fails if every supported board marks that item `know`.
