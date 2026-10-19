// Tier-1 guided investigation: the shape of the magnetic field around one bar
// magnet, and what happens when two magnets are brought close together.
//
// The page asks the reader to predict the field pattern between two like poles
// and between two unlike poles, then to test each arrangement here, then to
// explain the difference. So the figure has to make the *interaction* visible:
// the field lines are traced through the combined field of every pole, so the
// repulsion of two north poles and the joining of a north to a south are drawn
// rather than asserted.
//
// Nothing here carries a colour. The lines use the accent class and the magnets
// the ink class, so the figure follows the reader's bundle and both schemes.
//
// The scaffolding — the panel, its accessible name, the chooser, the readout and
// the redraw — comes from `kit.js`. What is left is the drawing and the words.
import { SIZE, label, panel, chooser, react } from "./kit.js";

const WIDTH = 460;
const HEIGHT = 250;

// Each magnet is a rectangle in SVG units, with the pole that is its north end.
// A bar magnet's poles sit near its ends, so the pole points are inset a little.
const MAGNETS = {
  single: [{ x0: 196, y0: 100, x1: 264, y1: 150, north: "right" }],
  like: [
    { x0: 126, y0: 100, x1: 194, y1: 150, north: "right" },
    { x0: 266, y0: 100, x1: 334, y1: 150, north: "left" },
  ],
  unlike: [
    { x0: 126, y0: 100, x1: 194, y1: 150, north: "right" },
    { x0: 266, y0: 100, x1: 334, y1: 150, north: "right" },
  ],
};

const SUMMARY = {
  single:
    "The field lines run from the north pole to the south pole. They are closest together at the poles, where the field is strongest, and they never cross.",
  like:
    "Like poles repel. The field lines from the two north poles curve away from each other, and the field between the poles is weak.",
  unlike:
    "Unlike poles attract. The field lines run from the north pole of one magnet to the south pole of the other, joining the two magnets into one field.",
};

// The pole points of one magnet, in SVG coordinates.
function polesOf(magnet) {
  const cy = (magnet.y0 + magnet.y1) / 2;
  const inset = 12;
  if (magnet.north === "right") {
    return [
      { x: magnet.x1 - inset, y: cy, q: 1 },
      { x: magnet.x0 + inset, y: cy, q: -1 },
    ];
  }
  return [
    { x: magnet.x0 + inset, y: cy, q: 1 },
    { x: magnet.x1 - inset, y: cy, q: -1 },
  ];
}

function allPoles(arrangement) {
  return MAGNETS[arrangement].flatMap(polesOf);
}

// The field of a set of point poles. A pole is a source or a sink, so the field
// at a point falls off with the square of the distance and points away from a
// north pole and towards a south pole.
function fieldAt(poles, x, y) {
  let bx = 0;
  let by = 0;
  for (const p of poles) {
    const dx = x - p.x;
    const dy = y - p.y;
    const r2 = dx * dx + dy * dy;
    const r = Math.sqrt(r2) || 0.001;
    const k = p.q / (r2 * r);
    bx += k * dx;
    by += k * dy;
  }
  return [bx, by];
}

// Follow the field from a starting point until it leaves the drawing or reaches
// a south pole. The step is small and the count is capped, so a pathological
// field cannot loop forever.
function traceLine(poles, start) {
  const points = [[start.x, start.y]];
  let x = start.x;
  let y = start.y;
  const step = 2.5;
  for (let i = 0; i < 500; i += 1) {
    const [bx, by] = fieldAt(poles, x, y);
    const magnitude = Math.hypot(bx, by);
    if (magnitude < 1e-9) break;
    x += (bx / magnitude) * step;
    y += (by / magnitude) * step;
    if (x < 5 || x > WIDTH - 5 || y < 5 || y > HEIGHT - 5) break;
    let reached = false;
    for (const p of poles) {
      if (p.q < 0 && Math.hypot(p.x - x, p.y - y) < 6) {
        points.push([p.x, p.y]);
        reached = true;
        break;
      }
    }
    if (reached) break;
    points.push([x, y]);
  }
  return points;
}

function pathFrom(points) {
  return points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Field lines around one bar magnet and around two bar magnets",
    prompt: "Choose an arrangement, then watch what the field lines do between the poles.",
    width: WIDTH,
    height: HEIGHT,
  });

  const choose = chooser(el, {
    id: "arrangement",
    label: "Arrangement",
    choices: [
      { value: "single", label: "One magnet" },
      { value: "like", label: "Two north poles facing" },
      { value: "unlike", label: "North facing south" },
    ],
  });

  function update() {
    const arrangement = choose.value;
    const poles = allPoles(arrangement);

    // Start a line just outside each north pole, at even angles around it. The
    // line then follows the field, so the pattern is drawn by the physics rather
    // than placed by hand.
    const starts = [];
    for (const p of poles) {
      if (p.q <= 0) continue;
      for (let i = 0; i < 16; i += 1) {
        const angle = (2 * Math.PI * i) / 16;
        starts.push({ x: p.x + 7 * Math.cos(angle), y: p.y + 7 * Math.sin(angle) });
      }
    }

    let lines = "";
    for (const start of starts) {
      const points = traceLine(poles, start);
      if (points.length < 3) continue;
      lines += `<path d="${pathFrom(points)}" style="fill:none" class="fig-accent" stroke-width="1.3" marker-end="url(#bar-magnet-arrow)"></path>`;
    }

    let bodies = "";
    for (const magnet of MAGNETS[arrangement]) {
      bodies += `<rect x="${magnet.x0}" y="${magnet.y0}" width="${magnet.x1 - magnet.x0}" height="${magnet.y1 - magnet.y0}" rx="3" class="fig-ink"></rect>`;
      const cy = (magnet.y0 + magnet.y1) / 2;
      const nX = magnet.north === "right" ? magnet.x1 - 12 : magnet.x0 + 12;
      const sX = magnet.north === "right" ? magnet.x0 + 12 : magnet.x1 - 12;
      bodies += label({ x: nX, y: cy + 6, text: "N", size: SIZE.value, class: "text-ink" });
      bodies += label({ x: sX, y: cy + 6, text: "S", size: SIZE.value, class: "text-ink" });
    }

    const defs = `<defs><marker id="bar-magnet-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto"><path d="M 0 1 L 9 5 L 0 9 z" class="fig-accent"></path></marker></defs>`;

    svg.innerHTML = `${defs}${lines}${bodies}`;
    readout.textContent = SUMMARY[arrangement];
  }

  react([choose], update);
}
