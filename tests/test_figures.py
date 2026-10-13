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

from textbook.book import discover_books, repo_root

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


# A text element: its purpose is words. `role="img"` on one replaces those
# words with the accessible name, so a figure that puts it here is hiding its own
# text from a screen reader. Found in four modules — a live readout wearing
# `role="img"` could never announce a value, and a list of five terms was never
# read out at all. The first fix moved the attribute to a prompt paragraph, which
# passes a "has role=img" test and is the same mistake one element along.
TEXT_ELEMENT = re.compile(
    r"""<(p|label|span|li|h[1-6]|em|strong|output)\b[^>]*\brole\s*=\s*["']img["']""",
    re.I,
)
# What counts as "this figure draws something". It has two forms now: a module
# that writes its own `<svg>`, and a module that asks the shared kit for one —
# `panel(el, { label: … })`. Both produce a drawing that needs an accessible name,
# and a check that only knew the first would silently stop covering every module
# converted to the second (which is what happened on the first conversion: two
# tests skipped, and nothing said so).
# The name a converted module passes to the kit instead of writing an `aria-label`.
KIT_LABEL = re.compile("panel\\([^)]*?\\blabel\\s*:\\s*[\"'`]([^\"'`]+)[\"'`]", re.S)

DRAWS = re.compile(r"<svg|<canvas|createElementNS", re.I)
KIT_PANEL = re.compile(r"\bpanel\(", re.I)
KIT_NO_DRAWING = re.compile(r"\bpanel\([^)]*\bdrawing\s*:\s*false", re.I | re.S)


def draws(text: str) -> bool:
    """Does this module put a drawing on the page?

    Two ways now: it writes its own `<svg>`, or it asks the shared kit for a
    surface. A check that only knew the first would **skip** every converted module
    — and skipping is worse than failing, because a module converted without a
    label would lose its accessible-name test instead of breaking it. The first
    version of this did exactly that, and the guard-the-guard test is what found
    it.
    """
    if KIT_NO_DRAWING.search(text):
        return False
    return bool(DRAWS.search(text)) or bool(KIT_PANEL.search(text))


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_a_figure_that_draws_gives_its_drawing_a_name(book, path):
    """A drawing is silent to a screen reader without `role="img"` and a name."""
    text = path.read_text(encoding="utf-8")
    if not draws(text):
        pytest.skip("this figure draws nothing; see the test below")
    # Either the module writes the attribute, or `panel()` does it for it. The
    # kit sets `role="img"` on the surface it creates *and* requires a `label:`,
    # so a converted module is covered by the same contract by construction.
    assert (
        ROLE_ATTRIBUTE.search(text) or ROLE_SET_CALL.search(text) or "panel(" in text
    ), (
        f"{book.id}/{path.name}: give the drawing role=\"img\" so a screen "
        "reader treats it as one image"
    )


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_no_figure_hides_its_own_text_behind_role_img(book, path):
    """Text is not an image, and marking it as one is how it disappears.

    The rule is derived rather than a list of exemptions: whatever a module draws
    with, `role="img"` belongs on the thing that is a picture — an `<svg>`, a
    `<canvas>`, or a container the script fills with marks — and never on an
    element whose job is to carry words.
    """
    offenders = [
        line.strip()
        for line in path.read_text(encoding="utf-8").splitlines()
        if TEXT_ELEMENT.search(line)
    ]
    assert not offenders, (
        f"{book.id}/{path.name}: `role=\"img\"` on a text element. It replaces "
        "that element's words with the accessible name, so the text is never read "
        f"and a live region can never announce anything: {offenders}"
    )


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_every_figure_has_a_meaningful_accessible_name(book, path):
    text = path.read_text("utf-8")
    if not draws(text):
        # Nothing is drawn, so there is no image to name. What carries the meaning
        # is the figure's own text — a prompt, a list of terms, a live readout —
        # and that is read directly rather than summarised into a label.
        pytest.skip("this figure draws nothing, so it has no accessible name to set")
    names = [name.strip() for name in accessible_names(text)]
    # A module using the kit passes its name to `panel()` instead of writing an
    # `aria-label`, so the name is read from the call.
    names += [name.strip() for name in KIT_LABEL.findall(text)]
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



def code_only(text: str) -> str:
    """A module's code with its comments removed.

    Both scanners below look for something a figure must not *do*, and a comment
    that names the thing is not doing it. A figure explaining that its readout is
    "plain text, never $...$" was reported as injecting LaTeX; a comment naming a
    colour would have been reported the same way. Only full-line `//` comments and
    block comments are removed, so a URL inside a string survives.
    """
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    return re.sub(r"(?m)^\s*//.*$", "", text)


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
    literals = colour_literals(code_only(path.read_text(encoding="utf-8")))
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
        for line in code_only(path.read_text(encoding="utf-8")).splitlines()
        if RUNTIME_LATEX.search(line)
    ]
    assert not offenders, (
        f"{book.id}/{path.name}: a figure injects LaTeX, which is not rendered "
        f"at runtime: {offenders!r}. Write the readout in HTML or plain text."
    )


# --------------------------------------------------------------------------- #
# The colour contract: what a figure may paint with, and how
# --------------------------------------------------------------------------- #
#
# A figure carries no colour of its own (the test above). It paints with a class,
# and the class resolves through a `--tb-*` token, so the drawing follows the
# reader's bundle and scheme. Two things can still go wrong, and both did:
#
# * a `text-*` class that sets only `color`. SVG text is painted with `fill`,
#   whose initial value is black, so `<text class="text-accent">` rendered black
#   — 1.4:1 against the dark panel, which is invisible. `.text-ink` did not exist
#   at all, so a module using it got black in every scheme.
# * a class a bundle never defines, which is silently not applied.
#
# `scripts/audit-figures.cjs` measures the built result in a browser, which is how
# this was found. These tests are the cheap guard that stops it coming back, and
# they run without a browser.

STYLESHEET = repo_root() / "assets" / "stylesheets" / "extra.css"

# The classes that mean "paint with this token". `fig-*` is a shape — it sets
# `fill` and `stroke` — and `text-*` is words. A module may also use a class of
# its own to find an element again (`fig-readout`, `fig-controls`); those style
# nothing, so they are not colour classes and are not checked here.
FIGURE_CLASS = re.compile(
    r"""class\s*=\s*["'][^"']*\b((?:fig|text)-(?:accent|warn|good|ink|grid|line))\b"""
)
FIGURE_CLASSLIST = re.compile(
    r"""classList\.(?:add|remove|toggle)\(\s*["']((?:fig|text)-(?:accent|warn|good|ink|grid|line))["']"""
)


def text_classes_in(text: str) -> set[str]:
    """Every `text-*` colour class a module applies, from either spelling."""
    found = set(FIGURE_CLASS.findall(text)) | set(FIGURE_CLASSLIST.findall(text))
    return {name for name in found if name.startswith("text-")}


def css_rules(css: str) -> dict[str, str]:
    """`class` -> declaration block, for the simple single-class rules here."""
    body = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    return {
        match.group(1): match.group(2)
        for match in re.finditer(r"\.([a-z][\w-]*)\s*\{([^}]*)\}", body)
    }


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_every_text_class_a_figure_uses_is_defined(book, path):
    """A class no stylesheet defines is a class that does nothing."""
    style = css_rules(STYLESHEET.read_text(encoding="utf-8"))
    used = text_classes_in(code_only(path.read_text(encoding="utf-8")))
    missing = sorted(name for name in used if name not in style)
    assert not missing, (
        f"{book.id}/{path.name}: {missing!r} is not defined in extra.css, so the "
        "label silently falls back to the SVG default fill, which is black."
    )


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_every_text_class_a_figure_uses_paints_svg_text(book, path):
    """`color` alone does not paint an SVG `<text>`; `fill` does.

    This is the bug the browser audit found: `.text-accent` set `color` only, so
    every SVG label using it rendered black — invisible at 1.4:1 on the dark
    scheme. `fill: currentColor` makes the class mean the same thing in HTML and
    in SVG, and `.fig-ink` had it all along.
    """
    style = css_rules(STYLESHEET.read_text(encoding="utf-8"))
    used = text_classes_in(code_only(path.read_text(encoding="utf-8")))
    for name in sorted(used):
        block = style.get(name, "")
        fill = re.search(r"(?<![\w-])fill\s*:\s*([^;]+)", block)
        assert fill and fill.group(1).strip() == "currentColor", (
            f".{name} does not set `fill: currentColor`, so an SVG <text> using it "
            f"is painted with its initial fill — black — and vanishes on the dark "
            f"scheme. Found: {block.strip()!r}"
        )


def test_the_figure_colour_classes_are_all_defined():
    """The contract in one place, so a new class is a deliberate act.

    `text-*` paints words, `fig-*` paints shapes, and each has to set the property
    SVG actually uses. A class added to a page without a rule here would be a
    figure that quietly draws in the wrong colour on some bundles only.
    """
    style = css_rules(STYLESHEET.read_text(encoding="utf-8"))
    expected = {
        "fig-accent": ("fill", "stroke"),
        "fig-warn": ("fill", "stroke"),
        "fig-good": ("fill", "stroke"),
        "fig-ink": ("fill", "stroke"),
        "fig-grid": ("fill", "stroke"),
        "fig-line": ("fill", "stroke"),
        "text-accent": ("color", "fill"),
        "text-warn": ("color", "fill"),
        "text-good": ("color", "fill"),
        "text-ink": ("color", "fill"),
    }
    for name, properties in expected.items():
        assert name in style, f"{name} is not defined in extra.css"
        for prop in properties:
            assert re.search(rf"(?<![\w-]){prop}\s*:", style[name]), (
                f".{name} does not set `{prop}`, so it does not paint what it names"
            )
