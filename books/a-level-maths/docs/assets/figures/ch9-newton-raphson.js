// Guided investigation for the Newton-Raphson method: a tangent, and where it
// crosses the axis.
//
// Section 9.3 teaches the formula from the tangent, then teaches the three ways
// it fails. The figure lets the reader meet both: move the starting value and
// watch the estimate slide towards a root, or watch the method stall at a
// stationary point or fall into a cycle. Four equations, one of each behaviour.
//
// Plain HTML, SVG, a select and one range input, so it is keyboard-operable with
// no framework, and no colour of its own: the fig-* classes carry the theme.
// Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the controls, the live
// readout and the redraw — comes from `kit.js`. The verdict line is the figure's
// own text, so it stays here.
import { panel, slider, chooser, react } from "./kit.js";

const MAPS = [
  {
    id: "cubic",
    label: "f(x) = x cubed + x - 1",
    f: (x) => x * x * x + x - 1,
    df: (x) => 3 * x * x + 1,
    // The step as Python, because the readout prints the estimates and the verifier has
    // to be able to reach the next one from the last: `x - f(x) / f'(x)`.
    step: "x - (x ** 3 + x - 1) / (3 * x ** 2 + 1)",
    root: 0.6823278,
    xMin: 0.3,
    xMax: 1.2,
    yMin: -0.6,
    yMax: 1.0,
    startMin: 0.35,
    startMax: 1.15,
    startDefault: 0.7,
  },
  {
    id: "exp",
    label: "f(x) = e to the x, minus 3x",
    f: (x) => Math.exp(x) - 3 * x,
    df: (x) => Math.exp(x) - 3,
    step: "x - (exp(x) - 3 * x) / (exp(x) - 3)",
    root: 1.5121346,
    xMin: 0.4,
    xMax: 2.2,
    yMin: -2,
    yMax: 3,
    startMin: 0.5,
    startMax: 2.1,
    startDefault: 1.5,
  },
  {
    id: "cycle",
    label: "f(x) = x cubed, minus 2x, plus 2",
    f: (x) => x * x * x - 2 * x + 2,
    df: (x) => 3 * x * x - 2,
    step: "x - (x ** 3 - 2 * x + 2) / (3 * x ** 2 - 2)",
    root: null,
    xMin: -1.6,
    xMax: 1.8,
    yMin: -2,
    yMax: 3,
    startMin: -1.4,
    startMax: 1.6,
    startDefault: 0.2,
  },
  {
    id: "stationary",
    label: "f(x) = x squared, minus 4",
    f: (x) => x * x - 4,
    df: (x) => 2 * x,
    step: "x - (x ** 2 - 4) / (2 * x)",
    root: 2,
    xMin: -3,
    xMax: 3,
    yMin: -4,
    yMax: 5,
    startMin: -2.8,
    startMax: 2.8,
    startDefault: 0,
  },
];

const LEFT = 40;
const RIGHT = 372;
const TOP = 20;
const BOTTOM = 300;

function short(value) {
  if (!Number.isFinite(value)) return "not a number";
  if (Math.abs(value) > 1000) return value.toExponential(2);
  return value.toFixed(4);
}

export function mount(el) {
  const { root, svg, readout, claim } = panel(el, {
    label:
      "Graph of a function with the tangent at the current estimate, the " +
      "crossing of the tangent with the axis, and the first few Newton-Raphson " +
      "estimates",
    width: 400,
    height: 320,
  });

  const select = chooser(el, {
    id: "map",
    label: "Equation",
    choices: MAPS.map((m) => ({ value: m.id, label: m.label })),
  });
  const startInput = slider(el, { show: false,
    id: "start",
    label: "Starting value, x0",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.5,
  });

  const verdict = document.createElement("p");
  verdict.className = "fig-note";
  root.append(verdict);

  function currentMap() {
    return MAPS.find((m) => m.id === select.value) || MAPS[0];
  }

  function scale(map) {
    return {
      px: (x) => LEFT + ((x - map.xMin) / (map.xMax - map.xMin)) * (RIGHT - LEFT),
      py: (y) => BOTTOM - ((y - map.yMin) / (map.yMax - map.yMin)) * (BOTTOM - TOP),
    };
  }

  // The slider is a fraction of the map's starting range, so one control fits
  // every equation.
  function startValue(map) {
    const t = Number(startInput.value);
    return map.startMin + t * (map.startMax - map.startMin);
  }

  function analyse(map, x0) {
    const xs = [x0];
    let x = x0;
    let failure = "";
    for (let i = 0; i < 5; i += 1) {
      const slope = map.df(x);
      if (Math.abs(slope) < 1e-9) {
        failure = "stationary";
        break;
      }
      const next = x - map.f(x) / slope;
      if (!Number.isFinite(next) || Math.abs(next) > 50) {
        failure = "diverged";
        break;
      }
      xs.push(next);
      if (Math.abs(next - x) < 1e-12) break;
      x = next;
    }
    return { xs, failure };
  }

  function draw() {
    const map = currentMap();
    const { px, py } = scale(map);
    const x0 = startValue(map);
    const { xs, failure } = analyse(map, x0);

    const axes =
      `<line class="fig-grid" x1="${LEFT}" y1="${py(0).toFixed(1)}" ` +
      `x2="${RIGHT}" y2="${py(0).toFixed(1)}" stroke-width="1"></line>` +
      `<line class="fig-grid" x1="${px(0).toFixed(1)}" y1="${TOP}" ` +
      `x2="${px(0).toFixed(1)}" y2="${BOTTOM}" stroke-width="1"></line>`;

    const curvePoints = [];
    for (let i = 0; i <= 240; i += 1) {
      const x = map.xMin + ((map.xMax - map.xMin) * i) / 240;
      const y = Math.max(map.yMin, Math.min(map.yMax, map.f(x)));
      curvePoints.push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`);
    }
    const curve =
      `<polyline class="fig-accent" fill="none" points="${curvePoints.join(" ")}"></polyline>`;

    // The starting point, and the tangent it launches.
    let marks = "";
    const y0 = map.f(x0);
    marks +=
      `<circle class="fig-ink" cx="${px(x0).toFixed(1)}" cy="${py(y0).toFixed(1)}" r="4"></circle>`;
    if (!failure && xs.length > 1) {
      marks +=
        `<line class="fig-warn" x1="${px(x0).toFixed(1)}" y1="${py(y0).toFixed(1)}" ` +
        `x2="${px(xs[1]).toFixed(1)}" y2="${py(0).toFixed(1)}" stroke-width="1.8"></line>`;
    }
    // The sequence of estimates on the axis.
    xs.slice(1).forEach((value, index) => {
      if (value < map.xMin || value > map.xMax) return;
      const cls = index === 0 ? "fig-warn" : "fig-good";
      marks += `<circle class="${cls}" cx="${px(value).toFixed(1)}" cy="${py(0).toFixed(1)}" r="4"></circle>`;
    });

    if (map.root !== null && map.root >= map.xMin && map.root <= map.xMax) {
      marks +=
        `<circle class="fig-good" cx="${px(map.root).toFixed(1)}" cy="${py(0).toFixed(1)}" ` +
        `r="3" opacity="0.7"></circle>`;
    }

    svg.innerHTML = axes + curve + marks;

    // The sequence *is* the arithmetic: each estimate is the previous one minus its own
    // value over its slope. Declared step by step, so a printed 0.6823 that does not
    // follow from 0.7020 is a finding rather than a rounding choice.
    const claims = [
      {
        label: "the starting value, from the control's fraction of the range",
        expression: "startMin + t * (startMax - startMin)",
        values: { startMin: map.startMin, startMax: map.startMax, t: Number(startInput.value) },
        answer: x0,
        shown: short(x0),
      },
    ];
    for (let i = 1; i < xs.length; i += 1) {
      claims.push({
        label: `estimate ${i}, from estimate ${i - 1}`,
        expression: map.step,
        values: { x: xs[i - 1] },
        answer: xs[i],
        shown: short(xs[i]),
      });
    }
    claim(claims);
    readout.textContent =
      `Starting at x0 = ${short(x0)}, the estimates are ` +
      xs.map(short).join(", ") + ".";

    if (failure === "stationary") {
      verdict.textContent =
        "The derivative at the starting value is zero. The tangent is horizontal, " +
        "so it never meets the axis and the method stops at the first step.";
    } else if (failure === "diverged") {
      verdict.textContent =
        "The estimates are running away from the root, so this starting value " +
        "does not work.";
    } else if (xs.length > 2 && Math.abs(xs[xs.length - 1] - xs[xs.length - 2]) > 1e-4) {
      verdict.textContent =
        "The estimates are not settling. This function has a cycle for some " +
        "starting values: the estimates repeat instead of reaching a root.";
    } else {
      verdict.textContent =
        "The estimates are closing on a root. Each tangent gives a better " +
        "estimate than the value it came from.";
    }
  }

  select.addEventListener("change", () => {
    const map = currentMap();
    startInput.value = String(
      (map.startDefault - map.startMin) / (map.startMax - map.startMin),
    );
    draw();
  });
  react(startInput, draw, { initial: false });

  const first = currentMap();
  startInput.value = String(
    (first.startDefault - first.startMin) / (first.startMax - first.startMin),
  );
  draw();
}
