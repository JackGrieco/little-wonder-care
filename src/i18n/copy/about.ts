// Text of the About page. English is the current US text; Italian is a draft
// to be reviewed by Silvia.
import type { Locale } from '../locales';

interface Card {
	title: string;
	text: string;
}

export interface AboutCopy {
	meta: { title: string; description: string };
	hero: {
		pill: string;
		title: string;
		paragraphs: readonly string[];
		buttonLabel: string;
	};
	credentials: {
		eyebrow: string;
		title: string;
		/** DONA, GSC, continuing education: same order as the cards. */
		items: readonly [Card, Card, Card];
	};
	values: {
		eyebrow: string;
		title: string;
		/** Same order as the card colors in the view. */
		items: readonly Card[];
	};
	cta: { title: string; text: string };
}

export const ABOUT_COPY: Record<Locale, AboutCopy> = {
	en: {
		meta: {
			title: 'About Silvia — Little Wonder Care',
			description:
				'Meet Silvia, DONA certified postpartum doula and gentle sleep coach based in Waco, TX. Supporting families with warmth, knowledge, and zero judgment.',
		},
		hero: {
			pill: 'About Me',
			title: "Hi, I'm Silvia.",
			paragraphs: [
				'I know what it feels like to wake up at 3 a.m. wondering if you\'re doing everything wrong. I know the loneliness of those early weeks, when everyone says "enjoy every moment" but no one asks how you\'re really doing.',
				"That experience changed me. It's why I became a postpartum doula and sleep consultant — to be the calm, knowledgeable, judgment-free presence I wished I'd had.",
				'I believe that when a mother is supported, the whole family thrives. And I believe every baby can learn to sleep well, gently, when we understand their unique needs.',
			],
			buttonLabel: 'Book a Free Call',
		},
		credentials: {
			eyebrow: 'Credentials',
			title: 'Training & Certifications',
			items: [
				{
					title: 'DONA Certified',
					text: 'Certified Postpartum Doula through DONA International, the gold standard in doula certification.',
				},
				{
					title: 'GSC Program Certified',
					text: 'Certified Gentle Sleep Coach, trained in evidence-based, attachment-friendly sleep methods.',
				},
				{
					title: 'Continuing Education',
					text: 'I invest in ongoing training to stay current with the latest research in infant sleep and postpartum care.',
				},
			],
		},
		values: {
			eyebrow: 'What I Believe',
			title: 'My Values',
			items: [
				{
					title: 'No Judgment, Ever',
					text: "However you feed, sleep, or parent your baby — I'm here to support you, not to judge.",
				},
				{
					title: 'Gentle & Respectful',
					text: "My methods honor your baby's developmental needs and your instincts as a parent.",
				},
				{
					title: 'Evidence-Based',
					text: 'Everything I recommend is grounded in current research and best practices.',
				},
				{
					title: 'You Know Your Baby Best',
					text: "I'm here to guide, not to prescribe. You always have the final say.",
				},
			],
		},
		cta: {
			title: "Let's Work Together",
			text: "I'd love to hear your story. Book a free call and let's talk about how I can support your family.",
		},
	},
	it: {
		meta: {
			title: 'Chi sono — Little Wonder Care',
			description:
				'Sono Silvia, doula post-parto certificata DONA e consulente del sonno dolce. Seguo online e in italiano le famiglie in Italia, con calore, competenza e zero giudizio.',
		},
		hero: {
			pill: 'Chi sono',
			title: 'Ciao, sono Silvia.',
			paragraphs: [
				'So cosa si prova a svegliarsi alle 3 di notte chiedendosi se si sta sbagliando tutto. Conosco la solitudine di quelle prime settimane, quando tutti ti dicono "goditi ogni momento" ma nessuno ti chiede come stai davvero.',
				'Quell’esperienza mi ha cambiata. È per questo che sono diventata doula post-parto e consulente del sonno: per essere la presenza calma, competente e senza giudizio che avrei voluto accanto.',
				'Credo che quando una mamma è sostenuta, tutta la famiglia ne trae beneficio. E credo che ogni bambino possa imparare a dormire bene, con dolcezza, quando capiamo i suoi bisogni.',
			],
			buttonLabel: 'Prenota una call gratuita',
		},
		credentials: {
			eyebrow: 'Formazione',
			title: 'Formazione e certificazioni',
			items: [
				{
					title: 'Certificata DONA',
					text: 'Doula post-parto certificata da DONA International, il riferimento più autorevole per la certificazione delle doule.',
				},
				{
					title: 'Certificata GSC',
					text: 'Gentle Sleep Coach certificata, formata su metodi per il sonno basati sulle evidenze e rispettosi dell’attaccamento.',
				},
				{
					title: 'Formazione continua',
					text: 'Continuo a formarmi per restare aggiornata sulle ultime ricerche sul sonno infantile e sulla cura del post-parto.',
				},
			],
		},
		values: {
			eyebrow: 'In cosa credo',
			title: 'I miei valori',
			items: [
				{
					title: 'Nessun giudizio, mai',
					text: 'Comunque tu nutra il tuo bambino, lo faccia dormire o lo cresca, sono qui per sostenerti, non per giudicarti.',
				},
				{
					title: 'Dolcezza e rispetto',
					text: 'I miei metodi rispettano i bisogni di sviluppo del tuo bambino e il tuo istinto di genitore.',
				},
				{
					title: 'Basata sulle evidenze',
					text: 'Tutto ciò che consiglio si basa sulla ricerca attuale e sulle buone pratiche.',
				},
				{
					title: 'Nessuno conosce il tuo bambino meglio di te',
					text: 'Sono qui per guidarti, non per imporre. L’ultima parola è sempre tua.',
				},
			],
		},
		cta: {
			title: 'Lavoriamo insieme',
			text: 'Mi piacerebbe ascoltare la tua storia. Prenota una call gratuita e parliamo di come posso sostenere la tua famiglia.',
		},
	},
};
