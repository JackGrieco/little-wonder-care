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
		timeout: 120_000,
	},
});
