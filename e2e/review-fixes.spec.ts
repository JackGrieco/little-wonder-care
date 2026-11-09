import { expect, test } from '@playwright/test';
import { IT_PATHS, getBodyText, openPage } from './helpers';

// English interface strings that must never show on the Italian site.
const ENGLISH_UI_TEXT = [
	'Learn More',
	'Book Now',
	'Get in Touch',
	'Most Popular',
	'Read All Stories',
	'Send a Message',
];

for (const path of IT_PATHS) {
	test(`Italian page ${path} shows no English interface text`, async ({
		page,
	}) => {
		await openPage(page, path);
		const text = await getBodyText(page);
		expect(ENGLISH_UI_TEXT.filter((phrase) => text.includes(phrase))).toEqual(
			[],
		);
	});
}

test('language switcher link is fully opaque and named in full', async ({
	page,
}) => {
	await openPage(page, '/services');
	const link = page.locator('.navbar-links .language-switcher a');

	await expect(link).toHaveCSS('opacity', '1');
	await expect(link).toHaveAccessibleName('Italiano');

	await openPage(page, '/it/services');
	await expect(
		page.locator('.navbar-links .language-switcher a'),
	).toHaveAccessibleName('English');
});

test('US FAQ subtitle link keeps its font weight', async ({ page }) => {
	await openPage(page, '/faq');
	await expect(page.locator('.page-hero a')).toHaveCSS('font-weight', '500');
});

test.describe('mobile menu', () => {
	test.use({ viewport: { width: 390, height: 844 } });

	test('language switcher lines up with the other menu items', async ({
		page,
	}) => {
		await openPage(page, '/services');
		await page.locator('#menu-toggle').click();

		const switcher = page.locator('.mobile-menu .language-switcher');
		const aboutLink = page.locator('.mobile-menu > ul > li > a', {
			hasText: 'About',
		});
		await expect(switcher).toBeVisible();

		// Where the text starts and how it is set, for the switcher and a menu link.
		const textStyle = (element: Element) => {
			const style = getComputedStyle(element);
			return {
				textStart: Math.round(
					element.getBoundingClientRect().left + parseFloat(style.paddingLeft),
				),
				fontSize: style.fontSize,
				letterSpacing: style.letterSpacing,
			};
		};
		expect(await switcher.evaluate(textStyle)).toEqual(
			await aboutLink.evaluate(textStyle),
		);
	});
});
