"""Paths as published: the one place a source path becomes a URL.

A source page is at ``Chapter 1/Section 1.1/Walkthrough/index.md`` because that is an
authoring convention. A reader sees ``chapter-1/section-1.1/learn/``. Something has to
map one to the other, and it used to live in ``pipeline`` — which imports ``hooks``,
so a hook that needed a URL could not import it back without a cycle.

**Why this module exists** is the same reason ``config.root_prefix`` exists: two
callers need the function and neither may import the other. ``pipeline`` re-exports
all three names, so ``pipeline.url_for`` remains the public spelling and the tests
that pin it are unchanged.
"""

from __future__ import annotations

import re
import unicodedata
import urllib.parse

from . import config as cfg
from . import scaffold


# URL segments for the page kinds whose directory names are ours, not the
# reader's. AGENTS.md is explicit that internal words must never reach the reader,
# and a URL is read in the address bar, the sitemap and every search result, so
# the published path uses the same vocabulary the navigation does.
SLUG_OVERRIDES = {
    directory: slug for directory, _kind, _title, slug in scaffold.PAGE_KINDS
} | {scaffold.DEEPER_DIRECTORY: scaffold.DEEPER_SLUG}

# Everything else slugs mechanically: 'Chapter 12' -> 'chapter-12',
# 'Section 1.1' -> 'section-1.1'. Dots survive so section numbers stay legible.
NON_SLUG = re.compile(r"[^a-z0-9.]+")


def slugify(segment: str) -> str:
    """One path segment as it appears in a published URL.

    Segments are slugged rather than used verbatim because the source layout is
    an authoring convention — 'Chapter 20/Section 20.4/Walkthrough/index.md' — and
    publishing it unchanged puts 'Chapter%2020' in every URL a reader sees.
    """
    if segment in {".", ".."}:
        return segment  # relative links must keep working
    if segment in SLUG_OVERRIDES:
        return SLUG_OVERRIDES[segment]
    folded = unicodedata.normalize("NFKD", segment).encode("ascii", "ignore").decode()
    slug = NON_SLUG.sub("-", folded.lower()).strip(".-")
    return slug or "page"


def url_for(md_path: str) -> str:
    """``Chapter 1/Section 1.1/Walkthrough/index.md`` -> ``chapter-1/section-1.1/learn/``.

    Tolerates a path whose ``.md`` suffix has already been removed, because the
    link rewriter works on rendered HTML where it may or may not still be there.
    The root page maps to the empty string, which callers qualify with the
    current page's prefix.
    """
    path = md_path[:-3] if md_path.endswith(".md") else md_path
    if path == "index" or path.endswith("/index"):
        path = path[: -len("index")]
    segments = [slugify(part) for part in path.split("/") if part]
    return f"{'/'.join(segments)}/" if segments else ""


def href(url: str) -> str:
    """Percent-encode a URL for use in an attribute."""
    return urllib.parse.quote(url)


def prefix_for(url: str) -> str:
    """The relative path back to the site root. See `config.root_prefix`."""
    return cfg.root_prefix(url)
