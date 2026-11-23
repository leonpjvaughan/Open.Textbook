# AGENTS.md — A-level Physics

Root and `books/AGENTS.md` first. A-level Physics: AQA 7407/7408, Pearson Edexcel 9PH0, OCR
H556 (Physics A). No tier axis; one profile, `a-level`. Identity is in `book.yaml`.

## No tier axis

- `book.yaml → tier_axis` is **empty** and stays empty: write it as `{}`, not omitted. No
  section carries `tier:`; no page declares one. `tier` is optional here: absent means
  "belongs to every reader", and the tier hook passes the single build through untouched.
- Never write "Foundation", "Higher", "tier F" or "tier H" into content. The booklet widget
  hides its tier control when `meta.tiered: false`.

## Boards, papers and practicals

Content areas are the DfE's, common to all three boards; assessment structure is not. Three
linear papers: AQA 34% + 34% + 32% (7407 is the AS); Edexcel 30% + 30% + 40%; OCR 37% + 37% +
26% plus the non-exam Practical Endorsement. A section leaning on a board's paper order must
say so, or stay board-neutral.

- All three require **at least 40% of the marks to be mathematics at Level 2 or above** (DfE
  Appendix 6). OCR Appendix 5e *excludes* "simple substitution with little choice of equation
  or data" and "structured question formats using GCSE mathematics" from Level 2.
- AQA's optional topics (3.9 Astrophysics, 3.10 Medical physics, 3.11 Engineering physics,
  3.12 Turning points in physics, 3.13 Electronics) are **board-specific and out of scope** for
  the common core: state the limit in `curriculum.yaml`, the booklet's `meta.note` and the
  provenance strings; never add one board's option to the common curriculum.
- All three boards assess the same **twelve identified practical activities** (DfE Appendix
  5c), named differently by each (AQA Required practicals, Edexcel core practicals, OCR
  PAG1–PAG12). The **Practical Endorsement is separate and non-exam**: no paper, no
  written-assessment marks. At least 15% of written marks assess practical knowledge and
  skills, so uncertainty propagation, graph reading and apparatus choice are assessment
  content.

## Equations and the booklet

**No A-level physics equation is to be memorised; the boards provide the booklets.** AQA
supplies its data-and-formulae insert at all three papers; Edexcel supplies the printed "List
of data, formulae and relationships" and states that any other required formula is given in
the question; OCR prints its data sheet with the papers.

- `given` = **printed on that board's own insert**. Edexcel's insert omits some core
  relationships: mark an omitted one `question` (supplied in the question, as Edexcel
  promises) and the two definitions the reader must hold (`v = Δs/Δt`, `a = Δv/Δt`) `know`.
  The group says *where* to look, never *whether* to learn it.
- **OCR is the exception that must not be normalised away:** it marks some equations
  "Learners will also be expected to recall this equation" *even though the data sheet prints
  them* — `F = ma`, `W = mg`, `E_k = ½mv²`, `E_p = mgh` ("and derive it from first
  principles"), `R = V/I`. Record that in `note`; `given` and "expected to recall" are
  different questions.
- `know` = definitions (newton, emf, stress, strain), SI units and prefixes, the meaning of
  every symbol, and the derivations the specification asks for (AQA: equations of motion,
  kinetic-theory model).
- Record each document version in `sources.yaml` and re-verify on reissue.

`booklet/a-level-physics.yaml` is the source of truth; `docs/assets/booklet/booklet.json` is
generated. It transcribes the **core** and the constants; board-only items and AQA's five
optional topics are a **deliberate limit**, stated in `meta.note`, `curriculum.yaml` and the
provenance strings. Read `BOOKLETS.md` before changing provision.

## Curriculum and coverage

- `curriculum.yaml` is the source of truth. `coverage:` declares the reference ranges the
  scaffold checks: a reference with no section fails the build. `CURRICULUM-MAP.md` is
  generated — never edit it.
- References (`AP1`–`AP9`) index the nine numbered areas of DfE Appendix 3 (paragraphs
  37–45). The DfE does not number an area's statements, so a reference means the whole area:
  never invent a finer DfE item number.
- Assert no `year` tag: the DfE marks the AS subset in non-bold type, which text extraction
  cannot recover, and the boards' divisions differ.

## Problem banks

Banks live in `problems/`, one per practice set; the physics rules in `books/AGENTS.md`
apply. The deltas here:

- **Graphical calculus is not symbolic differentiation.** DfE C.3.9 asks for rates of change
  solved graphically or by spreadsheet; `diff` proves something the qualification does not ask
  for.
- Edexcel Appendix 10 is the board's own treatment of uncertainty and the right citation for a
  practical-skills chapter.

## Style

SI units and prefixes (`m s⁻¹`, `N m² kg⁻²`, `J K⁻¹ mol⁻¹`), values to the significant figures
the data supports, uncertainties as the specification requires.
