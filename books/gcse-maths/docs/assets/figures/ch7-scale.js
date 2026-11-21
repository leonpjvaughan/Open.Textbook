// Guided scale investigation for Chapter 7. Predict → Test → Explain.
//
// The scaffolding — the frame, the two sliders, the live readout, the redraw —
// comes from `kit.js`. The bar is a painted SVG rectangle in a `fig-*` class, so
// its colour follows the reader's scheme.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const WIDTH = 560;
  const HEIGHT = 48;

  const { svg, readout, caption } = panel(el, {
    drawing: true,
    label:
      "Scale bar comparing a drawing length with the real distance it represents",
    width: WIDTH,
    height: HEIGHT,
    max: 560,
  });

  caption.className = "fig-caption text-accent";
  caption.textContent = "Drawing distance and real distance keep the same scale ratio.";

  const length = slider(el, {
    id: "length",
    label: "Drawing length:",
    min: 1,
    max: 8,
    step: 0.5,
    value: 3,
    show: false,
  });
  const scale = slider(el, {
    id: "scale",
    label: "Scale denominator:",
    min: 10000,
    max: 50000,
    step: 10000,
    value: 25000,
    show: false,
  });

  react([length, scale], () => {
    const lv = Number(length.value);
    const sv = Number(scale.value);
    const metres = lv * sv / 100;
    readout.innerHTML = `<strong class="fig-good">${lv} cm</strong> on a 1:${sv.toLocaleString('en-GB')} map represents <strong>${metres.toLocaleString('en-GB')} m</strong>.`;
    const drawn = (lv / 8) * (WIDTH - 2);
    svg.innerHTML =
      `<rect class="fig-grid" x="0.5" y="0.5" width="${WIDTH - 1}" height="${HEIGHT - 1}"></rect>` +
      `<rect class="fig-accent" x="1" y="1" width="${drawn.toFixed(2)}" height="${HEIGHT - 2}"></rect>`;
    svg.setAttribute(
      "aria-label",
      `Scale bar showing ${lv} cm for a real distance of ${metres.toLocaleString('en-GB')} m`,
    );
  });
}
