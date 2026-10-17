// Tier-1 guided investigation: force, mass and acceleration.
//
// Guided, not a sandbox: the page asks the reader to predict what doubling the
// force and doubling the mass each do to the acceleration, then to explain the
// result with F = ma. The reader sets a resultant force and a mass; the figure
// shows the trolley, the force arrow and the acceleration.
// Colours come from CSS classes so the figure adapts to dark mode.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentence, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A trolley with a force arrow pushing it, and the acceleration produced by the force and the mass",
    width: 560,
    height: 160,
  });

  const forceInput = slider(el, { show: false,
    id: "force",
    label: "Resultant force (N)",
    min: 2,
    max: 20,
    step: 1,
    value: 8,
    show: false,
  });
  const massInput = slider(el, { show: false,
    id: "mass",
    label: "Mass (kg)",
    min: 2,
    max: 10,
    step: 1,
    value: 4,
    show: false,
  });

  const GROUND = 118;
  const CENTRE = 300;
  const FORCE_SCALE = 7; // pixels per newton, so 20 N reaches 140 px

  function update() {
    const force = Number(forceInput.value);
    const mass = Number(massInput.value);
    const acceleration = force / mass;

    // A heavier trolley is drawn a little taller, so the mass is visible.
    const height = 22 + mass * 1.5;
    const trolley =
      `<rect x="${CENTRE - 55}" y="${GROUND - height}" width="110" height="${height.toFixed(1)}" class="fig-grid"></rect>` +
      `<circle cx="${CENTRE - 34}" cy="${GROUND + 6}" r="8" class="fig-ink"></circle>` +
      `<circle cx="${CENTRE + 34}" cy="${GROUND + 6}" r="8" class="fig-ink"></circle>` +
      `<line x1="120" y1="${GROUND + 14}" x2="500" y2="${GROUND + 14}" class="fig-ink" stroke-width="3"></line>`;

    // The force arrow grows with the force, so twice the force is twice as long.
    const length = force * FORCE_SCALE;
    const x0 = CENTRE - 55;
    const arrow =
      `<line x1="${x0 - length}" y1="${GROUND - height / 2}" x2="${x0 - 12}" y2="${GROUND - height / 2}" class="fig-accent" stroke-width="4"></line>` +
      `<polygon points="${x0},${GROUND - height / 2} ${x0 - 12},${GROUND - height / 2 - 6} ${x0 - 12},${GROUND - height / 2 + 6}" class="fig-accent"></polygon>` +
      `${label({ x: x0 - length - 4, y: GROUND - height / 2 - 8, text: `F = ${force} N`, anchor: "start", size: SIZE.tick, class: "text-ink" })}`;

    svg.innerHTML =
      trolley +
      arrow +
      `${label({ x: CENTRE, y: GROUND - height - 12, text: `m = ${mass} kg`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}` +
      `${label({ x: CENTRE, y: GROUND + 42, text: `a = F ÷ m = ${force} ÷ ${mass} = ${acceleration.toFixed(2)} m/s²`, anchor: "middle", size: SIZE.value, class: "text-ink" })}`;

    readout.innerHTML =
      `Resultant force ${force} N, mass ${mass} kg, so the acceleration is ` +
      `<strong>${acceleration.toFixed(2)} m/s&sup2;</strong>. ` +
      `<em>Double the force: what happens to the acceleration? Then raise the mass: what happens now?</em>`;
  }

  react([forceInput, massInput], update);
}
