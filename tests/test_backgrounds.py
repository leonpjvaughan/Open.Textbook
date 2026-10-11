"""Mapping an animated background to a scope — the seam, with nothing shipped.

Nothing runs one yet: no topic needs it, decoration competes with the practice
budget, and motion distracts a reader reading mathematics. What is tested here is
that the *mapping* works and fails loudly, so adding the first animation later is
a registry entry and a config line rather than a change to the shell.
"""

from __future__ import annotations

import pytest

from textbook import backgrounds, book as books


def test_nothing_ships_an_animation():
    """The registry is empty on purpose. This is the guard on that intent.

    When the first animation lands this test is the prompt to read
    `research/design/background-effects.md` again and to give the module the
    guarantees its docstring lists — tokens for colour, reduced motion, idle
    pause, and a page that is complete with scripting off.
    """
    assert backgrounds.ANIMATIONS == {}


def test_no_bundle_or_book_configures_one_today():
    collection = books.load_collection()
    assert backgrounds.validate(collection.get("backgrounds")) == []
    for book in books.discover_books():
        assert backgrounds.validate(book.backgrounds) == []
        assert backgrounds.resolve(collection, book.backgrounds) is None


def test_the_narrowest_scope_wins():
    book = {"sections": {"5.3": "field"}, "chapters": {"5": "chapter"}, "default": "book"}
    assert backgrounds.resolve({}, book, section="5.3", chapter=5) == "field"
    assert backgrounds.resolve({}, book, section="5.4", chapter=5) == "chapter"
    assert backgrounds.resolve({}, book, section="9.1", chapter=9) == "book"


def test_a_section_can_switch_off_its_chapter():
    """`null` is a value, not an absence — otherwise a chapter is a trap."""
    book = {"chapters": {"5": "field"}, "sections": {"5.3": None}}
    assert backgrounds.resolve({}, book, section="5.2", chapter=5) == "field"
    assert backgrounds.resolve({}, book, section="5.3", chapter=5) is None


def test_a_book_inherits_the_site_default():
    collection = {"backgrounds": {"site": "field"}}
    assert backgrounds.resolve(collection, {}, section="1.1", chapter=1) == "field"
    # ...but its own default wins over it.
    assert backgrounds.resolve(collection, {"default": "other"}, chapter=1) == "other"


def test_the_landing_page_has_its_own_scope():
    """The landing page is not in a book, so it resolves from the collection."""
    assert backgrounds.resolve({"backgrounds": {"site": "field"}}, None) == "field"


@pytest.mark.parametrize("scope", ["site", "default"])
def test_an_unregistered_id_is_a_problem(scope):
    problems = backgrounds.validate({scope: "nope"})
    assert problems and "nope" in problems[0]


@pytest.mark.parametrize("scope", ["chapters", "sections"])
def test_an_unregistered_id_is_a_problem_in_a_nested_scope(scope):
    problems = backgrounds.validate({scope: {"5": "nope"}})
    assert problems and "nope" in problems[0]


def test_a_malformed_group_is_reported_rather_than_ignored():
    problems = backgrounds.validate({"chapters": ["5"]})
    assert problems and "mapping" in problems[0]
