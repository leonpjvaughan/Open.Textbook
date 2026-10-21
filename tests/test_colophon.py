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

BOOKS = books.discover_books()
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
    included_tiers = MATHS.tiers_included(MATHS.profile(profile).tier_filter)
    nav = scaffold.build_nav_list(
        MATHS.strands, MATHS.chapters, included_tiers=included_tiers
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
        "Before you use this book",
        "not a replacement",
        "accepts no liability",
        "/terms/",
        "/acknowledgements/",
        "Reporting a mistake",
        "github.com/leonpjvaughan/Open.Textbook/issues",
    ],
)
def test_about_page_carries_the_required_statements(needle):
    assert needle in read_page(), f"the About page does not mention {needle!r}"


def test_about_page_names_the_tiers_correctly():
    """`tier_axis` labels F as "Higher and Foundation" and H as "Higher only";
    the page must name the first, not read both out together.

    The order is the axis's, which is higher-first — the order the levels are listed in
    everywhere a reader sees them.
    """
    page = read_page()
    assert "It covers Higher and Foundation tier," in page
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
    sources = scaffold._sources_data(book)
    if not (sources.get("references") or []):
        # A book may rest on no external document — a book about modelling does —
        # but "no sources" must then be a stated position rather than an omission,
        # and the statement has to reach the page a reader checks.
        note = str(sources.get("note") or "").strip()
        assert note, (
            f"{book.id}: About this book links no sources and does not say why. "
            "Either add the references the book rests on, or say in sources.yaml "
            "that it rests on none."
        )
        page = " ".join(_about_page(book).split())
        first = " ".join(note.split())[:70]
        assert first in page, f"{book.id}: the sources note is not on the About page"
        return

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


# ── the book's own jurisdiction ────────────────────────────────────────────────
#
# The About page once ended its opening sentence with a hardcoded "for England", so
# every Irish book was published claiming to be an English one, and it credited the
# Department for Education and the Open Government Licence for material owned by the
# NCCA. A generator that asserts a country is a generator that will be wrong the
# first time the collection leaves that country, so the country is now declared and
# these tests are what keep it honest.


def _about_page(book):
    from textbook import scaffold

    return scaffold.colophon_page(book, licence=None)


NON_REFERENCE = [b for b in BOOKS if b.qualification != "Reference"]


def _follows_a_syllabus(book) -> bool:
    """A course names a country because it follows that country's curriculum.

    A book that declares `syllabus: false` follows none, so there is no country to
    name and no curriculum body to credit — and the About page says that instead.
    The escape is declared in the book's own `curriculum.yaml` and checked by
    `test_a_book_without_a_syllabus_says_so`, so it is a shape the collection
    knows about rather than a skip.
    """
    return book.curriculum_data.get("meta", {}).get("syllabus", True) is not False


COURSES = [b for b in NON_REFERENCE if _follows_a_syllabus(b)]
IDS = [b.id for b in COURSES]
SYLLABUS_FREE = [b for b in NON_REFERENCE if not _follows_a_syllabus(b)]
FREE_IDS = [b.id for b in SYLLABUS_FREE]


@pytest.mark.parametrize("book", COURSES, ids=IDS)
def test_every_course_declares_where_it_is_for(book):
    """No default: a book with no declared jurisdiction is refused, not guessed."""
    meta = book.curriculum_data.get("meta", {})
    assert str(meta.get("jurisdiction") or "").strip(), (
        f"{book.id} declares no meta.jurisdiction, so its About page cannot say "
        "which country it is for"
    )
    assert str(meta.get("level_word") or "").strip(), (
        f"{book.id} declares no meta.level_word, so its About page would guess "
        "whether the jurisdiction says 'tier' or 'level'"
    )
    assert str(meta.get("curriculum_body") or "").strip(), (
        f"{book.id} declares no meta.curriculum_body, so its About page cannot say "
        "whose curriculum it follows"
    )


@pytest.mark.parametrize("book", COURSES, ids=IDS)
def test_the_about_page_names_only_this_books_jurisdiction(book):
    """The sentence is built from the declaration, not from a literal."""
    meta = book.curriculum_data["meta"]
    page = _about_page(book)
    assert f"book for {meta['jurisdiction']}." in page, page[:400]

    # And it names no other. These are the two jurisdictions in the collection;
    # adding a third means adding it here, which is the point.
    others = {"England", "Ireland"} - {meta["jurisdiction"]}
    for other in others:
        assert f"book for {other}" not in page, (
            f"{book.id} is for {meta['jurisdiction']} but its About page says "
            f"{other}"
        )


@pytest.mark.parametrize("book", COURSES, ids=IDS)
def test_the_about_page_does_not_claim_another_countrys_licence(book):
    """Crown copyright and the OGL are England's. A book that has not been given
    terms it can cite says so by not making a claim."""
    meta = book.curriculum_data["meta"]
    page = _about_page(book)
    if meta.get("curriculum_licence"):
        return
    for phrase in ("Crown copyright", "Open Government Licence", "Department for Education"):
        assert phrase not in page, (
            f"{book.id} declares no curriculum licence, so its About page must not "
            f"claim {phrase!r}"
        )
    assert meta["curriculum_body"] in page, (
        f"{book.id} must name whose curriculum it follows"
    )


@pytest.mark.parametrize("book", SYLLABUS_FREE, ids=FREE_IDS)
def test_a_book_without_a_syllabus_says_so(book):
    """The other half of the exemption above: no syllabus, no country, **and it
    says so on the page**, rather than leaving a reader to infer it from a list of
    documents that is not a curriculum."""
    page = _about_page(book)
    assert "This book follows no syllabus" in page, page[:400]
    for phrase in ("book for England", "book for Ireland", "Crown copyright"):
        assert phrase not in page, (
            f"{book.id} follows no syllabus, so its About page must not claim {phrase!r}"
        )
