"""The asset graph of an assembled site, which nothing checked before.

Two checks look at parts of it and neither can see the whole. ``pipeline.check_links``
follows ``<a href>`` to a built page and nothing else, and ``test_hashed_assets.py``
checks one book profile as the build wrote it. Neither can answer:

* does every ``href``/``src`` a page makes resolve to a file — including a
  root-absolute one, which resolves at the *site* root and not at the book's?
* does every content-addressed name a page links appear in the manifest that
  describes the directory it lives in? A hash cannot be derived from the source
  tree, so the manifest is the only thing that can confirm the name.
* does every entry in every manifest exist on disk? That manifest is the offline
  download list's seed, so an entry naming a file nobody wrote is that list lying.

``tools assets`` asks all three, over an assembled ``site/``. This builds a real one
— the portal root and one book profile — because the 404's stylesheet is
root-absolute and a profile on its own is not a site. It then breaks the tree twice
by hand, in the two ways the check exists for.
"""

from __future__ import annotations

import re
import shutil
import subprocess
from pathlib import Path

import pytest

from textbook import pipeline, portal
from textbook.book import repo_root

CLI = repo_root() / "tools" / "dist" / "cli.js"

#: A Learn page of chapter 1: it links the whole cascade and names a figure module.
PAGE = Path("gcse-maths/higher/chapter-1/section-1.1/learn/index.html")

#: The book's own generated sheet, addressed, as a page links it.
ADDRESSED_SHEET = re.compile(r"book\.[0-9a-f]{8}\.css")


@pytest.fixture(scope="module")
def assembled(tmp_path_factory):
    """A portal root and one book profile, assembled the way a deploy is.

    ``portal.main()`` is the assembly rather than a copy of it, because a second
    writer of the root's files is a second thing that can disagree with the one the
    deploy runs. It writes only through ``site()``, which is what makes pointing that
    at ``tmp_path`` enough — and it is called in a ``MonkeyPatch`` context because
    the fixture is module-scoped and ``monkeypatch`` is not.
    """
    site = tmp_path_factory.mktemp("assets") / "site"
    with pytest.MonkeyPatch.context() as patch:
        patch.setattr(portal, "site", lambda: site)
        assert portal.main() == 0
    pipeline.build("gcse-maths", "higher", out=site / "gcse-maths" / "higher", chapter=1)
    return site


@pytest.fixture
def site(assembled, tmp_path):
    """A copy each time, so one test breaking the tree cannot hide behind another."""
    target = tmp_path / "site"
    shutil.copytree(assembled, target)
    return target


def check(site: Path) -> subprocess.CompletedProcess[str]:
    assert CLI.is_file(), "the tools CLI is missing; run `npm run build`"
    return subprocess.run(
        ["node", str(CLI), "assets", str(site)],
        capture_output=True,
        text=True,
        check=False,
        cwd=repo_root(),
    )


def test_the_assembled_site_has_no_dangling_asset(site):
    result = check(site)
    assert result.returncode == 0, result.stdout + result.stderr
    lines = result.stdout.strip().splitlines()
    assert len(lines) == 1, f"a passing run states what it examined, in one line:\n{result.stdout}"
    assert "0 errors" in lines[0]


def test_a_tree_with_nothing_to_check_fails(tmp_path):
    """A check that examined nothing is not a pass — the tools' own first rule."""
    (tmp_path / "site").mkdir()
    result = check(tmp_path / "site")
    assert result.returncode == 1, result.stdout
    assert "manifest.json" in result.stdout


def test_a_page_pointing_at_a_name_no_file_has_fails(site):
    """A mistyped hash is a 404 nobody can spot by eye, so the name is checked."""
    page = site / PAGE
    html, changed = ADDRESSED_SHEET.subn("book.deadbeef.css", page.read_text(encoding="utf-8"))
    assert changed == 1
    page.write_text(html, encoding="utf-8")

    result = check(site)
    assert result.returncode == 1, result.stdout
    assert PAGE.as_posix() in result.stdout, "the failure does not name the page"
    assert "book.deadbeef.css" in result.stdout, "the failure does not name the reference"


def test_a_file_written_under_a_name_no_manifest_records_fails(site):
    """The link resolves, and is still wrong: the manifest is what makes it right.

    Without this leg a file that happens to exist under a name no build produced —
    a copy left by hand, a renamed sheet — would pass, and the page would link an
    asset the offline download list does not know about.
    """
    page = site / PAGE
    html = page.read_text(encoding="utf-8")
    written = ADDRESSED_SHEET.search(html)
    assert written, "the page links no addressed book stylesheet"
    orphan = "book.feedface.css"
    sheets = site / "gcse-maths/higher/assets/stylesheets"
    shutil.copyfile(sheets / written.group(0), sheets / orphan)
    page.write_text(html.replace(written.group(0), orphan), encoding="utf-8")
    assert (sheets / orphan).is_file(), "the failure would then be the missing-file one"

    result = check(site)
    assert result.returncode == 1, result.stdout
    assert orphan in result.stdout, "the failure does not name the reference"
    assert "assets/manifest.json" in result.stdout, "the failure does not name the manifest"


def test_a_page_naming_a_figure_module_the_build_lacks_fails(site):
    """A figure is named in `data-figure-src`, which is neither an `href` nor a `src`.

    The loader mounts a bare filename from beside itself, so the build's link checker
    cannot see the request: a page naming a module the build did not write would ship
    a figure that mounts into a 404.
    """
    page = site / PAGE
    named = re.search(r'data-figure-src="([^"]+)"', page.read_text(encoding="utf-8"))
    assert named, "the page names no figure module, so this would prove nothing"
    (site / "gcse-maths/higher/assets/figures" / named.group(1)).unlink()

    result = check(site)
    assert result.returncode == 1, result.stdout
    assert PAGE.as_posix() in result.stdout, "the failure does not name the page"
    assert named.group(1) in result.stdout, "the failure does not name the module"


def test_a_root_absolute_reference_resolves_at_the_site_root(site):
    """A book page's `/assets/...` is the portal's file, not its own profile's.

    The registration script is linked root-absolutely from every page, so a file of
    the same name inside the book's profile must not satisfy it: the page is served
    from any depth under the site, where beside-the-page is a different file. Delete
    the root's copy and leave the profile's, and the page's reference must fail.
    """
    page = site / "gcse-maths/higher/chapter-1/index.html"
    root_copy = next((site / "assets/settings").glob("service-worker.*.js"))
    assert (site / "gcse-maths/higher/assets/settings" / root_copy.name).is_file()
    root_copy.unlink()

    result = check(site)
    assert result.returncode == 1, result.stdout
    assert "gcse-maths/higher/chapter-1/index.html" in result.stdout, (
        "the failure does not name the page, so the profile's copy satisfied it"
    )
    assert root_copy.name in result.stdout, "the failure does not name the reference"
