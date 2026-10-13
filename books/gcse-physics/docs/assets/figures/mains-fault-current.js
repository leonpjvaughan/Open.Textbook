// Tier-1 guided investigation: the current path in a mains cable.
//
// Guided, not a sandbox: the page asks the reader to predict which wire carries
// the large current when the live wire touches the metal case, and to explain
// why the fuse sits in the live wire. The reader flips one switch between normal
// use and a live-to-case fault. Colours come from CSS classes, so the figure
// adapts to every bundle and both schemes; every wire and shape is also labelled
// in words, so colour is never the only signal.
//
// The scaffolding — the surface, its accessible name, the toggle, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel, toggle, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A mains cable with live, neutral and earth wires, a fuse in the live wire and a metal case, showing the current path in normal use and when the live wire touches the case",
    width: 620,
    height: 320,
    max: 620,
  });

  const fault = toggle(el, {
    id: "fault",
    label: "The live wire comes loose and touches the metal case",
  });

  const SUPPLY = 230; // volts
  const ELEMENT = 46; // ohms
  const EARTH_PATH = 2.3; // ohms, the low-resistance path to earth

  // A wire is drawn thicker when it carries more current, so the path that
  // carries the fault current stands out. The values are also written in the
  // readout, so thickness is never the only signal.
  const widthFor = (amps, peak) => 2 + 4 * Math.sqrt(amps / peak);
  const arrow = (x, y, right) => {
    const tip = right ? x + 12 : x - 12;
    return `<polygon points="${x},${y} ${tip},${y - 7} ${tip},${y + 7}" class="fig-accent"></polygon>`;
  };

  function update() {
    const on = fault.checked;
    const normal = SUPPLY / ELEMENT; // 5.0 A
    const surge = SUPPLY / EARTH_PATH; // about 100 A
    const live = on ? surge : normal;
    const neutral = on ? 0 : normal;
    const earth = on ? surge : 0;
    const peak = surge;
    const liveText = on ? `${surge.toFixed(0)} A` : `${normal.toFixed(1)} A`;

    svg.innerHTML =
      // The supply and the metal case.
      `<rect x="20" y="60" width="76" height="180" rx="6" class="fig-grid"></rect>` +
      `<text x="58" y="146" font-size="19" text-anchor="middle" class="text-ink">supply</text>` +
      `<text x="58" y="163" font-size="19" text-anchor="middle" class="text-ink">230 V</text>` +
      `<rect x="470" y="60" width="120" height="180" rx="6" class="fig-grid"></rect>` +
      `<text x="530" y="76" font-size="19" text-anchor="middle" class="text-ink">metal case</text>` +
      // The live, earth and neutral wires.
      `<line x1="96" y1="80" x2="280" y2="80" class="fig-warn" stroke-width="${widthFor(live, peak).toFixed(1)}"></line>` +
      `<line x1="340" y1="80" x2="470" y2="80" class="fig-warn" stroke-width="${widthFor(live, peak).toFixed(1)}"></line>` +
      `<line x1="96" y1="150" x2="470" y2="150" class="fig-good" stroke-width="${widthFor(earth, peak).toFixed(1)}"></line>` +
      `<line x1="96" y1="220" x2="470" y2="220" class="fig-ink" stroke-width="${widthFor(neutral, peak).toFixed(1)}"></line>` +
      // The fuse in the live wire.
      `<rect x="280" y="66" width="60" height="28" rx="4" class="fig-grid"></rect>` +
      `<line x1="288" y1="80" x2="332" y2="80" class="fig-warn" stroke-width="3"></line>` +
      (on
        ? `<text x="310" y="60" font-size="18" text-anchor="middle" class="text-warn">13 A fuse melts</text>`
        : `<text x="310" y="60" font-size="18" text-anchor="middle" class="text-ink">fuse 13 A</text>`) +
      // The wire names and their potentials.
      `<text x="104" y="72" font-size="18" class="text-warn">live</text>` +
      `<text x="104" y="142" font-size="18" class="text-good">earth</text>` +
      `<text x="104" y="212" font-size="18" class="text-ink">neutral</text>` +
      `<text x="462" y="72" font-size="18" text-anchor="end" class="text-warn">about 230 V</text>` +
      `<text x="462" y="142" font-size="18" text-anchor="end" class="text-good">0 V</text>` +
      `<text x="462" y="212" font-size="18" text-anchor="end" class="text-ink">about 0 V</text>` +
      // The heating element inside the case.
      `<line x1="470" y1="80" x2="520" y2="80" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="520" y1="80" x2="520" y2="120" class="fig-ink" stroke-width="2"></line>` +
      `<rect x="500" y="120" width="40" height="60" rx="4" class="fig-accent"></rect>` +
      `<line x1="520" y1="180" x2="520" y2="220" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="520" y1="220" x2="470" y2="220" class="fig-ink" stroke-width="2"></line>` +
      `<text x="548" y="148" font-size="18" class="text-ink">element</text>` +
      `<text x="548" y="164" font-size="18" class="text-ink">46 &Omega;</text>` +
      // The current path: live in, then the return path.
      arrow(400, 80, true) +
      (on
        ? arrow(400, 150, false) +
          `<line x1="450" y1="80" x2="470" y2="106" class="fig-warn" stroke-width="4"></line>` +
          `<circle cx="470" cy="106" r="5" class="fig-warn"></circle>` +
          `<text x="446" y="52" font-size="18" text-anchor="end" class="text-warn">live touches case</text>`
        : arrow(400, 220, false)) +
      // The current in each wire, written out.
      `<text x="200" y="64" font-size="18" text-anchor="middle" class="text-ink">${liveText}</text>` +
      (on
        ? `<text x="200" y="134" font-size="18" text-anchor="middle" class="text-ink">${surge.toFixed(0)} A</text>`
        : `<text x="200" y="204" font-size="18" text-anchor="middle" class="text-ink">${normal.toFixed(1)} A</text>`);

    if (on) {
      readout.innerHTML =
        `The live wire touches the metal case. The case is joined to the earth wire, ` +
        `so the case stays at <strong>0 V</strong>. The low-resistance path to earth ` +
        `carries a large current of about <strong>${surge.toFixed(0)} A</strong>. ` +
        `The same large current flows through the fuse, so the <strong>13 A fuse melts</strong> ` +
        `and breaks the live wire. ` +
        `<em>Why is the fuse placed in the live wire, and not in the neutral wire?</em>`;
    } else {
      readout.innerHTML =
        `In normal use the appliance takes <strong>${normal.toFixed(1)} A</strong>. ` +
        `The current flows along the live wire, through the heating element, and back ` +
        `along the neutral wire. The earth wire carries <strong>no current</strong>. ` +
        `<em>Now make a fault. Which wire will carry the large current?</em>`;
    }
  }

  react(fault, update);
}
