import { describe, expect, test } from 'vitest';
import { isAnalyticsEnabled } from './analytics';

describe('isAnalyticsEnabled', () => {
	test('tracks visits on the US site', () => {
		expect(isAnalyticsEnabled('en')).toBe(true);
	});

	test('never tracks visits on the Italian site until the legal opinion arrives', () => {
		expect(isAnalyticsEnabled('it')).toBe(false);
	});
});
