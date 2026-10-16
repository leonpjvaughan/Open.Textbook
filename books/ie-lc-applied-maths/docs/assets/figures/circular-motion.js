// Tier-1 guided investigation: what supplies the centripetal force on a car in a bend.
//
// The page asks the reader to say which way the force on a car in a bend points, and
// then what happens on a wet road. So the figure has to show two things at once: the
// force the motion *needs* ($mv^2/r$), and the greatest force friction *can supply*
// ($\mu mg$). The car slides exactly when the first exceeds the second, and that
// comparison is the whole idea of the section.
//
// Nothing here carries a colour. The force arrow changes class when the car slides, and
// the readout says so in words, so the state does not depend on colour alone.
//
// The scaffolding — the panel, its accessible name, the slider, the readout and the
// redraw — comes from `kit.js`. What is left is the drawing and the sentences.
import { SIZE, fmt, label, panel, react, slider } from "./kit.js";

// The car from the chapter problem, on the roundabout.
const MASS = 1200; // kg
const RADIUS = 20; // m
const MU = 0.8;
const G = 9.8; // m/s^2

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A car on a roundabout, showing the inward force the circular motion needs and whether friction can supply it",
    width: 560,
    height: 330,
  });

  const speedInput = slider(el, {
    show: true,
    id: "speed",
    label: "Speed",
    min: 0,
    max: 20,
    step: 0.5,
    value: 10,
    unit: "m/s",
  });

  const cx = 280;
  const cy = 176;
  const R = 104; // the roundabout, in SVG units
  const MAX_FRICTION = MU * MASS * G;

  function update() {
    const v = Number(speedInput.value);
    const a = (v * v) / RADIUS;
    const needed = MASS * a;
    const slides = needed > MAX_FRICTION;

    // The roundabout and its centre.
    let drawing =
      `<circle cx="${cx}" cy="${cy}" r="${R}" class="fig-grid" stroke-width="2" fill="none"></circle>` +
      `<circle cx="${cx}" cy="${cy}" r="3.5" class="fig-ink"></circle>` +
      label({ x: cx, y: cy - 10, text: "centre", size: SIZE.value, class: "text-ink" });

    // The car sits at the top of the circle, so the inward force points straight down.
    const carX = cx;
    const carY = cy - R;
    drawing += `<circle cx="${carX}" cy="${carY}" r="11" class="${slides ? "fig-warn" : "fig-accent"}"></circle>`;
    drawing += label({ x: carX, y: carY - 20, text: "car", size: SIZE.value, class: "text-ink", weight: "bold" });

    // The velocity is a tangent — horizontal at the top of the circle.
    const vLen = 18 + v * 4;
    drawing += `<line x1="${carX}" y1="${carY}" x2="${carX + vLen}" y2="${carY}" class="fig-ink" stroke-width="3"></line>`;
    drawing += `<path d="M${carX + vLen} ${carY} l-9 -5 l0 10 z" class="fig-ink"></path>`;
    drawing += label({ x: carX + vLen + 6, y: carY + 6, text: "v", size: SIZE.value, class: "text-ink", anchor: "start" });

    // The inward force, drawn downwards from the car. Its length is capped so the
    // arrow stays on the panel, and the readout gives the true value.
    const fLen = Math.min(20 + (needed / MAX_FRICTION) * 70, 110);
    drawing += `<line x1="${carX}" y1="${carY + 12}" x2="${carX}" y2="${carY + 12 + fLen}" class="${slides ? "fig-warn" : "fig-accent"}" stroke-width="4"></line>`;
    drawing += `<path d="M${carX} ${carY + 12 + fLen} l-6 -10 l12 0 z" class="${slides ? "fig-warn" : "fig-accent"}"></path>`;
    drawing += label({
      x: carX + 10,
      y: carY + 26 + fLen / 2,
      text: "F",
      size: SIZE.value,
      class: slides ? "text-warn" : "text-accent",
      anchor: "start",
      weight: "bold",
    });

    // The comparison, drawn as two bars: what is needed, and what friction can give.
    const bx = 60;
    const by = 296;
    const scale = 150 / Math.max(needed, MAX_FRICTION, 1);
    drawing += label({ x: bx - 8, y: by + 4, text: "needs", size: SIZE.value, class: "text-ink", anchor: "end" });
    drawing += `<line x1="${bx}" y1="${by - 6}" x2="${bx}" y2="${by + 6}" class="fig-grid" stroke-width="1.5"></line>`;
    drawing += `<rect x="${bx}" y="${by - 6}" width="${(needed * scale).toFixed(1)}" height="12" class="${slides ? "fig-warn" : "fig-accent"}"></rect>`;
    drawing += label({ x: bx - 8, y: by + 26, text: "friction", size: SIZE.value, class: "text-ink", anchor: "end" });
    drawing += `<line x1="${bx}" y1="${by + 16}" x2="${bx}" y2="${by + 28}" class="fig-grid" stroke-width="1.5"></line>`;
    drawing += `<rect x="${bx}" y="${by + 16}" width="${(MAX_FRICTION * scale).toFixed(1)}" height="12" class="fig-ink"></rect>`;

    svg.innerHTML = drawing;

    readout.textContent = slides
      ? `At ${fmt(v, 1)} m/s the car needs ${fmt(needed, 0)} N towards the centre, but friction can supply only ${fmt(MAX_FRICTION, 0)} N. The car slides outwards. The greatest safe speed is ${fmt(Math.sqrt(MU * G * RADIUS), 1)} m/s.`
      : `At ${fmt(v, 1)} m/s the car needs ${fmt(needed, 0)} N towards the centre (a = ${fmt(a, 2)} m/s²). Friction can supply up to ${fmt(MAX_FRICTION, 0)} N, so the car holds the bend.`;
  }

  react([speedInput], update);
}
