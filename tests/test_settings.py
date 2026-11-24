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

HEX_COLOUR = re.compile(r"#[0-9a-fA-F]{3,8}\b")
FUNCTION_COLOUR = re.compile(r"\b(rgba?|hsla?)\(", re.IGNORECASE)


def button_tag(text: str, element_id: str) -> str:
    match = re.search(r'<button\b[^>]*\bid="' + re.escape(element_id) + r'"[^>]*>', text)
    assert match, f"no <button id={element_id!r}> in the control"
    return match.group(0)




def test_the_page_template_carries_the_generated_control():
    template = pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8")
    assert "$settings_trigger" in template
    assert "$settings_dialog" in template
    assert "$settings_js" in template
    assert "assets/settings/settings.js" in pipeline.addressed_assets(
        __import__("textbook.book", fromlist=["x"]).book_by_id("gcse-maths")
    )




def test_the_trigger_is_a_labelled_button_hidden_until_scripted():
    button = button_tag(portal.settings_trigger(), "tb-settings")
    assert 'aria-label="Settings"' in button
    assert 'type="button"' in button
    assert 'aria-haspopup="dialog"' in button
    assert 'aria-controls="tb-settings-dialog"' in button
    assert "hidden" in button


def test_the_panel_is_a_labelled_dialog_with_a_labelled_close():
    text = portal.settings_dialog()
    assert 'id="tb-settings-dialog"' in text
    assert 'aria-labelledby="tb-settings-title"' in text
    assert 'id="tb-settings-title"' in text
    assert 'method="dialog"' in text
    assert 'aria-label="Close settings"' in text


def test_the_panel_offers_the_three_schemes_and_every_bundle():
    text = portal.settings_dialog()
    assert 'name="tb-theme"' in text
    assert 'name="tb-scheme"' in text
    for bundle in ordered_bundles():
        assert f'value="{bundle.id}"' in text, bundle.id
    for scheme in ("auto", "default", "slate"):
        assert f'value="{scheme}"' in text






@pytest.mark.parametrize("book", BOOKS, ids=IDS)
def test_every_book_offers_every_bundle_and_loads_the_runtime(book):
    dialog = portal.settings_dialog()
    for bundle in ordered_bundles():
        assert f'value="{bundle.id}"' in dialog, f"{book.id}: {bundle.id} is not offered"
        assert escape(bundle.title) in dialog
    template = pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8")
    assert "$settings_dialog" in template, f"{book.id}: the page does not carry the panel"
    assert "$settings_js" in template, f"{book.id}: the Settings runtime is not loaded"


@pytest.mark.parametrize("book", BOOKS, ids=IDS)
def test_the_settings_assets_are_declared_shared(book):
    """They are shipped because they are declared, not because a link exists."""
    from textbook import scaffold

    for relative in (
        "assets/stylesheets/settings.css",
        "assets/settings/settings.js",
    ):
        assert relative in scaffold.SHARED_FILES, f"{relative} is not declared shared"
        assert (repo_root() / relative).is_file(), f"{relative} is missing from assets/"
    assert not [p for p in (book.docs / "assets").rglob("*") if p.is_symlink()], (
        f"{book.id}: a symlink survives; sharing is declared, not linked"
    )


def test_the_assets_are_declared_shared_and_loaded():
    assert "assets/stylesheets/settings.css" in scaffold.SHARED_FILES
    assert "assets/settings/settings.js" in scaffold.SHARED_FILES
    assert SETTINGS_CSS.is_file() and SETTINGS_JS.is_file()
    template = pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8")
    assert "assets/stylesheets/settings.css" in pipeline.STYLESHEETS
    assert "$stylesheets" in template
    assert "$settings_js" in template




def test_the_runtime_reuses_the_origin_wide_store():
    js = SETTINGS_JS.read_text(encoding="utf-8")
    assert "window.textbookPrefs" in js
    assert "prefs.schemeKey" in js and "prefs.themeKey" in js
    assert "setTheme" in js
    # The literal keys are only the fallback, never a second store.
    assert SCHEME_KEY in js and THEME_KEY in js
    assert 'input[name="__palette"]' in js


def test_the_control_never_changes_the_url():
    js = SETTINGS_JS.read_text(encoding="utf-8")
    for forbidden in ("location", "history", "pushState", "replaceState"):
        assert forbidden not in js, f"the runtime touches {forbidden}"
    assert "showModal" in js


def test_focus_is_managed_and_the_background_is_inert():
    js = SETTINGS_JS.read_text(encoding="utf-8")
    assert "showModal" in js
    assert re.search(r'dialog\.addEventListener\("close"', js)
    assert "trigger.focus()" in js
    assert "preventDefault" not in js


def test_a_click_outside_the_panel_closes_it_and_a_click_inside_does_not():
    """`closedby="any"` where the browser has it; the pointer's position where it does not.

    The old listener compared `event.target` with the dialog. The dialog is also the
    target for its own padding and for the gaps between its children, so a click inside
    the panel but not on a control closed it — and a click on the backdrop during a text
    selection closed it too. `closedby="any"` states the intent declaratively (Chrome
    134, Firefox 141); Safari ignores it, so the same behaviour is kept and guarded.
    """
    assert 'closedby="any"' in portal.settings_dialog(), (
        "the dialog does not declare light dismissal, so a click outside is either "
        "re-implemented in script or does nothing"
    )
    js = SETTINGS_JS.read_text(encoding="utf-8")
    assert '"closedBy" in HTMLDialogElement.prototype' in js, (
        "the fallback listener is not guarded, so it duplicates what the browser does "
        "and closes on a click inside the panel"
    )
    assert "event.target === dialog" not in js, (
        "the fallback tests event.target, which is the dialog for its own padding"
    )
    assert "getBoundingClientRect" in js, "the fallback no longer tests the pointer's position"
    assert "pointerdown" in js and "pointerup" in js, (
        "the fallback closes on a press that began inside the dialog"
    )


def test_without_javascript_the_control_does_nothing():
    button = button_tag(portal.settings_trigger(), "tb-settings")
    assert "hidden" in button
    assert "trigger.hidden = false" in SETTINGS_JS.read_text(encoding="utf-8")
    assert 'id="tb-settings-dialog"' in portal.settings_dialog()




def test_the_panel_and_its_stylesheet_declare_no_colour():
    markup = portal.settings_trigger() + portal.settings_dialog()
    assert not HEX_COLOUR.search(markup), "the Settings markup declares a hex colour"
    assert not FUNCTION_COLOUR.search(markup), "the Settings markup declares an rgb()/hsl() colour"
    assert "style=" not in markup
    css = SETTINGS_CSS.read_text(encoding="utf-8")
    assert not HEX_COLOUR.search(css), "settings.css declares a hex colour"
    assert not FUNCTION_COLOUR.search(css), "settings.css declares an rgb()/hsl() colour"



def test_the_landing_page_loads_the_shared_settings_assets():
    """One runtime, so the landing page and the books cannot drift apart."""
    html = portal.render()
    links = portal.root_links(rooted=False)
    assert links["settings_js"] in html
    assert links["settings_css"] in html
    assert "window.textbookPrefs" in html, "the landing page does not expose the shared store"


def test_the_landing_page_has_the_same_trigger_and_dialog():
    html = portal.render()
    button = button_tag(html, "tb-settings")
    assert 'aria-label="Settings"' in button
    assert 'aria-haspopup="dialog"' in button
    assert 'aria-controls="tb-settings-dialog"' in button
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
    assert 'name="tb-scheme"' in portal.settings_dialog()


FIVE_LAYOUTS = ("matrix", "ledger", "focus", "notebook", "atlas")


def five_layouts(monkeypatch):
    """Every layout that ships a thumbnail, whatever collection.yaml lists today."""
    import textbook.book as books_module

    original = books_module.load_collection

    def widened(root=None):
        data = dict(original(root))
        data["layouts"] = [
            {"id": layout_id, "title": layout_id.title(), "description": f"The {layout_id} layout."}
            for layout_id in FIVE_LAYOUTS
        ]
        return data

    monkeypatch.setattr(books_module, "load_collection", widened)


def test_with_one_layout_the_panel_has_no_layout_choice(monkeypatch):
    import textbook.book as books_module

    original = books_module.load_collection

    def single(root=None):
        data = dict(original(root))
        data["layouts"] = data["layouts"][:1]
        return data

    monkeypatch.setattr(books_module, "load_collection", single)
    dialog = portal.settings_dialog()
    assert 'name="tb-layout"' not in dialog
    assert "layout-menu" not in dialog


def test_with_several_layouts_the_panel_offers_each_with_its_thumbnail(monkeypatch):
    five_layouts(monkeypatch)
    dialog = portal.settings_dialog()
    assert '<legend class="tb-settings__legend">Layout</legend>' in dialog
    for layout_id in FIVE_LAYOUTS:
        assert f'name="tb-layout" value="{layout_id}"' in dialog
        assert f"The {layout_id} layout." in dialog
    assert dialog.count('<span class="tb-settings__thumb"><svg aria-hidden="true" focusable="false"') == 5
    assert "<?xml" not in dialog
    assert "style=" not in dialog


@pytest.mark.parametrize("layout_id", FIVE_LAYOUTS)
def test_every_layout_thumbnail_is_drawn_in_the_current_colours(layout_id):
    """A wireframe in currentColor and classes, so it follows the bundle and the scheme."""
    from textbook.book import layout_thumbnail

    svg = layout_thumbnail(layout_id).read_text(encoding="utf-8")
    assert svg.lstrip().startswith("<svg"), f"{layout_id}.svg does not start with <svg>"
    assert 'viewBox="0 0 120 80"' in svg
    assert not HEX_COLOUR.search(svg), f"{layout_id}.svg names a hex colour"
    assert not FUNCTION_COLOUR.search(svg), f"{layout_id}.svg names an rgb()/hsl() colour"
    assert "style=" not in svg
    paints = re.findall(r'\b(?:fill|stroke)="([^"]+)"', svg)
    assert set(paints) <= {"currentColor", "none"}, f"{layout_id}.svg paints {set(paints)}"
    assert "tb-thumb__accent" in svg, f"{layout_id}.svg draws no accent mark"


def test_the_runtime_writes_the_layout_through_the_shared_store():
    runtime = SETTINGS_JS.read_text(encoding="utf-8")
    assert '"tb-layout"' in runtime
    assert "prefs.setStyle" in runtime


def test_the_three_groups_come_in_order_each_with_a_hint(monkeypatch):
    five_layouts(monkeypatch)
    dialog = portal.settings_dialog(book=BOOKS[0])
    legends = re.findall(r'<legend class="tb-settings__legend">([^<]+)</legend>', dialog)
    assert legends == ["Colour scheme", "Colour", "Layout", "Reading offline"]
    for group_id, setting in (
        ("scheme-menu", "Colour scheme"),
        ("theme-menu", "Colour"),
        ("layout-menu", "Layout"),
    ):
        assert f'id="{group_id}" data-setting="{setting}" aria-describedby="{group_id}-hint"' in dialog
        assert f'<p class="tb-settings__hint" id="{group_id}-hint">' in dialog
    assert "Your colours stay the same." in dialog
    assert "Your layout stays the same." in dialog


def test_the_colour_scheme_offers_match_device_light_and_dark():
    dialog = portal.settings_dialog()
    values = re.findall(r'name="tb-scheme" value="([^"]+)"', dialog)
    assert values == ["auto", "default", "slate"]
    assert "Match device" in dialog


def test_each_colour_card_carries_a_sample_of_its_bundle():
    dialog = portal.settings_dialog()
    for bundle in ordered_bundles():
        assert f'<span class="tb-swatch" data-swatch="{bundle.id}" aria-hidden="true">' in dialog
        assert escape(bundle.description) in dialog
    assert "tb-settings__option-note" not in dialog, "the internal palette names are back"
    for bundle in ordered_bundles():
        for scheme in ("light", "dark"):
            name = bundle.provenance[scheme]["name"]
            assert f">{escape(name)}<" not in dialog, f"{bundle.id}: {name} reaches the reader"


def test_the_choice_is_shown_by_a_mark_not_by_colour_alone():
    dialog = portal.settings_dialog()
    cards = dialog.count('class="tb-settings__card"')
    assert cards and dialog.count('class="tb-settings__mark" aria-hidden="true"><svg') == cards
    css = SETTINGS_CSS.read_text(encoding="utf-8")
    assert ".tb-settings__radio:checked + .tb-settings__card .tb-settings__mark svg" in css
    assert ".tb-settings__radio:focus-visible + .tb-settings__card" in css


def test_the_panel_announces_each_change_politely():
    dialog = portal.settings_dialog()
    assert (
        '<p class="tb-settings__status" id="tb-settings-status" role="status" aria-live="polite"></p>'
        in dialog
    )
    js = SETTINGS_JS.read_text(encoding="utf-8")
    assert "announce(describe(input))" in js
    assert 'group.dataset.setting + ": "' in js


def test_reset_appearance_is_a_button_that_clears_the_stored_choices():
    dialog = portal.settings_dialog()
    button = button_tag(dialog, "tb-settings-reset")
    assert 'type="button"' in button
    assert "Reset appearance</button>" in dialog
    js = SETTINGS_JS.read_text(encoding="utf-8")
    assert "prefs.reset()" in js
    assert '"Appearance reset."' in js
