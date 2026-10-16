// Tier-1 guided investigation: Dijkstra's algorithm, one settlement at a time.
//
// The page asks the reader to predict the shortest distance from A to F, to step
// through and check, and then to explain why the algorithm could settle the second
// vertex so early. So the figure has to show the tentative distances changing — that
// is the whole idea — and mark which vertices are settled and which are only guessed.
//
// Settled vertices are drawn in the accent class and unsettled ones in ink, and the
// distance beside each vertex changes as the algorithm improves its guesses. The
// edge that gave each settled vertex its final distance is drawn thick, so the
// shortest-path tree is visible by the end.
//
// The scaffolding comes from `kit.js`. What is left is the drawing and the sentences.
import { SIZE, label, panel, react, slider } from "./kit.js";

const VERTICES = {
  A: { x: 70, y: 66 },
  B: { x: 250, y: 50 },
  C: { x: 150, y: 176 },
  D: { x: 352, y: 140 },
  E: { x: 250, y: 254 },
  F: { x: 452, y: 218 },
};

const EDGES = [
  { id: "AB", a: "A", b: "B", w: 4 },
  { id: "AC", a: "A", b: "C", w: 2 },
  { id: "BC", a: "B", b: "C", w: 1 },
  { id: "BD", a: "B", b: "D", w: 5 },
  { id: "CD", a: "C", b: "D", w: 8 },
  { id: "CE", a: "C", b: "E", w: 10 },
  { id: "DE", a: "D", b: "E", w: 2 },
  { id: "DF", a: "D", b: "F", w: 6 },
  { id: "EF", a: "E", b: "F", w: 3 },
];

// Each step settles one vertex and records the tentative distances afterwards, and
// the edge through which the settled vertex was reached.
const STEPS = [
  { settled: [], dist: { A: 0 }, via: null, note: "Start: A is 0, every other vertex is unknown." },
  { settled: ["A"], dist: { A: 0, B: 4, C: 2 }, via: null, note: "Settle A (0). Its neighbours become tentative: B = 4, C = 2." },
  { settled: ["A", "C"], dist: { A: 0, B: 3, C: 2, D: 10, E: 12 }, via: "AC", note: "Settle C (2), the nearest unsettled vertex. B improves to 3; D = 10 and E = 12 through C." },
  { settled: ["A", "C", "B"], dist: { A: 0, B: 3, C: 2, D: 8, E: 12 }, via: "BC", note: "Settle B (3). D improves from 10 to 8 through B." },
  { settled: ["A", "C", "B", "D"], dist: { A: 0, B: 3, C: 2, D: 8, E: 10, F: 14 }, via: "BD", note: "Settle D (8). E improves to 10; F becomes tentative at 14." },
  { settled: ["A", "C", "B", "D", "E"], dist: { A: 0, B: 3, C: 2, D: 8, E: 10, F: 13 }, via: "DE", note: "Settle E (10). F improves from 14 to 13." },
  { settled: ["A", "C", "B", "D", "E", "F"], dist: { A: 0, B: 3, C: 2, D: 8, E: 10, F: 13 }, via: "EF", note: "Settle F (13). Every vertex is settled; the shortest distance from A to F is 13." },
];

const byId = Object.fromEntries(EDGES.map((e) => [e.id, e]));

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A weighted network with the shortest distance from A to every vertex, stepped through Dijkstra's algorithm",
    width: 560,
    height: 300,
  });

  const step = slider(el, {
    show: true,
    id: "step",
    label: "Step",
    min: 0,
    max: STEPS.length - 1,
    step: 1,
    value: 0,
  });

  function weightAt(e) {
    const p = VERTICES[e.a];
    const q = VERTICES[e.b];
    const mx = (p.x + q.x) / 2;
    const my = (p.y + q.y) / 2;
    const dx = q.x - p.x;
    const dy = q.y - p.y;
    const len = Math.hypot(dx, dy) || 1;
    return label({
      x: mx + (-dy / len) * 12,
      y: my + (dx / len) * 12 + 5,
      text: String(e.w),
      size: SIZE.value,
      class: "text-accent",
    });
  }

  function update() {
    const i = Math.min(Number(step.value), STEPS.length - 1);
    const s = STEPS[i];
    const settled = new Set(s.settled);

    // The edges of the shortest-path tree so far: the edge each settled vertex was
    // reached through, one per settled vertex (except the start).
    const tree = new Set(STEPS.slice(1, i + 1).map((x) => x.via).filter(Boolean));

    let edges = "";
    for (const e of EDGES) {
      const p = VERTICES[e.a];
      const q = VERTICES[e.b];
      const on = tree.has(e.id);
      edges += `<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" class="${on ? "fig-accent" : "fig-ink"}" stroke-width="${on ? 3.5 : 1.5}"></line>`;
      edges += weightAt(e);
    }

    let vertices = "";
    for (const [v, p] of Object.entries(VERTICES)) {
      const on = settled.has(v);
      vertices += `<circle cx="${p.x}" cy="${p.y}" r="${on ? 13 : 10}" class="${on ? "fig-accent" : "fig-ink"}"></circle>`;
      vertices += label({ x: p.x, y: p.y + 6, text: v, size: SIZE.value, class: "text-ink", weight: "bold" });
      // The tentative distance, beside the vertex. `∞` until it is reachable.
      const d = s.dist[v];
      vertices += label({
        x: p.x + 18,
        y: p.y - 12,
        text: d === undefined ? "∞" : String(d),
        size: SIZE.value,
        class: on ? "text-accent" : "text-ink",
        anchor: "start",
      });
    }

    svg.innerHTML = `${edges}${vertices}`;
    readout.textContent = `Step ${i}: ${s.note}`;
  }

  react([step], update);
}
