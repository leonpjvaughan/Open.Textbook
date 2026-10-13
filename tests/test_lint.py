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
    findings, examples = lint_page(tmp_path, monkeypatch, text)
    return examples.get("voice:internal", [])


def lint_page(tmp_path: Path, monkeypatch, text: str):
    """Lint one authored page and return (findings, examples)."""
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
    # No patching of a module-level root: the linter reports paths relative to the
    # book it is given, and this fixture already gives it one rooted at `tmp_path`.
    # It used to read a `lint.ROOT` captured at import, which is the cwd and
    # `TEXTBOOK_ROOT` at the moment the module loaded.
    findings: Counter = Counter()
    examples: dict[str, list[str]] = {}
    lint.lint(book, fix=False, findings=findings, examples=examples)
    return findings, examples


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


# --- maths is not prose -------------------------------------------------------


def test_multiline_display_maths_is_not_linted_as_prose(tmp_path, monkeypatch):
    """A ``$$ … $$`` block spans lines, so it was linted a line at a time.

    ``\\color{red}`` inside display maths was reported as a US spelling and
    ``\\,`` as a missing space — the linter telling mathematics to use British
    English and to put a space after its commas.
    """
    text = (
        "# Page\n"
        "\n"
        "Some prose that is fine.\n"
        "\n"
        "$$\n"
        "\\color{red} x \\, y = 1\n"
        "$$\n"
        "\n"
        "This is obviously wrong.\n"
        "More prose.\n"
    )
    findings, examples = lint_page(tmp_path, monkeypatch, text)
    assert "style:us-spelling" not in findings, examples.get("style:us-spelling")
    assert "mechanics:missing-space" not in findings, examples.get("mechanics:missing-space")


def test_removing_display_maths_keeps_the_line_numbers(tmp_path, monkeypatch):
    """The lines a match held become blank lines, not nothing.

    Otherwise every finding after a display block would cite a line number a
    reader would find empty, and the report would be unusable.
    """
    text = (
        "# Page\n"
        "\n"
        "$$\n"
        "x = 1\n"
        "$$\n"
        "\n"
        "This is obviously wrong.\n"
    )
    _findings, examples = lint_page(tmp_path, monkeypatch, text)
    assert any(":7:" in where for where in examples.get("voice:style-word", [])), examples
