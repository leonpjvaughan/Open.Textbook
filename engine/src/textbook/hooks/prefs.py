"""Reader preferences: the colour scheme and the theme bundle.

Both belong to the reader and apply to the whole collection, so both are stored
under origin-wide keys and applied before the first paint.

* ``textbooks:scheme`` — ``default`` or ``slate``; absent means *Match device*.
* ``textbooks:style`` — a layout id from ``collection.yaml``. Read and written only
  when more than one layout exists; with one, nothing here mentions it.
* ``textbooks:theme`` — one of the bundles in ``themes/``. A bundle is chosen by
  the reader and applies to every book, so moving between subjects never moves
  the theme: the bundle is the reading experience, the subject tint is the
  subject.

Neither key is namespaced by path: renaming the repository or moving a book must
not cost a reader their preferences.

**The operating system is the default, not an override.** With nothing stored, a
dark ``prefers-color-scheme`` gives the dark scheme and a light one gives the
light scheme, and the page follows the OS if it changes while the reader is on
it. A stored choice always wins and is not moved by an OS change: the reader
asked for it, and an OS setting that fired at dusk must not undo it.

**This is the only copy of the before-paint script.** It used to exist three
times — here for MkDocs, in ``templates/page.html`` for the pipeline and again in
the landing page — and the copies could drift. Now ``snippet`` generates it,
``$prefs_script`` carries it in both templates (filled by ``pipeline.render_page``
and ``portal.render``), and ``portal.not_found`` uses it too. The templates hold
no preference logic of their own, which a test enforces.
"""

from __future__ import annotations

import html
import json

from ..themes import SCHEMES, default_bundle

SCHEME_KEY = "textbooks:scheme"
THEME_KEY = "textbooks:theme"

STYLE_KEY = "textbooks:style"


def themes(config) -> tuple[list[str], str]:
    """The bundle ids a reader may choose, and the default.

    Read from ``config["extra"]``, which the pipeline and the portal fill from
    ``themes/``, so the script does not have to guess and a test can drive it
    directly.
    """
    extra = (config or {}).get("extra") or {}
    ids = [str(theme_id) for theme_id in extra.get("themes", ())]
    default = str(extra.get("default_theme", "") or (ids[0] if ids else ""))
    return ids, default


def layouts(config) -> tuple[list[str], str]:
    """The layout ids a reader may choose, and the default; same source as ``themes``."""
    extra = (config or {}).get("extra") or {}
    ids = [str(layout_id) for layout_id in extra.get("layouts", ())]
    default = str(extra.get("default_layout", "") or (ids[0] if ids else ""))
    return ids, default


def theme_color_metas() -> str:
    """The browser-interface colour, one meta per scheme.

    A phone paints its own address bar from ``theme-color``, and without it the
    bar is whatever the browser guesses: measured, 0 pages carried the meta. The
    values are the default bundle's paper for each scheme, so the markup carries
    no colour of its own; ``snippet`` repaints both from the resolved
    ``--tb-paper`` once the stylesheets have loaded, which is what makes them
    right for a reader on another bundle or an explicit scheme.

    ``media`` follows the operating system, which is the only signal a browser
    has before a script runs. A reader who stored the opposite scheme gets the
    right value a moment later, from the same script that chose the scheme.
    """
    palettes = default_bundle().palettes
    tags = [
        f'<meta name="theme-color" media="(prefers-color-scheme: {scheme})" '
        f'content="{html.escape(palettes[scheme]["paper"], quote=True)}">'
        for scheme in SCHEMES
    ]
    return "\n".join(tags)


def snippet(config) -> str:
    """The inline script that applies both preferences before the first paint.

    It sets ``data-scheme-pref`` and ``data-theme`` on ``<html>`` (and ``data-style``
    when there is more than one layout), plus
    ``data-md-color-scheme`` — the attribute ``themes.css`` keys its tokens off,
    kept from Material because the shared stylesheet still depends on it.

    It also exposes ``window.textbookPrefs``: the same store the landing page has
    always exposed, so the one Settings runtime
    (``assets/settings/settings.js``) reads and writes a single interface on
    every surface and its own fallback is never needed.
    """
    theme_ids, default_theme = themes(config)
    theme_list = json.dumps(theme_ids, separators=(",", ":"))
    layout_ids, default_layout = layouts(config)
    choosable = len(layout_ids) > 1
    layout_vars = (
        f'  var STYLE_KEY = "{STYLE_KEY}";\n'
        f"  var STYLES = {json.dumps(layout_ids, separators=(',', ':'))};\n"
        f"  var DEFAULT_STYLE = {json.dumps(default_layout)};\n"
        if choosable
        else ""
    )
    layout_apply = (
        "  function applyStyle(value) {\n"
        "    var wanted = STYLES.indexOf(value) >= 0 ? value : DEFAULT_STYLE;\n"
        "    document.documentElement.setAttribute('data-style', wanted);\n"
        "    return wanted;\n"
        "  }\n"
        if choosable
        else ""
    )
    layout_reset = "      remove(STYLE_KEY);\n      chosenStyle = applyStyle(null);\n" if choosable else ""
    layout_start = "  var chosenStyle = applyStyle(read(STYLE_KEY));\n" if choosable else ""
    layout_refresh = "      chosenStyle = applyStyle(read(STYLE_KEY));\n" if choosable else ""
    layout_api = (
        "    styleKey: STYLE_KEY,\n"
        "    styles: STYLES.slice(),\n"
        "    defaultStyle: DEFAULT_STYLE,\n"
        "    setStyle: function (value) {\n"
        "      write(STYLE_KEY, value);\n"
        "      chosenStyle = applyStyle(value);\n"
        "      return chosenStyle;\n"
        "    },\n"
        "    currentStyle: function () { return applyStyle(chosenStyle); },\n"
        if choosable
        else ""
    )

    return (
        "<script>\n"
        "/* Reader preferences: see SHAPE.md (\"Theme preference\" and \"Theme\n"
        " * bundles\"). Applied before paint, so neither the scheme nor the theme\n"
        " * flashes. Generated by engine/src/textbook/hooks/prefs.py; there is no\n"
        " * second copy. */\n"
        "(function () {\n"
        f'  var SCHEME_KEY = "{SCHEME_KEY}";\n'
        f'  var THEME_KEY = "{THEME_KEY}";\n'
        f"  var THEMES = {theme_list};\n"
        f'  var DEFAULT_THEME = "{default_theme}";\n'
        f"{layout_vars}"
        "  var store, query = null;\n"
        "  try { store = window.localStorage; } catch (err) {}\n"
        "  try {\n"
        "    query = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;\n"
        "  } catch (err) {}\n"
        "  function read(key) {\n"
        "    try { return store ? store.getItem(key) : null; } catch (err) { return null; }\n"
        "  }\n"
        "  function stored() {\n"
        "    var value = read(SCHEME_KEY);\n"
        "    return value === 'slate' || value === 'default' ? value : null;\n"
        "  }\n"
        "  function write(key, value) {\n"
        "    try { if (store) store.setItem(key, value); } catch (err) {}\n"
        "  }\n"
        "  function remove(key) {\n"
        "    try { if (store) store.removeItem(key); } catch (err) {}\n"
        "  }\n"
        "  function device() {\n"
        "    return query && query.matches ? 'slate' : 'default';\n"
        "  }\n"
        "  function applyTheme(value) {\n"
        "    var wanted = THEMES.indexOf(value) >= 0 ? value : DEFAULT_THEME;\n"
        "    if (wanted) document.documentElement.setAttribute('data-theme', wanted);\n"
        "    return wanted;\n"
        "  }\n"
        f"{layout_apply}"
        "  function paint() {\n"
        "    var paper = '';\n"
        "    try {\n"
        "      /* The tokens are declared on body[data-md-color-scheme]; <html> above\n"
        "       * it computes --tb-paper as the empty value. */\n"
        "      paper = getComputedStyle(document.body || document.documentElement)\n"
        "        .getPropertyValue('--tb-paper').trim();\n"
        "    } catch (err) {}\n"
        "    if (!paper) return;\n"
        "    var metas = document.querySelectorAll('meta[name=\"theme-color\"]');\n"
        "    for (var i = 0; i < metas.length; i += 1) {\n"
        "      metas[i].setAttribute('content', paper);\n"
        "    }\n"
        "  }\n"
        "  function apply(value) {\n"
        "    var scheme = value === 'slate' ? 'slate' : 'default';\n"
        "    document.documentElement.setAttribute('data-scheme-pref', scheme);\n"
        "    document.documentElement.setAttribute('data-md-color-scheme', scheme);\n"
        "    if (document.body) document.body.setAttribute('data-md-color-scheme', scheme);\n"
        "    paint();\n"
        "  }\n"
        "  function readable() {\n"
        "    try { return !!store && (store.getItem(SCHEME_KEY), true); } catch (err) { return false; }\n"
        "  }\n"
        "  /* The stored choice first; with none, the operating system. The choice is\n"
        "   * also held here, so a browser that refuses storage still keeps it. */\n"
        "  var chosen = stored();\n"
        "  apply(chosen || device());\n"
        "  if (query) {\n"
        "    var follow = function (event) {\n"
        "      /* Listened to always, so Match device chosen later still follows;\n"
        "       * a chosen Light or Dark is never moved by the device. */\n"
        "      if (chosen) return;\n"
        "      apply(event.matches ? 'slate' : 'default');\n"
        "    };\n"
        "    if (query.addEventListener) query.addEventListener('change', follow);\n"
        "    else if (query.addListener) query.addListener(follow);\n"
        "  }\n"
        "  var chosenTheme = applyTheme(read(THEME_KEY));\n"
        f"{layout_start}"
        "  if (document.readyState === 'loading') {\n"
        "    document.addEventListener('DOMContentLoaded', paint);\n"
        "  } else {\n"
        "    paint();\n"
        "  }\n"
        "  window.textbookPrefs = {\n"
        "    schemeKey: SCHEME_KEY,\n"
        "    themeKey: THEME_KEY,\n"
        "    themes: THEMES.slice(),\n"
        "    defaultTheme: DEFAULT_THEME,\n"
        f"{layout_api}"
        "    read: read,\n"
        "    write: write,\n"
        "    scheme: function () { return chosen || 'auto'; },\n"
        "    setScheme: function (value) {\n"
        "      chosen = value === 'default' || value === 'slate' ? value : null;\n"
        "      if (chosen) write(SCHEME_KEY, chosen);\n"
        "      else remove(SCHEME_KEY);\n"
        "      apply(chosen || device());\n"
        "      return chosen || 'auto';\n"
        "    },\n"
        "    reset: function () {\n"
        "      chosen = null;\n"
        "      remove(SCHEME_KEY);\n"
        "      apply(device());\n"
        "      remove(THEME_KEY);\n"
        "      chosenTheme = applyTheme(null);\n"
        f"{layout_reset}"
        "    },\n"
        "    refresh: function () {\n"
        "      if (!readable()) return;\n"
        "      chosen = stored();\n"
        "      apply(chosen || device());\n"
        "      chosenTheme = applyTheme(read(THEME_KEY));\n"
        f"{layout_refresh}"
        "    },\n"
        "    setTheme: function (value) {\n"
        "      write(THEME_KEY, value);\n"
        "      chosenTheme = applyTheme(value);\n"
        "      return chosenTheme;\n"
        "    },\n"
        "    currentTheme: function () { return applyTheme(chosenTheme); }\n"
        "  };\n"
        "})();\n"
        "</script>\n"
    )
