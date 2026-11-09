import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/types';
import { SANITY_DATASET, SANITY_PROJECT_ID } from '../consts';
import type { Locale, Market } from '../i18n/locales';

// ─── Client ──────────────────────────────────────────────────────────────────

export const client = createClient({
	projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || SANITY_PROJECT_ID,
	dataset: import.meta.env.PUBLIC_SANITY_DATASET || SANITY_DATASET,
	apiVersion: '2024-01-01',
	// Pages are generated at build time, and a build starts right after each
	// publish (Sanity webhook → Vercel deploy hook): read the fresh content,
	// not the CDN copy, which may still hold the old prices for a moment.
	useCdn: false,
});

// ─── Image URL builder ────────────────────────────────────────────────────────

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

// ─── TypeScript types ─────────────────────────────────────────────────────────

export interface SanitySlug {
	current: string;
}

export interface SanityImage {
	_type: 'image';
	asset: { _ref: string; _type: 'reference' };
	alt?: string;
	hotspot?: { x: number; y: number; height: number; width: number };
}

export interface BlogPost {
	_id: string;
	_type: 'blog';
	title: string;
	slug: SanitySlug;
	publishedAt?: string;
	excerpt?: string;
	mainImage?: SanityImage;
	body?: PortableTextBlock[];
	seoTitle?: string;
	seoDescription?: string;
}

export interface Testimonial {
	_id: string;
	_type: 'testimonial';
	name: string;
	serviceType?: 'Sleep Consulting' | 'Postpartum Doula';
	childAge?: string;
	quote: string;
	rating?: number;
	featured?: boolean;
	photo?: SanityImage;
	/** Missing on documents created before the Italian site: means 'en'. */
	language?: Locale;
}

export interface FAQ {
	_id: string;
	_type: 'faq';
	question: string;
	answer?: PortableTextBlock[];
	category?: 'General' | 'Sleep Consulting' | 'Postpartum Doula' | 'Pricing';
	order?: number;
	/** Missing on documents created before the Italian site: means 'us'. */
	market?: Market;
}

export interface SanityServicePackage {
	_id: string;
	_type: 'servicePackage';
	title: string;
	slug?: SanitySlug;
	serviceType?: 'Postpartum Doula' | 'Sleep Consulting' | 'Consultation';
	description?: string;
	features?: string[];
	price?: number;
	priceNote?: string;
	duration?: string;
	isPopular?: boolean;
	ctaText?: string;
	ctaLink?: string;
	sortOrder?: number;
	isActive?: boolean;
	/** Missing on documents created before the Italian site: means 'us'. */
	market?: Market;
}

// ─── GROQ queries ─────────────────────────────────────────────────────────────

/**
 * Fetch all blog posts ordered newest-first.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
	return client.fetch(
		`*[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage { ..., "alt": alt },
      seoTitle,
      seoDescription
    }`,
	);
}

/**
 * Fetch a single blog post by slug.
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
	return client.fetch(
		`*[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage { ..., "alt": alt },
      body,
      seoTitle,
      seoDescription
    }`,
		{ slug },
	);
}

/**
 * Fetch all blog post slugs (for static path generation).
 */
export async function getBlogPostSlugs(): Promise<{ slug: string }[]> {
	const posts = await client.fetch<{ slug: SanitySlug }[]>(
		`*[_type == "blog" && defined(slug.current)] { slug }`,
	);
	return posts.map((p) => ({ slug: p.slug.current }));
}

// Content filters by site version. Documents created before the Italian
// site have no market/language field: coalesce() counts them as US/English,
// so they never show up on the Italian pages. Optional filters take null
// (never undefined: the Sanity client drops undefined params).
const IN_MARKET = `coalesce(market, "us") == $market`;
const IN_LANGUAGE = `coalesce(language, "en") == $language`;

const TESTIMONIAL_FIELDS = `_id, name, serviceType, childAge, quote, rating, featured, language, photo { ..., "alt": alt }`;

export const FEATURED_TESTIMONIALS_QUERY = `*[_type == "testimonial" && featured == true && ${IN_LANGUAGE}] { ${TESTIMONIAL_FIELDS} }`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && ${IN_LANGUAGE} && ($serviceType == null || serviceType == $serviceType)] | order(_createdAt desc) { ${TESTIMONIAL_FIELDS} }`;

export const FAQS_QUERY = `*[_type == "faq" && ${IN_MARKET} && ($category == null || category == $category)] | order(order asc, question asc) { _id, question, answer, category, order, market }`;

export const SERVICE_PACKAGES_QUERY = `*[_type == "servicePackage" && isActive != false && serviceType == $serviceType && ${IN_MARKET}] | order(sortOrder asc, _createdAt asc) {
  _id, title, slug, serviceType, description, features, price, priceNote,
  duration, isPopular, ctaText, ctaLink, sortOrder, isActive, market
}`;

/** Featured testimonials in one language, for the homepage. */
export async function getFeaturedTestimonials(
	language: Locale,
): Promise<Testimonial[]> {
	return client.fetch(FEATURED_TESTIMONIALS_QUERY, { language });
}

/** Testimonials in one language, optionally of one service type. */
export async function getTestimonials(
	language: Locale,
	serviceType?: string,
): Promise<Testimonial[]> {
	return client.fetch(TESTIMONIALS_QUERY, {
		language,
		serviceType: serviceType ?? null,
	});
}

/** FAQs of one market, optionally of one category, ordered by `order`. */
export async function getFAQs(
	market: Market,
	category?: string,
): Promise<FAQ[]> {
	return client.fetch(FAQS_QUERY, { market, category: category ?? null });
}

/** Active service packages of one type and one market. */
export async function getServicePackagesByType(
	serviceType: string,
	market: Market,
): Promise<SanityServicePackage[]> {
	return client.fetch(SERVICE_PACKAGES_QUERY, { serviceType, market });
}
