// Languages of the site and the market each one sells to.
// English is the US site at the root ("/services"); Italian lives under
// "/it" ("/it/services"). Page paths stay in English in both versions, so the
// equivalent page in the other language is always the same path with or
// without the "/it" prefix.

export const LOCALES = ['en', 'it'] as const;
export type Locale = (typeof LOCALES)[number];
export type Market = 'us' | 'it';

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleConfig {
	market: Market;
	/** Language-region code for hreflang tags and the sitemap. */
	hreflang: 'en-US' | 'it-IT';
	/** Open Graph locale (underscore form). */
	ogLocale: 'en_US' | 'it_IT';
	currency: 'USD' | 'EUR';
	/** Locale passed to Intl.NumberFormat for prices. */
	numberFormat: 'en-US' | 'it-IT';
	/** Text shown in the language switcher. */
	label: 'EN' | 'IT';
	/** Full language name, read by screen readers on the switcher link. */
	name: 'English' | 'Italiano';
}

export const LOCALE_CONFIG: Record<Locale, LocaleConfig> = {
	en: {
		market: 'us',
		hreflang: 'en-US',
		ogLocale: 'en_US',
		currency: 'USD',
		numberFormat: 'en-US',
		label: 'EN',
		name: 'English',
	},
	it: {
		market: 'it',
		hreflang: 'it-IT',
		ogLocale: 'it_IT',
		currency: 'EUR',
		numberFormat: 'it-IT',
		label: 'IT',
		name: 'Italiano',
	},
};

// "/it" or "/it/...", but not "/italy": the prefix must be a whole segment.
const ITALIAN_PREFIX = /^\/it(?=\/|$|#|\?)/;

/** Path without the language prefix: "/it/services" → "/services", "/it" → "/". */
export function stripLocale(pathname: string): string {
	const stripped = pathname.replace(ITALIAN_PREFIX, '');
	return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

/** Same page in the given language: ("/services", "it") → "/it/services". */
export function localizePath(path: string, locale: Locale): string {
	const basePath = stripLocale(path);
	if (locale === DEFAULT_LOCALE) return basePath;
	return `/${locale}${basePath}`;
}

export interface Alternate {
	hreflang: LocaleConfig['hreflang'] | 'x-default';
	href: string;
}

/**
 * Absolute URLs of a page in every language, plus "x-default" (the US page),
 * for the <link rel="alternate" hreflang> tags.
 */
export function getAlternates(
	pathname: string,
	site: URL,
): readonly Alternate[] {
	const toUrl = (locale: Locale) =>
		new URL(localizePath(pathname, locale), site).href;

	return [
		...LOCALES.map((locale) => ({
			hreflang: LOCALE_CONFIG[locale].hreflang,
			href: toUrl(locale),
		})),
		{ hreflang: 'x-default', href: toUrl(DEFAULT_LOCALE) },
	];
}
