"""Build one source into Foundation, Higher or toggle output.

``extra.tier_profile`` selects the behaviour:

* ``foundation`` - drop ``tier: H`` pages and strip ``<!-- tier:h -->`` blocks;
* ``higher``     - keep everything unchanged;
* ``toggle``     - keep everything and wrap Higher blocks in
  ``<div data-tier="higher">`` for the client-side switch.

This is the whole mechanism: a repo-owned MkDocs hook plus front matter. No
plugin, and the same source tree feeds both sites.
"""

from __future__ import annotations

import re
from pathlib import Path

import yaml

BLOCK = re.compile(r"<!--\s*tier:h\s*-->(.*?)<!--\s*/tier:h\s*-->", re.S | re.I)


def profile(config) -> str:
    return (config.get("extra") or {}).get("tier_profile", "higher")


def front_matter(path) -> dict:
    source = Path(path)
    if source.suffix.lower() != ".md":
        return {}
    try:
        text = source.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return {}
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    if end == -1:
        return {}
    try:
        data = yaml.safe_load(text[3:end])
    except yaml.YAMLError:
        return {}
    return data if isinstance(data, dict) else {}


def on_files(files, config):
    if profile(config) != "foundation":
        return files
    return files.__class__(
        f for f in files if front_matter(f.abs_src_path).get("tier") != "H"
    )


def on_page_markdown(markdown, page, config, files):
    current = profile(config)
    if current == "foundation":
        return BLOCK.sub("", markdown)
    if current == "toggle":
        return BLOCK.sub(
            lambda m: (
                '<div class="tier-higher" data-tier="higher" markdown="1">\n\n'
                f"{m.group(1).strip()}\n\n</div>"
            ),
            markdown,
        )
    return markdown
