"""§1.5's ladder is the vendored export's, not a table someone typed.

The section's table comes from the package's own sweep of the bush at the upper ball joint
(`double-wishbone-ubj`), vendored under `docs/assets/data/otkd/`. This test reads that payload and
requires every cell of the page's table to round to what the export says, so a release that moves
the ladder fails here rather than leaving a page quoting a model the book no longer ships.

Two conventions have to be applied on the way, and they are the page's own:

* the export's camber is positive with the top of the wheel **outboard**; §1.2's is the opposite,
  and the page's design position carries a static **-1.0°** (`CAMBER0` in `mechanism.js`);
* the export's travel is measured from its own loaded rest pose, so "over the travel" here means
  **±40 mm** about it, the band the page's figure draws.

The section's front view is the same experiment — same geometry, same load, applied at the wheel
centre — and agrees with the export to 0.04°, which the figure's own claim checks in the browser.
"""

from __future__ import annotations

import json
import math
import re
import shutil
import subprocess
from pathlib import Path

import pytest

from textbook.book import repo_root

BUNDLE = repo_root() / "books" / "maths-applied" / "docs" / "assets" / "data" / "otkd"
PAYLOAD = BUNDLE / "models" / "double-wishbone-ubj" / "out.js"
SECTION = (
    repo_root()
    / "books"
    / "maths-applied"
    / "docs"
    / "Chapter 1"
    / "Section 1.5"
    / "Walkthrough"
    / "index.md"
)
CAMBER0 = -1.0
STIFFNESS = (0.2, 1.0, 10.0, 100.0)
#: Decimal places per column, as the page prints them. The last row's difference carries three
#: figures because two would print a zero for a number that is not zero.
PLACES = {
    "bush": (1, 2, 2, 3),
    "rest": (2, 2, 2, 2),
    "difference": (2, 2, 2, 3),
    "change": (2, 2, 2, 2),
}


def _text() -> str:
    return PAYLOAD.read_text(encoding="utf-8")


def _frames() -> list[dict]:
    return [
        json.loads(line.strip().rstrip(","))
        for line in _text().splitlines()
        if line.strip().startswith('{"theta"')
    ]


def _axis_values() -> list[float]:
    match = re.search(r'  "axes": (.*),$', _text(), re.M)
    assert match, "the ubj payload carries no axes"
    return json.loads(match.group(1))[0]["values"]


def _interpolate(pairs: list[tuple[float, float]], target: float) -> float:
    for (t0, c0), (t1, c1) in zip(pairs, pairs[1:]):
        if t0 <= target <= t1:
            return c0 + (c1 - c0) * (target - t0) / (t1 - t0)
    raise AssertionError(f"{target} is outside the sweep")


def ladder() -> dict[float, dict[str, float]]:
    """The four columns §1.5 prints, in the page's conventions, from the vendored payload."""
    frames = _frames()
    out: dict[float, dict[str, float]] = {}
    for stiffness, value in zip(STIFFNESS, _axis_values()):
        rows = [frame for frame in frames if frame["axis"][0] == value]
        rest = min(rows, key=lambda frame: abs(frame["theta"]))
        z = rest["points"]["wc"][2]
        travel = [(frame["points"]["wc"][2] - z) * 1000 for frame in rows]
        camber = [CAMBER0 - frame["camber"] for frame in rows]
        pairs = sorted(zip(travel, camber))
        at_rest = camber[rows.index(rest)]
        out[stiffness] = {
            "bush": math.dist([0.0] * 3, list(rest["springs"].values())) * 1000,
            "rest": at_rest,
            "difference": at_rest - CAMBER0,
            "change": _interpolate(pairs, 40.0) - _interpolate(pairs, -40.0),
        }
    return out


def page_table() -> dict[float, list[str]]:
    """The ladder table as the page prints it, keyed by stiffness."""
    rows: dict[float, list[str]] = {}
    for line in SECTION.read_text(encoding="utf-8").splitlines():
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if len(cells) != 5:
            continue
        match = re.fullmatch(r"([0-9.]+) MN/m", cells[0])
        if match:
            rows[float(match.group(1))] = cells[1:]
    assert len(rows) == len(STIFFNESS), f"§1.5's table has {len(rows)} stiffness rows"
    return rows


def _number(cell: str) -> float:
    return float(cell.replace("−", "-").rstrip("°").removesuffix("mm").strip())


@pytest.mark.parametrize("stiffness", STIFFNESS)
def test_every_cell_of_the_ladder_is_the_exports_number(stiffness):
    computed = ladder()[stiffness]
    printed = page_table()[stiffness]
    for column, cell in zip(("bush", "rest", "difference", "change"), printed):
        places = PLACES[column][STIFFNESS.index(stiffness)]
        expected = float(f"{computed[column]:.{places}f}")
        assert _number(cell) == expected, (
            f"{stiffness} MN/m {column}: the page says {cell!r}, the export says "
            f"{computed[column]:.{places}f}"
        )


def crossing() -> float:
    """The stiffness at which the difference at rest reaches a tenth of a degree.

    Log-log interpolation between the two rows either side, because the ladder falls by
    about a decade per decade. §1.5 prints "about 1.8 MN/m"; this recomputes it from the
    export, and `tests/test_reference_books.py` holds the map's page to the same number.
    """
    differences = [abs(ladder()[k]["difference"]) for k in STIFFNESS]
    xs = [math.log10(k) for k in STIFFNESS]
    ys = [math.log10(d) for d in differences]
    for i in range(len(xs) - 1):
        if differences[i] >= 0.1 >= differences[i + 1]:
            share = (ys[i] - math.log10(0.1)) / (ys[i] - ys[i + 1])
            return 10 ** (xs[i] + share * (xs[i + 1] - xs[i]))
    raise AssertionError("the export's ladder does not cross a tenth of a degree")


def test_the_stiffness_a_tenth_of_a_degree_needs_is_the_exports():
    """The section's conclusion, computed rather than typed: 1.8 MN/m."""
    assert round(crossing(), 1) == 1.8, crossing()


# --- the tie-rod ladder: the compliant kernel, in degrees ---------------------

COMPLIANT = (
    BUNDLE
    / "models"
    / "double-wishbone-compliant"
    / "kernel"
    / "kernel.js"
)
TIE_ROD = (1e-7, 3e-7, 1e-6)
TIE_ROD_LABELS = ("10⁻⁷ m/N", "3 × 10⁻⁷ m/N", "10⁻⁶ m/N")

_TIE_ROD_SCRIPT = (
    "const kernel = await import(" + json.dumps(str(COMPLIANT)) + ");\n"
    "await kernel.default.ready();\n"
    "const rows = [];\n"
    "for (const compliance of " + json.dumps(list(TIE_ROD)) + ") {\n"
    "  const run = await kernel.default.frame({\n"
    "    ...kernel.default.manifest.default_geometry,\n"
    "    numbers: [kernel.default.manifest.default_numbers[0], compliance],\n"
    "  }, 0);\n"
    "  rows.push({\n"
    "    compliance,\n"
    "    toe: run.metrics.toe * 180 / Math.PI,\n"
    "    camber: run.metrics.camber * 180 / Math.PI,\n"
    "  });\n"
    "}\n"
    "console.log(JSON.stringify(rows));\n"
)


@pytest.fixture(scope="module")
def tie_rod() -> list[dict]:
    """The compliant kernel's three rows, in degrees, at the page's compliances."""
    node = shutil.which("node")
    if node is None:
        pytest.skip("node is not on PATH, so the compliant kernel cannot be run")
    done = subprocess.run(
        [node, "--input-type=module", "-e", _TIE_ROD_SCRIPT],
        capture_output=True,
        text=True,
        check=False,
    )
    assert done.returncode == 0, f"node could not run the compliant kernel: {done.stderr.strip()}"
    return json.loads(done.stdout)


def tie_rod_rows() -> list[list[str]]:
    """The tie-rod table as the page prints it, one row per compliance."""
    rows = []
    for line in SECTION.read_text(encoding="utf-8").splitlines():
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if len(cells) == 3 and cells[0].endswith("m/N"):
            rows.append(cells)
    assert len(rows) == len(TIE_ROD_LABELS), f"§1.5 has {len(rows)} tie-rod rows"
    return rows


def test_the_tie_rod_ladder_is_the_kernels_degrees(tie_rod):
    """All six cells are the kernel's radians converted on the page, not typed."""
    text = SECTION.read_text(encoding="utf-8")
    assert "radians" in text and "declares degrees" in text, (
        "the page no longer says why the tie-rod table needs a conversion"
    )

    for row, label, expected in zip(tie_rod_rows(), TIE_ROD_LABELS, tie_rod):
        assert row[0] == label
        assert _number(row[1]) == round(expected["toe"], 3)
        assert _number(row[2]) == round(expected["camber"], 4)

    # The prose's factor and size are the table's own, not the old 10⁻⁶…10⁻² span.
    assert round(tie_rod[-1]["toe"] - tie_rod[0]["toe"], 1) == 0.5
    assert round(abs(tie_rod[-1]["camber"] - tie_rod[0]["camber"]), 2) == 0.01
    assert "Ten times softer" in text


def test_the_deflection_sentence_names_the_controls_ends():
    """12 mm and 0.06 mm are the slider's two ends, and the page says so."""
    figure = (
        repo_root()
        / "books"
        / "maths-applied"
        / "docs"
        / "assets"
        / "figures"
        / "stiffness-agreement.js"
    ).read_text(encoding="utf-8")
    control = re.search(r"slider\(el, \{(.*?)\}\)", figure, re.S)
    assert control, "the stiffness figure no longer mounts a slider"
    low = re.search(r"min:\s*([\d.]+)", control.group(1))
    high = re.search(r"max:\s*([\d.]+)", control.group(1))
    assert low and high, "the stiffness figure no longer declares its control's ends"

    text = SECTION.read_text(encoding="utf-8")
    assert f"at the two ends of its control, {low.group(1)} and {high.group(1)} MN/m" in text
    assert "12 mm and\n0.06 mm" in text
    assert "over two orders of magnitude" in text
    assert float(high.group(1)) / float(low.group(1)) >= 100


def test_the_change_tolerance_is_met_by_the_softest_exported_row():
    """§1.5's change tolerance is met by 0.2, not an invented 0.15."""
    assert min(STIFFNESS) == 0.2
    text = SECTION.read_text(encoding="utf-8")
    assert "export's softest row, 0.2 MN/m" in text
    assert "about nine times" in text
    assert round(crossing() / min(STIFFNESS), 0) == 9
    assert "0.15 MN/m" not in text
    assert "twelve times" not in text

