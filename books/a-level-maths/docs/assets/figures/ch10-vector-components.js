// Guided investigation for the components of a vector in the plane.
//
// Guided, not a sandbox: the page asks the reader to predict what happens to
// the column vector when the arrow is drawn from a new starting point, and
// which value of k makes a second arrow equal to the first. Two sliders set the
// components of a, two move its starting point, and one sets the multiple k.
// The copy is always drawn from the origin, so the reader can see that a free
// vector is fixed by its components and not by where it starts.
//
// Plain HTML, SVG and five range inputs, so it is keyboard-operable with no
// framework. Colours come from the fig-* and text-* classes, so the figure
// adapts to every bundle and to both schemes. No colour literal appears here,
// and the runtime text is plain HTML, never TeX.

const UNIT = 21; // pixels per grid unit
const ORIGIN_X = 220;
const ORIGIN_Y = 200;
const WIDTH = 440;
const HEIGHT = 400;
const MINUS = "\u2212";
const SQUARED = "\u00b2";

function toPx(x) {
  return ORIGIN_X + x * UNIT;
}

function toPy(y) {
  return ORIGIN_Y - y * UNIT;
}

function arrow(x1, y1, x2, y2, cls, width) {
  const px1 = toPx(x1);
  const py1 = toPy(y1);
  const px2 = toPx(x2);
  const py2 = toPy(y2);
  if (Math.hypot(px2 - px1, py2 - py1) < 2) {
    return (
      `<circle cx="${px2.toFixed(1)}" cy="${py2.toFixed(1)}" r="4" ` +
      `class="${cls}"></circle>`
    );
  }
  const angle = Math.atan2(py2 - py1, px2 - px1);
  const size = width > 2 ? 10 : 8;
  const spread = 1.1;
  const bx = px2 - size * Math.cos(angle);
  const by = py2 - size * Math.sin(angle);
  const leftX = bx - size * Math.sin(angle) * spread;
  const leftY = by + size * Math.cos(angle) * spread;
  const rightX = bx + size * Math.sin(angle) * spread;
  const rightY = by - size * Math.cos(angle) * spread;
  return (
    `<line x1="${px1.toFixed(1)}" y1="${py1.toFixed(1)}" ` +
    `x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" class="${cls}" ` +
    `fill="none" stroke-width="${width}"></line>` +
    `<polygon points="${px2.toFixed(1)},${py2.toFixed(1)} ` +
    `${leftX.toFixed(1)},${leftY.toFixed(1)} ` +
    `${rightX.toFixed(1)},${rightY.toFixed(1)}" class="${cls}"></polygon>`
  );
}

// A dashed guide line, used to drop a perpendicular from the tip of an arrow to
// each component of the vector.
function guide(x1, y1, x2, y2) {
  return (
    `<line x1="${toPx(x1).toFixed(1)}" y1="${toPy(y1).toFixed(1)}" ` +
    `x2="${toPx(x2).toFixed(1)}" y2="${toPy(y2).toFixed(1)}" ` +
    `class="fig-ink" stroke-width="1" stroke-dasharray="5 4"></line>`
  );
}

// A word beside the middle of an arrow, pushed clear of the shaft. A "side" of
// minus one pushes the other way, so two labels do not sit on each other when
// the arrows lie on top of one another.
function arrowLabel(x1, y1, x2, y2, text, cls, side) {
  const px1 = toPx(x1);
  const py1 = toPy(y1);
  const px2 = toPx(x2);
  const py2 = toPy(y2);
  const dx = px2 - px1;
  const dy = py2 - py1;
  const length = Math.hypot(dx, dy) || 1;
  const x = (px1 + px2) / 2 + (-dy / length) * 15 * side;
  const y = (py1 + py2) / 2 + (dx / length) * 15 * side + 5;
  return (
    `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="13" ` +
    `text-anchor="middle" class="${cls}">${text}</text>`
  );
}

// A number with a true minus sign and no trailing zero.
function num(value) {
  const rounded = Math.round(value * 10) / 10;
  return (rounded < 0 ? MINUS : "") + Math.abs(rounded).toString();
}

// A component, written with i and j. A coefficient of one is left unwritten.
function term(value, letter) {
  const size = Math.abs(value);
  return `${size === 1 ? "" : size}${letter}`;
}

function unitForm(x, y) {
  if (x === 0 && y === 0) return "0";
  if (x === 0) return (y < 0 ? MINUS : "") + term(y, "j");
  if (y === 0) return (x < 0 ? MINUS : "") + term(x, "i");
  const first = (x < 0 ? MINUS : "") + term(x, "i");
  const second = y < 0 ? `${MINUS} ${term(y, "j")}` : `+ ${term(y, "j")}`;
  return `${first} ${second}`;
}

export function mount(el) {
  el.innerHTML = `
    <div style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" role="img"
           aria-label="A vector drawn on a grid with its two components, and a second arrow drawn from the origin showing a multiple of the same vector"></svg>
      <label style="display:block;margin:.5rem 0">a across, in units
        <input class="ax" type="range" min="-4" max="4" step="1" value="3">
        <output class="ax-out">3</output>
      </label>
      <label style="display:block;margin:.2rem 0">a up, in units
        <input class="ay" type="range" min="-4" max="4" step="1" value="4">
        <output class="ay-out">4</output>
      </label>
      <label style="display:block;margin:.2rem 0">a starts, across
        <input class="sx" type="range" min="-5" max="5" step="1" value="-1">
        <output class="sx-out">-1</output>
      </label>
      <label style="display:block;margin:.2rem 0">a starts, up
        <input class="sy" type="range" min="-5" max="5" step="1" value="-3">
        <output class="sy-out">-3</output>
      </label>
      <label style="display:block;margin:.2rem 0">the multiple k
        <input class="k" type="range" min="-2" max="2" step="0.5" value="1">
        <output class="k-out">1</output>
      </label>
      <p class="readout text-ink" aria-live="polite" style="margin:.5rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const inputs = {
    ax: el.querySelector(".ax"),
    ay: el.querySelector(".ay"),
    sx: el.querySelector(".sx"),
    sy: el.querySelector(".sy"),
    k: el.querySelector(".k"),
  };
  const outputs = {
    ax: el.querySelector(".ax-out"),
    ay: el.querySelector(".ay-out"),
    sx: el.querySelector(".sx-out"),
    sy: el.querySelector(".sy-out"),
    k: el.querySelector(".k-out"),
  };

  function grid() {
    let lines = "";
    for (let x = -10; x <= 10; x += 1) {
      lines +=
        `<line x1="${toPx(x).toFixed(1)}" y1="${toPy(-9).toFixed(1)}" ` +
        `x2="${toPx(x).toFixed(1)}" y2="${toPy(9).toFixed(1)}" ` +
        `class="fig-grid" stroke-width="1"></line>`;
    }
    for (let y = -9; y <= 9; y += 1) {
      lines +=
        `<line x1="${toPx(-10).toFixed(1)}" y1="${toPy(y).toFixed(1)}" ` +
        `x2="${toPx(10).toFixed(1)}" y2="${toPy(y).toFixed(1)}" ` +
        `class="fig-grid" stroke-width="1"></line>`;
    }
    return lines;
  }

  function update() {
    const ax = Number(inputs.ax.value);
    const ay = Number(inputs.ay.value);
    const sx = Number(inputs.sx.value);
    const sy = Number(inputs.sy.value);
    const k = Number(inputs.k.value);

    outputs.ax.textContent = num(ax);
    outputs.ay.textContent = num(ay);
    outputs.sx.textContent = num(sx);
    outputs.sy.textContent = num(sy);
    outputs.k.textContent = num(k);

    const ex = sx + ax;
    const ey = sy + ay;
    const bx = k * ax;
    const by = k * ay;
    const length = Math.hypot(ax, ay);
    const copyLength = Math.hypot(bx, by);

    const axes =
      `<line x1="${toPx(-10).toFixed(1)}" y1="${toPy(0).toFixed(1)}" ` +
      `x2="${toPx(10).toFixed(1)}" y2="${toPy(0).toFixed(1)}" ` +
      `class="fig-ink" stroke-width="1"></line>` +
      `<line x1="${toPx(0).toFixed(1)}" y1="${toPy(-9).toFixed(1)}" ` +
      `x2="${toPx(0).toFixed(1)}" y2="${toPy(9).toFixed(1)}" ` +
      `class="fig-ink" stroke-width="1"></line>`;

    // The across component and the up component, drawn from the start of a,
    // with a dashed guide dropping the tip of a onto each of them.
    let parts = "";
    if (ax !== 0) {
      parts +=
        guide(ex, ey, ex, sy) + arrow(sx, sy, ex, sy, "fig-warn", 2);
    }
    if (ay !== 0) {
      parts +=
        guide(ex, ey, sx, ey) + arrow(sx, sy, sx, ey, "fig-warn", 2);
    }
    if (ax !== 0 && ay !== 0) {
      parts +=
        arrowLabel(sx, sy, ex, sy, `across ${num(ax)}`, "text-warn", -1) +
        arrowLabel(sx, sy, sx, ey, `up ${num(ay)}`, "text-warn", 1);
    }

    svg.innerHTML =
      grid() +
      axes +
      parts +
      arrow(sx, sy, ex, ey, "fig-accent", 3) +
      arrow(0, 0, bx, by, "fig-good", 3) +
      arrowLabel(sx, sy, ex, ey, "a", "text-accent", 1) +
      arrowLabel(0, 0, bx, by, "k a", "text-good", -1);

    let verdict;
    if (k === 0) {
      verdict =
        `k = 0, so the copy is the zero vector. It has no length and no ` +
        `direction.`;
    } else if (k === 1) {
      verdict =
        `k = 1, so the copy has the same column vector as a. The two arrows ` +
        `are equal, even though they start at different points.`;
    } else if (k === -1) {
      verdict =
        `k = ${MINUS}1, so the copy is ${MINUS}a. It has the same length as a ` +
        `and the opposite direction.`;
    } else if (k > 0) {
      verdict =
        `k = ${num(k)}, which is positive, so the copy is parallel to a and ` +
        `points the same way. It is ${k > 1 ? "longer" : "shorter"} than a.`;
    } else {
      verdict =
        `k = ${num(k)}, which is negative, so the copy is parallel to a and ` +
        `points the opposite way. It is ` +
        `${Math.abs(k) > 1 ? "longer" : "shorter"} than a.`;
    }

    readout.innerHTML =
      `a starts at (${num(sx)}, ${num(sy)}) and ends at (${num(ex)}, ${num(ey)}), ` +
      `so a = (${num(ax)}, ${num(ay)}) = ${unitForm(ax, ay)}. ` +
      `Its length is the square root of (${num(ax)})${SQUARED} + ` +
      `(${num(ay)})${SQUARED}, which is <strong>${length.toFixed(2)}</strong> ` +
      `units. ` +
      `The copy drawn from the origin is (${num(bx)}, ${num(by)}) and its ` +
      `length is <strong>${copyLength.toFixed(2)}</strong> units. ` +
      `${verdict} ` +
      `<em>Move the two start sliders. Watch the column vector and the length ` +
      `as the arrow slides across the grid.</em>`;

    svg.setAttribute(
      "aria-label",
      `A vector a with column (${num(ax)}, ${num(ay)}), drawn from the point ` +
        `(${num(sx)}, ${num(sy)}) to the point (${num(ex)}, ${num(ey)}), with ` +
        `length ${length.toFixed(2)} units. Its across component is ` +
        `${num(ax)} and its up component is ${num(ay)}. A second arrow from ` +
        `the origin shows k a with k equal to ${num(k)}, with length ` +
        `${copyLength.toFixed(2)} units.`,
    );
  }

  for (const input of Object.values(inputs)) {
    input.addEventListener("input", update);
  }
  update();
}
