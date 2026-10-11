"""Both reader preferences belong to the reader, not to the build.

Material scopes its palette storage to the root of each built site, so without a
bridge a choice made in one book is invisible to the others. The theme bundle is
ours outright, so it is simply stored and applied. These tests pin both: the
shared keys, the generated payload, where it is injected, and the landing page
reading and writing the same keys.
"""

from __future__ import annotations

import re

import yaml

from textbook import portal, scaffold
from textbook.book import discover_books, repo_root
from textbook.hooks import prefs as scheme

BASE_YML = repo_root() / "renderers" / "mkdocs" / "base.yml"


def base_config() -> dict:
    """The shared MkDocs config, as MkDocs would hand it to a hook."""
    return yaml.safe_load(BASE_YML.read_text(encoding="utf-8")) or {}


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


def test_every_book_build_gets_the_bridge():
    """The hook runs from base.yml, which every generated config inherits."""
    assert "hooks/entry.py" in BASE_YML.read_text(encoding="utf-8")
    for book in discover_books():
        for profile in book.profiles:
            config = yaml.safe_load(
                scaffold.config_path(book, profile.id).read_text(encoding="utf-8")
            )
            assert config.get("INHERIT") == "base.yml"


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
    book_page = scheme.snippet(base_config())
    landing = portal.render()
    for surface, name in ((book_page, "a book page"), (landing, "the landing page")):
        assert scheme.SCHEME_KEY in surface, f"{name} does not read the shared key"
    assert "setItem" in book_page, "a book page does not record the choice"
    # The landing page records it through the shared runtime, whose writer is
    # localStorage.setItem; the landed page itself only needs to load it.
    runtime = (repo_root() / "assets" / "settings" / "settings.js").read_text(encoding="utf-8")
    assert "localStorage.setItem" in runtime, "the landing runtime never records the choice"
