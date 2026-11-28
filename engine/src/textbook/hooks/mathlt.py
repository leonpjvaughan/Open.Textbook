"""Write ``<`` inside maths as ``\\lt``, so it cannot be read as the start of a tag.

``md_in_html`` runs before the maths is set aside, so ``$-2<x\\leq2$`` looks like an
unknown ``<x`` element to it. The page then stops treating the blocks after it as
Markdown, and the ``markdown="1"`` on a later wrapper survives into the HTML. KaTeX
draws ``\\lt`` exactly as it draws ``<``.

Inline code spans are not maths and are left alone. Inside ``\\text{...}`` the
replacement is ``\\textless``, because ``\\lt`` is not valid in text mode.
"""

from __future__ import annotations

import re

from ._fences import transform_outside_fences

DISPLAY = re.compile(r"\$\$(.+?)\$\$", re.S)
INLINE = re.compile(r"(?<![\\$])\$(?!\s)((?:\\.|[^$\\\n])+?)(?<!\s)\$(?!\d)")
CODE_SPAN = re.compile(
    r"(?<!`)(`+)(?!`)((?:(?!\r?\n[ \t]*\r?\n).)*?)(?<!`)\1(?!`)", re.S
)
TEXT = "\\text{"


def _text_end(text: str, start: int) -> int | None:
    depth = 1
    i = start
    while i < len(text):
        if text[i] == "\\":
            i += 2
            continue
        if text[i] == "{":
            depth += 1
        elif text[i] == "}":
            depth -= 1
            if depth == 0:
                return i
        i += 1
    return None


def _body(text: str) -> str:
    out: list[str] = []
    i = 0
    while i < len(text):
        if text.startswith(TEXT, i):
            end = _text_end(text, i + len(TEXT))
            if end is not None:
                inner = text[i + len(TEXT) : end].replace("<", "\\textless{}")
                out.append(TEXT + inner + "}")
                i = end + 1
                continue
        out.append("\\lt " if text[i] == "<" else text[i])
        i += 1
    return "".join(out)


def _lt(match: re.Match[str]) -> str:
    prefix = match.group(0)[: match.start(1) - match.start()]
    suffix = match.group(0)[match.end(1) - match.start() :]
    return prefix + _body(match.group(1)) + suffix


def _maths(text: str) -> str:
    if "<" not in text:
        return text
    return INLINE.sub(_lt, DISPLAY.sub(_lt, text))


def transform(text: str) -> str:
    if "<" not in text:
        return text
    out: list[str] = []
    last = 0
    for match in CODE_SPAN.finditer(text):
        out.append(_maths(text[last : match.start()]))
        out.append(match.group(0))
        last = match.end()
    out.append(_maths(text[last:]))
    return "".join(out)


def on_page_markdown(markdown: str, page, config, files) -> str:
    return transform_outside_fences(markdown, transform)
