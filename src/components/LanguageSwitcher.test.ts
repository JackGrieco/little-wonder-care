import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import LanguageSwitcher from './LanguageSwitcher.astro';

async function renderSwitcher(props: Record<string, unknown>): Promise<string> {
	const container = await AstroContainer.create();
	return container.renderToString(LanguageSwitcher, { props });
}

describe('LanguageSwitcher', () => {
	test('links a US page to the same page in Italian and marks the US site as current', async () => {
		const html = await renderSwitcher({ locale: 'en', pathname: '/services' });

		expect(html).toMatch(/<a[^>]*href="\/it\/services"[^>]*>\s*IT\s*<\/a>/);
		expect(html).toMatch(/<span[^>]*aria-current="true"[^>]*>\s*US\s*<\/span>/);
		expect(html).toContain('aria-label="Language"');
	});

	test('links the Italian home page to the US home page', async () => {
		const html = await renderSwitcher({ locale: 'it', pathname: '/it/' });

		expect(html).toMatch(/<a[^>]*href="\/"[^>]*>\s*US\s*<\/a>/);
		expect(html).toContain('aria-label="Lingua"');
	});
});
