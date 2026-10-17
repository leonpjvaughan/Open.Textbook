// Tier-1 guided investigation: the radiation emitted by a hot object.
//
// Guided, not a sandbox: the page asks the reader to predict which way the peak
// moves before changing the temperature, then to explain why the Sun emits
// visible light while the Earth emits infrared. The curve is drawn from the
// Planck shape so the peak moves correctly; the page does not ask the reader to
// calculate it. The vertical axis is an arbitrary intensity scale, and the
// curve's height rises with temperature to show that a hotter object emits more.
// Colours come from CSS classes so the figure adapts to dark mode and every
// bundle; the peak and the visible band are also labelled.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const H = 6.626e-34;
  const C = 3.0e8;
  const K = 1.381e-23;
  const MIN_WAVELENGTH = 1e-7; // 0.1 micrometres
  const MAX_WAVELENGTH = 4e-6; // 4 micrometres
  const LEFT = 60;
  const RIGHT = 580;
  const BASE = 240;
  const TOP = 30;

  const { svg, readout } = panel(el, {
    label:
      "A curve of emitted intensity against wavelength for a hot object, with a peak that moves to shorter wavelengths as the temperature rises",
    width: 620,
    height: 280,
    max: 620,
  });

  const temperatureInput = slider(el, { show: false,
    id: "temperature",
    label: "Temperature",
    min: 1000,
    max: 6000,
    step: 100,
    value: 3000,
  });

  function intensity(wavelength, temperature) {
    const x = (H * C) / (wavelength * K * temperature);
    if (x > 700) return 0;
    return 1 / (Math.pow(wavelength, 5) * (Math.exp(x) - 1));
  }

  function xFor(wavelength) {
    const fraction = (wavelength - MIN_WAVELENGTH) / (MAX_WAVELENGTH - MIN_WAVELENGTH);
    return LEFT + fraction * (RIGHT - LEFT);
  }

  function update() {
    const temperature = Number(temperatureInput.value);
    const samples = [];
    let peak = 0;
    const steps = 240;
    for (let i = 0; i <= steps; i += 1) {
      const wavelength =
        MIN_WAVELENGTH + (i / steps) * (MAX_WAVELENGTH - MIN_WAVELENGTH);
      const value = intensity(wavelength, temperature);
      samples.push({ wavelength, value });
      if (value > peak) peak = value;
    }

    // The peak is always the full height of the plot; the whole curve is scaled
    // up as the temperature rises, because a hotter object emits more.
    const amplitude = (BASE - TOP) * (0.35 + 0.65 * (temperature / 6000));
    const points = samples
      .map((sample) => {
        const y = BASE - (sample.value / peak) * amplitude;
        return `${xFor(sample.wavelength).toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

    const peakWavelength = 2.9e-3 / temperature;
    const peakX = xFor(Math.min(Math.max(peakWavelength, MIN_WAVELENGTH), MAX_WAVELENGTH));
    const visibleLeft = xFor(4.0e-7);
    const visibleRight = xFor(7.0e-7);

    svg.innerHTML =
      // Axes.
      `<line x1="${LEFT}" y1="${BASE}" x2="${RIGHT}" y2="${BASE}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${BASE}" x2="${LEFT}" y2="${TOP}" class="fig-ink"></line>` +
      `${label({ x: LEFT - 10, y: TOP + 8, text: `intensity`, anchor: "end", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: RIGHT, y: BASE + 34, text: `wavelength / micrometres`, anchor: "end", size: SIZE.value, class: "text-ink" })}` +
      // The visible band.
      `<rect x="${visibleLeft}" y="${TOP}" width="${(visibleRight - visibleLeft).toFixed(1)}" ` +
      `height="${BASE - TOP}" class="fig-grid"></rect>` +
      `${label({ x: ((visibleLeft + visibleRight) / 2).toFixed(1), y: TOP + 14, text: `visible`, anchor: "middle", size: SIZE.value, class: "text-ink" })}` +
      // X ticks.
      [0, 1, 2, 3, 4].map((mark) => {
        const x = xFor(mark === 0 ? MIN_WAVELENGTH : mark * 1e-6);
        return (
          `<line x1="${x.toFixed(1)}" y1="${BASE}" x2="${x.toFixed(1)}" y2="${BASE + 5}" ` +
          `class="fig-ink"></line>` +
          `${label({ x: x.toFixed(1), y: BASE + 18, text: `${mark}`, anchor: "middle", size: SIZE.value, class: "text-ink" })}`
        );
      }).join("") +
      // The curve and the peak marker.
      `<polyline points="${points}" class="fig-accent" stroke-width="2" ` +
      `style="fill:none"></polyline>` +
      `<line x1="${peakX.toFixed(1)}" y1="${TOP}" x2="${peakX.toFixed(1)}" y2="${BASE}" ` +
      `class="fig-warn" stroke-dasharray="4 4"></line>` +
      `${label({ x: peakX.toFixed(1), y: TOP - 6, text: `peak`, anchor: "middle", size: SIZE.value, class: "text-ink" })}`;

    const peakText =
      peakWavelength >= 1e-6
        ? `${(peakWavelength * 1e6).toFixed(1)} micrometres`
        : `${Math.round(peakWavelength * 1e9)} nm`;
    readout.innerHTML =
      `Temperature <strong>${temperature} K</strong>. The most intense radiation ` +
      `has a wavelength of about <strong>${peakText}</strong>. ` +
      `<em>As the temperature rises, does the peak move to shorter or longer ` +
      `wavelengths?</em>`;
  }

  react(temperatureInput, update);
}
