"""Convert common-error and quick-check blockquotes into semantic callouts.

Every Learn page carries a ``> **Watch out.**`` common-error callout, and quick
inline checks open with ``> **Check.**``. Left as plain Markdown blockquotes,
both render as unadorned ``<blockquote>`` elements indented 40px from the column
margin.

This hook promotes a contiguous blockquote whose first inline is **exact**
``**Watch out.**`` or ``**Check.**`` into an ``<aside class="callout ...">``
element with ``markdown="1"`` so Python-Markdown's ``md_in_html`` extension
still renders all inner paragraphs, lists and maths identically.

Running on Markdown rather than rendered HTML keeps adjacent blockquotes
separate: Python-Markdown merges two ``>`` blocks separated only by a blank
line into one ``<blockquote>``, which would otherwise swallow a following
``> **Progress check.**`` into a preceding callout or miss a ``> **Watch out.**``
that follows ``> **Explain:**``.

Every other blockquote — including ``> **Checking forever.**``,
``> **Progress check.**``, ``> **Explain:**`` and ``> **First contact.**`` — is
left untouched.
"""

from __future__ import annotations

import re

from ._fences import transform_outside_fences

KINDS: dict[str, str] = {
    "Watch out.": "error",
    "Check.": "check",
}

QUOTE_LINE = re.compile(r"^ {0,3}>")
QUOTE_PREFIX = re.compile(r"^ {0,3}> ?")
LEAD = re.compile(r"^ {0,3}>[ \t]*\*\*(Watch out\.|Check\.)\*\*(?:[ \t]|$)")


def transform(text: str) -> str:
    """Promote matching contiguous blockquotes outside code fences."""
    lines = text.splitlines(keepends=True)
    out: list[str] = []
    i = 0
    total = len(lines)

    while i < total:
        if not QUOTE_LINE.match(lines[i]):
            out.append(lines[i])
            i += 1
            continue

        j = i + 1
        while j < total and QUOTE_LINE.match(lines[j]):
            j += 1
        block = lines[i:j]

        match = LEAD.match(block[0].rstrip("\r\n"))
        if match is None:
            out.extend(block)
            i = j
            continue

        kind = KINDS[match.group(1)]
        inner = "".join(QUOTE_PREFIX.sub("", raw) for raw in block).rstrip("\r\n")
        trailing = "\n" if block[-1].endswith("\n") else ""

        if out and out[-1].strip():
            out.append("\n")
        out.append(
            f'<aside class="callout callout--{kind}" markdown="1">\n\n'
            f"{inner}\n\n"
            f"</aside>{trailing}"
        )
        if j < total and lines[j].strip():
            out.append("\n")

        i = j

    return "".join(out)


def on_page_markdown(markdown: str, page, config, files) -> str:
    if "**Watch out.**" not in markdown and "**Check.**" not in markdown:
        return markdown
    return transform_outside_fences(markdown, transform)
