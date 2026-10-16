// Tier-1 guided investigation: the force on a moving charge in a magnetic field,
// F = Bqv, and the circular path it produces.
//
// The page asks the reader to predict what happens to the radius of the path when
// the speed is doubled, then to test it here, then to explain why a bigger speed
// gives a bigger circle and a bigger field gives a smaller one. So the figure has
// to let the speed and the field be changed and draw the *path* that follows,
// rather than assert the shape.
//
// Nothing here carries a colour. The field uses the grid class, the path and the
// velocity the accent class, so the figure follows the reader's bundle and both
// schemes.
//
// The scaffolding — the panel, its accessible name, the controls, the readout and
// the redraw — comes from `kit.js`. What is left is the drawing and the words.
import { SIZE, fmt, label, panel, scale, slider, toggle, react } from "./kit.js";

const WIDTH = 460;
const HEIGHT = 250;
// An electron: its mass and the size of its charge, in SI units.
const MASS = 9.11e-31;
const CHARGE = 1.6e-19;

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "The curved path of an electron moving in a magnetic field",
    prompt: "Predict what doubling the speed does to the radius, then test it.",
    width: WIDTH,
    height: HEIGHT,
  });

  const speedInput = slider(el, {
    show: true,
    id: "speed",
    label: "Speed",
    min: 1e6,
    max: 2e7,
    step: 1e6,
    value: 1e7,
    unit: "m/s",
    format: (value) => `${(value / 1e6).toFixed(1)} million`,
  });

  const fieldInput = slider(el, {
    show: true,
    id: "flux",
    label: "Flux density",
    min: 0.001,
    max: 0.010,
    step: 0.001,
    value: 0.002,
    unit: "T",
    format: (value) => value.toFixed(3),
  });

  const reverse = toggle(el, {
    id: "reverse",
    label: "Field out of the page",
  });

  const entryX = 54;
  const entryY = 82;
  const radiusScale = scale({ domain: [0, 0.12], range: [10, 95] });

  function fieldMarks() {
    let marks = "";
    for (let x = 30; x < WIDTH - 10; x += 34) {
      for (let y = 26; y < HEIGHT - 10; y += 34) {
        marks += `<line x1="${x - 5}" y1="${y - 5}" x2="${x + 5}" y2="${y + 5}" class="fig-grid" stroke-width="1.6"></line>`;
        marks += `<line x1="${x - 5}" y1="${y + 5}" x2="${x + 5}" y2="${y - 5}" class="fig-grid" stroke-width="1.6"></line>`;
      }
    }
    return marks;
  }

  function update() {
    const speed = Number(speedInput.value);
    const flux = Number(fieldInput.value);
    const outOfPage = reverse.checked;
    // The radius of the circular path, from r = mv / (qB).
    const radius = (MASS * speed) / (CHARGE * flux);
    const radiusPx = radiusScale(Math.min(radius, 0.12));

    // A field into the page and an electron moving to the right gives a force
    // downwards, so the centre of the circle is below the entry point. Reversing
    // the field puts the centre above it.
    const centreX = entryX;
    const centreY = outOfPage ? entryY - radiusPx : entryY + radiusPx;

    let path = "";
    let previous = null;
    for (let i = 0; i <= 90; i += 1) {
      const t = (2.4 * i) / 90;
      const x = centreX + radiusPx * Math.sin(t);
      const y = centreY + (outOfPage ? 1 : -1) * radiusPx * Math.cos(t);
      if (x < 4 || x > WIDTH - 4 || y < 4 || y > HEIGHT - 4) break;
      path += `${previous === null ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
      previous = [x, y];
    }

    const marks = fieldMarks();
    const entry = `<circle cx="${entryX}" cy="${entryY}" r="6" class="fig-accent"></circle>`;
    const velocity =
      `<line x1="${entryX}" y1="${entryY}" x2="${entryX + 44}" y2="${entryY}" class="fig-accent" stroke-width="2.5"></line>` +
      `<path d="M ${entryX + 44} ${entryY - 6} L ${entryX + 54} ${entryY} L ${entryX + 44} ${entryY + 6} z" class="fig-accent"></path>` +
      label({
        x: entryX + 8,
        y: entryY - 12,
        text: "v",
        anchor: "start",
        size: SIZE.tick,
        class: "text-accent",
      });

    svg.innerHTML = `${marks}<path d="${path}" fill="none" class="fig-accent" stroke-width="2.5"></path>${entry}${velocity}`;

    readout.textContent = `An electron at ${fmt(speed / 1e6, 1)} million m/s in a field of ${fmt(flux, 3)} T follows a circle of radius ${fmt(radius * 1000, 1)} mm. A bigger speed gives a bigger circle, and a bigger field gives a smaller one.`;
  }

  react([speedInput, fieldInput, reverse], update);
}
