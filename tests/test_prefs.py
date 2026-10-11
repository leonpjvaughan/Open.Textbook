"""Both reader preferences belong to the reader, not to the build.

Material scopes its palette storage to the root of each built site, so without a
bridge a choice made in one book is invisible to the others. The theme bundle is
ours outright, so it is simply stored and applied. These tests pin both: the
shared keys, the generated payload, where it is injected, and the landing page
reading and writing the same keys.
"""

from __future__ import annotations

import re

from textbook import pipeline, portal
from textbook.book import repo_root
from textbook.hooks import prefs as scheme
from textbook.themes import default_bundle, ordered_bundles

# The palette the Material shell declared, which the shared scheme choice is
# built from. It is a unit fixture now: the pipeline carries the two schemes in
# its own page template and has no Material palette to seed.
PALETTE = (
    {"media": "(prefers-color-scheme: light)", "scheme": "default"},
    {"media": "(prefers-color-scheme: dark)", "scheme": "slate"},
)


def base_config() -> dict:
    """The shape a hook config has: the palette and the bundle registry."""
    return {
        "theme": {"palette": [dict(entry) for entry in PALETTE]},
        "extra": {
            "themes": [bundle.id for bundle in ordered_bundles()],
            "default_theme": default_bundle().id,
        },
    }


def test_the_shared_key_is_not_scoped_to_a_path():
    """A path-scoped key would lose the reader's choice if the site moved."""
    key = scheme.SCHEME_KEY
    assert key and "/" not in key and not key.startswith(".")


def test_payload_follows_the_configured_palette():
    palette = scheme.palette_entries(base_config())
    assert [entry["scheme"] for entry in palette] == ["default", "slate"]


def test_snippet_offers_every_configured_scheme():
    snippet = scheme.snippet(base_config())
    assert scheme.SCHEME_KEY in snippet
    for entry in scheme.palette_entries(base_config()):
        assert f'"{entry["scheme"]}"' in snippet


def test_snippet_is_empty_without_a_real_palette():
    """A single-scheme site has no choice to remember."""
    assert scheme.snippet({"theme": {"palette": [{"scheme": "default"}]}}) == ""
    assert scheme.snippet({}) == ""
    assert scheme.snippet(None) == ""


def test_bridge_is_injected_into_the_head():
    output = "<html><head><title>t</title></head><body></body></html>"
    patched = scheme.on_post_page(output, None, base_config())
    assert scheme.SCHEME_KEY in patched
    assert patched.index(scheme.SCHEME_KEY) < patched.index("</head>")


def test_bridge_seeds_material_before_material_runs():
    """The bridge must use Material's own writer, so its storage scope and
    payload shape stay Material's business rather than ours."""
    snippet = scheme.snippet(base_config())
    assert "__md_set" in snippet
    assert "__palette" in snippet
    # Both halves: seed the stored choice, and record a new one.
    assert "setItem" in snippet
    assert "change" in snippet


def test_every_book_page_gets_the_bridge():
    """Every book page applies both preferences before the first paint."""
    template = pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8")
    for key in (scheme.SCHEME_KEY, scheme.THEME_KEY):
        assert key in template, f"the page template does not read {key}"
    # Before the stylesheets, so the chosen bundle paints with no flash.
    assert template.index(scheme.SCHEME_KEY) < template.index("themes.css")


def test_landing_page_honours_the_same_key():
    html = portal.render()
    assert scheme.SCHEME_KEY in html
    # Both directions: dark is applied, and an explicit light is respected.
    assert '"slate"' in html and '"default"' in html


def test_landing_page_can_write_the_preference_too():
    """A reader who picks a scheme on the landing page must get it in the books.

    The landing page loads the same Settings runtime the books use, and exposes
    the same ``window.textbookPrefs`` interface, so the write is the shared one
    rather than a second copy that could drift.
    """
    html = portal.render()
    assert "assets/settings/settings.js" in html, "the shared Settings runtime is not loaded"
    assert "window.textbookPrefs" in html, "the landing page does not expose the shared store"
    runtime = (repo_root() / "assets" / "settings" / "settings.js").read_text(encoding="utf-8")
    assert scheme.SCHEME_KEY in runtime, "the runtime never writes the shared scheme key"


def test_landing_control_is_hidden_without_javascript():
    """The control is inert without scripting, so it must not appear."""
    html = portal.render()
    trigger = re.search(r'<button\b[^>]*id="tb-settings"[^>]*>', html)
    assert trigger, "the landing page has no Settings trigger"
    assert "hidden" in trigger.group(0), "the trigger is visible before its script runs"


def test_every_reader_surface_reads_and_writes_the_key():
    """Books and the landing page must agree on reading and writing."""
    book_page = pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8")
    landing = portal.render()
    for surface, name in ((book_page, "a book page"), (landing, "the landing page")):
        assert scheme.SCHEME_KEY in surface, f"{name} does not read the shared key"
    # A book page reads the choice; the shared runtime records it, so there is
    # one writer rather than a second copy that could drift.
    runtime = (repo_root() / "assets" / "settings" / "settings.js").read_text(
        encoding="utf-8"
    )
    assert "localStorage.setItem" in runtime, "the runtime never records the choice"
