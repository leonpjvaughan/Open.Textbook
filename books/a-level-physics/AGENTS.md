# AGENTS.md — A-level Physics

Book-specific instructions. Three layers apply, and the closest file wins:

1. the root `AGENTS.md` — the chapter formula, the voice rules, the cross-cutting
   traps;
2. `books/AGENTS.md` — the rules for **any** book: tiers, generated files, content,
   problem banks, booklet data. It is one directory up, so it is easy to miss, and
   it is not optional;
3. this file — what is particular to **this** book.

Read the root and `books/AGENTS.md` first, then this one.

## Identity

| | |
|---|---|
| Book id | `a-level-physics` |
| Qualification | A-level |
| Subject | Physics |
| Exam boards | AQA 7407/7408, Pearson Edexcel 9PH0, OCR H556 (Physics A) |
| Tiers | none — A-level has no Foundation/Higher axis |
| Profiles | `a-level` (the only profile, and the default) |

Declared in `book.yaml`. Change the identity there, not in the generated files.

## No tier axis

- `book.yaml → tier_axis` is **empty** and must stay empty. There is no F/H
  distinction to label, so no section carries `tier:` and no page declares one.
  It is written as `{}` with a comment rather than omitted, because every other
  physics book has one and a reader of `book.yaml` will look for it.
- `tier` is optional in the curriculum schema for exactly this case. Absent means
  "belongs to every reader of this book"; the tier hook passes the single
  `a-level` build through untouched.
- Do not tag pages or sections `F` or `H`, and do not write "Foundation",
  "Higher", "tier F" or "tier H" into content. The A-level reader must never meet
  the GCSE tier vocabulary — and the booklet widget hides its tier control for a
  book whose data sets `meta.tiered: false`.

## Exam boards and papers

The content areas are the DfE's and common to the three boards. The assessment
structure is not, and a section that leans on a board's paper order must say so or
stay board-neutral:

| Board | Structure |
|---|---|
| AQA 7407/7408 | Paper 1, Paper 2 each 34%; Paper 3 32%. 7407 is the AS |
| Pearson Edexcel 9PH0 | Paper 1 and Paper 2 each 30%; Paper 3 (General and Practical Principles) 40% |
| OCR H556 | Papers 01 and 02 each 37%; Paper 03 26%; plus the non-exam Practical Endorsement |

All three require **at least 40% of the marks to be mathematics at Level 2 or
above** (DfE Appendix 6; AQA and OCR state it, and Edexcel's paper overviews
state it). OCR's Appendix 5e is worth reading before writing a quantitative
question: it *excludes* "simple substitution with little choice of equation or
data" and "structured question formats using GCSE mathematics" from what counts as
Level 2, which is a direct instruction about how demanding the practice must be.

AQA's optional topics (3.9 Astrophysics, 3.10 Medical physics, 3.11 Engineering
physics, 3.12 Turning points in physics, 3.13 Electronics) are **board-specific
and deliberately out of scope for this book's common-core plan**. The limit is
stated in `curriculum.yaml`, in the booklet's `meta.note` and in the
reader-visible provenance strings, so a reader on an option topic knows to use
their own board's insert. Do not add one board's option to the common
curriculum.

## Required practicals and the Practical Endorsement

All three boards assess a minimum of **twelve identified practical activities**,
because the DfE Appendix 5c requires it. The boards name them differently — AQA
numbers "Required practical 1"–"12", Edexcel maps them to core practicals,
OCR runs Practical Activity Groups PAG1–PAG12 — but the list of techniques is the
same DfE one and includes: length, temperature, pressure, force, angle and volume
instruments; digital instruments including multimeters; methods to increase
accuracy (multiple oscillations, a fiducial marker, a set square, a plumb line);
stopwatch or light gates; calipers and micrometers; DC circuits; signal generator
and oscilloscope; generating and measuring waves; a laser or light source for
interference and diffraction; ICT modelling and data logging; ionising radiation
and detectors.

The **Practical Endorsement is separate and non-exam**. It is not a paper and
does not carry marks in the written assessment; at least 15% of the written marks
assess practical knowledge, skills and understanding. Treat uncertainty propagation, graph reading and the choice of apparatus as assessment content,
not as background.

## Equations and the booklet

**No A-level physics equation must be memorised, and the boards provide the
booklets.** AQA supplies its data-and-formulae insert at all three papers; Edexcel
supplies the printed "List of data, formulae and relationships" and states
"Students need not memorise formulae for this qualification. The formulae below
will be supplied in each examination. Any other formulae that are required will
be provided in the question."; OCR prints its data sheet with the papers. So:

- `given` means **printed on that board's own insert**. AQA's and OCR's inserts
  print the core relationships; Edexcel's printed insert does not print every one,
  so the booklet marks the core relationships it omits `question` (they are
  supplied in the question, which is what Edexcel's own sentence promises) and
  the two definitions a reader must hold (`v = Δs/Δt`, `a = Δv/Δt`) `know`.
  Because no equation must be memorised, the point of the group is *where* the
  reader can look, never *whether* to learn it.
- **OCR is the exception that must not be normalised away.** OCR marks some
  equations "Learners will also be expected to recall this equation" *even though
  the data sheet prints them* — `F = ma`, `W = mg`, `E_k = ½mv²`,
  `E_p = mgh` ("and derive it from first principles"), and `R = V/I`. The booklet
  records that in `note` on OCR's items; it is the clearest reason `given` and
  "expected to recall" are not the same question.
- `know` at A-level is definitions (the newton, emf, stress, strain), SI units and
  prefixes, the meaning of every symbol, and the derivations the specification
  asks for (AQA requires the equations of motion and the kinetic-theory model).
- The AQA booklet is versioned ("version 1.5", "from the June 2017 series
  onwards"), the Edexcel insert is versioned ("Issue 3, November 2022") and OCR's
  data sheet is embedded in a specification whose version changes (H556 v3.0,
  March 2026). Record the version and re-verify when any is reissued.

`booklet/a-level-physics.yaml` is the source of truth;
`docs/assets/booklet/booklet.json` is generated. It transcribes the **core** (the
DfE areas common to the three boards) and the constants. The board-only items and
AQA's five optional topics are a **deliberate limit**, stated in `meta.note`, in
`curriculum.yaml` and in the reader-visible provenance strings; they are not a
promise to transcribe them into this shared booklet. Read `BOOKLETS.md` and
`research/curriculum/physics-equations-and-data.md` before changing provision.

## Curriculum and coverage

`curriculum.yaml` is the source of truth. `coverage:` declares the reference
ranges the scaffold checks; a reference with no section fails the build.
`CURRICULUM-MAP.md` is the generated reverse index — never edit it by hand.

References (`AP1`–`AP9`) index the nine numbered areas of DfE Appendix 3
(paragraphs 37–45), in order. The DfE does not number the individual statements
of an area, so a reference means the whole area. Do not invent a finer DfE item
number. No `year` tag is asserted: the DfE marks the AS subset in non-bold type,
which a text extraction cannot recover, and the boards' AS/A-level divisions
differ.

## Problem banks

Banks live in `problems/`, one per practice set. `book.yaml → oracles` is
`[sympy, units]`: the SymPy oracle proves the arithmetic and algebra, and the
units oracle proves dimensions, significant figures, uncertainty propagation,
vector resolution and values read off a graph. `PROBLEMS.md` is the schema; the
nine physics check kinds (`dimensions`, `convert`, `sigfigs`, `uncertainty`,
`resolve`, `gradient`, `intercept`, `area`, `structured`) are documented there
and in `research/curriculum/physics-verifier-gaps.md`.

Physics-specific traps:

- **Units never enter the CAS string.** Keep units, words and `%` in
  `statement`; a unit is parsed separately into a dimension and an exact factor.
- **The verifier proves arithmetic and dimensions, not physics.** A
  dimensionally consistent, arithmetically correct, physically absurd answer
  passes. Never present a passing bank as proof of the physics; that limit is
  documented in `units.py` and the gaps note, and it must survive into the prose.
- **Rounding needs an interval, not equality.** Use `sigfigs` or `between` with a
  stated tolerance; a rounded value is never `equivalent`.
- **Say which convention an uncertainty uses.** Round once, half-range; a value
  without a declared rule is an error. Edexcel Appendix 10 is the board's own
  treatment and the right citation for a practical-skills chapter.
- **Graphical calculus is not symbolic differentiation.** DfE C.3.9 asks for
  rates of change solved graphically or by spreadsheet; a bank that uses `diff`
  for it is proving something the qualification does not ask for.
- The GCSE traps in `books/AGENTS.md` still apply (single-quote maths, one value
  to one line).

## Style

- Theming belongs to the reader: bundles in `themes/` are the reading experience
  and apply to every book. This book contributes only its **subject tint**
  through `book.yaml → theme`, which bundles compose in. Do not add surfaces or
  fonts here.
- `assets/stylesheets/extra.css` and `themes.css` are shared with every other
  book. Do not fork either; set the tint in `book.yaml → theme`, or add a
  component rule to `book-local.css`.
- Figures use the `fig-*` classes and `--tb-fig-*` variables, never hard-coded
  colours, so they adapt to dark mode.
- Use SI units and prefixes correctly (`m s⁻¹`, `N m² kg⁻²`, `J K⁻¹ mol⁻¹`), give
  values to the significant figures the data supports, and state uncertainties as
  the specification requires. The book should model the convention it teaches.
