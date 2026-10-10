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


def solution_set(equation, variable, domain=S.Reals):
    return solveset(equation, variable, domain=domain)


def value_set(values: Iterable[str], symbols: dict):
    return FiniteSet(*[parse_expression(v, symbols) for v in values])
