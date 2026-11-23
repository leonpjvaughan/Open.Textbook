"""Expand ``:::chapters`` into the chapter list from the book's curriculum.

Keeps the home page in sync with the source of truth instead of hand-listing 25
links. Fence-aware, like the other markers.
"""

from __future__ import annotations

import html
import re

import yaml

from .. import yamlio

from .. import book as book_module
from .. import config as cfg
from ._fences import transform_outside_fences
from .tier import included_tiers, tier_filter

MARKER = re.compile(r"^:::[ \t]*chapters[ \t]*$", re.M)


def on_page_markdown(markdown, page, config, files):
    if ":::chapters" not in markdown:
        return markdown
    data = yamlio.load_file(cfg.curriculum_path(config)) or {}
    book = cfg.book(config)
    included = included_tiers(config)
    above = book.chapters_above(tier_filter(config))
    items = []
    for chapter in data.get("chapters", []):
        if str(chapter["id"]) in above:
            continue
        higher = any(
            s.get("tier") == book_module.HIGHER_CODE
            for s in chapter.get("sections", [])
            if not s.get("tier") or s["tier"] in included
        )
        note = (
            ' <span class="chapter-list__note">Higher only sections</span>' if higher else ""
        )
        title = html.escape(f"{chapter['title']}")
        items.append(
            f'<li value="{chapter["id"]}"><a href="Chapter {chapter["id"]}/index.md">{title}</a>{note}</li>'
        )
    block = '<ol class="chapter-list">\n' + "\n".join(items) + "\n</ol>"
    return transform_outside_fences(markdown, lambda text: MARKER.sub(lambda _: block, text))
