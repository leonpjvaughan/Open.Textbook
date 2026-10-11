// Guided investigation for implicit differentiation on the circle
// x^2 + y^2 = 25. Pure HTML and SVG, an ES module, no framework and no colour
// of its own: the fig-* classes carry the theme. Runtime text is plain text.

const CX = 160;
const CY = 160;
const SCALE = 26;
const RADIUS = 5;

function xToPx(x) {
  return CX + x * SCALE;
}

function yToPx(y) {
  return CY - y * SCALE;
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <label>Angle around the circle
        <input class="angle" type="range" min="0" max="355" step="5" value="40">
      </label>
      <svg viewBox="0 0 320 320" width="100%" role="img"
           aria-label="A circle with a movable point and the tangent there, showing that the gradient depends on both coordinates"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const angleInput = el.querySelector(".angle");

  function grid() {
    let lines = "";
    for (let x = -5; x <= 5; x += 1) {
      lines +=
        `<line x1="${xToPx(x)}" y1="${yToPx(-5)}" ` +
        `x2="${xToPx(x)}" y2="${yToPx(5)}" class="fig-grid"></line>`;
    }
    for (let y = -5; y <= 5; y += 1) {
      lines +=
        `<line x1="${xToPx(-5)}" y1="${yToPx(y)}" ` +
        `x2="${xToPx(5)}" y2="${yToPx(y)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function update() {
    const degrees = Number(angleInput.value);
    const theta = (degrees * Math.PI) / 180;
    const x = RADIUS * Math.cos(theta);
    const y = RADIUS * Math.sin(theta);
    const vertical = Math.abs(y) < 0.07;

    const px = xToPx(x);
    const py = yToPx(y);

    // The tangent direction is perpendicular to the radius, so it points along
    // (-y, x). The gradient is -x/y when y is not zero.
    let tangent = "";
    if (!vertical) {
      const ux = -y / RADIUS;
      const uy = x / RADIUS;
      const half = 1.6;
      tangent =
        `<line x1="${(px - ux * half * SCALE).toFixed(1)}" y1="${(py + uy * half * SCALE).toFixed(1)}" ` +
        `x2="${(px + ux * half * SCALE).toFixed(1)}" y2="${(py - uy * half * SCALE).toFixed(1)}" class="fig-warn"></line>`;
    } else {
      const half = 1.6;
      tangent =
        `<line x1="${px.toFixed(1)}" y1="${(py - half * SCALE).toFixed(1)}" ` +
        `x2="${px.toFixed(1)}" y2="${(py + half * SCALE).toFixed(1)}" class="fig-warn"></line>`;
    }

    const axes =
      `<line x1="${xToPx(-5)}" y1="${yToPx(0)}" x2="${xToPx(5)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(-5)}" x2="${xToPx(0)}" y2="${yToPx(5)}" class="fig-ink"></line>`;
    const circle = `<circle cx="${CX}" cy="${CY}" r="${(RADIUS * SCALE).toFixed(1)}" class="fig-line"></circle>`;
    const marker = `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4" class="fig-ink"></circle>`;

    svg.innerHTML = grid() + axes + circle + tangent + marker;

    let gradientText;
    if (vertical) {
      gradientText = "the tangent is vertical, and the gradient is not defined";
    } else {
      gradientText = `the gradient is minus x over y, which is ${(-x / y).toFixed(3)}`;
    }

    readout.textContent =
      `The point is (${x.toFixed(3)}, ${y.toFixed(3)}) on the circle. ` +
      `Here ${gradientText}. ` +
      `The gradient changes as the point moves, even though x and y both change.`;

    svg.setAttribute(
      "aria-label",
      `A circle of radius five. The point is at x equals ${x.toFixed(2)} and ` +
        `y equals ${y.toFixed(2)}. Its gradient is ` +
        `${vertical ? "not defined" : (-x / y).toFixed(3)}.`
    );
  }

  angleInput.addEventListener("input", update);
  update();
}
