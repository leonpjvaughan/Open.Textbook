// Tier-1 guided investigation: the magnetic field of a current, in a straight
// wire and in a solenoid, with and without a soft iron core.
//
// The page asks the reader to predict which way the field circles a wire and how
// the field changes when the current is larger, then to test it here, then to
// explain what the iron core adds. So the figure has to show the *shape* of the
// field and let the current be changed: the circles around the wire are drawn
// closer together near the wire, and a larger current draws a stronger field.
//
// Nothing here carries a colour. The field uses the accent class, the coil and
// the core the ink class, so the figure follows the reader's bundle and both
// schemes.
//
// The scaffolding — the panel, its accessible name, the controls, the readout and
// the redraw — comes from `kit.js`. What is left is the drawing and the words.
import { SIZE, label, panel, chooser, slider, react } from "./kit.js";

const WIDTH = 460;
const HEIGHT = 250;

// The circles around a straight wire, in SVG units. The spacing grows with the
// radius, because the field is stronger near the wire and the lines are closer
// together where the field is stronger.
const RADII = [22, 40, 62, 88, 118];

function strengthWidth(current) {
  // 1 A draws a thin line, 10 A a thick one. The reader sees the field get
  // stronger without any colour changing.
  return (1 + current / 4).toFixed(1);
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "The magnetic field around a straight wire and around a solenoid",
    prompt: "Move the current, then switch between the wire and the coil, and watch the field.",
    width: WIDTH,
    height: HEIGHT,
  });

  const choose = chooser(el, {
    id: "source",
    label: "Source",
    choices: [
      { value: "wire", label: "Straight wire" },
      { value: "solenoid", label: "Solenoid" },
      { value: "core", label: "Solenoid with iron core" },
    ],
  });

  const currentInput = slider(el, {
    show: true,
    id: "current",
    label: "Current",
    min: 1,
    max: 10,
    step: 0.5,
    value: 4,
    unit: "A",
  });

  function drawWire(current) {
    const cx = WIDTH / 2;
    const cy = HEIGHT / 2;
    const width = strengthWidth(current);
    let circles = "";
    for (const radius of RADII) {
      circles += `<circle cx="${cx}" cy="${cy}" r="${radius}" style="fill:none" class="fig-accent" stroke-width="${width}"></circle>`;
      // The field is anticlockwise around a current coming out of the page, so
      // the arrow at the top of each circle points to the left.
      circles += `<path d="M ${cx + 5} ${cy - radius - 5} L ${cx - 5} ${cy - radius} L ${cx + 5} ${cy - radius + 5} z" class="fig-accent"></path>`;
    }
    const wire = `<circle cx="${cx}" cy="${cy}" r="7" class="fig-ink"></circle>
      <circle cx="${cx}" cy="${cy}" r="2.5" class="text-ink"></circle>`;
    const note = label({ x: cx, y: cy + 34, text: "current out of the page", size: SIZE.tick, class: "text-ink" });
    return `${circles}${wire}${note}`;
  }

  function drawSolenoid(current, withCore) {
    const cy = HEIGHT / 2;
    const half = 96;
    const cx = WIDTH / 2;
    const width = strengthWidth(current);

    // The coil, drawn as a row of turns.
    let coil = "";
    const turns = 9;
    for (let i = 0; i < turns; i += 1) {
      const x = cx - half + 12 + (i * (2 * half - 24)) / (turns - 1);
      coil += `<ellipse cx="${x.toFixed(1)}" cy="${cy}" rx="9" ry="26" style="fill:none" class="fig-ink" stroke-width="2"></ellipse>`;
    }

    // The field, drawn as loops around the coil and straight lines through it.
    let field = "";
    for (let i = 0; i < 4; i += 1) {
      const rx = half + 18 + i * 20;
      const ry = 36 + i * 16;
      field += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="fill:none" class="fig-accent" stroke-width="${width}" stroke-dasharray="${i === 0 ? "none" : "7 5"}"></ellipse>`;
    }
    field += `<line x1="${cx - half}" y1="${cy}" x2="${cx + half}" y2="${cy}" class="fig-accent" stroke-width="${width}"></line>`;

    const poles =
      label({ x: cx + half + 26, y: cy - 44, text: "N", size: SIZE.value, class: "text-ink" }) +
      label({ x: cx - half - 26, y: cy - 44, text: "S", size: SIZE.value, class: "text-ink" });

    const core = withCore
      ? `<rect x="${cx - half - 10}" y="${cy - 12}" width="${2 * half + 20}" height="24" rx="4" class="fig-ink"></rect>`
      : "";

    return `${field}${coil}${core}${poles}`;
  }

  function update() {
    const source = choose.value;
    const current = Number(currentInput.value);
    if (source === "wire") {
      svg.innerHTML = drawWire(current);
      readout.textContent = `Current = ${current} A. The field lines are circles around the wire. They are closer together near the wire, where the field is strongest, and a larger current makes the whole field stronger.`;
    } else {
      const withCore = source === "core";
      svg.innerHTML = drawSolenoid(current, withCore);
      readout.textContent = withCore
        ? `Current = ${current} A. The soft iron core lines up with the field of the coil and adds its own field, so the field is much stronger than with the coil alone.`
        : `Current = ${current} A. The field of the solenoid is like the field of a bar magnet, with a north end and a south end. The direction of the current decides which end is north.`;
    }
  }

  react([choose, currentInput], update);
}
