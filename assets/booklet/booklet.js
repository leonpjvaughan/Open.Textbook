/* The shared formulae-and-tables widget. Every book that declares a booklet
 * loads it, and the labels, boards and tier behaviour come from the book's own
 * booklet.json (`meta`), so one widget serves a mathematics booklet and a
 * physics one. A data file that sets none of those keys gets the original
 * mathematics defaults.
 *
 * A non-modal reference panel: a floating action button opens a resizable,
 * draggable panel that can be popped into an always-on-top Document
 * Picture-in-Picture window where the browser supports it. Content is filtered
 * by exam board and, where the book is tiered, by tier, so selecting a board
 * hides anything that board does not allow. Data is inline MathML (rendered at
 * build time) plus tables.
 *
 * Loaded site-wide via extra_javascript; it renders nothing but the button
 * until first opened, then lazily fetches booklet.json.
 */
(() => {
  "use strict";

  // `currentScript` may be an SVG script, which has no `src`; this one is a `<script>`.
  const script = /** @type {HTMLScriptElement | null} */ (document.currentScript);
  const dataUrl = script
    ? new URL("booklet.json", script.src).toString()
    : "booklet.json";
  const STORE_KEY = "textbook-booklet-v1";
  const GROUP_ORDER = ["given", "question", "know"];

  const state = {
    open: false,
    board: "aqa",
    tier: "F",
    tab: "formulae",
    groups: [...GROUP_ORDER],
    query: "",
    rect: null,
    loaded: false,
    data: null,
  };

  let panel;
  let fab;
  let pipWindow = null;

  // ---------- helpers ----------
  const esc = (value) =>
    String(value).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      if (saved.board) state.board = saved.board;
      if (saved.tier) state.tier = saved.tier;
      if (saved.tab) state.tab = saved.tab;
      if (Array.isArray(saved.groups) && saved.groups.length) state.groups = saved.groups;
      if (saved.rect) state.rect = saved.rect;
    } catch {
      /* ignore corrupt storage */
    }
  }

  function saveState() {
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({
          board: state.board,
          tier: state.tier,
          tab: state.tab,
          groups: state.groups,
          rect: state.rect,
        }),
      );
    } catch {
      /* storage may be unavailable */
    }
  }

  // ---------- data ----------
  async function ensureData() {
    if (state.loaded) return state.data;
    const res = await fetch(dataUrl, { cache: "force-cache" });
    if (!res.ok) throw new Error(`booklet data: ${res.status}`);
    state.data = await res.json();
    state.loaded = true;
    return state.data;
  }

  // ---------- filtering ----------
  function itemAllowed(item, board, tier, groups, query) {
    const group = (item.provision || {})[board];
    if (!group || !groups.includes(group)) return false;
    // An item with no tier belongs to every reader (an untiered book, e.g. an
    // A-level one), so the tier filter must not hide it.
    const tiers = item.tier || [];
    if (tiers.length && !tiers.includes(tier)) return false;
    if (!query) return true;
    const hay = [item.name, item.latex, item.note, ...(item.keywords || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(query);
  }

  // ---------- rendering ----------
  function itemHtml(item, group, meta) {
    const badge = meta.groups[group] || { label: group, tone: "muted" };
    return `<article class="bk-item" data-group="${group}">
      <div class="bk-item__formula">${item.mathml}</div>
      <div class="bk-item__meta">
        <span class="bk-item__name">${esc(item.name)}</span>
        <span class="bk-badge bk-badge--${esc(badge.tone || "muted")}">${esc(badge.label)}</span>
      </div>
      ${item.note ? `<p class="bk-item__note">${esc(item.note)}</p>` : ""}
    </article>`;
  }

  function tableHtml(table) {
    const head = table.columns.map((c) => `<th scope="col">${esc(c)}</th>`).join("");
    const rows = table.rows
      .map((row) => {
        const cells = row
          .map((cell, i) =>
            i === 0
              ? `<th scope="row">${esc(cell)}</th>`
              : `<td>${esc(cell)}</td>`,
          )
          .join("");
        return `<tr>${cells}</tr>`;
      })
      .join("");
    return `<section class="bk-section"><h3>${esc(table.title)}</h3>
      <table class="bk-table"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></section>`;
  }

  /** Show or hide the search box. It filters formulae; tables have no search. */
  function setSearchVisible(visible) {
    const box = panel.querySelector(".bk-search");
    if (!box) return;
    box.hidden = !visible;
    // `hidden` alone can leave it focusable once a style sets `display`, so it is
    // disabled too — out of the tab order for certain.
    box.disabled = !visible;
  }

  function renderContent() {
    const content = panel.querySelector(".bk-content");
    const meta = state.data.meta;
    const query = state.query.trim().toLowerCase();
    let count = 0;

    if (state.tab === "tables") {
      const tables = state.data.tables.filter(
        (t) => t.tier === undefined || t.tier.includes(state.tier),
      );
      content.innerHTML = tables.map(tableHtml).join("");
      // The filtered count, not every table in the booklet. A Foundation reader
      // was told "3 tables" and shown 2, because the list was tier-filtered and
      // the number was not.
      panel.querySelector(".bk-count").textContent =
        `${tables.length} ${meta.table_label || "tables"}`;
      // There is no search on this tab, so the box is hidden rather than left
      // visible and inert — typing in it did nothing and said nothing.
      setSearchVisible(false);
      return;
    }
    setSearchVisible(true);

    const html = state.data.sections
      .map((section) => {
        const items = section.items.filter((item) =>
          itemAllowed(item, state.board, state.tier, state.groups, query),
        );
        if (!items.length) return "";
        count += items.length;
        const body = items
          .map((item) => {
            const group = item.provision[state.board];
            return itemHtml(item, group, meta);
          })
          .join("");
        return `<section class="bk-section"><h3>${esc(section.title)}</h3>${body}</section>`;
      })
      .join("");

    content.innerHTML =
      html ||
      `<p class="bk-empty">Nothing matches those filters.</p>`;
    panel.querySelector(".bk-count").textContent =
      `${count} ${meta.item_label || "formulae"}`;
  }

  // Labels and controls come from the booklet data, not from this file, so the
  // shared widget serves a mathematics booklet and a physics one without naming
  // either. Every override is optional: a data file that sets none behaves as
  // the widget always did.
  function applyMeta(meta) {
    const title = meta.title || "Formulae and tables";
    panel.setAttribute("aria-label", title);
    if (meta.panel_title) panel.querySelector(".bk-title").textContent = meta.panel_title;
    if (meta.short) fab.querySelector(".bk-fab__label").textContent = meta.short;
    const tab = panel.querySelector('.bk-tab[data-tab="formulae"]');
    if (tab && meta.tab_label) tab.textContent = meta.tab_label;
    const search = panel.querySelector(".bk-search");
    if (search && meta.search_placeholder) search.placeholder = meta.search_placeholder;

    const boardIds = Object.keys(meta.boards || {});
    if (boardIds.length && !boardIds.includes(state.board)) {
      state.board =
        meta.default_board && boardIds.includes(meta.default_board)
          ? meta.default_board
          : boardIds[0];
    }

    const tierField = panel.querySelector(".bk-tier-field");
    if (tierField) tierField.hidden = meta.tiered === false;

    panel.querySelectorAll(".bk-chip").forEach((chip) => {
      const group = (meta.groups || {})[chip.dataset.group];
      if (group && group.chip) chip.textContent = group.chip;
    });

    const series = panel.querySelector(".bk-series");
    if (series) {
      series.textContent = meta.series
        ? ` · ${meta.series}`
        : meta.year
          ? ` · exams in ${meta.year}`
          : "";
    }
  }

  function renderControls() {
    const meta = state.data.meta;
    applyMeta(meta);
    const boardSelect = panel.querySelector(".bk-board");
    boardSelect.innerHTML = Object.entries(meta.boards)
      .map(
        ([id, board]) =>
          `<option value="${id}"${id === state.board ? " selected" : ""}>${esc(board.name)} (${esc(board.code)})</option>`,
      )
      .join("");

    const tierSelect = panel.querySelector(".bk-tier");
    tierSelect.value = state.tier;

    panel.querySelectorAll(".bk-chip").forEach((chip) => {
      chip.setAttribute(
        "aria-pressed",
        String(state.groups.includes(chip.dataset.group)),
      );
    });
    panel.querySelectorAll(".bk-tab").forEach((tab) => {
      tab.setAttribute("aria-selected", String(tab.dataset.tab === state.tab));
    });
    panel.querySelector(".bk-provenance").textContent =
      meta.provenance[state.board] || meta.note;
  }

  function render() {
    renderControls();
    renderContent();
  }

  // ---------- panel behaviour ----------
  function open() {
    panel.hidden = false;
    state.open = true;
    fab.setAttribute("aria-expanded", "true");
    ensureData()
      .then(render)
      .catch((err) => {
        panel.querySelector(".bk-content").innerHTML =
          `<p class="bk-empty">Could not load the booklet. ${esc(err.message)}</p>`;
      });
  }

  function close() {
    panel.hidden = true;
    state.open = false;
    fab.setAttribute("aria-expanded", "false");
    if (pipWindow) pipWindow.close();
  }

  async function togglePopout() {
    if (!("documentPictureInPicture" in window)) return;
    if (pipWindow) {
      pipWindow.close();
      return;
    }
    const rect = panel.getBoundingClientRect();
    const pip = await window.documentPictureInPicture.requestWindow({
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    });
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        const style = pip.document.createElement("style");
        style.textContent = Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join("");
        pip.document.head.append(style);
      } catch {
        /* cross-origin stylesheet: skip */
      }
    }
    pip.document.documentElement.style.colorScheme = document.documentElement.style.colorScheme;
    for (const attr of document.documentElement.attributes) {
      if (attr.name.startsWith("data-md-")) {
        pip.document.documentElement.setAttribute(attr.name, attr.value);
      }
    }
    pip.document.body.classList.add("bk-popout-body");
    pip.document.body.append(panel);
    panel.classList.add("bk--popped");
    pipWindow = pip;
    pip.addEventListener("pagehide", () => {
      pipWindow = null;
      panel.classList.remove("bk--popped");
      document.body.append(panel);
    });
  }

  function bigScreen() {
    return window.matchMedia("(min-width: 720px)").matches;
  }

  function applyRect() {
    if (!state.rect || !bigScreen()) return;
    // A rect saved on a wider window can leave the panel off-screen while the
    // button still reports `aria-expanded="true"`. Clamp it back into view.
    const width = Math.min(state.rect.width, window.innerWidth);
    const height = Math.min(state.rect.height, window.innerHeight);
    const left = Math.max(0, Math.min(state.rect.left, window.innerWidth - width));
    const top = Math.max(0, Math.min(state.rect.top, window.innerHeight - height));
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
    panel.style.width = `${width}px`;
    panel.style.height = `${height}px`;
  }

  function rememberRect() {
    if (!bigScreen() || panel.classList.contains("bk--popped")) return;
    const r = panel.getBoundingClientRect();
    state.rect = { left: r.left, top: r.top, width: r.width, height: r.height };
    saveState();
  }

  function makeDraggable(handle) {
    handle.addEventListener("pointerdown", (event) => {
      if (!bigScreen() || event.target.closest("button, input, select, a")) return;
      const r = panel.getBoundingClientRect();
      const start = { x: event.clientX, y: event.clientY, left: r.left, top: r.top };
      handle.setPointerCapture(event.pointerId);
      const move = (e) => {
        const left = Math.min(Math.max(0, start.left + e.clientX - start.x), innerWidth - 80);
        const top = Math.min(Math.max(0, start.top + e.clientY - start.y), innerHeight - 60);
        panel.style.left = `${left}px`;
        panel.style.top = `${top}px`;
        panel.style.right = "auto";
        panel.style.bottom = "auto";
      };
      const up = () => {
        handle.removeEventListener("pointermove", move);
        handle.removeEventListener("pointerup", up);
        rememberRect();
      };
      handle.addEventListener("pointermove", move);
      handle.addEventListener("pointerup", up);
    });
  }

  function makeResizable(handle) {
    const MIN_W = 320;
    const MIN_H = 280;
    const apply = (width, height) => {
      panel.style.width = `${Math.max(MIN_W, Math.min(width, innerWidth - panel.offsetLeft - 8))}px`;
      panel.style.height = `${Math.max(MIN_H, Math.min(height, innerHeight - panel.offsetTop - 8))}px`;
    };
    let start = null;
    handle.addEventListener("pointerdown", (event) => {
      if (!bigScreen()) return;
      const rect = panel.getBoundingClientRect();
      start = { x: event.clientX, y: event.clientY, width: rect.width, height: rect.height };
      handle.setPointerCapture(event.pointerId);
      event.preventDefault();
    });
    handle.addEventListener("pointermove", (event) => {
      if (!start || event.buttons !== 1) return;
      apply(start.width + (event.clientX - start.x), start.height + (event.clientY - start.y));
    });
    const stop = () => {
      if (!start) return;
      start = null;
      rememberRect();
    };
    handle.addEventListener("pointerup", stop);
    handle.addEventListener("pointercancel", stop);
    return apply;
  }

  function build() {
    fab = document.createElement("button");
    fab.type = "button";
    fab.className = "bk-fab";
    fab.setAttribute("aria-expanded", "false");
    fab.setAttribute("aria-controls", "formula-booklet");
    fab.innerHTML = `<span aria-hidden="true">Σ</span><span class="bk-fab__label">Formulae</span>`;

    panel = document.createElement("section");
    panel.id = "formula-booklet";
    panel.className = "bk-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-label", "GCSE Mathematics formulae and tables");
    panel.hidden = true;
    panel.innerHTML = `
      <header class="bk-bar">
        <span class="bk-grip" aria-hidden="true"></span>
        <h2 class="bk-title">Formulae &amp; tables</h2>
        <div class="bk-bar__tools">
          <label class="bk-field">Board
            <select class="bk-board"></select>
          </label>
          <label class="bk-field bk-tier-field">Tier
            <select class="bk-tier">
              <option value="F">Foundation</option>
              <option value="H">Higher</option>
            </select>
          </label>
          <button class="bk-icon bk-popout" type="button" title="Pop out (always on top)" aria-label="Pop out">⧉</button>
          <button class="bk-icon bk-close" type="button" title="Close" aria-label="Close">✕</button>
        </div>
      </header>
      <div class="bk-toolbar">
        <input class="bk-search" type="search" placeholder="Search formulae…" aria-label="Search formulae">
        <div class="bk-chips" role="group" aria-label="Show">
          <button class="bk-chip" type="button" data-group="given" aria-pressed="true">Given</button>
          <button class="bk-chip" type="button" data-group="question" aria-pressed="true">In question</button>
          <button class="bk-chip" type="button" data-group="know" aria-pressed="true">Must know</button>
        </div>
      </div>
      <div class="bk-tabs" role="tablist" aria-label="Booklet sections">
        <button class="bk-tab" type="button" role="tab" data-tab="formulae" aria-selected="true">Formulae</button>
        <button class="bk-tab" type="button" role="tab" data-tab="tables" aria-selected="false">Tables</button>
        <span class="bk-count" aria-live="polite"></span>
      </div>
      <div class="bk-content" tabindex="0"></div>
      <footer class="bk-foot"><span class="bk-provenance"></span><span class="bk-series"></span></footer>
      <div class="bk-resize" tabindex="0" role="separator" aria-label="Resize booklet"></div>`;

    document.body.append(fab, panel);

    fab.addEventListener("click", () => (state.open ? close() : open()));
    panel.querySelector(".bk-close").addEventListener("click", close);
    panel.querySelector(".bk-popout").addEventListener("click", togglePopout);

    const boardSelect = panel.querySelector(".bk-board");
    boardSelect.addEventListener("change", () => {
      state.board = boardSelect.value;
      saveState();
      render();
    });
    const tierSelect = panel.querySelector(".bk-tier");
    tierSelect.addEventListener("change", () => {
      state.tier = tierSelect.value;
      saveState();
      render();
    });
    const search = panel.querySelector(".bk-search");
    search.addEventListener("input", () => {
      state.query = search.value;
      renderContent();
    });
    panel.querySelectorAll(".bk-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const group = chip.dataset.group;
        state.groups = state.groups.includes(group)
          ? state.groups.filter((g) => g !== group)
          : [...state.groups, group];
        saveState();
        renderContent();
        chip.setAttribute("aria-pressed", String(state.groups.includes(group)));
      });
    });
    panel.querySelectorAll(".bk-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        state.tab = tab.dataset.tab;
        saveState();
        render();
      });
    });

    panel.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
        fab.focus();
      }
    });

    makeDraggable(panel.querySelector(".bk-bar"));
    const resizeTo = makeResizable(panel.querySelector(".bk-resize"));
    panel.querySelector(".bk-resize").addEventListener("keydown", (event) => {
      const step = event.shiftKey ? 24 : 8;
      const rect = panel.getBoundingClientRect();
      if (event.key === "ArrowRight") resizeTo(rect.width + step, rect.height);
      else if (event.key === "ArrowLeft") resizeTo(rect.width - step, rect.height);
      else if (event.key === "ArrowDown") resizeTo(rect.width, rect.height + step);
      else if (event.key === "ArrowUp") resizeTo(rect.width, rect.height - step);
      else return;
      event.preventDefault();
      rememberRect();
    });

    if (!("documentPictureInPicture" in window)) {
      panel.querySelector(".bk-popout").hidden = true;
    }

    if (state.open) open();
  }

  function init() {
    loadState();
    build();
    applyRect();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
