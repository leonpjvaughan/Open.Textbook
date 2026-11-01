"""Expand the line-anchored ``:::contents`` directive into a list of the page's sections.

The heading ids exist since the first review, so a fragment works; nothing printed them,
and a 22,574px phone page with 77 entries and 83 headings had no list of its own. The list
is **derived from the headings**, never typed: it is the same list the ids come from, so it
cannot fall behind the page, and a test fails if a heading is missing from it.

Two rules keep it from being noise. A page with fewer than five ``h2`` s gets nothing —
below that the page fits on a screen or two, and a list of four items is furniture. And the
markup is a plain ``<nav>`` with a list of links: no script, no disclosure, nothing to
break with scripting off.
"""

from __future__ import annotations

import html
import re

#: Five is the threshold, and `techniques` — the page this exists for — has exactly five
#: (`finding-a-state`, `linear-systems`, `eigenvalues`, the two other families). Six was
#: the guess when the item was written, and the page it was written for did not qualify.
MINIMUM = 5

MARKER = re.compile(r"<p>\s*:::contents\s*</p>", re.I)
HEADING = re.compile(r'<h2 id="([^"]+)"[^>]*>(.*?)</h2>', re.S | re.I)
TAG = re.compile(r"<[^>]+>")


def _label(heading: str) -> str:
    """The heading's text, with inline maths reduced to its LaTeX and tags dropped."""
    text = heading.replace("$$", "").replace("$", "")
    return html.unescape(TAG.sub("", text)).strip()


def render(content: str) -> str:
    headings = HEADING.findall(content)
    if len(headings) < MINIMUM:
        return ""
    items = "".join(
        f'<li><a href="#{html.escape(anchor, quote=True)}">{html.escape(_label(title))}</a></li>'
        for anchor, title in headings
    )
    return (
        '<nav class="contents" aria-label="On this page">'
        '<p class="contents__title">On this page</p>'
        f'<ul class="contents__list">{items}</ul>'
        "</nav>"
    )


def on_page_content(content: str, page, config, files) -> str:
    if ":::method-index" in content:
        content = METHOD_MARKER.sub(lambda _match: render_methods(content), content)
    if ":::contents" not in content:
        return content
    return MARKER.sub(lambda _match: render(content), content)


#: The name index. `:::method-index` lists every `h3` entry on the page once, sorted by its
#: display name and grouped by initial letter, each name linking the anchor the entry
#: carries. It exists because *Methods, A to Z* is entered by name and sorted by family:
#: at 390px the page is 22,773px and `Uzawa` was at 9,598px, so a reader holding a method
#: name had find-in-page or the site search and nothing else.
METHOD = re.compile(r'<h3 id="([^"]+)"[^>]*>(.*?)</h3>', re.S | re.I)
METHOD_MARKER = re.compile(r"<p>\s*:::method-index\s*</p>", re.I)


def render_methods(content: str) -> str:
    entries = sorted(
        ((_label(title), anchor) for anchor, title in METHOD.findall(content)),
        key=lambda pair: pair[0].lower(),
    )
    if len(entries) < 20:
        return ""
    lines: dict[str, list[str]] = {}
    for name, anchor in entries:
        letter = name[:1].upper()
        lines.setdefault(letter, []).append(
            f'<a href="#{html.escape(anchor, quote=True)}">{html.escape(name)}</a>'
        )
    body = "".join(
        f'<p class="method-index__line"><span class="method-index__letter">{letter}</span>'
        f"{' · '.join(names)}</p>"
        for letter, names in sorted(lines.items())
    )
    return (
        '<nav class="method-index-nav" aria-label="Every method, by name">'
        '<p class="contents__title">Every method, by name</p>'
        f"{body}</nav>"
    )
