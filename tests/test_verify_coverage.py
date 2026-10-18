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


# An item that `sympy.parsing.latex` cannot read says so on the item, and says why:
#
#     - id: mean-of-data
#       latex: '\bar{x} = \frac{\sum x}{n} = \frac{\sum f x}{\sum f}'
#       symbolic: false
#       why: A \sum with no limits, which the parser only reads with explicit bounds.
#
# This used to be a tuple of eight `(regex, reason)` pairs here — `\sum` without
# limits, `\begin{…}`, `{}^n C_r`, `\binom`, `\mathbb`, `\operatorname`, paired
# delimiters and spacing commands — so a ninth kind of unreadable notation failed a
# test whose only fix was another regex, in a file that is not about booklets. The
# declaration is data in the booklet now and `coverage.booklet_faults` reads it, so
# a new notation is a row in a booklet and this file names no notation at all.
@pytest.mark.parametrize("book", WITH_BOOKLET, ids=BOOKLET_IDS)
def test_every_item_is_read_or_says_why_it_is_not(book):
    """The tooling works on the real booklets, and the gap is countable not guessed.

    `coverage._sides` returns nothing for an item `sympy.parsing.latex` cannot read,
    so a problem that plays one gets **no coverage check** — the check cannot see the
    relation. That is a real gap in what this project verifies, so it is written down:
    each such item carries `symbolic: false` and a `why:` in the booklet, and
    `booklet_faults` proves that every item is either read or declared. The count of
    declarations is the size of the gap, printed by reading the data rather than
    maintained beside it.
    """
    items = coverage.booklet_items(book)
    assert items, f"{book.id} declares a booklet but no items were read"

    faults = coverage.booklet_faults(items)
    assert not faults, (
        "these booklet items carry LaTeX that `sympy.parsing.latex` does not read and "
        "do not declare it, so a problem declaring one gets no coverage check:\n  "
        + "\n  ".join(faults)
        + "\nFix the LaTeX, or add `symbolic: false` and a `why:` to the item."
    )

    # The declaration is the whole mechanism, in both directions, so pin the two
    # shapes here rather than trusting the booklets to exercise them.
    unread = {"x": {"id": "x", "latex": "\\sum x"}}
    assert coverage.booklet_faults(unread), "an undeclared unreadable item passed"

    declared = {
        "x": {
            "id": "x",
            "latex": "\\sum x",
            "symbolic": False,
            "why": "A sum with no limits: a layout, not a relation.",
        }
    }
    assert coverage.booklet_faults(declared) == []
    assert coverage.unreadable(declared) == [
        ("x", "A sum with no limits: a layout, not a relation.")
    ]

    # A declaration without a reason, and one on an item that does parse, are both
    # faults: the first is an opt-out and the second would hide a real relation.
    reasonless = {"x": {"id": "x", "latex": "\\sum x", "symbolic": False}}
    assert coverage.booklet_faults(reasonless)
    stale = {
        "x": {
            "id": "x",
            "latex": "F = ma",
            "symbolic": False,
            "why": "A relation this item does not actually have.",
        }
    }
    assert "parses" in " ".join(coverage.booklet_faults(stale))

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


def test_a_composite_check_is_not_invisible():
    """`check.checks` nests, and reading only the top level under-counted the gap.

    Found while declaring the Applied Mathematics banks, where most mechanics
    records are `kind: all`: the sub-check carried the formula, the record
    carried no declaration, and `undeclared` could not see it. The number it
    printed was a lower bound presented as a measurement.
    """
    from textbook.verify import coverage

    composite = {
        "check": {
            "kind": "all",
            "checks": [
                {"kind": "evaluate", "expression": "m * a", "answer": "F"},
                {"kind": "dimensions", "consistency": "F = m a", "units": {}},
            ],
        }
    }
    assert coverage.expressions(composite) == ["m * a", "F = m a"]

    # A record with no expression anywhere is not part of the gap.
    assert coverage.expressions({"check": {"kind": "structured", "steps": []}}) == []
