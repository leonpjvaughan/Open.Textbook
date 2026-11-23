"""The chapter opener: a quiet kicker, the chapter problem as a pull quote, and
the first section one click away.

The overview page is ordinary Markdown, so the shape is added to the rendered HTML
by `hooks/opener.py`. These tests pin the three promises the reader is given:

* the chapter number is a kicker, and the heading keeps its ``id``, so a deep link
  written before the change still lands;
* the chapter problem is not one heading among six but the page's pull quote;
* the first section's link is under the title, and it is a plain link — a reader
  with scripting off sees the problem and can start the chapter.

The end-to-end case lives in `test_pipeline.py`, on the one real chapter it builds.
"""

from __future__ import annotations

from types import SimpleNamespace

import pytest

from textbook.hooks import opener

CHAPTER = "Chapter 1/index.md"

CONTENT = """<h1 id="chapter-1-number-skills">Chapter 1: Number skills</h1>
<h2 id="by-the-end-of-this-chapter-you-will-be-able-to">By the end of this chapter you will be able to</h2>
<p>You will be able to round.</p>
<h2 id="the-chapter-problem-the-school-fair-stall">The chapter problem: the school-fair stall</h2>
<p>You are running the drinks-and-cakes stall.</p>
<blockquote>
<p>First contact: estimate before you calculate.</p>
</blockquote>
<details><summary>If you are not sure where to start</summary>
<p>Round each price.</p>
</details>
<h2 id="where-it-is-used">Where it is used</h2>
<p>Cash handling.</p>
"""


def page(path: str = CHAPTER):
    return SimpleNamespace(file=SimpleNamespace(src_path=path))


def opened(markup: str = CONTENT, path: str = CHAPTER) -> str:
    return opener.on_page_content(markup, page(path), {}, [])




def test_the_chapter_number_becomes_a_kicker_inside_the_heading():
    """The span is inside the ``h1``: the number stays part of the heading's text,
    so a screen reader reads "Chapter 1 Number skills" as one title, and only the
    paint moves."""
    html = opened()
    assert '<h1 id="chapter-1-number-skills"><span class="chapter-kicker">Chapter 1</span>Number skills</h1>' in html


def test_the_heading_id_is_not_rewritten():
    """Every inbound deep link is built from the whole title, so the id is the one
    thing this hook must not touch."""
    html = opened()
    assert 'id="chapter-1-number-skills"' in html
    assert html.count('<h1') == 1


def test_a_heading_without_a_number_is_left_alone():
    html = opened('<h1 id="contents">Contents</h1>\n<p>Nothing to number.</p>\n')
    assert "chapter-kicker" not in html




def test_the_chapter_problem_is_wrapped_in_a_section():
    html = opened()
    assert '<section class="chapter-problem" aria-labelledby="the-chapter-problem-the-school-fair-stall">' in html
    assert '<div class="chapter-problem__quote">' in html
    start = html.index('class="chapter-problem"')
    end = html.index("</section>", start)
    body = html[start:end]
    assert "You are running the drinks-and-cakes stall." in body
    assert "Where it is used" in html[end:]
    assert "Where it is used" not in body


def test_the_reviews_solved_problem_is_not_the_opener():
    """A Review page carries "The chapter problem, solved". It is a different
    section with a different job, and it must not be styled as the opener."""
    html = opened(
        '<h1 id="review">Review</h1>\n'
        '<h2 id="the-chapter-problem-solved">The chapter problem, solved</h2>\n'
        "<p>Here is the answer.</p>\n"
    )
    assert 'class="chapter-problem"' not in html


def test_a_page_without_a_problem_heading_is_not_wrapped():
    html = opened('<h1 id="chapter-2-x">Chapter 2: Algebra</h1>\n<p>Nothing yet.</p>\n')
    assert "chapter-problem" not in html




FOLLOWING = {
    "href": "chapter-1/section-1.1/learn/",
    "title": "1.1 Place value and ordering numbers — Learn",
    "eyebrow": "Next section",
}


def test_the_first_section_link_carries_the_prefix_and_drops_the_page_kind():
    html = opener.add_action(CONTENT, FOLLOWING, "../")
    assert '<p class="chapter-start">' in html
    assert '<a href="../chapter-1/section-1.1/learn/">1.1 Place value and ordering numbers</a>' in html


def test_the_action_sits_under_the_title():
    html = opener.add_action(CONTENT, FOLLOWING)
    assert html.index("</h1>") < html.index('class="chapter-start"') < html.index(
        'id="the-chapter-problem'
    )


def test_a_review_is_not_offered_as_a_first_section():
    review = dict(FOLLOWING, eyebrow="Chapter review", title="Review")
    assert "chapter-start" not in opener.add_action(CONTENT, review)


def test_a_page_with_no_neighbour_gets_no_action():
    assert "chapter-start" not in opener.add_action(CONTENT, None)




def test_the_problem_and_the_action_are_static_markup():
    """Nothing is revealed by a script: the action is an ordinary ``<a>`` and the
    problem is in the served HTML."""
    html = opener.add_action(opened(), FOLLOWING)
    assert "<script" not in html
    assert " hidden" not in html
    start = html.index('class="chapter-start"')
    assert "<a href=" in html[start : start + 200]


def test_a_section_page_is_not_an_opener():
    """The hook is keyed on the chapter's own page, not on its chapter number."""
    html = opened(CONTENT, "Chapter 1/Section 1.1/Walkthrough/index.md")
    assert html == CONTENT


@pytest.mark.parametrize(
    "path",
    [
        "Chapter 1/index.md",
        "Chapter 12/index.md",
    ],
)
def test_every_chapter_own_page_is_an_opener(path):
    assert opener.is_chapter_index(path)
