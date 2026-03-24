const CACHE_NAME = 'astro-calc-v1';
const urlsToCache = [
    '/astro-calc/',
    '/astro-calc/index.html',
    '/astro-calc/css/style.css',
    '/astro-calc/js/core/calculator.js',
    '/astro-calc/js/core/western.js',
    '/astro-calc/js/core/bazi.js',
    '/astro-calc/js/core/jawa.js',
    '/astro-calc/js/data/ephemeris.js',
    '/astro-calc/js/data/stems-branches.js',
    '/astro-calc/js/data/weton-data.js',
    '/astro-calc/js/app.js',
    '/astro-calc/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
