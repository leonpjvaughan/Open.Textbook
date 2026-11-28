"""``<`` inside maths is written ``\\lt``, so ``md_in_html`` cannot read it as a tag."""

from __future__ import annotations

import json
import subprocess

import markdown as markdown_lib

from textbook import pipeline
from textbook.hooks import callouts, examples, mathlt


def test_less_than_inside_inline_maths_becomes_lt():
    assert mathlt.transform(r"List $-2<x\leq2$ here.") == r"List $-2\lt x\leq2$ here."


def test_less_than_inside_display_maths_becomes_lt():
    assert mathlt.transform("$$\na<b\n$$\n") == "$$\na\\lt b\n$$\n"


def test_prose_and_currency_are_left_alone():
    text = "If x < 3 then $5 is less than $6, and a <b>tag</b> stays."
    assert mathlt.transform(text) == text


def test_an_escaped_dollar_does_not_open_maths():
    text = r"It costs \$5 <x and \$6."
    assert mathlt.transform(text) == text


def test_a_fence_is_not_touched():
    source = "```\n$a<b$\n```\n"
    assert mathlt.on_page_markdown(source, None, None, None) == source


def test_an_inline_code_span_is_left_alone():
    text = "Code `$a<b$` and ``$c<d$`` stay, but $e<f$ does not."
    assert (
        mathlt.transform(text)
        == "Code `$a<b$` and ``$c<d$`` stay, but $e\\lt f$ does not."
    )


def test_a_longer_run_does_not_close_a_shorter_span():
    text = "Code `a `` $x<y$` stays."
    assert mathlt.transform(text) == text


def test_a_code_span_cannot_cross_a_blank_line():
    text = "Press the ` key.\n\nSolve $-2<x$.\n\nUse `code` here.\n"
    assert (
        mathlt.transform(text)
        == "Press the ` key.\n\nSolve $-2\\lt x$.\n\nUse `code` here.\n"
    )


def test_less_than_inside_text_becomes_textless():
    assert mathlt.transform(r"$\text{a<b}$") == r"$\text{a\textless{}b}$"


def test_a_nested_brace_inside_text_is_handled():
    assert (
        mathlt.transform(r"$\text{a {b<c} d}$")
        == r"$\text{a {b\textless{}c} d}$"
    )


def test_the_textless_rewrite_renders_in_katex():
    expressions = [
        mathlt.transform(r"$\text{a<b}$").strip("$"),
        mathlt.transform(r"$\text{a {b<c} d}$").strip("$"),
    ]
    for expression in expressions:
        result = subprocess.run(
            [
                "node",
                "-e",
                "const katex = require('katex');"
                f"katex.renderToString({json.dumps(expression)}, "
                "{throwOnError: true});",
            ],
            capture_output=True,
            text=True,
        )
        assert result.returncode == 0, result.stderr


def test_a_wrapper_after_a_less_than_keeps_its_markdown_parsed():
    source = "Solve $-2<x\\leq2$.\n\n**Example 1.** Work out $2+2$.\n\nSo it is $4$.\n"
    for hook in (callouts, examples, mathlt):
        source = hook.on_page_markdown(source, None, None, None)
    html = markdown_lib.markdown(source, extensions=pipeline.EXTENSIONS, output_format="html5")
    assert 'markdown="1"' not in html
    assert '<section class="worked-example">' in html
