"""The book's home page, and the line that names its levels.

The home page opens by saying what the book is: how many chapters, which levels, and
which awarding bodies. The levels line is the one that matters here, because it was
wrong in a way that looked right.

It used to be built by joining every value of the book's ``tier_axis``. That axis has
one entry per *code*, and the top code's entry describes Higher-only content rather
than a level a reader enrols in — so Junior Cycle Mathematics read

    Tiers: Ordinary and Higher, Higher only

which looks like two tiers, and Leaving Certificate Mathematics would have read

    Tiers: Foundation, Ordinary and Higher, Ordinary and Higher, Higher only

with the middle level named twice. The levels of a course are the ones the code every
reader studies names, which is `lower_code`, and that is what the colophon already
reads. This file is what stops the other line drifting back.
"""

from __future__ import annotations

import re

import pytest

from textbook import book as books

PAGE = "index.md"


def books_with_a_tier_axis():
    for book in books.discover_books():
        axis = getattr(book, "tier_axis", {}) or {}
        if axis:
            yield pytest.param(book, id=book.id)


def tiers_line(book) -> str | None:
    path = book.docs / PAGE
    if not path.exists():
        return None
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("- Tiers:"):
            return line
    return None


def test_the_line_names_the_levels_and_not_the_axis_codes():
    """The line is the lower code's description, and nothing else.

    A book whose axis is `{F: "Foundation and Higher", H: "Higher only"}` says
    `Tiers: Foundation and Higher` — the levels — and never mentions "Higher only",
    which is a statement about content rather than a level.
    """
    offenders = []
    for book in books.discover_books():
        axis = getattr(book, "tier_axis", {}) or {}
        if not axis:
            continue
        line = tiers_line(book)
        if line is None:
            continue  # the page may not carry the line; that is not this rule's business
        expected = f"- Tiers: {axis[book.lower_code]}"
        if line != expected:
            offenders.append(f"{book.id}: {line!r}, expected {expected!r}")
    assert not offenders, (
        "the home page's Tiers line does not name the book's levels (lowest first, the "
        "code every reader studies): " + "; ".join(offenders)
    )


def test_no_home_page_still_lists_the_higher_only_note_as_a_tier():
    """The specific defect, pinned: "Higher only" is not a level."""
    offenders = []
    for book in books.discover_books():
        line = tiers_line(book)
        if line and "Higher only" in line:
            offenders.append(f"{book.id}: {line!r}")
    assert not offenders, (
        'a home page lists "Higher only" among its tiers, which reads as a level a '
        "reader can enrol in: " + "; ".join(offenders)
    )


def test_the_generator_writes_the_levels_and_not_the_axis_codes():
    """A new book must not repeat it, so the generator is checked too."""
    source = (books.repo_root() / "engine" / "src" / "textbook" / "scaffold.py").read_text(
        encoding="utf-8"
    )
    # The old form joined every axis value.
    assert "', '.join(book.tier_axis.values())" not in source, (
        "home_stub joins every tier_axis value, so a new book would read "
        '"Ordinary and Higher, Higher only" instead of naming its levels'
    )
    assert re.search(r"Tiers: \{levels\}", source), (
        "home_stub no longer writes the levels line from `lower_code`"
    )
