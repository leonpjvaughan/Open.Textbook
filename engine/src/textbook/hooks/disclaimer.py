"""Expand the line-anchored ``:::disclaimer`` directive into the book's short note.

The note is a native ``<details>`` element: a reader sees the summary, opens it
only if they want the detail, and nothing needs JavaScript. That is the same
Tier-0 rule ``:::prove`` and ``:::deeper`` obey, and the reason this is a page
element rather than a dialog.

The wording is owned by ``textbook.legal``, not by this hook, so a correction to
the disclaimer reaches every book at once and the About page and the home-page
note cannot drift apart.
"""

from __future__ import annotations

import re

from .. import legal

MARKER = re.compile(r"^:::[ \t]*disclaimer[ \t]*$", re.M)


def on_page_markdown(markdown: str, page, config, files) -> str:
    # Almost no page carries the directive, and the check is a substring test, so
    # the common page pays nothing for the hook.
    if ":::disclaimer" not in markdown:
        return markdown
    return MARKER.sub(legal.disclaimer_html(), markdown)
