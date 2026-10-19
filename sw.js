self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('qr-app-v1').then((cache) => {
    return cache.addAll(['/APP-QR-FANB/', '/APP-QR-FANB/index.html', '/APP-QR-FANB/style.css', '/APP-QR-FANB/app.js']);
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
