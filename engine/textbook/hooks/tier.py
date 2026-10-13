"""Build one source into a single tier, or into the development toggle output.

A book declares an **ordered** tier axis in `book.yaml` and each profile declares
which level it builds:

```yaml
tier_axis:            # lowest level first
  F: Foundation and Higher
  H: Higher only
profiles:
  - id: foundation
    tier_filter: F    # this reader studies the F content only
```

Content is tagged in two places, and both are read here:

* a page or a section carries `tier: H` in front matter or in `curriculum.yaml`;
* a range inside a page is wrapped in `<!-- tier:h -->…<!-- /tier:h -->`.

A build includes every level **at or below its own**, because content at a lower
level is studied by every reader above it. So a `F` build drops `H` pages and strips
`<!-- tier:h -->` ranges; an `H` build keeps everything. A book with no tier axis —
A-level, the proof book — declares `tier_filter: all`, and every page ships.

Three levels work the same way and need no special case. Leaving Certificate
Mathematics is Foundation, Ordinary and Higher, tagged `F`, `O` and `H`; the
Foundation build keeps `F`, the Ordinary build keeps `F` and `O`, and the Higher
build keeps all three.

Repo-owned; no plugin. See AGENTS.md (tier conventions).
"""

from __future__ import annotations

import re
from pathlib import Path

from .. import config as cfg
from ..frontmatter import read as read_front_matter

#: A tier-tagged range in a page, for any tier code the axis declares.
BLOCK = re.compile(r"<!--\s*tier:(\w+)\s*-->(.*?)<!--\s*/tier:\1\s*-->", re.S | re.I)
LINK = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")


def tier_filter(config) -> str:
    """The build's tier level, from the profile's declared ``tier_filter``.

    Not the profile id. A book names its lower-tier profile `foundation` in
    England and `ordinary` in Ireland, so keying behaviour on the literal id is the
    same fact written twice. `Book.tier_filter_for` is the one place that resolves
    it, so this hook and the pipeline's nav filter cannot disagree.
    """
    return cfg.book(config).tier_filter_for(cfg.profile(config))


def included_tiers(config) -> frozenset[str]:
    """The tier codes this build ships."""
    book = cfg.book(config)
    return book.tiers_included(tier_filter(config))


def is_toggle(config) -> bool:
    return tier_filter(config) == "toggle"


def strip_excluded_blocks(markdown: str, included: frozenset[str]) -> str:
    """Remove every tier-tagged range this build does not include.

    A range is named by its code, so a three-level book writes `<!-- tier:o -->` for
    content the Foundation reader does not study and `<!-- tier:h -->` for the rest.
    A marker whose code the book does not declare is left alone rather than stripped
    — that is a typo, and `lint` reports it.
    """

    def repl(match: re.Match[str]) -> str:
        code = match.group(1).upper()
        return match.group(0) if code in included else ""

    return BLOCK.sub(repl, markdown)


def wrap_excluded_blocks(markdown: str, included: frozenset[str]) -> str:
    """The `toggle` build: keep everything, and mark it for the client switch.

    The tiers a reader is not entitled to become attributes rather than removed
    text, so a script can show or hide them. `higher` is the class the shell already
    knows; a three-level book gains `ordinary` the same way.
    """

    def repl(match: re.Match[str]) -> str:
        code = match.group(1).lower()
        if code in included:
            return match.group(0)
        label = {"h": "higher", "o": "ordinary", "f": "foundation"}.get(code, code)
        return (
            f'<div class="tier-{label}" data-tier="{label}" markdown="1">\n\n'
            f"{match.group(2).strip()}\n\n</div>"
        )

    return BLOCK.sub(repl, markdown)


def strip_excluded_links(markdown: str, book, excluded: set[str]) -> str:
    """Unlink links to section pages this build does not write.

    Otherwise those links dangle, and the link check fails on a page the author
    could not have known to remove. Only the link text survives, so the sentence
    still reads.
    """

    def repl(match: re.Match[str]) -> str:
        text, target = match.group(1), match.group(2)
        ids = re.findall(r"Section (\d+\.\d+)", target)
        if ids and all(i in excluded for i in ids):
            return text
        return match.group(0)

    return LINK.sub(repl, markdown)


def on_files(files, config, **kwargs):
    included = included_tiers(config)
    if included == frozenset(cfg.book(config).tier_codes):
        return files
    # Strict: a page whose front matter does not parse has no tier, and would
    # otherwise be treated as common content and shipped to a reader who does not
    # study it. See engine/textbook/frontmatter.py.
    def keep(f) -> bool:
        tier = read_front_matter(Path(f.abs_src_path))[0].get("tier")
        return not tier or tier in included

    return files.__class__(f for f in files if keep(f))


def on_page_markdown(markdown, page, config, files):
    book = cfg.book(config)
    included = included_tiers(config)
    # `toggle` keeps every page, like `all` — but it wraps what a lower tier would
    # not see instead of leaving it bare, so the order of these two checks matters.
    if is_toggle(config):
        return wrap_excluded_blocks(markdown, included)
    if included == frozenset(book.tier_codes):
        return markdown
    return strip_excluded_links(
        strip_excluded_blocks(markdown, included),
        book,
        set(book.sections_above(tier_filter(config))),
    )
