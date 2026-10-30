/* Keeps a copy of the Trestleboard on the phone so it opens with no internet.
   With signal, it checks for a newer version first (giving up after 3 seconds);
   without signal, it uses the saved copy. */
var CACHE = "trestleboard-v28-2026-10-30";
var FILES = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "fonts/atkinson-hyperlegible-next.woff2", "fonts/atkinson-hyperlegible-next-italic.woff2", "fonts/hanken-grotesk.woff2", "fonts/hanken-grotesk-italic.woff2"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return (k.indexOf("trestleboard-") === 0 && k !== CACHE) || k.indexOf("tbvoices-") === 0; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
function fromNetwork(req, ms) {
  return new Promise(function (resolve, reject) {
    var t = setTimeout(reject, ms);
    fetch(req).then(function (r) { clearTimeout(t); resolve(r); }, function (err) { clearTimeout(t); reject(err); });
  });
}
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === "navigate") {
    // the page itself: newest when online, saved copy when not
    e.respondWith(fromNetwork(req, 3000).then(function (r) {
      var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put("index.html", copy); });
      return r;
    }).catch(function () { return caches.match("index.html"); }));
    return;
  }
  e.respondWith(caches.match(req).then(function (hit) {
    return hit || fetch(req).then(function (r) {
      if (r.ok) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
      return r;
    });
  }));
});
