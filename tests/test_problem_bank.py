"""Every problem bank must verify; the verifier must also catch planted errors."""

from __future__ import annotations

from pathlib import Path

import pytest

from verification.verify import verify_bank, verify_problem

BANKS = sorted(Path("problems").glob("*.yaml"))


def test_banks_exist():
    assert BANKS, "no problem banks found under problems/"


@pytest.mark.parametrize("bank", BANKS, ids=lambda path: path.name)
def test_bank_verifies(bank: Path):
    report = verify_bank(bank)
    assert report.ok, "\n".join(report.errors)


def test_verifier_catches_bad_arithmetic_step():
    problem = {
        "id": "planted-bad-arithmetic",
        "check": {"kind": "evaluate", "expression": "3 + 2*4", "answer": "20"},
        "steps": [{"expr": "3 + 2*4"}, {"expr": "20"}],
    }
    report = verify_problem(problem)
    assert not report.ok, "verifier accepted a wrong order-of-operations step"


def test_verifier_catches_wrong_solution_set():
    problem = {
        "id": "planted-wrong-solution",
        "symbols": {"x": {"real": True}},
        "step_relation": "solutions",
        "check": {"kind": "solve", "equation": "2*x + 3 = 11", "variable": "x", "answer": ["5"]},
        "steps": [{"equation": "2*x + 3 = 11"}],
    }
    report = verify_problem(problem)
    assert not report.ok, "verifier accepted an incorrect solution set"


def test_verifier_catches_non_equivalent_step():
    problem = {
        "id": "planted-non-equivalent",
        "symbols": {"x": {"real": True}},
        "check": {"kind": "evaluate", "expression": "(x + 3)*(x - 4)", "answer": "x**2 - x - 12"},
        "steps": [{"expr": "(x + 3)*(x - 4)"}, {"expr": "x**2 + x - 12"}],
    }
    report = verify_problem(problem)
    assert not report.ok, "verifier accepted a sign error in a step"


def test_verifier_accepts_correct_rounding():
    problem = {
        "id": "round-ok",
        "check": {"kind": "rounded", "value": "3.14159", "rounded": "3.14", "to": "0.01"},
    }
    assert verify_problem(problem).ok


def test_verifier_rejects_wrong_rounding():
    problem = {
        "id": "round-bad",
        "check": {"kind": "rounded", "value": "3.14159", "rounded": "3.15", "to": "0.01"},
    }
    report = verify_problem(problem)
    assert not report.ok, "verifier accepted an incorrectly rounded value"


def test_implies_relation_allows_a_superset():
    problem = {
        "id": "imply-ok",
        "symbols": {"x": {"real": True}},
        "step_relation": "implies",
        "check": {"kind": "solve", "equation": "x**2 = 16", "variable": "x", "answer": ["4", "-4"]},
        "steps": [{"equation": "x = 4"}, {"equation": "x**2 = 16"}],
    }
    report = verify_problem(problem)
    assert report.ok
    assert report.warnings, "an implication step should warn about extraneous roots"


def test_implies_relation_rejects_unrelated_solutions():
    problem = {
        "id": "imply-bad",
        "symbols": {"x": {"real": True}},
        "step_relation": "implies",
        "check": {"kind": "solve", "equation": "x = 5", "variable": "x", "answer": ["5"]},
        "steps": [{"equation": "x = 4"}, {"equation": "x = 5"}],
    }
    assert not verify_problem(problem).ok


def test_all_check_fails_when_a_part_is_wrong():
    problem = {
        "id": "all-bad",
        "check": {
            "kind": "all",
            "checks": [
                {"kind": "evaluate", "expression": "1 + 1", "answer": "2"},
                {"kind": "evaluate", "expression": "2 + 2", "answer": "5"},
            ],
        },
    }
    report = verify_problem(problem)
    assert not report.ok, "verifier accepted a failing sub-check"


def test_between_check_enforces_the_interval():
    good = {"id": "between-ok", "check": {"kind": "between", "value": "0.305", "low": "0.3", "high": "0.31"}}
    bad = {"id": "between-bad", "check": {"kind": "between", "value": "0.4", "low": "0.3", "high": "0.31"}}
    assert verify_problem(good).ok
    assert not verify_problem(bad).ok


def test_rendered_answer_block_comes_from_the_record():
    from verification.render import render_answer_block

    block = render_answer_block(
        [
            {
                "statement": "$1 + 1$",
                "answer_text": "$2$",
                "check": {"kind": "evaluate", "expression": "1 + 1", "answer": "2"},
            }
        ]
    )
    assert '<details markdown="1">' in block
    assert "$2$" in block
    assert "**Answer:**" in block


def test_apply_check_rejects_a_wrong_derivative():
    problem = {
        "id": "calc-check-bad",
        "symbols": {"x": {"real": True}},
        "check": {
            "kind": "apply",
            "expression": "x**3",
            "apply": {"op": "diff", "args": ["x"]},
            "answer": "2*x**2",
        },
    }
    assert not verify_problem(problem).ok


def test_apply_step_rejects_a_wrong_derivative():
    problem = {
        "id": "calc-step-bad",
        "symbols": {"x": {"real": True}},
        "check": {
            "kind": "apply",
            "expression": "x**3",
            "apply": {"op": "diff", "args": ["x"]},
            "answer": "3*x**2",
        },
        "steps": [
            {"expr": "x**3"},
            {"expr": "2*x**2", "relation": "apply", "apply": {"op": "diff", "args": ["x"]}},
        ],
    }
    assert not verify_problem(problem).ok


def test_statistic_check_rejects_a_wrong_median():
    problem = {
        "id": "stat-bad",
        "check": {"kind": "statistic", "data": [3, 5, 6, 8], "stat": "median", "answer": "5"},
    }
    assert not verify_problem(problem).ok
