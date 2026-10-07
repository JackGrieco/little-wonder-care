import { CAL_LINKS } from '../consts';
import { PLACEHOLDER_PACKAGES } from '../data/placeholderPackages';
import { getServicePackagesByType, type SanityServicePackage } from './sanity';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ServiceCategory = 'sleep' | 'doula';

export interface ServicePackage {
	id: string;
	category: ServiceCategory;
	title: string;
	description: string;
	price: number | null;
	priceNote?: string;
	duration?: string;
	features: readonly string[];
	isPopular: boolean;
	/** Cal.com event path for this package; defaults to the category's link. */
	bookingLink?: string;
}

interface CategoryConfig {
	label: string;
	/** Value of `serviceType` in the Sanity `servicePackage` schema. */
	sanityType: string;
	tag: string;
	/** Modifier class for `.package-card` in global.css (sets the colors). */
	cardClass: string;
	defaultBookingLink: string;
	ctaText: string;
	bookingNote: string;
}

// ─── Booking flows (from the 2026-10-05 call with Silvia) ─────────────────────
// Sleep: pick a package → book a 1-hour session → pay at booking.
// Doula: pick a package → book a free 15-minute intro call → contract and
//        payment are handled by Silvia after the call.

export const SERVICE_CATEGORIES: Record<ServiceCategory, CategoryConfig> = {
	sleep: {
		label: 'Sleep Consulting',
		sanityType: 'Sleep Consulting',
		tag: 'Sleep',
		cardClass: 'sleep',
		defaultBookingLink: CAL_LINKS.sleepSession,
		ctaText: 'Book Now',
		bookingNote: '1-hour session · payment at booking',
	},
	doula: {
		label: 'Postpartum Doula',
		sanityType: 'Postpartum Doula',
		tag: 'Postpartum',
		cardClass: 'doula',
		defaultBookingLink: CAL_LINKS.doulaIntroCall,
		ctaText: 'Book an Intro Call',
		bookingNote: 'Free 15-minute call first · nothing to pay now',
	},
};

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
 * Packages for one category, from Sanity when it has any, otherwise the
 * placeholders (Sanity is still empty until Silvia's final packages arrive).
 */
export async function getPackagesByCategory(
	category: ServiceCategory,
): Promise<ServicePackage[]> {
	const { sanityType } = SERVICE_CATEGORIES[category];

	try {
		const sanityPackages = await getServicePackagesByType(sanityType);
		if (sanityPackages.length > 0) {
			return sanityPackages.map((pkg) => fromSanity(pkg, category));
		}
	} catch (error: unknown) {
		console.warn(
			`[packages] Sanity fetch failed for "${category}", using placeholders`,
			error,
		);
	}

	return PLACEHOLDER_PACKAGES.filter((pkg) => pkg.category === category);
}

export function formatPrice(price: number): string {
	return `$${price.toLocaleString('en-US')}`;
}
