# PROBLEMS — a verifiable problem bank

**Goal.** Keep the mathematics of the book in a structured form we can *prove*
correct in CI, so a wrong worked step cannot ship. The rendered page and the
verified data must not drift.

**Status.** Working spike: `books/gcse-maths/problems/*.yaml`, `engine/textbook/verify/`, `tests/`. Verified
by `python -m textbook.verify books/gcse-maths/problems/` and `pytest tests/`.

## The design in one line

Separate **content** (what the reader sees) from **verification** (the CAS-checkable
mathematics), join them by a stable id, and make each solution step declare *how*
it relates to the next so a machine can check it.

```
books/gcse-maths/problems/<chapter>.yaml     # the bank: statement + CAS check + steps
engine/textbook/verify/               # SymPy boundary, schema, verifier
tests/test_problem_bank.py  # every bank verifies; planted errors must fail
```

## Bank schema (v1)

```yaml
chapter: 1
symbols:                     # declared once per bank; assumptions matter
  x: {real: true}
problems:
  - id: ch1-order-of-operations        # stable, referenced from pages
    section: "1.4"
    tier: F
    dfe: [N3]
    statement: "Work out $3 + 2 \\times 4$."   # what the reader sees
    check:                                     # independent check of the answer
      kind: evaluate
      expression: "3 + 2 * 4"                  # CAS form, no units or words
      answer: "11"
    steps:                                     # optional worked solution
      - expr: "3 + 2 * 4"
      - expr: "3 + 8"
      - expr: "11"
```

`check.kind ∈ {evaluate, solve, compare, rounded, between, apply, statistic, all}`.
`step_relation ∈ {equivalent, solutions, implies, apply}` (default `equivalent`).
`all` wraps a list of sub-checks; `between` proves a value lies in an interval;
`rounded` proves an answer is the nearest multiple of a required step; `apply`
names a CAS operation (`diff`, `integrate`, `subs`, `simplify`, `factor`, ...);
`statistic` computes an exact summary statistic.

## How a page gets its answers

There is no runtime lookup and no client-side problem engine. Injection is a
**build-time** step:

1. `renderers/mkdocs/hooks/problems.py` runs MkDocs's `on_page_markdown` event.
2. It finds the line-anchored directive `:::answers <bank>` and reads the YAML
   bank from disk with PyYAML.
3. `engine/textbook/verify/render.py` turns the selected records into markdown.
4. The maths hook then renders the `$...$` in that markdown to MathML.
5. The result is static HTML. The browser never fetches the bank.

The substitution is a marker expansion, but it is not ad-hoc:

- it is **fence-aware** (`hooks/_fences.py`): a marker shown inside a code fence
  is left alone;
- it **fails loudly** on an unknown bank, an empty selection, or an unknown
  figure slug;
- a **coverage test** (`tests/test_markers.py`) walks every page and asserts that
  every `:::answers` bank and every `:::figure` slug exists;
- the expansion itself is **tested** (expansion outside fences, verbatim inside,
  loud failure), so the transport is covered, not assumed.

The only client-side fetch in the book is the formulae booklet's JSON, which is
a UI resource, not part of problem verification.

## Beyond GCSE: calculus and statistics

The model generalises by naming the operation a step performs, rather than only
asserting equality:

```yaml
steps:
  - expr: "x*sin(x)"
  - expr: "sin(x) + x*cos(x)"
    relation: apply
    apply: {op: diff, args: [x]}
```

- **Differentiation** is a `apply: {op: diff}` rewrite; the verifier checks
  `next == d/dx(previous)`.
- **Indefinite integration** is verified by differentiation, so the constant of
  integration is free: `is_antiderivative(answer, integrand)`.
- **Definite integration** uses `apply: {op: integrate, args: [x, lower, upper]}`
  and compares the exact value.
- **Substitution, factorising, partial fractions** are `apply: subs | factor |
apart | ...`.

Statistics is not a symbolic problem, so its oracle is an independent exact
computation, not SymPy solving:

- summary statistics use exact rational arithmetic (`statistic` check);
- probability and combinatorics use exact fractions (`binomial(5,2)/2**5 = 5/16`);
- finite sample spaces can be **enumerated** and counted, which is a stronger
  oracle than re-applying a formula;
- work exact arithmetic cannot reach (normal, Poisson, chi-squared) should pin a
  library such as `scipy.stats` as the oracle;
- **conventions must be declared**: quartiles and IQR differ between methods, so
  a statistic is only verifiable once the convention is named.

What remains unverifiable by a CAS: the **logic** of a proof (induction
scaffolding, epsilon–delta), the **choice** of method, and prose reasoning. The
verifier proves the algebra, not the argument; a human review still covers the
rest.

## Rendering the problems and answers

No page restates a problem or an answer by hand. The page carries two markers:

- `:::problems <bank>` prints the numbered question list (`**H**` marks
  Higher-only items);
- `:::answers <bank>` prints the solutions (or `#<id>,<id>` to select records).

`renderers/mkdocs/hooks/problems.py` expands both, at build time, from the same
records CI verified, using `engine/textbook/verify/render.py`. The block is emitted as
markdown with `$...$` maths, so the maths hook renders it to MathML in the same
pass. The reader therefore sees exactly what `python -m textbook.verify` proved, and
the page and the proof cannot drift.

## What can be verified, and how

| Case | Relation | SymPy check |
|---|---|---|
| Simplify / expand / factor / collect | `equivalent` | `simplify(a - b) == 0`, else `a.equals(b)` |
| Solve an equation | `solutions` | `solveset(eq_a, x, Reals) == solveset(eq_b, x, Reals)` |
| Numeric evaluation | `evaluate` | `equivalent(expression, answer)` over exact rationals |
| Ordering / inequalities | `compare` | `Lt/Le/Gt/Ge` is `S.true` |
| Squaring both sides, multiplying by an unknown | `implies` | solution set must be a *superset*; verifier warns about extraneous roots |
| Rounding | `rounded` | answer is the nearest multiple of the required step |
| Geometry | numeric | coordinates + tolerance, or symbolic lengths |

Decimals are **rationalised** (`0.65 → 13/20`) before comparison so results are
exact and `simplify` behaves. This is why the bank keeps units out of the CAS
form: `£`, `p` and `%` belong in `statement`, not in the expression.

## What this does *not* prove

- **Pedagogy.** That a step is the best next move, or matches the method taught.
  We verify the mathematics, not the teaching.
- **Reversibility.** Squaring and multiplying by a variable can add roots; those
  steps need the `implies` relation and an explicit extraneous-root check.
- **Domains.** `sqrt(x**2) = |x|`, not `x`. Every bank must declare assumptions
  (`x: {real: true, positive: true}`) or the verifier will reject a valid step or
  accept an invalid one.
- **Method equivalence.** A correct answer reached by an unexpected method passes
  the `evaluate`/`solve` check — which is right for marking, but means the bank
  cannot assert "use the quadratic formula here".
- **Word problems.** The translation from prose to algebra is not verifiable; only
  the algebra after it is.

## Modularity

- **One CAS boundary.** All SymPy use is in `engine/textbook/verify/cas.py`. Swapping to
  SymEngine (speed) or to a JS CAS for client-side marking touches one module.
- **One dispatch point.** `check.kind` and `step_relation` are looked up in one
  function, so new problem types are additive.
- **Data, not code.** The bank is YAML; authors add problems without touching
  Python. CI runs the verifier; a planted error fails the build (tested).
- **Same answer, two consumers.** The build-time bank is the oracle; a future
  client-side checker (mathjs/nerdamer, per `HANDOFF.md` §4) can consume the same
  `answer`, with the bank as the authority rather than the browser.

## Integration with the book

Phase 1 (this spike): the bank is additive and tested; markdown pages still hold
their own prose. A coverage test can assert every banked problem is referenced
from a page and that the page's stated answer matches the bank.

Phase 2: generate the "Answers and concise solutions" block (and worked
examples) from the bank, so the reader sees exactly what CI verified.

Phase 3: drive client-side input checking from the same answers.

## Research notes

- **SymPy 1.14** is the right build-time CAS: `parse_expr` with
  `implicit_multiplication_application` handles GCSE notation (`2x`, `(x+3)(x-4)`);
  `solveset` returns a `Set` and a `ConditionSet` when it cannot fully solve, so
  "unknown" is distinguishable from "wrong"; the assumptions system makes domain
  handling explicit.
- **Prior art** for marking, with the same server constraint as us: STACK (Maxima)
  and WeBWorK are server-side and are ruled out by `HANDOFF.md` D1; **Numbas 10**
  marks mathematical expressions client-side with its own CAS and is the closest
  published model for a static site, at the cost of a large runtime.
- **`mathsteps`** generates human-readable solution steps in JS; useful as a
  cross-check or for hint generation, but it is a generator, not an oracle.
- The briefing's warning applies: robust symbolic equivalence for arbitrary
  student input is hard, so the bank should prefer numeric/structured answers
  where exact semantics are ambiguous.

## Reproduce

```bash
uv sync
python -m textbook.verify books/gcse-maths/problems/     # per-problem report
pytest tests/ -q                     # bank verifies + planted errors fail
```

CI runs the same commands, builds both book profiles strict, and fails if any
page contains a `math-error` span (see `.github/workflows/verify.yml`).
