// Guided investigation for the single-wave form a cos t + b sin t = R cos(t - a).
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.

const WIDTH = 420;
const HEIGHT = 240;
const LEFT = 26;
const RIGHT = 408;
const TOP = 18;
const BOTTOM = 216;
const TAU = 2 * Math.PI;
const Y_RANGE = 8;

function xToPx(t) {
  return LEFT + (t * (RIGHT - LEFT)) / TAU;
}

function yToPx(y) {
  const centre = (TOP + BOTTOM) / 2;
  const half = (BOTTOM - TOP) / 2;
  return centre - (y * half) / Y_RANGE;
}

function curve(fn) {
  const steps = 240;
  let points = "";
  for (let index = 0; index <= steps; index += 1) {
    const t = (TAU * index) / steps;
    points += `${xToPx(t).toFixed(1)},${yToPx(fn(t)).toFixed(1)} `;
  }
  return points.trim();
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:560px">
      <label>a, the cosine coefficient
        <input class="a" type="range" min="-5" max="5" step="1" value="3">
      </label>
      <label>b, the sine coefficient
        <input class="b" type="range" min="-5" max="5" step="1" value="4">
      </label>
      <svg viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" role="img"
           aria-label="The sum of a cosine wave and a sine wave drawn as a single combined wave"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const aInput = el.querySelector(".a");
  const bInput = el.querySelector(".b");

  function update() {
    const a = Number(aInput.value);
    const b = Number(bInput.value);
    const R = Math.sqrt(a * a + b * b);
    const alpha = Math.atan2(b, a);

    const axes =
      `<line x1="${LEFT}" y1="${yToPx(0).toFixed(1)}" x2="${RIGHT}" y2="${yToPx(0).toFixed(1)}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" class="fig-ink"></line>`;

    const cosine = `<polyline points="${curve((t) => a * Math.cos(t))}" class="fig-grid"></polyline>`;
    const sine = `<polyline points="${curve((t) => b * Math.sin(t))}" class="fig-grid"></polyline>`;
    const sum = `<polyline points="${curve((t) => a * Math.cos(t) + b * Math.sin(t))}" class="fig-accent"></polyline>`;

    // atan2 returns a phase in (-pi, pi], but the plot runs from 0 to 2pi, so a
    // negative phase has to be shifted by a whole turn before it is drawn.
    const peakT = ((alpha % TAU) + TAU) % TAU;

    let peak = "";
    if (R > 0) {
      peak =
        `<circle cx="${xToPx(peakT).toFixed(1)}" cy="${yToPx(R).toFixed(1)}" r="4" class="fig-warn"></circle>`;
    }

    svg.innerHTML = axes + cosine + sine + sum + peak;

    const alphaDegrees = (alpha * 180) / Math.PI;
    readout.textContent =
      `a = ${a}, b = ${b}. The single wave has R = ${R.toFixed(2)}. ` +
      `The phase is ${alpha.toFixed(3)} radians, which is ${alphaDegrees.toFixed(1)} degrees. ` +
      `The greatest value is ${R.toFixed(2)} and the least is ${(-R).toFixed(2)}.`;

    svg.setAttribute(
      "aria-label",
      `A combined wave from a cosine wave and a sine wave with coefficients ` +
        `${a} and ${b}. Its greatest value is ${R.toFixed(2)} and its phase is ` +
        `${alpha.toFixed(3)} radians.`
    );
  }

  aInput.addEventListener("input", update);
  bInput.addEventListener("input", update);
  update();
}
