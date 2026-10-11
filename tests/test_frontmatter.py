"""Strict front matter, and the tier invariant it protects.

The bug this file exists for: a page whose front matter does not parse has no
`tier`, so the Foundation filter treats it as Foundation content and ships it to
Foundation readers. `mkdocs build --strict` exited 0 throughout. Six pages of the
first book shipped that way — three of them a Higher-only section.

The corpus-wide tests at the bottom are the ones that would have caught it without
anyone knowing the cause.
"""

from __future__ import annotations

import pytest

from textbook import frontmatter
from textbook.book import discover_books

BOOKS = discover_books()

# Sections whose pages disagree with curriculum.yaml about tier.
#
# AGENTS.md names curriculum.yaml the source of truth for tier, and every one of
# these is a Higher-only topic carrying a Higher-only DfE reference (G17, G18,
# G21, G24, G25) — so the *pages* look wrong, not the curriculum. But changing a
# tier tag changes which students are shown which content, and the repository's
# own rule is to check every F/H tag against the AQA 8300 tier columns first.
# That is a content decision, so it is recorded here rather than guessed at.
#
# While these stand, the tier filter reads the page, so seven Higher-only
# sections are built into the Foundation output — reachable by URL, absent from
# the navigation. Exactly the failure mode of the unparsable front matter above.
KNOWN_TIER_DISAGREEMENTS = {"5.4", "6.5", "19.3", "19.5", "20.4", "22.1", "22.2"}

# An unquoted scalar containing ': ' — valid-looking, invalid YAML. This is the
# exact shape that shipped: `title: 11.2 Gradient and intercept: y = mx + c`.
BAD = '---\ntitle: 11.2 Gradient and intercept: y = mx + c\ntier: H\n---\n\n# Page\n'


# --- split --------------------------------------------------------------------


def test_split_returns_metadata_and_body():
    meta, body = frontmatter.split("---\ntitle: Hi\ntier: H\n---\n\n# Page\n")
    assert meta == {"title": "Hi", "tier": "H"}
    assert body.lstrip().startswith("# Page")


def test_split_without_front_matter_is_not_an_error():
    meta, body = frontmatter.split("# No front matter\n")
    assert meta == {}
    assert body == "# No front matter\n"


def test_split_ignores_a_non_mapping_block():
    meta, _ = frontmatter.split("---\n- a\n- b\n---\n\nText\n")
    assert meta == {}


def test_split_raises_on_invalid_yaml():
    with pytest.raises(frontmatter.FrontMatterError):
        frontmatter.split(BAD, "Chapter 11/Section 11.2/Walkthrough/index.md")


def test_error_names_the_file_and_the_line():
    with pytest.raises(frontmatter.FrontMatterError) as err:
        frontmatter.split(BAD, "Chapter 11/Section 11.2/Walkthrough/index.md")
    message = str(err.value)
    assert "Chapter 11/Section 11.2/Walkthrough/index.md" in message
    assert "line 2" in message
    assert err.value.path.name == "index.md"


def test_a_quoted_title_with_a_colon_parses():
    meta, _ = frontmatter.split(frontmatter.BAD if False else '---\ntitle: "a: b"\ntier: H\n---\n')
    assert meta == {"title": "a: b", "tier": "H"}


# --- read ---------------------------------------------------------------------


def test_read_returns_front_matter_from_a_file(tmp_path):
    page = tmp_path / "index.md"
    page.write_text("---\ntier: H\n---\n\nText\n", encoding="utf-8")
    meta, body = frontmatter.read(page)
    assert meta["tier"] == "H"
    assert body.strip() == "Text"


def test_read_ignores_a_non_markdown_file(tmp_path):
    """The tier filter walks every file, images and fonts included."""
    image = tmp_path / "figure.png"
    image.write_bytes(b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR")
    assert frontmatter.read(image) == ({}, "")


def test_read_ignores_undecodable_bytes(tmp_path):
    blob = tmp_path / "weird.md"
    blob.write_bytes(b"\xff\xfe\x00\x01")
    assert frontmatter.read(blob) == ({}, "")


def test_read_ignores_a_missing_file(tmp_path):
    assert frontmatter.read(tmp_path / "absent.md") == ({}, "")


def test_read_raises_for_a_bad_markdown_page(tmp_path):
    page = tmp_path / "index.md"
    page.write_text(BAD, encoding="utf-8")
    with pytest.raises(frontmatter.FrontMatterError):
        frontmatter.read(page)


# --- the corpus ---------------------------------------------------------------


def test_every_page_in_every_book_parses():
    """The regression guard. No page may ship unparsable front matter."""
    failures = []
    for book in BOOKS:
        for path in sorted(book.docs.rglob("*.md")):
            try:
                frontmatter.read(path)
            except frontmatter.FrontMatterError as err:
                failures.append(str(err))
    assert failures == [], "\n".join(failures)


def test_every_page_declares_the_tier_its_curriculum_gives_it():
    """The invariant the bug broke.

    A section is marked Foundation and Higher (``F``) or Higher only (``H``) in
    curriculum.yaml, and its pages repeat that in front matter. The tier filter
    trusts the page. When the two disagree — which is what an unparsable block
    produces, since the page then declares nothing — a Higher-only section is
    built into Foundation output and reaches Foundation readers by URL.

    Known disagreements are listed rather than ignored, so a *new* one fails the
    suite while the existing ones stay visible.
    """
    disagreements = []
    for book in BOOKS:
        for chapter in book.chapters:
            for section in chapter["sections"]:
                folder = book.docs / f"Chapter {chapter['id']}" / f"Section {section['id']}"
                for page in sorted(folder.glob("*/index.md")):
                    meta, _ = frontmatter.read(page)
                    declared = meta.get("tier")
                    if declared != section["tier"]:
                        disagreements.append(
                            (section["id"], page.relative_to(book.docs).as_posix(), declared)
                        )

    unexpected = [d for d in disagreements if d[0] not in KNOWN_TIER_DISAGREEMENTS]
    assert unexpected == [], "new tier disagreements with curriculum.yaml:\n" + "\n".join(
        f"  {path}: page says tier={declared!r}" for _, path, declared in unexpected
    )
    # And the known list may not rot: if one is fixed, drop it from the set.
    found = {section for section, _, _ in disagreements}
    assert found == KNOWN_TIER_DISAGREEMENTS, (
        f"stale allowlist entries: {sorted(KNOWN_TIER_DISAGREEMENTS - found)}"
    )


def test_higher_only_sections_are_marked_in_their_pages():
    """A weaker sanity check: the book really does have Higher-only content."""
    higher = [
        (chapter["id"], section["id"])
        for book in BOOKS
        for chapter in book.chapters
        for section in chapter["sections"]
        if section["tier"] == "H"
    ]
    assert higher, "expected at least one Higher-only section, or the filter is untested"
