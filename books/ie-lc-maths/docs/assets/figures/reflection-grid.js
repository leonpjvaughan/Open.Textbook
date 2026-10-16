// Tier-1 guided investigation: reflection in a mirror line.
//
// The page asks the reader to predict the image of a point, then to test each of the
// four mirror lines, then to write down which coordinate changes and how its sign
// behaves. So the figure has to draw the point, the mirror line and the image together,
// and it has to let the reader change both the point and the line.
//
// Nothing here carries a colour. The object is drawn in the accent class and the image
// in the warning class, and the two are told apart by a dashed connector as well, so the
// pair does not rely on colour.
//
// The scaffolding — the panel, its accessible name, the controls and the readout — comes
// from `kit.js`. What is left is the drawing and the sentences.
import { SIZE, fmt, label, panel, react, scale, slider, chooser } from "./kit.js";

// The drawing area, in SVG units. The origin sits in the middle, and both axes use the
// same scale so that a reflection looks like a reflection.
const ORIGIN = { x: 280, y: 180 };
const UNIT = 28;
const HALF_WIDTH = 9; // domain, in units, left and right of the origin
const HALF_HEIGHT = 6; // domain, in units, above and below the origin

const px = scale({ domain: [-HALF_WIDTH, HALF_WIDTH], range: [ORIGIN.x - HALF_WIDTH * UNIT, ORIGIN.x + HALF_WIDTH * UNIT] });
const py = scale({ domain: [-HALF_HEIGHT, HALF_HEIGHT], range: [ORIGIN.y + HALF_HEIGHT * UNIT, ORIGIN.y - HALF_HEIGHT * UNIT] });

const LINES = {
  "x-axis": { label: "the x-axis", image: (x, y) => [x, -y], swap: false },
  "y-axis": { label: "the y-axis", image: (x, y) => [-x, y], swap: false },
  "y=x": { label: "the line y = x", image: (x, y) => [y, x], swap: true },
  "y=-x": { label: "the line y = -x", image: (x, y) => [-y, -x], swap: true },
};

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A point and its image on a coordinate grid, reflected in a mirror line the reader chooses",
    prompt: "Predict where the image will land, then move the point and change the mirror line.",
    width: 560,
    height: 360,
  });

  const xInput = slider(el, { show: true, id: "px", label: "x of P", min: -6, max: 6, step: 1, value: 4 });
  const yInput = slider(el, { show: true, id: "py", label: "y of P", min: -5, max: 5, step: 1, value: 2 });
  const lineInput = chooser(el, {
    id: "mirror",
    label: "Mirror line",
    choices: [
      { value: "x-axis", label: "the x-axis" },
      { value: "y-axis", label: "the y-axis" },
      { value: "y=x", label: "the line y = x" },
      { value: "y=-x", label: "the line y = -x" },
    ],
    value: "y=x",
  });

  function update() {
    const x = Number(xInput.value);
    const y = Number(yInput.value);
    const rule = LINES[lineInput.value] || LINES["y=x"];
    const [ix, iy] = rule.image(x, y);

    // Grid, drawn fresh each time so the figure stays one self-contained SVG.
    let grid = "";
    for (let k = -HALF_WIDTH; k <= HALF_WIDTH; k += 1) {
      if (k === 0) continue;
      grid += `<line x1="${px(k)}" y1="${py(HALF_HEIGHT)}" x2="${px(k)}" y2="${py(-HALF_HEIGHT)}" class="fig-grid" stroke-width="0.7"></line>`;
    }
    for (let k = -HALF_HEIGHT; k <= HALF_HEIGHT; k += 1) {
      if (k === 0) continue;
      grid += `<line x1="${px(-HALF_WIDTH)}" y1="${py(k)}" x2="${px(HALF_WIDTH)}" y2="${py(k)}" class="fig-grid" stroke-width="0.7"></line>`;
    }

    // The axes, with their names.
    const axes =
      `<line x1="${px(-HALF_WIDTH)}" y1="${py(0)}" x2="${px(HALF_WIDTH)}" y2="${py(0)}" class="fig-ink" stroke-width="1.6"></line>` +
      `<line x1="${px(0)}" y1="${py(-HALF_HEIGHT)}" x2="${px(0)}" y2="${py(HALF_HEIGHT)}" class="fig-ink" stroke-width="1.6"></line>` +
      label({ x: px(HALF_WIDTH) - 6, y: py(0) - 8, text: "x", size: SIZE.value, class: "text-ink", anchor: "end" }) +
      label({ x: px(0) + 10, y: py(HALF_HEIGHT) + 4, text: "y", size: SIZE.value, class: "text-ink", anchor: "start" });

    // The mirror line. The two diagonals run past the corner of the viewBox and are
    // clipped by it, which is what a mirror line should look like.
    let mirror = "";
    if (lineInput.value === "x-axis") {
      mirror = `<line x1="${px(-HALF_WIDTH)}" y1="${py(0)}" x2="${px(HALF_WIDTH)}" y2="${py(0)}" class="fig-warn" stroke-width="2.6"></line>`;
    } else if (lineInput.value === "y-axis") {
      mirror = `<line x1="${px(0)}" y1="${py(-HALF_HEIGHT)}" x2="${px(0)}" y2="${py(HALF_HEIGHT)}" class="fig-warn" stroke-width="2.6"></line>`;
    } else if (lineInput.value === "y=x") {
      mirror = `<line x1="${px(-HALF_HEIGHT)}" y1="${py(-HALF_HEIGHT)}" x2="${px(HALF_HEIGHT)}" y2="${py(HALF_HEIGHT)}" class="fig-warn" stroke-width="2.6"></line>`;
    } else {
      mirror = `<line x1="${px(-HALF_HEIGHT)}" y1="${py(HALF_HEIGHT)}" x2="${px(HALF_HEIGHT)}" y2="${py(-HALF_HEIGHT)}" class="fig-warn" stroke-width="2.6"></line>`;
    }

    // The dashed connector crosses the mirror line at its midpoint, which is the
    // perpendicular bisector the definition asks for.
    const connector =
      `<line x1="${px(x)}" y1="${py(y)}" x2="${px(ix)}" y2="${py(iy)}" class="fig-warn" stroke-width="1.3" stroke-dasharray="5 4"></line>`;

    const points =
      `<circle cx="${px(x)}" cy="${py(y)}" r="9" class="fig-accent"></circle>` +
      `<circle cx="${px(ix)}" cy="${py(iy)}" r="8" class="fig-warn"></circle>` +
      label({ x: px(x) + 14, y: py(y) - 12, text: "P", size: SIZE.value, class: "text-accent", anchor: "start", weight: "bold" }) +
      label({ x: px(ix) + 14, y: py(iy) - 12, text: "P\u2032", size: SIZE.value, class: "text-warn", anchor: "start", weight: "bold" });

    svg.innerHTML = `${grid}${axes}${mirror}${connector}${points}`;

    readout.textContent =
      `P = (${fmt(x)}, ${fmt(y)}). Reflecting in ${rule.label} gives P\u2032 = (${fmt(ix)}, ${fmt(iy)}). ` +
      (rule.swap
        ? "The two coordinates have swapped, so the point crosses the diagonal line."
        : "One coordinate keeps its value and the other changes sign.");
  }

  react([xInput, yInput, lineInput], update);
}
