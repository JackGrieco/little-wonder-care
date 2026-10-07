import type { ServicePackage, ServiceCategory } from '../lib/packages';

// Placeholder packages shown until Silvia's real ones are loaded into Sanity.
// Names, prices and features are NOT real: they only show the page layout.

const PACKAGES_PER_CATEGORY = 5;

const CATEGORY_NAMES: Record<ServiceCategory, string> = {
	sleep: 'Sleep Package',
	doula: 'Doula Package',
};

// Middle package highlighted to preview the "Most Popular" badge.
const POPULAR_INDEX = 2;

function createPlaceholder(
	category: ServiceCategory,
	index: number,
): ServicePackage {
	const number = index + 1;
	return {
		id: `placeholder-${category}-${number}`,
		category,
		title: `${CATEGORY_NAMES[category]} ${number}`,
		description:
			'Placeholder description: the final text for this package is coming soon.',
		price: number * 100,
		duration: 'Duration TBD',
		features: [
			'What is included #1',
			'What is included #2',
			'What is included #3',
		],
		isPopular: index === POPULAR_INDEX,
	};
}

export const PLACEHOLDER_PACKAGES: readonly ServicePackage[] = (
	['sleep', 'doula'] as const
).flatMap((category) =>
	Array.from({ length: PACKAGES_PER_CATEGORY }, (_, index) =>
		createPlaceholder(category, index),
	),
);
