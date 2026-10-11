#!/usr/bin/env python3
"""Generate the deployment root: the landing page, and the root 404.

One card per book, grouped by qualification, each tinted with the book's accent
from ``book.yaml``. The page is a single static HTML file at the site root, and
the books build to subdirectories beside it:

    site/index.html
    site/assets/stylesheets/portal.css
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
import shutil
import sys
from datetime import date
from pathlib import Path
from string import Template

from . import book as books
from .hooks.prefs import SCHEME_KEY, THEME_KEY
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


def theme_menu() -> str:
    """The reader's choice of theme bundle, or nothing if it is withdrawn.

    A bundle applies to every book, so this is a reading choice rather than a
    per-subject one — which is what stops a subject switch from feeling like a
    context switch.
    """
    collection = books.load_collection()
    if not collection.get("theme_selector", True):
        return ""

    bundles = ordered_bundles()
    if len(bundles) < 2:
        return ""

    options = "".join(
        f'<option value="{html.escape(bundle.id, quote=True)}">'
        f"{html.escape(bundle.title)}</option>"
        for bundle in bundles
    )
    return (
        '<div class="theme-picker">\n'
        '  <label class="theme-picker__label" for="theme-menu">Theme</label>\n'
        '  <select class="theme-picker__select" id="theme-menu">'
        f"{options}</select>\n"
        '  <p class="theme-picker__blurb" id="theme-blurb"></p>\n'
        "</div>"
    )


def not_found() -> str:
    """The root 404 page.

    Each book ships its own 404 from its MkDocs build, so a missing page under a
    book offers that book's own navigation. This one catches everything else, and
    its only job is to get the reader to the landing page.

    Link is absolute because a 404 is served from arbitrary depths, where a
    relative path would point at the wrong place.
    """
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found</title>
<script>
(function () {{
  try {{
    var scheme = localStorage.getItem("{SCHEME_KEY}");
    var theme = localStorage.getItem("{THEME_KEY}");
    if (scheme === "slate") document.documentElement.setAttribute("data-scheme-pref", "slate");
    if (theme) document.documentElement.setAttribute("data-theme", theme);
  }} catch (err) {{}}
}})();
</script>
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
    bundles = ordered_bundles()
    template = Template(TEMPLATE.read_text(encoding="utf-8"))
    return template.substitute(
        title=html.escape(str(collection.get("title", "Textbooks"))),
        description=html.escape(str(collection.get("description", ""))),
        groups=groups_html(all_books),
        year=date.today().year,
        scheme_key=SCHEME_KEY,
        theme_key=THEME_KEY,
        scheme_default=json.dumps("default"),
        themes=json.dumps([bundle.id for bundle in bundles]),
        theme_descriptions=json.dumps(
            {bundle.id: bundle.description for bundle in bundles}
        ),
        default_theme=default_bundle().id,
        theme_menu=theme_menu(),
    )


def main() -> int:
    all_books = books.discover_books()
    if not all_books:
        print("ERROR: no books found under books/", file=sys.stderr)
        return 1

    SITE.mkdir(parents=True, exist_ok=True)
    (SITE / "index.html").write_text(render(), encoding="utf-8")
    (SITE / "404.html").write_text(not_found(), encoding="utf-8")

    target = SITE / "assets" / "stylesheets"
    target.mkdir(parents=True, exist_ok=True)
    # The bundle stylesheet is shared with every book: one copy, one truth.
    shutil.copyfile(ASSETS / "stylesheets" / "themes.css", target / "themes.css")
    shutil.copyfile(ASSETS / "stylesheets" / "portal.css", target / "portal.css")

    print(f"wrote site/index.html and site/404.html ({len(all_books)} books)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
