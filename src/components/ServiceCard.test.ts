import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import type { ServicePackage } from '../lib/packages';
import ServiceCard from './ServiceCard.astro';

const SLEEP_PACKAGE: ServicePackage = {
	id: 'pkg-1',
	category: 'sleep',
	title: 'Sleep Package',
	description: '',
	price: 150,
	features: [],
	isPopular: false,
};

async function renderCard(props: Record<string, unknown>): Promise<string> {
	const container = await AstroContainer.create();
	return container.renderToString(ServiceCard, { props });
}

describe('ServiceCard', () => {
	test('shows the price in euros and the Italian booking button on the Italian site', async () => {
		const html = await renderCard({ pkg: SLEEP_PACKAGE, locale: 'it' });

		expect(html).toMatch(/150(&nbsp;| )€/);
		expect(html).toContain('Prenota ora');
		expect(html).not.toContain('$');
	});

	test('shows the price in dollars and the English booking button on the US site', async () => {
		const html = await renderCard({ pkg: SLEEP_PACKAGE, locale: 'en' });

		expect(html).toContain('$150');
		expect(html).toContain('Book Now');
	});

	test('hides the price block when the package has no price', async () => {
		const html = await renderCard({
			pkg: { ...SLEEP_PACKAGE, price: null },
			locale: 'it',
		});

		expect(html).not.toContain('package-price');
	});
});
