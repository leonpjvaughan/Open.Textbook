"""The collection's shape, enforced.

A new book is data, not code — so these tests are what stops the data drifting
away from the generated artefacts, and what keeps two books from colliding on a
URL.
"""

from __future__ import annotations

import re

import pytest

from textbook import book as books
from textbook import pipeline, portal, scaffold

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
@pytest.mark.parametrize("layer", ["theme", "map"])
def test_generated_files_are_in_sync(book, layer):
    """The committed generated files must match what the generators produce.

    CI also checks this with ``git diff --exit-code``; doing it here means a
    developer sees the failure before pushing.
    """
    if layer == "theme":
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
    relative_paths = [
        "stylesheets/extra.css",
        "stylesheets/themes.css",
        "figures/figures.js",
    ]
    if book.booklet_name:
        relative_paths.append("booklet/booklet.js")
    for relative in relative_paths:
        path = assets / relative
        assert path.is_symlink(), f"{book.id}: {relative} should be a symlink"
        assert path.resolve().is_file(), f"{book.id}: {relative} is a broken symlink"


@pytest.mark.parametrize("book", ALL, ids=IDS)
def test_booklet_widget_is_loaded_only_where_there_is_a_booklet(book):
    """A book without a formula sheet must not ship a widget that fetches one."""
    widget = pipeline.booklet_widget(book, "")
    if book.booklet_name:
        assert "assets/booklet/booklet.js" in widget
        assert "defer" in widget, "an eager script would delay the page"
    else:
        assert widget == ""


def test_portal_renders_every_book():
    html = portal.render()
    for book in ALL:
        assert book.title in html, f"portal is missing {book.id}"
        light = book.theme.for_scheme("default").accent
        dark = book.theme.for_scheme("slate").accent
        assert f"--card-accent: {light}" in html, f"{book.id}: light accent missing"
        assert f"--card-accent-dark: {dark}" in html, f"{book.id}: dark accent missing"
        for profile in book.profiles:
            assert f'href="{book.deploy_path(profile.id)}/"' in html
        if book.boards:
            assert book.boards[0] in html


@pytest.mark.parametrize("book", ALL, ids=IDS)
def test_book_theme_is_a_light_and_dark_pair(book):
    """Each book carries its own theme, reduced to one variation per scheme."""
    assert {s.scheme for s in book.theme.variations} == {"default", "slate"}
    for scheme in book.theme.variations:
        assert scheme.accent.startswith("#"), f"{book.id}: bad accent {scheme.accent}"
        for key in scheme.tokens:
            assert key in books.SCHEME_TOKENS, f"{book.id}: unknown token {key}"


def test_a_theme_may_only_override_known_tokens():
    """Guessing a token name would silently do nothing."""
    from textbook.book import Theme

    with pytest.raises(ValueError):
        Theme.from_dict({"light": {"not-a-token": "#fff"}})


def test_an_old_flat_accent_block_still_reads():
    """A single accent block is read as the light variation."""
    from textbook.book import Theme

    theme = Theme.from_dict({"accent": "#123456"})
    assert theme.for_scheme("default").tokens["accent"] == "#123456"
    assert theme.for_scheme("slate").tokens == {}


@pytest.mark.parametrize("book", ALL, ids=IDS)
def test_generated_theme_css_covers_each_variation(book):
    """book.css states the subject tint; a bundle composes it in.

    The values are --tb-book-* rather than final tokens, which is what lets one
    book work under every bundle.
    """
    css = scaffold.theme_css(book)
    for scheme in book.theme.variations:
        if not scheme.tokens:
            continue
        selector = (
            'body[data-md-color-scheme="default"]'
            if scheme.scheme == "default"
            else 'body[data-md-color-scheme="slate"]'
        )
        assert selector in css
        for key, value in scheme.tokens.items():
            variable = f"--tb-book-{key.replace('_', '-')}"
            assert f"{variable}: {value};" in css


def test_two_books_keep_separate_identities(tmp_path):
    """The properties that must hold once a second book exists.

    A two-book repository is built from these files, so they are exercised here
    rather than by committing a fixture book that would publish itself.
    """
    from textbook.book import Theme, load_book

    def write(name: str, accent: str, dark_accent: str):
        directory = tmp_path / name
        directory.mkdir()
        (directory / "book.yaml").write_text(
            f"id: {name}\n"
            f"title: {name.title()}\n"
            "qualification: GCSE\n"
            "subject: Physics\n"
            "profiles:\n"
            "  - {id: higher, name: Higher, default: true}\n"
            "theme:\n"
            f"  light: {{accent: '{accent}'}}\n"
            f"  dark: {{accent: '{dark_accent}'}}\n",
            encoding="utf-8",
        )
        return load_book(directory / "book.yaml")

    maths = ALL[0]
    physics = write("gcse-physics", "#b45309", "#f0a860")

    # Distinct URLs and distinct identities, in both schemes.
    assert maths.deploy_path("higher") != physics.deploy_path("higher")
    assert maths.theme.for_scheme("default").accent != physics.theme.for_scheme(
        "default"
    ).accent
    assert maths.theme.for_scheme("slate").accent != physics.theme.for_scheme(
        "slate"
    ).accent

    # A book's card is tinted from its own pair, not from the house palette.
    css = scaffold.theme_css(physics)
    assert '#b45309' in css and '#f0a860' in css

    # Neither variation leaks into the other.
    light, dark = physics.theme.variations
    assert light.scheme == "default" and dark.scheme == "slate"
    assert Theme.from_dict({}).for_scheme("slate").tokens == {}


def test_portal_groups_by_qualification():
    html = portal.render()
    for qualification in {b.qualification for b in ALL}:
        assert f'<h2 class="group__title">{qualification}</h2>' in html


def test_site_urls_are_unique():
    urls = [scaffold.site_url(b, p.id) for b in ALL for p in b.profiles]
    assert len(urls) == len(set(urls)), f"duplicate site_url: {urls}"
