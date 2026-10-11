// Guided investigation for 11.4: the pull of one point on a line of best fit.
// A fixed scatter with one movable far point, and the least-squares line the
// software would draw. The reader sees the line move; the method is not the
// lesson, the interpretation is.
// Pure HTML and SVG, no framework and no colour of its own: the fig-* classes
// carry the theme. Runtime text is plain text, never TeX.

const FIXED = [
  { x: 1, y: 2.0 },
  { x: 2, y: 2.4 },
  { x: 3, y: 2.9 },
  { x: 4, y: 3.7 },
  { x: 5, y: 4.0 },
  { x: 6, y: 4.9 },
  { x: 7, y: 5.1 },
  { x: 8, y: 6.0 },
  { x: 9, y: 6.3 },
];
const MOVABLE_X = 10;

const PLOT_W = 360;
const PLOT_H = 240;
const LEFT = 45;
const TOP = 20;
const X_MAX = 11;
const Y_MAX = 11;

function xToPx(x) {
  return LEFT + (x / X_MAX) * PLOT_W;
}

function yToPx(y) {
  return TOP + PLOT_H - (y / Y_MAX) * PLOT_H;
}

function leastSquares(points) {
  const n = points.length;
  const sumX = points.reduce((sum, p) => sum + p.x, 0);
  const sumY = points.reduce((sum, p) => sum + p.y, 0);
  const sumXX = points.reduce((sum, p) => sum + p.x * p.x, 0);
  const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0);
  const spread = n * sumXX - sumX * sumX;
  const gradient = (n * sumXY - sumX * sumY) / spread;
  const intercept = (sumY - gradient * sumX) / n;
  return { gradient, intercept };
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:600px">
      <label>Height of the far point
        <input class="h" type="range" min="1" max="10" step="0.5" value="7">
        <output class="h-out">7</output>
      </label>
      <svg viewBox="0 0 430 290" width="100%" role="img"
           aria-label="A scatter diagram with a line of best fit and one movable point"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const hInput = el.querySelector(".h");
  const hOut = el.querySelector(".h-out");

  function render() {
    const movable = { x: MOVABLE_X, y: Number(hInput.value) };
    const points = [...FIXED, movable];
    const { gradient, intercept } = leastSquares(points);

    const axes =
      `<line x1="${xToPx(0)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(0)}" x2="${xToPx(0)}" y2="${yToPx(Y_MAX)}" class="fig-ink"></line>`;

    const lineStart = Math.max(0, Math.min(X_MAX, (0 - intercept) / gradient));
    const lineEnd = Math.max(0, Math.min(X_MAX, (Y_MAX - intercept) / gradient));
    const line =
      `<line x1="${xToPx(lineStart).toFixed(1)}" y1="${yToPx(intercept + gradient * lineStart).toFixed(1)}" ` +
      `x2="${xToPx(lineEnd).toFixed(1)}" y2="${yToPx(intercept + gradient * lineEnd).toFixed(1)}" ` +
      `class="fig-accent"></line>`;

    const dots = FIXED.map(
      (point) =>
        `<circle cx="${xToPx(point.x).toFixed(1)}" cy="${yToPx(point.y).toFixed(1)}" ` +
        `r="4" class="fig-ink"></circle>`
    ).join("");

    const farPoint =
      `<circle cx="${xToPx(movable.x).toFixed(1)}" cy="${yToPx(movable.y).toFixed(1)}" ` +
      `r="5" class="fig-warn"></circle>`;

    svg.innerHTML = axes + line + dots + farPoint;

    readout.textContent =
      `The line of best fit has gradient ${gradient.toFixed(2)} and intercept ` +
      `${intercept.toFixed(2)}. Moving the far point up tilts the line upwards; ` +
      `moving it down tilts the line downwards. One point far from the others can ` +
      `change the line a great deal.`;

    svg.setAttribute(
      "aria-label",
      `A scatter diagram of ten points with a line of best fit of gradient ` +
      `${gradient.toFixed(2)}. The far point is at height ${movable.y.toFixed(1)}.`
    );
  }

  hInput.addEventListener("input", () => {
    hOut.value = hInput.value;
    hOut.textContent = hInput.value;
    render();
  });

  render();
}
