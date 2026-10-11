// Guided investigation for the derivative as the gradient of the tangent.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.

const X_MIN = -2.5;
const X_MAX = 2.5;
const SX = 72;
const SY = 20;
const CX = 200;
const CY = 150;

function f(x) {
  return x * x * x - 3 * x + 1;
}

function df(x) {
  return 3 * x * x - 3;
}

function xToPx(x) {
  return CX + x * SX;
}

function yToPx(y) {
  return CY - y * SY;
}

function curvePoints() {
  const points = [];
  for (let x = X_MIN; x <= X_MAX + 1e-9; x += 0.05) {
    points.push(`${xToPx(x).toFixed(1)},${yToPx(f(x)).toFixed(1)}`);
  }
  return points.join(" ");
}

function lineThrough(x, y, gradient, half) {
  const x1 = Math.max(X_MIN, x - half);
  const x2 = Math.min(X_MAX, x + half);
  const y1 = y + gradient * (x1 - x);
  const y2 = y + gradient * (x2 - x);
  return (
    `<line x1="${xToPx(x1).toFixed(1)}" y1="${yToPx(y1).toFixed(1)}" ` +
    `x2="${xToPx(x2).toFixed(1)}" y2="${yToPx(y2).toFixed(1)}" class="fig-accent"></line>`
  );
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <label>Point x
        <input class="a" type="range" min="-2.4" max="2.4" step="0.1" value="1">
      </label>
      <label>Chord length h
        <input class="h" type="range" min="0.05" max="1.5" step="0.05" value="1">
      </label>
      <svg viewBox="0 0 400 300" width="100%" role="img"
           aria-label="A cubic curve with a movable point, a shrinking chord and the tangent at the point"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const aInput = el.querySelector(".a");
  const hInput = el.querySelector(".h");

  function axes() {
    return (
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(5)}" x2="${xToPx(0)}" y2="${yToPx(-5)}" class="fig-ink"></line>`
    );
  }

  function grid() {
    let lines = "";
    for (let x = X_MIN; x <= X_MAX; x += 0.5) {
      lines +=
        `<line x1="${xToPx(x).toFixed(1)}" y1="${yToPx(5)}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${yToPx(-5)}" class="fig-grid"></line>`;
    }
    for (let y = -5; y <= 5; y += 1) {
      lines +=
        `<line x1="${xToPx(X_MIN)}" y1="${yToPx(y).toFixed(1)}" ` +
        `x2="${xToPx(X_MAX)}" y2="${yToPx(y).toFixed(1)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function update() {
    const a = Number(aInput.value);
    const h = Number(hInput.value);
    const fa = f(a);
    const fb = f(a + h);
    const chord = (fb - fa) / h;
    const tangent = df(a);

    const tangentLine = lineThrough(a, fa, tangent, 1);
    const chordLine =
      `<line x1="${xToPx(a).toFixed(1)}" y1="${yToPx(fa).toFixed(1)}" ` +
      `x2="${xToPx(a + h).toFixed(1)}" y2="${yToPx(fb).toFixed(1)}" class="fig-warn"></line>`;
    const pointP = `<circle cx="${xToPx(a).toFixed(1)}" cy="${yToPx(fa).toFixed(1)}" r="4" class="fig-ink"></circle>`;
    const pointQ = `<circle cx="${xToPx(a + h).toFixed(1)}" cy="${yToPx(fb).toFixed(1)}" r="4" class="fig-warn"></circle>`;
    const curve = `<polyline points="${curvePoints()}" class="fig-line"></polyline>`;

    svg.innerHTML = grid() + axes() + curve + chordLine + tangentLine + pointQ + pointP;

    const near =
      Math.abs(chord - tangent) < 0.05 ? "very close to" : "some way from";
    readout.textContent =
      `At x = ${a.toFixed(1)}, the value is ${fa.toFixed(2)}. ` +
      `The chord gradient is ${chord.toFixed(3)}. ` +
      `The tangent gradient is ${tangent.toFixed(3)}. ` +
      `The chord gradient is ${near} the tangent gradient.`;

    svg.setAttribute(
      "aria-label",
      `A cubic curve. A point is at x equals ${a.toFixed(1)}. ` +
        `The chord gradient is ${chord.toFixed(3)} and the tangent gradient ` +
        `is ${tangent.toFixed(3)}.`
    );
  }

  aInput.addEventListener("input", update);
  hInput.addEventListener("input", update);
  update();
}
