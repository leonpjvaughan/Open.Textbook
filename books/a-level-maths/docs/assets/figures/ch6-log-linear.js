// Guided investigation for straightening y = k b^x with logarithms.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. The kit has no button helper, so
// the view button stays here.
import { panel, slider, react } from "./kit.js";

const X_MAX = 4;
const K = 10;

function xToPx(x) {
  return 50 + (x * 320) / X_MAX;
}

function yToPx(y, yMax) {
  return 250 - (y * 220) / yMax;
}

function linePoints(base) {
  const points = [];
  for (let x = 0; x <= X_MAX + 1e-9; x += 0.1) {
    points.push(
      `${xToPx(x).toFixed(1)},${yToPx(K * Math.pow(base, x), 160).toFixed(1)}`
    );
  }
  return `M ${points.join(" L ")}`;
}

function logLinePoints(base) {
  const points = [];
  for (let x = 0; x <= X_MAX + 1e-9; x += 0.1) {
    points.push(
      `${xToPx(x).toFixed(1)},${yToPx(Math.log(K) + x * Math.log(base), 6).toFixed(1)}`
    );
  }
  return `M ${points.join(" L ")}`;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Data that follows y equals k times b to the power x, shown either as a " +
      "curve of y against x or as a straight line of ln y against x",
    width: 400,
    height: 280,
    max: 520,
  });

  const bInput = slider(el, { show: false,
    id: "b",
    label: "Growth factor b",
    min: 0.5,
    max: 2,
    step: 0.1,
    value: 1.5,
  });

  // The kit has no button helper, so the control that is an action rather than a
  // state is built here, beside the control column.
  const actions = document.createElement("p");
  actions.style.cssText = "margin:0;grid-column:1/-1";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "toggle";
  button.textContent = "Show ln y against x";
  actions.append(button);
  el.querySelector(".fig-controls").append(actions);

  let logMode = false;

  function axes(yMax, step) {
    let lines = "";
    for (let x = 0; x <= X_MAX; x += 1) {
      lines +=
        `<line x1="${xToPx(x).toFixed(1)}" y1="${yToPx(0, yMax)}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${yToPx(yMax, yMax)}" class="fig-grid"></line>`;
    }
    for (let y = 0; y <= yMax + 1e-9; y += step) {
      lines +=
        `<line x1="${xToPx(0)}" y1="${yToPx(y, yMax).toFixed(1)}" ` +
        `x2="${xToPx(X_MAX)}" y2="${yToPx(y, yMax).toFixed(1)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function update() {
    const b = Number(bInput.value);
    const yMax = logMode ? 6 : 160;
    const step = logMode ? 1 : 40;

    const frame =
      `<line x1="${xToPx(0)}" y1="${yToPx(0, yMax)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0, yMax)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(yMax, yMax)}" x2="${xToPx(0)}" y2="${yToPx(0, yMax)}" class="fig-ink"></line>`;

    let marks = "";
    for (let x = 0; x <= X_MAX; x += 1) {
      const value = logMode ? Math.log(K) + x * Math.log(b) : K * Math.pow(b, x);
      marks +=
        `<circle cx="${xToPx(x).toFixed(1)}" cy="${yToPx(value, yMax).toFixed(1)}" r="4" class="fig-accent"></circle>`;
    }

    const path = logMode ? logLinePoints(b) : linePoints(b);
    svg.innerHTML =
      axes(yMax, step) +
      frame +
      `<path d="${path}" style="fill:none" class="fig-warn" stroke-width="2"></path>` +
      marks;

    button.textContent = logMode
      ? "Show y against x"
      : "Show ln y against x";

    const gradient = Math.log(b).toFixed(3);
    const intercept = Math.log(K).toFixed(3);
    readout.textContent = logMode
      ? `Plotting ln y against x. The points lie on a straight line with gradient ${gradient} and intercept ${intercept}.`
      : `Plotting y against x. The points lie on a curve. Switch the view to see what a logarithm does.`;

    svg.setAttribute(
      "aria-label",
      logMode
        ? `The straight line graph of ln y against x, with gradient ${gradient} and intercept ${intercept}.`
        : `The curved graph of y against x for y equals ${K} times ${b.toFixed(1)} to the power x, with four marked data points.`
    );
  }

  function toggle() {
    logMode = !logMode;
    update();
  }

  react(bInput, update);
  button.addEventListener("click", toggle);
}
