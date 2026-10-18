"""The A-level statistics vocabulary: distributions, hypothesis tests, fits.

``research/curriculum/a-level-maths-verifier-gaps.md`` §3 items 3, 4 and 6 name
the last three kinds the A-level bank needs: ``distribution``, ``hypothesis`` and
``correlation`` / ``regression``. They are built on ``sympy.stats`` with exact
results and a declared tolerance where a decimal is required (``DECISIONS.md``:
no scipy), and this file proves each one verifies a record and can fail one.

The deliberate failures are the point. A distribution check that cannot tell a
tail from its mirror, or a hypothesis check whose decision survives a wrong
p-value, would pass for the wrong reason. Each of those is asserted here.
"""

from __future__ import annotations

import pytest

from textbook.verify.verify import verify_problem

from support import problem_record

# --- distribution -------------------------------------------------------------


DISTRIBUTION_CASES = [
    (
        "binomial_exactly",
        {
            "kind": "distribution",
            "distribution": "binomial",
            "parameters": {"n": 10, "p": "1/2"},
            "query": {"kind": "exactly", "value": 5},
            "answer": "63/256",
        },
    ),
    (
        "binomial_at_most",
        {
            "kind": "distribution",
            "distribution": "binomial",
            "parameters": {"n": 10, "p": "1/2"},
            "query": {"kind": "at_most", "value": 4},
            "answer": "193/512",
        },
    ),
    (
        "binomial_at_least",
        {
            "kind": "distribution",
            "distribution": "binomial",
            "parameters": {"n": 10, "p": "1/2"},
            "query": {"kind": "at_least", "value": 2},
            "answer": "1013/1024",
        },
    ),
    (
        "binomial_between",
        {
            "kind": "distribution",
            "distribution": "binomial",
            "parameters": {"n": 10, "p": "1/2"},
            "query": {"kind": "between", "low": 2, "high": 4},
            "answer": "375/1024",
        },
    ),
    (
        "normal_at_most_tolerance",
        {
            "kind": "distribution",
            "distribution": "normal",
            "parameters": {"mu": 0, "sigma": 1},
            "query": {"kind": "at_most", "value": "3/2"},
            "answer": "0.9332",
            "tolerance": "0.0001",
        },
    ),
    (
        "normal_standard_quantile",
        {
            "kind": "distribution",
            "distribution": "normal",
            "parameters": {"mu": 0, "sigma": 1},
            "query": {"kind": "at_most", "value": "1.96"},
            "answer": "0.975",
            "tolerance": "0.0001",
        },
    ),
    (
        "normal_shifted_at_least",
        {
            "kind": "distribution",
            "distribution": "normal",
            "parameters": {"mu": 100, "sigma": 15},
            "query": {"kind": "at_least", "value": 120},
            "answer": "0.0912",
            "tolerance": "0.0001",
        },
    ),
]


@pytest.mark.parametrize(
    "case,check", DISTRIBUTION_CASES, ids=[case[0] for case in DISTRIBUTION_CASES]
)
def test_distribution_verifies_a_record(case, check):
    assert verify_problem(problem_record(check)).ok


def test_distribution_at_most_and_at_least_are_different():
    """P(X <= 4) = 193/512 and P(X >= 4) = 1 - P(X <= 3) are not the same; an
    exact record for one must not pass for the other."""
    at_most = {
        "kind": "distribution",
        "distribution": "binomial",
        "parameters": {"n": 10, "p": "1/2"},
        "query": {"kind": "at_most", "value": 4},
        "answer": "193/512",
    }
    at_least = dict(at_most, query={"kind": "at_least", "value": 4})
    assert verify_problem(problem_record(at_most)).ok
    assert not verify_problem(problem_record(at_least)).ok


def test_distribution_wrong_tail_fails():
    """The right area on the wrong side of a normal: 0.0668 is P(Z >= 1.5),
    never P(Z <= 1.5). A tolerance loose enough to accept it would be wrong."""
    wrong_tail = {
        "kind": "distribution",
        "distribution": "normal",
        "parameters": {"mu": 0, "sigma": 1},
        "query": {"kind": "at_most", "value": "3/2"},
        "answer": "0.0668",
        "tolerance": "0.001",
    }
    report = verify_problem(problem_record(wrong_tail))
    assert not report.ok
    assert "probability" in report.errors[0]


def test_distribution_unknown_name_fails_loudly():
    problem = problem_record(
        {
            "kind": "distribution",
            "distribution": "poisson",
            "parameters": {"lambda": 2},
            "query": {"kind": "exactly", "value": 1},
            "answer": "2*exp(-2)",
        }
    )
    report = verify_problem(problem)
    assert not report.ok
    assert "unknown distribution" in report.errors[0]


# --- hypothesis ---------------------------------------------------------------


def test_hypothesis_binomial_left_tail_rejects():
    problem = problem_record(
        {
            "kind": "hypothesis",
            "distribution": "binomial",
            "parameters": {"n": 20, "p": "1/2"},
            "tail": "left",
            "observed": 5,
            "p_value": "5425/262144",
            "alpha": "1/20",
            "decision": "reject",
        }
    )
    assert verify_problem(problem).ok


def test_hypothesis_binomial_retains_at_a_smaller_alpha():
    """The same p-value retains at the 1% level and rejects at the 5% level."""
    common = {
        "kind": "hypothesis",
        "distribution": "binomial",
        "parameters": {"n": 20, "p": "1/2"},
        "tail": "left",
        "observed": 5,
        "p_value": "5425/262144",
        "decision": "retain",
    }
    assert verify_problem(problem_record(dict(common, alpha="1/100"))).ok
    assert not verify_problem(problem_record(dict(common, alpha="1/20"))).ok


def test_hypothesis_binomial_critical_region():
    problem = problem_record(
        {
            "kind": "hypothesis",
            "distribution": "binomial",
            "parameters": {"n": 20, "p": "1/2"},
            "tail": "left",
            "observed": 5,
            "critical_region": {"max": 5},
            "alpha": "1/20",
            "decision": "reject",
        }
    )
    assert verify_problem(problem).ok


def test_hypothesis_normal_right_tail_retains():
    problem = problem_record(
        {
            "kind": "hypothesis",
            "distribution": "normal",
            "parameters": {"mu": 0, "sigma": 1},
            "tail": "right",
            "observed": "3/2",
            "p_value": "0.0668",
            "alpha": "1/20",
            "decision": "retain",
            "tolerance": "0.001",
        }
    )
    assert verify_problem(problem).ok


def test_hypothesis_two_tailed_doubles_the_smaller_tail():
    problem = problem_record(
        {
            "kind": "hypothesis",
            "distribution": "normal",
            "parameters": {"mu": 0, "sigma": 1},
            "tail": "two",
            "observed": "3/2",
            "p_value": "0.1336",
            "alpha": "1/20",
            "decision": "retain",
            "tolerance": "0.001",
        }
    )
    assert verify_problem(problem).ok


def test_hypothesis_p_value_that_flips_the_decision_fails():
    """A p-value on the wrong side of alpha flips the decision. The declared
    0.07 would retain at the 5% level, but the exact tail probability is
    5425/262144 < 0.05, so the test must reject, not retain."""
    problem = problem_record(
        {
            "kind": "hypothesis",
            "distribution": "binomial",
            "parameters": {"n": 20, "p": "1/2"},
            "tail": "left",
            "observed": 5,
            "p_value": "0.07",
            "alpha": "1/20",
            "decision": "retain",
        }
    )
    report = verify_problem(problem)
    assert not report.ok
    assert any("p-value" in error for error in report.errors)


def test_hypothesis_correct_p_value_but_wrong_decision_fails():
    problem = problem_record(
        {
            "kind": "hypothesis",
            "distribution": "binomial",
            "parameters": {"n": 20, "p": "1/2"},
            "tail": "left",
            "observed": 5,
            "p_value": "5425/262144",
            "alpha": "1/20",
            "decision": "retain",
        }
    )
    report = verify_problem(problem)
    assert not report.ok
    assert any("implies reject" in error for error in report.errors)


def test_hypothesis_wrong_critical_region_fails():
    problem = problem_record(
        {
            "kind": "hypothesis",
            "distribution": "binomial",
            "parameters": {"n": 20, "p": "1/2"},
            "tail": "left",
            "observed": 5,
            "critical_region": {"max": 4},
            "alpha": "1/20",
            "decision": "reject",
        }
    )
    report = verify_problem(problem)
    assert not report.ok
    assert any("critical region" in error for error in report.errors)


def test_hypothesis_equal_p_value_needs_an_explicit_comparison():
    """P(X <= 0) = 1/1024 exactly. With alpha equal to it, `p < alpha` and
    `p <= alpha` disagree, so the record must say which rule it uses."""
    base = {
        "kind": "hypothesis",
        "distribution": "binomial",
        "parameters": {"n": 10, "p": "1/2"},
        "tail": "left",
        "observed": 0,
        "p_value": "1/1024",
        "alpha": "1/1024",
        "decision": "reject",
    }
    report = verify_problem(problem_record(base))
    assert not report.ok
    assert "comparison" in report.errors[0]

    explicit = dict(base, comparison="le")
    assert verify_problem(problem_record(explicit)).ok


def test_hypothesis_needs_a_p_value_or_a_critical_region():
    problem = problem_record(
        {
            "kind": "hypothesis",
            "distribution": "binomial",
            "parameters": {"n": 20, "p": "1/2"},
            "tail": "left",
            "observed": 5,
            "alpha": "1/20",
            "decision": "reject",
        }
    )
    report = verify_problem(problem)
    assert not report.ok
    assert "p_value" in report.errors[0] or "critical_region" in report.errors[0]


# --- correlation --------------------------------------------------------------


CORRELATION_DATA = {
    "x": [1, 2, 3, 4, 5],
    "y": [2, 4, 5, 4, 5],
}


def test_correlation_exact_surd():
    problem = problem_record(
        dict(CORRELATION_DATA, kind="correlation", answer="sqrt(15)/5")
    )
    assert verify_problem(problem).ok


def test_correlation_declared_tolerance():
    problem = problem_record(
        dict(
            CORRELATION_DATA,
            kind="correlation",
            answer="0.7746",
            tolerance="0.0001",
        )
    )
    assert verify_problem(problem).ok


def test_correlation_perfect_positive_is_one():
    problem = problem_record(
        {"kind": "correlation", "x": [1, 2, 3], "y": [2, 4, 6], "answer": "1"}
    )
    assert verify_problem(problem).ok


def test_correlation_sign_reversed_fails():
    """The same data with the sign flipped is not a rounding difference."""
    problem = problem_record(
        dict(CORRELATION_DATA, kind="correlation", answer="-sqrt(15)/5")
    )
    report = verify_problem(problem)
    assert not report.ok
    assert "correlation" in report.errors[0]


def test_correlation_constant_variable_is_undefined():
    problem = problem_record(
        {"kind": "correlation", "x": [1, 1, 1], "y": [2, 3, 4], "answer": "0"}
    )
    report = verify_problem(problem)
    assert not report.ok
    assert "undefined" in report.errors[0]


# --- regression ---------------------------------------------------------------


def test_regression_least_squares_exact():
    problem = problem_record(
        dict(
            CORRELATION_DATA,
            kind="regression",
            answer={"gradient": "3/5", "intercept": "11/5"},
        )
    )
    assert verify_problem(problem).ok


def test_regression_declared_tolerance():
    problem = problem_record(
        dict(
            CORRELATION_DATA,
            kind="regression",
            answer={"gradient": "0.6", "intercept": "2.2"},
            tolerance="0.001",
        )
    )
    assert verify_problem(problem).ok


def test_regression_perfect_line():
    problem = problem_record(
        {
            "kind": "regression",
            "x": [1, 2, 3],
            "y": [2, 4, 6],
            "answer": {"gradient": "2", "intercept": "0"},
        }
    )
    assert verify_problem(problem).ok


def test_regression_sign_reversed_gradient_fails():
    problem = problem_record(
        dict(
            CORRELATION_DATA,
            kind="regression",
            answer={"gradient": "-3/5", "intercept": "11/5"},
        )
    )
    report = verify_problem(problem)
    assert not report.ok
    assert "gradient" in report.errors[0]


def test_regression_answer_must_name_both_coefficients():
    problem = problem_record(
        dict(CORRELATION_DATA, kind="regression", answer={"gradient": "3/5"})
    )
    report = verify_problem(problem)
    assert not report.ok
    assert "intercept" in report.errors[0]
