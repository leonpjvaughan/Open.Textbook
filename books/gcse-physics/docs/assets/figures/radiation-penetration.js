// Tier-1 guided investigation: how far alpha, beta and gamma radiation travel.
//
// The page asks the reader to predict which radiation passes through paper, then
// to test each source, then to explain why alpha is the most ionising and the
// least penetrating. The controls are native buttons, so they work with a
// keyboard, and the readout is announced politely.
// Colours come from CSS classes so the figure adapts to dark mode.
//
// The scaffolding — the surface, its accessible name and the live readout — comes
// from `kit.js`. The source buttons are not one of the kit's controls, so they
// are built here inside the kit's control column. What is left is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel } from "./kit.js";

export function mount(el) {
  const SOURCES = {
    alpha: {
      label: "Alpha",
      stopped: "paper",
      travelTo: 170,
      passes: false,
      air: "a few centimetres",
      ionising: "strongest",
      fraction: 1,
      detail:
        "An alpha particle is a helium nucleus: two protons and two neutrons. " +
        "It is strongly ionising, so it gives up its energy in a very short distance. " +
        "A sheet of paper stops it.",
    },
    beta: {
      label: "Beta",
      stopped: "a few millimetres of aluminium",
      travelTo: 310,
      passes: false,
      air: "about a metre",
      ionising: "weaker than alpha",
      fraction: 0.55,
      detail:
        "A beta particle is a fast electron that leaves the nucleus. " +
        "It ionises less strongly than an alpha particle, so it travels further. " +
        "A few millimetres of aluminium stops it.",
    },
    gamma: {
      label: "Gamma",
      stopped: "thick lead",
      travelTo: 520,
      passes: true,
      air: "a very long way",
      ionising: "weakest",
      fraction: 0.2,
      detail:
        "A gamma ray is electromagnetic radiation from the nucleus. " +
        "It is the least ionising, so it travels the furthest. " +
        "Thick lead or concrete reduces it, but some can pass through.",
    },
  };

  const { svg, readout, controls } = panel(el, {
    label:
      "A source firing alpha, beta or gamma radiation at paper, aluminium and lead barriers",
    width: 560,
    height: 165,
  });

  const sourceRow = document.createElement("div");
  sourceRow.style.cssText = "display:flex;gap:.4rem";
  const sourceButton = (name, text, pressed) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "source";
    button.dataset.source = name;
    button.setAttribute("aria-pressed", pressed);
    button.textContent = text;
    sourceRow.append(button);
    return button;
  };
  sourceButton("alpha", "Alpha", "true");
  sourceButton("beta", "Beta", "false");
  sourceButton("gamma", "Gamma", "false");
  controls.append(sourceRow);

  function draw(sourceName) {
    const source = SOURCES[sourceName];
    const barriers = [
      { x: 170, label: "paper" },
      { x: 310, label: "aluminium" },
      { x: 500, label: "lead" },
    ];

    const walls = barriers
      .map(
        (barrier) =>
          `<line x1="${barrier.x}" y1="42" x2="${barrier.x}" y2="112" class="fig-ink" stroke-width="3"></line>` +
          `<text x="${barrier.x}" y="130" font-size="16" text-anchor="middle" class="fig-ink">${barrier.label}</text>`,
      )
      .join("");

    const travel = `<line x1="40" y1="77" x2="${source.travelTo}" y2="77" class="fig-grid" stroke-dasharray="4 4"></line>`;
    const emitter =
      `<circle cx="40" cy="77" r="9" class="fig-accent"></circle>` +
      `<text x="40" y="103" font-size="16" text-anchor="middle" class="fig-ink">source</text>`;

    const marker = source.passes
      ? `<circle cx="${source.travelTo}" cy="77" r="8" class="fig-good"></circle>` +
        `<text x="${source.travelTo}" y="60" font-size="16" text-anchor="middle" class="fig-ink">passes</text>`
      : `<circle cx="${source.travelTo}" cy="77" r="8" class="fig-warn"></circle>` +
        `<text x="${source.travelTo}" y="60" font-size="16" text-anchor="middle" class="fig-ink">stopped</text>`;

    const barWidth = 100 * source.fraction;
    const ionising =
      `<text x="352" y="20" font-size="16" class="fig-ink">ionising power:</text>` +
      `<rect x="352" y="27" width="${barWidth.toFixed(1)}" height="12" class="fig-warn"></rect>` +
      `<rect x="352" y="27" width="100" height="12" class="fig-grid" fill="none"></rect>` +
      `<text x="458" y="37" font-size="16" class="fig-ink">${source.ionising}</text>`;

    svg.innerHTML = walls + travel + emitter + marker + ionising;
  }

  function select(sourceName) {
    el.querySelectorAll("button.source").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.source === sourceName));
    });
    draw(sourceName);
    const source = SOURCES[sourceName];
    readout.innerHTML =
      `<strong>${source.label}</strong> radiation is stopped by ${source.stopped}. ` +
      `Its range in air is ${source.air}, and its ionising power is ${source.ionising}. ` +
      source.detail +
      ` <em>Which source would be safest to hold outside the body, and which would be ` +
      `most dangerous inside the body?</em>`;
  }

  el.querySelectorAll("button.source").forEach((button) =>
    button.addEventListener("click", () => select(button.dataset.source)),
  );
  select("alpha");
}
