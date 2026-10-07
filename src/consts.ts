// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Little Wonder Care';
export const SITE_DESCRIPTION = 'Welcome to my website!';

// Cal.com event paths (cal.com/<path>), opened as popups via data-cal-link.
export const CAL_LINKS = {
	discoveryCall: 'littlewondercare/discovery-call',
} as const;

// Sanity project (public identifiers, not secrets). Owned by the business account.
// PUBLIC_SANITY_* env vars, when set, take precedence in src/lib/sanity.ts.
export const SANITY_PROJECT_ID = 'zjnv9ypr';
export const SANITY_DATASET = 'production';

// Feature flags: sections hidden until they are ready (decided with Silvia, 2026-10-05).
// When false, the related pages and sections are not generated at all.
export const IS_BLOG_ENABLED = false;
export const IS_LEAD_MAGNET_ENABLED = false;
