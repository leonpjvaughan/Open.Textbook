"""Expand a line-anchored ``:::figure slug`` directive into a portable
``<maths-figure>`` element.

This is a repo-owned MkDocs hook: no third-party plugin at build time. It
demonstrates the ergonomic shorthand plus two behaviours a good mechanism needs:

* the figure script is injected **only into pages that use a figure**, with a
  path computed relative to the page, so Tier-0 pages ship no runtime JS;
* an unknown slug fails the build instead of silently rendering nothing.

The directive is line-anchored and uses ``:``, so it cannot collide with inline
maths or with ``{{ ... }}`` templating. It is deliberately MyST-shaped, so a port
codemod has an obvious target.
"""

from __future__ import annotations

import re

MARKER = re.compile(r"^:::[ \t]*figure[ \t]+([a-z0-9-]+)[ \t]*$", re.M)
KNOWN = {"gradient"}
ASSET = "assets/figures/figures.js"


def root_prefix(page) -> str:
    """Relative path from the page back to the site root."""
    url = (page.url or "").rstrip("/")
    if not url:
        return ""
    return "../" * (url.count("/") + 1)


def on_page_markdown(markdown, page, config, files):
    used: set[str] = set()

    def replace(match: re.Match[str]) -> str:
        slug = match.group(1)
        if slug not in KNOWN:
            raise ValueError(
                f"figures_hook: unknown figure '{slug}' in {page.file.src_path}"
            )
        used.add(slug)
        return f'<maths-figure data-figure="{slug}"></maths-figure>'

    markdown = MARKER.sub(replace, markdown)
    if used:
        src = root_prefix(page) + ASSET
        markdown += f'\n\n<script type="module" src="{src}"></script>\n'
    return markdown
