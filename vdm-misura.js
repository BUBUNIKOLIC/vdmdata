/* MISURAZIONE DEGLI SCARICAMENTI — vdmdata.it
   26 settembre 2026

   Serve a sapere QUALI PAROLE su Google portano gli scaricamenti. Senza
   questo la campagna spende alla cieca: Google ottimizza le offerte su
   quello che succede dopo il clic, e finora non gli arrivava niente.

   Come funziona, in ordine:
   1. appare una striscia in fondo che chiede il consenso, nelle tre lingue
      del sito (la lingua la sceglie il CSS, come per tutto il resto);
   2. finche' non si risponde NON viene caricato niente di Google: nessuna
      richiesta, nessun cookie;
   3. se si accetta, si carica il tag e da quel momento il clic sul pulsante
      di scaricamento viene contato;
   4. se si rifiuta, non si carica mai piu' niente.

   La scelta resta nel browser di chi visita, non arriva a noi.
   Il contatore di Cloudflare gia' presente e' un'altra cosa e resta com'e':
   quello non usa cookie e non chiede niente.
*/
(function () {
  'use strict';

  var TAG       = 'AW-18461574834';
  var EVENTO    = 'AW-18461574834/XgKzCJ3CoYYdELKNleNE';  // scaricamento prova gratuita
  var RICORDO   = 'vdm-consenso-misura';

  function leggi() { try { return localStorage.getItem(RICORDO); } catch (e) { return null; } }
  function scrivi(v) { try { localStorage.setItem(RICORDO, v); } catch (e) {} }

  var caricato = false;
  function caricaGoogle() {
    if (caricato) return;
    caricato = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + TAG;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', TAG);
  }

  /* Il clic sul pulsante di scaricamento.
     Non blocchiamo niente e non rimandiamo da nessuna parte: quei pulsanti
     avviano uno scaricamento, la pagina non se ne va, quindi l'evento ha
     tutto il tempo di partire. Un ascoltatore solo sul documento prende
     tutti i pulsanti di tutte le pagine, presenti e futuri. */
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest
          ? e.target.closest('a[href*="releases/latest/download"]')
          : null;
    if (!a || leggi() !== 'si' || typeof window.gtag !== 'function') return;
    window.gtag('event', 'conversion', {
      send_to: EVENTO,
      value: 1.0,
      currency: 'EUR'
    });
  }, true);

  if (leggi() === 'si') { caricaGoogle(); return; }
  if (leggi() === 'no') { return; }

  /* La striscia del consenso. Le tre lingue si accendono con le stesse
     regole del resto del sito: html.en / body.es e via dicendo. */
  function striscia() {
    var css = document.createElement('style');
    css.textContent =
      '.vdm-consenso{position:fixed;left:0;right:0;bottom:0;z-index:9999;' +
      'background:#0b1018;border-top:1px solid #1e2a3d;color:#c8d4e6;' +
      'font:14px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;' +
      'padding:14px 18px;display:flex;flex-wrap:wrap;gap:12px;' +
      'align-items:center;justify-content:center;text-align:center;' +
      'box-shadow:0 -6px 24px rgba(0,0,0,.4)}' +
      '.vdm-consenso p{margin:0;max-width:640px}' +
      '.vdm-consenso a{color:#7fb2ff}' +
      '.vdm-consenso button{font:inherit;cursor:pointer;border-radius:8px;' +
      'padding:8px 18px;border:1px solid #2c3d57;background:#16203000;' +
      'color:#c8d4e6}' +
      '.vdm-consenso button.si{background:#2563eb;border-color:#2563eb;color:#fff;font-weight:600}' +
      '.vdm-consenso [data-en],.vdm-consenso [data-es]{display:none}' +
      'html.en .vdm-consenso [data-it],body.en .vdm-consenso [data-it],' +
      'html.es .vdm-consenso [data-it],body.es .vdm-consenso [data-it]{display:none}' +
      'html.en .vdm-consenso [data-en],body.en .vdm-consenso [data-en]{display:inline}' +
      'html.es .vdm-consenso [data-es],body.es .vdm-consenso [data-es]{display:inline}' +
      '@media(max-width:560px){.vdm-consenso{font-size:13px;padding:12px}}';
    document.head.appendChild(css);

    var b = document.createElement('div');
    b.className = 'vdm-consenso';
    b.setAttribute('role', 'dialog');
    b.innerHTML =
      '<p>' +
      '<span data-it>Vorremmo sapere quali ricerche portano qui chi scarica il programma. ' +
      'Serve un cookie di Google Ads, e solo per questo. Se dici di no, il sito funziona uguale. ' +
      '<a href="privacy.html">Informativa</a>.</span>' +
      '<span data-en>We would like to know which searches bring people here to download. ' +
      'That needs one Google Ads cookie, and nothing else. If you say no, the site works the same. ' +
      '<a href="privacy.html">Privacy</a>.</span>' +
      '<span data-es>Nos gustaría saber qué búsquedas traen aquí a quien descarga el programa. ' +
      'Requiere una cookie de Google Ads, y solo para eso. Si dices que no, el sitio funciona igual. ' +
      '<a href="privacy.html">Privacidad</a>.</span>' +
      '</p>' +
      '<button class="si"><span data-it>Va bene</span><span data-en>Allow</span><span data-es>De acuerdo</span></button>' +
      '<button class="no"><span data-it>No, grazie</span><span data-en>No thanks</span><span data-es>No, gracias</span></button>';
    document.body.appendChild(b);

    b.querySelector('.si').addEventListener('click', function () {
      scrivi('si'); caricaGoogle(); b.remove();
    });
    b.querySelector('.no').addEventListener('click', function () {
      scrivi('no'); b.remove();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', striscia);
  } else {
    striscia();
  }
})();
