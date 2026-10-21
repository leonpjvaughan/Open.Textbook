// The engine's answer, re-run in the page: a table, not a reading.
//
// §1.6 quotes one trajectory. The section's point is that a stiffness changes the motion, and a
// reader cannot see that from one curve of numbers. So this figure drives the *vendored kernel* —
// the package's own compiled integrator, `solver: "dynamics"` — and tabulates what comes back:
// peak heave, the travel, the period, and the constraint violation the kernel reports. Nothing here
// is a recording: each column is an integration done in the browser, in about eighty milliseconds.
//
// **What the control changes.** The one free number is the coil's compliance, which the kernel
// takes as a run-time slot, so the slider is a real stiffness. The coil is a *spring with no
// damper* — the page says so — and the load is the corner's own, baked into the model: 3.5 kN down
// and 1.8 kN sideways at the wheel centre.
//
// **The step is part of the model.** The kernel integrates at the study's step, five milliseconds.
// Stiffen the coil far enough and five milliseconds stops resolving the period, so the control
// stops at 2 MN/m; the section says why.
import { SIZE, label, line, panel, react, slider } from "./kit.js";
import * as kernel from "../data/otkd/models/quarter-car/kernel/kernel.js";

const WIDTH = 560;
const HEIGHT = 300;
const COLUMN_X = [4, 250, 410];
const HEADERS = ["quantity", "at 0.1 MN/m", "your value"];
const ROWS = [
  { key: "peak", title: "peak heave", unit: "mm", places: 1 },
  { key: "span", title: "travel", unit: "mm", places: 1 },
  { key: "period", title: "period", unit: "s", places: 3 },
  { key: "constraint", title: "constraint", unit: "m", places: 1 },
];
/** The stiffness the example ships with: a compliance of 1e-5 m/N. */
const DESIGN = 0.1;

const num = (value, places) => value.toFixed(places).replace("-", "\u2212");

/** The index of the coil's compliance among the kernel's run-time numbers. */
function complianceSlot() {
  return kernel.manifest.numbers.findIndex(
    (number) => number.kind === "compliance" && number.joint === "coil",
  );
}

/** One integration at a stiffness, and the four numbers the table prints. */
function run(stiffness) {
  const numbers = [...kernel.manifest.default_geometry.numbers];
  numbers[complianceSlot()] = 1 / (stiffness * 1e6);
  kernel.setGeometry({ ...kernel.manifest.default_geometry, numbers });
  kernel.design();
  kernel.setDrive(0);
  kernel.setVelocity(new Array(kernel.manifest.layout.sizes.q).fill(0));
  const constraint = kernel.integrate(kernel.manifest.integration.steps);

  const start = kernel.manifest.points.indexOf("chassis-origin") * 3;
  const heave = kernel.trajectory().map((q) => q[start + 2]);
  const peak = Math.min(...heave);
  const span = Math.max(...heave) - peak;

  // The period, from the first two upward crossings of the mean, by linear interpolation.
  const dt = kernel.manifest.integration.dt;
  const mean = heave.reduce((sum, value) => sum + value, 0) / heave.length;
  const crossings = [];
  for (let i = 1; i < heave.length; i += 1) {
    if (heave[i - 1] < mean && heave[i] >= mean) {
      crossings.push((i - 1 + (mean - heave[i - 1]) / (heave[i] - heave[i - 1])) * dt);
    }
  }
  const first = crossings[0];
  const second = crossings[1];
  return {
    peak: peak * 1000,
    span: span * 1000,
    period: second === undefined ? NaN : second - first,
    first,
    second,
    constraint,
  };
}

export async function mount(el) {
  await kernel.ready();
  const status = kernel.setGeometry(kernel.manifest.default_geometry);
  if (status !== 0) throw new Error(`kernel: geometry rejected, status ${status}`);

  const { svg, readout, caption, claim } = panel(el, {
    label: "A table of the engine's answers as the coil's stiffness changes",
    description:
      "Four quantities from the package's compiled dynamics kernel, tabulated against the coil's " +
      "stiffness: the lowest the chassis falls, how far it travels, the period of the swing, and " +
      "the worst constraint violation the integrator reports. The second column is the stiffness " +
      "the example ships with; the third follows a control. Every column is an integration done " +
      "in this page, not a recording.",
    prompt: "Stiffen the coil. Which of the four numbers changes most, and which barely moves?",
    width: WIDTH,
    height: HEIGHT,
    max: 560,
  });

  const stiffness = slider(el, {
    id: "coil",
    label: "Coil stiffness",
    min: 0.05,
    max: 2,
    step: 0.05,
    value: 0.2,
    show: true,
    unit: "MN/m",
  });

  const design = run(DESIGN);

  function draw() {
    const value = Number(stiffness.value);
    const mine = run(value);
    const columns = [design, mine];

    const { draw: frame, box } = axes({
      width: WIDTH,
      height: HEIGHT,
      x: { domain: [0, 1], ticks: 0, tickFormat: () => "" },
      y: { domain: [0, 1], ticks: 0, tickFormat: () => "" },
      pad: { left: 12, right: 12, top: 30, bottom: 18 },
    });

    let drawing = frame;
    const rowY = (index) => box.y0 + 34 + index * 48;
    HEADERS.forEach((title, index) => {
      drawing += label({
        x: COLUMN_X[index],
        y: 20,
        text: title,
        anchor: "start",
        size: SIZE.tick,
        class: "text-ink",
      });
    });
    drawing += line({
      x1: 0,
      y1: rowY(0) - 24,
      x2: WIDTH,
      y2: rowY(0) - 24,
      class: "fig-grid",
      width: 1,
    });

    ROWS.forEach((row, index) => {
      drawing += label({
        x: COLUMN_X[0],
        y: rowY(index),
        text: row.title,
        anchor: "start",
        size: SIZE.value,
        class: "text-ink",
      });
      columns.forEach((result, which) => {
        const printed =
          row.unit === "m" ? result[row.key].toExponential(1) : num(result[row.key], row.places);
        drawing += label({
          x: COLUMN_X[which + 1],
          y: rowY(index),
          text: printed,
          anchor: "start",
          size: SIZE.value,
          class: "text-ink",
        });
      });
    });
    svg.innerHTML = drawing;

    readout.textContent =
      `At ${num(value, 2)} meganewtons per metre the chassis falls ` +
      `${num(Math.abs(mine.peak), 1)} mm and swings with a period of ${num(mine.period, 3)} s. ` +
      `The stiffness the example ships with gives ${num(Math.abs(design.peak), 1)} mm and ` +
      `${num(design.period, 3)} s. Every run keeps the constraint violation near ` +
      `${mine.constraint.toExponential(1)} m, which is what the projection is for.`;

    // The period is arithmetic on the samples, so it is declared: the two crossing times are the
    // values, the subtraction is the expression, and the table prints what the claim answers.
    claim([
      {
        label: "period between the first two upward crossings of the mean",
        expression: "second - first",
        values: { first: mine.first, second: mine.second },
        answer: mine.period,
        shown: num(mine.period, 3),
      },
    ]);
  }

  caption.textContent =
    "Every column is one integration of the vendored kernel in this page: same model, same load at " +
    "the wheel centre, only the coil's stiffness changed. The coil has no damper, so the swing " +
    "repeats rather than settling.";

  react(stiffness, draw);
}
