# Versione italiana del sito — piano di implementazione

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** aggiungere sotto `/it` una versione italiana del sito: testi in italiano, prezzi in euro, solo servizi virtuali. La versione US resta identica.

**Architecture:**
- **Routing:** si usa il routing i18n di Astro (`en` predefinito senza prefisso, `it` sotto `/it`).
- **Lingua:** entra dal file in `src/pages` come valore fisso e scende ai componenti tramite la prop `locale`.
- **Pagine:** ogni pagina diventa una "view" in `src/views/`, con i testi in `src/i18n/copy/<pagina>.ts` (uno per lingua). I file in `src/pages/` e `src/pages/it/` si limitano a montare la view con la lingua giusta.
- **Sanity:** i contenuti hanno un campo `market` o `language`; le query filtrano su quello.

**Tech Stack:** Astro 6.1, Sanity 5 (GROQ), Cal.com embed, Vercel adapter. Nuovi strumenti di sviluppo: Vitest con coverage v8, Astro Container API (`experimental_AstroContainer`), Playwright, groq-js.

**Spec:** `docs/superpowers/specs/2026-11-09-mercato-italiano-design.md`

**Dove si lavora:** worktree `../little-wonder-care.worktrees/feat-italian-market`, branch `feat/italian-market`, creato da `feat/redesign` (il redesign non è ancora su `main`). Le modifiche non committate del checkout principale (`.gitignore`, `Color+logo/`) non si toccano.

## Global Constraints

- **Indirizzi US invariati.** Testi US invariati, con un'unica eccezione voluta: il box "Available Worldwide" della pagina sleep (Task 8).
- **Indirizzi italiani:** `/it/` più lo stesso percorso in inglese (`/it/services`, `/it/sleep-consulting`, ...). La home è `/it/`.
- **Valuta dal mercato:**
  - `en` → mercato `us`, USD, formato `en-US` (`$150`, `$1,500`);
  - `it` → mercato `it`, EUR, formato `it-IT` (`150 €`, con spazio non separabile U+00A0).
- **Una pagina, una valuta:** mai dollari ed euro nella stessa pagina, mai i due listini a confronto.
- **Niente geolocalizzazione:** nessun reindirizzamento in base all'IP e nessun avviso geolocalizzato.
- **Switcher di sola lingua:** mostra "EN / IT" e porta alla pagina equivalente nell'altra lingua.
- **Avviso sull'offerta italiana**, testo esatto: `Sessioni in italiano, riservate a chi risiede in Italia.`
- **PostHog** non viene caricato sulle pagine `/it`.
- `IS_BLOG_ENABLED` e `IS_LEAD_MAGNET_ENABLED` restano come sono. Nessuna pagina blog in italiano.
- **Sanity:**
  - `servicePackage.market` e `faq.market`: `'us' | 'it'`, obbligatori, valore iniziale `'us'`;
  - `testimonial.language`: `'en' | 'it'`, obbligatorio, valore iniziale `'en'`;
  - i documenti senza campo contano come `us` / `en`.
- **Testi italiani = bozze di Claude da far rivedere a Silvia.** Restano nella lista "In attesa di Silvia" della roadmap finché non le approva.
- **Link Cal.com italiani:** finché gli eventi italiani non esistono, puntano a `littlewondercare/discovery-call`, con un TODO, come oggi per la versione US.
- **Prima di ogni commit:** `npm run check`, `npm test`, `npm run test:e2e` verdi. Coverage di Vitest ≥ 80% su `src/i18n/**` e `src/lib/**`.
- **Modalità di lavoro:** Giacomo sta imparando Astro. Chi implementa spiega le scelte man mano.

## Review Focus

1. **Documenti Sanity già esistenti senza `market` o `language`:** devono apparire solo nella versione US e mai su `/it`. Test: Task 4, `treats documents without market as US`.
2. **Sanity irraggiungibile o vuoto mentre si genera `/it`:** la pagina mostra i segnaposto italiani in euro, mai quelli US. Test: Task 5, `falls back to Italian placeholders when Sanity fails`.
3. **Percorsi limite:** `/it`, `/it/`, slash finale, un percorso che inizia con "it" senza esserlo (`/italy`). Lo switcher e `hreflang` devono puntare alla pagina giusta. Test: Task 2, casi di `stripLocale` e `localizePath`.
4. **Link interni:** da una pagina italiana non si deve finire per sbaglio su una pagina US (header, footer, CTA, link nel testo). Test: Task 11, `Italian pages only link to Italian pages`.
5. **PostHog:** non deve mai caricarsi su `/it`, nemmeno se `PUBLIC_POSTHOG_KEY` è impostata. Test: Task 6, `isAnalyticsEnabled`; Task 11, `Italian pages never load PostHog`.

---

### Task 1: Strumenti di test e fotografia dei testi US

**Files:**
- Modify: `package.json` (script e devDependencies), `.gitignore`
- Create: `vitest.config.ts`, `playwright.config.ts`, `e2e/helpers.ts`, `e2e/us-baseline.spec.ts`
- Commit insieme: `docs/superpowers/specs/2026-11-09-mercato-italiano-design.md`, `docs/superpowers/plans/2026-11-09-mercato-italiano.md`

**Interfaces:**
- Produces:
  - `e2e/helpers.ts`:
    - `US_PATHS: readonly string[]` = `['/', '/about', '/services', '/sleep-consulting', '/postpartum-doula', '/faq', '/testimonials', '/contact', '/privacy-policy']`;
    - `getBodyText(page: Page): Promise<string>`: testo del body senza `script`/`style`, spazi compressi;
    - `getInternalHrefs(page: Page): Promise<string[]>`: `href` dei soli `a[href^="/"]` del body (non i `<link>` del head), ordinati e senza duplicati.
  - Script npm: `test` (`vitest run`), `test:coverage` (`vitest run --coverage`), `test:e2e` (`playwright test`).

- [ ] **Step 1:** Crea il worktree:

  ```bash
  git worktree add ../little-wonder-care.worktrees/feat-italian-market -b feat/italian-market feat/redesign
  ```

  Poi esegui `npm ci` dentro il worktree.
- [ ] **Step 2:** Installa:

  ```bash
  npm i -D vitest @vitest/coverage-v8 @playwright/test groq-js
  npx playwright install chromium
  ```
- [ ] **Step 3:** Configura Vitest e Playwright.
  - `vitest.config.ts` usa `getViteConfig` da `astro/config`, con:
    - `test.include: ['src/**/*.test.ts']`;
    - `coverage: { provider: 'v8', include: ['src/i18n/**', 'src/lib/**'], thresholds: { lines: 80, functions: 80, branches: 80 } }`.
  - `playwright.config.ts`:
    - `testDir: 'e2e'`;
    - `webServer: { command: 'npm run dev', port: 4321, reuseExistingServer: true }`;
    - `use.baseURL: 'http://localhost:4321'`;
    - solo chromium.
  - Aggiungi a `.gitignore`: `coverage/`, `test-results/`, `playwright-report/`.
- [ ] **Step 4:** Scrivi `e2e/us-baseline.spec.ts`: per ogni percorso di `US_PATHS`, due snapshot:
  - `expect(await getBodyText(page)).toMatchSnapshot(\`${slug}.txt\`)`;
  - `expect(JSON.stringify(await getInternalHrefs(page), null, 1)).toMatchSnapshot(\`${slug}-links.txt\`)`.

  `slug` è `home` per `/`, altrimenti il percorso senza `/`.
- [ ] **Step 5:** Esegui `npx playwright test e2e/us-baseline.spec.ts --update-snapshots`, poi `npm run test:e2e`. Atteso: 9 test PASS. Gli snapshot generati fotografano la versione US di oggi.
- [ ] **Step 6:** Commit:

  ```bash
  git add . && git commit -m "test: add vitest, playwright and a text snapshot of the US pages"
  ```

### Task 2: Lingue e indirizzi

**Files:**
- Create: `src/i18n/locales.ts`, `src/i18n/locales.test.ts`
- Modify: `astro.config.mjs`

**Interfaces:**
- Produces (`src/i18n/locales.ts`):
  ```ts
  export const LOCALES = ['en', 'it'] as const;
  export type Locale = (typeof LOCALES)[number];
  export type Market = 'us' | 'it';
  export const DEFAULT_LOCALE: Locale = 'en';
  export interface LocaleConfig {
    market: Market;
    hreflang: 'en-US' | 'it-IT';
    ogLocale: 'en_US' | 'it_IT';
    currency: 'USD' | 'EUR';
    numberFormat: 'en-US' | 'it-IT';
    label: 'EN' | 'IT';
  }
  export const LOCALE_CONFIG: Record<Locale, LocaleConfig>;
  export function stripLocale(pathname: string): string;
  export function localizePath(path: string, locale: Locale): string;
  export interface Alternate { hreflang: 'en-US' | 'it-IT' | 'x-default'; href: string }
  export function getAlternates(pathname: string, site: URL): readonly Alternate[];
  ```

- [ ] **Step 1: Test** in `src/i18n/locales.test.ts`:
  - `stripLocale` (casi tabellari):

    | input | output |
    | --- | --- |
    | `'/it'` | `'/'` |
    | `'/it/'` | `'/'` |
    | `'/it/services'` | `'/services'` |
    | `'/it/services/'` | `'/services/'` |
    | `'/services'` | `'/services'` |
    | `'/'` | `'/'` |
    | `'/italy'` | `'/italy'` |

  - `localizePath` (casi tabellari):

    | input | output |
    | --- | --- |
    | `('/services','it')` | `'/it/services'` |
    | `('/','it')` | `'/it/'` |
    | `('/services','en')` | `'/services'` |
    | `('/it/services','en')` | `'/services'` |
    | `('/it/services','it')` | `'/it/services'` |
    | `('/services#sleep','it')` | `'/it/services#sleep'` |

  - `getAlternates('/it/services', new URL('https://littlewondercareco.com'))` è uguale a:

    ```ts
    [
      { hreflang: 'en-US', href: 'https://littlewondercareco.com/services' },
      { hreflang: 'it-IT', href: 'https://littlewondercareco.com/it/services' },
      { hreflang: 'x-default', href: 'https://littlewondercareco.com/services' },
    ]
    ```

  - `LOCALE_CONFIG.it`: `market` `'it'`, `currency` `'EUR'`. `LOCALE_CONFIG.en`: `market` `'us'`, `currency` `'USD'`.
- [ ] **Step 2:** `npm test` → FAIL (modulo mancante).
- [ ] **Step 3:** Implementa `src/i18n/locales.ts`. Il prefisso si riconosce solo come segmento intero: `/it` o `/it/...`.
- [ ] **Step 4:** In `astro.config.mjs`:
  - aggiungi `i18n: { locales: ['en', 'it'], defaultLocale: 'en', routing: { prefixDefaultLocale: false } }`;
  - passa a `sitemap` l'opzione `i18n: { defaultLocale: 'en', locales: { en: 'en-US', it: 'it-IT' } }`.
- [ ] **Step 5:** Esegui `npm test`, `npm run check` e `npm run test:e2e`. Atteso: tutto PASS, snapshot US invariati.
- [ ] **Step 6:** Commit `feat: add locale helpers and Astro i18n routing`

### Task 3: Prezzi e testi dell'interfaccia

**Files:**
- Create: `src/i18n/format.ts`, `src/i18n/format.test.ts`, `src/i18n/ui.ts`, `src/i18n/ui.test.ts`

**Interfaces:**
- Consumes: `Locale` e `LOCALE_CONFIG` (Task 2); `ServiceCategory` da `src/lib/packages.ts`, solo come import di tipo.
- Produces:
  - `formatPrice(price: number, locale: Locale): string`.
  - `UI: Record<Locale, UiStrings>`, con `UiStrings` a gruppi:
    - `nav`: services, allServices, allServicesHint, sleep, sleepHint, doula, doulaHint, about, blog, getInTouch, openMenu;
    - `footer`: contact, faq, privacy, copyright;
    - `switcher`: ariaLabel;
    - `categories: Record<ServiceCategory, { label; tag; ctaText; bookingNote }>`;
    - `packages: { mostPopular: string; marketNotice: string | null }`;
    - `discoveryCall`: buttonLabel, più i testi interni di `DiscoveryCallCard`;
    - `contactForm`: tutti i testi di `ContactForm`;
    - `faqCategories: Record<'General' | 'Sleep Consulting' | 'Postpartum Doula' | 'Pricing' | 'Other', string>`;
    - `testimonialFilters: Record<'All' | 'Sleep Consulting' | 'Postpartum Doula', string>`.
  - I valori inglesi sono il testo **identico** di oggi (es. `'Most Popular'`, `'Book Now'`, `'1-hour session · payment at booking'`, `'Book an Intro Call'`, `'Free 15-minute call first · nothing to pay now'`, `'Book a Free Discovery Call'`, `'Get in Touch'`). Quelli italiani sono bozze.

- [ ] **Step 1: Test.**
  - `formatPrice`:

    | chiamata | risultato |
    | --- | --- |
    | `(150,'en')` | `'$150'` |
    | `(1500,'en')` | `'$1,500'` |
    | `(150,'it')` | `'150 €'` |
    | `(99.5,'it')` | `'99,50 €'` |

  - `ui.test.ts`: `UI.it.packages.marketNotice` è `'Sessioni in italiano, riservate a chi risiede in Italia.'` e `UI.en.packages.marketNotice` è `null`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementa `formatPrice` con `Intl.NumberFormat(numberFormat, { style: 'currency', currency, minimumFractionDigits: 2, trailingZeroDisplay: 'stripIfInteger' })`. Poi scrivi `ui.ts`. Per le stringhe inglesi copia il testo dai componenti attuali.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `feat: add price formatting and UI strings for both languages`

### Task 4: Sanity — mercato e lingua nei contenuti

**Files:**
- Modify: `schemas/servicePackage.ts`, `schemas/faq.ts`, `schemas/testimonial.ts`, `src/lib/sanity.ts`
- Create: `src/lib/sanity.test.ts`

**Interfaces:**
- Consumes: `Locale`, `Market` (Task 2).
- Produces (`src/lib/sanity.ts`):
  ```ts
  export const SERVICE_PACKAGES_QUERY: string;     // params: serviceType, market
  export const FAQS_QUERY: string;                 // params: market, category (string | null)
  export const TESTIMONIALS_QUERY: string;         // params: language, serviceType (string | null)
  export const FEATURED_TESTIMONIALS_QUERY: string; // params: language
  getServicePackagesByType(serviceType: string, market: Market): Promise<SanityServicePackage[]>
  getFAQs(market: Market, category?: string): Promise<FAQ[]>
  getTestimonials(language: Locale, serviceType?: string): Promise<Testimonial[]>
  getFeaturedTestimonials(language: Locale): Promise<Testimonial[]>
  ```
  - Le interfacce `SanityServicePackage` e `FAQ` guadagnano `market?: Market`; `Testimonial` guadagna `language?: Locale`.

- [ ] **Step 1: Test** con groq-js (`parse(query, { params })` e `evaluate(tree, { dataset, params })`, poi `await result.get()`). Fixture di pacchetti:
  - uno `us`;
  - uno `it`;
  - uno senza `market`;
  - uno `it` con `isActive: false`.

  Test:
  - `returns only Italian packages for the it market`: `[it]`.
  - `treats documents without market as US`: market `us` → `[us, senza market]`.
  - Stessa coppia di test per `FAQS_QUERY`, con `category: null` e con `category: 'Pricing'`.
  - Stessa coppia per `TESTIMONIALS_QUERY` e `FEATURED_TESTIMONIALS_QUERY` (`language` mancante = `en`).
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementa.
  - **Filtri nelle query:** `coalesce(market, "us") == $market` e `coalesce(language, "en") == $language`. Per i filtri facoltativi usa `($category == null || category == $category)` e passa sempre `null` quando il valore manca, mai `undefined`.
  - **Schemi:** il campo `market` ha `options.list` con le voci `US (English, USD)` / `Italia (italiano, EUR)` e `layout: 'radio'`. Il campo `language` ha `English` / `Italiano`.
  - **Titolo del prezzo:** `price` prende il titolo `Price (in the market's currency: USD for US, EUR for Italy)`.
  - **Anteprima:** nell'anteprima del pacchetto il prezzo usa `$` o `€` in base al mercato e il sottotitolo include il mercato.
  - **Pagine esistenti:** i chiamanti in `faq.astro`, `testimonials.astro` e `index.astro` passano `'us'` / `'en'` finché non arriva la loro view.
- [ ] **Step 4:** Esegui `npm test`, `npm run check` e `npm run test:e2e`. Atteso: tutto PASS.
- [ ] **Step 5:** Commit `feat: add market and language to Sanity content and queries`

### Task 5: Pacchetti per mercato

**Files:**
- Modify: `src/consts.ts`, `src/lib/packages.ts`, `src/data/placeholderPackages.ts`, `src/components/ServiceCard.astro`, `src/components/PackagesSection.astro`, `src/pages/services.astro`, `src/pages/sleep-consulting.astro`, `src/pages/postpartum-doula.astro`
- Create: `src/lib/packages.test.ts`, `src/components/ServiceCard.test.ts`

**Interfaces:**
- Consumes: `formatPrice` e `UI` (Task 3); `getServicePackagesByType(type, market)` (Task 4).
- Produces:
  - `src/consts.ts`:
    ```ts
    export interface CalLinks { discoveryCall: string; doulaIntroCall: string; sleepSession: string }
    export const CAL_LINKS: Record<Locale, CalLinks>
    ```
    I valori `it` sono tutti `'littlewondercare/discovery-call'`, con un TODO che indica i nomi futuri: `discovery-call-it`, `doula-intro-call-it`, `sleep-session-it`.
  - `src/lib/packages.ts`:
    - `SERVICE_CATEGORIES: Record<ServiceCategory, { sanityType: string; cardClass: string; bookingLinkKey: 'sleepSession' | 'doulaIntroCall' }>`. I testi passano in `UI[locale].categories`.
    - `getPackagesByCategory(category: ServiceCategory, locale: Locale): Promise<ServicePackage[]>`.
    - `formatPrice` esce da qui e resta solo in `src/i18n/format.ts`.
  - `src/data/placeholderPackages.ts`: `getPlaceholderPackages(market: Market): readonly ServicePackage[]`.
    - id: `placeholder-${market}-${category}-${n}`.
    - Segnaposto italiani: testi in italiano, la parola "virtuale" nei titoli doula, prezzi `n * 100`.
  - Props:
    - `ServiceCard`: `{ pkg; locale: Locale; revealDelay? }`;
    - `PackagesSection`: `{ category; locale: Locale; showHeading? }`.
    - `PackagesSection` mostra `UI[locale].packages.marketNotice` sotto il titolo quando non è `null`.

- [ ] **Step 1: Test.**
  - `packages.test.ts`, con `vi.mock('./sanity')`:
    - `falls back to Italian placeholders when Sanity fails`: fetch rifiutata, locale `it` → tutti gli id iniziano con `placeholder-it-`.
    - Stesso esito con risposta vuota.
    - Con un documento restituito → viene mappato e `bookingLink` toglie il prefisso `cal:`.
    - La fetch riceve il mercato `it` per il locale `it` e `us` per `en`.
  - `ServiceCard.test.ts`, con `experimental_AstroContainer`:
    - pacchetto con prezzo 150 e locale `it` → l'HTML contiene `150&nbsp;€` (o `150 €`) e il `ctaText` italiano dello sleep, e non contiene `$`;
    - con locale `en` → `$150` e `Book Now`;
    - con `price: null` → nessun `.package-price`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementa. Le tre pagine esistenti passano `locale="en"` a `PackagesSection`.
- [ ] **Step 4:** Esegui `npm test`, `npm run check` e `npm run test:e2e`. Atteso: tutto PASS, snapshot US invariati.
- [ ] **Step 5:** Commit `feat: load packages, placeholders and booking links per market`

### Task 6: Layout, head, header, footer, switcher, analytics

**Files:**
- Modify:
  - `src/layouts/MainLayout.astro`, `src/components/BaseHead.astro`, `src/components/Header.astro`, `src/components/Footer.astro`;
  - `src/components/PostHog.astro`, `src/components/DiscoveryCallButton.astro`, `src/components/DiscoveryCallCard.astro`, `src/components/ContactForm.astro`;
  - tutte le pagine che usano questi componenti (passano `locale="en"`), comprese quelle con un `<html>` proprio: `faq.astro`, `testimonials.astro`, `privacy-policy.astro`.
- Create: `src/components/LanguageSwitcher.astro`, `src/components/LanguageSwitcher.test.ts`, `src/lib/analytics.ts`, `src/lib/analytics.test.ts`

**Interfaces:**
- Consumes: `localizePath`, `stripLocale`, `getAlternates`, `LOCALE_CONFIG` (Task 2); `UI` (Task 3); `CAL_LINKS` (Task 5).
- Produces:
  - `isAnalyticsEnabled(locale: Locale): boolean` in `src/lib/analytics.ts`: `true` solo per `en`. È l'unico punto da cambiare quando arriverà il consenso ai cookie.
  - Prop `locale: Locale` obbligatoria su `MainLayout`, `BaseHead`, `Header`, `Footer`, `PostHog`, `DiscoveryCallButton`, `DiscoveryCallCard`, `ContactForm`.
  - `LanguageSwitcher`: props `{ locale: Locale; pathname: string }`.
    - Rende `EN / IT`: la lingua corrente è uno `<span aria-current="true">`, l'altra un `<a href={localizePath(stripLocale(pathname), other)} hreflang lang>`.
    - Il contenitore ha `aria-label` uguale a `UI[locale].switcher.ariaLabel`.

- [ ] **Step 1: Test.**
  - `analytics.test.ts`: `isAnalyticsEnabled('en') === true`, `isAnalyticsEnabled('it') === false`.
  - `LanguageSwitcher.test.ts`, con il container:
    - `{ locale: 'en', pathname: '/services' }` → un link con `href="/it/services"` e testo `IT`; `EN` con `aria-current="true"`.
    - `{ locale: 'it', pathname: '/it/' }` → link `href="/"`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementa.
  - `MainLayout` e le tre pagine con `<html>` proprio: `<html lang={locale}>`.
  - `BaseHead`:
    - un `<link rel="alternate" hreflang href>` per ogni voce di `getAlternates(Astro.url.pathname, Astro.site)`;
    - `<meta property="og:locale" content={LOCALE_CONFIG[locale].ogLocale}>`;
    - `<PostHog>` solo se `isAnalyticsEnabled(locale)`.
  - `Header` e `Footer`: testi da `UI[locale]` e ogni link interno con `localizePath`. Lo switcher va nell'header, sia nella barra desktop sia nel menu mobile.
  - `DiscoveryCallButton` usa `CAL_LINKS[locale].discoveryCall`.
- [ ] **Step 4:** Esegui `npm test`, `npm run check` e `npm run test:e2e`.
  - Gli snapshot US cambiano **solo** per il testo dello switcher ("EN / IT") e per i link `/it...` che compaiono.
  - Controlla il diff degli snapshot, poi aggiornali con `--update-snapshots`.
- [ ] **Step 5:** Commit `feat: localize layout, header and footer, add language switcher`

### Task 7: Pagina Services in due lingue (modello per le altre pagine)

**Files:**
- Create: `src/i18n/copy/services.ts`, `src/views/ServicesView.astro`, `src/pages/it/services.astro`, `e2e/italian-site.spec.ts`
- Modify: `src/pages/services.astro`, `e2e/helpers.ts` (aggiunge `IT_PATHS`)

**Interfaces:**
- Consumes: tutto quello dei Task 2–6.
- Produces (lo schema che seguono i Task 8–10):
  - `src/i18n/copy/<pagina>.ts` esporta `interface <Pagina>Copy` e `<PAGINA>_COPY: Record<Locale, <Pagina>Copy>`.
    - Contiene title, description, testi degli hero, delle sezioni, delle CTA e liste.
    - Il testo `en` è **identico** a quello di oggi; `it` è la bozza.
  - `src/views/<Pagina>View.astro`: props `{ locale: Locale }`. Contiene markup e `<style>` spostati dalla pagina. I testi vengono da `<PAGINA>_COPY[locale]` e i link interni passano da `localizePath`.
  - `src/pages/<pagina>.astro` contiene solo `<PaginaView locale="en" />`; `src/pages/it/<pagina>.astro` solo `<PaginaView locale="it" />`.
  - `e2e/helpers.ts`: `IT_PATHS` = ogni percorso di `US_PATHS` passato a `localizePath(path, 'it')`.

- [ ] **Step 1: Test** in `e2e/italian-site.spec.ts`. Per `/it/services`:
  - risposta 200 e `html[lang="it"]`;
  - lo switcher porta a `/services`;
  - la pagina contiene `Sessioni in italiano, riservate a chi risiede in Italia.` e `€`, e non contiene `$`.
- [ ] **Step 2:** `npx playwright test e2e/italian-site.spec.ts` → FAIL (404).
- [ ] **Step 3:** Esegui la migrazione di `services` secondo lo schema e scrivi la bozza italiana. In Italia si parla solo di servizi virtuali.
- [ ] **Step 4:** Esegui `npm run check` e `npm run test:e2e`. Atteso: PASS, snapshot US di `services` invariati.
- [ ] **Step 5:** Commit `feat: Italian services page`

### Task 8: Sleep e Doula in due lingue

**Files:**
- Create: `src/i18n/copy/sleep-consulting.ts`, `src/i18n/copy/postpartum-doula.ts`, `src/views/SleepConsultingView.astro`, `src/views/PostpartumDoulaView.astro`, `src/pages/it/sleep-consulting.astro`, `src/pages/it/postpartum-doula.astro`
- Modify: `src/pages/sleep-consulting.astro`, `src/pages/postpartum-doula.astro`, `e2e/italian-site.spec.ts`

**Interfaces:**
- Consumes: lo schema del Task 7.

- [ ] **Step 1: Test.** In `italian-site.spec.ts`, per `/it/sleep-consulting` e `/it/postpartum-doula`, gli stessi controlli del Task 7. In più: il testo della pagina doula italiana non contiene `Waco` e non contiene `in-home`.
- [ ] **Step 2:** Esegui → FAIL.
- [ ] **Step 3:** Esegui la migrazione secondo lo schema.
  - **Doula italiana:** solo supporto post-parto virtuale; niente eyebrow "Waco, TX", niente raggio di 50 miglia.
  - **Sleep, versione US** (unica modifica voluta ai testi US): il box diventa `title: 'Available Anywhere in the US'`, testo `All sleep consulting sessions are conducted via <strong>video call</strong>, so I can work with families anywhere in the <strong>United States</strong>.`. Il TODO sopra il box va tolto.
  - **Sleep, versione italiana:** box "Online, in tutta Italia".
  - Aggiungi alla roadmap la frase US come "da confermare con Silvia".
- [ ] **Step 4:** Esegui `npm run test:e2e`. Atteso: PASS. Lo snapshot US cambia solo per il box sleep: controlla il diff, poi aggiornalo.
- [ ] **Step 5:** Commit `feat: Italian sleep consulting and postpartum doula pages`

### Task 9: Home e About in due lingue

**Files:**
- Create: `src/i18n/copy/home.ts`, `src/i18n/copy/about.ts`, `src/views/HomeView.astro`, `src/views/AboutView.astro`, `src/pages/it/index.astro`, `src/pages/it/about.astro`
- Modify: `src/pages/index.astro`, `src/pages/about.astro`, `e2e/italian-site.spec.ts`

**Interfaces:**
- Consumes: lo schema del Task 7; `getFeaturedTestimonials(locale)` (Task 4).

- [ ] **Step 1: Test.** Per `/it/` e `/it/about`, gli stessi controlli del Task 7, più "nessun `Waco`".
- [ ] **Step 2:** Esegui → FAIL.
- [ ] **Step 3:** Esegui la migrazione.
  - **Home italiana:** al posto del punto di fiducia `Waco, TX & Online` c'è `Online, in italiano`; la frase "In Waco and online nationwide" diventa una frase sul supporto online per le famiglie in Italia.
  - **Lead magnet e "From the Blog":** restano sotto i rispettivi flag in entrambe le lingue.
  - **`index.astro`:** circa 800 righe. Se la view supera le 800, sposta le sezioni più grandi (hero, servizi, testimonianze) in componenti in `src/views/home/`, ciascuno con `locale` e la sua parte di copy.
- [ ] **Step 4:** `npm run test:e2e` → PASS, snapshot US invariati.
- [ ] **Step 5:** Commit `feat: Italian home and about pages`

### Task 10: Contatti, FAQ, Testimonianze, Privacy in due lingue

**Files:**
- Create: `src/i18n/copy/{contact,faq,testimonials,privacy-policy}.ts`, `src/views/{Contact,Faq,Testimonials,PrivacyPolicy}View.astro`, `src/pages/it/{contact,faq,testimonials,privacy-policy}.astro`
- Modify: le quattro pagine US, `e2e/italian-site.spec.ts`

**Interfaces:**
- Consumes: lo schema del Task 7; `getFAQs(market, category?)` e `getTestimonials(language, serviceType?)` (Task 4); `UI[locale].faqCategories` e `testimonialFilters` (Task 3).

- [ ] **Step 1: Test.** Per le quattro pagine `/it`, gli stessi controlli del Task 7. In più:
  - `/it/contact` non contiene `Waco` né `in-home`;
  - `/it/privacy-policy` contiene `Bozza`.
- [ ] **Step 2:** Esegui → FAIL.
- [ ] **Step 3:** Esegui la migrazione.
  - **Contatti italiani:** area servita solo "Online, in tutta Italia". Gli orari di disponibilità, se citati, sono espressi in ora italiana.
  - **FAQ:** il JSON-LD resta, nella lingua della pagina.
  - **Testimonianze:** i filtri usano le etichette tradotte, ma filtrano sempre sui valori Sanity in inglese.
  - **Privacy italiana:** traduzione della policy attuale, con in cima un avviso visibile: `Bozza in attesa del parere legale.`.
  - **Privacy, versione US:** invariata.
- [ ] **Step 4:** `npm run test:e2e` → PASS, snapshot US invariati.
- [ ] **Step 5:** Commit `feat: Italian contact, FAQ, testimonials and privacy pages`

### Task 11: Controlli su tutto il sito e roadmap

**Files:**
- Modify: `e2e/italian-site.spec.ts`, `ROADMAP.md`

- [ ] **Step 1: Test.** In `italian-site.spec.ts`, ciclo su tutti gli `IT_PATHS`:
  - `Italian pages only link to Italian pages`: ogni href interno inizia con `/it` (sono ammessi `mailto:`, `#`, file statici e `/sitemap-index.xml`).
  - `Italian pages never load PostHog`: nessun elemento `script` contiene `posthog.init`. Il test gira con `PUBLIC_POSTHOG_KEY=test` nell'ambiente del `webServer`.
  - Per i prezzi:
    - nessuna pagina italiana contiene `$` seguito da una cifra;
    - nessuna pagina US contiene `€`.
  - `hreflang` reciproci: ogni pagina ha i link `en-US`, `it-IT` e `x-default`, e quello `it-IT` della pagina US porta a una pagina che risponde 200.
- [ ] **Step 2:** Esegui i test. Se qualcosa fallisce, correggi la view responsabile, non il test.
- [ ] **Step 3:** Aggiorna `ROADMAP.md`:
  - **Nuova fase "Versione italiana"**, con queste voci da spuntare:
    - revisione di Silvia di tutti i testi italiani (elenco dei file in `src/i18n/copy/` e `src/i18n/ui.ts`) e della frase US del box sleep;
    - creazione dei 3 eventi Cal.com italiani (`discovery-call-it`, `doula-intro-call-it`, `sleep-session-it`): EUR, fasce orarie per l'Italia, campo obbligatorio "Paese di residenza";
    - verifica che EUR sia tra le valute disponibili, altrimenti piano B: link di pagamento Stripe in euro inviato da Silvia;
    - verifica della lingua del popup Cal.com su `/it`;
    - aggiornamento di `CAL_LINKS.it`;
    - pacchetti, FAQ e testimonianze italiani in Sanity;
    - costo della conversione EUR→USD su Stripe;
    - commercialista per la fatturazione.
  - **Fase 7:** la regola firewall diventa "US + Italia, da confermare con l'avvocato". Al parere legale si aggiungono privacy e T&C italiani, banner dei cookie e PostHog per i visitatori italiani/EU.
  - **Sezione "Futuro":** togli la voce "Apertura ad altri paesi (es. Italia/GDPR)".
- [ ] **Step 4: Verifica finale.** Esegui `npm run check`, `npm run test:coverage` (soglie ≥ 80% rispettate), `npm run test:e2e` e `npm run build`. Atteso: tutto verde.
- [ ] **Step 5:** Commit `docs: roadmap for the Italian launch` e `test: site-wide checks for the Italian version`, in un unico commit oppure separati.
