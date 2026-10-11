"""Preconditions the build depends on, checked loudly.

The maths hook renders LaTeX through a Node KaTeX process. When Node or
`node_modules` is missing it degrades quietly — every expression becomes a
`.math-error` span rather than failing the build — which turns "the toolchain is
not installed" into "the maths is broken", and sends you looking in the wrong
place. A CI job hit exactly that. This test says what is actually wrong, first.
"""

from __future__ import annotations

import shutil

import pytest

from textbook.book import repo_root

ROOT = repo_root()


def test_the_maths_renderer_is_available():
    """`npm ci`, or every rendered page quietly loses its mathematics."""
    if not (ROOT / "package.json").is_file():
        pytest.skip("no Node toolchain declared")
    assert (ROOT / "node_modules" / "katex").is_dir(), (
        "node_modules/katex is missing: run `npm ci`. Without it the maths hook "
        "degrades every expression to a .math-error span, so maths tests fail on "
        "maths that is fine."
    )


def test_node_is_on_the_path():
    if not (ROOT / "package.json").is_file():
        pytest.skip("no Node toolchain declared")
    assert shutil.which("node"), "node is not on PATH; the maths hook cannot render"


def test_the_engine_ships_the_renderer_it_invokes():
    """The renderer travels with the engine, so the hook never guesses a path."""
    from textbook.hooks.maths import RENDERER

    assert RENDERER.is_file(), f"missing KaTeX renderer at {RENDERER}"
    assert RENDERER.name == "katex-render.mjs"
