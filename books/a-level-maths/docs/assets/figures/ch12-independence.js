// Guided investigation for 12.1: when two events are independent.
// A two-way table with fixed row and column totals. The reader moves the number
// in the overlap cell and watches P(A given B) move away from P(A).
// Pure HTML and SVG, no framework and no colour of its own: the fig-* classes
// carry the theme. Runtime text is plain text, never TeX.

const N = 200;
const HALF = 100;
const BAR_W = 320;
const BAR_H = 26;
const LEFT = 120;

function bar(y, value, className) {
  const width = Math.max(0, Math.round(value * BAR_W));
  return (
    `<rect x="${LEFT}" y="${y}" width="${width}" height="${BAR_H}" ` +
    `class="${className}" rx="3"></rect>` +
    `<text x="${LEFT + BAR_W + 8}" y="${y + BAR_H - 8}" class="fig-ink" ` +
    `font-size="15">${Math.round(value * 100)}%</text>`
  );
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:640px">
      <p>
        <label>Number in both A and B
          <input class="overlap" type="range" min="0" max="100" step="1" value="50">
          <output class="overlap-out">50</output>
        </label>
      </p>
      <table class="two-way">
        <tr>
          <th></th><th>B</th><th>not B</th><th>Total</th>
        </tr>
        <tr><th>A</th><td class="ab"></td><td class="anb"></td><td>100</td></tr>
        <tr><th>not A</th><td class="nab"></td><td class="nanb"></td><td>100</td></tr>
        <tr><th>Total</th><td>100</td><td>100</td><td>200</td></tr>
      </table>
      <svg viewBox="0 0 ${LEFT + BAR_W + 60} 80" width="100%" role="img"
           aria-label="A bar chart comparing the conditional probability of A given B with the unconditional probability of A"></svg>
      <p class="readout" aria-live="polite"></p>
      <p class="verdict" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const overlap = el.querySelector(".overlap");
  const overlapOut = el.querySelector(".overlap-out");
  const readout = el.querySelector(".readout");
  const verdict = el.querySelector(".verdict");

  function render() {
    const x = Number(overlap.value);
    overlapOut.value = x;
    overlapOut.textContent = x;

    const ab = x;
    const anb = HALF - x;
    const nab = HALF - x;
    const nanb = x;

    el.querySelector(".ab").textContent = ab;
    el.querySelector(".anb").textContent = anb;
    el.querySelector(".nab").textContent = nab;
    el.querySelector(".nanb").textContent = nanb;

    const pA = HALF / N;
    const pB = HALF / N;
    const pAB = ab / N;
    const pAGivenB = ab / HALF;
    const product = pA * pB;

    svg.innerHTML =
      `<text x="0" y="17" class="fig-ink" font-size="15">P(A given B)</text>` +
      bar(4, pAGivenB, "fig-accent") +
      `<text x="0" y="57" class="fig-ink" font-size="15">P(A)</text>` +
      bar(44, pA, "fig-good");

    readout.textContent =
      `P(A and B) is ${pAB.toFixed(3)}. ` +
      `P(A) times P(B) is ${product.toFixed(3)}. ` +
      `P(A given B) is ${pAGivenB.toFixed(2)}.`;

    const equal = Math.abs(pAB - product) < 1e-9;
    verdict.textContent = equal
      ? "The two values are equal, so A and B are independent at this setting."
      : "The two values differ, so A and B are not independent at this setting.";

    svg.setAttribute(
      "aria-label",
      `A bar chart. P(A given B) is ${(pAGivenB * 100).toFixed(0)} percent ` +
        `and P(A) is ${(pA * 100).toFixed(0)} percent. ` +
        `P(A and B) is ${pAB.toFixed(3)} and P(A) times P(B) is ${product.toFixed(3)}.`
    );
  }

  overlap.addEventListener("input", render);
  render();
}
