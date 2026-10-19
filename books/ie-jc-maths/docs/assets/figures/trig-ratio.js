// A right-angled triangle whose angle and size the reader controls, so the three
// trigonometric ratios can be read beside the two side lengths.
//
// Section 18.3 states that each ratio depends only on the angle, and not on how big
// the triangle is. That sentence is easy to repeat and hard to believe, because every
// side length moves when the triangle grows. So the figure draws one triangle, lets
// the reader change the angle and the hypotenuse, and reports the opposite side, the
// adjacent side and the three ratios together. The sides change and the ratios stay,
// and the reader sees both happen at once.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import {
  axes,
  curve,
  dots,
  fmt,
  label,
  line,
  panel,
  quantity,
  react,
  slider,
  SIZE,
} from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A right-angled triangle with the angle and the hypotenuse set by the reader",
    description:
      "A right-angled triangle drawn on a centimetre grid. The angle at the bottom-left " +
      "corner and the length of the hypotenuse are chosen with the controls. The side " +
      "opposite the angle, the side adjacent to it and the hypotenuse are labelled, and " +
      "the three trigonometric ratios are given in the readout below.",
    prompt: "Predict whether the three ratios change when you make the triangle bigger. Then test it.",
    width: 560,
    height: 380,
  });

  const angle = slider(el, {
    id: "angle",
    label: "Angle θ in degrees",
    min: 20,
    max: 70,
    step: 1,
    value: 37,
    show: true,
    name: "The angle at the bottom-left corner, in degrees, from 20 to 70",
  });

  const hypotenuse = slider(el, {
    id: "hyp",
    label: "Hypotenuse",
    unit: "cm",
    min: 4,
    max: 10,
    step: 1,
    value: 5,
    show: true,
    name: "The length of the hypotenuse in centimetres, from 4 to 10",
  });

  // The axes carry a centimetre scale. The x domain is wider than the y domain by the
  // ratio of the drawing box, so one centimetre is the same length on both axes and
  // the right angle looks like a right angle. The triangle sits away from the axes, so
  // each side label has room beside its own side.
  const { draw, x, y } = axes({
    width: 560,
    height: 380,
    pad: { left: 56, right: 26, top: 24, bottom: 44 },
    x: { domain: [0, 18.4], ticks: 9, label: "cm" },
    y: { domain: [0, 12], ticks: 7 },
  });

  // The right angle sits at the bottom-right corner, so the angle θ is at the
  // bottom-left and the hypotenuse runs from there to the top-right corner.
  const ORIGIN_X = 2;
  const ORIGIN_Y = 2;

  function update() {
    const degrees = Number(angle.value);
    const radians = (degrees * Math.PI) / 180;
    const hyp = Number(hypotenuse.value);
    const opposite = hyp * Math.sin(radians);
    const adjacent = hyp * Math.cos(radians);

    // The right angle sits at the bottom-right corner, so the angle θ is at the
    // bottom-left and the hypotenuse runs from there to the top-right corner.
    const ax = ORIGIN_X;
    const ay = ORIGIN_Y;
    const cx = ORIGIN_X + adjacent;
    const cy = ORIGIN_Y;
    const bx = ORIGIN_X + adjacent;
    const by = ORIGIN_Y + opposite;

    let drawing = draw;
    drawing += line({ x1: x(ax), y1: y(ay), x2: x(cx), y2: y(cy), class: "fig-ink", width: 2.4 });
    drawing += line({ x1: x(cx), y1: y(cy), x2: x(bx), y2: y(by), class: "fig-ink", width: 2.4 });
    drawing += line({ x1: x(ax), y1: y(ay), x2: x(bx), y2: y(by), class: "fig-ink", width: 2.4 });

    // The small square that marks the right angle.
    const mark = 0.4;
    drawing += curve(
      [
        [cx - mark, cy],
        [cx - mark, cy + mark],
        [cx, cy + mark],
      ],
      { x, y, class: "fig-ink", width: 1.4 },
    );

    // The arc of the angle θ, and its label.
    const radius = 1.2;
    const arc = Array.from({ length: 25 }, (_, i) => {
      const t = (i / 24) * radians;
      return [ax + radius * Math.cos(t), ay + radius * Math.sin(t)];
    });
    drawing += curve(arc, { x, y, class: "fig-warn", width: 1.8 });
    drawing += label({
      x: x(ax + (radius + 0.9) * Math.cos(radians / 2)),
      y: y(ay + (radius + 0.9) * Math.sin(radians / 2)) + 5,
      text: "θ",
      size: SIZE.value,
      class: "text-warn",
    });

    drawing += dots(
      [
        [ax, ay],
        [cx, cy],
        [bx, by],
      ],
      { x, y, r: 4, class: "fig-ink" },
    );

    drawing += label({
      x: x(ax + adjacent / 2),
      y: y(ay) + 22,
      text: "adjacent",
      size: SIZE.tick,
      class: "text-ink",
    });
    drawing += label({
      x: x(bx) + 8,
      y: y(ay + opposite / 2) + 5,
      text: "opposite",
      size: SIZE.tick,
      class: "text-ink",
      anchor: "start",
    });
    drawing += label({
      x: x(ax + adjacent / 2) - 10,
      y: y(ay + opposite / 2) - 14,
      text: "hypotenuse",
      size: SIZE.tick,
      class: "text-accent",
      anchor: "end",
    });

    svg.innerHTML = drawing;

    const sine = Math.sin(radians);
    const cosine = Math.cos(radians);
    const tangent = Math.tan(radians);
    readout.textContent =
      `The angle is ${fmt(degrees, 0)}° and the hypotenuse is ${quantity(hyp, "cm", 0)} long, ` +
      `so the opposite side is ${quantity(opposite, "cm")} and the adjacent side is ${quantity(adjacent, "cm")}. ` +
      `The three ratios are sin θ = ${fmt(sine, 3)}, cos θ = ${fmt(cosine, 3)} and tan θ = ${fmt(tangent, 3)}.`;
  }

  react([angle, hypotenuse], update);
}
