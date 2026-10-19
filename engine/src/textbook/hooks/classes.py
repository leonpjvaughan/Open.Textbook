"""Expand the line-anchored ``:::class <slug>`` directive into a link to the map.

A chapter that says "this is a saddle point" is making a claim about what kind of
problem the reader now has, and that claim decides the method, the failure mode and
the cost. The map owns that page once. This hook is how a section points at it.

The directive emits a plain ``<a>`` inside one small aside. There is no script and
nothing to load, so it works with scripting off — the same Tier-0 rule `:::prove`
and `:::deeper` obey, and the reason none of the three is a dialog.

**The signature line is the point.** A reader who is told "saddle point" learns
nothing unless the page says what that means for them, and making every section
restate it is how two copies of an explanation drift apart. The registry already
holds the one sentence, so the directive prints it and the section does not.

An unknown slug fails the build, the same way an unknown ``:::figure`` slug does,
and so does a page in the registry that is not a class.
"""

from __future__ import annotations

import html
import re

from .. import classmap
from ._fences import transform_outside_fences

MARKER = re.compile(r"^:::[ \t]*class[ \t]+([a-z0-9-]+)[ \t]*$", re.M)

#: What the link says. "Kind of problem" rather than "see also": a reader should be
#: told what the page is for, and this book's whole vocabulary is kinds of problem.
ASK = "Kind of problem"


def render(entry: dict) -> str:
    """The affordance: one link, and the one sentence that makes it useful."""
    title = html.escape(str(entry.get("title") or ""))
    signature = html.escape(str(entry.get("signature") or ""))
    return (
        f'<aside class="classlink">'
        f'<a class="classlink__link" href="{html.escape(entry["url"], quote=True)}">'
        f'<span class="classlink__ask">{html.escape(ASK)}</span>'
        f'<span class="classlink__title">{title}</span>'
        f"</a>"
        f'<p class="classlink__note">{signature}</p>'
        f"</aside>"
    )


def on_page_markdown(markdown, page, config, files):
    # Cheap test first: almost no page carries one, and the registry costs a YAML
    # parse per page otherwise. `entries` caches the parse behind it.
    if ":::class" not in markdown:
        return markdown

    known = classmap.entries(config)

    def replace(match: re.Match[str]) -> str:
        slug = match.group(1)
        entry = known.get(slug)
        if entry is None:
            raise ValueError(
                f"classes: '{slug}' is not a class in the map, in {page.file.src_path} "
                f"(known: {', '.join(sorted(known)) or 'none'})"
            )
        return render(entry)

    return transform_outside_fences(markdown, lambda text: MARKER.sub(replace, text))
