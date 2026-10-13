// Guided investigation for the proof that the angle in a semicircle is 90 degrees.
//
// The proof joins the point on the circle to the centre, which splits the triangle
// into two isosceles triangles — and that is what the figure draws. The reader
// slides the point around the circle and the angle at it never moves, so the
// surprise the page opens with is the thing being investigated.
//
// This is the one place a slider matters most: the claim is that *nothing* changes,
// and a reader who only sees one picture cannot tell that from a coincidence.
// Predict -> Test -> Explain per AGENTS.md P6, and the readout is `aria-live`.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A circle with a diameter and a point on the circumference joined to both ends, showing the angle at that point staying a right angle as it moves",
    width: 420,
    height: 260,
    max: 520,
  });

  const where = slider(el, { show: false,
    id: "where",
    label: "Move the point around the circle:",
    name: "Position of the point on the circle",
    min: 8,
    max: 172,
    step: 1,
    value: 60,
  });

  const CX = 210;
  const CY = 130;
  const R = 105;

  const degrees = (radians) => (radians * 180) / Math.PI;

  const text = (x, y, label, cls = "fig-ink") =>
    `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" text-anchor="middle" ` +
    `font-size="13" class="${cls}">${label}</text>`;

  function draw() {
    // The slider gives a position along the upper half of the circle, in degrees
    // measured from the left. The point stays on the same semicircle as the angle
    // being measured, which is what makes it a semicircle angle.
    const t = (Number(where.value) * Math.PI) / 180;
    const P = { x: CX + R * Math.cos(Math.PI - t), y: CY - R * Math.sin(Math.PI - t) };

    const A = { x: CX - R, y: CY };
    const B = { x: CX + R, y: CY };
    const O = { x: CX, y: CY };

    // The right angle at P, drawn inside the triangle. `u` and `v` are unit vectors
    // from P towards A and B; the marker is their sum scaled.
    const u = { x: (A.x - P.x) / R, y: (A.y - P.y) / R };
    const v = { x: (B.x - P.x) / R, y: (B.y - P.y) / R };
    const s = 140;
    const m = { x: P.x + (u.x + v.x) * s, y: P.y + (u.y + v.y) * s };
    const corner =
      `M ${(P.x + u.x * s).toFixed(1)} ${(P.y + u.y * s).toFixed(1)} ` +
      `L ${m.x.toFixed(1)} ${m.y.toFixed(1)} ` +
      `L ${(P.x + v.x * s).toFixed(1)} ${(P.y + v.y * s).toFixed(1)}`;

    // The two isosceles triangles, and the two pairs of equal angles.
    const x = degrees(
      Math.acos(
        Math.max(-1, Math.min(1,
          ((A.x - P.x) * (O.x - P.x) + (A.y - P.y) * (O.y - P.y)) /
            (Math.hypot(A.x - P.x, A.y - P.y) * Math.hypot(O.x - P.x, O.y - P.y))))
      )
    );
    const y = 90 - x;

    svg.innerHTML = `
      <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke-width="2" class="fig-ink"></circle>
      <line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke-width="2" class="fig-ink"></line>
      <line x1="${A.x}" y1="${A.y}" x2="${P.x.toFixed(1)}" y2="${P.y.toFixed(1)}" stroke-width="2" class="fig-accent"></line>
      <line x1="${B.x}" y1="${B.y}" x2="${P.x.toFixed(1)}" y2="${P.y.toFixed(1)}" stroke-width="2" class="fig-accent"></line>
      <line x1="${O.x}" y1="${O.y}" x2="${P.x.toFixed(1)}" y2="${P.y.toFixed(1)}"
            stroke-width="2" stroke-dasharray="5 4" class="fig-grid"></line>
      <circle cx="${P.x.toFixed(1)}" cy="${P.y.toFixed(1)}" r="4.5" class="fig-warn"></circle>
      <path d="${corner}" fill="none" stroke-width="2" class="fig-good"></path>
      ${text(A.x - 14, A.y + 18, "A")}
      ${text(B.x + 14, B.y + 18, "B")}
      ${text(O.x, O.y + 18, "O")}
      ${text(P.x + (P.x < CX ? -16 : 16), P.y - 10, "P")}
      ${text(O.x + 30, O.y + 42, `${x.toFixed(0)}°`, "text-accent")}
      ${text(O.x - 30, O.y + 42, `${y.toFixed(0)}°`, "text-accent")}
      ${text(P.x + (P.x < CX ? 30 : -30), P.y + (P.y < CY ? 26 : -18), "90°", "text-good")}`;

    readout.textContent =
      `The angle at P is ${(x + y).toFixed(0)}° wherever the point sits. The two ` +
      `angles at the centre are ${x.toFixed(0)}° and ${y.toFixed(0)}°, they add to ` +
      `90°, and they are the two equal-base angles of the two isosceles triangles ` +
      `that OP makes.`;
  }

  react(where, draw);
}
