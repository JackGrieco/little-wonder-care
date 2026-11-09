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
		page.locator('.navbar-links .language-switcher a', { hasText: 'US' }),
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

for (const [path, usPath] of [
	['/it/', '/'],
	['/it/about', '/about'],
] as const) {
	test(`Italian page ${path} is in Italian and never mentions Waco`, async ({
		page,
	}) => {
		await expectItalianPage(page, path, usPath);

		expect(await getBodyText(page)).not.toContain('Waco');
	});
}

test('Italian contact page serves Italy online only', async ({ page }) => {
	await expectItalianPage(page, '/it/contact', '/contact');

	const text = await getBodyText(page);
	expect(text).not.toContain('Waco');
	expect(text).not.toContain('in-home');
});

for (const [path, usPath] of [
	['/it/faq', '/faq'],
	['/it/testimonials', '/testimonials'],
] as const) {
	test(`Italian page ${path} is in Italian`, async ({ page }) => {
		await expectItalianPage(page, path, usPath);
	});
}

test('Italian privacy policy is marked as a draft awaiting the legal opinion', async ({
	page,
}) => {
	await expectItalianPage(page, '/it/privacy-policy', '/privacy-policy');

	expect(await getBodyText(page)).toContain('Bozza');
});
