/* INTERRUTTORE DI SPEGNIMENTO (2 ottobre 2026).
 *
 * Per due ore, stamattina, /playbook/ era il programma, e chi l'ha aperto si
 * e' portato a casa un service worker con scopo /playbook/ che tiene la
 * pagina in cache. Adesso li' c'e' la pagina di presentazione, ma quei
 * browser continuerebbero a mostrare la vecchia copia: il service worker
 * risponde prima che la richiesta arrivi al sito.
 *
 * Questo file prende il posto di quello vecchio: si cancella da solo,
 * svuota le cache e ricarica le pagine aperte. Dopo non serve piu' a
 * niente, ma costa 400 byte e va lasciato: non si sa chi passa di qui fra
 * sei mesi con il browser di allora.
 *
 * Il service worker del programma adesso sta in /playbook/app/sw.js, e il
 * suo scopo e' /playbook/app/: li' dentro, e solo li'.
 */
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (nomi) { return Promise.all(nomi.map(function (n) { return caches.delete(n); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: 'window' }); })
      .then(function (finestre) { finestre.forEach(function (f) { f.navigate(f.url); }); })
      .catch(function () {})
  );
});
