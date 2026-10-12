# GCSE and A-level Physics in England — curriculum research

Research note for the two planned physics books (`books/gcse-physics/`,
`books/a-level-physics/`). Every claim below names the document it came from.
The provenance manifest is `research/curriculum/physics.sources.yaml`.

**Retrieved 2026-10-11; the two Edexcel documents re-retrieved 2026-10-12.**
All three awarding bodies were reachable once a browser `User-Agent` was set. The
AQA pages are reachable at
`https://www.aqa.org.uk/...`; the specification PDFs now live on
`cdn.sanity.io` and are linked from the AQA subject pages. AQA has moved two of
its paths since the repository's maths book was written:

- GCSE Physics: `https://www.aqa.org.uk/subjects/science/gcse/physics-8463`
  (the specification itself also answers at `/subjects/physics/gcse/physics-8463/specification`).
- A-level Physics: `https://www.aqa.org.uk/subjects/physics/a-level/physics-7408`
  — **`/subjects/science/as-and-a-level/...` is a 404.** The working prefix for
  A-level science is `/subjects/physics/a-level/`, not `/subjects/science/`.

## Exact fetch commands

All fetches used the browser User-Agent the repository already uses in
`scripts/fetch_sources.sh`, and wrote into `/tmp/pi-delegate/del-24/fetched`:

```bash
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
curl -fsSL -A "$UA" -m 180 <url>.pdf -o <file>.pdf && pdftotext -layout <file>.pdf <file>.txt
```

The gov.uk publication pages 404 if the slug is guessed; the reliable path is
the search API, which is how every gov.uk URL below was found:

```bash
curl -s -A "$UA" "https://www.gov.uk/api/search.json?q=GCSE%20subject%20content&count=10&fields=link,title,format,public_timestamp"
curl -s -A "$UA" "https://www.gov.uk/api/content/<slug>"   # titles + attachment URLs
```

AQA resources are rendered from an embedded JSON blob. To pair a resource title
with its PDF URL:

```bash
curl -s -A "$UA" -L "https://www.aqa.org.uk/subjects/physics/gcse/physics-8463/assessment-resources" -o r.html
python3 - <<'PY'
import re
s = open('r.html', encoding='utf-8', errors='replace').read().replace('\\"', '"')
for m in re.finditer(r'"url":"(https://cdn\.sanity\.io/files/[^"]+\.pdf)"', s):
    tail = s[m.end():m.end()+600]
    t = re.search(r'"title":"((?:[^"\\]|\\.)*)"', tail)
    print((t.group(1) if t else '?'), '||', m.group(1))
PY
```

## What could not be established

Stated here so it is not filled in from memory later. Items 1 and 2 were
resolved on 2026-10-12; the record of what was tried is kept.

1. **A school-year-specific Edexcel GCSE equation list for 2026 — resolved.**
   Pearson's GCSE science exam-support page still links only the May–June 2024
   list, and following it does not reach 2026. The 2026 list was found instead
   through Pearson's own resource search index — the algolia servlet behind
   `...coursematerials.html` — where the record carries
   `category: Pearson-UK:Document-Type/Summer-2026-support`. It is the
   *Equations List, May–June 2026 Assessment Window*, code W84389RA:
   `https://qualifications.pearson.com/content/dam/pdf/GCSE/Science/2016/teaching-and-learning-materials/w84389a-gcse-physics-exam-aid-1ph0-1sc0-2nd-proof.pdf`.
   Every equation is identical to the 2024 list; only the window, code and
   copyright year change. Recorded in `books/gcse-physics/sources.yaml`.
2. **A standalone Edexcel A-level "data and formulae booklet" PDF — resolved.**
   Pearson's exam-materials listing is not machine-readable and the "past
   papers" area is login-gated. The printed insert was found in the same search
   index: *List of data, formulae and relationships*, Issue 3, November 2022,
   code P57019RRA:
   `https://qualifications.pearson.com/content/dam/pdf/A%20Level/Physics/2015/Specification%20and%20sample%20assessments/a-level-physics-data-formulae-relationships.pdf`.
   It matches Appendix 8/9 except that Appendix 8 prints "Pressure p = F/A" and
   the insert does not. It does not print the whole DfE core, which is why the
   A-level booklet marks the omitted core relationships `question` and the two
   definitions `know`. Recorded in `books/a-level-physics/sources.yaml` and
   `physics-equations-and-data.md`.
3. **AQA's original 2015 specification for 8463 is not what AQA serves now.**
   The PDF AQA links is `AQA-8463-SP-2016` republished as version 1.1,
   30 September 2019. Its Appendix A recall/select split predates the 2022
   equation-support policy, so it is *history*, not current provision. The
   current provision is the 2026 insert.
4. **The DfE subject-content documents are 2014/2015 and have not been
   rewritten.** Nothing published by DfE replaces the content for the current
   specifications; the May 2026 change is to *subject content expectations
   about memorising equations*, not to the topic list. The topic list therefore
   still comes from the 2015 documents.
5. **No A-level physics equation/recall change was found.** The 2026 policy
   decisions are expressly about GCSE mathematics, physics and combined
   science. A-level data and formulae booklets are already provided and were not
   the subject of a 2026 consultation that could be found.

---

# GCSE

## 1. The DfE subject content

**Source:** *Biology, Chemistry and Physics — GCSE subject content*, June 2015
(the version AQA and the boards work to is the May 2019 republication; the
footer reads `© Crown copyright 2015`).
`https://assets.publishing.service.gov.uk/media/5cd2b951ed915d50c208b4d5/GCSE_single_science_updated_May_2019.pdf`
(landing page `https://www.gov.uk/government/publications/gcse-single-science`).

### Structure

- **Subject content** — introduction, subject aims and learning outcomes.
- **Working scientifically** — four groups: development of scientific thinking;
  experimental skills and strategies; analysis and evaluation; scientific
  vocabulary, quantities, units, symbols and nomenclature.
- **Biology**, **Chemistry**, **Physics** — the topic lists.
- **Appendix 1** — equations in physics: list (a) "students should be able
  correctly to recall, and apply"; list (b) "students should be able correctly
  to select from a list and apply".
- **Appendix 2** — SI units in science: six base units (metre, kilogram, second,
  ampere, kelvin, mole) and nine named derived units (Hz, N, J, W, Pa, C, V, Ω,
  T).
- **Appendix 3** — mathematical skills required for biology (B), chemistry (C),
  physics (P) and combined science (CS), in five groups: arithmetic and
  numerical computation; handling data; algebra; graphs; geometry and
  trigonometry.
- **Appendix 4** — list of apparatus and techniques, physics column.

### Physics topics (eight)

Energy; Forces (Forces and their interactions; Work done as force × distance;
Pressure and pressure differences in fluids; Moments, levers and gears);
Forces and motion; Waves in matter; Light and electromagnetic waves;
Electricity; Magnetism and electromagnetism; Particle model of matter;
Atomic structure; Space physics.

Read against the contents page this is **eight headline topics** (Energy,
Forces, Waves, Electricity, Magnetism and electromagnetism, Particle model of
matter, Atomic structure, Space physics) with sub-headings, and the "Forces and
motion" block sitting under Forces.

The mathematics is woven through each topic as a "Uses of mathematics" block
with DfE reference codes, e.g. Forces: "use vector diagrams to illustrate
resolution of forces, a net force, and equilibrium situations (scale drawings
only) (4a, 5a, 5b)".

### The tier statement (verbatim)

> "Higher tier GCSE physics specifications must assess all the content set out
> below, whether it is underlined or is not underlined. Foundation tier GCSE
> physics specifications must assess all the content set out below, except for
> content which is underlined."

That is the whole of the DfE tier rule for GCSE physics: **underlined = Higher
only**, and the Higher tier is a superset of Foundation.

### The two marks-percentage rules

The DfE content document does **not** state a percentage. Both percentages are
set by Ofqual.

- **Mathematics.** *GCSE Subject Level Conditions and Requirements for Single
  Science (Biology, Chemistry, Physics)*, July 2015, Ofqual/15/5687, pp. 22–23:
  an awarding organisation must ensure "the total mark used to credit the
  relevant Mathematical Skills is no less than ... for a GCSE Qualification in
  Physics, **30 per cent** of the sum of all of the marks allocated to
  assessment objectives AO1 to AO3" (biology 10%, chemistry 20%). The same
  paragraph sets the Level-of-Demand floor: Foundation "not lower than that
  which is expected of Learners at Key Stage 3"; Higher "not lower than that of
  questions and tasks in assessments for the foundation tier in a GCSE
  Qualification in Mathematics".
  `https://assets.publishing.service.gov.uk/media/5d35b66c40f0b604d4769320/gcse-subject-level-conditions-and-requirements-for-single-science.pdf`
- **Practical work.** The same conditions: practical knowledge, skills and
  understanding count for "no less than **15 per cent**" of the AO1–AO3 marks.

Boards restate these:

- OCR J249 v5.0, §5g: "The assessment of quantitative skills would include at
  least **30% mathematical skills at the appropriate tier for physics**."
- AQA 8463 does not restate the 30% in the specification text; it lists
  assessment-objective weightings only (AO1 40, AO2 40, AO3 20).
- Edexcel 1PH0 Appendix 1 restates the DfE mathematical skills and the tier
  floors, without a percentage.

## 2. The boards at GCSE

All three boards offer a **separate-science GCSE Physics**, each alongside a
combined-science award that shares most content.

### AQA 8463 — GCSE Physics

Specification v1.1, 30 September 2019.
`https://cdn.sanity.io/files/p28bar15/green/e96b2cef624c0970b0f90d9678a438580aed0f65.pdf`

- **Topic list** (eight, numbered 4.1–4.8): 4.1 Energy, 4.2 Electricity,
  4.3 Particle model of matter, 4.4 Atomic structure, 4.5 Forces, 4.6 Waves,
  4.7 Magnetism and electromagnetism, 4.8 Space physics (physics only).
- **Tier.** Content that is Higher-only is marked `(HT only)`; a topic that is
  physics-only is marked `(physics only)`. Chapter 4.8 Space physics is physics-only.
- **Required practicals — ten.** The spec says "the following practical
  activities must be carried out by all students taking GCSE Physics" but also
  calls them "the ten required practical activities":
  1. determine the specific heat capacity of one or more materials;
  2. (physics only) the effectiveness of different materials as thermal
     insulators;
  3. circuits to investigate resistance (e.g. I–V characteristics);
  4. circuits to investigate series and parallel circuits;
  5. measurements for density of solids and liquids;
  6. force–extension of a spring (and work done);
  7. force and acceleration of an object;
  8. suitability of apparatus to measure waves (speed/frequency/wavelength);
  9. (physics only) reflection of light by different surfaces and refraction in
     glass blocks;
  10. infrared radiation absorbed or radiated by a surface.
  Practicals 2 and 9 are physics-only; the rest are common with GCSE Combined
  Science: Trilogy and Synergy.
- **Maths.** The spec points to "Mathematical requirements (page 85)"; it does
  not print a percentage. Appendix A is the equation list (see the equations
  document).

### Pearson Edexcel 1PH0 — GCSE (9–1) Physics

Specification Issue 4, March 2024.
`https://qualifications.pearson.com/content/dam/pdf/GCSE/Science/2016/Specification/gcse-physics-spec.pdf`
(landing page `https://qualifications.pearson.com/en/qualifications/edexcel-gcses/sciences-2016.html`
— **the GCSE physics page slug is `sciences-2016`, not `physics-2016`**.)

- **Topic list** (fifteen): 1 Key concepts of physics; 2 Motion and forces;
  3 Conservation of energy; 4 Waves; 5 Light and the electromagnetic spectrum;
  6 Radioactivity; 7 Astronomy; 8 Energy — forces doing work; 9 Forces and
  their effects; 10 Electricity and circuits; 11 Static electricity;
  12 Magnetism and the motor effect; 13 Electromagnetic induction;
  14 Particle model; 15 Forces and matter.
- **Tier.** Content flagged `P` (physics-only) and higher-tier content shown in
  bold, e.g. 9.7P moment of a force, 15.14P pressure due to a column of liquid.
- **Core practicals — eight mandatory.** At 2.19, 4.17, 5.9, 5.19P, 10.17,
  14.3, 14.11, 15.6 (force/mass/acceleration; equipment to measure wave speed;
  refraction in glass blocks; thermal radiation from surfaces; electrical
  circuits for I–V and series/parallel; density; properties of water; extension
  and work done on a spring). The spec says "Students must carry out all eight
  of the mandatory core practicals" and centres must confirm completion.
- **Maths.** Appendix 1 is the DfE mathematical-skills table with the
  Foundation=KS3 / Higher=foundation-GCSE floors. No percentage printed.
- **Appendix 3** is the SI units table (note: the DfE GCSE list has nine named
  derived units; Edexcel prints eight).
- **Appendix 4** is the command-word taxonomy (`Calculate` requires "a
  numerical answer, showing relevant working. If the answer has a unit, this
  must be included."). Useful for the book's "use the board command words
  exactly" rule.

### OCR J249 (Physics A, Gateway Science) and J259 (Physics B, Twenty First Century Science)

Specifications Version 5.0, July 2026.
J249 `https://www.ocr.org.uk/Images/234600-specification-accredited-gcse-gateway-science-suite-physics-a-j249.pdf`
J259 `https://www.ocr.org.uk/Images/234601-specification-accredited-gcse-twenty-first-century-science-suite-physics-b-j259.pdf`

- **J249 topic list** (nine): P1 Matter, P2 Forces, P3 Electricity,
  P4 Magnetism and magnetic fields, P5 Waves in matter, P6 Radioactivity,
  P7 Energy, P8 Global challenges, **P9 Practical skills** (a practical-based
  topic that "provides learners with the necessary skills to undertake the 15%
  practical content in the examinations").
- **J259** orders the same physics differently (P1 Radiation and waves, and so
  on); both use the `P<topic>` numbering and the `PM<topic>.<n>` equation
  references.
- **Tier.** Both build Foundation and Higher papers; `þ` marks content that is
  physics-separate-science only, and bold marks Higher-only.
- **Practical work.** OCR does not publish a numbered list of "required
  practicals" as AQA and Edexcel do; the 15% practical content is assessed in
  the examinations through the P9 practical-skills topic and the apparatus and
  techniques tables.
- **Maths.** Appendix 5g: "at least 30% mathematical skills at the appropriate
  tier for physics", plus the same DfE maths-skill table as the other boards.

### The GCSE tier story in one place

- Two tiers, Foundation and Higher. Each full GCSE Physics is **two papers**.
  AQA 8463 is Paper 1 and Paper 2, 50% each. Edexcel 1PH0 is Paper 1 and
  Paper 2, 50% each. OCR J249 is Foundation Paper 1 (J249/01) and Paper 2
  (J249/02) or Higher Paper 3 (J249/03) and Paper 4 (J249/04), 50% each;
  J249/02 and J249/04 include synoptic assessment.
- Ofqual's subject-level conditions require the total assessment time to be
  "no less than 3.5 hours" for a GCSE Qualification in Biology, Chemistry or
  Physics.
- DfE: Foundation excludes underlined content; Higher assesses everything.
- Boards re-express this as `(HT only)` (AQA), bold (Edexcel, OCR), `P`/`þ`
  for physics-only.
- Ofqual's Level-of-Demand floor differs by tier (Foundation ≥ KS3,
  Higher ≥ foundation GCSE Mathematics), and the 30% maths marks are counted
  "at the appropriate tier" — so the maths in the Foundation book and the Higher
  book is genuinely different work, not the same work easier.

## 3. What changes for 2026–2028 (GCSE)

The substantive change is about **equations, not topics**.

- **2022 onwards.** Ofqual required boards to provide a formulae sheet for GCSE
  mathematics and a *revised* equations sheet for GCSE physics and combined
  science, and to make copies available for teaching.
- **3 October 2024** — consultation outcome for *2025, 2026 and 2027*:
  DfE confirmed it is "not necessary for students taking exams in 2025, 2026 and
  2027 to memorise formulae for GCSE mathematics and equations for GCSE physics
  and combined science", and Ofqual carried the support materials forward.
- **26 February 2026** — DfE notified Ofqual of a change to subject content
  expectations for the **lifetime of the current specifications**: DfE "has
  confirmed its decision ... that it is not necessary for students to memorise
  formulae for GCSE mathematics and equations for GCSE physics and combined
  science for the lifetime of the current GCSE specifications".
- **5 May 2026** — Ofqual published its decision to implement the proposals
  (2,182 responses; 93% support for the physics/combined equations sheet). The
  updated conditions will require exam boards to:
  - publish the formulae and equations sheets for exams **by 1 September the
    year before** each exam series (so the 2028 sheets by 1 September 2027);
  - provide clean copies with their exam papers;
  - **not set questions that can be answered solely by transferring
    information from the formulae or equations sheets.**
  The decision applies to exams **from 2028 onwards for the lifetime of the
  current qualifications**, including resit opportunities.
- **Timeline after that.** DfE intends reformed qualifications to be first
  taught in **2029 or 2030**; Ofqual expects the current arrangements to cover
  exams up to and including 2030 or 2031 and any resit series after that. The
  Curriculum and Assessment Review Final Report recommended that government
  evaluate whether students should be required to memorise each formula and
  equation; that evaluation sits inside the reform work.

**Consequences for the physics book.**

- The book must not teach "you must learn this equation" as if recall were
  required for the current specifications. It should teach *which* equation
  applies and *how to use it*, because the exams are now forbidden to ask a
  question answerable by copying an equation off the sheet.
- Because the sheets are reissued and their contents are fixed per regulation
  period, the booklet's provision data has an expiry and must be re-verified
  when the period ends (BOOKLETS.md: "Provision is time-bound").
- One thing did **not** change: the DfE topic list. All the 2026 documents are
  about equations and assessment, not content.

---

# A-level

## 1. The DfE subject content

**Source:** *GCE AS and A level subject content for biology, chemistry, physics
and psychology*, April 2014.
`https://assets.publishing.service.gov.uk/media/5a807949e5274a2e8ab50599/Science_AS_and_level_formatted.pdf`
(landing page `https://www.gov.uk/government/publications/gce-as-and-a-level-for-science`
— note the physics A-level is **not** a separate gov.uk publication; it is
Appendix 3 of this one document).

### Structure

The document is short (a few pages) and the physics content is **Appendix 3**,
with practical and mathematical requirements in appendices 5 and 6:

- **Appendix 3 — physics: knowledge and understanding.** The required knowledge
  is grouped by area (below). The AS requirements are the non-bold text and
  must be "approximately 60 per cent of the AS specification"; the full A-level
  uses the whole appendix.
- **Appendix 5 / 5a / 5b — working scientifically.** 5a is the practical skills
  for indirect assessment (AS and A-level); 5b is the practical skills for
  direct assessment (A-level only — the Practical Endorsement).
- **Appendix 5c — use of apparatus and techniques (physics).** "All of the
  techniques listed below will be assessed through a minimum of **12 identified
  practical activities** within each specification." The list includes: analogue
  apparatus for length/distance, temperature, pressure, force, angles, volume;
  digital instruments including multimeters; methods to increase accuracy
  (multiple oscillations, fiducial marker, set square, plumb line); stopwatch or
  light gates; calipers and micrometers; constructing and checking DC circuits;
  signal generator and oscilloscope; generating and measuring waves
  (microphone/loudspeaker, ripple tank, transducer, microwave/radio source);
  laser or light source for interference and diffraction; ICT modelling/data
  logging; ionising radiation and detectors.
- **Appendix 6 (intro) — the quantitative-skills weighting.** "The assessment
  of quantitative skills will include at least 10% level 2 or above
  mathematical skills for biology and psychology, **20% for chemistry and 40%
  for physics**".
- **Appendix 6c — physics mathematical requirements**, in five groups
  (C.0 arithmetic and numerical computation; C.1 handling data; C.2 algebra;
  C.3 graphs; C.4 geometry and trigonometry) with exemplifications. Notable for
  a physics book:
  - C.1.1 significant figures: "understand that calculated results can only be
    reported to the limits of the least accurate measurement";
  - C.1.5 uncertainties: "determine the uncertainty where two readings for
    length need to be added together" and combine uncertainties through
    addition, subtraction, multiplication, division and powers;
  - C.2.4 solve algebraic equations including quadratics;
  - C.2.5 logarithms for quantities over several orders of magnitude;
  - C.3.6 draw and use a tangent to a curve as a rate of change;
  - C.3.8 the physical significance of area under a curve;
  - C.3.9 "apply the concepts underlying calculus ... by solving equations
    involving rates of change, e.g. Δx/Δt = –λx, using a graphical method or
    spreadsheet modelling" — i.e. **graphical calculus, not symbolic
    differentiation**;
  - C.3.12 sketch y = k/x, y = kx², y = k/x², y = kx, y = sin x, y = cos x,
    y = e±x, y = sin²x, y = cos²x as applied to physical relationships;
  - C.4.6 small-angle approximations sin θ ≈ θ, tan θ ≈ θ, cos θ ≈ 1.

### A-level physics content, by area (Appendix 3)

1. **Common requirements**: use of SI units and prefixes; Newton's laws;
   estimation of physical quantities; limitations of physical measurements.
2. **Vectors and scalars**: vector/scalar distinction; resolution into two
   components at right angles; addition rule for two vectors; calculations for
   two perpendicular vectors.
3. **Mechanics**: kinematics (kinematic equations in one dimension, graphical
   representation, velocity–time and displacement–time); dynamics (F = ma with
   constant mass; one- and two-dimensional motion under constant force;
   projectiles); energy (work for constant forces including force not along the
   line of motion; GPE↔KE exchanges; conservation); momentum (definition,
   conservation, one-dimensional problems); circular motion (radians and
   angular velocity; F = ma = mv²/r = mrω²); oscillations (SHM, a = –ω²x,
   x = A cos ωt).
4. **Mechanical properties of matter**: stress, strain, Young modulus;
   force–extension graphs; energy stored.
5. **Electric circuits**: current as rate of flow of charge I = Δq/Δt; emf and
   internal resistance; pd as energy transfer; resistance, resistivity, Ohm's
   law; DC circuits (conservation of charge and energy; series and parallel
   relationships; power dissipated; potential dividers); capacitance
   (definition, energy stored, charge and discharge curves).
6. **Waves**: polarisation and diffraction (qualitative); path difference,
   phase and coherence, interference; superposition and stationary waves
   (graphical).
7. **Matter**: molecular kinetic theory (ideal gases pV = NkT; absolute zero;
   temperature and average molecular kinetic energy); internal energy; E = mcΔθ.
8. **Quantum and nuclear physics**: photons and particles (photon model,
   evidence, wave–particle duality, particle diffraction); nuclear decay
   (nature/penetration/range of emissions; evidence for the nucleus; activity
   and half-life; exponential decay; nuclear changes); nuclear energy (fission
   and fusion; E = mc²; mass difference ↔ energy).
9. **Fields**: force fields (concept and definition; gravitational inverse-square
   for point/spherical masses; electric force and field for point charges in a
   vacuum; electric and gravitational potential; uniform electric field;
   similarities and differences); B-fields (force on a straight wire and on a
   moving charge); flux and electromagnetic induction (Faraday's and Lenz's
   laws; emf = rate of change of magnetic flux linkage).

The DfE document is deliberately a framework. Each board adds depth, breadth,
contexts and options, which is why the four board topic lists below are broader
than this list.

## 2. The boards at A-level

### AQA 7407/7408 — AS/A-level Physics

Specification v1.4, July 2026.
`https://cdn.sanity.io/files/p28bar15/green/fa68d54c1a3b8ef17760536c7fb2e3911c29dc73.pdf`

- **Content sections:** 3.1 Measurements and their errors; 3.2 Particles and
  radiation; 3.3 Waves; 3.4 Mechanics and materials; 3.5 Electricity;
  3.6 Further mechanics and thermal physics (A-level only); 3.7 Fields and their
  consequences (A-level only); 3.8 Nuclear physics (A-level only);
  3.9 Astrophysics (A-level only, option); 3.10 Medical physics (A-level only,
  option); 3.11 Engineering physics (A-level only, option); 3.12 Turning points
  in physics (A-level only, option); 3.13 Electronics (A-level only, option).
- **Papers:** Paper 1 (7408/1) 34%, Paper 2 (7408/2) 34%, Paper 3 (7408/3)
  32% (A-level). AS is 7407 with Papers 1 and 2.
- **Required practicals — twelve**, listed as "Required practical 1" to
  "Required practical 12": variation of the period/resonance of a mass–spring or
  pendulum; interference effects; determination of g by freefall; Young modulus;
  resistivity; emf and internal resistance; SHM; Boyle's law; charge and
  discharge of a capacitor; force on a current-carrying wire/or B-field; search
  coil/electromagnetic induction; inverse-square law for gamma radiation.
- **Maths:** "40% of the overall assessment of A-level Physics will contain
  mathematical skills equivalent to Level 2 or above" and the same for AS.
  Section 6 reproduces the DfE mathematical requirements with AQA's
  exemplifications.
- **Practical weighting:** "At least 15% of the overall assessment of A-level
  Physics will assess knowledge, skills and understanding in relation to
  practical work." The Practical Endorsement is separate and non-exam.

### Pearson Edexcel 9PH0 — A-level Physics

Specification Issue 3, November 2018.
`https://qualifications.pearson.com/content/dam/pdf/A%20Level/Physics/2015/Specification%20and%20sample%20assessments/pearsonedexcel-alevel-physics-spec.pdf`

- **Topic list (concept approach, thirteen):** 1 Working as a Physicist;
  2 Mechanics; 3 Electric Circuits; 4 Materials; 5 Waves and Particle Nature of
  Light; 6 Further Mechanics; 7 Electric and Magnetic Fields; 8 Nuclear and
  Particle Physics; 9 Thermodynamics; 10 Space; 11 Nuclear Radiation;
  12 Gravitational Fields; 13 Oscillations. The same specification can be
  taught through the **Salters Horners (SHAP) context-led route**, where the
  topics become contexts such as The Sound of Music (MUS), Good Enough to Eat
  (EAT), Technology in Space (SPC), Digging up the Past (DIG), Spare-Part
  Surgery (SUR), Build or Bust? (BLD), Reach for the Stars (STA), Transport on
  Track (TRA), The Medium is the Message (MDM), Probing the Heart of Matter
  (PRO), Stronger (HFS), Collaborative Problem Solving (CPS).
- **Papers:** Paper 1 and Paper 2 each 30%, Paper 3 (General and Practical
  Principles) 40%.
- **Practical work:** core practicals (the same 12-technique requirement as the
  DfE appendix; Edexcel's Appendix 5c maps apparatus and techniques to core
  practicals) plus Appendix 10 "Uncertainties and practical work".
- **Maths:** "Overall, a minimum of **40%** of the marks across the three papers
  will be awarded for mathematics at Level 2 or above", stated in the overview
  of each paper; Appendix 6 is the mathematical skills and exemplifications.

### OCR H556 — A Level Physics A

Specification v3.0, March 2026.
`https://www.ocr.org.uk/Images/171726-specification-accredited-a-level-gce-physics-a-h556.pdf`

- **Modules (six):** Module 1 Development of practical skills in physics;
  Module 2 Foundations of physics; Module 3 Forces and motion; Module 4
  Electrons, waves and photons; Module 5 Newtonian world and astrophysics;
  Module 6 Particles and medical physics.
- **Papers:** (01) 37%, (02) 37%, (03) 26%; plus the Practical Endorsement
  (04, non-exam assessment).
- **Practical work:** Practical Activity Groups PAG1–PAG12; "All of the
  techniques listed below will be assessed through a minimum of 12 identified
  practical activities" (same requirement as the DfE appendix). Practical
  activities are embedded in the learning outcomes with `PAG1`–`PAG10` in the
  Additional guidance column; PAG11 and PAG12 are offered throughout.
- **Maths:** "The assessment of quantitative skills will include at least 40%
  Level 2 (or above) mathematical skills for physics"; Appendix 5e defines what
  counts as Level 2 — application requiring choice of data or equation; problem
  solving using mathematics from different areas; A-level mathematical content
  such as logarithmic equations. It explicitly excludes "simple substitution
  with little choice of equation or data" and "structured question formats
  using GCSE mathematics".
- **A note for the book:** OCR's specification embeds its **data sheet** as
  Appendix 5c (see `physics-equations-and-data.md`) and marks some equations
  "Learners will also be expected to recall this equation" *even though* they
  are printed on that sheet (for example F = ma, W = mg, Ek = ½mv²,
  Ep = mgh, R = V/I). Given vs recalled is therefore not a clean split at OCR
  A-level.

### Cross-board summary of the maths weighting

| Qualification | Physics | Chemistry | Biology |
|---|---|---|---|
| GCSE (Ofqual condition) | 30% of AO1–AO3 marks | 20% | 10% |
| A-level (DfE Appendix 6) | 40% "Level 2 or above" | 20% | 10% and psychology 10% |

Both statements were read directly (Ofqual single-science conditions,
pp. 22–23; DfE GCE science, Appendix 6 introduction).

## 3. What changes for 2026–2028 (A-level)

- No A-level physics equation-sheet or memorisation change was found. The 2026
  DfE/Ofqual decisions are expressly limited to GCSE mathematics, physics and
  combined science. The A-level data and formulae booklets are already provided
  and remain provided.
- The wider reform context applies: the Curriculum and Assessment Review final
  report (published December 2025) and the government response commit to
  reviewing and developing revised subject content; the DfE intends reformed
  GCSE qualifications to be first taught in 2029 or 2030. The A-level version of
  that timeline was not established from a primary source in this pass, so do
  not assert one.
- AQA's and OCR's current A-level specifications carry 2026 version numbers
  (AQA v1.4 July 2026; OCR H556 v3.0 March 2026) but the content areas are
  unchanged from the DfE 2014 framework.

---

# Cautions for whoever authors the books

Pick your subject up from the DfE framework and then from the board's own
specification, because the DfE list is a framework and the boards are the ones
who add the contexts and the optional topics. Where the two disagree on
*assessment* (not content), the board and Ofqual win.

- **The recall split in every GCSE specification is stale.** AQA 8463 Appendix A,
  Edexcel 1PH0 Appendix 2 and OCR J249/J259 Appendix 5d all predate the 2022
  policy. For current provision use the boards' equation sheets, not the
  specification appendices. See `physics-equations-and-data.md`.
- **"Physics only" and "Higher only" are different tags.** AQA uses
  `(physics only)` and `(HT only)`; Edexcel uses `P` and bold; OCR uses `þ`
  and bold. A topic can be both.
- **Practical counts differ.** GCSE: AQA 10, Edexcel 8 mandatory core practicals,
  OCR no numbered list but 15% practical marks. A-level: 12 identified practical
  activities at all three boards, with the Practical Endorsement separate from
  the written papers.
- **The DfE GCSE physics document is shared with biology and chemistry.** Do not
  cache the whole document as if it were the physics content; the physics part
  starts at page 33 of the PDF.
