# PROBLEMS — a verifiable problem bank

**Goal.** Keep the mathematics of the book in a structured form we can *prove*
correct in CI, so a wrong worked step cannot ship. The rendered page and the
verified data must not drift.

**Status.** Working spike: `problems/*.yaml`, `verification/`, `tests/`. Verified
by `python -m verification problems/` and `pytest tests/`.

## The design in one line

Separate **content** (what the reader sees) from **verification** (the CAS-checkable
mathematics), join them by a stable id, and make each solution step declare *how*
it relates to the next so a machine can check it.

```
problems/<chapter>.yaml     # the bank: statement + CAS check + steps
verification/               # SymPy boundary, schema, verifier
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

`check.kind ∈ {evaluate, solve, compare, rounded, between, all}` today.
`step_relation ∈ {equivalent, solutions, implies}` (default `equivalent`).
`all` wraps a list of sub-checks; `between` proves a value lies in an interval;
`rounded` proves an answer is the nearest multiple of a required step.

## Rendering the answers

No page restates an answer by hand. The page carries a marker,
`:::answers <bank>` (or `:::answers <bank>#<id>,<id>`), and
`renderers/mkdocs/hooks/problems.py` expands it, at build time, from the same
records CI verified. The block is emitted as markdown with `$...$` maths, so the
maths hook renders it to MathML in the same pass. The reader therefore sees
exactly what `python -m verification` proved, and the two cannot drift.

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

- **One CAS boundary.** All SymPy use is in `verification/cas.py`. Swapping to
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
python -m verification problems/     # per-problem report
pytest tests/ -q                     # bank verifies + planted errors fail
```

CI runs the same commands, builds both book profiles strict, and fails if any
page contains a `math-error` span (see `.github/workflows/verify.yml`).
