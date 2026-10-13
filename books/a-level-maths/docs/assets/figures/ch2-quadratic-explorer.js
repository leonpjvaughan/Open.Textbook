// Guided investigation for completing the square and the discriminant.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never $...$.

const X_MIN = -8;
const X_MAX = 8;
// The vertex sits at y = c - b^2/4, which reaches -9 - 64/4 = -25, so the
// window opens far enough down for the marker to stay on the drawing.
const Y_MIN = -26;
const Y_MAX = 32;

function xToPx(x) {
  return 180 + (x * 180) / 8;
}

function yToPx(y) {
  return 20 + ((Y_MAX - y) * 200) / (Y_MAX - Y_MIN);
}

function signed(value) {
  return value < 0 ? `- ${Math.abs(value)}` : `+ ${value}`;
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <label>Value of b
        <input class="b" type="range" min="-8" max="8" step="1" value="0">
      </label>
      <label>Value of c
        <input class="c" type="range" min="-9" max="9" step="1" value="-4">
      </label>
      <svg viewBox="0 0 360 240" width="100%" role="img"
           aria-label="The parabola y = x squared plus b x plus c"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const bInput = el.querySelector(".b");
  const cInput = el.querySelector(".c");

  let path = "";

  function update() {
    const b = Number(bInput.value);
    const c = Number(cInput.value);

    // Complete the square: x^2 + bx + c = (x + b/2)^2 + (c - b^2/4).
    const p = b / 2;
    const q = c - (b * b) / 4;
    const discriminant = b * b - 4 * c;

    let roots = "";
    if (discriminant > 0) {
      const root = Math.sqrt(discriminant);
      const r1 = (-b - root) / 2;
      const r2 = (-b + root) / 2;
      roots = `roots at x = ${r1.toFixed(2)} and x = ${r2.toFixed(2)}`;
    } else if (discriminant === 0) {
      roots = `one repeated root at x = ${(-b / 2).toFixed(2)}`;
    } else {
      roots = "no real roots";
    }

    let points = [];
    const segments = [];
    for (let x = X_MIN; x <= X_MAX + 0.001; x += 0.2) {
      const y = x * x + b * x + c;
      if (y < Y_MIN || y > Y_MAX) {
        if (points.length > 1) segments.push(points);
        points = [];
      } else {
        points.push(`${xToPx(x).toFixed(1)},${yToPx(y).toFixed(1)}`);
      }
    }
    if (points.length > 1) segments.push(points);
    path = segments.map((seg) => `M ${seg.join(" L ")}`).join(" ");

    const axes =
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(Y_MIN)}" x2="${xToPx(0)}" y2="${yToPx(Y_MAX)}" class="fig-ink"></line>`;

    const marker =
      `<circle cx="${xToPx(-p).toFixed(1)}" cy="${yToPx(q).toFixed(1)}" r="4" class="fig-accent"></circle>`;

    svg.innerHTML =
      axes +
      `<path d="${path}" fill="none" class="fig-accent" stroke-width="2"></path>` +
      marker;

    const bracket =
      b === 0 ? "x^2" : `(x ${signed(p)})^2`;
    readout.textContent =
      `y = ${bracket} ${signed(q)}. ` +
      `Vertex at (${(-p).toFixed(1)}, ${q.toFixed(1)}). ` +
      `Discriminant = ${discriminant}, so ${roots}.`;

    svg.setAttribute(
      "aria-label",
      `The parabola y equals x squared plus b x plus c, with b equal to ${b} and c equal to ${c}. ` +
        `Its completed-square form is ${bracket} ${signed(q)}. ` +
        `The discriminant is ${discriminant}, so there are ${roots}.`
    );
  }

  bInput.addEventListener("input", update);
  cInput.addEventListener("input", update);
  update();
}
