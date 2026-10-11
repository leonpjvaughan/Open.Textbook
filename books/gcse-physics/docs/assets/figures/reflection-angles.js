// Tier-1 guided investigation: the law of reflection.
//
// Guided, not a sandbox: the page asks the reader to predict what happens when
// the incident ray travels along the normal, then to explain why both angles
// are measured from the normal. The reader sets the angle of incidence; the
// figure draws the incident ray, the normal and the reflected ray.
// Colours come from CSS classes so the figure adapts to dark mode.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-reflection-angles" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 240" width="100%" height="240" role="img"
           aria-label="A ray of light meeting a flat surface. The normal is drawn as a dashed line, and the angles of incidence and reflection are marked"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Angle of incidence (degrees) <input class="angle" type="range" min="0" max="80" step="5" value="40"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const P = { x: 280, y: 180 };
  const RAY = 120;
  const NORMAL_TOP = { x: 280, y: 55 };

  function update() {
    const angle = Number(el.querySelector(".angle").value);
    const radians = (angle * Math.PI) / 180;
    const dx = Math.sin(radians);
    const dy = Math.cos(radians);

    const source = { x: P.x - RAY * dx, y: P.y - RAY * dy };
    const reflected = { x: P.x + RAY * dx, y: P.y - RAY * dy };

    const surface =
      `<line x1="60" y1="${P.y}" x2="500" y2="${P.y}" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="${NORMAL_TOP.x}" y1="${NORMAL_TOP.y}" x2="${P.x}" y2="${P.y}" class="fig-grid" stroke-dasharray="5 4" stroke-width="2"></line>` +
      `<text x="${NORMAL_TOP.x + 6}" y="${NORMAL_TOP.y + 4}" font-size="11" class="fig-ink">normal</text>`;

    const incident =
      `<line x1="${source.x.toFixed(1)}" y1="${source.y.toFixed(1)}" x2="${P.x}" y2="${P.y}" class="fig-accent" stroke-width="2.5"></line>` +
      `<polygon points="${P.x},${P.y} ${(P.x - 12 * dx + 6 * dy).toFixed(1)},${(P.y - 12 * dy - 6 * dx).toFixed(1)} ` +
      `${(P.x - 12 * dx - 6 * dy).toFixed(1)},${(P.y - 12 * dy + 6 * dx).toFixed(1)}" class="fig-accent"></polygon>` +
      `<text x="${source.x.toFixed(1)}" y="${(source.y - 6).toFixed(1)}" font-size="11" class="fig-ink">incident ray</text>`;

    const reflectedRay =
      `<line x1="${P.x}" y1="${P.y}" x2="${reflected.x.toFixed(1)}" y2="${reflected.y.toFixed(1)}" class="fig-warn" stroke-width="2.5"></line>` +
      `<text x="${reflected.x.toFixed(1)}" y="${(reflected.y - 6).toFixed(1)}" font-size="11" text-anchor="end" class="fig-ink">reflected ray</text>`;

    // A small arc from the normal to each ray, drawn as a short polyline so the
    // direction of sweep does not depend on the SVG arc conventions.
    const arcRadius = 46;
    const arc = (sign) => {
      const points = [];
      for (let t = 0; t <= angle; t += 2) {
        const r = (t * Math.PI) / 180;
        const x = P.x + sign * arcRadius * Math.sin(r);
        const y = P.y - arcRadius * Math.cos(r);
        points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }
      const r = radians;
      points.push(
        `${(P.x + sign * arcRadius * Math.sin(r)).toFixed(1)},` +
          `${(P.y - arcRadius * Math.cos(r)).toFixed(1)}`,
      );
      const labelX = P.x + sign * (arcRadius + 16) * dx;
      const labelY = P.y - (arcRadius + 8) * dy;
      return (
        `<polyline points="${points.join(" ")}" class="fig-ink" fill="none" stroke-width="1.5"></polyline>` +
        `<text x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" ` +
        `font-size="11" text-anchor="middle" class="fig-ink">${angle}&deg;</text>`
      );
    };

    svg.innerHTML = surface + incident + reflectedRay + arc(-1) + arc(1);

    readout.innerHTML =
      `Angle of incidence <strong>${angle}&deg;</strong>, angle of reflection ` +
      `<strong>${angle}&deg;</strong>. The two angles are equal, and both are ` +
      `measured from the normal. ` +
      `<em>Now set the angle to 0&deg;. Where does the reflected ray go?</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
