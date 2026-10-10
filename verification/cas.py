"""Symbolic parsing and comparison helpers for the problem bank.

The bank stores a CAS-parseable expression alongside the human-readable
statement, so a problem can be verified independently of how it is rendered.
"""

from __future__ import annotations

from typing import Iterable

import sympy
from sympy import Eq, FiniteSet, S, simplify, solveset
from sympy.parsing.sympy_parser import (
    convert_xor,
    implicit_multiplication_application,
    parse_expr,
    standard_transformations,
)

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


def parse_expression(text: str, symbols: dict):
    expr = parse_expr(
        text,
        local_dict=dict(symbols),
        transformations=TRANSFORMS,
        evaluate=True,
    )
    return _rationalize(expr)


def parse_equation(text: str, symbols: dict):
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
}


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
    if op in UNARY_OPERATIONS:
        return UNARY_OPERATIONS[op](expression)
    raise ValueError(f"unknown operation {op!r}")


def is_antiderivative(candidate, integrand, variable) -> bool:
    """True when candidate differentiates back to integrand (constants are free)."""
    return equivalent(sympy.diff(candidate, variable), integrand)


def is_indefinite_integral(spec: dict) -> bool:
    return spec.get("op") == "integrate" and len(spec.get("args", [])) == 1


# --- statistics ----------------------------------------------------------------
#
# Statistics is not a symbolic problem; the oracle is an independent exact
# computation, with any convention named explicitly (see PROBLEMS.md).


def statistic(data: Iterable, name: str):
    values = sorted(sympy.Rational(parse_expression(str(v), {})) for v in data)
    if not values:
        raise ValueError("statistic: empty data")
    n = len(values)
    if name == "mean":
        return sum(values) / n
    if name == "median":
        middle = n // 2
        return values[middle] if n % 2 else (values[middle - 1] + values[middle]) / 2
    if name == "range":
        return values[-1] - values[0]
    if name == "min":
        return values[0]
    if name == "max":
        return values[-1]
    raise ValueError(f"unknown statistic {name!r}")
