// Tier-1 guided investigation: a distance-time graph read as the story of a journey.
//
// Section 14.5 teaches three shapes — a steep line is fast, a flat line is stopped,
// and a line that falls is coming back — and the trap it names is reading the maximum
// height of the graph as the largest input. The figure builds a journey from two
// speeds and a stop, so the reader chooses the story and watches the graph take the
// shape the story says it should.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { axes, curve, dots, fmt, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A distance-time graph of a journey with two moving stages and a stop between them",
    description:
      "The graph rises during the first stage, is flat while the car is stopped, and rises again during " +
      "the second stage. A steeper line means a faster stage, and the flat part means the distance is " +
      "not changing.",
    prompt: "Predict what the flat part of the graph will mean, then change the speeds and check.",
    width: 560,
    height: 320,
  });

  const first = slider(el, { id: "first", label: "Speed of the first hour", min: 0, max: 80, step: 5, value: 60, show: true, unit: "km/h" });
  const stop = slider(el, { id: "stop", label: "Length of the stop (hours)", min: 0, max: 2, step: 0.25, value: 1, show: true });
  const second = slider(el, { id: "second", label: "Speed of the last hour", min: 0, max: 80, step: 5, value: 40, show: true, unit: "km/h" });

  function update() {
    const v1 = Number(first.value);
    const rest = Number(stop.value);
    const v2 = Number(second.value);
    const end = 2 + rest;
    const total = v1 + v2;

    const { draw, x, y, box } = axes({
      width: 560,
      height: 320,
      pad: { left: 68, right: 24, top: 24, bottom: 48 },
      x: { domain: [0, end], label: "time (hours)", ticks: Math.min(6, Math.round(end) + 1), tickFormat: (v) => fmt(v, 2) },
      y: { domain: [0, Math.max(20, total * 1.15)], label: "distance (km)", ticks: 5, tickFormat: (v) => fmt(v, 0) },
    });

    const points = [
      [0, 0],
      [1, v1],
      [1 + rest, v1],
      [end, total],
    ];

    let drawing = draw;
    drawing += curve(points, { x, y, class: "fig-accent", width: 3 });
    drawing += dots(points, { x, y, r: 5, class: "fig-ink" });

    // The stop is named on the graph, because a flat line is the one shape a reader
    // mistakes for "no data".
    if (rest > 0) {
      drawing += label({
        x: x(1 + rest / 2),
        y: y(v1) - 14,
        text: "stopped",
        size: 16,
        class: "text-warn",
      });
    }
    drawing += label({ x: x(0.5), y: y(v1 / 2) - 10, text: `${fmt(v1, 0)} km in the first hour`, size: 16, class: "text-ink" });
    svg.innerHTML = drawing;

    const stage1 = v1 === 0 ? "The first hour adds nothing, so the graph is flat from the start." : `The first hour covers ${fmt(v1, 0)} km, so that stage has a speed of ${fmt(v1, 0)} km/h.`;
    const stopped =
      rest === 0
        ? "There is no stop, so the graph never goes flat."
        : `For the next ${fmt(rest, 2)} hour${rest === 1 ? "" : "s"} the graph is flat. The distance does not change, so the car is stopped.`;
    const stage2 = v2 === 0 ? "The last hour adds nothing either." : `The last hour covers another ${fmt(v2, 0)} km, so that stage has a speed of ${fmt(v2, 0)} km/h.`;

    readout.textContent =
      `${stage1} ${stopped} ${stage2} ` +
      `The journey covers ${fmt(total, 0)} km in ${fmt(end, 2)} hours. ` +
      `The steepest part of the graph is the fastest stage, and the flat part is the stop.`;
  }

  react([first, stop, second], update);
}
