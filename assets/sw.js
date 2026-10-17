/* The service worker: installable, and readable offline after one visit.
 *
 * It is deliberately conservative, because the site relies on Workers'
 * `Cache-Control: public, max-age=0, must-revalidate` for a deploy to take
 * effect immediately. A worker that served cached HTML would destroy that: a
 * reader would keep a page from before the fix. So:
 *
 *   - navigations are network-first. Online, the network always wins and the
 *     page is fresh; the cache is only what answers when the network cannot.
 *   - static assets are cache-first, because their bytes do not change under a
 *     stable name and re-fetching them on every visit helps nobody.
 *   - the cache name carries the build label, which `textbook.portal` stamps
 *     into this file. Every deploy therefore ships a byte-different worker, the
 *     browser installs it, and `activate` deletes every older cache. That is the
 *     whole update path, and it is why a stale asset cannot outlive a deploy.
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

var VERSION = "__TB_BUILD__";
var PREFIX = "open-textbook-";
var CACHE = PREFIX + VERSION;

/* Precached on install, so the app opens on a page that is always there. Kept
 * deliberately tiny: a failed precache fails the whole install, so only the
 * front door and the manifest are here. Every other page is cached as it is
 * visited. */
var PRECACHE = ["/", "/manifest.webmanifest"];

/* The destinations that count as static assets, and are therefore cache-first. */
var STATIC_DESTINATIONS = {
  style: true,
  script: true,
  font: true,
  image: true,
};

function onInstall(event) {
  event.waitUntil(
    caches
      .open(CACHE)
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

self.addEventListener("install", onInstall);

function onActivate(event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return key.indexOf(PREFIX) === 0 && key !== CACHE;
            })
            .map(function (key) {
              return caches.delete(key);
            })
        );
      })
      .then(function () {
        // Control pages that are already open, so the first reload after an
        // install is served by this worker rather than the network alone.
        return scope.clients.claim();
      })
  );
}

self.addEventListener("activate", onActivate);

function remember(request, response) {
  // A failed cache write must never affect the response the reader gets.
  return caches.open(CACHE).then(function (cache) {
    return cache.put(request, response);
  });
}

/* The network decides; the cache is the fallback. Never the other way round. */
function networkFirst(request) {
  return fetch(request)
    .then(function (response) {
      if (response && response.ok && response.type === "basic") {
        remember(request, response.clone()).catch(function () {});
      }
      return response;
    })
    .catch(function () {
      return caches.match(request).then(function (cached) {
        if (cached) return cached;
        // A page that was never visited falls back to the front door, which
        // install precached, rather than to the browser's error page.
        if (request.mode === "navigate") return caches.match("/");
        return Response.error();
      });
    });
}

/* Assets do not change under a stable name, so the cache decides. */
function cacheFirst(request) {
  return caches.match(request).then(function (cached) {
    if (cached) return cached;
    return fetch(request).then(function (response) {
      if (response && response.ok && response.type === "basic") {
        remember(request, response.clone()).catch(function () {});
      }
      return response;
    });
  });
}

function onFetch(event) {
  var request = event.request;
  if (request.method !== "GET") return;

  var url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }
  if (STATIC_DESTINATIONS[request.destination]) {
    event.respondWith(cacheFirst(request));
    return;
  }
  event.respondWith(networkFirst(request));
}

self.addEventListener("fetch", onFetch);
