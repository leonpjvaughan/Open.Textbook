// Two masses joined by a string over a pulley: the picture behind Section 4.6.
//
// The page treats a mass on a table and a mass on a slope as two cases, and then writes
// one equation for each. An angle slider unites them: at 0 degrees the ramp is a table,
// and the general formula a = (m2 g - m1 g sin t) / (m1 + m2) collapses to the table
// result. So the reader moves the angle and watches the second case become the first.
//
// The readout gives the two pulls and the acceleration and tension, and it deliberately
// does not say which way the system moves. That is the prediction the chapter asks the
// reader to make, and the two pulls are the evidence for it. Both arrows are drawn at a
// fixed length for the same reason: the drawing shows which way each force points, and
// the readout carries the sizes, so nothing gives the comparison away for free.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's bundle in both schemes.
import {
  SIZE,
  arrow,
  circle,
  coord,
  fmt,
  label,
  line,
  panel,
  path,
  polygon,
  react,
  rect,
  sigfig,
  slider,
} from "./kit.js";

const G = 9.8;
const GROUND = 250; // the top of the wedge sits on this line
const FOOT = [70, GROUND]; // the bottom-left corner of the ramp
const RAMP = 230; // px along the ramp surface
const CRATE_W = 46;
const CRATE_H = 30;
const MASS = 36; // px, the side of the hanging block
const ARROW = 48; // px, the length of every force arrow
const DROP = 55; // px, the string below the pulley

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A block on a ramp joined by a string over a pulley to a hanging block",
    description:
      "A block rests on a ramp. A string runs from the block up the ramp, over a pulley " +
      "at the top, and hangs straight down with a second block on the end. Two arrows " +
      "on the block show the tension pulling it up the ramp and the component of its " +
      "weight pulling it down the ramp. Two arrows on the hanging block show the " +
      "tension pulling it up and its weight pulling it down. The readout gives the two " +
      "pulls, the acceleration of the system and the tension in the string.",
    prompt:
      "Before you move the sliders, predict which is larger: the hanging weight or the " +
      "pull along the surface.",
    width: 560,
    height: 400,
  });

  const onRamp = slider(el, {
    id: "m1",
    label: "Mass on the surface",
    min: 2,
    max: 20,
    step: 0.5,
    value: 8,
    show: true,
    unit: "kg",
    name: "The mass on the ramp in kilograms, from 2 to 20",
  });

  const hanging = slider(el, {
    id: "m2",
    label: "Hanging mass",
    min: 1,
    max: 20,
    step: 0.1,
    value: 5,
    show: true,
    unit: "kg",
    name: "The hanging mass in kilograms, from 1 to 20",
  });

  const angle = slider(el, {
    id: "angle",
    label: "Ramp angle",
    min: 0,
    max: 60,
    step: 1,
    value: 25,
    show: true,
    unit: "°",
    name: "The angle of the ramp above the ground in degrees, from 0 to 60",
  });

  function update() {
    const m1 = Number(onRamp.value);
    const m2 = Number(hanging.value);
    const theta = Number(angle.value);
    const radians = (theta * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    // The two pulls along the string, the acceleration of the system, and the tension.
    // The acceleration is taken as a size: the reader works out the direction from the
    // two pulls, which is the chapter's own prediction.
    const drive = m2 * G;
    const hold = m1 * G * sin;
    const balanced = Math.abs(drive - hold) < 0.5;
    // A rounded acceleration of nought is reported as nought: a balance that is exact
    // in the model leaves a float remainder that no reader wants to see.
    const a = balanced ? 0 : Number((Math.abs(drive - hold) / (m1 + m2)).toFixed(6));
    const tension = (m1 * m2 * G * (1 + sin)) / (m1 + m2);

    // The ramp, its geometry in the drawing's own coordinates.
    const along = [cos, -sin]; // up the ramp, in screen coordinates
    const normal = [-sin, -cos]; // away from the ramp surface, in screen coordinates
    const top = [FOOT[0] + RAMP * cos, FOOT[1] - RAMP * sin];
    const seat = [FOOT[0] + 0.42 * RAMP * cos, FOOT[1] - 0.42 * RAMP * sin];

    // The crate, built from its four corners because it turns with the ramp.
    const back = [seat[0] - (CRATE_W / 2) * cos, seat[1] + (CRATE_W / 2) * sin];
    const front = [seat[0] + (CRATE_W / 2) * cos, seat[1] - (CRATE_W / 2) * sin];
    const backTop = [back[0] + CRATE_H * normal[0], back[1] + CRATE_H * normal[1]];
    const frontTop = [front[0] + CRATE_H * normal[0], front[1] + CRATE_H * normal[1]];
    const centre = [seat[0] + (CRATE_H / 2) * normal[0], seat[1] + (CRATE_H / 2) * normal[1]];

    const hangTop = top[1] + DROP;
    const block = [top[0], hangTop + MASS / 2];

    let drawing = "";

    // The wedge, then the ground it stands on.
    drawing += polygon({ points: [FOOT, top, [top[0], GROUND]], class: "fig-grid" });
    drawing += line({ x1: 30, y1: GROUND, x2: 540, y2: GROUND, class: "fig-ink", width: 2 });

    // The angle between the ground and the ramp.
    if (theta > 3) {
      const reach = 46;
      const start = [FOOT[0] + reach, FOOT[1]];
      const end = [FOOT[0] + reach * cos, FOOT[1] - reach * sin];
      drawing += path({
        d:
          `M${coord(start[0])} ${coord(start[1])} A${reach} ${reach} 0 0 0 ` +
          `${coord(end[0])} ${coord(end[1])}`,
        class: "fig-ink",
        width: 1.4,
      });
      drawing += label({
        x: FOOT[0] + reach * 1.42 * Math.cos(radians / 2),
        y: FOOT[1] - reach * 1.42 * Math.sin(radians / 2) + 5,
        text: "θ",
        size: SIZE.value,
        class: "text-ink",
      });
    }

    // The string, from the top of the crate along the surface and then down.
    drawing += line({ x1: front[0], y1: front[1], x2: top[0], y2: top[1], class: "fig-ink", width: 2 });
    drawing += line({ x1: top[0], y1: top[1], x2: top[0], y2: hangTop, class: "fig-ink", width: 2 });
    drawing += circle({ cx: top[0], cy: top[1], r: 9, class: "fig-ink" });
    drawing += label({
      x: top[0] + 16,
      y: top[1] - 8,
      text: "pulley",
      size: SIZE.tick,
      class: "text-ink",
      anchor: "start",
    });

    // The forces, drawn before the bodies so each arrow comes out from behind one.
    drawing += arrow({
      x1: centre[0],
      y1: centre[1],
      x2: centre[0] + ARROW * along[0],
      y2: centre[1] + ARROW * along[1],
      class: "fig-warn",
      width: 2.4,
    });
    drawing += arrow({
      x1: centre[0],
      y1: centre[1],
      x2: centre[0] - ARROW * along[0],
      y2: centre[1] - ARROW * along[1],
      class: "fig-good",
      width: 2.4,
    });
    drawing += arrow({
      x1: block[0],
      y1: block[1],
      x2: block[0],
      y2: block[1] + ARROW,
      class: "fig-good",
      width: 2.4,
    });
    drawing += arrow({
      x1: block[0],
      y1: block[1],
      x2: block[0],
      y2: block[1] - ARROW,
      class: "fig-warn",
      width: 2.4,
    });

    // The two bodies.
    drawing += polygon({ points: [back, front, frontTop, backTop], class: "fig-accent" });
    drawing += rect({
      x: top[0] - MASS / 2,
      y: hangTop,
      width: MASS,
      height: MASS,
      class: "fig-accent",
    });

    // The words.
    drawing += label({
      x: centre[0] + (ARROW + 12) * along[0] + 14 * normal[0],
      y: centre[1] + (ARROW + 12) * along[1] + 14 * normal[1],
      text: "T",
      size: SIZE.tick,
      class: "text-warn",
    });
    drawing += label({
      x: centre[0] - (ARROW + 12) * along[0] + 14 * normal[0],
      y: centre[1] - (ARROW + 12) * along[1] + 14 * normal[1],
      text: "m₁g sin θ",
      size: SIZE.tick,
      class: "text-good",
    });
    drawing += label({
      x: centre[0] + 34 * normal[0],
      y: centre[1] + 34 * normal[1],
      text: "m₁",
      size: SIZE.tick,
      class: "text-accent",
    });
    drawing += label({
      x: block[0] + 14,
      y: block[1] - ARROW - 4,
      text: "T",
      size: SIZE.tick,
      class: "text-warn",
      anchor: "start",
    });
    drawing += label({
      x: block[0] + 14,
      y: block[1] + ARROW + 14,
      text: "m₂g",
      size: SIZE.tick,
      class: "text-good",
      anchor: "start",
    });
    drawing += label({
      x: block[0] + MASS / 2 + 10,
      y: block[1] + 5,
      text: "m₂",
      size: SIZE.tick,
      class: "text-accent",
      anchor: "start",
    });

    svg.innerHTML = drawing;

    readout.textContent =
      `The hanging weight is ${fmt(drive, 2)} N and the component of the weight along ` +
      `the string is ${fmt(hold, 2)} N. The acceleration is ${sigfig(a, 3)} m/s² and ` +
      `the tension is ${sigfig(tension, 3)} N.` +
      (balanced
        ? " The two pulls balance closely, so the system hardly moves."
        : " Compare the two pulls to decide which way the system moves.");
  }

  react([onRamp, hanging, angle], update);
}
