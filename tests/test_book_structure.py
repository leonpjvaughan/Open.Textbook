"""A book declares its own structure, and the engine obeys the declaration.

Three things used to be global: **three pages per section**, **no page that is not
in the curriculum**, and **assets that are figures or stylesheets**. Each is right
for a course and wrong for a book that is not one, so each is now declared by the
book and read by the scaffold, the navigation and the lint rules from the same
place.

The failure these tests exist for is the quiet one: a book that declares one page
and gets three, a lint rule demanding verified answers on a page its own `book.yaml`
says it does not have, or a depth page that the navigation links to and the build
never writes.
"""

from __future__ import annotations

from collections import Counter
from types import SimpleNamespace

import pytest

from textbook import book as books
from textbook import config as cfg
from textbook import lint, pipeline, scaffold
from textbook.hooks import deeper as deeper_hook


def make_book(tmp_path, *, section_pages=None, deeper=None, pages=("learn",)):
    """A book on disk, small enough to build, with the parts these tests need."""
    root = tmp_path / "book"
    root.mkdir(parents=True, exist_ok=True)
    declared = "" if section_pages is None else f"section_pages: {list(section_pages)}\n"
    (root / "book.yaml").write_text(
        "id: sample\n"
        "title: Sample\n"
        "qualification: Misc\n"
        "subject: Applied Mathematics\n"
        "description: A book for a test.\n"
        "profiles:\n"
        "  - id: book\n"
        "    name: Read\n"
        "    tier_filter: all\n"
        "    default: true\n"
        "tier_axis: {}\n"
        "oracles: []\n"
        f"{declared}"
        "curriculum: curriculum.yaml\n"
        "sources: sources.yaml\n",
        encoding="utf-8",
    )
    extra = ""
    if deeper:
        extra = "        deeper:\n" + "".join(
            f"          - slug: {entry['slug']}\n            title: '{entry['title']}'\n"
            for entry in deeper
        )
    (root / "curriculum.yaml").write_text(
        "meta:\n"
        "  title: Sample\n"
        "  syllabus: false\n"
        "  what_it_is: A book for a test.\n"
        "chapters:\n"
        "  - id: 1\n"
        "    title: One\n"
        "    strand: applied\n"
        "    summary: The only chapter.\n"
        "    sections:\n"
        "      - id: '1.1'\n"
        "        title: One point one\n"
        "        summary: A section.\n"
        f"{extra}",
        encoding="utf-8",
    )
    (root / "sources.yaml").write_text("retrieved: 2026-01-01\nreferences: []\n", encoding="utf-8")
    return books.load_book(root / "book.yaml")


# --- which pages a section has ------------------------------------------------


def test_a_book_declaring_one_page_gets_one_page(tmp_path):
    book = make_book(tmp_path, section_pages=["learn"])
    scaffold.scaffold(book, dry_run=False)

    base = book.docs / "Chapter 1" / "Section 1.1"
    assert (base / "Walkthrough" / "index.md").is_file()
    assert not (base / "Guided problems").exists(), (
        "the scaffold wrote a page the book did not declare"
    )
    assert not (base / "Problems").exists()


def test_a_book_with_no_declaration_gets_the_course_formula(tmp_path):
    """The default is unchanged: nine books rely on it."""
    book = make_book(tmp_path)
    scaffold.scaffold(book, dry_run=False)

    base = book.docs / "Chapter 1" / "Section 1.1"
    for directory, _kind, _title, _slug in scaffold.PAGE_KINDS:
        assert (base / directory / "index.md").is_file(), directory


def section_children(nav, section_id: str):
    """The children the nav gives one section, which sit under its chapter."""
    for chapter in nav:
        for title, children in chapter.items():
            if not str(title).startswith("Chapter"):
                continue
            for child in children:
                for key, value in child.items():
                    if str(key).startswith(section_id):
                        return value
    raise AssertionError(f"no section {section_id} in the nav")


def test_the_navigation_lists_only_the_declared_pages():
    chapters = [{"id": 1, "title": "One", "sections": [{"id": "1.1", "title": "One point one"}]}]
    nav = scaffold.build_nav_list([], chapters, page_kinds=("walkthrough",))
    listed = [list(child)[0] for child in section_children(nav, "1.1")]
    assert listed == ["Learn"]


def test_an_unknown_page_kind_is_refused_at_load(tmp_path):
    book = make_book(tmp_path, section_pages=["lessons"])
    with pytest.raises(ValueError, match="lessons"):
        book.section_page_kinds


def test_a_book_without_a_practise_page_is_not_asked_for_verified_answers(tmp_path):
    """The rule that matters: lint must check the structure the book declared.

    Without this, a book with one page per section fails a build for a missing
    `:::answers` block on a `Practise` page it deliberately does not have — and the
    only way out is an exemption per book, which is how rules rot.
    """
    book = make_book(tmp_path, section_pages=["learn"])
    scaffold.scaffold(book, dry_run=False)
    page = book.docs / "Chapter 1" / "Section 1.1" / "Walkthrough" / "index.md"
    page.write_text(
        "---\ntitle: 1.1\nchapter: 1\nsection: '1.1'\nkind: walkthrough\n---\n\n"
        "# 1.1\n\nYou should now be able to read. Watch out for the sign.\n",
        encoding="utf-8",
    )
    findings: Counter = Counter()
    lint.lint(book, False, findings, {})
    assert "structure:problems-missing-markers" not in findings, dict(findings)
    assert "structure:guided-missing-warmup" not in findings, dict(findings)


def test_the_practise_rule_still_fires_when_the_book_declares_the_page(tmp_path):
    """Guard the guard: the exemption is the declaration, not a blanket skip."""
    book = make_book(tmp_path)  # the three-page default
    scaffold.scaffold(book, dry_run=False)
    practise = book.docs / "Chapter 1" / "Section 1.1" / "Problems" / "index.md"
    practise.write_text(
        "---\ntitle: 1.1 Practise\nchapter: 1\nsection: '1.1'\nkind: problems\n---\n\n"
        "# 1.1 Practise\n\nSome questions, and no answers.\n",
        encoding="utf-8",
    )
    findings: Counter = Counter()
    lint.lint(book, False, findings, {})
    assert findings["structure:problems-missing-markers"] == 1


# --- the optional depth track -------------------------------------------------


def test_a_deeper_page_is_a_page_with_a_path_and_a_title(tmp_path):
    book = make_book(tmp_path, deeper=[{"slug": "more", "title": "A little more"}])
    pages = book.deeper_pages
    assert pages == [
        {
            "chapter": "1",
            "section": "1.1",
            "slug": "more",
            "title": "A little more",
            "path": "Chapter 1/Section 1.1/Deeper/more/index.md",
        }
    ]


def test_the_navigation_lists_each_deeper_page_below_its_section(tmp_path):
    book = make_book(tmp_path, section_pages=["learn"], deeper=[{"slug": "more", "title": "A little more"}])
    nav = scaffold.build_nav_list(
        book.strands,
        book.chapters,
        page_kinds=book.section_page_kinds,
        deepers=book.deeper_pages,
    )
    section = section_children(nav, "1.1")
    assert section == [
        {"Learn": "Chapter 1/Section 1.1/Walkthrough/index.md"},
        {"A little more": "Chapter 1/Section 1.1/Deeper/more/index.md"},
    ]


def test_the_scaffold_never_writes_a_deeper_page(tmp_path):
    """A depth page exists because somebody wrote it, not because a stub filled in."""
    book = make_book(tmp_path, deeper=[{"slug": "more", "title": "A little more"}])
    scaffold.scaffold(book, dry_run=False)
    assert not (book.docs / "Chapter 1" / "Section 1.1" / "Deeper").exists()


@pytest.mark.parametrize(
    ("entry", "message"),
    [
        ({"slug": "Not A Slug", "title": "x"}, "not lowercase"),
        ({"slug": "ok", "title": ""}, "no title"),
        ({"slug": "ok", "title": "One"}, "two deeper pages"),
    ],
)
def test_a_bad_deeper_declaration_is_refused(tmp_path, entry, message):
    deeper = [entry, {"slug": "ok", "title": "Two"}] if message == "two deeper pages" else [entry]
    book = make_book(tmp_path, deeper=deeper)
    with pytest.raises(ValueError, match=message):
        book.deeper_pages


def test_the_url_of_a_deeper_page_is_reader_facing(tmp_path):
    book = make_book(tmp_path, deeper=[{"slug": "more", "title": "A little more"}])
    path = book.deeper_pages[0]["path"]
    assert pipeline.url_for(path) == "chapter-1/section-1.1/deeper/more/"


def test_the_pager_walks_the_main_thread_and_not_the_depth_pages():
    """A section's optional page is not the section after it.

    Both are children of the same section in the nav, so the pager put a depth page
    between one section and the next: the eyebrow said "Next section" and offered an
    optional detour. The reading order skips them, and a depth page borrows the pager
    of the page that offers it, so a reader who takes the detour can step back on.
    """
    book = real_book()
    learn = "Chapter 1/Section 1.2/Walkthrough/index.md"
    deeper = "Chapter 1/Section 1.2/Deeper/two-solutions/index.md"
    following = "Chapter 1/Section 1.3/Walkthrough/index.md"
    pager = pipeline.pager_for([learn, deeper, following], book)

    assert pager[learn][1]["href"] == "chapter-1/section-1.3/learn/", pager[learn]
    assert pager[deeper][0]["href"] == "chapter-1/section-1.2/learn/", pager[deeper]
    assert pager[deeper][1] == pager[learn][1], (
        "stepping forward from a depth page rejoins the thread"
    )


# --- the directive ------------------------------------------------------------


def real_book():
    return books.book_by_id("maths-applied")


def test_the_deeper_directive_expands_to_a_relative_link():
    book = real_book()
    page = SimpleNamespace(file=SimpleNamespace(src_path="Chapter 1/Section 1.2/Walkthrough/index.md"))
    config = cfg.from_parts(book.docs, book=book, profile=book.default_profile.id)
    rendered = deeper_hook.on_page_markdown(":::deeper two-solutions\n", page, config, None)
    assert 'class="deeper"' in rendered
    # One level up from the page's own directory to the section, then into Deeper:
    # the output path mirrors the source path, so the same relative link survives.
    assert 'href="../Deeper/two-solutions/index.md"' in rendered, rendered
    # The link is rewritten by the build, and stays relative: a page's output path
    # mirrors its source path.
    assert 'href="../deeper/two-solutions/"' in pipeline.rewrite_source_links(rendered)


def test_the_deeper_directive_refuses_a_slug_from_another_section():
    book = real_book()
    page = SimpleNamespace(file=SimpleNamespace(src_path="Chapter 1/Section 1.2/Walkthrough/index.md"))
    config = cfg.from_parts(book.docs, book=book, profile=book.default_profile.id)
    with pytest.raises(ValueError, match="no depth page 'singular-values' in Section 1.2"):
        deeper_hook.on_page_markdown(":::deeper singular-values\n", page, config, None)


def test_the_directive_is_left_alone_inside_a_code_fence():
    book = real_book()
    page = SimpleNamespace(file=SimpleNamespace(src_path="Chapter 1/Section 1.2/Walkthrough/index.md"))
    config = cfg.from_parts(book.docs, book=book, profile=book.default_profile.id)
    source = "```markdown\n:::deeper two-solutions\n```\n"
    assert deeper_hook.on_page_markdown(source, page, config, None) == source


# --- the book's own data and images -------------------------------------------


def test_a_books_data_and_images_reach_the_build(tmp_path):
    """A figure's payload is not a figure module, so it needed a home of its own.

    Every `.js` in a book's `figures/` directory must export `mount()`, so a data
    module cannot live there; and a photograph cannot be a figure at all, because a
    figure is drawn to follow the reader's bundle.
    """
    book = make_book(tmp_path)
    (book.docs / "assets" / "data").mkdir(parents=True)
    (book.docs / "assets" / "data" / "sweep.js").write_text("export const sweep = [];\n")
    (book.docs / "assets" / "images").mkdir(parents=True)
    (book.docs / "assets" / "images" / "corner.svg").write_text("<svg></svg>\n")

    out = tmp_path / "site"
    pipeline.copy_assets(book, out)

    assert (out / "assets" / "data" / "sweep.js").is_file()
    assert (out / "assets" / "images" / "corner.svg").is_file()


def test_a_book_without_data_or_images_gets_no_empty_directories(tmp_path):
    book = make_book(tmp_path)
    out = tmp_path / "site"
    pipeline.copy_assets(book, out)
    assert not (out / "assets" / "data").exists()
    assert not (out / "assets" / "images").exists()
