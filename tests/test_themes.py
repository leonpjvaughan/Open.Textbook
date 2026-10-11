"""Theme bundles: the collection's core themes, and the subject tint on top.

A bundle and a book multiply: four bundles times every book, in two schemes each.
These tests are what keeps that combinable — a complete palette per bundle, a
subject tint that composes rather than competes, and enough contrast to read in
every combination.
"""

from __future__ import annotations

import re

import pytest
import yaml

from textbook import portal
from textbook.book import SCHEME_TOKENS, discover_books, load_collection, repo_root
from textbook.themes import (
    FIGURE_MIN_CONTRAST,
    FIGURE_PANEL_INK,
    MIN_CONTRAST,
    ON_ACCENT_MIN_CONTRAST,
    SCHEMES,
    bundle_by_id,
    contrast,
    contrast_problems,
    default_bundle,
    discover_bundles,
    effective_tokens,
    figure_panel,
    load_bundle,
    ordered_bundles,
    stylesheet,
)

BUNDLES = discover_bundles()
BOOKS = discover_books()
IDS = [bundle.id for bundle in BUNDLES]
THEMES_CSS = repo_root() / "assets" / "stylesheets" / "themes.css"


def test_bundles_exist():
    assert len(BUNDLES) >= 2, "a theme menu needs somewhere to point"


@pytest.mark.parametrize("bundle", BUNDLES, ids=IDS)
def test_bundle_is_a_light_and_dark_pair(bundle):
    assert bundle.title
    for scheme in SCHEMES:
        assert scheme in bundle.palettes
    # Both variations carry the same tokens, so switching scheme cannot leave a
    # token undefined.
    assert set(bundle.palette("light")) == set(bundle.palette("dark"))


@pytest.mark.parametrize("bundle", BUNDLES, ids=IDS)
def test_bundle_palette_is_complete(bundle):
    for scheme, palette in bundle.palettes.items():
        assert set(palette) == set(SCHEME_TOKENS), f"{bundle.id}/{scheme} is incomplete"
        for key, value in palette.items():
            assert value.startswith("#"), f"{bundle.id}/{scheme}.{key} is not a hex colour"


@pytest.mark.parametrize("bundle", BUNDLES, ids=IDS)
def test_typography_names_only_known_roles(bundle):
    assert set(bundle.typography) <= {"body", "display", "mono"}


def test_a_bundle_may_not_invent_a_token(tmp_path):
    path = tmp_path / "bad.yaml"
    path.write_text(
        "id: bad\ntitle: Bad\n"
        "light: {accent: '#000000', nonsense: '#ffffff'}\n"
        "dark: {accent: '#ffffff'}\n",
        encoding="utf-8",
    )
    with pytest.raises(ValueError, match="(missing|unknown)"):
        load_bundle(path)


def test_a_bundle_must_be_complete(tmp_path):
    path = tmp_path / "thin.yaml"
    path.write_text(
        "id: thin\ntitle: Thin\nlight: {accent: '#000000'}\ndark: {accent: '#ffffff'}\n",
        encoding="utf-8",
    )
    with pytest.raises(ValueError, match="missing"):
        load_bundle(path)


def test_the_default_bundle_is_declared():
    declared = str(load_collection().get("default_theme", "")).strip()
    assert declared, "collection.yaml must name a default theme"
    assert default_bundle().id == declared


def test_menu_order_is_declared_not_alphabetical():
    order = [str(theme_id) for theme_id in load_collection().get("themes", [])]
    assert order, "collection.yaml should name the menu order"
    assert [bundle.id for bundle in ordered_bundles()][: len(order)] == order


# --- composition --------------------------------------------------------------


@pytest.mark.parametrize("bundle", BUNDLES, ids=IDS)
def test_a_bundle_composes_the_subject_tint_in(bundle):
    """The point of the model: the bundle chooses surfaces, the book chooses hue."""
    css = stylesheet([bundle], bundle)
    for key in SCHEME_TOKENS:
        if key in bundle.fixed:
            continue
        assert f"var(--tb-book-{key.replace('_', '-')}, " in css
    # The fallback layer means a reader without JavaScript still gets a theme.
    assert 'body[data-md-color-scheme="default"]' in css
    assert 'body[data-md-color-scheme="slate"]' in css


def test_a_fixed_token_refuses_the_tint():
    """`clean` is monochrome on purpose: every book looks the same there."""
    clean = bundle_by_id("clean")
    assert "accent" in clean.fixed
    css = stylesheet([clean], clean)
    assert "--tb-accent: var(--tb-book-accent" not in css
    subject = {"accent": "#ff0000"}
    assert effective_tokens(clean, "default", subject)["accent"] == clean.palette("default")["accent"]


def test_an_unfixed_token_adopts_the_tint():
    editorial = bundle_by_id("editorial")
    subject = {"accent": "#ff0000"}
    assert effective_tokens(editorial, "default", subject)["accent"] == "#ff0000"
    assert effective_tokens(editorial, "default", None)["accent"] == editorial.palette("default")["accent"]


def test_each_bundle_and_scheme_selects_a_block_per_bundle():
    css = stylesheet(BUNDLES, default_bundle())
    for bundle in BUNDLES:
        for attr in ("default", "slate"):
            assert f'html[data-theme="{bundle.id}"] body[data-md-color-scheme="{attr}"]' in css


# --- the invariant that makes the multiplication safe -------------------------


@pytest.mark.parametrize("bundle", BUNDLES, ids=IDS)
@pytest.mark.parametrize("book", BOOKS, ids=[b.id for b in BOOKS])
def test_every_bundle_and_subject_pair_is_readable(bundle, book):
    """Four bundles times every book, in two schemes: all of them must be legible.

    This is what lets a book state one accent per scheme and trust it everywhere,
    rather than tuning a palette per bundle. It covers the figure tokens too:
    `fig-warn`, `fig-good` and `fig-grid` are measured against the figure panel,
    which is a different surface from the page (see `contrast_problems`).
    """
    for scheme in ("default", "slate"):
        subject = book.theme.for_scheme(
            "slate" if scheme == "slate" else "default"
        ).tokens
        problems = contrast_problems(bundle, scheme, subject)
        assert not problems, "; ".join(problems)


def test_the_contrast_check_can_actually_fail():
    """A guard on the guard: a pale accent on pale paper must be reported."""
    editorial = bundle_by_id("editorial")
    assert contrast_problems(editorial, "default", {"accent": "#f7f7f7"})
    assert not contrast_problems(editorial, "default", {"accent": "#2f6690"})
    # An `accent_ink` the colour of the accent it sits on must be reported too.
    assert contrast_problems(
        editorial, "default", {"accent_ink": editorial.palette("default")["accent"]}
    )


def test_the_figure_contrast_check_can_actually_fail():
    """And a figure token the colour of the panel must be reported too."""
    editorial = bundle_by_id("editorial")
    panel = figure_panel(editorial.palette("default"))
    assert contrast_problems(editorial, "default", {"fig_grid": panel})
    assert contrast_problems(editorial, "default", {"fig_good": panel})
    assert not contrast_problems(editorial, "default", None)


def test_the_figure_thresholds_follow_what_the_token_draws():
    """Why the two figures differ, recorded where a change must argue with it.

    `fig-warn` and `fig-good` colour text (`.text-warn`, `.text-good`, and SVG
    labels), so they are held to the 4.5:1 WCAG AA minimum for normal text.
    `fig-grid` draws axes and gridlines: a graphical object a reader needs, but
    not text, so WCAG 1.4.11's 3:1 applies. Both are below ink's AAA 7:1, which
    is body text on plain paper.
    """
    assert FIGURE_MIN_CONTRAST == {"fig_warn": 4.5, "fig_good": 4.5, "fig_grid": 3.0}
    assert FIGURE_MIN_CONTRAST["fig_grid"] < FIGURE_MIN_CONTRAST["fig_warn"]
    assert FIGURE_MIN_CONTRAST["fig_warn"] < MIN_CONTRAST["ink"]


def test_the_on_accent_threshold_is_a_text_minimum():
    """`accent_ink` is text, so it is held to AA like link and accent."""
    assert ON_ACCENT_MIN_CONTRAST == {"accent_ink": 4.5}


@pytest.mark.parametrize("bundle", BUNDLES, ids=IDS)
@pytest.mark.parametrize("scheme", ("default", "slate"))
def test_accent_ink_reads_on_the_bundles_own_accent(bundle, scheme):
    """The label knocked out of the accent is not the paper.

    A bundle's own paper can sit below 4.5:1 on its own accent — omarchy light is
    4.34:1 and gruvbox light 4.40:1 — which is the defect this token fixes. The
    composed check in `contrast_problems` measures the book's effective accent;
    this measures the bundle's own, so the palette is safe even with no subject
    tint, and it fails if `accent_ink` goes back to the paper.
    """
    tokens = bundle.palette(scheme)
    ratio = contrast(tokens["accent_ink"], tokens["accent"])
    assert ratio >= ON_ACCENT_MIN_CONTRAST["accent_ink"], (
        f"{bundle.id}/{scheme}: accent_ink {tokens['accent_ink']} on the accent "
        f"{tokens['accent']} is {ratio:.2f}:1"
    )


def test_the_figure_surface_matches_the_stylesheet():
    """The panel a figure is drawn on is mirrored from `extra.css`.

    If one moves without the other, every figure ratio this file computes is
    measured against the wrong surface.
    """
    css = (repo_root() / "assets" / "stylesheets" / "extra.css").read_text(encoding="utf-8")
    match = re.search(
        r"maths-figure\s*\{[^}]*?background:\s*color-mix\(\s*in srgb,\s*"
        r"var\(--md-default-bg-color\)\s*([\d.]+)%,\s*"
        r"var\(--md-default-fg-color\)\s*([\d.]+)%\s*\)",
        css,
        re.DOTALL,
    )
    assert match, (
        "the maths-figure panel is no longer `color-mix(in srgb, paper N%, ink M%)`; "
        "update FIGURE_PANEL_INK and figure_panel() to match"
    )
    paper_share, ink_share = (float(value) for value in match.groups())
    assert ink_share / (paper_share + ink_share) == pytest.approx(FIGURE_PANEL_INK, abs=0.001)


def test_contrast_is_symmetric_and_bounded():
    assert contrast("#000000", "#ffffff") == pytest.approx(21.0, abs=0.01)
    assert contrast("#ffffff", "#000000") == pytest.approx(21.0, abs=0.01)
    assert contrast("#777777", "#777777") == pytest.approx(1.0, abs=0.001)
    assert MIN_CONTRAST["ink"] > MIN_CONTRAST["accent"]


# --- generated artefacts ------------------------------------------------------


def test_generated_stylesheet_is_in_sync():
    assert THEMES_CSS.is_file(), "themes.css has not been generated"
    assert THEMES_CSS.read_text(encoding="utf-8") == stylesheet(ordered_bundles(), default_bundle()), (
        "assets/stylesheets/themes.css is stale; run `python -m textbook.scaffold`"
    )


# --- no colour literal in the shared stylesheet -------------------------------

# `extra.css` is the plumbing layer: a colour declared here outranks every bundle,
# silently, in both schemes and for every reader. So the check cannot be "no
# --tb-* token name appears" alone — the literal that broke the rule was
# `.math-error { color: #b3261e; }`, which that check passed.
#
# The scanner ignores comments (prose may name a colour) and flags a hex, a
# colour function, or a CSS named colour. `transparent` and `currentColor` are
# `<color>` keywords but not `<named-color>`, so they are not flagged: neither
# picks a hue. `white-space` is not a colour, so names are matched against whole
# hyphenated words, not substrings.
CSS_COMMENT = re.compile(r"/\*.*?\*/", re.DOTALL)
HEX_COLOUR = re.compile(r"#[0-9a-fA-F]{3,8}(?![0-9a-fA-F])")
COLOUR_FUNCTION = re.compile(
    r"(?<![\w-])(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\([^)]*\)",
    re.IGNORECASE,
)
NAMED_COLOUR = re.compile(r"(?<![\w-])([a-z]+)(?![\w-])", re.IGNORECASE)
NAMED_COLOURS = frozenset(
    """
    aliceblue antiquewhite aqua aquamarine azure beige bisque black
    blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse chocolate
    coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod
    darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange
    darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray
    darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey
    dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite
    gold goldenrod gray grey green greenyellow honeydew hotpink indianred indigo
    ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral
    lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink
    lightsalmon lightseagreen lightskyblue lightslategray lightslategrey
    lightsteelblue lightyellow lime limegreen linen magenta maroon
    mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen
    mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue
    mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange
    orangered orchid palegoldenrod palegreen paleturquoise palevioletred
    papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red
    rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna
    silver skyblue slateblue slategray slategrey snow springgreen steelblue tan
    teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen
    """.split()
)


def colour_literals(css: str) -> list[str]:
    """Every colour literal in a stylesheet, comments ignored."""
    text = CSS_COMMENT.sub(" ", css)
    found = [match.group(0) for match in HEX_COLOUR.finditer(text)]
    found += [match.group(0) for match in COLOUR_FUNCTION.finditer(text)]
    found += [
        match.group(1)
        for match in NAMED_COLOUR.finditer(text)
        if match.group(1).lower() in NAMED_COLOURS
    ]
    return found


@pytest.mark.parametrize("book", BOOKS, ids=[b.id for b in BOOKS])
def test_each_book_sees_the_shared_stylesheet(book):
    link = book.docs / "assets" / "stylesheets" / "themes.css"
    assert link.is_symlink(), f"{book.id}: themes.css should be a symlink"
    assert link.resolve() == THEMES_CSS, f"{book.id}: themes.css points elsewhere"


def test_the_base_stylesheet_defines_no_colour():
    """Colour lives in bundles. A stray token here would win over every bundle."""
    css = (repo_root() / "assets" / "stylesheets" / "extra.css").read_text(encoding="utf-8")
    # It may *use* tokens in the Material mapping; it must not declare them, or it
    # would win over every bundle.
    for token in SCHEME_TOKENS.values():
        assert f"{token}:" not in css, f"extra.css declares {token}; that belongs to a bundle"
    literals = colour_literals(css)
    assert not literals, (
        "extra.css declares a literal colour, which outranks every theme bundle, "
        f"so every reader gets the same one: {literals}. Use a --tb-* token, a "
        "fig-*/text-* class, or color-mix(in srgb, var(--tb-…), transparent)."
    )


def test_the_colour_scanner_can_actually_fail():
    """A guard on the guard: the scanner must catch each shape of literal.

    The check this replaces only looked for a `--tb-*` token name, so the
    `.math-error { color: #b3261e; }` it was meant to catch passed it.
    """
    assert colour_literals(".math-error { color: #b3261e; }")
    assert colour_literals("x { background: rgb(0 0 0 / 20%); }")
    assert colour_literals("x { background: hsl(200 50% 40%); }")
    assert colour_literals("x { color: white; }")
    # Tokens, classes, and the absence of paint are not literals.
    assert not colour_literals("x { color: var(--tb-fig-warn); background: transparent; }")
    assert not colour_literals("x { box-shadow: 0 1px 2px color-mix(in srgb, var(--tb-ink) 20%, transparent); }")
    # `white-space` contains a colour name but is a property, not a value.
    assert not colour_literals("x { white-space: nowrap; }")


def test_the_portal_stylesheet_defines_no_colour():
    """The landing page's own stylesheet follows the bundle, not a literal hue.

    The same bug class as `extra.css` (item 15): `portal.css` declared
    `--tb-shadow` with a literal `rgb(0 0 0 / …)`, so the card's elevation was
    identical under every bundle in both schemes.
    """
    css = (repo_root() / "assets" / "stylesheets" / "portal.css").read_text(encoding="utf-8")
    literals = colour_literals(css)
    assert not literals, (
        f"portal.css declares literal colour(s): {literals}. Use a --tb-* token "
        "or color-mix over one."
    )


# --- the landing page ---------------------------------------------------------


def test_the_landing_page_offers_every_bundle():
    html = portal.render()
    assert 'id="theme-menu"' in html
    for bundle in BUNDLES:
        assert f'value="{bundle.id}"' in html
        assert bundle.title in html


def test_the_landing_page_applies_the_theme_before_paint():
    html = portal.render()
    head = html[: html.index("</head>")]
    assert "data-theme" in head
    assert "textbooks:theme" in head


def test_the_landing_page_shares_the_books_stylesheet():
    """One bundle stylesheet, so the front door cannot drift from the books."""
    target = repo_root() / "site" / "assets" / "stylesheets" / "themes.css"
    portal.main()
    assert target.is_file()
    assert target.read_text(encoding="utf-8") == THEMES_CSS.read_text(encoding="utf-8")


def test_the_menu_can_be_withdrawn(monkeypatch):
    """Kept switchable, so the selector can go once a default is settled on."""
    import textbook.book as books_module

    original = books_module.load_collection

    def withdrawn(root=None):
        data = dict(original(root))
        data["theme_selector"] = False
        return data

    monkeypatch.setattr(books_module, "load_collection", withdrawn)
    html = portal.render()
    assert 'id="theme-menu"' not in html
    # The preference still works even when the choice is not offered.
    assert "textbooks:theme" in html


def test_the_bundles_are_valid_yaml_with_one_file_each():
    for bundle in BUNDLES:
        assert bundle.source and bundle.source.suffix == ".yaml"
        assert yaml.safe_load(bundle.source.read_text(encoding="utf-8"))["id"] == bundle.id
