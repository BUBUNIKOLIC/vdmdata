(function(){
  if (document.getElementById("vdmLavagna")) return;
  var s = document.createElement("style"); s.id = "vdmStile"; s.textContent = "/* La lavagna del motore VDM dentro Italbasket Woman.\n   Tavolozza di VDM (quella del basket e del calcio), campo blu notte come la\n   \"hitech\" di Italbasket. Tutto sotto vl-: gli stili di Italbasket non entrano. */\n:root{\n  /* il campo come il playbook di carta */\n  --erba:#FFFFFF; --riga:#222831; --contorno:#1B1B1B; --numero:#12151C;\n  --casa:#2F6FD0; --avversario:#B23A34; --palla:#D9691C;\n  /* le azioni: quattro colori e basta (18/09) */\n  --taglio:#1F5FD6; --palleggio:#1E9E4A; --passaggio:#E3A600; --blocco:#D62828;\n  /* la finestra con i colori di Italbasket */\n  --vl-bg:#FFFFFF; --vl-panel:#F3F6FC; --vl-panel2:#FFFFFF; --vl-border:#D3DCEC;\n  --vl-text:#13213D; --vl-muted:#5E6E8C; --vl-accento:#1F6FEB; --vl-accento2:#1858C4;\n  --vl-glow:0 0 0 3px rgba(31,111,235,.18);\n}\nhtml.vl-aperta, html.vl-aperta body{overflow:hidden}\n#vdmLavagna[hidden]{display:none!important}\n.vl-overlay{\n  position:fixed;inset:0;z-index:100000;background:rgba(10,24,60,.55);\n  display:flex;align-items:stretch;justify-content:center;padding:14px;\n  font:14px/1.5 -apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Arial,sans-serif;color:var(--vl-text);\n  -webkit-font-smoothing:antialiased;text-align:left;letter-spacing:normal;text-transform:none;\n}\n.vl-overlay *, .vl-anteprima *{box-sizing:border-box}\n.vl-overlay [hidden], .vl-anteprima [hidden]{display:none!important}\n.vl-finestra{\n  width:min(1180px,100%);display:flex;flex-direction:column;min-height:0;\n  background:var(--vl-bg);border:1px solid var(--vl-border);border-radius:16px;overflow:hidden;\n  box-shadow:0 30px 80px rgba(10,24,60,.35);\n}\n.vl-testata{\n  display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:11px 16px;\n  background:#fff;\n  border-bottom:2px solid transparent;border-image:linear-gradient(90deg,#1F6FEB,#E7B457) 1;\n}\n.vl-marchio{font-size:12px;font-weight:800;letter-spacing:.08em;color:var(--vl-text);white-space:nowrap}\n.vl-marchio b{color:var(--vl-accento)}\n.vl-cancelletto{color:var(--vl-accento);font-weight:800;font-size:20px;margin-left:6px}\n.vl-overlay input, .vl-overlay select, .vl-overlay textarea{\n  font:inherit;color:var(--vl-text);background:var(--vl-bg);border:1px solid var(--vl-border);\n  border-radius:7px;padding:6px 9px;font-size:12.5px;margin:0;box-shadow:none;height:auto;width:auto;\n}\n.vl-overlay input:focus, .vl-overlay select:focus, .vl-overlay textarea:focus{outline:none;border-color:var(--vl-accento);box-shadow:var(--vl-glow)}\n.vl-overlay input[type=checkbox]{padding:0;accent-color:var(--vl-accento)}\n.vl-nome{font-size:17px!important;font-weight:800;flex:1 1 220px;min-width:160px;padding:6px 10px!important}\n.vl-campo-testo{max-width:220px}\n.vl-destra{margin-left:auto;display:flex;gap:8px}\n.vl-corpo{padding:14px 16px 20px;overflow:auto;min-height:0}\n\n.vl-btn{\n  background:var(--vl-panel2);border:1px solid var(--vl-border);border-radius:8px;\n  padding:7px 13px;cursor:pointer;font:700 12.5px/1.3 -apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Arial,sans-serif;\n  color:var(--vl-text);transition:border-color .15s, box-shadow .15s;white-space:nowrap;margin:0;\n  text-transform:none;letter-spacing:normal;\n}\n.vl-btn:hover:not(:disabled){border-color:var(--vl-accento);box-shadow:var(--vl-glow)}\n.vl-btn:disabled{opacity:.42;cursor:default}\n.vl-btn.vl-primario{background:var(--vl-accento);border-color:var(--vl-accento);color:#fff}\n.vl-btn.vl-primario:hover:not(:disabled){background:var(--vl-accento2)}\n.vl-btn.vl-piccolo{padding:5px 10px;font-size:12px}\n.vl-btn.vl-pericolo:hover:not(:disabled){border-color:#ef4444;box-shadow:0 0 0 1px rgba(239,68,68,.45)}\n.vl-btn.vl-attivo, .vl-btn[aria-pressed=\"true\"]{border-color:var(--vl-accento);color:var(--vl-accento);box-shadow:var(--vl-glow)}\n.vl-btn.vl-primario[aria-pressed=\"true\"]{color:#fff}\n\n.vl-barra{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0 0 10px}\n.vl-opz{display:flex;align-items:center;gap:5px;font-size:12.5px;color:var(--vl-muted);margin:0;font-weight:400}\n.vl-sep{width:1px;height:22px;background:var(--vl-border);margin:0 4px}\n.vl-stato{font-size:12px;color:var(--vl-muted);margin-left:auto;font-variant-numeric:tabular-nums}\n\n.vl-avviso{\n  margin:0 0 12px;padding:9px 12px;font-size:12.5px;color:var(--vl-text);line-height:1.5;\n  background:rgba(255,201,64,.08);border:1px solid rgba(255,201,64,.45);border-radius:10px;\n}\n.vl-avviso strong{color:#FFC940}\n.vl-guida{\n  display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 10px;padding:8px 12px;\n  font-size:12.5px;background:rgba(31,111,235,.07);border:1px dashed var(--vl-accento);border-radius:10px;\n}\n.vl-guida strong{color:var(--vl-accento)}\n.vl-guida .vl-btn:first-of-type{margin-left:auto}\n.vl-pannello{\n  display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 10px;padding:9px 12px;\n  background:var(--vl-panel);border:1px solid var(--vl-accento);border-radius:10px;\n}\n.vl-titolo{font-size:10.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--vl-accento)}\n.vl-gruppo{display:flex;gap:4px;align-items:center}\n.vl-dove{font-size:11.5px;color:var(--vl-muted)}\n.vl-pannello input{min-width:190px;flex:1 1 190px}\n.vl-pannello input.vl-corto{min-width:0;flex:0 0 64px;width:64px;text-align:center;font-weight:800}\n.vl-pannello textarea{min-width:240px;flex:2 1 260px;resize:vertical;font-family:inherit}\n.vl-colore{width:22px;height:22px;border-radius:6px;border:2px solid var(--vl-border);cursor:pointer;padding:0;margin:0}\n.vl-colore[aria-pressed=\"true\"]{border-color:#fff;box-shadow:0 0 0 2px var(--vl-accento)}\n\n.vl-cornice{position:relative;margin:0 0 12px}\n.vl-cornice.in-prospettiva{\n  overflow:hidden;border-radius:12px;border:1px solid var(--vl-border);\n  background:radial-gradient(ellipse at 50% 30%, #eef3fb 0%, #c9d5ea 80%);\n}\n.vl-palco{margin:0}\nsvg.vl-campo{width:100%;height:auto;display:block;border:1px solid var(--vl-border);border-radius:12px;\n  touch-action:none;user-select:none;-webkit-user-select:none;max-height:64vh;background:var(--erba)}\n.vl-cornice.in-prospettiva svg.vl-campo{border:0;border-radius:4px}\nsvg.vl-campo .pedina{cursor:grab}\nsvg.vl-campo .pedina.trascino{cursor:grabbing}\nsvg.vl-campo .zona{cursor:move}\nsvg.vl-campo .maniglia{cursor:nwse-resize}\nsvg.vl-campo .linea, svg.vl-campo .evidenza, svg.vl-campo .misura{cursor:pointer}\nsvg.vl-campo .scritta{cursor:move}\nsvg.vl-campo .scritta[data-attaccata=\"1\"]{cursor:pointer}\nsvg.vl-campo .maniglia-capo{cursor:grab}\nsvg.vl-campo.modo-zona, svg.vl-campo.modo-zona .zona, svg.vl-campo.modo-zona .pedina,\nsvg.vl-campo.modo-misura, svg.vl-campo.modo-misura .pedina{cursor:crosshair}\nsvg.vl-campo.modo-scritta{cursor:text}\nsvg.vl-campo.modo-scritta .pedina, svg.vl-campo.modo-linea .pedina{cursor:copy}\nsvg.vl-campo.modo-posa, svg.vl-campo.modo-posa .pedina{cursor:copy}\nsvg.vl-campo-piccolo{max-height:none;border-radius:8px;touch-action:auto}\n.vl-anteprima svg.vl-campo .pedina{cursor:default}\n\n.vl-cartello{\n  position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;\n  gap:14px;padding:6% 10%;text-align:center;border-radius:12px;\n  background:rgba(255,255,255,.97);border:1px solid var(--vl-border);\n}\n.vl-cartello-titolo{font-size:clamp(22px,3.4vw,42px);font-weight:800;color:var(--vl-text);line-height:1.15}\n.vl-cartello-testo{font-size:clamp(14px,1.6vw,19px);color:var(--vl-muted);line-height:1.55;white-space:pre-line;max-width:60ch}\n.vl-cartello-piccolo{gap:6px;padding:4% 6%;border-radius:8px}\n.vl-cartello-piccolo .vl-cartello-titolo{font-size:16px}\n.vl-cartello-piccolo .vl-cartello-testo{font-size:12px}\n\n.vl-fasi{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 10px}\n.vl-chip{display:flex;align-items:center;gap:6px;background:var(--vl-panel);border:1px solid var(--vl-border);border-radius:8px;padding:6px 9px;max-width:300px}\n.vl-chip.vl-on{border-color:var(--vl-accento);background:rgba(31,111,235,.08)}\n.vl-scegli{all:unset;cursor:pointer;font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--vl-text)}\n.vl-num{color:var(--vl-muted);font-variant-numeric:tabular-nums;font-size:11.5px}\n.vl-ha-cartello{color:var(--vl-accento);font-size:11px}\n.vl-elimina{all:unset;cursor:pointer;color:var(--vl-muted);padding:0 2px;font-size:15px}\n.vl-elimina:hover{color:var(--avversario)}\n.vl-riga-cartello{margin:0 0 12px}\n.vl-riga-cartello .vl-pannello{margin:0}\n\n.vl-azioni{gap:6px;padding:6px;background:var(--vl-panel);border:1px solid var(--vl-border);border-radius:11px}\n.vl-btn.vl-azione{display:flex;align-items:center;gap:7px;padding:7px 12px 7px 9px;font-size:13px}\n.vl-btn.vl-azione svg{width:34px;height:14px;flex:0 0 auto;color:var(--vl-muted)}\n.vl-btn.vl-azione[data-strumento=\"taglio\"] svg{color:var(--taglio)}\n.vl-btn.vl-azione[data-strumento=\"palleggio\"] svg{color:var(--palleggio)}\n.vl-btn.vl-azione[data-strumento=\"blocco\"] svg{color:var(--blocco)}\n.vl-btn.vl-azione[data-strumento=\"passaggio\"] svg, .vl-btn.vl-azione[data-strumento=\"tiro\"] svg{color:var(--passaggio)}\n.vl-btn.vl-azione.vl-attivo{background:rgba(31,111,235,.1)}\n.vl-btn.vl-azione.vl-attivo svg{color:var(--vl-accento)}\n.vl-barra-disegno .vl-btn{font-size:12px;padding:5px 10px}\nsvg.vl-campo.modo-taglio .pedina, svg.vl-campo.modo-palleggio .pedina, svg.vl-campo.modo-blocco .pedina{cursor:grab}\nsvg.vl-campo.modo-passaggio .pedina, svg.vl-campo.modo-tiro .pedina{cursor:pointer}\nsvg.vl-campo.modo-passaggio .pedina[data-lato=\"casa\"]:hover circle:first-child, svg.vl-campo.modo-tiro .pedina[data-lato=\"casa\"]:hover circle:first-child{fill:#FFD84D;fill-opacity:.45}\n.vl-aiuto{font-size:12px;color:var(--vl-muted);margin:6px 0 12px;max-width:95ch;line-height:1.55}\n.vl-aiuto b{color:var(--vl-text)}\n.vl-testi{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.vl-testi textarea{width:100%!important;resize:vertical;font-family:inherit}\n@media (max-width:700px){ .vl-testi{grid-template-columns:1fr} .vl-overlay{padding:0} .vl-finestra{border-radius:0} }\n\n.vl-modale-sfondo{position:fixed;inset:0;z-index:100001;display:none;align-items:center;justify-content:center;background:rgba(10,24,60,.45)}\n.vl-modale-sfondo.show{display:flex}\n.vl-modale{width:min(440px,calc(100vw - 40px));background:var(--vl-panel);border:1px solid var(--vl-border);border-radius:14px;padding:22px 22px 18px;box-shadow:0 30px 60px rgba(0,0,0,.5)}\n.vl-modale h3{margin:0 0 12px;font-size:16px;color:var(--vl-text)}\n.vl-modale p{margin:0 0 14px;color:var(--vl-muted);font-size:14px;line-height:1.55;white-space:pre-line}\n.vl-modale input{width:100%!important;padding:9px 11px!important;font-size:14px!important;margin-bottom:16px!important}\n.vl-azioni{display:flex;justify-content:flex-end;gap:8px}\n.vl-scelte{display:flex;flex-direction:column;gap:7px;margin:0 0 14px}\n\n/* ---- nella card del Playbook ---- */\n.vdm-anteprima{margin-bottom:8px}\n.vl-anteprima{background:var(--vl-bg);border:1px solid var(--vl-border);border-radius:10px;padding:6px;color:var(--vl-text);\n  font:13px/1.4 -apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Arial,sans-serif}\n.vl-anteprima .vl-cornice{margin:0}\n.vl-anteprima-barra{display:flex;align-items:center;gap:8px;padding:6px 2px 0}\n.vl-anteprima-stato{font-size:11.5px;color:var(--vl-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1 1 auto;min-width:0}\n.vl-anteprima-marchio{font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--vl-accento);white-space:nowrap}\n.vl-anteprima .vl-btn{font-size:11.5px;padding:4px 9px}\n.btn.vdm-btn-nuovo{background:linear-gradient(90deg,#00b8d4,#2F80ED)!important;border-color:transparent!important;color:#fff!important}\n.btn.vdm-btn-principale{border-color:#00b8d4!important;color:#00829a!important}\nbody.cyborg-mode .btn.vdm-btn-principale{color:#00e5ff!important}\n\n/* Italbasket mette in maiuscolo campi e segnaposto e allinea le barre: qui no */\n.vl-overlay input, .vl-overlay select, .vl-overlay textarea, .vl-overlay option,\n.vl-overlay input::placeholder, .vl-overlay textarea::placeholder, .vl-overlay button, .vl-overlay label{\n  text-transform:none!important;letter-spacing:normal!important;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Arial,sans-serif!important;\n  background-image:none!important;\n}\n.vl-overlay .vl-barra, .vl-overlay .vl-azioni{justify-content:flex-start!important}\n.vl-anteprima button{text-transform:none!important;letter-spacing:normal!important;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Arial,sans-serif!important}\n\n/* ruotare il campo in 3D */\n.vl-giro{ display:inline-flex !important; align-items:center; gap:4px; }\n.vl-giro[hidden]{ display:none !important; }\n.vl-giro input[type=range]{ width:110px; }\n.vl-mini{ padding:2px 7px !important; min-width:0 !important; font-size:13px !important; }\n\n/* Il «Playbook animato 3D» dentro VDM Basketball Coach. Tutto sotto vdm3d-:\n   gli stili dell'app non cambiano. */\n.vdm3d-testa{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:6px}\n.vdm3d-testa h2{margin:0}\n.vdm3d-spiega{margin:0 0 12px}\n.vdm3d-vuoto{padding:18px;border:1px dashed rgba(127,140,160,.5);border-radius:10px;text-align:center;opacity:.85}\n.vdm3d-griglia{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px}\n.vdm3d-gioco{border:1px solid rgba(127,140,160,.35);border-radius:12px;padding:10px;display:flex;flex-direction:column;gap:8px}\n.vdm3d-nome{font-size:14px;line-height:1.3}\n.vdm3d-info{font-size:11px;opacity:.7}\n.vdm3d-tag{font-size:11px;font-weight:700;padding:1px 6px;border-radius:6px;white-space:nowrap}\n.vdm3d-att{background:rgba(31,111,235,.14);color:#1F6FEB}\n.vdm3d-dif{background:rgba(214,40,40,.14);color:#D62828}\n.vdm3d-bottoni{display:flex;gap:6px;flex-wrap:wrap}\n.btn.vdm3d-vai,.btn.vdm3d-anima{background:linear-gradient(90deg,#00b8d4,#2F80ED)!important;border-color:transparent!important;color:#fff!important}\n/* nella lavagna di VDM Basketball la squadra e' gia' quella aperta */\n#vdmLavagna #vlSquadra{display:none!important}\n";
  document.head.appendChild(s);
  var d = document.createElement("div"); d.innerHTML = "\n<div id=\"vdmLavagna\" class=\"vl-overlay\" hidden>\n  <div class=\"vl-finestra\" role=\"dialog\" aria-label=\"Gioco animato\">\n    <header class=\"vl-testata\">\n      <span class=\"vl-marchio\">VDM <b>MOTORE</b></span>\n      <span class=\"vl-cancelletto\">#</span>\n      <input id=\"vlNome\" class=\"vl-nome\" placeholder=\"# PLAY\" maxlength=\"80\">\n      <select id=\"vlSezione\" class=\"vl-campo-testo\" title=\"Sezione del playbook\"></select>\n      <input id=\"vlSquadra\" class=\"vl-campo-testo\" list=\"vlSquadre\" placeholder=\"Squadra (opzionale)\" maxlength=\"60\">\n      <datalist id=\"vlSquadre\"></datalist>\n      <div class=\"vl-destra\">\n        <button type=\"button\" id=\"vlChiudi\" class=\"vl-btn\">Chiudi</button>\n        <button type=\"button\" id=\"vlSalva\" class=\"vl-btn vl-primario\">💾 Salva nel playbook</button>\n      </div>\n    </header>\n\n    <div class=\"vl-corpo\">\n      <div id=\"vlAvvisoConvertito\" class=\"vl-avviso\" hidden data-tr-html>\n        <strong>Ricostruito dal disegno originale.</strong>\n        Le posizioni vengono dallo schema disegnato a mano, i movimenti dalle frecce:\n        controlla le fasi e sistema quello che non torna, poi salva.\n        Il disegno originale resta: si puo' sempre tornare indietro dalla card.\n      </div>\n\n      <div class=\"vl-barra\">\n        <button type=\"button\" id=\"vlPlay\" class=\"vl-btn vl-primario\">▶ Riproduci</button>\n        <button type=\"button\" id=\"vlAggiungiFase\" class=\"vl-btn\" title=\"Il tempo dopo parte da dove sono arrivate\">Tempo dopo ▸</button>\n        <button type=\"button\" id=\"vlVideo\" class=\"vl-btn\">🎥 Video</button>\n        <label class=\"vl-opz\">Velocità\n          <select id=\"vlVelocita\">\n            <option value=\"3800\">Lenta</option>\n            <option value=\"2600\" selected>Normale</option>\n            <option value=\"1700\">Veloce</option>\n          </select>\n        </label>\n        <label class=\"vl-opz\"><input type=\"checkbox\" id=\"vlCiclo\"> ciclo</label>\n        <span class=\"vl-sep\"></span>\n        <label class=\"vl-opz\">Campo\n          <select id=\"vlModo\">\n            <option value=\"mezzo\">Metà campo</option>\n            <option value=\"intero\">Campo intero</option>\n          </select>\n        </label>\n        <label class=\"vl-opz\">Vista\n          <select id=\"vlVista\">\n            <option value=\"0\">Dall'alto</option>\n            <option value=\"40\">3D</option>\n            <option value=\"58\">3D forte</option>\n          </select>\n        </label>\n        <label class=\"vl-opz vl-giro\" id=\"vlGiroBox\" hidden title=\"Gira il campo per guardarlo da un altro lato\">Ruota\n          <button type=\"button\" class=\"vl-btn vl-mini\" id=\"vlGiroSx\" title=\"Gira a sinistra\">⟲</button>\n          <input type=\"range\" id=\"vlGiroVista\" min=\"-180\" max=\"180\" step=\"5\" value=\"0\">\n          <button type=\"button\" class=\"vl-btn vl-mini\" id=\"vlGiroDx\" title=\"Gira a destra\">⟳</button>\n          <button type=\"button\" class=\"vl-btn vl-mini\" id=\"vlGiroZero\" title=\"Torna di fronte\">↺ 0°</button>\n        </label>\n        <label class=\"vl-opz\"><input type=\"checkbox\" id=\"vlDifesa\"> difesa</label>\n        <label class=\"vl-opz\" title=\"Spostando una giocatrice, si sposta anche nelle fasi dopo dove non l'hai ancora mossa\"><input type=\"checkbox\" id=\"vlPropaga\" checked> propaga</label>\n        <span id=\"vlStato\" class=\"vl-stato\"></span>\n      </div>\n\n      <div class=\"vl-barra vl-azioni\" id=\"vlAzioni\" role=\"toolbar\" aria-label=\"Azioni\">\n        <button type=\"button\" class=\"vl-btn vl-azione\" data-strumento=\"normale\" title=\"Sposta giocatrici e palla (Esc)\">\n          <svg viewBox=\"0 0 34 14\" aria-hidden=\"true\"><path d=\"M17 1v12M11 7h12M17 1l-2.5 2.5M17 1l2.5 2.5M17 13l-2.5-2.5M17 13l2.5-2.5M11 7l2.5-2.5M11 7l2.5 2.5M23 7l-2.5-2.5M23 7l-2.5 2.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\"/></svg>\n          Sposta</button>\n        <button type=\"button\" class=\"vl-btn vl-azione\" data-strumento=\"taglio\" title=\"Taglio: trascina la giocatrice dove taglia\">\n          <svg viewBox=\"0 0 34 14\" aria-hidden=\"true\"><line x1=\"2\" y1=\"7\" x2=\"25\" y2=\"7\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M23 2.5L32 7l-9 4.5z\" fill=\"currentColor\"/></svg>\n          Taglio</button>\n        <button type=\"button\" class=\"vl-btn vl-azione\" data-strumento=\"palleggio\" title=\"Palleggio: trascina chi ha la palla\">\n          <svg viewBox=\"0 0 34 14\" aria-hidden=\"true\"><polyline points=\"2,7 5,3 9,11 13,3 17,11 21,3 24,7\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M23 2.5L32 7l-9 4.5z\" fill=\"currentColor\"/></svg>\n          Palleggio</button>\n        <button type=\"button\" class=\"vl-btn vl-azione\" data-strumento=\"blocco\" title=\"Blocco: trascina chi va a bloccare, oppure clicca chi blocca da ferma\">\n          <svg viewBox=\"0 0 34 14\" aria-hidden=\"true\"><line x1=\"2\" y1=\"7\" x2=\"29\" y2=\"7\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"30\" y1=\"1\" x2=\"30\" y2=\"13\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\"/></svg>\n          Blocco</button>\n        <button type=\"button\" class=\"vl-btn vl-azione\" data-strumento=\"passaggio\" title=\"Passaggio: clicca chi riceve la palla (più clic = più passaggi)\">\n          <svg viewBox=\"0 0 34 14\" aria-hidden=\"true\"><line x1=\"2\" y1=\"7\" x2=\"25\" y2=\"7\" stroke=\"currentColor\" stroke-width=\"2\" stroke-dasharray=\"3.5 2.5\"/><path d=\"M23 2.5L32 7l-9 4.5z\" fill=\"currentColor\"/></svg>\n          Passaggio</button>\n        <button type=\"button\" class=\"vl-btn vl-azione\" data-strumento=\"palla\" title=\"Palla: clic su un numero per cerchiarlo (ha la palla)\">\n          <svg viewBox=\"0 0 34 14\" aria-hidden=\"true\"><circle cx=\"17\" cy=\"7\" r=\"6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"/><text x=\"17\" y=\"10.5\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"800\" fill=\"currentColor\">1</text></svg>\n          Palla</button>\n        <button type=\"button\" class=\"vl-btn vl-azione\" data-strumento=\"tiro\" title=\"Tiro: clicca chi tira\">\n          <svg viewBox=\"0 0 34 14\" aria-hidden=\"true\"><line x1=\"2\" y1=\"7\" x2=\"20\" y2=\"7\" stroke=\"currentColor\" stroke-width=\"2\" stroke-dasharray=\"3.5 2.5\"/><circle cx=\"27\" cy=\"7\" r=\"5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"/><path d=\"M22 7h10M27 2v10\" stroke=\"currentColor\" stroke-width=\"1\"/></svg>\n          Tiro</button>\n        <button type=\"button\" class=\"vl-btn vl-azione\" data-strumento=\"gomma\" title=\"Gomma: clic su una giocatrice per togliere le sue azioni in questo tempo\">\n          <svg viewBox=\"0 0 34 14\" aria-hidden=\"true\"><path d=\"M10 11 L18 3 L24 9 L18 13 H12 Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linejoin=\"round\"/><line x1=\"14\" y1=\"7\" x2=\"20\" y2=\"13\" stroke=\"currentColor\" stroke-width=\"1.4\"/></svg>\n          Gomma</button>\n      </div>\n\n      <div class=\"vl-barra vl-barra-disegno\">\n        <button type=\"button\" id=\"vlStrumentoZona\" class=\"vl-btn vl-strumento\" title=\"Trascina sul campo per disegnare una zona\">▭ Zona</button>\n        <button type=\"button\" id=\"vlStrumentoLinea\" class=\"vl-btn vl-strumento\" title=\"Unisci giocatrici con una linea\">╱ Linea</button>\n        <button type=\"button\" id=\"vlStrumentoEvidenza\" class=\"vl-btn vl-strumento\" title=\"Evidenzia una o più giocatrici\">◎ Evidenzia</button>\n        <button type=\"button\" id=\"vlStrumentoScritta\" class=\"vl-btn vl-strumento\" title=\"Scritta sul campo o sopra una giocatrice\">T Scritta</button>\n        <button type=\"button\" id=\"vlStrumentoMisura\" class=\"vl-btn vl-strumento\" title=\"Distanza in metri\">↔ Misura</button>\n        <select id=\"vlAggiungi\" class=\"vl-select\" title=\"Aggiungi sul campo\">\n          <option value=\"\">+ Aggiungi…</option>\n        </select>\n        <button type=\"button\" id=\"vlAnnulla\" class=\"vl-btn\" title=\"Annulla (⌘Z)\">↶ Annulla</button>\n      </div>\n\n      <div id=\"vlGuida\" class=\"vl-guida\" hidden>\n        <span id=\"vlGuidaTesto\"></span>\n        <button type=\"button\" id=\"vlFineScelta\" class=\"vl-btn vl-piccolo\">Fine</button>\n        <button type=\"button\" id=\"vlAnnullaScelta\" class=\"vl-btn vl-piccolo\">Annulla</button>\n      </div>\n\n      <div id=\"vlAvvisoPartenza\" class=\"vl-pannello\" hidden>\n        <span class=\"vl-titolo\">Passaggio nella partenza?</span>\n        <span class=\"vl-dove\">La fase 1 è la posizione di partenza: se questo è il primo passaggio, va in una fase nuova.</span>\n        <button type=\"button\" id=\"vlPassaggioInFaseNuova\" class=\"vl-btn vl-piccolo vl-primario\">Fallo diventare un passaggio</button>\n        <button type=\"button\" id=\"vlLasciaPartenza\" class=\"vl-btn vl-piccolo\">Va bene così</button>\n      </div>\n\n      <div id=\"vlPannelloOggetto\" class=\"vl-pannello\" hidden>\n        <span class=\"vl-titolo\" id=\"vlTitoloOggetto\">Giocatrice</span>\n        <input id=\"vlNumeroOggetto\" class=\"vl-corto\" placeholder=\"n.\" maxlength=\"3\" title=\"Numero o sigla (es. 4, X2)\">\n        <button type=\"button\" id=\"vlDaiPalla\" class=\"vl-btn vl-piccolo\" title=\"All'inizio di questo tempo la palla ce l'ha lei\">◯ Dai la palla</button>\n        <label class=\"vl-opz\" id=\"vlRigaAzione\">Azione in questa fase\n          <select id=\"vlAzione\">\n            <option value=\"\">automatica</option>\n            <option value=\"taglio\">taglio</option>\n            <option value=\"palleggio\">palleggio</option>\n            <option value=\"blocco\">blocco</option>\n          </select>\n        </label>\n        <button type=\"button\" id=\"vlTogliTappe\" class=\"vl-btn vl-piccolo\">Togli i passaggi intermedi</button>\n        <button type=\"button\" id=\"vlRuotaOggetto\" class=\"vl-btn vl-piccolo\">↻ Ruota</button>\n        <button type=\"button\" id=\"vlTogliOggetto\" class=\"vl-btn vl-piccolo\">Togli da questa fase in poi</button>\n        <button type=\"button\" id=\"vlEliminaOggetto\" class=\"vl-btn vl-piccolo vl-pericolo\">Elimina da tutte le fasi</button>\n      </div>\n\n      <div id=\"vlPannelloZona\" class=\"vl-pannello\" hidden>\n        <span class=\"vl-titolo\">Zona</span>\n        <span class=\"vl-gruppo\" id=\"vlStiliZona\">\n          <button type=\"button\" class=\"vl-btn vl-piccolo\" data-stile=\"piena\">Piena</button>\n          <button type=\"button\" class=\"vl-btn vl-piccolo\" data-stile=\"rigata\">Rigata</button>\n          <button type=\"button\" class=\"vl-btn vl-piccolo\" data-stile=\"contorno\">Contorno</button>\n        </span>\n        <span class=\"vl-gruppo\" id=\"vlColoriZona\"></span>\n        <input id=\"vlEtichettaZona\" placeholder=\"Etichetta (es. Lato debole)\" maxlength=\"40\">\n        <button type=\"button\" id=\"vlTogliZona\" class=\"vl-btn vl-piccolo\">Togli da questa fase in poi</button>\n        <button type=\"button\" id=\"vlEliminaZona\" class=\"vl-btn vl-piccolo vl-pericolo\">Elimina</button>\n      </div>\n\n      <div id=\"vlPannelloLinea\" class=\"vl-pannello\" hidden>\n        <span class=\"vl-titolo\">Linea</span>\n        <span class=\"vl-gruppo\" id=\"vlStiliLinea\">\n          <button type=\"button\" class=\"vl-btn vl-piccolo\" data-stile=\"continua\">Continua</button>\n          <button type=\"button\" class=\"vl-btn vl-piccolo\" data-stile=\"tratteggiata\">Tratteggiata</button>\n        </span>\n        <span class=\"vl-gruppo\" id=\"vlColoriLinea\"></span>\n        <label class=\"vl-opz\"><input type=\"checkbox\" id=\"vlChiusaLinea\"> forma chiusa</label>\n        <button type=\"button\" id=\"vlTogliLinea\" class=\"vl-btn vl-piccolo\">Togli da questa fase in poi</button>\n        <button type=\"button\" id=\"vlEliminaLinea\" class=\"vl-btn vl-piccolo vl-pericolo\">Elimina</button>\n      </div>\n\n      <div id=\"vlPannelloEvidenza\" class=\"vl-pannello\" hidden>\n        <span class=\"vl-titolo\">Evidenza</span>\n        <span class=\"vl-gruppo\" id=\"vlStiliEvidenza\">\n          <button type=\"button\" class=\"vl-btn vl-piccolo\" data-stile=\"anello\">Anello</button>\n          <button type=\"button\" class=\"vl-btn vl-piccolo\" data-stile=\"luce\">Luce</button>\n          <button type=\"button\" class=\"vl-btn vl-piccolo\" data-stile=\"quadrato\">Quadrato</button>\n          <button type=\"button\" class=\"vl-btn vl-piccolo\" data-stile=\"ellisse\">Ellisse</button>\n        </span>\n        <span class=\"vl-gruppo\" id=\"vlColoriEvidenza\"></span>\n        <button type=\"button\" id=\"vlTogliEvidenza\" class=\"vl-btn vl-piccolo\">Togli da questa fase in poi</button>\n        <button type=\"button\" id=\"vlEliminaEvidenza\" class=\"vl-btn vl-piccolo vl-pericolo\">Elimina</button>\n      </div>\n\n      <div id=\"vlPannelloScritta\" class=\"vl-pannello\" hidden>\n        <span class=\"vl-titolo\">Scritta</span>\n        <input id=\"vlTestoScritta\" placeholder=\"Testo\" maxlength=\"60\">\n        <span class=\"vl-gruppo\" id=\"vlStiliScritta\">\n          <button type=\"button\" class=\"vl-btn vl-piccolo\" data-stile=\"fumetto\">Fumetto</button>\n          <button type=\"button\" class=\"vl-btn vl-piccolo\" data-stile=\"grande\">Grande</button>\n          <button type=\"button\" class=\"vl-btn vl-piccolo\" data-stile=\"semplice\">Semplice</button>\n        </span>\n        <span class=\"vl-gruppo\" id=\"vlColoriScritta\"></span>\n        <span class=\"vl-dove\" id=\"vlDoveScritta\"></span>\n        <button type=\"button\" id=\"vlTogliScritta\" class=\"vl-btn vl-piccolo\">Togli da questa fase in poi</button>\n        <button type=\"button\" id=\"vlEliminaScritta\" class=\"vl-btn vl-piccolo vl-pericolo\">Elimina</button>\n      </div>\n\n      <div id=\"vlPannelloMisura\" class=\"vl-pannello\" hidden>\n        <span class=\"vl-titolo\">Misura</span>\n        <span class=\"vl-dove\" id=\"vlInfoMisura\"></span>\n        <input id=\"vlTestoMisura\" placeholder=\"Nota (es. distanza fra le linee)\" maxlength=\"40\">\n        <span class=\"vl-gruppo\" id=\"vlStiliMisura\">\n          <button type=\"button\" class=\"vl-btn vl-piccolo\" data-stile=\"continua\">Continua</button>\n          <button type=\"button\" class=\"vl-btn vl-piccolo\" data-stile=\"tratteggiata\">Tratteggiata</button>\n        </span>\n        <span class=\"vl-gruppo\" id=\"vlColoriMisura\"></span>\n        <button type=\"button\" id=\"vlTogliMisura\" class=\"vl-btn vl-piccolo\">Togli da questa fase in poi</button>\n        <button type=\"button\" id=\"vlEliminaMisura\" class=\"vl-btn vl-piccolo vl-pericolo\">Elimina</button>\n      </div>\n\n      <div class=\"vl-cornice cornice-campo\">\n        <div class=\"palco vl-palco\"><svg id=\"vlCampo\" class=\"vl-campo\"></svg></div>\n        <div id=\"vlCartello\" class=\"vl-cartello\" hidden>\n          <div id=\"vlCartelloTitolo\" class=\"vl-cartello-titolo\"></div>\n          <div id=\"vlCartelloTesto\" class=\"vl-cartello-testo\"></div>\n        </div>\n      </div>\n\n      <div id=\"vlFasi\" class=\"vl-fasi\"></div>\n\n      <div class=\"vl-riga-cartello\">\n        <button type=\"button\" id=\"vlAggiungiCartello\" class=\"vl-btn vl-piccolo\">▣ Aggiungi un cartello prima di questa fase</button>\n        <div id=\"vlPannelloCartello\" class=\"vl-pannello\" hidden>\n          <span class=\"vl-titolo\" id=\"vlTitoloPannelloCartello\">Cartello</span>\n          <input id=\"vlCartelloTitoloInput\" placeholder=\"Titolo (es. Pick and roll centrale)\" maxlength=\"60\">\n          <textarea id=\"vlCartelloTestoInput\" rows=\"2\" placeholder=\"Cosa guardare in questa fase\" maxlength=\"300\"></textarea>\n          <button type=\"button\" id=\"vlAnteprimaCartello\" class=\"vl-btn vl-piccolo\">Anteprima</button>\n          <button type=\"button\" id=\"vlTogliCartello\" class=\"vl-btn vl-piccolo vl-pericolo\">Togli</button>\n        </div>\n      </div>\n\n      <p class=\"vl-aiuto\" data-tr-html>\n        Come sul playbook: le giocatrici stanno dove partono e sopra disegni i simboli. Il <b>numero cerchiato</b> ha la palla:\n        può palleggiare o passare. Le altre tagliano o bloccano. Dai simboli il motore ricava dove arrivano e lo anima,\n        col ritmo del gioco: prima il blocco, poi chi lo usa, poi il passaggio.\n        <b>Tempo dopo ▸</b> riparte da dove sono arrivate. <b>Sposta</b> sistema le posizioni di partenza.\n        Spazio riproduce, ← → cambiano tempo, ⌘Z annulla, Esc torna a Sposta.\n      </p>\n\n      <div class=\"vl-testi\">\n        <textarea id=\"vlDescrizione\" rows=\"2\" placeholder=\"Descrizione\"></textarea>\n        <textarea id=\"vlNote\" rows=\"2\" placeholder=\"Note\"></textarea>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"finestra\" class=\"vl-modale-sfondo\">\n    <div class=\"vl-modale\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"finestraTitolo\">\n      <h3 id=\"finestraTitolo\"></h3>\n      <p id=\"finestraMessaggio\"></p>\n      <input id=\"finestraCampo\" type=\"text\" autocomplete=\"off\">\n      <div id=\"finestraScelte\" class=\"vl-scelte\" hidden></div>\n      <div class=\"vl-azioni\">\n        <button type=\"button\" id=\"finestraAnnulla\" class=\"vl-btn\">Annulla</button>\n        <button type=\"button\" id=\"finestraOk\" class=\"vl-btn vl-primario\">OK</button>\n      </div>\n    </div>\n  </div>\n</div>\n";
  while (d.firstChild) document.body.appendChild(d.firstChild);
})();
/* Motore VDM — Playbook animato 3D per VDM Basketball Coach. Generato da strumenti/inietta-vdm-basket.js (VDM SOCCER COACH) il 2026-09-18. Non modificare qui: i sorgenti stanno in VDM SOCCER COACH. */
(function(){
"use strict";
/* ---- src/renderer/core/id.js ---- */
const __vdm_src_renderer_core_id_js = (function(){
/* Identificatori stabili. I numeri di maglia cambiano a stagione in corso:
   se un diagramma dicesse "il 7", cambiare il 7 rovinerebbe duecento
   diagrammi. Qui ogni cosa ha un id che non cambia mai. */
function id(prefisso){
  return prefisso + '_' + Math.random().toString(36).slice(2, 8) +
         Date.now().toString(36).slice(-4);
}

return { id };
})();
/* ---- src/renderer/core/modello.js ---- */
const __vdm_src_renderer_core_modello_js = (function(){
/* Il modello dei dati. Neutro rispetto allo sport: riceve il modulo sport
 * e non sa altro.
 *
 * Come nel basket, il lavoro e' organizzato in Lega -> Squadra -> sezioni.
 * Un file .vdmcalcio contiene tutto il lavoro: le leghe, le loro squadre,
 * e per ogni squadra rosa, modulo e playbook. */
const { id } = __vdm_src_renderer_core_id_js;

/* Versione del formato: un intero, non "1.0.3".
 * 1 = un solo progetto squadra (16/09, primi giorni)
 * 2 = leghe e squadre, come il basket
 * 3 = la fase e' un ELENCO DI ELEMENTI, non piu' 11 posizioni in fila
 * 4 = la squadra ha rosa con le schede, squadre avversarie con scouting,
 *     sedute, calendario, presentazioni e video (18/09) */
const FORMATO = 4;

function copia(o){ return JSON.parse(JSON.stringify(o)); }

function posizioni(lista){
  return lista.map(function(p){ return {x:p.x, y:p.y}; });
}

/* La palla appoggiata alla spalla di chi la porta. */
function spalla(p){ return {x:p.x + 1.9, y:p.y - 1.9}; }

/* ---- elementi ----
 * Una fase e' un elenco di cose sul campo, ognuna con il suo id: giocatori,
 * palla, e piu' avanti zone, linee, scritte, attrezzi. L'id e' lo stesso in
 * tutte le fasi di un'esercitazione: e' cosi' che si sa chi si e' mosso,
 * dove disegnare la freccia e cosa far scorrere nell'animazione.
 * Con 11 posizioni in fila non si potevano avere un 3 contro 3, un cono,
 * una zona o un giocatore in piu' in una sola fase. */

/* Il giocatore sul campo punta alla sua scheda in rosa (rif): numero e ruolo
 * stanno li', cosi' cambiare il numero di maglia non tocca i disegni. */
function giocatoreDa(scheda, squadraLato, pos){
  return { id: scheda.id, tipo: 'giocatore', squadra: squadraLato, rif: scheda.id, x: pos.x, y: pos.y };
}

/* Le zone: rettangoli in metri, sotto le pedine. Tre stili visti nei video
 * di analisi: piena (lo spazio evidenziato), rigata (la zona da occupare o
 * da chiudere), solo contorno (l'area dell'esercitazione). L'etichetta e'
 * quella che nei video dice "7 contro 6" o "spazio aperto". */
const COLORI_ZONA = {
  giallo: '#FFD400', ciano: '#00E5FF', rosso: '#EF4444', verde: '#22C55E', bianco: '#FFFFFF'
};
const STILI_ZONA = ['piena', 'rigata', 'contorno'];

function zonaNuova(x, y, w, h, stile, colore){
  return {
    id: id('zona'), tipo: 'zona',
    x: x, y: y, w: w, h: h,
    stile: STILI_ZONA.indexOf(stile) >= 0 ? stile : 'rigata',
    colore: COLORI_ZONA[colore] ? colore : 'giallo',
    etichetta: ''
  };
}

/* Le linee fra giocatori: la linea di reparto, la forma della squadra, il
 * triangolo. Non hanno una posizione loro: passano per i giocatori che
 * uniscono, nell'ordine in cui sono stati cliccati, e quindi li seguono
 * quando si spostano e scorrono con loro nell'animazione. */
const STILI_LINEA = ['continua', 'tratteggiata'];

function lineaNuova(idGiocatori, chiusa){
  return {
    id: id('linea'), tipo: 'linea',
    giocatori: idGiocatori.slice(),
    chiusa: !!chiusa && idGiocatori.length >= 3,
    stile: 'continua',
    colore: 'bianco'
  };
}

/* Evidenziare: uno o piu' giocatori, con quattro stili visti nei video.
 * anello   = cerchio colorato sotto il giocatore (De Zerbi)
 * luce     = il fascio dall'alto sul giocatore chiave (4-2-3-1)
 * quadrato = cornice colorata, per distinguere i reparti (La Vida Futbol)
 * ellisse  = un solo contorno attorno alla coppia o al gruppo (il duello)
 * Come le linee, segue i giocatori quando si spostano. */
const STILI_EVIDENZA = ['anello', 'luce', 'quadrato', 'ellisse'];

function evidenzaNuova(idGiocatori){
  return {
    id: id('evidenza'), tipo: 'evidenza',
    giocatori: idGiocatori.slice(),
    stile: idGiocatori.length >= 2 ? 'ellisse' : 'anello',
    colore: idGiocatori.length >= 2 ? 'rosso' : 'giallo'
  };
}

/* Le scritte sul campo, tre stili dai video:
 * fumetto  = riquadro scuro, per spiegare ("aspetta la pressione")
 * grande   = il modulo scritto enorme ("3-2-5"), senza riquadro
 * semplice = testo colorato, per le legende dei reparti
 * Una scritta sta ferma in un punto del campo (x, y), oppure e' attaccata a
 * un giocatore (giocatore) e gli sta sopra seguendolo, come i nomi. */
const STILI_SCRITTA = ['fumetto', 'grande', 'semplice'];

function scrittaNuova(dove){
  const s = { id: id('scritta'), tipo: 'scritta', testo: 'Scritta', stile: 'fumetto', colore: 'bianco' };
  if (dove && dove.giocatore) s.giocatore = dove.giocatore;
  else { s.x = dove.x; s.y = dove.y; }
  return s;
}

/* Il cartello: titolo e qualche riga di testo mostrati PRIMA di una fase,
 * come i capitoli dei video di analisi ("Uscita dal portiere", "Punti di
 * forza"). Sta dentro la fase (fase.cartello), cosi' non disturba frecce,
 * animazione e propaga, che lavorano solo fra fasi vere. */
function haCartello(fase){
  return !!(fase && fase.cartello && (String(fase.cartello.titolo || '').trim() || String(fase.cartello.testo || '').trim()));
}

/* il tempo per leggerlo: un minimo, piu' un tanto a lettera, con un tetto */
function durataCartello(fase){
  if (!haCartello(fase)) return 0;
  const lettere = String(fase.cartello.titolo || '').length + String(fase.cartello.testo || '').length;
  return Math.min(7000, 2200 + lettere * 45);
}

/* La misura: una distanza in metri fra due capi. Ogni capo e' un punto del
 * campo {x, y} oppure un giocatore {giocatore}: attaccata ai giocatori, la
 * misura cambia quando si spostano (la distanza fra due reparti, la corsa
 * del terzino). Le posizioni sono gia' in metri: il numero e' vero. */
function misuraNuova(da, a){
  const capo = function(c){ return c.giocatore ? {giocatore: c.giocatore} : {x: c.x, y: c.y}; };
  return { id: id('misura'), tipo: 'misura', capi: [capo(da), capo(a)], stile: 'continua', colore: 'bianco', testo: '' };
}

/* dove sta un capo, dati gli elementi della fase */
function posizioneCapo(capo, fase){
  if (!capo) return null;
  if (capo.giocatore){
    const g = elementoDi(fase, capo.giocatore);
    return g ? {x: g.x, y: g.y} : null;
  }
  return typeof capo.x === 'number' ? {x: capo.x, y: capo.y} : null;
}

function lunghezzaMisura(e, fase){
  const a = posizioneCapo(e.capi && e.capi[0], fase), b = posizioneCapo(e.capi && e.capi[1], fase);
  return a && b ? Math.hypot(b.x - a.x, b.y - a.y) : null;
}

function testoMisura(e, metri){
  const numero = metri == null ? '' : (metri < 10 ? metri.toFixed(1).replace('.', ',') : String(Math.round(metri))) + ' m';
  const t = String(e.testo || '').trim();
  return t ? t + ' · ' + numero : numero;
}

/* ---- esercitazioni su area ridotta ----
 * es.campo assente = campo intero 105 x 68; {lunghezza, larghezza} = area.
 * Un'esercitazione su area parte vuota: i giocatori si aggiungono liberi,
 * senza scheda in rosa (un 3 contro 3 + 2 non e' la squadra titolare).
 * squadra: 'casa' blu, 'avversari' rossi, 'jolly' gialli; portiere: verde. */
function eArea(es){ return !!(es && es.campo && es.campo.lunghezza); }

function giocatoreLibero(squadra, x, y, portiere){
  const g = { id: id('gl'), tipo: 'giocatore', squadra: squadra, x: x, y: y };
  if (portiere) g.portiere = true;
  return g;
}

function attrezzoNuovo(oggetto, x, y){
  return { id: id('att'), tipo: 'attrezzo', oggetto: oggetto, x: x, y: y, angolo: 0 };
}

function pallaNuova(x, y){
  return { id: id('palla'), tipo: 'palla', x: x, y: y };
}

/* ---- piu' passaggi nella stessa fase ----
 * La palla di una fase puo' avere delle tappe: i giocatori (o i punti) per
 * cui passa prima di arrivare dove sta. Il giro parte da dove la palla era
 * nella fase precedente. */
function portatoreDi(fase, pos){
  let chi = null, minima = 0.9;
  (fase && fase.elementi || []).forEach(function(g){
    if (g.tipo !== 'giocatore') return;
    const d = Math.hypot(g.x + 1.9 - pos.x, g.y - 1.9 - pos.y);
    if (d < minima){ minima = d; chi = g.id; }
  });
  return chi;
}

/* i punti del giro della palla: partenza, tappe, arrivo */
function percorsoPalla(precedente, fase, idPalla){
  const b = idPalla ? elementoDi(fase, idPalla) : pallaDi(fase);
  const a = b ? elementoDi(precedente, b.id) : null;
  if (!a || !b) return null;
  const punti = [{x: a.x, y: a.y}];
  (b.tappe || []).forEach(function(t){
    if (t.giocatore){
      const g = elementoDi(fase, t.giocatore);
      if (g) punti.push(spalla(g));
    } else if (typeof t.x === 'number'){
      punti.push({x: t.x, y: t.y});
    }
  });
  punti.push({x: b.x, y: b.y});
  return punti;
}

function pallaDi(fase){
  return (fase && fase.elementi || []).find(function(e){ return e.tipo === 'palla'; }) || null;
}

function elementoDi(fase, idElemento){
  return (fase && fase.elementi || []).find(function(e){ return e.id === idElemento; }) || null;
}

/* Il giocatore numero i della rosa (0 = primo), dentro una fase. */
function giocatoreDi(fase, squadra, lato, i){
  const rosa = lato === 'avversari' ? squadra.rosaAvversario : squadra.rosa;
  return rosa[i] ? elementoDi(fase, rosa[i].id) : null;
}

/* ---- fase ----
 * Ogni fase salva TUTTI gli elementi, non le differenze rispetto alla
 * precedente. L'ereditarieta' e' comodita' dell'editor: quando aggiungi una
 * fase, gli elementi vengono copiati con gli stessi id. Ma su disco ogni fase
 * e' completa, altrimenti cancellarne una a meta' romperebbe quelle dopo. */
function faseDa(precedente, nome){
  const elementi = copia(precedente.elementi || []);
  /* la fase nuova parte da dove e' arrivata la palla: il giro di passaggi
     della fase precedente non si copia */
  elementi.forEach(function(e){
    if (e.tipo === 'palla') delete e.tappe;
    /* l'azione (basket: taglio, palleggio, blocco) e la sua curva valgono per la fase in cui la si fa */
    delete e.azione;
    delete e.via;
    delete e.passi;
  });
  return { id: id('fase'), nome: nome || 'Nuova fase', elementi: elementi };
}

function elementiDiPartenza(sport, modulo, squadra){
  const schieramento = sport.MODULI[modulo];
  const elementi = [];
  squadra.rosa.slice(0, schieramento.length).forEach(function(g, i){
    elementi.push(giocatoreDa(g, 'casa', schieramento[i]));
  });
  squadra.rosaAvversario.slice(0, sport.BLOCCO_AVVERSARIO.length).forEach(function(g, i){
    elementi.push(giocatoreDa(g, 'avversari', sport.BLOCCO_AVVERSARIO[i]));
  });
  const pp = spalla(schieramento[0]);
  elementi.push({ id: id('palla'), tipo: 'palla', x: pp.x, y: pp.y });
  return elementi;
}

function fasePartenza(sport, modulo, squadra){
  return { id: id('fase'), nome: 'Posizione di partenza', elementi: elementiDiPartenza(sport, modulo, squadra) };
}

/* ---- esercitazione: una sequenza di fasi dentro una sezione del playbook ---- */
function esercitazioneNuova(sport, modulo, sezione, nome, squadra, area){
  const es = {
    id: id('es'),
    nome: nome || 'Senza nome',
    sezione: sezione || sport.SEZIONI[0].chiave,
    modulo: modulo,
    note: '',
    fasi: [fasePartenza(sport, modulo, squadra)]
  };
  if (area && area.lunghezza && area.larghezza){
    es.campo = {lunghezza: area.lunghezza, larghezza: area.larghezza};
    es.fasi = [{ id: id('fase'), nome: 'Disposizione iniziale', elementi: [] }];
  }
  return es;
}

/* ---- il lavoro intero: quello che sta dentro un file .vdmcalcio ---- */
function lavoroNuovo(sport){
  return {
    formato: FORMATO,
    sport: sport.SPORT,
    id: id('lav'),
    creato: new Date().toISOString(),
    modificato: new Date().toISOString(),
    leghe: []
  };
}

function legaNuova(nome){
  return { id: id('lega'), nome: nome || 'Nuova lega', squadre: [] };
}

/* Una squadra nuova parte gia' con il modulo schierato e un'uscita dal basso
 * aperta: si entra e si disegna, senza pagine vuote. */
function squadraNuova(sport, nome){
  const modulo = Object.keys(sport.MODULI)[0];
  const squadra = {
    id: id('sq'),
    nome: nome || 'Nuova squadra',
    stagione: stagioneCorrente(),
    modulo: modulo,
    rosa: sport.MODULI[modulo].map(function(p){
      return {id: id('g'), n: p.n, ruolo: p.r, cognome: ''};
    }),
    rosaAvversario: sport.BLOCCO_AVVERSARIO.map(function(p){
      return {id: id('a'), n: p.n, ruolo: p.r, cognome: ''};
    }),
    esercitazioni: [],
    avversarie: [],
    sedute: [],
    eventi: [],
    presentazioni: [],
    video: []
  };
  squadra.esercitazioni.push(esercitazioneNuova(sport, modulo, 'uscita_dal_basso', 'Uscita dal basso', squadra));
  return squadra;
}

function stagioneCorrente(){
  const oggi = new Date(), a = oggi.getFullYear();
  const inizio = oggi.getMonth() >= 6 ? a : a - 1;
  return inizio + '/' + String(inizio + 1).slice(2);
}

/* Le esercitazioni di una sezione. Quelle degli avversari stanno in Schemi
   Avversari: si filtrano per squadra avversaria (avversario), le nostre no. */
function esercitazioniDi(squadra, chiaveSezione, idAvversaria){
  return squadra.esercitazioni.filter(function(e){
    return e.sezione === chiaveSezione && (e.avversario || null) === (idAvversaria || null);
  });
}

function trovaEsercitazione(squadra, idEs){
  return squadra.esercitazioni.find(function(e){ return e.id === idEs; }) || null;
}

/* Rischierare un'esercitazione su un altro modulo: riposiziona solo i
 * giocatori della prima fase, per ordine di rosa. Le altre fasi conservano
 * quello che l'allenatore ha disegnato a mano, e gli altri elementi della
 * prima fase (zone, scritte...) restano dove sono. */
function cambiaModulo(sport, es, modulo, squadra){
  es.modulo = modulo;
  const nuovi = elementiDiPartenza(sport, modulo, squadra);
  const f0 = es.fasi[0];
  nuovi.forEach(function(n){
    if (n.tipo !== 'giocatore') return;
    const vecchio = elementoDi(f0, n.id);
    if (vecchio){ vecchio.x = n.x; vecchio.y = n.y; }
    else f0.elementi.push(n);
  });
  const palla = pallaDi(f0), portiere = squadra.rosa[0] && elementoDi(f0, squadra.rosa[0].id);
  if (palla && portiere){ const pp = spalla(portiere); palla.x = pp.x; palla.y = pp.y; }
  return es;
}

/* ---- percorsi curvi ----
 * Un movimento puo' passare per dei punti (via): il taglio a L, il giro
 * attorno a un blocco. La curva passa per tutti i punti (Catmull-Rom) e
 * serve sia al disegno sia all'animazione, cosi' chi si muove segue
 * esattamente la freccia disegnata. */
function curva(punti, passi){
  if (!punti || punti.length < 3) return (punti || []).map(function(p){ return {x: p.x, y: p.y}; });
  const n = passi || 14, out = [];
  for (let i = 0; i < punti.length - 1; i++){
    const p0 = punti[i - 1] || punti[i], p1 = punti[i], p2 = punti[i + 1], p3 = punti[i + 2] || punti[i + 1];
    for (let s = 0; s < n; s++){
      const t = s / n, t2 = t * t, t3 = t2 * t;
      out.push({
        x: .5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: .5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3)
      });
    }
  }
  const ultimo = punti[punti.length - 1];
  out.push({x: ultimo.x, y: ultimo.y});
  return out;
}

/* il punto a una frazione k (0..1) della lunghezza del percorso */
function puntoLungo(campioni, k){
  if (!campioni.length) return null;
  const lunghezze = [0];
  for (let i = 1; i < campioni.length; i++){
    lunghezze.push(lunghezze[i - 1] + Math.hypot(campioni[i].x - campioni[i - 1].x, campioni[i].y - campioni[i - 1].y));
  }
  const totale = lunghezze[lunghezze.length - 1];
  if (!totale) return {x: campioni[0].x, y: campioni[0].y};
  const d = Math.max(0, Math.min(1, k)) * totale;
  let i = 1;
  while (i < lunghezze.length - 1 && lunghezze[i] < d) i++;
  const tratto = lunghezze[i] - lunghezze[i - 1] || 1;
  const f = (d - lunghezze[i - 1]) / tratto;
  return {x: campioni[i - 1].x + (campioni[i].x - campioni[i - 1].x) * f,
          y: campioni[i - 1].y + (campioni[i].y - campioni[i - 1].y) * f};
}

/* ---- rosa, avversarie, scouting (formato 4) ----
 * La scheda del giocatore sta in rosa: numero e ruolo li usa gia' il campo
 * (le pedine puntano alla scheda con rif), il resto serve all'allenatore. */
const STATI_GIOCATORE = ['disponibile', 'in recupero', 'infortunato', 'squalificato'];
const PIEDI = ['destro', 'sinistro', 'ambidestro'];

function giocatoreRosaNuovo(dati){
  return Object.assign({id: id('g'), n: null, ruolo: '', cognome: '', nome: '',
                        piede: '', stato: 'disponibile', nato: '', note: ''}, dati || {});
}

function nomeGiocatore(g){
  if (!g) return '';
  const nome = [g.cognome, g.nome].filter(Boolean).join(' ').trim();
  return nome || (g.n != null ? 'n. ' + g.n : 'senza nome');
}

function scoutingVuoto(){
  return {aggiornato: '', modulo: '', possesso: '', nonPossesso: '', transizioni: '',
          piazzati: '', forza: '', debolezze: '', chiave: '', comeBatterla: ''};
}

function avversariaNuova(nome){
  return {id: id('avv'), nome: nome || 'Squadra avversaria', modulo: '', campo: '', note: '',
          rosa: [], scouting: scoutingVuoto()};
}

function avversariaDi(squadra, idAvversaria){
  return (squadra && squadra.avversarie || []).find(function(a){ return a.id === idAvversaria; }) || null;
}

/* Le liste nuove del formato 4: un lavoro vecchio non le ha. */
function sistemaSquadra(squadra){
  ['avversarie', 'sedute', 'eventi', 'presentazioni', 'video'].forEach(function(k){
    if (!Array.isArray(squadra[k])) squadra[k] = [];
  });
  (squadra.rosa || []).forEach(function(g){
    const pieno = giocatoreRosaNuovo(g);
    Object.keys(pieno).forEach(function(k){ if (g[k] === undefined) g[k] = pieno[k]; });
  });
  (squadra.avversarie || []).forEach(function(a){
    if (!Array.isArray(a.rosa)) a.rosa = [];
    a.scouting = Object.assign(scoutingVuoto(), a.scouting || {});
  });
  return squadra;
}

/* ---- Practice: le sedute di allenamento ----
 * Una seduta e' una fila di blocchi con i loro minuti; ogni blocco puo'
 * puntare a un'esercitazione del playbook, cosi' in campo si apre il
 * diagramma senza cercarlo. */
function bloccoNuovo(dati){
  return Object.assign({id: id('blocco'), titolo: '', minuti: 15, esercitazione: null, note: ''}, dati || {});
}

function sedutaNuova(data, titolo){
  return {id: id('seduta'), data: data || '', ora: '', titolo: titolo || 'Seduta', luogo: '',
          obiettivo: '', note: '', fatta: false,
          blocchi: [bloccoNuovo({titolo: 'Attivazione', minuti: 15}),
                    bloccoNuovo({titolo: 'Parte centrale', minuti: 35}),
                    bloccoNuovo({titolo: 'Partita a tema', minuti: 20})]};
}

function minutiSeduta(seduta){
  return (seduta.blocchi || []).reduce(function(t, b){ return t + (+b.minuti || 0); }, 0);
}

function sedutaDi(squadra, idSeduta){
  return (squadra && squadra.sedute || []).find(function(s){ return s.id === idSeduta; }) || null;
}

/* ---- Calendario: partite, sedute e appuntamenti ---- */
const TIPI_EVENTO = [
  {chiave: 'partita',     nome: 'Partita',      segno: '⚽'},
  {chiave: 'allenamento', nome: 'Allenamento',  segno: '🏋️'},
  {chiave: 'altro',       nome: 'Appuntamento', segno: '📌'}
];

function eventoNuovo(data, tipo){
  return {id: id('ev'), data: data, ora: '', tipo: tipo || 'allenamento', titolo: '',
          avversaria: null, casa: true, seduta: null, note: ''};
}

function eventiDelGiorno(squadra, data){
  return (squadra && squadra.eventi || []).filter(function(e){ return e.data === data; })
    .sort(function(a, b){ return String(a.ora || '').localeCompare(String(b.ora || '')); });
}

/* ---- Video: la partita e i suoi tagli ----
 * Il filmato non entra nel file del lavoro (pesa troppo): si tiene il nome e,
 * dentro l'app, il percorso sul disco, cosi' la volta dopo si riapre da solo.
 * Nel browser il filmato si ricollega a mano. */
const COLORI_TAG = ['#00E5FF', '#22C55E', '#FFD400', '#E5636B', '#B57BFF', '#FF9F43'];

function tagNuovo(nome, colore){
  return {id: id('tag'), nome: nome || 'Tag', colore: colore || COLORI_TAG[0], tasto: ''};
}

function videoNuovo(nome, percorso){
  return {id: id('vid'), nome: nome || 'Partita', percorso: percorso || null, durata: 0, aggiunto: new Date().toISOString(),
          tag: ['Gol', 'Occasione', 'Palla persa', 'Uscita dal basso'].map(function(n, i){
            return tagNuovo(n, COLORI_TAG[i % COLORI_TAG.length]);
          }),
          clip: []};
}

function clipNuova(inizio, fine, idTag){
  return {id: id('clip'), inizio: Math.max(0, inizio), fine: Math.max(0, fine), tag: idTag || null,
          giocatore: null, nota: ''};
}

function videoDi(squadra, idVideo){
  return (squadra && squadra.video || []).find(function(v){ return v.id === idVideo; }) || null;
}

/* i secondi scritti come 12:34 */
function tempoScritto(secondi){
  const s = Math.max(0, Math.round(secondi || 0));
  const m = Math.floor(s / 60);
  return m + ':' + String(s % 60).padStart(2, '0');
}

return { FORMATO, copia, spalla, COLORI_ZONA, STILI_ZONA, zonaNuova, STILI_LINEA, lineaNuova, STILI_EVIDENZA, evidenzaNuova, STILI_SCRITTA, scrittaNuova, haCartello, durataCartello, misuraNuova, posizioneCapo, lunghezzaMisura, testoMisura, eArea, giocatoreLibero, attrezzoNuovo, pallaNuova, portatoreDi, percorsoPalla, pallaDi, elementoDi, giocatoreDi, faseDa, fasePartenza, esercitazioneNuova, lavoroNuovo, legaNuova, squadraNuova, stagioneCorrente, esercitazioniDi, trovaEsercitazione, cambiaModulo, curva, puntoLungo, STATI_GIOCATORE, PIEDI, giocatoreRosaNuovo, nomeGiocatore, scoutingVuoto, avversariaNuova, avversariaDi, sistemaSquadra, bloccoNuovo, sedutaNuova, minutiSeduta, sedutaDi, TIPI_EVENTO, eventoNuovo, eventiDelGiorno, COLORI_TAG, tagNuovo, videoNuovo, clipNuova, videoDi, tempoScritto };
})();
/* ---- src/renderer/core/cronologia.js ---- */
const __vdm_src_renderer_core_cronologia_js = (function(){
/* Annulla. Senza, disegnare diagrammi è un incubo. */
function Cronologia(limite){
  const passi = [];
  const max = limite || 80;
  return {
    segna: function(stato){
      passi.push(JSON.stringify(stato));
      if (passi.length > max) passi.shift();
    },
    annulla: function(){
      return passi.length ? JSON.parse(passi.pop()) : null;
    },
    vuota: function(){ return passi.length === 0; },
    azzera: function(){ passi.length = 0; }
  };
}

return { Cronologia };
})();
/* ---- src/renderer/core/animazione.js ---- */
const __vdm_src_renderer_core_animazione_js = (function(){
const { spalla, curva, puntoLungo } = __vdm_src_renderer_core_modello_js;

/* Il motore dell'animazione. Non sa che sport sta animando: riceve due fasi
   e una frazione fra 0 e 1, e restituisce le posizioni intermedie.
   È il pezzo che verrà condiviso con il basket. */

function easeInOut(t){
  return t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2;
}

/* La palla arriva prima che i movimenti finiscano: è così che va davvero,
   il compagno continua la corsa dopo che ha ricevuto. */
const ANTICIPO_PALLA = 0.62;

/* Quello che compare o sparisce fra una fase e l'altra sfuma nella prima
   parte del passaggio: nei video di analisi le zone e le linee arrivano
   mentre il movimento parte, non di colpo a meta'. */
const DISSOLVENZA = 0.35;

/* curva morbida (seno): parte e arriva dolce senza lo strappo del cubico,
   quando piu' azioni si danno il cambio */
function morbida(t){ return -(Math.cos(Math.PI * Math.max(0, Math.min(1, t))) - 1) / 2; }
/* velocita' costante: niente accelerazioni ne' frenate (basket) */
function costante(t){ return Math.max(0, Math.min(1, t)); }
function curvaDi(w){ return w && w.curva === 'costante' ? costante : w && w.curva === 'morbida' ? morbida : easeInOut; }

/* ritmo (facoltativo, dal modulo sport): per ogni elemento dice in quale
   parte del passaggio si muove, {da, a} fra 0 e 1, e per la palla portata
   in palleggio chi la porta. Senza ritmo tutti si muovono insieme e la palla
   anticipa, come nel calcio. */
function finestra(p, t){
  return Math.max(0, Math.min(1, (p - t.da) / Math.max(0.001, t.a - t.da)));
}

function interpola(a, b, p, ritmo){
  const tempi = ritmo ? ritmo(a, b) : null;
  const e  = easeInOut(Math.max(0, Math.min(1, p)));
  const ep = easeInOut(Math.min(1, p / ANTICIPO_PALLA));
  const sfuma = easeInOut(Math.max(0, Math.min(1, p / DISSOLVENZA)));
  const inA = new Map((a.elementi || []).map(function(x){ return [x.id, x]; }));
  const inB = new Map((b.elementi || []).map(function(x){ return [x.id, x]; }));
  const elementi = [];

  /* chi c'e' in tutte e due le fasi scorre da una posizione all'altra;
     chi c'e' solo nella nuova entra in dissolvenza, chi c'e' solo nella
     vecchia esce in dissolvenza */
  (b.elementi || []).forEach(function(eb){
    const ea = inA.get(eb.id);
    if (!ea){
      if (sfuma > 0) elementi.push(Object.assign({}, eb, {opacita: sfuma}));
      return;
    }
    let k = eb.tipo === 'palla' ? ep : e;
    const tempo = tempi ? tempi(eb, ea) : null;
    if (tempo) k = curvaDi(tempo)(finestra(p, tempo));
    const copia = Object.assign({}, eb);
    if (typeof ea.x === 'number' && typeof eb.x === 'number'){
      if (tempo && tempo.passi && Array.isArray(eb.passi) && eb.passi.length){
        /* azioni in fila: ognuna nella sua finestra, partendo da dove e' finita la prima */
        let da = {x: ea.x, y: ea.y}, pos = da;
        for (let j = 0; j < eb.passi.length; j++){
          const s = eb.passi[j], w = tempo.passi[j] || tempo;
          if (p <= w.da){ pos = da; break; }
          const kk = curvaDi(w)(finestra(p, w));
          pos = puntoLungo(curva([da].concat(s.via || [], [s])), kk);
          if (kk < 1) break;
          da = {x: s.x, y: s.y};
        }
        copia.x = pos.x; copia.y = pos.y;
      } else if (Array.isArray(eb.via) && eb.via.length){
        const p = puntoLungo(curva([ea].concat(eb.via, [eb])), k);
        copia.x = p.x; copia.y = p.y;
      } else {
        copia.x = ea.x + (eb.x - ea.x) * k;
        copia.y = ea.y + (eb.y - ea.y) * k;
      }
    }
    if (Array.isArray(ea.capi) && Array.isArray(eb.capi)){
      copia.capi = eb.capi.map(function(cb, i){
        const ca = ea.capi[i];
        if (!ca || typeof ca.x !== 'number' || typeof cb.x !== 'number') return cb;
        return {x: ca.x + (cb.x - ca.x) * k, y: ca.y + (cb.y - ca.y) * k};
      });
    }
    if (typeof ea.w === 'number' && typeof eb.w === 'number'){
      copia.w = ea.w + (eb.w - ea.w) * k;
      copia.h = ea.h + (eb.h - ea.h) * k;
    }
    elementi.push(copia);
  });
  (a.elementi || []).forEach(function(ea){
    if (!inB.has(ea.id) && sfuma < 1) elementi.push(Object.assign({}, ea, {opacita: 1 - sfuma}));
  });

  /* la palla con piu' passaggi: va di giocatore in giocatore, ogni passaggio
     con la sua partenza e il suo arrivo. Il ricevitore si prende dove si
     trova in quel momento, perche' intanto si sta muovendo anche lui.
     Piu' passaggi = la palla usa una parte piu' lunga del tempo. */
  const giocatori = new Map();
  elementi.forEach(function(e){ if (e.tipo === 'giocatore') giocatori.set(e.id, e); });
  elementi.forEach(function(c){
    if (c.tipo !== 'palla') return;
    const eb = inB.get(c.id), ea = inA.get(c.id);
    const tempo = tempi && ea && eb ? tempi(eb, ea) : null;
    /* palleggio: la palla sta con chi la porta, e rimbalza mentre corre */
    if (tempo && tempo.portatore && giocatori.get(tempo.portatore)){
      const g = giocatori.get(tempo.portatore);
      const q = finestra(p, tempo);
      const rimbalzi = tempo.rimbalzi || 3;
      const f = q > 0 && q < 1 ? 1 - 0.5 * Math.abs(Math.sin(q * Math.PI * rimbalzi)) : 1;
      c.x = g.x + 1.9 * f; c.y = g.y - 1.9 * f;
      return;
    }
    if (!ea || !eb || !eb.tappe || !eb.tappe.length) return;
    /* un passaggio va dritto dove la compagna arriva: mirare a dove sta in quel
       momento faceva curvare la palla (17/09). Col ritmo a velocita' costante
       le tappe sono quelle della fase d'arrivo. */
    const dritto = tempo && tempo.curva === 'costante';
    const punti = [{x: ea.x, y: ea.y}];
    eb.tappe.forEach(function(t){
      if (t.giocatore){
        const g = dritto ? inB.get(t.giocatore) : giocatori.get(t.giocatore);
        if (g) punti.push(spalla(g));
      }
      else if (typeof t.x === 'number') punti.push({x: t.x, y: t.y});
    });
    punti.push({x: eb.x, y: eb.y});
    /* chi aveva la palla prima palleggia e poi passa: fino al passaggio la palla
       resta con lei, e parte da dove finisce il palleggio */
    const primaTappa = eb.tappe[0];
    const chiLaPorta = primaTappa && primaTappa.giocatore && inA.get(primaTappa.giocatore);
    if (tempo && chiLaPorta && Math.hypot(ea.x - (chiLaPorta.x + 1.9), ea.y - (chiLaPorta.y - 1.9)) < 0.9 && punti.length > 2){
      punti.shift();
      /* finche' palleggia la palla e' dove si trova lei adesso, non dove arrivera' */
      const chiOra = giocatori.get(primaTappa.giocatore);
      if (chiOra) punti[0] = spalla(chiOra);
    }
    const n = punti.length - 1;
    if (tempo && tempo.curva === 'costante'){
      /* velocita' costante anche per la palla: ogni passaggio prende il tempo della sua lunghezza */
      const dove = puntoLungo(punti, finestra(p, tempo));
      c.x = dove.x; c.y = dove.y;
      return;
    }
    const frazione = Math.min(0.95, ANTICIPO_PALLA * (1 + 0.5 * (n - 1)));
    const t = (tempo ? finestra(p, tempo) : Math.min(1, Math.max(0, p) / frazione)) * n;
    const tratto = Math.min(n - 1, Math.floor(t));
    const k = (tempo ? curvaDi(tempo) : easeInOut)(Math.min(1, t - tratto));
    const da = punti[tratto], a2 = punti[tratto + 1];
    c.x = da.x + (a2.x - da.x) * k;
    c.y = da.y + (a2.y - da.y) * k;
  });
  return { elementi: elementi };
}

/* Il lettore. Un solo orologio, quello dei fotogrammi: mescolarlo con un
   secondo tempo significa che basta uno scarto fra i due e l'animazione
   resta ferma. Se l'utente cambia scheda il browser congela i fotogrammi:
   al rientro si riprende da dove eravamo invece di saltare una fase.

   Per ogni fase, nell'ordine:
     cartello (se la fase ne ha uno) -> movimento verso la fase -> pausa sulla fase
   Il cartello della prima fase si vede all'inizio, prima di tutto.
   Nella pausa la fase arrivata resta ferma con le sue frecce, come nel video. */
function Lettore(opzioni){
  const disegna   = opzioni.disegna;
  const suFase    = opzioni.suFase    || function(){};
  const inPausa   = opzioni.inPausa   || function(){};
  const alTermine = opzioni.alTermine || function(){};
  const durataCartello = opzioni.durataCartello || function(){ return 0; };
  const mostraCartello = opzioni.mostraCartello || function(){};
  const ritmo = opzioni.ritmo || null;
  /* prima di muoversi si guarda il primo diagramma (basket) */
  const pausaIniziale = opzioni.pausaIniziale || 0;
  /* un tempo con piu' momenti dura un po' di piu' (basket) */
  const durataRelativa = opzioni.durataRelativa || function(){ return 1; };

  let raf = null, osservatore = null;
  let fasi = [], durata = 2600, pausa = 900, ciclo = false;
  let segmento = 0, stato = 'movimento', cartelloDi = -1, attesa = 0;
  let t0 = null, ultimo = 0, riporto = 0;

  function ferma(){
    if (raf != null){ cancelAnimationFrame(raf); raf = null; }
    if (osservatore){
      document.removeEventListener('visibilitychange', osservatore);
      osservatore = null;
    }
    mostraCartello(null);
  }

  /* comincia il passaggio verso la fase s+1: prima il suo cartello, se c'e' */
  function iniziaSegmento(s, ora){
    segmento = s;
    t0 = ora;
    suFase(s);
    const d = durataCartello(s + 1);
    if (d > 0){ stato = 'cartello'; cartelloDi = s + 1; attesa = d; mostraCartello(s + 1); }
    else { stato = 'movimento'; }
  }

  function avvia(elenco, opz){
    ferma();
    fasi = elenco;
    if (fasi.length < 2) return false;
    durata = (opz && opz.durata) || 2600;
    pausa  = (opz && opz.pausa != null) ? opz.pausa : 900;
    ciclo  = !!(opz && opz.ciclo);
    t0 = null; ultimo = 0; riporto = 0;

    osservatore = function(){
      if (document.hidden && t0 !== null){ riporto = ultimo - t0; t0 = null; }
    };
    document.addEventListener('visibilitychange', osservatore);

    /* il cartello della prima fase, all'inizio di tutto */
    function partenza(ora){
      const d0 = durataCartello(0);
      segmento = 0;
      suFase(0);
      if (d0 > 0){ stato = 'cartello'; cartelloDi = 0; attesa = d0; t0 = ora; mostraCartello(0); }
      else if (pausaIniziale > 0){ stato = 'lettura'; t0 = ora; inPausa(0); }
      else iniziaSegmento(0, ora);
    }

    raf = requestAnimationFrame(function passo(ora){
      if (t0 === null && stato === 'avvio'){ partenza(ora); }
      if (t0 === null){ t0 = ora - riporto; riporto = 0; }
      ultimo = ora;
      const trascorso = ora - t0;

      if (stato === 'lettura'){
        if (trascorso < pausaIniziale){ raf = requestAnimationFrame(passo); return; }
        iniziaSegmento(0, ora);
        raf = requestAnimationFrame(passo);
        return;
      }

      if (stato === 'cartello'){
        if (trascorso < attesa){ raf = requestAnimationFrame(passo); return; }
        mostraCartello(null);
        if (cartelloDi === 0 && segmento === 0 && pausaIniziale > 0){ stato = 'lettura'; t0 = ora; inPausa(0); }
        else if (cartelloDi === 0 && segmento === 0){ iniziaSegmento(0, ora); }
        else { stato = 'movimento'; t0 = ora; }
        raf = requestAnimationFrame(passo);
        return;
      }

      if (stato === 'movimento'){
        const p = trascorso / (durata * durataRelativa(fasi[segmento], fasi[segmento+1]));
        if (p < 1){
          disegna(interpola(fasi[segmento], fasi[segmento+1], p, ritmo), segmento, p);
          raf = requestAnimationFrame(passo);
          return;
        }
        /* arrivati: si ferma sulla fase nuova */
        stato = 'pausa';
        t0 = ora;
        inPausa(segmento + 1);
        raf = requestAnimationFrame(passo);
        return;
      }

      /* pausa */
      if (trascorso < pausa){ raf = requestAnimationFrame(passo); return; }
      if (segmento + 1 >= fasi.length - 1){
        if (!ciclo){ ferma(); alTermine(); return; }
        stato = 'avvio'; t0 = null;
        partenza(ora);
        raf = requestAnimationFrame(passo);
        return;
      }
      iniziaSegmento(segmento + 1, ora);
      raf = requestAnimationFrame(passo);
    });
    stato = 'avvio';
    return true;
  }

  return {
    avvia: avvia,
    ferma: ferma,
    inCorso: function(){ return raf != null; }
  };
}

return { easeInOut, interpola, Lettore };
})();
/* ---- src/renderer/ui/manichino.js ---- */
const __vdm_src_renderer_ui_manichino_js = (function(){
/* Il manichino 3D delle giocatrici (18/09).
 *
 * Un corpo vero, fatto di volumi (testa, collo, torace, spalle, braccia,
 * cosce, polpacci, piedi), disegnato dalla scheda grafica con una luce di
 * lato: il chiaroscuro e' quello di un solido, non un disegno piatto.
 * Addosso la canotta e i pantaloncini della squadra.
 *
 * Si disegna UNA volta per colore e per inclinazione del campo, in una tela a
 * parte; poi campo.js la usa come figurina per ogni giocatrice. Senza WebGL
 * restituisce null e il campo ripiega sul disegno 2D. */

const ALTEZZA = 1.8;                 // metri: le misure qui sotto sono in metri
const PELLE = [0.90, 0.87, 0.84];    // il colore del manichino, chiaro come nei riferimenti

/* ---- le forme ---- */
function ellissoide(c, r, colore, seg){
  const n = seg || 18, pos = [], nor = [], idx = [];
  for (let i = 0; i <= n; i++){
    const v = i / n * Math.PI, sv = Math.sin(v), cv = Math.cos(v);
    for (let j = 0; j <= n; j++){
      const h = j / n * Math.PI * 2, sh = Math.sin(h), ch = Math.cos(h);
      const x = sv * ch, y = cv, z = sv * sh;
      pos.push(c[0] + r[0] * x, c[1] + r[1] * y, c[2] + r[2] * z);
      const nx = x / r[0], ny = y / r[1], nz = z / r[2], l = Math.hypot(nx, ny, nz) || 1;
      nor.push(nx / l, ny / l, nz / l);
    }
  }
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++){
    const a = i * (n + 1) + j, b = a + n + 1;
    idx.push(a, b, a + 1, b, b + 1, a + 1);
  }
  return {pos, nor, idx, colore};
}

/* un tronco di cono fra due punti, con le sfere ai capi: braccia e gambe */
function arto(p0, p1, r0, r1, colore){
  const pezzi = [];
  const n = 16, pos = [], nor = [], idx = [];
  const ax = [p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]];
  const L = Math.hypot(ax[0], ax[1], ax[2]) || 1;
  const a = [ax[0] / L, ax[1] / L, ax[2] / L];
  /* due vettori perpendicolari all'asse */
  let t = Math.abs(a[1]) < .9 ? [0, 1, 0] : [1, 0, 0];
  let b1 = [a[1] * t[2] - a[2] * t[1], a[2] * t[0] - a[0] * t[2], a[0] * t[1] - a[1] * t[0]];
  const lb = Math.hypot(b1[0], b1[1], b1[2]); b1 = b1.map(function(v){ return v / lb; });
  const b2 = [a[1] * b1[2] - a[2] * b1[1], a[2] * b1[0] - a[0] * b1[2], a[0] * b1[1] - a[1] * b1[0]];
  const pendenza = (r0 - r1) / L;
  for (let k = 0; k <= 1; k++){
    const p = k ? p1 : p0, r = k ? r1 : r0;
    for (let j = 0; j <= n; j++){
      const h = j / n * Math.PI * 2, c = Math.cos(h), s = Math.sin(h);
      const d = [b1[0] * c + b2[0] * s, b1[1] * c + b2[1] * s, b1[2] * c + b2[2] * s];
      pos.push(p[0] + d[0] * r, p[1] + d[1] * r, p[2] + d[2] * r);
      const nn = [d[0] + a[0] * pendenza, d[1] + a[1] * pendenza, d[2] + a[2] * pendenza];
      const l = Math.hypot(nn[0], nn[1], nn[2]);
      nor.push(nn[0] / l, nn[1] / l, nn[2] / l);
    }
  }
  for (let j = 0; j < n; j++) idx.push(j, j + n + 1, j + 1, j + n + 1, j + n + 2, j + 1);
  pezzi.push({pos, nor, idx, colore});
  pezzi.push(ellissoide(p0, [r0, r0, r0], colore, 12));
  pezzi.push(ellissoide(p1, [r1, r1, r1], colore, 12));
  return pezzi;
}

/* il busto: anelli ellittici (larghezza, profondita') uno sopra l'altro */
function busto(sezioni, colore){
  const n = 24, pos = [], nor = [], idx = [];
  sezioni.forEach(function(s, i){
    const prec = sezioni[Math.max(0, i - 1)], succ = sezioni[Math.min(sezioni.length - 1, i + 1)];
    const dy = succ[0] - prec[0] || 1;
    const dw = (succ[1] - prec[1]) / dy, dd = (succ[2] - prec[2]) / dy;
    for (let j = 0; j <= n; j++){
      const h = j / n * Math.PI * 2, c = Math.cos(h), sn = Math.sin(h);
      pos.push(c * s[1], s[0], sn * s[2] + (s[3] || 0));
      /* la normale di una superficie ellittica che si allarga o si stringe */
      let nx = c / s[1], nz = sn / s[2], ny = -(c * c * dw / s[1] + sn * sn * dd / s[2]);
      const l = Math.hypot(nx, ny, nz) || 1;
      nor.push(nx / l, ny / l, nz / l);
    }
  });
  for (let i = 0; i < sezioni.length - 1; i++) for (let j = 0; j < n; j++){
    const a = i * (n + 1) + j, b = a + n + 1;
    idx.push(a, b, a + 1, b, b + 1, a + 1);
  }
  return {pos, nor, idx, colore};
}

function corpo(maglia, pantaloncini){
  const P = PELLE, pezzi = [];
  const aggiungi = function(x){ if (Array.isArray(x)) x.forEach(function(y){ pezzi.push(y); }); else pezzi.push(x); };
  /* testa e collo */
  aggiungi(ellissoide([0, 1.665, 0], [.078, .105, .09], P, 22));
  aggiungi(arto([0, 1.5, -.005], [0, 1.585, 0], .05, .045, P));
  /* canotta: dalle spalle ai fianchi (y, mezza larghezza, mezza profondita', spostamento in avanti) */
  aggiungi(busto([[1.02, .148, .098], [1.12, .138, .092], [1.22, .15, .1, .005], [1.33, .172, .112, .012],
                  [1.42, .18, .108, .006], [1.47, .15, .085], [1.5, .07, .05]], maglia));
  /* pantaloncini: il bacino */
  aggiungi(busto([[.8, .168, .1], [.9, .17, .104], [1.0, .156, .1], [1.04, .15, .099]], pantaloncini));
  /* spalle scoperte (la canotta le lascia fuori) */
  [-1, 1].forEach(function(s){
    aggiungi(ellissoide([s * .19, 1.43, 0], [.058, .06, .055], P, 16));
    /* braccia in posa ad A */
    aggiungi(arto([s * .205, 1.41, 0], [s * .255, 1.16, .005], .045, .036, P));
    aggiungi(arto([s * .255, 1.16, .005], [s * .305, .93, .02], .035, .026, P));
    aggiungi(ellissoide([s * .318, .86, .025], [.026, .06, .036], P, 12));
    /* gambe: la coscia coperta dai pantaloncini fino a sopra il ginocchio */
    aggiungi(arto([s * .09, .86, 0], [s * .095, .66, .005], .082, .066, pantaloncini));
    aggiungi(arto([s * .095, .7, .005], [s * .1, .5, .008], .064, .05, P));
    aggiungi(arto([s * .1, .5, .008], [s * .1, .36, -.01], .05, .055, P));
    aggiungi(arto([s * .1, .36, -.01], [s * .098, .08, 0], .055, .03, P));
    aggiungi(ellissoide([s * .1, .035, .045], [.042, .035, .1], P, 12));
  });
  return pezzi;
}

/* ---- WebGL ---- */
const VS = 'attribute vec3 aP; attribute vec3 aN; uniform mat4 uM; uniform mat3 uR; varying vec3 vN; varying vec3 vP;' +
           'void main(){ vN = uR * aN; vP = aP; gl_Position = uM * vec4(aP, 1.0); }';
const FS = 'precision mediump float; varying vec3 vN; varying vec3 vP; uniform vec3 uC;' +
           'void main(){' +
           '  vec3 n = normalize(vN);' +
           '  vec3 luce = normalize(vec3(-0.55, 0.65, 0.75));' +
           '  float d = max(dot(n, luce), 0.0);' +
           '  float riempi = max(dot(n, normalize(vec3(0.7, 0.2, 0.6))), 0.0) * 0.22;' +
           '  float bordo = pow(1.0 - max(n.z, 0.0), 2.5) * 0.18;' +
           '  vec3 h = normalize(luce + vec3(0.0, 0.0, 1.0));' +
           '  float spec = pow(max(dot(n, h), 0.0), 28.0) * 0.18;' +
           '  vec3 c = uC * (0.34 + 0.72 * d + riempi) + vec3(spec) - vec3(bordo * 0.4);' +
           '  gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);' +
           '}';

function moltiplica(a, b){
  const o = new Array(16).fill(0);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) for (let k = 0; k < 4; k++) o[j * 4 + i] += a[k * 4 + i] * b[j * 4 + k];
  return o;
}

function coloreRGB(c){
  const s = String(c || '').trim();
  let m = /^#?([0-9a-f]{6})$/i.exec(s);
  if (m){ const n = parseInt(m[1], 16); return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; }
  m = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(s);
  if (m) return [m[1] / 255, m[2] / 255, m[3] / 255];
  return [.2, .4, .8];
}

const figurine = new Map();
let gl = null, tela = null, programma = null;

function prepara(){
  if (gl) return true;
  tela = document.createElement('canvas');
  gl = tela.getContext('webgl', {alpha: true, premultipliedAlpha: false, antialias: true, preserveDrawingBuffer: true});
  if (!gl) return false;
  const sh = function(tipo, src){
    const s = gl.createShader(tipo); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  programma = gl.createProgram();
  gl.attachShader(programma, sh(gl.VERTEX_SHADER, VS));
  gl.attachShader(programma, sh(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(programma);
  return true;
}

/* La figurina: tela 2D con il manichino, la base dei piedi in basso al centro.
   inclinazione = i gradi del campo: la figura si vede un po' dall'alto. */
const DIREZIONI = 16;          // le figure si disegnano girate in 16 direzioni

/* giro: dove guarda, in radianti sul campo (0 = verso chi guarda lo schermo,
   pi/2 = verso destra). Si arrotonda a una delle 16 direzioni. */
function figurinaManichino(coloreMaglia, inclinazione, giro){
  const gradi = Math.round((inclinazione || 0) / 5) * 5;
  const passo = Math.PI * 2 / DIREZIONI;
  const quale = ((Math.round((giro || 0) / passo) % DIREZIONI) + DIREZIONI) % DIREZIONI;
  const g = quale * passo;
  const chiave = coloreMaglia + '|' + gradi + '|' + quale;
  if (figurine.has(chiave)) return figurine.get(chiave);
  try { if (!prepara()) return null; } catch (e) { return null; }

  const maglia = coloreRGB(coloreMaglia);
  const pantaloncini = maglia.map(function(v){ return v * .72; });
  const pezzi = corpo(maglia, pantaloncini);

  const A = 420, L = 240;
  tela.width = L; tela.height = A;
  gl.viewport(0, 0, L, A);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  gl.useProgram(programma);

  /* la camera: davanti, alzata dell'inclinazione del campo; proiezione ortogonale */
  const a = -gradi * .6 * Math.PI / 180;
  const ca = Math.cos(a), sa = Math.sin(a);
  const R = [1, 0, 0, 0,  0, ca, sa, 0,  0, -sa, ca, 0,  0, 0, 0, 1];
  /* il giro attorno all'asse verticale: il davanti (z) va verso (sin g, 0, cos g) */
  const cg = Math.cos(g), sg = Math.sin(g);
  const G = [cg, 0, -sg, 0,  0, 1, 0, 0,  sg, 0, cg, 0,  0, 0, 0, 1];
  const mezzaL = .4, basso = -.05, alto = 1.85;
  const O = [1 / mezzaL, 0, 0, 0,  0, 2 / (alto - basso), 0, 0,  0, 0, -1, 0,  0, -(alto + basso) / (alto - basso), 0, 1];
  const T = [1, 0, 0, 0,  0, 1, 0, 0,  0, 0, 1, 0,  0, 0, 0, 1];
  const M = moltiplica(O, moltiplica(R, moltiplica(G, T)));
  const RG = moltiplica(R, G);
  gl.uniformMatrix4fv(gl.getUniformLocation(programma, 'uM'), false, new Float32Array(M));
  gl.uniformMatrix3fv(gl.getUniformLocation(programma, 'uR'), false,
    new Float32Array([RG[0], RG[1], RG[2], RG[4], RG[5], RG[6], RG[8], RG[9], RG[10]]));
  const uC = gl.getUniformLocation(programma, 'uC');
  const aP = gl.getAttribLocation(programma, 'aP'), aN = gl.getAttribLocation(programma, 'aN');

  pezzi.forEach(function(p){
    const bp = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bp);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p.pos), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aP); gl.vertexAttribPointer(aP, 3, gl.FLOAT, false, 0, 0);
    const bn = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bn);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p.nor), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aN); gl.vertexAttribPointer(aN, 3, gl.FLOAT, false, 0, 0);
    const bi = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bi);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(p.idx), gl.STATIC_DRAW);
    gl.uniform3fv(uC, new Float32Array(p.colore));
    gl.drawElements(gl.TRIANGLES, p.idx.length, gl.UNSIGNED_SHORT, 0);
    gl.deleteBuffer(bp); gl.deleteBuffer(bn); gl.deleteBuffer(bi);
  });

  /* si copia in una tela 2D: quella WebGL si riusa per il colore dopo */
  const copia = document.createElement('canvas');
  copia.width = L; copia.height = A;
  copia.getContext('2d').drawImage(tela, 0, 0);
  /* dove stanno piedi e petto nella figurina, in frazioni dell'altezza */
  const yPiedi = alto / (alto - basso), yPetto = (alto - 1.3) / (alto - basso);
  const figurina = {tela: copia, rapporto: L / A, piedi: yPiedi, petto: yPetto, alta: alto - basso,
                    giro: g, davanti: Math.cos(g) > -0.2};
  figurine.set(chiave, figurina);
  return figurina;
}

return { DIREZIONI, figurinaManichino };
})();
/* ---- src/renderer/ui/campo.js ---- */
const __vdm_src_renderer_ui_campo_js = (function(){
/* Disegno del campo e di quello che ci sta sopra.
   Le frecce e i cerchi vuoti non si salvano: si ricavano confrontando la fase
   con quella precedente. Un dato in meno da tenere coerente. */

const { COLORI_ZONA, testoMisura, percorsoPalla, curva, puntoLungo } = __vdm_src_renderer_core_modello_js;
const { figurinaManichino } = __vdm_src_renderer_ui_manichino_js;

const NS = 'http://www.w3.org/2000/svg';

/* La camera sta a questa distanza, in larghezze del campo: piu' vicina
   = prospettiva piu' spinta. */
const DISTANZA_CAMERA = 1.6;

/* Un punto del prato (X, Y rispetto al centro, in pixel del campo piatto)
   visto col campo inclinato di "gradi": dove cade sullo schermo, rispetto
   al centro. s e' quanto quel punto appare ingrandito (vicino > 1). */
function proiettaPiano(X, Y, larghezza, gradi, giro){
  /* giro: il campo ruotato su se' stesso per cambiare punto di vista (gradi) */
  if (giro){
    const g = giro * Math.PI / 180, cg = Math.cos(g), sg = Math.sin(g);
    const x2 = X * cg - Y * sg, y2 = X * sg + Y * cg;
    X = x2; Y = y2;
  }
  const a = gradi * Math.PI / 180, P = DISTANZA_CAMERA * larghezza;
  const z = Y * Math.sin(a);
  const s = P / (P - z);
  return {x: X * s, y: Y * Math.cos(a) * s, s: s};
}

/* Il contrario: dal punto dello schermo (rispetto al centro) al prato. */
function pianoDaSchermo(sx, sy, larghezza, gradi, giro){
  const a = gradi * Math.PI / 180, P = DISTANZA_CAMERA * larghezza;
  const Y = P * sy / (P * Math.cos(a) + sy * Math.sin(a));
  const s = P / (P - Y * Math.sin(a));
  let x = sx / s, y = Y;
  if (giro){
    const g = -giro * Math.PI / 180, cg = Math.cos(g), sg = Math.sin(g);
    const x2 = x * cg - y * sg, y2 = x * sg + y * cg;
    x = x2; y = y2;
  }
  return {x: x, y: y};
}

/* i quattro angoli del campo visti in prospettiva, e i fianchi che si vedono:
   quelli rivolti verso chi guarda (servono allo spessore del pavimento) */
function angoliInVista(w, h, gradi, giro){
  const angoli = [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]].map(function(c){
    return proiettaPiano(c[0], c[1], w, gradi, giro);
  });
  const g = (giro || 0) * Math.PI / 180;
  const normali = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  const fianchi = [];
  normali.forEach(function(n, i){
    const verso = n[0] * Math.sin(g) + n[1] * Math.cos(g);    // quanto guarda verso chi osserva
    if (verso > .05) fianchi.push([angoli[i], angoli[(i + 1) % 4], verso]);
  });
  return {angoli: angoli, fianchi: fianchi};
}

/* ---- le pedine in piedi ----
 * Col campo inclinato le pedine non si sdraiano sul prato: stanno in piedi,
 * come cilindri con il numero davanti, e la palla e' una sfera sollevata.
 * Si disegnano su una tela 2D sopra il campo (nell'editor) o sopra
 * l'immagine piegata (nel video), con la stessa proiezione.
 *   pedine: [{lato, x, y, numero, fondo, testo, opacita, selezionata, raggio}]
 *   proietta(x, y) -> {sx, sy, k}: punto a terra sullo schermo e pixel per unita'
 *   colore(c): risolve 'var(--casa)' in un colore vero */
function schiarisci(hex, f){
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map(function(v){
    return Math.round(f >= 0 ? v + (255 - v) * f : v * (1 + f));
  });
  return 'rgb(' + c.join(',') + ')';
}

/* il pallone da basket: arancione con le cuciture nere */
function pallaDaBasket(ctx, cx, cy, r){
  const g = ctx.createRadialGradient(cx - r * .35, cy - r * .4, r * .1, cx, cy, r);
  g.addColorStop(0, '#FFB26B'); g.addColorStop(.5, '#E8701E'); g.addColorStop(1, '#8E3B08');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
  ctx.strokeStyle = '#1B1206'; ctx.lineWidth = Math.max(.5, r * .09); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke();                 // equatore
  ctx.beginPath(); ctx.ellipse(cx, cy, r * .28, r, 0, 0, Math.PI * 2); ctx.stroke();              // meridiano
  ctx.beginPath(); ctx.arc(cx - r * 1.35, cy, r * .95, -Math.PI / 3, Math.PI / 3); ctx.stroke();  // curve ai lati
  ctx.beginPath(); ctx.arc(cx + r * 1.35, cy, r * .95, Math.PI * 2 / 3, Math.PI * 4 / 3); ctx.stroke();
  ctx.restore();
  ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = Math.max(.5, r * .06);
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
}

/* un tratto arrotondato: braccia e gambe */
function arto(ctx, x1, y1, x2, y2, spessore, colore){
  ctx.strokeStyle = colore; ctx.lineWidth = spessore; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
}

/* ---- la giocatrice in piedi: un manichino con le proporzioni vere ----
 * Alta otto teste, in posa ad A (le braccia staccate dal corpo), spalle coi
 * deltoidi, vita stretta, cosce, ginocchia e polpacci modellati; sopra la
 * canotta e i pantaloncini della squadra. Si disegna una volta per colore su
 * una tela a parte e poi si riusa: dieci figure in movimento restano fluide.
 * Coordinate della sagoma: altezza 1, piedi a y = 0, verso l'alto negativo. */
const MANICHINO = {chiaro: '#F4EFEA', medio: '#DCD3CB', scuro: '#A99D93', contorno: 'rgba(80,66,56,.35)'};
const sagome = new Map();

function sagomaGiocatrice(base){
  const chiave = String(base);
  if (sagome.has(chiave)) return sagome.get(chiave);
  const A = 360, L = Math.round(A * .62);
  const tela = document.createElement('canvas');
  tela.width = L; tela.height = A;
  const c = tela.getContext('2d');
  const cx = L / 2, piedi = A - 6, u = A - 12;
  const P = function(x, y){ return [cx + x * u, piedi + y * u]; };

  /* un arto: una fila di punti con la loro mezza larghezza, chiuso con i capi tondi */
  function arto(punti, luce){
    const sx = [], dx = [];
    for (let i = 0; i < punti.length; i++){
      const a = punti[Math.max(0, i - 1)], b = punti[Math.min(punti.length - 1, i + 1)];
      let tx = b[0] - a[0], ty = b[1] - a[1];
      const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
      const w = punti[i][2];
      sx.push(P(punti[i][0] - ty * w, punti[i][1] + tx * w));
      dx.push(P(punti[i][0] + ty * w, punti[i][1] - tx * w));
    }
    c.beginPath();
    c.moveTo(sx[0][0], sx[0][1]);
    for (let i = 1; i < sx.length; i++){
      const m = [(sx[i - 1][0] + sx[i][0]) / 2, (sx[i - 1][1] + sx[i][1]) / 2];
      c.quadraticCurveTo(sx[i - 1][0], sx[i - 1][1], m[0], m[1]);
    }
    c.lineTo(sx[sx.length - 1][0], sx[sx.length - 1][1]);
    const fine = P(punti[punti.length - 1][0], punti[punti.length - 1][1]);
    c.arc(fine[0], fine[1], punti[punti.length - 1][2] * u, 0, Math.PI * 2);
    c.moveTo(dx[dx.length - 1][0], dx[dx.length - 1][1]);
    for (let i = dx.length - 2; i >= 0; i--){
      const m = [(dx[i + 1][0] + dx[i][0]) / 2, (dx[i + 1][1] + dx[i][1]) / 2];
      c.quadraticCurveTo(dx[i + 1][0], dx[i + 1][1], m[0], m[1]);
    }
    c.lineTo(dx[0][0], dx[0][1]);
    c.lineTo(sx[0][0], sx[0][1]);
    const inizio = P(punti[0][0], punti[0][1]);
    c.moveTo(inizio[0] + punti[0][2] * u, inizio[1]);
    c.arc(inizio[0], inizio[1], punti[0][2] * u, 0, Math.PI * 2);
    riempi(punti, luce);
  }
  /* la luce viene da sinistra: ogni parte ha il suo chiaroscuro */
  function riempi(punti, luce){
    let xmin = Infinity, xmax = -Infinity;
    punti.forEach(function(q){ xmin = Math.min(xmin, q[0] - q[2]); xmax = Math.max(xmax, q[0] + q[2]); });
    const g = c.createLinearGradient(cx + xmin * u, 0, cx + xmax * u, 0);
    g.addColorStop(0, luce ? MANICHINO.chiaro : MANICHINO.medio);
    g.addColorStop(.45, MANICHINO.medio);
    g.addColorStop(1, MANICHINO.scuro);
    c.fillStyle = g;
    c.fill('nonzero');
    c.strokeStyle = MANICHINO.contorno; c.lineWidth = 1.1; c.stroke();
  }

  /* gambe: coscia, ginocchio, polpaccio, caviglia */
  [-1, 1].forEach(function(s){
    arto([[s * .058, -.47, .062], [s * .06, -.36, .052], [s * .052, -.265, .036],
          [s * .054, -.19, .041], [s * .05, -.1, .03], [s * .048, -.035, .021]], s < 0);
    const piede = P(s * .058, -.012);
    c.beginPath(); c.ellipse(piede[0], piede[1], .036 * u, .016 * u, s * .25, 0, Math.PI * 2);
    c.fillStyle = MANICHINO.scuro; c.fill();
  });
  /* braccia in posa ad A: deltoide, gomito, polso, mano */
  [-1, 1].forEach(function(s){
    arto([[s * .125, -.795, .04], [s * .16, -.7, .033], [s * .19, -.615, .029],
          [s * .22, -.54, .026], [s * .238, -.47, .019]], s < 0);
    const mano = P(s * .248, -.435);
    c.beginPath(); c.ellipse(mano[0], mano[1], .019 * u, .033 * u, -s * .25, 0, Math.PI * 2);
    c.fillStyle = s < 0 ? MANICHINO.medio : MANICHINO.scuro; c.fill();
  });
  /* busto: trapezi, spalle, torace, vita, bacino */
  c.beginPath();
  const T = function(x, y){ return P(x, y); };
  const m = function(x, y){ const q = T(x, y); c.moveTo(q[0], q[1]); };
  const q2 = function(x1, y1, x2, y2){ const a = T(x1, y1), b = T(x2, y2); c.quadraticCurveTo(a[0], a[1], b[0], b[1]); };
  m(-.04, -.865);
  q2(-.085, -.84, -.128, -.812);
  q2(-.15, -.79, -.118, -.725);
  q2(-.1, -.66, -.084, -.6);
  q2(-.1, -.55, -.108, -.5);
  q2(-.1, -.465, -.05, -.455);
  q2(0, -.44, .05, -.455);
  q2(.1, -.465, .108, -.5);
  q2(.1, -.55, .084, -.6);
  q2(.1, -.66, .118, -.725);
  q2(.15, -.79, .128, -.812);
  q2(.085, -.84, .04, -.865);
  c.closePath();
  riempi([[-.15, 0, 0], [.15, 0, 0]], true);
  /* collo e testa */
  c.beginPath();
  const collo = T(0, -.868);
  c.ellipse(collo[0], collo[1], .036 * u, .03 * u, 0, 0, Math.PI * 2);
  riempi([[-.036, 0, 0], [.036, 0, 0]], true);
  const tc = T(0, -.935);
  const gt = c.createRadialGradient(tc[0] - .02 * u, tc[1] - .02 * u, .01 * u, tc[0], tc[1], .07 * u);
  gt.addColorStop(0, MANICHINO.chiaro); gt.addColorStop(.7, MANICHINO.medio); gt.addColorStop(1, MANICHINO.scuro);
  c.beginPath(); c.ellipse(tc[0], tc[1], .05 * u, .064 * u, 0, 0, Math.PI * 2);
  c.fillStyle = gt; c.fill(); c.strokeStyle = MANICHINO.contorno; c.lineWidth = 1.1; c.stroke();

  /* canotta della squadra: spalline, giro manica profondo, fino ai fianchi */
  const scuro = schiarisci(base, -.3), chiaro = schiarisci(base, .25);
  const gm = c.createLinearGradient(cx - .12 * u, 0, cx + .12 * u, 0);
  gm.addColorStop(0, chiaro); gm.addColorStop(.5, base); gm.addColorStop(1, scuro);
  c.beginPath();
  m(-.06, -.845);
  q2(-.078, -.84, -.092, -.83);
  q2(-.094, -.76, -.1, -.705);
  q2(-.088, -.64, -.086, -.6);
  q2(-.102, -.55, -.11, -.505);
  q2(0, -.49, .11, -.505);
  q2(.102, -.55, .086, -.6);
  q2(.088, -.64, .1, -.705);
  q2(.094, -.76, .092, -.83);
  q2(.078, -.84, .06, -.845);
  q2(0, -.765, -.06, -.845);
  c.closePath();
  c.fillStyle = gm; c.fill();
  c.strokeStyle = 'rgba(0,0,0,.28)'; c.lineWidth = 1.2; c.stroke();
  /* pantaloncini: larghi, fin sopra il ginocchio */
  const gp = c.createLinearGradient(cx - .13 * u, 0, cx + .13 * u, 0);
  gp.addColorStop(0, schiarisci(base, .05)); gp.addColorStop(1, schiarisci(base, -.45));
  c.beginPath();
  m(-.112, -.515);
  q2(0, -.5, .112, -.515);
  q2(.125, -.42, .13, -.335);
  q2(.07, -.325, .01, -.335);
  q2(0, -.4, -.01, -.335);
  q2(-.07, -.325, -.13, -.335);
  q2(-.125, -.42, -.112, -.515);
  c.closePath();
  c.fillStyle = gp; c.fill();
  c.strokeStyle = 'rgba(0,0,0,.28)'; c.lineWidth = 1.2; c.stroke();

  const sagoma = {tela: tela, larghezza: L / u, altezza: A / u, piedi: (A - piedi) / u};
  sagome.set(chiave, sagoma);
  return sagoma;
}

/* l'altezza per ruolo: il 5 e' la piu' alta, poi il 4, e l'1 la piu' bassa
   (vale anche per la difesa: X5 come il 5). Gli altri numeri, altezza media. */
const ALTEZZE_RUOLO = {1: .9, 2: .95, 3: 1, 4: 1.05, 5: 1.1};
/* quanto e' alta una figura, in raggi della pedina (18/09: un filo piu' grandi) */
const FIGURA = 6.0;
/* il canestro ha la sua scala: le giocatrici un po' piu' grandi del vero,
   perche' si vedano bene accanto al ferro */
const FIGURA_CANESTRO = 5.2;
function altezzaRuolo(numero){
  const m = /(\d+)/.exec(String(numero == null ? '' : numero));
  return m && ALTEZZE_RUOLO[+m[1]] ? ALTEZZE_RUOLO[+m[1]] : 1;
}

function omino(ctx, p, R, ry, base, colore, gradi){
  const x = p.sx, piedi = p.sy;
  const H = R * FIGURA * altezzaRuolo(p.numero);   // altezza della figura sullo schermo
  /* il manichino 3D, girato dove va; senza scheda grafica, la sagoma 2D */
  const m = figurinaManichino(base, gradi, p.giro || 0);
  if (m){
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,.16)';
    ctx.beginPath();
    ctx.ellipse(x - H * .2, piedi - ry * .25, H * .24, Math.max(ry * .3, H * .035), -.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    const hs = H / 1.8 * m.alta, ws = hs * m.rapporto;
    ctx.drawImage(m.tela, x - ws / 2, piedi - hs * m.piedi, ws, hs);
    const numero = String(p.numero == null ? '' : p.numero);
    if (numero){
      /* il numero sulla canotta: davanti o sulla schiena, girato con lei */
      /* grande e chiaro: da lontano si riconosce il ruolo */
      const dim = H * (numero.length > 1 ? .13 : .17);
      const larghezza = Math.max(.5, Math.abs(Math.cos(m.giro)));
      ctx.save();
      ctx.translate(x + Math.sin(m.giro) * H * .02, piedi - H * (1.2 / 1.8));
      ctx.scale(larghezza, 1);
      ctx.font = '900 ' + dim.toFixed(1) + 'px -apple-system,"Helvetica Neue","Segoe UI",Arial,sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.lineWidth = Math.max(1.4, H * .03); ctx.strokeStyle = 'rgba(0,0,0,.8)';
      ctx.lineJoin = 'round';
      ctx.strokeText(numero, 0, 0);
      ctx.fillStyle = colore(p.testo) || '#fff';
      ctx.fillText(numero, 0, 0);
      ctx.restore();
    }
    if (p.conPalla){
      /* la palla nella mano destra, che gira con lei */
      const k = H / 1.8;
      pallaDaBasket(ctx, x + (.33 * Math.cos(m.giro) + .06 * Math.sin(m.giro)) * k,
                         piedi - .9 * k, H * .062);
    }
    return;
  }
  const s = sagomaGiocatrice(base);
  /* l'ombra portata, lunga verso dietro a sinistra come con la luce di lato */
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,.16)';
  ctx.beginPath();
  ctx.ellipse(x - H * .2, piedi - ry * .25, H * .26, Math.max(ry * .32, H * .035), -.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  const w = H * s.larghezza, h = H * s.altezza;
  ctx.drawImage(s.tela, x - w / 2, piedi - h + H * s.piedi, w, h);
  /* il numero sulla canotta */
  const numero = String(p.numero == null ? '' : p.numero);
  if (numero){
    const dim = H * (numero.length > 1 ? .075 : .09);
    ctx.font = '900 ' + dim.toFixed(1) + 'px -apple-system,"Helvetica Neue","Segoe UI",Arial,sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.lineWidth = Math.max(.6, H * .012); ctx.strokeStyle = 'rgba(0,0,0,.35)';
    ctx.strokeText(numero, x, piedi - H * .675);
    ctx.fillStyle = colore(p.testo) || '#fff';
    ctx.fillText(numero, x, piedi - H * .675);
  }
  /* la palla in mano */
  if (p.conPalla) pallaDaBasket(ctx, x + H * .27, piedi - H * .45, H * .062);
}

/* ---- lo spessore del pavimento ----
 * Col campo inclinato si vede anche il fianco davanti della tavola: una fascia
 * sotto il bordo vicino, come un parquet appoggiato. sx/dx: i due angoli
 * vicini sullo schermo; spessore in pixel. */
function disegnaSpessore(ctx, sx, dx, spessore){
  if (!(spessore > 0)) return;
  ctx.save();
  const g = ctx.createLinearGradient(0, Math.min(sx.y, dx.y), 0, Math.max(sx.y, dx.y) + spessore);
  g.addColorStop(0, '#8C97AB'); g.addColorStop(.25, '#76829A'); g.addColorStop(1, '#4F5A70');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(sx.x, sx.y); ctx.lineTo(dx.x, dx.y);
  ctx.lineTo(dx.x, dx.y + spessore); ctx.lineTo(sx.x, sx.y + spessore);
  ctx.closePath(); ctx.fill();
  /* lo spigolo in alto prende la luce */
  ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = Math.max(1, spessore * .08);
  ctx.beginPath(); ctx.moveTo(sx.x, sx.y + ctx.lineWidth / 2); ctx.lineTo(dx.x, dx.y + ctx.lineWidth / 2); ctx.stroke();
  /* e sotto, un'ombra morbida sullo sfondo */
  const o = ctx.createLinearGradient(0, Math.min(sx.y, dx.y) + spessore, 0, Math.max(sx.y, dx.y) + spessore * 2.2);
  o.addColorStop(0, 'rgba(10,20,40,.28)'); o.addColorStop(1, 'rgba(10,20,40,0)');
  ctx.fillStyle = o;
  ctx.beginPath();
  ctx.moveTo(sx.x, sx.y + spessore); ctx.lineTo(dx.x, dx.y + spessore);
  ctx.lineTo(dx.x, dx.y + spessore * 2.2); ctx.lineTo(sx.x, sx.y + spessore * 2.2);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

/* Il canestro in 3D: palo, braccio, tabellone di vetro, ferro e retina.
 * Il ferro sta sopra il cerchio disegnato; tutto il resto ha le misure vere
 * (FIBA) nella scala delle giocatrici, cosi' e' proporzionato a loro: il
 * ferro a 3,05 m sopra le teste, grande il doppio della palla. Un punto (a lungo la
 * direzione verso il fondo, b di lato, z in altezza, in metri) va sullo
 * schermo proiettando il punto a terra e alzandolo come si alzano le figure. */
function disegnaCanestro(ctx, c, proietta, raggio, unita){
  const f = raggio * FIGURA_CANESTRO / (1.8 * unita);          // la scala delle figure, sul piano
  const nx = -c.dy, ny = c.dx;
  const P = function(a, b, z){
    const q = proietta(c.x + (c.dx * a + nx * b) * f * unita, c.y + (c.dy * a + ny * b) * f * unita);
    const m = raggio * q.k * FIGURA_CANESTRO / 1.8;            // pixel per metro in altezza
    return {x: q.sx, y: q.sy - z * m, m: m};
  };
  const linea = function(punti, colore, spessore){
    ctx.strokeStyle = colore; ctx.lineWidth = spessore;
    ctx.beginPath();
    punti.forEach(function(q, i){ if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); });
    ctx.stroke();
  };
  const cerchio = function(r, z, n){
    const punti = [];
    for (let i = 0; i <= n; i++){ const t = i / n * Math.PI * 2; punti.push(P(Math.cos(t) * r, Math.sin(t) * r, z)); }
    return punti;
  };
  const m0 = P(0, 0, 0).m;
  /* il palo resta appena fuori dalla linea di fondo, dentro il pavimento */
  const PALO = Math.max(1.3, (1.575 + 1.0) / f), BRACCIO = 3.3, VETRO = 0.375, FERRO = 3.05, RAGGIO_FERRO = 0.225;
  ctx.save();
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';

  const parti = {
    palo: function(){
      /* l'ombra a terra, la base imbottita e il palo */
      const base = P(PALO, 0, 0);
      ctx.fillStyle = 'rgba(0,0,0,.16)';
      ctx.beginPath(); ctx.ellipse(base.x, base.y, m0 * .7, m0 * .22, 0, 0, Math.PI * 2); ctx.fill();
      linea([P(PALO, 0, 0), P(PALO, 0, .9)], '#1F4E9C', Math.max(3, m0 * .38));
      linea([P(PALO, 0, .9), P(PALO, 0, BRACCIO + .05)], '#3A4150', Math.max(2, m0 * .15));
      linea([P(PALO, 0, BRACCIO), P(VETRO + .08, 0, BRACCIO)], '#3A4150', Math.max(1.6, m0 * .14));
      linea([P(PALO, 0, 2.35), P(VETRO + .08, 0, 3.0)], '#3A4150', Math.max(1.2, m0 * .09));
    },
    tabellone: function(){
      const angoli = [P(VETRO, -.9, 2.9), P(VETRO, .9, 2.9), P(VETRO, .9, 3.95), P(VETRO, -.9, 3.95)];
      ctx.fillStyle = 'rgba(214,230,245,.45)';
      ctx.beginPath(); angoli.forEach(function(q, i){ if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); }); ctx.closePath(); ctx.fill();
      linea(angoli.concat([angoli[0]]), '#1B1B1B', Math.max(1.4, m0 * .06));
      linea([P(VETRO, -.295, 2.9), P(VETRO, -.295, 3.35), P(VETRO, .295, 3.35), P(VETRO, .295, 2.9)], '#1B1B1B', Math.max(1.1, m0 * .045));
      /* il riflesso sul vetro */
      linea([P(VETRO, -.75, 3.85), P(VETRO, -.35, 3.1)], 'rgba(255,255,255,.7)', Math.max(1, m0 * .05));
    },
    ferro: function(){
      /* la retina: dal ferro a un cerchio piu' stretto, poi il ferro sopra */
      const su = cerchio(RAGGIO_FERRO, FERRO, 16), giu = cerchio(RAGGIO_FERRO * .6, FERRO - .42, 16);
      const rete = Math.max(.7, m0 * .018);
      for (let i = 0; i < 16; i++){
        linea([su[i], giu[i + 1]], 'rgba(90,100,115,.75)', rete);
        linea([su[i + 1], giu[i]], 'rgba(90,100,115,.75)', rete);
      }
      linea(giu, 'rgba(90,100,115,.75)', rete);
      linea([P(RAGGIO_FERRO, 0, FERRO), P(VETRO, 0, FERRO)], '#C4520F', Math.max(1.4, m0 * .06));
      linea(cerchio(RAGGIO_FERRO, FERRO, 28), '#FF6A13', Math.max(1.6, m0 * .06));
    }
  };
  /* prima quello che sta piu' lontano da chi guarda */
  const vicino = function(a){ return proietta(c.x + c.dx * a * f * unita, c.y + c.dy * a * f * unita).sy; };
  const ordine = [['palo', vicino(PALO)], ['tabellone', vicino(VETRO)], ['ferro', vicino(0)]]
    .sort(function(a, b){ return a[1] - b[1]; });
  /* visto da dietro il canestro, palo e tabellone stanno davanti al gioco:
     diventano trasparenti per non coprirlo */
  const davanti = vicino(PALO) > vicino(0);
  ordine.forEach(function(o){
    ctx.globalAlpha = davanti && o[0] !== 'ferro' ? (o[0] === 'palo' ? .28 : .7) : 1;
    parti[o[0]]();
  });
  ctx.restore();
}

/* Il punto piu' alto di quello che sta in piedi sul campo in prospettiva
 * (figure sui bordi, canestri): quanto posto lasciare sopra, nell'editor e
 * nel video. Coordinate rispetto al centro del campo, in pixel. */
function cimaInVista(w, h, gradi, giro, vb, sport){
  const scala = Math.min(w / vb.width, h / vb.height);
  const ox = (w - vb.width * scala) / 2, oy = (h - vb.height * scala) / 2;
  const R = sport.CAMPO.raggioGiocatore, basket = sport.NOTAZIONE === 'basket';
  const alta = R * scala * (basket ? FIGURA * 1.1 : 1.75 + 1);   // la figura piu' alta
  let cima = Infinity;
  angoliInVista(w, h, gradi, giro).angoli.forEach(function(p){ cima = Math.min(cima, p.y - alta * p.s); });
  if (basket && sport.canestri3D){
    const U = sport.UNITA_PER_METRO, f = R * FIGURA_CANESTRO / (1.8 * U);
    const palo = Math.max(1.3, (1.575 + 1.0) / f);
    sport.canestri3D().forEach(function(c){
      const nx = -c.dy, ny = c.dx;
      [[.375, -.9, 3.95], [.375, .9, 3.95], [palo, 0, 3.35]].forEach(function(q){
        const x = c.x + (c.dx * q[0] + nx * q[1]) * f * U, y = c.y + (c.dy * q[0] + ny * q[1]) * f * U;
        const p = proiettaPiano(ox + (x - vb.x) * scala - w / 2, oy + (y - vb.y) * scala - h / 2, w, gradi, giro);
        cima = Math.min(cima, p.y - q[2] * R * scala * p.s * FIGURA_CANESTRO / 1.8);
      });
    });
  }
  return cima;
}

function disegnaInPiedi(ctx, pedine, proietta, gradi, colore, stile){
  const omini = !!(stile && stile.omini);
  const giroVista = (stile && stile.giroVista || 0) * Math.PI / 180;
  const inclinazione = Math.sin(gradi * Math.PI / 180);
  const canestri = (omini && stile.canestri || []).map(function(c){
    return Object.assign({lato: 'canestro'}, c, proietta(c.x, c.y));
  });
  const lista = pedine.map(function(p){ return Object.assign({}, p, proietta(p.x, p.y)); })
    .concat(canestri)
    .sort(function(a, b){ return a.sy - b.sy; });
  lista.forEach(function(p){
    if (p.lato === 'canestro'){ disegnaCanestro(ctx, p, proietta, stile.raggio || 2.25, stile.unita || 3.75); return; }
    const R = p.raggio * p.k;
    if (!(R > 0.3)) return;
    ctx.save();
    ctx.globalAlpha = p.opacita == null ? 1 : Math.max(0, Math.min(1, p.opacita));
    const ry = Math.max(R * 0.28, R * inclinazione);
    if (p.lato === 'palla'){
      if (omini){
        /* la palla che vola: grande come in mano e all'altezza delle mani
           (mano a meta' altezza di una figura, palla 0,062 della figura) */
        const figura = R / 1.35 * 2.25 * FIGURA;
        ctx.fillStyle = 'rgba(0,0,0,.22)';
        ctx.beginPath(); ctx.ellipse(p.sx, p.sy, figura * .07, Math.max(ry * .2, figura * .02), 0, 0, Math.PI * 2); ctx.fill();
        pallaDaBasket(ctx, p.sx, p.sy - figura * .5, figura * .062);
        ctx.restore();
        return;
      }
      const alto = R * 2.4;
      ctx.fillStyle = 'rgba(0,0,0,.32)';
      ctx.beginPath(); ctx.ellipse(p.sx, p.sy, R * 0.9, ry * 0.9, 0, 0, Math.PI * 2); ctx.fill();
      const base = colore(p.fondo) || '#FF8A1F';
      const g = ctx.createRadialGradient(p.sx - R * .35, p.sy - alto - R * .35, R * .1, p.sx, p.sy - alto, R);
      g.addColorStop(0, schiarisci(base, .55)); g.addColorStop(.55, base); g.addColorStop(1, schiarisci(base, -.45));
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.sx, p.sy - alto, R, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = Math.max(.6, R * .08); ctx.stroke();
      ctx.restore();
      return;
    }
    const H = R * 1.75;
    const base = colore(p.fondo) || '#3D8BFD';
    /* ombra a terra (le figure hanno la loro ombra portata) */
    if (!omini){
      ctx.fillStyle = 'rgba(0,0,0,.35)';
      ctx.beginPath(); ctx.ellipse(p.sx + R * .18, p.sy + ry * .15, R * 1.12, ry * 1.12, 0, 0, Math.PI * 2); ctx.fill();
    }
    if (p.selezionata){
      ctx.strokeStyle = '#00e5ff'; ctx.lineWidth = Math.max(1.2, R * .14);
      ctx.setLineDash([R * .35, R * .25]);
      ctx.beginPath(); ctx.ellipse(p.sx, p.sy, R * 1.45, ry * 1.45, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
    }
    if (omini){ omino(ctx, Object.assign({}, p, {giro: (p.giro || 0) - giroVista}), R, ry, base, colore, gradi); ctx.restore(); return; }
    /* il corpo: un cilindro con la luce da sinistra */
    const corpo = ctx.createLinearGradient(p.sx - R, 0, p.sx + R, 0);
    corpo.addColorStop(0, schiarisci(base, -.35));
    corpo.addColorStop(.35, schiarisci(base, .18));
    corpo.addColorStop(1, schiarisci(base, -.5));
    ctx.fillStyle = corpo;
    ctx.beginPath();
    ctx.moveTo(p.sx - R, p.sy - H);
    ctx.lineTo(p.sx - R, p.sy);
    ctx.ellipse(p.sx, p.sy, R, ry, 0, Math.PI, 0, true);
    ctx.lineTo(p.sx + R, p.sy - H);
    ctx.closePath();
    ctx.fill();
    /* il cappello */
    ctx.fillStyle = schiarisci(base, .25);
    ctx.beginPath(); ctx.ellipse(p.sx, p.sy - H, R, ry, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = Math.max(.6, R * .07); ctx.stroke();
    /* il numero davanti */
    const numero = String(p.numero == null ? '' : p.numero);
    if (numero){
      const dimensione = R * (numero.length > 1 ? .92 : 1.12);
      ctx.font = '800 ' + dimensione.toFixed(1) + 'px -apple-system,"Helvetica Neue","Segoe UI",Arial,sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = colore(p.testo) || '#fff';
      ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = R * .15;
      ctx.fillText(numero, p.sx, p.sy - H * .48);
    }
    if (p.conPalla){
      const r = R * .55, bx = p.sx + R * .95, by = p.sy - H - r * .2;
      const gp = ctx.createRadialGradient(bx - r * .35, by - r * .35, r * .1, bx, by, r);
      gp.addColorStop(0, '#FFC58A'); gp.addColorStop(.55, '#F28C28'); gp.addColorStop(1, '#9A4A0A');
      ctx.shadowBlur = 0;
      ctx.fillStyle = gp;
      ctx.beginPath(); ctx.arc(bx, by, r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  });
}

function el(nome, attr, testo){
  const n = document.createElementNS(NS, nome);
  for (const k in attr) n.setAttribute(k, attr[k]);
  if (testo != null) n.textContent = testo;
  return n;
}
function svuota(g){ while (g.firstChild) g.removeChild(g.firstChild); }

/* Ogni campo ha i suoi nomi per punte di freccia, righe e aloni: con piu'
   campi nella stessa pagina (le anteprime del playbook) un nome condiviso
   farebbe sparire le frecce quando il primo campo viene nascosto. */
let campiCreati = 0;

function Campo(svg, sport){
  const R = sport.CAMPO.raggioGiocatore;
  const suffisso = '-c' + (++campiCreati);
  const rif = function(nome){ return 'url(#' + nome + suffisso + ')'; };
  /* il basket si disegna nella stessa scala del calcio (vedi sport/basket.js):
     le misure scritte si riportano in metri veri */
  const UNITA = sport.UNITA_PER_METRO || 1;
  /* la notazione dei diagrammi: nel basket il taglio e' una linea piena, il
     passaggio e' tratteggiato, il palleggio va a zig-zag, il blocco finisce a T */
  const BASKET = sport.NOTAZIONE === 'basket';
  /* il diagramma come nel playbook di carta: campo bianco, numeri neri, la
     palla e' il cerchio attorno al numero di chi ce l'ha */
  const CLASSICO = sport.STILE === 'classico';

  const gCampo   = el('g', {'class':'linee'});
  const gZone    = el('g');
  const gLinee   = el('g');
  const gEvidenze = el('g');
  const gOmbre   = el('g');
  const gFrecce  = el('g');
  const gPedine  = el('g');
  /* le scritte stanno sopra a tutto, come nei video di analisi: sotto le
     pedine e le frecce non si leggevano. Non prendono i clic. */
  const gEtichette = el('g', {'pointer-events':'none'});
  /* le scritte si cliccano e si trascinano: stanno sopra le pedine */
  const gScritte = el('g');
  const gAnteprima = el('g', {'pointer-events':'none'});

  const erba = el('rect', {fill:'var(--erba)'});
  svg.appendChild(defs());
  svg.appendChild(erba);
  svg.appendChild(gCampo);
  svg.appendChild(gZone);
  svg.appendChild(gLinee);
  svg.appendChild(gEvidenze);
  svg.appendChild(gOmbre);
  svg.appendChild(gFrecce);
  svg.appendChild(gPedine);
  svg.appendChild(gScritte);
  svg.appendChild(gEtichette);
  svg.appendChild(gAnteprima);

  /* il campo che si vede: intero (105 x 68) oppure un'area ridotta, con un
     margine attorno per chi aspetta fuori e per gli attrezzi */
  let chiaveCampo = null;
  let limiti = null;
  function impostaCampo(area){
    const chiave = area && area.lunghezza ? area.lunghezza + 'x' + area.larghezza : 'intero';
    if (chiave === chiaveCampo) return;
    chiaveCampo = chiave;
    let x0, y0, larga, alta;
    if (area && area.lunghezza){
      const margine = Math.max(6, Math.round(Math.min(area.lunghezza, area.larghezza) * 0.22));
      x0 = -margine; y0 = -margine; larga = area.lunghezza + 2 * margine; alta = area.larghezza + 2 * margine;
      svuota(gCampo);
      gCampo.appendChild(el('rect', {x:0, y:0, width:area.lunghezza, height:area.larghezza,
        fill:'none', stroke:'var(--riga)', 'stroke-width':'.32'}));
    } else {
      const m = sport.MARGINE || 3;
      x0 = -m; y0 = -m; larga = sport.CAMPO.lunghezza + 2 * m; alta = sport.CAMPO.larghezza + 2 * m;
      disegnaLinee();
    }
    svg.setAttribute('viewBox', x0 + ' ' + y0 + ' ' + larga + ' ' + alta);
    erba.setAttribute('x', x0); erba.setAttribute('y', y0);
    erba.setAttribute('width', larga); erba.setAttribute('height', alta);
    limiti = {minX: x0 + 1, minY: y0 + 1, maxX: x0 + larga - 1, maxY: y0 + alta - 1};
    applicaProspettiva();
  }

  /* ---- prospettiva ----
   * Il campo si inclina all'indietro come nei video di analisi (rotateX con
   * la camera davanti). Tutto quello che e' disegnato sul prato si inclina
   * con lui. Nell'editor lo fa il browser (CSS 3D); per i clic serve il
   * conto inverso, perche' getScreenCTM non conosce la prospettiva.
   * La stessa geometria (proiettaPiano) serve al video, che piega
   * l'immagine piatta con la scheda grafica. */
  let angolo = 0, giroVista = 0;
  function impostaProspettiva(gradi, giro){
    const nuovo = +gradi || 0, nuovoGiro = +giro || 0;
    if (nuovo === angolo && nuovoGiro === giroVista) return;
    angolo = nuovo;
    giroVista = nuovoGiro;
    applicaProspettiva();
  }

  function applicaProspettiva(){
    const palco = svg.parentElement;
    if (!palco || !palco.classList || !palco.classList.contains('palco')) return;
    const cornice = palco.parentElement;
    if (!angolo){
      if (tela){ tela.remove(); tela = null; }
      /* anche quelle di un campo di prima, se questa cornice ne aveva uno in 3D */
      cornice.querySelectorAll('canvas.pedine-in-piedi').forEach(function(c){ c.remove(); });
      mostraPiatte(true);
      svg.style.transform = '';
      svg.style.width = ''; svg.style.marginLeft = ''; svg.style.marginRight = '';
      palco.style.perspective = '';
      palco.style.marginTop = '';
      cornice.style.height = '';
      cornice.classList.remove('in-prospettiva');
      return;
    }
    /* il campo inclinato (e magari ruotato) sporge piu' del suo riquadro: si
       stringe quanto basta perche' tutti e quattro gli angoli stiano dentro */
    const vb = svg.viewBox.baseVal;
    const prova = angoliInVista(1, vb.height / vb.width, angolo, giroVista).angoli;
    const sporge = Math.max.apply(null, prova.map(function(p){ return Math.abs(p.x); })) * 2;
    /* girato, il campo si allunga anche in altezza: non piu' alto che visto di fronte */
    const altezzaDi = function(a){ const ys = a.map(function(p){ return p.y; }); return Math.max.apply(null, ys) - Math.min.apply(null, ys); };
    let allunga = 1;
    if (giroVista){
      const diFronte = angoliInVista(1, vb.height / vb.width, angolo, 0).angoli;
      const sporgeDiFronte = Math.max(1, Math.max.apply(null, diFronte.map(function(p){ return Math.abs(p.x); })) * 2);
      allunga = sporgeDiFronte * altezzaDi(prova) / altezzaDi(diFronte);
    }
    svg.style.width = (100 / Math.max(1, sporge, allunga) * 0.98).toFixed(2) + '%';
    svg.style.marginLeft = 'auto'; svg.style.marginRight = 'auto';
    const w = svg.clientWidth, h = svg.clientHeight;
    if (!w || !h) return;
    palco.style.perspective = (DISTANZA_CAMERA * w) + 'px';
    palco.style.perspectiveOrigin = '50% 50%';
    svg.style.transformOrigin = '50% 50%';
    /* prima si gira il campo su se' stesso, poi si inclina */
    svg.style.transform = 'rotateX(' + angolo + 'deg)' + (giroVista ? ' rotateZ(' + giroVista + 'deg)' : '');
    const vistiAngoli = angoliInVista(w, h, angolo, giroVista).angoli;
    const alto = Math.min.apply(null, vistiAngoli.map(function(p){ return p.y; }));
    const basso = Math.max.apply(null, vistiAngoli.map(function(p){ return p.y; }));
    const margine = 10;
    /* sopra c'e' posto per quello che sta in piedi: figure e canestri */
    const testa = Math.max(0, Math.ceil(alto - cimaInVista(w, h, angolo, giroVista, vb, sport) + 6));
    cornice.classList.add('in-prospettiva');
    const spessorePavimento = Math.round(w * .022);
    cornice.style.height = Math.ceil(basso - alto + 2 * margine + testa + spessorePavimento * 2) + 'px';
    palco.style.marginTop = Math.round(margine + testa - (h/2 + alto)) + 'px';
    alzaPedine();
  }

  /* ---- le pedine in piedi nell'editor ---- */
  let tela = null;
  function mostraPiatte(si){
    gPedine.querySelectorAll('.pedina').forEach(function(g){
      if (g.dataset.lato === 'attrezzo') return;
      g.style.opacity = si ? '' : '0';
    });
  }
  /* dove guarda ogni giocatrice: si gira verso dove si muove, piano piano;
     da ferma resta com'era. All'inizio l'attacco guarda il canestro (verso
     chi guarda lo schermo), la difesa l'attacco (le spalle al canestro). */
  const direzioni = new Map(), ultimePosizioni = new Map();
  function direzioneDi(id, lato, x, y){
    let giro = direzioni.has(id) ? direzioni.get(id) : (lato === 'avversari' ? Math.PI : 0);
    const prima = ultimePosizioni.get(id);
    if (prima){
      const dx = x - prima.x, dy = y - prima.y;
      if (Math.hypot(dx, dy) > .08){
        const voluto = Math.atan2(dx, dy);
        let diff = voluto - giro;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        giro += diff * .35;
      }
    }
    ultimePosizioni.set(id, {x: x, y: y});
    direzioni.set(id, giro);
    return giro;
  }
  /* quello che serve per rialzarle, letto dalle pedine piatte (anche mentre
     se ne trascina una) */
  function pedineInPiedi(){
    const lista = [];
    gPedine.querySelectorAll('.pedina').forEach(function(g){
      const lato = g.dataset.lato;
      if (lato === 'attrezzo') return;
      const v = (g.getAttribute('transform') || '').replace('translate(', '').replace(')', '').split(',').map(Number);
      const op = g.getAttribute('opacity');
      lista.push({id: g.dataset.id, lato: lato, x: v[0], y: v[1], numero: g.getAttribute('data-numero'),
        fondo: g.getAttribute('data-fondo'), testo: g.getAttribute('data-testo'),
        opacita: op == null ? 1 : +op, selezionata: g.getAttribute('data-selezionata') === '1',
        conPalla: g.getAttribute('data-conpalla') === '1',
        giro: lato === 'palla' ? 0 : direzioneDi(g.dataset.id, lato, v[0], v[1]),
        raggio: lato === 'palla' ? sport.CAMPO.raggioPalla : R});
    });
    return lista;
  }
  function alzaPedine(){
    const palco = svg.parentElement;
    if (!angolo || !svg.isConnected || !palco || !palco.classList || !palco.classList.contains('palco')) return;
    const cornice = palco.parentElement;
    mostraPiatte(false);
    if (!tela){
      /* un campo rifatto (es. da meta' campo a campo intero) non lascia pedine vecchie */
      cornice.querySelectorAll('canvas.pedine-in-piedi').forEach(function(c){ c.remove(); });
      tela = document.createElement('canvas');
      tela.className = 'pedine-in-piedi';
      tela.style.cssText = 'position:absolute;left:0;top:0;pointer-events:none';
      palco.insertAdjacentElement('afterend', tela);
    }
    const rc = cornice.getBoundingClientRect(), rp = palco.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const lw = Math.round(rc.width), lh = Math.round(rc.height);
    if (tela.width !== lw * dpr || tela.height !== lh * dpr){
      tela.width = lw * dpr; tela.height = lh * dpr;
      tela.style.width = lw + 'px'; tela.style.height = lh + 'px';
    }
    const ctx = tela.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, lw, lh);
    const w = svg.clientWidth, h = svg.clientHeight;
    if (!w || !h) return;
    const vb = svg.viewBox.baseVal;
    const scala = Math.min(w / vb.width, h / vb.height);
    const cx = rp.left + rp.width / 2 - rc.left, cy = rp.top + h / 2 - rc.top;
    /* i fianchi del pavimento rivolti verso chi guarda */
    angoliInVista(w, h, angolo, giroVista).fianchi.forEach(function(f){
      const a = f[0], b = f[1], sn = a.x <= b.x ? a : b, dx = a.x <= b.x ? b : a;
      disegnaSpessore(ctx, {x: cx + sn.x, y: cy + sn.y}, {x: cx + dx.x, y: cy + dx.y}, Math.round(w * .022 * (a.s + b.s) / 2));
    });
    const stile = getComputedStyle(svg);
    const colore = function(c){
      const m = /^var\((--[a-z-]+)\)$/.exec(String(c || ''));
      return m ? stile.getPropertyValue(m[1]).trim() : c;
    };
    disegnaInPiedi(ctx, pedineInPiedi(), function(x, y){
      const r = metriInRiquadro(x, y, w, h);
      const p = proiettaPiano(r.u - w / 2, r.v - h / 2, w, angolo, giroVista);
      return {sx: cx + p.x, sy: cy + p.y, k: scala * p.s};
    }, angolo, colore, {omini: BASKET, giroVista: giroVista,
      canestri: sport.canestri3D ? sport.canestri3D() : null, raggio: R, unita: sport.UNITA_PER_METRO});
  }
  if (typeof ResizeObserver !== 'undefined'){
    new ResizeObserver(function(){ if (angolo) applicaProspettiva(); }).observe(svg);
  }
  /* un clic sul corpo di una pedina in piedi prende la pedina, anche se sta
     sopra il punto a terra */
  if (svg.parentElement){
    svg.parentElement.parentElement && svg.parentElement.parentElement.addEventListener('mousedown', function(evt){
      if (!angolo || !tela || evt.__rilanciato || !svg.isConnected) return;
      const rc = tela.getBoundingClientRect();
      const mx = evt.clientX - rc.left, my = evt.clientY - rc.top;
      const w = svg.clientWidth, h = svg.clientHeight;
      if (!w || !h) return;
      const vb = svg.viewBox.baseVal, scala = Math.min(w / vb.width, h / vb.height);
      const rp = svg.parentElement.getBoundingClientRect();
      const cx = rp.left + rp.width / 2 - rc.left, cy = rp.top + h / 2 - rc.top;
      let presa = null, propria = false;
      const sotto = evt.target.closest ? evt.target.closest('.pedina') : null;
      pedineInPiedi().forEach(function(p){
        const r = metriInRiquadro(p.x, p.y, w, h);
        const q = proiettaPiano(r.u - w / 2, r.v - h / 2, w, angolo, giroVista);
        const sx = cx + q.x, sy = cy + q.y, Rp = p.raggio * scala * q.s;
        const alto = p.lato === 'palla' ? Rp * 3.4 : (BASKET ? Rp * FIGURA : Rp * 1.75 + Rp);
        if (mx >= sx - Rp && mx <= sx + Rp && my >= sy - alto && my <= sy + Rp){
          if (sotto && sotto.dataset.id === p.id) propria = true;
          if (!presa || sy > presa.sy) presa = {id: p.id, sy: sy};
        }
      });
      /* preso gia' la pedina giusta (dal piede): va bene cosi' */
      if (!presa || propria) return;
      const g = gPedine.querySelector('.pedina[data-id="' + presa.id + '"]');
      if (!g || evt.target.closest && evt.target.closest('.pedina') === g) return;
      evt.stopPropagation(); evt.preventDefault();
      const nuovo = new MouseEvent('mousedown', {bubbles: true, cancelable: true, clientX: evt.clientX, clientY: evt.clientY});
      nuovo.__rilanciato = true;
      (g.firstElementChild || g).dispatchEvent(nuovo);
    }, true);
  }

  /* da pixel del riquadro (senza prospettiva) a metri, e ritorno */
  function riquadroInMetri(u, v, w, h){
    const vb = svg.viewBox.baseVal;
    const scala = Math.min(w / vb.width, h / vb.height);
    const ox = (w - vb.width * scala) / 2, oy = (h - vb.height * scala) / 2;
    return {x: vb.x + (u - ox) / scala, y: vb.y + (v - oy) / scala};
  }
  function metriInRiquadro(x, y, w, h){
    const vb = svg.viewBox.baseVal;
    const scala = Math.min(w / vb.width, h / vb.height);
    const ox = (w - vb.width * scala) / 2, oy = (h - vb.height * scala) / 2;
    return {u: ox + (x - vb.x) * scala, v: oy + (y - vb.y) * scala};
  }
  impostaCampo(null);

  function defs(){
    const d = el('defs');
    [['punta-casa','var(--casa)'],['punta-avv','var(--avversario)'],['punta-pass','var(--passaggio)'],
     ['punta-jolly','#FFD400'],['punta-portiere','#22C55E'],
     ['punta-palleggio','var(--palleggio)'],['punta-blocco','var(--blocco)'],['punta-taglio','var(--taglio)']]
      .forEach(function(p){
        const m = el('marker', {id:p[0] + suffisso, viewBox:'0 0 10 10', refX:'8', refY:'5',
          markerWidth:'5', markerHeight:'5', orient:'auto-start-reverse'});
        m.appendChild(el('path', {d:'M0,0 L10,5 L0,10 z', fill:p[1]}));
        d.appendChild(m);
      });
    /* le righe delle zone rigate: colori scritti per esteso, non variabili,
       cosi' escono uguali anche nel video */
    Object.keys(COLORI_ZONA).forEach(function(nome){
      const col = COLORI_ZONA[nome];
      const pat = el('pattern', {id:'righe-' + nome + suffisso, patternUnits:'userSpaceOnUse',
        width:'2.2', height:'2.2', patternTransform:'rotate(45)'});
      pat.appendChild(el('rect', {x:0, y:0, width:2.2, height:2.2, fill:col, 'fill-opacity':'.12'}));
      pat.appendChild(el('rect', {x:0, y:0, width:.9, height:2.2, fill:col, 'fill-opacity':'.45'}));
      d.appendChild(pat);
      /* il fascio di luce: visto dall'alto e' un alone che sfuma */
      const luce = el('radialGradient', {id:'luce-' + nome + suffisso});
      luce.appendChild(el('stop', {offset:'0%', 'stop-color':col, 'stop-opacity':'.8'}));
      luce.appendChild(el('stop', {offset:'45%', 'stop-color':col, 'stop-opacity':'.38'}));
      luce.appendChild(el('stop', {offset:'100%', 'stop-color':col, 'stop-opacity':'0'}));
      d.appendChild(luce);
    });
    return d;
  }

  function disegnaLinee(){
    svuota(gCampo);
    sport.lineeCampo().forEach(function(l){
      if (l.t === 'rect'){
        gCampo.appendChild(el('rect', {x:l.x, y:l.y, width:l.w, height:l.h,
          fill:'none', stroke:'var(--riga)', 'stroke-width':'.28'}));
      } else if (l.t === 'line'){
        gCampo.appendChild(el('line', {x1:l.x1, y1:l.y1, x2:l.x2, y2:l.y2,
          stroke:'var(--riga)', 'stroke-width':'.28'}));
      } else if (l.t === 'circle'){
        gCampo.appendChild(el('circle', {cx:l.cx, cy:l.cy, r:l.r,
          fill:'none', stroke:'var(--riga)', 'stroke-width':'.28'}));
      } else if (l.t === 'punto'){
        gCampo.appendChild(el('circle', {cx:l.cx, cy:l.cy, r:'.45',
          fill:'var(--riga)', stroke:'none'}));
      } else if (l.t === 'poly'){
        const punti = l.punti.map(function(p){ return p[0] + ',' + p[1]; }).join(' ');
        gCampo.appendChild(el(l.chiusa ? 'polygon' : 'polyline', {points:punti,
          fill: l.riempi ? 'var(--riga)' : 'none', 'fill-opacity': l.riempi ? '.1' : '0',
          stroke: l.colore || 'var(--riga)', 'stroke-width': l.spessore || '.28',
          'stroke-linejoin':'round', 'stroke-dasharray': l.tratteggio ? '.9 .8' : 'none'}));
      } else if (l.t === 'arco'){
        gCampo.appendChild(el('path', {d:l.d, fill:'none',
          stroke:'var(--riga)', 'stroke-width':'.28'}));
      }
    });
  }

  /* colore della pedina: blu i nostri, rossi gli avversari, gialli i jolly,
     verdi i portieri (come nei diagrammi di allenamento) */
  function colorePedina(e){
    if (e.portiere) return {fondo:'#22C55E', testo:'#0a0e17'};
    if (e.squadra === 'jolly') return {fondo:'#FFD400', testo:'#0a0e17'};
    if (e.squadra === 'avversari') return {fondo:'var(--avversario)', testo:'#fff'};
    return {fondo:'var(--casa)', testo:'#fff'};
  }

  function pedina(elemento, scheda, mostraRuoli, selezionata, spessore, conPalla){
    if (CLASSICO) return pedinaClassica(elemento, selezionata, conPalla);
    const lato = elemento.squadra === 'avversari' ? 'avversari' : elemento.squadra === 'jolly' ? 'jolly' : 'casa';
    const col = colorePedina(elemento);
    const g = el('g', {'class':'pedina', 'data-id':elemento.id, 'data-lato': lato,
                       transform:'translate(' + elemento.x + ',' + elemento.y + ')'});
    g.setAttribute('data-fondo', col.fondo);
    g.setAttribute('data-testo', col.testo);
    if (selezionata) g.setAttribute('data-selezionata', '1');
    if (selezionata){
      g.appendChild(el('circle', {r:R + 1.3, fill:'none', stroke:'#00e5ff', 'stroke-width':'.35',
        'stroke-dasharray':'1 .8', 'pointer-events':'none'}));
    }
    if (spessore){
      /* col campo inclinato la pedina e' un disco: si vede il bordo davanti */
      g.appendChild(el('circle', {cy:.55, r:R, fill:'#0a0e17', 'fill-opacity':'.7'}));
    }
    g.appendChild(el('circle', {r:R, fill: col.fondo, stroke:'var(--contorno)', 'stroke-width':'.32'}));
    /* numero: dalla scheda in rosa, oppure scritto sul giocatore libero */
    const numero = scheda && scheda.n != null ? scheda.n : (elemento.n != null ? elemento.n : '');
    g.setAttribute('data-numero', numero);
    /* X1, X2: nel basket i difensori hanno due caratteri */
    const lungo = BASKET && String(numero).length > 1;
    g.appendChild(el('text', {y: lungo ? '.7' : '.8', 'text-anchor':'middle', fill: col.testo,
                              'font-size': lungo ? '2' : '2.5', 'font-weight':'700'}, numero));

    if (mostraRuoli && scheda && scheda.ruolo){
      g.appendChild(el('text', {y: R + 2.6, 'text-anchor':'middle', fill:'#fff',
                                'fill-opacity':'.82', 'font-size':'2.1'}, scheda.ruolo));
    }
    return g;
  }

  function pedinaClassica(elemento, selezionata, conPalla){
    const difesa = elemento.squadra === 'avversari';
    const lato = difesa ? 'avversari' : elemento.squadra === 'jolly' ? 'jolly' : 'casa';
    const col = colorePedina(elemento);
    const numero = elemento.n != null ? elemento.n : '';
    const g = el('g', {'class':'pedina', 'data-id':elemento.id, 'data-lato': lato,
                       transform:'translate(' + elemento.x + ',' + elemento.y + ')',
                       'data-fondo': col.fondo, 'data-testo': col.testo, 'data-numero': numero});
    if (selezionata) g.setAttribute('data-selezionata', '1');
    if (conPalla) g.setAttribute('data-conpalla', '1');
    /* dove si prende: tutta la pedina, anche se si vede solo il numero */
    g.appendChild(el('circle', {r:R + .3, fill:'#fff', 'fill-opacity':'0'}));
    if (selezionata){
      g.appendChild(el('circle', {r:R + 1, fill:'#FFD84D', 'fill-opacity':'.45', 'pointer-events':'none'}));
    }
    if (conPalla){
      g.appendChild(el('circle', {r:R * .95, fill:'#fff', stroke:'var(--numero)', 'stroke-width':'.42'}));
    }
    const lungo = String(numero).length > 1;
    g.appendChild(el('text', {y: lungo ? '1' : '1.15', 'text-anchor':'middle',
      fill: difesa ? 'var(--avversario)' : 'var(--numero)',
      'font-size': lungo ? '2.7' : (conPalla ? '3' : '3.4'), 'font-weight': difesa ? '700' : '800'}, numero));
    return g;
  }

  /* gli attrezzi, visti dall'alto e in metri veri: porta 7,32, porticina 3 */
  function attrezzo(e, selezionata){
    const g = el('g', {'class':'pedina', 'data-id':e.id, 'data-lato':'attrezzo',
                       transform:'translate(' + e.x + ',' + e.y + ') rotate(' + (e.angolo || 0) + ')'});
    if (selezionata){
      g.appendChild(el('circle', {r:e.oggetto === 'porta' ? 4.6 : 2.4, fill:'none', stroke:'#00e5ff',
        'stroke-width':'.35', 'stroke-dasharray':'1 .8', 'pointer-events':'none'}));
    }
    const o = e.oggetto;
    if (o === 'cono'){
      g.appendChild(el('circle', {r:.85, fill:'#F97316', stroke:'#7C2D12', 'stroke-width':'.18'}));
      g.appendChild(el('circle', {r:.3, fill:'#FFEDD5'}));
    } else if (o === 'porta' || o === 'porticina'){
      const larga = o === 'porta' ? 7.32 : 3, fondo = o === 'porta' ? 2 : 1.2;
      g.appendChild(el('rect', {x:-larga/2, y:-fondo/2, width:larga, height:fondo, fill:'#FFFFFF',
        'fill-opacity':'.22', stroke:'#FFFFFF', 'stroke-width':'.3'}));
      for (let k = 1; -larga/2 + k * .9 < larga/2; k++){
        const xx = -larga/2 + k * .9;
        g.appendChild(el('line', {x1:xx, y1:-fondo/2, x2:xx, y2:fondo/2,
          stroke:'#FFFFFF', 'stroke-opacity':'.45', 'stroke-width':'.08'}));
      }
      g.appendChild(el('line', {x1:-larga/2, y1:fondo/2, x2:larga/2, y2:fondo/2, stroke:'#FFFFFF', 'stroke-width':'.45'}));
    } else if (o === 'bandierina'){
      g.appendChild(el('circle', {r:.25, fill:'#FFFFFF'}));
      g.appendChild(el('line', {x1:0, y1:0, x2:0, y2:-2.2, stroke:'#FFFFFF', 'stroke-width':'.18'}));
      g.appendChild(el('path', {d:'M0,-2.2 L1.6,-1.7 L0,-1.2 z', fill:'#EF4444'}));
    } else if (o === 'palloni'){
      [[-.7, .3], [.7, .3], [0, -.7]].forEach(function(p){
        g.appendChild(el('circle', {cx:p[0], cy:p[1], r:.6, fill:'#FFFFFF', stroke:'#0a0e17', 'stroke-width':'.14'}));
      });
    } else if (o === 'allenatore'){
      g.appendChild(el('circle', {r:1.6, fill:'#0a0e17', stroke:'#FFFFFF', 'stroke-width':'.25'}));
      g.appendChild(el('text', {y:'.75', 'text-anchor':'middle', fill:'#FFFFFF', 'font-size':'2', 'font-weight':'800'}, 'A'));
    }
    /* un'area invisibile per prenderlo anche se e' piccolo */
    g.appendChild(el('circle', {r:o === 'porta' ? 3.8 : 1.8, fill:'#000', 'fill-opacity':'0'}));
    return g;
  }

  function palla(elemento, inMano){
    if (CLASSICO && inMano) return null;
    const g = el('g', {'class':'pedina', 'data-id':elemento.id, 'data-lato':'palla', 'data-fondo':'var(--palla)',
                       transform:'translate(' + elemento.x + ',' + elemento.y + ')'});
    g.appendChild(el('circle', {r:sport.CAMPO.raggioPalla, fill:'var(--palla)',
                                stroke:'var(--contorno)', 'stroke-width':'.34'}));
    return g;
  }

  /* la zona: sotto le pedine, con l'etichetta in alto a sinistra */
  function zona(e, selezionata){
    const col = COLORI_ZONA[e.colore] || COLORI_ZONA.giallo;
    const g = el('g', {'class':'zona', 'data-id':e.id,
                       'data-x':e.x, 'data-y':e.y, 'data-w':e.w, 'data-h':e.h});
    const r = {x:e.x, y:e.y, width:Math.max(.1, e.w), height:Math.max(.1, e.h)};
    if (e.stile === 'piena'){
      Object.assign(r, {fill:col, 'fill-opacity':'.26', stroke:col, 'stroke-width':'.3', 'stroke-opacity':'.9'});
    } else if (e.stile === 'contorno'){
      /* riempimento invisibile ma presente: la zona si prende anche cliccando dentro */
      Object.assign(r, {fill:col, 'fill-opacity':'0', stroke:col, 'stroke-width':'.5'});
    } else {
      Object.assign(r, {fill:rif('righe-' + (COLORI_ZONA[e.colore] ? e.colore : 'giallo')),
                        stroke:col, 'stroke-width':'.3', 'stroke-opacity':'.9'});
    }
    g.appendChild(el('rect', r));
    if (selezionata){
      g.appendChild(el('rect', {x:e.x - .6, y:e.y - .6, width:e.w + 1.2, height:e.h + 1.2,
        fill:'none', stroke:'#00e5ff', 'stroke-width':'.35', 'stroke-dasharray':'1.2 .9',
        'pointer-events':'none'}));
      g.appendChild(el('rect', {'class':'maniglia', 'data-id':e.id,
        x:e.x + e.w - 1.5, y:e.y + e.h - 1.5, width:3, height:3, rx:.5,
        fill:'#00e5ff', stroke:'#021018', 'stroke-width':'.25'}));
    }
    return g;
  }

  function etichettaZona(e){
    const g = el('g', {'class':'etichetta-zona', 'data-id':e.id});
    const larga = Math.max(4, String(e.etichetta).length * 1.3 + 1.8);
    g.appendChild(el('rect', {x:e.x + .8, y:e.y + .8, width:larga, height:3.6, rx:.5,
                              fill:'#0a0e17', 'fill-opacity':'.85'}));
    g.appendChild(el('text', {x:e.x + 1.7, y:e.y + 3.45, fill:'#fff', 'font-size':'2.4',
                              'font-weight':'700'}, e.etichetta));
    return g;
  }

  /* la linea: passa per i giocatori, nell'ordine in cui li si e' cliccati */
  function linea(e, posizioni, selezionata){
    const punti = (e.giocatori || []).map(function(id){ return posizioni.get(id); }).filter(Boolean);
    if (punti.length < 2) return null;
    const col = COLORI_ZONA[e.colore] || COLORI_ZONA.bianco;
    const pts = punti.map(function(p){ return p.x + ',' + p.y; }).join(' ');
    const chiusa = e.chiusa && punti.length >= 3;
    const forma = chiusa ? 'polygon' : 'polyline';
    const g = el('g', {'class':'linea', 'data-id':e.id});
    if (selezionata){
      g.appendChild(el(forma, {points:pts, fill:'none', stroke:'#00e5ff', 'stroke-width':'1.4',
        'stroke-opacity':'.45', 'stroke-linejoin':'round', 'stroke-linecap':'round', 'pointer-events':'none'}));
    }
    g.appendChild(el(forma, {points:pts, fill: chiusa ? col : 'none', 'fill-opacity': chiusa ? '.14' : '0',
      stroke:col, 'stroke-width':'.55', 'stroke-opacity':'.95',
      'stroke-linejoin':'round', 'stroke-linecap':'round',
      'stroke-dasharray': e.stile === 'tratteggiata' ? '1.6 1.2' : 'none'}));
    /* una fascia invisibile piu' larga: una linea sottile non si riesce a cliccare */
    g.appendChild(el(forma, {points:pts, fill:'none', stroke:'#000', 'stroke-opacity':'0',
      'stroke-width':'2.6', 'pointer-events':'stroke'}));
    return g;
  }

  function evidenza(e, posizioni, selezionata){
    const punti = (e.giocatori || []).map(function(id){ return posizioni.get(id); }).filter(Boolean);
    if (!punti.length) return null;
    const nome = COLORI_ZONA[e.colore] ? e.colore : 'giallo';
    const col = COLORI_ZONA[nome];
    const g = el('g', {'class':'evidenza', 'data-id':e.id});

    if (e.stile === 'ellisse'){
      let cx, cy, rx, ry, angolo = 0;
      if (punti.length === 1){
        cx = punti[0].x; cy = punti[0].y; rx = ry = R + 2;
      } else if (punti.length === 2){
        /* due giocatori: l'ellisse si allunga lungo la loro direzione */
        const a = punti[0], b = punti[1];
        cx = (a.x + b.x) / 2; cy = (a.y + b.y) / 2;
        rx = Math.hypot(b.x - a.x, b.y - a.y) / 2 + R + 1.8;
        ry = R + 2.2;
        angolo = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
      } else {
        const xs = punti.map(function(p){ return p.x; }), ys = punti.map(function(p){ return p.y; });
        const x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
        const y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
        cx = (x0 + x1) / 2; cy = (y0 + y1) / 2;
        rx = (x1 - x0) / 2 + R + 1.8; ry = (y1 - y0) / 2 + R + 1.8;
      }
      const base = {cx:cx, cy:cy, rx:rx, ry:ry, transform:'rotate(' + angolo + ' ' + cx + ' ' + cy + ')'};
      if (selezionata){
        g.appendChild(el('ellipse', Object.assign({}, base, {fill:'none', stroke:'#00e5ff',
          'stroke-width':'1.4', 'stroke-opacity':'.45', 'pointer-events':'none'})));
      }
      g.appendChild(el('ellipse', Object.assign({}, base, {fill:'none', stroke:col, 'stroke-width':'.55'})));
      g.appendChild(el('ellipse', Object.assign({}, base, {fill:'none', stroke:'#000',
        'stroke-opacity':'0', 'stroke-width':'2.6', 'pointer-events':'stroke'})));
      return g;
    }

    punti.forEach(function(p){
      if (e.stile === 'luce'){
        g.appendChild(el('circle', {cx:p.x, cy:p.y, r:R + 3.4, fill:rif('luce-' + nome)}));
        g.appendChild(el('circle', {cx:p.x, cy:p.y, r:R + 1.1, fill:'none', stroke:col,
          'stroke-opacity':'.9', 'stroke-width':'.35'}));
      } else if (e.stile === 'quadrato'){
        const lato = 2 * R + 1.8;
        g.appendChild(el('rect', {x:p.x - lato/2, y:p.y - lato/2, width:lato, height:lato, rx:.4,
          fill:col, 'fill-opacity':'.12', stroke:col, 'stroke-width':'.45'}));
      } else {
        g.appendChild(el('circle', {cx:p.x, cy:p.y, r:R + 1.2, fill:col, 'fill-opacity':'.28',
          stroke:col, 'stroke-width':'.5'}));
      }
      if (selezionata){
        g.appendChild(el('circle', {cx:p.x, cy:p.y, r:R + 2.5, fill:'none', stroke:'#00e5ff',
          'stroke-width':'.3', 'stroke-dasharray':'1 .8', 'pointer-events':'none'}));
      }
    });
    return g;
  }

  function scritta(e, posizioni, selezionata){
    let x = e.x, y = e.y, attaccata = false;
    if (e.giocatore){
      const p = posizioni.get(e.giocatore);
      if (!p) return null;
      x = p.x; y = p.y - (R + 3.4); attaccata = true;
    }
    if (typeof x !== 'number' || typeof y !== 'number') return null;
    const vuota = !String(e.testo || '').trim();
    const testo = vuota ? '(scritta vuota)' : String(e.testo);
    const col = COLORI_ZONA[e.colore] || COLORI_ZONA.bianco;

    let dimensione, larga, alta;
    if (e.stile === 'grande'){ dimensione = 7; larga = testo.length * 4.1 + 2; alta = 8.6; }
    else if (e.stile === 'semplice'){ dimensione = 2.8; larga = testo.length * 1.6 + 1.4; alta = 3.9; }
    else { dimensione = 2.4; larga = Math.max(4, testo.length * 1.3 + 2.4); alta = 3.9; }

    const g = el('g', {'class':'scritta', 'data-id':e.id, 'data-x':x, 'data-y':y,
                       'data-attaccata': attaccata ? '1' : '0'});
    if (vuota) g.setAttribute('opacity', '.5');
    const riquadro = {x:x - larga/2, y:y - alta/2, width:larga, height:alta};
    if (e.stile === 'fumetto'){
      g.appendChild(el('rect', Object.assign({}, riquadro, {rx:.6, fill:'#0a0e17', 'fill-opacity':'.88',
        stroke:col, 'stroke-width':'.3', 'stroke-opacity': e.colore === 'bianco' ? '.35' : '.95'})));
    } else {
      /* niente riquadro, ma un'area invisibile per poterla cliccare */
      g.appendChild(el('rect', Object.assign({}, riquadro, {fill:'#000', 'fill-opacity':'0'})));
    }
    const t = el('text', {x:x, y:y + dimensione * 0.35, 'text-anchor':'middle', 'font-size':dimensione,
      'font-weight': e.stile === 'grande' ? '800' : '700', fill: e.stile === 'fumetto' ? '#fff' : col}, testo);
    if (e.stile !== 'fumetto'){
      /* un bordo scuro sottile: sull'erba chiara il testo resta leggibile */
      t.setAttribute('stroke', '#0a0e17');
      t.setAttribute('stroke-width', e.stile === 'grande' ? '.7' : '.35');
      t.setAttribute('stroke-opacity', '.6');
      t.setAttribute('paint-order', 'stroke');
    }
    g.appendChild(t);
    if (selezionata){
      g.appendChild(el('rect', {x:riquadro.x - .6, y:riquadro.y - .6, width:riquadro.width + 1.2,
        height:riquadro.height + 1.2, fill:'none', stroke:'#00e5ff', 'stroke-width':'.3',
        'stroke-dasharray':'1.2 .9', 'pointer-events':'none'}));
    }
    return g;
  }

  /* la misura: linea con le stanghette ai capi e i metri a meta' */
  function disegnoMisura(p0, p1, col, tratteggiata, g, alone){
    const len = Math.hypot(p1.x - p0.x, p1.y - p0.y);
    if (len < .01) return;
    const ux = (p1.x - p0.x) / len, uy = (p1.y - p0.y) / len, nx = -uy, ny = ux;
    if (alone){
      g.appendChild(el('line', {x1:p0.x, y1:p0.y, x2:p1.x, y2:p1.y, stroke:'#00e5ff', 'stroke-width':'1.4',
        'stroke-opacity':'.45', 'stroke-linecap':'round', 'pointer-events':'none'}));
    }
    g.appendChild(el('line', {x1:p0.x, y1:p0.y, x2:p1.x, y2:p1.y, stroke:col, 'stroke-width':'.4',
      'stroke-dasharray': tratteggiata ? '1.4 1' : 'none'}));
    [p0, p1].forEach(function(p){
      g.appendChild(el('line', {x1:p.x + nx*1.2, y1:p.y + ny*1.2, x2:p.x - nx*1.2, y2:p.y - ny*1.2,
        stroke:col, 'stroke-width':'.4'}));
    });
    return {mx:(p0.x + p1.x)/2 + nx*2.4, my:(p0.y + p1.y)/2 + ny*2.4, len:len};
  }

  function etichettaMisura(x, y, testo){
    const g = el('g', {'class':'etichetta-misura'});
    const larga = Math.max(4, String(testo).length * 1.25 + 2);
    g.appendChild(el('rect', {x:x - larga/2, y:y - 1.8, width:larga, height:3.6, rx:.5, fill:'#0a0e17', 'fill-opacity':'.85'}));
    g.appendChild(el('text', {x:x, y:y + .85, 'text-anchor':'middle', fill:'#fff', 'font-size':'2.3', 'font-weight':'700'}, testo));
    return g;
  }

  function misura(e, posizioni, selezionata){
    const capo = function(c){
      if (!c) return null;
      if (c.giocatore){ const p = posizioni.get(c.giocatore); return p ? {x:p.x, y:p.y} : null; }
      return typeof c.x === 'number' ? {x:c.x, y:c.y} : null;
    };
    const p0 = capo(e.capi && e.capi[0]), p1 = capo(e.capi && e.capi[1]);
    if (!p0 || !p1) return null;
    const col = COLORI_ZONA[e.colore] || COLORI_ZONA.bianco;
    const g = el('g', {'class':'misura', 'data-id':e.id});
    const m = disegnoMisura(p0, p1, col, e.stile === 'tratteggiata', g, selezionata);
    if (!m) return null;
    g.appendChild(el('line', {x1:p0.x, y1:p0.y, x2:p1.x, y2:p1.y, stroke:'#000', 'stroke-opacity':'0',
      'stroke-width':'2.6', 'pointer-events':'stroke'}));
    /* i capi liberi, se selezionata, si trascinano */
    if (selezionata){
      [0, 1].forEach(function(i){
        const c = e.capi[i], p = i === 0 ? p0 : p1, altro = i === 0 ? p1 : p0;
        if (c.giocatore) return;
        g.appendChild(el('circle', {'class':'maniglia-capo', 'data-id':e.id, 'data-capo':i,
          'data-x':p.x, 'data-y':p.y, 'data-ax':altro.x, 'data-ay':altro.y,
          cx:p.x, cy:p.y, r:1.1, fill:'#00e5ff', stroke:'#021018', 'stroke-width':'.25'}));
      });
    }
    return {gruppo: g, etichetta: etichettaMisura(m.mx, m.my, testoMisura(e, m.len / UNITA))};
  }

  /* il rettangolo che si vede mentre si disegna o si ridimensiona una zona,
     oppure la linea mentre si scelgono i giocatori */
  function anteprima(r){
    svuota(gAnteprima);
    if (!r) return;
    if (r.fini){
      /* dove finiscono le azioni: da li' si puo' ripartire */
      r.fini.forEach(function(p){
        gAnteprima.appendChild(el('circle', {cx:p.x, cy:p.y, r:1.15, fill:'#fff', 'fill-opacity':'.7',
          stroke:'#1F6FEB', 'stroke-width':'.35'}));
      });
      return;
    }
    if (r.tratto){
      const s = r.tratto;
      if (s.punti.length >= 2){
        const f = frecciaSuPercorso(s.punti, 'var(--taglio)', 'taglio', s.stile, R + .5, 0);
        if (f){ f.setAttribute('opacity', '.75'); gAnteprima.appendChild(f); }
      }
      s.punti.slice(1, -1).forEach(function(p){
        gAnteprima.appendChild(el('circle', {cx:p.x, cy:p.y, r:.5, fill:'var(--taglio)', 'fill-opacity':'.5'}));
      });
      return;
    }
    if (r.misura){
      const d = disegnoMisura(r.misura[0], r.misura[1], '#00e5ff', true, gAnteprima, false);
      if (d) gAnteprima.appendChild(etichettaMisura(d.mx, d.my, testoMisura({}, d.len / UNITA)));
      return;
    }
    if (r.cerchi){
      r.cerchi.forEach(function(p){
        gAnteprima.appendChild(el('circle', {cx:p.x, cy:p.y, r:R + 1.2, fill:'#00e5ff', 'fill-opacity':'.15',
          stroke:'#00e5ff', 'stroke-width':'.45'}));
      });
      return;
    }
    if (Array.isArray(r)){
      if (r.length < 2){
        if (r.length === 1) gAnteprima.appendChild(el('circle', {cx:r[0].x, cy:r[0].y, r:R + .9,
          fill:'none', stroke:'#00e5ff', 'stroke-width':'.4'}));
        return;
      }
      gAnteprima.appendChild(el('polyline', {points:r.map(function(p){ return p.x + ',' + p.y; }).join(' '),
        fill:'none', stroke:'#00e5ff', 'stroke-width':'.5', 'stroke-dasharray':'1.2 .9',
        'stroke-linejoin':'round'}));
      r.forEach(function(p){
        gAnteprima.appendChild(el('circle', {cx:p.x, cy:p.y, r:R + .9, fill:'none', stroke:'#00e5ff', 'stroke-width':'.4'}));
      });
      return;
    }
    gAnteprima.appendChild(el('rect', {x:r.x, y:r.y, width:r.w, height:r.h,
      fill:'#00e5ff', 'fill-opacity':'.1', stroke:'#00e5ff', 'stroke-width':'.35',
      'stroke-dasharray':'1.2 .9'}));
  }

  function accorcia(a, b, tagliaA, tagliaB){
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy);
    if (len < tagliaA + tagliaB + .6) return null;
    const ux = dx/len, uy = dy/len;
    return {x1:a.x + ux*tagliaA, y1:a.y + uy*tagliaA,
            x2:b.x - ux*tagliaB, y2:b.y - uy*tagliaB};
  }

  /* movimento del giocatore: tratteggio (nel basket: linea piena, zig-zag
     se porta la palla, T se va a bloccare) */
  function frecciaMovimento(a, b, chi, stile){
    /* di solito la freccia parte fuori dal cerchio vuoto e si ferma prima
       della pedina; se il movimento e' corto (capita spesso su un'area
       ridotta) si stringono i margini, invece di non disegnarla affatto */
    const t = accorcia(a, b, R + .5, R + 1.4) || accorcia(a, b, R * .5, R + .3);
    if (!t) return null;
    /* la freccia ha il colore di chi si muove */
    const tipo = chi && chi.portiere ? 'portiere' : chi && chi.squadra === 'jolly' ? 'jolly'
               : chi && chi.squadra === 'avversari' ? 'avv' : 'casa';
    const colore = {casa:'var(--casa)', avv:'var(--avversario)', jolly:'#FFD400', portiere:'#22C55E'}[tipo];
    if (BASKET) return frecciaBasket(t, CLASSICO && tipo === 'casa' ? 'var(--taglio)' : colore, CLASSICO && tipo === 'casa' ? 'taglio' : tipo, stile);
    return el('line', {x1:t.x1, y1:t.y1, x2:t.x2, y2:t.y2,
      stroke: colore, 'stroke-width':'.48',
      'stroke-dasharray':'1.9 1.5', 'stroke-linecap':'round',
      'marker-end':rif('punta-' + tipo)});
  }

  /* un percorso accorciato ai due capi (per non finire sopra i numeri) */
  function accorciaPercorso(punti, tagliaA, tagliaB){
    let p = punti.slice();
    const taglia = function(lista, quanto){
      let resto = quanto;
      while (lista.length > 1 && resto > 0){
        const d = Math.hypot(lista[1].x - lista[0].x, lista[1].y - lista[0].y);
        if (d > resto){
          const f = resto / d;
          lista[0] = {x: lista[0].x + (lista[1].x - lista[0].x) * f, y: lista[0].y + (lista[1].y - lista[0].y) * f};
          return lista;
        }
        resto -= d;
        lista.shift();
      }
      return lista;
    };
    p = taglia(p, tagliaA);
    p = taglia(p.reverse(), tagliaB).reverse();
    return p.length >= 2 ? p : null;
  }
  function lunghezza(p){
    let l = 0;
    for (let i = 1; i < p.length; i++) l += Math.hypot(p[i].x - p[i - 1].x, p[i].y - p[i - 1].y);
    return l;
  }
  const inPunti = function(p){ return p.map(function(q){ return q.x + ',' + q.y; }).join(' '); };

  /* la punta: orientata sulla direzione degli ultimi due metri del percorso,
     non sull'ultimo pezzetto (dopo curve e zig-zag girava storta) */
  function punta(campioni, colore, lunga){
    const totale = lunghezza(campioni);
    const ultimo = campioni[campioni.length - 1];
    const indietro = puntoLungo(campioni, Math.max(0, (totale - Math.min(2.2, totale * .5)) / totale));
    const d = Math.hypot(ultimo.x - indietro.x, ultimo.y - indietro.y) || 1;
    const ux = (ultimo.x - indietro.x) / d, uy = (ultimo.y - indietro.y) / d;
    const L = lunga || 2.1, W = .95;
    const bx = ultimo.x - ux * L, by = ultimo.y - uy * L;
    return el('path', {d: 'M' + ultimo.x + ',' + ultimo.y + ' L' + (bx - uy * W) + ',' + (by + ux * W) +
      ' L' + (bx + uy * W) + ',' + (by - ux * W) + ' Z', fill: colore});
  }
  /* la linea si ferma dentro la punta, cosi' non spunta oltre */
  function conPunta(linea, campioni, colore){
    const g = el('g');
    g.appendChild(linea);
    g.appendChild(punta(campioni, colore));
    return g;
  }

  /* la freccia di un'azione lungo il suo percorso (dritto o curvo) */
  function frecciaSuPercorso(punti, colore, tipo, stile, tagliaA, tagliaB){
    const campioni = accorciaPercorso(curva(punti, 14), tagliaA || 0, tagliaB || 0);
    if (!campioni || lunghezza(campioni) < .6) return null;
    const ultimo = campioni[campioni.length - 1];
    const direzione = puntoLungo(campioni, Math.max(0, 1 - Math.min(2.2, lunghezza(campioni) * .5) / lunghezza(campioni)));
    const dl = Math.hypot(ultimo.x - direzione.x, ultimo.y - direzione.y) || 1;
    const ux = (ultimo.x - direzione.x) / dl, uy = (ultimo.y - direzione.y) / dl;
    const corpo = accorciaPercorso(campioni, 0, 1.4) || campioni;
    if (stile === 'blocco'){
      colore = 'var(--blocco)';
      const g = el('g');
      g.appendChild(el('polyline', {points: inPunti(campioni), fill:'none', stroke:colore,
        'stroke-width':'.55', 'stroke-linecap':'round', 'stroke-linejoin':'round'}));
      g.appendChild(el('line', {x1:ultimo.x - uy * 1.6, y1:ultimo.y + ux * 1.6, x2:ultimo.x + uy * 1.6, y2:ultimo.y - ux * 1.6,
        stroke:colore, 'stroke-width':'.7', 'stroke-linecap':'round'}));
      return g;
    }
    if (stile === 'palleggio'){
      colore = 'var(--palleggio)'; tipo = 'palleggio';
      /* sinusoide lungo il percorso, come sul playbook; si spegne prima della punta */
      const totale = lunghezza(campioni), coda = Math.min(2.4, totale * .3), corsa = totale - coda;
      const onde = Math.max(2, Math.round(corsa / 1.7)), lambda = corsa / onde;
      const zig = [];
      const passo = .12;
      for (let s = 0; s <= corsa + 1e-6; s += passo){
        const k = s / totale;
        const p = puntoLungo(campioni, k), q = puntoLungo(campioni, Math.min(1, k + .005));
        const d = Math.hypot(q.x - p.x, q.y - p.y) || 1;
        const lato = .7 * Math.sin(2 * Math.PI * s / lambda);
        zig.push({x: p.x - (q.y - p.y) / d * lato, y: p.y + (q.x - p.x) / d * lato});
      }
      zig.push(puntoLungo(campioni, Math.max(0, 1 - 1.4 / totale)));
      return conPunta(el('polyline', {points: inPunti(zig), fill:'none', stroke:colore, 'stroke-width':'.45',
        'stroke-linejoin':'round', 'stroke-linecap':'round', 'class':'freccia-' + tipo}), campioni, colore);
    }
    if (stile === 'passaggio'){
      return conPunta(el('polyline', {points: inPunti(corpo), fill:'none', stroke:'var(--passaggio)', 'stroke-width':'.5',
        'stroke-dasharray':'1.3 1', 'stroke-linecap':'round', 'class':'freccia-pass'}), campioni, 'var(--passaggio)');
    }
    return conPunta(el('polyline', {points: inPunti(corpo), fill:'none', stroke:colore, 'stroke-width':'.5',
      'stroke-linecap':'round', 'stroke-linejoin':'round', 'class':'freccia-' + tipo}), campioni, colore);
  }

  function frecciaBasket(t, colore, tipo, stile){
    return frecciaSuPercorso([{x: t.x1, y: t.y1}, {x: t.x2, y: t.y2}], colore, tipo, stile, 0, 0);
  }

  /* passaggio: linea piena, leggermente curva. Due segni ben distinti: su un
     campo intero con 22 elementi le linee tutte uguali diventano illeggibili. */
  function frecciaPassaggio(a, b){
    const t = accorcia(a, b, 1.7, 2.2);
    if (!t) return null;
    const dx = t.x2 - t.x1, dy = t.y2 - t.y1, len = Math.hypot(dx, dy);
    const mx = (t.x1 + t.x2)/2, my = (t.y1 + t.y2)/2;
    const cx = mx + (-dy/len) * len*0.13, cy = my + (dx/len) * len*0.13;
    return el('path', {d:'M'+t.x1+','+t.y1+' Q'+cx+','+cy+' '+t.x2+','+t.y2,
      fill:'none', stroke:'var(--passaggio)', 'stroke-width':'.62',
      'stroke-dasharray': BASKET ? '1.3 1' : 'none',
      'stroke-linecap':'round', 'marker-end':rif('punta-pass')});
  }

  function ombra(p){
    return el('circle', {cx:p.x, cy:p.y, r:R, fill:'none', stroke: CLASSICO ? 'var(--riga)' : '#fff',
      'stroke-opacity':'.42', 'stroke-width':'.32', 'stroke-dasharray':'1.2 1.1'});
  }

  /* le schede della rosa, per id: numero e ruolo di ogni pedina */
  function schede(squadra){
    const m = new Map();
    (squadra.rosa || []).concat(squadra.rosaAvversario || []).forEach(function(g){ m.set(g.id, g); });
    return m;
  }

  /* l'ordine in cui si disegna: avversari sotto, i nostri sopra, la palla in cima */
  function strato(e){
    if (e.tipo === 'attrezzo') return 0.5;
    if (e.tipo === 'palla') return 3;
    if (e.tipo === 'giocatore') return e.squadra === 'avversari' ? 1 : 2;
    return 0;
  }

  /* un elemento che sta entrando o uscendo in dissolvenza */
  function trasparenza(nodo, e){
    if (!nodo || typeof e.opacita !== 'number' || e.opacita >= 1) return nodo;
    const gia = nodo.getAttribute('opacity');
    nodo.setAttribute('opacity', String(Math.max(0, e.opacita) * (gia == null ? 1 : +gia)));
    return nodo;
  }

  function disegnaElementi(elementi, squadra, opz){
    const rosa = schede(squadra);
    svuota(gZone); svuota(gEtichette); svuota(gLinee); svuota(gEvidenze); svuota(gScritte);
    const posizioni = new Map();
    elementi.forEach(function(e){
      if (e.tipo !== 'giocatore') return;
      if (e.squadra === 'avversari' && opz.avversari === false) return;
      posizioni.set(e.id, e);
    });
    /* chi ha la palla: la palla sta alla sua spalla */
    const palle = elementi.filter(function(e){ return e.tipo === 'palla'; });
    const portatori = new Set(), inMano = new Set();
    elementi.forEach(function(g){
      if (g.tipo !== 'giocatore') return;
      palle.forEach(function(b){
        /* nel palleggio la palla rimbalza vicino alla spalla: resta sua (il cerchio non sparisce) */
        if (Math.hypot(b.x - (g.x + 1.9), b.y - (g.y - 1.9)) < (CLASSICO ? 1.6 : .6)){ portatori.add(g.id); inMano.add(b.id); }
      });
    });
    elementi.slice().sort(function(a, b){ return strato(a) - strato(b); }).forEach(function(e){
      if (e.tipo === 'misura'){
        const ms = misura(e, posizioni, opz.selezionata === e.id);
        if (ms){
          gLinee.appendChild(trasparenza(ms.gruppo, e));
          gEtichette.appendChild(trasparenza(ms.etichetta, e));
        }
      } else if (e.tipo === 'scritta'){
        const sc = trasparenza(scritta(e, posizioni, opz.selezionata === e.id), e);
        if (sc) gScritte.appendChild(sc);
      } else if (e.tipo === 'evidenza'){
        const v = trasparenza(evidenza(e, posizioni, opz.selezionata === e.id), e);
        if (v) gEvidenze.appendChild(v);
      } else if (e.tipo === 'linea'){
        const l = trasparenza(linea(e, posizioni, opz.selezionata === e.id), e);
        if (l) gLinee.appendChild(l);
      } else if (e.tipo === 'zona'){
        gZone.appendChild(trasparenza(zona(e, opz.selezionata === e.id), e));
        if (e.etichetta) gEtichette.appendChild(trasparenza(etichettaZona(e), e));
      } else if (e.tipo === 'giocatore'){
        if (e.squadra === 'avversari' && opz.avversari === false) return;
        gPedine.appendChild(trasparenza(pedina(e, rosa.get(e.rif), opz.ruoli, opz.selezionata === e.id, opz.spessore, portatori.has(e.id)), e));
      } else if (e.tipo === 'attrezzo'){
        gPedine.appendChild(trasparenza(attrezzo(e, opz.selezionata === e.id), e));
      } else if (e.tipo === 'palla'){
        const b = palla(e, inMano.has(e.id));
        if (b) gPedine.appendChild(trasparenza(b, e));
      }
    });
  }

  function disegna(fase, precedente, squadra, opz){
    svuota(gOmbre); svuota(gFrecce); svuota(gPedine);
    const elementi = fase.elementi || [];

    if (precedente && opz.tracce !== false){
      const prima = new Map((precedente.elementi || []).map(function(e){ return [e.id, e]; }));

      elementi.forEach(function(e){
        const q = prima.get(e.id);
        if (!q) return;
        if (e.tipo === 'palla'){
          /* una freccia per ogni passaggio del giro */
          const punti = percorsoPalla(precedente, fase, e.id) || [q, e];
          for (let i = 0; i < punti.length - 1; i++){
            if (Math.hypot(punti[i+1].x - punti[i].x, punti[i+1].y - punti[i].y) < 1) continue;
            const f = frecciaPassaggio(punti[i], punti[i+1]); if (f) gFrecce.appendChild(f);
          }
          return;
        }
        if (Math.hypot(e.x - q.x, e.y - q.y) < 1) return;
        if (e.tipo === 'giocatore'){
          if (e.squadra === 'avversari' && opz.avversari === false) return;
          gOmbre.appendChild(ombra(q));
          /* nel basket la freccia dice l'azione: taglio, palleggio, blocco */
          const stile = BASKET && sport.azioneDi ? sport.azioneDi(e, precedente, fase) : null;
          const f = frecciaMovimento(q, e, e, stile); if (f) gFrecce.appendChild(f);
        }
      });
    }
    if (BASKET) blocchiDaFermi(fase, precedente, opz);
    disegnaElementi(elementi, squadra, opz);
    if (angolo) alzaPedine();
  }

  /* ---- il diagramma del basket ----
   * Le giocatrici dove sono ora (inizio) e i simboli di quello che faranno:
   * la freccia va fin dove arriveranno (fine). Il cerchio sul numero e' la
   * palla. E' il foglio del playbook: da qui il motore ricava la fase dopo. */
  function disegnaDiagramma(inizio, fine, squadra, opz){
    svuota(gOmbre); svuota(gFrecce); svuota(gPedine);
    if (fine){
      const dopo = new Map((fine.elementi || []).map(function(e){ return [e.id, e]; }));
      const centroDi = function(punto, fase, altra){
        /* un punto della palla: se sta alla spalla di una giocatrice, il suo centro */
        let chi = null;
        [fase, altra].forEach(function(f){
          if (chi || !f) return;
          (f.elementi || []).forEach(function(g){
            if (!chi && g.tipo === 'giocatore' && Math.hypot(punto.x - (g.x + 1.9), punto.y - (g.y - 1.9)) < .7) chi = g;
          });
        });
        return chi;
      };
      (inizio.elementi || []).forEach(function(e){
        if (e.tipo !== 'giocatore') return;
        if (e.squadra === 'avversari' && opz.avversari === false) return;
        const q = dopo.get(e.id);
        if (!q) return;
        const stile = sport.azioneDi ? sport.azioneDi(q, inizio, fine) : null;
        const colore0 = e.squadra === 'avversari' ? 'var(--avversario)' : 'var(--taglio)';
        const tipo0 = e.squadra === 'avversari' ? 'avv' : 'taglio';
        if (Array.isArray(q.passi) && q.passi.length){
          /* azioni in fila: ognuna parte da dove e' finita la precedente */
          let da = e;
          q.passi.forEach(function(s, j){
            const lungo = Math.hypot(s.x - da.x, s.y - da.y) >= 1;
            if (lungo){
              const f = frecciaSuPercorso([da].concat(s.via || [], [s]), colore0, tipo0, s.azione || 'taglio', j === 0 ? R + .5 : .3, .2);
              if (f) gFrecce.appendChild(f);
            } else if (s.azione === 'blocco'){
              gFrecce.appendChild(stanghettaBlocco(da, inizio));
            }
            da = s;
          });
          return;
        }
        if (Math.hypot(q.x - e.x, q.y - e.y) >= 1){
          const colore = e.squadra === 'avversari' ? 'var(--avversario)' : 'var(--taglio)';
          const percorso = [e].concat(q.via || [], [q]);
          const f = frecciaSuPercorso(percorso, colore, e.squadra === 'avversari' ? 'avv' : 'taglio', stile, R + .5, .2)
                 || frecciaSuPercorso(percorso, colore, e.squadra === 'avversari' ? 'avv' : 'taglio', stile, R * .5, 0);
          if (f) gFrecce.appendChild(f);
        }
      });
      /* i passaggi: da chi passa (dove si trova quando passa) a chi riceve */
      (fine.elementi || []).forEach(function(b){
        if (b.tipo !== 'palla') return;
        const punti = percorsoPalla(inizio, fine, b.id);
        if (!punti) return;
        const tappe = punti.map(function(p, i){
          const chi = i === 0 ? centroDi(p, inizio, null) : centroDi(p, fine, null);
          if (!chi) return {x: p.x, y: p.y, libero: true};
          const qui = dopo.get(chi.id) || chi;
          return {x: qui.x, y: qui.y, id: chi.id};
        });
        for (let i = 0; i < tappe.length - 1; i++){
          const a = tappe[i], c = tappe[i + 1];
          if (a.id && a.id === c.id) continue;      // palleggio: la palla resta a lei
          if (Math.hypot(c.x - a.x, c.y - a.y) < 1) continue;
          const tt = accorcia(a, c, a.libero ? .3 : R + .4, c.libero ? .6 : R + .6);
          if (!tt) continue;
          const pf = frecciaSuPercorso([{x: tt.x1, y: tt.y1}, {x: tt.x2, y: tt.y2}], 'var(--passaggio)', 'pass', 'passaggio', 0, 0);
          if (pf) gFrecce.appendChild(pf);
        }
      });
      /* i blocchi da ferma, girati verso la palla */
      blocchiDaFermi(fine, inizio, opz, inizio);
    }
    disegnaElementi(inizio.elementi || [], squadra, opz);
    if (angolo) alzaPedine();
  }

  /* la T del blocco portato da ferma, girata verso la palla */
  function stanghettaBlocco(p, fase){
    const palla = ((fase && fase.elementi) || []).find(function(e){ return e.tipo === 'palla'; });
    let ux = 0, uy = -1;
    if (palla){
      const dx = palla.x - p.x, dy = palla.y - p.y, d = Math.hypot(dx, dy);
      if (d > R){ ux = dx / d; uy = dy / d; }
    }
    const cx = p.x + ux * (R + 1), cy = p.y + uy * (R + 1), nx = -uy, ny = ux;
    return el('line', {x1:cx + nx * 1.7, y1:cy + ny * 1.7, x2:cx - nx * 1.7, y2:cy - ny * 1.7,
      stroke:'var(--blocco)', 'stroke-width':'.75', 'stroke-linecap':'round', 'class':'blocco-fermo'});
  }

  /* il blocco portato da ferma: la T davanti alla pedina, girata verso la palla */
  function blocchiDaFermi(fase, precedente, opz, doveSono){
    const elementi = fase.elementi || [];
    const palla = ((doveSono || fase).elementi || []).find(function(e){ return e.tipo === 'palla'; });
    const prima = new Map(((precedente && precedente.elementi) || []).map(function(e){ return [e.id, e]; }));
    elementi.forEach(function(e){
      if (e.tipo !== 'giocatore' || e.azione !== 'blocco') return;
      if (e.squadra === 'avversari' && opz.avversari === false) return;
      const q = prima.get(e.id);
      if (q && Math.hypot(e.x - q.x, e.y - q.y) >= 1) return;
      if (Array.isArray(e.passi) && e.passi.length) return;
      let ux = 0, uy = -1;
      if (palla){
        const dx = palla.x - e.x, dy = palla.y - e.y, d = Math.hypot(dx, dy);
        if (d > R){ ux = dx / d; uy = dy / d; }
      }
      const cx = e.x + ux * (R + 1), cy = e.y + uy * (R + 1), nx = -uy, ny = ux;
      const colore = 'var(--blocco)';
      gFrecce.appendChild(el('line', {x1:cx + nx * 1.7, y1:cy + ny * 1.7, x2:cx - nx * 1.7, y2:cy - ny * 1.7,
        stroke:colore, 'stroke-width':'.75', 'stroke-linecap':'round', 'class':'blocco-fermo'}));
    });
  }

  /* durante l'animazione: niente frecce ne' ombre, solo le pedine che scorrono */
  function disegnaFotogramma(f, squadra, opz, scia){
    svuota(gOmbre); svuota(gFrecce); svuota(gPedine);
    /* la scia dei passaggi, sbiadita: una per ogni passaggio del giro */
    const punti = scia && (scia.punti || (scia.da && scia.a ? [scia.da, scia.a] : null));
    if (punti){
      for (let i = 0; i < punti.length - 1; i++){
        const p = frecciaPassaggio(punti[i], punti[i+1]);
        if (p){ p.setAttribute('stroke-opacity', '.33'); gFrecce.appendChild(p); }
      }
    }
    disegnaElementi(f.elementi || [], squadra, opz);
    if (angolo) alzaPedine();
  }

  /* da pixel dello schermo a metri di campo */
  function inMetri(evt){
    const t = (evt.touches && evt.touches[0]) || (evt.changedTouches && evt.changedTouches[0]) || evt;
    if (angolo && svg.parentElement && svg.parentElement.classList.contains('palco')){
      /* il punto del prato sotto il puntatore, col campo inclinato */
      const w = svg.clientWidth, h = svg.clientHeight;
      const r = svg.parentElement.getBoundingClientRect();
      const piano = pianoDaSchermo(t.clientX - (r.left + r.width/2), t.clientY - (r.top + h/2), w, angolo, giroVista);
      return riquadroInMetri(piano.x + w/2, piano.y + h/2, w, h);
    }
    const p = svg.createSVGPoint();
    p.x = t.clientX; p.y = t.clientY;
    const m = svg.getScreenCTM();
    if (!m) return null;
    return p.matrixTransform(m.inverse());
  }

  return {svg, disegna, disegnaFotogramma, inMetri, anteprima, impostaCampo, impostaProspettiva,
          angolo: function(){ return angolo; }, giroVista: function(){ return giroVista; },
          limiti: function(){ return limiti; }, pedine: gPedine,
          pedineInPiedi: pedineInPiedi, alzaPedine: alzaPedine, mostraPiatte: mostraPiatte,
          disegnaDiagramma: disegnaDiagramma};
}

return { DISTANZA_CAMERA, proiettaPiano, pianoDaSchermo, angoliInVista, FIGURA, disegnaSpessore, cimaInVista, disegnaInPiedi, Campo };
})();
/* ---- src/renderer/ui/trascina.js ---- */
const __vdm_src_renderer_ui_trascina_js = (function(){
/* Tutto quello che si fa col mouse (o col dito) sul campo.
 *  - una pedina (giocatore o palla): si trascina
 *  - una zona: si trascina tutta, oppure con un clic si seleziona
 *  - la maniglia di una zona selezionata: la ridimensiona
 *  - col bottone "Zona" attivo, trascinando sul campo si disegna una zona nuova
 *  - un clic sul campo vuoto toglie la selezione
 * Ascoltatori sul documento: l'oggetto segue il puntatore anche quando ne esce. */
function abilitaTrascinamento(campo, sport, opzioni){
  const alRilascio = opzioni.alRilascio;
  const zona = opzioni.zona || {};
  const giocatoreCliccato = opzioni.giocatoreCliccato || function(){};
  const scritta = opzioni.scritta || {};
  const misura = opzioni.misura || {};

  /* il capo di una misura: sul giocatore gli si attacca, altrove e' un punto */
  function giocatoreSotto(e){
    const t = (e && e.changedTouches && e.changedTouches[0]) || e;
    if (!t || typeof t.clientX !== 'number') return null;
    const n = document.elementFromPoint(t.clientX, t.clientY);
    const g = n && n.closest ? n.closest('.pedina') : null;
    return eGiocatore(g) ? g : null;
  }
  function posizioneDi(g){
    const v = (g.getAttribute('transform') || '').replace('translate(', '').replace(')', '').split(',').map(Number);
    return {x: v[0], y: v[1]};
  }
  const seleziona = opzioni.seleziona || function(){};
  const modo = opzioni.modo || function(){ return 'normale'; };
  const L = sport.CAMPO.lunghezza, W = sport.CAMPO.larghezza, R = sport.CAMPO.raggioGiocatore;
  const MINIMO = 2;   // metri: una zona piu' piccola non si vede e non si prende
  let stato = null;

  /* i limiti sono quelli del campo che si vede: intero o area ridotta con margine */
  const lim = function(){
    return (campo.limiti && campo.limiti()) || {minX: -R, minY: -R, maxX: L + R, maxY: W + R};
  };
  const dentroX = function(x){ const l = lim(); return Math.max(l.minX, Math.min(l.maxX, x)); };
  const dentroY = function(y){ const l = lim(); return Math.max(l.minY, Math.min(l.maxY, y)); };
  /* un giocatore vero: le linee, le evidenze e le misure non si attaccano a
     palla e attrezzi */
  const eGiocatore = function(g){
    return !!g && g.classList.contains('pedina') && g.dataset.lato !== 'palla' && g.dataset.lato !== 'attrezzo';
  };

  function rettangolo(x0, y0, x1, y1){
    x0 = dentroX(x0); x1 = dentroX(x1); y0 = dentroY(y0); y1 = dentroY(y1);
    return {x: Math.min(x0, x1), y: Math.min(y0, y1), w: Math.abs(x1 - x0), h: Math.abs(y1 - y0)};
  }

  function muovi(e){
    if (!stato) return;
    const q = campo.inMetri(e);
    if (!q) return;
    if (e.cancelable) e.preventDefault();
    const dx = q.x - stato.x0, dy = q.y - stato.y0;
    if (Math.hypot(dx, dy) > 0.25) stato.mosso = true;

    if (stato.tipo === 'pedina'){
      stato.x = dentroX(q.x + stato.ox); stato.y = dentroY(q.y + stato.oy);
      stato.g.setAttribute('transform', 'translate(' + stato.x + ',' + stato.y + ')');
      if (campo.alzaPedine && campo.angolo && campo.angolo()) campo.alzaPedine();
    } else if (stato.tipo === 'zona'){
      stato.x = stato.ex + dx; stato.y = stato.ey + dy;
      stato.g.setAttribute('transform', 'translate(' + dx + ',' + dy + ')');
    } else if (stato.tipo === 'maniglia'){
      stato.w = Math.max(MINIMO, dentroX(stato.ex + stato.ew + dx) - stato.ex);
      stato.h = Math.max(MINIMO, dentroY(stato.ey + stato.eh + dy) - stato.ey);
      campo.anteprima({x: stato.ex, y: stato.ey, w: stato.w, h: stato.h});
    } else if (stato.tipo === 'nuova'){
      stato.r = rettangolo(stato.x0, stato.y0, q.x, q.y);
      campo.anteprima(stato.r);
    } else if (stato.tipo === 'misura-nuova'){
      stato.a = {x: dentroX(q.x), y: dentroY(q.y)};
      campo.anteprima({misura: [stato.da, stato.a]});
    } else if (stato.tipo === 'capo'){
      stato.a = {x: dentroX(q.x), y: dentroY(q.y)};
      campo.anteprima({misura: [stato.altro, stato.a]});
    }
  }

  function stacca(){
    document.removeEventListener('mousemove', muovi, true);
    document.removeEventListener('mouseup', fine, true);
    document.removeEventListener('touchmove', muovi, {capture:true, passive:false});
    document.removeEventListener('touchend', fine, true);
    document.removeEventListener('touchcancel', fine, true);
  }

  function fine(evento){
    if (!stato) return;
    const s = stato; stato = null;
    if (s.g) s.g.classList.remove('trascino');
    stacca();
    campo.anteprima(null);

    if (s.tipo === 'pedina'){
      if (s.mosso) alRilascio(s.id, s.x, s.y);
      else seleziona(s.id);
    } else if (s.tipo === 'zona'){
      if (s.mosso && zona.sposta) zona.sposta(s.id, s.x, s.y);
      else seleziona(s.id);
    } else if (s.tipo === 'linea'){
      seleziona(s.id);
    } else if (s.tipo === 'maniglia'){
      if (s.mosso && zona.ridimensiona) zona.ridimensiona(s.id, s.w, s.h);
    } else if (s.tipo === 'nuova'){
      if (s.mosso && s.r && s.r.w >= MINIMO && s.r.h >= MINIMO && zona.crea) zona.crea(s.r.x, s.r.y, s.r.w, s.r.h);
    } else if (s.tipo === 'misura-nuova'){
      if (s.mosso && s.a && misura.crea){
        const sotto = giocatoreSotto(evento);
        const arrivo = sotto ? Object.assign({giocatore: sotto.dataset.id}, posizioneDi(sotto)) : s.a;
        if (Math.hypot(arrivo.x - s.da.x, arrivo.y - s.da.y) >= 1) misura.crea(s.da, arrivo);
      }
    } else if (s.tipo === 'capo'){
      if (s.mosso && s.a && misura.spostaCapo){
        const sotto = giocatoreSotto(evento);
        misura.spostaCapo(s.id, s.capo, sotto ? {giocatore: sotto.dataset.id} : {x: s.a.x, y: s.a.y});
      }
    } else if (s.tipo === 'vuoto'){
      seleziona(null);
    }
  }

  function inizio(e){
    const q = campo.inMetri(e);
    if (!q) return;
    const bersaglio = e.target.closest ? e.target.closest('.maniglia-capo, .maniglia, .scritta, .pedina, .misura, .evidenza, .linea, .zona') : null;
    const base = {x0: q.x, y0: q.y, mosso: false};

    /* strumenti che disegnano clic dopo clic (le frecce del basket): il clic
       e' loro, niente si trascina */
    if (opzioni.clic && opzioni.clic({x: dentroX(q.x), y: dentroY(q.y)}, eGiocatore(bersaglio) ? bersaglio.dataset.id : null, e)){
      if (e.cancelable) e.preventDefault();
      return;
    }

    /* disegnando una linea o scegliendo chi evidenziare si cliccano solo i
       giocatori, niente si trascina */
    if (modo() === 'linea' || modo() === 'evidenza' || modo() === 'passaggio' || modo() === 'tiro' || modo() === 'palla' || modo() === 'gomma'){
      if (e.cancelable) e.preventDefault();
      if (eGiocatore(bersaglio)) giocatoreCliccato(bersaglio.dataset.id);
      return;
    }

    /* posare giocatori e attrezzi: un clic, un oggetto, e si resta in questa modalita' */
    if (modo() === 'posa'){
      if (e.cancelable) e.preventDefault();
      if (opzioni.posa) opzioni.posa(dentroX(q.x), dentroY(q.y));
      return;
    }

    /* scritta nuova: sul giocatore gli si attacca sopra, altrove resta in quel punto */
    if (modo() === 'scritta'){
      if (e.cancelable) e.preventDefault();
      if (!scritta.crea) return;
      if (eGiocatore(bersaglio)){
        scritta.crea({giocatore: bersaglio.dataset.id});
      } else {
        scritta.crea({x: dentroX(q.x), y: dentroY(q.y)});
      }
      return;
    }

    if (modo() === 'misura'){
      const g = eGiocatore(bersaglio) ? bersaglio : null;
      const da = g ? Object.assign({giocatore: g.dataset.id}, posizioneDi(g)) : {x: dentroX(q.x), y: dentroY(q.y)};
      stato = Object.assign(base, {tipo: 'misura-nuova', da: da});
    } else if (bersaglio && bersaglio.classList.contains('maniglia-capo')){
      stato = Object.assign(base, {tipo: 'capo', id: bersaglio.dataset.id, capo: +bersaglio.dataset.capo,
        altro: {x: +bersaglio.dataset.ax, y: +bersaglio.dataset.ay}});
    } else if (modo() === 'zona'){
      stato = Object.assign(base, {tipo: 'nuova'});
    } else if (!bersaglio){
      stato = Object.assign(base, {tipo: 'vuoto'});
    } else if (bersaglio.classList.contains('maniglia')){
      const z = bersaglio.closest('.zona');
      stato = Object.assign(base, {tipo: 'maniglia', id: bersaglio.dataset.id,
        ex: +z.dataset.x, ey: +z.dataset.y, ew: +z.dataset.w, eh: +z.dataset.h,
        w: +z.dataset.w, h: +z.dataset.h});
    } else if (bersaglio.classList.contains('scritta') && bersaglio.dataset.attaccata === '1'){
      /* attaccata a un giocatore: segue lui, si puo' solo selezionare */
      stato = Object.assign(base, {tipo: 'linea', id: bersaglio.dataset.id});
    } else if (bersaglio.classList.contains('linea') || bersaglio.classList.contains('evidenza') || bersaglio.classList.contains('misura')){
      stato = Object.assign(base, {tipo: 'linea', id: bersaglio.dataset.id});
    } else if (bersaglio.classList.contains('pedina')){
      /* presa per il corpo di una pedina in piedi (3D): resta dove la si e'
         presa; sul campo piatto invece la pedina va sotto il puntatore */
      const dove = posizioneDi(bersaglio), inPiedi = !!e.__rilanciato;
      stato = Object.assign(base, {tipo: 'pedina', id: bersaglio.dataset.id, g: bersaglio, x: q.x, y: q.y,
                                   ox: inPiedi ? dove.x - q.x : 0, oy: inPiedi ? dove.y - q.y : 0});
      bersaglio.classList.add('trascino');
    } else {
      stato = Object.assign(base, {tipo: 'zona', id: bersaglio.dataset.id, g: bersaglio,
        ex: +bersaglio.dataset.x, ey: +bersaglio.dataset.y,
        x: +bersaglio.dataset.x, y: +bersaglio.dataset.y});
      bersaglio.classList.add('trascino');
    }

    if (e.cancelable) e.preventDefault();
    document.addEventListener('mousemove', muovi, true);
    document.addEventListener('mouseup', fine, true);
    document.addEventListener('touchmove', muovi, {capture:true, passive:false});
    document.addEventListener('touchend', fine, true);
    document.addEventListener('touchcancel', fine, true);
  }

  campo.svg.addEventListener('mousedown', inizio);
  campo.svg.addEventListener('touchstart', inizio, {passive:false});

  return {
    /* la palla lasciata vicino a un giocatore gli si aggancia alla spalla */
    agganciaPalla: function(fase, x, y){
      let vicino = null, minima = Infinity;
      (fase.elementi || []).forEach(function(p){
        if (p.tipo !== 'giocatore') return;
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < minima){ minima = d; vicino = p; }
      });
      if (vicino && minima < R * 2.6) return {x: vicino.x + 1.9, y: vicino.y - 1.9};
      return {x, y};
    }
  };
}

return { abilitaTrascinamento };
})();
/* ---- src/renderer/core/lingua.js ---- */
const __vdm_src_renderer_core_lingua_js = (function(){
/* Le scritte del motore in piu' lingue.
 *
 * Il motore nasce in italiano: le chiavi SONO le frasi italiane, cosi' il
 * codice resta leggibile e dove non c'e' traduzione si vede l'italiano
 * (Italbasket, VDM Soccer Coach). Chi lo ospita (VDM Basketball Coach)
 * sceglie la lingua e passa i dizionari: se manca una frase nella lingua
 * scelta si prende l'inglese, come fa l'app. {nome} nelle frasi = un valore. */

let lingua = 'it';
let dizionari = {};

function impostaLingua(nuova, nuoviDizionari){
  lingua = nuova || 'it';
  if (nuoviDizionari) dizionari = nuoviDizionari;
}
function linguaAttuale(){ return lingua; }

function T(frase, valori){
  let s = frase;
  if (lingua !== 'it'){
    const d = dizionari[lingua] || {}, en = dizionari.en || {};
    if (d[frase] != null) s = d[frase];
    else if (en[frase] != null) s = en[frase];
  }
  if (valori) Object.keys(valori).forEach(function(k){ s = s.split('{' + k + '}').join(valori[k]); });
  return s;
}

/* Tradurre un pezzo di pagina scritto in italiano (la lavagna): i testi, i
 * title/placeholder, e gli elementi con data-tr-html (paragrafi con dentro
 * del grassetto) tutti interi. L'italiano di partenza si ricorda, cosi' si
 * puo' cambiare lingua quante volte si vuole. */
const originali = new WeakMap();
function traduciPagina(radice){
  if (!radice) return;
  radice.querySelectorAll('[data-tr-html]').forEach(function(el){
    if (!el.hasAttribute('data-tr-orig')) el.setAttribute('data-tr-orig', el.innerHTML.replace(/\s+/g, ' ').trim());
    el.innerHTML = T(el.getAttribute('data-tr-orig'));
  });
  const cammina = document.createTreeWalker(radice, NodeFilter.SHOW_TEXT, {
    acceptNode: function(n){
      return n.parentElement && n.parentElement.closest('[data-tr-html], script, style, svg, .vl-campo, .vl-anteprima') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodi = [];
  while (cammina.nextNode()) nodi.push(cammina.currentNode);
  nodi.forEach(function(n){
    if (!originali.has(n)){
      const t = n.nodeValue;
      if (!/[A-Za-zÀ-ú]{2}/.test(t)) return;
      originali.set(n, t);
    }
    const t = originali.get(n);
    if (t == null) return;
    const dentro = t.trim(), prima = t.slice(0, t.indexOf(dentro)), dopo = t.slice(t.indexOf(dentro) + dentro.length);
    n.nodeValue = prima + T(dentro.replace(/\s+/g, ' ')) + dopo;
  });
  ['title', 'placeholder', 'aria-label'].forEach(function(a){
    radice.querySelectorAll('[' + a + ']').forEach(function(el){
      if (el.closest('.vl-campo, .vl-anteprima')) return;
      const chiave = 'data-tr-' + a;
      if (!el.hasAttribute(chiave)) el.setAttribute(chiave, el.getAttribute(a));
      el.setAttribute(a, T(el.getAttribute(chiave)));
    });
  });
}

/* I nomi che il motore da' da solo ai tempi (Partenza, Tempo 2, Tiro...)
 * restano salvati in italiano nel gioco: si mostrano nella lingua scelta.
 * Un nome scritto a mano dal coach non si tocca. */
function nomeFase(nome){
  if (lingua === 'it' || typeof nome !== 'string') return nome;
  if (nome === 'Partenza' || nome === 'Tiro') return T(nome);
  const m = /^(?:Tempo|Fase) (\d+)$/.exec(nome);
  return m ? T('Tempo {n}', {n: m[1]}) : nome;
}

return { impostaLingua, linguaAttuale, T, traduciPagina, nomeFase };
})();
/* ---- src/renderer/ui/esportaVideo.js ---- */
const __vdm_src_renderer_ui_esportaVideo_js = (function(){
/* Il diagramma animato come filmato .mp4: da mandare nel gruppo WhatsApp o
 * da far vedere su un telefono.
 *
 * Stesso motore del basket: WebCodecs comprime i fotogrammi in H.264,
 * mp4-muxer li impacchetta. Il disegno e' quello della schermata (ui/campo.js):
 * ogni fotogramma e' il campo SVG trasformato in immagine, cosi' il video e'
 * identico a quello che l'allenatore vede mentre lo costruisce.
 *
 * Niente GIF, di proposito: su WhatsApp e sui telefoni un .mp4 pesa un decimo,
 * si vede meglio e parte da solo. */
const { interpola } = __vdm_src_renderer_core_animazione_js;
const { Campo, proiettaPiano, angoliInVista, disegnaInPiedi, disegnaSpessore, cimaInVista } = __vdm_src_renderer_ui_campo_js;
const { haCartello, durataCartello, percorsoPalla } = __vdm_src_renderer_core_modello_js;
const { T, nomeFase } = __vdm_src_renderer_core_lingua_js;

const W = 1280, H = 720;          // avc1.42001f arriva esattamente fin qui
const FPS = 30;
const BANDA = 84;                 // la striscia in basso con nome e fase
const CODEC = 'avc1.42001f';      // H.264, quello che aprono tutti (come il basket)
const BITRATE = 2500000;          // la misura scelta nel basket

/* Le pause: chi guarda deve avere il tempo di capire da dove si parte, e di
 * leggere le frecce di ogni fase prima che parta la successiva. Secondi. */
const FERMO_INIZIO = 1.0, FERMO_FASE = 0.9, FERMO_FINE = 1.8;

const VARIABILI = ['--erba', '--riga', '--contorno', '--casa', '--avversario', '--palla', '--passaggio', '--palleggio', '--blocco', '--taglio', '--numero'];
const CARATTERE = '-apple-system,"Helvetica Neue","Segoe UI",Arial,sans-serif';

async function videoSupportato(){
  if (typeof VideoEncoder === 'undefined' || typeof Mp4Muxer === 'undefined') return false;
  try {
    const r = await VideoEncoder.isConfigSupported({
      codec: CODEC, width: W, height: H, bitrate: BITRATE, framerate: FPS, avc: {format: 'avc'}
    });
    return !!(r && r.supported);
  } catch (e) { return false; }
}

async function esportaVideo(o){
  const sport = o.sport, squadra = o.squadra, es = o.esercitazione;
  /* la vista dell'esercitazione: dall'alto, oppure campo inclinato */
  const gradi = (es.vista && es.vista.angolo) || 0;
  const giro = gradi > 0 ? ((es.vista && es.vista.giro) || 0) : 0;
  const opzioni = Object.assign({}, o.opzioni || {}, {spessore: gradi > 0, selezionata: null});
  const avanzamento = o.avanzamento || function(){};
  const passaggio = Math.max(0.3, (o.durataPassaggio || 2600) / 1000);

  if (es.fasi.length < 2) throw new Error(T('Servono almeno due fasi per fare un video.'));
  if (!(await videoSupportato())) throw new Error(T('Questo computer non riesce a creare video H.264.'));

  /* ---- il campo fuori schermo, disegnato dallo stesso codice della schermata ---- */
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const campo = Campo(svg, sport);
  campo.impostaCampo(es.campo);

  /* Un'immagine SVG non vede le variabili CSS della pagina: i colori si
   * risolvono qui e si scrivono dentro. */
  const stile = getComputedStyle(document.documentElement);
  const colori = {};
  VARIABILI.forEach(function(v){ colori[v] = stile.getPropertyValue(v).trim(); });

  const altezzaCampo = H - BANDA;
  const vb = svg.getAttribute('viewBox').split(/\s+/).map(Number);
  const scala = Math.min(W / vb[2], altezzaCampo / vb[3]);
  let pw = Math.round(vb[2] * scala), ph = Math.round(vb[3] * scala);
  const px = Math.round((W - pw) / 2), py = Math.round((altezzaCampo - ph) / 2);

  /* ---- campo inclinato: la stessa geometria dell'editor ----
     si calcola quanto grande deve essere il campo piatto perche', una volta
     inclinato, stia tutto nel riquadro; l'immagine piatta si disegna piu'
     grande del necessario, cosi' dopo la piega resta nitida */
  let piega = null;
  if (gradi > 0){
    const lato = function(w, h){
      const a = angoliInVista(w, h, gradi, giro).angoli;
      const xs = a.map(function(p){ return p.x; }), ys = a.map(function(p){ return p.y; });
      /* sopra il bordo lontano ci vuole posto per le figure in piedi (nel
         basket anche per il canestro, alto 3,95 m); sotto, per lo spessore */
      const riquadro = {x: vb[0], y: vb[1], width: vb[2], height: vb[3]};
      const alto = Math.min(Math.min.apply(null, ys), cimaInVista(w, h, gradi, giro, riquadro, sport)) - w * .01;
      const basso = Math.max.apply(null, ys) + w * .03;
      return {largo: 2 * Math.max.apply(null, xs.map(Math.abs)), alto: basso - alto, centro: (alto + basso) / 2};
    };
    const prova = lato(vb[2], vb[3]);
    const f = Math.min(W * 0.97 / prova.largo, altezzaCampo * 0.95 / prova.alto);
    const larga = vb[2] * f, alta = vb[3] * f;
    const qualita = Math.min(1.5, 2048 / larga);
    piega = {
      larga: larga, alta: alta,
      cx: W / 2, cy: altezzaCampo / 2 - lato(larga, alta).centro,
      tw: Math.round(larga * qualita), th: Math.round(alta * qualita)
    };
    pw = piega.tw; ph = piega.th;
  }
  svg.setAttribute('width', pw);
  svg.setAttribute('height', ph);
  svg.setAttribute('font-family', CARATTERE);

  /* la piega la fa la scheda grafica: un quadrilatero con la prospettiva vera
     (coordinata w), cosi' anche l'interno del campo si deforma giusto */
  let gl = null, telaGL = null, pianoPiatto = null, texture = null;
  if (piega){
    telaGL = document.createElement('canvas');
    telaGL.width = W; telaGL.height = altezzaCampo;
    gl = telaGL.getContext('webgl', {premultipliedAlpha: false, preserveDrawingBuffer: true, antialias: true});
    if (!gl) throw new Error(T('Questo computer non riesce a fare il video con il campo inclinato (WebGL non disponibile).'));
    const shader = function(tipo, sorgente){
      const sh = gl.createShader(tipo);
      gl.shaderSource(sh, sorgente); gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error('WebGL: ' + gl.getShaderInfoLog(sh));
      return sh;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, shader(gl.VERTEX_SHADER,
      'attribute vec4 aPos; attribute vec2 aUV; varying vec2 vUV;' +
      'void main(){ gl_Position = aPos; vUV = aUV; }'));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER,
      'precision mediump float; varying vec2 vUV; uniform sampler2D uTex;' +
      'void main(){ gl_FragColor = texture2D(uTex, vUV); }'));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const angoli = [[-1, -1, 0, 0], [1, -1, 1, 0], [-1, 1, 0, 1], [1, 1, 1, 1]];
    const dati = [];
    angoli.forEach(function(c){
      const p = proiettaPiano(c[0] * piega.larga / 2, c[1] * piega.alta / 2, piega.larga, gradi, giro);
      const sx = piega.cx + p.x, sy = piega.cy + p.y, wc = 1 / p.s;
      dati.push((sx / W * 2 - 1) * wc, (1 - sy / altezzaCampo * 2) * wc, 0, wc, c[2], c[3]);
    });
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dati), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos'), aUV = gl.getAttribLocation(prog, 'aUV');
    gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 4, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(aUV); gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 24, 16);

    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    pianoPiatto = document.createElement('canvas');
    pianoPiatto.width = piega.tw; pianoPiatto.height = piega.th;
  }

  const tela = document.createElement('canvas');
  tela.width = W; tela.height = H;
  const ctx = tela.getContext('2d');

  function taglia(testo, massimo){
    testo = String(testo || '');
    if (ctx.measureText(testo).width <= massimo) return testo;
    while (testo.length > 1 && ctx.measureText(testo + '…').width > massimo) testo = testo.slice(0, -1);
    return testo + '…';
  }

  async function componi(etichetta){
    /* col campo inclinato le pedine si rialzano dopo la piega */
    if (piega) campo.mostraPiatte(false);
    let xml = new XMLSerializer().serializeToString(svg);
    xml = xml.replace(/var\((--[a-z-]+)\)/g, function(_m, nome){ return colori[nome] || '#000'; });
    const url = URL.createObjectURL(new Blob([xml], {type: 'image/svg+xml'}));
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      if (piega){
        pianoPiatto.getContext('2d').drawImage(img, 0, 0, piega.tw, piega.th);
        gl.viewport(0, 0, W, altezzaCampo);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pianoPiatto);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        const sfondo = ctx.createRadialGradient(W/2, altezzaCampo * 0.35, 20, W/2, altezzaCampo * 0.35, W * 0.75);
        sfondo.addColorStop(0, '#16233D');
        sfondo.addColorStop(1, '#0A0E17');
        ctx.fillStyle = sfondo;
        ctx.fillRect(0, 0, W, H);
        /* il fianco del pavimento sotto il bordo vicino, poi il campo */
        angoliInVista(piega.larga, piega.alta, gradi, giro).fianchi.forEach(function(fi){
          const a = fi[0], b = fi[1], sn = a.x <= b.x ? a : b, dx = a.x <= b.x ? b : a;
          disegnaSpessore(ctx, {x: piega.cx + sn.x, y: piega.cy + sn.y}, {x: piega.cx + dx.x, y: piega.cy + dx.y},
                          Math.round(piega.larga * .022 * (a.s + b.s) / 2));
        });
        ctx.drawImage(telaGL, 0, 0);
        const f = piega.larga / vb[2];
        disegnaInPiedi(ctx, campo.pedineInPiedi(), function(x, y){
          const X = (x - vb[0]) * f - piega.larga / 2, Y = (y - vb[1]) * f - piega.alta / 2;
          const p = proiettaPiano(X, Y, piega.larga, gradi, giro);
          return {sx: piega.cx + p.x, sy: piega.cy + p.y, k: f * p.s};
        }, gradi, function(c){
          const m = /^var\((--[a-z-]+)\)$/.exec(String(c || ''));
          return m ? colori[m[1]] : c;
        }, {omini: sport.NOTAZIONE === 'basket', giroVista: giro,
            canestri: sport.canestri3D ? sport.canestri3D() : null, raggio: sport.CAMPO.raggioGiocatore, unita: sport.UNITA_PER_METRO});
      } else {
        ctx.fillStyle = '#0B1220';
        ctx.fillRect(0, 0, W, H);
        ctx.drawImage(img, px, py, pw, ph);
      }
    } finally {
      URL.revokeObjectURL(url);
    }
    banda(etichetta);
  }

  /* la striscia in basso: nome dell'esercitazione e fase */
  function banda(etichetta){
    ctx.fillStyle = '#101A2E';
    ctx.fillRect(0, altezzaCampo, W, BANDA);
    ctx.fillStyle = '#1E2A44';
    ctx.fillRect(0, altezzaCampo, W, 1);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#22D3EE';
    ctx.font = '700 17px ' + CARATTERE;
    ctx.fillText(o.marchio || 'VDM SOCCER COACH', W - 36, altezzaCampo + 49);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#E7ECF5';
    ctx.font = '600 27px ' + CARATTERE;
    ctx.fillText(taglia(es.nome, W - 320), 36, altezzaCampo + 36);
    ctx.fillStyle = '#8B96AC';
    ctx.font = '400 21px ' + CARATTERE;
    ctx.fillText(taglia(etichetta, W - 320), 36, altezzaCampo + 67);
  }

  /* il cartello prima di una fase: occupa il posto del campo, la striscia resta */
  function righe(testo, massimo){
    const out = [];
    String(testo || '').split('\n').forEach(function(paragrafo){
      const parole = paragrafo.split(/\s+/).filter(Boolean);
      let riga = '';
      parole.forEach(function(p){
        const prova = riga ? riga + ' ' + p : p;
        if (ctx.measureText(prova).width > massimo && riga){ out.push(riga); riga = p; }
        else riga = prova;
      });
      out.push(riga);
    });
    return out;
  }

  function componiCartello(fase, etichetta){
    const sfondo = ctx.createLinearGradient(0, 0, 0, altezzaCampo);
    sfondo.addColorStop(0, '#131A2A');
    sfondo.addColorStop(1, '#0A0E17');
    ctx.fillStyle = sfondo;
    ctx.fillRect(0, 0, W, altezzaCampo);
    ctx.fillStyle = '#00E5FF';
    ctx.fillRect(W/2 - 40, altezzaCampo * 0.30, 80, 4);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 50px ' + CARATTERE;
    const titoli = righe(fase.cartello.titolo, W - 240).filter(Boolean);
    ctx.font = '400 27px ' + CARATTERE;
    const testo = righe(fase.cartello.testo, W - 320).filter(function(r, i, a){ return r || i < a.length - 1; });
    const altezzaTitoli = titoli.length * 60, altezzaTesto = testo.length * 40;
    let y = Math.max(altezzaCampo * 0.30 + 70, (altezzaCampo - altezzaTitoli - altezzaTesto - 24) / 2 + 44);
    ctx.font = '800 50px ' + CARATTERE;
    ctx.fillStyle = '#FFFFFF';
    titoli.forEach(function(r){ ctx.fillText(r, W/2, y); y += 60; });
    y += 18;
    ctx.font = '400 27px ' + CARATTERE;
    ctx.fillStyle = '#8892AC';
    testo.forEach(function(r){ ctx.fillText(r, W/2, y); y += 40; });
    ctx.textAlign = 'left';
    banda(etichetta);
  }

  /* ---- compressore e contenitore, configurati come nel basket ---- */
  let guaio = null;
  const muxer = new Mp4Muxer.Muxer({
    target: new Mp4Muxer.ArrayBufferTarget(),
    video: { codec: 'avc', width: W, height: H },
    fastStart: 'in-memory',
    firstTimestampBehavior: 'offset'
  });
  const enc = new VideoEncoder({
    output: function(chunk, meta){ muxer.addVideoChunk(chunk, meta); },
    error: function(e){ guaio = e; }
  });
  enc.configure({
    codec: CODEC, width: W, height: H,
    bitrate: BITRATE, framerate: FPS,
    latencyMode: 'quality',
    avc: { format: 'avc' }
  });

  const quanti = function(secondi){ return Math.max(1, Math.round(secondi * FPS)); };
  const perPassaggio = quanti(passaggio);
  const segmenti = es.fasi.length - 1;
  const fotogrammiCartello = function(fase){
    return haCartello(fase) ? quanti(durataCartello(fase) / 1000) : 0;
  };
  const totale = quanti(FERMO_INIZIO) + segmenti * perPassaggio +
                 (segmenti - 1) * quanti(FERMO_FASE) + quanti(FERMO_FINE) +
                 es.fasi.reduce(function(t, f){ return t + fotogrammiCartello(f); }, 0);
  const passo = Math.round(1e6 / FPS);
  let n = 0;

  async function incidi(volte){
    for (let k = 0; k < volte; k++){
      if (guaio) throw guaio;
      const f = new VideoFrame(tela, { timestamp: n * passo, duration: passo });
      // un fotogramma chiave ogni due secondi: si puo' saltare avanti nel video
      enc.encode(f, { keyFrame: n % (FPS * 2) === 0 });
      f.close();
      n++;
      while (enc.encodeQueueSize > 8) await new Promise(function(r){ setTimeout(r, 4); });
      avanzamento(Math.min(0.99, n / totale));
    }
  }

  const titoloFase = function(i){
    return T('Fase {n} di {tot}', {n: i + 1, tot: es.fasi.length}) + ' · ' + nomeFase(es.fasi[i].nome);
  };

  try {
    if (haCartello(es.fasi[0])){
      componiCartello(es.fasi[0], titoloFase(0));
      await incidi(fotogrammiCartello(es.fasi[0]));
    }
    /* basket: il fermo mostra il diagramma coi simboli di quello che sta per succedere */
    const diagramma = sport.DIAGRAMMA && campo.disegnaDiagramma;
    const fermo = function(i){
      if (diagramma) campo.disegnaDiagramma(es.fasi[i], es.fasi[i + 1] || null, squadra, opzioni);
      else campo.disegna(es.fasi[i], i > 0 ? es.fasi[i - 1] : null, squadra, opzioni);
    };
    fermo(0);
    await componi(titoloFase(0));
    await incidi(quanti(diagramma ? FERMO_INIZIO + .5 : FERMO_INIZIO));

    for (let s = 0; s < segmenti; s++){
      const a = es.fasi[s], b = es.fasi[s + 1];
      if (haCartello(b)){
        componiCartello(b, titoloFase(s + 1));
        await incidi(fotogrammiCartello(b));
      }
      const quantiQui = sport.durataRelativa ? Math.round(perPassaggio * sport.durataRelativa(a, b)) : perPassaggio;
      for (let k = 0; k < quantiQui; k++){
        const p = quantiQui === 1 ? 1 : k / (quantiQui - 1);
        campo.disegnaFotogramma(interpola(a, b, p, sport.ritmo), squadra, opzioni, {punti: sport.sciaPalla ? sport.sciaPalla(a, b) : percorsoPalla(a, b)});
        await componi(titoloFase(s + 1));
        await incidi(1);
      }
      /* fermo sulla fase appena arrivata, con le frecce che spiegano cosa e' successo */
      fermo(s + 1);
      await componi(titoloFase(s + 1));
      await incidi(s === segmenti - 1 ? quanti(FERMO_FINE) : quanti(diagramma ? .35 : FERMO_FASE));
    }

    await enc.flush();
    if (guaio) throw guaio;
  } finally {
    try { enc.close(); } catch (e) {}
  }
  muxer.finalize();
  avanzamento(1);
  return new Blob([muxer.target.buffer], { type: 'video/mp4' });
}

return { videoSupportato, esportaVideo };
})();
/* ---- src/renderer/ui/finestra.js ---- */
const __vdm_src_renderer_ui_finestra_js = (function(){
/* La finestra interna: chiede un nome, conferma, avvisa.
 * Dentro l'app prompt() non esiste e confirm()/alert() sono finestre di
 * sistema fuori stile: il basket le ha sostituite tutte con una modale sua,
 * e qui si fa lo stesso. Ogni funzione restituisce una Promise. */

const { T } = __vdm_src_renderer_core_lingua_js;

const $ = function(s){ return document.getElementById(s); };
let chiudi = null;

function apri(titolo, messaggio, conCampo, valore, segnaposto, etichettaOk, conAnnulla, scelte){
  const overlay = $('finestra'), campo = $('finestraCampo');
  const boxScelte = $('finestraScelte');
  boxScelte.innerHTML = '';
  boxScelte.hidden = !scelte;
  $('finestraOk').hidden = !!scelte;
  $('finestraTitolo').textContent = titolo;
  $('finestraMessaggio').textContent = messaggio || '';
  $('finestraMessaggio').hidden = !messaggio;
  campo.hidden = !conCampo;
  campo.value = valore || '';
  campo.placeholder = segnaposto || '';
  $('finestraOk').textContent = etichettaOk || 'OK';
  $('finestraAnnulla').hidden = !conAnnulla;
  overlay.classList.add('show');
  setTimeout(function(){
    if (conCampo){ campo.focus(); campo.select(); } else { $('finestraOk').focus(); }
  }, 30);

  return new Promise(function(risolvi){
    if (scelte){
      scelte.forEach(function(sc){
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'btn scelta';
        b.textContent = sc.etichetta;
        b.dataset.valore = sc.valore;
        b.onclick = function(){ overlay.classList.remove('show'); chiudi = null; risolvi(sc.valore); };
        boxScelte.appendChild(b);
      });
      setTimeout(function(){ const primo = boxScelte.querySelector('button'); if (primo) primo.focus(); }, 30);
    }
    chiudi = function(ok){
      overlay.classList.remove('show');
      chiudi = null;
      if (scelte) return risolvi(null);
      if (!ok) return risolvi(conCampo ? null : false);
      if (conCampo){
        const v = campo.value.trim();
        return risolvi(v || null);
      }
      risolvi(true);
    };
  });
}

$('finestraOk').addEventListener('click', function(){ if (chiudi) chiudi(true); });
$('finestraAnnulla').addEventListener('click', function(){ if (chiudi) chiudi(false); });
$('finestra').addEventListener('click', function(e){ if (e.target === this && chiudi) chiudi(false); });
document.addEventListener('keydown', function(e){
  if (!chiudi) return;
  if (e.key === 'Escape'){ e.preventDefault(); chiudi(false); }
  else if (e.key === 'Enter' && !$('finestraOk').hidden){ e.preventDefault(); chiudi(true); }
}, true);

function aperta(){ return !!chiudi; }

function chiediTesto(titolo, segnaposto, valore){
  return apri(titolo, '', true, valore, segnaposto, 'OK', true);
}
function conferma(messaggio, etichettaOk){
  return apri(T('Conferma'), messaggio, false, '', '', etichettaOk || T('Conferma'), true);
}
/* una scelta fra alcune opzioni: restituisce il valore scelto, o null */
function scegli(titolo, messaggio, scelte){
  return apri(titolo, messaggio, false, '', '', 'OK', true, scelte);
}

let nomeProgramma = 'VDM Soccer Coach';
function impostaNome(nome){ nomeProgramma = nome; }

function avviso(messaggio){
  return apri(nomeProgramma, messaggio, false, '', '', 'OK', false);
}

return { aperta, chiediTesto, conferma, scegli, impostaNome, avviso };
})();
/* ---- src/renderer/sport/basket.js ---- */
const __vdm_src_renderer_sport_basket_js = (function(){
const { curva, percorsoPalla } = __vdm_src_renderer_core_modello_js;

/* Modulo sport: BASKET.
   Il gemello di calcio.js: il motore (core/ e ui/) non sa che sport disegna.
   Prima casa: il Playbook di Italbasket Woman (17/09).

   Le unita'. Il motore e' tarato su un campo da 105 x 68: pedine, frecce,
   scritte e margini hanno misure pensate per quella scala. Invece di
   ritoccarle tutte, il campo da basket si disegna nella stessa scala: un
   metro vale UNITA_PER_METRO unita'. Il mezzo campo (15 x 14 m) diventa
   56 x 52 unita', il campo intero (28 x 15 m) 105 x 56: una pedina resta
   larga come nel calcio rispetto a quello che si vede, e le misure si
   riconvertono in metri veri quando si scrivono. */

const SPORT = 'basket';
const NOTAZIONE = 'basket';
const UNITA_PER_METRO = 3.75;
const U = UNITA_PER_METRO;

/* Le misure FIBA, in metri. */
const LARGO = 15, LUNGO = 28, META = 14;
const AREA_LARGA = 4.9, AREA_LUNGA = 5.8;
const CANESTRO = 1.575, TABELLONE = 1.2;
const RAGGIO_TRE = 6.75, TRE_DAL_LATO = 0.9;
const RAGGIO_CERCHIO = 1.8, RAGGIO_SFONDAMENTO = 1.25;

const MODI = {
  mezzo:  {nome: 'Metà campo', lunghezza: LARGO * U, larghezza: META * U},
  intero: {nome: 'Campo intero', lunghezza: LUNGO * U, larghezza: LARGO * U}
};

/* un arco come spezzata: niente flag degli archi SVG da girare quando il
   mezzo campo si specchia per fare il campo intero */
function arco(cx, cy, r, da, a, passi){
  const punti = [];
  const n = passi || 40;
  for (let i = 0; i <= n; i++){
    const t = (da + (a - da) * i / n) * Math.PI / 180;
    punti.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
  }
  return punti;
}

/* Il mezzo campo in metri: x da sinistra a destra (0..15), y dalla meta'
   campo (0) alla linea di fondo (14). Il canestro sta in basso. */
function mezzoCampoInMetri(){
  const cx = LARGO / 2, fondo = META, yc = fondo - CANESTRO;
  const dx3 = LARGO / 2 - TRE_DAL_LATO;
  const dy3 = Math.sqrt(RAGGIO_TRE * RAGGIO_TRE - dx3 * dx3);
  const ang3 = Math.atan2(dy3, dx3) * 180 / Math.PI;
  const area = [[cx - AREA_LARGA/2, fondo], [cx - AREA_LARGA/2, fondo - AREA_LUNGA],
                [cx + AREA_LARGA/2, fondo - AREA_LUNGA], [cx + AREA_LARGA/2, fondo]];
  return [
    {punti: area, riempi: true},
    {punti: arco(cx, fondo - AREA_LUNGA, RAGGIO_CERCHIO, 180, 360)},
    {punti: arco(cx, fondo - AREA_LUNGA, RAGGIO_CERCHIO, 0, 180), tratteggio: true},
    {punti: [[TRE_DAL_LATO, fondo], [TRE_DAL_LATO, yc - dy3]]},
    {punti: [[LARGO - TRE_DAL_LATO, fondo], [LARGO - TRE_DAL_LATO, yc - dy3]]},
    {punti: arco(cx, yc, RAGGIO_TRE, 180 + ang3, 360 - ang3, 60)},
    {punti: arco(cx, yc, RAGGIO_SFONDAMENTO, 180, 360, 24)},
    {punti: [[cx - 0.9, fondo - TABELLONE], [cx + 0.9, fondo - TABELLONE]], spesso: true},
    {punti: arco(cx, yc, 0.23, 0, 360, 20), canestro: true}
  ];
}

function creaSport(modo){
  const campo = MODI[modo] ? modo : 'mezzo';
  const misure = MODI[campo];
  return {
    SPORT, NOTAZIONE, UNITA_PER_METRO, MODO: campo,
    CAMPO: {lunghezza: misure.lunghezza, larghezza: misure.larghezza, raggioGiocatore: 2.25, raggioPalla: 1.35},
    /* fuori dalle linee resta spazio: rimesse da fondo e laterali */
    MARGINE: 6,
    canestri3D: function(){ return canestri3D(campo); },
    ritmo: ritmo,
    durataRelativa: durataRelativa,
    passiDi: passiDi,
    azioneDi: azioneDi,
    sciaPalla: sciaPalla,
    /* il playbook di carta: numeri e simboli, e ogni tempo si legge prima di vederlo */
    STILE: 'classico',
    DIAGRAMMA: true,
    lineeCampo: function(){ return lineeCampo(campo); },
    partenza: function(){ return partenza(campo); }
  };
}

/* da metri del mezzo campo a unita' del campo scelto. Nel campo intero si
   attacca verso destra; l'altra meta' e' la stessa specchiata. */
function trasforma(campo, lato){
  if (campo === 'mezzo') return function(p){ return [p[0] * U, p[1] * U]; };
  if (lato === 'destra') return function(p){ return [(META + p[1]) * U, p[0] * U]; };
  return function(p){ return [(META - p[1]) * U, (LARGO - p[0]) * U]; };
}

function lineeCampo(campo){
  const linee = [];
  const bordo = campo === 'mezzo' ? [LARGO * U, META * U] : [LUNGO * U, LARGO * U];
  linee.push({t:'rect', x:0, y:0, w:bordo[0], h:bordo[1]});
  const lati = campo === 'mezzo' ? ['mezzo'] : ['destra', 'sinistra'];
  lati.forEach(function(lato){
    const T = trasforma(campo, lato);
    mezzoCampoInMetri().forEach(function(l){
      linee.push({t:'poly', punti: l.punti.map(T), chiusa: !!l.canestro, tratteggio: !!l.tratteggio,
                  riempi: !!l.riempi, spessore: l.spesso ? .5 : null, colore: l.canestro ? '#FF7A1A' : null});
    });
  });
  if (campo === 'mezzo'){
    /* il cerchio di centrocampo, tagliato dalla linea di meta' campo */
    linee.push({t:'poly', punti: arco(LARGO/2 * U, 0, RAGGIO_CERCHIO * U, 0, 180)});
  } else {
    linee.push({t:'line', x1:META * U, y1:0, x2:META * U, y2:LARGO * U});
    linee.push({t:'circle', cx:META * U, cy:LARGO/2 * U, r:RAGGIO_CERCHIO * U});
  }
  return linee;
}

/* La partenza di un gioco nuovo: 4 fuori e 1 dentro, difesa fra ognuna e il
   canestro. In metri del mezzo campo. */
const ATTACCO = [
  {n:1, x:7.5,  y:4.0},
  {n:2, x:13.0, y:7.6},
  {n:3, x:2.0,  y:7.6},
  {n:4, x:13.8, y:12.6},
  {n:5, x:9.4,  y:11.3}
];

function partenza(campo){
  const T = trasforma(campo, 'destra');
  const canestro = [LARGO / 2, META - CANESTRO];
  const attacco = ATTACCO.map(function(g){
    const p = T([g.x, g.y]);
    return {n: g.n, x: p[0], y: p[1]};
  });
  const difesa = ATTACCO.map(function(g){
    const dx = canestro[0] - g.x, dy = canestro[1] - g.y, d = Math.hypot(dx, dy) || 1;
    const passo = Math.min(1.4, d * 0.3);
    const p = T([g.x + dx / d * passo, g.y + dy / d * passo]);
    return {n: 'X' + g.n, x: p[0], y: p[1]};
  });
  return {attacco: attacco, difesa: difesa};
}

/* i canestri in 3D: il centro del ferro (in unita') e la direzione verso
   la linea di fondo, dove stanno tabellone e palo */
function canestri3D(campo){
  const lati = campo === 'mezzo' ? ['mezzo'] : ['destra', 'sinistra'];
  return lati.map(function(lato){
    const T = trasforma(campo, lato);
    const c = T([LARGO / 2, META - CANESTRO]), f = T([LARGO / 2, META]);
    const d = Math.hypot(f[0] - c[0], f[1] - c[1]) || 1;
    return {x: c[0], y: c[1], dx: (f[0] - c[0]) / d, dy: (f[1] - c[1]) / d};
  });
}

/* dove sta il canestro d'attacco, in unita': serve al tiro */
function canestroDi(modo){
  const T = trasforma(MODI[modo] ? modo : 'mezzo', 'destra');
  const p = T([LARGO / 2, META - CANESTRO]);
  return {x: p[0], y: p[1]};
}

/* ---- le azioni del basket ----
 * Ogni giocatrice che si muove in una fase fa un'azione: taglio (senza
 * palla), palleggio (con la palla), blocco (va a bloccare e si ferma).
 * Se non e' scelta a mano si ricava: chi si porta dietro la palla palleggia,
 * gli altri tagliano. */
const vicinaAllaSpalla = function(g, palla){
  return !!palla && Math.hypot(palla.x - (g.x + 1.9), palla.y - (g.y - 1.9)) < 1;
};

function azioneDi(g, precedente, fase){
  if (g.azione) return g.azione;
  const prima = precedente && (precedente.elementi || []).find(function(e){ return e.id === g.id; });
  if (!prima) return null;
  const palleOra = (fase.elementi || []).filter(function(e){ return e.tipo === 'palla'; });
  const porta = palleOra.some(function(b){
    const bq = (precedente.elementi || []).find(function(e){ return e.id === b.id; });
    return !(b.tappe && b.tappe.length) && vicinaAllaSpalla(prima, bq) && vicinaAllaSpalla(g, b);
  });
  return porta ? 'palleggio' : 'taglio';
}

/* Le azioni di una giocatrice in un tempo, in fila: di solito una sola
 * (il campo azione), ma si puo' bloccare e poi buttarsi dentro o aprirsi
 * (il campo passi: [{azione, x, y, via}]). */
function passiDi(g, prima){
  if (Array.isArray(g.passi) && g.passi.length) return g.passi;
  if (!prima) return [];
  const mosso = Math.hypot(g.x - prima.x, g.y - prima.y) >= 1;
  if (!mosso && g.azione !== 'blocco') return [];
  return [{azione: g.azione || null, x: g.x, y: g.y, via: g.via}];
}

/* Il ritmo di un tempo, come si gioca, a VELOCITA' COSTANTE: ogni azione
 * dura quanto e' lunga (metri al secondo uguali per tutte, niente
 * accelerazioni ne' frenate). I momenti si danno il cambio: prima i blocchi,
 * poi chi li usa, poi le seconde azioni, e ognuno parte quando il precedente
 * e' a meta'. La palla parte in tempo per arrivare con chi la riceve.
 * Le durate sono in "tempi base": 1 = la durata scelta con la Velocita'. */
const ORDINE = ['blocchi', 'movimenti', 'seconde'];
const METRI_PER_TEMPO_BASE = 12;      // metri percorsi nella durata base (Velocita' normale)
const PASSAGGIO_PIU_VELOCE = 2.4;     // la palla va piu' veloce di chi corre
const MINIMO = .22;

function metri(punti){
  const c = curva(punti, 10);
  let l = 0;
  for (let i = 1; i < c.length; i++) l += Math.hypot(c[i].x - c[i - 1].x, c[i].y - c[i - 1].y);
  return l / UNITA_PER_METRO;
}

function analisi(a, b){
  const prima = new Map((a.elementi || []).map(function(e){ return [e.id, e]; }));
  /* le azioni di ogni giocatrice, con il momento e la durata */
  const azioni = [];
  (b.elementi || []).forEach(function(g){
    if (g.tipo !== 'giocatore') return;
    const g0 = prima.get(g.id);
    const passi = passiDi(g, g0);
    let da = g0;
    passi.forEach(function(s, i){
      const lungo = da ? metri([da].concat(s.via || [], [s])) : 0;
      azioni.push({id: g.id, indice: i, stadio: i > 0 ? 'seconde' : s.azione === 'blocco' ? 'blocchi' : 'movimenti',
                   durata: Math.max(MINIMO, lungo / METRI_PER_TEMPO_BASE)});
      da = s;
    });
  });
  const inizi = {};
  let t = 0, fineMovimenti = 0;
  ORDINE.forEach(function(s){
    const qui = azioni.filter(function(x){ return x.stadio === s; });
    if (!qui.length) return;
    const lungo = Math.max.apply(null, qui.map(function(x){ return x.durata; }));
    inizi[s] = t;
    qui.forEach(function(x){ x.da = t; x.a = t + x.durata; });
    t += lungo * .5;
  });
  /* la seconda azione di una giocatrice parte solo quando ha finito la prima */
  const ultimaDi = {};
  azioni.forEach(function(x){
    const prec = ultimaDi[x.id];
    if (prec && x.da < prec.a){ x.da = prec.a; x.a = x.da + x.durata; }
    ultimaDi[x.id] = x;
    fineMovimenti = Math.max(fineMovimenti, x.a);
  });
  /* palla: chi palleggia la porta; i passaggi arrivano con chi riceve */
  const portatori = new Map(), passaggi = new Map();
  (b.elementi || []).forEach(function(palla){
    if (palla.tipo !== 'palla') return;
    const pa = prima.get(palla.id);
    if (!pa || Math.hypot(palla.x - pa.x, palla.y - pa.y) < 1) return;
    if (!(palla.tappe && palla.tappe.length)){
      const chi = (b.elementi || []).find(function(g){
        return g.tipo === 'giocatore' && vicinaAllaSpalla(prima.get(g.id), pa) && vicinaAllaSpalla(g, palla) && passiDi(g, prima.get(g.id)).length;
      });
      if (chi){ portatori.set(palla.id, chi.id); return; }
    }
    const punti = percorsoPalla(a, b, palla.id) || [pa, palla];
    const durata = Math.max(MINIMO, metri(punti) / (METRI_PER_TEMPO_BASE * PASSAGGIO_PIU_VELOCE));
    let da = Math.max(inizi.seconde != null ? inizi.seconde : (inizi.movimenti || 0), fineMovimenti - durata);
    /* chi passa prima finisce la sua azione (il palleggio): poi parte la palla */
    const chiPassa = (a.elementi || []).find(function(g){ return g.tipo === 'giocatore' && vicinaAllaSpalla(g, pa); });
    if (chiPassa){
      azioni.forEach(function(x){ if (x.id === chiPassa.id) da = Math.max(da, x.a); });
    }
    passaggi.set(palla.id, {da: da, a: da + durata});
  });
  let totale = Math.max(MINIMO, fineMovimenti);
  passaggi.forEach(function(p){ totale = Math.max(totale, p.a); });
  const norma = function(w){ return {da: w.da / totale, a: w.a / totale, curva: 'costante'}; };
  return {prima: prima, azioni: azioni, portatori: portatori, passaggi: passaggi, totale: totale, norma: norma};
}

function ritmo(a, b){
  const x = analisi(a, b);
  return function(eb, ea){
    if (eb.tipo === 'giocatore'){
      const sue = x.azioni.filter(function(z){ return z.id === eb.id; });
      if (!sue.length) return null;
      const finestre = sue.map(x.norma);
      return {da: finestre[0].da, a: finestre[finestre.length - 1].a, passi: finestre, curva: 'costante'};
    }
    if (eb.tipo === 'palla'){
      const chi = x.portatori.get(eb.id);
      if (chi){
        const prima = x.azioni.find(function(z){ return z.id === chi; });
        const ultima = x.azioni.filter(function(z){ return z.id === chi; }).pop();
        const g = (b.elementi || []).find(function(e){ return e.id === chi; });
        const q = x.prima.get(chi);
        const m = g && q ? Math.hypot(g.x - q.x, g.y - q.y) / UNITA_PER_METRO : 4;
        return Object.assign({portatore: chi, rimbalzi: Math.max(2, Math.round(m / 1.6))},
                             x.norma({da: prima.da, a: ultima.a}));
      }
      const p = x.passaggi.get(eb.id);
      return p ? x.norma(p) : null;
    }
    return null;
  };
}

/* quanto dura il tempo rispetto alla durata base: piu' strada, piu' tempo */
function durataRelativa(a, b){
  return analisi(a, b).totale;
}

/* la scia della palla durante l'animazione: nel basket no. Il passaggio si
   legge nel diagramma prima del movimento, poi si vede la palla che vola; una
   scia tratteggiata con la punta sembrava un altro passaggio (17/09). */
function sciaPalla(){
  return null;
}

return { SPORT, NOTAZIONE, UNITA_PER_METRO, MODI, creaSport, canestroDi, azioneDi, passiDi, ritmo, durataRelativa, sciaPalla };
})();
/* ---- integrazioni/italbasket/lavagna.js ---- */
const __vdm_integrazioni_italbasket_lavagna_js = (function(){
/* La lavagna del motore VDM, dentro Italbasket Woman.
 *
 * E' il playbook di VDM Soccer Coach (src/renderer/app.js) con il campo da
 * basket: stesso modello (fasi = elenchi di elementi con id stabili), stesso
 * trascinamento, stessa animazione, stesso video. Qui pero' non c'e' un
 * lavoro con leghe e squadre: c'e' un gioco solo, quello aperto, e chi lo
 * apre (innesto.js) decide dove salvarlo.
 *
 * Il gioco:
 *   { formato: 1, modo: 'mezzo'|'intero', vista: {angolo}, difesa: bool,
 *     fasi: [ {id, nome, cartello?, elementi: [...]} ] }
 */

const M = __vdm_src_renderer_core_modello_js;
const { id } = __vdm_src_renderer_core_id_js;
const { Cronologia } = __vdm_src_renderer_core_cronologia_js;
const { Lettore } = __vdm_src_renderer_core_animazione_js;
const { Campo } = __vdm_src_renderer_ui_campo_js;
const { abilitaTrascinamento } = __vdm_src_renderer_ui_trascina_js;
const { esportaVideo, videoSupportato } = __vdm_src_renderer_ui_esportaVideo_js;
const { chiediTesto, conferma, avviso, aperta: finestraAperta, impostaNome } = __vdm_src_renderer_ui_finestra_js;
const { creaSport, canestroDi } = __vdm_src_renderer_sport_basket_js;
const { T, traduciPagina, nomeFase } = __vdm_src_renderer_core_lingua_js;

const $ = function(s){ return document.getElementById(s); };
/* fra un tempo e l'altro quasi niente: il gioco scorre (17/09) */
const PAUSA_FASE = 700;
/* le azioni del basket: gli strumenti in cima al campo */
const MOVIMENTI = ['taglio', 'palleggio', 'blocco'];
const AZIONI = MOVIMENTI.concat(['passaggio', 'tiro', 'palla', 'gomma']);
const GUIDA_AZIONE = {
  taglio: '<strong>Taglio:</strong> clic sulla giocatrice, poi clic sul percorso (i punti in mezzo fanno la curva) · doppio clic per finire',
  palleggio: '<strong>Palleggio:</strong> clic sul numero cerchiato, poi clic sul percorso · doppio clic per finire',
  blocco: '<strong>Blocco:</strong> clic sulla giocatrice, poi dove va a bloccare · doppio clic per finire · doppio clic sul numero = blocco da ferma · dopo il blocco, Taglio sulla stessa giocatrice = si butta dentro o si apre',
  gomma: '<strong>Gomma:</strong> clic su una giocatrice per togliere le sue azioni in questo tempo',
  passaggio: '<strong>Passaggio:</strong> clic sul numero cerchiato, poi clic su chi riceve',
  tiro: '<strong>Tiro:</strong> clicca chi tira',
  palla: '<strong>Palla:</strong> clic su un numero: lo cerchia, all\'inizio del tempo la palla ce l\'ha lei'
};
/* nessuna rosa: nel basket di Italbasket i numeri stanno sulle pedine */
const SENZA_ROSA = {rosa: [], rosaAvversario: []};

function giocoNuovo(modo){
  const sport = creaSport(modo);
  const p = sport.partenza();
  const elementi = [];
  p.attacco.forEach(function(g){
    elementi.push({id: id('gl'), tipo: 'giocatore', squadra: 'casa', n: g.n, x: g.x, y: g.y});
  });
  p.difesa.forEach(function(g){
    elementi.push({id: id('gl'), tipo: 'giocatore', squadra: 'avversari', n: g.n, x: g.x, y: g.y});
  });
  const pp = M.spalla(elementi[0]);
  elementi.push({id: id('palla'), tipo: 'palla', x: pp.x, y: pp.y});
  return {formato: 1, modo: sport.MODO, vista: {angolo: 0}, difesa: false,
          fasi: [{id: id('fase'), nome: T('Partenza'), elementi: elementi}]};
}

function Lavagna(opzioniLavagna){
  const marchio = opzioniLavagna.marchio || 'VDM';
  impostaNome(marchio);

  let gioco = null;
  let iFase = 0;
  let sport = null, campo = null, trascina = null;
  let strumento = 'normale', oggettoDaPosare = null, selezionato = null, giocatoriScelti = [];
  let avvisoPartenza = null;
  let modificato = false, esportando = false;
  let alSalva = null;
  const cronologia = Cronologia();

  /* ---------- il campo: si ricrea quando si passa da meta' campo a campo intero ---------- */
  function preparaCampo(modo){
    sport = creaSport(modo);
    const vecchio = $('vlCampo');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'vlCampo';
    svg.setAttribute('class', 'vl-campo');
    vecchio.parentNode.replaceChild(svg, vecchio);
    campo = Campo(svg, sport);
    trascina = abilitaTrascinamento(campo, sport, {
      alRilascio: spostata,
      modo: function(){ return strumento; },
      clic: clicTratto,
      seleziona: selezionaDalCampo,
      zona: {
        crea: creaZona,
        sposta: function(idZ, x, y){ modificaGeometria(idZ, {x: x, y: y}); },
        ridimensiona: function(idZ, w, h){ modificaGeometria(idZ, {w: w, h: h}); }
      },
      scritta: { crea: creaScritta },
      misura: { crea: creaMisura, spostaCapo: spostaCapoMisura },
      posa: posaOggetto,
      giocatoreCliccato: function(idG){
        if (strumento === 'linea') puntoLinea(idG);
        else if (strumento === 'evidenza') sceltaEvidenza(idG);
        else if (strumento === 'passaggio') passaA(idG);
        else if (strumento === 'tiro') tiraDa(idG);
        else if (strumento === 'palla'){ selezionato = idG; daiLaPalla(); }
        else if (strumento === 'gomma') cancellaAzioni(idG);
      }
    });
    campo.impostaCampo(null);
    svg.addEventListener('mousemove', function(ev){
      if (!tratto) return;
      const q = campo.inMetri(ev);
      if (q){ puntatore = {x: q.x, y: q.y}; mostraTratto(); }
    });
    svg.addEventListener('dblclick', function(ev){ if (tratto){ ev.preventDefault(); finisciTratto(); } });
  }

  const lettore = Lettore({
    disegna: function(f, segmento){
      campo.disegnaFotogramma(f, SENZA_ROSA, opzioni(), {
        punti: sport.sciaPalla(gioco.fasi[segmento], gioco.fasi[segmento + 1])
      });
    },
    suFase: function(i){ iFase = i; disegnaFasi(); stato(T('fase {a} → {b}', {a: i + 1, b: i + 2})); },
    inPausa: function(i){
      iFase = i;
      campo.disegnaDiagramma(gioco.fasi[i], gioco.fasi[i + 1] || null, SENZA_ROSA, opzioni());
      disegnaFasi();
      stato(T('fase {n} di {tot}', {n: i + 1, tot: gioco.fasi.length}));
    },
    alTermine: function(){ iFase = gioco.fasi.length - 1; ferma(); disegna(); },
    durataCartello: function(i){ return M.durataCartello(gioco.fasi[i]); },
    mostraCartello: function(i){ mostraCartello(i == null ? null : gioco.fasi[i]); },
    /* il ritmo del basket: blocco, poi chi lo usa, poi il passaggio */
    ritmo: function(a, b){ return sport.ritmo(a, b); },
    durataRelativa: function(a, b){ return sport.durataRelativa(a, b); },
    /* prima di muoversi si legge il diagramma */
    pausaIniziale: 1700
  });

  function opzioni(){
    const angolo = angoloVista();
    return {avversari: !!gioco.difesa, ruoli: false, spessore: angolo > 0, angolo: angolo};
  }
  function angoloVista(){ return gioco && gioco.vista && gioco.vista.angolo ? gioco.vista.angolo : 0; }
  function giroVista(){ return angoloVista() && gioco.vista.giro ? gioco.vista.giro : 0; }
  function stato(testo){ $('vlStato').textContent = testo; }
  function segna(){ cronologia.segna(gioco); modificato = true; }
  function fase(){ return gioco.fasi[iFase]; }

  /* ---------- il cartello ---------- */
  let fineAnteprima = null;
  function mostraCartello(f){
    const box = $('vlCartello');
    if (!f || !M.haCartello(f)){ box.hidden = true; return; }
    $('vlCartelloTitolo').textContent = f.cartello.titolo || '';
    $('vlCartelloTesto').textContent = f.cartello.testo || '';
    box.hidden = false;
  }

  /* ---------- disegno ---------- */
  function disegna(){
    if (!gioco) return;
    if (iFase >= gioco.fasi.length) iFase = gioco.fasi.length - 1;
    campo.impostaProspettiva(angoloVista(), giroVista());
    $('vlVista').value = String(angoloVista());
    $('vlGiroBox').hidden = !angoloVista();
    $('vlGiroVista').value = String(giroVista());
    $('vlModo').value = gioco.modo;
    $('vlDifesa').checked = !!gioco.difesa;
    campo.disegnaDiagramma(fase(), gioco.fasi[iFase + 1] || null, SENZA_ROSA,
                  Object.assign(opzioni(), {selezionata: selezionato}));
    disegnaPannelli(fase());
    disegnaCartello(fase());
    $('vlAvvisoPartenza').hidden = !(avvisoPartenza && iFase === 0);
    [['vlStrumentoZona', 'zona'], ['vlStrumentoLinea', 'linea'], ['vlStrumentoEvidenza', 'evidenza'],
     ['vlStrumentoScritta', 'scritta'], ['vlStrumentoMisura', 'misura']].forEach(function(c){
      $(c[0]).classList.toggle('vl-attivo', strumento === c[1]);
    });
    document.querySelectorAll('#vlAzioni .vl-azione').forEach(function(b){
      b.classList.toggle('vl-attivo', b.dataset.strumento === strumento);
    });
    const svg = $('vlCampo');
    ['misura', 'scritta', 'zona', 'posa'].concat(AZIONI).forEach(function(m){ svg.classList.toggle('modo-' + m, strumento === m); });
    svg.classList.toggle('modo-linea', strumento === 'linea' || strumento === 'evidenza');
    const scegliendo = strumento === 'linea' || strumento === 'evidenza' || strumento === 'posa';
    const azione = AZIONI.indexOf(strumento) >= 0;
    $('vlGuida').hidden = !scegliendo && !azione && !avvisoRegola;
    if (!azione && !scegliendo && avvisoRegola) $('vlGuidaTesto').innerHTML = '<strong>' + T('Attenzione:') + '</strong> ' + avvisoRegola;
    $('vlFineScelta').hidden = azione && !tratto;
    $('vlAnnullaScelta').hidden = azione && !tratto;
    if (tratto){ $('vlFineScelta').textContent = T('✔ Fine tratto'); $('vlFineScelta').disabled = false; }
    else $('vlFineScelta').textContent = T('Fine');
    if (strumento !== 'posa') $('vlAggiungi').value = '';
    if (azione){
      $('vlGuidaTesto').innerHTML = avvisoRegola ? '<strong>' + T('Attenzione:') + '</strong> ' + avvisoRegola
        : T(GUIDA_AZIONE[strumento]) + ' · ' + T('tempo {n}', {n: iFase + 1}) + ' · ' + T('Esc per Sposta');
    } else if (strumento === 'posa'){
      $('vlGuidaTesto').innerHTML = T('<strong>Aggiungi:</strong> clicca sul campo per mettere {cosa}, anche più volte · Esc o Fine per smettere',
        {cosa: nomeOggetto(oggettoDaPosare).toLowerCase()});
      $('vlFineScelta').disabled = false;
    } else if (scegliendo){
      $('vlGuidaTesto').innerHTML = strumento === 'linea'
        ? T("<strong>Linea:</strong> clicca le giocatrici da unire, nell'ordine · clic sulla prima per chiudere · Invio per finire")
        : T("<strong>Evidenzia:</strong> clicca una o più giocatrici (di nuovo per toglierla) · Invio per finire");
      $('vlFineScelta').disabled = giocatoriScelti.length < (strumento === 'linea' ? 2 : 1);
    }
    const puntiScelti = giocatoriScelti.map(function(idG){ return M.elementoDi(fase(), idG); }).filter(Boolean);
    campo.anteprima(strumento === 'linea' ? puntiScelti : strumento === 'evidenza' ? {cerchi: puntiScelti}
      /* con un'azione scelta si vedono le fini da cui ripartire */
      : TRATTI.indexOf(strumento) >= 0 && !tratto ? {fini: finiDelleAzioni(strumento === 'passaggio')} : null);
    $('vlPlay').disabled = gioco.fasi.length < 2;
    $('vlAggiungiFase').disabled = !gioco.fasi[iFase + 1];
    $('vlVideo').disabled = gioco.fasi.length < 2 || esportando;
    $('vlAnnulla').disabled = cronologia.vuota();
    if (!lettore.inCorso()) stato(T(gioco.fasi.length === 1 ? '{n} fase' : '{n} fasi', {n: gioco.fasi.length}));
    disegnaFasi();
  }

  function disegnaFasi(){
    const box = $('vlFasi');
    box.innerHTML = '';
    gioco.fasi.forEach(function(f, i){
      const chip = document.createElement('div');
      chip.className = 'vl-chip' + (i === iFase ? ' vl-on' : '');
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'vl-scegli';
      b.innerHTML = '<span class="vl-num">' + (i + 1) + '.</span> <span class="vl-et"></span>' +
                    (M.haCartello(f) ? ' <span class="vl-ha-cartello" title="' + T('Ha un cartello prima') + '">▣</span>' : '');
      b.querySelector('.vl-et').textContent = nomeFase(f.nome);
      b.title = T('Doppio clic per cambiare nome');
      b.onclick = function(){ ferma(); iFase = i; disegna(); };
      b.ondblclick = async function(){
        const v = await chiediTesto(T('Nome della fase'), T('es. Blocco del 5 per l\'1'), f.nome);
        if (v == null) return;
        segna();
        f.nome = v;
        disegna();
      };
      chip.appendChild(b);
      if (gioco.fasi.length > 1){
        const x = document.createElement('button');
        x.type = 'button';
        x.className = 'vl-elimina';
        x.textContent = '×';
        x.title = T('elimina la fase');
        x.onclick = function(ev){
          ev.stopPropagation();
          ferma();
          segna();
          gioco.fasi.splice(i, 1);
          if (iFase >= gioco.fasi.length) iFase = gioco.fasi.length - 1;
          disegna();
        };
        chip.appendChild(x);
      }
      box.appendChild(chip);
    });
  }

  /* ---------- sul campo ---------- */
  /* ---- il diagramma del basket ----
   * La scheda aperta (iFase) mostra le giocatrici dove sono all'inizio del
   * tempo; i simboli si disegnano sopra e scrivono la fase dopo (iFase + 1):
   * dove arriva chi taglia, palleggia o va a bloccare, e a chi va la palla.
   * Le regole del basket: il numero cerchiato ha la palla e puo' solo
   * palleggiare o passare; le altre possono tagliare o bloccare. */
  function faseDopo(){
    if (!gioco.fasi[iFase + 1]) gioco.fasi.splice(iFase + 1, 0, M.faseDa(fase(), T('Tempo {n}', {n: iFase + 2})));
    return gioco.fasi[iFase + 1];
  }
  function portatore(f){
    let chi = null;
    const palle = (f.elementi || []).filter(function(e){ return e.tipo === 'palla'; });
    (f.elementi || []).forEach(function(g){
      if (chi || g.tipo !== 'giocatore') return;
      if (palle.some(function(b){ return Math.hypot(b.x - (g.x + 1.9), b.y - (g.y - 1.9)) < 0.6; })) chi = g.id;
    });
    return chi;
  }
  function pallaDi(f){ return (f.elementi || []).find(function(e){ return e.tipo === 'palla'; }) || null; }
  /* l'avviso di una regola resta finche' non si cambia strumento */
  let avvisoRegola = null;
  function avvisa(testo){ avvisoRegola = T(testo); }

  /* dove va la palla nella fase dopo: se si era gia' mossa, chi l'aveva
     diventa una tappa (piu' passaggi di fila nello stesso tempo) */
  function muoviPalla(el, p, prima){
    const prec = prima ? M.elementoDi(prima, el.id) : null;
    const giaMossa = prec && Math.hypot(el.x - prec.x, el.y - prec.y) > 1;
    if (giaMossa && Math.hypot(p.x - el.x, p.y - el.y) > 1){
      const chi = M.portatoreDi(gioco.fasi[iFase + 1] || fase(), el);
      el.tappe = (el.tappe || []).concat([chi ? {giocatore: chi} : {x: el.x, y: el.y}]);
    }
    el.x = p.x; el.y = p.y;
  }

  function spostata(idElemento, x, y){
    const inizio = fase();
    const el = M.elementoDi(inizio, idElemento);
    if (!el) return;
    if (MOVIMENTI.indexOf(strumento) >= 0 && el.tipo === 'giocatore'){
      const conPalla = portatore(inizio) === idElemento;
      let azione = strumento;
      if (conPalla && azione === 'taglio') azione = 'palleggio';
      if (conPalla && azione === 'blocco'){ avvisa("chi ha la palla (numero cerchiato) non blocca: palleggia o passa"); disegna(); return; }
      if (!conPalla && azione === 'palleggio'){ avvisa("palleggia solo chi ha la palla (numero cerchiato): questo è diventato un taglio"); azione = 'taglio'; }
      else avvisoRegola = null;
      segna();
      const fine = faseDopo();
      const g = M.elementoDi(fine, idElemento);
      if (!g){ disegna(); return; }
      const era = {x: g.x, y: g.y};
      const pallaQui2 = (fine.elementi || []).find(function(e){ return e.tipo === 'palla'; }) || null;
      const suaLaPalla2 = !!pallaQui2 && (Math.hypot(pallaQui2.x - (era.x + 1.9), pallaQui2.y - (era.y - 1.9)) < 1.6 || M.portatoreDi(fase(), pallaQui2) === idElemento);
      g.x = x; g.y = y; g.azione = azione;
      /* nel palleggio la palla va con lei (anche se non era esattamente sulla spalla) */
      fine.elementi.forEach(function(b){
        if (b.tipo === 'palla' && (suaLaPalla2 || Math.hypot(b.x - (era.x + 1.9), b.y - (era.y - 1.9)) < 0.6)){ b.x = x + 1.9; b.y = y - 1.9; }
      });
      if ($('vlPropaga').checked){
        for (let k = iFase + 2; k < gioco.fasi.length; k++){
          const q = M.elementoDi(gioco.fasi[k], idElemento);
          if (!q || Math.hypot(q.x - era.x, q.y - era.y) > 0.4) break;
          q.x = x; q.y = y;
        }
      }
      disegna();
      return;
    }
    /* Sposta: si sistemano le posizioni di partenza del tempo */
    segna();
    if (el.tipo === 'palla'){
      muoviPalla(el, trascina.agganciaPalla(inizio, x, y), iFase > 0 ? gioco.fasi[iFase - 1] : null);
    } else {
      const era = {x: el.x, y: el.y};
      el.x = x; el.y = y;
      const palle = [];
      inizio.elementi.forEach(function(b){
        if (b.tipo === 'palla' && Math.hypot(b.x - (era.x + 1.9), b.y - (era.y - 1.9)) < 0.6){ b.x = x + 1.9; b.y = y - 1.9; palle.push(b.id); }
      });
      if ($('vlPropaga').checked){
        for (let k = iFase + 1; k < gioco.fasi.length; k++){
          const q = M.elementoDi(gioco.fasi[k], idElemento);
          if (!q || Math.hypot(q.x - era.x, q.y - era.y) > 0.4) break;
          q.x = x; q.y = y;
          gioco.fasi[k].elementi.forEach(function(b){
            if (palle.indexOf(b.id) >= 0 && Math.hypot(b.x - (era.x + 1.9), b.y - (era.y - 1.9)) < 0.6){ b.x = x + 1.9; b.y = y - 1.9; }
          });
        }
      }
    }
    disegna();
  }

  /* ---- disegnare come sul playbook: clic dopo clic ----
   * Il primo clic e' sulla giocatrice che fa l'azione; i clic in mezzo sono
   * la curva; il doppio clic (o Invio, o «Fine tratto») chiude. Il passaggio
   * si chiude da solo cliccando chi riceve. */
  let tratto = null;          // {strumento, id, punti: [{x,y}]}
  let puntatore = null;
  const TRATTI = ['taglio', 'palleggio', 'blocco', 'passaggio'];

  function mostraTratto(){
    if (!tratto){ campo.anteprima(null); return; }
    const punti = tratto.punti.concat(puntatore ? [puntatore] : []);
    const stile = tratto.strumento === 'passaggio' ? 'passaggio' : tratto.azione;
    campo.anteprima({tratto: {punti: punti, stile: stile}});
  }

  /* la giocatrice la cui azione in questo tempo finisce vicino al clic */
  function finiDelleAzioni(soloChiHaLaPalla){
    const fine = gioco.fasi[iFase + 1];
    if (!fine) return [];
    const palla = pallaDi(fine);
    const conPalla = palla ? M.portatoreDi(fine, palla) : null;
    const lista = [];
    fine.elementi.forEach(function(g){
      if (g.tipo !== 'giocatore') return;
      if (soloChiHaLaPalla && g.id !== conPalla) return;
      const g0 = M.elementoDi(fase(), g.id);
      if (!g0 || !sport.passiDi(g, g0).length || Math.hypot(g.x - g0.x, g.y - g0.y) < 1) return;
      lista.push({id: g.id, x: g.x, y: g.y});
    });
    return lista;
  }
  /* chi si intende col clic: la fine di un'azione o un numero, il piu' vicino vince */
  function sceltaDelClic(q, idG, soloChiHaLaPalla){
    const fine = allaFineDiUnAzione(q, soloChiHaLaPalla, true);
    if (!idG) return fine ? fine.id : null;
    if (!fine) return idG;
    const g = M.elementoDi(fase(), idG);
    const dNumero = g ? Math.hypot(q.x - g.x, q.y - g.y) : Infinity;
    return fine.d < dNumero ? fine.id : idG;
  }
  function allaFineDiUnAzione(q, soloChiHaLaPalla, conDistanza){
    const fine = gioco.fasi[iFase + 1];
    if (!fine) return null;
    let chi = null, minima = 5;
    const palla = pallaDi(fine);
    const conPalla = palla ? M.portatoreDi(fine, palla) : null;
    fine.elementi.forEach(function(g){
      if (g.tipo !== 'giocatore') return;
      if (soloChiHaLaPalla && g.id !== conPalla) return;
      const g0 = M.elementoDi(fase(), g.id);
      if (!g0 || !sport.passiDi(g, g0).length) return;
      const d = Math.hypot(q.x - g.x, q.y - g.y);
      if (d < minima){ minima = d; chi = g.id; }
    });
    return conDistanza ? (chi ? {id: chi, d: minima} : null) : chi;
  }

  function clicTratto(q, idG){
    if (TRATTI.indexOf(strumento) < 0) return false;
    const inizio = fase();
    if (!tratto){
      /* si parte anche dalla fine di un'azione gia' disegnata: il passaggio dalla
         fine del palleggio, il taglio dalla T del blocco */
      idG = sceltaDelClic(q, idG, strumento === 'passaggio');
      if (!idG){ avvisa(strumento === 'passaggio' ? 'parti da chi ha la palla: il numero cerchiato o la fine del suo palleggio' : 'parti da una giocatrice: clic sul suo numero'); disegna(); return true; }
      const g = M.elementoDi(inizio, idG);
      if (!g) return true;
      const fine = gioco.fasi[iFase + 1];
      /* chi ha la palla adesso: a inizio tempo, o dopo i passaggi gia' disegnati */
      const pallaFine = fine ? pallaDi(fine) : null;
      const chiHa = pallaFine ? M.portatoreDi(fine, pallaFine) : portatore(inizio);
      const conPalla = portatore(inizio) === idG;
      let azione = strumento;
      if (strumento === 'passaggio'){
        if (chiHa !== idG){ avvisa('passa solo chi ha la palla: parti dal numero cerchiato'); disegna(); return true; }
      } else {
        if (conPalla && azione === 'taglio') azione = 'palleggio';
        if (conPalla && azione === 'blocco'){ avvisa('chi ha la palla (numero cerchiato) non blocca: palleggia o passa'); disegna(); return true; }
        if (!conPalla && azione === 'palleggio'){ avvisa('palleggia solo chi ha la palla (numero cerchiato): questo è un taglio'); azione = 'taglio'; }
      }
      avvisoRegola = azione !== strumento && strumento === 'palleggio' ? avvisoRegola : null;
      /* se in questo tempo ha gia' fatto un'azione, la nuova parte da dove e' arrivata */
      const gFine = fine ? M.elementoDi(fine, idG) : null;
      const giaInAzione = gFine && sport.passiDi(gFine, g).length;
      const partenza = giaInAzione ? gFine : g;
      tratto = {strumento: strumento, azione: azione, id: idG, punti: [{x: partenza.x, y: partenza.y}]};
      disegna();
      mostraTratto();
      return true;
    }
    if (tratto.strumento === 'passaggio'){
      /* chi riceve: il suo numero, o la fine del suo taglio */
      idG = sceltaDelClic(q, idG, false);
      if (idG && idG !== tratto.id){ const chi = idG; tratto = null; campo.anteprima(null); passaA(chi); }
      return true;
    }
    /* i clic sul numero di partenza (o doppi) non fanno curve: niente riccioli */
    const ultimo = tratto.punti[tratto.punti.length - 1], primo = tratto.punti[0];
    if (Math.hypot(q.x - ultimo.x, q.y - ultimo.y) > 1.5 && Math.hypot(q.x - primo.x, q.y - primo.y) > 3.2) tratto.punti.push({x: q.x, y: q.y});
    mostraTratto();
    return true;
  }

  function finisciTratto(){
    if (!tratto) return;
    const t = tratto;
    tratto = null; puntatore = null;
    campo.anteprima(null);
    if (t.strumento === 'passaggio'){ disegna(); return; }
    const inizioG = M.elementoDi(fase(), t.id);
    const fineEsiste = gioco.fasi[iFase + 1];
    const prima = fineEsiste ? M.elementoDi(fineEsiste, t.id) : null;
    const esistenti = prima ? sport.passiDi(prima, inizioG) : [];
    let nuovo = null;
    if (t.punti.length >= 2){
      const arrivo = t.punti[t.punti.length - 1];
      nuovo = {azione: t.azione, x: arrivo.x, y: arrivo.y};
      if (t.punti.length > 2) nuovo.via = t.punti.slice(1, -1);
    } else if (t.azione === 'blocco'){
      /* un clic solo col Blocco: blocca da ferma (di nuovo: lo toglie) */
      if (esistenti.length === 1 && esistenti[0].azione === 'blocco' && prima && Math.hypot(prima.x - inizioG.x, prima.y - inizioG.y) < 1){
        segna(); delete prima.azione; disegna(); return;
      }
      const dove = prima || inizioG;
      nuovo = {azione: 'blocco', x: dove.x, y: dove.y};
    }
    if (!nuovo){ disegna(); return; }
    segna();
    const fine = faseDopo();
    const g = M.elementoDi(fine, t.id);
    if (!g){ disegna(); return; }
    const era = {x: g.x, y: g.y};
    /* DI CHI E' LA PALLA, deciso PRIMA di muovere la giocatrice (23/09,
     * Vince: "quando palleggia nell'animazione la palla non rimane con il
     * giocatore ma resta ferma nella posizione e da li passa"). Prima la
     * palla seguiva il palleggio solo se stava esattamente sulla spalla
     * (mezzo metro di tolleranza): nei giochi ricostruiti dal disegno del
     * playbook sta poco piu' in la' e restava indietro. */
    const pallaQui = (fine.elementi || []).find(function(e){ return e.tipo === 'palla'; }) || null;
    const suaLaPalla = !!pallaQui && (Math.hypot(pallaQui.x - (era.x + 1.9), pallaQui.y - (era.y - 1.9)) < 1.6 || M.portatoreDi(fase(), pallaQui) === t.id);
    /* le azioni in fila: dopo il blocco ci si butta dentro o ci si apre */
    const tutti = esistenti.map(function(s){
      const c = {azione: s.azione || 'taglio', x: s.x, y: s.y};
      if (s.via && s.via.length) c.via = s.via;
      return c;
    }).concat([nuovo]);
    g.x = nuovo.x; g.y = nuovo.y; g.azione = nuovo.azione;
    if (tutti.length === 1){
      if (nuovo.via) g.via = nuovo.via; else delete g.via;
      delete g.passi;
    } else {
      g.passi = tutti;
      delete g.via;
    }
    /* nel palleggio la palla va con lei */
    fine.elementi.forEach(function(b){
      if (b.tipo === 'palla' && (suaLaPalla || Math.hypot(b.x - (era.x + 1.9), b.y - (era.y - 1.9)) < 0.6)){ b.x = g.x + 1.9; b.y = g.y - 1.9; }
    });
    if ($('vlPropaga').checked){
      for (let k = iFase + 2; k < gioco.fasi.length; k++){
        const q = M.elementoDi(gioco.fasi[k], t.id);
        if (!q || Math.hypot(q.x - era.x, q.y - era.y) > 0.4) break;
        q.x = g.x; q.y = g.y;
      }
    }
    disegna();
  }

  /* la Gomma: le azioni di una giocatrice in questo tempo si tolgono */
  function cancellaAzioni(idG){
    const fine = gioco.fasi[iFase + 1];
    const g0 = M.elementoDi(fase(), idG), g = fine && M.elementoDi(fine, idG);
    if (!g || !g0) return;
    segna();
    const era = {x: g.x, y: g.y};
    g.x = g0.x; g.y = g0.y;
    delete g.azione; delete g.via; delete g.passi;
    const b = pallaDi(fine), b0 = pallaDi(fase());
    if (b && b0){
      const suDiLei = Math.hypot(b.x - (era.x + 1.9), b.y - (era.y - 1.9)) < 0.6;
      const tappaSua = (b.tappe || []).some(function(tp){ return tp.giocatore === idG; });
      if (suDiLei || tappaSua){ b.x = b0.x; b.y = b0.y; delete b.tappe; }
    }
    for (let k = iFase + 2; k < gioco.fasi.length; k++){
      const q = M.elementoDi(gioco.fasi[k], idG);
      if (!q || Math.hypot(q.x - era.x, q.y - era.y) > 0.4) break;
      q.x = g0.x; q.y = g0.y;
    }
    disegna();
  }
  function annullaTratto(){ tratto = null; puntatore = null; campo.anteprima(null); }

  /* un clic su una giocatrice: col Blocco scelto, blocca da ferma */
  function selezionaDalCampo(idSel){
    const g = idSel && M.elementoDi(fase(), idSel);
    if (strumento === 'blocco' && g && g.tipo === 'giocatore'){
      if (portatore(fase()) === idSel){ avvisa("chi ha la palla (numero cerchiato) non blocca: palleggia o passa"); disegna(); return; }
      segna();
      const qui = M.elementoDi(faseDopo(), idSel);
      if (qui.azione === 'blocco') delete qui.azione; else qui.azione = 'blocco';
      disegna();
      return;
    }
    selezionato = idSel;
    disegna();
  }

  function passaA(idG){
    const inizio = fase();
    const palla = pallaDi(inizio);
    if (!palla){ avvisa("nessuna ha la palla: clicca una giocatrice e «Dai la palla»"); disegna(); return; }
    const fine = gioco.fasi[iFase + 1];
    const pallaFine = fine ? pallaDi(fine) : null;
    const chiHa = fine && pallaFine ? M.portatoreDi(fine, pallaFine) : portatore(inizio);
    if (chiHa === idG) return;                       // ce l'ha gia'
    segna();
    const f = faseDopo();
    const qui = M.elementoDi(f, idG);
    if (!qui){ disegna(); return; }
    muoviPalla(pallaDi(f), M.spalla(qui), inizio);
    disegna();
  }

  function tiraDa(idG){
    const inizio = fase();
    if (!pallaDi(inizio)){ avvisa("nessuna ha la palla: clicca una giocatrice e «Dai la palla»"); disegna(); return; }
    segna();
    const f = faseDopo();
    const qui = M.elementoDi(f, idG);
    if (!qui){ disegna(); return; }
    let b = pallaDi(f);
    /* se la palla non ce l'ha lei, prima le arriva */
    if (Math.hypot(b.x - (qui.x + 1.9), b.y - (qui.y - 1.9)) >= 0.6) muoviPalla(b, M.spalla(qui), inizio);
    b = pallaDi(f);
    muoviPalla(b, canestroDi(gioco.modo), inizio);
    disegna();
  }

  /* all'inizio del tempo la palla ce l'ha lei */
  function daiLaPalla(){
    const g = selezionato && M.elementoDi(fase(), selezionato);
    if (!g || g.tipo !== 'giocatore') return;
    segna();
    let b = pallaDi(fase());
    if (!b){ b = M.pallaNuova(0, 0); fase().elementi.push(b); }
    const era = {x: b.x, y: b.y};
    b.x = g.x + 1.9; b.y = g.y - 1.9;
    delete b.tappe;
    for (let k = iFase + 1; k < gioco.fasi.length; k++){
      const q = pallaDi(gioco.fasi[k]);
      if (!q){ gioco.fasi[k].elementi.push(M.copia(b)); continue; }
      if (Math.hypot(q.x - era.x, q.y - era.y) > 0.4) break;
      const gk = M.elementoDi(gioco.fasi[k], g.id);
      if (gk){ q.x = gk.x + 1.9; q.y = gk.y - 1.9; }
    }
    disegna();
  }

  function costruisciAvvisoPartenza(){
    $('vlPassaggioInFaseNuova').onclick = function(){
      const a = avvisoPartenza;
      avvisoPartenza = null;
      const f0 = gioco.fasi[0], palla0 = a && M.elementoDi(f0, a.idPalla);
      if (!palla0){ disegna(); return; }
      segna();
      palla0.x = a.da.x; palla0.y = a.da.y;
      const nuova = M.faseDa(f0, T('Primo passaggio'));
      const palla1 = M.elementoDi(nuova, a.idPalla);
      palla1.x = a.a.x; palla1.y = a.a.y;
      gioco.fasi.splice(1, 0, nuova);
      iFase = 1;
      disegna();
    };
    $('vlLasciaPartenza').onclick = function(){ avvisoPartenza = null; disegna(); };
  }

  /* ---------- cartelli ---------- */
  function disegnaCartello(f){
    const c = f.cartello;
    $('vlAggiungiCartello').hidden = !!c;
    $('vlPannelloCartello').hidden = !c;
    if (!c) return;
    $('vlTitoloPannelloCartello').textContent = T('Cartello prima della fase {n}', {n: iFase + 1});
    const t = $('vlCartelloTitoloInput'), x = $('vlCartelloTestoInput');
    if (document.activeElement !== t) t.value = c.titolo || '';
    if (document.activeElement !== x) x.value = c.testo || '';
  }

  function costruisciCartello(){
    $('vlAggiungiCartello').onclick = function(){
      segna();
      fase().cartello = {titolo: '', testo: ''};
      disegna();
      $('vlCartelloTitoloInput').focus();
    };
    $('vlTogliCartello').onclick = function(){
      segna();
      delete fase().cartello;
      mostraCartello(null);
      disegna();
    };
    [['vlCartelloTitoloInput', 'titolo', 60], ['vlCartelloTestoInput', 'testo', 300]].forEach(function(c){
      const campoTesto = $(c[0]);
      campoTesto.addEventListener('focus', function(){ segna(); });
      campoTesto.addEventListener('input', function(){
        const f = fase();
        if (!f.cartello) return;
        f.cartello[c[1]] = this.value.slice(0, c[2]);
        disegnaFasi();
      });
    });
    $('vlAnteprimaCartello').onclick = function(){
      const f = fase();
      if (!M.haCartello(f)) return;
      ferma();
      mostraCartello(f);
      if (fineAnteprima) clearTimeout(fineAnteprima);
      fineAnteprima = setTimeout(function(){ fineAnteprima = null; if (!lettore.inCorso()) mostraCartello(null); }, M.durataCartello(f));
    };
    $('vlCartello').addEventListener('click', function(){ if (!lettore.inCorso()) mostraCartello(null); });
  }

  /* ---------- zone, scritte, misure, linee, evidenze ---------- */
  /* un elemento nuovo: nella fase aperta, e con propaga anche nelle successive */
  function metti(elemento){
    fase().elementi.push(elemento);
    if ($('vlPropaga').checked){
      for (let k = iFase + 1; k < gioco.fasi.length; k++) gioco.fasi[k].elementi.push(M.copia(elemento));
    }
  }

  function creaZona(x, y, w, h){
    segna();
    const z = M.zonaNuova(x, y, w, h, 'rigata', 'giallo');
    metti(z);
    selezionato = z.id;
    strumento = 'normale';
    disegna();
  }

  function modificaGeometria(idElemento, cambio){
    const z = M.elementoDi(fase(), idElemento);
    if (!z) return;
    segna();
    const misure = ['x', 'y', 'w', 'h'].filter(function(k){ return typeof z[k] === 'number'; });
    const era = {};
    misure.forEach(function(k){ era[k] = z[k]; });
    Object.assign(z, cambio);
    if ($('vlPropaga').checked){
      for (let k = iFase + 1; k < gioco.fasi.length; k++){
        const q = M.elementoDi(gioco.fasi[k], idElemento);
        if (!q) break;
        const uguale = misure.every(function(m){ return typeof q[m] === 'number' && Math.abs(q[m] - era[m]) < .4; });
        if (!uguale) break;
        Object.assign(q, cambio);
      }
    }
    selezionato = idElemento;
    disegna();
  }

  function creaMisura(da, a){
    segna();
    const ms = M.misuraNuova(da, a);
    metti(ms);
    selezionato = ms.id;
    strumento = 'normale';
    disegna();
  }

  function spostaCapoMisura(idMisura, indice, capo){
    const ms = M.elementoDi(fase(), idMisura);
    if (!ms) return;
    segna();
    const era = JSON.stringify(ms.capi[indice]);
    ms.capi[indice] = capo;
    if ($('vlPropaga').checked){
      for (let k = iFase + 1; k < gioco.fasi.length; k++){
        const q = M.elementoDi(gioco.fasi[k], idMisura);
        if (!q || JSON.stringify(q.capi[indice]) !== era) break;
        q.capi[indice] = M.copia(capo);
      }
    }
    selezionato = idMisura;
    disegna();
  }

  function creaScritta(dove){
    segna();
    const sc = M.scrittaNuova(dove);
    metti(sc);
    selezionato = sc.id;
    strumento = 'normale';
    disegna();
    const campoTesto = $('vlTestoScritta');
    campoTesto.focus();
    campoTesto.select();
  }

  function impostaElemento(chiave, valore, senzaCronologia){
    if (!selezionato) return;
    if (!senzaCronologia) segna();
    gioco.fasi.forEach(function(f){
      const z = M.elementoDi(f, selezionato);
      if (z) z[chiave] = valore;
    });
    disegna();
  }

  function togliSelezionato(ovunque){
    if (!selezionato) return;
    segna();
    const idVia = selezionato;
    gioco.fasi.forEach(function(f, k){
      if (ovunque || k >= iFase) f.elementi = f.elementi.filter(function(e){ return e.id !== idVia; });
    });
    selezionato = null;
    disegna();
  }

  function sceltaEvidenza(idG){
    const i = giocatoriScelti.indexOf(idG);
    if (i >= 0) giocatoriScelti.splice(i, 1);
    else giocatoriScelti.push(idG);
    disegna();
  }
  function finisciEvidenza(){
    const scelti = giocatoriScelti;
    giocatoriScelti = [];
    strumento = 'normale';
    if (!scelti.length){ disegna(); return; }
    segna();
    const v = M.evidenzaNuova(scelti);
    metti(v);
    selezionato = v.id;
    disegna();
  }
  function puntoLinea(idG){
    if (giocatoriScelti.length >= 3 && idG === giocatoriScelti[0]) return finisciLinea(true);
    if (giocatoriScelti.indexOf(idG) >= 0) return;
    giocatoriScelti.push(idG);
    disegna();
  }
  function finisciLinea(chiusa){
    const scelti = giocatoriScelti;
    giocatoriScelti = [];
    strumento = 'normale';
    if (scelti.length < 2){ disegna(); return; }
    segna();
    const l = M.lineaNuova(scelti, chiusa);
    metti(l);
    selezionato = l.id;
    disegna();
  }
  function finisciScelta(){
    if (tratto){ finisciTratto(); return; }
    if (strumento === 'posa'){ strumento = 'normale'; oggettoDaPosare = null; disegna(); return; }
    if (strumento === 'linea') finisciLinea(false);
    else if (strumento === 'evidenza') finisciEvidenza();
  }

  /* ---------- aggiungere ---------- */
  const OGGETTI = [
    {chiave: 'casa', nome: 'Attaccante'},
    {chiave: 'avversari', nome: 'Difensore'},
    {chiave: 'palla', nome: 'Palla'},
    {chiave: 'cono', nome: 'Cono'},
    {chiave: 'allenatore', nome: 'Allenatore'}
  ];
  function nomeOggetto(chiave){
    const o = OGGETTI.find(function(x){ return x.chiave === chiave; });
    return o ? T(o.nome) : T('Oggetto');
  }
  /* il primo numero libero: 1..5 per l'attacco, X1..X5 per la difesa */
  function numeroLibero(squadra){
    const usati = new Set();
    gioco.fasi.forEach(function(f){
      f.elementi.forEach(function(e){ if (e.tipo === 'giocatore' && e.squadra === squadra) usati.add(String(e.n)); });
    });
    for (let n = 1; n < 100; n++){
      const v = squadra === 'avversari' ? 'X' + n : n;
      if (!usati.has(String(v))) return v;
    }
    return '';
  }
  function posaOggetto(x, y){
    if (!oggettoDaPosare) return;
    segna();
    let nuovo;
    if (oggettoDaPosare === 'casa' || oggettoDaPosare === 'avversari'){
      nuovo = M.giocatoreLibero(oggettoDaPosare, x, y, false);
      nuovo.n = numeroLibero(oggettoDaPosare);
      if (oggettoDaPosare === 'avversari') gioco.difesa = true;
    } else if (oggettoDaPosare === 'palla'){
      nuovo = M.pallaNuova(x, y);
    } else {
      nuovo = M.attrezzoNuovo(oggettoDaPosare, x, y);
    }
    metti(nuovo);
    disegna();
  }

  function disegnaPannelli(f){
    const scelto = selezionato ? M.elementoDi(f, selezionato) : null;
    const tipo = scelto ? scelto.tipo : null;
    const og = tipo === 'giocatore' || tipo === 'attrezzo' || tipo === 'palla' ? scelto : null;
    $('vlPannelloOggetto').hidden = !og;
    if (og){
      $('vlTitoloOggetto').textContent = og.tipo === 'attrezzo' ? nomeOggetto(og.oggetto)
        : T(og.tipo === 'palla' ? 'Palla' : og.squadra === 'avversari' ? 'Difensore' : 'Attaccante');
      const giocatore = og.tipo === 'giocatore';
      $('vlNumeroOggetto').hidden = !giocatore;
      if (giocatore && document.activeElement !== $('vlNumeroOggetto')) $('vlNumeroOggetto').value = og.n != null ? og.n : '';
      $('vlRigaAzione').hidden = !giocatore;
      const dopo = gioco.fasi[iFase + 1] && M.elementoDi(gioco.fasi[iFase + 1], og.id);
      if (giocatore) $('vlAzione').value = dopo && dopo.azione || '';
      $('vlDaiPalla').hidden = !giocatore || og.squadra === 'avversari' || portatore(f) === og.id;
      $('vlRuotaOggetto').hidden = og.tipo !== 'attrezzo' || og.oggetto === 'cono';
      const tappe = og.tipo === 'palla' && og.tappe ? og.tappe.length : 0;
      $('vlTogliTappe').hidden = !tappe;
      if (tappe) $('vlTogliTappe').textContent = T('Togli i passaggi intermedi ({n})', {n: tappe});
    }
    const pannelli = {zona: 'vlPannelloZona', linea: 'vlPannelloLinea', evidenza: 'vlPannelloEvidenza',
                      scritta: 'vlPannelloScritta', misura: 'vlPannelloMisura'};
    Object.keys(pannelli).forEach(function(k){ $(pannelli[k]).hidden = tipo !== k; });
    if (!scelto || og) return;
    const nomeGruppo = {zona: 'Zona', linea: 'Linea', evidenza: 'Evidenza', scritta: 'Scritta', misura: 'Misura'}[tipo];
    document.querySelectorAll('#vlStili' + nomeGruppo + ' .vl-btn').forEach(function(b){
      b.setAttribute('aria-pressed', String(b.dataset.stile === scelto.stile));
    });
    document.querySelectorAll('#vlColori' + nomeGruppo + ' .vl-colore').forEach(function(b){
      b.setAttribute('aria-pressed', String(b.dataset.colore === scelto.colore));
    });
    if (tipo === 'zona'){
      const t = $('vlEtichettaZona');
      if (document.activeElement !== t) t.value = scelto.etichetta || '';
    } else if (tipo === 'linea'){
      $('vlChiusaLinea').checked = !!scelto.chiusa;
      $('vlChiusaLinea').disabled = (scelto.giocatori || []).length < 3;
    } else if (tipo === 'scritta'){
      const t = $('vlTestoScritta');
      if (document.activeElement !== t) t.value = scelto.testo || '';
      $('vlDoveScritta').textContent = T(scelto.giocatore ? 'attaccata alla giocatrice' : 'ferma sul campo');
    } else if (tipo === 'misura'){
      const t = $('vlTestoMisura');
      if (document.activeElement !== t) t.value = scelto.testo || '';
      const unita = M.lunghezzaMisura(scelto, f);
      $('vlInfoMisura').textContent = unita == null ? '' : M.testoMisura({}, unita / sport.UNITA_PER_METRO);
    }
  }

  function costruisciColori(box){
    Object.keys(M.COLORI_ZONA).forEach(function(nome){
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'vl-colore';
      b.dataset.colore = nome;
      b.title = T(nome);
      b.style.background = M.COLORI_ZONA[nome];
      b.onclick = function(){ impostaElemento('colore', nome); };
      box.appendChild(b);
    });
  }

  function campoDiTesto(idCampo, chiave, massimo){
    const t = $(idCampo);
    t.addEventListener('focus', function(){ segna(); });
    t.addEventListener('input', function(){ impostaElemento(chiave, this.value.slice(0, massimo), true); });
    t.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === 'Escape'){ e.stopPropagation(); this.blur(); } });
  }

  function cambiaStrumento(nome){
    ferma();
    giocatoriScelti = [];
    strumento = strumento === nome ? 'normale' : nome;
    if (strumento !== 'normale') selezionato = null;
    disegna();
  }

  function costruisciComandi(){
    document.querySelectorAll('#vlStiliZona .vl-btn, #vlStiliLinea .vl-btn, #vlStiliEvidenza .vl-btn, #vlStiliScritta .vl-btn, #vlStiliMisura .vl-btn')
      .forEach(function(b){ b.onclick = function(){ impostaElemento('stile', b.dataset.stile); }; });
    ['Zona', 'Linea', 'Evidenza', 'Scritta', 'Misura'].forEach(function(n){
      costruisciColori($('vlColori' + n));
      $('vlTogli' + n).onclick = function(){ togliSelezionato(false); };
      $('vlElimina' + n).onclick = function(){ togliSelezionato(true); };
      $('vlStrumento' + n).onclick = function(){ cambiaStrumento(n.toLowerCase()); };
    });
    campoDiTesto('vlEtichettaZona', 'etichetta', 40);
    campoDiTesto('vlTestoScritta', 'testo', 60);
    campoDiTesto('vlTestoMisura', 'testo', 40);
    $('vlChiusaLinea').onchange = function(){ impostaElemento('chiusa', this.checked); };
    $('vlFineScelta').onclick = finisciScelta;
    $('vlAnnullaScelta').onclick = function(){ annullaTratto(); giocatoriScelti = []; strumento = 'normale'; oggettoDaPosare = null; disegna(); };

    const menu = $('vlAggiungi');
    OGGETTI.forEach(function(o){
      const op = document.createElement('option');
      op.value = o.chiave;
      op.textContent = o.nome;
      menu.appendChild(op);
    });
    menu.onchange = function(){
      if (!this.value) return;
      ferma();
      giocatoriScelti = [];
      oggettoDaPosare = this.value;
      strumento = 'posa';
      selezionato = null;
      disegna();
    };

    const numero = $('vlNumeroOggetto');
    numero.addEventListener('focus', function(){ segna(); });
    numero.addEventListener('input', function(){
      const v = this.value.replace(/\s+/g, '').slice(0, 3).toUpperCase();
      impostaElemento('n', v === '' ? null : (/^\d+$/.test(v) ? +v : v), true);
    });
    numero.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === 'Escape'){ e.stopPropagation(); this.blur(); } });

    /* l'azione vale solo nella fase aperta */
    $('vlAzione').onchange = function(){
      const g = selezionato && M.elementoDi(fase(), selezionato);
      if (!g || g.tipo !== 'giocatore') return;
      segna();
      const qui = M.elementoDi(faseDopo(), g.id);
      if (this.value) qui.azione = this.value; else delete qui.azione;
      disegna();
    };
    $('vlDaiPalla').onclick = daiLaPalla;
    document.querySelectorAll('#vlAzioni .vl-azione').forEach(function(b){
      b.onclick = function(){
        ferma();
        giocatoriScelti = [];
        oggettoDaPosare = null;
        annullaTratto();
        strumento = b.dataset.strumento;
        avvisoRegola = null;
        selezionato = null;
        disegna();
      };
    });
    $('vlRuotaOggetto').onclick = function(){
      const og = selezionato && M.elementoDi(fase(), selezionato);
      if (og) impostaElemento('angolo', ((og.angolo || 0) + 90) % 360);
    };
    $('vlTogliTappe').onclick = function(){
      const og = selezionato && M.elementoDi(fase(), selezionato);
      if (!og || !og.tappe) return;
      segna();
      delete og.tappe;
      disegna();
    };
    $('vlTogliOggetto').onclick = function(){ togliSelezionato(false); };
    $('vlEliminaOggetto').onclick = function(){ togliSelezionato(true); };

    $('vlPlay').onclick = riproduci;
    $('vlAggiungiFase').onclick = function(){ ferma(); aggiungiFase(); };
    $('vlVideo').onclick = video;
    $('vlAnnulla').onclick = function(){ ferma(); annulla(); };
    $('vlVista').onchange = function(){
      segna();
      gioco.vista = {angolo: +this.value, giro: (gioco.vista && gioco.vista.giro) || 0};
      disegna();
    };
    /* ruotare il campo: il punto di vista, non il gioco */
    let giroSegnato = false;
    const gira = function(g, definitivo){
      g = Math.round(g / 5) * 5;
      if (g > 180) g -= 360;
      if (g < -180) g += 360;
      if (!giroSegnato){ segna(); giroSegnato = true; }
      gioco.vista = Object.assign({}, gioco.vista, {giro: g});
      $('vlGiroVista').value = String(g);
      campo.impostaProspettiva(angoloVista(), g);
      if (definitivo) giroSegnato = false;
    };
    $('vlGiroVista').oninput = function(){ gira(+this.value, false); };
    $('vlGiroVista').onchange = function(){ gira(+this.value, true); };
    $('vlGiroSx').onclick = function(){ gira(giroVista() - 45, true); };
    $('vlGiroDx').onclick = function(){ gira(giroVista() + 45, true); };
    $('vlGiroZero').onclick = function(){ gira(0, true); };
    $('vlDifesa').onchange = function(){
      segna();
      gioco.difesa = this.checked;
      disegna();
    };
    $('vlModo').onchange = async function(){
      const nuovo = this.value;
      if (nuovo === gioco.modo) return;
      ferma();
      const toccato = gioco.fasi.length > 1 || cronologia.vuota() === false;
      if (toccato){
        const ok = await conferma(T('Cambiando campo il gioco riparte dalla posizione di partenza: le fasi disegnate finora si perdono.'), T('Cambia campo'));
        if (!ok){ this.value = gioco.modo; return; }
      }
      segna();
      const nuovoGioco = giocoNuovo(nuovo);
      nuovoGioco.vista = gioco.vista;
      nuovoGioco.difesa = gioco.difesa;
      gioco = nuovoGioco;
      iFase = 0;
      selezionato = null;
      preparaCampo(gioco.modo);
      disegna();
    };

    $('vlChiudi').onclick = chiudi;
    $('vlSalva').onclick = salva;
    ['vlNome', 'vlSquadra', 'vlDescrizione', 'vlNote'].forEach(function(n){
      $(n).addEventListener('input', function(){ modificato = true; });
    });
    $('vlSezione').addEventListener('change', function(){ modificato = true; });

    document.addEventListener('keydown', tasti, true);
  }

  function tasti(e){
    if (!gioco || $('vdmLavagna').hidden || finestraAperta()) return;
    const dentroCampoTesto = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
    const tasto = e.key;
    if ((e.metaKey || e.ctrlKey) && (tasto === 'z' || tasto === 'Z')){
      if (dentroCampoTesto) return;
      e.preventDefault(); e.stopPropagation();
      ferma(); annulla();
      return;
    }
    if (dentroCampoTesto) return;
    if (tasto === 'Escape'){
      /* Italbasket chiude le sue finestre con Esc: qui Esc e' della lavagna */
      e.stopPropagation();
      if (tratto){ annullaTratto(); disegna(); return; }
      if (strumento !== 'normale'){ giocatoriScelti = []; strumento = 'normale'; oggettoDaPosare = null; campo.anteprima(null); disegna(); }
      else if (selezionato){ selezionato = null; disegna(); }
      return;
    }
    if (tasto === ' '){ e.preventDefault(); e.stopPropagation(); riproduci(); return; }
    if (tasto === 'Enter' && tratto){ e.preventDefault(); finisciTratto(); return; }
    if (tasto === 'Enter' && (strumento === 'linea' || strumento === 'evidenza' || strumento === 'posa')){
      e.preventDefault(); finisciScelta(); return;
    }
    if (tasto === 'ArrowRight' || tasto === 'ArrowLeft'){
      e.preventDefault(); e.stopPropagation();
      ferma();
      iFase = Math.max(0, Math.min(gioco.fasi.length - 1, iFase + (tasto === 'ArrowRight' ? 1 : -1)));
      disegna();
      return;
    }
    if ((tasto === 'Delete' || tasto === 'Backspace') && selezionato){
      e.preventDefault(); e.stopPropagation();
      togliSelezionato(false);
    }
  }

  /* il tempo dopo: parte da dove sono arrivate */
  function aggiungiFase(){
    annullaTratto();
    if (!gioco.fasi[iFase + 1]){ avvisa('prima disegna almeno un\'azione in questo tempo'); disegna(); return; }
    avvisoRegola = null;
    iFase++;
    selezionato = null;
    disegna();
  }

  function annulla(){
    const precedente = cronologia.annulla();
    if (!precedente) return;
    const cambioCampo = precedente.modo !== gioco.modo;
    gioco = precedente;
    if (cambioCampo) preparaCampo(gioco.modo);
    selezionato = null;
    disegna();
  }

  function ferma(){
    lettore.ferma();
    $('vlPlay').textContent = T('▶ Riproduci');
  }

  function riproduci(){
    if (lettore.inCorso()){ ferma(); disegna(); return; }
    if (gioco.fasi.length < 2) return;
    selezionato = null;
    iFase = 0;
    const partito = lettore.avvia(gioco.fasi, {
      durata: +$('vlVelocita').value, pausa: PAUSA_FASE, ciclo: $('vlCiclo').checked
    });
    if (partito) $('vlPlay').textContent = T('■ Ferma');
  }

  async function video(){
    if (esportando || gioco.fasi.length < 2) return;
    ferma();
    if (!(await videoSupportato())){
      avviso(T('Questo browser non riesce a creare il video. Prova con Chrome o con Safari aggiornato.'));
      return;
    }
    esportando = true;
    const b = $('vlVideo'), etichetta = b.textContent;
    b.disabled = true;
    let fatto = null;
    try {
      const nome = $('vlNome').value.trim() || T('Gioco');
      const blob = await esportaVideo({
        sport: sport, squadra: SENZA_ROSA,
        esercitazione: {nome: nome, fasi: gioco.fasi, vista: gioco.vista},
        opzioni: opzioni(),
        durataPassaggio: +$('vlVelocita').value,
        marchio: marchio,
        avanzamento: function(p){ b.textContent = T('Preparo il video… {p}%', {p: Math.round(p * 100)}); }
      });
      const vista = gioco.vista && gioco.vista.angolo ? '3D' : '2D';
      const file = nome.replace(/[\\/:*?"<>|#]+/g, ' ').replace(/\s+/g, ' ').trim() + ' (' + vista + ').mp4';
      /* chi ospita la lavagna puo' tenere il video anche lui (VDM Basketball:
         una clip nella sezione Video) */
      let tenuto = false;
      if (opzioniLavagna.alVideo){
        try { tenuto = await opzioniLavagna.alVideo(blob, file, {nome: nome, vista: vista}); }
        catch (e){ console.error(e); }
      }
      scarica(blob, file);
      fatto = tenuto ? T('video pronto: è anche fra le clip (Video)') : T('video pronto: controlla i download');
    } catch (err){
      avviso(T('Il video non è riuscito: ') + err.message);
    } finally {
      esportando = false;
      b.textContent = etichetta;
      disegna();
      if (fatto) stato(fatto);
    }
  }

  function scarica(blob, nome){
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = nome;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(url); }, 20000);
  }

  /* ---------- aprire, chiudere, salvare ---------- */
  function apri(dati){
    ferma();
    gioco = dati.gioco ? M.copia(dati.gioco) : giocoNuovo('mezzo');
    if (!gioco.vista) gioco.vista = {angolo: 0};
    const convertito = !!gioco.convertito;
    delete gioco.convertito;
    iFase = 0;
    strumento = 'normale'; oggettoDaPosare = null; selezionato = null; giocatoriScelti = [];
    avvisoPartenza = null;
    cronologia.azzera();
    modificato = convertito;
    alSalva = dati.alSalva;

    $('vlNome').value = dati.nome || '';
    const sezioni = $('vlSezione');
    sezioni.innerHTML = '';
    (dati.sezioni || []).forEach(function(s, i){
      const o = document.createElement('option');
      o.value = String(i);
      o.textContent = s;
      sezioni.appendChild(o);
    });
    sezioni.value = String(dati.sezione || 0);
    $('vlSquadra').value = dati.squadra || '';
    $('vlSquadre').innerHTML = '';
    (dati.squadre || []).forEach(function(n){
      const o = document.createElement('option');
      o.value = n;
      $('vlSquadre').appendChild(o);
    });
    $('vlDescrizione').value = dati.descrizione || '';
    $('vlNote').value = dati.note || '';
    $('vlAvvisoConvertito').hidden = !convertito;

    traduciPagina($('vdmLavagna'));
    $('vdmLavagna').hidden = false;
    document.documentElement.classList.add('vl-aperta');
    preparaCampo(gioco.modo);
    disegna();
    if (!dati.nome) setTimeout(function(){ $('vlNome').focus(); }, 30);
  }

  function nascondi(){
    ferma();
    mostraCartello(null);
    $('vdmLavagna').hidden = true;
    document.documentElement.classList.remove('vl-aperta');
    gioco = null;
  }

  async function chiudi(){
    if (modificato){
      const ok = await conferma(T('Chiudere senza salvare? Le modifiche a questo gioco si perdono.'), T('Chiudi senza salvare'));
      if (!ok) return;
    }
    nascondi();
  }

  async function salva(){
    const nome = $('vlNome').value.trim();
    if (!nome){ await avviso(T('Dai un nome al gioco prima di salvare.')); $('vlNome').focus(); return; }
    ferma();
    const b = $('vlSalva'), etichetta = b.textContent;
    b.disabled = true;
    b.textContent = T('Salvo…');
    try {
      /* le immagini per la stampa non devono mai impedire il salvataggio */
      let diagrammi = [];
      try { diagrammi = await immaginiDelleFasi(gioco); }
      catch (e) { console.warn('immagini dei tempi non riuscite, salvo senza', e); diagrammi = []; }
      await alSalva({
        nome: nome,
        sezione: +$('vlSezione').value || 0,
        squadra: $('vlSquadra').value.trim(),
        descrizione: $('vlDescrizione').value.trim(),
        note: $('vlNote').value.trim(),
        gioco: M.copia(gioco),
        diagrammi: diagrammi
      });
      modificato = false;
      nascondi();
    } catch (err){
      avviso(T('Non sono riuscito a salvare: ') + err.message);
    } finally {
      b.disabled = false;
      b.textContent = etichetta;
    }
  }

  costruisciComandi();
  costruisciCartello();
  costruisciAvvisoPartenza();

  return {apri: apri, aperta: function(){ return !!gioco; }};
}

/* ---------- le immagini delle fasi ----------
 * Il playbook di Italbasket stampa e fa i PDF con le immagini dei diagrammi:
 * al salvataggio si fa un'immagine per fase, disegnata dallo stesso campo. */
const VARIABILI = ['--erba', '--riga', '--contorno', '--casa', '--avversario', '--palla', '--passaggio', '--palleggio', '--blocco', '--taglio', '--numero'];

async function immaginiDelleFasi(gioco){
  const sport = creaSport(gioco.modo);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const campo = Campo(svg, sport);
  campo.impostaCampo(null);
  const vb = svg.getAttribute('viewBox').split(/\s+/).map(Number);
  const larga = 900, alta = Math.round(larga * vb[3] / vb[2]);
  svg.setAttribute('width', larga);
  svg.setAttribute('height', alta);
  svg.setAttribute('font-family', '-apple-system,"Helvetica Neue","Segoe UI",Arial,sans-serif');
  const stile = getComputedStyle(document.documentElement);
  const colori = {};
  VARIABILI.forEach(function(v){ colori[v] = stile.getPropertyValue(v).trim(); });
  const tela = document.createElement('canvas');
  tela.width = larga; tela.height = alta;
  const ctx = tela.getContext('2d');
  const opz = {avversari: !!gioco.difesa, ruoli: false, spessore: false};
  const immagini = [];
  /* un'immagine per tempo, come i fogli del playbook: posizioni e simboli */
  const tempi = Math.max(1, gioco.fasi.length - 1);
  for (let i = 0; i < tempi; i++){
    campo.disegnaDiagramma(gioco.fasi[i], gioco.fasi[i + 1] || null, {rosa: [], rosaAvversario: []}, opz);
    let xml = new XMLSerializer().serializeToString(svg);
    xml = xml.replace(/var\((--[a-z-]+)\)/g, function(_m, nome){ return colori[nome] || '#000'; });
    /* data: e non blob: — Safari, col file aperto dal disco, "sporca" la tela
       disegnata da un blob e poi non lascia farne l'immagine */
    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
    await Promise.race([
      img.decode(),
      new Promise(function(_ok, no){ setTimeout(function(){ no(new Error('immagine lenta')); }, 4000); })
    ]);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, larga, alta);
    ctx.drawImage(img, 0, 0, larga, alta);
    immagini.push(tela.toDataURL('image/jpeg', 0.86));
  }
  return immagini;
}

return { giocoNuovo, Lavagna, immaginiDelleFasi };
})();
/* ---- integrazioni/italbasket/anteprima.js ---- */
const __vdm_integrazioni_italbasket_anteprima_js = (function(){
/* L'anteprima di un gioco nella card del Playbook: il campo con la
 * partenza, e al clic l'animazione una volta. Alla fine resta l'ultima fase
 * con le sue frecce, come nel video. */

const { Lettore } = __vdm_src_renderer_core_animazione_js;
const { percorsoPalla, durataCartello, haCartello } = __vdm_src_renderer_core_modello_js;
const { Campo } = __vdm_src_renderer_ui_campo_js;
const { creaSport } = __vdm_src_renderer_sport_basket_js;
const { T, nomeFase } = __vdm_src_renderer_core_lingua_js;

const SENZA_ROSA = {rosa: [], rosaAvversario: []};
let inCorso = null;    // una sola anteprima alla volta

function montaAnteprima(contenitore, gioco){
  if (!gioco || !gioco.fasi || !gioco.fasi.length) return;
  contenitore.innerHTML =
    '<div class="vl-anteprima">' +
      '<div class="vl-cornice cornice-campo"><div class="palco vl-palco"></div>' +
        '<div class="vl-cartello vl-cartello-piccolo" hidden><div class="vl-cartello-titolo"></div><div class="vl-cartello-testo"></div></div>' +
      '</div>' +
      '<div class="vl-anteprima-barra">' +
        '<button type="button" class="vl-btn vl-piccolo vl-primario vl-anteprima-play">' + T(T('▶ Anima')) + '</button>' +
        '<span class="vl-anteprima-stato"></span>' +
        '<span class="vl-anteprima-marchio">' + T('motore VDM') + '</span>' +
      '</div>' +
    '</div>';
  const palco = contenitore.querySelector('.vl-palco');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'vl-campo vl-campo-piccolo');
  palco.appendChild(svg);
  const sport = creaSport(gioco.modo);
  const campo = Campo(svg, sport);
  campo.impostaCampo(null);
  const angolo = gioco.vista && gioco.vista.angolo ? gioco.vista.angolo : 0;
  const opz = {avversari: !!gioco.difesa, ruoli: false, spessore: angolo > 0};
  const bottone = contenitore.querySelector('.vl-anteprima-play');
  const statoTesto = contenitore.querySelector('.vl-anteprima-stato');
  const cartello = contenitore.querySelector('.vl-cartello');
  const fasi = gioco.fasi;

  function fermo(i){
    campo.disegnaDiagramma(fasi[i], fasi[i + 1] || null, SENZA_ROSA, opz);
    statoTesto.textContent = T(fasi.length === 1 ? '{n} fase' : '{n} fasi', {n: fasi.length});
  }

  const lettore = Lettore({
    disegna: function(f, s){ campo.disegnaFotogramma(f, SENZA_ROSA, opz, {punti: sport.sciaPalla(fasi[s], fasi[s + 1])}); },
    suFase: function(i){ statoTesto.textContent = T('fase {n} di {tot}', {n: i + 2, tot: fasi.length}) + ' · ' + (nomeFase(fasi[i + 1].nome) || ''); },
    inPausa: function(i){ campo.disegnaDiagramma(fasi[i], fasi[i + 1] || null, SENZA_ROSA, opz); },
    pausaIniziale: 1500,
    alTermine: function(){ bottone.textContent = T('↺ Di nuovo'); inCorso = null; fermo(fasi.length - 1); },
    ritmo: sport.ritmo,
    durataRelativa: sport.durataRelativa,
    durataCartello: function(i){ return durataCartello(fasi[i]); },
    mostraCartello: function(i){
      const f = i == null ? null : fasi[i];
      if (!f || !haCartello(f)){ cartello.hidden = true; return; }
      cartello.querySelector('.vl-cartello-titolo').textContent = f.cartello.titolo || '';
      cartello.querySelector('.vl-cartello-testo').textContent = f.cartello.testo || '';
      cartello.hidden = false;
    }
  });
  const controllo = {ferma: function(){ lettore.ferma(); bottone.textContent = T('▶ Anima'); fermo(0); }};

  bottone.disabled = fasi.length < 2;
  bottone.onclick = function(){
    if (lettore.inCorso()){ controllo.ferma(); inCorso = null; return; }
    if (inCorso && inCorso !== controllo) inCorso.ferma();
    inCorso = controllo;
    bottone.textContent = T('■ Ferma');
    lettore.avvia(fasi, {durata: gioco.velocita || 2600, pausa: 700, ciclo: false});
  };
  /* la prospettiva si imposta quando il campo e' gia' nella pagina */
  requestAnimationFrame(function(){ campo.impostaProspettiva(angolo, angolo && gioco.vista.giro || 0); fermo(0); });
  fermo(0);
}

return { montaAnteprima };
})();
/* ---- integrazioni/vdm-basket/converti.js ---- */
const __vdm_integrazioni_vdm_basket_converti_js = (function(){
/* Da un gioco del Playbook di VDM Basketball Coach (una riga con 4 caselle)
 * alle fasi del motore VDM.
 *
 * Com'e' fatto il Playbook di VDM Basketball (index.html, «PLAYBOOK»):
 *  - ogni casella ha le giocatrici (off/def con label, hasBall su chi ha la
 *    palla) e le frecce (move, dribble, screen, pass, shot) in coordinate da
 *    0 a 1 del canvas (mezzo campo 504x420, campo intero 576x324);
 *  - la casella dopo parte di solito dove finiscono le frecce della casella
 *    prima (playbookNextFrameElements): le frecce di una casella dicono
 *    come si passa alla successiva.
 * Qui si fa lo stesso ragionamento, con le stesse regole per capire chi si
 * muove e chi riceve (daRif/aRif, le stesse distanze), e in piu' si
 * tengono il tipo di azione e la forma della freccia. Il Playbook non si
 * tocca: si legge soltanto. */

const { UNITA_PER_METRO, canestroDi } = __vdm_src_renderer_sport_basket_js;
const { T } = __vdm_src_renderer_core_lingua_js;

const U = UNITA_PER_METRO;
const NEAR_PASS = 0.18;                 // le stesse distanze del Playbook
const AZIONE = {move: 'taglio', dribble: 'palleggio', screen: 'blocco'};

/* dal canvas del Playbook (0..1) alle unita' del campo VDM */
function convertitore(modo){
  if (modo === 'full') return function(p){ return {x: p.x * 28 * U, y: p.y * 15 * U}; };
  const w = 504, h = 420, scala = w / 15, fondo = h - 5;
  return function(p){ return {x: p.x * w / scala * U, y: (14 - (fondo - p.y * h) / scala) * U}; };
}

function numero(etichetta, difesa){
  const s = String(etichetta == null ? '' : etichetta).trim();
  if (!difesa) return /^\d+$/.test(s) ? +s : s;
  return /^\d+$/.test(s) ? 'X' + s : s;
}
const spalla = function(p){ return {x: p.x + 1.9, y: p.y - 1.9}; };
const partenzaDi = function(a){ return Array.isArray(a.pts) && a.pts.length ? a.pts[0] : {x: a.x, y: a.y}; };
const arrivoDi = function(a){ return Array.isArray(a.pts) && a.pts.length > 1 ? a.pts[a.pts.length - 1] : {x: a.x2, y: a.y2}; };
const valido = function(p){ return p && isFinite(p.x) && isFinite(p.y); };

function vicina(punto, pool, raggio){
  let meglio = null, d0 = raggio;
  pool.forEach(function(p){
    const d = Math.hypot(p.x - punto.x, p.y - punto.y);
    if (d < d0){ d0 = d; meglio = p; }
  });
  return meglio;
}
function perRiferimento(rif, pool, punto){
  if (!rif || !rif.label) return null;
  const p = pool.find(function(q){ return q.type === rif.tipo && String(q.label || '') === String(rif.label); });
  return p && Math.hypot(p.x - punto.x, p.y - punto.y) <= 0.30 ? p : null;
}
/* la ricevente di un passaggio: fuori dalla linea pesa il doppio, chi sta
   dietro la punta non riceve (come riceventeStimata del Playbook) */
function riceventeStimata(coda, punta, pool, arrivi){
  const dx = punta.x - coda.x, dy = punta.y - coda.y, len = Math.hypot(dx, dy);
  if (!len) return vicina(punta, pool, NEAR_PASS);
  const ux = dx / len, uy = dy / len;
  const punteggio = function(px, py){
    const qx = px - punta.x, qy = py - punta.y;
    if (Math.hypot(qx, qy) > 0.34) return Infinity;
    const avanti = qx * ux + qy * uy, lato = Math.abs(qx * -uy + qy * ux);
    if (avanti < -0.07) return Infinity;
    return lato * 2 + Math.max(0, avanti) * 0.6;
  };
  let meglio = null, p0 = Infinity;
  pool.forEach(function(q){
    let s = punteggio(q.x, q.y);
    const a = arrivi.get(q);
    if (a) s = Math.min(s, punteggio(a.x, a.y));
    if (s < p0){ p0 = s; meglio = q; }
  });
  return meglio || vicina(punta, pool, NEAR_PASS);
}

/* le giocatrici di una casella, con id stabili fra le caselle */
function giocatriciDi(elementi){
  const visti = {};
  return (elementi || []).filter(function(e){ return (e.type === 'off' || e.type === 'def') && valido(e); })
    .map(function(e){
      const lato = e.type === 'def' ? 'def' : 'off';
      let chiave = 'vb_' + lato + '_' + String(e.label == null ? '' : e.label).trim();
      visti[chiave] = (visti[chiave] || 0) + 1;
      if (visti[chiave] > 1) chiave += '_' + visti[chiave];
      return {el: e, id: chiave};
    });
}

/* le frecce di una casella: chi si muove (anche una freccia che parte dalla
   fine di un'altra: il blocco e poi il taglio), chi passa a chi, il tiro */
function leggiFrecce(elementi, giocatrici){
  const punti = giocatrici.map(function(g){ return g.el; });
  const idDi = new Map(giocatrici.map(function(g){ return [g.el, g.id]; }));
  const frecce = (elementi || []).filter(function(e){ return AZIONE[e.type] && valido(partenzaDi(e)) && valido(arrivoDi(e)); });
  const movimenti = new Map();          // elemento -> [freccia...]
  const fine = new Map();               // elemento -> dove arriva
  /* una freccia che parte proprio dalla fine di un'altra (piu' vicina di
     qualsiasi giocatrice) e' il seguito di quella: dopo il blocco, il taglio */
  const seguitoDiAltra = function(a){
    const p = partenzaDi(a);
    const g = vicina(p, punti, NEAR_PASS);
    const dg = g ? Math.hypot(g.x - p.x, g.y - p.y) : Infinity;
    return frecce.some(function(b){
      if (b === a) return false;
      const q = arrivoDi(b), d = Math.hypot(q.x - p.x, q.y - p.y);
      return d < 0.075 && d < dg;
    });
  };
  let restano = frecce.slice();
  for (let giro = 0; giro < 4 && restano.length; giro++){
    const dopo = [];
    restano.forEach(function(a){
      const p = partenzaDi(a);
      let chi = giro === 0 ? (perRiferimento(a.daRif, punti, p) || (seguitoDiAltra(a) ? null : vicina(p, punti, NEAR_PASS))) : null;
      if (!chi && giro === 0 && seguitoDiAltra(a)){ dopo.push(a); return; }
      if (!chi){
        /* parte dalla fine della freccia di qualcuno */
        let d0 = 0.075;
        fine.forEach(function(q, g){ const d = Math.hypot(q.x - p.x, q.y - p.y); if (d < d0){ d0 = d; chi = g; } });
      }
      if (!chi){ dopo.push(a); return; }
      if (!movimenti.has(chi)) movimenti.set(chi, []);
      movimenti.get(chi).push(a);
      fine.set(chi, arrivoDi(a));
    });
    if (dopo.length === restano.length) break;
    restano = dopo;
  }

  /* i passaggi, nell'ordine in cui gira la palla */
  const attacco = punti.filter(function(p){ return p.type === 'off'; });
  const passaggi = [];
  (elementi || []).filter(function(e){ return e.type === 'pass' && valido(partenzaDi(e)) && valido(arrivoDi(e)); }).forEach(function(a){
    const coda = partenzaDi(a), punta = arrivoDi(a);
    const da = perRiferimento(a.daRif, attacco, coda) || vicina(coda, attacco, NEAR_PASS)
            || (function(){ let chi = null, d0 = 0.075; fine.forEach(function(q, g){ if (g.type !== 'off') return; const d = Math.hypot(q.x - coda.x, q.y - coda.y); if (d < d0){ d0 = d; chi = g; } }); return chi; })();
    const candidate = attacco.filter(function(p){ return p !== da; });
    const a2 = perRiferimento(a.aRif, candidate, punta) || riceventeStimata(coda, punta, candidate, fine);
    if (a2 && a2 !== da) passaggi.push({da: da, a: a2});
  });
  /* il consegnato (hand-off): la palla alla compagna piu' vicina */
  (elementi || []).filter(function(e){ return e.type === 'handoff' && valido(e) && !e.fatta; }).forEach(function(h){
    const chiHa = attacco.find(function(p){ return p.hasBall; });
    if (!chiHa || Math.hypot(chiHa.x - h.x, chiHa.y - h.y) > 0.35) return;
    const altre = attacco.filter(function(p){ return p !== chiHa; })
      .map(function(p){ return {p: p, d: Math.hypot(p.x - h.x, p.y - h.y)}; }).sort(function(a, b){ return a.d - b.d; });
    if (altre.length && altre[0].d <= 0.35) passaggi.push({da: chiHa, a: altre[0].p});
  });
  const tiro = (elementi || []).some(function(e){ return e.type === 'shot'; });
  return {movimenti: movimenti, passaggi: passaggi, tiro: tiro, idDi: idDi};
}

function convertiRiga(riga){
  /* le caselle con un disegno; quelle riempite da sole dal Playbook
     (auto: la continuazione della casella prima) senza frecce non dicono
     niente di nuovo */
  const conFrecce = function(s){ return s.elements.some(function(e){ return AZIONE[e.type] || e.type === 'pass' || e.type === 'shot' || e.type === 'handoff'; }); };
  const caselle = (riga && riga.slots || []).filter(function(s){ return s && s.elements && s.elements.some(function(e){ return e.type === 'off' || e.type === 'def'; }); })
    .filter(function(s, i){ return i === 0 || !(s.auto === true && !conFrecce(s)); });
  if (!caselle.length) return null;
  const modoVecchio = caselle[0].campoMode === 'full' ? 'full' : 'half';
  const modo = modoVecchio === 'full' ? 'intero' : 'mezzo';
  const aUnita = convertitore(modoVecchio);
  const canestro = canestroDi(modo);
  const fasi = [];
  let nFase = 0, conPalla = null;     // id di chi ha la palla
  let difesa = false;

  function nuovaFase(nome, elementi){
    nFase++;
    return {id: 'vb_fase_' + nFase, nome: nome, elementi: elementi};
  }
  function metti(palla, chiId, elementi){
    const g = elementi.find(function(e){ return e.id === chiId; });
    if (g){ const p = spalla(g); palla.x = p.x; palla.y = p.y; }
  }

  let seguito = null;     // le azioni lette dalle frecce della casella prima
  caselle.forEach(function(casella, i){
    const giocatrici = giocatriciDi(casella.elements);
    const elementi = giocatrici.map(function(g){
      const difende = g.el.type === 'def';
      if (difende) difesa = true;
      const p = aUnita(g.el);
      return {id: g.id, tipo: 'giocatore', squadra: difende ? 'avversari' : 'casa', n: numero(g.el.label, difende), x: p.x, y: p.y};
    });
    (casella.elements || []).forEach(function(e, k){
      if (e.type === 'text' && String(e.text || '').trim() && valido(e)){
        const p = aUnita(e);
        elementi.push({id: 'vb_testo_' + nFase + '_' + k, tipo: 'scritta', testo: String(e.text).slice(0, 60),
                       stile: 'semplice', colore: 'bianco', x: p.x + 4, y: p.y + 1});
      }
    });
    const conLaPalla = giocatrici.find(function(g){ return g.el.type === 'off' && g.el.hasBall; });
    if (conLaPalla) conPalla = conLaPalla.id;
    else if (seguito && seguito.conPalla) conPalla = seguito.conPalla;
    if (!conPalla){
      const primo = elementi.find(function(g){ return g.squadra === 'casa' && g.n === 1; }) || elementi.find(function(g){ return g.squadra === 'casa'; });
      if (primo) conPalla = primo.id;
    }
    const palla = {id: 'vb_palla', tipo: 'palla', x: 0, y: 0};
    metti(palla, conPalla, elementi);
    if (conPalla) elementi.push(palla);

    /* le azioni della casella prima portano a queste posizioni */
    if (seguito){
      seguito.azioni.forEach(function(az, id){
        const g = elementi.find(function(e){ return e.id === id; });
        if (!g) return;
        Object.assign(g, az(g));
      });
      if (seguito.tappe.length && conPalla === seguito.conPalla) palla.tappe = seguito.tappe;
    }
    fasi.push(nuovaFase(i === 0 ? T('Partenza') : T('Tempo {n}', {n: i + 1}), elementi));

    /* le frecce di questa casella: come si va alla prossima */
    const f = leggiFrecce(casella.elements, giocatrici);
    const azioni = new Map();
    f.movimenti.forEach(function(lista, chi){
      const passi = lista.map(function(a){
        const arr = aUnita(arrivoDi(a));
        const s = {azione: AZIONE[a.type], x: arr.x, y: arr.y};
        if (Array.isArray(a.pts) && a.pts.length > 2) s.via = a.pts.slice(1, -1).filter(valido).map(aUnita);
        return s;
      });
      azioni.set(f.idDi.get(chi), function(g){
        const ultimo = passi[passi.length - 1];
        const fatto = {azione: ultimo.azione};
        /* dove arriva davvero la freccia (se la casella dopo non l'ha spostata) */
        if (Math.hypot(g.x - ultimo.x, g.y - ultimo.y) < 2.5){
          if (passi.length > 1) fatto.passi = passi.map(function(s){ return Object.assign({}, s); });
          else if (ultimo.via && ultimo.via.length) fatto.via = ultimo.via;
        }
        return fatto;
      });
    });
    let tappe = [], dopoPalla = conPalla;
    f.passaggi.forEach(function(p){
      const a = f.idDi.get(p.a);
      if (dopoPalla && dopoPalla !== conPalla) tappe.push({giocatore: dopoPalla});
      dopoPalla = a || dopoPalla;
    });
    seguito = {azioni: azioni, tappe: tappe, conPalla: dopoPalla, tiro: f.tiro,
               vuoto: !f.movimenti.size && !f.passaggi.length && !f.tiro};
  });

  /* le frecce dell'ultima casella: il movimento non e' disegnato da nessuna parte */
  if (seguito && !seguito.vuoto){
    const ultima = fasi[fasi.length - 1];
    const ultimaCasella = caselle[caselle.length - 1];
    const aUltime = giocatriciDi(ultimaCasella.elements);
    const f = leggiFrecce(ultimaCasella.elements, aUltime);
    if (f.movimenti.size || f.passaggi.length){
      const elementi = JSON.parse(JSON.stringify(ultima.elementi)).map(function(e){ delete e.azione; delete e.via; delete e.passi; delete e.tappe; return e; });
      f.movimenti.forEach(function(lista, chi){
        const g = elementi.find(function(e){ return e.id === f.idDi.get(chi); });
        if (!g) return;
        const passi = lista.map(function(a){
          const arr = aUnita(arrivoDi(a));
          const s = {azione: AZIONE[a.type], x: arr.x, y: arr.y};
          if (Array.isArray(a.pts) && a.pts.length > 2) s.via = a.pts.slice(1, -1).filter(valido).map(aUnita);
          return s;
        });
        const ultimo = passi[passi.length - 1];
        g.x = ultimo.x; g.y = ultimo.y; g.azione = ultimo.azione;
        if (passi.length > 1) g.passi = passi; else if (ultimo.via && ultimo.via.length) g.via = ultimo.via;
      });
      const palla = elementi.find(function(e){ return e.tipo === 'palla'; });
      if (palla){
        metti(palla, seguito.conPalla, elementi);
        if (seguito.tappe.length) palla.tappe = seguito.tappe;
      }
      fasi.push(nuovaFase(T('Tempo {n}', {n: fasi.length + 1}), elementi));
    }
    if (seguito.tiro){
      const f2 = fasi[fasi.length - 1];
      const elementi = JSON.parse(JSON.stringify(f2.elementi)).map(function(e){ delete e.azione; delete e.via; delete e.passi; delete e.tappe; return e; });
      const palla = elementi.find(function(e){ return e.tipo === 'palla'; });
      if (palla){ palla.x = canestro.x; palla.y = canestro.y; }
      fasi.push(nuovaFase(T('Tiro'), elementi));
    }
  }

  return {formato: 1, modo: modo, vista: {angolo: 40, giro: 180}, difesa: difesa, fasi: fasi, convertito: true};
}

return { convertiRiga };
})();
/* ---- integrazioni/vdm-basket/lingue.js ---- */
const __vdm_integrazioni_vdm_basket_lingue_js = (function(){
/* Le frasi della lavagna nelle lingue dell'app (le chiavi sono l'italiano del
 * motore). Se in una lingua manca una frase si prende l'inglese. */

const INGLESE = {
 "<strong>Ricostruito dal disegno originale.</strong> Le posizioni vengono dallo schema disegnato a mano, i movimenti dalle frecce: controlla le fasi e sistema quello che non torna, poi salva. Il disegno originale resta: si puo' sempre tornare indietro dalla card.": "<strong>Rebuilt from your Playbook diagram.</strong> Positions come from the diagram, movements from the arrows: check the steps, fix anything that looks wrong, then save. Your original diagram is not changed.",
 "Come sul playbook: le giocatrici stanno dove partono e sopra disegni i simboli. Il <b>numero cerchiato</b> ha la palla: può palleggiare o passare. Le altre tagliano o bloccano. Dai simboli il motore ricava dove arrivano e lo anima, col ritmo del gioco: prima il blocco, poi chi lo usa, poi il passaggio. <b>Tempo dopo ▸</b> riparte da dove sono arrivate. <b>Sposta</b> sistema le posizioni di partenza. Spazio riproduce, ← → cambiano tempo, ⌘Z annulla, Esc torna a Sposta.": "Just like the playbook: players stand where they start and you draw the symbols on top. The <b>circled number</b> has the ball: she can dribble or pass. The others cut or screen. From the symbols the engine works out where everyone ends up and animates it with the rhythm of the play: first the screen, then the player using it, then the pass. <b>Next step ▸</b> starts from where they ended up. <b>Move</b> adjusts the starting positions. Space plays, ← → change step, ⌘Z undoes, Esc goes back to Move.",
 "VDM": "VDM",
 "MOTORE": "ENGINE",
 "Chiudi": "Close",
 "💾 Salva nel playbook": "💾 Save to playbook",
 "▶ Riproduci": "▶ Play",
 "Tempo dopo ▸": "Next step ▸",
 "🎥 Video": "🎥 Video",
 "Velocità": "Speed",
 "Lenta": "Slow",
 "Normale": "Normal",
 "Veloce": "Fast",
 "ciclo": "loop",
 "Campo": "Court",
 "Metà campo": "Half court",
 "Campo intero": "Full court",
 "Vista": "View",
 "Dall'alto": "From above",
 "3D forte": "3D steep",
 "Ruota": "Rotate",
 "difesa": "defense",
 "propaga": "carry over",
 "Sposta": "Move",
 "Taglio": "Cut",
 "Palleggio": "Dribble",
 "Blocco": "Screen",
 "Passaggio": "Pass",
 "Palla": "Ball",
 "Tiro": "Shot",
 "Gomma": "Eraser",
 "▭ Zona": "▭ Zone",
 "╱ Linea": "╱ Line",
 "◎ Evidenzia": "◎ Highlight",
 "T Scritta": "T Text",
 "↔ Misura": "↔ Measure",
 "+ Aggiungi…": "+ Add…",
 "↶ Annulla": "↶ Undo",
 "Fine": "Done",
 "Annulla": "Cancel",
 "Passaggio nella partenza?": "Pass in the starting position?",
 "La fase 1 è la posizione di partenza: se questo è il primo passaggio, va in una fase nuova.": "Step 1 is the starting position: if this is the first pass, it goes into a new step.",
 "Fallo diventare un passaggio": "Make it a pass",
 "Va bene così": "Keep it as is",
 "Giocatrice": "Player",
 "◯ Dai la palla": "◯ Give her the ball",
 "Azione in questa fase": "Action in this step",
 "automatica": "automatic",
 "taglio": "cut",
 "palleggio": "dribble",
 "blocco": "screen",
 "Togli i passaggi intermedi": "Remove intermediate passes",
 "↻ Ruota": "↻ Rotate",
 "Togli da questa fase in poi": "Remove from this step on",
 "Elimina da tutte le fasi": "Delete from all steps",
 "Zona": "Zone",
 "Piena": "Filled",
 "Rigata": "Striped",
 "Contorno": "Outline",
 "Elimina": "Delete",
 "Linea": "Line",
 "Continua": "Solid",
 "Tratteggiata": "Dashed",
 "forma chiusa": "closed shape",
 "Evidenza": "Highlight",
 "Anello": "Ring",
 "Luce": "Glow",
 "Quadrato": "Square",
 "Ellisse": "Ellipse",
 "Scritta": "Text",
 "Fumetto": "Bubble",
 "Grande": "Large",
 "Semplice": "Plain",
 "Misura": "Measure",
 "▣ Aggiungi un cartello prima di questa fase": "▣ Add a title card before this step",
 "Cartello": "Title card",
 "Anteprima": "Preview",
 "Togli": "Remove",
 "OK": "OK",
 "Gioco animato": "Animated play",
 "Sezione del playbook": "Playbook section",
 "Squadra (opzionale)": "Team (optional)",
 "Il tempo dopo parte da dove sono arrivate": "The next step starts from where they ended up",
 "Gira il campo per guardarlo da un altro lato": "Turn the court to look at it from another side",
 "Gira a sinistra": "Turn left",
 "Gira a destra": "Turn right",
 "Torna di fronte": "Back to front view",
 "Spostando una giocatrice, si sposta anche nelle fasi dopo dove non l'hai ancora mossa": "Moving a player also moves her in the later steps where you haven't moved her yet",
 "Azioni": "Actions",
 "Sposta giocatrici e palla (Esc)": "Move players and ball (Esc)",
 "Taglio: trascina la giocatrice dove taglia": "Cut: drag the player where she cuts",
 "Palleggio: trascina chi ha la palla": "Dribble: drag the ball handler",
 "Blocco: trascina chi va a bloccare, oppure clicca chi blocca da ferma": "Screen: drag the screener, or click a player who screens standing still",
 "Passaggio: clicca chi riceve la palla (più clic = più passaggi)": "Pass: click who receives the ball (more clicks = more passes)",
 "Palla: clic su un numero per cerchiarlo (ha la palla)": "Ball: click a number to circle it (she has the ball)",
 "Tiro: clicca chi tira": "Shot: click the shooter",
 "Gomma: clic su una giocatrice per togliere le sue azioni in questo tempo": "Eraser: click a player to remove her actions in this step",
 "Trascina sul campo per disegnare una zona": "Drag on the court to draw a zone",
 "Unisci giocatrici con una linea": "Connect players with a line",
 "Evidenzia una o più giocatrici": "Highlight one or more players",
 "Scritta sul campo o sopra una giocatrice": "Text on the court or above a player",
 "Distanza in metri": "Distance in meters",
 "Aggiungi sul campo": "Add to the court",
 "Annulla (⌘Z)": "Undo (⌘Z)",
 "n.": "no.",
 "Numero o sigla (es. 4, X2)": "Number or label (e.g. 4, X2)",
 "All'inizio di questo tempo la palla ce l'ha lei": "She has the ball at the start of this step",
 "Etichetta (es. Lato debole)": "Label (e.g. Weak side)",
 "Testo": "Text",
 "Nota (es. distanza fra le linee)": "Note (e.g. spacing between the lines)",
 "Titolo (es. Pick and roll centrale)": "Title (e.g. Middle pick and roll)",
 "Cosa guardare in questa fase": "What to watch in this step",
 "Descrizione": "Description",
 "Note": "Notes",
 "Partenza": "Start",
 "fase {a} → {b}": "step {a} → {b}",
 "fase {n} di {tot}": "step {n} of {tot}",
 "Attenzione:": "Note:",
 "✔ Fine tratto": "✔ Finish line",
 "tempo {n}": "step {n}",
 "Esc per Sposta": "Esc for Move",
 "<strong>Aggiungi:</strong> clicca sul campo per mettere {cosa}, anche più volte · Esc o Fine per smettere": "<strong>Add:</strong> click on the court to place {cosa}, as many times as you like · Esc or Done to stop",
 "<strong>Linea:</strong> clicca le giocatrici da unire, nell'ordine · clic sulla prima per chiudere · Invio per finire": "<strong>Line:</strong> click the players to connect, in order · click the first one to close · Enter to finish",
 "<strong>Evidenzia:</strong> clicca una o più giocatrici (di nuovo per toglierla) · Invio per finire": "<strong>Highlight:</strong> click one or more players (again to remove) · Enter to finish",
 "Ha un cartello prima": "Has a title card before it",
 "Doppio clic per cambiare nome": "Double-click to rename",
 "Nome della fase": "Step name",
 "es. Blocco del 5 per l'1": "e.g. 5 screens for 1",
 "elimina la fase": "delete the step",
 "Tempo {n}": "Step {n}",
 "Primo passaggio": "First pass",
 "Cartello prima della fase {n}": "Title card before step {n}",
 "Oggetto": "Object",
 "Togli i passaggi intermedi ({n})": "Remove intermediate passes ({n})",
 "Cambiando campo il gioco riparte dalla posizione di partenza: le fasi disegnate finora si perdono.": "Changing the court restarts the play from the starting position: the steps drawn so far will be lost.",
 "Cambia campo": "Change court",
 "■ Ferma": "■ Stop",
 "Questo browser non riesce a creare il video. Prova con Chrome o con Safari aggiornato.": "This computer can't create the video. Try updating the app.",
 "Gioco": "Play",
 "Preparo il video… {p}%": "Making the video… {p}%",
 "video pronto: controlla i download": "video ready: check your downloads",
 "Il video non è riuscito: ": "The video failed: ",
 "Chiudere senza salvare? Le modifiche a questo gioco si perdono.": "Close without saving? Changes to this play will be lost.",
 "Chiudi senza salvare": "Close without saving",
 "Dai un nome al gioco prima di salvare.": "Give the play a name before saving.",
 "Salvo…": "Saving…",
 "Non sono riuscito a salvare: ": "Couldn't save: ",
 "▶ Anima": "▶ Animate",
 "motore VDM": "VDM engine",
 "↺ Di nuovo": "↺ Again",
 "Conferma": "Confirm",
 "Servono almeno due fasi per fare un video.": "You need at least two steps to make a video.",
 "Questo computer non riesce a creare video H.264.": "This computer can't create H.264 video.",
 "Questo computer non riesce a fare il video con il campo inclinato (WebGL non disponibile).": "This computer can't make the video with the tilted court (WebGL not available).",
 "Fase {n} di {tot}": "Step {n} of {tot}",
 "<strong>Taglio:</strong> clic sulla giocatrice, poi clic sul percorso (i punti in mezzo fanno la curva) · doppio clic per finire": "<strong>Cut:</strong> click the player, then click along the path (points in between make the curve) · double-click to finish",
 "<strong>Palleggio:</strong> clic sul numero cerchiato, poi clic sul percorso · doppio clic per finire": "<strong>Dribble:</strong> click the circled number, then click along the path · double-click to finish",
 "<strong>Blocco:</strong> clic sulla giocatrice, poi dove va a bloccare · doppio clic per finire · doppio clic sul numero = blocco da ferma · dopo il blocco, Taglio sulla stessa giocatrice = si butta dentro o si apre": "<strong>Screen:</strong> click the player, then where she sets the screen · double-click to finish · double-click the number = screen standing still · after the screen, Cut on the same player = roll or pop",
 "<strong>Gomma:</strong> clic su una giocatrice per togliere le sue azioni in questo tempo": "<strong>Eraser:</strong> click a player to remove her actions in this step",
 "<strong>Passaggio:</strong> clic sul numero cerchiato, poi clic su chi riceve": "<strong>Pass:</strong> click the circled number, then click the receiver",
 "<strong>Tiro:</strong> clicca chi tira": "<strong>Shot:</strong> click the shooter",
 "<strong>Palla:</strong> clic su un numero: lo cerchia, all'inizio del tempo la palla ce l'ha lei": "<strong>Ball:</strong> click a number to circle it: she has the ball at the start of the step",
 "chi ha la palla (numero cerchiato) non blocca: palleggia o passa": "the ball handler (circled number) doesn't screen: she dribbles or passes",
 "palleggia solo chi ha la palla (numero cerchiato): questo è diventato un taglio": "only the ball handler (circled number) dribbles: this became a cut",
 "passa solo chi ha la palla: parti dal numero cerchiato": "only the ball handler passes: start from the circled number",
 "palleggia solo chi ha la palla (numero cerchiato): questo è un taglio": "only the ball handler (circled number) dribbles: this is a cut",
 "nessuna ha la palla: clicca una giocatrice e «Dai la palla»": "nobody has the ball: click a player and «Give her the ball»",
 "prima disegna almeno un'azione in questo tempo": "first draw at least one action in this step",
 "parti da chi ha la palla: il numero cerchiato o la fine del suo palleggio": "start from the ball handler: the circled number or the end of her dribble",
 "parti da una giocatrice: clic sul suo numero": "start from a player: click her number",
 "Attaccante": "Offense player",
 "Difensore": "Defender",
 "Cono": "Cone",
 "Allenatore": "Coach",
 "attaccata alla giocatrice": "attached to the player",
 "ferma sul campo": "fixed on the court",
 "giallo": "yellow",
 "ciano": "cyan",
 "rosso": "red",
 "verde": "green",
 "bianco": "white",
 "{n} fase": "{n} step",
 "{n} fasi": "{n} steps",
 "video pronto: è anche fra le clip (Video)": "video ready: it's also in your clips (Video)"
};

/* le altre 10 lingue dell'app */
const ALTRE_LINGUE = {
 es: { // spagnolo
  "<strong>Ricostruito dal disegno originale.</strong> Le posizioni vengono dallo schema disegnato a mano, i movimenti dalle frecce: controlla le fasi e sistema quello che non torna, poi salva. Il disegno originale resta: si puo' sempre tornare indietro dalla card.": "<strong>Reconstruido a partir de tu esquema del Playbook.</strong> Las posiciones vienen del esquema y los movimientos de las flechas: revisa las fases, corrige lo que no cuadre y luego guarda. Tu esquema original no cambia.",
  "Come sul playbook: le giocatrici stanno dove partono e sopra disegni i simboli. Il <b>numero cerchiato</b> ha la palla: può palleggiare o passare. Le altre tagliano o bloccano. Dai simboli il motore ricava dove arrivano e lo anima, col ritmo del gioco: prima il blocco, poi chi lo usa, poi il passaggio. <b>Tempo dopo ▸</b> riparte da dove sono arrivate. <b>Sposta</b> sistema le posizioni di partenza. Spazio riproduce, ← → cambiano tempo, ⌘Z annulla, Esc torna a Sposta.": "Como en el playbook: las jugadoras están donde empiezan y encima dibujas los símbolos. El <b>número en círculo</b> tiene el balón: puede botar o pasar. Las demás cortan o bloquean. A partir de los símbolos el motor calcula adónde llega cada una y lo anima con el ritmo de la jugada: primero el bloqueo, luego quien lo usa, luego el pase. <b>Fase siguiente ▸</b> arranca desde donde han llegado. <b>Mover</b> ajusta las posiciones de partida. Espacio reproduce, ← → cambian de fase, ⌘Z deshace, Esc vuelve a Mover.",
  "VDM": "VDM",
  "MOTORE": "MOTOR",
  "Chiudi": "Cerrar",
  "💾 Salva nel playbook": "💾 Guardar en el playbook",
  "▶ Riproduci": "▶ Reproducir",
  "Tempo dopo ▸": "Fase siguiente ▸",
  "🎥 Video": "🎥 Video",
  "Velocità": "Velocidad",
  "Lenta": "Lenta",
  "Normale": "Normal",
  "Veloce": "Rápida",
  "ciclo": "bucle",
  "Campo": "Cancha",
  "Metà campo": "Media cancha",
  "Campo intero": "Cancha completa",
  "Vista": "Vista",
  "Dall'alto": "Desde arriba",
  "3D forte": "3D inclinado",
  "Ruota": "Girar",
  "difesa": "defensa",
  "propaga": "propagar",
  "Sposta": "Mover",
  "Taglio": "Corte",
  "Palleggio": "Bote",
  "Blocco": "Bloqueo",
  "Passaggio": "Pase",
  "Palla": "Balón",
  "Tiro": "Tiro",
  "Gomma": "Borrador",
  "▭ Zona": "▭ Zona",
  "╱ Linea": "╱ Línea",
  "◎ Evidenzia": "◎ Resaltar",
  "T Scritta": "T Texto",
  "↔ Misura": "↔ Medir",
  "+ Aggiungi…": "+ Añadir…",
  "↶ Annulla": "↶ Deshacer",
  "Fine": "Listo",
  "Annulla": "Cancelar",
  "Passaggio nella partenza?": "¿Pase en la posición de partida?",
  "La fase 1 è la posizione di partenza: se questo è il primo passaggio, va in una fase nuova.": "La fase 1 es la posición de partida: si este es el primer pase, va en una fase nueva.",
  "Fallo diventare un passaggio": "Convertirlo en pase",
  "Va bene così": "Dejarlo así",
  "Giocatrice": "Jugadora",
  "◯ Dai la palla": "◯ Darle el balón",
  "Azione in questa fase": "Acción en esta fase",
  "automatica": "automática",
  "taglio": "corte",
  "palleggio": "bote",
  "blocco": "bloqueo",
  "Togli i passaggi intermedi": "Quitar los pases intermedios",
  "↻ Ruota": "↻ Girar",
  "Togli da questa fase in poi": "Quitar desde esta fase en adelante",
  "Elimina da tutte le fasi": "Eliminar de todas las fases",
  "Zona": "Zona",
  "Piena": "Relleno",
  "Rigata": "Rayado",
  "Contorno": "Contorno",
  "Elimina": "Eliminar",
  "Linea": "Línea",
  "Continua": "Continua",
  "Tratteggiata": "Discontinua",
  "forma chiusa": "forma cerrada",
  "Evidenza": "Resaltado",
  "Anello": "Anillo",
  "Luce": "Brillo",
  "Quadrato": "Cuadrado",
  "Ellisse": "Elipse",
  "Scritta": "Texto",
  "Fumetto": "Bocadillo",
  "Grande": "Grande",
  "Semplice": "Simple",
  "Misura": "Medida",
  "▣ Aggiungi un cartello prima di questa fase": "▣ Añadir un rótulo antes de esta fase",
  "Cartello": "Rótulo",
  "Anteprima": "Vista previa",
  "Togli": "Quitar",
  "OK": "OK",
  "Gioco animato": "Jugada animada",
  "Sezione del playbook": "Sección del playbook",
  "Squadra (opzionale)": "Equipo (opcional)",
  "Il tempo dopo parte da dove sono arrivate": "La fase siguiente arranca desde donde han llegado",
  "Gira il campo per guardarlo da un altro lato": "Gira la cancha para verla desde otro lado",
  "Gira a sinistra": "Girar a la izquierda",
  "Gira a destra": "Girar a la derecha",
  "Torna di fronte": "Volver a la vista frontal",
  "Spostando una giocatrice, si sposta anche nelle fasi dopo dove non l'hai ancora mossa": "Al mover una jugadora, también se mueve en las fases siguientes donde aún no la has movido",
  "Azioni": "Acciones",
  "Sposta giocatrici e palla (Esc)": "Mover jugadoras y balón (Esc)",
  "Taglio: trascina la giocatrice dove taglia": "Corte: arrastra a la jugadora hacia donde corta",
  "Palleggio: trascina chi ha la palla": "Bote: arrastra a quien tiene el balón",
  "Blocco: trascina chi va a bloccare, oppure clicca chi blocca da ferma": "Bloqueo: arrastra a la bloqueadora, o haz clic en una jugadora que bloquea parada",
  "Passaggio: clicca chi riceve la palla (più clic = più passaggi)": "Pase: haz clic en quien recibe el balón (más clics = más pases)",
  "Palla: clic su un numero per cerchiarlo (ha la palla)": "Balón: clic en un número para rodearlo con un círculo (tiene el balón)",
  "Tiro: clicca chi tira": "Tiro: haz clic en quien tira",
  "Gomma: clic su una giocatrice per togliere le sue azioni in questo tempo": "Borrador: clic en una jugadora para quitar sus acciones en esta fase",
  "Trascina sul campo per disegnare una zona": "Arrastra sobre la cancha para dibujar una zona",
  "Unisci giocatrici con una linea": "Une jugadoras con una línea",
  "Evidenzia una o più giocatrici": "Resalta una o más jugadoras",
  "Scritta sul campo o sopra una giocatrice": "Texto en la cancha o encima de una jugadora",
  "Distanza in metri": "Distancia en metros",
  "Aggiungi sul campo": "Añadir a la cancha",
  "Annulla (⌘Z)": "Deshacer (⌘Z)",
  "n.": "n.º",
  "Numero o sigla (es. 4, X2)": "Número o sigla (ej. 4, X2)",
  "All'inizio di questo tempo la palla ce l'ha lei": "Al inicio de esta fase tiene ella el balón",
  "Etichetta (es. Lato debole)": "Etiqueta (ej. Lado débil)",
  "Testo": "Texto",
  "Nota (es. distanza fra le linee)": "Nota (ej. espacio entre las líneas)",
  "Titolo (es. Pick and roll centrale)": "Título (ej. Bloqueo directo central)",
  "Cosa guardare in questa fase": "Qué mirar en esta fase",
  "Descrizione": "Descripción",
  "Note": "Notas",
  "Partenza": "Partida",
  "fase {a} → {b}": "fase {a} → {b}",
  "fase {n} di {tot}": "fase {n} de {tot}",
  "Attenzione:": "Atención:",
  "✔ Fine tratto": "✔ Terminar trazo",
  "tempo {n}": "fase {n}",
  "Esc per Sposta": "Esc para Mover",
  "<strong>Aggiungi:</strong> clicca sul campo per mettere {cosa}, anche più volte · Esc o Fine per smettere": "<strong>Añadir:</strong> haz clic en la cancha para colocar {cosa}, todas las veces que quieras · Esc o Listo para terminar",
  "<strong>Linea:</strong> clicca le giocatrici da unire, nell'ordine · clic sulla prima per chiudere · Invio per finire": "<strong>Línea:</strong> haz clic en las jugadoras que quieres unir, en orden · clic en la primera para cerrar · Intro para terminar",
  "<strong>Evidenzia:</strong> clicca una o più giocatrici (di nuovo per toglierla) · Invio per finire": "<strong>Resaltar:</strong> haz clic en una o más jugadoras (otra vez para quitarla) · Intro para terminar",
  "Ha un cartello prima": "Tiene un rótulo antes",
  "Doppio clic per cambiare nome": "Doble clic para cambiar el nombre",
  "Nome della fase": "Nombre de la fase",
  "es. Blocco del 5 per l'1": "ej. Bloqueo del 5 para el 1",
  "elimina la fase": "eliminar la fase",
  "Tempo {n}": "Fase {n}",
  "Primo passaggio": "Primer pase",
  "Cartello prima della fase {n}": "Rótulo antes de la fase {n}",
  "Oggetto": "Objeto",
  "Togli i passaggi intermedi ({n})": "Quitar los pases intermedios ({n})",
  "Cambiando campo il gioco riparte dalla posizione di partenza: le fasi disegnate finora si perdono.": "Al cambiar de cancha la jugada vuelve a la posición de partida: las fases dibujadas hasta ahora se pierden.",
  "Cambia campo": "Cambiar cancha",
  "■ Ferma": "■ Detener",
  "Questo browser non riesce a creare il video. Prova con Chrome o con Safari aggiornato.": "Este ordenador no puede crear el vídeo. Prueba a actualizar la app.",
  "Gioco": "Jugada",
  "Preparo il video… {p}%": "Preparando el vídeo… {p}%",
  "video pronto: controlla i download": "vídeo listo: revisa tus descargas",
  "Il video non è riuscito: ": "El vídeo ha fallado: ",
  "Chiudere senza salvare? Le modifiche a questo gioco si perdono.": "¿Cerrar sin guardar? Los cambios en esta jugada se perderán.",
  "Chiudi senza salvare": "Cerrar sin guardar",
  "Dai un nome al gioco prima di salvare.": "Ponle un nombre a la jugada antes de guardar.",
  "Salvo…": "Guardando…",
  "Non sono riuscito a salvare: ": "No se ha podido guardar: ",
  "▶ Anima": "▶ Animar",
  "motore VDM": "motor VDM",
  "↺ Di nuovo": "↺ Otra vez",
  "Conferma": "Confirmar",
  "Servono almeno due fasi per fare un video.": "Se necesitan al menos dos fases para hacer un vídeo.",
  "Questo computer non riesce a creare video H.264.": "Este ordenador no puede crear vídeo H.264.",
  "Questo computer non riesce a fare il video con il campo inclinato (WebGL non disponibile).": "Este ordenador no puede hacer el vídeo con la cancha inclinada (WebGL no disponible).",
  "Fase {n} di {tot}": "Fase {n} de {tot}",
  "<strong>Taglio:</strong> clic sulla giocatrice, poi clic sul percorso (i punti in mezzo fanno la curva) · doppio clic per finire": "<strong>Corte:</strong> clic en la jugadora y luego clic a lo largo del recorrido (los puntos intermedios hacen la curva) · doble clic para terminar",
  "<strong>Palleggio:</strong> clic sul numero cerchiato, poi clic sul percorso · doppio clic per finire": "<strong>Bote:</strong> clic en el número en círculo y luego clic a lo largo del recorrido · doble clic para terminar",
  "<strong>Blocco:</strong> clic sulla giocatrice, poi dove va a bloccare · doppio clic per finire · doppio clic sul numero = blocco da ferma · dopo il blocco, Taglio sulla stessa giocatrice = si butta dentro o si apre": "<strong>Bloqueo:</strong> clic en la jugadora y luego donde pone el bloqueo · doble clic para terminar · doble clic en el número = bloqueo parada · tras el bloqueo, Corte sobre la misma jugadora = continuación o abrirse",
  "<strong>Gomma:</strong> clic su una giocatrice per togliere le sue azioni in questo tempo": "<strong>Borrador:</strong> clic en una jugadora para quitar sus acciones en esta fase",
  "<strong>Passaggio:</strong> clic sul numero cerchiato, poi clic su chi riceve": "<strong>Pase:</strong> clic en el número en círculo y luego clic en quien recibe",
  "<strong>Tiro:</strong> clicca chi tira": "<strong>Tiro:</strong> haz clic en quien tira",
  "<strong>Palla:</strong> clic su un numero: lo cerchia, all'inizio del tempo la palla ce l'ha lei": "<strong>Balón:</strong> clic en un número para rodearlo con un círculo: tiene el balón al inicio de la fase",
  "chi ha la palla (numero cerchiato) non blocca: palleggia o passa": "quien tiene el balón (número en círculo) no bloquea: bota o pasa",
  "palleggia solo chi ha la palla (numero cerchiato): questo è diventato un taglio": "solo bota quien tiene el balón (número en círculo): esto se ha convertido en un corte",
  "passa solo chi ha la palla: parti dal numero cerchiato": "solo pasa quien tiene el balón: empieza desde el número en círculo",
  "palleggia solo chi ha la palla (numero cerchiato): questo è un taglio": "solo bota quien tiene el balón (número en círculo): esto es un corte",
  "nessuna ha la palla: clicca una giocatrice e «Dai la palla»": "ninguna tiene el balón: haz clic en una jugadora y «Darle el balón»",
  "prima disegna almeno un'azione in questo tempo": "primero dibuja al menos una acción en esta fase",
  "parti da chi ha la palla: il numero cerchiato o la fine del suo palleggio": "empieza desde quien tiene el balón: el número en círculo o el final de su bote",
  "parti da una giocatrice: clic sul suo numero": "empieza desde una jugadora: clic en su número",
  "Attaccante": "Atacante",
  "Difensore": "Defensora",
  "Cono": "Cono",
  "Allenatore": "Entrenador",
  "attaccata alla giocatrice": "pegada a la jugadora",
  "ferma sul campo": "fija en la cancha",
  "giallo": "amarillo",
  "ciano": "cian",
  "rosso": "rojo",
  "verde": "verde",
  "bianco": "blanco",
  "{n} fase": "{n} fase",
  "{n} fasi": "{n} fases",
  "video pronto: è anche fra le clip (Video)": "vídeo listo: también está en tus clips (Video)"
 },
 fr: { // francese
  "<strong>Ricostruito dal disegno originale.</strong> Le posizioni vengono dallo schema disegnato a mano, i movimenti dalle frecce: controlla le fasi e sistema quello che non torna, poi salva. Il disegno originale resta: si puo' sempre tornare indietro dalla card.": "<strong>Reconstruit à partir de ton schéma du Playbook.</strong> Les positions viennent du schéma, les déplacements des flèches : vérifie les étapes, corrige ce qui ne va pas, puis enregistre. Ton schéma d'origine n'est pas modifié.",
  "Come sul playbook: le giocatrici stanno dove partono e sopra disegni i simboli. Il <b>numero cerchiato</b> ha la palla: può palleggiare o passare. Le altre tagliano o bloccano. Dai simboli il motore ricava dove arrivano e lo anima, col ritmo del gioco: prima il blocco, poi chi lo usa, poi il passaggio. <b>Tempo dopo ▸</b> riparte da dove sono arrivate. <b>Sposta</b> sistema le posizioni di partenza. Spazio riproduce, ← → cambiano tempo, ⌘Z annulla, Esc torna a Sposta.": "Comme sur le playbook : les joueuses sont à leur position de départ et tu dessines les symboles par-dessus. Le <b>numéro entouré</b> a le ballon : elle peut dribbler ou passer. Les autres coupent ou posent des écrans. À partir des symboles, le moteur calcule où chacune arrive et l'anime au rythme du jeu : d'abord l'écran, puis la joueuse qui l'utilise, puis la passe. <b>Étape suivante ▸</b> repart de là où elles sont arrivées. <b>Déplacer</b> ajuste les positions de départ. Espace lance la lecture, ← → changent d'étape, ⌘Z annule, Esc revient à Déplacer.",
  "VDM": "VDM",
  "MOTORE": "MOTEUR",
  "Chiudi": "Fermer",
  "💾 Salva nel playbook": "💾 Enregistrer dans le playbook",
  "▶ Riproduci": "▶ Lire",
  "Tempo dopo ▸": "Étape suivante ▸",
  "🎥 Video": "🎥 Vidéo",
  "Velocità": "Vitesse",
  "Lenta": "Lente",
  "Normale": "Normale",
  "Veloce": "Rapide",
  "ciclo": "boucle",
  "Campo": "Terrain",
  "Metà campo": "Demi-terrain",
  "Campo intero": "Terrain complet",
  "Vista": "Vue",
  "Dall'alto": "Du dessus",
  "3D forte": "3D plongeante",
  "Ruota": "Tourner",
  "difesa": "défense",
  "propaga": "reporter",
  "Sposta": "Déplacer",
  "Taglio": "Coupe",
  "Palleggio": "Dribble",
  "Blocco": "Écran",
  "Passaggio": "Passe",
  "Palla": "Ballon",
  "Tiro": "Tir",
  "Gomma": "Gomme",
  "▭ Zona": "▭ Zone",
  "╱ Linea": "╱ Ligne",
  "◎ Evidenzia": "◎ Surligner",
  "T Scritta": "T Texte",
  "↔ Misura": "↔ Mesure",
  "+ Aggiungi…": "+ Ajouter…",
  "↶ Annulla": "↶ Annuler",
  "Fine": "Terminé",
  "Annulla": "Annuler",
  "Passaggio nella partenza?": "Passe dans la position de départ ?",
  "La fase 1 è la posizione di partenza: se questo è il primo passaggio, va in una fase nuova.": "L'étape 1 est la position de départ : si c'est la première passe, elle va dans une nouvelle étape.",
  "Fallo diventare un passaggio": "En faire une passe",
  "Va bene così": "Laisser ainsi",
  "Giocatrice": "Joueuse",
  "◯ Dai la palla": "◯ Lui donner le ballon",
  "Azione in questa fase": "Action dans cette étape",
  "automatica": "automatique",
  "taglio": "coupe",
  "palleggio": "dribble",
  "blocco": "écran",
  "Togli i passaggi intermedi": "Retirer les passes intermédiaires",
  "↻ Ruota": "↻ Tourner",
  "Togli da questa fase in poi": "Retirer à partir de cette étape",
  "Elimina da tutte le fasi": "Supprimer de toutes les étapes",
  "Zona": "Zone",
  "Piena": "Pleine",
  "Rigata": "Rayée",
  "Contorno": "Contour",
  "Elimina": "Supprimer",
  "Linea": "Ligne",
  "Continua": "Continue",
  "Tratteggiata": "Pointillée",
  "forma chiusa": "forme fermée",
  "Evidenza": "Surlignage",
  "Anello": "Anneau",
  "Luce": "Halo",
  "Quadrato": "Carré",
  "Ellisse": "Ellipse",
  "Scritta": "Texte",
  "Fumetto": "Bulle",
  "Grande": "Grand",
  "Semplice": "Simple",
  "Misura": "Mesure",
  "▣ Aggiungi un cartello prima di questa fase": "▣ Ajouter un carton avant cette étape",
  "Cartello": "Carton",
  "Anteprima": "Aperçu",
  "Togli": "Retirer",
  "OK": "OK",
  "Gioco animato": "Système animé",
  "Sezione del playbook": "Section du playbook",
  "Squadra (opzionale)": "Équipe (facultatif)",
  "Il tempo dopo parte da dove sono arrivate": "L'étape suivante part de là où elles sont arrivées",
  "Gira il campo per guardarlo da un altro lato": "Tourne le terrain pour le voir d'un autre côté",
  "Gira a sinistra": "Tourner à gauche",
  "Gira a destra": "Tourner à droite",
  "Torna di fronte": "Revenir de face",
  "Spostando una giocatrice, si sposta anche nelle fasi dopo dove non l'hai ancora mossa": "Si tu déplaces une joueuse, elle se déplace aussi dans les étapes suivantes où tu ne l'as pas encore bougée",
  "Azioni": "Actions",
  "Sposta giocatrici e palla (Esc)": "Déplacer joueuses et ballon (Esc)",
  "Taglio: trascina la giocatrice dove taglia": "Coupe : fais glisser la joueuse là où elle coupe",
  "Palleggio: trascina chi ha la palla": "Dribble : fais glisser la porteuse du ballon",
  "Blocco: trascina chi va a bloccare, oppure clicca chi blocca da ferma": "Écran : fais glisser la joueuse qui va poser l'écran, ou clique sur celle qui fait écran sur place",
  "Passaggio: clicca chi riceve la palla (più clic = più passaggi)": "Passe : clique sur celle qui reçoit le ballon (plus de clics = plus de passes)",
  "Palla: clic su un numero per cerchiarlo (ha la palla)": "Ballon : clique sur un numéro pour l'entourer (elle a le ballon)",
  "Tiro: clicca chi tira": "Tir : clique sur la tireuse",
  "Gomma: clic su una giocatrice per togliere le sue azioni in questo tempo": "Gomme : clique sur une joueuse pour retirer ses actions dans cette étape",
  "Trascina sul campo per disegnare una zona": "Fais glisser sur le terrain pour dessiner une zone",
  "Unisci giocatrici con una linea": "Relier des joueuses par une ligne",
  "Evidenzia una o più giocatrici": "Surligner une ou plusieurs joueuses",
  "Scritta sul campo o sopra una giocatrice": "Texte sur le terrain ou au-dessus d'une joueuse",
  "Distanza in metri": "Distance en mètres",
  "Aggiungi sul campo": "Ajouter sur le terrain",
  "Annulla (⌘Z)": "Annuler (⌘Z)",
  "n.": "n°",
  "Numero o sigla (es. 4, X2)": "Numéro ou sigle (ex. 4, X2)",
  "All'inizio di questo tempo la palla ce l'ha lei": "C'est elle qui a le ballon au début de cette étape",
  "Etichetta (es. Lato debole)": "Étiquette (ex. Côté faible)",
  "Testo": "Texte",
  "Nota (es. distanza fra le linee)": "Note (ex. espacement entre les lignes)",
  "Titolo (es. Pick and roll centrale)": "Titre (ex. Pick and roll central)",
  "Cosa guardare in questa fase": "Ce qu'il faut regarder dans cette étape",
  "Descrizione": "Description",
  "Note": "Notes",
  "Partenza": "Départ",
  "fase {a} → {b}": "étape {a} → {b}",
  "fase {n} di {tot}": "étape {n} sur {tot}",
  "Attenzione:": "Attention :",
  "✔ Fine tratto": "✔ Fin du tracé",
  "tempo {n}": "étape {n}",
  "Esc per Sposta": "Esc pour Déplacer",
  "<strong>Aggiungi:</strong> clicca sul campo per mettere {cosa}, anche più volte · Esc o Fine per smettere": "<strong>Ajouter :</strong> clique sur le terrain pour placer {cosa}, autant de fois que tu veux · Esc ou Terminé pour arrêter",
  "<strong>Linea:</strong> clicca le giocatrici da unire, nell'ordine · clic sulla prima per chiudere · Invio per finire": "<strong>Ligne :</strong> clique sur les joueuses à relier, dans l'ordre · clique sur la première pour fermer · Entrée pour terminer",
  "<strong>Evidenzia:</strong> clicca una o più giocatrici (di nuovo per toglierla) · Invio per finire": "<strong>Surligner :</strong> clique sur une ou plusieurs joueuses (à nouveau pour retirer) · Entrée pour terminer",
  "Ha un cartello prima": "A un carton avant",
  "Doppio clic per cambiare nome": "Double-clic pour renommer",
  "Nome della fase": "Nom de l'étape",
  "es. Blocco del 5 per l'1": "ex. Écran du 5 pour le 1",
  "elimina la fase": "supprimer l'étape",
  "Tempo {n}": "Étape {n}",
  "Primo passaggio": "Première passe",
  "Cartello prima della fase {n}": "Carton avant l'étape {n}",
  "Oggetto": "Objet",
  "Togli i passaggi intermedi ({n})": "Retirer les passes intermédiaires ({n})",
  "Cambiando campo il gioco riparte dalla posizione di partenza: le fasi disegnate finora si perdono.": "Changer de terrain fait repartir le système de la position de départ : les étapes dessinées jusqu'ici seront perdues.",
  "Cambia campo": "Changer de terrain",
  "■ Ferma": "■ Arrêter",
  "Questo browser non riesce a creare il video. Prova con Chrome o con Safari aggiornato.": "Cet ordinateur n'arrive pas à créer la vidéo. Essaie de mettre l'app à jour.",
  "Gioco": "Système",
  "Preparo il video… {p}%": "Je prépare la vidéo… {p}%",
  "video pronto: controlla i download": "vidéo prête : regarde dans tes téléchargements",
  "Il video non è riuscito: ": "La vidéo a échoué : ",
  "Chiudere senza salvare? Le modifiche a questo gioco si perdono.": "Fermer sans enregistrer ? Les modifications de ce système seront perdues.",
  "Chiudi senza salvare": "Fermer sans enregistrer",
  "Dai un nome al gioco prima di salvare.": "Donne un nom au système avant d'enregistrer.",
  "Salvo…": "Enregistrement…",
  "Non sono riuscito a salvare: ": "Impossible d'enregistrer : ",
  "▶ Anima": "▶ Animer",
  "motore VDM": "moteur VDM",
  "↺ Di nuovo": "↺ Encore",
  "Conferma": "Confirmer",
  "Servono almeno due fasi per fare un video.": "Il faut au moins deux étapes pour faire une vidéo.",
  "Questo computer non riesce a creare video H.264.": "Cet ordinateur n'arrive pas à créer de vidéo H.264.",
  "Questo computer non riesce a fare il video con il campo inclinato (WebGL non disponibile).": "Cet ordinateur n'arrive pas à faire la vidéo avec le terrain incliné (WebGL non disponible).",
  "Fase {n} di {tot}": "Étape {n} sur {tot}",
  "<strong>Taglio:</strong> clic sulla giocatrice, poi clic sul percorso (i punti in mezzo fanno la curva) · doppio clic per finire": "<strong>Coupe :</strong> clique sur la joueuse, puis clique le long du trajet (les points intermédiaires font la courbe) · double-clic pour terminer",
  "<strong>Palleggio:</strong> clic sul numero cerchiato, poi clic sul percorso · doppio clic per finire": "<strong>Dribble :</strong> clique sur le numéro entouré, puis clique le long du trajet · double-clic pour terminer",
  "<strong>Blocco:</strong> clic sulla giocatrice, poi dove va a bloccare · doppio clic per finire · doppio clic sul numero = blocco da ferma · dopo il blocco, Taglio sulla stessa giocatrice = si butta dentro o si apre": "<strong>Écran :</strong> clique sur la joueuse, puis là où elle pose l'écran · double-clic pour terminer · double-clic sur le numéro = écran sur place · après l'écran, Coupe sur la même joueuse = roll ou pop",
  "<strong>Gomma:</strong> clic su una giocatrice per togliere le sue azioni in questo tempo": "<strong>Gomme :</strong> clique sur une joueuse pour retirer ses actions dans cette étape",
  "<strong>Passaggio:</strong> clic sul numero cerchiato, poi clic su chi riceve": "<strong>Passe :</strong> clique sur le numéro entouré, puis sur celle qui reçoit",
  "<strong>Tiro:</strong> clicca chi tira": "<strong>Tir :</strong> clique sur la tireuse",
  "<strong>Palla:</strong> clic su un numero: lo cerchia, all'inizio del tempo la palla ce l'ha lei": "<strong>Ballon :</strong> clique sur un numéro pour l'entourer : elle a le ballon au début de l'étape",
  "chi ha la palla (numero cerchiato) non blocca: palleggia o passa": "la porteuse du ballon (numéro entouré) ne pose pas d'écran : elle dribble ou passe",
  "palleggia solo chi ha la palla (numero cerchiato): questo è diventato un taglio": "seule la porteuse du ballon (numéro entouré) dribble : c'est devenu une coupe",
  "passa solo chi ha la palla: parti dal numero cerchiato": "seule la porteuse du ballon passe : pars du numéro entouré",
  "palleggia solo chi ha la palla (numero cerchiato): questo è un taglio": "seule la porteuse du ballon (numéro entouré) dribble : ceci est une coupe",
  "nessuna ha la palla: clicca una giocatrice e «Dai la palla»": "personne n'a le ballon : clique sur une joueuse puis « Lui donner le ballon »",
  "prima disegna almeno un'azione in questo tempo": "dessine d'abord au moins une action dans cette étape",
  "parti da chi ha la palla: il numero cerchiato o la fine del suo palleggio": "pars de la porteuse du ballon : le numéro entouré ou la fin de son dribble",
  "parti da una giocatrice: clic sul suo numero": "pars d'une joueuse : clique sur son numéro",
  "Attaccante": "Attaquante",
  "Difensore": "Défenseuse",
  "Cono": "Plot",
  "Allenatore": "Entraîneur",
  "attaccata alla giocatrice": "attachée à la joueuse",
  "ferma sul campo": "fixe sur le terrain",
  "giallo": "jaune",
  "ciano": "cyan",
  "rosso": "rouge",
  "verde": "vert",
  "bianco": "blanc",
  "{n} fase": "{n} étape",
  "{n} fasi": "{n} étapes",
  "video pronto: è anche fra le clip (Video)": "vidéo prête : elle est aussi dans tes séquences (Vidéo)"
 },
 zh: { // cinese
  "<strong>Ricostruito dal disegno originale.</strong> Le posizioni vengono dallo schema disegnato a mano, i movimenti dalle frecce: controlla le fasi e sistema quello che non torna, poi salva. Il disegno originale resta: si puo' sempre tornare indietro dalla card.": "<strong>已根据你的战术板图重建。</strong>位置来自战术图，移动来自箭头：检查各个步骤，修正不对的地方，然后保存。原来的战术图不会改变。",
  "Come sul playbook: le giocatrici stanno dove partono e sopra disegni i simboli. Il <b>numero cerchiato</b> ha la palla: può palleggiare o passare. Le altre tagliano o bloccano. Dai simboli il motore ricava dove arrivano e lo anima, col ritmo del gioco: prima il blocco, poi chi lo usa, poi il passaggio. <b>Tempo dopo ▸</b> riparte da dove sono arrivate. <b>Sposta</b> sistema le posizioni di partenza. Spazio riproduce, ← → cambiano tempo, ⌘Z annulla, Esc torna a Sposta.": "和战术板一样：球员站在起始位置，你在上面画符号。<b>画圈的号码</b>持球：可以运球或传球。其他人空切或掩护。引擎根据符号算出每个人最后到达的位置，并按比赛的节奏做成动画：先掩护，再是利用掩护的球员，然后传球。<b>下一步 ▸</b>从大家到达的位置接着开始。<b>移动</b>用来调整起始位置。空格键播放，← → 切换步骤，⌘Z 撤销，Esc 回到移动。",
  "VDM": "VDM",
  "MOTORE": "引擎",
  "Chiudi": "关闭",
  "💾 Salva nel playbook": "💾 保存到战术板",
  "▶ Riproduci": "▶ 播放",
  "Tempo dopo ▸": "下一步 ▸",
  "🎥 Video": "🎥 视频",
  "Velocità": "速度",
  "Lenta": "慢",
  "Normale": "正常",
  "Veloce": "快",
  "ciclo": "循环",
  "Campo": "球场",
  "Metà campo": "半场",
  "Campo intero": "全场",
  "Vista": "视角",
  "Dall'alto": "俯视",
  "3D forte": "3D 大角度",
  "Ruota": "旋转",
  "difesa": "防守",
  "propaga": "延续到后续",
  "Sposta": "移动",
  "Taglio": "空切",
  "Palleggio": "运球",
  "Blocco": "掩护",
  "Passaggio": "传球",
  "Palla": "球",
  "Tiro": "投篮",
  "Gomma": "橡皮擦",
  "▭ Zona": "▭ 区域",
  "╱ Linea": "╱ 连线",
  "◎ Evidenzia": "◎ 高亮",
  "T Scritta": "T 文字",
  "↔ Misura": "↔ 测距",
  "+ Aggiungi…": "+ 添加…",
  "↶ Annulla": "↶ 撤销",
  "Fine": "完成",
  "Annulla": "取消",
  "Passaggio nella partenza?": "在起始位置传球？",
  "La fase 1 è la posizione di partenza: se questo è il primo passaggio, va in una fase nuova.": "第 1 步是起始位置：如果这是第一次传球，它应放在一个新步骤里。",
  "Fallo diventare un passaggio": "改为传球",
  "Va bene così": "保持不变",
  "Giocatrice": "球员",
  "◯ Dai la palla": "◯ 给球",
  "Azione in questa fase": "本步骤的动作",
  "automatica": "自动",
  "taglio": "空切",
  "palleggio": "运球",
  "blocco": "掩护",
  "Togli i passaggi intermedi": "去掉中间的传球",
  "↻ Ruota": "↻ 旋转",
  "Togli da questa fase in poi": "从本步骤起去掉",
  "Elimina da tutte le fasi": "从所有步骤中删除",
  "Zona": "区域",
  "Piena": "填充",
  "Rigata": "斜线",
  "Contorno": "轮廓",
  "Elimina": "删除",
  "Linea": "连线",
  "Continua": "实线",
  "Tratteggiata": "虚线",
  "forma chiusa": "闭合图形",
  "Evidenza": "高亮",
  "Anello": "圆环",
  "Luce": "光晕",
  "Quadrato": "方形",
  "Ellisse": "椭圆",
  "Scritta": "文字",
  "Fumetto": "气泡",
  "Grande": "大",
  "Semplice": "简洁",
  "Misura": "测距",
  "▣ Aggiungi un cartello prima di questa fase": "▣ 在本步骤前添加标题卡",
  "Cartello": "标题卡",
  "Anteprima": "预览",
  "Togli": "去掉",
  "OK": "确定",
  "Gioco animato": "动画战术",
  "Sezione del playbook": "战术板分组",
  "Squadra (opzionale)": "球队（可选）",
  "Il tempo dopo parte da dove sono arrivate": "下一步从大家到达的位置开始",
  "Gira il campo per guardarlo da un altro lato": "转动球场，从另一侧观看",
  "Gira a sinistra": "向左转",
  "Gira a destra": "向右转",
  "Torna di fronte": "回到正面",
  "Spostando una giocatrice, si sposta anche nelle fasi dopo dove non l'hai ancora mossa": "移动一名球员时，该球员在后续尚未移动过的步骤中也会一起移动",
  "Azioni": "动作",
  "Sposta giocatrici e palla (Esc)": "移动球员和球（Esc）",
  "Taglio: trascina la giocatrice dove taglia": "空切：把球员拖到空切的位置",
  "Palleggio: trascina chi ha la palla": "运球：拖动持球球员",
  "Blocco: trascina chi va a bloccare, oppure clicca chi blocca da ferma": "掩护：拖动去做掩护的球员，或点击原地掩护的球员",
  "Passaggio: clicca chi riceve la palla (più clic = più passaggi)": "传球：点击接球的球员（点多次 = 多次传球）",
  "Palla: clic su un numero per cerchiarlo (ha la palla)": "球：点击一个号码给它画圈（该球员持球）",
  "Tiro: clicca chi tira": "投篮：点击投篮的球员",
  "Gomma: clic su una giocatrice per togliere le sue azioni in questo tempo": "橡皮擦：点击一名球员，去掉该球员在本步骤的动作",
  "Trascina sul campo per disegnare una zona": "在球场上拖动来画一个区域",
  "Unisci giocatrici con una linea": "用连线连接球员",
  "Evidenzia una o più giocatrici": "高亮一名或多名球员",
  "Scritta sul campo o sopra una giocatrice": "在球场上或球员上方添加文字",
  "Distanza in metri": "距离（米）",
  "Aggiungi sul campo": "添加到球场",
  "Annulla (⌘Z)": "撤销（⌘Z）",
  "n.": "号",
  "Numero o sigla (es. 4, X2)": "号码或标记（如 4、X2）",
  "All'inizio di questo tempo la palla ce l'ha lei": "本步骤开始时由该球员持球",
  "Etichetta (es. Lato debole)": "标签（如 弱侧）",
  "Testo": "文字",
  "Nota (es. distanza fra le linee)": "备注（如 两条线之间的距离）",
  "Titolo (es. Pick and roll centrale)": "标题（如 中路挡拆）",
  "Cosa guardare in questa fase": "本步骤要看什么",
  "Descrizione": "描述",
  "Note": "备注",
  "Partenza": "起始",
  "fase {a} → {b}": "第 {a} → {b} 步",
  "fase {n} di {tot}": "第 {n} 步，共 {tot} 步",
  "Attenzione:": "注意：",
  "✔ Fine tratto": "✔ 结束线路",
  "tempo {n}": "第 {n} 步",
  "Esc per Sposta": "Esc 回到移动",
  "<strong>Aggiungi:</strong> clicca sul campo per mettere {cosa}, anche più volte · Esc o Fine per smettere": "<strong>添加：</strong>点击球场放置{cosa}，可以放多个 · 按 Esc 或“完成”停止",
  "<strong>Linea:</strong> clicca le giocatrici da unire, nell'ordine · clic sulla prima per chiudere · Invio per finire": "<strong>连线：</strong>按顺序点击要连接的球员 · 点击第一名球员可闭合 · 按回车键完成",
  "<strong>Evidenzia:</strong> clicca una o più giocatrici (di nuovo per toglierla) · Invio per finire": "<strong>高亮：</strong>点击一名或多名球员（再点一次取消） · 按回车键完成",
  "Ha un cartello prima": "前面有标题卡",
  "Doppio clic per cambiare nome": "双击重命名",
  "Nome della fase": "步骤名称",
  "es. Blocco del 5 per l'1": "如 5 号为 1 号做掩护",
  "elimina la fase": "删除此步骤",
  "Tempo {n}": "第 {n} 步",
  "Primo passaggio": "第一次传球",
  "Cartello prima della fase {n}": "第 {n} 步前的标题卡",
  "Oggetto": "对象",
  "Togli i passaggi intermedi ({n})": "去掉中间的传球（{n}）",
  "Cambiando campo il gioco riparte dalla posizione di partenza: le fasi disegnate finora si perdono.": "更换球场后，战术将从起始位置重新开始：目前画好的步骤会丢失。",
  "Cambia campo": "更换球场",
  "■ Ferma": "■ 停止",
  "Questo browser non riesce a creare il video. Prova con Chrome o con Safari aggiornato.": "这台电脑无法生成视频。请尝试更新应用。",
  "Gioco": "战术",
  "Preparo il video… {p}%": "正在生成视频… {p}%",
  "video pronto: controlla i download": "视频已生成：请查看下载文件夹",
  "Il video non è riuscito: ": "视频生成失败：",
  "Chiudere senza salvare? Le modifiche a questo gioco si perdono.": "不保存就关闭？对这个战术的修改将会丢失。",
  "Chiudi senza salvare": "不保存并关闭",
  "Dai un nome al gioco prima di salvare.": "保存前请先给战术命名。",
  "Salvo…": "正在保存…",
  "Non sono riuscito a salvare: ": "保存失败：",
  "▶ Anima": "▶ 动画",
  "motore VDM": "VDM 引擎",
  "↺ Di nuovo": "↺ 再来一次",
  "Conferma": "确认",
  "Servono almeno due fasi per fare un video.": "至少需要两个步骤才能生成视频。",
  "Questo computer non riesce a creare video H.264.": "这台电脑无法生成 H.264 视频。",
  "Questo computer non riesce a fare il video con il campo inclinato (WebGL non disponibile).": "这台电脑无法生成倾斜球场的视频（WebGL 不可用）。",
  "Fase {n} di {tot}": "第 {n} 步，共 {tot} 步",
  "<strong>Taglio:</strong> clic sulla giocatrice, poi clic sul percorso (i punti in mezzo fanno la curva) · doppio clic per finire": "<strong>空切：</strong>点击球员，再沿路线点击（中间的点形成弧线） · 双击完成",
  "<strong>Palleggio:</strong> clic sul numero cerchiato, poi clic sul percorso · doppio clic per finire": "<strong>运球：</strong>点击画圈的号码，再沿路线点击 · 双击完成",
  "<strong>Blocco:</strong> clic sulla giocatrice, poi dove va a bloccare · doppio clic per finire · doppio clic sul numero = blocco da ferma · dopo il blocco, Taglio sulla stessa giocatrice = si butta dentro o si apre": "<strong>掩护：</strong>点击球员，再点击掩护的位置 · 双击完成 · 双击号码 = 原地掩护 · 掩护之后，对同一球员使用“空切” = 顺下或外弹",
  "<strong>Gomma:</strong> clic su una giocatrice per togliere le sue azioni in questo tempo": "<strong>橡皮擦：</strong>点击一名球员，去掉该球员在本步骤的动作",
  "<strong>Passaggio:</strong> clic sul numero cerchiato, poi clic su chi riceve": "<strong>传球：</strong>点击画圈的号码，再点击接球的球员",
  "<strong>Tiro:</strong> clicca chi tira": "<strong>投篮：</strong>点击投篮的球员",
  "<strong>Palla:</strong> clic su un numero: lo cerchia, all'inizio del tempo la palla ce l'ha lei": "<strong>球：</strong>点击一个号码给它画圈：本步骤开始时由该球员持球",
  "chi ha la palla (numero cerchiato) non blocca: palleggia o passa": "持球球员（画圈的号码）不做掩护：应运球或传球",
  "palleggia solo chi ha la palla (numero cerchiato): questo è diventato un taglio": "只有持球球员（画圈的号码）才能运球：这里已改为空切",
  "passa solo chi ha la palla: parti dal numero cerchiato": "只有持球球员才能传球：从画圈的号码开始",
  "palleggia solo chi ha la palla (numero cerchiato): questo è un taglio": "只有持球球员（画圈的号码）才能运球：这是空切",
  "nessuna ha la palla: clicca una giocatrice e «Dai la palla»": "没有人持球：点击一名球员，再点「给球」",
  "prima disegna almeno un'azione in questo tempo": "请先在本步骤中至少画一个动作",
  "parti da chi ha la palla: il numero cerchiato o la fine del suo palleggio": "从持球球员开始：画圈的号码或其运球的终点",
  "parti da una giocatrice: clic sul suo numero": "从一名球员开始：点击其号码",
  "Attaccante": "进攻球员",
  "Difensore": "防守球员",
  "Cono": "锥筒",
  "Allenatore": "教练",
  "attaccata alla giocatrice": "附在球员身上",
  "ferma sul campo": "固定在球场上",
  "giallo": "黄色",
  "ciano": "青色",
  "rosso": "红色",
  "verde": "绿色",
  "bianco": "白色",
  "{n} fase": "{n} 步",
  "{n} fasi": "{n} 步",
  "video pronto: è anche fra le clip (Video)": "视频已生成：也已加入片段（视频）"
 },
 ru: { // russo
  "<strong>Ricostruito dal disegno originale.</strong> Le posizioni vengono dallo schema disegnato a mano, i movimenti dalle frecce: controlla le fasi e sistema quello che non torna, poi salva. Il disegno originale resta: si puo' sempre tornare indietro dalla card.": "<strong>Восстановлено по схеме из Плейбука.</strong> Позиции взяты со схемы, движения — со стрелок: проверь шаги, исправь то, что не так, и сохрани. Исходная схема не меняется.",
  "Come sul playbook: le giocatrici stanno dove partono e sopra disegni i simboli. Il <b>numero cerchiato</b> ha la palla: può palleggiare o passare. Le altre tagliano o bloccano. Dai simboli il motore ricava dove arrivano e lo anima, col ritmo del gioco: prima il blocco, poi chi lo usa, poi il passaggio. <b>Tempo dopo ▸</b> riparte da dove sono arrivate. <b>Sposta</b> sistema le posizioni di partenza. Spazio riproduce, ← → cambiano tempo, ⌘Z annulla, Esc torna a Sposta.": "Как в плейбуке: игроки стоят на стартовых позициях, а сверху ты рисуешь символы. У <b>обведённого номера</b> мяч: она может вести или передать. Остальные делают рывок или ставят заслон. По символам движок вычисляет, где все окажутся, и анимирует это в ритме розыгрыша: сначала заслон, потом та, кто им пользуется, потом передача. <b>Следующий шаг ▸</b> начинается оттуда, где они оказались. <b>Перемещение</b> поправляет стартовые позиции. Пробел — воспроизведение, ← → — смена шага, ⌘Z — отмена, Esc — возврат к Перемещению.",
  "VDM": "VDM",
  "MOTORE": "ДВИЖОК",
  "Chiudi": "Закрыть",
  "💾 Salva nel playbook": "💾 Сохранить в плейбук",
  "▶ Riproduci": "▶ Воспроизвести",
  "Tempo dopo ▸": "Следующий шаг ▸",
  "🎥 Video": "🎥 Видео",
  "Velocità": "Скорость",
  "Lenta": "Медленно",
  "Normale": "Обычно",
  "Veloce": "Быстро",
  "ciclo": "повтор",
  "Campo": "Площадка",
  "Metà campo": "Половина площадки",
  "Campo intero": "Вся площадка",
  "Vista": "Вид",
  "Dall'alto": "Сверху",
  "3D forte": "Сильный 3D",
  "Ruota": "Повернуть",
  "difesa": "защита",
  "propaga": "переносить",
  "Sposta": "Перемещение",
  "Taglio": "Рывок",
  "Palleggio": "Ведение",
  "Blocco": "Заслон",
  "Passaggio": "Передача",
  "Palla": "Мяч",
  "Tiro": "Бросок",
  "Gomma": "Ластик",
  "▭ Zona": "▭ Зона",
  "╱ Linea": "╱ Линия",
  "◎ Evidenzia": "◎ Выделить",
  "T Scritta": "T Надпись",
  "↔ Misura": "↔ Измерить",
  "+ Aggiungi…": "+ Добавить…",
  "↶ Annulla": "↶ Отменить",
  "Fine": "Готово",
  "Annulla": "Отмена",
  "Passaggio nella partenza?": "Передача на старте?",
  "La fase 1 è la posizione di partenza: se questo è il primo passaggio, va in una fase nuova.": "Шаг 1 — стартовая позиция: если это первая передача, она переходит в новый шаг.",
  "Fallo diventare un passaggio": "Сделать передачей",
  "Va bene così": "Оставить так",
  "Giocatrice": "Игрок",
  "◯ Dai la palla": "◯ Дать ей мяч",
  "Azione in questa fase": "Действие в этом шаге",
  "automatica": "автоматически",
  "taglio": "рывок",
  "palleggio": "ведение",
  "blocco": "заслон",
  "Togli i passaggi intermedi": "Убрать промежуточные передачи",
  "↻ Ruota": "↻ Повернуть",
  "Togli da questa fase in poi": "Убрать с этого шага и дальше",
  "Elimina da tutte le fasi": "Удалить из всех шагов",
  "Zona": "Зона",
  "Piena": "Заливка",
  "Rigata": "Штриховка",
  "Contorno": "Контур",
  "Elimina": "Удалить",
  "Linea": "Линия",
  "Continua": "Сплошная",
  "Tratteggiata": "Пунктир",
  "forma chiusa": "замкнутая фигура",
  "Evidenza": "Выделение",
  "Anello": "Кольцо",
  "Luce": "Свечение",
  "Quadrato": "Квадрат",
  "Ellisse": "Эллипс",
  "Scritta": "Надпись",
  "Fumetto": "Выноска",
  "Grande": "Крупная",
  "Semplice": "Простая",
  "Misura": "Измерение",
  "▣ Aggiungi un cartello prima di questa fase": "▣ Добавить заставку перед этим шагом",
  "Cartello": "Заставка",
  "Anteprima": "Просмотр",
  "Togli": "Убрать",
  "OK": "OK",
  "Gioco animato": "Анимированная комбинация",
  "Sezione del playbook": "Раздел плейбука",
  "Squadra (opzionale)": "Команда (необязательно)",
  "Il tempo dopo parte da dove sono arrivate": "Следующий шаг начинается оттуда, где они оказались",
  "Gira il campo per guardarlo da un altro lato": "Повернуть площадку, чтобы посмотреть с другой стороны",
  "Gira a sinistra": "Повернуть влево",
  "Gira a destra": "Повернуть вправо",
  "Torna di fronte": "Вернуть вид спереди",
  "Spostando una giocatrice, si sposta anche nelle fasi dopo dove non l'hai ancora mossa": "Если сдвинуть игрока, она сдвинется и в следующих шагах, где её ещё не перемещали",
  "Azioni": "Действия",
  "Sposta giocatrici e palla (Esc)": "Переместить игроков и мяч (Esc)",
  "Taglio: trascina la giocatrice dove taglia": "Рывок: перетащи игрока туда, куда она делает рывок",
  "Palleggio: trascina chi ha la palla": "Ведение: перетащи игрока с мячом",
  "Blocco: trascina chi va a bloccare, oppure clicca chi blocca da ferma": "Заслон: перетащи ту, кто ставит заслон, или нажми на игрока, который ставит заслон на месте",
  "Passaggio: clicca chi riceve la palla (più clic = più passaggi)": "Передача: нажми на ту, кто получает мяч (больше нажатий = больше передач)",
  "Palla: clic su un numero per cerchiarlo (ha la palla)": "Мяч: нажми на номер, чтобы обвести его (у неё мяч)",
  "Tiro: clicca chi tira": "Бросок: нажми на ту, кто бросает",
  "Gomma: clic su una giocatrice per togliere le sue azioni in questo tempo": "Ластик: нажми на игрока, чтобы убрать её действия в этом шаге",
  "Trascina sul campo per disegnare una zona": "Проведи по площадке, чтобы нарисовать зону",
  "Unisci giocatrici con una linea": "Соединить игроков линией",
  "Evidenzia una o più giocatrici": "Выделить одного или нескольких игроков",
  "Scritta sul campo o sopra una giocatrice": "Надпись на площадке или над игроком",
  "Distanza in metri": "Расстояние в метрах",
  "Aggiungi sul campo": "Добавить на площадку",
  "Annulla (⌘Z)": "Отменить (⌘Z)",
  "n.": "№",
  "Numero o sigla (es. 4, X2)": "Номер или обозначение (напр. 4, X2)",
  "All'inizio di questo tempo la palla ce l'ha lei": "В начале этого шага мяч у неё",
  "Etichetta (es. Lato debole)": "Подпись (напр. Слабая сторона)",
  "Testo": "Текст",
  "Nota (es. distanza fra le linee)": "Заметка (напр. расстояние между линиями)",
  "Titolo (es. Pick and roll centrale)": "Заголовок (напр. Заслон и выход в центре)",
  "Cosa guardare in questa fase": "На что смотреть в этом шаге",
  "Descrizione": "Описание",
  "Note": "Заметки",
  "Partenza": "Старт",
  "fase {a} → {b}": "шаг {a} → {b}",
  "fase {n} di {tot}": "шаг {n} из {tot}",
  "Attenzione:": "Внимание:",
  "✔ Fine tratto": "✔ Закончить линию",
  "tempo {n}": "шаг {n}",
  "Esc per Sposta": "Esc — Перемещение",
  "<strong>Aggiungi:</strong> clicca sul campo per mettere {cosa}, anche più volte · Esc o Fine per smettere": "<strong>Добавить:</strong> нажимай на площадку, чтобы поставить {cosa}, сколько угодно раз · Esc или Готово — закончить",
  "<strong>Linea:</strong> clicca le giocatrici da unire, nell'ordine · clic sulla prima per chiudere · Invio per finire": "<strong>Линия:</strong> нажимай на игроков по порядку · нажми на первого, чтобы замкнуть · Enter — закончить",
  "<strong>Evidenzia:</strong> clicca una o più giocatrici (di nuovo per toglierla) · Invio per finire": "<strong>Выделить:</strong> нажми на одного или нескольких игроков (повторно — снять) · Enter — закончить",
  "Ha un cartello prima": "Перед ним есть заставка",
  "Doppio clic per cambiare nome": "Двойной щелчок — переименовать",
  "Nome della fase": "Название шага",
  "es. Blocco del 5 per l'1": "напр. 5 ставит заслон для 1",
  "elimina la fase": "удалить шаг",
  "Tempo {n}": "Шаг {n}",
  "Primo passaggio": "Первая передача",
  "Cartello prima della fase {n}": "Заставка перед шагом {n}",
  "Oggetto": "Объект",
  "Togli i passaggi intermedi ({n})": "Убрать промежуточные передачи ({n})",
  "Cambiando campo il gioco riparte dalla posizione di partenza: le fasi disegnate finora si perdono.": "При смене площадки розыгрыш начнётся заново со стартовой позиции: нарисованные шаги будут потеряны.",
  "Cambia campo": "Сменить площадку",
  "■ Ferma": "■ Стоп",
  "Questo browser non riesce a creare il video. Prova con Chrome o con Safari aggiornato.": "Этот компьютер не может создать видео. Попробуй обновить приложение.",
  "Gioco": "Комбинация",
  "Preparo il video… {p}%": "Готовлю видео… {p}%",
  "video pronto: controlla i download": "видео готово: проверь папку «Загрузки»",
  "Il video non è riuscito: ": "Не удалось создать видео: ",
  "Chiudere senza salvare? Le modifiche a questo gioco si perdono.": "Закрыть без сохранения? Изменения в этой комбинации будут потеряны.",
  "Chiudi senza salvare": "Закрыть без сохранения",
  "Dai un nome al gioco prima di salvare.": "Дай название комбинации перед сохранением.",
  "Salvo…": "Сохраняю…",
  "Non sono riuscito a salvare: ": "Не удалось сохранить: ",
  "▶ Anima": "▶ Анимировать",
  "motore VDM": "движок VDM",
  "↺ Di nuovo": "↺ Ещё раз",
  "Conferma": "Подтвердить",
  "Servono almeno due fasi per fare un video.": "Для видео нужно хотя бы два шага.",
  "Questo computer non riesce a creare video H.264.": "Этот компьютер не может создавать видео H.264.",
  "Questo computer non riesce a fare il video con il campo inclinato (WebGL non disponibile).": "Этот компьютер не может сделать видео с наклонной площадкой (WebGL недоступен).",
  "Fase {n} di {tot}": "Шаг {n} из {tot}",
  "<strong>Taglio:</strong> clic sulla giocatrice, poi clic sul percorso (i punti in mezzo fanno la curva) · doppio clic per finire": "<strong>Рывок:</strong> нажми на игрока, затем нажимай вдоль пути (промежуточные точки задают изгиб) · двойной щелчок — закончить",
  "<strong>Palleggio:</strong> clic sul numero cerchiato, poi clic sul percorso · doppio clic per finire": "<strong>Ведение:</strong> нажми на обведённый номер, затем нажимай вдоль пути · двойной щелчок — закончить",
  "<strong>Blocco:</strong> clic sulla giocatrice, poi dove va a bloccare · doppio clic per finire · doppio clic sul numero = blocco da ferma · dopo il blocco, Taglio sulla stessa giocatrice = si butta dentro o si apre": "<strong>Заслон:</strong> нажми на игрока, затем туда, где она ставит заслон · двойной щелчок — закончить · двойной щелчок по номеру = заслон на месте · после заслона Рывок того же игрока = выход к кольцу (roll) или наружу (pop)",
  "<strong>Gomma:</strong> clic su una giocatrice per togliere le sue azioni in questo tempo": "<strong>Ластик:</strong> нажми на игрока, чтобы убрать её действия в этом шаге",
  "<strong>Passaggio:</strong> clic sul numero cerchiato, poi clic su chi riceve": "<strong>Передача:</strong> нажми на обведённый номер, затем на ту, кто получает",
  "<strong>Tiro:</strong> clicca chi tira": "<strong>Бросок:</strong> нажми на ту, кто бросает",
  "<strong>Palla:</strong> clic su un numero: lo cerchia, all'inizio del tempo la palla ce l'ha lei": "<strong>Мяч:</strong> нажми на номер, чтобы обвести его: в начале шага мяч у неё",
  "chi ha la palla (numero cerchiato) non blocca: palleggia o passa": "игрок с мячом (обведённый номер) не ставит заслон: она ведёт или передаёт",
  "palleggia solo chi ha la palla (numero cerchiato): questo è diventato un taglio": "вести мяч может только игрок с мячом (обведённый номер): это стало рывком",
  "passa solo chi ha la palla: parti dal numero cerchiato": "передавать может только игрок с мячом: начни с обведённого номера",
  "palleggia solo chi ha la palla (numero cerchiato): questo è un taglio": "вести мяч может только игрок с мячом (обведённый номер): это рывок",
  "nessuna ha la palla: clicca una giocatrice e «Dai la palla»": "мяча нет ни у кого: нажми на игрока и «Дать ей мяч»",
  "prima disegna almeno un'azione in questo tempo": "сначала нарисуй хотя бы одно действие в этом шаге",
  "parti da chi ha la palla: il numero cerchiato o la fine del suo palleggio": "начни с игрока с мячом: с обведённого номера или с конца её ведения",
  "parti da una giocatrice: clic sul suo numero": "начни с игрока: нажми на её номер",
  "Attaccante": "Игрок атаки",
  "Difensore": "Игрок защиты",
  "Cono": "Конус",
  "Allenatore": "Тренер",
  "attaccata alla giocatrice": "привязана к игроку",
  "ferma sul campo": "закреплена на площадке",
  "giallo": "жёлтый",
  "ciano": "голубой",
  "rosso": "красный",
  "verde": "зелёный",
  "bianco": "белый",
  "{n} fase": "Шагов: {n}",
  "{n} fasi": "Шагов: {n}",
  "video pronto: è anche fra le clip (Video)": "видео готово: оно также есть среди фрагментов (Видео)"
 },
 de: { // tedesco
  "<strong>Ricostruito dal disegno originale.</strong> Le posizioni vengono dallo schema disegnato a mano, i movimenti dalle frecce: controlla le fasi e sistema quello che non torna, poi salva. Il disegno originale resta: si puo' sempre tornare indietro dalla card.": "<strong>Aus deinem Playbook-Diagramm nachgebaut.</strong> Die Positionen kommen aus dem Diagramm, die Bewegungen aus den Pfeilen: prüf die Phasen, korrigier, was nicht stimmt, und speichere dann. Dein Originaldiagramm bleibt unverändert.",
  "Come sul playbook: le giocatrici stanno dove partono e sopra disegni i simboli. Il <b>numero cerchiato</b> ha la palla: può palleggiare o passare. Le altre tagliano o bloccano. Dai simboli il motore ricava dove arrivano e lo anima, col ritmo del gioco: prima il blocco, poi chi lo usa, poi il passaggio. <b>Tempo dopo ▸</b> riparte da dove sono arrivate. <b>Sposta</b> sistema le posizioni di partenza. Spazio riproduce, ← → cambiano tempo, ⌘Z annulla, Esc torna a Sposta.": "Wie im Playbook: Die Spielerinnen stehen auf ihren Startpositionen und du zeichnest die Symbole darauf. Die <b>eingekreiste Nummer</b> hat den Ball: sie kann dribbeln oder passen. Die anderen schneiden oder stellen Blocks. Aus den Symbolen berechnet der Motor, wo alle ankommen, und animiert es im Rhythmus des Spielzugs: erst der Block, dann die Spielerin, die ihn nutzt, dann der Pass. <b>Nächste Phase ▸</b> startet dort, wo sie angekommen sind. <b>Verschieben</b> passt die Startpositionen an. Leertaste spielt ab, ← → wechseln die Phase, ⌘Z macht rückgängig, Esc geht zurück zu Verschieben.",
  "VDM": "VDM",
  "MOTORE": "MOTOR",
  "Chiudi": "Schließen",
  "💾 Salva nel playbook": "💾 Im Playbook speichern",
  "▶ Riproduci": "▶ Abspielen",
  "Tempo dopo ▸": "Nächste Phase ▸",
  "🎥 Video": "🎥 Video",
  "Velocità": "Tempo",
  "Lenta": "Langsam",
  "Normale": "Normal",
  "Veloce": "Schnell",
  "ciclo": "Schleife",
  "Campo": "Feld",
  "Metà campo": "Halbfeld",
  "Campo intero": "Ganzes Feld",
  "Vista": "Ansicht",
  "Dall'alto": "Von oben",
  "3D forte": "3D steil",
  "Ruota": "Drehen",
  "difesa": "Verteidigung",
  "propaga": "übernehmen",
  "Sposta": "Verschieben",
  "Taglio": "Schnitt",
  "Palleggio": "Dribbling",
  "Blocco": "Block",
  "Passaggio": "Pass",
  "Palla": "Ball",
  "Tiro": "Wurf",
  "Gomma": "Radierer",
  "▭ Zona": "▭ Zone",
  "╱ Linea": "╱ Linie",
  "◎ Evidenzia": "◎ Hervorheben",
  "T Scritta": "T Text",
  "↔ Misura": "↔ Messen",
  "+ Aggiungi…": "+ Hinzufügen…",
  "↶ Annulla": "↶ Rückgängig",
  "Fine": "Fertig",
  "Annulla": "Abbrechen",
  "Passaggio nella partenza?": "Pass in der Startposition?",
  "La fase 1 è la posizione di partenza: se questo è il primo passaggio, va in una fase nuova.": "Phase 1 ist die Startposition: Wenn das der erste Pass ist, kommt er in eine neue Phase.",
  "Fallo diventare un passaggio": "Zum Pass machen",
  "Va bene così": "So lassen",
  "Giocatrice": "Spielerin",
  "◯ Dai la palla": "◯ Ball geben",
  "Azione in questa fase": "Aktion in dieser Phase",
  "automatica": "automatisch",
  "taglio": "Schnitt",
  "palleggio": "Dribbling",
  "blocco": "Block",
  "Togli i passaggi intermedi": "Zwischenpässe entfernen",
  "↻ Ruota": "↻ Drehen",
  "Togli da questa fase in poi": "Ab dieser Phase entfernen",
  "Elimina da tutte le fasi": "Aus allen Phasen löschen",
  "Zona": "Zone",
  "Piena": "Gefüllt",
  "Rigata": "Gestreift",
  "Contorno": "Umriss",
  "Elimina": "Löschen",
  "Linea": "Linie",
  "Continua": "Durchgezogen",
  "Tratteggiata": "Gestrichelt",
  "forma chiusa": "geschlossene Form",
  "Evidenza": "Hervorhebung",
  "Anello": "Ring",
  "Luce": "Leuchten",
  "Quadrato": "Quadrat",
  "Ellisse": "Ellipse",
  "Scritta": "Text",
  "Fumetto": "Sprechblase",
  "Grande": "Groß",
  "Semplice": "Einfach",
  "Misura": "Messen",
  "▣ Aggiungi un cartello prima di questa fase": "▣ Titeltafel vor dieser Phase einfügen",
  "Cartello": "Titeltafel",
  "Anteprima": "Vorschau",
  "Togli": "Entfernen",
  "OK": "OK",
  "Gioco animato": "Animierter Spielzug",
  "Sezione del playbook": "Playbook-Bereich",
  "Squadra (opzionale)": "Team (optional)",
  "Il tempo dopo parte da dove sono arrivate": "Die nächste Phase startet dort, wo sie angekommen sind",
  "Gira il campo per guardarlo da un altro lato": "Dreh das Feld, um es von einer anderen Seite zu sehen",
  "Gira a sinistra": "Nach links drehen",
  "Gira a destra": "Nach rechts drehen",
  "Torna di fronte": "Zurück zur Frontansicht",
  "Spostando una giocatrice, si sposta anche nelle fasi dopo dove non l'hai ancora mossa": "Verschiebst du eine Spielerin, wird sie auch in den späteren Phasen verschoben, in denen du sie noch nicht bewegt hast",
  "Azioni": "Aktionen",
  "Sposta giocatrici e palla (Esc)": "Spielerinnen und Ball verschieben (Esc)",
  "Taglio: trascina la giocatrice dove taglia": "Schnitt: zieh die Spielerin dorthin, wo sie schneidet",
  "Palleggio: trascina chi ha la palla": "Dribbling: zieh die Ballführende",
  "Blocco: trascina chi va a bloccare, oppure clicca chi blocca da ferma": "Block: zieh die Blockstellerin, oder klick eine Spielerin an, die im Stand blockt",
  "Passaggio: clicca chi riceve la palla (più clic = più passaggi)": "Pass: klick an, wer den Ball bekommt (mehr Klicks = mehr Pässe)",
  "Palla: clic su un numero per cerchiarlo (ha la palla)": "Ball: klick auf eine Nummer, um sie einzukreisen (sie hat den Ball)",
  "Tiro: clicca chi tira": "Wurf: klick die Werferin an",
  "Gomma: clic su una giocatrice per togliere le sue azioni in questo tempo": "Radierer: klick auf eine Spielerin, um ihre Aktionen in dieser Phase zu entfernen",
  "Trascina sul campo per disegnare una zona": "Zieh auf dem Feld, um eine Zone zu zeichnen",
  "Unisci giocatrici con una linea": "Spielerinnen mit einer Linie verbinden",
  "Evidenzia una o più giocatrici": "Eine oder mehrere Spielerinnen hervorheben",
  "Scritta sul campo o sopra una giocatrice": "Text auf dem Feld oder über einer Spielerin",
  "Distanza in metri": "Abstand in Metern",
  "Aggiungi sul campo": "Aufs Feld setzen",
  "Annulla (⌘Z)": "Rückgängig (⌘Z)",
  "n.": "Nr.",
  "Numero o sigla (es. 4, X2)": "Nummer oder Kürzel (z. B. 4, X2)",
  "All'inizio di questo tempo la palla ce l'ha lei": "Sie hat den Ball zu Beginn dieser Phase",
  "Etichetta (es. Lato debole)": "Beschriftung (z. B. Schwache Seite)",
  "Testo": "Text",
  "Nota (es. distanza fra le linee)": "Notiz (z. B. Abstand zwischen den Linien)",
  "Titolo (es. Pick and roll centrale)": "Titel (z. B. Pick and Roll Mitte)",
  "Cosa guardare in questa fase": "Worauf in dieser Phase zu achten ist",
  "Descrizione": "Beschreibung",
  "Note": "Notizen",
  "Partenza": "Start",
  "fase {a} → {b}": "Phase {a} → {b}",
  "fase {n} di {tot}": "Phase {n} von {tot}",
  "Attenzione:": "Achtung:",
  "✔ Fine tratto": "✔ Linie beenden",
  "tempo {n}": "Phase {n}",
  "Esc per Sposta": "Esc für Verschieben",
  "<strong>Aggiungi:</strong> clicca sul campo per mettere {cosa}, anche più volte · Esc o Fine per smettere": "<strong>Hinzufügen:</strong> klick aufs Feld, um {cosa} zu platzieren, so oft du willst · Esc oder Fertig zum Beenden",
  "<strong>Linea:</strong> clicca le giocatrici da unire, nell'ordine · clic sulla prima per chiudere · Invio per finire": "<strong>Linie:</strong> klick die zu verbindenden Spielerinnen der Reihe nach an · klick auf die erste zum Schließen · Enter zum Beenden",
  "<strong>Evidenzia:</strong> clicca una o più giocatrici (di nuovo per toglierla) · Invio per finire": "<strong>Hervorheben:</strong> klick eine oder mehrere Spielerinnen an (nochmal zum Entfernen) · Enter zum Beenden",
  "Ha un cartello prima": "Hat davor eine Titeltafel",
  "Doppio clic per cambiare nome": "Doppelklick zum Umbenennen",
  "Nome della fase": "Name der Phase",
  "es. Blocco del 5 per l'1": "z. B. Block der 5 für die 1",
  "elimina la fase": "Phase löschen",
  "Tempo {n}": "Phase {n}",
  "Primo passaggio": "Erster Pass",
  "Cartello prima della fase {n}": "Titeltafel vor Phase {n}",
  "Oggetto": "Objekt",
  "Togli i passaggi intermedi ({n})": "Zwischenpässe entfernen ({n})",
  "Cambiando campo il gioco riparte dalla posizione di partenza: le fasi disegnate finora si perdono.": "Beim Feldwechsel startet der Spielzug wieder bei der Startposition: die bisher gezeichneten Phasen gehen verloren.",
  "Cambia campo": "Feld wechseln",
  "■ Ferma": "■ Stopp",
  "Questo browser non riesce a creare il video. Prova con Chrome o con Safari aggiornato.": "Dieser Computer kann das Video nicht erstellen. Versuch, die App zu aktualisieren.",
  "Gioco": "Spielzug",
  "Preparo il video… {p}%": "Video wird erstellt… {p}%",
  "video pronto: controlla i download": "Video fertig: schau in deine Downloads",
  "Il video non è riuscito: ": "Das Video ist fehlgeschlagen: ",
  "Chiudere senza salvare? Le modifiche a questo gioco si perdono.": "Ohne Speichern schließen? Die Änderungen an diesem Spielzug gehen verloren.",
  "Chiudi senza salvare": "Ohne Speichern schließen",
  "Dai un nome al gioco prima di salvare.": "Gib dem Spielzug vor dem Speichern einen Namen.",
  "Salvo…": "Speichern…",
  "Non sono riuscito a salvare: ": "Speichern fehlgeschlagen: ",
  "▶ Anima": "▶ Animieren",
  "motore VDM": "VDM-Motor",
  "↺ Di nuovo": "↺ Nochmal",
  "Conferma": "Bestätigen",
  "Servono almeno due fasi per fare un video.": "Für ein Video brauchst du mindestens zwei Phasen.",
  "Questo computer non riesce a creare video H.264.": "Dieser Computer kann kein H.264-Video erstellen.",
  "Questo computer non riesce a fare il video con il campo inclinato (WebGL non disponibile).": "Dieser Computer kann das Video mit geneigtem Feld nicht erstellen (WebGL nicht verfügbar).",
  "Fase {n} di {tot}": "Phase {n} von {tot}",
  "<strong>Taglio:</strong> clic sulla giocatrice, poi clic sul percorso (i punti in mezzo fanno la curva) · doppio clic per finire": "<strong>Schnitt:</strong> klick die Spielerin an, dann entlang des Wegs (Punkte dazwischen ergeben die Kurve) · Doppelklick zum Beenden",
  "<strong>Palleggio:</strong> clic sul numero cerchiato, poi clic sul percorso · doppio clic per finire": "<strong>Dribbling:</strong> klick die eingekreiste Nummer an, dann entlang des Wegs · Doppelklick zum Beenden",
  "<strong>Blocco:</strong> clic sulla giocatrice, poi dove va a bloccare · doppio clic per finire · doppio clic sul numero = blocco da ferma · dopo il blocco, Taglio sulla stessa giocatrice = si butta dentro o si apre": "<strong>Block:</strong> klick die Spielerin an, dann dorthin, wo sie den Block stellt · Doppelklick zum Beenden · Doppelklick auf die Nummer = Block im Stand · nach dem Block, Schnitt mit derselben Spielerin = Roll oder Pop",
  "<strong>Gomma:</strong> clic su una giocatrice per togliere le sue azioni in questo tempo": "<strong>Radierer:</strong> klick auf eine Spielerin, um ihre Aktionen in dieser Phase zu entfernen",
  "<strong>Passaggio:</strong> clic sul numero cerchiato, poi clic su chi riceve": "<strong>Pass:</strong> klick die eingekreiste Nummer an, dann die Empfängerin",
  "<strong>Tiro:</strong> clicca chi tira": "<strong>Wurf:</strong> klick die Werferin an",
  "<strong>Palla:</strong> clic su un numero: lo cerchia, all'inizio del tempo la palla ce l'ha lei": "<strong>Ball:</strong> klick auf eine Nummer, um sie einzukreisen: sie hat den Ball zu Beginn der Phase",
  "chi ha la palla (numero cerchiato) non blocca: palleggia o passa": "die Ballführende (eingekreiste Nummer) stellt keinen Block: sie dribbelt oder passt",
  "palleggia solo chi ha la palla (numero cerchiato): questo è diventato un taglio": "nur die Ballführende (eingekreiste Nummer) dribbelt: das ist jetzt ein Schnitt",
  "passa solo chi ha la palla: parti dal numero cerchiato": "nur die Ballführende passt: starte bei der eingekreisten Nummer",
  "palleggia solo chi ha la palla (numero cerchiato): questo è un taglio": "nur die Ballführende (eingekreiste Nummer) dribbelt: das ist ein Schnitt",
  "nessuna ha la palla: clicca una giocatrice e «Dai la palla»": "niemand hat den Ball: klick eine Spielerin an und dann «Ball geben»",
  "prima disegna almeno un'azione in questo tempo": "zeichne zuerst mindestens eine Aktion in dieser Phase",
  "parti da chi ha la palla: il numero cerchiato o la fine del suo palleggio": "starte bei der Ballführenden: der eingekreisten Nummer oder dem Ende ihres Dribblings",
  "parti da una giocatrice: clic sul suo numero": "starte bei einer Spielerin: klick auf ihre Nummer",
  "Attaccante": "Angreiferin",
  "Difensore": "Verteidigerin",
  "Cono": "Hütchen",
  "Allenatore": "Trainer",
  "attaccata alla giocatrice": "an der Spielerin befestigt",
  "ferma sul campo": "fest auf dem Feld",
  "giallo": "gelb",
  "ciano": "cyan",
  "rosso": "rot",
  "verde": "grün",
  "bianco": "weiß",
  "{n} fase": "{n} Phase",
  "{n} fasi": "{n} Phasen",
  "video pronto: è anche fra le clip (Video)": "Video fertig: es ist auch bei deinen Clips (Video)"
 },
 lt: { // lituano
  "<strong>Ricostruito dal disegno originale.</strong> Le posizioni vengono dallo schema disegnato a mano, i movimenti dalle frecce: controlla le fasi e sistema quello che non torna, poi salva. Il disegno originale resta: si puo' sempre tornare indietro dalla card.": "<strong>Atkurta iš jūsų žaidimų knygos schemos.</strong> Pozicijos paimtos iš schemos, judėjimai – iš rodyklių: patikrinkite žingsnius, pataisykite, kas atrodo netaip, ir išsaugokite. Jūsų originali schema nepakeičiama.",
  "Come sul playbook: le giocatrici stanno dove partono e sopra disegni i simboli. Il <b>numero cerchiato</b> ha la palla: può palleggiare o passare. Le altre tagliano o bloccano. Dai simboli il motore ricava dove arrivano e lo anima, col ritmo del gioco: prima il blocco, poi chi lo usa, poi il passaggio. <b>Tempo dopo ▸</b> riparte da dove sono arrivate. <b>Sposta</b> sistema le posizioni di partenza. Spazio riproduce, ← → cambiano tempo, ⌘Z annulla, Esc torna a Sposta.": "Kaip žaidimų knygoje: žaidėjos stovi ten, kur pradeda, o ant viršaus piešiate simbolius. <b>Apibrauktas numeris</b> turi kamuolį: ji gali vesti arba perduoti. Kitos kerta arba užstoja. Pagal simbolius variklis apskaičiuoja, kur visos atsiduria, ir tai animuoja derinio ritmu: pirma užstojimas, tada juo besinaudojanti žaidėja, tada perdavimas. <b>Kitas žingsnis ▸</b> prasideda ten, kur jos atsidūrė. <b>Perkelti</b> koreguoja pradines pozicijas. Tarpas – paleisti, ← → – keisti žingsnį, ⌘Z – anuliuoti, Esc – grįžti į Perkelti.",
  "VDM": "VDM",
  "MOTORE": "VARIKLIS",
  "Chiudi": "Uždaryti",
  "💾 Salva nel playbook": "💾 Išsaugoti žaidimų knygoje",
  "▶ Riproduci": "▶ Paleisti",
  "Tempo dopo ▸": "Kitas žingsnis ▸",
  "🎥 Video": "🎥 Vaizdo įrašas",
  "Velocità": "Greitis",
  "Lenta": "Lėtai",
  "Normale": "Įprastai",
  "Veloce": "Greitai",
  "ciclo": "kartoti",
  "Campo": "Aikštė",
  "Metà campo": "Pusė aikštės",
  "Campo intero": "Visa aikštė",
  "Vista": "Vaizdas",
  "Dall'alto": "Iš viršaus",
  "3D forte": "3D status",
  "Ruota": "Pasukti",
  "difesa": "gynyba",
  "propaga": "perkelti toliau",
  "Sposta": "Perkelti",
  "Taglio": "Kirtimas",
  "Palleggio": "Vedimas",
  "Blocco": "Užstojimas",
  "Passaggio": "Perdavimas",
  "Palla": "Kamuolys",
  "Tiro": "Metimas",
  "Gomma": "Trintukas",
  "▭ Zona": "▭ Zona",
  "╱ Linea": "╱ Linija",
  "◎ Evidenzia": "◎ Paryškinti",
  "T Scritta": "T Tekstas",
  "↔ Misura": "↔ Matuoti",
  "+ Aggiungi…": "+ Pridėti…",
  "↶ Annulla": "↶ Anuliuoti",
  "Fine": "Baigti",
  "Annulla": "Atšaukti",
  "Passaggio nella partenza?": "Perdavimas pradinėje pozicijoje?",
  "La fase 1 è la posizione di partenza: se questo è il primo passaggio, va in una fase nuova.": "1 žingsnis yra pradinė pozicija: jei tai pirmas perdavimas, jis perkeliamas į naują žingsnį.",
  "Fallo diventare un passaggio": "Paversti perdavimu",
  "Va bene così": "Palikti kaip yra",
  "Giocatrice": "Žaidėja",
  "◯ Dai la palla": "◯ Duoti jai kamuolį",
  "Azione in questa fase": "Veiksmas šiame žingsnyje",
  "automatica": "automatinis",
  "taglio": "kirtimas",
  "palleggio": "vedimas",
  "blocco": "užstojimas",
  "Togli i passaggi intermedi": "Pašalinti tarpinius perdavimus",
  "↻ Ruota": "↻ Pasukti",
  "Togli da questa fase in poi": "Pašalinti nuo šio žingsnio",
  "Elimina da tutte le fasi": "Ištrinti iš visų žingsnių",
  "Zona": "Zona",
  "Piena": "Užpildyta",
  "Rigata": "Brūkšniuota",
  "Contorno": "Kontūras",
  "Elimina": "Ištrinti",
  "Linea": "Linija",
  "Continua": "Ištisinė",
  "Tratteggiata": "Punktyrinė",
  "forma chiusa": "uždara figūra",
  "Evidenza": "Paryškinimas",
  "Anello": "Žiedas",
  "Luce": "Švytėjimas",
  "Quadrato": "Kvadratas",
  "Ellisse": "Elipsė",
  "Scritta": "Tekstas",
  "Fumetto": "Debesėlis",
  "Grande": "Didelis",
  "Semplice": "Paprastas",
  "Misura": "Matas",
  "▣ Aggiungi un cartello prima di questa fase": "▣ Pridėti titulinę kortelę prieš šį žingsnį",
  "Cartello": "Titulinė kortelė",
  "Anteprima": "Peržiūra",
  "Togli": "Pašalinti",
  "OK": "Gerai",
  "Gioco animato": "Animuotas derinys",
  "Sezione del playbook": "Žaidimų knygos skyrius",
  "Squadra (opzionale)": "Komanda (neprivaloma)",
  "Il tempo dopo parte da dove sono arrivate": "Kitas žingsnis prasideda ten, kur jos atsidūrė",
  "Gira il campo per guardarlo da un altro lato": "Pasukite aikštę, kad pažiūrėtumėte iš kitos pusės",
  "Gira a sinistra": "Pasukti į kairę",
  "Gira a destra": "Pasukti į dešinę",
  "Torna di fronte": "Grįžti į priekinį vaizdą",
  "Spostando una giocatrice, si sposta anche nelle fasi dopo dove non l'hai ancora mossa": "Perkėlus žaidėją, ji perkeliama ir vėlesniuose žingsniuose, kuriuose jos dar nejudinote",
  "Azioni": "Veiksmai",
  "Sposta giocatrici e palla (Esc)": "Perkelti žaidėjas ir kamuolį (Esc)",
  "Taglio: trascina la giocatrice dove taglia": "Kirtimas: vilkite žaidėją ten, kur ji kerta",
  "Palleggio: trascina chi ha la palla": "Vedimas: vilkite kamuolį turinčią žaidėją",
  "Blocco: trascina chi va a bloccare, oppure clicca chi blocca da ferma": "Užstojimas: vilkite užstojančią žaidėją arba spustelėkite žaidėją, kuri užstoja stovėdama vietoje",
  "Passaggio: clicca chi riceve la palla (più clic = più passaggi)": "Perdavimas: spustelėkite, kas gauna kamuolį (daugiau spustelėjimų = daugiau perdavimų)",
  "Palla: clic su un numero per cerchiarlo (ha la palla)": "Kamuolys: spustelėkite numerį, kad jį apibrauktumėte (ji turi kamuolį)",
  "Tiro: clicca chi tira": "Metimas: spustelėkite metančią žaidėją",
  "Gomma: clic su una giocatrice per togliere le sue azioni in questo tempo": "Trintukas: spustelėkite žaidėją, kad pašalintumėte jos veiksmus šiame žingsnyje",
  "Trascina sul campo per disegnare una zona": "Vilkite aikštėje, kad nupieštumėte zoną",
  "Unisci giocatrici con una linea": "Sujungti žaidėjas linija",
  "Evidenzia una o più giocatrici": "Paryškinti vieną ar kelias žaidėjas",
  "Scritta sul campo o sopra una giocatrice": "Tekstas aikštėje arba virš žaidėjos",
  "Distanza in metri": "Atstumas metrais",
  "Aggiungi sul campo": "Pridėti į aikštę",
  "Annulla (⌘Z)": "Anuliuoti (⌘Z)",
  "n.": "nr.",
  "Numero o sigla (es. 4, X2)": "Numeris arba žymė (pvz. 4, X2)",
  "All'inizio di questo tempo la palla ce l'ha lei": "Šio žingsnio pradžioje kamuolį turi ji",
  "Etichetta (es. Lato debole)": "Žymė (pvz. Silpnoji pusė)",
  "Testo": "Tekstas",
  "Nota (es. distanza fra le linee)": "Pastaba (pvz. atstumas tarp linijų)",
  "Titolo (es. Pick and roll centrale)": "Pavadinimas (pvz. Centrinis pick and roll)",
  "Cosa guardare in questa fase": "Į ką žiūrėti šiame žingsnyje",
  "Descrizione": "Aprašymas",
  "Note": "Pastabos",
  "Partenza": "Pradžia",
  "fase {a} → {b}": "žingsnis {a} → {b}",
  "fase {n} di {tot}": "žingsnis {n} iš {tot}",
  "Attenzione:": "Dėmesio:",
  "✔ Fine tratto": "✔ Baigti liniją",
  "tempo {n}": "žingsnis {n}",
  "Esc per Sposta": "Esc – Perkelti",
  "<strong>Aggiungi:</strong> clicca sul campo per mettere {cosa}, anche più volte · Esc o Fine per smettere": "<strong>Pridėti:</strong> spustelėkite aikštėje, kad padėtumėte {cosa}, kiek norite kartų · Esc arba Baigti, kad sustotumėte",
  "<strong>Linea:</strong> clicca le giocatrici da unire, nell'ordine · clic sulla prima per chiudere · Invio per finire": "<strong>Linija:</strong> spustelėkite jungiamas žaidėjas eilės tvarka · spustelėkite pirmąją, kad uždarytumėte · Enter, kad baigtumėte",
  "<strong>Evidenzia:</strong> clicca una o più giocatrici (di nuovo per toglierla) · Invio per finire": "<strong>Paryškinti:</strong> spustelėkite vieną ar kelias žaidėjas (dar kartą – pašalinti) · Enter, kad baigtumėte",
  "Ha un cartello prima": "Prieš jį yra titulinė kortelė",
  "Doppio clic per cambiare nome": "Dukart spustelėkite, kad pervadintumėte",
  "Nome della fase": "Žingsnio pavadinimas",
  "es. Blocco del 5 per l'1": "pvz. 5 užstoja 1",
  "elimina la fase": "ištrinti žingsnį",
  "Tempo {n}": "Žingsnis {n}",
  "Primo passaggio": "Pirmas perdavimas",
  "Cartello prima della fase {n}": "Titulinė kortelė prieš {n} žingsnį",
  "Oggetto": "Objektas",
  "Togli i passaggi intermedi ({n})": "Pašalinti tarpinius perdavimus ({n})",
  "Cambiando campo il gioco riparte dalla posizione di partenza: le fasi disegnate finora si perdono.": "Pakeitus aikštę, derinys pradedamas iš pradinės pozicijos: iki šiol nupiešti žingsniai bus prarasti.",
  "Cambia campo": "Keisti aikštę",
  "■ Ferma": "■ Sustabdyti",
  "Questo browser non riesce a creare il video. Prova con Chrome o con Safari aggiornato.": "Šis kompiuteris negali sukurti vaizdo įrašo. Pabandykite atnaujinti programą.",
  "Gioco": "Derinys",
  "Preparo il video… {p}%": "Kuriamas vaizdo įrašas… {p}%",
  "video pronto: controlla i download": "vaizdo įrašas paruoštas: patikrinkite atsisiuntimus",
  "Il video non è riuscito: ": "Vaizdo įrašo sukurti nepavyko: ",
  "Chiudere senza salvare? Le modifiche a questo gioco si perdono.": "Uždaryti neišsaugojus? Šio derinio pakeitimai bus prarasti.",
  "Chiudi senza salvare": "Uždaryti neišsaugojus",
  "Dai un nome al gioco prima di salvare.": "Prieš išsaugodami suteikite deriniui pavadinimą.",
  "Salvo…": "Išsaugoma…",
  "Non sono riuscito a salvare: ": "Nepavyko išsaugoti: ",
  "▶ Anima": "▶ Animuoti",
  "motore VDM": "VDM variklis",
  "↺ Di nuovo": "↺ Dar kartą",
  "Conferma": "Patvirtinti",
  "Servono almeno due fasi per fare un video.": "Vaizdo įrašui reikia bent dviejų žingsnių.",
  "Questo computer non riesce a creare video H.264.": "Šis kompiuteris negali sukurti H.264 vaizdo įrašo.",
  "Questo computer non riesce a fare il video con il campo inclinato (WebGL non disponibile).": "Šis kompiuteris negali sukurti vaizdo įrašo su pasvirusia aikšte (WebGL nepasiekiamas).",
  "Fase {n} di {tot}": "Žingsnis {n} iš {tot}",
  "<strong>Taglio:</strong> clic sulla giocatrice, poi clic sul percorso (i punti in mezzo fanno la curva) · doppio clic per finire": "<strong>Kirtimas:</strong> spustelėkite žaidėją, tada spustelėkite kelyje (tarpiniai taškai sudaro kreivę) · dukart spustelėkite, kad baigtumėte",
  "<strong>Palleggio:</strong> clic sul numero cerchiato, poi clic sul percorso · doppio clic per finire": "<strong>Vedimas:</strong> spustelėkite apibrauktą numerį, tada spustelėkite kelyje · dukart spustelėkite, kad baigtumėte",
  "<strong>Blocco:</strong> clic sulla giocatrice, poi dove va a bloccare · doppio clic per finire · doppio clic sul numero = blocco da ferma · dopo il blocco, Taglio sulla stessa giocatrice = si butta dentro o si apre": "<strong>Užstojimas:</strong> spustelėkite žaidėją, tada vietą, kur ji užstoja · dukart spustelėkite, kad baigtumėte · dukart spustelėkite numerį = užstojimas stovint vietoje · po užstojimo Kirtimas su ta pačia žaidėja = roll arba pop",
  "<strong>Gomma:</strong> clic su una giocatrice per togliere le sue azioni in questo tempo": "<strong>Trintukas:</strong> spustelėkite žaidėją, kad pašalintumėte jos veiksmus šiame žingsnyje",
  "<strong>Passaggio:</strong> clic sul numero cerchiato, poi clic su chi riceve": "<strong>Perdavimas:</strong> spustelėkite apibrauktą numerį, tada spustelėkite gavėją",
  "<strong>Tiro:</strong> clicca chi tira": "<strong>Metimas:</strong> spustelėkite metančią žaidėją",
  "<strong>Palla:</strong> clic su un numero: lo cerchia, all'inizio del tempo la palla ce l'ha lei": "<strong>Kamuolys:</strong> spustelėkite numerį, kad jį apibrauktumėte: žingsnio pradžioje kamuolį turi ji",
  "chi ha la palla (numero cerchiato) non blocca: palleggia o passa": "kamuolį turinti žaidėja (apibrauktas numeris) neužstoja: ji veda arba perduoda",
  "palleggia solo chi ha la palla (numero cerchiato): questo è diventato un taglio": "veda tik kamuolį turinti žaidėja (apibrauktas numeris): tai tapo kirtimu",
  "passa solo chi ha la palla: parti dal numero cerchiato": "perduoda tik kamuolį turinti žaidėja: pradėkite nuo apibraukto numerio",
  "palleggia solo chi ha la palla (numero cerchiato): questo è un taglio": "veda tik kamuolį turinti žaidėja (apibrauktas numeris): tai yra kirtimas",
  "nessuna ha la palla: clicca una giocatrice e «Dai la palla»": "niekas neturi kamuolio: spustelėkite žaidėją ir «Duoti jai kamuolį»",
  "prima disegna almeno un'azione in questo tempo": "pirmiausia nupieškite bent vieną veiksmą šiame žingsnyje",
  "parti da chi ha la palla: il numero cerchiato o la fine del suo palleggio": "pradėkite nuo kamuolį turinčios žaidėjos: apibraukto numerio arba jos vedimo pabaigos",
  "parti da una giocatrice: clic sul suo numero": "pradėkite nuo žaidėjos: spustelėkite jos numerį",
  "Attaccante": "Puolėja",
  "Difensore": "Gynėja",
  "Cono": "Kūgis",
  "Allenatore": "Treneris",
  "attaccata alla giocatrice": "pritvirtinta prie žaidėjos",
  "ferma sul campo": "nejudanti aikštėje",
  "giallo": "geltona",
  "ciano": "žydra",
  "rosso": "raudona",
  "verde": "žalia",
  "bianco": "balta",
  "{n} fase": "Žingsniai: {n}",
  "{n} fasi": "Žingsniai: {n}",
  "video pronto: è anche fra le clip (Video)": "vaizdo įrašas paruoštas: jis taip pat yra tarp jūsų klipų (Vaizdo įrašas)"
 },
 pl: { // polacco
  "<strong>Ricostruito dal disegno originale.</strong> Le posizioni vengono dallo schema disegnato a mano, i movimenti dalle frecce: controlla le fasi e sistema quello che non torna, poi salva. Il disegno originale resta: si puo' sempre tornare indietro dalla card.": "<strong>Odtworzono z Twojego schematu.</strong> Pozycje pochodzą ze schematu, ruchy ze strzałek: sprawdź kroki, popraw to, co się nie zgadza, i zapisz. Oryginalny schemat się nie zmienia.",
  "Come sul playbook: le giocatrici stanno dove partono e sopra disegni i simboli. Il <b>numero cerchiato</b> ha la palla: può palleggiare o passare. Le altre tagliano o bloccano. Dai simboli il motore ricava dove arrivano e lo anima, col ritmo del gioco: prima il blocco, poi chi lo usa, poi il passaggio. <b>Tempo dopo ▸</b> riparte da dove sono arrivate. <b>Sposta</b> sistema le posizioni di partenza. Spazio riproduce, ← → cambiano tempo, ⌘Z annulla, Esc torna a Sposta.": "Tak jak w schematach gry: zawodniczki stoją na pozycjach startowych, a na nich rysujesz symbole. <b>Numer w kółku</b> ma piłkę: może kozłować albo podać. Pozostałe ścinają albo stawiają zasłony. Z symboli silnik wylicza, gdzie wszystkie się znajdą, i animuje to w rytmie akcji: najpierw zasłona, potem zawodniczka, która z niej korzysta, potem podanie. <b>Następny krok ▸</b> zaczyna się tam, gdzie skończyły. <b>Przesuń</b> poprawia pozycje startowe. Spacja odtwarza, ← → zmieniają krok, ⌘Z cofa, Esc wraca do Przesuń.",
  "VDM": "VDM",
  "MOTORE": "SILNIK",
  "Chiudi": "Zamknij",
  "💾 Salva nel playbook": "💾 Zapisz w schematach gry",
  "▶ Riproduci": "▶ Odtwórz",
  "Tempo dopo ▸": "Następny krok ▸",
  "🎥 Video": "🎥 Wideo",
  "Velocità": "Prędkość",
  "Lenta": "Wolno",
  "Normale": "Normalnie",
  "Veloce": "Szybko",
  "ciclo": "pętla",
  "Campo": "Boisko",
  "Metà campo": "Połowa boiska",
  "Campo intero": "Całe boisko",
  "Vista": "Widok",
  "Dall'alto": "Z góry",
  "3D forte": "Mocne 3D",
  "Ruota": "Obróć",
  "difesa": "obrona",
  "propaga": "przenoś",
  "Sposta": "Przesuń",
  "Taglio": "Ścięcie",
  "Palleggio": "Kozłowanie",
  "Blocco": "Zasłona",
  "Passaggio": "Podanie",
  "Palla": "Piłka",
  "Tiro": "Rzut",
  "Gomma": "Gumka",
  "▭ Zona": "▭ Strefa",
  "╱ Linea": "╱ Linia",
  "◎ Evidenzia": "◎ Wyróżnij",
  "T Scritta": "T Napis",
  "↔ Misura": "↔ Zmierz",
  "+ Aggiungi…": "+ Dodaj…",
  "↶ Annulla": "↶ Cofnij",
  "Fine": "Gotowe",
  "Annulla": "Anuluj",
  "Passaggio nella partenza?": "Podanie w pozycji startowej?",
  "La fase 1 è la posizione di partenza: se questo è il primo passaggio, va in una fase nuova.": "Krok 1 to pozycja startowa: jeśli to pierwsze podanie, trafi do nowego kroku.",
  "Fallo diventare un passaggio": "Zamień na podanie",
  "Va bene così": "Zostaw tak",
  "Giocatrice": "Zawodniczka",
  "◯ Dai la palla": "◯ Daj jej piłkę",
  "Azione in questa fase": "Akcja w tym kroku",
  "automatica": "automatyczna",
  "taglio": "ścięcie",
  "palleggio": "kozłowanie",
  "blocco": "zasłona",
  "Togli i passaggi intermedi": "Usuń podania pośrednie",
  "↻ Ruota": "↻ Obróć",
  "Togli da questa fase in poi": "Usuń od tego kroku dalej",
  "Elimina da tutte le fasi": "Usuń ze wszystkich kroków",
  "Zona": "Strefa",
  "Piena": "Wypełniona",
  "Rigata": "Kreskowana",
  "Contorno": "Obrys",
  "Elimina": "Usuń",
  "Linea": "Linia",
  "Continua": "Ciągła",
  "Tratteggiata": "Przerywana",
  "forma chiusa": "kształt zamknięty",
  "Evidenza": "Wyróżnienie",
  "Anello": "Pierścień",
  "Luce": "Poświata",
  "Quadrato": "Kwadrat",
  "Ellisse": "Elipsa",
  "Scritta": "Napis",
  "Fumetto": "Dymek",
  "Grande": "Duży",
  "Semplice": "Zwykły",
  "Misura": "Pomiar",
  "▣ Aggiungi un cartello prima di questa fase": "▣ Dodaj planszę przed tym krokiem",
  "Cartello": "Plansza",
  "Anteprima": "Podgląd",
  "Togli": "Usuń",
  "OK": "OK",
  "Gioco animato": "Animowana zagrywka",
  "Sezione del playbook": "Sekcja schematów gry",
  "Squadra (opzionale)": "Drużyna (opcjonalnie)",
  "Il tempo dopo parte da dove sono arrivate": "Następny krok zaczyna się tam, gdzie skończyły",
  "Gira il campo per guardarlo da un altro lato": "Obróć boisko, żeby zobaczyć je z innej strony",
  "Gira a sinistra": "Obróć w lewo",
  "Gira a destra": "Obróć w prawo",
  "Torna di fronte": "Wróć do widoku z przodu",
  "Spostando una giocatrice, si sposta anche nelle fasi dopo dove non l'hai ancora mossa": "Przesunięta zawodniczka przesuwa się też w kolejnych krokach, w których nie była jeszcze przesuwana",
  "Azioni": "Akcje",
  "Sposta giocatrici e palla (Esc)": "Przesuń zawodniczki i piłkę (Esc)",
  "Taglio: trascina la giocatrice dove taglia": "Ścięcie: przeciągnij zawodniczkę tam, gdzie ścina",
  "Palleggio: trascina chi ha la palla": "Kozłowanie: przeciągnij zawodniczkę z piłką",
  "Blocco: trascina chi va a bloccare, oppure clicca chi blocca da ferma": "Zasłona: przeciągnij stawiającą zasłonę albo kliknij zawodniczkę, która stawia zasłonę w miejscu",
  "Passaggio: clicca chi riceve la palla (più clic = più passaggi)": "Podanie: kliknij tę, która dostaje piłkę (więcej kliknięć = więcej podań)",
  "Palla: clic su un numero per cerchiarlo (ha la palla)": "Piłka: kliknij numer, żeby otoczyć go kółkiem (ona ma piłkę)",
  "Tiro: clicca chi tira": "Rzut: kliknij rzucającą",
  "Gomma: clic su una giocatrice per togliere le sue azioni in questo tempo": "Gumka: kliknij zawodniczkę, żeby usunąć jej akcje w tym kroku",
  "Trascina sul campo per disegnare una zona": "Przeciągnij po boisku, żeby narysować strefę",
  "Unisci giocatrici con una linea": "Połącz zawodniczki linią",
  "Evidenzia una o più giocatrici": "Wyróżnij jedną lub więcej zawodniczek",
  "Scritta sul campo o sopra una giocatrice": "Napis na boisku albo nad zawodniczką",
  "Distanza in metri": "Odległość w metrach",
  "Aggiungi sul campo": "Dodaj na boisko",
  "Annulla (⌘Z)": "Cofnij (⌘Z)",
  "n.": "nr",
  "Numero o sigla (es. 4, X2)": "Numer lub oznaczenie (np. 4, X2)",
  "All'inizio di questo tempo la palla ce l'ha lei": "Na początku tego kroku piłkę ma ona",
  "Etichetta (es. Lato debole)": "Etykieta (np. Słaba strona)",
  "Testo": "Tekst",
  "Nota (es. distanza fra le linee)": "Notatka (np. odstęp między liniami)",
  "Titolo (es. Pick and roll centrale)": "Tytuł (np. Pick and roll środkiem)",
  "Cosa guardare in questa fase": "Na co patrzeć w tym kroku",
  "Descrizione": "Opis",
  "Note": "Notatki",
  "Partenza": "Start",
  "fase {a} → {b}": "krok {a} → {b}",
  "fase {n} di {tot}": "krok {n} z {tot}",
  "Attenzione:": "Uwaga:",
  "✔ Fine tratto": "✔ Zakończ linię",
  "tempo {n}": "krok {n}",
  "Esc per Sposta": "Esc – Przesuń",
  "<strong>Aggiungi:</strong> clicca sul campo per mettere {cosa}, anche più volte · Esc o Fine per smettere": "<strong>Dodaj:</strong> klikaj na boisku, żeby postawić {cosa}, ile razy chcesz · Esc lub Gotowe, żeby skończyć",
  "<strong>Linea:</strong> clicca le giocatrici da unire, nell'ordine · clic sulla prima per chiudere · Invio per finire": "<strong>Linia:</strong> klikaj po kolei zawodniczki do połączenia · kliknij pierwszą, żeby zamknąć · Enter, żeby skończyć",
  "<strong>Evidenzia:</strong> clicca una o più giocatrici (di nuovo per toglierla) · Invio per finire": "<strong>Wyróżnij:</strong> kliknij jedną lub więcej zawodniczek (ponownie, żeby usunąć) · Enter, żeby skończyć",
  "Ha un cartello prima": "Ma planszę przed sobą",
  "Doppio clic per cambiare nome": "Kliknij dwukrotnie, żeby zmienić nazwę",
  "Nome della fase": "Nazwa kroku",
  "es. Blocco del 5 per l'1": "np. 5 stawia zasłonę dla 1",
  "elimina la fase": "usuń krok",
  "Tempo {n}": "Krok {n}",
  "Primo passaggio": "Pierwsze podanie",
  "Cartello prima della fase {n}": "Plansza przed krokiem {n}",
  "Oggetto": "Obiekt",
  "Togli i passaggi intermedi ({n})": "Usuń podania pośrednie ({n})",
  "Cambiando campo il gioco riparte dalla posizione di partenza: le fasi disegnate finora si perdono.": "Zmiana boiska uruchamia zagrywkę od pozycji startowej: dotąd narysowane kroki zostaną utracone.",
  "Cambia campo": "Zmień boisko",
  "■ Ferma": "■ Stop",
  "Questo browser non riesce a creare il video. Prova con Chrome o con Safari aggiornato.": "Ten komputer nie może utworzyć wideo. Spróbuj zaktualizować aplikację.",
  "Gioco": "Zagrywka",
  "Preparo il video… {p}%": "Tworzę wideo… {p}%",
  "video pronto: controlla i download": "wideo gotowe: sprawdź folder Pobrane",
  "Il video non è riuscito: ": "Nie udało się utworzyć wideo: ",
  "Chiudere senza salvare? Le modifiche a questo gioco si perdono.": "Zamknąć bez zapisywania? Zmiany w tej zagrywce zostaną utracone.",
  "Chiudi senza salvare": "Zamknij bez zapisywania",
  "Dai un nome al gioco prima di salvare.": "Nadaj zagrywce nazwę przed zapisaniem.",
  "Salvo…": "Zapisuję…",
  "Non sono riuscito a salvare: ": "Nie udało się zapisać: ",
  "▶ Anima": "▶ Animuj",
  "motore VDM": "silnik VDM",
  "↺ Di nuovo": "↺ Jeszcze raz",
  "Conferma": "Potwierdź",
  "Servono almeno due fasi per fare un video.": "Do wideo potrzebne są co najmniej dwa kroki.",
  "Questo computer non riesce a creare video H.264.": "Ten komputer nie może tworzyć wideo H.264.",
  "Questo computer non riesce a fare il video con il campo inclinato (WebGL non disponibile).": "Ten komputer nie może zrobić wideo z pochylonym boiskiem (WebGL niedostępny).",
  "Fase {n} di {tot}": "Krok {n} z {tot}",
  "<strong>Taglio:</strong> clic sulla giocatrice, poi clic sul percorso (i punti in mezzo fanno la curva) · doppio clic per finire": "<strong>Ścięcie:</strong> kliknij zawodniczkę, potem klikaj wzdłuż drogi (punkty pośrednie tworzą łuk) · dwuklik, żeby skończyć",
  "<strong>Palleggio:</strong> clic sul numero cerchiato, poi clic sul percorso · doppio clic per finire": "<strong>Kozłowanie:</strong> kliknij numer w kółku, potem klikaj wzdłuż drogi · dwuklik, żeby skończyć",
  "<strong>Blocco:</strong> clic sulla giocatrice, poi dove va a bloccare · doppio clic per finire · doppio clic sul numero = blocco da ferma · dopo il blocco, Taglio sulla stessa giocatrice = si butta dentro o si apre": "<strong>Zasłona:</strong> kliknij zawodniczkę, potem miejsce, gdzie stawia zasłonę · dwuklik, żeby skończyć · dwuklik na numerze = zasłona w miejscu · po zasłonie Ścięcie tej samej zawodniczki = roll albo pop",
  "<strong>Gomma:</strong> clic su una giocatrice per togliere le sue azioni in questo tempo": "<strong>Gumka:</strong> kliknij zawodniczkę, żeby usunąć jej akcje w tym kroku",
  "<strong>Passaggio:</strong> clic sul numero cerchiato, poi clic su chi riceve": "<strong>Podanie:</strong> kliknij numer w kółku, potem odbierającą",
  "<strong>Tiro:</strong> clicca chi tira": "<strong>Rzut:</strong> kliknij rzucającą",
  "<strong>Palla:</strong> clic su un numero: lo cerchia, all'inizio del tempo la palla ce l'ha lei": "<strong>Piłka:</strong> kliknij numer, żeby otoczyć go kółkiem: na początku kroku piłkę ma ona",
  "chi ha la palla (numero cerchiato) non blocca: palleggia o passa": "zawodniczka z piłką (numer w kółku) nie stawia zasłony: kozłuje albo podaje",
  "palleggia solo chi ha la palla (numero cerchiato): questo è diventato un taglio": "kozłuje tylko zawodniczka z piłką (numer w kółku): to zmieniło się w ścięcie",
  "passa solo chi ha la palla: parti dal numero cerchiato": "podaje tylko zawodniczka z piłką: zacznij od numeru w kółku",
  "palleggia solo chi ha la palla (numero cerchiato): questo è un taglio": "kozłuje tylko zawodniczka z piłką (numer w kółku): to jest ścięcie",
  "nessuna ha la palla: clicca una giocatrice e «Dai la palla»": "nikt nie ma piłki: kliknij zawodniczkę i «Daj jej piłkę»",
  "prima disegna almeno un'azione in questo tempo": "najpierw narysuj co najmniej jedną akcję w tym kroku",
  "parti da chi ha la palla: il numero cerchiato o la fine del suo palleggio": "zacznij od zawodniczki z piłką: od numeru w kółku albo końca jej kozłowania",
  "parti da una giocatrice: clic sul suo numero": "zacznij od zawodniczki: kliknij jej numer",
  "Attaccante": "Atakująca",
  "Difensore": "Broniąca",
  "Cono": "Pachołek",
  "Allenatore": "Trener",
  "attaccata alla giocatrice": "przypięty do zawodniczki",
  "ferma sul campo": "stały na boisku",
  "giallo": "żółty",
  "ciano": "cyjan",
  "rosso": "czerwony",
  "verde": "zielony",
  "bianco": "biały",
  "{n} fase": "Kroki: {n}",
  "{n} fasi": "Kroki: {n}",
  "video pronto: è anche fra le clip (Video)": "wideo gotowe: jest też wśród klipów (Wideo)"
 },
 ja: { // giapponese
  "<strong>Ricostruito dal disegno originale.</strong> Le posizioni vengono dallo schema disegnato a mano, i movimenti dalle frecce: controlla le fasi e sistema quello che non torna, poi salva. Il disegno originale resta: si puo' sempre tornare indietro dalla card.": "<strong>プレイブックの図から再構成しました。</strong>位置は図から、動きは矢印から取っています。ステップを確認し、おかしいところを直してから保存してください。元の図は変更されません。",
  "Come sul playbook: le giocatrici stanno dove partono e sopra disegni i simboli. Il <b>numero cerchiato</b> ha la palla: può palleggiare o passare. Le altre tagliano o bloccano. Dai simboli il motore ricava dove arrivano e lo anima, col ritmo del gioco: prima il blocco, poi chi lo usa, poi il passaggio. <b>Tempo dopo ▸</b> riparte da dove sono arrivate. <b>Sposta</b> sistema le posizioni di partenza. Spazio riproduce, ← → cambiano tempo, ⌘Z annulla, Esc torna a Sposta.": "プレイブックと同じです。選手はスタート位置に立ち、その上に記号を描きます。<b>丸で囲んだ番号</b>がボールを持っています。ドリブルかパスができます。ほかの選手はカットかスクリーンをします。記号からエンジンが各選手の到達位置を計算し、プレーのリズムでアニメーションにします。まずスクリーン、次にそれを使う選手、そしてパスです。<b>次のステップ ▸</b>は到達した位置から始まります。<b>移動</b>でスタート位置を調整します。スペースで再生、← → でステップ切り替え、⌘Z で元に戻す、Esc で移動に戻ります。",
  "VDM": "VDM",
  "MOTORE": "エンジン",
  "Chiudi": "閉じる",
  "💾 Salva nel playbook": "💾 プレイブックに保存",
  "▶ Riproduci": "▶ 再生",
  "Tempo dopo ▸": "次のステップ ▸",
  "🎥 Video": "🎥 ビデオ",
  "Velocità": "速度",
  "Lenta": "遅い",
  "Normale": "標準",
  "Veloce": "速い",
  "ciclo": "ループ",
  "Campo": "コート",
  "Metà campo": "ハーフコート",
  "Campo intero": "フルコート",
  "Vista": "視点",
  "Dall'alto": "真上から",
  "3D forte": "3D 急角度",
  "Ruota": "回転",
  "difesa": "ディフェンス",
  "propaga": "以降に反映",
  "Sposta": "移動",
  "Taglio": "カット",
  "Palleggio": "ドリブル",
  "Blocco": "スクリーン",
  "Passaggio": "パス",
  "Palla": "ボール",
  "Tiro": "シュート",
  "Gomma": "消しゴム",
  "▭ Zona": "▭ ゾーン",
  "╱ Linea": "╱ ライン",
  "◎ Evidenzia": "◎ ハイライト",
  "T Scritta": "T テキスト",
  "↔ Misura": "↔ 距離",
  "+ Aggiungi…": "+ 追加…",
  "↶ Annulla": "↶ 元に戻す",
  "Fine": "完了",
  "Annulla": "キャンセル",
  "Passaggio nella partenza?": "スタート位置でパス？",
  "La fase 1 è la posizione di partenza: se questo è il primo passaggio, va in una fase nuova.": "ステップ 1 はスタート位置です。これが最初のパスなら、新しいステップに入れます。",
  "Fallo diventare un passaggio": "パスにする",
  "Va bene così": "このままにする",
  "Giocatrice": "選手",
  "◯ Dai la palla": "◯ ボールを渡す",
  "Azione in questa fase": "このステップの動き",
  "automatica": "自動",
  "taglio": "カット",
  "palleggio": "ドリブル",
  "blocco": "スクリーン",
  "Togli i passaggi intermedi": "途中のパスを削除",
  "↻ Ruota": "↻ 回転",
  "Togli da questa fase in poi": "このステップ以降から削除",
  "Elimina da tutte le fasi": "全ステップから削除",
  "Zona": "ゾーン",
  "Piena": "塗りつぶし",
  "Rigata": "斜線",
  "Contorno": "輪郭",
  "Elimina": "削除",
  "Linea": "ライン",
  "Continua": "実線",
  "Tratteggiata": "破線",
  "forma chiusa": "閉じた図形",
  "Evidenza": "ハイライト",
  "Anello": "リング",
  "Luce": "光彩",
  "Quadrato": "四角",
  "Ellisse": "楕円",
  "Scritta": "テキスト",
  "Fumetto": "吹き出し",
  "Grande": "大",
  "Semplice": "シンプル",
  "Misura": "距離",
  "▣ Aggiungi un cartello prima di questa fase": "▣ このステップの前にタイトルカードを追加",
  "Cartello": "タイトルカード",
  "Anteprima": "プレビュー",
  "Togli": "外す",
  "OK": "OK",
  "Gioco animato": "アニメーションプレー",
  "Sezione del playbook": "プレイブックのカテゴリー",
  "Squadra (opzionale)": "チーム（任意）",
  "Il tempo dopo parte da dove sono arrivate": "次のステップは到達した位置から始まります",
  "Gira il campo per guardarlo da un altro lato": "コートを回して別の側から見る",
  "Gira a sinistra": "左に回す",
  "Gira a destra": "右に回す",
  "Torna di fronte": "正面に戻す",
  "Spostando una giocatrice, si sposta anche nelle fasi dopo dove non l'hai ancora mossa": "選手を動かすと、まだ動かしていない以降のステップでも一緒に動きます",
  "Azioni": "動き",
  "Sposta giocatrici e palla (Esc)": "選手とボールを移動（Esc）",
  "Taglio: trascina la giocatrice dove taglia": "カット：選手をカットする位置までドラッグ",
  "Palleggio: trascina chi ha la palla": "ドリブル：ボール保持者をドラッグ",
  "Blocco: trascina chi va a bloccare, oppure clicca chi blocca da ferma": "スクリーン：スクリーンに行く選手をドラッグ、またはその場でスクリーンする選手をクリック",
  "Passaggio: clicca chi riceve la palla (più clic = più passaggi)": "パス：ボールを受ける選手をクリック（複数クリック = 複数パス）",
  "Palla: clic su un numero per cerchiarlo (ha la palla)": "ボール：番号をクリックして丸で囲む（ボール保持者）",
  "Tiro: clicca chi tira": "シュート：シュートする選手をクリック",
  "Gomma: clic su una giocatrice per togliere le sue azioni in questo tempo": "消しゴム：選手をクリックして、このステップでの動きを削除",
  "Trascina sul campo per disegnare una zona": "コート上をドラッグしてゾーンを描く",
  "Unisci giocatrici con una linea": "選手をラインでつなぐ",
  "Evidenzia una o più giocatrici": "1人または複数の選手をハイライト",
  "Scritta sul campo o sopra una giocatrice": "コート上または選手の上にテキスト",
  "Distanza in metri": "距離（メートル）",
  "Aggiungi sul campo": "コートに追加",
  "Annulla (⌘Z)": "元に戻す（⌘Z）",
  "n.": "No.",
  "Numero o sigla (es. 4, X2)": "番号または記号（例：4、X2）",
  "All'inizio di questo tempo la palla ce l'ha lei": "このステップの開始時にこの選手がボールを持つ",
  "Etichetta (es. Lato debole)": "ラベル（例：ウィークサイド）",
  "Testo": "テキスト",
  "Nota (es. distanza fra le linee)": "メモ（例：ライン間の距離）",
  "Titolo (es. Pick and roll centrale)": "タイトル（例：ミドルのピック&ロール）",
  "Cosa guardare in questa fase": "このステップで見るポイント",
  "Descrizione": "説明",
  "Note": "メモ",
  "Partenza": "スタート",
  "fase {a} → {b}": "ステップ {a} → {b}",
  "fase {n} di {tot}": "ステップ {n} / {tot}",
  "Attenzione:": "注意：",
  "✔ Fine tratto": "✔ 線を確定",
  "tempo {n}": "ステップ {n}",
  "Esc per Sposta": "Esc で移動",
  "<strong>Aggiungi:</strong> clicca sul campo per mettere {cosa}, anche più volte · Esc o Fine per smettere": "<strong>追加：</strong>コートをクリックして{cosa}を置きます。何度でも置けます · Esc または「完了」で終了",
  "<strong>Linea:</strong> clicca le giocatrici da unire, nell'ordine · clic sulla prima per chiudere · Invio per finire": "<strong>ライン：</strong>つなぐ選手を順番にクリック · 最初の選手をクリックすると閉じます · Enter で終了",
  "<strong>Evidenzia:</strong> clicca una o più giocatrici (di nuovo per toglierla) · Invio per finire": "<strong>ハイライト：</strong>1人または複数の選手をクリック（もう一度で解除） · Enter で終了",
  "Ha un cartello prima": "前にタイトルカードあり",
  "Doppio clic per cambiare nome": "ダブルクリックで名前を変更",
  "Nome della fase": "ステップ名",
  "es. Blocco del 5 per l'1": "例：5番が1番にスクリーン",
  "elimina la fase": "ステップを削除",
  "Tempo {n}": "ステップ {n}",
  "Primo passaggio": "最初のパス",
  "Cartello prima della fase {n}": "ステップ {n} の前のタイトルカード",
  "Oggetto": "オブジェクト",
  "Togli i passaggi intermedi ({n})": "途中のパスを削除（{n}）",
  "Cambiando campo il gioco riparte dalla posizione di partenza: le fasi disegnate finora si perdono.": "コートを変更すると、プレーはスタート位置からやり直しになります。これまでに描いたステップは失われます。",
  "Cambia campo": "コートを変更",
  "■ Ferma": "■ 停止",
  "Questo browser non riesce a creare il video. Prova con Chrome o con Safari aggiornato.": "このコンピュータではビデオを作成できません。アプリを更新してみてください。",
  "Gioco": "プレー",
  "Preparo il video… {p}%": "ビデオを作成中… {p}%",
  "video pronto: controlla i download": "ビデオ完成：ダウンロードを確認してください",
  "Il video non è riuscito: ": "ビデオの作成に失敗しました：",
  "Chiudere senza salvare? Le modifiche a questo gioco si perdono.": "保存せずに閉じますか？このプレーへの変更は失われます。",
  "Chiudi senza salvare": "保存せずに閉じる",
  "Dai un nome al gioco prima di salvare.": "保存する前にプレーに名前を付けてください。",
  "Salvo…": "保存中…",
  "Non sono riuscito a salvare: ": "保存できませんでした：",
  "▶ Anima": "▶ アニメーション",
  "motore VDM": "VDM エンジン",
  "↺ Di nuovo": "↺ もう一度",
  "Conferma": "確定",
  "Servono almeno due fasi per fare un video.": "ビデオを作るには2つ以上のステップが必要です。",
  "Questo computer non riesce a creare video H.264.": "このコンピュータでは H.264 ビデオを作成できません。",
  "Questo computer non riesce a fare il video con il campo inclinato (WebGL non disponibile).": "このコンピュータでは傾けたコートのビデオを作成できません（WebGL が使用できません）。",
  "Fase {n} di {tot}": "ステップ {n} / {tot}",
  "<strong>Taglio:</strong> clic sulla giocatrice, poi clic sul percorso (i punti in mezzo fanno la curva) · doppio clic per finire": "<strong>カット：</strong>選手をクリックし、次に経路に沿ってクリック（途中の点でカーブになります） · ダブルクリックで終了",
  "<strong>Palleggio:</strong> clic sul numero cerchiato, poi clic sul percorso · doppio clic per finire": "<strong>ドリブル：</strong>丸で囲んだ番号をクリックし、次に経路に沿ってクリック · ダブルクリックで終了",
  "<strong>Blocco:</strong> clic sulla giocatrice, poi dove va a bloccare · doppio clic per finire · doppio clic sul numero = blocco da ferma · dopo il blocco, Taglio sulla stessa giocatrice = si butta dentro o si apre": "<strong>スクリーン：</strong>選手をクリックし、次にスクリーンをセットする位置をクリック · ダブルクリックで終了 · 番号をダブルクリック = その場でスクリーン · スクリーンの後、同じ選手に「カット」= ロールまたはポップ",
  "<strong>Gomma:</strong> clic su una giocatrice per togliere le sue azioni in questo tempo": "<strong>消しゴム：</strong>選手をクリックして、このステップでの動きを削除",
  "<strong>Passaggio:</strong> clic sul numero cerchiato, poi clic su chi riceve": "<strong>パス：</strong>丸で囲んだ番号をクリックし、次にパスを受ける選手をクリック",
  "<strong>Tiro:</strong> clicca chi tira": "<strong>シュート：</strong>シュートする選手をクリック",
  "<strong>Palla:</strong> clic su un numero: lo cerchia, all'inizio del tempo la palla ce l'ha lei": "<strong>ボール：</strong>番号をクリックして丸で囲む：ステップの開始時にその選手がボールを持ちます",
  "chi ha la palla (numero cerchiato) non blocca: palleggia o passa": "ボール保持者（丸で囲んだ番号）はスクリーンしません：ドリブルかパスをします",
  "palleggia solo chi ha la palla (numero cerchiato): questo è diventato un taglio": "ドリブルできるのはボール保持者（丸で囲んだ番号）だけです：これはカットに変わりました",
  "passa solo chi ha la palla: parti dal numero cerchiato": "パスできるのはボール保持者だけです：丸で囲んだ番号から始めてください",
  "palleggia solo chi ha la palla (numero cerchiato): questo è un taglio": "ドリブルできるのはボール保持者（丸で囲んだ番号）だけです：これはカットです",
  "nessuna ha la palla: clicca una giocatrice e «Dai la palla»": "誰もボールを持っていません：選手をクリックして「ボールを渡す」",
  "prima disegna almeno un'azione in questo tempo": "まずこのステップで少なくとも1つ動きを描いてください",
  "parti da chi ha la palla: il numero cerchiato o la fine del suo palleggio": "ボール保持者から始めてください：丸で囲んだ番号か、そのドリブルの終点",
  "parti da una giocatrice: clic sul suo numero": "選手から始めてください：その番号をクリック",
  "Attaccante": "オフェンスの選手",
  "Difensore": "ディフェンスの選手",
  "Cono": "コーン",
  "Allenatore": "コーチ",
  "attaccata alla giocatrice": "選手に付ける",
  "ferma sul campo": "コートに固定",
  "giallo": "黄",
  "ciano": "シアン",
  "rosso": "赤",
  "verde": "緑",
  "bianco": "白",
  "{n} fase": "{n} ステップ",
  "{n} fasi": "{n} ステップ",
  "video pronto: è anche fra le clip (Video)": "ビデオ完成：クリップ（ビデオ）にも入っています"
 },
 pt: { // portoghese
  "<strong>Ricostruito dal disegno originale.</strong> Le posizioni vengono dallo schema disegnato a mano, i movimenti dalle frecce: controlla le fasi e sistema quello che non torna, poi salva. Il disegno originale resta: si puo' sempre tornare indietro dalla card.": "<strong>Reconstruído a partir do seu esquema do Plano de Jogo.</strong> As posições vêm do esquema e os movimentos das setas: verifique as fases, corrija o que não estiver certo e depois guarde. O seu esquema original não é alterado.",
  "Come sul playbook: le giocatrici stanno dove partono e sopra disegni i simboli. Il <b>numero cerchiato</b> ha la palla: può palleggiare o passare. Le altre tagliano o bloccano. Dai simboli il motore ricava dove arrivano e lo anima, col ritmo del gioco: prima il blocco, poi chi lo usa, poi il passaggio. <b>Tempo dopo ▸</b> riparte da dove sono arrivate. <b>Sposta</b> sistema le posizioni di partenza. Spazio riproduce, ← → cambiano tempo, ⌘Z annulla, Esc torna a Sposta.": "Tal como no plano de jogo: as jogadoras estão onde começam e por cima desenha os símbolos. O <b>número com círculo</b> tem a bola: pode driblar ou passar. As outras fazem corte ou bloqueio. A partir dos símbolos o motor calcula onde cada uma chega e anima-o com o ritmo da jogada: primeiro o bloqueio, depois quem o usa, depois o passe. <b>Fase seguinte ▸</b> recomeça de onde chegaram. <b>Mover</b> ajusta as posições de partida. Espaço reproduz, ← → mudam de fase, ⌘Z desfaz, Esc volta a Mover.",
  "VDM": "VDM",
  "MOTORE": "MOTOR",
  "Chiudi": "Fechar",
  "💾 Salva nel playbook": "💾 Guardar no plano de jogo",
  "▶ Riproduci": "▶ Reproduzir",
  "Tempo dopo ▸": "Fase seguinte ▸",
  "🎥 Video": "🎥 Vídeo",
  "Velocità": "Velocidade",
  "Lenta": "Lenta",
  "Normale": "Normal",
  "Veloce": "Rápida",
  "ciclo": "ciclo",
  "Campo": "Campo",
  "Metà campo": "Meio campo",
  "Campo intero": "Campo inteiro",
  "Vista": "Vista",
  "Dall'alto": "De cima",
  "3D forte": "3D inclinado",
  "Ruota": "Rodar",
  "difesa": "defesa",
  "propaga": "propagar",
  "Sposta": "Mover",
  "Taglio": "Corte",
  "Palleggio": "Drible",
  "Blocco": "Bloqueio",
  "Passaggio": "Passe",
  "Palla": "Bola",
  "Tiro": "Lançamento",
  "Gomma": "Borracha",
  "▭ Zona": "▭ Zona",
  "╱ Linea": "╱ Linha",
  "◎ Evidenzia": "◎ Destacar",
  "T Scritta": "T Texto",
  "↔ Misura": "↔ Medir",
  "+ Aggiungi…": "+ Adicionar…",
  "↶ Annulla": "↶ Desfazer",
  "Fine": "Concluir",
  "Annulla": "Cancelar",
  "Passaggio nella partenza?": "Passe na posição de partida?",
  "La fase 1 è la posizione di partenza: se questo è il primo passaggio, va in una fase nuova.": "A fase 1 é a posição de partida: se este é o primeiro passe, vai para uma fase nova.",
  "Fallo diventare un passaggio": "Transformar em passe",
  "Va bene così": "Deixar assim",
  "Giocatrice": "Jogadora",
  "◯ Dai la palla": "◯ Dar-lhe a bola",
  "Azione in questa fase": "Ação nesta fase",
  "automatica": "automática",
  "taglio": "corte",
  "palleggio": "drible",
  "blocco": "bloqueio",
  "Togli i passaggi intermedi": "Remover os passes intermédios",
  "↻ Ruota": "↻ Rodar",
  "Togli da questa fase in poi": "Remover desta fase em diante",
  "Elimina da tutte le fasi": "Eliminar de todas as fases",
  "Zona": "Zona",
  "Piena": "Preenchida",
  "Rigata": "Riscada",
  "Contorno": "Contorno",
  "Elimina": "Eliminar",
  "Linea": "Linha",
  "Continua": "Contínua",
  "Tratteggiata": "Tracejada",
  "forma chiusa": "forma fechada",
  "Evidenza": "Destaque",
  "Anello": "Anel",
  "Luce": "Brilho",
  "Quadrato": "Quadrado",
  "Ellisse": "Elipse",
  "Scritta": "Texto",
  "Fumetto": "Balão",
  "Grande": "Grande",
  "Semplice": "Simples",
  "Misura": "Medida",
  "▣ Aggiungi un cartello prima di questa fase": "▣ Adicionar um cartão antes desta fase",
  "Cartello": "Cartão",
  "Anteprima": "Pré-visualizar",
  "Togli": "Remover",
  "OK": "OK",
  "Gioco animato": "Jogada animada",
  "Sezione del playbook": "Secção do plano de jogo",
  "Squadra (opzionale)": "Equipa (opcional)",
  "Il tempo dopo parte da dove sono arrivate": "A fase seguinte recomeça de onde chegaram",
  "Gira il campo per guardarlo da un altro lato": "Rode o campo para o ver de outro lado",
  "Gira a sinistra": "Rodar para a esquerda",
  "Gira a destra": "Rodar para a direita",
  "Torna di fronte": "Voltar à vista frontal",
  "Spostando una giocatrice, si sposta anche nelle fasi dopo dove non l'hai ancora mossa": "Ao mover uma jogadora, ela move-se também nas fases seguintes onde ainda não a moveu",
  "Azioni": "Ações",
  "Sposta giocatrici e palla (Esc)": "Mover jogadoras e bola (Esc)",
  "Taglio: trascina la giocatrice dove taglia": "Corte: arraste a jogadora para onde corta",
  "Palleggio: trascina chi ha la palla": "Drible: arraste quem tem a bola",
  "Blocco: trascina chi va a bloccare, oppure clicca chi blocca da ferma": "Bloqueio: arraste quem vai bloquear, ou clique numa jogadora que bloqueia parada",
  "Passaggio: clicca chi riceve la palla (più clic = più passaggi)": "Passe: clique em quem recebe a bola (mais cliques = mais passes)",
  "Palla: clic su un numero per cerchiarlo (ha la palla)": "Bola: clique num número para o circundar (tem a bola)",
  "Tiro: clicca chi tira": "Lançamento: clique em quem lança",
  "Gomma: clic su una giocatrice per togliere le sue azioni in questo tempo": "Borracha: clique numa jogadora para remover as suas ações nesta fase",
  "Trascina sul campo per disegnare una zona": "Arraste no campo para desenhar uma zona",
  "Unisci giocatrici con una linea": "Unir jogadoras com uma linha",
  "Evidenzia una o più giocatrici": "Destacar uma ou mais jogadoras",
  "Scritta sul campo o sopra una giocatrice": "Texto no campo ou por cima de uma jogadora",
  "Distanza in metri": "Distância em metros",
  "Aggiungi sul campo": "Adicionar ao campo",
  "Annulla (⌘Z)": "Desfazer (⌘Z)",
  "n.": "n.º",
  "Numero o sigla (es. 4, X2)": "Número ou sigla (ex. 4, X2)",
  "All'inizio di questo tempo la palla ce l'ha lei": "No início desta fase é ela que tem a bola",
  "Etichetta (es. Lato debole)": "Etiqueta (ex. Lado fraco)",
  "Testo": "Texto",
  "Nota (es. distanza fra le linee)": "Nota (ex. espaçamento entre as linhas)",
  "Titolo (es. Pick and roll centrale)": "Título (ex. Pick and roll central)",
  "Cosa guardare in questa fase": "O que observar nesta fase",
  "Descrizione": "Descrição",
  "Note": "Notas",
  "Partenza": "Partida",
  "fase {a} → {b}": "fase {a} → {b}",
  "fase {n} di {tot}": "fase {n} de {tot}",
  "Attenzione:": "Atenção:",
  "✔ Fine tratto": "✔ Terminar traço",
  "tempo {n}": "fase {n}",
  "Esc per Sposta": "Esc para Mover",
  "<strong>Aggiungi:</strong> clicca sul campo per mettere {cosa}, anche più volte · Esc o Fine per smettere": "<strong>Adicionar:</strong> clique no campo para colocar {cosa}, quantas vezes quiser · Esc ou Concluir para parar",
  "<strong>Linea:</strong> clicca le giocatrici da unire, nell'ordine · clic sulla prima per chiudere · Invio per finire": "<strong>Linha:</strong> clique nas jogadoras a unir, por ordem · clique na primeira para fechar · Enter para terminar",
  "<strong>Evidenzia:</strong> clicca una o più giocatrici (di nuovo per toglierla) · Invio per finire": "<strong>Destacar:</strong> clique numa ou mais jogadoras (de novo para remover) · Enter para terminar",
  "Ha un cartello prima": "Tem um cartão antes",
  "Doppio clic per cambiare nome": "Duplo clique para mudar o nome",
  "Nome della fase": "Nome da fase",
  "es. Blocco del 5 per l'1": "ex. Bloqueio do 5 para o 1",
  "elimina la fase": "eliminar a fase",
  "Tempo {n}": "Fase {n}",
  "Primo passaggio": "Primeiro passe",
  "Cartello prima della fase {n}": "Cartão antes da fase {n}",
  "Oggetto": "Objeto",
  "Togli i passaggi intermedi ({n})": "Remover os passes intermédios ({n})",
  "Cambiando campo il gioco riparte dalla posizione di partenza: le fasi disegnate finora si perdono.": "Ao mudar de campo, a jogada volta à posição de partida: as fases desenhadas até agora perdem-se.",
  "Cambia campo": "Mudar campo",
  "■ Ferma": "■ Parar",
  "Questo browser non riesce a creare il video. Prova con Chrome o con Safari aggiornato.": "Este computador não consegue criar o vídeo. Experimente atualizar a app.",
  "Gioco": "Jogada",
  "Preparo il video… {p}%": "A preparar o vídeo… {p}%",
  "video pronto: controlla i download": "vídeo pronto: veja as suas transferências",
  "Il video non è riuscito: ": "O vídeo falhou: ",
  "Chiudere senza salvare? Le modifiche a questo gioco si perdono.": "Fechar sem guardar? As alterações a esta jogada perdem-se.",
  "Chiudi senza salvare": "Fechar sem guardar",
  "Dai un nome al gioco prima di salvare.": "Dê um nome à jogada antes de guardar.",
  "Salvo…": "A guardar…",
  "Non sono riuscito a salvare: ": "Não foi possível guardar: ",
  "▶ Anima": "▶ Animar",
  "motore VDM": "motor VDM",
  "↺ Di nuovo": "↺ De novo",
  "Conferma": "Confirmar",
  "Servono almeno due fasi per fare un video.": "São precisas pelo menos duas fases para fazer um vídeo.",
  "Questo computer non riesce a creare video H.264.": "Este computador não consegue criar vídeo H.264.",
  "Questo computer non riesce a fare il video con il campo inclinato (WebGL non disponibile).": "Este computador não consegue fazer o vídeo com o campo inclinado (WebGL não disponível).",
  "Fase {n} di {tot}": "Fase {n} de {tot}",
  "<strong>Taglio:</strong> clic sulla giocatrice, poi clic sul percorso (i punti in mezzo fanno la curva) · doppio clic per finire": "<strong>Corte:</strong> clique na jogadora e depois ao longo do percurso (os pontos intermédios fazem a curva) · duplo clique para terminar",
  "<strong>Palleggio:</strong> clic sul numero cerchiato, poi clic sul percorso · doppio clic per finire": "<strong>Drible:</strong> clique no número com círculo e depois ao longo do percurso · duplo clique para terminar",
  "<strong>Blocco:</strong> clic sulla giocatrice, poi dove va a bloccare · doppio clic per finire · doppio clic sul numero = blocco da ferma · dopo il blocco, Taglio sulla stessa giocatrice = si butta dentro o si apre": "<strong>Bloqueio:</strong> clique na jogadora e depois onde faz o bloqueio · duplo clique para terminar · duplo clique no número = bloqueio parada · depois do bloqueio, Corte na mesma jogadora = roll ou pop",
  "<strong>Gomma:</strong> clic su una giocatrice per togliere le sue azioni in questo tempo": "<strong>Borracha:</strong> clique numa jogadora para remover as suas ações nesta fase",
  "<strong>Passaggio:</strong> clic sul numero cerchiato, poi clic su chi riceve": "<strong>Passe:</strong> clique no número com círculo e depois em quem recebe",
  "<strong>Tiro:</strong> clicca chi tira": "<strong>Lançamento:</strong> clique em quem lança",
  "<strong>Palla:</strong> clic su un numero: lo cerchia, all'inizio del tempo la palla ce l'ha lei": "<strong>Bola:</strong> clique num número para o circundar: tem a bola no início da fase",
  "chi ha la palla (numero cerchiato) non blocca: palleggia o passa": "quem tem a bola (número com círculo) não bloqueia: dribla ou passa",
  "palleggia solo chi ha la palla (numero cerchiato): questo è diventato un taglio": "só dribla quem tem a bola (número com círculo): isto passou a ser um corte",
  "passa solo chi ha la palla: parti dal numero cerchiato": "só passa quem tem a bola: comece pelo número com círculo",
  "palleggia solo chi ha la palla (numero cerchiato): questo è un taglio": "só dribla quem tem a bola (número com círculo): isto é um corte",
  "nessuna ha la palla: clicca una giocatrice e «Dai la palla»": "nenhuma tem a bola: clique numa jogadora e em «Dar-lhe a bola»",
  "prima disegna almeno un'azione in questo tempo": "primeiro desenhe pelo menos uma ação nesta fase",
  "parti da chi ha la palla: il numero cerchiato o la fine del suo palleggio": "comece por quem tem a bola: o número com círculo ou o fim do seu drible",
  "parti da una giocatrice: clic sul suo numero": "comece por uma jogadora: clique no número dela",
  "Attaccante": "Atacante",
  "Difensore": "Defensora",
  "Cono": "Cone",
  "Allenatore": "Treinador",
  "attaccata alla giocatrice": "presa à jogadora",
  "ferma sul campo": "fixa no campo",
  "giallo": "amarelo",
  "ciano": "ciano",
  "rosso": "vermelho",
  "verde": "verde",
  "bianco": "branco",
  "{n} fase": "{n} fase",
  "{n} fasi": "{n} fases",
  "video pronto: è anche fra le clip (Video)": "vídeo pronto: também está nos seus clips (Vídeo)"
 },
 ko: { // coreano
  "<strong>Ricostruito dal disegno originale.</strong> Le posizioni vengono dallo schema disegnato a mano, i movimenti dalle frecce: controlla le fasi e sistema quello che non torna, poi salva. Il disegno originale resta: si puo' sempre tornare indietro dalla card.": "<strong>전술판 다이어그램에서 다시 만들었어요.</strong> 위치는 다이어그램에서, 움직임은 화살표에서 가져왔어요: 단계를 확인하고 이상한 부분을 고친 다음 저장하세요. 원래 다이어그램은 바뀌지 않아요.",
  "Come sul playbook: le giocatrici stanno dove partono e sopra disegni i simboli. Il <b>numero cerchiato</b> ha la palla: può palleggiare o passare. Le altre tagliano o bloccano. Dai simboli il motore ricava dove arrivano e lo anima, col ritmo del gioco: prima il blocco, poi chi lo usa, poi il passaggio. <b>Tempo dopo ▸</b> riparte da dove sono arrivate. <b>Sposta</b> sistema le posizioni di partenza. Spazio riproduce, ← → cambiano tempo, ⌘Z annulla, Esc torna a Sposta.": "전술판과 똑같아요: 선수는 시작 위치에 서 있고, 그 위에 기호를 그리면 돼요. <b>동그라미 친 번호</b>가 공을 가진 선수예요: 드리블하거나 패스할 수 있어요. 다른 선수들은 컷하거나 스크린을 걸어요. 엔진이 기호를 보고 각 선수가 도착할 위치를 계산해 플레이의 리듬대로 애니메이션해요: 먼저 스크린, 그다음 스크린을 이용하는 선수, 그다음 패스. <b>다음 단계 ▸</b>는 선수들이 도착한 위치에서 시작해요. <b>이동</b>으로 시작 위치를 조정해요. 스페이스는 재생, ← →는 단계 변경, ⌘Z는 실행 취소, Esc는 이동으로 돌아가요.",
  "VDM": "VDM",
  "MOTORE": "엔진",
  "Chiudi": "닫기",
  "💾 Salva nel playbook": "💾 전술판에 저장",
  "▶ Riproduci": "▶ 재생",
  "Tempo dopo ▸": "다음 단계 ▸",
  "🎥 Video": "🎥 영상",
  "Velocità": "속도",
  "Lenta": "느리게",
  "Normale": "보통",
  "Veloce": "빠르게",
  "ciclo": "반복",
  "Campo": "코트",
  "Metà campo": "하프 코트",
  "Campo intero": "풀 코트",
  "Vista": "시점",
  "Dall'alto": "위에서",
  "3D forte": "3D 급경사",
  "Ruota": "회전",
  "difesa": "수비",
  "propaga": "이후 단계에 적용",
  "Sposta": "이동",
  "Taglio": "컷",
  "Palleggio": "드리블",
  "Blocco": "스크린",
  "Passaggio": "패스",
  "Palla": "공",
  "Tiro": "슛",
  "Gomma": "지우개",
  "▭ Zona": "▭ 구역",
  "╱ Linea": "╱ 선",
  "◎ Evidenzia": "◎ 강조",
  "T Scritta": "T 텍스트",
  "↔ Misura": "↔ 거리 측정",
  "+ Aggiungi…": "+ 추가…",
  "↶ Annulla": "↶ 실행 취소",
  "Fine": "완료",
  "Annulla": "취소",
  "Passaggio nella partenza?": "시작 위치에서 패스할까요?",
  "La fase 1 è la posizione di partenza: se questo è il primo passaggio, va in una fase nuova.": "1단계는 시작 위치예요: 이것이 첫 패스라면 새 단계로 들어가요.",
  "Fallo diventare un passaggio": "패스로 바꾸기",
  "Va bene così": "그대로 두기",
  "Giocatrice": "선수",
  "◯ Dai la palla": "◯ 공 주기",
  "Azione in questa fase": "이 단계의 동작",
  "automatica": "자동",
  "taglio": "컷",
  "palleggio": "드리블",
  "blocco": "스크린",
  "Togli i passaggi intermedi": "중간 패스 삭제",
  "↻ Ruota": "↻ 회전",
  "Togli da questa fase in poi": "이 단계부터 삭제",
  "Elimina da tutte le fasi": "모든 단계에서 삭제",
  "Zona": "구역",
  "Piena": "채우기",
  "Rigata": "빗금",
  "Contorno": "윤곽선",
  "Elimina": "삭제",
  "Linea": "선",
  "Continua": "실선",
  "Tratteggiata": "점선",
  "forma chiusa": "닫힌 도형",
  "Evidenza": "강조",
  "Anello": "링",
  "Luce": "빛",
  "Quadrato": "사각형",
  "Ellisse": "타원",
  "Scritta": "텍스트",
  "Fumetto": "말풍선",
  "Grande": "크게",
  "Semplice": "기본",
  "Misura": "거리 측정",
  "▣ Aggiungi un cartello prima di questa fase": "▣ 이 단계 앞에 타이틀 카드 추가",
  "Cartello": "타이틀 카드",
  "Anteprima": "미리보기",
  "Togli": "삭제",
  "OK": "확인",
  "Gioco animato": "애니메이션 플레이",
  "Sezione del playbook": "전술판 분류",
  "Squadra (opzionale)": "팀 (선택 사항)",
  "Il tempo dopo parte da dove sono arrivate": "다음 단계는 선수들이 도착한 위치에서 시작해요",
  "Gira il campo per guardarlo da un altro lato": "코트를 돌려 다른 쪽에서 보기",
  "Gira a sinistra": "왼쪽으로 돌리기",
  "Gira a destra": "오른쪽으로 돌리기",
  "Torna di fronte": "정면 보기로 돌아가기",
  "Spostando una giocatrice, si sposta anche nelle fasi dopo dove non l'hai ancora mossa": "선수를 옮기면 아직 움직이지 않은 이후 단계에서도 함께 옮겨져요",
  "Azioni": "동작",
  "Sposta giocatrici e palla (Esc)": "선수와 공 이동 (Esc)",
  "Taglio: trascina la giocatrice dove taglia": "컷: 선수를 컷할 위치로 드래그",
  "Palleggio: trascina chi ha la palla": "드리블: 공을 가진 선수를 드래그",
  "Blocco: trascina chi va a bloccare, oppure clicca chi blocca da ferma": "스크린: 스크리너를 드래그하거나, 제자리에서 스크린을 거는 선수를 클릭",
  "Passaggio: clicca chi riceve la palla (più clic = più passaggi)": "패스: 공을 받을 선수를 클릭 (여러 번 클릭 = 여러 번 패스)",
  "Palla: clic su un numero per cerchiarlo (ha la palla)": "공: 번호를 클릭해 동그라미 표시 (공을 가진 선수)",
  "Tiro: clicca chi tira": "슛: 슛하는 선수를 클릭",
  "Gomma: clic su una giocatrice per togliere le sue azioni in questo tempo": "지우개: 선수를 클릭해 이 단계의 동작 삭제",
  "Trascina sul campo per disegnare una zona": "코트에서 드래그해 구역 그리기",
  "Unisci giocatrici con una linea": "선수를 선으로 연결",
  "Evidenzia una o più giocatrici": "선수 한 명 이상 강조",
  "Scritta sul campo o sopra una giocatrice": "코트 위 또는 선수 위에 텍스트",
  "Distanza in metri": "거리 (미터)",
  "Aggiungi sul campo": "코트에 추가",
  "Annulla (⌘Z)": "실행 취소 (⌘Z)",
  "n.": "번호",
  "Numero o sigla (es. 4, X2)": "번호 또는 표시 (예: 4, X2)",
  "All'inizio di questo tempo la palla ce l'ha lei": "이 단계 시작 시 이 선수가 공을 가지고 있어요",
  "Etichetta (es. Lato debole)": "라벨 (예: 위크 사이드)",
  "Testo": "텍스트",
  "Nota (es. distanza fra le linee)": "메모 (예: 선 사이 간격)",
  "Titolo (es. Pick and roll centrale)": "제목 (예: 가운데 픽앤롤)",
  "Cosa guardare in questa fase": "이 단계에서 볼 포인트",
  "Descrizione": "설명",
  "Note": "메모",
  "Partenza": "시작",
  "fase {a} → {b}": "단계 {a} → {b}",
  "fase {n} di {tot}": "단계 {n}/{tot}",
  "Attenzione:": "참고:",
  "✔ Fine tratto": "✔ 선 완료",
  "tempo {n}": "단계 {n}",
  "Esc per Sposta": "Esc: 이동",
  "<strong>Aggiungi:</strong> clicca sul campo per mettere {cosa}, anche più volte · Esc o Fine per smettere": "<strong>추가:</strong> 코트를 클릭해 {cosa} 배치, 원하는 만큼 여러 번 · Esc 또는 완료로 종료",
  "<strong>Linea:</strong> clicca le giocatrici da unire, nell'ordine · clic sulla prima per chiudere · Invio per finire": "<strong>선:</strong> 연결할 선수를 순서대로 클릭 · 첫 번째 선수를 클릭하면 닫힘 · Enter로 완료",
  "<strong>Evidenzia:</strong> clicca una o più giocatrici (di nuovo per toglierla) · Invio per finire": "<strong>강조:</strong> 선수를 한 명 이상 클릭 (다시 클릭하면 해제) · Enter로 완료",
  "Ha un cartello prima": "앞에 타이틀 카드가 있음",
  "Doppio clic per cambiare nome": "더블클릭해 이름 변경",
  "Nome della fase": "단계 이름",
  "es. Blocco del 5 per l'1": "예: 5번이 1번에게 스크린",
  "elimina la fase": "단계 삭제",
  "Tempo {n}": "단계 {n}",
  "Primo passaggio": "첫 패스",
  "Cartello prima della fase {n}": "단계 {n} 앞의 타이틀 카드",
  "Oggetto": "오브젝트",
  "Togli i passaggi intermedi ({n})": "중간 패스 삭제 ({n})",
  "Cambiando campo il gioco riparte dalla posizione di partenza: le fasi disegnate finora si perdono.": "코트를 바꾸면 플레이가 시작 위치부터 다시 시작돼요: 지금까지 그린 단계는 사라져요.",
  "Cambia campo": "코트 변경",
  "■ Ferma": "■ 정지",
  "Questo browser non riesce a creare il video. Prova con Chrome o con Safari aggiornato.": "이 컴퓨터에서는 영상을 만들 수 없어요. 앱을 업데이트해 보세요.",
  "Gioco": "플레이",
  "Preparo il video… {p}%": "영상 만드는 중… {p}%",
  "video pronto: controlla i download": "영상 준비 완료: 다운로드 폴더를 확인하세요",
  "Il video non è riuscito: ": "영상을 만들지 못했어요: ",
  "Chiudere senza salvare? Le modifiche a questo gioco si perdono.": "저장하지 않고 닫을까요? 이 플레이의 변경 사항이 사라져요.",
  "Chiudi senza salvare": "저장하지 않고 닫기",
  "Dai un nome al gioco prima di salvare.": "저장하기 전에 플레이 이름을 입력하세요.",
  "Salvo…": "저장 중…",
  "Non sono riuscito a salvare: ": "저장하지 못했어요: ",
  "▶ Anima": "▶ 애니메이션",
  "motore VDM": "VDM 엔진",
  "↺ Di nuovo": "↺ 다시",
  "Conferma": "확인",
  "Servono almeno due fasi per fare un video.": "영상을 만들려면 최소 두 단계가 필요해요.",
  "Questo computer non riesce a creare video H.264.": "이 컴퓨터에서는 H.264 영상을 만들 수 없어요.",
  "Questo computer non riesce a fare il video con il campo inclinato (WebGL non disponibile).": "이 컴퓨터에서는 기울어진 코트로 영상을 만들 수 없어요 (WebGL 사용 불가).",
  "Fase {n} di {tot}": "단계 {n}/{tot}",
  "<strong>Taglio:</strong> clic sulla giocatrice, poi clic sul percorso (i punti in mezzo fanno la curva) · doppio clic per finire": "<strong>컷:</strong> 선수를 클릭한 다음 경로를 따라 클릭 (중간 점이 곡선을 만들어요) · 더블클릭으로 완료",
  "<strong>Palleggio:</strong> clic sul numero cerchiato, poi clic sul percorso · doppio clic per finire": "<strong>드리블:</strong> 동그라미 친 번호를 클릭한 다음 경로를 따라 클릭 · 더블클릭으로 완료",
  "<strong>Blocco:</strong> clic sulla giocatrice, poi dove va a bloccare · doppio clic per finire · doppio clic sul numero = blocco da ferma · dopo il blocco, Taglio sulla stessa giocatrice = si butta dentro o si apre": "<strong>스크린:</strong> 선수를 클릭한 다음 스크린 걸 위치를 클릭 · 더블클릭으로 완료 · 번호를 더블클릭 = 제자리 스크린 · 스크린 후 같은 선수에게 컷 = 롤 또는 팝",
  "<strong>Gomma:</strong> clic su una giocatrice per togliere le sue azioni in questo tempo": "<strong>지우개:</strong> 선수를 클릭해 이 단계의 동작 삭제",
  "<strong>Passaggio:</strong> clic sul numero cerchiato, poi clic su chi riceve": "<strong>패스:</strong> 동그라미 친 번호를 클릭한 다음 받을 선수를 클릭",
  "<strong>Tiro:</strong> clicca chi tira": "<strong>슛:</strong> 슛하는 선수를 클릭",
  "<strong>Palla:</strong> clic su un numero: lo cerchia, all'inizio del tempo la palla ce l'ha lei": "<strong>공:</strong> 번호를 클릭해 동그라미 표시: 단계 시작 시 이 선수가 공을 가져요",
  "chi ha la palla (numero cerchiato) non blocca: palleggia o passa": "공을 가진 선수(동그라미 친 번호)는 스크린을 걸지 않아요: 드리블하거나 패스해요",
  "palleggia solo chi ha la palla (numero cerchiato): questo è diventato un taglio": "공을 가진 선수(동그라미 친 번호)만 드리블해요: 컷으로 바뀌었어요",
  "passa solo chi ha la palla: parti dal numero cerchiato": "공을 가진 선수만 패스해요: 동그라미 친 번호에서 시작하세요",
  "palleggia solo chi ha la palla (numero cerchiato): questo è un taglio": "공을 가진 선수(동그라미 친 번호)만 드리블해요: 이것은 컷이에요",
  "nessuna ha la palla: clicca una giocatrice e «Dai la palla»": "공을 가진 선수가 없어요: 선수를 클릭하고 «공 주기»를 누르세요",
  "prima disegna almeno un'azione in questo tempo": "먼저 이 단계에서 동작을 하나 이상 그리세요",
  "parti da chi ha la palla: il numero cerchiato o la fine del suo palleggio": "공을 가진 선수에서 시작하세요: 동그라미 친 번호 또는 드리블이 끝난 지점",
  "parti da una giocatrice: clic sul suo numero": "선수에서 시작하세요: 번호를 클릭",
  "Attaccante": "공격 선수",
  "Difensore": "수비 선수",
  "Cono": "콘",
  "Allenatore": "코치",
  "attaccata alla giocatrice": "선수에 붙임",
  "ferma sul campo": "코트에 고정",
  "giallo": "노랑",
  "ciano": "청록",
  "rosso": "빨강",
  "verde": "초록",
  "bianco": "흰색",
  "{n} fase": "{n}단계",
  "{n} fasi": "{n}단계",
  "video pronto: è anche fra le clip (Video)": "영상 준비 완료: 클립에도 있어요 (영상)"
 }
};

/* le scritte della sezione e delle card (le chiavi come in innesto.js) */
const SEZIONE_LINGUE = {
 es: {
  "titolo": "🎬 Playbook animado 3D",
  "vai": "🎬 Playbook animado 3D",
  "vaiTitolo": "Tus jugadas animadas, en 2D y 3D",
  "nuovo": "+ Nueva jugada animada",
  "spiega": "Las jugadas de tu Playbook, animadas: jugadoras en 3D, canasta, cortes, botes, bloqueos y pases en movimiento, y un vídeo para enviar a tu equipo. El Playbook y sus impresiones quedan como están.",
  "vuoto": "Aún no hay jugadas animadas. Crea una nueva, o abre un esquema del Playbook y pulsa «✨ Animar en 3D».",
  "anima": "✨ Animar en 3D",
  "animaTitolo": "Abre las 4 casillas de esta jugada en el Playbook animado 3D (tu dibujo no cambia)",
  "modifica": "✏️ Editar",
  "schema": "↩︎ Esquema del Playbook",
  "rifai": "🔄 Rehacer desde el esquema",
  "elimina": "🗑",
  "eliminaDomanda": "¿Eliminar la jugada animada \"{nome}\"? El esquema del Playbook se mantiene.",
  "rifaiDomanda": "¿Rehacer \"{nome}\" desde las casillas del Playbook? Los cambios hechos en la jugada animada se perderán.",
  "senzaDisegno": "Esta jugada aún no tiene jugadoras dibujadas: dibuja la primera casilla e inténtalo de nuevo.",
  "attacco": "⚡ Ataque",
  "difesa": "🛡️ Defensa",
  "senzaNome": "(sin nombre)",
  "tempi": "{n} fases",
  "daSchema": "del Playbook",
  "clipFatta": "🎥 «{nome}» ya está en tus clips (sección Video)"
 },
 fr: {
  "titolo": "🎬 Playbook animé 3D",
  "vai": "🎬 Playbook animé 3D",
  "vaiTitolo": "Tes systèmes animés, en 2D et en 3D",
  "nuovo": "+ Nouveau système animé",
  "spiega": "Les systèmes de ton Playbook, animés : joueuses en 3D, panier, coupes, dribbles, écrans et passes en mouvement, et une vidéo à envoyer à ton équipe. Le Playbook et ses impressions restent tels quels.",
  "vuoto": "Aucun système animé pour l'instant. Crées-en un nouveau, ou ouvre un schéma du Playbook et appuie sur « ✨ Animer en 3D ».",
  "anima": "✨ Animer en 3D",
  "animaTitolo": "Ouvre les 4 cases de ce système dans le Playbook animé 3D (ton dessin n'est pas modifié)",
  "modifica": "✏️ Modifier",
  "schema": "↩︎ Schéma du Playbook",
  "rifai": "🔄 Refaire depuis le schéma",
  "elimina": "🗑",
  "eliminaDomanda": "Supprimer le système animé \"{nome}\" ? Le schéma du Playbook reste.",
  "rifaiDomanda": "Refaire \"{nome}\" à partir des cases du Playbook ? Les modifications faites dans le système animé seront perdues.",
  "senzaDisegno": "Ce système n'a pas encore de joueuses dessinées : dessine la première case et réessaie.",
  "attacco": "⚡ Attaque",
  "difesa": "🛡️ Défense",
  "senzaNome": "(sans nom)",
  "tempi": "{n} étapes",
  "daSchema": "du Playbook",
  "clipFatta": "🎥 « {nome} » est maintenant dans tes séquences (section Vidéo)"
 },
 zh: {
  "titolo": "🎬 3D 动画战术板",
  "vai": "🎬 3D 动画战术板",
  "vaiTitolo": "你的动画战术，2D 和 3D",
  "nuovo": "+ 新建动画战术",
  "spiega": "让战术板里的战术动起来：3D 球员、篮筐，空切、运球、掩护和传球都在移动，还能生成视频发给球队。战术板和打印稿保持不变。",
  "vuoto": "还没有动画战术。新建一个，或打开一张战术板的战术图并点击「✨ 3D 动画」。",
  "anima": "✨ 3D 动画",
  "animaTitolo": "在 3D 动画战术板中打开这个战术的 4 个格子（原图不会改变）",
  "modifica": "✏️ 编辑",
  "schema": "↩︎ 战术板战术图",
  "rifai": "🔄 根据战术图重建",
  "elimina": "🗑",
  "eliminaDomanda": "删除动画战术“{nome}”？战术板里的战术图会保留。",
  "rifaiDomanda": "根据战术板的格子重建“{nome}”？在动画战术中做的修改将会丢失。",
  "senzaDisegno": "这个战术还没有画上球员：先画第一个格子，再试一次。",
  "attacco": "⚡ 进攻",
  "difesa": "🛡️ 防守",
  "senzaNome": "（未命名）",
  "tempi": "{n} 步",
  "daSchema": "来自战术板",
  "clipFatta": "🎥 “{nome}”已加入片段（视频板块）"
 },
 ru: {
  "titolo": "🎬 Анимированный 3D-плейбук",
  "vai": "🎬 Анимированный 3D-плейбук",
  "vaiTitolo": "Твои анимированные комбинации в 2D и 3D",
  "nuovo": "+ Новая анимированная комбинация",
  "spiega": "Комбинации из Плейбука в движении: игроки в 3D, кольцо, рывки, ведение, заслоны и передачи, а также видео для команды. Плейбук и его распечатки остаются без изменений.",
  "vuoto": "Пока нет анимированных комбинаций. Создай новую или открой схему в Плейбуке и нажми «✨ Анимировать в 3D».",
  "anima": "✨ Анимировать в 3D",
  "animaTitolo": "Открывает 4 клетки этой комбинации в Анимированном 3D-плейбуке (твой рисунок не меняется)",
  "modifica": "✏️ Редактировать",
  "schema": "↩︎ Схема в Плейбуке",
  "rifai": "🔄 Пересоздать по схеме",
  "elimina": "🗑",
  "eliminaDomanda": "Удалить анимированную комбинацию «{nome}»? Схема в Плейбуке останется.",
  "rifaiDomanda": "Пересоздать «{nome}» по клеткам Плейбука? Изменения в анимированной комбинации будут потеряны.",
  "senzaDisegno": "В этой комбинации ещё нет нарисованных игроков: нарисуй первую клетку и попробуй снова.",
  "attacco": "⚡ Атака",
  "difesa": "🛡️ Защита",
  "senzaNome": "(без названия)",
  "tempi": "Шагов: {n}",
  "daSchema": "из Плейбука",
  "clipFatta": "🎥 «{nome}» теперь среди фрагментов в разделе Видео"
 },
 de: {
  "titolo": "🎬 Animiertes 3D-Playbook",
  "vai": "🎬 Animiertes 3D-Playbook",
  "vaiTitolo": "Deine animierten Spielzüge, in 2D und 3D",
  "nuovo": "+ Neuer animierter Spielzug",
  "spiega": "Die Spielzüge aus deinem Playbook, animiert: Spielerinnen in 3D, Korb, Schnitte, Dribblings, Blocks und Pässe in Bewegung, und ein Video für dein Team. Das Playbook und seine Ausdrucke bleiben, wie sie sind.",
  "vuoto": "Noch keine animierten Spielzüge. Leg einen neuen an oder öffne ein Playbook-Diagramm und drück «✨ In 3D animieren».",
  "anima": "✨ In 3D animieren",
  "animaTitolo": "Öffnet die 4 Kästchen dieses Spielzugs im animierten 3D-Playbook (deine Zeichnung bleibt unverändert)",
  "modifica": "✏️ Bearbeiten",
  "schema": "↩︎ Playbook-Diagramm",
  "rifai": "🔄 Aus Diagramm neu erstellen",
  "elimina": "🗑",
  "eliminaDomanda": "Animierten Spielzug \"{nome}\" löschen? Das Playbook-Diagramm bleibt erhalten.",
  "rifaiDomanda": "\"{nome}\" aus den Playbook-Kästchen neu erstellen? Die Änderungen im animierten Spielzug gehen verloren.",
  "senzaDisegno": "Dieser Spielzug hat noch keine gezeichneten Spielerinnen: zeichne das erste Kästchen und versuch es nochmal.",
  "attacco": "⚡ Angriff",
  "difesa": "🛡️ Verteidigung",
  "senzaNome": "(ohne Namen)",
  "tempi": "{n} Phasen",
  "daSchema": "aus dem Playbook",
  "clipFatta": "🎥 „{nome}“ ist jetzt bei deinen Clips (Bereich Video)"
 },
 lt: {
  "titolo": "🎬 Animuota 3D žaidimų knyga",
  "vai": "🎬 Animuota 3D žaidimų knyga",
  "vaiTitolo": "Jūsų animuoti deriniai, 2D ir 3D",
  "nuovo": "+ Naujas animuotas derinys",
  "spiega": "Jūsų žaidimų knygos deriniai, animuoti: 3D žaidėjos, krepšys, kirtimai, vedimai, užstojimai ir perdavimai judesyje, ir vaizdo įrašas, kurį galite nusiųsti komandai. Žaidimų knyga ir jos spaudiniai lieka tokie, kokie yra.",
  "vuoto": "Animuotų derinių dar nėra. Sukurkite naują arba atidarykite žaidimų knygos schemą ir paspauskite «✨ Animuoti 3D».",
  "anima": "✨ Animuoti 3D",
  "animaTitolo": "Atidaro 4 šio derinio langelius animuotoje 3D žaidimų knygoje (jūsų piešinys nepakeičiamas)",
  "modifica": "✏️ Redaguoti",
  "schema": "↩︎ Žaidimų knygos schema",
  "rifai": "🔄 Atkurti iš schemos",
  "elimina": "🗑",
  "eliminaDomanda": "Ištrinti animuotą derinį \"{nome}\"? Žaidimų knygos schema lieka.",
  "rifaiDomanda": "Atkurti \"{nome}\" iš žaidimų knygos langelių? Animuotame derinyje atlikti pakeitimai bus prarasti.",
  "senzaDisegno": "Šiame derinyje dar nėra nupieštų žaidėjų: nupieškite pirmą langelį ir bandykite dar kartą.",
  "attacco": "⚡ Puolimas",
  "difesa": "🛡️ Gynyba",
  "senzaNome": "(be pavadinimo)",
  "tempi": "Žingsniai: {n}",
  "daSchema": "iš žaidimų knygos",
  "clipFatta": "🎥 «{nome}» dabar yra tarp jūsų klipų (skyrius Vaizdo įrašas)"
 },
 pl: {
  "titolo": "🎬 Animowane schematy gry 3D",
  "vai": "🎬 Animowane schematy gry 3D",
  "vaiTitolo": "Twoje animowane zagrywki w 2D i 3D",
  "nuovo": "+ Nowa animowana zagrywka",
  "spiega": "Zagrywki ze Schematów gry w ruchu: zawodniczki w 3D, kosz, ścięcia, kozłowanie, zasłony i podania, a do tego wideo do wysłania drużynie. Schematy gry i ich wydruki zostają bez zmian.",
  "vuoto": "Brak animowanych zagrywek. Utwórz nową albo otwórz schemat w Schematach gry i naciśnij «✨ Animuj w 3D».",
  "anima": "✨ Animuj w 3D",
  "animaTitolo": "Otwiera 4 pola tej zagrywki w Animowanych schematach gry 3D (Twój rysunek się nie zmienia)",
  "modifica": "✏️ Edytuj",
  "schema": "↩︎ Schemat gry",
  "rifai": "🔄 Utwórz ponownie ze schematu",
  "elimina": "🗑",
  "eliminaDomanda": "Usunąć animowaną zagrywkę «{nome}»? Schemat w Schematach gry zostaje.",
  "rifaiDomanda": "Utworzyć «{nome}» ponownie z pól schematu? Zmiany wprowadzone w animowanej zagrywce zostaną utracone.",
  "senzaDisegno": "Ta zagrywka nie ma jeszcze narysowanych zawodniczek: narysuj pierwsze pole i spróbuj ponownie.",
  "attacco": "⚡ Atak",
  "difesa": "🛡️ Obrona",
  "senzaNome": "(bez nazwy)",
  "tempi": "Kroki: {n}",
  "daSchema": "ze Schematów gry",
  "clipFatta": "🎥 «{nome}» jest już wśród klipów w sekcji Wideo"
 },
 ja: {
  "titolo": "🎬 3D アニメーションプレイブック",
  "vai": "🎬 3D アニメーションプレイブック",
  "vaiTitolo": "アニメーションプレー（2D・3D）",
  "nuovo": "+ 新しいアニメーションプレー",
  "spiega": "プレイブックのプレーをアニメーションに：3Dの選手、ゴール、カット・ドリブル・スクリーン・パスが動き、チームに送るビデオも作れます。プレイブックと印刷物はそのままです。",
  "vuoto": "アニメーションプレーはまだありません。新しく作るか、プレイブックの図を開いて「✨ 3D アニメーション」を押してください。",
  "anima": "✨ 3D アニメーション",
  "animaTitolo": "このプレーの4つのマスを 3D アニメーションプレイブックで開きます（元の図は変更されません）",
  "modifica": "✏️ 編集",
  "schema": "↩︎ プレイブックの図",
  "rifai": "🔄 図から作り直す",
  "elimina": "🗑",
  "eliminaDomanda": "アニメーションプレー「{nome}」を削除しますか？プレイブックの図は残ります。",
  "rifaiDomanda": "プレイブックのマスから「{nome}」を作り直しますか？アニメーションプレーで行った変更は失われます。",
  "senzaDisegno": "このプレーにはまだ選手が描かれていません。最初のマスを描いてから、もう一度試してください。",
  "attacco": "⚡ オフェンス",
  "difesa": "🛡️ ディフェンス",
  "senzaNome": "（名前なし）",
  "tempi": "{n} ステップ",
  "daSchema": "プレイブックから",
  "clipFatta": "🎥 「{nome}」をクリップに追加しました（ビデオ）"
 },
 pt: {
  "titolo": "🎬 Plano de Jogo animado 3D",
  "vai": "🎬 Plano de Jogo animado 3D",
  "vaiTitolo": "As suas jogadas animadas, em 2D e 3D",
  "nuovo": "+ Nova jogada animada",
  "spiega": "As jogadas do seu Plano de Jogo, animadas: jogadoras em 3D, cesto, cortes, dribles, bloqueios e passes em movimento, e um vídeo para enviar à equipa. O Plano de Jogo e as impressões ficam como estão.",
  "vuoto": "Ainda não há jogadas animadas. Crie uma nova, ou abra um esquema do Plano de Jogo e carregue em «✨ Animar em 3D».",
  "anima": "✨ Animar em 3D",
  "animaTitolo": "Abre as 4 casas desta jogada no Plano de Jogo animado 3D (o seu desenho não é alterado)",
  "modifica": "✏️ Editar",
  "schema": "↩︎ Esquema do Plano de Jogo",
  "rifai": "🔄 Refazer a partir do esquema",
  "elimina": "🗑",
  "eliminaDomanda": "Eliminar a jogada animada \"{nome}\"? O esquema do Plano de Jogo mantém-se.",
  "rifaiDomanda": "Refazer \"{nome}\" a partir das casas do Plano de Jogo? As alterações feitas na jogada animada perdem-se.",
  "senzaDisegno": "Esta jogada ainda não tem jogadoras desenhadas: desenhe a primeira casa e tente de novo.",
  "attacco": "⚡ Ataque",
  "difesa": "🛡️ Defesa",
  "senzaNome": "(sem nome)",
  "tempi": "{n} fases",
  "daSchema": "do Plano de Jogo",
  "clipFatta": "🎥 «{nome}» já está nos seus clips (secção Vídeo)"
 },
 ko: {
  "titolo": "🎬 3D 애니메이션 전술판",
  "vai": "🎬 3D 애니메이션 전술판",
  "vaiTitolo": "애니메이션 플레이, 2D와 3D로",
  "nuovo": "+ 새 애니메이션 플레이",
  "spiega": "전술판의 플레이를 애니메이션으로: 3D 선수, 골대, 컷, 드리블, 스크린, 패스가 움직이고, 팀에 보낼 영상도 만들 수 있어요. 전술판과 인쇄물은 그대로 유지돼요.",
  "vuoto": "아직 애니메이션 플레이가 없어요. 새로 만들거나, 전술판 다이어그램을 열고 «✨ 3D 애니메이션»을 누르세요.",
  "anima": "✨ 3D 애니메이션",
  "animaTitolo": "이 플레이의 4칸을 3D 애니메이션 전술판에서 열어요 (그림은 바뀌지 않아요)",
  "modifica": "✏️ 편집",
  "schema": "↩︎ 전술판 다이어그램",
  "rifai": "🔄 다이어그램에서 다시 만들기",
  "elimina": "🗑",
  "eliminaDomanda": "애니메이션 플레이 \"{nome}\"을(를) 삭제할까요? 전술판 다이어그램은 남아요.",
  "rifaiDomanda": "전술판 칸에서 \"{nome}\"을(를) 다시 만들까요? 애니메이션 플레이에서 바꾼 내용은 사라져요.",
  "senzaDisegno": "이 플레이에는 아직 그려진 선수가 없어요: 첫 번째 칸을 그린 후 다시 시도하세요.",
  "attacco": "⚡ 공격",
  "difesa": "🛡️ 수비",
  "senzaNome": "(이름 없음)",
  "tempi": "{n}단계",
  "daSchema": "전술판에서",
  "clipFatta": "🎥 «{nome}»이(가) 영상 섹션의 클립에 추가됐어요"
 }
};

return { INGLESE, ALTRE_LINGUE, SEZIONE_LINGUE };
})();
/* ---- integrazioni/vdm-basket/innesto.js ---- */
const __vdm_integrazioni_vdm_basket_innesto_js = (function(){
/* Il collante con VDM Basketball Coach: il «Playbook animato 3D».
 *
 * VDM Basketball e' un programma in vendita: il suo Playbook e le sue stampe
 * non si toccano. Il motore entra da fuori, con un file suo
 * (src/renderer/vdm-motore.js) e una riga sola in index.html:
 *  - sotto il Playbook compare una sezione nuova, «Playbook animato 3D», con
 *    i giochi animati (anteprima, modifica, elimina);
 *  - in cima al Playbook un pulsante porta a quella sezione;
 *  - nell'editor di uno schema, «✨ Anima in 3D» prende le 4 caselle del
 *    gioco e le apre nel motore come gioco animato; il disegno resta com'e'.
 *
 * I giochi animati stanno accanto alle righe del Playbook: team.playbook3D
 * (o DB.scratchPlaybook3D senza squadra), con origine = id della riga da
 * cui vengono. Viaggiano da soli nel salvataggio, nel file .vdm, in
 * esporta/importa e nella cartella condivisa. La stampa non li legge. */

const { Lavagna } = __vdm_integrazioni_italbasket_lavagna_js;
const { montaAnteprima } = __vdm_integrazioni_italbasket_anteprima_js;
const { convertiRiga } = __vdm_integrazioni_vdm_basket_converti_js;
const { impostaLingua } = __vdm_src_renderer_core_lingua_js;
const { INGLESE, ALTRE_LINGUE, SEZIONE_LINGUE } = __vdm_integrazioni_vdm_basket_lingue_js;

/* la lavagna parla la lingua dell'app (le 12 dell'app; se manca una frase: inglese) */
function linguaDellApp(){
  let l = 'en';
  try { if (typeof currentLang !== 'undefined' && currentLang) l = currentLang; } catch (e) {}
  impostaLingua(l, Object.assign({en: INGLESE}, ALTRE_LINGUE));
}

/* ---------- le scritte: italiano e inglese qui, le altre lingue in lingue.js ---------- */
const SCRITTE = {
  it: {
    titolo: '🎬 Playbook animato 3D',
    vai: '🎬 Playbook animato 3D',
    vaiTitolo: 'I giochi animati, in 2D e in 3D',
    nuovo: '+ Nuovo gioco animato',
    spiega: 'I giochi del Playbook, animati: giocatrici in 3D, canestro, tagli, palleggi, blocchi e passaggi in movimento, e il video da mandare alla squadra. Il Playbook e le stampe restano come sono.',
    vuoto: 'Nessun gioco animato. Crea un gioco nuovo, oppure apri uno schema del Playbook e premi «✨ Anima in 3D».',
    anima: '✨ Anima in 3D',
    animaTitolo: 'Apre le 4 caselle di questo gioco nel Playbook animato 3D (il disegno resta com\'e\')',
    modifica: '✏️ Modifica',
    schema: '↩︎ Schema del Playbook',
    rifai: '🔄 Rifai dallo schema',
    elimina: '🗑',
    eliminaDomanda: 'Eliminare il gioco animato "{nome}"? Lo schema del Playbook resta.',
    rifaiDomanda: 'Rifare "{nome}" dalle caselle del Playbook? Le modifiche fatte nel gioco animato si perdono.',
    senzaDisegno: 'Questo gioco non ha ancora giocatrici disegnate: disegna la prima casella e riprova.',
    attacco: '⚡ Attacco', difesa: '🛡️ Difesa',
    senzaNome: '(senza nome)',
    tempi: '{n} tempi',
    daSchema: 'dal Playbook',
    clipFatta: '🎥 «{nome}» è fra le clip nella sezione Video'
  },
  en: {
    titolo: '🎬 Animated 3D Playbook',
    vai: '🎬 Animated 3D Playbook',
    vaiTitolo: 'Your animated plays, in 2D and 3D',
    nuovo: '+ New animated play',
    spiega: 'Your Playbook plays, animated: 3D players, basket, cuts, dribbles, screens and passes in motion, and a video to send to your team. The Playbook and its printouts stay as they are.',
    vuoto: 'No animated plays yet. Create a new one, or open a Playbook diagram and press «✨ Animate in 3D».',
    anima: '✨ Animate in 3D',
    animaTitolo: 'Opens the 4 boxes of this play in the Animated 3D Playbook (your drawing is not changed)',
    modifica: '✏️ Edit',
    schema: '↩︎ Playbook diagram',
    rifai: '🔄 Rebuild from diagram',
    elimina: '🗑',
    eliminaDomanda: 'Delete the animated play "{nome}"? The Playbook diagram stays.',
    rifaiDomanda: 'Rebuild "{nome}" from the Playbook boxes? Changes made in the animated play will be lost.',
    senzaDisegno: 'This play has no players drawn yet: draw the first box and try again.',
    attacco: '⚡ Offense', difesa: '🛡️ Defense',
    senzaNome: '(untitled)',
    tempi: '{n} steps',
    daSchema: 'from Playbook',
    clipFatta: '🎥 "{nome}" is now in your clips (Video section)'
  }
};
function scritta(chiave, valori){
  let lingua = 'en';
  try { if (typeof currentLang !== 'undefined' && currentLang) lingua = currentLang; } catch (e) {}
  const d = SCRITTE[lingua] || SEZIONE_LINGUE[lingua] || {};
  let s = d[chiave] || SCRITTE.en[chiave] || chiave;
  Object.keys(valori || {}).forEach(function(k){ s = s.split('{' + k + '}').join(valori[k]); });
  return s;
}
function testo(s){ const d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML; }

/* ---------- l'app: solo letture e il salvataggio ---------- */
function squadra(){ try { return typeof activeTeam === 'function' ? activeTeam() : null; } catch (e) { return null; } }
function giochi(crea){
  const t = squadra();
  if (t){
    if (!Array.isArray(t.playbook3D)){ if (!crea) return []; t.playbook3D = []; }
    return t.playbook3D;
  }
  if (typeof DB === 'undefined' || !DB) return [];
  if (!Array.isArray(DB.scratchPlaybook3D)){ if (!crea) return []; DB.scratchPlaybook3D = []; }
  return DB.scratchPlaybook3D;
}
function righe(){ try { return typeof activePlaybookRows === 'function' ? activePlaybookRows() : []; } catch (e) { return []; } }
function salva(){ try { if (typeof scheduleAutosave === 'function') scheduleAutosave(); } catch (e) {} }
function avvisa(msg){ try { if (typeof toast === 'function') { toast(msg); return; } } catch (e) {} alert(msg); }
function nuovoId(){ return 'pb3d_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

/* Il video del gioco animato diventa anche una clip di VDM Basketball
 * (sezione Video / Edit Video), come un video aggiunto da fuori
 * (aggiungiClipEsterna): stessa sessione, stessa squadra, un tag che copre
 * tutto il filmato col nome del gioco. Nell'app installata il file va nella
 * cartella dei video di VDM; nel browser, nel suo archivio. */
async function salvaComeClip(blob, file){
  if (typeof vt === 'undefined' || !vt || !Array.isArray(vt.clips)) return false;
  try {
    if (typeof limite === 'function' && vt.clips.length >= limite('video')){
      if (typeof bloccoBeta === 'function' && typeof LIMITI_BETA !== 'undefined') bloccoBeta(t('beta.limitVideos', {n: LIMITI_BETA.video}));
      return false;
    }
  } catch (e) {}
  const nativo = typeof NATIVO !== 'undefined' && NATIVO;
  const team = squadra();
  sistemaSessioni();
  if (!sessioneAttiva() || sessioneAttiva().archiviata) nuovaSessione('', team ? team.id : null);
  const ses = sessioneAttiva();
  const clipId = nextId('clip'), tagId = nextId('tag');
  const clip = {
    id: clipId, name: file, url: '', percorsoDisco: '',
    teamId: team ? team.id : null, lastPosition: 0, duration: 0,
    sessionId: ses ? ses.id : null, playbook3D: true,
    tags: []
  };
  vt.clips.push(clip);
  let ok = false;
  try {
    ok = await videoBlobDbSave(clipId, blob, file);
    if (ok && nativo){
      const percorso = await window.VDM.video.percorso(clipId);
      if (percorso){ clip.percorsoDisco = percorso; clip.url = urlDaPercorso(percorso); }
      else ok = false;
    } else if (ok){
      clip.url = URL.createObjectURL(blob);
    }
    const durata = ok ? await pvDurataVideo(clip.url) : 0;
    if (!durata) ok = false;
    clip.duration = durata || 0;
    clip.tags.push({id: tagId, start: 0, end: durata, side: (document.getElementById('vlSezione') || {}).value === '1' ? 'difesa' : 'attacco',
                    label: String(file).replace(/\.[^.]+$/, ''), playerId: null, playerLabel: '', indiv: true, fx: []});
  } catch (e) { console.error('clip del gioco animato:', e); ok = false; }
  if (!ok){
    const i = vt.clips.indexOf(clip);
    if (i >= 0) vt.clips.splice(i, 1);
    return false;
  }
  salva();
  avvisa(scritta('clipFatta', {nome: String(file).replace(/\.[^.]+$/, '')}));
  return true;
}

const lavagna = Lavagna({marchio: 'VDM BASKETBALL COACH', alVideo: salvaComeClip});
const SEZIONI = function(){ return [scritta('attacco'), scritta('difesa')]; };

function apri(voce, gioco){
  linguaDellApp();
  lavagna.apri({
    nome: voce ? voce.nome || '' : '', descrizione: voce ? voce.descrizione || '' : '', note: voce ? voce.note || '' : '',
    sezioni: SEZIONI(), sezione: voce && voce.gruppo === 'difesa' ? 1 : 0, squadre: [],
    gioco: gioco || (voce && voce.gioco) || null,
    alSalva: function(r){
      const elenco = giochi(true);
      let qui = voce ? elenco.find(function(v){ return v.id === voce.id; }) : null;
      if (!qui){
        qui = {id: voce && voce.id || nuovoId(), creato: Date.now()};
        if (voce && voce.origine) qui.origine = voce.origine;
        elenco.push(qui);
      }
      /* le immagini dei tempi (r.diagrammi) non si tengono: peserebbero sul
         salvataggio, e l'anteprima si ridisegna dal gioco */
      Object.assign(qui, {nome: r.nome, descrizione: r.descrizione, note: r.note,
                          gruppo: r.sezione === 1 ? 'difesa' : 'attacco', gioco: r.gioco, modificato: Date.now()});
      voce = qui;
      salva();
      disegnaSezione();
    }
  });
}

/* dall'editor del Playbook: il gioco (riga) aperto adesso */
function animaRigaAperta(){
  let rigaId = null;
  try { rigaId = typeof pbEditingRowId !== 'undefined' ? pbEditingRowId : null; } catch (e) {}
  const riga = righe().find(function(r){ return r.id === rigaId; });
  if (!riga) return;
  const gia = giochi(false).find(function(v){ return v.origine === riga.id; });
  if (gia){ apri(gia); return; }
  linguaDellApp();
  const gioco = convertiRiga(riga);
  if (!gioco){ avvisa(scritta('senzaDisegno')); return; }
  apri({id: nuovoId(), nome: riga.nome || '', gruppo: riga.gruppo === 'difesa' ? 'difesa' : 'attacco', origine: riga.id}, gioco);
}

function vaiAlloSchema(rigaId){
  try {
    if (typeof togglePlaybookSlotExpand === 'function'){ togglePlaybookSlotExpand(rigaId, 0); return; }
  } catch (e) { console.error(e); }
  const el = document.querySelector('.pb-row[data-row-id="' + rigaId + '"]');
  if (el) el.scrollIntoView({block: 'start'});
}

/* ---------- la sezione «Playbook animato 3D» ---------- */
function carta(){
  let c = document.getElementById('vdm3dCard');
  if (c) return c;
  const sezione = document.getElementById('playbookSection');
  const prima = sezione && sezione.querySelector(':scope > .card');
  if (!prima) return null;
  c = document.createElement('div');
  c.className = 'card vdm3d-card';
  c.id = 'vdm3dCard';
  prima.insertAdjacentElement('afterend', c);
  return c;
}

function disegnaSezione(){
  linguaDellApp();
  const c = carta();
  if (!c) return;
  const elenco = giochi(false);
  const tutte = righe();
  let html = '<div class="vdm3d-testa"><h2>' + testo(scritta('titolo')) + '</h2>' +
    '<button class="btn small primary vdm3d-nuovo" type="button">' + testo(scritta('nuovo')) + '</button></div>' +
    '<div class="diagram-hint vdm3d-spiega">' + testo(scritta('spiega')) + '</div>';
  if (!elenco.length){
    html += '<div class="vdm3d-vuoto">' + testo(scritta('vuoto')) + '</div>';
  } else {
    html += '<div class="vdm3d-griglia">' + elenco.map(function(v){
      const riga = v.origine ? tutte.find(function(r){ return r.id === v.origine; }) : null;
      const n = v.gioco && v.gioco.fasi ? v.gioco.fasi.length : 0;
      return '<div class="vdm3d-gioco" data-id="' + testo(v.id) + '">' +
        '<div class="vdm3d-nome"><span class="vdm3d-tag vdm3d-' + (v.gruppo === 'difesa' ? 'dif' : 'att') + '">' +
          testo(scritta(v.gruppo === 'difesa' ? 'difesa' : 'attacco')) + '</span> <b>' + testo(v.nome || scritta('senzaNome')) + '</b>' +
          ' <span class="vdm3d-info">' + testo(scritta('tempi', {n: n})) + (riga ? ' · ' + testo(scritta('daSchema')) : '') + '</span></div>' +
        '<div class="vdm3d-anteprima"></div>' +
        '<div class="vdm3d-bottoni">' +
          '<button class="btn small" type="button" data-fai="modifica">' + testo(scritta('modifica')) + '</button>' +
          (riga ? '<button class="btn small" type="button" data-fai="schema">' + testo(scritta('schema')) + '</button>' +
                  '<button class="btn small" type="button" data-fai="rifai">' + testo(scritta('rifai')) + '</button>' : '') +
          '<button class="btn small danger" type="button" data-fai="elimina" title="' + testo(scritta('elimina')) + '">' + testo(scritta('elimina')) + '</button>' +
        '</div></div>';
    }).join('') + '</div>';
  }
  c.innerHTML = html;
  c.querySelector('.vdm3d-nuovo').onclick = function(){ apri(null, null); };
  c.querySelectorAll('.vdm3d-gioco').forEach(function(box){
    const v = elenco.find(function(x){ return x.id === box.dataset.id; });
    if (!v) return;
    try { montaAnteprima(box.querySelector('.vdm3d-anteprima'), v.gioco); } catch (e) { console.error(e); }
    box.querySelectorAll('[data-fai]').forEach(function(b){
      b.onclick = function(){
        const fai = b.dataset.fai;
        if (fai === 'modifica') apri(v);
        else if (fai === 'schema') vaiAlloSchema(v.origine);
        else if (fai === 'rifai'){
          const riga = righe().find(function(r){ return r.id === v.origine; });
          const gioco = riga ? convertiRiga(riga) : null;
          if (!gioco){ avvisa(scritta('senzaDisegno')); return; }
          if (!confirm(scritta('rifaiDomanda', {nome: v.nome || scritta('senzaNome')}))) return;
          if (v.gioco && v.gioco.vista) gioco.vista = v.gioco.vista;
          apri(v, gioco);
        } else if (fai === 'elimina'){
          if (!confirm(scritta('eliminaDomanda', {nome: v.nome || scritta('senzaNome')}))) return;
          const lista = giochi(false);
          const i = lista.indexOf(v);
          if (i >= 0) lista.splice(i, 1);
          salva();
          disegnaSezione();
        }
      };
    });
  });
}

/* ---------- i due pulsanti nel Playbook ---------- */
function pulsanti(){
  const sezione = document.getElementById('playbookSection');
  if (!sezione) return;
  if (!document.getElementById('vdm3dVai')){
    const stampa = sezione.querySelector('button[onclick="printPlaybookSheet()"]');
    if (stampa){
      const b = document.createElement('button');
      b.id = 'vdm3dVai'; b.type = 'button'; b.className = 'btn small vdm3d-vai';
      b.onclick = function(){ const c = carta(); if (c) c.scrollIntoView({block: 'start', behavior: 'smooth'}); };
      stampa.insertAdjacentElement('afterend', b);
    }
  }
  const vai = document.getElementById('vdm3dVai');
  if (vai){ vai.textContent = scritta('vai'); vai.title = scritta('vaiTitolo'); }
  if (!document.getElementById('vdm3dAnima')){
    const testa = document.querySelector('#pbEditorPanel .pb-editor-head');
    const chiudi = testa && testa.querySelector('button[onclick="collapsePlaybookEditor()"]');
    if (testa){
      const b = document.createElement('button');
      b.id = 'vdm3dAnima'; b.type = 'button'; b.className = 'btn small vdm3d-anima';
      b.onclick = animaRigaAperta;
      if (chiudi) chiudi.insertAdjacentElement('beforebegin', b); else testa.appendChild(b);
    }
  }
  const anima = document.getElementById('vdm3dAnima');
  if (anima){ anima.textContent = scritta('anima'); anima.title = scritta('animaTitolo'); }
}

function aggiorna(){
  try { pulsanti(); disegnaSezione(); } catch (e) { console.error('Playbook animato 3D:', e); }
}

/* il Playbook si ridisegna quando cambia (squadra, righe, lingua): la sezione
   3D va dietro, dopo di lui e senza toccarlo */
function agganciaRidisegno(){
  const originale = window.renderPlaybookSection;
  if (typeof originale !== 'function' || originale.__vdm3d) return;
  const avvolta = function(){
    const r = originale.apply(this, arguments);
    aggiorna();
    return r;
  };
  avvolta.__vdm3d = true;
  window.renderPlaybookSection = avvolta;
}

function avvio(){
  agganciaRidisegno();
  aggiorna();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvio);
else avvio();

return {  };
})();
})();
