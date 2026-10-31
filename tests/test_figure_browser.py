"""Every figure, under every bundle, measured in a browser.

`tools audit` answers a question the source cannot: what does a
figure *actually paint*? The classes a module applies, and the property SVG uses
for each of them, are not visible in the module — `.text-accent` setting `color`
looked correct and left eighteen SVG labels painted black at 1.4:1 on the dark
scheme. Only a browser settles it.

The default gate measures every figure once, under the default bundle, in
`scripts/preview-themes.sh`. This file is the sweep across **all six** bundles,
which is the part that is too slow to run on every push: twelve minutes against
two. It is marked `browser` and deselected by default (see `pyproject.toml`), so
the coverage exists and is one flag away rather than absent:

    scripts/check.sh && uv run python -m pytest -m browser

**Why the sweep is still worth having when the static check is exhaustive.**
`test_every_bundle_and_subject_pair_is_readable` proves the figure *tokens* clear
their thresholds in all six bundles, all four books and both schemes. That is a
proof about colours. It says nothing about *structure* — which class lands on which
element, and whether an element is painted at all — and structure could in
principle be bundle-dependent, because a bundle may refuse the subject tint with
`fixed:` and supply its own palette. One bundle's measurement was taken as evidence
for all six; this file is what turns that assumption into a check.

The last test here is the guard: it asserts the six runs do not agree, because a
`--theme` flag that never reaches the page would make every bundle pass by being
the same measurement six times.
"""

from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path

import pytest

from textbook import themes
from textbook.book import repo_root

SITE = repo_root() / "site"
# One entry point: the checks live behind `tools`, so a test invokes the same
# command a person does rather than a module inside it.
TOOLS = repo_root() / "tools" / "dist" / "cli.js"

# Playwright is not a package.json dependency: it is needed only by the two
# browser scripts, and `npm ci` would download three browsers for them. The
# loader in each script tries `PLAYWRIGHT_PATH`, then the bare specifier, then a
# mise install, so a missing client is an environment fact rather than a defect
# in this test.
PLAYWRIGHT_CANDIDATES = (
    "playwright",
    "/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright",
)


def _playwright_available() -> bool:
    import os

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


def _bundle_ids() -> list[str]:
    discovered = themes.discover_bundles()
    bundles = discovered.values() if isinstance(discovered, dict) else discovered
    return sorted(bundle.id for bundle in bundles)


BUNDLES = _bundle_ids()


def _require_environment() -> None:
    """Skip, loudly, when this test cannot run — but never pass quietly.

    A skip is reported by pytest, so an unrun sweep is visible in the output rather
    than confused with a clean one. That distinction matters here: the whole point
    of the audit is that it does not read the source, so "I could not look" and "I
    looked and it was fine" must not produce the same line of output.
    """
    if shutil.which("node") is None:
        pytest.skip("node is not on PATH; the browser audit cannot run")
    if not SITE.is_dir() or not (SITE / "index.html").is_file():
        pytest.skip(
            "site/ is not built; run scripts/check.sh or "
            "`uv run python -m textbook.pipeline` first"
        )
    if not _playwright_available():
        pytest.skip("playwright is not installed; set PLAYWRIGHT_PATH")


def measure(bundle: str, out: Path) -> dict:
    _require_environment()
    result = subprocess.run(
        ["node", str(TOOLS), "audit", str(SITE), "--theme", bundle, "--json", str(out)],
        capture_output=True,
        text=True,
        check=False,
        cwd=repo_root(),
    )
    assert result.returncode == 0, (
        f"the figure audit failed under the {bundle!r} bundle.\n"
        f"{result.stdout[-4000:]}\n{result.stderr[-4000:]}"
    )
    return json.loads(out.read_text(encoding="utf-8"))


@pytest.fixture(scope="module")
def sweeps(tmp_path_factory) -> dict[str, dict]:
    """Every bundle measured once, shared by both tests below.

    Module-scoped because the measurement is the expensive part — six bundles is
    twelve minutes — and the two tests ask different questions of the same six
    runs. Measuring per test would double it for no extra evidence.
    """
    out = tmp_path_factory.mktemp("figure-sweep")
    return {bundle: measure(bundle, out / f"{bundle}.json") for bundle in BUNDLES}


@pytest.mark.browser
@pytest.mark.parametrize("bundle", BUNDLES, ids=BUNDLES)
def test_every_figure_is_visible_under_every_bundle(bundle, sweeps):
    """No figure paints anything below its threshold, in either scheme.

    The script does the measuring and fails on a finding; this asserts it ran, so a
    bundle that measured nothing cannot pass by measuring nothing.
    """
    report = sweeps[bundle]

    assert report, f"the audit returned no figures under {bundle!r}"
    unmeasured = [
        f"{slug}[{scheme}]"
        for slug, entry in report.items()
        for scheme, result in entry["schemes"].items()
        if result.get("error")
    ]
    assert not unmeasured, f"figures could not be measured under {bundle!r}: {unmeasured}"

    # A sweep that measured nothing would pass every threshold. The count that can
    # be compared across bundles is the number of figures and schemes *measured* —
    # 128 x 2 either way, because the DOM does not change with the palette. The
    # number of distinct *paints* cannot be: `clean` refuses the subject tint, so
    # its accent, warn and good legitimately collapse to one colour and it reports
    # fewer. Comparing that number across bundles was this test's first bug, and it
    # was the test that was wrong, not a bundle.
    painted = sum(
        len(result["paints"])
        for entry in report.values()
        for result in entry["schemes"].values()
    )
    assert painted > 0, (
        f"the audit found no paint at all under {bundle!r}; a sweep that measures "
        "nothing would pass every threshold"
    )

    baseline = sweeps[BUNDLES[0]]
    assert set(report) == set(baseline), (
        f"{bundle!r} measured a different set of figures than {BUNDLES[0]!r}: "
        f"{sorted(set(report) ^ set(baseline))[:8]}"
    )
    for slug, entry in report.items():
        assert set(entry["schemes"]) == {"light", "dark"}, (
            f"{bundle!r} measured {sorted(entry['schemes'])} for {slug!r}, not both schemes"
        )


@pytest.mark.browser
def test_the_bundle_sweep_is_not_the_same_measurement_six_times(sweeps):
    """The guard on the sweep: `--theme` must reach the page.

    If it did not, all six bundles would return identical colours and every one of
    them would pass by being the same measurement — the sweep would look thorough
    and prove nothing. Two bundles that agree on every figure would mean the flag,
    the stored preference or the bundle lookup is broken.
    """

    def paints(report: dict, slug: str) -> list:
        return [p["rgb"] for p in report[slug]["schemes"]["light"]["paints"]]

    baseline = sweeps[BUNDLES[0]]
    shared = set(baseline)
    for report in sweeps.values():
        shared &= set(report)
    assert shared, "the bundles measured disjoint sets of figures"

    identical = []
    for bundle in BUNDLES[1:]:
        figures = [slug for slug in shared if paints(sweeps[bundle], slug)]
        if figures and all(
            paints(sweeps[bundle], slug) == paints(baseline, slug) for slug in figures
        ):
            identical.append(bundle)

    assert not identical, (
        f"{identical} measured exactly what {BUNDLES[0]!r} measured, on every figure. "
        "A bundle that resolves to another bundle's colours means the theme never "
        "reached the page, and this sweep is six copies of one measurement."
    )


# --- phone legibility ---------------------------------------------------------
#
# These books are read on phones, and 70 of the figures once rendered their
# smallest label below 7px at a 390px viewport — median 6.9px, worst 4.4px. The
# cause was one shared habit: about 60 modules pinned a pixel `height` equal to
# their viewBox height, so at phone width the *drawing* scaled down while the box
# did not. Nothing failed; the labels were simply too small to read.
#
# The check lives in `tools audit --mobile`, which already drives a
# browser over every page carrying a figure. It has to be a browser measurement: a
# module's `font-size` says nothing on its own, because the SVG scales by
# `rendered width / viewBox width`, so a 560-unit viewBox in a 358px panel draws a
# 14px label at 8px.


@pytest.mark.browser
def test_every_figure_label_is_readable_at_phone_width(tmp_path):
    """No figure draws a label below 9px at a 390px viewport.

    Nine is a floor rather than a target. Browser default text is about 16px and a
    prose minimum would be 12, but these are diagrams, where an axis tick may
    reasonably be smaller than a sentence. Nine is where a reader stops being able
    to read it at all.
    """
    _require_environment()
    result = subprocess.run(
        ["node", str(TOOLS), "audit", str(SITE), "--mobile", "--json", str(tmp_path / "mobile.json")],
        capture_output=True,
        text=True,
        check=False,
        cwd=repo_root(),
    )
    assert result.returncode == 0, (
        "a figure draws a label too small to read at 390px.\n"
        f"{result.stdout[-3000:]}\n{result.stderr[-2000:]}"
    )
    measured = json.loads((tmp_path / "mobile.json").read_text(encoding="utf-8"))
    assert len(measured) > 100, (
        f"only {len(measured)} figures measured; the sweep is too narrow to mean anything"
    )


# --- the kit's own contract ---------------------------------------------------
#
# 73 modules build on `assets/figures/kit.js`, and its guarantees are DOM
# behaviour, so they are checked in a browser. The kit is where the accessibility
# contract now lives: it is what puts `role="img"` on a drawing, keeps it off a
# readout, and refuses to give an SVG a fixed height. A defect in it would reach
# every converted figure at once, which is why it is worth a check of its own.
#
# `tools kit` holds the assertions and the reasons; this only
# runs it, the way the other tests here run the audit.


@pytest.mark.browser
def test_the_kit_keeps_the_contract_it_exists_to_keep():
    """Every guarantee `kit.js` makes, checked rather than assumed.

    Each one is a defect that reached production before the kit existed:
    `role="img"` on a live readout (four modules), a fixed pixel `height` that
    shrank a phone's labels (70 modules), `fmt` obeyed when called as a `map`
    callback, and a signed number with no space.
    """
    _require_environment()
    checker = repo_root() / "tools" / "dist" / "commands" / "kit.js"
    assert checker.is_file(), "the kit check is missing"
    result = subprocess.run(
        ["node", str(TOOLS), "kit", str(SITE)],
        capture_output=True,
        text=True,
        check=False,
        cwd=repo_root(),
    )
    assert result.returncode == 0, (
        "the shared figure kit no longer keeps its contract.\n"
        f"{result.stdout[-2000:]}\n{result.stderr[-3000:]}"
    )


def test_every_figure_draws_inside_its_own_canvas():
    """`tools canvas site`, in the gate rather than only in the preview script.

    The auditor's objection to item 156 was exact: `canvas --cases` ran under plain
    `node`, but nothing ran the sweep over the site, so `pytest` passed while a label sat
    four units outside a frame on the built page. This runs the sweep where a browser is
    available and skips where it is not — and a skip is printed, so "could not look" and
    "looked and it was fine" never read the same.
    """
    _require_environment()
    result = subprocess.run(
        ["node", str(TOOLS), "canvas", str(SITE)],
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, (
        "a figure draws outside its own viewBox.\n"
        f"{result.stdout[-3000:]}\n{result.stderr[-1500:]}"
    )
    assert "figures examined" in result.stdout, result.stdout[-500:]
