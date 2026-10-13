// Guided model: a fraction strip with an adjustable number of equal parts.
// The reader predicts a matching numerator before using the controls.
//
// The scaffolding — the frame, the prompt, the slider, the live readout, the
// redraw — comes from `kit.js`. The strip is an HTML container rather than an
// SVG, so the kit supplies a frame with no drawing surface and the strip keeps
// its own `role="img"` and name.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { root, readout } = panel(el, {
    drawing: false,
    prompt: "Fraction strip: compare two equivalent amounts.",
    max: 560,
  });
  readout.classList.add("text-ink");

  const strip = document.createElement("div");
  strip.className = "strip";
  strip.setAttribute("role", "img");
  strip.setAttribute(
    "aria-label",
    "Strip divided into equal parts; shaded parts show two thirds",
  );
  root.insertBefore(strip, readout);

  const parts = slider(el, {
    id: "parts",
    label: "Number of parts:",
    min: 3,
    max: 15,
    value: 6,
    show: false,
  });

  react(parts, () => {
    const n = Number(parts.value);
    const shaded = 2 * n / 3;
    const whole = Math.floor(shaded);
    const partial = shaded - whole;
    const cells = [];
    for (let i = 0; i < n; i++) {
      // A `fig-*` class only sets `fill`/`stroke`, which paint nothing on an HTML
      // box, so each cell takes its background from the same token.
      const counted = i < whole;
      const part = i === whole && partial > 0;
      const background = counted ? "var(--tb-fig-accent)"
        : part ? "var(--tb-fig-warn)"
        : "color-mix(in srgb, var(--tb-ink) 12%, transparent)";
      const opacity = part ? String(partial) : "1";
      cells.push(`<span style="display:block;height:2rem;opacity:${opacity};border:1px solid currentColor;background:${background}"></span>`);
    }
    strip.style.display = "grid";
    strip.style.gridTemplateColumns = `repeat(${n}, minmax(0,1fr))`;
    strip.innerHTML = cells.join("");
    readout.textContent = `${n} equal parts: two thirds corresponds to ${Number(shaded.toFixed(2))} parts.`;
  });
}
