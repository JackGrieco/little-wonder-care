import { LOCALE_CONFIG, type Locale } from './locales';

/**
 * Price in the currency of the page's market: "$1,500" on the US site,
 * "150 €" (with a non-breaking space) on the Italian one. Whole amounts
 * show no decimals; others always show two ("99,50 €").
 */
export function formatPrice(price: number, locale: Locale): string {
	const { numberFormat, currency } = LOCALE_CONFIG[locale];
	return new Intl.NumberFormat(numberFormat, {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
		trailingZeroDisplay: 'stripIfInteger',
	}).format(price);
}
