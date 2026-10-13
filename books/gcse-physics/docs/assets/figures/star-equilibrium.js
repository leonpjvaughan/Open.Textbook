// Tier-1 guided investigation: the balance inside a star.
//
// The page asks the reader to predict what keeps a star the same size for
// billions of years, then to test it by changing the outward pressure from
// fusion and the inward pull of gravity, then to explain why the two must
// balance. The drawing is schematic: it shows the two tendencies and the size
// that results, not a measured rate. Colours come from CSS classes, so the
// figure adapts to dark mode and every bundle.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A star with an outward arrow for the pressure from fusion and an inward arrow for the pull of gravity",
    width: 540,
    height: 240,
  });

  const fusionInput = slider(el, { show: false,
    id: "fusion",
    label: "Outward pressure from fusion",
    min: 10,
    max: 100,
    step: 1,
    value: 60,
  });
  const gravityInput = slider(el, { show: false,
    id: "gravity",
    label: "Inward pull of gravity",
    min: 10,
    max: 100,
    step: 1,
    value: 60,
  });

  function rightArrowhead(x, y, cls) {
    // The tip is at (x, y); the triangle points to the right.
    return `<polygon points="${x - 10},${y - 6} ${x - 10},${y + 6} ${x},${y}" class="${cls}"></polygon>`;
  }

  function update() {
    const fusion = Number(fusionInput.value);
    const gravity = Number(gravityInput.value);
    const balance = fusion - gravity;
    const cx = 270;
    const cy = 120;
    const radius = Math.max(26, Math.min(54, 40 + balance * 0.22));

    // Arrow lengths are the two tendencies, drawn to scale against each other.
    const fusionLength = 14 + (fusion / 100) * 58;
    const gravityLength = 14 + (gravity / 100) * 58;

    let state;
    let explanation;
    if (Math.abs(balance) <= 6) {
      state = "stable";
      explanation = "The two are balanced, so the star keeps the same size.";
    } else if (balance > 0) {
      state = "expanding";
      explanation = "Fusion pushes out more than gravity pulls in, so the star grows.";
    } else {
      state = "shrinking";
      explanation = "Gravity pulls in more than fusion pushes out, so the star shrinks.";
    }

    const star =
      `<circle cx="${cx}" cy="${cy}" r="${radius.toFixed(1)}" class="fig-accent" ` +
      `fill-opacity="0.25" stroke-width="2"></circle>` +
      `<text x="${cx}" y="${cy + 4}" font-size="17" text-anchor="middle" class="fig-ink">star</text>`;

    // Gravity acts inwards, so its arrow points towards the star from the left.
    const gravityStart = cx - radius - gravityLength;
    const gravityArrow =
      `<line x1="${gravityStart.toFixed(1)}" y1="${cy}" x2="${cx - radius - 10}" y2="${cy}" ` +
      `class="fig-warn" stroke-width="4"></line>` +
      rightArrowhead(cx - radius, cy, "fig-warn") +
      `<text x="${gravityStart.toFixed(1)}" y="${cy + 22}" font-size="16" class="fig-ink">gravity pulls in</text>`;

    // Fusion acts outwards, so its arrow points away from the star to the right.
    const fusionEnd = cx + radius + fusionLength;
    const fusionArrow =
      `<line x1="${cx + radius + 10}" y1="${cy}" x2="${fusionEnd.toFixed(1)}" y2="${cy}" ` +
      `class="fig-good" stroke-width="4"></line>` +
      rightArrowhead(fusionEnd, cy, "fig-good") +
      `<text x="${(cx + radius + 10).toFixed(1)}" y="${cy + 22}" font-size="16" class="fig-ink">fusion pushes out</text>`;

    svg.innerHTML = star + gravityArrow + fusionArrow;

    readout.innerHTML =
      `The star is <strong>${state}</strong>. ${explanation} ` +
      `Gravity pulls in with a strength of <strong>${gravity}</strong> and fusion pushes out with ` +
      `a strength of <strong>${fusion}</strong>. ` +
      `<em>Why does a star stay the same size when the two are equal?</em>`;
  }

  react([fusionInput, gravityInput], update);
}
