#!/usr/bin/env python3
"""Generate the deployment root: the landing page, the root 404, the `_headers`
file, `robots.txt`, the sitemap index and the build identity.

One card per book, grouped by qualification, each tinted with the book's accent
from ``book.yaml``. The page is a single static HTML file at the site root, and
the books build to subdirectories beside it:

    site/index.html
    site/404.html
    site/terms/index.html
    site/acknowledgements/index.html
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
from .hooks.prefs import snippet as prefs_snippet
from .themes import default_bundle, ordered_bundles

@lru_cache(maxsize=None)
def root() -> Path:
    """The repository root, resolved on first use rather than at import.

    The three constants this replaces were captured when the module loaded, so
    they depended on the cwd and `TEXTBOOK_ROOT` at that moment — while
    `repo_root()` is written to be correct whenever it is called.
    """
    return books.repo_root()


def assets() -> Path:
    return root() / "assets"


def site() -> Path:
    return root() / "site"

#: The files the portal writes at the deployment root and the pages link. Content-
#: addressed, because a book page reaches the registration script by a root-absolute
#: URL and the two builds do not run in a fixed order: they agree because both derive
#: the name from the source bytes, not because one reads the other's output.
ROOT_ASSETS: tuple[str, ...] = (
    "assets/stylesheets/themes.css",
    "assets/stylesheets/portal.css",
    "assets/stylesheets/settings.css",
    "assets/settings/settings.js",
    "assets/settings/service-worker.js",
)


def root_assets() -> dict[str, str]:
    """Logical path -> the path each is written and linked under."""
    return {relative: scaffold.addressed_url(relative) for relative in ROOT_ASSETS}


def root_links(rooted: bool) -> dict[str, str]:
    """The five URLs a root page links, in the shape that page needs.

    The landing page sits at the root, so it links relative paths; a 404 and a
    legal page are served at any depth, so theirs are root-absolute. One function so
    the two cannot disagree about anything but the leading slash.
    """
    prefix = "/" if rooted else ""
    assets = root_assets()
    return {
        "themes_css": prefix + assets["assets/stylesheets/themes.css"],
        "portal_css": prefix + assets["assets/stylesheets/portal.css"],
        "settings_css": prefix + assets["assets/stylesheets/settings.css"],
        "settings_js": prefix + assets["assets/settings/settings.js"],
        "worker_script": prefix + assets["assets/settings/service-worker.js"],
    }


TEMPLATE = Path(__file__).resolve().parent / "templates" / "portal.html"
LEGAL_TEMPLATE = Path(__file__).resolve().parent / "templates" / "portal_page.html"

#: The prose pages the portal writes at the site root, outside every book build.
#: They are collection-level pages: a reader reaches them from the landing page
#: footer, from every book's About page, and from the note on a book's home page.
#: The build's link checker cannot see them because each book is built into its
#: own output directory, so `pipeline.check_links` treats these roots the same
#: way it treats another book's deploy root: a page built elsewhere, checked by
#: the tests that generate it.
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
    """The methods a reference work's A–Z page lists.

    A reference work's landing card should count something true about it. The
    methods are the `###` entries under *Methods, A to Z*, which is the page a
    reader consults for a method and the page the home page's own arithmetic claim
    is built from, so the card and the page agree by construction. A book with no
    such page gets no methods fact rather than a zero.
    """
    page = book.docs / "techniques" / "index.md"
    if not page.is_file():
        return 0
    return sum(1 for line in page.read_text(encoding="utf-8").splitlines() if line.startswith("### "))


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

    # What the card counts depends on what the book is. A course counts chapters
    # and sections; a reference work has neither, and "0 chapters" is not a fact
    # about it. The proof book counts its proofs. A reference work without a proof
    # registry — the map of problem classes — counts its pages and its methods,
    # which are facts about it that a reader can use.
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

    # "Reference Mathematics" is not a phrase a reader says. A reference work is
    # filed under Reference on the landing page, so repeating it here as though it
    # were a level of study reads as a mistake; the subject alone is the fact.
    subject_line = (
        html.escape(book.subject)
        if book.qualification == books.REFERENCE
        else f"{html.escape(book.qualification)} {html.escape(book.subject)}"
    )

    return "\n".join(
        [
            f'<article class="card" style="{styles}">',
            '  <h3 class="card__title">'
            f'<a href="{href}">{title}</a></h3>',
            f'  <p class="card__subject">{subject_line}</p>',
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


def settings_dialog(book: books.Book | None = None) -> str:
    """The reader's Settings panel, the same one every book page carries.

    A native ``<dialog>``, so opening it never changes the URL, Escape closes
    it, the background is inert and the label relationship is the browser's job.
    Both preferences are the origin-wide keys ``hooks/prefs.py`` already owns, so
    a choice made here follows the reader into every book and back.

    The theme group keeps the landing page's long-standing ``theme-menu`` id: it
    is the menu of themes, and the id is what the collection has always used to
    see whether the choice is offered. The collection can still withdraw the
    theme choice with ``theme_selector: false``.

    ``book`` adds the group that keeps **this book** on the device, and it is
    absent on the landing page because there is no book there to keep. The button
    is ``hidden`` in the markup and revealed by script, which is the same rule the
    Settings trigger follows: a reader without JavaScript sees no control, rather
    than one that does nothing. The size in its label is filled in from the build's
    own manifest, so the number a reader is shown is the number that was measured.
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

    if book is not None:
        # The reader's own device is the only thing this touches: nothing here
        # fetches until the button is pressed, and the manifest is read when the
        # panel opens so the size is known before the reader commits to it.
        groups.append(
            '    <fieldset class="tb-settings__group" id="tb-offline"'
            f' data-offline-book="{html.escape(book.id, quote=True)}">\n'
            '      <legend class="tb-settings__legend">Reading offline</legend>\n'
            '      <p class="tb-settings__hint" id="tb-offline-status">'
            "You can keep this book on this device and read it without a connection."
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
    source = (assets() / "sw.js").read_text(encoding="utf-8")
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
    links = root_links(rooted=True)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found</title>
{meta}
{prefs_snippet(prefs_config())}
<link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg">
<!-- Root-absolute, like the stylesheets below and this page's link home: a
     404 is served for a request at any depth. -->
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
<link rel="stylesheet" href="{links['themes_css']}">
<link rel="stylesheet" href="{links['portal_css']}">
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


def footer() -> str:
    """The landing page's footer, shared with the legal pages.

    The legal links are root-absolute because the same footer is used at the site
    root and one directory down, and a relative link would mean two different
    pages in those two places.
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
    """One root page: Terms of use or Acknowledgements.

    It uses the same masthead, reader preferences and Settings control as the
    landing page, so it does not look like a different site and a reader who
    chose a bundle keeps it. The body is trusted markup generated here, not
    reader input.
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
        prefs_script=prefs_snippet(prefs_config()),
        settings_trigger=settings_trigger(),
        settings_dialog=settings_dialog(),
        **root_links(rooted=True),
    )


def root_page_slugs() -> tuple[str, ...]:
    """The root pages the portal owns, for the build's link checker."""
    return tuple(LEGAL_PAGES)


def render() -> str:
    collection = books.load_collection()
    all_books = books.discover_books()
    template = Template(TEMPLATE.read_text(encoding="utf-8"))
    return template.substitute(
        title=html.escape(str(collection.get("title", "Textbooks"))),
        description=html.escape(str(collection.get("description", ""))),
        groups=groups_html(all_books),
        footer=footer(),
        build_meta=build_meta(),
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
            ("git", *args), cwd=root(), capture_output=True, text=True, check=True
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
    # The bundle stylesheet is shared with every book: one copy, one truth. The
    # Settings stylesheet and runtime are shared too, so the landing page and the
    # books use one control rather than two.
    # Each of these is written under the name its own bytes produce, which is the
    # name every page links — a book page reaches the registration script by a
    # root-absolute URL, so the two builds have to agree without seeing each other's
    # output. They do: `addressed_url` is a function of the source bytes alone.
    addressed = root_assets()
    # A stable-named copy from an older build is stale by definition now, and the one
    # thing this scheme promises is that no such file exists to be served.
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
