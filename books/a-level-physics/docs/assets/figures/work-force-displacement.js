// Tier-1 guided investigation: work done as the area under a force-displacement
// graph, including a force that is not along the displacement.
//
// Guided, not a sandbox: the page asks the reader to predict how the work done
// changes as the angle grows, then to explain why the rectangle gets shorter
// even though the applied force does not change. The height of the rectangle is
// the component of the force along the displacement, F cos(theta), so the area
// of the rectangle is the work done. Colours come from CSS classes, so the
// figure adapts to every bundle and to both schemes.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A force-displacement graph with the area under the graph shaded as a rectangle, whose height is the force along the displacement and whose width is the displacement",
    width: 560,
    height: 262,
    max: 600,
  });

  const LEFT = 64;
  const RIGHT = 520;
  const BASE = 224;
  const TOP = 28;
  const MAX_FORCE = 300; // newtons
  const MAX_DISTANCE = 15; // metres

  const forceSlider = slider(el, { show: false,
    id: "force",
    label: "Force / N",
    min: 0,
    max: 300,
    step: 10,
    value: 100,
  });
  const distanceSlider = slider(el, { show: false,
    id: "distance",
    label: "Distance / m",
    min: 0,
    max: 15,
    step: 0.5,
    value: 6,
  });
  const angleSlider = slider(el, { show: false,
    id: "angle",
    label: "Angle / °",
    min: 0,
    max: 90,
    step: 5,
    value: 0,
  });

  const xFor = (metres) => LEFT + (metres / MAX_DISTANCE) * (RIGHT - LEFT);
  const yFor = (newtons) => BASE - (newtons / MAX_FORCE) * (BASE - TOP);

  function update() {
    const force = Number(forceSlider.value);
    const distance = Number(distanceSlider.value);
    const angle = Number(angleSlider.value);
    const radians = (angle * Math.PI) / 180;
    const component = force * Math.cos(radians);
    const work = component * distance;

    const rectTop = yFor(component);
    const rectWidth = Math.max(0, xFor(distance) - LEFT);
    const rectHeight = Math.max(0, BASE - rectTop);

    const forceTicks = [0, 100, 200, 300]
      .map((value) => {
        const y = yFor(value);
        return (
          `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>${label({ x: LEFT - 9, y: (y + 4).toFixed(1), text: `${value}`, anchor: "end", size: SIZE.tick, class: "text-ink" })}`
        );
      })
      .join("");

    const distanceTicks = [0, 5, 10, 15]
      .map((value) => {
        const x = xFor(value);
        return (
          `<line x1="${x.toFixed(1)}" y1="${BASE}" x2="${x.toFixed(1)}" y2="${BASE + 5}" class="fig-ink"></line>${label({ x: x.toFixed(1), y: BASE + 18, text: `${value}`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}`
        );
      })
      .join("");

    const areaLabel =
      rectWidth > 62 && rectHeight > 22
        ? `${label({ x: (LEFT + rectWidth / 2).toFixed(1), y: (rectTop + rectHeight / 2 + 4).toFixed(1), text: `${Math.round(work)} J`, anchor: "middle", size: SIZE.heading, class: "text-accent" })}`
        : "";

    svg.innerHTML =
      forceTicks +
      `<line x1="${LEFT}" y1="${BASE}" x2="${RIGHT}" y2="${BASE}" class="fig-ink" stroke-width="2"></line><line x1="${LEFT}" y1="${BASE}" x2="${LEFT}" y2="${TOP}" class="fig-ink" stroke-width="2"></line>` +
      distanceTicks +
      `${label({ x: (LEFT + RIGHT) / 2, y: BASE + 38, text: `displacement / m`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}${label({ x: 18, y: (TOP + BASE) / 2, text: 'force along displacement / N', anchor: "middle", size: SIZE.tick, class: "text-ink", rotate: -90 })}<rect x="${LEFT}" y="${rectTop.toFixed(1)}" width="${rectWidth.toFixed(1)}" height="${rectHeight.toFixed(1)}" class="fig-accent" fill-opacity="0.18" stroke-width="2"></rect>` +
      areaLabel;

    readout.innerHTML =
      `Applied force <strong>${force} N</strong> at <strong>${angle}°</strong>. Its component along the displacement is <strong>${component.toFixed(1)} N</strong>. Distance <strong>${distance} m</strong>. Work done = component × distance = <strong>${Math.round(work)} J</strong>. The area of the rectangle is the work done. <em>Before you move a slider, predict how the work done changes as the angle rises from 0° to 90°.</em>`;
  }

  react([forceSlider, distanceSlider, angleSlider], update);
}
