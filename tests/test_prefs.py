"""Both reader preferences belong to the reader, not to the build.

The colour scheme and the theme bundle are stored under origin-wide keys and
applied before the first paint, so a choice made in one book follows the reader
into every other book and the landing page.

There is exactly one implementation of that script: ``hooks/prefs.py``'s
``snippet``. The book template, the landing page and the 404 carry ``$prefs_script``
and are filled from it, so they cannot drift. These tests pin the keys, the
generated payload, the empty template slots, and every surface rendering the one
snippet.
"""

from __future__ import annotations

import re
from string import Template

import pytest

from textbook import config as cfg
from textbook import pipeline, portal
from textbook.book import book_by_id, repo_root
from textbook.hooks import prefs
from textbook.themes import default_bundle, ordered_bundles

BOOK = "gcse-maths"
PROFILE = "higher"
PAGE = "Chapter 1/Section 1.1/Walkthrough/index.md"


def base_config() -> dict:
    """The shape ``snippet`` reads: the bundle registry, from ``themes/``.

    From the one constructor, which always supplies it — the registry is global rather
    than book-specific, so a config with no book still has it.
    """
    return cfg.from_parts(".")


def shared_snippet() -> str:
    """The one script every reader surface must carry, byte for byte."""
    return prefs.snippet(base_config())


@pytest.fixture(scope="module")
def book_page() -> str:
    """One real book page, rendered through the pipeline's own substitution."""
    book = book_by_id(BOOK)
    config = pipeline.make_config(book, PROFILE)
    nav = pipeline.chapter_subset(book, 1)
    template = Template(pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8"))
    html, _entry, maths_failed = pipeline.render_page(
        book, PROFILE, config, nav, PAGE, template
    )
    assert not maths_failed, "the page did not render, so it cannot pin the script"
    return html




def test_the_shared_key_is_not_scoped_to_a_path():
    """A path-scoped key would lose the reader's choice if the site moved."""
    key = prefs.SCHEME_KEY
    assert key and "/" not in key and not key.startswith(".")


def test_themes_follows_the_configured_registry():
    ids, default = prefs.themes(base_config())
    assert ids == [bundle.id for bundle in ordered_bundles()]
    assert default == default_bundle().id


def test_themes_defaults_to_the_first_bundle_when_none_is_named():
    ids, default = prefs.themes({"extra": {"themes": ["a", "b"]}})
    assert ids == ["a", "b"]
    assert default == "a"


def test_themes_tolerates_a_missing_config():
    assert prefs.themes(None) == ([], "")
    assert prefs.themes({}) == ([], "")




def test_snippet_reads_both_shared_keys():
    snippet = shared_snippet()
    assert f'"{prefs.SCHEME_KEY}"' in snippet
    assert f'"{prefs.THEME_KEY}"' in snippet


def test_snippet_offers_every_configured_bundle():
    snippet = shared_snippet()
    for bundle in ordered_bundles():
        assert f'"{bundle.id}"' in snippet, bundle.id


def test_snippet_sets_the_attributes_the_shell_reads():
    """``themes.css`` keys its tokens off ``body[data-md-color-scheme]``.

    The body attribute is copied from ``<html>`` by the page's own tiny script,
    so the attribute the generated script sets is ``data-md-color-scheme`` on the
    document element. ``data-scheme-pref`` is the landing page's source for the
    same copy.
    """
    snippet = shared_snippet()
    assert "data-theme" in snippet
    assert "data-scheme-pref" in snippet
    assert "data-md-color-scheme" in snippet


def test_snippet_exposes_the_shared_store():
    """The Settings runtime reads this interface; its fallback must never be needed."""
    snippet = shared_snippet()
    for field in (
        "window.textbookPrefs",
        "schemeKey",
        "themeKey",
        "setTheme",
        "currentTheme",
        "read: read",
        "write: write",
    ):
        assert field in snippet, field




def test_the_book_template_carries_the_generated_script():
    template = pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8")
    assert "$prefs_script" in template


def test_the_landing_template_carries_the_generated_script():
    template = (repo_root() / "engine" / "src" / "textbook" / "templates" / "portal.html").read_text(
        encoding="utf-8"
    )
    assert "$prefs_script" in template


@pytest.mark.parametrize(
    "relative",
    [
        "engine/src/textbook/templates/page.html",
        "engine/src/textbook/templates/portal.html",
    ],
)
def test_no_template_holds_a_second_copy_of_the_script(relative):
    """The templates must hold no preference logic, only the empty slot.

    This is the test that would fail if someone pasted a before-paint script back
    into a template: the two copies could then disagree, which is what this
    change removes.
    """
    text = (repo_root() / relative).read_text(encoding="utf-8")
    assert "localStorage" not in text, f"{relative} reads storage of its own"
    assert "textbooks:" not in text, f"{relative} hardcodes a shared key"
    assert "data-theme" not in text, f"{relative} applies a theme of its own"


def test_the_page_template_has_no_inline_before_paint_script():
    """The old copy is gone: the slot is the only script before the stylesheets.

    The cascade is one placeholder in the template (`$stylesheets`, filled from
    `pipeline.STYLESHEETS`) rather than six literal `<link>`s, so the marker this
    slices at is the placeholder, not a sheet's filename.
    """
    template = pipeline.PAGE_TEMPLATE.read_text(encoding="utf-8")
    head = template[: template.index("$stylesheets")]
    assert "<script" not in head, "an inline script survives in the head"




def test_the_built_book_page_carries_the_shared_snippet(book_page: str):
    """Rendered output, not just the template: the substitution must fire.

    This is the test that fails if the template and ``prefs.snippet`` ever
    disagree: the pipeline renders a real page and the bytes must match.
    """
    assert shared_snippet() in book_page


def test_the_landing_page_carries_the_shared_snippet():
    assert shared_snippet() in portal.render()


def test_the_404_carries_the_shared_snippet():
    """A missing page must not need a fourth copy of the preference logic."""
    assert shared_snippet() in portal.not_found()


def test_every_book_page_gets_the_snippet_before_the_stylesheets(book_page: str):
    """Before paint, so the chosen bundle cannot flash."""
    assert book_page.index(prefs.SCHEME_KEY) < book_page.index("themes.css")


def test_the_landing_page_applies_the_theme_before_paint():
    html = portal.render()
    head = html[: html.index("</head>")]
    assert "data-theme" in head
    assert prefs.THEME_KEY in head


def test_landing_page_can_write_the_preference_too():
    """A reader who picks a scheme on the landing page must get it in the books.

    The landing page exposes the same ``window.textbookPrefs`` interface the
    snippet generates for the books, so there is one store rather than a second
    copy that could drift.
    """
    html = portal.render()
    assert portal.root_links(rooted=False)["settings_js"] in html, (
        "the shared Settings runtime is not loaded"
    )
    assert "window.textbookPrefs" in html, "the landing page does not expose the shared store"
    runtime = (repo_root() / "assets" / "settings" / "settings.js").read_text(encoding="utf-8")
    assert prefs.SCHEME_KEY in runtime, "the runtime never writes the shared scheme key"


def test_landing_control_is_hidden_without_javascript():
    """The control is inert without scripting, so it must not appear."""
    html = portal.render()
    trigger = re.search(r'<button\b[^>]*id="tb-settings"[^>]*>', html)
    assert trigger, "the landing page has no Settings trigger"
    assert "hidden" in trigger.group(0), "the trigger is visible before its script runs"


def test_every_reader_surface_reads_and_writes_the_key(book_page: str):
    """Books, the landing page and the 404 must agree on reading and writing."""
    surface_snippet = shared_snippet()
    for surface, name in (
        (book_page, "a book page"),
        (portal.render(), "the landing page"),
        (portal.not_found(), "the 404"),
    ):
        assert surface_snippet in surface, f"{name} does not carry the shared script"
    runtime = (repo_root() / "assets" / "settings" / "settings.js").read_text(
        encoding="utf-8"
    )
    assert "localStorage.setItem" in runtime, "the runtime never records the choice"



SCENARIO = r"""
const fs = require("fs");
const [snippetPath, stored, osDark] = process.argv.slice(2);
const attributes = {};
const listen = [];
const media = {
  matches: osDark === "1",
  addEventListener(_event, handler) { listen.push(handler); },
  addListener(handler) { listen.push(handler); },
};
const metas = [{ setAttribute(key, value) { this[key] = value; } }];
const store = new Map();
if (stored) store.set("textbooks:scheme", stored);
const documentElement = {
  setAttribute(key, value) { attributes[key] = value; },
  getAttribute(key) { return key in attributes ? attributes[key] : null; },
};
const document = {
  documentElement,
  body: null,
  readyState: "complete",
  addEventListener() {},
  querySelectorAll() { return metas; },
};
const window = {
  localStorage: {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, value),
  },
  matchMedia: () => media,
};
const getComputedStyle = () => ({ getPropertyValue: () => "" });
const code = fs
  .readFileSync(snippetPath, "utf8")
  .replace(/^\s*<script>\s*/, "")
  .replace(/<\/script>\s*$/, "");
new Function("window", "document", "getComputedStyle", code)(window, document, getComputedStyle);
const before = { ...attributes };
for (const handler of listen) handler({ matches: osDark !== "1" });
process.stdout.write(
  JSON.stringify({ before, after: { ...attributes }, follow: listen.length })
);
"""


def run_snippet(tmp_path, stored: str, dark: bool) -> dict:
    """Evaluate the generated before-paint script under Node, with a stub document."""
    import json
    import shutil
    import subprocess

    node = shutil.which("node")
    if node is None:
        pytest.skip("node is not on PATH; the preference script cannot be evaluated")
    path = tmp_path / "snippet.js"
    path.write_text(shared_snippet(), encoding="utf-8")
    scenario = tmp_path / "scenario.js"
    scenario.write_text(SCENARIO, encoding="utf-8")
    done = subprocess.run(
        [node, str(scenario), str(path), stored, "1" if dark else "0"],
        capture_output=True,
        text=True,
        check=False,
    )
    assert done.returncode == 0, done.stderr
    return json.loads(done.stdout)


def test_a_dark_operating_system_sets_the_dark_scheme_with_no_stored_choice(tmp_path):
    result = run_snippet(tmp_path, stored="", dark=True)
    assert result["before"]["data-md-color-scheme"] == "slate", result
    assert result["before"]["data-scheme-pref"] == "slate", result
    assert result["follow"] == 1, "nothing listens for an OS scheme change"
    assert result["after"]["data-md-color-scheme"] == "default", result


def test_a_light_operating_system_sets_the_light_scheme_with_no_stored_choice(tmp_path):
    result = run_snippet(tmp_path, stored="", dark=False)
    assert result["before"]["data-md-color-scheme"] == "default", result


def test_a_stored_light_choice_wins_over_a_dark_operating_system(tmp_path):
    result = run_snippet(tmp_path, stored="default", dark=True)
    assert result["before"]["data-md-color-scheme"] == "default", result
    assert result["after"]["data-md-color-scheme"] == "default", (
        "an OS change moved a stored choice, so dusk would undo what the reader asked for"
    )


def test_a_stored_dark_choice_wins_over_a_light_operating_system(tmp_path):
    result = run_snippet(tmp_path, stored="slate", dark=False)
    assert result["before"]["data-md-color-scheme"] == "slate", result


def test_junk_in_the_store_is_not_a_choice(tmp_path):
    """A value the script cannot use must fall back to the OS, not to light."""
    result = run_snippet(tmp_path, stored="lime", dark=True)
    assert result["before"]["data-md-color-scheme"] == "slate", result




def test_both_schemes_carry_a_theme_color_meta():
    """A phone paints its address bar from `theme-color`; the build carried none.

    `media` is the only signal the browser has before a script runs, so there is one
    meta per scheme. The preference script repaints them from the resolved paper,
    which is what covers a stored choice or another bundle.
    """
    snippet = prefs.theme_color_metas()
    assert snippet.count('<meta name="theme-color"') == 2
    assert 'media="(prefers-color-scheme: light)"' in snippet
    assert 'media="(prefers-color-scheme: dark)"' in snippet


@pytest.mark.parametrize(
    "relative",
    [
        "engine/src/textbook/templates/page.html",
        "engine/src/textbook/templates/portal.html",
        "engine/src/textbook/templates/portal_page.html",
    ],
)
def test_every_template_declares_the_browser_interface(relative):
    text = (repo_root() / relative).read_text(encoding="utf-8")
    assert '$theme_color_metas' in text, f"{relative} carries no theme-color metas"
    assert '<meta name="color-scheme" content="light dark">' in text, (
        f"{relative} does not tell the browser both schemes are supported"
    )


def test_the_404_carries_both_metas():
    html = portal.not_found()
    assert html.count('<meta name="theme-color"') == 2
    assert '<meta name="color-scheme" content="light dark">' in html


def two_layouts() -> dict:
    return cfg.from_parts(".", layouts=["matrix", "wide"], default_layout="matrix")


def one_layout() -> dict:
    return cfg.from_parts(".", layouts=["matrix"], default_layout="matrix")


def with_layouts(monkeypatch, ids: list[str]) -> None:
    import textbook.book as books_module

    original = books_module.load_collection

    def patched(root=None):
        data = dict(original(root))
        data["layouts"] = [
            {"id": layout_id, "title": layout_id.title(), "description": "A layout."} for layout_id in ids
        ]
        return data

    monkeypatch.setattr(books_module, "load_collection", patched)


def test_with_one_layout_the_snippet_never_mentions_a_layout():
    snippet = prefs.snippet(one_layout())
    for word in ("textbooks:style", "data-style", "setStyle", "STYLE"):
        assert word not in snippet, word


def test_with_two_layouts_the_snippet_reads_the_style_key_and_falls_back():
    snippet = prefs.snippet(two_layouts())
    assert f'"{prefs.STYLE_KEY}"' in snippet
    assert 'var STYLES = ["matrix","wide"];' in snippet
    assert 'var DEFAULT_STYLE = "matrix";' in snippet
    assert "data-style" in snippet
    for field in ("styleKey", "setStyle", "currentStyle"):
        assert field in snippet, field


STYLE_SCENARIO = r"""
const fs = require("fs");
const [snippetPath, stored] = process.argv.slice(2);
const attributes = {};
const store = new Map();
if (stored) store.set("textbooks:style", stored);
const document = {
  documentElement: {
    setAttribute(key, value) { attributes[key] = value; },
    getAttribute(key) { return key in attributes ? attributes[key] : null; },
  },
  body: null,
  readyState: "complete",
  addEventListener() {},
  querySelectorAll() { return []; },
};
const window = {
  localStorage: {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, value),
  },
  matchMedia: () => ({ matches: false, addEventListener() {} }),
};
const code = fs.readFileSync(snippetPath, "utf8").replace(/^\s*<script>\s*/, "").replace(/<\/script>\s*$/, "");
new Function("window", "document", "getComputedStyle", code)(window, document, () => ({ getPropertyValue: () => "" }));
const before = attributes["data-style"];
window.textbookPrefs.setStyle("wide");
process.stdout.write(JSON.stringify({ before, after: attributes["data-style"], saved: store.get("textbooks:style") }));
"""


def run_style(tmp_path, stored: str) -> dict:
    import json
    import shutil
    import subprocess

    node = shutil.which("node")
    if node is None:
        pytest.skip("node is not on PATH; the preference script cannot be evaluated")
    path = tmp_path / "snippet.js"
    path.write_text(prefs.snippet(two_layouts()), encoding="utf-8")
    scenario = tmp_path / "style.js"
    scenario.write_text(STYLE_SCENARIO, encoding="utf-8")
    done = subprocess.run(
        [node, str(scenario), str(path), stored], capture_output=True, text=True, check=False
    )
    assert done.returncode == 0, done.stderr
    return json.loads(done.stdout)


def test_a_stored_layout_is_applied_before_paint(tmp_path):
    assert run_style(tmp_path, "wide")["before"] == "wide"


def test_an_unknown_stored_layout_falls_back_to_the_default(tmp_path):
    assert run_style(tmp_path, "cards")["before"] == "matrix"


def test_choosing_a_layout_applies_and_stores_it(tmp_path):
    result = run_style(tmp_path, "")
    assert result["before"] == "matrix"
    assert result["after"] == "wide"
    assert result["saved"] == "wide"


def test_the_landing_page_carries_no_layout_script_with_one_layout(monkeypatch):
    with_layouts(monkeypatch, ["matrix"])
    html = portal.render()
    assert "textbooks:style" not in html


def test_the_landing_page_carries_the_layout_script_with_two(monkeypatch):
    with_layouts(monkeypatch, ["matrix", "ledger"])
    html = portal.render()
    assert "textbooks:style" in html
    assert 'var STYLES = ["matrix","ledger"];' in html


MATCH_SCENARIO = r"""
const fs = require("fs");
const [snippetPath, stored, osDark, stepsJson] = process.argv.slice(2);
const attributes = {};
const listen = [];
const media = {
  matches: osDark === "1",
  addEventListener(_event, handler) { listen.push(handler); },
};
const store = new Map();
if (stored) store.set("textbooks:scheme", stored);
store.set("textbooks:theme", "neon");
const document = {
  documentElement: {
    setAttribute(key, value) { attributes[key] = value; },
    getAttribute(key) { return key in attributes ? attributes[key] : null; },
  },
  body: null,
  readyState: "complete",
  addEventListener() {},
  querySelectorAll() { return []; },
};
const window = {
  localStorage: {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, value),
    removeItem: (key) => store.delete(key),
  },
  matchMedia: () => media,
};
const code = fs.readFileSync(snippetPath, "utf8").replace(/^\s*<script>\s*/, "").replace(/<\/script>\s*$/, "");
new Function("window", "document", "getComputedStyle", code)(window, document, () => ({ getPropertyValue: () => "" }));
const seen = [];
const record = (step) => seen.push({
  step,
  scheme: attributes["data-md-color-scheme"],
  choice: window.textbookPrefs.scheme(),
  stored: store.has("textbooks:scheme") ? store.get("textbooks:scheme") : null,
  theme: attributes["data-theme"],
  storedTheme: store.has("textbooks:theme") ? store.get("textbooks:theme") : null,
});
record("load");
for (const step of JSON.parse(stepsJson)) {
  const [verb, value] = step.split(":");
  if (verb === "os") {
    media.matches = value === "dark";
    for (const handler of listen) handler({ matches: media.matches });
  } else if (verb === "set") {
    window.textbookPrefs.setScheme(value);
  } else if (verb === "reset") {
    window.textbookPrefs.reset();
  }
  record(step);
}
process.stdout.write(JSON.stringify(seen));
"""


def run_match(tmp_path, stored: str, dark: bool, steps: list[str]) -> list[dict]:
    """Evaluate the snippet under Node and walk the reader through scheme choices."""
    import json
    import shutil
    import subprocess

    node = shutil.which("node")
    if node is None:
        pytest.skip("node is not on PATH; the preference script cannot be evaluated")
    path = tmp_path / "snippet.js"
    path.write_text(shared_snippet(), encoding="utf-8")
    scenario = tmp_path / "match.js"
    scenario.write_text(MATCH_SCENARIO, encoding="utf-8")
    done = subprocess.run(
        [node, str(scenario), str(path), stored, "1" if dark else "0", json.dumps(steps)],
        capture_output=True,
        text=True,
        check=False,
    )
    assert done.returncode == 0, done.stderr
    return json.loads(done.stdout)


def test_with_nothing_stored_the_choice_is_match_device_and_follows_it(tmp_path):
    seen = run_match(tmp_path, "", dark=False, steps=["os:dark", "os:light"])
    assert [row["scheme"] for row in seen] == ["default", "slate", "default"], seen
    assert all(row["choice"] == "auto" and row["stored"] is None for row in seen), seen


def test_light_or_dark_overrides_the_device_and_is_not_moved_by_it(tmp_path):
    seen = run_match(tmp_path, "", dark=False, steps=["set:slate", "os:light", "set:default", "os:dark"])
    assert [row["scheme"] for row in seen] == ["default", "slate", "slate", "default", "default"], seen
    assert [row["stored"] for row in seen[1:]] == ["slate", "slate", "default", "default"], seen


def test_choosing_match_device_again_clears_the_override_and_follows(tmp_path):
    seen = run_match(tmp_path, "default", dark=True, steps=["set:auto", "os:light", "os:dark"])
    assert seen[0]["scheme"] == "default" and seen[0]["choice"] == "default", seen
    assert seen[1]["stored"] is None and seen[1]["choice"] == "auto", seen


BLOCKED_SCENARIO = r"""
const fs = require("fs");
const [snippetPath, mode] = process.argv.slice(2);
const attributes = {};
const listen = [];
const media = { matches: false, addEventListener(_event, handler) { listen.push(handler); } };
const refuse = () => { throw new Error("QuotaExceededError"); };
const storage = mode === "write"
  ? { getItem: () => null, setItem: refuse, removeItem: refuse }
  : null;
const document = {
  documentElement: {
    setAttribute(key, value) { attributes[key] = value; },
    getAttribute(key) { return key in attributes ? attributes[key] : null; },
  },
  body: null,
  readyState: "complete",
  addEventListener() {},
  querySelectorAll() { return []; },
};
const window = { matchMedia: () => media };
Object.defineProperty(window, "localStorage", {
  get() { if (!storage) throw new Error("SecurityError"); return storage; },
});
const code = fs.readFileSync(snippetPath, "utf8").replace(/^\s*<script>\s*/, "").replace(/<\/script>\s*$/, "");
new Function("window", "document", "getComputedStyle", code)(window, document, () => ({ getPropertyValue: () => "" }));
const prefs = window.textbookPrefs;
const now = () => ({ scheme: attributes["data-md-color-scheme"], choice: prefs.scheme() });
const seen = {};
prefs.setScheme("slate");
seen.dark = now();
for (const handler of listen) handler({ matches: false });
seen.deviceLight = now();
prefs.setScheme("auto");
seen.auto = now();
prefs.setTheme("neon");
seen.theme = { applied: attributes["data-theme"], current: prefs.currentTheme() };
prefs.setStyle("wide");
seen.style = { applied: attributes["data-style"], current: prefs.currentStyle() };
process.stdout.write(JSON.stringify(seen));
"""


@pytest.mark.parametrize("mode", ["write", "blocked"])
def test_a_choice_holds_when_the_browser_refuses_storage(tmp_path, mode):
    """Light or Dark must apply, and stay, when storage throws or is blocked outright."""
    import json
    import shutil
    import subprocess

    node = shutil.which("node")
    if node is None:
        pytest.skip("node is not on PATH; the preference script cannot be evaluated")
    path = tmp_path / "snippet.js"
    path.write_text(prefs.snippet(two_layouts()), encoding="utf-8")
    scenario = tmp_path / "blocked.js"
    scenario.write_text(BLOCKED_SCENARIO, encoding="utf-8")
    done = subprocess.run(
        [node, str(scenario), str(path), mode], capture_output=True, text=True, check=False
    )
    assert done.returncode == 0, done.stderr
    seen = json.loads(done.stdout)
    assert seen["dark"] == {"scheme": "slate", "choice": "slate"}, seen
    assert seen["deviceLight"] == {"scheme": "slate", "choice": "slate"}, (
        "a device change undid a Dark the reader chose while storage was refused"
    )
    assert seen["auto"] == {"scheme": "default", "choice": "auto"}, seen
    assert seen["theme"] == {"applied": "neon", "current": "neon"}, seen
    assert seen["style"] == {"applied": "wide", "current": "wide"}, seen


def test_an_existing_stored_value_still_reads_as_light_or_dark(tmp_path):
    assert run_match(tmp_path, "slate", dark=False, steps=[])[0]["choice"] == "slate"
    assert run_match(tmp_path, "lime", dark=False, steps=[])[0]["choice"] == "auto"


def test_reset_clears_every_stored_choice_and_restores_the_defaults(tmp_path):
    seen = run_match(tmp_path, "default", dark=True, steps=["reset", "os:light"])
    load, reset, after = seen
    assert load["theme"] == "neon" and load["scheme"] == "default", load
    assert reset["stored"] is None and reset["storedTheme"] is None, reset
    assert reset["choice"] == "auto" and reset["scheme"] == "slate", reset
    assert reset["theme"] == default_bundle().id, reset
    assert after["scheme"] == "default", "after a reset the page does not follow the device"


def test_reset_clears_the_layout_when_there_is_a_choice(tmp_path):
    snippet = prefs.snippet(two_layouts())
    assert "remove(STYLE_KEY);" in snippet
    assert "remove(STYLE_KEY);" not in prefs.snippet(one_layout())
