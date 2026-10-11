# Formula and data booklets

The reference sheet a reader is **allowed to use in the exam**, reproduced
faithfully, filtered by awarding body and tier. This file is the contract for
that data. For the problem-bank contract, see `PROBLEMS.md`.

## Why one per qualification and subject

There is no shared national booklet. Provision is decided by the regulator,
implemented by each awarding body, and it differs by subject, qualification and
tier:

- **Subject decides what is on it.** Mathematics gives formulae; physics gives
  equations and constants; chemistry gives a periodic table plus data.
- **Qualification decides its shape.** GCSE sheets are a page of stand-alone
  formulae. A-level booklets are a multi-page document that also carries a
  statistical or physical data section.
- **Tier decides what is included.** A Foundation sheet and a Higher sheet are
  genuinely different documents, not the same sheet abbreviated.
- **Provision is time-bound.** It is set for a period and then reviewed. A
  booklet that was right for 2026 may be wrong for 2028.

So a booklet is **bespoke to the qualification and the subject**, and it must be
built from the board's own document rather than from memory or from another
board's sheet, however similar they look.

## The target set

Status is deliberately explicit. `verified` means the board's document was
retrieved and the data checked against it; `to retrieve` means the shape is known
but the document has not been obtained and checked yet.

| Qualification | Subject | What the board provides | Tiered | Status |
|---|---|---|---|---|
| GCSE | Mathematics | Formulae sheet; no tables | Yes | **verified** (AQA 2026 Higher and Foundation checked directly; OCR matches; Edexcel follows the same set) |
| GCSE | Physics | Equations sheet, separate and combined science | Yes | to retrieve |
| GCSE | Chemistry | Periodic table insert; formulae limited | Yes | to retrieve |
| GCSE | Combined Science | Physics equations and chemistry data | Yes | to retrieve |
| A-level | Mathematics | Formulae booklet, plus a statistical tables section | No | to retrieve |
| A-level | Further Mathematics | Its own formulae booklet | No | to retrieve |
| A-level | Physics | Data and formulae booklet | No | to retrieve |
| A-level | Chemistry | Periodic table, plus a data booklet | No | to retrieve |

Design the schema so a booklet with no mathematics — a periodic table, a table of
physical constants — can be expressed as `tables`, which the widget already
renders from plain text and data.

## The contract

### Data

One YAML file per book, at `books/<id>/booklet/<subject>.yaml`, declared in
`book.yaml → booklet`. It is the source of truth; `booklet.json` beside the docs
is generated and must never be hand-edited.

Each item carries:

| Field | Meaning |
|---|---|
| `id` | Stable, unique within the booklet |
| `name` | What a reader would call it |
| `latex` | The formula, in LaTeX, rendered to MathML at build time |
| `note` | A short plain-English gloss, only where it removes ambiguity |
| `provision` | Per board: one of the groups below |
| `tier` | `[F, H]` or `[H]` for tier-restricted provision |
| `keywords` | Extra search terms, including words with no LaTeX spelling |

### The three groups

The distinction a reader actually needs is not "is it on the sheet" but "what am
I expected to do about it":

- **`given`** — printed on the board's sheet. A reader may look it up.
- **`question`** — may be given inside the relevant question rather than on the
  sheet. Worth knowing, because it will not be on the sheet they are reading.
- **`know`** — not given. The reader must recall it or derive it, and the
  Walkthrough should teach it as something to know.

Getting a group wrong is a content bug, not a cosmetic one: a reader who trusts a
`know` item to be `given` will not learn it.

### Fidelity

- Reproduce the board's **wording and notation**, not a tidier equivalent. If the
  sheet writes `\pi r^2 h`, do not normalise it to `\pi h r^2`.
- Keep the board's ordering within a section where a reader will be scanning.
- Do not add an item a board does not provide, even if it is obviously useful.
  The booklet answers "what may I use", not "what is true".
- Where a board's sheet is genuinely ambiguous, reproduce it and resolve the
  ambiguity in `note`, not in `latex`.

### Provenance

Every booklet names its sources in `meta.provenance` and its basis in
`meta.basis`, and lists the retrieved documents in the book's `sources.yaml`
under `references`, with a `url`, `retrieved` date and `role`. A claim about
provision must be traceable to a document, with the date it was checked.

### Verification

`python -m textbook.booklet` validates and renders at build time, and CI fails on:

- an item with no `latex`, a duplicate `id`, or an unknown board or group;
- a `tier` outside the book's tier axis;
- LaTeX KaTeX cannot render;
- a table row whose width does not match its header;
- a generated `booklet.json` that differs from the committed one.

### Widget behaviour

The widget is `assets/booklet/booklet.js`, shared by every book. Selecting a
board hides every item that board does not provide, and a chip row toggles the
groups. Because the data is per book, the widget is loaded only by books that
declare a booklet — a book without one ships no widget.

## Adding a booklet

1. Retrieve the board's own document and record it in the book's `sources.yaml`.
2. Write `books/<id>/booklet/<subject>.yaml` against the contract above, with
   `provision` for every board the book supports.
3. Run `python -m textbook.booklet` and fix anything it rejects.
4. Run the book's build and check the widget: filter to each board, and confirm
   nothing appears that the board does not provide and nothing is missing that it
   does.
5. Re-check the provision whenever the regulator's period ends.

## Known traps

- **A sheet may differ between tiers.** Do not assume the Higher sheet is a
  superset; check both.
- **A board may give something in the question instead of on the sheet.** That is
  `question`, not `given` and not `know`.
- **Tier tags are not the same as provision.** An item can be Higher-only on the
  sheet, or available to both tiers but only given to one.
- **Do not infer one board's provision from another's**, even when the regulator
  has aligned them: alignment is a claim with a date on it.
- **Regulated documents are reissued.** Record the year the data is for, and
  re-verify when the period ends.
- **No log tables at GCSE.** Logarithms are not on the specification, so a GCSE
  mathematics booklet has no tables section of that kind; the "tables" belong to
  exact trigonometric values and unit conversions.

## Limits

The booklet reproduces what a board publishes. It does not model what a
particular paper happened to print, and it cannot tell a reader that their school
has chosen a different board's sheet. The selector exists to make the difference
visible rather than to resolve it.
