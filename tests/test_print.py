"""The print rules must target the shell that actually ships.

When MkDocs was deleted, every `@media print` rule kept hiding Material's class
names — `.md-header`, `.md-sidebar`, `.md-search` — which the bespoke shell does
not emit. Nothing failed: the stylesheet still parsed, the tests still passed,
and item 12's claim that "printing a Walkthrough gives a readable page without
the sidebar" quietly became false. Printing a page included the masthead, the
sidebar and the search box.

That is the failure this guards. A hide-list is a claim about markup, so it is
checked against the markup.
"""

from __future__ import annotations

import re

from textbook.book import repo_root

ROOT = repo_root()
EXTRA_CSS = ROOT / "assets" / "stylesheets" / "extra.css"
PAGE = ROOT / "engine" / "textbook" / "templates" / "page.html"
PORTAL = ROOT / "engine" / "textbook" / "templates" / "portal.html"

CLASS = re.compile(r"\.([a-zA-Z][\w-]*)")


def print_block() -> str:
    """The `@media print` block from `extra.css`, or nothing."""
    css = EXTRA_CSS.read_text(encoding="utf-8")
    start = css.index("@media print")
    depth, index = 0, start
    while index < len(css):
        if css[index] == "{":
            depth += 1
        elif css[index] == "}":
            depth -= 1
            if depth == 0:
                return css[start : index + 1]
        index += 1
    raise AssertionError("the @media print block is never closed")


def hidden_classes() -> set[str]:
    """The classes the print block switches off."""
    block = print_block()
    # Strip comments first. The block's own comments name classes — including the
    # Material ones this file was written about — and a parser that reads them
    # reports selectors that are not there.
    inner = re.sub(r"/\*.*?\*/", "", block, flags=re.S)
    # Then strip the `@media print {` wrapper: otherwise the first `{` a rule
    # split finds is the media query's own, and every selector is lost.
    inner = inner[inner.index("{") + 1 : inner.rindex("}")]
    hidden: set[str] = set()
    for rule in inner.split("}"):
        if "display: none" in rule and "{" in rule:
            selectors = rule.split("{", 1)[0]
            hidden.update(CLASS.findall(selectors))
    return hidden


def test_the_print_block_hides_something():
    # A guard on the guard: an empty hide-list would pass everything below.
    assert hidden_classes(), (
        "the @media print block hides nothing; printing a page now includes the "
        "masthead and the sidebar"
    )


def test_each_hidden_class_exists_in_the_shell():
    """Every hidden class must be emitted by a template, not only named here.

    `.bk-fab`/`.bk-panel` are injected by the booklet widget and styled in
    `extra.css` outside the print block, so the check is "named somewhere other
    than the rule that hides it".
    """
    shell = PAGE.read_text(encoding="utf-8") + PORTAL.read_text(encoding="utf-8")
    css = EXTRA_CSS.read_text(encoding="utf-8")
    outside = css.replace(print_block(), "")

    orphans = sorted(
        name
        for name in hidden_classes()
        if f'"{name}' not in shell
        and f" {name}" not in shell
        and f'class="{name}' not in shell
        and f".{name}" not in outside
    )
    assert not orphans, (
        "the print block hides classes the shell does not emit, so printing "
        "leaves them on the page: "
        + ", ".join(f".{name}" for name in orphans)
    )


def test_the_print_block_does_not_name_the_deleted_renderer():
    """Material's classes are the specific mistake this file exists for."""
    material_only = {".md-header", ".md-sidebar", ".md-search", ".md-footer"}
    present = {f".{name}" for name in hidden_classes()}
    stale = sorted(present & material_only)
    assert not stale, (
        "the print block still hides Material's classes, which the bespoke shell "
        f"never emits: {', '.join(stale)}. Printing is no longer covered."
    )
