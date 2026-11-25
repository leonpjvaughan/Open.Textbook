"""Write ``<`` inside maths as ``\\lt``, so it cannot be read as the start of a tag.

``md_in_html`` runs before the maths is set aside, so ``$-2<x\\leq2$`` looks like an
unknown ``<x`` element to it. The page then stops treating the blocks after it as
Markdown, and the ``markdown="1"`` on a later wrapper survives into the HTML. KaTeX
draws ``\\lt`` exactly as it draws ``<``.
"""

from __future__ import annotations

import re

from ._fences import transform_outside_fences

DISPLAY = re.compile(r"\$\$(.+?)\$\$", re.S)
INLINE = re.compile(r"(?<![\\$])\$(?!\s)((?:\\.|[^$\\\n])+?)(?<!\s)\$(?!\d)")


def _lt(match: re.Match[str]) -> str:
    body = match.group(1).replace("<", r"\lt ")
    return match.group(0).replace(match.group(1), body, 1)


def transform(text: str) -> str:
    if "<" not in text:
        return text
    return INLINE.sub(_lt, DISPLAY.sub(_lt, text))


def on_page_markdown(markdown: str, page, config, files) -> str:
    return transform_outside_fences(markdown, transform)
