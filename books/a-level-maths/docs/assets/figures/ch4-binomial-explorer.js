// Guided investigation for the binomial coefficients in a row of Pascal's
// triangle, and the term each one produces in (1 + x)^n.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.

function pascalRow(n) {
  const row = [1];
  for (let i = 1; i <= n; i += 1) {
    row.push((row[i - 1] * (n - i + 1)) / i);
  }
  return row;
}

function plainPower(x, power) {
  if (power === 0) return "";
  if (power === 1) return x;
  return `${x}^${power}`;
}

function termText(coefficient, power) {
  const powerText = plainPower("x", power);
  return coefficient === 1 && powerText ? powerText : coefficient + powerText;
}

function expansionText(n) {
  const row = pascalRow(n);
  return row.map((coefficient, power) => termText(coefficient, power)).join(" + ");
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:560px">
      <label>Power n
        <input class="n" type="range" min="1" max="6" step="1" value="4">
      </label>
      <label>Term number r
        <input class="r" type="range" min="0" max="4" step="1" value="2">
      </label>
      <svg viewBox="0 0 420 150" width="100%" role="img"
           aria-label="A row of Pascal's triangle with one entry highlighted"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const nInput = el.querySelector(".n");
  const rInput = el.querySelector(".r");

  function update() {
    const n = Number(nInput.value);
    rInput.max = String(n);
    if (Number(rInput.value) > n) {
      rInput.value = String(n);
    }
    const r = Number(rInput.value);
    const row = pascalRow(n);

    const boxWidth = 52;
    const gap = 6;
    const total = row.length * boxWidth + (row.length - 1) * gap;
    const left = (420 - total) / 2;
    const top = 34;
    const height = 48;

    let cells = "";
    row.forEach((value, index) => {
      const x = left + index * (boxWidth + gap);
      const chosen = index === r;
      cells +=
        `<rect x="${x.toFixed(1)}" y="${top}" width="${boxWidth}" height="${height}" rx="6" ` +
        `class="${chosen ? "fig-accent" : "fig-grid"}"></rect>` +
        `<text x="${(x + boxWidth / 2).toFixed(1)}" y="${top + height / 2 + 6}" ` +
        `text-anchor="middle" class="fig-ink">${value}</text>`;
    });

    const heading =
      `<text x="210" y="22" text-anchor="middle" class="fig-ink">` +
      `Row ${n} of Pascal's triangle</text>`;

    svg.innerHTML = heading + cells;

    const term = termText(row[r], r);
    readout.textContent =
      `The coefficient at r = ${r} is ${row[r]}, so that term of (1 + x)^${n} is ${term}. ` +
      `The mirror coefficient at r = ${n - r} is also ${row[n - r]}. ` +
      `The whole expansion is ${expansionText(n)}.`;

    svg.setAttribute(
      "aria-label",
      `Row ${n} of Pascal's triangle, with the entry at term number ${r} ` +
        `highlighted. That entry is ${row[r]}, and it produces the term ${term} ` +
        `in the expansion of (1 + x) to the power ${n}.`
    );
  }

  nInput.addEventListener("input", update);
  rInput.addEventListener("input", update);
  update();
}
