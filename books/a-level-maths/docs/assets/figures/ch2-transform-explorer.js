// Guided investigation for transformations of graphs: y = a f(k(x - h)) + v
// with f(x) = x^2. Pure HTML and SVG, an ES module, no framework and no colour
// of its own: the fig-* classes carry the theme. Runtime text is plain text.

const X_MIN = -8;
const X_MAX = 8;
const Y_MIN = -10;
const Y_MAX = 26;

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
      <label>Vertical stretch a
        <input class="a" type="range" min="0.5" max="3" step="0.5" value="1">
      </label>
      <label>Horizontal scale k
        <input class="k" type="range" min="0.5" max="2" step="0.5" value="1">
      </label>
      <label>Horizontal shift h
        <input class="h" type="range" min="-4" max="4" step="1" value="0">
      </label>
      <label>Vertical shift v
        <input class="v" type="range" min="-5" max="5" step="1" value="0">
      </label>
      <svg viewBox="0 0 360 240" width="100%" role="img"
           aria-label="A transformed parabola"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const aInput = el.querySelector(".a");
  const kInput = el.querySelector(".k");
  const hInput = el.querySelector(".h");
  const vInput = el.querySelector(".v");

  function update() {
    const a = Number(aInput.value);
    const k = Number(kInput.value);
    const h = Number(hInput.value);
    const v = Number(vInput.value);

    const segments = [];
    let points = [];
    for (let x = X_MIN; x <= X_MAX + 0.001; x += 0.2) {
      const y = a * (k * (x - h)) ** 2 + v;
      if (y < Y_MIN || y > Y_MAX) {
        if (points.length > 1) segments.push(points);
        points = [];
      } else {
        points.push(`${xToPx(x).toFixed(1)},${yToPx(y).toFixed(1)}`);
      }
    }
    if (points.length > 1) segments.push(points);
    const path = segments.map((seg) => `M ${seg.join(" L ")}`).join(" ");

    const axes =
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(Y_MIN)}" x2="${xToPx(0)}" y2="${yToPx(Y_MAX)}" class="fig-ink"></line>`;

    svg.innerHTML =
      axes +
      `<path d="${path}" fill="none" class="fig-accent" stroke-width="2"></path>` +
      `<circle cx="${xToPx(h).toFixed(1)}" cy="${yToPx(v).toFixed(1)}" r="4" class="fig-accent"></circle>`;

    const inside = k === 1 ? `(x ${signed(-h)})` : `${k}(x ${signed(-h)})`;
    readout.textContent =
      `y = ${a} times [${inside}]^2 ${signed(v)}. ` +
      `Vertex at (${h}, ${v}). ` +
      (k === 1
        ? "No horizontal scale."
        : `The horizontal scale k = ${k} is ${k > 1 ? "a squeeze" : "a stretch"}.`);

    svg.setAttribute(
      "aria-label",
      `The parabola y equals ${a} times the square of ${inside}, plus ${v}. ` +
        `Its vertex is at (${h}, ${v}).`
    );
  }

  for (const input of [aInput, kInput, hInput, vInput]) {
    input.addEventListener("input", update);
  }
  update();
}
