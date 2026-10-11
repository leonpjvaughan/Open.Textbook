// Guided investigation for separable equations of the form dy/dx = k y.
// The family y = A e to the power kx, with a slider for the rate constant k.
// Positive k grows, negative k decays, and A sets the starting height.
// Pure HTML and SVG, no framework and no colour of its own: the fig-* classes
// carry the theme. Runtime text is plain text, never TeX.

const X_MIN = -1.5;
const X_MAX = 1.5;
const Y_MIN = -0.4;
const Y_MAX = 4.4;
const PLOT_W = 330;
const PLOT_H = 250;
const ORIGIN_X = 50;
const ORIGIN_Y = 280;

function xToPx(x) {
  return ORIGIN_X + ((x - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
}

function yToPx(y) {
  return ORIGIN_Y - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H;
}

function curveFor(k, a) {
  const points = [];
  for (let x = X_MIN; x <= X_MAX; x += 0.05) {
    const y = a * Math.exp(k * x);
    if (y > Y_MAX + 1) {
      continue;
    }
    points.push(`${xToPx(x).toFixed(1)},${yToPx(y).toFixed(1)}`);
  }
  return points.join(" ");
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:560px">
      <label>Rate constant k
        <input class="k" type="range" min="-1" max="1" step="0.1" value="1">
      </label>
      <svg viewBox="0 0 420 300" width="100%" role="img"
           aria-label="A family of exponential solution curves for dy by dx equals k y, with a slider for k"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const kInput = el.querySelector(".k");

  function grid() {
    let lines = "";
    for (let x = -1; x <= 1; x += 1) {
      lines +=
        `<line x1="${xToPx(x).toFixed(1)}" y1="${yToPx(Y_MIN)}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${yToPx(Y_MAX)}" class="fig-grid"></line>`;
    }
    for (let y = 1; y <= 4; y += 1) {
      lines +=
        `<line x1="${xToPx(X_MIN)}" y1="${yToPx(y).toFixed(1)}" ` +
        `x2="${xToPx(X_MAX)}" y2="${yToPx(y).toFixed(1)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function update() {
    const k = Number(kInput.value);

    const axes =
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(Y_MIN)}" x2="${xToPx(0)}" y2="${yToPx(Y_MAX)}" class="fig-ink"></line>`;

    const companionA = `<polyline points="${curveFor(k, 2)}" class="fig-line" stroke-dasharray="5 4" stroke-opacity="0.55"></polyline>`;
    const companionB = `<polyline points="${curveFor(k, 0.5)}" class="fig-line" stroke-dasharray="2 3" stroke-opacity="0.55"></polyline>`;
    const main = `<polyline points="${curveFor(k, 1)}" class="fig-line" stroke-width="2.5"></polyline>`;

    const marker = `<circle cx="${xToPx(0).toFixed(1)}" cy="${yToPx(1).toFixed(1)}" r="4" class="fig-ink"></circle>`;

    svg.innerHTML = grid() + axes + companionA + companionB + main + marker;

    const behave =
      k > 0.05 ? "grow without bound" : k < -0.05 ? "decay towards zero" : "stay constant";
    readout.textContent =
      `The rate constant is k = ${k.toFixed(1)}. Every solution has the form y = A times e to the power kx. ` +
      `The solid curve has A = 1 and passes through the point (0, 1). ` +
      `Because k is ${k > 0.05 ? "positive" : k < -0.05 ? "negative" : "zero"}, the curves ${behave}. ` +
      `The dashed companions have A = 0.5 and A = 2.`;

    svg.setAttribute(
      "aria-label",
      `Three exponential solution curves for dy by dx equals k y with k equals ${k.toFixed(1)}. ` +
        `The curves ${behave} as x increases.`
    );
  }

  kInput.addEventListener("input", update);
  update();
}
