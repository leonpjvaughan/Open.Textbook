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

import ast
import json
import math
import re
import shutil
import subprocess

import pytest
import yaml

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
const { GEOMETRY, GROUND, FRONT, pose, thetaFor, legsJacobian, singularValues,
        leastSquares, upperJoint } = await import(BASE + "/mechanism.js");
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

// §1.6's agreement at 72.35 mm: the current kernel, the trajectory and the front view.
if (kernel.setGeometry(kernel.manifest.default_geometry) !== 0) {
  throw new Error("the kernel rejected its default geometry");
}
let low = -0.2;
let high = 0.3;
let drive = 0;
for (let index = 0; index < 80; index += 1) {
  const middle = (low + high) / 2;
  kernel.design();
  kernel.setDrive(middle);
  if (kernel.solve(80) < 0) break;
  const current = (kernel.world().wc[2] - 0.32) * 1000;
  drive = middle;
  if (current < 72.35) low = middle; else high = middle;
}
kernel.design();
kernel.setDrive(drive);
kernel.solve(80);
const staticCamber = kernel.metrics().camber;
const dynamicRow = quarter.rows.reduce((best, row) =>
  Math.abs(row.travel - 72.35) < Math.abs(best.travel - 72.35) ? row : best);
const frontCamber = pose(thetaFor(72.35)).camber;

// §1.3's iteration at the figure's own start and pose.
const iteration = leastSquares([0.75, 0.6], 5.32 * Math.PI / 180, 5);
const iterationPose = pose(5.32 * Math.PI / 180);
const otherAssembly = upperJoint(pose(0).C)[1];

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
  agreement: {
    travel: dynamicRow.travel,
    dynamic: dynamicRow.camber,
    static: staticCamber,
    difference: Math.abs(staticCamber - dynamicRow.camber),
    front: frontCamber,
    frontDifference: Math.abs(frontCamber + staticCamber),
  },
  iteration: iteration.map((step) => ({
    k: step.k,
    norm: step.norm * 1000,
    sigma: step.sigma,
  })),
  iterationPose: {
    D: iteration[iteration.length - 1].D,
    pose: iterationPose.D,
    difference: Math.hypot(
      iteration[iteration.length - 1].D[0] - iterationPose.D[0],
      iteration[iteration.length - 1].D[1] - iterationPose.D[1],
    ),
  },
  upperPivotSpacing: Math.abs(GEOMETRY.ucar[1] - GEOMETRY.ucaf[1]),
  otherAssembly,
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


def measure(cell: str) -> float:
    """One page number, including the `1.6 × 10⁻⁵ mm` form and a true minus sign."""
    text = cell.replace(MINUS, "-").replace("mm", "").strip()
    match = re.search(r"([\d.]+)(?:\s*×\s*10([⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+))?", text)
    assert match, f"not a number: {cell!r}"
    value = float(match.group(1))
    if match.group(2):
        superscript = match.group(2)
        sign = -1 if "⁻" in superscript else 1
        digits = superscript.replace("⁻", "")
        power = int("".join(str("⁰¹²³⁴⁵⁶⁷⁸⁹".index(ch)) for ch in digits))
        value *= 10 ** (sign * power)
    return value


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
    assert "across the car" in text


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


def test_section_1_6_agreement_is_the_current_models(model):
    """The agreement paragraph is the current kernel and trajectory, not 0.5.0's pair."""
    text = page("Section 1.6/Walkthrough")
    agreement = model["agreement"]

    assert round(agreement["dynamic"], 3) == -2.079
    assert round(agreement["static"], 3) == -2.079
    assert agreement["difference"] < 0.001
    assert "to **0.001°**" in text
    assert text.count("−2.079°") == 2, "the page no longer prints both cambers"

    assert round(agreement["frontDifference"], 2) == 0.94
    assert "0.94°" in text
    assert "0.93°" not in text


def test_section_1_6_is_conservative_and_does_not_name_parabolic():
    """The undamped quarter car is conservative; the damped model is left to the map."""
    text = page("Section 1.6/Walkthrough")
    flat = " ".join(text.split())
    assert "conservative" in flat
    assert "Hamiltonian flag" in flat
    assert "does not name as a class" in flat
    assert ":::class parabolic" not in text
    assert "parabolic" not in flat


def test_section_1_3_table_and_panel_are_the_figures_model(model):
    """The iteration table, total residual and σ are the figure's own run."""
    text = page("Section 1.3/Walkthrough")
    rows = [
        cells
        for cells in table(text)
        if re.fullmatch(r"\d+(, the first guess)?", cells[0])
    ]
    assert len(rows) == 6, f"§1.3 has {len(rows)} iteration rows"

    for cells, expected in zip(rows, model["iteration"]):
        assert measure(cells[1]) == pytest.approx(expected["norm"], rel=0.005)

    assert measure(row(text, "Total residual at the end")[0]) == pytest.approx(
        model["iteration"][-1]["norm"], rel=0.005
    )
    printed = [round(value, 3) for value in numbers(row(text, "Singular values of the Jacobian")[0])]
    expected = [round(value, 3) for value in model["iteration"][-1]["sigma"]]
    assert printed == expected
    assert model["iterationPose"]["difference"] < 1e-15


def test_section_1_3_spacing_and_the_other_assembly_are_the_models(model):
    """The 0.20 m pivot spacing and the second assembly's (0.35, 0.17) are the model's."""
    text = page("Section 1.3/Walkthrough")
    assert f"{model['upperPivotSpacing']:.2f} m apart" in text

    other = page("Section 1.2/Deeper/two-solutions")
    x, z = numbers(row(other, "the other one")[0])
    assert (round(x, 2), round(z, 2)) == (
        round(model["otherAssembly"][0], 2),
        round(model["otherAssembly"][1], 2),
    )


def test_section_1_6_is_finished_and_nothing_is_called_drafted():
    """The chapter stopped calling §1.6 drafted; the page still carries its figures."""
    root = repo_root() / "books" / "maths-applied"
    for name in ("AGENTS.md", "curriculum.yaml", "docs/index.md"):
        text = (root / name).read_text(encoding="utf-8")
        assert "drafted" not in text, f"{name} still calls a finished section drafted"

    section = page("Section 1.6/Walkthrough")
    assert ":::figure quarter-car" in section
    assert ":::figure dynamics-table" in section
    assert "212.8 mm" in section


def test_the_review_uses_the_exports_softest_row_too():
    """The Review's change-tolerance sentence is §1.5's, not the old 0.15."""
    text = " ".join(page("Review").split())
    assert "export's softest row, 0.2 MN/m, already meets it" in text
    assert "about nine times stiffer" in text
    assert "0.15 MN/m" not in text
    assert "twelve times" not in text


_DYNAMICS_SCRIPT = (
    "const BASE = " + json.dumps(str(DATA)) + ";\n"
    "const kernel = await import(BASE + \"/otkd/models/quarter-car/kernel/kernel.js\");\n"
    "const { run } = await import(BASE + \"/quarter-car/period.js\");\n"
    "await kernel.ready();\n"
    "console.log(JSON.stringify([0.1, 0.2, 2].map((stiffness) => run(stiffness).period)));\n"
)


def test_the_dynamics_table_periods_are_finite_and_the_sections():
    """The figure's period is the model's, and the section quotes the figure's range."""
    node = shutil.which("node")
    if node is None:
        pytest.skip("node is not on PATH, so the dynamics table cannot be run")
    done = subprocess.run(
        [node, "--input-type=module", "-e", _DYNAMICS_SCRIPT],
        capture_output=True,
        text=True,
        check=False,
    )
    assert done.returncode == 0, f"node could not run the dynamics table: {done.stderr.strip()}"
    periods = json.loads(done.stdout)
    assert all(math.isfinite(value) for value in periods), periods
    assert [round(value, 3) for value in periods] == [0.625, 0.475, 0.160]

    text = " ".join(page("Section 1.6/Walkthrough").split())
    assert "about 0.48 s to about 0.16 s" in text


def verified_number_sections() -> set[str]:
    """Sections whose numbers a test function names and asserts.

    The check is on the test source, not on a hand-kept list: a function that calls
    the book's ``page()`` helper for the real ``Section <id>/Walkthrough`` path and
    contains an ``assert`` with a digit is evidence that the section's numbers are
    recomputed. Structural tests that build a synthetic path do not count, which is
    why §1.1 stays figure-only.
    """
    tests = repo_root() / "tests"
    ids = ("1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7")
    verified: set[str] = set()
    for path in tests.glob("test_*.py"):
        text = path.read_text(encoding="utf-8")
        tree = ast.parse(text)
        for node in ast.walk(tree):
            if not isinstance(node, ast.FunctionDef) or not node.name.startswith("test_"):
                continue
            segment = ast.get_source_segment(text, node)
            if not segment:
                continue
            numeric = any(
                isinstance(child, ast.Assert)
                and re.search(r"\d", ast.get_source_segment(text, child.test) or "")
                for child in ast.walk(node)
            )
            if not numeric:
                continue
            verified.update(
                section_id
                for section_id in ids
                if f'page("Section {section_id}/Walkthrough")' in segment
            )
    return verified


def test_section_status_and_figures_are_two_way():
    """A drafted/outline section has no figure and no verified number; a finished one has evidence.

    §1.7 is the one legitimate no-figure section, and its summary says outline. If a
    finished section is later marked drafted, or a drafted section gains a figure or a
    tested number, this fails in either direction without needing a list of sections.
    """
    curriculum = yaml.safe_load(
        (repo_root() / "books" / "maths-applied" / "curriculum.yaml").read_text(
            encoding="utf-8"
        )
    )
    verified = verified_number_sections()
    assert "1.1" not in verified, f"§1.1 has no numeric test, but was counted: {verified}"
    assert {"1.2", "1.3", "1.4", "1.5", "1.6"} <= verified, verified
    assert "1.7" not in verified, verified
    for section in curriculum["chapters"][0]["sections"]:
        summary = str(section.get("summary", ""))
        marked = bool(re.search(r"\b(drafted|outline)\b", summary, re.IGNORECASE))
        text = page(f"Section {section['id']}/Walkthrough")
        evidence = ":::figure" in text or section["id"] in verified
        assert marked == (not evidence), (
            f"§{section['id']} is {'marked' if marked else 'not marked'} drafted/outline "
            f"and {'has' if evidence else 'has no'} figure or verified number; those are "
            "two descriptions of one status"
        )


def test_the_roundoff_floor_is_stated_once_in_one_unit():
    """The chapter's strongest agreement was stated at three precisions.

    Four lines said 10⁻¹² m, 10⁻¹⁶ m and 10⁻¹² mm about one comparison, and the
    model's step-5 residual is 9.6 × 10⁻¹⁶ m with a pose difference below 10⁻¹⁵.
    The arithmetic pages now say the round-off floor, and the structural pages say
    the same pose; no page in the chapter understates it by four orders.
    """
    arithmetic = [page("Section 1.3/Walkthrough"), page("Section 1.4/Walkthrough")]
    for text in arithmetic:
        assert "last bit of a double" in text
        assert "10⁻¹⁶ m" in text
    structural = [page("Review"), page("Section 1.1/Deeper/the-four-models")]
    for text in structural:
        assert "the same pose" in text
    for path in (repo_root() / "books" / "maths-applied" / "docs").rglob("*.md"):
        assert "10⁻¹²" not in path.read_text(encoding="utf-8"), path


def test_the_instant_centre_names_the_line_it_is_measured_from():
    """The figure printed a centreline distance under the hub's name.

    The table and the figure say the distance is from the car's centreline; the
    prose says the hub is 2.36 m from the centre. One word was carrying the wrong
    line, and a reader with a tape measure would catch it.
    """
    text = page("Section 1.2/Walkthrough")
    assert "from the car's centreline" in text
    assert "2.36 m from the hub" in text
    figure = (
        repo_root()
        / "books"
        / "maths-applied"
        / "docs"
        / "assets"
        / "figures"
        / "wishbone-hero.js"
    ).read_text(encoding="utf-8")
    assert "inboard of the car's centreline" in figure
    assert "inboard of the hub" not in figure
