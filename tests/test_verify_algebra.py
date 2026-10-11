"""A-level verification vocabulary: new kinds, operations and statistics.

``research/curriculum/a-level-maths-verifier-gaps.md`` §3 and §5 list the check
kinds, ``apply`` operations and ``statistic`` values an A-level bank needs before
it can be verified. This file proves each one verifies a record — and that the
load-bearing ones can fail, because a check that cannot fail is not a check.

Only the vocabulary is tested here; ``test_problem_bank.py`` remains the proof
that every shipped bank still verifies.
"""

from __future__ import annotations

import pytest

from textbook.verify.verify import verify_problem

REAL = {"x": {"real": True}}
REAL_XY = {"x": {"real": True}, "y": {"real": True}}
REAL_T = {"t": {"real": True}}
REAL_TXY = {"t": {"real": True}, "x": {"real": True}, "y": {"real": True}}
POSITIVE_XY = {"x": {"real": True, "positive": True}, "y": {"real": True, "positive": True}}
SEQUENCE = {"k": {"integer": True, "positive": True}, "n": {"integer": True, "positive": True}}


def _problem(check, symbols=None):
    problem = {"id": "case", "check": check}
    if symbols is not None:
        problem["symbols"] = symbols
    return problem


# --- system: simultaneous equations ------------------------------------------


def test_system_solves_one_linear_and_one_quadratic():
    problem = _problem(
        {
            "kind": "system",
            "equations": ["x + y = 5", "x*y = 6"],
            "variables": ["x", "y"],
            "answer": [[2, 3], [3, 2]],
        },
        REAL_XY,
    )
    assert verify_problem(problem).ok


def test_system_is_order_insensitive():
    problem = _problem(
        {
            "kind": "system",
            "equations": ["x + y = 5", "x*y = 6"],
            "variables": ["x", "y"],
            "answer": [[3, 2], [2, 3]],
        },
        REAL_XY,
    )
    assert verify_problem(problem).ok


def test_system_accepts_named_solution_dicts():
    problem = _problem(
        {
            "kind": "system",
            "equations": ["x + y = 5", "x - y = 1"],
            "variables": ["x", "y"],
            "answer": [{"y": 2, "x": 3}],
        },
        REAL_XY,
    )
    assert verify_problem(problem).ok


def test_system_wrong_answer_fails():
    """A wrong solution tuple must fail, not slip through the set comparison."""
    problem = _problem(
        {
            "kind": "system",
            "equations": ["x + y = 5", "x*y = 6"],
            "variables": ["x", "y"],
            "answer": [[2, 4], [3, 2]],
        },
        REAL_XY,
    )
    report = verify_problem(problem)
    assert not report.ok
    assert "expected" in report.errors[0]


# --- solve: domains, general sets and unknown ---------------------------------


def test_solve_accepts_an_interval_domain():
    problem = _problem(
        {
            "kind": "solve",
            "equation": "sin(x) = 0",
            "variable": "x",
            "interval": [0, "2*pi"],
            "answer": ["0", "pi", "2*pi"],
        },
        REAL,
    )
    assert verify_problem(problem).ok


def test_solve_compares_a_general_set():
    problem = _problem(
        {
            "kind": "solve",
            "equation": "sin(x) = 1/2",
            "variable": "x",
            "interval": [0, "2*pi"],
            "answer": "FiniteSet(pi/6, 5*pi/6)",
        },
        REAL,
    )
    assert verify_problem(problem).ok


def test_solve_reports_a_condition_set_as_unknown_not_wrong():
    """`sin x = x/2` has no closed form; SymPy returns a ConditionSet. That is
    unknown, so it is a warning, never an error."""
    problem = _problem(
        {
            "kind": "solve",
            "equation": "sin(x) = x/2",
            "variable": "x",
            "answer": [],
        },
        REAL,
    )
    report = verify_problem(problem)
    assert report.ok
    assert any("unknown" in warning for warning in report.warnings)


def test_solve_wrong_interval_solutions_fail():
    problem = _problem(
        {
            "kind": "solve",
            "equation": "sin(x) = 0",
            "variable": "x",
            "interval": [0, "2*pi"],
            "answer": ["0", "pi"],
        },
        REAL,
    )
    assert not verify_problem(problem).ok


# --- inequality ---------------------------------------------------------------


def test_inequality_chain_solves_to_an_interval():
    problem = _problem(
        {
            "kind": "inequality",
            "inequality": "-3 < x <= 2",
            "variable": "x",
            "answer": "Interval.Lopen(-3, 2)",
        },
        REAL,
    )
    assert verify_problem(problem).ok


def test_inequality_accepts_a_list_of_relations():
    problem = _problem(
        {
            "kind": "inequality",
            "inequalities": ["-3 < x", "x <= 2"],
            "variable": "x",
            "answer": "Interval.Lopen(-3, 2)",
        },
        REAL,
    )
    assert verify_problem(problem).ok


def test_inequality_wrong_boundary_fails():
    """A closed interval includes -3 where the chain excludes it: a real error."""
    problem = _problem(
        {
            "kind": "inequality",
            "inequality": "-3 < x <= 2",
            "variable": "x",
            "answer": "Interval(-3, 2)",
        },
        REAL,
    )
    report = verify_problem(problem)
    assert not report.ok
    assert "Interval.Lopen" in report.errors[0]


# --- vector -------------------------------------------------------------------


VECTOR_CASES = [
    (
        "dot",
        {"kind": "vector", "op": "dot", "args": ["Matrix([1,2,3])", "Matrix([4,5,6])"], "answer": "32"},
    ),
    (
        "cross",
        {"kind": "vector", "op": "cross", "args": ["Matrix([1,2,3])", "Matrix([4,5,6])"], "answer": "Matrix([-3, 6, -3])"},
    ),
    (
        "norm",
        {"kind": "vector", "op": "norm", "args": ["Matrix([3,4])"], "answer": "5"},
    ),
    (
        "unit",
        {"kind": "vector", "op": "unit", "args": ["Matrix([3,4])"], "answer": "Matrix([3/5, 4/5])"},
    ),
    (
        "direction",
        {"kind": "vector", "op": "direction", "args": ["Matrix([3,4])"], "answer": "atan2(4,3)"},
    ),
    (
        "add",
        {"kind": "vector", "op": "add", "args": ["Matrix([1,2])", "Matrix([3,4])"], "answer": "Matrix([4,6])"},
    ),
    (
        "subtract",
        {"kind": "vector", "op": "subtract", "args": ["Matrix([3,4])", "Matrix([1,1])"], "answer": "Matrix([2,3])"},
    ),
    (
        "scale",
        {"kind": "vector", "op": "scale", "args": ["3", "Matrix([1,2])"], "answer": "Matrix([3,6])"},
    ),
    (
        "distance",
        {"kind": "vector", "op": "distance", "args": ["Matrix([1,2])", "Matrix([4,6])"], "answer": "5"},
    ),
]


@pytest.mark.parametrize("op,check", VECTOR_CASES, ids=[case[0] for case in VECTOR_CASES])
def test_vector_named_operations(op, check):
    assert verify_problem(_problem(check)).ok


def test_vector_components_still_compare_through_evaluate():
    """The gap note: `Matrix(...)` equality already worked through `evaluate`."""
    problem = _problem(
        {"kind": "evaluate", "expression": "Matrix([3, 4])", "answer": "Matrix([3, 4])"}
    )
    assert verify_problem(problem).ok


def test_vector_wrong_dot_fails():
    check = {"kind": "vector", "op": "dot", "args": ["Matrix([1,2,3])", "Matrix([4,5,6])"], "answer": "33"}
    report = verify_problem(_problem(check))
    assert not report.ok
    assert "dot gives 32" in report.errors[0]


# --- ode ----------------------------------------------------------------------


def test_ode_general_solution():
    problem = _problem(
        {
            "kind": "ode",
            "equation": "Derivative(y(x), x) = 3*y(x)",
            "dependent": "y",
            "independent": "x",
            "answer": "C1*exp(3*x)",
        },
        REAL,
    )
    assert verify_problem(problem).ok


def test_ode_particular_solution_with_initial_condition():
    problem = _problem(
        {
            "kind": "ode",
            "equation": "Derivative(y(x), x) = 3*y(x)",
            "dependent": "y",
            "independent": "x",
            "initial": [[0, 2]],
            "answer": "2*exp(3*x)",
        },
        REAL,
    )
    assert verify_problem(problem).ok


def test_ode_wrong_answer_fails():
    problem = _problem(
        {
            "kind": "ode",
            "equation": "Derivative(y(x), x) = 3*y(x)",
            "dependent": "y",
            "independent": "x",
            "answer": "exp(2*x)",
        },
        REAL,
    )
    report = verify_problem(problem)
    assert not report.ok
    assert "differential equation" in report.errors[0]


# --- approx -------------------------------------------------------------------


def test_approx_absolute_tolerance():
    check = {"kind": "approx", "value": "3.14159", "target": "pi", "tolerance": "0.0001"}
    assert verify_problem(_problem(check)).ok


def test_approx_relative_tolerance():
    check = {
        "kind": "approx",
        "value": "9.81",
        "target": "9.8",
        "tolerance": "0.01",
        "relative": True,
    }
    assert verify_problem(_problem(check)).ok


def test_approx_wrong_value_fails():
    check = {"kind": "approx", "value": "3.14", "target": "pi", "tolerance": "0.0001"}
    report = verify_problem(_problem(check))
    assert not report.ok
    assert "tolerance" in report.errors[0]


def test_approx_makes_a_trapezium_estimate_checkable():
    """An estimate need not be exact; `approx` is what a numerical method needs."""
    check = {
        "kind": "approx",
        "value": "0.7855",
        "target": "pi/4",
        "tolerance": "0.001",
    }
    assert verify_problem(_problem(check)).ok


# --- apply operations ---------------------------------------------------------


APPLY_PROBLEMS = [
    (
        "limit",
        _problem(
            {"kind": "apply", "expression": "(sin(x))/x", "apply": {"op": "limit", "args": ["x", 0]}, "answer": "1"},
            REAL,
        ),
    ),
    (
        "sum",
        _problem(
            {"kind": "apply", "expression": "k**2", "apply": {"op": "sum", "args": ["k", 1, "n"]}, "answer": "n**3/3 + n**2/2 + n/6"},
            SEQUENCE,
        ),
    ),
    (
        "series",
        _problem(
            {"kind": "apply", "expression": "sin(x)", "apply": {"op": "series", "args": ["x", 0, 4]}, "answer": "x - x**3/6"},
            REAL,
        ),
    ),
    (
        "iterate",
        _problem(
            {"kind": "apply", "expression": "(x + 2/x)/2", "apply": {"op": "iterate", "args": [1, 4], "variable": "x"}, "answer": "665857/470832"},
            REAL,
        ),
    ),
    (
        "idiff",
        _problem(
            {"kind": "apply", "expression": "x**2 + y**2 - 25", "apply": {"op": "idiff", "args": ["y", "x"]}, "answer": "-x/y"},
            REAL_XY,
        ),
    ),
    (
        "parametric_diff",
        _problem(
            {"kind": "apply", "expression": "Matrix([cos(t), sin(t)])", "apply": {"op": "parametric_diff", "args": ["t"]}, "answer": "-cos(t)/sin(t)"},
            REAL_T,
        ),
    ),
    (
        "invert",
        _problem(
            {"kind": "apply", "expression": "3*x + 2", "apply": {"op": "invert", "args": ["y"]}, "answer": "y/3 - 2/3"},
            REAL_XY,
        ),
    ),
    (
        "compose",
        _problem(
            {"kind": "apply", "expression": "x**2 + 1", "apply": {"op": "compose", "args": ["2*x - 3"]}, "answer": "(2*x - 3)**2 + 1"},
            REAL,
        ),
    ),
    (
        "eliminate",
        _problem(
            {"kind": "apply", "expression": "Matrix([2*t, t**2])", "apply": {"op": "eliminate", "args": ["t", "x", "y"]}, "answer": "Eq(y, x**2/4)"},
            REAL_TXY,
        ),
    ),
    (
        "div",
        _problem(
            {"kind": "apply", "expression": "x**3 - 1", "apply": {"op": "div", "args": ["x - 1", "x"]}, "answer": "x**2 + x + 1"},
            REAL,
        ),
    ),
    (
        "rem",
        _problem(
            {"kind": "apply", "expression": "2*x**2 + 3*x + 1", "apply": {"op": "rem", "args": ["x + 2", "x"]}, "answer": "3"},
            REAL,
        ),
    ),
    (
        "expand_log",
        _problem(
            {"kind": "apply", "expression": "log(x*y)", "apply": {"op": "expand_log"}, "answer": "log(x) + log(y)"},
            POSITIVE_XY,
        ),
    ),
    (
        "logcombine",
        _problem(
            {"kind": "apply", "expression": "log(x) + log(y)", "apply": {"op": "logcombine"}, "answer": "log(x*y)"},
            POSITIVE_XY,
        ),
    ),
    (
        "expand_trig",
        _problem(
            {"kind": "apply", "expression": "sin(2*x)", "apply": {"op": "expand_trig"}, "answer": "2*sin(x)*cos(x)"},
            REAL,
        ),
    ),
    (
        "fu",
        _problem(
            {"kind": "apply", "expression": "sin(x)*cos(x)", "apply": {"op": "fu"}, "answer": "sin(2*x)/2"},
            REAL,
        ),
    ),
    (
        "harmonic",
        _problem(
            {"kind": "apply", "expression": "3*cos(t) + 4*sin(t)", "apply": {"op": "harmonic", "args": [3, 4, "t"]}, "answer": "5*cos(t - atan(4/3))"},
            REAL_T,
        ),
    ),
    (
        "dsolve",
        _problem(
            {
                "kind": "apply",
                "equation": "Derivative(y(x), x) = 3*y(x)",
                "apply": {"op": "dsolve", "dependent": "y", "independent": "x"},
                "answer": "C1*exp(3*x)",
            },
            REAL,
        ),
    ),
    (
        "rsolve",
        _problem(
            {
                "kind": "apply",
                "equation": "a(n+1) = 2*a(n) + 1",
                "apply": {"op": "rsolve", "dependent": "a", "independent": "n", "initial": [[0, 1]]},
                "answer": "2*2**n - 1",
            },
            {"n": {"integer": True}},
        ),
    ),
]


@pytest.mark.parametrize(
    "operation,problem", APPLY_PROBLEMS, ids=[case[0] for case in APPLY_PROBLEMS]
)
def test_apply_operation_verifies_a_record(operation, problem):
    assert verify_problem(problem).ok


WRONG_APPLY_PROBLEMS = [
    (
        "limit",
        _problem(
            {"kind": "apply", "expression": "(sin(x))/x", "apply": {"op": "limit", "args": ["x", 0]}, "answer": "0"},
            REAL,
        ),
    ),
    (
        "div",
        _problem(
            {"kind": "apply", "expression": "x**3 - 1", "apply": {"op": "div", "args": ["x - 1", "x"]}, "answer": "x**2 + x"},
            REAL,
        ),
    ),
    (
        "harmonic",
        _problem(
            {"kind": "apply", "expression": "3*cos(t) + 4*sin(t)", "apply": {"op": "harmonic", "args": [3, 4, "t"]}, "answer": "5*cos(t + atan(4/3))"},
            REAL_T,
        ),
    ),
]


@pytest.mark.parametrize(
    "operation,problem", WRONG_APPLY_PROBLEMS, ids=[case[0] for case in WRONG_APPLY_PROBLEMS]
)
def test_apply_operation_wrong_answer_fails(operation, problem):
    report = verify_problem(problem)
    assert not report.ok, f"a wrong {operation} record was accepted"


# --- statistics ---------------------------------------------------------------


STATISTIC_CASES = [
    (
        "mean",
        {"data": [3, 5, 5, 6, 8], "stat": "mean", "answer": "27/5"},
    ),
    (
        "std_sample",
        {"data": [2, 4, 4, 4, 5, 5, 7, 9], "stat": "std", "convention": "sample", "answer": "4*sqrt(14)/7"},
    ),
    (
        "std_population",
        {"data": [2, 4, 4, 4, 5, 5, 7, 9], "stat": "std", "convention": "population", "answer": "2"},
    ),
    (
        "variance_sample",
        {"data": [2, 4, 4, 4, 5, 5, 7, 9], "stat": "variance", "convention": "sample", "answer": "32/7"},
    ),
    (
        "variance_population",
        {"data": [2, 4, 4, 4, 5, 5, 7, 9], "stat": "variance", "convention": "population", "answer": "4"},
    ),
    (
        "quartile1_linear",
        {"data": [1, 2, 3, 4, 5], "stat": "quartile1", "convention": "linear", "answer": "3/2"},
    ),
    (
        "quartile3_linear",
        {"data": [1, 2, 3, 4, 5], "stat": "quartile3", "convention": "linear", "answer": "9/2"},
    ),
    (
        "iqr_linear",
        {"data": [1, 2, 3, 4, 5], "stat": "iqr", "convention": "linear", "answer": "3"},
    ),
    (
        "iqr_nearest_rank",
        {"data": [1, 2, 3, 4, 5], "stat": "iqr", "convention": "nearest_rank", "answer": "2"},
    ),
    (
        "quartile1_exclusive",
        {"data": [1, 2, 3, 4, 5], "stat": "quartile1", "convention": "exclusive", "answer": "3/2"},
    ),
    (
        "quartile1_inclusive",
        {"data": [1, 2, 3, 4, 5], "stat": "quartile1", "convention": "inclusive", "answer": "2"},
    ),
    (
        "percentile_linear",
        {"data": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "stat": "percentile", "convention": "linear", "percentile": 90, "answer": "99/10"},
    ),
    (
        "percentile_nearest_rank",
        {"data": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "stat": "percentile", "convention": "nearest_rank", "percentile": 50, "answer": "5"},
    ),
]


@pytest.mark.parametrize(
    "statistic,check", STATISTIC_CASES, ids=[case[0] for case in STATISTIC_CASES]
)
def test_statistic_values(statistic, check):
    assert verify_problem(_problem(dict(check, kind="statistic"))).ok


def test_statistic_sample_and_population_are_distinguished():
    data = [2, 4, 4, 4, 5, 5, 7, 9]
    sample = _problem({"kind": "statistic", "data": data, "stat": "variance", "convention": "sample", "answer": "32/7"})
    population = _problem({"kind": "statistic", "data": data, "stat": "variance", "convention": "population", "answer": "4"})
    wrong = _problem({"kind": "statistic", "data": data, "stat": "variance", "convention": "sample", "answer": "4"})
    assert verify_problem(sample).ok
    assert verify_problem(population).ok
    assert not verify_problem(wrong).ok


def test_statistic_requires_a_named_convention():
    problem = _problem(
        {"kind": "statistic", "data": [1, 2, 3, 4], "stat": "iqr", "answer": "3"}
    )
    report = verify_problem(problem)
    assert not report.ok
    assert "convention" in report.errors[0]


def test_statistic_wrong_value_fails():
    problem = _problem(
        {"kind": "statistic", "data": [1, 2, 3, 4, 5], "stat": "iqr", "convention": "linear", "answer": "2"}
    )
    report = verify_problem(problem)
    assert not report.ok
    assert "expected" in report.errors[0]
