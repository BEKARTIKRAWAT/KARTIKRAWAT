const CACHE_NAME = 'kartikrawat-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/skills.html',
  '/projects.html',
  '/contact.html',
  '/css/style.css',
  '/css/chat.css',
  '/js/main.js',
  '/js/chat.js',
  '/js/theme.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});