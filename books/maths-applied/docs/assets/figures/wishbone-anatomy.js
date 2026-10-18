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
import { SIZE, circle, diagram, label, line, path, polygon, rect } from "./kit.js";

const CHASSIS = 112;

export function mount(el) {
  const lowerJoint = [302, 246];
  const upperJoint = [286, 118];
  const hub = [338, 152];
  const wheel = [372, 166];
  const R = 96;

  const chassis = () =>
    line({ x1: CHASSIS, y1: 40, x2: CHASSIS, y2: 286, class: "fig-ink", width: 7 }) +
    [56, 82, 108, 134, 160, 186, 212, 238, 264].map((y) =>
      line({ x1: CHASSIS - 14, y1: y, x2: CHASSIS, y2: y - 12, class: "fig-grid", width: 2 })
    ).join("") +
    label({ x: CHASSIS - 4, y: 32, text: "chassis", anchor: "end", size: SIZE.tick, class: "text-ink" });

  const lower = () =>
    line({ x1: CHASSIS, y1: 250, x2: lowerJoint[0], y2: lowerJoint[1], class: "fig-accent", width: 4 }) +
    line({ x1: CHASSIS + 30, y1: 236, x2: lowerJoint[0], y2: lowerJoint[1], class: "fig-accent", width: 4 }) +
    line({ x1: CHASSIS, y1: 250, x2: CHASSIS + 30, y2: 236, class: "fig-grid", width: 2 }) +
    circle({ cx: lowerJoint[0], cy: lowerJoint[1], r: 5, class: "fig-accent" });

  const upper = () =>
    line({ x1: CHASSIS, y1: 96, x2: upperJoint[0], y2: upperJoint[1], class: "fig-accent", width: 4 }) +
    line({ x1: CHASSIS + 30, y1: 110, x2: upperJoint[0], y2: upperJoint[1], class: "fig-accent", width: 4 }) +
    line({ x1: CHASSIS, y1: 96, x2: CHASSIS + 30, y2: 110, class: "fig-grid", width: 2 }) +
    circle({ cx: upperJoint[0], cy: upperJoint[1], r: 5, class: "fig-accent" });

  const upright = () =>
    line({ x1: lowerJoint[0], y1: lowerJoint[1], x2: upperJoint[0], y2: upperJoint[1], class: "fig-ink", width: 6 }) +
    line({ x1: upperJoint[0], y1: upperJoint[1], x2: hub[0], y2: hub[1], class: "fig-ink", width: 4 }) +
    line({ x1: lowerJoint[0], y1: lowerJoint[1], x2: hub[0], y2: hub[1], class: "fig-ink", width: 4 }) +
    circle({ cx: hub[0], cy: hub[1], r: 7, class: "fig-ink" });

  const wheelPart = () =>
    `<circle cx="${wheel[0]}" cy="${wheel[1]}" r="${R}" class="fig-ink" fill="none" stroke-width="5"></circle>` +
    `<circle cx="${wheel[0]}" cy="${wheel[1]}" r="${R - 12}" class="fig-grid" fill="none" stroke-width="2"></circle>`;

  const trackRod = () =>
    line({ x1: CHASSIS, y1: 186, x2: 206, y2: 196, class: "fig-warn", width: 3.5 }) +
    line({ x1: 268, y1: 198, x2: upperJoint[0] + 14, y2: 168, class: "fig-warn", width: 3.5 }) +
    rect({ x: 206, y: 189, width: 62, height: 15, class: "fig-warn", opacity: 0.35 });

  const spring = () => {
    const top = [CHASSIS + 78, 74];
    const bottom = [222, 240];
    let zigzag = `M${bottom[0]} ${bottom[1]} L${top[0]} ${top[1]}`;
    for (let i = 0; i < 9; i += 1) {
      const t = i / 9;
      const x = bottom[0] + (top[0] - bottom[0]) * t;
      const y = bottom[1] + (top[1] - bottom[1]) * t;
      zigzag += ` L${(x - 13).toFixed(1)} ${(y - 11).toFixed(1)} L${(x + 3).toFixed(1)} ${(y - 21).toFixed(1)}`;
    }
    return path({ d: zigzag, class: "fig-ink", width: 2.5 });
  };

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
        description: "The car's body. Everything in the suspension pushes against it, and it is the part the arms pivot on.",
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
        description: "Bolted to the hub. The bottom of the tyre is the contact patch, and that is where the forces between car and road act.",
        draw: wheelPart,
      },
      {
        name: "Track rod",
        description: "Runs from the chassis to the upright. Its length sets the wheel's steer angle, which is what turns the car.",
        draw: trackRod,
      },
      {
        name: "Spring and damper",
        description:
          "Carries the car's weight between the lower wishbone and the chassis. It is the part that lets the wheel move at all without moving the body with it.",
        draw: spring,
      },
    ],
  });
}
