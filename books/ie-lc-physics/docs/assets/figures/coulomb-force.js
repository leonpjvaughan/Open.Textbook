// Tier-1 guided investigation: how the force between two point charges changes
// with the distance between them.
//
// The page asks the reader to predict the force at one separation, then to double
// the separation and explain why the force does not halve. So the figure has to
// make the inverse-square fall visible: the curve is drawn from the law itself,
// and the marker moves along it as the separation changes.
//
// Nothing here carries a colour. The curve, the axes and the marker use the
// fig-* and text-* classes, so the figure follows every bundle and both schemes.
//
// The scaffolding — the panel, its accessible name, the sliders, the readout and
// the redraw — comes from `kit.js`. What is left is the drawing and the sentences.
import {
  fmt,
  label,
  panel,
  quantity,
  react,
  scale,
  slider,
  SIZE,
} from "./kit.js";

// The Coulomb constant, in N m^2 C^-2.
const K = 9.0e9;

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A graph of the force between two equal point charges against the distance between them, with a marker at the chosen distance",
    width: 440,
    height: 280,
  });

  const chargeInput = slider(el, {
    show: true,
    id: "charge",
    label: "Charge on each",
    min: 1,
    max: 3,
    step: 0.5,
    value: 2,
    unit: "\u00b5C",
  });

  const distanceInput = slider(el, {
    show: true,
    id: "distance",
    label: "Separation",
    min: 0.1,
    max: 0.5,
    step: 0.01,
    value: 0.2,
    unit: "m",
  });

  // The plot area, in SVG units.
  const PLOT = { x0: 62, y0: 214, x1: 404, y1: 34 };
  const D_MIN = 0.1;
  const D_MAX = 0.5;
  const F_MAX = 9.0; // newtons, with the largest charge at the closest distance

  const sx = scale({ domain: [D_MIN, D_MAX], range: [PLOT.x0, PLOT.x1] });
  const sy = scale({ domain: [0, F_MAX], range: [PLOT.y0, PLOT.y1] });

  // The force between two equal charges, in newtons.
  const force = (chargeMicro, distance) => {
    const q = chargeMicro * 1e-6;
    return (K * q * q) / (distance * distance);
  };

  function update() {
    const chargeMicro = Number(chargeInput.value);
    const distance = Number(distanceInput.value);
    const f = force(chargeMicro, distance);

    const axes =
      `<line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x1}" y2="${PLOT.y0}" class="fig-grid" stroke-width="1.5"></line>` +
      `<line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x0}" y2="${PLOT.y1}" class="fig-grid" stroke-width="1.5"></line>` +
      label({ x: PLOT.x0 - 8, y: PLOT.y0 + 4, text: "0", anchor: "end", size: SIZE.tick }) +
      label({ x: PLOT.x1, y: PLOT.y0 + 22, text: "separation / m", anchor: "end", size: SIZE.tick }) +
      label({ x: PLOT.x0 - 8, y: PLOT.y1 - 2, text: "force / N", anchor: "end", size: SIZE.tick });

    // The two charges, drawn above the graph, to fix what the curve describes.
    const chargeY = 18;
    const charges =
      `<circle cx="${PLOT.x0 + 28}" cy="${chargeY}" r="6" class="fig-ink"></circle>` +
      `<circle cx="${PLOT.x0 + 66}" cy="${chargeY}" r="6" class="fig-ink"></circle>` +
      label({ x: PLOT.x0 + 28, y: chargeY - 12, text: "+q", size: SIZE.tick }) +
      label({ x: PLOT.x0 + 66, y: chargeY - 12, text: "+q", size: SIZE.tick });

    // The curve, sampled because the law is not a straight line.
    let curve = "";
    const steps = 90;
    for (let i = 0; i < steps; i += 1) {
      const d1 = D_MIN + ((D_MAX - D_MIN) * i) / steps;
      const d2 = D_MIN + ((D_MAX - D_MIN) * (i + 1)) / steps;
      curve +=
        `<line x1="${sx(d1).toFixed(1)}" y1="${sy(Math.min(force(chargeMicro, d1), F_MAX)).toFixed(1)}" ` +
        `x2="${sx(d2).toFixed(1)}" y2="${sy(Math.min(force(chargeMicro, d2), F_MAX)).toFixed(1)}" ` +
        `class="fig-accent" stroke-width="2.5"></line>`;
    }

    const marker = `<circle cx="${sx(distance)}" cy="${sy(Math.min(f, F_MAX))}" r="5.5" class="fig-warn"></circle>`;

    svg.innerHTML = `${axes}${charges}${curve}${marker}`;

    readout.textContent = `F = ${quantity(f, f < 1 ? 3 : 2, "N")} when the charges are ${fmt(
      chargeMicro,
      1,
    )} \u00b5C each and ${quantity(distance, "m", 2)} apart. Doubling the separation divides the force by four.`;
  }

  react([chargeInput, distanceInput], update);
}
