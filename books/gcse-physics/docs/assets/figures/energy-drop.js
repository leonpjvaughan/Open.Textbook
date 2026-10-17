// Tier-1 guided investigation: energy on a drop.
//
// Guided, not a sandbox: the page asks the reader to predict before moving the
// sliders, then to explain why doubling the height doubles the energy but does
// not double the speed. Mass and height are the two parameters; the gravitational
// potential store and the kinetic store are shown side by side.
// Colours come from CSS classes so the figure adapts to dark mode.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A ball on a drop with two bars showing gravitational potential energy at the top and kinetic energy at the bottom",
    width: 560,
    height: 170,
  });

  const massInput = slider(el, { show: false,
    id: "mass",
    label: "Mass (kg)",
    min: 0.5,
    max: 5,
    step: 0.1,
    value: 2,
  });
  const heightInput = slider(el, { show: false,
    id: "height",
    label: "Height (m)",
    min: 0.5,
    max: 5,
    step: 0.1,
    value: 1,
  });
  const g = 9.8;
  const GROUND = 140;
  const TOP = 24;
  const HEIGHT_MAX = 5;
  const ENERGY_MAX = 5 * g * 5;

  function update() {
    const mass = Number(massInput.value);
    const height = Number(heightInput.value);
    const energy = mass * g * height;
    const speed = Math.sqrt(2 * g * height);

    // The ball sits at a height proportional to the slider, with a dotted line
    // down to the ground.
    const y = GROUND - (height / HEIGHT_MAX) * (GROUND - TOP);
    const ball =
      `<circle cx="70" cy="${y}" r="9" class="fig-accent"></circle>` +
      `<line x1="70" y1="${y}" x2="70" y2="${GROUND}" class="fig-grid" ` +
      `stroke-dasharray="3 3"></line>` +
      `<line x1="40" y1="${GROUND}" x2="150" y2="${GROUND}" class="fig-ink"></line>` +
      `${label({ x: 84, y: (y + GROUND) / 2, text: `h = ${height.toFixed(1)} m`, anchor: "start", size: SIZE.tick, class: "text-ink" })}`;

    // Two bars sharing one scale, so a taller drop visibly stores more energy.
    const barWidth = (energy / ENERGY_MAX) * 330;
    // `name`, not `label`: a parameter of that name shadows the imported mark, and the
    // figure then loads by throwing `label is not a function`.
    const bar = (top, cls, name, value) =>
      `${label({ x: 170, y: top - 5, text: `${name}`, anchor: "start", size: SIZE.tick, class: "text-ink" })}` +
      `<rect x="170" y="${top}" width="${barWidth.toFixed(1)}" height="20" class="${cls}"></rect>` +
      `${label({ x: (178 + barWidth).toFixed(1), y: top + 15, text: `${value}`, anchor: "start", size: SIZE.tick, class: "text-ink" })}`;

    svg.innerHTML =
      ball +
      bar(30, "fig-accent", "Gravitational potential store", `${energy.toFixed(1)} J`) +
      bar(90, "fig-warn", "Kinetic store at the bottom", `${energy.toFixed(1)} J`);

    readout.innerHTML =
      `Mass ${mass.toFixed(1)} kg, height ${height.toFixed(1)} m. ` +
      `The gravitational potential store holds <strong>${energy.toFixed(1)} J</strong>. ` +
      `With no friction that energy moves to the kinetic store, so the ball reaches ` +
      `<strong>${speed.toFixed(1)} m/s</strong> at the bottom. ` +
      `<em>Now double the height: which of the two numbers doubles, and which does not?</em>`;
  }

  react([massInput, heightInput], update);
}
