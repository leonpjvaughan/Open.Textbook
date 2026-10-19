// Tier-1 guided investigation: interference from two coherent sources.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. Three sliders set the wavelength, the separation of the two sources
// and the distance to the screen. The figure draws the two sources, the rays
// that reach the first bright fringe, and the bright fringes on the screen. The
// readout gives the fringe spacing and the angles of the maxima.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to
// both schemes. No colour literal appears here, and no runtime LaTeX: the
// readout is plain HTML.
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
      "Two coherent sources, the rays to the first bright fringe, and the bright fringes on a screen",
    width: 600,
    height: 320,
    max: 600,
  });

  const wavelength = slider(el, { show: false,
    id: "wavelength",
    label: "Wavelength (nanometres)",
    min: 400,
    max: 700,
    step: 10,
    value: 600,
  });
  const separation = slider(el, { show: false,
    id: "separation",
    label: "Source separation (millimetres)",
    min: 0.05,
    max: 0.5,
    step: 0.01,
    value: 0.25,
    format: (value) => value.toFixed(2),
  });
  const distance = slider(el, { show: false,
    id: "distance",
    label: "Distance to the screen (metres)",
    min: 0.5,
    max: 3.0,
    step: 0.1,
    value: 2.5,
    format: (value) => value.toFixed(1),
  });

  const SLIT_X = 90;
  const MID_Y = 160;
  const PX_PER_MM = 6;
  const HALF_SCREEN_PX = 140;

  function update() {
    const lambdaNm = Number(wavelength.value);
    const sMm = Number(separation.value);
    const dM = Number(distance.value);

    const lambdaM = lambdaNm * 1e-9;
    const sM = sMm * 1e-3;
    const wMm = (lambdaM * dM) / sM * 1000;
    const screenX = 210 + ((dM - 0.5) / 2.5) * 300;
    const sepPx = 30 + sMm * 180;
    const yTop = MID_Y - sepPx / 2;
    const yBottom = MID_Y + sepPx / 2;

    const frame =
      `<line x1="${SLIT_X}" y1="20" x2="${SLIT_X}" y2="300" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="${screenX}" y1="20" x2="${screenX}" y2="300" class="fig-ink" stroke-width="2"></line>` +
      `${label({ x: SLIT_X - 6, y: 14, text: `two slits`, anchor: "end", size: SIZE.heading, class: "text-ink" })}` +
      `${label({ x: screenX + 6, y: 14, text: `screen`, anchor: "start", size: SIZE.heading, class: "text-ink" })}` +
      `<circle cx="${SLIT_X}" cy="${yTop}" r="4" class="fig-good"></circle>` +
      `<circle cx="${SLIT_X}" cy="${yBottom}" r="4" class="fig-good"></circle>` +
      `<line x1="${SLIT_X + 8}" y1="${yTop}" x2="${SLIT_X + 8}" y2="${yBottom}" class="fig-warn" stroke-width="2"></line>` +
      `${label({ x: SLIT_X + 12, y: (MID_Y).toFixed(1), text: `s`, anchor: "start", size: SIZE.value, class: "text-warn" })}`;

    // The bright fringes: equally spaced bands on the screen, spaced w apart.
    let fringes = "";
    const maxOrder = Math.min(8, Math.floor(HALF_SCREEN_PX / (PX_PER_MM * wMm)));
    for (let n = -maxOrder; n <= maxOrder; n += 1) {
      const y = MID_Y - n * wMm * PX_PER_MM;
      const width = n === 0 ? 5 : 3;
      fringes +=
        `<line x1="${screenX - 14}" y1="${y.toFixed(1)}" x2="${screenX + 14}" y2="${y.toFixed(1)}" ` +
        `class="fig-accent" stroke-width="${width}"></line>`;
    }

    // Rays from each slit to the first-order bright fringe, when it is on screen.
    let rays = "";
    if (maxOrder >= 1) {
      const y1 = MID_Y - wMm * PX_PER_MM;
      rays =
        `<line x1="${SLIT_X}" y1="${yTop}" x2="${screenX - 14}" y2="${y1.toFixed(1)}" class="fig-grid" stroke-dasharray="3 3"></line>` +
        `<line x1="${SLIT_X}" y1="${yBottom}" x2="${screenX - 14}" y2="${y1.toFixed(1)}" class="fig-grid" stroke-dasharray="3 3"></line>` +
        `${label({ x: screenX + 16, y: y1.toFixed(1), text: `n = 1`, anchor: "start", size: SIZE.value, class: "text-ink" })}`;
    }

    const centreLabel =
      `${label({ x: screenX - 6, y: MID_Y + 4, text: `centre`, anchor: "end", size: SIZE.value, class: "text-ink" })}`;

    svg.innerHTML = frame + fringes + rays + centreLabel;

    const firstAngle = Math.asin(Math.min(1, lambdaM / sM)) * (180 / Math.PI);
    const secondRatio = (2 * lambdaM) / sM;
    const angleText = secondRatio <= 1
      ? `The first bright fringe is at ${firstAngle.toFixed(1)}&deg; and the second at ` +
        `${(Math.asin(secondRatio) * (180 / Math.PI)).toFixed(1)}&deg; from the centre. `
      : `The first bright fringe is at ${firstAngle.toFixed(1)}&deg; from the centre. ` +
        `There is no second bright fringe, because it would need a sine greater than 1. `;

    readout.innerHTML =
      `Wavelength ${lambdaNm} nm, source separation ${quantity(sMm, "mm", 2)}, ` +
      `screen ${quantity(dM, "m", 1)} away. The bright fringes are <strong>${quantity(wMm, "mm", 2)}</strong> apart. ` +
      angleText +
      `<em>Move the sources closer together: what happens to the fringe spacing?</em>`;
  }

  react([wavelength, separation, distance], update);
}
