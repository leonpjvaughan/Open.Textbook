"""The marker transport is tested, not ad-hoc: fences are respected, expansion is
deterministic, and every marker in the book resolves."""

from __future__ import annotations

import importlib.util
import re
from pathlib import Path
from types import SimpleNamespace

import pytest

HOOKS = Path("renderers/mkdocs/hooks")
FIGURES = Path("Docs/assets/figures")
BANKS = Path("problems")


def load_hook(name: str):
    spec = importlib.util.spec_from_file_location(f"hook_{name}", HOOKS / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class FakePage:
    file = SimpleNamespace(src_path="test.md")
    url = "test/"


def test_fence_helper_leaves_code_verbatim():
    fences = load_hook("_fences")
    text = ":::answers a\n\n```markdown\n:::answers x\n```\n"
    transformed = fences.transform_outside_fences(
        text, lambda segment: segment.replace(":::answers", "EXPANDED")
    )
    assert transformed.count("EXPANDED") == 1  # the prose marker only
    assert ":::answers x" in transformed  # the fenced marker is untouched


def test_problems_marker_expands_outside_a_fence():
    hook = load_hook("problems")
    out = hook.on_page_markdown(":::answers chapter-01-practice-1.1\n", FakePage(), None, None)
    assert "<details" in out
    assert "**Answer:**" in out


def test_problems_list_is_rendered_from_the_bank():
    hook = load_hook("problems")
    out = hook.on_page_markdown(":::problems chapter-01-practice-1.1\n", FakePage(), None, None)
    assert "1. Write the value of the digit" in out
    assert "**H**" in out  # the Higher-only items are marked


def test_problems_and_answers_marker_are_ignored_inside_a_fence():
    hook = load_hook("problems")
    source = "```markdown\n:::problems chapter-01-practice-1.1\n:::answers chapter-01-practice-1.1\n```\n"
    assert hook.on_page_markdown(source, FakePage(), None, None) == source


def test_unknown_bank_fails_loudly():
    hook = load_hook("problems")
    with pytest.raises(ValueError):
        hook.on_page_markdown(":::answers does-not-exist\n", FakePage(), None, None)


def test_unknown_figure_fails_loudly():
    hook = load_hook("figures")
    with pytest.raises(ValueError):
        hook.on_page_markdown(":::figure not-a-figure\n", FakePage(), None, None)


def test_every_marker_in_the_book_resolves():
    fences = load_hook("_fences")
    figure = re.compile(r"^:::[ \t]*figure[ \t]+([a-z0-9-]+)", re.M)
    answers = re.compile(r"^:::[ \t]*answers[ \t]+([a-z0-9._-]+)", re.M)
    problems_marker = re.compile(r"^:::[ \t]*problems[ \t]+([a-z0-9._-]+)", re.M)

    problems: set[str] = set()
    figures: set[str] = set()
    for path in Path("Docs").rglob("*.md"):
        prose: list[str] = []
        fences.transform_outside_fences(path.read_text(encoding="utf-8"), lambda s: prose.append(s) or s)
        text = "\n".join(prose)
        problems.update(answers.findall(text))
        problems.update(problems_marker.findall(text))
        figures.update(figure.findall(text))

    for bank in problems:
        assert (BANKS / f"{bank}.yaml").exists(), f"missing bank for :::answers {bank}"
    for slug in figures:
        assert (FIGURES / f"{slug}.js").exists(), f"missing figure module for {slug}"


def test_no_adjacent_display_math_blocks():
    """pymdownx.arithmatex reads two adjacent $$ blocks as one, so they must be
    separated by a blank line (or prose). This lint keeps the book renderable."""
    import re as _re

    one_line = _re.compile(r"^\s*\$\$.*\$\$\s*$")
    offenders = []
    for path in Path("Docs").rglob("*.md"):
        lines = path.read_text(encoding="utf-8").splitlines()
        in_block = False
        for i, line in enumerate(lines):
            stripped = line.strip()
            nxt = lines[i + 1].strip() if i + 1 < len(lines) else ""
            if stripped == "$$":
                if in_block:
                    in_block = False
                    if nxt.startswith("$$"):
                        offenders.append(f"{path}:{i + 1}")
                else:
                    in_block = True
            elif not in_block and one_line.match(line) and nxt.startswith("$$"):
                offenders.append(f"{path}:{i + 1}")
    assert not offenders, "adjacent $$ blocks (add a blank line): " + ", ".join(offenders)


def test_no_control_characters_in_content():
    """Agents can write a literal control character where a LaTeX escape was
    meant (\\a -> BEL). It corrupts maths silently, so fail loudly."""
    offenders = []
    for path in list(Path("Docs").rglob("*.md")):
        text = path.read_text(encoding="utf-8")
        if any(ord(c) < 32 and c not in "\n\t" for c in text):
            offenders.append(str(path))
    assert not offenders, "control characters in markdown: " + ", ".join(offenders)
