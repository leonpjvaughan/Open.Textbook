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

import pytest

from textbook import headers, pipeline, portal
from textbook import book as books
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


@pytest.fixture(scope="module")
def built_site(tmp_path_factory):
    """One real chapter, built for real.

    A chapter rather than a whole book: the manifest is the same shape either way,
    and this test is about the *shape* — every page listed, every size the page's.
    The whole-book download is checked in a browser by `tools offline --download`,
    against a full build, because that is where the question lives.
    """
    from textbook import pipeline

    out = tmp_path_factory.mktemp("pwa") / "book"
    pipeline.build("gcse-maths", "higher", out=out, chapter=1, index=False)
    return out


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
    # A versioned cache is what makes the update path a deploy, not a hope — but it
    # is now only the *runtime* cache that is versioned. The cache that holds pages
    # and content-addressed assets must not carry the build label, or a deploy would
    # take away the book a reader downloaded.
    assert 'var RUNTIME = PREFIX + "runtime-" + VERSION;' in emitted
    assert 'var SITE = PREFIX + "site";' in emitted


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
    # And it is the strategy the navigation branch actually uses — against the cache
    # that survives a deploy, because a page is not a stable name.
    fetch_handler = function_body(source, "onFetch")
    assert 'request.mode === "navigate"' in fetch_handler
    assert "event.respondWith(networkFirst(request, SITE))" in fetch_handler


def test_addressed_assets_are_cache_first_and_kept():
    """The name is the bytes, so the cache can decide — and a deploy leaves it alone."""
    source = SW.read_text(encoding="utf-8")
    body = function_body(source, "cacheFirst")
    assert body.index("cache.match(request)") < body.index("fetch(request)")
    fetch_handler = function_body(source, "onFetch")
    assert "ADDRESSED.test(url.pathname)" in fetch_handler
    assert "event.respondWith(cacheFirst(request, SITE))" in fetch_handler


def test_the_addressed_pattern_is_the_one_the_build_writes(tmp_path):
    """The worker's regex and `scaffold.addressed_name` are one rule in two places.

    A worker that does not recognise an addressed name puts it in the runtime cache,
    which a deploy deletes — so a downloaded book would silently stop resolving its
    stylesheet. This is the test that ties the two together.
    """
    from textbook import scaffold

    source = SW.read_text(encoding="utf-8")
    written = re.search(r"var ADDRESSED = /(.+?)/;", source)
    assert written, "the worker has no ADDRESSED pattern"
    # The pattern is JavaScript, but it is also a plain regular expression: compile
    # it as written rather than paraphrasing it here, so this test cannot pass
    # against a copy of the rule instead of the rule.
    pattern = re.compile(written.group(1))

    for name in ("themes.css", "ch10-nth-term.js", "app-icon.svg", "apple-touch-icon.png"):
        sheet = tmp_path / name
        sheet.write_bytes(b"x")
        assert pattern.search("/assets/" + scaffold.addressed_name(sheet)), name
        assert not pattern.search("/assets/" + name), name


def test_stable_named_static_assets_are_cache_first_in_the_runtime_cache():
    """The six names that cannot be addressed are versioned instead."""
    source = SW.read_text(encoding="utf-8")
    fetch_handler = function_body(source, "onFetch")
    assert "STATIC_DESTINATIONS[request.destination]" in fetch_handler
    assert "event.respondWith(cacheFirst(request, RUNTIME))" in fetch_handler


def test_pagefind_is_revalidated_rather_than_cached():
    """Its names are pagefind's, so the network decides for it.

    `pagefind.js` is imported by name from the page and the index is fetched by
    pagefind's own code with relative URLs, so nothing can address it without
    rewriting pagefind's output. Cache-first would serve a month-old script beside a
    fresh index — a search that ranks pages that no longer exist — and the payload is
    2–3 MB per book, which is not something to hold until the next deploy.
    """
    source = SW.read_text(encoding="utf-8")
    fetch_handler = function_body(source, "onFetch")
    pagefind = fetch_handler.index('"/pagefind/"')
    static = fetch_handler.index("STATIC_DESTINATIONS[request.destination]")
    assert pagefind < static, "the pagefind branch must run before the cache-first one"
    assert "networkFirst(request, RUNTIME)" in fetch_handler[pagefind:static]


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
    # Old runtime caches are deleted on activate, so a deploy cannot leave one
    # behind — and the site cache is exempt, which is the whole point of the split.
    prune = function_body(source, "prune")
    assert "caches.delete(key)" in prune
    assert "key !== SITE" in prune
    assert "key !== RUNTIME" in prune
    assert "require(" not in source, "the worker must be self-contained"


def test_a_deploy_cannot_delete_a_downloaded_book():
    """The one behaviour the split exists for, stated as an assertion.

    `activate` may delete every runtime cache it likes; it may not delete the cache
    that holds pages and addressed assets, and it may not delete it "as a version"
    either — that cache has no version in its name.
    """
    source = SW.read_text(encoding="utf-8")
    assert 'var SITE = PREFIX + "site";' in source
    prune = function_body(source, "prune")
    assert "key !== SITE" in prune
    # Nothing else in the worker deletes a whole cache: the only other delete is the
    # age-based one, entry by entry.
    for name in ("onInstall", "onActivate", "onFetch", "networkFirst", "cacheFirst"):
        assert "caches.delete(" not in function_body(source, name), name


def test_the_site_cache_is_pruned_by_age_not_by_deploy():
    """Unbounded growth is the cost of a cache no deploy clears, so it is bounded."""
    source = SW.read_text(encoding="utf-8")
    prune = function_body(source, "prune")
    assert 'headers.get("date")' in prune, "no Date, no idea how old an entry is"
    assert "MAX_AGE" in prune
    assert "cache.delete(request)" in prune


def test_a_page_is_a_page_however_it_is_fetched():
    """The routing rule the chapter prefetch depends on.

    A prefetched chapter is fetched by the page, not navigated to, so its `destination`
    is empty. If the worker routed on destination alone, every prefetched page would
    land in the cache a deploy deletes — and the whole point of keeping a chapter would
    evaporate on the next release. The site's routes are directories, so shape decides.
    """
    source = SW.read_text(encoding="utf-8")
    fetch_handler = function_body(source, "onFetch")
    routing = fetch_handler[fetch_handler.index("request.mode") :]
    assert 'request.mode === "navigate" || url.pathname.endsWith("/")' in routing
    assert "networkFirst(request, SITE)" in routing


def test_the_chapter_prefetch_is_optional_and_cheap():
    """It must never cost a reader their data budget, and never delay a page.

    Three promises, each one a line a future edit could remove: it is deferred, it
    stops on a metered or slow connection, and it fetches one chapter of pages rather
    than a book.
    """
    loader = (repo_root() / "assets" / "offline" / "offline.js").read_text(encoding="utf-8")
    assert "saveData" in loader, "a reader who asked not to be metered is still metered"
    assert "slow-2g|2g|3g" in loader, "a slow connection is not excluded"
    assert "requestIdleCallback" in loader, "the prefetch would compete with the page"
    assert "LIMIT" in loader, "no cap on how many pages one nav can ask for"
    assert "a[href]" in loader, "the page list is not taken from the nav"
    # And nothing in it is a colour: it is a network decision, not a drawing.
    assert not re.search(r"#[0-9a-fA-F]{3,8}\b", loader), "a colour literal reached the prefetch"

    template = pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8")
    assert '$offline_js" defer' in template, "the prefetch is not deferred"

    from textbook import scaffold

    assert "assets/offline/offline.js" in scaffold.SHARED_FILES, (
        "the prefetch is not declared shared, so the build does not ship it"
    )


def test_the_manifest_is_a_download_list(built_site):
    """Every page, and its bytes: the number a reader is shown comes from here."""
    import json

    out = built_site
    data = json.loads((out / "assets" / "manifest.json").read_text(encoding="utf-8"))
    assert data["pages"], "the manifest lists no pages, so nothing can be downloaded"
    assert data["bytes"] == sum(data["pages"].values())
    # Each listed route is a page the build wrote, and each size is that page's.
    for route, size in data["pages"].items():
        page = out / route.lstrip("/") / "index.html"
        assert page.is_file(), f"{route} is in the manifest and not in the build"
        assert size == page.stat().st_size, f"{route} is {page.stat().st_size} bytes on disk"
        assert size > 1000, f"{route} is {size} bytes, which is not a page"


def test_the_offline_control_is_only_offered_where_there_is_a_book():
    """A landing page has nothing to keep, so it offers nothing to keep."""
    landing = portal.settings_dialog()
    assert "tb-offline-download" not in landing
    page = portal.settings_dialog(book=books.book_by_id("gcse-maths"))
    assert 'id="tb-offline-download" hidden' in page
    assert 'data-offline-book="gcse-maths"' in page
    # Hidden in the markup and revealed by script, like the Settings trigger: a
    # reader without JavaScript sees no control rather than a dead one.
    assert "hidden" in page


def test_the_download_is_stoppable_and_asks_for_persistent_storage():
    """Three promises in `offline.js` that a rewrite could quietly drop."""
    loader = (repo_root() / "assets" / "offline" / "offline.js").read_text(encoding="utf-8")
    assert "AbortController" in loader and ".abort()" in loader, "a download cannot be stopped"
    assert "storage.persist()" in loader, "nothing asks the browser to keep the book"
    assert "storage.estimate()" in loader, "the size is never checked against the device"
    assert "manifest.bytes * 1.2" in loader or "plan.bytes * 1.2" in loader, (
        "no headroom is left between what the book needs and what the device has"
    )
    assert 'manifest.json' in loader
    # The build's own list, not the sidebar: a download is every page, including the
    # ones the reader has not opened.
    assert "plan.pages" in loader


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
    # Content-addressed, so the template names a slot the build fills.
    assert 'src="$worker_script"' in template
    assert "defer" in template, "an eager script would delay the page"


def test_the_landing_page_is_installable_too():
    html = portal.render()
    assert '<link rel="manifest" href="/manifest.webmanifest">' in html
    assert portal.root_links(rooted=False)["worker_script"] in html


# --- the portal ships every new asset -----------------------------------------


def test_the_portal_copies_the_new_assets_into_the_site():
    portal.main()
    addressed = portal.root_assets()
    for relative in portal.ROOT_ASSETS:
        assert (SITE / addressed[relative]).is_file(), f"{relative} is not in site/"
    # And under no other name: a stable-named copy is exactly what this scheme
    # removes, because nothing would ever invalidate it.
    for relative in portal.ROOT_ASSETS:
        assert not (SITE / relative).exists(), f"{relative} was written unaddressed"
    for relative in (
        "assets/icons/app-icon.svg",
        "assets/icons/favicon.svg",
    ):
        assert (SITE / relative).is_file(), f"{relative} is not in site/"
    root_manifest = json.loads((SITE / "assets" / "manifest.json").read_text(encoding="utf-8"))
    assert root_manifest["assets"] == addressed
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
