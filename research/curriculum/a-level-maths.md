# A-level Mathematics (England) — curriculum findings

**Retrieved:** 2026-10-11 for the curriculum sources, and 2026-10-12 for the exam-room formulae booklets in §11 (see `a-level-maths.sources.yaml`).
**Scope:** the DfE subject content for A-level Mathematics, how AQA 7357, Pearson
Edexcel 9MA0 and OCR H240 divide it across papers, the assessment objectives, the
Large Data Set, the assumed prior knowledge, and what changes for 2026–2028.
**Purpose:** enough to author `books/a-level-maths/` from, and a provenance record
for the claims. No book directory was created.

**Citation convention.** `[id]` refers to an entry in
`research/curriculum/a-level-maths.sources.yaml`, which carries the URL and the
retrieval date. A claim without a `[…]` tag is either arithmetic or an explicit
statement that something could not be established.

---

## 0. What this is, and what it is not

The **subject content** is national: the DfE document
*Mathematics: AS and A level content* (ref `DFE-00706-2014`, April 2016, for first
teaching from 2017) `[dfe-a-level]`. AQA says so in its own words: "The subject
content for A-level Mathematics is set out by the Department for Education (DfE)
and is common across all exam boards" `[aqa-7357]`; OCR labels every content
statement with a DfE reference and an OCR reference `[ocr-h240]`; Edexcel tracks
the DfE wording (its change log repeatedly records moves made "to match DfE
wording") `[edexcel-9ma0]`. The boards therefore differ in **how they bundle that
content into papers**, not in the content itself — with the single real exception
of the Large Data Set, which each board chooses and publishes itself.

A-level has **no tier axis**. Foundation/Higher is a GCSE concept; A-level
Mathematics is a single qualification with one mutually exclusive set of content.
There is therefore no `tier_axis` to fill in `book.yaml` (see
`a-level-maths-curriculum.draft.yaml`).

---

## 1. Sources and the exact commands used

All fetches used a browser user-agent (the boards' bot filters block a bare
`curl`). PDFs were converted with `pdftotext -layout`; the OCR docx was unzipped
and `word/document.xml` stripped of tags.

```bash
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
mkdir -p research/sources/a-level-maths

# DfE subject content (landing page resolves to the PDF attachment)
curl -s -m 60 -A "$UA" \
  https://www.gov.uk/api/content/government/publications/gce-as-and-a-level-mathematics
curl -fsSL -m 240 -A "$UA" \
  https://assets.publishing.service.gov.uk/media/5a7f273a40f0b62305b85670/GCE_AS_and_A_level_subject_content_for_mathematics_with_appendices.pdf \
  -o research/sources/a-level-maths/dfe_a_level_content.pdf

# AQA 7357 (the /as-and-a-level/ path 404s; /a-level/ works)
curl -s -o /dev/null -w '%{http_code} %{url_effective}\n' -m 60 -A "$UA" -L \
  https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357
curl -fsSL -m 240 -A "$UA" \
  https://filestore.aqa.org.uk/resources/mathematics/specifications/AQA-7357-SP-2017.PDF \
  -o research/sources/a-level-maths/aqa_7357_spec.pdf

# Pearson Edexcel 9MA0
curl -fsSL -m 240 -A "$UA" \
  "https://qualifications.pearson.com/content/dam/pdf/A%20Level/Mathematics/2017/specification-and-sample-assesment/a-level-l3-mathematics-specification-issue4.pdf" \
  -o research/sources/a-level-maths/edexcel_9ma0_spec.pdf

# OCR H240
curl -fsSL -m 240 -A "$UA" \
  https://www.ocr.org.uk/Images/308723-specification-accredited-a-level-gce-mathematics-a-h240.pdf \
  -o research/sources/a-level-maths/ocr_h240_spec.pdf

# Ofqual subject-level conditions
curl -fsSL -m 240 -A "$UA" \
  https://assets.publishing.service.gov.uk/media/5a7f153ae5274a2e8ab4a018/gce-subject-level-conditions-and-requirements-for-mathematics.pdf \
  -o research/sources/a-level-maths/ofqual_conditions_maths.pdf

# OCR Large Data Set notes (docx)
curl -fsSL -m 120 -A "$UA" \
  https://www.ocr.org.uk/Images/471937-notes-on-the-large-data-set.docx \
  -o research/sources/a-level-maths/ocr_lds.docx

pdftotext -layout research/sources/a-level-maths/dfe_a_level_content.pdf research/sources/a-level-maths/dfe_a_level_content.txt
# ... and the same for every other PDF.
```

Additional probes that establish a *negative* (important enough to record):

```bash
# AQA's public Large Data Set page — 200, but names no 2020+ dataset
curl -s -m 60 -A "$UA" -L \
  https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification/subject-content/use-of-data-in-statistics
# AQA's sitemap was checked for any dedicated LDS page:
curl -s -m 90 -A "$UA" -L https://www.aqa.org.uk/sitemap.xml | grep -iE 'data|7357'

# Pearson Edexcel Large Data Set page (SPA; no dataset name in the HTML)
curl -s -m 60 -A "$UA" -L \
  https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.large-data-set.html

# Curriculum and Assessment Review (2026-2028 context)
curl -fsSL -m 240 -A "$UA" \
  https://assets.publishing.service.gov.uk/media/690b96bbc22e4ed8b051854d/Curriculum_and_Assessment_Review_final_report_-_Building_a_world-class_curriculum_for_all.pdf \
  -o research/sources/a-level-maths/car_final.pdf
curl -fsSL -m 240 -A "$UA" \
  https://assets.publishing.service.gov.uk/media/690b2a4a14b040dfe82922ea/Government_response_to_the_Curriculum_and_Assessment_Review.pdf \
  -o research/sources/a-level-maths/car_response.pdf

# OCR Large Data Set notes: unzip and strip the document XML
cd /tmp && mkdir -p ocrlds && cd ocrlds && unzip -o -q /tmp/ocr_lds.docx \
  && python3 -c "import re,html; t=open('word/document.xml').read(); print(html.unescape(re.sub('<[^>]+>','',re.sub('</w:p>','\\n',t))))"
```

Sources and their role are recorded in the manifest. The two that matter most for
provenance are `[dfe-a-level]` and `[ofqual-mathematics]`; the two that matter
most for the Large Data Set are `[aqa-lds-page]` and `[ocr-lds]`.

---

## 2. The DfE subject content and its structure

`[dfe-a-level]`

- **Overarching themes.** Three, to be applied across all the detailed content:
  - **OT1** Mathematical argument, language and proof. Includes the notation in
    Appendix A and the formulae in Appendix B, and "Understand and use the
    definition of a function; domain and range of functions".
  - **OT2** Mathematical problem solving. Includes "Understand that many
    mathematical problems cannot be solved analytically, but numerical methods
    permit solution to a required level of accuracy" and the problem-solving cycle.
  - **OT3** Mathematical modelling. Translate, use, interpret, refine; modelling
    assumptions.
- **Detailed content, strands A–S:** A Proof; B Algebra and functions;
  C Coordinate geometry in the (x, y) plane; D Sequences and series;
  E Trigonometry; F Exponentials and logarithms; G Differentiation;
  H Integration; I Numerical methods; J Vectors; K Statistical sampling;
  L Data presentation and interpretation; M Probability; N Statistical
  distributions; O Statistical hypothesis testing; P Quantities and units in
  mechanics; Q Kinematics; R Forces and Newton's laws; S Moments. (Full item list
  in §5.)
- **AS versus A level.** The document says: "Content required for AS mathematics is
  shown in bold text within square brackets", and "This, assessed in the context of
  the AS overarching themes, represents 100% of the AS content." So the bracketed
  text is AS content and the unbracketed text is the A-level-only extension. An
  A-level book covers everything; the brackets matter when deciding what belongs in
  a Year 1 chapter versus a Year 2 chapter.
- **"A level specifications in mathematics must include the following content.
  This, assessed in the context of the overarching themes, represents 100% of the
  content."** That is the coverage target; there is no optional content.
- **Calculators** must include "an iterative function" and "the ability to compute
  summary statistics and access probabilities from standard statistical
  distributions" (§8).
- **Use of data in statistics** (§9): students must "become familiar with one or
  more specific large data set(s) in advance of the final assessment"; "use
  technology such as spreadsheets or specialist statistical packages"; "interpret
  real data presented in summary or graphical form"; and "use data to investigate
  questions arising in real contexts".
- **Appendix A** is the notation students must understand; **Appendix B** is the
  formulae and identities they "must be able to use … without these formulae and
  identities being provided, either in these forms or in equivalent forms", unless
  they are the starting point of a proof. Reuse is under the Open Government
  Licence; the document reference is printed as `DFE-00706-2014`.

---

## 3. How each board divides the subject across papers

All three boards build **three externally examined papers, each 2 hours and 100
marks, each 33⅓%**, and all are linear (all assessment at the end). The difference
is where Mechanics and Statistics sit.

| Board | Paper 1 | Paper 2 | Paper 3 |
|---|---|---|---|
| **AQA 7357** `[aqa-7357]` | Pure (A–I) | Pure **+ Mechanics** (J, P–S); any Paper 1 content may appear | Pure **+ Statistics** (K–O); any Paper 1 content may appear |
| **Pearson Edexcel 9MA0** `[edexcel-9ma0]` | Pure Mathematics 1 | Pure Mathematics 2 | **Statistics and Mechanics** (Section A statistics, Section B mechanics); Pure is assumed knowledge and may be tested |
| **OCR H240** `[ocr-h240]` | Pure | Pure **+ Statistics** (two sections of ≈50 marks) | Pure **+ Mechanics** (two sections of ≈50 marks) |

So the three boards do **not** agree on the order of the applied papers:

- AQA puts **Mechanics on Paper 2** and **Statistics on Paper 3**.
- OCR puts **Statistics on Paper 2** and **Mechanics on Paper 3**.
- Edexcel puts **Statistics and Mechanics together on Paper 3**, after two pure
  papers.
- AQA and Edexcel keep Vectors in the pure/mechanics side: AQA lists J (Vectors) on
  Paper 2 with mechanics `[aqa-7357]`; Edexcel lists Topic 10 (Vectors) inside the
  Pure content assessed on Papers 1 and 2 `[edexcel-9ma0]`. OCR assesses vectors
  within Pure `[ocr-h240]`.

Paper-level detail:

- **AQA** `[aqa-7357]`: Paper 1 assesses "Any content from: A Proof … I Numerical
  methods". Paper 2 assesses "Any content from Paper 1 and content from: J Vectors,
  P Quantities and units in mechanics, Q Kinematics, R Forces and Newton's laws,
  S Moments". Paper 3 assesses "Any content from Paper 1 and content from: K
  Statistical sampling, L Data presentation and interpretation, M Probability,
  N Statistical distributions, O Statistical hypothesis testing". The "any content
  from Paper 1" clause means pure material can be examined on the applied papers.
- **Pearson Edexcel** `[edexcel-9ma0]`: Paper 1 and Paper 2 "may contain questions
  on any topics from the Pure Mathematics content" (Topics 1–10). Paper 3 has
  "Section A: Statistics" (Topics 1–5) and "Section B: Mechanics" (Topics 6–9),
  and "All the Pure Mathematics content is assumed knowledge for Paper 3 and may be
  tested in parts of questions".
- **OCR** `[ocr-h240]`: Paper 1 assesses Pure "in a single section of 100 marks";
  Paper 2 assesses "Pure Mathematics and Statistics in two separate sections of
  approximately 50 marks each"; Paper 3 assesses "Pure Mathematics and Mechanics in
  two separate sections of approximately 50 marks each". "Some of the assessment
  items in the Statistics section will be set in the context of the pre-release
  large data set" (Paper 2 only).

---

## 4. Assessment objectives

The objectives are set by Ofqual and are identical across boards `[ofqual-mathematics]`:

| Objective | A level | AS |
|---|---|---|
| **AO1** Use and apply standard techniques (routine procedures; recall facts, terminology, definitions) | **50%** | 60% |
| **AO2** Reason, interpret and communicate mathematically (rigorous arguments including proofs; deductions; validity; explanation; notation) | **25%** | 20% |
| **AO3** Solve problems within mathematics and in other contexts (translate; interpret; model; evaluate and refine models) | **25%** | 20% |

Weightings must be met, or be within ±2% of these figures `[ofqual-mathematics]`.

How the boards put AO marks on paper:

- **AQA** `[aqa-7357]`: each of Papers 1–3 is AO1 50 / AO2 25 / AO3 25 (marks are
  scaled to meet the component weighting).
- **Pearson Edexcel** `[edexcel-9ma0]`: Paper 1 and Paper 2 each AO1 16.00–17.33%
  of the qualification, AO2 8.66–10%, AO3 6.33–7.67%; Paper 3 AO1 16.00–17.33%,
  AO2 5.66–7.00%, AO3 10.33–11.67%. (Note the applied paper carries more AO3.)
- **OCR** `[ocr-h240]`: Paper 1 AO1 47–53 marks, AO2 25–29, AO3 18–28; Paper 2
  AO1 47–53, AO2 23–27, AO3 20–30; Paper 3 AO1 47–53, AO2 21–25, AO3 22–32.

---

## 5. Full topic list per strand (the DfE detailed content)

`[dfe-a-level]`. Item labels are the DfE's own (A1, B3, …). "**AS**" marks text the
DfE places inside the AS square brackets (i.e. also in AS); unmarked text is the
A-level-only extension. The wording is condensed but keeps the DfE's terms.

### Overarching themes

- **OT1 Mathematical argument, language and proof.** Construct and present
  arguments with diagrams, sketches, logical deduction, precise statements and the
  vocabulary (constant, coefficient, expression, equation, function, identity,
  index, term, variable); use mathematical language and syntax; set-theory language
  and symbols applied to inequalities and probability; the definition of a function
  and its domain and range; comprehend and critique arguments, proofs and
  justifications.
- **OT2 Mathematical problem solving.** Recognise underlying structure and
  abstract; construct extended arguments in unstructured and contextual problems;
  interpret solutions in context; understand that many problems need numerical
  methods for a required accuracy; evaluate accuracy and limitations; the
  problem-solving cycle; diagrams, including in mechanics.
- **OT3 Mathematical modelling.** Translate context to model with simplifying
  assumptions; use a model; interpret outputs in context; refine a model and judge
  whether it is appropriate; use modelling assumptions.

### A — Proof

- **A1** Structure of mathematical proof from assumptions to a conclusion; proof by
  deduction and proof by exhaustion, **AS**; disproof by counter example, **AS**;
  proof by contradiction, including the irrationality of √2 and the infinity of
  primes, and application to unfamiliar proofs.

### B — Algebra and functions

- **B1** Laws of indices for all rational exponents, **AS**.
- **B2** Manipulate surds, including rationalising the denominator, **AS**.
- **B3** Quadratic functions and graphs; the discriminant and conditions for real
  and repeated roots; completing the square; solving quadratic equations, including
  quadratics in a function of the unknown, **AS**.
- **B4** Simultaneous equations in two variables by elimination and substitution,
  including one linear and one quadratic, **AS**.
- **B5** Linear and quadratic inequalities in one variable, interpreted
  graphically, including inequalities with brackets and fractions; solutions via
  "and"/"or" or set notation; represent e.g. $y > x + 1$ and
  $y > ax^2 + bx + c$ graphically, **AS**.
- **B6** Manipulate polynomials: expand, collect like terms, factorise, simple
  algebraic division; the factor theorem, **AS**. A-level extension: simplify
  rational expressions by factorising and cancelling, and algebraic division by
  linear expressions only.
- **B7** Graphs of functions; sketch curves from simple equations including
  polynomials, the modulus of a linear function, and $y = a/x$ and $y = a/x^2$
  with their asymptotes; interpret algebraic solutions graphically; use
  intersections to solve equations, **AS**. A-level extension: proportional
  relationships and their graphs.
- **B8** Composite functions; inverse functions and their graphs.
- **B9** Effect of simple transformations on $y = f(x)$: $y = af(x)$,
  $y = f(x) + a$, $y = f(x+a)$, $y = f(ax)$ and combinations, **AS**.
- **B10** Decompose rational functions into partial fractions (denominators no more
  complicated than squared linear terms, no more than three terms, numerators
  constant or linear).
- **B11** Use of functions in modelling, including limitations and refinements.

### C — Coordinate geometry in the (x, y) plane

- **C1** Equation of a straight line, including $y - y_1 = m(x - x_1)$ and
  $ax + by + c = 0$; gradient conditions for parallel and perpendicular lines,
  **AS**. A-level extension: straight-line models in a variety of contexts.
- **C2** Coordinate geometry of the circle: $(x-a)^2 + (y-b)^2 = r^2$; completing
  the square to find centre and radius; the angle in a semicircle is a right angle;
  the perpendicular from the centre to a chord bisects the chord; the radius at a
  point is perpendicular to the tangent there, **AS**.
- **C3** Parametric equations of curves and conversion between Cartesian and
  parametric forms.
- **C4** Use parametric equations in modelling.

### D — Sequences and series

- **D1** Binomial expansion of $(a + bx)^n$ for positive integer $n$; the notation
  $n!$ and ${}^nC_r$; link to binomial probabilities, **AS**. A-level extension:
  extend to any rational $n$, including for approximation, valid for
  $|bx/a| < 1$ (proof not required).
- **D2** Sequences from an $n$th-term formula and from a relation
  $x_{n+1} = f(x_n)$; increasing, decreasing and periodic sequences.
- **D3** Sigma notation for sums of series.
- **D4** Arithmetic sequences and series, including the $n$th term and the sum to
  $n$ terms.
- **D5** Geometric sequences and series: $n$th term, sum of a finite geometric
  series, the sum to infinity of a convergent series and the use of $|r| < 1$;
  modulus notation.
- **D6** Sequences and series in modelling.

### E — Trigonometry

- **E1** Definitions of sine, cosine and tangent for all arguments; the sine and
  cosine rules; the area $\tfrac12 ab\sin C$, **AS**. A-level extension: radian
  measure, arc length and sector area. (E2–E4 and E6–E9 follow.)
- **E2** Small-angle approximations $\sin\theta \approx \theta$,
  $\cos\theta \approx 1 - \theta^2/2$, $\tan\theta \approx \theta$ (radians).
- **E3** The sine, cosine and tangent functions, their graphs, symmetries and
  periodicity, **AS**. A-level extension: exact values of sin and cos at
  $0, \pi/6, \pi/4, \pi/3, \pi/2, \pi$ and multiples, and of tan at
  $0, \pi/6, \pi/4, \pi/3, \pi$ and multiples.
- **E4** Definitions of secant, cosecant and cotangent, and of arcsin, arccos and
  arctan; relationships to sine/cosine/tangent; graphs, ranges and domains.
- **E5** $\tan\theta = \sin\theta/\cos\theta$, **AS**;
  $\sin^2\theta + \cos^2\theta = 1$, **AS**. A-level extension:
  $\sec^2\theta = 1 + \tan^2\theta$ and $\operatorname{cosec}^2\theta = 1 + \cot^2\theta$.
- **E6** Double-angle formulae; $\sin(A \pm B)$, $\cos(A \pm B)$, $\tan(A \pm B)$;
  geometrical proofs of these formulae; expressions for $a\cos\theta + b\sin\theta$
  in the forms $r\cos(\theta \pm \alpha)$ or $r\sin(\theta \pm \alpha)$.
- **E7** Solve simple trigonometric equations in a given interval, including
  quadratic equations in sin, cos or tan and equations involving multiples of the
  angle, **AS**.
- **E8** Construct proofs involving trigonometric functions and identities.
- **E9** Trigonometric functions to solve problems in context, including vectors,
  kinematics and forces.

### F — Exponentials and logarithms

- **F1** The function $a^x$ and its graph ($a > 0$), **AS**; the function $e^x$ and
  its graph, **AS**.
- **F2** The gradient of $e^{kx}$ is $ke^{kx}$, and why the exponential model suits
  many applications, **AS**.
- **F3** $\log_a x$ as the inverse of $a^x$ (with $a > 0$, $x \ge 0$), **AS**; the
  function $\ln x$ and its graph, **AS**; $\ln x$ as the inverse of $e^x$, **AS**.
- **F4** Laws of logarithms, **AS**: $\log_a x + \log_a y = \log_a(xy)$;
  $\log_a x - \log_a y = \log_a(x/y)$; $k\log_a x = \log_a(x^k)$ (including
  $k = -1$ and $k = -\tfrac12$).
- **F5** Solve $a^x = b$, **AS**.
- **F6** Logarithmic graphs to estimate parameters in $y = ax^n$ and $y = kb^x$
  from data, **AS**.
- **F7** Exponential growth and decay and modelling (continuous compound interest,
  radioactive decay, drug concentration decay, population growth); limitations and
  refinements of exponential models, **AS**.

### G — Differentiation

- **G1** The derivative as the gradient of the tangent at a general point; the
  gradient as a limit; interpretation as a rate of change; sketch the gradient
  function; second derivatives; differentiation from first principles for small
  positive integer powers of $x$, **AS**; and for $\sin x$ and $\cos x$. A-level
  extension: the second derivative as the rate of change of gradient; convex/concave
  sections and points of inflection.
- **G2** Differentiate $x^n$ for rational $n$ and related constant multiples, sums
  and differences, **AS**. A-level extension: differentiate $e^{kx}$, $a^{kx}$,
  $\sin kx$, $\cos kx$, $\tan kx$ and related sums/differences/multiples; the
  derivative of $\ln x$.
- **G3** Gradients, tangents and normals, maxima and minima, stationary points,
  **AS**; identify increasing/decreasing functions, **AS**. A-level extension:
  points of inflection.
- **G4** Product rule, quotient rule and chain rule, including connected rates of
  change and inverse functions.
- **G5** Differentiate simple functions and relations defined implicitly or
  parametrically, for the first derivative only.
- **G6** Construct simple differential equations in pure mathematics and in context
  (kinematics, population growth, price and demand).

### H — Integration

- **H1** Know and use the Fundamental Theorem of Calculus, **AS**.
- **H2** Integrate $x^n$ excluding $n = -1$, and related sums, differences and
  constant multiples, **AS**. A-level extension: integrate $e^{kx}$, $1/x$,
  $\sin kx$, $\cos kx$ and related sums/differences/multiples.
- **H3** Evaluate definite integrals; use a definite integral to find the area
  under a curve, **AS**. A-level extension: area between two curves.
- **H4** Integration as the limit of a sum.
- **H5** Simple integration by substitution and by parts; understand these as the
  inverse processes of the chain and product rules. (One substitution only;
  integration by parts may need more than one application but excludes reduction
  formulae.)
- **H6** Integrate using partial fractions linear in the denominator.
- **H7** Analytical solution of simple first-order differential equations with
  separable variables, including particular solutions. (Separation may require
  factorisation with a common factor.)
- **H8** Interpret a differential-equation solution in context, including its
  limitations, and links to kinematics.

### I — Numerical methods

- **I1** Locate roots of $f(x) = 0$ by change of sign on an interval where $f$ is
  well behaved; understand how change-of-sign methods can fail.
- **I2** Solve equations approximately by simple iterative methods; draw cobweb and
  staircase diagrams. A-level extension: Newton–Raphson and other recurrences
  $x_{n+1} = g(x_n)$; understand how such methods can fail.
- **I3** Numerical integration, including the trapezium rule, the approximate area
  under a curve and the limits it must lie between.
- **I4** Use numerical methods to solve problems in context.

### J — Vectors

- **J1** Use vectors in two dimensions, **AS**; and in three dimensions.
- **J2** Calculate magnitude and direction of a vector, and convert between
  component form and magnitude/direction form, **AS**.
- **J3** Add vectors diagrammatically and do vector addition and scalar
  multiplication algebraically, with their geometrical interpretations, **AS**.
- **J4** Position vectors; calculate the distance between two points given by
  position vectors, **AS**.
- **J5** Use vectors to solve problems in pure mathematics and in context, including
  forces, **AS**; and kinematics.

### K — Statistical sampling

- **K1** Terms "population" and "sample", **AS**; use samples to make informal
  inferences about the population, **AS**; sampling techniques including simple
  random and opportunity sampling, **AS**; select or critique sampling techniques,
  including that different samples can lead to different conclusions, **AS**.

### L — Data presentation and interpretation

- **L1** Interpret diagrams for single-variable data, including area in a histogram
  as frequency, **AS**; connect to probability distributions, **AS**.
- **L2** Interpret scatter diagrams and regression lines for bivariate data,
  including distinct sections of a population (calculations involving regression
  lines are excluded); informal interpretation of correlation; correlation does not
  imply causation, **AS**.
- **L3** Interpret measures of central tendency and variation, extending to
  standard deviation; calculate standard deviation, including from summary
  statistics, **AS**.
- **L4** Recognise and interpret possible outliers; select or critique data
  presentation techniques; clean data, including missing data, errors and outliers,
  **AS**.

### M — Probability

- **M1** Mutually exclusive and independent events when calculating probabilities,
  **AS**; link to discrete and continuous distributions, **AS**.
- **M2** Conditional probability using tree diagrams, Venn diagrams and two-way
  tables; the formula $P(A \mid B) = P(A \cap B)/P(B)$.
- **M3** Modelling with probability, including critiquing assumptions and the likely
  effect of more realistic ones.

### N — Statistical distributions

- **N1** Simple discrete probability distributions (calculation of the mean and
  variance of discrete random variables is excluded), including the binomial
  distribution as a model; calculate binomial probabilities, **AS**.
- **N2** The Normal distribution as a model; find normal probabilities; link to
  histograms, mean, standard deviation, points of inflection and the binomial.
- **N3** Select an appropriate distribution for a context, with reasoning, including
  when the binomial or Normal model may not be appropriate.

### O — Statistical hypothesis testing

- **O1** The language of hypothesis testing through a binomial model — null and
  alternative hypothesis, significance level, test statistic, 1-tail and 2-tail
  tests, critical value, critical region, acceptance region, p-value — **AS**.
  A-level extension: correlation coefficients as measures of closeness to a
  straight line; interpret a given correlation coefficient using a given p-value or
  critical value (calculation of correlation coefficients is excluded).
- **O2** Conduct a binomial hypothesis test for a proportion and interpret the
  result in context; understand a sample is used to infer about the population, and
  that the significance level is the probability of incorrectly rejecting the null
  hypothesis, **AS**.
- **O3** Conduct a hypothesis test for the mean of a Normal distribution with known,
  given or assumed variance, and interpret the result in context.

### P — Quantities and units in mechanics

- **P1** Fundamental SI quantities and units: length, time, mass, **AS**. Derived
  quantities and units: velocity, acceleration, force, weight, **AS**; moment.

### Q — Kinematics

- **Q1** Kinematics language: position, displacement, distance travelled, velocity,
  speed, acceleration, **AS**.
- **Q2** Interpret graphs for motion in a straight line: displacement–time
  (gradient) and velocity–time (gradient and area), **AS**.
- **Q3** Understand, use and derive the constant-acceleration formulae for motion in
  a straight line, **AS**; extend to 2D using vectors.
- **Q4** Calculus in kinematics: $v = \mathrm{d}r/\mathrm{d}t$,
  $a = \mathrm{d}v/\mathrm{d}t = \mathrm{d}^2r/\mathrm{d}t^2$,
  $r = \int v\,\mathrm{d}t$, $v = \int a\,\mathrm{d}t$, **AS**; extend to 2D with
  vectors.
- **Q5** Model motion under gravity in a vertical plane using vectors; projectiles.

### R — Forces and Newton's laws

- **R1** Concept of a force; Newton's first law, **AS**.
- **R2** Newton's second law for motion in a straight line (forces in two
  perpendicular directions or simple 2-D vector forces), **AS**; extend to resolved
  forces in 2D.
- **R3** Weight and motion under gravity; gravitational acceleration $g$ and its
  value in SI units to varying accuracy, **AS**. (Inverse-square law not required;
  $g$ constant but understood as location-dependent.)
- **R4** Newton's third law; equilibrium of forces on a particle and motion in a
  straight line (perpendicular directions or simple 2-D vectors); smooth pulleys and
  connected particles, **AS**; resolving forces in 2D; equilibrium under coplanar
  forces.
- **R5** Addition of forces; resultant forces; dynamics for motion in a plane.
- **R6** The $F \le \mu R$ model for friction; coefficient of friction; motion on a
  rough surface; limiting friction and statics.

### S — Moments

- **S1** Moments in simple static contexts.

---

## 6. Large Data Set: what each board requires, and when it changes

The requirement to use a large data set comes from the DfE §9 `[dfe-a-level]`; AQA
quotes it as "common to all exam boards" `[aqa-lds-page]`. The **dataset itself is
the board's own choice**, and the assessment paper that assumes it differs by board
(§3). What each board says, from its primary document:

| Board | Where assessed | Named data set | Change / review policy |
|---|---|---|---|
| **AQA** | Paper 3 (statistics) | 2018–2019: an extract of DEFRA "Family Food 2014" (household food and drink by Government Office Region, 2001–2014). From 2020: "a new dataset", **not named** in the reachable source | No review cycle stated in the specification; the 2018/19 set was replaced for exams from 2020 |
| **Pearson Edexcel** | Paper 3, Section A (statistics) | "Pearson has provided a large data set"; **the dataset is not named** in the specification | "appropriate for the lifetime of the qualification"; reviewed annually; changes notified before the start of the two-year course before the exam |
| **OCR** | Paper 2, Statistics section | 2001 and 2011 Census data for England and Wales on Method of Travel to Work and Age Structure, by Local Authority | "remain for the life of the specification, unless the review process identifies a necessary change"; changes made before the start of a two-year course, centres notified a year in advance |

Sources: AQA `[aqa-7357]` §3.21.1 and `[aqa-lds-page]`; Edexcel `[edexcel-9ma0]`
"Use of data in statistics"; OCR `[ocr-h240]` §2b and `[ocr-lds]`.

Common requirements across the boards (from the same sources):

- Questions assume familiarity and "give a material advantage to learners who have
  studied … the data set"; the terminology/contexts are not explained.
- Students are **not** required to have a copy of the data set in the exam, and are
  not required to have detailed knowledge of the actual data; selected data or
  summary statistics may be provided in the paper.
- No large-scale data entry into a calculator is required.
- OCR's LDS notes add the teaching activities expected: sampling, creating diagrams
  with spreadsheets/software, calculations, hypothesis testing against the LDS as a
  population, repeated sampling, modelling, and exploratory data analysis
  `[ocr-lds]`.

**Could not establish (escalation).** The *identity* of AQA's 2020-onwards data set
and of Pearson Edexcel's data set cannot be confirmed from a primary source
reachable here. AQA's specification says only "there is a new dataset … also only
available on the AQA website", and the `aqa.org.uk/7357` destination does not name
it in the HTML retrieved; Edexcel's specification does not name its dataset and its
download page is JavaScript-rendered so the file was not retrievable. **Do not
fill these from memory.** If the book's statistics chapters refer to the LDS, name
OCR's (which is sourced) or refer generically to "your board's data set" until a
board PDF naming AQA's and Edexcel's can be retrieved.

---

## 7. Assumed prior knowledge from GCSE

- The DfE content states: "AS and A level mathematics specifications must build on
  the skills, knowledge and understanding set out in the **whole GCSE subject
  content for mathematics for first teaching from 2015**" `[dfe-a-level]`.
- OCR states the assumption directly: "It is assumed that learners are familiar with
  the content of GCSE (9–1) Mathematics for first teaching from 2015" `[ocr-h240]`.
- Pearson publishes transition worksheets and baseline tests that "assess key
  concepts that learners are required to know to be successful on the course", which
  is the practical form of the same assumption `[edexcel-transition]`.

The 2015 GCSE content is the six-strand document already cited by the GCSE book
(`DFE-00233-2013`) `[dfe-gcse]` — strands Number; Algebra; Ratio, proportion and
rates of change; Geometry and measures; Probability; Statistics. The DfE A-level
document does **not** re-list the GCSE topics, only the assumption of the whole
document; a chapter-level prerequisite map should therefore be derived from the
GCSE curriculum plan (`books/gcse-maths/curriculum.yaml`) rather than invented.

Two specific consequences for authoring:

- Higher-tier-only GCSE tools (surds, exact trig values, circle theorems, bounds,
  iteration, algebraic proof, vectors in geometry) are assumed as known at
  A-level; a retrieval starter may legitimately draw on them.
- AQA's specification carries no separate "prior learning" section; there is
  therefore no AQA-specific prior-knowledge list to reconcile against
  `[aqa-7357]`.

---

## 8. What changes for 2026–2028

Established from primary sources:

- **The subject content does not change.** The current A-level content remains
  `DFE-00706-2014` (April 2016, first teaching 2017); Ofqual still names it as the
  Content Document `[ofqual-mathematics]`.
- **OCR's specification v3.1 (August 2026)** changes only the wording about the
  Large Data Set in section 1b; the "Summary of updates" records "Deletion of
  wording about the Large Data Set" and the specification says "No changes have been
  made to any assessment requirements" `[ocr-h240]`. The LDS section 2b and the
  assessment structure are unchanged.
- **AQA's specification** is still v1.3 (31 January 2018) `[aqa-7357]`;
  **Pearson Edexcel's** is still Issue 4 (February 2020) `[edexcel-9ma0]`. No newer
  issue of either was found.
- **The GCSE formulae-sheet extension is not an A-level change.** Ofqual will
  continue to require formulae and equations sheets for GCSE mathematics (and
  physics/combined science) for the remaining lifetime of the current
  specifications, expected to cover exams up to 2030 or 2031 `[ofqual-updates]`.
  A-level mathematics is not named in that decision; A-level papers already provide
  a formulae/statistical tables booklet (e.g. Edexcel "Mathematical Formulae and
  Statistical Tables", OCR pages 2–3 of each question paper) `[edexcel-9ma0]`
  `[ocr-h240]`, and the DfE requires students to recall Appendix B formulae
  `[dfe-a-level]`.
- **Large Data Set change policies** are the only time-bound items stated by the
  boards, and they are per board: Edexcel reviews annually and notifies before a
  two-year course starts; OCR keeps the set for the life of the specification
  unless review requires a change, with a year's notice; AQA states no cycle (see
  §6) `[edexcel-9ma0]` `[ocr-h240]` `[aqa-7357]`.
- **The Curriculum and Assessment Review** (final report and government response,
  10 December 2025) is the live reform context. No recommendation that changes
  A-level Mathematics subject content was found in the final report or the
  government response. Its mathematics recommendations
  concern GCSE, 16–19 Maths and English for learners below level 2, a new level 3
  pathway, and a planned level 3 data science and AI qualification; the government
  response's mathematics actions are the Higher Level Maths Achievement Programme
  and GCSE-level support `[car-final]` `[car-response]`.

**Not established.** No dated Ofqual or DfE decision was found that changes
A-level Mathematics content or the three-paper structure for the 2026, 2027 or 2028
exam series. If the book is authored now, it should target the current DfE content
and note that the review's post-16 recommendations could later touch A-level
provision — but no such change is in force.

---

## 9. What could NOT be established (read before making a claim)

1. **AQA's 2020-onwards Large Data Set identity** — the specification says it
   exists and is "only available on the AQA website"; the reachable AQA pages do
   not name it. `[aqa-7357]` `[aqa-lds-page]`
2. **Pearson Edexcel's Large Data Set identity** — the specification says Pearson
   provides one but does not describe it, and the download page is
   JavaScript-rendered and could not be read. `[edexcel-9ma0]`
3. **A board-specific topic not in the DfE content** — none found. All three
   specifications present the DfE content as their content (AQA states it
   explicitly; OCR maps each statement to a DfE reference; Edexcel aligns its
   content and guidance to the DfE wording); where a board's guidance adds
   examples or depth (e.g. Edexcel's "guidance" column), that is
   specification-level elaboration, not a different requirement. `[aqa-7357]`
   `[ocr-h240]` `[edexcel-9ma0]`
4. **Whether AQA or Edexcel intend a specification reissue for 2027/2028** — no
   public signal found. Only OCR's v3.1 (August 2026) was found to be recent.
5. **The exact GCSE topic prerequisites** — the DfE A-level document assumes the
   whole GCSE document without listing it, so any prerequisite list must be derived
   from `books/gcse-maths/curriculum.yaml` `[dfe-a-level]`.

Escalation is the point here: an outdated or invented curriculum claim is worse
than a missing one. Where a book page needs one of the above (above all, the AQA
and Edexcel data sets), retrieve the board's own PDF naming it first, or write
generically and record the gap.

---

## 10. Cross-checks performed

- The DfE item labels A–S are used verbatim by AQA `[aqa-7357]` and by OCR in its
  mapping; Edexcel groups the same content into 10 pure topics and 9 applied topics
  `[edexcel-9ma0]`. The plan in `a-level-maths-curriculum.draft.yaml` therefore
  tags sections with the DfE labels, which every board understands.
- Every item A1–S1 appears in at least one section of the draft plan; the coverage
  block in the draft records the item count per letter.
- Paper structures were taken from each board's "Assessment" or "Forms of
  assessment" section, not from a revision website.

---

## 11. The exam-room formulae booklets (added 2026-10-12)

The book now declares a formulae booklet, so the three awarding bodies' own
exam-room documents were retrieved and recorded in
`books/a-level-maths/sources.yaml` (the authoritative manifest) and in this
file's `sources.yaml`. All three were reached from the awarding body, not a
revision site. The data is `books/a-level-maths/booklet/a-level-maths.yaml` and
`python -m textbook.booklet` validates it.

| Board | Document retrieved | Statistical tables on it |
|---|---|---|
| **AQA 7357** | *Formulae for A-level Mathematics*, v1.2 (first issued August 2017), `AQA-AS-A-MATHS-FORMULAE.PDF` on `filestore.aqa.org.uk` `[aqa-formulae]` | **None.** The larger formulae-and-tables booklet belongs to Further Mathematics. |
| **Pearson Edexcel 9MA0** | *Mathematical Formulae and Statistical Tables*, Issue 1 (July 2017), for 8MA0/9MA0/8FM0/9FM0 `[edexcel-formulae]` | Binomial cumulative distribution function; percentage points of the Normal distribution; critical values for correlation coefficients (product moment); random numbers. |
| **OCR H240** | The formulae sheet printed on pages 2–3 of every question paper, confirmed against H240/01 June 2025 `[ocr-formulae]` | Percentage points of the Normal distribution. |

Three findings a later pass should not have to rediscover:

- **AQA's booklet is not linked from the subject page.** The 7357 subject page
  lists only the specification; the booklet lives on `filestore.aqa.org.uk` and
  had to be found from a search engine. A June 2023 7357/1 question paper proves
  it is the exam-room document ("You must have the AQA Formulae for A-level
  Mathematics booklet"), which is why the specification's Appendix B — a recall
  list with no booklet in sight — is *not* the provision.
- **OCR has no separate booklet.** The sheet is part of the question paper, and
  the specification v3.1 appendix reproduces it after saying learners will be
  given it. Here the appendix is not stale: the June 2025 paper and the appendix
  agree. This is luck rather than a rule — check the question paper when both
  exist.
- **The `know` group is DfE Appendix B, not the boards' sheets.** The two lists
  barely overlap: the booklets give, for example, the sum of an arithmetic series
  and the derivatives of `tan`, `sec`, `cot` and `cosec`, while Appendix B
  requires recall of the nth term, the elementary derivatives, the quadratic
  formula, the log laws, the mensuration formulae and the mechanics laws. The
  booklet data keeps them apart with `provision`.

**Recorded gap.** The widget's **Tables** tab filters tables by tier only, not by
exam board (`assets/booklet/booklet.js`). Edexcel's statistical tables and OCR's
Normal percentage points must therefore be carried as board-filtered *items*
(which is how the Normal and correlation tables are represented), and the large
machine-generated tables — Edexcel's binomial cumulative distribution function
and random-numbers grid — are not reproduced in the widget. Making the Tables tab
board-aware, or allowing `provision` on a table, would let the booklet carry
them; that is an engine/widget change, not a data change. AQA provides no
statistical tables, so it must not be shown Edexcel's.
