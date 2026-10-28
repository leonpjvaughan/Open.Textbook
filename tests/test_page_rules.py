"""The three rules a new page is written to, and the offence that proves each catches.

The rules themselves are in `rules.py`, because they are about a page's text and not
about this book. This file is the guard the handoff asks for: *"a check with no test
rots"*. So every rule has a case that violates it and a case that satisfies it, and
the tree-wide cases assert the number the rules measure rather than a number somebody
typed.

The two tree-wide cases are a **ratchet**, for the reason `lint.SENTENCE_DEBT` is: the
book carries 462 prose lines over 80 columns and one code line over 72, both measured
when the rule was written. The debt may only go down — the reflow task drives it to
zero — and a new page written to the limit cannot silently join it, because the count
is what is asserted, not the presence of offences.
"""

from __future__ import annotations

import textwrap

import pytest

import rules
from textbook import book as books

MAP = "numerical-methods"


def map_book():
    return books.book_by_id(MAP)


def pages():
    """Every authored page of the book, with its path relative to `docs/`."""
    docs = map_book().docs
    return [
        (page.relative_to(docs).as_posix(), page.read_text(encoding="utf-8"))
        for page in sorted(docs.rglob("*.md"))
        if "assets" not in page.parts
    ]


# --- the code width -------------------------------------------------------------


def test_code_over_the_limit_is_reported_with_its_line():
    page = "# Page\n\n```python\nn = 1\n" + "x = " + "1 + " * 20 + "1\n```\n"
    offences = rules.code_too_wide(page)
    assert [line for line, _ in offences] == [5]
    assert offences[0][1] > rules.CODE_COLUMNS


def test_code_at_the_limit_is_not_reported():
    line = "x = " + "1+" * 33 + "1"
    line += " " * (rules.CODE_COLUMNS - len(line))
    assert len(line) == rules.CODE_COLUMNS
    assert rules.code_too_wide(f"```python\n{line}\n```\n") == []


def test_a_long_prose_line_is_not_code():
    """The two limits are separate, and a page that confuses them reports nothing."""
    page = "A sentence. " * 12 + "\n"
    assert rules.code_too_wide(page) == []
    assert rules.prose_too_wide(page)


def test_the_tree_has_no_code_line_over_the_limit():
    """The ratchet: the one 81-column docstring line is gone with the reflow.

    A new offence is a failure here rather than a raised debt, because the book is
    now written to the rule and every page added after it is measured against it.
    """
    over = []
    for name, text in pages():
        over.extend((name, line) for line, _ in rules.code_too_wide(text))
    assert over == [], f"code lines over {rules.CODE_COLUMNS} columns: {over}"


# --- the prose width ------------------------------------------------------------


def test_prose_over_the_limit_is_reported():
    page = "word " * 20 + "\n"
    offences = rules.prose_too_wide(page)
    assert [line for line, _ in offences] == [1]


def test_prose_at_the_limit_is_not_reported():
    line = "word " * 15 + "x" * (rules.PROSE_COLUMNS - 75)
    assert len(line) == rules.PROSE_COLUMNS
    assert rules.prose_too_wide(line + "\n") == []


@pytest.mark.parametrize(
    "exempt",
    [
        "| " + "cell " * 20 + "|",
        "- [A reference with a long address](https://doi.org/10.1137/1.9780898717839)",
        "## A heading that runs on for a very long time and is still a heading, not prose",
    ],
    ids=["table-row", "link", "heading"],
)
def test_the_exemptions_are_the_four_the_handoff_names(exempt):
    """A table row, a link and a heading are layouts, not sentences to wrap."""
    assert rules.prose_too_wide(exempt + "\n") == []


def test_display_maths_is_not_wrapped():
    page = "$$\n" + "a + " * 25 + "b\n$$\n"
    assert rules.prose_too_wide(page) == []


def test_a_fenced_line_is_not_prose():
    page = "```text\n" + "x" * 100 + "\n```\n"
    assert rules.prose_too_wide(page) == []


def test_a_generated_page_is_not_ours_to_reflow():
    """`colophon.md` is written by `scaffold.colophon_page`; reflowing it is undone."""
    page = "<!-- Generated from collection.yaml and sources.yaml.\n-->\n\n" + "word " * 20 + "\n"
    assert rules.prose_too_wide(page) == []


def test_the_tree_matches_the_prose_debt():
    """The ratchet, and the reason it may only go down.

    `PROSE_DEBT` is 462 for this book — the count when the rule was written. A page
    written to the limit leaves it alone; a page that ignores the limit raises it and
    fails here, which is the only moment anybody can cheaply fix it.
    """
    total = sum(len(rules.prose_too_wide(text)) for _, text in pages())
    assert total == rules.PROSE_DEBT[MAP], (
        f"the book now has {total} prose lines over {rules.PROSE_COLUMNS} columns, "
        f"and PROSE_DEBT says {rules.PROSE_DEBT[MAP]}. Fix the new lines, or lower "
        "the debt if you fixed old ones."
    )


# --- the folds ------------------------------------------------------------------


def test_a_fold_with_no_summary_is_reported():
    assert rules.folds_without_a_summary("<details markdown=\"1\">\n\ntext\n\n</details>\n") == [1]


@pytest.mark.parametrize("summary", ["Click here", "More", "Details", "Open", "…"])
def test_a_summary_that_names_nothing_is_reported(summary):
    page = f'<details markdown="1"><summary>{summary}</summary>\n\nx\n\n</details>\n'
    assert rules.folds_without_a_summary(page) == [1]


@pytest.mark.parametrize("summary", ["Hint", "Next step", "Check your answers", "The full listing"])
def test_a_summary_that_names_its_contents_is_accepted(summary):
    """One word is enough when the word is the contents: `Hint` is the collection's idiom."""
    page = f'<details markdown="1"><summary>{summary}</summary>\n\nx\n\n</details>\n'
    assert rules.folds_without_a_summary(page) == []


def test_the_block_spelling_of_a_fold_is_read():
    """The reported line is the ``<details>``, because that is the line a reader sees."""
    page = '<details markdown="1">\n<summary>Least squares, in full</summary>\n\nx\n\n</details>\n'
    assert rules.folds_without_a_summary(page) == []
    nameless = '<details markdown="1">\n<summary>More</summary>\n\nx\n\n</details>\n'
    assert rules.folds_without_a_summary(nameless) == [1]


def test_a_nameless_fold_later_on_the_page_reports_its_own_line():
    page = "# Page\n\ntext\n\n<details>\n<summary>Click here</summary>\n\nx\n\n</details>\n"
    assert rules.folds_without_a_summary(page) == [5]


def test_a_page_that_documents_a_fold_is_not_read_as_having_one():
    """`books/AGENTS.md` explains `<details markdown="1">` in backticks.

    Read literally, the rule demanded a summary from a paragraph *about* folds — which
    is how a rule gets switched off. Inline code spans are blanked before the scan.
    """
    page = "A `<details markdown=\"1\">` block needs a summary so a reader knows.\n"
    assert rules.folds_without_a_summary(page) == []


def test_no_page_in_the_collection_has_a_nameless_fold():
    """The rule holds today, in every book, with no debt — so it starts enforced."""
    offenders = []
    for path in sorted((books.repo_root() / "books").rglob("*.md")):
        text = path.read_text(encoding="utf-8")
        offenders.extend(
            f"{path.relative_to(books.repo_root())}:{line}"
            for line in rules.folds_without_a_summary(text)
        )
    assert offenders == [], f"a fold whose summary names nothing: {offenders}"


# --- the detail-page skeleton ---------------------------------------------------

GOOD_PAGE = textwrap.dedent(
    """\
    # An average, and its error bar

    ## What this page answers

    Why the error falls as one over the root of the runs.

    ## The mathematics

    The variance of a mean of $N$ independent draws is $\\sigma^2/N$.

    ## The code

    ```python
    print("N  estimate")
    print(4, 1.0)
    ```

    ```text
    N  estimate
    4  1.0
    ```

    ## The theory

    Independent draws add their variances.

    ## What this cost

    Four times the work buys half the error.

    ## Back to the map

    [Averaging](index.md) puts this among the samplers.
    """
)


def test_a_detail_page_that_keeps_the_skeleton_has_no_offences():
    assert rules.detail_page_offences(GOOD_PAGE) == []


def test_a_detail_page_missing_a_heading_says_which():
    page = GOOD_PAGE.replace("## What this cost", "## The price")
    offences = rules.detail_page_offences(page)
    assert any("missing headings" in o and "What this cost" in o for o in offences), offences


def test_a_detail_page_with_the_headings_out_of_order_is_reported():
    """Six headings in the wrong order is the defect the class pages already fixed."""
    first = GOOD_PAGE.index("## The mathematics")
    second = GOOD_PAGE.index("## The code")
    swapped = (
        GOOD_PAGE[:first]
        + GOOD_PAGE[second : GOOD_PAGE.index("## The theory")]
        + GOOD_PAGE[first:second]
        + GOOD_PAGE[GOOD_PAGE.index("## The theory") :]
    )
    assert "the six headings are out of order" in rules.detail_page_offences(swapped)


def test_a_detail_page_with_a_program_and_no_output_is_reported():
    page = GOOD_PAGE.replace("```text\nN  estimate\n4  1.0\n```\n", "")
    assert "```text" not in page
    assert "a program with no printed output beside it" in rules.detail_page_offences(page)


def test_a_detail_page_with_no_program_is_reported():
    start = GOOD_PAGE.index("## The code")
    end = GOOD_PAGE.index("## The theory")
    page = GOOD_PAGE[:start] + GOOD_PAGE[end:]
    assert "no fenced python program" in rules.detail_page_offences(page)
