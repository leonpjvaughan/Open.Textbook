// Two models of the same corner: this section's front view, and a generated kernel.
//
// `books/maths-applied/docs/assets/data/otkd/` holds the `suspension-kinematics`
// package's own bundle: one `out.js` per model and a solver compiled to WebAssembly
// for each of the kinematic ones. The kernel is generated from the same derivation as the package's
// Python engine — sympy residual and Jacobian, common-subexpression elimination, Rust,
// `wasm32-unknown-unknown` — and it solves the **full three-dimensional mechanism**:
// twenty-one equations in twenty-one unknowns, by Newton.
//
// This section's model is a front view: two circles, two equations, a closed form. The
// two are not rivals. Feeding the kernel the geometry in `mechanism.js` asks it to
// solve the same linkage in three dimensions, and the difference between the answers is
// what the front view costs — a number, which is the only kind of claim this book makes
// about a model.
//
// **One convention is applied, and it is stated on the page.** The package reports
// camber with the sign this book does not use, so the kernel's values are negated to
// match §1.2's rule (top of the wheel inboard is negative). Nothing else is adjusted:
// the same geometry goes in, and the answers come out as they are.
import { SIZE, axes, curve, label, panel, quantity } from "./kit.js";
import * as kernel from "../data/otkd/models/double-wishbone/kernel/kernel.js";
import { agreement } from "../data/otkd/models/double-wishbone/out.js";
import { GEOMETRY, pose, thetaFor } from "../data/mechanism.js";

// The chapter's own range: 40 mm of wheel travel each way, sampled at the arm angles
// that produce it. The kernel is driven by the arm, so the travel is turned into a
// drive angle first — the figure then shares the table's axis.
const TRAVEL = 40; // millimetres, each way
const SAMPLES = 21;

const sub = (a, b) => a.map((value, index) => value - b[index]);
const unit = (a) => {
  const length = Math.hypot(...a);
  return a.map((value) => value / length);
};

/** `2 × 10⁻¹³`, for a number that is read rather than computed with. */
const SUPERSCRIPT = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
function sci(value) {
  const power = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / 10 ** power;
  return `${mantissa.toFixed(0)} × 10${String(power)
    .split("")
    .map((character) => SUPERSCRIPT[character] || character)
    .join("")}`;
}

/** The book's geometry, in the shape `kernel.setGeometry` takes. */
function geometryForKernel() {
  return {
    points: {
      lcaf: GEOMETRY.lcaf,
      lcar: GEOMETRY.lcar,
      lbj: GEOMETRY.lbj,
      ucaf: GEOMETRY.ucaf,
      ucar: GEOMETRY.ucar,
      ubj: GEOMETRY.ubj,
      wc: GEOMETRY.wc,
      wco: GEOMETRY.wco,
      tri: GEOMETRY.tri,
      tro: GEOMETRY.tro,
    },
    // The package's axes are the same construction: a unit vector along each arm's
    // pivot axis, from the two chassis pivots that define it.
    axes: {
      "lca-axis": unit(sub(GEOMETRY.lcar, GEOMETRY.lcaf)),
      "uca-axis": unit(sub(GEOMETRY.ucar, GEOMETRY.ucaf)),
    },
    // One number slot, the tie-rod length; `null` asks for the design separation,
    // which is what the package's own exporter passes.
    numbers: [null],
  };
}

export async function mount(el) {
  await kernel.ready();
  const status = kernel.setGeometry(geometryForKernel());
  if (status !== 0) throw new Error(`kernel: geometry rejected, status ${status}`);

  const at = [];
  for (let index = 0; index < SAMPLES; index += 1) {
    const travel = -TRAVEL + (2 * TRAVEL * index) / (SAMPLES - 1);
    const theta = thetaFor(travel);
    kernel.design();
    kernel.setDrive(theta);
    const residual = kernel.solve(60);
    if (!(residual >= 0)) throw new Error(`kernel: no convergence at ${theta}`);
    // The kernel's camber, negated into this book's convention and measured from the
    // design position, which is the same origin the section's own curve uses.
    at.push({ travel, kernel: -kernel.metrics().camber, page: pose(theta).camber });
  }
  const rest = pose(0).camber;
  for (const point of at) point.page -= rest;

  const differences = at.map((point) => Math.abs(point.kernel - point.page));
  const worst = Math.max(...differences);
  const worstAt = at[differences.indexOf(worst)];
  const end = at[at.length - 1];

  const { draw, x, y, box } = axes({
    width: 560,
    height: 300,
    // Room under the ticks for the axis title at phone width, where it was tight.
    pad: { left: 78, top: 26, bottom: 54 },
    x: { domain: [-TRAVEL, TRAVEL], ticks: 4, tickFormat: (value) => quantity(value, "mm", 0) },
    y: { domain: [-1.1, 1.1], ticks: 4, tickFormat: (value) => quantity(value, "°", 1) },
  });

  const marks =
    draw +
    curve(
      at.map((point) => [point.travel, point.page]),
      { x, y, class: "fig-line", dash: "6 4" },
    ) +
    curve(
      at.map((point) => [point.travel, point.kernel]),
      { x, y, class: "fig-line" },
    ) +
    label({
      x: box.x0 + 16,
      y: box.y1 + 22,
      text: "kernel (3D, 21 equations)",
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    }) +
    label({
      x: box.x0 + 16,
      y: box.y1 + 42,
      text: "this section's front view",
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    }) +
    label({
      x: (box.x0 + box.x1) / 2,
      y: box.y0 + 50,
      text: "wheel travel",
      size: SIZE.label,
      class: "text-ink",
    }) +
    label({
      x: 16,
      y: (box.y0 + box.y1) / 2,
      text: "camber change",
      size: SIZE.label,
      class: "text-ink",
      rotate: -90,
    });

  const { svg, readout, caption, claim } = panel(el, {
    label: "Camber change from two models of the same suspension corner",
    description:
      "Camber change in degrees against wheel travel in millimetres, from minus " +
      "forty to plus forty. Two curves are drawn: the generated three-dimensional " +
      "kernel, and this section's front-view model. They lie almost on top of one " +
      "another.",
    width: 560,
    height: 300,
  });
  if (!svg) throw new Error("kernel-camber: the frame has no drawing surface");
  svg.innerHTML = marks;

  readout.textContent =
    `Over the chapter's 80 mm of travel the kernel and the front view differ by at ` +
    `most ${quantity(worst, "°", 3)}, at ${quantity(worstAt.travel, "mm", 0)} of travel. ` +
    `At ${quantity(end.travel, "mm", 0)} the kernel gives ${quantity(end.kernel, "°", 3)} ` +
    `against the front view's ${quantity(end.page, "°", 3)} — inside the tenth of a ` +
    `degree this chapter set as its budget. The package's own two routes, its analytic ` +
    `sweep and its numeric one, differ by at most ${sci(agreement.max_abs_diff)}°.`;
  caption.textContent =
    "Same geometry, two models: the kernel solves the full mechanism, the front view " +
    "solves two circles. The kernel's camber sign is flipped to this book's convention.";

  claim([
    {
      label: "kernel camber change at the end of the travel",
      expression: "-camber",
      values: { camber: -end.kernel },
      answer: end.kernel,
      shown: quantity(end.kernel, "°", 3),
    },
    {
      label: "front-view camber change at the end of the travel",
      expression: "camber - rest",
      values: { camber: pose(thetaFor(TRAVEL)).camber, rest: pose(0).camber },
      answer: end.page,
      shown: quantity(end.page, "°", 3),
    },
  ]);
}
