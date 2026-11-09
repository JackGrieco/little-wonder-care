import type { Page } from '@playwright/test';
import { localizePath } from '../src/i18n/locales';

export const US_PATHS: readonly string[] = [
	'/',
	'/about',
	'/services',
	'/sleep-consulting',
	'/postpartum-doula',
	'/faq',
	'/testimonials',
	'/contact',
	'/privacy-policy',
];

/** Snapshot-friendly name for a path: "home" for "/", otherwise the path without slashes. */
export function slugFor(path: string): string {
	const trimmed = path.replace(/^\/+|\/+$/g, '').replace(/\//g, '-');
	return trimmed === '' ? 'home' : trimmed;
}

/** Visible text of the body, without scripts and styles, whitespace collapsed. */
export async function getBodyText(page: Page): Promise<string> {
	const text = await page.evaluate(() => {
		const clone = document.body.cloneNode(true) as HTMLElement;
		clone.querySelectorAll('script, style').forEach((node) => node.remove());
		return clone.textContent ?? '';
	});
	return text.replace(/\s+/g, ' ').trim();
}

/** Internal link targets of the body (anchors only), sorted and deduplicated. */
export async function getInternalHrefs(page: Page): Promise<string[]> {
	const hrefs = await page
		.locator('body a[href^="/"]')
		.evaluateAll((anchors) =>
			anchors.map((anchor) => anchor.getAttribute('href') ?? ''),
		);
	return [...new Set(hrefs)].sort();
}

/**
 * Opens a page and waits until the network is idle. On a cold start the Vite
 * dev server optimizes dependencies and reloads the page once; reading the
 * page before that would fail with "execution context was destroyed".
 */
export async function openPage(page: Page, path: string) {
	return page.goto(path, { waitUntil: 'networkidle' });
}

/** The same pages on the Italian site ("/it/", "/it/about", ...). */
export const IT_PATHS: readonly string[] = US_PATHS.map((path) =>
	localizePath(path, 'it'),
);
