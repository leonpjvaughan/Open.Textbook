// Simple harmonic motion as the shadow of motion in a circle: Section 7.6.
//
// The page proves that x = A cos ωt comes from differentiating, and the proof is short.
// What it cannot show is why a circle has anything to do with a mass on a spring. So the
// figure puts the reference circle beside the graph and joins them: the point P travels
// round the circle, and a horizontal line carries its height across to the graph, where
// the same height is the displacement. The reader scrubs the time and watches the two
// stay in step, which is the whole content of the projection.
//
// The circle and the graph share one vertical scale by construction — the radius of the
// circle is the half-height of the plot — so the joining line is horizontal at every
// moment rather than only at the ends.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's bundle in both schemes.
import {
  animate,
  axes,
  circle,
  coord,
  dots,
  fmt,
  graph,
  label,
  line,
  panel,
  path,
  quantity,
  react,
  sigfig,
  slider,
  SIZE,
} from "./kit.js";

const CX = 125; // the centre of the reference circle, in viewBox units
const CY = 170;
const R = 90; // the radius, which is also the half-height of the graph

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A point moving round a circle and the displacement graph it projects",
    description:
      "On the left is a circle with a radius drawn to a point P that travels round it. " +
      "On the right is a graph of displacement against time. A line joins P to the " +
      "graph, so the height of P is the displacement at that moment. The amplitude and " +
      "the angular frequency are set by two sliders, and the time is set by a scrubber " +
      "or the play button. The readout gives the displacement, the velocity and the " +
      "acceleration at that time, and the period.",
    prompt:
      "Before you move the sliders, predict where the speed is greatest: at the centre " +
      "of the motion or at the ends.",
    width: 560,
    height: 340,
  });

  const amplitude = slider(el, {
    id: "amplitude",
    label: "Amplitude A",
    min: 0.05,
    max: 0.5,
    step: 0.01,
    value: 0.2,
    show: true,
    unit: "m",
    name: "The amplitude in metres, from 0.05 to 0.5",
  });

  const omega = slider(el, {
    id: "omega",
    label: "Angular frequency ω",
    min: 1,
    max: 10,
    step: 0.5,
    value: 3,
    show: true,
    unit: "rad/s",
    name: "The angular frequency in radians per second, from 1 to 10",
  });

  // The scrubber and the play button. `animate` honours a reader who has asked for less
  // motion by opening on the still frame, where the whole curve is already drawn.
  //
  // The time is kept outside `update` because `animate` calls back once before it hands
  // the scrubber back, so a module that read the scrubber inside the callback would
  // reach it before it exists.
  let at = 0;
  animate(el, {
    onFrame: (value) => {
      at = value;
      update();
    },
    duration: 5000,
    label: "Time",
    still: 1,
  });

  function update() {
    const A = Number(amplitude.value);
    const w = Number(omega.value);
    const period = (2 * Math.PI) / w;
    const t = at * period;

    const { draw, x, y, box } = axes({
      width: 560,
      height: 340,
      pad: { left: 270, right: 18, top: 80, bottom: 80 },
      x: { domain: [0, period], ticks: 5, label: "t / s" },
      y: { domain: [-A, A], ticks: 3, label: "x / m" },
    });

    let drawing = "";

    // The reference circle, drawn as one closed arc so that it is a ring and not a disc.
    drawing += path({
      d:
        `M${coord(CX - R)} ${coord(CY)} A${R} ${R} 0 1 0 ${coord(CX + R)} ${coord(CY)} ` +
        `A${R} ${R} 0 1 0 ${coord(CX - R)} ${coord(CY)}`,
      class: "fig-ink",
      width: 1.8,
    });
    drawing += line({ x1: CX - R, y1: CY, x2: CX + R, y2: CY, class: "fig-grid", width: 1.2, dash: "5 4" });
    drawing += line({ x1: CX, y1: CY - R, x2: CX, y2: CY + R, class: "fig-grid", width: 1.2, dash: "5 4" });

    // The whole curve as a faint guide, so the figure is complete before the point moves.
    drawing += graph((value) => A * Math.cos(w * value), {
      x,
      y,
      from: 0,
      to: period,
      samples: 160,
      class: "fig-grid",
      width: 1.6,
      dash: "6 5",
    });
    drawing += graph((value) => A * Math.cos(w * value), {
      x,
      y,
      from: 0,
      to: Math.max(t, 1e-6),
      samples: 160,
      class: "fig-accent",
      width: 2.8,
    });

    // The point, the radius, and the line that keeps the two pictures in step.
    const px = CX + R * Math.sin(w * t);
    const py = CY - R * Math.cos(w * t);
    drawing += line({ x1: CX, y1: CY, x2: px, y2: py, class: "fig-ink", width: 1.6 });
    drawing += line({
      x1: CX,
      y1: py,
      x2: x(t),
      y2: py,
      class: "fig-warn",
      width: 1.4,
      dash: "5 4",
    });
    drawing += circle({ cx: CX, cy: py, r: 5, class: "fig-warn" });
    drawing += circle({ cx: px, cy: py, r: 6, class: "fig-accent" });
    drawing += dots([[t, A * Math.cos(w * t)]], { x, y, r: 6, class: "fig-accent" });

    // The words.
    drawing += label({
      x: px + 12,
      y: py - 8,
      text: "P",
      size: SIZE.tick,
      class: "text-accent",
      anchor: "start",
    });
    drawing += label({
      x: CX + 10,
      y: CY - R + 6,
      text: "A",
      size: SIZE.tick,
      class: "text-ink",
      anchor: "start",
    });
    drawing += label({
      x: CX + 10,
      y: CY + R + 6,
      text: "−A",
      size: SIZE.tick,
      class: "text-ink",
      anchor: "start",
    });
    drawing += label({
      x: CX,
      y: CY + R + 30,
      text: "reference circle",
      size: SIZE.tick,
      class: "text-ink",
    });
    drawing += label({
      x: box.x1,
      y: box.y1 - 8,
      text: "x = A cos ωt",
      size: SIZE.value,
      class: "text-ink",
      anchor: "end",
    });

    svg.innerHTML = drawing;

    readout.textContent =
      `At t = ${quantity(t, "s", 2)} the displacement is ${quantity(A * Math.cos(w * t), "m", 3)}, the ` +
      `velocity is ${quantity(-A * w * Math.sin(w * t), "m", 3)}/s and the acceleration is ` +
      `${quantity(-A * w * w * Math.cos(w * t), "m", 3)}/s². The period is ${sigfig(period, 3)} s, ` +
      `the greatest speed is ${sigfig(A * w, 3)} m/s and the greatest acceleration is ` +
      `${sigfig(A * w * w, 3)} m/s².`;
  }

  react([amplitude, omega], update);
}
