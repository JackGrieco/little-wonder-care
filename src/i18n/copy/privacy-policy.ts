// Head and hero of the Privacy Policy page. The policy text itself is in
// src/views/privacy/ (one component per language): the Italian one is a
// draft, to be replaced by the text from the legal opinion.
import type { Locale } from '../locales';

export interface PrivacyPolicyCopy {
	meta: { title: string; description: string };
	hero: { eyebrow: string; title: string; subtitle: string };
}

export const PRIVACY_POLICY_COPY: Record<Locale, PrivacyPolicyCopy> = {
	en: {
		meta: {
			title: 'Privacy Policy — Little Wonder Care',
			description:
				'How Little Wonder Care collects, uses, and protects your personal information.',
		},
		hero: {
			eyebrow: 'Legal',
			title: 'Privacy Policy',
			subtitle: 'Last updated: April 2026',
		},
	},
	it: {
		meta: {
			title: 'Informativa sulla privacy — Little Wonder Care',
			description:
				'Come Little Wonder Care raccoglie, usa e protegge i tuoi dati personali.',
		},
		hero: {
			eyebrow: 'Note legali',
			title: 'Informativa sulla privacy',
			subtitle: 'Bozza, novembre 2026',
		},
	},
};
