"""The own-pipeline renderer: the parts of a site generator we had to replace.

The engine's hooks are reused unchanged, so what needs pinning here is the last
mile that MkDocs and Material used to supply — URL shaping, the navigation shell,
source-link rewriting, the search index, and a link check that is genuinely
strict.

Two of these tests are regressions for bugs this module actually shipped with:

* navigation hrefs were emitted bare, so every sidebar link on a nested page
  resolved under that page's own directory;
* the link check treated any href as root-relative, which is exactly the mistake
  that hid the first bug — every broken link "resolved" against the site root.
"""

from __future__ import annotations

import re
from pathlib import Path
from types import SimpleNamespace

import pytest

from textbook import pipeline
from textbook.book import repo_root

BOOK = "gcse-maths"
BOOKS_BY_ID = pipeline.books.book_by_id(BOOK)


# --- URLs ---------------------------------------------------------------------


@pytest.mark.parametrize(
    ("md_path", "expected"),
    [
        ("index.md", ""),
        ("Chapter 1/index.md", "Chapter 1/"),
        ("Chapter 1/Section 1.1/Walkthrough/index.md", "Chapter 1/Section 1.1/Walkthrough/"),
        ("Glossary/number.md", "Glossary/number/"),
        # A path whose suffix has already been stripped must still normalise:
        # stripping '.md' first is what produced 'a/b/index/' instead of 'a/b/'.
        ("Chapter 1/index", "Chapter 1/"),
        ("Chapter 1/Section 1.1/Walkthrough/index", "Chapter 1/Section 1.1/Walkthrough/"),
    ],
)
def test_url_for(md_path, expected):
    assert pipeline.url_for(md_path) == expected


@pytest.mark.parametrize(
    ("url", "expected"),
    [
        ("", ""),
        ("Chapter 1/", "../"),
        ("Chapter 1/Section 1.1/Walkthrough/", "../../../"),
        ("Chapter 1/Section 1.1/Guided problems/", "../../../"),
    ],
)
def test_prefix_for(url, expected):
    assert pipeline.prefix_for(url) == expected


def test_href_encodes_spaces_but_keeps_separators():
    assert pipeline.href("Chapter 1/Guided problems/") == "Chapter%201/Guided%20problems/"


# --- front matter -------------------------------------------------------------


def test_split_front_matter():
    meta, body = pipeline.split_front_matter(
        "---\ntitle: Hello\ntier: H\n---\n\n# Heading\n", Path("t.md")
    )
    assert meta == {"title": "Hello", "tier": "H"}
    assert body.lstrip().startswith("# Heading")


def test_split_front_matter_without_front_matter():
    meta, body = pipeline.split_front_matter("# Just a page\n", Path("t.md"))
    assert meta == {}
    assert body == "# Just a page\n"


def test_unparsable_front_matter_raises_rather_than_being_swallowed():
    """The failure MkDocs hides.

    An unquoted title containing ': ' is invalid YAML. MkDocs' front-matter
    loader catches the error and treats the page as having no metadata, which
    silently drops `tier` — so a Higher-only page is built into Foundation.
    This renderer must not repeat that.
    """
    bad = "---\ntitle: 11.2 Gradient and intercept: y = mx + c\ntier: H\n---\n\nText\n"
    with pytest.raises(pipeline.FrontMatterError) as err:
        pipeline.split_front_matter(bad, Path("Chapter 11/Section 11.2/Walkthrough/index.md"))
    assert "Chapter 11" in str(err.value)
    assert err.value.path.name == "index.md"


def test_quoted_title_with_a_colon_is_fine():
    meta, _ = pipeline.split_front_matter(
        '---\ntitle: "11.2 Gradient and intercept: y = mx + c"\ntier: H\n---\n\nText\n',
        Path("t.md"),
    )
    assert meta["tier"] == "H"


# --- navigation ---------------------------------------------------------------


def test_pairs_normalises_the_three_nav_shapes():
    assert pipeline.pairs({"A": "a.md"}) == [("A", "a.md")]
    assert pipeline.pairs([{"A": "a.md"}, {"B": "b.md"}]) == [("A", "a.md"), ("B", "b.md")]
    assert pipeline.pairs("leaf.md") == []


def test_leaves_walks_nested_nav():
    nav = [
        {"Home": "index.md"},
        {
            "Chapter 1": [
                {"Overview": "Chapter 1/index.md"},
                {"1.1": [{"Learn": "Chapter 1/Section 1.1/Walkthrough/index.md"}]},
            ]
        },
    ]
    assert pipeline.leaves(nav) == [
        "index.md",
        "Chapter 1/index.md",
        "Chapter 1/Section 1.1/Walkthrough/index.md",
    ]


def test_nav_hrefs_are_qualified_with_the_page_prefix():
    """Regression: bare root-relative hrefs 404 on nested pages.

    The book is served from a subpath, so 'Chapter 1/Review/' on a page three
    directories deep resolves to '.../Walkthrough/Chapter 1/Review/'.
    """
    nav = [{"Chapter 1": [{"Review": "Chapter 1/Review/index.md"}]}]
    markup = pipeline.render_nav(nav, "Chapter 1/Section 1.1/Walkthrough/")
    assert 'href="../../../Chapter%201/Review/"' in markup
    assert 'href="Chapter%201/Review/"' not in markup


def test_nav_marks_the_current_page():
    nav = [{"Chapter 1": [{"Review": "Chapter 1/Review/index.md"}]}]
    markup = pipeline.render_nav(nav, "Chapter 1/Review/")
    assert "nav__link--current" in markup
    assert 'aria-current="page"' in markup


def test_nav_opens_the_section_containing_the_current_page():
    nav = [
        {"Chapter 1": [{"Review": "Chapter 1/Review/index.md"}]},
        {"Chapter 2": [{"Review": "Chapter 2/Review/index.md"}]},
    ]
    markup = pipeline.render_nav(nav, "Chapter 2/Review/")
    opened = re.findall(r"<details( open)?>", markup)
    assert opened == ["", " open"]


def test_nav_escapes_titles():
    markup = pipeline.render_nav({"A & B <x>": "a/index.md"}, "a/")
    assert "A &amp; B &lt;x&gt;" in markup


# --- links --------------------------------------------------------------------


@pytest.mark.parametrize(
    ("source", "expected"),
    [
        ('<a href="a/b/index.md">x</a>', '<a href="a/b/">x</a>'),
        ('<a href="a/b/index.md#part">x</a>', '<a href="a/b/#part">x</a>'),
        ('<a href="Chapter 1/index.md">x</a>', '<a href="Chapter%201/">x</a>'),
        ('<img src="assets/pic.md">', '<img src="assets/pic/">'),
        ('<a href="https://x.dev/a.md">x</a>', '<a href="https://x.dev/a.md">x</a>'),
    ],
)
def test_rewrite_source_links(source, expected):
    assert pipeline.rewrite_source_links(source) == expected


def test_rewrite_source_links_does_not_strip_then_append_a_directory():
    """Regression: 'a/b/index.md' must become 'a/b/', never 'a/b/index/'."""
    assert "index/" not in pipeline.rewrite_source_links('<a href="a/b/index.md">x</a>')


# --- search -------------------------------------------------------------------


def test_search_text_drops_maths_and_tags():
    content = (
        '<p>Compare <math><semantics><mrow><mo>&lt;</mo></mrow>'
        '<annotation encoding="application/x-tex">\\lt</annotation></semantics></math>'
        " these</p><script>var x = 1;</script>"
    )
    text = pipeline.search_text(content)
    assert "Compare" in text and "these" in text
    assert "annotation" not in text
    assert "\\lt" not in text
    assert "var x" not in text


def test_search_index_is_compact_json():
    pages = [pipeline.RenderedPage(url="a/", title="A", text="alpha")]
    assert pipeline.search_index(pages) == '[{"url":"a/","title":"A","text":"alpha"}]'


# --- link checking ------------------------------------------------------------


def _write(root: Path, relative: str, content: str) -> None:
    destination = root / relative
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(content, encoding="utf-8")


def test_check_links_reports_a_genuine_break(tmp_path):
    _write(tmp_path, "a/index.html", '<a href="../missing/">gone</a>')
    page = pipeline.RenderedPage(url="a/", title="A", text="")
    assert pipeline.check_links(tmp_path, [page]) == ["a/ -> ../missing/"]


def test_check_links_rejects_bare_root_relative_hrefs(tmp_path):
    """Regression: an href with no prefix must not 'resolve' against the root.

    The old check fell back to `out / path`, so a bare 'Chapter 1/Review/' always
    looked valid from the site root and every mis-prefixed nav link passed.
    """
    _write(tmp_path, "deep/page/index.html", '<a href="Chapter 1/Review/">x</a>')
    _write(tmp_path, "Chapter 1/Review/index.html", "ok")
    page = pipeline.RenderedPage(url="deep/page/", title="P", text="")
    assert pipeline.check_links(tmp_path, [page]) == ["deep/page/ -> Chapter 1/Review/"]


def test_check_links_accepts_a_leading_slash_from_the_root(tmp_path):
    _write(tmp_path, "page/index.html", '<a href="/shared/">x</a>')
    _write(tmp_path, "shared/index.html", "ok")
    page = pipeline.RenderedPage(url="page/", title="P", text="")
    assert pipeline.check_links(tmp_path, [page]) == []


def test_check_links_ignores_the_search_script(tmp_path):
    _write(
        tmp_path,
        "page/index.html",
        '<script>el.innerHTML = \'<li><a href="\' + p.url + \'">x</a></li>\';</script>',
    )
    page = pipeline.RenderedPage(url="page/", title="P", text="")
    assert pipeline.check_links(tmp_path, [page]) == []


def test_check_links_scope_ignores_pages_outside_a_subset(tmp_path):
    _write(tmp_path, "index.html", '<a href="Chapter 9/">unbuilt</a>')
    page = pipeline.RenderedPage(url="", title="Cover", text="")
    assert pipeline.check_links(tmp_path, [page]) == [" -> Chapter 9/"]
    assert pipeline.check_links(tmp_path, [page], scope="Chapter 1") == []


def test_check_links_reports_a_page_that_was_not_written(tmp_path):
    page = pipeline.RenderedPage(url="gone/", title="Gone", text="")
    assert pipeline.check_links(tmp_path, [page]) == ["gone/: page was not written"]


# --- end to end ---------------------------------------------------------------


@pytest.fixture(scope="module")
def subset(tmp_path_factory):
    """One real chapter, built for real."""
    out = tmp_path_factory.mktemp("pipeline") / "book"
    return pipeline.build(BOOK, "higher", out=out, chapter=1)


def test_build_produces_the_cover_and_the_chapter(subset):
    assert subset.ok, subset.broken + subset.maths_errors
    urls = {page.url for page in subset.pages}
    assert "" in urls  # the cover, which the masthead links to
    assert "Chapter 1/Section 1.1/Walkthrough/" in urls
    assert "Chapter 1/Review/" in urls
    assert len(subset.pages) == 18


def test_build_writes_the_expected_files(subset):
    for name in ("search.json", "404.html", "robots.txt", "sitemap.xml"):
        assert (subset.out / name).exists(), name
    assert (subset.out / "Chapter 1" / "index.html").exists()
    assert (subset.out / "assets" / "stylesheets" / "shell.css").exists()


def test_build_renders_maths_to_mathml(subset):
    page = (subset.out / "Chapter 1/Section 1.1/Walkthrough/index.html").read_text()
    assert "<math" in page
    assert "math-error" not in page
    # No runtime maths script: the whole point of build-time rendering.
    assert "katex" not in page.lower()


def test_build_expands_every_directive(subset):
    for page in subset.pages:
        html = (subset.out / page.output).read_text(encoding="utf-8")
        assert ":::" not in html, page.url
        assert "$$" not in html, page.url


def test_build_leaves_no_source_links(subset):
    """No page may ship a link to a .md source path."""
    for page in subset.pages:
        html = (subset.out / page.output).read_text(encoding="utf-8")
        assert not re.search(r'(?:href|src)="[^"]+\.md(?:#|")', html), page.url


def test_build_sets_the_scheme_on_body_for_the_shared_stylesheet(subset):
    """themes.css keys its tokens off body[data-md-color-scheme]."""
    html = (subset.out / "Chapter 1/index.html").read_text()
    assert "document.body.setAttribute" in html
    assert "data-md-color-scheme" in html


def test_build_uses_relative_asset_prefixes_for_a_subpath_deployment(subset):
    html = (subset.out / "Chapter 1/Section 1.1/Walkthrough/index.html").read_text()
    assert 'href="../../../assets/stylesheets/shell.css"' in html


def test_build_is_deterministic(subset, tmp_path):
    again = pipeline.build(BOOK, "higher", out=tmp_path / "again", chapter=1)
    first = (subset.out / "Chapter 1/Review/index.html").read_text()
    second = (again.out / "Chapter 1/Review/index.html").read_text()
    assert first == second


def test_foundation_profile_omits_higher_only_sections(tmp_path):
    """The nav comes from curriculum.yaml, so the pipeline filters by tier there.

    The MkDocs path filters by each page's own front matter, which is how seven
    Higher-only sections reach Foundation readers. Trusting the curriculum, which
    AGENTS.md names the source of truth for tier, means the pipeline cannot leak
    them even where the two disagree.

    Chapter 5 is the sharpest case: 5.4 is Higher-only in the curriculum but its
    pages say `tier: F`, so the page-trusting filter keeps it. Asserted below,
    so that if the pages are ever corrected this test says why it mattered.
    """
    from textbook import frontmatter

    page = BOOKS_BY_ID.docs / "Chapter 5/Section 5.4/Walkthrough/index.md"
    declared, _ = frontmatter.read(page)
    assert declared.get("tier") == "F", (
        "5.4's pages now agree with the curriculum; this test's premise has changed"
    )

    result = pipeline.build(BOOK, "foundation", out=tmp_path / "f", chapter=5)
    urls = {page_.url for page_ in result.pages}
    assert not any("Section 5.4/" in url for url in urls)
    assert not any("Section 5.6/" in url for url in urls)
    assert any("Section 5.1/" in url for url in urls)
    assert any("Section 5.5/" in url for url in urls)


def test_higher_profile_keeps_higher_only_sections(tmp_path):
    result = pipeline.build(BOOK, "higher", out=tmp_path / "h", chapter=5)
    urls = {page.url for page in result.pages}
    assert any("Section 5.4/" in url for url in urls)
    assert any("Section 5.6/" in url for url in urls)


def test_sitemap_is_omitted_when_no_base_url_is_configured(monkeypatch, subset):
    """The sitemap must follow the collection's base URL, and nothing else."""
    monkeypatch.setattr(pipeline.books, "load_collection", lambda root=None: {})
    assert pipeline.sitemap(pipeline.books.book_by_id(BOOK), subset.pages) == ""


def test_canonical_url_uses_the_collection_base_url():
    url = pipeline.canonical_url(pipeline.books.book_by_id(BOOK), "Chapter 1/")
    assert url.startswith("http")
    assert "gcse-maths" in url
    assert url.endswith("/Chapter%201/")
