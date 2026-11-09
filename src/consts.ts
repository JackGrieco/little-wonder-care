import type { Locale } from './i18n/locales';

// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Little Wonder Care';
export const SITE_DESCRIPTION = 'Welcome to my website!';

// Public contact email shown on the site (contact page, privacy policy, footer).
export const CONTACT_EMAIL = 'silvia@littlewondercareco.com';

// Cal.com event paths (cal.com/<path>), opened as popups via data-cal-link.
// One set per site version: the Italian events have their own prices (EUR),
// hours for Italy and a required "country of residence" field.
export interface CalLinks {
	discoveryCall: string;
	doulaIntroCall: string;
	sleepSession: string;
}

export const CAL_LINKS: Record<Locale, CalLinks> = {
	en: {
		discoveryCall: 'littlewondercare/discovery-call',
		// TODO: these events don't exist on Cal.com yet (durations and prices come
		// from Silvia). Until they do, they fall back to the discovery call so no
		// button opens an empty popup.
		doulaIntroCall: 'littlewondercare/discovery-call',
		sleepSession: 'littlewondercare/discovery-call',
	},
	it: {
		// TODO: create the Italian events on Cal.com, then switch to
		// discovery-call-it, doula-intro-call-it and sleep-session-it
		// (see ROADMAP.md). Until then every button opens the discovery call.
		discoveryCall: 'littlewondercare/discovery-call',
		doulaIntroCall: 'littlewondercare/discovery-call',
		sleepSession: 'littlewondercare/discovery-call',
	},
};

// Sanity project (public identifiers, not secrets). Owned by the business account.
// PUBLIC_SANITY_* env vars, when set, take precedence in src/lib/sanity.ts.
export const SANITY_PROJECT_ID = 'zjnv9ypr';
export const SANITY_DATASET = 'production';

// Feature flags: sections hidden until they are ready (decided with Silvia, 2026-10-05).
// When false, the related pages and sections are not generated at all.
export const IS_BLOG_ENABLED = false;
export const IS_LEAD_MAGNET_ENABLED = false;
