"""The cascade: one declared layer order, and every shipped rule inside its own layer.

Layers invert `!important` priority and outrank specificity, so an unlayered rule would beat
every layered one. `themes.css` declares the order once, first.
"""

from __future__ import annotations

import pytest
import tinycss2
from layout_contract import ROOT, STYLESHEETS, layout_files, parse, rule_list

ORDER = "palette, base, shell, layout, book, chrome"
SHELL = ROOT / "engine" / "src" / "textbook" / "css" / "shell.css"

SHIPPED = {
    STYLESHEETS / "themes.css": "palette",
    STYLESHEETS / "extra.css": "base",
    STYLESHEETS / "portal.css": "base",
    SHELL: "shell",
    STYLESHEETS / "search.css": "chrome",
    STYLESHEETS / "settings.css": "chrome",
}
for book_css in sorted((ROOT / "books").glob("*/docs/assets/stylesheets/book*.css")):
    SHIPPED[book_css] = "book"
for layout_css in layout_files():
    SHIPPED[layout_css] = "layout"


def label(path):
    return str(path.relative_to(ROOT))


def test_themes_declares_the_layer_order_first():
    nodes = parse(STYLESHEETS / "themes.css")
    first = nodes[0]
    assert first.type == "at-rule" and first.lower_at_keyword == "layer" and first.content is None, (
        f"themes.css must start with `@layer {ORDER};`, not {first.type}"
    )
    assert " ".join(tinycss2.serialize(first.prelude).split()) == ORDER, (
        f"themes.css must start with exactly `@layer {ORDER};`"
    )


def test_no_other_sheet_redeclares_the_order():
    for path in SHIPPED:
        if path.name == "themes.css":
            continue
        for node in parse(path):
            assert not (node.type == "at-rule" and node.lower_at_keyword == "layer" and node.content is None), (
                f"{label(path)}:{node.source_line}: the layer order is declared once, in themes.css"
            )


@pytest.mark.parametrize("path", sorted(SHIPPED), ids=label)
def test_every_rule_is_inside_its_layer(path):
    layer = SHIPPED[path]
    assert path.exists(), f"{label(path)} is expected to exist"
    outside = []
    for node in parse(path):
        if node.type == "at-rule" and node.lower_at_keyword == "layer" and node.content is None:
            continue
        inside = (
            node.type == "at-rule"
            and node.lower_at_keyword == "layer"
            and tinycss2.serialize(node.prelude).strip() == layer
        )
        if not inside:
            outside.append(f"  line {node.source_line}: {node.type} outside `@layer {layer}`")
    assert not outside, f"{label(path)} has top-level rules outside @layer {layer}:\n" + "\n".join(outside)


def important_declarations(nodes):
    for node in nodes:
        if node.type == "qualified-rule":
            for item in tinycss2.parse_blocks_contents(node.content, skip_comments=True, skip_whitespace=True):
                if item.type == "declaration" and item.important:
                    yield item
        elif node.type == "at-rule" and node.content is not None:
            yield from important_declarations(rule_list(node))


@pytest.mark.parametrize(
    "path", layout_files() or [pytest.param(None, marks=pytest.mark.skip(reason="no layouts yet"))],
    ids=lambda p: p.stem if p else "none",
)
def test_no_important_inside_layouts(path):
    found = [f"line {d.source_line}: {d.name}" for d in important_declarations(parse(path))]
    assert not found, f"{label(path)}: !important in a layout: {found}"
