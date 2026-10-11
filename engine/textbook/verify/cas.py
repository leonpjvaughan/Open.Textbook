"""Symbolic parsing and comparison helpers for the problem bank.

The bank stores a CAS-parseable expression alongside the human-readable
statement, so a problem can be verified independently of how it is rendered.
"""

from __future__ import annotations

import re
from typing import Iterable

import sympy
from sympy import Eq, FiniteSet, S, simplify, solveset
from sympy.parsing.sympy_parser import (
    convert_xor,
    implicit_multiplication_application,
    parse_expr,
    standard_transformations,
)
from sympy.simplify.fu import fu as _fu
from sympy.stats import Binomial, Normal, P as Probability

TRANSFORMS = standard_transformations + (
    convert_xor,
    implicit_multiplication_application,
)

RELATIONS = {
    "<": sympy.Lt,
    "<=": sympy.Le,
    ">": sympy.Gt,
    ">=": sympy.Ge,
    "=": sympy.Eq,
    "!=": sympy.Ne,
}


def make_symbols(spec: dict | None) -> dict:
    symbols = {}
    for name, assumptions in (spec or {}).items():
        symbols[name] = sympy.Symbol(name, **(assumptions or {}))
    return symbols


def _rationalize(expr):
    """Turn floats into exact rationals so comparisons are not lossy.

    ``0.65`` becomes ``13/20``; ``simplify`` then works over the rationals.
    """
    return expr.replace(
        lambda node: node.is_Float if hasattr(node, "is_Float") else False,
        lambda node: sympy.Rational(str(node)),
    )


def _parse(text, local: dict):
    expr = parse_expr(
        str(text),
        local_dict=dict(local),
        transformations=TRANSFORMS,
        evaluate=True,
    )
    return _rationalize(expr)


def parse_expression(text, symbols: dict):
    return _parse(text, symbols)


def parse_equation(text, symbols: dict):
    text = str(text)
    if text.count("=") != 1:
        raise ValueError(f"not a single equation: {text!r}")
    lhs, rhs = text.split("=")
    return Eq(parse_expression(lhs, symbols), parse_expression(rhs, symbols))


def equivalent(a, b) -> bool:
    """True when two expressions are equal for all values of their symbols."""
    if simplify(a - b) == 0:
        return True
    result = a.equals(b)
    return result is True


def matches(a, b) -> bool:
    """True when a computed result is equal to the expected answer.

    Expressions compare by equivalence. A relation (an ``Eq`` produced by, say,
    ``eliminate``) compares as an equation: ``lhs - rhs`` on each side.
    """
    if isinstance(a, Eq) or isinstance(b, Eq):
        if isinstance(a, Eq) and isinstance(b, Eq):
            return equivalent(a.lhs - a.rhs, b.lhs - b.rhs)
        return False
    return equivalent(a, b)


def is_zero(expression) -> bool:
    return simplify(expression) == 0


def solution_set(equation, variable, domain=S.Reals):
    return solveset(equation, variable, domain=domain)


def solution_sets_subset(equation_a, equation_b, variable) -> bool:
    """True when every solution of a is a solution of b (a is reversible-weak)."""
    return solution_set(equation_a, variable).is_subset(solution_set(equation_b, variable)) == S.true


def is_nearest_multiple(value, rounded, step) -> bool:
    """True when `rounded` is `value` rounded to the nearest multiple of `step`."""
    if sympy.simplify(sympy.Mod(rounded, step)) != 0:
        return False
    return sympy.Abs(value - rounded) <= step / 2


def value_set(values: Iterable[str], symbols: dict):
    return FiniteSet(*[parse_expression(v, symbols) for v in values])


# --- sets and domains ---------------------------------------------------------
#
# `solve` and `inequality` compare SymPy sets, not only finite sets of answers.
# A `ConditionSet` means SymPy could not solve; that is *unknown*, never wrong.


def expected_set(answer, symbols: dict):
    """The expected solution set: a list is a FiniteSet, a set expression stays."""
    if isinstance(answer, (list, tuple)):
        return FiniteSet(*[parse_expression(v, symbols) for v in answer])
    expr = parse_expression(answer, symbols)
    if isinstance(expr, sympy.Set):
        return expr
    return FiniteSet(expr)


def parse_domain(check: dict, symbols: dict):
    """A solve check's domain: an explicit interval, a set, else the reals."""
    if "interval" in check:
        low = parse_expression(check["interval"][0], symbols)
        high = parse_expression(check["interval"][1], symbols)
        return sympy.Interval(low, high)
    if "domain" in check:
        return expected_set(check["domain"], symbols)
    return S.Reals


def is_unknown_set(value) -> bool:
    """True when SymPy could not fully solve (a ConditionSet)."""
    if isinstance(value, sympy.ConditionSet):
        return True
    try:
        return bool(value.has(sympy.ConditionSet))
    except AttributeError:
        return False


def parse_inequalities(text, symbols: dict):
    """Parse ``-3 < x <= 2`` (or a single relation) into SymPy relations."""
    parts = re.split(r"(<=|>=|<|>)", str(text).strip())
    if len(parts) < 3 or len(parts) % 2 == 0:
        raise ValueError(f"not an inequality: {text!r}")
    operands = parts[0::2]
    operators = parts[1::2]
    relations = []
    for left, operator, right in zip(operands, operators, operands[1:]):
        relations.append(
            RELATIONS[operator](
                parse_expression(left, symbols), parse_expression(right, symbols)
            )
        )
    return relations


def inequality_set(relations, variable):
    """The solution set of a conjunction of inequalities, as a SymPy set."""
    boolean = sympy.reduce_inequalities(relations, variable)
    if isinstance(boolean, sympy.Set):
        return boolean
    return boolean.as_set()


# --- systems ------------------------------------------------------------------


def _normalize_solution(mapping: dict) -> frozenset:
    return frozenset(
        (str(key), sympy.simplify(value)) for key, value in mapping.items()
    )


def system_solutions(equations, variables):
    """Solve a system exactly; return a set of solutions, or None if unknown.

    Each solution is a frozenset of ``(variable-name, value)`` pairs, so the
    order of the solutions and of the variables is irrelevant. ``None`` means
    the system could not be solved exactly (often under-determined).
    """
    try:
        result = sympy.nonlinsolve(equations, variables)
    except (ValueError, NotImplementedError):
        return None
    if result == S.EmptySet:
        return set()
    if is_unknown_set(result):
        return None
    if not isinstance(result, sympy.FiniteSet):
        return None
    solved = set()
    for item in result:
        tuple_values = item if isinstance(item, (tuple, sympy.Tuple)) else (item,)
        if len(tuple_values) != len(variables):
            return None
        mapping = {}
        for variable, value in zip(variables, tuple_values):
            if value.free_symbols or value.has(sympy.oo, sympy.zoo, sympy.nan):
                return None
            mapping[variable.name] = value
        solved.add(_normalize_solution(mapping))
    return solved


def expected_solutions(answer, variables, symbols: dict):
    """Normalise a bank's declared system answer to the same shape as above."""
    solved = set()
    for item in answer:
        if isinstance(item, dict):
            mapping = {name: parse_expression(value, symbols) for name, value in item.items()}
        else:
            values = item if isinstance(item, (list, tuple)) else [item]
            mapping = {
                variable.name: parse_expression(value, symbols)
                for variable, value in zip(variables, values)
            }
        solved.add(_normalize_solution(mapping))
    return solved


def format_solutions(solutions, variables) -> str:
    order = [variable.name for variable in variables]
    rendered = []
    for solution in solutions:
        mapping = dict(solution)
        rendered.append(
            "(" + ", ".join(f"{name}={mapping.get(name)}" for name in order) + ")"
        )
    return "{" + ", ".join(sorted(rendered)) + "}"


# --- vectors ------------------------------------------------------------------


def _as_matrix(value):
    if not isinstance(value, sympy.MatrixBase):
        raise ValueError(f"not a vector: {value}")
    return value


def vector_operation(op: str, args: list):
    """A named vector operation, e.g. ``dot`` or ``norm``."""
    op = str(op).lower()
    if op == "add":
        result = _as_matrix(args[0])
        for other in args[1:]:
            result = result + _as_matrix(other)
        return result
    if op == "subtract":
        result = _as_matrix(args[0])
        for other in args[1:]:
            result = result - _as_matrix(other)
        return result
    if op == "scale":
        scalar = next((a for a in args if not isinstance(a, sympy.MatrixBase)), None)
        vector = next((a for a in args if isinstance(a, sympy.MatrixBase)), None)
        if scalar is None or vector is None:
            raise ValueError("scale needs a scalar and a vector")
        return scalar * vector
    if op == "dot":
        return _as_matrix(args[0]).dot(_as_matrix(args[1]))
    if op == "cross":
        return _as_matrix(args[0]).cross(_as_matrix(args[1]))
    if op == "norm":
        return _as_matrix(args[0]).norm()
    if op == "unit":
        vector = _as_matrix(args[0])
        return vector / vector.norm()
    if op == "direction":
        vector = _as_matrix(args[0])
        if len(vector) == 2:
            return sympy.atan2(vector[1], vector[0])
        if len(vector) == 3:
            return sympy.Matrix(
                [
                    sympy.atan2(vector[1], vector[0]),
                    sympy.atan2(vector[2], sympy.sqrt(vector[0] ** 2 + vector[1] ** 2)),
                ]
            )
        raise ValueError("direction needs a 2D or 3D vector")
    if op == "distance":
        return (_as_matrix(args[0]) - _as_matrix(args[1])).norm()
    raise ValueError(f"unknown vector operation {op!r}")


# --- differential and recurrence equations ------------------------------------
#
# These need function notation (`y(x)`, `a(n)`), which `parse_expression` does
# not produce: within a bank, `y` is a Symbol. The local dictionary below binds
# the dependent name to a SymPy `Function` for the one equation being checked.


def _function_local(dependent: str, independent: str, symbols: dict):
    local = dict(symbols)
    local[independent] = symbols.get(independent) or sympy.Symbol(independent, real=True)
    local[dependent] = sympy.Function(dependent)
    return local


def parse_function_expression(text, dependent: str, independent: str, symbols: dict):
    return _parse(text, _function_local(dependent, independent, symbols))


def parse_function_equation(text, dependent: str, independent: str, symbols: dict):
    text = str(text)
    if text.count("=") != 1:
        raise ValueError(f"not a single equation: {text!r}")
    local = _function_local(dependent, independent, symbols)
    lhs, rhs = text.split("=")
    return Eq(_parse(lhs, local), _parse(rhs, local))


def is_ode_solution(equation, candidate, dependent: str, independent: str, symbols: dict) -> bool:
    """True when `candidate` satisfies the differential equation.

    The answer may be a general solution (with an arbitrary constant) or a
    particular one; `checkodesol` proves it solves the ODE either way, so the
    name and scale of a constant never matters.
    """
    function = sympy.Function(dependent)
    variable = symbols.get(independent) or sympy.Symbol(independent)
    solution = candidate if isinstance(candidate, Eq) else Eq(function(variable), candidate)
    try:
        ok, _ = sympy.checkodesol(equation, solution)
    except (ValueError, NotImplementedError, TypeError):
        return False
    return bool(ok)


def recurrence_solution(equation, dependent: str, independent: str, symbols: dict, initial=None):
    """The closed form of a recurrence, or None when SymPy cannot find it."""
    function = sympy.Function(dependent)
    variable = symbols.get(independent) or sympy.Symbol(independent, integer=True)
    initial_dict = None
    if initial:
        initial_dict = {}
        for point in initial:
            key = function(parse_expression(point[0], symbols))
            initial_dict[key] = parse_expression(point[1], symbols)
    try:
        result = sympy.rsolve(equation, function(variable), initial_dict)
    except (ValueError, NotImplementedError, TypeError):
        return None
    return result


# --- approximations -----------------------------------------------------------


def within_tolerance(value, target, tolerance, relative: bool = False) -> bool:
    """True when `value` is within an absolute or relative tolerance of target."""
    difference = sympy.Abs(value - target)
    limit = tolerance * sympy.Abs(target) if relative else tolerance
    relation = difference <= limit
    if relation == True:  # noqa: E712 - SymPy returns S.true
        return True
    if relation == False:  # noqa: E712
        return False
    return bool(difference.evalf() <= limit.evalf())


# --- declared rewrites -------------------------------------------------------
#
# A step can name the operation that produced it, not just assert equivalence.
# This is what makes differentiation and integration expressible: they are not
# equivalence-preserving rewrites of an expression, they are operations on it.

UNARY_OPERATIONS = {
    "simplify": sympy.simplify,
    "factor": sympy.factor,
    "expand": sympy.expand,
    "together": sympy.together,
    "apart": sympy.apart,
    "cancel": sympy.cancel,
    "trigsimp": sympy.trigsimp,
    "rationalize": sympy.radsimp,
    "expand_trig": sympy.expand_trig,
    "fu": _fu,
}


def _single_free_symbol(expression):
    free = expression.free_symbols
    if len(free) == 1:
        return free.pop()
    raise ValueError(f"cannot tell which variable to use in {expression}")


def apply_operation(expression, spec: dict, symbols: dict):
    """Apply a named CAS operation, e.g. {op: diff, args: [x]}."""
    op = spec.get("op")
    args = spec.get("args", [])
    if op in ("diff", "integrate"):
        if not args:
            raise ValueError(f"{op} needs a variable argument")
        variable = parse_expression(args[0], symbols)
        if op == "diff":
            return sympy.diff(expression, variable)
        if len(args) == 3:  # definite integral: args = [var, lower, upper]
            lower = parse_expression(args[1], symbols)
            upper = parse_expression(args[2], symbols)
            return sympy.integrate(expression, (variable, lower, upper))
        return sympy.integrate(expression, variable)
    if op == "subs":
        # args: [symbol, replacement]
        target = symbols.get(args[0])
        if target is None:
            raise ValueError(f"subs: unknown symbol {args[0]!r}")
        return expression.subs(target, parse_expression(args[1], symbols))
    if op == "limit":
        if len(args) < 2:
            raise ValueError("limit needs a variable and a point")
        variable = parse_expression(args[0], symbols)
        point = parse_expression(args[1], symbols)
        direction = spec.get("dir")
        if direction:
            return sympy.limit(expression, variable, point, direction)
        return sympy.limit(expression, variable, point)
    if op == "sum":
        if len(args) != 3:
            raise ValueError("sum needs args: [variable, lower, upper]")
        variable = parse_expression(args[0], symbols)
        lower = parse_expression(args[1], symbols)
        upper = parse_expression(args[2], symbols)
        return sympy.summation(expression, (variable, lower, upper))
    if op == "series":
        if not args:
            raise ValueError("series needs a variable")
        variable = parse_expression(args[0], symbols)
        point = parse_expression(args[1], symbols) if len(args) > 1 else sympy.Integer(0)
        order = int(parse_expression(args[2], symbols)) if len(args) > 2 else 6
        # Strip the big-O term so a truncated polynomial can be compared exactly.
        return sympy.series(expression, variable, point, order).removeO()
    if op == "iterate":
        if len(args) != 2:
            raise ValueError("iterate needs args: [start, count]")
        variable_name = spec.get("variable")
        if variable_name:
            variable = symbols.get(variable_name)
        else:
            variable = _single_free_symbol(expression)
        if variable is None:
            raise ValueError(f"iterate: unknown variable {variable_name!r}")
        value = parse_expression(args[0], symbols)
        count = int(parse_expression(args[1], symbols))
        for _ in range(count):
            value = expression.subs(variable, value)
        return sympy.simplify(value)
    if op == "idiff":
        if len(args) != 2:
            raise ValueError("idiff needs args: [dependent, independent]")
        dependent = parse_expression(args[0], symbols)
        independent = parse_expression(args[1], symbols)
        return sympy.idiff(expression, dependent, independent)
    if op == "parametric_diff":
        if not args:
            raise ValueError("parametric_diff needs the parameter")
        parameter = parse_expression(args[0], symbols)
        matrix = _as_matrix(expression)
        return sympy.simplify(
            sympy.diff(matrix[1], parameter) / sympy.diff(matrix[0], parameter)
        )
    if op == "invert":
        if not args:
            raise ValueError("invert needs the target symbol")
        target = parse_expression(args[0], symbols)
        variable = _infer_variable(expression, target, spec, symbols)
        solutions = sympy.solve(expression - target, variable)
        if not solutions:
            raise ValueError("invert: no inverse could be found")
        return solutions[0] if len(solutions) == 1 else FiniteSet(*solutions)
    if op == "compose":
        if not args:
            raise ValueError("compose needs the inner expression")
        inner = parse_expression(args[0], symbols)
        variable = _infer_variable(expression, None, spec, symbols)
        return expression.subs(variable, inner)
    if op == "eliminate":
        if len(args) != 3:
            raise ValueError("eliminate needs args: [parameter, x, y]")
        parameter = parse_expression(args[0], symbols)
        x_symbol = parse_expression(args[1], symbols)
        y_symbol = parse_expression(args[2], symbols)
        matrix = _as_matrix(expression)
        solutions = sympy.solve(Eq(matrix[0], x_symbol), parameter)
        if len(solutions) != 1:
            raise ValueError("eliminate needs a single-valued parameterisation")
        cartesian = sympy.simplify(matrix[1].subs(parameter, solutions[0]))
        return Eq(y_symbol, cartesian)
    if op in ("div", "rem"):
        if len(args) != 2:
            raise ValueError(f"{op} needs args: [divisor, variable]")
        divisor = parse_expression(args[0], symbols)
        variable = parse_expression(args[1], symbols)
        quotient, remainder = sympy.div(expression, divisor, variable)
        return quotient if op == "div" else remainder
    if op == "expand_log":
        return sympy.expand_log(expression, force=spec.get("force", False))
    if op == "logcombine":
        return sympy.logcombine(expression, force=spec.get("force", False))
    if op == "harmonic":
        if len(args) != 3:
            raise ValueError("harmonic needs args: [a, b, angle]")
        a = parse_expression(args[0], symbols)
        b = parse_expression(args[1], symbols)
        angle = parse_expression(args[2], symbols)
        original = a * sympy.cos(angle) + b * sympy.sin(angle)
        if not equivalent(original, expression):
            raise ValueError("harmonic: a and b do not reproduce the expression")
        amplitude = sympy.sqrt(a**2 + b**2)
        phase = sympy.atan2(b, a)
        return amplitude * sympy.cos(angle - phase)
    if op in UNARY_OPERATIONS:
        return UNARY_OPERATIONS[op](expression)
    raise ValueError(f"unknown operation {op!r}")


def _infer_variable(expression, target, spec, symbols):
    name = spec.get("variable")
    if name:
        variable = symbols.get(name)
        if variable is None:
            raise ValueError(f"unknown variable {name!r}")
        return variable
    free = set(expression.free_symbols)
    if target is not None:
        free -= set(target.free_symbols)
    if len(free) == 1:
        return free.pop()
    raise ValueError(f"cannot tell which variable to use in {expression}")


def is_antiderivative(candidate, integrand, variable) -> bool:
    """True when candidate differentiates back to integrand (constants are free)."""
    return equivalent(sympy.diff(candidate, variable), integrand)


def is_indefinite_integral(spec: dict) -> bool:
    return spec.get("op") == "integrate" and len(spec.get("args", [])) == 1


def is_ode_solve(spec: dict) -> bool:
    """A ``dsolve`` step is verified by substitution, not by equality."""
    return spec.get("op") == "dsolve"


# --- statistics ----------------------------------------------------------------
#
# Statistics is not a symbolic problem; the oracle is an independent exact
# computation, with any convention named explicitly (see PROBLEMS.md).


def _median(values):
    n = len(values)
    if n == 0:
        raise ValueError("statistic: empty data")
    middle = n // 2
    return values[middle] if n % 2 else (values[middle - 1] + values[middle]) / 2


def _linear_quantile(values, fraction):
    """The (n+1) interpolation method, the common A-level position method."""
    n = len(values)
    position = sympy.Rational(fraction) * (n + 1)
    if position <= 1:
        return values[0]
    if position >= n:
        return values[-1]
    lower = int(sympy.floor(position))
    remainder = position - lower
    return values[lower - 1] + remainder * (values[lower] - values[lower - 1])


def _nearest_rank_quantile(values, fraction):
    n = len(values)
    rank = int(sympy.ceiling(sympy.Rational(fraction) * n))
    rank = max(1, min(n, rank))
    return values[rank - 1]


def _half_quantile(values, fraction):
    """Median of the lower or upper half; the median is excluded or included."""
    n = len(values)
    middle = n // 2
    fraction = sympy.Rational(fraction)
    if fraction == sympy.Rational(1, 4):
        return _median(values[:middle])
    if fraction == sympy.Rational(3, 4):
        return _median(values[middle + 1 :] if n % 2 else values[middle:])
    raise ValueError("exclusive/inclusive quartiles only apply to quartiles")


def _inclusive_half_quantile(values, fraction):
    n = len(values)
    middle = n // 2
    fraction = sympy.Rational(fraction)
    if fraction == sympy.Rational(1, 4):
        return _median(values[: middle + 1] if n % 2 else values[:middle])
    if fraction == sympy.Rational(3, 4):
        return _median(values[middle:])
    raise ValueError("exclusive/inclusive quartiles only apply to quartiles")


def quantile(values, fraction, convention):
    """A named quantile convention: linear, nearest_rank, exclusive, inclusive."""
    if convention == "linear":
        return _linear_quantile(values, fraction)
    if convention == "nearest_rank":
        return _nearest_rank_quantile(values, fraction)
    if convention == "exclusive":
        return _half_quantile(values, fraction)
    if convention == "inclusive":
        return _inclusive_half_quantile(values, fraction)
    raise ValueError(f"unknown quartile convention {convention!r}")


def _variance(values, convention):
    n = len(values)
    mean = sum(values) / n
    if convention == "sample":
        if n < 2:
            raise ValueError("sample variance needs at least two values")
        divisor = n - 1
    elif convention == "population":
        divisor = n
    else:
        raise ValueError(f"variance convention must be sample or population, not {convention!r}")
    return sum((value - mean) ** 2 for value in values) / divisor


def statistic(data: Iterable, name: str, convention: str | None = None, percentile=None):
    values = sorted(sympy.Rational(parse_expression(str(v), {})) for v in data)
    if not values:
        raise ValueError("statistic: empty data")
    n = len(values)
    if name == "mean":
        return sum(values) / n
    if name == "median":
        return _median(values)
    if name == "range":
        return values[-1] - values[0]
    if name == "min":
        return values[0]
    if name == "max":
        return values[-1]
    if name == "variance":
        return _variance(values, convention)
    if name == "std":
        return sympy.sqrt(_variance(values, convention))
    if name in ("quartile1", "quartile3"):
        fraction = sympy.Rational(1, 4) if name == "quartile1" else sympy.Rational(3, 4)
        return quantile(values, fraction, convention)
    if name == "iqr":
        return quantile(values, sympy.Rational(3, 4), convention) - quantile(
            values, sympy.Rational(1, 4), convention
        )
    if name == "percentile":
        if percentile is None:
            raise ValueError("percentile needs a 'percentile' value")
        return quantile(values, sympy.Rational(percentile, 100), convention)
    raise ValueError(f"unknown statistic {name!r}")


# --- distributions and hypothesis tests ---------------------------------------
#
# `sympy.stats` gives exact results: a binomial probability is a rational and a
# normal one is an `erf`. A decimal is therefore never forced, and a normal
# record declares the tolerance its answer is checked to (see DECISIONS.md:
# no scipy). A named distribution, a named query and a named tail are all
# required, because the same numbers mean different things without them.


def make_distribution(name: str, parameters: dict, symbols: dict, variable: str = "X"):
    """A `sympy.stats` distribution from a named distribution and its parameters."""
    parameters = parameters or {}
    name = str(name).lower()
    if name == "binomial":
        n = parse_expression(parameters["n"], symbols)
        p = parse_expression(parameters["p"], symbols)
        return Binomial(variable, n, p)
    if name == "normal":
        mu = parse_expression(parameters["mu"], symbols)
        sigma = parse_expression(parameters["sigma"], symbols)
        return Normal(variable, mu, sigma)
    raise ValueError(f"unknown distribution {name!r}; use binomial or normal")


QUERY_KINDS = ("exactly", "at_most", "at_least", "between")


def distribution_probability(distribution, query: dict, symbols: dict):
    """The exact probability of a named query on a distribution.

    The four query kinds are `exactly` (`P(X = k)`), `at_most` (`P(X <= k)`),
    `at_least` (`P(X >= k)`) and `between` (the closed interval
    `P(a <= X <= b)`). The answer is exact: a rational for a binomial and an
    `erf` expression for a normal.
    """
    if not isinstance(query, dict):
        raise ValueError("query must be a mapping that names its kind")
    kind = str(query.get("kind", "")).lower()
    if kind == "exactly":
        value = parse_expression(query["value"], symbols)
        return Probability(Eq(distribution, value))
    if kind == "at_most":
        value = parse_expression(query["value"], symbols)
        return Probability(sympy.Le(distribution, value))
    if kind == "at_least":
        value = parse_expression(query["value"], symbols)
        return Probability(sympy.Ge(distribution, value))
    if kind == "between":
        low = parse_expression(query["low"], symbols)
        high = parse_expression(query["high"], symbols)
        return Probability(sympy.And(sympy.Ge(distribution, low), sympy.Le(distribution, high)))
    raise ValueError(f"unknown query kind {kind!r}; use one of {', '.join(QUERY_KINDS)}")


def tail_probability(distribution, tail: str, observed, symbols: dict):
    """The exact tail probability of an observed value.

    `left` is `P(X <= observed)`, `right` is `P(X >= observed)`. `two` is twice
    the smaller one-sided tail, capped at 1 — the A-level two-tailed convention,
    stated here so the record does not have to guess it.
    """
    observed = parse_expression(observed, symbols)
    tail = str(tail).lower()
    if tail == "left":
        return Probability(sympy.Le(distribution, observed))
    if tail == "right":
        return Probability(sympy.Ge(distribution, observed))
    if tail == "two":
        left = Probability(sympy.Le(distribution, observed))
        right = Probability(sympy.Ge(distribution, observed))
        return sympy.Min(2 * sympy.Min(left, right), 1)
    raise ValueError(f"unknown tail {tail!r}; use left, right or two")


def _binomial_critical_region(n: int, p, tail: str, alpha):
    distribution = Binomial("X", n, p)

    def cumulative(k):
        return sympy.simplify(Probability(sympy.Le(distribution, k)))

    def largest_below(limit):
        chosen = None
        for k in range(0, n + 1):
            if cumulative(k) <= limit:
                chosen = k
        return chosen

    def smallest_above(limit):
        chosen = None
        for k in range(n, -1, -1):
            if 1 - cumulative(k - 1) <= limit:  # P(X >= k)
                chosen = k
        return chosen

    if tail == "left":
        chosen = largest_below(alpha)
        return {} if chosen is None else {"max": sympy.Integer(chosen)}
    if tail == "right":
        chosen = smallest_above(alpha)
        return {} if chosen is None else {"min": sympy.Integer(chosen)}
    if tail == "two":
        half = alpha / 2
        region = {}
        low = largest_below(half)
        high = smallest_above(half)
        if low is not None:
            region["max"] = sympy.Integer(low)
        if high is not None:
            region["min"] = sympy.Integer(high)
        return region
    raise ValueError(f"unknown tail {tail!r}; use left, right or two")


def _normal_critical_region(mu, sigma, tail: str, alpha):
    root_two = sympy.sqrt(2)
    if tail == "left":
        return {"max": mu + sigma * root_two * sympy.erfinv(2 * alpha - 1)}
    if tail == "right":
        return {"min": mu + sigma * root_two * sympy.erfinv(1 - 2 * alpha)}
    if tail == "two":
        return {
            "max": mu + sigma * root_two * sympy.erfinv(alpha - 1),
            "min": mu + sigma * root_two * sympy.erfinv(1 - alpha),
        }
    raise ValueError(f"unknown tail {tail!r}; use left, right or two")


def critical_region(name: str, parameters: dict, tail: str, alpha, symbols: dict):
    """The maximal level-`alpha` rejection region for a named tail.

    A left region is ``{max: c}`` meaning ``X <= c``; a right one is
    ``{min: c}`` meaning ``X >= c``; a two-tailed one names both boundaries.
    For a discrete binomial the region is the largest set of extreme outcomes
    whose probability is at most `alpha`; for a normal it is the exact quantile.
    """
    alpha = parse_expression(alpha, symbols)
    name = str(name).lower()
    if name == "binomial":
        n = int(parse_expression(parameters["n"], symbols))
        p = parse_expression(parameters["p"], symbols)
        return _binomial_critical_region(n, p, str(tail).lower(), alpha)
    if name == "normal":
        mu = parse_expression(parameters["mu"], symbols)
        sigma = parse_expression(parameters["sigma"], symbols)
        return _normal_critical_region(mu, sigma, str(tail).lower(), alpha)
    raise ValueError(f"unknown distribution {name!r}; use binomial or normal")


def probability_below(value, target, or_equal: bool = False) -> bool:
    """True when `value` is (at most) `target`, exactly or by evaluation.

    A rational comparison stays exact; an `erf` expression falls back to
    `evalf`, which is only ever used to decide a significance comparison, where
    the precision is orders of magnitude below the gap to a stated `alpha`.
    """
    difference = sympy.simplify(value - target)
    relation = sympy.Le(difference, 0) if or_equal else sympy.Lt(difference, 0)
    if relation == S.true:
        return True
    if relation == S.false:
        return False
    numeric = difference.evalf()
    if numeric.is_real is False:
        raise ValueError(f"cannot compare {value} with {target}")
    return bool(numeric <= 0) if or_equal else bool(numeric < 0)


def _parse_data(values, symbols):
    return [parse_expression(value, symbols) for value in values]


def pearson_r(xs, ys):
    """Pearson's product-moment correlation coefficient, exact over rationals."""
    n = len(xs)
    if n != len(ys):
        raise ValueError("correlation needs equally many x and y values")
    if n < 2:
        raise ValueError("correlation needs at least two pairs")
    sum_x = sum(xs)
    sum_y = sum(ys)
    sum_xx = sum(value * value for value in xs)
    sum_yy = sum(value * value for value in ys)
    sum_xy = sum(a * b for a, b in zip(xs, ys))
    numerator = n * sum_xy - sum_x * sum_y
    denominator = sympy.sqrt((n * sum_xx - sum_x**2) * (n * sum_yy - sum_y**2))
    if denominator == 0:
        raise ValueError("correlation is undefined when a variable is constant")
    return sympy.simplify(numerator / denominator)


def least_squares(xs, ys):
    """The least-squares line `y = a + b x`; returns `(intercept, gradient)`."""
    n = len(xs)
    if n != len(ys):
        raise ValueError("regression needs equally many x and y values")
    if n < 2:
        raise ValueError("regression needs at least two pairs")
    sum_x = sum(xs)
    sum_y = sum(ys)
    sum_xx = sum(value * value for value in xs)
    sum_xy = sum(a * b for a, b in zip(xs, ys))
    spread = n * sum_xx - sum_x**2
    if spread == 0:
        raise ValueError("regression is undefined when x is constant")
    gradient = sympy.simplify((n * sum_xy - sum_x * sum_y) / spread)
    intercept = sympy.simplify((sum_y - gradient * sum_x) / n)
    return intercept, gradient


def correlation(x_values, y_values, symbols: dict):
    return pearson_r(_parse_data(x_values, symbols), _parse_data(y_values, symbols))


def regression(x_values, y_values, symbols: dict):
    return least_squares(_parse_data(x_values, symbols), _parse_data(y_values, symbols))
