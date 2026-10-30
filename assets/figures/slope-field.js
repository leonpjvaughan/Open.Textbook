// A slope field for a first-order differential equation, with the solution through one
// chosen point traced through it.
//
// This lives in the shared library rather than in a book, and it is the second module to
// do so. A slope field is the same picture whoever draws it: the segments show dy/dx at
// every point, and a solution curve is the curve that follows them. Two books want that
// identically — Leaving Certificate Applied Mathematics at 8.7, where a separable
// equation is solved from first principles, and any A-level book that meets a
// differential equation — so the equations offered are the general ones and not one
// book's list.
//
// The point of the figure is the thing a formula cannot say: that a differential equation
// does not have one solution but a whole family of them, one through every point, and that
// the constant of integration is nothing more than *which* point you started from. So the
// reader moves the starting point and watches the curve slide, and the readout names the
// particular solution that passes through it.

/**
 * One equation of the family, as the data below states it.
 *
 * The slope is the whole figure, and typing it here is what lets each equation state
 * `slope: (x, y) =>` without repeating the parameters — and what makes `EQUATIONS`
 * indexable by a name read off a slider.
 *
 * @typedef {object} Equation
 * @property {string} label  the equation, as the page writes it
 * @property {(x: number, y: number) => number} slope  dy/dx at a point
 * @property {(x0: number, y0: number) => string} particular  the solution through a point
 * @property {string} note  one sentence of prose about the family
 */

import { SIZE, axes, dots, fmt, label, line, panel, react, signed, slider } from "./kit.js";

// The general equations, and the particular solution through one point.
//
// `particular(x0, y0)` evaluates the constant of integration from the starting point, so
// the readout names the one curve the reader is looking at rather than repeating the
// general form the page already gives. The constant is the whole point: a differential
// equation has a family of solutions and the starting point chooses one.

/** @type {Record<string, Equation>} */
const EQUATIONS = {
  xy: {
    label: "dy/dx = xy",
    slope: (x, y) => x * y,
    particular: (x0, y0) => `ln|y| = x squared over 2 ${signed(Math.log(Math.abs(y0)) - (x0 * x0) / 2)}`,
    note: "Every solution is a bell-shaped curve, and the starting height picks which one.",
  },
  x: {
    label: "dy/dx = x",
    slope: (x) => x,
    particular: (x0, y0) => `y = x squared over 2 ${signed(y0 - (x0 * x0) / 2)}`,
    note: "The slope depends only on x, so every solution is the same curve moved up or down.",
  },
  y: {
    label: "dy/dx = y",
    slope: (x, y) => y,
    particular: (x0, y0) => `y = ${fmt(y0 * Math.exp(-x0))} e to the x`,
    note: "The slope is the height, so the curve grows faster the higher it is.",
  },
  decay: {
    label: "dy/dx = -y",
    slope: (x, y) => -y,
    particular: (x0, y0) => `y = ${fmt(y0 * Math.exp(x0))} e to the minus x`,
    note: "The slope is the height downwards, so the curve falls towards zero.",
  },
  ratio: {
    label: "dy/dx = x/y",
    slope: (x, y) => (y === 0 ? 0 : x / y),
    particular: (x0, y0) => `y squared = x squared ${signed(y0 * y0 - x0 * x0)}`,
    note: "The slope has y underneath, so the curve is steep where y is small.",
  },
};

const LIMIT = 3;

/** @param {HTMLElement} el  what the figure is mounted into */
export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A slope field, with short segments showing the gradient at each point",
    description:
      "Short line segments spread over the plane, each showing the gradient a solution would have " +
      "at that point. A curve is drawn through one chosen point and follows the segments. The " +
      "starting point is set with the controls below, and the curve changes as it moves.",
    prompt: "Move the starting point. Does the shape of the curve change, or does it move?",
    width: 560,
    height: 360,
  });
  // `panel()` always produces the surface unless a module asks for no drawing, and this
  // one draws. The check is what keeps the null out of every line below it: it cannot
  // fire, and if it ever does, the figure is broken in a way `svg.innerHTML` would only
  // report as a crash.
  if (!svg) throw new Error("slope-field: the panel has no drawing surface");
  // `update` is a hoisted function, and a narrowed type does not reach inside one. The
  // check above is what makes this surface non-null for every line below it.
  const surface = svg;

  const atX = slider(el, {
    id: "x0",
    label: "Starting x =",
    min: -2.5,
    max: 2.5,
    step: 0.1,
    value: 0,
    show: true,
    name: "The x-coordinate of the starting point, minus 2.5 to 2.5",
  });

  const atY = slider(el, {
    id: "y0",
    label: "Starting y =",
    min: -2.5,
    max: 2.5,
    step: 0.1,
    value: 1,
    show: true,
    name: "The y-coordinate of the starting point, minus 2.5 to 2.5",
  });

  const which = slider(el, {
    id: "equation",
    label: "Equation",
    min: 0,
    max: Object.keys(EQUATIONS).length - 1,
    step: 1,
    value: 0,
    show: false,
    name: "Which equation, chosen from the list",
  });

  const names = Object.keys(EQUATIONS);

  const { draw, x, y, box } = axes({
    width: 560,
    height: 360,
    pad: { left: 52, right: 26, top: 26, bottom: 46 },
    x: { domain: [-3, 3], ticks: 6, label: "x" },
    y: { domain: [-3, 3], ticks: 6, label: "y" },
    origin: true,
  });

  /**
   * The curve through one point, integrated both ways.
   *
   * Runge-Kutta 4 rather than Euler, because Euler visibly spirals off a curved solution
   * at this step size and the reader would be looking at the integrator's error rather
   * than at the equation. Stepping backwards as well as forwards, so the reader sees the
   * whole solution through the point and not only the part to its right.
   *
   * @param {(x: number, y: number) => number} slope
   * @param {number} x0  the starting x
   * @param {number} y0  the starting y
   * @param {number} direction  `1` forwards, `-1` backwards
   * @returns {Array<[number, number]>} the points, in the order they were stepped
   */
  function trace(slope, x0, y0, direction) {
    /** @type {Array<[number, number]>} */
    const points = [];
    const step = 0.02 * direction;
    let px = x0;
    let py = y0;
    for (let i = 0; i < 400; i += 1) {
      points.push([px, py]);
      const k1 = slope(px, py);
      const k2 = slope(px + step / 2, py + (step * k1) / 2);
      const k3 = slope(px + step / 2, py + (step * k2) / 2);
      const k4 = slope(px + step, py + step * k3);
      px += step;
      py += (step / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
      if (!Number.isFinite(py) || Math.abs(py) > LIMIT + 1 || Math.abs(px) > LIMIT + 1) break;
    }
    return points;
  }

  function update() {
    const equation = EQUATIONS[names[Number(which.value)]] || EQUATIONS.xy;
    const x0 = Number(atX.value);
    const y0 = Number(atY.value);

    let drawing = draw;

    // The field: one short segment per grid point, centred on it, with no arrowhead —
    // a slope field shows a direction and not a magnitude, and an arrow would claim a
    // size the equation does not have.
    const step = 34;
    for (let px = box.x0; px <= box.x1; px += step) {
      for (let py = box.y1; py <= box.y0; py += step) {
        const gx = x.invert(px);
        const gy = y.invert(py);
        const m = equation.slope(gx, gy);
        if (!Number.isFinite(m)) continue;
        // The direction in SVG units, through the mappers, so a y-axis that counts
        // upwards comes out right.
        const dx = 1;
        const dy = m;
        const size = Math.hypot(dx, dy);
        const reach = 13;
        const ux = (dx / size) * reach;
        const uy = (dy / size) * reach;
        drawing += line({
          x1: px - ux,
          y1: py + uy,
          x2: px + ux,
          y2: py - uy,
          class: "fig-grid",
          width: 1.4,
        });
      }
    }

    // The solution through the chosen point, drawn over the field.
    const forward = trace(equation.slope, x0, y0, 1);
    const backward = trace(equation.slope, x0, y0, -1).reverse();
    const curvePoints = [...backward, ...forward].filter(
      ([cx, cy]) => cx >= -LIMIT && cx <= LIMIT && cy >= -LIMIT && cy <= LIMIT,
    );
    if (curvePoints.length > 1) {
      let d = "";
      curvePoints.forEach(([cx, cy], i) => {
        d += `${i === 0 ? "M" : "L"}${x(cx).toFixed(1)} ${y(cy).toFixed(1)} `;
      });
      drawing += `<path d="${d}" class="fig-accent" style="fill:none" stroke-width="2.8"></path>`;
    }

    drawing += dots([[x0, y0]], { x, y, r: 6, class: "fig-good" });
    drawing += label({
      // `box.x1` and `box.y1` are already in pixels; passing them through `x()` and `y()`
      // mapped a pixel coordinate as if it were a data value, and the label landed
      // 42,623 units off the canvas — invisible, since the figure's first build.
      x: box.x1 - 8,
      y: box.y1 + 14,
      text: equation.label,
      size: SIZE.value,
      class: "text-ink",
      anchor: "end",
    });

    surface.innerHTML = drawing;

    readout.textContent =
      `Through (${fmt(x0, 1)}, ${fmt(y0, 1)}) the solution is ${equation.particular(x0, y0)}. ` +
      equation.note;
  }

  react([atX, atY, which], update);
}
