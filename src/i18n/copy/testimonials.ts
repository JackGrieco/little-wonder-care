// Text of the Testimonials page (the testimonials come from Sanity, per
// language). English is the current US text; Italian is a draft.
// Fields ending in "Html" are trusted static markup; "{contact}" is replaced
// with the localized contact page path.
import type { Locale } from '../locales';

export interface TestimonialsCopy {
	meta: { title: string; description: string };
	hero: { eyebrow: string; title: string; subtitle: string };
	filterLabel: string;
	/** "{rating}" is replaced with the number of stars. */
	starsLabel: string;
	noResults: string;
	emptyHtml: string;
	cta: { title: string; text: string };
}

export const TESTIMONIALS_COPY: Record<Locale, TestimonialsCopy> = {
	en: {
		meta: {
			title: 'Testimonials — Little Wonder Care',
			description:
				'Real stories from families who have worked with Little Wonder Care for postpartum doula and sleep consulting support.',
		},
		hero: {
			eyebrow: "Families I've Worked With",
			title: 'Real Stories',
			subtitle:
				"Every family is different. Here's what some of them have shared about working together.",
		},
		filterLabel: 'Filter by service type',
		starsLabel: '{rating} out of 5 stars',
		noResults: 'No testimonials in this category yet.',
		emptyHtml:
			'Testimonials are coming soon. In the meantime, feel free to <a href="{contact}">get in touch</a>.',
		cta: {
			title: 'Ready to Start Your Own Story?',
			text: "Book a free discovery call and let's talk about how I can support your family.",
		},
	},
	it: {
		meta: {
			title: 'Testimonianze — Little Wonder Care',
			description:
				'Le storie delle famiglie che hanno scelto Little Wonder Care per il supporto post-parto e la consulenza del sonno.',
		},
		hero: {
			eyebrow: 'Le famiglie che ho seguito',
			title: 'Storie vere',
			subtitle:
				'Ogni famiglia è diversa. Ecco cosa hanno raccontato alcune di loro del nostro percorso insieme.',
		},
		filterLabel: 'Filtra per servizio',
		starsLabel: '{rating} stelle su 5',
		noResults: 'Non ci sono ancora testimonianze per questo servizio.',
		emptyHtml:
			'Le testimonianze arriveranno presto. Nel frattempo, <a href="{contact}">scrivimi pure</a>.',
		cta: {
			title: 'Vuoi iniziare la tua storia?',
			text: 'Prenota una call conoscitiva gratuita e parliamo di come posso sostenere la tua famiglia.',
		},
	},
};
