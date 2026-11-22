"""A downloaded book, read after the deploy that would have taken it away.

The two caches in `assets/sw.js` exist for one behaviour, and it is not visible in
the source: whether a page a reader has already read still resolves its stylesheet
when a new build has emptied the *other* cache. `tests/test_pwa.py` pins the
strategy — which cache each request goes to, and that `activate` deletes only the
runtime one — but only a browser can answer "and does the page still read?".

So this shells out to `tools offline`, which drives the whole sequence in Chromium:
visit, reload through the worker, delete the runtime cache (what a deploy does),
then navigate with the network off. It is marked `browser` and deselected by
default, the same arrangement as the figure sweep:

    scripts/check.sh && uv run python -m pytest -m browser

**The check is proved able to fail.** Pointing an addressed asset at the runtime
cache makes it report seven errors — the site cache has no addressed file, and all
six stylesheets are missing offline. A check that cannot fail is the failure this
repository has had before.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
from pathlib import Path

import pytest

from textbook import portal
from textbook.book import repo_root

pytestmark = pytest.mark.browser

SITE = repo_root() / "site"
TOOLS = repo_root() / "tools" / "dist" / "cli.js"

#: The page the check reads. It carries figures, so an addressed module and the
#: stable-named loader are both exercised.
ROUTE = "/gcse-maths/higher/chapter-1/section-1.1/learn/"

PLAYWRIGHT_CANDIDATES = (
    "playwright",
    "/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright",
)


def _playwright_available() -> bool:
    candidates = [os.environ.get("PLAYWRIGHT_PATH"), *PLAYWRIGHT_CANDIDATES]
    for candidate in candidates:
        if not candidate:
            continue
        result = subprocess.run(
            ["node", "-e", f"require({json.dumps(candidate)})"],
            capture_output=True,
            text=True,
            check=False,
        )
        if result.returncode == 0:
            return True
    return False


def _require_browser() -> None:
    """Skip loudly when the browser runtime is missing."""
    if shutil.which("node") is None:
        pytest.skip("node is not on PATH; the offline check cannot run")
    if not TOOLS.is_file():
        pytest.skip("tools/dist is not built; run `node tools/build.mjs`")
    if not _playwright_available():
        pytest.skip("playwright is not installed; set PLAYWRIGHT_PATH")


def _require_environment() -> None:
    """Skip loudly, never pass quietly: "did not look" is not "looked and it was fine"."""
    _require_browser()
    if not (SITE / "sw.js").is_file() or not (SITE / "index.html").is_file():
        pytest.skip("site/ is not built; run scripts/check.sh first")


def _plant_site(root: Path, *, loader_tag: str) -> str:
    """Write a minimal self-contained site with the real service worker and prefetch."""
    root.mkdir(parents=True, exist_ok=True)
    (root / "sw.js").write_text(portal.service_worker(), encoding="utf-8")
    (root / "manifest.webmanifest").write_text(portal.manifest(), encoding="utf-8")
    (root / "index.html").write_text("<!doctype html><h1>Home</h1>", encoding="utf-8")

    sheets = root / "demo" / "assets" / "stylesheets"
    sheets.mkdir(parents=True)
    (sheets / "book.deadbeef.css").write_text("body { margin: 0; }\n", encoding="utf-8")

    offline_dir = root / "demo" / "assets" / "offline"
    offline_dir.mkdir(parents=True)
    shutil.copyfile(repo_root() / "assets" / "offline" / "offline.js", offline_dir / "offline.js")

    prose = " ".join(["Enough text to pass the offline prose check."] * 15)
    route = "/demo/chapter-1/section-1.1/learn/"
    learn = root / "demo" / "chapter-1" / "section-1.1" / "learn"
    learn.mkdir(parents=True)
    (learn / "index.html").write_text(
        "<!doctype html><html><head>"
        '<link rel="stylesheet" href="../../../assets/stylesheets/book.deadbeef.css">'
        '<script src="../../../assets/offline/offline.js" defer></script>'
        f"{loader_tag}"
        "<script>navigator.serviceWorker.register('/sw.js');</script>"
        "</head><body>"
        '<nav class="sidebar"><details open><summary>Chapter 1</summary>'
        '<a href="../../section-1.2/learn/">Next</a></details></nav>'
        f"<main><h1>Section 1.1</h1><p>{prose}</p></main>"
        "</body></html>",
        encoding="utf-8",
    )

    sibling = root / "demo" / "chapter-1" / "section-1.2" / "learn"
    sibling.mkdir(parents=True)
    (sibling / "index.html").write_text(
        "<!doctype html><html><head>"
        '<link rel="stylesheet" href="../../../assets/stylesheets/book.deadbeef.css">'
        "</head><body>"
        f"<main><h1>Section 1.2</h1><p>{prose}</p></main>"
        "</body></html>",
        encoding="utf-8",
    )
    return route


def test_a_book_still_reads_after_a_deploy_empties_the_runtime_cache():
    _require_environment()
    result = subprocess.run(
        ["node", str(TOOLS), "offline", str(SITE), "--route", ROUTE],
        capture_output=True,
        text=True,
        check=False,
        cwd=repo_root(),
    )
    assert result.returncode == 0, (
        "a book did not survive a deploy with the network off.\n"
        f"{result.stdout[-4000:]}\n{result.stderr[-4000:]}"
    )
    # And it examined something: the summary always states the count, so an empty run
    # cannot read as a clean one.
    assert "0 errors" in result.stdout, result.stdout
    assert "cache checks examined" in result.stdout, result.stdout


def test_the_whole_book_downloads_and_reads_with_the_network_off():
    """The reader's own button, pressed and then read from a chapter never opened.

    This is the slow half: a full `gcse-maths/higher` is 458 pages and 35 MB, and
    the download is sequential on purpose. It is here rather than in the gate
    because it belongs in the same `browser` sweep as the figure measurement.
    """
    _require_environment()
    manifest = json.loads((SITE / "gcse-maths" / "higher" / "assets" / "manifest.json").read_text())
    if len(manifest.get("pages", {})) < 100:
        pytest.skip("site/ holds a subset build; run scripts/check.sh for a full book")
    result = subprocess.run(
        ["node", str(TOOLS), "offline", str(SITE), "--download"],
        capture_output=True,
        text=True,
        check=False,
        cwd=repo_root(),
    )
    assert result.returncode == 0, (
        "the downloaded book did not read offline.\n"
        f"{result.stdout[-4000:]}\n{result.stderr[-4000:]}"
    )
    assert "0 errors" in result.stdout, result.stdout


def test_the_offline_check_is_wired_into_the_help_index():
    """A check nobody can find is a check nobody runs."""
    _require_environment()
    result = subprocess.run(
        ["node", str(TOOLS), "help"],
        capture_output=True,
        text=True,
        check=False,
        cwd=repo_root(),
    )
    assert "offline" in result.stdout
    assert "--route" in result.stdout


def test_offline_fetches_the_loader_url_named_by_the_page(tmp_path):
    """A planted page naming its loader at an unusual path has that path fetched.

    The script tag uses `nomodule` so Chromium's own HTML loader ignores it; the
    only way the loader can reach the runtime cache is if `offline` resolves the
    URL from the page and fetches it itself.
    """
    _require_browser()
    site = tmp_path / "site"
    unusual = site / "unusual" / "loaders"
    unusual.mkdir(parents=True)
    (unusual / "figures.js").write_text("export {};\n", encoding="utf-8")
    (unusual / "kit.js").write_text("export {};\n", encoding="utf-8")

    route = _plant_site(
        site,
        loader_tag='<script nomodule src="/unusual/loaders/figures.js"></script>',
    )
    result = subprocess.run(
        ["node", str(TOOLS), "offline", str(site), "--route", route],
        capture_output=True,
        text=True,
        check=False,
        cwd=repo_root(),
    )
    assert result.returncode == 0, (
        "offline did not fetch the unusual loader path declared by the page.\n"
        f"{result.stdout[-4000:]}\n{result.stderr[-4000:]}"
    )
    assert "6 cache checks examined" in result.stdout, result.stdout
    assert "0 errors" in result.stdout, result.stdout


def test_offline_fails_cleanly_when_the_page_has_no_loader(tmp_path):
    """A page with no figure loader fails with the runtime-cache message.

    A decoy file is placed at `<route>/assets/figures/figures.js` so the old
    hand-built concatenation would spuriously succeed if it ever returned.
    """
    _require_browser()
    site = tmp_path / "site"
    route = _plant_site(site, loader_tag="")
    decoy = site / "demo" / "chapter-1" / "section-1.1" / "learn" / "assets" / "figures"
    decoy.mkdir(parents=True)
    (decoy / "figures.js").write_text("export {};\n", encoding="utf-8")

    result = subprocess.run(
        ["node", str(TOOLS), "offline", str(site), "--route", route],
        capture_output=True,
        text=True,
        check=False,
        cwd=repo_root(),
    )
    assert result.returncode == 1, result.stdout + result.stderr
    assert "the figure loader did not reach the runtime cache" in result.stdout, result.stdout
