// Guided sequence investigation: predict how the multiplier changes later terms.
//
// The scaffolding — the slider, the live readout, the redraw — comes from
// `kit.js`. This module draws nothing: its terms are a list, not an image, so it
// asks the kit for a frame with no drawing surface, and has no drawing to name.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { root, readout } = panel(el, { drawing: false, max: 520 });

  const list = document.createElement("ol");
  list.className = "terms";

  const caption = document.createElement("p");
  caption.className = "text-accent";
  caption.textContent = "Start at 2, then multiply by the same number.";

  root.append(list, caption);

  const factor = slider(el, {
    id: "factor",
    label: "Multiplier",
    min: 0.5,
    max: 2,
    step: 0.1,
    value: 1.5,
  });

  react(factor, () => {
    const ratio = Number(factor.value);
    let term = 2;
    list.innerHTML = "";
    for (let n = 1; n <= 5; n += 1) {
      const item = document.createElement("li");
      item.className = n === 5 ? "text-good" : "text-ink";
      item.style.fontWeight = n === 5 ? "700" : "";
      item.textContent = `Term ${n}: ${Number(term.toFixed(4))}`;
      list.append(item);
      term *= ratio;
    }
    readout.textContent = `Common multiplier: ${ratio}`;
  });
}
