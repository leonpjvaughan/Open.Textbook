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

import pytest

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


def test_the_masthead_names_the_section_a_page_is_in():
    """T1: a reader who lands from a search result could not tell the section.

    The masthead said the book and nothing else, so 1.2's Learn page and 1.5's
    were indistinguishable in the one piece of chrome every page carries. The
    label comes from the page's own front matter, and a page without it gets no
    element rather than an empty one.
    """
    from textbook import pipeline

    assert pipeline.masthead_section(
        {"section": "1.2", "section_title": "One rigid triangle"}
    ) == '<span class="masthead__section">1.2 One rigid triangle</span>'
    assert pipeline.masthead_section({"title": "Chapter 1"}) == ""
    assert pipeline.masthead_section({"section": "", "section_title": ""}) == ""
    # The template puts it inside the brand's link, beside the book's name.
    page = PAGE.read_text(encoding="utf-8")
    brand = page[page.index('class="masthead__brand"') :]
    assert "$masthead_section" in brand[:120]
    assert ".masthead__section" in shell()


# --- a table wider than a phone ------------------------------------------------
#
# `check-mobile` fails when a *page* is wider than the screen, and a table cannot make
# a page wider: `wrap_tables` puts every one in a `.table-scroll`, so the check is
# satisfied by the wrapper that hides the problem. A table whose last column sits past
# the right edge therefore read as a pass — 18 tables in the two reference books, the
# worst 172px over, and §1.5's fifth column at x = 404 in a 390 viewport.


def test_the_check_measures_a_table_against_its_container():
    """The rule, in the source, so deleting it fails in the main gate.

    The browser-free half of the pair below: `check-mobile` must compare a table's
    width with its wrapper's, exempt `table--cards`, and say the overflow in pixels.
    """
    source = (repo_root() / "tools" / "src" / "commands" / "check-mobile.ts").read_text(
        encoding="utf-8"
    )
    assert 'table.classList.contains("table--cards")' in source, (
        "the table pass no longer exempts a card table, which has no columns to lose"
    )
    assert 'table.closest(".table-scroll")' in source, (
        "the table pass no longer measures against its scroll container"
    )
    assert "wider than its container at 390px" in source, (
        "the finding no longer says how far past the container the table is"
    )


def test_a_table_40px_too_wide_fails_the_check(tmp_path):
    """And the behaviour: a planted table, one book's wrapper, and a non-zero exit.

    A browser test, skipped where Playwright is absent — the audit is its own job. The
    page is 358px of container with a 400px table inside it, which is the shape the
    collection had.
    """
    import json
    import os
    import shutil
    import subprocess

    candidates = (
        "playwright",
        "/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright",
    )
    if shutil.which("node") is None:
        pytest.skip("node is not on PATH; the mobile check cannot run")
    if not any(
        subprocess.run(
            ["node", "-e", f"require({json.dumps(c)})"],
            capture_output=True,
            check=False,
            env={**os.environ, "PLAYWRIGHT_PATH": c},
        ).returncode
        == 0
        for c in candidates
    ):
        pytest.skip("playwright is not installed; set PLAYWRIGHT_PATH")

    site = tmp_path / "site"
    site.mkdir()
    (site / "index.html").write_text(
        "<!doctype html><html><body><main>"
        '<div class="table-scroll" style="width:358px;overflow:auto">'
        '<table style="width:400px"><thead><tr><th>a wide heading</th></tr></thead>'
        "<tbody><tr><td>one</td></tr></tbody></table></div>"
        "</main></body></html>",
        encoding="utf-8",
    )
    tools = repo_root() / "tools" / "dist" / "cli.js"
    assert tools.is_file(), "the tools CLI is missing; run `npm run build`"
    result = subprocess.run(
        ["node", str(tools), "check-mobile", str(site)],
        capture_output=True,
        text=True,
        check=False,
        cwd=repo_root(),
    )
    assert result.returncode != 0, result.stdout[-1500:]
    assert "wider than its container at 390px" in result.stdout, result.stdout[-1500:]
