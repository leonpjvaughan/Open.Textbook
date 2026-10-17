/* The drawing layer: scales, axes and marks.
 *
 * Everything here is a **pure function returning an SVG string**. Nothing touches the
 * DOM, so a mark can be concatenated, tested without a browser, and composed in any
 * order — and a module keeps writing `svg.innerHTML = frame + marks`, which is what
 * 209 modules already do.
 *
 * Why this layer exists at all. The kit used to refuse to draw, on the argument that
 * "a framework for 177 bespoke diagrams would be a framework around nothing". That
 * was right about *bespoke* drawing and wrong about *repeated* drawing:
 *
 *   * 162 of the 209 modules draw a straight line in a `fig-*` class — an axis, a
 *     tick, a guide or an edge;
 *   * 68 draw a `<rect>`, 54 a `<polygon>`, 44 a `<path>`, and 44 sample a curve
 *     segment by segment;
 *   * 24 hand-build a coordinate mapping and only 22 call `scale()`.
 *
 * Those are the same five drawings, re-earned 200 times, and the re-earning is where
 * the legibility defects came from: a title, a tick and an axis label each hand-sized,
 * and five figures ended up below the 9px phone floor. So the marks are shared and the
 * *arrangement* stays bespoke, which is the line the first kit was reaching for.
 *
 * Two rules hold for every mark:
 *
 *   * **the colour class is a parameter with a safe default** (`fig-ink`, or
 *     `text-ink` for text), so a mark cannot ship without one;
 *   * **every coordinate is rounded** through `coord()`, so a mark cannot ship
 *     `183.99999999999997`.
 */

import { SIZE, coord, fmt, label } from "./text.js";

/**
 * Map a value in its own units to an SVG coordinate, in one axis.
 *
 * Twenty modules built this by hand and the arithmetic is identical each time — which
 * is exactly why the sign errors are not. A y-axis that counts upwards and an SVG
 * y-axis that counts downwards is the pair that gets flipped, and a flipped axis looks
 * like a correct drawing until someone reads a value off it.
 *
 * The returned function carries **`.invert`**, the mapping back. That is what a drag
 * needs — a pointer position is an SVG coordinate and the value is what belongs
 * there — and having it on the mapper is why `draggable()` can take
 * `toValue: (point) => x.invert(point.x)` instead of every module re-deriving the
 * inverse.
 *
 * @param {object} o
 * @param {[number, number]} o.domain  the values to map, `[low, high]`
 * @param {[number, number]} o.range  the SVG coordinates, `[low, high]`
 * @returns {((value: number) => number) & {invert: (position: number) => number}}
 */
export function scale({ domain, range }) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  if (d1 === d0) throw new Error("scale: the domain has no width, so it cannot be mapped");
  const map = (value) => r0 + ((Number(value) - d0) / (d1 - d0)) * (r1 - r0);
  map.invert = (position) => d0 + ((Number(position) - r0) / (r1 - r0)) * (d1 - d0);
  return map;
}

/**
 * The lowest and highest of a list, or of one field of a list of points.
 *
 * A hand-written `Math.min(...values)` over an empty list is `Infinity`, and over a
 * hundred thousand values it overflows the argument list. This handles both, and it is
 * how a domain is usually found: `scale({ domain: extent(values), range: [...] })`.
 */
export function extent(values, pick) {
  let low = Infinity;
  let high = -Infinity;
  for (const item of values) {
    const value = pick ? pick(item) : item;
    if (!Number.isFinite(value)) continue;
    if (value < low) low = value;
    if (value > high) high = value;
  }
  if (low === Infinity) return [0, 1];
  return low === high ? [low, low + 1] : [low, high];
}

/**
 * Round numbers to a count, on the 1–2–5 progression a reader expects.
 *
 * A count read off an axis at a "nice" value — 0.5, 1, 1.5 — is read; the same count
 * read at 0.4712 is arithmetic. This is the standard algorithm and it is here rather
 * than in a module because every axis wants it and a hand-picked tick list drifts from
 * the data as soon as a slider moves the domain.
 *
 * @param {object} o
 * @param {number} o.from  the low end of the domain
 * @param {number} o.to    the high end
 * @param {number} [o.count]  roughly how many ticks; default 5
 * @returns {number[]} the tick values inside the domain, ascending
 */
export function ticks({ from, to, count = 5 }) {
  const low = Math.min(from, to);
  const high = Math.max(from, to);
  const span = high - low;
  if (!(span > 0)) return [low];
  const wanted = Math.max(2, Math.min(20, Math.round(count)));
  const rough = span / (wanted - 1);
  const magnitude = Math.floor(Math.log10(rough));
  const power = Math.pow(10, magnitude);
  const error = rough / power;
  const step = power * (error >= 7.5 ? 10 : error >= 3.5 ? 5 : error >= 1.5 ? 2 : 1);
  const out = [];
  for (let v = Math.ceil(low / step) * step; v <= high + step * 1e-9; v += step) {
    // A float step accumulates: 0.1 + 0.1 + 0.1 is 0.30000000000000004, and that
    // reaches the reader through a tick label.
    out.push(Number(v.toPrecision(12)));
  }
  return out.length ? out : [low];
}

/**
 * One axis of a plotting area.
 *
 * A typedef rather than a `{object}`, and the difference is not cosmetic: with
 * `{object}` the destructured `x` and `y` are typed `{}`, so `x.domain` and `x.ticks`
 * are errors **inside this file** — 23 of them — and every module that reads a mapper
 * off the result inherits the same problem. An annotation that says "object" where it
 * could say what the object holds is worse than no annotation.
 *
 * @typedef {object} AxesOptions
 * @property {number} [width]
 * @property {number} [height]
 * @property {Pad} [pad]
 * @property {AxisOptions} [x]
 * @property {AxisOptions} [y]
 * @property {boolean} [grid]
 * @property {boolean} [origin]
 */

/**
 * @typedef {object} Pad
 * @property {number} [left]
 * @property {number} [right]
 * @property {number} [top]
 * @property {number} [bottom]
 */

/**
 * @typedef {object} AxisOptions
 * @property {number[]} [domain]        `[low, high]`
 * @property {number} [ticks]           how many grid lines; default 5
 * @property {string} [label]           the axis name, drawn at its end
 * @property {(value: number) => string} [tickFormat]  how a tick is written
 */

/**
 * A plotting area: two axes, their ticks, their labels, and the mappers.
 *
 * This is the single most repeated drawing in the collection. It returns **the
 * mappers as well as the string**, so a module draws its own marks with the same
 * geometry the axes used and cannot disagree with them:
 *
 * ```js
 * const { draw, x, y } = axes({ x: { domain: [0, 6], label: "t / s" }, y: { domain: [0, 1] } });
 * svg.innerHTML = draw + curve(samples, { x, y });
 * ```
 *
 * @param {object} [o]
 * @param {number} [o.width]   the viewBox width, matching `panel()`
 * @param {number} [o.height]  the viewBox height, matching `panel()`
 * @param {Pad} [o.pad]        margins for the labels
 * @param {AxisOptions} [o.x]  the horizontal axis
 * @param {AxisOptions} [o.y]  the vertical axis
 * @param {boolean} [o.grid]   faint grid lines at the ticks; default true
 * @param {boolean} [o.origin] a darker line at zero when zero is in range
 *
 * The return type is **inferred, not declared**. It was declared as
 * `{draw: string, x: Function, y: Function, box: object}`, which threw away the two
 * things a caller needs: `x` and `y` are mappers with an `invert`, and `box` has the
 * four edges a module draws between. Declaring them `Function` and `object` made
 * every caller's use of them a type error, which is how an annotation can be worse
 * than none.
 */
export function axes({
  width = 560,
  height = 300,
  pad = {},
  x = {},
  y = {},
  grid = true,
  origin = false,
} = {}) {
  const xDomain = x.domain || [0, 1];
  const yDomain = y.domain || [0, 1];
  const margin = { left: 56, right: 20, top: 18, bottom: 42, ...pad };
  const box = {
    x0: margin.left,
    y0: height - margin.bottom,
    x1: width - margin.right,
    y1: margin.top,
  };
  const mapX = scale({ domain: xDomain, range: [box.x0, box.x1] });
  const mapY = scale({ domain: yDomain, range: [box.y0, box.y1] });
  const xTicks = ticks({ from: xDomain[0], to: xDomain[1], count: x.ticks ?? 5 });
  const yTicks = ticks({ from: yDomain[0], to: yDomain[1], count: y.ticks ?? 5 });
  const showX = x.tickFormat || ((v) => fmt(v, 2));
  const showY = y.tickFormat || ((v) => fmt(v, 2));

  let draw = "";
  // The grid first, so every mark sits on top of it.
  if (grid) {
    for (const t of xTicks) {
      draw += line({ x1: mapX(t), y1: box.y0, x2: mapX(t), y2: box.y1, class: "fig-grid", width: 0.8 });
    }
    for (const t of yTicks) {
      draw += line({ x1: box.x0, y1: mapY(t), x2: box.x1, y2: mapY(t), class: "fig-grid", width: 0.8 });
    }
  }
  draw += line({ x1: box.x0, y1: box.y0, x2: box.x1, y2: box.y0, class: "fig-ink", width: 1.5 });
  draw += line({ x1: box.x0, y1: box.y0, x2: box.x0, y2: box.y1, class: "fig-ink", width: 1.5 });
  if (origin && yDomain[0] < 0 && yDomain[1] > 0) {
    draw += line({ x1: box.x0, y1: mapY(0), x2: box.x1, y2: mapY(0), class: "fig-ink", width: 1.2 });
  }
  for (const t of xTicks) {
    draw += line({ x1: mapX(t), y1: box.y0, x2: mapX(t), y2: box.y0 + 6, class: "fig-ink", width: 1.4 });
    draw += label({ x: mapX(t), y: box.y0 + 22, text: showX(t), size: SIZE.tick, class: "text-ink" });
  }
  for (const t of yTicks) {
    draw += line({ x1: box.x0 - 6, y1: mapY(t), x2: box.x0, y2: mapY(t), class: "fig-ink", width: 1.4 });
    draw += label({ x: box.x0 - 10, y: mapY(t) + 5, text: showY(t), size: SIZE.tick, class: "text-ink", anchor: "end" });
  }
  if (x.label) {
    draw += label({ x: box.x1, y: box.y0 + 40, text: x.label, size: SIZE.value, class: "text-ink", anchor: "end" });
  }
  if (y.label) {
    draw += label({ x: box.x0 - 46, y: box.y1 - 4, text: y.label, size: SIZE.value, class: "text-ink", anchor: "start" });
  }
  return { draw, x: mapX, y: mapY, box, xTicks, yTicks };
}

// --- the marks ---------------------------------------------------------------

/**
 * A straight line.
 *
 * The default class is `fig-ink`, and the default width is 1.5 — the two values a
 * 162-module sample converged on by hand.
 *
 * @param {object} [o]
 * @param {number} o.x1
 * @param {number} o.y1
 * @param {number} o.x2
 * @param {number} o.y2
 * @param {string} [o.class]  a `fig-*` class; `fig-ink` by default
 * @param {number} [o.width]  stroke width in viewBox units
 * @param {string} [o.dash]   an SVG `stroke-dasharray`, when the line is a guide
 */
export function line({ x1, y1, x2, y2, class: cls = "fig-ink", width = 1.5, dash } = {}) {
  const stroke = `stroke-width="${width}"`;
  const dashed = dash ? ` stroke-dasharray="${dash}"` : "";
  return `<line x1="${coord(x1)}" y1="${coord(y1)}" x2="${coord(x2)}" y2="${coord(y2)}" class="${cls}" ${stroke}${dashed}></line>`;
}

/** A circle. The default radius is 5, a size that reads on a phone. */
export function circle({ cx, cy, r = 5, class: cls = "fig-ink" } = {}) {
  return `<circle cx="${coord(cx)}" cy="${coord(cy)}" r="${coord(r)}" class="${cls}"></circle>`;
}

/** A rectangle. */
export function rect({ x, y, width, height, class: cls = "fig-ink", opacity } = {}) {
  const fade = opacity === undefined ? "" : ` opacity="${opacity}"`;
  return `<rect x="${coord(x)}" y="${coord(y)}" width="${coord(width)}" height="${coord(height)}" class="${cls}"${fade}></rect>`;
}

/** A closed shape from a list of `[x, y]` points. */
export function polygon({ points = [], class: cls = "fig-ink" } = {}) {
  const list = points.map(([px, py]) => `${coord(px)},${coord(py)}`).join(" ");
  return `<polygon points="${list}" class="${cls}"></polygon>`;
}

/**
 * A path from SVG path data.
 *
 * The escape hatch, and it is deliberately narrow: a caller writing `d` by hand is
 * writing vertices by hand, so every coordinate still goes through `coord()` first.
 */
export function path({ d, class: cls = "fig-ink", fill = "none", width = 2, dash } = {}) {
  const dashed = dash ? ` stroke-dasharray="${dash}"` : "";
  return `<path d="${d}" fill="${fill}" stroke-width="${width}" class="${cls}"${dashed}></path>`;
}

/**
 * An arrow: a shaft with a head at the tip.
 *
 * Hand-built in every module that needs one, and the head is the part that gets
 * skipped — a bare line is not an arrow, and "the force is the arrow" is the whole
 * figure. The shaft stops short of the tip so the head sits on the point rather than
 * behind it.
 *
 * @param {object} o
 * @param {number} [o.head]  the head length in viewBox units; default 10
 */
export function arrow({ x1, y1, x2, y2, class: cls = "fig-ink", width = 2, head = 10, dash } = {}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;
  const baseX = x2 - ux * head;
  const baseY = y2 - uy * head;
  const wing = head * 0.45;
  const shaft = line({ x1, y1, x2: baseX, y2: baseY, class: cls, width, dash });
  const tip = polygon({
    points: [
      [x2, y2],
      [baseX - uy * wing, baseY + ux * wing],
      [baseX + uy * wing, baseY - ux * wing],
    ],
    class: cls,
  });
  return shaft + tip;
}

/** A polyline through mapped points, as one path. */
export function curve(points, { x, y, class: cls = "fig-accent", width = 2.5, dash } = {}) {
  if (!points || points.length < 2) return "";
  const d = points
    .map(([px, py], i) => `${i ? "L" : "M"}${coord(x(px))} ${coord(y(py))}`)
    .join(" ");
  return path({ d, class: cls, width, dash });
}

/**
 * A function sampled onto a path.
 *
 * The convenience that removes the 44 hand-written sampling loops, and the place the
 * sampling rule lives: sample the **mapped** x range, not the domain, so a function
 * with a pole or a sharp turn is not missed because the samples were evenly spaced in
 * the wrong space.
 *
 * A sample that is not finite — a division by zero, a log of a negative — breaks the
 * path instead of poisoning it with `NaN`, which would drop the whole line.
 */
export function graph(fn, { x, y, samples = 120, from, to, class: cls = "fig-accent", width = 2.5, dash } = {}) {
  const domain = x && x.domain ? x.domain : [0, 1];
  const start = from ?? domain[0];
  const end = to ?? domain[1];
  const count = Math.max(2, Math.min(600, Math.round(samples)));
  let d = "";
  let pen = false;
  for (let i = 0; i < count; i += 1) {
    const value = start + ((end - start) * i) / (count - 1);
    const height = fn(value);
    if (!Number.isFinite(height)) {
      pen = false;
      continue;
    }
    d += `${pen ? "L" : "M"}${coord(x(value))} ${coord(y(height))} `;
    pen = true;
  }
  return d ? path({ d: d.trim(), class: cls, width, dash }) : "";
}

/** A filled region between a curve and a horizontal baseline. */
export function area(points, { x, y, baseline = 0, class: cls = "fig-accent", opacity = 0.25 } = {}) {
  if (!points || points.length < 2) return "";
  // `baseline` is an **SVG y coordinate**, not a value — the mapper does not know its
  // own domain, and guessing it would put the fill in the wrong place without saying
  // so. `axes()` returns the box, so the caller always has the number.
  const d =
    points.map(([px, py], i) => `${i ? "L" : "M"}${coord(x(px))} ${coord(y(py))}`).join(" ") +
    ` L${coord(x(points[points.length - 1][0]))} ${coord(baseline)}` +
    ` L${coord(x(points[0][0]))} ${coord(baseline)} Z`;
  return path({ d, class: cls, fill: "currentColor", width: 0, opacity });
}

/**
 * Dots at mapped points.
 *
 * @param {Array<[number, number]>} points  values in the axes' own units, not SVG units
 * @param {object} [o]
 * @param {Function} o.x  the x mapper the axes returned
 * @param {Function} o.y  the y mapper the axes returned
 * @param {number} [o.r]      radius in viewBox units
 * @param {string} [o.class]  a `fig-*` class; `fig-ink` by default
 */
export function dots(points, { x, y, r = 4, class: cls = "fig-ink" } = {}) {
  let draw = "";
  for (const [px, py] of points) draw += circle({ cx: x(px), cy: y(py), r, class: cls });
  return draw;
}

/** Bars from a list of mapped values. */
export function bars(items, { x, y, width, class: cls = "fig-accent" } = {}) {
  let draw = "";
  for (const item of items) {
    const left = x(item.from);
    const right = x(item.to);
    const top = y(item.value);
    const base = y(item.baseline ?? 0);
    draw += rect({
      x: Math.min(left, right),
      y: Math.min(top, base),
      width: width === undefined ? Math.abs(right - left) - 1 : width,
      height: Math.abs(base - top),
      class: cls,
    });
  }
  return draw;
}

/**
 * A number line: one axis, its ticks, and room for points and intervals.
 *
 * Its own helper because it is a graph with one axis and the arrowheads and the
 * interval bars are its own small job — and because inequalities, integers, rounding,
 * error intervals, absolute value and the modulus all want one, and the Irish books
 * have none.
 */
export function numberLine({ width = 560, min = -5, max = 5, step, label: axisLabel = "x", height = 84 } = {}) {
  const margin = 44;
  const box = { x0: margin, x1: width - margin, y: height * 0.62 };
  const mapX = scale({ domain: [min, max], range: [box.x0, box.x1] });
  let draw = "";
  draw += line({ x1: box.x0 - 14, y1: box.y, x2: box.x1 + 20, y2: box.y, class: "fig-ink", width: 1.6 });
  draw += arrow({ x1: box.x1 + 20, y1: box.y, x2: box.x1 + 30, y2: box.y, class: "fig-ink", width: 1.6, head: 9 });
  for (const t of ticks({ from: min, to: max, count: step || 5 })) {
    draw += line({ x1: mapX(t), y1: box.y - 5, x2: mapX(t), y2: box.y + 5, class: "fig-ink", width: 1.4 });
    draw += label({ x: mapX(t), y: box.y + 24, text: fmt(t, 2), size: SIZE.tick, class: "text-ink" });
  }
  if (axisLabel) {
    draw += label({ x: box.x1 + 34, y: box.y + 5, text: axisLabel, size: SIZE.value, class: "text-ink", anchor: "start" });
  }
  // The module draws its own points and intervals with the returned mapper and `y`,
  // which is the SVG coordinate of the line itself. An interval is a thick `line` and
  // an open end is a `circle` with `class="fig-paper"` for the outer ring.
  return { draw, x: mapX, y: box.y, box };
}

/**
 * A Venn diagram whose region labels are placed by geometry rather than by hand.
 *
 * The reason this is in the kit rather than in a module: **an atom in the wrong
 * region teaches the opposite of the truth.** A hand-placed label is a judgement about
 * whether a point is inside two overlapping circles, and the judgement is easy to get
 * wrong and impossible to see when it is. So a region is declared as a predicate —
 * inside these sets, outside those — and `venn()` finds the point that satisfies it
 * and is furthest from every boundary, which centres the label in its own region by
 * construction.
 *
 * It is also the one figure several books want *identically*: set notation is the same
 * in GCSE Mathematics, in Junior Cycle Mathematics (8.4) and in Leaving Certificate
 * Mathematics (10.4), so it is the first module in the shared library.
 *
 * ```js
 * const v = venn({
 *   circles: [{ id: "A", cx: 255, cy: 150, r: 88 }, { id: "B", cx: 325, cy: 150, r: 88 }],
 *   regions: [
 *     { id: "a", in: ["A"], out: ["B"], text: "A only" },
 *     { id: "ab", in: ["A", "B"], text: "A ∩ B" },
 *   ],
 * });
 * svg.innerHTML = v.draw + dots(...)   // v.points.ab is where the label goes
 * ```
 *
 * @param {object} o
 * @param {Array<{id: string, cx: number, cy: number, r: number, class?: string}>} o.circles
 * @param {Array<{id: string, in?: string[], out?: string[], text?: string}>} o.regions
 *   `in` are the sets the region is inside, `out` the sets it is outside. A region with
 *   no `in` is the exterior.
 * @param {object} [o.box]  the universal set's rectangle; default derives one
 * @param {number} [o.step]  the sampling step in viewBox units; default 2
 * @param {boolean} [o.labels]  draw each region's `text` at its point; default true
 * @param {boolean} [o.rings]  draw the circles and the rectangle; default true
 * @returns {{draw: string, points: Record<string, {x: number, y: number}>, circles: object}}
 */
export function venn({
  circles = [],
  regions = [],
  box,
  step = 2,
  labels = true,
  rings = true,
  labelSize = SIZE.tick,
} = {}) {
  if (!circles.length) return { draw: "", points: {}, circles: circles };
  // The frame has to reach each circle's **far** edge, not its near one. Taking the
  // extent of `cx - r` alone gave a box that stopped at the rightmost left edge, so
  // every region to the right of it was unreachable and silently absent from the
  // result — half a Venn diagram, with no error.
  const [minX, maxX] = [Math.min(...circles.map((c) => c.cx - c.r)), Math.max(...circles.map((c) => c.cx + c.r))];
  const [minY, maxY] = [Math.min(...circles.map((c) => c.cy - c.r)), Math.max(...circles.map((c) => c.cy + c.r))];
  const frame = box || {
    x: minX - 34,
    y: minY - 34,
    width: maxX - minX + 68,
    height: maxY - minY + 68,
  };

  const inside = (circle, x, y) => Math.hypot(x - circle.cx, y - circle.cy) <= circle.r;
  // The distance to the nearest boundary: a circle's own edge, or the frame's. The
  // point that maximises it is the one furthest into its region, which is where a
  // label belongs.
  const clearance = (x, y) => {
    let nearest = Math.min(x - frame.x, frame.x + frame.width - x, y - frame.y, frame.y + frame.height - y);
    for (const circle of circles) {
      nearest = Math.min(nearest, Math.abs(Math.hypot(x - circle.cx, y - circle.cy) - circle.r));
    }
    return nearest;
  };

  const points = {};
  for (const region of regions) {
    const want = new Set(region.in || []);
    const avoid = new Set(region.out || []);
    let best = null;
    let bestClearance = -Infinity;
    for (let y = frame.y + step; y < frame.y + frame.height; y += step) {
      for (let x = frame.x + step; x < frame.x + frame.width; x += step) {
        // `true` to begin with: a region with nothing to avoid (the intersection) has
        // no failing circle, and an exterior region only fails on the sets it is
        // outside of. Starting this from `avoid.size > 0` rejected every candidate for
        // every region that had no `out`, which silently produced half a diagram.
        let ok = true;
        for (const circle of circles) {
          const isIn = inside(circle, x, y);
          if (want.has(circle.id) && !isIn) { ok = false; break; }
          if (avoid.has(circle.id) && isIn) { ok = false; break; }
        }
        if (!ok) continue;
        const clear = clearance(x, y);
        if (clear > bestClearance) {
          bestClearance = clear;
          best = { x, y };
        }
      }
    }
    if (best) points[region.id] = best;
  }

  let draw = "";
  if (rings) {
    draw += rect({ x: frame.x, y: frame.y, width: frame.width, height: frame.height, class: "fig-grid" });
    for (const circle of circles) {
      draw += `<circle cx="${coord(circle.cx)}" cy="${coord(circle.cy)}" r="${coord(circle.r)}" class="${circle.class || "fig-ink"}" fill="none" stroke-width="1.6"></circle>`;
    }
  }
  if (labels) {
    for (const region of regions) {
      const point = points[region.id];
      if (!point || !region.text) continue;
      draw += label({ x: point.x, y: point.y + 5, text: region.text, size: labelSize, class: region.class || "text-ink" });
    }
  }
  return { draw, points, circles: frame };
}

/**
 * A vector field: arrows on a grid, drawn from a function.
 *
 * Six modules in `ie-lc-physics` alone hand-build this — the field of a bar magnet, of
 * a wire, of two charges, of two plates, the force on a conductor, the field that turns
 * a motor — and each of them re-derives the same two things: the direction of an arrow
 * from a vector, and the conversion of that direction into SVG coordinates, where the
 * y-axis counts the other way.
 *
 * The field function is given in **data units** and the mappers turn it into a
 * direction, so a flipped axis cannot flip the arrows without also flipping the axes.
 * Arrows are drawn at a fixed length because a field diagram shows *direction and
 * relative strength*, and a proportional length on a coarse grid is unreadable; pass
 * `strength` to vary it if the page is about magnitude.
 *
 * @param {object} o
 * @param {(x: number, y: number) => [number, number]} o.field  the vector at a point
 * @param {Function} o.x  the x mapper from `axes()`
 * @param {Function} o.y  the y mapper from `axes()`
 * @param {object} o.box  the plot box from `axes()`
 * @param {number} [o.step]  grid spacing in SVG units; default 36
 * @param {number} [o.length]  arrow length in SVG units; default 16
 * @param {string} [o.class]  a `fig-*` class; default `fig-grid`
 * @param {(x: number, y: number) => number} [o.strength]  scales the arrow length
 */
export function vectorField({
  field,
  x,
  y,
  box,
  step = 36,
  length = 16,
  class: cls = "fig-grid",
  head = 5,
  strength,
} = {}) {
  let draw = "";
  for (let px = box.x0; px <= box.x1; px += step) {
    for (let py = box.y1; py <= box.y0; py += step) {
      const [dx, dy] = field(x.invert(px), y.invert(py));
      // The direction in SVG units, through the mappers — which is what makes a
      // y-axis that counts upwards come out right.
      const sx = x(x.invert(px) + dx) - px;
      const sy = y(y.invert(py) + dy) - py;
      const size = Math.hypot(sx, sy);
      if (!(size > 0)) continue;
      const scale = strength ? Math.min(1.6, Math.max(0.35, strength(x.invert(px), y.invert(py)))) : 1;
      const reach = length * scale;
      const ux = (sx / size) * reach;
      const uy = (sy / size) * reach;
      draw += arrow({ x1: px - ux / 2, y1: py - uy / 2, x2: px + ux / 2, y2: py + uy / 2, class: cls, width: 1.4, head });
    }
  }
  return draw;
}

/**
 * A camera for small 3D drawings: solids, 3D vectors, a plane.
 *
 * Not a 3D engine. It is a **fixed camera and a painter's algorithm**, which is all a
 * textbook needs to draw a cuboid with its hidden edges dashed, and it is here because
 * "can't do 3D" is a *content* limit rather than a presentational one: nets folding into
 * solids, the volume of a prism as a stack of layers, and three perpendicular axes are
 * all in the specifications and none of them can be drawn in a flat SVG.
 *
 * The camera looks at the origin from a yaw and a pitch, and `drawMesh` resolves
 * visibility by winding: a face is **back-facing** when its projected vertices run the
 * wrong way round, and an edge is hidden when every face containing it is back-facing.
 * That rule is exact for a convex solid, which is every solid a school textbook draws,
 * and it means a module states its geometry and nothing about the view.
 *
 * ```js
 * const cam = camera3d({ width: 560, height: 300 });
 * const cube = { vertices: [...], faces: [{ indices: [0,1,2,3] }, ...] };
 * svg.innerHTML = cam.drawMesh(cube);
 * ```
 *
 * @param {object} o
 * @param {number} [o.yaw]  degrees anticlockwise about the vertical axis; default -32
 * @param {number} [o.pitch]  degrees above the horizontal; default 22
 * @param {number} [o.zoom]  a multiplier on the fitted size; default 1
 * @returns {{project: Function, depth: Function, drawMesh: Function, centre: object}}
 */
export function camera3d({ width = 560, height = 300, yaw = -32, pitch = 22, zoom = 1, margin = 26 } = {}) {
  const ry = (yaw * Math.PI) / 180;
  const rx = (pitch * Math.PI) / 180;
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const centre = { x: width / 2, y: height / 2 };

  // The direction from the scene towards the camera, in world space: the gradient of
  // the depth we sort on. A face is visible when its outward normal has a positive
  // part along this, which is exact and — with the outward orientation below — does
  // not care which way round a module happened to list a face's vertices.
  const toward = [cosX * sinY, sinX, cosX * cosY];

  // The rotate-then-project step. `depth` is what the painter's algorithm sorts on:
  // bigger is nearer to the camera.
  const raw = ([x, y, z]) => {
    const ax = x * cosY - z * sinY;
    const az = x * sinY + z * cosY;
    return { ax, screenY: y * cosX - az * sinX, depth: y * sinX + az * cosX };
  };

  /** Project one point at a given scale, about a given screen centre. */
  const at = (point, scale, origin) => {
    const { ax, screenY } = raw(point);
    return { x: origin.x + ax * scale, y: origin.y - screenY * scale, depth: raw(point).depth };
  };

  // `project` is the unfitted mapping, for a caller that has already worked out its
  // own scale. `drawMesh` fits instead, because only it knows the whole geometry.
  const project = (point) => at(point, zoom, centre);

  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

  const drawMesh = ({
    vertices = [],
    faces = [],
    edges = [],
    origin = [0, 0, 0],
    hidden = "dashed",
    backClass = "fig-grid",
    frontClass = "fig-accent",
    lineClass = "fig-ink",
    hiddenClass = "fig-grid",
    fill = false,
    fillFront = 0.2,
    fillBack = 0.07,
  } = {}) => {
    if (!vertices.length) return "";

    // **Fit the geometry to the drawing.** The camera has no idea how big the solid is
    // — the first version projected a unit cube to one pixel — so the caller states the
    // vertices in its own units and this scales them to the box, minus a margin for the
    // labels and the dashed edges.
    const centred = vertices.map((v) => sub(v, origin));
    const laid = centred.map((v) => raw(v));
    const xs = laid.map((p) => p.ax);
    const ys = laid.map((p) => p.screenY);
    const spanX = Math.max(...xs) - Math.min(...xs);
    const spanY = Math.max(...ys) - Math.min(...ys);
    const usableX = Math.max(1, width - 2 * margin);
    const usableY = Math.max(1, height - 2 * margin);
    const fit = Math.min(spanX > 0 ? usableX / spanX : Infinity, spanY > 0 ? usableY / spanY : Infinity) * zoom;
    const midX = (Math.max(...xs) + Math.min(...xs)) / 2;
    const midY = (Math.max(...ys) + Math.min(...ys)) / 2;
    const placed = laid.map((p) => ({
      x: centre.x + (p.ax - midX) * fit,
      y: centre.y - (p.screenY - midY) * fit,
      depth: p.depth,
    }));

    // The solid's own centre, so a face's normal can be turned outward regardless of
    // the order its vertices were written in.
    const centroid = centred.reduce((acc, v) => [acc[0] + v[0] / centred.length, acc[1] + v[1] / centred.length, acc[2] + v[2] / centred.length], [0, 0, 0]);

    const faceInfo = faces.map((face) => {
      const world = face.indices.map((i) => centred[i]);
      let normal = cross(sub(world[1], world[0]), sub(world[2], world[0]));
      const faceCentre = world.reduce((acc, v) => [acc[0] + v[0] / world.length, acc[1] + v[1] / world.length, acc[2] + v[2] / world.length], [0, 0, 0]);
      if (dot(normal, sub(faceCentre, centroid)) < 0) normal = [-normal[0], -normal[1], -normal[2]];
      return { face, front: dot(normal, toward) > 0, points: face.indices.map((i) => placed[i]) };
    });

    let draw = "";
    // The far faces first, so a filled solid reads as a solid rather than a cut-out.
    for (const { face, front, points } of [...faceInfo].sort((a, b) => {
      const mean = (f) => f.points.reduce((s, p) => s + p.depth, 0) / f.points.length;
      return mean(a) - mean(b);
    })) {
      if (!fill) break;
      const d = points.map((p, i) => `${i ? "L" : "M"}${coord(p.x)} ${coord(p.y)}`).join(" ") + " Z";
      draw += path({
        d,
        class: face.class || (front ? frontClass : backClass),
        fill: "currentColor",
        opacity: front ? (face.opacity ?? fillFront) : (face.opacity ?? fillBack),
        width: 1.2,
      });
    }

    // Then the edges. An edge is hidden when **every** face that contains it is
    // back-facing — the rule for a convex solid, which is every solid a school textbook
    // draws.
    const faceOf = new Map();
    for (const { face, front } of faceInfo) {
      const list = face.indices;
      for (let i = 0; i < list.length; i += 1) {
        const a = list[i];
        const b = list[(i + 1) % list.length];
        const key = a < b ? `${a}-${b}` : `${b}-${a}`;
        faceOf.set(key, [...(faceOf.get(key) || []), front]);
      }
    }
    for (const edge of edges) {
      const [a, b] = edge.between;
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      const list = faceOf.get(key) || [];
      const isHidden = edge.hidden ?? (list.length > 0 && list.every((front) => !front));
      draw += line({
        x1: placed[a].x,
        y1: placed[a].y,
        x2: placed[b].x,
        y2: placed[b].y,
        class: isHidden ? hiddenClass : edge.class || lineClass,
        width: isHidden ? 1.2 : 1.8,
        dash: isHidden && hidden === "dashed" ? "4 3" : undefined,
      });
    }
    return draw;
  };

  return { project, raw, toward, drawMesh, centre, width, height, zoom };
}
