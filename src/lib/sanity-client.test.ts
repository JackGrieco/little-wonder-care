import { afterEach, expect, test, vi } from 'vitest';

afterEach(() => {
	vi.unstubAllEnvs();
	vi.resetModules();
});

// The site is built once per publish (Sanity webhook → Vercel deploy hook):
// a production build must read the content just published, not a CDN copy.
test('production builds read fresh content instead of the CDN cache', async () => {
	vi.stubEnv('PROD', true);
	vi.resetModules();

	const { client } = await import('./sanity');

	expect(client.config().useCdn).toBe(false);
});
