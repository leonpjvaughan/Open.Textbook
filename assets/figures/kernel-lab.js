/**
 * The shared visual language for an `ot-solve` kernel.
 *
 * Seven kernels do not need seven drawings. They need four arrangements, because
 * that is how many shapes a numerical answer has:
 *
 *   field     a function on a grid, perhaps against an exact curve   (heat, wave, CG)
 *   line      a sequence of numbers, as points on a number line     (Newton, descent)
 *   plane     a vector turning in two dimensions                    (power iteration)
 *   estimate  an estimate and its error band                        (Monte Carlo)
 *
 * Every arrangement sits above the same **trace**: one scalar per step, on a
 * linear or logarithmic axis. The trace is where the lesson usually is — growth
 * past a stability limit, a residual falling, an error decaying as `1/√n`.
 *
 * The controls are built from the kernel's manifest, so a slider's range is the
 * range the Rust declares and the two cannot drift. The module never claims a
 * number with `claim()`: a simulated number is proved by the selftest, not by the
 * CAS, and `solvers/AGENTS.md` says why.
 */
import { SIZE, arrow, axes, circle, curve, fmt, label, line, panel, react, slider, button } from "./kit.js";

/**
 * @typedef {object} FieldData
 * @property {number[]} values
 * @property {number[]} [exact]
 * @property {number} cells
 * @property {[number, number]} [domain]
 * @property {string} [xLabel]
 * @property {string} [yLabel]
 */

/**
 * @typedef {object} LineData
 * @property {number[]} curve
 * @property {number[]} iterates
 */

/**
 * @typedef {object} KernelSpec
 * @property {string} title
 * @property {string} description
 * @property {string} [prompt]
 * @property {string[]} [controls]
 * @property {"field"|"line"|"plane"|"estimate"} layout
 * @property {number} [steps]
 * @property {string} [runLabel]
 * @property {string} [caption]
 * @property {string} [traceLabel]
 * @property {boolean} [traceLog]
 * @property {string} [traceX]
 * @property {boolean} [skipInitialTrace]
 * @property {number} [resetSteps]
 * @property {(kernel: import("./kernel.js").Kernel) => void} [initial]
 * @property {(kernel: import("./kernel.js").Kernel, step: number) => number} trace
 * @property {(kernel: import("./kernel.js").Kernel, history: number[], steps: number) => string} readout
 * @property {(kernel: import("./kernel.js").Kernel) => FieldData} [field]
 * @property {(kernel: import("./kernel.js").Kernel) => LineData} [line]
 * @property {string} [lineLabel]
 */


const WIDTH = 560;
const TOP = 240;
const TRACE = 150;
const HEIGHT = TOP + TRACE;
const FLOOR = 1e-12;

/**
 * A number for a readout: fixed places in the ordinary range, scientific outside it.
 * @param {number} value
 */
export function sci(value) {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "0";
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  if (exponent >= -2 && exponent <= 3) return fmt(value, 2);
  return `${fmt(value / 10 ** exponent, 2)}e${exponent}`;
}

/**
 * A power-of-ten tick label for a logarithmic axis.
 *
 * The caret rather than a Unicode superscript: the superscript minus is missing
 * from the font the shell falls back to, so `10⁻¹` arrived as `101` beside `10¹`.
 * A plain `10^-1` is unambiguous and needs no glyph the page does not have.
 */
function power(/** @type {number} */ value) {
  const exponent = Math.round(value);
  return exponent === 0 ? "1" : `10^${exponent}`;
}

/** Only the integer powers get a label; the ticks between them are grid lines. */
function powerTick(/** @type {number} */ value) {
  return Math.abs(value - Math.round(value)) < 1e-9 ? power(value) : "";
}

/** A domain with room around the data, and no zero-width axis. */
/**
 * @param {number[]} values
 * @param {boolean} log
 * @returns {[number, number]}
 */
function domainOf(values, log) {
  const mapped = values.map((value) => (log ? Math.log10(Math.max(value, FLOOR)) : value));
  let low = Math.min(...mapped);
  let high = Math.max(...mapped);
  if (!Number.isFinite(low) || !Number.isFinite(high)) return log ? [-3, 1] : [0, 1];
  if (high - low < 1e-9) high = low + 1;
  if (log) {
    // Integer bounds, so the labelled ticks are powers of ten rather than four
    // evenly spaced fractions that all round to the same label.
    return /** @type {[number, number]} */ ([Math.floor(low) - 1, Math.ceil(high) + 1]);
  }
  const pad = (high - low) * 0.08;
  return /** @type {[number, number]} */ ([low - pad, high + pad]);
}

/**
 * Build one kernel figure.
 *
 * @param {HTMLElement} el the `<maths-figure>` the loader hands us
 * @param {import("./kernel.js").Kernel} kernel the generated module's default export
 * @param {KernelSpec} spec what this kernel's picture is
 */
export function kernelLab(el, kernel, spec) {
  const { svg, readout, controls, caption } = panel(el, {
    label: spec.title,
    description: spec.description,
    prompt: spec.prompt,
    width: WIDTH,
    height: HEIGHT,
  });
  if (!svg) throw new Error(`${kernel.manifest.id}: the frame has no drawing surface`);
  const surface = svg;

  /** @type {Array<{name: string, input: HTMLInputElement}>} */
  const sliders = [];
  for (const name of spec.controls ?? []) {
    const param = kernel.spec(name);
    const input = slider(controls, {
      id: `k-${name}`,
      label: param.label,
      name: param.label,
      min: param.min,
      max: param.max,
      step: param.step,
      value: param.default,
      unit: param.unit,
    });
    sliders.push({ name, input });
  }
  button(controls, {
    label: spec.runLabel ?? `Run ${spec.steps ?? 10} steps`,
    onClick: () => advance(spec.steps ?? 10),
  });
  button(controls, { label: "Reset", onClick: reset });

  /** @type {number[]} */
  let history = [];
  let steps = 0;

  /** Read every slider into the kernel, then reset its state. */
  function reset() {
    for (const { name, input } of sliders) kernel.set(name, Number(input.value));
    spec.initial?.(kernel);
    kernel.init();
    steps = 0;
    history = spec.skipInitialTrace ? [] : [readTrace()];
    for (let index = 0; index < (spec.resetSteps ?? 0); index += 1) {
      const status = kernel.step();
      steps += 1;
      history.push(readTrace());
      if (status !== 0) break;
    }
    draw();
  }

  /** Advance at most `n` steps, recording the trace after each one. */
  /** @param {number} n */
  function advance(n) {
    for (let index = 0; index < n; index += 1) {
      const status = kernel.step();
      steps += 1;
      history.push(readTrace());
      if (status !== 0) break;
    }
    draw();
  }

  /** One scalar from the kernel, with the id so a failure names the kernel. */
  function readTrace() {
    const value = spec.trace(kernel, steps);
    if (!Number.isFinite(value)) {
      throw new Error(`${kernel.manifest.id}: the trace is not a number at step ${steps}`);
    }
    return value;
  }

  function draw() {
    /** @type {string[]} */
    const parts = [];
    if (spec.layout === "field") drawField(parts);
    else if (spec.layout === "line") drawLine(parts);
    else if (spec.layout === "plane") drawPlane(parts);
    else if (spec.layout === "estimate") drawEstimate(parts);
    else throw new Error(`${kernel.manifest.id}: unknown layout '${spec.layout}'`);
    drawTrace(parts);
    surface.innerHTML = parts.join("");
    readout.textContent = spec.readout(kernel, history, steps);
    caption.textContent = spec.caption ?? "";
  }

  /** @param {string[]} parts */
  function drawField(parts) {
    const field = spec.field?.(kernel);
    if (!field) throw new Error(`${kernel.manifest.id}: the field layout needs a field()`);
    const cells = field.cells;
    const domain = field.domain ?? domainOf([...field.values, ...(field.exact ?? [])], false);
    const { draw, x, y, box } = axes({
      width: WIDTH,
      height: TOP,
      pad: { left: 88, right: 18, top: 18, bottom: 40 },
      x: { domain: [0, 1], ticks: 4 },
      y: { domain, ticks: 4 },
    });
    parts.push(draw);
    // The plot is not clipped, so a field that leaves the domain would draw its
    // polyline across the trace below. Holding the value at the edge keeps the
    // picture inside its own axes; the trace is what carries the growth.
    const clamp = (/** @type {number} */ value) =>
      Math.min(domain[1], Math.max(domain[0], value));
    /** @type {Array<[number, number]>} */
    const points = field.values.map((value, index) => /** @type {[number, number]} */ ([index / (cells - 1), clamp(value)]));
    parts.push(curve(points, { x, y, class: "fig-line", width: 2.5 }));
    if (field.exact) {
      /** @type {Array<[number, number]>} */
      const exact = field.exact.map((value, index) => /** @type {[number, number]} */ ([index / (cells - 1), clamp(value)]));
      parts.push(curve(exact, { x, y, class: "fig-ink", width: 1.8, dash: "6 4" }));
    }
    parts.push(
      label({
        x: (box.x0 + box.x1) / 2,
        y: TOP - 8,
        text: field.xLabel ?? "x",
        size: SIZE.label,
      }),
      label({
        x: 18,
        y: (box.y0 + box.y1) / 2,
        text: field.yLabel ?? "u",
        size: SIZE.label,
        rotate: -90,
      }),
    );
  }

  /** @param {string[]} parts */
  function drawLine(parts) {
    const data = spec.line?.(kernel);
    if (!data) throw new Error(`${kernel.manifest.id}: the line layout needs a line()`);
    /** @type {Array<[number, number]>} */
    const curvePoints = [];
    for (let index = 0; index < data.curve.length; index += 2) {
      curvePoints.push(/** @type {[number, number]} */ ([data.curve[index], data.curve[index + 1]]));
    }
    /** @type {[number, number]} */
    const xDomain = [curvePoints[0][0], curvePoints[curvePoints.length - 1][0]];
    const yDomain = domainOf(curvePoints.map((point) => point[1]), false);
    const { draw, x, y, box } = axes({
      width: WIDTH,
      height: TOP,
      pad: { left: 88, right: 18, top: 18, bottom: 54 },
      x: { domain: xDomain, ticks: 4 },
      y: { domain: yDomain, ticks: 4 },
    });
    parts.push(draw);
    parts.push(curve(curvePoints, { x, y, class: "fig-ink", width: 2 }));
    parts.push(
      line({
        x1: box.x0,
        y1: y(0),
        x2: box.x1,
        y2: y(0),
        class: "fig-ink",
        width: 1.2,
        dash: "4 3",
      }),
    );
    data.iterates.forEach((value, index) => {
      parts.push(
        circle({
          cx: x(value),
          cy: y(0),
          r: index === data.iterates.length - 1 ? 7 : 4,
          class: index === data.iterates.length - 1 ? "fig-accent" : "fig-ink",
        }),
      );
    });
    parts.push(
      label({
        x: (box.x0 + box.x1) / 2,
        y: TOP - 6,
        text: spec.lineLabel ?? "x",
        size: SIZE.label,
      }),
    );
  }

  /** @param {string[]} parts */
  function drawPlane(parts) {
    const reference = kernel.output("reference");
    const angle = kernel.scalar("angle");
    const lambda = kernel.scalar("lambda");
    const { draw, x, y, box } = axes({
      width: 250,
      height: TOP,
      pad: { left: 48, right: 34, top: 20, bottom: 52 },
      x: { domain: [-1.1, 1.1], ticks: 3 },
      y: { domain: [-1.1, 1.1], ticks: 3 },
      origin: true,
    });
    parts.push(draw);
    const [ex, ey] = [Math.cos(reference[0]), Math.sin(reference[0])];
    parts.push(
      line({ x1: x(-ex), y1: y(-ey), x2: x(ex), y2: y(ey), class: "fig-ink", width: 1.4, dash: "6 4" }),
      arrow({
        x1: x(0),
        y1: y(0),
        x2: x(Math.cos(angle)),
        y2: y(Math.sin(angle)),
        class: "fig-accent",
        width: 2.5,
      }),
      label({
        x: box.x1,
        y: TOP - 6,
        text: "x₁",
        size: SIZE.tick,
      }),
      label({
        x: 12,
        y: box.y1 + 4,
        text: "x₂",
        size: SIZE.tick,
      }),
      label({
        x: 330,
        y: 60,
        anchor: "start",
        text: `λ = ${sci(lambda)}`,
        size: SIZE.value,
        class: "text-ink",
      }),
      label({
        x: 330,
        y: 86,
        anchor: "start",
        text: `θ = ${fmt(angle, 3)} rad`,
        size: SIZE.value,
        class: "text-ink",
      }),
      label({
        x: 330,
        y: 112,
        anchor: "start",
        text: `target = ${fmt(reference[0], 3)} rad`,
        size: SIZE.tick,
        class: "text-ink",
      }),
      label({
        x: 330,
        y: 136,
        anchor: "start",
        text: "solid: now   dashed: dominant",
        size: SIZE.tick,
        class: "text-ink",
      }),
    );
  }

  /** @param {string[]} parts */
  function drawEstimate(parts) {
    const count = Math.round(kernel.scalar("steps"));
    const estimates = kernel.output("estimate_history").slice(1, count + 1);
    const errors = kernel.output("stderr_history").slice(1, count + 1);
    const { draw, x, y, box } = axes({
      width: WIDTH,
      height: TOP,
      pad: { left: 88, right: 18, top: 18, bottom: 40 },
      x: {
        domain: [1, Math.max(spec.steps ?? 10, count)],
        ticks: 4,
        tickFormat: (value) => (Number.isInteger(value) ? String(value) : ""),
      },
      y: { domain: [2.95, 3.35], ticks: 4 },
    });
    parts.push(draw);
    parts.push(
      line({
        x1: box.x0,
        y1: y(Math.PI),
        x2: box.x1,
        y2: y(Math.PI),
        class: "fig-ink",
        width: 1.4,
        dash: "5 4",
      }),
    );
    if (estimates.length === 1) {
      parts.push(circle({ cx: x(1), cy: y(estimates[0]), r: 5, class: "fig-accent" }));
    }
    if (estimates.length > 1) {
      /** @type {Array<[number, number]>} */
      const points = estimates.map((value, index) => /** @type {[number, number]} */ ([index + 1, value]));
      parts.push(curve(points, { x, y, class: "fig-line", width: 2.5 }));
      parts.push(
        curve(
          estimates.map((value, index) => [index + 1, value + 2 * errors[index]]),
          { x, y, class: "fig-accent", width: 1.4, dash: "4 3" },
        ),
        curve(
          estimates.map((value, index) => [index + 1, value - 2 * errors[index]]),
          { x, y, class: "fig-accent", width: 1.4, dash: "4 3" },
        ),
      );
    }
    parts.push(
      label({
        x: (box.x0 + box.x1) / 2,
        y: TOP - 6,
        text: "batch",
        size: SIZE.label,
      }),
      label({
        x: 18,
        y: (box.y0 + box.y1) / 2,
        text: "estimate of π",
        size: SIZE.label,
        rotate: -90,
      }),
    );
  }

  /** @param {string[]} parts */
  function drawTrace(parts) {
    if (history.length === 0) return;
    const log = spec.traceLog === true;
    const values = history.map((value) => (log ? Math.log10(Math.max(value, FLOOR)) : value));
    const domain = domainOf(history, log);
    const { draw, x, y, box } = axes({
      width: WIDTH,
      height: TRACE,
      pad: { left: 88, right: 18, top: 14, bottom: 44 },
      x: { domain: [0, Math.max(10, history.length - 1)], ticks: 4 },
      y: {
        domain,
        ticks: log ? Math.min(7, Math.max(2, domain[1] - domain[0] + 1)) : 4,
        tickFormat: log ? powerTick : undefined,
      },
    });
    parts.push(`<g transform="translate(0 ${TOP})">${draw}`);
    parts.push(
      curve(
        /** @type {Array<[number, number]>} */ (
          values.map((value, index) => [index, value])
        ),
        { x, y, class: "fig-line", width: 2 },
      ),
    );
    if (values.length === 1) {
      parts.push(circle({ cx: x(0), cy: y(values[0]), r: 4, class: "fig-accent" }));
    }
    parts.push(
      label({
        x: (box.x0 + box.x1) / 2,
        y: TRACE - 4,
        text: spec.traceX ?? "step",
        size: SIZE.tick,
      }),
      label({
        x: 16,
        y: (box.y0 + box.y1) / 2,
        text: spec.traceLabel ?? "",
        size: SIZE.tick,
        rotate: -90,
      }),
      "</g>",
    );
  }

  react(
    sliders.map(({ input }) => input),
    reset,
    { initial: false },
  );
  reset();
  return { reset, advance };
}
