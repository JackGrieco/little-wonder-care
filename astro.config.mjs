// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import {
	IS_BLOG_ENABLED,
	SANITY_DATASET,
	SANITY_PROJECT_ID,
} from './src/consts.ts';

const STUDIO_BASE_PATH = '/studio';

// Pages that must never be listed in the sitemap (admin, hidden sections).
const SITEMAP_EXCLUDED_PATHS = [
	STUDIO_BASE_PATH,
	...(IS_BLOG_ENABLED ? [] : ['/blog']),
];

/** @param {string} page absolute URL of a generated page */
function isIncludedInSitemap(page) {
	const { pathname } = new URL(page);
	return !SITEMAP_EXCLUDED_PATHS.some((path) => pathname.startsWith(path));
}

// https://astro.build/config
export default defineConfig({
	site: 'https://littlewondercareco.com',
	integrations: [
		mdx(),
		sitemap({ filter: isIncludedInSitemap }),
		react(),
		sanity({
			projectId: SANITY_PROJECT_ID,
			dataset: SANITY_DATASET,
			studioBasePath: STUDIO_BASE_PATH,
			useCdn: false,
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},

	adapter: vercel(),
});
