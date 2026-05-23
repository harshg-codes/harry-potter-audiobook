const CACHE_NAME = 'hogwarts-audiobook-v1';
const ASSETS = [
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './assets/icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Only cache GET requests
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // Do not intercept or cache local audio/pdf files (since they are read via File objects and URLs generated locally)
  if (url.protocol === 'blob:' || url.pathname.includes('/blob:')) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).catch(() => {
        // Fallback for offline if fetching fails
        return null;
      });
    })
  );
});
