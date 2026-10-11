// Tier-1 guided investigation: the field of a bar magnet and a plotting compass.
//
// The page asks the reader to predict whether the needle points along the field
// or across it, then to test at several places, then to explain why the needle
// lines up. The field lines are drawn by integrating the field of two point
// poles, and the same field decides the needle direction, so the drawing and the
// needle cannot disagree. Colours come from CSS classes, so the figure adapts to
// every bundle and both colour schemes.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-magnetic-field-compass" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 320" width="100%" height="320" role="img"
           aria-label="A bar magnet with curved magnetic field lines from the north pole to the south pole, and a plotting compass that can be moved around the magnet"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Compass across <input class="pos-x" type="range" min="80" max="480" step="5" value="150"></label>
        <label>Compass down <input class="pos-y" type="range" min="30" max="290" step="5" value="80"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");

  // The magnet is a rectangle. The north pole is on the left, the south on the
  // right. Each pole is treated as a point source of field.
  const NX = 235;
  const SX = 325;
  const PY = 160;
  const STEP = 3;
  const STEPS = 420;

  function field(x, y) {
    const d1x = x - NX;
    const d1y = y - PY;
    const d2x = x - SX;
    const d2y = y - PY;
    const r1 = Math.hypot(d1x, d1y) + 1e-4;
    const r2 = Math.hypot(d2x, d2y) + 1e-4;
    const b1 = 1 / (r1 * r1 * r1);
    const b2 = 1 / (r2 * r2 * r2);
    return [d1x * b1 - d2x * b2, d1y * b1 - d2y * b2];
  }

  function fieldLines() {
    const paths = [];
    for (let deg = 0; deg < 360; deg += 24) {
      const angle = (deg * Math.PI) / 180;
      let x = NX + 16 * Math.cos(angle);
      let y = PY + 16 * Math.sin(angle);
      let d = `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      for (let i = 0; i < STEPS; i += 1) {
        const [bx, by] = field(x, y);
        const mag = Math.hypot(bx, by) + 1e-9;
        x += (STEP * bx) / mag;
        y += (STEP * by) / mag;
        if (x < 4 || x > 556 || y < 4 || y > 316) break;
        d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
        if (Math.hypot(x - SX, y - PY) < 12) break;
      }
      paths.push(`<path d="${d}" class="fig-grid" fill="none" stroke-width="1.2"></path>`);
    }
    return paths.join("");
  }

  function directionWords(bx, by) {
    const horizontal = bx > 0.25 ? "to the right" : bx < -0.25 ? "to the left" : "";
    const vertical = by > 0.25 ? "downwards" : by < -0.25 ? "upwards" : "";
    if (horizontal && vertical) return `${horizontal} and ${vertical}`;
    return horizontal || vertical || "almost straight along the field";
  }

  function update() {
    const cx = Number(el.querySelector(".pos-x").value);
    const cy = Number(el.querySelector(".pos-y").value);
    const [bx, by] = field(cx, cy);
    const mag = Math.hypot(bx, by) + 1e-9;
    const ux = bx / mag;
    const uy = by / mag;
    const r = 22;

    const magnet = `
      <rect x="${NX}" y="${PY - 22}" width="${SX - NX}" height="44" rx="6" class="fig-ink" opacity="0.15"></rect>
      <text x="${NX - 12}" y="${PY + 5}" font-size="15" text-anchor="end" class="fig-accent">N</text>
      <text x="${SX + 12}" y="${PY + 5}" font-size="15" text-anchor="start" class="fig-warn">S</text>`;

    const tipX = cx + r * 0.7 * ux;
    const tipY = cy + r * 0.7 * uy;
    const tailX = cx - r * 0.7 * ux;
    const tailY = cy - r * 0.7 * uy;
    const compass = `
      <circle cx="${cx}" cy="${cy}" r="${r}" class="fig-ink" fill="none" stroke-width="1.5"></circle>
      <line x1="${cx}" y1="${cy}" x2="${tipX}" y2="${tipY}"
            class="fig-accent" stroke-width="3"></line>
      <line x1="${cx}" y1="${cy}" x2="${tailX}" y2="${tailY}"
            class="fig-warn" stroke-width="3"></line>`;

    svg.innerHTML = fieldLines() + magnet + compass;

    readout.innerHTML =
      `The field at the compass points <strong>${directionWords(ux, uy)}</strong>. ` +
      `The needle lines up along the field line, so it points the same way. ` +
      `<em>Now move the compass near a pole. Does the needle turn?</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
