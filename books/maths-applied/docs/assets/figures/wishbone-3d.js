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
const HEIGHT = 320;
const MARGIN = 40;
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

// The fit is rotation-invariant: the mean point of the geometry and its radius.
// A fit to the *projected* bounding box would zoom in and out as the camera turns,
// which reads as the mechanism breathing rather than as the reader walking round it.
const centre3d = PARTS.flatMap((s) => [s.from, s.to]).reduce(
  (acc, p) => [acc[0] + p[0], acc[1] + p[1], acc[2] + p[2]],
  [0, 0, 0]
);
for (let i = 0; i < 3; i += 1) centre3d[i] /= PARTS.length * 2;
const radius = Math.max(
  ...PARTS.flatMap((s) => [s.from, s.to]).map((p) =>
    Math.hypot(p[0] - centre3d[0], p[1] - centre3d[1], p[2] - centre3d[2])
  )
);
const SCALE = (Math.min(WIDTH, HEIGHT) / 2 - MARGIN) / radius;

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
    value: -32,
    show: true,
    unit: "°",
  });

  function draw() {
    const camera = camera3d({ width: WIDTH, height: HEIGHT, yaw: Number(yaw.value), pitch: 18 });
    const place = (p) => {
      const { ax, screenY, depth } = camera.raw(p);
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

    // Three names, because they are the three things the chapter keeps talking about.
    const tag = (point, text, cls) => {
      const { x, y } = place(point);
      return label({ x, y: y - 10, text, size: SIZE.tick, class: cls });
    };
    drawing += tag(P.lbj, "lower ball joint", "text-accent");
    drawing += tag(P.ubj, "upper ball joint", "text-accent");
    drawing += tag(P.wc, "hub", "text-ink");

    svg.innerHTML = drawing;
    readout.textContent =
      `The view is turned ${Math.abs(Number(yaw.value))} degrees to the ` +
      `${Number(yaw.value) < 0 ? "left" : "right"}. Each wishbone is a triangle of two legs, ` +
      `so each one holds the upright at a single point: that is why the front view could treat ` +
      `it as one rigid body and draw the wheel's swing as a circle. The two legs are apart in ` +
      `this direction, and on top of each other when you look from the front of the car.`;
  }

  react(yaw, draw);
}
