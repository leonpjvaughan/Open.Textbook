"""The small typographic courtesies, each one a rule rather than a taste.

None of these was present: `text-wrap` did nothing, so a heading could leave one word
on its own line; `::selection` was the browser's blue, which sits badly on a dark
paper and is the reader's own highlight of the prose; `scrollbar-color` was the
platform's near-grey on near-white, under the 3:1 a control has to clear; and a
textarea in a figure could be dragged sideways out of its panel.

The floors here are read from the stylesheets, so deleting a rule fails in the fast
suite. The scrollbar pair is measured with the same contrast function the theme
invariant uses, over every bundle and both schemes — the colour is a bundle token, so
the proof has to run per bundle rather than on one example.
"""

from __future__ import annotations

import re

import pytest

from textbook.book import repo_root
from textbook.themes import contrast, effective_tokens, ordered_bundles

EXTRA = repo_root() / "assets" / "stylesheets" / "extra.css"


def css() -> str:
    return re.sub(r"/\*.*?\*/", "", EXTRA.read_text(encoding="utf-8"), flags=re.S)


def declarations(css_text: str) -> list[tuple[str, str, str]]:
    found: list[tuple[str, str, str]] = []
    index = 0
    while index < len(css_text):
        match = re.search(r"([^{}]*)\{", css_text[index:])
        if not match:
            return found
        selector = " ".join(match.group(1).split())
        start = index + match.end()
        depth, end = 1, start
        while end < len(css_text) and depth:
            if css_text[end] == "{":
                depth += 1
            elif css_text[end] == "}":
                depth -= 1
            end += 1
        body = css_text[start:end - 1]
        if selector.startswith(("@media", "@supports")):
            found.extend(declarations(body))
        else:
            for declaration in body.split(";"):
                if ":" not in declaration:
                    continue
                prop, value = declaration.split(":", 1)
                found.append((selector, prop.strip().lower(), value.strip()))
        index = end
    return found


def values_for(prop: str) -> list[tuple[str, str]]:
    return [(selector, value) for selector, name, value in declarations(css()) if name == prop]


# --- wrapping ---------------------------------------------------------------


def test_headings_are_balanced_and_body_text_is_pretty():
    """`balance` on a heading, `pretty` on prose — not the other way round.

    Balancing every paragraph changes the shape of the text a reader is in the middle
    of; `pretty` is the cheaper, paragraph-level rule, and headings are short enough
    for balance to be free. `balance` on h1-h3 only, so a long h4 list stays ragged in
    the way a list should.
    """
    balanced = " ".join(
        selector for selector, value in values_for("text-wrap") if value == "balance"
    )
    assert balanced, "no heading is balanced"
    for heading in ("h1", "h2", "h3"):
        assert heading in balanced, f"{heading} is not balanced"
    assert not re.search(r"(?:^|[\s>])p(?:$|[\s,])", balanced), (
        "a paragraph is balanced, which reflows prose"
    )
    pretty = " ".join(
        selector for selector, value in values_for("text-wrap") if value == "pretty"
    )
    assert pretty, "no rule asks for text-wrap: pretty"
    for fragment in ("p", "li", "blockquote"):
        assert fragment in pretty, f"{fragment} is not pretty-wrapped"


# --- selection and scrollbars -----------------------------------------------


def test_the_selection_is_the_accent_and_its_own_ink():
    """The one pairing every bundle proves at 4.5:1, so the highlight is always legible."""
    rules = [
        (selector, prop, value)
        for selector, prop, value in declarations(css())
        if selector.startswith("::selection")
    ]
    assert rules, "::selection is not painted, so the browser's blue shows on dark paper"
    props = {prop: value for _selector, prop, value in rules}
    assert props.get("background") == "var(--tb-accent)"
    assert props.get("color") == "var(--tb-accent-ink)"


def test_the_scrollbar_thumb_clears_three_to_one_against_its_track():
    """The thumb is a control, so WCAG 1.4.11's 3:1 applies.

    Measured per bundle and scheme, because both values are bundle tokens: a palette
    that reads on the paper can still make a thumb disappear into the track.
    """
    rules = [
        (selector, value)
        for selector, value in values_for("scrollbar-color")
    ]
    assert rules, "the scrollbar keeps the platform's near-invisible thumb"
    thumb, track = (part.strip() for part in rules[-1][1].split(None, 1))
    assert thumb == "var(--tb-ink-soft)"
    assert track == "var(--tb-paper)"
    for bundle in ordered_bundles():
        for scheme in ("default", "slate"):
            tokens = effective_tokens(bundle, scheme, None)
            ratio = contrast(tokens["ink_soft"], tokens["paper"])
            assert ratio >= 3.0, (
                f"{bundle.id} {scheme}: the scrollbar thumb is {ratio:.2f}:1 on its "
                "track, below the 3:1 a control needs"
            )


# --- form controls ----------------------------------------------------------


def test_a_textarea_resizes_downwards_only():
    """Horizontal drag pushes a figure's own label out of its panel."""
    resize = values_for("resize")
    assert ("textarea", "vertical") in resize or any(
        "textarea" in selector and value == "vertical" for selector, value in resize
    ), "a textarea in a figure can be dragged sideways out of the panel"
