"""Both reader preferences belong to the reader, not to the build.

The colour scheme and the theme bundle are stored under origin-wide keys and
applied before the first paint, so a choice made in one book follows the reader
into every other book and the landing page.

There is exactly one implementation of that script: ``hooks/prefs.py``'s
``snippet``. The book template, the landing page and the 404 carry ``$prefs_script``
and are filled from it, so they cannot drift. These tests pin the keys, the
generated payload, the empty template slots, and every surface rendering the one
snippet.
"""

from __future__ import annotations

import re
from string import Template

import pytest

from textbook import pipeline, portal
from textbook.book import book_by_id, repo_root
from textbook.hooks import prefs
from textbook.themes import default_bundle, ordered_bundles

BOOK = "gcse-maths"
PROFILE = "higher"
PAGE = "Chapter 1/Section 1.1/Walkthrough/index.md"


def base_config() -> dict:
    """The shape ``snippet`` reads: the bundle registry, from ``themes/``."""
    return {
        "extra": {
            "themes": [bundle.id for bundle in ordered_bundles()],
            "default_theme": default_bundle().id,
        }
    }


def shared_snippet() -> str:
    """The one script every reader surface must carry, byte for byte."""
    return prefs.snippet(base_config())


@pytest.fixture(scope="module")
def book_page() -> str:
    """One real book page, rendered through the pipeline's own substitution."""
    book = book_by_id(BOOK)
    config = pipeline.make_config(book, PROFILE)
    nav = pipeline.chapter_subset(book, 1)
    template = Template(pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8"))
    html, _entry, maths_failed = pipeline.render_page(
        book, PROFILE, config, nav, PAGE, template
    )
    assert not maths_failed, "the page did not render, so it cannot pin the script"
    return html


# --- the keys -----------------------------------------------------------------


def test_the_shared_key_is_not_scoped_to_a_path():
    """A path-scoped key would lose the reader's choice if the site moved."""
    key = prefs.SCHEME_KEY
    assert key and "/" not in key and not key.startswith(".")


def test_the_alias_still_points_at_the_scheme_key():
    assert prefs.SHARED_KEY == prefs.SCHEME_KEY


def test_themes_follows_the_configured_registry():
    ids, default = prefs.themes(base_config())
    assert ids == [bundle.id for bundle in ordered_bundles()]
    assert default == default_bundle().id


def test_themes_defaults_to_the_first_bundle_when_none_is_named():
    ids, default = prefs.themes({"extra": {"themes": ["a", "b"]}})
    assert ids == ["a", "b"]
    assert default == "a"


def test_themes_tolerates_a_missing_config():
    assert prefs.themes(None) == ([], "")
    assert prefs.themes({}) == ([], "")


# --- the generated script -----------------------------------------------------


def test_snippet_reads_both_shared_keys():
    snippet = shared_snippet()
    assert f'"{prefs.SCHEME_KEY}"' in snippet
    assert f'"{prefs.THEME_KEY}"' in snippet


def test_snippet_offers_every_configured_bundle():
    snippet = shared_snippet()
    for bundle in ordered_bundles():
        assert f'"{bundle.id}"' in snippet, bundle.id


def test_snippet_sets_the_attributes_the_shell_reads():
    """``themes.css`` keys its tokens off ``body[data-md-color-scheme]``.

    The body attribute is copied from ``<html>`` by the page's own tiny script,
    so the attribute the generated script sets is ``data-md-color-scheme`` on the
    document element. ``data-scheme-pref`` is the landing page's source for the
    same copy.
    """
    snippet = shared_snippet()
    assert "data-theme" in snippet
    assert "data-scheme-pref" in snippet
    assert "data-md-color-scheme" in snippet


def test_snippet_exposes_the_shared_store():
    """The Settings runtime reads this interface; its fallback must never be needed."""
    snippet = shared_snippet()
    for field in (
        "window.textbookPrefs",
        "schemeKey",
        "themeKey",
        "setTheme",
        "currentTheme",
        "read: read",
        "write: write",
    ):
        assert field in snippet, field


# --- one implementation, no copies --------------------------------------------


def test_the_book_template_carries_the_generated_script():
    template = pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8")
    assert "$prefs_script" in template


def test_the_landing_template_carries_the_generated_script():
    template = (repo_root() / "engine" / "src" / "textbook" / "templates" / "portal.html").read_text(
        encoding="utf-8"
    )
    assert "$prefs_script" in template


@pytest.mark.parametrize(
    "relative",
    [
        "engine/src/textbook/templates/page.html",
        "engine/src/textbook/templates/portal.html",
    ],
)
def test_no_template_holds_a_second_copy_of_the_script(relative):
    """The templates must hold no preference logic, only the empty slot.

    This is the test that would fail if someone pasted a before-paint script back
    into a template: the two copies could then disagree, which is what this
    change removes.
    """
    text = (repo_root() / relative).read_text(encoding="utf-8")
    assert "localStorage" not in text, f"{relative} reads storage of its own"
    assert "textbooks:" not in text, f"{relative} hardcodes a shared key"
    assert "data-theme" not in text, f"{relative} applies a theme of its own"


def test_the_page_template_has_no_inline_before_paint_script():
    """The old copy is gone: the slot is the only script before the stylesheets."""
    template = pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8")
    head = template[: template.index("themes.css")]
    assert "<script" not in head, "an inline script survives in the head"


# --- every surface renders the one script -------------------------------------


def test_the_built_book_page_carries_the_shared_snippet(book_page: str):
    """Rendered output, not just the template: the substitution must fire.

    This is the test that fails if the template and ``prefs.snippet`` ever
    disagree: the pipeline renders a real page and the bytes must match.
    """
    assert shared_snippet() in book_page


def test_the_landing_page_carries_the_shared_snippet():
    assert shared_snippet() in portal.render()


def test_the_404_carries_the_shared_snippet():
    """A missing page must not need a fourth copy of the preference logic."""
    assert shared_snippet() in portal.not_found()


def test_every_book_page_gets_the_snippet_before_the_stylesheets(book_page: str):
    """Before paint, so the chosen bundle cannot flash."""
    assert book_page.index(prefs.SCHEME_KEY) < book_page.index("themes.css")


def test_the_landing_page_applies_the_theme_before_paint():
    html = portal.render()
    head = html[: html.index("</head>")]
    assert "data-theme" in head
    assert prefs.THEME_KEY in head


def test_landing_page_can_write_the_preference_too():
    """A reader who picks a scheme on the landing page must get it in the books.

    The landing page exposes the same ``window.textbookPrefs`` interface the
    snippet generates for the books, so there is one store rather than a second
    copy that could drift.
    """
    html = portal.render()
    assert "assets/settings/settings.js" in html, "the shared Settings runtime is not loaded"
    assert "window.textbookPrefs" in html, "the landing page does not expose the shared store"
    runtime = (repo_root() / "assets" / "settings" / "settings.js").read_text(encoding="utf-8")
    assert prefs.SCHEME_KEY in runtime, "the runtime never writes the shared scheme key"


def test_landing_control_is_hidden_without_javascript():
    """The control is inert without scripting, so it must not appear."""
    html = portal.render()
    trigger = re.search(r'<button\b[^>]*id="tb-settings"[^>]*>', html)
    assert trigger, "the landing page has no Settings trigger"
    assert "hidden" in trigger.group(0), "the trigger is visible before its script runs"


def test_every_reader_surface_reads_and_writes_the_key(book_page: str):
    """Books, the landing page and the 404 must agree on reading and writing."""
    surface_snippet = shared_snippet()
    for surface, name in (
        (book_page, "a book page"),
        (portal.render(), "the landing page"),
        (portal.not_found(), "the 404"),
    ):
        assert surface_snippet in surface, f"{name} does not carry the shared script"
    # A book page reads the choice; the shared runtime records it, so there is
    # one writer rather than a second copy that could drift.
    runtime = (repo_root() / "assets" / "settings" / "settings.js").read_text(
        encoding="utf-8"
    )
    assert "localStorage.setItem" in runtime, "the runtime never records the choice"
