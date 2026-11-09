// Text of the home page. English is the current US text; Italian is a draft
// to be reviewed by Silvia (Italian site: online services only).
// The blog preview and lead magnet sections are not here: they are hidden
// behind feature flags and exist on the US site only.
import type { Locale } from '../locales';

interface Card {
	title: string;
	text: string;
}

export interface HomeCopy {
	meta: { title: string; description: string };
	hero: {
		pill: string;
		headline: readonly [string, string];
		subtitle: string;
		primaryCta: string;
		secondaryCta: string;
	};
	trustPoints: readonly string[];
	services: {
		eyebrow: string;
		title: string;
		/** Sleep coaching, postpartum support, online consultation. */
		items: readonly [Card, Card, Card];
	};
	steps: { eyebrow: string; title: string; items: readonly Card[] };
	about: { role: string; bio: string; button: string };
	testimonials: {
		eyebrow: string;
		title: string;
		/** "{rating}" is replaced with the number of stars. */
		starsLabel: string;
		fallback: { quote: string; author: string; detail: string };
		more: string;
	};
	cta: { title: string; text: string; buttonLabel: string };
}

export const HOME_COPY: Record<Locale, HomeCopy> = {
	en: {
		// Same as SITE_TITLE / SITE_DESCRIPTION in src/consts.ts (MainLayout defaults).
		meta: {
			title: 'Little Wonder Care',
			description: 'Welcome to my website!',
		},
		hero: {
			pill: 'Postpartum doula · Gentle sleep coach',
			headline: ["You're in good hands.", 'And so is your baby.'],
			subtitle:
				"Gentle, professional support for your postpartum journey and your baby's sleep. In Waco and online nationwide.",
			primaryCta: "Let's Talk",
			secondaryCta: 'See services',
		},
		trustPoints: [
			'DONA Certified',
			'GSC Program Certified',
			'Waco, TX & Online',
			'Gentle Approach',
		],
		services: {
			eyebrow: 'What I Do',
			title: 'My Services',
			items: [
				{
					title: 'Gentle Sleep Coaching',
					text: 'A respectful, personalized approach to help your baby sleep better — no tears, no stress.',
				},
				{
					title: 'Postpartum Support',
					text: 'Reassuring, hands-on support in the early weeks after birth. Emotional care, newborn guidance, and practical help.',
				},
				{
					title: 'Online Consultation',
					text: "A dedicated call to answer your questions about sleep, routines, and your baby's wellbeing. From anywhere.",
				},
			],
		},
		steps: {
			eyebrow: 'How It Works',
			title: 'Three Simple Steps',
			items: [
				{
					title: 'Book a Free Call',
					text: '15 minutes to get to know each other, understand your needs, and find the right path for you.',
				},
				{
					title: 'Personalized Plan',
					text: "I create a custom plan for your family, honoring your values and your baby's temperament.",
				},
				{
					title: 'Support & Results',
					text: 'I walk with you step by step with dedicated follow-ups until you feel confident and at peace.',
				},
			],
		},
		about: {
			role: 'Postpartum Doula · Gentle Sleep Coach',
			bio: "I know what it means to wake up for the fifth time in one night and feel completely alone. That's why I chose this work: to be the person I wished I'd had by my side. No judgment, just real support.",
			button: 'Meet Silvia',
		},
		testimonials: {
			eyebrow: 'Moms Say',
			title: 'Real Stories',
			starsLabel: '{rating} out of 5 stars',
			fallback: {
				quote:
					"Silvia was my anchor in the early weeks. I didn't know what was normal and what wasn't, and she was always there with calm and confidence. My baby started sleeping better and I started feeling like myself again.",
				author: 'Maria R.',
				detail: 'Mom of Luca, 4 months',
			},
			more: 'Read All Stories',
		},
		cta: {
			title: 'Ready to Take the First Step?',
			text: "Book a free 15-minute call. Let's talk about your needs and find the right solution for your family.",
			buttonLabel: 'Book Your Free Call',
		},
	},
	it: {
		meta: {
			title:
				'Little Wonder Care — Doula post-parto e consulenza del sonno online',
			description:
				'Supporto post-parto e consulenza del sonno dolce, online e in italiano, per le famiglie in Italia.',
		},
		hero: {
			pill: 'Doula post-parto · Consulente del sonno dolce',
			headline: ['Sei in buone mani.', 'E anche il tuo bambino.'],
			subtitle:
				'Un supporto dolce e professionale per il tuo post-parto e per il sonno del tuo bambino. Online e in italiano, in tutta Italia.',
			primaryCta: 'Parliamone',
			secondaryCta: 'Scopri i servizi',
		},
		trustPoints: [
			'Certificata DONA',
			'Certificata GSC',
			'Online, in italiano',
			'Approccio dolce',
		],
		services: {
			eyebrow: 'Cosa faccio',
			title: 'I miei servizi',
			items: [
				{
					title: 'Accompagnamento dolce al sonno',
					text: 'Un approccio rispettoso e personalizzato per aiutare il tuo bambino a dormire meglio, senza lacrime e senza stress.',
				},
				{
					title: 'Supporto post-parto',
					text: 'Un sostegno rassicurante e concreto nelle prime settimane dopo la nascita: cura emotiva, consigli sul neonato e aiuto pratico, online.',
				},
				{
					title: 'Consulenza online',
					text: 'Una call dedicata per rispondere alle tue domande su sonno, routine e benessere del tuo bambino. Ovunque tu sia in Italia.',
				},
			],
		},
		steps: {
			eyebrow: 'Come funziona',
			title: 'Tre semplici passi',
			items: [
				{
					title: 'Prenota una call gratuita',
					text: '15 minuti per conoscerci, capire le tue esigenze e trovare la strada giusta per te.',
				},
				{
					title: 'Un piano su misura',
					text: 'Creo un piano personalizzato per la tua famiglia, nel rispetto dei vostri valori e del temperamento del tuo bambino.',
				},
				{
					title: 'Supporto e risultati',
					text: 'Ti accompagno passo dopo passo, con follow-up dedicati, finché non ritrovi fiducia e serenità.',
				},
			],
		},
		about: {
			role: 'Doula post-parto · Consulente del sonno dolce',
			bio: 'So cosa vuol dire svegliarsi per la quinta volta in una notte e sentirsi completamente soli. Per questo ho scelto questo lavoro: per essere la persona che avrei voluto accanto. Nessun giudizio, solo un supporto vero.',
			button: 'Conosci Silvia',
		},
		testimonials: {
			eyebrow: 'Dicono le mamme',
			title: 'Storie vere',
			starsLabel: '{rating} stelle su 5',
			fallback: {
				quote:
					'Silvia è stata la mia àncora nelle prime settimane. Non sapevo cosa fosse normale e cosa no, e lei c’era sempre, con calma e sicurezza. Il mio bambino ha iniziato a dormire meglio e io ho ricominciato a sentirmi me stessa.',
				author: 'Maria R.',
				detail: 'Mamma di Luca, 4 mesi',
			},
			more: 'Leggi tutte le storie',
		},
		cta: {
			title: 'Vuoi fare il primo passo?',
			text: 'Prenota una call gratuita di 15 minuti. Parliamo delle tue esigenze e troviamo insieme la soluzione giusta per la tua famiglia.',
			buttonLabel: 'Prenota la tua call gratuita',
		},
	},
};
