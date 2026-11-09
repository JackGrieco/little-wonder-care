/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// Unit and component tests. getViteConfig loads astro.config.mjs, so .astro
// files can be rendered with the Container API inside the tests.
export default getViteConfig({
	test: {
		include: ['src/**/*.test.ts'],
		coverage: {
			provider: 'v8',
			include: ['src/i18n/**', 'src/lib/**'],
			exclude: ['**/*.test.ts'],
			thresholds: { lines: 80, functions: 80, branches: 80 },
		},
	},
});
