"""Common-error and quick-check callouts: exact matching, corpus counts and CSS.

Every Learn page carries a ``> **Watch out.**`` common-error callout, and inline
checks open with ``> **Check.**``. Without a hook both render as plain
``<blockquote>`` elements, indistinguishable from ordinary quotations and
indented 40px off the column margin.

These tests pin three things:

* the hook matches only the exact bold leads ``**Watch out.**`` and
  ``**Check.**`` at the start of a blockquote, outside code fences, without
  merging adjacent blockquotes or misclassifying prefixes such as
  ``**Checking forever.**``;
* over the full corpus (``books/*/docs/**/*.md``), the exact counts hold:
  757 ``callout--error`` + 1 ``callout--check`` (758 total), while every other
  blockquote remains an untouched ``<blockquote>``;
* ``extra.css`` gives ``.callout`` the neutral framed signature using tokens
  only — no background tint, no ``::before`` pseudo-element, no hard-coded
  colour and no stray corner radius.
"""

from __future__ import annotations

import re

import markdown as markdown_lib
import pytest

from textbook import frontmatter, pipeline
from textbook.book import repo_root
from textbook.hooks import callouts

ROOT = repo_root()
EXTRA = ROOT / "assets" / "stylesheets" / "extra.css"


def render(source: str) -> str:
    """Run the callout hook and render Markdown identically to the pipeline."""
    transformed = callouts.on_page_markdown(source, None, {}, [])
    return markdown_lib.markdown(
        transformed, extensions=pipeline.EXTENSIONS, output_format="html5"
    )


# --- exact matching -----------------------------------------------------------


def test_watch_out_blockquote_becomes_error_callout():
    html = render(
        "> **Watch out.** Adding a zero changes the number.\n"
        "> **Re-check:** move the digits.\n"
    )
    assert '<aside class="callout callout--error">' in html
    assert "<strong>Watch out.</strong>" in html
    assert "<strong>Re-check:</strong>" in html
    assert "<blockquote>" not in html


def test_check_blockquote_becomes_check_callout():
    html = render("> **Check.** What is the digit $2$ worth in $4\\,357.286$?\n")
    assert '<aside class="callout callout--check">' in html
    assert "<strong>Check.</strong>" in html
    assert "<blockquote>" not in html


def test_multi_paragraph_callout_stays_one_aside():
    html = render(
        "> **Watch out.** First paragraph.\n"
        ">\n"
        "> Second paragraph.\n"
    )
    assert html.count('<aside class="callout callout--error">') == 1
    assert html.count("<p>") == 2
    assert "<blockquote>" not in html


def test_adjacent_callouts_separated_by_blank_line_stay_separate():
    html = render(
        "> **Watch out.** First trap.\n"
        "\n"
        "> **Watch out.** Second trap.\n"
    )
    assert html.count('<aside class="callout callout--error">') == 2
    assert "<blockquote>" not in html


def test_callout_adjacent_to_plain_blockquote_does_not_swallow_it():
    """Python-Markdown merges blank-line-separated blockquotes; the Markdown hook
    keeps them distinct so an Explain or Progress check quote stays a quote."""
    html = render(
        "> **Explain:** What happens when the multiplier is above $1$?\n"
        "\n"
        "> **Watch out.** Do not add the multiplier.\n"
        "\n"
        "> **Progress check.** Which formula gives the speed?\n"
    )
    assert html.count('<aside class="callout callout--error">') == 1
    assert html.count("<blockquote>") == 2
    aside = re.search(r'<aside class="callout callout--error">(.*?)</aside>', html, re.S)
    assert aside is not None
    assert "Explain:" not in aside.group(1)
    assert "Progress check." not in aside.group(1)


@pytest.mark.parametrize(
    "source",
    [
        "> **Checking forever.** No finite list of values is a proof.\n",
        "> **Check** without a full stop.\n",
        "> **Check:** with a colon.\n",
        "> **Watch out** without a full stop.\n",
        "> **Watch out:** with a colon.\n",
        "> **Watch out!** with an exclamation mark.\n",
        "> Watch out. Plain unbolded lead.\n",
        "> **Progress check.** Not a quick check.\n",
        "> **First contact.** Lead line.\n>\n> **Watch out.** Not the first inline.\n",
    ],
)
def test_non_matching_blockquotes_stay_untouched(source: str):
    assert callouts.on_page_markdown(source, None, {}, []) == source
    html = render(source)
    assert "<aside" not in html
    assert "<blockquote>" in html


def test_fenced_code_containing_watch_out_is_untouched():
    source = "```markdown\n> **Watch out.** Example in a fence.\n```\n"
    assert callouts.on_page_markdown(source, None, {}, []) == source
    html = render(source)
    assert "<aside" not in html
    assert "<pre><code" in html


def test_callout_inside_toggle_wrapper_renders_cleanly():
    source = (
        '<div class="tier-higher" data-tier="higher" markdown="1">\n\n'
        "> **Watch out.** Check $x < 0$.\n\n"
        "</div>\n"
    )
    html = render(source)
    assert '<div class="tier-higher" data-tier="higher">' in html
    assert '<aside class="callout callout--error">' in html
    assert "<blockquote>" not in html


# --- corpus contract ----------------------------------------------------------


def test_corpus_exact_callout_and_untouched_blockquote_counts():
    """Pin the corpus classification: 757 error + 1 check = 758 callouts,
    4,272 other ``> `` lines (and every non-callout blockquote) untouched."""
    files = sorted((ROOT / "books").glob("*/docs/**/*.md"))
    assert files, "no book markdown files found"

    gt_space_lines = 0
    watch_out_openers = 0
    check_openers = 0

    classified_error = 0
    classified_check = 0
    untouched_blocks = 0
    untouched_rendered_bq = 0

    for path in files:
        raw = path.read_text(encoding="utf-8")
        _, body = frontmatter.split(raw)

        for line in body.splitlines():
            if line.startswith("> "):
                gt_space_lines += 1
                if re.match(r"^>\s*\*\*Watch out\.\*\*(?:[ \t]|$)", line):
                    watch_out_openers += 1
                elif re.match(r"^>\s*\*\*Check\.\*\*(?:[ \t]|$)", line):
                    check_openers += 1

        transformed = callouts.on_page_markdown(body, None, {}, [])
        n_error = transformed.count('<aside class="callout callout--error" markdown="1">')
        n_check = transformed.count('<aside class="callout callout--check" markdown="1">')
        classified_error += n_error
        classified_check += n_check

        # Count remaining contiguous blockquote blocks in transformed markdown.
        in_fence = False
        in_quote = False
        for line in transformed.splitlines():
            if re.match(r"^ {0,3}(?:`{3,}|~{3,})", line):
                in_fence = not in_fence
                in_quote = False
                continue
            if not in_fence and callouts.QUOTE_LINE.match(line):
                if not in_quote:
                    untouched_blocks += 1
                    in_quote = True
            else:
                in_quote = False

        # Spot-check files that carry known edge cases.
        rel = path.relative_to(ROOT).as_posix()
        if rel == "books/a-level-maths/docs/Chapter 1/Section 1.3/Walkthrough/index.md":
            assert n_error == 1 and n_check == 0
            assert "**Checking forever.**" in transformed
        elif rel == "books/gcse-maths/docs/Chapter 10/Section 10.5/Walkthrough/index.md":
            assert n_error == 1 and n_check == 0
            assert "> **Explain:**" in transformed
        elif rel == "books/gcse-maths/docs/Chapter 7/Section 7.2/Walkthrough/index.md":
            assert n_error == 1 and n_check == 0
            assert "> **Progress check.**" in transformed

        if n_error or n_check or untouched_blocks:
            # Verify no rendered <blockquote> starts with Watch out. or Check.
            if ">" in body:
                html = markdown_lib.markdown(
                    transformed, extensions=pipeline.EXTENSIONS, output_format="html5"
                )
                for m in re.finditer(r"<blockquote>(.*?)</blockquote>", html, re.S):
                    untouched_rendered_bq += 1
                    inner = m.group(1).lstrip()
                    assert not re.match(r"^<p>\s*<strong>(?:Watch out|Check)\.</strong>", inner), (
                        f"unclassified callout in {rel}: {inner[:80]}"
                    )

    assert watch_out_openers == 757
    assert check_openers == 1
    assert gt_space_lines == 5030
    assert gt_space_lines - watch_out_openers - check_openers == 4272
    assert classified_error == 757
    assert classified_check == 1
    assert classified_error + classified_check == 758
    assert untouched_blocks == 281
    assert untouched_rendered_bq > 0


# --- built page end to end ----------------------------------------------------


def test_real_learn_page_renders_both_callout_kinds(tmp_path):
    """GCSE Maths 1.1 Learn carries one Check. and two Watch out. callouts."""
    result = pipeline.build("gcse-maths", "higher", out=tmp_path / "book", chapter=1)
    assert result.ok, result.broken + result.maths_errors
    html = (result.out / "chapter-1/section-1.1/learn/index.html").read_text(encoding="utf-8")
    assert html.count('<aside class="callout callout--error">') == 2
    assert html.count('<aside class="callout callout--check">') == 1
    assert "<blockquote>" not in html


# --- neutral stylesheet signature ---------------------------------------------


def test_callout_stylesheet_uses_neutral_framed_signature():
    css = re.sub(r"/\*.*?\*/", "", EXTRA.read_text(encoding="utf-8"), flags=re.S)
    match = re.search(r"\.md-typeset\s+\.callout\s*\{([^}]*)\}", css)
    assert match, "extra.css has no rule for .md-typeset .callout"
    body = match.group(1)

    assert "border: 1px solid var(--tb-rule)" in body
    assert "border-inline-start: 3px solid var(--tb-rule)" in body
    assert "border-radius: var(--tb-radius)" in body
    assert "padding: 0.6rem 0.95rem" in body
    assert "margin-inline: 0" in body
    assert "max-width: var(--tb-measure)" in body
    assert "background" not in body, "callout must stay neutral with no tint"
    assert not re.search(r"\.callout[^}]*::before", css), "callout must not use ::before"
