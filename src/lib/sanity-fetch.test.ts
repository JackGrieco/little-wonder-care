import {
	afterEach,
	describe,
	expect,
	test,
	vi,
	type MockInstance,
} from 'vitest';
import {
	FAQS_QUERY,
	FEATURED_TESTIMONIALS_QUERY,
	SERVICE_PACKAGES_QUERY,
	TESTIMONIALS_QUERY,
	client,
	getBlogPost,
	getBlogPostSlugs,
	getBlogPosts,
	getFAQs,
	getFeaturedTestimonials,
	getServicePackagesByType,
	getTestimonials,
	urlFor,
} from './sanity';

// The Sanity client drops undefined params, and GROQ then fails on the
// missing $param: optional filters must always be sent as null.
// client.fetch has many overloads; the tests only need (query, params).
type Fetch = (
	query: string,
	params?: Record<string, unknown>,
) => Promise<unknown>;
const fetchSpy = vi.spyOn(client, 'fetch') as unknown as MockInstance<Fetch>;

afterEach(() => fetchSpy.mockReset());

describe('content fetchers', () => {
	test('getFAQs sends a null category when none is given', async () => {
		fetchSpy.mockResolvedValue([]);
		await getFAQs('it');
		expect(fetchSpy).toHaveBeenCalledWith(FAQS_QUERY, {
			market: 'it',
			category: null,
		});
	});

	test('getFAQs forwards the category when given', async () => {
		fetchSpy.mockResolvedValue([]);
		await getFAQs('us', 'Pricing');
		expect(fetchSpy).toHaveBeenCalledWith(FAQS_QUERY, {
			market: 'us',
			category: 'Pricing',
		});
	});

	test('getTestimonials sends a null service type when none is given', async () => {
		fetchSpy.mockResolvedValue([]);
		await getTestimonials('it');
		expect(fetchSpy).toHaveBeenCalledWith(TESTIMONIALS_QUERY, {
			language: 'it',
			serviceType: null,
		});
	});

	test('getFeaturedTestimonials asks for one language', async () => {
		fetchSpy.mockResolvedValue([]);
		await getFeaturedTestimonials('en');
		expect(fetchSpy).toHaveBeenCalledWith(FEATURED_TESTIMONIALS_QUERY, {
			language: 'en',
		});
	});

	test('getServicePackagesByType asks for one type and one market', async () => {
		fetchSpy.mockResolvedValue([]);
		await getServicePackagesByType('Sleep Consulting', 'it');
		expect(fetchSpy).toHaveBeenCalledWith(SERVICE_PACKAGES_QUERY, {
			serviceType: 'Sleep Consulting',
			market: 'it',
		});
	});
});

describe('blog fetchers', () => {
	test('getBlogPostSlugs returns plain slug strings', async () => {
		fetchSpy.mockResolvedValue([
			{ slug: { current: 'first-post' } },
			{ slug: { current: 'second-post' } },
		]);
		expect(await getBlogPostSlugs()).toEqual([
			{ slug: 'first-post' },
			{ slug: 'second-post' },
		]);
	});

	test('getBlogPost looks a post up by slug', async () => {
		fetchSpy.mockResolvedValue(null);
		expect(await getBlogPost('missing')).toBeNull();
		expect(fetchSpy).toHaveBeenCalledWith(expect.any(String), {
			slug: 'missing',
		});
	});

	test('getBlogPosts returns what Sanity returns', async () => {
		fetchSpy.mockResolvedValue([]);
		expect(await getBlogPosts()).toEqual([]);
	});
});

describe('urlFor', () => {
	test('builds a Sanity CDN image URL from an image reference', () => {
		const url = urlFor({
			_type: 'image',
			asset: { _ref: 'image-abc123-80x80-png', _type: 'reference' },
		}).url();
		expect(url).toContain('cdn.sanity.io/images/');
		expect(url).toContain('abc123-80x80.png');
	});
});
