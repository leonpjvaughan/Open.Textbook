"""Motion is an enhancement, and it may never be the way content arrives.

Two things move in the shell. A cross-document view transition carries the masthead
and the page title from one book page to the next, and a disclosure grows to its own
height instead of appearing at it. Neither is Baseline and neither has a fallback that
hides content, so the browser that does not know them must follow the link and open
the disclosure exactly as it did before.

`scripts/preview-themes.sh` measures the rendered result in a browser; these are the
fast, browser-free assertions that the rules the two behaviours depend on are still
there, and still inside the `no-preference` query that keeps a reader who asked for
less motion out of them.
"""

from __future__ import annotations

import re

from textbook.book import repo_root

SHELL_CSS = repo_root() / "engine" / "src" / "textbook" / "css" / "shell.css"
PORTAL_CSS = repo_root() / "assets" / "stylesheets" / "portal.css"
EXTRA_CSS = repo_root() / "assets" / "stylesheets" / "extra.css"
PAGE = repo_root() / "engine" / "src" / "textbook" / "templates" / "page.html"

NO_PREFERENCE = "@media (prefers-reduced-motion: no-preference)"
INTRINSIC = "@supports (interpolate-size: allow-keywords)"

COMMENT = re.compile(r"/\*.*?\*/", re.S)


def sheet(path) -> str:
    return COMMENT.sub("", path.read_text(encoding="utf-8"))


def blocks(css: str):
    """Every block in a stylesheet, as ``(prelude, body, start, end)``.

    Comments are already gone, so a brace in prose cannot be mistaken for a rule. The
    prelude is the text between the previous block boundary and the opening brace; the
    offsets are the block's own body, which is what a containment test needs.
    """
    stack: list[tuple[str, int]] = []
    for index, char in enumerate(css):
        if char == "{":
            boundary = max(
                css.rfind("}", 0, index),
                css.rfind(";", 0, index),
                css.rfind("{", 0, index),
            )
            stack.append((css[boundary + 1 : index].strip(), index))
        elif char == "}" and stack:
            prelude, opened = stack.pop()
            yield prelude, css[opened + 1 : index], opened, index


def inside_a_no_preference_block(css: str, needle: str) -> bool:
    """Is this text in the body of a `prefers-reduced-motion: no-preference` block?"""
    for prelude, body, start, end in blocks(css):
        if prelude == NO_PREFERENCE and needle in body:
            return True
    return False


def test_both_page_families_opt_in_to_cross_document_transitions():
    """A transition needs both ends enrolled, or the browser runs none at all."""
    for path in (SHELL_CSS, PORTAL_CSS):
        css = sheet(path)
        assert inside_a_no_preference_block(css, "@view-transition"), (
            f"{path} does not opt in to view transitions inside the no-preference query"
        )
        block = next(
            body
            for prelude, body, _, _ in blocks(css)
            if prelude == NO_PREFERENCE and "@view-transition" in body
        )
        assert "navigation: auto" in block, "the transition covers no navigation"
        assert "navigation: auto" in css, "the opt-in lost its navigation type"


def test_the_masthead_and_the_title_are_named_for_the_transition():
    """The two objects a reader keeps across a navigation, named so they move."""
    css = sheet(SHELL_CSS)
    assert "view-transition-name: site-masthead" in css
    assert "view-transition-name: page-title" in css


def test_the_portal_title_has_its_own_name():
    """A hero and a section title are different objects, and are not morphed."""
    portal = sheet(PORTAL_CSS)
    assert "view-transition-name: portal-title" in portal
    assert "page-title" not in portal
    assert "site-masthead" not in portal


def test_every_view_transition_name_is_unique_per_page():
    """A duplicate name makes the browser skip the whole transition.

    The books name the bar and the content heading; the portal names the heading inside
    its masthead and not the masthead itself, because a name inside a name paints the
    child twice while the transition runs.
    """
    names = re.findall(r"view-transition-name:\s*([A-Za-z_-][\w-]*)", sheet(SHELL_CSS))
    assert sorted(names) == ["page-title", "site-masthead"]

    portal = re.findall(r"view-transition-name:\s*([A-Za-z_-][\w-]*)", sheet(PORTAL_CSS))
    assert portal == ["portal-title"]

    assert 'class="masthead"' in PAGE.read_text(encoding="utf-8")


def test_a_disclosure_animates_its_own_height():
    """`auto` is only animatable with the opt-in, and `calc-size` repeats it."""
    css = sheet(EXTRA_CSS)
    assert inside_a_no_preference_block(css, INTRINSIC), (
        "the height animation is not inside the no-preference query"
    )
    media = next(
        body
        for prelude, body, _, _ in blocks(css)
        if prelude == NO_PREFERENCE and INTRINSIC in body
    )
    assert "::details-content" in media
    assert "interpolate-size: allow-keywords" in media
    assert "block-size: 0" in media
    assert "block-size: calc-size(auto, size)" in media


def test_the_disclosure_rules_are_not_outside_the_query():
    """A transition on `::details-content` outside the query would still move."""
    css = sheet(EXTRA_CSS)
    guarded = [
        (start, end)
        for prelude, body, start, end in blocks(css)
        if prelude == NO_PREFERENCE and INTRINSIC in body
    ]
    assert guarded, "no guarded details block"
    for match in re.finditer(r"::details-content", css):
        assert any(start < match.start() < end for start, end in guarded), (
            "a details-content rule sits outside the reduced-motion query"
        )


def test_the_cascade_is_resolved_before_the_first_reveal():
    """Chromium 153 aborts the opt-in when the page reveals before styles resolve.

    The line is a no-op everywhere: it asks for one computed value and discards it. It
    has to be classic and inline, and after the stylesheets, because a deferred or
    module script runs after the first chance to reveal. Remove it, and its test, when
    the browser no longer needs it.
    """
    guard = "<script>getComputedStyle(document.documentElement).color;</script>"
    for path, after in (
        (PAGE, "$stylesheets"),
        (
            repo_root() / "engine" / "src" / "textbook" / "templates" / "portal.html",
            '<link rel="stylesheet" href="$settings_css">',
        ),
        (
            repo_root() / "engine" / "src" / "textbook" / "templates" / "portal_page.html",
            '<link rel="stylesheet" href="$settings_css">',
        ),
    ):
        html = path.read_text(encoding="utf-8")
        assert guard in html, f"{path} does not resolve the cascade before reveal"
        assert html.index(guard) > html.index(after), (
            f"{path} resolves the cascade before its stylesheets are linked"
        )


def test_the_drawer_is_not_height_animated():
    """The phone script closes the drawer on arrival; an animation there is a shift.

    A closed drawer is still the platform's own disclosure: it opens and closes with
    scripting off, and the markup keeps it `open` so a reader without scripting has
    their navigation.
    """
    css = sheet(EXTRA_CSS)
    assert ".nav-drawer::details-content" not in css
    assert '<details class="nav-drawer" open>' in PAGE.read_text(encoding="utf-8"), (
        "a reader with scripting off must still be given the navigation"
    )
