"""Two traps that live inside `$…$` and are invisible until the build.

Markdown escapes some characters, and LaTeX treats a bare `%` as a comment that
swallows the rest of the expression — including the closing delimiter — so the
page fails to render. The build catches that with the `math-error` grep, but by
then it is a page and a line number in a build log rather than a named failure.
This finds them first.
"""

from __future__ import annotations

import re

import pytest

from textbook.book import discover_books

DISPLAY = re.compile(r"\$\$(.*?)\$\$", re.S)
INLINE = re.compile(r"(?<!\$)\$([^$\n]+)\$(?!\$)")
BARE_PERCENT = re.compile(r"(?<!\\)%")

BOOKS = discover_books()
IDS = [b.id for b in BOOKS]


def pages(book):
    return sorted(book.docs.rglob("*.md"))


@pytest.mark.parametrize("book", BOOKS, ids=IDS)
def test_no_unescaped_percent_inside_maths(book):
    """`%` is a comment to LaTeX, and it eats the closing delimiter.

    Measured on a real page: `\\text{(5%)}` inside a display block failed to
    render — KaTeX warned that a comment had no terminating newline, which is how
    a percentage becomes a page with a broken formula on it.
    """
    offenders = []
    for page in pages(book):
        text = page.read_text(encoding="utf-8")
        for match in DISPLAY.finditer(text):
            if BARE_PERCENT.search(match.group(1)):
                line = text[: match.start()].count("\n") + 1
                offenders.append(f"{page.name}:{line} (display)")
        for number, line in enumerate(text.splitlines(), 1):
            for match in INLINE.finditer(line):
                if BARE_PERCENT.search(match.group(1)):
                    offenders.append(f"{page.name}:{number} (inline)")
    assert not offenders, (
        "a bare % inside maths is a comment to LaTeX and swallows the closing "
        "delimiter: " + ", ".join(offenders) + ". Write \\% instead."
    )
