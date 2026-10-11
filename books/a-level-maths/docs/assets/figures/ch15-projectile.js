// Guided investigation for projectile motion.
//
// A projectile launched at a chosen speed and angle, drawn over level ground.
// The readout gives the two components of the launch velocity, the time of
// flight, the greatest height and the range, so the reader sees how each one
// depends on the launch velocity.
//
// Plain HTML, SVG and two range inputs, so it is keyboard-operable with no
// framework, and no colour of its own: the fig-* classes carry the theme. The
// runtime text is plain text, never TeX.

const G = 9.8;
const LEFT = 50;
const RIGHT = 450;
const TOP = 30;
const BOTTOM = 250;
const STEPS = 80;

function short(value) {
  return value.toFixed(1);
}

export function mount(el) {
  el.innerHTML = `
    <div class="fig-controls">
      <label class="fig-field">Launch speed, m/s
        <input data-role="speed" type="range" min="5" max="40" step="1" value="20">
      </label>
      <label class="fig-field">Launch angle, degrees
        <input data-role="angle" type="range" min="10" max="80" step="5" value="45">
      </label>
    </div>
    <svg viewBox="0 0 480 300" width="100%" role="img"
         aria-label="The curved path of a projectile launched over level ground, with its range, greatest height and time of flight read out below"></svg>
    <p class="fig-readout" data-role="readout" aria-live="polite"></p>
  `;

  const speedInput = el.querySelector('[data-role="speed"]');
  const angleInput = el.querySelector('[data-role="angle"]');
  const readout = el.querySelector('[data-role="readout"]');
  const svg = el.querySelector("svg");

  function draw() {
    const speed = Number(speedInput.value);
    const angle = Number(angleInput.value);
    const radians = (angle * Math.PI) / 180;

    const ux = speed * Math.cos(radians);
    const uy = speed * Math.sin(radians);
    const flight = (2 * uy) / G;
    const range = ux * flight;
    const height = (uy * uy) / (2 * G);

    const xMax = Math.max(range, 1) * 1.08;
    const yMax = Math.max(height, 1) * 1.15;

    function toPx(x) {
      return LEFT + (x / xMax) * (RIGHT - LEFT);
    }

    function toPy(y) {
      return BOTTOM - (y / yMax) * (BOTTOM - TOP);
    }

    const points = [];
    for (let i = 0; i <= STEPS; i += 1) {
      const t = (flight * i) / STEPS;
      const x = ux * t;
      const y = uy * t - 0.5 * G * t * t;
      points.push(`${toPx(x).toFixed(1)},${toPy(y).toFixed(1)}`);
    }

    const ground =
      `<line class="fig-ink" x1="${LEFT}" y1="${BOTTOM}" ` +
      `x2="${RIGHT}" y2="${BOTTOM}" stroke-width="2"></line>`;
    const axisY =
      `<line class="fig-grid" x1="${toPx(0).toFixed(1)}" y1="${TOP}" ` +
      `x2="${toPx(0).toFixed(1)}" y2="${BOTTOM}" stroke-width="1"></line>`;

    const curve =
      `<polyline class="fig-accent" fill="none" stroke-width="3" ` +
      `points="${points.join(" ")}"></polyline>`;

    const apex =
      `<circle class="fig-warn" cx="${toPx(range / 2).toFixed(1)}" ` +
      `cy="${toPy(height).toFixed(1)}" r="4"></circle>`;

    const landing =
      `<circle class="fig-good" cx="${toPx(range).toFixed(1)}" ` +
      `cy="${BOTTOM}" r="4"></circle>`;

    svg.innerHTML = axisY + ground + curve + apex + landing;

    readout.textContent =
      `Speed = ${speed} m/s, angle = ${angle} degrees. ` +
      `Horizontal velocity = ${short(ux)} m/s, vertical velocity = ${short(uy)} m/s. ` +
      `Time of flight = ${short(flight)} s, greatest height = ${short(height)} m, ` +
      `range = ${short(range)} m. The horizontal velocity does not change, so the ` +
      `range is the horizontal velocity multiplied by the time of flight.`;

    svg.setAttribute(
      "aria-label",
      `Projectile launched at ${speed} metres per second at ${angle} degrees. ` +
        `The path reaches a greatest height of ${short(height)} metres and a ` +
        `range of ${short(range)} metres, with a time of flight of ` +
        `${short(flight)} seconds.`
    );
  }

  speedInput.addEventListener("input", draw);
  angleInput.addEventListener("input", draw);
  draw();
}
