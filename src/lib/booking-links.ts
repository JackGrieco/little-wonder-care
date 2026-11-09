import type { Market } from '../i18n/locales';

// Italian Cal.com events end in "-it" (discovery-call-it, sleep-session-it...):
// they charge in EUR and ask for the country of residence.
const ITALIAN_EVENT = /-it$/;

/**
 * Warning for Sanity Studio when a package's booking link belongs to the
 * other market, e.g. an Italian package duplicated from a US one still
 * opening the US event (paid in USD). Null when the link is fine or empty
 * (empty means the default event of the package's market).
 */
export function getBookingLinkWarning(
	ctaLink: string | undefined,
	market: Market | undefined,
): string | null {
	const path = ctaLink?.replace(/^cal:/, '').trim();
	if (!path) return null;

	const isItalianEvent = ITALIAN_EVENT.test(path);
	if (market === 'it' && !isItalianEvent) {
		return 'Italian packages should open an Italian Cal.com event (its path ends in "-it"). Leave the field empty to use the default Italian event.';
	}
	if (market !== 'it' && isItalianEvent) {
		return 'US packages should not open an Italian Cal.com event (its path ends in "-it").';
	}
	return null;
}
