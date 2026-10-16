// Tier-1 guided investigation: the area effect of an enlargement.
//
// The page asks the reader to predict how the area grows when the sides double, then to
// test several scale factors, then to explain why the area factor is k squared. So the
// figure has to draw the tile and its image together, mark the centre, and read the area
// off the picture as the scale factor changes.
//
// Nothing here carries a colour. The object is drawn in the accent class and the image
// in the warning class, and the rays from the centre show which point is fixed.
//
// The scaffolding — the panel, its accessible name, the slider and the readout — comes
// from `kit.js`. What is left is the drawing and the sentences.
import { SIZE, fmt, label, panel, react, scale, slider } from "./kit.js";

// The tile from the chapter problem, and its area.
const TILE = [
  [1, 1],
  [4, 1],
  [1, 3],
];
const AREA = 3; // square units: base 3, height 2, so 3 * 2 / 2

// The drawing area, in SVG units. Both axes use the same scale, so an enlargement
// looks like an enlargement rather than a stretch.
const DOMAIN_X = [-2, 14];
const DOMAIN_Y = [-2, 10];
const px = scale({ domain: DOMAIN_X, range: [0, 560] });
const py = scale({ domain: DOMAIN_Y, range: [420, 0] });

const points = (list) => list.map(([x, y]) => `${px(x)},${py(y)}`).join(" ");

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A triangle and its enlarged image on a coordinate grid, with the scale factor controlled by the reader",
    prompt: "Predict the area factor before you move the scale factor.",
    width: 560,
    height: 420,
  });

  const kInput = slider(el, {
    show: true,
    id: "scale",
    label: "Scale factor k",
    min: 0.5,
    max: 3,
    step: 0.5,
    value: 2,
  });

  function update() {
    const k = Number(kInput.value);
    const image = TILE.map(([x, y]) => [k * x, k * y]);

    // The grid, drawn fresh each time so the figure stays one self-contained SVG.
    let grid = "";
    for (let x = DOMAIN_X[0]; x <= DOMAIN_X[1]; x += 1) {
      if (x === 0) continue;
      grid += `<line x1="${px(x)}" y1="${py(DOMAIN_Y[0])}" x2="${px(x)}" y2="${py(DOMAIN_Y[1])}" class="fig-grid" stroke-width="0.6"></line>`;
    }
    for (let y = DOMAIN_Y[0]; y <= DOMAIN_Y[1]; y += 1) {
      if (y === 0) continue;
      grid += `<line x1="${px(DOMAIN_X[0])}" y1="${py(y)}" x2="${px(DOMAIN_X[1])}" y2="${py(y)}" class="fig-grid" stroke-width="0.6"></line>`;
    }

    const axes =
      `<line x1="${px(DOMAIN_X[0])}" y1="${py(0)}" x2="${px(DOMAIN_X[1])}" y2="${py(0)}" class="fig-ink" stroke-width="1.5"></line>` +
      `<line x1="${px(0)}" y1="${py(DOMAIN_Y[0])}" x2="${px(0)}" y2="${py(DOMAIN_Y[1])}" class="fig-ink" stroke-width="1.5"></line>` +
      label({ x: px(DOMAIN_X[1]) - 8, y: py(0) - 8, text: "x", size: SIZE.value, class: "text-ink", anchor: "end" }) +
      label({ x: px(0) + 10, y: py(DOMAIN_Y[1]) + 4, text: "y", size: SIZE.value, class: "text-ink", anchor: "start" });

    // The rays from the centre through each corner. Every image corner lies on one of
    // them, which is what makes the origin the centre of the enlargement.
    let rays = "";
    for (const [x, y] of TILE) {
      rays += `<line x1="${px(0)}" y1="${py(0)}" x2="${px(k * x)}" y2="${py(k * y)}" class="fig-grid" stroke-width="1" stroke-dasharray="5 4"></line>`;
    }

    const shapes =
      `<polygon points="${points(TILE)}" class="fig-accent" fill-opacity="0.25" stroke-width="2.4"></polygon>` +
      `<polygon points="${points(image)}" class="fig-warn" fill-opacity="0.15" stroke-width="2.4"></polygon>` +
      `<circle cx="${px(0)}" cy="${py(0)}" r="3.5" class="fig-ink"></circle>` +
      label({ x: px(TILE[1][0]) + 6, y: py(TILE[1][1]) + 22, text: "tile", size: SIZE.value, class: "text-accent", anchor: "start" }) +
      label({ x: px(image[1][0]) + 6, y: py(image[1][1]) - 10, text: "image", size: SIZE.value, class: "text-warn", anchor: "start" });

    svg.innerHTML = `${grid}${axes}${rays}${shapes}`;

    const corners = image.map(([x, y]) => `(${fmt(x)}, ${fmt(y)})`).join(", ");
    const area = k * k * AREA;
    readout.textContent =
      `k = ${fmt(k, 1)}. The image corners are ${corners}, and the area factor is ` +
      `k\u00b2 = ${fmt(k * k, 2)}. The tile has area ${fmt(AREA)}, so the image has area ` +
      `${fmt(area, 2)}.`;
  }

  react(kInput, update);
}
