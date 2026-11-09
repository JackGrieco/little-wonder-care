// Text of the shared interface (header, footer, package cards, booking
// buttons, contact form), in both languages. Page-specific text lives in
// src/i18n/copy/. English values are the site's current text, word for word.
// Italian values are drafts to be reviewed by Silvia.
import type { ServiceCategory } from '../lib/packages';
import type { Locale } from './locales';

export type FaqCategory =
	'General' | 'Sleep Consulting' | 'Postpartum Doula' | 'Pricing' | 'Other';

export type TestimonialFilter = 'All' | 'Sleep Consulting' | 'Postpartum Doula';

interface CategoryStrings {
	label: string;
	tag: string;
	ctaText: string;
	bookingNote: string;
}

interface SubjectOption {
	/** Sent to Formspree: kept in English so Silvia's inbox stays consistent. */
	value: string;
	label: string;
}

export interface UiStrings {
	nav: {
		logoAlt: string;
		services: string;
		allServices: string;
		allServicesHint: string;
		sleep: string;
		sleepHint: string;
		doula: string;
		doulaHint: string;
		about: string;
		blog: string;
		getInTouch: string;
		openMenu: string;
		closeMenu: string;
	};
	footer: {
		contact: string;
		faq: string;
		privacy: string;
		email: string;
		copyright: string;
	};
	switcher: { ariaLabel: string };
	categories: Record<ServiceCategory, CategoryStrings>;
	packages: {
		mostPopular: string;
		/** Shown above the packages; null when the market needs no notice. */
		marketNotice: string | null;
	};
	discoveryCall: {
		buttonLabel: string;
		cardAriaLabel: string;
		cardTag: string;
		cardTitle: string;
		cardText: string;
		cardButton: string;
	};
	contactForm: {
		title: string;
		nameLabel: string;
		namePlaceholder: string;
		emailLabel: string;
		emailPlaceholder: string;
		subjectLabel: string;
		subjectPlaceholder: string;
		subjects: readonly SubjectOption[];
		messageLabel: string;
		messagePlaceholder: string;
		errorBeforeEmail: string;
		submit: string;
		sending: string;
		successTitle: string;
		successText: string;
		sendAnother: string;
	};
	faqCategories: Record<FaqCategory, string>;
	testimonialFilters: Record<TestimonialFilter, string>;
}

const EN: UiStrings = {
	nav: {
		logoAlt: 'Little Wonder Care logo',
		services: 'Services',
		allServices: 'All Services',
		allServicesHint: 'Packages & pricing',
		sleep: 'Sleep Consulting',
		sleepHint: 'Gentle sleep coaching',
		doula: 'Postpartum Doula',
		doulaHint: 'Support after birth',
		about: 'About',
		blog: 'Blog',
		getInTouch: 'Get in Touch',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
	},
	footer: {
		contact: 'Contact',
		faq: 'FAQ',
		privacy: 'Privacy Policy',
		email: 'Email',
		copyright: '© 2026 Little Wonder Care',
	},
	switcher: { ariaLabel: 'Language' },
	categories: {
		sleep: {
			label: 'Sleep Consulting',
			tag: 'Sleep',
			ctaText: 'Book Now',
			bookingNote: '1-hour session · payment at booking',
		},
		doula: {
			label: 'Postpartum Doula',
			tag: 'Postpartum',
			ctaText: 'Book an Intro Call',
			bookingNote: 'Free 15-minute call first · nothing to pay now',
		},
	},
	packages: { mostPopular: 'Most Popular', marketNotice: null },
	discoveryCall: {
		buttonLabel: 'Book a Free Discovery Call',
		cardAriaLabel: 'Free discovery call',
		cardTag: 'Free · 15 minutes',
		cardTitle: 'Not Sure Which Package Is Right for You?',
		cardText:
			"Book a free discovery call. We'll talk about where you are and figure out together what would help your family the most.",
		cardButton: 'Free Discovery Call',
	},
	contactForm: {
		title: 'Send a Message',
		nameLabel: 'Your Name',
		namePlaceholder: 'Jane Smith',
		emailLabel: 'Email Address',
		emailPlaceholder: 'jane@email.com',
		subjectLabel: 'Subject',
		subjectPlaceholder: 'Select a topic…',
		subjects: [
			{ value: 'General Question', label: 'General Question' },
			{ value: 'Postpartum Doula', label: 'Postpartum Doula' },
			{ value: 'Sleep Consulting', label: 'Sleep Consulting' },
			{ value: 'Other', label: 'Other' },
		],
		messageLabel: 'Message',
		messagePlaceholder: 'Tell me a little about where you are in your journey…',
		errorBeforeEmail:
			"Sorry, your message couldn't be sent. Please try again, or email me at",
		submit: 'Send Message',
		sending: 'Sending…',
		successTitle: 'Thank you!',
		successText:
			'Your message is on its way. I typically respond within 24 hours.',
		sendAnother: 'Send another message',
	},
	faqCategories: {
		General: 'General',
		'Sleep Consulting': 'Sleep Consulting',
		'Postpartum Doula': 'Postpartum Doula',
		Pricing: 'Pricing',
		Other: 'Other',
	},
	testimonialFilters: {
		All: 'All',
		'Sleep Consulting': 'Sleep Consulting',
		'Postpartum Doula': 'Postpartum Doula',
	},
};

const IT: UiStrings = {
	nav: {
		logoAlt: 'Logo di Little Wonder Care',
		services: 'Servizi',
		allServices: 'Tutti i servizi',
		allServicesHint: 'Pacchetti e prezzi',
		sleep: 'Consulenza del sonno',
		sleepHint: 'Un accompagnamento dolce al sonno',
		doula: 'Doula post-parto',
		doulaHint: 'Supporto dopo la nascita',
		about: 'Chi sono',
		blog: 'Blog',
		getInTouch: 'Contattami',
		openMenu: 'Apri il menu',
		closeMenu: 'Chiudi il menu',
	},
	footer: {
		contact: 'Contatti',
		faq: 'Domande frequenti',
		privacy: 'Privacy',
		email: 'Email',
		copyright: '© 2026 Little Wonder Care',
	},
	switcher: { ariaLabel: 'Lingua' },
	categories: {
		sleep: {
			label: 'Consulenza del sonno',
			tag: 'Sonno',
			ctaText: 'Prenota ora',
			bookingNote: 'Sessione online di 1 ora · pagamento alla prenotazione',
		},
		doula: {
			label: 'Doula post-parto online',
			tag: 'Post-parto',
			ctaText: 'Prenota una call conoscitiva',
			bookingNote: 'Prima una call gratuita di 15 minuti · nulla da pagare ora',
		},
	},
	packages: {
		mostPopular: 'Il più scelto',
		marketNotice: 'Sessioni in italiano, riservate a chi risiede in Italia.',
	},
	discoveryCall: {
		buttonLabel: 'Prenota una call conoscitiva gratuita',
		cardAriaLabel: 'Call conoscitiva gratuita',
		cardTag: 'Gratuita · 15 minuti',
		cardTitle: 'Non sai quale pacchetto fa per te?',
		cardText:
			'Prenota una call conoscitiva gratuita. Parliamo di come stai e capiamo insieme che cosa può aiutare di più la tua famiglia.',
		cardButton: 'Call conoscitiva gratuita',
	},
	contactForm: {
		title: 'Scrivimi',
		nameLabel: 'Il tuo nome',
		namePlaceholder: 'Giulia Rossi',
		emailLabel: 'Indirizzo email',
		emailPlaceholder: 'giulia@email.it',
		subjectLabel: 'Argomento',
		subjectPlaceholder: 'Scegli un argomento…',
		subjects: [
			{ value: 'General Question', label: 'Domanda generale' },
			{ value: 'Postpartum Doula', label: 'Doula post-parto' },
			{ value: 'Sleep Consulting', label: 'Consulenza del sonno' },
			{ value: 'Other', label: 'Altro' },
		],
		messageLabel: 'Messaggio',
		messagePlaceholder: 'Raccontami un po’ a che punto sei del tuo percorso…',
		errorBeforeEmail:
			'Purtroppo il messaggio non è stato inviato. Riprova, oppure scrivimi a',
		submit: 'Invia il messaggio',
		sending: 'Invio in corso…',
		successTitle: 'Grazie!',
		successText:
			'Il tuo messaggio è arrivato. Di solito rispondo entro 24 ore.',
		sendAnother: 'Invia un altro messaggio',
	},
	faqCategories: {
		General: 'Generali',
		'Sleep Consulting': 'Consulenza del sonno',
		'Postpartum Doula': 'Doula post-parto',
		Pricing: 'Prezzi',
		Other: 'Altro',
	},
	testimonialFilters: {
		All: 'Tutte',
		'Sleep Consulting': 'Consulenza del sonno',
		'Postpartum Doula': 'Doula post-parto',
	},
};

export const UI: Record<Locale, UiStrings> = { en: EN, it: IT };
