# What a physics verification oracle must do

Companion to `PROBLEMS.md` and `SHAPE.md` § "What a new book requires". This is
the part that decides whether a physics problem bank can be *proved* in CI or
only eyeballed. Written 2026-10-11 against the repository as it stands.

## 1. What actually exists today (measured, not assumed)

`SHAPE.md` says "A book that uses a different verification oracle ... declares
it in `book.yaml → oracles`. Adding an oracle is a new module under
`engine/textbook/verify/oracles/`, registered by check kind."

**That directory does not exist.** Measured:

```bash
$ ls engine/textbook/verify/
cas.py  __init__.py  __main__.py  render.py  verify.py     # no oracles/
$ ls engine/textbook/verify/oracles/
ls: cannot access 'engine/textbook/verify/oracles/': No such file or directory
$ grep -rn 'oracles' engine/ tests/ scripts/
engine/textbook/__init__.py:9:* :mod:`textbook.verify` — the problem-bank verifier and its oracles;
engine/textbook/book.py:4:subject, the profiles it builds, the verification oracles its banks may use, its
engine/textbook/book.py:167:    oracles: tuple[str, ...] = ("sympy",)
engine/textbook/book.py:283:        oracles=tuple(data.get("oracles", ("sympy",))),
```

So `oracles` is **declarative only**: `Book.oracles` is parsed and stored and
then read by nothing. There is no oracle registry, no loader, and no dispatch
by oracle. `book.yaml → oracles: [sympy]` in `books/gcse-maths/book.yaml` is
inert today. The seam is aspirational, and a physics oracle is a *new
subsystem*, not a follow-the-path change.

The real dispatch is two hard-coded chains in `verify/verify.py`:

- `_verify_steps` (line 72): `relation ==` `solutions` / `implies` / `apply` /
  else `equivalent`.
- `_verify_check` (line 144): `kind ==` `all`, `evaluate`, `solve`, `rounded`,
  `apply`, `statistic`, `between`, `compare`, then "unknown kind".

`verify/__main__.py` always calls `verify_bank`, with no oracle argument. The
one SymPy boundary is `verify/cas.py`. `verify/render.py` renders a step from
`expr` / `equation` / `text` and an answer from `answer_text` or
`check.answer`. `tests/test_problem_bank.py` asserts every bank verifies, and
plants errors to prove the verifier bites.

**Consequence for the plan.** The clean version of the physics work is to make
the seam real first: move the two `if`-chains into `verify/oracles/sympy.py`,
keep `cas.py` as the boundary it imports, add a registry keyed by check kind,
and have `verify.py` select the oracle(s) named by the book (or the bank).
Only then does "add a physics oracle" mean what `SHAPE.md` says. Doing it the
other way — bolting physics kinds into the existing chain — produces exactly the
"one dispatch point" the repo says it wants to avoid, and `PROBLEMS.md`'s
"Modularity" section would become false.

## 2. What the mathematics oracle already gives physics for free

These are directly reusable and a physics oracle should not reimplement them:

| Existing kind | Physics use |
|---|---|
| `evaluate` | substitute values into a rearranged equation; the numeric answer |
| `compare` | inequalities, e.g. "the resultant is less than the weight" |
| `between` (in `cas.py`: `low < value < high`) | the right primitive for **rounding tolerance** and **uncertainty bands** |
| `rounded` (`is_nearest_multiple`) | a value is the nearest multiple of a step — the seed of a significant-figures check |
| `apply` (`diff`, `integrate`, `subs`, `simplify`, `factor`, …) | rearrangement, proportional reasoning, graphical-calculus facts |
| `solve` | kinematic equations, decay equations |
| `statistic` | means of repeated readings |
| `all` | **compose** several physics checks on one problem (already works, recursing) |

Two properties of `cas.py` matter for physics and must be preserved:

- `_rationalize` turns floats into exact rationals before comparison
  (`0.65 → 13/20`). That is why `0.65` compares cleanly, and why a rounded
  physics answer must be checked against a *declared rounding*, not by float
  equality.
- `parse_expression` uses `implicit_multiplication_application` and
  `convert_xor`. Physics notation like `1.6e-19` parses; but `e` is Euler's
  number in SymPy, so `E = mc^2` with a bare `e` is a trap. There is no
  quantity-with-unit type, so **units must not enter the CAS string** — which
  `PROBLEMS.md` already requires ("Keep units, words and `%` out of the CAS
  fields").

## 3. What a physics oracle must add

Five kinds of check the maths oracle cannot express, plus one content check.

### 3.1 Unit-carrying quantities and dimensional checks

A quantity is a number and a dimension vector over the SI base units
(m, kg, s, A, K, mol, cd). The oracle must:

- carry dimensions through multiply, divide and integer powers;
- multiply/divide magnitudes;
- convert prefixes exactly (`cm³ → m³` is `1e-6`);
- check a stated answer's dimensions, and check that both sides of a rearranged
  equation are dimensionally consistent — an independent check the CAS cannot
  give, because `F = ma` and `F = m/a` are both dimensionally *wrong* in
  distinguishable ways but neither is a symbolic falsehood about numbers.

Sketch (units declared beside the CAS, never inside it):

```yaml
check:
  kind: dimensions
  quantity: {symbol: F, dimensions: [kg, m, s^-2]}   # or a derived-unit string "N"
  consistency: "F = m * a"        # both sides must share a dimension vector
```

SymPy has `sympy.physics.units`, but it is a conversion system, not a
significant-figure system, and it will happily report `N` for a dimensionally
coherent but physically absurd result. The oracle should use it (or a small
hand-rolled dimension algebra) for conversions and keep dimensional *decisions*
in the bank.

**Closed.** `kind: dimensions` evaluates a fixed set of real-valued functions
over quantities, so a unit-carrying magnitude written
`sqrt(vx**2 + vy**2)` is checked with its dimension instead of being worked
around with `resolve` or `vector`. `sqrt` halves every exponent, so the result
still has an integer dimension vector and an odd power fails loudly. A root of
an imperfect square stays exact in SymPy and is compared within the declared
tolerance; every other value stays an exact rational.

### 3.2 Significant figures and rounding-once

Physics marking is not "is the number equal" but "is the number reported to the
right precision, using one rounding at the end". The oracle must let a bank
declare:

```yaml
check:
  kind: sigfigs
  value: "0.0038695652173913047"   # exact, from _rationalize
  figures: 3
  answer: "0.00387"
  convention: round-once            # not "round at every step"
```

and, for a value quoted to the least accurate measurement:

```yaml
check:
  kind: sigfigs
  value: "1234.567"
  figures: 2
  answer: "1.2e3"                   # trailing-zero policy must be explicit
```

Points the oracle must get right:

- **Trailing zeros are a convention, not a number.** `340` and `3.4 × 10²`
  differ in significant figures; a YAML string can express that and a float
  cannot. Take the answer as a string.
- **`rounded` is not enough.** `is_nearest_multiple(value, rounded, step)`
  proves the answer is the nearest multiple of a step. "3 significant figures"
  is a *different* claim, and the two disagree for large numbers. Add the new
  kind; do not overload `rounded`.
- **Round once.** The DfE A-level requirement is explicit (Appendix 6c,
  C.1.1): "understand that calculated results can only be reported to the
  limits of the least accurate measurement". A bank that checks intermediate
  roundings would enforce the wrong method.

**Closed.** `sigfigs.value` may be a symbolic expression that is not an exact
rational, such as $g = 4\pi^2 L/T^2$. It is evaluated to high precision, and the
declared rounding must hold across the declared `tolerance`, so the answer is
proved rather than pre-rounded by hand. A symbolic value with no tolerance is
refused, because its rounding would be ambiguous.

### 3.3 Uncertainty propagation

The oracle must model the two combining rules and the two quoting conventions,
because the boards differ and the difference is examinable:

```yaml
check:
  kind: uncertainty
  value: "4.9"
  absolute: "0.1"          # or percentage: "2"
  combine: add-absolutes   # add | Δx | + | Δy | ; or add-percentages for × ÷ powers
  mean_of: [ "1.02", "0.98", "1.01" ]   # repeated readings → range/2 or half-range
  convention: half-range
```

- Sums and differences → add absolute uncertainties.
- Products, quotients and powers → add percentage uncertainties (or fractional
  uncertainties multiplied by the power).
- A mean of repeats → the board's convention (half-range is the common one at
  A-level; OCR's Appendix 5e and Edexcel's Appendix 10 differ in wording).

This is exactly `PROBLEMS.md`'s "conventions must be declared" point applied to
physics: `propagation` is only verifiable once the rule is named, and the
booklet/pages should state the rule the book teaches. The check should
`between`-verify the *band* rather than assert a single uncertainty, so a
tolerance is explicit.

**Closed.** `add-percentages` takes the magnitude of each term's percentage
contribution, so a quotient written with a negative power — the natural
$g = L/T^2$ — adds the same positive percentage as the reciprocal form, and the
uncertainty is never negative. The check still fails a record that under-counts
or over-counts the contribution.

### 3.4 Vector resolution

`kind: resolve`, with `between`-based tolerance for arbitrary angles and exact
trig for nice ones:

```yaml
check:
  kind: resolve
  magnitude: "25"
  angle_deg: "30"
  components: {x: "21.7", y: "12.5"}
  relation: components-from-magnitude-and-angle
```

and the inverse (components → magnitude and direction, using Pythagoras and
`atan`). The curriculum anchor is DfE A-level Appendix 6c C.4.1–C.4.7
(Pythagoras, sin/cos/tan, degrees↔radians, small-angle approximations) and
GCSE Appendix 3 §5 (angular measures in degrees; "use vector diagrams to
illustrate resolution of forces ... (scale drawings only)"). Scale-drawing
answers are a `between` check on the drawn components, not a symbolic one.

### 3.5 Graphs and graphical calculus

`kind: gradient`, `kind: intercept`, `kind: area`:

```yaml
check:
  kind: gradient
  series: [[0.0, 0.0], [0.2, 0.98], [0.4, 1.96]]
  between: [4.7, 5.1]          # acceleration from a v–t graph
```

This covers C.3.4–C.3.9 (slope and intercept of a linear graph; tangent as a
rate of change; area under a curve, e.g. energy stored on a capacitor). It is
necessarily numeric and tolerant: reading a value off a graph is a measurement,
not a symbolic equality. Keep it interval-based.

### 3.6 The equations-sheet content check (no CAS)

This is the physics analogue of the `:::answers` coverage test. A physics
problem should be able to declare which sheet equation it uses, and CI should
assert that the book's booklet carries that item with the right `provision` for
the book's boards:

```yaml
# bank
check:
  kind: evaluate
  expression: "..."
  answer: "..."
plays: aqa-8463-eq-kinetic-energy      # must exist in the booklet, as `given`
```

A page that teaches a `given` equation as `know`, or a `know` item as `given`,
is the content bug `BOOKLETS.md` names. Making it machine-checkable is the
single highest-value physics-specific addition after units.

## 4. What a CAS cannot do, and what to do instead

The mission names three: explaining a graph's shape, describing a method, and
evaluating a conclusion. None is symbolically provable. The honest design is a
**structured check that is verifiable as content**, plus human review of the
physics, exactly as `PROBLEMS.md` treats proofs:

| Case | What CI can prove | What stays human |
|---|---|---|
| Graph shape ("the curve flattens as the temperature difference falls") | that the model answer names the required concept(s), via a `concepts: [...]` list; that any numbers quoted in it pass `between`/`evaluate` | that the explanation is physically right |
| Method ("measure mass, measure Δθ, use E = mcΔθ") | that the required steps and apparatus ids are present and correctly ordered (`method: [{step, id}]`) | that the method works and is safe |
| Conclusion ("resistance increased because the gradient of V against I increased") | that the answer cites the right evidence from a declared dataset and the right criterion | that the judgement follows |
| Definitions | nothing in the CAS; a `definition:` field with a `concept:` id checked against the specification reference | wording quality |
| Required practicals / apparatus | that the required-practical id and DfE/board technique ids are covered (a coverage test over the bank, like `test_markers.py`) | that the practical is taught well |

So add, alongside the numeric oracle, a small **content** check kind:

```yaml
check:
  kind: structured
  requires: [mc-delta-theta, measure-temperature-change]
  concepts: [specific-heat-capacity]
```

`structured` proves presence and coverage, renders the model answer, and never
pretends to prove physics. Anything not expressing a numeric or dimensional
claim should carry it, so a bank cannot silently assert an unverifiable claim
in a `check` field that the verifier then ignores.

**Explicitly out of scope for the oracle** (must remain human / lint):

- whether a method is the best method (`PROBLEMS.md`: "the verifier proves the
  mathematics, not the method");
- whether a graph's shape explanation is correct;
- whether a conclusion is warranted;
- whether a chosen uncertainty convention matches the board's mark scheme
  (there is no machine-readable mark scheme);
- whether an equation marked `know` in the booklet is right for the board —
  that is the equations-sheet check of §3.6, and it needs the booklet as data.

## 5. A concrete build order

1. **Make the seam real.** Create `engine/textbook/verify/oracles/` with a
   registry. Move the SymPy chain into `oracles/sympy.py` (importing the
   unchanged `cas.py`). `verify.py` keeps `Report`/`BankReport` and delegates.
   A test pins the check-kind → oracle table, the way
   `tests/test_render_hooks.py` pins the hook order.
2. **Wire the selector.** Read `Book.oracles` (and allow a per-bank override)
   and fail loudly on an unknown oracle — the same "loud failure" discipline as
   an unknown `:::figure` slug. `verify/__main__.py` gains `--oracle` only if a
   bank can need more than one.
3. **Add the units oracle** (§3.1) with the dimensions kind and prefix
   conversion. This is what makes `book.yaml → oracles: [sympy, units]` true.
4. **Add sig-figs (§3.2), uncertainty (§3.3), vectors (§3.4), graphs (§3.5)**
   as check kinds in the units/physics oracle, composing via the existing
   `all`.
5. **Add the structured/coverage kind (§4)** and the equations-sheet coverage
   test (§3.6), the latter reading `books/<id>/booklet/*.yaml`.
6. **Teach `render.py` to render quantities with units** in plain text/HTML —
   never `$...$` injected at runtime (the maths hook runs at build time).

Each step is additive and testable; none touches the maths bank's behaviour.

## 6. Honest limits of the result

- The verifier proves arithmetic and dimensions, **not physics**. A
  dimensionally consistent, arithmetically correct, physically absurd answer
  passes.
- A correct answer by an unexpected route passes (`evaluate`, `between`), which
  is right for marking and means the bank cannot assert "use this method".
- Uncertainties and significant figures are verifiable only against a
  **declared convention**; the oracle enforces the convention, not the board's.
- Graph shape, method and conclusion are structural checks plus human review.
- The whole apparatus rests on banks being authored; a page can still carry
  prose that the bank never checks. That gap is a lint/review matter, not
  something a CAS can close.
