// The height of a kicked ball at a wall: the picture behind Section 3.7.
//
// The page splits a launch velocity into two components and joins them with one shared
// time. That method is invisible in an equation — the two directions run at once, and
// only the time links them — so the reader sets the speed and the angle, and the
// drawing shows the curve up to the wall and the height at which the ball arrives. The
// readout carries the two components, the time taken and that height, so every number
// in the method is on screen together.
//
// The curve stops at the wall on purpose. Section 3.8 asks where the ball lands, and a
// drawing that showed the landing would answer a question the next page sets. The wall
// is the obstacle from the chapter problem: 15 m away and 3 m high.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's bundle in both schemes.
import { SIZE, axes, curve, dots, fmt, label, panel, react, rect, slider } from "./kit.js";

const G = 9.8;
const WALL_X = 15; // m, the wall from the chapter problem
const WALL_Y = 3; // m
const X_MAX = 18; // m, the right-hand edge of the drawing
const Y_MAX = 14; // m, the top of the drawing
const PAST = 17.5; // m, how far a ball that clears the wall is followed

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "The curve of a kicked ball up to a wall 15 metres away and 3 metres high",
    description:
      "A ball is kicked from the ground towards a wall. Two sliders set the launch " +
      "speed and the launch angle. The drawing shows the curve of the ball up to the " +
      "wall, the wall itself, and the point where the ball reaches the wall. The " +
      "readout gives the horizontal and vertical parts of the launch velocity, the " +
      "time taken to reach the wall, and the height there.",
    prompt:
      "Before you move the sliders, predict what happens to the height at the wall " +
      "when you increase the launch angle.",
    width: 560,
    height: 340,
  });

  const speed = slider(el, {
    id: "speed",
    label: "Launch speed",
    min: 10,
    max: 20,
    step: 0.5,
    value: 20,
    show: true,
    unit: "m/s",
    name: "The launch speed in metres per second, from 10 to 20",
  });

  const angle = slider(el, {
    id: "angle",
    label: "Launch angle",
    min: 10,
    max: 50,
    step: 1,
    value: 35,
    show: true,
    unit: "°",
    name: "The launch angle above the ground in degrees, from 10 to 50",
  });

  function update() {
    const u = Number(speed.value);
    const theta = Number(angle.value);
    const radians = (theta * Math.PI) / 180;
    const ux = u * Math.cos(radians);
    const uy = u * Math.sin(radians);

    const tWall = WALL_X / ux;
    const tLand = (2 * uy) / G;
    const reaches = tLand > tWall;
    const yWall = uy * tWall - 0.5 * G * tWall * tWall;
    const clears = reaches && yWall >= WALL_Y;

    // How much of the flight to draw. A ball that clears the wall is followed a little
    // further, so the curve leaves the picture rather than stopping in mid-air.
    let tEnd = tLand;
    if (reaches) tEnd = clears ? Math.min(tLand, PAST / ux) : tWall;

    const { draw, x, y } = axes({
      width: 560,
      height: 340,
      pad: { left: 62, right: 24, top: 26, bottom: 48 },
      x: { domain: [0, X_MAX], ticks: 4, label: "distance / m" },
      y: { domain: [0, Y_MAX], ticks: 7, label: "height / m" },
    });

    let drawing = draw;

    // The wall, drawn first so the curve sits on top of it.
    drawing += rect({
      x: x(WALL_X) - 5,
      y: y(WALL_Y),
      width: 10,
      height: y(0) - y(WALL_Y),
      class: "fig-ink",
      opacity: 0.3,
    });
    drawing += label({
      x: x(WALL_X),
      y: y(WALL_Y) - 10,
      text: "wall",
      size: SIZE.tick,
      class: "text-ink",
    });

    // The curve, sampled in time because time is the quantity the two directions share.
    const points = [];
    for (let i = 0; i <= 80; i += 1) {
      const t = (tEnd * i) / 80;
      points.push([ux * t, Math.max(0, uy * t - 0.5 * G * t * t)]);
    }
    drawing += curve(points, { x, y, class: "fig-accent", width: 2.8 });

    if (reaches) {
      drawing += dots([[WALL_X, Math.max(0, yWall)]], { x, y, r: 6, class: "fig-accent" });
      drawing += label({
        x: x(WALL_X) + 12,
        y: y(Math.max(0, yWall)) - 10,
        text: `${fmt(yWall, 2)} m`,
        size: SIZE.tick,
        class: "text-accent",
        anchor: "start",
      });
    } else {
      drawing += dots([[tLand * ux, 0]], { x, y, r: 6, class: "fig-warn" });
      drawing += label({
        x: x(tLand * ux) + 12,
        y: y(0) - 10,
        text: "lands",
        size: SIZE.tick,
        class: "text-warn",
        anchor: "start",
      });
    }

    svg.innerHTML = drawing;

    const opening =
      `At ${fmt(u, 1)} m/s and ${fmt(theta, 0)}° the horizontal velocity is ` +
      `${fmt(ux, 2)} m/s and the vertical velocity is ${fmt(uy, 2)} m/s. `;
    if (!reaches) {
      readout.textContent =
        `${opening}The ball lands before it reaches the wall, so it does not clear it.`;
    } else if (clears) {
      readout.textContent =
        `${opening}The ball takes ${fmt(tWall, 3)} s to reach the wall and it is ` +
        `${fmt(yWall, 2)} m high there. That is above the 3 m wall, so it clears the ` +
        `wall by ${fmt(yWall - WALL_Y, 2)} m.`;
    } else {
      readout.textContent =
        `${opening}The ball takes ${fmt(tWall, 3)} s to reach the wall and it is ` +
        `${fmt(yWall, 2)} m high there. That is below the 3 m wall, so the ball hits ` +
        `the wall.`;
    }
  }

  react([speed, angle], update);
}
