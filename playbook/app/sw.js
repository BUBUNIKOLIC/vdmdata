/* Funziona senza internet (2 ottobre 2026).
 * Al primo avvio si tiene da parte il programma intero; dalle volte dopo
 * parte da li', anche in palestra dove il telefono non prende.
 * Il numero qui sotto va cambiato a ogni versione nuova: e' l'unica cosa
 * che dice al telefono di riprendersi i file aggiornati. */
var VERSIONE = 'vdm-playbook-11';
var ROBA = ['./', 'index.html', 'ponte-web.js',
  'prova-web.js', 'edizione-playbook.js', 'importa-statistiche.js',
            'vdm-motore.js', 'mp4-muxer.js', 'playbook.webmanifest',
            'icona-192.png', 'icona-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSIONE).then(function (c) { return c.addAll(ROBA); })
    .then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (nomi) {
    return Promise.all(nomi.map(function (n) { return n === VERSIONE ? null : caches.delete(n); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function (dalla) {
      if (dalla) {
        /* c'e' gia': lo diamo subito e intanto controlliamo se e' cambiato */
        fetch(e.request).then(function (r) {
          if (r && r.ok) caches.open(VERSIONE).then(function (c) { c.put(e.request, r); });
        }).catch(function () {});
        return dalla;
      }
      return fetch(e.request).then(function (r) {
        if (r && r.ok && e.request.url.indexOf(self.location.origin) === 0) {
          var copia = r.clone();
          caches.open(VERSIONE).then(function (c) { c.put(e.request, copia); });
        }
        return r;
      });
    })
  );
});
