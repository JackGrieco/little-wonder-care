// Text of the Services page. English is the current US text; Italian is a
// draft to be reviewed by Silvia (Italian site: online services only).
import type { Locale } from '../locales';

export interface ServicesCopy {
	meta: { title: string; description: string };
	hero: { eyebrow: string; title: string; subtitle: string };
	jumpLinksLabel: string;
	packages: { eyebrow: string; title: string };
	cta: { title: string; text: string; buttonLabel: string };
}

export const SERVICES_COPY: Record<Locale, ServicesCopy> = {
	en: {
		meta: {
			title: 'Services & Packages — Little Wonder Care',
			description:
				'Gentle sleep coaching and postpartum doula services. Find the right support package for your family.',
		},
		hero: {
			eyebrow: 'Services & Packages',
			title: 'Find the Right Support for Your Family',
			subtitle:
				"Whether you need help with sleep, postpartum recovery, or just someone to talk to — I'm here. Choose the option that fits your needs.",
		},
		jumpLinksLabel: 'Jump to a service',
		packages: { eyebrow: 'Packages', title: 'Services & Pricing' },
		cta: {
			title: 'Ready to Take the First Step?',
			text: "Book a free 15-minute call. Let's talk about your needs and find the right solution for your family.",
			buttonLabel: 'Book Your Free Call',
		},
	},
	it: {
		meta: {
			title: 'Servizi e pacchetti — Little Wonder Care',
			description:
				'Consulenza del sonno dolce e supporto post-parto online, in italiano. Trova il pacchetto giusto per la tua famiglia.',
		},
		hero: {
			eyebrow: 'Servizi e pacchetti',
			title: 'Il supporto giusto per la tua famiglia',
			subtitle:
				'Che tu abbia bisogno di aiuto con il sonno, con il recupero dopo il parto o semplicemente di qualcuno con cui parlare, io ci sono. Tutto online e in italiano: scegli l’opzione più adatta a te.',
		},
		jumpLinksLabel: 'Vai a un servizio',
		packages: { eyebrow: 'Pacchetti', title: 'Servizi e prezzi' },
		cta: {
			title: 'Vuoi fare il primo passo?',
			text: 'Prenota una call gratuita di 15 minuti. Parliamo delle tue esigenze e troviamo insieme la soluzione giusta per la tua famiglia.',
			buttonLabel: 'Prenota la tua call gratuita',
		},
	},
};
