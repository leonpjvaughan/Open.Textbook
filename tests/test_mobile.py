"""The shell must not be wider than the screen it is on.

The reader's report was a settings button they could not reach on Android. Two
causes, both invisible to a desktop browser and to every other check in the gate:
a wide table and a wide display equation widened the *page* instead of scrolling
inside their column, and the masthead — three controls beside a book title — ran
off the right edge at 360px.

`tools check-mobile` measures the real thing in a browser, five widths
across three routes, and runs in the `preview` CI job. These are the fast,
browser-free assertions that the rules it depends on are still there, so deleting
one fails in the main gate too rather than only in the browser job.
"""

from __future__ import annotations

from textbook.book import repo_root

SHELL_CSS = repo_root() / "engine" / "src" / "textbook" / "css" / "shell.css"
PAGE = repo_root() / "engine" / "src" / "textbook" / "templates" / "page.html"


def shell() -> str:
    return SHELL_CSS.read_text(encoding="utf-8")


def test_a_wide_table_scrolls_instead_of_widening_the_page():
    css = shell()
    assert ".table-scroll" in css, (
        "nothing contains a wide table, so it widens the page and pushes the "
        "masthead controls off the right edge"
    )
    block = css[css.index(".table-scroll") :]
    assert "overflow-x: auto" in block[:200], "the table wrapper does not scroll"


def test_a_wide_display_equation_scrolls_too():
    """MathML has no line-breaking, so a wide equation cannot wrap.

    Measured at 360px: the widest equation on a Learn page was 360px inside a
    328px column, which made the document 16px wide.
    """
    css = shell()
    assert 'math[display="block"]' in css, "a wide display equation widens the page"
    block = css[css.index('math[display="block"]') :]
    assert "overflow-x: auto" in block[:200], "the equation is not given a scroll container"


def test_the_masthead_has_phone_width_rules():
    """Three controls beside a book title do not fit in 360px.

    The search moves to its own row; without this the settings trigger — the
    control a reader needs to change the theme back — sits past the edge.
    """
    css = shell()
    narrow = css[css.index("@media (max-width: 48rem)") :]
    assert "flex-wrap: wrap" in narrow[:400], "the masthead cannot wrap on a phone"
    assert ".search" in narrow[:600], "the search is not moved to its own row"


def test_the_search_is_a_sibling_of_the_actions_not_a_child():
    """A flex item cannot escape its parent to take a row of its own.

    This is the structural half of the phone-width fix: the CSS above only works
    because the search is not nested inside `.masthead__actions`.
    """
    page = PAGE.read_text(encoding="utf-8")
    actions = page[page.index('class="masthead__actions"') :]
    actions = actions[: actions.index("</div>")]
    assert "search-input" not in actions, (
        "the search is back inside the actions, so it cannot take its own row"
    )
    assert 'class="search"' in page
