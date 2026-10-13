// Tier-1 guided investigation: the balance inside a star.
//
// The page asks the reader to predict what keeps a star the same size for
// billions of years, then to test it by changing the outward pressure from
// fusion and the inward pull of gravity, then to explain why the two must
// balance. The drawing is schematic: it shows the two tendencies and the size
// that results, not a measured rate. Colours come from CSS classes, so the
// figure adapts to dark mode and every bundle.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-star-equilibrium" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 540 240" width="100%" role="img"
           aria-label="A star with an outward arrow for the pressure from fusion and an inward arrow for the pull of gravity"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Outward pressure from fusion <input class="fusion" type="range" min="10" max="100" step="1" value="60"></label>
        <label>Inward pull of gravity <input class="gravity" type="range" min="10" max="100" step="1" value="60"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");

  function rightArrowhead(x, y, cls) {
    // The tip is at (x, y); the triangle points to the right.
    return `<polygon points="${x - 10},${y - 6} ${x - 10},${y + 6} ${x},${y}" class="${cls}"></polygon>`;
  }

  function update() {
    const fusion = Number(el.querySelector(".fusion").value);
    const gravity = Number(el.querySelector(".gravity").value);
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

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
