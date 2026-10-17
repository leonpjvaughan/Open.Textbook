// The definite integral as a sum of strips: the reader sets how many, and watches the
// total settle on the exact area.
//
// The page asks the reader to predict what doubling the strip count does, then test it
// with 4 strips and 8. A table of four numbers answers that in one glance and removes the
// prediction; the strips have to move for the idea to land. So the reader sets the count,
// the rule, and sees the total and the exact value together — and the *gap* between them
// is the number the section is about.
//
// The rule chooser earns its place rather than decorating. Left and right rectangles
// bracket the area from opposite sides, so one overestimates and the other underestimates
// on the same curve — which is why "the strips become rectangles" is not quite the whole
// story, and why the midpoint rule beats both at the same count.
import { SIZE, axes, curve, fmt, label, panel, react, rect, segmented, slider } from "./kit.js";

// The page's own example, so the figure and the prose share one number to converge on.
const CURVES = {
  square: { label: "y = x²", f: (x) => x * x, area: 1 / 3 },
  cube: { label: "y = x³", f: (x) => x * x * x, area: 1 / 4 },
};

const MAX_POWER = 6;

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Rectangles fitted under the curve y = x squared between x = 0 and x = 1",
    description:
      "The curve y = x squared from nought to one, with rectangles drawn underneath it. The number " +
      "of rectangles is chosen below, and each one is drawn from the curve down to the axis. The " +
      "total area of the rectangles is given in the readout, next to the exact area of one third.",
    prompt: "Predict what happens to the total when you double the number of strips. Then double it.",
    width: 560,
    height: 340,
  });

  const count = slider(el, {
    id: "strips",
    label: "Strips",
    min: 0,
    max: MAX_POWER,
    step: 1,
    value: 2,
    show: false,
    name: "The number of strips, as a power of two: 1, 2, 4, 8, 16, 32 or 64",
  });

  const rule = segmented(el, {
    id: "rule",
    label: "Height of each strip",
    name: "The height taken for each strip",
    choices: [
      { value: "left", label: "left edge" },
      { value: "right", label: "right edge" },
      { value: "mid", label: "middle" },
    ],
    value: "left",
  });

  const shape = segmented(el, {
    id: "shape",
    label: "Curve",
    name: "The curve to draw the strips under",
    choices: [
      { value: "square", label: "y = x²" },
      { value: "cube", label: "y = x³" },
    ],
    value: "square",
  });

  const { draw, x, y, box } = axes({
    width: 560,
    height: 340,
    pad: { left: 58, right: 26, top: 26, bottom: 46 },
    x: { domain: [0, 1], ticks: 5, label: "x" },
    y: { domain: [0, 1.05], ticks: 5, label: "y" },
  });

  function update() {
    const n = Math.pow(2, Number(count.value));
    const which = rule.value;
    const curveId = shape.value;
    const { f, area, label: curveLabel } = CURVES[curveId] || CURVES.square;

    const width = 1 / n;
    const heightAt = (i) => {
      if (which === "left") return f(i * width);
      if (which === "right") return f((i + 1) * width);
      return f((i + 0.5) * width);
    };

    let drawing = draw;

    // The strips, drawn under the curve so the curve stays legible where they coincide.
    let total = 0;
    for (let i = 0; i < n; i += 1) {
      const h = heightAt(i);
      total += h * width;
      drawing += rect({
        x: x(i * width),
        y: y(h),
        width: x((i + 1) * width) - x(i * width),
        height: y(0) - y(h),
        class: "fig-accent",
        opacity: 0.3,
      });
      // Every strip keeps its outline, so a count of 64 reads as strips rather than as a
      // solid block. Only the tops are drawn when they would crowd.
      if (n <= 16) {
        drawing += rect({
          x: x(i * width),
          y: y(h),
          width: x((i + 1) * width) - x(i * width),
          height: y(0) - y(h),
          class: "fig-ink",
          opacity: 0.35,
        });
      }
    }

    drawing += curve(
      Array.from({ length: 121 }, (_, i) => [i / 120, f(i / 120)]),
      { x, y, class: "fig-ink", width: 2.6 },
    );

    drawing += label({
      x: box.x1 - 6,
      y: y(f(1)) - 10,
      text: curveLabel,
      size: SIZE.value,
      class: "text-ink",
      anchor: "end",
    });

    svg.innerHTML = drawing;

    const gap = total - area;
    const verdict =
      Math.abs(gap) < 0.005
        ? "That is as close as 64 strips can get."
        : gap > 0
          ? `The strips are over the curve by ${fmt(Math.abs(gap))}.`
          : `The strips are under the curve by ${fmt(Math.abs(gap))}.`;
    readout.textContent =
      `With ${n} strip${n === 1 ? "" : "s"} the total is ${fmt(total, 4)}. ` +
      `The exact area is ${fmt(area, 4)}. ${verdict}`;
  }

  react([count, rule, shape], update);
}
