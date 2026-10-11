// Guided investigation for resolving forces on an inclined plane. The reader
// tilts the slope and watches the weight split into a component along the slope
// and a component into the slope. Plain HTML and SVG, no framework and no
// colour of its own: the fig-* classes carry the theme. Runtime text is plain
// text, never TeX.

const SCALE = 0.13; // pixels per newton
const BASE_Y = 278;
const PIVOT_X = 64;
const SLOPE_LEN = 330;
const G = 9.8;

function arrow(x1, y1, x2, y2, cls, dash) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const spread = 0.42;
  const bx = x2 - size * Math.cos(angle);
  const by = y2 - size * Math.sin(angle);
  const leftX = bx - size * Math.sin(angle) * spread * 2;
  const leftY = by + size * Math.cos(angle) * spread * 2;
  const rightX = bx + size * Math.sin(angle) * spread * 2;
  const rightY = by - size * Math.cos(angle) * spread * 2;
  const dashAttr = dash ? ' stroke-dasharray="5 4"' : "";
  return (
    `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" ` +
    `x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="${cls}" ` +
    `fill="none" stroke-width="2"${dashAttr}></line>` +
    `<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ` +
    `${leftX.toFixed(1)},${leftY.toFixed(1)} ${rightX.toFixed(1)},${rightY.toFixed(1)}" ` +
    `class="${cls}"></polygon>`
  );
}

function line(x1, y1, x2, y2, cls, dash) {
  const dashAttr = dash ? ' stroke-dasharray="5 4"' : "";
  return (
    `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" ` +
    `x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="${cls}" ` +
    `fill="none" stroke-width="1"${dashAttr}></line>`
  );
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:600px">
      <label>Mass of the block, in kilograms
        <input class="mass" type="range" min="20" max="100" step="5" value="60">
      </label>
      <label>Angle of the slope, in degrees
        <input class="angle" type="range" min="0" max="50" step="1" value="25">
      </label>
      <svg viewBox="0 0 460 330" width="100%" role="img"
           aria-label="A block on a slope, with its weight split into a component along the slope and a component into the slope"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const inputs = {
    mass: el.querySelector(".mass"),
    angle: el.querySelector(".angle"),
  };

  function update() {
    const m = Number(inputs.mass.value);
    const theta = (Number(inputs.angle.value) * Math.PI) / 180;
    const weight = m * G;
    const along = weight * Math.sin(theta);
    const into = weight * Math.cos(theta);

    const topX = PIVOT_X + SLOPE_LEN * Math.cos(theta);
    const topY = BASE_Y - SLOPE_LEN * Math.sin(theta);

    // The block sits six tenths of the way up the slope.
    const bx = PIVOT_X + 0.6 * (topX - PIVOT_X);
    const by = BASE_Y + 0.6 * (topY - BASE_Y);
    // Unit vectors in screen coordinates (x right, y down).
    const upx = Math.cos(theta);
    const upy = -Math.sin(theta);
    const outx = -Math.sin(theta);
    const outy = -Math.cos(theta);

    const weightX = bx;
    const weightY = by + weight * SCALE;
    const alongX = bx - along * SCALE * upx;
    const alongY = by - along * SCALE * upy;
    const intoX = bx - into * SCALE * outx;
    const intoY = by - into * SCALE * outy;

    const ground = line(PIVOT_X, BASE_Y, 430, BASE_Y, "fig-ink", false);
    const slope = line(PIVOT_X, BASE_Y, topX, topY, "fig-ink", false);
    const corner = line(topX, topY, topX, BASE_Y, "fig-grid", true);

    const parallelogram =
      line(weightX, weightY, alongX, alongY, "fig-grid", true) +
      line(weightX, weightY, intoX, intoY, "fig-grid", true);

    // A short tick marks the surface the block rests on.
    const tickX = bx + 26 * outx;
    const tickY = by + 26 * outy;

    svg.innerHTML =
      ground +
      slope +
      corner +
      line(bx, by, tickX, tickY, "fig-ink", false) +
      parallelogram +
      arrow(bx, by, weightX, weightY, "fig-warn") +
      arrow(bx, by, alongX, alongY, "fig-accent") +
      arrow(bx, by, intoX, intoY, "fig-good");

    const angleDeg = Number(inputs.angle.value);
    readout.textContent =
      `Mass ${m} kilograms, so the weight is ${weight.toFixed(0)} newtons. ` +
      `At ${angleDeg} degrees, the component along the slope is ` +
      `${along.toFixed(1)} newtons and the component into the slope is ` +
      `${into.toFixed(1)} newtons. On a smooth slope the normal reaction is ` +
      `${into.toFixed(1)} newtons and it balances the component into the slope.`;

    svg.setAttribute(
      "aria-label",
      `A block of mass ${m} kilograms on a slope of ${angleDeg} degrees. ` +
        `The weight of ${weight.toFixed(0)} newtons splits into a component of ` +
        `${along.toFixed(1)} newtons along the slope and a component of ` +
        `${into.toFixed(1)} newtons into the slope. The normal reaction on a ` +
        `smooth slope balances the component into the slope.`
    );
  }

  for (const input of Object.values(inputs)) {
    input.addEventListener("input", update);
  }
  update();
}
