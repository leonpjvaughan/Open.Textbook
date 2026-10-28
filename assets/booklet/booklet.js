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

  /**
   * The shapes `booklet.json` supplies, stated once.
   *
   * The data is written by `textbook.booklet` in Python and dereferenced here, so the
   * fields are a contract between two languages rather than an inference from the first
   * property a function happens to touch. An optional field is one a book may omit —
   * `panel_title`, `tier`, `keywords` — and marking it optional is what lets `strict`
   * separate "this book did not set it" from "this code is wrong about it".
   *
   * @typedef {object} BookletBoard
   * @property {string} name  the board, as the reader knows it
   * @property {string} code  its specification code
   */

  /** @typedef {object} BookletGroupMeta
   * @property {string} [label]  the words on the badge
   * @property {string} [tone]  a badge tone: `accent`, `muted` or `warn`
   * @property {string} [chip]  the words on the filter chip */

  /** @typedef {object} BookletMeta
   * @property {string} [title]  the panel's accessible name
   * @property {string} [panel_title]  the heading, where it differs from `title`
   * @property {string} [short]  the button's label
   * @property {string} [tab_label]  the formulae tab's label
   * @property {string} [item_label]  what one item is called, `formulae` or `equations`
   * @property {string} [table_label]  what one table is called
   * @property {string} [search_placeholder]  the search box's placeholder
   * @property {string} [series]  a series or course line
   * @property {number} [year]  the exam year, when the booklet has one
   * @property {string} [default_board]
   * @property {boolean} [tiered]  `false` for a book with no tiers
   * @property {string} [note]
   * @property {string} [basis]
   * @property {Record<string, string>} provenance  the source named per board
   * @property {Record<string, BookletBoard>} boards
   * @property {Record<string, BookletGroupMeta>} groups */

  /** @typedef {object} BookletItem
   * @property {string} id
   * @property {string} name
   * @property {string} [latex]  the source, kept for the search index
   * @property {string} [note]
   * @property {string[]} [keywords]
   * @property {string[]} [tier]  absent or empty for a book with no tiers
   * @property {Record<string, string>} provision  the group each board puts it in
   * @property {string} mathml  the formula, rendered at build time */

  /** @typedef {object} BookletSection
   * @property {string} id
   * @property {string} title
   * @property {BookletItem[]} items */

  /** @typedef {object} BookletTable
   * @property {string} id
   * @property {string} title
   * @property {string[]} [tier]
   * @property {string[]} columns
   * @property {string[][]} rows */

  /** @typedef {object} BookletData
   * @property {BookletMeta} meta
   * @property {BookletSection[]} sections
   * @property {BookletTable[]} tables */

  /** @typedef {object} PanelRect
   * @property {number} left
   * @property {number} top
   * @property {number} width
   * @property {number} height */

  /** The widget's own state, as one object.
   *
   * @typedef {object} BookletState
   * @property {boolean} open
   * @property {string} board
   * @property {string} tier
   * @property {string} tab
   * @property {string[]} groups
   * @property {string} query
   * @property {PanelRect | null} rect  the panel's size and place, once a reader moves it
   * @property {boolean} loaded
   * @property {BookletData | null} data */

  /** @type {BookletState} */
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

  /* Built by `build()`, which runs before anything reads them: `init()` calls `build()`
   * first, and every other entry point is an event listener registered after it. */
  /** @type {HTMLElement} */
  let panel;
  /** @type {HTMLButtonElement} */
  let fab;
  /** @type {Window | null} */
  let pipWindow = null;

  // ---------- helpers ----------
  /** The characters that make a string malformed inside markup, and what each becomes. */
  const ENTITIES = /** @type {Record<string, string>} */ ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
  });

  /**
   * A string that can be interpolated into markup without breaking it.
   *
   * @param {unknown} value
   * @returns {string}
   */
  const esc = (value) => String(value).replace(/[&<>\"]/g, (c) => ENTITIES[c]);

  /*
   * The panel's markup is a template string in `build()`, so every selector asked for
   * below names an element this file wrote. Naming what a selector found, in one place,
   * is what keeps the alternative — a `@type` cast at each of thirty call sites — out of
   * the reading of the widget. A selector that names nothing still returns `null` and
   * still fails where it failed before; this says what the widget means, not that the
   * element is present.
   */

  /**
   * @param {ParentNode} root
   * @param {string} selector
   * @returns {HTMLElement}
   */
  function el(root, selector) {
    return /** @type {HTMLElement} */ (root.querySelector(selector));
  }

  /**
   * @param {ParentNode} root
   * @param {string} selector
   * @returns {HTMLElement[]}
   */
  function els(root, selector) {
    return /** @type {HTMLElement[]} */ (Array.from(root.querySelectorAll(selector)));
  }

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
  /**
   * Whether an item survives the board, tier, group and search filters.
   *
   * @param {BookletItem} item
   * @param {string} board
   * @param {string} tier
   * @param {string[]} groups  the groups the reader wants to see
   * @param {string} query  already trimmed and lower-cased
   * @returns {boolean}
   */
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
  /**
   * One item, as markup.
   *
   * @param {BookletItem} item
   * @param {string} group
   * @param {BookletMeta} meta
   * @returns {string}
   */
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

  /**
   * One table, as markup.
   *
   * @param {BookletTable} table
   * @returns {string}
   */
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
    return `<section class="bk-section" id="bk-table-${esc(table.id)}">
      <h3>${esc(table.title)}</h3>
      <table class="bk-table"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></section>`;
  }

  /**
   * Show or hide the search box. It filters formulae; tables have no search.
   *
   * @param {boolean} visible
   */
  function setSearchVisible(visible) {
    const box = /** @type {HTMLInputElement} */ (el(panel, ".bk-search"));
    if (!box) return;
    box.hidden = !visible;
    // `hidden` alone can leave it focusable once a style sets `display`, so it is
    // disabled too — out of the tab order for certain.
    box.disabled = !visible;
  }

  function renderContent() {
    // Nothing is rendered before the data has loaded, and `open()` renders only after
    // `ensureData()` resolves; the guard is here because every handler on the panel
    // calls back into this, and a panel that arrived without data would otherwise
    // throw out of an event listener.
    const data = state.data;
    if (!data) return;
    const content = el(panel, ".bk-content");
    const meta = data.meta;
    const query = state.query.trim().toLowerCase();
    let count = 0;

    if (state.tab === "tables") {
      const tables = data.tables.filter(
        (t) => t.tier === undefined || t.tier.includes(state.tier),
      );
      content.innerHTML = tables.map(tableHtml).join("");
      // The filtered count, not every table in the booklet. A Foundation reader
      // was told "3 tables" and shown 2, because the list was tier-filtered and
      // the number was not.
      el(panel, ".bk-count").textContent =
        `${tables.length} ${meta.table_label || "tables"}`;
      // There is no search on this tab, so the box is hidden rather than left
      // visible and inert — typing in it did nothing and said nothing.
      setSearchVisible(false);
      return;
    }
    setSearchVisible(true);

    const html = data.sections
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
    el(panel, ".bk-count").textContent =
      `${count} ${meta.item_label || "formulae"}`;
  }

  // Labels and controls come from the booklet data, not from this file, so the
  // shared widget serves a mathematics booklet and a physics one without naming
  // either. Every override is optional: a data file that sets none behaves as
  // the widget always did.
  /** @param {BookletMeta} meta */
  function applyMeta(meta) {
    const title = meta.title || "Formulae and tables";
    panel.setAttribute("aria-label", title);
    if (meta.panel_title) el(panel, ".bk-title").textContent = meta.panel_title;
    if (meta.short) el(fab, ".bk-fab__label").textContent = meta.short;
    const tab = el(panel, '.bk-tab[data-tab="formulae"]');
    if (tab && meta.tab_label) tab.textContent = meta.tab_label;
    const search = /** @type {HTMLInputElement} */ (el(panel, ".bk-search"));
    if (search && meta.search_placeholder) search.placeholder = meta.search_placeholder;

    const boardIds = Object.keys(meta.boards || {});
    if (boardIds.length && !boardIds.includes(state.board)) {
      state.board =
        meta.default_board && boardIds.includes(meta.default_board)
          ? meta.default_board
          : boardIds[0];
    }

    const tierField = el(panel, ".bk-tier-field");
    if (tierField) tierField.hidden = meta.tiered === false;

    els(panel, ".bk-chip").forEach((chip) => {
      const name = chip.dataset.group;
      const group = name === undefined ? undefined : meta.groups[name];
      if (group && group.chip) chip.textContent = group.chip;
    });

    const series = el(panel, ".bk-series");
    if (series) {
      series.textContent = meta.series
        ? ` · ${meta.series}`
        : meta.year
          ? ` · exams in ${meta.year}`
          : "";
    }
  }

  function renderControls() {
    const data = state.data;
    if (!data) return;
    const meta = data.meta;
    applyMeta(meta);
    const boardSelect = /** @type {HTMLSelectElement} */ (el(panel, ".bk-board"));
    boardSelect.innerHTML = Object.entries(meta.boards)
      .map(
        ([id, board]) =>
          `<option value="${id}"${id === state.board ? " selected" : ""}>${esc(board.name)} (${esc(board.code)})</option>`,
      )
      .join("");

    const tierSelect = /** @type {HTMLSelectElement} */ (el(panel, ".bk-tier"));
    tierSelect.value = state.tier;

    els(panel, ".bk-chip").forEach((chip) => {
      chip.setAttribute(
        "aria-pressed",
        String(state.groups.includes(chip.dataset.group || "")),
      );
    });
    els(panel, ".bk-tab").forEach((tab) => {
      tab.setAttribute("aria-selected", String(tab.dataset.tab === state.tab));
    });
    el(panel, ".bk-provenance").textContent =
      meta.provenance[state.board] || meta.note || "";
  }

  function render() {
    renderControls();
    renderContent();
  }

  // ---------- panel behaviour ----------
  /**
   * The table a link asked for, from a `#booklet=<id>` fragment.
   *
   * A page that says "the standard normal table in the booklet" can then link to
   * the table itself rather than to the widget's button: the fragment opens the
   * panel, switches to the tables tab and brings that table into view.
   *
   * @returns {string|null} the table id, "" for the tables tab, or null for no request
   */
  function tableFromHash() {
    const match = location.hash.match(/^#booklet(?:=(.+))?$/);
    return match ? decodeURIComponent(match[1] || "") : null;
  }

  function open(tableId) {
    if (tableId !== undefined) state.tab = "tables";
    panel.hidden = false;
    state.open = true;
    fab.setAttribute("aria-expanded", "true");
    ensureData()
      .then(() => {
        render();
        if (tableId) {
          const target = document.getElementById(`bk-table-${tableId}`);
          if (target) target.scrollIntoView({ block: "start" });
        }
      })
      .catch((err) => {
        el(panel, ".bk-content").innerHTML =
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
    const api = window.documentPictureInPicture;
    if (!api) return;
    if (pipWindow) {
      pipWindow.close();
      return;
    }
    const rect = panel.getBoundingClientRect();
    const pip = await api.requestWindow({
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

  /** @param {HTMLElement} handle */
  function makeDraggable(handle) {
    handle.addEventListener("pointerdown", (event) => {
      const target = /** @type {Element | null} */ (event.target);
      if (!bigScreen() || target?.closest("button, input, select, a")) return;
      const r = panel.getBoundingClientRect();
      const start = { x: event.clientX, y: event.clientY, left: r.left, top: r.top };
      handle.setPointerCapture(event.pointerId);
      /** @param {PointerEvent} e */
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

  /**
   * @param {HTMLElement} handle
   * @returns {(width: number, height: number) => void}
   */
  function makeResizable(handle) {
    const MIN_W = 320;
    const MIN_H = 280;
    /**
     * @param {number} width
     * @param {number} height
     */
    const apply = (width, height) => {
      panel.style.width = `${Math.max(MIN_W, Math.min(width, innerWidth - panel.offsetLeft - 8))}px`;
      panel.style.height = `${Math.max(MIN_H, Math.min(height, innerHeight - panel.offsetTop - 8))}px`;
    };
    /** @type {{ x: number, y: number, width: number, height: number } | null} */
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
    el(panel, ".bk-close").addEventListener("click", close);
    el(panel, ".bk-popout").addEventListener("click", togglePopout);

    const boardSelect = /** @type {HTMLSelectElement} */ (el(panel, ".bk-board"));
    boardSelect.addEventListener("change", () => {
      state.board = boardSelect.value;
      saveState();
      render();
    });
    const tierSelect = /** @type {HTMLSelectElement} */ (el(panel, ".bk-tier"));
    tierSelect.addEventListener("change", () => {
      state.tier = tierSelect.value;
      saveState();
      render();
    });
    const search = /** @type {HTMLInputElement} */ (el(panel, ".bk-search"));
    search.addEventListener("input", () => {
      state.query = search.value;
      renderContent();
    });
    els(panel, ".bk-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const group = chip.dataset.group;
        if (!group) return;
        state.groups = state.groups.includes(group)
          ? state.groups.filter((g) => g !== group)
          : [...state.groups, group];
        saveState();
        renderContent();
        chip.setAttribute("aria-pressed", String(state.groups.includes(group)));
      });
    });
    els(panel, ".bk-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const name = tab.dataset.tab;
        if (!name) return;
        state.tab = name;
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

    makeDraggable(el(panel, ".bk-bar"));
    const resizeTo = makeResizable(el(panel, ".bk-resize"));
    el(panel, ".bk-resize").addEventListener("keydown", (event) => {
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
      el(panel, ".bk-popout").hidden = true;
    }

    if (state.open) open();
  }

  function init() {
    loadState();
    build();
    applyRect();
    const table = tableFromHash();
    if (table !== null) open(table);
    window.addEventListener("hashchange", () => {
      const requested = tableFromHash();
      if (requested !== null) open(requested);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
