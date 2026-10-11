// Guided investigation for the graphs of sine and cosine waves: amplitude,
// period, phase and vertical shift. Pure HTML and SVG, an ES module, no
// framework and no colour of its own: the fig-* classes carry the theme.

const WIDTH = 400;
const HEIGHT = 260;
const LEFT = 24;
const RIGHT = 388;
const TOP = 20;
const BOTTOM = 232;
const X_MAX = 2 * Math.PI;
const Y_RANGE = 3;

function xToPx(x) {
  return LEFT + (x * (RIGHT - LEFT)) / X_MAX;
}

function yToPx(y) {
  const centre = (TOP + BOTTOM) / 2;
  const half = (BOTTOM - TOP) / 2;
  return centre - (y * half) / Y_RANGE;
}

function wavePoints(A, B, C, D) {
  const steps = 240;
  let points = "";
  for (let index = 0; index <= steps; index += 1) {
    const x = (X_MAX * index) / steps;
    const y = A * Math.sin(B * x + C) + D;
    points += `${xToPx(x).toFixed(1)},${yToPx(y).toFixed(1)} `;
  }
  return points.trim();
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:560px">
      <label>Amplitude A
        <input class="a" type="range" min="-3" max="3" step="0.5" value="1">
      </label>
      <label>Wave number B
        <input class="b" type="range" min="0.5" max="4" step="0.5" value="1">
      </label>
      <label>Phase C in degrees
        <input class="c" type="range" min="-180" max="180" step="15" value="0">
      </label>
      <label>Vertical shift D
        <input class="d" type="range" min="-2" max="2" step="0.5" value="0">
      </label>
      <svg viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" role="img"
           aria-label="A sine wave on axes whose amplitude, period, phase and vertical shift follow the controls"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const inputs = {
    a: el.querySelector(".a"),
    b: el.querySelector(".b"),
    c: el.querySelector(".c"),
    d: el.querySelector(".d"),
  };

  function grid() {
    let lines = "";
    const ticks = 6;
    for (let index = 0; index <= ticks; index += 1) {
      const x = (X_MAX * index) / ticks;
      lines +=
        `<line x1="${xToPx(x).toFixed(1)}" y1="${TOP}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${BOTTOM}" class="fig-grid"></line>`;
    }
    for (let y = -Y_RANGE; y <= Y_RANGE; y += 1) {
      lines +=
        `<line x1="${LEFT}" y1="${yToPx(y).toFixed(1)}" ` +
        `x2="${RIGHT}" y2="${yToPx(y).toFixed(1)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function update() {
    const A = Number(inputs.a.value);
    const B = Number(inputs.b.value);
    const C = (Number(inputs.c.value) * Math.PI) / 180;
    const D = Number(inputs.d.value);

    const axes =
      `<line x1="${LEFT}" y1="${yToPx(0).toFixed(1)}" x2="${RIGHT}" y2="${yToPx(0).toFixed(1)}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" class="fig-ink"></line>`;

    const curve =
      `<polyline points="${wavePoints(A, B, C, D)}" class="fig-accent"></polyline>`;

    const labels =
      `<text x="${RIGHT - 16}" y="${yToPx(0) - 6}" class="fig-ink">x</text>` +
      `<text x="${LEFT + 6}" y="${TOP + 12}" class="fig-ink">y</text>`;

    svg.innerHTML = grid() + axes + curve + labels;

    const period = 2 * Math.PI / B;
    const periodDeg = 360 / B;
    const phaseShift = -Number(inputs.c.value) / B;
    readout.textContent =
      `y = ${A} sin(${B}x ${C >= 0 ? "+" : "-"} ${Math.abs(Number(inputs.c.value))} degrees) ${D >= 0 ? "+" : "-"} ${Math.abs(D)}. ` +
      `Amplitude ${Math.abs(A)}. Vertical shift ${D}. ` +
      `The period is ${period.toFixed(3)} radians, which is ${periodDeg.toFixed(1)} degrees. ` +
      `The wave starts with a phase shift of ${(C / B).toFixed(3)} radians.`;

    svg.setAttribute(
      "aria-label",
      `A sine wave with amplitude ${Math.abs(A)}, wave number ${B} and vertical ` +
        `shift ${D}. The period is ${period.toFixed(3)} radians, which is ` +
        `${periodDeg.toFixed(1)} degrees.`
    );
  }

  Object.values(inputs).forEach((input) =>
    input.addEventListener("input", update)
  );
  update();
}
