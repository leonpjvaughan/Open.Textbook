"""Does a question need an equation the reader is not shown?

Declaration-first, and the module docstring says why: measured on the two completed
physics books, 0 of 34 GCSE expressions and 53 of 176 A-level ones resolve against
the booklet, because the rest are *substituted* forms — `0.5 * 1200 * 15**2` is
kinetic energy and nothing in the expression says so. An inferred match passes by
accident, so the declaration is what the check trusts and inference only suggests.
"""

from __future__ import annotations

import pytest

from textbook import book as books
from textbook.verify import coverage

PHYSICS = [b for b in books.discover_books() if b.subject == "Physics"]
IDS = [b.id for b in PHYSICS]


def test_a_declared_item_the_reader_is_given_passes():
    items = {"sim-eq": {"id": "sim-eq", "provision": {"aqa": "given", "ocr": "given"}}}
    record = {"id": "r", "plays": "sim-eq"}
    assert coverage.errors(record, items, ("aqa", "ocr")) == []


def test_a_declaration_inside_the_check_block_counts_too():
    items = {"sim-eq": {"id": "sim-eq", "provision": {"aqa": "given"}}}
    record = {"id": "r", "check": {"kind": "dimensions", "plays": "sim-eq"}}
    assert coverage.errors(record, items, ("aqa",)) == []


def test_an_unknown_item_fails_and_names_the_id():
    errors = coverage.errors({"id": "r", "plays": "nope"}, {"x": {"id": "x"}}, ("aqa",))
    assert errors and "nope" in errors[0]


def test_an_item_every_board_expects_the_reader_to_recall_fails():
    """`know` means the reader must hold it, so a question must not need it."""
    items = {"v": {"id": "v", "provision": {"aqa": "know", "ocr": "know"}}}
    errors = coverage.errors({"id": "r", "plays": "v"}, items, ("aqa", "ocr"))
    assert errors and "recall" in errors[0]


def test_an_item_one_board_provides_passes():
    """Board provision differs, and the check follows the book's own board list."""
    items = {"v": {"id": "v", "provision": {"aqa": "know", "edexcel": "question"}}}
    assert coverage.errors({"id": "r", "plays": "v"}, items, ("aqa", "edexcel")) == []


def test_a_book_with_no_booklet_cannot_play_one():
    errors = coverage.errors({"id": "r", "plays": "anything"}, {}, ("aqa",))
    assert errors and "no booklet" in errors[0]


def test_no_declaration_is_not_an_error():
    """Completeness is the thing this check cannot prove, and it must not pretend.

    121 of the 323 expression-bearing records are pure arithmetic with nothing to
    play; nothing mechanical separates them from an undeclared formula, which is
    why `undeclared()` reports the gap rather than failing it.
    """
    assert coverage.errors({"id": "r"}, {"x": {"id": "x"}}, ("aqa",)) == []


@pytest.mark.parametrize("book", PHYSICS, ids=IDS)
def test_every_declaration_in_the_real_books_is_valid(book):
    assert coverage.check_book(book) == []


@pytest.mark.parametrize("book", PHYSICS, ids=IDS)
def test_the_booklet_parses_and_the_gap_is_countable(book):
    """The tooling works on the real booklets, and the gap is a number not a guess."""
    items = coverage.booklet_items(book)
    assert items, f"{book.id} declares a booklet but no items were read"

    parsable = sum(1 for item in items.values() if coverage._sides(item))
    assert parsable > len(items) * 0.9, (
        f"only {parsable} of {len(items)} booklet items parse; "
        "antlr4-python3-runtime is what makes sympy.parsing.latex work"
    )

    # Undeclared symbolic records are reported, not failed.
    assert isinstance(coverage.undeclared(book), list)


def test_infer_suggests_but_never_decides():
    """It is an author's aid: it finds a booklet side, and it cannot see a
    substituted form — which is the whole reason the declaration is the truth."""
    book = books.book_by_id("a-level-physics")
    items = coverage.booklet_items(book)
    suggested = coverage.infer({"check": {"expression": "m * a"}}, items)
    assert suggested, "a literal booklet side should be suggested"
    assert coverage.infer({"check": {"expression": "0.5 * 1200 * 15**2"}}, items) == []
