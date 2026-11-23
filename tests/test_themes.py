"""Theme bundles: the collection's core themes, and the subject tint on top.

A bundle and a book multiply, so these tests keep the combinations legible: a
complete palette per bundle, a tint that composes, and enough contrast in each.
"""

from __future__ import annotations

from html import escape
import re

import pytest
import yaml

from textbook import portal
from textbook import themes as themes
from textbook.book import SCHEME_TOKENS, discover_books, load_collection, repo_root
from textbook.themes import (
    APCA_MIN_CONTRAST,
    CARD_INK,
    CODE_BG_MIN_CONTRAST,
    CODE_BG_MIN_DELTA_E,
    FIGURE_MIN_CONTRAST,
    FIGURE_PANEL_INK,
    INK_LIGHTER_MIN_CONTRAST,
    MIN_CONTRAST,
    ON_ACCENT_MIN_CONTRAST,
    SCHEMES,
    SOFT_MIN_CONTRAST,
    apca_contrast,
    apca_problems,
    bundle_by_id,
    card_surface,
    cie76,
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


def _load_bundles():
    """Discover bundles, recording a broken one instead of dying at import.

    A rejected bundle should be a named test failure carrying the loader's message,
    not a collection error that hides every other test in the file.
    """
    try:
        return discover_bundles(), None
    except (ValueError, KeyError) as error:
        return [], str(error)


BUNDLES, BUNDLE_LOAD_ERROR = _load_bundles()
BOOKS = discover_books()
IDS = [bundle.id for bundle in BUNDLES]
THEMES_CSS = repo_root() / "assets" / "stylesheets" / "themes.css"


def test_every_bundle_loads():
    """The provenance gate, as a named failure rather than an import error.

    Drop a `family:` or a derived member's `note` from a real bundle and this fails
    with `load_bundle`'s message naming the file and the field.
    """
    assert BUNDLE_LOAD_ERROR is None, (
        f"a theme bundle failed to load: {BUNDLE_LOAD_ERROR}"
    )


def test_bundles_exist():
    assert len(BUNDLES) >= 2, "a theme menu needs somewhere to point"


@pytest.mark.parametrize("bundle", BUNDLES, ids=IDS)
def test_bundle_is_a_light_and_dark_pair(bundle):
    assert bundle.title
    for scheme in SCHEMES:
        assert scheme in bundle.palettes
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




def _bundle_data(theme_id: str = "editorial") -> dict:
    """A real bundle's parsed YAML, so a test breaks one field at a time."""
    path = repo_root() / "themes" / f"{theme_id}.yaml"
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def _write_bundle(tmp_path, data: dict, theme_id: str = "editorial"):
    path = tmp_path / f"{theme_id}.yaml"
    path.write_text(yaml.safe_dump(data, sort_keys=False), encoding="utf-8")
    return path


def test_a_bundle_must_name_its_family(tmp_path):
    data = _bundle_data()
    del data["family"]
    with pytest.raises(ValueError, match=r"editorial\.yaml: missing family"):
        load_bundle(_write_bundle(tmp_path, data))


def test_a_bundle_must_carry_a_provenance_block(tmp_path):
    data = _bundle_data()
    del data["provenance"]
    with pytest.raises(ValueError, match=r"editorial\.yaml: missing provenance block"):
        load_bundle(_write_bundle(tmp_path, data))


def _sourced(data: dict, scheme: str = "light", **member) -> dict:
    """Replace one member's provenance with a sourced (non-original) record.

    The bundles shipped here are all original, so this is how the sourced path is
    reached.
    """
    data["provenance"][scheme] = {
        "name": "Upstream",
        "source": "https://example.invalid/palette",
        **member,
    }
    return data


@pytest.mark.parametrize("scheme", ["light", "dark"])
def test_a_bundle_must_name_each_member(tmp_path, scheme):
    data = _bundle_data()
    del data["provenance"][scheme]["name"]
    with pytest.raises(
        ValueError, match=rf"editorial\.yaml: provenance\.{scheme}: missing name"
    ):
        load_bundle(_write_bundle(tmp_path, data))


def test_an_original_member_needs_no_source_or_observed(tmp_path):
    """Our own palette is not a derived one, so it is not held to the derived contract."""
    data = _bundle_data()
    assert data["provenance"]["light"]["original"] is True
    del data["provenance"]["light"]["source"]
    bundle = load_bundle(_write_bundle(tmp_path, data))
    member = bundle.provenance["light"]
    assert member["original"] is True
    assert member["source"] == "house"
    assert member["observed"] is None


def test_an_original_member_cannot_be_observed(tmp_path):
    data = _bundle_data()
    data["provenance"]["light"]["observed"] = True
    with pytest.raises(
        ValueError,
        match=r"editorial\.yaml: provenance\.light: an original palette is authored here, so it cannot be observed",
    ):
        load_bundle(_write_bundle(tmp_path, data))


def test_a_derived_member_must_say_what_was_derived(tmp_path):
    """`observed: false` without a `note` is the claim no one can check."""
    data = _sourced(_bundle_data(), observed=False)
    with pytest.raises(
        ValueError, match=r"editorial\.yaml: provenance\.light: derived, so it needs a note"
    ):
        load_bundle(_write_bundle(tmp_path, data))
    data = _sourced(
        _bundle_data(), observed=False, note="Derived here from the upstream hues."
    )
    bundle = load_bundle(_write_bundle(tmp_path, data))
    assert bundle.provenance["light"]["original"] is False
    assert bundle.provenance["light"]["observed"] is False


def test_a_sourced_member_needs_a_source(tmp_path):
    data = _sourced(_bundle_data(), observed=True)
    del data["provenance"]["light"]["source"]
    with pytest.raises(
        ValueError, match=r"editorial\.yaml: provenance\.light: missing source"
    ):
        load_bundle(_write_bundle(tmp_path, data))


def test_observed_is_a_boolean(tmp_path):
    data = _sourced(_bundle_data(), observed="yes")
    with pytest.raises(
        ValueError, match=r"editorial\.yaml: provenance\.light: observed must be true or false"
    ):
        load_bundle(_write_bundle(tmp_path, data))


def test_a_bundle_must_declare_a_mood(tmp_path):
    data = _bundle_data()
    del data["mood"]
    with pytest.raises(ValueError, match=r"editorial\.yaml: mood must be calm or vivid"):
        load_bundle(_write_bundle(tmp_path, data))


@pytest.mark.parametrize("bundle", BUNDLES, ids=IDS)
def test_a_bundle_exposes_its_family_and_provenance(bundle):
    """The metadata is carried on the bundle, not only validated and dropped.

    The colophon publishes it, so a field the loader checks and forgets to keep buys
    nothing.
    """
    assert bundle.family
    assert bundle.mood in ("calm", "vivid")
    for scheme in SCHEMES:
        member = bundle.provenance[scheme]
        assert member["name"] and member["source"]
        assert isinstance(member["original"], bool)
        if member["original"]:
            continue
        assert isinstance(member["observed"], bool)
        if not member["observed"]:
            assert member["note"]


def test_no_bundle_is_named_after_a_distribution():
    """`omarchy` names a catalogue, not a palette family, so it cannot be an id.

    Its gallery is single-mode palettes, and a bundle is a light-and-dark pair.
    """
    assert "omarchy" not in IDS


def test_the_default_bundle_is_declared():
    declared = str(load_collection().get("default_theme", "")).strip()
    assert declared, "collection.yaml must name a default theme"
    assert default_bundle().id == declared


def test_menu_order_is_declared_not_alphabetical():
    order = [str(theme_id) for theme_id in load_collection().get("themes", [])]
    assert order, "collection.yaml should name the menu order"
    assert [bundle.id for bundle in ordered_bundles()][: len(order)] == order




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




@pytest.mark.parametrize("bundle", BUNDLES, ids=IDS)
@pytest.mark.parametrize("book", BOOKS, ids=[b.id for b in BOOKS])
def test_every_bundle_and_subject_pair_is_readable(bundle, book):
    """Six bundles times every book, in two schemes: all of them must be legible.

    This is what lets a book state one accent per scheme rather than tuning a palette
    per bundle. It covers the figure tokens too, which are measured against the figure
    panel rather than the page.
    """
    for scheme in ("default", "slate"):
        subject = book.theme.for_scheme(
            "slate" if scheme == "slate" else "default"
        ).tokens
        problems = contrast_problems(bundle, scheme, subject)
        assert not problems, "; ".join(problems)


@pytest.mark.parametrize("bundle", BUNDLES, ids=IDS)
@pytest.mark.parametrize("scheme", ("default", "slate"))
def test_every_bundle_is_readable_with_no_subject_tint(bundle, scheme):
    """The bundle alone, with no book composed in, must be legible too.

    This is the landing page. The subject's accent *replaces* the bundle's own, so a
    bundle accent that fails can pass every composed check.
    """
    problems = contrast_problems(bundle, scheme, None)
    assert not problems, "; ".join(problems)


def test_the_contrast_check_can_actually_fail():
    """A guard on the guard: a pale accent on pale paper must be reported."""
    editorial = bundle_by_id("editorial")
    assert contrast_problems(editorial, "default", {"accent": "#f7f7f7"})
    assert not contrast_problems(editorial, "default", {"accent": "#2f6690"})
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
    """Why the thresholds differ, recorded where a change must argue with it.

    `fig-accent`, `fig-warn` and `fig-good` colour text, so they are held to the 4.5:1
    AA minimum; `fig-grid` draws axes and gridlines, a graphical object a reader needs
    but not text, so WCAG 1.4.11's 3:1 applies. All sit below ink's AAA 7:1.
    `fig-accent` is measured against the figure panel, not the paper: it is also the
    stroke of a curve, but one token cannot be two colours, and text is the stricter
    use of it.
    """
    assert FIGURE_MIN_CONTRAST == {
        "fig_accent": 4.5,
        "fig_warn": 4.5,
        "fig_good": 4.5,
        "fig_grid": 3.0,
    }
    assert FIGURE_MIN_CONTRAST["fig_grid"] < FIGURE_MIN_CONTRAST["fig_warn"]
    assert FIGURE_MIN_CONTRAST["fig_warn"] < MIN_CONTRAST["ink"]


def test_the_figure_roles_all_resolve_to_a_token():
    """A role that names no token is skipped, not reported, so it must be checked.

    `contrast_problems` looks the role up in `tokens` and `continue`s when it finds
    nothing, so a role added without an alias, or an alias no bundle declares, would
    delete the check while leaving the threshold in place.
    """
    from textbook.themes import FIGURE_TOKEN_ALIAS

    for role in FIGURE_MIN_CONTRAST:
        token = FIGURE_TOKEN_ALIAS.get(role, role)
        assert token in SCHEME_TOKENS, (
            f"figure role {role!r} resolves to {token!r}, which is not a token any "
            "bundle declares, so its threshold would never be applied"
        )


def test_the_on_accent_threshold_is_a_text_minimum():
    """`accent_ink` is text, so it is held to AA like link and accent."""
    assert ON_ACCENT_MIN_CONTRAST == {"accent_ink": 4.5}


def test_the_soft_ink_threshold_is_a_text_minimum():
    """`ink_soft` is secondary text, not a tone: it carries the landing card."""
    assert SOFT_MIN_CONTRAST == {"ink_soft": 4.5}


def test_the_ink_lighter_threshold_is_for_a_non_text_control():
    """`ink_lighter` paints `.sidebar summary::marker`, a disclosure control, so 3:1.

    WCAG 1.4.11 applies to a graphical component a reader has to operate. The
    whole-page audit never sampled it: a `::marker` has no text node.
    """
    assert INK_LIGHTER_MIN_CONTRAST == {"ink_lighter": 3.0}
    assert INK_LIGHTER_MIN_CONTRAST["ink_lighter"] < MIN_CONTRAST["ink"]


def test_the_ink_lighter_check_can_actually_fail():
    """A guard on the guard: a maker-coloured lighter ink must be reported."""
    editorial = bundle_by_id("editorial")
    assert contrast_problems(
        editorial, "light", {"ink_lighter": editorial.palette("light")["paper"]}
    )
    assert not contrast_problems(editorial, "light", None)


def test_apca_is_polarity_sensitive_and_matches_the_reference():
    """Lc is signed, and the reference anchors bracket the scale."""
    assert apca_contrast("#000000", "#ffffff") == pytest.approx(106.04, abs=0.05)
    assert apca_contrast("#ffffff", "#000000") == pytest.approx(-107.89, abs=0.05)
    # mirrors: that asymmetry is what WCAG's symmetric ratio cannot express at all.
    forward = apca_contrast("#4c4f69", "#eff1f5")
    reverse = apca_contrast("#eff1f5", "#4c4f69")
    assert forward > 0 > reverse
    assert abs(abs(forward) - abs(reverse)) > 0.5


def test_apca_measures_what_wcag_cannot():
    """A dark pair can clear a *higher* WCAG ratio and still be weaker in Lc.

    `MIN_CONTRAST` applies the same number in both schemes, which is the symmetry APCA
    exists to criticise, so the bundle check takes a second opinion.
    """
    light, dark = "#787878", "#7c7c7c"
    assert contrast(dark, "#0a0a0a") > contrast(light, "#ffffff")
    assert abs(apca_contrast(dark, "#0a0a0a")) < abs(apca_contrast(light, "#ffffff"))


def test_the_apca_thresholds_are_the_measured_levels():
    """The numbers are a choice, pinned so a change has to argue with them.

    They sit below APCA's strict body-text levels because the dark vivid members are
    measured there; the point is to catch a palette that drifts weaker.
    """
    assert APCA_MIN_CONTRAST == {"ink": 60.0, "link": 45.0, "accent": 45.0, "accent_ink": 45.0}


def test_the_apca_check_can_actually_fail():
    """A guard on the guard: an accent the colour of the paper must be caught."""
    editorial = bundle_by_id("editorial")
    assert apca_problems(editorial, "light", {"accent": "#f7f7f7"})
    assert not apca_problems(editorial, "light", None)


@pytest.mark.parametrize("bundle", BUNDLES, ids=IDS)
@pytest.mark.parametrize("scheme", ("light", "dark"))
def test_every_bundle_passes_the_apca_second_opinion(bundle, scheme):
    """Six bundles × both schemes, measured in Lc as well as WCAG.

    The thresholds are below the strict body-text levels on purpose, so lifting the
    dark vivid members would repaint those families rather than check them.
    """
    problems = apca_problems(bundle, scheme, None)
    assert not problems, "; ".join(problems)


@pytest.mark.parametrize("bundle", BUNDLES, ids=IDS)
@pytest.mark.parametrize("book", BOOKS, ids=[b.id for b in BOOKS])
def test_every_composed_pair_passes_the_apca_second_opinion(bundle, book):
    """The book's subject tint is measured too, not only the bundle's own."""
    for scheme, attr in (("light", "default"), ("dark", "slate")):
        subject = book.theme.for_scheme(attr).tokens
        problems = apca_problems(bundle, scheme, subject)
        assert not problems, "; ".join(problems)


def test_the_card_surface_matches_the_stylesheet():
    """The card `ink_soft` sits on is mirrored from `portal.css`.

    If one moves without the other, every ratio this file computes for `ink_soft` is
    measured against the wrong surface.
    """
    css = (repo_root() / "assets" / "stylesheets" / "portal.css").read_text(encoding="utf-8")
    found = {
        selector: float(share)
        for selector, share in re.findall(
            r"(?s)(:root|\[data-md-color-scheme=\"slate\"\])\s*\{[^}]*?--tb-card:\s*"
            r"color-mix\(\s*in srgb,\s*var\(--tb-ink\)\s*([\d.]+)%,\s*var\(--tb-paper\)\s*\)",
            css,
        )
    }
    assert found, (
        "portal.css no longer defines --tb-card as `color-mix(in srgb, ink N%, paper)`; "
        "update CARD_INK and card_surface() to match"
    )
    assert found.get(":root") == pytest.approx(CARD_INK["default"] * 100, abs=0.01)
    assert found.get('[data-md-color-scheme="slate"]') == pytest.approx(CARD_INK["slate"] * 100, abs=0.01)


def test_the_soft_ink_check_can_actually_fail():
    """A guard on the guard: the card surface, not the page, is the measure."""
    editorial = bundle_by_id("editorial")
    card = card_surface(editorial.palette("default"), "default")
    assert contrast_problems(editorial, "default", {"ink_soft": card})
    assert contrast_problems(editorial, "default", {"ink_soft": editorial.palette("default")["paper"]})
    assert not contrast_problems(editorial, "default", None)


@pytest.mark.parametrize("bundle", BUNDLES, ids=IDS)
@pytest.mark.parametrize("scheme", ("default", "slate"))
def test_accent_ink_reads_on_the_bundles_own_accent(bundle, scheme):
    """The label knocked out of the accent is not the paper.

    The composed check measures the book's effective accent; this measures the
    bundle's own, so the palette is safe with no subject tint and fails if
    `accent_ink` goes back to the paper.
    """
    tokens = bundle.palette(scheme)
    ratio = contrast(tokens["accent_ink"], tokens["accent"])
    assert ratio >= ON_ACCENT_MIN_CONTRAST["accent_ink"], (
        f"{bundle.id}/{scheme}: accent_ink {tokens['accent_ink']} on the accent "
        f"{tokens['accent']} is {ratio:.2f}:1"
    )


def test_the_figure_surface_matches_the_stylesheet():
    """The panel a figure is drawn on is mirrored from `extra.css`.

    If one moves without the other, every figure ratio this file computes is measured
    against the wrong surface.
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




def test_generated_stylesheet_is_in_sync():
    assert THEMES_CSS.is_file(), "themes.css has not been generated"
    assert THEMES_CSS.read_text(encoding="utf-8") == stylesheet(ordered_bundles(), default_bundle()), (
        "assets/stylesheets/themes.css is stale; run `python -m textbook.scaffold`"
    )



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


def without_python_comments(source: str) -> str:
    """The source with its comments replaced by spaces, line numbers kept."""
    import io
    import tokenize

    out: list[str] = []
    try:
        for token in tokenize.generate_tokens(io.StringIO(source).readline):
            if token.type == tokenize.COMMENT:
                out.append(" " * len(token.string))
            else:
                out.append(token.string)
    except tokenize.TokenError:
        return source
    return " ".join(out)


def colour_literals(css: str, python: bool = False) -> list[str]:
    """Every colour literal in a stylesheet or a Python file, comments ignored."""
    text = CSS_COMMENT.sub(" ", css)
    if python:
        text = without_python_comments(text)
    found = [match.group(0) for match in HEX_COLOUR.finditer(text)]
    found += [match.group(0) for match in COLOUR_FUNCTION.finditer(text)]
    found += [
        match.group(1)
        for match in NAMED_COLOUR.finditer(text)
        if match.group(1).lower() in NAMED_COLOURS
    ]
    return found


@pytest.mark.parametrize("book", BOOKS, ids=[b.id for b in BOOKS])
def test_each_book_ships_the_shared_stylesheet(book):
    """From `assets/`, through the build — not through a link in the book's tree."""
    from textbook import scaffold

    assert "assets/stylesheets/themes.css" in scaffold.SHARED_FILES
    assert THEMES_CSS.is_file(), "the generated stylesheet is missing"
    assert not (book.docs / "assets" / "stylesheets" / "themes.css").exists(), (
        f"{book.id}: themes.css is inside the book's tree; it is shared, so it "
        "belongs in assets/ and is copied by the build"
    )


def test_the_base_stylesheet_defines_no_colour():
    """Colour lives in bundles. A stray token here would win over every bundle."""
    css = (repo_root() / "assets" / "stylesheets" / "extra.css").read_text(encoding="utf-8")
    for token in SCHEME_TOKENS.values():
        assert f"{token}:" not in css, f"extra.css declares {token}; that belongs to a bundle"
    literals = colour_literals(css)
    assert not literals, (
        "extra.css declares a literal colour, which outranks every theme bundle, "
        f"so every reader gets the same one: {literals}. Use a --tb-* token, a "
        "fig-*/text-* class, or color-mix(in srgb, var(--tb-…), transparent)."
    )


def test_the_pipeline_shell_defines_no_colour():
    """The bespoke renderer is the site, so its shell is held to the same rule.

    A literal in the shell is the same bug as one in `extra.css`: it outranks every
    bundle, so every reader gets the same paint no matter which theme they chose.
    """
    root = repo_root()
    shells = (
        root / "engine" / "src" / "textbook" / "css" / "shell.css",
        root / "engine" / "src" / "textbook" / "templates" / "page.html",
        root / "engine" / "src" / "textbook" / "templates" / "portal.html",
        root / "engine" / "src" / "textbook" / "pipeline.py",
        root / "engine" / "src" / "textbook" / "portal.py",
    )
    for path in shells:
        assert path.is_file(), f"{path} is missing; did the shell move?"
        literals = colour_literals(
            path.read_text(encoding="utf-8"), python=path.suffix == ".py"
        )
        assert not literals, (
            f"{path.name} declares a literal colour ({literals}), which outranks "
            "every theme bundle. Use a --tb-* token, a fig-*/text-* class, or "
            "color-mix(in srgb, var(--tb-…), transparent)."
        )


def test_the_colour_scanner_can_actually_fail():
    """A guard on the guard: the scanner must catch each shape of literal."""
    assert colour_literals(".math-error { color: #b3261e; }")
    assert colour_literals("x { background: rgb(0 0 0 / 20%); }")
    assert colour_literals("x { background: hsl(200 50% 40%); }")
    assert colour_literals("x { color: white; }")
    assert not colour_literals("x { color: var(--tb-fig-warn); background: transparent; }")
    assert not colour_literals("x { box-shadow: 0 1px 2px color-mix(in srgb, var(--tb-ink) 20%, transparent); }")
    assert not colour_literals("x { white-space: nowrap; }")
    assert not colour_literals("# the gate stayed green\n", python=True)
    assert colour_literals('fill = "#fff"\n', python=True)
    assert colour_literals('x = "rgb(1 2 3)"\n', python=True)
    assert not colour_literals('fill = "var(--tb-ink)"  # a green box\n', python=True)


def test_the_portal_stylesheet_defines_no_colour():
    """The landing page's own stylesheet follows the bundle, not a literal hue.

    The same bug class as `extra.css`: `--tb-shadow` once carried a literal
    `rgb(0 0 0 / …)`, so the card's elevation was identical under every bundle.
    """
    css = (repo_root() / "assets" / "stylesheets" / "portal.css").read_text(encoding="utf-8")
    literals = colour_literals(css)
    assert not literals, (
        f"portal.css declares literal colour(s): {literals}. Use a --tb-* token "
        "or color-mix over one."
    )




def test_the_landing_page_offers_every_bundle():
    html = portal.render()
    assert 'id="theme-menu"' in html
    for bundle in BUNDLES:
        assert f'value="{bundle.id}"' in html
        assert escape(bundle.title) in html


def test_the_landing_page_applies_the_theme_before_paint():
    html = portal.render()
    head = html[: html.index("</head>")]
    assert "data-theme" in head
    assert "textbooks:theme" in head




def portal_rule(selector: str) -> str:
    """The declarations of one rule in `portal.css`, read as the browser sees them."""
    css = (repo_root() / "assets" / "stylesheets" / "portal.css").read_text(encoding="utf-8")
    body = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    for match in re.finditer(r"([^{}]*?)\{([^}]*)\}", body):
        if selector in (" ".join(part.split()) for part in match.group(1).split(",")):
            return match.group(2)
    raise AssertionError(f"portal.css has no rule for {selector!r}")


def test_a_card_is_a_rule_not_a_box():
    """The editorial card: flat paper, a hairline, and whitespace.

    A shadow and a tinted, rounded box made every card a raised panel. The rule
    above it and the space below the last one are the whole separation, and the
    card chooses no corner of its own: the radius belongs to the collection.
    """
    card = portal_rule(".card")
    assert "box-shadow" not in card
    assert "border-radius" not in card
    assert "background" not in card
    assert "border-top: 1px solid var(--tb-rule)" in card
    css = re.sub(
        r"/\*.*?\*/",
        "",
        (repo_root() / "assets" / "stylesheets" / "portal.css").read_text(encoding="utf-8"),
        flags=re.S,
    )
    radii = set(re.findall(r"border-radius:\s*([^;]+);", css))
    assert radii == {"var(--tb-radius)"}, f"portal.css has corners of its own: {radii}"


def test_a_card_spends_its_accent_once_on_the_kicker():
    """The mono kicker and its swatch are the card's identity. Two accents — the old
    filled pill and the old top rule — competed with the title they introduced."""
    assert "var(--card-accent-active)" in portal_rule(".card__kicker")
    assert "var(--card-accent-active)" in portal_rule(".card__swatch")
    assert "var(--card-accent-active)" not in portal_rule(".card")


def test_a_profile_is_a_link_and_the_kicker_leads_the_title():
    """An edition is a destination, so it is an underlined link, not a chip. The
    filing label sits above the title it files."""
    html = portal.render()
    assert 'class="chip' not in html
    assert 'class="card__profile' in html
    assert 'aria-label="Editions"' in html
    assert html.index('class="card__subject"') < html.index('class="card__title"')


def test_the_landing_page_shares_the_books_stylesheet():
    """One bundle stylesheet, so the front door cannot drift from the books."""
    portal.main()
    relative = portal.root_assets()["assets/stylesheets/themes.css"]
    target = repo_root() / "site" / relative
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
    assert "textbooks:theme" in html


def test_the_bundles_are_valid_yaml_with_one_file_each():
    for bundle in BUNDLES:
        assert bundle.source and bundle.source.suffix == ".yaml"
        assert yaml.safe_load(bundle.source.read_text(encoding="utf-8"))["id"] == bundle.id




def figure_control_rules() -> dict[str, str]:
    """Every rule whose selector mentions a figure, keyed per selector.

    A grouped rule is split and each selector keyed separately, so a lookup matches
    what the stylesheet really says.
    """
    css = (repo_root() / "assets" / "stylesheets" / "extra.css").read_text(encoding="utf-8")
    body = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    out = {}
    for match in re.finditer(r"([^{}]*?)\{([^}]*)\}", body):
        for one in match.group(1).split(","):
            selector = " ".join(one.split())
            if "maths-figure" in selector:
                out[selector] = match.group(2)
    return out


def test_a_figures_form_controls_are_painted_from_tokens():
    """Every control a figure can contain must follow the reader's theme.

    Left to the platform, the text and the background are chosen by two different
    authorities, and on some combinations that is black on black.
    """
    rules = figure_control_rules()
    joined = "\n".join(f"{sel} {{ {decl} }}" for sel, decl in rules.items())

    for what, needle in [
        ("a select", "maths-figure select"),
        ("an option", "maths-figure option"),
        ("a button", "maths-figure button"),
        ("a range input", 'maths-figure input[type="range"]'),
        ("a checkbox", 'maths-figure input[type="checkbox"]'),
    ]:
        assert needle in joined, (
            f"{what} inside a figure has no rule in extra.css, so it takes the "
            "platform's colours while the text around it takes ours"
        )

    for needle in ("maths-figure select", "maths-figure option"):
        block = rules[needle]
        assert re.search(r"(?<![\w-])color\s*:\s*var\(--tb-", block), (
            f"{needle} does not set its text colour from a token, so the platform "
            "chooses it — which is how a dropdown list becomes black on dark"
        )
        assert re.search(r"(?<![\w-])background-color\s*:\s*var\(--tb-", block), (
            f"{needle} does not set its background from a token"
        )


def test_the_figure_control_check_can_actually_fail():
    """A guard on the guard: the scanner must see a selector and its block."""
    css = "maths-figure select { color: var(--tb-ink); background-color: var(--tb-paper); }"
    body = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    match = re.search(r"([^{}]*?)\{([^}]*)\}", body)
    assert match and "maths-figure select" in " ".join(match.group(1).split())
    assert not re.search(r"(?<![\w-])color\s*:\s*var\(--tb-", "color: black;")


def test_the_house_accent_matches_the_book_it_stands_in_for():
    """The engine's one colour is a fallback, and it must not quietly drift.

    A book with no tint of its own takes `HOUSE_ACCENT`, which is the first book's
    palette copied across; this test makes the duplicate deliberate rather than a
    coincidence somebody edits one half of.
    """
    from textbook.book import HOUSE_ACCENT, HOUSE_ACCENT_DARK_SCHEME, book_by_id

    source = book_by_id("gcse-maths").theme
    assert HOUSE_ACCENT == source.for_scheme("default").accent
    assert HOUSE_ACCENT_DARK_SCHEME == source.for_scheme("slate").accent


def test_the_engine_names_no_other_colour():
    """Every colour the engine mentions outside its palettes is accounted for."""
    from textbook import book as book_module

    named = {
        name: value
        for name, value in vars(book_module).items()
        if name.startswith("HOUSE_ACCENT") and isinstance(value, str)
    }
    assert set(named) == {"HOUSE_ACCENT", "HOUSE_ACCENT_DARK_SCHEME"}, (
        f"the engine names more accents than the fallback: {sorted(named)}"
    )




def test_every_declared_threshold_is_applied():
    """The table and the dicts cannot disagree.

    A threshold that is declared and never measured reads exactly like one that is
    measured and satisfied.
    """
    declared = (
        set(MIN_CONTRAST)
        | set(ON_ACCENT_MIN_CONTRAST)
        | set(FIGURE_MIN_CONTRAST)
        | set(SOFT_MIN_CONTRAST)
        | set(INK_LIGHTER_MIN_CONTRAST)
        | set(CODE_BG_MIN_CONTRAST)
    )
    applied = {
        role
        for _surface, thresholds, _alias, _wording, _tail in themes.CONTRAST_RULES
        for role in thresholds
    }
    assert applied == declared, (
        "declared and never measured: "
        + ", ".join(sorted(declared - applied))
        + "; measured and never declared: "
        + ", ".join(sorted(applied - declared))
    )


@pytest.mark.parametrize("bundle", ordered_bundles(), ids=lambda b: b.id)
def test_each_contrast_rule_can_actually_fail(monkeypatch, bundle):
    """Every row reports a failure when its token matches its surface.

    A rule whose lookup finds nothing `continue`s, so it can look right and never be
    able to fail.
    """
    for surface, thresholds, alias, _wording, _tail in themes.CONTRAST_RULES:
        for role in thresholds:
            token = alias.get(role, role)
            tokens = dict(bundle.palette("default"))
            measured = {
                "paper": tokens["paper"],
                "accent": tokens["accent"],
                "figure": figure_panel(tokens),
                "card": card_surface(tokens, "default"),
                "code_bg": tokens["code_bg"],
            }[surface]
            tokens[token] = measured
            monkeypatch.setattr(themes, "effective_tokens", lambda *a, **k: tokens)
            problems = themes.contrast_problems(bundle, "default", None)
            assert any(role in problem for problem in problems), (
                f"{role} on the {surface} cannot fail: setting {token} to the surface "
                "reported nothing, so the row's lookup found nothing and `continue`d"
            )


@pytest.mark.parametrize("bundle", ordered_bundles(), ids=lambda b: b.id)
def test_every_threshold_resolves_to_a_token_the_bundle_has(bundle):
    """A row whose lookup finds nothing `continue`s — a check that cannot fail.

    `fig_accent` is not a bundle token but an alias, which is why the figure row carries
    one. The test above cannot catch this, because it puts the token into the palette
    itself.
    """
    for surface, thresholds, alias, _wording, _tail in themes.CONTRAST_RULES:
        for role in thresholds:
            token = alias.get(role, role)
            for scheme in SCHEMES:
                assert token in bundle.palette(scheme), (
                    f"{role} on the {surface} resolves to {token!r}, which "
                    f"{bundle.id}/{scheme} does not define, so the row would skip it"
                )


def test_the_booklet_badges_use_the_token_their_name_promises():
    """A badge's word and its colour have to agree, and nothing read them before.

    `.bk-badge--muted` was painted with `fig-warn` and `.bk-badge--warn` with
    `fig-good`, while a toneless badge defaults to `muted`, so the default badge wore
    the warning hue and the warn badge the good one.
    """
    css = (repo_root() / "assets" / "stylesheets" / "extra.css").read_text(encoding="utf-8")
    rules = {
        match.group(1): match.group(2)
        for match in re.finditer(r"\.bk-badge--([a-z]+)\s*\{([^}]*)\}", css)
    }
    assert {"muted", "warn"} <= set(rules), f"badge variants found: {sorted(rules)}"
    muted = rules["muted"]
    warn = rules["warn"]
    assert "var(--tb-ink)" in muted and "fig-warn" not in muted and "fig-good" not in muted, (
        "a muted badge must be neutral: it is the default a toneless badge takes, so "
        f"painting it with a status token says something the booklet did not. Found: {muted.strip()!r}"
    )
    assert "var(--tb-fig-warn)" in warn, (
        "the warn badge must take the warning token, or the badge and its word disagree. "
        f"Found: {warn.strip()!r}"
    )


def test_code_bg_thresholds_hold_both_surface_and_text():
    """`code_bg` must separate from `paper` and carry body `ink` at AAA."""
    assert CODE_BG_MIN_CONTRAST == {"ink": 7.0}
    assert CODE_BG_MIN_DELTA_E == 3.0


@pytest.mark.parametrize("bundle", BUNDLES, ids=IDS)
@pytest.mark.parametrize("scheme", ("light", "dark"))
def test_every_bundle_code_bg_reads_as_a_second_surface(bundle, scheme):
    """A code block must read as a panel rather than blending into the page.

    Measured before this guard existed: two dark bundles sat under ΔE 2 from paper.
    """
    palette = bundle.palette(scheme)
    distance = cie76(palette["paper"], palette["code_bg"])
    assert distance >= CODE_BG_MIN_DELTA_E, (
        f"{bundle.id}/{scheme}: code_bg {palette['code_bg']} is only ΔE {distance:.2f} "
        f"from paper {palette['paper']} (needs ≥ {CODE_BG_MIN_DELTA_E:g})"
    )
    ratio = contrast(palette["ink"], palette["code_bg"])
    assert ratio >= CODE_BG_MIN_CONTRAST["ink"], (
        f"{bundle.id}/{scheme}: ink {palette['ink']} on code_bg {palette['code_bg']} "
        f"is {ratio:.2f}:1 (needs ≥ {CODE_BG_MIN_CONTRAST['ink']:g}:1)"
    )


def test_the_code_bg_check_can_actually_fail():
    """Guard the guard: identical surfaces have ΔE 0, and ink-on-ink fails contrast."""
    editorial = bundle_by_id("editorial")
    paper = editorial.palette("dark")["paper"]
    assert cie76(paper, paper) == 0.0
    assert contrast_problems(editorial, "dark", {"code_bg": editorial.palette("dark")["ink"]})
