"""Wrap each worked example in a ``<section class="worked-example">``.

A worked example is a paragraph opening ``**Example N.**`` followed by its working
as sibling blocks. Nothing in the rendered page says where one ends, so a layout
cannot set it off. This hook wraps the opening paragraph and the blocks after it,
up to the next heading, example, callout, tier region edge, other raw HTML block or
horizontal rule. The wrapper is ``markdown="1"`` so the inner Markdown renders as before.

It runs after ``callouts`` so a promoted ``<aside>`` is already a boundary, and
never wraps into a code fence.
"""

from __future__ import annotations

import re

from ._fences import transform_outside_fences

START = re.compile(r"^\*\*Example(?: \d+[A-Za-z]?)?(?:\.| —|\*\*)")
BOUNDARY = re.compile(
    r"^ {0,3}(?:#{1,6}(?:\s|$)|<!--\s*/?tier:|</?(?:aside|section|div|details|hr)\b"
    r"|(?:-{3,}|\*{3,}|_{3,})\s*$|>)",
    re.I,
)

TIER_EDGE = re.compile(r"^\s*<!--\s*/?tier:\w+\s*-->\s*$", re.I)

OPEN = '<section class="worked-example" markdown="1">\n\n'
CLOSE = "\n\n</section>"


def transform(text: str) -> str:
    lines = text.splitlines(keepends=True)
    out: list[str] = []
    i = 0
    total = len(lines)

    while i < total:
        starts = START.match(lines[i]) and (
            i == 0 or not lines[i - 1].strip() or TIER_EDGE.match(lines[i - 1])
        )
        if not starts:
            out.append(lines[i])
            i += 1
            continue

        j = i + 1
        while j < total and not BOUNDARY.match(lines[j]) and not START.match(lines[j]):
            j += 1
        end = j
        while end > i + 1 and not lines[end - 1].strip():
            end -= 1

        body = "".join(lines[i:end]).rstrip("\r\n")
        out.append(OPEN + body + CLOSE + ("\n" if lines[end - 1].endswith("\n") else ""))
        i = end

    return "".join(out)


def on_page_markdown(markdown: str, page, config, files) -> str:
    if "**Example" not in markdown:
        return markdown
    return transform_outside_fences(markdown, transform)
