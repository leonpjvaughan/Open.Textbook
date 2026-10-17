// Tier-1 guided investigation: a tree diagram for two draws, with and without
// replacement.
//
// Section 21.6 says two events are independent only when the first does not change
// the second, and the trap it names is drawing two counters *without* replacement as
// though they were independent. The tree is where that is visible: put the counter
// back and the second set of branches carries the same fractions as the first; keep
// it out and both the numerator and the denominator of the second branch change. The
// figure switches between the two so the reader sees which fractions move.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { circle, label, line, panel, react, slider, toggle } from "./kit.js";

const gcd = (a, b) => {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x || 1;
};

/** A fraction written the way a reader writes it, in its simplest form. */
function fraction(top, bottom) {
  const divisor = gcd(top, bottom);
  const t = top / divisor;
  const b = bottom / divisor;
  return b === 1 ? String(t) : `${t}/${b}`;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A tree diagram for two draws from a bag, with the probability written on each branch",
    description:
      "The first set of branches gives the chance of red and of blue on the first draw. Each of those " +
      "splits again for the second draw. Putting the counter back keeps the second fractions the same as " +
      "the first; keeping it out changes them.",
    prompt: "Predict whether the second branch will change when the counter is not put back, then check.",
    width: 560,
    height: 340,
  });

  const red = slider(el, { id: "red", label: "Red counters", min: 1, max: 6, step: 1, value: 2, show: true });
  const blue = slider(el, { id: "blue", label: "Blue counters", min: 1, max: 6, step: 1, value: 3, show: true });
  const replace = toggle(el, { id: "replace", label: "Put the counter back", checked: true });

  function update() {
    const r = Number(red.value);
    const b = Number(blue.value);
    const total = r + b;
    const putBack = replace.checked;

    // The second draw sees the whole bag again, or the bag with one counter missing.
    const denom = putBack ? total : total - 1;
    const after = putBack
      ? { red: { red: r, blue: b }, blue: { red: r, blue: b } }
      : { red: { red: r - 1, blue: b }, blue: { red: r, blue: b - 1 } };

    const root = { x: 56, y: 170 };
    const midY = { red: 92, blue: 248 };
    const endY = { red: { red: 56, blue: 128 }, blue: { red: 212, blue: 284 } };
    const midX = 250;
    const endX = 440;

    let drawing = "";
    const drawBranch = (from, to, text, cls) => {
      drawing += line({ x1: from.x, y1: from.y, x2: to.x, y2: to.y, class: "fig-grid", width: 1.6 });
      drawing += label({ x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 - 8, text, size: 17, class: cls });
    };
    const node = (point) => circle({ cx: point.x, cy: point.y, r: 4, class: "fig-ink" });

    drawing += node(root);
    drawBranch(root, { x: midX, y: midY.red }, fraction(r, total), "text-accent");
    drawBranch(root, { x: midX, y: midY.blue }, fraction(b, total), "text-good");

    for (const pick of ["red", "blue"]) {
      const from = { x: midX, y: midY[pick] };
      drawing += node(from);
      for (const second of ["red", "blue"]) {
        const to = { x: endX, y: endY[pick][second] };
        drawBranch(from, to, fraction(after[pick][second], denom), second === "red" ? "text-accent" : "text-good");
        drawing += node(to);
        drawing += label({
          x: to.x + 12,
          y: to.y + 5,
          text: `${pick === "red" ? "R" : "B"} then ${second === "red" ? "R" : "B"}`,
          size: 16,
          class: "text-ink",
          anchor: "start",
        });
      }
    }
    svg.innerHTML = drawing;

    const secondRed = fraction(putBack ? r : r - 1, denom);
    const bothRed = putBack
      ? fraction(r * r, total * total)
      : fraction(r * (r - 1), total * (total - 1));

    readout.textContent =
      `The bag holds ${r} red and ${b} blue, so the first red has probability ${fraction(r, total)}. ` +
      (putBack
        ? `The counter goes back, so the bag is exactly as it was and the second red is also ${fraction(r, total)}. The two draws are independent.`
        : `The counter stays out, so the second red is ${secondRed}, not ${fraction(r, total)}. The first draw changed the bag, so the two draws are not independent.`) +
      ` P(red then red) = ${fraction(r, total)} \u00d7 ${secondRed} = ${bothRed}.`;
  }

  react([red, blue, replace], update);
}
