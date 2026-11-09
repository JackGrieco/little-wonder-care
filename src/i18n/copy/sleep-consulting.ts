// Text of the Sleep Consulting page. English is the current US text (except
// the "available" box, rewritten for the US-only site); Italian is a draft to
// be reviewed by Silvia. Fields ending in "Html" are trusted static markup.
import type { Locale } from '../locales';

interface Step {
	title: string;
	text: string;
}

export interface SleepConsultingCopy {
	meta: { title: string; description: string };
	hero: { eyebrow: string; title: string; subtitle: string };
	approach: { eyebrow: string; title: string; paragraphs: readonly string[] };
	ages: {
		eyebrow: string;
		title: string;
		/** Same order as the age icons in the view. */
		items: readonly { title: string; range: string }[];
	};
	steps: { eyebrow: string; title: string; items: readonly Step[] };
	availability: { title: string; textHtml: string };
	packages: { eyebrow: string; title: string };
	cta: { title: string; text: string };
}

export const SLEEP_CONSULTING_COPY: Record<Locale, SleepConsultingCopy> = {
	en: {
		meta: {
			title: 'Gentle Sleep Consulting — Little Wonder Care',
			description:
				'Pediatric sleep consulting for newborns, infants, and toddlers. A gentle, respectful approach to help your whole family sleep better.',
		},
		hero: {
			eyebrow: 'Pediatric Sleep Consulting',
			title: 'Better Sleep Starts Here',
			subtitle:
				"You're exhausted. Your baby is exhausted. It doesn't have to stay this way. I'll help your family sleep better — gently, respectfully, and at your own pace.",
		},
		approach: {
			eyebrow: 'Gentle Sleep',
			title: 'My Approach',
			paragraphs: [
				'I believe every child can learn to sleep well — without crying it out, without rigid schedules, and without ignoring your instincts as a parent.',
				"My gentle approach is built around your child's temperament, your family's values, and the science of infant sleep. There's no one-size-fits-all plan. Every sleep plan I create is custom.",
			],
		},
		ages: {
			eyebrow: 'Who I Help',
			title: 'Ages I Work With',
			items: [
				{ title: 'Newborn', range: '0–4 months' },
				{ title: 'Infant', range: '4–12 months' },
				{ title: 'Toddler', range: '1–3 years' },
				{ title: 'Preschool', range: '3–5 years' },
			],
		},
		// TODO: still the old steps; Silvia is rewriting "How It Works" (see ROADMAP.md)
		steps: {
			eyebrow: 'Step by Step',
			title: 'How It Works',
			items: [
				{
					title: 'Intake questionnaire',
					text: "Before we meet, you'll fill out a detailed form about your child's sleep habits, schedule, and your family's goals.",
				},
				{
					title: 'Consultation call',
					text: "We meet via video to discuss everything in depth. I'll ask questions, listen, and start building your plan.",
				},
				{
					title: 'Custom sleep plan',
					text: "Within 48 hours, you'll receive a detailed, step-by-step plan tailored to your child and your comfort level.",
				},
				{
					title: 'Ongoing support',
					text: "For package clients, I'm with you daily for two weeks via text and email, plus follow-up calls to adjust the plan as needed.",
				},
			],
		},
		// Wording to confirm with Silvia (see ROADMAP.md): the US site serves the US only.
		availability: {
			title: 'Available Anywhere in the US',
			textHtml:
				'All sleep consulting sessions are conducted via <strong>video call</strong>, so I can work with families anywhere in the <strong>United States</strong>.',
		},
		packages: { eyebrow: 'Packages', title: 'Sleep Consulting Packages' },
		cta: {
			title: 'Ready for Better Nights?',
			text: "A free 15-minute call is all it takes. Let's talk about your child's sleep and see how I can help.",
		},
	},
	it: {
		meta: {
			title: 'Consulenza del sonno dolce — Little Wonder Care',
			description:
				'Consulenza pediatrica del sonno online e in italiano, per neonati e bambini fino a 5 anni. Un approccio dolce e rispettoso per far dormire meglio tutta la famiglia.',
		},
		hero: {
			eyebrow: 'Consulenza pediatrica del sonno',
			title: 'Notti migliori iniziano qui',
			subtitle:
				'La stanchezza si fa sentire, per te e per il tuo bambino. Non deve per forza restare così. Ti aiuto a far dormire meglio tutta la famiglia: con dolcezza, con rispetto e con i tuoi tempi.',
		},
		approach: {
			eyebrow: 'Sonno dolce',
			title: 'Il mio approccio',
			paragraphs: [
				'Credo che ogni bambino possa imparare a dormire bene: senza lasciarlo piangere da solo, senza orari rigidi e senza ignorare il tuo istinto di genitore.',
				'Il mio approccio parte dal temperamento del tuo bambino, dai valori della tua famiglia e da ciò che la scienza sa sul sonno infantile. Non esiste un piano uguale per tutti: ogni piano che creo è su misura.',
			],
		},
		ages: {
			eyebrow: 'Chi aiuto',
			title: 'Le età che seguo',
			items: [
				{ title: 'Neonato', range: '0–4 mesi' },
				{ title: 'Lattante', range: '4–12 mesi' },
				{ title: 'Bimbo piccolo', range: '1–3 anni' },
				{ title: 'Età prescolare', range: '3–5 anni' },
			],
		},
		steps: {
			eyebrow: 'Passo dopo passo',
			title: 'Come funziona',
			items: [
				{
					title: 'Questionario iniziale',
					text: 'Prima di incontrarci compili un modulo dettagliato sulle abitudini di sonno del tuo bambino, sulla sua routine e sugli obiettivi della tua famiglia.',
				},
				{
					title: 'Call di consulenza',
					text: 'Ci vediamo in videochiamata per parlare di tutto con calma. Ti faccio domande, ti ascolto e inizio a costruire il tuo piano.',
				},
				{
					title: 'Piano del sonno su misura',
					text: 'Entro 48 ore ricevi un piano dettagliato, passo per passo, pensato per il tuo bambino e per ciò con cui ti senti a tuo agio.',
				},
				{
					title: 'Supporto continuo',
					text: 'Con i pacchetti ti affianco ogni giorno per due settimane, via messaggio ed email, con call di follow-up per aggiustare il piano quando serve.',
				},
			],
		},
		availability: {
			title: 'Online, in tutta Italia',
			textHtml:
				'Tutte le sessioni di consulenza del sonno si svolgono in <strong>videochiamata</strong> e in italiano, per famiglie in <strong>tutta Italia</strong>.',
		},
		packages: {
			eyebrow: 'Pacchetti',
			title: 'Pacchetti di consulenza del sonno',
		},
		cta: {
			title: 'Vuoi notti più serene?',
			text: 'Basta una call gratuita di 15 minuti. Parliamo del sonno del tuo bambino e vediamo come posso aiutarti.',
		},
	},
};
