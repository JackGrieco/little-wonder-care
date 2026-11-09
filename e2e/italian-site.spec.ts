import { expect, test, type Page } from '@playwright/test';
import { getBodyText, openPage } from './helpers';

const MARKET_NOTICE =
	'Sessioni in italiano, riservate a chi risiede in Italia.';

/** Checks every Italian page shares: it exists, is in Italian, switches back to the US page. */
async function expectItalianPage(page: Page, path: string, usPath: string) {
	const response = await openPage(page, path);
	expect(response?.status()).toBe(200);
	await expect(page.locator('html')).toHaveAttribute('lang', 'it');
	await expect(
		page.locator('.navbar-links .language-switcher a', { hasText: 'EN' }),
	).toHaveAttribute('href', usPath);
}

test('Italian services page shows Italian packages in euros', async ({
	page,
}) => {
	await expectItalianPage(page, '/it/services', '/services');

	const text = await getBodyText(page);
	expect(text).toContain(MARKET_NOTICE);
	expect(text).toContain('€');
	expect(text).not.toContain('$');
});

test('Italian sleep consulting page shows Italian packages in euros', async ({
	page,
}) => {
	await expectItalianPage(page, '/it/sleep-consulting', '/sleep-consulting');

	const text = await getBodyText(page);
	expect(text).toContain(MARKET_NOTICE);
	expect(text).toContain('€');
	expect(text).not.toContain('$');
});

test('Italian postpartum doula page offers online support only', async ({
	page,
}) => {
	await expectItalianPage(page, '/it/postpartum-doula', '/postpartum-doula');

	const text = await getBodyText(page);
	expect(text).toContain(MARKET_NOTICE);
	expect(text).toContain('€');
	expect(text).not.toContain('$');
	expect(text).not.toContain('Waco');
	expect(text).not.toContain('in-home');
});
