"""The figure-claim verifier.

Two figures printed a multiplication that does not give the number beside it, and every
check passed because none of them reads a number. The first fix parsed the printed
sentence, which is unbounded work; this one takes the claim as data and decides it with
the same exact CAS the problem banks use.
"""

from __future__ import annotations

import json
from pathlib import Path

import pytest

from textbook.verify import working


def test_the_self_test_agrees_with_itself():
    assert working.self_test() == 0


@pytest.mark.parametrize(
    "claim, expected",
    [
        # The arithmetic is right and so is the print.
        (
            {"expression": "P * r * t", "values": {"P": 1500, "r": "0.065", "t": 4},
             "answer": 390, "shown": "390.00"},
            [],
        ),
        # The original defect: 1500 × 0.07 × 4 is 420, not 390.
        (
            {"expression": "P * r * t", "values": {"P": 1500, "r": 0.07, "t": 4},
             "answer": 390, "shown": "390.00"},
            ["not the answer", "prints"],
        ),
        # A square root needs no notation table here.
        (
            {"expression": "sqrt(6 ** 2 + 8 ** 2)", "values": {}, "answer": 10,
             "shown": "10.00"},
            [],
        ),
        # A value the figure never substituted is a false claim, not a pass.
        (
            {"expression": "m * v", "values": {"m": 2}, "answer": 6, "shown": "6"},
            ["still has"],
        ),
    ],
)
def test_a_claim_is_decided_exactly(claim, expected):
    problems = working.check_claim(claim)
    for fragment in expected:
        assert any(fragment in problem for problem in problems), (fragment, problems)
    if not expected:
        assert problems == []


def test_a_claim_about_a_number_the_reader_never_sees_fails():
    """The cheap half of "the display and the data agree"."""
    record = {
        "slug": "fixture",
        "route": "/fixture/",
        "readout": "The total is €1,890.00.",
        "claims": [
            {"expression": "P * r * t", "values": {"P": 1500, "r": "0.065", "t": 4},
             "answer": 390, "shown": "390.00"},
        ],
    }
    problems = working.check_record(record)
    assert any("does not contain" in problem for problem in problems), problems


def test_a_claims_file_is_read_and_reported(tmp_path):
    record = {
        "slug": "fixture",
        "route": "/fixture/",
        "readout": "3 × 14.29 = 42.86",
        "claims": [
            {"expression": "3 * 14.29", "values": {}, "answer": 42.86, "shown": "42.86"},
        ],
    }
    path = tmp_path / "claims.json"
    path.write_text(json.dumps([record]), encoding="utf-8")
    assert working.check_file(path) == 1
    record["claims"][0]["answer"] = 42.87
    record["readout"] = "3 × 14.29 = 42.87"
    record["claims"][0]["shown"] = "42.87"
    path.write_text(json.dumps([record]), encoding="utf-8")
    assert working.check_file(path) == 0
