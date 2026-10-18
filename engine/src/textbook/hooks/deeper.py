"""Expand the line-anchored ``:::deeper <slug>`` directive into a link to a depth page.

Some ideas are worth more than the main thread can carry, and a reader should be
able to take them without being made to. The page says *where* the offer is; the
depth page itself is authored once, listed in the navigation as a child of the
section it belongs to, and reachable at a URL of its own.

**A link, and nothing else.** There is no script and nothing to load, so the
affordance works with scripting off — the Tier-0 rule this collection holds
itself to, and the reason a dialog was the wrong answer to "make it expandable".

The target is resolved from the curriculum rather than written into the page, so
the nav and the link cannot disagree, and a renamed slug fails the build instead
of shipping a dead link. The href is emitted **relative to the page it is on**,
because a page's output path mirrors its source path.

Where a page sits determines which section's depth pages it may offer: the page's
own source path names its chapter and section, and a slug that belongs to another
section is a mistake — the link would silently jump the reader to a different
part of the book.
"""

from __future__ import annotations

import html
import posixpath
import re

from .. import config as cfg
from ._fences import transform_outside_fences

MARKER = re.compile(r"^:::[ \t]*deeper[ \t]+([a-z0-9-]+)[ \t]*$", re.M)

#: What the offer says. Depth is offered, never required: a reader who is reading
#: the main thread end to end should be told, once, that this is a detour rather
#: than a step they missed.
NOTE = "Optional. The rest of this chapter does not need this page."


def section_of(src_path: str) -> tuple[str, str] | None:
    """``Chapter 1/Section 1.2/Learn/index.md`` -> ``("1", "1.2")``."""
    parts = src_path.split("/")
    if len(parts) < 2:
        return None
    chapter, section = parts[0], parts[1]
    if not chapter.startswith("Chapter ") or not section.startswith("Section "):
        return None
    return chapter[len("Chapter ") :], section[len("Section ") :]


def render(entry: dict, target: str) -> str:
    """The affordance: one anchor and one line of framing."""
    return (
        f'<aside class="deeper">'
        f'<a class="deeper__link" href="{html.escape(target, quote=True)}">'
        f'<span class="deeper__ask">Going deeper</span>'
        f'<span class="deeper__title">{html.escape(str(entry["title"]))}</span>'
        f"</a>"
        f'<p class="deeper__note">{html.escape(NOTE)}</p>'
        f"</aside>"
    )


def on_page_markdown(markdown, page, config, files):
    # Almost no page carries a directive, and reading the curriculum costs a parse
    # per page once the book is in hand. The cheap test comes first, and the book
    # itself is cached by `cfg.book`.
    if ":::deeper" not in markdown:
        return markdown

    here = section_of(str(page.file.src_path))
    pages = cfg.book(config).deeper_pages
    known = [entry for entry in pages if here and (entry["chapter"], entry["section"]) == here]
    by_slug = {entry["slug"]: entry for entry in known}

    def replace(match: re.Match[str]) -> str:
        slug = match.group(1)
        entry = by_slug.get(slug)
        if entry is None:
            where = f"Section {here[1]}" if here else page.file.src_path
            raise ValueError(
                f"deeper: no depth page '{slug}' in {where} "
                f"(known here: {', '.join(sorted(by_slug)) or 'none'})"
            )
        target = posixpath.relpath(
            entry["path"], posixpath.dirname(str(page.file.src_path)) or "."
        )
        return render(entry, target)

    return transform_outside_fences(markdown, lambda text: MARKER.sub(replace, text))
