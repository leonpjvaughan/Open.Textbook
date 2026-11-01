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

from textbook import scaffold
from textbook.book import discover_books, repo_root

from support import call_expressions

BOOKS = discover_books()

#: The two files in a figures directory that are not figures: the loader and the
#: kit. Read from the scaffold, which is also what the build and the directive read.
SHARED_FIGURE_FILES = tuple(scaffold.SHARED_FIGURE_FILES)

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


class _SharedLibrary:
    """The shared figure library, wearing enough of a ``Book`` to be parametrised over.

    Its modules are held to exactly the same contract as a book's own — that is the
    point of them being modules rather than a special case.
    """

    id = "shared"
    docs = repo_root() / "assets"


def figure_modules() -> list:
    """Every figure module: each book's own, and the shared library's."""
    found = []
    for book in BOOKS:
        figures = book.docs / "assets" / "figures"
        for path in sorted(figures.glob("*.js")):
            if path.name not in SHARED_FIGURE_FILES:
                found.append((book, path))
    library = repo_root() / scaffold.FIGURE_LIBRARY
    shared = _SharedLibrary()
    for path in sorted(library.glob("*.js")):
        if path.name not in SHARED_FIGURE_FILES:
            found.append((shared, path))
    return found


FIGURES = figure_modules()
IDS = [f"{book.id}/{path.name}" for book, path in FIGURES]


def accessible_names(text: str) -> list[str]:
    """The labels a module sets, whether written in markup or applied in JS."""
    names = [match.group(1) for match in NAME_ATTRIBUTE.finditer(text)]
    names.extend(match.group(1) for match in NAME_SET_CALL.finditer(text))
    return names


def test_the_discovery_is_sound():
    """A sanity check on the rule that excludes the two shared files.

    Every `.js` in a figure directory is a figure except `figures.js` and `kit.js` —
    the loader and the scaffolding. Those used to be symlinked in, and the rule was
    "a symlink is not a figure"; they are not in the tree at all now, so the rule is
    their names, and this checks that a book's directory holds nothing else that is
    not a figure.
    """
    assert FIGURES, "no figure modules discovered"
    for book, path in FIGURES:
        assert MOUNT.search(path.read_text(encoding="utf-8")), (
            f"{book.id}/{path.name} sits in the figure directory but does not "
            f"export mount()"
        )
    for book in BOOKS:
        figures = book.docs / "assets" / "figures"
        present = {p.name for p in figures.glob("*.js")}
        assert not (present & set(SHARED_FIGURE_FILES)), (
            f"{book.id}: {sorted(present & set(SHARED_FIGURE_FILES))} are shared "
            "files, and the build puts them in the site from assets/ — a copy or a "
            "link in the book's tree would be a second source of truth"
        )
        assert not [p for p in figures.rglob("*") if p.is_symlink()]


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


def figure_colour_literals(text: str) -> list[str]:
    """The colour literals in a figure module: a hex, an rgb/hsl function, or a
    named colour where a colour value belongs.

    Not the same scanner as ``test_themes.colour_literals``, which reads a
    stylesheet or a Python file. This one reads JavaScript, so a named colour
    counts only where a colour value belongs (``color: red``, ``fill="red"``) and
    a class or variable called ``red`` is not one. The two are kept apart on
    purpose: merging them would loosen one and tighten the other.
    """
    found = [match.group(0) for match in FIGURE_HEX.finditer(text)]
    found += [match.group(0) for match in FIGURE_COLOUR_FUNCTION.finditer(text)]
    found += [
        match.group(1)
        for match in FIGURE_COLOUR_PROPERTY.finditer(text)
        # A boolean is not a colour. `fill: true` is a JavaScript option on a drawing
        # helper, and the property pattern cannot tell JavaScript from CSS — so the
        # values that can never be a colour are excluded rather than left to look like
        # one. Everything else that is not a token is reported.
        if match.group(1).lower() not in TOKEN_COLOUR_VALUES
        and match.group(1).lower() not in {"true", "false", "null", "undefined"}
    ]
    return found


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_no_figure_module_uses_unseeded_randomness(book, path):
    """A figure that samples must be reproducible from a seed.

    Two readers comparing what they saw are comparing different data if the module
    draws from Math.random, and no other check can see that difference. The kit's
    seed() is deterministic across engines; use it for data, and leave Math.random
    to DOM id generation in the kit itself.
    """
    code = code_only(path.read_text(encoding="utf-8"))
    assert "Math.random" not in code, (
        f"{book.id}/{path.name}: use seed() from kit.js rather than Math.random, "
        "so the same figure shows the same data to every reader"
    )


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_no_figure_module_hard_codes_a_colour(book, path):
    literals = figure_colour_literals(code_only(path.read_text(encoding="utf-8")))
    assert not literals, (
        f"{book.id}/{path.name}: a figure must adapt to every bundle and both "
        f"schemes, so it cannot carry a colour literal: {literals!r}. Use a "
        "fig-*/text-* class or a --tb-* token."
    )


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_no_figure_module_writes_fill_as_an_attribute(book, path):
    """A `fig-*` class sets `fill`, and a class rule beats a presentation attribute.

    So `fill="none" class="fig-accent"` is **filled** accent, not stroked — item 74.
    Every kit-drawn curve in the collection was a solid shape because of it, and no
    check could see that a shape which should be a line was an area: the stroke was
    still correct, so the contrast audit had nothing to say.

    `path()` writes its fill inline now. A module that needs a stroke and no fill uses
    `fig-line`, whose class sets `fill: none`, or an inline style of its own — never
    the attribute, which loses to the class.
    """
    offenders = [
        line.strip()
        for line in code_only(path.read_text(encoding="utf-8")).splitlines()
        if 'fill="none"' in line
    ]
    assert not offenders, (
        f"{book.id}/{path.name}: `fill=\"none\"` is ignored on a `fig-*` class, so "
        f"the shape is filled. Use a class whose fill is none (`fig-line`, `fig-grid`) "
        f"or an inline style. Lines: {offenders[:2]}"
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
# `tools audit` measures the built result in a browser, which is how
# this was found. These tests are the cheap guard that stops it coming back, and
# they run without a browser.

STYLESHEET = repo_root() / "assets" / "stylesheets" / "extra.css"

# The classes that mean "paint with this token". `fig-*` is a shape — it sets
# `fill` and `stroke` — and `text-*` is words. A module may also use a class of
# its own to find an element again (`fig-readout`, `fig-controls`); those style
# nothing, so they are not colour classes and are not checked here.
# Any `fig-*` or `text-*` class, not a closed list of the ones that exist. The
# list used to be closed — `(?:accent|warn|good|ink|grid|line)` — so a class nobody
# had defined was also a class this scanner could not see, and the test below
# passed while the label fell back to black. A scan for *what a module uses* has to
# be open at the top, or the check is only as good as the vocabulary it already
# knows.
FIGURE_CLASS = re.compile(
    r"""class\s*=\s*["'][^"']*\b((?:fig|text)-[a-z][\w-]*)"""
)
FIGURE_CLASSLIST = re.compile(
    r"""classList\.(?:add|remove|toggle)\(\s*["']((?:fig|text)-[a-z][\w-]*)["']"""
)
# The spelling a kit-based module uses: `label({ ..., class: "text-warn" })`. It is
# a JavaScript object key rather than an HTML attribute, and the two scans above
# cannot see it — so the whole of the converted half of the collection, which is
# every module that draws a label through the kit, was outside `text_classes_in`.
FIGURE_OPTION = re.compile(r"""\bclass:\s*["']((?:fig|text)-[a-z][\w-]*)["']""")


def text_classes_in(text: str) -> set[str]:
    """Every `text-*` colour class a module applies, in any of the three spellings.

    An HTML `class` attribute, a `classList` call, or the kit's own `class:` option.
    All three appear in the collection, and a scanner that knew two of them reported
    "nothing undefined" for modules it could not read.
    """
    found = (
        set(FIGURE_CLASS.findall(text))
        | set(FIGURE_CLASSLIST.findall(text))
        | set(FIGURE_OPTION.findall(text))
    )
    return {name for name in found if name.startswith("text-")}


def test_the_class_scanner_reads_all_three_spellings():
    """Guard the guard: a scanner that misses a spelling reports success.

    `text-nope` in a kit option was invisible until this existed — a class nobody
    defined could not be reported by a test that only saw HTML attributes, and the
    label fell back to the SVG default fill, which is black.
    """
    source = (
        'label({ x: 1, y: 2, class: "text-nope", text: "hi" });\n'
        'const markup = `<text class="text-also-nope">x</text>`;\n'
        'el.classList.add("text-third-nope");\n'
    )
    assert text_classes_in(source) == {"text-nope", "text-also-nope", "text-third-nope"}


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


# --- a label may not be smaller than the floor ---------------------------------
#
# The mobile audit measures the smallest label a figure draws at 390px and fails below
# 9px, and the kit's own note says 16 units is 9.2px at that scale. `ratio-share` was
# written with `size: 15` for its per-part labels, which is 8.6px — the same defect
# `SIZE.tick` was raised from 15 to 16 to fix, repeated by a new module because the
# floor was a measurement rather than a rule. This is the rule, without a browser.


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_no_label_is_written_below_the_phone_floor(book, path):
    """A literal `size:` under 16 units is 8.6px at the phone scale, and unreadable.

    `SIZE.tick` and `SIZE.label` are 16 for exactly this reason. A module that writes
    its own number instead of naming a `SIZE` constant can go under the floor without
    any check noticing until a browser measures it — which is how `ratio-share`
    shipped one. Naming the constant is the fix, and this is what says so.
    """
    too_small = []
    for call in call_expressions(path.read_text(encoding="utf-8"), "label"):
        for match in re.finditer(r"size:\s*([0-9.]+)", call):
            if float(match.group(1)) < 16:
                too_small.append(match.group(1))
    assert not too_small, (
        f"{book.id}/{path.name}: label size {too_small[0]} is below the 16-unit floor "
        "(8.6px at the 390px phone scale). Use SIZE.tick, SIZE.label or SIZE.value."
    )


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_every_slider_says_whether_it_shows_its_value(book, path):
    """`show:` must be explicit, because the default is a reader-visible decision.

    `slider()` adds a value display unless told not to. That is a sensible default
    for a new figure and the wrong one for a refactor: converting the collection
    silently added a number beside **84 sliders** that had never shown one, which is
    the one thing the refactor promised not to do. The check could only be written
    afterwards, once the mistake had happened — and what it enforces is not a
    particular choice but that the choice is made.

    A module with no sliders has nothing to say and is skipped.
    """
    calls = call_expressions(path.read_text(encoding="utf-8"), "slider")
    silent = [call for call in calls if "show:" not in call]
    assert not silent, (
        f"{book.id}/{path.name}: {len(silent)} slider call(s) do not say whether the "
        "value is shown. `show: true` or `show: false` — the reader sees the "
        f"difference, so it is stated at the call: {silent[0][:70]!r}"
    )


# --- the kit's pure layer -----------------------------------------------------
#
# `tools kit` checks the kit through a real page, because most of
# its contract is DOM behaviour — a role, a live region, a focus stop. But the drawing
# and formatting layers are pure functions returning strings and numbers, and they are
# what a module composes hundreds of times. Checking them only in the browser means
# checking them only where Playwright is configured; this runs under plain `node`, so it
# is in the ordinary gate.


def test_the_figure_kit_keeps_its_pure_contract():
    """Sizes, formatting, geometry, marks, seeded randomness and answer checking.

    Every assertion is a defect that shipped or nearly did: `2.6666666666666665` in
    front of a reader, a `<text>` with no colour class (eighteen times), a mark
    carrying `183.99999999999997`, a y-axis flipped when built by hand, a curve that
    disappears because one sample was `NaN`, and a wrong answer reported as a mistake
    when the reader had merely typed a unit.
    """
    import subprocess

    tools = repo_root() / "tools" / "dist" / "cli.js"
    assert tools.is_file(), "the tools CLI is missing; run `npm run build`"
    result = subprocess.run(
        ["node", str(tools), "kit-pure"],
        capture_output=True,
        text=True,
        check=False,
        cwd=repo_root(),
    )
    assert result.returncode == 0, (
        "the figure kit's pure layer no longer keeps its contract.\n"
        f"{result.stdout[-3000:]}\n{result.stderr[-2000:]}"
    )


# --- the shared figure library -------------------------------------------------
#
# A figure module is mounted by bare slug (`import(`./${slug}.js`)`), so a shared
# module has to sit *beside the loader* in the built tree. `assets/figures/` already
# holds the loader and the kit, so it is the library too, and the rule is the one a
# book's own directory already uses: every `*.js` there that is not the loader or the
# kit is a figure any book may mount.
#
# This exists because a figure that two books want *identically* should be written
# once. The four earlier duplicates — `circular-motion`, `radiation-penetration`,
# `transformer-turns`, `vector-addition` — turned out to be two books solving the same
# topic differently for different readers, which is a legitimate choice and not this.
# What this is for is a generic tool: the same set-notation diagram, the same number
# line, the same coordinate grid.


def shared_modules() -> dict:
    return scaffold.shared_figure_modules()


def test_a_book_may_not_shadow_a_shared_module():
    """One slug, one module. Two would make a page's meaning depend on build order.

    A book that wants its own version can always rename it, and the error the hook
    raises says so. Silent shadowing is the failure this prevents: the book's copy would
    win or lose depending on which the build happened to write last, and the page would
    look right in one build and wrong in the next.
    """
    from textbook.hooks import figures as hook

    shared = set(shared_modules())
    assert shared, "the shared library is empty, so this test proves nothing"

    for book in BOOKS:
        # The hook needs an mkdocs config; the collision rule does not, so the two
        # halves are checked separately rather than standing up a config per book.
        local = {
            path.stem
            for path in (book.docs / "assets" / "figures").glob("*.js")
            if path.name not in SHARED_FIGURE_FILES
        }
        clashes = sorted(local & shared)
        assert not clashes, (
            f"{book.id} defines {clashes}, which the shared library "
            f"({scaffold.FIGURE_LIBRARY}) already provides. Rename the book's own module."
        )
    assert hook.shadowing_slugs  # the rule the hook applies is the one checked here


def test_the_build_writes_every_shared_module_beside_the_loader(tmp_path):
    """A shared module has to land next to `figures.js`, because the loader is relative.

    Copying it into a subdirectory would leave the file present and unmountable, which
    the build would not notice: an asset reached only by a module import is not a link
    on any page.
    """
    from textbook import pipeline

    book = BOOKS[0]
    out = tmp_path / "site"
    pipeline.build(book.id, book.default_profile.id, out=out, index=False)

    figures = out / "assets" / "figures"
    assert (figures / "figures.js").is_file(), "the loader did not reach the build"
    shared = shared_modules()
    assert shared, "the shared library is empty, so this test proves nothing"
    for slug, source in shared.items():
        # Content-addressed: the page names this file in `data-figure-src`, so the
        # name has to be the bytes and the bytes have to be the library's.
        built = figures / scaffold.addressed_name(source)
        assert built.is_file(), (
            f"the shared module {source.name} is mounted by slug and the build did not "
            "write it beside the loader, so the loader's import fails at runtime"
        )
        assert built.read_bytes() == source.read_bytes(), f"{source.name} differs between the library and the build"


def test_a_page_can_mount_a_shared_module(tmp_path):
    """The end of the chain: the directive accepts the slug and the element is rendered.

    The registry unions the book's slugs with the library's, and this proves it through
    a real build rather than by reading the two sets — a page that names a shared module
    must come out with a `<maths-figure>` for it and a loader to mount it.
    """
    from textbook import pipeline

    shared = set(shared_modules())
    assert shared, "the shared library is empty, so this test proves nothing"

    found = None
    for book in BOOKS:
        for page in book.docs.rglob("*.md"):
            for match in re.finditer(r"^:::figure[ \t]+([a-z0-9-]+)", page.read_text(encoding="utf-8"), re.M):
                if match.group(1) in shared:
                    found = (book, page, match.group(1))
                    break
            if found:
                break
        if found:
            break

    assert found, (
        "no page mounts a shared module, so the library has no user and this test would "
        "prove nothing. Either mount one or delete the library."
    )
    book, page, slug = found
    out = tmp_path / "site"
    pipeline.build(book.id, book.default_profile.id, out=out, index=False)

    built = [
        p for p in out.rglob("*.html") if f'data-figure="{slug}"' in p.read_text(encoding="utf-8")
    ]
    assert built, f"{page.relative_to(repo_root())} names the shared figure {slug} and the built site has no such element"


# --- a kit import may not be shadowed -----------------------------------------
#
# Three modules converted in one pass named a parameter `label`:
#
#     const bar = (top, cls, label, value) => `${label({ text: `${label}` })}`
#
# which makes `label(...)` a call on a string, and the loader replaces the whole figure
# with "Figure failed to load". The syntax is valid, the module parses, and `tools
# kit` — which mounts the kit's own probe figures — never sees it. Only the audit of
# the real site did, and it reported "mounted nothing" for three figures at once.

KIT_IMPORT = re.compile(r'import\s*\{([^}]*)\}\s*from\s*"[^"]*kit\.js"')


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_no_module_shadows_a_kit_import(book, path):
    """A parameter or a local must not reuse an imported kit name."""
    text = path.read_text(encoding="utf-8")
    match = KIT_IMPORT.search(text)
    if not match:
        return
    names = {part.strip().split(" as ")[-1].strip() for part in match.group(1).split(",")}
    names.discard("")
    body = text[match.end():]

    # Scanned by the constructs that *bind* a name, not by a parenthesised
    # expression: `fmt(t, 2)` is a call, and a pattern that cannot tell the two
    # apart reported thirteen modules that are fine.
    def bound_names(pattern: str, group: int = 1) -> set[str]:
        found = set()
        for m in re.finditer(pattern, body):
            for part in m.group(group).split(","):
                part = part.strip().split("=")[0].strip().lstrip("...").strip()
                if part:
                    found.add(part)
        return found

    shadowed = set()
    for name in names:
        shadowed |= ({name} if re.search(rf"\b(?:const|let|var)\s+{name}\b", body) else set())
        shadowed |= ({name} if re.search(rf"\b{name}\s*=>", body) else set())
    declared = bound_names(r"\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)")
    params = bound_names(r"\bfunction\s*[A-Za-z_$]*\s*\(([^)]*)\)")
    params |= bound_names(r"\(([^)]*)\)\s*=>")
    params |= bound_names(r"\bfunction\s*[A-Za-z_$]*\s*\(([^)]*)\)\s*\{")
    shadowed |= (names & declared)
    shadowed |= (names & params)

    assert not shadowed, (
        f"{book.id}/{path.name}: {', '.join(sorted(shadowed))} is imported from the kit "
        "and redeclared, so the imported one is unreachable inside that scope and the "
        "figure throws on mount. Rename the parameter or the local."
    )

# --- the kit's names are either imported or defined ----------------------------


def kit_exports() -> set[str]:
    """Every name the shared kit exports, from its entry point and its parts."""
    root = repo_root() / scaffold.FIGURE_LIBRARY
    files = [root / "kit.js", *sorted((root / "kit").glob("*.js"))]
    names: set[str] = set()
    for path in files:
        text = path.read_text(encoding="utf-8")
        names.update(
            re.findall(r"export\s+(?:async\s+)?function\s+([A-Za-z_$][\w$]*)", text)
        )
        names.update(
            re.findall(r"export\s+(?:const|let|var|class)\s+([A-Za-z_$][\w$]*)", text)
        )
        for body in re.findall(r"export\s*\{([^}]*)\}", text, re.S):
            for item in body.split(","):
                local = item.strip().split(" as ")[-1].strip()
                if local:
                    names.add(local)
    return names


def without_comments_or_strings(text: str) -> str:
    """Enough of a JavaScript lexer to keep a comment from looking like a call."""
    return re.sub(
        r"//[^\n]*|/\*.*?\*/|\"(?:\\.|[^\"])*\"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`",
        "",
        text,
        flags=re.S,
    )


def test_every_figure_calls_only_kit_names_it_imported_or_defined():
    """A missing `axes` import broke the §1.6 table after the gate stayed green.

    The module called `axes()` without importing it, so the figure threw at mount
    time. A static check catches the class without a browser: every kit name used as
    a call must be imported from the kit (or another module), or defined locally.
    """
    exports = kit_exports()
    assert "axes" in exports and "panel" in exports

    missing: list[str] = []
    for book, path in figure_modules():
        text = path.read_text(encoding="utf-8")
        code = without_comments_or_strings(text)
        imported: set[str] = set()
        for body in re.findall(r"import\s*\{([^}]*)\}\s*from\s*[\"'][^\"']*[\"']", text, re.S):
            for item in body.split(","):
                local = item.strip().split(" as ")[-1].strip()
                if local:
                    imported.add(local)
        defined = set(
            re.findall(r"\b(?:function|const|let|var|class)\s+([A-Za-z_$][\w$]*)", code)
        )
        for name in sorted(exports - imported - defined):
            if re.search(rf"(?<![\w.$]){re.escape(name)}\s*\(", code):
                missing.append(f"{book.id}/{path.name}: {name}")

    assert not missing, (
        "figures call kit names they never imported or defined: "
        + ", ".join(missing)
    )



def test_every_lab_names_a_parameter_or_output_its_kernel_has():
    """A name in a lab module is a name in the generated manifest, or it is a break.

    ``kernel-lab.js`` builds a control from the manifest's parameter and reads an
    output by name, so a lab module is a list of names the Rust declared. Renaming a
    parameter or an output in ``solvers/ot-solve`` therefore breaks the figure at run
    time, in a browser, on a page nobody rebuilt. Every lab mounted when it was written;
    this is the check that keeps looking after the Rust moves.
    """
    import json

    root = repo_root()
    library = root / "assets" / "figures"
    data = root / "assets" / "data" / "solvers"
    broken: list[str] = []
    seen = 0
    for path in sorted(library.glob("*-lab.js")):
        text = path.read_text(encoding="utf-8")
        match = re.search(r"data/solvers/([\w-]+)/kernel\.js", text)
        if match is None:
            # The shared renderer: `kernel-lab.js` imports no kernel of its own.
            continue
        kernel_id = match.group(1)
        manifest_path = data / kernel_id / "manifest.json"
        if not manifest_path.exists():
            broken.append(f"{path.name}: no manifest for {kernel_id}")
            continue
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        names = {param["name"] for param in manifest["params"]}
        names |= {output["name"] for output in manifest["outputs"]}
        used = set(
            re.findall(r'kernel\.(?:scalar|output|set|get|spec)\("([^"]+)"\)', text)
        )
        controls = re.search(r"controls:\s*\[([^\]]*)\]", text, re.S)
        if controls is not None:
            used.update(re.findall(r'"([^"]+)"', controls.group(1)))
        seen += 1
        broken.extend(
            f"{path.name}: '{name}' is not a parameter or output of {kernel_id}"
            for name in sorted(used - names)
        )
    assert seen >= 7, f"{seen} lab modules carry a kernel import; the discovery is wrong"
    assert not broken, "lab modules name what their kernel does not have: " + "; ".join(
        broken
    )


# --- the drawing is inside its own canvas ------------------------------------------
#
# `dynamics-table` put five rows of numbers at y = 300…512 in a 300-unit canvas, and
# every check passed: `audit` measures paint, and an element outside the box is painted
# correctly; `readout --verify` recomputes arithmetic, and the numbers were right; `kit`
# checks the DOM contract, and there was nothing wrong with it. The reader got an empty
# frame under prose that described columns.
#
# The rule has two halves, and one rule for both would be wrong: a `<text>` must be
# inside, and a mark may cross the edge but must have ink inside — `wishbone-hero` draws
# its rays to an instant centre 1,295 units off a 520-unit canvas on purpose.


def test_a_figure_that_draws_outside_its_viewbox_is_caught():
    """The rules' own cases, under plain `node`, so they are in the ordinary gate.

    Three are the defects measured on this collection — `dynamics-table`'s rows,
    `kernel-camber`'s clipped tick label, `wishbone-hero`'s intentional ray — and the
    rest are the edges: a label exactly on the frame, a mark wholly outside, and a
    rotated label whose box is not in its parent's space.
    """
    import subprocess

    tools = repo_root() / "tools" / "dist" / "cli.js"
    assert tools.is_file(), "the tools CLI is missing; run `npm run build`"
    result = subprocess.run(
        ["node", str(tools), "canvas", "--cases"],
        capture_output=True,
        text=True,
        check=False,
        cwd=repo_root(),
    )
    assert result.returncode == 0, (
        "the canvas rules no longer catch what they were written for.\n"
        f"{result.stdout[-3000:]}\n{result.stderr[-2000:]}"
    )
