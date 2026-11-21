"""Every guided figure names its drawing, and paints only through classes.

Modules are discovered from the filesystem, so a new figure is covered the moment
it lands; the loader and the kit are excluded by name.
"""

from __future__ import annotations

import re

import pytest

from textbook import scaffold
from textbook.book import discover_books, repo_root

from support import call_expressions

BOOKS = discover_books()

# The loader and the kit: not figures, and named in the scaffold the build reads.
SHARED_FIGURE_FILES = tuple(scaffold.SHARED_FIGURE_FILES)

MOUNT = re.compile(r"export\s+(?:async\s+)?function\s+mount\s*\(")

ROLE_ATTRIBUTE = re.compile(r"""role\s*=\s*["']img["']""")
ROLE_SET_CALL = re.compile(
    r"""setAttribute\(\s*["']role["']\s*,\s*["']img["']\s*\)"""
)
# The name may be written in the markup or applied while drawing; both count.
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

# No colour in a figure module: a literal cannot adapt to a bundle or to dark mode,
# so it is painted with a fig-* class or a --tb-* token instead.
FIGURE_HEX = re.compile(r"#[0-9a-fA-F]{3,8}(?![0-9a-fA-F])")
FIGURE_COLOUR_FUNCTION = re.compile(
    r"(?<![\w-])(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch)\([^)]*\)",
    re.IGNORECASE,
)
# A named colour counts only where a colour value belongs: `color:red`, `fill="red"`.
# The `=` form needs a quote, because unquoted `fill=i` is a variable; `currentColor`,
# `none` and the gradient functions are tokens.
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

# Maths renders at build time, so a runtime `$...$` shows literally; `${` is JS.
RUNTIME_LATEX = re.compile(r"\$(?!\{)")


class _SharedLibrary:
    """The shared library, wearing enough of a ``Book`` to be parametrised over.

    Its modules are held to the same contract as a book's own.
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
    """Every `.js` in a figure directory is a figure except the loader and the kit.

    The shared files live in `assets/` only, so a copy or a link in a book's tree
    would be a second source of truth.
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


# A text element's purpose is words, and `role="img"` on one replaces them with the
# accessible name, so the text is never read and a live region never announces.
TEXT_ELEMENT = re.compile(
    r"""<(p|label|span|li|h[1-6]|em|strong|output)\b[^>]*\brole\s*=\s*["']img["']""",
    re.I,
)
# The name a converted module passes to the kit instead of writing an `aria-label`.
KIT_LABEL = re.compile("panel\\([^)]*?\\blabel\\s*:\\s*[\"'`]([^\"'`]+)[\"'`]", re.S)

# What counts as drawing: the module writes its own `<svg>`, or asks the kit for a
# panel. A check that knew only the first would skip every converted module.
DRAWS = re.compile(r"<svg|<canvas|createElementNS", re.I)
KIT_PANEL = re.compile(r"\bpanel\(", re.I)
KIT_NO_DRAWING = re.compile(r"\bpanel\([^)]*\bdrawing\s*:\s*false", re.I | re.S)


def draws(text: str) -> bool:
    """Does this module put a drawing on the page: its own `<svg>`, or a kit panel?"""
    if KIT_NO_DRAWING.search(text):
        return False
    return bool(DRAWS.search(text)) or bool(KIT_PANEL.search(text))


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_a_figure_that_draws_gives_its_drawing_a_name(book, path):
    """A drawing is silent to a screen reader without `role="img"` and a name."""
    text = path.read_text(encoding="utf-8")
    if not draws(text):
        pytest.skip("this figure draws nothing; see the test below")
    # The module writes the attribute, or `panel()` sets it for it.
    assert (
        ROLE_ATTRIBUTE.search(text) or ROLE_SET_CALL.search(text) or "panel(" in text
    ), (
        f"{book.id}/{path.name}: give the drawing role=\"img\" so a screen "
        "reader treats it as one image"
    )


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_no_figure_hides_its_own_text_behind_role_img(book, path):
    """`role="img"` belongs on the picture, never on an element whose job is words.

    Marking text as an image is how its words disappear from a screen reader.
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
        # Nothing is drawn, so the figure's own text is read directly.
        pytest.skip("this figure draws nothing, so it has no accessible name to set")
    names = [name.strip() for name in accessible_names(text)]
    names += [name.strip() for name in KIT_LABEL.findall(text)]
    names = [name for name in names if name]
    assert names, (
        f"{book.id}/{path.name}: set a plain-English aria-label on the drawing"
    )
    assert any(len(name) >= 15 and len(name.split()) >= 3 for name in names), (
        f"{book.id}/{path.name}: aria-label is too short to describe the figure: "
        f"{names!r}"
    )


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_every_figure_accessible_name_is_plain_text(book, path):
    """Maths renders at build time, so a name must be plain text, not LaTeX.

    A ``$`` that starts a JS template expression (``${value}``) is fine.
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
    that names the thing is not doing it. Only full-line `//` comments and block
    comments are removed, so a URL inside a string survives.
    """
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    return re.sub(r"(?m)^\s*//.*$", "", text)


def figure_colour_literals(text: str) -> list[str]:
    """The colour literals in a figure module: a hex, an rgb/hsl function, or a named
    colour where a colour value belongs.

    Not the same scanner as ``test_themes.colour_literals``, which reads a stylesheet
    or a Python file. This one reads JavaScript, so a class or variable called ``red``
    is not a colour. The two are kept apart on purpose.
    """
    found = [match.group(0) for match in FIGURE_HEX.finditer(text)]
    found += [match.group(0) for match in FIGURE_COLOUR_FUNCTION.finditer(text)]
    found += [
        match.group(1)
        for match in FIGURE_COLOUR_PROPERTY.finditer(text)
        # A boolean is not a colour: `fill: true` is a JavaScript option, and the
        # property pattern cannot tell JavaScript from CSS.
        if match.group(1).lower() not in TOKEN_COLOUR_VALUES
        and match.group(1).lower() not in {"true", "false", "null", "undefined"}
    ]
    return found


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_no_figure_module_uses_unseeded_randomness(book, path):
    """A figure that samples must be reproducible from a seed.

    Two readers comparing what they saw are comparing different data if the module
    draws from Math.random, and no other check can see that difference.
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
    """A `fig-*` class sets `fill` and beats a presentation attribute.

    So `fill="none" class="fig-accent"` is a filled accent, not a stroked line, and
    the stroke stays correct so the contrast audit has nothing to say. Use `fig-line`,
    whose class sets `fill: none`, or an inline style.
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
    """A runtime ``$...$`` shows literally; ``${`` is a template expression."""
    offenders = [
        line.strip()
        for line in code_only(path.read_text(encoding="utf-8")).splitlines()
        if RUNTIME_LATEX.search(line)
    ]
    assert not offenders, (
        f"{book.id}/{path.name}: a figure injects LaTeX, which is not rendered "
        f"at runtime: {offenders!r}. Write the readout in HTML or plain text."
    )


# --- the colour contract: a figure paints with a class, never a colour --------- #
#
# A `text-*` class must set `fill`, not only `color`, or SVG text keeps its initial
# black; a class no stylesheet defines does nothing. `tools audit` measures both in a
# browser; these are the cheap guard.

STYLESHEET = repo_root() / "assets" / "stylesheets" / "extra.css"

# A class that means "paint with this token": `fig-*` is a shape, `text-*` is words.
# The pattern stays open at the top, so a class nobody has defined is still seen.
FIGURE_CLASS = re.compile(
    r"""class\s*=\s*["'][^"']*\b((?:fig|text)-[a-z][\w-]*)"""
)
FIGURE_CLASSLIST = re.compile(
    r"""classList\.(?:add|remove|toggle)\(\s*["']((?:fig|text)-[a-z][\w-]*)["']"""
)
# The kit's own spelling: `label({ ..., class: "text-warn" })`, a JavaScript object
# key rather than an HTML attribute, which the two scans above cannot see.
FIGURE_OPTION = re.compile(r"""\bclass:\s*["']((?:fig|text)-[a-z][\w-]*)["']""")


def text_classes_in(text: str) -> set[str]:
    """Every `text-*` colour class a module applies: an attribute, a `classList` call,
    or the kit's `class:` option. All three appear in the collection.
    """
    found = (
        set(FIGURE_CLASS.findall(text))
        | set(FIGURE_CLASSLIST.findall(text))
        | set(FIGURE_OPTION.findall(text))
    )
    return {name for name in found if name.startswith("text-")}


def test_the_class_scanner_reads_all_three_spellings():
    """Guard the guard: a scanner that misses a spelling reports success."""
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
    """`color` alone does not paint an SVG `<text>`; the class must also set `fill`.

    `fill: currentColor` makes the class mean the same thing in HTML and in SVG.
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
    """`fig-*` paints shapes and `text-*` paints words, each setting what SVG uses."""
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
# 16 units is 9.2px at 390px, and the mobile audit fails below 9px. This is the rule
# without a browser.


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_no_label_is_written_below_the_phone_floor(book, path):
    """A literal `size:` under 16 units is 8.6px at 390px: name a `SIZE` constant."""
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
    """`show:` must be explicit: the default adds a value display the reader sees.

    `slider()` shows the value unless told not to, which is a good default for a new
    figure and the wrong one for a refactor. A module with no sliders is skipped.
    """
    calls = call_expressions(path.read_text(encoding="utf-8"), "slider")
    silent = [call for call in calls if "show:" not in call]
    assert not silent, (
        f"{book.id}/{path.name}: {len(silent)} slider call(s) do not say whether the "
        "value is shown. `show: true` or `show: false` — the reader sees the "
        f"difference, so it is stated at the call: {silent[0][:70]!r}"
    )


# --- the kit's pure layer -----------------------------------------------------
# Drawing and formatting are pure functions, and `tools kit` reaches them only through
# a browser; `kit-pure` runs under plain `node`, so it is in the ordinary gate.


def test_the_figure_kit_keeps_its_pure_contract():
    """Each assertion is a defect that shipped: a long float in front of a reader, an
    uncoloured `<text>`, a flipped axis, a `NaN` sample blanking a curve, a unit typed
    into an answer reported as a mistake.
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


# --- the shared figure library ------------------------------------------------
# A module is mounted by bare slug beside the loader, so `assets/figures/` is the
# library too: every `*.js` there that is not the loader or the kit is a figure any
# book may mount. It exists for a generic tool, not for duplicating a topic.


def shared_modules() -> dict:
    return scaffold.shared_figure_modules()


def test_a_book_may_not_shadow_a_shared_module():
    """One slug, one module. Two would make a page's meaning depend on build order."""
    from textbook.hooks import figures as hook

    shared = set(shared_modules())
    assert shared, "the shared library is empty, so this test proves nothing"

    for book in BOOKS:
        # The collision rule needs no mkdocs config, so the halves are checked apart.
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
    """The loader imports relative to itself, so a shared module must land beside it.

    A copy in a subdirectory would leave the file present and unmountable, and no page
    links it, so the build would not notice.
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
        # Content-addressed: the name is the bytes, and the bytes are the library's.
        built = figures / scaffold.addressed_name(source)
        assert built.is_file(), (
            f"the shared module {source.name} is mounted by slug and the build did not "
            "write it beside the loader, so the loader's import fails at runtime"
        )
        assert built.read_bytes() == source.read_bytes(), f"{source.name} differs between the library and the build"


def test_a_page_can_mount_a_shared_module(tmp_path):
    """The directive accepts a shared slug and the built page carries the element."""
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
# `const bar = (top, cls, label, value) => ...` binds a kit import to a string, which is
# valid syntax, so the module parses and the figure dies on mount with "Figure failed
# to load". Only the site audit sees it.

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

    # Scan the constructs that bind a name, not any parenthesised expression:
    # `fmt(t, 2)` is a call.
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
    """A kit name used as a call must be imported or defined, or the figure throws.

    A static check catches the class without a browser.
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
    """A name in a lab module must exist in the generated manifest, or the figure breaks.

    Renaming a parameter or an output in ``solvers/ot-solve`` breaks it at run time, in
    a browser, on a page nobody rebuilt.
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


# --- the drawing is inside its own canvas -------------------------------------
# A `<text>` must be inside; a mark may cross the edge but must have ink inside. A
# table of rows below a 300-unit canvas passes the paint, readout and DOM checks and
# still gives the reader an empty frame.


def test_a_figure_that_draws_outside_its_viewbox_is_caught():
    """The canvas rules' own cases, under plain `node`, so they are in the gate."""
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


def test_the_loader_keeps_a_label_inside_its_frame_in_any_font():
    """A label's width is its font's, so the loader has the last word, not the test.

    Ten figures measured clean here and drew outside their own `viewBox` on a machine
    with a wider font. The loader measures every `<text>` after it is drawn and narrows
    one that leaves the frame with `textLength`, watching the **host** rather than the
    `svg`, because a figure that re-panels on a control replaces its own frame.
    """
    loader = (repo_root() / "assets" / "figures" / "figures.js").read_text(encoding="utf-8")
    assert "function fitText(svg)" in loader
    assert 'text.setAttribute("textLength"' in loader
    assert "MutationObserver(fit).observe(this" in loader

    surface = (repo_root() / "tools" / "src" / "commands" / "canvas.ts").read_text(encoding="utf-8")
    assert "font: {" in surface, "canvas has no --font, so no sweep can ask a wider font"


# --- the `fig-*` half of the class contract -----------------------------------
# A `fig-*` name that neither a stylesheet nor the kit defines paints nothing. The
# kit's own names (`fig-control`, `fig-caption`, `readout`) are structural, not colour
# classes, so the guard has to know them rather than call them dead.

FIGURE_ANY_CLASS = re.compile(r"\b((?:fig|text)-[a-z][\w-]*)\b")
KIT_SOURCE = repo_root() / "assets" / "figures" / "src" / "kit"


def figure_classes_in(text: str) -> set[str]:
    """Every `fig-*`/`text-*` name a module mentions, in any spelling.

    One scanner over the code rather than three over the spellings: a class attribute,
    a `classList` call, the kit's `class:` option and a `querySelector(".fig-…")` all
    contain the name, and the last is how a module reaches a part the kit built.
    """
    return set(FIGURE_ANY_CLASS.findall(code_only(text)))


def kit_classes() -> set[str]:
    """The names the kit itself creates or queries, read from its TypeScript."""
    found: set[str] = set()
    for path in sorted(KIT_SOURCE.glob("*.ts")):
        found |= figure_classes_in(path.read_text(encoding="utf-8"))
    return found


def test_the_class_scanner_sees_a_name_no_stylesheet_defines():
    """Guard the guard: the scan must report the defect it exists for."""
    assert "fig-nope" in figure_classes_in('el.className = "fig-nope";')
    assert "fig-nope" in figure_classes_in('parent.querySelector(".fig-nope");')


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_every_figure_class_a_module_uses_is_defined_or_owned_by_the_kit(book, path):
    """A `fig-*`/`text-*` name in neither list does nothing, and says so to nobody."""
    style = css_rules(STYLESHEET.read_text(encoding="utf-8"))
    known = set(style) | kit_classes()
    used = figure_classes_in(path.read_text(encoding="utf-8"))
    unknown = sorted(name for name in used if name not in known)
    assert not unknown, (
        f"{book.id}/{path.name}: {unknown!r} is neither a colour class in extra.css "
        "nor a structural class the kit creates, so it paints nothing. Use a "
        "`text-*` class for words and `fig-grid`/`fig-line` for strokes."
    )


# --- motion may not touch a figure's paint -----------------------------------

CSS_STYLESHEETS = (
    STYLESHEET,
    repo_root() / "engine" / "src" / "textbook" / "css" / "shell.css",
    repo_root() / "assets" / "stylesheets" / "portal.css",
    repo_root() / "assets" / "stylesheets" / "settings.css",
)


def css_declarations(path: Path):
    """(selector, property, value) for every declaration in a stylesheet."""
    css = re.sub(r"/\*.*?\*/", "", path.read_text(encoding="utf-8"), flags=re.S)
    for selector, block in re.findall(r"([^{}]+)\{([^{}]*)\}", css):
        for declaration in block.split(";"):
            if ":" not in declaration:
                continue
            prop, value = declaration.split(":", 1)
            yield " ".join(selector.split()), prop.strip().lower(), value.strip()


@pytest.mark.parametrize("path", CSS_STYLESHEETS, ids=lambda p: p.name)
def test_no_rule_animates_a_figures_paint(path):
    """A transition on paint makes `audit` sample an interpolated colour, not a state.

    `motion` asks for `opacity`/`transform` for the same reason.
    """
    offenders = []
    for selector, prop, value in css_declarations(path):
        if prop not in {"transition", "transition-property", "animation",
                        "animation-name"}:
            continue
        if "maths-figure" not in selector and "fig-" not in selector:
            continue
        if re.search(r"(?<![\w-])(fill|stroke|color|background\w*|all)(?![\w-])", value) \
                or "--tb-" in value:
            offenders.append(f"{selector} {{ {prop}: {value} }}")
    assert not offenders, (
        "a figure rule animates paint, so the paint audit would measure a frame "
        f"rather than a state: {offenders!r}. Animate opacity or transform."
    )


# --- the 9px floor is a product of two numbers, and both are knobs -----------

def _rem_values(value: str) -> list[float]:
    """The rem numbers in a declaration value, in order."""
    return [float(number) for number in re.findall(r"([\d.]+)rem", value)]


def test_the_phone_label_floor_survives_a_padding_change():
    """Recompute the phone scale from its two inputs, and fail if it drops under 9px.

    An SVG scales by drawn width over viewBox width, so the size a reader sees is not
    the size a module writes. The panel's padding and `max-width` set the drawn width,
    which makes them type-size knobs the written-size floor cannot see.
    """
    wrap_padding = next(
        value for selector, prop, value in css_declarations(CSS_STYLESHEETS[1])
        if selector == ".wrap" and prop == "padding"
    )
    panel = next(
        (selector, prop, value) for selector, prop, value in css_declarations(STYLESHEET)
        if prop == "padding" and "maths-figure" in selector and "figcaption" not in selector
    )
    panel_padding = _rem_values(panel[2])
    panel_border = next(
        (float(number) for selector, prop, value in css_declarations(STYLESHEET)
         if prop == "border" and "maths-figure" in selector
         for number in re.findall(r"(\d+)px", value)),
        0.0,
    )
    kit_text = (KIT_SOURCE / "text.ts").read_text(encoding="utf-8")
    kit_frame = (KIT_SOURCE / "frame.ts").read_text(encoding="utf-8")
    tick = float(re.search(r"tick:\s*(\d+)", kit_text).group(1))
    viewbox = float(re.search(r"^\s*width = (\d+),", kit_frame, re.M).group(1))

    wrap_side = _rem_values(wrap_padding)[0]
    panel_side = panel_padding[-1] if len(panel_padding) == 2 else panel_padding[0]
    drawn = 390 - 2 * 16 * wrap_side - 2 * 16 * panel_side - 2 * panel_border
    px = drawn / viewbox * tick
    assert px >= 9.0, (
        f"a {tick}-unit label renders at {px:.1f}px at 390 "
        f"(drawn {drawn:.1f}px, viewBox {viewbox}): the panel's padding or the "
        "drawing's width moved the floor, so raise SIZE or widen the figure."
    )


# --- no colour-only element naming in figure readouts -------------------------
# Warn and good collapse under deuteranopia, and every bundle paints `fig-accent` a
# different hue, so name a drawn element by its role, not its colour.
COLOUR_ELEMENT_REF = re.compile(
    r"\bthe\s+(?:orange|green|red|blue)\s+(?:line|curve|arrow|dot|circle)\b",
    re.IGNORECASE,
)


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_no_figure_names_a_drawn_element_by_colour(book, path):
    code = code_only(path.read_text(encoding="utf-8"))
    hits = COLOUR_ELEMENT_REF.findall(code)
    assert not hits, (
        f"{book.id}/{path.name} refers to a drawn element by colour ({hits!r}), which "
        "fails under deuteranopia and disagrees across theme bundles; name its role instead."
    )


@pytest.mark.parametrize(("book", "path"), FIGURES, ids=IDS)
def test_no_figure_paints_html_with_a_token_var(book, path):
    """Colour in a figure belongs on an SVG shape via `fig-*`, not HTML `background: var(--tb-*)`."""
    code = code_only(path.read_text(encoding="utf-8"))
    hits = re.findall(r"background[^;\n\"'`]*var\(\s*--tb-[a-zA-Z0-9-]+", code, re.IGNORECASE)
    assert not hits, (
        f"{book.id}/{path.name} paints an HTML background with a --tb-* token ({hits!r}); "
        "route colour through fig-* classes on SVG shapes so the paint audit measures it."
    )
