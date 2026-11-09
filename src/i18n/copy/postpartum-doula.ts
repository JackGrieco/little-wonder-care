// Text of the Postpartum Doula page. English is the current US text; Italian
// is a draft to be reviewed by Silvia (online support only: Silvia lives in
// Texas). Fields ending in "Html" are trusted static markup.
import type { Locale } from '../locales';

interface Feature {
	title: string;
	text: string;
}

export interface PostpartumDoulaCopy {
	meta: { title: string; description: string };
	hero: { eyebrow: string; title: string; subtitle: string };
	intro: { eyebrow: string; title: string; paragraphs: readonly string[] };
	features: {
		eyebrow: string;
		title: string;
		/** Emotional support, newborn care, feeding: same order as the cards. */
		items: readonly [Feature, Feature, Feature];
	};
	expect: { eyebrow: string; title: string; text: string; goal: string };
	serviceArea: { icon: 'map-pin' | 'globe'; title: string; textHtml: string };
	packages: { eyebrow: string; title: string };
	cta: { title: string; text: string };
}

export const POSTPARTUM_DOULA_COPY: Record<Locale, PostpartumDoulaCopy> = {
	en: {
		meta: {
			title: 'Postpartum Doula — Little Wonder Care',
			description:
				'Professional postpartum doula support in Waco, TX and online. Emotional care, newborn guidance, and hands-on help in the weeks after birth.',
		},
		hero: {
			eyebrow: 'Postpartum Doula · Waco, TX',
			title: "You Don't Have to Do This Alone",
			subtitle:
				'A postpartum doula is the steady, experienced presence every new parent deserves — and very few know they can have.',
		},
		intro: {
			eyebrow: 'The Basics',
			title: 'What Is a Postpartum Doula?',
			paragraphs: [
				'A postpartum doula is a trained professional who supports families during the weeks and months after birth. Unlike a night nurse or nanny, a doula cares for the whole family — not just the baby.',
				"I help with the emotional adjustment, answer the questions you didn't know you'd have, and provide hands-on support so you can rest, recover, and bond with your baby.",
			],
		},
		features: {
			eyebrow: 'How I Help',
			title: 'Support for the Whole Family',
			items: [
				{
					title: 'Emotional Support',
					text: "A listening ear, a calm presence, and reassurance that what you're feeling is completely normal.",
				},
				{
					title: 'Newborn Care',
					text: "Diapering, soothing, bathing, safe sleep — I'll help you feel confident with your baby.",
				},
				{
					title: 'Feeding Support',
					text: "Whether breastfeeding, pumping, or bottle-feeding, I'll help you find what works for your family.",
				},
			],
		},
		// TODO: outdated copy, waiting for Silvia (see ROADMAP.md)
		expect: {
			eyebrow: 'Together',
			title: 'What to Expect',
			text: 'Every family is different, so we start with a prenatal visit to understand your needs, your values, and your vision for the postpartum period. After your baby arrives, I visit your home weekly to provide hands-on help and emotional support.',
			goal: 'My goal is simple: by the time our work together ends, you feel confident, rested, and connected to your baby.',
		},
		serviceArea: {
			icon: 'map-pin',
			title: 'Service Area',
			textHtml:
				'In-home visits are available in <strong>Waco, TX and surrounding areas</strong> (approximately 50-mile radius). Virtual postpartum support is available <strong>nationwide</strong>.',
		},
		packages: { eyebrow: 'Packages', title: 'Postpartum Doula Packages' },
		cta: {
			title: 'Wondering If a Doula Is Right for You?',
			text: "Let's talk. A free 15-minute call is all it takes to see if we're a good fit.",
		},
	},
	it: {
		meta: {
			title: 'Doula post-parto online — Little Wonder Care',
			description:
				'Supporto post-parto online e in italiano: sostegno emotivo, consigli sul neonato e un aiuto concreto nelle settimane dopo la nascita.',
		},
		hero: {
			eyebrow: 'Doula post-parto · Online',
			title: 'Non devi affrontare tutto questo senza aiuto',
			subtitle:
				'Una doula post-parto è la presenza esperta e rassicurante che ogni neogenitore merita, e che in pochi sanno di poter avere.',
		},
		intro: {
			eyebrow: 'Le basi',
			title: 'Che cos’è una doula post-parto?',
			paragraphs: [
				'Una doula post-parto è una professionista formata che sostiene le famiglie nelle settimane e nei mesi dopo la nascita. A differenza di una tata o di un’infermiera notturna, la doula si prende cura di tutta la famiglia, non solo del bambino.',
				'Online ti aiuto ad affrontare i cambiamenti emotivi, rispondo alle domande che non sapevi di avere e ti do indicazioni concrete per riposare, recuperare e creare il legame con il tuo bambino.',
			],
		},
		features: {
			eyebrow: 'Come ti aiuto',
			title: 'Un sostegno per tutta la famiglia',
			items: [
				{
					title: 'Sostegno emotivo',
					text: 'Qualcuno che ti ascolta, una presenza calma e la conferma che quello che provi è del tutto normale.',
				},
				{
					title: 'Cura del neonato',
					text: 'Cambio del pannolino, coccole per calmarlo, bagnetto, sonno sicuro: ti aiuto a prendere confidenza con il tuo bambino.',
				},
				{
					title: 'Allattamento e alimentazione',
					text: 'Che tu allatti al seno, tiri il latte o usi il biberon, ti aiuto a trovare ciò che funziona per la tua famiglia.',
				},
			],
		},
		expect: {
			eyebrow: 'Insieme',
			title: 'Cosa aspettarti',
			text: 'Ogni famiglia è diversa, per questo iniziamo con una videochiamata prima del parto per capire i tuoi bisogni, i tuoi valori e come immagini il periodo dopo la nascita. Quando il bambino arriva, ci sentiamo ogni settimana in videochiamata per un aiuto concreto e un sostegno emotivo.',
			goal: 'Il mio obiettivo è semplice: alla fine del nostro percorso insieme, avrai più fiducia in te, più riposo e un legame forte con il tuo bambino.',
		},
		serviceArea: {
			icon: 'globe',
			title: 'Dove lavoro',
			textHtml:
				'Il supporto post-parto si svolge <strong>online</strong>, in videochiamata e in italiano, per famiglie in <strong>tutta Italia</strong>.',
		},
		packages: { eyebrow: 'Pacchetti', title: 'Pacchetti doula post-parto' },
		cta: {
			title: 'Ti chiedi se una doula fa per te?',
			text: 'Parliamone. Basta una call gratuita di 15 minuti per capire se siamo in sintonia.',
		},
	},
};
