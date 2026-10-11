#!/usr/bin/env python3
"""Generate the deployment root: the landing page, the root 404, the `_headers`
file, `robots.txt`, the sitemap index and the build identity.

One card per book, grouped by qualification, each tinted with the book's accent
from ``book.yaml``. The page is a single static HTML file at the site root, and
the books build to subdirectories beside it:

    site/index.html
    site/404.html
    site/_headers
    site/robots.txt
    site/sitemap.xml
    site/version.json
    site/manifest.webmanifest
    site/sw.js
    site/assets/stylesheets/portal.css
    site/assets/stylesheets/settings.css
    site/assets/settings/settings.js
    site/assets/settings/service-worker.js
    site/assets/icons/app-icon.svg
    site/gcse-maths/higher/…
    site/gcse-maths/foundation/…

So the front door is a separate artefact from the books: a broken chapter in one
book cannot take it down. It is also covered by the CI drift check, like every
other generated file.

Usage: python -m textbook.portal
"""

from __future__ import annotations

import html
import json
import os
import re
import shutil
import subprocess
import sys
from datetime import date
from pathlib import Path
from string import Template

from . import book as books
from . import headers
from .hooks.prefs import snippet as prefs_snippet
from .themes import default_bundle, ordered_bundles

ROOT = books.repo_root()
ASSETS = ROOT / "assets"
SITE = ROOT / "site"
TEMPLATE = Path(__file__).resolve().parent / "templates" / "portal.html"


def card(book: books.Book) -> str:
    """One landing-page card, tinted with the book's own accents.

    Both variations are passed, so a card keeps the book's identity when the
    reader is in dark mode rather than just darkening the light accent.
    """
    light = html.escape(book.theme.for_scheme("default").accent, quote=True)
    dark = html.escape(book.theme.for_scheme("slate").accent, quote=True)
    styles = f"--card-accent: {light}; --card-accent-dark: {dark}"
    title = html.escape(book.title)
    primary = book.default_profile
    href = f"{book.deploy_path(primary.id)}/"

    chips = []
    for profile in book.profiles:
        css = "chip chip--primary" if profile is primary else "chip"
        chips.append(
            f'<a class="{css}" href="{book.deploy_path(profile.id)}/">'
            f"{html.escape(profile.name)}</a>"
        )

    facts = [
        f"{book.chapter_count} chapters",
        f"{book.section_count} sections",
    ]
    if book.boards:
        facts.append(" · ".join(html.escape(b) for b in book.boards))

    return "\n".join(
        [
            f'<article class="card" style="{styles}">',
            '  <h3 class="card__title">'
            f'<a href="{href}">{title}</a></h3>',
            f'  <p class="card__subject">{html.escape(book.qualification)} '
            f"{html.escape(book.subject)}</p>",
            f'  <p class="card__body">{html.escape(book.description)}</p>',
            '  <ul class="card__facts">',
            *[f"    <li>{fact}</li>" for fact in facts],
            "  </ul>",
            f'  <nav class="card__profiles">{"".join(chips)}</nav>',
            "</article>",
        ]
    )


def groups_html(all_books: list[books.Book]) -> str:
    """Cards, grouped by qualification in the order the collection declares."""
    collection = books.load_collection()
    order = collection.get("qualifications", [])
    sequence = [q["id"] for q in order] + sorted(
        {b.qualification for b in all_books} - {q["id"] for q in order}
    )

    out: list[str] = []
    for qualification in sequence:
        members = [b for b in all_books if b.qualification == qualification]
        if not members:
            continue
        note = next(
            (q.get("note", "") for q in order if q["id"] == qualification), ""
        )
        title = next(
            (q.get("title", qualification) for q in order if q["id"] == qualification),
            qualification,
        )
        out.append('<section class="group">')
        out.append(f'  <h2 class="group__title">{html.escape(title)}</h2>')
        if note:
            out.append(f'  <p class="group__note">{html.escape(note)}</p>')
        out.append('  <div class="cards">')
        out.extend(card(book) for book in members)
        out.append("  </div>")
        out.append("</section>")
    return "\n".join(out)


# The trigger's icons are inlined rather than pulled from an icon font: the
# landing page has no Material icon system, and an inline SVG is one request
# fewer. Both are currentColor, so they follow every bundle and both schemes.
_COG_ICON = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
    '<path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"/></svg>'
)
_CLOSE_ICON = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
    '<path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
)

# The colours scheme is one choice with two values. The attribute values are
# Material's, and are what themes.css keys `body[data-md-color-scheme]` on.
SCHEME_OPTIONS = (("default", "Light"), ("slate", "Dark"))


def settings_trigger() -> str:
    """The Settings control that opens the panel.

    The same trigger every book page uses, so the shared runtime
    (assets/settings/settings.js) needs no second branch. It is inert until the
    script runs: a reader without JavaScript sees no dead control.
    """
    return (
        '<button class="tb-settings__trigger" id="tb-settings" type="button"\n'
        '        aria-haspopup="dialog" aria-controls="tb-settings-dialog"\n'
        '        aria-label="Settings" title="Settings" hidden data-pagefind-ignore>\n'
        f"  {_COG_ICON}\n"
        "</button>"
    )


def _radio(name: str, value: str, title: str, description: str = "") -> str:
    """One option card, mirroring the book partial's markup exactly."""
    desc = (
        f'\n          <span class="tb-settings__option-desc">{html.escape(description)}</span>'
        if description
        else ""
    )
    return (
        '        <label class="tb-settings__option">\n'
        f'          <input class="tb-settings__radio" type="radio" name="{name}"'
        f' value="{html.escape(value, quote=True)}">\n'
        '          <span class="tb-settings__card">\n'
        f'            <span class="tb-settings__option-title">{html.escape(title)}</span>'
        f"{desc}\n"
        "          </span>\n"
        "        </label>"
    )


def settings_dialog() -> str:
    """The reader's Settings panel, the same one every book page carries.

    A native ``<dialog>``, so opening it never changes the URL, Escape closes
    it, the background is inert and the label relationship is the browser's job.
    Both preferences are the origin-wide keys ``hooks/prefs.py`` already owns, so
    a choice made here follows the reader into every book and back.

    The theme group keeps the landing page's long-standing ``theme-menu`` id: it
    is the menu of themes, and the id is what the collection has always used to
    see whether the choice is offered. The collection can still withdraw the
    theme choice with ``theme_selector: false``.
    """
    collection = books.load_collection()
    offer_themes = bool(collection.get("theme_selector", True))
    bundles = ordered_bundles() if offer_themes else []

    schemes = "\n".join(
        _radio("tb-scheme", value, label) for value, label in SCHEME_OPTIONS
    )
    groups = [
        '    <fieldset class="tb-settings__group">\n'
        '      <legend class="tb-settings__legend">Colour scheme</legend>\n'
        '      <p class="tb-settings__hint">Applies to every book you read here.</p>\n'
        '      <div class="tb-settings__options">\n'
        f"{schemes}\n"
        "      </div>\n"
        "    </fieldset>"
    ]
    if bundles:
        themes = "\n".join(
            _radio("tb-theme", bundle.id, bundle.title, bundle.description)
            for bundle in bundles
        )
        groups.append(
            '    <fieldset class="tb-settings__group" id="theme-menu">\n'
            '      <legend class="tb-settings__legend">Reading theme</legend>\n'
            '      <p class="tb-settings__hint">Applies to every book you read here.</p>\n'
            '      <div class="tb-settings__options">\n'
            f"{themes}\n"
            "      </div>\n"
            "    </fieldset>"
        )

    return (
        '<dialog class="tb-settings" id="tb-settings-dialog"'
        ' aria-labelledby="tb-settings-title" data-pagefind-ignore>\n'
        '  <form method="dialog" class="tb-settings__form">\n'
        '    <div class="tb-settings__head">\n'
        '      <h2 class="tb-settings__title" id="tb-settings-title">Settings</h2>\n'
        '      <button class="tb-settings__close" type="submit" value="close"'
        ' aria-label="Close settings" title="Close settings">\n'
        f"        {_CLOSE_ICON}\n"
        "      </button>\n"
        "    </div>\n"
        + "\n".join(groups)
        + "\n  </form>\n"
        "</dialog>"
    )


# --- the installable app ------------------------------------------------------

# `assets/sw.js` carries this placeholder; the portal stamps the build label in.
# See `service_worker()` and DEPLOY.md, "Installable and offline".
SW_PLACEHOLDER = "__TB_BUILD__"


def manifest() -> str:
    """The web app manifest, at the deployment root.

    One manifest for the whole collection: the site root is ours, so the app
    installs from any page and its scope is everything. Icons are the one place
    a colour cannot follow the reader — a launcher image is fixed — so the icon
    is drawn in the house ink and paper and declared both ``any`` and
    ``maskable``.

    ``theme_color`` and ``background_color`` are deliberately absent. They cannot
    follow the bundle or the scheme, and a fixed value would contradict the
    theming model for the sake of a splash screen.
    """
    collection = books.load_collection()
    data = {
        "name": str(collection.get("title", "Textbooks")),
        "short_name": "Textbooks",
        "description": str(collection.get("description", "")),
        "lang": "en-GB",
        "dir": "ltr",
        "start_url": "/",
        "scope": "/",
        "display": "standalone",
        "icons": [
            {
                "src": "/assets/icons/app-icon.svg",
                "sizes": "any",
                "type": "image/svg+xml",
                "purpose": "any maskable",
            }
        ],
    }
    return json.dumps(data, indent=2) + "\n"


def service_worker() -> str:
    """The service worker, with the build label stamped into its cache name.

    The label is what makes an update unconditional. Workers revalidates
    ``sw.js`` on every request, so a deploy that changes this byte makes the
    browser install the new worker, whose cache name differs, and whose
    ``activate`` deletes every older cache. The version is the commit or tag, so
    a deploy that changes nothing but content still refreshes the cache.

    With no git and no CI variables the label falls back to ``dev``, which keeps
    a local build working; it is the one case where the cache does not rotate.
    """
    source = (ASSETS / "sw.js").read_text(encoding="utf-8")
    label = re.sub(r"[^A-Za-z0-9._-]", "-", build_label() or "dev")
    return source.replace(SW_PLACEHOLDER, label)


def prefs_config() -> dict:
    """The config ``hooks/prefs.py`` reads: the bundle registry, from ``themes/``.

    Built here rather than in the template, so the landing page and the books
    share one generated before-paint script and neither can drift.
    """
    return {
        "extra": {
            "themes": [bundle.id for bundle in ordered_bundles()],
            "default_theme": default_bundle().id,
        }
    }


def not_found() -> str:
    """The root 404 page.

    Each book ships its own 404 from its own profile build, so a missing page under a
    book offers that book's own navigation. This one catches everything else, and
    its only job is to get the reader to the landing page.

    Link is absolute because a 404 is served from arbitrary depths, where a
    relative path would point at the wrong place. It carries the build identity
    because a 404 is often what a stale link or a stale phone produces, and the
    first useful question is which build the reader actually got.
    """
    label = build_label()
    meta = (
        f'<meta name="build" content="{html.escape(label, quote=True)}">'
        if label
        else ""
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found</title>
{meta}
{prefs_snippet(prefs_config())}
<link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg">
<link rel="stylesheet" href="/assets/stylesheets/themes.css">
<link rel="stylesheet" href="/assets/stylesheets/portal.css">
</head>
<body>
<script>
document.body.setAttribute(
  "data-md-color-scheme",
  document.documentElement.getAttribute("data-scheme-pref") === "slate" ? "slate" : "default"
);
</script>
<main class="wrap" id="main">
  <div class="group">
    <h1 class="masthead__title">That page is not here</h1>
    <p class="group__note">The address may be mistyped, or the page may have
    moved between editions.</p>
    <p><a href="/">Go to the books</a></p>
  </div>
</main>
</body>
</html>
"""


def render() -> str:
    collection = books.load_collection()
    all_books = books.discover_books()
    template = Template(TEMPLATE.read_text(encoding="utf-8"))
    return template.substitute(
        title=html.escape(str(collection.get("title", "Textbooks"))),
        description=html.escape(str(collection.get("description", ""))),
        groups=groups_html(all_books),
        year=date.today().year,
        build_meta=build_meta(),
        prefs_script=prefs_snippet(prefs_config()),
        settings_trigger=settings_trigger(),
        settings_dialog=settings_dialog(),
    )


# --- the deployed root's non-page files ---------------------------------------


def _base_url() -> str:
    """The production origin, with its trailing slash guaranteed."""
    base = str(books.load_collection().get("base_url", "")).strip()
    return base if base.endswith("/") else base + "/"


def robots_txt() -> str:
    """Our own robots file.

    A Cloudflare zone that serves no ``robots.txt`` gets one injected: a
    content-signals preamble about AI crawlers. So shipping this file is also a
    decision — we replace an inherited policy with one we have chosen. A free
    textbook wants to be found, so everything is allowed, and the sitemap index
    is named so a crawler does not have to guess it.
    """
    return f"User-agent: *\nAllow: /\n\nSitemap: {_base_url()}sitemap.xml\n"


def sitemap_index() -> str:
    """A sitemap index over the per-book sitemaps.

    Each profile build emits its own sitemap — ``site/gcse-maths/higher/sitemap.xml``
    and so on — but nothing at the root pointed at them, so a crawler never found
    them. This is that pointer.

    The landing page is deliberately absent: a sitemap index may contain only
    other sitemaps, and the front door is the site root that every book links
    back to. It is also the one URL a crawler cannot miss.
    """
    base = _base_url()
    entries = [
        f"  <sitemap>\n    <loc>{base}{book.deploy_path(profile.id)}/sitemap.xml</loc>\n  </sitemap>"
        for book in books.discover_books()
        for profile in book.profiles
    ]
    body = "\n".join(entries)
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{body}\n"
        "</sitemapindex>\n"
    )


def _git(*args: str) -> str:
    """A git value, or the empty string if git cannot answer."""
    try:
        finished = subprocess.run(
            ("git", *args), cwd=ROOT, capture_output=True, text=True, check=True
        )
    except (OSError, subprocess.CalledProcessError):
        return ""
    return finished.stdout.strip()


def build_identity() -> dict[str, str]:
    """What is deployed, so a report can name a build.

    A release tag and a live site were two facts with no link between them: asked
    "what is deployed right now?" the only honest answers were "the last push to
    main" and "check the dashboard", neither of which names a commit.

    CI already knows both values. The deploy job runs after the release job, so
    the tag arrives as ``BUILD_TAG`` and the commit as ``BUILD_COMMIT`` (the
    ``GITHUB_*`` names are the fallback). Locally they come from git. Nothing here
    is allowed to fail the build: an approximate identity beats none, so an
    unavailable value is simply absent.
    """
    commit = (os.environ.get("BUILD_COMMIT") or os.environ.get("GITHUB_SHA") or "").strip()
    tag = (os.environ.get("BUILD_TAG") or "").strip()
    if not commit:
        commit = _git("rev-parse", "HEAD")
    if not tag:
        # `GITHUB_REF_NAME` is the branch on a push, not the tag the release job
        # created afterwards in another job, so it is not consulted here.
        tag = _git("describe", "--tags", "--exact-match")

    identity: dict[str, str] = {}
    if commit:
        identity["commit"] = commit
        identity["commit_short"] = commit[:7]
    if tag:
        identity["tag"] = tag
    identity["origin"] = _base_url()
    return identity


def build_label() -> str:
    """The short label a page shows: the tag if there is one, else the commit."""
    identity = build_identity()
    return identity.get("tag") or identity.get("commit_short") or ""


def build_meta() -> str:
    """A `<meta name="build">` for the browser, or nothing."""
    label = build_label()
    if not label:
        return ""
    return f'<meta name="build" content="{html.escape(label, quote=True)}">'


def version_json() -> str:
    """The machine-readable build identity, at the site root.

    `curl https://open-textbook.org/version.json` answers "what is live?" in one
    command, which is what makes it possible to compare a reader's report against
    `main`.
    """
    return json.dumps(build_identity(), indent=2, sort_keys=True) + "\n"


def main() -> int:
    all_books = books.discover_books()
    if not all_books:
        print("ERROR: no books found under books/", file=sys.stderr)
        return 1

    SITE.mkdir(parents=True, exist_ok=True)
    (SITE / "index.html").write_text(render(), encoding="utf-8")
    (SITE / "404.html").write_text(not_found(), encoding="utf-8")
    (SITE / "robots.txt").write_text(robots_txt(), encoding="utf-8")
    (SITE / "sitemap.xml").write_text(sitemap_index(), encoding="utf-8")
    (SITE / "version.json").write_text(version_json(), encoding="utf-8")
    (SITE / "manifest.webmanifest").write_text(manifest(), encoding="utf-8")
    (SITE / "sw.js").write_text(service_worker(), encoding="utf-8")
    headers.write(SITE)

    target = SITE / "assets" / "stylesheets"
    target.mkdir(parents=True, exist_ok=True)
    # The bundle stylesheet is shared with every book: one copy, one truth. The
    # Settings stylesheet and runtime are shared too, so the landing page and the
    # books use one control rather than two.
    shutil.copyfile(ASSETS / "stylesheets" / "themes.css", target / "themes.css")
    shutil.copyfile(ASSETS / "stylesheets" / "portal.css", target / "portal.css")
    shutil.copyfile(ASSETS / "stylesheets" / "settings.css", target / "settings.css")

    settings_target = SITE / "assets" / "settings"
    settings_target.mkdir(parents=True, exist_ok=True)
    for name in ("settings.js", "service-worker.js"):
        shutil.copyfile(ASSETS / "settings" / name, settings_target / name)

    icons_target = SITE / "assets" / "icons"
    icons_target.mkdir(parents=True, exist_ok=True)
    for name in ("app-icon.svg", "favicon.svg"):
        shutil.copyfile(ASSETS / "icons" / name, icons_target / name)

    label = build_label() or "no build identity"
    print(
        "wrote the deployment root: index.html, 404.html, _headers, "
        "robots.txt, sitemap.xml, version.json, manifest.webmanifest, sw.js "
        f"({len(all_books)} books, {label})"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
