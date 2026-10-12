// Guided investigation: the locus of points a fixed distance from a straight wall.
//
// Guided, not a sandbox (AGENTS.md P6): the page asks the reader to predict what
// the path does at the two ends of the wall — a sharp corner or a curve — then to
// explain why. One control changes the distance, and the readout reports what the
// path is made of rather than stating the rule. Colours come from CSS classes, so
// the figure adapts to every bundle and both schemes.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <svg viewBox="0 0 500 320" width="100%" role="img"
           aria-label="A straight wall with a dashed path around it: two parallel sides joined by a semi-circular end at each corner"></svg>
      <label style="display:block;margin:.5rem 0 .3rem">
        Distance from the wall:
        <input class="gap" type="range" min="1" max="5" step="0.5" value="3"
               aria-label="Distance from the wall in metres">
      </label>
      <p class="readout" aria-live="polite" style="margin:.4rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const slider = el.querySelector(".gap");
  const readout = el.querySelector(".readout");

  const A = { x: 160, y: 160 };
  const B = { x: 336, y: 160 };
  const PX_PER_METRE = 22;

  function draw() {
    const metres = Number(slider.value);
    const r = metres * PX_PER_METRE;

    // Two straight sides plus a semi-circular end about each endpoint. The arcs
    // sweep in the direction of increasing angle, which on screen (y down) turns
    // right about B and left about A.
    const path =
      `M ${A.x} ${A.y - r} L ${B.x} ${B.y - r} ` +
      `A ${r} ${r} 0 0 1 ${B.x} ${B.y + r} ` +
      `L ${A.x} ${A.y + r} ` +
      `A ${r} ${r} 0 0 1 ${A.x} ${A.y - r} Z`;

    const sample = { x: B.x + r, y: B.y };

    svg.innerHTML =
      `<path d="${path}" style="fill:none" class="fig-accent" stroke-width="2.5" stroke-dasharray="7 5"></path>` +
      `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" class="fig-ink" stroke-width="6" stroke-linecap="round"></line>` +
      `<circle cx="${A.x}" cy="${A.y}" r="4" class="fig-ink"></circle>` +
      `<circle cx="${B.x}" cy="${B.y}" r="4" class="fig-ink"></circle>` +
      `<text x="${(A.x + B.x) / 2}" y="${A.y + 24}" font-size="12" text-anchor="middle" class="text-ink">the wall</text>` +
      `<line x1="${B.x}" y1="${B.y}" x2="${sample.x}" y2="${sample.y}" style="fill:none" class="fig-good" stroke-width="2" stroke-dasharray="4 3"></line>` +
      `<circle cx="${sample.x}" cy="${sample.y}" r="5" class="fig-good"></circle>` +
      `<text x="${(B.x + sample.x) / 2}" y="${B.y - 10}" font-size="12" text-anchor="middle" class="text-good">${metres} m</text>`;

    readout.textContent =
      `The wall is 8 m long. Every point on the dashed path is ${metres} m from ` +
      `the wall: the two straight sides stay ${metres} m away, and each end ` +
      `curves around the end of the wall as a semi-circle of radius ${metres} m.`;
  }

  slider.addEventListener("input", draw);
  draw();
}
