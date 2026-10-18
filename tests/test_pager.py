"""Previous/next, at the end of every page.

A reader who has finished a section should not have to go back to the contents to carry
on, and on a phone the contents are a drawer — the alternative is a scroll and a tap.

The two properties worth pinning are that the chain is the **reading order** and that it
cannot disagree with itself: the `rel="prev"`/`rel="next"` links in the head and the two
anchors in the body are rendered from one neighbour, and the order is the nav's, with
the glossary moved to the end because reference material is read after the course.
"""

from __future__ import annotations

import re

import pytest

from textbook import book as books
from textbook import pipeline


def build(book_id: str, out):
    target = books.book_by_id(book_id)
    pipeline.build(target.id, target.default_profile.id, out=out, index=False)
    return target


def pager(html: str) -> tuple[list[tuple[str, str, str]], list[str], list[str]]:
    """(anchors as (eyebrow, title, href), rel-link hrefs in head, page URLs)."""
    anchors = [
        (m.group(1), m.group(2), m.group(3))
        for m in re.finditer(
            r'<a class="pager__link pager__link--(?:prev|next)" href="([^"]*)" rel="(?:prev|next)">'
            r'<span class="pager__eyebrow">([^<]*)</span><span class="pager__title">([^<]*)</span>',
            html,
        )
    ]
    # The regex above captures href, eyebrow, title in DOM order; re-order for the caller.
    anchors = [(eyebrow, title, href) for href, eyebrow, title in anchors]
    head = re.findall(r'<link rel="(?:prev|next)" href="([^"]*)">', html)
    return anchors, head, []


# --- the eyebrows, in the reader's words ---------------------------------------


@pytest.mark.parametrize(
    "current, target, forward, expected",
    [
        ("index.md", "Chapter 1/index.md", True, "Next chapter"),
        ("Chapter 1/index.md", "index.md", False, "Contents"),
        (
            "Chapter 1/Section 1.1/Walkthrough/index.md",
            "Chapter 1/index.md",
            False,
            "Chapter contents",
        ),
        (
            "Chapter 1/Section 1.1/Walkthrough/index.md",
            "Chapter 1/Section 1.2/Walkthrough/index.md",
            True,
            "Next section",
        ),
        (
            "Chapter 1/Section 1.1/Walkthrough/index.md",
            "Chapter 1/Section 1.1/Guided problems/index.md",
            True,
            "Next page",
        ),
        (
            "Chapter 1/Section 1.5/Problems/index.md",
            "Chapter 1/Review/index.md",
            True,
            "Chapter review",
        ),
        (
            "Chapter 1/Review/index.md",
            "Chapter 2/index.md",
            True,
            "Next chapter",
        ),
        ("Chapter 1/Review/index.md", "Glossary/number.md", True, "Glossary"),
    ],
)
def test_the_eyebrow_names_the_move(current, target, forward, expected):
    assert pipeline._pager_eyebrow(current, target, forward) == expected


# --- the chain ----------------------------------------------------------------


def test_every_page_has_a_chain_and_it_ends(tmp_path):
    book = build("proofs", tmp_path)
    nav = pipeline.nav_for(book, frozenset(book.tier_codes))
    paths = pipeline.nav_paths(nav)
    order = pipeline.pager_for(paths, book)

    assert set(order) == set(paths), "a page with no entry would render no pager"
    first, last = paths[0], paths[-1]
    assert order[first][0] is None, "the first page has nothing before it"
    assert order[last][1] is None, "the last page has nothing after it"

    # The chain is symmetric: page i's next is page i+1, and page i+1's previous is
    # page i. Compared by **href**, because the eyebrows differ by design — the same
    # page is "Next chapter" from one side and "Previous chapter" from the other.
    for index, path in enumerate(paths):
        previous, following = order[path]
        if index:
            assert previous["href"] == pipeline.url_for(paths[index - 1])
            assert order[paths[index - 1]][1]["href"] == pipeline.url_for(path)
        else:
            assert previous is None
        if index + 1 < len(paths):
            assert following["href"] == pipeline.url_for(paths[index + 1])
            assert order[paths[index + 1]][0]["href"] == pipeline.url_for(path)
        else:
            assert following is None
        for neighbour in (previous, following):
            if neighbour:
                assert neighbour["title"].strip(), "a pager link with no label"


def test_the_chain_is_the_nav_order_with_the_glossary_last():
    """The sidebar lists the glossary first; the reading chain puts it after the course."""
    book = books.book_by_id("gcse-maths")
    paths = pipeline.nav_paths(pipeline.nav_for(book, frozenset(book.tier_codes)))
    assert any(p.startswith("Glossary/") for p in paths)

    order = pipeline.pager_for(paths, book)
    # Walking forward from the cover must not reach the glossary before a chapter.
    seen = []
    path = "index.md"
    while order[path][1] is not None:
        path = next(p for p in paths if pipeline.url_for(p) == order[path][1]["href"])
        seen.append(path)
        if len(seen) > 5:
            break
    assert not any(p.startswith("Glossary/") for p in seen), seen

    # And the glossary is the tail of the chain.
    last = [p for p in paths if p.startswith("Glossary/")][-1]
    assert order[last][1] is None


# --- the page -----------------------------------------------------------------


def test_the_body_and_the_head_agree(tmp_path):
    build("proofs", tmp_path)
    page = tmp_path / "arithmetic-series" / "index.html"
    html = page.read_text(encoding="utf-8")

    anchors, head, _ = pager(html)
    assert len(anchors) == 2, "a middle page has both neighbours"
    assert [href for _, _, href in anchors] == head, (
        "the anchors and the rel links must be the same two hrefs, in the same order"
    )

    # `rel` is what a crawler and an extension read; the anchors are what a reader taps.
    assert 'rel="prev"' in html and 'rel="next"' in html
    assert '<link rel="prev" href=' in html and '<link rel="next" href=' in html


def test_the_pager_is_outside_the_search_index(tmp_path):
    """Otherwise every Pagefind excerpt quotes "Next section"."""
    build("proofs", tmp_path)
    html = (tmp_path / "arithmetic-series" / "index.html").read_text(encoding="utf-8")
    start = html.index('class="pager"')
    assert 'data-pagefind-ignore' in html[start - 200 : start + 40]


def test_a_first_page_keeps_one_target_and_a_spacer(tmp_path):
    build("proofs", tmp_path)
    html = (tmp_path / "index.html").read_text(encoding="utf-8")
    anchors, head, _ = pager(html)
    assert len(anchors) == 1, "the first page has a next and no previous"
    assert len(head) == 1
    assert 'class="pager__spacer"' in html, (
        "without the spacer the lone next link drifts into the previous position"
    )


def test_no_pager_outside_a_book(tmp_path):
    """The 404 is not in the chain, and a pager on it would link into one."""
    build("proofs", tmp_path)
    assert 'class="pager"' not in (tmp_path / "404.html").read_text(encoding="utf-8")
