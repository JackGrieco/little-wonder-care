import { describe, expect, test } from 'vitest';
import { getBookingLinkWarning } from './booking-links';

describe('getBookingLinkWarning', () => {
	test.each([
		[undefined, 'it'],
		['', 'it'],
		['cal:littlewondercare/sleep-session-it', 'it'],
		['littlewondercare/sleep-session-it', 'it'],
		['cal:littlewondercare/sleep-session', 'us'],
		[undefined, 'us'],
	] as const)('accepts %s for the %s market', (link, market) => {
		expect(getBookingLinkWarning(link, market)).toBeNull();
	});

	test('warns when an Italian package opens a US event', () => {
		expect(
			getBookingLinkWarning('cal:littlewondercare/sleep-session', 'it'),
		).toMatch(/-it/);
	});

	test('warns when a US package opens an Italian event', () => {
		expect(
			getBookingLinkWarning('cal:littlewondercare/sleep-session-it', 'us'),
		).toMatch(/US/);
	});
});
