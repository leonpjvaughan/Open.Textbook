"""Theme bundles: the collection's core themes, and the subject tint on top.

A bundle and a book multiply: six bundles times every book, in two schemes each.
These tests are what keeps that combinable — a complete palette per bundle, a
subject tint that composes rather than competes, and enough contrast to read in
every combination.
"""

from __future__ import annotations

from html import escape
import re

import pytest
import yaml

from textbook import portal
from textbook.book import SCHEME_TOKENS, discover_books, load_collection, repo_root
from textbook.themes import (
    APCA_MIN_CONTRAST,
    CARD_INK,
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

    `load_bundle` is the provenance gate. When it rejects a real bundle, that
    should be a named test failure carrying the loader's message — not a
    collection error that hides every other test in the file. The suite still
    goes red; `test_every_bundle_loads` is simply louder about why.
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

    Drop a `family:`, a provenance field, or a derived member's `note` from a
    real `themes/*.yaml` and this fails with `load_bundle`'s message naming the
    file and the field.
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


# --- provenance: a claim someone else can check -------------------------------
#
# A bundle is a group: one palette family, a light member and a dark member, and
# a recorded origin for each. There are three honest states, and `load_bundle`
# refuses a member that does not declare one:
#
#   * `original: true` — authored here, with no upstream;
#   * `observed: true` — the hexes were read from `source`;
#   * `observed: false` — derived here from `source`'s hues, which needs a `note`.
#
# The `original` flag exists because `observed: false` alone used to stand for both
# "ours" and "derived from someone else's mode", which is the conflation it fixes.
# A claim that can quietly vanish is a claim nobody can check, so a missing field
# is an error rather than a default.


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

    The bundles shipped here are all original, so the observed/derived
    enforcement is exercised on a synthetic sourced member rather than on a real
    one — which is also how the tests for the old `observed` flag worked.
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
    """The whole point of the flag: our own palette is not a derived one.

    An original member must not be forced through the derived-member contract —
    `observed: false` plus a `note` — which is what used to conflate "authored
    here" with "derived from someone else's mode".
    """
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
    # With a note it loads, keeps the claim, and is not marked original.
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

    The colophon (todo item 11) is the reader of this, and a sourced member's
    `note` is the prose it publishes. A field the loader checks but forgets to
    keep is a check that buys nothing.
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

    Omarchy's gallery is 140 links and its stock install is 22 single-mode
    `colors.toml` files — 17 dark-only, 5 light-only — so it can supply at most
    one member of a pair, and a bundle is two. The bundle it once named was a
    Catppuccin group (Latte + Mocha); both are gone now (see DECISIONS.md), and
    this test keeps the naming mistake from returning. See
    research/design/theme-groups.md.
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
    """Six bundles times every book, in two schemes: all of them must be legible.

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


@pytest.mark.parametrize("bundle", BUNDLES, ids=IDS)
@pytest.mark.parametrize("scheme", ("default", "slate"))
def test_every_bundle_is_readable_with_no_subject_tint(bundle, scheme):
    """The bundle alone, with no book composed in, must be legible too.

    This is the landing page, and any page of a book that states no tint. It is
    a different measurement from the composed one above: the subject's accent
    *replaces* the bundle's own wherever a book provides one, so a bundle accent
    that fails can pass every composed check. The stock bundles this set replaced
    (gruvbox light 4.40:1, catppuccin light 4.34:1) did exactly that until this
    test existed — the same defect class as item 17's `accent_ink`.
    """
    problems = contrast_problems(bundle, scheme, None)
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
    """Why the thresholds differ, recorded where a change must argue with it.

    `fig-accent`, `fig-warn` and `fig-good` colour text (`.text-accent`,
    `.text-warn`, `.text-good`, and SVG labels), so they are held to the 4.5:1
    WCAG AA minimum for normal text. `fig-grid` draws axes and gridlines: a
    graphical object a reader needs, but not text, so WCAG 1.4.11's 3:1 applies.
    All are below ink's AAA 7:1, which is body text on plain paper.

    `fig-accent` was missing until the figure audit measured every module in a
    browser (`scripts/audit-figures.cjs`). It was checked as `accent` against the
    *paper*, which it clears everywhere, and never against the figure panel —
    where twelve book-and-bundle pairs sat between 3.90:1 and 4.43:1. The accent
    is also the stroke of a curve, and 3:1 would be right for that; but one token
    cannot be two colours, and text is the stricter use of it.
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

    `fig_accent` is the one role that is not a bundle token: `extra.css` defines
    `--tb-fig-accent` as `var(--tb-accent)`. `contrast_problems` looks the role up
    in `tokens` and `continue`s when it finds nothing — so a role added to the
    dict without an alias, or an alias naming a token no bundle declares, would
    delete the check while leaving the threshold in place. That is the failure
    mode this file exists to prevent, so it is asserted directly.
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
    """`ink_lighter` paints `.sidebar summary::marker`, a disclosure control.

    WCAG 1.4.11's 3:1 applies to a graphical component a reader has to operate,
    not the 4.5:1 that text needs. The whole-page audit never sampled it: a
    `::marker` is a pseudo-element with no text node, which is the gap the
    threshold closes. No bundle relied on the old, lower value for anything but
    this marker, so the token was raised rather than duplicated.
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
    # Swapping foreground and background flips the sign, and the two magnitudes
    # are deliberately not mirrors: that asymmetry is what WCAG's symmetric
    # ratio cannot express at all.
    forward = apca_contrast("#4c4f69", "#eff1f5")
    reverse = apca_contrast("#eff1f5", "#4c4f69")
    assert forward > 0 > reverse
    assert abs(abs(forward) - abs(reverse)) > 0.5


def test_apca_measures_what_wcag_cannot():
    """A dark pair can clear a *higher* WCAG ratio and still be weaker in Lc.

    This is F3 of research/design/theme-groups.md: `MIN_CONTRAST` applies the
    same number in both schemes, which is the symmetry APCA exists to criticise.
    The synthetic pair below is the example — dark #7c7c7c on #0a0a0a clears a
    higher WCAG ratio than light #787878 on #ffffff, and scores less than half
    the Lc. It switched the bundle check to a second opinion; the original
    finding was Kanagawa's dark accent.
    """
    light, dark = "#787878", "#7c7c7c"
    assert contrast(dark, "#0a0a0a") > contrast(light, "#ffffff")
    assert abs(apca_contrast(dark, "#0a0a0a")) < abs(apca_contrast(light, "#ffffff"))


def test_the_apca_thresholds_are_the_measured_levels():
    """The numbers are a choice, pinned so a change has to argue with them.

    They sit below APCA's strict body-text levels because the dark vivid members
    measured there and redrawing them would repaint the families; the point is to
    catch a palette that drifts weaker, not to fail the ones that exist.
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

    The thresholds are below the strict body-text levels on purpose: the dark
    vivid members sit at the floor of the measured distribution, and lifting
    them to Lc 75/60 would repaint those families rather than check them. The
    distribution is recorded in the comment above APCA_MIN_CONTRAST in
    themes.py, where the threshold is chosen from it.
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

    If one moves without the other every ratio this file computes for
    `ink_soft` is measured against the wrong surface — the same trap the figure
    panel test guards against.
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

    A bundle's own paper can sit below 4.5:1 on its own accent — the stock set
    this replaced had a light member at 4.40:1 and another at 4.34:1 — which is
    the defect this token fixes. The composed check in `contrast_problems`
    measures the book's effective accent; this measures the bundle's own, so the
    palette is safe even with no subject tint, and it fails if `accent_ink` goes
    back to the paper.
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


def test_the_pipeline_shell_defines_no_colour():
    """The bespoke renderer is the site, so its shell is held to the same rule.

    A literal in the shell is the same bug as one in `extra.css`: it outranks
    every bundle, so every reader gets the same paint no matter which theme they
    chose. The pipeline's 404 was the last one — it shipped the editorial palette's
    hexes inline, so a reader on Catppuccin got Catppuccin inside the book and
    editorial on a missing page.
    """
    root = repo_root()
    shells = (
        root / "engine" / "textbook" / "css" / "shell.css",
        root / "engine" / "textbook" / "templates" / "page.html",
        root / "engine" / "textbook" / "templates" / "portal.html",
        root / "engine" / "textbook" / "pipeline.py",
        root / "engine" / "textbook" / "portal.py",
    )
    for path in shells:
        assert path.is_file(), f"{path} is missing; did the shell move?"
        literals = colour_literals(path.read_text(encoding="utf-8"))
        assert not literals, (
            f"{path.name} declares a literal colour ({literals}), which outranks "
            "every theme bundle. Use a --tb-* token, a fig-*/text-* class, or "
            "color-mix(in srgb, var(--tb-…), transparent)."
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
        # The title goes through `html.escape`, so compare the escaped form: a
        # palette name with an apostrophe (Synthwave '84) is escaped in the page.
        assert escape(bundle.title) in html


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
