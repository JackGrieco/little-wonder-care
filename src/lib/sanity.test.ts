import { evaluate, parse } from 'groq-js';
import { describe, expect, test } from 'vitest';
import {
	FAQS_QUERY,
	FEATURED_TESTIMONIALS_QUERY,
	SERVICE_PACKAGES_QUERY,
	TESTIMONIALS_QUERY,
} from './sanity';

/** Runs a GROQ query against in-memory documents and returns the result ids. */
async function queryIds(
	query: string,
	params: Record<string, unknown>,
	dataset: readonly Record<string, unknown>[],
): Promise<string[]> {
	const tree = parse(query, { params });
	const result = await (await evaluate(tree, { dataset, params })).get();
	return (result as { _id: string }[]).map((doc) => doc._id).sort();
}

const PACKAGES = [
	{ _id: 'pkg-us', market: 'us' },
	{ _id: 'pkg-it', market: 'it' },
	{ _id: 'pkg-no-market' },
	{ _id: 'pkg-it-inactive', market: 'it', isActive: false },
].map((doc, index) => ({
	_type: 'servicePackage',
	serviceType: 'Sleep Consulting',
	sortOrder: index,
	...doc,
}));

const FAQS = [
	{ _id: 'faq-us', market: 'us', category: 'General' },
	{ _id: 'faq-it', market: 'it', category: 'General' },
	{ _id: 'faq-it-pricing', market: 'it', category: 'Pricing' },
	{ _id: 'faq-no-market', category: 'Pricing' },
].map((doc) => ({ _type: 'faq', question: 'Q', ...doc }));

const TESTIMONIALS = [
	{ _id: 't-en', language: 'en', serviceType: 'Sleep Consulting' },
	{ _id: 't-it', language: 'it', serviceType: 'Sleep Consulting' },
	{ _id: 't-it-doula', language: 'it', serviceType: 'Postpartum Doula' },
	{ _id: 't-no-language', serviceType: 'Postpartum Doula' },
].map((doc, index) => ({
	_type: 'testimonial',
	name: 'N',
	quote: 'Q',
	featured: true,
	_createdAt: `2026-01-0${index + 1}T00:00:00Z`,
	...doc,
}));

describe('SERVICE_PACKAGES_QUERY', () => {
	const serviceType = 'Sleep Consulting';

	test('returns only Italian packages for the it market', async () => {
		const ids = await queryIds(
			SERVICE_PACKAGES_QUERY,
			{ serviceType, market: 'it' },
			PACKAGES,
		);
		expect(ids).toEqual(['pkg-it']);
	});

	test('treats documents without market as US', async () => {
		const ids = await queryIds(
			SERVICE_PACKAGES_QUERY,
			{ serviceType, market: 'us' },
			PACKAGES,
		);
		expect(ids).toEqual(['pkg-no-market', 'pkg-us']);
	});
});

describe('FAQS_QUERY', () => {
	test('returns only Italian FAQs for the it market', async () => {
		const ids = await queryIds(
			FAQS_QUERY,
			{ market: 'it', category: null },
			FAQS,
		);
		expect(ids).toEqual(['faq-it', 'faq-it-pricing']);
	});

	test('treats documents without market as US', async () => {
		const ids = await queryIds(
			FAQS_QUERY,
			{ market: 'us', category: null },
			FAQS,
		);
		expect(ids).toEqual(['faq-no-market', 'faq-us']);
	});

	test('filters by category within the market', async () => {
		const ids = await queryIds(
			FAQS_QUERY,
			{ market: 'it', category: 'Pricing' },
			FAQS,
		);
		expect(ids).toEqual(['faq-it-pricing']);
	});
});

describe('TESTIMONIALS_QUERY', () => {
	test('returns only Italian testimonials for the it language', async () => {
		const ids = await queryIds(
			TESTIMONIALS_QUERY,
			{ language: 'it', serviceType: null },
			TESTIMONIALS,
		);
		expect(ids).toEqual(['t-it', 't-it-doula']);
	});

	test('treats documents without language as English', async () => {
		const ids = await queryIds(
			TESTIMONIALS_QUERY,
			{ language: 'en', serviceType: null },
			TESTIMONIALS,
		);
		expect(ids).toEqual(['t-en', 't-no-language']);
	});

	test('filters by service type within the language', async () => {
		const ids = await queryIds(
			TESTIMONIALS_QUERY,
			{ language: 'it', serviceType: 'Postpartum Doula' },
			TESTIMONIALS,
		);
		expect(ids).toEqual(['t-it-doula']);
	});
});

describe('FEATURED_TESTIMONIALS_QUERY', () => {
	test('returns only Italian featured testimonials for the it language', async () => {
		const ids = await queryIds(
			FEATURED_TESTIMONIALS_QUERY,
			{ language: 'it' },
			[
				...TESTIMONIALS,
				{ ...TESTIMONIALS[1], _id: 't-it-not-featured', featured: false },
			],
		);
		expect(ids).toEqual(['t-it', 't-it-doula']);
	});

	test('treats documents without language as English', async () => {
		const ids = await queryIds(
			FEATURED_TESTIMONIALS_QUERY,
			{ language: 'en' },
			TESTIMONIALS,
		);
		expect(ids).toEqual(['t-en', 't-no-language']);
	});
});
