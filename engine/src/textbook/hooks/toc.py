"""Expand ``:::chapters`` into the chapter list from the book's curriculum.

Keeps the home page in sync with the source of truth instead of hand-listing 25
links. Fence-aware, like the other markers.
"""

from __future__ import annotations

import re

import yaml

from .. import yamlio

from .. import book as book_module
from .. import config as cfg
from ._fences import transform_outside_fences

MARKER = re.compile(r"^:::[ \t]*chapters[ \t]*$", re.M)


def on_page_markdown(markdown, page, config, files):
    if ":::chapters" not in markdown:
        return markdown
    data = yamlio.load_file(cfg.curriculum_path(config)) or {}
    lines = []
    for chapter in data.get("chapters", []):
        higher = any(
            s.get("tier") == book_module.HIGHER_CODE for s in chapter.get("sections", [])
        )
        suffix = " _Higher only sections_" if higher else ""
        lines.append(
            f"{chapter['id']}. [{chapter['title']}](Chapter {chapter['id']}/index.md){suffix}"
        )
    block = "\n".join(lines)
    return transform_outside_fences(markdown, lambda text: MARKER.sub(block, text))
