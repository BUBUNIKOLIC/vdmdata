# vdmdata.it — come metterlo online

Tre file HTML e una cartella per le immagini. Nessun programma da installare,
nessun canone di hosting: il dominio si paga, le pagine no.

    index.html        la pagina principale (italiano + inglese, tasto IT/EN)
    istruzioni.html   le istruzioni a domande, con menu e ricerca
    privacy.html      l'informativa privacy — è l'indirizzo che chiede Apple
    assistenza.html   la pagina di assistenza — è l'altro indirizzo che chiede Apple
    CNAME             contiene "vdmdata.it": serve a GitHub, non toccarlo
    img/              qui dentro vanno le sei schermate della galleria

---

## 1. Compra il dominio

Su Aruba, Register.it o Netsons: cerca `vdmdata.it` e mettilo nel carrello.

Quattro accortezze al momento dell'acquisto:

1. **Intestatario: persona fisica.** Per un `.it` serve il codice fiscale.
2. **Dati personali nel WHOIS: NEGA il consenso.** È l'elenco pubblico di chi
   possiede il dominio. Negandolo, il tuo nome resta legato al dominio ma
   indirizzo e telefono non vengono pubblicati. Alcuni registrar te lo mettono
   acceso di default.
3. **Rifiuta hosting, caselle e-mail e certificati SSL.** Non ti servono: le
   pagine stanno su GitHub gratis e il certificato lo fa GitHub da solo.
4. **Lascia acceso il rinnovo automatico.** Se il dominio scade, dopo qualche
   mese chiunque può prenderselo — e il tuo nome sull'App Store diventa un
   link morto.

## 2. Crea il sito su GitHub

1. Vai su github.com, entra col tuo account **vdmdata**.
2. In alto a destra **+** → **New repository**.
3. Nome del repository: **`vdmdata.github.io`** (scritto esattamente così).
4. Spunta **Public**. Non aggiungere README.
5. **Create repository**.
6. Nella pagina che si apre clicca **uploading an existing file** e trascina
   dentro i tre file `.html`, il file `CNAME` e la cartella `img`.
7. In fondo, **Commit changes**.

Dopo un paio di minuti il sito è già visibile su `https://vdmdata.github.io`.

## 3. Collega il dominio

Nel pannello del registrar cerca **DNS** (o "Gestione DNS", "Record DNS") e
inserisci **cinque** record:

| Tipo  | Nome | Valore              |
|-------|------|---------------------|
| A     | @    | 185.199.108.153     |
| A     | @    | 185.199.109.153     |
| A     | @    | 185.199.110.153     |
| A     | @    | 185.199.111.153     |
| CNAME | www  | vdmdata.github.io   |

Poi su GitHub: repository → **Settings** → **Pages** → in *Custom domain*
scrivi `vdmdata.it` e salva. Quando compare la spunta verde, accendi anche
**Enforce HTTPS**.

Il collegamento non è immediato: da mezz'ora a qualche ora. Non è rotto, sta
solo propagando.

## 4. Le schermate

Nella pagina principale c'è un riquadro vuoto con scritto cosa manca. Metti in
`img/` la schermata principale col nome `schermata-video.png` e poi, dentro
`index.html`, sostituisci questa riga:

    <div class="vuoto">qui va la schermata principale — img/schermata-video.png</div>

con questa:

    <img src="img/schermata-video.png" alt="VDM Basketball Coach">

Vanno benissimo le stesse schermate che prepari per l'App Store.

## 4-bis. Le sei schermate della galleria

Nella pagina principale, sotto «Come funziona», c'è una fila di linguette:
Video e tag, Montaggi, Playbook, Scouting Report, Personnel, Registro del
tiro. Ognuna mostra una schermata. Finché l'immagine non c'è, al suo posto
resta un riquadro che dice quale file manca — il sito si pubblica lo stesso.

Metti in `img/` sei file con questi nomi esatti:

    f-video.png      f-montaggi.png    f-playbook.png
    f-scouting.png   f-personnel.png   f-tiro.png

**Prima di catturarle, togli i nomi veri.** Sono schermate pubbliche: chiunque
può fermarle e leggerle. Rinomina la squadra avversaria in qualcosa di neutro
(«AVVERSARIA», «SQUADRA B») e, sulle schede giocatore, usa nomi di fantasia. Il
lavoro sul Mondiale non deve finire sul sito.

Cattura con **Cmd+Shift+4**, poi **Barra spaziatrice** e clic sulla finestra.
Non serve la misura esatta dell'App Store: qui vanno bene così come sono, basta
che siano nitide.

## 5. I file da scaricare (Mac e Windows)

**I pacchetti non si caricano nel sito**: GitHub Pages non accetta file sopra i
100 MB e i tuoi ne pesano più di cento. Si mettono nelle **Releases**, che sono
fatte apposta e reggono fino a 2 GB per file.

1. Nel repository → **Releases** → **Create a new release**.
2. Dai un nome tipo `3.7.2`, trascina dentro il `.dmg` e il `.exe`, pubblica.
3. GitHub ti dà due indirizzi diretti. Aprili in `index.html` e incollali al
   posto dei `href="#"` dei due tasti **Scarica per Mac** e **Scarica per
   Windows** (li trovi cercando `id="dlMac"` e `id="dlWin"`).

Quando l'app sarà sull'App Store, stesso lavoro sul terzo tasto (`id="dlAsc"`):
ci metti il link della scheda e cambi "Presto disponibile" in "Scarica dal Mac
App Store".

## 6. Poi, su App Store Connect

Nella scheda dell'app metti:

- **Privacy Policy URL** → `https://vdmdata.it/privacy.html`
- **Support URL** → `https://vdmdata.it/assistenza.html`

Se Apple ti chiede anche un indirizzo di documentazione, usa
`https://vdmdata.it/istruzioni.html`.

Sono i due indirizzi che Apple apre davvero durante la revisione. Controlla che
funzionino da un telefono, con la rete dati e non col wi-fi di casa: è il modo
più rapido per accorgersi se qualcosa non è pubblico.

## Se un giorno vuoi spegnere tutto

Puoi. Ma **prima** cambia quei due indirizzi su App Store Connect, altrimenti
resta sulla scheda dell'app un link che non porta da nessuna parte — e quello
Apple lo considera un difetto.
