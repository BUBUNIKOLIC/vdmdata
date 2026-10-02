/* LA PROVA DI TRE GIORNI, E LA CHIAVE, DENTRO AL BROWSER (02/10/2026).
 *
 * Il Playbook sul sito deve funzionare come quello sull'iPad: si paga. Qui
 * pero' non c'e' nessun negozio che incassa, e non c'e' Electron: il
 * controllo della chiave che sta in src/main/licenza.js non puo' girare.
 *
 * Allora si fa cosi', ed e' la stessa strada dell'app completa:
 *   · tre giorni per guardarlo e provarlo davvero, senza chiedere niente;
 *   · poi serve la chiave. Si scrive a info@vdmdata.it con il CODICE di
 *     questo browser, si paga, arriva la chiave, si incolla e si apre.
 *
 * La chiave e' la stessa dell'app: VDM1.<dati>.<firma>, firmata Ed25519 con
 * la chiave privata di VDM DATA. Qui dentro c'e' solo la chiave PUBBLICA,
 * che serve a verificare e non a fabbricare. Si accettano le chiavi VDMPB
 * (il Playbook) e quelle VDM (l'app completa), esattamente come fa il
 * Playbook sul computer.
 *
 * ONESTA' SU COSA NON PUO' FARE, come sta scritto in licenza.js: una pagina
 * web gira sul computer di un altro, e i tre giorni stanno nella memoria del
 * suo browser. Chi cancella i dati del sito, o apre una finestra anonima,
 * ricomincia da capo. Questo ferma il caso normale — l'allenatore che prova
 * e poi compra — non il tecnico che ci si mette. E' lo stesso patto
 * dell'app: fermare il 99%, non fare l'inviolabile.
 *
 * Non tocca niente del programma: sta sopra, come ponte-web.js.
 */
(function () {
  'use strict';

  var GIORNI_PROVA = 3;
  /* La chiave PUBBLICA di VDM DATA: la stessa riga che sta in licenza.js.
     Non e' un segreto — con questa si verifica una firma, non se ne fa una. */
  var CHIAVE_PUBBLICA = 'MCowBQYDK2VwAyEAUBkSTr9xv5qWcsMiHoQc4bJo49mHMbciH7WY/niLTXo=';
  var PRODOTTI_OK = ['VDMPB', 'VDM'];
  var POSTA = 'info@vdmdata.it';

  var K_CODICE = 'vdmpb_web_codice';
  var K_PROVA = 'vdmpb_web_prova';
  var K_CHIAVE = 'vdmpb_web_chiave';

  /* dentro l'app per iPad non ci si mette in mezzo: li' ha pagato l'App Store */
  try {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.vdmFile) return;
  } catch (e) {}

  /* ------------------------------------------------------------ MEMORIA
   * Due posti invece di uno: la memoria della pagina e IndexedDB. Non per
   * difendersi da qualcuno, ma perche' i browser dei telefoni svuotano la
   * prima da soli quando lo spazio scarseggia, e un allenatore che perde la
   * chiave comprata e si ritrova bloccato scrive a Vince arrabbiato. */
  var DB = 'vdm-playbook-licenza';
  var MAGAZZINO = 'licenza';

  function apri() {
    return new Promise(function (ok, no) {
      var r;
      try { r = indexedDB.open(DB, 1); } catch (e) { no(e); return; }
      r.onupgradeneeded = function () { try { r.result.createObjectStore(MAGAZZINO); } catch (e) {} };
      r.onsuccess = function () { ok(r.result); };
      r.onerror = function () { no(r.error); };
    });
  }
  function dbScrivi(chiave, valore) {
    return apri().then(function (db) {
      return new Promise(function (ok, no) {
        var t = db.transaction(MAGAZZINO, 'readwrite');
        t.objectStore(MAGAZZINO).put(valore, chiave);
        t.oncomplete = function () { db.close(); ok(); };
        t.onerror = function () { db.close(); no(t.error); };
      });
    });
  }
  function dbLeggi(chiave) {
    return apri().then(function (db) {
      return new Promise(function (ok, no) {
        var t = db.transaction(MAGAZZINO, 'readonly');
        var q = t.objectStore(MAGAZZINO).get(chiave);
        q.onsuccess = function () { db.close(); ok(q.result == null ? null : q.result); };
        q.onerror = function () { db.close(); no(q.error); };
      });
    });
  }
  function locLeggi(c) { try { return localStorage.getItem(c); } catch (e) { return null; } }
  function locScrivi(c, v) { try { localStorage.setItem(c, v); } catch (e) {} }

  /* legge dai due posti e tiene il valore buono, riscrivendolo dove manca */
  function leggi(c) {
    var inPagina = locLeggi(c);
    return dbLeggi(c).catch(function () { return null; }).then(function (nelDisco) {
      var buono = inPagina || nelDisco;
      if (buono && !inPagina) locScrivi(c, buono);
      if (buono && !nelDisco) dbScrivi(c, buono).catch(function () {});
      return buono;
    });
  }
  function scrivi(c, v) {
    locScrivi(c, v);
    return dbScrivi(c, v).catch(function () {});
  }

  /* ------------------------------------------------- CODICE DI QUESTO BROWSER
   * Sul computer il codice nasce dall'impronta della macchina. Qui non c'e'
   * niente del genere — e meno male: una pagina web che prende le impronte
   * del computer e' esattamente quello che non vogliamo fare. Allora si
   * sorteggia un codice la prima volta e si tiene.
   *
   * Lettere e cifre come nell'app, e il confronto si fa con la stessa forma
   * normalizzata (O e 0 valgono uguale, I L e 1 pure): il codice viaggia
   * fotografato dallo schermo e ribattuto su WhatsApp. */
  function sorteggiaCodice() {
    var alfabeto = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
    var n = new Uint8Array(16), s = '';
    (window.crypto || {}).getRandomValues ? crypto.getRandomValues(n)
      : (function () { for (var i = 0; i < 16; i++) n[i] = Math.floor(Math.random() * 256); })();
    for (var i = 0; i < 16; i++) s += alfabeto[n[i] % alfabeto.length];
    return s.replace(/(.{4})/g, '$1-').replace(/-$/, '');
  }
  function formaConfrontabile(codice) {
    return String(codice || '').toUpperCase().replace(/[^A-Z0-9]/g, '')
      .replace(/O/g, '0').replace(/[IL]/g, '1').replace(/S/g, '5')
      .replace(/B/g, '8').replace(/Z/g, '2').replace(/G/g, '6');
  }

  /* ------------------------------------------------------------- LA CHIAVE
   * Formato identico a quello dell'app: VDM1.<dati>.<firma>, in base64url.
   * La firma e' sui caratteri del pezzo di mezzo, non sul JSON decodificato. */
  function daBase64url(s) {
    s = String(s).replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    var b = atob(s), a = new Uint8Array(b.length);
    for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i);
    return a;
  }
  var chiavePubblicaPronta = null;
  function pubblica() {
    if (chiavePubblicaPronta) return chiavePubblicaPronta;
    var der = daBase64url(CHIAVE_PUBBLICA.replace(/\+/g, '-').replace(/\//g, '_'));
    chiavePubblicaPronta = crypto.subtle.importKey('spki', der, { name: 'Ed25519' }, false, ['verify']);
    return chiavePubblicaPronta;
  }
  function leggiChiave(testo) {
    var pulito = String(testo || '').replace(/\s+/g, '');
    var parti = pulito.split('.');
    if (parti.length !== 3 || parti[0] !== 'VDM1') return Promise.resolve(null);
    var dati;
    try { dati = JSON.parse(new TextDecoder().decode(daBase64url(parti[1]))); }
    catch (e) { return Promise.resolve(null); }
    return pubblica().then(function (k) {
      return crypto.subtle.verify({ name: 'Ed25519' }, k,
        daBase64url(parti[2]), new TextEncoder().encode(parti[1]));
    }).then(function (ok) { return ok ? dati : null; })
      .catch(function () { return null; });
  }

  /* Il motivo per cui una chiave non va bene, detto come a un allenatore. */
  function controllaChiave(testo, codice, ora) {
    return leggiChiave(testo).then(function (dati) {
      if (!dati) return { ok: false, motivo: 'nonValida' };
      if (dati.p && PRODOTTI_OK.indexOf(dati.p) < 0) return { ok: false, motivo: 'nonValida' };
      if (dati.m && formaConfrontabile(dati.m) !== formaConfrontabile(codice)) {
        return { ok: false, motivo: 'altroComputer' };
      }
      if (dati.s) {
        var fine = Date.parse(dati.s);
        if (isFinite(fine) && ora > fine) return { ok: false, motivo: 'scaduta', scadenza: dati.s };
      }
      return { ok: true, dati: dati };
    });
  }

  /* ------------------------------------------------------------- I GIORNI
   * Si tengono due date: quando e' cominciata e l'ultima volta che si e'
   * guardato. L'ora buona e' la piu' avanti delle due, cosi' spostare
   * indietro l'orologio del computer non allunga la prova — e' la stessa
   * difesa che fa adesso() in licenza.js. */
  function leggiProva() {
    return leggi(K_PROVA).then(function (grezzo) {
      var p = null;
      try { p = grezzo ? JSON.parse(grezzo) : null; } catch (e) { p = null; }
      if (!p || !p.inizio) {
        p = { inizio: Date.now(), visto: Date.now() };
        scrivi(K_PROVA, JSON.stringify(p));
      }
      return p;
    });
  }
  function adesso(p) { return Math.max(Date.now(), p.visto || 0); }
  function segnaVisto(p) {
    var ora = adesso(p);
    if (ora > (p.visto || 0)) { p.visto = ora; scrivi(K_PROVA, JSON.stringify(p)); }
    return ora;
  }

  /* --------------------------------------------------------------- STATO
   * Le stesse tre parole dell'app: 'licenza', 'prova', 'scaduta'. */
  function stato() {
    var codice, prova;
    return leggi(K_CODICE).then(function (c) {
      codice = c;
      if (!codice) { codice = sorteggiaCodice(); scrivi(K_CODICE, codice); }
      return leggiProva();
    }).then(function (p) {
      prova = p;
      var ora = segnaVisto(p);
      return leggi(K_CHIAVE).then(function (salvata) {
        if (!salvata) return null;
        return controllaChiave(salvata, codice, ora);
      }).then(function (c) {
        if (c && c.ok) {
          return {
            tipo: 'licenza', codiceMacchina: codice,
            cliente: c.dati.c || '', prodotto: c.dati.p || 'VDMPB', scadenza: c.dati.s || ''
          };
        }
        var giorni = GIORNI_PROVA - Math.floor((ora - prova.inizio) / 86400000);
        return {
          tipo: giorni > 0 ? 'prova' : 'scaduta', codiceMacchina: codice,
          giorni: Math.max(0, giorni), giorniProva: GIORNI_PROVA,
          problema: c ? c.motivo : null
        };
      });
    });
  }

  /* ---------------------------------------------------------- LE PAROLE */
  var P = {
    it: {
      restano: function (g) { return g === 1 ? 'Ultimo giorno di prova' : 'Prova: restano ' + g + ' giorni'; },
      compra: 'Comprare il Playbook',
      titolo: 'La prova di tre giorni è finita',
      testo: 'VDM Basketball Playbook costa <b>29,99 €, una volta sola</b>: nessun abbonamento, nessun rinnovo. I giochi che hai disegnato sono salvati e ti ritrovi tutto appena incolli la chiave.',
      comeSi: 'Scrivi a <b>' + POSTA + '</b> con il codice qui sotto. Ti rispondo io con come pagare, e ti mando la chiave.',
      tuoCodice: 'Il codice di questo browser',
      copia: 'Copia il codice', copiato: 'Copiato',
      scrivi: 'Scrivi la mail',
      hoChiave: 'Ho già la chiave: incollala qui',
      apri: 'Apri il Playbook',
      errNonValida: 'Questa chiave non è valida: controlla di averla copiata tutta, dall\'inizio (VDM1.) alla fine.',
      errAltro: 'Questa chiave è di un altro computer. Mandami il codice qui sopra e te ne faccio una per questo.',
      errScaduta: 'Questa chiave è scaduta.',
      errVecchio: 'Questo browser è troppo vecchio per controllare la chiave: apri il Playbook con Chrome, Safari o Edge aggiornati.',
      appstore: 'Hai un iPad? Sull\'App Store c\'è l\'app vera, sempre 29,99 €.'
    },
    en: {
      restano: function (g) { return g === 1 ? 'Last trial day' : 'Trial: ' + g + ' days left'; },
      compra: 'Buy the Playbook',
      titolo: 'The three-day trial is over',
      testo: 'VDM Basketball Playbook costs <b>€29.99, once</b>: no subscription, no renewals. The plays you drew are saved — they all come back the moment you paste the key.',
      comeSi: 'Write to <b>' + POSTA + '</b> with the code below. I answer you myself with how to pay, and I send you the key.',
      tuoCodice: 'This browser\'s code',
      copia: 'Copy the code', copiato: 'Copied',
      scrivi: 'Write the email',
      hoChiave: 'I already have the key: paste it here',
      apri: 'Open the Playbook',
      errNonValida: 'This key is not valid: check you copied all of it, from the start (VDM1.) to the end.',
      errAltro: 'This key belongs to another computer. Send me the code above and I\'ll make you one for this.',
      errScaduta: 'This key has expired.',
      errVecchio: 'This browser is too old to check the key: open the Playbook with an up-to-date Chrome, Safari or Edge.',
      appstore: 'Got an iPad? The real app is on the App Store, same €29.99.'
    },
    es: {
      restano: function (g) { return g === 1 ? 'Último día de prueba' : 'Prueba: quedan ' + g + ' días'; },
      compra: 'Comprar el Playbook',
      titolo: 'La prueba de tres días ha terminado',
      testo: 'VDM Basketball Playbook cuesta <b>29,99 €, una sola vez</b>: sin suscripción, sin renovaciones. Las jugadas que has dibujado están guardadas y vuelven en cuanto pegues la clave.',
      comeSi: 'Escribe a <b>' + POSTA + '</b> con el código de abajo. Te contesto yo con cómo pagar, y te mando la clave.',
      tuoCodice: 'El código de este navegador',
      copia: 'Copiar el código', copiato: 'Copiado',
      scrivi: 'Escribir el correo',
      hoChiave: 'Ya tengo la clave: pégala aquí',
      apri: 'Abrir el Playbook',
      errNonValida: 'Esta clave no es válida: comprueba que la has copiado entera, desde el principio (VDM1.) hasta el final.',
      errAltro: 'Esta clave es de otro ordenador. Mándame el código de arriba y te hago una para este.',
      errScaduta: 'Esta clave ha caducado.',
      errVecchio: 'Este navegador es demasiado antiguo para comprobar la clave: abre el Playbook con Chrome, Safari o Edge actualizados.',
      appstore: '¿Tienes un iPad? En la App Store está la app de verdad, los mismos 29,99 €.'
    }
  };
  function lingua() {
    var l = '';
    try { if (window.currentLang) l = String(window.currentLang); } catch (e) {}
    if (!l) { try { l = (navigator.language || 'en').slice(0, 2); } catch (e) { l = 'en'; } }
    return P[l] ? l : 'en';
  }
  function p(nome) { return P[lingua()][nome]; }

  /* ----------------------------------------------------------- LA FACCIA */
  function stile() {
    if (document.getElementById('vdmProvaStile')) return;
    var s = document.createElement('style');
    s.id = 'vdmProvaStile';
    s.textContent = [
      '#vdmProvaNastro{position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:99998;',
      '  display:flex;align-items:center;gap:12px;padding:9px 16px;border-radius:999px;',
      '  background:rgba(10,18,30,.93);border:1px solid rgba(120,190,255,.34);',
      '  box-shadow:0 10px 34px rgba(0,0,0,.45);backdrop-filter:blur(8px);',
      '  font:600 13px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#cfe0f2;',
      /* su una riga sola: se va a capo diventa un mattone in mezzo al campo */
      '  white-space:nowrap;max-width:calc(100vw - 20px);}',
      '#vdmProvaNastro span{white-space:nowrap;}',
      '@media(max-width:430px){#vdmProvaNastro{font-size:11.5px;padding:7px 12px;gap:9px;bottom:10px;}}',
      '#vdmProvaNastro a{color:#00eaff;text-decoration:none;font-weight:700;white-space:nowrap;}',
      '#vdmProvaNastro a:hover{text-decoration:underline;}',
      '#vdmProvaVelo{position:fixed;inset:0;z-index:99999;overflow:auto;',
      '  background:radial-gradient(1100px 700px at 50% -10%,#10243c 0%,#070d16 62%,#05080e 100%);',
      '  font:400 16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#c9d6e6;}',
      '#vdmProvaVelo .dentro{max-width:560px;margin:0 auto;padding:46px 22px 60px;}',
      '#vdmProvaVelo h1{font:800 26px/1.25 inherit;color:#fff;margin:0 0 16px;letter-spacing:-.01em;}',
      '#vdmProvaVelo p{margin:0 0 16px;}',
      '#vdmProvaVelo b{color:#fff;}',
      '#vdmProvaVelo .cod{margin:22px 0;padding:16px 18px;border-radius:12px;',
      '  background:rgba(79,170,255,.08);border:1px solid rgba(120,190,255,.22);}',
      '#vdmProvaVelo .cod .et{font-size:12px;letter-spacing:.09em;text-transform:uppercase;',
      '  color:#86a6c8;font-weight:700;margin-bottom:8px;}',
      '#vdmProvaVelo .cod .val{font:700 21px/1.3 ui-monospace,SFMono-Regular,Menlo,monospace;',
      '  color:#00eaff;word-break:break-all;user-select:all;}',
      '#vdmProvaVelo .riga{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px;}',
      '#vdmProvaVelo button,#vdmProvaVelo a.bot{appearance:none;cursor:pointer;border-radius:10px;',
      '  padding:12px 18px;font:700 14px/1 inherit;text-decoration:none;display:inline-block;}',
      '#vdmProvaVelo .primo{background:linear-gradient(120deg,#00eaff,#4c8dff 86%);color:#03121a;border:0;}',
      '#vdmProvaVelo .sec{background:transparent;color:#cfe0f2;border:1px solid rgba(140,190,240,.34);}',
      '#vdmProvaVelo input{width:100%;box-sizing:border-box;margin-top:10px;padding:13px 14px;',
      '  border-radius:10px;border:1px solid rgba(140,190,240,.3);background:rgba(5,10,18,.72);',
      '  color:#eaf3ff;font:500 14px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;}',
      '#vdmProvaVelo .err{color:#ff9b9b;margin-top:10px;font-size:14.5px;min-height:1px;}',
      '#vdmProvaVelo .pie{margin-top:26px;font-size:14px;color:#86a6c8;}',
      '#vdmProvaVelo .pie a{color:#8fd0ff;}'
    ].join('');
    document.head.appendChild(s);
  }

  function nastro(giorni) {
    stile();
    var n = document.getElementById('vdmProvaNastro');
    if (!n) {
      n = document.createElement('div');
      n.id = 'vdmProvaNastro';
      document.body.appendChild(n);
    }
    n.innerHTML = '<span></span><a href="#">' + p('compra') + '</a>';
    n.firstChild.textContent = p('restano')(giorni);
    n.querySelector('a').onclick = function (e) { e.preventDefault(); velo(null, true); };
  }

  /* Il velo: quando la prova e' finita il Playbook resta sotto — i giochi
     non si perdono — ma non ci si lavora piu' finche' non c'e' la chiave. */
  function velo(st, soloGuardare) {
    stile();
    var vecchio = document.getElementById('vdmProvaVelo');
    if (vecchio) vecchio.remove();
    var codice = (st && st.codiceMacchina) || (window.VDM_PROVA && window.VDM_PROVA.codice) || '';
    var oggetto = encodeURIComponent('VDM Basketball Playbook — vorrei comprarlo');
    var corpo = encodeURIComponent('Buongiorno,\nvorrei comprare VDM Basketball Playbook.\nIl codice del mio browser e\': ' + codice + '\n\nGrazie.');

    var v = document.createElement('div');
    v.id = 'vdmProvaVelo';
    v.innerHTML =
      '<div class="dentro">' +
      '<h1>' + p('titolo') + '</h1>' +
      '<p>' + p('testo') + '</p>' +
      '<p>' + p('comeSi') + '</p>' +
      '<div class="cod"><div class="et">' + p('tuoCodice') + '</div><div class="val" id="vdmProvaCod">' + codice + '</div>' +
      '<div class="riga"><button class="sec" id="vdmProvaCopia">' + p('copia') + '</button>' +
      '<a class="bot primo" href="mailto:' + POSTA + '?subject=' + oggetto + '&body=' + corpo + '">' + p('scrivi') + '</a></div></div>' +
      '<p style="margin-top:26px"><b>' + p('hoChiave') + '</b>' +
      '<input id="vdmProvaChiave" spellcheck="false" autocapitalize="off" autocomplete="off" placeholder="VDM1.…"></p>' +
      '<div class="riga"><button class="primo" id="vdmProvaApri">' + p('apri') + '</button>' +
      (soloGuardare ? '<button class="sec" id="vdmProvaChiudi">←</button>' : '') + '</div>' +
      '<div class="err" id="vdmProvaErr"></div>' +
      '<div class="pie">' + p('appstore') + ' <a href="https://apps.apple.com/it/app/vdm-basketball-playbook/id6814953831" target="_blank" rel="noopener">App Store</a></div>' +
      '</div>';
    document.body.appendChild(v);

    v.querySelector('#vdmProvaCopia').onclick = function () {
      var b = this;
      try {
        navigator.clipboard.writeText(codice).then(function () {
          b.textContent = p('copiato');
          setTimeout(function () { b.textContent = p('copia'); }, 1800);
        });
      } catch (e) {}
    };
    var chiudi = v.querySelector('#vdmProvaChiudi');
    if (chiudi) chiudi.onclick = function () { v.remove(); };

    function prova() {
      var campo = v.querySelector('#vdmProvaChiave');
      var err = v.querySelector('#vdmProvaErr');
      var testo = (campo.value || '').trim();
      if (!testo) return;
      if (!window.crypto || !crypto.subtle) { err.textContent = p('errVecchio'); return; }
      leggi(K_CODICE).then(function (c) {
        return controllaChiave(testo, c, Date.now());
      }).then(function (r) {
        if (r.ok) {
          scrivi(K_CHIAVE, testo);
          v.remove();
          var n = document.getElementById('vdmProvaNastro');
          if (n) n.remove();
          return;
        }
        err.textContent = r.motivo === 'altroComputer' ? p('errAltro')
          : r.motivo === 'scaduta' ? p('errScaduta') : p('errNonValida');
      }).catch(function () { err.textContent = p('errVecchio'); });
    }
    v.querySelector('#vdmProvaApri').onclick = prova;
    v.querySelector('#vdmProvaChiave').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); prova(); }
    });
    /* chi incolla la chiave non deve dover cercare anche il tasto */
    v.querySelector('#vdmProvaChiave').addEventListener('paste', function () {
      setTimeout(function () { if (/^VDM1\./.test(this.value.trim())) prova(); }.bind(this), 40);
    });
  }

  function mostra() {
    stato().then(function (st) {
      try { window.VDM_PROVA = { stato: st, codice: st.codiceMacchina }; } catch (e) {}
      if (st.tipo === 'licenza') return;
      if (st.tipo === 'prova') { nastro(st.giorni); return; }
      velo(st, false);
    }).catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mostra);
  } else {
    mostra();
  }
  /* e si ricontrolla quando si torna sulla pagina: una prova che finisce
     mentre la scheda e' aperta da ieri deve farsi sentire lo stesso */
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && !document.getElementById('vdmProvaVelo')) mostra();
  });
})();
