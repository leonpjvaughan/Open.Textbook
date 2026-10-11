"""The linter's internal-word table keeps the narrow sense of "the bank".

``INTERNAL_PHRASES`` gates words of ours that must never reach the reader. "The
bank" is one of ours — a problem bank — but it is also ordinary English, and a
chapter may legitimately write "the bank adds interest" or "the far bank of the
river". A rule that cannot tell those apart reports a page that is not there,
which trains the author to ignore the gate.

These pin both halves: the English word passes, the internal phrase is caught.
"""

from __future__ import annotations

from collections import Counter
from pathlib import Path

import pytest

from textbook import lint
from textbook.book import Book


def internal_findings(tmp_path: Path, monkeypatch, text: str) -> list[str]:
    """Lint one authored page and return its ``voice:internal`` examples."""
    (tmp_path / "curriculum.yaml").write_text("chapters: []\n", encoding="utf-8")
    docs = tmp_path / "docs"
    docs.mkdir()
    (docs / "page.md").write_text(text, encoding="utf-8")
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
    return examples.get("voice:internal", [])


@pytest.mark.parametrize(
    "sentence",
    [
        "Each year the bank adds 5% interest to the account.",
        "A swimmer heads for the far bank of the river.",
        "The bank of England sets the interest rate.",
    ],
)
def test_the_english_word_bank_is_not_an_internal_word(
    tmp_path, monkeypatch, sentence
):
    assert internal_findings(tmp_path, monkeypatch, f"# Page\n\n{sentence}\n") == []


@pytest.mark.parametrize(
    "sentence",
    [
        "The answers come from the problem bank.",
        "The questions in the bank of problems are checked.",
    ],
)
def test_the_internal_bank_phrases_are_still_reported(tmp_path, monkeypatch, sentence):
    examples = internal_findings(tmp_path, monkeypatch, f"# Page\n\n{sentence}\n")
    assert examples, f"{sentence!r} is no longer reported as an internal word"
