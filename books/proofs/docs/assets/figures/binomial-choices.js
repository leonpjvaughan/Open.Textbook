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
export function mount(el) {
  el.innerHTML = `
    <div class="fig-binomial-choices" style="max-width:560px">
      <svg viewBox="0 0 560 220" width="100%" height="220" role="img"
           aria-label="Every way to choose a or b from the brackets, grouped by how many b choices each pattern makes"></svg>
      <label style="display:block;margin:.5rem 0 .2rem">
        Number of brackets:
        <input class="brackets" type="range" min="2" max="4" step="1" value="3"
               aria-label="Number of brackets">
        <output class="brackets-value">3</output>
      </label>
      <label style="display:block;margin:.2rem 0 .3rem">
        Number of b choices in the term:
        <input class="term" type="range" min="0" max="3" step="1" value="2"
               aria-label="Number of b choices in the term">
        <output class="term-value">2</output>
      </label>
      <p class="readout" aria-live="polite" style="margin:.4rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const brackets = el.querySelector(".brackets");
  const bracketsValue = el.querySelector(".brackets-value");
  const term = el.querySelector(".term");
  const termValue = el.querySelector(".term-value");
  const readout = el.querySelector(".readout");

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

    bracketsValue.textContent = String(n);
    termValue.textContent = String(k);

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
        shapes +=
          `<text x="${x + CELL / 2}" y="${y0 + CELL / 2 + 5}" text-anchor="middle" ` +
          `font-size="15" class="${bits[j] ? "text-warn" : "text-accent"}">` +
          `${bits[j] ? "b" : "a"}</text>`;
      }
    }

    const heading =
      `<text x="${LEFT}" y="22" font-size="13" class="text-ink">` +
      `Each row is one way to fill the ${n} brackets</text>`;

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

  brackets.addEventListener("input", draw);
  term.addEventListener("input", draw);
  draw();
}
