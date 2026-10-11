"""Share the reader's light/dark choice across every book in the collection.

Material scopes its palette storage to the root of each built site, so a choice
made in one profile is invisible to the others: reading Foundation after choosing
dark in Higher gives light, and the landing page knows nothing about either. The
reader's choice belongs to the reader, not to the build.

So we keep our own origin-wide key, ``textbooks:scheme``, and bridge it into
Material's storage from an inline script in ``<head>`` — before Material paints,
so the correct theme is applied on the first frame rather than corrected after a
flash.

Two details make the bridge safe rather than a hack:

* the payload is generated from ``theme.palette`` in the MkDocs config, so it
  follows the palette list instead of hard-coding indices and colour names;
* the runtime half records the choice from the palette radios themselves, so it
  cannot drift from what Material actually did.

The key is deliberately not namespaced by path: renaming the repository or moving
a book must not lose a reader's preference.
"""

from __future__ import annotations

import json

SHARED_KEY = "textbooks:scheme"

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


def snippet(config) -> str:
    """The inline script that seeds and records the shared preference."""
    palette = palette_entries(config)
    if len(palette) < 2:
        return ""

    payload = json.dumps(palette, separators=(",", ":"))
    return (
        "<script>\n"
        "/* Shared light/dark preference: see SHAPE.md (\"Theme preference\").\n"
        " * Material scopes its own palette storage per built site, so this\n"
        " * bridges the collection-wide key into Material's storage before the\n"
        " * first paint. Edit the palette in renderers/mkdocs/base.yml. */\n"
        "(function () {\n"
        f'  var KEY = "{SHARED_KEY}";\n'
        f"  var PALETTE = {payload};\n"
        "  var store;\n"
        "  try { store = window.localStorage; } catch (err) { return; }\n"
        "  function payload(scheme) {\n"
        "    for (var i = 0; i < PALETTE.length; i++) {\n"
        "      if (PALETTE[i].scheme === scheme) return { index: i, color: PALETTE[i] };\n"
        "    }\n"
        "    return null;\n"
        "  }\n"
        "  try {\n"
        "    var seeded = payload(store.getItem(KEY));\n"
        "    if (seeded && typeof __md_set === 'function') __md_set('__palette', seeded);\n"
        "  } catch (err) {}\n"
        "  document.addEventListener('change', function (event) {\n"
        "    var input = event.target;\n"
        "    if (!input || input.name !== '__palette') return;\n"
        "    var scheme = input.getAttribute('data-md-color-scheme');\n"
        "    if (!scheme) return;\n"
        "    try { store.setItem(KEY, scheme); } catch (err) {}\n"
        "  }, true);\n"
        "})();\n"
        "</script>\n"
    )


def on_post_page(output, page, config):
    script = snippet(config)
    if not script or "</head>" not in output:
        return output
    return output.replace("</head>", script + "</head>", 1)
