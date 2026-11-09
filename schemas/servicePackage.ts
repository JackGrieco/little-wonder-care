import { defineField, defineType } from 'sanity';

export const servicePackage = defineType({
	name: 'servicePackage',
	title: 'Service Package',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (R) => R.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title' },
		}),
		defineField({
			name: 'market',
			title: 'Market',
			type: 'string',
			description:
				'Which version of the site shows this: US (English, prices in USD) or Italy (Italian, prices in EUR).',
			options: {
				list: [
					{ title: 'US (English, USD)', value: 'us' },
					{ title: 'Italia (italiano, EUR)', value: 'it' },
				],
				layout: 'radio',
			},
			initialValue: 'us',
			validation: (R) => R.required(),
		}),
		defineField({
			name: 'serviceType',
			title: 'Service Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Postpartum Doula', value: 'Postpartum Doula' },
					{ title: 'Sleep Consulting', value: 'Sleep Consulting' },
					{ title: 'Consultation', value: 'Consultation' },
				],
				layout: 'radio',
			},
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'features',
			title: 'Features',
			type: 'array',
			of: [{ type: 'string' }],
			description: 'List of what is included in this package',
		}),
		defineField({
			name: 'price',
			title: "Price (in the market's currency: USD for US, EUR for Italy)",
			type: 'number',
		}),
		defineField({
			name: 'priceNote',
			title: 'Price Note',
			type: 'string',
			description: 'e.g. "per month", "one-time", "starting at"',
		}),
		defineField({
			name: 'duration',
			title: 'Duration',
			type: 'string',
			description: 'e.g. "4 weeks", "60 minutes", "Single session"',
		}),
		defineField({
			name: 'isPopular',
			title: 'Most Popular',
			type: 'boolean',
			description: 'Highlight this package with a "Most Popular" badge',
			initialValue: false,
		}),
		defineField({
			name: 'ctaText',
			title: 'CTA Button Text',
			type: 'string',
			description: 'e.g. "Book Now", "Get Started"',
		}),
		defineField({
			name: 'ctaLink',
			title: 'CTA Button URL',
			type: 'string',
			description: 'e.g. "/contact/"',
		}),
		defineField({
			name: 'sortOrder',
			title: 'Sort Order',
			type: 'number',
			description: 'Lower numbers appear first',
		}),
		defineField({
			name: 'isActive',
			title: 'Active',
			type: 'boolean',
			description: 'Uncheck to hide this package without deleting it',
			initialValue: true,
		}),
	],
	orderings: [
		{
			title: 'Sort Order',
			name: 'sortOrderAsc',
			by: [{ field: 'sortOrder', direction: 'asc' }],
		},
		{
			title: 'Service Type',
			name: 'serviceTypeAsc',
			by: [
				{ field: 'serviceType', direction: 'asc' },
				{ field: 'sortOrder', direction: 'asc' },
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'serviceType',
			price: 'price',
			active: 'isActive',
			market: 'market',
		},
		prepare({ title, subtitle, price, active, market }) {
			const isItaly = market === 'it';
			const priceInCurrency = isItaly ? `${price} €` : `$${price}`;
			const formattedPrice = price ? priceInCurrency : null;
			return {
				title: `${active === false ? '⏸ ' : ''}${title}`,
				subtitle: [isItaly ? 'Italia' : 'US', subtitle, formattedPrice]
					.filter(Boolean)
					.join(' · '),
			};
		},
	},
});
