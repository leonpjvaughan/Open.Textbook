/* The service worker: installable, readable offline, and a deploy still immediate.
 *
 * The site relies on Workers' `Cache-Control: public, max-age=0, must-revalidate` for
 * a deploy to take effect at once. A worker that served cached HTML would destroy
 * that: a reader would keep a page from before the fix. So navigations are
 * network-first — online, the network always wins and the page is fresh; the cache
 * answers only when the network cannot.
 *
 * **Two caches, because two kinds of URL.** Every asset a page links is
 * content-addressed (`themes.10b6507e.css`, `ch10-nth-term.422b3c46.js`), so its name
 * is its bytes: a changed file has a new URL and a cached copy can never be stale.
 * Those — and the pages — live in a cache that no deploy deletes, which is what lets
 * a reader who downloaded a book keep it. The handful of names that *cannot* be
 * addressed (the figure loader, the kit, the worker itself, the two icons, the
 * booklet data) live in a cache named for the build, which `activate` deletes; they
 * are the only files whose bytes can change under a stable name.
 *
 *   - addressed asset, or a page       -> `open-textbook-site`     kept across deploys
 *   - anything with a stable name      -> `open-textbook-runtime-<build>`  deleted on activate
 *
 * The site cache is not unbounded: an entry carries the `Date` the server sent, and
 * `activate` drops anything older than `MAX_AGE`. A book a reader has not opened in
 * six months is a book they are not revising from.
 *
 * With JavaScript off nothing here runs, which is fine: the prose and the
 * mathematics are in the HTML, because the maths is rendered to MathML at build
 * time. Offline reading is an enhancement, never a dependency.
 *
 * `__TB_BUILD__` is replaced with the build label by `python -m textbook.portal`
 * (see DEPLOY.md, "Installable and offline").
 */
"use strict";

/* `self` in a worker is a `ServiceWorkerGlobalScope`, not a `Window`: it has
 * `skipWaiting()` and `clients`, and none of the page's DOM. `lib.dom` knows only the
 * page, so the type is stated at the one place it is needed — through `unknown`,
 * because the two scopes do not overlap enough for a direct cast. Nothing changes at
 * runtime: `scope` is `self`. */
var scope = /** @type {ServiceWorkerScope} */ (/** @type {unknown} */ (self));

var PREFIX = "open-textbook-";
var VERSION = "__TB_BUILD__";

/* Deleted on activate. Named for the build, because a stable-named file can change
 * its bytes without changing its URL. */
var RUNTIME = PREFIX + "runtime-" + VERSION;

/* Never deleted on activate. Holds pages and every content-addressed asset, and it
 * is the whole point of the split: `activate` must not take away what a reader
 * downloaded. */
var SITE = PREFIX + "site";

/* The names `scaffold.addressed_name` writes: `<stem>.<8 hex digits>.<extension>`.
 * `tests/test_pwa.py` checks this pattern against what the build actually writes, so
 * a change to the naming rule that is not made here is a test failure rather than a
 * cache that quietly goes stale. */
var ADDRESSED = /\.[0-9a-f]{8}\.(?:css|js|svg|png|jpe?g|webp|wasm)$/;

/* Old enough that a reader has stopped coming back. Six months, in milliseconds. */
var MAX_AGE = 180 * 24 * 60 * 60 * 1000;

/* Precached on install, so the app opens on a page that is always there. Kept
 * deliberately tiny: a failed precache fails the whole install, so only the
 * front door and the manifest are here. Every other page is cached as it is
 * visited. */
var PRECACHE = ["/", "/manifest.webmanifest"];

/* The destinations that count as static assets. They are cache-first, but only
 * inside the runtime cache, because a name in this set that is not addressed is a
 * name whose bytes can change. */
/** @type {Record<string, boolean>} */
var STATIC_DESTINATIONS = {
  style: true,
  script: true,
  font: true,
  image: true,
};

/* The event handlers. `self.addEventListener` is typed for the page, where neither
 * `install` nor `fetch` is in the event map, so each event arrives as a plain `Event`
 * and is named for what the platform dispatches. See `assets/globals.d.ts`. */

/** @param {WorkerEvent} event  the platform's `ExtendableEvent`; see assets/globals.d.ts */
function onInstall(event) {
  event.waitUntil(
    caches
      .open(SITE)
      .then(function (cache) {
        return cache.addAll(PRECACHE);
      })
      .then(function () {
        // Take over as soon as the new worker is ready rather than waiting for
        // every tab to close, so an update reaches the reader on the next visit.
        return scope.skipWaiting();
      })
  );
}

self.addEventListener("install", /** @type {EventListener} */ (onInstall));

/**
 * Drop what a deploy made obsolete, and nothing a reader is still reading.
 *
 * Two rules, one for each cache family: every runtime cache but this build's goes,
 * and the site cache loses only entries the server dated more than `MAX_AGE` ago.
 *
 * @returns {Promise<void>}
 */
function prune() {
  return caches.keys().then(function (keys) {
    return Promise.all(
      keys
        .filter(function (key) {
          return key.indexOf(PREFIX) === 0 && key !== SITE && key !== RUNTIME;
        })
        .map(function (key) {
          return caches.delete(key);
        })
    );
  }).then(function () {
    return caches.open(SITE).then(function (cache) {
      var cutoff = Date.now() - MAX_AGE;
      return cache.keys().then(function (requests) {
        return Promise.all(
          requests.map(function (request) {
            return cache.match(request).then(function (cached) {
              // No `Date` means the server did not say when; keeping it is the
              // conservative choice, and a body without a date is a defect
              // somewhere else.
              var sent = cached && cached.headers.get("date");
              if (!sent) return undefined;
              var at = Date.parse(sent);
              if (!isNaN(at) && at < cutoff) return cache.delete(request);
              return undefined;
            });
          })
        ).then(function () {
          // `Promise.all` resolves with the array of per-entry results; `prune` gives
          // its caller nothing back, and the type should say so.
        });
      });
    });
  });
}

/** @param {WorkerEvent} event  the platform's `ExtendableEvent`; see assets/globals.d.ts */
function onActivate(event) {
  event.waitUntil(
    prune().then(function () {
      // Control pages that are already open, so the first reload after an
      // install is served by this worker rather than the network alone.
      return scope.clients.claim();
    })
  );
}

self.addEventListener("activate", /** @type {EventListener} */ (onActivate));

/**
 * @param {Cache} cache
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<void>}
 */
function remember(cache, request, response) {
  // A failed cache write must never affect the response the reader gets.
  return cache.put(request, response);
}

/**
 * The network decides; the cache of that name is the fallback. Never the other way
 * round.
 *
 * The fallback for a navigation is the front door, which `install` precached. If that
 * has been evicted too, there is no response to give: `respondWith` rejects on
 * anything that is not a `Response`, and an `undefined` here would turn a missing
 * cache entry into a failed navigation rather than the browser's own error page. So
 * the fallback falls back, rather than passing the hole on.
 *
 * @param {Request} request
 * @param {string} name
 * @returns {Promise<Response>}
 */
function networkFirst(request, name) {
  return caches.open(name).then(function (cache) {
    return fetch(request)
      .then(function (response) {
        if (response && response.ok && response.type === "basic") {
          remember(cache, request, response.clone()).catch(function () {});
        }
        return response;
      })
      .catch(function () {
        return cache.match(request).then(function (cached) {
          if (cached) return cached;
          // A page that was never visited this build falls back to the front door,
          // whichever cache still holds it, rather than to the browser's error page.
          if (request.mode === "navigate") {
            return caches.match("/").then(function (home) {
              return home || Response.error();
            });
          }
          return caches.match(request).then(function (any) {
            return any || Response.error();
          });
        });
      });
  });
}

/**
 * A content-addressed name cannot go stale, so the cache decides and the network is
 * never asked again.
 *
 * @param {Request} request
 * @param {string} name
 * @returns {Promise<Response>}
 */
function cacheFirst(request, name) {
  return caches.open(name).then(function (cache) {
    return cache.match(request).then(function (cached) {
      if (cached) return cached;
      return fetch(request).then(function (response) {
        if (response && response.ok && response.type === "basic") {
          remember(cache, request, response.clone()).catch(function () {});
        }
        return response;
      });
    });
  });
}

/** @param {WorkerFetchEvent} event  the platform's `FetchEvent` */
function onFetch(event) {
  var request = event.request;
  if (request.method !== "GET") return;

  var url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // A page is a page whether the reader navigated to it or the reader's own browser
  // fetched it to keep a chapter: every route in this site is a directory, so a path
  // ending in `/` is a page and belongs in the cache a deploy keeps. Without this,
  // prefetched chapters would land in `fetch()`'s default destination and be thrown
  // away on the next deploy — the one thing the split exists to prevent.
  if (request.mode === "navigate" || url.pathname.endsWith("/")) {
    event.respondWith(networkFirst(request, SITE));
    return;
  }
  // The name is the bytes, so this one can be answered from the cache for as long
  // as the URL exists — which is what lets a downloaded book keep working.
  if (ADDRESSED.test(url.pathname)) {
    event.respondWith(cacheFirst(request, SITE));
    return;
  }
  // Pagefind's payload keeps its own names: the page imports `pagefind/pagefind.js`
  // by name and the index is fetched by that code with relative URLs, so nothing
  // here can rename it. Revalidated instead, because a stale script beside a fresh
  // index is a search that ranks pages that no longer exist — and because the index
  // is 2–3 MB per book, which is not something to hold until the next deploy.
  if (url.pathname.indexOf("/pagefind/") !== -1) {
    event.respondWith(networkFirst(request, RUNTIME));
    return;
  }
  if (STATIC_DESTINATIONS[request.destination]) {
    event.respondWith(cacheFirst(request, RUNTIME));
    return;
  }
  event.respondWith(networkFirst(request, RUNTIME));
}

self.addEventListener("fetch", /** @type {EventListener} */ (onFetch));
