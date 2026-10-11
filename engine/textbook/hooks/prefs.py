"""Reader preferences: the colour scheme, and the theme bundle.

Both belong to the reader and apply to the whole collection, so both are stored
under origin-wide keys and applied before the first paint.

* ``textbooks:scheme`` — ``default`` or ``slate``. Material scopes its own
  palette storage to the root of each built site, so a choice made in one book is
  invisible to the others; the script here bridges the shared key into Material's
  storage *before* Material paints, so there is no flash to correct.
* ``textbooks:theme`` — one of the bundles in ``themes/``. Since a bundle is
  chosen by the reader and applies to every book, moving between subjects never
  moves the theme: the bundle is the reading experience, the subject tint is the
  subject.

Neither key is namespaced by path: renaming the repository or moving a book must
not cost a reader their preferences.
"""

from __future__ import annotations

import json

SCHEME_KEY = "textbooks:scheme"
THEME_KEY = "textbooks:theme"

# Kept as an alias: the scheme key is what the earlier bridge introduced.
SHARED_KEY = SCHEME_KEY

# Material stores the palette as an index plus the colour data of that entry.
# These are its defaults when a palette entry names no colour of its own.
DEFAULT_PRIMARY = "indigo"
DEFAULT_ACCENT = "indigo"


def palette_entries(config) -> list[dict]:
    theme = (config or {}).get("theme") or {}
    entries: list[dict] = []
    for entry in theme.get("palette") or []:
        if not isinstance(entry, dict) or not entry.get("scheme"):
            continue
        entries.append(
            {
                "media": entry.get("media", ""),
                "scheme": entry["scheme"],
                "primary": entry.get("primary", DEFAULT_PRIMARY),
                "accent": entry.get("accent", DEFAULT_ACCENT),
            }
        )
    return entries


def themes(config) -> tuple[list[str], str]:
    """The bundle ids a reader may choose, and the default.

    Written into each generated config by the scaffold, so the script does not
    have to guess and a test can drive it directly.
    """
    extra = (config or {}).get("extra") or {}
    ids = [str(theme_id) for theme_id in extra.get("themes", ())]
    default = str(extra.get("default_theme", "") or (ids[0] if ids else ""))
    return ids, default


def snippet(config) -> str:
    """The inline script that applies both preferences before the first paint."""
    palette = palette_entries(config)
    if len(palette) < 2:
        return ""

    payload = json.dumps(palette, separators=(",", ":"))
    theme_ids, default_theme = themes(config)
    theme_list = json.dumps(theme_ids, separators=(",", ":"))

    return (
        "<script>\n"
        "/* Reader preferences: see SHAPE.md (\"Theme preference\" and \"Theme\n"
        " * bundles\"). Applied before paint, so neither the scheme nor the theme\n"
        " * flashes. Edit the palette in renderers/mkdocs/base.yml and the bundles\n"
        " * in themes/*.yaml. */\n"
        "(function () {\n"
        f'  var SCHEME_KEY = "{SCHEME_KEY}";\n'
        f'  var THEME_KEY = "{THEME_KEY}";\n'
        f"  var PALETTE = {payload};\n"
        f"  var THEMES = {theme_list};\n"
        f'  var DEFAULT_THEME = "{default_theme}";\n'
        "  var store;\n"
        "  try { store = window.localStorage; } catch (err) { return; }\n"
        "  function read(key) {\n"
        "    try { return store.getItem(key); } catch (err) { return null; }\n"
        "  }\n"
        "  function write(key, value) {\n"
        "    try { store.setItem(key, value); } catch (err) {}\n"
        "  }\n"
        "  function paletteFor(scheme) {\n"
        "    for (var i = 0; i < PALETTE.length; i++) {\n"
        "      if (PALETTE[i].scheme === scheme) return { index: i, color: PALETTE[i] };\n"
        "    }\n"
        "    return null;\n"
        "  }\n"
        "  function applyTheme(value) {\n"
        "    var wanted = THEMES.indexOf(value) >= 0 ? value : DEFAULT_THEME;\n"
        "    if (wanted) document.documentElement.setAttribute('data-theme', wanted);\n"
        "    return wanted;\n"
        "  }\n"
        "  /* Colour scheme: seed Material's own storage, then let Material paint. */\n"
        "  try {\n"
        "    var seeded = paletteFor(read(SCHEME_KEY));\n"
        "    if (seeded && typeof __md_set === 'function') __md_set('__palette', seeded);\n"
        "  } catch (err) {}\n"
        "  /* Theme bundle: ours alone, so it is simply set. */\n"
        "  applyTheme(read(THEME_KEY));\n"
        "  /* Exposed so a page can offer the choice; the landing page does. */\n"
        "  window.textbookPrefs = {\n"
        "    schemeKey: SCHEME_KEY,\n"
        "    themeKey: THEME_KEY,\n"
        "    themes: THEMES.slice(),\n"
        "    defaultTheme: DEFAULT_THEME,\n"
        "    read: read,\n"
        "    write: write,\n"
        "    setTheme: function (value) { write(THEME_KEY, value); return applyTheme(value); },\n"
        "    currentTheme: function () { return applyTheme(read(THEME_KEY)); }\n"
        "  };\n"
        "  document.addEventListener('change', function (event) {\n"
        "    var input = event.target;\n"
        "    if (!input || input.name !== '__palette') return;\n"
        "    var scheme = input.getAttribute('data-md-color-scheme');\n"
        "    if (scheme) write(SCHEME_KEY, scheme);\n"
        "  }, true);\n"
        "})();\n"
        "</script>\n"
    )


def on_post_page(output, page, config):
    script = snippet(config)
    if not script or "</head>" not in output:
        return output
    return output.replace("</head>", script + "</head>", 1)
