// Guided investigation for Newton's first law. Two forces act at a point; the
// reader sets each magnitude and direction and watches the resultant. The
// figure shows when the two forces balance and when they do not. Plain HTML and
// SVG, no framework and no colour of its own: the fig-* classes carry the
// theme. Runtime text is plain text, never TeX.

const SCALE = 12; // pixels per newton
const ORIGIN_X = 230;
const ORIGIN_Y = 165;
const W = 460;
const H = 330;

function xToPx(x) {
  return ORIGIN_X + x * SCALE;
}

function yToPx(y) {
  return ORIGIN_Y - y * SCALE;
}

function arrow(x1, y1, x2, y2, cls) {
  const px1 = xToPx(x1);
  const py1 = yToPx(y1);
  const px2 = xToPx(x2);
  const py2 = yToPx(y2);
  const angle = Math.atan2(py2 - py1, px2 - px1);
  const size = 9;
  const spread = 0.42;
  const bx = px2 - size * Math.cos(angle);
  const by = py2 - size * Math.sin(angle);
  const leftX = bx - size * Math.sin(angle) * spread * 2;
  const leftY = by + size * Math.cos(angle) * spread * 2;
  const rightX = bx + size * Math.sin(angle) * spread * 2;
  const rightY = by - size * Math.cos(angle) * spread * 2;
  return (
    `<line x1="${px1.toFixed(1)}" y1="${py1.toFixed(1)}" ` +
    `x2="${px2.toFixed(1)}" y2="${py2.toFixed(1)}" class="${cls}" fill="none" stroke-width="2"></line>` +
    `<polygon points="${px2.toFixed(1)},${py2.toFixed(1)} ` +
    `${leftX.toFixed(1)},${leftY.toFixed(1)} ${rightX.toFixed(1)},${rightY.toFixed(1)}" ` +
    `class="${cls}"></polygon>`
  );
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:600px">
      <label>Force A, size in newtons
        <input class="a-mag" type="range" min="0" max="12" step="0.5" value="8">
      </label>
      <label>Force A, direction in degrees
        <input class="a-dir" type="range" min="0" max="360" step="5" value="30">
      </label>
      <label>Force B, size in newtons
        <input class="b-mag" type="range" min="0" max="12" step="0.5" value="8">
      </label>
      <label>Force B, direction in degrees
        <input class="b-dir" type="range" min="0" max="360" step="5" value="210">
      </label>
      <svg viewBox="0 0 ${W} ${H}" width="100%" role="img"
           aria-label="Two forces acting at a point, with their resultant drawn from the point"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const inputs = {
    aMag: el.querySelector(".a-mag"),
    aDir: el.querySelector(".a-dir"),
    bMag: el.querySelector(".b-mag"),
    bDir: el.querySelector(".b-dir"),
  };

  function axes() {
    return (
      `<line x1="${xToPx(-13)}" y1="${yToPx(0)}" x2="${xToPx(13)}" y2="${yToPx(0)}" class="fig-grid"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(-11)}" x2="${xToPx(0)}" y2="${yToPx(11)}" class="fig-grid"></line>`
    );
  }

  function update() {
    const aMag = Number(inputs.aMag.value);
    const aDir = Number(inputs.aDir.value);
    const bMag = Number(inputs.bMag.value);
    const bDir = Number(inputs.bDir.value);

    const ax = aMag * Math.cos((aDir * Math.PI) / 180);
    const ay = aMag * Math.sin((aDir * Math.PI) / 180);
    const bx = bMag * Math.cos((bDir * Math.PI) / 180);
    const by = bMag * Math.sin((bDir * Math.PI) / 180);
    const rx = ax + bx;
    const ry = ay + by;
    const rMag = Math.sqrt(rx * rx + ry * ry);
    const balanced = rMag < 0.25;

    svg.innerHTML =
      axes() +
      arrow(0, 0, ax, ay, "fig-accent") +
      arrow(0, 0, bx, by, "fig-good") +
      arrow(0, 0, rx, ry, "fig-warn");

    const verdict = balanced
      ? "The two forces balance, so the point stays at rest or keeps a constant velocity."
      : "The two forces do not balance, so there is a resultant force and the velocity changes.";

    readout.textContent =
      `Force A is (${ax.toFixed(1)}, ${ay.toFixed(1)}) newtons. ` +
      `Force B is (${bx.toFixed(1)}, ${by.toFixed(1)}) newtons. ` +
      `Their resultant is (${rx.toFixed(1)}, ${ry.toFixed(1)}) newtons, with size ` +
      `${rMag.toFixed(2)} newtons. ${verdict}`;

    svg.setAttribute(
      "aria-label",
      `Force A is (${ax.toFixed(1)}, ${ay.toFixed(1)}) newtons and force B is ` +
        `(${bx.toFixed(1)}, ${by.toFixed(1)}) newtons. The resultant force is ` +
        `(${rx.toFixed(1)}, ${ry.toFixed(1)}) newtons with size ${rMag.toFixed(2)} newtons. ` +
        verdict
    );
  }

  for (const input of Object.values(inputs)) {
    input.addEventListener("input", update);
  }
  update();
}
