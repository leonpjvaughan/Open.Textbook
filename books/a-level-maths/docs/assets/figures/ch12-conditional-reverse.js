// Guided investigation for 12.2: the conditional probability formula used in
// reverse. A two-stage tree for a detector. The reader sets the base rate and
// the false-alarm rate, and reads the probability of a real event given an
// alarm. Pure HTML and SVG, no framework and no colour of its own: the fig-*
// classes carry the theme. Runtime text is plain text, never TeX.

const DETECT = 0.95;
const BAR_W = 300;
const BAR_H = 24;
const LEFT = 130;

function bar(y, value, className) {
  const width = Math.max(0, Math.round(value * BAR_W));
  return (
    `<rect x="${LEFT}" y="${y}" width="${width}" height="${BAR_H}" ` +
    `class="${className}" rx="3"></rect>` +
    `<text x="${LEFT + BAR_W + 8}" y="${y + BAR_H - 7}" class="fig-ink" ` +
    `font-size="15">${(value * 100).toFixed(1)}%</text>`
  );
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:640px">
      <p>
        <label>Probability of a fire on a morning
          <input class="base" type="range" min="1" max="200" step="1" value="1">
          <output class="base-out"></output>
        </label>
      </p>
      <p>
        <label>Probability the alarm sounds with no fire
          <input class="fpr" type="range" min="1" max="200" step="1" value="20">
          <output class="fpr-out"></output>
        </label>
      </p>
      <svg viewBox="0 0 470 132" width="100%" role="img"
           aria-label="A two-stage tree diagram for a fire alarm, with branch probabilities that change with the controls"></svg>
      <ul class="paths">
        <li>Fire and alarm: <span class="fa"></span></li>
        <li>Fire and no alarm: <span class="fn"></span></li>
        <li>No fire and alarm: <span class="na"></span></li>
        <li>No fire and no alarm: <span class="nn"></span></li>
      </ul>
      <svg viewBox="0 0 ${LEFT + BAR_W + 60} 66" width="100%" role="img"
           aria-label="A bar chart comparing the base rate with the probability of a fire given an alarm"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const base = el.querySelector(".base");
  const fpr = el.querySelector(".fpr");
  const baseOut = el.querySelector(".base-out");
  const fprOut = el.querySelector(".fpr-out");
  const tree = el.querySelector("svg");
  const bars = el.querySelectorAll("svg")[1];
  const readout = el.querySelector(".readout");

  function line(x1, y1, x2, y2, className) {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${className}"></line>`;
  }

  function label(x, y, text) {
    return `<text x="${x}" y="${y}" class="fig-ink" font-size="14">${text}</text>`;
  }

  function render() {
    const pFire = Number(base.value) / 1000;
    const pFalse = Number(fpr.value) / 1000;
    const pNoFire = 1 - pFire;

    baseOut.value = pFire.toFixed(3);
    baseOut.textContent = pFire.toFixed(3);
    fprOut.value = pFalse.toFixed(3);
    fprOut.textContent = pFalse.toFixed(3);

    const fireAlarm = pFire * DETECT;
    const fireNo = pFire * (1 - DETECT);
    const noFireAlarm = pNoFire * pFalse;
    const noFireNo = pNoFire * (1 - pFalse);
    const pAlarm = fireAlarm + noFireAlarm;
    const posterior = pAlarm > 0 ? fireAlarm / pAlarm : 0;

    el.querySelector(".fa").textContent = fireAlarm.toFixed(5);
    el.querySelector(".fn").textContent = fireNo.toFixed(5);
    el.querySelector(".na").textContent = noFireAlarm.toFixed(5);
    el.querySelector(".nn").textContent = noFireNo.toFixed(5);

    const rx = 24;
    const ry = 66;
    const n1x = 150;
    const n1y = 26;
    const n2y = 106;
    const lx = 360;
    tree.innerHTML =
      line(rx, ry, n1x, n1y, "fig-ink") +
      line(rx, ry, n1x, n2y, "fig-ink") +
      line(n1x, n1y, lx, 12, "fig-ink") +
      line(n1x, n1y, lx, 46, "fig-ink") +
      line(n1x, n2y, lx, 92, "fig-ink") +
      line(n1x, n2y, lx, 126, "fig-ink") +
      label(rx + 4, ry - 4, "start") +
      label(70, 38, `fire ${pFire.toFixed(3)}`) +
      label(70, 112, `no fire ${pNoFire.toFixed(3)}`) +
      label(200, 20, `alarm ${DETECT.toFixed(2)}`) +
      label(200, 54, `no alarm ${(1 - DETECT).toFixed(2)}`) +
      label(200, 84, `alarm ${pFalse.toFixed(3)}`) +
      label(200, 122, `no alarm ${(1 - pFalse).toFixed(3)}`) +
      label(lx + 6, 16, "fire, alarm") +
      label(lx + 6, 50, "fire, no alarm") +
      label(lx + 6, 96, "no fire, alarm") +
      label(lx + 6, 130, "no fire, no alarm");

    bars.innerHTML =
      label(0, 17, "P(fire)") +
      bar(4, pFire, "fig-warn") +
      label(0, 55, "P(fire | alarm)") +
      bar(42, posterior, "fig-accent");

    readout.textContent =
      `P(alarm) is ${pAlarm.toFixed(5)}. ` +
      `P(fire given alarm) is ${posterior.toFixed(4)}, ` +
      `so about ${(posterior * 100).toFixed(1)}% of alarms are real fires.`;

    tree.setAttribute(
      "aria-label",
      `A two-stage tree diagram. The probability of a fire is ${pFire.toFixed(3)}. ` +
        `The alarm sounds with probability ${DETECT.toFixed(2)} when there is a fire ` +
        `and ${pFalse.toFixed(3)} when there is not. ` +
        `The probability of a fire given an alarm is ${posterior.toFixed(4)}.`
    );
    bars.setAttribute(
      "aria-label",
      `A bar chart. The base rate is ${(pFire * 100).toFixed(2)} percent ` +
        `and the probability of a fire given an alarm is ${(posterior * 100).toFixed(1)} percent.`
    );
  }

  base.addEventListener("input", render);
  fpr.addEventListener("input", render);
  render();
}
