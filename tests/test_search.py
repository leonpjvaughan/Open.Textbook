"""One search index, one runtime, and the metadata a result row needs.

The behaviour that needs a browser — a term typed, rows rendered, the highlight
following the arrow keys — is in `test_search_browser.py`, which is marked
`browser`. This file pins what the build must produce for that browser run to be
possible: Pagefind metadata on every page, the same shared runtime on the landing
page and in a book, and a scripting-off answer on the landing page.
"""

from __future__ import annotations

import re
import shutil
import subprocess
from string import Template

import pytest

from textbook import pipeline, portal
from textbook.book import book_by_id, repo_root

BOOK = "gcse-maths"
PROFILE = "higher"
LEARN = "Chapter 1/Section 1.1/Walkthrough/index.md"
MODULE = repo_root() / "assets" / "search" / "search.js"
STYLESHEET = repo_root() / "assets" / "stylesheets" / "search.css"
BUILD_ALL = repo_root() / "scripts" / "build-all.sh"


@pytest.fixture(scope="module")
def learn_html() -> str:
    book = book_by_id(BOOK)
    config = pipeline.make_config(book, PROFILE)
    nav = pipeline.chapter_subset(book, 1)
    template = Template(pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8"))
    html, _entry, maths_failed = pipeline.render_page(
        book,
        PROFILE,
        config,
        nav,
        LEARN,
        template,
        assets=pipeline.addressed_assets(book),
    )
    assert not maths_failed
    return html


def meta(html: str, key: str) -> str:
    match = re.search(
        rf'<meta data-pagefind-meta="{re.escape(key)}\[content\]" content="([^"]*)">', html
    )
    return match.group(1) if match else ""


def test_a_learn_result_names_its_type_section_chapter_and_book(learn_html):
    """Every field a row prints comes from the page, not from parsing its title."""
    assert meta(learn_html, "title") == "1.1 Place value and ordering numbers", (
        "the authored '— Learn' suffix is still in the search title"
    )
    assert meta(learn_html, "type") == "Learn"
    assert meta(learn_html, "section") == "1.1 Place value and ordering numbers"
    assert meta(learn_html, "chapter") == "Number skills"
    assert meta(learn_html, "book") == "GCSE Mathematics (9-1)"
    assert "— Learn" not in meta(learn_html, "title")


def test_a_chapter_page_gets_a_reader_facing_type_without_a_title_suffix():
    book = book_by_id(BOOK)
    from textbook.frontmatter import read as read_page

    meta_data, _ = read_page(book.docs / "Chapter 1" / "index.md")
    rendered = pipeline.search_meta(book, PROFILE, meta_data, str(meta_data["title"]), "Chapter 1/index.md")
    assert '<meta data-pagefind-meta="type[content]" content="Chapter overview">' in rendered
    assert '<meta data-pagefind-meta="section[content]"' not in rendered


def test_a_depth_page_names_the_section_it_belongs_to():
    book = book_by_id("maths-applied")
    from textbook.frontmatter import read as read_page

    path = "Chapter 1/Section 1.1/Deeper/the-four-models/index.md"
    meta_data, _ = read_page(book.docs / path)
    rendered = pipeline.search_meta(book, "book", meta_data, str(meta_data["title"]), path)
    assert 'content="Going deeper"' in rendered
    assert 'content="1.1 The question"' in rendered


def test_a_book_page_loads_the_shared_runtime_not_a_second_copy(learn_html):
    assert re.search(r'<script type="module" src="[^"]*assets/search/search\.[0-9a-f]{8}\.js">', learn_html), (
        "the page does not load the shared search runtime"
    )
    assert 'prefix + "pagefind/pagefind.js"' not in learn_html, (
        "the old inline loader is back; there is one loader path now"
    )
    assert "pagefind/pagefind.js" not in learn_html


def test_the_module_is_the_one_loader_path():
    source = MODULE.read_text(encoding="utf-8")
    assert '"/pagefind/pagefind.js"' in source, "the module does not import the root index"
    assert "aria-activedescendant" in source
    assert "tb-search__type" in source and "tb-search__excerpt" in source
    assert "replaceChildren()" in source


def test_the_module_parses_as_javascript(tmp_path):
    node = shutil.which("node")
    if node is None:
        pytest.skip("node is not available to parse the module")
    target = tmp_path / "search.mjs"
    target.write_text(MODULE.read_text(encoding="utf-8"), encoding="utf-8")
    done = subprocess.run([node, "--check", str(target)], capture_output=True, text=True)
    assert done.returncode == 0, done.stderr


def test_the_portal_search_is_labelled_keyboard_reachable_and_has_a_fallback():
    page = portal.render()
    header = page[page.index('<header class="masthead">') : page.index("</header>")]
    assert "<search" in header, "the landing page's search is outside the masthead"
    assert "<search" in page, "the landing page has no search landmark"
    assert 'for="portal-search"' in page, "the field has no label"
    assert 'type="search"' in page
    assert 'aria-controls="portal-search-results"' in page
    assert "<noscript>" in page
    assert "Search needs JavaScript" in page
    assert re.search(r'<script src="assets/search/search\.[0-9a-f]{8}\.js" type="module">', page)
    assert re.search(r'<link rel="stylesheet" href="assets/stylesheets/search\.[0-9a-f]{8}\.css">', page)


def test_the_portal_field_is_revealed_by_script_rather_than_dead_without_it():
    page = portal.render()
    start = page.index("<search")
    assert "hidden" in page[start : page.index(">", start)], (
        "the field is visible with scripting off"
    )
    assert "open a book" in page


def test_the_search_stylesheet_is_shared_and_declares_no_colour():
    css = STYLESHEET.read_text(encoding="utf-8")
    assert ".tb-search__results" in css
    assert ".tb-search__excerpt" in css
    assert not re.search(r"#[0-9a-fA-F]{3,8}\b", css)
    assert not re.search(r"\b(?:rgb|hsl)a?\(", css)


def test_build_all_builds_the_index_after_the_portal_and_only_once():
    script = BUILD_ALL.read_text(encoding="utf-8")
    portal_at = script.index("python -m textbook.portal")
    index_at = script.index("python -m textbook.search")
    assert portal_at < index_at, "the index is built before the root pages exist"
    assert script.count("python -m textbook.search") == 1
