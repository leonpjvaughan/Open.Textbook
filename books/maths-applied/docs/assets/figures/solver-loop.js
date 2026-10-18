// What a least-squares solver actually does, one iteration at a time.
//
// Three equations and two unknowns: the point where the upper ball joint sits has
// to be the right distance from the upper arm's pivot (twice, once per leg) and the
// right distance from the lower ball joint (once, for the upright). The reader steps
// through the loop — residual, Jacobian, linear solve, step — and watches the total
// error fall from centimetres to the last bit of a floating-point number.
//
// The iteration is the same Gauss–Newton step the general solver takes. The numbers
// are computed here, from the same geometry the other figures use, and they are
// labelled as this page's own: what the chapter quotes from the model repository is
// its `iterations` export, and §1.3's panel says which is which.
import { SIZE, label, line, panel, react, rect, stepper } from "./kit.js";
import { legsJacobian, leastSquares, lowerJoint, singularValues } from "../data/mechanism.js";

const WIDTH = 560;
const HEIGHT = 330;
const B = [0.38, 0.449];
const RB = Math.hypot(0.68 - 0.38, 0.52 - 0.449);
const L = Math.hypot(0.72 - 0.68, 0.15 - 0.52);
const THETA = 5.32 * (Math.PI / 180); // the bump end of the travel range
const START = [0.75, 0.6];

const C = lowerJoint(THETA);
const HISTORY = leastSquares(START, THETA, 5);

// The left panel: both circles, at one scale, in a box of their own.
const BOX = { left: 34, right: 300, top: 44, bottom: 282 };
const PAD = 0.03;
const lowX = Math.min(B[0] - RB, C[0] - L) - PAD;
const highX = Math.max(B[0] + RB, C[0] + L) + PAD;
const lowZ = Math.min(B[1] - RB, C[1] - L) - PAD;
const highZ = Math.max(B[1] + RB, C[1] + L) + PAD;
const SCALE = Math.min(
  (BOX.right - BOX.left) / (highX - lowX),
  (BOX.bottom - BOX.top) / (highZ - lowZ)
);
const at = (p) => ({
  x: (BOX.left + BOX.right) / 2 + (p[0] - (lowX + highX) / 2) * SCALE,
  y: (BOX.top + BOX.bottom) / 2 - (p[1] - (lowZ + highZ) / 2) * SCALE,
});

// The right panel: one bar per equation, and the singular values underneath.
const BAR = { left: 336, width: 168, right: 548 };
const RESIDUAL_FULL = 0.15; // metres across the full width of a bar

export function mount(el) {
  const { svg, readout, caption } = panel(el, {
    label: "One iteration of a least-squares solver on three equations in two unknowns",
    description:
      "Two dashed circles show the two distances the upper ball joint must be from, and a dot " +
      "shows the current guess. Each step moves the dot towards the place where the distances " +
      "are right. Bars on the right show how wrong each equation still is, and the singular " +
      "values show how the three equations depend on the same two unknowns.",
    prompt: "Step through and watch the total error fall. What does it fall to?",
    width: WIDTH,
    height: HEIGHT,
    max: 560,
  });

  caption.textContent =
    "Each dashed circle is one equation: the upper ball joint is a fixed distance from the " +
    "arm's pivot, and a fixed distance from the lower ball joint.";

  const step = stepper(el, {
    label: "Iteration",
    steps: HISTORY.map((entry) => ({
      text:
        entry.k === 0
          ? "Guess where the upper ball joint is. Two of the three equations are wrong by about 9 cm, and the third by 4 cm."
          : `The step is solved from the Jacobian and applied. The total error is now ${
              entry.norm === 0 ? "zero to the last bit" : `${(entry.norm * 1000).toFixed(4)} mm`
            }.`,
    })),
  });

  function draw() {
    const index = Math.min(step.index, HISTORY.length - 1);
    const state = HISTORY[index];
    const previous = index > 0 ? HISTORY[index - 1] : null;
    const answer = HISTORY[HISTORY.length - 1];
    let drawing = "";

    // The two circles, then the answer they share, then the current guess on top.
    for (const [centre, radius] of [
      [B, RB],
      [C, L],
    ]) {
      const { x, y } = at(centre);
      drawing += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(
        radius * SCALE
      ).toFixed(1)}" class="fig-grid" fill="none" stroke-width="1.4" stroke-dasharray="5 4"></circle>`;
    }
    const target = at(answer.D);
    drawing += `<circle cx="${target.x.toFixed(1)}" cy="${target.y.toFixed(
      1
    )}" r="4" class="fig-good"></circle>`;
    drawing += label({
      x: target.x + 10,
      y: target.y + 20,
      text: "settled",
      anchor: "start",
      size: SIZE.tick,
      class: "text-good",
    });

    // The step just taken, and the point it started from.
    if (previous) {
      const from = at(previous.D);
      const to = at(state.D);
      drawing += line({ x1: from.x, y1: from.y, x2: to.x, y2: to.y, class: "fig-warn", width: 2, dash: "5 4" });
    }
    const here = at(state.D);
    drawing += `<circle cx="${here.x.toFixed(1)}" cy="${here.y.toFixed(
      1
    )}" r="6" class="fig-accent"></circle>`;
    drawing += label({
      x: here.x - 10,
      y: here.y - 12,
      text: `step ${state.k}`,
      anchor: "end",
      size: SIZE.tick,
      class: "text-accent",
    });

    // One bar per equation: what it still says, and how far out it is.
    const rows = ["first leg", "second leg", "upright"];
    state.residual.forEach((value, i) => {
      const y = 78 + i * 58;
      const width = Math.min(Math.abs(value) / RESIDUAL_FULL, 1) * BAR.width;
      drawing += label({
        x: BAR.left,
        y: y - 10,
        text: rows[i],
        anchor: "start",
        size: SIZE.tick,
        class: "text-ink",
      });
      drawing += rect({
        x: BAR.left,
        y: y - 2,
        width: Math.max(width, 1),
        height: 15,
        class: Math.abs(value) < 1e-9 ? "fig-good" : "fig-warn",
        opacity: 0.45,
      });
      drawing += label({
        x: BAR.right,
        y: y + 12,
        text: `${(value * 1000).toFixed(1)} mm`,
        anchor: "end",
        size: SIZE.tick,
        class: "text-ink",
      });
    });

    const sigma = singularValues(legsJacobian(state.D, C));
    drawing += label({
      x: BAR.left,
      y: 254,
      text: "singular values",
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    });
    drawing += label({
      x: BAR.left,
      y: 276,
      text: sigma.map((value) => value.toFixed(3)).join("   "),
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    });

    svg.innerHTML = drawing;

    readout.textContent =
      `${step.text} The total error is ${(state.norm * 1000).toFixed(6)} mm after ` +
      `${state.k} step${state.k === 1 ? "" : "s"}, and the point has moved to ` +
      `${state.D[0].toFixed(4)} m outboard and ${state.D[1].toFixed(4)} m up. ` +
      `The largest singular value is ${sigma[0].toFixed(3)} and the smallest is zero, ` +
      `which is what a system with more equations than unknowns looks like from the inside.`;
  }

  react(step, draw);
}
