"""The verification-oracle seam: one owner per check kind, and loud failures.

``SHAPE.md`` promises that "adding an oracle is a new module under
``engine/src/textbook/verify/oracles/``, registered by check kind". This file pins
that promise the way ``test_render_hooks.py`` pins the hook order: the
check-kind → oracle table is one table, a kind registered to a module that does
not exist fails loudly rather than silently verifying nothing, and
``book.yaml → oracles`` (with a bank's own override) selects which oracles a
bank may use.

``test_problem_bank.py`` remains the proof that the SymPy oracle still verifies
every bank; this file is about the seam, not the mathematics.
"""

from __future__ import annotations

import pytest
import yaml

from textbook import book as book_mod
from textbook.verify import oracles
from textbook.verify.verify import Report, verify_bank, verify_problem

#: The table an author (``PROBLEMS.md``) and CI read. Changing a check kind or
#: moving one between oracles must change this file in the same commit.
PINNED_KINDS = {
    "all": "sympy",
    "evaluate": "sympy",
    "solve": "sympy",
    "compare": "sympy",
    "rounded": "sympy",
    "between": "sympy",
    "apply": "sympy",
    "statistic": "sympy",
    "system": "sympy",
    "inequality": "sympy",
    "vector": "sympy",
    "ode": "sympy",
    "approx": "sympy",
    "distribution": "sympy",
    "hypothesis": "sympy",
    "correlation": "sympy",
    "regression": "sympy",
    "dimensions": "units",
    "convert": "units",
    "sigfigs": "units",
    "uncertainty": "units",
    "resolve": "units",
    "gradient": "units",
    "intercept": "units",
    "area": "units",
    "structured": "units",
}


def test_check_kind_table_is_pinned():
    assert oracles.check_kinds() == PINNED_KINDS


def test_every_pinned_kind_has_a_handler_and_only_the_pinned_kinds():
    selection = oracles.select()
    for kind in PINNED_KINDS:
        assert selection.handler(kind) is not None, f"no handler for {kind!r}"


def test_unknown_oracle_fails_loudly():
    with pytest.raises(oracles.UnknownOracle, match="ghost"):
        oracles.select(["ghost"])


def test_a_kind_registered_to_a_missing_module_fails_loudly(monkeypatch):
    """A kind whose oracle module is not there must fail, not be skipped."""
    monkeypatch.setitem(
        oracles.ORACLE_MODULES, "ghost", "textbook.verify.oracles.ghost"
    )
    monkeypatch.setitem(oracles.KIND_ORACLE, "ghost-kind", "ghost")
    with pytest.raises(oracles.UnknownOracle, match="ghost"):
        oracles.load("ghost")


def test_a_kind_from_an_unselected_oracle_fails_loudly():
    """Selecting no oracles is loud for every kind, not a silent pass."""
    with pytest.raises(oracles.UnknownCheck, match="sympy"):
        oracles.select([]).handler("evaluate")


class _Report:
    def __init__(self):
        self.errors: list[str] = []
        self.warnings: list[str] = []


def test_an_unknown_check_kind_is_an_error_not_a_pass():
    report = _Report()
    oracles.verify_check({"kind": "ghost"}, {}, report, oracles.select())
    assert report.errors and "ghost" in report.errors[0]


# --- malformed records report, they do not raise ------------------------------


#: A check whose handler reads a key the record does not have. The verifier's
#: contract is a report, so each must produce an error, not a traceback that
#: names no record. ``hypothesis`` guards its own keys already; it is here so the
#: list covers the reviewer's five reproductions.
MALFORMED_CHECKS = [
    {"kind": "evaluate"},
    {"kind": "rounded", "value": "1.2"},
    {"kind": "compare", "lhs": "1", "rhs": "2"},
    {"kind": "between", "low": "0"},
    {"kind": "hypothesis", "distribution": "binomial"},
]


@pytest.mark.parametrize(
    "check", MALFORMED_CHECKS, ids=[c["kind"] for c in MALFORMED_CHECKS]
)
def test_a_malformed_check_is_a_report_not_a_traceback(check):
    report = verify_problem({"id": "typo", "check": check})
    assert isinstance(report, Report)
    assert report.errors, f"{check['kind']} with missing keys was accepted"


def test_the_report_names_what_is_malformed():
    report = verify_problem({"id": "typo", "check": {"kind": "evaluate"}})
    assert any("malformed" in error for error in report.errors), report.errors


# --- an `all` that asserts nothing is not a check -----------------------------


def test_an_all_with_no_sub_checks_is_an_error():
    """The same rule as ``structured``: a check that cannot fail is not a check."""
    report = verify_problem({"id": "empty", "check": {"kind": "all"}})
    assert not report.ok
    assert any("asserts nothing" in error for error in report.errors), report.errors


def test_an_all_with_sub_checks_can_still_fail():
    """The guard must not turn a working composite into a pass."""
    report = verify_problem(
        {
            "id": "composite",
            "check": {
                "kind": "all",
                "checks": [
                    {"kind": "evaluate", "expression": "1 + 1", "answer": "2"},
                    {"kind": "evaluate", "expression": "1 + 1", "answer": "3"},
                ],
            },
        }
    )
    assert not report.ok


def test_an_unselected_oracle_inside_an_all_still_fails_loudly():
    """The malformed-check guard must not swallow the deliberate loud failures."""
    with pytest.raises(oracles.UnknownCheck, match="units"):
        oracles.verify_check(
            {"kind": "all", "checks": [{"kind": "dimensions"}]},
            {},
            Report(problem_id="case"),
            oracles.select(["sympy"]),
        )


def test_a_book_declares_the_oracles_its_banks_may_use():
    book = book_mod.book_for_bank(book_mod.discover_books()[0].banks / "chapter-01.yaml")
    assert book is not None
    assert book.oracles == ("sympy",)


def test_a_bank_may_override_its_books_oracles(tmp_path):
    good = tmp_path / "good.yaml"
    good.write_text(
        yaml.safe_dump(
            {
                "oracles": ["sympy"],
                "problems": [
                    {
                        "id": "ok",
                        "check": {"kind": "evaluate", "expression": "1 + 1", "answer": "2"},
                    }
                ],
            }
        ),
        encoding="utf-8",
    )
    assert verify_bank(good).ok

    bad = tmp_path / "bad.yaml"
    bad.write_text(
        yaml.safe_dump({"oracles": ["ghost"], "problems": []}), encoding="utf-8"
    )
    with pytest.raises(oracles.UnknownOracle, match="ghost"):
        verify_bank(bad)


# --- a bank that will not parse -----------------------------------------------------
#
# `textbook.verify` used to let the YAML parser's exception escape, which printed a
# traceback from inside a library and **no verdict at all**. A run over fifty banks then
# stopped at the fourth with a stack trace, and a caller counting `ok` lines read the
# short run as a clean one. A broken bank is a defect in a file a person edits, so it is
# reported like every other defect: the path, the reason, and a non-zero exit.


def _write(tmp_path, name: str, text: str):
    path = tmp_path / name
    path.write_text(text, encoding="utf-8")
    return path


def test_a_bank_with_invalid_yaml_is_a_verdict_not_a_traceback(tmp_path):
    path = _write(tmp_path, "broken.yaml", "problems:\n  - id: x\n    check: [\n")
    report = verify_bank(path)
    assert not report.ok
    assert report.load_error is not None
    assert "could not parse the file" in report.load_error
    # The parser's own message carries the line, and the line is the useful part.
    assert "line" in report.load_error
    assert report.errors == [report.load_error]


def test_a_missing_bank_is_a_verdict_not_a_traceback(tmp_path):
    report = verify_bank(tmp_path / "absent.yaml")
    assert not report.ok
    assert report.load_error is not None
    assert "could not read the file" in report.load_error


def test_a_broken_bank_does_not_stop_the_run(tmp_path):
    """The failure this guards against was a *short* run that looked clean.

    `verify_bank` is what the CLI loops over, so the property that matters is that a
    broken file returns rather than raises: one bad bank in a directory must not hide
    the verdict on the others.
    """
    good = _write(
        tmp_path,
        "good.yaml",
        "problems:\n"
        "  - id: a\n"
        "    section: '1.1'\n"
        "    tier: F\n"
        "    refs: [N1]\n"
        "    statement: 'Work out $2 + 2$.'\n"
        "    check: {kind: evaluate, expression: '2 + 2', answer: '4'}\n"
        "    answer_text: '$4$'\n",
    )
    bad = _write(tmp_path, "bad.yaml", "problems:\n  - id: x\n    check: [\n")
    reports = [verify_bank(path) for path in sorted(tmp_path.glob("*.yaml"))]
    assert len(reports) == 2, "a broken bank ended the run"
    assert [report.ok for report in reports] == [False, True]
    assert good.is_file() and bad.is_file()


# --- a solution set is a set ---------------------------------------------------------
#
# `solve()` returns a list, and every arithmetic path assumed a single expression:
# `expr.replace` and `simplify(a - b)` both raise on a list. So a bank whose expression
# was a `solve()` could not be checked at all — and the failure arrived as an
# `AttributeError` from inside the oracle rather than as a verdict.
#
# The comparison is a **multiset**, because the order `solve()` happens to return is not
# a claim the bank makes, while the *number* of roots is exactly the claim a bank about a
# cubic is making.


def _roots_bank(tmp_path, answer: str):
    return _write(
        tmp_path,
        "roots.yaml",
        "problems:\n"
        "  - id: roots\n"
        "    section: '5.5'\n"
        "    tier: H\n"
        "    refs: ['4.4']\n"
        "    statement: 'Solve $x^2 - 2x + 5 = 0$.'\n"
        "    check:\n"
        "      kind: evaluate\n"
        "      expression: 'solve(x**2 - 2*x + 5, x)'\n"
        f"      answer: '{answer}'\n"
        "    answer_text: 'the conjugate pair'\n",
    )


def test_a_solve_result_is_checked_as_a_set(tmp_path):
    assert verify_bank(_roots_bank(tmp_path, "[1 - 2*I, 1 + 2*I]")).ok


def test_the_order_of_a_solution_set_does_not_matter(tmp_path):
    assert verify_bank(_roots_bank(tmp_path, "[1 + 2*I, 1 - 2*I]")).ok


def test_a_missing_root_fails(tmp_path):
    """The case the check exists for: a bank that solved a quadratic and listed one root."""
    report = verify_bank(_roots_bank(tmp_path, "[1 + 2*I]"))
    assert not report.ok


def test_a_repeated_root_fails(tmp_path):
    """A multiset and not a set, so a root written twice is not a second root."""
    assert not verify_bank(_roots_bank(tmp_path, "[1 + 2*I, 1 + 2*I]")).ok


def test_a_solution_set_against_a_single_expression_fails(tmp_path):
    assert not verify_bank(_roots_bank(tmp_path, "1 + 2*I")).ok
