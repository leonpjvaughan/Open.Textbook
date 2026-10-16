// Tier-1 guided investigation: the current-potential difference graph of an ohmic
// resistor, a filament lamp and a diode.
//
// The page asks the reader to predict what happens to the current when the
// potential difference doubles, then to test each component and explain the shape of
// its graph. So the figure has to show three genuinely different shapes on the same
// axes: a straight line through the origin, a curve that flattens as the filament
// heats, and a threshold followed by a steep rise.
//
// Nothing here carries a colour. The curve uses one class, the axes another and the
// marker a third, so the figure survives a monochrome bundle.
//
// The scaffolding — the panel, its accessible name, the controls, the readout and the
// redraw — comes from `kit.js`. What is left is the drawing and the sentences.
import { SIZE, fmt, label, panel, chooser, scale, slider, react } from "./kit.js";

// The resistor, in ohms. A straight line through the origin.
const R_OHM = 10;
// The cold resistance of the filament, in ohms, and how fast it rises with current.
// The model is V = I R0 (1 + K I), which curves over as the lamp heats.
const R_COLD = 10;
const K_HEAT = 2;
// The diode conducts once the potential difference reaches this, in volts, and then
// the current rises with this slope, in amperes per volt.
const DIODE_THRESHOLD = 0.6;
const DIODE_SLOPE = 0.25;

function currentFor(component, volts) {
  if (component === "resistor") return volts / R_OHM;
  if (component === "lamp") {
    // Solve V = I R0 (1 + K I) for the positive root.
    const a = K_HEAT * R_COLD;
    const b = R_COLD;
    return (-b + Math.sqrt(b * b + 4 * a * volts)) / (2 * a);
  }
  if (volts <= DIODE_THRESHOLD) return 0;
  return DIODE_SLOPE * (volts - DIODE_THRESHOLD);
}

function shapeFor(component) {
  if (component === "resistor") return "is a straight line through the origin, so the resistor obeys Ohm's law";
  if (component === "lamp") return "curves over, because the filament gets hotter and its resistance rises";
  return "stays at zero until the threshold and then rises steeply, so the diode conducts in one direction only";
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Current-potential difference graphs for a resistor, a filament lamp and a diode",
    width: 420,
    height: 260,
  });

  const choose = chooser(el, {
    id: "component",
    label: "Component",
    choices: [
      { value: "resistor", label: "Resistor" },
      { value: "lamp", label: "Filament lamp" },
      { value: "diode", label: "Diode" },
    ],
  });

  const voltsInput = slider(el, {
    show: false,
    id: "volts",
    label: "Potential difference",
    min: 0,
    max: 6,
    step: 0.1,
    value: 3,
    unit: "V",
  });

  // The plot area, in SVG units.
  const PLOT = { x0: 58, y0: 208, x1: 384, y1: 26 };
  const X_MAX = 6.2; // volts
  const Y_MAX = 1.5; // amperes
  const x = scale({ domain: [0, X_MAX], range: [PLOT.x0, PLOT.x1] });
  const y = scale({ domain: [0, Y_MAX], range: [PLOT.y0, PLOT.y1] });

  function update() {
    const component = choose.value;
    const volts = Number(voltsInput.value);
    const current = currentFor(component, volts);

    const axes = `
      <line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x1}" y2="${PLOT.y0}" class="fig-grid" stroke-width="1.5"></line>
      <line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x0}" y2="${PLOT.y1}" class="fig-grid" stroke-width="1.5"></line>
      ${label({ x: PLOT.x0 - 8, y: PLOT.y0 + 4, text: "0", anchor: "end", size: SIZE.tick })}
      ${label({ x: PLOT.x1, y: PLOT.y0 + 18, text: "potential difference / V", anchor: "end", size: SIZE.tick })}
      ${label({ x: PLOT.x0 - 6, y: PLOT.y1 - 4, text: "current / A", anchor: "end", size: SIZE.tick })}
    `;

    // The curve, sampled, because the lamp's and the diode's graphs are not straight.
    let curve = "";
    const steps = 60;
    for (let i = 0; i < steps; i += 1) {
      const v1 = (X_MAX * i) / steps;
      const v2 = (X_MAX * (i + 1)) / steps;
      const i1 = currentFor(component, v1);
      const i2 = currentFor(component, v2);
      if (i1 > Y_MAX && i2 > Y_MAX) continue;
      curve += `<line x1="${x(v1).toFixed(1)}" y1="${y(Math.min(i1, Y_MAX)).toFixed(1)}" x2="${x(v2).toFixed(1)}" y2="${y(Math.min(i2, Y_MAX)).toFixed(1)}" class="fig-accent" stroke-width="2.5"></line>`;
    }

    const marker = `<circle cx="${x(volts)}" cy="${y(Math.min(current, Y_MAX))}" r="5.5" class="fig-ink"></circle>`;

    svg.innerHTML = `${axes}${curve}${marker}`;

    if (component === "diode" && volts <= DIODE_THRESHOLD) {
      readout.textContent = `Potential difference = ${fmt(volts, 1)} V. Below the threshold, so the diode carries no current.`;
    } else if (current > Y_MAX) {
      readout.textContent = `Potential difference = ${fmt(volts, 1)} V. The current is above the top of the graph, so the diode is conducting strongly.`;
    } else {
      const resistance = volts / current;
      readout.textContent = `Potential difference = ${fmt(volts, 1)} V, current = ${fmt(current, 3)} A, resistance = ${fmt(resistance, 1)} ohm. The graph for the ${component} ${shapeFor(component)}.`;
    }
  }

  react([choose, voltsInput], update);
}
