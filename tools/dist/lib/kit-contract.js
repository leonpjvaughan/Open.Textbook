/*
 * The figure kit's contract, as **one table**, run by two runners.
 *
 * There used to be two hand-written lists of the same contract. `tools kit` ran 54
 * assertions inside a real page, because most of the kit's promises are DOM behaviour —
 * a role, a live region that can announce a value, one focus stop per control. `tools
 * kit-pure` ran 43 under plain `node`, because the drawing and formatting layers are
 * pure functions and checking them only where Playwright is configured means checking
 * them only sometimes. Thirteen strings appeared verbatim in both files, and 28 checks
 * existed in only one — and *which* tier a control was checked in was a decision nobody
 * had recorded anywhere, so nothing could tell you that `toggle()` had no check at all
 * and that `SIZE` was checked twice, differently.
 *
 * So the list lives here once. Each row says what must hold, which tier runs it, which
 * kit export it is about, and how to see the answer. Two runners read the same rows:
 *
 *   * `tools kit-pure` runs every `pure` and `both` row under `node`;
 *   * `tools kit site` runs every `dom` and `both` row in a real page — through the
 *     `maths-figure` element the loader hands a module, because that is the environment
 *     a control actually lives in.
 *
 * This module is **served to the page** as well as imported by the command (`kit.ts`
 * intercepts `/__kit-contract.js`), so it must stay dependency-free at runtime: it
 * imports nothing, and every `call` may close over this module's own constants, which
 * the page loads too. That is what makes the table the same table in both runtimes
 * rather than two copies of a table that agree today.
 *
 * ## The tiers, and what a tier means
 *
 * | tier | runs in | why it is there |
 * |---|---|---|
 * | `pure` | `node` | a claim about a pure function, and only `kit-pure` ever made it |
 * | `dom` | the browser | a claim that needs an element, a layout or a pointer |
 * | `both` | both | an assertion the two commands already agreed on |
 *
 * `both` is not "the important ones". It is the record of what was *already* checked
 * twice: a pure function whose answer both commands asserted, e.g. `sigfig(6, 2)` is
 * `"6.0"`. Running it in the page too costs nothing and proves the module graph the
 * browser actually loads exports the same thing the `node` import does.
 *
 * A row whose `tier` is none of those three would run in neither runner — the exact
 * silence this table exists to end — so `coverageProblems` reports it, and the run
 * fails.
 *
 * ## The shape of a row
 *
 * ```ts
 * { name: "label() escapes its text", tier: "both", covers: "label",
 *   call: (kit) => kit.label({ x: 0, y: 0, text: "a & b < c" }),
 *   expect: /a &amp; b &lt; c/ }
 * ```
 *
 * `name` is the failure message, so it says what must hold rather than what is tested.
 * `covers` names the kit export (or exports) the row is about, which is what lets the
 * report answer "which export has no contract at all" — the question that found
 * `toggle`, `chooser` and `UI_FONT` with none.
 *
 * `expect` is one of three things: a **value**, compared by its JSON form (the kit's
 * answers are strings, numbers, booleans and arrays of those); a **RegExp**, matched
 * against the string form; or a **predicate**, for an answer that has to be reasoned
 * about — a float round-trip, a size computed from a measurement, a set of regions that
 * must all be sound. A predicate carries `because`, the sentence that explains what a
 * failure means, because "got 0.30000000000000004" is not a diagnosis.
 */
/** Every tier a runner reads. A row with any other value runs nowhere, and is reported. */
export const TIERS = ["pure", "dom", "both"];
// ── the size scale, grounded in a measurement ────────────────────────────────
//
// At a 390px viewport the `maths-figure` element is 358px wide but carries 17.6px of
// padding on each side, so the drawing is 322.8px and a 560-unit viewBox draws at
// 322.8 / 560 = 0.576. The smallest named size must clear 9px at that scale; four
// figures drifted below it while every one of their own attributes looked reasonable.
// `audit site --mobile` measures what reaches the screen; this checks the arithmetic
// the modules are told to rely on, and it is the *drawing's* width, not the element's:
// the earlier figure here was 358/560, which passed `SIZE.tick` at 15 units when the
// drawing put it at 8.6px. A guard that measures the wrong box is worse than no guard.
const PHONE_PANEL_PX = 358 - 2 * 17.6;
const PHONE_SCALE = PHONE_PANEL_PX / 560;
const FLOOR_PX = 9;
// ── text, and the marks' colour class ────────────────────────────────────────
/** The marks every module composes, with the options the check gives each one. */
const MARK_OPTIONS = {
    line: { x1: 0, y1: 0, x2: 10, y2: 10 },
    circle: { cx: 5, cy: 5 },
    rect: { x: 0, y: 0, width: 10, height: 4 },
    polygon: { points: [[0, 0], [10, 0], [5, 8]] },
    path: { d: "M0 0 L10 10" },
    arrow: { x1: 0, y1: 0, x2: 30, y2: 0 },
};
const textRows = [
    // `sigfig` is the reader's side of the bank's `sigfigs` check: a rounded answer is a
    // claim about how much of the measurement is real, so `6`, `6.0` and `6.00` are three
    // statements and only one of them is right.
    {
        name: "sigfig keeps a significant trailing zero",
        tier: "both",
        covers: "sigfig",
        call: (kit) => kit.sigfig(6, 2),
        expect: "6.0",
    },
    {
        name: "sigfig pads a half",
        tier: "both",
        covers: "sigfig",
        call: (kit) => kit.sigfig(0.5, 2),
        expect: "0.50",
    },
    {
        name: "sigfig rounds to the figures asked for",
        tier: "both",
        covers: "sigfig",
        call: (kit) => kit.sigfig(3.14159, 3),
        expect: "3.14",
    },
    {
        name: "sigfig keeps a small value in place value",
        tier: "both",
        covers: "sigfig",
        call: (kit) => kit.sigfig(0.0012, 2),
        expect: "0.0012",
    },
    {
        name: "sigfig goes scientific when zeros would hold the place",
        tier: "both",
        covers: "sigfig",
        call: (kit) => kit.sigfig(300, 2),
        expect: "3.0e2",
    },
    { name: "sigfig of zero", tier: "pure", covers: "sigfig", call: (kit) => kit.sigfig(0, 2), expect: "0.0" },
    {
        name: "sigfig of a non-number is a dash, not NaN",
        tier: "pure",
        covers: "sigfig",
        call: (kit) => kit.sigfig(NaN),
        expect: "\u2014",
    },
    { name: "fmt drops a trailing zero", tier: "pure", covers: "fmt", call: (kit) => kit.fmt(2.0), expect: "2" },
    {
        name: "fmt of a non-number is a dash",
        tier: "pure",
        covers: "fmt",
        call: (kit) => kit.fmt(Infinity),
        expect: "\u2014",
    },
    {
        // As a map callback `fmt` is given the index as a second argument, and a formatter
        // that used it would print something different for every value in a table.
        name: "fmt ignores the index a map callback passes it",
        tier: "both",
        covers: "fmt",
        call: (kit) => [1.23456, 7.89012, 3.45678].map(kit.fmt).join(" "),
        expect: "1.23 7.89 3.46",
    },
    { name: "signed spaces a positive term", tier: "both", covers: "signed", call: (kit) => kit.signed(3), expect: "+ 3" },
    {
        name: "signed spaces a negative term",
        tier: "both",
        covers: "signed",
        call: (kit) => kit.signed(-3.5),
        expect: "\u2212 3.5",
    },
    {
        name: "coord rounds the float SVG would carry",
        tier: "both",
        covers: "coord",
        call: (kit) => kit.coord(183.99999999999997),
        expect: "184.0",
    },
    {
        name: "escape closes the unsafe characters",
        tier: "both",
        covers: "escape",
        call: (kit) => kit.escape("a & b < c"),
        expect: "a &amp; b &lt; c",
    },
    // A `<text>` with no `fig-*`/`text-*` class is painted with `fill`'s initial black and
    // vanishes on a dark panel. That defect was found eighteen times by measurement, so
    // the class is the default rather than the caller's job.
    {
        name: "label() returns a <text> element",
        tier: "both",
        covers: "label",
        call: (kit) => kit.label({ x: 10, y: 20, text: "Hi" }),
        expect: /^<text /,
    },
    {
        name: "label() defaults to the ink colour class",
        tier: "both",
        covers: "label",
        call: (kit) => kit.label({ x: 10, y: 20, text: "Hi" }),
        expect: /class="text-ink"/,
        because: "a caller that forgets a class gets text painted from the initial value, " +
            "invisible on a dark panel",
    },
    {
        name: "label() defaults to SIZE.label",
        tier: "both",
        covers: "label",
        call: (kit) => kit.label({ x: 10, y: 20, text: "Hi" }),
        expect: /font-size="16"/,
    },
    {
        name: "label() honours its anchor",
        tier: "both",
        covers: "label",
        call: (kit) => kit.label({ x: 1, y: 2, text: "0", anchor: "end" }),
        expect: /text-anchor="end"/,
    },
    {
        name: "label() honours its size",
        tier: "both",
        covers: "label",
        call: (kit) => kit.label({ x: 1, y: 2, text: "0", size: 15 }),
        expect: /font-size="15"/,
    },
    {
        name: "label() escapes its text",
        tier: "both",
        covers: "label",
        call: (kit) => kit.label({ x: 0, y: 0, text: "a & b < c" }),
        expect: /a &amp; b &lt; c/,
    },
    // `SIZE` exists so that no module chooses its own number: rendered size is
    // `font-size` times the drawing's width over the viewBox width, which no module's own
    // attributes can tell you.
    {
        name: "the SIZE scale is four named values, not a number per module",
        tier: "pure",
        covers: "SIZE",
        call: (kit) => Object.values(kit.SIZE).sort((a, b) => a - b),
        expect: [16, 16, 18, 20],
    },
    {
        name: "every SIZE clears the 9px floor at phone width",
        tier: "dom",
        covers: "SIZE",
        call: (kit) => Object.entries(kit.SIZE).map(([name, units]) => [
            name,
            Number((units * PHONE_SCALE).toFixed(1)),
        ]),
        expect: (got) => Array.isArray(got) && got.length > 0 && got.every(([, px]) => px >= FLOOR_PX),
        because: `the drawing is 322.8px of a 560-unit viewBox on a phone, so a named size below ${FLOOR_PX}px is unreadable there`,
    },
];
// ── scale ────────────────────────────────────────────────────────────────────
//
// The y-axis case is the one that gets flipped when written by hand: a value that counts
// upwards onto an axis that counts downwards. `.invert` is the mapping back, which is
// what a drag needs — a pointer position is an SVG coordinate and the value is what
// belongs there.
const scaleRows = [
    {
        name: "scale maps the domain's low end",
        tier: "both",
        covers: "scale",
        call: (kit) => kit.scale({ domain: [0, 10], range: [100, 500] })(0),
        expect: 100,
    },
    {
        name: "scale maps the domain's middle",
        tier: "both",
        covers: "scale",
        call: (kit) => kit.scale({ domain: [0, 10], range: [100, 500] })(5),
        expect: 300,
    },
    {
        name: "scale maps the domain's high end",
        tier: "both",
        covers: "scale",
        call: (kit) => kit.scale({ domain: [0, 10], range: [100, 500] })(10),
        expect: 500,
    },
    {
        name: "scale handles a range that counts down",
        tier: "both",
        covers: "scale",
        call: (kit) => {
            const down = kit.scale({ domain: [0, 10], range: [400, 40] });
            return [down(0), down(10)];
        },
        expect: [400, 40],
    },
    {
        name: "scale().invert undoes the mapping",
        tier: "both",
        covers: "scale",
        call: (kit) => {
            const up = kit.scale({ domain: [0, 10], range: [100, 500] });
            return [100, 300, 500].map(up.invert);
        },
        expect: [0, 5, 10],
    },
    {
        name: "scale().invert handles a range that counts down",
        tier: "pure",
        covers: "scale",
        call: (kit) => {
            const down = kit.scale({ domain: [0, 10], range: [400, 40] });
            return [down.invert(400), down.invert(40)];
        },
        expect: [0, 10],
    },
    {
        name: "scale().invert round-trips a value",
        tier: "both",
        covers: "scale",
        call: (kit) => {
            const up = kit.scale({ domain: [-2, 7], range: [30, 400] });
            return up.invert(up(3.7));
        },
        expect: (got) => Math.abs(got - 3.7) <= 1e-9,
        because: "a drag maps a pointer position back to a value, so the inverse has to be right",
    },
    {
        name: "scale refuses a domain with no width",
        tier: "both",
        covers: "scale",
        call: (kit) => {
            try {
                kit.scale({ domain: [3, 3], range: [0, 1] });
                return "no error";
            }
            catch (error) {
                return error.message;
            }
        },
        expect: /no width/,
        because: "a domain with no width divides by zero and produces NaN coordinates rather than failing",
    },
];
// ── extent and ticks ─────────────────────────────────────────────────────────
const extentRows = [
    {
        name: "extent of nothing is a usable domain",
        tier: "both",
        covers: "extent",
        call: (kit) => kit.extent([]),
        expect: [0, 1],
    },
    {
        name: "extent of one value is not zero-width",
        tier: "both",
        covers: "extent",
        call: (kit) => kit.extent([3, 3]),
        expect: [3, 4],
    },
    { name: "extent of several", tier: "both", covers: "extent", call: (kit) => kit.extent([1, 5, 2]), expect: [1, 5] },
    {
        name: "extent reads a picked field",
        tier: "both",
        covers: "extent",
        call: (kit) => kit.extent([{ v: 4 }, { v: -1 }], (d) => d.v),
        expect: [-1, 4],
    },
    {
        name: "ticks on 0..1",
        tier: "both",
        covers: "ticks",
        call: (kit) => kit.ticks({ from: 0, to: 1, count: 5 }),
        expect: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
    {
        name: "ticks on 0..10",
        tier: "both",
        covers: "ticks",
        call: (kit) => kit.ticks({ from: 0, to: 10, count: 6 }),
        expect: [0, 2, 4, 6, 8, 10],
    },
    {
        name: "ticks on 0..0.5",
        tier: "both",
        covers: "ticks",
        call: (kit) => kit.ticks({ from: 0, to: 0.5, count: 5 }),
        expect: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
    },
    {
        name: "ticks on a span with no width",
        tier: "pure",
        covers: "ticks",
        call: (kit) => kit.ticks({ from: 3, to: 3 }),
        expect: [3],
    },
];
// ── the marks ────────────────────────────────────────────────────────────────
//
// Every mark defaults its colour class and rounds its coordinates. The class is the same
// defect `label()` exists to prevent — a shape with no `fig-*` class is painted from the
// initial value and its stroke is invisible on a dark panel — and the rounding is what
// stopped 44 modules shipping `183.99999999999997` into a reader's markup.
//
// Three properties, from one table of marks rather than six hand-written copies each.
const markRows = Object.entries(MARK_OPTIONS).flatMap(([name, options]) => [
    {
        name: `the ${name} mark draws something`,
        tier: "both",
        covers: name,
        call: (kit) => kit[name](options),
        expect: /^\s*<\w+/,
        because: "a mark that draws nothing leaves a hole in the figure and no error anywhere",
    },
    {
        name: `the ${name} mark defaults its colour class`,
        tier: "both",
        covers: name,
        call: (kit) => kit[name](options),
        expect: /class="fig-ink"/,
        because: "a caller that forgets a class gets a shape painted from the initial value, invisible on a dark panel",
    },
    {
        name: `the ${name} mark rounds its coordinates`,
        tier: "both",
        covers: name,
        call: (kit) => kit[name](options),
        expect: (got) => !/\d\.\d{3,}/.test(String(got)),
        because: "a coordinate with more than one decimal place doubles the markup for precision no screen shows",
    },
]);
const arrowRows = [
    {
        name: "arrow() draws a head, so it is an arrow rather than a line",
        tier: "both",
        covers: "arrow",
        call: (kit) => kit.arrow({ x1: 0, y1: 0, x2: 30, y2: 0 }),
        expect: /<polygon/,
    },
    {
        name: "arrow() stops its shaft where the head begins",
        tier: "pure",
        covers: "arrow",
        call: (kit) => kit.arrow({ x1: 0, y1: 0, x2: 30, y2: 0 }),
        expect: /<line x1="0\.0" y1="0\.0" x2="20\.0" y2="0\.0"[^>]*><\/line><polygon/,
        because: "a shaft drawn to the tip pokes through the head",
    },
    {
        name: "the line mark carries no dash by default",
        tier: "pure",
        covers: "line",
        call: (kit) => kit.line({ x1: 0, y1: 0, x2: 1, y2: 1 }),
        expect: (got) => !String(got).includes("stroke-dasharray"),
        because: "a dashed line by default would make `camera3d()`'s hidden edges indistinguishable",
    },
];
// ── the axis helpers ─────────────────────────────────────────────────────────
//
// `axes()` returns the mappers as well as the string, so a module cannot draw its data
// with different geometry from its own axes.
const frameRows = [
    {
        name: "axes() returns its mappers as well as its string",
        tier: "both",
        covers: "axes",
        call: (kit) => Object.keys(kit.axes({ x: { domain: [0, 10] }, y: { domain: [0, 5] } })).sort(),
        expect: ["box", "draw", "x", "xTicks", "y", "yTicks"],
        because: "a module must draw its data with the same geometry the axes used",
    },
    {
        name: "axes() draws tick labels",
        tier: "both",
        covers: "axes",
        call: (kit) => kit.axes({ x: { domain: [0, 10], label: "t" }, y: { domain: [0, 5], label: "s" } }).draw,
        expect: /<text /,
    },
    {
        name: "axes() draws its labels in a colour class",
        tier: "pure",
        covers: "axes",
        call: (kit) => kit.axes({ x: { domain: [0, 10] }, y: { domain: [0, 5] } }).draw,
        expect: /class="fig-ink"/,
    },
    {
        name: "axes() maps through its own box",
        tier: "pure",
        covers: "axes",
        call: (kit) => {
            const frame = kit.axes({ x: { domain: [0, 10] }, y: { domain: [0, 5] } });
            return [frame.x(0) < frame.x(10), frame.y(0) > frame.y(5)];
        },
        expect: [true, true],
        because: "an axis that counts the other way must map the other way",
    },
    {
        name: "numberLine() returns its mapper",
        tier: "both",
        covers: "numberLine",
        call: (kit) => Object.keys(kit.numberLine({ min: -5, max: 5 })).sort(),
        expect: ["box", "draw", "x", "y"],
    },
    {
        name: "numberLine() draws an axis arrow",
        tier: "both",
        covers: "numberLine",
        call: (kit) => kit.numberLine({ min: -5, max: 5 }).draw,
        expect: /<polygon/,
    },
];
// ── the plotters ─────────────────────────────────────────────────────────────
const plotRows = [
    {
        name: "curve() of nothing is empty, not a broken path",
        tier: "both",
        covers: "curve",
        call: (kit) => kit.curve([], { x: (v) => v, y: (v) => v }),
        expect: "",
    },
    {
        name: "curve() maps its points in order",
        tier: "both",
        covers: "curve",
        call: (kit) => kit.curve([[0, 0], [1, 1], [2, 4]], { x: (v) => v * 10, y: (v) => v * 2 }),
        expect: /^<path d="M0\.0 0\.0 L10\.0 2\.0 L20\.0 8\.0"/,
    },
    {
        // One `NaN` in a path drops the whole line and looks like a missing curve, so a
        // sample that is not finite must break the path rather than poison it.
        name: "graph() keeps a non-finite sample out of the path",
        tier: "both",
        covers: "graph",
        call: (kit) => kit.graph((t) => (t === 0.5 ? NaN : t), {
            x: kit.scale({ domain: [0, 1], range: [0, 100] }),
            y: kit.scale({ domain: [0, 1], range: [100, 0] }),
            samples: 5,
        }),
        expect: (got) => !/NaN/.test(String(got)),
        because: "one NaN drops the whole line instead of breaking it, which reads as a missing curve",
    },
    {
        name: "graph() breaks the path at a non-finite sample",
        tier: "both",
        covers: "graph",
        call: (kit) => kit.graph((t) => (t === 0.5 ? NaN : t), {
            x: kit.scale({ domain: [0, 1], range: [0, 100] }),
            y: kit.scale({ domain: [0, 1], range: [100, 0] }),
            samples: 5,
        }),
        expect: (got) => String(got).split("M").length - 1 >= 2,
        because: "the line must resume on the other side of the gap rather than stop",
    },
    {
        name: "graph() samples a function",
        tier: "pure",
        covers: "graph",
        call: (kit) => kit.graph((t) => t * t, {
            x: kit.scale({ domain: [0, 1], range: [0, 100] }),
            y: kit.scale({ domain: [0, 1], range: [100, 0] }),
        }),
        expect: /^<path d="M/,
    },
    {
        name: "area() closes a filled region",
        tier: "both",
        covers: "area",
        call: (kit) => kit.area([[0, 0], [1, 1], [2, 0]], { x: (v) => v * 10, y: (v) => v * 2, baseline: 50 }),
        expect: /currentColor/,
    },
    {
        name: "area() closes the path with Z",
        tier: "dom",
        covers: "area",
        call: (kit) => kit.area([[0, 0], [1, 1], [2, 0]], { x: (v) => v * 10, y: (v) => v * 2, baseline: 50 }),
        expect: /Z/,
        because: "an unclosed region leaks its fill across the rest of the drawing",
    },
    {
        name: "dots() draws a circle per point",
        tier: "both",
        covers: "dots",
        call: (kit) => kit.dots([[0, 0], [1, 1]], { x: (v) => v * 10, y: (v) => v * 2 }),
        expect: /^<circle/,
    },
    {
        name: "bars() draws one rect per item",
        tier: "both",
        covers: "bars",
        call: (kit) => (kit.bars([{ from: 0, to: 1, value: 5 }, { from: 1, to: 2, value: 8 }], { x: (v) => v * 50, y: (v) => v * 10 }).match(/<rect/g) || []).length,
        expect: 2,
    },
];
// ── venn ─────────────────────────────────────────────────────────────────────
//
// `venn()` places each region's label by geometry, because **an atom in the wrong region
// teaches the opposite of the truth**. The invariant is checked directly: for every
// region of a two-set and a three-set diagram, the point `venn()` chose must be inside
// exactly the circles the region declares.
const TWO_SETS = [
    { id: "A", cx: 250, cy: 148, r: 88 },
    { id: "B", cx: 320, cy: 148, r: 88 },
];
const TWO_REGIONS = [
    { id: "a", in: ["A"], out: ["B"] },
    { id: "ab", in: ["A", "B"] },
    { id: "b", in: ["B"], out: ["A"] },
    { id: "outside", out: ["A", "B"] },
];
const THREE_SETS = [
    { id: "A", cx: 280, cy: 126, r: 82 },
    { id: "B", cx: 228, cy: 204, r: 82 },
    { id: "C", cx: 332, cy: 204, r: 82 },
];
const THREE_REGIONS = (() => {
    const letters = ["A", "B", "C"];
    const regions = [];
    for (let mask = 0; mask < 8; mask += 1) {
        const inside = letters.filter((_, i) => mask & (1 << i));
        regions.push({
            id: inside.join("") || "outside",
            in: inside,
            out: letters.filter((l) => !inside.includes(l)),
        });
    }
    return regions;
})();
/** Every region `venn()` placed outside exactly the circles it declares. */
function vennWrong(kit, circles, regions) {
    const diagram = kit.venn({ circles, regions, labels: false, rings: false });
    const wrong = [];
    for (const region of regions) {
        const point = diagram.points[region.id];
        if (!point) {
            wrong.push(`${region.id} was never placed`);
            continue;
        }
        const inside = circles
            .filter((circle) => Math.hypot(point.x - circle.cx, point.y - circle.cy) <= circle.r)
            .map((circle) => circle.id)
            .sort()
            .join("");
        const declared = (region.in || []).slice().sort().join("");
        if (inside !== declared)
            wrong.push(`${region.id} landed in ${inside || "nothing"}, not ${declared || "nothing"}`);
    }
    return wrong;
}
const vennRows = [
    {
        name: "venn() places a two-set region inside exactly the circles it declares",
        tier: "pure",
        covers: "venn",
        call: (kit) => vennWrong(kit, TWO_SETS, TWO_REGIONS),
        expect: [],
        because: "an atom in the wrong region prints a diagram that teaches the opposite of the truth",
    },
    {
        name: "venn() places a three-set region inside exactly the circles it declares",
        tier: "pure",
        covers: "venn",
        call: (kit) => vennWrong(kit, THREE_SETS, THREE_REGIONS),
        expect: [],
        because: "the three-set case is the one with a region inside every pair and none",
    },
    {
        name: "venn() draws a ring per set and a frame",
        tier: "pure",
        covers: "venn",
        call: (kit) => (kit.venn({ circles: TWO_SETS, regions: TWO_REGIONS, labels: false }).draw.match(/<circle|<rect/g) || []).length,
        expect: 3,
    },
];
// ── randomness ───────────────────────────────────────────────────────────────
//
// Seeded, because a figure that samples must be reproducible: two readers comparing what
// they saw must be comparing the same data, and a browser test cannot assert anything
// about data that changes on every load.
const seedRange = (kit) => {
    const rng = kit.seed(1);
    let low = 1;
    let high = 0;
    for (let i = 0; i < 500; i += 1) {
        const n = rng.int(1, 6);
        low = Math.min(low, n);
        high = Math.max(high, n);
    }
    return [low, high];
};
const seedRows = [
    {
        name: "a seed repeats",
        tier: "both",
        covers: "seed",
        call: (kit) => kit.seed(7).next() === kit.seed(7).next(),
        expect: true,
    },
    {
        name: "a different seed differs",
        tier: "both",
        covers: "seed",
        call: (kit) => kit.seed(7).next() !== kit.seed(8).next(),
        expect: true,
    },
    {
        name: "a seeded integer stays in range",
        tier: "both",
        covers: "seed",
        call: (kit) => seedRange(kit),
        expect: [1, 6],
    },
    {
        name: "a seeded shuffle keeps every item",
        tier: "both",
        covers: "seed",
        call: (kit) => kit.seed(3).shuffle([1, 2, 3, 4, 5]).slice().sort(),
        expect: [1, 2, 3, 4, 5],
    },
    {
        name: "a seeded shuffle is deterministic",
        tier: "pure",
        covers: "seed",
        call: (kit) => [kit.seed(3).shuffle([1, 2, 3, 4, 5]), kit.seed(3).shuffle([1, 2, 3, 4, 5])],
        expect: (got) => JSON.stringify(got[0]) === JSON.stringify(got[1]),
        because: "two readers with the same seed must see the same order",
    },
];
// ── checking ─────────────────────────────────────────────────────────────────
//
// Four outcomes, and the difference between the last two matters to a reader: "wrong" is
// a mistake worth thinking about, "invalid" is a typing problem that needs none.
const checkRows = [
    {
        name: "check() gives the four verdicts, and a unit or a fraction is not a mistake",
        tier: "both",
        covers: "check",
        call: (kit) => [
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
            kit.check("\u22123", { answer: "-3" }).state,
            kit.check("$6$", { answer: "6" }).state,
        ],
        expect: [
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
        ],
    },
];
// ── a vector field ───────────────────────────────────────────────────────────
//
// Six modules hand-build this, and the two things they re-derive are the arrow's
// direction and the SVG y-axis, which counts the other way. A field that points the
// wrong way on one axis is a false diagram.
/** The screen direction of each arrow `vectorField()` drew for `field`. */
function fieldDirections(kit, field) {
    const frame = kit.axes({ x: { domain: [-1, 1] }, y: { domain: [-1, 1] } });
    const markup = kit.vectorField({ field, x: frame.x, y: frame.y, box: frame.box, step: 60, length: 16 });
    return [
        ...markup.matchAll(/<line x1="([\d.-]+)" y1="([\d.-]+)" x2="([\d.-]+)" y2="([\d.-]+)"/g),
    ].map((match) => ({
        dx: Number(match[3]) - Number(match[1]),
        dy: Number(match[4]) - Number(match[2]),
    }));
}
const vectorRows = [
    {
        name: "vectorField() draws an arrow at each sample",
        tier: "pure",
        covers: "vectorField",
        call: (kit) => fieldDirections(kit, () => [1, 0]).length,
        expect: (got) => got > 0,
        because: "an empty field draws nothing and looks like a field of zero vectors",
    },
    {
        name: "vectorField() draws a +x field pointing right",
        tier: "pure",
        covers: "vectorField",
        call: (kit) => fieldDirections(kit, () => [1, 0]).filter((d) => d.dx <= 0).length,
        expect: 0,
    },
    {
        name: "vectorField() draws a +y field pointing up the screen",
        tier: "pure",
        covers: "vectorField",
        call: (kit) => fieldDirections(kit, () => [0, 1]).filter((d) => d.dy >= 0).length,
        expect: 0,
        because: "the y-axis counts the other way in SVG, so the direction has to go through the mappers",
    },
];
// ── a camera for small 3D drawings ───────────────────────────────────────────
//
// The rule is the one a textbook uses: a solid's hidden edges are the ones whose every
// face is turned away. A cube has exactly three, and a primitive that drew four or two
// would make every 3D figure in the collection wrong in the same way.
const CUBE = {
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
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]].map((between) => ({ between })),
};
const cameraRows = [
    {
        name: "camera3d() draws a cube's twelve edges",
        tier: "pure",
        covers: "camera3d",
        call: (kit) => (kit.camera3d({ width: 560, height: 300 }).drawMesh(CUBE).match(/<line/g) || []).length,
        expect: 12,
    },
    {
        name: "camera3d() hides exactly the three edges whose every face is turned away",
        tier: "pure",
        covers: "camera3d",
        call: (kit) => (kit.camera3d({ width: 560, height: 300 }).drawMesh(CUBE).match(/stroke-dasharray/g) || []).length,
        expect: 3,
        because: "a solid with the wrong number of hidden edges is wrong in every figure that uses it",
    },
    {
        name: "camera3d() draws inside its box",
        tier: "pure",
        covers: "camera3d",
        call: (kit) => {
            const ys = [...kit.camera3d({ width: 560, height: 300 }).drawMesh(CUBE).matchAll(/y1="([\d.-]+)"/g)].map((match) => Number(match[1]));
            return [Math.min(...ys), Math.max(...ys)];
        },
        expect: (got) => got[0] >= 0 && got[1] <= 300,
        because: "a mesh drawn outside its viewBox is clipped",
    },
    {
        name: "camera3d() writes no NaN coordinate",
        tier: "pure",
        covers: "camera3d",
        call: (kit) => kit.camera3d({ width: 560, height: 300 }).drawMesh(CUBE),
        expect: (got) => !/NaN/.test(String(got)),
        because: "a NaN in a path drops the whole edge rather than one point",
    },
    {
        name: "camera3d() fills a cube's six faces",
        tier: "pure",
        covers: "camera3d",
        call: (kit) => (kit.camera3d({ width: 560, height: 300 }).drawMesh({ ...CUBE, fill: true }).match(/<path/g) || []).length,
        expect: 6,
    },
    {
        name: "camera3d() can project a point",
        tier: "pure",
        covers: "camera3d",
        call: (kit) => !!kit.camera3d({ width: 560, height: 300 }).project([0, 0, 0]),
        expect: true,
    },
];
// ── a generated question ─────────────────────────────────────────────────────
//
// The claim is **internal consistency, not verification**: the answer is computed by the
// same function that wrote the question, so the two cannot disagree. What can be checked
// is that it is deterministic, that a different seed differs, and that the answer agrees
// with the numbers the question states.
const HCF_KINDS = [
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
const exerciseRows = [
    {
        name: "a regenerated question is the same question",
        tier: "pure",
        covers: "exercise",
        call: (kit) => [
            kit.exercise({ kinds: HCF_KINDS, seed: 5 }).text,
            kit.exercise({ kinds: HCF_KINDS, seed: 5 }).text,
        ],
        expect: (got) => got[0] === got[1],
        because: "a seed that does not repeat cannot be shown twice",
    },
    {
        name: "and the same answer",
        tier: "pure",
        covers: "exercise",
        call: (kit) => [
            kit.exercise({ kinds: HCF_KINDS, seed: 5 }).answer,
            kit.exercise({ kinds: HCF_KINDS, seed: 5 }).answer,
        ],
        expect: (got) => got[0] === got[1],
    },
    {
        name: "a different seed gives a different question",
        tier: "pure",
        covers: "exercise",
        call: (kit) => [
            kit.exercise({ kinds: HCF_KINDS, seed: 5 }).text,
            kit.exercise({ kinds: HCF_KINDS, seed: 6 }).text,
        ],
        expect: (got) => got[0] !== got[1],
        because: "a generator that always asks the same question is not practice",
    },
    {
        name: "a generated answer agrees with the numbers in its own question, over 300 seeds",
        tier: "pure",
        covers: "exercise",
        call: (kit) => {
            let disagree = 0;
            for (let seed = 1; seed <= 300; seed += 1) {
                const quiz = kit.exercise({ kinds: HCF_KINDS, seed });
                const a = Number(quiz.text.match(/of (\d+)/)[1]);
                const b = Number(quiz.text.match(/and (\d+)/)[1]);
                const hcf = (x, y) => (y ? hcf(y, x % y) : x);
                if (hcf(a, b) !== Number(quiz.answer))
                    disagree += 1;
            }
            return disagree;
        },
        expect: 0,
        because: "the only thing a generator claims is that the question and its answer cannot disagree",
    },
];
// ── the frame, the controls and the reader's widgets ─────────────────────────
//
// Everything below needs an element, a layout or a pointer. Each row gets a fresh
// `<maths-figure>`, exactly the element the loader hands a module, which is why these
// rows cannot share state with each other — and why a `dom` row may not be a `both` row.
const frameHostRows = [
    {
        name: "the drawing carries role=\"img\"",
        tier: "dom",
        covers: "panel",
        call: (kit, host) => kit.panel(host, { label: "A drawing for the check", width: 200, height: 100 }).svg.getAttribute("role"),
        expect: "img",
    },
    {
        name: "the drawing has an accessible name",
        tier: "dom",
        covers: "panel",
        call: (kit, host) => (kit.panel(host, { label: "A drawing for the check", width: 200, height: 100 }).svg.getAttribute("aria-label") || "")
            .length > 0,
        expect: true,
        because: "a drawing with no name is an image a screen reader announces as nothing",
    },
    {
        name: "the drawing sets no pixel height, so it scales with its box",
        tier: "dom",
        covers: "panel",
        call: (kit, host) => kit.panel(host, { label: "A drawing for the check", width: 200, height: 100 }).svg.hasAttribute("height"),
        expect: false,
        because: "a pixel height made 70 figures render their smallest label below 7px on a phone",
    },
    {
        name: "the readout is a live region",
        tier: "dom",
        covers: "panel",
        call: (kit, host) => kit.panel(host, { label: "x" }).readout.getAttribute("aria-live"),
        expect: "polite",
    },
    {
        name: "the readout is not role=img, so it can announce a value",
        tier: "dom",
        covers: "panel",
        call: (kit, host) => kit.panel(host, { label: "x" }).readout.getAttribute("role"),
        expect: null,
        because: "role=img makes an element's content presentational, so the value would never be read",
    },
    {
        name: "panel() returns its controls column",
        tier: "dom",
        covers: "panel",
        call: (kit, host) => {
            const made = kit.panel(host, { label: "x" });
            return made.controls && made.controls.tagName;
        },
        expect: "DIV",
    },
    {
        name: "a figure with no drawing makes no surface",
        tier: "dom",
        covers: "panel",
        call: (kit, host) => kit.panel(host, { drawing: false }).svg,
        expect: null,
    },
    {
        name: "and puts no surface on the page",
        tier: "dom",
        covers: "panel",
        call: (kit, host) => {
            kit.panel(host, { drawing: false });
            return host.querySelectorAll("svg").length;
        },
        expect: 0,
    },
    {
        name: "panel() returns a caption element",
        tier: "dom",
        covers: "panel",
        call: (kit, host) => kit.panel(host, { drawing: false }).caption.tagName,
        expect: "P",
    },
    {
        name: "a description is linked to the drawing, off the screen",
        tier: "dom",
        covers: "panel",
        call: (kit, host) => {
            const made = kit.panel(host, { label: "Named", description: "A longer description of the drawing" });
            const id = made.svg.getAttribute("aria-describedby");
            const target = id ? host.querySelector(`#${id}`) : null;
            return [!!id, target ? target.textContent.slice(0, 14) : null];
        },
        expect: [true, "A longer descr"],
    },
];
const sliderRows = [
    {
        name: "`show: false` adds no value display",
        tier: "dom",
        covers: "slider",
        call: (kit, host) => {
            kit.slider(host, { id: "quiet", label: "No value shown", min: 0, max: 10, value: 4, show: false });
            return !!host.querySelector("input.quiet").closest("label").querySelector("output");
        },
        expect: false,
    },
    {
        name: "a unit follows the number, with a space",
        tier: "dom",
        covers: "slider",
        call: (kit, host) => {
            kit.slider(host, { label: "With a unit", min: 0, max: 300, value: 200, unit: "\u03a9" });
            return host.querySelector("output").textContent;
        },
        expect: "200 \u03a9",
    },
    {
        name: "a control is set in the kit's font, not the figure's",
        tier: "dom",
        covers: ["slider", "UI_FONT"],
        call: (kit, host) => {
            kit.slider(host, { label: "Value", min: 0, max: 10, value: 5, show: false });
            return host.querySelector(".fig-control").style.font;
        },
        expect: /system-ui/,
        because: "a control that inherits the figure's font drifts from every other control in the collection",
    },
];
const controlRows = [
    {
        name: "segmented reads and writes like a select",
        tier: "dom",
        covers: "segmented",
        call: (kit, host) => {
            const seg = kit.segmented(host, {
                label: "Pick",
                choices: [{ value: "a", label: "A" }, { value: "b", label: "B" }],
                value: "b",
            });
            const before = seg.value;
            seg.value = "a";
            return [before, seg.value, seg.querySelectorAll("input[type=radio]").length];
        },
        expect: ["b", "a", 2],
    },
    {
        name: "field is a native input and asks for the right keypad",
        tier: "dom",
        covers: "field",
        call: (kit, host) => {
            const typed = kit.field(host, { label: "Answer", type: "text", inputmode: "decimal" });
            const numeric = kit.field(host, { label: "Amount", type: "number" });
            return [typed.tagName, typed.getAttribute("inputmode"), numeric.getAttribute("inputmode")];
        },
        expect: ["INPUT", "decimal", "decimal"],
    },
    {
        name: "textarea is a native textarea",
        tier: "dom",
        covers: "textarea",
        call: (kit, host) => kit.textarea(host, { label: "Why?" }).tagName,
        expect: "TEXTAREA",
    },
    {
        // `pressed` is what makes a button a toggle; without it the button is an action and
        // `aria-pressed` would be a lie.
        name: "button is a real button, and only a toggle carries aria-pressed",
        tier: "dom",
        covers: "button",
        call: (kit, host) => {
            let clicks = 0;
            const action = kit.button(host, {
                label: "Go",
                onClick: () => {
                    clicks += 1;
                    return true;
                },
            });
            action.click();
            const toggle = kit.button(host, { label: "Loud", pressed: false, onClick: () => true });
            const before = toggle.getAttribute("aria-pressed");
            toggle.click();
            return [
                action.tagName,
                action.type,
                action.getAttribute("aria-pressed"),
                clicks,
                toggle.getAttribute("aria-pressed"),
                before,
            ];
        },
        expect: ["BUTTON", "button", null, 1, "true", "false"],
    },
    {
        name: "toggle is a native checkbox with an accessible name",
        tier: "dom",
        covers: "toggle",
        call: (kit, host) => {
            const box = kit.toggle(host, { label: "Loud", checked: true });
            return [box.tagName, box.type, box.checked, box.getAttribute("aria-label")];
        },
        expect: ["INPUT", "checkbox", true, "Loud"],
    },
    {
        name: "chooser is a native select that reads and writes like one",
        tier: "dom",
        covers: "chooser",
        call: (kit, host) => {
            const select = kit.chooser(host, {
                label: "Pick",
                choices: [{ value: "a", label: "A" }, { value: "b", label: "B" }],
                value: "b",
            });
            return [select.tagName, select.value, select.querySelectorAll("option").length, select.getAttribute("aria-label")];
        },
        expect: ["SELECT", "b", 2, "Pick"],
    },
    {
        // A stepper is the step slider plus two buttons, and all three go through one change
        // path, so the buttons and the slider cannot disagree.
        name: "a stepper advances and narrates",
        tier: "dom",
        covers: ["stepper", "react"],
        call: (kit, host) => {
            const st = kit.stepper(host, { steps: [{ text: "one" }, { text: "two" }, { text: "three" }] });
            let redraws = 0;
            kit.react(st, () => {
                redraws += 1;
            });
            const start = st.index;
            const buttons = host.querySelectorAll("button");
            buttons[buttons.length - 1].click();
            return [start, st.index, st.text, redraws > 1];
        },
        expect: [0, 1, "two", true],
    },
    {
        // A table is tabular data, so it is a real table with a caption and a scope on every
        // header — and its highlight follows a control without a rebuild.
        name: "a table is tabular, captioned and browsable",
        tier: "dom",
        covers: "table",
        call: (kit, host) => {
            const table = kit.table(host, {
                columns: ["n", "T"],
                rows: [[1, 3], [2, 5]],
                caption: "Terms",
                highlight: 0,
            });
            const caption = table.querySelector("caption");
            const scope = table.querySelector("th");
            const before = table.querySelectorAll("tbody tr").length;
            table.update([[1, 3], [2, 5], [3, 9]], 1);
            return [
                table.tagName,
                caption ? caption.textContent : null,
                scope ? scope.getAttribute("scope") : null,
                before,
                table.querySelectorAll("tbody tr").length,
                table.querySelectorAll("tr.fig-row-active").length,
            ];
        },
        expect: ["TABLE", "Terms", "col", 2, 3, 1],
    },
];
const widgetRows = [
    {
        // The animation is an explicit loop with a scrubber, so every frame is reachable
        // without motion and the figure is complete for a reader who asked for less.
        name: "an animation is scrubbable without motion",
        tier: "dom",
        covers: ["animate", "notify"],
        call: (kit, host) => {
            const frames = [];
            const animation = kit.animate(host, { onFrame: (t) => frames.push(t) });
            const scrub = animation.scrub;
            scrub.value = "0.5";
            kit.notify(scrub);
            return [scrub.tagName, scrub.type, frames.length > 0, frames[frames.length - 1]];
        },
        expect: ["INPUT", "range", true, 0.5],
    },
    {
        // The reader's side of "a computer checks every answer".
        name: "answerBox verifies against the proved answer",
        tier: "dom",
        covers: "answerBox",
        call: (kit, host) => {
            const { readout } = kit.panel(host, { label: "Answer" });
            const box = kit.answerBox(host, { answer: "6.0", unit: "N", readout });
            box.input.value = "6.0 N";
            const good = box.verify();
            const said = readout.textContent;
            box.input.value = "4";
            const bad = box.verify();
            return [good, bad, said, readout.textContent.includes("6.0")];
        },
        expect: [true, false, "Correct.", true],
    },
    {
        // A draggable handle must not be the only way to reach its value: a pointer is not a
        // keyboard, and ten modules already handled a pointer event with no guarantee.
        name: "draggable() refuses a handle with no backing control",
        tier: "dom",
        covers: "draggable",
        call: (kit, host) => {
            const { svg } = kit.panel(host, { label: "Drag", width: 200, height: 100 });
            try {
                kit.draggable(document.createElementNS("http://www.w3.org/2000/svg", "circle"), { svg, toValue: () => 0 });
                return "no error";
            }
            catch (error) {
                return error.message.slice(0, 40);
            }
        },
        expect: /control is required/,
        because: "the pointer would be the only way to reach the value and a keyboard reader could not use the figure",
    },
    {
        name: "a drag writes through its control and adds no second focus stop",
        tier: "dom",
        covers: "draggable",
        call: (kit, host) => {
            host.style.cssText = "display:block;width:400px";
            const x = kit.scale({ domain: [0, 10], range: [0, 200] });
            // A fixed-width host, so the rendered box is known and the pointer position maps
            // to a viewBox position that can be asserted exactly rather than roughly.
            const surface = kit.panel(host, { label: "Drag test", width: 200, height: 100 }).svg;
            const control = kit.slider(host, { label: "Value", min: 0, max: 10, step: 0.1, value: 5, show: false });
            const handle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            handle.setAttribute("cx", "100");
            handle.setAttribute("cy", "50");
            handle.setAttribute("r", "6");
            surface.append(handle);
            const grip = kit.draggable(handle, { control, svg: surface, toValue: (p) => x.invert(p.x) });
            const box = surface.getBoundingClientRect();
            const at = (viewX) => ({
                clientX: box.left + (viewX / 200) * box.width,
                clientY: box.top + box.height / 2,
            });
            const down = at(150);
            const move = at(50);
            handle.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, ...down }));
            handle.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, ...move }));
            handle.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, ...move }));
            // The keyboard path is the control, so the handle must not add a second focus stop.
            return [Number(control.value), handle.hasAttribute("tabindex"), typeof grip.destroy, box.width > 0];
        },
        expect: [2.5, false, "function", true],
    },
    {
        // Storage that fails silently, because a reader in private mode should get a figure
        // that forgets rather than a figure that breaks.
        name: "remember() round-trips or fails quietly",
        tier: "dom",
        covers: "remember",
        call: (kit) => {
            try {
                const store = kit.remember("fig-check", null);
                const wrote = store.set({ hello: 1 });
                return [wrote, wrote ? JSON.stringify(store.get()) : "n/a", typeof store.clear];
            }
            catch (error) {
                return ["threw", String(error.message).slice(0, 40), "?"];
            }
        },
        expect: [true, '{"hello":1}', "function"],
    },
    {
        name: "hidden() returns a span",
        tier: "dom",
        covers: "hidden",
        call: (kit, host) => kit.hidden(host, "a long description").tagName,
        expect: "SPAN",
    },
    {
        name: "hidden() is off the screen but in the document",
        tier: "dom",
        covers: "hidden",
        call: (kit, host) => kit.hidden(host, "a long description").getAttribute("style") || "",
        expect: /position:\s*absolute/,
        because: "a description meant for a screen reader would be read by everyone",
    },
    {
        name: "hidden() keeps its text",
        tier: "dom",
        covers: "hidden",
        call: (kit, host) => kit.hidden(host, "a long description").textContent,
        expect: "a long description",
    },
    {
        // A builder assembles and the module validates, so the kit owns the order, the
        // keyboard and the announcement and never judges the assembly.
        name: "a builder adds in order, undoes, announces and redraws",
        tier: "dom",
        covers: ["builder", "react"],
        call: (kit, host) => {
            host.style.cssText = "display:block;width:420px";
            kit.panel(host, { label: "Build", drawing: false });
            const builder = kit.builder(host, {
                label: "Add a particle",
                parts: [{ id: "p", label: "Proton" }, { id: "n", label: "Neutron" }],
                value: ["p"],
            });
            let redraws = 0;
            kit.react(builder, () => {
                redraws += 1;
            });
            const parts = [...host.querySelectorAll("button")].slice(0, 2);
            const undo = [...host.querySelectorAll("button")].pop();
            parts[1].click();
            const added = builder.value.join(",");
            const pressed = parts.map((button) => button.getAttribute("aria-pressed")).join(",");
            undo.click();
            return [added, builder.value.join(","), redraws > 1, pressed, undo.tagName];
        },
        expect: ["p,n", "p", true, "true,true", "BUTTON"],
    },
    {
        // The keypad inserts plain text at the caret and fires `input`, so what receives it is
        // still an ordinary field and the checker still reads a string.
        name: "a keypad inserts at the caret and fires input",
        tier: "dom",
        covers: "notate",
        call: (kit, host) => {
            host.style.cssText = "display:block;width:420px";
            kit.panel(host, { label: "Keypad", drawing: false });
            const input = kit.field(host, { label: "Answer" });
            const pad = kit.notate(host, { input });
            input.value = "12";
            input.setSelectionRange(1, 1);
            let fired = 0;
            input.addEventListener("input", () => {
                fired += 1;
            });
            const first = pad.querySelector("button");
            first.click();
            return [input.value, input.selectionStart, fired, first.tagName];
        },
        expect: ["1/2", 2, 1, "BUTTON"],
    },
    {
        // Endless practice, which is the only thing here that changes what a reader *does*
        // rather than what they see. The verdict has to follow the current question: a stale
        // answer is how this widget would teach something false.
        name: "practice verifies the current question and moves on",
        tier: "dom",
        covers: "practice",
        call: (kit, host) => {
            host.style.cssText = "display:block;width:420px";
            const { readout, caption } = kit.panel(host, { label: "Practice", drawing: false });
            const kinds = [
                {
                    id: "double",
                    build: (rng) => {
                        const n = rng.int(3, 9);
                        return { text: `Double ${n}.`, answer: 2 * n };
                    },
                },
            ];
            const made = kit.practice(host, { kinds, seed: 3, readout, caption });
            const first = caption.textContent;
            const firstAnswer = made.exercise.answer;
            made.input.value = firstAnswer;
            const good = made.verify();
            const said = readout.textContent;
            [...host.querySelectorAll("button")].find((button) => button.textContent === "Another question").click();
            const second = caption.textContent;
            const cleared = made.input.value === "";
            made.input.value = made.exercise.answer;
            const goodAfterNext = made.verify();
            // The answers must differ, or the check could pass by accident.
            const checks = [...host.querySelectorAll("button")].filter((button) => button.textContent === "Check").length;
            return [
                first.startsWith("Double"),
                good,
                said,
                second !== first,
                cleared,
                goodAfterNext,
                firstAnswer !== made.exercise.answer,
                checks,
            ];
        },
        expect: [true, true, "Correct.", true, true, true, true, 1],
    },
    {
        // A diagram's parts are explored one at a time, and the buttons are the focus stops.
        // The two things that can go wrong are silent: the drawing does not follow the focus,
        // or the description never reaches the accessible name.
        name: "a diagram explores one part at a time, and the buttons are the focus stops",
        tier: "dom",
        covers: "diagram",
        call: (kit, host) => {
            host.style.cssText = "display:block;width:420px";
            const made = kit.diagram(host, {
                label: "Two parts",
                description: "A drawing with two parts, for the check",
                width: 320,
                height: 160,
                parts: [
                    { name: "Base", description: "The bottom edge", draw: () => kit.line({ x1: 10, y1: 100, x2: 300, y2: 100 }) },
                    { name: "Height", description: "The upright edge", draw: () => kit.line({ x1: 10, y1: 100, x2: 10, y2: 20 }) },
                ],
            });
            const buttons = [...host.querySelectorAll(".fig-parts button")];
            const root = host.querySelector(".fig-diagram");
            const atRest = [root.classList.contains("is-exploring"), made.groups.some((group) => group.classList.contains("is-active"))];
            buttons[1].focus();
            const afterFocus = [
                root.classList.contains("is-exploring"),
                made.groups.map((group) => group.classList.contains("is-active")),
                (made.readout.textContent || "").startsWith("Height."),
            ];
            // The description has to be in the accessible name, not only in the readout: a
            // screen reader hears the name on arrival and the readout after.
            const named = (buttons[1].getAttribute("aria-label") || "").includes("upright edge");
            const reachable = buttons.every((button) => button.tabIndex >= 0);
            return [
                buttons.length,
                made.groups.length,
                atRest,
                afterFocus,
                named,
                reachable,
                String(host.querySelector(".readout")?.getAttribute("aria-live")),
            ];
        },
        expect: [2, 2, [false, false], [true, [false, true], true], true, true, "polite"],
    },
];
/** Every row, in the order the report reads them. */
export const ROWS = [
    ...textRows,
    ...scaleRows,
    ...extentRows,
    ...markRows,
    ...arrowRows,
    ...frameRows,
    ...plotRows,
    ...vennRows,
    ...seedRows,
    ...checkRows,
    ...vectorRows,
    ...cameraRows,
    ...exerciseRows,
    ...frameHostRows,
    ...sliderRows,
    ...controlRows,
    ...widgetRows,
];
/** The rows one runner is responsible for: its own tier, plus the shared ones. */
export function rowsFor(tier) {
    return ROWS.filter((row) => row.tier === tier || row.tier === "both");
}
/** The exports a row is about, as a list. */
export function coversOf(row) {
    return Array.isArray(row.covers) ? row.covers : [row.covers];
}
/** Render an observed value for a message, short enough for a terminal line. */
function show(value) {
    const text = JSON.stringify(value);
    const shown = text === undefined ? String(value) : text;
    return shown.length > 200 ? `${shown.slice(0, 200)}…` : shown;
}
/** Compare one observation against the row's expectation. */
export function compare(row, got) {
    const expected = row.expect;
    if (typeof expected === "function") {
        const ok = expected(got) === true;
        return {
            ok,
            detail: ok ? "" : `${show(got)}${row.because ? ` — ${row.because}` : ""}`,
        };
    }
    if (expected instanceof RegExp) {
        const ok = expected.test(String(got));
        return {
            ok,
            detail: ok ? "" : `${show(got)} does not match ${String(expected)}${row.because ? ` — ${row.because}` : ""}`,
        };
    }
    const was = JSON.stringify(got);
    const wanted = JSON.stringify(expected);
    return { ok: was === wanted, detail: was === wanted ? "" : `expected ${wanted}, got ${was}` };
}
/** Judge what a runner saw against the rows it was given, by name. */
export function judge(rows, observed) {
    const seen = new Map(observed.map((entry) => [entry.name, entry]));
    return rows.map((row) => {
        const entry = seen.get(row.name);
        if (!entry)
            return { name: row.name, ok: false, detail: "the row did not run, and no tier claims it" };
        if (entry.error)
            return { name: row.name, ok: false, detail: entry.error };
        const { ok, detail } = compare(row, entry.got);
        return { name: row.name, ok, detail };
    });
}
/**
 * Run rows here, in whatever runtime this module is loaded in.
 *
 * In the page each row gets a **fresh** `<maths-figure>`, the element the loader hands a
 * module, so no row can pass because another row left the document in a helpful state.
 * Under `node` there is no document and `host` is `undefined`, which is exactly the
 * constraint that makes a `pure` row pure.
 */
export function observe(rows, kit) {
    const hasDocument = typeof document !== "undefined" && !!document.body;
    return rows.map((row) => {
        const host = hasDocument ? document.createElement("maths-figure") : undefined;
        if (host)
            document.body.append(host);
        try {
            return { name: row.name, got: row.call(kit, host) };
        }
        catch (error) {
            return { name: row.name, error: String(error && error.message ? error.message : error).slice(0, 240) };
        }
        finally {
            if (host)
                host.remove();
        }
    });
}
/** Measure the table: the rows per tier, and the exports each tier and the table reach. */
export function coverage(tier, kitExports) {
    const mine = rowsFor(tier);
    const other = rowsFor(tier === "pure" ? "dom" : "pure");
    const covers = (rows) => [...new Set(rows.flatMap(coversOf))].sort();
    const coveredAll = covers(ROWS);
    const stray = [];
    if (kitExports.length) {
        for (const row of ROWS) {
            for (const name of coversOf(row)) {
                if (!kitExports.includes(name))
                    stray.push({ row: row.name, covers: name });
            }
        }
    }
    return {
        total: ROWS.length,
        pure: ROWS.filter((row) => row.tier === "pure").length,
        dom: ROWS.filter((row) => row.tier === "dom").length,
        both: ROWS.filter((row) => row.tier === "both").length,
        ran: mine.length,
        other: other.length,
        coveredHere: covers(mine).filter((name) => !kitExports.length || kitExports.includes(name)),
        coveredAll: coveredAll.filter((name) => !kitExports.length || kitExports.includes(name)),
        uncovered: kitExports.filter((name) => !coveredAll.includes(name)).sort(),
        tierless: ROWS.filter((row) => !TIERS.includes(row.tier)),
        stray,
    };
}
/** The report: one line of counts, the table's shape, and what no row reaches. */
export function summary(tier, kitExports, verdict) {
    const seen = coverage(tier, kitExports);
    const lines = [
        `figure kit (${tier}): ${verdict}, ${seen.ran} rows run, ${seen.coveredHere.length} of ${kitExports.length} exports covered`,
        `  the table: ${seen.pure} pure, ${seen.both} both, ${seen.dom} dom — ${seen.total} rows, ${seen.ran} for this tier, ${seen.other} for the ${tier === "pure" ? "dom" : "pure"} tier`,
        seen.uncovered.length
            ? `  exports with no row: ${seen.uncovered.join(", ")}`
            : `  exports with no row: none — all ${kitExports.length} have one`,
    ];
    return lines;
}
/** Everything that is wrong with the table's own shape, before any row is judged. */
export function tableProblems(tier, kitExports) {
    const seen = coverage(tier, kitExports);
    const problems = [];
    if (!kitExports.length) {
        problems.push("the kit module exports nothing, so no row could cover anything");
    }
    for (const row of seen.tierless) {
        problems.push(`"${row.name}" has tier "${row.tier}", which no runner reads`);
    }
    // One line per export rather than one per row: a kit that dropped a whole layer would
    // otherwise report the same fact forty times and hide the rest.
    for (const name of [...new Set(seen.stray.map((stray) => stray.covers))].sort()) {
        const rows = seen.stray.filter((stray) => stray.covers === name).map((stray) => stray.row);
        problems.push(`${name} is claimed by ${rows.length} row(s) but the kit does not export it: ${rows[0]}`);
    }
    if (!seen.ran)
        problems.push("no row is in this tier's scope, so the check examined nothing");
    return problems;
}
/**
 * Judge a tier's rows, print the result with its counts, and return the exit code.
 *
 * The counts are printed whether the run passed or failed: a run that reports its own
 * size cannot be mistaken for a run that examined nothing, and "which tier checks this
 * control" is answered by the same line.
 */
export function conclude(options) {
    const { tier, kitExports, verdicts, title } = options;
    const problems = [
        ...tableProblems(tier, kitExports),
        ...verdicts.filter((verdict) => !verdict.ok).map((verdict) => `${verdict.name}: ${verdict.detail}`),
    ];
    if (problems.length) {
        console.error(`${title} does not keep its contract:`);
        for (const problem of problems)
            console.error(`   ${problem}`);
    }
    for (const line of summary(tier, kitExports, problems.length ? "contract broken" : "contract kept")) {
        console.log(line);
    }
    return problems.length ? 1 : 0;
}
/** The `--list` output: every row this tier runs, with its tier and what it covers. */
export function listLines(tier) {
    const seen = coverage(tier, []);
    const lines = rowsFor(tier).map((row) => `${row.tier.padEnd(4)}  ${row.name}${coversOf(row).length ? `  [${coversOf(row).join(", ")}]` : ""}`);
    lines.push("", `the table: ${seen.pure} pure, ${seen.both} both, ${seen.dom} dom — ${seen.total} rows, ${seen.ran} for this tier, ${seen.other} for the ${tier === "pure" ? "dom" : "pure"} tier`);
    return lines;
}
