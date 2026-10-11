// Tier-1 guided investigation: reflection and refraction at a glass surface.
//
// Guided, not a sandbox: the page asks the reader to predict which way the ray
// bends before moving the slider, then to explain why the change of speed makes
// it bend. The slider sets the angle of incidence. The angle of refraction uses
// Snell's law with an internal glass value, because the figure must draw the
// correct ray; the page does not teach that relationship and does not ask the
// reader to use it.
// Colours come from CSS classes so the figure adapts to dark mode and every
// bundle; each ray is also labelled.
export function mount(el) {
  const GLASS = 1.5;
  const originX = 300;
  const originY = 150;
  const reach = 130;

  el.innerHTML = `
    <div class="fig-reflection-refraction" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 600 300" width="100%" height="300" role="img"
           aria-label="A ray of light meeting a horizontal glass surface, with the reflected and refracted rays shown against the normal"></svg>
      <label style="display:block;margin:.6rem 0 .3rem">
        Angle of incidence: <input class="angle" type="range" min="5" max="85" step="1" value="40">
      </label>
      <p class="readout" aria-live="polite" style="margin:.4rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const slider = el.querySelector(".angle");
  const readout = el.querySelector(".readout");

  function point(angleDeg, down) {
    const angle = (angleDeg * Math.PI) / 180;
    const dx = reach * Math.sin(angle);
    const dy = reach * Math.cos(angle);
    return { x: originX + dx, y: originY + (down ? dy : -dy) };
  }

  function update() {
    const incidence = Number(slider.value);
    const refraction = (Math.asin(Math.sin((incidence * Math.PI) / 180) / GLASS) * 180) / Math.PI;

    const incidentStart = point(incidence, false);
    const reflectedEnd = { x: originX + (originX - incidentStart.x), y: incidentStart.y };
    const refractedEnd = point(refraction, true);

    svg.innerHTML =
      // The glass block, below the boundary.
      `<rect x="20" y="${originY}" width="560" height="130" class="fig-grid"></rect>` +
      `<line x1="20" y1="${originY}" x2="580" y2="${originY}" class="fig-ink"></line>` +
      // The normal.
      `<line x1="${originX}" y1="20" x2="${originX}" y2="280" class="fig-grid" ` +
      `stroke-dasharray="5 5"></line>` +
      `<text x="${originX + 6}" y="28" font-size="11" class="fig-ink">normal</text>` +
      // The three rays.
      `<line x1="${incidentStart.x}" y1="${incidentStart.y}" x2="${originX}" y2="${originY}" ` +
      `class="fig-accent" stroke-width="2"></line>` +
      `<line x1="${originX}" y1="${originY}" x2="${reflectedEnd.x}" y2="${reflectedEnd.y}" ` +
      `class="fig-warn" stroke-width="2"></line>` +
      `<line x1="${originX}" y1="${originY}" x2="${refractedEnd.x}" y2="${refractedEnd.y}" ` +
      `class="fig-good" stroke-width="2"></line>` +
      // Labels.
      `<text x="${incidentStart.x + 4}" y="${incidentStart.y - 4}" font-size="11" ` +
      `class="fig-ink">incident</text>` +
      `<text x="${reflectedEnd.x - 60}" y="${reflectedEnd.y - 4}" font-size="11" ` +
      `class="fig-ink">reflected</text>` +
      `<text x="${refractedEnd.x + 4}" y="${refractedEnd.y + 12}" font-size="11" ` +
      `class="fig-ink">refracted</text>` +
      `<text x="${originX + 4}" y="46" font-size="11" class="fig-ink">i = ${incidence}\u00b0</text>` +
      `<text x="${originX + 4}" y="60" font-size="11" class="fig-ink">r = ${refraction.toFixed(0)}\u00b0</text>`;

    readout.innerHTML =
      `Angle of incidence <strong>${incidence}\u00b0</strong>. ` +
      `The angle of reflection is <strong>${incidence}\u00b0</strong>, because it always ` +
      `equals the angle of incidence. ` +
      `The angle of refraction is about <strong>${refraction.toFixed(0)}\u00b0</strong>, ` +
      `so the ray bends towards the normal as it enters the glass. ` +
      `<em>The angle of incidence and the angle of refraction are both measured from ` +
      `the normal.</em>`;
  }

  slider.addEventListener("input", update);
  update();
}
