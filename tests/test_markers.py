"""The marker transport is tested, not ad-hoc: fences are respected, expansion is
deterministic, and every marker in every book resolves."""

from __future__ import annotations

import re
from types import SimpleNamespace

import pytest

from textbook import config as cfg
from textbook.book import discover_books
from textbook.hooks import _fences, figures, problems

BOOKS = discover_books()


def build_config(book) -> dict:
    """The config MkDocs hands to a hook, for a real book."""
    return {
        "docs_dir": str(book.docs),
        "extra": {
            "book": book.id,
            "book_dir": book.rel(book.root),
            "tier_profile": book.default_profile.tier_filter,
        },
    }


class FakePage:
    file = SimpleNamespace(src_path="test.md")
    url = "test/"


def test_fence_helper_leaves_code_verbatim():
    text = ":::answers a\n\n```markdown\n:::answers x\n```\n"
    transformed = _fences.transform_outside_fences(
        text, lambda segment: segment.replace(":::answers", "EXPANDED")
    )
    assert transformed.count("EXPANDED") == 1  # the prose marker only
    assert ":::answers x" in transformed  # the fenced marker is untouched


def test_problems_marker_expands_outside_a_fence():
    config = build_config(BOOKS[0])
    out = problems.on_page_markdown(
        ":::answers chapter-01-practice-1.1\n", FakePage(), config, None
    )
    assert "<details" in out
    assert "**Answer:**" in out


def test_problems_list_is_rendered_from_the_bank():
    config = build_config(BOOKS[0])
    out = problems.on_page_markdown(
        ":::problems chapter-01-practice-1.1\n", FakePage(), config, None
    )
    assert "1. " in out
    assert "**H**" in out  # the Higher-only items are marked


def test_problems_and_answers_marker_are_ignored_inside_a_fence():
    config = build_config(BOOKS[0])
    source = "```markdown\n:::problems chapter-01-practice-1.1\n:::answers chapter-01-practice-1.1\n```\n"
    assert problems.on_page_markdown(source, FakePage(), config, None) == source


def test_unknown_bank_fails_loudly():
    config = build_config(BOOKS[0])
    with pytest.raises(ValueError):
        problems.on_page_markdown(":::answers does-not-exist\n", FakePage(), config, None)


def test_unknown_figure_fails_loudly():
    config = build_config(BOOKS[0])
    with pytest.raises(ValueError):
        figures.on_page_markdown(":::figure not-a-figure\n", FakePage(), config, None)


@pytest.mark.parametrize("book", BOOKS, ids=lambda book: book.id)
def test_every_marker_in_the_book_resolves(book):
    figure = re.compile(r"^:::[ \t]*figure[ \t]+([a-z0-9-]+)", re.M)
    answers = re.compile(r"^:::[ \t]*answers[ \t]+([a-z0-9._-]+)", re.M)
    problems_marker = re.compile(r"^:::[ \t]*problems[ \t]+([a-z0-9._-]+)", re.M)

    banks: set[str] = set()
    slugs: set[str] = set()
    for path in book.docs.rglob("*.md"):
        prose: list[str] = []
        _fences.transform_outside_fences(
            path.read_text(encoding="utf-8"), lambda s: prose.append(s) or s
        )
        text = "\n".join(prose)
        banks.update(answers.findall(text))
        banks.update(problems_marker.findall(text))
        slugs.update(figure.findall(text))

    for bank in banks:
        assert (book.banks / f"{bank}.yaml").exists(), f"missing bank for :::answers {bank}"
    for slug in slugs:
        assert (book.docs / "assets" / "figures" / f"{slug}.js").is_file(), (
            f"missing figure module for {slug}"
        )


@pytest.mark.parametrize("book", BOOKS, ids=lambda book: book.id)
def test_no_adjacent_display_math_blocks(book):
    """pymdownx.arithmatex reads two adjacent $$ blocks as one, so they must be
    separated by a blank line (or prose). This lint keeps the book renderable."""
    one_line = re.compile(r"^\s*\$\$.*\$\$\s*$")
    offenders = []
    for path in book.docs.rglob("*.md"):
        lines = path.read_text(encoding="utf-8").splitlines()
        in_block = False
        for i, line in enumerate(lines):
            stripped = line.strip()
            nxt = lines[i + 1].strip() if i + 1 < len(lines) else ""
            if stripped == "$$":
                if in_block:
                    in_block = False
                    if nxt.startswith("$$"):
                        offenders.append(f"{path}:{i + 1}")
                else:
                    in_block = True
            elif not in_block and one_line.match(line) and nxt.startswith("$$"):
                offenders.append(f"{path}:{i + 1}")
    assert not offenders, "adjacent $$ blocks (add a blank line): " + ", ".join(offenders)


@pytest.mark.parametrize("book", BOOKS, ids=lambda book: book.id)
def test_no_control_characters_in_content(book):
    """Agents can write a literal control character where a LaTeX escape was
    meant (\\a -> BEL). It corrupts maths silently, so fail loudly."""
    offenders = []
    for path in list(book.docs.rglob("*.md")):
        text = path.read_text(encoding="utf-8")
        if any(ord(c) < 32 and c not in "\n\t" for c in text):
            offenders.append(str(path))
    assert not offenders, "control characters in markdown: " + ", ".join(offenders)


def test_hook_paths_come_from_the_config_not_the_filesystem():
    """A hook must resolve paths through the build's config, so it works for any
    book. Guard against a reintroduced ``__file__``-relative guess."""
    config = build_config(BOOKS[0])
    assert cfg.docs_dir(config) == BOOKS[0].docs
    assert cfg.banks_dir(config) == BOOKS[0].banks
    assert cfg.curriculum_path(config) == BOOKS[0].curriculum
    assert cfg.profile(config) == BOOKS[0].default_profile.tier_filter
