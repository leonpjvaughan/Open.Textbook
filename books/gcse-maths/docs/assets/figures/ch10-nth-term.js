// Guided investigation: how the rule for a linear sequence builds its terms.
//
// Guided, not a sandbox: the page asks the reader to predict a term before any
// slider moves, then to explain why changing the constant moves every term while
// the common difference sets the gaps. The figure plots the first six terms
// against their positions and joins them with a straight line, so a change to
// the rule is a visible change to the picture. Colours come from CSS classes, so
// the figure adapts to every bundle and both schemes.
export function mount(el) {
  const AXIS_X = 44;
  const LEFT = 62;
  const RIGHT = 516;
  const TOP = 24;
  const BASE = 208;
  const FIRST = 1;
  const LAST = 6;

  el.innerHTML = `
    <div style="max-width:580px">
      <svg viewBox="0 0 560 250" width="100%" role="img"
           aria-label="The first six terms of a linear sequence plotted against their positions and joined by a straight line"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Common difference
          <input class="difference" type="range" min="-2" max="5" step="1" value="4">
        </label>
        <label>Constant
          <input class="constant" type="range" min="-4" max="10" step="1" value="3">
        </label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const difference = el.querySelector(".difference");
  const constant = el.querySelector(".constant");
  const readout = el.querySelector(".readout");

  const format = (value) =>
    Number.isInteger(value) ? String(value) : String(Math.round(value * 100) / 100);

  const xFor = (position) =>
    LEFT + ((position - 0.5) / LAST) * (RIGHT - LEFT);

  function niceStep(span) {
    const target = span / 6;
    for (const step of [1, 2, 5, 10, 20, 50]) {
      if (step >= target) return step;
    }
    return 100;
  }

  function update() {
    const step = Number(difference.value);
    const constantTerm = Number(constant.value);

    const terms = [];
    for (let position = FIRST; position <= LAST; position += 1) {
      terms.push(step * position + constantTerm);
    }

    const low = Math.min(0, ...terms);
    const high = Math.max(0, ...terms);
    const span = high - low || 1;
    const gridStep = niceStep(span);
    const yFor = (value) => BASE - ((value - low) / span) * (BASE - TOP);

    let valueLines = "";
    for (
      let value = Math.ceil(low / gridStep) * gridStep;
      value <= high + 1e-9;
      value += gridStep
    ) {
      const y = yFor(value);
      const lineClass = value === 0 ? "fig-ink" : "fig-grid";
      const lineWidth = value === 0 ? 1.5 : 1;
      valueLines +=
        `<line x1="${AXIS_X}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" ` +
        `class="${lineClass}" stroke-width="${lineWidth}"></line>` +
        `<text x="${(AXIS_X - 8).toFixed(1)}" y="${(y + 4).toFixed(1)}" font-size="16" ` +
        `text-anchor="end" class="text-ink">${format(value)}</text>`;
    }

    const positionTicks = [];
    for (let position = FIRST; position <= LAST; position += 1) {
      const x = xFor(position);
      positionTicks.push(
        `<line x1="${x.toFixed(1)}" y1="${BASE}" x2="${x.toFixed(1)}" y2="${BASE + 5}" class="fig-ink"></line>` +
          `<text x="${x.toFixed(1)}" y="${BASE + 19}" font-size="16" text-anchor="middle" ` +
          `class="text-ink">${position}</text>`,
      );
    }

    const points = terms
      .map((term, index) => `${xFor(index + FIRST).toFixed(1)},${yFor(term).toFixed(1)}`)
      .join(" ");

    const dots = terms
      .map((term, index) => {
        const x = xFor(index + FIRST);
        const y = yFor(term);
        return (
          `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" class="fig-accent"></circle>` +
          `<text x="${x.toFixed(1)}" y="${(y - 11).toFixed(1)}" font-size="18" ` +
          `text-anchor="middle" class="text-accent">${format(term)}</text>`
        );
      })
      .join("");

    svg.innerHTML =
      valueLines +
      `<line x1="${AXIS_X}" y1="${TOP}" x2="${AXIS_X}" y2="${BASE}" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="${AXIS_X}" y1="${BASE}" x2="${RIGHT}" y2="${BASE}" class="fig-ink" stroke-width="2"></line>` +
      positionTicks.join("") +
      `<polyline points="${points}" class="fig-line"></polyline>` +
      dots +
      `<text x="${AXIS_X + 4}" y="${TOP - 10}" font-size="16" text-anchor="start" class="text-ink">term</text>` +
      `<text x="${RIGHT}" y="${BASE + 34}" font-size="16" text-anchor="end" class="text-ink">position</text>`;

    const rule =
      `term = ${format(step)} × position ` +
      (constantTerm < 0 ? `- ${Math.abs(constantTerm)}` : `+ ${constantTerm}`);

    let change = "";
    if (step > 0) {
      change = `Neighbouring terms go up by ${format(step)}, so the points lie on a straight line.`;
    } else if (step < 0) {
      change = `Neighbouring terms go down by ${Math.abs(step)}, so the points lie on a straight line.`;
    } else {
      change = "Every term is the same, so the points lie on a flat line.";
    }

    const lastTerm = terms[terms.length - 1];
    readout.innerHTML =
      `The rule is <strong>${rule}</strong>. ` +
      `Position ${LAST} has <strong>${format(step)} × ${LAST} ` +
      `${constantTerm < 0 ? "−" : "+"} ${Math.abs(constantTerm)} = ${format(lastTerm)}</strong>. ` +
      change;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
