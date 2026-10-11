# AGENTS.md — GCSE Physics

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
| Book id | `gcse-physics` |
| Qualification | GCSE |
| Subject | Physics |
| Exam boards | AQA 8463, Pearson Edexcel 1PH0, OCR J249 (Physics A) and J259 (Physics B) |
| Tiers | Foundation and Higher |
| Profiles | `higher` (default), `foundation` |

Declared in `book.yaml`. Change the identity there, not in the generated files.
This is the **separate-science** GCSE Physics award. The combined-science awards
share most of the content but have their own equation sheets, so a
combined-science book would need its own booklet and its own curriculum.

## The tier story — physics is not mathematics

The DfE statement, quoted in full in `research/curriculum/physics.md` §1:

> Higher tier GCSE physics specifications must assess all the content set out
> below, whether it is underlined or is not underlined. Foundation tier GCSE
> physics specifications must assess all the content set out below, except for
> content which is underlined.

So the **shape** is the same as mathematics — Higher is a superset of Foundation,
`tier: F` means "Foundation and Higher" and `tier: H` means "Higher only" — but
the **split is not the mathematics one**. Do not copy a tag from the mathematics
book, and do not reason from the mathematics strand columns. Three things differ:

- **The marker is an underline**, on individual statements, not a
  Foundation/Higher column. Content of both tiers is interleaved inside a topic,
  so a DfE heading can be mixed.
- **The boards re-express it differently.** AQA marks `(HT only)`; Edexcel and
  OCR use bold type. Tag every section against **AQA 8463**'s `(HT only)`
  columns, as the mathematics book tags against AQA 8300. When AQA is silent,
  take the stricter (Foundation-inclusive) reading and say so in `sources.yaml`.
- **`(physics only)` is not `(HT only)`.** Physics-only content belongs to this
  separate-science book at **both** tiers. Space physics is physics-only but is
  not Higher-only, so it is `tier: F` here.

In `curriculum.yaml` a section is `tier: H` only where AQA marks the **whole**
section HT-only: currently `3.4 Momentum`, `4.2 Sound waves and waves for
detection and exploration`, `7.3 Induced potential, transformers and the national
grid`, and `7.4 Microphones and speakers`. A mixed section is `tier: F`, and when
it is authored its Higher-only statements are wrapped in
`<!-- tier:h -->…<!-- /tier:h -->`. A plain markdown link from an `F` page to an
`H` page breaks the Foundation strict build; use the span for in-page content.

The 30% mathematics weighting is the regulator's, and it is counted **at the
appropriate tier**: Ofqual's Level-of-Demand floor is Key Stage 3 for Foundation
and Foundation GCSE Mathematics for Higher, so the quantitative work in the two
books is genuinely different, not the same work made easier.

## Exam boards and required practicals

All three boards assess GCSE Physics with **two papers, 50% each**, linear.
AQA 8463 is Paper 1 and Paper 2; Edexcel 1PH0 is Paper 1 and Paper 2; OCR J249 is
Foundation J249/01 and J249/02 or Higher J249/03 and J249/04, with J249/02 and
J249/04 synoptic. So a **Higher and a Foundation reader sit different papers**,
and a board's syllabus order is not the DfE topic order.

Required practicals are **per board**, and the counts differ. Do not present one
board's list as if it were the qualification's:

| Board | Requirement |
|---|---|
| AQA 8463 | **Ten** required practicals, numbered; two are physics-only (thermal insulators, reflection and refraction) |
| Edexcel 1PH0 | **Eight** mandatory core practicals, at 2.19, 4.17, 5.9, 5.19P, 10.17, 14.3, 14.11, 15.6 |
| OCR J249/J259 | **No numbered list**; the 15% practical content is assessed through the P9 practical-skills topic and the apparatus-and-techniques requirements |

The AQA ten are: specific heat capacity; thermal insulators (physics only);
resistance and I–V characteristics; series and parallel circuits; density;
force–extension of a spring; force and acceleration; wave speed measurement;
reflection and refraction (physics only); infrared absorption and radiation.

## Equations and the booklet

**For the current specifications, equations are given, not recalled.** DfE
confirmed on 26 February 2026 that students do not need to memorise equations for
GCSE physics for the lifetime of the current specifications, and Ofqual's
5 May 2026 decision requires boards to keep providing the sheets and forbids
questions answerable solely by transferring information from them. So:

- Do **not** teach "you must learn this equation". Teach **which** equation
  applies and **how** to use it. Exams may not ask a question that copying an
  equation off the sheet would answer.
- A `know` group of "equations to memorise" would be wrong. The `know` group in
  the booklet is units, prefixes, symbols, definitions, and the typical values
  the specification says must be recalled (AQA's walking/running/cycling speeds
  and the speed of sound in air are the only board-stated GCSE example found).
- The recall/select appendices in every specification (AQA Appendix A, Edexcel
  Appendix 2, OCR Appendix 5d) **predate the 2022 policy and are stale**. Use the
  boards' equation sheets, never the specification appendices, for provision.
- The boards **differ and must not be normalised**: AQA prints period and
  magnification; Edexcel prints wave speed `v = x/t` and
  `E = I × V × t`; OCR prints density explicitly and writes efficiency in words
  only. The booklet keeps each board's own wording and symbols and lets the board
  selector choose.

`booklet/gcse-physics.yaml` is the source of truth; `docs/assets/booklet/booklet.json`
is generated. Read `BOOKLETS.md` and `research/curriculum/physics-equations-and-data.md`
before changing provision, and record any change in `sources.yaml` with the
document and date.

## Curriculum and coverage

`curriculum.yaml` is the source of truth for chapters, sections, tier and
curriculum references. `coverage:` declares the reference ranges the scaffold
checks; a reference with no section fails the build. `CURRICULUM-MAP.md` is the
generated reverse index — never edit it by hand.

The DfE physics content is an **unnumbered** bullet list, so the references
(`EN1`, `FO5`, …) are this book's index of the DfE's named topic headings, in the
DfE document's own order. The mapping is stated at the top of `curriculum.yaml`
and the provenance is in `sources.yaml`. Do not invent a DfE item number as if
the document printed one.

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
  without a declared rule is an error.
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
- Write SI units and the degree sign correctly (`m/s` or `m s⁻¹`, `°C`), use UK
  English (`metre`, `kilogram`), and give values to the number of significant
  figures the data supports — the book should model the convention it teaches.
