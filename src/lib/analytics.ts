import type { Locale } from '../i18n/locales';

/**
 * Whether PostHog may load on a page. Off on the Italian site until the
 * legal opinion says how (and with which consent) visitors in Italy/the EU
 * can be tracked. When a cookie banner arrives, this is the one place to
 * change.
 */
export function isAnalyticsEnabled(locale: Locale): boolean {
	return locale === 'en';
}
