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
import sys

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

#: A listing longer than this is folded. The handoff's rule: a short listing is not
#: folded, because a fold around a five-line program costs a click and saves nothing.
FOLD_AFTER = 10

#: What a detail page's program may import: the standard library and `sympy`. The
#: book promises a program that runs where `sympy` is installed and `numpy` is not,
#: and until this rule existed nothing noticed a page that imported one.
STDLIB = frozenset(sys.stdlib_module_names) | {"sympy"}

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


def _python_blocks(text: str) -> list[tuple[int, str]]:
    """``(offset, body)`` for every fenced ``python`` block, offset at the body.

    The offset is what maps a line inside the program back to its line on the page,
    so an offence names the line an author has to open.
    """
    return [
        (match.start(1), match.group(1))
        for match in re.finditer(r"```python\n(.*?)```", text, re.S)
    ]


def program_imports(text: str) -> list[tuple[int, str]]:
    """``(page line, module)`` for every import a detail page's program makes.

    The book's environment is `sympy` plus the standard library — `numpy` and
    `scipy` are deliberately not installed, so a program that imports either cannot
    run, and its printed output would be a number typed into a fence.
    """
    offences = []
    for offset, body in _python_blocks(text):
        for number, line in enumerate(body.splitlines(), start=1):
            match = re.match(
                r"\s*(?:from\s+([A-Za-z_][\w.]*)|import\s+([A-Za-z_][\w.]*))", line
            )
            if not match:
                continue
            module = (match.group(1) or match.group(2)).split(".")[0]
            if module not in STDLIB:
                offences.append((text[:offset].count("\n") + number, module))
    return offences


def unfolded_programs(text: str) -> list[int]:
    """Line numbers of programs over :data:`FOLD_AFTER` lines that no fold encloses."""
    folds = [
        (match.start(), match.end())
        for match in re.finditer(r"<details\b.*?</details>", text, re.S)
    ]
    offences = []
    for offset, body in _python_blocks(text):
        if body.count("\n") <= FOLD_AFTER:
            continue
        if not any(start <= offset < end for start, end in folds):
            offences.append(text[:offset].count("\n") + 1)
    return offences


def back_to_map_links(text: str) -> list[str]:
    """The link targets under ``## Back to the map``.

    The section exists so a reader can leave the page. A heading with no links under
    it is a dead end wearing the name of a route, and a heading with only one link is
    either the parent or a sibling, never the pair the acceptance rule asks for.
    """
    marker = "## Back to the map"
    found = text.find(marker)
    if found < 0:
        return []
    return re.findall(r"\[[^\]]+\]\(([^)\s]+)", text[found + len(marker) :])


def sourced_pages(text: str, references: list[dict[str, object]]) -> list[str]:
    """The references whose author the page names and whose ``role`` says why.

    The acceptance rule is that every claim about a method comes from `sources.yaml`
    and that the entry says whether it is the claim's source or further reading. That
    cannot be read mechanically per claim; what can be read is whether the page names
    a recorded author at all, and whether the entry it names carries a role. A page
    that names nobody, or names someone with an empty role, fails.
    """
    named = []
    for entry in references:
        ref = str(entry.get("ref") or "").replace("`", "")
        role = str(entry.get("role") or "").strip()
        if not role:
            continue
        # The first author's part of the reference, before the publisher. Every
        # capitalised word in it is a name the page may use: an entry written
        # "Lloyd N. Trefethen and David Bau III" is cited as Trefethen or as Bau,
        # and taking the last word instead would look for "III".
        head = ref.split(",")[0]
        names = [
            name
            for name in re.findall(r"[A-Z][A-Za-z]+", head)
            if name not in {"and", "The", "Press", "University"}
        ]
        if any(re.search(rf"\b{re.escape(name)}\b", text) for name in names):
            named.append(str(entry.get("id")))
    return named


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
    for line, module in program_imports(text):
        offences.append(f"line {line}: the program imports {module}, not sympy or the stdlib")
    for line in unfolded_programs(text):
        offences.append(
            f"line {line}: a program over {FOLD_AFTER} lines that no fold encloses"
        )
    links = back_to_map_links(text)
    if len(links) < 2:
        offences.append(
            "Back to the map names "
            f"{len(links)} link(s); a parent and one sibling are the minimum"
        )

    code, shown = programs_and_outputs(text)
    if not code:
        offences.append("no fenced python program")
    elif not shown:
        offences.append("a program with no printed output beside it")
    return offences
