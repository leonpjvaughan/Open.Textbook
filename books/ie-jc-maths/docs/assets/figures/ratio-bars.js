// A bar model for ratio notation: two bars of unit parts, regrouped by a common
// factor so the ratio can be simplified.
//
// Section 6.1 teaches that simplifying a ratio means dividing every part by the
// same number, and that dividing one part alone changes the comparison. A bar
// model makes both visible: the reader sets two amounts, chooses a group size, and
// watches the bars break into equal groups. When the group size divides both
// amounts, the number of groups is the simplified ratio; when it does not, the
// leftover part is marked so the reader can see why.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { fmt, label, line, panel, react, rect, slider } from "./kit.js";

// One unit part is `CELL` units wide, so a bar of 20 parts still fits the panel.
const X0 = 80;
const CELL = 21;
const BAR = 34;
const MAX = 20;

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x || 1;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Two bars of unit parts, each grouped into equal blocks so a ratio can be simplified",
    description:
      "The first amount is drawn as a bar of unit parts and the second as another bar below it. A " +
      "group size is chosen with the controls, and each bar is broken into blocks of that size. When " +
      "the group size divides both amounts, the number of blocks is the simplified ratio.",
    prompt: "Predict whether the comparison changes when you group the bars. Then set the group size and check.",
    width: 560,
    height: 220,
  });

  const first = slider(el, { id: "first", label: "First amount", min: 1, max: MAX, step: 1, value: 8, show: true });
  const second = slider(el, { id: "second", label: "Second amount", min: 1, max: MAX, step: 1, value: 12, show: true });
  const group = slider(el, { id: "group", label: "Group size", min: 1, max: 12, step: 1, value: 4, show: true });

  /** One bar of `n` unit parts, blocked into groups of `g`. */
  function bar(y, n, g, cls) {
    let drawing = "";
    for (let start = 0; start < n; start += g) {
      const end = Math.min(start + g, n);
      const partial = end - start < g;
      const block = Math.floor(start / g);
      drawing += rect({
        x: X0 + start * CELL,
        y,
        width: (end - start) * CELL,
        height: BAR,
        class: partial ? "fig-warn" : cls,
        // Alternating shades separate neighbouring blocks without a second colour,
        // and a partial block is called out so a factor that does not fit is seen.
        opacity: partial ? 0.35 : block % 2 === 0 ? 0.35 : 0.12,
      });
    }
    for (let i = 0; i < n; i += 1) {
      drawing += rect({ x: X0 + i * CELL, y, width: CELL, height: BAR, class: "fig-grid" });
    }
    for (let start = g; start < n; start += g) {
      drawing += line({ x1: X0 + start * CELL, y1: y, x2: X0 + start * CELL, y2: y + BAR, class: "fig-ink", width: 1.6 });
    }
    return drawing;
  }

  function update() {
    const a = Number(first.value);
    const b = Number(second.value);
    const g = Number(group.value);
    const hcf = gcd(a, b);

    let drawing = "";
    drawing += label({ x: X0 - 10, y: 40 + BAR / 2 + 5, text: `${fmt(a, 0)}`, anchor: "end", class: "text-accent" });
    drawing += bar(40, a, g, "fig-accent");
    drawing += label({ x: X0 - 10, y: 100 + BAR / 2 + 5, text: `${fmt(b, 0)}`, anchor: "end", class: "text-good" });
    drawing += bar(100, b, g, "fig-good");
    svg.innerHTML = drawing;

    if (g === 1) {
      readout.textContent =
        `The ratio is ${fmt(a, 0)}:${fmt(b, 0)}, which reads "${fmt(a, 0)} to ${fmt(b, 0)}". ` +
        `The bars are shown one part at a time, so no grouping has happened yet.`;
    } else if (a % g === 0 && b % g === 0) {
      readout.textContent =
        `Each group holds ${fmt(g, 0)} parts. The first bar makes ${fmt(a / g, 0)} groups and the ` +
        `second makes ${fmt(b / g, 0)}, so ${fmt(a, 0)}:${fmt(b, 0)} simplifies to ${fmt(a / g, 0)}:${fmt(b / g, 0)}.`;
      if (g === hcf) {
        readout.textContent += ` ${fmt(g, 0)} is the highest common factor, so this is the simplest form.`;
      } else if (g < hcf) {
        readout.textContent += ` Both parts still divide by ${fmt(hcf, 0)}, so you can simplify further.`;
      }
    } else {
      readout.textContent =
        `${fmt(g, 0)} does not divide both ${fmt(a, 0)} and ${fmt(b, 0)}, so the bars cannot be ` +
        `grouped in ${fmt(g, 0)}s. The comparison stays ${fmt(a, 0)}:${fmt(b, 0)}.`;
    }
  }

  react([first, second, group], update);
}
