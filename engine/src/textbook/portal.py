#!/usr/bin/env python3
"""Generate the deployment root: the landing page, the root 404, the legal pages,
`_headers`, `robots.txt`, the sitemap index, the manifest, the service worker and
the build identity.

One card per book, grouped by qualification. The front door is a separate artefact
from the books, so a broken chapter cannot take it down.

Usage: python -m textbook.portal
"""

from __future__ import annotations

import html
import json
import os
from functools import lru_cache
import re
import shutil
import subprocess
import sys
from datetime import date
from pathlib import Path
from string import Template

from . import book as books
from . import headers
from . import scaffold
from . import legal
from .hooks.prefs import snippet as prefs_snippet, theme_color_metas
from .themes import default_bundle, ordered_bundles

@lru_cache(maxsize=None)
def root() -> Path:
    """The repository root, resolved on first use rather than at import, so it does
    not capture the cwd and `TEXTBOOK_ROOT` of module load.
    """
    return books.repo_root()


def assets() -> Path:
    return root() / "assets"


def site() -> Path:
    return root() / "site"

#: The files the portal writes at the deployment root and the pages link.
#: Content-addressed, so both builds derive the same name from the source bytes.
ROOT_ASSETS: tuple[str, ...] = (
    "assets/stylesheets/themes.css",
    "assets/stylesheets/portal.css",
    "assets/stylesheets/search.css",
    "assets/stylesheets/settings.css",
    "assets/search/search.js",
    "assets/settings/settings.js",
    "assets/settings/service-worker.js",
)


def root_assets() -> dict[str, str]:
    """Logical path -> the path each is written and linked under."""
    return {relative: scaffold.addressed_url(relative) for relative in ROOT_ASSETS}


def root_links(rooted: bool) -> dict[str, str]:
    """The URLs a root page links, in the shape that page needs: relative at
    the root, root-absolute where a page is served at any depth. One function, so
    the two cannot disagree about anything but the leading slash.
    """
    prefix = "/" if rooted else ""
    assets = root_assets()
    return {
        "themes_css": prefix + assets["assets/stylesheets/themes.css"],
        "portal_css": prefix + assets["assets/stylesheets/portal.css"],
        "search_css": prefix + assets["assets/stylesheets/search.css"],
        "settings_css": prefix + assets["assets/stylesheets/settings.css"],
        "search_js": prefix + assets["assets/search/search.js"],
        "settings_js": prefix + assets["assets/settings/settings.js"],
        "worker_script": prefix + assets["assets/settings/service-worker.js"],
    }


TEMPLATE = Path(__file__).resolve().parent / "templates" / "portal.html"
LEGAL_TEMPLATE = Path(__file__).resolve().parent / "templates" / "portal_page.html"

#: The prose pages the portal writes at the site root. The build's link checker
#: cannot see them: `pipeline.check_links` treats them as a page built elsewhere.
LEGAL_PAGES: dict[str, tuple[str, str]] = {
    "terms": (
        "Terms of use",
        "What this site promises, and what it does not.",
    ),
    "acknowledgements": (
        "Acknowledgements",
        "The sources and software the books rest on.",
    ),
}


def method_count(book: books.Book) -> int:
    """The methods a reference work's A–Z page lists: the `###` entries under
    *Methods, A to Z*. A book with no such page gets no methods fact, not a zero.
    """
    page = book.docs / "techniques" / "index.md"
    if not page.is_file():
        return 0
    return sum(1 for line in page.read_text(encoding="utf-8").splitlines() if line.startswith("### "))


def card(book: books.Book) -> str:
    """One landing-page card, tinted with the book's own accents. Both variations
    are passed, so a card keeps the book's identity in dark mode.
    """
    light = html.escape(book.theme.for_scheme("default").accent, quote=True)
    dark = html.escape(book.theme.for_scheme("slate").accent, quote=True)
    styles = f"--card-accent: {light}; --card-accent-dark: {dark}"
    title = html.escape(book.title)
    primary = book.default_profile
    href = f"{book.deploy_path(primary.id)}/"

    profiles = []
    for profile in book.profiles:
        css = "card__profile card__profile--primary" if profile is primary else "card__profile"
        profiles.append(
            f'<a class="{css}" href="{book.deploy_path(profile.id)}/">'
            f"{html.escape(profile.name)}</a>"
        )

    # What the card counts depends on what the book is: "0 chapters" is not a fact
    # about a reference work.
    if book.proofs:
        facts = [f"{len(book.proofs)} proofs"]
    elif book.qualification == books.REFERENCE:
        facts = [f"{len(book.pages)} pages"]
        methods = method_count(book)
        if methods:
            facts.append(f"{methods} methods")
    else:
        facts = [
            f"{book.chapter_count} chapters",
            f"{book.section_count} sections",
        ]
    if book.boards:
        facts.append(" · ".join(html.escape(b) for b in book.boards))

    # A reference work is filed under Reference already, so naming it again here
    # reads as a level of study.
    subject_line = (
        html.escape(book.subject)
        if book.qualification == books.REFERENCE
        else f"{html.escape(book.qualification)} {html.escape(book.subject)}"
    )

    return "\n".join(
        [
            f'<article class="card" style="{styles}">',
            f'  <p class="card__subject">{subject_line}</p>',
            '  <h3 class="card__title">'
            f'<a href="{href}">{title}</a></h3>',
            f'  <p class="card__body">{html.escape(book.description)}</p>',
            '  <ul class="card__facts">',
            *[f"    <li>{fact}</li>" for fact in facts],
            "  </ul>",
            f'  <nav class="card__profiles" aria-label="Editions">{"".join(profiles)}</nav>',
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


# The icons are inlined rather than pulled from an icon font, and are
# currentColor, so they follow every bundle and both schemes.
_COG_ICON = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
    '<path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"/></svg>'
)
_CLOSE_ICON = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
    '<path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
)

# The colour scheme: the values themes.css keys `body[data-md-color-scheme]` on.
SCHEME_OPTIONS = (("default", "Light"), ("slate", "Dark"))


def settings_trigger() -> str:
    """The Settings control that opens the panel: the same trigger every book page
    uses, so the shared runtime needs no second branch. Inert until the script runs.
    """
    return (
        '<button class="tb-settings__trigger" id="tb-settings" type="button"\n'
        '        aria-haspopup="dialog" aria-controls="tb-settings-dialog"\n'
        '        aria-label="Settings" title="Settings" hidden data-pagefind-ignore>\n'
        f"  {_COG_ICON}\n"
        '  <span class="tb-settings__label" aria-hidden="true">Settings</span>\n'
        "</button>"
    )


def _radio(name: str, value: str, title: str, description: str = "", note: str = "") -> str:
    """One option card, mirroring the book partial's markup exactly."""
    desc = (
        f'\n          <span class="tb-settings__option-desc">{html.escape(description)}</span>'
        if description
        else ""
    )
    extra = (
        f'\n          <span class="tb-settings__option-note">{html.escape(note)}</span>'
        if note
        else ""
    )
    return (
        '        <label class="tb-settings__option">\n'
        f'          <input class="tb-settings__radio" type="radio" name="{name}"'
        f' value="{html.escape(value, quote=True)}">\n'
        '          <span class="tb-settings__card">\n'
        f'            <span class="tb-settings__option-title">{html.escape(title)}</span>'
        f"{desc}{extra}\n"
        "          </span>\n"
        "        </label>"
    )


def _members(bundle) -> str:
    """The two members of a bundle: the names its own provenance records, which is
    what lets a reader tell six themes apart without seeing the colours.
    """
    names = []
    for scheme in ("light", "dark"):
        member = (bundle.provenance or {}).get(scheme) or {}
        name = str(member.get("name") or "").strip()
        if name:
            names.append(name)
    return "  ·  ".join(names) if len(names) == 2 else ""


def settings_dialog(book: books.Book | None = None) -> str:
    """The reader's Settings panel, the same one every book page carries.

    A native ``<dialog>``: opening it never changes the URL, Escape closes it and
    the background is inert — except ``closedby="any"``, which is what makes the
    light dismiss work. Both preferences are the origin-wide keys ``hooks/prefs.py``
    owns, so a choice follows the reader into every book.

    ``book`` adds the group that keeps **this book** on the device; it is absent on
    the landing page, where there is no book to keep.
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
        # Grouped by the bundle's own mood, so the distinction the collection
        # records is the one offered.
        subgroups = []
        for mood, heading in (("calm", "Quiet themes"), ("vivid", "Bold themes")):
            group = [bundle for bundle in bundles if bundle.mood == mood]
            if not group:
                continue
            options = "\n".join(
                _radio("tb-theme", bundle.id, bundle.title, bundle.description, _members(bundle))
                for bundle in group
            )
            subgroups.append(
                '      <fieldset class="tb-settings__subgroup">\n'
                f'        <legend class="tb-settings__sublegend">{heading}</legend>\n'
                '        <div class="tb-settings__options">\n'
                f"{options}\n"
                "        </div>\n"
                "      </fieldset>"
            )
        groups.append(
            '    <fieldset class="tb-settings__group" id="theme-menu">\n'
            '      <legend class="tb-settings__legend">Reading theme</legend>\n'
            + "\n".join(subgroups)
            + "\n    </fieldset>"
        )

    if book is not None:
        # Nothing here fetches until the button is pressed.
        groups.append(
            '    <fieldset class="tb-settings__group" id="tb-offline"'
            f' data-offline-book="{html.escape(book.id, quote=True)}">\n'
            '      <legend class="tb-settings__legend">Reading offline</legend>\n'
            '      <p class="tb-settings__hint" id="tb-offline-status">'
            "Keep this book on this device and read it offline."
            "</p>\n"
            '      <div class="tb-settings__options">\n'
            '        <button type="button" class="tb-settings__download"'
            ' id="tb-offline-download" hidden>Download this book</button>\n'
            '        <button type="button" class="tb-settings__download"'
            ' id="tb-offline-cancel" hidden>Stop</button>\n'
            '        <progress class="tb-settings__progress" id="tb-offline-progress"'
            ' max="100" value="0" hidden></progress>\n' 
            "      </div>\n"
            "    </fieldset>"
        )

    return (
        '<dialog class="tb-settings" id="tb-settings-dialog" closedby="any"'
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
    """The web app manifest, at the deployment root: one for the whole collection,
    so the app installs from any page and its scope is everything.

    ``theme_color`` and ``background_color`` are deliberately absent: they cannot
    follow the bundle or the scheme, and a fixed value would contradict the theming
    model for the sake of a splash screen.
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

    The label is what makes an update unconditional: a changed byte installs a new
    worker, whose cache name differs, and whose ``activate`` deletes older caches.
    With no git and no CI variables it falls back to ``dev``.
    """
    source = (assets() / "sw.js").read_text(encoding="utf-8")
    label = re.sub(r"[^A-Za-z0-9._-]", "-", build_label() or "dev")
    return source.replace(SW_PLACEHOLDER, label)


def prefs_config() -> dict:
    """The config ``hooks/prefs.py`` reads: the bundle registry, from ``themes/``.
    Built here so the landing page and the books share one generated script.
    """
    return {
        "extra": {
            "themes": [bundle.id for bundle in ordered_bundles()],
            "default_theme": default_bundle().id,
        }
    }


def not_found() -> str:
    """The root 404 page: each book ships its own, so this catches everything else
    and its only job is to get the reader to the landing page.

    Links are absolute because a 404 is served from arbitrary depths. It carries the
    build identity because a stale link or phone is what often produces one.
    """
    label = build_label()
    meta = (
        f'<meta name="build" content="{html.escape(label, quote=True)}">'
        if label
        else ""
    )
    links = root_links(rooted=True)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>Page not found</title>
{meta}
{theme_color_metas()}
{prefs_snippet(prefs_config())}
<link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg">
<!-- Root-absolute, like the stylesheets below and this page's link home: a
     404 is served for a request at any depth. -->
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
<link rel="stylesheet" href="{links['themes_css']}">
<link rel="stylesheet" href="{links['portal_css']}">
<!-- Resolves the cascade before the page can be revealed: Chromium can otherwise
     abort a cross-document transition with "ViewTransition opt-in disabled". The
     value is discarded, and the script is classic so it runs before the first reveal. -->
<script>getComputedStyle(document.documentElement).color;</script>
</head>
<body data-pagefind-ignore>
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


def footer() -> str:
    """The landing page's footer, shared with the legal pages. The legal links are
    root-absolute, because the same footer is used at two depths.
    """
    return f"""<footer class="footer">
  <div class="wrap">
    <p>
      The questions and answers in every <strong>Practise</strong> set are printed
      from one checked source. A computer checks the algebra; worked examples and
      proofs are written by hand.
    </p>
    <nav class="footer__links" aria-label="About this site">
      <a href="/terms/">Terms of use</a>
      <a href="/acknowledgements/">Acknowledgements</a>
      <a href="{html.escape(legal.CONTACT_URL, quote=True)}">Report a mistake</a>
    </nav>
    <p class="footer__fine">Built {date.today().year} · static, no account, nothing to install.</p>
  </div>
</footer>"""


def legal_body(slug: str) -> str:
    """The body of one collection-level legal page."""
    if slug == "terms":
        return legal.terms_html()
    if slug == "acknowledgements":
        return legal.acknowledgements_html()
    raise KeyError(f"no legal page '{slug}'")


def legal_page(slug: str) -> str:
    """One root page: Terms of use or Acknowledgements, with the same masthead,
    reader preferences and Settings control as the landing page.

    The body is trusted markup generated here, not reader input.
    """
    title, description = LEGAL_PAGES[slug]
    template = Template(LEGAL_TEMPLATE.read_text(encoding="utf-8"))
    return template.substitute(
        title=html.escape(title),
        description=html.escape(description),
        site_title=html.escape(str(books.load_collection().get("title", "Textbooks"))),
        body=legal_body(slug),
        footer=footer(),
        build_meta=build_meta(),
        theme_color_metas=theme_color_metas(),
        prefs_script=prefs_snippet(prefs_config()),
        settings_trigger=settings_trigger(),
        settings_dialog=settings_dialog(),
        **root_links(rooted=True),
    )


def root_page_slugs() -> tuple[str, ...]:
    """The root pages the portal owns, for the build's link checker."""
    return tuple(LEGAL_PAGES)


def search_block() -> str:
    """The collection search: one field for every book.

    The field is `hidden` in the markup and the shared runtime reveals it, so a
    reader with scripting off is never handed a field that cannot answer. The
    `<noscript>` block says what search needs and offers the way in that still
    works, which is a book's own contents.
    """
    all_books = books.discover_books()
    first = all_books[0]
    browse = f"/{first.deploy_path(first.default_profile.id)}/"
    return f"""<div class="wrap masthead__search" data-pagefind-ignore>
  <search class="tb-search tb-search--portal" data-search hidden>
    <label class="tb-search__label" for="portal-search">Search all books</label>
    <input class="tb-search__input" id="portal-search" type="search"
           data-search-input placeholder="Fractions, momentum, the chain rule"
           aria-controls="portal-search-results"
           aria-describedby="portal-search-hint"
           autocomplete="off" spellcheck="false">
    <p class="tb-search__hint" id="portal-search-hint">
      Titles, chapters and pages from every book.
    </p>
  </search>
  <div class="tb-search__panel" data-search-panel hidden>
    <div class="tb-search__panel-head">
      <span class="tb-search__panel-title">Results</span>
      <button class="tb-search__close" type="button" data-search-close>Close</button>
    </div>
    <ul class="tb-search__results" id="portal-search-results" aria-label="Search results"></ul>
  </div>
  <p class="visually-hidden" id="portal-search-status" data-search-status
     role="status" aria-live="polite"></p>
  <noscript>
    <p class="tb-search__fallback">Search needs JavaScript. You can still
    <a href="{html.escape(browse, quote=True)}">open a book</a> and use your
    browser's Find to look through it.</p>
  </noscript>
</div>"""


def render() -> str:
    collection = books.load_collection()
    all_books = books.discover_books()
    template = Template(TEMPLATE.read_text(encoding="utf-8"))
    return template.substitute(
        title=html.escape(str(collection.get("title", "Textbooks"))),
        description=html.escape(str(collection.get("description", ""))),
        groups=groups_html(all_books),
        search=search_block(),
        footer=footer(),
        build_meta=build_meta(),
        theme_color_metas=theme_color_metas(),
        prefs_script=prefs_snippet(prefs_config()),
        settings_trigger=settings_trigger(),
        settings_dialog=settings_dialog(),
        **root_links(rooted=False),
    )


# --- the deployed root's non-page files ---------------------------------------


def _base_url() -> str:
    """The production origin, with its trailing slash guaranteed."""
    base = str(books.load_collection().get("base_url", "")).strip()
    return base if base.endswith("/") else base + "/"


def robots_txt() -> str:
    """Our own robots file: a Cloudflare zone serving no ``robots.txt`` gets one
    injected (a content-signals preamble about AI crawlers), so shipping this is
    also a decision. A free textbook wants to be found, so everything is allowed.
    """
    return f"User-agent: *\nAllow: /\n\nSitemap: {_base_url()}sitemap.xml\n"


def sitemap_index() -> str:
    """A sitemap index over the per-book sitemaps, which nothing at the root pointed
    at.

    The landing page is deliberately absent: a sitemap index may contain only other
    sitemaps.
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
            ("git", *args), cwd=root(), capture_output=True, text=True, check=True
        )
    except (OSError, subprocess.CalledProcessError):
        return ""
    return finished.stdout.strip()


def build_identity() -> dict[str, str]:
    """What is deployed, so a report can name a build.

    The deploy job runs after the release job, so the tag arrives as ``BUILD_TAG``
    and the commit as ``BUILD_COMMIT`` (``GITHUB_*`` as fallback); locally they come
    from git. Nothing here may fail the build: an unavailable value is absent.
    """
    commit = (os.environ.get("BUILD_COMMIT") or os.environ.get("GITHUB_SHA") or "").strip()
    tag = (os.environ.get("BUILD_TAG") or "").strip()
    if not commit:
        commit = _git("rev-parse", "HEAD")
    if not tag:
        # `GITHUB_REF_NAME` is the branch on a push, not the release's tag.
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
    """The machine-readable build identity, at the site root, so a reader's report
    can be compared against `main` with one command.
    """
    return json.dumps(build_identity(), indent=2, sort_keys=True) + "\n"


def main() -> int:
    all_books = books.discover_books()
    if not all_books:
        print("ERROR: no books found under books/", file=sys.stderr)
        return 1

    site().mkdir(parents=True, exist_ok=True)
    (site() / "index.html").write_text(render(), encoding="utf-8")
    (site() / "404.html").write_text(not_found(), encoding="utf-8")
    for slug in root_page_slugs():
        page = site() / slug / "index.html"
        page.parent.mkdir(parents=True, exist_ok=True)
        page.write_text(legal_page(slug), encoding="utf-8")
    (site() / "robots.txt").write_text(robots_txt(), encoding="utf-8")
    (site() / "sitemap.xml").write_text(sitemap_index(), encoding="utf-8")
    (site() / "version.json").write_text(version_json(), encoding="utf-8")
    (site() / "manifest.webmanifest").write_text(manifest(), encoding="utf-8")
    (site() / "sw.js").write_text(service_worker(), encoding="utf-8")
    headers.write(site())

    target = site() / "assets" / "stylesheets"
    target.mkdir(parents=True, exist_ok=True)
    # Each shared asset is written under the name its own bytes produce, the name
    # every page links — see `addressed_url` and `ROOT_ASSETS`.
    addressed = root_assets()
    # A stable-named copy from an older build is stale by definition now.
    for relative in ROOT_ASSETS:
        (site() / relative).unlink(missing_ok=True)
    for relative in ROOT_ASSETS:
        destination = site() / addressed[relative]
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(assets() / Path(relative).relative_to("assets"), destination)
    (site() / "assets" / "manifest.json").write_text(
        json.dumps({"build": build_label(), "assets": addressed}, indent=2, sort_keys=True)
        + "\n",
        encoding="utf-8",
    )

    icons_target = site() / "assets" / "icons"
    icons_target.mkdir(parents=True, exist_ok=True)
    for name in ("app-icon.svg", "favicon.svg", "apple-touch-icon.png"):
        shutil.copyfile(assets() / "icons" / name, icons_target / name)

    label = build_label() or "no build identity"
    print(
        "wrote the deployment root: index.html, 404.html, _headers, "
        "robots.txt, sitemap.xml, version.json, manifest.webmanifest, sw.js, "
        "terms/, acknowledgements/ "
        f"({len(all_books)} books, {label})"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
