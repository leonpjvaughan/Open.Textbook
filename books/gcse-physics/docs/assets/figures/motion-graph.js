// Tier-1 guided investigation: velocity, acceleration and a velocity-time graph.
//
// Guided, not a sandbox: the page asks the reader to predict what doubling the
// acceleration and doubling the time each do, then to explain why doubling the
// time makes the area four times as large. The reader sets a steady acceleration
// and a time; the graph draws the straight line, the gradient triangle and the
// area under the line.
// Colours come from CSS classes so the figure adapts to dark mode.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentence, which are the parts that differ from every other figure.
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
      "A velocity-time graph of a straight line from the origin, with the gradient and the area under the line marked",
    width: 560,
    height: 200,
  });

  const accelInput = slider(el, { show: false,
    id: "accel",
    label: "Acceleration (m/s²)",
    min: 0.5,
    max: 4,
    step: 0.5,
    value: 2,
    show: false,
  });
  const timeInput = slider(el, { show: false,
    id: "time",
    label: "Time (s)",
    min: 1,
    max: 10,
    step: 1,
    value: 4,
    show: false,
  });

  const LEFT = 52;
  const BOTTOM = 158;
  const WIDTH = 470;
  const HEIGHT = 118;
  const TIME_MAX = 10;
  const VELOCITY_MAX = 40;
  const xScale = WIDTH / TIME_MAX;
  const yScale = HEIGHT / VELOCITY_MAX;

  function update() {
    const accel = Number(accelInput.value);
    const time = Number(timeInput.value);
    const velocity = accel * time;
    const distance = 0.5 * accel * time * time;

    const xEnd = LEFT + time * xScale;
    const yEnd = BOTTOM - velocity * yScale;

    const axes =
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${LEFT + WIDTH}" y2="${BOTTOM}" class="fig-ink" stroke-width="2"></line><line x1="${LEFT}" y1="${BOTTOM}" x2="${LEFT}" y2="${BOTTOM - HEIGHT}" class="fig-ink" stroke-width="2"></line>${label({ x: LEFT + WIDTH / 2, y: BOTTOM + 22, text: `time (s)`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}${label({ x: 14, y: BOTTOM - HEIGHT / 2, text: 'velocity (m/s)', anchor: "middle", size: SIZE.tick, class: "text-ink", rotate: -90 })}`;

    const line =
      `<polygon points="${LEFT},${BOTTOM} ${xEnd.toFixed(1)},${BOTTOM} ${xEnd.toFixed(1)},${yEnd.toFixed(1)}" class="fig-good"></polygon><line x1="${LEFT}" y1="${BOTTOM}" x2="${xEnd.toFixed(1)}" y2="${yEnd.toFixed(1)}" class="fig-accent" stroke-width="3"></line><line x1="${xEnd.toFixed(1)}" y1="${BOTTOM}" x2="${xEnd.toFixed(1)}" y2="${yEnd.toFixed(1)}" class="fig-grid" stroke-dasharray="4 3"></line><line x1="${LEFT}" y1="${yEnd.toFixed(1)}" x2="${xEnd.toFixed(1)}" y2="${yEnd.toFixed(1)}" class="fig-grid" stroke-dasharray="4 3"></line>${label({ x: (LEFT + xEnd) / 2, y: BOTTOM - 8, text: `area = ${quantity(distance, "m", 1)}`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}${label({ x: xEnd.toFixed(1), y: (BOTTOM + yEnd) / 2, text: `v = ${quantity(velocity, "m", 1)}/s`, anchor: "end", size: SIZE.tick, class: "text-ink" })}`;

    svg.innerHTML = axes + line;

    readout.innerHTML =
      `Acceleration ${quantity(accel, "m", 1)}/s&sup2; for ${time} s. The line ends at <strong>${quantity(velocity, "m", 1)}/s</strong>, so the gradient is <strong>${quantity(accel, "m", 1)}/s&sup2;</strong>. The area under the line is <strong>${quantity(distance, "m", 1)}</strong>, which is the distance travelled. <em>Double the time: which number doubles, and which becomes four times as large?</em>`;
  }

  react([accelInput, timeInput], update);
}
