// The same mechanism in three dimensions, which is where the front view came from.
//
// This is a diagram, not a computation: the points are the geometry's, and the only
// thing the reader changes is where they are standing. That is the point of having
// it — a reader who has followed the front view can see that the two circles the
// arms sweep are really cylinders, and that the front view is what those cylinders
// look like from in front of the car.
//
// `camera3d()` gives a projection and a depth; the scale here is computed **once**
// from the geometry's own radius, so rotating the camera turns the mechanism without
// zooming it. Lines are drawn far to near, which is what makes the far side of the
// wheel pass behind the near side.
import { SIZE, camera3d, label, line, panel, react, slider } from "./kit.js";
import { GEOMETRY } from "../data/mechanism.js";

const WIDTH = 560;
const HEIGHT = 300;
const MARGIN = 26;
const WHEEL_STEPS = 40;

const P = GEOMETRY;

/** One line of the drawing: two points in the mechanism's own coordinates. */
function segments() {
  const list = [
    // The lower wishbone is a triangle: two legs and the chassis spacing.
    { from: P.lcaf, to: P.lbj, class: "fig-accent", width: 3 },
    { from: P.lcar, to: P.lbj, class: "fig-accent", width: 3 },
    { from: P.lcaf, to: P.lcar, class: "fig-grid", width: 1.4 },
    // The upper wishbone, the same way up.
    { from: P.ucaf, to: P.ubj, class: "fig-accent", width: 3 },
    { from: P.ucar, to: P.ubj, class: "fig-accent", width: 3 },
    { from: P.ucaf, to: P.ucar, class: "fig-grid", width: 1.4 },
    // The upright, which carries the ball joints, the hub and the steering arm.
    { from: P.lbj, to: P.ubj, class: "fig-ink", width: 4 },
    { from: P.lbj, to: P.wc, class: "fig-ink", width: 2 },
    { from: P.ubj, to: P.wc, class: "fig-ink", width: 2 },
    // The axle stub, and the steering arm out to the track rod.
    { from: P.wc, to: P.wco, class: "fig-ink", width: 2 },
    { from: P.ubj, to: P.tro, class: "fig-ink", width: 2 },
    { from: P.tri, to: P.tro, class: "fig-warn", width: 2.4 },
  ];
  // The wheel is a circle in the plane of the hub, which is the plane the axle is
  // normal to. Drawn as short segments so it sorts with everything else by depth.
  for (let i = 0; i < WHEEL_STEPS; i += 1) {
    const a = (2 * Math.PI * i) / WHEEL_STEPS;
    const b = (2 * Math.PI * (i + 1)) / WHEEL_STEPS;
    list.push({
      from: [P.wc[0], P.wc[1] + P.tyreRadius * Math.cos(a), P.wc[2] + P.tyreRadius * Math.sin(a)],
      to: [P.wc[0], P.wc[1] + P.tyreRadius * Math.cos(b), P.wc[2] + P.tyreRadius * Math.sin(b)],
      class: "fig-grid",
      width: 1.6,
    });
  }
  return list;
}

const PARTS = segments();

// **The fit is rotation-invariant, and it fits the box rather than a sphere.** A fit
// to the projected bounding box would zoom in and out as the camera turns, which
// reads as the mechanism breathing rather than as the reader walking round it. But a
// sphere fit wastes most of a wide, short panel: the camera only turns about the
// vertical axis, so the height never changes and the width does. So the horizontal
// radius and the vertical extent are fitted separately, and both are the same at
// every yaw.
const POINTS = PARTS.flatMap((s) => [s.from, s.to]);
// The centroid is taken over the joints, not over the eighty points of the wheel
// circle: those would drag it outboard and leave the linkage off centre.
const CENTROID = Object.values(P).filter(Array.isArray).reduce(
  (acc, p) => [acc[0] + p[0], acc[1] + p[1], acc[2] + p[2]],
  [0, 0, 0]
);
for (let i = 0; i < 3; i += 1) CENTROID[i] /= Object.values(P).filter(Array.isArray).length;
const RADIUS_H = Math.max(
  ...POINTS.map((p) => Math.hypot(p[0] - CENTROID[0], p[1] - CENTROID[1]))
);
const RADIUS_Z = Math.max(...POINTS.map((p) => Math.abs(p[2] - CENTROID[2])));
const SCALE = Math.min(
  (WIDTH / 2 - MARGIN) / RADIUS_H,
  (HEIGHT / 2 - MARGIN) / RADIUS_Z
);

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A double wishbone suspension drawn in three dimensions, from an angle set by a control",
    description:
      "Two wishbones, each a triangle of two legs and the chassis spacing, join the chassis to " +
      "an upright. The upright carries the hub and the wheel, which is drawn as a circle in the " +
      "plane of the hub, and a track rod runs from the chassis to the steering arm. The nearer " +
      "parts of the drawing are drawn over the further ones.",
    prompt: "Turn the mechanism and find the two triangles. Where do they attach to the car?",
    width: WIDTH,
    height: HEIGHT,
    max: 560,
  });

  const yaw = slider(el, {
    id: "yaw",
    label: "Angle of view",
    min: -80,
    max: 80,
    step: 2,
    value: -50,
    show: true,
    unit: "°",
  });

  function draw() {
    const camera = camera3d({ width: WIDTH, height: HEIGHT, yaw: Number(yaw.value), pitch: 18 });
    // **Subtract the centroid before projecting.** The camera projects absolute
    // coordinates, so a mechanism sitting half a metre outboard projects half a metre
    // to the right of the panel and the scale then throws it off the page — which is
    // what the first version did, and it looked like a scale problem.
    const place = (p) => {
      const { ax, screenY, depth } = camera.raw([
        p[0] - CENTROID[0],
        p[1] - CENTROID[1],
        p[2] - CENTROID[2],
      ]);
      return {
        x: WIDTH / 2 + ax * SCALE,
        y: HEIGHT / 2 - screenY * SCALE,
        depth,
      };
    };
    // Far to near, so a nearer leg overwrites the one behind it.
    const sorted = PARTS.map((segment) => {
      const a = place(segment.from);
      const b = place(segment.to);
      return { a, b, segment, depth: (a.depth + b.depth) / 2 };
    }).sort((one, two) => one.depth - two.depth);

    let drawing = "";
    for (const { a, b, segment } of sorted) {
      drawing += line({
        x1: a.x,
        y1: a.y,
        x2: b.x,
        y2: b.y,
        class: segment.class,
        width: segment.width,
      });
    }

    // The joints themselves, so each leader line lands on something rather than in a
    // knot of lines.
    for (const joint of [P.lbj, P.ubj, P.wc]) {
      const { x, y } = place(joint);
      drawing += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" class="fig-ink"></circle>`;
    }

    // Two names, as callouts down the empty side of the panel with a leader line to
    // each joint, **ordered by where the joints land on the screen**. Written in the
    // order the chapter names them, the two leaders crossed each other, and a label
    // whose line you have to trace is worse than no label.
    const named = [
      { point: P.ubj, text: "upper ball joint" },
      { point: P.lbj, text: "lower ball joint" },
    ]
      .map((entry) => ({ ...entry, placed: place(entry.point) }))
      .sort((one, two) => one.placed.y - two.placed.y);
    named.forEach((entry, row) => {
      const top = 64 + row * 40;
      drawing += label({
        x: 24,
        y: top,
        text: entry.text,
        anchor: "start",
        size: SIZE.tick,
        class: "text-ink",
      });
      drawing += line({
        x1: 24 + entry.text.length * 7.6,
        y1: top - 5,
        x2: entry.placed.x,
        y2: entry.placed.y,
        class: "fig-grid",
        width: 1,
      });
    });

    svg.innerHTML = drawing;
    readout.textContent =
      `The view is turned ${Math.abs(Number(yaw.value))} degrees to the ` +
      `${Number(yaw.value) < 0 ? "left" : "right"}. Each wishbone is a triangle of two legs, ` +
      `so each one holds the upright at a single point: that is why the front view could treat ` +
      `it as one rigid body and draw the wheel's swing as a circle. The two legs are apart in ` +
      `this direction, and on top of each other when you look from the front of the car. The ` +
      `wheel is drawn as its rim, in the plane of the hub.`;
  }

  react(yaw, draw);
}
