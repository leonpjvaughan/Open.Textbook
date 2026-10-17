// Tier-1 guided investigation: the wave equation.
//
// Guided, not a sandbox: the page asks the reader to predict what doubling the
// frequency does to the wavelength when the speed is fixed, then to explain it
// from v = f lambda. The reader sets the frequency and the wave speed; the
// figure draws a snapshot of the wave with one wavelength marked and reports
// the period.
// Colours come from CSS classes so the figure adapts to dark mode.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A snapshot of a transverse wave. One wavelength is marked with an arrow, and the frequency and wave speed can be changed",
    width: 560,
    height: 220,
  });

  const frequencyInput = slider(el, { show: false,
    id: "frequency",
    label: "Frequency (Hz)",
    min: 1,
    max: 4,
    step: 0.5,
    value: 2,
  });
  const speedInput = slider(el, { show: false,
    id: "speed",
    label: "Wave speed (m/s)",
    min: 2,
    max: 8,
    step: 1,
    value: 4,
  });

  const LEFT = 40;
  const WIDTH = 480;
  const AXIS = 130;
  const AMPLITUDE = 55;
  const WINDOW = 8.0; // metres of distance shown across the drawing
  const PIXELS_PER_METRE = WIDTH / WINDOW;

  function update() {
    const frequency = Number(frequencyInput.value);
    const speed = Number(speedInput.value);
    const wavelength = speed / frequency;
    const period = 1 / frequency;

    const wavePoints = [];
    for (let x = 0; x <= WINDOW; x += WINDOW / 240) {
      const y =
        AXIS - AMPLITUDE * Math.sin((2 * Math.PI * x) / wavelength);
      wavePoints.push(`${(LEFT + x * PIXELS_PER_METRE).toFixed(1)},${y.toFixed(1)}`);
    }

    // One wavelength, from the first crest to the next, drawn as a marker.
    const firstCrest = wavelength / 4;
    const secondCrest = firstCrest + wavelength;
    const marker =
      secondCrest <= WINDOW
        ? `<line x1="${(LEFT + firstCrest * PIXELS_PER_METRE).toFixed(1)}" y1="40" x2="${(LEFT + secondCrest * PIXELS_PER_METRE).toFixed(1)}" y2="40" class="fig-warn" stroke-width="2"></line><line x1="${(LEFT + firstCrest * PIXELS_PER_METRE).toFixed(1)}" y1="34" x2="${(LEFT + firstCrest * PIXELS_PER_METRE).toFixed(1)}" y2="46" class="fig-warn" stroke-width="2"></line><line x1="${(LEFT + secondCrest * PIXELS_PER_METRE).toFixed(1)}" y1="34" x2="${(LEFT + secondCrest * PIXELS_PER_METRE).toFixed(1)}" y2="46" class="fig-warn" stroke-width="2"></line>${label({ x: (LEFT + ((firstCrest + secondCrest) / 2) * PIXELS_PER_METRE).toFixed(1), y: 30, text: `one wavelength = ${wavelength.toFixed(2)} m`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}`
        : `${label({ x: (LEFT + WIDTH / 2).toFixed(1), y: 30, text: `one wavelength is wider than the drawing`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}`;

    const axes =
      `<line x1="${LEFT}" y1="${AXIS}" x2="${LEFT + WIDTH}" y2="${AXIS}" class="fig-ink" stroke-width="2"></line><line x1="${LEFT}" y1="50" x2="${LEFT}" y2="200" class="fig-ink" stroke-width="2"></line>${label({ x: LEFT + WIDTH / 2, y: 215, text: `distance (m)`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}${label({ x: 14, y: AXIS, text: 'displacement', anchor: "start", size: SIZE.tick, class: "text-ink", rotate: -90 })}`;

    svg.innerHTML =
      axes +
      `<polyline points="${wavePoints.join(" ")}" class="fig-accent" fill="none" stroke-width="3"></polyline>` +
      marker;

    readout.innerHTML =
      `Frequency <strong>${frequency.toFixed(1)} Hz</strong>, wave speed <strong>${speed.toFixed(1)} m/s</strong>. The wavelength is <strong>${wavelength.toFixed(2)} m</strong> and the period is <strong>${period.toFixed(2)} s</strong>. <em>Now double the frequency to ${Math.min(frequency * 2, 4).toFixed(1)} Hz. What happens to the wavelength?</em>`;
  }

  react([frequencyInput, speedInput], update);
}
