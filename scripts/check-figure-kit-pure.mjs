// Check the figure kit's **pure** layer, with no browser.
//
// `scripts/check-figure-kit.cjs` checks the kit through a real page, because most of
// the contract is DOM behaviour — a role, a live region, a focus stop. But the drawing
// and formatting layers are pure functions returning strings and numbers, and they are
// the ones a module composes hundreds of times. Checking them in a browser means they
// are only checked when Playwright is configured, which is not the ordinary gate.
//
// So this runs under plain `node` and is called from `tests/test_figure_kit_pure.py`.
// It imports `assets/figures/kit.js` directly, so it checks the source rather than a
// build — the drawing layer has no build step.
//
// Usage: node scripts/check-figure-kit-pure.mjs [kitPath]
// Exit 0 when every pure guarantee holds, 1 when one does not.

const kitPath = process.argv[2] || new URL("../assets/figures/kit.js", import.meta.url).href;
const kit = await import(kitPath);

const problems = [];
const want = (what, got, expected) => {
  const a = JSON.stringify(got);
  const b = JSON.stringify(expected);
  if (a !== b) problems.push(`${what}: expected ${b}, got ${a}`);
};
const wantMatch = (what, got, pattern) => {
  if (!pattern.test(String(got))) problems.push(`${what}: ${String(got).slice(0, 90)} does not match ${pattern}`);
};

// ── text ──────────────────────────────────────────────────────────────────────
//
// `sigfig` is the reader's side of the bank's `sigfigs` check. A rounded answer is a
// claim about how much of the measurement is real, so `6`, `6.0` and `6.00` are three
// statements and only one is right.
want("sigfig keeps a significant trailing zero", kit.sigfig(6, 2), "6.0");
want("sigfig pads a half", kit.sigfig(0.5, 2), "0.50");
want("sigfig rounds", kit.sigfig(3.14159, 3), "3.14");
want("sigfig keeps a small value in place value", kit.sigfig(0.0012, 2), "0.0012");
want("sigfig goes scientific when zeros would hold the place", kit.sigfig(300, 2), "3.0e2");
want("sigfig of zero", kit.sigfig(0, 2), "0.0");
want("sigfig of a non-number is a dash, not NaN", kit.sigfig(NaN), "—");
want("fmt drops a trailing zero", kit.fmt(2.0), "2");
want("fmt of a non-number is a dash", kit.fmt(Infinity), "—");
want("fmt ignores a map index", [1.23456, 7.89012].map(kit.fmt).join(" "), "1.23 7.89");
want("signed spaces a positive term", kit.signed(3), "+ 3");
want("signed spaces a negative term", kit.signed(-3.5), "− 3.5");
want("coord rounds", kit.coord(183.99999999999997), "184.0");
want("escape closes the unsafe characters", kit.escape("a & b < c"), "a &amp; b &lt; c");

// ── geometry ──────────────────────────────────────────────────────────────────
want("extent of nothing is a usable domain", kit.extent([]), [0, 1]);
want("extent of one value is not zero-width", kit.extent([3, 3]), [3, 4]);
want("extent of several", kit.extent([1, 5, 2]), [1, 5]);
want("extent reads a picked field", kit.extent([{ v: 4 }, { v: -1 }], (d) => d.v), [-1, 4]);
want("ticks on 0..1", kit.ticks({ from: 0, to: 1, count: 5 }), [0, 0.2, 0.4, 0.6, 0.8, 1]);
want("ticks on 0..10", kit.ticks({ from: 0, to: 10, count: 6 }), [0, 2, 4, 6, 8, 10]);
want("ticks on 0..0.5", kit.ticks({ from: 0, to: 0.5, count: 5 }), [0, 0.1, 0.2, 0.3, 0.4, 0.5]);
want("ticks on a span with no width", kit.ticks({ from: 3, to: 3 }), [3]);

const up = kit.scale({ domain: [0, 10], range: [100, 500] });
want("scale maps the low end", up(0), 100);
want("scale maps the middle", up(5), 300);
want("scale maps the high end", up(10), 500);
want("scale.invert undoes it", [up.invert(100), up.invert(500)], [0, 10]);
const down = kit.scale({ domain: [0, 10], range: [400, 40] });
want("scale handles a range that counts down", [down(0), down(10)], [400, 40]);
want("scale.invert handles a range that counts down", [down.invert(400), down.invert(40)], [0, 10]);
const roundTrip = up.invert(up(3.7));
if (Math.abs(roundTrip - 3.7) > 1e-9) problems.push(`scale().invert does not round-trip: ${roundTrip}`);
let threw = "";
try {
  kit.scale({ domain: [3, 3], range: [0, 1] });
} catch (error) {
  threw = error.message;
}
wantMatch("scale refuses a domain with no width", threw, /no width/);

// ── marks ─────────────────────────────────────────────────────────────────────
//
// Every mark defaults its colour class and rounds its coordinates. The class is what
// keeps a shape out of the initial paint — the same defect that made eighteen `<text>`
// elements invisible on a dark panel — and the rounding is what stopped 44 modules
// shipping `183.99999999999997` into a reader's markup.
const marks = {
  line: kit.line({ x1: 0, y1: 0, x2: 10, y2: 10 }),
  circle: kit.circle({ cx: 5, cy: 5 }),
  rect: kit.rect({ x: 0, y: 0, width: 10, height: 4 }),
  polygon: kit.polygon({ points: [[0, 0], [10, 0], [5, 8]] }),
  path: kit.path({ d: "M0 0 L10 10" }),
  arrow: kit.arrow({ x1: 0, y1: 0, x2: 30, y2: 0 }),
};
for (const [name, markup] of Object.entries(marks)) {
  if (!markup) {
    problems.push(`the ${name} mark draws nothing`);
    continue;
  }
  if (!markup.includes('class="fig-ink"')) {
    problems.push(`the ${name} mark has no default colour class`);
  }
  if (/\d\.\d{3,}/.test(markup)) {
    problems.push(`the ${name} mark ships a coordinate with more than one decimal place`);
  }
}
wantMatch("arrow draws a head", marks.arrow, /<polygon/);
wantMatch(
  "arrow stops the shaft at the head",
  marks.arrow,
  /<line x1="0\.0" y1="0\.0" x2="20\.0" y2="0\.0"[^>]*><\/line><polygon/,
);

const frame = kit.axes({ x: { domain: [0, 10], label: "t" }, y: { domain: [0, 5], label: "s" } });
want("axes returns its mappers as well as its string", Object.keys(frame).sort(), ["box", "draw", "x", "xTicks", "y", "yTicks"]);
wantMatch("axes draws tick labels", frame.draw, /<text /);
wantMatch("axes draws a tick per tick value", frame.draw, /class="fig-ink"/);
want("axes maps through the box", [frame.x(0) < frame.x(10), frame.y(0) > frame.y(5)], [true, true]);

const nl = kit.numberLine({ min: -5, max: 5 });
want("numberLine returns its mapper", Object.keys(nl).sort(), ["box", "draw", "x", "y"]);
wantMatch("numberLine draws an axis arrow", nl.draw, /<polygon/);

want("curve of nothing is empty, not a broken path", kit.curve([], { x: (v) => v, y: (v) => v }), "");
wantMatch(
  "curve maps its points in order",
  kit.curve([[0, 0], [1, 1], [2, 4]], { x: (v) => v * 10, y: (v) => v * 2 }),
  /^<path d="M0\.0 0\.0 L10\.0 2\.0 L20\.0 8\.0"/,
);
const broken = kit.graph((t) => (t === 0.5 ? NaN : t), {
  x: kit.scale({ domain: [0, 1], range: [0, 100] }),
  y: kit.scale({ domain: [0, 1], range: [100, 0] }),
  samples: 5,
});
if (/NaN/.test(broken)) problems.push("graph() puts a NaN into the path, which drops the whole line");
if (broken.split("M").length - 1 < 2) problems.push("graph() does not break the path at a non-finite sample");
wantMatch("graph samples a function", kit.graph((t) => t * t, {
  x: kit.scale({ domain: [0, 1], range: [0, 100] }),
  y: kit.scale({ domain: [0, 1], range: [100, 0] }),
}), /^<path d="M/);
wantMatch("area closes a filled region", kit.area([[0, 0], [1, 1], [2, 0]], { x: (v) => v, y: (v) => v, baseline: 0 }), /currentColor/);
wantMatch("dots draws a circle per point", kit.dots([[0, 0], [1, 1]], { x: (v) => v, y: (v) => v }), /^<circle/);
want("bars draws one rect per item",
  (kit.bars([{ from: 0, to: 1, value: 5 }, { from: 1, to: 2, value: 8 }], { x: (v) => v * 50, y: (v) => v * 10 }).match(/<rect/g) || []).length,
  2,
);

// `venn()` places each region's label by geometry, because **an atom in the wrong
// region teaches the opposite of the truth**. The invariant is checked directly: for
// every region of a two-set and a three-set diagram, the point `venn()` chose must be
// inside exactly the circles the region declares.
function vennIsSound(circles, regions) {
  const diagram = kit.venn({ circles, regions, labels: false, rings: false });
  const wrong = [];
  for (const region of regions) {
    const point = diagram.points[region.id];
    if (!point) {
      wrong.push(`${region.id} was never placed`);
      continue;
    }
    const inside = circles
      .filter((c) => Math.hypot(point.x - c.cx, point.y - c.cy) <= c.r)
      .map((c) => c.id)
      .sort()
      .join("");
    const declared = (region.in || []).slice().sort().join("");
    if (inside !== declared) wrong.push(`${region.id} landed in ${inside || "nothing"}, not ${declared || "nothing"}`);
  }
  return wrong;
}
const twoSets = [{ id: "A", cx: 250, cy: 148, r: 88 }, { id: "B", cx: 320, cy: 148, r: 88 }];
const twoRegions = [
  { id: "a", in: ["A"], out: ["B"] },
  { id: "ab", in: ["A", "B"] },
  { id: "b", in: ["B"], out: ["A"] },
  { id: "outside", out: ["A", "B"] },
];
const threeSets = [
  { id: "A", cx: 280, cy: 126, r: 82 },
  { id: "B", cx: 228, cy: 204, r: 82 },
  { id: "C", cx: 332, cy: 204, r: 82 },
];
const letters = ["A", "B", "C"];
const threeRegions = [];
for (let mask = 0; mask < 8; mask += 1) {
  const inside = letters.filter((_, i) => mask & (1 << i));
  threeRegions.push({ id: inside.join("") || "outside", in: inside, out: letters.filter((l) => !inside.includes(l)) });
}
for (const [what, circles, regions] of [["two", twoSets, twoRegions], ["three", threeSets, threeRegions]]) {
  const wrong = vennIsSound(circles, regions);
  if (wrong.length) {
    problems.push(`venn() places a ${what}-set region wrongly, which would print a false diagram: ${wrong.join("; ")}`);
  }
}
want(
  "venn draws a ring per set and a frame",
  (kit.venn({ circles: twoSets, regions: twoRegions, labels: false }).draw.match(/<circle|<rect/g) || []).length,
  3,
);
wantMatch("label escapes and carries a class", kit.label({ x: 0, y: 0, text: "a & b" }), /class="text-ink">a &amp; b</);
wantMatch("label honours its anchor and size", kit.label({ x: 0, y: 0, text: "0", anchor: "end", size: 18 }), /font-size="18" text-anchor="end"/);
want(
  "every SIZE is one of four named values",
  Object.values(kit.SIZE).sort((a, b) => a - b),
  [16, 16, 18, 20],
);

// ── randomness ────────────────────────────────────────────────────────────────
//
// A figure that samples must be reproducible, or two readers comparing what they saw
// are comparing different data.
want("a seed repeats", kit.seed(7).next(), kit.seed(7).next());
want("a different seed differs", kit.seed(7).next() !== kit.seed(8).next(), true);
want("a seeded integer stays in range", (() => {
  const rng = kit.seed(1);
  let low = 9;
  let high = 0;
  for (let i = 0; i < 400; i += 1) {
    const n = rng.int(1, 6);
    low = Math.min(low, n);
    high = Math.max(high, n);
  }
  return [low, high];
})(), [1, 6]);
want("a seeded shuffle keeps every item", kit.seed(3).shuffle([1, 2, 3, 4, 5]).slice().sort(), [1, 2, 3, 4, 5]);
want("a seeded shuffle is deterministic", kit.seed(3).shuffle([1, 2, 3, 4, 5]), kit.seed(3).shuffle([1, 2, 3, 4, 5]));

// ── checking ──────────────────────────────────────────────────────────────────
//
// Four outcomes, and the difference between the last two matters to a reader: "wrong"
// is a mistake worth thinking about, "invalid" is a typing problem that needs none.
const states = [
  kit.check("6", { answer: "6.0" }).state,
  kit.check("7", { answer: "6.0" }).state,
  kit.check("", { answer: "6" }).state,
  kit.check("abc", { answer: "6" }).state,
  kit.check("6.02", { answer: "6.0", tolerance: 0.01 }).state,
  kit.check("6.005", { answer: "6.0", tolerance: 0.01 }).state,
  kit.check("6.0 N", { answer: "6.0", unit: "N" }).state,
  kit.check("1/2", { answer: "0.5" }).state,
  kit.check("2/3", { answer: "0.667", tolerance: 0.001 }).state,
  kit.check("1/0", { answer: "0.5" }).state,
  kit.check("acute", { answer: "acute" }).state,
  kit.check("obtuse", { answer: "acute" }).state,
  kit.check("−3", { answer: "-3" }).state,
  kit.check("$6$", { answer: "6" }).state,
];
want("the verdicts of check()", states, [
  "correct",
  "wrong",
  "empty",
  "invalid",
  "wrong",
  "correct",
  "correct",
  "correct",
  "correct",
  "invalid",
  "correct",
  "wrong",
  "correct",
  "correct",
]);

// ── a vector field ─────────────────────────────────────────────────────────────
//
// Six modules in one book hand-build this, and the two things they re-derive are the
// arrow's direction and the SVG y-axis, which counts the other way. A field that points
// the wrong way on one axis is a false diagram.
const fieldAxes = kit.axes({ x: { domain: [-1, 1] }, y: { domain: [-1, 1] } });
function fieldDirections(field) {
  const markup = kit.vectorField({ field, x: fieldAxes.x, y: fieldAxes.y, box: fieldAxes.box, step: 60, length: 16 });
  return [...markup.matchAll(/<line x1="([\d.-]+)" y1="([\d.-]+)" x2="([\d.-]+)" y2="([\d.-]+)"/g)].map((m) => ({
    dx: Number(m[3]) - Number(m[1]),
    dy: Number(m[4]) - Number(m[2]),
  }));
}
const east = fieldDirections(() => [1, 0]);
if (!east.length) problems.push("vectorField draws nothing");
if (!east.every((d) => d.dx > 0)) problems.push("vectorField draws a +x field pointing the wrong way");
const north = fieldDirections(() => [0, 1]);
if (!north.every((d) => d.dy < 0)) {
  problems.push(
    "vectorField draws a +y field pointing down the screen. The y-axis counts the other " +
      "way in SVG, and the direction has to go through the mappers to come out right.",
  );
}

// ── a camera for small 3D drawings ─────────────────────────────────────────────
//
// The rule is the one a textbook uses: a solid's hidden edges are the ones whose every
// face is turned away. A cube has exactly three, and a primitive that drew four or two
// would make every 3D figure in the collection wrong in the same way.
const cube = {
  vertices: [
    [-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1],
    [-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1],
  ],
  // Deliberately inconsistent winding, to check that the outward orientation is what
  // decides visibility rather than the order a module happened to write its vertices.
  faces: [
    { indices: [0, 1, 2, 3] }, { indices: [4, 5, 6, 7] }, { indices: [0, 1, 5, 4] },
    { indices: [2, 3, 7, 6] }, { indices: [1, 2, 6, 5] }, { indices: [0, 3, 7, 4] },
  ],
  edges: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]].map(
    (between) => ({ between }),
  ),
};
const cam = kit.camera3d({ width: 560, height: 300 });
const wire = cam.drawMesh(cube);
if ((wire.match(/<line/g) || []).length !== 12) problems.push("camera3d does not draw a cube's twelve edges");
// Three dashed edges among the twelve: the three incident to the hidden vertex.
// Excluding a stroke-width of 2 from the count is awkward, so count the dash arrays.
const ruled = kit.line({ x1: 0, y1: 0, x2: 1, y2: 1 });
const bare = (wire.match(/<line/g) || []).length;
const dashed = (wire.match(/stroke-dasharray/g) || []).length;
if (ruled.includes("stroke-dasharray")) problems.push("the line mark carries a dash by default");
if (dashed !== 3) {
  problems.push(
    `camera3d hides ${dashed} of a cube's ${bare} edges; a cube has exactly three hidden ` +
      "ones, and the rule is that every face containing an edge is turned away",
  );
}
const ys = [...wire.matchAll(/y1="([\d.-]+)"/g)].map((m) => Number(m[1]));
if (Math.min(...ys) < 0 || Math.max(...ys) > 300) {
  problems.push(`camera3d draws outside its box: y from ${Math.min(...ys)} to ${Math.max(...ys)}`);
}
if (/NaN/.test(wire)) problems.push("camera3d writes a NaN coordinate");
if (!(wire.match(/<path/g) || []).length && cam.drawMesh({ ...cube, fill: true }).match(/<path/g)) {
  // informational only: a wireframe declares no faces to fill
}
if ((cam.drawMesh({ ...cube, fill: true }).match(/<path/g) || []).length !== 6) {
  problems.push("camera3d does not fill a cube's six faces");
}
if (!cam.project([0, 0, 0])) problems.push("camera3d has no project()");

// ── a generated question ───────────────────────────────────────────────────────
//
// The claim here is **internal consistency, not verification**: the answer is computed
// by the same function that wrote the question, so they cannot disagree. What can be
// checked is that it is deterministic, that a different seed differs, and that the
// answer agrees with the numbers the question states.
const kinds = [
  {
    id: "hcf",
    build(rng) {
      const a = rng.int(2, 12) * 4;
      const b = rng.int(2, 12) * 6;
      const hcf = (x, y) => (y ? hcf(y, x % y) : x);
      return { text: `Find the highest common factor of ${a} and ${b}.`, answer: hcf(a, b) };
    },
  },
];
const one = kit.exercise({ kinds, seed: 5 });
const two = kit.exercise({ kinds, seed: 5 });
want("a regenerated question is the same question", one.text, two.text);
want("and the same answer", one.answer, two.answer);
if (kit.exercise({ kinds, seed: 6 }).text === one.text) problems.push("a different seed gives the same question");
let disagree = 0;
for (let s = 1; s <= 300; s += 1) {
  const quiz = kit.exercise({ kinds, seed: s });
  const a = Number(quiz.text.match(/of (\d+)/)[1]);
  const b = Number(quiz.text.match(/and (\d+)/)[1]);
  const hcf = (x, y) => (y ? hcf(y, x % y) : x);
  if (hcf(a, b) !== Number(quiz.answer)) disagree += 1;
}
if (disagree) {
  problems.push(
    `a generated answer disagrees with the numbers in its own question, in ${disagree} of ` +
      "300 seeds. The only thing a generator claims is that the two cannot disagree.",
  );
}

if (problems.length) {
  console.error("the figure kit's pure layer does not keep its contract:");
  for (const problem of problems) console.error(`   ${problem}`);
  process.exit(1);
}
console.log("figure kit (pure): contract kept");
