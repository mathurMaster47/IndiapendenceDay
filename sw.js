const CACHE_NAME = 'indiapendenceday';
const ASSETS = ['./index.html', './manifest.json', './favicon.jpeg'];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request)
            .then((response) => {
                // First update cache with fresh network response
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(e.request, responseClone);
                });
                return response;
            })
            .catch(() => {
                // If offline / non-internet, use cache version
                return caches.match(e.request);
            })
    );
});
