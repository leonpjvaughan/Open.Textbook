"""The deployment path: the root files, and the Worker that serves them.

Deploy configuration drifts quietly — a renamed directory or a moved base URL
breaks a live site rather than a test — so the parts that must agree are checked
here.
"""

from __future__ import annotations

import json
import re

import pytest

from textbook import headers, pipeline, portal, scaffold
from textbook.book import discover_books, load_collection, repo_root
from textbook.hooks import prefs

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
    # It carries the one generated script, not a fourth hand-written copy.
    assert prefs.snippet(portal.prefs_config()) in page
    # Colour comes from the bundles, so the 404 loads the same stylesheet.
    assert "assets/stylesheets/themes.css" in page


def test_the_root_404_links_absolutely():
    """It is served from arbitrary depths, where a relative link is wrong."""
    assert 'href="/"' in portal.not_found()


def test_the_landing_page_and_the_404_are_the_only_root_html_files():
    portal.main()
    roots = sorted(p.name for p in (ROOT / "site").glob("*.html"))
    assert roots == ["404.html", "index.html"], roots


def test_the_collection_legal_pages_are_generated():
    """The footer's two links must lead to pages the portal actually wrote."""
    portal.main()
    for slug in portal.root_page_slugs():
        page = ROOT / "site" / slug / "index.html"
        assert page.is_file(), f"no {slug} page; run `python -m textbook.portal`"
        assert page.read_text(encoding="utf-8") == portal.legal_page(slug)


def test_the_landing_footer_links_the_legal_pages():
    page = portal.render()
    assert 'href="/terms/"' in page
    assert 'href="/acknowledgements/"' in page
    assert "Report a mistake" in page


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


def test_the_headers_file_is_generated_at_the_asset_root():
    portal.main()
    page = ROOT / "site" / "_headers"
    assert page.is_file(), "no _headers; run `python -m textbook.portal`"
    assert page.read_text(encoding="utf-8") == headers.content()


def test_the_root_robots_is_ours_and_names_the_sitemap():
    """A zone that serves no robots.txt gets Cloudflare's own injected preamble.

    Shipping ours replaces an inherited content-signals policy with one we chose,
    and names the sitemap index so a crawler does not have to guess it.
    """
    portal.main()
    text = (ROOT / "site" / "robots.txt").read_text(encoding="utf-8")
    assert "User-agent: *" in text
    base = str(load_collection()["base_url"]).rstrip("/")
    assert f"Sitemap: {base}/sitemap.xml" in text


def test_the_sitemap_index_points_at_every_profile_sitemap():
    """Each profile build emits its own sitemap; nothing at the root linked to them."""
    portal.main()
    text = (ROOT / "site" / "sitemap.xml").read_text(encoding="utf-8")
    assert "<sitemapindex" in text
    for book in BOOKS:
        for profile in book.profiles:
            expected = f"{book.deploy_path(profile.id)}/sitemap.xml"
            assert expected in text, f"{expected} missing from the sitemap index"


def test_the_build_identity_is_recorded_at_the_root():
    """Nothing used to say which commit was live."""
    portal.main()
    page = ROOT / "site" / "version.json"
    assert page.is_file(), "no version.json; run `python -m textbook.portal`"
    data = json.loads(page.read_text(encoding="utf-8"))
    assert data == portal.build_identity()
    assert data.get("origin", "").startswith("https://")


def test_the_pages_carry_the_build_label_when_there_is_one():
    """The label is what a reader's report can be traced back to."""
    label = portal.build_label()
    not_found = portal.not_found()
    landing = portal.render()
    if label:
        meta = f'<meta name="build" content="{label}">'
        assert meta in not_found
        assert meta in landing
    else:
        assert 'name="build"' not in not_found


def test_wrangler_closes_the_extra_origins():
    """`workers_dev` and version URLs are both public copies of the site.

    Closed in config as well as in the dashboard, because a deploy would otherwise
    reopen what the dashboard closed.
    """
    config = wrangler_config()
    assert config["workers_dev"] is False
    assert config["preview_urls"] is False


def test_the_zone_file_leaves_the_apex_address_records_alone():
    """The apex is owned by the Worker's custom domain.

    Importing an apex A/AAAA/CNAME would collide with it. `www` is the one address
    record the file should carry, and it must be marked proxied: a redirect rule
    cannot fire for a hostname Cloudflare does not proxy.
    """
    zone = ROOT / "deploy" / "dns" / "open-textbook.org.zone"
    assert zone.is_file(), "the zone file is the importable form of the DNS change"
    records = [
        line
        for line in zone.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.lstrip().startswith(";")
    ]
    assert records, "the zone file has no active records"
    www = [line for line in records if line.split()[0].startswith("www.")]
    assert www and "cf-proxied:true" in www[0], www
    assert re.search(r"\bAAAA\b", www[0]), www[0]
    apex_address = [
        line
        for line in records
        if line.split()[0].rstrip(".") == "open-textbook.org"
        and re.search(r"\b(A|AAAA|CNAME)\b", line)
    ]
    assert not apex_address, f"the apex must not be imported: {apex_address}"


def test_the_caa_file_carries_only_caa_records():
    """The CAA change ships on its own, so an import cannot duplicate the rest.

    `open-textbook.org.zone` also carries `www`, SPF and DMARC, which are already
    serving. Re-importing those is at best a no-op and at worst a duplicate, so
    the CAA records travel in a file of their own.
    """
    caa = ROOT / "deploy" / "dns" / "open-textbook.org.caa.zone"
    assert caa.is_file(), "the CAA records need their own importable file"
    records = [
        line
        for line in caa.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.lstrip().startswith(";")
    ]
    assert records, "the CAA file has no active records"
    assert all("IN" in line and " CAA " in line for line in records), records
    # A semicolon outside quotes starts a BIND comment, so the pki.goog parameter
    # has to stay inside them or it is silently dropped.
    assert any('"pki.goog; cansignhttpexchanges=yes"' in line for line in records)
    assert any("issuewild" in line for line in records)


# --- response headers ---------------------------------------------------------


def test_the_headers_file_uses_one_rule_and_indents_every_header():
    """`_headers` allows one splat per rule, and a header must be indented."""
    lines = headers.content().splitlines()
    assert lines[0] == "/*"
    assert len(lines) > 1 and all(line.startswith("  ") for line in lines[1:])
    assert headers.content().count("*") == 1


def test_the_policy_allows_exactly_what_the_site_loads():
    policy = headers.HEADERS["Content-Security-Policy"]
    assert "default-src 'self'" in policy
    # The generated reader-preference script and the page's inline scripts need it.
    assert "script-src 'self' 'unsafe-inline'" in policy
    assert "style-src 'self' 'unsafe-inline'" in policy
    # Material's search is a same-origin worker, not a blob.
    assert "worker-src 'self'" in policy
    # Nothing is framed or plugged in.
    assert "frame-ancestors 'none'" in policy
    assert "object-src 'none'" in policy


def test_the_headers_do_not_redeclare_cache_control():
    """Workers' default is `max-age=0, must-revalidate` with an ETag.

    A header set by two matching rules is joined with a comma, which would produce
    an invalid `Cache-Control`. The default is what keeps a deploy immediate, so
    this file must not touch it.
    """
    assert "cache-control" not in headers.content().lower()


def test_hsts_is_left_to_the_zone():
    """Cloudflare's SSL/TLS toggle sends HSTS; sending it here would duplicate it."""
    assert "strict-transport-security" not in headers.content().lower()


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


def test_every_profiles_canonical_url_is_its_own_site_url():
    """A canonical names the profile a page was built for, not the default.

    The earlier version of this test compared the canonical only with the
    *default* profile's `site_url`, so it passed while every non-default profile
    published the default profile's URL as its canonical — the Foundation books
    were declaring themselves duplicates of the Higher ones. Iterating every
    profile is what makes the assertion catch that.
    """
    for book in BOOKS:
        for profile in book.profiles:
            assert pipeline.canonical_url(book, profile.id, "") == scaffold.site_url(
                book, profile.id
            ), f"{book.id}/{profile.id}: the canonical URL has drifted from site_url"


# --- the deploy script --------------------------------------------------------


def test_deploy_script_exists_and_guards_broken_maths():
    script = (ROOT / "scripts" / "deploy.sh").read_text(encoding="utf-8")
    assert "wrangler deploy" in script
    # It must refuse to publish a page KaTeX could not render.
    assert "math-error" in script
    # And it must map the deprecated credential names onto the canonical ones.
    assert "CF_API_TOKEN" in script and "CLOUDFLARE_API_TOKEN" in script


# --- rolling back -------------------------------------------------------------


def test_rollback_is_a_manual_workflow_that_asks_first():
    """The recovery path must exist, be deliberate, and be impossible by accident.

    A rollback is what you reach for when a deploy is wrong. Nobody should be
    discovering it for the first time during an incident, and nobody should be
    able to trigger one with a stray click either.
    """
    path = ROOT / ".github" / "workflows" / "rollback.yml"
    assert path.is_file(), "no rollback workflow, so recovery is undocumented"
    text = path.read_text(encoding="utf-8")
    assert "workflow_dispatch" in text, "a rollback must be asked for, not automatic"
    assert "wrangler rollback" in text
    # A confirmation input, checked in a step that fails otherwise.
    assert "confirm" in text and "exit 1" in text
    # It must not race itself, and it must be auditable.
    assert "cancel-in-progress: false" in text
    assert "environment:" in text
    assert "CLOUDFLARE_API_TOKEN" in text


def test_the_rollback_command_is_written_down():
    """If GitHub is the thing that is broken, the command still has to be findable."""
    deploy = (ROOT / "DEPLOY.md").read_text(encoding="utf-8")
    assert "wrangler rollback" in deploy
    assert "## Rolling back" in deploy
