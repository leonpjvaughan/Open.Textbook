// Tier-1 guided investigation: the laws of indices.
// Predict -> Test -> Explain.
//
// The scaffolding — the frame, the prompt, the three sliders, the live readout,
// the redraw — comes from `kit.js`. This module draws nothing: its result is an
// equation, not an image, so it asks the kit for a frame with no drawing surface
// and has no drawing to name.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { readout } = panel(el, {
    drawing: false,
    prompt: "Change the base, m and n, then compare the two powers.",
    max: 560,
  });

  const a = slider(el, { id: "a", label: "base", min: 2, max: 5, value: 2, show: false });
  const m = slider(el, { id: "m", label: "m", min: 1, max: 5, value: 3, show: false });
  const n = slider(el, { id: "n", label: "n", min: 1, max: 5, value: 2, show: false });

  // Plain HTML, not LaTeX: the maths hook runs at build time, so anything this
  // module injects at runtime must be written in HTML to render.
  const power = (base, index) => `${base}<sup>${index}</sup>`;

  react([a, m, n], () => {
    const av = Number(a.value);
    const mv = Number(m.value);
    const nv = Number(n.value);
    const product = av ** mv * av ** nv;
    const sum = av ** (mv + nv);
    const quotient = av ** mv / av ** nv;
    readout.innerHTML =
      `a = ${av}, m = ${mv}, n = ${nv}. ` +
      `Multiplying: ${power(av, mv)} × ${power(av, nv)} = ${power(av, mv + nv)} = ${product} ` +
      `(the same as ${sum}). ` +
      `Dividing: ${power(av, mv)} ÷ ${power(av, nv)} = ${power(av, mv - nv)}` +
      (mv >= nv ? ` = ${Number.isInteger(quotient) ? quotient : quotient.toFixed(4)}. ` : " (a fraction). ") +
      `<em>Predict: what is ${power(av, mv + nv)} without multiplying it out? Why do the indices add?</em>`;
  });
}
