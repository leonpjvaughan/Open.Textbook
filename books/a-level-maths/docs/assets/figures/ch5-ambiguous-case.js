// Guided investigation for the ambiguous case of the sine rule.
//
// Two sides and a non-included angle can fit no triangle, one triangle, or two.
// The reader varies angle A and the side a opposite it while the side b is fixed.
// A circle of radius a about C marks every place the vertex B can sit on the ray
// from A, so the number of triangles is read from the picture rather than
// asserted. Predict, Test and Explain belong to the page; this module is the Test.
//
// Pure HTML and SVG, an ES module, no colour of its own: the fig-* classes carry
// the theme. Runtime text is plain text, never TeX.

const SIDE_B = 5; // the fixed side AC, opposite angle B
const WIDTH = 460;
const HEIGHT = 320;
const PAD = 36;

const CASE_TEXT = {
  0: "No triangle fits.",
  1: "One triangle fits.",
  2: "Two triangles fit.",
};

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:560px">
      <label style="display:block;margin:.2rem 0">
        Angle A in degrees:
        <input class="angle" type="range" min="15" max="165" step="1" value="40"
               aria-label="Angle A in degrees">
      </label>
      <label style="display:block;margin:.2rem 0 .6rem">
        Side a, opposite angle A:
        <input class="side" type="range" min="1" max="11" step="0.5" value="4"
               aria-label="Side a, opposite angle A">
      </label>
      <svg viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" height="320" role="img"
           aria-label="A fixed side from A to C and a ray from A at the chosen angle, with a circle that marks every possible position of the opposite vertex"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const angleInput = el.querySelector(".angle");
  const sideInput = el.querySelector(".side");
  const readout = el.querySelector(".readout");

  // The angle at B of the triangle with vertex B at p and the third vertex at C.
  function angleAtB(p, C) {
    const u = { x: -p.x, y: -p.y };
    const v = { x: C.x - p.x, y: C.y - p.y };
    const dot = u.x * v.x + u.y * v.y;
    const size = Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y);
    return (Math.acos(Math.max(-1, Math.min(1, dot / size))) * 180) / Math.PI;
  }

  function draw() {
    const deg = Number(angleInput.value);
    const rad = (deg * Math.PI) / 180;
    const a = Number(sideInput.value);

    const dx = Math.cos(rad);
    const dy = Math.sin(rad);
    const C = { x: SIDE_B, y: 0 };
    const height = SIDE_B * Math.sin(rad);
    const base = C.x * dx + C.y * dy; // SIDE_B cos A
    const foot = { x: base * dx, y: base * dy };
    const discriminant = a * a - height * height;

    let crossings = [];
    if (discriminant >= 0) {
      const s = Math.sqrt(discriminant);
      crossings = [base - s, base + s].filter((t) => t > 0.05);
    }
    if (crossings.length === 2 && Math.abs(crossings[0] - crossings[1]) < 0.05) {
      crossings = [crossings[1]];
    }
    const points = crossings.map((t) => ({ x: t * dx, y: t * dy }));

    // Fit the drawing to its contents: the side, the ray, and the whole circle.
    let minX = 0;
    let maxX = SIDE_B;
    let minY = 0;
    let maxY = 0;
    const consider = (p) => {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    };
    consider(C);
    consider(foot);
    points.forEach(consider);
    minX = Math.min(minX, C.x - a);
    maxX = Math.max(maxX, C.x + a);
    minY = Math.min(minY, -a);
    maxY = Math.max(maxY, a);

    const scale = Math.min(
      (WIDTH - 2 * PAD) / Math.max(0.001, maxX - minX),
      (HEIGHT - 2 * PAD) / Math.max(0.001, maxY - minY)
    );
    const ox = (WIDTH - (maxX + minX) * scale) / 2;
    const oy = (HEIGHT + (maxY + minY) * scale) / 2;
    const toPixel = (p) => [ox + p.x * scale, oy - p.y * scale];

    const [ax, ay] = toPixel({ x: 0, y: 0 });
    const [cx, cy] = toPixel(C);
    const [fx, fy] = toPixel(foot);
    const rayLength =
      Math.max(...points.map((p) => Math.hypot(p.x, p.y)), height, SIDE_B) + 1.4;
    const [rx, ry] = toPixel({ x: rayLength * dx, y: rayLength * dy });
    const radius = a * scale;

    const circle =
      `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${radius.toFixed(1)}" ` +
      `class="fig-grid" stroke-dasharray="4 4"></circle>`;
    const perpendicular =
      `<line x1="${cx.toFixed(1)}" y1="${cy.toFixed(1)}" x2="${fx.toFixed(1)}" y2="${fy.toFixed(1)}" ` +
      `class="fig-grid" stroke-dasharray="4 4"></line>`;
    const ray =
      `<line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}" x2="${rx.toFixed(1)}" y2="${ry.toFixed(1)}" ` +
      `class="fig-accent" stroke-width="1.5"></line>`;
    const knownSide =
      `<line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}" x2="${cx.toFixed(1)}" y2="${cy.toFixed(1)}" ` +
      `class="fig-ink" stroke-width="3"></line>`;

    const palette = points.length === 2 ? ["fig-warn", "fig-good"] : ["fig-good", "fig-good"];
    let triangles = "";
    let labels = "";
    points.forEach((p, index) => {
      const [bx, by] = toPixel(p);
      const cls = palette[index];
      triangles +=
        `<line x1="${cx.toFixed(1)}" y1="${cy.toFixed(1)}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" ` +
        `class="${cls}" stroke-width="3"></line>` +
        `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="4.5" class="${cls}"></circle>`;
      const name = points.length === 2 ? (index === 0 ? "B" : "B\u2032") : "B";
      labels +=
        `<text x="${(bx + (index === 0 ? 10 : -22)).toFixed(0)}" y="${(by - 10).toFixed(0)}" ` +
        `font-size="13" class="text-ink">${name}</text>`;
    });

    svg.innerHTML =
      circle +
      perpendicular +
      ray +
      knownSide +
      triangles +
      `<text x="${(ax - 14).toFixed(0)}" y="${(ay + 18).toFixed(0)}" font-size="13" class="text-ink">A</text>` +
      `<text x="${(cx + 6).toFixed(0)}" y="${(cy + 18).toFixed(0)}" font-size="13" class="text-ink">C</text>` +
      `<text x="${(fx + 8).toFixed(0)}" y="${(fy + 16).toFixed(0)}" font-size="12" class="text-ink">h = ${height.toFixed(1)}</text>` +
      labels;

    const footOnRay = base > 1e-6;
    const minDistance = footOnRay ? height : SIDE_B;

    let verdict;
    if (points.length === 0) {
      if (a < minDistance - 0.05) {
        verdict = footOnRay
          ? `Side a is shorter than the perpendicular height b sin A = ` +
            `${height.toFixed(2)}, so the circle never reaches the ray. No ` +
            `triangle fits these measurements.`
          : `Angle A is ${base < -1e-6 ? "obtuse" : "a right angle"}, so the ` +
            `closest point of the ray to C is A itself, at distance ` +
            `b = ${SIDE_B}. Side a is shorter than that, so the circle never ` +
            `reaches the ray. No triangle fits these measurements.`;
      } else {
        verdict =
          "The only meeting point is A itself, which would give a flat shape " +
          "with no area. No triangle fits these measurements.";
      }
    } else if (points.length === 1 && discriminant <= 0.0025 && footOnRay) {
      verdict =
        "Side a equals the perpendicular height b sin A, so the circle touches " +
        "the ray once. Exactly one right-angled triangle fits.";
    } else if (points.length === 1) {
      verdict =
        "Side a is long enough for one crossing on the ray. Exactly one triangle fits.";
    } else {
      const angles = points.map((p) => angleAtB(p, C));
      verdict =
        `Side a lies between the height and side b, so the circle cuts the ray ` +
        `twice. Two triangles fit the same measurements, with angle B = ` +
        `${angles[0].toFixed(1)}° and ${angles[1].toFixed(1)}°, and those two ` +
        `angles add to 180°.`;
    }

    readout.textContent =
      `Angle A is ${deg}°, side a is ${a} and side b is ${SIDE_B}. ` +
      `The perpendicular height is h = b sin A = ${height.toFixed(2)}. ${verdict}`;

    svg.setAttribute(
      "aria-label",
      `A fixed side b from A to C, a ray from A at ${deg} degrees, and a circle ` +
        `of radius ${a} about C. ${CASE_TEXT[points.length]}`
    );
  }

  angleInput.addEventListener("input", draw);
  sideInput.addEventListener("input", draw);
  draw();
}
