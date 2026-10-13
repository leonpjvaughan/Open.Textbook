// Guided investigation for bearings: a bearing turns clockwise from north, and the
// back bearing is 180 degrees more. The reader sets one bearing and watches both
// the clockwise sweep at A and the reversed north line at B, which is what makes
// the two bearings differ by 180 degrees. A single still picture shows one bearing
// and hides the turn; the slider is the turn.
//
// Predict -> Test -> Explain per AGENTS.md P6: the page asks for the back bearing
// before the slider is moved. Colours come from CSS classes, so the figure adapts
// to every bundle and both schemes, and the readout is `aria-live`.
export function mount(el) {
  const AX = 180;
  const AY = 175;
  const L = 95;
  const R_FWD = 55;
  const R_BACK = 40;
  const ARROW = 60;
  const BACK_ARROW = 42;
  const D2R = Math.PI / 180;

  el.innerHTML = `
    <div class="fig-bearing-dial" style="max-width:520px">
      <svg viewBox="0 0 460 320" width="100%" role="img"
           aria-label="A dial that measures the bearing of B from A clockwise from north, beside the reversed north line at B that gives the back bearing"></svg>
      <label style="display:block;margin:.6rem 0 .2rem">
        Bearing of B from A:
        <input class="bearing" type="range" min="0" max="359" step="1" value="53"
               aria-label="Bearing of B from A, in degrees">
      </label>
      <p class="readout" aria-live="polite" style="margin:.4rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const slider = el.querySelector(".bearing");
  const readout = el.querySelector(".readout");

  const pointAt = (cx, cy, r, deg) => [
    cx + r * Math.sin(deg * D2R),
    cy - r * Math.cos(deg * D2R),
  ];
  const fix = (p) => p.map((v) => v.toFixed(1)).join(" ");
  const pad = (n) => String(n).padStart(3, "0");

  // A clockwise sweep from `from` to `to`, in bearing degrees. The sweep is always
  // taken clockwise, so a bearing of 300 draws the long way round, which is the
  // point of a bearing.
  function arcPath(cx, cy, r, from, to) {
    const delta = ((to - from) % 360 + 360) % 360;
    if (delta < 0.5) return "";
    const [x1, y1] = pointAt(cx, cy, r, from);
    const [x2, y2] = pointAt(cx, cy, r, to);
    const large = delta > 180 ? 1 : 0;
    return `M ${fix([x1, y1])} A ${r} ${r} 0 ${large} 1 ${fix([x2, y2])}`;
  }

  // A small arrowhead at the middle of the sweep, pointing the way the angle
  // turns. Without it the arc says "some angle"; with it the arc says "clockwise".
  function sweepHead(cx, cy, r, from, to, cls) {
    const delta = ((to - from) % 360 + 360) % 360;
    if (delta < 14) return "";
    const m = from + delta / 2;
    const [px, py] = pointAt(cx, cy, r, m);
    const tx = Math.cos(m * D2R);
    const ty = Math.sin(m * D2R);
    const nx = -Math.sin(m * D2R);
    const ny = Math.cos(m * D2R);
    const tip = [px + 8 * tx, py + 8 * ty];
    const b1 = [px - 5 * tx + 4.5 * nx, py - 5 * ty + 4.5 * ny];
    const b2 = [px - 5 * tx - 4.5 * nx, py - 5 * ty - 4.5 * ny];
    return `<polygon points="${fix(tip)} ${fix(b1)} ${fix(b2)}" class="${cls}"></polygon>`;
  }

  // The line every bearing is measured from. A bearing is read at the point the
  // reader stands at, so each of A and B gets its own north line.
  function northLine(cx, cy, len) {
    const tipY = cy - len;
    return (
      `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${tipY}" class="fig-grid" stroke-width="2" stroke-dasharray="6 5"></line>` +
      `<polygon points="${cx},${tipY - 9} ${cx - 5},${tipY + 2} ${cx + 5},${tipY + 2}" class="fig-ink"></polygon>` +
      `<text x="${cx + 9}" y="${tipY + 4}" class="text-ink" font-size="13">N</text>`
    );
  }

  function draw() {
    const bearing = Number(slider.value);
    const back = (bearing + 180) % 360;
    const [bx, by] = pointAt(AX, AY, L, bearing);
    const ux = (bx - AX) / L;
    const uy = (by - AY) / L;

    const fwdLabel = pointAt(AX, AY, R_FWD + 20, bearing / 2);
    const backDelta = ((back - 0) % 360 + 360) % 360;
    const backLabel = pointAt(bx, by, R_BACK + 22, backDelta / 2);

    const fwdArc = arcPath(AX, AY, R_FWD, 0, bearing);
    const backArc = arcPath(bx, by, R_BACK, 0, back);

    svg.innerHTML =
      northLine(AX, AY, ARROW) +
      northLine(bx, by, BACK_ARROW) +
      `<line x1="${AX}" y1="${AY}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" class="fig-accent" stroke-width="3"></line>` +
      (fwdArc ? `<path d="${fwdArc}" style="fill:none" class="fig-accent" stroke-width="2"></path>` : "") +
      sweepHead(AX, AY, R_FWD, 0, bearing, "fig-accent") +
      (backArc ? `<path d="${backArc}" style="fill:none" class="fig-warn" stroke-width="2"></path>` : "") +
      sweepHead(bx, by, R_BACK, 0, back, "fig-warn") +
      `<text x="${fwdLabel[0].toFixed(1)}" y="${fwdLabel[1].toFixed(1)}" class="text-accent" font-size="14" text-anchor="middle">${pad(bearing)}°</text>` +
      `<text x="${backLabel[0].toFixed(1)}" y="${backLabel[1].toFixed(1)}" class="text-warn" font-size="13" text-anchor="middle">${pad(back)}°</text>` +
      `<circle cx="${AX}" cy="${AY}" r="5" class="fig-ink"></circle>` +
      `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="5" class="fig-ink"></circle>` +
      `<text x="${(AX - 15).toFixed(1)}" y="${(AY + 17).toFixed(1)}" class="text-ink" font-size="14">A</text>` +
      `<text x="${(bx + ux * 20).toFixed(1)}" y="${(by + uy * 20 + 5).toFixed(1)}" class="text-ink" font-size="14" text-anchor="middle">B</text>`;

    readout.textContent =
      `The bearing of B from A is ${pad(bearing)}°. It turns clockwise from the north line at A. ` +
      `The north line at B points the same way, so the bearing of A from B is ${pad(back)}°. ` +
      `The two bearings differ by 180°.`;
  }

  slider.addEventListener("input", draw);
  draw();
}
