// Tier-1 guided investigation: work done by a force.
//
// Guided, not a sandbox: the page asks the reader to predict what happens to the
// work done when the force doubles and again when the distance doubles, then to
// explain why. The rectangle on the force-distance graph is the product F s, so
// its area is the work done. Colours come from CSS classes, so the figure adapts
// to every bundle and both schemes.
export function mount(el) {
  const LEFT = 64;
  const RIGHT = 520;
  const BASE = 220;
  const TOP = 30;
  const MAX_FORCE = 200;
  const MAX_DISTANCE = 10;

  el.innerHTML = `
    <div class="fig-work-done" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 560 260" width="100%" height="260" role="img"
           aria-label="A rectangle on a force-distance graph. Its width is the distance and its height is the force, so its area is the work done"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Force (N) <input class="force" type="range" min="0" max="200" step="10" value="60"></label>
        <label>Distance (m) <input class="distance" type="range" min="0" max="10" step="0.5" value="4"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const forceSlider = el.querySelector(".force");
  const distanceSlider = el.querySelector(".distance");
  const readout = el.querySelector(".readout");

  const xFor = (metres) => LEFT + (metres / MAX_DISTANCE) * (RIGHT - LEFT);
  const yFor = (newtons) => BASE - (newtons / MAX_FORCE) * (BASE - TOP);

  function update() {
    const force = Number(forceSlider.value);
    const distance = Number(distanceSlider.value);
    const work = force * distance;

    const rectY = yFor(force);
    const rectW = Math.max(0, xFor(distance) - LEFT);
    const rectH = Math.max(0, BASE - rectY);

    const forceTicks = [0, 50, 100, 150, 200]
      .map((value) => {
        const y = yFor(value);
        return (
          `<line x1="${LEFT - 5}" y1="${y.toFixed(1)}" x2="${LEFT}" y2="${y.toFixed(1)}" class="fig-ink"></line>` +
          `<text x="${LEFT - 9}" y="${(y + 4).toFixed(1)}" font-size="11" text-anchor="end" class="fig-ink">${value}</text>`
        );
      })
      .join("");

    const distanceTicks = [0, 2, 4, 6, 8, 10]
      .map((value) => {
        const x = xFor(value);
        return (
          `<line x1="${x.toFixed(1)}" y1="${BASE}" x2="${x.toFixed(1)}" y2="${BASE + 5}" class="fig-ink"></line>` +
          `<text x="${x.toFixed(1)}" y="${BASE + 18}" font-size="11" text-anchor="middle" class="fig-ink">${value}</text>`
        );
      })
      .join("");

    const areaLabel =
      rectW > 60 && rectH > 24
        ? `<text x="${(LEFT + rectW / 2).toFixed(1)}" y="${(rectY + rectH / 2 + 4).toFixed(1)}" ` +
          `font-size="13" text-anchor="middle" class="text-ink">${work} J</text>`
        : "";

    svg.innerHTML =
      `<line x1="${LEFT}" y1="${BASE}" x2="${RIGHT}" y2="${BASE}" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="${LEFT}" y1="${BASE}" x2="${LEFT}" y2="${TOP}" class="fig-ink" stroke-width="2"></line>` +
      forceTicks +
      distanceTicks +
      `<text x="${(LEFT + RIGHT) / 2}" y="${BASE + 36}" font-size="11" text-anchor="middle" class="fig-ink">distance (m)</text>` +
      `<text x="16" y="${(TOP + BASE) / 2}" font-size="11" text-anchor="middle" class="fig-ink" transform="rotate(-90 16 ${(TOP + BASE) / 2})">force (N)</text>` +
      `<rect x="${LEFT}" y="${rectY.toFixed(1)}" width="${rectW.toFixed(1)}" height="${rectH.toFixed(1)}" ` +
      `class="fig-accent" fill-opacity="0.18" stroke-width="2"></rect>` +
      areaLabel;

    readout.innerHTML =
      `Force <strong>${force} N</strong> and distance <strong>${distance} m</strong>. ` +
      `Work done <strong>= ${force} × ${distance} = ${work} J</strong>. ` +
      `The force transfers <strong>${work} J</strong> of energy to the box. ` +
      `<em>Before you move a slider, predict what happens to the work done if you ` +
      `double the force. Then predict what happens if you double the distance.</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
