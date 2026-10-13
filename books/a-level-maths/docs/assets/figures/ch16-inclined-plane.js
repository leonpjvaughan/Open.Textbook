// Guided investigation for resolving forces on an inclined plane. The reader
// tilts the slope and watches the weight split into a component along the slope
// and a component into the slope. Plain HTML and SVG, no framework and no
// colour of its own: the fig-* classes carry the theme. Runtime text is plain
// text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

const SCALE = 0.13; // pixels per newton
const BASE_Y = 278;
const PIVOT_X = 64;
const SLOPE_LEN = 330;
const G = 9.8;

function arrow(x1, y1, x2, y2, cls, dash) {
  // A component along the slope is zero at 0 degrees; drawing it would leave a
  // stray arrowhead sitting on the block.
  if (Math.hypot(x2 - x1, y2 - y1) < 1) return "";
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const spread = 0.42;
  const bx = x2 - size * Math.cos(angle);
  const by = y2 - size * Math.sin(angle);
  const leftX = bx - size * Math.sin(angle) * spread * 2;
  const leftY = by + size * Math.cos(angle) * spread * 2;
  const rightX = bx + size * Math.sin(angle) * spread * 2;
  const rightY = by - size * Math.cos(angle) * spread * 2;
  const dashAttr = dash ? ' stroke-dasharray="5 4"' : "";
  return (
    `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" ` +
    `x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="${cls}" ` +
    `fill="none" stroke-width="2"${dashAttr}></line>` +
    `<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ` +
    `${leftX.toFixed(1)},${leftY.toFixed(1)} ${rightX.toFixed(1)},${rightY.toFixed(1)}" ` +
    `class="${cls}"></polygon>`
  );
}

function line(x1, y1, x2, y2, cls, dash) {
  const dashAttr = dash ? ' stroke-dasharray="5 4"' : "";
  return (
    `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" ` +
    `x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="${cls}" ` +
    `fill="none" stroke-width="1"${dashAttr}></line>`
  );
}

// Keep an arrow inside the 460 by 330 frame. Scaling the whole vector keeps its
// direction — the weight still points straight down, the components keep their
// angles — and only the length gives way. At 0 degrees the block sits 52 px
// above the bottom, and the weight arrow is longer than that.
function fitArrow(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const margin = 8;
  let k = 1;
  if (dx > 1e-9) k = Math.min(k, (460 - margin - x1) / dx);
  if (dx < -1e-9) k = Math.min(k, (margin - x1) / dx);
  if (dy > 1e-9) k = Math.min(k, (330 - margin - y1) / dy);
  if (dy < -1e-9) k = Math.min(k, (margin - y1) / dy);
  k = Math.max(0, Math.min(1, k));
  return [x1 + dx * k, y1 + dy * k];
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A block on a slope, with its weight split into a component along the slope and a component into the slope",
    width: 460,
    height: 330,
    max: 600,
  });

  const inputs = {
    mass: slider(el, {
      id: "mass",
      label: "Mass of the block, in kilograms",
      min: 20,
      max: 100,
      step: 5,
      value: 60,
    }),
    angle: slider(el, {
      id: "angle",
      label: "Angle of the slope, in degrees",
      min: 0,
      max: 50,
      value: 25,
    }),
  };

  function update() {
    const m = Number(inputs.mass.value);
    const theta = (Number(inputs.angle.value) * Math.PI) / 180;
    const weight = m * G;
    const along = weight * Math.sin(theta);
    const into = weight * Math.cos(theta);

    const topX = PIVOT_X + SLOPE_LEN * Math.cos(theta);
    const topY = BASE_Y - SLOPE_LEN * Math.sin(theta);

    // The block sits six tenths of the way up the slope.
    const bx = PIVOT_X + 0.6 * (topX - PIVOT_X);
    const by = BASE_Y + 0.6 * (topY - BASE_Y);
    // Unit vectors in screen coordinates (x right, y down).
    const upx = Math.cos(theta);
    const upy = -Math.sin(theta);
    const outx = -Math.sin(theta);
    const outy = -Math.cos(theta);

    const weightX = bx;
    const weightY = by + weight * SCALE;
    const alongX = bx - along * SCALE * upx;
    const alongY = by - along * SCALE * upy;
    const intoX = bx - into * SCALE * outx;
    const intoY = by - into * SCALE * outy;
    const [wx, wy] = fitArrow(bx, by, weightX, weightY);
    const [alx, aly] = fitArrow(bx, by, alongX, alongY);
    const [inx, iny] = fitArrow(bx, by, intoX, intoY);

    const ground = line(PIVOT_X, BASE_Y, 430, BASE_Y, "fig-ink", false);
    const slope = line(PIVOT_X, BASE_Y, topX, topY, "fig-ink", false);
    const corner = line(topX, topY, topX, BASE_Y, "fig-grid", true);

    const parallelogram =
      line(wx, wy, alx, aly, "fig-grid", true) +
      line(wx, wy, inx, iny, "fig-grid", true);

    // A short tick marks the surface the block rests on.
    const tickX = bx + 26 * outx;
    const tickY = by + 26 * outy;

    svg.innerHTML =
      ground +
      slope +
      corner +
      line(bx, by, tickX, tickY, "fig-ink", false) +
      parallelogram +
      arrow(bx, by, wx, wy, "fig-warn") +
      arrow(bx, by, alx, aly, "fig-accent") +
      arrow(bx, by, inx, iny, "fig-good");

    const angleDeg = Number(inputs.angle.value);
    readout.textContent =
      `Mass ${m} kilograms, so the weight is ${weight.toFixed(0)} newtons. ` +
      `At ${angleDeg} degrees, the component along the slope is ` +
      `${along.toFixed(1)} newtons and the component into the slope is ` +
      `${into.toFixed(1)} newtons. On a smooth slope the normal reaction is ` +
      `${into.toFixed(1)} newtons and it balances the component into the slope.`;

    svg.setAttribute(
      "aria-label",
      `A block of mass ${m} kilograms on a slope of ${angleDeg} degrees. ` +
        `The weight of ${weight.toFixed(0)} newtons splits into a component of ` +
        `${along.toFixed(1)} newtons along the slope and a component of ` +
        `${into.toFixed(1)} newtons into the slope. The normal reaction on a ` +
        `smooth slope balances the component into the slope.`
    );
  }

  react(Object.values(inputs), update);
}
