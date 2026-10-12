// Guided investigation for the graph of an inverse function.
//
// The graph of y = f inverse of x is the graph of y = f(x) reflected in the line
// y = x, because the reflection swaps the two coordinates and reversing a
// function swaps them too. The reader moves a point along the line, watches its
// image, and reads the inverse off the reflection.
//
// Predict -> Test -> Explain lives on the page: the reader predicts where a
// chosen point lands before moving a slider, and explains the swap afterwards.
// The module carries no colour of its own. The fig-* and text-* classes read the
// --tb-* tokens, so the figure follows the reader's bundle and both schemes, and
// the readout is aria-live so a reader who cannot see the drawing is told what
// changed. Runtime text is plain text, never TeX.

const X_MIN = -8;
const X_MAX = 8;
const Y_MIN = -8;
const Y_MAX = 8;
const LEFT = 22;
const RIGHT = 298;
const TOP = 22;
const BOTTOM = 298;

function xToPx(x) {
  return LEFT + ((x - X_MIN) * (RIGHT - LEFT)) / (X_MAX - X_MIN);
}

function yToPx(y) {
  return TOP + ((Y_MAX - y) * (BOTTOM - TOP)) / (Y_MAX - Y_MIN);
}

// "x + 2", "x - 2", or "x", depending on the sign of the shift.
function shifted(c) {
  if (c === 0) return "x";
  return c > 0 ? `x + ${c}` : `x - ${-c}`;
}

function coefficient(m) {
  return m === 1 ? "" : `${m}`;
}

function text(x, y, label, cls) {
  return (
    `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" ` +
    `font-size="12" class="${cls}">${label}</text>`
  );
}

// The part of the line y = m x + c that lies inside the drawing, as two points
// sorted left to right. The gradient is never zero, so there are always two.
function clipLine(m, c) {
  const points = [];
  const add = (x, y) => {
    if (
      x >= X_MIN - 1e-9 &&
      x <= X_MAX + 1e-9 &&
      y >= Y_MIN - 1e-9 &&
      y <= Y_MAX + 1e-9
    ) {
      points.push([
        Math.min(X_MAX, Math.max(X_MIN, x)),
        Math.min(Y_MAX, Math.max(Y_MIN, y)),
      ]);
    }
  };
  add(X_MIN, m * X_MIN + c);
  add(X_MAX, m * X_MAX + c);
  add((Y_MIN - c) / m, Y_MIN);
  add((Y_MAX - c) / m, Y_MAX);
  if (points.length < 2) return null;
  const unique = points.filter(
    (p, i) => points.findIndex((q) => Math.abs(q[0] - p[0]) < 1e-6 && Math.abs(q[1] - p[1]) < 1e-6) === i
  );
  if (unique.length < 2) return null;
  unique.sort((p, q) => p[0] - q[0]);
  return [unique[0], unique[unique.length - 1]];
}

function pathOf(segment) {
  return (
    `M ${xToPx(segment[0][0]).toFixed(1)},${yToPx(segment[0][1]).toFixed(1)} ` +
    `L ${xToPx(segment[1][0]).toFixed(1)},${yToPx(segment[1][1]).toFixed(1)}`
  );
}

function along(segment, fraction) {
  return [
    segment[0][0] + (segment[1][0] - segment[0][0]) * fraction,
    segment[0][1] + (segment[1][1] - segment[0][1]) * fraction,
  ];
}

function grid() {
  const lines = [];
  for (let x = X_MIN + 1; x < X_MAX; x += 2) {
    lines.push(
      `<line x1="${xToPx(x).toFixed(1)}" y1="${TOP}" x2="${xToPx(x).toFixed(1)}" ` +
        `y2="${BOTTOM}" class="fig-grid" stroke-width="1"></line>`
    );
  }
  for (let y = Y_MIN + 1; y < Y_MAX; y += 2) {
    lines.push(
      `<line x1="${LEFT}" y1="${yToPx(y).toFixed(1)}" x2="${RIGHT}" ` +
        `y2="${yToPx(y).toFixed(1)}" class="fig-grid" stroke-width="1"></line>`
    );
  }
  return lines.join("");
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <label style="display:block">Gradient of f
        <input class="m" type="range" min="0.5" max="2" step="0.5" value="2"
               aria-label="Gradient of the function f">
      </label>
      <label style="display:block">Intercept of f
        <input class="c" type="range" min="-2" max="2" step="1" value="1"
               aria-label="Vertical intercept of the function f">
      </label>
      <label style="display:block">Position of the tracked point
        <input class="t" type="range" min="-3" max="3" step="0.5" value="2"
               aria-label="Horizontal position of the tracked point on the graph of f">
      </label>
      <svg viewBox="0 0 320 320" width="100%" role="img"
           aria-label="A straight line and its reflection in the line y equals x, with a marked point and its image"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const mInput = el.querySelector(".m");
  const cInput = el.querySelector(".c");
  const tInput = el.querySelector(".t");

  function update() {
    const m = Number(mInput.value);
    const c = Number(cInput.value);
    const t = Number(tInput.value);

    const graph = clipLine(m, c);
    const mirror = clipLine(1 / m, -c / m);

    const axes =
      `<line x1="${LEFT}" y1="${yToPx(0).toFixed(1)}" x2="${RIGHT}" y2="${yToPx(0).toFixed(1)}" class="fig-ink" stroke-width="1"></line>` +
      `<line x1="${xToPx(0).toFixed(1)}" y1="${TOP}" x2="${xToPx(0).toFixed(1)}" y2="${BOTTOM}" class="fig-ink" stroke-width="1"></line>`;

    const mirrorLine =
      `<line x1="${xToPx(X_MIN).toFixed(1)}" y1="${yToPx(Y_MIN).toFixed(1)}" ` +
      `x2="${xToPx(X_MAX).toFixed(1)}" y2="${yToPx(Y_MAX).toFixed(1)}" ` +
      `class="fig-warn" stroke-width="2" stroke-dasharray="7 5"></line>`;

    const pointX = t;
    const pointY = m * t + c;
    const swapped = { x: pointY, y: pointX };

    const staircase =
      `<path d="M ${xToPx(pointX).toFixed(1)},${yToPx(pointY).toFixed(1)} ` +
      `L ${xToPx(swapped.x).toFixed(1)},${yToPx(pointY).toFixed(1)} ` +
      `L ${xToPx(swapped.x).toFixed(1)},${yToPx(swapped.y).toFixed(1)}" ` +
      `style="fill:none" class="fig-grid" stroke-width="1" stroke-dasharray="3 3"></path>`;

    const marks =
      `<circle cx="${xToPx(pointX).toFixed(1)}" cy="${yToPx(pointY).toFixed(1)}" r="4" class="fig-accent"></circle>` +
      `<circle cx="${xToPx(swapped.x).toFixed(1)}" cy="${yToPx(swapped.y).toFixed(1)}" r="4" class="fig-good"></circle>`;

    const labelF = along(graph, 0.72);
    const labelInverse = along(mirror, 0.28);

    const labels =
      text(xToPx(5.4) - 34, yToPx(5.4) - 6, "y = x", "text-warn") +
      text(xToPx(labelF[0]), yToPx(labelF[1]) - 7, "y = f(x)", "text-accent") +
      text(xToPx(labelInverse[0]), yToPx(labelInverse[1]) - 7, "inverse of f", "text-good") +
      text(xToPx(pointX) - 12, yToPx(pointY) - 8, "P", "text-ink") +
      text(xToPx(swapped.x) + 12, yToPx(swapped.y) + 14, "image of P", "text-good");

    svg.innerHTML =
      grid() +
      axes +
      mirrorLine +
      `<path d="${pathOf(graph)}" style="fill:none" class="fig-accent" stroke-width="2"></path>` +
      `<path d="${pathOf(mirror)}" style="fill:none" class="fig-good" stroke-width="2"></path>` +
      staircase +
      marks +
      labels;

    const fText = `f(x) = ${coefficient(m)}${shifted(c)}`;
    const inverseText =
      c === 0 ? `x / ${m}` : `(x ${shifted(-c)}) / ${m}`;

    readout.textContent =
      `${fText}. Its graph reflects in the dashed line y = x to give the graph ` +
      `of the inverse, y = ${inverseText}. The point P at (${pointX}, ${pointY}) ` +
      `reflects to (${swapped.x}, ${swapped.y}): the two coordinates swap. The ` +
      `inverse sends ${pointY} back to ${pointX}.`;

    svg.setAttribute(
      "aria-label",
      `The line ${fText}, its reflection y = ${inverseText} in the dashed line ` +
        `y = x, and the point (${pointX}, ${pointY}) with its image (${swapped.x}, ` +
        `${swapped.y}).`
    );
  }

  for (const input of [mInput, cInput, tInput]) {
    input.addEventListener("input", update);
  }
  update();
}
