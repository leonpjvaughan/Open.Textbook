"""Theme bundles: the collection's core themes, and the subject tint on top.

A bundle and a book multiply: four bundles times every book, in two schemes each.
These tests are what keeps that combinable — a complete palette per bundle, a
subject tint that composes rather than competes, and enough contrast to read in
every combination.
"""

from __future__ import annotations

import pytest
import yaml

from textbook import portal
from textbook.book import SCHEME_TOKENS, discover_books, load_collection, repo_root
from textbook.themes import (
    MIN_CONTRAST,
    SCHEMES,
    bundle_by_id,
    contrast,
    contrast_problems,
    default_bundle,
    discover_bundles,
    effective_tokens,
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
    rather than tuning a palette per bundle.
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
