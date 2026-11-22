"""Expand the line-anchored ``:::contents`` directive into a list of the page's sections.

The heading ids exist since the first review, so a fragment works; nothing printed them,
and a 22,574px phone page with 77 entries and 83 headings had no list of its own. The list
is **derived from the headings**, never typed: it is the same list the ids come from, so it
cannot fall behind the page, and a test fails if a heading is missing from it.

Two rules keep it from being noise. A page with fewer than five ``h2`` s gets nothing —
below that the page fits on a screen or two, and a list of four items is furniture. And the
markup is a plain ``<nav>`` with a list of links: no script, no disclosure, nothing to
break with scripting off.

``data-scrollspy`` is the hook's half of the current-section contract: the nav says it is
a list whose links track the page's sections, and the one script that marks the current
one only enhances a nav that says so. The mark costs nothing without scripting, because
it is a state on a link that already works.

**The list is rendered wherever the threshold is met, not only where a page asked.** It
used to need a ``:::contents`` line, and the threshold and the marker disagreed: 767 pages
in the collection carried five or more ``h2`` s and no marker, including all nine class
pages in the map (eleven ``h2`` s on ``averaging``) and 21 pages of the proof book. A page
600px into a 23,000px lookup had no idea what else was on it, and the engine knew the list
all along. A page may still place the list itself with ``:::contents``, and a page whose own
index would duplicate it can opt out with ``:::no-contents``.
"""

from __future__ import annotations

import html
import re

#: Five is the threshold, and `techniques` — the page this exists for — has exactly five
#: (`finding-a-state`, `linear-systems`, `eigenvalues`, the two other families). Six was
#: the guess when the item was written, and the page it was written for did not qualify.
MINIMUM = 5

MARKER = re.compile(r"<p>\s*:::contents\s*</p>", re.I)
OPT_OUT = re.compile(r"<p>\s*:::no-contents\s*</p>", re.I)
FIRST_PARAGRAPH = re.compile(r"</p>", re.I)
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
        '<nav class="contents" data-scrollspy aria-label="On this page">'
        '<p class="contents__title">On this page</p>'
        f'<ul class="contents__list">{items}</ul>'
        "</nav>"
    )


def on_page_content(content: str, page, config, files) -> str:
    if ":::method-index" in content:
        content = METHOD_MARKER.sub(lambda _match: render_methods(content), content)
    if ":::no-contents" in content:
        return OPT_OUT.sub("", content)
    nav = render(content)
    if not nav:
        return MARKER.sub("", content)
    if ":::contents" in content:
        return MARKER.sub(lambda _match: nav, content)
    # **After the page's first paragraph**, which is where a reader has been told what the
    # page is for and before the first section begins. No paragraph at all means the page
    # opens on a heading, and the list goes first.
    first = FIRST_PARAGRAPH.search(content)
    if not first:
        return nav + content
    return content[: first.end()] + nav + content[first.end():]


#: The name index. `:::method-index` lists every `h3` entry on the page once, sorted by its
#: display name and grouped by initial letter, each name linking the anchor the entry
#: carries. It exists because *Methods, A to Z* is entered by name and sorted by family:
#: at 390px the page is 22,773px and `Uzawa` was at 9,598px, so a reader holding a method
#: name had find-in-page or the site search and nothing else.
#:
#: **One letter is one disclosure.** The first version printed every name in one line per
#: letter: 77 names, 20 lines, 992px at 390px — a wall with no way to jump to a letter.
#: The rail of letters is now the whole of what a reader sees, and each letter is a native
#: ``<details>`` whose summary is that letter and its count, so the index costs a few rows
#: of chips and one open list instead of twenty paragraphs, and the letter is the control.
#: The first letter is open, so the index opens with names on it rather than with every
#: group closed. No script: a reader with scripting off opens any letter with the same
#: native disclosure, and every name still links the anchor the page carries.
METHOD = re.compile(r'<h3 id="([^"]+)"[^>]*>(.*?)</h3>', re.S | re.I)
METHOD_MARKER = re.compile(r"<p>\s*:::method-index\s*</p>", re.I)


def _letter_group(letter: str, names: list[tuple[str, str]], first: bool) -> str:
    """One letter's disclosure: the letter and its count, then every name as a link."""
    links = "".join(
        f'<li><a href="#{html.escape(anchor, quote=True)}">{html.escape(name)}</a></li>'
        for name, anchor in names
    )
    unit = "method" if len(names) == 1 else "methods"
    return (
        f'<details class="method-index__group" id="letter-{letter.lower()}"'
        f'{" open" if first else ""}>'
        f'<summary><span class="method-index__letter">{letter}</span> '
        f'<span class="method-index__count">{len(names)}'
        f'<span class="visually-hidden"> {unit}</span></span></summary>'
        f'<ul class="method-index__names">{links}</ul></details>'
    )


def render_methods(content: str) -> str:
    entries = sorted(
        ((_label(title), anchor) for anchor, title in METHOD.findall(content)),
        key=lambda pair: pair[0].lower(),
    )
    if len(entries) < 20:
        return ""
    groups: dict[str, list[tuple[str, str]]] = {}
    for name, anchor in entries:
        groups.setdefault(name[:1].upper(), []).append((name, anchor))
    body = "".join(
        _letter_group(letter, names, index == 0)
        for index, (letter, names) in enumerate(sorted(groups.items()))
    )
    return (
        '<nav class="method-index-nav" aria-label="Every method, by name">'
        '<p class="contents__title">Every method, by name</p>'
        f'<div class="method-index__letters">{body}</div></nav>'
    )
