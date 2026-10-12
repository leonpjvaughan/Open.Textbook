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
    monkeypatch.setattr(lint, "ROOT", tmp_path)

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
