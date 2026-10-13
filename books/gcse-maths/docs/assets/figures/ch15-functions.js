// Guided investigation: predict how two linear functions compose, then test.
//
// The scaffolding — the frame, the prompt, the two sliders, the live readout, the
// redraw — comes from `kit.js`. This module draws nothing: it is a rule and a
// sentence, so it asks the kit for a frame with no drawing surface, and has no
// drawing to name.
import { panel, slider, react } from "./kit.js";

// A signed term, so the rule reads `2x + 3` and `2x - 5`, never `2x + (-5)`.
function signed(value) {
  return value < 0 ? `- ${Math.abs(value)}` : `+ ${value}`;
}

export function mount(el) {
  const { readout } = panel(el, {
    drawing: false,
    prompt: "Adjust a and b in f(x) = ax + b.",
    max: 520,
  });
  readout.classList.add("text-accent");

  const a = slider(el, {
    id: "a",
    label: "a",
    min: 1,
    max: 5,
    step: 1,
    value: 2,
  });
  const b = slider(el, {
    id: "b",
    label: "b",
    min: -5,
    max: 5,
    step: 1,
    value: 3,
  });

  const update = () => {
    const av = Number(a.value);
    const bv = Number(b.value);
    readout.textContent =
      `For f(x) = ${av}x ${signed(bv)}, the inverse rule is ` +
      `f⁻¹(x) = (x ${signed(-bv)}) / ${av}.`;
  };
  react([a, b], update);
}
