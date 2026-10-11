"""Every guided figure carries an accessible name.

A figure is a drawing. Without ``role="img"`` and an ``aria-label`` it is silent
to a reader using a screen reader, and without them the accessible name of the
custom element falls back to its tag name. Nothing in the build caught that:
twenty-two modules carried a name and six did not.

The suite discovers the modules from the filesystem rather than from a fixed
list, so a new figure is covered the moment it lands. The shared loader
``assets/figures/figures.js`` is a symlink into the shared asset tree; figure
modules are the regular files beside it. The loader is excluded by file type, not
by name, and every other regular ``.js`` in the directory must be a figure — so
the exclusion cannot hide a module from the check.
"""

from __future__ import annotations

import re

import pytest

from textbook.book import discover_books

BOOKS = discover_books()

# A figure is a module the loader can mount, and the loader is not a figure.
MOUNT = re.compile(r"export\s+(?:async\s+)?function\s+mount\s*\(")

ROLE_ATTRIBUTE = re.compile(r"""role\s*=\s*["']img["']""")
ROLE_SET_CALL = re.compile(
    r"""setAttribute\(\s*["']role["']\s*,\s*["']img["']\s*\)"""
)
# The name may be written in the markup, or applied while drawing. Both count:
# see ch19-circle-measures.js, which relabels the axis on every input.
NAME_ATTRIBUTE = re.compile(r"""aria-label\s*=\s*["']([^"']*)["']""")
NAME_SET_CALL = re.compile(
    r"""setAttribute\(\s*["']aria-label["']\s*,\s*(.+?)\)""", re.DOTALL
)

# House style (AGENTS.md): no shaming words, no negative contractions.
BANNED_WORDS = re.compile(
    r"\b(obviously|clearly|simply|just|easy"
    r"|can't|don't|won't|isn't|doesn't|didn't|couldn't|wouldn't)\b",
    re.IGNORECASE,
)

# No colour in a figure module (AGENTS.md): a hard-coded colour cannot adapt to a
# bundle or to dark mode. A figure must use the fig-* classes and the --tb-*
# tokens, so this flags the shapes a literal takes.
FIGURE_HEX = re.compile(r"#[0-9a-fA-F]{3,8}(?![0-9a-fA-F])")
FIGURE_COLOUR_FUNCTION = re.compile(
    r"(?<![\w-])(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch)\([^)]*\)",
    re.IGNORECASE,
)
# A named colour only counts where a colour is expected: `color:red`, `fill="red"`.
# The `=` form requires a quote, because an unquoted `fill=i` is a variable, not a
# colour. A variable or CSS class named `red` (ch23-spinner has both) is not a
# colour, and `currentColor`, `none` and the gradient/mix functions are tokens.
FIGURE_COLOUR_PROPERTY = re.compile(
    r"(?<![\w-])(?:color|fill|stroke|background|background-color|border-color|"
    r"outline-color|stop-color|flood-color|lighting-color)"
    r"(?:\s*:\s*[\"']?|\s*=\s*[\"'])"
    r"([a-zA-Z][\w-]*)",
    re.IGNORECASE,
)
TOKEN_COLOUR_VALUES = {
    "auto",
    "color-mix",
    "conic-gradient",
    "currentcolor",
    "inherit",
    "initial",
    "linear-gradient",
    "none",
    "radial-gradient",
    "repeating-linear-gradient",
    "repeating-radial-gradient",
    "revert",
    "transparent",
    "unset",
    "url",
    "var",
}

# The maths hook runs at build time, so runtime `$...$` never renders. `${` is a
# JavaScript template expression and is not LaTeX.
RUNTIME_LATEX = re.compile(r"\$(?!\{)")


def figure_modules() -> list:
    """Every figure module, discovered from the filesystem for every book."""
    found = []
    for book in BOOKS:
        figures = book.docs / "assets" / "figures"
        for path in sorted(figures.glob("*.js")):
            if not path.is_symlink():  # the shared loader is a symlink
                found.append((book, path))
    return found


FIGURES = figure_modules()
IDS = [f"{book.id}/{path.name}" for book, path in FIGURES]


def accessible_names(text: str) -> list[str]:
    """The labels a module sets, whether written in markup or applied in JS."""
    names = [match.group(1) for match in NAME_ATTRIBUTE.finditer(text)]
    names.extend(match.group(1) for match in NAME_SET_CALL.finditer(text))
    return names


def test_the_discovery_is_sound():
    """A sanity check on the rule that excludes the loader: every regular .js in
    a figure directory is a figure, and the symlinked loader is not counted."""
    assert FIGURES, "no figure modules discovered"
    for book, path in FIGURES:
        assert not path.is_symlink(), f"{book.id}/{path.name} is a symlink"
        assert MOUNT.search(path.read_text(encoding="utf-8")), (
            f"{book.id}/{path.name} sits in the figure directory but does not "
            "export mount()"
        )
    for book in BOOKS:
        loader = book.docs / "assets" / "figures" / "figures.js"
        assert loader.is_symlink(), (
            f"{book.id}: the shared loader is expected to be a symlink, so the "
            "file-type rule excludes it"
        )
        assert loader not in [path for _, path in FIGURES]


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_every_figure_has_role_img(book, path):
    text = path.read_text(encoding="utf-8")
    assert ROLE_ATTRIBUTE.search(text) or ROLE_SET_CALL.search(text), (
        f"{book.id}/{path.name}: give the drawing role=\"img\" so a screen "
        "reader treats it as one image"
    )


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_every_figure_has_a_meaningful_accessible_name(book, path):
    names = [name.strip() for name in accessible_names(path.read_text("utf-8"))]
    names = [name for name in names if name]
    assert names, (
        f"{book.id}/{path.name}: set a plain-English aria-label on the drawing"
    )
    # A label, not a placeholder: describe the figure in a few words.
    assert any(len(name) >= 15 and len(name.split()) >= 3 for name in names), (
        f"{book.id}/{path.name}: aria-label is too short to describe the figure: "
        f"{names!r}"
    )


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_every_figure_accessible_name_is_plain_text(book, path):
    """The maths hook runs at build time, so runtime ``$...$`` never renders.

    A ``$`` that starts a JS template expression (``${value}``) is fine; a ``$``
    that opens or closes LaTeX is not.
    """
    names = accessible_names(path.read_text(encoding="utf-8"))
    offenders = [name for name in names if re.search(r"\$(?!\{)", name)]
    assert not offenders, (
        f"{book.id}/{path.name}: aria-label contains LaTeX, which is not "
        f"rendered at runtime: {offenders!r}"
    )


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_every_figure_accessible_name_follows_the_voice_rules(book, path):
    names = accessible_names(path.read_text(encoding="utf-8"))
    offenders = [name for name in names if BANNED_WORDS.search(name)]
    assert not offenders, (
        f"{book.id}/{path.name}: aria-label uses a word the house style rules "
        f"out: {offenders!r}"
    )


def colour_literals(text: str) -> list[str]:
    """The colour literals in a figure module: a hex, an rgb/hsl function, or a
    named colour where a colour value belongs."""
    found = [match.group(0) for match in FIGURE_HEX.finditer(text)]
    found += [match.group(0) for match in FIGURE_COLOUR_FUNCTION.finditer(text)]
    found += [
        match.group(1)
        for match in FIGURE_COLOUR_PROPERTY.finditer(text)
        if match.group(1).lower() not in TOKEN_COLOUR_VALUES
    ]
    return found


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_no_figure_module_hard_codes_a_colour(book, path):
    literals = colour_literals(path.read_text(encoding="utf-8"))
    assert not literals, (
        f"{book.id}/{path.name}: a figure must adapt to every bundle and both "
        f"schemes, so it cannot carry a colour literal: {literals!r}. Use a "
        "fig-*/text-* class or a --tb-* token."
    )


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_no_figure_module_injects_runtime_latex(book, path):
    """The maths hook runs at build time, so ``$...$`` injected at runtime is
    shown literally (``${`` is a template expression and is allowed)."""
    offenders = [
        line.strip()
        for line in path.read_text(encoding="utf-8").splitlines()
        if RUNTIME_LATEX.search(line)
    ]
    assert not offenders, (
        f"{book.id}/{path.name}: a figure injects LaTeX, which is not rendered "
        f"at runtime: {offenders!r}. Write the readout in HTML or plain text."
    )
