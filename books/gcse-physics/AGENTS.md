# AGENTS.md — GCSE Physics

`gcse-physics`: GCSE Physics, the **separate-science** award — combined science has
its own equation sheets, so its own booklet and curriculum. Boards: AQA 8463,
Pearson Edexcel 1PH0, OCR J249 (Physics A), J259 (Physics B). Tiers: Foundation,
Higher; profiles `higher` (default), `foundation`.

## Tiers — physics is not mathematics

DfE:

> Higher tier GCSE physics specifications must assess all the content set out
> below, whether it is underlined or is not underlined. Foundation tier GCSE
> physics specifications must assess all the content set out below, except for
> content which is underlined.

Same shape as mathematics — Higher a superset, `tier: F` "Foundation and Higher",
`tier: H` "Higher only" — different split: never copy a mathematics tag, never
reason from its strand columns.

- **The marker is an underline** on single statements, not a column, so tiers
  interleave and a DfE heading can be mixed.
- **Boards re-express it**: AQA `(HT only)`, Edexcel and OCR bold. Tag sections
  against **AQA 8463**'s `(HT only)` columns, as mathematics tags against AQA
  8300; where AQA is silent take the Foundation-inclusive reading, recorded in
  `sources.yaml`.
- **`(physics only)` is not `(HT only)`**: physics-only content is this book's at
  **both** tiers; space physics is physics-only but `tier: F`.

`tier: H` only where AQA marks the **whole** section HT-only: `3.4 Momentum`,
`4.2 Sound waves and waves for detection and exploration`, `7.3 Induced potential,
transformers and the national grid`, `7.4 Microphones and speakers`. A mixed
section is `tier: F`, its Higher-only statements in
`<!-- tier:h -->…<!-- /tier:h -->`.

Weight the 30% mathematics requirement **at the tier**: Ofqual's Level-of-Demand
floor is Key Stage 3 (Foundation), Foundation GCSE Mathematics (Higher).

## Boards and practicals

**Two papers, 50% each**, linear: AQA 8463 1–2; Edexcel 1PH0 1–2; OCR J249
Foundation /01 and /02, Higher /03 and /04, with /02 and /04 synoptic. Higher and
Foundation readers sit different papers; syllabus order is not DfE topic order.

Practicals are **per board**; never present one board's list as the
qualification's:

| Board | Requirement |
|---|---|
| AQA 8463 | **Ten** numbered practicals; two physics-only (thermal insulators, reflection and refraction) |
| Edexcel 1PH0 | **Eight** mandatory core practicals: 2.19, 4.17, 5.9, 5.19P, 10.17, 14.3, 14.11, 15.6 |
| OCR J249/J259 | **No numbered list**; 15% practical content through the P9 practical-skills topic and apparatus-and-techniques requirements |

AQA's ten: specific heat capacity; thermal insulators (physics only); resistance
and I–V; series and parallel circuits; density; force–extension; force and
acceleration; wave speed; reflection and refraction (physics only); infrared
absorption and radiation.

## Equations and booklet

**Equations are given, not recalled** for the lifetime of the specifications: the
boards keep providing the sheets, and may not set questions answerable solely by
transferring information from them.

- Never teach "you must learn this equation"; teach **which** applies and **how**
  to use it.
- `know` holds units, prefixes, symbols, definitions and typical values the
  specification requires recalled (AQA's walking/running/cycling speeds, speed of
  sound in air) — never "equations to memorise".
- Recall/select appendices (AQA Appendix A, Edexcel Appendix 2, OCR Appendix 5d)
  **predate the 2022 policy and are stale**: use the boards' equation sheets.
- Boards **differ and must not be normalised**: AQA prints period and
  magnification; Edexcel `v = x/t` and `E = I × V × t`; OCR density, efficiency in
  words only. Keep each board's wording and symbols; the selector chooses.

`booklet/gcse-physics.yaml` is the source of truth;
`docs/assets/booklet/booklet.json` is generated. Record provision changes in
`sources.yaml` with document and date.

## Curriculum

`coverage:` declares the reference ranges the scaffold checks; an unmapped
reference fails the build.

DfE content is an **unnumbered** bullet list, so references (`EN1`, `FO5`, …)
index this book's DfE topic headings in the document's order; mapping atop
`curriculum.yaml`, provenance in `sources.yaml`. Never invent a DfE item number.

## Problem banks

One bank per practice set in `problems/`. `book.yaml → oracles` is `[sympy, units]`:
SymPy proves arithmetic and algebra, units dimensions, significant figures,
uncertainty propagation, vector resolution and graph read-off. Nine physics check
kinds: `dimensions`, `convert`, `sigfigs`, `uncertainty`, `resolve`, `gradient`,
`intercept`, `area`, `structured`.

- **Units never enter the CAS string**: keep units, words and `%` in `statement`;
  a unit parses separately into a dimension and an exact factor.
- **The verifier proves arithmetic and dimensions, not physics**: a dimensionally
  consistent, physically absurd answer passes. Never present a passing bank as
  proof of the physics; `units.py` states the limit, which must survive into the
  prose.
- **Rounding needs an interval, not equality**: `sigfigs` or `between` with a
  stated tolerance; a rounded value is never `equivalent`.
- **Declare the uncertainty convention**: round once, half-range; a value without
  a stated rule is an error.
- Bank traps in `books/AGENTS.md` apply (single-quote maths, one value per line).

## Style

SI units and the degree sign correct (`m/s` or `m s⁻¹`, `°C`), UK English (`metre`,
`kilogram`), values to the significant figures the data supports.
