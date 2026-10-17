// Guided investigation for the counting proof of the binomial theorem.
//
// Expanding (a + b)^n means choosing a or b from each of the n brackets. The term
// a^(n-k) b^k appears once for every way of choosing the k brackets that give b,
// so its coefficient is the binomial coefficient. The figure shows every choice
// for a small number of brackets, marks the choices that take b from exactly k
// brackets, and reports the count, so the reader can check the coefficient rather
// than take it on trust.
//
// Colours come from CSS classes so the figure adapts to every bundle and both
// schemes. The readout is `aria-live`, and every control is a native input.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Every way to choose a or b from the brackets, grouped by how many b choices each pattern makes",
    width: 560,
    height: 220,
    max: 560,
  });

  const brackets = slider(el, { show: true,
    id: "brackets",
    label: "Number of brackets:",
    name: "Number of brackets",
    min: 2,
    max: 4,
    step: 1,
    value: 3,
  });
  const term = slider(el, { show: true,
    id: "term",
    label: "Number of b choices in the term:",
    name: "Number of b choices in the term",
    min: 0,
    max: 3,
    step: 1,
    value: 2,
  });

  // A smaller number of brackets can clamp the term, and a programmatic change
  // does not fire `input`, so the term's readout is refreshed in `draw`.
  const termOut = term.parentElement.querySelector("output");

  const CELL = 24;
  const GAP = 4;
  const COL_GAP = 22;
  const ROW_GAP = 16;
  const TOP = 46;
  const LEFT = 20;

  function draw() {
    const n = Number(brackets.value);
    term.max = String(n);
    const k = Math.min(Number(term.value), n);
    term.value = String(k);

    termOut.textContent = String(k);

    const total = 2 ** n;
    const cols = Math.min(4, total);
    const patternWidth = n * (CELL + GAP);

    let shapes = "";
    let count = 0;

    for (let i = 0; i < total; i += 1) {
      // Bit j says whether bracket j gave b.
      const bits = Array.from({ length: n }, (_, j) => ((i >> j) & 1) === 1);
      const bCount = bits.filter(Boolean).length;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x0 = LEFT + col * (patternWidth + COL_GAP);
      const y0 = TOP + row * (CELL + ROW_GAP);

      if (bCount === k) {
        count += 1;
        shapes +=
          `<rect x="${x0 - 4}" y="${y0 - 4}" width="${patternWidth + 4}" ` +
          `height="${CELL + 8}" rx="5" class="fig-good" style="fill:none" ` +
          `stroke-width="2.5"></rect>`;
      }

      for (let j = 0; j < n; j += 1) {
        const x = x0 + j * (CELL + GAP);
        shapes +=
          `<rect x="${x}" y="${y0}" width="${CELL}" height="${CELL}" rx="4" ` +
          `class="fig-ink" style="fill:none" stroke-width="1.5"></rect>`;
        shapes += label({
          x: x + CELL / 2,
          y: y0 + CELL / 2 + 5,
          text: bits[j] ? "b" : "a",
          size: SIZE.value,
          class: bits[j] ? "text-warn" : "text-accent",
        });
      }
    }

    const heading = label({
      x: LEFT,
      y: 22,
      text: `Each row is one way to fill the ${n} brackets`,
      anchor: "start",
      size: SIZE.label,
    });

    svg.innerHTML = heading + shapes;

    const termText =
      k === 0
        ? "a to the power n"
        : k === n
          ? "b to the power n"
          : `a to the power ${n - k}, times b to the power ${k}`;
    readout.textContent =
      `With ${n} brackets there are ${total} ways to choose a letter from each ` +
      `bracket. Exactly ${count} of those ways take b from ${k} ` +
      `bracket${k === 1 ? "" : "s"}, and every one of them makes the same term, ` +
      `${termText}. So the coefficient of that term is ${count}.`;
  }

  react([brackets, term], draw);
}
