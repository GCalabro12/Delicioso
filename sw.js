/* DELICIOSO — Service Worker
   Estrategia: primero la red (así siempre se carga la última versión subida a GitHub),
   y si no hay conexión, la copia guardada. Cambiar CACHE al publicar no es necesario. */
const CACHE = 'delicioso-v2';
const BASICOS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(c => c.addAll(BASICOS).catch(() => {})).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // Airtable, Notion Worker, YouTube: sin tocar

  event.respondWith(
    fetch(req, { cache: 'no-store' })
      .then(res => {
        if (res && res.ok) {
          const copia = res.clone();
          caches.open(CACHE).then(c => c.put(req, copia));
        }
        return res;
      })
      .catch(() => caches.match(req).then(r => {
        if (r) return r;
        // sin red: la tienda de clientes nunca debe caer en la app de gestión
        if (url.pathname.endsWith('/pedido.html')) return new Response('<h2 style="font-family:sans-serif;text-align:center;margin-top:40px">Sin conexi\u00f3n. Pide directamente en el stand.</h2>', {headers:{'Content-Type':'text/html; charset=utf-8'}});
        return caches.match('./index.html');
      }))
  );
});
