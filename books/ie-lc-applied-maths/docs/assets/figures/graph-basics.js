// The parts of a weighted network, explored one vertex at a time.
//
// Section 2.1 names the parts of a network — vertex, edge, weight — and then defines
// the degree of a vertex as the number of edges that meet it. A reader who skims the
// list can repeat all three words without pointing at any of them, and the degree is a
// property of one vertex that is easiest to see with that vertex picked out.
//
// So the six vertices are the six parts: each is a button under the drawing, the
// drawing follows the focus, and the readout gives that vertex's degree and the edges
// that meet it. The buttons are the focus stops, which is `diagram()`'s contract; the
// old chooser did the same job with a drop-down, and the keyboard path through a list
// of parts is one key per part rather than a menu.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes. The whole
// drawing is static — no control changes it — which is what lets it be a `diagram()`.
import { SIZE, circle, diagram, label, line } from "./kit.js";

// A weighted network on six vertices. The weights are road distances in kilometres.
const VERTICES = {
  A: { x: 70, y: 66 },
  B: { x: 250, y: 50 },
  C: { x: 150, y: 176 },
  D: { x: 352, y: 140 },
  E: { x: 250, y: 254 },
  F: { x: 452, y: 218 },
};

const EDGES = [
  ["A", "B", 4],
  ["A", "C", 2],
  ["B", "C", 1],
  ["B", "D", 5],
  ["C", "D", 8],
  ["C", "E", 10],
  ["D", "E", 2],
  ["D", "F", 6],
  ["E", "F", 3],
];

const degree = (v) => EDGES.filter(([a, b]) => a === v || b === v).length;

// A weight sits at the midpoint of its edge, nudged off the line so it does not sit
// on top of it. The nudge is perpendicular to the edge, which keeps it legible
// whichever way the edge runs.
function weightAt(a, b, w) {
  const p = VERTICES[a];
  const q = VERTICES[b];
  const mx = (p.x + q.x) / 2;
  const my = (p.y + q.y) / 2;
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = (-dy / len) * 12;
  const ny = (dx / len) * 12;
  return label({ x: mx + nx, y: my + ny + 5, text: String(w), size: SIZE.value, class: "text-accent" });
}

// One part: the vertex, its name, and the edges that meet it. An edge is shared by two
// vertices, so it is drawn in both parts and the two copies sit exactly on top of each
// other. At rest every part is at full strength, so the shared edge looks like one
// line; when a part is in focus the rest dim, and a shared edge reads as belonging to
// the pair rather than to neither.
function drawVertex(v) {
  const p = VERTICES[v];
  let out = "";
  for (const [a, b, w] of EDGES) {
    if (a !== v && b !== v) continue;
    const q = VERTICES[a];
    const r = VERTICES[b];
    out += line({ x1: q.x, y1: q.y, x2: r.x, y2: r.y, class: "fig-ink", width: 1.5 });
    out += weightAt(a, b, w);
  }
  out += circle({ cx: p.x, cy: p.y, r: 10, class: "fig-ink" });
  out += label({ x: p.x, y: p.y + 6, text: v, size: SIZE.value, class: "text-ink", weight: "bold" });
  return out;
}

function neighbours(v) {
  return EDGES.filter(([a, b]) => a === v || b === v).map(([a, b]) => (a === v ? b : a));
}

export function mount(el) {
  const total = Object.keys(VERTICES).reduce((sum, v) => sum + degree(v), 0);
  const caption =
    `Use Tab to move from vertex to vertex. The six degrees add to ${total}, ` +
    `which is twice the ${EDGES.length} edges.`;

  diagram(el, {
    label: "A weighted network of six vertices and nine edges",
    description:
      "A weighted network of six vertices, named A to F, joined by nine edges. " +
      "Each edge carries a weight, which is a road distance in kilometres. Move " +
      "from vertex to vertex to read the degree of each one.",
    caption,
    width: 560,
    height: 300,
    parts: Object.keys(VERTICES).map((v) => ({
      name: `Vertex ${v}`,
      description:
        `Degree ${degree(v)}: ${degree(v)} edge${degree(v) === 1 ? "" : "s"} meet it, ` +
        `joining it to ${neighbours(v).join(" and ")}.`,
      draw: () => drawVertex(v),
    })),
  });
}
