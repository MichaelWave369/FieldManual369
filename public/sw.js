/* Offline-first shell cache. No cross-origin requests or user inputs cached. */
const CACHE_NAME = 'fieldmanual369-shell-v1';
const PREFIX = 'fieldmanual369-shell-';
const HOME = self.registration.scope;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const response = await fetch(HOME, {cache:'reload'});
    if (!response.ok) throw new Error('Could not cache offline app shell');
    const html = await response.clone().text();
    const matches = [...html.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)];
    const assets = [...new Set(matches.map(item => new URL(item[1], HOME).href))];
    const cache = await caches.open(CACHE_NAME);
    await cache.put(HOME, response);
    await cache.addAll(assets);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(HOME)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    if (request.mode === 'navigate') {
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(HOME, response.clone());
        return response;
      } catch {
        return (await cache.match(HOME)) || Response.error();
      }
    }
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch {
      return Response.error();
    }
  })());
});
