"""Internal words must never reach the reader.

`textbook.lint` reports these, but it reports and exits 0: a lint finding is a
note, not a gate, because the book carries a standing number of style advisory
items and a long line has never broken a reader's day. The phrases below are a
different kind of finding. Each is a word of ours — a page name, a coverage code,
a piece of our vocabulary — with no legitimate place on a page, so a single
occurrence is a bug rather than a budget item. That is why this is a test and not
a lint threshold.

The 2026-10-11 pedagogy audit found two of them in the wild: five Chapter 16
Walkthroughs printed `**DfE coverage:** G3` to the reader (the refs already live
in front matter as `dfe: [G3]`), and four pages called the middle page "Guided
problems" while the navigator called it "Practise with help". Both are fixed;
this stops them coming back.

The gate reuses the linter's own filter rather than a second regex, so a phrase
added to `INTERNAL_PHRASES` is gated the moment it is added — see
`test_the_gate_covers_the_reader_facing_page_names`.
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
    """The stub skip must not swallow a real violation.

    The linter skips a page that still carries ``<!-- scaffold:stub -->``: a
    stub's body is a note to the author, and the marker itself contains the
    word ``scaffold``. That skip is only sound while an authored page is still
    gated, so this pins both halves — a page without the marker that says
    "Guided problems" fails, and the same page with the marker does not.
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
    # The linter reports paths relative to the book it is given, so this fixture
    # needs no module-level root — it used to patch one captured at import.

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
    """A phrase that leaves the linter's list leaves this gate silently.

    The check is deliberately a substring match on the pattern table: if one of
    these is ever removed or renamed there, this fails rather than quietly
    gating nothing.
    """
    patterns = " ".join(lint.INTERNAL_PHRASES)
    assert phrase.split()[0] in patterns, f"{phrase!r} is no longer gated"


# --- a lost backslash renders silently ----------------------------------------
#
# Found while writing the proof book, in three pages nobody had looked at.
# `\times`, `\text` and `\tan` had each lost their `\t` to a literal tab, so
# `(n-2)\times180` was rendering as `(n-2) imes180` — and `\text{co-interior
# angles}` as `ext{...}`.
#
# **KaTeX does not error on any of it.** `i`, `m`, `e`, `s` are all valid maths
# tokens, so the page renders a wrong answer cheerfully, `throwOnError` is never
# reached, and the `math-error` grep the gate runs reports nothing. The build
# checks links, maths *errors* and structure; it cannot tell that a formula is
# wrong.
#
# So the check is on the input rather than the output: a tab in a content file is
# never wanted. Markdown does not need one for indentation, and the only way one
# has arrived so far is by eating the `\t` of a LaTeX command.

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


# --- a markdown mark that renders as itself -------------------------------------
#
# The tab check above is one instance of a family: damage the build cannot see. A
# literal tab makes the maths wrong; a mark left unbalanced makes the page *show the
# mark*. Both render cheerfully, exit 0 and pass every other check, because the
# renderer has no opinion about them.
#
# Found in `maths-applied`'s main thread on 2026-11-01, in four separate shapes:
#
#   `**This chapter's question. It is [the chapter problem]...`   an unclosed `**`,
#       which printed two asterisks at the start of §1.1's second paragraph
#   `travel.****`                                                 two bold runs
#       colliding, which printed the collided pair after §1.6's key sentence
#   `[§1.3] meets`                                                a reference whose
#       link target had been lost, printed in square brackets in ten places
#   `it.A projection`                                             a sentence run
#       into the next, in eight places
#
# Every one was in the pages that carry the chapter's argument, and none was visible
# to `textbook.lint`, to the broken-link check (there was no link to break) or to the
# `math-error` grep. So the checks are below, and they are on the source rather than
# on the output: a rendered page has no trace of a space that should be there.

#: A block of prose, which is the unit emphasis has to balance over. Fenced code is
#: removed first: a snippet is not prose, and a `**` in it is Python's power operator.
FENCE = re.compile(r"```.*?```", re.S)
CODE = re.compile(r"`[^`]*`")
#: Four or more asterisks in a row. Two bold runs that meet produce these, and the
#: renderer closes the first and prints the rest.
COLLIDED = re.compile(r"\*{4,}")
#: A sentence that ends and the next that begins with no space between them. The
#: character before the capital has to be a full stop, a question mark, an
#: exclamation mark, or the closing asterisks of a bold run. The capital is any
#: capital, not a capital followed by a lowercase letter: the eight found in
#: `maths-applied` all began with the word "A".
RUN_TOGETHER = re.compile(r"[.?!]\*{0,4}(?=[A-Z])")
#: An initialised acronym — `A.C.`, `R.M.S.`, and the like — is one word with dots
#: inside it, and every one of the 43 candidates this rule found outside the two
#: reference books was one of these. A line carrying one is not inspected.
ABBREVIATION = re.compile(r"(?:^|[^A-Za-z])[A-Z](?:\.[A-Z])+\.")
#: A named licence holder and a URL path both contain letter-dot-capital at a
#: sentence boundary without being two sentences.
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
    """`it.A` is a missing space, and nothing in the pipeline notices one.

    The allowlist is proper nouns and licence names, not a way to excuse prose: a
    domain name (`Open.Textbook`) and a copyright holder's surname
    (`A.d.Tramontana`) put a dot before a capital letter without ending a sentence.
    Initialised acronyms and URLs are skipped on the line, for the same reason.
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
    """`[§1.3]` with no target prints as `[§1.3]`, brackets and all.

    Ten of these were left in `maths-applied` when a link target was lost. A reader
    who follows the bracket finds nothing, and a reader who does not finds a
    paragraph that looks unfinished. The pattern is a section reference in square
    brackets that is not followed by a link target or a colon (a definition).
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


# --- a table marker has to start a table ----------------------------------------
#
# `<!-- table: cards -->` is read by `wrap_tables` in `pipeline.py`, which turns the
# table that follows into one card per row on a phone. The marker is a comment, so if
# it lands anywhere else — between a header and its body, or between two body rows —
# Markdown ends the table there and prints the row below it as a paragraph of pipes:
#
#   | Upper wishbone to the upright, at the joint | 1 | 2 |
#
# A sweep for the wider-font tables inserted 127 markers and put **75** of them
# inside a table, on 42 files, in ten books. Nothing failed: the build
# exits 0, the page renders, and the damage is a line of vertical bars in the prose.
# This is the positional rule the sweep should have used. It is not a column count —
# every fragment still had its header's arity, so a count finds nothing.

CARD_MARKER = "<!-- table: cards -->"
#: The row that makes a header a table: pipes, dashes and optional alignment colons.
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
    """The rule must catch the exact shape the 2026-11-03 sweep produced.

    Three placements, one right and two wrong: above the header passes; between the
    header and its body fails; between two body rows fails. A marker inside a fenced
    block is code that shows the marker, not a marker.
    """
    good = "<!-- table: cards -->\n| a | b |\n|---|---|\n| 1 | 2 |\n"
    split_body = "| a | b |\n|---|---|\n<!-- table: cards -->\n| 1 | 2 |\n"
    split_header = "| a | b |\n<!-- table: cards -->\n|---|---|\n| 1 | 2 |\n"
    quoted = "```\n<!-- table: cards -->\nnot a table\n```\n"
    assert card_markers_without_a_table(good) == []
    assert card_markers_without_a_table(split_body) == [3]
    assert card_markers_without_a_table(split_header) == [2]
    assert card_markers_without_a_table(quoted) == []
