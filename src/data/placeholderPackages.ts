import type { Market } from '../i18n/locales';
import type { ServiceCategory, ServicePackage } from '../lib/packages';

// Placeholder packages shown until Silvia's real ones are loaded into Sanity.
// Names, prices and features are NOT real: they only show the page layout.
// Each market has its own set, so the Italian site never shows US placeholders.

const PACKAGES_PER_CATEGORY = 5;

// Middle package highlighted to preview the "Most Popular" badge.
const POPULAR_INDEX = 2;

interface PlaceholderText {
	names: Record<ServiceCategory, string>;
	description: string;
	duration: string;
	feature: string;
}

const PLACEHOLDER_TEXT: Record<Market, PlaceholderText> = {
	us: {
		names: { sleep: 'Sleep Package', doula: 'Doula Package' },
		description:
			'Placeholder description: the final text for this package is coming soon.',
		duration: 'Duration TBD',
		feature: 'What is included',
	},
	it: {
		names: { sleep: 'Pacchetto Sonno', doula: 'Pacchetto Doula virtuale' },
		description:
			'Descrizione provvisoria: il testo definitivo di questo pacchetto arriverà a breve.',
		duration: 'Durata da definire',
		feature: 'Cosa è incluso',
	},
};

function createPlaceholder(
	market: Market,
	category: ServiceCategory,
	index: number,
): ServicePackage {
	const text = PLACEHOLDER_TEXT[market];
	const number = index + 1;
	return {
		id: `placeholder-${market}-${category}-${number}`,
		category,
		title: `${text.names[category]} ${number}`,
		description: text.description,
		price: number * 100,
		duration: text.duration,
		features: [1, 2, 3].map((n) => `${text.feature} #${n}`),
		isPopular: index === POPULAR_INDEX,
	};
}

/** Placeholder packages of one market, for both categories. */
export function getPlaceholderPackages(
	market: Market,
): readonly ServicePackage[] {
	return (['sleep', 'doula'] as const).flatMap((category) =>
		Array.from({ length: PACKAGES_PER_CATEGORY }, (_, index) =>
			createPlaceholder(market, category, index),
		),
	);
}
