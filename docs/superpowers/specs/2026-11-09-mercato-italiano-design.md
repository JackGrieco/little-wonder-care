# Versione italiana del sito — design

Data: 2026-11-09 · Stato: bozza da approvare

## Perché

Silvia (Little Wonder Care, vive in Texas) vuole servire anche clienti in Italia, **dal lancio**, insieme al mercato US. Per l'Italia ha prezzi diversi da quelli US. Il sito oggi è solo in inglese, solo in dollari e pensato solo per gli Stati Uniti.

## Obiettivi

- Due versioni del sito sullo stesso dominio, `littlewondercareco.com`:
  - **US**: quella di oggi, in inglese, prezzi in dollari, indirizzi invariati (`/`, `/services`, ...).
  - **Italia**: sotto `/it/...`, in italiano, prezzi in euro, **solo servizi virtuali**.
- Stesso flusso di prenotazione nei due mercati:
  - Sleep: scegli il pacchetto → prenoti la sessione da 1 h → paghi alla prenotazione.
  - Doula: scegli il pacchetto → call conoscitiva gratuita da 15 min → contratto e pagamento li gestisce Silvia dopo la call.
- Silvia gestisce da sola, in `/studio`, i contenuti che già oggi stanno in Sanity (pacchetti con prezzi e testi, FAQ, testimonianze), per entrambi i mercati.
  - I testi delle pagine restano nel codice, come oggi per la versione US.
  - Spostarli in Sanity non fa parte di questo lavoro.
- Le due versioni escono insieme.

## Non obiettivi

- Conversione automatica dei prezzi o dei cambi: i prezzi italiani sono un listino a sé.
- Blocchi tecnici contro chi dagli US compra il listino italiano (VPN, Paese della carta). Si aggiungono solo se il problema si presenta davvero.
- Servizi a domicilio in Italia.
- Altre lingue o altri Paesi.
- Blog e lead magnet: restano spenti in entrambe le versioni (`IS_BLOG_ENABLED`, `IS_LEAD_MAGNET_ENABLED`).

## Anti-obiettivi (sarebbe un fallimento anche se funziona)

- Il sito sceglie la versione **da solo** in base all'IP e la persona non può cambiarla.
- La versione US cambia indirizzi o peggiora.
- Testi italiani che suonano tradotti a macchina.
- In una stessa pagina compaiono dollari ed euro, o i due listini uno accanto all'altro.
- Per cambiare un prezzo Silvia deve chiedere di modificare il codice.

## Decisioni prese

Prese con Giacomo:

1. Due listini, uno per mercato, con lo stesso flusso.
2. Le sessioni per l'Italia sono in italiano.
3. In Italia solo servizi virtuali.
4. Lancio contemporaneo dei due mercati.

Proposte da Claude e accettate in conversazione:

5. Versione italiana sotto `/it`. Lo switcher è **solo di lingua** ("EN / IT"), sempre visibile nell'header, e non mostra i due prezzi a confronto.
6. L'offerta italiana dichiara: "sessioni in italiano, riservate a chi risiede in Italia". È la protezione principale contro chi dagli US comprerebbe il listino italiano.
7. Gli eventi Cal.com italiani sono **separati** da quelli US:
   - prezzo in euro;
   - disponibilità in fasce adatte al fuso italiano (Silvia è sul fuso di Chicago, 7 ore indietro rispetto all'Italia);
   - campo obbligatorio "Paese di residenza", così Silvia vede i casi sospetti e può rimborsare.
8. Doula in Italia: stessa logica di oggi (call, poi pagamento gestito da Silvia), ma solo pacchetti virtuali.
   - Anche la **discovery call gratuita** da 15 minuti ha il suo evento italiano: in italiano, con le fasce orarie italiane e lo stesso campo "Paese di residenza".
   - Gli eventi italiani sono quindi tre: discovery call, call conoscitiva doula, sessione sleep a pagamento.
   - `CAL_LINKS` e i bottoni scelgono il link in base alla lingua della pagina.
9. I testi italiani definitivi li scrive o li rilegge Silvia. Claude prepara una prima bozza.

## Scelte di Claude (non ancora viste da Giacomo)

- **Pacchetti in Sanity: un documento per mercato.** Si aggiunge al `servicePackage` un campo `market` (`us` | `it`, default `us`, obbligatorio).
  - Un pacchetto italiano è un documento a sé, con titolo, descrizione, caratteristiche, prezzo e link Cal.com propri. Il campo `price` diventa "prezzo nella valuta del mercato".
  - Non si usa un documento con campi doppi perché il catalogo italiano è un sottoinsieme diverso (solo virtuale) e i testi cambiano, non sono solo tradotti.
  - Così non serve un campo "disponibile in Italia".
- **Stessa logica per FAQ e testimonianze.**
  - FAQ: campo `market`, con FAQ italiane proprie.
  - Testimonianze: campo `language` (`en` | `it`, default `en`). Ogni versione mostra solo quelle nella sua lingua.
- **Valuta dal mercato, non dal pacchetto.** `formatPrice` riceve il mercato e formatta con `Intl.NumberFormat`: `en-US`/`USD` → "$150"; `it-IT`/`EUR` → "150 €".
- **Nessun reindirizzamento e nessun avviso geolocalizzato nella prima versione.** Lo switcher basta. Un avviso "Sei in Italia? Vai alla versione italiana" si può aggiungere dopo, ma richiede una piccola funzione lato server su Vercel, perché il sito è pre-generato.
- **SEO.**
  - `<html lang>` corretto per ogni versione.
  - `hreflang` reciproci tra pagine equivalenti, più `x-default` sulla versione US.
  - Canonical per lingua.
  - La sitemap include le pagine italiane.
- **Piano B per il pagamento sleep in euro.** Cal.com permette prezzo e valuta per singolo evento, quindi il piano A è un evento sleep italiano in EUR. Se si scopre che non funziona, o se il commercialista lo esclude:
  - la cliente prenota l'evento sleep italiano senza pagamento;
  - Silvia le manda un link di pagamento Stripe in euro.

  Il flusso visto dalla cliente resta "prenoti la sessione, paghi prima di farla". Non si incassa in dollari dalle clienti italiane.
- **Analytics, in attesa del parere legale.** PostHog resta spento sulle pagine `/it`. Il consenso ai cookie va fatto come un pezzo isolato e riusabile, così se l'avvocato chiede un banner su tutto il sito (o per tutti i visitatori EU) si estende senza riscrivere nulla.
- **Firewall.** Al posto della regola "solo US" la proposta è "US + Italia". Va confermata dall'avvocato, insieme al resto del parere. La versione US non deve diventare irraggiungibile in nessun caso.
- **Testi dell'interfaccia comune** (header, footer, card dei pacchetti, bottoni, note di prenotazione come `bookingNote` e `ctaText` in `SERVICE_CATEGORIES`): tradotti tramite un dizionario per lingua. Niente stringhe inglesi dentro i componenti condivisi.
- **Segnaposto dei pacchetti.** Finché Sanity è vuoto, anche l'Italia ha i suoi segnaposto, in euro e solo virtuali. Mai mostrare i segnaposto US su `/it`.

## Pagine della versione italiana

Tutte quelle pubbliche di oggi: home, about, services, sleep-consulting, postpartum-doula, faq, testimonials, contact, privacy-policy. Escluso `/studio`.

Differenze di contenuto rispetto alla versione US, non solo di lingua:

- **Contatti:** niente "Waco, TX & surrounding areas (in-home)". Solo supporto virtuale in Italia.
- **Doula:** solo supporto post-parto virtuale.
- **Disponibilità e fuso orario** espressi per chi sta in Italia.
- **Privacy policy italiana:** testo dal parere legale (vedi sotto).

## Vincoli

- **Stack attuale da mantenere:**
  - Astro 6 con pagine pre-generate e adapter Vercel;
  - Sanity (progetto `zjnv9ypr`) per i contenuti;
  - Cal.com (account `littlewondercare`, fuso Chicago) per le prenotazioni;
  - Stripe collegato a Cal.com per i pagamenti sleep (Fase 5 della roadmap, non ancora fatta);
  - PostHog (US Cloud) per le statistiche.
- **Firewall.** La roadmap (Fase 7) prevede l'accesso **solo dagli Stati Uniti** con il firewall di Vercel. Questa regola va cambiata, altrimenti la versione italiana non è raggiungibile dall'Italia (vedi la proposta "US + Italia" sopra).
- **Testo "Available Worldwide".** La pagina sleep dice "Available Worldwide… internationally" e la roadmap la segnava da rivedere perché il sito era solo US. Ora la questione si risolve così: US + Italia.
- **Giacomo sta imparando Astro.** Il codice va spiegato man mano (vedi `ROADMAP.md`, "Cosa impari").

## Dipendenze esterne (bloccano il lancio, non l'inizio del lavoro)

- **Parere legale per l'Italia** (`ROADMAP.md`, "Futuro"). Riguarda:
  - privacy policy italiana e T&C;
  - banner dei cookie;
  - se PostHog può raccogliere dati dei visitatori italiani e come (consenso, modalità senza cookie, server EU).

  Finché manca, sulle pagine `/it` PostHog resta spento.
- **Commercialista:** come fatturare alle clienti italiane.
- **Da Silvia:**
  - pacchetti italiani con prezzi in euro;
  - fasce orarie per l'Italia;
  - revisione dei testi italiani.
- **Da verificare prima di creare gli eventi:**
  - Nella lista delle valute di Cal.com c'è EUR? Dalla documentazione, prezzo e valuta si scelgono per evento. Se non c'è, si passa al piano B.
  - In che lingua si apre il popup di prenotazione sulle pagine `/it`?
  - Quanto costa la conversione euro → dollari sul conto Stripe di Silvia?

## Lasciato a chi costruisce

- **Come organizzare file e routing in Astro.** Il routing i18n integrato è il punto di partenza naturale. Si possono:
  - duplicare le pagine sotto `src/pages/it/`;
  - oppure generarle da un unico file con i testi separati per lingua.

  Le pagine hanno molto testo scritto nel template (`index.astro` è circa 800 righe) e quelle italiane differiscono anche nei contenuti. Scegliere quello che resta più leggibile, senza duplicare i componenti.
- **Come mappare le pagine equivalenti** per switcher e `hreflang`, anche se gli indirizzi italiani restano in inglese (`/it/services`) o vengono tradotti. Indirizzi in inglese è la scelta più semplice.
- **Struttura dei file di traduzione** e dei tipi TypeScript.
- **Ordine dei passi**, purché la versione US resti funzionante a ogni merge.
