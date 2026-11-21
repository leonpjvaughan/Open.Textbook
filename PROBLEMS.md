# Problem banks (`books/<id>/problems/*.yaml`)

All worked answers and practice solutions live in YAML banks verified by `python -m textbook.verify` (SymPy + units oracles) and injected at build time via `:::problems <bank>` and `:::answers <bank>` (or `<bank>#id1,id2`).

## Schema

```yaml
chapter: 1
symbols:                        # declared once per bank; domain assumptions matter
  x: {real: true}
problems:
  - id: ch1-order-of-operations # stable id
    section: "1.4"
    tier: F                     # F or H (per book tier_axis)
    refs: [N3]
    plays: aqa-planck           # optional: booklet item id (must be given/question on >=1 board)
    statement: "Work out $3 + 2 \\times 4$."
    check:
      kind: evaluate
      expression: "3 + 2 * 4"   # pure CAS expression — no units, £, or %
      answer: "11"
    steps:                      # optional worked solution
      - expr: "3 + 2 * 4"
      - expr: "3 + 8"
      - expr: "11"
```

- `step_relation ∈ {equivalent, solutions, implies, apply}` (default `equivalent`). `implies` requires a superset and warns on extraneous roots.
- Decimals are rationalised (`0.65 → 13/20`) for exact symbolic comparison; keep units/currency in `statement`, never in CAS fields.
- Books declare allowed oracles in `book.yaml → oracles:` (`[sympy]` or `[sympy, units]`); a bank may override with top-level `oracles:`.

## Oracles and check kinds

Pinned by `engine/src/textbook/verify/oracles/__init__.py → KIND_ORACLE` and `tests/test_verify_oracles.py`.

### `sympy` (`engine/src/textbook/verify/oracles/sympy.py`)

| Kind | Checks |
|---|---|
| `evaluate` | Exact symbolic/rational equivalence of `expression` and `answer` |
| `solve` | `solveset` match (supports `interval: [lo, hi]`, `domain`, `FiniteSet`/`Interval`/`Union`; `ConditionSet` warns as unknown) |
| `compare` | `Lt`/`Le`/`Gt`/`Ge` is `S.true` |
| `rounded` | Nearest multiple of required step |
| `between` | Value lies in declared interval |
| `approx` | `Abs(value - target) <= tolerance` (absolute or relative) |
| `apply` | Named rewrite: `diff`, `integrate`, `subs`, `factor`, `apart`, `simplify`, `limit`, `sum`, `series`, `rsolve`, `iterate`, `idiff`, `parametric_diff`, `invert`, `compose`, `eliminate`, `div`, `rem`, `expand_log`, `logcombine`, `expand_trig`, `fu`, `harmonic`, `dsolve` (`dsolve`/`rsolve` verify by substitution / closed form) |
| `system` | Simultaneous equations via `nonlinsolve` (order-insensitive tuple/dict set) |
| `inequality` | `reduce_inequalities` set vs `Interval` |
| `vector` | `Matrix` ops (`add`, `subtract`, `scale`, `dot`, `cross`, `norm`, `unit`, `direction`, `distance`) |
| `ode` | `checkodesol` by substitution |
| `statistic` | Exact rational summary stats (`std`/`variance` require `convention: sample|population`; quartiles/IQR require `linear|nearest_rank|exclusive|inclusive`; `percentile` requires `linear|nearest_rank`) |
| `distribution` | `sympy.stats` `binomial`/`normal` with query `exactly|at_most|at_least|between` (decimals need `tolerance`) |
| `hypothesis` | Exact tail probability (`left|right|two`), `p_value` and/or `critical_region`, `decision` at `alpha` (`comparison: lt|le`) |
| `correlation` / `regression` | Exact Pearson $r$ and least-squares `gradient`/`intercept` (optional `tolerance`) |
| `all` | List of sub-checks, all must pass |

### `units` (`engine/src/textbook/verify/oracles/units.py`)

| Kind | Checks |
|---|---|
| `dimensions` | SI base-vector consistency (`F = m * a`), dimensional arithmetic, or declared SI conversion |
| `convert` | Exact prefix/power unit conversion (`100 cm^3 = 0.0001 m^3`) with matching dimensions |
| `sigfigs` | Exact value and answer as strings; single final rounding (`convention: round-once`, half away from zero) |
| `uncertainty` | Band via `combine: add-absolutes|add-percentages` or `mean_of` (`half-range|full-range|standard-deviation|standard-error`) |
| `resolve` | Physics vector magnitude/angle ↔ components within tolerance |
| `gradient` / `intercept` / `area` | Least-squares / trapezium graph reading against closed interval or tolerance |
| `structured` | Model answer contains declared `requires` steps in order and covers `concepts` |

## Build-time rendering & limits

- `engine/src/textbook/hooks/problems.py` + `verify/render.py` expand `:::problems` / `:::answers` (fence-aware via `_fences.py`) before the KaTeX maths hook; unknown banks/ids fail loudly. `tests/test_markers.py` checks every page.
- Physics quantities render as plain text/HTML (`render_quantity`, `render_quantity_html`), never runtime `$...$`.
- **Limits:** Verification proves algebra, arithmetic, dimensions, and declared conventions — not pedagogy, physical plausibility, proof logic, or prose-to-algebra translation. Always declare domain assumptions (`x: {real: true, positive: true}`) so `sqrt(x**2)` behaves cleanly.

## Commands

```bash
uv run python -m textbook.verify                     # verify all banks
uv run python -m textbook.verify books/<id>/problems/
uv run python -m pytest tests/test_problem_bank.py tests/test_verify_oracles.py -q
```
