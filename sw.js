/* Kadans — service worker : garde l'app disponible sans connexion. */
const CACHE = 'kadans-v43';
const SHELL = ['./', './index.html', './app.css', './app.js', './manifest.webmanifest', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png', './jsqr.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Les appels au PC (API, fichiers) ne passent jamais par le cache.
  if (e.request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.includes('/api/')) return;
  // Réseau d'abord (pour avoir la dernière version), cache si hors ligne.
  e.respondWith(
    fetch(e.request).then((res) => {
      if (!res.ok) throw new Error('réponse ' + res.status);   // PC éteint : la page d'erreur ne doit pas remplacer l'app
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('./index.html')))
  );
});
