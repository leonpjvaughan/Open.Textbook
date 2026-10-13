// Guided investigation for the proof that a polygon's interior angles add to
// (n - 2) x 180 degrees.
//
// The reader chooses the number of sides and whether to draw the fan of diagonals
// from one corner. The count of triangles is the whole proof, so the figure
// reports the count and lets the reader check it against the drawing rather than
// asserting the formula. Predict -> Test -> Explain: the page asks how many
// triangles first.
//
// Colours come from CSS classes so the figure adapts to every bundle and both
// schemes, and the readout is `aria-live` so the count reaches a reader who
// cannot see the drawing.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-polygon-triangulation" style="max-width:520px">
      <svg viewBox="0 0 400 250" width="100%" role="img"
           aria-label="A regular polygon with lines drawn from one corner to every corner it is not already joined to, cutting it into triangles"></svg>
      <label style="display:block;margin:.5rem 0 .2rem">
        Number of sides:
        <input class="sides" type="range" min="3" max="12" step="1" value="6"
               aria-label="Number of sides">
        <output class="sides-value">6</output>
      </label>
      <label style="display:block;margin:.2rem 0 .3rem">
        <input class="show-diagonals" type="checkbox" checked>
        Draw the triangles
      </label>
      <p class="readout" aria-live="polite" style="margin:.4rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const sides = el.querySelector(".sides");
  const sidesValue = el.querySelector(".sides-value");
  const toggle = el.querySelector(".show-diagonals");
  const readout = el.querySelector(".readout");

  const CX = 200;
  const CY = 122;
  const RADIUS = 88;
  const WEDGE = ["fig-accent", "fig-warn", "fig-good"];

  function draw() {
    const n = Number(sides.value);
    sidesValue.textContent = String(n);

    // A regular polygon, first corner at the top so the fan opens downwards.
    const point = (k) => {
      const t = -Math.PI / 2 + (k * 2 * Math.PI) / n;
      return { x: CX + RADIUS * Math.cos(t), y: CY + RADIUS * Math.sin(t) };
    };
    const corners = Array.from({ length: n }, (_, k) => point(k));
    const outline = corners.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

    // Fan from corner 0. Corners 1 and n-1 are already joined to it by a side, so
    // the diagonals go to corners 2 ... n-2, and there are n - 2 triangles.
    let fan = "";
    if (toggle.checked) {
      for (let k = 1; k <= n - 2; k += 1) {
        const a = corners[0];
        const b = corners[k];
        const c = corners[k + 1];
        fan +=
          `<polygon points="${a.x.toFixed(1)},${a.y.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)} ` +
          `${c.x.toFixed(1)},${c.y.toFixed(1)}" fill="none" stroke-width="2" ` +
          `class="${WEDGE[(k - 1) % WEDGE.length]}"></polygon>`;
      }
    }

    const dots = corners
      .map((p) => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5" class="fig-ink"></circle>`)
      .join("");

    svg.innerHTML =
      `<polygon points="${outline}" fill="none" stroke-width="2.5" class="fig-ink"></polygon>` +
      fan +
      dots;

    const triangles = n - 2;
    const total = triangles * 180;
    const shape = ["", "", "triangle", "quadrilateral", "pentagon", "hexagon", "heptagon",
      "octagon", "nonagon", "decagon", "hendecagon", "dodecagon"][n] || `${n}-sided polygon`;
    readout.textContent = toggle.checked
      ? `A ${shape} has ${n} sides. The fan makes ${triangles} triangles, and each ` +
        `triangle's angles add to 180°, so the polygon's angles add to ` +
        `${triangles} × 180° = ${total}°.`
      : `A ${shape} has ${n} sides. Tick the box to cut it into triangles.`;
  }

  sides.addEventListener("input", draw);
  toggle.addEventListener("change", draw);
  draw();
}
