// Guided probability scale: predict and test how changing red regions changes chance.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which differ from every other figure.
import { panel, slider, react } from "./kit.js";

const SECTORS = 10;
const CENTRE = 100;
const OUTER = 88;
const INNER = 30;

// A point on the spinner, 0 degrees at the top and increasing clockwise.
function at(radius, degrees) {
  const radians = (degrees * Math.PI) / 180;
  const round = (value) => Math.round(value * 100) / 100;
  return `${round(CENTRE + radius * Math.sin(radians))} ${round(CENTRE - radius * Math.cos(radians))}`;
}

// One equal sector, drawn as an annular wedge so the ten are visibly the same size.
function sector(index) {
  const from = (index * 360) / SECTORS;
  const to = ((index + 1) * 360) / SECTORS;
  return `M ${at(OUTER, from)} A ${OUTER} ${OUTER} 0 0 1 ${at(OUTER, to)} ` +
    `L ${at(INNER, to)} A ${INNER} ${INNER} 0 0 0 ${at(INNER, from)} Z`;
}

function sectors(red) {
  return Array.from({ length: SECTORS }, (_, index) =>
    `<path class="${index < red ? 'fig-accent' : 'fig-ink'}" d="${sector(index)}"></path>`
  ).join('');
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A spinner divided into ten equal sectors",
    prompt: "A spinner has 10 equal sectors. Change how many are red.",
    width: 200,
    height: 200,
    max: 320,
  });

  const redInput = slider(el, { show: false,
    id: "red",
    label: "Red sectors",
    min: 0,
    max: 10,
    value: 4,
  });

  function draw() {
    const red = Number(redInput.value);
    svg.innerHTML = sectors(red);
    svg.setAttribute('aria-label', `A spinner divided into ten equal sectors, ${red} of them red`);
    readout.textContent = `Red sectors: ${red} out of 10. Probability of red: ${red}/10.`;
  }

  react(redInput, draw);
}
