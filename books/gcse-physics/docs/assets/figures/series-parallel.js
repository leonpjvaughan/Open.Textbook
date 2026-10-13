// Tier-1 guided investigation: series and parallel circuits.
//
// Guided, not a sandbox: the page asks the reader to predict what happens to the
// other lamp when one lamp is removed, in each arrangement, before the controls
// are used. The figure draws two lamps with a 6.0 V battery, either in series or
// in parallel, and can remove the right-hand lamp.
//
// Colours come from CSS classes, so the figure adapts to every bundle and both
// schemes. Lit and unlit are shown by a word and by rays, not by colour alone.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-series-parallel" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 560 220" width="100%" role="img"
           aria-label="Two lamps connected to a battery, either in series or in parallel, with the right-hand lamp able to be removed."></svg>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.5rem 0">
        <button type="button" class="mode-series" aria-pressed="true">Series</button>
        <button type="button" class="mode-parallel" aria-pressed="false">Parallel</button>
        <label style="display:flex;align-items:center;gap:.3rem">
          <input class="remove-right" type="checkbox"> Remove the right-hand lamp
        </label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const seriesButton = el.querySelector(".mode-series");
  const parallelButton = el.querySelector(".mode-parallel");
  const removeBox = el.querySelector(".remove-right");

  let mode = "series";

  function wires(paths) {
    return paths
      .map((d) => `<path d="${d}" class="fig-grid" stroke-width="2"></path>`)
      .join("");
  }

  function lamp(cx, cy, lit) {
    const cls = lit ? "fig-accent" : "fig-grid";
    const rays = lit
      ? `<line x1="${cx - 28}" y1="${cy}" x2="${cx - 20}" y2="${cy}" class="fig-accent" stroke-width="2"></line>` +
        `<line x1="${cx + 20}" y1="${cy}" x2="${cx + 28}" y2="${cy}" class="fig-accent" stroke-width="2"></line>` +
        `<line x1="${cx}" y1="${cy - 28}" x2="${cx}" y2="${cy - 20}" class="fig-accent" stroke-width="2"></line>` +
        `<line x1="${cx}" y1="${cy + 20}" x2="${cx}" y2="${cy + 28}" class="fig-accent" stroke-width="2"></line>`
      : "";
    const cross =
      `<line x1="${cx - 11}" y1="${cy - 11}" x2="${cx + 11}" y2="${cy + 11}" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="${cx - 11}" y1="${cy + 11}" x2="${cx + 11}" y2="${cy - 11}" class="fig-ink" stroke-width="2"></line>`;
    const circle =
      `<circle cx="${cx}" cy="${cy}" r="16" class="${cls}" style="fill:none" stroke-width="3"></circle>`;
    return `<g>${rays}${circle}${cross}</g>`;
  }

  function battery(cx, cy) {
    return (
      `<line x1="${cx}" y1="${cy - 12}" x2="${cx}" y2="${cy + 12}" class="fig-ink" stroke-width="6"></line>` +
      `<line x1="${cx - 10}" y1="${cy - 20}" x2="${cx - 10}" y2="${cy + 20}" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="${cx + 10}" y1="${cy - 14}" x2="${cx + 10}" y2="${cy + 14}" class="fig-ink" stroke-width="2"></line>`
    );
  }

  function drawSeries(removed) {
    const paths = [
      "M 90 60 L 180 60",
      "M 220 60 L 300 60",
      "M 340 60 L 470 60",
      "M 470 60 L 470 170 L 90 170 L 90 130",
      "M 90 100 L 90 60",
    ];
    let figure = wires(paths);
    figure += `<text x="80" y="115" font-size="16" text-anchor="end" class="fig-ink">6.0 V</text>`;
    figure += battery(90, 115);
    figure += lamp(200, 60, !removed);
    if (removed) {
      figure +=
        `<text x="320" y="72" font-size="16" text-anchor="middle" class="fig-warn">removed</text>` +
        `<line x1="300" y1="60" x2="340" y2="60" class="fig-warn" stroke-width="2" stroke-dasharray="4 4"></line>`;
    } else {
      figure += lamp(320, 60, true);
    }
    return figure;
  }

  function drawParallel(removed) {
    const leftLit = true;
    const rightLit = !removed;
    const paths = [
      "M 90 60 L 470 60",
      "M 90 170 L 470 170",
      "M 230 60 L 230 84",
      "M 230 116 L 230 170",
      "M 390 60 L 390 84",
      "M 390 116 L 390 170",
      "M 90 100 L 90 60",
    ];
    let figure = wires(paths);
    figure += `<text x="80" y="115" font-size="16" text-anchor="end" class="fig-ink">6.0 V</text>`;
    figure += battery(90, 115);
    figure += lamp(230, 100, leftLit);
    figure += lamp(390, 100, rightLit);
    // Junction dots where the branches meet the rails.
    figure +=
      `<circle cx="230" cy="60" r="3" class="fig-ink"></circle>` +
      `<circle cx="390" cy="60" r="3" class="fig-ink"></circle>` +
      `<circle cx="230" cy="170" r="3" class="fig-ink"></circle>` +
      `<circle cx="390" cy="170" r="3" class="fig-ink"></circle>`;
    if (removed) {
      figure +=
        `<text x="390" y="54" font-size="16" text-anchor="middle" class="fig-warn">removed</text>`;
    }
    return figure;
  }

  function update() {
    const removed = removeBox.checked;
    svg.innerHTML = mode === "series" ? drawSeries(removed) : drawParallel(removed);

    seriesButton.setAttribute("aria-pressed", String(mode === "series"));
    parallelButton.setAttribute("aria-pressed", String(mode === "parallel"));

    if (mode === "series") {
      readout.innerHTML = removed
        ? `The gap breaks the single loop, so <strong>no current flows</strong> and ` +
          `<strong>both lamps are off</strong>. ` +
          `<em>In a series circuit, removing one lamp switches off every lamp in the loop.</em>`
        : `Each lamp has <strong>0.25 A</strong> through it and <strong>3.0 V</strong> across it. ` +
          `The 6.0 V of the battery is shared between the two lamps. ` +
          `<em>What happens to the other lamp when this one is removed?</em>`;
    } else {
      readout.innerHTML = removed
        ? `The remaining lamp still has the full <strong>6.0 V</strong> across it, so ` +
          `<strong>it stays lit</strong>, with <strong>0.50 A</strong> through it. ` +
          `<em>The branches are independent, so one lamp does not affect the other.</em>`
        : `Each lamp has the full <strong>6.0 V</strong> across it and ` +
          `<strong>0.50 A</strong> through it. The total current from the battery is ` +
          `<strong>1.0 A</strong>. <em>Which arrangement makes the lamps brighter, and why?</em>`;
    }
  }

  seriesButton.addEventListener("click", () => {
    mode = "series";
    update();
  });
  parallelButton.addEventListener("click", () => {
    mode = "parallel";
    update();
  });
  removeBox.addEventListener("change", update);
  update();
}
