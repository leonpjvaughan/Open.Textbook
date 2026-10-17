// An area model for expanding two brackets.
//
// Section 11.3 expands (x + 2)(x + 3) with a grid and collects the two middle
// terms. The grid keeps the four products in place, but it does not show why there
// are four, or why two of them collect. The rectangle does: the two brackets are
// its two side lengths, and the four products are the four regions. The reader
// changes the constants and watches the middle terms grow.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, and each region is labelled in the drawing, so the four products
// are told apart without colour.
import { SIZE, fmt, label, line, panel, react, rect, slider } from "./kit.js";

// The drawing geometry: the `x` part of each side is XPART wide, and one unit of
// the constant is UNIT wide.
const X0 = 96;
const Y0 = 56;
const XPART = 120;
const UNIT = 22;

/** A term like `x`, `2x` or `6x`, without a stray 1. */
function term(n) {
  return n === 1 ? "x" : `${fmt(n, 0)}x`;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A rectangle split into four regions, showing how two brackets multiply out",
    description:
      "The rectangle is as wide as the first bracket and as tall as the second, and it is split into " +
      "four regions by the x part of each side. The four regions are the four products, labelled in " +
      "the drawing. Two of them are the middle terms, and they collect into one term.",
    prompt: "Predict which two regions join together to make the middle term. Then move the sliders and check.",
    width: 560,
    height: 360,
  });

  const left = slider(el, { id: "left", label: "Constant in the first bracket", min: 1, max: 6, step: 1, value: 2, show: true });
  const right = slider(el, { id: "right", label: "Constant in the second bracket", min: 1, max: 6, step: 1, value: 3, show: true });

  function update() {
    const a = Number(left.value);
    const b = Number(right.value);
    const rightEdge = X0 + XPART + UNIT * a;
    const bottom = Y0 + XPART + UNIT * b;
    const midX = X0 + XPART;
    const midY = Y0 + XPART;

    let drawing = "";
    // The four regions, filled before the outlines so the shared edges stay sharp.
    drawing += rect({ x: X0, y: Y0, width: XPART, height: XPART, class: "fig-accent", opacity: 0.3 });
    drawing += rect({ x: midX, y: Y0, width: UNIT * a, height: XPART, class: "fig-good", opacity: 0.25 });
    drawing += rect({ x: X0, y: midY, width: XPART, height: UNIT * b, class: "fig-good", opacity: 0.25 });
    drawing += rect({ x: midX, y: midY, width: UNIT * a, height: UNIT * b, class: "fig-warn", opacity: 0.25 });
    // The outer boundary and the two internal divisions.
    drawing += line({ x1: X0, y1: Y0, x2: rightEdge, y2: Y0, class: "fig-ink", width: 1.6 });
    drawing += line({ x1: rightEdge, y1: Y0, x2: rightEdge, y2: bottom, class: "fig-ink", width: 1.6 });
    drawing += line({ x1: rightEdge, y1: bottom, x2: X0, y2: bottom, class: "fig-ink", width: 1.6 });
    drawing += line({ x1: X0, y1: bottom, x2: X0, y2: Y0, class: "fig-ink", width: 1.6 });
    drawing += line({ x1: midX, y1: Y0, x2: midX, y2: bottom, class: "fig-ink", width: 1.2 });
    drawing += line({ x1: X0, y1: midY, x2: rightEdge, y2: midY, class: "fig-ink", width: 1.2 });

    // The two side lengths, which are the two brackets.
    drawing += label({ x: (X0 + rightEdge) / 2, y: Y0 - 12, text: `x + ${fmt(a, 0)}`, size: SIZE.value, class: "text-ink" });
    drawing += label({ x: X0 - 10, y: (Y0 + bottom) / 2 + 6, text: `x + ${fmt(b, 0)}`, size: SIZE.value, class: "text-ink", anchor: "end" });

    // The four products.
    drawing += label({ x: X0 + XPART / 2, y: Y0 + XPART / 2 + 6, text: "x²", size: SIZE.value, class: "text-accent" });
    drawing += label({ x: midX + (UNIT * a) / 2, y: Y0 + XPART / 2 + 6, text: term(a), size: SIZE.value, class: "text-good" });
    drawing += label({ x: X0 + XPART / 2, y: midY + (UNIT * b) / 2 + 6, text: term(b), size: SIZE.value, class: "text-good" });
    drawing += label({ x: midX + (UNIT * a) / 2, y: midY + (UNIT * b) / 2 + 6, text: fmt(a * b, 0), size: SIZE.value, class: "text-warn" });

    svg.innerHTML = drawing;

    const sum = a + b;
    readout.textContent =
      `The rectangle is (x + ${fmt(a, 0)}) across and (x + ${fmt(b, 0)}) up. ` +
      `The four regions are x², ${term(a)}, ${term(b)} and ${fmt(a * b, 0)}. ` +
      `The two middle terms collect to ${fmt(sum, 0)}x, so the expansion is ` +
      `x² + ${fmt(sum, 0)}x + ${fmt(a * b, 0)}.`;
  }

  react([left, right], update);
}
