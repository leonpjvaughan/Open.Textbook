// A bouncing ball and the sequence of heights it reaches: Section 6.4.
//
// The page defines the coefficient of restitution as the ratio of the separation speed
// to the approach speed, and then turns that into e = √(h2 / h1) for a ball on a fixed
// floor. One bounce is a single measurement; the sequence is the idea. So the reader
// sets e, and the drawing shows the whole run of bounces with the height of each one,
// while the readout names the ratio that produces them. The heights fall as a geometric
// sequence with ratio e squared, and that is what makes a small change in e look so
// large by the fourth bounce.
//
// The horizontal axis is time, and the ball travels at 1 m/s, so the distance along the
// floor and the time are the same number. The arcs then have their true widths, and the
// bounce times shorten with the heights rather than being spaced by hand.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's bundle in both schemes.
import { SIZE, axes, curve, dots, fmt, label, line, panel, react, slider } from "./kit.js";

const G = 9.8;
const DROP = 2; // m, the height the ball is released from
const BOUNCES = 5; // how many rebounds are drawn
const X_MAX = 6; // s, the right-hand edge of the drawing
const Y_MAX = 2.4; // m, the top of the drawing

/** The arcs of the flight, and the top of each one, for a given coefficient. */
function flight(e) {
  const arcs = [];
  const tops = [{ t: 0, h: DROP }];
  const firstFall = Math.sqrt((2 * DROP) / G);
  arcs.push({ from: 0, to: firstFall, h0: DROP, v0: 0 });

  let clock = firstFall;
  let height = DROP;
  for (let i = 0; i < BOUNCES; i += 1) {
    const approach = Math.sqrt(2 * G * height);
    const rebound = e * approach;
    const next = (rebound * rebound) / (2 * G);
    const span = (2 * rebound) / G;
    arcs.push({ from: clock, to: clock + span, h0: 0, v0: rebound });
    tops.push({ t: clock + rebound / G, h: next });
    clock += span;
    height = next;
  }
  return { arcs, tops, approach: Math.sqrt(2 * G * DROP) };
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A ball bouncing on the floor, with each rebound lower than the one before",
    description:
      "A ball is released from a height of 2 metres and bounces on the floor. A slider " +
      "sets the coefficient of restitution. The drawing shows the curve of each bounce, " +
      "the floor, and the top of each bounce marked with its height in metres. The " +
      "readout gives the drop height, the first rebound height, the coefficient and the " +
      "sequence of heights.",
    prompt:
      "Before you move the slider, predict what happens to the first rebound height " +
      "when you halve the coefficient of restitution.",
    width: 560,
    height: 340,
  });

  const bounce = slider(el, {
    id: "e",
    label: "Coefficient of restitution e",
    min: 0,
    max: 1,
    step: 0.05,
    value: 0.6,
    show: true,
    name: "The coefficient of restitution, from 0 to 1",
  });

  function update() {
    const e = Number(bounce.value);
    const { arcs, tops, approach } = flight(e);
    const rebound = e * approach;
    const first = DROP * e * e;

    const { draw, x, y } = axes({
      width: 560,
      height: 340,
      pad: { left: 62, right: 24, top: 26, bottom: 48 },
      x: { domain: [0, X_MAX], ticks: 6, label: "time / s" },
      y: { domain: [0, Y_MAX], ticks: 6, label: "height / m" },
    });

    let drawing = draw;

    // A guide to each height, so the drop in the sequence can be read off the axis.
    for (const top of tops) {
      if (top.t <= 0) continue;
      drawing += line({
        x1: x(0),
        y1: y(top.h),
        x2: x(Math.min(top.t, X_MAX)),
        y2: y(top.h),
        class: "fig-grid",
        width: 1.2,
        dash: "5 4",
      });
    }

    // The arcs of the flight, each one shorter and lower than the last.
    for (const arc of arcs) {
      const end = Math.min(arc.to, X_MAX);
      if (end <= arc.from) continue;
      const points = [];
      for (let i = 0; i <= 40; i += 1) {
        const t = arc.from + ((end - arc.from) * i) / 40;
        const dt = t - arc.from;
        points.push([t, Math.max(0, arc.h0 + arc.v0 * dt - 0.5 * G * dt * dt)]);
      }
      drawing += curve(points, { x, y, class: "fig-accent", width: 2.6 });
    }

    // The top of each bounce, named where there is room for the number.
    for (const top of tops) {
      if (top.t > X_MAX) continue;
      drawing += dots([[top.t, top.h]], { x, y, r: 5, class: "fig-accent" });
      if (top.h < 0.08) continue;
      drawing += label({
        x: x(top.t) + 10,
        y: y(top.h) - 8,
        text: `${fmt(top.h, 2)} m`,
        size: SIZE.tick,
        class: "text-accent",
        anchor: "start",
      });
    }

    svg.innerHTML = drawing;

    const heights = [0, 1, 2, 3, 4].map((n) => DROP * Math.pow(e, 2 * n));
    readout.textContent =
      `The ball is released from ${fmt(DROP, 1)} m and hits the floor at ` +
      `${fmt(approach, 2)} m/s. It leaves at ${fmt(rebound, 2)} m/s and rises to ` +
      `${fmt(first, 2)} m, so e = √(${fmt(first, 2)} / ${fmt(DROP, 1)}) = ${fmt(e, 2)}. ` +
      `Each rebound is e² = ${fmt(e * e, 2)} of the one before: the heights are ` +
      `${heights.map((h) => fmt(h, 2)).join(" m, ")} m.`;
  }

  react([bounce], update);
}
