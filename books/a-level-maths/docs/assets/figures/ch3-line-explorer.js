// Guided investigation for the gradient and intercept of a straight line.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`.
import { SIZE, label, panel, react, slider } from "./kit.js";

const X_MIN = -6;
const X_MAX = 6;
const Y_MIN = -8;
const Y_MAX = 8;

function xToPx(x) {
  return 180 + (x * 180) / 6;
}

function yToPx(y) {
  return 150 - (y * 150) / 8;
}

function signed(value) {
  return value < 0 ? `- ${Math.abs(value)}` : `+ ${value}`;
}

function tail(value) {
  return value === 0 ? "" : ` ${signed(value)}`;
}

function formatLine(m, c) {
  const slope = m === 0 ? "" : m === 1 ? "x" : m === -1 ? "-x" : `${m}x`;
  if (m === 0) {
    return `y = ${c}`;
  }
  return `y = ${slope}${tail(c)}`;
}

function formatGeneral(m, c) {
  if (m === 0) {
    return `y${tail(-c)} = 0`;
  }
  const slope = m === 1 ? "x" : m === -1 ? "-x" : `${m}x`;
  return `${slope} - y${tail(c)} = 0`;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A straight line on axes, with its gradient and intercept",
    width: 360,
    height: 300,
    max: 520,
  });

  const mInput = slider(el, {
    id: "m",
    label: "Gradient m",
    min: -4,
    max: 4,
    step: 1,
    value: 2,
    show: false,
  });
  const cInput = slider(el, {
    id: "c",
    label: "Intercept c",
    min: -6,
    max: 6,
    step: 1,
    value: 3,
    show: false,
  });

  function grid() {
    let lines = "";
    for (let x = X_MIN; x <= X_MAX; x += 1) {
      lines +=
        `<line x1="${xToPx(x).toFixed(1)}" y1="${yToPx(Y_MIN)}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${yToPx(Y_MAX)}" class="fig-grid"></line>`;
    }
    for (let y = Y_MIN; y <= Y_MAX; y += 1) {
      lines +=
        `<line x1="${xToPx(X_MIN)}" y1="${yToPx(y).toFixed(1)}" ` +
        `x2="${xToPx(X_MAX)}" y2="${yToPx(y).toFixed(1)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function endpoints(m, c) {
    const candidates = [];
    for (const x of [X_MIN, X_MAX]) {
      const y = m * x + c;
      if (y >= Y_MIN && y <= Y_MAX) {
        candidates.push([x, y]);
      }
    }
    if (m !== 0) {
      for (const y of [Y_MIN, Y_MAX]) {
        const x = (y - c) / m;
        if (x >= X_MIN && x <= X_MAX) {
          candidates.push([x, y]);
        }
      }
    }
    candidates.sort((a, b) => a[0] - b[0]);
    return candidates.length >= 2
      ? [candidates[0], candidates[candidates.length - 1]]
      : [];
  }

  function update() {
    const m = Number(mInput.value);
    const c = Number(cInput.value);

    const axes =
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(Y_MIN)}" x2="${xToPx(0)}" y2="${yToPx(Y_MAX)}" class="fig-ink"></line>`;

    const ends = endpoints(m, c);
    const line = ends.length
      ? `<line x1="${xToPx(ends[0][0]).toFixed(1)}" y1="${yToPx(ends[0][1]).toFixed(1)}" ` +
        `x2="${xToPx(ends[1][0]).toFixed(1)}" y2="${yToPx(ends[1][1]).toFixed(1)}" ` +
        `class="fig-line"></line>`
      : "";

    // The step triangle: across one unit, up by the gradient.
    let step = "";
    const stepY = c + m;
    if (stepY >= Y_MIN && stepY <= Y_MAX && c >= Y_MIN && c <= Y_MAX) {
      step =
        `<line x1="${xToPx(0)}" y1="${yToPx(c).toFixed(1)}" x2="${xToPx(1)}" y2="${yToPx(c).toFixed(1)}" class="fig-grid"></line>` +
        `<line x1="${xToPx(1)}" y1="${yToPx(c).toFixed(1)}" x2="${xToPx(1)}" y2="${yToPx(stepY).toFixed(1)}" class="fig-warn"></line>`;
    }

    const marker =
      `<circle cx="${xToPx(0)}" cy="${yToPx(c).toFixed(1)}" r="4" class="fig-accent"></circle>`;

    const yLabel =
      label({ x: xToPx(X_MAX) - 14, y: yToPx(0) - 6, text: "x", anchor: "start", class: "text-ink" }) +
      label({ x: xToPx(0) + 6, y: yToPx(Y_MAX) + 14, text: "y", anchor: "start", class: "text-ink" });

    svg.innerHTML = grid() + axes + step + line + marker + yLabel;

    const direction =
      m > 0 ? "rising" : m < 0 ? "falling" : "horizontal";
    readout.textContent =
      `${formatLine(m, c)}. Gradient ${m}. Intercept ${c}, at (0, ${c}). ` +
      `The line is ${direction}. Across 1, up ${m}. ` +
      `In general form, ${formatGeneral(m, c)}.`;

    svg.setAttribute(
      "aria-label",
      `A straight line on axes. The equation is ${formatLine(m, c)}. ` +
        `Its gradient is ${m} and its intercept on the y axis is ${c}. ` +
        `The line is ${direction}.`
    );
  }

  react([mInput, cInput], update);
}
