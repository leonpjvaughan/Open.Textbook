"""The two Material-level keyboard gaps from the accessibility audit.

Both live in Material's generated markup and CSS, so the fixes are a stylesheet
rule and a template override. These tests pin them, and the override is compared
with the installed upstream template so a Material upgrade cannot leave a stale
copy in place silently: the only permitted difference is the added aria-label.

See `research/accessibility.md` §2 and `todo.md` item 16.
"""

from __future__ import annotations

import re
from pathlib import Path

from textbook.book import repo_root

EXTRA_CSS = repo_root() / "assets" / "stylesheets" / "extra.css"
NAV_ITEM = repo_root() / "renderers" / "mkdocs" / "overrides" / "partials" / "nav-item.html"

# The one difference from upstream Material. Stripped before the drift compare.
OUR_ARIA_LABEL = ' aria-label="{{ render_title(nav_item) | striptags }}"'


def upstream_nav_item() -> Path:
    """Material's own nav-item.html, from the installed package."""
    import material

    return Path(material.__file__).parent / "templates" / "partials" / "nav-item.html"


def test_the_closed_search_overlay_is_not_a_tab_stop():
    """`visibility: hidden` on the closed overlay, restored when it opens.

    Material leaves `.md-search__output` transparent but in the tab order, and
    its `.md-search__scrollwrap` has `tabindex="0"`, so Tab lands in an invisible
    box. The bare `visibility: hidden` is not enough on its own: without the
    `:checked` sibling rule the results are hidden when the search opens.
    """
    css = EXTRA_CSS.read_text(encoding="utf-8")
    assert re.search(r"\.md-search__output\s*\{[^}]*visibility:\s*hidden", css), (
        "the closed search overlay is still a tab stop; add "
        "`.md-search__output { visibility: hidden; }`"
    )
    assert re.search(
        r'\[data-md-toggle="search"\]:checked\s*~\s*\.md-header\s+'
        r"\.md-search__output\s*\{[^}]*visibility:\s*visible",
        css,
    ), "the open search must restore visibility, or the results are invisible"


def test_material_nav_item_override_is_in_sync_with_upstream():
    """The override differs from Material only by the added aria-label.

    Material marks `nav-item.html` "automatically generated - do not edit", so a
    copy can go stale on upgrade. Comparing the body against the installed
    template makes that fail loudly instead, which is the answer to the one
    real risk in overriding it.
    """
    upstream = upstream_nav_item().read_text(encoding="utf-8")
    override = NAV_ITEM.read_text(encoding="utf-8")
    upstream_body = upstream.split("-#}", 1)[1]
    override_body = override.split("-#}", 1)[1].replace(OUR_ARIA_LABEL, "")
    assert override_body == upstream_body, (
        "the nav-item override has drifted from Material's template; re-sync it "
        "and re-apply the aria-label"
    )


def test_every_icon_only_nav_toggle_has_an_accessible_name():
    """The toggle label is icon-only, and names the submenu it controls.

    Material renders the section title in a sibling `<a>`, not in the toggle, so
    the label is bare; the submenu `<nav>` points its `aria-labelledby` at it,
    so an empty name is a WCAG 4.1.2 failure rather than a nicety.
    """
    text = NAV_ITEM.read_text(encoding="utf-8")
    assert OUR_ARIA_LABEL.strip() in text, "the aria-label is missing from the override"
    toggle = re.search(
        r'<label class="md-nav__link \{\{ class \}\}"[^>]*\{\{ path \}\}_label"[^>]*>'
        r"\s*<span class=\"md-nav__icon md-icon\"></span>\s*</label>",
        text,
    )
    assert toggle, "the icon-only expand/collapse label was not found in the override"
    assert "aria-label=" in toggle.group(0)
