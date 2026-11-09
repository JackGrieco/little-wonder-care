import { describe, expect, test } from 'vitest';
import { UI } from './ui';

describe('UI strings', () => {
	test('Italian packages state that sessions are in Italian for residents of Italy', () => {
		expect(UI.it.packages.marketNotice).toBe(
			'Sessioni in italiano, riservate a chi risiede in Italia.',
		);
	});

	test('US packages show no market notice', () => {
		expect(UI.en.packages.marketNotice).toBeNull();
	});
});
