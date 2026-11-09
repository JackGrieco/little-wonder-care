import { describe, expect, test } from 'vitest';
import {
	LOCALE_CONFIG,
	getAlternates,
	localizePath,
	stripLocale,
} from './locales';

describe('stripLocale', () => {
	test.each([
		['/it', '/'],
		['/it/', '/'],
		['/it/services', '/services'],
		['/it/services/', '/services/'],
		['/services', '/services'],
		['/', '/'],
		['/italy', '/italy'],
	])('stripLocale(%s) returns %s', (input, expected) => {
		expect(stripLocale(input)).toBe(expected);
	});
});

describe('localizePath', () => {
	test.each([
		['/services', 'it', '/it/services'],
		['/', 'it', '/it/'],
		['/services', 'en', '/services'],
		['/it/services', 'en', '/services'],
		['/it/services', 'it', '/it/services'],
		['/services#sleep', 'it', '/it/services#sleep'],
	] as const)('localizePath(%s, %s) returns %s', (path, locale, expected) => {
		expect(localizePath(path, locale)).toBe(expected);
	});
});

describe('getAlternates', () => {
	test('lists the US, Italian and default versions of a page', () => {
		const site = new URL('https://littlewondercareco.com');

		expect(getAlternates('/it/services', site)).toEqual([
			{ hreflang: 'en-US', href: 'https://littlewondercareco.com/services' },
			{ hreflang: 'it-IT', href: 'https://littlewondercareco.com/it/services' },
			{
				hreflang: 'x-default',
				href: 'https://littlewondercareco.com/services',
			},
		]);
	});
});

describe('LOCALE_CONFIG', () => {
	test('maps Italian to the Italian market in euros', () => {
		expect(LOCALE_CONFIG.it.market).toBe('it');
		expect(LOCALE_CONFIG.it.currency).toBe('EUR');
	});

	test('maps English to the US market in dollars', () => {
		expect(LOCALE_CONFIG.en.market).toBe('us');
		expect(LOCALE_CONFIG.en.currency).toBe('USD');
	});
});
