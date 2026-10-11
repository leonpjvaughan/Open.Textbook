"""The collection's shape, enforced.

A new book is data, not code — so these tests are what stops the data drifting
away from the generated artefacts, and what keeps two books from colliding on a
URL.
"""

from __future__ import annotations

import re

import pytest

from textbook import book as books
from textbook import portal, scaffold

ALL = books.discover_books()
IDS = [b.id for b in ALL]


def test_books_exist():
    assert ALL, "no books found under books/"


@pytest.mark.parametrize("book", ALL, ids=IDS)
def test_book_is_well_formed(book):
    assert book.id == re.sub(r"[^a-z0-9-]", "-", book.id), "book id must be a slug"
    assert book.title
    assert book.qualification
    assert book.subject
    assert book.profiles, f"{book.id} declares no profiles"
    assert book.curriculum.is_file(), f"{book.id} has no curriculum"
    assert book.docs.is_dir(), f"{book.id} has no docs directory"
    assert book.banks.is_dir(), f"{book.id} has no problem banks"


@pytest.mark.parametrize("book", ALL, ids=IDS)
def test_exactly_one_default_profile(book):
    defaults = [p for p in book.profiles if p.default]
    assert len(defaults) == 1, f"{book.id} must mark exactly one default profile"


@pytest.mark.parametrize("book", ALL, ids=IDS)
def test_curriculum_is_fully_mapped(book):
    assert not scaffold.check_full_coverage(book), "curriculum items with no section"


@pytest.mark.parametrize("book", ALL, ids=IDS)
def test_qualification_is_declared(book):
    declared = {q["id"] for q in books.load_collection().get("qualifications", [])}
    assert book.qualification in declared, (
        f"{book.id}: qualification '{book.qualification}' is not in collection.yaml"
    )


def test_deploy_paths_do_not_collide():
    paths = [b.deploy_path(p.id) for b in ALL for p in b.profiles]
    assert len(paths) == len(set(paths)), f"duplicate deploy paths: {paths}"


def test_single_profile_book_has_no_redundant_url_segment():
    for book in ALL:
        if len(book.profiles) == 1:
            assert book.deploy_path(book.profiles[0].id) == book.id
        else:
            assert "/" in book.deploy_path(book.default_profile.id)


@pytest.mark.parametrize("book", ALL, ids=IDS)
@pytest.mark.parametrize("layer", ["config", "theme", "map"])
def test_generated_files_are_in_sync(book, layer):
    """The committed generated files must match what the generators produce.

    CI also checks this with ``git diff --exit-code``; doing it here means a
    developer sees the failure before pushing.
    """
    if layer == "config":
        for profile in book.profiles:
            path = scaffold.config_path(book, profile.id)
            assert path.is_file(), f"missing generated config {path}"
            assert path.read_text(encoding="utf-8") == scaffold.build_mkdocs_config(
                book, profile.id
            ), f"{path} is stale; run `python -m textbook.scaffold`"
    elif layer == "theme":
        path = book.docs / "assets" / "stylesheets" / "book.css"
        assert path.is_file(), f"missing generated theme CSS {path}"
        assert path.read_text(encoding="utf-8") == scaffold.theme_css(book), (
            f"{path} is stale; run `python -m textbook.scaffold`"
        )
    else:
        path = book.root / "CURRICULUM-MAP.md"
        assert path.is_file(), f"missing {path}"
        assert path.read_text(encoding="utf-8") == scaffold.build_curriculum_map(
            book, book.strands, book.chapters
        ), f"{path} is stale; run `python -m textbook.scaffold`"


@pytest.mark.parametrize("book", ALL, ids=IDS)
def test_book_has_an_author_local_stylesheet(book):
    """The per-book theming escape hatch must exist, so a book can be styled
    without forking the shared design system. See SHAPE.md."""
    path = book.docs / "assets" / "stylesheets" / "book-local.css"
    assert path.is_file(), f"{book.id} has no book-local.css"


@pytest.mark.parametrize("book", ALL, ids=IDS)
def test_shared_assets_are_symlinked_not_copied(book):
    """CSS, the figure loader and the booklet widget are shared. A copy would
    drift; the point is that there is one truth."""
    assets = book.docs / "assets"
    for relative in (
        "stylesheets/extra.css",
        "figures/figures.js",
        "booklet/booklet.js",
    ):
        path = assets / relative
        assert path.is_symlink(), f"{book.id}: {relative} should be a symlink"
        assert path.resolve().is_file(), f"{book.id}: {relative} is a broken symlink"


def test_portal_renders_every_book():
    html = portal.render()
    for book in ALL:
        assert book.title in html, f"portal is missing {book.id}"
        assert book.theme.accent in html, f"portal card is not tinted with {book.id}'s accent"
        for profile in book.profiles:
            assert f'href="{book.deploy_path(profile.id)}/"' in html
        if book.boards:
            assert book.boards[0] in html


def test_portal_groups_by_qualification():
    html = portal.render()
    for qualification in {b.qualification for b in ALL}:
        assert f'<h2 class="group__title">{qualification}</h2>' in html


def test_site_urls_are_unique():
    urls = [scaffold.site_url(b, p.id) for b in ALL for p in b.profiles]
    assert len(urls) == len(set(urls)), f"duplicate site_url: {urls}"
