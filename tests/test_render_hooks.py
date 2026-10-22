"""The figure and maths hooks and the tier strategies, without a site generator.

This replaces ``test/run.sh`` and ``test/configs/``. That harness built the same
fixture content under several renderer configurations to compare three ways of
authored a figure (raw HTML with a global loader, a Jinja macro plugin, and the
repo-owned hook) and three tier strategies. The comparison is settled: the
pipeline uses exactly the hooks in ``pipeline.MARKDOWN_HOOKS``, so the mechanism
cannot vary, and the comparison's losing branch (``mkdocs-macros-plugin``) is
gone from the dependencies rather than merely unused.

What was *behaviour* rather than comparison is pinned here, against the same
hook functions the pipeline calls:

* the portable ``<maths-figure>`` substrate passes through untouched — the
  shorthand is sugar over it, not a second format;
* ``:::figure`` expands to that element;
* the loader is injected per page, with a path relative to the page, so a page
  with no figure ships no figure JavaScript;
* an unknown slug fails the build rather than rendering nothing;
* a template marker from another system is left alone (the hook does not
  hijack it);
* a renderer reply that is not one result per item becomes ``.math-error`` spans
  rather than leaving ``\x00MATHn\x00`` placeholders in the page;
* Foundation drops Higher-only pages and strips in-page Higher blocks while
  keeping shared content; Higher keeps both; the toggle profile tags the block.

The tier behaviours are also exercised end to end against the real book in
``tests/test_pipeline.py`` (the nav is filtered from ``curriculum.yaml``); this
file pins the hook itself, which is what a fixture can do honestly.
"""

from __future__ import annotations

import re
from pathlib import Path
from types import SimpleNamespace

import markdown as markdown_lib
import pytest

from textbook import pipeline
from textbook.hooks import figures, tier

BOOK = "gcse-maths"

# A figure module, only as much as the hook's discovery needs: a regular
# ``.js`` beside the loader. The loader's own filename is excluded by name, so
# the fixture must include it for the discovery to be exercised honestly.
FIGURE_MODULE = "export function mount(el) { el.textContent = 'gradient'; }\n"
LOADER = "// shared figure loader\n"


@pytest.fixture
def docs(tmp_path: Path) -> Path:
    """A minimal docs tree with one figure and the shared loader."""
    figures_dir = tmp_path / "assets" / "figures"
    figures_dir.mkdir(parents=True)
    (figures_dir / "gradient.js").write_text(FIGURE_MODULE, encoding="utf-8")
    (figures_dir / "figures.js").write_text(LOADER, encoding="utf-8")
    return tmp_path


def make_config(docs_dir: Path, profile: str = "higher") -> dict:
    """The hook config, from the one constructor — not a second copy of it.

    This used to hand-write ``{"docs_dir", "extra": {"book", "tier_profile"}}``, which
    is two of the seven keys production supplies. It carried neither the proof book nor
    the bundle registry, so a hook that started reading one of them would pass here and
    fail in the build.
    """
    return pipeline.cfg.from_parts(
        docs_dir, book=pipeline.books.book_by_id(BOOK), profile=profile
    )


def run_figure_hook(markdown: str, docs_dir: Path, md_path: str = "figure/index.md") -> str:
    page = pipeline.make_page(md_path, pipeline.url_for(md_path))
    return figures.on_page_markdown(markdown, page, make_config(docs_dir), [])


def render(markdown: str) -> str:
    """Markdown to HTML, exactly as the pipeline's last mile does it."""
    return pipeline.rewrite_source_links(
        markdown_lib.markdown(
            markdown, extensions=pipeline.EXTENSIONS, output_format="html5"
        )
    )


# --- the figure hook ----------------------------------------------------------


def test_the_portable_substrate_passes_through_untouched(docs):
    """Raw HTML is the wire format; the directive is sugar over it.

    A page that writes the element directly must survive the hook unchanged, so
    the substrate stays portable and there is one format rather than two.
    """
    source = "# Raw\n\n<maths-figure data-figure=\"gradient\"></maths-figure>\n"
    assert run_figure_hook(source, docs) == source
    html = render(run_figure_hook(source, docs))
    assert '<maths-figure data-figure="gradient"></maths-figure>' in html


def test_the_directive_expands_to_the_portable_element(docs):
    html = render(run_figure_hook("# A\n\n:::figure gradient\n", docs))
    assert '<maths-figure data-figure="gradient"></maths-figure>' in html
    assert ":::figure" not in html


def test_the_loader_is_injected_relative_to_the_page(docs):
    """The loader path is computed from the page, so it works at any depth."""
    md_path = "figure/index.md"  # one directory deep -> one '../'
    source = run_figure_hook(":::figure gradient\n", docs, md_path=md_path)
    assert 'src="../assets/figures/figures.js"' in source

    nested = run_figure_hook(
        ":::figure gradient\n", docs, md_path="Chapter 1/Section 1.1/Walkthrough/index.md"
    )
    assert 'src="../../../assets/figures/figures.js"' in nested


def test_a_page_without_a_figure_ships_no_figure_javascript(docs):
    """Tier-0 content must not load the figure runtime."""
    source = run_figure_hook("# Plain\n\nJust prose.\n", docs)
    assert "figures.js" not in source
    assert "<script" not in source


def test_an_unknown_slug_fails_the_build(docs):
    with pytest.raises(ValueError) as err:
        run_figure_hook(":::figure nope\n", docs)
    assert "nope" in str(err.value)
    # The message names the page, so a failure points at the offending source.
    assert "figure/index.md" in str(err.value)


def test_another_systems_marker_is_left_alone(docs):
    """The hook expands ``:::figure``; a Jinja call is not its business.

    A template plugin treated any literal ``{{ ... }}`` in prose as an
    expression, which aborted the build on mathematics. The hook must not
    inherit that collision: this marker stays literal for whoever owns it.
    """
    source = 'A call that is not ours: {{ figure("gradient") }}\n'
    assert run_figure_hook(source, docs) == source


def test_the_directive_is_line_anchored_and_fence_aware(docs):
    """Only a whole line is a directive, and it never fires inside a code fence."""
    inline = "See :::figure gradient in the prose. Still prose.\n"
    assert 'maths-figure' not in run_figure_hook(inline, docs)
    fenced = "```\n:::figure gradient\n```\n"
    assert 'maths-figure' not in run_figure_hook(fenced, docs)


def test_the_pipeline_uses_this_hook_on_every_page():
    """The behaviour above is only the pipeline's because it is in the chain."""
    assert figures in pipeline.MARKDOWN_HOOKS
    assert tier in pipeline.MARKDOWN_HOOKS


# --- fenced code --------------------------------------------------------------
#
# A fence is preformatted text, and its whole point is the layout inside it: an ASCII
# probability tree, a stem-and-leaf plot, a pseudocode listing. `fenced_code` is what
# makes Python-Markdown treat ``` as a block. Without it the opening backticks came
# back as inline code, so six pages across two books shipped
# `<p><code>text …</code></p>` — the info string printed to the reader as a word, and
# the newlines collapsed by HTML, which turns a tree into a run-on sentence. Nothing
# caught it because no test ever rendered a fence.


def test_a_fence_keeps_its_line_breaks_and_its_columns():
    html = render("```text\nFirst draw    Second draw\nRed  ────┬─ Red\n         └─ Blue\n```\n")
    assert '<pre><code class="language-text">' in html
    assert "First draw    Second draw" in html, "the columns did not survive"
    assert "Red  ────┬─ Red\n         └─ Blue" in html, "the line breaks did not survive"


def test_the_info_string_is_a_class_and_not_a_word_on_the_page():
    """`python` names the language; it is not part of the sentence the reader sees."""
    html = render("```python\nfor x in y:\n    pass\n```\n")
    assert 'class="language-python"' in html
    assert ">python" not in html, "the language label reached the reader as text"
    assert "<p><code>python" not in html, "the fence is still being read as inline code"


#: The directives a page can use. An info string that matches one of these is a
#: directive that lost its colons — the fence then prints the words to the reader and
#: the hook never fires. `books/ie-lc-physics` shipped ```` ```figure hooke-law ````
#: this way: the figure did not mount and the page read "figure hooke-law".
DIRECTIVES = (
    "figure",
    "prove",
    "class",
    "deeper",
    "used",
    "answers",
    "tier",
    "disclaimer",
)


def test_no_page_opens_a_fence_with_a_directive():
    """A fenced directive is a directive that never ran, printed to the reader.

    A directive belongs on its own line, outside a fence. Inside one it is literal
    text, so the reader sees `:::figure hooke-law` instead of a figure — or, as here,
    the info string alone, because the fence was the whole mistake.
    """
    offenders = []
    for book in pipeline.books.discover_books():
        for page in book.docs.rglob("*.md"):
            for line in page.read_text(encoding="utf-8").splitlines():
                if re.match(rf"^```(?:{'|'.join(DIRECTIVES)})\b", line):
                    where = page.relative_to(book.docs).as_posix()
                    offenders.append(f"{book.id}: {where}: {line}")
    assert offenders == []


# --- the figure loader on a real built page -----------------------------------


@pytest.fixture(scope="module")
def built(tmp_path_factory) -> pipeline.BuildResult:
    out = tmp_path_factory.mktemp("render-hooks") / "book"
    return pipeline.build(BOOK, "higher", out=out, chapter=1, index=False)


def test_a_real_figure_page_carries_the_loader(built):
    html = (built.out / "chapter-1/section-1.1/learn/index.html").read_text(
        encoding="utf-8"
    )
    assert '<maths-figure data-figure="number-line">' in html
    assert 'src="../../../assets/figures/figures.js"' in html


def test_a_real_page_without_a_figure_gets_no_loader(built):
    html = (built.out / "chapter-1/review/index.html").read_text(encoding="utf-8")
    assert "assets/figures/figures.js" not in html


def test_a_real_home_page_carries_the_disclaimer(built):
    """The directive on the home page survives the whole build, not only the hook."""
    html = (built.out / "index.html").read_text(encoding="utf-8")
    assert '<details class="disclaimer">' in html
    assert "Using this book alongside your course" in html
    assert "not a replacement" in html


# --- tier strategies ----------------------------------------------------------

H_PAGE = "---\ntitle: Higher only\ntier: H\n---\n\n# Higher only\n\nHigher-only body.\n"
F_PAGE = (
    "---\ntitle: Foundation core\ntier: F\n---\n\n# Foundation core\n\n"
    "Shared body.\n\n"
    "<!-- tier:h -->\nHigher extension.\n<!-- /tier:h -->\n\n"
    "Shared closing.\n"
)


@pytest.fixture
def tiers(tmp_path: Path) -> dict:
    (tmp_path / "higher-only.md").write_text(H_PAGE, encoding="utf-8")
    (tmp_path / "foundation-core.md").write_text(F_PAGE, encoding="utf-8")
    return {"docs": tmp_path}


def source(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def page(path: str) -> SimpleNamespace:
    return pipeline.make_page(path, pipeline.url_for(path))


def fake_files(*paths: Path) -> list:
    """The one attribute ``tier.on_files`` reads off a file."""
    return [SimpleNamespace(abs_src_path=str(path)) for path in paths]


def test_foundation_drops_a_higher_only_page(tiers):
    docs = tiers["docs"]
    kept = tier.on_files(
        fake_files(docs / "foundation-core.md", docs / "higher-only.md"),
        make_config(docs, "foundation"),
    )
    names = {Path(f.abs_src_path).name for f in kept}
    assert names == {"foundation-core.md"}


def test_higher_keeps_every_page(tiers):
    docs = tiers["docs"]
    kept = tier.on_files(
        fake_files(docs / "foundation-core.md", docs / "higher-only.md"),
        make_config(docs, "higher"),
    )
    assert len(kept) == 2


def test_foundation_strips_the_in_page_higher_block(tiers):
    docs = tiers["docs"]
    out = tier.on_page_markdown(
        source(docs / "foundation-core.md"),
        page("foundation-core.md"),
        make_config(docs, "foundation"),
        [],
    )
    assert "Higher extension" not in out
    # The shared content on either side of the block survives, so the strip is a
    # range and not a truncation.
    assert "Shared body." in out
    assert "Shared closing." in out


def test_higher_keeps_the_in_page_higher_block(tiers):
    docs = tiers["docs"]
    out = tier.on_page_markdown(
        source(docs / "foundation-core.md"),
        page("foundation-core.md"),
        make_config(docs, "higher"),
        [],
    )
    assert "Higher extension" in out
    assert "<!-- tier:h -->" in out, "Higher is the raw source, unmodified"


def test_the_toggle_tags_the_higher_block_for_the_switch(tiers):
    """The toggle keeps everything and marks the block the runtime hides."""
    docs = tiers["docs"]
    out = tier.on_page_markdown(
        source(docs / "foundation-core.md"),
        page("foundation-core.md"),
        make_config(docs, "toggle"),
        [],
    )
    assert 'data-tier="higher"' in out
    assert "Higher extension" in out
    assert "Shared body." in out


def test_the_toggle_tag_renders_as_an_element_a_script_can_select(tiers):
    """The tag is HTML, so the runtime switch has something to hide."""
    docs = tiers["docs"]
    out = tier.on_page_markdown(
        source(docs / "foundation-core.md"),
        page("foundation-core.md"),
        make_config(docs, "toggle"),
        [],
    )
    html = render(out)
    assert re.search(r'<div[^>]*data-tier="higher"', html)
    assert "Higher extension" in html


# --- the real book end to end -------------------------------------------------


@pytest.mark.parametrize(
    ("profile", "higher_only_present"),
    [("higher", True), ("foundation", False)],
)
def test_the_profiles_agree_with_the_tier_axis(tmp_path, profile, higher_only_present):
    """Section 5.6 is Higher-only; the pipeline filters it by curriculum tier."""
    result = pipeline.build(BOOK, profile, out=tmp_path / profile, chapter=5, index=False)
    urls = {entry.url for entry in result.pages}
    present = any("section-5.6/" in url for url in urls)
    assert present is higher_only_present
    assert result.ok, result.broken + result.maths_errors


def test_the_hook_chain_is_defined_once_and_the_pipeline_uses_that_one():
    """Two lists with no test between them is how `:::prove` silently did nothing.

    `hooks/__init__.py` said the order was "stated once, here, and tested"; the
    pipeline kept its own tuple and ran that instead, so adding a hook to the
    documented chain changed nothing at all. The order now lives in one place and
    this is what says so.
    """
    from textbook import hooks

    assert pipeline.MARKDOWN_HOOKS is hooks.MARKDOWN_HOOKS, (
        "the pipeline has its own hook chain again; a hook added to hooks/__init__.py "
        "would not run"
    )
    order = [module.__name__.rsplit(".", 1)[-1] for module in hooks.MARKDOWN_HOOKS]
    # `maths` is not in the list: it runs on rendered HTML rather than markdown, in
    # `render_page`, and it must stay last or the maths a hook emits is not rendered.
    # `classes` sits beside `proofs`: both expand a directive into one link to a page
    # in a reference work, resolved from a registry, and neither depends on the other.
    # `deeper` follows them because its target is a page this build writes.
    assert order == [
        "tier",
        "disclaimer",
        "toc",
        "figures",
        "proofs",
        "classes",
        "usedin",
        "deeper",
        "problems",
    ], order


def test_tier_runs_before_everything_that_expands():
    """Why the order is not arbitrary: `tier` deletes blocks, so it goes first.

    A `<!-- tier:h -->` block containing a `:::figure` would otherwise be expanded
    and then removed, which is wasted work — or, if the removal came after the
    loader was injected, a page carrying a loader for a figure it does not show.
    """
    from textbook import hooks

    names = [module.__name__.rsplit(".", 1)[-1] for module in hooks.MARKDOWN_HOOKS]
    assert names[0] == "tier"


# --- the maths hook -----------------------------------------------------------

MATH_CONTENT = (
    '<span class="arithmatex">\\(a+b\\)</span> and '
    '<div class="arithmatex">\\[c+d\\]</div>'
)


def test_a_short_renderer_reply_becomes_error_spans_not_placeholders(monkeypatch):
    """The renderer's protocol is one MathML result per item.

    A short reply would leave ``\x00MATHn\x00`` placeholders literally in the
    page: not a `.math-error`, so the gate's grep misses it, and not a link, so
    `check_links` misses it. The hook must fall back to error spans instead, which
    the pipeline reports as a page whose maths failed.
    """
    from textbook.hooks import maths

    monkeypatch.setattr(maths, "render", lambda items: ["<math>only one</math>"])
    html = maths.on_page_content(MATH_CONTENT, None, None, [])

    assert "\x00MATH" not in html
    assert html.count('class="math-error"') == 2


def test_a_full_renderer_reply_substitutes_every_expression(monkeypatch):
    """The happy path, so the guard above is not pinning a hook that never works."""
    from textbook.hooks import maths

    monkeypatch.setattr(
        maths, "render", lambda items: [f"<math>{item['tex']}</math>" for item in items]
    )
    html = maths.on_page_content(MATH_CONTENT, None, None, [])

    assert "arithmatex" not in html
    assert "\x00MATH" not in html
    assert html.count("<math>") == 2
