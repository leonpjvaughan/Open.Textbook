"""The authoring rules a page is measured against, as functions over its text.

These are rules, not checks on one book: a detail page's two width limits, its folds
and its printed output are the same three rules wherever a detail page is written, and
a second book that grows a detail track should inherit them rather than re-derive
them. So the rule lives here, takes a page's text, and returns the offences with the
line numbers that produced them; ``test_reference_books.py`` holds the case that a
violation fails, and the gate is only as good as the violations.

**Why a function and not a linter rule.** `textbook.lint` reads a book's structure —
front matter, headings, the callouts a course page must carry. These three read the
*text* of one page and know nothing about books, chapters or profiles. Putting them in
the linter would make a reference work's rules fire on a course page that has no code
in it, which is the class of false positive the linter has been pruned of twice.

Measured against the tree on 2026-10-27, before anything new was written:

* code over 72 columns: **1 line** (`reading-the-class/index.md:117`, an 81-column
  docstring line). Code is the one thing on a page that has to be read in a column.
* prose over 80 columns: **476 lines**, of which 58 are exempt (a link's URL, a line
  of display maths) and `colophon.md` is generated. So 410 reflowable lines across 15
  files, queued as their own task rather than mixed into the pages being written.

The prose limit exists because a source line over 80 columns makes a diff unreadable
and a review impossible; it is **not** a limit on what renders, which wraps by itself.
"""

from __future__ import annotations

import re

#: Code is read in a column, so the limit is the width of one. `black`'s default is
#: 88; this is that less 16, because a listing at 72 columns is 602px — it scrolls by
#: at most 1.8 screens on a phone and fits a tablet without scrolling at all.
CODE_COLUMNS = 72

#: Prose wraps by itself, so the limit is on the source line, not the rendered line.
PROSE_COLUMNS = 80

FENCE = re.compile(r"^\s*(```|~~~)")
#: A page whose first line says it is generated is not ours to reflow or to fold.
GENERATED = re.compile(r"\A<!--\s*Generated\b")

DETAIL_SKELETON = [
    "## What this page answers",
    "## The mathematics",
    "## The code",
    "## The theory",
    "## What this cost",
    "## Back to the map",
]

#: The summaries that name nothing. A summary that is one of these, or is empty, is a
#: click that buys the reader nothing — which is the whole cost the rule is about.
#: Case-insensitive and stripped of trailing punctuation before comparison.
NAMELESS = {"", "here", "click here", "more", "details", "see more", "open", "expand"}

#: The prose lines over the limit a book still carries, counted on 2026-10-27 when the
#: rule was written. The debt is grandfathered for the same reason
#: `lint.SENTENCE_DEBT` is, and under the same rule: **it may only go down.** Fix a
#: line and lower the number; a book that starts clean starts at 0 and stays there,
#: and every new page must be written to the limit. The reflow task drives this to 0.
PROSE_DEBT: dict[str, int] = {"numerical-methods": 0}


def _lines(text: str):
    """The page's lines with two booleans: inside a fence, inside display maths.

    Both are needed before any width is measured, and both are tracked rather than
    guessed from the line's own shape. A display block opened with a lone ``$$`` runs
    until the next lone one, and a line inside it is a layout the reader sees as a
    centred equation — not a sentence to wrap.
    """
    in_fence = False
    in_display = False
    for number, line in enumerate(text.splitlines(), 1):
        if FENCE.match(line):
            in_fence = not in_fence
            yield number, line, in_fence, in_display
            continue
        if line.strip() == "$$":
            in_display = not in_display
            yield number, line, in_fence, in_display
            continue
        yield number, line, in_fence, in_display


def _is_exempt_prose(line: str) -> bool:
    """Lines the source-length rule does not apply to.

    Four kinds, and each is something a reader never sees as a wrapped sentence:

    * a **table row** — a layout, and its columns are its meaning;
    * a **fenced line** — handled before this is reached;
    * **display maths** — the same, handled before this is reached;
    * a **link** whose URL is what makes it long.
    """
    stripped = line.strip()
    if not stripped:
        return True
    if stripped.startswith("|"):
        return True
    if stripped.startswith("#"):
        return True
    # A line that is only display maths is a layout, like a table row. The site
    # renders it as a centred display block; wrapping it would change the formula.
    if re.fullmatch(r"\$.*\$[,.;]?", stripped):
        return True
    if re.search(r"\]\([^)\s]{40,}\)", stripped):
        return True
    return False


def code_too_wide(text: str) -> list[tuple[int, int]]:
    """``(line, columns)`` for every fenced line over :data:`CODE_COLUMNS`."""
    return [
        (number, len(line))
        for number, line, in_fence, _ in _lines(text)
        if in_fence and len(line) > CODE_COLUMNS
    ]


def prose_too_wide(text: str) -> list[tuple[int, int]]:
    """``(line, columns)`` for every prose line over :data:`PROSE_COLUMNS`.

    A page that says it is generated is skipped: `colophon.md` is written by
    `scaffold.colophon_page` and reflowing it by hand is undone at the next build.
    """
    if GENERATED.match(text):
        return []
    offences = []
    for number, line, in_fence, in_display in _lines(text):
        if in_fence or in_display:
            continue
        if _is_exempt_prose(line):
            continue
        if len(line) > PROSE_COLUMNS:
            offences.append((number, len(line)))
    return offences


def _without_inline_code(line: str) -> str:
    """The line with its inline code spans blanked out, keeping the column positions.

    ``books/AGENTS.md`` tells an author that ``<details>`` blocks need
    ``markdown="1"``, and that sentence is inside backticks. A scan that read it as a
    fold would demand a summary from a paragraph *about* folds, which is the kind of
    false positive that gets a rule switched off. The span is replaced by spaces of
    the same length so a reported line and column still point at the real text.
    """
    return re.sub(r"`[^`]*`", lambda m: " " * len(m.group(0)), line)


def folds_without_a_summary(text: str) -> list[int]:
    """Lines opening a ``<details>`` whose summary does not say what is inside it.

    The summary is the only thing a reader sees, so a fold whose summary is missing,
    empty or a placeholder costs a click and tells them nothing. Two spellings are in
    use and both are read: the block form, where the summary is on its own line, and
    the one-line form the guided pages use.

    **Not a word count.** A guided page's summary is often one word — ``Hint``,
    ``Next step``, ``Check your answers`` — and every one of those names its contents,
    so a rule that demanded two words would flag the collection's best-loved fold.
    What is rejected is a summary that names nothing: :data:`NAMELESS`.

    Inline code spans are blanked first, so a page that *documents* a fold is not
    read as having one.
    """
    scanned = "\n".join(_without_inline_code(line) for line in text.splitlines())
    offences = []
    for match in re.finditer(r"<details\b[^>]*>", scanned):
        rest = scanned[match.end() :]
        line_summary = re.match(r"\s*<summary>(.*?)</summary>", rest, re.S)
        if line_summary:
            summary = line_summary.group(1).strip()
        else:
            block = re.search(r"<summary>(.*?)</summary>", rest, re.S)
            summary = block.group(1).strip() if block else ""
        if summary.lower().strip(".…:!") in NAMELESS or not summary:
            offences.append(scanned[: match.start()].count("\n") + 1)
    return offences


def programs_and_outputs(text: str) -> tuple[list[str], list[str]]:
    """Every fenced ``python`` block and every fenced ``text`` block on a page."""
    return (
        re.findall(r"```python\n(.*?)```", text, re.S),
        re.findall(r"```text\n(.*?)```", text, re.S),
    )


def detail_page_offences(text: str) -> list[str]:
    """Everything a detail page must satisfy, as messages a reader of the failure can act on.

    The six headings are the handoff's skeleton, in the handoff's order. A detail page
    that invents its own order is the second half of the same defect the class pages
    fixed: a set of pages about one book stops being a map.
    """
    offences = []
    positions = [text.find(heading) for heading in DETAIL_SKELETON]
    missing = [h for h, p in zip(DETAIL_SKELETON, positions) if p < 0]
    if missing:
        offences.append(f"missing headings: {missing}")
    elif positions != sorted(positions):
        offences.append("the six headings are out of order")

    for line, columns in code_too_wide(text):
        offences.append(f"line {line}: {columns} columns of code, limit {CODE_COLUMNS}")
    for line, columns in prose_too_wide(text):
        offences.append(f"line {line}: {columns} columns of prose, limit {PROSE_COLUMNS}")
    for line in folds_without_a_summary(text):
        offences.append(f"line {line}: a <details> whose summary names nothing")

    code, shown = programs_and_outputs(text)
    if not code:
        offences.append("no fenced python program")
    elif not shown:
        offences.append("a program with no printed output beside it")
    return offences
