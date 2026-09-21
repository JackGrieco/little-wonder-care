import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/types';

// ─── Client ──────────────────────────────────────────────────────────────────

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'bf0ainjd',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: import.meta.env.PROD,
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
}

export interface FAQ {
  _id: string;
  _type: 'faq';
  question: string;
  answer?: PortableTextBlock[];
  category?: 'General' | 'Sleep Consulting' | 'Postpartum Doula' | 'Pricing';
  order?: number;
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

/**
 * Fetch featured testimonials for the homepage.
 */
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    `*[_type == "testimonial" && featured == true] {
      _id,
      name,
      serviceType,
      childAge,
      quote,
      rating,
      photo { ..., "alt": alt }
    }`,
  );
}

/**
 * Fetch all testimonials, optionally filtered by service type.
 */
export async function getTestimonials(serviceType?: string): Promise<Testimonial[]> {
  const filter = serviceType
    ? `*[_type == "testimonial" && serviceType == $serviceType]`
    : `*[_type == "testimonial"]`;
  return client.fetch(`${filter} | order(_createdAt desc) { _id, name, serviceType, childAge, quote, rating, featured, photo { ..., "alt": alt } }`, { serviceType });
}

/**
 * Fetch FAQs, optionally filtered by category, ordered by the `order` field.
 */
export async function getFAQs(category?: string): Promise<FAQ[]> {
  const filter = category
    ? `*[_type == "faq" && category == $category]`
    : `*[_type == "faq"]`;
  return client.fetch(`${filter} | order(order asc, question asc) { _id, question, answer, category, order }`, { category });
}

/**
 * Fetch all active service packages ordered by sortOrder.
 */
export async function getServicePackages(): Promise<SanityServicePackage[]> {
  return client.fetch(
    `*[_type == "servicePackage" && isActive != false] | order(sortOrder asc, _createdAt asc) {
      _id,
      title,
      slug,
      serviceType,
      description,
      features,
      price,
      priceNote,
      duration,
      isPopular,
      ctaText,
      ctaLink,
      sortOrder,
      isActive
    }`,
  );
}

/**
 * Fetch active service packages filtered by serviceType.
 */
export async function getServicePackagesByType(serviceType: string): Promise<SanityServicePackage[]> {
  return client.fetch(
    `*[_type == "servicePackage" && isActive != false && serviceType == $serviceType] | order(sortOrder asc, _createdAt asc) {
      _id,
      title,
      slug,
      serviceType,
      description,
      features,
      price,
      priceNote,
      duration,
      isPopular,
      ctaText,
      ctaLink,
      sortOrder,
      isActive
    }`,
    { serviceType },
  );
}

