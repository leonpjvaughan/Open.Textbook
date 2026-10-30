"""Every problem bank must verify; the verifier must also catch planted errors."""

from __future__ import annotations

from pathlib import Path

import pytest
import yaml

from textbook.book import discover_books, repo_root
from textbook.verify.verify import verify_bank, verify_problem

ALL_BANKS = sorted(
    bank for book in discover_books() for bank in book.banks.glob("*.yaml")
)


def test_banks_exist():
    assert ALL_BANKS, "no problem banks found under any book"


@pytest.mark.parametrize("bank", ALL_BANKS, ids=lambda path: path.name)
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
    from textbook.verify.render import render_answer_block

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


def test_yaml_has_no_control_character_escapes():
    """Double-quoted YAML turns \\a and \\f into control characters, silently
    corrupting LaTeX. Authors must single-quote maths scalars."""
    import yaml

    offenders = []

    def walk(value, where):
        if isinstance(value, dict):
            for key, item in value.items():
                walk(item, f"{where}.{key}")
        elif isinstance(value, list):
            for index, item in enumerate(value):
                walk(item, f"{where}[{index}]")
        elif isinstance(value, str) and any(
            ord(c) < 32 and c not in "\n\t" for c in value
        ):
            offenders.append(f"{where}: {value!r}")

    sources = list(ALL_BANKS) + [
        path
        for book in discover_books()
        if book.booklet_name
        for path in book.root.glob("booklet/*.yaml")
    ]
    for path in sources:
        walk(yaml.safe_load(path.read_text(encoding="utf-8")), str(path))
    assert not offenders, "control characters in YAML (use single quotes): " + "; ".join(offenders)


# --- a record the reader would see no answer for ------------------------------


def _bank(tmp_path, *records, oracles=("sympy",)):
    """A bank on disk, because the rule is about a bank, not a record.

    `oracles` matters: a `units` kind in a bank that declares only `sympy` fails
    loudly, which is the seam working.
    """
    path = tmp_path / "bank.yaml"
    path.write_text(
        yaml.safe_dump({"oracles": list(oracles), "problems": list(records)}),
        encoding="utf-8",
    )
    return verify_bank(path)


def test_a_bank_record_that_renders_no_answer_fails(tmp_path):
    """The answers block is built from the records CI verifies.

    So a record that verifies and renders nothing puts a question on the page
    with no answer under it, and nothing in CI can see it — the verifier passed.
    Six records in the GCSE banks were doing exactly this: a `kind: all` check has
    no top-level `answer` (its values live in the sub-checks), so without
    `answer_text` there was nothing to render.
    """
    record = {
        "id": "all-with-no-answer-text",
        "statement": "Decide whether 7 is prime.",
        "answer_label": "Prime?",
        "check": {
            "kind": "all",
            "checks": [
                {"kind": "compare", "relation": "!=", "lhs": "Mod(7,2)", "rhs": "0"},
                {"kind": "compare", "relation": "!=", "lhs": "Mod(7,3)", "rhs": "0"},
            ],
        },
    }
    bad = _bank(tmp_path, record)
    assert not bad.ok
    assert any("renders no answer" in e for e in bad.errors), bad.errors

    # ...and the same record passes once the reader can be shown the answer.
    record["answer_text"] = "Yes."
    assert _bank(tmp_path, record).ok


def test_a_structured_record_needs_no_answer_text(tmp_path):
    """Its model answer is prose rendered from its points.

    That is the one honest exception: a `structured` check asserts presence,
    order and coverage, and deliberately says nothing about correctness, so it
    renders its points rather than a conclusion.
    """
    record = {
        "id": "structured-with-no-answer-text",
        "statement": "Describe how to measure the period of a pendulum.",
        "check": {
            "kind": "structured",
            "requires": ["time-swings", "divide"],
            "concepts": ["period"],
            "points": [
                {"id": "time-swings", "text": "Time several swings.",
                 "concepts": ["period"]},
                {"id": "divide", "text": "Divide by the number of swings."},
            ],
        },
    }
    assert _bank(tmp_path, record, oracles=("sympy", "units")).ok


def test_a_record_alone_needs_no_answer_text():
    """The rule is a bank rule, not a mathematical one.

    `verify_problem` answers "is this record's algebra right?", and a verifier
    test that made a record up to ask that question should not have to invent an
    `answer_text` first.
    """
    record = {
        "id": "record-with-no-answer-text",
        "check": {"kind": "evaluate", "expression": "2 + 2", "answer": "4"},
    }
    assert verify_problem(record).ok


def test_every_bank_renders_an_answer_for_every_record():
    """The guard over the real corpus, which is where the six were found."""
    from textbook.verify import render

    missing = []
    for path in sorted((repo_root() / "books").glob("*/problems/*.yaml")):
        data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        for record in data.get("problems", []):
            check = record.get("check") or {}
            if render.rendered_answer(record):
                continue
            if check.get("kind") == "structured" and check.get("points"):
                continue
            missing.append(f"{path.name}:{record.get('id')}")
    assert not missing, "records that would render no answer: " + ", ".join(missing)


def test_no_rendered_answer_has_a_list_inside_a_paragraph():
    """W3, one layer down: the answer text is data, and a folded scalar flattens it.

    `answer_text: >-` turns every single newline into a space and keeps only the
    blank lines, so a list arrives as "... each one.\n- item ...". The renderer puts
    the answer after `**Answer:**`, so the first line joins that paragraph, the list
    never forms, and the reader sees three hyphens in a sentence. Measured on
    ie-lc 7.8 and 12.9 — the last pages the site scan found doing it — and fixed
    with a literal scalar (`|-`).

    The check runs on what the renderer produces rather than on the YAML style,
    because that is what reaches the page: a list item must start a block.
    """
    from textbook.lint import lists_without_a_blank_line
    from textbook.verify.render import render_problem

    broken = []
    for bank in ALL_BANKS:
        data = yaml.safe_load(bank.read_text(encoding="utf-8")) or {}
        for problem in data.get("problems") or []:
            if lists_without_a_blank_line(render_problem(problem, 1)):
                broken.append(f"{bank.name}: {problem.get('id')}")
    assert broken == [], "an answer renders a list inside a paragraph: " + ", ".join(broken)
