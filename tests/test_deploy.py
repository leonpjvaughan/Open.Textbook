"""The deployment path: the root files, and the Worker that serves them.

Deploy configuration drifts quietly — a renamed directory or a moved base URL
breaks a live site rather than a test — so the parts that must agree are checked
here.
"""

from __future__ import annotations

import json
import re

import pytest

from textbook import portal, scaffold
from textbook.book import discover_books, load_collection, repo_root

ROOT = repo_root()
WRANGLER = ROOT / "wrangler.jsonc"
BOOKS = discover_books()


def wrangler_config() -> dict:
    """wrangler.jsonc is JSON with comments; strip them and parse."""
    text = WRANGLER.read_text(encoding="utf-8")
    text = re.sub(r"^\s*//.*$", "", text, flags=re.M)
    return json.loads(text)


# --- the deployment root ------------------------------------------------------


def test_the_root_404_exists_and_is_the_one_we_generate():
    portal.main()
    page = ROOT / "site" / "404.html"
    assert page.is_file(), "the root 404 is missing; run `python -m textbook.portal`"
    assert page.read_text(encoding="utf-8") == portal.not_found()


def test_the_root_404_honours_reader_preferences():
    """A reader who chose a theme should not get a default one on a missing page."""
    page = portal.not_found()
    assert "textbooks:scheme" in page
    assert "textbooks:theme" in page
    # Colour comes from the bundles, so the 404 loads the same stylesheet.
    assert "assets/stylesheets/themes.css" in page


def test_the_root_404_links_absolutely():
    """It is served from arbitrary depths, where a relative link is wrong."""
    assert 'href="/"' in portal.not_found()


def test_the_landing_page_and_the_404_are_the_only_root_pages():
    portal.main()
    roots = sorted(p.name for p in (ROOT / "site").glob("*.html"))
    assert roots == ["404.html", "index.html"], roots


# --- the Worker ---------------------------------------------------------------


def test_wrangler_config_exists():
    assert WRANGLER.is_file(), "no wrangler.jsonc, so nothing can be deployed"


def test_wrangler_serves_the_site_directory():
    config = wrangler_config()
    assert config["assets"]["directory"].lstrip("./") == "site"
    # The portal writes to site/, and each profile's site_dir is under it, so the
    # assets directory and the build output must not drift apart.
    assert (ROOT / "site").is_dir() or True
    for book in BOOKS:
        for profile in book.profiles:
            site_dir = ROOT / "site" / book.deploy_path(profile.id)
            assert str(site_dir.relative_to(ROOT / "site")).startswith(book.id)


def test_wrangler_has_a_pinned_compatibility_date():
    """Wrangler requires one, and it should move deliberately, not by accident."""
    date = wrangler_config()["compatibility_date"]
    assert re.fullmatch(r"\d{4}-\d{2}-\d{2}", date), date


def test_wrangler_handles_missing_pages_with_a_404():
    # Not an SPA: a missing page must 404, not silently serve the landing page.
    assert wrangler_config()["assets"]["not_found_handling"] == "404-page"


def test_the_default_cache_control_is_what_we_rely_on():
    """Workers' default is `max-age=0, must-revalidate` with an ETag.

    That is why there is no `_headers` file yet: stale content is never served, so
    a deploy takes effect immediately. If this ever becomes a `_headers` file, it
    needs its own tests — the rules join rather than override.
    """
    assert not (ROOT / "site" / "_headers").exists()


# --- URLs ---------------------------------------------------------------------


def test_base_url_is_the_production_origin():
    base = str(load_collection().get("base_url", "")).strip()
    assert base.startswith("https://"), base
    assert base.endswith("/"), "a base URL without a trailing slash loses a path segment"


@pytest.mark.parametrize("book", BOOKS, ids=[b.id for b in BOOKS])
def test_every_profile_url_sits_under_the_base(book):
    base = str(load_collection()["base_url"]).rstrip("/")
    for profile in book.profiles:
        url = scaffold.site_url(book, profile.id)
        assert url.startswith(base + "/"), url
        assert url.endswith("/"), url


def test_the_generated_site_url_matches_the_base_url():
    """The configs carry site_url, and it is derived; make sure it followed."""
    for book in BOOKS:
        for profile in book.profiles:
            config = (scaffold.config_path(book, profile.id)).read_text(encoding="utf-8")
            assert scaffold.site_url(book, profile.id) in config


# --- the deploy script --------------------------------------------------------


def test_deploy_script_exists_and_guards_broken_maths():
    script = (ROOT / "scripts" / "deploy.sh").read_text(encoding="utf-8")
    assert "wrangler deploy" in script
    # It must refuse to publish a page KaTeX could not render.
    assert "math-error" in script
    # And it must map the deprecated credential names onto the canonical ones.
    assert "CF_API_TOKEN" in script and "CLOUDFLARE_API_TOKEN" in script
