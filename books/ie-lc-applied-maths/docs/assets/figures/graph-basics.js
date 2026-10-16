// Tier-1 guided investigation: a weighted network, and the degree of a vertex.
//
// The page asks the reader to choose a vertex and read its degree, then to check the
// handshake lemma against the whole network. So the figure has to do two things: show
// which edges touch the chosen vertex, and show the weights, because the weights are
// what make it a *weighted* network rather than a bare graph.
//
// Nothing here carries a colour. The chosen vertex and its edges are drawn in the
// accent class and every other edge in the ink class, so the distinction is a class
// difference and survives every bundle. The weights use a different class again, so a
// weight is never mistaken for a vertex name.
//
// The scaffolding — the panel, its accessible name, the chooser, the readout and the
// redraw — comes from `kit.js`. What is left is the drawing and the sentences.
import { SIZE, label, panel, react, chooser } from "./kit.js";

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

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A weighted network of six vertices and nine edges, with the degree of the chosen vertex shown",
    width: 560,
    height: 300,
  });

  const pick = chooser(el, {
    id: "vertex",
    label: "Vertex",
    name: "Choose a vertex to read its degree",
    choices: Object.keys(VERTICES).map((v) => ({ value: v, label: v })),
    value: "C",
  });

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

  function update() {
    const chosen = pick.value;

    let edges = "";
    for (const [a, b, w] of EDGES) {
      const p = VERTICES[a];
      const q = VERTICES[b];
      const touches = a === chosen || b === chosen;
      edges += `<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" class="${touches ? "fig-accent" : "fig-ink"}" stroke-width="${touches ? 3.5 : 1.5}"></line>`;
      edges += weightAt(a, b, w);
    }

    let vertices = "";
    for (const [v, p] of Object.entries(VERTICES)) {
      const on = v === chosen;
      vertices += `<circle cx="${p.x}" cy="${p.y}" r="${on ? 13 : 10}" class="${on ? "fig-accent" : "fig-ink"}"></circle>`;
      vertices += label({ x: p.x, y: p.y + 6, text: v, size: SIZE.value, class: "text-ink", weight: "bold" });
    }

    svg.innerHTML = `${edges}${vertices}`;

    const total = Object.keys(VERTICES).reduce((sum, v) => sum + degree(v), 0);
    readout.textContent =
      `Vertex ${chosen} has degree ${degree(chosen)}: ${degree(chosen)} edges meet it. ` +
      `The degrees of all six vertices add to ${total}, which is 2 × ${EDGES.length} = ${2 * EDGES.length}, the number of edges counted twice.`;
  }

  react([pick], update);
}
