"""The verification-oracle seam: one owner per check kind, and loud failures.

``SHAPE.md`` promises that "adding an oracle is a new module under
``engine/textbook/verify/oracles/``, registered by check kind". This file pins
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
from textbook.verify.verify import verify_bank

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
