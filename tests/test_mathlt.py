"""``<`` inside maths is written ``\\lt``, so ``md_in_html`` cannot read it as a tag."""

from __future__ import annotations

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


def test_a_wrapper_after_a_less_than_keeps_its_markdown_parsed():
    source = "Solve $-2<x\\leq2$.\n\n**Example 1.** Work out $2+2$.\n\nSo it is $4$.\n"
    for hook in (callouts, examples, mathlt):
        source = hook.on_page_markdown(source, None, None, None)
    html = markdown_lib.markdown(source, extensions=pipeline.EXTENSIONS, output_format="html5")
    assert 'markdown="1"' not in html
    assert '<section class="worked-example">' in html
