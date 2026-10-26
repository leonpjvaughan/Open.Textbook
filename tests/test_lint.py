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


# --- the words that call a model worthless ------------------------------------
#
# `books/maths-applied/AGENTS.md` used to ban eight words outright when describing
# a model and call the last two "the seductive ones", while the lint enforced four
# of them. A word rule is right for the words whose disparagement is in the word,
# and wrong for the ones where it depends on what the word is attached to: over the
# collection `real` appears 625 times (real numbers, real roots, a real image) and
# `full` 5,353 (5,097 of them "full working"), so both are a review note. `naive`
# and `toy` are rules, and the two ordinary senses the collection writes are rows.


def style_findings(tmp_path: Path, monkeypatch, text: str) -> list[str]:
    """Lint one authored page and return its ``voice:style-word`` examples."""
    findings, examples = lint_page(tmp_path, monkeypatch, text)
    return examples.get("voice:style-word", [])


@pytest.mark.parametrize(
    "sentence",
    [
        "A naive model assumes the road is flat.",
        "This is a toy model of the suspension.",
    ],
)
def test_a_model_called_naive_or_a_toy_is_reported(tmp_path, monkeypatch, sentence):
    assert style_findings(tmp_path, monkeypatch, f"# Page\n\n{sentence}\n"), (
        f"{sentence!r} is no longer reported as a style word"
    )


@pytest.mark.parametrize(
    "sentence",
    [
        "The naive error bar is then too small, sometimes by a factor of a hundred.",
        "A toy car of mass 0.50 kg moves at 2.0 m/s.",
    ],
)
def test_the_ordinary_senses_of_naive_and_toy_are_not_reported(
    tmp_path, monkeypatch, sentence
):
    assert style_findings(tmp_path, monkeypatch, f"# Page\n\n{sentence}\n") == []


def test_real_full_and_properly_are_a_note_not_a_rule(tmp_path, monkeypatch):
    """The measurement is the argument, so the decision is pinned.

    625 uses of ``real``, 5,353 of ``full`` and 9 of ``properly`` in the collection
    are ordinary English. A blanket word rule is what would fire on them, so a rule
    added here has to argue with these counts rather than with this test.
    """
    text = (
        "# Page\n\n"
        "The real roots are real numbers, and the full travel is 40 mm.\n"
        "Work out the real length of the path properly.\n"
    )
    assert style_findings(tmp_path, monkeypatch, text) == []


# --- a finding fails the gate -------------------------------------------------
#
# The linter returned 0 whatever it found, so `scripts/check.sh` passed while 42
# findings sat in five books. The repository's own definition of done says the
# linter reports nothing for a book; these two tests make that the gate's
# business rather than a line of output someone has to notice.


def test_the_collection_is_lint_clean():
    """Every authored page in every book passes, so a new finding fails CI."""
    from textbook import book as books

    findings: Counter = Counter()
    examples: dict[str, list[str]] = {}
    for book in books.discover_books():
        lint.lint(book, fix=False, findings=findings, examples=examples)
    assert not findings, "\n".join(
        f"{category}: {count}  e.g. {examples[category][0]}"
        for category, count in findings.most_common()
    )


def test_a_finding_makes_the_command_fail(tmp_path, monkeypatch):
    """`main` exits non-zero when a book has a finding, and zero when it does not."""
    (tmp_path / "curriculum.yaml").write_text("chapters: []\n", encoding="utf-8")
    docs = tmp_path / "docs"
    docs.mkdir()
    page = docs / "page.md"

    page.write_text("# Page\n\nThis is fine.\n", encoding="utf-8")
    monkeypatch.setattr(lint.books, "discover_books", lambda: [_fixture_book(tmp_path)])
    # `main` reads the command line, so it must be the test's, not pytest's.
    monkeypatch.setattr("sys.argv", ["lint"])
    assert lint.main() == 0

    # "obviously" is a voice finding: a shaming word.
    page.write_text("# Page\n\nThis is obviously fine.\n", encoding="utf-8")
    assert lint.main() == 1


def _fixture_book(root: Path) -> Book:
    return Book(
        id="fixture",
        title="Fixture",
        qualification="GCSE",
        subject="Mathematics",
        description="",
        root=root,
    )


# --- the sentence ceiling reads paragraphs, not lines -------------------------
#
# The rule used to test one physical line at a time. Every page is hard-wrapped
# near 80 columns, so a 40-word sentence was spread over three lines, each under
# the ceiling, and the rule that was documented to catch it could never fire.
# These pin the paragraph as the unit, and the debt table as a per-book ratchet
# rather than a per-page allowance.

LONG_SENTENCE = (
    "Each of the words in this deliberately long sentence is here to make the total "
    "length cross the ceiling that the rule applies to a paragraph of prose when it "
    "is wrapped across several lines by the author."
)


def wrapped(text: str) -> str:
    """The sentence as the pages write it: hard-wrapped near 80 columns."""
    words = text.split()
    lines, line = [], ""
    for word in words:
        if len(line) + len(word) + 1 > 72:
            lines.append(line)
            line = word
        else:
            line = f"{line} {word}".strip()
    lines.append(line)
    return "\n".join(lines)


def test_a_wrapped_long_sentence_is_one_finding(tmp_path, monkeypatch):
    text = f"# Page\n\n{wrapped(LONG_SENTENCE)}\n"
    findings, examples = lint_page(tmp_path, monkeypatch, text)
    assert findings["style:long-sentence"] == 1, examples
    assert len(examples["style:long-sentence"]) == 1


def test_a_short_sentence_is_not_reported(tmp_path, monkeypatch):
    text = "# Page\n\nA short sentence is not over the ceiling, even when it wraps.\n"
    findings, _ = lint_page(tmp_path, monkeypatch, text)
    assert "style:long-sentence" not in findings


def test_a_table_cell_is_not_a_sentence(tmp_path, monkeypatch):
    row = "| " + " ".join(["word"] * 40) + " |"
    text = f"# Page\n\n| column | other |\n|---|---|\n{row}\n"
    findings, _ = lint_page(tmp_path, monkeypatch, text)
    assert "style:long-sentence" not in findings


def test_a_list_item_is_not_a_sentence(tmp_path, monkeypatch):
    text = f"# Page\n\n- {wrapped(LONG_SENTENCE)}\n"
    findings, _ = lint_page(tmp_path, monkeypatch, text)
    assert "style:long-sentence" not in findings


def test_the_debt_is_the_books_not_the_pages(tmp_path, monkeypatch):
    """Two long sentences on two pages, one unit of debt: one finding."""
    (tmp_path / "curriculum.yaml").write_text("chapters: []\n", encoding="utf-8")
    docs = tmp_path / "docs"
    docs.mkdir()
    for name in ("one.md", "two.md"):
        (docs / name).write_text(f"# Page\n\n{wrapped(LONG_SENTENCE)}\n", encoding="utf-8")

    monkeypatch.setitem(lint.SENTENCE_DEBT, "fixture", 1)
    findings: Counter = Counter()
    examples: dict[str, list[str]] = {}
    lint.lint(_fixture_book(tmp_path), fix=False, findings=findings, examples=examples)
    assert findings["style:long-sentence"] == 1, examples

    monkeypatch.setitem(lint.SENTENCE_DEBT, "fixture", 0)
    findings = Counter()
    examples = {}
    lint.lint(_fixture_book(tmp_path), fix=False, findings=findings, examples=examples)
    assert findings["style:long-sentence"] == 2, examples


def test_front_matter_is_not_a_sentence(tmp_path, monkeypatch):
    """A description is data for the engine, not prose for the reader."""
    text = (
        "---\n"
        f"description: {LONG_SENTENCE}\n"
        "---\n\n"
        "# Page\n\n"
        "A short sentence.\n"
    )
    findings, _ = lint_page(tmp_path, monkeypatch, text)
    assert "style:long-sentence" not in findings
