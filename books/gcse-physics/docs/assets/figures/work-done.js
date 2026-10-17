// Tier-1 guided investigation: work done by a force.
//
// Guided, not a sandbox: the page asks the reader to predict what happens to the
// work done when the force doubles and again when the distance doubles, then to
// explain why. The rectangle on the force-distance graph is the product F s, so
// its area is the work done. Colours come from CSS classes, so the figure adapts
// to every bundle and both schemes.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const LEFT = 64;
  const RIGHT = 520;
  const BASE = 220;
  const TOP = 30;
  const MAX_FORCE = 200;
  const MAX_DISTANCE = 10;

  const { svg, readout } = panel(el, {
    label:
      "A rectangle on a force-distance graph. Its width is the distance and its height is the force, so its area is the work done",
    width: 560,
    height: 260,
    max: 600,
  });

  const forceInput = slider(el, { show: false,
    id: "force",
    label: "Force (N)",
    min: 0,
    max: 200,
    step: 10,
    value: 60,
  });
  const distanceInput = slider(el, { show: false,
    id: "distance",
    label: "Distance (m)",
    min: 0,
    max: 10,
    step: 0.5,
    value: 4,
  });

  const xFor = (metres) => LEFT + (metres / MAX_DISTANCE) * (RIGHT - LEFT);
  const yFor = (newtons) => BASE - (newtons / MAX_FORCE) * (BASE - TOP);

  function update() {
    const force = Number(forceInput.value);
    const distance = Number(distanceInput.value);
    const work = force * distance;

    const rectY = yFor(force);
    const rectW = Math.max(0, xFor(distance) - LEFT);
    const rectH = Math.max(0, BASE - rectY);

    const forceTicks = [0, 50, 100, 150, 200]
      .map((value) => {
        const y = yFor(value);
        return (
          `<line x1="${LEFT - 5}" y1="${y.toFixed(1)}" x2="${LEFT}" y2="${y.toFixed(1)}" class="fig-ink"></line>${label({ x: LEFT - 9, y: (y + 4).toFixed(1), text: `${value}`, anchor: "end", size: SIZE.tick, class: "text-ink" })}`
        );
      })
      .join("");

    const distanceTicks = [0, 2, 4, 6, 8, 10]
      .map((value) => {
        const x = xFor(value);
        return (
          `<line x1="${x.toFixed(1)}" y1="${BASE}" x2="${x.toFixed(1)}" y2="${BASE + 5}" class="fig-ink"></line>${label({ x: x.toFixed(1), y: BASE + 18, text: `${value}`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}`
        );
      })
      .join("");

    const areaLabel =
      rectW > 60 && rectH > 24
        ? `${label({ x: (LEFT + rectW / 2).toFixed(1), y: (rectY + rectH / 2 + 4).toFixed(1), text: `${work} J`, anchor: "middle", size: SIZE.heading, class: "text-ink" })}`
        : "";

    svg.innerHTML =
      `<line x1="${LEFT}" y1="${BASE}" x2="${RIGHT}" y2="${BASE}" class="fig-ink" stroke-width="2"></line><line x1="${LEFT}" y1="${BASE}" x2="${LEFT}" y2="${TOP}" class="fig-ink" stroke-width="2"></line>` +
      forceTicks +
      distanceTicks +
      `${label({ x: (LEFT + RIGHT) / 2, y: BASE + 36, text: `distance (m)`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}${label({ x: 16, y: (TOP + BASE) / 2, text: 'force (N)', anchor: "middle", size: SIZE.tick, class: "text-ink", rotate: -90 })}<rect x="${LEFT}" y="${rectY.toFixed(1)}" width="${rectW.toFixed(1)}" height="${rectH.toFixed(1)}" class="fig-accent" fill-opacity="0.18" stroke-width="2"></rect>` +
      areaLabel;

    readout.innerHTML =
      `Force <strong>${force} N</strong> and distance <strong>${distance} m</strong>. Work done <strong>= ${force} × ${distance} = ${work} J</strong>. The force transfers <strong>${work} J</strong> of energy to the box. <em>Before you move a slider, predict what happens to the work done if you double the force. Then predict what happens if you double the distance.</em>`;
  }

  react([forceInput, distanceInput], update);
}
