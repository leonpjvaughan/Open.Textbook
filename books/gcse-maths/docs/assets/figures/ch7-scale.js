// Guided scale investigation for Chapter 7. Predict → Test → Explain.
//
// The scaffolding — the frame, the two sliders, the live readout, the redraw —
// comes from `kit.js`. The bar is an HTML container rather than an SVG, so the
// kit supplies a frame with no drawing surface and the bar keeps its own
// `role="img"` and name.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { root, readout } = panel(el, { drawing: false, max: 560 });

  const barWrap = document.createElement("div");
  barWrap.className = "fig-grid";
  barWrap.setAttribute("role", "img");
  barWrap.setAttribute(
    "aria-label",
    "Scale bar comparing a drawing length with the real distance it represents",
  );
  barWrap.style.cssText = "height:1rem;border:1px solid currentColor";
  const bar = document.createElement("div");
  bar.className = "bar";
  bar.style.cssText = "height:100%;width:30%;background:var(--tb-fig-accent)";
  barWrap.append(bar);

  const caption = document.createElement("p");
  caption.className = "text-accent";
  caption.textContent = "Drawing distance and real distance keep the same scale ratio.";

  root.append(barWrap, caption);

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
    bar.style.width = `${lv / 8 * 100}%`;
  });
}
