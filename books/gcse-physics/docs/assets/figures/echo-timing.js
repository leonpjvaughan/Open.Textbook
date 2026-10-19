// Tier-1 guided investigation: an echo and the distance to a boundary.
//
// Guided, not a sandbox: the page asks the reader to predict what doubling the
// depth does to the echo time, then to explain it from distance = speed x time
// with the trip there and back. The reader sets the depth and the speed of the
// wave; the figure draws the down-and-back path and reports the echo time.
// Colours come from CSS classes so the figure adapts to dark mode.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import {
  label,
  panel,
  quantity,
  react,
  slider,
  SIZE,
} from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A boat sends a sound pulse down to a boundary and the reflection returns. The depth and the speed of the wave can be changed",
    width: 560,
    height: 240,
  });

  const depthInput = slider(el, { show: false,
    id: "depth",
    label: "Depth (m)",
    min: 10,
    max: 60,
    step: 5,
    value: 30,
  });
  const speedInput = slider(el, { show: false,
    id: "speed",
    label: "Speed of the wave (m/s)",
    min: 1000,
    max: 3000,
    step: 100,
    value: 1500,
  });
  const BOAT_Y = 45;
  const SEABED_Y = 200;
  const CENTRE_X = 280;

  function update() {
    const depth = Number(depthInput.value);
    const speed = Number(speedInput.value);
    const time = (2 * depth) / speed;

    const boat =
      `<polygon points="${CENTRE_X - 40},${BOAT_Y} ${CENTRE_X + 40},${BOAT_Y} ` +
      `${CENTRE_X + 26},${BOAT_Y + 18} ${CENTRE_X - 26},${BOAT_Y + 18}" class="fig-ink"></polygon>` +
      `${label({ x: CENTRE_X, y: BOAT_Y - 10, text: `survey boat`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}`;

    const seabed =
      `<line x1="60" y1="${SEABED_Y}" x2="500" y2="${SEABED_Y}" class="fig-ink" stroke-width="3"></line>` +
      `${label({ x: 505, y: SEABED_Y + 4, text: `boundary`, anchor: "end", size: SIZE.tick, class: "text-ink" })}`;

    const down =
      `<line x1="${CENTRE_X - 12}" y1="${BOAT_Y + 20}" x2="${CENTRE_X - 12}" y2="${SEABED_Y - 8}" ` +
      `class="fig-accent" stroke-width="2" stroke-dasharray="6 4"></line>` +
      `<polygon points="${CENTRE_X - 12},${SEABED_Y - 4} ${CENTRE_X - 18},${SEABED_Y - 16} ` +
      `${CENTRE_X - 6},${SEABED_Y - 16}" class="fig-accent"></polygon>`;

    const up =
      `<line x1="${CENTRE_X + 12}" y1="${SEABED_Y - 8}" x2="${CENTRE_X + 12}" y2="${BOAT_Y + 20}" ` +
      `class="fig-warn" stroke-width="2" stroke-dasharray="6 4"></line>` +
      `<polygon points="${CENTRE_X + 12},${BOAT_Y + 16} ${CENTRE_X + 6},${BOAT_Y + 28} ` +
      `${CENTRE_X + 18},${BOAT_Y + 28}" class="fig-warn"></polygon>`;

    const labels =
      `${label({ x: CENTRE_X - 22, y: (BOAT_Y + SEABED_Y) / 2, text: `going down`, anchor: "end", size: SIZE.tick, class: "text-ink" })}` +
      `${label({ x: CENTRE_X + 22, y: (BOAT_Y + SEABED_Y) / 2, text: `reflection`, anchor: "start", size: SIZE.tick, class: "text-ink" })}` +
      `<line x1="150" y1="${BOAT_Y + 18}" x2="150" y2="${SEABED_Y}" class="fig-grid" stroke-dasharray="3 3"></line>` +
      `${label({ x: 158, y: (BOAT_Y + SEABED_Y) / 2, text: `depth = ${depth} m`, anchor: "start", size: SIZE.tick, class: "text-ink" })}`;

    svg.innerHTML = boat + seabed + down + up + labels;

    readout.innerHTML =
      `Depth <strong>${depth} m</strong>, wave speed <strong>${speed} m/s</strong>. ` +
      `The pulse travels down and back, a total of <strong>${2 * depth} m</strong>, ` +
      `so the echo time is <strong>${quantity(time, "s", 3)}</strong>. ` +
      `<em>Now double the depth. What happens to the echo time?</em>`;
  }

  react([depthInput, speedInput], update);
}
