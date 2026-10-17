// Tier-1 guided investigation: the boundary between the two rounded values.
//
// Section 4.1 rounds by looking at the next digit, and the misconception it names is
// a leading zero counted as significant — but the trap underneath both is the
// *boundary*: a number is nearer one of two candidates, and the boundary is halfway
// between them. So the figure zooms the number line onto the two candidates, marks
// the boundary, and shows which side the number is on. A reader who has seen 2.65
// sitting exactly on the boundary between 2.6 and 2.7 has the rule for free.
//
// The line zooms to the deciding interval rather than showing the whole number, so
// the gap between the candidates is visible at every accuracy.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { circle, fmt, label, line, numberLine, panel, react, chooser, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A number line zoomed onto the two values a number rounds to, with the boundary marked between them",
    description:
      "The two values the number could round to sit at the ends of the line. A dashed line marks the " +
      "boundary halfway between them, and a dot marks the number itself, so the reader can see which " +
      "side of the boundary it lies on.",
    prompt: "Predict which of the two values the number rounds to, then move it and check.",
    width: 560,
    height: 170,
  });

  const value = slider(el, { id: "value", label: "Number", min: 0, max: 20, step: 0.01, value: 2.65, show: true });
  const place = chooser(el, {
    id: "place",
    label: "Round to",
    choices: [
      { value: "0", label: "the nearest whole number" },
      { value: "1", label: "1 decimal place" },
      { value: "2", label: "2 decimal places" },
    ],
    value: "1",
  });

  function update() {
    const x = Number(value.value);
    const d = Number(place.value);
    const scale = Math.pow(10, d);
    const lowerScaled = Math.floor(x * scale + 1e-9);
    const lower = lowerScaled / scale;
    const upper = (lowerScaled + 1) / scale;
    const boundary = (lowerScaled + 0.5) / scale;
    const answer = x + 1e-9 >= boundary ? upper : lower;
    const decidedUp = x + 1e-9 >= boundary;

    const placeName = d === 0 ? "the nearest whole number" : `${d} decimal place${d > 1 ? "s" : ""}`;
    const line_ = numberLine({ width: 560, height: 130, min: lower, max: upper, step: 2, label: "" });

    let drawing = line_.draw;
    // The boundary is the whole lesson, so it is drawn first and given a name.
    drawing += line({
      x1: line_.x(boundary),
      y1: line_.y - 30,
      x2: line_.x(boundary),
      y2: line_.y + 8,
      class: "fig-warn",
      width: 2,
      dash: "5 4",
    });
    drawing += label({
      x: line_.x(boundary),
      y: line_.y - 38,
      text: `boundary ${fmt(boundary, d + 1)}`,
      size: 16,
      class: "text-warn",
    });
    drawing += circle({ cx: line_.x(x), cy: line_.y, r: 7, class: "fig-accent" });
    drawing += label({
      x: line_.x(x),
      y: line_.y - 16,
      text: fmt(x, 2),
      size: 18,
      class: "text-accent",
      weight: 600,
    });
    svg.innerHTML = drawing;

    const deciding = Math.floor(x * Math.pow(10, d + 1) + 1e-9) % 10;
    const where = Math.abs(x - boundary) < 1e-9 ? "exactly on" : decidedUp ? "above" : "below";
    const roundWord = decidedUp ? "up" : "down";
    const digitNote =
      where === "exactly on"
        ? `The digit after the one you keep is ${deciding}, so the rule rounds it up.`
        : `The digit after the one you keep is ${deciding}, which is ${deciding >= 5 ? "5 or more" : "less than 5"}, so it rounds ${roundWord}.`;

    readout.textContent =
      `${fmt(x, 2)} lies between ${fmt(lower, d)} and ${fmt(upper, d)}. ` +
      `The boundary is ${fmt(boundary, d + 1)}, and ${fmt(x, 2)} is ${where} it, so the answer rounds ${roundWord}. ` +
      `${digitNote} ${fmt(x, 2)} rounded to ${placeName} is ${fmt(answer, d)}.`;
  }

  react([value, place], update);
}
