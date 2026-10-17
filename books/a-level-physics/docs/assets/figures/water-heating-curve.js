// Tier-1 guided investigation: the heating curve of water.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. Two sliders set the mass of water and the power of the heater, and the
// figure draws the temperature against the time. The two flat plateaus are the
// change of state at melting and at boiling. The boiling plateau is far longer
// than the melting one, because the specific latent heat of vaporisation is much
// larger than the specific latent heat of fusion.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to
// both schemes. No colour literal appears here, and no runtime LaTeX: the readout
// is plain HTML.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Temperature against time for water heated at a steady rate, showing a short melting plateau and a much longer boiling plateau",
    width: 640,
    height: 340,
    max: 640,
  });

  const mass = slider(el, { show: true,
    id: "mass",
    label: "Mass of water (kg)",
    min: 0.1,
    max: 2,
    step: 0.05,
    value: 1,
    format: (value) => value.toFixed(2),
  });
  const power = slider(el, { show: true,
    id: "power",
    label: "Heater power (W)",
    min: 200,
    max: 1000,
    step: 50,
    value: 500,
  });

  // The specific heat capacities and latent heats of water.
  const C_ICE = 2100;
  const L_FUSION = 3.34e5;
  const C_WATER = 4200;
  const L_VAPOUR = 2.26e6;
  const C_STEAM = 2000;
  const T_START = -20;
  const T_MELT = 0;
  const T_BOIL = 100;
  const T_END = 120;

  const LEFT = 64;
  const RIGHT = 620;
  const TOP = 24;
  const BOTTOM = 296;
  const Y_MIN = -40;
  const Y_MAX = 140;

  function update() {
    const m = Number(mass.value);
    const p = Number(power.value);

    const q1 = m * C_ICE * (T_MELT - T_START);
    const q2 = m * L_FUSION;
    const q3 = m * C_WATER * (T_BOIL - T_MELT);
    const q4 = m * L_VAPOUR;
    const q5 = m * C_STEAM * (T_END - T_BOIL);
    const t1 = q1 / p;
    const t2 = q2 / p;
    const t3 = q3 / p;
    const t4 = q4 / p;
    const t5 = q5 / p;
    const total = t1 + t2 + t3 + t4 + t5;

    const xFor = (time) => LEFT + (time / total) * (RIGHT - LEFT);
    const yFor = (temp) =>
      BOTTOM - ((temp - Y_MIN) / (Y_MAX - Y_MIN)) * (BOTTOM - TOP);

    const marks = [T_START, T_MELT, T_BOIL, T_END];
    let grid = "";
    let labels = "";
    for (const temp of marks) {
      const y = yFor(temp);
      grid += `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid" stroke-dasharray="3 4"></line>`;
      labels += `${label({ x: LEFT - 8, y: (y + 4).toFixed(1), text: `${temp}`, anchor: "end", size: SIZE.value, class: "text-ink" })}`;
    }
    grid += `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" class="fig-ink" stroke-width="2"></line>`;
    grid += `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink" stroke-width="2"></line>`;
    labels += `${label({ x: (LEFT + RIGHT) / 2, y: BOTTOM + 34, text: `time / s`, anchor: "middle", size: SIZE.heading, class: "text-ink" })}`;
    labels += `${label({ x: 20, y: (TOP + BOTTOM) / 2, text: 'temperature / °C', anchor: "middle", size: SIZE.heading, class: "text-ink", rotate: -90 })}`;

    const points = [
      [0, T_START],
      [t1, T_MELT],
      [t1 + t2, T_MELT],
      [t1 + t2 + t3, T_BOIL],
      [t1 + t2 + t3 + t4, T_BOIL],
      [total, T_END],
    ];
    const curve = points
      .map(([time, temp]) => `${xFor(time).toFixed(1)},${yFor(temp).toFixed(1)}`)
      .join(" ");

    const meltingX = xFor(t1 + t2 / 2);
    const boilingX = xFor(t1 + t2 + t3 + t4 / 2);
    const plateauLabels =
      `${label({ x: meltingX.toFixed(1), y: (yFor(T_MELT) - 8).toFixed(1), text: `melting`, anchor: "middle", size: SIZE.value, class: "text-good" })}${label({ x: boilingX.toFixed(1), y: (yFor(T_BOIL) - 8).toFixed(1), text: `boiling`, anchor: "middle", size: SIZE.value, class: "text-warn" })}`;

    svg.innerHTML =
      grid +
      labels +
      `<polyline points="${curve}" class="fig-accent" fill="none" stroke-width="3"></polyline>` +
      plateauLabels;

    const minutes = total / 60;
    readout.innerHTML =
      `For ${m.toFixed(2)} kg and ${p} W: ice warms for <strong>${t1.toFixed(0)} s</strong>, melting takes <strong>${t2.toFixed(0)} s</strong>, the water warms for <strong>${t3.toFixed(0)} s</strong>, boiling takes <strong>${t4.toFixed(0)} s</strong>, and the steam warms for <strong>${t5.toFixed(0)} s</strong>. The total is ${total.toFixed(0)} s, about ${minutes.toFixed(1)} minutes. <em>Why does the graph stay flat while the water is boiling?</em>`;
  }

  react([mass, power], update);
}
