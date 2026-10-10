// Tier-1 figure: the straight line y = mx + c with keyboard-operable sliders.
// No dependencies; exports mount(el) as the substrate expects.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-gradient" style="max-width:320px;font:14px system-ui">
      <svg viewBox="0 0 240 240" width="100%" height="220" role="img"
           aria-label="Straight-line graph of y equals m x plus c">
        <g stroke="#d4d4d4">
          <line x1="0" y1="120" x2="240" y2="120"></line>
          <line x1="120" y1="0" x2="120" y2="240"></line>
        </g>
        <line class="fig-line" x1="0" y1="0" x2="240" y2="240"
              stroke="#2563eb" stroke-width="2"></line>
        <circle class="fig-pt" cx="120" cy="120" r="3" fill="#2563eb"></circle>
      </svg>
      <label style="display:block">m <input class="m" type="range" min="-3" max="3" step="0.1" value="1"></label>
      <label style="display:block">c <input class="c" type="range" min="-5" max="5" step="0.5" value="0"></label>
      <output class="eq" aria-live="polite">y = 1x + 0</output>
    </div>`;

  const line = el.querySelector(".fig-line");
  const pt = el.querySelector(".fig-pt");
  const eq = el.querySelector(".eq");
  const scale = 20;
  const X = (x) => 120 + x * scale;
  const Y = (y) => 120 - y * scale;

  function update() {
    const m = Number(el.querySelector(".m").value);
    const c = Number(el.querySelector(".c").value);
    line.setAttribute("x1", X(-6));
    line.setAttribute("y1", Y(m * -6 + c));
    line.setAttribute("x2", X(6));
    line.setAttribute("y2", Y(m * 6 + c));
    pt.setAttribute("cx", X(0));
    pt.setAttribute("cy", Y(c));
    eq.textContent = `y = ${m}x + ${c}`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
