/* IL LAVORO NON STA PIU' NELLA MEMORIA DELLA PAGINA (2 ottobre 2026).
 *
 * Nell'app per iPad il lavoro salvato finisce in un file, perche' la memoria
 * della pagina tiene pochi MB e con i giochi animati — che si portano dentro
 * le immagini delle fasi — si riempie e il salvataggio salta. Nel browser
 * quel file non c'e'.
 *
 * Qui si fa la stessa cosa con IndexedDB, che non ha il limite dei pochi MB
 * ma quello del disco: ogni salvataggio viene specchiato li', e all'avvio
 * viene ripreso da li' se la memoria della pagina l'ha perso o non ce la fa.
 *
 * Lo schema e' identico a quello del guscio iPad, cosi' chi legge i due
 * pezzi riconosce la stessa idea. Niente di quello che c'era prima viene
 * tolto: se la memoria della pagina basta, continua a funzionare com'e'.
 */
(function () {
  'use strict';

  var CHIAVE = 'vbc_autosave_snapshot_v1';
  var DB = 'vdm-playbook-lavoro';
  var MAGAZZINO = 'lavoro';

  /* se siamo dentro l'app per iPad il ponte ce l'ha gia' lei: non ci mettiamo
     in mezzo, se no il lavoro viene scritto due volte */
  try {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.vdmFile) return;
  } catch (e) {}

  if (!window.indexedDB) return;

  function apri() {
    return new Promise(function (ok, no) {
      var r;
      try { r = indexedDB.open(DB, 1); } catch (e) { no(e); return; }
      r.onupgradeneeded = function () {
        try { r.result.createObjectStore(MAGAZZINO); } catch (e) {}
      };
      r.onsuccess = function () { ok(r.result); };
      r.onerror = function () { no(r.error); };
    });
  }

  function scrivi(testo) {
    return apri().then(function (db) {
      return new Promise(function (ok, no) {
        var t = db.transaction(MAGAZZINO, 'readwrite');
        t.objectStore(MAGAZZINO).put(testo, CHIAVE);
        t.oncomplete = function () { db.close(); ok(); };
        t.onerror = function () { db.close(); no(t.error); };
      });
    });
  }

  function leggi() {
    return apri().then(function (db) {
      return new Promise(function (ok, no) {
        var t = db.transaction(MAGAZZINO, 'readonly');
        var q = t.objectStore(MAGAZZINO).get(CHIAVE);
        q.onsuccess = function () { db.close(); ok(q.result || null); };
        q.onerror = function () { db.close(); no(q.error); };
      });
    });
  }

  /* 1. OGNI SALVATAGGIO VA ANCHE SU INDEXEDDB.
   *    Si aggancia allo stesso punto del guscio iPad: la scrittura nella
   *    memoria della pagina. Se quella e' piena l'errore si ignora, perche'
   *    ormai il lavoro e' al sicuro dall'altra parte. */
  var scriviOriginale = Storage.prototype.setItem;
  Storage.prototype.setItem = function (chiave, valore) {
    if (chiave === CHIAVE) {
      try { scrivi(String(valore)); } catch (e) {}
      try { return scriviOriginale.call(this, chiave, valore); } catch (e) { return; }
    }
    return scriviOriginale.call(this, chiave, valore);
  };

  /* 2. ALL'AVVIO: se su IndexedDB c'e' un lavoro piu' completo di quello
   *    rimasto nella memoria della pagina, si rimette al suo posto PRIMA
   *    che il programma lo vada a cercare. */
  var atteso = leggi().then(function (dalDisco) {
    if (!dalDisco) return;
    var inPagina = null;
    try { inPagina = localStorage.getItem(CHIAVE); } catch (e) {}
    if (inPagina && inPagina.length >= dalDisco.length) return;
    try { scriviOriginale.call(localStorage, CHIAVE, dalDisco); } catch (e) {}
    /* se non ci sta nella memoria della pagina, lo passiamo come fa l'iPad */
    try { window.VDM_LAVORO = dalDisco; } catch (e) {}
  }).catch(function () {});

  /* il programma puo' aspettarlo se vuole; se non lo fa, non cambia niente */
  try { window.VDM_LAVORO_PRONTO = atteso; } catch (e) {}
})();
