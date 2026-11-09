// Text of the Contact page. English is the current US text; Italian is a
// draft to be reviewed by Silvia (Italian site: online only, times in Italian time).
import type { Locale } from '../locales';

export interface ContactCopy {
	meta: { title: string; description: string };
	hero: { eyebrow: string; title: string; subtitle: string };
	talk: { title: string; text: string };
	info: {
		title: string;
		emailLabel: string;
		serviceAreaLabel: string;
		serviceArea: readonly string[];
		responseTimeLabel: string;
		responseTime: string;
		instagramLabel: string;
		notReady: string;
		browseServices: string;
	};
	cta: { title: string; text: string };
}

export const CONTACT_COPY: Record<Locale, ContactCopy> = {
	en: {
		meta: {
			title: 'Contact — Little Wonder Care',
			description:
				'Get in touch with Silvia for postpartum doula and sleep consulting support. Serving Waco, TX and families nationwide.',
		},
		hero: {
			eyebrow: "Let's Connect",
			title: 'Get in Touch',
			subtitle: "Have a question or ready to start? I'd love to hear from you.",
		},
		talk: {
			title: 'Prefer to Talk?',
			text: 'Book a free 15-minute discovery call. No pressure, just a conversation.',
		},
		info: {
			title: 'Contact Info',
			emailLabel: 'Email',
			serviceAreaLabel: 'Service Area',
			serviceArea: [
				'Waco, TX & surrounding areas (in-home)',
				'Nationwide (virtual)',
			],
			responseTimeLabel: 'Response Time',
			responseTime: 'I typically respond within 24 hours',
			instagramLabel: 'Instagram',
			notReady: 'Not ready to send a message yet?',
			browseServices: 'Browse the services →',
		},
		cta: {
			title: 'Not Sure Which Service Is Right for You?',
			text: 'A free 15-minute discovery call is the easiest way to find out. No pressure, just a conversation.',
		},
	},
	it: {
		meta: {
			title: 'Contatti — Little Wonder Care',
			description:
				'Scrivi a Silvia per il supporto post-parto e la consulenza del sonno, online e in italiano, per le famiglie in tutta Italia.',
		},
		hero: {
			eyebrow: 'Parliamone',
			title: 'Contattami',
			subtitle: 'Hai una domanda o vuoi iniziare? Mi farebbe piacere sentirti.',
		},
		talk: {
			title: 'Preferisci parlarne a voce?',
			text: 'Prenota una call conoscitiva gratuita di 15 minuti. Nessun impegno, solo una chiacchierata.',
		},
		info: {
			title: 'Contatti',
			emailLabel: 'Email',
			serviceAreaLabel: 'Dove lavoro',
			serviceArea: ['Online, in tutta Italia'],
			responseTimeLabel: 'Tempi di risposta',
			responseTime: 'Di solito rispondo entro 24 ore',
			instagramLabel: 'Instagram',
			notReady: 'Non te la senti ancora di scrivermi?',
			browseServices: 'Scopri i servizi →',
		},
		cta: {
			title: 'Non sai quale servizio fa per te?',
			text: 'Una call conoscitiva gratuita di 15 minuti è il modo più semplice per capirlo. Nessun impegno, solo una chiacchierata.',
		},
	},
};
