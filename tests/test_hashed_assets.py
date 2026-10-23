"""Content-addressed stylesheets: the name is the bytes.

A deploy used to be the only thing that could make a sheet stale, so the service
worker answered it by deleting every cached asset — which is exactly the wrong
answer for a reader who has downloaded a book to read offline. Hashing the name
removes the question: a sheet that did not change keeps its URL, so a cached copy
is still *the* copy, and a sheet that did change gets a name nothing has cached.

What is **not** addressed is as deliberate as what is, and is pinned here too. The
figure loader and the kit are named by 213 modules (``from "./kit.js"``) and by the
tools; the worker must stay at ``/sw.js`` or the registration breaks. Those are
revalidated by the ETag the Worker already sends, not renamed.

The build records what it wrote in ``assets/manifest.json``, because a hash cannot
be derived from the source tree by a test, a tool, or the offline download list.
"""

from __future__ import annotations

import hashlib
import re
from pathlib import Path
from types import SimpleNamespace

import pytest

from textbook import pipeline
from textbook.book import repo_root

from support import written_assets


@pytest.fixture(scope="module")
def built(tmp_path_factory):
    """One real chapter, built for real."""
    out = tmp_path_factory.mktemp("hashed") / "book"
    return pipeline.build("gcse-maths", "higher", out=out, chapter=1)


def test_the_digest_is_the_files_content(tmp_path):
    sheet = tmp_path / "x.css"
    sheet.write_bytes(b"body { color: red }")
    assert pipeline.digest(sheet) == hashlib.sha256(b"body { color: red }").hexdigest()[:8]
    assert len(pipeline.digest(sheet)) == 8


def test_a_page_links_the_job_the_build_wrote(built):
    """The href and the file are one decision, made once per build."""
    manifest = (built.out / "assets" / "manifest.json").read_text(encoding="utf-8")
    written = written_assets(manifest)
    for relative in pipeline.STYLESHEETS:
        assert relative in written, f"{relative} is linked in the cascade but not recorded"
        assert (built.out / written[relative]).is_file(), relative
        assert written[relative] != relative, f"{relative} was not addressed"


def test_every_asset_a_page_reaches_for_is_in_the_build(built):
    """The reference check hashing makes necessary.

    A mistyped hash is a 404 that no one can spot by eye, and the build's link
    checker only follows ``<a href>``. So every relative ``assets/…`` reference a
    page makes must resolve against what the build wrote.

    Root-absolute references are excluded on purpose: they name the *site* root
    (`/assets/settings/service-worker.js`, the 404's bundle stylesheet), which the
    portal writes, and a profile built on its own is not the site root. Those are
    checked against the portal's own output in `tests/test_pwa.py`.
    """
    root = built.out
    pattern = re.compile(r'(?:href|src)="((?![/]|https?:)[^"]*?/assets/[^"]+)"')
    missing: list[str] = []
    for page in root.rglob("*.html"):
        html = page.read_text(encoding="utf-8")
        for reference in pattern.findall(html):
            target = (page.parent / reference).resolve()
            if not target.exists():
                missing.append(f"{page.relative_to(root)} -> {reference}")
    assert not missing, "pages reach for assets the build did not write:\n" + "\n".join(missing)


def test_the_same_bytes_get_the_same_name(tmp_path):
    """Second build, same sources, same names — or every deploy is a new download."""
    first = pipeline.build("gcse-maths", "higher", out=tmp_path / "a", chapter=1, index=False)
    second = pipeline.build("gcse-maths", "higher", out=tmp_path / "b", chapter=1, index=False)
    a = (first.out / "assets" / "manifest.json").read_text(encoding="utf-8")
    b = (second.out / "assets" / "manifest.json").read_text(encoding="utf-8")
    assert written_assets(a) == written_assets(b)


def test_a_changed_sheet_gets_a_changed_name(tmp_path, monkeypatch):
    """Only the sheet that changed changes; that is the whole point of the hash."""
    book = SimpleNamespace(docs=tmp_path)
    sheet = tmp_path / "assets" / "stylesheets" / "book.css"
    sheet.parent.mkdir(parents=True)
    sheet.write_text("a {}", encoding="utf-8")
    monkeypatch.setattr(
        pipeline,
        "stylesheet_sources",
        lambda built_book: {"assets/stylesheets/book.css": built_book.docs / "assets/stylesheets/book.css"},
    )
    before = pipeline.hashed_stylesheets(book)["assets/stylesheets/book.css"]
    sheet.write_text("b {}", encoding="utf-8")
    after = pipeline.hashed_stylesheets(book)["assets/stylesheets/book.css"]
    assert before != after
    assert before.startswith("assets/stylesheets/book.")
    assert after.startswith("assets/stylesheets/book.")


def test_an_unauthored_sheet_is_not_linked(tmp_path, monkeypatch):
    """A page does not link what the build did not write."""
    book = SimpleNamespace(docs=tmp_path)
    monkeypatch.setattr(
        pipeline,
        "stylesheet_sources",
        lambda built_book: {"assets/stylesheets/book.css": built_book.docs / "assets/stylesheets/book.css"},
    )
    assert pipeline.hashed_stylesheets(book) == {}
    assert pipeline.stylesheet_links("../", {}) == ""


def test_the_manifest_names_the_book_and_the_build(built):
    import json

    data = json.loads((built.out / "assets" / "manifest.json").read_text(encoding="utf-8"))
    assert data["book"] == "gcse-maths"
    assert data["build"], "the manifest does not say which build wrote it"


@pytest.mark.parametrize(
    "relative",
    [
        "assets/figures/figures.js",
        "assets/figures/kit.js",
        "sw.js",
        "manifest.webmanifest",
    ],
)
def test_the_entry_points_keep_their_names(built, relative):
    """Named by 213 modules or by the browser, so renamed by nothing.

    `figures.js` mounts a module by slug, the kit is imported by every figure, and
    the worker's scope comes from its path. These are revalidated, not addressed.
    Everything else a page links — including the Settings runtime and the booklet
    script — is content-addressed.
    """
    assert (built.out / relative).is_file(), relative


def test_the_kit_is_one_copy_of_the_shared_bytes(built):
    """The kit is revalidated rather than renamed, so it must still be its source."""
    source = repo_root() / "assets" / "figures" / "kit.js"
    assert (built.out / "assets/figures/kit.js").read_bytes() == source.read_bytes()


# --- the figure modules -------------------------------------------------------
#
# A module is imported by the loader at runtime, so nothing in the built HTML is a
# link to it: the build's link checker cannot see the request and a mistyped hash
# would ship a figure that mounts into a 404. The page names the file in
# `data-figure-src` instead, and these tests are what make that name true.


def test_every_figure_a_page_names_is_a_module_the_build_wrote(built):
    root = built.out
    figures = root / "assets" / "figures"
    named = 0
    for page in root.rglob("*.html"):
        for src in re.findall(r'data-figure-src="([^"]+)"', page.read_text(encoding="utf-8")):
            named += 1
            assert "/" not in src and "\\" not in src, (
                f"{page.relative_to(root)}: {src} is a path, and the loader resolves "
                "a bare filename beside itself"
            )
            assert (figures / src).is_file(), f"{page.relative_to(root)} -> {src} is missing"
    assert named, "no page names a figure module, so this test proves nothing"


def test_every_figure_a_page_names_is_recorded_in_the_manifest(built):
    """The page, the manifest and the file are one decision, not three."""
    import json

    data = json.loads((built.out / "assets" / "manifest.json").read_text(encoding="utf-8"))
    files = sorted((built.out / "assets" / "figures").glob("*.js"))
    addresses = {data_path for data_path in data["figures"].values()}
    for src in re.findall(
        r'data-figure-src="([^"]+)"',
        "".join(p.read_text(encoding="utf-8") for p in built.out.rglob("*.html")),
    ):
        assert src in addresses, f"{src} is on a page but not in the manifest"
    # The flat files that are *not* addressed are exactly the two that must not be:
    # the loader (pinned by the template and the audits) and the kit barrel (213
    # modules import it, and its layers import each other, all by stable name).
    unaddressed = {
        path.name for path in files if not re.fullmatch(r".+\.[0-9a-f]{8}\.js", path.name)
    }
    assert unaddressed == {"figures.js", "kit.js"}
    # The kit's own layers keep their names too, for the same reason.
    for layer in (built.out / "assets" / "figures" / "kit").glob("*.js"):
        assert re.fullmatch(r"[a-z0-9-]+\.js", layer.name), layer.name


def test_a_figure_module_is_named_for_its_bytes(tmp_path):
    """Same bytes, same name; one byte, a new name. That is the whole contract."""
    from textbook import scaffold

    module = tmp_path / "some-figure.js"
    module.write_text("export function mount() {}\n", encoding="utf-8")
    first = scaffold.addressed_name(module)
    assert first == scaffold.addressed_name(module)
    module.write_text("export function mount() { return 1; }\n", encoding="utf-8")
    assert scaffold.addressed_name(module) != first


def test_the_loader_falls_back_to_the_slug(built):
    """Unbuilt — a port, a hand-written element — keeps working.

    The attribute is an enhancement on the address, not a requirement: the same
    file runs in the Quarto / MyST / MDX ports where nothing is hashed.
    """
    loader = (built.out / "assets" / "figures" / "figures.js").read_text(encoding="utf-8")
    assert "dataset.figureSrc" in loader
    assert "`./${file}`" in loader
    assert "`${slug}.js`" in loader, "no fallback, so an unbuilt element cannot mount"
