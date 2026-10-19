"""The `:::class` directive: one link from a chapter to the kind of problem it has.

A section that says "this is a saddle point" makes a claim about what kind of
problem the reader now has, and that claim decides the method, the cost and the
failure mode. The map owns the page; the section points at it. This is the door the
map was missing: it was published before anything could reach it.

The three properties the tests protect are the three that make it a *reference*
rather than a restatement: one link and nothing to load, a signature sentence that
comes from the registry rather than the page, and a build failure when the slug is
not a class, so a renamed page cannot ship a dead link that `check_links` skips.
"""

from __future__ import annotations

from types import SimpleNamespace

import pytest

from textbook import book as books
from textbook import classmap
from textbook import config as cfg
from textbook.hooks import classes, usedin


def page_in(book_id: str, src_path: str):
    """A stand-in for the page object a hook is handed, as `tests/test_proofs.py`."""
    book = books.book_by_id(book_id)
    config = cfg.from_parts(book.docs, book=book, profile=book.default_profile.id)
    page = SimpleNamespace(file=SimpleNamespace(src_path=src_path))
    return page, config


def render(book_id: str, src_path: str, source: str) -> str:
    page, config = page_in(book_id, src_path)
    return classes.on_page_markdown(source, page, config, None)


def render_used(book_id: str, src_path: str, source: str) -> str:
    page, config = page_in(book_id, src_path)
    return usedin.on_page_markdown(source, page, config, None)


# --- the registry -------------------------------------------------------------


def test_exactly_one_reference_work_holds_the_class_registry():
    """Found by declaration — the book that lists its own pages — not by id.

    The proof book declares `proofs:`; the map declares `pages:`. Two books
    declaring `pages:` would make the directive ambiguous, and picking whichever
    sorted first is the silent break this collection spends tests on.
    """
    holders = [book.id for book in books.reference_books() if book.pages]
    assert holders == ["numerical-methods"]
    assert books.map_book() is not None


def test_every_class_in_the_registry_can_be_linked():
    """A `signature` is what makes an entry a class. The two indexes carry none."""
    known = classmap.entries()
    assert known, "the map exports no classes"
    assert "techniques" not in known and "symptoms" not in known
    for slug, entry in known.items():
        assert entry["url"] == f"/numerical-methods/{slug}/", entry["url"]
        assert entry["title"] and entry["signature"], slug


# --- the directive ------------------------------------------------------------


def test_the_directive_renders_one_link_and_the_registry_sentence():
    """One anchor, and the sentence comes from the map rather than from the page.

    Two copies of "what a saddle point costs" is how the section and the reference
    start disagreeing. The registry is the only copy.
    """
    out = render(
        "maths-applied",
        "Chapter 1/Section 1.5/Walkthrough/index.md",
        "The equilibrium is a constraint with a price.\n\n:::class saddle-point\n",
    )
    assert out.count("<a ") == 1
    assert 'href="/numerical-methods/saddle-point/"' in out
    assert "Saddle point" in out
    assert "A rule holds everywhere, and a second unknown pays for it." in out
    # Nothing to load: the affordance works with scripting off.
    assert "<script" not in out


def test_the_href_is_root_absolute_from_a_page_anywhere():
    """A class is reached from another book, so the link cannot be relative.

    `SHAPE.md`: a link into another book is outside the linking book's own build,
    and `check_links` skips it by design. The absolute href is what makes that skip
    honest, and the tests in `tests/test_reference_books.py` check the targets.
    """
    for src in (
        "Chapter 1/Section 1.2/Walkthrough/index.md",
        "Chapter 9/Section 9.3/Learn/index.md",
    ):
        out = render("a-level-maths", src, ":::class root\n")
        assert 'href="/numerical-methods/root/"' in out


def test_an_unknown_class_fails_the_build_with_the_known_ones():
    with pytest.raises(ValueError, match="not a class") as err:
        render("maths-applied", "Chapter 1/index.md", ":::class hyperbolic-parabolic\n")
    assert "hyperbolic" in str(err.value), "the message must list what exists"


def test_an_index_page_is_not_a_class():
    """`:::class techniques` is a category error, and it must not silently link.

    The indexes are places to look things up, not kinds of problem. The registry
    rule — a signature or nothing — is what makes this an error rather than a link
    to a table under a heading that says "kind of problem".
    """
    with pytest.raises(ValueError, match="not a class"):
        render("maths-applied", "Chapter 1/index.md", ":::class techniques\n")


def test_the_directive_is_left_alone_inside_a_code_fence():
    source = "```markdown\n:::class root\n```\n"
    assert render("maths-applied", "Chapter 1/index.md", source) == source


# --- the derived backlink list ------------------------------------------------


def test_the_used_list_is_derived_from_the_pages_that_link_here():
    """The list on a class page is the callbacks, read at build time.

    A hand-typed list is stale within a week, and a backlink nobody maintains is
    worse than none: it tells a reader the map is used where it is not. The three
    root callbacks are asserted by *page*, so removing one shows up here rather
    than only in the built site.
    """
    entries = usedin.used_in("root")
    hrefs = {entry["href"] for entry in entries}
    assert "/maths-applied/chapter-1/section-1.2/learn/" in hrefs
    assert "/maths-applied/chapter-1/section-1.5/learn/" in hrefs
    assert "/a-level-maths/chapter-9/section-9.3/learn/" in hrefs
    for entry in entries:
        assert entry["href"].startswith("/"), "a cross-book link must be root-absolute"
        assert " · " in entry["label"], entry["label"]


def test_the_used_list_does_not_name_the_map_itself():
    """A class page's own book is skipped: self-links say nothing a reader needs."""
    for slug in classmap.entries():
        assert all(
            not entry["href"].startswith("/numerical-methods/")
            for entry in usedin.used_in(slug)
        ), slug


def test_a_class_no_page_names_says_so_rather_than_printing_nothing():
    """Five of the nine classes have no callback yet. An empty list is ambiguous."""
    assert usedin.used_in("averaging") == []
    out = render_used("numerical-methods", "averaging/index.md", ":::used\n")
    assert usedin.EMPTY in out


def test_the_used_directive_refuses_a_page_that_is_not_a_class():
    """`:::used` on an index page would print some other class's callbacks.

    Silent is the failure mode being prevented: the list is about the page's own
    directory, so a page that is not a class has no list to print.
    """
    with pytest.raises(ValueError, match="only for a class page"):
        render_used("numerical-methods", "techniques/index.md", ":::used\n")
