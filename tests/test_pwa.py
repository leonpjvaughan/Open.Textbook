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

import hashlib
import struct

import json
import re
from xml.etree import ElementTree

from textbook import headers, pipeline, portal
from textbook.book import repo_root

ROOT = repo_root()
ASSETS = ROOT / "assets"
SITE = ROOT / "site"
SW = ASSETS / "sw.js"
REGISTER = ASSETS / "settings" / "service-worker.js"
ICON = ASSETS / "icons" / "app-icon.svg"
FAVICON = ASSETS / "icons" / "favicon.svg"
APPLE_TOUCH = ASSETS / "icons" / "apple-touch-icon.png"

#: The SHA-256 of `app-icon.svg` when `apple-touch-icon.png` was drawn from it.
#: A committed raster is the one place a generated file goes stale unnoticed,
#: so the source is pinned rather than trusted. See assets/icons/README.md.
APP_ICON_SHA256 = "d72c5fcf1db2d912e78c6ead229d4fa4980b9b6e1cc18fa3b2299bc33dd2803f"


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


# --- the tab icon -------------------------------------------------------------


def svg_colours(source: str) -> set[str]:
    """Every hex colour a stylesheet-free SVG declares."""
    return {colour.lower() for colour in re.findall(r"#[0-9a-fA-F]{3,8}\b", source)}


def test_the_tab_icon_is_drawn_in_the_house_ink_and_paper():
    """One motif, one palette, two files.

    An icon is a fixed image, so it cannot follow the reader's bundle or scheme
    the way a page does. It is drawn once in the collection's own ink and paper
    instead. Pinning the tab icon to the launcher icon's palette is what stops
    the two from drifting into two different brands.
    """
    launcher = svg_colours(ICON.read_text(encoding="utf-8"))
    tab = svg_colours(FAVICON.read_text(encoding="utf-8"))
    assert launcher, "the launcher icon declares no colour at all"
    assert tab, "the tab icon declares no colour at all"
    assert tab <= launcher, (
        f"the tab icon uses colours the launcher icon does not: {sorted(tab - launcher)}"
    )


def test_neither_icon_reaches_for_a_theme_token():
    """`var(--tb-*)` cannot resolve inside an image, so a token here is a bug."""
    for path in (ICON, FAVICON):
        assert "var(--tb-" not in path.read_text(encoding="utf-8"), path.name


def test_the_tab_icon_is_square_and_full_bleed():
    """Square, and grounded to the edges.

    The icon is drawn on a square 64 grid at whole-unit sizes so that the gutter
    between the two pages lands on a whole pixel at 16 and 32: that gutter is the
    spine. The ground is full bleed so the glyph still reads on a dark tab, where
    the ink square disappears into the chrome.
    """
    root = ElementTree.fromstring(FAVICON.read_text(encoding="utf-8"))
    assert root.get("viewBox") == "0 0 64 64"
    ground = [
        element
        for element in root
        if element.tag.endswith("rect")
        and element.get("width") == "64"
        and element.get("height") == "64"
    ]
    assert ground, "the tab icon has no full-bleed ground"


def test_every_page_shell_links_the_tab_icon():
    page = pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8")
    assert 'rel="icon" type="image/svg+xml" href="${prefix}assets/icons/favicon.svg"' in page
    assert 'rel="icon" type="image/svg+xml" href="assets/icons/favicon.svg"' in portal.render()
    # A 404 is served from arbitrary depths, so it links absolutely like its CSS.
    assert 'rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg"' in portal.not_found()


def test_the_tab_icon_is_shipped_by_the_portal():
    portal.main()
    assert (SITE / "assets" / "icons" / "favicon.svg").read_bytes() == FAVICON.read_bytes()


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
    """The update path exists, whatever the receiver is called.

    These asserted `self.skipWaiting()` — a **source spelling**, not the behaviour. The
    worker now names its scope `scope` (a `ServiceWorkerGlobalScope`, which is not a
    `Window`, so the type has to be stated once), and `scope` *is* `self`; nothing
    changed at runtime and the test failed. A test that breaks on a rename and passes on
    a behaviour change is pinned to the wrong thing.
    """
    source = SW.read_text(encoding="utf-8")
    assert ".skipWaiting()" in source
    assert ".clients.claim()" in source
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
    template = pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8")
    assert '<link rel="manifest" href="/manifest.webmanifest">' in template
    assert 'src="/assets/settings/service-worker.js"' in template
    assert "defer" in template, "an eager script would delay the page"


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
        "assets/icons/favicon.svg",
    ):
        assert (SITE / relative).is_file(), f"{relative} is not in site/"
    assert (SITE / "manifest.webmanifest").read_text(encoding="utf-8") == portal.manifest()
    assert (SITE / "sw.js").read_text(encoding="utf-8") == portal.service_worker()


# --- the iOS home-screen icon -------------------------------------------------


def test_the_ios_icon_is_a_png_ios_will_accept():
    """180x180, RGB, no alpha — the shape iOS asks for and does not mask.

    Without an `apple-touch-icon`, iOS ignores the manifest and puts a screenshot
    of the page on the home screen.
    """
    assert APPLE_TOUCH.is_file(), (
        "no apple-touch-icon.png; an iOS home screen falls back to a page "
        "screenshot. See assets/icons/README.md"
    )
    data = APPLE_TOUCH.read_bytes()
    assert data[:8] == b"\x89PNG\r\n\x1a\n", "not a PNG"
    width, height = struct.unpack(">II", data[16:24])
    assert (width, height) == (180, 180), f"{width}x{height}, expected 180x180"
    # Colour type 2 is truecolour RGB. Alpha (6) would leave iOS guessing at the
    # background, since it applies no mask to this icon.
    assert data[25] == 2, "the iOS icon should be RGB with no alpha channel"


def test_the_ios_icon_cannot_drift_from_the_svg_it_was_drawn_from():
    """A committed raster is the one generated file that can go stale quietly.

    Nothing rebuilds it, so the source's hash is pinned here. Change the SVG and
    this fails with the command that redraws the PNG, instead of shipping an icon
    that no longer matches the home-screen tile.
    """
    digest = hashlib.sha256(ICON.read_bytes()).hexdigest()
    assert digest == APP_ICON_SHA256, (
        "app-icon.svg changed, so apple-touch-icon.png is stale. Redraw it with:\n"
        "  rsvg-convert -w 180 -h 180 assets/icons/app-icon.svg "
        "-o assets/icons/apple-touch-icon.png\n"
        "then update APP_ICON_SHA256 in this file."
    )
