"""The reader-facing page about the book.

It answers what the book is, who made it, where the content came from, whether
the answers can be trusted, and how to report a mistake. The licence is the
author's decision, not ours, so the page renders a licence section only when
``collection.yaml`` sets one — this test file is what stops a placeholder
licence standing in for that decision.
"""

from __future__ import annotations

import re

import pytest
import yaml

from textbook import book as books
from textbook import scaffold

MATHS = books.book_by_id("gcse-maths")
PAGE = MATHS.docs / scaffold.COLOPHON_FILE


def read_page() -> str:
    return PAGE.read_text(encoding="utf-8")


# --- the page exists, and stays generated ------------------------------------


def test_about_page_exists():
    assert PAGE.is_file(), "the About page is missing"


def test_about_page_is_in_sync_with_its_generator():
    assert read_page() == scaffold.colophon_page(MATHS), (
        f"{PAGE} is stale; run `python -m textbook.scaffold`"
    )


# --- it is reachable in the built navigation ---------------------------------


@pytest.mark.parametrize("profile", [p.id for p in MATHS.profiles])
def test_about_page_is_in_the_navigation(profile):
    config = yaml.safe_load(
        scaffold.config_path(MATHS, profile).read_text(encoding="utf-8")
    )
    entries = {key: value for entry in config["nav"] for key, value in entry.items()}
    assert scaffold.COLOPHON_TITLE in entries, f"{profile}: About page is not in the nav"
    assert entries[scaffold.COLOPHON_TITLE] == scaffold.COLOPHON_FILE
    assert (MATHS.docs / scaffold.COLOPHON_FILE).is_file()


# --- the statements the page must carry --------------------------------------


@pytest.mark.parametrize(
    "needle",
    [
        "Crown copyright",
        "Open Government Licence",
        "AQA",
        "Pearson Edexcel",
        "OCR",
        "Ofqual",
        "SymPy",
        "Reporting a mistake",
        "github.com/leonpjvaughan/Open.Textbook/issues",
    ],
)
def test_about_page_carries_the_required_statements(needle):
    assert needle in read_page(), f"the About page does not mention {needle!r}"


def test_about_page_names_the_tiers_correctly():
    """`tier_axis` labels F as "Foundation and Higher" and H as "Higher only";
    the page must name the first, not read both out together."""
    page = read_page()
    assert "It covers Foundation and Higher tier," in page
    assert "Higher only tier" not in page


def test_about_page_offers_no_dead_mail_route():
    """The domain sends and receives no mail, so ``mailto:`` would be dead.

    The page states the route that does work, and says plainly that it is not
    email.
    """
    page = read_page()
    assert "mailto:" not in page
    assert "no email address" in page


# --- the licence seam --------------------------------------------------------


def test_the_page_shows_the_collection_licence_or_nothing():
    """One line in collection.yaml decides this, so the page follows it."""
    if scaffold.collection_licence():
        assert "## Licence" in read_page()
    else:
        assert "## Licence" not in read_page()


def test_no_licence_section_when_none_is_set():
    assert "## Licence" not in scaffold.colophon_page(MATHS, licence=None)


def test_a_licence_appears_only_when_set():
    base = scaffold.colophon_page(MATHS, licence=None)
    with_licence = scaffold.colophon_page(MATHS, licence="Creative Commons Attribution 4.0")
    assert with_licence.startswith(base), "the licence must not disturb the rest"
    assert "## Licence" in with_licence
    assert "Creative Commons Attribution 4.0" in with_licence


def test_a_licence_mapping_links_to_its_terms():
    page = scaffold.colophon_page(
        MATHS,
        licence={
            "name": "Open Government Licence v3.0",
            "url": "https://example.test/ogl",
        },
    )
    assert "[Open Government Licence v3.0](https://example.test/ogl)" in page


def test_no_placeholder_licence():
    assert not re.search(r"\b(TODO|TBD|FIXME|XXX|placeholder)\b", read_page(), re.I)
