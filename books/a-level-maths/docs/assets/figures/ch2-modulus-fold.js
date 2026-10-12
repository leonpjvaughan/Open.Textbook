// Guided investigation for the modulus function.
//
// The graph of y = |x - a| is the line y = x - a with the part below the axis
// folded up. A horizontal line y = b meets the V shape wherever |x - a| = b, so
// the reader sees why the equation has two solutions, one solution or none as b
// changes. That is the case split the worked examples use.
//
// Predict -> Test -> Explain lives on the page: the reader predicts how many
// solutions there are before moving a slider, and explains the fold afterwards.
// The module carries no colour of its own. The fig-* and text-* classes read the
// --tb-* tokens, so the figure follows the reader's bundle and both schemes, and
// the readout is aria-live so a reader who cannot see the drawing is told what
// changed. Runtime text is plain text, never TeX.

const X_MIN = -9;
const X_MAX = 9;
const Y_MIN = -4;
const Y_MAX = 7;
const LEFT = 22;
const RIGHT = 338;
const TOP = 18;
const BOTTOM = 222;

function xToPx(x) {
  return LEFT + ((x - X_MIN) * (RIGHT - LEFT)) / (X_MAX - X_MIN);
}

function yToPx(y) {
  return TOP + ((Y_MAX - y) * (BOTTOM - TOP)) / (Y_MAX - Y_MIN);
}

// The expression inside the modulus, written so that a negative shift reads as
// "x + 2" rather than "x - -2".
function inside(a) {
  if (a === 0) return "x";
  return a > 0 ? `x - ${a}` : `x + ${-a}`;
}

function text(x, y, label, cls) {
  return (
    `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" ` +
    `font-size="12" class="${cls}">${label}</text>`
  );
}

// Grid lines every two units, so a coordinate can be read off the drawing.
function grid() {
  const lines = [];
  for (let x = X_MIN + 1; x < X_MAX; x += 2) {
    lines.push(
      `<line x1="${xToPx(x).toFixed(1)}" y1="${TOP}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${BOTTOM}" class="fig-grid" stroke-width="1"></line>`
    );
  }
  for (let y = Y_MIN + 1; y < Y_MAX; y += 2) {
    lines.push(
      `<line x1="${LEFT}" y1="${yToPx(y).toFixed(1)}" ` +
        `x2="${RIGHT}" y2="${yToPx(y).toFixed(1)}" class="fig-grid" stroke-width="1"></line>`
    );
  }
  return lines.join("");
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <label style="display:block">Point of the V, at x = a
        <input class="a" type="range" min="-4" max="4" step="1" value="0"
               aria-label="Horizontal position of the point of the V">
      </label>
      <label style="display:block">Height of the cutting line, y = b
        <input class="b" type="range" min="-2" max="5" step="0.5" value="2"
               aria-label="Height of the horizontal line">
      </label>
      <svg viewBox="0 0 360 240" width="100%" role="img"
           aria-label="A V shaped modulus graph with a horizontal line across it"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const aInput = el.querySelector(".a");
  const bInput = el.querySelector(".b");

  function update() {
    const a = Number(aInput.value);
    const b = Number(bInput.value);

    // Each arm leaves the drawing at whichever edge it reaches first: the left
    // edge of the window, or the top of it. The slope is one, so the exit is
    // found by comparing the two candidate x values.
    const leftExit =
      a - X_MIN > Y_MAX
        ? { x: a - Y_MAX, y: Y_MAX }
        : { x: X_MIN, y: a - X_MIN };
    const rightExit =
      X_MAX - a > Y_MAX
        ? { x: a + Y_MAX, y: Y_MAX }
        : { x: X_MAX, y: X_MAX - a };

    const axes =
      `<line x1="${LEFT}" y1="${yToPx(0).toFixed(1)}" x2="${RIGHT}" y2="${yToPx(0).toFixed(1)}" class="fig-ink" stroke-width="1"></line>` +
      `<line x1="${xToPx(0).toFixed(1)}" y1="${TOP}" x2="${xToPx(0).toFixed(1)}" y2="${BOTTOM}" class="fig-ink" stroke-width="1"></line>`;

    // The line y = x - a, drawn only where the fold happens: to the left of the
    // point of the V. The left arm of the V is this segment turned upward.
    const fold =
      `<line x1="${xToPx(a).toFixed(1)}" y1="${yToPx(0).toFixed(1)}" ` +
      `x2="${xToPx(leftExit.x).toFixed(1)}" y2="${yToPx(leftExit.y).toFixed(1)}" ` +
      `class="fig-grid" stroke-width="2" stroke-dasharray="6 5"></line>`;

    const vShape =
      `<path d="M ${xToPx(leftExit.x).toFixed(1)},${yToPx(leftExit.y).toFixed(1)} ` +
      `L ${xToPx(a).toFixed(1)},${yToPx(0).toFixed(1)} ` +
      `L ${xToPx(rightExit.x).toFixed(1)},${yToPx(rightExit.y).toFixed(1)}" ` +
      `style="fill:none" class="fig-accent" stroke-width="2"></path>`;

    const cut =
      `<line x1="${LEFT}" y1="${yToPx(b).toFixed(1)}" x2="${RIGHT}" y2="${yToPx(b).toFixed(1)}" class="fig-warn" stroke-width="2"></line>`;

    // The two places where the line y = b meets the V. When b is zero they are
    // the same point, and when b is negative there are none.
    let marks = "";
    let markText = "";
    if (b > 0) {
      for (const x of [a - b, a + b]) {
        marks +=
          `<circle cx="${xToPx(x).toFixed(1)}" cy="${yToPx(b).toFixed(1)}" r="4" class="fig-good"></circle>`;
        markText += text(xToPx(x), yToPx(b) - 10, `${x}`, "text-good");
      }
    } else if (b === 0) {
      marks =
        `<circle cx="${xToPx(a).toFixed(1)}" cy="${yToPx(0).toFixed(1)}" r="4" class="fig-good"></circle>`;
      markText = text(xToPx(a), yToPx(0) - 10, `${a}`, "text-good");
    }

    const labels =
      text(RIGHT - 4, yToPx(b) - 7, "y = b", "text-warn") +
      text(xToPx(a) + 34, yToPx(0) - 10, "y = |x - a|", "text-accent") +
      text(xToPx(a), yToPx(0) + 16, "x = a", "text-ink");

    svg.innerHTML = grid() + axes + fold + vShape + cut + marks + markText + labels;

    let story;
    if (b > 0) {
      story =
        `The line y = ${b} crosses the V at two points, x = ${a - b} and ` +
        `x = ${a + b}. Those are the two solutions of |${inside(a)}| = ${b}.`;
    } else if (b === 0) {
      story =
        `The line y = 0 touches the V at its lowest point, x = ${a}. The ` +
        `equation |${inside(a)}| = 0 has one solution.`;
    } else {
      story =
        `The line y = ${b} misses the V. The modulus |${inside(a)}| is never ` +
        `negative, so the equation has no solutions.`;
    }

    readout.textContent =
      `The dashed line is y = ${inside(a)}. Its left arm is folded upward to ` +
      `make the V shape. ${story}`;

    svg.setAttribute(
      "aria-label",
      `The V shaped graph of y equals the modulus of x minus ${a}, with a ` +
        `horizontal line at y equals ${b}. ${story}`
    );
  }

  aInput.addEventListener("input", update);
  bInput.addEventListener("input", update);
  update();
}
