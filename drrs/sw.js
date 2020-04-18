var cacheName = 'hello-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/nav.css',
  '/Mumbai_Topojson.topojson',
  '/input_file_v1_dashboard.csv',
  '/Facilities_in_Mumbai_COVID_19_Cases.csv',
  '/DRRS_Logo.jpg',
  '/app.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});