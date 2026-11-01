"""Expand ``:::systems`` into an index from a system to the class it belongs to.

The map counts 64 systems and every one is a bullet inside a class page's *Systems that
live here*. A reader who arrives holding "incompressible flow" or "a tyre's slip angle" has
to guess which of nine pages lists it, or read all nine. `symptoms` goes wrong answer →
class, `techniques` goes method → class, `reading-the-class` goes equation → class; nothing
went system → class, although the systems were written and linked already.

So the page is **derived**, at build time, from the class pages' own lists — the same rule
``:::used`` follows for the class callbacks. One source of truth, and the index follows it:
add a system to a class page and it appears here with no second edit.
"""

from __future__ import annotations

import html
import re

from .. import classmap
from .. import config as cfg

MARKER = re.compile(r"^:::[ \t]*systems[ \t]*$", re.M)
SECTION = re.compile(r"## Systems that live here\n(.*?)(?=\n## |\Z)", re.S)
ITEM = re.compile(r"^- (.+)$", re.M)
TAG = re.compile(r"<[^>]+>")
LINK = re.compile(r"\[([^\]]+)\]\([^)]*\)")


def _plain(text: str) -> str:
    """A list item as prose: link targets and inline maths reduced to their text."""
    text = LINK.sub(r"\1", text)
    text = re.sub(r"\$([^$]*)\$", r"\1", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text.rstrip(".")


def entries(config) -> list[tuple[str, str, str]]:
    """``(system, class title, href)`` for every system every class page lists."""
    registry = classmap.entries(config)
    if not registry:
        return []
    book = cfg.book(config)
    out: list[tuple[str, str, str]] = []
    for entry in book.pages:
        if not entry.get("signature"):
            continue
        path = book.docs / str(entry["path"])
        if not path.is_file():
            continue
        match = SECTION.search(path.read_text(encoding="utf-8"))
        if not match:
            continue
        title = str(entry["title"])
        href = registry[entry["path"].split("/")[0]]["url"]
        # A bullet wraps: its continuation lines are indented, so the item is the bullet
        # line and everything indented under it, joined.
        items, current = [], None
        for line in match.group(1).splitlines():
            if line.startswith("- "):
                if current:
                    items.append(current)
                current = line[2:]
            elif current is not None and line.strip():
                current += " " + line.strip()
            elif not line.strip() and current is not None:
                items.append(current)
                current = None
        if current:
            items.append(current)
        for item in items:
            out.append((_plain(" ".join(item.split())), title, href))
    return out


def _prefix(page) -> str:
    """`../` for a page one level under the book root, `../../` for two.

    The links are relative, not root-absolute like a `:::class` link: the target is a page
    in *this* book, so `check_links` can and does verify it — a broken href here is a
    finding, where a root-absolute one would be skipped by design.
    """
    src = str(getattr(getattr(page, "file", None), "src_path", "") or "")
    depth = max(0, src.count("/"))
    return "../" * depth


def render(config, page=None) -> str:
    rows = entries(config)
    if not rows:
        return ""
    prefix = _prefix(page)
    body = "".join(
        f'<tr><td>{html.escape(system)}</td>'
        f'<td><a href="{html.escape(prefix + href.rsplit("/", 2)[-2] + "/", quote=True)}">'
        f"{html.escape(title)}</a></td></tr>"
        for system, title, href in sorted(rows, key=lambda row: row[0].lower())
    )
    return (
        '<table class="systems-index">'
        "<thead><tr><th scope=\"col\">the system</th>"
        "<th scope=\"col\">the class it belongs to</th></tr></thead>"
        f"<tbody>{body}</tbody></table>"
    )


def on_page_markdown(markdown: str, page, config, files) -> str:
    if ":::systems" not in markdown:
        return markdown
    return MARKER.sub(lambda _match: render(config, page), markdown)
