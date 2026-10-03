/* IMPORTAZIONE STATISTICHE DA FILE — VDM Basketball Coach
   28 settembre 2026

   PERCHE' ESISTE
   Le statistiche ci sono gia': chi allena le scarica dal suo fornitore
   (Hudl InStat, Synergy, i referti FIBA) con un pulsante. Il lavoro che
   costa la serata non e' scaricarle, e' riscriverle a mano una per una
   dentro le schede delle giocatrici. Questo file toglie quel passaggio.

   COME E' FATTO
   La finestra del programma non ha Node (contextIsolation: true), quindi
   niente librerie: il file .xlsx e' uno zip e lo apriamo con quello che il
   browser ha gia' dentro (DecompressionStream). Nessun dato esce dal
   computer, nessuna dipendenza nuova da mantenere.

   REGOLA CHE MI SONO DATO
   Niente qui dentro parte da solo. Si accende solo quando l'utente sceglie
   un file. Chi non importa niente non deve accorgersi che e' cambiato
   qualcosa: il programma e' in vendita.
*/
(function (globale) {
  'use strict';

  /* ---------------------------------------------------------------
     1. LEGGERE UN .xlsx SENZA LIBRERIE
     Un .xlsx e' uno zip con dentro dei file XML. Ci servono due cose:
     il foglio e, se c'e', la tabella delle stringhe condivise.
     --------------------------------------------------------------- */

  async function scompatta(buffer) {
    const d = new DataView(buffer);
    const u8 = new Uint8Array(buffer);
    // la "fine dell'indice" sta in fondo: la cerchiamo a ritroso
    let fine = -1;
    for (let i = u8.length - 22; i >= 0 && i > u8.length - 66000; i--) {
      if (d.getUint32(i, true) === 0x06054b50) { fine = i; break; }
    }
    if (fine < 0) throw new Error('non sembra un file .xlsx');
    const quanti = d.getUint16(fine + 10, true);
    let p = d.getUint32(fine + 16, true);

    const dentro = {};
    for (let n = 0; n < quanti; n++) {
      if (d.getUint32(p, true) !== 0x02014b50) break;
      const metodo   = d.getUint16(p + 10, true);
      const compresso= d.getUint32(p + 20, true);
      const lunNome  = d.getUint16(p + 28, true);
      const lunExtra = d.getUint16(p + 30, true);
      const lunComm  = d.getUint16(p + 32, true);
      const offset   = d.getUint32(p + 42, true);
      const nome = new TextDecoder().decode(u8.subarray(p + 46, p + 46 + lunNome));
      // l'intestazione locale dice quanto sono lunghi nome ed extra LI'
      const lnNome  = d.getUint16(offset + 26, true);
      const lnExtra = d.getUint16(offset + 28, true);
      const inizio  = offset + 30 + lnNome + lnExtra;
      const grezzo  = u8.subarray(inizio, inizio + compresso);
      dentro[nome] = { metodo, grezzo };
      p += 46 + lunNome + lunExtra + lunComm;
    }

    async function testo(nome) {
      const v = dentro[nome];
      if (!v) return '';
      if (v.metodo === 0) return new TextDecoder().decode(v.grezzo);
      const flusso = new Blob([v.grezzo]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
      return await new Response(flusso).text();
    }
    return { elenco: Object.keys(dentro), testo };
  }

  /* Dal foglio XML alla griglia di celle. Teniamo la posizione vera della
     colonna (A, B, C...) perche' le celle vuote nel file non ci sono, e
     senza questo le colonne si spostano. */
  function grigliaDaFoglio(xmlFoglio, stringhe) {
    const doc = new DOMParser().parseFromString(xmlFoglio, 'application/xml');
    const righe = [];
    doc.querySelectorAll('row').forEach(function (r) {
      const cella = [];
      r.querySelectorAll('c').forEach(function (c) {
        const rif = c.getAttribute('r') || '';
        const lettere = (rif.match(/^[A-Z]+/) || ['A'])[0];
        let col = 0;
        for (let i = 0; i < lettere.length; i++) col = col * 26 + (lettere.charCodeAt(i) - 64);
        col -= 1;
        let v = '';
        const inline = c.querySelector('is t');
        const valore = c.querySelector('v');
        if (inline) v = inline.textContent;
        else if (valore) {
          v = valore.textContent;
          if (c.getAttribute('t') === 's') v = stringhe[parseInt(v, 10)] || '';
        }
        cella[col] = (v || '').trim();
      });
      for (let i = 0; i < cella.length; i++) if (cella[i] == null) cella[i] = '';
      righe.push(cella);
    });
    return righe;
  }

  async function leggiFoglio(file) {
    const buffer = await file.arrayBuffer();
    const zip = await scompatta(buffer);
    let stringhe = [];
    const xmlStringhe = await zip.testo('xl/sharedStrings.xml');
    if (xmlStringhe) {
      const doc = new DOMParser().parseFromString(xmlStringhe, 'application/xml');
      stringhe = Array.from(doc.querySelectorAll('si')).map(function (si) {
        return Array.from(si.querySelectorAll('t')).map(function (t) { return t.textContent; }).join('');
      });
    }
    const nomeFoglio = zip.elenco.filter(function (n) { return /^xl\/worksheets\/sheet\d+\.xml$/.test(n); }).sort()[0];
    if (!nomeFoglio) throw new Error('nel file non c\'e\' nessun foglio');
    return grigliaDaFoglio(await zip.testo(nomeFoglio), stringhe);
  }

  /* ---------------------------------------------------------------
     2. CAPIRE CHE FILE E'
     Si riconosce dalle intestazioni, non dal nome del file: il nome lo
     cambia chiunque, le intestazioni no.
     --------------------------------------------------------------- */

  function normalizza(s) {
    return String(s || '').toLowerCase().replace(/&apos;|'/g, "'").replace(/\s+/g, ' ').trim();
  }

  const FORMATI = [
    {
      id: 'instat-giocatrici',
      nome: 'Hudl InStat — giocatrici',
      riconosci: function (int) {
        return int.indexOf('jersey number') >= 0 && int.indexOf('player') >= 0 && int.indexOf('plus/minus') >= 0;
      },
      colonne: {
        numero: 'jersey number', nome: 'player', partite: 'games played', minuti: 'minutes',
        punti: 'points', puntiPerPossesso: "points per player's possession",
        tiroFatti: 'field goals made', tiroTentati: 'field goals attempted', tiroPct: 'field goals, %',
        treFatti: '3-pt field goals made', treTentati: '3-pt field goals attempted', trePct: '3-pt field goals, %',
        liberiFatti: 'free throws made', liberiTentati: 'free throws attempted', liberiPct: 'free throws, %',
        rimbalzi: 'rebounds', rimbalziOff: 'offensive rebounds', rimbalziDif: 'defensive rebounds',
        assist: 'assists', recuperi: 'steals', pallePerse: 'turnovers', stoppate: 'blocks',
        falli: 'fouls', falliSubiti: 'fouls drawn', plusMinus: 'plus/minus',
      },
    },
    {
      id: 'instat-quintetti',
      nome: 'Hudl InStat — quintetti',
      riconosci: function (int) {
        return int.indexOf('lineup') >= 0 && int.indexOf('plus/minus') >= 0 && int.indexOf('possessions') >= 0;
      },
      colonne: {
        quintetto: 'lineup', plusMinus: 'plus/minus', minuti: 'minutes', possessi: 'possessions',
        punti: 'points', tiroTentati: 'field goals attempted', tiroFatti: 'field goals made',
        tiroPct: 'field goals, %', duePct: '2-pt field goals, %', trePct: '3-pt field goals, %',
        rimbalzi: 'rebounds', assist: 'assists', pallePerse: 'turnovers',
      },
    },
  ];

  function riconosciFormato(griglia) {
    if (!griglia || !griglia.length) return null;
    const intestazioni = griglia[0].map(normalizza);
    for (let i = 0; i < FORMATI.length; i++) {
      if (FORMATI[i].riconosci(intestazioni)) return { formato: FORMATI[i], intestazioni: intestazioni };
    }
    return null;
  }

  /* Dalla griglia a una lista di oggetti con i nomi che usiamo noi. */
  function righeInOggetti(griglia, formato, intestazioni) {
    const indice = {};
    Object.keys(formato.colonne).forEach(function (chiave) {
      const cercata = formato.colonne[chiave];
      const i = intestazioni.indexOf(cercata);
      if (i >= 0) indice[chiave] = i;
    });
    const fuori = [];
    for (let r = 1; r < griglia.length; r++) {
      const riga = griglia[r];
      if (!riga || !riga.length) continue;
      const o = {};
      Object.keys(indice).forEach(function (chiave) {
        let v = riga[indice[chiave]];
        if (v === '-' || v === '—' || v == null) v = '';
        o[chiave] = v;
      });
      // una riga senza nome ne' quintetto non e' una riga di dati
      if (!(o.nome || '').trim() && !(o.quintetto || '').trim()) continue;
      fuori.push(o);
    }
    return fuori;
  }

  /* ---------------------------------------------------------------
     3. METTERE I NUMERI NELLE SCHEDE CHE CI SONO GIA'
     Le schede delle avversarie hanno: pt, tiro, tiro3, ast, reb, pp,
     stoppate. Le nostre: pts, reb, ast, p2, p3, ft.
     Non si inventano campi nuovi: si riempiono quelli.
     --------------------------------------------------------------- */

  function numero(v) {
    const n = parseFloat(String(v == null ? '' : v).replace('%', '').replace(',', '.'));
    return isFinite(n) ? n : null;
  }

  /* Il due punti non c'e' nel file: si ricava togliendo i tre dal totale.
     Attenzione a chi non tira mai da tre (i lunghi): li' le colonne dei tre
     sono vuote o "-", e trattarle come "dato mancante" cancellava la
     percentuale da due di giocatrici che invece avevano tirato eccome.
     Una colonna vuota dei tre significa zero tiri da tre, non zero dati. */
  function percentualeDue(r) {
    const tf = numero(r.tiroFatti), tt = numero(r.tiroTentati);
    if (tf == null || tt == null) return '';
    const t3f = numero(r.treFatti) || 0, t3t = numero(r.treTentati) || 0;
    const f = tf - t3f, t = tt - t3t;
    if (!(t > 0)) return '';
    return Math.round((f / t) * 1000) / 10 + '%';
  }

  function statisticheAvversaria(r) {
    return {
      pt: r.punti || '',
      tiro: r.tiroPct || '',
      tiro3: r.trePct || '',
      ast: r.assist || '',
      reb: r.rimbalzi || '',
      pp: r.pallePerse || '',
      stoppate: r.stoppate || '',
    };
  }

  function statisticheNostre(r) {
    return {
      pts: r.punti || '',
      reb: r.rimbalzi || '',
      ast: r.assist || '',
      p2: percentualeDue(r),
      p3: r.trePct || '',
      ft: r.liberiPct || '',
    };
  }

  /* L'accoppiamento: prima il numero di maglia, poi il cognome. Se non
     trova, non inventa: lo mette fra i "non abbinati" e lo dice. */
  function cognome(nomeCompleto) {
    const s = String(nomeCompleto || '').trim();
    if (!s) return '';
    // InStat scrive "Chelsea Gray" ma anche "C. Gray": in tutti e due i
    // casi l'ultima parola e' il cognome.
    const pezzi = s.replace(/\./g, ' ').split(/\s+/).filter(Boolean);
    return (pezzi[pezzi.length - 1] || '').toLowerCase();
  }

  function abbina(righe, giocatrici) {
    const esito = { abbinate: [], nonAbbinate: [], senzaDati: [] };
    const usate = new Set();
    righe.forEach(function (r) {
      const num = String(r.numero || '').trim();
      let g = null;
      if (num) {
        g = giocatrici.find(function (x) {
          return !usate.has(x) && String(x.number == null ? '' : x.number).trim() === num;
        }) || null;
      }
      if (!g) {
        const c = cognome(r.nome);
        if (c) g = giocatrici.find(function (x) { return !usate.has(x) && cognome(x.name) === c; }) || null;
      }
      if (g) { usate.add(g); esito.abbinate.push({ riga: r, giocatrice: g }); }
      else esito.nonAbbinate.push(r);
    });
    giocatrici.forEach(function (x) { if (!usate.has(x)) esito.senzaDati.push(x); });
    return esito;
  }

  globale.VDMImportaStatistiche = {
    leggiFoglio: leggiFoglio,
    riconosciFormato: riconosciFormato,
    righeInOggetti: righeInOggetti,
    statisticheAvversaria: statisticheAvversaria,
    statisticheNostre: statisticheNostre,
    percentualeDue: percentualeDue,
    abbina: abbina,
    cognome: cognome,
    FORMATI: FORMATI,
  };
})(typeof window !== 'undefined' ? window : globalThis);

/* ===================================================================
   LE DUE PAGINE NUOVE

   Usano le CLASSI DEL PROGRAMMA, non classi mie: print-page,
   pr-personnel-page, print-personnel-grid-12, print-player-card,
   pp-card-top / pp-photo-wrap / pp-card-info / pp-head / pp-num /
   pp-sub / pp-bio / pp-stats-row / pp-st / pp-traits-grid /
   pp-trait-line, e per lo scouting print-report-grid /
   print-report-box / print-report-body / print-line.
   Cosi' ereditano carattere, misure e il fattore di scala --sf delle
   dodici caselle senza che io debba ridefinire niente: le pagine nuove
   escono identiche a quelle che ci sono gia'.

   Lo stile che aggiungo e' due righe, e solo per allineare a destra i
   numeri nelle righe "etichetta ... valore".
   =================================================================== */
(function (globale) {
  'use strict';
  const I = globale.VDMImportaStatistiche;
  if (!I) return;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function vuoto(v) { return v == null || v === '' || v === '-' ? '—' : String(v); }
  function segno(v) {
    if (v == null || v === '' || v === '-') return '—';
    const n = parseFloat(String(v).replace(',', '.'));
    return (isFinite(n) && n > 0 ? '+' : '') + v;
  }

  /* -------------------------------------------------------------
     A. PERSONNEL — seconda pagina, stessa griglia di dodici caselle
     Stessa struttura di printPersonnelCardHtml: cambia solo cosa c'e'
     nella riga delle statistiche e nelle quattro righe in fondo.
     ------------------------------------------------------------- */

  function schedaAvanzataHtml(p, segnaposto) {
    const g = globale;
    const a = (p && p.statAvanzate) || {};
    const num = String(p && p.number == null ? '' : p.number).trim();
    const st = function (etichetta, valore) {
      return '<span class="pp-st"><b>' + esc(vuoto(valore)) + '</b><i>' + etichetta + '</i></span>';
    };
    // I play type arrivano come una riga sola:
    // "PnR ballhandler 25% (PPPP 1.46) - Uscita da blocco 16.7% (PPPP 0.43)"
    // Le quattro righe in fondo sono le stesse quattro delle caratteristiche.
    const tipi = String((p && p.statAvanzate && p.statAvanzate.playTypes) || (p && p.playType) || '').split(/\s+[-–—]\s+/)
      .map(function (x) { return x.trim(); }).filter(Boolean);
    const posto = (p && p.slot >= 1 && p.slot <= 12) ? '<span class="pp-slot">P' + p.slot + '</span>' : '';
    return '<div class="print-player-card">' + posto +
      '<div class="pp-card-top">' +
        '<span class="pp-photo-wrap"><img class="pp-photo" src="' + ((p && p.photo) || segnaposto || '') + '" alt=""></span>' +
        '<div class="pp-card-info">' +
          '<div class="pp-head"><span class="pp-num">' + esc(num || '—') + '</span>' + esc((p && p.name) || '') + '</div>' +
          /* Stessa riga di sotto della scheda che c'e' gia': prima il ruolo,
             che e' la cosa che si cerca per prima guardando una scheda, poi
             i minuti e le partite. Il +/- non sta qui: e' una statistica e
             va con le altre, nella riga dei numeri. */
          '<div class="pp-sub">' +
            '<span class="pp-role">' + esc(g.roleLabel ? g.roleLabel(p && p.role) : (p && p.role) || '') + '</span>' +
            '<span class="pp-bio">' + esc(vuoto(a.minuti)) + '</span>' +
            '<span class="pp-bio">' + esc(a.partite ? a.partite + ' g' : '—') + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="pp-stats-row">' +
        st('PPP', a.puntiPerPossesso) + st('+/-', segno(a.plusMinus)) + st('RO', a.rimbalziOff) +
        st('RD', a.rimbalziDif) + st('REC', a.recuperi) + st('PP', a.pallePerse) +
      '</div>' +
      '<div class="pp-traits-grid">' +
        [0, 1, 2, 3].map(function (i) {
          const testo = tipi[i] || '';
          return '<div class="pp-trait-line' + (testo ? '' : ' vuota') + '">' + esc(testo) + '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  }

  /* La pagina intera del personnel avanzato. Rifa' gli stessi passaggi di
     buildPersonnelPageHtml — stesse posizioni P1..P12, stesse due colonne,
     stesso numero di righe, stesso colore della squadra, stessa
     intestazione — cosi' la seconda pagina e' la prima con dentro altri
     numeri, e non un foglio di un altro programma. */
  function paginaPersonnelHtml(team, league, titolo, segnaposto) {
    const g = globale;
    if (g.normalizePersonnelSlots) g.normalizePersonnelSlots(team);
    const pieno = g.rosterRowIsFilled || function (p) {
      return !!((p.name || '').trim() || (p.number != null && String(p.number).trim()));
    };
    const bySlot = {}, senzaPosto = [];
    (team.players || []).filter(function (p) { return pieno(p) && !p.fuoriFoglio; }).forEach(function (p) {
      const n = parseInt(p.slot, 10);
      if (n >= 1 && n <= 12 && !bySlot[n]) bySlot[n] = p; else senzaPosto.push(p);
    });
    for (let i = 1; i <= 12 && senzaPosto.length; i++) if (!bySlot[i]) bySlot[i] = senzaPosto.shift();
    const sinistra = [], destra = [];
    for (let n = 1; n <= 6; n++) if (bySlot[n]) sinistra.push(bySlot[n]);
    for (let n = 7; n <= 12; n++) if (bySlot[n]) destra.push(bySlot[n]);
    const quante = sinistra.length + destra.length;
    let cards = [], righe = 6;
    if (!quante) {
      for (let n = 1; n <= 12; n++) cards.push(schedaAvanzataHtml({ slot: n }, segnaposto));
    } else {
      righe = Math.max(sinistra.length, destra.length, 1);
      const colonna = function (arr) {
        const out = arr.map(function (p) { return schedaAvanzataHtml(p, segnaposto); });
        while (out.length < righe) out.push('<div class="print-player-card print-player-card-ghost"></div>');
        return out;
      };
      cards = colonna(sinistra).concat(colonna(destra));
    }
    const acc = (team && typeof team.colorHex === 'string' && /^#[0-9a-f]{6}$/i.test(team.colorHex)) ? team.colorHex : '#12365c';
    const tono = g.tonoColore || function (c) { return c; };
    const stile = '--pacc:' + acc + ';--pacc2:' + tono(acc, -0.45) + ';--pacc3:' + tono(acc, 0.35) + ';';
    const testa = g.personnelLetterheadHtml ? g.personnelLetterheadHtml(team, league, quante || 12) : '';
    return '<div class="print-page pr-personnel-page" style="' + stile + '">' + testa +
      (titolo ? '<h4 class="print-page-title">' + esc(titolo) + '</h4>' : '') +
      '<div class="print-personnel-grid print-personnel-grid-12" style="grid-template-rows:repeat(' + righe + ',minmax(0,1fr));">' +
      cards.join('') + '</div></div>';
  }

  /* -------------------------------------------------------------
     B. SCOUTING REPORT — pagina delle statistiche avanzate di squadra
     Stesse caselle del foglio che c'e' gia'.
     ------------------------------------------------------------- */

  function casella(titolo, righe, classe, sotto) {
    const corpo = righe.filter(function (r) { return r; }).map(function (r) {
      return '<div class="print-line imp-riga"><span>' + esc(r[0]) + '</span>' +
        (r[2] ? '<em class="imp-su">' + esc(r[2]) + '</em>' : '') +
        '<b>' + esc(vuoto(r[1])) + '</b></div>';
    }).join('');
    return '<div class="print-report-box' + (classe ? ' ' + classe : '') + '">' +
      '<h4>' + esc(titolo) + '</h4>' +
      '<div class="print-report-body">' + (sotto ? '<h5>' + esc(sotto) + '</h5>' : '') +
        (corpo || '<div class="print-empty-line">—</div>') + '</div>' +
    '</div>';
  }

  /* I play types di squadra: quello che l'avversaria CERCA (attacco) e
     quello che le riesce CONTRO (difesa), in ordine di quanto lo usa. La
     colonna dei punti per possesso e' quella che dice se funziona. */
  /* Le righe senza nome non esistono: le caselle da riempire a mano sono
     otto fisse, e chi ne compila tre lascia le altre cinque vuote. Se non
     si buttassero via qui, sul foglio uscirebbero cinque righe bianche con
     dentro dei trattini. */
  function soloPiene(elenco) {
    return (elenco || []).filter(function (x) { return x && String(x.nome == null ? '' : x.nome).trim(); });
  }

  function tabellaPlayTypes(titolo, elenco, e) {
    elenco = soloPiene(elenco);
    if (!elenco || !elenco.length) return '';
    return '<div class="print-report-box">' +
      '<h4>' + esc(titolo) + '</h4>' +
      '<div class="print-report-body"><h5>' + esc(e.aPartita || 'Medie a partita') + '</h5>' +
      '<table class="imp-tab">' +
      '<colgroup><col><col class="imp-s"><col class="imp-s"><col class="imp-s"></colgroup>' +
      '<thead><tr><th>' + esc(e.playType || 'Play type') + '</th><th>%</th>' +
      '<th>' + esc(e.poss || 'Poss') + '</th><th>PPP</th></tr></thead><tbody>' +
      /* Otto play types e non di piu': il foglio dello scouting non scende
         sotto lo 0.85 di riduzione (adattaFoglioScouting), quindi quello che
         non ci sta viene TAGLIATO invece che rimpicciolito. Otto coprono
         quasi tutti i possessi, e la coda della lista non serve a preparare
         una partita. */
      elenco.slice(0, 8).map(function (x) {
        return '<tr><td class="imp-nomi">' + esc(x.nome) + '</td><td>' + esc(x.quota) + '</td>' +
          '<td>' + esc(vuoto(x.possessi)) + '</td>' +
          '<td><b>' + esc(vuoto(x.ppp)) + '</b></td></tr>';
      }).join('') +
      '</tbody></table></div></div>';
  }

  function paginaSquadraHtml(team, opp, titolo, dati, etichette) {
    const g = globale;
    const s = dati || {};
    const e = etichette || {};
    const acc = (team && typeof team.colorHex === 'string' && /^#[0-9a-f]{6}$/i.test(team.colorHex)) ? team.colorHex : '#2f6ba8';
    const intestazione = g.scoutingLetterheadHtml ? g.scoutingLetterheadHtml(team, opp) : '';
    /* Come per i play type: le righe lasciate vuote non vanno sul foglio. */
    const q = (s.quintetti || []).filter(function (x) {
      return x && String(x.quintetto == null ? '' : x.quintetto).trim();
    }).slice(0, 6);   // sei quintetti sono quelli su cui si prepara
    const quintetti = q.length ? '<div class="print-report-box imp-larga">' +
      '<h4>' + esc(e.quintetti || 'Quintetti') + '</h4>' +
      '<div class="print-report-body"><table class="imp-tab">' +
      '<colgroup><col><col class="imp-c"><col class="imp-c"><col class="imp-c"><col class="imp-c"><col class="imp-c2"></colgroup>' +
      '<thead><tr>' +
        '<th>' + esc(e.quintetto || 'Quintetto') + '</th><th>+/-</th><th>' + esc(e.min || 'Min') + '</th>' +
        '<th>' + esc(e.poss || 'Poss') + '</th><th>' + esc(e.pt || 'Pt') + '</th><th>' + esc(e.tiro || 'Tiro') + '</th>' +
      '</tr></thead><tbody>' +
      q.map(function (x) {
        return '<tr><td class="imp-nomi">' + esc(x.quintetto) + '</td>' +
          '<td>' + esc(segno(x.plusMinus)) + '</td><td>' + esc(vuoto(x.minuti)) + '</td>' +
          '<td>' + esc(vuoto(x.possessi)) + '</td><td>' + esc(vuoto(x.punti)) + '</td>' +
          '<td>' + esc(vuoto(x.tiroPct)) + '</td></tr>';
      }).join('') + '</tbody></table></div></div>' : '';

    return '<div class="print-page pr-scouting-page" style="--pacc:' + acc + ';">' + (intestazione || '') +
      '<h4 class="print-page-title">' + esc(titolo || '') + '</h4>' +
      '<div class="print-report-grid">' +
        casella(e.attacco || 'Attacco', [
          [e.punti || 'Punti', s.punti],
          s.puntiPerPossesso ? [e.ppp || 'Punti per possesso', s.puntiPerPossesso] : null,
          [e.tiroCampo || 'Tiro', s.tiroPct, s.tiroSu],   // nella casella a meta' larghezza "Tiro dal campo" andava a capo
          [e.due || 'Da due', s.duePct, s.dueSu],
          [e.tre || 'Da tre', s.trePct, s.treSu],
          [e.liberi || 'Tiri liberi', s.liberiPct, s.liberiSu],
          [e.assist || 'Assist', s.assist],
        ], '', e.aPartita || 'Medie a partita') +
        casella(e.tabellone || 'Palla e tabellone', [
          [e.rimbalzi || 'Rimbalzi', s.rimbalzi],
          [e.rimbOff || 'Rimbalzi offensivi', s.rimbalziOff],
          [e.rimbDif || 'Rimbalzi difensivi', s.rimbalziDif],
          [e.pp || 'Palle perse', s.pallePerse],
          [e.rec || 'Recuperi', s.recuperi],
          [e.stoppate || 'Stoppate', s.stoppate],
        ], '', e.aPartita || 'Medie a partita') +
        tabellaPlayTypes(e.ptAttacco || 'Play types — attacco', (s.playTypes || {}).attacco, e) +
        tabellaPlayTypes(e.ptDifesa || 'Play types — difesa', (s.playTypes || {}).difesa, e) +
        quintetti +
      '</div>' +
      (s.fonte ? '<div class="imp-fonte">' + esc(s.fonte) + (s.data ? ' · ' + esc(s.data) : '') + '</div>' : '') +
    '</div>';
  }

  /* Due righe di stile, e nient'altro: tutto il resto lo danno le classi
     del programma. */
  const STILE = '' +
    '.imp-riga{display:flex;justify-content:space-between;gap:10px}' +
    '.imp-riga span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.imp-riga b{font-variant-numeric:tabular-nums;min-width:3.4em;text-align:right}' +
    '.imp-su{font-style:normal;opacity:.6;font-variant-numeric:tabular-nums;font-size:.9em;white-space:nowrap}' +
    '.imp-larga{grid-column:1/-1}' +
    '.imp-tab{width:100%;border-collapse:collapse;table-layout:fixed;padding-right:2px}' +
    '.imp-tab th{font-size:.8em;text-transform:uppercase;letter-spacing:.3px;opacity:.7;text-align:right;padding:0 0 3px 8px;font-weight:700}' +
    '.imp-tab th:first-child{text-align:left;padding-left:0}' +
    '.imp-tab td{text-align:right;padding:2px 0 2px 8px;font-variant-numeric:tabular-nums;vertical-align:top}' +
    '.imp-tab .imp-nomi{text-align:left;padding-left:0;line-height:1.25}' +
    '.imp-tab col.imp-c{width:42px}' +
    '.imp-tab col.imp-s{width:34px}' +
    '.imp-tab td.imp-nomi{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:0}' +
    '.imp-tab col.imp-c2{width:52px}' +
    '.imp-fonte{margin-top:6px;font-size:.72em;opacity:.55}';

  function aggiungiStile(documento) {
    const d = documento || globale.document;
    if (!d || d.getElementById('impStile')) return;
    const s = d.createElement('style');
    s.id = 'impStile';
    s.textContent = STILE;
    (d.head || d.documentElement).appendChild(s);
  }

  I.schedaAvanzataHtml = schedaAvanzataHtml;
  I.paginaPersonnelHtml = paginaPersonnelHtml;
  I.paginaSquadraHtml = paginaSquadraHtml;
  I.aggiungiStile = aggiungiStile;
  I.STILE = STILE;
})(typeof window !== 'undefined' ? window : globalThis);

/* ===================================================================
   I DUE PULSANTI

   Quello che fa premere il pulsante, in ordine:
   1. chiede il file (o piu' di uno insieme: giocatrici + quintetti);
   2. legge e riconosce da solo che file e';
   3. FA VEDERE COSA STA PER FARE — chi ha abbinato, chi no, e quante
      schede hanno gia' dei numeri scritti a mano che verrebbero
      sostituiti. Finche' non si preme Conferma non tocca niente;
   4. scrive, salva e ridisegna.

   Le statistiche normali finiscono nelle schede che ci sono gia'.
   Quelle avanzate e i play type stanno da parte, in statAvanzate, e si
   vedono solo nelle pagine nuove: cosi' chi non importa niente non si
   accorge che questa roba esiste.
   =================================================================== */
(function (globale) {
  'use strict';
  const I = globale.VDMImportaStatistiche;
  if (!I) return;
  const D = globale.document;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  /* Il quadratino grigio al posto della foto. Nel programma e' una const in
     cima al file: le const NON finiscono su window, quindi non si puo'
     scrivere window.DOSSIER_PLACEHOLDER — si legge per nome, e se un domani
     cambiasse nome qui c'e' lo stesso quadratino scritto a mano. */
  function segnaposto() {
    try { if (typeof DOSSIER_PLACEHOLDER !== 'undefined') return DOSSIER_PLACEHOLDER; } catch (e) {}
    return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><rect width='64' height='64' fill='%232a3450'/></svg>";
  }
  function num(v) {
    const n = parseFloat(String(v == null ? '' : v).replace(',', '.').replace('%', ''));
    return isFinite(n) ? n : null;
  }
  function somma(righe, campo) {
    let t = 0, c = 0;
    righe.forEach(function (r) { const n = num(r[campo]); if (n != null) { t += n; c++; } });
    return c ? t : null;
  }
  function uno(x) { return x == null ? null : String(Math.round(x * 10) / 10); }
  function perc(fatti, tentati) {
    if (fatti == null || !tentati) return null;
    return (fatti / tentati * 100).toFixed(1) + '%';
  }

  /* Le statistiche di squadra dalle righe delle giocatrici.
     Sono tutte MEDIE A PARTITA: sommandole fra le giocatrici viene la media
     a partita della squadra, che e' un conto giusto. I tiri li rifaccio dai
     tentativi e dai canestri, non dalla media delle percentuali — quella
     sarebbe sbagliata. Il punti-per-possesso NON si puo' ricavare da qui e
     resta vuoto finche' non si importa anche il file di squadra. */
  function statisticheSquadra(righe) {
    const tf = somma(righe, 'tiroFatti'), tt = somma(righe, 'tiroTentati');
    const cf = somma(righe, 'treFatti'), ct = somma(righe, 'treTentati');
    const lf = somma(righe, 'liberiFatti'), lt = somma(righe, 'liberiTentati');
    const df = (tf != null && cf != null) ? tf - cf : null;
    const dt = (tt != null && ct != null) ? tt - ct : null;
    /* "su" = quanti ne tirano a partita: canestri su tentativi. Senza questo
       una percentuale non dice niente — 40% da tre su due tiri a partita e
       40% su ventotto sono due partite diverse. */
    const su = function (fatti, tentati) {
      if (fatti == null || tentati == null) return null;
      return uno(fatti) + '/' + uno(tentati);
    };
    return {
      punti: uno(somma(righe, 'punti')),
      tiroPct: perc(tf, tt), tiroSu: su(tf, tt),
      duePct: perc(df, dt), dueSu: su(df, dt),
      trePct: perc(cf, ct), treSu: su(cf, ct),
      liberiPct: perc(lf, lt), liberiSu: su(lf, lt),
      assist: uno(somma(righe, 'assist')),
      rimbalzi: uno(somma(righe, 'rimbalzi')),
      rimbalziOff: uno(somma(righe, 'rimbalziOff')),
      rimbalziDif: uno(somma(righe, 'rimbalziDif')),
      pallePerse: uno(somma(righe, 'pallePerse')),
      recuperi: uno(somma(righe, 'recuperi')),
      stoppate: uno(somma(righe, 'stoppate')),
    };
  }

  /* Il roster dell'avversaria non sta dentro all'avversaria: sta nella lega,
     e si trova per NOME — e' lo stesso giro che fa gia'
     scoutingReportSlottedPlayers. Cosi' le statistiche importate dallo
     scouting finiscono nelle stesse schede che si aprono nel Personnel, e
     non in una seconda copia. */
  function squadraDellAvversaria(opp, league) {
    if (!opp || !league) return null;
    const chiave = (opp.name || '').trim().toLowerCase();
    if (!chiave) return null;
    const uguale = function (x) { return x && (x.name || '').trim().toLowerCase() === chiave; };
    return (league.teams || []).find(uguale) || (league.oppRosters || []).find(uguale) || null;
  }

  /* ------------------------------------------------ PLAY TYPES INCOLLATI

     La pagina Play Types di Hudl InStat NON ha il pulsante di esportazione:
     e' l'unica. Pero' la tabella si seleziona col mouse e si copia, e quello
     che finisce negli appunti e' testo con una riga per play type. Quindi
     invece del file si incolla il testo, e lo leggo da li'.

     Le righe arrivano cosi' (i separatori possono essere tabulazioni o
     spazi, dipende da come viene copiata):
        Catch and shoots   17.6 %   13.8   13.7   0.99   0.5   0
     cioe' nome, quota dei possessi, possessi, punti, punti per possesso,
     falli subiti, palle perse. Tengo le prime quattro: sono quelle che
     servono a un allenatore per decidere cosa togliere all'avversaria. */
  const NOMI_PLAYTYPE = ['catch and shoots', 'catch and drives', 'pick`n`rolls handler',
    "pick'n'rolls handler", 'pick`n`rolls roller', "pick'n'rolls roller", 'pick`n`pops',
    "pick'n'pops", 'cuts', 'transitions', 'post ups', 'screen offs', 'putbacks',
    'hand offs', 'isolation', 'off screens', 'spot ups', 'rolls', 'pops'];

  function normalizzaNome(x) {
    return String(x || '').replace(/[`'’]/g, "'").replace(/\s+/g, ' ').trim().toLowerCase();
  }
  function bello(x) {
    const t = String(x || '').replace(/[`’]/g, "'").replace(/\s+/g, ' ').trim();
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  /* Le righe che NON sono un play type ma stanno sotto a uno (si aprono con
     la freccia ▶) sono le giocatrici dentro a quel play type. Le prendo:
     sono quelle che riempiono le quattro righe in fondo alle schede. */
  function riga(pulita) {
    const m = pulita.match(/^([^0-9]+?)\s*[\t ]\s*([0-9].*)$/);
    if (!m) return null;
    const nome = m[1].replace(/[\t]/g, ' ').trim();
    if (!/[a-zA-Z]/.test(nome) || nome.length > 48) return null;
    const numeri = (m[2].match(/-?\d+(?:[.,]\d+)?/g) || []).map(function (x) { return x.replace(',', '.'); });
    if (numeri.length < 3) return null;
    return {
      nome: bello(nome), quota: numeri[0] + '%', possessi: numeri[1], punti: numeri[2],
      ppp: numeri[3] != null ? numeri[3] : '',
      falliSubiti: numeri[4] != null ? numeri[4] : '',
      pallePerse: numeri[5] != null ? numeri[5] : '',
    };
  }

  function leggiPlayTypes(testo) {
    const righe = String(testo || '').split(/\r?\n/);
    const trovate = [];
    let ultimo = null;
    righe.forEach(function (r) {
      const grezza = r.replace(/\u00a0/g, ' ');
      const pulita = grezza.replace(/^[\s▶►▸\-•]+/, '').trim();
      if (!pulita) return;
      const d = riga(pulita);
      if (!d) return;
      if (NOMI_PLAYTYPE.indexOf(normalizzaNome(d.nome)) >= 0) {
        d.giocatrici = [];
        trovate.push(d);
        ultimo = d;
      } else if (ultimo) {
        ultimo.giocatrici.push(d);
      }
    });
    const visti = {};
    let taglio = -1;
    for (let i = 0; i < trovate.length; i++) {
      const k = normalizzaNome(trovate[i].nome);
      if (visti[k] != null) { taglio = i; break; }
      visti[k] = i;
    }
    if (taglio > 0) return { attacco: trovate.slice(0, taglio), difesa: trovate.slice(taglio) };
    return { attacco: trovate, difesa: [] };
  }

  /* Da tutti i play types, cosa fa OGNI giocatrice: le due cose che fa di
     piu' in attacco e le due che le fanno di piu' contro in difesa. Quattro
     righe, che sono esattamente quelle in fondo alla scheda: cosa cerca e
     cosa le si puo' far fare. */
  function raccogli(elenco, dove) {
    (elenco || []).forEach(function (pt) {
      (pt.giocatrici || []).forEach(function (g) {
        const k = I.cognome(g.nome);
        if (!k) return;
        if (!dove[k]) dove[k] = { nome: g.nome, attacco: [], difesa: [] };
        dove[k][pt._lato].push({ tipo: pt.nome, quota: g.quota, ppp: g.ppp, possessi: g.possessi });
      });
    });
  }
  function playTypesPerGiocatrice(playTypes) {
    const per = {};
    (playTypes && playTypes.attacco || []).forEach(function (x) { x._lato = 'attacco'; });
    (playTypes && playTypes.difesa || []).forEach(function (x) { x._lato = 'difesa'; });
    raccogli(playTypes && playTypes.attacco, per);
    raccogli(playTypes && playTypes.difesa, per);
    const giu = function (a, b) { return (parseFloat(b.quota) || 0) - (parseFloat(a.quota) || 0); };
    /* "frase" e non "scrivi": piu' sotto c'e' gia' una funzione scrivi() che
       mette i dati nelle schede, e due cose con lo stesso nome nello stesso
       file sono l'errore che ci e' gia' costato «stato is not a function». */
    const frase = function (v, sigla) {
      return sigla + ' ' + v.tipo + ' ' + v.quota + (v.ppp ? ' (' + v.ppp + ')' : '');
    };
    Object.keys(per).forEach(function (k) {
      per[k].attacco.sort(giu);
      per[k].difesa.sort(giu);
      const righe = per[k].attacco.slice(0, 2).map(function (v) { return frase(v, 'ATT'); })
        .concat(per[k].difesa.slice(0, 2).map(function (v) { return frase(v, 'DIF'); }));
      per[k].testo = righe.join(' - ');
    });
    return per;
  }

  /* ------------------------------------------------ SCEGLIERE I FILE */  /* ------------------------------------------------ SCEGLIERE I FILE */
  function chiediFile() {
    return new Promise(function (ok) {
      const inp = D.createElement('input');
      inp.type = 'file';
      /* Il .json e' quello che prepara l'IA ed e' la strada normale: va per
         primo. Col filtro fermo a .xlsx il file dell'IA appariva spento nel
         selettore, e sembrava che chiedesse una cartella. */
      inp.accept = '.json,.xlsx,application/json';
      inp.multiple = true;
      inp.style.display = 'none';
      inp.onchange = function () { const f = Array.from(inp.files || []); inp.remove(); ok(f); };
      D.body.appendChild(inp);
      inp.click();
    });
  }

  async function leggiTutti(files) {
    const fuori = { giocatrici: null, quintetti: null, ia: null, nonCapiti: [] };
    for (const f of files) {
      if (/\.json$/i.test(f.name)) {
        try {
          const j = daJson(await leggiJson(f));
          if (j && (j.giocatrici.length || j.squadraStat || j.quintetti || j.playTypes)) {
            j.nomeFile = f.name;
            fuori.ia = j;
          } else fuori.nonCapiti.push(f.name + ' (dentro non c\'e\' niente che so leggere)');
        } catch (e) { fuori.nonCapiti.push(f.name + ' (' + e.message + ')'); }
        continue;
      }
      let griglia;
      try { griglia = await I.leggiFoglio(f); }
      catch (e) { fuori.nonCapiti.push(f.name + ' (non si apre)'); continue; }
      const r = I.riconosciFormato(griglia);
      if (!r || !r.formato) { fuori.nonCapiti.push(f.name); continue; }
      const righe = I.righeInOggetti(griglia, r.formato, r.intestazioni);
      if (r.formato.id === 'instat-giocatrici') fuori.giocatrici = { nome: f.name, righe: righe };
      else if (r.formato.id === 'instat-quintetti') fuori.quintetti = { nome: f.name, righe: righe };
      else fuori.nonCapiti.push(f.name);
    }
    return fuori;
  }

  /* ------------------------------------------------ IL FILE DELL'IA

     La strada senza mani: il Claude (o altra IA) di chi ha comprato il
     programma gira sulle pagine del fornitore di statistiche, mette tutto
     in UN file .json e lo salva. Qui lo si sceglie e si riempie tutto in
     una volta: foto, statistiche, avanzate, play types, quintetti.

     Niente porte aperte, niente programmi da installare, niente password da
     dare a nessuno: un file, come tutti gli altri. Funziona uguale su Mac e
     su Windows e con qualsiasi IA, perche' e' solo testo.

     La forma e' quella descritta in ISTRUZIONI_IA (piu' sotto): e' la
     stessa che si consegna all'IA perche' sappia cosa scrivere. */
  function leggiJson(file) {
    return new Promise(function (ok, no) {
      const fr = new FileReader();
      fr.onerror = function () { no(new Error('non si legge')); };
      fr.onload = function () {
        try { ok(JSON.parse(String(fr.result))); }
        catch (e) { no(new Error('non e\' un file JSON valido')); }
      };
      fr.readAsText(file);
    });
  }

  function daJson(j) {
    if (!j || typeof j !== 'object') return null;
    const g = Array.isArray(j.giocatrici) ? j.giocatrici : [];
    return {
      squadra: j.squadra || '',
      fonte: j.fonte || 'IA',
      data: j.data || '',
      giocatrici: g.map(function (x) {
        return {
          numero: x.numero == null ? '' : String(x.numero),
          nome: x.nome || '',
          ruolo: x.ruolo || x.role || '',
          altezza: x.altezza || x.height || '',
          nascita: x.nascita || x.anno || x.birthYear || x.nato || '',
          foto: x.foto || '',
          stats: x.stats || null,
          avanzate: x.avanzate || x.statAvanzate || null,
          playTypes: typeof x.playTypes === 'string' ? x.playTypes : '',
        };
      }),
      logo: j.logo || j.stemma || '',
      squadraStat: j.squadraStat || j.squadra_stat || null,
      quintetti: Array.isArray(j.quintetti) ? j.quintetti : null,
      playTypes: j.playTypes || null,
    };
  }

  /* Le foto: si prova a portarle DENTRO al lavoro, cosi' restano anche
     senza internet e finiscono nel PDF. Se il sito che le ospita non lo
     permette (e la maggior parte non lo permette) si tiene l'indirizzo: la
     foto si vede lo stesso finche' si e' collegati. */
  async function portaDentroLaFoto(url) {
    if (!url || /^data:/.test(url)) return url || '';
    try {
      const r = await fetch(url, { mode: 'cors' });
      if (!r.ok) return url;
      const b = await r.blob();
      if (b.size > 900000) return url;
      return await new Promise(function (ok) {
        const fr = new FileReader();
        fr.onload = function () { ok(String(fr.result)); };
        fr.onerror = function () { ok(url); };
        fr.readAsDataURL(b);
      });
    } catch (e) { return url; }
  }

  /* Quello che si consegna all'IA. Sta scritto in inglese perche' le pagine
     da cui deve leggere sono in inglese e perche' cosi' va bene a qualsiasi
     IA; la spiegazione intorno resta nella lingua del programma. */
  /* LE PAROLE DEL PANNELLO, NELLE 12 LINGUE DEL PROGRAMMA (30/09/2026).
     Il pannello era nato in italiano e basta: un coach lituano apriva la
     funzione nuova e non capiva niente. La richiesta per l'IA resta in
     inglese (vedi sopra, e' giusto cosi'); qui c'e' solo quello che legge
     il coach. Se una lingua manca si ripiega sull'inglese: non resta mai
     vuoto e non esce mai italiano a chi italiano non e'. */
  const PAROLE = {
    en: {
      c_logo: 'Team logo',
      c_foto: 'Player photos',
      c_player: 'Player data — jersey number, position, height, year',
      c_stat: 'Statistics',
      c_avanzate: 'Advanced statistics — team and players, lineups',
      c_playtype: 'Play types — offence and defence, team and players',
      p_u5: 'Last 5 games', p_u10: 'Last 10 games',
      p_stag: 'Current season', p_scorsa: 'Last season',
      intro1: '<b>VDM does not download anything by itself.</b> It does not go online and it does not search: here you prepare the <b>instructions to give to YOUR AI</b> — Claude, or whichever one you use. You copy them, you paste them, and <b>it is the AI that searches, downloads and prepares the file</b>. VDM reads that file and fills in the roster, jersey numbers, photos, statistics, advanced statistics and play types by itself, in the cards and in the report.',
      intro2: 'VDM is <b>built to work with AI</b>: the one you already use every day is fine — it is the AI that goes online, you do not have to switch anything on and you are not tied to any provider.',
      intro3: '<b>Start from step 1.</b> Until your AI prepares the data there is nothing to pick up here, and the program stays as it is.',
      t1: '1 · Tell your AI what to look for',
      t1s: 'Tick what you need, copy the request and paste it into your AI (Claude or another). It searches and saves the file.',
      part: 'How many games:',
      bcopia: '📋 Copy the request for your AI',
      bcopias: 'and paste it into your AI',
      t2: '2 · When your AI has finished',
      t2s: 'If you have connected the folder above you do not have to do anything: the data comes in by itself. Otherwise pick up the file it saved for you.',
      bfile: 'Pick up what it prepared…', nulla: 'nothing yet',
      dett: 'Already have a table to hand? Open it here',
      detts: 'Select it where it is, copy it and paste it below. Only needed if you prefer to do it by hand.',
      nincol: 'nothing pasted',
      crea: 'Add the players who are not in the roster yet',
      d_riatt: '📂 AI DATA — needs re-enabling',
      d_riatt1: 'The folder ',
      d_riatt2: ' is still the same one: the system just wants you to confirm permission to read it once more.',
      d_riattb: 'Re-enable',
      d_cambia: 'or change folder',
      d_attivo: '📂 AI DATA — on',
      d_guardo1: 'I am watching the folder ',
      d_guardo2: '. When your AI saves a file in there, the data comes in by itself: you do not have to press anything.',
      d_smetti: 'Stop watching it',
      d_titolo: '📂 AI DATA',
      d_indica: 'Point to a folder once and you will never have to choose a file again: your AI saves into it, and VDM fills itself in.',
      d_collega: 'Connect a folder…',
      d_riattivato: 'AI DATA back on.',
      k_copia1: 'Copy this and paste it into your AI. It already says to save the file in the folder ',
      k_copia2: ': the program picks it up from there by itself.',
      k_primacart: '<b>Connect a folder first</b> (the AI DATA box below): without it your AI does not know where to put the file and you have to go and find it by hand every time.',
      t_scegli: 'Choose a team first.',
      t_nocart: 'Folders cannot be connected here.',
      t_cartok: 'Folder connected: ',
      a_amano: 'What the AI found is already in here and can be corrected. What is missing you write yourself. Rows left empty do not go on the sheet.',
      s_giocatrici: 'players',
      s_foto: 'photos',
      s_statsq: 'team statistics',
      s_quintetti: 'lineups',
      s_nonletti: 'not read: ',
      s_nulla: 'there is nothing in here I can read',
      s_nopt: 'I do not recognise any play type in here',
      i_manca1: 'Imported. But the file did not have: ',
      i_manca2: ' — those numbers are only on InStat/Synergy.',
      i_stemma: 'the crest',
      i_nuove: 'new cards',
      i_ptsu: 'play types on ',
      i_importate: 'Imported: ',
      i_statimp: 'Statistics imported.',
      i_avsq: 'team advanced statistics',
      i_pt: 'play types',
      t_sceglia: 'Choose an opponent first.',
      t_arrivato: 'Got ',
      t_nolega: '»: that team is not in the league.',
      h_avsq: 'Team advanced statistics',
      i_schede: 'cards',
      i_aggiornati: 'data updated',
      i_fonte: 'prepared by AI',
      sp_av: 'Advanced statistics',
      sp_avT: 'The page at the end of the Personnel with the advanced statistics and the play types',
      n_punti: 'Points',
      n_ppp: 'Points per possession',
      n_tiro: 'Field goals',
      n_due: 'Two-pointers',
      n_tre: 'Three-pointers',
      n_liberi: 'Free throws',
      n_assist: 'Assists',
      n_rimbalzi: 'Rebounds',
      n_rimbOff: 'Offensive rebounds',
      n_rimbDif: 'Defensive rebounds',
      n_perse: 'Turnovers',
      n_recuperi: 'Steals',
      n_stoppate: 'Blocks',
      col_pt: 'Play type',
      col_quintetto: 'Lineup',
      h_foglio: '📈 Team advanced sheet — can also be typed by hand',
      h_medie: 'Per-game averages',
      h_ptatt: 'Play types — offence',
      h_ptdif: 'Play types — defence',
      h_quintetti: 'Lineups',
      h_fonte: 'Source',
      ph_fonte: 'e.g. Hudl InStat — Serie A1, 27 games',
      h_avpt: 'Advanced statistics and play types',
      tit_ia: 'USE AI',
      tit_avv: 'opponent',
      a_att: ' in offence, ',
      a_dif: ' in defence',
      a_ppp: ' points per possession',
      a_altri: '…and others: ',
      h_attacco: 'Offence',
      h_tabellone: 'Ball and board',
      ann: 'Cancel', scrivi: 'Write into the cards'
    },
    it: {
      c_logo: 'Logo della squadra',
      c_foto: 'Foto delle giocatrici',
      c_player: 'Dati player — numero di maglia, ruolo, altezza, anno',
      c_stat: 'Statistiche',
      c_avanzate: 'Statistiche avanzate — squadra e giocatrici, quintetti',
      c_playtype: 'Play type — attacco e difesa, squadra e giocatrici',
      p_u5: 'Ultime 5 partite', p_u10: 'Ultime 10 partite',
      p_stag: 'Stagione in corso', p_scorsa: 'Stagione scorsa',
      intro1: '<b>VDM non scarica niente da solo.</b> Non va su internet e non cerca: qui si prepara l\'<b>ordine da dare alla TUA IA</b> — Claude, o quella che usi. Lo copi, glielo incolli, e <b>e\' lei che cerca, scarica e ti prepara il file</b>. VDM quel file lo legge e riempie da solo roster, numeri di maglia, foto, statistiche, statistiche avanzate e play type, nelle schede e nel report.',
      intro2: 'VDM e\' <b>fatto apposta per lavorare con l\'IA</b>: va bene quella che usi gia\' tutti i giorni — su internet ci va lei, tu non devi attivare niente e non sei legato a nessun fornitore.',
      intro3: '<b>Si parte dal punto 1.</b> Finche\' la tua IA non ti prepara i dati, qui non c\'e\' niente da prendere e il programma resta com\'e\'.',
      t1: '1 · Di\' alla tua IA cosa cercare',
      t1s: 'Spunta quello che ti serve, copia la richiesta e incollala nella tua IA (Claude o un\'altra). Lei cerca e salva il file.',
      part: 'Su quante partite:',
      bcopia: '📋 Copia la richiesta per la tua IA',
      bcopias: 'e incollala nel riquadro della tua IA',
      t2: '2 · Quando la tua IA ha finito',
      t2s: 'Se hai collegato la cartella qui sopra non devi fare niente: i dati entrano da soli. Altrimenti prendi tu il file che ti ha salvato.',
      bfile: 'Prendi quello che ha preparato…', nulla: 'niente ancora',
      dett: 'Hai gia\' una tabella sottomano? Aprila qui',
      detts: 'Selezionala dove sta, copia e incolla qui sotto. Serve solo se preferisci fare a mano.',
      nincol: 'niente incollato',
      crea: 'Aggiungi le giocatrici che nel roster non ci sono ancora',
      d_riatt: '📂 DATI IA — da riattivare',
      d_riatt1: 'La cartella ',
      d_riatt2: ' e\' sempre quella: il sistema vuole solo che tu confermi un\'altra volta il permesso di leggerla.',
      d_riattb: 'Riattiva',
      d_cambia: 'oppure cambia cartella',
      d_attivo: '📂 DATI IA — attivo',
      d_guardo1: 'Guardo la cartella ',
      d_guardo2: '. Quando la tua IA ci salva dentro un file, i dati entrano da soli: non devi premere niente.',
      d_smetti: 'Smetti di guardarla',
      d_titolo: '📂 DATI IA',
      d_indica: 'Indica una cartella una volta sola e non dovrai piu\' scegliere nessun file: la tua IA ci salva dentro, e VDM si riempie da solo.',
      d_collega: 'Collega una cartella…',
      d_riattivato: 'DATI IA riattivato.',
      k_copia1: 'Copia questo e incollalo nella tua IA. Dentro c\'e\' gia\' scritto di salvare il file nella cartella ',
      k_copia2: ': da li\' il programma lo prende da solo.',
      k_primacart: '<b>Prima collega una cartella</b> (il riquadro DATI IA qui sotto): senza, l\'IA non sa dove mettere il file e devi andartelo a cercare a mano ogni volta.',
      t_scegli: 'Prima scegli una squadra.',
      t_nocart: 'Qui non si possono collegare cartelle.',
      t_cartok: 'Cartella collegata: ',
      a_amano: 'Quello che l\'IA ha trovato e\' gia\' qui dentro e si corregge. Quello che manca lo scrivi tu. Le righe lasciate vuote non vanno sul foglio.',
      s_giocatrici: 'giocatrici',
      s_foto: 'foto',
      s_statsq: 'statistiche di squadra',
      s_quintetti: 'quintetti',
      s_nonletti: 'non letti: ',
      s_nulla: 'qui dentro non c\'e\' niente che so leggere',
      s_nopt: 'qui dentro non riconosco nessun play type',
      i_manca1: 'Importato. Ma nel file non c\'erano: ',
      i_manca2: ' — quei numeri stanno solo su InStat/Synergy.',
      i_stemma: 'lo stemma',
      i_nuove: 'schede nuove',
      i_ptsu: 'play types su ',
      i_importate: 'Importate: ',
      i_statimp: 'Statistiche importate.',
      i_avsq: 'statistiche avanzate di squadra',
      i_pt: 'play type',
      t_sceglia: 'Prima scegli un\'avversaria.',
      t_arrivato: 'Arrivato ',
      t_nolega: '»: quella squadra nella lega non c\'e\'.',
      h_avsq: 'Statistiche avanzate di squadra',
      i_schede: 'schede',
      i_aggiornati: 'dati aggiornati',
      i_fonte: 'preparato dall\'IA',
      sp_av: 'Statistiche avanzate',
      sp_avT: 'La pagina in coda al Personnel con le statistiche avanzate e i play type',
      n_punti: 'Punti',
      n_ppp: 'Punti per possesso',
      n_tiro: 'Tiro',
      n_due: 'Da due',
      n_tre: 'Da tre',
      n_liberi: 'Tiri liberi',
      n_assist: 'Assist',
      n_rimbalzi: 'Rimbalzi',
      n_rimbOff: 'Rimbalzi offensivi',
      n_rimbDif: 'Rimbalzi difensivi',
      n_perse: 'Palle perse',
      n_recuperi: 'Recuperi',
      n_stoppate: 'Stoppate',
      col_pt: 'Play type',
      col_quintetto: 'Quintetto',
      h_foglio: '📈 Foglio avanzato di squadra — si scrive anche a mano',
      h_medie: 'Medie a partita',
      h_ptatt: 'Play types — attacco',
      h_ptdif: 'Play types — difesa',
      h_quintetti: 'Quintetti',
      h_fonte: 'Fonte',
      ph_fonte: 'es. Hudl InStat — Serie A1, 27 gare',
      h_avpt: 'Statistiche avanzate e play type',
      tit_ia: 'USO IA',
      tit_avv: 'avversaria',
      a_att: ' in attacco, ',
      a_dif: ' in difesa',
      a_ppp: ' punti per possesso',
      a_altri: '…e altri ',
      h_attacco: 'Attacco',
      h_tabellone: 'Palla e tabellone',
      ann: 'Annulla', scrivi: 'Scrivi nelle schede'
    },
    es: {
      c_logo: 'Escudo del equipo',
      c_foto: 'Fotos de las jugadoras',
      c_player: 'Datos de jugadora — dorsal, posición, altura, año',
      c_stat: 'Estadísticas',
      c_avanzate: 'Estadísticas avanzadas — equipo y jugadoras, quintetos',
      c_playtype: 'Play types — ataque y defensa, equipo y jugadoras',
      p_u5: 'Últimos 5 partidos', p_u10: 'Últimos 10 partidos',
      p_stag: 'Temporada actual', p_scorsa: 'Temporada pasada',
      intro1: '<b>VDM no descarga nada por su cuenta.</b> No entra en internet y no busca: aquí se prepara la <b>orden que le das a TU IA</b> — Claude, o la que uses. La copias, se la pegas, y <b>es ella la que busca, descarga y te prepara el archivo</b>. VDM lee ese archivo y rellena solo la plantilla, los dorsales, las fotos, las estadísticas, las estadísticas avanzadas y los play types, en las fichas y en el informe.',
      intro2: 'VDM está <b>hecho para trabajar con la IA</b>: vale la que ya usas todos los días — a internet va ella, tú no tienes que activar nada y no dependes de ningún proveedor.',
      intro3: '<b>Se empieza por el punto 1.</b> Hasta que tu IA no te prepare los datos, aquí no hay nada que recoger y el programa se queda como está.',
      t1: '1 · Dile a tu IA qué buscar',
      t1s: 'Marca lo que necesites, copia la petición y pégala en tu IA (Claude u otra). Ella busca y guarda el archivo.',
      part: 'Cuántos partidos:',
      bcopia: '📋 Copiar la petición para tu IA',
      bcopias: 'y pégala en el cuadro de tu IA',
      t2: '2 · Cuando tu IA haya terminado',
      t2s: 'Si has conectado la carpeta de arriba no tienes que hacer nada: los datos entran solos. Si no, coge tú el archivo que te ha guardado.',
      bfile: 'Coger lo que ha preparado…', nulla: 'nada todavía',
      dett: '¿Ya tienes una tabla a mano? Ábrela aquí',
      detts: 'Selecciónala donde esté, cópiala y pégala abajo. Solo hace falta si prefieres hacerlo a mano.',
      nincol: 'nada pegado',
      crea: 'Añadir las jugadoras que todavía no están en la plantilla',
      d_riatt: '📂 DATOS IA — hay que reactivar',
      d_riatt1: 'La carpeta ',
      d_riatt2: ' sigue siendo la misma: el sistema solo quiere que confirmes otra vez el permiso para leerla.',
      d_riattb: 'Reactivar',
      d_cambia: 'o cambia de carpeta',
      d_attivo: '📂 DATOS IA — activo',
      d_guardo1: 'Estoy mirando la carpeta ',
      d_guardo2: '. Cuando tu IA guarde ahí un archivo, los datos entran solos: no tienes que pulsar nada.',
      d_smetti: 'Dejar de mirarla',
      d_titolo: '📂 DATOS IA',
      d_indica: 'Indica una carpeta una sola vez y no tendrás que elegir ningún archivo: tu IA guarda ahí dentro y VDM se rellena solo.',
      d_collega: 'Conectar una carpeta…',
      d_riattivato: 'DATOS IA reactivado.',
      k_copia1: 'Copia esto y pégalo en tu IA. Dentro ya está escrito que guarde el archivo en la carpeta ',
      k_copia2: ': desde ahí el programa lo coge solo.',
      k_primacart: '<b>Conecta antes una carpeta</b> (el recuadro DATOS IA de abajo): sin ella tu IA no sabe dónde poner el archivo y tienes que ir a buscarlo a mano cada vez.',
      t_scegli: 'Elige primero un equipo.',
      t_nocart: 'Aquí no se pueden conectar carpetas.',
      t_cartok: 'Carpeta conectada: ',
      a_amano: 'Lo que la IA ha encontrado ya está aquí dentro y se puede corregir. Lo que falta lo escribes tú. Las filas que dejes vacías no salen en la hoja.',
      s_giocatrici: 'jugadoras',
      s_foto: 'fotos',
      s_statsq: 'estadísticas de equipo',
      s_quintetti: 'quintetos',
      s_nonletti: 'no leídos: ',
      s_nulla: 'aquí dentro no hay nada que sepa leer',
      s_nopt: 'aquí dentro no reconozco ningún play type',
      i_manca1: 'Importado. Pero en el archivo no estaban: ',
      i_manca2: ' — esos números solo están en InStat/Synergy.',
      i_stemma: 'el escudo',
      i_nuove: 'fichas nuevas',
      i_ptsu: 'play types en ',
      i_importate: 'Importado: ',
      i_statimp: 'Estadísticas importadas.',
      i_avsq: 'estadísticas avanzadas de equipo',
      i_pt: 'play types',
      t_sceglia: 'Elige primero un rival.',
      t_arrivato: 'Ha llegado ',
      t_nolega: '»: ese equipo no está en la liga.',
      h_avsq: 'Estadísticas avanzadas de equipo',
      i_schede: 'fichas',
      i_aggiornati: 'datos actualizados',
      i_fonte: 'preparado por la IA',
      sp_av: 'Estadísticas avanzadas',
      sp_avT: 'La página al final del Personnel con las estadísticas avanzadas y los play types',
      n_punti: 'Puntos',
      n_ppp: 'Puntos por posesión',
      n_tiro: 'Tiros de campo',
      n_due: 'Tiros de dos',
      n_tre: 'Triples',
      n_liberi: 'Tiros libres',
      n_assist: 'Asistencias',
      n_rimbalzi: 'Rebotes',
      n_rimbOff: 'Rebotes ofensivos',
      n_rimbDif: 'Rebotes defensivos',
      n_perse: 'Pérdidas',
      n_recuperi: 'Recuperaciones',
      n_stoppate: 'Tapones',
      col_pt: 'Play type',
      col_quintetto: 'Quinteto',
      h_foglio: '📈 Hoja avanzada de equipo — también se escribe a mano',
      h_medie: 'Medias por partido',
      h_ptatt: 'Play types — ataque',
      h_ptdif: 'Play types — defensa',
      h_quintetti: 'Quintetos',
      h_fonte: 'Fuente',
      ph_fonte: 'p. ej. Hudl InStat — Serie A1, 27 partidos',
      h_avpt: 'Estadísticas avanzadas y play types',
      tit_ia: 'USA LA IA',
      tit_avv: 'rival',
      a_att: ' en ataque, ',
      a_dif: ' en defensa',
      a_ppp: ' puntos por posesión',
      a_altri: '…y otros ',
      h_attacco: 'Ataque',
      h_tabellone: 'Balón y tablero',
      ann: 'Cancelar', scrivi: 'Escribir en las fichas'
    },
    fr: {
      c_logo: 'Logo de l\'équipe',
      c_foto: 'Photos des joueuses',
      c_player: 'Données joueuse — numéro, poste, taille, année',
      c_stat: 'Statistiques',
      c_avanzate: 'Statistiques avancées — équipe et joueuses, cinq majeurs',
      c_playtype: 'Play types — attaque et défense, équipe et joueuses',
      p_u5: '5 derniers matchs', p_u10: '10 derniers matchs',
      p_stag: 'Saison en cours', p_scorsa: 'Saison passée',
      intro1: '<b>VDM ne télécharge rien tout seul.</b> Il ne va pas sur internet et ne cherche pas : ici on prépare la <b>consigne à donner à TON IA</b> — Claude, ou celle que tu utilises. Tu la copies, tu la lui colles, et <b>c\'est elle qui cherche, télécharge et te prépare le fichier</b>. VDM lit ce fichier et remplit tout seul l\'effectif, les numéros, les photos, les statistiques, les statistiques avancées et les play types, dans les fiches et dans le rapport.',
      intro2: 'VDM est <b>fait pour travailler avec l\'IA</b> : celle que tu utilises déjà tous les jours convient — c\'est elle qui va sur internet, tu n\'as rien à activer et tu n\'es lié à aucun fournisseur.',
      intro3: '<b>On commence par le point 1.</b> Tant que ton IA ne t\'a pas préparé les données, il n\'y a rien à prendre ici et le programme reste tel quel.',
      t1: '1 · Dis à ton IA quoi chercher',
      t1s: 'Coche ce qu\'il te faut, copie la demande et colle-la dans ton IA (Claude ou une autre). Elle cherche et enregistre le fichier.',
      part: 'Sur combien de matchs :',
      bcopia: '📋 Copier la demande pour ton IA',
      bcopias: 'et colle-la dans le cadre de ton IA',
      t2: '2 · Quand ton IA a fini',
      t2s: 'Si tu as relié le dossier ci-dessus tu n\'as rien à faire : les données entrent toutes seules. Sinon prends toi-même le fichier qu\'elle t\'a enregistré.',
      bfile: 'Prendre ce qu\'elle a préparé…', nulla: 'rien encore',
      dett: 'Tu as déjà un tableau sous la main ? Ouvre-le ici',
      detts: 'Sélectionne-le où il est, copie et colle ci-dessous. Utile seulement si tu préfères le faire à la main.',
      nincol: 'rien de collé',
      crea: 'Ajouter les joueuses qui ne sont pas encore dans l\'effectif',
      d_riatt: '📂 DONNÉES IA — à réactiver',
      d_riatt1: 'Le dossier ',
      d_riatt2: ' est toujours le même : le système veut juste que tu confirmes une fois de plus l\'autorisation de le lire.',
      d_riattb: 'Réactiver',
      d_cambia: 'ou change de dossier',
      d_attivo: '📂 DONNÉES IA — actif',
      d_guardo1: 'Je surveille le dossier ',
      d_guardo2: '. Quand ton IA y enregistre un fichier, les données entrent toutes seules : tu n\'as rien à presser.',
      d_smetti: 'Arrêter de le surveiller',
      d_titolo: '📂 DONNÉES IA',
      d_indica: 'Indique un dossier une seule fois et tu n\'auras plus à choisir aucun fichier : ton IA enregistre dedans, et VDM se remplit tout seul.',
      d_collega: 'Relier un dossier…',
      d_riattivato: 'DONNÉES IA réactivé.',
      k_copia1: 'Copie ceci et colle-le dans ton IA. Il y est déjà écrit d\'enregistrer le fichier dans le dossier ',
      k_copia2: ' : de là le programme le prend tout seul.',
      k_primacart: '<b>Relie d\'abord un dossier</b> (le cadre DONNÉES IA ci-dessous) : sans lui ton IA ne sait pas où mettre le fichier et tu dois aller le chercher à la main à chaque fois.',
      t_scegli: 'Choisis d\'abord une équipe.',
      t_nocart: 'Ici on ne peut pas relier de dossier.',
      t_cartok: 'Dossier relié : ',
      a_amano: 'Ce que l\'IA a trouvé est déjà là-dedans et se corrige. Ce qui manque, tu l\'écris toi-même. Les lignes laissées vides ne vont pas sur la feuille.',
      s_giocatrici: 'joueuses',
      s_foto: 'photos',
      s_statsq: 'statistiques d\'équipe',
      s_quintetti: 'cinq majeurs',
      s_nonletti: 'non lus : ',
      s_nulla: 'il n\'y a rien là-dedans que je sache lire',
      s_nopt: 'je ne reconnais aucun play type là-dedans',
      i_manca1: 'Importé. Mais le fichier n\'avait pas : ',
      i_manca2: ' — ces chiffres ne sont que sur InStat/Synergy.',
      i_stemma: 'le logo',
      i_nuove: 'nouvelles fiches',
      i_ptsu: 'play types sur ',
      i_importate: 'Importé : ',
      i_statimp: 'Statistiques importées.',
      i_avsq: 'statistiques avancées d\'équipe',
      i_pt: 'play types',
      t_sceglia: 'Choisis d\'abord un adversaire.',
      t_arrivato: 'Reçu ',
      t_nolega: '» : cette équipe n\'est pas dans la ligue.',
      h_avsq: 'Statistiques avancées d\'équipe',
      i_schede: 'fiches',
      i_aggiornati: 'données mises à jour',
      i_fonte: 'préparé par l\'IA',
      sp_av: 'Statistiques avancées',
      sp_avT: 'La page à la fin du Personnel avec les statistiques avancées et les play types',
      n_punti: 'Points',
      n_ppp: 'Points par possession',
      n_tiro: 'Tirs',
      n_due: 'À deux points',
      n_tre: 'À trois points',
      n_liberi: 'Lancers francs',
      n_assist: 'Passes décisives',
      n_rimbalzi: 'Rebonds',
      n_rimbOff: 'Rebonds offensifs',
      n_rimbDif: 'Rebonds défensifs',
      n_perse: 'Ballons perdus',
      n_recuperi: 'Interceptions',
      n_stoppate: 'Contres',
      col_pt: 'Play type',
      col_quintetto: 'Cinq',
      h_foglio: '📈 Feuille avancée d\'équipe — peut aussi s\'écrire à la main',
      h_medie: 'Moyennes par match',
      h_ptatt: 'Play types — attaque',
      h_ptdif: 'Play types — défense',
      h_quintetti: 'Cinq majeurs',
      h_fonte: 'Source',
      ph_fonte: 'ex. Hudl InStat — Serie A1, 27 matchs',
      h_avpt: 'Statistiques avancées et play types',
      tit_ia: 'UTILISE L\'IA',
      tit_avv: 'adversaire',
      a_att: ' en attaque, ',
      a_dif: ' en défense',
      a_ppp: ' points par possession',
      a_altri: '…et d\'autres ',
      h_attacco: 'Attaque',
      h_tabellone: 'Ballon et panneau',
      ann: 'Annuler', scrivi: 'Écrire dans les fiches'
    },
    pt: {
      c_logo: 'Emblema da equipa', c_foto: 'Fotos das jogadoras',
      c_player: 'Dados da jogadora — número, posição, altura, ano',
      c_stat: 'Estatísticas',
      c_avanzate: 'Estatísticas avançadas — equipa e jogadoras, cincos',
      c_playtype: 'Play types — ataque e defesa, equipa e jogadoras',
      p_u5: 'Últimos 5 jogos', p_u10: 'Últimos 10 jogos',
      p_stag: 'Época atual', p_scorsa: 'Época passada',
      intro1: '<b>O VDM não descarrega nada sozinho.</b> Não vai à internet e não procura: aqui prepara-se a <b>ordem a dar à TUA IA</b> — o Claude, ou a que usares. Copias, colas-lha, e <b>é ela que procura, descarrega e te prepara o ficheiro</b>. O VDM lê esse ficheiro e preenche sozinho o plantel, os números, as fotos, as estatísticas, as estatísticas avançadas e os play types, nas fichas e no relatório.',
      intro2: 'O VDM é <b>feito para trabalhar com a IA</b>: serve a que já usas todos os dias — à internet vai ela, tu não tens de ativar nada e não ficas preso a nenhum fornecedor.',
      intro3: '<b>Começa-se pelo ponto 1.</b> Enquanto a tua IA não te preparar os dados, aqui não há nada para ir buscar e o programa fica como está.',
      t1: '1 · Diz à tua IA o que procurar',
      t1s: 'Marca o que precisas, copia o pedido e cola-o na tua IA (Claude ou outra). Ela procura e guarda o ficheiro.',
      part: 'Quantos jogos:',
      bcopia: '📋 Copiar o pedido para a tua IA',
      bcopias: 'e cola-o na caixa da tua IA',
      t2: '2 · Quando a tua IA tiver acabado',
      t2s: 'Se ligaste a pasta aqui em cima não tens de fazer nada: os dados entram sozinhos. Caso contrário vai tu buscar o ficheiro que ela guardou.',
      bfile: 'Ir buscar o que preparou…', nulla: 'ainda nada',
      dett: 'Já tens uma tabela à mão? Abre-a aqui',
      detts: 'Seleciona-a onde está, copia e cola aqui em baixo. Só é preciso se preferires fazer à mão.',
      nincol: 'nada colado',
      crea: 'Acrescentar as jogadoras que ainda não estão no plantel',
      d_riatt: '📂 DADOS IA — reativar',
      d_riatt1: 'A pasta ',
      d_riatt2: ' é sempre a mesma: o sistema só quer que confirmes mais uma vez a permissão para a ler.',
      d_riattb: 'Reativar',
      d_cambia: 'ou muda de pasta',
      d_attivo: '📂 DADOS IA — ativo',
      d_guardo1: 'Estou a ver a pasta ',
      d_guardo2: '. Quando a tua IA guardar lá um ficheiro, os dados entram sozinhos: não tens de carregar em nada.',
      d_smetti: 'Deixar de a ver',
      d_titolo: '📂 DADOS IA',
      d_indica: 'Indica uma pasta uma só vez e não terás de escolher mais nenhum ficheiro: a tua IA guarda lá dentro e o VDM preenche-se sozinho.',
      d_collega: 'Ligar uma pasta…',
      d_riattivato: 'DADOS IA reativado.',
      k_copia1: 'Copia isto e cola-o na tua IA. Lá dentro já está escrito para guardar o ficheiro na pasta ',
      k_copia2: ': daí o programa vai buscá-lo sozinho.',
      k_primacart: '<b>Liga primeiro uma pasta</b> (a caixa DADOS IA aqui em baixo): sem ela a tua IA não sabe onde pôr o ficheiro e tens de ir buscá-lo à mão de cada vez.',
      t_scegli: 'Escolhe primeiro uma equipa.',
      t_nocart: 'Aqui não se podem ligar pastas.',
      t_cartok: 'Pasta ligada: ',
      a_amano: 'O que a IA encontrou já está aqui dentro e pode corrigir-se. O que falta escreves tu. As linhas deixadas vazias não vão para a folha.',
      s_giocatrici: 'jogadoras',
      s_foto: 'fotos',
      s_statsq: 'estatísticas de equipa',
      s_quintetti: 'cincos',
      s_nonletti: 'não lidos: ',
      s_nulla: 'aqui dentro não há nada que eu saiba ler',
      s_nopt: 'aqui dentro não reconheço nenhum play type',
      i_manca1: 'Importado. Mas no ficheiro não estavam: ',
      i_manca2: ' — esses números só estão no InStat/Synergy.',
      i_stemma: 'o emblema',
      i_nuove: 'fichas novas',
      i_ptsu: 'play types em ',
      i_importate: 'Importado: ',
      i_statimp: 'Estatísticas importadas.',
      i_avsq: 'estatísticas avançadas de equipa',
      i_pt: 'play types',
      t_sceglia: 'Escolhe primeiro um adversário.',
      t_arrivato: 'Chegou ',
      t_nolega: '»: essa equipa não está na liga.',
      h_avsq: 'Estatísticas avançadas de equipa',
      i_schede: 'fichas',
      i_aggiornati: 'dados atualizados',
      i_fonte: 'preparado pela IA',
      sp_av: 'Estatísticas avançadas',
      sp_avT: 'A página no fim do Personnel com as estatísticas avançadas e os play types',
      n_punti: 'Pontos',
      n_ppp: 'Pontos por posse',
      n_tiro: 'Lançamentos',
      n_due: 'De dois pontos',
      n_tre: 'De três pontos',
      n_liberi: 'Lances livres',
      n_assist: 'Assistências',
      n_rimbalzi: 'Ressaltos',
      n_rimbOff: 'Ressaltos ofensivos',
      n_rimbDif: 'Ressaltos defensivos',
      n_perse: 'Perdas de bola',
      n_recuperi: 'Roubos de bola',
      n_stoppate: 'Desarmes',
      col_pt: 'Play type',
      col_quintetto: 'Cinco',
      h_foglio: '📈 Folha avançada de equipa — também se escreve à mão',
      h_medie: 'Médias por jogo',
      h_ptatt: 'Play types — ataque',
      h_ptdif: 'Play types — defesa',
      h_quintetti: 'Cincos',
      h_fonte: 'Fonte',
      ph_fonte: 'ex. Hudl InStat — Serie A1, 27 jogos',
      h_avpt: 'Estatísticas avançadas e play types',
      tit_ia: 'USA A IA',
      tit_avv: 'adversário',
      a_att: ' no ataque, ',
      a_dif: ' na defesa',
      a_ppp: ' pontos por posse',
      a_altri: '…e outros ',
      h_attacco: 'Ataque',
      h_tabellone: 'Bola e tabela',
      ann: 'Cancelar', scrivi: 'Escrever nas fichas'
    },
    de: {
      c_logo: 'Vereinslogo', c_foto: 'Spielerinnenfotos',
      c_player: 'Spielerinnendaten — Trikotnummer, Position, Größe, Jahrgang',
      c_stat: 'Statistiken',
      c_avanzate: 'Erweiterte Statistiken — Team und Spielerinnen, Lineups',
      c_playtype: 'Play Types — Angriff und Verteidigung, Team und Spielerinnen',
      p_u5: 'Letzte 5 Spiele', p_u10: 'Letzte 10 Spiele',
      p_stag: 'Laufende Saison', p_scorsa: 'Vorige Saison',
      intro1: '<b>VDM lädt nichts von allein herunter.</b> Es geht nicht ins Internet und sucht nicht: hier wird der <b>Auftrag für DEINE KI</b> vorbereitet — Claude, oder welche du nutzt. Du kopierst ihn, fügst ihn ein, und <b>sie sucht, lädt herunter und bereitet dir die Datei vor</b>. VDM liest diese Datei und füllt Kader, Trikotnummern, Fotos, Statistiken, erweiterte Statistiken und Play Types von allein aus — in den Karten und im Bericht.',
      intro2: 'VDM ist <b>dafür gemacht, mit KI zu arbeiten</b>: die, die du täglich nutzt, reicht — ins Internet geht sie, du musst nichts freischalten und bist an keinen Anbieter gebunden.',
      intro3: '<b>Man beginnt bei Punkt 1.</b> Solange deine KI die Daten nicht vorbereitet hat, gibt es hier nichts abzuholen und das Programm bleibt, wie es ist.',
      t1: '1 · Sag deiner KI, wonach sie suchen soll',
      t1s: 'Hake an, was du brauchst, kopiere die Anfrage und füge sie in deine KI ein (Claude oder eine andere). Sie sucht und speichert die Datei.',
      part: 'Über wie viele Spiele:',
      bcopia: '📋 Anfrage für deine KI kopieren',
      bcopias: 'und füge sie in das Feld deiner KI ein',
      t2: '2 · Wenn deine KI fertig ist',
      t2s: 'Wenn du den Ordner oben verbunden hast, musst du nichts tun: die Daten kommen von allein. Sonst hol dir selbst die Datei, die sie gespeichert hat.',
      bfile: 'Holen, was sie vorbereitet hat…', nulla: 'noch nichts',
      dett: 'Hast du schon eine Tabelle zur Hand? Hier öffnen',
      detts: 'Markiere sie, wo sie ist, kopiere sie und füge sie unten ein. Nur nötig, wenn du es lieber von Hand machst.',
      nincol: 'nichts eingefügt',
      crea: 'Spielerinnen hinzufügen, die noch nicht im Kader stehen',
      d_riatt: '📂 KI-DATEN — neu freigeben',
      d_riatt1: 'Der Ordner ',
      d_riatt2: ' ist immer noch derselbe: das System möchte nur, dass du die Leseberechtigung noch einmal bestätigst.',
      d_riattb: 'Neu freigeben',
      d_cambia: 'oder Ordner wechseln',
      d_attivo: '📂 KI-DATEN — aktiv',
      d_guardo1: 'Ich beobachte den Ordner ',
      d_guardo2: '. Wenn deine KI dort eine Datei speichert, kommen die Daten von allein: du musst nichts drücken.',
      d_smetti: 'Nicht mehr beobachten',
      d_titolo: '📂 KI-DATEN',
      d_indica: 'Zeig einmal auf einen Ordner und du musst nie wieder eine Datei auswählen: deine KI speichert hinein, und VDM füllt sich von allein.',
      d_collega: 'Ordner verbinden…',
      d_riattivato: 'KI-DATEN wieder aktiv.',
      k_copia1: 'Kopiere das und füge es in deine KI ein. Darin steht schon, die Datei im Ordner ',
      k_copia2: ' zu speichern: von dort holt das Programm sie von allein.',
      k_primacart: '<b>Verbinde zuerst einen Ordner</b> (das Feld KI-DATEN unten): ohne ihn weiß deine KI nicht, wohin mit der Datei, und du musst sie jedes Mal von Hand suchen.',
      t_scegli: 'Wähle zuerst ein Team.',
      t_nocart: 'Hier lassen sich keine Ordner verbinden.',
      t_cartok: 'Ordner verbunden: ',
      a_amano: 'Was die KI gefunden hat, steht schon hier drin und lässt sich korrigieren. Was fehlt, schreibst du selbst. Leer gelassene Zeilen kommen nicht aufs Blatt.',
      s_giocatrici: 'Spielerinnen',
      s_foto: 'Fotos',
      s_statsq: 'Teamstatistiken',
      s_quintetti: 'Lineups',
      s_nonletti: 'nicht gelesen: ',
      s_nulla: 'hier drin ist nichts, was ich lesen kann',
      s_nopt: 'hier drin erkenne ich keinen Play Type',
      i_manca1: 'Importiert. Aber in der Datei fehlten: ',
      i_manca2: ' — diese Zahlen gibt es nur bei InStat/Synergy.',
      i_stemma: 'das Wappen',
      i_nuove: 'neue Karten',
      i_ptsu: 'Play Types bei ',
      i_importate: 'Importiert: ',
      i_statimp: 'Statistiken importiert.',
      i_avsq: 'erweiterte Teamstatistiken',
      i_pt: 'Play Types',
      t_sceglia: 'Wähle zuerst einen Gegner.',
      t_arrivato: 'Angekommen: ',
      t_nolega: '»: dieses Team ist nicht in der Liga.',
      h_avsq: 'Erweiterte Teamstatistiken',
      i_schede: 'Karten',
      i_aggiornati: 'Daten aktualisiert',
      i_fonte: 'von der KI erstellt',
      sp_av: 'Erweiterte Statistiken',
      sp_avT: 'Die Seite am Ende des Personnel mit den erweiterten Statistiken und den Play Types',
      n_punti: 'Punkte',
      n_ppp: 'Punkte pro Ballbesitz',
      n_tiro: 'Würfe',
      n_due: 'Zweier',
      n_tre: 'Dreier',
      n_liberi: 'Freiwürfe',
      n_assist: 'Assists',
      n_rimbalzi: 'Rebounds',
      n_rimbOff: 'Offensivrebounds',
      n_rimbDif: 'Defensivrebounds',
      n_perse: 'Ballverluste',
      n_recuperi: 'Steals',
      n_stoppate: 'Blocks',
      col_pt: 'Play Type',
      col_quintetto: 'Lineup',
      h_foglio: '📈 Erweitertes Teamblatt — auch von Hand auszufüllen',
      h_medie: 'Schnitt pro Spiel',
      h_ptatt: 'Play Types — Angriff',
      h_ptdif: 'Play Types — Verteidigung',
      h_quintetti: 'Lineups',
      h_fonte: 'Quelle',
      ph_fonte: 'z. B. Hudl InStat — Serie A1, 27 Spiele',
      h_avpt: 'Erweiterte Statistiken und Play Types',
      tit_ia: 'KI NUTZEN',
      tit_avv: 'Gegner',
      a_att: ' im Angriff, ',
      a_dif: ' in der Verteidigung',
      a_ppp: ' Punkte pro Ballbesitz',
      a_altri: '…und weitere ',
      h_attacco: 'Angriff',
      h_tabellone: 'Ball und Brett',
      ann: 'Abbrechen', scrivi: 'In die Karten schreiben'
    },
    lt: {
      c_logo: 'Komandos logotipas', c_foto: 'Žaidėjų nuotraukos',
      c_player: 'Žaidėjos duomenys — numeris, pozicija, ūgis, gimimo metai',
      c_stat: 'Statistika',
      c_avanzate: 'Išplėstinė statistika — komanda ir žaidėjos, penketai',
      c_playtype: 'Play types — puolimas ir gynyba, komanda ir žaidėjos',
      p_u5: 'Paskutinės 5 rungtynės', p_u10: 'Paskutinės 10 rungtynių',
      p_stag: 'Einamasis sezonas', p_scorsa: 'Praėjęs sezonas',
      intro1: '<b>VDM pats nieko neatsisiunčia.</b> Jis neina į internetą ir neieško: čia paruošiama <b>užduotis TAVO DI</b> — Claude ar kitam, kurį naudoji. Nukopijuoji, įklijuoji, ir <b>ji ieško, atsisiunčia ir paruošia tau failą</b>. VDM tą failą perskaito ir pats užpildo sudėtį, numerius, nuotraukas, statistiką, išplėstinę statistiką ir play types — kortelėse ir ataskaitoje.',
      intro2: 'VDM <b>sukurtas dirbti su DI</b>: tinka ta, kurią jau naudoji kasdien — į internetą eina ji, tau nereikia nieko įjungti ir nesi pririštas prie jokio tiekėjo.',
      intro3: '<b>Pradedama nuo 1 punkto.</b> Kol tavo DI neparuoš duomenų, čia nėra ko paimti ir programa lieka tokia, kokia yra.',
      t1: '1 · Pasakyk savo DI, ko ieškoti',
      t1s: 'Pažymėk, ko reikia, nukopijuok užklausą ir įklijuok į savo DI (Claude ar kitą). Ji suras ir išsaugos failą.',
      part: 'Per kiek rungtynių:',
      bcopia: '📋 Kopijuoti užklausą savo DI',
      bcopias: 'ir įklijuok į savo DI langelį',
      t2: '2 · Kai tavo DI baigs',
      t2s: 'Jei prijungei aplanką viršuje, nieko daryti nereikia: duomenys ateina patys. Kitaip pasiimk failą, kurį ji tau išsaugojo.',
      bfile: 'Paimti tai, ką paruošė…', nulla: 'kol kas nieko',
      dett: 'Jau turi lentelę po ranka? Atverk čia',
      detts: 'Pažymėk ją ten, kur yra, nukopijuok ir įklijuok žemiau. Reikia tik jei nori daryti ranka.',
      nincol: 'nieko neįklijuota',
      crea: 'Pridėti žaidėjas, kurių dar nėra sudėtyje',
      d_riatt: '📂 DI DUOMENYS — reikia įjungti iš naujo',
      d_riatt1: 'Aplankas ',
      d_riatt2: ' tas pats: sistema tik prašo dar kartą patvirtinti leidimą jį skaityti.',
      d_riattb: 'Įjungti iš naujo',
      d_cambia: 'arba pakeisk aplanką',
      d_attivo: '📂 DI DUOMENYS — įjungta',
      d_guardo1: 'Stebiu aplanką ',
      d_guardo2: '. Kai tavo DI ten išsaugos failą, duomenys ateis patys: nieko spausti nereikia.',
      d_smetti: 'Nebestebėti',
      d_titolo: '📂 DI DUOMENYS',
      d_indica: 'Nurodyk aplanką vieną kartą ir daugiau nereikės rinktis jokio failo: tavo DI ten išsaugo, o VDM užsipildo pats.',
      d_collega: 'Prijungti aplanką…',
      d_riattivato: 'DI DUOMENYS vėl įjungta.',
      k_copia1: 'Nukopijuok tai ir įklijuok į savo DI. Ten jau parašyta išsaugoti failą aplanke ',
      k_copia2: ': iš ten programa jį pasiima pati.',
      k_primacart: '<b>Pirmiausia prijunk aplanką</b> (DI DUOMENYS langelis žemiau): be jo tavo DI nežino, kur dėti failą, ir kaskart teks jo ieškoti ranka.',
      t_scegli: 'Pirmiausia pasirink komandą.',
      t_nocart: 'Čia aplankų prijungti negalima.',
      t_cartok: 'Aplankas prijungtas: ',
      a_amano: 'Ką DI rado, jau yra čia ir galima pataisyti. Ko trūksta, įrašai pats. Tuščios eilutės į lapą nepatenka.',
      s_giocatrici: 'žaidėjos',
      s_foto: 'nuotraukos',
      s_statsq: 'komandos statistika',
      s_quintetti: 'penketai',
      s_nonletti: 'neperskaityta: ',
      s_nulla: 'čia nėra nieko, ką mokėčiau perskaityti',
      s_nopt: 'čia neatpažįstu jokio play type',
      i_manca1: 'Importuota. Bet faile nebuvo: ',
      i_manca2: ' — tie skaičiai yra tik InStat/Synergy.',
      i_stemma: 'logotipas',
      i_nuove: 'naujos kortelės',
      i_ptsu: 'play types – ',
      i_importate: 'Importuota: ',
      i_statimp: 'Statistika importuota.',
      i_avsq: 'komandos išplėstinė statistika',
      i_pt: 'play types',
      t_sceglia: 'Pirmiausia pasirink varžovą.',
      t_arrivato: 'Gauta ',
      t_nolega: '»: tos komandos lygoje nėra.',
      h_avsq: 'Komandos išplėstinė statistika',
      i_schede: 'kortelės',
      i_aggiornati: 'duomenys atnaujinti',
      i_fonte: 'paruošė DI',
      sp_av: 'Išplėstinė statistika',
      sp_avT: 'Puslapis Personnel gale su išplėstine statistika ir play types',
      n_punti: 'Taškai',
      n_ppp: 'Taškai už ataką',
      n_tiro: 'Metimai',
      n_due: 'Dvitaškiai',
      n_tre: 'Tritaškiai',
      n_liberi: 'Baudos',
      n_assist: 'Rezultatyvūs perdavimai',
      n_rimbalzi: 'Atkovoti kamuoliai',
      n_rimbOff: 'Puolimo atkovoti',
      n_rimbDif: 'Gynybos atkovoti',
      n_perse: 'Klaidos',
      n_recuperi: 'Perimti kamuoliai',
      n_stoppate: 'Blokai',
      col_pt: 'Play type',
      col_quintetto: 'Penketas',
      h_foglio: '📈 Komandos išplėstinis lapas — galima rašyti ir ranka',
      h_medie: 'Vidurkiai per rungtynes',
      h_ptatt: 'Play types — puolimas',
      h_ptdif: 'Play types — gynyba',
      h_quintetti: 'Penketai',
      h_fonte: 'Šaltinis',
      ph_fonte: 'pvz. Hudl InStat — Serie A1, 27 rungtynės',
      h_avpt: 'Išplėstinė statistika ir play types',
      tit_ia: 'NAUDOK DI',
      tit_avv: 'varžovas',
      a_att: ' puolime, ',
      a_dif: ' gynyboje',
      a_ppp: ' taškai už ataką',
      a_altri: '…ir dar ',
      h_attacco: 'Puolimas',
      h_tabellone: 'Kamuolys ir skydas',
      ann: 'Atšaukti', scrivi: 'Įrašyti į korteles'
    },
    pl: {
      c_logo: 'Logo drużyny', c_foto: 'Zdjęcia zawodniczek',
      c_player: 'Dane zawodniczki — numer, pozycja, wzrost, rocznik',
      c_stat: 'Statystyki',
      c_avanzate: 'Statystyki zaawansowane — drużyna i zawodniczki, piątki',
      c_playtype: 'Play typy — atak i obrona, drużyna i zawodniczki',
      p_u5: 'Ostatnie 5 meczów', p_u10: 'Ostatnie 10 meczów',
      p_stag: 'Bieżący sezon', p_scorsa: 'Poprzedni sezon',
      intro1: '<b>VDM sam niczego nie pobiera.</b> Nie wchodzi do internetu i nie szuka: tutaj przygotowujesz <b>polecenie dla SWOJEJ SI</b> — Claude albo tej, której używasz. Kopiujesz, wklejasz, i <b>to ona szuka, pobiera i przygotowuje ci plik</b>. VDM czyta ten plik i sam wypełnia skład, numery, zdjęcia, statystyki, statystyki zaawansowane i play typy — w kartach i w raporcie.',
      intro2: 'VDM jest <b>zrobiony do pracy ze sztuczną inteligencją</b>: wystarczy ta, której już używasz codziennie — to ona wchodzi do internetu, ty nie musisz nic włączać i nie jesteś związany z żadnym dostawcą.',
      intro3: '<b>Zaczyna się od punktu 1.</b> Dopóki twoja SI nie przygotuje danych, nie ma tu czego odbierać i program zostaje taki, jaki jest.',
      t1: '1 · Powiedz swojej SI, czego ma szukać',
      t1s: 'Zaznacz, czego potrzebujesz, skopiuj zapytanie i wklej je do swojej SI (Claude lub innej). Ona szuka i zapisuje plik.',
      part: 'Z ilu meczów:',
      bcopia: '📋 Skopiuj zapytanie dla swojej SI',
      bcopias: 'i wklej je w okno swojej SI',
      t2: '2 · Kiedy twoja SI skończy',
      t2s: 'Jeśli podłączyłeś folder powyżej, nie musisz nic robić: dane wchodzą same. W przeciwnym razie weź plik, który ci zapisała.',
      bfile: 'Weź to, co przygotowała…', nulla: 'jeszcze nic',
      dett: 'Masz już tabelę pod ręką? Otwórz ją tutaj',
      detts: 'Zaznacz ją tam, gdzie jest, skopiuj i wklej poniżej. Potrzebne tylko, jeśli wolisz ręcznie.',
      nincol: 'nic nie wklejono',
      crea: 'Dodaj zawodniczki, których jeszcze nie ma w składzie',
      d_riatt: '📂 DANE SI — trzeba włączyć ponownie',
      d_riatt1: 'Folder ',
      d_riatt2: ' jest wciąż ten sam: system chce tylko, żebyś jeszcze raz potwierdził zgodę na jego odczyt.',
      d_riattb: 'Włącz ponownie',
      d_cambia: 'albo zmień folder',
      d_attivo: '📂 DANE SI — włączone',
      d_guardo1: 'Obserwuję folder ',
      d_guardo2: '. Kiedy twoja SI zapisze tam plik, dane wejdą same: nie musisz nic naciskać.',
      d_smetti: 'Przestań obserwować',
      d_titolo: '📂 DANE SI',
      d_indica: 'Wskaż folder jeden raz i nie będziesz musiał wybierać żadnego pliku: twoja SI zapisuje tam, a VDM wypełnia się sam.',
      d_collega: 'Podłącz folder…',
      d_riattivato: 'DANE SI znów włączone.',
      k_copia1: 'Skopiuj to i wklej do swojej SI. Jest tam już napisane, żeby zapisać plik w folderze ',
      k_copia2: ': stamtąd program weźmie go sam.',
      k_primacart: '<b>Najpierw podłącz folder</b> (ramka DANE SI poniżej): bez niego twoja SI nie wie, gdzie zapisać plik, i za każdym razem musisz go szukać ręcznie.',
      t_scegli: 'Najpierw wybierz drużynę.',
      t_nocart: 'Tutaj nie można podłączyć folderów.',
      t_cartok: 'Folder podłączony: ',
      a_amano: 'To, co znalazła SI, jest już tutaj i można poprawić. Czego brakuje, wpisujesz sam. Puste wiersze nie trafiają na arkusz.',
      s_giocatrici: 'zawodniczki',
      s_foto: 'zdjęcia',
      s_statsq: 'statystyki drużyny',
      s_quintetti: 'piątki',
      s_nonletti: 'nieodczytane: ',
      s_nulla: 'nie ma tu niczego, co potrafię odczytać',
      s_nopt: 'nie rozpoznaję tu żadnego play typu',
      i_manca1: 'Zaimportowano. Ale w pliku nie było: ',
      i_manca2: ' — te liczby są tylko w InStat/Synergy.',
      i_stemma: 'herb',
      i_nuove: 'nowe karty',
      i_ptsu: 'play typy dla ',
      i_importate: 'Zaimportowano: ',
      i_statimp: 'Statystyki zaimportowane.',
      i_avsq: 'zaawansowane statystyki drużyny',
      i_pt: 'play typy',
      t_sceglia: 'Najpierw wybierz przeciwnika.',
      t_arrivato: 'Przyszło ',
      t_nolega: '»: tej drużyny nie ma w lidze.',
      h_avsq: 'Zaawansowane statystyki drużyny',
      i_schede: 'karty',
      i_aggiornati: 'dane zaktualizowane',
      i_fonte: 'przygotowane przez SI',
      sp_av: 'Statystyki zaawansowane',
      sp_avT: 'Strona na końcu Personnel ze statystykami zaawansowanymi i play typami',
      n_punti: 'Punkty',
      n_ppp: 'Punkty na posiadanie',
      n_tiro: 'Rzuty z gry',
      n_due: 'Rzuty za dwa',
      n_tre: 'Rzuty za trzy',
      n_liberi: 'Rzuty wolne',
      n_assist: 'Asysty',
      n_rimbalzi: 'Zbiórki',
      n_rimbOff: 'Zbiórki w ataku',
      n_rimbDif: 'Zbiórki w obronie',
      n_perse: 'Straty',
      n_recuperi: 'Przechwyty',
      n_stoppate: 'Bloki',
      col_pt: 'Play typ',
      col_quintetto: 'Piątka',
      h_foglio: '📈 Arkusz zaawansowany drużyny — można wpisać ręcznie',
      h_medie: 'Średnie na mecz',
      h_ptatt: 'Play typy — atak',
      h_ptdif: 'Play typy — obrona',
      h_quintetti: 'Piątki',
      h_fonte: 'Źródło',
      ph_fonte: 'np. Hudl InStat — Serie A1, 27 meczów',
      h_avpt: 'Statystyki zaawansowane i play typy',
      tit_ia: 'UŻYJ SI',
      tit_avv: 'przeciwnik',
      a_att: ' w ataku, ',
      a_dif: ' w obronie',
      a_ppp: ' punktów na posiadanie',
      a_altri: '…i jeszcze ',
      h_attacco: 'Atak',
      h_tabellone: 'Piłka i tablica',
      ann: 'Anuluj', scrivi: 'Zapisz w kartach'
    },
    ru: {
      c_logo: 'Логотип команды', c_foto: 'Фотографии игроков',
      c_player: 'Данные игрока — номер, амплуа, рост, год рождения',
      c_stat: 'Статистика',
      c_avanzate: 'Продвинутая статистика — команда и игроки, пятёрки',
      c_playtype: 'Play types — нападение и защита, команда и игроки',
      p_u5: 'Последние 5 игр', p_u10: 'Последние 10 игр',
      p_stag: 'Текущий сезон', p_scorsa: 'Прошлый сезон',
      intro1: '<b>VDM сам ничего не скачивает.</b> Он не выходит в интернет и не ищет: здесь готовится <b>задание для ВАШЕГО ИИ</b> — Claude или того, которым вы пользуетесь. Вы копируете, вставляете, и <b>он ищет, скачивает и готовит вам файл</b>. VDM читает этот файл и сам заполняет состав, номера, фотографии, статистику, продвинутую статистику и play types — в карточках и в отчёте.',
      intro2: 'VDM <b>сделан для работы с ИИ</b>: подойдёт тот, которым вы уже пользуетесь каждый день — в интернет выходит он, вам не нужно ничего подключать и вы не привязаны ни к одному поставщику.',
      intro3: '<b>Начинаем с пункта 1.</b> Пока ваш ИИ не подготовит данные, здесь нечего забирать и программа остаётся как есть.',
      t1: '1 · Скажите своему ИИ, что искать',
      t1s: 'Отметьте то, что нужно, скопируйте запрос и вставьте его в свой ИИ (Claude или другой). Он найдёт и сохранит файл.',
      part: 'За сколько игр:',
      bcopia: '📋 Скопировать запрос для вашего ИИ',
      bcopias: 'и вставьте его в окно вашего ИИ',
      t2: '2 · Когда ваш ИИ закончит',
      t2s: 'Если вы подключили папку выше, делать ничего не нужно: данные придут сами. Иначе возьмите файл, который он сохранил.',
      bfile: 'Взять то, что он подготовил…', nulla: 'пока ничего',
      dett: 'Уже есть таблица под рукой? Откройте её здесь',
      detts: 'Выделите её там, где она есть, скопируйте и вставьте ниже. Нужно только если предпочитаете вручную.',
      nincol: 'ничего не вставлено',
      crea: 'Добавить игроков, которых ещё нет в составе',
      d_riatt: '📂 ДАННЫЕ ИИ — нужно включить снова',
      d_riatt1: 'Папка ',
      d_riatt2: ' та же самая: система просто просит ещё раз подтвердить разрешение на чтение.',
      d_riattb: 'Включить снова',
      d_cambia: 'или сменить папку',
      d_attivo: '📂 ДАННЫЕ ИИ — включено',
      d_guardo1: 'Слежу за папкой ',
      d_guardo2: '. Когда ваш ИИ сохранит туда файл, данные придут сами: нажимать ничего не нужно.',
      d_smetti: 'Перестать следить',
      d_titolo: '📂 ДАННЫЕ ИИ',
      d_indica: 'Укажите папку один раз — и больше не придётся выбирать файлы: ваш ИИ сохраняет туда, а VDM заполняется сам.',
      d_collega: 'Подключить папку…',
      d_riattivato: 'ДАННЫЕ ИИ снова включены.',
      k_copia1: 'Скопируйте это и вставьте в свой ИИ. Там уже написано сохранить файл в папке ',
      k_copia2: ': оттуда программа заберёт его сама.',
      k_primacart: '<b>Сначала подключите папку</b> (блок ДАННЫЕ ИИ ниже): без неё ваш ИИ не знает, куда положить файл, и каждый раз придётся искать его вручную.',
      t_scegli: 'Сначала выберите команду.',
      t_nocart: 'Здесь нельзя подключить папку.',
      t_cartok: 'Папка подключена: ',
      a_amano: 'То, что нашёл ИИ, уже здесь и поддаётся правке. Чего не хватает, впишете сами. Пустые строки на лист не попадают.',
      s_giocatrici: 'игроки',
      s_foto: 'фото',
      s_statsq: 'статистика команды',
      s_quintetti: 'пятёрки',
      s_nonletti: 'не прочитано: ',
      s_nulla: 'здесь нет ничего, что я умею читать',
      s_nopt: 'здесь я не узнаю ни одного play type',
      i_manca1: 'Импортировано. Но в файле не было: ',
      i_manca2: ' — эти цифры есть только в InStat/Synergy.',
      i_stemma: 'эмблема',
      i_nuove: 'новые карточки',
      i_ptsu: 'play types у ',
      i_importate: 'Импортировано: ',
      i_statimp: 'Статистика импортирована.',
      i_avsq: 'продвинутая статистика команды',
      i_pt: 'play types',
      t_sceglia: 'Сначала выберите соперника.',
      t_arrivato: 'Получено ',
      t_nolega: '»: этой команды нет в лиге.',
      h_avsq: 'Продвинутая статистика команды',
      i_schede: 'карточки',
      i_aggiornati: 'данные обновлены',
      i_fonte: 'подготовлено ИИ',
      sp_av: 'Продвинутая статистика',
      sp_avT: 'Страница в конце Personnel с продвинутой статистикой и play types',
      n_punti: 'Очки',
      n_ppp: 'Очки за владение',
      n_tiro: 'Броски с игры',
      n_due: 'Двухочковые',
      n_tre: 'Трёхочковые',
      n_liberi: 'Штрафные',
      n_assist: 'Передачи',
      n_rimbalzi: 'Подборы',
      n_rimbOff: 'Подборы в нападении',
      n_rimbDif: 'Подборы в защите',
      n_perse: 'Потери',
      n_recuperi: 'Перехваты',
      n_stoppate: 'Блок-шоты',
      col_pt: 'Play type',
      col_quintetto: 'Пятёрка',
      h_foglio: '📈 Расширенный лист команды — можно заполнить вручную',
      h_medie: 'В среднем за игру',
      h_ptatt: 'Play types — нападение',
      h_ptdif: 'Play types — защита',
      h_quintetti: 'Пятёрки',
      h_fonte: 'Источник',
      ph_fonte: 'напр. Hudl InStat — Serie A1, 27 игр',
      h_avpt: 'Продвинутая статистика и play types',
      tit_ia: 'ИСПОЛЬЗОВАТЬ ИИ',
      tit_avv: 'соперник',
      a_att: ' в нападении, ',
      a_dif: ' в защите',
      a_ppp: ' очка за владение',
      a_altri: '…и ещё ',
      h_attacco: 'Нападение',
      h_tabellone: 'Мяч и щит',
      ann: 'Отмена', scrivi: 'Записать в карточки'
    },
    zh: {
      c_logo: '球队队徽', c_foto: '球员照片',
      c_player: '球员资料 — 球衣号码、位置、身高、出生年份',
      c_stat: '统计数据',
      c_avanzate: '进阶数据 — 球队与球员、阵容',
      c_playtype: 'Play types — 进攻与防守、球队与球员',
      p_u5: '最近 5 场', p_u10: '最近 10 场',
      p_stag: '本赛季', p_scorsa: '上赛季',
      intro1: '<b>VDM 不会自己下载任何东西。</b>它不上网、也不搜索：这里准备的是<b>交给你的 AI 的指令</b> — Claude，或者你在用的任何一个。你复制、粘贴给它，<b>由它去搜索、下载并为你准备文件</b>。VDM 读取那个文件，自动填好名单、球衣号码、照片、统计数据、进阶数据和 play types，填进卡片和报告里。',
      intro2: 'VDM <b>就是为配合 AI 而做的</b>：你每天在用的那个就行 — 上网的是它，你不需要开通任何东西，也不绑定任何供应商。',
      intro3: '<b>从第 1 步开始。</b>在你的 AI 准备好数据之前，这里没有东西可取，程序保持原样。',
      t1: '1 · 告诉你的 AI 要找什么',
      t1s: '勾选你需要的内容，复制请求并粘贴到你的 AI（Claude 或其他）。它会搜索并保存文件。',
      part: '统计多少场：',
      bcopia: '📋 复制给你的 AI 的请求',
      bcopias: '并粘贴到你的 AI 输入框',
      t2: '2 · 当你的 AI 完成后',
      t2s: '如果你已连接上面的文件夹，什么都不用做：数据会自己进来。否则请自己取回它保存的文件。',
      bfile: '取回它准备好的内容…', nulla: '还没有',
      dett: '手边已经有表格了？在这里打开',
      detts: '在原处选中、复制，粘贴到下面。只有你想手动处理时才需要。',
      nincol: '未粘贴任何内容',
      crea: '添加名单中还没有的球员',
      d_riatt: '📂 AI 数据 — 需要重新启用',
      d_riatt1: '文件夹 ',
      d_riatt2: ' 还是原来那个：系统只是要你再确认一次读取权限。',
      d_riattb: '重新启用',
      d_cambia: '或更换文件夹',
      d_attivo: '📂 AI 数据 — 已开启',
      d_guardo1: '正在监看文件夹 ',
      d_guardo2: '。当你的 AI 把文件存进去，数据会自己进来，你不用按任何东西。',
      d_smetti: '停止监看',
      d_titolo: '📂 AI 数据',
      d_indica: '只需指定一次文件夹，之后就再也不用选文件：你的 AI 存进去，VDM 自己填好。',
      d_collega: '连接文件夹…',
      d_riattivato: 'AI 数据已重新开启。',
      k_copia1: '复制这段并粘贴到你的 AI。里面已经写好把文件保存到文件夹 ',
      k_copia2: ' 里，程序会自己从那里取用。',
      k_primacart: '<b>请先连接一个文件夹</b>（下面的 AI 数据方框）：没有它，你的 AI 不知道把文件放哪，你每次都得手动去找。',
      t_scegli: '请先选择一支球队。',
      t_nocart: '这里无法连接文件夹。',
      t_cartok: '已连接文件夹：',
      a_amano: 'AI 找到的内容已经在这里，可以修改。缺的由你自己填。留空的行不会出现在表上。',
      s_giocatrici: '名球员',
      s_foto: '张照片',
      s_statsq: '球队数据',
      s_quintetti: '套阵容',
      s_nonletti: '未读取：',
      s_nulla: '这里面没有我能读的内容',
      s_nopt: '这里面认不出任何 play type',
      i_manca1: '已导入。但文件里没有：',
      i_manca2: ' — 这些数字只有 InStat/Synergy 上才有。',
      i_stemma: '队徽',
      i_nuove: '张新卡片',
      i_ptsu: 'play types 于 ',
      i_importate: '已导入：',
      i_statimp: '数据已导入。',
      i_avsq: '球队进阶数据',
      i_pt: 'play types',
      t_sceglia: '请先选择对手。',
      t_arrivato: '收到 ',
      t_nolega: '»：该球队不在联赛里。',
      h_avsq: '球队进阶数据',
      i_schede: '张卡片',
      i_aggiornati: '数据已更新',
      i_fonte: '由 AI 准备',
      sp_av: '进阶数据',
      sp_avT: 'Personnel 末尾那一页，含进阶数据和 play types',
      n_punti: '得分',
      n_ppp: '每回合得分',
      n_tiro: '投篮',
      n_due: '两分球',
      n_tre: '三分球',
      n_liberi: '罚球',
      n_assist: '助攻',
      n_rimbalzi: '篮板',
      n_rimbOff: '前场篮板',
      n_rimbDif: '后场篮板',
      n_perse: '失误',
      n_recuperi: '抢断',
      n_stoppate: '盖帽',
      col_pt: 'Play type',
      col_quintetto: '阵容',
      h_foglio: '📈 球队进阶表 — 也可以手动填写',
      h_medie: '场均',
      h_ptatt: 'Play types — 进攻',
      h_ptdif: 'Play types — 防守',
      h_quintetti: '阵容',
      h_fonte: '来源',
      ph_fonte: '例如 Hudl InStat — Serie A1，27 场',
      h_avpt: '进阶数据与 play types',
      tit_ia: '使用 AI',
      tit_avv: '对手',
      a_att: ' 个进攻，',
      a_dif: ' 个防守',
      a_ppp: ' 每回合得分',
      a_altri: '…还有 ',
      h_attacco: '进攻',
      h_tabellone: '球与篮板',
      ann: '取消', scrivi: '写入卡片'
    },
    ja: {
      c_logo: 'チームロゴ', c_foto: '選手の写真',
      c_player: '選手データ — 背番号、ポジション、身長、生年',
      c_stat: 'スタッツ',
      c_avanzate: 'アドバンススタッツ — チームと選手、ラインナップ',
      c_playtype: 'Play types — オフェンスとディフェンス、チームと選手',
      p_u5: '直近5試合', p_u10: '直近10試合',
      p_stag: '今シーズン', p_scorsa: '前シーズン',
      intro1: '<b>VDM は自分では何もダウンロードしません。</b>インターネットにも行かず、検索もしません。ここで用意するのは<b>あなたの AI に渡す指示</b>です — Claude でも、お使いのどれでも。コピーして貼り付ければ、<b>探して、ダウンロードして、ファイルを用意するのは AI のほう</b>です。VDM はそのファイルを読み、ロスター、背番号、写真、スタッツ、アドバンススタッツ、play types を自動で埋めます — カードにもレポートにも。',
      intro2: 'VDM は <b>AI と組んで使うために作られています</b>。毎日使っているものでかまいません — ネットに行くのは AI で、あなたは何も有効化する必要がなく、どの提供元にも縛られません。',
      intro3: '<b>1 番から始めます。</b>あなたの AI がデータを用意するまで、ここに取るものはなく、プログラムはそのままです。',
      t1: '1 · AI に何を探すか伝える',
      t1s: '必要なものにチェックを入れ、依頼文をコピーして AI（Claude など）に貼り付けてください。AI が探してファイルを保存します。',
      part: '何試合分：',
      bcopia: '📋 AI 用の依頼文をコピー',
      bcopias: 'AI の入力欄に貼り付けてください',
      t2: '2 · AI が終わったら',
      t2s: '上のフォルダをつないであれば何もする必要はありません。データはひとりでに入ります。そうでなければ、保存されたファイルをご自分で取ってください。',
      bfile: '用意されたものを取り込む…', nulla: 'まだ何もありません',
      dett: 'すでに表が手元にありますか？ここで開く',
      detts: 'あるところで選択してコピーし、下に貼り付けてください。手作業でやりたいときだけ必要です。',
      nincol: '貼り付けなし',
      crea: 'ロスターにまだいない選手を追加する',
      d_riatt: '📂 AI データ — 再有効化が必要',
      d_riatt1: 'フォルダ ',
      d_riatt2: ' は同じものです。システムが読み取り許可をもう一度確認したいだけです。',
      d_riattb: '再有効化',
      d_cambia: 'またはフォルダを変更',
      d_attivo: '📂 AI データ — 有効',
      d_guardo1: 'フォルダ ',
      d_guardo2: ' を見ています。AI がそこにファイルを保存すると、データはひとりでに入ります。何も押す必要はありません。',
      d_smetti: '監視をやめる',
      d_titolo: '📂 AI データ',
      d_indica: 'フォルダを一度指定すれば、もうファイルを選ぶ必要はありません。AI がそこに保存し、VDM がひとりでに埋まります。',
      d_collega: 'フォルダをつなぐ…',
      d_riattivato: 'AI データを再有効化しました。',
      k_copia1: 'これをコピーして AI に貼り付けてください。ファイルをフォルダ ',
      k_copia2: ' に保存するよう書いてあります。プログラムがそこから自動で読み取ります。',
      k_primacart: '<b>先にフォルダをつないでください</b>（下の AI データの枠）。つないでいないと AI はファイルの置き場所がわからず、毎回手で探すことになります。',
      t_scegli: '先にチームを選んでください。',
      t_nocart: 'ここではフォルダをつなげません。',
      t_cartok: 'フォルダをつなぎました：',
      a_amano: 'AI が見つけたものはすでにここにあり、直せます。足りないものはご自分で書いてください。空のままの行は用紙に出ません。',
      s_giocatrici: '選手',
      s_foto: '枚の写真',
      s_statsq: 'チームスタッツ',
      s_quintetti: 'ラインナップ',
      s_nonletti: '読めなかったもの：',
      s_nulla: 'この中に読めるものはありません',
      s_nopt: 'この中に play type は見つかりません',
      i_manca1: '取り込みました。ただしファイルにありませんでした：',
      i_manca2: ' — これらの数字は InStat/Synergy にしかありません。',
      i_stemma: 'エンブレム',
      i_nuove: '枚の新しいカード',
      i_ptsu: 'play types（',
      i_importate: '取り込みました：',
      i_statimp: 'スタッツを取り込みました。',
      i_avsq: 'チームのアドバンススタッツ',
      i_pt: 'play types',
      t_sceglia: '先に対戦相手を選んでください。',
      t_arrivato: '届きました：',
      t_nolega: '»：そのチームはリーグにありません。',
      h_avsq: 'チームのアドバンススタッツ',
      i_schede: '枚のカード',
      i_aggiornati: 'データを更新しました',
      i_fonte: 'AI が用意',
      sp_av: 'アドバンススタッツ',
      sp_avT: 'Personnel の最後のページ。アドバンススタッツと play types が載ります',
      n_punti: '得点',
      n_ppp: '1ポゼッション得点',
      n_tiro: 'フィールドゴール',
      n_due: '2ポイント',
      n_tre: '3ポイント',
      n_liberi: 'フリースロー',
      n_assist: 'アシスト',
      n_rimbalzi: 'リバウンド',
      n_rimbOff: 'オフェンスリバウンド',
      n_rimbDif: 'ディフェンスリバウンド',
      n_perse: 'ターンオーバー',
      n_recuperi: 'スティール',
      n_stoppate: 'ブロック',
      col_pt: 'Play type',
      col_quintetto: 'ラインナップ',
      h_foglio: '📈 チームのアドバンスシート — 手入力もできます',
      h_medie: '1試合平均',
      h_ptatt: 'Play types — オフェンス',
      h_ptdif: 'Play types — ディフェンス',
      h_quintetti: 'ラインナップ',
      h_fonte: '出典',
      ph_fonte: '例：Hudl InStat — Serie A1、27試合',
      h_avpt: 'アドバンススタッツと play types',
      tit_ia: 'AI を使う',
      tit_avv: '対戦相手',
      a_att: ' 件（オフェンス）、',
      a_dif: ' 件（ディフェンス）',
      a_ppp: ' 1ポゼッション得点',
      a_altri: '…ほか ',
      h_attacco: 'オフェンス',
      h_tabellone: 'ボールとボード',
      ann: 'キャンセル', scrivi: 'カードに書き込む'
    },
    ko: {
      c_logo: '팀 로고', c_foto: '선수 사진',
      c_player: '선수 데이터 — 등번호, 포지션, 신장, 출생 연도',
      c_stat: '기록',
      c_avanzate: '어드밴스드 기록 — 팀과 선수, 라인업',
      c_playtype: 'Play types — 공격과 수비, 팀과 선수',
      p_u5: '최근 5경기', p_u10: '최근 10경기',
      p_stag: '이번 시즌', p_scorsa: '지난 시즌',
      intro1: '<b>VDM은 스스로 아무것도 내려받지 않습니다.</b> 인터넷에 접속하지도, 검색하지도 않습니다. 여기서 준비하는 것은 <b>당신의 AI에게 줄 지시</b>입니다 — Claude든, 쓰고 계신 어떤 것이든. 복사해서 붙여넣으면 <b>찾고, 내려받고, 파일을 준비하는 것은 AI</b>입니다. VDM은 그 파일을 읽어 로스터, 등번호, 사진, 기록, 어드밴스드 기록, play types를 카드와 리포트에 알아서 채웁니다.',
      intro2: 'VDM은 <b>AI와 함께 쓰라고 만든 프로그램</b>입니다. 매일 쓰시는 그것이면 충분합니다 — 인터넷에 가는 것은 AI이고, 따로 켜실 것도 없으며, 어떤 공급자에도 묶이지 않습니다.',
      intro3: '<b>1번부터 시작합니다.</b> AI가 데이터를 준비하기 전까지 여기서 가져올 것은 없고, 프로그램은 그대로입니다.',
      t1: '1 · AI에게 무엇을 찾을지 알려주기',
      t1s: '필요한 항목에 체크하고 요청문을 복사해 AI(Claude 등)에 붙여넣으세요. AI가 찾아서 파일로 저장합니다.',
      part: '몇 경기 기준:',
      bcopia: '📋 AI에게 줄 요청문 복사',
      bcopias: 'AI 입력창에 붙여넣으세요',
      t2: '2 · AI가 끝냈을 때',
      t2s: '위에서 폴더를 연결했다면 하실 일은 없습니다. 데이터가 알아서 들어옵니다. 아니라면 저장된 파일을 직접 가져오세요.',
      bfile: '준비된 것 가져오기…', nulla: '아직 없음',
      dett: '이미 표가 있으신가요? 여기서 열기',
      detts: '있는 곳에서 선택해 복사한 뒤 아래에 붙여넣으세요. 손으로 하고 싶을 때만 필요합니다.',
      nincol: '붙여넣은 내용 없음',
      crea: '로스터에 아직 없는 선수 추가',
      d_riatt: '📂 AI 데이터 — 다시 활성화 필요',
      d_riatt1: '폴더 ',
      d_riatt2: ' 는 그대로입니다. 시스템이 읽기 권한을 한 번 더 확인하려는 것뿐입니다.',
      d_riattb: '다시 활성화',
      d_cambia: '또는 폴더 변경',
      d_attivo: '📂 AI 데이터 — 켜짐',
      d_guardo1: '폴더 ',
      d_guardo2: ' 를 보고 있습니다. AI가 거기에 파일을 저장하면 데이터가 알아서 들어옵니다. 아무것도 누르지 않아도 됩니다.',
      d_smetti: '보기 중지',
      d_titolo: '📂 AI 데이터',
      d_indica: '폴더를 한 번만 지정하면 다시는 파일을 고를 필요가 없습니다. AI가 거기에 저장하고 VDM이 알아서 채웁니다.',
      d_collega: '폴더 연결…',
      d_riattivato: 'AI 데이터를 다시 켰습니다.',
      k_copia1: '이것을 복사해 AI에 붙여넣으세요. 파일을 폴더 ',
      k_copia2: ' 에 저장하라고 이미 적혀 있습니다. 프로그램이 거기서 알아서 가져옵니다.',
      k_primacart: '<b>먼저 폴더를 연결하세요</b>(아래 AI 데이터 상자). 연결하지 않으면 AI가 파일을 어디에 둘지 몰라 매번 직접 찾아야 합니다.',
      t_scegli: '먼저 팀을 선택하세요.',
      t_nocart: '여기서는 폴더를 연결할 수 없습니다.',
      t_cartok: '폴더 연결됨: ',
      a_amano: 'AI가 찾은 내용은 이미 여기 있고 고칠 수 있습니다. 빠진 것은 직접 쓰세요. 비워 둔 줄은 시트에 나가지 않습니다.',
      s_giocatrici: '선수',
      s_foto: '장의 사진',
      s_statsq: '팀 기록',
      s_quintetti: '라인업',
      s_nonletti: '읽지 못함: ',
      s_nulla: '여기에는 읽을 수 있는 것이 없습니다',
      s_nopt: '여기에서 play type을 찾지 못했습니다',
      i_manca1: '가져왔습니다. 다만 파일에 없던 항목: ',
      i_manca2: ' — 그 수치는 InStat/Synergy에만 있습니다.',
      i_stemma: '엠블럼',
      i_nuove: '개의 새 카드',
      i_ptsu: 'play types — ',
      i_importate: '가져왔습니다: ',
      i_statimp: '기록을 가져왔습니다.',
      i_avsq: '팀 어드밴스드 기록',
      i_pt: 'play types',
      t_sceglia: '먼저 상대를 선택하세요.',
      t_arrivato: '받았습니다: ',
      t_nolega: '»: 그 팀은 리그에 없습니다.',
      h_avsq: '팀 어드밴스드 기록',
      i_schede: '개의 카드',
      i_aggiornati: '데이터 업데이트됨',
      i_fonte: 'AI가 준비함',
      sp_av: '어드밴스드 기록',
      sp_avT: 'Personnel 끝의 페이지 — 어드밴스드 기록과 play types',
      n_punti: '득점',
      n_ppp: '포제션당 득점',
      n_tiro: '필드골',
      n_due: '2점슛',
      n_tre: '3점슛',
      n_liberi: '자유투',
      n_assist: '어시스트',
      n_rimbalzi: '리바운드',
      n_rimbOff: '공격 리바운드',
      n_rimbDif: '수비 리바운드',
      n_perse: '턴오버',
      n_recuperi: '스틸',
      n_stoppate: '블록',
      col_pt: 'Play type',
      col_quintetto: '라인업',
      h_foglio: '📈 팀 어드밴스드 시트 — 직접 입력도 가능',
      h_medie: '경기당 평균',
      h_ptatt: 'Play types — 공격',
      h_ptdif: 'Play types — 수비',
      h_quintetti: '라인업',
      h_fonte: '출처',
      ph_fonte: '예: Hudl InStat — Serie A1, 27경기',
      h_avpt: '어드밴스드 기록과 play types',
      tit_ia: 'AI 사용',
      tit_avv: '상대',
      a_att: ' 개 공격, ',
      a_dif: ' 개 수비',
      a_ppp: ' 포제션당 득점',
      a_altri: '…그 외 ',
      h_attacco: '공격',
      h_tabellone: '볼과 보드',
      ann: '취소', scrivi: '카드에 쓰기'
    }
  };
  /* La lingua e' quella del programma (index.html: currentLang). Se non si
     legge, o la lingua non c'e' ancora nella tabella, si usa l'inglese. */
  function P(chiave) {
    let l = 'en';
    try { if (typeof currentLang !== 'undefined' && currentLang) l = currentLang; } catch (e) {}
    const t = PAROLE[l] || PAROLE.en;
    const v = (t[chiave] !== undefined) ? t[chiave] : PAROLE.en[chiave];
    return (v === undefined) ? '' : v;
  }
  /* IL FILE E' FATTO DI PIU' BLOCCHI SEPARATI (30/09/2026): P nasce qui, ma
     la usano anche i blocchi delle caselle a mano piu' in basso, che questo
     non lo vedono. Si appoggia a globale, e li' la si riprende. */
  try { globale.__vdmParola = P; } catch (e) {}

  /* LA RICHIESTA PER L'IA, NELLA LINGUA DELL'ALLENATORE (02/10/2026).
   *
   * Fino a ieri la richiesta da copiare era in inglese per tutti, e sopra
   * c'era scritto il perche': le pagine da cui l'IA deve leggere sono in
   * inglese. Vince ha aperto il pannello in italiano, ha visto il muro di
   * inglese e ha detto la cosa giusta: «penso che ognuno scriva nella lingua
   * sua alla propria IA».
   *
   * Ha ragione per due motivi che contano piu' del primo:
   *   · quel testo l'allenatore lo LEGGE prima di incollarlo. Se non lo
   *     capisce non puo' controllarlo, e incolla alla cieca una cosa che
   *     parla delle sue partite;
   *   · l'IA risponde nella lingua in cui le si parla. Un coach lituano
   *     chiedeva in inglese e si ritrovava la risposta in inglese, con le
   *     fonti lituane cercate peggio.
   *
   * Cosa resta in inglese, e deve restarci: i NOMI DEI CAMPI del file
   * ("logo", "numero", "stats", "playTypes"...) e la forma del JSON. Quelli
   * non sono parole da leggere, sono il modo in cui il programma ritrova le
   * cose dentro al file: tradurli vorrebbe dire non riconoscerlo piu'.
   *
   * Se una lingua manca si ripiega sull'inglese, come nel resto del file.
   */
  const RICH = {
    en: {
      trova: "Find everything you can about the basketball team \"%S\"",
      unFile: "and write ONE file named vdm-dati.json.",
      dove: "Where to save it:",
      doveCartella: [
        "  save it as vdm-dati.json inside the folder named \"%C\"",
        "  on my computer (most likely on my Desktop). My basketball program",
        "  watches that folder and picks the file up by itself.",
        "  If you cannot find the folder, ask me for its full path."],
      doveChiedi: [
        "  ask me where to save it: my basketball program watches one",
        "  specific folder, and the file has to end up in there."],
      guarda: [
        "Where to look, in this order:",
        "  1. the web — the club's official site, the league site, the federation;",
        "  2. if I have given you access to a statistics provider (Hudl InStat,",
        "     Synergy, or another), take the numbers from there: they are better."],
      quali: [
        "Which games (read this before anything else):",
        "  - HOW MANY: %P.",
        "  - ONE competition only, normally the national league.",
        "    Statistics sites default to \"current season\", which mixes the",
        "    league with cups and european games: that default is wrong here.",
        "    Set the filter, and set it again on every page — it resets.",
        "  - write in \"fonte\" WHICH competition, WHICH season and HOW MANY",
        "    games the numbers are based on. Team totals and player numbers",
        "    must come from the same set of games."],
      serve: "What I need:",
      regole: [
        "Rules:",
        "  - all values are averages per game, as the source shows them;",
        "  - copy the numbers as they are: do not round and do not recompute;",
        "  - leave out anything you cannot find. NEVER invent a value;",
        "  - a partial file is fine. If you only find the photos, send a file",
        "    with just the photos: it adds to what is already there, it does",
        "    not replace it. Better half a file than an invented one;",
        "  - use the CURRENT roster. For a player who joined this season, last",
        "    season's numbers are her old team's: you may use them, but say so",
        "    in \"fonte\". If she has never played at this level, leave her",
        "    statistics out and keep her name, number and photo;",
        "  - tell me at the end where you took each thing from, and what you",
        "    could not find."],
      forma: "The shape of the file:",
      chiedi: {
        logo: "the team logo (a direct link to the image), in \"logo\"",
        foto: "a photo of each player (a direct link to the image), in \"foto\"",
        player: "jersey number, position, height and year of birth, in \"numero\", \"ruolo\", \"altezza\", \"nascita\"",
        stat: "per-game statistics in \"stats\": pts, reb, ast, p2, p3, ft",
        avanzate: "advanced statistics in \"avanzate\" (minutes, games, points per possession, offensive/defensive rebounds, steals, turnovers, fouls drawn, plus/minus), the team totals in \"squadraStat\", and the best lineups in \"quintetti\"",
        playtype: "play types in \"playTypes\", both \"attacco\" and \"difesa\", each with name, share of the team possessions, possessions, points and points per possession. THEN, for each player, one line of her own in her \"playTypes\" field, written exactly like this: \"ATT <name> <share>% (<points per possession>) - ...\" with at most FOUR items — the two things she does most in attack and the two she is attacked on most in defence. In that player line the percentage is the share of HER OWN possessions, not of the team's: if she used 20 possessions and 5 were catch and shoot, that is 25%. Sort by how often she does it, not by percentage"},
      dillo: {
        ultime5: "the LAST 5 games only — I want to know how they are playing now, not in October",
        ultime10: "the LAST 10 games only — I want their recent form, not the whole season",
        stagione: "the CURRENT season, all the games played so far",
        scorsa: "LAST season, the one already finished (the current one has not started, or has too few games to mean anything)"}
    },
    it: {
      trova: "Trova tutto quello che puoi sulla squadra di pallacanestro \"%S\"",
      unFile: "e scrivi UN file che si chiama vdm-dati.json.",
      dove: "Dove salvarlo:",
      doveCartella: [
        "  salvalo come vdm-dati.json dentro la cartella che si chiama \"%C\"",
        "  sul mio computer (molto probabilmente sulla Scrivania). Il mio",
        "  programma di pallacanestro guarda quella cartella e il file se lo",
        "  prende da solo. Se non trovi la cartella, chiedimi dov'è per esteso."],
      doveChiedi: [
        "  chiedimi dove salvarlo: il mio programma di pallacanestro guarda una",
        "  cartella precisa, e il file deve finire lì dentro."],
      guarda: [
        "Dove cercare, in quest'ordine:",
        "  1. internet — il sito ufficiale del club, quello della lega, la federazione;",
        "  2. se ti ho dato accesso a un fornitore di statistiche (Hudl InStat,",
        "     Synergy o un altro), prendi i numeri da lì: sono migliori."],
      quali: [
        "Quali partite (leggi questo prima di tutto il resto):",
        "  - QUANTE: %P.",
        "  - UNA sola competizione, di norma il campionato nazionale.",
        "    I siti di statistiche partono da \"stagione in corso\", che mette",
        "    insieme campionato, coppe e partite europee: lì quella voce è",
        "    sbagliata. Imposta il filtro, e rimettilo su ogni pagina: si azzera.",
        "  - scrivi in \"fonte\" QUALE competizione, QUALE stagione e SU QUANTE",
        "    partite sono i numeri. I totali di squadra e i numeri delle",
        "    giocatrici devono venire dalle stesse partite."],
      serve: "Cosa mi serve:",
      regole: [
        "Regole:",
        "  - tutti i valori sono medie a partita, come li mostra la fonte;",
        "  - copia i numeri come stanno: non arrotondare e non ricalcolare;",
        "  - lascia fuori quello che non trovi. Non inventare MAI un valore;",
        "  - un file parziale va bene. Se trovi solo le foto, mandami un file",
        "    con le sole foto: si aggiunge a quello che c'è già, non lo",
        "    sostituisce. Meglio mezzo file che uno inventato;",
        "  - usa il roster DI ADESSO. Di una giocatrice arrivata quest'anno, i",
        "    numeri dell'anno scorso sono della sua vecchia squadra: puoi usarli,",
        "    ma dillo in \"fonte\". Se non ha mai giocato a questo livello, lascia",
        "    fuori le statistiche e tieni nome, numero e foto;",
        "  - alla fine dimmi da dove hai preso ogni cosa, e cosa non sei",
        "    riuscito a trovare."],
      forma: "Com'è fatto il file:",
      chiedi: {
        logo: "lo stemma della squadra (un link diretto all'immagine), in \"logo\"",
        foto: "una foto di ogni giocatrice (un link diretto all'immagine), in \"foto\"",
        player: "numero di maglia, ruolo, altezza e anno di nascita, in \"numero\", \"ruolo\", \"altezza\", \"nascita\"",
        stat: "le statistiche a partita in \"stats\": pts, reb, ast, p2, p3, ft",
        avanzate: "le statistiche avanzate in \"avanzate\" (minuti, partite, punti per possesso, rimbalzi offensivi/difensivi, palle recuperate, palle perse, falli subiti, più/meno), i totali di squadra in \"squadraStat\" e i migliori quintetti in \"quintetti\"",
        playtype: "i play type in \"playTypes\", sia \"attacco\" sia \"difesa\", ognuno con il nome, la fetta dei possessi di squadra, i possessi, i punti e i punti per possesso. POI, per ogni giocatrice, una riga sua nel suo campo \"playTypes\", scritta esattamente così: \"ATT <nome> <fetta>% (<punti per possesso>) - ...\" con al massimo QUATTRO voci: le due cose che fa di più in attacco e le due su cui viene attaccata di più in difesa. In quella riga la percentuale è la fetta dei possessi SUOI, non di quelli della squadra: se ha usato 20 possessi e 5 erano catch and shoot, è il 25%. Ordina per quanto spesso lo fa, non per percentuale"},
      dillo: {
        ultime5: "solo le ULTIME 5 partite: voglio sapere come stanno giocando adesso, non a ottobre",
        ultime10: "solo le ULTIME 10 partite: voglio la forma recente, non tutta la stagione",
        stagione: "la stagione IN CORSO, tutte le partite giocate finora",
        scorsa: "la stagione SCORSA, quella già finita (questa non è ancora cominciata, o ha troppe poche partite per dire qualcosa)"}
    },
    es: {
      trova: "Encuentra todo lo que puedas sobre el equipo de baloncesto \"%S\"",
      unFile: "y escribe UN archivo llamado vdm-dati.json.",
      dove: "Dónde guardarlo:",
      doveCartella: [
        "  guárdalo como vdm-dati.json dentro de la carpeta llamada \"%C\"",
        "  en mi ordenador (lo más probable, en el Escritorio). Mi programa de",
        "  baloncesto vigila esa carpeta y coge el archivo él solo.",
        "  Si no encuentras la carpeta, pídeme la ruta completa."],
      doveChiedi: [
        "  pregúntame dónde guardarlo: mi programa de baloncesto vigila una",
        "  carpeta concreta, y el archivo tiene que acabar ahí."],
      guarda: [
        "Dónde buscar, en este orden:",
        "  1. internet: la web oficial del club, la de la liga, la federación;",
        "  2. si te he dado acceso a un proveedor de estadísticas (Hudl InStat,",
        "     Synergy u otro), coge los números de ahí: son mejores."],
      quali: [
        "Qué partidos (lee esto antes que nada):",
        "  - CUÁNTOS: %P.",
        "  - UNA sola competición, normalmente la liga nacional.",
        "    Las webs de estadísticas arrancan en \"temporada actual\", que mezcla",
        "    liga, copas y partidos europeos: ahí esa opción está mal.",
        "    Pon el filtro, y vuelve a ponerlo en cada página: se reinicia.",
        "  - escribe en \"fonte\" QUÉ competición, QUÉ temporada y SOBRE CUÁNTOS",
        "    partidos son los números. Los totales del equipo y los de las",
        "    jugadoras tienen que salir de los mismos partidos."],
      serve: "Lo que necesito:",
      regole: [
        "Reglas:",
        "  - todos los valores son medias por partido, tal como los da la fuente;",
        "  - copia los números como están: no redondees y no recalcules;",
        "  - deja fuera lo que no encuentres. NUNCA te inventes un valor;",
        "  - un archivo parcial vale. Si solo encuentras las fotos, mándame un",
        "    archivo solo con las fotos: se suma a lo que ya hay, no lo",
        "    sustituye. Mejor medio archivo que uno inventado;",
        "  - usa la plantilla DE AHORA. De una jugadora llegada este año, los",
        "    números del año pasado son de su equipo anterior: puedes usarlos,",
        "    pero dilo en \"fonte\". Si nunca ha jugado a este nivel, deja fuera",
        "    las estadísticas y conserva nombre, dorsal y foto;",
        "  - al final dime de dónde has sacado cada cosa y qué no has podido",
        "    encontrar."],
      forma: "Cómo es el archivo:",
      chiedi: {
        logo: "el escudo del equipo (un enlace directo a la imagen), en \"logo\"",
        foto: "una foto de cada jugadora (un enlace directo a la imagen), en \"foto\"",
        player: "dorsal, posición, altura y año de nacimiento, en \"numero\", \"ruolo\", \"altezza\", \"nascita\"",
        stat: "las estadísticas por partido en \"stats\": pts, reb, ast, p2, p3, ft",
        avanzate: "las estadísticas avanzadas en \"avanzate\" (minutos, partidos, puntos por posesión, rebotes ofensivos/defensivos, robos, pérdidas, faltas recibidas, más/menos), los totales del equipo en \"squadraStat\" y los mejores quintetos en \"quintetti\"",
        playtype: "los play types en \"playTypes\", tanto \"attacco\" como \"difesa\", cada uno con el nombre, la parte de las posesiones del equipo, las posesiones, los puntos y los puntos por posesión. LUEGO, para cada jugadora, una línea suya en su campo \"playTypes\", escrita exactamente así: \"ATT <nombre> <parte>% (<puntos por posesión>) - ...\" con un máximo de CUATRO entradas: las dos cosas que más hace en ataque y las dos por las que más la atacan en defensa. En esa línea el porcentaje es la parte de SUS posesiones, no de las del equipo: si usó 20 posesiones y 5 fueron catch and shoot, es el 25%. Ordena por cuánto lo hace, no por porcentaje"},
      dillo: {
        ultime5: "solo los ÚLTIMOS 5 partidos: quiero saber cómo están jugando ahora, no en octubre",
        ultime10: "solo los ÚLTIMOS 10 partidos: quiero su forma reciente, no toda la temporada",
        stagione: "la temporada ACTUAL, todos los partidos jugados hasta ahora",
        scorsa: "la temporada PASADA, la ya terminada (esta no ha empezado, o tiene muy pocos partidos para significar algo)"}
    },
    fr: {
      trova: "Trouve tout ce que tu peux sur l'équipe de basket \"%S\"",
      unFile: "et écris UN fichier appelé vdm-dati.json.",
      dove: "Où l'enregistrer :",
      doveCartella: [
        "  enregistre-le sous vdm-dati.json dans le dossier appelé \"%C\"",
        "  sur mon ordinateur (très probablement sur le Bureau). Mon programme",
        "  de basket surveille ce dossier et récupère le fichier tout seul.",
        "  Si tu ne trouves pas le dossier, demande-moi son chemin complet."],
      doveChiedi: [
        "  demande-moi où l'enregistrer : mon programme de basket surveille un",
        "  dossier précis, et le fichier doit atterrir dedans."],
      guarda: [
        "Où chercher, dans cet ordre :",
        "  1. le web — le site officiel du club, celui de la ligue, la fédération ;",
        "  2. si je t'ai donné accès à un fournisseur de statistiques (Hudl InStat,",
        "     Synergy ou un autre), prends les chiffres là : ils sont meilleurs."],
      quali: [
        "Quels matchs (lis ça avant tout le reste) :",
        "  - COMBIEN : %P.",
        "  - UNE seule compétition, normalement le championnat national.",
        "    Les sites de statistiques démarrent sur \"saison en cours\", qui mélange",
        "    championnat, coupes et matchs européens : ce réglage est faux ici.",
        "    Mets le filtre, et remets-le sur chaque page : il se réinitialise.",
        "  - écris dans \"fonte\" QUELLE compétition, QUELLE saison et SUR COMBIEN",
        "    de matchs portent les chiffres. Les totaux de l'équipe et les chiffres",
        "    des joueuses doivent venir des mêmes matchs."],
      serve: "Ce qu'il me faut :",
      regole: [
        "Règles :",
        "  - toutes les valeurs sont des moyennes par match, telles que la source les donne ;",
        "  - recopie les chiffres tels quels : n'arrondis pas et ne recalcule pas ;",
        "  - laisse de côté ce que tu ne trouves pas. N'invente JAMAIS une valeur ;",
        "  - un fichier partiel convient. Si tu ne trouves que les photos, envoie",
        "    un fichier avec seulement les photos : il s'ajoute à ce qui existe",
        "    déjà, il ne le remplace pas. Mieux vaut un demi-fichier qu'un inventé ;",
        "  - utilise l'effectif D'AUJOURD'HUI. Pour une joueuse arrivée cette année,",
        "    les chiffres de l'an dernier sont ceux de son ancien club : tu peux les",
        "    utiliser, mais dis-le dans \"fonte\". Si elle n'a jamais joué à ce niveau,",
        "    laisse les statistiques de côté et garde nom, numéro et photo ;",
        "  - à la fin, dis-moi d'où tu as pris chaque chose et ce que tu n'as pas",
        "    réussi à trouver."],
      forma: "À quoi ressemble le fichier :",
      chiedi: {
        logo: "le logo de l'équipe (un lien direct vers l'image), dans \"logo\"",
        foto: "une photo de chaque joueuse (un lien direct vers l'image), dans \"foto\"",
        player: "numéro de maillot, poste, taille et année de naissance, dans \"numero\", \"ruolo\", \"altezza\", \"nascita\"",
        stat: "les statistiques par match dans \"stats\" : pts, reb, ast, p2, p3, ft",
        avanzate: "les statistiques avancées dans \"avanzate\" (minutes, matchs, points par possession, rebonds offensifs/défensifs, interceptions, balles perdues, fautes provoquées, plus/moins), les totaux de l'équipe dans \"squadraStat\" et les meilleurs cinq dans \"quintetti\"",
        playtype: "les play types dans \"playTypes\", à la fois \"attacco\" et \"difesa\", chacun avec le nom, la part des possessions de l'équipe, les possessions, les points et les points par possession. ENSUITE, pour chaque joueuse, une ligne à elle dans son champ \"playTypes\", écrite exactement comme ça : \"ATT <nom> <part>% (<points par possession>) - ...\" avec au maximum QUATRE entrées : les deux choses qu'elle fait le plus en attaque et les deux sur lesquelles on l'attaque le plus en défense. Dans cette ligne le pourcentage est la part de SES possessions, pas de celles de l'équipe : si elle a utilisé 20 possessions et que 5 étaient catch and shoot, c'est 25%. Trie par fréquence, pas par pourcentage"},
      dillo: {
        ultime5: "seulement les 5 DERNIERS matchs — je veux savoir comment elles jouent maintenant, pas en octobre",
        ultime10: "seulement les 10 DERNIERS matchs — je veux leur forme récente, pas toute la saison",
        stagione: "la saison EN COURS, tous les matchs joués jusqu'ici",
        scorsa: "la saison DERNIÈRE, celle déjà terminée (celle en cours n'a pas commencé, ou a trop peu de matchs pour vouloir dire quelque chose)"}
    },
    pt: {
      trova: "Encontra tudo o que puderes sobre a equipa de basquetebol \"%S\"",
      unFile: "e escreve UM ficheiro chamado vdm-dati.json.",
      dove: "Onde o guardar:",
      doveCartella: [
        "  guarda-o como vdm-dati.json dentro da pasta chamada \"%C\"",
        "  no meu computador (muito provavelmente no Ambiente de Trabalho). O meu",
        "  programa de basquetebol vigia essa pasta e vai buscar o ficheiro sozinho.",
        "  Se não encontrares a pasta, pede-me o caminho completo."],
      doveChiedi: [
        "  pergunta-me onde o guardar: o meu programa de basquetebol vigia uma",
        "  pasta específica, e o ficheiro tem de ir parar lá dentro."],
      guarda: [
        "Onde procurar, por esta ordem:",
        "  1. a internet — o site oficial do clube, o da liga, a federação;",
        "  2. se te dei acesso a um fornecedor de estatísticas (Hudl InStat,",
        "     Synergy ou outro), tira os números de lá: são melhores."],
      quali: [
        "Que jogos (lê isto antes de tudo o resto):",
        "  - QUANTOS: %P.",
        "  - UMA só competição, normalmente o campeonato nacional.",
        "    Os sites de estatísticas começam em \"época atual\", que mistura",
        "    campeonato, taças e jogos europeus: ali essa opção está errada.",
        "    Põe o filtro, e volta a pô-lo em cada página: ele reinicia-se.",
        "  - escreve em \"fonte\" QUAL competição, QUAL época e SOBRE QUANTOS",
        "    jogos são os números. Os totais da equipa e os das jogadoras",
        "    têm de vir dos mesmos jogos."],
      serve: "O que preciso:",
      regole: [
        "Regras:",
        "  - todos os valores são médias por jogo, tal como a fonte os mostra;",
        "  - copia os números como estão: não arredondes e não recalcules;",
        "  - deixa de fora o que não encontrares. NUNCA inventes um valor;",
        "  - um ficheiro parcial serve. Se só encontrares as fotos, manda um",
        "    ficheiro só com as fotos: soma-se ao que já lá está, não o",
        "    substitui. Melhor meio ficheiro do que um inventado;",
        "  - usa o plantel DE AGORA. De uma jogadora que chegou este ano, os",
        "    números do ano passado são da equipa anterior: podes usá-los, mas",
        "    di-lo em \"fonte\". Se nunca jogou a este nível, deixa de fora as",
        "    estatísticas e guarda nome, número e foto;",
        "  - no fim diz-me de onde tiraste cada coisa e o que não conseguiste",
        "    encontrar."],
      forma: "Como é o ficheiro:",
      chiedi: {
        logo: "o emblema da equipa (uma ligação direta para a imagem), em \"logo\"",
        foto: "uma foto de cada jogadora (uma ligação direta para a imagem), em \"foto\"",
        player: "número da camisola, posição, altura e ano de nascimento, em \"numero\", \"ruolo\", \"altezza\", \"nascita\"",
        stat: "as estatísticas por jogo em \"stats\": pts, reb, ast, p2, p3, ft",
        avanzate: "as estatísticas avançadas em \"avanzate\" (minutos, jogos, pontos por posse, ressaltos ofensivos/defensivos, roubos, perdas de bola, faltas sofridas, mais/menos), os totais da equipa em \"squadraStat\" e os melhores cincos em \"quintetti\"",
        playtype: "os play types em \"playTypes\", tanto \"attacco\" como \"difesa\", cada um com o nome, a fatia das posses da equipa, as posses, os pontos e os pontos por posse. DEPOIS, para cada jogadora, uma linha dela no seu campo \"playTypes\", escrita exatamente assim: \"ATT <nome> <fatia>% (<pontos por posse>) - ...\" com no máximo QUATRO entradas: as duas coisas que mais faz no ataque e as duas em que mais a atacam na defesa. Nessa linha a percentagem é a fatia das posses DELA, não das da equipa: se usou 20 posses e 5 foram catch and shoot, são 25%. Ordena por quantas vezes o faz, não por percentagem"},
      dillo: {
        ultime5: "só os ÚLTIMOS 5 jogos — quero saber como estão a jogar agora, não em outubro",
        ultime10: "só os ÚLTIMOS 10 jogos — quero a forma recente, não a época toda",
        stagione: "a época ATUAL, todos os jogos jogados até agora",
        scorsa: "a época PASSADA, a que já terminou (esta ainda não começou, ou tem jogos a menos para dizer alguma coisa)"}
    },
    de: {
      trova: "Finde alles, was du über die Basketballmannschaft \"%S\" findest,",
      unFile: "und schreibe EINE Datei mit dem Namen vdm-dati.json.",
      dove: "Wohin damit:",
      doveCartella: [
        "  speichere sie als vdm-dati.json in dem Ordner namens \"%C\"",
        "  auf meinem Rechner (höchstwahrscheinlich auf dem Schreibtisch). Mein",
        "  Basketballprogramm beobachtet diesen Ordner und holt sich die Datei selbst.",
        "  Wenn du den Ordner nicht findest, frag mich nach dem vollen Pfad."],
      doveChiedi: [
        "  frag mich, wohin damit: mein Basketballprogramm beobachtet genau einen",
        "  Ordner, und die Datei muss dort landen."],
      guarda: [
        "Wo du suchst, in dieser Reihenfolge:",
        "  1. im Netz — die offizielle Seite des Vereins, die der Liga, der Verband;",
        "  2. wenn ich dir Zugang zu einem Statistikanbieter gegeben habe (Hudl InStat,",
        "     Synergy oder ein anderer), nimm die Zahlen von dort: die sind besser."],
      quali: [
        "Welche Spiele (lies das zuerst):",
        "  - WIE VIELE: %P.",
        "  - NUR EIN Wettbewerb, normalerweise die nationale Liga.",
        "    Statistikseiten starten bei \"laufende Saison\", und das mischt Liga,",
        "    Pokal und Europapokal zusammen: diese Voreinstellung ist hier falsch.",
        "    Setz den Filter, und setz ihn auf jeder Seite neu — er springt zurück.",
        "  - schreib in \"fonte\" WELCHER Wettbewerb, WELCHE Saison und AUF WIE VIELEN",
        "    Spielen die Zahlen beruhen. Mannschaftssummen und Spielerinnenzahlen",
        "    müssen aus denselben Spielen kommen."],
      serve: "Was ich brauche:",
      regole: [
        "Regeln:",
        "  - alle Werte sind Durchschnitte pro Spiel, so wie die Quelle sie zeigt;",
        "  - übernimm die Zahlen, wie sie sind: nicht runden und nicht neu rechnen;",
        "  - lass weg, was du nicht findest. Erfinde NIEMALS einen Wert;",
        "  - eine unvollständige Datei ist in Ordnung. Wenn du nur die Fotos",
        "    findest, schick eine Datei nur mit den Fotos: sie kommt zu dem dazu,",
        "    was schon da ist, und ersetzt es nicht. Lieber eine halbe Datei als",
        "    eine erfundene;",
        "  - nimm den AKTUELLEN Kader. Bei einer Spielerin, die diese Saison",
        "    gekommen ist, gehören die Zahlen vom Vorjahr ihrem alten Verein: du",
        "    darfst sie nehmen, aber schreib es in \"fonte\". Hat sie nie auf diesem",
        "    Niveau gespielt, lass die Statistik weg und behalte Name, Nummer, Foto;",
        "  - sag mir am Ende, woher du was hast und was du nicht gefunden hast."],
      forma: "So sieht die Datei aus:",
      chiedi: {
        logo: "das Vereinswappen (ein direkter Link zum Bild), in \"logo\"",
        foto: "ein Foto jeder Spielerin (ein direkter Link zum Bild), in \"foto\"",
        player: "Trikotnummer, Position, Größe und Geburtsjahr, in \"numero\", \"ruolo\", \"altezza\", \"nascita\"",
        stat: "die Statistik pro Spiel in \"stats\": pts, reb, ast, p2, p3, ft",
        avanzate: "die erweiterte Statistik in \"avanzate\" (Minuten, Spiele, Punkte pro Ballbesitz, Offensiv-/Defensivrebounds, Steals, Ballverluste, gezogene Fouls, Plus/Minus), die Mannschaftssummen in \"squadraStat\" und die besten Fünfer in \"quintetti\"",
        playtype: "die Play Types in \"playTypes\", sowohl \"attacco\" als auch \"difesa\", jeweils mit Name, Anteil an den Ballbesitzen der Mannschaft, Ballbesitze, Punkte und Punkte pro Ballbesitz. DANN für jede Spielerin eine eigene Zeile in ihrem Feld \"playTypes\", genau so geschrieben: \"ATT <Name> <Anteil>% (<Punkte pro Ballbesitz>) - ...\" mit höchstens VIER Einträgen — die zwei Dinge, die sie im Angriff am meisten macht, und die zwei, über die sie in der Verteidigung am meisten angegriffen wird. In dieser Zeile ist der Prozentsatz der Anteil IHRER EIGENEN Ballbesitze, nicht der der Mannschaft: hat sie 20 Ballbesitze gespielt und 5 davon catch and shoot, sind das 25%. Sortiere danach, wie oft sie es macht, nicht nach Prozent"},
      dillo: {
        ultime5: "nur die LETZTEN 5 Spiele — ich will wissen, wie sie jetzt spielen, nicht wie im Oktober",
        ultime10: "nur die LETZTEN 10 Spiele — ich will die aktuelle Form, nicht die ganze Saison",
        stagione: "die LAUFENDE Saison, alle bisher gespielten Spiele",
        scorsa: "die LETZTE Saison, die schon zu Ende ist (die laufende hat noch nicht begonnen oder hat zu wenige Spiele, um etwas zu bedeuten)"}
    },
    lt: {
      trova: "Surask viską, ką gali, apie krepšinio komandą \"%S\"",
      unFile: "ir parašyk VIENĄ failą, pavadintą vdm-dati.json.",
      dove: "Kur jį išsaugoti:",
      doveCartella: [
        "  išsaugok kaip vdm-dati.json aplanke, pavadintame \"%C\"",
        "  mano kompiuteryje (greičiausiai Darbalaukyje). Mano krepšinio",
        "  programa stebi tą aplanką ir failą pasiima pati.",
        "  Jei aplanko nerandi, paklausk manęs viso kelio."],
      doveChiedi: [
        "  paklausk manęs, kur jį išsaugoti: mano krepšinio programa stebi vieną",
        "  konkretų aplanką, ir failas turi atsidurti būtent ten."],
      guarda: [
        "Kur ieškoti, tokia tvarka:",
        "  1. internete — oficialiame klubo tinklalapyje, lygos, federacijos;",
        "  2. jei daviau tau prieigą prie statistikos tiekėjo (Hudl InStat,",
        "     Synergy ar kito), imk skaičius iš ten: jie geresni."],
      quali: [
        "Kurios rungtynės (perskaityk tai pirmiausia):",
        "  - KIEK: %P.",
        "  - TIK VIENOS varžybos, paprastai nacionalinis čempionatas.",
        "    Statistikos svetainės pradeda nuo \"einamojo sezono\", kuris sumaišo",
        "    čempionatą, taures ir Europos rungtynes: ten tas nustatymas klaidingas.",
        "    Nustatyk filtrą ir nustatyk jį iš naujo kiekviename puslapyje — jis atsistato.",
        "  - parašyk \"fonte\" KOKIOS varžybos, KOKS sezonas ir IŠ KIEK",
        "    rungtynių yra skaičiai. Komandos sumos ir žaidėjų skaičiai",
        "    turi būti iš tų pačių rungtynių."],
      serve: "Ko man reikia:",
      regole: [
        "Taisyklės:",
        "  - visos reikšmės yra vidurkiai per rungtynes, tokie, kokius rodo šaltinis;",
        "  - nurašyk skaičius tokius, kokie yra: neapvalink ir neperskaičiuok;",
        "  - palik nuošalyje tai, ko nerandi. NIEKADA neišgalvok reikšmės;",
        "  - dalinis failas tinka. Jei radai tik nuotraukas, atsiųsk failą vien su",
        "    nuotraukomis: jis prisideda prie to, kas jau yra, ir nieko nepakeičia.",
        "    Geriau pusė failo nei išgalvotas;",
        "  - naudok DABARTINĘ sudėtį. Žaidėjos, atėjusios šį sezoną, praėjusio",
        "    sezono skaičiai yra jos senos komandos: gali juos naudoti, bet parašyk",
        "    tai \"fonte\". Jei ji niekada nežaidė šiame lygyje, statistiką palik",
        "    nuošalyje ir palik vardą, numerį ir nuotrauką;",
        "  - pabaigoje pasakyk, iš kur ką paėmei ir ko nepavyko rasti."],
      forma: "Kaip atrodo failas:",
      chiedi: {
        logo: "komandos logotipas (tiesioginė nuoroda į paveikslėlį), laukelyje \"logo\"",
        foto: "kiekvienos žaidėjos nuotrauka (tiesioginė nuoroda į paveikslėlį), laukelyje \"foto\"",
        player: "marškinėlių numeris, pozicija, ūgis ir gimimo metai, laukeliuose \"numero\", \"ruolo\", \"altezza\", \"nascita\"",
        stat: "statistika per rungtynes laukelyje \"stats\": pts, reb, ast, p2, p3, ft",
        avanzate: "išplėstinė statistika laukelyje \"avanzate\" (minutės, rungtynės, taškai per ataką, puolimo/gynybos atkovoti kamuoliai, perimti kamuoliai, klaidos, išprovokuotos pražangos, pliusas/minusas), komandos sumos laukelyje \"squadraStat\" ir geriausi penketai laukelyje \"quintetti\"",
        playtype: "play type laukelyje \"playTypes\", ir \"attacco\", ir \"difesa\", kiekvienas su pavadinimu, komandos atakų dalimi, atakomis, taškais ir taškais per ataką. PASKUI kiekvienai žaidėjai po atskirą eilutę jos laukelyje \"playTypes\", parašytą būtent taip: \"ATT <vardas> <dalis>% (<taškai per ataką>) - ...\" su daugiausia KETURIAIS įrašais — du dalykai, kuriuos ji daro dažniausiai puolime, ir du, kuriais prieš ją žaidžiama gynyboje. Toje eilutėje procentas yra JOS PAČIOS atakų dalis, ne komandos: jei ji sužaidė 20 atakų ir 5 buvo catch and shoot, tai 25%. Rikiuok pagal dažnumą, ne pagal procentą"},
      dillo: {
        ultime5: "tik PASKUTINES 5 rungtynes — noriu žinoti, kaip jos žaidžia dabar, o ne spalį",
        ultime10: "tik PASKUTINES 10 rungtynių — noriu dabartinės formos, ne viso sezono",
        stagione: "EINAMASIS sezonas, visos iki šiol sužaistos rungtynės",
        scorsa: "PRAĖJĘS sezonas, jau pasibaigęs (šis dar neprasidėjo arba turi per mažai rungtynių, kad ką nors reikštų)"}
    },
    pl: {
      trova: "Znajdź wszystko, co możesz, o drużynie koszykówki \"%S\"",
      unFile: "i napisz JEDEN plik o nazwie vdm-dati.json.",
      dove: "Gdzie go zapisać:",
      doveCartella: [
        "  zapisz go jako vdm-dati.json w folderze o nazwie \"%C\"",
        "  na moim komputerze (najpewniej na Pulpicie). Mój program do",
        "  koszykówki obserwuje ten folder i sam zabiera plik.",
        "  Jeśli nie znajdziesz folderu, zapytaj mnie o pełną ścieżkę."],
      doveChiedi: [
        "  zapytaj mnie, gdzie go zapisać: mój program do koszykówki obserwuje",
        "  jeden konkretny folder i plik musi tam trafić."],
      guarda: [
        "Gdzie szukać, w tej kolejności:",
        "  1. w sieci — oficjalna strona klubu, strona ligi, federacja;",
        "  2. jeśli dałem ci dostęp do dostawcy statystyk (Hudl InStat,",
        "     Synergy lub innego), bierz liczby stamtąd: są lepsze."],
      quali: [
        "Które mecze (przeczytaj to przed wszystkim innym):",
        "  - ILE: %P.",
        "  - TYLKO JEDNE rozgrywki, zwykle liga krajowa.",
        "    Serwisy statystyczne zaczynają od \"bieżącego sezonu\", który miesza",
        "    ligę, puchary i mecze europejskie: to ustawienie jest tu błędne.",
        "    Ustaw filtr i ustawiaj go na każdej stronie — sam się resetuje.",
        "  - napisz w \"fonte\" JAKIE rozgrywki, JAKI sezon i Z ILU",
        "    meczów pochodzą liczby. Sumy drużyny i liczby zawodniczek",
        "    muszą pochodzić z tych samych meczów."],
      serve: "Czego potrzebuję:",
      regole: [
        "Zasady:",
        "  - wszystkie wartości to średnie na mecz, tak jak pokazuje je źródło;",
        "  - przepisz liczby takie, jakie są: nie zaokrąglaj i nie przeliczaj;",
        "  - pomiń to, czego nie znajdziesz. NIGDY nie wymyślaj wartości;",
        "  - niepełny plik jest w porządku. Jeśli znajdziesz tylko zdjęcia, przyślij",
        "    plik z samymi zdjęciami: dołoży się do tego, co już jest, i niczego",
        "    nie zastąpi. Lepiej pół pliku niż plik wymyślony;",
        "  - użyj OBECNEGO składu. U zawodniczki, która przyszła w tym sezonie,",
        "    liczby z zeszłego roku należą do jej starej drużyny: możesz ich użyć,",
        "    ale napisz to w \"fonte\". Jeśli nigdy nie grała na tym poziomie, pomiń",
        "    statystyki i zostaw nazwisko, numer i zdjęcie;",
        "  - na końcu powiedz mi, skąd co wziąłeś i czego nie udało się znaleźć."],
      forma: "Jak wygląda plik:",
      chiedi: {
        logo: "herb drużyny (bezpośredni link do obrazka), w \"logo\"",
        foto: "zdjęcie każdej zawodniczki (bezpośredni link do obrazka), w \"foto\"",
        player: "numer, pozycja, wzrost i rok urodzenia, w \"numero\", \"ruolo\", \"altezza\", \"nascita\"",
        stat: "statystyki na mecz w \"stats\": pts, reb, ast, p2, p3, ft",
        avanzate: "statystyki zaawansowane w \"avanzate\" (minuty, mecze, punkty na posiadanie, zbiórki w ataku/obronie, przechwyty, straty, sprowokowane faule, plus/minus), sumy drużyny w \"squadraStat\" i najlepsze piątki w \"quintetti\"",
        playtype: "play typy w \"playTypes\", zarówno \"attacco\", jak i \"difesa\", każdy z nazwą, udziałem w posiadaniach drużyny, posiadaniami, punktami i punktami na posiadanie. POTEM dla każdej zawodniczki osobna linia w jej polu \"playTypes\", napisana dokładnie tak: \"ATT <nazwa> <udział>% (<punkty na posiadanie>) - ...\" z maksymalnie CZTEREMA pozycjami — dwie rzeczy, które robi najczęściej w ataku, i dwie, którymi najczęściej atakuje się ją w obronie. W tej linii procent to udział JEJ WŁASNYCH posiadań, nie drużyny: jeśli rozegrała 20 posiadań, a 5 było catch and shoot, to 25%. Sortuj po tym, jak często to robi, nie po procencie"},
      dillo: {
        ultime5: "tylko 5 OSTATNICH meczów — chcę wiedzieć, jak grają teraz, a nie w październiku",
        ultime10: "tylko 10 OSTATNICH meczów — chcę ich obecną formę, nie cały sezon",
        stagione: "BIEŻĄCY sezon, wszystkie dotąd rozegrane mecze",
        scorsa: "POPRZEDNI sezon, ten już zakończony (bieżący się nie zaczął albo ma za mało meczów, żeby cokolwiek znaczyć)"}
    },
    ru: {
      trova: "Найди всё, что сможешь, о баскетбольной команде \"%S\"",
      unFile: "и напиши ОДИН файл с именем vdm-dati.json.",
      dove: "Куда его сохранить:",
      doveCartella: [
        "  сохрани его как vdm-dati.json в папку с именем \"%C\"",
        "  на моём компьютере (скорее всего, на Рабочем столе). Моя",
        "  баскетбольная программа следит за этой папкой и забирает файл сама.",
        "  Если папку не найдёшь, спроси у меня полный путь."],
      doveChiedi: [
        "  спроси у меня, куда его сохранить: моя баскетбольная программа следит",
        "  за одной конкретной папкой, и файл должен попасть именно туда."],
      guarda: [
        "Где искать, в таком порядке:",
        "  1. в интернете — официальный сайт клуба, сайт лиги, федерация;",
        "  2. если я дал тебе доступ к поставщику статистики (Hudl InStat,",
        "     Synergy или другому), бери цифры оттуда: они лучше."],
      quali: [
        "Какие матчи (прочитай это раньше всего остального):",
        "  - СКОЛЬКО: %P.",
        "  - ТОЛЬКО ОДИН турнир, обычно национальный чемпионат.",
        "    Сайты статистики начинают с «текущего сезона», который смешивает",
        "    чемпионат, кубки и европейские матчи: здесь эта настройка неверна.",
        "    Поставь фильтр и ставь его заново на каждой странице — он сбрасывается.",
        "  - напиши в \"fonte\", КАКОЙ турнир, КАКОЙ сезон и ПО СКОЛЬКИМ",
        "    матчам взяты цифры. Командные итоги и цифры игроков должны быть",
        "    из одних и тех же матчей."],
      serve: "Что мне нужно:",
      regole: [
        "Правила:",
        "  - все значения — средние за матч, как их показывает источник;",
        "  - переписывай цифры как есть: не округляй и не пересчитывай;",
        "  - то, что не нашёл, оставь пустым. НИКОГДА не выдумывай значение;",
        "  - неполный файл подходит. Если нашёл только фотографии, пришли файл",
        "    с одними фотографиями: он добавится к тому, что уже есть, и ничего",
        "    не заменит. Лучше половина файла, чем выдуманный;",
        "  - бери СЕГОДНЯШНИЙ состав. У игрока, пришедшего в этом сезоне, цифры",
        "    прошлого года принадлежат его прежней команде: их можно взять, но",
        "    напиши об этом в \"fonte\". Если он никогда не играл на этом уровне,",
        "    статистику оставь, а имя, номер и фото сохрани;",
        "  - в конце скажи, откуда что взял и чего найти не удалось."],
      forma: "Как устроен файл:",
      chiedi: {
        logo: "эмблема команды (прямая ссылка на картинку), в \"logo\"",
        foto: "фотография каждого игрока (прямая ссылка на картинку), в \"foto\"",
        player: "игровой номер, позиция, рост и год рождения, в \"numero\", \"ruolo\", \"altezza\", \"nascita\"",
        stat: "статистика за матч в \"stats\": pts, reb, ast, p2, p3, ft",
        avanzate: "продвинутая статистика в \"avanzate\" (минуты, матчи, очки за владение, подборы в нападении/защите, перехваты, потери, заработанные фолы, плюс/минус), командные итоги в \"squadraStat\" и лучшие пятёрки в \"quintetti\"",
        playtype: "play type в \"playTypes\", и \"attacco\", и \"difesa\", каждый с названием, долей от владений команды, владениями, очками и очками за владение. ЗАТЕМ для каждого игрока отдельная строка в его поле \"playTypes\", написанная ровно так: \"ATT <название> <доля>% (<очки за владение>) - ...\" не более ЧЕТЫРЁХ пунктов — две вещи, которые он чаще всего делает в нападении, и две, которыми его чаще всего атакуют в защите. В этой строке процент — доля ЕГО СОБСТВЕННЫХ владений, а не командных: если он сыграл 20 владений и 5 были catch and shoot, это 25%. Сортируй по частоте, а не по проценту"},
      dillo: {
        ultime5: "только ПОСЛЕДНИЕ 5 матчей — мне важно, как они играют сейчас, а не в октябре",
        ultime10: "только ПОСЛЕДНИЕ 10 матчей — мне нужна текущая форма, а не весь сезон",
        stagione: "ТЕКУЩИЙ сезон, все сыгранные до сих пор матчи",
        scorsa: "ПРОШЛЫЙ сезон, уже завершённый (текущий ещё не начался или в нём слишком мало матчей, чтобы что-то значить)"}
    },
    zh: {
      trova: "尽你所能找到关于篮球队 \"%S\" 的全部资料，",
      unFile: "并写成一个文件，命名为 vdm-dati.json。",
      dove: "保存到哪里：",
      doveCartella: [
        "  把它保存为 vdm-dati.json，放进我电脑上名为 \"%C\" 的文件夹",
        "  （多半在桌面上）。我的篮球程序会盯着那个文件夹，",
        "  自己把文件取走。",
        "  如果找不到这个文件夹，就问我它的完整路径。"],
      doveChiedi: [
        "  问我保存到哪里：我的篮球程序只盯着一个特定的文件夹，",
        "  文件必须落到那里面。"],
      guarda: [
        "按这个顺序去找：",
        "  1. 网上 —— 俱乐部官网、联赛官网、协会；",
        "  2. 如果我给了你统计服务商的权限（Hudl InStat、Synergy",
        "     或别的），就从那里取数字：那边的更好。"],
      quali: [
        "哪些比赛（这一段先看）：",
        "  - 多少场：%P。",
        "  - 只取一项赛事，通常是国内联赛。",
        "    统计网站默认是\"本赛季\"，那会把联赛、杯赛和欧战混在一起：",
        "    这里这个默认值是错的。",
        "    设好筛选，并且每翻一页都要重新设一次 —— 它会自己复位。",
        "  - 在 \"fonte\" 里写清楚是哪项赛事、哪个赛季、数字基于多少场比赛。",
        "    球队总计和球员数字必须来自同一批比赛。"],
      serve: "我需要的：",
      regole: [
        "规则：",
        "  - 所有数值都是场均，按来源显示的样子；",
        "  - 数字照抄：不要四舍五入，也不要重新计算；",
        "  - 找不到的就留空。绝对不要编造数值；",
        "  - 不完整的文件也可以。如果只找到照片，就发一个只有照片的文件：",
        "    它会加到已有的内容上，不会把原来的替换掉。",
        "    半个文件也好过编出来的；",
        "  - 用现在的球员名单。本赛季刚加盟的球员，上赛季的数字属于她的",
        "    前东家：可以用，但要在 \"fonte\" 里说明。如果她从没打过这个",
        "    级别，统计就不要了，保留姓名、号码和照片；",
        "  - 最后告诉我每一项是从哪里取的，以及哪些没能找到。"],
      forma: "文件的样子：",
      chiedi: {
        logo: "球队队徽（图片的直接链接），放在 \"logo\"",
        foto: "每名球员的照片（图片的直接链接），放在 \"foto\"",
        player: "球衣号码、位置、身高和出生年份，放在 \"numero\"、\"ruolo\"、\"altezza\"、\"nascita\"",
        stat: "场均统计放在 \"stats\"：pts、reb、ast、p2、p3、ft",
        avanzate: "进阶统计放在 \"avanzate\"（出场时间、场次、每回合得分、前场/后场篮板、抢断、失误、造犯规、正负值），球队总计放在 \"squadraStat\"，最佳阵容放在 \"quintetti\"",
        playtype: "play type 放在 \"playTypes\"，\"attacco\" 和 \"difesa\" 都要，每一项带名称、占全队回合的比例、回合数、得分和每回合得分。然后，为每名球员在她自己的 \"playTypes\" 字段里写一行，格式严格如下：\"ATT <名称> <比例>% (<每回合得分>) - ...\"，最多四项 —— 进攻端她做得最多的两样，防守端被打得最多的两样。那一行里的百分比是她自己回合的比例，不是全队的：如果她用了 20 个回合，其中 5 个是 catch and shoot，那就是 25%。按出现频率排序，不要按百分比排"},
      dillo: {
        ultime5: "只要最近 5 场 —— 我想知道她们现在打得怎么样，不是十月份",
        ultime10: "只要最近 10 场 —— 我要的是近期状态，不是整个赛季",
        stagione: "本赛季，到目前为止打过的所有比赛",
        scorsa: "上赛季，已经结束的那个（本赛季还没开始，或者场次太少说明不了问题）"}
    },
    ja: {
      trova: "バスケットボールチーム「%S」について、わかることをすべて調べて、",
      unFile: "vdm-dati.json という名前のファイルを1つ作ってください。",
      dove: "保存先：",
      doveCartella: [
        "  私のパソコンの「%C」というフォルダの中に、",
        "  vdm-dati.json という名前で保存してください（たいていデスクトップにあります）。",
        "  私のバスケットボールのプログラムがそのフォルダを見ていて、自分で読み取ります。",
        "  フォルダが見つからなければ、フルパスを聞いてください。"],
      doveChiedi: [
        "  保存先を私に聞いてください。私のバスケットボールのプログラムは",
        "  決まったフォルダを1つだけ見ていて、ファイルはそこに入る必要があります。"],
      guarda: [
        "探す順番：",
        "  1. ウェブ —— クラブの公式サイト、リーグのサイト、連盟；",
        "  2. 統計プロバイダ（Hudl InStat、Synergy など）へのアクセスを",
        "     渡してある場合は、そちらの数字を使ってください。そのほうが正確です。"],
      quali: [
        "どの試合か（ここを最初に読んでください）：",
        "  - 何試合：%P。",
        "  - 大会は1つだけ、通常は国内リーグです。",
        "    統計サイトの初期設定は「今季」で、リーグとカップと欧州大会が",
        "    混ざります。ここではその初期設定は誤りです。",
        "    フィルタを設定し、ページを移るたびに設定し直してください（戻ります）。",
        "  - \"fonte\" に、どの大会・どのシーズン・何試合分の数字かを書いてください。",
        "    チーム合計と選手の数字は、同じ試合群から取る必要があります。"],
      serve: "必要なもの：",
      regole: [
        "ルール：",
        "  - すべての値は1試合平均で、出典が示しているままの形で；",
        "  - 数字はそのまま写してください。四捨五入も再計算もしないこと；",
        "  - 見つからないものは空のままに。値を絶対に作らないこと；",
        "  - 一部だけのファイルでも構いません。写真しか見つからなければ、",
        "    写真だけのファイルを送ってください。すでにあるものに足されるだけで、",
        "    置き換えにはなりません。作り話より半分のファイルのほうがましです；",
        "  - 今のロスターを使ってください。今季加入した選手は、昨季の数字は",
        "    前のチームのものです。使ってもかまいませんが \"fonte\" に書いてください。",
        "    このレベルでの出場がない選手は、スタッツは入れず、",
        "    名前・背番号・写真だけ残してください；",
        "  - 最後に、どこから取ったか、何が見つからなかったかを教えてください。"],
      forma: "ファイルの形：",
      chiedi: {
        logo: "チームのロゴ（画像への直接リンク）を \"logo\" に",
        foto: "各選手の写真（画像への直接リンク）を \"foto\" に",
        player: "背番号、ポジション、身長、生年を \"numero\"、\"ruolo\"、\"altezza\"、\"nascita\" に",
        stat: "1試合平均のスタッツを \"stats\" に：pts、reb、ast、p2、p3、ft",
        avanzate: "アドバンススタッツを \"avanzate\" に（出場時間、試合数、1ポゼッションあたり得点、オフェンス/ディフェンスリバウンド、スティール、ターンオーバー、獲得ファウル、プラスマイナス）、チーム合計を \"squadraStat\" に、ベストラインナップを \"quintetti\" に",
        playtype: "play type を \"playTypes\" に、\"attacco\" と \"difesa\" の両方、それぞれ名称・チームのポゼッションに占める割合・ポゼッション数・得点・1ポゼッションあたり得点つきで。そのうえで、選手ごとに自分の \"playTypes\" 欄に1行、次の形式どおりに：「ATT <名称> <割合>% (<1ポゼッションあたり得点>) - ...」。項目は最大4つ —— オフェンスで最も多い2つと、ディフェンスで最も攻められている2つ。この行の割合は、その選手自身のポゼッションに占める割合であり、チーム全体ではありません。20ポゼッション使って5回が catch and shoot なら25%です。割合順ではなく、回数の多い順に並べてください"},
      dillo: {
        ultime5: "直近5試合だけ —— 10月ではなく、今どう戦っているかが知りたい",
        ultime10: "直近10試合だけ —— シーズン全体ではなく、最近の調子が知りたい",
        stagione: "今シーズン、これまでに戦ったすべての試合",
        scorsa: "昨シーズン、すでに終わったほう（今季はまだ始まっていない、または試合数が少なすぎて意味をなさない）"}
    },
    ko: {
      trova: "농구팀 \"%S\"에 대해 찾을 수 있는 모든 것을 찾아서,",
      unFile: "vdm-dati.json 이라는 이름의 파일 하나로 써 주세요.",
      dove: "어디에 저장할지:",
      doveCartella: [
        "  제 컴퓨터의 \"%C\" 라는 폴더 안에 vdm-dati.json 으로 저장해 주세요",
        "  (대개 바탕화면에 있습니다). 제 농구 프로그램이 그 폴더를 지켜보고",
        "  있다가 파일을 알아서 가져갑니다.",
        "  폴더를 찾지 못하면 전체 경로를 물어봐 주세요."],
      doveChiedi: [
        "  어디에 저장할지 물어봐 주세요. 제 농구 프로그램은 정해진 폴더",
        "  하나만 지켜보고 있고, 파일은 그 안에 들어가야 합니다."],
      guarda: [
        "찾는 순서:",
        "  1. 웹 — 구단 공식 사이트, 리그 사이트, 협회;",
        "  2. 제가 통계 제공업체(Hudl InStat, Synergy 등) 접근 권한을",
        "     드렸다면 거기서 숫자를 가져오세요. 그쪽이 더 정확합니다."],
      quali: [
        "어떤 경기인지 (이것부터 읽어 주세요):",
        "  - 몇 경기: %P.",
        "  - 대회는 하나만, 보통 자국 리그입니다.",
        "    통계 사이트는 기본값이 \"이번 시즌\"이라 리그와 컵, 유럽 대회가",
        "    섞입니다. 여기서는 그 기본값이 틀립니다.",
        "    필터를 설정하고, 페이지를 넘길 때마다 다시 설정하세요 — 초기화됩니다.",
        "  - \"fonte\" 에 어느 대회, 어느 시즌, 몇 경기 기준의 숫자인지 적어 주세요.",
        "    팀 합계와 선수 숫자는 같은 경기들에서 나와야 합니다."],
      serve: "필요한 것:",
      regole: [
        "규칙:",
        "  - 모든 값은 경기당 평균이며, 출처에 나온 그대로입니다;",
        "  - 숫자는 있는 그대로 옮기세요. 반올림하지 말고 다시 계산하지 마세요;",
        "  - 찾지 못한 것은 비워 두세요. 값을 절대 지어내지 마세요;",
        "  - 일부만 있는 파일도 괜찮습니다. 사진만 찾았다면 사진만 담은 파일을",
        "    보내 주세요. 이미 있는 내용에 더해질 뿐 대체하지 않습니다.",
        "    지어낸 것보다 반쪽짜리 파일이 낫습니다;",
        "  - 지금의 로스터를 쓰세요. 이번 시즌에 합류한 선수는 지난 시즌 숫자가",
        "    이전 팀의 것입니다. 써도 되지만 \"fonte\" 에 밝혀 주세요. 이 수준에서",
        "    뛴 적이 없다면 기록은 빼고 이름, 등번호, 사진만 남기세요;",
        "  - 마지막에 각각을 어디서 가져왔는지, 무엇을 못 찾았는지 알려 주세요."],
      forma: "파일의 모양:",
      chiedi: {
        logo: "팀 엠블럼(이미지 직접 링크)을 \"logo\" 에",
        foto: "선수별 사진(이미지 직접 링크)을 \"foto\" 에",
        player: "등번호, 포지션, 키, 출생 연도를 \"numero\", \"ruolo\", \"altezza\", \"nascita\" 에",
        stat: "경기당 기록을 \"stats\" 에: pts, reb, ast, p2, p3, ft",
        avanzate: "고급 기록을 \"avanzate\" 에(출전 시간, 경기 수, 포제션당 득점, 공격/수비 리바운드, 스틸, 턴오버, 얻어낸 파울, 플러스마이너스), 팀 합계를 \"squadraStat\" 에, 최고의 라인업을 \"quintetti\" 에",
        playtype: "play type 을 \"playTypes\" 에, \"attacco\" 와 \"difesa\" 둘 다, 각각 이름, 팀 포제션에서 차지하는 비중, 포제션 수, 득점, 포제션당 득점과 함께. 그다음 선수마다 자신의 \"playTypes\" 칸에 한 줄씩, 정확히 이 형식으로: \"ATT <이름> <비중>% (<포제션당 득점>) - ...\". 항목은 최대 네 개 — 공격에서 가장 많이 하는 두 가지와 수비에서 가장 많이 공략당하는 두 가지. 그 줄의 퍼센트는 팀이 아니라 그 선수 자신의 포제션에서 차지하는 비중입니다: 20번의 포제션 중 5번이 catch and shoot 이면 25% 입니다. 퍼센트가 아니라 빈도 순으로 정렬하세요"},
      dillo: {
        ultime5: "최근 5경기만 — 10월이 아니라 지금 어떻게 하고 있는지가 궁금합니다",
        ultime10: "최근 10경기만 — 시즌 전체가 아니라 최근 폼이 궁금합니다",
        stagione: "이번 시즌, 지금까지 치른 모든 경기",
        scorsa: "지난 시즌, 이미 끝난 쪽 (이번 시즌은 시작하지 않았거나 경기 수가 너무 적어 의미가 없습니다)"}
    }
  };

  function RP(chiave) {
    let l = 'en';
    try { if (typeof currentLang !== 'undefined' && currentLang) l = currentLang; } catch (e) {}
    const t = RICH[l] || RICH.en;
    const v = (t[chiave] !== undefined) ? t[chiave] : RICH.en[chiave];
    return (v === undefined) ? '' : v;
  }

  const COSE = [
    { id: 'logo',     etic: 'c_logo',
      chiedi: 'the team logo (a direct link to the image), in "logo"' },
    { id: 'foto',     etic: 'c_foto',
      chiedi: 'a photo of each player (a direct link to the image), in "foto"' },
    { id: 'player',   etic: 'c_player',
      chiedi: 'jersey number, position, height and year of birth, in "numero", "ruolo", "altezza", "nascita"' },
    { id: 'stat',     etic: 'c_stat',
      chiedi: 'per-game statistics in "stats": pts, reb, ast, p2, p3, ft' },
    { id: 'avanzate', etic: 'c_avanzate',
      chiedi: 'advanced statistics in "avanzate" (minutes, games, points per possession, offensive/defensive rebounds, steals, turnovers, fouls drawn, plus/minus), the team totals in "squadraStat", and the best lineups in "quintetti"' },
    /* I play type sono la cosa che si sbaglia piu' facilmente, perche' la
       stessa percentuale vuol dire due cose diverse: nella tabella di
       squadra e' la fetta dei possessi della SQUADRA, nella riga di una
       giocatrice deve essere la fetta dei possessi SUOI ("di quello che fa
       lei, il 26% e' catch and shoot"). Detta cosi' si prepara la partita;
       detta nell'altro modo esce una riga che non vuol dire niente. */
    { id: 'playtype', entrambi: true, etic: 'c_playtype',
      chiedi: 'play types in "playTypes", both "attacco" and "difesa", each with name, ' +
        'share of the team possessions, possessions, points and points per possession. ' +
        'THEN, for each player, one line of her own in her "playTypes" field, written ' +
        'exactly like this: "ATT <name> <share>% (<points per possession>) - ..." with at ' +
        'most FOUR items — the two things she does most in attack and the two she is ' +
        'attacked on most in defence. In that player line the percentage is the share of ' +
        'HER OWN possessions, not of the team\'s: if she used 20 possessions and 5 were ' +
        'catch and shoot, that is 25%. Sort by how often she does it, not by percentage' },
  ];

  /* SU QUANTE PARTITE. Sono le stesse voci che i siti di statistiche hanno
     nel loro menu (ultime 3, ultime 5, ultime 10, stagione): dicendolo nella
     richiesta, l'IA sa cosa mettere nel filtro invece di prendere quello che
     trova. "Stagione in corso" e' la voce di partenza.
     Le ultime N partite servono per la squadra che si incontra domenica:
     dicono come sta adesso, non com'era a ottobre. */
  const PERIODI = [
    { id: 'ultime5', etic: 'p_u5',
      dillo: 'the LAST 5 games only — I want to know how they are playing now, not in October' },
    { id: 'ultime10', etic: 'p_u10',
      dillo: 'the LAST 10 games only — I want their recent form, not the whole season' },
    /* QUELLA DI PARTENZA e' la stagione in corso: e' quella che serve
       quasi sempre, e chi apre il pannello non deve scegliere niente.
       "Stagione scorsa" resta a un clic di distanza per l'inizio di
       campionato, quando la stagione in corso ha due partite giocate e i
       numeri non vogliono dire niente. */
    { id: 'stagione', etic: 'p_stag', partenza: true,
      dillo: 'the CURRENT season, all the games played so far' },
    { id: 'scorsa', etic: 'p_scorsa',
      dillo: 'LAST season, the one already finished (the current one has not started, or has too few games to mean anything)' },
  ];
  const PERIODO_PARTENZA = (PERIODI.filter(function (x) { return x.partenza; })[0] || PERIODI[0]).id;
  function periodoDetto(id) {
    const p = PERIODI.filter(function (x) { return x.id === id; })[0] ||
              PERIODI.filter(function (x) { return x.id === PERIODO_PARTENZA; })[0];
    /* la frase nella lingua del programma; se quella lingua non ce l'ha,
       resta quella inglese scritta qui sopra */
    return (RP('dillo') || {})[p.id] || p.dillo;
  }

  /* LA RICHIESTA DA CONSEGNARE ALL'IA.
     Si scrive da sola con dentro solo le caselle spuntate, e col nome della
     squadra gia' scritto: si copia e si incolla in Claude, o in qualunque
     altra, senza cambiare una parola. E' in inglese perche' le pagine da cui
     deve leggere lo sono, e perche' cosi' va bene a tutte. */
  function richiestaPerIA(squadra, scelte, cartella) {
    const volute = COSE.filter(function (c) { return scelte[c.id]; });
    const chiedi = RP('chiedi') || {};
    const r = [];
    function riga(t) { r.push(t); }
    function righe(a) { (a || []).forEach(function (t) { r.push(t); }); }

    riga(RP('trova').replace('%S', squadra || '...'));
    riga(RP('unFile'));
    riga('');
    /* DOVE METTERLO. Senza questo l'IA prepara il file e lo lascia dove
       capita, e il programma non lo trova mai. Se la cartella e' collegata
       si scrive il suo nome; se non lo e', si dice all'IA di chiederlo. */
    riga(RP('dove'));
    if (cartella) {
      righe(RP('doveCartella').map(function (t) { return t.replace('%C', cartella); }));
    } else {
      righe(RP('doveChiedi'));
    }
    riga('');
    righe(RP('guarda'));
    riga('');
    /* QUALI PARTITE. E' la riga che vale piu' di tutte le altre messe
       insieme. I siti di statistiche partono da "stagione in corso", che
       mette dentro campionato E coppe: la stessa squadra esce su 27 partite
       o su 47 a seconda di dove si guarda, e due squadre prese cosi' non si
       possono confrontare. Senza questa riga l'IA non ha motivo di
       accorgersene. */
    righe(RP('quali').map(function (t) {
      return t.replace('%P', periodoDetto(scelte && scelte._periodo));
    }));
    riga('');
    riga(RP('serve'));
    volute.forEach(function (c) { r.push('  - ' + (chiedi[c.id] || c.chiedi) + ';'); });
    riga('');
    righe(RP('regole'));
    riga('');
    riga(RP('forma'));
    riga('');
    riga(FORMA_JSON);
    return r.join('\n');
  }

  const FORMA_JSON = [
    '{',
    '  "vdm": 1,',
    '  "squadra": "Famila Wuber Schio",',
    '  "logo": "https://.../stemma.png",',
    '  "fonte": "sito ufficiale + lega",',
    '  "data": "2026-09-28",',
    '  "giocatrici": [',
    '    {',
    '      "numero": 24,',
    '      "nome": "Cecilia Zandalasini",',
    '      "ruolo": "Ala",',
    '      "altezza": "186 cm",',
    '      "nascita": "16/03/1996",',
    '      "foto": "https://.../zandalasini.jpg",',
    '      "stats": { "pts": "14.2", "reb": "5.1", "ast": "2.3",',
    '                 "p2": "52.4%", "p3": "36.1%", "ft": "84%" },',
    '      "avanzate": { "minuti": "28:40", "partite": 22, "puntiPerPossesso": "1.04",',
    '                    "rimbalziOff": "1.2", "rimbalziDif": "3.9", "recuperi": "1.1",',
    '                    "pallePerse": "1.8", "falliSubiti": "3.4", "plusMinus": "9.6" },',
    '      "playTypes": "ATT Catch and shoots 28% (1.12) - ATT Transitions 17% (1.24) - DIF Cuts 21% (0.74)"',
    '    }',
    '  ],',
    '  "squadraStat": { "punti": "78.4", "tiroPct": "46.2%", "tiroSu": "28.1/60.8",',
    '                   "duePct": "52.0%", "dueSu": "19.4/37.3", "trePct": "34.9%",',
    '                   "treSu": "8.7/24.9", "liberiPct": "76.1%", "liberiSu": "12.9/17.0",',
    '                   "assist": "17.2", "rimbalzi": "36.5", "rimbalziOff": "9.8",',
    '                   "rimbalziDif": "26.7", "pallePerse": "13.4", "recuperi": "8.1",',
    '                   "stoppate": "3.2" },',
    '  "quintetti": [',
    '    { "quintetto": "8 Verona, 5 Mestdagh, 24 Zandalasini, 31 Keys, 22 Andre",',
    '      "plusMinus": "+8.4", "minuti": "06:12", "possessi": "14.1",',
    '      "punti": "15.3", "tiroPct": "51.2%" }',
    '  ],',
    '  "playTypes": {',
    '    "attacco": [ { "nome": "Catch and shoots", "quota": "17.6%", "possessi": "13.8",',
    '                   "punti": "13.7", "ppp": "0.99",',
    '                   "giocatrici": [ { "nome": "C. Zandalasini", "quota": "28%",',
    '                                     "possessi": "3.9", "punti": "4.4", "ppp": "1.12" } ] } ],',
    '    "difesa":  [ { "nome": "Pick and roll ballhandler", "quota": "22%", "possessi": "17.2",',
    '                   "punti": "10.3", "ppp": "0.60" } ]',
    '  }',
    '}',
  ].join('\n');

  function mostraIstruzioni(squadra, scelte, cartella) {
    const ISTRUZIONI_IA = richiestaPerIA(squadra, scelte, cartella);
    const ov = D.createElement('div');
    ov.className = 'modal-overlay show';
    ov.style.zIndex = '420';
    ov.innerHTML =
      '<div class="modal-box" style="max-width:720px;width:94vw;max-height:88vh;display:flex;flex-direction:column;">' +
        '<h3 style="margin:0 0 4px;">La richiesta per la tua IA</h3>' +
        '<div class="muted" style="font-size:12px;margin-bottom:10px;">' +
          (cartella
            ? esc(P('k_copia1')) + '<b>' + esc(cartella) + '</b>' + esc(P('k_copia2'))
            : P('k_primacart')) + '</div>' +
        '<textarea readonly style="flex:1;min-height:0;width:100%;box-sizing:border-box;' +
          'font-family:ui-monospace,Menlo,monospace;font-size:11px;line-height:1.45;">' +
          esc(ISTRUZIONI_IA) + '</textarea>' +
        '<div class="row" style="gap:8px;justify-content:flex-end;margin-top:12px;">' +
          '<button class="btn primary" data-copia>Copia</button>' +
          '<button class="btn" data-chiudi>Chiudi</button>' +
        '</div>' +
      '</div>';
    D.body.appendChild(ov);
    ov.querySelector('[data-copia]').onclick = function () {
      const t = ov.querySelector('textarea');
      t.select();
      try {
        if (globale.navigator && navigator.clipboard) navigator.clipboard.writeText(ISTRUZIONI_IA);
        else D.execCommand('copy');
        globale.toast && globale.toast('Copiato.');
      } catch (e) { D.execCommand('copy'); }
    };
    const via = function () { ov.remove(); };
    ov.querySelector('[data-chiudi]').onclick = via;
    ov.onclick = function (e) { if (e.target === ov) via(); };
  }

  /* ------------------------------------------------ LA CONFERMA */
  function riassunto(esito, quintetti, giaScritte) {
    const r = [];
    r.push('<div class="muted" style="margin-bottom:8px;">Trovate <b>' + esito.abbinate.length +
      '</b> giocatrici su <b>' + (esito.abbinate.length + esito.nonAbbinate.length) + '</b> nel file.</div>');
    if (esito.abbinate.length) {
      r.push('<div style="font-weight:700;margin:10px 0 4px;">Vanno nelle schede</div><div style="font-size:12px;line-height:1.7;">' +
        esito.abbinate.map(function (a) {
          return '<div>' + esc(a.riga.numero || '—') + ' ' + esc(a.riga.nome) +
            ' <span class="muted">&rarr; ' + esc(a.giocatrice.name || '(senza nome)') + '</span></div>';
        }).join('') + '</div>');
    }
    if (esito.nonAbbinate.length) {
      r.push('<div style="font-weight:700;margin:10px 0 4px;">Nel file ma non nel roster — restano fuori</div>' +
        '<div style="font-size:12px;line-height:1.7;">' + esito.nonAbbinate.map(function (x) {
          return '<div>' + esc(x.numero || '—') + ' ' + esc(x.nome) + '</div>';
        }).join('') + '</div>');
    }
    if (esito.senzaDati && esito.senzaDati.length) {
      r.push('<div style="font-weight:700;margin:10px 0 4px;">Nel roster ma non nel file — non si toccano</div>' +
        '<div class="muted" style="font-size:12px;line-height:1.7;">' + esito.senzaDati.map(function (p) {
          return '<div>' + esc(p.number || '—') + ' ' + esc(p.name || '') + '</div>';
        }).join('') + '</div>');
    }
    if (quintetti) {
      r.push('<div style="margin-top:10px;">Quintetti: <b>' + quintetti.righe.length + '</b> dal file ' +
        esc(quintetti.nome) + '.</div>');
    }
    if (giaScritte) {
      r.push('<div style="margin-top:12px;padding:8px 10px;border-radius:6px;background:#fff4e2;color:#7a4b00;font-size:12.5px;">' +
        '<b>' + giaScritte + '</b> di queste schede hanno gia\' dei numeri scritti a mano: vengono sostituiti.</div>');
    }
    return r.join('');
  }

  /* ------------------------------------------------ SCRIVERE */
  function scrivi(esito) {
    esito.abbinate.forEach(function (a) {
      const p = a.giocatrice, r = a.riga;
      p.stats = Object.assign({}, p.stats || {}, I.statisticheNostre(r));
      p.statAvanzate = {
        minuti: r.minuti, partite: r.partite, puntiPerPossesso: r.puntiPerPossesso,
        rimbalziOff: r.rimbalziOff, rimbalziDif: r.rimbalziDif, recuperi: r.recuperi,
        pallePerse: r.pallePerse, falliSubiti: r.falliSubiti, plusMinus: r.plusMinus,
        falli: r.falli, punti: r.punti,
      };
    });
  }

  /* Scrive nel lavoro quello che l'IA ha preparato. Abbina come sempre:
     prima il numero di maglia, poi il cognome. Chi non c'e' nel roster non
     viene inventato, chi c'e' e non e' nel file non viene toccato. */
  /* I RUOLI A PAROLE DIVENTANO I CODICI DEL PROGRAMMA.
     Dentro a VDM il ruolo e' una cifra da 1 a 5 (1 play, 5 pivot). L'IA
     pero' trova scritto "Ala-Pivot", "Guardia", "Point guard": qui si
     traduce, cosi' chi prepara il file scrive come si dice e non deve
     sapere i codici. */
  const RUOLI = [
    [/play\s*\/?\s*guardia|combo/i, '12'], [/ala\s*[-\/]\s*pivot|power\s*forward/i, '4'],
    [/playmaker|^play$|point\s*guard|^pg$/i, '1'], [/guardia|shooting\s*guard|^sg$/i, '2'],
    [/pivot|center|^c$/i, '5'], [/ala|forward|^sf$/i, '3'],
  ];
  function ruoloInCodice(v) {
    const t = String(v == null ? '' : v).trim();
    if (!t) return '';
    if (/^[1-5]{1,2}$/.test(t)) return t;
    for (const [re, codice] of RUOLI) if (re.test(t)) return codice;
    return '';
  }

  /* L'ALTEZZA E L'ANNO come li vuole il programma: 190 e 1997, non
     "190 cm" e "07/10/1997". */
  function soloNumero(v) {
    const m = String(v == null ? '' : v).match(/\d+/);
    return m ? m[0] : '';
  }
  function anno(v) {
    const t = String(v == null ? '' : v);
    const m = t.match(/(19|20)\d{2}/);
    return m ? m[0] : '';
  }

  /* UNA SCHEDA NUOVA, fatta come le fa il programma. Serve quando si parte
     da una squadra vuota: senza questo l'IA porta i dati e non c'e' dove
     metterli. Le posizioni P1..P12 le assegna il programma da solo
     (normalizePersonnelSlots) appena ridisegna il Personnel. */
  function schedaNuova(x) {
    const p = {
      number: x.numero == null ? '' : String(x.numero),
      name: x.nome || '', role: ruoloInCodice(x.ruolo),
      height: soloNumero(x.altezza), birthYear: anno(x.nascita || x.anno),
      stats: {}, traits: ['', '', '', ''],
    };
    if (globale.ensureRosterPlayerShape) globale.ensureRosterPlayerShape(p);
    if (globale.nextId) { try { p.id = globale.nextId('pl'); } catch (e) {} }
    return p;
  }

  async function applicaIA(elenco, ia, creaMancanti) {
    const finte = ia.giocatrici.map(function (x) { return { numero: x.numero, nome: x.nome, _ia: x }; });
    let e = I.abbina(finte, elenco);
    /* Squadra vuota, o giocatrici che nel roster non ci sono ancora: si
       creano. E' il caso di chi parte da una lega nuova — preme il tasto e
       la squadra si compila da sola. */
    let nuove = 0;
    if (creaMancanti && e.nonAbbinate.length) {
      /* PRIMA SI RIEMPIONO LE RIGHE VUOTE CHE CI SONO GIA'.
         Creando una squadra, VDM mette in fila un tot di righe giocatrice
         vuote da compilare. Se qui aggiungessi in fondo senza guardarle, le
         giocatrici finirebbero DOPO quelle righe — ed e' esattamente il
         difetto visto la prima volta: il roster partiva dalla tredicesima.
         Quindi: prima si occupano i posti liberi, e solo quando finiscono
         si aggiunge in coda. */
      const libera = function (x) {
        return x && !String(x.name || '').trim() && !String(x.number == null ? '' : x.number).trim();
      };
      e.nonAbbinate.forEach(function (r) {
        const p = schedaNuova(r._ia);
        const posto = elenco.findIndex(libera);
        if (posto >= 0) {
          /* si scrive DENTRO la riga che c'e' gia', cosi' non si perdono i
             campi che il programma le aveva messo (id, traits, reportSlot) */
          Object.assign(elenco[posto], p, { id: elenco[posto].id || p.id });
          e.abbinate.push({ riga: r, giocatrice: elenco[posto] });
        } else {
          elenco.push(p);
          e.abbinate.push({ riga: r, giocatrice: p });
        }
        nuove++;
      });
      e.nonAbbinate = [];
    }
    let foto = 0;
    for (const a of e.abbinate) {
      const x = a.riga._ia, g = a.giocatrice;
      if (x.stats) g.stats = Object.assign({}, g.stats || {}, x.stats);
      if (x.avanzate || x.playTypes) {
        g.statAvanzate = Object.assign({}, g.statAvanzate || {}, x.avanzate || {},
          x.playTypes ? { playTypes: x.playTypes } : {});
      }
      if (x.foto) { g.photo = await portaDentroLaFoto(x.foto); foto++; }
    }
    /* Anche su una scheda che gia' c'era: se il roster e' senza ruolo o
       altezza e l'IA li porta, si riempiono. Quello scritto a mano non si
       tocca mai. */
    e.abbinate.forEach(function (a) {
      const x = a.riga._ia, g = a.giocatrice;
      if (!g.role && x.ruolo) g.role = ruoloInCodice(x.ruolo);
      if (!g.height && x.altezza) g.height = soloNumero(x.altezza);
      if (!g.birthYear && (x.nascita || x.anno)) g.birthYear = anno(x.nascita || x.anno);
      if (!String(g.number || '').trim() && x.numero != null) g.number = String(x.numero);
    });
    return { abbinate: e.abbinate.length, nonAbbinate: e.nonAbbinate.length, foto: foto, nuove: nuove, esito: e };
  }

  function contaGiaScritte(esito) {
    return esito.abbinate.filter(function (a) {
      const s = a.giocatrice.stats || {};
      return ['pts', 'reb', 'ast', 'p2', 'p3', 'ft'].some(function (k) {
        return s[k] != null && String(s[k]).trim() !== '';
      });
    }).length;
  }

  /* ------------------------------------------------ IL PANNELLO "USO IA"

     Un pannello solo con le tre strade, perche' il fornitore di dati le da'
     cosi': i fogli di calcolo si scaricano, i play types no (quella pagina
     non ha l'esportazione: si copia e si incolla), e se hai un'IA che lavora
     per te ti prepara tutto in un file solo.
     Finche' non si preme il pulsante in fondo non viene scritto niente. */
  function pannelloIA(titolo, opzioni) {
    const o = opzioni || {};
    return new Promise(function (ok) {
      const ov = D.createElement('div');
      ov.className = 'modal-overlay show';
      ov.style.zIndex = '400';
      ov.innerHTML =
        '<div class="modal-box" style="max-width:680px;width:94vw;max-height:88vh;display:flex;flex-direction:column;">' +
          '<h3 style="margin:0 0 4px;">' + esc(titolo) + '</h3>' +
          /* LA PRIMA COSA CHE SI LEGGE. Chi apre questa finestra si aspetta
             un tasto che scarica: non c'e', e se non lo si dice subito
             aspetta che succeda qualcosa. VDM non va su internet e non
             cerca niente — scrive l'ordine da dare alla SUA IA, ed e' lei
             che cerca e scarica. Detto in due righe, in cima. */
          '<div style="font-size:12.5px;margin-bottom:14px;line-height:1.55;">' +
            P('intro1') + '<br>' + P('intro2') + '<br>' + P('intro3') + '</div>' +
          '<div style="overflow:auto;flex:1;min-height:0;">' +
            '<div data-cartella style="border:1px solid var(--bordo,#33465f);border-radius:8px;' +
              'padding:9px 11px;margin-bottom:16px;font-size:12.5px;"></div>' +
            '<div style="font-weight:700;margin-bottom:2px;">' + esc(P('t1')) + '</div>' +
            '<div class="muted" style="font-size:12px;margin-bottom:6px;">' +
              esc(P('t1s')) + '</div>' +
            '<div style="display:grid;gap:4px;margin-bottom:10px;">' +
              COSE.map(function (c) {
                return '<label class="row" style="gap:7px;align-items:flex-start;font-size:12.5px;">' +
                  '<input type="checkbox" data-cosa="' + c.id + '" checked> ' + esc(P(c.etic)) + '</label>';
              }).join('') +
            '</div>' +
            /* SU QUANTE PARTITE. Sta qui sotto alle spunte e prima del tasto
               di copia perche' e' l'ultima cosa da decidere prima di
               consegnare la richiesta: le stesse voci che il coach trova nel
               menu del sito di statistiche. */
            '<div class="row" style="gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;font-size:12.5px;">' +
              '<span style="font-weight:700;">' + esc(P('part')) + '</span>' +
              PERIODI.map(function (p) {
                return '<label class="row" style="gap:5px;align-items:center;">' +
                  '<input type="radio" name="impPeriodo" data-periodo="' + p.id + '"' +
                  (p.partenza ? ' checked' : '') + '> ' + esc(P(p.etic)) + '</label>';
              }).join('') +
            '</div>' +
            '<div class="row" style="gap:10px;align-items:center;margin-bottom:18px;">' +
              '<button class="btn primary small" data-istruzioni>' + esc(P('bcopia')) + '</button>' +
              '<span class="muted" style="font-size:12px;">' + esc(P('bcopias')) + '</span>' +
            '</div>' +
            '<div style="font-weight:700;margin-bottom:2px;">' + esc(P('t2')) + '</div>' +
            '<div class="muted" style="font-size:12px;margin-bottom:6px;">' +
              esc(P('t2s')) + '</div>' +
            '<div class="row" style="gap:10px;align-items:center;margin-bottom:6px;">' +
              '<button class="btn small" data-file>' + esc(P('bfile')) + '</button>' +
              '<span class="muted" data-esitofile style="font-size:12px;">' + esc(P('nulla')) + '</span>' +
            '</div>' +
            (o.playTypes === false ? '' :
            '<details style="margin-bottom:12px;">' +
              '<summary class="muted" style="cursor:pointer;font-size:12px;">' + esc(P('dett')) + '</summary>' +
              '<div class="muted" style="font-size:12px;margin:6px 0;">' + esc(P('detts')) + '</div>' +
              '<textarea data-incolla rows="4" placeholder="…" ' +
                'style="width:100%;box-sizing:border-box;font-family:ui-monospace,Menlo,monospace;font-size:11.5px;"></textarea>' +
              '<div class="muted" data-esitopt style="font-size:12px;margin:4px 0 0;">' + esc(P('nincol')) + '</div>' +
            '</details>') +
            '<label class="row" style="gap:7px;align-items:center;margin:2px 0 12px;font-size:12.5px;">' +
              '<input type="checkbox" data-crea checked> ' + esc(P('crea')) +
            '</label>' +
            '<div data-anteprima></div>' +
          '</div>' +
          '<div class="row" style="gap:8px;justify-content:flex-end;margin-top:14px;">' +
            '<button class="btn" data-no>' + esc(P('ann')) + '</button>' +
            '<button class="btn primary" data-si disabled>' + esc(P('scrivi')) + '</button>' +
          '</div>' +
        '</div>';
      D.body.appendChild(ov);

      const esitoFile = ov.querySelector('[data-esitofile]');
      const esitoPt = ov.querySelector('[data-esitopt]');
      const anteprima = ov.querySelector('[data-anteprima]');
      const conferma = ov.querySelector('[data-si]');
      const stato = { dati: null, playTypes: null, creaMancanti: true };
      const crea = ov.querySelector('[data-crea]');
      if (crea) crea.onchange = function () { stato.creaMancanti = crea.checked; ricalcola(); };

      function ricalcola() {
        const c = (stato.dati && (stato.dati.giocatrici || stato.dati.quintetti || stato.dati.ia)) ||
          (stato.playTypes && (stato.playTypes.attacco.length || stato.playTypes.difesa.length));
        conferma.disabled = !c;
        if (o.anteprima) anteprima.innerHTML = o.anteprima(stato) || '';
      }

      ov.querySelector('[data-file]').onclick = async function () {
        const files = await chiediFile();
        if (!files.length) return;
        esitoFile.textContent = 'lettura…';
        stato.dati = await leggiTutti(files);
        const parti = [];
        if (stato.dati.ia) {
          const j = stato.dati.ia;
          const dentro = [j.giocatrici.length + ' ' + P('s_giocatrici')];
          const conFoto = j.giocatrici.filter(function (x) { return x.foto; }).length;
          if (conFoto) dentro.push(conFoto + ' ' + P('s_foto'));
          if (j.squadraStat) dentro.push(P('s_statsq'));
          if (j.quintetti) dentro.push(j.quintetti.length + ' ' + P('s_quintetti'));
          if (j.playTypes) dentro.push(P('i_pt'));
          parti.push(dentro.join(', '));
        }
        if (stato.dati.giocatrici) parti.push(stato.dati.giocatrici.righe.length + ' ' + P('s_giocatrici'));
        if (stato.dati.quintetti) parti.push(stato.dati.quintetti.righe.length + ' ' + P('s_quintetti'));
        if (stato.dati.nonCapiti.length) parti.push(P('s_nonletti') + stato.dati.nonCapiti.join(', '));
        esitoFile.textContent = parti.length ? parti.join(' · ') : P('s_nulla');
        ricalcola();
      };

      const ta = ov.querySelector('[data-incolla]');
      if (ta) {
        const leggi = function () {
          const r = leggiPlayTypes(ta.value);
          stato.playTypes = (r.attacco.length || r.difesa.length) ? r : null;
          esitoPt.textContent = stato.playTypes
            ? (r.attacco.length + P('a_att') + r.difesa.length + P('a_dif'))
            : (ta.value.trim() ? P('s_nopt') : P('nincol'));
          ricalcola();
        };
        ta.addEventListener('input', leggi);
        ta.addEventListener('paste', function () { setTimeout(leggi, 0); });
      }

      /* DATI IA: il riquadro in cima al pannello. Se la cartella e' collegata
         dice che non c'e' piu' niente da premere; se non lo e', si collega. */
      function disegnaCartella() {
        const box = ov.querySelector('[data-cartella]');
        if (!box) return;
        const st = statoCartella();
        if (st.collegata && st.daRiconfermare) {
          box.innerHTML = '<div style="font-weight:700;margin-bottom:2px;">' + esc(P('d_riatt')) + '</div>' +
            '<div class="muted">' + esc(P('d_riatt1')) + '<b>' + esc(st.nome) + '</b>' + esc(P('d_riatt2')) + '</div>' +
            '<div style="margin-top:7px;"><button class="btn small primary" data-riconferma>' + esc(P('d_riattb')) + '</button> ' +
            '<a href="#" data-scollega class="muted" style="margin-left:8px;">' + esc(P('d_cambia')) + '</a></div>';
        } else if (st.collegata) {
          box.innerHTML = '<div style="font-weight:700;margin-bottom:2px;">' + esc(P('d_attivo')) + '</div>' +
            '<div class="muted">' + esc(P('d_guardo1')) + '<b>' + esc(st.nome) + '</b>' + esc(P('d_guardo2')) + '</div>' +
            '<div style="margin-top:6px;"><a href="#" data-scollega class="muted">' + esc(P('d_smetti')) + '</a></div>';
        } else {
          box.innerHTML = '<div style="font-weight:700;margin-bottom:2px;">' + esc(P('d_titolo')) + '</div>' +
            '<div class="muted">' + esc(P('d_indica')) + '</div>' +
            '<div style="margin-top:7px;"><button class="btn small" data-collega>' + esc(P('d_collega')) + '</button></div>';
        }
        const b1 = box.querySelector('[data-collega]');
        if (b1) b1.onclick = async function () { if (await collegaCartella()) disegnaCartella(); };
        const b2 = box.querySelector('[data-scollega]');
        if (b2) b2.onclick = async function (ev) { ev.preventDefault(); await scollega(); disegnaCartella(); };
        const b3 = box.querySelector('[data-riconferma]');
        if (b3) b3.onclick = async function () {
          if (await riconferma()) { globale.toast && globale.toast(P('d_riattivato')); }
          disegnaCartella();
        };
      }
      disegnaCartella();

      function scelte() {
        const o = {};
        ov.querySelectorAll('[data-cosa]').forEach(function (c) { o[c.getAttribute('data-cosa')] = c.checked; });
        /* Il periodo NON e' una delle cose da cercare: comincia con
           l'underscore proprio per non finire nel filtro di COSE. */
        const scelto = ov.querySelector('[data-periodo]:checked');
        o._periodo = scelto ? scelto.getAttribute('data-periodo') : PERIODO_PARTENZA;
        return o;
      }
      const istr = ov.querySelector('[data-istruzioni]');
      if (istr) istr.onclick = function (ev) {
        ev.preventDefault();
        mostraIstruzioni(o.squadra || '', scelte(), statoCartella().nome);
      };

      const chiudi = function (v) { ov.remove(); ok(v); };
      ov.querySelector('[data-no]').onclick = function () { chiudi(null); };
      conferma.onclick = function () { chiudi(stato); };
      ov.onclick = function (e) { if (e.target === ov) chiudi(null); };
    });
  }

  /* Quello che le due strade hanno in comune: prendere quello che c'e' nel
     pannello e scriverlo in un elenco di giocatrici e in un contenitore di
     statistiche di squadra (la squadra nel Personnel, l'avversaria nello
     Scouting). */
  async function applicaTutto(stato, elenco, contenitore) {
    const fatto = { giocatrici: 0, foto: 0, playType: 0, squadra: false, quintetti: 0 };
    const d = stato.dati || {};

    if (d.giocatrici) {
      const e = I.abbina(d.giocatrici.righe, elenco);
      scrivi(e);
      fatto.giocatrici = e.abbinate.length;
    }
    if (d.ia) {
      const r = await applicaIA(elenco, d.ia, stato.creaMancanti !== false);
      fatto.giocatrici = Math.max(fatto.giocatrici, r.abbinate);
      fatto.foto = r.foto;
      fatto.nuove = r.nuove;
    }
    /* I play types individuali si attaccano per COGNOME: nella tabella di
       Hudl non c'e' il numero di maglia, c'e' solo il nome. */
    if (stato.playTypes) {
      const per = playTypesPerGiocatrice(stato.playTypes);
      elenco.forEach(function (g) {
        const v = per[I.cognome(g.name)];
        if (!v || !v.testo) return;
        g.statAvanzate = Object.assign({}, g.statAvanzate, { playTypes: v.testo });
        fatto.playType++;
      });
    }

    /* Lo stemma: il programma lo vuole in contenitore.logo, e se non c'e'
       ripiega da solo sulla bandiera disegnata dal nome. Non si sovrascrive
       uno stemma gia' messo a mano. */
    if (d.ia && d.ia.logo && !contenitore.logo) {
      contenitore.logo = await portaDentroLaFoto(d.ia.logo);
      fatto.logo = true;
    }
    const prima = contenitore.statAvanzate || {};
    const base = d.giocatrici ? statisticheSquadra(d.giocatrici.righe) : {};
    const dallIA = (d.ia && d.ia.squadraStat) || {};
    const quint = (d.quintetti && d.quintetti.righe) || (d.ia && d.ia.quintetti) || prima.quintetti;
    const pt = stato.playTypes || (d.ia && d.ia.playTypes) || prima.playTypes;
    contenitore.statAvanzate = Object.assign({}, prima, base, dallIA, {
      fonte: (d.ia && d.ia.fonte) || P('i_fonte'),
      data: new Date().toLocaleDateString(),
      quintetti: quint,
      playTypes: pt,
    });
    fatto.squadra = !!(Object.keys(base).length || Object.keys(dallIA).length);
    fatto.quintetti = (quint || []).length;
    if (contenitore.paginaStatAvanzate == null) contenitore.paginaStatAvanzate = true;
    return fatto;
  }

  /* Se quello che e' arrivato non ha le avanzate, VA DETTO. Prima non
     succedeva niente e sembrava un guasto: in realta' il file non le
     conteneva, perche' quei numeri stanno solo dal fornitore di statistiche
     e non sui siti aperti. */
  /* Le stesse giocatrici si vedono in DUE posti: le schede in alto dentro
     "Squadre Avversarie" e il Personnel piu' sotto. Sono lo stesso elenco
     (upgradeLeagueTeamRecord torna lo stesso oggetto, non una copia), ma
     ridisegnavo solo il Personnel — e quelle di sopra restavano vuote
     finche' non ci cliccavi. Adesso si ridisegna tutto. */
  function ridisegnaTutto(squadra) {
    const g = globale;
    try { if (g.renderAvversarieSection) g.renderAvversarieSection(); } catch (e) {}
    try {
      const aperta = g.personnelTeam && g.personnelTeam();
      const bersaglio = squadra || aperta;
      if (bersaglio) {
        if (g.renderPersonnelDossiers) g.renderPersonnelDossiers(bersaglio);
        if (g.renderPersonnelLivePreview) g.renderPersonnelLivePreview(bersaglio);
      }
    } catch (e) {}
    try {
      const mia = g.activeTeam && g.activeTeam();
      if (mia && g.renderScoutingLivePreview) g.renderScoutingLivePreview(mia);
    } catch (e) {}
  }

  function dillo(fatto, mancano) {
    if (mancano && mancano.length) {
      globale.toast && globale.toast(P('i_manca1') + mancano.join(', ') + P('i_manca2'));
      return;
    }
    const d = [];
    if (fatto.logo) d.push(P('i_stemma'));
    if (fatto.nuove) d.push(fatto.nuove + ' ' + P('i_nuove'));
    if (fatto.giocatrici) d.push(fatto.giocatrici + ' ' + P('s_giocatrici'));
    if (fatto.foto) d.push(fatto.foto + ' ' + P('s_foto'));
    if (fatto.playType) d.push(P('i_ptsu') + fatto.playType);
    if (fatto.quintetti) d.push(fatto.quintetti + ' ' + P('s_quintetti'));
    globale.toast && globale.toast(d.length ? P('i_importate') + d.join(', ') + '.' : P('i_statimp'));
  }

  /* Cosa e' stato chiesto e non c'era. Si guarda il RISULTATO, non le
     caselle: se dopo l'importazione la pagina avanzata resta senza numeri,
     vuol dire che nel file non c'erano. */
  function cosaManca(stato, contenitore) {
    const d = (stato && stato.dati) || {};
    if (!d.ia) return null;   // dai fogli xlsx le avanzate ci sono sempre
    const m = [];
    const a = contenitore && contenitore.statAvanzate;
    if (!a || !qualcheNumero(a)) m.push(P('i_avsq'));
    const pt = (a && a.playTypes) || {};
    if (!(pt.attacco || []).length && !(pt.difesa || []).length) m.push(P('i_pt'));
    if (!(a && (a.quintetti || []).length)) m.push('quintetti');
    return m.length ? m : null;
  }

  function anteprimaDi(elenco) {
    return function (st) {
      const parti = [];
      if (st.dati && st.dati.giocatrici) {
        const e = I.abbina(st.dati.giocatrici.righe, elenco);
        parti.push(riassunto(e, st.dati.quintetti, contaGiaScritte(e)));
      }
      if (st.dati && st.dati.ia) {
        const finte = st.dati.ia.giocatrici.map(function (x) { return { numero: x.numero, nome: x.nome }; });
        const e = I.abbina(finte, elenco);
        parti.push(riassunto(e, null, contaGiaScritte(e)));
      }
      if (st.playTypes) {
        parti.push('<div style="font-weight:700;margin:10px 0 4px;">Play types</div>' +
          '<div style="font-size:12px;line-height:1.7;">' +
          st.playTypes.attacco.slice(0, 4).map(function (x) {
            return '<div>' + esc(x.nome) + ' <span class="muted">' + esc(x.quota) +
              ' · ' + esc(x.ppp) + P('a_ppp') +
              (x.giocatrici && x.giocatrici.length ? ' · ' + x.giocatrici.length + ' ' + P('s_giocatrici') : '') +
              '</span></div>';
          }).join('') +
          (st.playTypes.attacco.length > 4 ? '<div class="muted">' + P('a_altri') + (st.playTypes.attacco.length - 4) + '</div>' : '') +
          '</div>');
      }
      return parti.join('');
    };
  }

  /* ------------------------------------------------ IL PULSANTE DEL PERSONNEL */
  globale.importaStatistichePersonnel = async function () {
    const team = globale.personnelTeam ? globale.personnelTeam() : null;
    if (!team) { globale.toast && globale.toast(P('t_scegli')); return; }
    const elenco = team.players || [];
    const stato = await pannelloIA(P('tit_ia') + ' — ' + (team.name || ''),
      { squadra: team.name || '', anteprima: anteprimaDi(elenco) });
    if (!stato) return;
    const fatto = await applicaTutto(stato, elenco, team);
    globale.scheduleAutosave && globale.scheduleAutosave();
    ridisegnaTutto(team);
    dillo(fatto, cosaManca(stato, team));
  };

  /* ------------------------------------------------ IL PULSANTE DELLO SCOUTING */
  globale.importaStatisticheScouting = async function () {
    const team = globale.activeTeam ? globale.activeTeam() : null;
    const opp = team && globale.activeOpponent ? globale.activeOpponent(team) : null;
    if (!opp) { globale.toast && globale.toast(P('t_sceglia')); return; }
    const league = globale.activeLeague ? globale.activeLeague() : null;
    const rosterOpp = squadraDellAvversaria(opp, league);
    const elenco = (rosterOpp && rosterOpp.players) || opp.players || [];

    const stato = await pannelloIA(P('tit_ia') + ' — ' + (opp.name || P('tit_avv')),
      { squadra: opp.name || '', anteprima: anteprimaDi(elenco) });
    if (!stato) return;
    const fatto = await applicaTutto(stato, elenco, opp);

    globale.scheduleAutosave && globale.scheduleAutosave();
    ridisegnaTutto(rosterOpp);
    dillo(fatto, cosaManca(stato, opp));
  };

  /* ================================================================
     DATI IA — LA CARTELLA CHE SI GUARDA DA SOLA

     Perche' esiste: senza, il giro e' «l'IA prepara → tu apri VDM → premi
     il tasto → cerchi il file → lo scegli». Col guardiano il giro e'
     «dici al tuo Claude di preparare il Reyer → torni e il Reyer c'e'».

     Come funziona: una volta sola si indica una cartella (mettiamo VDM-IA
     sulla scrivania). Il permesso resta salvato in IndexedDB e alla
     riapertura si riattacca DA SOLO, senza chiedere niente — e' la stessa
     tecnica che il programma usa gia' per la cartella del lavoro in comune
     (showDirectoryPicker + handle in IndexedDB + queryPermission). Uso pero'
     un mio archivio separato: quella cartella li' e' un'altra cosa e non
     va toccata.

     Poi ogni pochi secondi guarda dentro. Se trova un .json nuovo lo legge,
     e siccome DENTRO AL FILE c'e' scritto di che squadra e' ("squadra":
     "Famila Wuber Schio"), lo porta alla squadra giusta della lega — non
     importa quale squadra hai aperto a schermo in quel momento.
     ================================================================ */

  const IA_DB = 'vdm_cartella_ia', IA_STORE = 'maniglie', IA_KEY = 'cartella';
  let cartellaIA = null;       // la maniglia della cartella, se collegata
  let orologio = null;         // il timer che guarda
  let vistiPrima = null;       // i file gia' letti, per non rifarli due volte

  function apriArchivio() {
    return new Promise(function (ok, no) {
      if (!globale.indexedDB) { no(new Error('niente IndexedDB')); return; }
      const r = indexedDB.open(IA_DB, 1);
      r.onupgradeneeded = function () { r.result.createObjectStore(IA_STORE); };
      r.onsuccess = function () { ok(r.result); };
      r.onerror = function () { no(r.error); };
    });
  }
  async function salvaManiglia(h) {
    try {
      const db = await apriArchivio();
      await new Promise(function (ok, no) {
        const t = db.transaction(IA_STORE, 'readwrite');
        t.objectStore(IA_STORE).put(h, IA_KEY);
        t.oncomplete = ok; t.onerror = function () { no(t.error); };
      });
    } catch (e) {}
  }
  async function leggiManiglia() {
    try {
      const db = await apriArchivio();
      return await new Promise(function (ok, no) {
        const t = db.transaction(IA_STORE, 'readonly');
        const r = t.objectStore(IA_STORE).get(IA_KEY);
        r.onsuccess = function () { ok(r.result || null); };
        r.onerror = function () { no(r.error); };
      });
    } catch (e) { return null; }
  }
  async function scordaManiglia() {
    try {
      const db = await apriArchivio();
      await new Promise(function (ok) {
        const t = db.transaction(IA_STORE, 'readwrite');
        t.objectStore(IA_STORE).delete(IA_KEY);
        t.oncomplete = ok; t.onerror = ok;
      });
    } catch (e) {}
  }

  /* I file gia' letti: nome + data di modifica. Se l'IA riscrive lo stesso
     file con dati nuovi la data cambia e viene riletto; se non cambia niente
     non si rifa' il lavoro ogni quattro secondi. */
  function caricaVisti() {
    if (vistiPrima) return vistiPrima;
    try { vistiPrima = new Set(JSON.parse(localStorage.getItem('vdmIaVisti') || '[]')); }
    catch (e) { vistiPrima = new Set(); }
    return vistiPrima;
  }
  function segnaVisto(chiave) {
    caricaVisti().add(chiave);
    try { localStorage.setItem('vdmIaVisti', JSON.stringify(Array.from(vistiPrima).slice(-300))); }
    catch (e) {}
  }

  /* La squadra la decide IL FILE, non quello che hai aperto a schermo.

     I nomi veri non combaciano mai alla lettera, perche' di mezzo ci sono
     gli sponsor: nella tua lega c'e' "FAMILA SCHIO", ma il sito ufficiale
     la chiama "Famila Wuber Schio", e la Reyer e' "Umana Reyer Venezia".
     Quindi non confronto le stringhe: confronto le PAROLE. Se tutte le
     parole di un nome stanno dentro all'altro, sono la stessa squadra —
     "famila schio" sta dentro "famila wuber schio", e "reyer venezia" sta
     dentro "umana reyer venezia". */
  function parole(x) {
    return String(x || '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')   // via gli accenti
      .toLowerCase().replace(/[^a-z0-9 ]+/g, ' ')
      .split(/\s+/).filter(Boolean);
  }
  function stessaSquadra(a, b) {
    const pa = parole(a), pb = parole(b);
    if (!pa.length || !pb.length) return false;
    if (pa.join(' ') === pb.join(' ')) return true;
    const corto = pa.length <= pb.length ? pa : pb;
    const lungo = corto === pa ? pb : pa;
    /* tutte le parole del nome corto devono esserci nel lungo, e almeno una
       deve essere una parola vera (4 lettere o piu'): senza questo un nome
       fatto solo di paroline corte combacerebbe con mezza lega. */
    if (!corto.every(function (w) { return lungo.indexOf(w) >= 0; })) return false;
    return corto.some(function (w) { return w.length >= 4; });
  }
  function squadraPerNome(nome) {
    const league = globale.activeLeague && globale.activeLeague();
    if (!league || !nome) return null;
    const somiglia = function (x) { return x && stessaSquadra(x.name, nome); };
    return (league.oppRosters || []).find(somiglia) || (league.teams || []).find(somiglia) || null;
  }

  async function collegaCartella() {
    if (!globale.showDirectoryPicker) {
      globale.toast && globale.toast(P('t_nocart'));
      return false;
    }
    try {
      const h = await globale.showDirectoryPicker({ mode: 'read' });
      cartellaIA = h;
      await salvaManiglia(h);
      avviaOrologio();
      globale.toast && globale.toast(P('t_cartok') + (h.name || ''));
      return true;
    } catch (e) { return false; }
  }

  /* Il permesso di leggere una cartella non sempre sopravvive alla chiusura
     del programma: alla riapertura puo' tornare "da chiedere". Prima in quel
     caso mi arrendevo in silenzio, e il riquadro tornava a dire «collega una
     cartella» come se non l'avessi mai fatto. Adesso la cartella me la tengo
     e chiedo di riconfermare: un clic, non da rifare tutto il giro. */
  let permessoDaChiedere = false;
  async function riattacca() {
    const h = await leggiManiglia();
    if (!h) return false;
    let p = 'granted';
    try { if (h.queryPermission) p = await h.queryPermission({ mode: 'read' }); }
    catch (e) { p = 'granted'; }
    if (p === 'denied') { await scordaManiglia(); return false; }
    cartellaIA = h;
    permessoDaChiedere = (p !== 'granted');
    if (!permessoDaChiedere) avviaOrologio();
    return true;
  }

  /* Il clic che riconferma. Va fatto da un gesto tuo (una premuta): il
     permesso non si puo' chiedere da solo mentre il programma si apre. */
  async function riconferma() {
    if (!cartellaIA) return false;
    try {
      const p = cartellaIA.requestPermission
        ? await cartellaIA.requestPermission({ mode: 'read' })
        : 'granted';
      if (p !== 'granted') return false;
      permessoDaChiedere = false;
      avviaOrologio();
      return true;
    } catch (e) { return false; }
  }

  function avviaOrologio() {
    if (orologio) return;
    orologio = setInterval(function () { guarda(); }, 4000);
    guarda();
  }
  function fermaOrologio() {
    if (orologio) { clearInterval(orologio); orologio = null; }
  }

  let sileEntrando = false;
  async function guarda() {
    if (!cartellaIA || sileEntrando) return;
    sileEntrando = true;
    try {
      const visti = caricaVisti();
      for await (const [nome, voce] of cartellaIA.entries()) {
        if (!voce || voce.kind !== 'file' || !/\.json$/i.test(nome)) continue;
        let f;
        try { f = await voce.getFile(); } catch (e) { continue; }
        const chiave = nome + '|' + f.lastModified + '|' + f.size;
        if (visti.has(chiave)) continue;
        segnaVisto(chiave);
        await portaDentro(f, nome);
      }
    } catch (e) {
      /* permesso revocato o cartella sparita: si smette di guardare in
         silenzio, senza riempire di errori chi sta lavorando */
      fermaOrologio();
    }
    sileEntrando = false;
  }

  async function portaDentro(file, nome) {
    let j;
    try { j = daJson(JSON.parse(await file.text())); }
    catch (e) { return; }
    if (!j || !(j.giocatrici.length || j.squadraStat || j.quintetti || j.playTypes)) return;

    const squadra = squadraPerNome(j.squadra);
    if (!squadra) {
      globale.toast && globale.toast(P('t_arrivato') + nome + ' « ' + (j.squadra || '?') + P('t_nolega'));
      return;
    }
    const elenco = squadra.players || (squadra.players = []);
    const stato = { dati: { giocatrici: null, quintetti: null, ia: j, nonCapiti: [] },
                    playTypes: null, creaMancanti: true };
    const fatto = await applicaTutto(stato, elenco, squadra);

    globale.scheduleAutosave && globale.scheduleAutosave();
    ridisegnaTutto(squadra);

    const d = [];
    if (fatto.nuove) d.push(fatto.nuove + ' ' + P('i_schede'));
    if (fatto.foto) d.push(fatto.foto + ' ' + P('s_foto'));
    if (fatto.quintetti) d.push(fatto.quintetti + ' ' + P('s_quintetti'));
    globale.toast && globale.toast('🤖 ' + (squadra.name || j.squadra) + ': ' +
      (d.length ? d.join(', ') : P('i_aggiornati')) + '.');
  }

  /* Si chiama cosi' e non "stato" perche' dentro al pannello c'e' gia' una
     variabile con quel nome (quella che tiene i file scelti): la funzione ci
     finiva sotto e usciva «stato is not a function». */
  function statoCartella() {
    return { collegata: !!cartellaIA, nome: cartellaIA ? cartellaIA.name : '',
             daRiconfermare: permessoDaChiedere, guarda: !!orologio };
  }
  async function scollega() {
    fermaOrologio();
    cartellaIA = null;
    permessoDaChiedere = false;
    await scordaManiglia();
  }

  globale.VDMCartellaIA = { collega: collegaCartella, scollega: scollega, stato: statoCartella,
                            riattacca: riattacca, riconferma: riconferma, guardaAdesso: guarda,
                            /* solo per le prove */
                            _prova: { portaDentro: portaDentro, squadraPerNome: squadraPerNome,
                                      stessaSquadra: stessaSquadra } };

  /* ------------------------------------------------ LE SPUNTE DI STAMPA */
  globale.impPaginaPersonnel = function (v) {
    const team = globale.personnelTeam ? globale.personnelTeam() : null;
    if (!team) return;
    team.paginaStatAvanzate = !!v;
    globale.scheduleAutosave && globale.scheduleAutosave();
    globale.renderPersonnelLivePreview && globale.renderPersonnelLivePreview(team);
  };
  globale.impPaginaScouting = function (v) {
    const team = globale.activeTeam ? globale.activeTeam() : null;
    const opp = team && globale.activeOpponent ? globale.activeOpponent(team) : null;
    if (!opp) return;
    opp.paginaStatAvanzate = !!v;
    globale.scheduleAutosave && globale.scheduleAutosave();
    globale.renderScoutingLivePreview && globale.renderScoutingLivePreview(team);
  };

  /* ------------------------------------------------ LE PAGINE IN CODA
     Invece di mettere le mani dentro alle funzioni che gia' costruiscono i
     fogli, gliele avvolgo: chiamo quella di prima e aggiungo la mia pagina
     in fondo. Se questo file non c'e', il programma fa esattamente quello
     che faceva prima. */
  /* Vero se in statAvanzate c'e' almeno un dato vero. "fonte" e "data" non
     contano: quelli ci sono sempre. */
  /* Righe vere, non caselle vuote: le tabelle da riempire a mano hanno otto
     righe fisse e sei quintetti fissi, e finche' non ci si scrive dentro un
     nome non sono un dato. Senza questo bastava aprire il riquadro per far
     comparire un foglio di trattini. */
  function conNome(elenco, campo) {
    return (elenco || []).filter(function (x) {
      return x && String(x[campo] == null ? '' : x[campo]).trim();
    }).length;
  }
  function qualcheNumero(a) {
    if (!a) return false;
    if (conNome(a.quintetti, 'quintetto')) return true;
    /* I play type arrivano in due forme: di SQUADRA sono un oggetto con
       dentro attacco e difesa, di GIOCATRICE sono una riga di testo. Prima
       si guardava solo la prima forma: una giocatrice di cui si sapevano i
       play type ma nessun numero non faceva uscire il foglio, e quelle
       righe non si vedevano da nessuna parte. */
    const pt = a.playTypes || {};
    if (typeof pt === 'string') { if (pt.trim()) return true; }
    else if (conNome(pt.attacco, 'nome') || conNome(pt.difesa, 'nome')) return true;
    return Object.keys(a).some(function (k) {
      /* "playTypeRighe" e' solo il modo in cui le quattro caselle della
         scheda si ricordano dove stavano: quattro caselle vuote sono un
         elenco vuoto, non un dato. Senza questa riga bastava entrare in
         una casella e uscirne per far comparire un foglio di trattini. */
      if (k === 'fonte' || k === 'data' || k === 'quintetti' || k === 'playTypes' || k === 'playTypeRighe') return false;
      const v = a[k];
      return v != null && v !== '' && v !== '-';
    });
  }

  /* LE PAROLE DEL FOGLIO STAMPATO. paginaSquadraHtml le accetta da fuori e
     ha dei ripieghi in italiano: qui gliele si passa nella lingua del
     programma, cosi' il foglio che il coach consegna e' nella sua lingua.
     Le sigle corte (Min, Poss, Pt) restano: sono uguali dappertutto. */
  function etichetteStampa() {
    return {
      aPartita: P('h_medie'),   punti: P('n_punti'),        ppp: P('n_ppp'),
      tiro: P('n_tiro'),        tiroCampo: P('n_tiro'),     due: P('n_due'),
      tre: P('n_tre'),          liberi: P('n_liberi'),      assist: P('n_assist'),
      rimbalzi: P('n_rimbalzi'), rimbOff: P('n_rimbOff'),   rimbDif: P('n_rimbDif'),
      pp: P('n_perse'),         rec: P('n_recuperi'),       stoppate: P('n_stoppate'),
      playType: P('col_pt'),    ptAttacco: P('h_ptatt'),    ptDifesa: P('h_ptdif'),
      quintetti: P('h_quintetti'), quintetto: P('col_quintetto'),
      attacco: P('h_attacco'),  tabellone: P('h_tabellone')
    };
  }

  function avvolgi() {
    I.aggiungiStile(D);
    const pp = globale.buildPersonnelPageHtml;
    if (typeof pp === 'function' && !pp._imp) {
      const nuova = function (team, league) {
        const prima = pp.apply(this, arguments);
        if (!team || team.paginaStatAvanzate === false) return prima;
        /* qui basta che ALMENO UNA giocatrice abbia qualcosa di avanzato */
        const conDati = (team.players || []).some(function (p) {
          return p && p.statAvanzate && qualcheNumero(p.statAvanzate);
        });
        if (!conDati) return prima;
        return prima + I.paginaPersonnelHtml(team, league, P('h_avpt'), segnaposto());
      };
      nuova._imp = true;
      globale.buildPersonnelPageHtml = nuova;
    }
    metticiLaSpunta();
    const rp = globale.renderPersonnelLivePreview;
    if (typeof rp === 'function' && !rp._imp) {
      const nuova = function (team) { const r = rp.apply(this, arguments); aggiornaLaSpunta(team); return r; };
      nuova._imp = true;
      globale.renderPersonnelLivePreview = nuova;
    }
    const sc = globale.buildScoutingReportPageHtml;
    if (typeof sc === 'function' && !sc._imp) {
      const nuova = function (team, league, editable) {
        const prima = sc.apply(this, arguments);
        const opp = team && globale.activeOpponent ? globale.activeOpponent(team) : null;
        if (!opp || !opp.statAvanzate || opp.paginaStatAvanzate === false) return prima;
        /* Un foglio con dodici trattini non serve a nessuno e sembra un
           guasto. Se dentro non c'e' NEMMENO UN numero — perche' chi ha
           preparato il file non ha trovato le statistiche — la pagina non
           si fa proprio. */
        if (!qualcheNumero(opp.statAvanzate)) return prima;
        return prima + I.paginaSquadraHtml(team, opp, P('h_avsq'), opp.statAvanzate, etichetteStampa());
      };
      nuova._imp = true;
      globale.buildScoutingReportPageHtml = nuova;
    }
    /* DATI IA: se la cartella era gia' collegata si riattacca da sola e
       ricomincia a guardare, senza chiedere niente a nessuno. */
    try { riattacca(); } catch (e) {}

    /* Il programma disegna tutto una volta PRIMA che questo file sia
       caricato: se il lavoro aperto ha gia' delle statistiche importate, la
       pagina in piu' non ci sarebbe finche' non si tocca qualcosa. Un solo
       ridisegno qui e si rimette a posto da solo. */
    try {
      const team = globale.personnelTeam && globale.personnelTeam();
      if (team && team.statAvanzate && globale.renderPersonnelLivePreview) {
        globale.renderPersonnelLivePreview(team);
      } else {
        aggiornaLaSpunta(team);
      }
      const mia = globale.activeTeam && globale.activeTeam();
      const opp = mia && globale.activeOpponent && globale.activeOpponent(mia);
      if (opp && opp.statAvanzate && globale.renderScoutingLivePreview) globale.renderScoutingLivePreview(mia);
    } catch (e) { /* niente: se non si puo', si vedra' al primo ridisegno */ }
  }
  /* La spunta del Personnel: la barra dei pulsanti li' e' scritta a mano nel
     programma e non si ridisegna, quindi la spunta la infilo io una volta
     sola accanto al pulsante, e la tengo aggiornata ad ogni ridisegno del
     foglio. Se questo file non c'e', la' non compare niente. */
  function metticiLaSpunta() {
    if (D.getElementById('impSpuntaPersonnel')) return;
    const bottone = D.querySelector('[onclick="importaStatistichePersonnel()"]');
    if (!bottone) return;
    const l = D.createElement('label');
    l.id = 'impSpuntaPersonnel';
    l.className = 'scout-solo1';
    l.title = P('sp_avT');
    l.style.display = 'none';
    l.innerHTML = '<input type="checkbox" onchange="impPaginaPersonnel(this.checked)"> \uD83D\uDCCA ' + esc(P('sp_av'));
    bottone.insertAdjacentElement('afterend', l);
  }
  function aggiornaLaSpunta(team) {
    const l = D.getElementById('impSpuntaPersonnel');
    if (!l) return;
    /* La spunta deve esserci ESATTAMENTE quando il secondo foglio si puo'
       fare, cioe' alla stessa condizione che usa la stampa: almeno una
       giocatrice con qualcosa di avanzato. Prima si guardava invece
       team.statAvanzate, che lo riempie SOLO l'IA: scrivendo le avanzate a
       mano nelle schede il foglio in coda usciva e la spunta per toglierlo
       restava nascosta — niente scelta fra un foglio e due. */
    const c = !!(team && ((team.players || []).some(function (p) {
      return p && p.statAvanzate && qualcheNumero(p.statAvanzate);
    }) || team.statAvanzate));
    l.style.display = c ? '' : 'none';
    const i = l.querySelector('input');
    if (i) i.checked = !team || team.paginaStatAvanzate !== false;
  }

  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', avvolgi);
  else avvolgi();

  I.statisticheSquadra = statisticheSquadra;
  /* Serve solo alle prove: entrare dal di dentro senza passare dal pannello. */
  I._prova = { leggiTutti: leggiTutti, applicaTutto: applicaTutto, applicaIA: applicaIA, daJson: daJson,
               qualcheNumero: qualcheNumero };
  I.leggiPlayTypes = leggiPlayTypes;
  I.playTypesPerGiocatrice = playTypesPerGiocatrice;
  I.richiestaPerIA = richiestaPerIA;
})(typeof window !== 'undefined' ? window : globalThis);

/* ===================================================================
   LE AVANZATE SI SCRIVONO ANCHE A MANO

   L'IA non trova tutto. Una giocatrice appena arrivata, una serie
   minore, un campionato che non sta su nessun sito: di lei le
   statistiche avanzate non ci sono, e prima restavano vuote per
   sempre — il secondo foglio usciva con i trattini e non c'era un
   posto dove scriverci dentro.

   Quindi nella scheda del Personnel, sotto alle caratteristiche, ci
   sono adesso DUE elenchi in fila, uno per foglio:
     - «Caratteristiche» — le quattro righe del PRIMO foglio (c'erano gia')
     - «Statistiche avanzate» — i numeri del SECONDO foglio
     - «Play type» — le quattro righe in fondo al SECONDO foglio

   Le caselle sono quelle che il programma usa gia' per le medie e per
   le caratteristiche: stessa griglia, stessi filetti, stesso modo di
   scriverci. Quello che l'IA ha portato si vede dentro le caselle e si
   puo' correggere; quello che manca lo si scrive.

   Come per il resto di questo file: non tocco la funzione che c'era,
   la avvolgo. Senza questo file la scheda torna esattamente com'era.
   =================================================================== */
(function (globale) {
  /* P arriva dal blocco principale: vedi __vdmParola. */
  const P = function (k) { return globale.__vdmParola ? globale.__vdmParola(k) : ''; };
  'use strict';
  const D = globale.document;
  const I = globale.VDMImportaStatistiche;
  if (!I || !D) return;

  /* I numeri del secondo foglio, nell'ordine in cui ci stanno sopra.
     Le etichette sono le stesse sigle stampate sulla scheda (PPP, +/-,
     RO, RD, REC, PP): non si traducono, sono le stesse in ogni lingua.
     Il suggerimento dentro la casella e' solo un esempio di come si
     scrive il numero, senza parole. */
  const CAMPI = [
    { chiave: 'minuti',           sigla: 'MIN', esempio: '25:15' },
    { chiave: 'partite',          sigla: 'G',   esempio: '27' },
    { chiave: 'puntiPerPossesso', sigla: 'PPP', esempio: '1.04' },
    { chiave: 'plusMinus',        sigla: '+/-', esempio: '11.6' },
    { chiave: 'rimbalziOff',      sigla: 'RO',  esempio: '0.5' },
    { chiave: 'rimbalziDif',      sigla: 'RD',  esempio: '1.2' },
    { chiave: 'recuperi',         sigla: 'REC', esempio: '0.5' },
    { chiave: 'pallePerse',       sigla: 'PP',  esempio: '1.3' }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  /* La scritta della riga di separazione. Se la lingua ce l'ha gia' nel
     programma si usa quella; se no si ripiega su una parola che si
     capisce dappertutto, invece di far comparire il nome della chiave. */
  function scritta(chiave, ripiego) {
    let v = '';
    try { v = globale.t ? globale.t(chiave) : ''; } catch (e) { v = ''; }
    if (!v || v === chiave) v = ripiego;
    /* La scritta che il programma usa nel report ha davanti un'emoji
       ("📈 Statistiche avanzate"). Qui e' una riga di separazione alta
       sette pixel e tutta maiuscola, come MEDIE e CARATTERISTICHE: li'
       l'emoji non ci sta e si vede come un quadratino. Via. */
    return String(v).replace(/^[^\p{L}\p{N}]+/u, '').trim() || ripiego;
  }

  function avanzate(p) {
    if (!p.statAvanzate || typeof p.statAvanzate !== 'object') p.statAvanzate = {};
    return p.statAvanzate;
  }

  /* Le quattro righe dei play type stanno in UNA stringa sola, divise da
     " - ": e' il formato che arriva dall'IA ed e' quello che la pagina
     stampata legge. Qui la si apre in quattro caselle e la si richiude.

     C'e' un tranello, ed e' costato una prova fallita: nella stringa una
     riga vuota IN MEZZO non esiste. Svuotando la seconda casella, la
     terza scalava al suo posto — ma nella scheda a schermo le caselle
     non si ridisegnano (se no si perderebbe il cursore mentre si
     scrive), quindi la casella 3 continuava a mostrare un testo che nei
     dati stava in posizione 2. Riscrivendo nella 2 si cancellava la 3.
     Quindi le quattro caselle si tengono ANCHE come quattro caselle
     separate, in "playTypeRighe"; la stringa resta quella che stampa.

     Se le due cose non combaciano — per esempio l'IA ha portato dei play
     type nuovi e le vecchie quattro caselle sono rimaste appiccicate —
     comanda la stringa, che e' quella che finisce sul foglio. */
  function righePlayType(p) {
    const a = (p && p.statAvanzate) || {};
    const testo = String(a.playTypes || (p && p.playType) || '').trim();
    if (Array.isArray(a.playTypeRighe)) {
      const r = a.playTypeRighe.slice(0, 4).map(function (x) { return String(x == null ? '' : x).trim(); });
      while (r.length < 4) r.push('');
      if (r.filter(Boolean).join(' - ') === testo) return r;
    }
    const s = testo.split(/\s+[-–—]\s+/).map(function (x) { return x.trim(); }).filter(Boolean);
    while (s.length < 4) s.push('');
    return s.slice(0, 4);
  }

  function trova(id) {
    return globale.trovaGiocatriceOvunque ? globale.trovaGiocatriceOvunque(id) : null;
  }
  function dopo(t) {
    if (globale.renderPersonnelLivePreview) globale.renderPersonnelLivePreview(t.team);
    if (globale.scheduleAutosave) globale.scheduleAutosave();
  }

  /* Come updatePlayerStat e updatePlayerTrait del programma: si scrive
     mentre si digita e NON si ridisegna la scheda, se no la casella
     perderebbe il cursore a ogni lettera. L'anteprima invece si rifa'. */
  globale.aggiornaStatAvanzata = function (id, chiave, valore) {
    const t = trova(id);
    if (!t) return;
    const p = globale.ensurePlayerProfile ? globale.ensurePlayerProfile(t.p) : t.p;
    avanzate(p)[chiave] = valore;
    dopo(t);
  };

  globale.aggiornaPlayTypeRiga = function (id, indice, valore) {
    const t = trova(id);
    if (!t) return;
    const p = globale.ensurePlayerProfile ? globale.ensurePlayerProfile(t.p) : t.p;
    const r = righePlayType(p);
    r[indice] = String(valore == null ? '' : valore).replace(/\s+[-–—]\s+/g, ' ').trim();
    const st = avanzate(p);
    st.playTypeRighe = r;
    st.playTypes = r.filter(Boolean).join(' - ');
    dopo(t);
  };

  function bloccoHtml(p) {
    const id = esc(p.id);
    const a = (p && p.statAvanzate) || {};
    const righe = righePlayType(p);
    return '' +
      '<div class="dossier-sep"><span>' + esc(scritta('relazione.statAvanzateTitle', 'Statistiche avanzate')) + '</span></div>' +
      '<div class="dossier-stats">' +
        CAMPI.map(function (c) {
          return '<label>' + esc(c.sigla) +
            '<input type="text" placeholder="' + esc(c.esempio) + '" value="' + esc(a[c.chiave] == null ? '' : a[c.chiave]) + '"' +
            ' oninput="aggiornaStatAvanzata(\'' + id + '\',\'' + c.chiave + '\',this.value)"></label>';
        }).join('') +
      '</div>' +
      '<div class="dossier-sep"><span>Play type</span></div>' +
      '<div class="dossier-traits">' +
        righe.map(function (testo, i) {
          return '<textarea rows="1" placeholder="' + (i < 2 ? 'ATT' : 'DIF') + ' …"' +
            ' oninput="aggiornaPlayTypeRiga(\'' + id + '\',' + i + ',this.value); crescoCampo(this)">' +
            esc(testo) + '</textarea>';
        }).join('') +
      '</div>';
  }

  /* Si avvolge la scheda che c'e' gia'. Non si va a cercare un pezzo di
     testo dentro l'HTML (basterebbe cambiare una riga del programma per
     rompere tutto): si rilegge la scheda come pezzo di pagina, si trova
     l'elenco delle caratteristiche e gli si mette il resto subito sotto.
     Se qualcosa non torna si restituisce la scheda di prima, intatta. */
  function avvolgiScheda() {
    const vecchia = globale.dossierCardHtml;
    if (typeof vecchia !== 'function' || vecchia._impAvanzate) return;
    const nuova = function (p) {
      const html = vecchia.apply(this, arguments);
      try {
        if (!p || !p.id) return html;
        const box = D.createElement('div');
        box.innerHTML = html;
        const caratteristiche = box.querySelector('.dossier-traits');
        if (!caratteristiche) return html;
        caratteristiche.insertAdjacentHTML('afterend', bloccoHtml(p));
        return box.innerHTML;
      } catch (e) { return html; }
    };
    nuova._impAvanzate = true;
    globale.dossierCardHtml = nuova;

    /* Il Personnel e' gia' disegnato quando questo file arriva: un giro
       solo e le caselle nuove compaiono senza dover cambiare scheda. */
    try {
      const team = globale.personnelTeam && globale.personnelTeam();
      if (team && globale.renderPersonnelDossiers && D.getElementById('personnelDossierGrid')) {
        globale.renderPersonnelDossiers(team);
      }
    } catch (e) {}
  }

  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', avvolgiScheda);
  else avvolgiScheda();

  I.bloccoAvanzateHtml = bloccoHtml;
  I.righePlayType = righePlayType;
})(typeof window !== 'undefined' ? window : globalThis);

/* ===================================================================
   ANCHE IL FOGLIO AVANZATO DI SQUADRA SI SCRIVE A MANO

   Il secondo foglio dello scouting report — medie di squadra, play type
   in attacco e in difesa, quintetti — fino a ieri arrivava SOLO dall'IA.
   Se l'IA non trovava i play type, quel foglio non c'era e non esisteva
   un posto dove scriverli.

   Adesso nel report, sotto al riquadro «Statistiche avanzate» che c'era
   gia', c'e' un riquadro nuovo con dentro tutto quello che finisce su
   quel foglio: le medie, otto righe di play type per l'attacco, otto per
   la difesa, sei quintetti e la fonte. Quello che l'IA ha portato si
   vede dentro le caselle e si corregge; quello che manca si scrive.

   Le righe lasciate vuote non vanno sul foglio: ci pensa soloPiene()
   nella stampa, e conNome() decide se il foglio va fatto o no. Senza
   quelle due, otto righe vuote facevano uscire un foglio di trattini.

   Come tutto il resto di questo file: index.html non si tocca.
   =================================================================== */
(function (globale) {
  /* P arriva dal blocco principale: vedi __vdmParola. */
  const P = function (k) { return globale.__vdmParola ? globale.__vdmParola(k) : ''; };
  'use strict';
  const D = globale.document;
  const I = globale.VDMImportaStatistiche;
  if (!I || !D) return;

  /* Le medie: sono ESATTAMENTE quelle che paginaSquadraHtml stampa nelle
     due caselle in alto, nello stesso ordine. Dove il foglio mostra anche
     "fatti/tentati" (28.1/60.8) c'e' una seconda casella. */
  const NUMERI = [
    { k: 'punti',            l: 'n_punti',              e: '79.4' },
    { k: 'puntiPerPossesso', l: 'n_ppp', e: '0.95' },
    { k: 'tiroPct',          l: 'n_tiro',             e: '48.2%', su: 'tiroSu',    esu: '30.0/62.3' },
    { k: 'duePct',           l: 'n_due',             e: '52.8%', su: 'dueSu',     esu: '22.2/42.1' },
    { k: 'trePct',           l: 'n_tre',             e: '38.7%', su: 'treSu',     esu: '7.8/20.2' },
    { k: 'liberiPct',        l: 'n_liberi',        e: '74.3%', su: 'liberiSu',  esu: '11.6/15.6' },
    { k: 'assist',           l: 'n_assist',             e: '22.8' },
    { k: 'rimbalzi',         l: 'n_rimbalzi',           e: '36.1' },
    { k: 'rimbalziOff',      l: 'n_rimbOff', e: '9.8' },
    { k: 'rimbalziDif',      l: 'n_rimbDif', e: '26.3' },
    { k: 'pallePerse',       l: 'n_perse',        e: '14.4' },
    { k: 'recuperi',         l: 'n_recuperi',           e: '9.0' },
    { k: 'stoppate',         l: 'n_stoppate',           e: '2.8' }
  ];
  /* Le colonne dei play type sono le quattro che si stampano. "punti" nel
     file c'e', ma sul foglio non compare: non lo si chiede a mano. */
  const COLPT = [
    { k: 'nome',     l: 'col_pt', largo: true, e: 'Catch and shoots' },
    { k: 'quota',    l: '%',         e: '19.6%' },
    { k: 'possessi', l: 'Poss',      e: '13.9' },
    { k: 'ppp',      l: 'PPP',       e: '1.20' }
  ];
  const COLQ = [
    { k: 'quintetto', l: 'col_quintetto', largo: true, e: '8 Verona, 33 Laksa, 24 Zandalasini, 31 Keys, 22 Andre' },
    { k: 'plusMinus', l: '+/-',  e: '+8' },
    { k: 'minuti',    l: 'Min',  e: '06:12' },
    { k: 'possessi',  l: 'Poss', e: '14' },
    { k: 'punti',     l: 'Pt',   e: '15' },
    { k: 'tiroPct',   l: 'n_tiro', e: '51.2%' }
  ];
  const RIGHE_PT = 8;   // otto: sono quelle che ci stanno sul foglio
  const RIGHE_Q = 6;    // sei quintetti, come sul foglio

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  /* La squadra avversaria aperta adesso nel report. Se non ce n'e' una,
     non si scrive da nessuna parte e le caselle restano spente. */
  function avversaria() {
    try {
      const t = globale.activeTeam && globale.activeTeam();
      const o = t && globale.activeOpponent ? globale.activeOpponent(t) : null;
      return o ? { team: t, opp: o } : null;
    } catch (e) { return null; }
  }
  function avz(o) {
    if (!o.statAvanzate || typeof o.statAvanzate !== 'object') o.statAvanzate = {};
    return o.statAvanzate;
  }
  function lista(a, lato) {
    if (!a.playTypes || typeof a.playTypes !== 'object' || Array.isArray(a.playTypes)) {
      a.playTypes = { attacco: [], difesa: [] };
    }
    if (!Array.isArray(a.playTypes[lato])) a.playTypes[lato] = [];
    return a.playTypes[lato];
  }
  /* La riga i-esima esiste sempre, anche se si comincia a scrivere dalla
     terza: cosi' le caselle non si spostano sotto le dita. Le righe senza
     nome le butta via la stampa. */
  function riga(arr, i) {
    while (arr.length <= i) arr.push({});
    if (!arr[i] || typeof arr[i] !== 'object') arr[i] = {};
    return arr[i];
  }
  function dopo(v) {
    if (globale.renderScoutingLivePreview) globale.renderScoutingLivePreview(v.team);
    if (globale.scheduleAutosave) globale.scheduleAutosave();
  }

  globale.impNumeroSquadra = function (chiave, valore) {
    const v = avversaria(); if (!v) return;
    avz(v.opp)[chiave] = valore;
    dopo(v);
  };
  globale.impPlayTypeSquadra = function (lato, i, campo, valore) {
    const v = avversaria(); if (!v) return;
    riga(lista(avz(v.opp), lato), i)[campo] = valore;
    dopo(v);
  };
  globale.impQuintettoSquadra = function (i, campo, valore) {
    const v = avversaria(); if (!v) return;
    const a = avz(v.opp);
    if (!Array.isArray(a.quintetti)) a.quintetti = [];
    riga(a.quintetti, i)[campo] = valore;
    dopo(v);
  };
  globale.impFonteSquadra = function (valore) {
    const v = avversaria(); if (!v) return;
    avz(v.opp).fonte = valore;
    dopo(v);
  };

  function tabella(titolo, colonne, righe, chiamata) {
    return '<div class="rb-sub">' + esc(titolo) + '</div>' +
      '<table class="imp-ed-tab"><thead><tr>' +
      colonne.map(function (c) {
        return '<th' + (c.largo ? '' : ' class="imp-ed-s"') + '>' + esc(P(c.l) || c.l) + '</th>';
      }).join('') + '</tr></thead><tbody>' +
      Array.from({ length: righe }, function (_, i) {
        return '<tr>' + colonne.map(function (c) {
          /* ".call(this)" e non solo il nome: scritto senza parentesi
             l'oninput valuta la funzione e non la chiama, e le caselle
             sembrano funzionare ma non scrivono niente. E' costato una
             prova fallita. Il .call serve per farle avere la casella. */
          return '<td><input type="text" class="field-mini" data-imp="' + chiamata + '|' + i + '|' + c.k + '"' +
            ' placeholder="' + esc(i === 0 ? c.e : '') + '"' +
            ' oninput="' + chiamata + '.call(this)"></td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table>';
  }


  function riquadroHtml() {
    return '<div class="report-box rb-stat rb-avanzate" id="impFoglioSquadra">' +
      '<div class="rb-head">' + esc(P('h_foglio')) + '</div>' +
      '<div class="rb-body">' +
        '<div class="muted" style="font-size:11.5px;margin:-2px 0 6px;">' +
          esc(P('a_amano')) + '</div>' +
        '<div class="rb-sub">' + esc(P('h_medie')) + '</div>' +
        '<table class="imp-ed-tab imp-ed-num"><tbody>' +
          NUMERI.map(function (n) {
            return '<tr><td class="imp-ed-et">' + esc(P(n.l) || n.l) + '</td>' +
              '<td><input type="text" class="field-mini" data-impnum="' + n.k + '" placeholder="' + esc(n.e) + '"' +
              ' oninput="impNumeroSquadra(\'' + n.k + '\', this.value)"></td>' +
              '<td>' + (n.su
                ? '<input type="text" class="field-mini" data-impnum="' + n.su + '" placeholder="' + esc(n.esu) + '"' +
                  ' oninput="impNumeroSquadra(\'' + n.su + '\', this.value)">'
                : '') + '</td></tr>';
          }).join('') +
        '</tbody></table>' +
        tabella(P('h_ptatt'), COLPT, RIGHE_PT, 'impPtAtt') +
        tabella(P('h_ptdif'), COLPT, RIGHE_PT, 'impPtDif') +
        tabella(P('h_quintetti'), COLQ, RIGHE_Q, 'impQ') +
        '<div class="rb-sub">' + esc(P('h_fonte')) + '</div>' +
        '<input type="text" class="field-mini" data-impfonte placeholder="' + esc(P('ph_fonte')) + '"' +
        ' oninput="impFonteSquadra(this.value)">' +
      '</div>' +
    '</div>';
  }

  /* Le caselle si riempiono con quello che c'e' nella squadra aperta. NON
     si tocca la casella dentro cui si sta scrivendo: se no il cursore
     salterebbe via a ogni lettera. */
  function riempi() {
    const box = D.getElementById('impFoglioSquadra');
    if (!box) return;
    const v = avversaria();
    const a = (v && v.opp && v.opp.statAvanzate) || {};
    const pt = (a.playTypes && typeof a.playTypes === 'object' && !Array.isArray(a.playTypes)) ? a.playTypes : {};
    const dentro = D.activeElement && box.contains(D.activeElement) ? D.activeElement : null;
    const metti = function (el, valore) {
      if (!el || el === dentro) return;
      el.value = valore == null ? '' : String(valore);
    };
    box.querySelectorAll('[data-impnum]').forEach(function (el) {
      metti(el, a[el.getAttribute('data-impnum')]);
    });
    box.querySelectorAll('[data-imp]').forEach(function (el) {
      const p = el.getAttribute('data-imp').split('|');
      const i = parseInt(p[1], 10), campo = p[2];
      const fonte = p[0] === 'impQ' ? (a.quintetti || [])
        : p[0] === 'impPtAtt' ? (pt.attacco || []) : (pt.difesa || []);
      metti(el, (fonte[i] || {})[campo]);
    });
    const f = box.querySelector('[data-impfonte]');
    metti(f, a.fonte);
    box.style.display = v ? '' : 'none';
  }

  /* Gli oninput scritti nell'HTML chiamano queste tre: leggono da soli in
     che riga e in che colonna stanno, cosi' nell'HTML c'e' un nome solo. */
  function daCasella(el) {
    const p = String(el.getAttribute('data-imp') || '').split('|');
    return { i: parseInt(p[1], 10), campo: p[2] };
  }
  globale.impPtAtt = function () { const d = daCasella(this); globale.impPlayTypeSquadra('attacco', d.i, d.campo, this.value); };
  globale.impPtDif = function () { const d = daCasella(this); globale.impPlayTypeSquadra('difesa', d.i, d.campo, this.value); };
  globale.impQ = function () { const d = daCasella(this); globale.impQuintettoSquadra(d.i, d.campo, this.value); };

  const STILE_ED = '' +
    '#impFoglioSquadra{grid-column:1/-1;}' +
    '#impFoglioSquadra .imp-ed-tab{width:100%;border-collapse:collapse;margin:2px 0 8px;}' +
    '#impFoglioSquadra .imp-ed-tab th{font-size:9px;text-transform:uppercase;letter-spacing:.4px;' +
      'opacity:.6;font-weight:800;text-align:left;padding:0 3px 2px;}' +
    '#impFoglioSquadra .imp-ed-tab th.imp-ed-s{width:64px;}' +
    '#impFoglioSquadra .imp-ed-tab td{padding:1px 3px;}' +
    '#impFoglioSquadra .imp-ed-num td.imp-ed-et{font-size:11px;opacity:.75;white-space:nowrap;width:42%;}' +
    '#impFoglioSquadra .imp-ed-num td{width:29%;}' +
    '#impFoglioSquadra input.field-mini{width:100%;box-sizing:border-box;}';

  function metticiIlRiquadro() {
    if (D.getElementById('impFoglioSquadra')) return;
    const griglia = D.querySelector('.report-stat-grid');
    if (!griglia) return;
    if (!D.getElementById('impStileEd')) {
      const s = D.createElement('style');
      s.id = 'impStileEd';
      s.textContent = STILE_ED;
      (D.head || D.documentElement).appendChild(s);
    }
    griglia.insertAdjacentHTML('beforeend', riquadroHtml());
    riempi();

    /* Si riempie da solo ogni volta che il report si ridisegna: cambiando
       avversaria le caselle mostrano la sua, non quelle di prima. */
    const rs = globale.renderScoutingLivePreview;
    if (typeof rs === 'function' && !rs._impEd) {
      const nuova = function () { const r = rs.apply(this, arguments); try { riempi(); } catch (e) {} return r; };
      nuova._impEd = true;
      globale.renderScoutingLivePreview = nuova;
    }
  }

  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', metticiIlRiquadro);
  else metticiIlRiquadro();

  I.riquadroFoglioSquadraHtml = riquadroHtml;
  I.riempiFoglioSquadra = riempi;
  I._metticiIlRiquadro = metticiIlRiquadro;
})(typeof window !== 'undefined' ? window : globalThis);

/* ===========================================================================
 * LE AVANZATE ANCHE NELLE SCHEDE AVVERSARIE  (30/09/2026)
 *
 * Il 28 settembre si era deciso di lasciarle fuori: in Avversarie restavano
 * le sei medie e le quattro caratteristiche. Vince ha cambiato idea, e ha
 * ragione: e' li' che si prepara la squadra che si incontra domenica, e se
 * l'IA non ha trovato un numero lo si vuole poter scrivere sul posto.
 *
 * Le schede avversarie non hanno un "id" giocatrice come quelle del
 * Personnel: si trovano per societa' + posizione nella lista (slot.id,
 * indice), che e' la stessa strada che usa gia' updateOppRosterPlayerField
 * per il nome e per le medie. I dati finiscono in p.statAvanzate e
 * p.playTypes, gli stessi campi che riempie l'IA: cosi' quello che si
 * scrive a mano e quello che arriva dal file sono la stessa cosa.
 * ======================================================================== */
(function (globale) {
  'use strict';
  const D = globale.document;
  if (!D) return;
  const P = function (k) { return globale.__vdmParola ? globale.__vdmParola(k) : ''; };
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* Le stesse otto caselle della scheda del Personnel: se fossero diverse,
     stampando i due fogli si vedrebbero due tabelle che non combaciano. */
  const CAMPI = [
    { chiave: 'minuti',           sigla: 'MIN', esempio: '25:15' },
    { chiave: 'partite',          sigla: 'G',   esempio: '27' },
    { chiave: 'puntiPerPossesso', sigla: 'PPP', esempio: '1.04' },
    { chiave: 'plusMinus',        sigla: '+/-', esempio: '11.6' },
    { chiave: 'rimbalziOff',      sigla: 'RO',  esempio: '0.5' },
    { chiave: 'rimbalziDif',      sigla: 'RD',  esempio: '1.2' },
    { chiave: 'recuperi',         sigla: 'REC', esempio: '0.5' },
    { chiave: 'pallePerse',       sigla: 'PP',  esempio: '1.3' }
  ];

  function giocatrice(slotId, indice) {
    try {
      const lega = globale.activeLeague && globale.activeLeague();
      if (!lega || !globale.ensureOppRosterSlots) return null;
      const slot = globale.ensureOppRosterSlots(lega).filter(function (s) { return s.id === slotId; })[0];
      if (!slot) return null;
      while (slot.players.length <= indice) slot.players.push({});
      const p = globale.ensureRosterPlayerShape
        ? globale.ensureRosterPlayerShape(slot.players[indice])
        : (slot.players[indice] || {});
      slot.players[indice] = p;
      return p;
    } catch (e) { return null; }
  }

  globale.impAvvAvanzata = function (slotId, indice, chiave, valore) {
    const p = giocatrice(slotId, indice);
    if (!p) return;
    if (!p.statAvanzate || typeof p.statAvanzate !== 'object') p.statAvanzate = {};
    p.statAvanzate[chiave] = valore;
    globale.scheduleAutosave && globale.scheduleAutosave();
  };

  /* LE QUATTRO RIGHE DEI PLAY TYPE si tengono anche come quattro caselle
     separate, non solo come una stringa: in una stringa una riga vuota in
     mezzo non esiste, le caselle slittano e si perdono dati senza
     accorgersene. E' lo stesso accorgimento della scheda del Personnel. */
  function righe(p) {
    const a = p || {};
    let r = Array.isArray(a.playTypeRighe) ? a.playTypeRighe.slice(0, 4) : null;
    const testo = typeof a.playTypes === 'string' ? a.playTypes : '';
    if (!r) {
      r = testo ? testo.split(/\s*[·;\n]\s*/).slice(0, 4) : [];
    } else if (testo && r.filter(function (x) { return x && x.trim(); }).join(' · ') !== testo.trim()) {
      r = testo.split(/\s*[·;\n]\s*/).slice(0, 4);   // il file ha vinto: si riparte da li'
    }
    while (r.length < 4) r.push('');
    return r;
  }

  globale.impAvvPlayType = function (slotId, indice, i, valore) {
    const p = giocatrice(slotId, indice);
    if (!p) return;
    const r = righe(p);
    r[i] = valore;
    p.playTypeRighe = r;
    p.playTypes = r.filter(function (x) { return x && x.trim(); }).join(' · ');
    globale.scheduleAutosave && globale.scheduleAutosave();
  };


  /* Nel foglio di stile delle schede avversarie non c'e' una riga di
     separazione: me la scrivo qui, con gli stessi colori delle etichette
     accanto, invece di appoggiarmi a una classe che non esiste. */
  function separatore(testo) {
    return '<div style="grid-column:1/-1;display:flex;align-items:center;gap:6px;' +
      'margin:6px 0 2px;font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;' +
      'opacity:.62;font-weight:700;">' + esc(testo) +
      '<i style="flex:1;height:1px;background:currentColor;opacity:.35;"></i></div>';
  }

  function bloccoAvv(slotId, indice, p) {
    const a = (p && p.statAvanzate) || {};
    const r = righe(p);
    const q = function (s) { return String(s).replace(/'/g, "\\'"); };
    return '' +
      separatore(P('sp_av')) +
      '<div class="rp-stats">' +
        CAMPI.map(function (c) {
          return '<div><input type="text" placeholder="' + esc(c.esempio) + '"' +
            ' value="' + esc(a[c.chiave] == null ? '' : a[c.chiave]) + '"' +
            ' oninput="impAvvAvanzata(\'' + q(slotId) + '\',' + indice + ',\'' + c.chiave + '\',this.value)">' +
            '<span class="l">' + esc(c.sigla) + '</span></div>';
        }).join('') +
      '</div>' +
      separatore(P('col_pt')) +
      '<div class="rp-traits">' +
        r.map(function (testo, i) {
          return '<textarea rows="1" placeholder="' + (i < 2 ? 'ATT' : 'DIF') + ' …"' +
            ' oninput="impAvvPlayType(\'' + q(slotId) + '\',' + indice + ',' + i + ',this.value); crescoCampo(this)">' +
            esc(testo) + '</textarea>';
        }).join('') +
      '</div>';
  }

  /* Si avvolge la scheda che c'e' gia', come per il Personnel: si rilegge
     l'HTML come pezzo di pagina, si trova l'elenco delle caratteristiche e
     il blocco nuovo gli si mette subito sotto. Se qualcosa non torna si
     restituisce la scheda di prima, intatta: meglio senza avanzate che
     rotta. */
  function avvolgiAvversarie() {
    const vecchia = globale.avvPlayerBoxHtml;
    if (typeof vecchia !== 'function' || vecchia._impAvanzate) return;
    const nuova = function (slot, indice) {
      const html = vecchia.apply(this, arguments);
      try {
        if (!slot || !slot.id) return html;
        const box = D.createElement('div');
        box.innerHTML = html;
        const tratti = box.querySelector('.rp-traits');
        if (!tratti) return html;
        const p = (slot.players && slot.players[indice]) || {};
        tratti.insertAdjacentHTML('afterend', bloccoAvv(slot.id, indice, p));
        return box.innerHTML;
      } catch (e) { return html; }
    };
    nuova._impAvanzate = true;
    globale.avvPlayerBoxHtml = nuova;
  }

  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', avvolgiAvversarie);
  else avvolgiAvversarie();
})(typeof window !== 'undefined' ? window : globalThis);
