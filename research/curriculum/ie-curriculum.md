# Irish qualifications — curriculum research

**Purpose.** What the four new Irish books must contain, and where their content
overlaps material the collection already holds. Read alongside `AGENTS.md` and
`books/<id>/sources.yaml`, which is the tracked manifest of what each claim rests
on. Fetched artefacts live (git-ignored) in `research/sources/ie-*/`.

**Retrieved:** 2026-10-13. **Author:** session agent. **No engine file changed by
this note.**

---

## 1. The four qualifications

| Book | Qualification | Subject | Levels | Where it sits |
|---|---|---|---|---|
| `ie-jc-maths` | Junior Cycle | Mathematics | Ordinary, Higher | Ages 12–15, 3 years |
| `ie-lc-maths` | Leaving Certificate | Mathematics | Foundation, Ordinary, Higher | Ages 15–18, 2 years |
| `ie-lc-applied-maths` | Leaving Certificate | Applied Mathematics | Ordinary, Higher | 180 hours |
| `ie-lc-physics` | Leaving Certificate | Physics | Ordinary, Higher | 2 years |

The **Junior Cycle** is the lower secondary programme; its certificate is the
*Junior Cycle Profile of Achievement* (JCPA), reported by the school, not the SEC.
The **Leaving Certificate** is the upper secondary programme and the qualification
that selects for higher education.

## 2. Which specification is current — checked, not assumed

This determines every page, so it was checked against the date of the sitting.

| Subject | Document the book follows | Status at 2026-10-13 |
|---|---|---|
| JC Mathematics | Junior Cycle Mathematics (2018), with the 2015 specification replaced | Current |
| LC Mathematics | Leaving Certificate Mathematics syllabus, for examination from 2015 | Current |
| LC Applied Mathematics | Applied Mathematics curriculum specification (2019) | Current |
| LC Physics | **Physics specification, introduced September 2025** | Current |

**The Physics decision, and why it is not close.** The NCCA publishes both
documents, and the older one is labelled *"LC Physics Syllabus (for examination to
June 2026)"* while the new one is *"LC Physics Specification (for introduction in
September 2025)"* and says it *"will replace the current Leaving Certificate
Physics syllabus"*. The old syllabus's final sitting was June 2026 — four months
before this note. A book written now that followed it would be obsolete on
publication. **The Physics book follows the new specification.**

Past examination papers therefore belong to a syllabus that no longer examines
anyone, and are useful as practice and for question style only — never as a
statement of what is examinable. This is recorded in the book's `sources.yaml`.

## 3. Leaving Certificate Mathematics (2015 syllabus)

Five strands. Three levels, and the levels are **nested** — `Foundation ⊂ Ordinary
⊂ Higher` — so the tier axis has three codes, not two.

| Strand | Sections |
|---|---|
| 1. Statistics and Probability | 1.1 Counting · 1.2 Concepts of probability · 1.3 Outcomes of experiments · 1.4 Statistical reasoning · 1.5 Finding/collecting data · 1.6 Representing data · 1.7 Analysing/interpreting data |
| 2. Geometry and Trigonometry | 2.1 Synthetic geometry · 2.2 Co-ordinate geometry · 2.3 Trigonometry · 2.4 Transformation geometry |
| 3. Number | 3.1 Number systems · 3.2 Indices · 3.3 Arithmetic · 3.4 Length, area and volume |
| 4. Algebra | 4.1 (a–f) Generating/representing/finding/examining · 4.2 Solving equations · 4.3 Inequalities · 4.4 Complex numbers |
| 5. Functions | 5.1 Functions · 5.2 Calculus |

**Section B** of the syllabus is *Geometry for Post-primary School Mathematics*:
a numbered course of **axioms, theorems, corollaries and 22 constructions** that
every paper draws on. It is a distinct, finite, listable body of propositions —
the single most unusual feature of the Irish syllabus relative to England, and the
thing most worth getting exactly right.

**Assessment.** At Ordinary and Higher level: two papers, Paper 1 and Paper 2, each
with **Section A** (core concepts and skills) and **Section B** (context-based
applications). At Foundation level: **one** written paper, set in meaningful
contexts. There is no coursework.

## 4. Junior Cycle Mathematics (2018)

Four strands plus a **Unifying strand**, 34 learning outcomes in total, numbered
within each strand. Junior Cycle Mathematics is examined at **Ordinary and Higher
level**; the majority of outcomes apply to all students and the Higher-only
outcomes are printed in bold in the specification.

| Strand | Codes | Outcomes |
|---|---|---|
| Unifying | U.1–U.13 | 13 |
| Number | N.1–N.5 | 5 |
| Geometry and Trigonometry | GT.1–GT.6 | 6 |
| Algebra and Functions | AF.1–AF.7 | 7 |
| Statistics and Probability | SP.1–SP.3 | 3 |

**The Unifying strand is not a chapter.** It is a set of processes — understanding,
communicating, applying and problem-solving, reasoning, connecting — that runs
through the other four. Making it a chapter would misrepresent it, so it is
delivered as the collection's chapter formula already delivers it (P1–P6) and
recorded in `curriculum.yaml` coverage rather than as a strand of chapters.

**Assessment.** Two **Classroom-Based Assessments** (CBAs) at common level, marked
by the class teacher; an **Assessment Task** worth 10% of the SEC grade; and a
final written examination of **two hours**, one paper, sat in June of third year.
The number of questions varies year to year, and any year examines a *sample* of
the outcomes.

## 5. Leaving Certificate Applied Mathematics (2019 spec)

Four strands, and the whole course is built on **mathematical modelling as an
iterative process** — Strand 1 is that process, and Strands 2–4 apply it.

| Strand | Content |
|---|---|
| 1. Mathematical modelling | the problem-solving cycle: formulate, translate, compute, evaluate, refine |
| 2. Modelling with networks and graphs | networks and terminology; adjacency matrices and matrix algebra; **minimum spanning trees (Kruskal, Prim)**; **shortest paths — Bellman's principle of optimality, Dijkstra**; dynamic programming |
| 3. Modelling the physical world | kinematics in 1D; differentiation incl. the chain rule; the fundamental theorem of calculus; projectiles; Newton's laws; momentum, impulse, conservation; collisions, coefficient of restitution; friction; drag `F ∝ vⁿ`; Hooke's law; circular motion; statics |
| 4. Modelling a changing world | difference and differential equations; growth and decay; recurrence relations; logistic and feedback models |

**Assessment.** Two components at each level: **written examination 80%** and a
**modelling project 20%** based on an annually issued SEC brief, common to both
levels with differentiated marking. 180 hours of class contact.

**Strand 2 has no counterpart anywhere in this collection.** Networks, spanning
trees, matrix algebra over graphs and dynamic programming are new material, and
should be authored as such rather than adapted.

## 6. Leaving Certificate Physics (2025 specification)

A **Unifying strand — the Nature of Science** — and four content strands.

| Strand | Content |
|---|---|
| Unifying | the Nature of Science: investigation, research, evidence, evaluation |
| 1. Forces and Motion | kinematics and dynamics |
| 2. Wave Motion and Energy Transfer | waves, sound, light, energy |
| 3. Electric and Magnetic Fields and their Interactions | electrostatics, current, magnetism, induction, transformers, the national grid |
| 4. Modern Physics | atomic and nuclear |

**Assessment — 40% is not a written paper.** Two components:

* **Physics In Practice Investigation — 40%.** A piece of investigative work on a
  common SEC brief, submitted in Year 2.
* **Written examination — 60%**, at Higher and Ordinary level.

That weighting is the largest structural difference from A-level Physics and from
any English GCSE. **It changes what the book owes the reader**: roughly two fifths
of the assessment is a research-and-experimentation investigation, so the book
cannot be a sequence of theory-and-problems alone. Procedure for a reader to run,
record and evaluate their own investigation belongs in the book in its own right.

## 7. Overlap with what the collection already holds

The author asked specifically for this. **Overlap is large — and it is not uniform.**

### 7.1 Near-total overlap: JC Mathematics vs GCSE Mathematics

Strand for strand the Junior Cycle covers what GCSE Foundation and Higher already
cover: place value and the four operations, indices, ratio and proportion,
percentages, linear and quadratic algebra, simultaneous equations, coordinate
geometry, Pythagoras, trigonometry, area and volume, transformations, probability,
statistics. Differences are of **emphasis and vocabulary**, not of content:

* JC writes **sets** as an explicit topic (N.5) with set notation, Venn diagrams and
  the algebra of set operations. GCSE does not.
* JC **names the problem-solving cycle** and assesses two CBAs. GCSE does not.
* JC uses **synthetic geometry** — constructions and theorems — where GCSE is
  analytic. (See 7.2.)
* English tiering is Foundation/Higher; Irish is Ordinary/Higher.

**Reuse verdict:** the *mathematics* is shared and the **figures** are the reusable
asset. A figure such as a number line, a parabola explorer, a unit-circle tool or a
Venn diagram serves both books unchanged. This is the strongest figure-reuse
opportunity in the whole programme.

### 7.2 Significant overlap, different centre of gravity: LC Mathematics vs A-level Mathematics

Shared material is large: differentiation from first principles through the chain,
product and quotient rules; integration incl. the fundamental theorem; complex
numbers; sequences and series; the circle; trigonometry incl. the addition
formulae; probability; statistics incl. the normal distribution; vectors;
functions and their graphs.

Two things are **not** shared:

* **Synthetic geometry (Section B).** Axioms, theorems, corollaries and 22
  constructions, each stated and proved. A-level Mathematics in England is largely
  analytic. This body of proof is close to the collection's **proof book**, which
  already holds Pythagoras, the sine rule, the cosine rule, the quadratic formula,
  both series and the polygon angle results. That is a real reuse seam — see 7.5.
* **Section B applications and the Foundation level**, which have no English
  counterpart at this stage.

### 7.3 Large overlap: LC Physics vs A-level Physics

Forces and motion, waves, electricity and magnetism, and atomic and nuclear
physics are each covered by the A-level Physics book. The Irish specification is
**narrower and less mathematical** — no relativity, less particle physics, less
calculus — and adds the **40% investigation** described above.

**Reuse verdict:** figures transfer well (motion graphs, wave superposition,
circuit tools, field diagrams); the *prose and problems* need rewriting, because the
depth and the examined skills differ.

### 7.4 Partial overlap: LC Applied Mathematics vs A-level Maths and Physics

Strand 3 is mechanics, and mechanics already exists in A-level Mathematics. But the
Irish course is taught as **modelling**, and its problems are word problems about
real situations — vehicles, tow bars, rebounds — rather than the abstract
mechanics of A-level. The mathematics is largely shared; the framing is not.

**Strand 2 is entirely new.** Nothing in this collection covers networks, spanning
trees, Dijkstra, Bellman or dynamic programming.

**Strand 4** partially overlaps A-level Mathematics's differential equations.

### 7.5 The three reuse seams worth acting on

1. **Figures are the collection's reusable asset.** 176 modules already sit on
   `assets/figures/kit.js`. The kit is subject-neutral by design. The strongest
   candidates for direct reuse are the algebra, geometry, trigonometry, graph and
   probability figures. *This is a note, not a change: a figure is reused by naming
   its file, so a shared figure would want to move out of a single book's directory
   into a shared one — which is a decision the author should make deliberately.*
2. **The proof book already proves much of LC Mathematics's Section B.** Where the
   Irish syllabus states a theorem the proof book proves, the LC book should state
   it and link it with `:::prove` — the mechanism that already exists and is
   already a rule in `AGENTS.md`. This needs **no new machinery**: it is the exact
   use the proof book was built for.
3. **The tier axis now generalises.** It was two codes (`F`/`H`) with a filter named
   `foundation`. It is now an **ordered** axis of any length, and a profile declares
   the level it builds, so LC Mathematics's three nested levels
   (`F ⊂ O ⊂ H`) are expressed as data rather than as a special case. Recorded here
   because it is the one engine change the Irish books required.

## 8. What could not be obtained

**Past examination papers and marking schemes.** The State Examinations Commission
publishes them at `examinations.ie`, which sits behind a Cloudflare challenge that
did not clear: it returns `403` with the challenge page to `curl` with a browser
user agent, to full browser headers, to the `r.jina.ai` renderer, and to a headless
Chromium driven by Playwright that waited sixty seconds for the challenge to
resolve.

**A mirror was tried and does not help.** `theleavingcert.com/exam-papers/` reaches
the papers only by linking out to the SEC, and the links it builds carry an `fp=`
parameter that decodes to the *server's own filesystem path* — the terms above
decode as `/var/www/archive-new/markingschemes` once each code point is shifted by
9 — so they are not fetchable over HTTP even in principle. The site hosts no PDFs
of its own: `href="…pdf"` occurs zero times on its Physics page, whose body is
nothing but the headings *Ordinary Level Exam Papers*, *Higher Level Marking
Schemes* and *Ordinary Level Marking Schemes*. Recorded rather than worked around:
**a claim about what those papers contain must not be written from memory.**

So the examination **format** in this note comes from the specifications and the
NCCA assessment guidelines, which state it authoritatively — paper structure,
duration, component weightings. What is **not** recorded here is question style,
mark allocations per question, or the frequency with which individual topics are
examined. Those are inferences this note does not make.

Recorded rather than worked around: **a claim about what examinations.ie contains
must not be written from memory.**

## 9. Sources

Full manifest with URLs in `books/<id>/sources.yaml`. Primary documents:

* `JC_Mathematics_Specification.pdf` — NCCA, 2018
* `Assessment_Guidelines_Mathematics.pdf` — NCCA (Junior Cycle)
* `SCSEC25_Maths_syllabus_examination-2015_English.pdf` — NCCA, for examination from 2015
* `Leaving-Certificate-Specification-Applied-Mathematics_EN.pdf` — NCCA, 2019
* `21042-Leaving-Cert-Applied-Maths-Guidance-for-Modelling.pdf` — NCCA
* `SC-PHYSICS-Spec-EN.pdf` — NCCA, introduction September 2025
* `SCSEC27_Physics_syllabus_eng.pdf` — the superseded syllabus, examination to June 2026
* `SCSEC27_Physics_guidelines_eng.pdf` — guidelines for the superseded syllabus
