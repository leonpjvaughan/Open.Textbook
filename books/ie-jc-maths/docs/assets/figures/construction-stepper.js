// A construction the reader advances one step at a time.
//
// Section 20.2 teaches a construction as a procedure: the compass width is set once,
// the arcs are drawn from each end, and the line through the two crossings is the
// perpendicular bisector. A finished diagram shows the answer and hides the order,
// and the order is the thing a reader gets wrong. So the figure draws the segment,
// then the arcs from A, then the arcs from B, then the bisector, and the reader moves
// one step at a time with the compass width held fixed in the drawing and in the
// sentence.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { SIZE, circle, coord, fmt, label, line, panel, path, react, stepper } from "./kit.js";

// The drawing is a scale drawing: 24 units on the page are 1 cm on the paper, so the
// segment [AB] is 10 cm and the compass is open to 6.5 cm.
const PER_CM = 24;
const A = [160, 180];
const B = [400, 180];
const RADIUS = 6.5 * PER_CM;
const HALF = Math.sqrt(RADIUS * RADIUS - ((B[0] - A[0]) / 2) ** 2);
const P = [(A[0] + B[0]) / 2, A[1] - HALF];
const Q = [(A[0] + B[0]) / 2, A[1] + HALF];

const STEPS = [
  {
    text: `Draw the segment [AB]. It is ${fmt(10)} cm long, so its midpoint is ${fmt(5)} cm from each end.`,
  },
  {
    text:
      `Open the compass to ${fmt(6.5)} cm, which is more than half of ${fmt(10)} cm. ` +
      `Draw an arc above [AB] and an arc below it, both centred on A.`,
  },
  {
    text:
      `With centre B and the same compass width, draw two more arcs. They cross the first pair at P and Q. ` +
      `Each of P and Q is ${fmt(6.5)} cm from A and ${fmt(6.5)} cm from B.`,
  },
  {
    text:
      `Draw the line through P and Q. It is the perpendicular bisector of [AB]: ` +
      `it meets [AB] at the midpoint, ${fmt(5)} cm from A and ${fmt(5)} cm from B, at a right angle.`,
  },
];

/** An arc as path data, from one angle to another, measured in degrees. */
function arcPath(cx, cy, radius, fromDeg, toDeg) {
  const points = [];
  for (let i = 0; i <= 48; i += 1) {
    const angle = ((fromDeg + ((toDeg - fromDeg) * i) / 48) * Math.PI) / 180;
    points.push(`${i ? "L" : ""}${coord(cx + radius * Math.cos(angle))} ${coord(cy + radius * Math.sin(angle))}`);
  }
  return points.join(" ");
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A step-by-step construction of the perpendicular bisector of a segment",
    description:
      "A straight segment from A to B with a compass arc drawn from each end. The two arcs " +
      "cross above and below the segment at the points P and Q. A straight line through P " +
      "and Q meets the segment at its midpoint at a right angle. The steps are advanced one " +
      "at a time with the control below.",
    prompt: "Predict whether the points P and Q lie the same distance from A as they do from B.",
    width: 560,
    height: 360,
  });

  const step = stepper(el, { steps: STEPS, label: "Step", id: "step", value: 0 });

  function update() {
    const at = step.index;

    let drawing = "";
    // The segment [AB], drawn from the first step on.
    drawing += line({ x1: A[0], y1: A[1], x2: B[0], y2: B[1], class: "fig-ink", width: 2.4 });
    drawing += label({ x: (A[0] + B[0]) / 2, y: A[1] + 26, text: "10 cm", size: SIZE.tick, class: "text-ink" });
    drawing += label({ x: A[0] - 12, y: A[1] + 6, text: "A", size: SIZE.value, class: "text-ink", anchor: "end" });
    drawing += label({ x: B[0] + 12, y: B[1] + 6, text: "B", size: SIZE.value, class: "text-ink", anchor: "start" });
    drawing += circle({ cx: A[0], cy: A[1], r: 4, class: "fig-ink" });
    drawing += circle({ cx: B[0], cy: B[1], r: 4, class: "fig-ink" });

    // The compass width, shown as a radius from A, from the first arc on.
    if (at >= 1) {
      const top = [A[0] + RADIUS * Math.cos((-55 * Math.PI) / 180), A[1] + RADIUS * Math.sin((-55 * Math.PI) / 180)];
      drawing += line({ x1: A[0], y1: A[1], x2: top[0], y2: top[1], class: "fig-warn", width: 1.6, dash: "5 4" });
      drawing += label({
        x: (A[0] + top[0]) / 2 - 6,
        y: (A[1] + top[1]) / 2,
        text: "6.5 cm",
        size: SIZE.tick,
        class: "text-warn",
        anchor: "end",
      });
      drawing += path({ d: arcPath(A[0], A[1], RADIUS, -55, 55), class: "fig-accent", width: 1.8 });
    }

    // The arcs from B, the two crossings, and the equal distances to P.
    if (at >= 2) {
      drawing += path({ d: arcPath(B[0], B[1], RADIUS, 125, 235), class: "fig-accent", width: 1.8 });
      drawing += line({ x1: A[0], y1: A[1], x2: P[0], y2: P[1], class: "fig-grid", width: 1.4, dash: "4 4" });
      drawing += line({ x1: B[0], y1: B[1], x2: P[0], y2: P[1], class: "fig-grid", width: 1.4, dash: "4 4" });
      drawing += circle({ cx: P[0], cy: P[1], r: 5, class: "fig-good" });
      drawing += circle({ cx: Q[0], cy: Q[1], r: 5, class: "fig-good" });
      drawing += label({ x: P[0] + 12, y: P[1] + 4, text: "P", size: SIZE.value, class: "text-good", anchor: "start" });
      drawing += label({ x: Q[0] + 12, y: Q[1] + 4, text: "Q", size: SIZE.value, class: "text-good", anchor: "start" });
    }

    // The perpendicular bisector itself, and the right angle at the midpoint.
    if (at >= 3) {
      drawing += line({ x1: P[0], y1: 16, x2: Q[0], y2: 344, class: "fig-warn", width: 2.2 });
      drawing += circle({ cx: P[0], cy: A[1], r: 4, class: "fig-warn" });
      drawing += path({
        d: `M${coord(P[0] + 12)} ${coord(A[1])} L${coord(P[0] + 12)} ${coord(A[1] - 12)} L${coord(P[0])} ${coord(A[1] - 12)}`,
        class: "fig-warn",
        width: 1.6,
      });
      drawing += label({ x: P[0] - 12, y: A[1] + 6, text: "M", size: SIZE.value, class: "text-warn", anchor: "end" });
    }

    svg.innerHTML = drawing;
    readout.textContent = STEPS[at].text;
  }

  react(step, update);
}
