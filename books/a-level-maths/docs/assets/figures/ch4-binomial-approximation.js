// Guided investigation for 4.2: the binomial expansion of (1 + x)^n when n is a
// fraction or a negative number, and the range over which the first few terms
// approximate the true value.
//
// The reader adds terms and moves the point x, and sees how closely the
// polynomial follows the curve inside |x| < 1 and how the two separate outside
// it. That is what "valid" means here, so the figure carries the section.
//
// Predict -> Test -> Explain per AGENTS.md P6: the page asks what the gap will
// do before a control is touched, and asks for the reason afterwards. Colours
// come from CSS classes, so the figure adapts to every bundle and both schemes;
// the readout is `aria-live`.
//
// The scaffolding — the surface, its accessible name, the chooser and sliders,
// the live readout and the redraw — comes from `kit.js`.
import { panel, slider, chooser, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A graph of the curve (1 + x) to the power n, the first few terms of its " +
      "binomial expansion, and the range where the expansion is valid",
    width: 520,
    height: 320,
    max: 560,
  });

  const nSelect = chooser(el, {
    id: "n",
    label: "Power n",
    choices: [
      { value: "0.5", label: "1/2" },
      { value: "-0.5", label: "-1/2" },
      { value: "-1", label: "-1" },
      { value: "1.5", label: "3/2" },
    ],
  });
  // `chooser()` has no `name` option, so the longer accessible name the module
  // carried is kept here.
  nSelect.setAttribute(
    "aria-label",
    "Power n in the expansion of (1 + x) to the power n"
  );

  const termsInput = slider(el, { show: true,
    id: "terms",
    label: "Terms used",
    name: "Number of terms of the expansion to add",
    min: 1,
    max: 10,
    step: 1,
    value: 4,
  });
  const xInput = slider(el, { show: true,
    id: "x",
    label: "Position x",
    name: "Value of x at which the expansion is measured",
    min: -0.9,
    max: 1.4,
    step: 0.05,
    value: 0.5,
    format: (value) => value.toFixed(2),
  });

  const WIDTH = 520;
  const HEIGHT = 320;
  const LEFT = 44;
  const RIGHT = 500;
  const TOP = 18;
  const BOTTOM = 272;

  const X_MIN = -1;
  const X_MAX = 1.5;
  const Y_MIN = -2;
  const Y_MAX = 4;

  const xToPx = (x) => LEFT + ((x - X_MIN) / (X_MAX - X_MIN)) * (RIGHT - LEFT);
  const yToPx = (y) => BOTTOM - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * (BOTTOM - TOP);

  // The binomial coefficients for a rational n, one factor at a time:
  // c_r = c_{r-1} (n - r + 1) / r.
  function coefficients(n, count) {
    const row = [1];
    for (let r = 1; r < count; r += 1) {
      row.push((row[r - 1] * (n - (r - 1))) / r);
    }
    return row;
  }

  function partialSum(row, x, terms) {
    let sum = 0;
    for (let r = 0; r < terms; r += 1) {
      sum += row[r] * Math.pow(x, r);
    }
    return sum;
  }

  // A path that is cut wherever the curve leaves the drawing, so a value that
  // runs off to infinity is not joined to a value far away by a false line.
  function pathFor(valueAt) {
    const steps = 480;
    const segments = [];
    let points = [];
    for (let index = 0; index <= steps; index += 1) {
      const x = X_MIN + ((X_MAX - X_MIN) * index) / steps;
      const y = valueAt(x);
      const inside = Number.isFinite(y) && y >= Y_MIN - 0.6 && y <= Y_MAX + 0.6;
      if (inside) {
        points.push(`${xToPx(x).toFixed(1)},${yToPx(y).toFixed(1)}`);
      } else {
        if (points.length > 1) {
          segments.push(`M ${points[0]} L ${points.slice(1).join(" L ")}`);
        }
        points = [];
      }
    }
    if (points.length > 1) {
      segments.push(`M ${points[0]} L ${points.slice(1).join(" L ")}`);
    }
    return segments.join(" ");
  }

  const text = (x, y, label, anchor = "middle", cls = "fig-ink") =>
    `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" ` +
    `font-size="15" class="${cls}">${label}</text>`;

  function render() {
    const n = Number(nSelect.value);
    const terms = Number(termsInput.value);
    const x0 = Number(xInput.value);
    const row = coefficients(n, 10);

    const trueCurve = pathFor((x) => Math.pow(1 + x, n));
    const approxCurve = pathFor((x) => partialSum(row, x, terms));

    const trueValue = Math.pow(1 + x0, n);
    const approxValue = partialSum(row, x0, terms);

    let grid = "";
    for (let y = Y_MIN; y <= Y_MAX; y += 2) {
      grid +=
        `<line x1="${LEFT}" y1="${yToPx(y).toFixed(1)}" ` +
        `x2="${RIGHT}" y2="${yToPx(y).toFixed(1)}" class="fig-grid"></line>`;
    }
    for (const x of [-0.5, 0.5, 1.5]) {
      grid +=
        `<line x1="${xToPx(x).toFixed(1)}" y1="${TOP}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${BOTTOM}" class="fig-grid"></line>`;
    }

    const axes =
      `<line x1="${LEFT}" y1="${yToPx(0).toFixed(1)}" x2="${RIGHT}" ` +
      `y2="${yToPx(0).toFixed(1)}" class="fig-ink" stroke-width="1.5"></line>` +
      `<line x1="${xToPx(0).toFixed(1)}" y1="${TOP}" x2="${xToPx(0).toFixed(1)}" ` +
      `y2="${BOTTOM}" class="fig-ink" stroke-width="1.5"></line>`;

    // The two ends of the range of validity, drawn as dashed verticals.
    const edges =
      [-1, 1]
        .map(
          (x) =>
            `<line x1="${xToPx(x).toFixed(1)}" y1="${TOP}" ` +
            `x2="${xToPx(x).toFixed(1)}" y2="${BOTTOM}" class="fig-ink" ` +
            `stroke-width="1.5" stroke-dasharray="5 4"></line>`
        )
        .join("");

    const curves =
      `<path d="${trueCurve}" class="fig-ink" style="fill:none" stroke-width="2.5"></path>` +
      `<path d="${approxCurve}" class="fig-warn" style="fill:none" stroke-width="2" ` +
      `stroke-dasharray="7 4"></path>`;

    const markerX = xToPx(x0);
    const marker =
      `<line x1="${markerX.toFixed(1)}" y1="${TOP}" x2="${markerX.toFixed(1)}" ` +
      `y2="${BOTTOM}" class="fig-grid" stroke-dasharray="2 3"></line>`;

    let points = "";
    if (Number.isFinite(trueValue) && trueValue >= Y_MIN - 0.6 && trueValue <= Y_MAX + 0.6) {
      points +=
        `<circle cx="${markerX.toFixed(1)}" cy="${yToPx(trueValue).toFixed(1)}" ` +
        `r="4" class="fig-good"></circle>`;
    }
    if (Number.isFinite(approxValue) && approxValue >= Y_MIN - 0.6 && approxValue <= Y_MAX + 0.6) {
      points +=
        `<circle cx="${markerX.toFixed(1)}" cy="${yToPx(approxValue).toFixed(1)}" ` +
        `r="7" class="fig-warn" style="fill:none" stroke-width="2.5"></circle>`;
    }

    const labels =
      text(LEFT - 6, yToPx(0) + 4, "0", "end") +
      text(LEFT - 6, yToPx(2) + 4, "2", "end") +
      text(LEFT - 6, yToPx(4) + 4, "4", "end") +
      text(xToPx(-1), BOTTOM + 18, "-1") +
      text(xToPx(0), BOTTOM + 18, "0") +
      text(xToPx(1), BOTTOM + 18, "1") +
      text(xToPx(1) - 6, TOP + 12, "|x| = 1", "end") +
      text(xToPx(-1) + 6, TOP + 12, "|x| = 1", "start");

    svg.innerHTML =
      grid + axes + edges + curves + marker + points + labels;

    readout.textContent =
      `With ${terms} term${terms === 1 ? "" : "s"}, the approximation at ` +
      `x = ${x0.toFixed(2)} is ${approxValue.toFixed(5)}. The true value is ` +
      `${trueValue.toFixed(5)}. The error is ` +
      `${Math.abs(approxValue - trueValue).toFixed(5)}. The expansion is valid ` +
      `only for |x| < 1.`;

    svg.setAttribute(
      "aria-label",
      `A graph of (1 + x) to the power ${n} and the first ${terms} terms of its ` +
        `binomial expansion. The range of validity ends at x = -1 and x = 1, and ` +
        `the point x = ${x0.toFixed(2)} is marked on both curves.`
    );
  }

  react([nSelect, termsInput, xInput], render);
}
