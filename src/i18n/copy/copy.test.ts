import { describe, expect, test } from 'vitest';
import { ABOUT_COPY } from './about';
import { CONTACT_COPY } from './contact';
import { FAQ_COPY } from './faq';
import { HOME_COPY } from './home';
import { POSTPARTUM_DOULA_COPY } from './postpartum-doula';
import { PRIVACY_POLICY_COPY } from './privacy-policy';
import { SERVICES_COPY } from './services';
import { SLEEP_CONSULTING_COPY } from './sleep-consulting';
import { TESTIMONIALS_COPY } from './testimonials';

/**
 * Shape of a value with list lengths kept: views pair list items with icons
 * and colors by position, so the Italian lists must be as long as the English
 * ones (the service area is the one list allowed to differ: see below).
 */
function shapeOf(value: unknown): unknown {
	if (Array.isArray(value)) return value.map(shapeOf);
	if (value && typeof value === 'object') {
		return Object.fromEntries(
			Object.entries(value)
				.sort(([a], [b]) => a.localeCompare(b))
				.map(([key, inner]) => [key, shapeOf(inner)]),
		);
	}
	return typeof value;
}

const PAGE_COPIES = {
	about: ABOUT_COPY,
	faq: FAQ_COPY,
	home: HOME_COPY,
	'postpartum-doula': POSTPARTUM_DOULA_COPY,
	'privacy-policy': PRIVACY_POLICY_COPY,
	services: SERVICES_COPY,
	'sleep-consulting': SLEEP_CONSULTING_COPY,
	testimonials: TESTIMONIALS_COPY,
};

describe('page copy', () => {
	test.each(Object.entries(PAGE_COPIES))(
		'%s has the same structure in English and Italian',
		(_page, copy) => {
			expect(shapeOf(copy.it)).toEqual(shapeOf(copy.en));
		},
	);

	test('contact page has the same structure apart from the service area lines', () => {
		const withoutArea = (locale: 'en' | 'it') => ({
			...CONTACT_COPY[locale],
			info: { ...CONTACT_COPY[locale].info, serviceArea: [] },
		});
		expect(shapeOf(withoutArea('it'))).toEqual(shapeOf(withoutArea('en')));
	});

	test('Italian contact page lists online service in Italy only', () => {
		expect(CONTACT_COPY.it.info.serviceArea).toEqual([
			'Online, in tutta Italia',
		]);
	});
});
