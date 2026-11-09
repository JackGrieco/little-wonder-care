// Text of the FAQ page (the questions themselves come from Sanity, per
// market). English is the current US text; Italian is a draft.
// Fields ending in "Html" are trusted static markup; "{contact}" is replaced
// with the localized contact page path.
import type { Locale } from '../locales';

export interface FaqCopy {
	meta: { title: string; description: string };
	hero: { eyebrow: string; title: string; subtitleHtml: string };
	answerComingSoon: string;
	emptyHtml: string;
	cta: { title: string; text: string; button: string };
}

export const FAQ_COPY: Record<Locale, FaqCopy> = {
	en: {
		meta: {
			title: 'FAQ — Little Wonder Care',
			description:
				'Frequently asked questions about postpartum doula and gentle sleep consulting services from Little Wonder Care.',
		},
		hero: {
			eyebrow: 'Have Questions?',
			title: 'Frequently Asked Questions',
			subtitleHtml:
				'Everything you need to know before getting started. Can\'t find what you\'re looking for? Just <a href="{contact}">send me a message</a>.',
		},
		answerComingSoon: 'Answer coming soon.',
		emptyHtml:
			'FAQs are being added. In the meantime, feel free to <a href="{contact}">ask me directly</a>.',
		cta: {
			title: 'Still Have Questions?',
			text: "I'm always happy to chat. Send me a message and I'll get back to you within 24 hours.",
			button: 'Get in Touch',
		},
	},
	it: {
		meta: {
			title: 'Domande frequenti — Little Wonder Care',
			description:
				'Le domande più frequenti sul supporto post-parto e sulla consulenza del sonno online, in italiano, di Little Wonder Care.',
		},
		hero: {
			eyebrow: 'Hai domande?',
			title: 'Domande frequenti',
			subtitleHtml:
				'Tutto quello che c’è da sapere prima di iniziare. Non trovi quello che cerchi? <a href="{contact}">Scrivimi</a>.',
		},
		answerComingSoon: 'Risposta in arrivo.',
		emptyHtml:
			'Le domande frequenti sono in arrivo. Nel frattempo, <a href="{contact}">chiedimi pure direttamente</a>.',
		cta: {
			title: 'Hai ancora domande?',
			text: 'Mi fa sempre piacere parlarne. Scrivimi e ti rispondo entro 24 ore.',
			button: 'Contattami',
		},
	},
};
