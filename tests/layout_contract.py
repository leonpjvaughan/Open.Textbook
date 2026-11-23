"""The layout contract, as plain functions over a path.

`assets/stylesheets/layouts/<id>.css` is pure geometry over one DOM. The rules live here as
data and functions so the real layouts and the fixtures under `tests/fixtures/layouts/`
share one checker. `assets/AGENTS.md`, "Layouts", states the contract in prose.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

import tinycss2
from tinycss2 import color4

from textbook.book import SCHEME_TOKENS, repo_root
from textbook.themes import CONTRAST_RULES

ROOT = repo_root()
STYLESHEETS = ROOT / "assets" / "stylesheets"
LAYOUTS_DIR = STYLESHEETS / "layouts"
FIXTURES_DIR = Path(__file__).parent / "fixtures" / "layouts"
FIXTURE_ID = "fx"

EXACT_PROPERTIES = frozenset("""
display grid-template-columns grid-template-rows gap row-gap column-gap grid-column grid-row
flex flex-wrap flex-grow flex-shrink flex-basis flex-direction
width min-width max-width height min-height max-height box-sizing columns
border border-radius font-size font-weight font-style font-family font-variant-numeric
letter-spacing line-height text-transform text-align text-wrap text-decoration-line
text-decoration-thickness text-underline-offset white-space overflow-wrap word-break hyphens
list-style list-style-type list-style-position color background background-color
container-type container-name overflow-x
""".split())
PROPERTY_PREFIXES = (
    "grid-auto-", "align-", "justify-", "place-", "margin", "padding", "column-", "border-",
)

TEXT_COLOUR_SURFACE = "paper"
TEXT_COLOUR_TOKENS = frozenset(
    SCHEME_TOKENS[role]
    for surface, thresholds, _alias, _wording, tail in CONTRAST_RULES
    if surface == TEXT_COLOUR_SURFACE and not tail
    for role in thresholds
)
BORDER_COLOUR_TOKENS = frozenset({"--tb-rule", "--tb-accent", "--card-accent-active"})
FONT_FAMILY_TOKENS = frozenset({"--tb-font-body", "--tb-font-display", "--tb-font-mono"})
RADIUS_VALUES = frozenset({"0", "var(--tb-radius)"})
SET_BY_BASE_CSS = frozenset({"--card-accent", "--card-accent-dark", "--card-accent-active"})
WIDTH_PROPERTIES = frozenset({
    "width", "min-width", "max-width", "flex", "flex-basis", "grid-template-columns",
    "grid-auto-columns", "columns", "column-width",
})
ZERO_BOX_PROPERTIES = frozenset({"height", "max-height"})
BANNED_AT_RULES = frozenset({"import", "font-face", "keyframes", "property", "page"})
CONDITIONAL_AT_RULES = frozenset({"media", "container", "supports"})
BANNED_SELECTOR = re.compile(
    r"\.tb-settings|\.tb-search|data-md-color-scheme|data-theme|data-scheme|color-scheme"
)
COLOUR_FUNCTIONS = frozenset(
    "rgb rgba hsl hsla hwb lab lch oklab oklch color color-mix light-dark".split()
)
SPAN = re.compile(r"^span \d+$")
SPAN_ALL = "1 / -1"
NEGATION = re.compile(r":not\((?:[^()]|\([^()]*\))*\)")


@dataclass(frozen=True)
class Violation:
    rule: int
    code: str
    path: Path
    line: int
    message: str

    def __str__(self) -> str:
        return f"{self.path.name}:{self.line}: rule {self.rule} [{self.code}] {self.message}"


def strip_comments(text: str) -> str:
    return re.sub(r"/\*.*?\*/", " ", text, flags=re.S)


def parse(path: Path) -> list:
    return tinycss2.parse_stylesheet(path.read_text(), skip_comments=True, skip_whitespace=True)


def rule_list(node) -> list:
    return tinycss2.parse_rule_list(node.content, skip_comments=True, skip_whitespace=True)


def block_items(node) -> list:
    return tinycss2.parse_blocks_contents(node.content, skip_comments=True, skip_whitespace=True)


def style_rules(path: Path):
    """(selector, declarations) for every style rule, however deeply layered."""

    def walk(nodes):
        for node in nodes:
            if node.type == "qualified-rule":
                yield (
                    tinycss2.serialize(node.prelude),
                    [i for i in block_items(node) if i.type == "declaration"],
                )
            elif node.type == "at-rule" and node.content is not None:
                yield from walk(rule_list(node))

    return walk(parse(path))


def declared_tokens() -> frozenset[str]:
    """Every `--tb-*` the build generates, plus `:root` custom properties in extra.css."""
    names: set[str] = set(SET_BY_BASE_CSS)
    themes = (STYLESHEETS / "themes.css").read_text()
    names.update(re.findall(r"(--tb-[a-z0-9-]+)\s*:", strip_comments(themes)))
    for selector, declarations in style_rules(STYLESHEETS / "extra.css"):
        if selector.strip() == ":root":
            names.update(d.name for d in declarations if d.name.startswith("--"))
    return frozenset(names)


def flatten(values):
    for value in values:
        yield value
        if value.type == "function":
            yield from flatten(value.arguments)
        elif value.type in ("() block", "[] block", "{} block"):
            yield from flatten(value.content)


def significant(values) -> list:
    return [v for v in values if v.type != "whitespace"]


def var_names(values) -> list[str]:
    names = []
    for value in flatten(values):
        if value.type == "function" and value.lower_name == "var":
            first = significant(value.arguments)
            if first and first[0].type == "ident":
                names.append(first[0].value)
    return names


def literal_colours(values) -> list[str]:
    found = []
    for value in flatten(values):
        if value.type == "hash":
            found.append(f"#{value.value}")
        elif value.type == "function" and value.lower_name in COLOUR_FUNCTIONS:
            found.append(f"{value.name}(...)")
        elif value.type == "ident" and color4.parse_color(value.value) is not None:
            found.append(value.value)
    return found


def px_dimensions(values) -> list[str]:
    return [
        f"{v.representation}{v.unit}"
        for v in flatten(values)
        if v.type == "dimension" and v.lower_unit == "px"
    ]


def is_zero(values) -> bool:
    parts = significant(values)
    return (
        len(parts) == 1
        and parts[0].type in ("number", "dimension", "percentage")
        and parts[0].value == 0
    )


def text_of(values) -> str:
    return " ".join(tinycss2.serialize([v]) for v in significant(values))


def split_selector(selector: str) -> list[str]:
    parts, depth, current = [], 0, ""
    for char in selector:
        if char in "([":
            depth += 1
        elif char in ")]":
            depth -= 1
        if char == "," and depth == 0:
            parts.append(current.strip())
            current = ""
        else:
            current += char
    parts.append(current.strip())
    return parts


def subject_compound(selector: str) -> str:
    """The last compound selector, with `:not(...)` removed so a negation never counts."""
    compound, depth, broken = "", 0, False
    for char in selector.strip():
        if depth == 0 and char in " >+~":
            broken = True
            continue
        if broken:
            compound, broken = "", False
        if char in "([":
            depth += 1
        elif char in ")]":
            depth -= 1
        compound += char
    return NEGATION.sub("", compound)


def own_prefix(layout_id: str) -> str:
    return f"--{layout_id}-"


def scope_pattern(layout_id: str) -> re.Pattern:
    return re.compile(rf"^:root\[data-style=[\"']?{re.escape(layout_id)}[\"']?\](?![\w-])")


def check_declaration(decl, selector, path, layout_id, known) -> list[Violation]:
    out: list[Violation] = []
    name = decl.lower_name
    value = significant(decl.value)
    text = text_of(decl.value)
    own = own_prefix(layout_id)

    def bad(rule, code, message):
        out.append(
            Violation(rule, code, path, decl.source_line, f"`{name}: {text}` {message}")
        )

    if decl.important:
        bad(3, "important", "uses !important; layers already order the cascade")

    if name.startswith("--"):
        if not name.startswith(own):
            bad(2, "property", f"declares a custom property outside `{own}*`")
    elif name not in EXACT_PROPERTIES and not name.startswith(PROPERTY_PREFIXES):
        bad(2, "property", "is not on the layout property allowlist")

    for colour in literal_colours(decl.value):
        if not (name in ("background", "background-color") and colour == "transparent"):
            bad(3, "literal-colour", f"contains the literal colour {colour}")

    names = var_names(decl.value)
    for var in names:
        if var not in known and not var.startswith(own):
            bad(3, "unknown-var", f"names unknown token {var}")

    if name == "color":
        single_var = len(value) == 1 and value[0].type == "function" and value[0].lower_name == "var"
        if not (single_var and len(significant(value[0].arguments)) == 1 and names[0] in TEXT_COLOUR_TOKENS):
            bad(3, "color-token", f"must be var() of one of {sorted(TEXT_COLOUR_TOKENS)}")
    elif name in ("background", "background-color"):
        if text != "transparent":
            bad(3, "background", "may only be `transparent`")
    elif name == "border-radius":
        if any(text_of([v]) not in RADIUS_VALUES for v in value):
            bad(3, "border-radius", "may only be 0 or var(--tb-radius)")
    elif name == "font-family":
        if not (len(value) == 1 and len(names) == 1 and names[0] in FONT_FAMILY_TOKENS):
            bad(3, "font-family", f"must be var() of one of {sorted(FONT_FAMILY_TOKENS)}")
    elif name == "flex-direction":
        if text not in ("row", "column"):
            bad(3, "flex-direction", "may only be row or column")
    elif name == "overflow-x":
        if text != "auto":
            bad(3, "overflow-x", "may only be auto")
    elif name in ("grid-column", "grid-row"):
        if not (SPAN.match(text) or text == SPAN_ALL):
            bad(3, "grid-line", "may only be `span N` or `1 / -1`")
    elif name == "display" and text.lower() == "none":
        if not any("[data-optional" in subject_compound(s) for s in split_selector(selector)):
            bad(3, "display-none", "needs [data-optional] in the rule's subject selector")
    elif name.startswith("border"):
        for var in names:
            if var not in BORDER_COLOUR_TOKENS and not var.startswith(own):
                bad(3, "border-colour", f"{var} is not one of {sorted(BORDER_COLOUR_TOKENS)}")

    if name in ZERO_BOX_PROPERTIES and is_zero(decl.value):
        bad(3, "zero-height", "must not be zero")

    if name in WIDTH_PROPERTIES:
        for px in px_dimensions(decl.value):
            bad(4, "px-width", f"uses {px}; use ch, %, fr, rem, min(), max() or minmax()")
    return out


def check_at_rule(node, path, layout_id, known) -> list[Violation]:
    out: list[Violation] = []
    name = node.lower_at_keyword
    prelude = tinycss2.serialize(node.prelude).strip()
    line = node.source_line
    if name in BANNED_AT_RULES:
        out.append(Violation(5, "at-rule", path, line, f"@{name} is banned in a layout"))
    elif name not in CONDITIONAL_AT_RULES:
        out.append(Violation(1, "at-rule", path, line, f"@{name} is not allowed in a layout"))
    if "prefers-color-scheme" in prelude:
        out.append(Violation(5, "colour-scheme", path, line, "a layout may not query prefers-color-scheme"))
    if name in ("media", "container"):
        for px in px_dimensions(node.prelude):
            out.append(Violation(4, "px-condition", path, line, f"@{name} condition uses {px}; use em, rem or ch"))
    if node.content is not None and name in CONDITIONAL_AT_RULES:
        out.extend(check_rules(rule_list(node), path, layout_id, known))
    return out


def check_qualified_rule(node, path, layout_id, known) -> list[Violation]:
    out: list[Violation] = []
    selector = tinycss2.serialize(node.prelude).strip()
    pattern = scope_pattern(layout_id)
    for part in split_selector(selector):
        if not pattern.match(part):
            out.append(Violation(1, "selector", path, node.source_line, f"selector `{part}` must start with :root[data-style=\"{layout_id}\"]"))
        if BANNED_SELECTOR.search(part):
            out.append(Violation(5, "selector", path, node.source_line, f"selector `{part}` names shell chrome or a colour scheme"))
    for item in block_items(node):
        if item.type == "declaration":
            out.extend(check_declaration(item, selector, path, layout_id, known))
        elif item.type == "error":
            out.append(Violation(1, "parse", path, item.source_line, item.message))
        else:
            out.append(Violation(1, "nesting", path, item.source_line, "nested rules are not allowed; write the full selector"))
    return out


def check_rules(nodes, path, layout_id, known) -> list[Violation]:
    out: list[Violation] = []
    for node in nodes:
        if node.type == "error":
            out.append(Violation(1, "parse", path, node.source_line, node.message))
        elif node.type == "at-rule":
            out.extend(check_at_rule(node, path, layout_id, known))
        elif node.type == "qualified-rule":
            out.extend(check_qualified_rule(node, path, layout_id, known))
    return out


def check_layout(path: Path, layout_id: str | None = None, known: frozenset[str] | None = None) -> list[Violation]:
    layout_id = layout_id or path.stem
    known = declared_tokens() if known is None else known
    text = path.read_text()
    out: list[Violation] = []
    for number, line in enumerate(strip_comments(text).splitlines(), 1):
        if "prefers-color-scheme" in line:
            out.append(Violation(5, "colour-scheme", path, number, "a layout may not mention prefers-color-scheme"))
    nodes = parse(path)
    layers = [
        n for n in nodes
        if n.type == "at-rule" and n.lower_at_keyword == "layer" and n.content is not None
        and tinycss2.serialize(n.prelude).strip() == "layout"
    ]
    for node in nodes:
        if node in layers:
            continue
        banned = node.type == "at-rule" and node.lower_at_keyword in BANNED_AT_RULES
        out.append(Violation(
            5 if banned else 1, "top-level", path, node.source_line,
            "the file must be one `@layer layout { ... }` block and nothing else",
        ))
    if len(layers) != 1:
        out.append(Violation(1, "layer", path, 1, "the whole file must be one `@layer layout { ... }` block"))
        return out
    return out + check_rules(rule_list(layers[0]), path, layout_id, known)


def fixture_files() -> list[Path]:
    return sorted(FIXTURES_DIR.glob("*.css"))


def layout_files() -> list[Path]:
    return sorted(LAYOUTS_DIR.glob("*.css")) if LAYOUTS_DIR.is_dir() else []
