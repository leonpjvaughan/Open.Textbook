"""Expand ``:::used`` on a class page into the sections that name that class.

A reference work that nothing points at is a book with a shelf and no door. The
callbacks exist, but a reader on the map has no way to see them: they are scattered
across four books, and a list typed by hand would be stale within a week.

So the list is **derived**, at build time, by reading every book's pages for
``:::class <slug>``. That is the same rule the collection applies to `:::chapters`
and to the problem banks: one source of truth, and the page follows it.

**Why a scan rather than a generated file.** A generated Markdown block inside an
authored page has nowhere to live — `scaffold.emit` will not overwrite an authored
page, and a marker-delimited block inside one would be a second convention for
authors to remember. The directive is the convention the book already uses.

The scan is cached per process: eleven books and about three thousand pages, read
once, however many class pages ask. Without the cache this would be the proof
book's 12-second lesson again.

**The links are root-absolute**, for the same reason a `:::class` link is: the
target is a page in another book, at a different depth. `check_links` skips such a
link by design, and `tests/test_class_links.py` checks what the skip leaves open.
"""

from __future__ import annotations

import html
import re
from functools import lru_cache
from pathlib import Path

import yaml

from .. import book as books
from .. import classmap
from .. import urls
from ._fences import transform_outside_fences

MARKER = re.compile(r"^:::[ \t]*used[ \t]*$", re.M)
CALLBACK = re.compile(r"^:::[ \t]*class[ \t]+([a-z0-9-]+)[ \t]*$", re.M)

EMPTY = "No page in this collection names this class yet."


def _label(book: books.Book, rel: str, text: str) -> str:
    """How a section is named in the list: a book, and where in it.

    The front matter already carries the section number and title, so the label is
    read from the page rather than reconstructed from its path — the two agree
    today, and only one of them is what the reader sees on the page.
    """
    match = re.match(r"---\n(.*?)\n---\n", text, re.S)
    meta = {}
    if match:
        try:
            meta = yaml.safe_load(match.group(1)) or {}
        except yaml.YAMLError:
            meta = {}
    section = str(meta.get("section") or "").strip()
    title = str(meta.get("section_title") or meta.get("title") or "").strip()
    if section and title:
        return f"{book.title} · §{section} {title}"
    return f"{book.title} · {title}" if title else book.title


@lru_cache(maxsize=None)
def _scan(root: str) -> dict[str, tuple[dict, ...]]:
    found: dict[str, list[dict]] = {}
    for book in books.discover_books(Path(root)):
        if book.pages:
            # The map linking to itself says nothing a reader needs.
            continue
        # The default profile's URL. A book with more than one profile publishes the
        # same page under each, so the default always exists and a reader who follows
        # the link lands on a page they can read; the alternative would be for the
        # hook to guess which profile the *other* book's reader is in, and it cannot.
        profile = book.default_profile.id
        base = f"/{book.deploy_path(profile)}/"
        for source in sorted(book.docs.rglob("*.md")):
            text = source.read_text(encoding="utf-8")
            if ":::class" not in text:
                continue
            rel = source.relative_to(book.docs).as_posix()
            for slug in CALLBACK.findall(text):
                found.setdefault(slug, []).append(
                    {
                        "label": _label(book, rel, text),
                        "href": base + urls.url_for(rel),
                    }
                )
    return {slug: tuple(entries) for slug, entries in found.items()}


def used_in(slug: str) -> list[dict]:
    return list(_scan(str(books.repo_root())).get(slug, ()))


def render(entries: list[dict]) -> str:
    if not entries:
        return f'<p class="usedin__none">{html.escape(EMPTY)}</p>'
    items = "".join(
        f'<li><a href="{html.escape(entry["href"], quote=True)}">'
        f'{html.escape(entry["label"])}</a></li>'
        for entry in entries
    )
    return f'<ul class="usedin">{items}</ul>'


def on_page_markdown(markdown, page, config, files):
    if ":::used" not in markdown:
        return markdown

    # The page's own directory is the class it is about: a class page lives at
    # `docs/<slug>/index.md`. Anything else asking for the list is a mistake, not
    # an empty list, because it would silently print somebody else's callbacks.
    src = page.file.src_path
    parts = src.split("/")
    slug = parts[0] if len(parts) == 2 and parts[1] == "index.md" else ""
    known = classmap.entries(config)
    if slug not in known:
        raise ValueError(
            f"used: ':::used' is only for a class page, and {src} is not one "
            f"(known: {', '.join(sorted(known)) or 'none'})"
        )

    entries = used_in(slug)
    return transform_outside_fences(markdown, lambda text: MARKER.sub(render(entries), text))
