"""Installable and readable offline: the manifest, the service worker, and the
caching decision that keeps a deploy immediate.

The site relies on Workers' ``Cache-Control: public, max-age=0, must-revalidate``
so that a deploy takes effect at once and a reader never sees a page from before
a fix. A service worker can destroy that guarantee by serving cached HTML, so the
strategy is pinned here: **navigations are network-first, static assets are
cache-first, the cache name carries the build label, and the update path is
explicit.** The privacy of the manifest and the no-JavaScript promise are pinned
too, because both are easy to regress by accident.
"""

from __future__ import annotations

import json
import re

from textbook import headers, portal
from textbook.book import repo_root

ROOT = repo_root()
ASSETS = ROOT / "assets"
SITE = ROOT / "site"
SW = ASSETS / "sw.js"
REGISTER = ASSETS / "settings" / "service-worker.js"
ICON = ASSETS / "icons" / "app-icon.svg"
OVERRIDES = ROOT / "renderers" / "mkdocs" / "overrides"
PWA_PARTIAL = OVERRIDES / "partials" / "pwa.html"
MAIN_HTML = OVERRIDES / "main.html"


def function_body(source: str, name: str) -> str:
    """The body of a top-level ``function name(...) { ... }`` in the worker."""
    match = re.search(r"function " + re.escape(name) + r"\(.*?\n\}", source, re.S)
    assert match, f"no function {name}() in the service worker"
    return match.group(0)


# --- the manifest -------------------------------------------------------------


def test_the_manifest_is_valid_and_installable():
    data = json.loads(portal.manifest())
    for key in ("name", "short_name", "start_url", "scope", "display", "icons"):
        assert data.get(key), f"the manifest is missing {key}"
    assert data["display"] in {"standalone", "fullscreen", "minimal-ui"}
    # Site-root scope, because the portal emits it at the deployment root and the
    # root is ours; this is what lets one app cover every book.
    assert data["start_url"] == "/"
    assert data["scope"] == "/"


def test_the_manifest_declares_no_colour():
    """A launcher is fixed, but the app must not claim a bundle-dependent colour.

    ``theme_color`` and ``background_color`` cannot follow the reader's bundle or
    scheme, so they are deliberately absent rather than hard-coded.
    """
    data = json.loads(portal.manifest())
    assert "theme_color" not in data
    assert "background_color" not in data


def test_the_manifest_icon_exists_and_is_maskable():
    icon = json.loads(portal.manifest())["icons"][0]
    assert icon["src"] == "/assets/icons/app-icon.svg"
    assert icon["type"] == "image/svg+xml"
    assert "maskable" in icon["purpose"]
    # The file the manifest names must be shipped, or install 404s.
    assert ICON.is_file(), "the manifest names an icon that does not exist"


def test_the_manifest_link_and_worker_are_allowed_by_the_policy():
    policy = headers.HEADERS["Content-Security-Policy"]
    assert "manifest-src 'self'" in policy
    assert "worker-src 'self'" in policy


# --- the service worker and its update path -----------------------------------


def test_the_worker_is_emitted_at_the_root_so_its_scope_is_the_site():
    portal.main()
    assert (SITE / "sw.js").is_file(), "no site/sw.js; run `python -m textbook.portal`"
    assert (SITE / "manifest.webmanifest").is_file()


def test_the_portal_stamps_the_build_label_into_the_cache_name():
    source = SW.read_text(encoding="utf-8")
    assert portal.SW_PLACEHOLDER in source, "the worker must carry the placeholder"
    emitted = portal.service_worker()
    assert portal.SW_PLACEHOLDER not in emitted
    label = re.sub(r"[^A-Za-z0-9._-]", "-", portal.build_label() or "dev")
    assert f'var VERSION = "{label}";' in emitted
    # A versioned cache is what makes the update path a deploy, not a hope.
    assert "var CACHE = PREFIX + VERSION;" in emitted


def test_the_cache_name_changes_with_the_build(monkeypatch):
    monkeypatch.setenv("BUILD_COMMIT", "a" * 40)
    monkeypatch.setenv("BUILD_TAG", "26.284.3")
    first = portal.service_worker()
    monkeypatch.setenv("BUILD_TAG", "26.284.4")
    second = portal.service_worker()
    assert first != second, "a new release must ship a new cache name"


def test_navigations_are_network_first():
    """The one rule that keeps a deploy immediate: the network always wins."""
    source = SW.read_text(encoding="utf-8")
    body = function_body(source, "networkFirst")
    assert body.index("fetch(request)") < body.index("caches.match(request)")
    # And it is the strategy the navigation branch actually uses.
    fetch_handler = function_body(source, "onFetch")
    assert 'request.mode === "navigate"' in fetch_handler
    assert "event.respondWith(networkFirst(request))" in fetch_handler


def test_static_assets_are_cache_first():
    source = SW.read_text(encoding="utf-8")
    body = function_body(source, "cacheFirst")
    assert body.index("caches.match(request)") < body.index("fetch(request)")
    fetch_handler = function_body(source, "onFetch")
    assert "STATIC_DESTINATIONS[request.destination]" in fetch_handler
    assert "event.respondWith(cacheFirst(request))" in fetch_handler


def test_the_worker_has_an_explicit_update_path():
    source = SW.read_text(encoding="utf-8")
    assert "self.skipWaiting()" in source
    assert "self.clients.claim()" in source
    # Old caches are deleted on activate, so a deploy cannot leave one behind.
    activate = function_body(source, "onActivate")
    assert "caches.delete(key)" in activate
    assert "key !== CACHE" in activate
    assert "require(" not in source, "the worker must be self-contained"


def test_the_worker_only_touches_same_origin_get_requests():
    """A worker that intercepts everything is a worker that breaks something."""
    source = SW.read_text(encoding="utf-8")
    handler = function_body(source, "onFetch")
    assert 'request.method !== "GET"' in handler
    assert "url.origin !== self.location.origin" in handler


def test_the_worker_registers_but_never_blocks_the_page():
    script = REGISTER.read_text(encoding="utf-8")
    assert 'navigator.serviceWorker.register("/sw.js")' in script
    # Feature-detected, and a failure is swallowed: offline support is an
    # enhancement, not a dependency.
    assert '"serviceWorker" in navigator' in script
    assert ".catch(" in script


# --- it reaches the book pages ------------------------------------------------


def test_the_book_template_adds_the_manifest_and_the_registration():
    partial = PWA_PARTIAL.read_text(encoding="utf-8")
    assert '<link rel="manifest" href="/manifest.webmanifest">' in partial
    assert 'src="/assets/settings/service-worker.js"' in partial
    assert "defer" in partial, "an eager script would delay the page"


def test_the_book_template_override_is_materials_with_one_head_block():
    text = MAIN_HTML.read_text(encoding="utf-8")
    assert '{% extends "base.html" %}' in text, "the override must stay Material's template"
    assert "extrahead" in text
    assert '{% include "partials/pwa.html" %}' in text


def test_the_landing_page_is_installable_too():
    html = portal.render()
    assert '<link rel="manifest" href="/manifest.webmanifest">' in html
    assert "assets/settings/service-worker.js" in html


# --- the portal ships every new asset -----------------------------------------


def test_the_portal_copies_the_new_assets_into_the_site():
    portal.main()
    for relative in (
        "assets/stylesheets/settings.css",
        "assets/settings/settings.js",
        "assets/settings/service-worker.js",
        "assets/icons/app-icon.svg",
    ):
        assert (SITE / relative).is_file(), f"{relative} is not in site/"
    assert (SITE / "manifest.webmanifest").read_text(encoding="utf-8") == portal.manifest()
    assert (SITE / "sw.js").read_text(encoding="utf-8") == portal.service_worker()
