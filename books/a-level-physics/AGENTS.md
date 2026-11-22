# AGENTS.md — A-level Physics

Read the root `AGENTS.md` and `books/AGENTS.md` first.

## Identity

| | |
|---|---|
| Book id | `a-level-physics` |
| Qualification | A-level |
| Subject | Physics |
| Exam boards | AQA 7407/7408, Pearson Edexcel 9PH0, OCR H556 (Physics A) |
| Tiers | none — no Foundation/Higher axis |
| Profiles | `a-level` (only profile, the default) |

Identity lives in `book.yaml`; change it there, never in a generated file.

## No tier axis

- `book.yaml → tier_axis` is **empty** and stays empty: write it as `{}` with a
  comment, not omitted. No section carries `tier:`; no page declares one.
- `tier` is optional in the curriculum schema here: absent means "belongs to
  every reader", and the tier hook passes the single `a-level` build through
  untouched.
- Never tag a page or section `F` or `H`; never write "Foundation", "Higher",
  "tier F" or "tier H" into content. The booklet widget hides its tier control
  when `meta.tiered: false`.

## Exam boards and papers

Content areas are the DfE's, common to all three boards; assessment structure is
not. A section leaning on a board's paper order must say so, or stay
board-neutral.

| Board | Structure |
|---|---|
| AQA 7407/7408 | Paper 1, Paper 2 each 34%; Paper 3 32%. 7407 is the AS |
| Pearson Edexcel 9PH0 | Paper 1 and Paper 2 each 30%; Paper 3 (General and Practical Principles) 40% |
| OCR H556 | Papers 01 and 02 each 37%; Paper 03 26%; plus the non-exam Practical Endorsement |

- All three require **at least 40% of the marks to be mathematics at Level 2 or
  above** (DfE Appendix 6).
- Read OCR Appendix 5e before writing a quantitative question: it *excludes*
  "simple substitution with little choice of equation or data" and "structured
  question formats using GCSE mathematics" from Level 2.
- AQA's optional topics (3.9 Astrophysics, 3.10 Medical physics, 3.11 Engineering
  physics, 3.12 Turning points in physics, 3.13 Electronics) are **board-specific
  and out of scope** for the common core: state the limit in `curriculum.yaml`,
  the booklet's `meta.note` and the provenance strings, and never add one board's
  option to the common curriculum.

## Required practicals and the Practical Endorsement

- All three boards assess the same **twelve identified practical activities**
  (DfE Appendix 5c); AQA names them "Required practical 1"–"12", Edexcel core
  practicals, OCR Practical Activity Groups PAG1–PAG12.
- Techniques: length, temperature, pressure, force, angle and volume instruments;
  digital instruments including multimeters; accuracy methods (multiple
  oscillations, fiducial marker, set square, plumb line); stopwatch or light
  gates; calipers and micrometers; DC circuits; signal generator and
  oscilloscope; generating and measuring waves; a laser or light source for
  interference and diffraction; ICT modelling and data logging; ionising
  radiation and detectors.
- The **Practical Endorsement is separate and non-exam**: no paper, no
  written-assessment marks.
- At least 15% of written marks assess practical knowledge and skills, so
  uncertainty propagation, graph reading and apparatus choice are assessment
  content.

## Equations and the booklet

**No A-level physics equation is to be memorised; the boards provide the
booklets.** AQA supplies its data-and-formulae insert at all three papers;
Edexcel supplies the printed "List of data, formulae and relationships" and
states that students need not memorise formulae, that listed ones are supplied in
each examination and that any other required formula is given in the question;
OCR prints its data sheet with the papers.

- `given` = **printed on that board's own insert**. AQA's and OCR's print the core
  relationships; Edexcel's omits some, so the booklet marks omitted core
  relationships `question` (supplied in the question, as Edexcel promises) and the
  two definitions the reader must hold (`v = Δs/Δt`, `a = Δv/Δt`) `know`. The
  group says *where* to look, never *whether* to learn it.
- **OCR is the exception that must not be normalised away:** OCR marks some
  equations "Learners will also be expected to recall this equation" *even though
  the data sheet prints them* — `F = ma`, `W = mg`, `E_k = ½mv²`, `E_p = mgh`
  ("and derive it from first principles"), `R = V/I`. Record that in `note`;
  `given` and "expected to recall" are different questions.
- `know` = definitions (newton, emf, stress, strain), SI units and prefixes, the
  meaning of every symbol, and the derivations the specification asks for (AQA:
  equations of motion, kinetic-theory model).
- Record each version and re-verify on reissue: AQA "version 1.5", "from the June
  2017 series onwards"; Edexcel "Issue 3, November 2022"; OCR H556 v3.0, March
  2026.

`booklet/a-level-physics.yaml` is the source of truth; `docs/assets/booklet/booklet.json`
is generated. It transcribes the **core** (the DfE areas common to the three
boards) and the constants; board-only items and AQA's five optional topics are a
**deliberate limit**, stated in `meta.note`, `curriculum.yaml` and the provenance
strings. Read `BOOKLETS.md` before changing provision.

## Curriculum and coverage

- `curriculum.yaml` is the source of truth. `coverage:` declares the reference
  ranges the scaffold checks: a reference with no section fails the build.
- `CURRICULUM-MAP.md` is the generated reverse index — never edit it by hand.
- References (`AP1`–`AP9`) index the nine numbered areas of DfE Appendix 3
  (paragraphs 37–45), in order. The DfE does not number an area's statements, so a
  reference means the whole area: never invent a finer DfE item number.
- Assert no `year` tag: the DfE marks the AS subset in non-bold type, which text
  extraction cannot recover, and the boards' AS/A-level divisions differ.

## Problem banks

Banks live in `problems/`, one per practice set. `book.yaml → oracles` is
`[sympy, units]`: SymPy proves the arithmetic and algebra; units proves
dimensions, significant figures, uncertainty propagation, vector resolution and
values read off a graph. `PROBLEMS.md` is the schema, documenting the nine
physics check kinds (`dimensions`, `convert`, `sigfigs`, `uncertainty`,
`resolve`, `gradient`, `intercept`, `area`, `structured`).

- **Units never enter the CAS string.** Keep units, words and `%` in `statement`;
  a unit is parsed separately into a dimension and an exact factor.
- **The verifier proves arithmetic and dimensions, not physics.** A
  dimensionally consistent, arithmetically correct, physically absurd answer
  passes: never present a passing bank as proof of the physics. That limit is
  documented in `units.py`, and must survive into the prose.
- **Rounding needs an interval, not equality.** Use `sigfigs` or `between` with a
  stated tolerance; a rounded value is never `equivalent`.
- **Say which convention an uncertainty uses.** Round once, half-range; a value
  without a declared rule is an error. Edexcel Appendix 10 is the board's own
  treatment and the right citation for a practical-skills chapter.
- **Graphical calculus is not symbolic differentiation.** DfE C.3.9 asks for rates
  of change solved graphically or by spreadsheet; `diff` proves something the
  qualification does not ask for.
- The GCSE traps in `books/AGENTS.md` still apply (single-quote maths, one value
  to one line).

## Style

- SI units and prefixes (`m s⁻¹`, `N m² kg⁻²`, `J K⁻¹ mol⁻¹`), values to the
  significant figures the data supports, uncertainties as the specification
  requires. Model the convention the book teaches.
