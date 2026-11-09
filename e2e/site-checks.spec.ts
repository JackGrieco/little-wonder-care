import { expect, test, type Page } from '@playwright/test';
import { IT_PATHS, US_PATHS, getBodyText, openPage } from './helpers';

const ITALIAN_PATH = /^\/it(\/|$|#)/;

async function hasAnalyticsScript(page: Page): Promise<boolean> {
	return page.evaluate(() =>
		[...document.scripts].some((script) =>
			script.textContent?.includes('posthog.init'),
		),
	);
}

test('the US home page loads PostHog (control for the check below)', async ({
	page,
}) => {
	await openPage(page, '/');
	expect(await hasAnalyticsScript(page)).toBe(true);
});

for (const path of IT_PATHS) {
	test(`Italian page ${path} only links to Italian pages`, async ({ page }) => {
		await openPage(page, path);
		// The language switcher is the one place meant to lead to the US site.
		const internalLinks = await page
			.locator('body a[href^="/"]:not(.language-switcher a)')
			.evaluateAll((anchors) =>
				anchors.map((anchor) => anchor.getAttribute('href') ?? ''),
			);

		expect(internalLinks.length).toBeGreaterThan(0);
		expect(internalLinks.filter((href) => !ITALIAN_PATH.test(href))).toEqual(
			[],
		);
	});

	test(`Italian page ${path} never loads PostHog`, async ({ page }) => {
		await openPage(page, path);
		expect(await hasAnalyticsScript(page)).toBe(false);
	});

	test(`Italian page ${path} shows no dollar prices`, async ({ page }) => {
		await openPage(page, path);
		expect(await getBodyText(page)).not.toMatch(/\$\s?\d/);
	});
}

for (const path of US_PATHS) {
	test(`US page ${path} shows no euro prices`, async ({ page }) => {
		await openPage(page, path);
		expect(await getBodyText(page)).not.toContain('€');
	});
}

for (const path of [...US_PATHS, ...IT_PATHS]) {
	test(`page ${path} links its other-language version with hreflang`, async ({
		page,
		request,
	}) => {
		await openPage(page, path);
		const alternates = await page
			.locator('head link[rel="alternate"][hreflang]')
			.evaluateAll((links) =>
				Object.fromEntries(
					links.map((link) => [
						link.getAttribute('hreflang'),
						link.getAttribute('href'),
					]),
				),
			);

		expect(Object.keys(alternates).sort()).toEqual([
			'en-US',
			'it-IT',
			'x-default',
		]);
		for (const href of Object.values(alternates)) {
			// hrefs are absolute production URLs: check the same path locally.
			const response = await request.get(new URL(href as string).pathname);
			expect(response.status(), href as string).toBe(200);
		}
	});
}
