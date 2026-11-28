"""Worked examples are wrapped in ``section.worked-example`` by ``hooks/examples.py``."""

from __future__ import annotations

import markdown as markdown_lib
import pytest

from textbook import pipeline
from textbook.hooks import callouts, examples

FIXTURE = """\
## Learn

Intro paragraph.

**Example 1.** Which is larger, $4$ or $5$?

The digit decides it.

$$5 > 4$$

**Example 2** Work out $2+2$.

So the answer is $4$.

> **Watch out.** Check the digit.

After the callout.

**Example 3.** One more.

## Next heading

```markdown
**Example 9.** inside a fence
text
```

<!-- tier:h -->
**Example 4.** Higher only.

Its working.
<!-- /tier:h -->

Closing text.
"""


def run(source: str) -> str:
    return examples.on_page_markdown(
        callouts.on_page_markdown(source, None, {}, []), None, {}, []
    )


def render(source: str) -> str:
    return markdown_lib.markdown(
        run(source), extensions=pipeline.EXTENSIONS, output_format="html5"
    )


def sections(html: str) -> list[str]:
    return html.split('<section class="worked-example">')[1:]


def test_each_wrapper_closes_at_the_next_boundary():
    parts = sections(render(FIXTURE))
    assert len(parts) == 4
    first, second, third, fourth = (p.split("</section>")[0] for p in parts)
    assert "Example 1." in first and "The digit decides it." in first
    assert "Example 2" not in first
    assert "Example 2" in second and "So the answer is" in second
    assert "callout" not in second and "After the callout" not in second
    assert "Example 3." in third and "Next heading" not in third
    assert "Example 4." in fourth and "Its working." in fourth
    assert "Closing text" not in fourth


@pytest.mark.parametrize("aside", ["classlink", "prove", "deeper"])
def test_a_link_aside_in_the_middle_does_not_end_an_example(aside: str):
    source = (
        "**Example 1.** Find the standard deviation.\n\n"
        "The mean is $6$.\n\n"
        f'<aside class="{aside}"><a href="x">link</a></aside>\n\n'
        "The squared deviations are $16, 4, 0, 4, 16$.\n"
    )
    parts = sections(render(source))
    assert len(parts) == 1
    assert "squared deviations" in parts[0].split("</section>")[0]


def test_a_promoted_callout_still_ends_an_example():
    source = (
        "**Example 1.** Work out $2+2$.\n\n"
        "So the answer is $4$.\n\n"
        "> **Watch out.** Check the digit.\n\n"
        "After the callout.\n"
    )
    parts = sections(render(source))
    assert len(parts) == 1
    assert "After the callout" not in parts[0].split("</section>")[0]


def test_prose_outside_the_wrappers_is_untouched():
    html = render(FIXTURE)
    assert "<p>Intro paragraph.</p>" in html
    assert "<p>After the callout.</p>" in html
    assert '<aside class="callout callout--error">' in html
    assert html.count("<p><strong>Example") == 4


def test_fences_are_never_wrapped():
    out = run(FIXTURE)
    assert "```markdown\n**Example 9.** inside a fence\ntext\n```" in out


def test_a_wrapper_does_not_straddle_a_tier_region():
    out = run(FIXTURE)
    start = out.index("<!-- tier:h -->")
    end = out.index("<!-- /tier:h -->")
    inside = out[start:end]
    assert inside.count("<section") == 1 and inside.count("</section>") == 1
    assert out[:start].count("<section") == out[:start].count("</section>")


def test_only_the_wrapper_is_added():
    out = run(FIXTURE)
    stripped = out.replace('<section class="worked-example" markdown="1">\n\n', "")
    stripped = stripped.replace("\n\n</section>", "")
    plain = callouts.on_page_markdown(FIXTURE, None, {}, [])
    assert stripped.split() == plain.split()


def test_a_page_without_examples_is_returned_as_is():
    text = "Just prose.\n"
    assert examples.on_page_markdown(text, None, {}, []) == text


def test_an_example_with_a_bracketed_or_dashed_title_is_wrapped():
    source = (
        "**Example 1 (the chapter problem).** Find the crate's speed.\n\n"
        "Resolve along the slope.\n\n"
        "**Example 2 — a two-tailed test.** State the hypotheses.\n\n"
        "Compare with the critical value.\n"
    )
    parts = sections(render(source))
    assert len(parts) == 2
    assert "chapter problem" in parts[0].split("</section>")[0]
    assert "two-tailed" in parts[1].split("</section>")[0]
