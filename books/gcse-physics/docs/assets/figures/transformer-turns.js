// Tier-1 guided investigation: how the turns of a transformer set the output.
//
// The page asks the reader to predict whether more secondary turns raise or
// lower the output, then to test, then to explain why the potential difference
// per turn is the same in both coils. The figure assumes a 100% efficient
// transformer, which the page states. Colours come from CSS classes.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-transformer-turns" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 260" width="100%" role="img"
           aria-label="A transformer with a primary coil and a secondary coil on a closed iron core. The turns and the primary potential difference can be changed, and the secondary potential difference is shown"></svg>
      <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.4rem .8rem">
        <label>Primary turns <input class="np" type="range" min="100" max="1000" step="100" value="400"></label>
        <label>Secondary turns <input class="ns" type="range" min="100" max="1000" step="100" value="100"></label>
        <label>Primary p.d. (V) <input class="vp" type="range" min="12" max="240" step="12" value="240"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");

  function formatVolts(value) {
    const rounded = Math.round(value * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  }

  function update() {
    const np = Number(el.querySelector(".np").value);
    const ns = Number(el.querySelector(".ns").value);
    const vp = Number(el.querySelector(".vp").value);
    const vs = (vp * ns) / np;

    const core = `
      <rect x="180" y="50" width="200" height="14" class="fig-ink" opacity="0.2"></rect>
      <rect x="180" y="196" width="200" height="14" class="fig-ink" opacity="0.2"></rect>
      <rect x="180" y="50" width="14" height="160" class="fig-ink" opacity="0.2"></rect>
      <rect x="366" y="50" width="14" height="160" class="fig-ink" opacity="0.2"></rect>
      <text x="280" y="38" font-size="16" text-anchor="middle" class="fig-ink">iron core</text>`;

    function coil(x, turns, cls) {
      const loops = Math.max(1, Math.round(turns / 100));
      const gap = 110 / loops;
      let out = "";
      for (let i = 0; i < loops; i += 1) {
        const y = 80 + i * gap;
        out += `<rect x="${x}" y="${y.toFixed(1)}" width="58" height="9" rx="4" ` +
          `class="${cls}" fill="none" stroke-width="3"></rect>`;
      }
      return out;
    }

    const primary = coil(158, np, "fig-accent");
    const secondary = coil(344, ns, "fig-warn");

    const labels = `
      <text x="150" y="222" font-size="18" text-anchor="middle" class="fig-accent">primary ${np} turns</text>
      <text x="410" y="222" font-size="18" text-anchor="middle" class="fig-warn">secondary ${ns} turns</text>
      <text x="150" y="240" font-size="18" text-anchor="middle" class="fig-ink">${vp} V</text>
      <text x="410" y="240" font-size="18" text-anchor="middle" class="fig-ink">${formatVolts(vs)} V</text>`;

    svg.innerHTML = core + primary + secondary + labels;

    let kind = "step-down";
    if (ns > np) kind = "step-up";
    if (ns === np) kind = "same";
    readout.innerHTML =
      `Primary <strong>${vp} V</strong> with <strong>${np}</strong> turns; ` +
      `secondary <strong>${ns}</strong> turns. ` +
      `So the secondary p.d. is <strong>${formatVolts(vs)} V</strong>, and this is a ` +
      `<strong>${kind}</strong> transformer. ` +
      `<em>Now make the secondary turns larger than the primary turns.</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
