# AGENTS.md — A-level Mathematics

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
| Book id | `a-level-maths` |
| Qualification | A-level |
| Subject | Mathematics |
| Exam boards | AQA 7357, Pearson Edexcel 9MA0, OCR H230/H240 |
| Tiers | none — A-level has no Foundation/Higher axis |
| Profiles | `a-level` (the only profile, and the default) |

Declared in `book.yaml`. Change the identity there, not in the generated files.

## No tier axis

- `book.yaml → tier_axis` is **empty** and must stay empty. There is no F/H
  distinction to label, so no section carries `tier:` and no page declares one.
- `tier` is optional in the curriculum schema for exactly this case. Absent means
  "belongs to every reader of this book"; the tier hook passes the single `a-level`
  build through untouched.
- Do not tag pages or sections `F` or `H`, and do not write "Foundation",
  "Higher", "tier F" or "tier H" into content. The reader of an A-level book must
  never meet the GCSE tier vocabulary.
- The progression axis is **AS (Year 1) versus the full A level (Year 2)**. Each
  section records it as `year: 1|2`, a planning aid the scaffold does not read.
  Use it when sequencing chapters: a Year 2 section may assume the Year 1 ones.

## Exam boards and paper structure

All three boards build **three externally examined papers, each 2 hours and 100
marks, each 33⅓%**, and all are linear. They differ in where mechanics and
statistics sit:

| Board | Paper 1 | Paper 2 | Paper 3 |
|---|---|---|---|
| AQA 7357 | Pure | Pure **+ Mechanics** (J, P–S) | Pure **+ Statistics** (K–O) |
| Pearson Edexcel 9MA0 | Pure Mathematics 1 | Pure Mathematics 2 | **Statistics and Mechanics** |
| OCR H240 | Pure | Pure **+ Statistics** | Pure **+ Mechanics** |

So AQA and OCR swap the applied papers, and Edexcel puts both on Paper 3. On AQA
and Edexcel, pure content may also be examined on the applied papers; on Edexcel,
pure is assumed knowledge for Paper 3. Vectors are Pure on Edexcel and OCR and sit
with mechanics on AQA. A section that leans on a board's paper order must say so
or stay board-neutral.

The assessment objectives are the regulator's and identical across boards: **AO1
50%, AO2 25%, AO3 25%** at A level. The applied paper carries more AO3. AO2 is
where proof and reasoning live, which is why proof gets chapters of its own and is
returned to in Review.

The **Large Data Set** is board-specific. The DfE requires familiarity with one,
but each board names its own and the period it is set for. Only OCR's is named by a
reachable primary source here; AQA's and Edexcel's are not. Keep statistics
chapters **LDS-agnostic** until the board's own document is retrieved and recorded,
and never invent a dataset name. See `research/curriculum/a-level-maths.md` §6 and
§9.

## Curriculum and coverage

`curriculum.yaml` is the source of truth for chapters, sections, the AS/A-level
year and curriculum references. `coverage:` declares the DfE strand item counts
the scaffold checks; a reference with no section fails the build.
`CURRICULUM-MAP.md` is the generated reverse index — never edit it by hand.

Curriculum references are the DfE strand letter and item number from *Mathematics:
AS and A level content* (DFE-00706-2014): A Proof, B Algebra and functions,
C Coordinate geometry in the (x, y) plane, D Sequences and series, E Trigonometry,
F Exponentials and logarithms, G Differentiation, H Integration, I Numerical
methods, J Vectors, K Statistical sampling, L Data presentation and interpretation,
M Probability, N Statistical distributions, O Statistical hypothesis testing,
P Quantities and units in mechanics, Q Kinematics, R Forces and Newton's laws,
S Moments. `OT1`–`OT3` are the DfE's overarching themes: mathematical argument and
proof, problem solving, and modelling. AQA 7357 uses the same labels; OCR H240 and
Pearson Edexcel 9MA0 map their content to them.

The content is common DfE content, so the chapter sequence is board-neutral. There
is no optional content: the DfE says the detailed content "represents 100% of the
content", so a coverage gap is a defect, not a choice.

## Problem banks

Banks live in `problems/`, one per practice set, and every record is verified by
the SymPy oracle when CI runs. `PROBLEMS.md` is the schema; its **Beyond GCSE:
calculus and statistics** section is this book's vocabulary. The GCSE traps still
apply (`books/AGENTS.md`: single-quote maths, one value to one line), and these are
particular to A level:

- **A step that is not an equivalence declares it.** Differentiating, integrating,
  substituting and solving are `relation: apply` with the operation named. Faking
  calculus as `equivalent` hides a real error class.
- **Indefinite integrals are free in the constant** — verify by differentiation, not
  by equality. `dsolve` and `rsolve` are the same: verify by substitution or against
  an initial condition.
- **Set answers are sets.** An inequality answer is an `Interval`, `Union` or
  `Complement`, and a closed end where the chain was open must fail. A `ConditionSet`
  is *unknown*, not wrong.
- **Name the statistics convention.** `std`, `variance`, `quartile1`, `quartile3`,
  `iqr` and `percentile` disagree between methods, so a value without
  `convention: sample|population` or `linear|nearest_rank|exclusive|inclusive` is an
  error.
- **Decimals need an interval, not equality.** The trapezium rule, Newton–Raphson
  and normal probabilities are `approx` checks with a stated tolerance.
- **The verifier proves the algebra, not the argument.** Proof structure and the
  choice of proof method, "show that" reasoning, graph reading, modelling
  assumptions and refinement, sampling critique and data-cleaning judgement are
  human review. Do not write a bank that pretends otherwise.

## Booklet

**None yet, and deliberately.** A-level Mathematics has a formulae booklet plus a
statistical tables section, so this book should have one. But a booklet must be
built from the awarding body's own document (`BOOKLETS.md`), and no board's A-level
Mathematics formulae booklet has been retrieved and checked. Declaring no booklet
was the only honest choice; the work is recorded as outstanding in `.agents/todo.md`. When
it is retrieved, record it in `sources.yaml` under `references` with a `url`,
`retrieved` date and `role`, then write `booklet/a-level-maths.yaml` and add
`booklet:` to `book.yaml`.

Note that the DfE **Appendix B** lists the formulae a student must recall — that is
the `know` group, not the booklet. The board's booklet is the separate document of
what is *given*; do not build one from the other.

## Style

- Theming belongs to the reader: bundles in `themes/` are the reading experience and
  apply to every book. This book contributes only its **subject tint** through
  `book.yaml → theme`, which bundles compose in. Do not add surfaces or fonts here.
- `assets/stylesheets/extra.css` and `themes.css` are shared with every other book.
  Do not fork either; set the tint in `book.yaml → theme`, or add a component rule to
  `book-local.css`.
- Figures use the `fig-*` classes and `--tb-fig-*` variables, never hard-coded
  colours, so they adapt to dark mode.
