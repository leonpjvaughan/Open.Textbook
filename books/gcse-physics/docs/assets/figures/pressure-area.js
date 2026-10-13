// Tier-1 guided investigation: pressure, force and area.
//
// Guided, not a sandbox: the page asks the reader to predict the effect of
// halving the area before moving the sliders, then to explain why a sharp point
// cuts better than a blunt one. The reader sets the force and the contact area;
// the figure shows the pressure in pascals.
// Colours come from CSS classes so the figure adapts to dark mode.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentence, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A block pressing on the ground, with a contact area that widens or narrows as the area changes",
    width: 560,
    height: 170,
  });

  const forceInput = slider(el, { show: false,
    id: "force",
    label: "Force (N)",
    min: 100,
    max: 1000,
    step: 50,
    value: 400,
    show: false,
  });
  const areaInput = slider(el, { show: false,
    id: "area",
    label: "Area (m²)",
    min: 0.05,
    max: 0.5,
    step: 0.05,
    value: 0.2,
    show: false,
  });

  const CENTRE = 280;
  const GROUND = 120;

  function update() {
    const force = Number(forceInput.value);
    const area = Number(areaInput.value);
    const pressure = force / area;

    // The block is drawn wider for a larger contact area, so the reader can see
    // the same force spread over more or less ground.
    const width = 70 + (area / 0.5) * 240;
    const halfWidth = width / 2;

    const arrows = [0.25, 0.5, 0.75]
      .map((fraction) => {
        const x = CENTRE - halfWidth + width * fraction;
        return (
          `<line x1="${x.toFixed(1)}" y1="24" x2="${x.toFixed(1)}" y2="52" class="fig-accent" stroke-width="3"></line>` +
          `<polygon points="${x.toFixed(1)},60 ${(x - 6).toFixed(1)},50 ${(x + 6).toFixed(1)},50" class="fig-accent"></polygon>`
        );
      })
      .join("");

    svg.innerHTML =
      arrows +
      `<rect x="${(CENTRE - halfWidth).toFixed(1)}" y="60" width="${width.toFixed(1)}" height="60" class="fig-grid"></rect>` +
      `<line x1="60" y1="${GROUND}" x2="500" y2="${GROUND}" class="fig-ink" stroke-width="3"></line>` +
      `<line x1="${(CENTRE - halfWidth).toFixed(1)}" y1="${GROUND}" x2="${(CENTRE + halfWidth).toFixed(1)}" y2="${GROUND}" class="fig-warn" stroke-width="7"></line>` +
      `<text x="${CENTRE}" y="150" font-size="16" text-anchor="middle" class="fig-ink">contact area = ${area.toFixed(2)} m&sup2;</text>` +
      `<text x="${CENTRE}" y="18" font-size="16" text-anchor="middle" class="fig-ink">force = ${force} N</text>`;

    readout.innerHTML =
      `Pressure = force &divide; area = ${force} N &divide; ${area.toFixed(2)} m&sup2; = ` +
      `<strong>${Math.round(pressure)} Pa</strong>. ` +
      `<em>Keep the force at ${force} N and halve the area. What happens to the pressure?</em>`;
  }

  react([forceInput, areaInput], update);
}
