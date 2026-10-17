// Guided investigation: the gradient and the area under a velocity-time graph.
//
// Guided, not a sandbox: the page asks the reader to predict what happens to the
// acceleration and to the distance when the time doubles, then to explain why one
// can fall while the other rises. The shaded triangle is the area under the line,
// so the distance is a picture. Colours come from CSS classes, so the figure
// adapts to every bundle and both schemes.
//
// The scaffolding — the surface, its accessible name, the two sliders, the live
// readout, the redraw, the number formatting — comes from `kit.js`.
import { SIZE, fmt, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const LEFT = 64;
  const RIGHT = 520;
  const TOP = 26;
  const BASE = 232;
  const MAX_TIME = 10;
  const MAX_SPEED = 20;

  const { svg, readout } = panel(el, {
    label:
      "A velocity-time graph for a straight rising line, with the triangle under the line shaded to show the distance travelled",
    width: 560,
    height: 280,
    max: 580,
  });

  const speedInput = slider(el, { show: false,
    id: "speed",
    label: "Top speed in m/s",
    min: 2,
    max: 20,
    step: 2,
    value: 8,
  });
  const timeInput = slider(el, { show: false,
    id: "time",
    label: "Time in s",
    min: 1,
    max: 10,
    step: 1,
    value: 4,
  });

  const xFor = (seconds) => LEFT + (seconds / MAX_TIME) * (RIGHT - LEFT);
  const yFor = (speed) => BASE - (speed / MAX_SPEED) * (BASE - TOP);

  function update() {
    const speed = Number(speedInput.value);
    const time = Number(timeInput.value);
    const acceleration = speed / time;
    const distance = 0.5 * time * speed;

    let grid = "";
    for (let seconds = 0; seconds <= MAX_TIME; seconds += 2) {
      const x = xFor(seconds);
      grid +=
        `<line x1="${x.toFixed(1)}" y1="${TOP}" x2="${x.toFixed(1)}" y2="${BASE}" class="fig-grid"></line>` +
        label({ x, y: BASE + 18, text: seconds, anchor: "middle", size: SIZE.label, class: "text-ink" });
    }
    for (let value = 0; value <= MAX_SPEED; value += 4) {
      const y = yFor(value);
      grid +=
        `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>` +
        label({ x: LEFT - 9, y: y + 4, text: value, anchor: "end", size: SIZE.label, class: "text-ink" });
    }

    const cornerX = xFor(time);
    const cornerY = yFor(speed);
    const triangle =
      `<polygon points="${LEFT},${BASE} ${cornerX.toFixed(1)},${BASE} ${cornerX.toFixed(1)},${cornerY.toFixed(1)}" class="fig-accent" fill-opacity="0.22" stroke-width="0"></polygon>`;

    const width = cornerX - LEFT;
    const height = BASE - cornerY;
    const areaLabel =
      width > 70 && height > 40
        ? label({ x: LEFT + width / 2, y: BASE - height / 3, text: `${fmt(distance)} m`, anchor: "middle", size: SIZE.value, class: "text-accent" })
        : "";

    svg.innerHTML =
      grid +
      triangle +
      `<line x1="${LEFT}" y1="${BASE}" x2="${RIGHT}" y2="${BASE}" class="fig-ink" stroke-width="2"></line><line x1="${LEFT}" y1="${BASE}" x2="${LEFT}" y2="${TOP}" class="fig-ink" stroke-width="2"></line><line x1="${LEFT}" y1="${BASE}" x2="${cornerX.toFixed(1)}" y2="${cornerY.toFixed(1)}" class="fig-line" stroke-width="2.5"></line>` +
      areaLabel +
      `<circle cx="${cornerX.toFixed(1)}" cy="${cornerY.toFixed(1)}" r="5" class="fig-warn"></circle>` +
      label({ x: (LEFT + RIGHT) / 2, y: BASE + 36, text: "time in seconds", anchor: "middle", size: SIZE.label, class: "text-ink" }) +
      `${label({ x: 16, y: ((TOP + BASE) / 2).toFixed(1), text: 'velocity in m/s', anchor: "middle", size: SIZE.tick, class: "text-ink", rotate: -90 })}`;

    readout.innerHTML =
      `The velocity rises from <strong>0 m/s</strong> to <strong>${fmt(speed)} m/s</strong> in <strong>${fmt(time)} s</strong>. Gradient = ${fmt(speed)} ÷ ${fmt(time)} = <strong>${fmt(acceleration)} m/s²</strong>, so the acceleration is <strong>${fmt(acceleration)} m/s²</strong>. Area = ½ × ${fmt(time)} × ${fmt(speed)} = <strong>${fmt(distance)} m</strong>, so the distance travelled is <strong>${fmt(distance)} m</strong>.`;
  }

  react([speedInput, timeInput], update);
}
