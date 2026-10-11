// Guided investigation for the graphs of y = a^x and y = e^x.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.

const X_MIN = -3;
const X_MAX = 3;
const Y_MAX = 16;

function xToPx(x) {
  return 200 + x * 60;
}

function yToPx(y) {
  return 250 - (y * 230) / Y_MAX;
}

function curve(base) {
  const points = [];
  for (let x = X_MIN; x <= X_MAX + 1e-9; x += 0.05) {
    const y = Math.pow(base, x);
    if (y > Y_MAX) {
      break;
    }
    points.push(`${xToPx(x).toFixed(1)},${yToPx(y).toFixed(1)}`);
  }
  return points.length > 1 ? `M ${points.join(" L ")}` : "";
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <label>Base a
        <input class="a" type="range" min="0.2" max="4" step="0.1" value="2">
      </label>
      <svg viewBox="0 0 400 280" width="100%" role="img"
           aria-label="The graph of y equals a to the power x, with a slider for the base and the graph of y equals e to the power x for comparison"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const slider = el.querySelector(".a");

  function grid() {
    let lines = "";
    for (let x = X_MIN; x <= X_MAX; x += 1) {
      lines +=
        `<line x1="${xToPx(x).toFixed(1)}" y1="${yToPx(0)}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${yToPx(Y_MAX)}" class="fig-grid"></line>`;
    }
    for (let y = 0; y <= Y_MAX; y += 4) {
      lines +=
        `<line x1="${xToPx(X_MIN)}" y1="${yToPx(y).toFixed(1)}" ` +
        `x2="${xToPx(X_MAX)}" y2="${yToPx(y).toFixed(1)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function update() {
    const a = Number(slider.value);

    const axes =
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(0)}" x2="${xToPx(0)}" y2="${yToPx(Y_MAX)}" class="fig-ink"></line>`;

    const asymptote =
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" ` +
      `class="fig-ink" stroke-dasharray="4 3"></line>`;

    const reference =
      `<path d="${curve(Math.E)}" fill="none" class="fig-ink" stroke-width="1.5" stroke-dasharray="4 3"></path>`;

    const main =
      `<path d="${curve(a)}" fill="none" class="fig-accent" stroke-width="2"></path>` +
      `<circle cx="${xToPx(0)}" cy="${yToPx(1)}" r="4" class="fig-accent"></circle>`;

    svg.innerHTML = grid() + axes + asymptote + reference + main;

    const direction = a > 1 ? "rising" : a < 1 ? "falling" : "flat";
    const atOne = a.toFixed(2);
    readout.textContent =
      `Base a = ${a.toFixed(1)}. The curve is ${direction}. ` +
      `It passes through (0, 1) and its horizontal asymptote is y = 0. ` +
      `At x = 1, y = ${atOne}. The dashed curve is y = e^x.`;

    svg.setAttribute(
      "aria-label",
      `The graph of y equals ${a.toFixed(1)} to the power x. ` +
        `The curve is ${direction}, passes through (0, 1), and approaches the horizontal line y equals 0. ` +
        `At x equals 1 the value is ${atOne}. A dashed curve shows y equals e to the power x for comparison.`
    );
  }

  slider.addEventListener("input", update);
  update();
}
