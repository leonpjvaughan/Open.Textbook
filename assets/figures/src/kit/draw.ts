/* The drawing layer: scales, axes and marks.
 *
 * Every function is pure and returns an SVG string, so a mark composes by
 * concatenation and can be tested without a browser. The marks are shared; the
 * arrangement of them stays bespoke to each module.
 *
 * Two rules hold for every mark: the colour class is a parameter with a safe default
 * (`fig-ink`, or `text-ink` for text), and every coordinate goes through `coord()`.
 */

import { SIZE, coord, fmt, label } from "./text.js";

/*
 * The option types are stated twice: as a TypeScript interface here, for this file's
 * own check, and as a JSDoc `@typedef` beside the function, for the compiled copy.
 * `tsc` reads JSDoc types in a `.js` file and ignores them in a `.ts` one, so the
 * annotations that ship in `kit/draw.js` do nothing for the source. The two must
 * agree; the interface is stripped from the output and the typedef is not.
 */

/** A mapping from data units to SVG units, carrying its inverse. */
interface Mapper {
  (value: number): number;
  invert(position: number): number;
  domain?: [number, number];
}

interface ScaleOptions {
  domain: [number, number];
  range: [number, number];
}

interface TicksOptions {
  from: number;
  to: number;
  count?: number;
}

interface Box {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

interface Pad {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

interface AxisOptions {
  domain?: [number, number];
  ticks?: number;
  label?: string;
  tickFormat?: (value: number) => string;
}

interface AxesOptions {
  width?: number;
  height?: number;
  pad?: Pad;
  x?: AxisOptions;
  y?: AxisOptions;
  grid?: boolean;
  origin?: boolean;
}

type Vec3 = [number, number, number];

interface RectOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  class?: string;
  opacity?: number;
}

interface PathOptions {
  d?: string;
  class?: string;
  fill?: string;
  width?: number;
  dash?: string;
}

interface LineOptions {
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  class?: string;
  width?: number;
  dash?: string;
}

interface ArrowOptions {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  class?: string;
  width?: number;
  head?: number;
  dash?: string;
}

interface CurveOptions {
  x: Mapper;
  y: Mapper;
  class?: string;
  width?: number;
  dash?: string;
}

interface GraphOptions {
  x: Mapper;
  y: Mapper;
  samples?: number;
  from?: number;
  to?: number;
  class?: string;
  width?: number;
  dash?: string;
}

interface AreaOptions {
  x: Mapper;
  y: Mapper;
  baseline?: number;
  class?: string;
  opacity?: number;
}

interface DotsOptions {
  x: Mapper;
  y: Mapper;
  r?: number;
  class?: string;
}

interface BarsOptions {
  x: Mapper;
  y: Mapper;
  width?: number;
  class?: string;
}

/** One bar: the values its edges sit at, its height, and the baseline it grows from. */
interface Bar {
  from: number;
  to: number;
  value: number;
  baseline?: number;
}

/** A closed shape's corners, in SVG units. */
interface PolygonOptions {
  points?: Array<[number, number]>;
  class?: string;
}

interface NumberLineOptions {
  width?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  height?: number;
}

interface VennCircle {
  id: string;
  cx: number;
  cy: number;
  r: number;
  class?: string;
}

interface VennRegion {
  id: string;
  in?: string[];
  out?: string[];
  text?: string;
  class?: string;
}

interface VennBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface VennOptions {
  circles?: VennCircle[];
  regions?: VennRegion[];
  box?: VennBox;
  step?: number;
  labels?: boolean;
  rings?: boolean;
  labelSize?: number;
}

interface VectorFieldOptions {
  field: (x: number, y: number) => [number, number];
  x: Mapper;
  y: Mapper;
  box: Box;
  step?: number;
  length?: number;
  class?: string;
  head?: number;
  strength?: (x: number, y: number) => number;
}

interface Camera3dOptions {
  width?: number;
  height?: number;
  yaw?: number;
  pitch?: number;
  zoom?: number;
  margin?: number;
}

interface Placed {
  x: number;
  y: number;
  depth: number;
}

interface MeshFace {
  indices: number[];
  class?: string;
  opacity?: number;
}

/** One edge of a mesh: the vertices it joins, and whether it is hidden by the solid. */
interface MeshEdge {
  between: [number, number];
  hidden?: boolean;
  class?: string;
}

interface FaceInfo {
  face: MeshFace;
  front: boolean;
  points: Placed[];
}

interface MeshOptions {
  vertices?: Vec3[];
  faces?: MeshFace[];
  edges?: MeshEdge[];
  origin?: Vec3;
  hidden?: string;
  backClass?: string;
  frontClass?: string;
  lineClass?: string;
  hiddenClass?: string;
  fill?: boolean;
  fillFront?: number;
  fillBack?: number;
}

/**
 * @typedef {((value: number) => number) & {invert: (position: number) => number}} Mapper
 */

/**
 * @typedef {object} ScaleOptions
 * @property {[number, number]} domain  the values to map, `[low, high]`
 * @property {[number, number]} range  the SVG coordinates, `[low, high]`
 */

/**
 * @param {ScaleOptions} o  the values to map and the coordinates to map them to
 * @returns {((value: number) => number) & {invert: (position: number) => number}}
 */
export function scale({ domain, range }: ScaleOptions) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  if (d1 === d0) throw new Error("scale: the domain has no width, so it cannot be mapped");
  const map = (value: number) => r0 + ((Number(value) - d0) / (d1 - d0)) * (r1 - r0);
  map.invert = (position: number) => d0 + ((Number(position) - r0) / (r1 - r0)) * (d1 - d0);
  return map;
}

export function extent(values: readonly number[]): [number, number];
export function extent<T>(values: readonly T[], pick: (item: T) => number): [number, number];
export function extent(values: readonly any[], pick?: (item: any) => number): [number, number] {
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
 * @typedef {object} TicksOptions
 * @property {number} from  the low end of the domain
 * @property {number} to    the high end
 * @property {number} [count]  roughly how many ticks; default 5
 */

/**
 * @param {TicksOptions} o  the domain, and roughly how many ticks
 * @returns {number[]} the tick values inside the domain, ascending
 */
export function ticks({ from, to, count = 5 }: TicksOptions) {
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
    out.push(Number(v.toPrecision(12)));
  }
  return out.length ? out : [low];
}

/**
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
 * @property {[number, number]} [domain]  `[low, high]`
 * @property {number} [ticks]           how many grid lines; default 5
 * @property {string} [label]           the axis name, drawn at its end
 * @property {(value: number) => string} [tickFormat]  how a tick is written
 */

/**
 * @param {AxesOptions} [o]
 */
export function axes({
  width = 560,
  height = 300,
  pad = {},
  x = {},
  y = {},
  grid = true,
  origin = false,
}: AxesOptions = {}) {
  const xDomain: [number, number] = x.domain || [0, 1];
  const yDomain: [number, number] = y.domain || [0, 1];
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
    const px = mapX(t);
    const anchor = px <= box.x0 + 0.5 ? "start" : px >= box.x1 - 0.5 ? "end" : "middle";
    draw += label({ x: px, y: box.y0 + 22, text: showX(t), size: SIZE.tick, class: "text-ink", anchor });
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

/**
 * @typedef {object} LineOptions
 * @property {number} [x1]
 * @property {number} [y1]
 * @property {number} [x2]
 * @property {number} [y2]
 * @property {string} [class]  a `fig-*` class; `fig-ink` by default
 * @property {number} [width]  stroke width in viewBox units
 * @property {string} [dash]   an SVG `stroke-dasharray`, when the line is a guide
 */

/**
 * @param {LineOptions} [o]
 */
export function line({ x1, y1, x2, y2, class: cls = "fig-ink", width = 1.5, dash }: LineOptions = {}) {
  const stroke = `stroke-width="${width}"`;
  const dashed = dash ? ` stroke-dasharray="${dash}"` : "";
  return `<line x1="${coord(x1)}" y1="${coord(y1)}" x2="${coord(x2)}" y2="${coord(y2)}" class="${cls}" ${stroke}${dashed}></line>`;
}

/**
 * @typedef {object} CircleOptions
 * @property {number} [cx]
 * @property {number} [cy]
 * @property {number} [r]
 * @property {string} [class]
 */

/**
 * A circle. The default radius is 5, a size that reads on a phone.
 * @param {CircleOptions} [o]
 */
export function circle({ cx, cy, r = 5, class: cls = "fig-ink" }: { cx?: number; cy?: number; r?: number; class?: string } = {}) {
  return `<circle cx="${coord(cx)}" cy="${coord(cy)}" r="${coord(r)}" class="${cls}"></circle>`;
}

/**
 * @typedef {object} RectOptions
 * @property {number} [x]
 * @property {number} [y]
 * @property {number} [width]
 * @property {number} [height]
 * @property {string} [class]
 * @property {number} [opacity]
 */

/** A rectangle. @param {RectOptions} [o] */
export function rect({ x, y, width, height, class: cls = "fig-ink", opacity }: RectOptions = {}) {
  const fade = opacity === undefined ? "" : ` opacity="${opacity}"`;
  return `<rect x="${coord(x)}" y="${coord(y)}" width="${coord(width)}" height="${coord(height)}" class="${cls}"${fade}></rect>`;
}

/**
 * @typedef {object} PolygonOptions
 * @property {Array<[number, number]>} [points]  the corners, in SVG units
 * @property {string} [class]  a `fig-*` class; `fig-ink` by default
 */

/** A closed shape from a list of `[x, y]` points. @param {PolygonOptions} [o] */
export function polygon({ points = [], class: cls = "fig-ink" }: PolygonOptions = {}) {
  const list = points.map(([px, py]) => `${coord(px)},${coord(py)}`).join(" ");
  return `<polygon points="${list}" class="${cls}"></polygon>`;
}

/**
 * @typedef {object} PathOptions
 * @property {string} [d]
 * @property {string} [class]
 * @property {string} [fill]
 * @property {number} [width]
 * @property {string} [dash]
 */

/**
 * @param {PathOptions} [o]
 */
export function path({ d, class: cls = "fig-ink", fill = "none", width = 2, dash }: PathOptions = {}) {
  const dashed = dash ? ` stroke-dasharray="${dash}"` : "";
  return `<path d="${d}" style="fill:${fill}" stroke-width="${width}" class="${cls}"${dashed}></path>`;
}

/**
 * @typedef {object} ArrowOptions
 * @property {number} x1
 * @property {number} y1
 * @property {number} x2
 * @property {number} y2
 * @property {string} [class]
 * @property {number} [width]
 * @property {number} [head]  the head length in viewBox units; default 10
 * @property {string} [dash]
 */

/**
 * @param {ArrowOptions} [o]
 */
export function arrow({
  x1,
  y1,
  x2,
  y2,
  class: cls = "fig-ink",
  width = 2,
  head = 10,
  dash,
}: ArrowOptions = {} as ArrowOptions) {
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

/**
 * @typedef {object} CurveOptions
 * @property {Mapper} [x]
 * @property {Mapper} [y]
 * @property {string} [class]
 * @property {number} [width]
 * @property {string} [dash]
 */

/** A polyline through mapped points, as one path. The mappers are required, and
 * @param {Array<[number, number]>} points  values in the axes' own units
 * @param {CurveOptions} [o]
 */
export function curve(
  points: Array<[number, number]>,
  { x, y, class: cls = "fig-accent", width = 2.5, dash }: CurveOptions = {} as CurveOptions,
) {
  if (!points || points.length < 2) return "";
  const d = points
    .map(([px, py], i) => `${i ? "L" : "M"}${coord(x(px))} ${coord(y(py))}`)
    .join(" ");
  return path({ d, class: cls, width, dash });
}

/**
 * @typedef {object} GraphOptions
 * @property {Mapper} [x]
 * @property {Mapper} [y]
 * @property {number} [samples]
 * @property {number} [from]
 * @property {number} [to]
 * @property {string} [class]
 * @property {number} [width]
 * @property {string} [dash]
 */

/**
 * @param {(value: number) => number} fn  the function to sample, in data units
 * @param {GraphOptions} [o]
 */
export function graph(
  fn: (value: number) => number,
  { x, y, samples = 120, from, to, class: cls = "fig-accent", width = 2.5, dash }: GraphOptions = {} as GraphOptions,
) {
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

/**
 * @typedef {object} AreaOptions
 * @property {Mapper} [x]
 * @property {Mapper} [y]
 * @property {number} [baseline]
 * @property {string} [class]
 * @property {number} [opacity]
 */

/** A filled region between a curve and a horizontal baseline.
 * @param {Array<[number, number]>} points  values in the axes' own units
 * @param {AreaOptions} [o]
 */
export function area(
  points: Array<[number, number]>,
  { x, y, baseline = 0, class: cls = "fig-accent", opacity = 0.25 }: AreaOptions = {} as AreaOptions,
) {
  if (!points || points.length < 2) return "";
  // `baseline` is an SVG y coordinate, not a value: the mapper does not know its own
  const d =
    points.map(([px, py], i) => `${i ? "L" : "M"}${coord(x(px))} ${coord(y(py))}`).join(" ") +
    ` L${coord(x(points[points.length - 1][0]))} ${coord(baseline)}` +
    ` L${coord(x(points[0][0]))} ${coord(baseline)} Z`;
  return path({ d, class: cls, fill: "currentColor", width: 0, opacity } as PathOptions);
}

/**
 * @typedef {object} DotsOptions
 * @property {Mapper} [x]  the x mapper the axes returned
 * @property {Mapper} [y]  the y mapper the axes returned
 * @property {number} [r]      radius in viewBox units
 * @property {string} [class]  a `fig-*` class; `fig-ink` by default
 */

/**
 * @param {Array<[number, number]>} points  values in the axes' own units, not SVG units
 * @param {DotsOptions} [o]
 */
export function dots(
  points: Array<[number, number]>,
  { x, y, r = 4, class: cls = "fig-ink" }: DotsOptions = {} as DotsOptions,
) {
  let draw = "";
  for (const [px, py] of points) draw += circle({ cx: x(px), cy: y(py), r, class: cls });
  return draw;
}

/**
 * @typedef {object} BarsOptions
 * @property {Mapper} [x]
 * @property {Mapper} [y]
 * @property {number} [width]
 * @property {string} [class]
 */

/** Bars from a list of mapped values.
 * @param {Bar[]} items  each bar's edges, height and baseline, in data units
 * @param {BarsOptions} [o]
 */
export function bars(items: Bar[], { x, y, width, class: cls = "fig-accent" }: BarsOptions = {} as BarsOptions) {
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
 * @typedef {object} NumberLineOptions
 * @property {number} [width]
 * @property {number} [min]
 * @property {number} [max]
 * @property {number} [step]
 * @property {string} [label]
 * @property {number} [height]
 */

/**
 * @param {NumberLineOptions} [o]
 */
export function numberLine({ width = 560, min = -5, max = 5, step, label: axisLabel = "x", height = 84 }: NumberLineOptions = {}) {
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
  // the SVG coordinate of the line itself.
  return { draw, x: mapX, y: box.y, box };
}

/**
 * @typedef {object} VennOptions
 * @property {Array<{id: string, cx: number, cy: number, r: number, class?: string}>} [circles]
 * @property {Array<{id: string, in?: string[], out?: string[], text?: string}>} [regions]
 *   `in` are the sets the region is inside, `out` the sets it is outside. A region with
 *   no `in` is the exterior.
 * @property {{x: number, y: number, width: number, height: number}} [box]  the universal set's rectangle; default derives one
 * @property {number} [step]  the sampling step in viewBox units; default 2
 * @property {boolean} [labels]  draw each region's `text` at its point; default true
 * @property {boolean} [rings]  draw the circles and the rectangle; default true
 * @property {number} [labelSize]  the size of a region's label; default `SIZE.tick`
 */

/**
 * @param {VennOptions} [o]
 * @returns {{draw: string, points: Record<string, {x: number, y: number}>, circles: VennBox}}
 */
export function venn({
  circles = [],
  regions = [],
  box,
  step = 2,
  labels = true,
  rings = true,
  labelSize = SIZE.tick,
}: VennOptions = {}) {
  if (!circles.length) return { draw: "", points: {}, circles: circles };
  // The frame reaches each circle's far edge, not its near one: taking the extent of
  const [minX, maxX] = [Math.min(...circles.map((c) => c.cx - c.r)), Math.max(...circles.map((c) => c.cx + c.r))];
  const [minY, maxY] = [Math.min(...circles.map((c) => c.cy - c.r)), Math.max(...circles.map((c) => c.cy + c.r))];
  const frame = box || {
    x: minX - 34,
    y: minY - 34,
    width: maxX - minX + 68,
    height: maxY - minY + 68,
  };

  const inside = (circle: VennCircle, x: number, y: number) =>
    Math.hypot(x - circle.cx, y - circle.cy) <= circle.r;
  // The distance to the nearest boundary, a circle's own edge or the frame's. The
  const clearance = (x: number, y: number) => {
    let nearest = Math.min(x - frame.x, frame.x + frame.width - x, y - frame.y, frame.y + frame.height - y);
    for (const circle of circles) {
      nearest = Math.min(nearest, Math.abs(Math.hypot(x - circle.cx, y - circle.cy) - circle.r));
    }
    return nearest;
  };

  const points: Record<string, { x: number; y: number }> = {};
  for (const region of regions) {
    const want = new Set(region.in || []);
    const avoid = new Set(region.out || []);
    let best = null;
    let bestClearance = -Infinity;
    for (let y = frame.y + step; y < frame.y + frame.height; y += step) {
      for (let x = frame.x + step; x < frame.x + frame.width; x += step) {
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
 * @typedef {object} VectorFieldOptions
 * @property {(x: number, y: number) => [number, number]} [field]  the vector at a point
 * @property {Mapper} [x]  the x mapper from `axes()`
 * @property {Mapper} [y]  the y mapper from `axes()`
 * @property {{x0: number, y0: number, x1: number, y1: number}} [box]  the plot box from `axes()`
 * @property {number} [step]  grid spacing in SVG units; default 36
 * @property {number} [length]  arrow length in SVG units; default 16
 * @property {string} [class]  a `fig-*` class; default `fig-grid`
 * @property {number} [head]  arrow head length in SVG units; default 5
 * @property {(x: number, y: number) => number} [strength]  scales the arrow length
 */

/**
 * @param {VectorFieldOptions} [o]
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
}: VectorFieldOptions = {} as VectorFieldOptions) {
  let draw = "";
  for (let px = box.x0; px <= box.x1; px += step) {
    for (let py = box.y1; py <= box.y0; py += step) {
      const [dx, dy] = field(x.invert(px), y.invert(py));
      // The direction in SVG units, through the mappers, which makes a y-axis that
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
 * @typedef {object} Camera3dOptions
 * @property {number} [width]  the viewBox width; default 560
 * @property {number} [height]  the viewBox height; default 300
 * @property {number} [yaw]  degrees anticlockwise about the vertical axis; default -32
 * @property {number} [pitch]  degrees above the horizontal; default 22
 * @property {number} [zoom]  a multiplier on the fitted size; default 1
 * @property {number} [margin]  a margin for the labels; default 26
 */

/**
 * @param {Camera3dOptions} [o]
 * @returns {{project: Function, raw: Function, toward: number[], drawMesh: Function, centre: {x: number, y: number}, width: number, height: number, zoom: number}}
 */
export function camera3d({ width = 560, height = 300, yaw = -32, pitch = 22, zoom = 1, margin = 26 }: Camera3dOptions = {}) {
  const ry = (yaw * Math.PI) / 180;
  const rx = (pitch * Math.PI) / 180;
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const centre = { x: width / 2, y: height / 2 };

  const toward: Vec3 = [cosX * sinY, sinX, cosX * cosY];

  const raw = ([x, y, z]: Vec3) => {
    const ax = x * cosY - z * sinY;
    const az = x * sinY + z * cosY;
    return { ax, screenY: y * cosX - az * sinX, depth: y * sinX + az * cosX };
  };

  const at = (point: Vec3, scale: number, origin: { x: number; y: number }): Placed => {
    const { ax, screenY } = raw(point);
    return { x: origin.x + ax * scale, y: origin.y - screenY * scale, depth: raw(point).depth };
  };

  const project = (point: Vec3) => at(point, zoom, centre);

  const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const cross = (a: Vec3, b: Vec3): Vec3 => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
  const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

  const drawMesh = ({
    vertices = [],
    faces = [],
    edges = [],
    origin = [0, 0, 0] as Vec3,
    hidden = "dashed",
    backClass = "fig-grid",
    frontClass = "fig-accent",
    lineClass = "fig-ink",
    hiddenClass = "fig-grid",
    fill = false,
    fillFront = 0.2,
    fillBack = 0.07,
  }: MeshOptions = {}) => {
    if (!vertices.length) return "";

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

    const centroid = centred.reduce<Vec3>(
      (acc, v) => [acc[0] + v[0] / centred.length, acc[1] + v[1] / centred.length, acc[2] + v[2] / centred.length],
      [0, 0, 0],
    );

    const faceInfo: FaceInfo[] = faces.map((face) => {
      const world = face.indices.map((i) => centred[i]);
      let normal = cross(sub(world[1], world[0]), sub(world[2], world[0]));
      const faceCentre = world.reduce<Vec3>(
        (acc, v) => [acc[0] + v[0] / world.length, acc[1] + v[1] / world.length, acc[2] + v[2] / world.length],
        [0, 0, 0],
      );
      if (dot(normal, sub(faceCentre, centroid)) < 0) normal = [-normal[0], -normal[1], -normal[2]];
      return { face, front: dot(normal, toward) > 0, points: face.indices.map((i) => placed[i]) };
    });

    let draw = "";
    for (const { face, front, points } of faceInfo.toSorted((a, b) => {
      const mean = (f: FaceInfo) => f.points.reduce((s, p) => s + p.depth, 0) / f.points.length;
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
      } as PathOptions);
    }

    // Then the edges. An edge is hidden when every face that contains it is
    const faceOf = new Map<string, boolean[]>();
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
