"""Chapter 1's prose numbers, recomputed from the models that produce them.

`sources.yaml` says every number in a figure is computed by the model the page describes.
The prose was the part that drifted: `mechanism.js` adopted the package's four chassis points,
the numbers typed against the geometry before that stayed in the pages, and nothing recomputed
them. Five of them contradicted the figure on the same page (`.agents/todo.md` item 88), and the
tell was §1.2's agreement panel disagreeing with the readout of the figure beside it.

This file is the guard, built the way `test_maths_applied_ladder.py` is: it runs the model,
reads the number out of the page, and compares at the precision the page prints. `mechanism.js`
is DOM-free by design, so `node` alone recomputes §1.2, §1.4 and §1.5; `trajectory.js` does the
same for §1.6. No browser is needed, and no number here is typed twice.

Two decisions are pinned here rather than left to the prose, because each had two defensible
answers and the chapter had been carrying both:

* **§1.4's singular values are the design pose's** — the pose §1.2's table starts from, the one
  the section's own panel prints, and the one the figures mount in. The bump end gives
  (1.430, 0.978, 0), a different set, and the section now names one pose on every page.
* **§1.5 and the Review state the rigid model's own numbers** (1.95°, −1.87° to +0.08°) and
  name the export's 1.91° as the export's. The section's argument is a comparison between two
  models, so a number that belongs to one of them cannot be called by the other's name.
"""

from __future__ import annotations

import json
import re
import shutil
import subprocess

import pytest

from textbook.book import repo_root

DATA = repo_root() / "books" / "maths-applied" / "docs" / "assets" / "data"
CHAPTER = repo_root() / "books" / "maths-applied" / "docs" / "Chapter 1"
#: The page prints a true minus sign, so a number it prints has to be read with one.
MINUS = "\u2212"
TRAVELS = (-40.0, -20.0, 0.0, 20.0, 40.0)

#: The model's answers, printed as JSON by `node`. It imports the same modules the figures
#: import — nothing here re-implements the solver, and the kernel sweep is the figure's own:
#: the geometry `mechanism.js` holds, 21 samples over the chapter's 80 mm of travel, and the
#: sign flip into this book's camber convention.
_SCRIPT = (
    "const BASE = " + json.dumps(str(DATA)) + ";\n"
    + """
const { GEOMETRY, GROUND, FRONT, pose, thetaFor, legsJacobian, singularValues } =
  await import(BASE + "/mechanism.js");
const kernel = await import(BASE + "/otkd/models/double-wishbone/kernel/kernel.js");
const quarter = await import(BASE + "/quarter-car/trajectory.js");

const at = (travel) => {
  const theta = thetaFor(travel);
  const point = pose(theta);
  return {
    travel,
    theta: (theta * 180) / Math.PI,
    camber: point.camber,
    lateral: point.ic[0],
    height: point.ic[1] - GROUND,
    roll: (point.rc[1] - GROUND) * 1000,
    track: point.W[0] * 1000,
  };
};
const droop = at(-40);
const rest = at(0);
const bump = at(40);

const unit = (vector) => {
  const length = Math.hypot(...vector);
  return vector.map((value) => value / length);
};
const sub = (a, b) => a.map((value, index) => value - b[index]);
const length = sub;

await kernel.ready();
if (kernel.setGeometry({
  points: {
    lcaf: GEOMETRY.lcaf, lcar: GEOMETRY.lcar, lbj: GEOMETRY.lbj,
    ucaf: GEOMETRY.ucaf, ucar: GEOMETRY.ucar, ubj: GEOMETRY.ubj,
    wc: GEOMETRY.wc, wco: GEOMETRY.wco, tri: GEOMETRY.tri, tro: GEOMETRY.tro,
  },
  axes: {
    "lca-axis": unit(length(GEOMETRY.lcar, GEOMETRY.lcaf)),
    "uca-axis": unit(length(GEOMETRY.ucar, GEOMETRY.ucaf)),
  },
  numbers: [null],
}) !== 0) throw new Error("the kernel rejected the book's geometry");

const SAMPLES = 21;
let worst = 0;
for (let index = 0; index < SAMPLES; index += 1) {
  const travel = -40 + (80 * index) / (SAMPLES - 1);
  const theta = thetaFor(travel);
  kernel.design();
  kernel.setDrive(theta);
  if (!(kernel.solve(60) >= 0)) throw new Error(`the kernel did not converge at ${travel} mm`);
  const difference = Math.abs(-kernel.metrics().camber - (pose(theta).camber - rest.camber));
  if (difference > worst) worst = difference;
}

// The wishbone's two legs in three dimensions, which is what the front view cannot copy.
const leg = (a, b) => Math.hypot(...a.map((value, index) => value - b[index]));
const travel = quarter.rows.map((row) => row.travel);
const peaks = [];
for (let index = 1; index < travel.length - 1; index += 1) {
  if (travel[index] > travel[index - 1] && travel[index] >= travel[index + 1]) {
    peaks.push(quarter.rows[index].t);
  }
}

console.log(JSON.stringify({
  rows: [-40, -20, 0, 20, 40].map(at),
  change: bump.camber - droop.camber,
  bumpFromRest: bump.camber - rest.camber,
  trackNarrowing: 2 * (rest.track - bump.track),
  kernelWorst: worst,
  sigma: singularValues(legsJacobian(pose(thetaFor(0)).D, pose(thetaFor(0)).C)),
  arm: FRONT.RB,
  legs: [leg(GEOMETRY.ubj, GEOMETRY.ucaf), leg(GEOMETRY.ubj, GEOMETRY.ucar)],
  quarter: {
    travel: Math.max(...travel),
    period: peaks[1] - peaks[0],
    drift: quarter.meta.energy_drift,
  },
}));
"""
)


@pytest.fixture(scope="module")
def model() -> dict:
    """Every number this file checks, from the modules the chapter's figures import."""
    node = shutil.which("node")
    if node is None:
        pytest.skip("node is not on PATH, so the book's models cannot be recomputed")
    done = subprocess.run(
        [node, "--input-type=module", "-e", _SCRIPT],
        capture_output=True,
        text=True,
        check=False,
    )
    assert done.returncode == 0, f"node could not run the models: {done.stderr.strip()}"
    return json.loads(done.stdout)


def page(where: str) -> str:
    """A chapter page, from its directory: `<section>/Walkthrough`, `Review`, `<section>/Deeper/<slug>`."""
    return (CHAPTER / where / "index.md").read_text(encoding="utf-8")


def numbers(text: str) -> list[float]:
    """Every number in a piece of page text, with the page's true minus signs read."""
    found = re.findall(rf"[{MINUS}-]?\d+(?:\.\d+)?", text)
    return [float(value.replace(MINUS, "-")) for value in found]


def table(text: str) -> list[list[str]]:
    """Every table row in a page, as cells; the header separator is dropped."""
    found = []
    for line in text.splitlines():
        line = line.strip()
        if not line.startswith("|"):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) < 2 or set(cells[0]) <= set("-: "):
            continue
        found.append(cells)
    return found


def row(text: str, label: str) -> list[str]:
    """The cells after the first, for the one table row whose first cell is `label`."""
    matches = [cells[1:] for cells in table(text) if cells[0] == label]
    assert len(matches) == 1, f"the page has {len(matches)} rows labelled {label!r}"
    return matches[0]


def stated(pattern: str, text: str) -> float:
    """One number the page prints, found by a pattern anchored on the words around it."""
    match = re.search(pattern, text)
    assert match, f"the page no longer states {pattern!r}"
    return float(match.group(1).replace(MINUS, "-"))


def poses(text: str) -> dict[float, list[str]]:
    """§1.2's table of poses, keyed by wheel travel in millimetres."""
    found = {}
    for cells in table(text):
        match = re.fullmatch(rf"([+{MINUS}-]?\d+) mm", cells[0])
        if match:
            found[float(match.group(1).replace(MINUS, "-"))] = cells[1:]
    return found


# --- §1.2: the front view, pose by pose ---------------------------------------


def test_section_1_2_publishes_a_row_for_each_end_of_the_travel():
    assert sorted(poses(page("Section 1.2/Walkthrough"))) == list(TRAVELS)


@pytest.mark.parametrize("travel", TRAVELS)
def test_the_travel_table_is_the_front_views(model, travel):
    """The five-row table: arm angle, camber, instant centre and roll centre."""
    arms, camber, centre, roll = poses(page("Section 1.2/Walkthrough"))[travel]
    pose = next(point for point in model["rows"] if point["travel"] == travel)

    assert round(numbers(arms)[0], 1) == round(pose["theta"], 1)
    assert round(numbers(camber)[0], 2) == round(pose["camber"], 2)

    lateral, height = numbers(centre)
    assert round(lateral, 2) == round(abs(pose["lateral"]), 2)
    assert ("inboard" if pose["lateral"] < 0 else "outboard") in centre
    assert round(height, 2) == round(abs(pose["height"]), 2)
    assert ("up" if pose["height"] > 0 else "down") in centre

    assert round(numbers(roll)[0], 0) == round(pose["roll"], 0)


def test_the_track_narrowing_is_the_front_views(model):
    """Two sides of the car, so twice the wheel's own inboard movement."""
    text = page("Section 1.2/Walkthrough")
    found = stated(r"the track narrows by \*\*([\d.]+) mm\*\*", text)
    assert found == round(model["trackNarrowing"], 1)


def test_the_bump_half_is_not_the_average_rate(model):
    """The bullets after the camber change exist because the curve is not straight."""
    text = page("Section 1.2/Walkthrough")
    rate = stated(r"that is \*\*([\d.]+)° per millimetre\*\*", text)
    assert rate == round(model["change"] / 80, 3)

    found = stated(r"40 mm of bump from rest is worth \*\*([\d.]+)°\*\*", text)
    assert found == round(model["bumpFromRest"], 2)
    assert round(model["change"] / 2, 2) != found, (
        "the average rate over the whole travel now predicts the bump half, so the "
        "reason the page gives for the two numbers differing is gone"
    )


def test_the_kernel_agreement_is_the_sweeps_worst_difference(model):
    """The panel's number is the figure's number: one sweep, two places to read it."""
    cell = row(
        page("Section 1.2/Walkthrough"), "Camber from the generated kernel in three dimensions"
    )[0]
    assert round(numbers(cell)[0], 3) == round(model["kernelWorst"], 3)


# --- the rigid model's change, on every page that states it -------------------


def _rigid_change_1_2(text: str) -> tuple[float, float, float]:
    change = stated(r"camber moves \*\*([\d.]+)°\*\* from one end of the travel", text)
    low, high = numbers(row(text, "Camber over the whole travel, from the construction above")[0])
    return change, low, high


def _rigid_change_1_5(text: str) -> tuple[float, float, float]:
    match = re.search(
        r"rigid model gives a camber change of \*\*([\d.]+)°\*\*, from\s+([\d.−-]+)° at "
        r"40 mm of droop to\s+(\+?[\d.−-]+)° at 40 mm of bump",
        text,
    )
    assert match, "§1.5 no longer states the rigid model's change and both endpoints"
    return tuple(float(group.replace(MINUS, "-")) for group in match.groups())  # type: ignore[return-value]


def _rigid_change_review(text: str) -> tuple[float, float, float]:
    match = re.search(
        r"The camber moves \*\*([\d.]+)°\*\* over that travel: from\s+([\d.−-]+)° at "
        r"40 mm of droop to\s+(\+?[\d.−-]+)° at 40 mm of bump",
        text,
    )
    assert match, "the Review no longer states the rigid model's change and both endpoints"
    return tuple(float(group.replace(MINUS, "-")) for group in match.groups())  # type: ignore[return-value]


def test_three_pages_state_the_same_rigid_change(model):
    """§1.2, §1.5 and the Review: one change, one pair of endpoints, the rigid model's."""
    expected = (
        round(model["change"], 2),
        round(model["rows"][0]["camber"], 2),
        round(model["rows"][-1]["camber"], 2),
    )
    agreed = {
        "Section 1.2": _rigid_change_1_2(page("Section 1.2/Walkthrough")),
        "Section 1.5": _rigid_change_1_5(page("Section 1.5/Walkthrough")),
        "Review": _rigid_change_review(page("Review")),
    }
    assert agreed == dict.fromkeys(agreed, expected), (
        "the chapter no longer agrees on the rigid model's camber change; the export's own "
        "1.91° belongs to the export, and to call it the rigid model's is drift"
    )


def test_section_1_5_keeps_the_export_s_number_named_as_the_exports(model):
    """The export's 100 MN/m row stands beside the rigid model's, named as itself."""
    text = page("Section 1.5/Walkthrough")
    assert stated(r"or ([\d.]+)° for a\s+40 mm bump from rest", text) == round(
        model["bumpFromRest"], 2
    )
    assert stated(r"The export's ladder gives ([\d.]+)° at 100 MN/m", text) == 1.91


# --- §1.4: the decomposition, and the projection ------------------------------


def test_the_singular_values_are_one_pose_on_both_pages(model):
    """The section, its panel and the depth page carry the design pose's set."""
    expected = [round(value, 3) for value in model["sigma"]]
    section = page("Section 1.4/Walkthrough")

    display = re.search(r"\\sigma = \\left\(([^)]*)\\right\)", section)
    assert display, "§1.4 no longer prints the singular values as a display"
    assert [round(value, 3) for value in numbers(display.group(1))] == expected

    panel = row(section, "Singular values of the three-row Jacobian at the design pose")[0]
    assert [round(value, 3) for value in numbers(panel)] == expected

    depth = page("Section 1.4/Deeper/singular-values")
    for index, label in enumerate(("σ₁", "σ₂", "σ₃")):
        assert round(numbers(row(depth, label)[0])[0], 3) == expected[index]
    ratio = numbers(row(depth, "σ₁ / σ₂")[0])[0]
    assert round(ratio, 2) == round(model["sigma"][0] / model["sigma"][1], 2)


def test_the_arm_lengths_are_the_view_and_the_wishbones_legs(model):
    """The paragraph's point: a projection is not a rigid copy of either leg."""
    section = page("Section 1.4/Walkthrough")
    match = re.search(
        r"front\s+view is ([\d.]+) m long, and the two legs of the real wishbone are\s+"
        r"([\d.]+) m and\s+([\d.]+) m",
        section,
    )
    assert match, "§1.4 no longer states the front view's arm and the two legs' lengths"

    arm, *legs = (float(group) for group in match.groups())
    assert round(arm, 5) == round(model["arm"], 5)
    assert [round(leg, 5) for leg in legs] == [round(leg, 5) for leg in model["legs"]]
    assert arm < min(legs), "the front view's arm is no longer shorter than either leg"

    gaps = [round((leg - arm) * 1000) for leg in legs]
    assert numbers(re.search(r"shorter than either leg, by \d+ mm and \d+ mm", section).group(0)) == gaps


# --- §1.6: the trajectory -----------------------------------------------------


def test_section_1_6_states_the_trajectorys_numbers(model):
    """The quarter car's peak travel, its period and the integrator's energy drift."""
    text = page("Section 1.6/Walkthrough")
    quarter = model["quarter"]

    assert numbers(row(text, "travel, repeated")[0])[-1] == round(quarter["travel"], 1)
    period, frequency = numbers(row(text, "period, and frequency")[0])
    assert period == round(quarter["period"], 3)
    assert frequency == round(1 / quarter["period"], 1)
    assert numbers(row(text, "energy drift over 601 steps")[0])[0] == round(
        quarter["drift"] * 1e8, 1
    )
