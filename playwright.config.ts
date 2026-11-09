import { defineConfig, devices } from '@playwright/test';

// Dedicated port, so the tests never hit a dev server started elsewhere
// (for example the main checkout on the default 4321).
const PORT = 4399;

export default defineConfig({
	testDir: 'e2e',
	use: { baseURL: `http://localhost:${PORT}` },
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: `npm run dev -- --port ${PORT}`,
		port: PORT,
		reuseExistingServer: true,
		env: {
			// A fake key, so the analytics script renders wherever it is allowed.
			PUBLIC_POSTHOG_KEY: 'test-key',
			// A dataset that does not exist: pages fall back to the placeholder
			// packages and empty FAQ/testimonials, so the tests never depend on
			// what Silvia publishes in Sanity.
			PUBLIC_SANITY_DATASET: 'e2e-no-content',
		},
		timeout: 120_000,
	},
});
