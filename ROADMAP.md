# Roadmap — Little Wonder Care

Piano di lavoro nato dalla call con Silvia del 2026-10-05 ([registrazione Fathom](https://fathom.video/calls/849648759)).
Si spunta man mano. Ogni fase dice anche cosa si impara di Astro, perché il progetto è anche un modo per imparare il framework.

## Come lavoriamo

1. Un branch per fase (es. `feat/site-structure`).
2. In locale: `npm run dev` → <http://localhost:4321>, con hot reload.
3. Push del branch → Vercel crea una preview → si manda a Silvia il **branch link** (si aggiorna da solo a ogni push).
4. Silvia lascia i commenti direttamente sulla preview (toolbar di Vercel).
5. Quando va bene → merge su `main` → deploy in produzione.

> Limiti del piano Hobby di Vercel: **un solo collaboratore invitato** alla volta (Silvia) e **un solo shareable link** per account. Silvia deve avere un account Vercel gratuito, perché le preview sono protette.

---

## Fase 0 — Account e setup

Tutti gli account sono intestati all'**email dell'attività** (il Gmail di Little Wonder Care), non a email personali.

| Servizio                 | A cosa serve                                | Proprietario                              | Stato                                     |
| ------------------------ | ------------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| Gmail Little Wonder Care | email dell'attività, calendario             | Silvia                                    | [ ] accesso ricevuto                      |
| Google Calendar          | disponibilità per le call                   | Silvia                                    | [ ]                                       |
| Cal.com                  | prenotazioni (collegato al Google Calendar) | Silvia (account nuovo)                    | [ ] creato                                |
| Stripe                   | pagamenti                                   | Silvia (esistente)                        | [ ] invito come team member               |
| Sanity                   | CMS: pacchetti, FAQ, testimonianze          | attività (account nuovo)                  | [ ] creato                                |
| PostHog                  | analytics del sito                          | attività (account nuovo?)                 | [ ] da verificare di chi è quello attuale |
| Vercel                   | hosting                                     | Giacomo (`jackgriecos-projects`)          | [x] esistente                             |
| GitHub                   | codice                                      | Giacomo (`JackGrieco/little-wonder-care`) | [x] esistente                             |

- [ ] Stripe: farsi aggiungere come team member (Settings → Team), **non** passarsi la password
- [ ] Cal.com: provare a prendere lo username `littlewondercare`, così i link nel codice restano validi
- [ ] Sanity: nuovo progetto → aggiornare il `projectId` (`astro.config.mjs`, `sanity.config.ts`, `src/lib/sanity.ts`, `.env.example`). Il vecchio progetto `bf0ainjd` ha solo 6 documenti di prova, quindi non c'è niente da migrare
- [ ] Variabili d'ambiente su Vercel aggiornate → `vercel env pull` per averle in locale
- [ ] Invitare Silvia come collaboratrice sulle preview Vercel

## Fase 1 — Struttura e navigazione

_Cosa impari: com'è fatto un file `.astro` (frontmatter + template), componenti e props, layout condivisi, rendering condizionale._

- [ ] Header: "Book Now" → "Get in Touch", che porta a `/contact` (desktop + menu mobile)
- [ ] Header: togliere "Blog" dal menu
- [ ] Home: nascondere (non cancellare) la sezione "From the Blog"
- [ ] Home: nascondere (non cancellare) la sezione "Free Newborn Sleep Guide" (lead magnet)
- [ ] About: "Book a Free Call" apre il popup della discovery call di Cal.com invece di andare a `/contact`
- [ ] Contact: aggiungere un bottone ben visibile "Free Discovery Call" accanto al form "Send a message"
- [ ] Rivedere gli altri bottoni "Book a Free Discovery Call" che oggi portano a `/contact` (es. `sleep-consulting.astro`)
- [ ] Le pagine `/blog` restano raggiungibili da URL? Decidere se nasconderle del tutto

## Fase 2 — Pagina Services e flussi di prenotazione

_Cosa impari: generare l'HTML da dati (array + `.map()`), riuso con un componente `ServiceCard`, costanti condivise._

- [ ] `/services` con tre sezioni: **Sleep Consulting** (5 card), **Postpartum Doula** (5 card), **Free Discovery Call** (15 min)
- [ ] `/sleep-consulting`: descrizione + 5 card sleep + call gratuita
- [ ] `/postpartum-doula`: descrizione + 5 card doula + call gratuita
- [ ] Componente unico per la card del pacchetto (oggi il markup è duplicato)
- [ ] Link di Cal.com raccolti in un posto solo (oggi sono scritti a mano in 7 punti)
- [ ] Card doula → apre la call conoscitiva di 15 min (niente pagamento)
- [ ] Card sleep → apre la prenotazione della call di 1 h (il pagamento arriva in Fase 5)
- [ ] Rimuovere la sezione "Request Availability"
- [ ] Correggere le incoerenze: la CTA dice "20-minute call", ma la discovery call è di 15

## Fase 3 — Contenuti su Sanity

_Cosa impari: cos'è un headless CMS, le query GROQ, dati presi durante la build e dati presi a ogni richiesta._

- [ ] Schema `servicePackage` allineato ai 10 pacchetti reali (tipo, prezzo, durata, link Cal.com)
- [ ] Inserire i pacchetti in Sanity, così Silvia può modificarli da `/studio`
- [ ] Togliere i dati statici di fallback quando Sanity è popolato
- [ ] Rebuild automatica quando Silvia pubblica (webhook Sanity → deploy hook Vercel)

## Fase 4 — Form contatti (primo pezzo di backend)

_Cosa impari: endpoint e Astro Actions, variabili d'ambiente server-side, funzioni serverless su Vercel, validazione dell'input._

- [ ] Il form "Send a message" oggi punta a `formspree.io/f/PLACEHOLDER` e non funziona
- [ ] Scegliere: Formspree configurato bene **oppure** Astro Action + servizio email (es. Resend)
- [ ] Validazione, messaggio di conferma/errore, protezione anti-spam

## Fase 5 — Pagamento Sleep Coaching

_Cosa impari: integrare servizi esterni, con o senza codice._

- [ ] Eventi Cal.com: discovery call 15 min (preavviso breve), call doula 15 min, sessioni sleep 1 h (preavviso 2-3 giorni)
- [ ] Collegare Stripe a Cal.com → le sessioni sleep si pagano al momento della prenotazione
- [ ] Verificare che la ricevuta Stripe arrivi al cliente
- [ ] Test completo in modalità test di Stripe prima di andare live

## Fase 6 — Brand e testi

_Cosa impari: design token e variabili CSS, Tailwind v4._

- [ ] Logo nuovo (stesso logo, font cambiato)
- [ ] Palette con i codici colore → variabili CSS in `src/styles/global.css`
- [ ] Testi About
- [ ] Descrizioni, prezzi e durate dei 10 pacchetti
- [ ] Link Instagram (header/footer)

## Fase 7 — Legale e go-live

- [ ] Privacy policy e T&C definitivi (dopo l'avvocato) → aggiornare `/privacy-policy`, creare `/terms`
- [ ] Togliere dalla privacy policy i servizi non usati (es. Kit/ConvertKit, se il lead magnet resta nascosto)
- [ ] Accesso solo dagli **Stati Uniti** (regola Firewall di Vercel). Far confermare all'avvocato che basta
- [ ] Togliere la protezione Vercel dal dominio di produzione (oggi è attiva su _tutti_ i deploy, quindi il sito non è pubblico)
- [ ] Rimuovere `littlewondercare.com` dall'account Vercel: **non è nostro** (è un altro sito, "Little Roots Daycare", su Netlify)
- [ ] Chiedere a chi ha sviluppato prima di spegnere la vecchia copia su `little-wonder-care.vercel.app`
- [ ] Controllo finale: SEO, sitemap, Lighthouse, mobile

## In attesa di Silvia

- [ ] Accesso al Gmail dell'attività
- [ ] Invito su Stripe come team member
- [ ] Logo aggiornato + palette (codici colore)
- [ ] Testi About
- [ ] Elenco dei 10 pacchetti: nome, descrizione, prezzo, durata
- [ ] Durate e regole di preavviso definitive per ogni tipo di call
- [ ] Privacy policy e T&C dopo l'avvocato
- [ ] Link Instagram

## Futuro (non requisiti adesso)

- Dopo il pagamento sleep: mail automatica con i contratti precompilati col nome del cliente + link al questionario JotForm
- Substack come blog/newsletter, collegato al sito
- Automazione post Substack → Instagram con revisione umana
- Apertura ad altri paesi (es. Italia/GDPR) dopo il parere legale
