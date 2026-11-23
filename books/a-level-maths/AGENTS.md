# AGENTS.md — A-level Mathematics

Root and `books/AGENTS.md` first. A-level Mathematics: AQA 7357, Pearson Edexcel 9MA0, OCR
H230/H240. No tier axis; one profile, `a-level`. Identity is declared in `book.yaml`.

## No tier axis

- `book.yaml → tier_axis` is **empty** and must stay empty. No section carries `tier:` and no
  page declares one; `tier` is optional in the curriculum schema for exactly this case.
- Do not write "Foundation", "Higher", "tier F" or "tier H" into content. The A-level reader
  must never meet the GCSE tier vocabulary.
- The progression axis is **AS (Year 1) versus the full A level (Year 2)**, recorded as
  `year: 1|2`, a planning aid the scaffold does not read. A Year 2 section may assume the
  Year 1 ones.

## Papers

Three linear papers, each 2 hours, 100 marks, 33⅓%. AQA 7357: Pure; Pure + Mechanics (J,
P–S); Pure + Statistics (K–O). Edexcel 9MA0: Pure 1; Pure 2; Statistics and Mechanics. OCR
H240: Pure; Pure + Statistics; Pure + Mechanics. AQA and OCR swap the applied papers;
Edexcel puts both on Paper 3. Pure may also be examined on the applied papers, and on Edexcel
pure is assumed knowledge for Paper 3. Vectors are Pure on Edexcel and OCR and sit with
mechanics on AQA. A section that leans on a board's paper order must say so or stay
board-neutral.

The assessment objectives are identical across boards: **AO1 50%, AO2 25%, AO3 25%**; the
applied paper carries more AO3, and AO2 is where proof and reasoning live. The **Large Data
Set** is board-specific: keep statistics chapters **LDS-agnostic** until the board's own
document is retrieved and recorded, and never invent a dataset name.

## Curriculum and coverage

`curriculum.yaml` is the source of truth for chapters, sections, the AS/A-level year and
references. `coverage:` declares the DfE strand item counts the scaffold checks; a reference
with no section fails the build. `CURRICULUM-MAP.md` is generated — never edit it.

References are the DfE strand letter and item number from *Mathematics: AS and A level
content* (DFE-00706-2014); the full strand list, A–S and `OT1`–`OT3`, is in
`curriculum.yaml`. AQA 7357 uses the same labels; OCR and Edexcel map their content to them.

The content is common DfE content, so the chapter sequence is board-neutral. There is no
optional content: the DfE says the detailed content "represents 100% of the content", so a
coverage gap is a defect, not a choice.

## Problem banks

Banks live in `problems/`, one per practice set, and every record is verified by the SymPy
oracle in CI. `PROBLEMS.md` is the schema; its **Beyond GCSE: calculus and statistics**
section is this book's vocabulary. These are particular to A level:

- **A step that is not an equivalence declares it.** Differentiating, integrating,
  substituting and solving are `relation: apply` with the operation named.
- **Indefinite integrals are free in the constant** — verify by differentiation, not equality.
  `dsolve` and `rsolve` are the same: verify by substitution or against an initial condition.
- **Set answers are sets.** An inequality answer is an `Interval`, `Union` or `Complement`,
  and a closed end where the chain was open must fail. A `ConditionSet` is *unknown*, not
  wrong.
- **Name the statistics convention.** `std`, `variance`, `quartile1`, `quartile3`, `iqr` and
  `percentile` disagree between methods, so a value without
  `convention: sample|population` or `linear|nearest_rank|exclusive|inclusive` is an error.
- **Decimals need an interval, not equality.** The trapezium rule, Newton–Raphson and normal
  probabilities are `approx` checks with a stated tolerance.
- **The verifier proves the algebra, not the argument.** Proof structure and method choice,
  "show that" reasoning, graph reading, modelling assumptions and refinement, sampling
  critique and data-cleaning judgement are human review.

## Booklet

**None yet, and deliberately.** A booklet is built from the awarding body's own document
(`BOOKLETS.md`), and no board's A-level Mathematics formulae booklet has been retrieved and
checked. When one is, record it in `sources.yaml` under `references` with a `url`, `retrieved`
date and `role`, then write `booklet/a-level-maths.yaml` and add `booklet:` to `book.yaml`.

The DfE **Appendix B** lists the formulae a student must recall — that is the `know` group,
not the booklet. The board's booklet is the separate document of what is *given*.
