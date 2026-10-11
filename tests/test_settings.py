"""The reader Settings control: the header trigger and its dialog.

The control is chrome, not content, so these tests pin the four things that make
it safe on every page: it is a labelled, keyboard-reachable native ``<dialog>``
that never changes the URL; it reuses the origin-wide preference store instead of
inventing a second one; it declares no colour, so it adapts to every bundle and
both schemes; and it is inert without JavaScript.
"""

from __future__ import annotations

from html import escape
import re

import pytest

from textbook import pipeline, portal, scaffold
from textbook.book import discover_books, repo_root
from textbook.hooks.prefs import SCHEME_KEY, THEME_KEY
from textbook.themes import ordered_bundles

SETTINGS_JS = repo_root() / "assets" / "settings" / "settings.js"
SETTINGS_CSS = repo_root() / "assets" / "stylesheets" / "settings.css"

BOOKS = discover_books()
IDS = [b.id for b in BOOKS]

# A colour hard-coded in the markup or the stylesheet would not adapt to a
# bundle or a scheme; every value must be a --tb-* or --md-* token.
HEX_COLOUR = re.compile(r"#[0-9a-fA-F]{3,8}\b")
FUNCTION_COLOUR = re.compile(r"\b(rgba?|hsla?)\(", re.IGNORECASE)


def button_tag(text: str, element_id: str) -> str:
    match = re.search(r'<button\b[^>]*\bid="' + re.escape(element_id) + r'"[^>]*>', text)
    assert match, f"no <button id={element_id!r}> in the control"
    return match.group(0)


# --- the control is wired into every page ------------------------------------
#
# The trigger and dialog are generated once, by `textbook.portal`, and every book
# page and the landing page carry the same markup through `$settings_trigger` and
# `$settings_dialog`. There is no second, renderer-specific copy to keep in sync.


def test_the_page_template_carries_the_generated_control():
    template = pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8")
    assert "$settings_trigger" in template
    assert "$settings_dialog" in template
    assert "assets/settings/settings.js" in template


# --- the trigger and the dialog ----------------------------------------------


def test_the_trigger_is_a_labelled_button_hidden_until_scripted():
    button = button_tag(portal.settings_trigger(), "tb-settings")
    assert 'aria-label="Settings"' in button
    assert 'type="button"' in button
    assert 'aria-haspopup="dialog"' in button
    assert 'aria-controls="tb-settings-dialog"' in button
    # Inert without JavaScript: the script is what reveals it.
    assert "hidden" in button


def test_the_panel_is_a_labelled_dialog_with_a_labelled_close():
    text = portal.settings_dialog()
    assert 'id="tb-settings-dialog"' in text
    assert 'aria-labelledby="tb-settings-title"' in text
    assert 'id="tb-settings-title"' in text
    # A method="dialog" submit closes natively, so Escape and the close button
    # share one mechanism.
    assert 'method="dialog"' in text
    assert 'aria-label="Close settings"' in text


def test_the_panel_offers_the_two_schemes_and_every_bundle():
    text = portal.settings_dialog()
    assert 'name="tb-theme"' in text
    assert 'name="tb-scheme"' in text
    # The options come from the bundle registry, so the panel cannot drift from
    # themes/. The two colour schemes are fixed: they are the schemes the
    # bundles are written for, not a choice of bundles.
    for bundle in ordered_bundles():
        assert f'value="{bundle.id}"' in text, bundle.id
    for scheme in ("default", "slate"):
        assert f'value="{scheme}"' in text


# --- the config carries what the panel needs ---------------------------------


# --- the control offers what the collection declares -------------------------


@pytest.mark.parametrize("book", BOOKS, ids=IDS)
def test_every_book_offers_every_bundle_and_loads_the_runtime(book):
    dialog = portal.settings_dialog()
    for bundle in ordered_bundles():
        assert f'value="{bundle.id}"' in dialog, f"{book.id}: {bundle.id} is not offered"
        # `_radio` escapes the title, so compare the escaped form.
        assert escape(bundle.title) in dialog
    template = pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8")
    assert "$settings_dialog" in template, f"{book.id}: the page does not carry the panel"
    assert "assets/settings/settings.js" in template, (
        f"{book.id}: the Settings runtime is not loaded"
    )


@pytest.mark.parametrize("book", BOOKS, ids=IDS)
def test_every_book_sees_the_settings_assets(book):
    assets = book.docs / "assets"
    for relative, target in (
        ("stylesheets/settings.css", SETTINGS_CSS),
        ("settings/settings.js", SETTINGS_JS),
    ):
        link = assets / relative
        assert link.is_symlink(), f"{book.id}: {relative} should be a symlink"
        assert link.resolve() == target.resolve(), f"{book.id}: {relative} points elsewhere"


def test_the_assets_are_declared_shared_and_loaded():
    assert ("stylesheets/settings.css", "assets/stylesheets/settings.css") in (
        scaffold.SHARED_ASSETS
    )
    assert ("settings/settings.js", scaffold.SETTINGS_WIDGET) in scaffold.SHARED_ASSETS
    assert SETTINGS_CSS.is_file() and SETTINGS_JS.is_file()
    template = pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8")
    assert "assets/stylesheets/settings.css" in template
    assert "assets/settings/settings.js" in template


# --- behaviour pinned by inspection of the runtime ---------------------------


def test_the_runtime_reuses_the_origin_wide_store():
    js = SETTINGS_JS.read_text(encoding="utf-8")
    assert "window.textbookPrefs" in js
    assert "prefs.schemeKey" in js and "prefs.themeKey" in js
    assert "setTheme" in js
    # The literal keys are only the fallback, never a second store.
    assert SCHEME_KEY in js and THEME_KEY in js
    # The scheme is applied through Material's own palette inputs, so the two
    # controls cannot disagree about what is stored.
    assert 'input[name="__palette"]' in js


def test_the_control_never_changes_the_url():
    js = SETTINGS_JS.read_text(encoding="utf-8")
    for forbidden in ("location", "history", "pushState", "replaceState"):
        assert forbidden not in js, f"the runtime touches {forbidden}"
    # A native dialog is opened in place; no route, hash or query is involved.
    assert "showModal" in js


def test_focus_is_managed_and_the_background_is_inert():
    js = SETTINGS_JS.read_text(encoding="utf-8")
    # showModal() is what makes the rest of the page inert and Escape close it.
    assert "showModal" in js
    assert re.search(r'dialog\.addEventListener\("close"', js)
    assert "trigger.focus()" in js
    # Escape is the browser's; nothing re-implements or blocks it.
    assert "preventDefault" not in js


def test_without_javascript_the_control_does_nothing():
    button = button_tag(portal.settings_trigger(), "tb-settings")
    assert "hidden" in button
    assert "trigger.hidden = false" in SETTINGS_JS.read_text(encoding="utf-8")
    # The runtime only ever enhances these elements; it does not build them.
    assert 'id="tb-settings-dialog"' in portal.settings_dialog()


# --- no colour, one scheme control -------------------------------------------


def test_the_panel_and_its_stylesheet_declare_no_colour():
    markup = portal.settings_trigger() + portal.settings_dialog()
    assert not HEX_COLOUR.search(markup), "the Settings markup declares a hex colour"
    assert not FUNCTION_COLOUR.search(markup), "the Settings markup declares an rgb()/hsl() colour"
    assert "style=" not in markup
    css = SETTINGS_CSS.read_text(encoding="utf-8")
    assert not HEX_COLOUR.search(css), "settings.css declares a hex colour"
    assert not FUNCTION_COLOUR.search(css), "settings.css declares an rgb()/hsl() colour"


# --- the landing page carries the same control -------------------------------

def test_the_landing_page_loads_the_shared_settings_assets():
    """One runtime, so the landing page and the books cannot drift apart."""
    html = portal.render()
    assert "assets/settings/settings.js" in html
    assert "assets/stylesheets/settings.css" in html
    assert "window.textbookPrefs" in html, "the landing page does not expose the shared store"


def test_the_landing_page_has_the_same_trigger_and_dialog():
    html = portal.render()
    button = button_tag(html, "tb-settings")
    assert 'aria-label="Settings"' in button
    assert 'aria-haspopup="dialog"' in button
    assert 'aria-controls="tb-settings-dialog"' in button
    # Inert without JavaScript: the shared runtime is what reveals it.
    assert "hidden" in button
    assert 'id="tb-settings-dialog"' in html
    assert 'aria-labelledby="tb-settings-title"' in html
    assert 'method="dialog"' in html


def test_the_landing_page_offers_both_preferences():
    html = portal.render()
    assert 'name="tb-scheme"' in html
    assert 'name="tb-theme"' in html
    for bundle in ordered_bundles():
        assert f'value="{bundle.id}"' in html, f"{bundle.id} missing from the landing dialog"
        # `_radio` escapes the title, so compare the escaped form.
        assert escape(bundle.title) in html


def test_the_landing_settings_markup_declares_no_colour():
    """The dialog must adapt to every bundle and both schemes, like the books'."""
    markup = portal.settings_trigger() + portal.settings_dialog()
    assert not HEX_COLOUR.search(markup)
    assert not FUNCTION_COLOUR.search(markup)
    assert "style=" not in markup


def test_the_landing_theme_choice_can_be_withdrawn(monkeypatch):
    """`theme_selector: false` withdraws the theme choice, and only that."""
    import textbook.book as books_module

    original = books_module.load_collection

    def withdrawn(root=None):
        data = dict(original(root))
        data["theme_selector"] = False
        return data

    monkeypatch.setattr(books_module, "load_collection", withdrawn)
    assert 'id="theme-menu"' not in portal.settings_dialog()
    # The colour scheme is not a theme bundle, so it stays on offer.
    assert 'name="tb-scheme"' in portal.settings_dialog()
