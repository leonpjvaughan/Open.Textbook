// Guided investigation for vector addition and scalar multiplication.
// Two vectors a and b with movable components, drawn head to tail, plus the
// resultant and the scalar multiple k*a. Plain HTML and SVG, no framework and
// no colour of its own: the fig-* classes carry the theme. Runtime text is
// plain text, never TeX.

const SCALE = 20;
const ORIGIN_X = 220;
const ORIGIN_Y = 170;
const W = 440;
const H = 320;

function xToPx(x) {
  return ORIGIN_X + x * SCALE;
}

function yToPx(y) {
  return ORIGIN_Y - y * SCALE;
}

function arrow(x1, y1, x2, y2, cls) {
  const px1 = xToPx(x1);
  const py1 = yToPx(y1);
  const px2 = xToPx(x2);
  const py2 = yToPx(y2);
  const angle = Math.atan2(py2 - py1, px2 - px1);
  const size = 9;
  const spread = 0.42;
  const bx = px2 - size * Math.cos(angle);
  const by = py2 - size * Math.sin(angle);
  const leftX = bx - size * Math.sin(angle) * spread * 2;
  const leftY = by + size * Math.cos(angle) * spread * 2;
  const rightX = bx + size * Math.sin(angle) * spread * 2;
  const rightY = by - size * Math.cos(angle) * spread * 2;
  return (
    `<line x1="${px1.toFixed(1)}" y1="${py1.toFixed(1)}" ` +
    `x2="${px2.toFixed(1)}" y2="${py2.toFixed(1)}" class="${cls}" fill="none" stroke-width="2"></line>` +
    `<polygon points="${px2.toFixed(1)},${py2.toFixed(1)} ` +
    `${leftX.toFixed(1)},${leftY.toFixed(1)} ${rightX.toFixed(1)},${rightY.toFixed(1)}" ` +
    `class="${cls}"></polygon>`
  );
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:560px">
      <label>a across
        <input class="a1" type="range" min="-4" max="4" step="1" value="3">
      </label>
      <label>a up
        <input class="a2" type="range" min="-4" max="4" step="1" value="4">
      </label>
      <label>b across
        <input class="b1" type="range" min="-4" max="4" step="1" value="4">
      </label>
      <label>b up
        <input class="b2" type="range" min="-4" max="4" step="1" value="-3">
      </label>
      <label>scaler k
        <input class="k" type="range" min="-2" max="2" step="0.5" value="2">
      </label>
      <svg viewBox="0 0 ${W} ${H}" width="100%" role="img"
           aria-label="Two vectors a and b drawn head to tail, their resultant a plus b, and the scalar multiple k times a"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const inputs = {
    a1: el.querySelector(".a1"),
    a2: el.querySelector(".a2"),
    b1: el.querySelector(".b1"),
    b2: el.querySelector(".b2"),
    k: el.querySelector(".k"),
  };

  function grid() {
    let lines = "";
    for (let x = -5; x <= 5; x += 1) {
      lines +=
        `<line x1="${xToPx(x)}" y1="${yToPx(-5)}" ` +
        `x2="${xToPx(x)}" y2="${yToPx(5)}" class="fig-grid"></line>`;
    }
    for (let y = -4; y <= 5; y += 1) {
      lines +=
        `<line x1="${xToPx(-5)}" y1="${yToPx(y)}" ` +
        `x2="${xToPx(5)}" y2="${yToPx(y)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function update() {
    const a1 = Number(inputs.a1.value);
    const a2 = Number(inputs.a2.value);
    const b1 = Number(inputs.b1.value);
    const b2 = Number(inputs.b2.value);
    const k = Number(inputs.k.value);

    const sum1 = a1 + b1;
    const sum2 = a2 + b2;
    const magnitude = Math.sqrt(sum1 * sum1 + sum2 * sum2);

    const axes =
      `<line x1="${xToPx(-5)}" y1="${yToPx(0)}" x2="${xToPx(5)}" y2="${yToPx(0)}" class="fig-ink" stroke-width="1"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(-5)}" x2="${xToPx(0)}" y2="${yToPx(5)}" class="fig-ink" stroke-width="1"></line>`;

    const dashed =
      `<line x1="${xToPx(a1)}" y1="${yToPx(a2)}" ` +
      `x2="${xToPx(sum1)}" y2="${yToPx(sum2)}" ` +
      `class="fig-ink" stroke-width="1" stroke-dasharray="5 4"></line>`;

    svg.innerHTML =
      grid() +
      axes +
      arrow(0, 0, a1, a2, "fig-accent") +
      arrow(a1, a2, sum1, sum2, "fig-good") +
      dashed +
      arrow(0, 0, sum1, sum2, "fig-warn") +
      arrow(0, 0, k * a1, k * a2, "fig-ink");

    readout.textContent =
      `a = (${a1}, ${a2}). b = (${b1}, ${b2}). ` +
      `a + b = (${sum1}, ${sum2}), found by adding matching components. ` +
      `Its magnitude is ${magnitude.toFixed(2)}. ` +
      `k = ${k}, so k times a = (${(k * a1).toFixed(1)}, ${(k * a2).toFixed(1)}).`;

    svg.setAttribute(
      "aria-label",
      `Vectors a equals (${a1}, ${a2}) and b equals (${b1}, ${b2}) drawn head to tail. ` +
        `The resultant a plus b equals (${sum1}, ${sum2}), with magnitude ${magnitude.toFixed(2)}. ` +
        `k times a equals (${(k * a1).toFixed(1)}, ${(k * a2).toFixed(1)}).`
    );
  }

  for (const input of Object.values(inputs)) {
    input.addEventListener("input", update);
  }
  update();
}
