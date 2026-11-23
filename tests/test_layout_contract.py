"""The layout contract, enforced on every layout and on a bad fixture per rule.

A layout is pure geometry over one DOM, so a layout can be added without testing it against
every colour bundle: these tests are the reason that holds. The checker is
`tests/layout_contract.py`; `assets/AGENTS.md`, "Layouts", states the contract.
Rule 6 (body size, line height, measure) is measured in a browser, not here.
"""

from __future__ import annotations

import pytest
import yaml
from layout_contract import (
    FIXTURE_ID,
    LAYOUTS_DIR,
    ROOT,
    check_layout,
    declared_tokens,
    fixture_files,
    layout_files,
)

LAYOUTS = layout_files()
KNOWN = declared_tokens()

EXPECTED_FAILURES = {
    "bad-literal-colour": (3, "literal-colour"),
    "bad-tb-declaration": (2, "property"),
    "bad-unscoped-selector": (1, "selector"),
    "bad-display-none": (3, "display-none"),
    "bad-order": (2, "property"),
    "bad-grid-areas": (2, "property"),
    "bad-row-reverse": (3, "flex-direction"),
    "bad-position": (2, "property"),
    "bad-opacity": (2, "property"),
    "bad-gradient": (2, "property"),
    "bad-px-width": (4, "px-width"),
    "bad-media-px": (4, "px-condition"),
    "bad-prefers-color-scheme": (5, "colour-scheme"),
    "bad-tb-settings": (5, "selector"),
    "bad-important": (3, "important"),
    "bad-unknown-var": (3, "unknown-var"),
    "bad-font-family-literal": (3, "font-family"),
    "bad-color-paper": (3, "color-token"),
    "bad-background-literal": (3, "background"),
    "bad-import": (5, "top-level"),
    "bad-no-layer": (1, "top-level"),
    "bad-nesting": (1, "nesting"),
    "bad-zero-height": (3, "zero-size"),
    "bad-own-var-display": (3, "display-none"),
    "bad-own-var-height": (3, "zero-size"),
    "bad-own-var-border": (3, "border-colour"),
    "bad-own-var-undeclared": (3, "unknown-var"),
    "bad-display-none-has": (3, "display-none"),
    "bad-display-none-is": (3, "display-none"),
    "bad-display-none-where": (3, "display-none"),
    "bad-display-none-prefix": (3, "display-none"),
    "bad-display-none-list": (3, "display-none"),
    "bad-url": (3, "image"),
    "bad-border-image": (2, "property"),
    "bad-column-rule": (3, "border-colour"),
    "bad-list-style-image": (3, "image"),
    "bad-font-size-zero": (3, "zero-size"),
    "bad-max-width-zero": (3, "zero-size"),
    "bad-width-min-zero": (3, "zero-size"),
    "bad-negative-margin": (3, "margin"),
    "bad-margin-calc": (3, "margin"),
    "bad-selector-class-attr": (5, "selector"),
    "bad-selector-substring": (5, "selector"),
    "bad-selector-partial": (5, "selector"),
    "bad-selector-id": (5, "selector"),
    "bad-selector-escape": (5, "selector"),
}


def violations(path, rule):
    return [v for v in check_layout(path, known=KNOWN) if v.rule == rule]


def report(found):
    return "\n".join(f"  {v}" for v in found)


def real_layouts():
    return [pytest.param(p, id=p.stem) for p in LAYOUTS] or [
        pytest.param(None, id="no-layouts", marks=pytest.mark.skip(reason="no layouts yet"))
    ]


def test_layouts_exist():
    assert LAYOUTS, f"{LAYOUTS_DIR.relative_to(ROOT)}/ holds no layout stylesheet"


def test_layout_files_match_collection():
    layouts = yaml.safe_load((ROOT / "collection.yaml").read_text()).get("layouts")
    if layouts is None:
        pytest.skip("collection.yaml has no `layouts` key yet")
    ids = {entry["id"] for entry in layouts}
    files = {p.stem for p in LAYOUTS}
    assert files == ids, (
        f"layouts/*.css {sorted(files)} must equal the ids in collection.yaml {sorted(ids)}"
    )


@pytest.mark.parametrize("path", real_layouts())
def test_rule_1_one_layer_and_scoped_selectors(path):
    found = violations(path, 1)
    assert not found, f"scope the whole file to @layer layout and :root[data-style]:\n{report(found)}"


@pytest.mark.parametrize("path", real_layouts())
def test_rule_2_property_allowlist(path):
    found = violations(path, 2)
    assert not found, f"properties outside the layout allowlist:\n{report(found)}"


@pytest.mark.parametrize("path", real_layouts())
def test_rule_3_values(path):
    found = violations(path, 3)
    assert not found, f"values a layout may not use:\n{report(found)}"


@pytest.mark.parametrize("path", real_layouts())
def test_rule_4_no_px_in_widths_or_conditions(path):
    found = violations(path, 4)
    assert not found, f"px in a width-like property or a query condition:\n{report(found)}"


@pytest.mark.parametrize("path", real_layouts())
def test_rule_5_banned_at_rules_and_selectors(path):
    found = violations(path, 5)
    assert not found, f"banned at-rules, colour-scheme queries or chrome selectors:\n{report(found)}"


def test_every_bad_fixture_has_an_expectation():
    names = {p.stem for p in fixture_files()} - {"good"}
    assert names == set(EXPECTED_FAILURES), (
        "fixtures and EXPECTED_FAILURES disagree: "
        f"{sorted(names ^ set(EXPECTED_FAILURES))}"
    )


def test_good_fixture_passes():
    path = next(p for p in fixture_files() if p.stem == "good")
    found = check_layout(path, FIXTURE_ID, KNOWN)
    assert not found, f"the good fixture must pass:\n{report(found)}"


@pytest.mark.parametrize("name", sorted(EXPECTED_FAILURES))
def test_bad_fixture_fails_with_its_rule(name):
    path = next(p for p in fixture_files() if p.stem == name)
    rule, code = EXPECTED_FAILURES[name]
    found = check_layout(path, FIXTURE_ID, KNOWN)
    assert any(v.rule == rule and v.code == code for v in found), (
        f"{name} must fail rule {rule} [{code}]; got:\n{report(found) or '  nothing'}"
    )


def test_text_tokens_come_from_the_paper_audit():
    from layout_contract import TEXT_COLOUR_TOKENS

    assert TEXT_COLOUR_TOKENS == {"--tb-ink", "--tb-link", "--tb-accent"}, (
        "the paper-audited text roles in themes.CONTRAST_RULES changed; "
        "review which colours a layout may use"
    )
