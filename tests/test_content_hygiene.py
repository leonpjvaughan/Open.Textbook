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
