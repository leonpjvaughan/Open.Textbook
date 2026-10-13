// Tier-1 guided investigation: two forces in a straight line.
//
// Guided, not a sandbox: the page asks the reader to predict the resultant
// before moving the sliders, then to explain why the resultant is zero when the
// two forces are equal. The reader sets a force pulling to the left and a force
// pulling to the right; the figure shows both and the resultant.
// Colours come from CSS classes so the figure adapts to dark mode.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-resultant-forces" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 170" width="100%" role="img"
           aria-label="A trolley pulled to the left and to the right, with an arrow below showing the resultant force"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Force to the left (N) <input class="left" type="range" min="0" max="200" step="10" value="100"></label>
        <label>Force to the right (N) <input class="right" type="range" min="0" max="200" step="10" value="100"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const CENTRE = 280;
  const MID = 62;
  const SCALE = 0.65; // pixels per newton, so 200 N reaches 130 px

  function arrow(x, y, length, cls, label) {
    const direction = length < 0 ? -1 : 1;
    const end = x + length;
    const head = 9 * direction;
    return (
      `<line x1="${x}" y1="${y}" x2="${end - head}" y2="${y}" class="${cls}" ` +
      `stroke-width="3"></line>` +
      `<polygon points="${end},${y} ${end - head},${y - 6} ${end - head},${y + 6}" class="${cls}"></polygon>` +
      (label ? `<text x="${(x + end) / 2}" y="${y - 12}" font-size="16" text-anchor="middle" class="fig-ink">${label}</text>` : "")
    );
  }

  function update() {
    const left = Number(el.querySelector(".left").value);
    const right = Number(el.querySelector(".right").value);
    const resultant = right - left;
    const magnitude = Math.abs(resultant);

    const leftArrow = arrow(CENTRE - 32, MID, -left * SCALE, "fig-warn", `${left} N`);
    const rightArrow = arrow(CENTRE + 32, MID, right * SCALE, "fig-accent", `${right} N`);
    const box =
      `<rect x="${CENTRE - 30}" y="${MID - 20}" width="60" height="40" class="fig-grid"></rect>`;

    // The resultant is drawn to scale underneath, from the centre of the box.
    let resultantArrow;
    let resultantLabel;
    if (magnitude === 0) {
      resultantArrow = `<circle cx="${CENTRE}" cy="128" r="5" class="fig-good"></circle>`;
      resultantLabel = "Resultant = 0 N";
    } else {
      resultantArrow = arrow(CENTRE, 128, resultant * SCALE, "fig-good", "");
      resultantLabel = `Resultant = ${magnitude} N to the ${resultant > 0 ? "right" : "left"}`;
    }

    svg.innerHTML =
      box +
      leftArrow +
      rightArrow +
      resultantArrow +
      `<text x="${CENTRE}" y="158" font-size="16" text-anchor="middle" class="fig-ink">${resultantLabel}</text>`;

    if (magnitude === 0) {
      readout.innerHTML =
        `The two forces are equal and opposite. The resultant force is <strong>0 N</strong>, ` +
        `so the forces are balanced. <em>Change one slider: which way does the resultant point?</em>`;
    } else {
      readout.innerHTML =
        `Resultant = ${right} N − ${left} N = <strong>${magnitude} N to the ` +
        `${resultant > 0 ? "right" : "left"}</strong>. ` +
        `<em>Set both forces to 100 N. Why is the resultant now zero?</em>`;
    }
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
