"""Expand the line-anchored ``:::figure <slug>`` directive into the portable
``<maths-figure data-figure="<slug>">`` element, and inject the figure loader
only into pages that use it.

Known slugs are discovered from ``Docs/assets/figures/*.js`` (excluding the
loader), so a figure cannot drift out of sync with the registry. An unknown slug
fails the build.
"""

from __future__ import annotations

import re
from pathlib import Path

MARKER = re.compile(r"^:::[ \t]*figure[ \t]+([a-z0-9-]+)[ \t]*$", re.M)
REPO = Path(__file__).resolve().parents[3]
FIGURES = REPO / "Docs" / "assets" / "figures"
ASSET = "assets/figures/figures.js"


def known_slugs() -> set[str]:
    if not FIGURES.is_dir():
        return set()
    return {p.stem for p in FIGURES.glob("*.js") if p.name != "figures.js"}


def root_prefix(page) -> str:
    url = (page.url or "").rstrip("/")
    if not url:
        return ""
    return "../" * (url.count("/") + 1)


def on_page_markdown(markdown, page, config, files):
    known = known_slugs()
    used: set[str] = set()

    def replace(match: re.Match[str]) -> str:
        slug = match.group(1)
        if slug not in known:
            raise ValueError(
                f"figures: unknown figure '{slug}' in {page.file.src_path} "
                f"(known: {', '.join(sorted(known)) or 'none'})"
            )
        used.add(slug)
        return f'<maths-figure data-figure="{slug}"></maths-figure>'

    markdown = MARKER.sub(replace, markdown)
    if used:
        src = root_prefix(page) + ASSET
        markdown += f'\n\n<script type="module" src="{src}"></script>\n'
    return markdown
