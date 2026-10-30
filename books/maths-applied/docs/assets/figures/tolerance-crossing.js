// The section's whole argument, as a picture: an effect against a tolerance.
//
// §1.5 asks which model a question needs, and answers with a comparison — the effect the
// simpler model leaves out, against the tolerance the question asks for. The comparison
// has to be made against **the quantity the question is about**, and the section says so
// in prose and in a table. Nothing drew it, so the two thresholds were numbers a reader
// had to hold in working memory and subtract.
//
// Both axes are logarithmic because the quantities are: stiffness spans two and a half
// orders of magnitude, and the effects fall roughly tenfold per decade. A straight line on
// this plot is "the error falls with the inverse of the stiffness", which is what the
// section's table shows column by column.
//
// The kit has no logarithmic scale, and adding one for a single figure would be a feature
// nobody else uses. So the axes here are **linear in log10**: `axes()` supplies the frame,
// the curves are sampled in log space, and every tick is drawn at log10 of a value a reader
// recognises. The only places that know about it are `lx` and `ly`.
import { SIZE, axes, circle, curve, fmt, label, line, panel } from "./kit.js";
import { compliant, pose, thetaFor } from "../data/mechanism.js";

const WIDTH = 560;
const HEIGHT = 340;

// The corner's load: the pair §1.5 uses, and the package's example with it.
const LATERAL = 1800;
const DOWN = 3500;
// The tolerance the chapter's question asks for, in degrees.
const TOLERANCE = 0.1;
// The stiffnesses the figure covers, in newtons per metre: the export's softest row is
// 0.2 MN/m, and the section's harder threshold is a little under 2 MN/m.
const K_MIN = 0.02e6;
const K_MAX = 20e6;
// The effects range over four decades: the softest bush leaves out eleven degrees at
// rest, and the hardest leaves out two thousandths of a degree over the travel. The top
// of the range holds the soft end, so the curve is not cut off at the ceiling.
const Y_MIN = 0.002;
const Y_MAX = 20;
// Where a reader is given a tick, in the units the page uses.
const K_TICKS = [0.02e6, 0.05e6, 0.1e6, 0.2e6, 0.5e6, 1e6, 2e6, 5e6, 10e6, 20e6];
const Y_TICKS = [0.002, 0.005, 0.01, 0.03, 0.1, 0.3, 1, 3, 10];

const log10 = Math.log10;
/** A number as the prose writes it: a true minus sign, not a hyphen. */
const num = (value, places) => value.toFixed(places).replace("-", "\u2212");

/** Camber at one travel, from the model with a bush when `k` is given and the rigid one otherwise. */
const camber = (travel, k) =>
  k === null
    ? pose(thetaFor(travel)).camber
    : compliant(thetaFor(travel), k, LATERAL, DOWN).camber;

/** |the angle the bush model gives, less the angle the rigid model gives|. */
const effectAtRest = (k) => Math.abs(camber(0, k) - camber(0, null));

/** |the change over the travel, less the rigid model's change over the travel|. */
const effectOverTravel = (k) =>
  Math.abs(camber(40, k) - camber(-40, k) - (camber(40, null) - camber(-40, null)));

/**
 * The stiffness at which an effect reaches the tolerance, by bisection in log space.
 *
 * Log space because the models are smooth in it: a plain bisection on k converges just as
 * well but needs three times the iterations to land inside a hundredth of a meganewton.
 */
function crossing(effect, lo = K_MIN, hi = K_MAX) {
  let low = log10(lo);
  let high = log10(hi);
  for (let i = 0; i < 80; i += 1) {
    const mid = (low + high) / 2;
    if (effect(10 ** mid) > TOLERANCE) low = mid;
    else high = mid;
  }
  return 10 ** ((low + high) / 2);
}

export function mount(el) {
  const { svg, readout, caption, claim } = panel(el, {
    label: "The effect a bush leaves out, against the tenth of a degree the question asks for",
    description:
      "Two curves on logarithmic axes. Stiffness runs left to right from 0.02 to 20 meganewtons " +
      "per metre. The vertical axis is the size of the effect the rigid model leaves out, in " +
      "degrees. The solid curve is the wheel's angle at rest, and the dashed curve is the change " +
      "of that angle over the travel. A rule across the plot marks a tenth of a degree. Where a " +
      "curve crosses the rule is the stiffness that answers the question — a little under 2 " +
      "meganewtons for the angle, and 0.03 for the change over the travel, which is more than " +
      "fifty times softer.",
    prompt: "Both curves answer a tenth of a degree. Which one needs a stiffer bush, and why?",
    width: WIDTH,
    height: HEIGHT,
    max: 560,
  });

  const { draw: frame, box } = axes({
    width: WIDTH,
    height: HEIGHT,
    x: { domain: [0, 1], ticks: 0, tickFormat: () => "" },
    y: { domain: [0, 1], ticks: 0, tickFormat: () => "" },
    pad: { left: 64, right: 16, top: 34, bottom: 44 },
  });

  // The two logarithmic mappings, in SVG units, from the box the frame gave us.
  const lx = (k) =>
    box.x0 + ((log10(k) - log10(K_MIN)) / (log10(K_MAX) - log10(K_MIN))) * (box.x1 - box.x0);
  const ly = (effect) =>
    box.y0 - ((log10(effect) - log10(Y_MIN)) / (log10(Y_MAX) - log10(Y_MIN))) * (box.y0 - box.y1);

  let drawing = frame;

  // The grid, at the ticks a reader can name. Both axes are decades, so the grid is too.
  for (const k of K_TICKS) {
    const x = lx(k);
    drawing += line({ x1: x, y1: box.y1, x2: x, y2: box.y0, class: "fig-grid", width: 0.8 });
    drawing += label({
      x,
      y: box.y0 + 18,
      text: fmt(k / 1e6, k < 0.1e6 ? 2 : k < 1e6 ? 1 : 0),
      anchor: "middle",
      size: SIZE.tick,
      class: "text-ink",
    });
  }
  for (const effect of Y_TICKS) {
    const y = ly(effect);
    drawing += line({ x1: box.x0, y1: y, x2: box.x1, y2: y, class: "fig-grid", width: 0.8 });
    drawing += label({
      x: box.x0 - 10,
      y: y + 5,
      text: fmt(effect, effect < 0.01 ? 3 : effect < 0.1 ? 2 : 1),
      anchor: "end",
      size: SIZE.tick,
      class: "text-ink",
    });
  }

  // The tolerance the question asks for, across the whole width: this is the line both
  // curves are measured against, not a threshold of either one.
  const ruleY = ly(TOLERANCE);
  drawing += line({
    x1: box.x0,
    y1: ruleY,
    x2: box.x1,
    y2: ruleY,
    class: "fig-warn",
    width: 2,
    dash: "6 4",
  });
  // Below the rule at the right edge. Above it, or at the left, the label sat on a curve;
  // the band under the rule on the right is the one place neither line goes.
  drawing += label({
    x: box.x1 - 4,
    y: ruleY + 18,
    text: "the tolerance: 0.1\u00b0",
    anchor: "end",
    size: SIZE.tick,
    class: "text-ink",
  });

  // Two hundred samples in log space, so the curve is smooth where it falls fastest.
  const samples = 200;
  const sample = (effect) => {
    const points = [];
    for (let i = 0; i <= samples; i += 1) {
      const k = 10 ** (log10(K_MIN) + ((log10(K_MAX) - log10(K_MIN)) * i) / samples);
      const value = effect(k);
      if (!Number.isFinite(value) || value <= 0) continue;
      points.push([lx(k), ly(Math.min(Math.max(value, Y_MIN), Y_MAX))]);
    }
    return points;
  };
  // `curve()` maps data through `x`/`y`; here the points are already in SVG units, so the
  // scales are the identity and the mapping happened in `sample`.
  const identity = (value) => value;
  drawing += curve(sample(effectAtRest), {
    x: identity,
    y: identity,
    class: "fig-accent",
    width: 2.8,
  });
  drawing += curve(sample(effectOverTravel), {
    x: identity,
    y: identity,
    class: "fig-ink",
    width: 2.4,
    dash: "8 5",
  });

  const atRest = crossing(effectAtRest);
  const overTravel = crossing(effectOverTravel);
  for (const [k, cls] of [
    [atRest, "fig-accent"],
    [overTravel, "fig-ink"],
  ]) {
    drawing += circle({ cx: lx(k), cy: ruleY, r: 5, class: cls });
  }

  // A legend in the top-right corner, where nothing is drawn: naming a curve at its own
  // end is better where there is room, and here the curve runs through every space beside
  // it. The swatches carry the dash as well as the class, so the mapping needs no colour.
  const legend = (y, text, cls, dash) =>
    line({ x1: lx(0.5e6), y1: y - 4, x2: lx(0.9e6), y2: y - 4, class: cls, width: 2.6, dash }) +
    label({
      x: lx(0.9e6) + 8,
      y,
      text,
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    });
  drawing += legend(ly(3), "the angle at rest", "fig-accent");
  drawing += legend(ly(1.2), "the change over the travel", "fig-ink", "8 5");

  // Axis names, above and below the ticks so neither can collide with them.
  drawing += label({
    x: box.x0,
    y: box.y1 - 14,
    text: "the size of the effect the rigid model leaves out / degrees",
    anchor: "start",
    size: SIZE.value,
    class: "text-ink",
  });
  drawing += label({
    x: box.x1,
    y: box.y0 + 36,
    text: "bush stiffness / MN per metre",
    anchor: "end",
    size: SIZE.value,
    class: "text-ink",
  });

  svg.innerHTML = drawing;

  readout.textContent =
    `A tenth of a degree is met by a bush of ${num(atRest / 1e6, 2)} meganewtons per metre ` +
    `against the wheel's angle at rest, and by ${num(overTravel / 1e6, 3)} meganewtons against ` +
    `the change over the travel. Each crossing is a difference of 0.10 degrees, and the two ` +
    `are a little over fifty times apart. The exported ladder's softest row, 0.2 MN/m, is ` +
    `already inside the second of them.`;

  caption.textContent =
    "The same tolerance against two different quantities: a tenth of a degree of wheel angle " +
    "needs a bush about fifty times stiffer than a tenth of a degree in the change over the " +
    "travel. The dashed curve dips to nothing at 0.05 MN/m, where the two models agree about " +
    "the change, and rises again because the difference changes sign and the plot shows its size.";

  // Both crossings declare the effect they are a crossing of: the difference at the found
  // stiffness, computed from the model's own angles. **No `answer`**, because the model's
  // difference at a bisected root is 0.100000024 and the claim's answer is compared to
  // within 1e-12 — a root is not an evaluation. What `shown` holds is what the reader
  // reads ("a difference of 0.10 degrees") against what the expression gives, at the
  // precision it is printed; the crossings themselves are held by a recompute test over
  // the same model (`tests/test_maths_applied_numbers.py`).
  const restSoft = camber(0, atRest);
  const restRigid = camber(0, null);
  const travelSoft = camber(40, overTravel) - camber(-40, overTravel);
  const travelRigid = camber(40, null) - camber(-40, null);
  claim([
    {
      label: "the effect at rest at its crossing",
      expression: "abs(soft - rigid)",
      values: { soft: restSoft, rigid: restRigid },
      shown: "0.10",
    },
    {
      label: "the effect over the travel at its crossing",
      expression: "abs(soft - rigid)",
      values: { soft: travelSoft, rigid: travelRigid },
      shown: "0.10",
    },
  ]);
}
