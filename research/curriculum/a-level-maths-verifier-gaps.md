# A-level Mathematics — verifier gaps

**Purpose.** What `engine/textbook/verify/` can and cannot check today, and
exactly what must be added before an A-level problem bank can be verified. Read
alongside `PROBLEMS.md` (especially "Beyond GCSE: calculus and statistics" and
"What can be verified, and how") and `engine/textbook/verify/{cas.py,verify.py,__main__.py}`.
**Retrieved:** 2026-10-11. **Scope of the audit:** the DfE items A1–S1 listed in
`a-level-maths.md` §5. No engine file was edited.

---

## 1. The vocabulary that exists today

From `PROBLEMS.md` and the code as it stands:

- **`check.kind`** — `evaluate`, `solve`, `compare`, `rounded`, `between`,
  `apply`, `statistic`, `all`.
- **`step_relation`** — `equivalent` (default), `solutions`, `implies`, `apply`.
- **`apply: {op: …}`** — `diff`, `integrate` (indefinite and definite), `subs`,
  and the unary set `simplify`, `factor`, `expand`, `together`, `apart`, `cancel`,
  `trigsimp`, `rationalize`.

Behaviour that constrains what is possible:

- `verify._verify_check` for `solve` compares `cas.solution_set(equation, variable)`
  with `cas.value_set(check["answer"], symbols)`, a `FiniteSet`. `solution_set`
  has a `domain` parameter but the call site never passes one, so the domain is
  always `S.Reals`. A `ConditionSet` is therefore never "unknown" — it is just a
  set that does not equal the expected `FiniteSet`.
- `parse_equation` requires exactly one `=`, so a check or step is a **single**
  equation or expression.
- `cas.parse_expression` already resolves the SymPy names a bank needs. Verified
  locally: `binomial(5,2) → 10`, `factorial(5) → 120`, `sqrt(2)`, `exp(x)`,
  `log(x)`, `sin(pi/6) → 1/2`, `Rational(1,2) → 1/2`. So parsing is **not** the
  blocker; the missing check kinds and operations are.
- `cas.statistic` supports only `mean`, `median`, `range`, `min`, `max`.
- `scipy` is **not** installed in the engine environment (`import scipy` fails).
  Any plan to pin `scipy.stats` as the statistics/Monte-Carlo oracle carries a
  dependency addition with it.
- `cas.solution_set` defaults to `S.Reals`. That is correct for A-level
  Mathematics (real solutions only). `S.Complexes` is a Further Mathematics
  concern and should not be needed here.

---

## 2. Topic by topic

Legend: **OK** = the existing vocabulary verifies it; **Partial** = the algebra is
verifiable but something structural is not; **Gap** = a new kind/op is required.

### A — Proof

| Item | Status | What is missing |
|---|---|---|
| A1 proof by deduction | Partial | Each algebraic step is an `equivalent` / `implies` chain, so the algebra is checkable. The *choice* of steps and the logical packaging are not. `step_relation: implies` already covers irreversible moves (PROBLEMS.md). |
| A1 proof by exhaustion | Partial | Each finite case is `subs` + `evaluate`; `check.kind: all` can wrap them. There is no "these cases exhaust the domain" check — that is prose. |
| A1 disproof by counter example | OK | `apply: {op: subs, args: [x, value]}` then `check.kind: compare` asserting the resulting statement is false. |
| A1 proof by contradiction | Gap / prose | The contradictory step (assume ¬P, derive Q and ¬Q) has no representation. Only the algebra inside can be checked. |

Note: **proof by induction is not in the A-level Mathematics content** (DfE
strand A lists deduction, exhaustion, counter example, contradiction
`[dfe-a-level]`); it belongs to Further Mathematics. If a bank ever carries it, it
is CAS-unverifiable (§4).

### B — Algebra and functions

| Item | Status | What is missing |
|---|---|---|
| B1 laws of indices | OK | `apply: {op: simplify}` / `equivalent`; declare positive real assumptions where roots are involved. |
| B2 surds, rationalising | OK | `apply: {op: rationalize}` plus `equivalent`; positive assumptions on radicands. |
| B3 quadratics (discriminant, completing the square, solving) | OK | `compare` for $b^2-4ac$ sign, `equivalent` for completing the square, `solve` for finite real roots. |
| B3 quadratics *in a function of the unknown* (e.g. in $\sin x$) | Gap | Solve in the substituted variable then back-substitute. Needs either chained checks (`solve t`, then `subs t` then `solve x`) or domain-aware `solve` (see E7). |
| B4 simultaneous equations (one linear, one quadratic) | **Gap** | No way to state a **system**. Add `check.kind: system` with `equations: [...]`, `variables: [x, y]`, `answer`. SymPy: `solve([eq1, eq2], [x, y])`, `linsolve`, `nonlinsolve`. |
| B5 inequalities and set notation | **Gap** | `compare` tests one relation, not an inequality **solution set**. Need `check.kind: inequality` (or extend `solve`) with `domain: interval`, comparing SymPy sets generally (`Interval`, `Union`, `Complement`). SymPy: `solveset`, `reduce_inequalities`. |
| B5 graphical representation of inequalities | Prose | Not CAS-checkable. |
| B6 polynomials, factor theorem, algebraic division | Partial | `factor`/`simplify`/`cancel`/`apart` are there. Add `apply: {op: div}` (SymPy `div`) and `apply: {op: rem}` (SymPy `rem`, `Poly`) for "divide and give quotient/remainder". The factor theorem is `subs` + `compare` to zero. |
| B6 simplifying rational expressions | OK | `cancel`/`together`/`apart`; declare excluded values (domains are not proved — PROBLEMS.md "Domains"). |
| B7 graphs, modulus, asymptotes, intersections | Partial | Sketching is prose. Asymptotes and limits need `apply: {op: limit}` (SymPy `limit`). Intersections of two curves need the **system** kind. |
| B7 proportional relationships and graphs | OK | `equivalent`; the graph is prose. |
| B8 composite and inverse functions | **Gap** | Add `apply: {op: compose}` (substitute one function into another; SymPy `.subs`) and an inverse check via `apply: {op: invert}` (SymPy `solve(f(x) - y, x)`), then verify with `subs`. |
| B9 graph transformations | Partial | The transformed expression is checkable with `subs`/`equivalent`; the graphical effect is prose. |
| B10 partial fractions | OK | `apply: {op: apart}` already exists (denominator limits are an authoring rule, not a verifier rule). |
| B11 modelling with functions | Prose | Limitations/refinements are AO3 prose. |

### C — Coordinate geometry

| Item | Status | What is missing |
|---|---|---|
| C1 straight lines, gradient conditions | OK | `equivalent`, `compare`; $m_1m_2 = -1$ is a `compare`. |
| C2 circle equation and completing the square | OK | `equivalent`. |
| C2 the three circle properties | Prose | Geometric theorems; only numeric coordinate consequences are checkable (`between`/tolerance, or symbolic distances with assumptions). |
| C3 parametric ↔ Cartesian | **Gap** | Add `apply: {op: eliminate}` (eliminate the parameter). SymPy: `solve` for $t$ then `subs`; there is no single eliminator, so this is a small helper, not a library call. |
| C4 parametric modelling | Prose | |

### D — Sequences and series

| Item | Status | What is missing |
|---|---|---|
| D1 binomial expansion, positive integer $n$ | OK | `apply: {op: expand}`; `binomial(n, r)` and `factorial` parse. |
| D1 binomial expansion for rational $n$, approximation, validity $a$ | **Gap** | Add `apply: {op: series}` with an order (SymPy `series`). The validity condition $|bx/a| < 1$ is not a CAS result; it is a stated condition and stays out of the CAS. |
| D2 sequences from a formula or recurrence | **Gap** | Term formulae can be `subs`/`equivalent`. Recurrence-generated terms need `apply: {op: iterate}` and closed forms need `apply: {op: rsolve}` (SymPy `rsolve`). |
| D3 sigma notation | **Gap** | Add `apply: {op: sum}` (SymPy `summation`). |
| D4 arithmetic series | **Gap** | `sum` for the finite sum, or `equivalent` against the closed form. |
| D5 geometric series and sum to infinity | **Gap** | `sum` for finite; `summation(..., (k, 0, oo))` or `apply: {op: limit}` of the partial sum for the infinite case. |
| D6 modelling | Prose | |

### E — Trigonometry

| Item | Status | What is missing |
|---|---|---|
| E1 sine/cosine rules, area, radians | OK | `equivalent` + `trigsimp`; arc length/sector area are `evaluate`. Assume angle symbols are real and, where needed, in range. |
| E2 small-angle approximations | **Gap** | These are approximations, not identities. Need `apply: {op: series}` to order 2/3, and/or a tolerance `approx` check. Exact `equivalent` fails (correctly). |
| E3 graphs, periodicity, symmetry, exact values | Partial | Exact values are `evaluate` (`sin(pi/6) → 1/2` verified). Graphs, periodicity and symmetry are prose. |
| E4 secant/cosecant/cotangent and inverse trig | Partial | Add `apply: {op: rewrite, args: [sin]}` (SymPy `.rewrite(sin)`); domains of arcsin/arccos/arctan need assumptions and, for equations, interval domains (E7). |
| E5 identities | OK | `apply: {op: trigsimp}` / `equivalent` proves identities by proving the difference is zero. |
| E6 double-angle and addition formulae | **Gap** | Add `apply: {op: expand_trig}` (SymPy `expand_trig`) and `apply: {op: fu}` (SymPy `sympy.simplify.fu`). |
| E6 $a\cos\theta + b\sin\theta = r\cos(\theta \mp \alpha)$ | **Gap** | Add `apply: {op: harmonic}` computing $r=\sqrt{a^2+b^2}$ and $\alpha=\operatorname{atan2}(b,a)$ (SymPy `sqrt`, `atan2`), then compare with `equivalent`/`approx`. |
| E7 equations in a given interval | **Gap** | `check.solve` never passes a domain, so `solveset` over `S.Reals` returns `ImageSet`/`ConditionSet` for periodic equations. Add a `domain`/`interval` field to the `solve` check and compare general sets; `solveset(eq, x, domain=Interval(a, b))` returns a `FiniteSet` (verified: `solveset(sin(x), x, Interval(0, 2*pi)) → {0, pi, 2*pi}`). |
| E7 quadratic equations in sin/cos/tan | Gap | Requires the substitution-then-solve pattern of B3 plus the interval domain above. |
| E8 trig proofs | Partial | Each identity step is `trigsimp` + `equivalent`; the proof structure is prose. |
| E9 trig in context | Prose | |

### F — Exponentials and logarithms

| Item | Status | What is missing |
|---|---|---|
| F1–F3 exponential and log functions | OK | `evaluate`/`equivalent`; `exp`, `log`, `E` parse. |
| F4 laws of logarithms | Partial | `equivalent` proves both sides. Add `apply: {op: expand_log}` and `apply: {op: logcombine}` (SymPy) so a step can name the law it applies. |
| F5 solve $a^x = b$ | OK | `solve` with `positive: true` on $a$ and $b$ to keep the solution real. |
| F6 logarithmic graphs, estimating $a$, $n$, $k$, $b$ from data | **Gap** | A data-fitting check. Add `check.kind: regression`/`fit` with `x`, `y`, a model (`y = a x^n` or `y = k b^x`), the transformed-variable fit and a **tolerance**. Oracle: least squares on the log-transformed data; exact symbolic equality is the wrong test. SymPy `stats`/`interpolate` or a pinned numeric library. |
| F7 growth and decay modelling | Partial | The model ODE is checkable with `dsolve` (see H7); the interpretation is prose. |

### G — Differentiation

| Item | Status | What is missing |
|---|---|---|
| G1 derivative as gradient and rate of change | OK | `apply: {op: diff}`. |
| G1 differentiation from first principles | **Gap** | Needs `apply: {op: limit}` (SymPy `limit`) on `(f(x+h) - f(x))/h`. |
| G1 second derivative, convexity, points of inflection | Partial | `diff` twice; `solve` for $f''=0$; the sign change needs `compare`/`between` evaluations at candidate points. There is no interval-sign check; if the bank wants "prove $f'' > 0$ on $I$", add a `sign`/`approx` helper (`solveset`, `is_positive`). |
| G2 standard derivatives | OK | `diff`. |
| G3 tangents, normals, stationary points, maxima/minima | OK | `diff` + `solve` + `compare`; normals use the perpendicular gradient `compare`. |
| G3 increasing/decreasing | Partial | `diff` + `compare` of $f'(x_0)$. |
| G4 product, quotient, chain rules; connected rates; inverse functions | Partial | `diff` handles the rules; connected rates are `subs` + `diff`; inverse-function derivatives need the `invert`/`compose` helpers from B8. |
| G5 implicit and parametric differentiation | **Gap** | Add `apply: {op: idiff}` (SymPy `idiff` — verified working as `idiff(expr, y(x), x)`) and `apply: {op: parametric_diff}` computing $\frac{dy}{dt}/\frac{dx}{dt}$. (Note `sympy.idiff` takes the expression set to zero, not an `Eq`.) |
| G6 constructing differential equations | Partial | The resulting ODE is `equivalent` on equations; the modelling is prose. |

### H — Integration

| Item | Status | What is missing |
|---|---|---|
| H1, H2 standard integrals | OK | `apply: {op: integrate}` verified by differentiation (`is_antiderivative`), so the constant is free. |
| H3 definite integrals and area under a curve | OK | `apply: {op: integrate, args: [x, a, b]}` and exact comparison. |
| H3 area between two curves | Partial | `solve` for intersections (needs the **system** kind when the two curves are simultaneous) then `integrate` the difference. |
| H4 integration as the limit of a sum | **Gap** | `sum` (`summation`) + `limit`. |
| H5 substitution and integration by parts | OK | The answer is verified as an antiderivative, so the method is deliberately free (PROBLEMS.md: "The verifier proves the mathematics, not the method"). |
| H6 partial fractions then integrate | OK | `apart` + `integrate`. |
| H7 separable first-order differential equations | **Gap** | Add `check.kind: ode` / `apply: {op: dsolve}` (SymPy `dsolve`) and verify a candidate or a particular solution by substitution (`checkodesol`, or `subs` + `equivalent`). |
| H8 interpreting an ODE solution | Prose | |

### I — Numerical methods

| Item | Status | What is missing |
|---|---|---|
| I1 change of sign and locating roots | Partial | `subs`/`evaluate` + `compare` on the signs. A dedicated `sign_change` check would make the intent explicit; not strictly required. |
| I2 simple iteration, cobweb/staircase | **Gap** | Add `apply: {op: iterate, args: [x0, n]}` for the recurrence arithmetic; a tolerance root check needs `nsolve`/`RootOf`. Cobweb/staircase diagrams are prose. |
| I2 Newton–Raphson | **Gap** | Same `iterate`, or `check.kind: approx` with the root and a tolerance (SymPy `nsolve`, `RootOf`). Understanding *failure* is prose. |
| I3 trapezium rule and its bounds | **Gap** | The estimate is a finite sum (`evaluate` can compute it), but comparing an estimate to the exact integral needs a **tolerance** check. Add `check.kind: approx` (`Abs(value - target) < tol`, `evalf`; optionally `scipy.integrate`). `between` proves the answer lies in an interval, which already covers the "limits it must lie between", so only the tolerance comparison is missing. |
| I4 numerical methods in context | Prose | |

### J — Vectors

Component **equality** already works by accident and should be recorded as such:
`Matrix([3, 4])` parses to a `sympy.Matrix` (verified) and `cas.equivalent`
correctly returns True for equal vectors and False for different ones, so
`check.kind: evaluate` can check a vector answer written as `Matrix(...)`.
Magnitudes and directions can likewise be written as scalar expressions
(`sqrt(3**2 + 4**2)`, `atan2(4, 3)`) and checked with `evaluate`. What is missing
is everything that *names* a vector operation, and any vector equation.

| Item | Status | What is missing |
|---|---|---|
| J1 vectors in 2D and 3D | Partial | `Matrix([...])` parses and compares; the bank schema and renderer have no vector answer form. |
| J2 magnitude and direction; component ↔ magnitude/direction | Partial | `evaluate` on a hand-written `sqrt(...)`/`atan2(...)` works; add named `apply: {op: norm}`, `apply: {op: direction}` (SymPy `Matrix.norm`, `atan2`). |
| J3 vector addition and scalar multiplication | Partial | `evaluate` on `Matrix(...)` expressions works; no named op. |
| J4 position vectors and distance | Partial | Distance is `evaluate` on the norm of the difference; no named op. |
| J5 vectors in pure mathematics, forces and kinematics | Gap | Vector **equations** and systems: `parse_equation` splits on `=` and `check.solve` is scalar. Needs the **system** kind over `Matrix` components. |

### K — Statistical sampling

| Item | Status | What is missing |
|---|---|---|
| K1 population/sample, sampling techniques, critique | Prose | Conceptual and evaluative; not CAS-checkable. Counts of a sampling frame could use `evaluate`/`binomial`, but the AO2/AO3 judgement is prose. |

### L — Data presentation and interpretation

| Item | Status | What is missing |
|---|---|---|
| L1 histograms, area = frequency | Partial | Numeric frequency/area is `evaluate`/`between`; interpretation is prose. |
| L2 scatter diagrams, regression lines, correlation | **Gap** | Add `check.kind: correlation` (Pearson $r$) and `regression`. SymPy `stats` or the formula `cov/(sx*sy)`; a pinned `scipy.stats.pearsonr`/`linregress` would be the independent oracle, but scipy is **not installed**. Note the DfE excludes regression-line *calculations* from the AS-bracketed L2, and only requires *interpreting* a given $r$ in O1 — so this is mostly for the book's own worked answers. |
| L3 standard deviation, central tendency, variation | **Gap** | `cas.statistic` has no `std`, `variance`, `quartile1`, `quartile3`, `iqr`, `percentile`. Add them, each with a **declared convention** (PROBLEMS.md: "a statistic is only verifiable once the convention is named"). SymPy: `sympy.stats.StdDev`, `variance`, or exact rational formulas. |
| L4 outliers and data cleaning | Partial | An outlier **rule** (e.g. $1.5 \times \mathrm{IQR}$) is `iqr` + `compare`; the cleaning judgement is prose. |

### M — Probability

| Item | Status | What is missing |
|---|---|---|
| M1 mutually exclusive/independent events | OK | Exact `Rational` arithmetic via `evaluate`/`compare`. `binomial(n, k)` parses. |
| M2 conditional probability formula and trees/Venn/two-way tables | OK | `evaluate`/`compare` on exact fractions; a `conditional` apply op would name the step but is not required. |
| M3 modelling with probability, critiquing assumptions | Prose | |

### N — Statistical distributions

| Item | Status | What is missing |
|---|---|---|
| N1 binomial distribution, probabilities | Partial | Combinatorial exact values work through `evaluate`. A **distribution** check would be stronger and clearer: `check.kind: distribution` with `distribution: binomial`, `n`, `p`, a query (`P(X = k)`, `P(X <= k)`, `P(a <= X <= b)`) and an exact answer. SymPy `sympy.stats.Binomial`, `P`, `cdf` (verified `P(Eq(Binomial(X,10,1/2),5)) → 63/256`). Mean/variance of a discrete random variable is excluded from the AS bracket; `sympy.stats` `E`, `variance` would cover it if an A-level item needs it. |
| N2 the Normal distribution | **Gap** | Add the `distribution` kind with `normal` and `mu`, `sigma`. SymPy `sympy.stats.Normal`/`cdf` returns an `erf` expression (verified `cdf(Normal(Z,0,1))(3/2) → erf(3*sqrt(2)/4)/2 + 1/2`), so exact comparison works but a tolerance check is the robust route. Standardisation $Z = (X-\mu)/\sigma$ is `equivalent`. |
| N3 selecting a distribution with reasoning | Prose / method choice | |

### O — Statistical hypothesis testing

| Item | Status | What is missing |
|---|---|---|
| O1 language of hypothesis testing | Prose | Definitions and terminology. |
| O2 binomial test for a proportion | **Gap** | Add `check.kind: hypothesis` with `distribution: binomial`, `n`, `p0`, `tail: 1|2`, `alpha`, and either a p-value or a critical region. Oracle: exact tail sum `summation` of binomial terms. SymPy `summation`, `binomial`; `scipy.stats.binom` is the alternative but is not installed. |
| O3 Normal test for a mean | **Gap** | Same kind with `normal`, known variance; normal cdf/erf or `scipy.stats.norm`. |
| O1 correlation coefficient against a given p-value/critical value | OK | `compare` (the coefficient is given). |
| Interpreting results in context | Prose | |

### P — Quantities and units in mechanics

| Item | Status | What is missing |
|---|---|---|
| P1 SI and derived units | Partial / units oracle | PROBLEMS.md keeps units out of CAS fields, so only the numeric parts are checkable. SHAPE.md anticipates a physics-style units/ significant-figures oracle but it is **not implemented** under `engine/textbook/verify/oracles/`. For A-level mathematics the numeric route is defensible; a units oracle is optional. |

### Q — Kinematics

| Item | Status | What is missing |
|---|---|---|
| Q1 kinematics language | Prose | |
| Q2 displacement–time and velocity–time graphs | Partial | Gradients and areas are `diff`/`integrate`; interpretation is prose. |
| Q3 constant-acceleration formulae | **Gap** | SUVAT problems are simultaneous equations in several unknowns. Needs the **system** kind (SymPy `solve`, `linsolve`). |
| Q4 calculus in kinematics | OK | `diff`/`integrate`; assert $r$, $v$, $a$ are functions and the variable is $t$. |
| Q5 projectiles under gravity using vectors | **Gap** | Needs vector support (J) plus the **system** kind. |

### R — Forces and Newton's laws

| Item | Status | What is missing |
|---|---|---|
| R1 force and Newton's first law | Prose | |
| R2 Newton's second law $F = ma$ | Partial | Single equation `solve` works; several forces need the **system** kind. |
| R3 weight and $g$ | OK | `evaluate`. |
| R4 third law, equilibrium, pulleys, connected particles, resolving | **Gap** | Systems of linear equations. Needs the **system** kind (SymPy `linsolve`) plus `trig`/angle assumptions. |
| R5 resultant forces and dynamics in a plane | **Gap** | Vector addition (J) or scalar sums (`evaluate`). |
| R6 friction $F \le \mu R$ and limiting friction | Partial | `compare` for the inequality; limiting friction is `solve`/system. |

### S — Moments

| Item | Status | What is missing |
|---|---|---|
| S1 moments in static contexts | Partial | Equilibrium is a system of equations → the **system** kind; the diagram is prose. |

---

## 3. The concrete additions, collected

### New `check.kind`s

1. **`system`** — simultaneous equations. Fields: `equations: [...]`, `variables: [...]`, `answer` (solution tuples). SymPy `solve`, `linsolve`, `nonlinsolve`. Covers B4, B7 intersections, Q3, Q5, R2, R4, S1.
2. **`inequality`** (or a domain-aware `solve`) — inequality solution sets compared as SymPy sets. SymPy `solveset`, `reduce_inequalities`, `Interval`, `Union`, `Complement`. Covers B5.
3. **`distribution`** — named-distribution probabilities. Fields: `distribution: binomial|normal`, parameters, `query`, `answer` (exact or with tolerance). SymPy `sympy.stats.Binomial`, `Normal`, `P`, `cdf`, `E`, `variance`. Covers N1, N2.
4. **`hypothesis`** — a p-value or critical region and the decision. Fields: distribution, parameters, `tail`, `alpha`. SymPy `summation` + `binomial`, or `sympy.stats`; `scipy.stats` if pinned (not currently installed). Covers O2, O3.
5. **`approx`** — a value within a tolerance. Fields: `value`, `target`, `tolerance` (and optionally `relative: true`). SymPy `Abs`, `evalf`, `N`; `nsolve`/`RootOf` for a root. Covers I3, E2, N2, numerical answers to a required accuracy generally.
6. **`correlation` / `regression`** — Pearson $r$ and a least-squares fit, with a tolerance. SymPy `stats` or exact formulas; `scipy.stats` (dependency) as the independent oracle. Covers L2, F6.
7. **`vector`** — named vector operations and a vector answer form. Fields: `op`
   (`add`, `subtract`, `scale`, `dot`, `cross`, `norm`, `unit`, `direction`,
   `distance`) and `answer`. SymPy `Matrix`, `Matrix.norm`, `.dot`, `.cross`,
   `sympy.vector`, `atan2`. Component equality is already covered by `evaluate`
   on `Matrix(...)`; this kind adds the named operations and rendering. Covers
   J2–J5, R5, Q5.
8. **`ode`** — a differential equation and its solution. Fields: `equation`, `dependent`, `independent`, `initial` (optional), `answer`. SymPy `dsolve`, `checkodesol`. Covers H7, F7, G6.

### New `step_relation`

The existing four are enough for the chains A-level uses (`equivalent`,
`solutions`, `implies`, `apply`). The one gap is a named **substitution** or
**solving-for-a-variable** step that is not a plain equivalence; today it must be
expressed as `apply: {op: subs}` or as two chained checks. No new relation is
strictly required, but `step_relation: substitute` (with `apply`) would make the
quadratic-in-a-function and inversion patterns readable.

### New `apply: {op: …}` operations

| op | SymPy facility | Used by |
|---|---|---|
| `limit` | `sympy.limit` | G1 first principles, B7 asymptotes, D5 sum to infinity, H4 |
| `sum` | `sympy.summation` | D3, D4, D5, H4, O2 |
| `series` | `sympy.series` | D1 rational $n$, E2 small angles |
| `rsolve` | `sympy.rsolve` | D2 recurrences |
| `iterate` | repeated `subs` / `nsolve` | I2, D2 |
| `idiff` | `sympy.idiff` (expression set to zero, not `Eq`) | G5 |
| `parametric_diff` | `diff(y,t)/diff(x,t)` | G5 |
| `invert` | `solve(f(x) - y, x)` | B8, G4 |
| `compose` | `.subs` | B8 |
| `eliminate` | `solve` + `subs` | C3 |
| `div` / `rem` | `sympy.div`, `sympy.rem` | B6 |
| `expand_log` / `logcombine` | `sympy.expand_log`, `sympy.logcombine` | F4 |
| `expand_trig` / `fu` | `sympy.expand_trig`, `sympy.simplify.fu` | E6 |
| `harmonic` | `sqrt(a**2+b**2)`, `atan2(b, a)` | E6 R-form |
| `dsolve` | `sympy.dsolve`, `sympy.checkodesol` | H7, F7 |

`apart` already exists and covers partial fractions; `trigsimp` and `simplify`
cover identity proofs; `rationalize` covers surds.

### `statistic` additions

`std` (sample and population distinguished), `variance`, `quartile1`,
`quartile3`, `iqr`, `percentile`, each with a **named convention** in the check —
PROBLEMS.md already requires this. SymPy `sympy.stats.StdDev`/`variance` or exact
rational formulas.

### Set and domain handling

- `check.solve` and any new `inequality` check must accept a `domain`/`interval`
  and compare general SymPy sets, not only `FiniteSet`.
- A `ConditionSet` should be reported as **"unknown"**, not as a wrong answer
  (PROBLEMS.md notes this distinction for the GCSE spike; it matters more here).
- Keep the default domain `S.Reals`; do not introduce `S.Complexes` (Further
  Mathematics only).

### Dependencies

- `scipy` is not installed. If `scipy.stats` is the chosen oracle for normal
  probabilities, hypothesis tests and correlation, it must be added to the
  engine's dependencies (or those checks must be written with `sympy.stats` and
  `evalf`, accepting `erf` expressions).

---

## 4. Unverifiable by a CAS at all

These must be covered by human review and by the pedagogy audit, not by the
verifier. Listing them explicitly stops a bank from pretending otherwise:

- **Proof structure** — the logical packaging of a deduction; proof by
  contradiction; "these cases exhaust the domain"; the *choice* of a proof method.
  (Proof by induction is Further Mathematics, not A-level Mathematics.)
- **"Show that" questions** — the answer is given; the verifier can check the
  algebra of the route (`equivalent`) but cannot certify that the stated result
  follows from the named assumptions in the way a mark scheme wants.
- **Method choice** — PROBLEMS.md: "A correct answer reached by an unexpected
  method passes", which is right for marking but means the bank cannot assert
  "use the quadratic formula here". Much of AO2 and all of the "decide on the
  solution strategy" aim is outside the verifier.
- **Graph work** — sketching, gradients-by-eye, areas-by-eye, interpreting a
  displacement–time or velocity–time graph, cobweb/staircase diagrams, graph
  transformations as pictures.
- **Modelling and evaluation** — simplifying assumptions, limitations,
  refinements, critiquing a model, choosing an appropriate distribution, the
  likely effect of more realistic assumptions (OT3, N3, M3, K1).
- **Data work** — sampling critique, data cleaning decisions, outlier judgement,
  interpreting a correlation coefficient, familiarity with the Large Data Set.
- **Communication** — explaining reasoning, using notation correctly, interpreting
  a solution "in context".

---

## 5. Definition of done before A-level problems can be verified

A concrete checklist for whoever implements this (all of it is a change under
`engine/textbook/verify/`, which was out of scope here):

- [ ] Add `system` and confirm it handles one linear + one quadratic (exact
      solution tuples, order-insensitive).
- [ ] Extend `solve` with a `domain`/`interval` and general set comparison;
      treat `ConditionSet` as unknown.
- [ ] Add `inequality` (or the set-aware `solve`) and test `-3 < x <= 2` style
      answers as an `Interval`.
- [ ] Add `vector` named ops (`dot`, `cross`, `norm`, `unit`, `direction`) and a
      vector answer form; note that `Matrix([...])` equality already works through
      `evaluate`.
- [ ] Add `ode` via `dsolve` plus a substitution-based particular-solution check.
- [ ] Add `limit`, `sum`, `series`, `rsolve`, `iterate`, `idiff`,
      `parametric_diff`, `invert`, `compose`, `eliminate`, `div`/`rem`,
      `expand_log`/`logcombine`, `expand_trig`/`fu`, `harmonic`.
- [ ] Add `statistic` values `std`, `variance`, `quartile1`, `quartile3`, `iqr`,
      `percentile` with declared conventions; test sample vs population.
- [ ] Add `approx` with absolute and relative tolerance; use it for the trapezium
      rule, Newton–Raphson and normal probabilities.
- [ ] Add `distribution` and `hypothesis`; decide `sympy.stats` + `erf` versus a
      pinned `scipy` (and if scipy, add the dependency and a test that it is
      available).
- [ ] Add `correlation`/`regression` with a tolerance, or explicitly record that
      the book's regression answers are not machine-verified.
- [ ] Keep `parse_expression`'s SymPy name resolution (`binomial`, `factorial`,
      `exp`, `log`, `sqrt`, trig) — it is already sufficient; add only what is
      missing, do not change the transforms.
- [ ] Extend `PROBLEMS.md` "What can be verified, and how" with the new rows, so
      authors and CI share one vocabulary.
