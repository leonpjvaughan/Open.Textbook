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
import shutil
import subprocess
import urllib.parse
from pathlib import Path
from types import SimpleNamespace

import pytest

from textbook import pipeline
from textbook import portal
from textbook.book import book_by_id, repo_root
from textbook.hooks import prefs
from textbook.themes import ordered_bundles

BOOK = "gcse-maths"


# --- URLs ---------------------------------------------------------------------


@pytest.mark.parametrize(
    ("md_path", "expected"),
    [
        ("index.md", ""),
        ("Chapter 1/index.md", "chapter-1/"),
        ("Chapter 1/index", "chapter-1/"),
        ("Glossary/number.md", "glossary/number/"),
        # Page-kind directories are ours, not the reader's, so the published URL
        # uses the vocabulary the navigation does. AGENTS.md: internal words must
        # never reach the reader.
        ("Chapter 1/Section 1.1/Walkthrough/index.md", "chapter-1/section-1.1/learn/"),
        (
            "Chapter 1/Section 1.1/Guided problems/index.md",
            "chapter-1/section-1.1/practise-with-help/",
        ),
        ("Chapter 1/Section 1.1/Problems/index.md", "chapter-1/section-1.1/practise/"),
        ("Chapter 20/Review/index.md", "chapter-20/review/"),
        # A path whose suffix has already been stripped must still normalise:
        # stripping '.md' first is what once produced 'a/b/index/' not 'a/b/'.
        ("Chapter 1/Section 1.1/Walkthrough/index", "chapter-1/section-1.1/learn/"),
    ],
)
def test_url_for(md_path, expected):
    assert pipeline.url_for(md_path) == expected


@pytest.mark.parametrize(
    ("segment", "expected"),
    [
        ("Chapter 1", "chapter-1"),
        ("Section 1.1", "section-1.1"),
        ("Glossary", "glossary"),
        ("Review", "review"),
        ("A-level", "a-level"),
        ("  Mixed   Case  ", "mixed-case"),
        # Relative segments are left alone, or every '../' link would break.
        ("..", ".."),
        (".", "."),
    ],
)
def test_slugify(segment, expected):
    assert pipeline.slugify(segment) == expected


def test_slugs_contain_nothing_that_needs_encoding():
    for md_path in (
        "Chapter 1/Section 1.1/Guided problems/index.md",
        "Chapter 20/Section 20.4/Walkthrough/index.md",
    ):
        assert urllib.parse.quote(pipeline.url_for(md_path)) == pipeline.url_for(md_path)


@pytest.mark.parametrize(
    ("url", "expected"),
    [
        ("", ""),
        ("chapter-1/", "../"),
        ("chapter-1/section-1.1/learn/", "../../../"),
        ("chapter-1/section-1.1/practise-with-help/", "../../../"),
    ],
)
def test_prefix_for(url, expected):
    assert pipeline.prefix_for(url) == expected


def test_href_still_encodes_anything_a_slug_missed():
    assert pipeline.href("chapter-1/learn/") == "chapter-1/learn/"
    assert pipeline.href("a b/c") == "a%20b/c"


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

    The book is served from a subpath, so 'chapter-1/review/' on a page three
    directories deep resolves to '.../learn/chapter-1/review/'.
    """
    nav = [{"Chapter 1": [{"Review": "Chapter 1/Review/index.md"}]}]
    markup = pipeline.render_nav(nav, "chapter-1/section-1.1/learn/")
    assert 'href="../../../chapter-1/review/"' in markup
    assert 'href="chapter-1/review/"' not in markup


def test_nav_marks_the_current_page():
    nav = [{"Chapter 1": [{"Review": "Chapter 1/Review/index.md"}]}]
    markup = pipeline.render_nav(nav, "chapter-1/review/")
    assert "nav__link--current" in markup
    assert 'aria-current="page"' in markup


def test_nav_opens_the_section_containing_the_current_page():
    nav = [
        {"Chapter 1": [{"Review": "Chapter 1/Review/index.md"}]},
        {"Chapter 2": [{"Review": "Chapter 2/Review/index.md"}]},
    ]
    markup = pipeline.render_nav(nav, "chapter-2/review/")
    opened = re.findall(r"<details( open)?>", markup)
    assert opened == ["", " open"]


def test_nav_escapes_titles():
    markup = pipeline.render_nav({"A & B <x>": "a/index.md"}, "a/")
    assert "A &amp; B &lt;x&gt;" in markup


def test_render_nav_computes_each_nodes_leaves_once_per_build(monkeypatch):
    """The nav is one object shared by every page, so its leaf sets are too.

    Without the shared cache each of the 458 pages re-slugged the whole
    sidebar; the nav's own comment claimed linear rendering and the repetition
    across pages was the cost (measured at 3.4s of a 17s build).
    """
    nav = [
        {"Chapter 1": [{"Review": "Chapter 1/Review/index.md"}]},
        {"Chapter 2": [{"Review": "Chapter 2/Review/index.md"}]},
    ]
    calls: list[object] = []
    real = pipeline.leaves

    def counting(node):
        calls.append(node)
        return real(node)

    monkeypatch.setattr(pipeline, "leaves", counting)
    cache: dict[int, set[str]] = {}
    first = pipeline.render_nav(nav, "chapter-1/review/", cache)
    second = pipeline.render_nav(nav, "chapter-2/review/", cache)
    assert len(calls) == 2, calls
    assert "nav__link--current" in first
    assert first != second


def test_render_nav_without_a_cache_still_works():
    """A standalone caller (a test rendering one page) needs no cache argument."""
    markup = pipeline.render_nav(
        [{"Chapter 1": [{"Review": "Chapter 1/Review/index.md"}]}],
        "chapter-1/review/",
    )
    assert "nav__link--current" in markup


# --- links --------------------------------------------------------------------


@pytest.mark.parametrize(
    ("source", "expected"),
    [
        ('<a href="a/b/index.md">x</a>', '<a href="a/b/">x</a>'),
        ('<a href="a/b/index.md#part">x</a>', '<a href="a/b/#part">x</a>'),
        ('<a href="Chapter 1/index.md">x</a>', '<a href="chapter-1/">x</a>'),
        ('<img src="assets/pic.md">', '<img src="assets/pic/">'),
        ('<a href="https://x.dev/a.md">x</a>', '<a href="https://x.dev/a.md">x</a>'),
    ],
)
def test_rewrite_source_links(source, expected):
    assert pipeline.rewrite_source_links(source) == expected


def test_rewrite_source_links_does_not_strip_then_append_a_directory():
    """Regression: 'a/b/index.md' must become 'a/b/', never 'a/b/index/'."""
    assert "index/" not in pipeline.rewrite_source_links('<a href="a/b/index.md">x</a>')


# --- search ---


def test_search_is_indexed_by_pagefind(subset):
    """Search is Pagefind's, built over the rendered HTML after the build."""
    bundle = subset.out / "pagefind"
    assert subset.indexed, "pagefind did not run"
    assert (bundle / "pagefind.js").exists()
    assert (bundle / "pagefind-entry.json").exists()
    assert any(bundle.glob("*.pf_meta")), "no language metadata written"


def test_indexing_can_be_skipped(subset, tmp_path):
    """Tests build many times; indexing is opt-out so they do not pay for it."""
    result = pipeline.build(BOOK, "higher", out=tmp_path / "n", chapter=1, index=False)
    assert result.indexed is False
    assert not (result.out / "pagefind").exists()


def test_indexing_is_scoped_to_the_page_content(subset):
    """The sidebar must be excluded, or every search hit matches a chapter title.

    Every page carries the whole navigation. Without data-pagefind-body on the
    content, Pagefind indexes that navigation 457 times over.
    """
    html = (subset.out / "chapter-1/section-1.1/learn/index.html").read_text()
    assert "data-pagefind-body" in html
    assert 'class="sidebar" aria-label="Book contents" data-pagefind-ignore' in html
    assert 'class="masthead" data-pagefind-ignore' in html


def test_the_inline_client_script_parses(subset):
    """Regression: a bad escape shipped '/^\\//', which is not valid JavaScript.

    The script never ran, so search silently did nothing while the build stayed
    green. Inline JavaScript is only checked if something checks it.
    """
    html = (subset.out / "chapter-1/index.html").read_text()
    blocks = re.findall(
        r'<script type="module">(.*?)</script>', html, re.S
    ) + re.findall(r"<script>(.*?)</script>", html, re.S)
    assert blocks, "no inline scripts found to check"
    node = shutil.which("node")
    if node is None:
        pytest.skip("node is not available to parse the script")
    for index, block in enumerate(blocks):
        path = subset.out / f".check-{index}.mjs"
        path.write_text(block, encoding="utf-8")
        try:
            done = subprocess.run(
                [node, "--check", str(path)], capture_output=True, text=True
            )
            assert done.returncode == 0, (
                f"inline script {index} does not parse: {done.stderr.strip()}"
            )
        finally:
            path.unlink()


# --- link checking ------------------------------------------------------------


def _write(root: Path, relative: str, content: str) -> None:
    destination = root / relative
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(content, encoding="utf-8")


def test_check_links_reports_a_genuine_break(tmp_path):
    _write(tmp_path, "a/index.html", '<a href="../missing/">gone</a>')
    page = pipeline.RenderedPage(url="a/", title="A")
    assert pipeline.check_links(tmp_path, [page]) == ["a/ -> ../missing/"]


def test_check_links_rejects_bare_root_relative_hrefs(tmp_path):
    """Regression: an href with no prefix must not 'resolve' against the root.

    The old check fell back to `out / path`, so a bare 'chapter-1/review/' always
    looked valid from the site root and every mis-prefixed nav link passed.
    """
    _write(tmp_path, "deep/page/index.html", '<a href="chapter-1/review/">x</a>')
    _write(tmp_path, "chapter-1/review/index.html", "ok")
    page = pipeline.RenderedPage(url="deep/page/", title="P")
    assert pipeline.check_links(tmp_path, [page]) == ["deep/page/ -> chapter-1/review/"]


def test_check_links_accepts_a_leading_slash_from_the_root(tmp_path):
    _write(tmp_path, "page/index.html", '<a href="/shared/">x</a>')
    _write(tmp_path, "shared/index.html", "ok")
    page = pipeline.RenderedPage(url="page/", title="P")
    assert pipeline.check_links(tmp_path, [page]) == []


def test_check_links_ignores_the_search_script(tmp_path):
    _write(
        tmp_path,
        "page/index.html",
        '<script>el.innerHTML = \'<li><a href="\' + p.url + \'">x</a></li>\';</script>',
    )
    page = pipeline.RenderedPage(url="page/", title="P")
    assert pipeline.check_links(tmp_path, [page]) == []


def test_check_links_scope_ignores_pages_outside_a_subset(tmp_path):
    _write(tmp_path, "index.html", '<a href="chapter-9/">unbuilt</a>')
    page = pipeline.RenderedPage(url="", title="Cover")
    assert pipeline.check_links(tmp_path, [page]) == [" -> chapter-9/"]
    assert pipeline.check_links(tmp_path, [page], scope="chapter-1") == []


def test_check_links_reports_a_page_that_was_not_written(tmp_path):
    page = pipeline.RenderedPage(url="gone/", title="Gone")
    assert pipeline.check_links(tmp_path, [page]) == ["gone/: page was not written"]


def test_check_links_reports_a_missing_fragment(tmp_path):
    """Regression: the fragment was discarded, so the link always passed.

    ``page/#handle`` was checked as ``page/`` and resolved whenever the page
    existed, whatever the anchor. A reader following it landed at the top of the
    page with no sign of the section they were sent to.
    """
    _write(tmp_path, "a/index.html", '<a href="../b/#gone">x</a>')
    _write(tmp_path, "b/index.html", '<h2 id="here">B</h2>')
    page = pipeline.RenderedPage(url="a/", title="A")
    assert pipeline.check_links(tmp_path, [page]) == ["a/ -> ../b/#gone (no #gone)"]


def test_check_links_accepts_a_present_fragment(tmp_path):
    _write(tmp_path, "a/index.html", '<a href="../b/#here">x</a>')
    _write(tmp_path, "b/index.html", '<h2 id="here">B</h2>')
    page = pipeline.RenderedPage(url="a/", title="A")
    assert pipeline.check_links(tmp_path, [page]) == []


def test_check_links_does_not_treat_a_script_string_as_an_anchor(tmp_path):
    """An ``id="…"`` inside a script is not a target a reader can land on."""
    _write(tmp_path, "a/index.html", '<a href="../b/#ghost">x</a>')
    _write(tmp_path, "b/index.html", '<script>const marker = \'id="ghost"\';</script>')
    page = pipeline.RenderedPage(url="a/", title="A")
    assert pipeline.check_links(tmp_path, [page]) == ["a/ -> ../b/#ghost (no #ghost)"]


def test_check_links_checks_the_fragment_of_a_root_relative_link(tmp_path):
    _write(tmp_path, "page/index.html", '<a href="/shared/#top">x</a>')
    _write(tmp_path, "shared/index.html", '<a id="top"></a>')
    page = pipeline.RenderedPage(url="page/", title="P")
    assert pipeline.check_links(tmp_path, [page]) == []
    _write(tmp_path, "page/index.html", '<a href="/shared/#nope">x</a>')
    assert pipeline.check_links(tmp_path, [page]) == ["page/ -> /shared/#nope (no #nope)"]


# --- serve --------------------------------------------------------------------


def test_serve_watches_every_input_that_changes_the_build():
    """`--serve` watched the Markdown and nothing else that a build reads.

    A figure module, the curriculum, book.yaml, collection.yaml or a theme
    bundle all change what a build produces. Under the old watch set an edit to
    any of them produced no rebuild, so the developer concluded it had done
    nothing. `watch_paths` has no other test.
    """
    book = pipeline.books.book_by_id(BOOK)
    watched = [p for p in pipeline.watch_paths(BOOK)]
    resolved = {p.resolve() for p in watched}
    assert all(p.exists() for p in watched), "serve stats every watched path"
    assert book.curriculum.resolve() in resolved
    assert (book.root / "book.yaml").resolve() in resolved
    assert (repo_root() / "collection.yaml").resolve() in resolved
    theme = next((repo_root() / "themes").glob("*.yaml"))
    assert theme.resolve() in resolved
    figure = next((book.docs / "assets" / "figures").glob("*.js"), None)
    assert figure is not None, "this test assumes the book has figure modules"
    assert figure.resolve() in resolved


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
    assert "chapter-1/section-1.1/learn/" in urls
    assert "chapter-1/review/" in urls
    assert len(subset.pages) == 18


def test_build_writes_the_expected_files(subset):
    for name in ("404.html", "robots.txt", "sitemap.xml"):
        assert (subset.out / name).exists(), name
    assert (subset.out / "chapter-1" / "index.html").exists()
    assert (subset.out / "assets" / "stylesheets" / "shell.css").exists()


def test_every_page_links_the_book_local_stylesheet(subset):
    """The per-book override is the last stylesheet, so it must reach the page.

    A book's own component rules live here; a build that copies `book.css` but
    not `book-local.css` would silently drop them.
    """
    page = (subset.out / "chapter-1/index.html").read_text()
    assert 'href="../assets/stylesheets/book-local.css"' in page
    assert (subset.out / "assets" / "stylesheets" / "book-local.css").is_file()


def test_the_formulae_booklet_and_its_data_are_shipped(subset):
    """The widget and the JSON it fetches are one feature, so they ship together."""
    book = pipeline.books.book_by_id(BOOK)
    assert book.booklet_name, "this test assumes the book declares a booklet"
    for asset in ("booklet.js", "booklet.json"):
        assert (subset.out / "assets" / "booklet" / asset).is_file(), asset
    page = (subset.out / "chapter-1/index.html").read_text()
    assert 'src="../assets/booklet/booklet.js"' in page
    assert page.count("assets/booklet/booklet.js") == 1


def test_a_book_without_a_booklet_ships_no_widget():
    """No page may fetch a booklet a book does not have."""
    from dataclasses import replace

    book = replace(pipeline.books.book_by_id(BOOK), booklet_name="")
    assert pipeline.booklet_widget(book, "../") == ""


def test_build_renders_maths_to_mathml(subset):
    page = (subset.out / "chapter-1/section-1.1/learn/index.html").read_text()
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
    html = (subset.out / "chapter-1/index.html").read_text()
    assert "document.body.setAttribute" in html
    assert "data-md-color-scheme" in html


def test_every_page_applies_preferences_from_the_shared_snippet(subset):
    """The pipeline fills the template's ``$prefs_script``, with no copy of its own.

    ``hooks/prefs.py`` is the only implementation; this pins that the pipeline
    actually substitutes it rather than leaving the slot or shipping a second
    script.
    """
    snippet = prefs.snippet(pipeline.make_config(pipeline.books.book_by_id(BOOK), "higher"))
    for page in subset.pages:
        html = (subset.out / page.output).read_text(encoding="utf-8")
        assert snippet in html, page.url
        assert html.count("window.textbookPrefs") == 1, page.url


def test_build_uses_relative_asset_prefixes_for_a_subpath_deployment(subset):
    html = (subset.out / "chapter-1/section-1.1/learn/index.html").read_text()
    assert 'href="../../../assets/stylesheets/shell.css"' in html


def test_build_is_deterministic(subset, tmp_path):
    again = pipeline.build(BOOK, "higher", out=tmp_path / "again", chapter=1)
    first = (subset.out / "chapter-1/review/index.html").read_text()
    second = (again.out / "chapter-1/review/index.html").read_text()
    assert first == second


def test_foundation_profile_omits_higher_only_sections(tmp_path):
    """The nav comes from curriculum.yaml, so the pipeline filters by tier there.

    The old renderer filtered by each page's own front matter, which is how a
    Higher-only section once reached Foundation readers. Trusting the curriculum,
    which AGENTS.md names the source of truth for tier, means the pipeline cannot
    leak one even if the two ever disagree again.

    Chapter 5 is the case that mattered: 5.6 is Higher-only, and 5.4 was too
    until the AQA 8300 and OCR J560 tier columns were checked and showed it to be
    Foundation content. See tests/test_frontmatter.py for the citations.
    """
    result = pipeline.build(BOOK, "foundation", out=tmp_path / "f", chapter=5)
    urls = {page.url for page in result.pages}
    assert not any("section-5.6/" in url for url in urls)
    assert any("section-5.4/" in url for url in urls)
    assert any("section-5.1/" in url for url in urls)


def test_higher_profile_keeps_higher_only_sections(tmp_path):
    result = pipeline.build(BOOK, "higher", out=tmp_path / "h", chapter=5)
    urls = {page.url for page in result.pages}
    assert any("section-5.6/" in url for url in urls)


def test_sitemap_is_omitted_when_no_base_url_is_configured(monkeypatch, subset):
    """The sitemap must follow the collection's base URL, and nothing else."""
    monkeypatch.setattr(pipeline.books, "load_collection", lambda root=None: {})
    assert pipeline.sitemap(pipeline.books.book_by_id(BOOK), "higher", subset.pages) == ""


@pytest.mark.parametrize("profile", ["higher", "foundation"])
def test_canonical_url_names_the_profile_being_built(profile):
    """The canonical is the profile's own URL under the collection base URL."""
    url = pipeline.canonical_url(pipeline.books.book_by_id(BOOK), profile, "chapter-1/")
    assert url.startswith("http")
    assert f"/gcse-maths/{profile}/chapter-1/" in url


def test_each_profile_publishes_its_own_canonical_and_sitemap(tmp_path, subset):
    """Regression for the live defect: every profile declared the default one.

    Both profiles of a tiered book are built. The Foundation page told a crawler
    its canonical was the Higher URL, and the Foundation sitemap listed the
    Higher pages, so the whole Foundation edition read as a duplicate of the
    Higher one and could be dropped from search results.
    """
    foundation = pipeline.build(
        BOOK, "foundation", out=tmp_path / "foundation", chapter=1, index=False
    )
    for result, profile in ((subset, "higher"), (foundation, "foundation")):
        page = (result.out / "chapter-1" / "index.html").read_text(encoding="utf-8")
        canonical = re.search(r'<link rel="canonical" href="([^"]+)"', page).group(1)
        assert f"/gcse-maths/{profile}/" in canonical, canonical
        locs = re.findall(
            r"<loc>([^<]+)</loc>", (result.out / "sitemap.xml").read_text(encoding="utf-8")
        )
        assert locs, f"{profile}: the sitemap lists nothing"
        assert all(f"/gcse-maths/{profile}/" in loc for loc in locs), locs[:3]


def test_a_chapter_build_reports_a_broken_link_inside_that_chapter(tmp_path, monkeypatch):
    """Regression: a subset build checked no links and still printed `broken 0`.

    `build` passed the source prefix (`Chapter 1`) as `scope`, but `check_links`
    compares slugged output paths, so no candidate matched and every link was
    skipped. This puts a genuinely broken link inside the built chapter and
    requires the build to name it.
    """
    real_render_page = pipeline.render_page

    def render_with_a_broken_link(book, profile, config, nav, md_path, template, **kwargs):
        html, entry, maths_failed = real_render_page(
            book, profile, config, nav, md_path, template, **kwargs
        )
        if md_path == "Chapter 1/index.md":
            html = html.replace("</main>", '<a href="no-such-page/">broken</a></main>')
        return html, entry, maths_failed

    monkeypatch.setattr(pipeline, "render_page", render_with_a_broken_link)
    result = pipeline.build(BOOK, "higher", out=tmp_path / "broken", chapter=1, index=False)
    assert any("no-such-page" in entry for entry in result.broken), result.broken


def test_tier_behaviour_follows_the_declared_filter_not_the_profile_id(monkeypatch):
    """A book may name its Foundation profile something other than `foundation`.

    Both the nav filter and the in-page tier hook keyed on the literal id, so a
    book declaring `id: learner, tier_filter: foundation` would have shipped
    Higher-only content to Foundation readers with no error. Both now read the
    declared filter through one resolver, `Book.tier_filter_for`.
    """
    from dataclasses import replace

    from textbook import config as cfg
    from textbook.hooks import tier

    book = pipeline.books.book_by_id(BOOK)
    renamed = replace(
        book,
        profiles=(
            replace(book.default_profile, id="core", tier_filter="higher", default=True),
            replace(book.profile("foundation"), id="learner", tier_filter="foundation"),
        ),
    )
    assert renamed.tier_filter_for("learner") == "foundation"
    assert renamed.tier_filter_for("core") == "higher"

    # The nav filter drops the Higher-only section under the renamed profile.
    filtered = pipeline.nav_for(
        renamed, include_higher=renamed.tier_filter_for("learner") != "foundation"
    )
    assert "Section 5.6" not in str(filtered)
    assert "Section 5.6" in str(pipeline.nav_for(renamed, include_higher=True))

    # And the hook strips the in-page block under that profile id.
    monkeypatch.setattr(cfg, "book_by_id", lambda _id: renamed)
    out = tier.on_page_markdown(
        "Before.\n\n<!-- tier:h -->Higher only.<!-- /tier:h -->\n\nAfter.\n",
        pipeline.make_page("Chapter 1/index.md", "chapter-1/"),
        {"extra": {"book": BOOK, "tier_profile": "learner"}},
        [],
    )
    assert "Higher only." not in out
    assert "Before." in out and "After." in out


# --- the page shell: settings, PWA and build identity -------------------------


def test_every_page_carries_the_settings_control(subset):
    html = (subset.out / "chapter-1/index.html").read_text()
    assert 'id="tb-settings"' in html
    assert 'aria-label="Settings"' in html
    assert 'aria-haspopup="dialog"' in html
    assert 'aria-controls="tb-settings-dialog"' in html
    assert 'id="tb-settings-dialog"' in html
    assert 'method="dialog"' in html
    assert 'name="tb-scheme"' in html
    assert 'name="tb-theme"' in html


def test_the_settings_options_come_from_the_bundle_registry(subset):
    """The dialog reads the bundles, so it cannot drift from ``themes/``."""
    html = (subset.out / "chapter-1/index.html").read_text()
    for bundle in ordered_bundles():
        assert f'value="{bundle.id}"' in html, bundle.id
    for scheme in ("default", "slate"):
        assert f'value="{scheme}"' in html


def test_every_page_carries_the_build_identity(subset):
    label = portal.build_label()
    assert label, "the test checkout should have a git build label"
    html = (subset.out / "chapter-1/index.html").read_text()
    assert f'<meta name="build" content="{label}">' in html


def test_every_page_links_the_manifest_and_the_shared_runtimes(subset):
    html = (subset.out / "chapter-1/index.html").read_text()
    assert '<link rel="manifest" href="/manifest.webmanifest">' in html
    assert 'rel="icon" type="image/svg+xml" href="../assets/icons/favicon.svg"' in html
    assert "/assets/settings/service-worker.js" in html
    assert "assets/settings/settings.js" in html
    assert "assets/stylesheets/settings.css" in html


def test_build_copies_the_settings_and_pwa_assets(subset):
    for relative in (
        "assets/stylesheets/settings.css",
        "assets/settings/settings.js",
        "assets/settings/service-worker.js",
        "assets/icons/app-icon.svg",
        "assets/icons/favicon.svg",
        "manifest.webmanifest",
        "sw.js",
    ):
        assert (subset.out / relative).exists(), relative


def test_the_copied_settings_assets_are_the_shared_ones(subset):
    """No second control: the build ships the bytes the landing page loads."""
    shared = repo_root() / "assets"
    for relative in (
        "stylesheets/settings.css",
        "settings/settings.js",
        "settings/service-worker.js",
    ):
        copied = (subset.out / "assets" / relative).read_bytes()
        assert copied == (shared / relative).read_bytes(), relative


def test_the_service_worker_carries_the_build_label_not_the_placeholder(subset):
    text = (subset.out / "sw.js").read_text()
    assert "__TB_BUILD__" not in text
    assert portal.build_label() in text


def test_the_manifest_names_the_app_and_its_scope(subset):
    import json

    data = json.loads((subset.out / "manifest.webmanifest").read_text())
    assert data["start_url"] == "/"
    assert data["scope"] == "/"
    assert data["icons"][0]["src"] == "/assets/icons/app-icon.svg"


def test_the_page_shell_declares_no_literal_colour():
    """Colour belongs to the bundles: the shell uses `--tb-*` tokens only."""
    text = pipeline.SHELL_CSS.read_text(encoding="utf-8")
    stripped = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    assert not re.search(r"#[0-9a-fA-F]{3,8}\b", stripped)
    assert not re.search(r"\b(rgba?|hsla?)\(", stripped, re.I)


def test_a_page_the_build_did_not_write_fails_the_build(tmp_path):
    """A recorded run printed "page was not written" for several routes and still
    exited 0. The code path cannot do that: `check_links` records the page in
    `broken`, and `BuildResult.ok` is false whenever `broken` is non-empty, so
    `main` returns 1. The exit code in that note is therefore unexplained by the
    code — this pins the invariant it was worried about, so the next sighting is
    a real regression rather than a mystery.
    """
    out = tmp_path / "site"
    (out / "one").mkdir(parents=True)
    (out / "one" / "index.html").write_text("<p>One</p>", encoding="utf-8")

    pages = [
        pipeline.RenderedPage(url="/one/", title="One"),
        pipeline.RenderedPage(url="/two/", title="Two"),  # never written
    ]
    broken = pipeline.check_links(out, pages)
    assert any("page was not written" in entry for entry in broken), broken

    result = pipeline.BuildResult(out=out, pages=pages, broken=broken)
    assert not result.ok, "a page the build did not write must fail the build"


def test_every_page_links_back_to_the_collection(subset):
    """A book is served from a subpath, so there was no way back to the front door.

    The link is root-absolute, like the 404's and the manifest's: a relative one
    would point at the wrong place at every depth. The landing page is where a
    reader changes book or qualification, so a book that cannot reach it is a dead
    end. Asserted on every built page rather than one, because the masthead is
    shared and a regression would be shared too.
    """
    assert subset.ok, subset.broken + subset.maths_errors
    missing = [
        page.url
        for page in subset.pages
        if 'class="masthead__home" href="/"' not in (subset.out / page.output).read_text(encoding="utf-8")
    ]
    assert not missing, f"no link home on: {missing[:5]}"


def test_every_page_links_the_ios_home_screen_icon(subset):
    """iOS ignores the manifest, so the link has to be on the page itself.

    The icon is a committed PNG (see assets/icons/README.md) and the prefix is
    per-page, so this checks the resolved href rather than just the attribute —
    a wrong prefix would 404 on every page but the shallowest.
    """
    assert subset.ok, subset.broken + subset.maths_errors
    missing = []
    for page in subset.pages:
        html = (subset.out / page.output).read_text(encoding="utf-8")
        if 'rel="apple-touch-icon"' not in html:
            missing.append(page.url)
            continue
        # The target it names must actually exist in the build.
        href = html.split('rel="apple-touch-icon" href="', 1)[1].split('"', 1)[0]
        target = (subset.out / page.output).parent / href
        if not target.resolve().is_file():
            missing.append(f"{page.url} -> {href}")
    assert not missing, f"no working iOS icon link on: {missing[:5]}"


def test_every_table_is_in_a_scroll_container(subset):
    """A wide table must scroll inside its column, not widen the page.

    The reader's Android report traced back to this and to a wide display
    equation: both made the document wider than the screen, which pushed the
    masthead's settings button past the right edge. `scripts/check-mobile.cjs`
    measures the symptom in a browser; this asserts the cause is wrapped on every
    page of a real build.
    """
    assert subset.ok, subset.broken + subset.maths_errors
    unwrapped = []
    for page in subset.pages:
        html = (subset.out / page.output).read_text(encoding="utf-8")
        tables = html.count("<table")
        wrapped = html.count('<div class="table-scroll">')
        if tables != wrapped:
            unwrapped.append(f"{page.url}: {tables} tables, {wrapped} wrapped")
    assert not unwrapped, unwrapped


def test_an_unknown_profile_is_refused_rather_than_built(tmp_path):
    """A profile id the book does not declare must fail, not publish an edition.

    It used to build. `out` came from `book.deploy_path(profile)`, so a typo wrote
    a whole new directory — and because the tier filter read `profile !=
    "foundation"`, the new edition was built as **Higher**, so a Foundation typo
    would have shipped Higher-only pages to Foundation readers.

    Found by noticing `site/gcse-physics/all/` — a directory no profile owns —
    while measuring figures at phone width. Nothing had failed; the output was
    simply there, and a stale copy of it silently polluted the measurement.
    """
    book = book_by_id("gcse-physics")
    declared = [p.id for p in book.profiles]
    with pytest.raises(ValueError) as caught:
        pipeline.build(book.id, "bogus", out=tmp_path / "out", index=False)
    message = str(caught.value)
    assert "bogus" in message
    for one in declared:
        assert one in message, f"the error should name the profiles it does declare: {message}"
    assert not (tmp_path / "out").exists(), "a refused build must not leave a directory"


def test_the_yaml_loader_prefers_the_fast_parser():
    """`yamlio` asks for PyYAML's C parser and falls back without failing.

    Measured at about **12x** on this repository's banks — 1.48s against 0.12s for
    119 files — and the banks are a hot path: an A-level Mathematics build parses
    every bank in the book. A missing `libyaml` binding must be a slower build, not
    a different one, so the fallback is the same *safe* loader rather than
    `yaml.Loader`, which would happily build a Python object out of a bank.
    """
    import yaml

    from textbook import yamlio

    assert yamlio.USING_C_PARSER == hasattr(yaml, "CSafeLoader")
    assert yamlio.Loader in (yaml.SafeLoader, getattr(yaml, "CSafeLoader", None))
    # A safe loader of either kind refuses a document that names a Python class.
    assert yamlio.load("a: 1") == {"a": 1}
    assert yamlio.load("") is None
    with pytest.raises(yaml.YAMLError):
        yamlio.load("!!python/object/apply:os.system ['true']")
