// Tier-1 guided investigation: the equation of a circle and a tangent.
//
// Guided, not a sandbox: the page asks the reader to predict the tangent gradient
// before touching a control and to explain the perpendicular relationship
// afterwards. The reader picks the radius and the point, and the figure draws the
// radius and the tangent at that point. A shape paints with fig-* and a word
// paints with text-*.
export function mount(el) {
  const CX = 260;
  const CY = 200;
  const SCALE = 15;

  el.innerHTML = `
    <div style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 520 400" width="100%" role="img"
           aria-label="A circle centred on the origin with a radius drawn to a point on it and the tangent line touching the circle at that point"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Radius <input class="r" type="range" min="2" max="10" step="1" value="5"></label>
        <label>Point x-coordinate <input class="px" type="range" min="-4" max="4" step="1" value="3"></label>
        <label style="grid-column:1 / -1"><input class="above" type="checkbox" checked> Point above the horizontal axis</label>
      </div>
      <p class="legend" style="margin:.4rem 0 0"></p>
      <p class="readout" aria-live="polite" style="margin:.3rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const rSlider = el.querySelector(".r");
  const xSlider = el.querySelector(".px");
  const above = el.querySelector(".above");
  const legend = el.querySelector(".legend");
  const readout = el.querySelector(".readout");

  const cx = (x) => CX + x * SCALE;
  const cy = (y) => CY - y * SCALE;
  const fmt = (v) => {
    const round = Math.round(v * 100) / 100;
    return Object.is(round, -0) ? "0" : String(round);
  };
  const minus = (v) => (v >= 0 ? `- ${fmt(v)}` : `+ ${fmt(-v)}`);

  function update() {
    const r = Number(rSlider.value);
    const limit = r - 1;
    xSlider.min = String(-limit);
    xSlider.max = String(limit);
    let x = Number(xSlider.value);
    if (x > limit) x = limit;
    if (x < -limit) x = -limit;
    xSlider.value = String(x);

    const y = (above.checked ? 1 : -1) * Math.sqrt(r * r - x * x);
    const xPix = cx(x);
    const yPix = cy(y);
    const originX = cx(0);
    const originY = cy(0);

    // The tangent direction is perpendicular to the radius, so it is (-y, x).
    const reach = 1.35;
    const tangent = (dx, dy) => ({
      x: cx(x + dx * reach),
      y: cy(y + dy * reach),
    });
    const end = tangent(-y, x);
    const start = tangent(y, -x);

    // A small right-angle marker at the point, built along the radius and the
    // tangent in pixel space (where the vertical direction is flipped).
    const radial = { x: x / r, y: -y / r };
    const sideways = { x: -y / r, y: -x / r };
    const size = 12;
    const square = [
      `${(xPix + size * sideways.x).toFixed(1)},${(yPix + size * sideways.y).toFixed(1)}`,
      `${(xPix + size * sideways.x - size * radial.x).toFixed(1)},${(yPix + size * sideways.y - size * radial.y).toFixed(1)}`,
      `${(xPix - size * radial.x).toFixed(1)},${(yPix - size * radial.y).toFixed(1)}`,
    ].join(" ");

    svg.innerHTML =
      `<defs><clipPath id="ct-clip"><rect x="24" y="36" width="472" height="340"></rect></clipPath></defs>` +
      `<line x1="24" y1="${originY.toFixed(1)}" x2="496" y2="${originY.toFixed(1)}" ` +
      `class="fig-ink" stroke-width="1.5"></line>` +
      `<line x1="${originX.toFixed(1)}" y1="36" x2="${originX.toFixed(1)}" y2="376" ` +
      `class="fig-ink" stroke-width="1.5"></line>` +
      `<text x="500" y="${(originY - 7).toFixed(1)}" font-size="15" class="text-ink">x</text>` +
      `<text x="${(originX + 7).toFixed(1)}" y="46" font-size="15" class="text-ink">y</text>` +
      `<g clip-path="url(#ct-clip)">` +
      `<circle cx="${originX.toFixed(1)}" cy="${originY.toFixed(1)}" ` +
      `r="${(r * SCALE).toFixed(1)}" class="fig-accent" fill="none" stroke-width="2"></circle>` +
      `<line x1="${originX.toFixed(1)}" y1="${originY.toFixed(1)}" ` +
      `x2="${xPix.toFixed(1)}" y2="${yPix.toFixed(1)}" class="fig-good" stroke-width="2"></line>` +
      `<line x1="${start.x.toFixed(1)}" y1="${start.y.toFixed(1)}" ` +
      `x2="${end.x.toFixed(1)}" y2="${end.y.toFixed(1)}" class="fig-warn" ` +
      `stroke-width="2" stroke-dasharray="8 5"></line>` +
      `<polyline points="${square}" class="fig-ink" fill="none" stroke-width="1.5"></polyline>` +
      `</g>` +
      `<circle cx="${originX.toFixed(1)}" cy="${originY.toFixed(1)}" r="3.5" class="fig-ink"></circle>` +
      `<circle cx="${xPix.toFixed(1)}" cy="${yPix.toFixed(1)}" r="5" class="fig-warn"></circle>` +
      `<text x="${(xPix + 9).toFixed(1)}" y="${(yPix - 9).toFixed(1)}" font-size="15" ` +
      `class="text-accent">P (${fmt(x)}, ${fmt(y)})</text>`;

    legend.innerHTML =
      `<span class="text-good">radius (solid)</span> · ` +
      `<span class="text-warn">tangent (dashed)</span> · ` +
      `<span class="text-accent">circle x² + y² = r²</span>`;

    const onCircle = Number.isInteger(y)
      ? `x² + y² = ${x * x} + ${y * y} = ${x * x + y * y}, so r² = ${r * r}. `
      : `The circle has r² = ${r * r}. `;

    if (x === 0) {
      readout.innerHTML =
        `Point <strong>P = (0, ${fmt(y)})</strong> is on the circle. ${onCircle}` +
        `The radius is vertical, so the tangent is horizontal. ` +
        `Tangent equation: <strong>y = ${fmt(y)}</strong>.`;
    } else {
      const radiusGradient = y / x;
      const tangentGradient = -x / y;
      readout.innerHTML =
        `Point <strong>P = (${fmt(x)}, ${fmt(y)})</strong> is on the circle. ${onCircle}` +
        `Radius gradient <strong>${fmt(radiusGradient)}</strong>; ` +
        `tangent gradient <strong>-(${fmt(x)} ÷ ${fmt(y)}) = ${fmt(tangentGradient)}</strong>. ` +
        `Tangent equation: <strong>y ${minus(y)} = ${fmt(tangentGradient)}(x ${minus(x)})</strong>. ` +
        `The tangent gradient is the negative reciprocal of the radius gradient, ` +
        `so the radius and the tangent meet at a right angle.`;
    }
  }

  rSlider.addEventListener("input", update);
  xSlider.addEventListener("input", update);
  above.addEventListener("input", update);
  update();
}
