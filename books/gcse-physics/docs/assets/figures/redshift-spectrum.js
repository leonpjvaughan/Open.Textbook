// Tier-1 guided investigation: the red-shift of light from a receding galaxy.
//
// The page asks the reader to predict which way the dark lines move before
// touching the slider, then to test it by changing the speed of the galaxy,
// then to explain why a source moving away gives a longer wavelength. The
// laboratory row is the same light measured at rest; the galaxy row is the same
// pattern, moved towards the red end. Colours come from CSS classes, so the
// figure adapts to dark mode and every bundle, and each row is labelled in words
// as well as by its position.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Two rows of a spectrum with dark lines; the laboratory row is fixed and the galaxy row moves towards longer wavelengths as the galaxy speeds up",
    width: 600,
    height: 220,
    max: 620,
  });

  const speedInput = slider(el, { show: false,
    id: "speed",
    label: "Speed of the galaxy away from us:",
    min: 0,
    max: 100,
    step: 1,
    value: 40,
  });

  const LEFT = 54;
  const RIGHT = 546;
  const WIDTH = RIGHT - LEFT;
  const LINES = [0.08, 0.3, 0.56, 0.78];

  function band(y, height, lines, lineClass) {
    const rect =
      `<rect x="${LEFT}" y="${y}" width="${WIDTH}" height="${height}" ` +
      `class="fig-grid" fill-opacity="0.25" stroke-width="1"></rect>`;
    const marks = lines
      .map((fraction) => {
        const x = LEFT + fraction * WIDTH;
        return (
          `<line x1="${x.toFixed(1)}" y1="${y}" x2="${x.toFixed(1)}" y2="${y + height}" ` +
          `class="${lineClass}" stroke-width="3"></line>`
        );
      })
      .join("");
    return rect + marks;
  }

  function update() {
    const speed = Number(speedInput.value);
    const shift = (speed / 100) * 0.12;
    const galaxyLines = LINES.map((fraction) => fraction + shift);

    const caption = (y, text) =>
      `${label({ x: LEFT, y: y, text: `${text}`, anchor: "start", size: SIZE.heading, class: "text-ink" })}`;

    const reference = band(30, 34, LINES, "fig-ink");
    const galaxy = band(100, 34, galaxyLines, "fig-warn");

    // An arrow on the first line shows the size of the shift.
    const from = LEFT + LINES[0] * WIDTH;
    const to = LEFT + galaxyLines[0] * WIDTH;
    const shiftArrow =
      `<line x1="${from.toFixed(1)}" y1="170" x2="${to.toFixed(1)}" y2="170" ` +
      `class="fig-accent" stroke-width="2"></line>` +
      `<polygon points="${(to - 8).toFixed(1)},166 ${(to - 8).toFixed(1)},174 ${to.toFixed(1)},170" class="fig-accent"></polygon>` +
      `${label({ x: from.toFixed(1), y: 188, text: `the pattern moves this way`, anchor: "start", size: SIZE.value, class: "text-ink" })}`;

    const ends =
      caption(80, "laboratory: the same light at rest") +
      caption(150, "galaxy: the same lines, shifted") +
      `${label({ x: LEFT, y: 212, text: `shorter wavelength (blue end)`, anchor: "start", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: RIGHT, y: 212, text: `longer wavelength (red end)`, anchor: "end", size: SIZE.value, class: "text-ink" })}`;

    svg.innerHTML = reference + galaxy + shiftArrow + ends;

    readout.innerHTML =
      `The dark lines in the galaxy's light sit at <strong>longer wavelengths</strong> than the ` +
      `same lines in the laboratory. With the galaxy moving away at a speed of ` +
      `<strong>${speed}</strong> on this scale, the whole pattern has moved ` +
      `<strong>${(shift * 100).toFixed(1)} per cent</strong> of the strip width towards the red end. ` +
      `<em>A real galaxy's light is a measurement, not a slider. Why does moving away stretch the wavelength?</em>`;
  }

  react(speedInput, update);
}
