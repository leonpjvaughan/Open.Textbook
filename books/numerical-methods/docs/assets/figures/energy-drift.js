// What a method that respects a problem's structure keeps, and a general one loses.
//
// A harmonic oscillator has an energy that cannot change: the exact solution trades
// kinetic for potential and back, forever. A general integrator does not know that,
// so it takes a little energy out every step, **and the loss accumulates**. A
// structure-preserving one is bounded: its energy swings between two values, and the
// swing is the same size after two thousand periods as after one.
//
// **Why the axis is linear and the quantity is signed.** The first version of this
// figure plotted the logarithm of the error and sampled it once every ten periods.
// Both choices were wrong and the capture showed it: sampling an oscillation at an
// arbitrary phase draws its envelope as a smooth rising curve, so the bounded method
// appeared to *climb*, above the method it was supposed to beat. It also made the
// bounded method's error (6 × 10⁻⁵ at that step) look larger than the general
// method's total drift, which was true and useless.
//
// So the figure plots the change in energy, signed, on a linear axis, and each run is
// drawn as a band: the smallest and largest change in each window. A band that stays
// where it is and a line that leaves the frame are two different pictures, and this
// is the one that says what the paragraph says.
//
// The numbers are computed here, by integrating the same oscillator with both
// methods, so the figure cannot claim a drift the run did not produce.
import { SIZE, axes, curve, fmt, label, panel } from "./kit.js";

const OMEGA = 1;
// A step of an eighth of a radian. Stated on the page, because the figure's claim is
// about the *kind* of behaviour and the step is what sets how quickly it shows.
const DT = 1 / 8;
const PERIODS = 2000;
const PERIOD = (2 * Math.PI) / OMEGA;
const STEPS = Math.round((PERIODS * PERIOD) / DT);
const WINDOWS = 200;

const energy = (x, v) => 0.5 * (v * v + OMEGA * OMEGA * x * x);
const E0 = energy(1, 0);

/** One classical fourth-order Runge–Kutta step of x'' = −ω²x. */
function rk4(x, v, h) {
  const a = (px, pv) => [pv, -OMEGA * OMEGA * px];
  const [k1x, k1v] = a(x, v);
  const [k2x, k2v] = a(x + (h / 2) * k1x, v + (h / 2) * k1v);
  const [k3x, k3v] = a(x + (h / 2) * k2x, v + (h / 2) * k2v);
  const [k4x, k4v] = a(x + h * k3x, v + h * k3v);
  return [
    x + (h / 6) * (k1x + 2 * k2x + 2 * k3x + k4x),
    v + (h / 6) * (k1v + 2 * k2v + 2 * k3v + k4v),
  ];
}

/** One velocity-Verlet step: the kick-drift-kick form, which is symplectic. */
function verlet(x, v, h) {
  const halfKick = v - 0.5 * h * OMEGA * OMEGA * x;
  const next = x + h * halfKick;
  return [next, halfKick - 0.5 * h * OMEGA * OMEGA * next];
}

/**
 * Run one method and return its envelope: the least and most the energy moved in
 * each of `WINDOWS` equal slices of the run, as a percentage of where it started.
 */
function envelope(step) {
  let x = 1;
  let v = 0;
  const perWindow = Math.floor(STEPS / WINDOWS);
  const low = [];
  const high = [];
  let windowLow = Infinity;
  let windowHigh = -Infinity;
  for (let i = 1; i <= STEPS; i += 1) {
    [x, v] = step(x, v, DT);
    const change = ((energy(x, v) - E0) / E0) * 100;
    windowLow = Math.min(windowLow, change);
    windowHigh = Math.max(windowHigh, change);
    if (i % perWindow === 0) {
      const period = (i * DT) / PERIOD;
      low.push([period, windowLow]);
      high.push([period, windowHigh]);
      windowLow = Infinity;
      windowHigh = -Infinity;
    }
  }
  return { low, high, end: ((energy(x, v) - E0) / E0) * 100 };
}

/** `0.53%`, the size of the move: the direction is said in words, not in the sign. */
const percent = (value) => `${fmt(Math.abs(value), 2)}%`;

export function mount(el) {
  const general = envelope(rk4);
  const structured = envelope(verlet);

  const { draw, x, y, box } = axes({
    width: 560,
    height: 300,
    // Room for the rotated title beside the ticks: at the default 56 the title ran
    // through them, which the first capture showed and no measurement reported.
    pad: { left: 92, top: 24 },
    x: { domain: [0, PERIODS], ticks: 4 },
    y: {
      domain: [-0.56, 0.05],
      ticks: 4,
      tickFormat: (value) => `${fmt(value, 1).replace("-", "−")}%`,
    },
  });

  const marks =
    draw +
    // Both are `fig-line`, the class with no fill: a `fig-*` class that fills paints
    // an open path as a closed shape, and the first version arrived as two solid
    // wedges. The two methods differ by dash, not by colour.
    curve(structured.low, { x, y, class: "fig-line" }) +
    curve(structured.high, { x, y, class: "fig-line" }) +
    curve(general.low, { x, y, class: "fig-line", dash: "6 4" }) +
    curve(general.high, { x, y, class: "fig-line", dash: "6 4" }) +
    label({
      x: x(PERIODS * 0.62),
      y: y(-0.12),
      text: "structure-preserving",
      anchor: "middle",
      size: SIZE.tick,
      class: "text-ink",
    }) +
    label({
      x: x(PERIODS * 0.62),
      y: y(-0.47),
      text: "general method",
      anchor: "middle",
      size: SIZE.tick,
      class: "text-ink",
    }) +
    label({
      x: (box.x0 + box.x1) / 2,
      y: box.y0 + 34,
      text: "periods",
      size: SIZE.label,
      class: "text-ink",
    }) +
    label({
      x: 16,
      y: (box.y0 + box.y1) / 2,
      text: "change in energy",
      size: SIZE.label,
      class: "text-ink",
      rotate: -90,
    });

  const { svg, readout, caption, claim } = panel(el, {
    label: "Change in energy over time for two integrators of the same oscillator",
    description:
      "The percentage change in the energy of a harmonic oscillator over two thousand " +
      "periods. A general fourth-order method drifts steadily downwards and keeps " +
      "going. A structure-preserving method stays in a band between zero and about " +
      "minus nought point four per cent, and the band is the same width at the end as " +
      "at the start.",
    width: 560,
    height: 300,
  });
  if (!svg) throw new Error("energy-drift: the frame has no drawing surface");
  svg.innerHTML = marks;

  const bandLow = Math.min(...structured.low.map(([, value]) => value));
  const bandHigh = Math.max(...structured.high.map(([, value]) => value));
  readout.textContent =
    `After ${PERIODS} periods the general method's energy has fallen by ` +
    `${percent(general.end)}, and it keeps falling. The structure-preserving one stays ` +
    `within ${percent(bandLow)} of where it started: a band, and the band is the same ` +
    "width at the end as at the start.";
  caption.textContent =
    `Both methods ran the same oscillator, with a step of ${DT} of a unit of time. ` +
    "The dashed line keeps leaving; the solid pair is a band that returns.";

  claim([
    {
      label: "general method, energy after the run",
      expression: "abs((E - E0) / E0 * 100)",
      values: { E: E0 * (1 + general.end / 100), E0 },
      answer: Math.abs(general.end),
      shown: percent(general.end),
    },
    {
      label: "structure-preserving, lowest energy in the band",
      expression: "abs((E - E0) / E0 * 100)",
      values: { E: E0 * (1 + bandLow / 100), E0 },
      answer: Math.abs(bandLow),
      shown: percent(bandLow),
    },
  ]);
}
