"use strict";

/* `self` in a worker is a `ServiceWorkerGlobalScope`, not a `Window`: it has
 * `skipWaiting()` and `clients`, and none of the page's DOM. `lib.dom` knows only the
 * page, so the type is stated at the one place it is needed — through `unknown`,
 * because the two scopes do not overlap enough for a direct cast. Nothing changes at
 * runtime: `scope` is `self`. */
var scope = /** @type {ServiceWorkerScope} */ (/** @type {unknown} */ (self));

var PREFIX = "open-textbook-";
var VERSION = "__TB_BUILD__";

var RUNTIME = PREFIX + "runtime-" + VERSION;

var SITE = PREFIX + "site";

var ADDRESSED = /\.[0-9a-f]{8}\.(?:css|js|svg|png|jpe?g|webp|wasm)$/;

var MAX_AGE = 180 * 24 * 60 * 60 * 1000;

var PRECACHE = ["/", "/manifest.webmanifest"];

/** @type {Record<string, boolean>} */
var STATIC_DESTINATIONS = {
  style: true,
  script: true,
  font: true,
  image: true,
};

/** @param {WorkerEvent} event  the platform's `ExtendableEvent`; see assets/globals.d.ts */
function onInstall(event) {
  event.waitUntil(
    caches
      .open(SITE)
      .then(function (cache) {
        return cache.addAll(PRECACHE);
      })
      .then(function () {
        return scope.skipWaiting();
      })
  );
}

self.addEventListener("install", /** @type {EventListener} */ (onInstall));

/**
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
              var sent = cached && cached.headers.get("date");
              if (!sent) return undefined;
              var at = Date.parse(sent);
              if (!isNaN(at) && at < cutoff) return cache.delete(request);
              return undefined;
            });
          })
        ).then(function () {
        });
      });
    });
  });
}

/** @param {WorkerEvent} event  the platform's `ExtendableEvent`; see assets/globals.d.ts */
function onActivate(event) {
  event.waitUntil(
    prune().then(function () {
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
  return cache.put(request, response);
}

/**
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

  if (request.mode === "navigate" || url.pathname.endsWith("/")) {
    event.respondWith(networkFirst(request, SITE));
    return;
  }
  if (ADDRESSED.test(url.pathname)) {
    event.respondWith(cacheFirst(request, SITE));
    return;
  }
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
