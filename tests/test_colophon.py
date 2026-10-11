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
    include_higher = MATHS.profile(profile).tier_filter != "foundation"
    nav = scaffold.build_nav_list(
        MATHS.strands, MATHS.chapters, include_higher=include_higher
    )
    entries = {key: value for entry in nav for key, value in entry.items()}
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


def test_a_book_without_a_booklet_does_not_claim_one():
    """The About page names the board's **Formulae** booklet only when the book
    ships one. A-level Mathematics declares no booklet (BOOKLETS.md: the boards'
    documents have not been retrieved), so a page that promised one would send a
    reader looking for a page that is not there.
    """
    for book in books.discover_books():
        page = scaffold.colophon_page(book)
        claims = "**Formulae** booklet" in page
        assert claims == bool(book.booklet_name), (
            f"{book.id}: the About page claims a booklet ({claims}) but "
            f"booklet_name={book.booklet_name!r}"
        )


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


# --- attribution --------------------------------------------------------------

ALL_BOOKS = books.discover_books()
IDS = [b.id for b in ALL_BOOKS]


@pytest.mark.parametrize("book", ALL_BOOKS, ids=IDS)
def test_every_book_links_the_sources_it_rests_on(book):
    """A global list of ids meant a new book got no links until someone remembered.

    The A-level Mathematics page listed **none** of the sources its content rests
    on, because its ids (`dfe-a-level`, `aqa-7357`, …) matched nothing in a tuple
    kept in `scaffold.py`. The tag now lives on the reference, so the book's own
    `sources.yaml` decides — and a new book is right by default rather than by
    someone else's edit.
    """
    links = scaffold._attribution_links(book)
    assert links, f"{book.id}: About this book links none of its sources"

    tagged = [
        ref
        for ref in (scaffold._sources_data(book).get("references") or [])
        if isinstance(ref, dict) and ref.get("attribution")
    ]
    # One link per tagged reference, so a tag that produces nothing is a failure
    # rather than a silently missing link.
    assert len(links) == len(tagged), f"{book.id}: {len(tagged)} tagged, {len(links)} linked"
    for ref in tagged:
        assert ref.get("title") and ref.get("url"), f"{book.id}: tagged without a title/url"


def test_an_untagged_reference_is_not_linked():
    """The tag is the allowlist; the point of it was keeping the page short.

    `mathsgenie` and `pearson-titles` are market and context sources written down
    for provenance, not content the book reproduces, so the reader is not sent to
    them from the About page.
    """
    ids = {ref.get("id") for ref in scaffold._sources_data(MATHS).get("references", [])}
    assert "mathsgenie" in ids, "the fixture this test rests on has moved"
    linked = " ".join(scaffold._attribution_links(MATHS))
    assert "mathsgenie" not in linked
