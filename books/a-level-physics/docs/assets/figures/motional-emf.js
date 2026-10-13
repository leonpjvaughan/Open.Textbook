// Tier-1 guided investigation: electromagnetic induction by a moving rod.
//
// A conducting rod slides along two rails through a uniform magnetic field. The
// sliders set the flux density, the length, the speed and the resistance of the
// circuit. The readout gives the induced emf, the current, the magnetic force
// that opposes the motion, and the mechanical and electrical power. The two
// powers are equal, because energy is conserved.
//
// Every control changes the drawing: a stronger field is drawn with the field
// marks closer together, a longer rod means the rails are further apart, a
// faster rod gets a longer velocity arrow, and a larger current makes the wires
// thicker. A drawing that ignored the controls could not be used to test a
// prediction.
//
// Colours come from the fig-* classes. The readout is plain HTML, never runtime
// maths.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A conducting rod sliding along two rails through a magnetic field, with the induced current and the opposing force shown. The field marks, the rail spacing, the velocity arrow and the wire thickness change with the controls.",
    width: 620,
    height: 300,
    max: 620,
  });

  const field = slider(el, { show: true,
    id: "field",
    label: "Flux density (tesla)",
    min: 0.05,
    max: 0.5,
    step: 0.01,
    value: 0.25,
    format: (value) => value.toFixed(2),
  });
  const length = slider(el, { show: true,
    id: "length",
    label: "Length of the rod (metres)",
    min: 0.2,
    max: 2,
    step: 0.1,
    value: 1,
    format: (value) => value.toFixed(1),
  });
  const speed = slider(el, { show: true,
    id: "speed",
    label: "Speed (metres per second)",
    min: 1,
    max: 10,
    step: 0.5,
    value: 4,
    format: (value) => value.toFixed(1),
  });
  const resistance = slider(el, { show: true,
    id: "resistance",
    label: "Circuit resistance (ohms)",
    min: 0.5,
    max: 5,
    step: 0.1,
    value: 2,
    format: (value) => value.toFixed(1),
  });

  function update() {
    const B = Number(field.value);
    const L = Number(length.value);
    const v = Number(speed.value);
    const R = Number(resistance.value);

    const emf = B * L * v;
    const current = emf / R;
    const force = B * current * L;
    const mechanical = force * v;
    const electrical = emf * current;

    const TOP_PAD = 40;
    const CY = 155;
    const LEFT = 70;
    const RIGHT = 560;
    const ROD_X = 330;
    // The rod length is the distance between the rails, so a longer rod means
    // the rails are further apart and the rod is drawn longer.
    const gap = 40 + ((L - 0.2) / 1.8) * 160;
    const TOP = CY - gap / 2;
    const BOTTOM = CY + gap / 2;
    // A stronger field is drawn with the field marks closer together, and a
    // larger current is drawn with thicker wires. The values are in the readout
    // too, so neither is the only signal.
    const step = 90 - 120 * B;
    const vLength = 24 + ((v - 1) / 9) * 76;
    const wire = (2 + 4 * Math.sqrt(current / 20)).toFixed(1);

    let dots = "";
    for (let x = LEFT; x < RIGHT; x += step) {
      for (let y = TOP - TOP_PAD; y < BOTTOM + TOP_PAD; y += step) {
        dots += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="2.5" class="fig-ink"></circle>`;
      }
    }

    const vTip = ROD_X + 8 + vLength;
    const drawing =
      dots +
      `<line x1="${LEFT}" y1="${TOP}" x2="${RIGHT}" y2="${TOP}" class="fig-ink" stroke-width="${wire}"></line>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink" stroke-width="${wire}"></line>` +
      `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" class="fig-accent" stroke-width="${wire}"></line>` +
      `<line x1="${ROD_X}" y1="${TOP}" x2="${ROD_X}" y2="${BOTTOM}" class="fig-good" stroke-width="8"></line>` +
      `<line x1="${ROD_X + 8}" y1="${TOP - 30}" x2="${vTip.toFixed(0)}" y2="${TOP - 30}" class="fig-good" stroke-width="3"></line>` +
      `<polygon points="${vTip.toFixed(0)},${TOP - 35} ${vTip.toFixed(0)},${TOP - 25} ${(vTip + 12).toFixed(0)},${TOP - 30}" class="fig-good"></polygon>` +
      `<text x="${(vTip + 18).toFixed(0)}" y="${TOP - 26}" font-size="18" class="fig-ink">v</text>` +
      `<text x="${LEFT - 10}" y="${CY}" font-size="18" class="fig-ink" text-anchor="end">R</text>` +
      `<text x="${(LEFT + ROD_X) / 2}" y="${TOP + 22}" font-size="18" class="fig-ink" text-anchor="middle">current</text>`;

    svg.innerHTML = drawing;

    readout.innerHTML =
      `emf = <strong>${emf.toFixed(2)} V</strong>, so the current is ` +
      `<strong>${current.toFixed(2)} A</strong>. The field pushes the rod back with ` +
      `<strong>${force.toFixed(2)} N</strong>. ` +
      `Mechanical power = ${mechanical.toFixed(2)} W. Electrical power = ` +
      `${electrical.toFixed(2)} W. ` +
      `<em>Compare the two powers. Why must you keep pulling the rod?</em>`;
  }

  react([field, length, speed, resistance], update);
}
