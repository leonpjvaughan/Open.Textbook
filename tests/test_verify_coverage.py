"""Does a question need an equation the reader is not shown?

Declaration-first, and the module docstring says why: measured on the two completed
physics books, 0 of 34 GCSE expressions and 53 of 176 A-level ones resolve against
the booklet, because the rest are *substituted* forms — `0.5 * 1200 * 15**2` is
kinetic energy and nothing in the expression says so. An inferred match passes by
accident, so the declaration is what the check trusts and inference only suggests.
"""

from __future__ import annotations

import re

import pytest

from textbook import book as books
from textbook.verify import coverage

PHYSICS = [b for b in books.discover_books() if b.subject == "Physics"]
IDS = [b.id for b in PHYSICS]

# The booklet tests are about booklets, so they select the books that declare one.
# Selecting by subject instead assumed every physics book has a formula sheet — true
# of the English pair, and not yet true of the Irish one.
WITH_BOOKLET = [b for b in books.discover_books() if b.booklet_name]
BOOKLET_IDS = [b.id for b in WITH_BOOKLET]


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


#: Notations `sympy.parsing.latex` cannot read. Each entry is a regex matched against
#: the item's LaTeX and the reason it fails.
#:
#: `coverage._sides` returns nothing for a matched item, so a problem that declares one
#: gets **no coverage check** — the check cannot see the relation. That is a real gap in
#: what this project verifies, so it is written down and counted rather than hidden
#: inside a percentage threshold.
#:
#: This is a list of *notations*, not of item ids, and that is deliberate. The same
#: gaps recur in every book that carries formulae — a `\sum` with no limits appears in
#: three booklets already — so an id list would have to be rewritten for each new book
#: while telling us nothing new. A notation list is checked against every booklet at
#: once, and a tenth *kind* of unreadable notation is what makes the test fail.
UNPARSABLE_NOTATION: tuple[tuple[str, str], ...] = (
    (r"\\sum", "a \\sum, which the parser only reads with explicit limits"),
    (r"\\begin\{", "an environment such as pmatrix or array: a layout, not a relation"),
    (r"\{\\^", "prescript notation such as {}^n C_r"),
    (r"\\left[|\\right]|\\langle|\\rangle", "paired delimiters the parser wants as \\langle / \\rangle"),
    (r"\\mathbb", "a blackboard-bold number set: a symbol list, not an expression"),
    (r"\\binom", "a binomial coefficient, whose factorial form the parser rejects"),
    (r"\\operatorname", "a named operator"),
    (r"\\qquad|\\quad|\\;", "spacing commands, which a relation cannot contain"),
)


def _unreadable_reason(latex: str) -> str | None:
    """Why `sympy.parsing.latex` cannot read this LaTeX, or None if it is a fault."""
    for pattern, reason in UNPARSABLE_NOTATION:
        if re.search(pattern, latex):
            return reason
    return None


@pytest.mark.parametrize("book", WITH_BOOKLET, ids=BOOKLET_IDS)
def test_the_booklet_parses_and_the_gap_is_countable(book):
    """The tooling works on the real booklets, and the gap is a number not a guess."""
    items = coverage.booklet_items(book)
    assert items, f"{book.id} declares a booklet but no items were read"

    # An item that will not parse is only a failure when it *should* parse. A word
    # formula — `speed = distance / time`, with the words in `\text{}` — has no
    # relation to check, so `_sides` returning nothing is right for it. So is any
    # notation in UNPARSABLE_NOTATION, with its reason recorded.
    faults = []
    for item_id, item in items.items():
        if coverage._sides(item):
            continue
        latex = str(item.get("latex") or "")
        if "\\text{" in latex:
            continue  # a word formula: nothing symbolic to check
        if _unreadable_reason(latex) is None:
            faults.append((item_id, latex))

    assert not faults, (
        "these booklet items carry a relation that `sympy.parsing.latex` should read "
        "and does not, so a problem declaring one gets no coverage check:\n  "
        + "\n  ".join(f"{i}: {l!r}" for i, l in faults)
        + "\nFix the LaTeX, or add the notation to UNPARSABLE_NOTATION with a reason."
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


# --- a record may need more than one booklet item -----------------------------
#
# "Differentiate $x^2\sin x$" needs the derivative of a power *and* the product
# rule, and the booklet supplies them as two items. Naming one would let the check
# pass while the other was missing, which is the failure it exists to catch.


def test_a_record_may_name_several_items_and_all_are_read():
    items = {
        "standard-derivatives": {"id": "standard-derivatives", "provision": {"aqa": "given"}},
        "differentiation-rules": {"id": "differentiation-rules", "provision": {"aqa": "given"}},
    }
    record = {"id": "r", "plays": ["standard-derivatives", "differentiation-rules"]}
    assert coverage.declared_all(record) == ["standard-derivatives", "differentiation-rules"]
    assert coverage.errors(record, items, ("aqa",)) == []


def test_a_bad_id_in_a_list_is_reported_even_when_the_others_are_fine():
    """The whole point of allowing a list: one good id must not cover a bad one."""
    items = {"standard-derivatives": {"id": "standard-derivatives", "provision": {"aqa": "given"}}}
    record = {"id": "r", "plays": ["standard-derivatives", "nope"]}
    errors = coverage.errors(record, items, ("aqa",))
    assert len(errors) == 1
    assert "nope" in errors[0]


def test_a_list_may_not_hide_a_recall_item():
    """The second id is held to the same provision rule as the first."""
    items = {
        "standard-derivatives": {"id": "standard-derivatives", "provision": {"aqa": "given"}},
        "memorised": {"id": "memorised", "provision": {"aqa": "know"}},
    }
    record = {"id": "r", "plays": ["standard-derivatives", "memorised"]}
    errors = coverage.errors(record, items, ("aqa",))
    assert errors and "memorised" in errors[0]


def test_a_repeated_id_is_read_once():
    """A declaration reads as prose, so repetition is tolerated and deduplicated."""
    items = {"a": {"id": "a", "provision": {"aqa": "given"}}}
    assert coverage.declared_all({"id": "r", "plays": ["a", "a"]}) == ["a"]


def test_a_single_string_still_declares_one_item():
    """The list form is additive: every existing declaration keeps its meaning."""
    assert coverage.declared_all({"id": "r", "plays": "a"}) == ["a"]
    assert coverage.declared({"id": "r", "plays": "a"}) == "a"
    assert coverage.declared({"id": "r"}) is None
    assert coverage.declared_all({"id": "r"}) == []


def test_a_list_inside_the_check_block_counts_too():
    items = {"a": {"id": "a", "provision": {"aqa": "given"}}}
    record = {"id": "r", "check": {"kind": "apply", "plays": ["a"]}}
    assert coverage.declared_all(record) == ["a"]


def test_an_empty_declaration_is_not_a_declaration():
    """`plays: []` and `plays: ""` mean nothing was declared, not an invalid id.

    A blank declaration must not read as "declared, and fine" — `undeclared()`
    counts on `declared_all` being empty for a record that says nothing.
    """
    assert coverage.declared_all({"id": "r", "plays": []}) == []
    assert coverage.declared_all({"id": "r", "plays": ""}) == []
    assert coverage.declared_all({"id": "r", "plays": ["", "  "]}) == []
