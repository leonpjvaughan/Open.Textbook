// Tier-1 guided investigation: the maxima from a diffraction grating.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. Two sliders set the wavelength of the light and the number of lines
// per millimetre. The figure draws the grating, the straight-through direction
// and the rays to each order, with the order number on an arc. The readout gives
// the slit spacing, the highest order and the angle of each order.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to
// both schemes. No colour literal appears here, and no runtime LaTeX: the
// readout is plain HTML.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A diffraction grating with rays at each order, drawn on an arc",
    width: 600,
    height: 330,
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
  const density = slider(el, { show: false,
    id: "density",
    label: "Grating lines per millimetre",
    min: 100,
    max: 1000,
    step: 50,
    value: 300,
  });

  const GX = 300;
  const GY = 300;
  const RADIUS = 230;
  const LIMIT_DEG = 80;

  function point(angleDeg) {
    const radians = (angleDeg * Math.PI) / 180;
    return {
      x: GX + RADIUS * Math.sin(radians),
      y: GY - RADIUS * Math.cos(radians),
    };
  }

  function update() {
    const lambdaNm = Number(wavelength.value);
    const lines = Number(density.value);

    const lambdaM = lambdaNm * 1e-9;
    const dM = 1 / (lines * 1000);
    const ratio = lambdaM / dM;
    // Orders satisfy d sin(theta) = n lambda, so n lambda <= d. The highest order
    // is therefore the largest whole number n with n * lambdaNm * lines <= 1e6,
    // which is exact integer arithmetic on the slider's own values. Computing
    // floor(1 / ratio) in floating point instead lands a hair below a whole
    // number at the settings whose order sits at 90 degrees.
    const highest = Math.floor(1e6 / (lambdaNm * lines));

    let arcPath = "";
    for (let step = -LIMIT_DEG; step <= LIMIT_DEG; step += 2) {
      const { x, y } = point(step);
      arcPath += `${step === -LIMIT_DEG ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
    }

    const grating =
      `<line x1="${GX - 120}" y1="${GY}" x2="${GX + 120}" y2="${GY}" class="fig-ink" stroke-width="4"></line>` +
      `${label({ x: GX - 124, y: GY + 16, text: `grating`, anchor: "end", size: SIZE.heading, class: "text-ink" })}` +
      `<line x1="${GX}" y1="${GY}" x2="${GX}" y2="${GY - RADIUS}" class="fig-grid" stroke-dasharray="4 4"></line>` +
      `${label({ x: GX + 4, y: GY - RADIUS + 12, text: `n = 0`, anchor: "start", size: SIZE.value, class: "text-ink" })}`;

    const arc = `<path d="${arcPath.trim()}" style="fill:none" class="fig-ink"></path>`;

    let rays = "";
    let count = 0;
    for (let n = -highest; n <= highest; n += 1) {
      const sine = n * ratio;
      if (Math.abs(sine) > Math.sin((LIMIT_DEG * Math.PI) / 180)) {
        continue;
      }
      count += 1;
      const angle = (Math.asin(sine) * 180) / Math.PI;
      const { x, y } = point(angle);
      const cls = n === 0 ? "fig-good" : "fig-accent";
      rays +=
        `<line x1="${GX}" y1="${GY}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" class="${cls}" stroke-width="2"></line>` +
        `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" class="${cls}"></circle>` +
        `${label({ x: (GX + (x - GX) * 1.03).toFixed(1), y: (GY + (y - GY) * 1.03).toFixed(1), text: `${n}`, anchor: "middle", size: SIZE.heading, class: "text-ink" })}`;
    }

    svg.innerHTML = arc + grating + rays;

    const dMicrometres = dM * 1e6;
    const firstAngle = ratio <= 1
      ? `${(Math.asin(ratio) * (180 / Math.PI)).toFixed(1)}&deg;`
      : "impossible, because the sine would be greater than 1";

    readout.innerHTML =
      `Wavelength ${lambdaNm} nm, grating ${lines} lines per millimetre. ` +
      `The slit spacing is <strong>${dMicrometres.toFixed(2)} &micro;m</strong>. ` +
      `The highest order is <strong>${highest}</strong>. ` +
      `${count} ${count === 1 ? "maximum is" : "maxima are"} drawn, within ` +
      `${LIMIT_DEG}&deg; of the straight-through direction. ` +
      `The first-order maximum is at ${firstAngle} from the straight-through direction. ` +
      `<em>Increase the number of lines per millimetre: does the pattern spread out or pack together?</em>`;
  }

  react([wavelength, density], update);
}
