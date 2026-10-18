// What the parts are called, before any mathematics is done to them.
//
// A reader who has never looked under a car needs the names once, in the place they
// belong, or every later page is a page of unnamed shapes. `diagram()` is the
// primitive for exactly this: the drawing's meaning *is* its named parts, so each
// part is a button under the drawing, the reader moves through them with the
// keyboard, and the drawing follows.
//
// The drawing is a **schematic**, not a scale drawing of the model in the figures
// that follow: it exists to name things, and its proportions are chosen for labels.
// Every later figure is drawn to scale from the same geometry as the solver.
import { SIZE, circle, diagram, label, line, path } from "./kit.js";

const CHASSIS = 112;
const LOWER = [302, 246];
const UPPER = [286, 118];
const HUB = [338, 152];
const WHEEL = [372, 166];
const R = 96;

/**
 * A circle drawn as one arc, because a `fig-*` class paints with
 * `fill: currentColor` and a filled 0.6 m wheel would hide the upright behind it.
 * `fig-grid` is the class whose fill is `none`, so an outline is grey — which is
 * right for a part that sits behind everything else.
 */
const ring = (centre, radius, cls, width) =>
  path({
    d:
      `M${centre[0] - radius} ${centre[1]} ` +
      `A${radius} ${radius} 0 1 0 ${centre[0] + radius} ${centre[1]} ` +
      `A${radius} ${radius} 0 1 0 ${centre[0] - radius} ${centre[1]}`,
    class: cls,
    width,
  });

/** A spring drawn along its axis: a zigzag between two points, with end stubs. */
function spring(from, to, turns, halfWidth) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy);
  const nx = -dy / length;
  const ny = dx / length;
  const stub = 0.16;
  let d = `M${from[0]} ${from[1]}`;
  d += ` L${(from[0] + dx * stub).toFixed(1)} ${(from[1] + dy * stub).toFixed(1)}`;
  for (let i = 0; i < turns; i += 1) {
    const t = stub + ((i + 0.5) / turns) * (1 - 2 * stub);
    const sign = i % 2 === 0 ? 1 : -1;
    d += ` L${(from[0] + dx * t + nx * halfWidth * sign).toFixed(1)} ${(
      from[1] +
      dy * t +
      ny * halfWidth * sign
    ).toFixed(1)}`;
  }
  d += ` L${(to[0] - dx * stub).toFixed(1)} ${(to[1] - dy * stub).toFixed(1)}`;
  d += ` L${to[0]} ${to[1]}`;
  return path({ d, class: "fig-ink", width: 2 });
}

export function mount(el) {
  const chassis = () =>
    line({ x1: CHASSIS, y1: 40, x2: CHASSIS, y2: 286, class: "fig-ink", width: 7 }) +
    [56, 82, 108, 134, 160, 186, 212, 238, 264]
      .map((y) => line({ x1: CHASSIS - 14, y1: y, x2: CHASSIS, y2: y - 12, class: "fig-grid", width: 2 }))
      .join("") +
    label({ x: CHASSIS - 4, y: 32, text: "chassis", anchor: "end", size: SIZE.tick, class: "text-ink" });

  const lower = () =>
    line({ x1: CHASSIS, y1: 250, x2: LOWER[0], y2: LOWER[1], class: "fig-accent", width: 4 }) +
    line({ x1: CHASSIS + 30, y1: 236, x2: LOWER[0], y2: LOWER[1], class: "fig-accent", width: 4 }) +
    line({ x1: CHASSIS, y1: 250, x2: CHASSIS + 30, y2: 236, class: "fig-grid", width: 2 }) +
    circle({ cx: LOWER[0], cy: LOWER[1], r: 5, class: "fig-accent" });

  const upper = () =>
    line({ x1: CHASSIS, y1: 96, x2: UPPER[0], y2: UPPER[1], class: "fig-accent", width: 4 }) +
    line({ x1: CHASSIS + 30, y1: 110, x2: UPPER[0], y2: UPPER[1], class: "fig-accent", width: 4 }) +
    line({ x1: CHASSIS, y1: 96, x2: CHASSIS + 30, y2: 110, class: "fig-grid", width: 2 }) +
    circle({ cx: UPPER[0], cy: UPPER[1], r: 5, class: "fig-accent" });

  const upright = () =>
    line({ x1: LOWER[0], y1: LOWER[1], x2: UPPER[0], y2: UPPER[1], class: "fig-ink", width: 6 }) +
    line({ x1: UPPER[0], y1: UPPER[1], x2: HUB[0], y2: HUB[1], class: "fig-ink", width: 4 }) +
    line({ x1: LOWER[0], y1: LOWER[1], x2: HUB[0], y2: HUB[1], class: "fig-ink", width: 4 }) +
    circle({ cx: HUB[0], cy: HUB[1], r: 7, class: "fig-ink" });

  const wheel = () =>
    ring(WHEEL, R, "fig-grid", 7) + ring(WHEEL, R - 13, "fig-grid", 2);

  const trackRod = () => {
    const from = [CHASSIS, 188];
    const to = [UPPER[0] + 16, 166];
    return (
      line({ x1: from[0], y1: from[1], x2: to[0], y2: to[1], class: "fig-warn", width: 4 }) +
      circle({ cx: from[0], cy: from[1], r: 4, class: "fig-warn" }) +
      circle({ cx: to[0], cy: to[1], r: 4, class: "fig-warn" })
    );
  };

  // A spring and damper side by side: the coil, and the rod through it.
  const springDamper = () =>
    spring([214, 240], [186, 92], 6, 11) +
    line({ x1: 214, y1: 240, x2: 197, y2: 164, class: "fig-grid", width: 3 });

  diagram(el, {
    label: "The parts of a double wishbone front suspension, named one at a time",
    description:
      "The chassis is the car's body, on the left. Two wishbones, each a triangle of two legs, " +
      "join it to an upright, which carries the hub and the wheel. A track rod from the chassis " +
      "to the upright steers the wheel, and a spring and damper between the lower wishbone and " +
      "the chassis carries the car's weight.",
    width: 560,
    height: 320,
    parts: [
      {
        name: "Chassis",
        description:
          "The car's body. Everything in the suspension pushes against it, and it is the part the arms pivot on.",
        draw: chassis,
      },
      {
        name: "Lower wishbone",
        description:
          "A triangle of two legs, joined to the chassis at one end and to the bottom of the upright at a ball joint at the other. The two legs are what stop the upright swinging forward and back.",
        draw: lower,
      },
      {
        name: "Upper wishbone",
        description:
          "The same shape, above the lower one. It is usually shorter, and the angle between the two arms is what decides how the wheel's camber changes as the wheel moves.",
        draw: upper,
      },
      {
        name: "Upright",
        description:
          "The rigid part between the two ball joints. It carries the hub, and the wheel is bolted to the hub, so the upright's angle is the wheel's angle.",
        draw: upright,
      },
      {
        name: "Wheel and tyre",
        description:
          "Bolted to the hub. The bottom of the tyre is the contact patch, and that is where the forces between car and road act.",
        draw: wheel,
      },
      {
        name: "Track rod",
        description:
          "Runs from the chassis to the upright. Its length sets the wheel's steer angle, which is what turns the car.",
        draw: trackRod,
      },
      {
        name: "Spring and damper",
        description:
          "Carries the car's weight between the lower wishbone and the chassis. It is the part that lets the wheel move at all without moving the body with it.",
        draw: springDamper,
      },
    ],
  });
}
