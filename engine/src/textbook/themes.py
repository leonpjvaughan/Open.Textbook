"""Theme bundles: the collection's core themes, and the subject's tint on top.

A **bundle** is a complete light and dark palette plus its typography, chosen by
the reader and applied to every book, so moving between subjects never moves the
theme.

A **book** contributes only its subject identity, as ``--tb-book-<token>`` values
that each bundle composes in::

    --tb-accent: var(--tb-book-accent, #6ea8d8)

So the bundle keeps the design and the subject keeps its identity, and a bundle can
refuse the tint by listing the token under ``fixed:``. Everything resolves in CSS:
no rebuild adds a bundle, and ``hooks/prefs.py`` applies the choice before first
paint.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from functools import lru_cache
from pathlib import Path

import yaml

from . import yamlio

from .book import SCHEME_TOKENS, repo_root

THEMES_DIR = "themes"
SCHEMES = ("light", "dark")
SCHEME_ATTR = {"light": "default", "dark": "slate"}

CASCADE_LAYERS = ("palette", "base", "shell", "layout", "book", "chrome")

FONT_TOKENS = {
    "body": "--tb-font-body",
    "display": "--tb-font-display",
    "mono": "--tb-font-mono",
}

DEFAULT_FONTS = {
    "body": 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    "display": '"Iowan Old Style", Charter, Georgia, "Times New Roman", serif',
    "mono": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
}

# Minimum WCAG contrast ratios: ink is body text, so AAA; a link is text, so AA; the
MIN_CONTRAST = {"ink": 7.0, "link": 4.5, "accent": 4.5}

# measured against `accent`, not the paper.
ON_ACCENT_MIN_CONTRAST = {"accent_ink": 4.5}

# `fig-warn`, `fig-good` and `fig-accent` colour SVG `text-*` labels as well as marks, so
# gridlines: a graphic rather than text, so WCAG 1.4.11's 3:1 is the bar. One token
FIGURE_MIN_CONTRAST = {"fig_accent": 4.5, "fig_warn": 4.5, "fig_good": 4.5, "fig_grid": 3.0}

FIGURE_TOKEN_ALIAS = {"fig_accent": "accent"}

# It was 8% until the margin was measured: at 8% the accent cleared the 4.5:1 text floor
FIGURE_PANEL_INK = 0.04

CARD_INK = {"default": 0.04, "slate": 0.07}

SOFT_MIN_CONTRAST = {"ink_soft": 4.5}

# WCAG 1.4.11's 3:1 applies rather than 4.5:1. Measured on the page, since `.sidebar`
INK_LIGHTER_MIN_CONTRAST = {"ink_lighter": 3.0}

CODE_BG_MIN_CONTRAST = {"ink": 7.0}
CODE_BG_MIN_DELTA_E = 3.0

#: The surface each set of thresholds is measured against, and the thresholds
CONTRAST_RULES = (
    ("paper", MIN_CONTRAST, {}, "on paper", ""),
    ("accent", ON_ACCENT_MIN_CONTRAST, {}, "on the accent", ""),
    ("figure", FIGURE_MIN_CONTRAST, FIGURE_TOKEN_ALIAS, "on the figure panel", ""),
    ("card", SOFT_MIN_CONTRAST, {}, "on the card", ""),
    ("paper", INK_LIGHTER_MIN_CONTRAST, {}, "on paper", " for a non-text control"),
    ("code_bg", CODE_BG_MIN_CONTRAST, {}, "on code_bg", ""),
)

# WCAG 2.x computes a ratio from relative luminance and applies the same number in both
# It is a *second opinion*, not the compliance bar: WCAG stays the minimum every bundle
APCA_MIN_CONTRAST = {"ink": 60.0, "link": 45.0, "accent": 45.0, "accent_ink": 45.0}

# The pairs APCA is measured over: each role against the surface it is drawn on.
APCA_PAIRS = (("ink", "paper"), ("link", "paper"), ("accent", "paper"), ("accent_ink", "accent"))


@dataclass(frozen=True)
class Bundle:
    id: str
    title: str
    description: str
    palettes: dict[str, dict[str, str]]
    family: str = ""
    mood: str = "calm"
    provenance: dict[str, dict] = field(default_factory=dict)
    typography: dict[str, str] = field(default_factory=dict)
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


def _variation(scheme: str, data: dict | None, where: str) -> dict:
    """One member's provenance, required and complete.

    A provenance is a claim a reader or maintainer can check: where the palette came
    from, and in what sense it is ours. The three states are mutually exclusive:
    ``original: true`` (authored here, no upstream), ``observed: true`` (the hexes were
    read from ``source``), and ``observed: false`` (derived from ``source``'s hues, so it
    needs a ``note``). A missing field is a claim nobody can check, so it is an error
    rather than a default. An original member records ``observed: None``, deliberately
    not ``False``, which means derived.
    """
    label = f"{where}: provenance.{scheme}"
    if not isinstance(data, dict):
        raise ValueError(f"{label} is missing")
    if not str(data.get("name", "")).strip():
        raise ValueError(f"{label}: missing name")
    original = data.get("original", False)
    if not isinstance(original, bool):
        raise ValueError(f"{label}: original must be true or false")
    if original:
        if data.get("observed") is True:
            raise ValueError(
                f"{label}: an original palette is authored here, so it cannot be observed"
            )
        return {
            "name": str(data["name"]).strip(),
            "source": str(data.get("source", "")).strip() or "house",
            "original": True,
            "observed": None,
            "note": " ".join(str(data.get("note", "")).split()),
        }
    if not str(data.get("source", "")).strip():
        raise ValueError(f"{label}: missing source")
    if "observed" not in data:
        raise ValueError(f"{label}: missing observed (or say original: true)")
    if not isinstance(data["observed"], bool):
        raise ValueError(f"{label}: observed must be true or false")
    if not data["observed"] and not str(data.get("note", "")).strip():
        raise ValueError(
            f"{label}: derived, so it needs a note saying what was derived and from what"
        )
    return {
        "name": str(data["name"]).strip(),
        "source": str(data["source"]).strip(),
        "original": False,
        "observed": data["observed"],
        "note": " ".join(str(data.get("note", "")).split()),
    }


def load_bundle(path: Path) -> Bundle:
    data = yamlio.load_file(path) or {}
    where = path.name
    family = str(data.get("family", "")).strip()
    if not family:
        raise ValueError(f"{where}: missing family")
    mood = str(data.get("mood", "")).strip()
    if mood not in ("calm", "vivid"):
        raise ValueError(f"{where}: mood must be calm or vivid")
    raw_provenance = data.get("provenance")
    if not isinstance(raw_provenance, dict):
        raise ValueError(f"{where}: missing provenance block")
    bundle = Bundle(
        id=data["id"],
        title=data.get("title", data["id"]),
        description=" ".join(str(data.get("description", "")).split()),
        palettes={
            "light": _palette("light", data.get("light"), where),
            "dark": _palette("dark", data.get("dark"), where),
        },
        family=family,
        mood=mood,
        provenance={
            scheme: _variation(scheme, raw_provenance.get(scheme), where)
            for scheme in SCHEMES
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


def _srgb_to_lab(value: str) -> tuple[float, float, float]:
    """CIE L*a*b* (D65) for an sRGB hex colour."""
    channels = []
    for raw in _component(value):
        channel = raw / 255
        channels.append(channel / 12.92 if channel <= 0.04045 else ((channel + 0.055) / 1.055) ** 2.4)
    red, green, blue = channels
    x = (0.4124564 * red + 0.3575761 * green + 0.1804375 * blue) / 0.95047
    y = 0.2126729 * red + 0.7151522 * green + 0.0721750 * blue
    z = (0.0193339 * red + 0.1191920 * green + 0.9503041 * blue) / 1.08883
    delta = 6 / 29
    threshold = delta**3

    def lab_f(t: float) -> float:
        return t ** (1 / 3) if t > threshold else t / (3 * delta * delta) + 4 / 29

    fx, fy, fz = lab_f(x), lab_f(y), lab_f(z)
    return (116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz))


def cie76(first: str, second: str) -> float:
    """Perceptual distance (CIE76 ΔE) between two sRGB hex colours."""
    a, b = _srgb_to_lab(first), _srgb_to_lab(second)
    return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2) ** 0.5


def apca_luminance(value: str) -> float:
    """APCA's screen luminance Ys.

    Not the WCAG piecewise curve: APCA uses a plain 2.4 exponent on the sRGB channels.
    The constants are APCA-W3 0.1.9.
    """
    red, green, blue = (channel / 255 for channel in _component(value))
    return 0.2126729 * red**2.4 + 0.7151522 * green**2.4 + 0.0721750 * blue**2.4


def apca_contrast(foreground: str, background: str) -> float:
    """APCA Lc, signed: positive dark-on-light, negative light-on-dark.

    The magnitude is the contrast, the sign the polarity. APCA-W3 0.1.9 (the SAPC
    algorithm); black on white is about Lc 106 and white on black about Lc -108, which
    is the asymmetry WCAG's symmetric ratio cannot express.
    """
    text, back = apca_luminance(foreground), apca_luminance(background)
    text = text if text > 0.022 else text + (0.022 - text) ** 1.414
    back = back if back > 0.022 else back + (0.022 - back) ** 1.414
    if abs(back - text) < 0.0005:
        return 0.0
    if back > text:
        sapc = (back**0.56 - text**0.57) * 1.14
        output = 0.0 if sapc < 0.1 else sapc - 0.027
    else:
        sapc = (back**0.65 - text**0.62) * 1.14
        output = 0.0 if sapc > -0.1 else sapc + 0.027
    return output * 100


def apca_problems(
    bundle: Bundle, scheme: str, subject: dict[str, str] | None
) -> list[str]:
    """The APCA second opinion: Lc for each pair that carries meaning.

    The threshold is on the magnitude, because Lc is signed by polarity.
    """
    tokens = effective_tokens(bundle, scheme, subject)
    problems = []
    for role, surface in APCA_PAIRS:
        colour, under = tokens.get(role), tokens.get(surface)
        if not colour or not under:
            continue
        value = apca_contrast(colour, under)
        minimum = APCA_MIN_CONTRAST[role]
        if abs(value) < minimum:
            problems.append(
                f"{bundle.id}/{scheme}: {role} {colour} on {surface} {under} "
                f"is Lc {value:.1f}, below Lc {minimum:g} in magnitude"
            )
    return problems


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


def card_surface(tokens: dict[str, str], scheme: str) -> str:
    """The landing page's card, on which `ink_soft` text sits."""
    attr = SCHEME_ATTR.get(scheme, scheme)
    return _mix(tokens["ink"], tokens["paper"], CARD_INK.get(attr, CARD_INK["default"]))


def contrast_problems(bundle: Bundle, scheme: str, subject: dict[str, str] | None) -> list[str]:
    """Every declared threshold, measured against the surface it names.

    One loop over `CONTRAST_RULES`, so a rule that is declared is a rule that is
    applied.
    """
    tokens = effective_tokens(bundle, scheme, subject)
    surfaces = {
        "paper": tokens["paper"],
        "accent": tokens["accent"],
        "figure": figure_panel(tokens),
        "card": card_surface(tokens, scheme),
        "code_bg": tokens["code_bg"],
    }
    problems = []
    for surface, thresholds, alias, wording, tail in CONTRAST_RULES:
        measured = surfaces[surface]
        for role, minimum in thresholds.items():
            colour = tokens.get(alias.get(role, role))
            if not colour:
                continue
            ratio = contrast(colour, measured)
            if ratio < minimum:
                problems.append(
                    f"{bundle.id}/{scheme}: {role} {colour} {wording} {measured} "
                    f"is {ratio:.2f}:1, below {minimum}:1{tail}"
                )
    return problems




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


SWATCH_TOKENS = {
    "paper": "--sw-paper",
    "ink": "--sw-ink",
    "ink_soft": "--sw-ink-soft",
    "accent": "--sw-accent",
    "rule": "--sw-rule",
}


def swatch_css(bundle: Bundle) -> str:
    """A bundle's own colours and display face, scoped to its sample in the Settings
    dialog, so each card previews the bundle in the scheme the reader is using
    without the markup carrying a colour. The subject tint is not composed in: the
    sample shows the bundle, not the book.
    """
    selector = f'.tb-swatch[data-swatch="{bundle.id}"]'
    display = bundle.typography.get("display", DEFAULT_FONTS["display"])
    blocks = [f"{selector} {{\n  --sw-font: {display};\n}}"]
    for scheme in SCHEMES:
        attr = SCHEME_ATTR[scheme]
        palette = bundle.palette(attr)
        lines = [f'body[data-md-color-scheme="{attr}"] {selector} {{']
        lines += [f"  {variable}: {palette[key]};" for key, variable in SWATCH_TOKENS.items()]
        lines.append("}")
        blocks.append("\n".join(lines))
    return "\n".join(blocks)


def stylesheet(bundles: list[Bundle] | None = None, default: Bundle | None = None) -> str:
    """The whole generated themes.css.

    It opens with the cascade-layer order every shipped sheet relies on, then fills the
    `palette` layer, in increasing specificity: the default faces; typography per
    bundle; a fallback with the default bundle, so a reader without JavaScript still
    gets a real theme; and one block per bundle and scheme, which wins over the fallback.
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
        f"@layer {', '.join(CASCADE_LAYERS)};",
        "",
    ]
    body: list[str] = []

    body.append("/* 0. The faces a bundle that names none of its own falls back to. */")
    body.append(":root {")
    body += [f"  {FONT_TOKENS[key]}: {value};" for key, value in DEFAULT_FONTS.items()]
    body.append("}")
    body.append("")
    body.append("/* 1. Typography, per bundle. */")
    for bundle in chosen:
        css = typography_css(bundle)
        if css:
            body.append(css)
    body.append("")

    body.append("/* 2. Fallback: the default bundle, applied whether or not a theme is set. */")
    for scheme in SCHEMES:
        attr = SCHEME_ATTR[scheme]
        body.append(f'body[data-md-color-scheme="{attr}"] {{')
        body += [
            _passthrough(fallback, key, value) for key, value in fallback.palette(attr).items()
        ]
        body.append("}")
    body.append("")

    body.append("/* 3. Bundles, which win over the fallback. */")
    for bundle in chosen:
        body.append(f"/* {bundle.title} */")
        body.append(bundle_css(bundle))
        body.append("")

    body.append("/* 4. Swatches: each bundle's sample in the Settings dialog. */")
    for bundle in chosen:
        body.append(swatch_css(bundle))
    body.append("")

    out.append(f"@layer {CASCADE_LAYERS[0]} {{")
    out += [f"  {line}" if line else "" for line in "\n".join(body).strip("\n").splitlines()]
    out.append("}")
    return "\n".join(out) + "\n"
