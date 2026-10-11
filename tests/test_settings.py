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
from pathlib import Path

import pytest
import yaml

from textbook import portal, scaffold
from textbook.book import discover_books, repo_root
from textbook.hooks.prefs import SCHEME_KEY, THEME_KEY
from textbook.themes import default_bundle, ordered_bundles

BASE_YML = repo_root() / "renderers" / "mkdocs" / "base.yml"
OVERRIDES = repo_root() / "renderers" / "mkdocs" / "overrides"
SETTINGS_HTML = OVERRIDES / "partials" / "settings.html"
HEADER_HTML = OVERRIDES / "partials" / "header.html"
SETTINGS_JS = repo_root() / "assets" / "settings" / "settings.js"
SETTINGS_CSS = repo_root() / "assets" / "stylesheets" / "settings.css"

BOOKS = discover_books()
IDS = [b.id for b in BOOKS]

# A colour hard-coded in the markup or the stylesheet would not adapt to a
# bundle or a scheme; every value must be a --tb-* or --md-* token.
HEX_COLOUR = re.compile(r"#[0-9a-fA-F]{3,8}\b")
FUNCTION_COLOUR = re.compile(r"\b(rgba?|hsla?)\(", re.IGNORECASE)


def base_config() -> dict:
    return yaml.safe_load(BASE_YML.read_text(encoding="utf-8")) or {}


def config_for(book, profile_id: str) -> dict:
    return yaml.safe_load(
        scaffold.config_path(book, profile_id).read_text(encoding="utf-8")
    ) or {}


def button_tag(text: str, element_id: str) -> str:
    match = re.search(r'<button\b[^>]*\bid="' + re.escape(element_id) + r'"[^>]*>', text)
    assert match, f"no <button id={element_id!r}> in the override"
    return match.group(0)


# --- the override is wired in -------------------------------------------------


def test_custom_dir_points_at_an_existing_overrides_tree():
    theme = base_config()["theme"]
    custom = theme.get("custom_dir")
    assert custom, "base.yml must declare theme.custom_dir"
    # MkDocs resolves custom_dir against the generated config that INHERITs
    # base.yml, and those live beside base.yml.
    assert (BASE_YML.parent / custom).resolve() == OVERRIDES.resolve()
    assert (OVERRIDES / "partials" / "header.html").is_file()
    assert (OVERRIDES / "partials" / "settings.html").is_file()


@pytest.mark.parametrize("book", BOOKS, ids=IDS)
def test_mkdocs_resolves_the_override_directory(book):
    """Load the real config, so a wrong relative path fails here, not at build."""
    from mkdocs.config import load_config

    for profile in book.profiles:
        config = load_config(config_file=str(scaffold.config_path(book, profile.id)))
        assert Path(config["theme"].custom_dir).resolve() == OVERRIDES.resolve()


def test_the_header_override_adds_one_include_to_materials_header():
    text = HEADER_HTML.read_text(encoding="utf-8")
    assert "partials/settings.html" in text
    # Otherwise it is Material's header, not a hand-rolled one that would drift.
    for marker in (
        'data-md-component="header"',
        'data-md-component="logo"',
        "partials/search.html",
    ):
        assert marker in text


# --- the trigger and the dialog ----------------------------------------------


def test_the_trigger_is_a_labelled_button_hidden_until_scripted():
    text = SETTINGS_HTML.read_text(encoding="utf-8")
    button = button_tag(text, "tb-settings")
    assert 'aria-label="Settings"' in button
    assert 'type="button"' in button
    assert 'aria-haspopup="dialog"' in button
    assert 'aria-controls="tb-settings-dialog"' in button
    # Inert without JavaScript: the script is what reveals it.
    assert "hidden" in button


def test_the_panel_is_a_labelled_dialog_with_a_labelled_close():
    text = SETTINGS_HTML.read_text(encoding="utf-8")
    assert 'id="tb-settings-dialog"' in text
    assert 'aria-labelledby="tb-settings-title"' in text
    assert 'id="tb-settings-title"' in text
    # A method="dialog" submit closes natively, so Escape and the close button
    # share one mechanism.
    assert 'method="dialog"' in text
    assert 'aria-label="Close settings"' in text


def test_the_panel_builds_its_options_from_the_config():
    text = SETTINGS_HTML.read_text(encoding="utf-8")
    assert "config.extra.themes" in text
    assert "config.extra.theme_info" in text
    assert 'name="tb-theme"' in text
    assert 'name="tb-scheme"' in text
    # The scheme options come from the configured palette, not a hard-coded pair.
    assert "config.theme.palette" in text


# --- the config carries what the panel needs ---------------------------------


@pytest.mark.parametrize("book", BOOKS, ids=IDS)
def test_every_profile_offers_every_bundle_and_loads_the_runtime(book):
    bundles = ordered_bundles()
    for profile in book.profiles:
        extra = config_for(book, profile.id)["extra"]
        assert extra["themes"] == [bundle.id for bundle in bundles]
        assert extra["default_theme"] == default_bundle().id
        info = extra["theme_info"]
        for bundle in bundles:
            assert info[bundle.id]["title"] == bundle.title
            assert info[bundle.id]["description"] == bundle.description
        scripts = config_for(book, profile.id).get("extra_javascript") or []
        assert scaffold.SETTINGS_WIDGET in scripts, (
            f"{book.id}/{profile.id}: the Settings runtime is not loaded"
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
    assert "assets/stylesheets/settings.css" in base_config()["extra_css"]
    assert SETTINGS_CSS.is_file() and SETTINGS_JS.is_file()


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
    button = button_tag(SETTINGS_HTML.read_text(encoding="utf-8"), "tb-settings")
    assert "hidden" in button
    assert "trigger.hidden = false" in SETTINGS_JS.read_text(encoding="utf-8")
    # The runtime only ever enhances these elements; it does not build them.
    assert 'id="tb-settings-dialog"' in SETTINGS_HTML.read_text(encoding="utf-8")


# --- no colour, one scheme control -------------------------------------------


def test_the_panel_and_its_stylesheet_declare_no_colour():
    for path in (SETTINGS_HTML, SETTINGS_CSS):
        text = path.read_text(encoding="utf-8")
        assert not HEX_COLOUR.search(text), f"{path.name} declares a hex colour"
        assert not FUNCTION_COLOUR.search(text), f"{path.name} declares an rgb()/hsl() colour"
    assert "style=" not in SETTINGS_HTML.read_text(encoding="utf-8")


def test_materials_toggle_is_withdrawn_and_its_inputs_kept():
    """One control per idea: light/dark lives in the panel, not also the header."""
    palette = base_config()["theme"]["palette"]
    assert len(palette) == 2
    for entry in palette:
        assert "toggle" not in entry, "a header toggle would duplicate the panel's scheme"
    css = SETTINGS_CSS.read_text(encoding="utf-8")
    # Material's palette inputs stay (the dialog drives them) but are hidden, so
    # they add no invisible keyboard stops.
    assert 'data-md-component="palette"' in css
    assert "display: none" in css


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
