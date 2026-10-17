"""One constructor for the hook config.

This is the `extra` block every hook reads, and it has grown by one key five times:
`qualification`, `proofs_dir`, `proofs_url`, `themes`, `default_theme`. Six places in
`tests/` used to hand-write it, and two had already drifted — one wrote a tier *filter*
where production writes a profile *id*, and none carried the proof book. A hook that
starts reading a new key then passes in production and silently misbehaves in a test,
which is the failure a test exists to prevent.
"""

from __future__ import annotations

import pytest

from textbook import config as cfg
from textbook import pipeline
from textbook.book import discover_books

BOOKS = discover_books()
IDS = [book.id for book in BOOKS]


@pytest.mark.parametrize("book", BOOKS, ids=IDS)
def test_the_constructor_produces_exactly_what_the_build_produces(book):
    """`from_parts` and `make_config` cannot disagree, because one calls the other."""
    production = pipeline.make_config(book, book.default_profile.id)
    made = cfg.from_parts(book.docs, book=book, profile=book.default_profile.id)
    assert made == production
    # And every key a hook could read is present in both.
    assert set(made["extra"]) == set(production["extra"])


@pytest.mark.parametrize("book", BOOKS, ids=IDS)
def test_the_profile_is_an_id_and_never_a_tier_filter(book):
    """`tier_filter` answers a different question and must not stand in for the id."""
    config = cfg.from_parts(book.docs, book=book, profile=None)
    assert cfg.profile(config) == book.default_profile.id
    # The property that catches the drift for every book: what comes back is one of the
    # book's profile **ids**. `"H"` is not one of them, and `"all"` is both an id and a
    # filter for the reference book — which is why the check is membership, not `!=`.
    assert cfg.profile(config) in {profile.id for profile in book.profiles}


def test_the_bundle_registry_does_not_need_a_book():
    """A test with a temporary docs tree still gets the themes a page needs."""
    config = cfg.from_parts(".")
    assert config["extra"]["themes"]
    assert config["extra"]["default_theme"] in config["extra"]["themes"]
    assert "book" not in config["extra"]
