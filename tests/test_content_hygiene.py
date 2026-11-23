"""Internal words must never reach the reader.

`textbook.lint` reports these but exits 0, so this is a gate rather than a lint
threshold: one occurrence is a bug, not a budget item. The phrase list is the
linter's own, so a phrase added to `INTERNAL_PHRASES` is gated at once.
"""

from __future__ import annotations

import re
from collections import Counter

import pytest

from textbook import book as books
from textbook import lint


def test_no_internal_words_reach_the_reader():
    findings: Counter = Counter()
    examples: dict[str, list[str]] = {}
    for book in books.discover_books():
        lint.lint(book, fix=False, findings=findings, examples=examples)

    assert findings["voice:internal"] == 0, (
        "internal words reached a reader:\n  "
        + "\n  ".join(examples.get("voice:internal", []))
    )


def test_the_gate_still_fires_on_an_authored_page(tmp_path, monkeypatch):
    """The stub skip must not swallow a real violation: an authored page that
    says "Guided problems" fails, and the same page with the stub marker does not.
    """
    from textbook.book import Book

    (tmp_path / "curriculum.yaml").write_text("chapters: []\n", encoding="utf-8")
    docs = tmp_path / "docs"
    docs.mkdir()
    (docs / "authored.md").write_text(
        "# Page\n\nSee the Guided problems page.\n", encoding="utf-8"
    )
    (docs / "stub.md").write_text(
        "<!-- scaffold:stub -->\n\n# Page\n\nSee the Guided problems page.\n",
        encoding="utf-8",
    )
    book = Book(
        id="fixture",
        title="Fixture",
        qualification="GCSE",
        subject="Mathematics",
        description="",
        root=tmp_path,
    )
    findings: Counter = Counter()
    examples: dict[str, list[str]] = {}
    lint.lint(book, fix=False, findings=findings, examples=examples)

    assert findings["voice:internal"] == 1
    assert "authored.md" in examples["voice:internal"][0]


@pytest.mark.parametrize(
    "phrase",
    [
        "DfE coverage",
        "Guided problems",
        "anchor problem",
        "anchor checkpoint",
        "retrieval starter",
        "front matter",
    ],
)
def test_the_gate_covers_the_reader_facing_page_names(phrase):
    """A phrase that leaves the linter's list leaves this gate silently, so a
    removed or renamed phrase fails here rather than gating nothing.
    """
    patterns = " ".join(lint.INTERNAL_PHRASES)
    assert phrase.split()[0] in patterns, f"{phrase!r} is no longer gated"


# the usual arrival is a LaTeX command eating its `\t`. KaTeX does not error on the

TAB_FILES = sorted(
    path
    for book in books.discover_books()
    for path in book.docs.rglob("*.md")
)


@pytest.mark.parametrize("path", TAB_FILES, ids=[str(p.name) for p in TAB_FILES])
def test_no_content_file_contains_a_tab(path):
    text = path.read_text(encoding="utf-8")
    if "\t" not in text:
        return
    offenders = [
        f"line {number}: {line[:70]!r}"
        for number, line in enumerate(text.splitlines(), 1)
        if "\t" in line
    ]
    assert not offenders, (
        f"{path}: a literal tab. In prose it is unwanted; backslash-t in a LaTeX "
        f"command it turns into one and the maths then renders *wrongly* without "
        f"erroring, which no check downstream can see. Restore the command "
        f"({offenders[0]})."
    )



FENCE = re.compile(r"```.*?```", re.S)
CODE = re.compile(r"`[^`]*`")
COLLIDED = re.compile(r"\*{4,}")
RUN_TOGETHER = re.compile(r"[.?!]\*{0,4}(?=[A-Z])")
ABBREVIATION = re.compile(r"(?:^|[^A-Za-z])[A-Z](?:\.[A-Z])+\.")
RUN_TOGETHER_ALLOWED = ("Open.Textbook", "A.d.Tramontana", "a.d.Tramontana")


def _prose(path) -> str:
    return FENCE.sub("", path.read_text(encoding="utf-8"))


def test_no_prose_prints_its_own_markup():
    """Every `**` in a paragraph is matched, so none can arrive as a literal mark."""
    offenders = []
    for book in books.discover_books():
        for path in sorted(book.docs.rglob("*.md")):
            if "assets/data" in path.parts:
                continue
            for block in re.split(r"\n\s*\n", _prose(path)):
                if CODE.sub("", block).count("**") % 2:
                    offenders.append(
                        f"{path}: {block.strip()[:90]!r}"
                    )
    assert not offenders, (
        "an unclosed `**` renders as two asterisks in the middle of a sentence:\n  "
        + "\n  ".join(offenders)
    )


def test_no_prose_collides_two_bold_runs():
    offenders = []
    for book in books.discover_books():
        for path in sorted(book.docs.rglob("*.md")):
            if "assets/data" in path.parts:
                continue
            for number, line in enumerate(_prose(path).splitlines(), 1):
                if COLLIDED.search(line):
                    offenders.append(f"{path}:{number}: {line.strip()[:80]!r}")
    assert not offenders, (
        "two bold runs that touch render as `<strong>…</strong>**`:\n  "
        + "\n  ".join(offenders)
    )


def test_no_prose_runs_two_sentences_together():
    """`it.A` is a missing space, and nothing in the pipeline notices one. The
    allowlist and the acronym and URL skips are names that put a dot before a
    capital without ending a sentence.
    """
    offenders = []
    for book in books.discover_books():
        for path in sorted(book.docs.rglob("*.md")):
            for number, line in enumerate(_prose(path).splitlines(), 1):
                if any(word in line for word in RUN_TOGETHER_ALLOWED):
                    continue
                if "http" in line or ABBREVIATION.search(line):
                    continue
                for match in RUN_TOGETHER.finditer(line):
                    context = line[max(0, match.start() - 30) : match.end() + 30]
                    offenders.append(f"{path}:{number}: …{context.strip()}…")
    assert not offenders, (
        "a sentence ran into the next one, with no space after the full stop:\n  "
        + "\n  ".join(offenders)
    )


def test_a_reference_with_no_link_is_not_left_in_brackets():
    """`[§1.3]` with no target prints brackets and all: the pattern is a section
    reference not followed by a link target or a colon (a definition).
    """
    special = re.compile(r"\[§[^\]]*\](?![(:\[])", re.M)
    offenders = []
    for book in books.discover_books():
        for path in sorted(book.docs.rglob("*.md")):
            if "assets/data" in path.parts:
                continue
            for number, line in enumerate(_prose(path).splitlines(), 1):
                for match in special.finditer(line):
                    offenders.append(f"{path}:{number}: {line.strip()[:80]!r}")
    assert not offenders, (
        "a section reference has no link target, so it prints its own brackets:\n  "
        + "\n  ".join(offenders)
    )



CARD_MARKER = "<!-- table: cards -->"
SEPARATOR = re.compile(r"^\|[\s:|-]+\|?$")


def card_markers_without_a_table(text: str) -> list[int]:
    """Line numbers of markers that are not followed by a header and a separator."""
    lines = text.splitlines()
    fenced = False
    offenders: list[int] = []
    for index, line in enumerate(lines):
        if line.lstrip().startswith("```"):
            fenced = not fenced
            continue
        if fenced or line.strip() != CARD_MARKER:
            continue
        after = [row.strip() for row in lines[index + 1 :] if row.strip()]
        if (
            len(after) < 2
            or not after[0].startswith("|")
            or not SEPARATOR.match(after[1])
        ):
            offenders.append(index + 1)
    return offenders


def test_a_card_table_marker_starts_a_table():
    """A marker mid-table splits it, and the orphan row prints its own pipes."""
    offenders = []
    for book in books.discover_books():
        for path in sorted(book.docs.rglob("*.md")):
            if "assets/data" in path.parts:
                continue
            for number in card_markers_without_a_table(
                path.read_text(encoding="utf-8")
            ):
                offenders.append(f"{path}:{number}")
    assert not offenders, (
        "a `<!-- table: cards -->` marker is not directly above a table's header row, "
        "so Markdown ends the table there and prints the next row as a line of pipes. "
        "Move the marker above the header, or merge the fragment into the table it "
        "belongs to:\n  " + "\n  ".join(offenders)
    )


def test_the_card_marker_gate_fires_on_a_split_table():
    """The rule must catch the shape the sweep produced: above the header passes,
    between the header and its body fails, between two body rows fails, and a marker
    inside a fenced block is code.
    """
    good = "<!-- table: cards -->\n| a | b |\n|---|---|\n| 1 | 2 |\n"
    split_body = "| a | b |\n|---|---|\n<!-- table: cards -->\n| 1 | 2 |\n"
    split_header = "| a | b |\n<!-- table: cards -->\n|---|---|\n| 1 | 2 |\n"
    quoted = "```\n<!-- table: cards -->\nnot a table\n```\n"
    assert card_markers_without_a_table(good) == []
    assert card_markers_without_a_table(split_body) == [3]
    assert card_markers_without_a_table(split_header) == [2]
    assert card_markers_without_a_table(quoted) == []
