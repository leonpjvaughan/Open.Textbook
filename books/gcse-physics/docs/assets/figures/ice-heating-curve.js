// Tier-1 guided investigation: a heating curve for water.
//
// Guided, not a sandbox: the page asks the reader to predict how many flat
// parts the graph will have and what a higher heater power does to them. The
// reader sets the power; the figure draws temperature against time for 1.0 kg of
// ice, from -20 degrees Celsius to steam, and reads out the energy and the time
// for each stage.
//
// Colours come from CSS classes, so the figure adapts to every bundle and both
// schemes. No maths is injected at runtime: every value is plain text.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. The two preset buttons are not
// one of the kit's controls, so they are built here inside the kit's control
// column. What is left is the drawing and the sentence, which are the parts that
// differ from every other figure.
import {
  label,
  panel,
  quantity,
  react,
  slider,
  SIZE,
} from "./kit.js";

export function mount(el) {
  const { svg, readout, controls } = panel(el, {
    label:
      "A heating graph of temperature against time for water, with two sloped parts and two flat parts where the substance changes state",
    width: 600,
    height: 230,
    max: 600,
  });

  const powerSlider = slider(el, { show: false,
    id: "power",
    label: "Heater power (W)",
    min: 200,
    max: 2000,
    step: 50,
    value: 500,
    show: false,
  });

  // The presets sit in the same control column the kit's slider uses.
  const presets = document.createElement("div");
  presets.style.cssText = "display:flex;gap:.5rem;flex-wrap:wrap";
  const preset = (id, text) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = id;
    button.textContent = text;
    presets.append(button);
    return button;
  };
  const lowButton = preset("preset-low", "Low power (200 W)");
  const highButton = preset("preset-high", "High power (2000 W)");
  controls.append(presets);

  // 1.0 kg of water, in four stages. The energies in joules are fixed.
  const STAGES = [
    { label: "ice warms", energy: 1.0 * 2100 * 20, from: -20, to: 0 },
    { label: "ice melts", energy: 1.0 * 3.3e5, from: 0, to: 0 },
    { label: "water warms", energy: 1.0 * 4200 * 100, from: 0, to: 100 },
    { label: "water boils", energy: 1.0 * 2.3e6, from: 100, to: 100 },
  ];
  const TOTAL_ENERGY = STAGES.reduce((sum, s) => sum + s.energy, 0);
  const TIME_MAX = 16000;

  const xPixel = (t) => 70 + (t / TIME_MAX) * 470;
  const yPixel = (temp) => 200 - ((temp + 40) / 180) * 160;

  function energyText(joules) {
    if (joules >= 1e6) return `${(joules / 1e6).toFixed(2)} MJ`;
    return `${Math.round(joules / 1e3)} kJ`;
  }

  function timeText(seconds) {
    if (seconds >= 120) return `${(seconds / 60).toFixed(1)} min`;
    return `${quantity(seconds, "s", 0)}`;
  }

  function update() {
    const power = Number(powerSlider.value);

    let time = 0;
    const points = [];
    const summary = [];
    points.push([0, STAGES[0].from]);
    STAGES.forEach((stage) => {
      const duration = stage.energy / power;
      time += duration;
      points.push([time, stage.to]);
      summary.push(
        `${stage.label}: ${energyText(stage.energy)} in ${timeText(duration)}`,
      );
    });

    const line = points
      .map(([t, temp], i) => `${i === 0 ? "M" : "L"} ${xPixel(t).toFixed(1)} ${yPixel(temp).toFixed(1)}`)
      .join(" ");

    svg.innerHTML =
      `<line x1="70" y1="200" x2="555" y2="200" class="fig-ink" stroke-width="2"></line><line x1="70" y1="200" x2="70" y2="20" class="fig-ink" stroke-width="2"></line><line x1="70" y1="${yPixel(0).toFixed(1)}" x2="555" y2="${yPixel(0).toFixed(1)}" class="fig-grid" stroke-dasharray="4 4"></line><line x1="70" y1="${yPixel(100).toFixed(1)}" x2="555" y2="${yPixel(100).toFixed(1)}" class="fig-grid" stroke-dasharray="4 4"></line>${label({ x: 10, y: yPixel(0).toFixed(1), text: `0`, anchor: "start", size: SIZE.value, class: "text-ink" })}${label({ x: 4, y: yPixel(100).toFixed(1), text: `100`, anchor: "start", size: SIZE.value, class: "text-ink" })}${label({ x: 300, y: 222, text: `time (s)`, anchor: "middle", size: SIZE.heading, class: "text-ink" })}${label({ x: 14, y: 110, text: 'temperature (C)', anchor: "start", size: SIZE.value, class: "text-ink", rotate: -90 })}<path d="${line}" class="fig-accent" style="fill:none" stroke-width="3"></path>${label({ x: 150, y: (yPixel(0) - 8).toFixed(1), text: `melting`, anchor: "start", size: SIZE.value, class: "text-ink" })}${label({ x: 300, y: (yPixel(100) - 8).toFixed(1), text: `boiling`, anchor: "start", size: SIZE.value, class: "text-ink" })}`;

    readout.innerHTML =
      `Heater power <strong>${power} W</strong>. Total energy <strong>${energyText(TOTAL_ENERGY)}</strong> in <strong>${timeText(TOTAL_ENERGY / power)}</strong>. <em>${summary.join(". ")}. Compare a low power with a high power: what changes, and what stays the same?</em>`;
  }

  // Setting a slider's value in script does not fire `input`, so dispatching it
  // redraws through the kit's own listener.
  const apply = (power) => {
    powerSlider.value = String(power);
    powerSlider.dispatchEvent(new Event("input"));
  };

  lowButton.addEventListener("click", () => apply(200));
  highButton.addEventListener("click", () => apply(2000));

  react(powerSlider, update);
}
