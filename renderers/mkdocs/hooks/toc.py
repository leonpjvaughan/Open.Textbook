"""Expand ``:::chapters`` into the chapter list from curriculum.yaml.

Keeps the home page in sync with the source of truth instead of hand-listing 25
links. Fence-aware, like the other markers.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

_HOOKS = Path(__file__).resolve().parent
if str(_HOOKS) not in sys.path:
    sys.path.insert(0, str(_HOOKS))

from _fences import transform_outside_fences  # noqa: E402

REPO = Path(__file__).resolve().parents[3]
CURRICULUM = REPO / "curriculum.yaml"
MARKER = re.compile(r"^:::[ \t]*chapters[ \t]*$", re.M)


def on_page_markdown(markdown, page, config, files):
    if ":::chapters" not in markdown:
        return markdown
    data = yaml.safe_load(CURRICULUM.read_text(encoding="utf-8")) or {}
    lines = []
    for chapter in data.get("chapters", []):
        higher = any(s.get("tier") == "H" for s in chapter.get("sections", []))
        suffix = " _Higher only sections_" if higher else ""
        lines.append(
            f"{chapter['id']}. [{chapter['title']}](Chapter {chapter['id']}/index.md){suffix}"
        )
    block = "\n".join(lines)
    return transform_outside_fences(markdown, lambda text: MARKER.sub(block, text))
