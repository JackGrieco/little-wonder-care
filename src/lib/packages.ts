import { CAL_LINKS, type CalLinks } from '../consts';
import { getPlaceholderPackages } from '../data/placeholderPackages';
import { LOCALE_CONFIG, type Locale } from '../i18n/locales';
import { getServicePackagesByType, type SanityServicePackage } from './sanity';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ServiceCategory = 'sleep' | 'doula';

export interface ServicePackage {
	id: string;
	category: ServiceCategory;
	title: string;
	description: string;
	/** In the currency of the package's market (USD or EUR). */
	price: number | null;
	priceNote?: string;
	duration?: string;
	features: readonly string[];
	isPopular: boolean;
	/** Cal.com event path for this package; defaults to the category's link. */
	bookingLink?: string;
}

interface CategoryConfig {
	/** Value of `serviceType` in the Sanity `servicePackage` schema. */
	sanityType: string;
	/** Modifier class for `.package-card` in global.css (sets the colors). */
	cardClass: string;
	/** Which Cal.com event the card opens when the package has no own link. */
	bookingLinkKey: keyof Pick<CalLinks, 'sleepSession' | 'doulaIntroCall'>;
}

// ─── Booking flows (from the 2026-10-05 call with Silvia) ─────────────────────
// Sleep: pick a package → book a 1-hour session → pay at booking.
// Doula: pick a package → book a free 15-minute intro call → contract and
//        payment are handled by Silvia after the call.
// Same flows on the Italian site. Category texts are in UI (src/i18n/ui.ts).

export const SERVICE_CATEGORIES: Record<ServiceCategory, CategoryConfig> = {
	sleep: {
		sanityType: 'Sleep Consulting',
		cardClass: 'sleep',
		bookingLinkKey: 'sleepSession',
	},
	doula: {
		sanityType: 'Postpartum Doula',
		cardClass: 'doula',
		bookingLinkKey: 'doulaIntroCall',
	},
};

/** Cal.com event a package card opens, in the page's language. */
export function getBookingLink(pkg: ServicePackage, locale: Locale): string {
	const { bookingLinkKey } = SERVICE_CATEGORIES[pkg.category];
	return pkg.bookingLink ?? CAL_LINKS[locale][bookingLinkKey];
}

// ─── Data access ──────────────────────────────────────────────────────────────

function fromSanity(
	pkg: SanityServicePackage,
	category: ServiceCategory,
): ServicePackage {
	return {
		id: pkg._id,
		category,
		title: pkg.title,
		description: pkg.description ?? '',
		price: pkg.price ?? null,
		priceNote: pkg.priceNote,
		duration: pkg.duration,
		features: pkg.features ?? [],
		isPopular: pkg.isPopular ?? false,
		bookingLink: pkg.ctaLink?.replace(/^cal:/, '') || undefined,
	};
}

/**
 * Packages for one category and one site version, from Sanity when it has
 * any, otherwise that market's placeholders (Sanity is still empty until
 * Silvia's final packages arrive). Never mixes markets.
 */
export async function getPackagesByCategory(
	category: ServiceCategory,
	locale: Locale,
): Promise<ServicePackage[]> {
	const { sanityType } = SERVICE_CATEGORIES[category];
	const { market } = LOCALE_CONFIG[locale];

	try {
		const sanityPackages = await getServicePackagesByType(sanityType, market);
		if (sanityPackages.length > 0) {
			return sanityPackages.map((pkg) => fromSanity(pkg, category));
		}
	} catch (error: unknown) {
		console.warn(
			`[packages] Sanity fetch failed for "${category}" (${market}), using placeholders`,
			error,
		);
	}

	return getPlaceholderPackages(market).filter(
		(pkg) => pkg.category === category,
	);
}
