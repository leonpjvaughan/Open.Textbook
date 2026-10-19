// Tier-1 guided investigation: what a scale reads inside an accelerating lift.
//
// The page asks the reader to predict the reading at zero acceleration, then to move
// the slider either way and explain why the reading is not the weight. So the figure
// draws the reading against the acceleration, which makes the straight line, the
// intercept and the point where the reading falls to zero all visible at once.
//
// Nothing here carries a colour. The line and the intercept use different classes,
// and every point is named in the readout, so the figure works without colour.
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

const MASS = 60; // kg, the passenger
const G = 9.8; // N/kg

// The scale reading for an acceleration `a`, upwards positive.
const reading = (a) => MASS * (G + a);

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A graph of the scale reading against the acceleration of the lift, for a 60 kg passenger",
    width: 480,
    height: 320,
  });

  const accelInput = slider(el, {
    show: false,
    id: "accel",
    label: "Acceleration of the lift",
    name: "Acceleration of the lift, upwards positive",
    min: -9.8,
    max: 4,
    step: 0.2,
    value: 0,
    unit: "m/s²",
  });

  // The plot area, in SVG units.
  const x0 = 64;
  const x1 = 448;
  const y0 = 268;
  const y1 = 44;

  const sx = scale({ domain: [-10, 4.5], range: [x0, x1] });
  const sy = scale({ domain: [0, 850], range: [y0, y1] });

  // The line N = m(g + a) runs from the point where the reading is zero to the
  // largest acceleration the slider reaches.
  const A_MIN = -G; // the reading is zero here: free fall
  const A_MAX = 4;
  const line = `<line x1="${sx(A_MIN).toFixed(1)}" y1="${sy(0).toFixed(1)}" x2="${sx(A_MAX).toFixed(1)}" y2="${sy(reading(A_MAX)).toFixed(1)}" class="fig-accent" stroke-width="2.5"></line>`;

  const axes =
    `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" class="fig-grid" stroke-width="1.5"></line>` +
    `<line x1="${sx(0).toFixed(1)}" y1="${y0}" x2="${sx(0).toFixed(1)}" y2="${y1}" class="fig-grid" stroke-width="1" stroke-dasharray="3 4"></line>` +
    label({ x: (x0 + x1) / 2, y: y0 + 34, text: "acceleration / m/s²", size: SIZE.tick }) +
    label({ x: x1, y: y1 - 6, text: "reading / N", anchor: "end", size: SIZE.tick }) +
    label({ x: sx(0), y: y0 + 18, text: "0", size: SIZE.tick }) +
    label({ x: sx(A_MIN), y: y0 + 18, text: "−9.8", size: SIZE.tick }) +
    label({ x: sx(A_MAX), y: y0 + 18, text: "4.0", anchor: "end", size: SIZE.tick });

  // The weight is the intercept: the reading when the lift is not accelerating.
  const intercept =
    `<circle cx="${sx(0).toFixed(1)}" cy="${sy(MASS * G).toFixed(1)}" r="4.5" class="fig-good"></circle>` +
    label({ x: sx(0) + 8, y: sy(MASS * G) - 8, text: `weight ${quantity(MASS * G, "N")}`, anchor: "start", size: SIZE.tick });

  function draw() {
    const a = Number(accelInput.value);
    const n = reading(a);
    const marker = `<circle cx="${sx(a).toFixed(1)}" cy="${sy(n).toFixed(1)}" r="6" class="fig-warn"></circle>`;
    svg.innerHTML = `${axes}${line}${intercept}${marker}`;

    const weight = MASS * G;
    const difference = n - weight;
    if (a <= -G + 0.001) {
      readout.textContent =
        `a = ${quantity(a, "m", 1)}/s². The lift is in free fall, so the scale reads 0 N. The passenger and the scale fall together.`;
    } else if (Math.abs(difference) < 0.001) {
      readout.textContent = `a = 0 m/s². The scale reads ${quantity(n, "N")}, which is exactly her weight.`;
    } else {
      const way = difference > 0 ? "more" : "less";
      readout.textContent =
        `a = ${quantity(a, "m", 1)}/s². The scale reads ${quantity(n, "N")}, which is ${quantity(Math.abs(difference), "N")} ` +
        `${way} than her weight of ${quantity(weight, "N")}. The contact force is not the weight.`;
    }
  }

  react([accelInput], draw);
}
