#!/usr/bin/env python3
"""Generate the collection landing page.

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
import shutil
import sys
from datetime import date
from pathlib import Path
from string import Template

from . import book as books
from .hooks.scheme import SHARED_KEY

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


def render() -> str:
    collection = books.load_collection()
    all_books = books.discover_books()
    template = Template(TEMPLATE.read_text(encoding="utf-8"))
    return template.substitute(
        title=html.escape(str(collection.get("title", "Textbooks"))),
        description=html.escape(str(collection.get("description", ""))),
        groups=groups_html(all_books),
        year=date.today().year,
        scheme_key=SHARED_KEY,
    )


def main() -> int:
    all_books = books.discover_books()
    if not all_books:
        print("ERROR: no books found under books/", file=sys.stderr)
        return 1

    SITE.mkdir(parents=True, exist_ok=True)
    (SITE / "index.html").write_text(render(), encoding="utf-8")

    target = SITE / "assets" / "stylesheets"
    target.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(ASSETS / "stylesheets" / "portal.css", target / "portal.css")

    print(f"wrote site/index.html ({len(all_books)} books)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
