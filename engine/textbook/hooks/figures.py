"""Expand the line-anchored ``:::figure <slug>`` directive into the portable
``<maths-figure data-figure="<slug>">`` element, and inject the figure loader
only into pages that use it.

Known slugs are discovered from ``<docs>/assets/figures/*.js``, excluding the two
shared files the scaffold symlinks in (the loader and the kit), so a figure cannot
drift out of sync with the registry — and so the registry is per book. An unknown
slug fails the build.
"""

from __future__ import annotations

import re

from .. import config as cfg
from .. import scaffold
from ._fences import transform_outside_fences

MARKER = re.compile(r"^:::[ \t]*figure[ \t]+([a-z0-9-]+)[ \t]*$", re.M)
ASSET = "assets/figures/figures.js"
# Which files in a figures directory are not figures: the loader and the kit.
# Read from the scaffold so the directive's registry and the scaffold's symlinks
# cannot disagree about it.
SHARED = scaffold.SHARED_FIGURE_FILES


def figures_dir(config):
    return cfg.docs_dir(config) / "assets" / "figures"


def known_slugs(config) -> set[str]:
    path = figures_dir(config)
    if not path.is_dir():
        return set()
    return {p.stem for p in path.glob("*.js") if p.name not in SHARED}


def root_prefix(page) -> str:
    """The path back to the site root. See `config.root_prefix` for why it is there.

    It was `"../" * (url.count("/") + 1)` — the same answer by a different route.
    """
    return cfg.root_prefix(page.url or "")


def on_page_markdown(markdown, page, config, files):
    known = known_slugs(config)
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

    markdown = transform_outside_fences(markdown, lambda text: MARKER.sub(replace, text))
    if used:
        src = root_prefix(page) + ASSET
        markdown += f'\n\n<script type="module" src="{src}"></script>\n'
    return markdown
