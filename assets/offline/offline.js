/* Keep the chapter the reader is in, so losing the signal costs them nothing.
 *
 * The site already reads offline: a page that has been visited is in the service
 * worker's cache. What it does not do is keep the *rest of the chapter* — a reader on
 * a train reads one section, taps "Next", and gets the front door. So this fetches
 * the chapter's other pages while the reader is still reading, and the figure module
 * each one mounts.
 *
 * Three rules, and each is a decision rather than a default:
 *
 *   - **Nothing is fetched until the page has settled.** `requestIdleCallback`, with a
 *     timer for the browsers that do not have it. Reading never waits for this.
 *   - **A metered or slow connection is left alone.** `saveData` and an `effectiveType`
 *     of 2g or 3g mean the reader has told us, or the network has, and a prefetch is
 *     not worth someone's data. This is also why it is only ever *one chapter*: the
 *     whole book is a choice the reader makes, with a size beside it.
 *   - **It is idempotent.** Every page is fetched through the service worker, which
 *     answers a page from its cache when the network cannot — and the fetch is cheap
 *     when the bytes are already there.
 *
 * The page list is the sidebar's own open chapter. The nav already holds every link
 * this book has, with the current chapter expanded, so the list needs no second
 * source of truth and no request to compute: the markup the reader can see is the
 * list.
 *
 * With JavaScript off none of this runs, and nothing else changes.
 */
(function () {
  "use strict";

  if (!("serviceWorker" in navigator) || !("caches" in window)) return;
  if (!("fetch" in window)) return;

  /* How many pages one chapter's prefetch may fetch. A chapter is 8–20 sections with
     three pages each; the cap keeps a malformed or enormous nav from spending
     someone's whole allowance, and the reader still gets the chapter they are in. */
  var LIMIT = 48;

  // `connection` is the Network Information API: in Chrome and Android browsers, and
  // absent everywhere else, which is why it is read defensively and why its absence
  // means "prefetch" rather than "do not".
  var connection = /** @type {{ saveData?: boolean, effectiveType?: string }} */ (
    /** @type {unknown} */ (/** @type {any} */ (navigator).connection)
  );
  if (connection) {
    if (connection.saveData) return;
    // `slow-2g`, `2g`, `3g`: a prefetch is a luxury on any of them.
    if (/^(slow-2g|2g|3g)$/.test(connection.effectiveType || "")) return;
  }

  /* Where this book's figure modules live, resolved from **this** script's own URL,
   * and read here rather than later: `document.currentScript` is null by the time an
   * idle callback runs, and a deferred script is exactly the case that gets it wrong.
   * A fetched page names its modules by bare filename — they sit beside the loader —
   * so one directory resolves them all. Taken from this script rather than from the
   * figure loader, because a page with no figure carries no loader, and that is
   * precisely the page whose neighbours may have figures.
   */
  /** @type {string | null} */
  var FIGURES = null;
  var SELF = /** @type {HTMLScriptElement | null} */ (document.currentScript);
  if (SELF && SELF.src) FIGURES = new URL("../figures/", SELF.src).href;

  /** The chapter the nav has open, as same-origin page URLs. */
  function chapterPages() {
    var nav = document.querySelector("nav.sidebar");
    if (!nav) return [];
    // The current chapter is the one the nav opened. Falls back to the whole nav on a
    // page that is not inside a chapter (the cover), which is capped anyway.
    var open = nav.querySelector("details[open]") || nav;
    var here = location.href.split("#")[0];
    var seen = Object.create(null);
    var urls = [];
    var links = open.querySelectorAll("a[href]");
    for (var i = 0; i < links.length && urls.length < LIMIT; i++) {
      var url = /** @type {HTMLAnchorElement} */ (links[i]).href.split("#")[0];
      // A page, not a file: every route here is a directory.
      if (!/\/$/.test(url)) continue;
      if (url === here || seen[url]) continue;
      if (new URL(url).origin !== location.origin) continue;
      seen[url] = true;
      urls.push(url);
    }
    return urls;
  }

  /**
   * The figure modules a fetched page mounts, so the page is not cached alone.
   *
   * @param {string} html
   * @returns {string[]}
   */
  function figureFiles(html) {
    var found = [];
    var pattern = /data-figure-src="([^"]+\.js)"/g;
    var match;
    while ((match = pattern.exec(html)) !== null) found.push(match[1]);
    return found;
  }

  /**
   * Fetch one page and the modules it needs. Resolves either way: this is a courtesy.
   *
   * @param {string} url
   * @param {string | null} base
   * @returns {Promise<void>}
   */
  function keep(url, base) {
    return fetch(url, { credentials: "same-origin" })
      .then(function (response) {
        return response.ok ? response.text() : "";
      })
      .then(function (html) {
        var files = figureFiles(html);
        if (!base) return Promise.resolve();
        return Promise.all(
          files.map(function (/** @type {string} */ file) {
            return fetch(base + file, { credentials: "same-origin" }).catch(function () {});
          })
        ).then(function () {
          // The module fetches are best-effort; what `keep` promises is the page.
        });
      })
      .catch(function () {
        // Offline already, or a page that moved: the reader is unaffected.
      });
  }

  /**
   * One at a time, so a prefetch cannot saturate the connection the reader is using.
   *
   * @param {string[]} urls
   */
  function queue(urls) {
    var next = urls.shift();
    if (!next) return;
    keep(next, FIGURES).then(function () {
      queue(urls);
    });
  }

  function start() {
    var urls = chapterPages();
    if (urls.length) queue(urls);
  }

  if ("requestIdleCallback" in window) {
    requestIdleCallback(start, { timeout: 4000 });
  } else {
    setTimeout(start, 1500);
  }

  /* --- the whole book, when the reader asks for it -------------------------- */
  //
  /* The chapter above is a courtesy nobody has to think about. The whole book is a
   * decision: 39 MB for the largest, and a device that may not have room. So it is a
   * button, it says the size before it is pressed, it asks the browser for persistent
   * storage, it can be stopped, and it refuses to start when the device cannot hold
   * it. Nothing here runs unless the reader opens Settings.
   *
   * The list is the build's own `assets/manifest.json`: every page it wrote and the
   * bytes each one is. That is why the size shown is the measured one — the build
   * counted what it wrote, not an estimate made here. */

  /** The Settings panel, the button, and the progress bar. */
  var dialog = /** @type {HTMLDialogElement | null} */ (document.getElementById("tb-settings-dialog"));
  var group = /** @type {HTMLElement | null} */ (document.getElementById("tb-offline"));
  var button = /** @type {HTMLButtonElement | null} */ (document.getElementById("tb-offline-download"));
  var cancel = /** @type {HTMLButtonElement | null} */ (document.getElementById("tb-offline-cancel"));
  var progress = /** @type {HTMLProgressElement | null} */ (document.getElementById("tb-offline-progress"));
  var status = /** @type {HTMLElement | null} */ (document.getElementById("tb-offline-status"));
  var trigger = /** @type {HTMLElement | null} */ (document.getElementById("tb-settings"));

  /** Where this book's manifest is, from this script's own URL. */
  /** @type {string | null} */
  var MANIFEST = null;
  if (SELF && SELF.src) MANIFEST = new URL("../manifest.json", SELF.src).href;

  /* The root of this book, so a manifest route becomes a URL. One level, not two:
   * the manifest sits in `assets/`, and a route such as `/chapter-1/` is published
   * one directory above it. Two levels up lands on the *book* rather than the
   * profile, which was a download of 404s that reported success. */
  /** @type {string | null} */
  var BOOK_ROOT = null;
  if (MANIFEST) BOOK_ROOT = new URL("../", MANIFEST).href;

  var KEY = "textbooks:offline:" + (group ? group.dataset.offlineBook || "" : "");

  /** @type {{build: string, pages: Record<string, number>, bytes: number} | null} */
  var manifest = null;

  /** @param {number} bytes */
  function megabytes(bytes) {
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  /** @param {string} text */
  function say(text) {
    if (status) status.textContent = text;
  }

  /** Read the manifest once, and put the measured size in the button. */
  function load() {
    if (!MANIFEST || manifest) return Promise.resolve(manifest);
    return fetch(MANIFEST, { credentials: "same-origin" })
      .then(function (response) {
        return response.ok ? response.json() : null;
      })
      .then(function (data) {
        if (!data || !data.pages) return null;
        manifest = data;
        if (button) {
          button.textContent = "Download this book (" + megabytes(data.bytes) + ")";
          button.hidden = false;
        }
        var saved = null;
        try {
          saved = localStorage.getItem(KEY);
        } catch (error) {
          // Private mode, or storage disabled: the button still works, the note
          // about what is already stored is simply absent.
        }
        if (saved === data.build) say("This book is already stored on this device.");
        return data;
      })
      .catch(function () {
        return null;
      });
  }

  /**
   * One page and the figure module it mounts.
   *
   * @param {string} url
   * @param {AbortSignal} signal
   * @returns {Promise<void>}
   */
  function save(url, signal) {
    return fetch(url, { credentials: "same-origin", signal: signal })
      .then(function (response) {
        if (!response.ok) throw new Error(url + " answered " + response.status);
        return response.text();
      })
      .then(function (html) {
        var files = figureFiles(html);
        if (!FIGURES) return Promise.resolve();
        return Promise.all(
          files.map(function (/** @type {string} */ file) {
            return fetch(FIGURES + file, { credentials: "same-origin", signal: signal }).catch(
              function () {}
            );
          })
        ).then(function () {
          // The module fetches are best-effort; what `save` promises is the page.
        });
      });
  }

  /**
   * @param {AbortController} controller
   * @returns {Promise<void>}
   */
  function download(controller) {
    if (!manifest || !BOOK_ROOT) return Promise.resolve();
    var plan = manifest;
    var routes = Object.keys(plan.pages);
    var failures = 0;
    var done = 0;
    if (progress) {
      progress.hidden = false;
      progress.max = routes.length;
      progress.value = 0;
    }
    if (button) button.hidden = true;
    if (cancel) cancel.hidden = false;

    /**
     * One at a time, so the reader's own reading is never starved.
     *
     * @returns {Promise<void>}
     */
    function next() {
      var route = routes.shift();
      if (!route) return Promise.resolve();
      var url = BOOK_ROOT + route.slice(1);
      return save(url, controller.signal)
        .then(function () {
          done += 1;
          if (progress) progress.value = done;
          return next();
        })
        .catch(function (error) {
          // A stop, or a lost connection: what is stored stays stored, and the
          // reader is told rather than left watching a bar that never moves.
          if (controller.signal.aborted) return;
          failures += 1;
          console.warn("offline download:", error);
          return next();
        });
    }

    return next().then(function () {
      if (progress) progress.hidden = true;
      if (cancel) cancel.hidden = true;
      if (button) button.hidden = false;
      if (controller.signal.aborted) {
        say("Stopped. Nothing else was downloaded.");
        return;
      }
      if (failures) {
        say(
          failures +
            " of " +
            Object.keys(plan.pages).length +
            " pages did not arrive. Press Download to try again."
        );
        return;
      }
      try {
        localStorage.setItem(KEY, plan.build);
      } catch (error) {
        /* private mode: the book is still stored, only the note is lost */
      }
      say("Saved. You can read this book without a connection.");
    });
  }

  /** @type {AbortController | null} */
  var running = null;

  function wire() {
    if (!dialog || !group || !button) return;
    var panel = dialog;
    var start = button;
    // The size appears when the reader opens the panel, not on every page: one
    // request, at the moment they are deciding.
    panel.addEventListener("toggle", function () {
      if (panel.open) load();
    });
    if (trigger) trigger.addEventListener("click", load);

    start.addEventListener("click", function () {
      if (!manifest) return;
      var plan = manifest;
      var room = plan.bytes * 1.2;
      var ready = navigator.storage
        ? navigator.storage.estimate()
        : Promise.resolve(null);
      ready
        .then(function (/** @type {{quota?: number, usage?: number} | null} */ estimate) {
          if (estimate && estimate.quota && estimate.quota - (estimate.usage || 0) < room) {
            say(
              "This device does not have room for this book. It needs about " +
                megabytes(plan.bytes) + "."
            );
            return;
          }
          // Persistent storage is a request, not a guarantee; a refusal changes
          // nothing about the download.
          var asked = navigator.storage
            ? navigator.storage.persist()
            : Promise.resolve(false);
          return asked.then(function () {
            running = new AbortController();
            say("Downloading this book…");
            return download(running);
          });
        })
        .catch(function () {
          say("This browser would not start the download.");
        });
    });

    if (cancel) {
      cancel.addEventListener("click", function () {
        if (running) running.abort();
        if (progress) progress.hidden = true;
        if (cancel) cancel.hidden = true;
        if (button) button.hidden = false;
        say("Stopped. Nothing else was downloaded.");
      });
    }
  }

  wire();
})();
