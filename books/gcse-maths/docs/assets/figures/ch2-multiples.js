// Tier-1 guided investigation: multiples and factors on a grid.
// Predict -> Test -> Explain.
//
// The scaffolding — the frame, the slider, the live readout, the redraw — comes
// from `kit.js`. The drawing is the grid itself: an HTML container, not an SVG,
// so the kit supplies a frame with no drawing surface and the grid keeps its own
// `role="img"` and name.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { root, readout } = panel(el, { drawing: false, max: 560 });

  const grid = document.createElement("div");
  grid.className = "grid";
  grid.setAttribute("role", "img");
  grid.setAttribute(
    "aria-label",
    "Number grid from one to sixty with the multiples of one number highlighted",
  );
  grid.style.cssText =
    "display:grid;grid-template-columns:repeat(10,1fr);gap:3px;margin:.6rem 0";
  root.insertBefore(grid, readout);

  const n = slider(el, { show: true,
    id: "n",
    label: "Show multiples of",
    min: 2,
    max: 12,
    value: 3,
  });
  const MAX = 60;

  react(n, () => {
    const value = Number(n.value);
    let count = 0;
    const cells = [];
    for (let v = 1; v <= MAX; v += 1) {
      const isMultiple = v % value === 0;
      if (isMultiple) count += 1;
      cells.push(
        // `.text-accent` sets the text colour; a bare `.fig-accent` sets only
        // fill/stroke, which do nothing to HTML text. Weight is the second
        // signal, so the highlight does not depend on colour alone.
        `<span class="${isMultiple ? "text-accent" : "fig-ink"}" ` +
          `style="text-align:center;padding:3px 0;border-radius:4px;` +
          `${isMultiple ? "font-weight:700;" : ""}">${v}</span>`,
      );
    }
    grid.innerHTML = cells.join("");
    readout.innerHTML =
      `${value} has ${count} multiples up to ${MAX}. ` +
      `<em>Predict: is 42 a multiple of ${value}? Is ${value} a factor of 42?</em>`;
  });
}
