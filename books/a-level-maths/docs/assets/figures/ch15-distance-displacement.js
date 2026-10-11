// Guided investigation for distance travelled and displacement.
//
// A walker starts at 0, walks to a turning point, then walks back or onwards to
// a finishing point. Two sliders set the turning point and the finishing point;
// the readout shows the distance travelled and the displacement, so the reader
// meets the difference rather than being told it.
//
// Plain HTML, SVG and two range inputs, so it is keyboard-operable with no
// framework, and no colour of its own: the fig-* classes carry the theme. The
// runtime text is plain text, never TeX.

const LEFT = 50;
const RIGHT = 430;
const AXIS_Y = 150;
const SPAN = 100;

function toPx(x) {
  return LEFT + (x / SPAN) * (RIGHT - LEFT);
}

function tick(value) {
  return (
    `<line class="fig-grid" x1="${toPx(value).toFixed(1)}" y1="${AXIS_Y - 6}" ` +
    `x2="${toPx(value).toFixed(1)}" y2="${AXIS_Y + 6}" stroke-width="1"></line>` +
    `<text class="fig-ink" x="${toPx(value).toFixed(1)}" y="${AXIS_Y + 22}" ` +
    `text-anchor="middle" font-size="12">${value}</text>`
  );
}

export function mount(el) {
  el.innerHTML = `
    <div class="fig-controls">
      <label class="fig-field">Turning point, metres
        <input data-role="turn" type="range" min="10" max="100" step="10" value="60">
      </label>
      <label class="fig-field">Finishing point, metres
        <input data-role="finish" type="range" min="0" max="100" step="10" value="20">
      </label>
    </div>
    <svg viewBox="0 0 480 200" width="100%" role="img"
         aria-label="A number line showing a walker who starts at zero, walks to a turning point and then to a finishing point, with distance and displacement read out below"></svg>
    <p class="fig-readout" data-role="readout" aria-live="polite"></p>
  `;

  const turnInput = el.querySelector('[data-role="turn"]');
  const finishInput = el.querySelector('[data-role="finish"]');
  const readout = el.querySelector('[data-role="readout"]');
  const svg = el.querySelector("svg");

  function draw() {
    const turn = Number(turnInput.value);
    const finish = Number(finishInput.value);

    const distance = turn + Math.abs(finish - turn);
    const displacement = finish;

    let grid = "";
    for (let value = 0; value <= SPAN; value += 10) {
      grid += tick(value);
    }

    const axis =
      `<line class="fig-ink" x1="${toPx(0)}" y1="${AXIS_Y}" ` +
      `x2="${toPx(SPAN)}" y2="${AXIS_Y}" stroke-width="2"></line>`;

    const startDot =
      `<circle class="fig-ink" cx="${toPx(0).toFixed(1)}" cy="${AXIS_Y}" r="5"></circle>`;
    const turnDot =
      `<circle class="fig-warn" cx="${toPx(turn).toFixed(1)}" cy="${AXIS_Y}" r="5"></circle>`;
    const finishDot =
      `<circle class="fig-good" cx="${toPx(finish).toFixed(1)}" cy="${AXIS_Y}" r="5"></circle>`;

    const firstLeg =
      `<line class="fig-accent" x1="${toPx(0).toFixed(1)}" y1="${AXIS_Y - 30}" ` +
      `x2="${toPx(turn).toFixed(1)}" y2="${AXIS_Y - 30}" stroke-width="3"></line>`;
    const secondLeg =
      `<line class="fig-accent" x1="${toPx(turn).toFixed(1)}" y1="${AXIS_Y - 30}" ` +
      `x2="${toPx(finish).toFixed(1)}" y2="${AXIS_Y - 30}" stroke-width="3" ` +
      `stroke-dasharray="6 4"></line>`;

    svg.innerHTML = grid + axis + firstLeg + secondLeg + startDot + turnDot + finishDot;

    readout.textContent =
      `Turn at ${turn} m, finish at ${finish} m. ` +
      `Distance travelled = ${distance} m. ` +
      `Displacement = ${displacement} m. ` +
      (distance === displacement
        ? "The walker never turned back, so the two values agree."
        : "The walker turned back, so the distance is larger than the displacement.");

    svg.setAttribute(
      "aria-label",
      `Number line from zero to one hundred metres. The walker starts at 0, ` +
        `walks to ${turn} metres and then to ${finish} metres. ` +
        `The distance travelled is ${distance} metres and the displacement is ` +
        `${displacement} metres.`
    );
  }

  turnInput.addEventListener("input", draw);
  finishInput.addEventListener("input", draw);
  draw();
}
