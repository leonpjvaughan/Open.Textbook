// Single-site tier toggle. Progressive enhancement: without JS, everything is
// visible. With JS, Higher content is hidden unless the reader opts in.
(() => {
  const KEY = "gcse-tier";
  const root = document.documentElement;

  function apply(tier) {
    root.dataset.tier = tier;
    document.querySelectorAll("[data-tier='higher']").forEach((el) => {
      el.hidden = tier === "foundation";
    });
    document.querySelectorAll(".tier-switch input").forEach((input) => {
      input.checked = tier === "higher";
    });
    try {
      localStorage.setItem(KEY, tier);
    } catch (e) {
      /* storage unavailable; ignore */
    }
  }

  function makeSwitch() {
    const wrap = document.createElement("label");
    wrap.className = "tier-switch";
    wrap.style.cssText = "display:flex;gap:.5rem;align-items:center;font:13px system-ui";
    wrap.innerHTML = `<input type="checkbox"> Show Higher extensions`;
    wrap.querySelector("input").addEventListener("change", (e) =>
      apply(e.target.checked ? "higher" : "foundation"),
    );
    const host =
      document.querySelector(".md-header__topic") ||
      document.querySelector("article") ||
      document.body;
    host.appendChild(wrap);
  }

  document.addEventListener("DOMContentLoaded", () => {
    let saved = "foundation";
    try {
      saved = localStorage.getItem(KEY) || "foundation";
    } catch (e) {
      /* ignore */
    }
    makeSwitch();
    apply(saved);
  });
})();
