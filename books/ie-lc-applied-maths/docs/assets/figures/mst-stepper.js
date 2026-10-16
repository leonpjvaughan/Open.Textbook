// Tier-1 guided investigation: Kruskal's and Prim's algorithms on one weighted
// network, side by side so the reader can see them choose differently and agree.
//
// The page asks the reader to predict which edge Kruskal rejects first, to step
// through, and then to run Prim from A and explain why the totals must agree. So the
// figure has to show three things at once: the edges chosen so far, the edge just
// considered (added or rejected), and the running total. A rejected edge is drawn
// dashed as well as in the warning class, so the distinction does not depend on
// colour alone.
//
// The scaffolding — the panel, its accessible name, the chooser, the step slider,
// the readout and the redraw — comes from `kit.js`.
import { SIZE, label, panel, react, chooser, slider } from "./kit.js";

const VERTICES = {
  A: { x: 70, y: 66 },
  B: { x: 250, y: 50 },
  C: { x: 150, y: 176 },
  D: { x: 352, y: 140 },
  E: { x: 250, y: 254 },
  F: { x: 452, y: 218 },
};

// The same network as the section's worked example, so the figure and the text agree.
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

const byId = Object.fromEntries(EDGES.map((e) => [e.id, e]));

// Kruskal: edges in ascending weight order, taken unless they close a cycle.
// Precomputed here so the figure never has to run the algorithm — the reader does.
const KRUSKAL = [
  { id: "BC", add: true },
  { id: "AC", add: true },
  { id: "DE", add: true },
  { id: "EF", add: true },
  { id: "AB", add: false },
  { id: "BD", add: true },
].map((s, i, all) => {
  const chosen = all.slice(0, i + 1).filter((x) => x.add).map((x) => byId[x.id]);
  return { ...s, total: chosen.reduce((sum, e) => sum + e.w, 0) };
});

// Prim from A: the cheapest edge leaving the tree, at each step.
const PRIM = [
  { id: "AC", add: true },
  { id: "BC", add: true },
  { id: "BD", add: true },
  { id: "DE", add: true },
  { id: "EF", add: true },
].map((s, i, all) => {
  const chosen = all.slice(0, i + 1).map((x) => byId[x.id]);
  return { ...s, total: chosen.reduce((sum, e) => sum + e.w, 0) };
});

const REASON = {
  AB: "A, B and C are already joined by AC and BC, so AB would close the cycle A-B-C-A",
};

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A weighted network of six vertices, stepped through Kruskal's or Prim's algorithm one edge at a time",
    width: 560,
    height: 300,
  });

  const which = chooser(el, {
    id: "algorithm",
    label: "Algorithm",
    name: "Choose which algorithm to step through",
    choices: [
      { value: "kruskal", label: "Kruskal" },
      { value: "prim", label: "Prim, from A" },
    ],
    value: "kruskal",
  });

  const step = slider(el, {
    show: true,
    id: "step",
    label: "Step",
    min: 0,
    max: 6,
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
    const steps = which.value === "prim" ? PRIM : KRUSKAL;
    const n = Math.min(Number(step.value), steps.length);
    const done = steps.slice(0, n);
    const chosenIds = new Set(done.filter((s) => s.add).map((s) => s.id));
    const rejectedIds = new Set(done.filter((s) => !s.add).map((s) => s.id));
    const current = n > 0 ? done[n - 1] : null;

    let edges = "";
    for (const e of EDGES) {
      const p = VERTICES[e.a];
      const q = VERTICES[e.b];
      let cls = "fig-ink";
      let width = 1.5;
      let dash = "";
      if (chosenIds.has(e.id)) {
        cls = "fig-accent";
        width = 3.5;
      } else if (rejectedIds.has(e.id)) {
        cls = "fig-warn";
        width = 2;
        dash = ' stroke-dasharray="5 4"';
      }
      edges += `<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" class="${cls}" stroke-width="${width}"${dash}></line>`;
      edges += weightAt(e);
    }

    let vertices = "";
    for (const [v, p] of Object.entries(VERTICES)) {
      vertices += `<circle cx="${p.x}" cy="${p.y}" r="10" class="fig-ink"></circle>`;
      vertices += label({ x: p.x, y: p.y + 6, text: v, size: SIZE.value, class: "text-ink", weight: "bold" });
    }

    svg.innerHTML = `${edges}${vertices}`;

    if (!current) {
      readout.textContent =
        which.value === "prim"
          ? "Prim from A: nothing chosen yet. The tree starts as the single vertex A."
          : "Kruskal: nothing chosen yet. The edges are considered in ascending weight order.";
      return;
    }

    const edge = byId[current.id];
    const total = current.total;
    if (current.add) {
      readout.textContent =
        `${which.value === "prim" ? "Prim" : "Kruskal"} step ${n}: add ${current.id} (weight ${edge.w}). ` +
        `Total so far ${total}.`;
    } else {
      readout.textContent =
        `Kruskal step ${n}: reject ${current.id} (weight ${edge.w}) — ${REASON[current.id]}. ` +
        `Total unchanged at ${total}.`;
    }
  }

  react([which, step], update);
}
