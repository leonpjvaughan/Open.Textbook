"""The disclaimer, the terms of use, and the compiled acknowledgements.

These pages are reader-facing promises about a free product, so they are tested
like content rather than like a template: the sentences a reader is entitled to
see must be present, the legal limits must not be overclaimed, and every source
a book records must reach the page that credits it.
"""

from __future__ import annotations

import html
import re

import pytest

from textbook import book as books
from textbook import config as cfg, legal, portal, scaffold
from textbook.hooks import disclaimer


BOOKS = books.discover_books()
IDS = [b.id for b in BOOKS]

#: The books that name no awarding body: the two reference works, and the book
#: about modelling. Named rather than derived from `boards`, so the day a book
#: gains or loses an examination the test says so instead of moving with it.
NOT_A_COURSE = ("maths-applied", "numerical-methods", "proofs")


def note(book) -> str:
    """Everything a reader is told: the About note and the home-page note."""
    return "\n".join(legal.disclaimer_lines(book)) + legal.disclaimer_html(book)


def config_for(book):
    return cfg.from_parts(book.docs, book=book, profile=book.default_profile.id)


# --- the disclaimer -----------------------------------------------------------


@pytest.mark.parametrize("book", BOOKS, ids=IDS)
def test_every_about_page_carries_the_disclaimer(book):
    """Every book makes the same legal promise, whatever kind of book it is."""
    page = scaffold.colophon_page(book, licence=None)
    assert "## Before you use this book" in page
    assert "accepts no liability" in page
    assert "statutory rights" in page
    assert "/terms/" in page
    assert "/acknowledgements/" in page


def test_a_course_book_is_told_the_book_is_a_companion():
    """The course wording, which is unchanged: a reader is on a course."""
    page = scaffold.colophon_page(books.book_by_id("gcse-maths"), licence=None)
    assert "study companion" in page
    assert "not a replacement" in page
    assert "exam board's current specification" in page


@pytest.mark.parametrize("book_id", NOT_A_COURSE)
def test_a_book_that_is_not_a_course_is_not_told_about_one(book_id):
    """Its reader may be anyone, so the note has no teacher and no board in it."""
    text = note(books.book_by_id(book_id))
    assert "not a course" in text
    for word in ("exam board", "teacher", "specification", "school", "college"):
        assert word not in text, f"{book_id}: the note says {word!r}"


@pytest.mark.parametrize("book", BOOKS, ids=IDS)
def test_only_a_book_with_a_bank_says_a_computer_checked_it(book):
    """`oracles: []` means no bank, so there are no answers to claim a check on."""
    text = note(book)
    if book.oracles:
        assert "check the answers with a computer" in text
    else:
        assert "There are no answers to check" in text
        assert "computer" not in text


@pytest.mark.parametrize("book", BOOKS, ids=IDS)
def test_the_summary_names_the_reader_the_book_is_for(book):
    summary = re.search(r"<summary>(.*?)</summary>", legal.disclaimer_html(book))
    assert summary is not None
    alongside = "your course" in summary.group(1)
    assert alongside == bool(book.boards), f"{book.id}: {summary.group(1)!r}"


@pytest.mark.parametrize("book", BOOKS, ids=IDS)
def test_a_book_s_kind_is_what_its_declarations_say(book):
    """The note branches on `boards`, so the two declarations must agree.

    A future course that names no awarding body would be given the note for a book
    that is not a course, and nothing else would notice.
    """
    course = book.qualification not in (books.REFERENCE, "Misc")
    assert bool(book.boards) == course, (
        f"{book.id}: qualification {book.qualification!r}, boards {book.boards!r}"
    )


@pytest.mark.parametrize("book", BOOKS, ids=IDS)
def test_every_book_home_page_carries_the_note(book):
    """A reader meets the note before the first chapter, not only in About."""
    home = (book.docs / "index.md").read_text(encoding="utf-8")
    assert ":::disclaimer" in home, f"{book.id}: its home page has no disclaimer"


def test_the_note_is_expandable_and_needs_no_javascript():
    book = books.book_by_id("gcse-maths")
    output = disclaimer.on_page_markdown(
        "Intro\n\n:::disclaimer\n", None, config_for(book), None
    )
    assert output.startswith("Intro")
    assert "<details class=\"disclaimer\">" in output
    assert "<summary>" in output
    assert "colophon.md" in output
    assert "<script" not in output
    assert ":::disclaimer" not in output


def test_the_built_note_is_the_book_s_own():
    """The hook reads the book, so a non-course book does not get a course note."""
    book = books.book_by_id("numerical-methods")
    output = disclaimer.on_page_markdown(
        ":::disclaimer\n", None, config_for(book), None
    )
    assert f"<summary>{legal.STANDALONE_SUMMARY}</summary>" in output
    assert "not a course" in output
    assert "teacher" not in output


def test_the_note_is_line_anchored():
    book = books.book_by_id("gcse-maths")
    source = "See :::disclaimer in the prose.\n"
    assert disclaimer.on_page_markdown(source, None, config_for(book), None) == source


def test_a_new_book_gets_the_note_from_the_scaffold():
    """A future book must not depend on somebody remembering the directive."""
    stub = scaffold.home_stub(books.book_by_id("gcse-maths"), [])
    assert ":::disclaimer" in stub


# --- the terms ----------------------------------------------------------------


def terms() -> str:
    return legal.terms_html()


@pytest.mark.parametrize(
    "needle",
    [
        "study companion",
        "not a replacement",
        "accepts no liability for any incorrect information",
        "statutory rights",
        "death or personal injury",
        "fraud or fraudulent misrepresentation",
        "as is",
        "as available",
        "AQA",
        "Pearson Edexcel",
        "OCR",
        "NCCA",
        "SEC",
        "CC BY 4.0",
        "MIT Licence",
        "no analytics",
        "England and Wales",
        legal.CONTACT_URL,
    ],
)
def test_the_terms_carry_the_required_statements(needle):
    assert needle in terms(), f"the terms do not mention {needle!r}"


def test_the_terms_do_not_invent_a_dead_contact_route():
    text = terms()
    assert "mailto:" not in text
    assert "no email address" in text


def test_the_terms_do_not_leave_a_placeholder():
    assert not re.search(r"\b(TODO|TBD|FIXME|XXX|placeholder)\b", terms(), re.I)


def test_the_terms_link_to_the_licences_they_name():
    text = terms()
    assert "github.com/leonpjvaughan/Open.Textbook/blob/main/LICENSE" in text
    assert "github.com/leonpjvaughan/Open.Textbook/blob/main/LICENSE-CODE" in text


# --- the acknowledgements -----------------------------------------------------


def acknowledgements() -> str:
    return legal.acknowledgements_html()


@pytest.mark.parametrize("book", BOOKS, ids=IDS)
def test_every_source_reaches_the_acknowledgements(book):
    """The page is compiled from sources.yaml, so a new source needs no edit here."""
    data = legal._sources(book)
    for raw in data.get("references") or []:
        if not isinstance(raw, dict) or not raw.get("title"):
            continue
        assert html.escape(str(raw["title"])) in acknowledgements(), (
            f"{book.id}: {raw['title']!r} is missing from the acknowledgements"
        )


def test_the_acknowledgements_separate_sources_from_further_reading():
    text = acknowledgements()
    assert "Sources the book rests on" in text
    assert "Background and further reading" in text


def test_the_acknowledgements_credit_the_software():
    text = acknowledgements()
    for name, _url, licence_name, _role in legal.SOFTWARE:
        assert name in text
        assert licence_name in text


def test_the_acknowledgements_name_the_photo_credit():
    """The one third-party image carries its author and licence, not just a link."""
    text = acknowledgements()
    assert "a.d.Tramontana, CC BY-SA 1.0" in text
    assert "via Wikimedia Commons" in text


def test_a_missing_credit_has_a_route_to_be_fixed():
    text = acknowledgements()
    assert legal.CONTACT_URL in text
    assert "report a mistake or an omission" in text


# --- the root pages -----------------------------------------------------------


def test_the_root_pages_are_the_two_the_footer_links():
    assert portal.root_page_slugs() == ("terms", "acknowledgements")


@pytest.mark.parametrize("slug", ["terms", "acknowledgements"])
def test_each_root_page_is_a_complete_page(slug):
    page = portal.legal_page(slug)
    title, description = portal.LEGAL_PAGES[slug]
    assert f"<title>{html.escape(title)} — " in page
    assert html.escape(description) in page
    assert '<main class="wrap legal" id="main">' in page
    assert 'href="/terms/"' in page
    assert 'href="/acknowledgements/"' in page
    assert 'href="/"' in page
    assert page.rstrip().endswith("</html>")
