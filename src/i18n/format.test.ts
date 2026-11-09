import { describe, expect, test } from 'vitest';
import { formatPrice } from './format';

describe('formatPrice', () => {
	test.each([
		[150, 'en', '$150'],
		[1500, 'en', '$1,500'],
		[150, 'it', '150 €'],
		[99.5, 'it', '99,50 €'],
	] as const)('formatPrice(%s, %s) returns %s', (price, locale, expected) => {
		expect(formatPrice(price, locale)).toBe(expected);
	});
});

test('groups thousands in Italian prices like Italian price lists do', () => {
	expect(formatPrice(1500, 'it')).toBe('1.500 €');
});
