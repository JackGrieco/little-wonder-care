import { beforeEach, describe, expect, test, vi } from 'vitest';
import { getPackagesByCategory } from './packages';
import { getServicePackagesByType, type SanityServicePackage } from './sanity';

vi.mock('./sanity', () => ({ getServicePackagesByType: vi.fn() }));

const fetchPackages = vi.mocked(getServicePackagesByType);

const SANITY_PACKAGE: SanityServicePackage = {
	_id: 'pkg-1',
	_type: 'servicePackage',
	title: 'Pacchetto Sonno',
	serviceType: 'Sleep Consulting',
	price: 150,
	features: ['Una sessione'],
	ctaLink: 'cal:littlewondercare/sleep-session-it',
	market: 'it',
};

beforeEach(() => {
	fetchPackages.mockReset();
	vi.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('getPackagesByCategory', () => {
	test('falls back to Italian placeholders when Sanity fails', async () => {
		fetchPackages.mockRejectedValue(new Error('network down'));

		const packages = await getPackagesByCategory('sleep', 'it');

		expect(packages.length).toBeGreaterThan(0);
		expect(packages.every((pkg) => pkg.id.startsWith('placeholder-it-'))).toBe(
			true,
		);
	});

	test('falls back to Italian placeholders when Sanity has no packages', async () => {
		fetchPackages.mockResolvedValue([]);

		const packages = await getPackagesByCategory('doula', 'it');

		expect(packages.length).toBeGreaterThan(0);
		expect(
			packages.every((pkg) => pkg.id.startsWith('placeholder-it-doula-')),
		).toBe(true);
	});

	test('maps Sanity packages and strips the cal: prefix from the booking link', async () => {
		fetchPackages.mockResolvedValue([SANITY_PACKAGE]);

		const [pkg] = await getPackagesByCategory('sleep', 'it');

		expect(pkg).toMatchObject({
			id: 'pkg-1',
			category: 'sleep',
			title: 'Pacchetto Sonno',
			price: 150,
			bookingLink: 'littlewondercare/sleep-session-it',
		});
	});

	test.each([
		['it', 'it'],
		['en', 'us'],
	] as const)(
		'asks Sanity for the %s locale packages of the %s market',
		async (locale, market) => {
			fetchPackages.mockResolvedValue([SANITY_PACKAGE]);

			await getPackagesByCategory('sleep', locale);

			expect(fetchPackages).toHaveBeenCalledWith('Sleep Consulting', market);
		},
	);
});

describe('getPackagesByCategory with sparse Sanity documents', () => {
	test('fills in defaults for missing optional fields', async () => {
		fetchPackages.mockResolvedValue([
			{ _id: 'pkg-2', _type: 'servicePackage', title: 'Minimal' },
		]);

		const [pkg] = await getPackagesByCategory('doula', 'en');

		expect(pkg).toEqual({
			id: 'pkg-2',
			category: 'doula',
			title: 'Minimal',
			description: '',
			price: null,
			priceNote: undefined,
			duration: undefined,
			features: [],
			isPopular: false,
			bookingLink: undefined,
		});
	});
});
