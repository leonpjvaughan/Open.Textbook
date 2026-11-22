"""Where the reader is: the current section, how far through, and the drawer.

Three things on every page tell a reader where they are, and none of them said
anything before this. "On this page" listed the sections and never marked the one on
screen; a 4,000px Learn page gave no sense of how much was left; and at 390px the
drawer opened at the top of a 25-chapter book, so the chapter the reader was in could
be a scroll and 300 links away.

These are the browser-free half. They pin the parts a stylesheet or a template owns —
the markup the script needs, the state that paints the mark, the feature gates, and
the reduced-motion rule — so deleting one fails in the ordinary gate rather than only
in the browser sweep. What each one looks like when it is running is measured in
`test_navigation_browser.py`.
"""

from __future__ import annotations

import re

from textbook.book import repo_root
from textbook.hooks import contents

ROOT = repo_root()
SHELL = ROOT / "engine" / "src" / "textbook" / "css" / "shell.css"
EXTRA = ROOT / "assets" / "stylesheets" / "extra.css"
PAGE = ROOT / "engine" / "src" / "textbook" / "templates" / "page.html"


def css(path) -> str:
    return path.read_text(encoding="utf-8")


def block(source: str, selector: str) -> str:
    """The declarations of the first rule whose selector is exactly this."""
    match = re.search(rf"(?m)^\s*{re.escape(selector)}\s*\{{(.*?)\}}", source, re.S)
    assert match, f"no rule for {selector}"
    return match.group(1)


# --- the list of sections states where the reader is ---------------------------


def test_the_contents_list_declares_itself_a_scrollspy():
    """The hook's half of the contract, so the script enhances only a list that asked.

    `data-scrollspy` is on the built nav and not on the name index: the two are the same
    shape — a `nav` of links to anchors — but only one of them tracks a position.
    """
    body = "".join(f'<h2 id="s{i}">Section {i}</h2><p>text</p>' for i in range(5))
    nav = contents.render(f'<p>Intro.</p>{body}')
    assert 'class="contents" data-scrollspy aria-label="On this page"' in nav
    assert nav.count("<a href=\"#s0\">Section 0</a>") == 1
    assert "data-scrollspy" not in contents.render_methods(body)


def test_the_native_scrollspy_is_enabled_on_the_list():
    """`scroll-target-group` is what makes the platform mark the current link."""
    assert re.search(
        r"\.md-typeset \.contents \{[^}]*scroll-target-group:\s*auto", css(EXTRA), re.S
    ), "the list is not a scroll target group, so nothing marks the current section"


def test_the_mark_survives_a_browser_without_the_native_state():
    """One rule, both sources: `:is()` drops an unknown pseudo-class, a list would not.

    `a:target-current, a.contents__current` is invalid as a whole in a browser that
    knows neither, which would leave the fallback's class unpainted as well.
    """
    source = css(EXTRA)
    assert "a:is(:target-current, .contents__current)" in source, (
        "the current-section style is not shared between the native state and the "
        "fallback class"
    )


def test_the_mark_is_not_colour_alone_and_cannot_reflow_the_list():
    """An underline and a gutter bar, and no weight change.

    Weight was the obvious cue and the wrong one: a bolder label is wider, so the marked
    item can wrap to a second line and push the whole article down on every section
    boundary. The bar is drawn in a gutter the margin gives back, so the content box
    keeps its width.
    """
    source = css(EXTRA)
    link = block(source, ".md-typeset .contents__list a:is(:target-current, .contents__current)")
    assert re.search(r"text-decoration:\s*underline", link)
    assert re.search(r"text-decoration-thickness:\s*2px", link), (
        "the mark is a colour change with the default hairline underline"
    )
    assert "font-weight" not in link, (
        "the mark changes weight, which rewraps the label and shifts the article"
    )
    assert re.search(
        r"\.md-typeset \.contents__list li:has\(a:is\(:target-current, \.contents__current\)\)"
        r"\s*\{[^}]*box-shadow:\s*inset 3px 0 0",
        source,
        re.S,
    ), "the mark has no shape a reader can see without colour"


def test_the_script_mirrors_the_visual_state_into_the_accessibility_tree():
    """`:target-current` is visual only, so `aria-current` is mandatory, not a bonus."""
    page = PAGE.read_text(encoding="utf-8")
    assert 'aria-current", "location"' in page, (
        "the current section is painted and never announced"
    )
    assert 'CSS.supports("scroll-target-group: auto")' in page, (
        "the script does not ask whether the platform can do this itself"
    )
    assert "new IntersectionObserver" in page, "there is no fallback where it cannot"
    # Nothing is hidden and no link is disabled with scripting off: the whole state is
    # an attribute on a link that already works.
    scrollspy = page[page.index("[data-scrollspy]") :]
    scrollspy = scrollspy[: scrollspy.index("</script>")]
    assert ".hidden" not in scrollspy and "hidden =" not in scrollspy, (
        "the scrollspy hides part of the list, which a reader without script then loses"
    )


# --- the reading progress line -------------------------------------------------


def test_the_progress_line_is_inert_markup():
    """Empty, hidden from assistive technology, and a direct child of the masthead."""
    page = PAGE.read_text(encoding="utf-8")
    match = re.search(r'<div class="progress"[^>]*></div>', page)
    assert match, "the progress line is not in the page"
    assert 'aria-hidden="true"' in match.group(0), "a decorative bar is announced"
    assert page.count("data-progress") == 1, "the decorative bar is scripted; it needs none"


def test_the_progress_line_cannot_change_the_masthead_height():
    """Absolutely positioned inside the header, so it adds no height and no shift."""
    rule = block(css(SHELL), ".progress")
    assert re.search(r"position:\s*absolute", rule), (
        "the bar is in the masthead's flow, so it changes the bar's height"
    )
    assert re.search(r"height:\s*2px", rule), "the bar is not the 2px it was specified as"
    assert re.search(r"inset:\s*auto 0 0 0", rule), "the bar is not pinned to the bottom edge"


def test_the_progress_line_is_driven_by_the_scroller_and_gated_everywhere():
    """No script, no fallback, and nothing that moves for a reader who asked it not to."""
    source = css(SHELL)
    assert "@supports (animation-timeline: scroll())" in source, (
        "the animation is not feature-gated, so a browser without it draws a stuck bar"
    )
    gated = source[source.index("@supports (animation-timeline: scroll())") :]
    assert re.search(r"\.progress\s*\{[^}]*animation-timeline:\s*scroll\(", gated, re.S), (
        "the bar is not driven by the scroll position"
    )
    reduce = re.search(
        r"@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.progress\s*\{([^}]*)\}", source
    )
    assert reduce and "display: none" in reduce.group(1), (
        "a reader who asked for less motion still gets a bar that fills as they scroll"
    )
    assert "prefers-reduced-motion: no-preference" in gated, (
        "the animation is not confined to readers who have not asked for less motion"
    )


# --- the drawer that starts where the reader is --------------------------------


def test_the_filter_is_an_enhancement_not_the_route():
    """Shipped `hidden`, revealed by the script, and only where the drawer collapses."""
    page = PAGE.read_text(encoding="utf-8")
    assert re.search(r'<div class="nav-filter"[^>]*\bhidden\b', page), (
        "the filter ships visible, so a reader with scripting off gets a field that "
        "does nothing"
    )
    assert "filter.hidden = false" in page, "the script never reveals the filter"
    source = css(SHELL)
    assert re.search(r"\.nav-filter \{\s*display:\s*none;\s*\}", source), (
        "the filter is drawn above the drawer breakpoint, where the tree is a column"
    )
    narrow = source[source.index("@media (max-width: 60rem)") :]
    assert ".nav-filter:not([hidden])" in narrow[:4000], (
        "the filter has no width at which it is shown"
    )
    assert "max-width: 60rem" in source, "the drawer breakpoint moved"


def test_the_drawer_has_a_scroll_box_of_its_own():
    """Without one, "scrolled into view" means scrolling the article away."""
    narrow = css(SHELL)[css(SHELL).index("@media (max-width: 60rem)") :]
    assert re.search(
        r"\.nav-drawer\[open\] > \.sidebar\s*\{[^}]*max-height:", narrow, re.S
    ), "the drawer's tree has no height, so nothing inside it can scroll"
    assert re.search(
        r"\.nav-drawer\[open\] > \.sidebar\s*\{[^}]*overflow-y:\s*auto", narrow, re.S
    ), "the drawer's tree does not scroll"


def test_escape_closes_the_drawer_and_returns_the_summary():
    """A `<details>` does not answer Escape; the control has to."""
    page = PAGE.read_text(encoding="utf-8")
    drawer = page[page.index("const drawer"):]
    escape = drawer[drawer.index('"Escape"') :][:400]
    assert "drawer.open = false" in escape, "Escape does not close the drawer"
    assert "summary.focus()" in escape, (
        "focus is left inside a closed disclosure instead of on its control"
    )


def test_the_drawer_opens_at_chapter_level_with_the_reader_in_it():
    """Chapter level, then the reader's own row, without moving the page."""
    page = PAGE.read_text(encoding="utf-8")
    drawer = page[page.index("const drawer"):]
    assert "node.open = trail.includes(node)" in drawer, (
        "opening the drawer does not reset the tree to the path to this page"
    )
    reveal = drawer[drawer.index("const reveal"):]
    assert "sidebar.scrollTop" in reveal[:600], (
        "the current row is never brought into the drawer's own box"
    )
