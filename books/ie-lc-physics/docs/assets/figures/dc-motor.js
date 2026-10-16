// Tier-1 guided investigation: why a coil in a magnetic field keeps turning, and
// what the split-ring commutator does.
//
// The page asks the reader to predict what happens to the force on a conductor as
// the coil turns, then to test it here, then to explain why the current has to be
// reversed every half turn. So the figure has to show the two conductors moving
// round the axis, the current direction in each of them, and the force that
// follows — with the reversal happening at the right moment.
//
// The view is a top view: the field runs across the page, the two sides of the
// coil are seen end-on as circles, and the forces are in the page. Nothing here
// carries a colour: the field uses the grid class, the conductors and the forces
// the accent class, so the figure follows the reader's bundle and both schemes.
//
// The scaffolding — the panel, its accessible name, the controls, the readout and
// the redraw — comes from `kit.js`. What is left is the drawing and the words.
import { SIZE, fmt, label, panel, scale, slider, react } from "./kit.js";

const WIDTH = 460;
const HEIGHT = 250;
const CENTRE = { x: WIDTH / 2, y: HEIGHT / 2 };
const RADIUS = 74;

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A coil turning between the poles of a magnet, seen from above",
    prompt: "Turn the coil and watch the current and the force on each side of it.",
    width: WIDTH,
    height: HEIGHT,
  });

  const angleInput = slider(el, {
    show: true,
    id: "angle",
    label: "Coil angle",
    min: 0,
    max: 360,
    step: 5,
    value: 30,
    unit: "°",
  });

  const currentInput = slider(el, {
    show: true,
    id: "current",
    label: "Current",
    min: 0.5,
    max: 4.0,
    step: 0.5,
    value: 2.0,
    unit: "A",
  });

  const forceLength = scale({ domain: [0, 4], range: [26, 60] });

  function fieldArrows() {
    let arrows = "";
    for (let y = 30; y <= HEIGHT - 20; y += 44) {
      arrows += `<line x1="30" y1="${y}" x2="${WIDTH - 30}" y2="${y}" class="fig-grid" stroke-width="1.4"></line>`;
      arrows += `<path d="M ${WIDTH - 30} ${y - 6} L ${WIDTH - 18} ${y} L ${WIDTH - 30} ${y + 6} z" class="fig-grid"></path>`;
    }
    return arrows;
  }

  // One side of the coil: a circle seen end-on, with the current direction and
  // the force on it. `out` is true when the current comes out of the page.
  function conductor(x, y, out, lengthPx) {
    const marker = out
      ? `<circle cx="${x}" cy="${y}" r="3.4" class="fig-accent"></circle>`
      : `<line x1="${x - 5}" y1="${y - 5}" x2="${x + 5}" y2="${y + 5}" class="fig-accent" stroke-width="2"></line>` +
        `<line x1="${x - 5}" y1="${y + 5}" x2="${x + 5}" y2="${y - 5}" class="fig-accent" stroke-width="2"></line>`;
    const ring = `<circle cx="${x}" cy="${y}" r="10" fill="none" class="fig-accent" stroke-width="2.5"></circle>`;
    // A current out of the page gives an upward force; into the page gives a
    // downward one.
    const direction = out ? -1 : 1;
    const tail = y + direction * 14;
    const tip = y + direction * (14 + lengthPx);
    const arrow =
      `<line x1="${x}" y1="${tail}" x2="${x}" y2="${tip}" class="fig-warn" stroke-width="3"></line>` +
      `<path d="M ${x - 7} ${tip - direction * 10} L ${x} ${tip} L ${x + 7} ${tip - direction * 10} z" class="fig-warn"></path>`;
    return `${ring}${marker}${arrow}`;
  }

  function update() {
    const angle = Number(angleInput.value);
    const current = Number(currentInput.value);
    const lengthPx = forceLength(current);

    const theta = (angle * Math.PI) / 180;
    const a = { x: CENTRE.x + RADIUS * Math.cos(theta), y: CENTRE.y + RADIUS * Math.sin(theta) };
    const b = { x: CENTRE.x - RADIUS * Math.cos(theta), y: CENTRE.y - RADIUS * Math.sin(theta) };

    // The commutator reverses the current when a side crosses the vertical, so
    // the side on the right always carries current out of the page and is pushed
    // up. That is what keeps the coil turning one way.
    const aOut = Math.cos(theta) >= 0;
    const bOut = !aOut;

    const frame =
      `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="fig-ink" stroke-width="2.5"></line>` +
      `<circle cx="${CENTRE.x}" cy="${CENTRE.y}" r="4" class="fig-ink"></circle>`;

    const sides =
      conductor(a.x, a.y, aOut, lengthPx) + conductor(b.x, b.y, bOut, lengthPx);

    const axis = label({
      x: CENTRE.x + 10,
      y: CENTRE.y - 8,
      text: "axis",
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    });

    svg.innerHTML = `${fieldArrows()}${frame}${sides}${axis}`;

    readout.textContent = `The coil is at ${fmt(angle, 0)}°. The side on the right carries current out of the page and is pushed up; the side on the left carries current into the page and is pushed down. The commutator reverses the current every half turn, so the coil keeps turning the same way.`;
  }

  react([angleInput, currentInput], update);
}
