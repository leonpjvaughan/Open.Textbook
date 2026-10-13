// Tier-1 guided investigation: the cone of a moving-coil loudspeaker.
//
// The page asks the reader to predict which way the cone moves for a positive
// current, then to reverse the current, then to explain why a changing current
// makes the cone vibrate. The figure shows the force and the cone position, not
// a real sound. Colours come from CSS classes.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-loudspeaker-cone" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 220" width="100%" role="img"
           aria-label="A cross-section of a moving-coil loudspeaker. A coil sits in the gap of a magnet and is joined to a cone. The current can be changed, and the cone moves with the force"></svg>
      <label style="display:block;margin:.5rem 0 0">
        Current in the coil (A) <input class="current" type="range" min="-2" max="2" step="0.5" value="1.5">
      </label>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");

  function update() {
    const current = Number(el.querySelector(".current").value);
    const shift = (current / 2) * 30;
    const base = 230 + shift;

    const magnet = `
      <rect x="300" y="55" width="60" height="45" rx="6" class="fig-ink" opacity="0.2"></rect>
      <rect x="300" y="120" width="60" height="45" rx="6" class="fig-ink" opacity="0.2"></rect>
      <text x="330" y="45" font-size="16" text-anchor="middle" class="fig-ink">magnet</text>`;

    const cone = `
      <polygon points="70,25 70,195 ${base - 12},120" class="fig-ink" opacity="0.15"></polygon>
      <text x="80" y="18" font-size="16" class="fig-ink">cone</text>`;

    const coil = `
      <rect x="${base - 12}" y="100" width="24" height="40" rx="6" class="fig-accent"></rect>
      <text x="${base}" y="160" font-size="16" text-anchor="middle" class="fig-accent">coil</text>`;

    let arrow = "";
    if (current > 0) {
      arrow =
        `<line x1="${base + 12}" y1="120" x2="${base - 45}" y2="120" class="fig-warn" stroke-width="3"></line>` +
        `<polygon points="${base - 45},120 ${base - 33},114 ${base - 33},126" class="fig-warn"></polygon>`;
    } else if (current < 0) {
      arrow =
        `<line x1="${base - 12}" y1="120" x2="${base + 45}" y2="120" class="fig-warn" stroke-width="3"></line>` +
        `<polygon points="${base + 45},120 ${base + 33},114 ${base + 33},126" class="fig-warn"></polygon>`;
    }

    svg.innerHTML = cone + coil + magnet + arrow;

    if (current === 0) {
      readout.innerHTML =
        `The current is <strong>zero</strong>, so the force on the coil is zero and ` +
        `the cone rests. <em>Move the slider to send a current.</em>`;
      return;
    }
    const way = current > 0 ? "outwards, away from the magnet" : "inwards, towards the magnet";
    readout.innerHTML =
      `Current <strong>${current.toFixed(1)} A</strong>. The force on the coil pushes the ` +
      `cone <strong>${way}</strong>. ` +
      `<em>Now reverse the current. Which way does the cone move?</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
