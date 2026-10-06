// Service worker sencillo (R-10.2): páginas con red primero; recursos estáticos con caché primero.
// No guarda nada de lo que la persona escribe: solo archivos del sitio.
const CACHE = 'tsf-v1';
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) =>
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()))
);
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const u = new URL(req.url);
  if (req.method !== 'GET' || u.origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((r) => { const c = r.clone(); caches.open(CACHE).then((k) => k.put(req, c)); return r; })
        .catch(() => caches.match(req).then((r) => r || caches.match(new URL('./', self.registration.scope))))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((r) => {
      if (r.ok) { const c = r.clone(); caches.open(CACHE).then((k) => k.put(req, c)); }
      return r;
    }))
  );
});
