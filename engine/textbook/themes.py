"""Theme bundles: the collection's core themes, and the subject's tint on top.

A **bundle** is a complete light and dark palette plus its typography. It is
chosen by the reader and applies to every book, so moving between subjects never
moves the theme — which is the point of separating the two.

A **book** contributes only its subject identity: accent, and any surface it
wants moved. It does so as ``--tb-book-<token>`` values, and each bundle composes
them in::

    --tb-accent: var(--tb-book-accent, #89b4fa)

So the bundle keeps control of the design, the subject keeps its identity, and a
bundle can refuse the tint entirely by listing the token under ``fixed:``.

Everything resolves in CSS: no rebuild is needed to add a bundle, and the reader's
choice is applied before the first paint by ``hooks/prefs.py``.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from functools import lru_cache
from pathlib import Path

import yaml

from .book import SCHEME_TOKENS, repo_root

THEMES_DIR = "themes"
SCHEMES = ("light", "dark")
# The attribute values Material uses, which is what the built pages carry.
SCHEME_ATTR = {"light": "default", "dark": "slate"}

FONT_TOKENS = {
    "body": "--tb-font-body",
    "display": "--tb-font-display",
    "mono": "--tb-font-mono",
}

# Minimum WCAG contrast ratios. Ink is body text, so it is held to AAA; a link is
# text too, so AA; the accent carries white text on the header and draws figure
# strokes, so it is held to AA as well rather than the 3:1 a graphic would allow.
MIN_CONTRAST = {"ink": 7.0, "link": 4.5, "accent": 4.5}

# `accent_ink` is not drawn on the paper like the roles above; it is text drawn
# *on* the accent surface (the booklet bar's label). Measuring it against the
# paper would be the wrong surface, and using the paper as the ink is what made
# the label fail on two stock palettes. So it is checked against `accent`.
ON_ACCENT_MIN_CONTRAST = {"accent_ink": 4.5}

# Figure tokens are drawn on the maths-figure panel, not the page, so they get
# their own surface and their own thresholds.
#
# * `fig-warn` and `fig-good` colour text as well as marks: `.text-warn` and
#   `.text-good` are applied to SVG labels and live readouts, and the labels are
#   small, so they are held to the 4.5:1 WCAG AA minimum for normal text.
# * `fig-grid` draws axes and gridlines. An axis is a graphical object a reader
#   needs in order to read the figure, but it is not text, so WCAG 1.4.11's
#   3:1 for non-text content is the right bar rather than 4.5:1. This matches the
#   comment above: a figure stroke is a graphic, and 3:1 is what a graphic needs.
FIGURE_MIN_CONTRAST = {"fig_warn": 4.5, "fig_good": 4.5, "fig_grid": 3.0}

# The maths-figure panel is `color-mix(in srgb, paper 92%, ink 8%)` in
# assets/stylesheets/extra.css. A token drawn inside a figure sits on that mix,
# not on the page behind it; the mix is always closer to mid-grey than the paper,
# so measuring against the panel is the stricter check. The share is mirrored
# here and pinned to the stylesheet by test_the_figure_surface_matches_the_stylesheet.
FIGURE_PANEL_INK = 0.08


@dataclass(frozen=True)
class Bundle:
    id: str
    title: str
    description: str
    palettes: dict[str, dict[str, str]]
    typography: dict[str, str] = field(default_factory=dict)
    # Tokens the bundle keeps for itself, refusing the subject tint.
    fixed: frozenset[str] = frozenset()
    source: Path | None = None

    def palette(self, scheme: str) -> dict[str, str]:
        """The palette for a scheme, named either ``light``/``dark`` or by the
        attribute value Material uses, ``default``/``slate``."""
        normalised = {value: key for key, value in SCHEME_ATTR.items()}.get(scheme, scheme)
        return self.palettes[normalised]


def _palette(scheme: str, data: dict | None, where: str) -> dict[str, str]:
    data = data or {}
    missing = [key for key in SCHEME_TOKENS if key not in data]
    if missing:
        raise ValueError(f"{where}.{scheme}: missing {', '.join(missing)}")
    unknown = [key for key in data if key not in SCHEME_TOKENS]
    if unknown:
        raise ValueError(
            f"{where}.{scheme}: unknown token(s) {', '.join(unknown)}; "
            f"choose from {', '.join(sorted(SCHEME_TOKENS))}"
        )
    return {key: str(data[key]) for key in SCHEME_TOKENS}


def load_bundle(path: Path) -> Bundle:
    data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    where = path.name
    bundle = Bundle(
        id=data["id"],
        title=data.get("title", data["id"]),
        description=" ".join(str(data.get("description", "")).split()),
        palettes={
            "light": _palette("light", data.get("light"), where),
            "dark": _palette("dark", data.get("dark"), where),
        },
        typography={
            key: str(value)
            for key, value in (data.get("typography") or {}).items()
            if key in FONT_TOKENS
        },
        fixed=frozenset(data.get("fixed", ())),
        source=path,
    )
    unknown_fixed = set(bundle.fixed) - set(SCHEME_TOKENS)
    if unknown_fixed:
        raise ValueError(f"{where}: fixed names unknown tokens: {sorted(unknown_fixed)}")
    return bundle


@lru_cache(maxsize=None)
def _bundles(root: str) -> tuple[Bundle, ...]:
    directory = Path(root) / THEMES_DIR
    found = sorted(directory.glob("*.yaml"))
    if not found:
        raise FileNotFoundError(f"no theme bundles under {directory}")
    return tuple(load_bundle(path) for path in found)


def discover_bundles(root: Path | None = None) -> list[Bundle]:
    return list(_bundles(str(root or repo_root())))


def ordered_bundles(root: Path | None = None) -> list[Bundle]:
    """Bundles in the order the collection presents them.

    collection.yaml names the order, because the menu is a reading choice and
    alphabetical order would put a palette nobody chose first. Anything not
    listed follows, alphabetically.
    """
    from .book import load_collection

    by_id = {bundle.id: bundle for bundle in discover_bundles(root)}
    order = [str(theme_id) for theme_id in load_collection(root).get("themes", ())]
    listed = [by_id.pop(theme_id) for theme_id in order if theme_id in by_id]
    return listed + [by_id[key] for key in sorted(by_id)]


def bundle_by_id(theme_id: str, root: Path | None = None) -> Bundle:
    for bundle in discover_bundles(root):
        if bundle.id == theme_id:
            return bundle
    raise KeyError(f"no theme bundle '{theme_id}' under {THEMES_DIR}/")


def default_bundle(root: Path | None = None) -> Bundle:
    from .book import load_collection

    wanted = str(load_collection(root).get("default_theme", "")).strip()
    if wanted:
        return bundle_by_id(wanted, root)
    return discover_bundles(root)[0]


# --- colour maths, for the contrast invariant ---------------------------------


def _component(value: str) -> tuple[int, int, int]:
    text = value.strip().lstrip("#")
    if len(text) == 3:
        text = "".join(character * 2 for character in text)
    if len(text) != 6:
        raise ValueError(f"not a hex colour: {value!r}")
    return tuple(int(text[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def relative_luminance(value: str) -> float:
    channels = []
    for raw in _component(value):
        channel = raw / 255
        channels.append(channel / 12.92 if channel <= 0.04045 else ((channel + 0.055) / 1.055) ** 2.4)
    red, green, blue = channels
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue


def contrast(foreground: str, background: str) -> float:
    """WCAG contrast ratio, 1.0 to 21.0."""
    a, b = relative_luminance(foreground), relative_luminance(background)
    lighter, darker = max(a, b), min(a, b)
    return (lighter + 0.05) / (darker + 0.05)


def effective_tokens(bundle: Bundle, scheme: str, subject: dict[str, str] | None) -> dict[str, str]:
    """The tokens a reader actually sees: the bundle, with the subject composed in."""
    palette = bundle.palette(scheme)
    if not subject:
        return palette
    return {
        key: value
        if key in bundle.fixed or key not in subject
        else subject[key]
        for key, value in palette.items()
    }


def _mix(overlay: str, base: str, share: float) -> str:
    """``share`` of ``overlay`` over ``base``, as CSS ``color-mix(in srgb, ...)``
    interpolates: on the gamma-encoded channels, both opaque."""
    under, over = _component(base), _component(overlay)
    return "#%02x%02x%02x" % tuple(
        round(under[i] * (1 - share) + over[i] * share) for i in range(3)
    )


def figure_panel(tokens: dict[str, str]) -> str:
    """The surface a figure is drawn on: the maths-figure panel, not the page."""
    return _mix(tokens["ink"], tokens["paper"], FIGURE_PANEL_INK)


def contrast_problems(bundle: Bundle, scheme: str, subject: dict[str, str] | None) -> list[str]:
    tokens = effective_tokens(bundle, scheme, subject)
    problems = []
    for role, minimum in MIN_CONTRAST.items():
        colour = tokens.get(role)
        if not colour:
            continue
        ratio = contrast(colour, tokens["paper"])
        if ratio < minimum:
            problems.append(
                f"{bundle.id}/{scheme}: {role} {colour} on paper {tokens['paper']} "
                f"is {ratio:.2f}:1, below {minimum}:1"
            )
    for role, minimum in ON_ACCENT_MIN_CONTRAST.items():
        colour = tokens.get(role)
        if not colour:
            continue
        ratio = contrast(colour, tokens["accent"])
        if ratio < minimum:
            problems.append(
                f"{bundle.id}/{scheme}: {role} {colour} on the accent "
                f"{tokens['accent']} is {ratio:.2f}:1, below {minimum}:1"
            )
    panel = figure_panel(tokens)
    for role, minimum in FIGURE_MIN_CONTRAST.items():
        colour = tokens.get(role)
        if not colour:
            continue
        ratio = contrast(colour, panel)
        if ratio < minimum:
            problems.append(
                f"{bundle.id}/{scheme}: {role} {colour} on the figure panel {panel} "
                f"is {ratio:.2f}:1, below {minimum}:1"
            )
    return problems


# --- generated CSS ------------------------------------------------------------


def _passthrough(bundle: Bundle, key: str, value: str) -> str:
    """One token declaration, letting the subject through unless refused."""
    variable = SCHEME_TOKENS[key]
    if key in bundle.fixed:
        return f"  {variable}: {value};"
    return f"  {variable}: var(--tb-book-{key.replace('_', '-')}, {value});"


def bundle_css(bundle: Bundle, indent: str = "") -> str:
    blocks = []
    for scheme in SCHEMES:
        attr = SCHEME_ATTR[scheme]
        selector = f"html[data-theme=\"{bundle.id}\"] body[data-md-color-scheme=\"{attr}\"]"
        lines = [f"{indent}{selector} {{"]
        lines += [indent + _passthrough(bundle, key, value) for key, value in bundle.palette(attr).items()]
        lines.append(f"{indent}}}")
        blocks.append("\n".join(lines))
    return "\n\n".join(blocks)


def typography_css(bundle: Bundle) -> str:
    if not bundle.typography:
        return ""
    lines = [f'html[data-theme="{bundle.id}"] {{']
    lines += [f"  {FONT_TOKENS[key]}: {value};" for key, value in bundle.typography.items()]
    lines.append("}")
    return "\n".join(lines)


def stylesheet(bundles: list[Bundle] | None = None, default: Bundle | None = None) -> str:
    """The whole generated themes.css.

    Three layers, in increasing specificity:

    1. typography, per bundle;
    2. a fallback with the default bundle, matching whether or not a theme was
       chosen — so a reader without JavaScript still gets a real theme;
    3. one block per bundle and scheme, which wins over the fallback.
    """
    chosen = bundles if bundles is not None else discover_bundles()
    fallback = default or default_bundle()

    out = [
        "/* GENERATED by `python -m textbook.scaffold` from themes/*.yaml.",
        " * Do not edit: change a bundle in themes/, or a book's subject tint in",
        " * books/<id>/book.yaml, and re-run the scaffold.",
        " *",
        " * Bundles apply to every book and are chosen by the reader, so a subject",
        " * never changes the theme. A book contributes --tb-book-* values, which a",
        " * bundle composes in unless it lists the token under `fixed:`.",
        " * See SHAPE.md, \"Theme bundles\".",
        " */",
        "",
    ]

    out.append("/* 1. Typography, per bundle. */")
    for bundle in chosen:
        css = typography_css(bundle)
        if css:
            out.append(css)
    out.append("")

    out.append("/* 2. Fallback: the default bundle, applied whether or not a theme is set. */")
    for scheme in SCHEMES:
        attr = SCHEME_ATTR[scheme]
        out.append(f'body[data-md-color-scheme="{attr}"] {{')
        out += [
            _passthrough(fallback, key, value) for key, value in fallback.palette(attr).items()
        ]
        out.append("}")
    out.append("")

    out.append("/* 3. Bundles, which win over the fallback. */")
    for bundle in chosen:
        out.append(f"/* {bundle.title} */")
        out.append(bundle_css(bundle))
        out.append("")

    return "\n".join(out)
