"""Build one source into Foundation, Higher or toggle output.

``extra.tier_profile`` selects the behaviour:

* ``foundation`` - drop ``tier: H`` pages and strip ``<!-- tier:h -->`` blocks;
* ``higher``     - keep everything unchanged;
* ``toggle``     - keep everything and wrap Higher blocks in
  ``<div data-tier="higher">`` for the client-side switch.

Repo-owned; no plugin. See AGENTS.md (tier conventions) and test/README.md.
"""

from __future__ import annotations

import re
from pathlib import Path

import yaml

BLOCK = re.compile(r"<!--\s*tier:h\s*-->(.*?)<!--\s*/tier:h\s*-->", re.S | re.I)
LINK = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
REPO = Path(__file__).resolve().parents[3]
CURRICULUM = REPO / "curriculum.yaml"


def higher_sections() -> set[str]:
    """Section ids (e.g. '12.5') that are Higher-only."""
    data = yaml.safe_load(CURRICULUM.read_text(encoding="utf-8")) or {}
    return {
        s["id"]
        for chapter in data.get("chapters", [])
        for s in chapter.get("sections", [])
        if s.get("tier") == "H"
    }


def strip_higher_links(markdown: str) -> str:
    """For a Foundation build, unlink links to pages the profile dropped.

    Otherwise those links dangle and the strict build fails on the warning.
    """
    higher = higher_sections()

    def repl(match: re.Match[str]) -> str:
        text, target = match.group(1), match.group(2)
        ids = re.findall(r"Section (\d+\.\d+)", target)
        if ids and all(i in higher for i in ids):
            return text
        return match.group(0)

    return LINK.sub(repl, markdown)


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
        return strip_higher_links(BLOCK.sub("", markdown))
    if current == "toggle":
        return BLOCK.sub(
            lambda m: (
                '<div class="tier-higher" data-tier="higher" markdown="1">\n\n'
                f"{m.group(1).strip()}\n\n</div>"
            ),
            markdown,
        )
    return markdown
