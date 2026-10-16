// Tier-1 guided investigation: the force on a current-carrying conductor in a
// magnetic field, F = BIl.
//
// The page asks the reader to predict what happens to the force when the current
// is doubled, then to test each quantity here, then to explain why the force is
// perpendicular to both the current and the field. So the figure has to make the
// three directions visible at once: the field is drawn into the page as crosses,
// the current runs along the wire in the page, and the force is the vertical
// arrow between them.
//
// Nothing here carries a colour. The field uses the grid class, the wire and the
// force the accent class, so the figure follows the reader's bundle and both
// schemes.
//
// The scaffolding — the panel, its accessible name, the controls, the readout and
// the redraw — comes from `kit.js`. What is left is the drawing and the words.
import { SIZE, fmt, label, panel, scale, slider, toggle, react } from "./kit.js";

const WIDTH = 460;
const HEIGHT = 250;
// The biggest force the sliders can produce, so the arrow has a fixed scale.
const F_MAX = 1.8;

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "The force on a current-carrying wire in a magnetic field into the page",
    prompt: "Predict what doubling the current does to the force, then test it.",
    width: WIDTH,
    height: HEIGHT,
  });

  const fieldInput = slider(el, {
    show: true,
    id: "flux",
    label: "Flux density",
    min: 0.05,
    max: 1.0,
    step: 0.05,
    value: 0.4,
    unit: "T",
  });

  const currentInput = slider(el, {
    show: true,
    id: "current",
    label: "Current",
    min: 0.5,
    max: 6.0,
    step: 0.5,
    value: 3.0,
    unit: "A",
  });

  const lengthInput = slider(el, {
    show: true,
    id: "length",
    label: "Length in the field",
    min: 0.02,
    max: 0.30,
    step: 0.01,
    value: 0.20,
    unit: "m",
  });

  const reverse = toggle(el, {
    id: "reverse",
    label: "Current to the left",
  });

  // The plot area, in SVG units.
  const REGION = { x0: 62, y0: 52, x1: 398, y1: 198 };
  const CY = (REGION.y0 + REGION.y1) / 2;
  const forceLength = scale({ domain: [0, F_MAX], range: [16, 86] });

  function fieldMarks() {
    let marks = "";
    for (let x = REGION.x0 + 16; x < REGION.x1; x += 34) {
      for (let y = REGION.y0 + 16; y < REGION.y1; y += 34) {
        marks += `<line x1="${x - 5}" y1="${y - 5}" x2="${x + 5}" y2="${y + 5}" class="fig-grid" stroke-width="1.6"></line>`;
        marks += `<line x1="${x - 5}" y1="${y + 5}" x2="${x + 5}" y2="${y - 5}" class="fig-grid" stroke-width="1.6"></line>`;
      }
    }
    return marks;
  }

  function update() {
    const flux = Number(fieldInput.value);
    const current = Number(currentInput.value);
    const length = Number(lengthInput.value);
    const toRight = !reverse.checked;
    const force = flux * current * length;
    const up = toRight; // field into the page and current to the right gives an upward force

    const marks = fieldMarks();
    const wire = `<line x1="${REGION.x0 - 24}" y1="${CY}" x2="${REGION.x1 + 24}" y2="${CY}" class="fig-accent" stroke-width="3"></line>`;

    // The current arrow, drawn at the end of the wire.
    const currentArrow = toRight
      ? `<path d="M ${REGION.x1 + 8} ${CY - 7} L ${REGION.x1 + 24} ${CY} L ${REGION.x1 + 8} ${CY + 7} z" class="fig-accent"></path>`
      : `<path d="M ${REGION.x0 - 8} ${CY - 7} L ${REGION.x0 - 24} ${CY} L ${REGION.x0 - 8} ${CY + 7} z" class="fig-accent"></path>`;

    // The force arrow, whose length follows F = BIl.
    const cx = (REGION.x0 + REGION.x1) / 2;
    const lengthPx = forceLength(force);
    const tip = up ? CY - 20 - lengthPx : CY + 20 + lengthPx;
    const tail = up ? CY - 20 : CY + 20;
    const forceArrow =
      `<line x1="${cx}" y1="${tail}" x2="${cx}" y2="${tip}" class="fig-warn" stroke-width="3"></line>` +
      (up
        ? `<path d="M ${cx - 7} ${tip + 10} L ${cx} ${tip} L ${cx + 7} ${tip + 10} z" class="fig-warn"></path>`
        : `<path d="M ${cx - 7} ${tip - 10} L ${cx} ${tip} L ${cx + 7} ${tip - 10} z" class="fig-warn"></path>`) +
      label({
        x: cx + 12,
        y: up ? tip + 4 : tip - 6,
        text: "force",
        anchor: "start",
        size: SIZE.tick,
        class: "text-warn",
      });

    const fieldNote = label({
      x: REGION.x0,
      y: REGION.y0 - 16,
      text: "magnetic field into the page",
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    });

    svg.innerHTML = `${marks}${wire}${currentArrow}${forceArrow}${fieldNote}`;

    readout.textContent = `B = ${fmt(flux, 2)} T, I = ${fmt(current, 1)} A and l = ${fmt(length, 2)} m give F = BIl = ${fmt(force, 3)} N, acting ${up ? "upwards" : "downwards"}.`;
  }

  react([fieldInput, currentInput, lengthInput, reverse], update);
}
