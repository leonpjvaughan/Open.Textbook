"""The no-JavaScript claim, checked against a real built page.

``AGENTS.md`` and ``SHAPE.md`` both assert that the site is readable without
scripting: maths is rendered to MathML by KaTeX at build time, the prose is in
the markup, and the interactive chrome is an enhancement. That was an assertion.
This is the check.

The suite renders one real page through the pipeline — the same hooks, the same
maths renderer and the same ``<math>`` output the build produces — then removes
every ``<script>`` element. That is the page as a reader with scripting off
actually sees it. What must survive is the prose and the maths; what must not be
needed is a runtime maths renderer.

Coverage boundary, stated so it is not mistaken for more than it is: this file
exercises the shared engine and the page shell. The one piece of chrome that
makes a no-JavaScript promise — the Settings trigger, which is ``hidden`` until
its script runs — is pinned by ``tests/test_settings.py``. The real-browser,
JavaScript-disabled run lives in ``research/accessibility.md``, where a Playwright
result belongs.
"""

from __future__ import annotations

import re
from string import Template

import pytest

from textbook import pipeline, portal
from textbook.book import book_by_id, repo_root

BOOK = "gcse-maths"
PROFILE = "higher"
# A walkthrough with both inline maths and a display block, so the check sees
# the two shapes of KaTeX output.
PAGE = "Chapter 1/Section 1.1/Walkthrough/index.md"

SCRIPT = re.compile(r"<script\b.*?</script>", re.S | re.I)
MATH = re.compile(r"<math\b[^>]*>", re.I)
ANNOTATION = re.compile(
    r'<annotation\s+encoding="application/x-tex"\s*>(.*?)</annotation>', re.S
)
# A runtime maths renderer would appear as one of these in a script src or an
# inline script. The build-time renderer must leave no such reference behind.
RUNTIME_RENDERERS = ("katex", "mathjax", "rendermathinelement", "temml")

SETTINGS_JS = repo_root() / "assets" / "settings" / "settings.js"


@pytest.fixture(scope="module")
def page_html() -> str:
    """One page rendered by the real engine, exactly as the build renders it."""
    book = book_by_id(BOOK)
    config = pipeline.make_config(book, PROFILE)
    nav = pipeline.chapter_subset(book, 1)
    template = Template(pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8"))
    html, _entry, maths_failed = pipeline.render_page(
        book, PROFILE, config, nav, PAGE, template
    )
    assert not maths_failed, (
        "the maths renderer failed, so this page cannot show whether maths is "
        "static: install Node and run `npm install`"
    )
    return html


@pytest.fixture(scope="module")
def without_scripts(page_html: str) -> str:
    """The page with every ``<script>`` removed: scripting off, applied."""
    stripped = SCRIPT.sub("", page_html)
    assert "<script" not in stripped.lower()
    return stripped


# --- what a scriptless reader gets -------------------------------------------


def test_the_renderer_produces_a_page_without_a_browser(page_html):
    """The build is a pure function: no browser, no DOM, no runtime is involved."""
    assert page_html.lstrip().startswith("<!DOCTYPE html>")
    assert MATH.search(page_html), "no MathML was produced at build time"


def test_prose_survives_the_loss_of_every_script(without_scripts):
    """The teaching is in the markup, so removing the scripts does not remove it."""
    # A phrase from the page itself, not from chrome or navigation.
    assert "Every digit in a number has a" in without_scripts
    assert "place value" in without_scripts
    # And a substantial body of text remains, so a single surviving sentence
    # cannot pass this by accident.
    text = re.sub(r"<[^>]+>", " ", without_scripts)
    assert len(text.split()) > 400, "the scriptless page is missing its prose"


def test_maths_is_static_mathml_in_the_scriptless_page(without_scripts):
    """Maths is present as MathML once the scripts are gone, so it is static."""
    maths = MATH.findall(without_scripts)
    assert len(maths) >= 10, f"expected the page's maths, found {len(maths)}"
    # KaTeX emits the original LaTeX in a hidden annotation. It is part of the
    # static output too, and it is what a text fallback can read.
    annotations = ANNOTATION.findall(without_scripts)
    assert annotations, "MathML carries no application/x-tex annotation"
    assert any("neq" in a or "\\times" in a or "\\div" in a for a in annotations)


def test_removing_scripts_does_not_remove_any_maths(page_html, without_scripts):
    """No maths is injected by a script: the counts are identical."""
    assert without_scripts.count("<math") == page_html.count("<math")


def test_no_runtime_maths_renderer_is_reachable(page_html):
    """The whole point of build-time rendering: nothing must render maths at runtime."""
    lowered = page_html.lower()
    for name in RUNTIME_RENDERERS:
        assert name not in lowered, (
            f"the built page references {name!r}, so maths would depend on a "
            "runtime renderer and would vanish with scripting off"
        )


def test_the_page_has_no_inline_maths_handler(page_html):
    """A ``onload=`` handler that typeset maths would also be a runtime dependency."""
    for handler in re.findall(r'\son[a-z]+\s*=\s*"([^"]*)"', page_html):
        assert "math" not in handler.lower(), handler


def test_the_build_reports_a_maths_failure_rather_than_an_empty_span(page_html):
    """``throwOnError`` is on, so a bad expression is visible, not silently lost."""
    assert "math-error" not in page_html


# --- the one piece of chrome that promises no-JavaScript honesty --------------


def test_the_settings_control_is_hidden_until_its_script_runs():
    """The pipeline shell's only no-JavaScript promise, pinned where it is made.

    With scripting off the trigger is absent, not a dead control; the script is
    what reveals it. ``tests/test_settings.py`` pins the same source, and this
    keeps the no-JavaScript file self-contained.
    """
    button = re.search(
        r"<button\b[^>]*id=\"tb-settings\"[^>]*>", portal.settings_trigger()
    )
    assert button, "the Settings trigger moved"
    assert "hidden" in button.group(0)
    assert "trigger.hidden = false" in SETTINGS_JS.read_text("utf-8")
    # The panel is only ever enhanced, never built, by the script.
    assert 'id="tb-settings-dialog"' in portal.settings_dialog()
