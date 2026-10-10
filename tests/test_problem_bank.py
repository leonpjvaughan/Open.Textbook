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
