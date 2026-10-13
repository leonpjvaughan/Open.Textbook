// Tier-1 guided investigation: the ideal gas model.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. Two sliders set the temperature and the volume of a fixed number of
// gas molecules. The readout gives the pressure, the average molecular kinetic
// energy and the rms speed. The dots are representative molecules: their small
// arrows grow with the rms speed, and the box narrows as the volume falls.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to
// both schemes. No colour literal appears here, and no runtime LaTeX: the readout
// is plain HTML.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A box of gas molecules with a piston, showing how temperature and volume change the pressure",
    width: 640,
    height: 280,
    max: 640,
  });

  const temp = slider(el, { show: false,
    id: "temp",
    label: "Temperature (K)",
    min: 100,
    max: 600,
    step: 10,
    value: 300,
  });
  const vol = slider(el, { show: false,
    id: "vol",
    label: "Volume (10^-3 m^3)",
    min: 1.0,
    max: 4.0,
    step: 0.1,
    value: 2.0,
    format: (value) => value.toFixed(1),
  });

  const BOLTZMANN = 1.38e-23;
  const MOLECULE_MASS = 4.8e-26;
  const MOLECULES = 1.0e23;
  const DOTS = 56;

  const BOX_TOP = 40;
  const BOX_BOTTOM = 210;
  const BOX_LEFT = 60;

  // A deterministic scatter, so the picture does not jump when a slider moves.
  function hash(index) {
    const value = Math.sin(index * 12.9898) * 43758.5453;
    return value - Math.floor(value);
  }

  function update() {
    const temperature = Number(temp.value);
    const volume = Number(vol.value) * 1e-3;

    const pressure = (MOLECULES * BOLTZMANN * temperature) / volume;
    const kineticEnergy = 1.5 * BOLTZMANN * temperature;
    const rmsSpeed = Math.sqrt((3 * BOLTZMANN * temperature) / MOLECULE_MASS);

    // The drawn width is proportional to the volume, so the box narrows on
    // compression. The height is fixed.
    const width = 70 + ((volume / 1e-3 - 1.0) / 3.0) * 330;
    const boxRight = BOX_LEFT + width;

    let dots = "";
    for (let index = 0; index < DOTS; index += 1) {
      const px = BOX_LEFT + 14 + hash(index) * (width - 28);
      const py = BOX_TOP + 14 + hash(index + 100) * (BOX_BOTTOM - BOX_TOP - 28);
      const angle = hash(index + 200) * 2 * Math.PI;
      const reach = 4 + (rmsSpeed / 720) * 10;
      const dx = Math.cos(angle) * reach;
      const dy = Math.sin(angle) * reach;
      dots += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="2.6" class="fig-accent"></circle>`;
      dots += `<line x1="${px.toFixed(1)}" y1="${py.toFixed(1)}" x2="${(px + dx).toFixed(1)}" y2="${(py + dy).toFixed(1)}" class="fig-warn" stroke-width="1.4"></line>`;
    }

    const frame =
      `<rect x="${BOX_LEFT}" y="${BOX_TOP}" width="${width.toFixed(1)}" height="${BOX_BOTTOM - BOX_TOP}" fill="none" class="fig-ink" stroke-width="3"></rect>` +
      `<line x1="${boxRight}" y1="${BOX_TOP}" x2="${boxRight}" y2="${BOX_BOTTOM}" class="fig-ink" stroke-width="6"></line>` +
      `<text x="${(BOX_LEFT + boxRight) / 2}" y="${BOX_BOTTOM + 26}" font-size="20" class="fig-ink" text-anchor="middle">volume</text>` +
      `<text x="${(boxRight + 6).toFixed(1)}" y="${BOX_TOP - 8}" font-size="18" class="fig-ink">piston</text>`;

    svg.innerHTML = frame + dots;

    readout.innerHTML =
      `At <strong>${temperature} K</strong> and a volume of <strong>${(volume / 1e-3).toFixed(1)} x 10^-3 m^3</strong>, ` +
      `the pressure is <strong>${(pressure / 1000).toFixed(1)} kPa</strong>, ` +
      `the average molecular kinetic energy is <strong>${kineticEnergy.toExponential(2)} J</strong>, ` +
      `and the rms speed is <strong>${rmsSpeed.toFixed(0)} m/s</strong>. ` +
      `<em>Double the temperature. What happens to the pressure, and what happens to the volume?</em>`;
  }

  react([temp, vol], update);
}
