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
			title: 'Price (USD)',
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
		},
		prepare({ title, subtitle, price, active }) {
			return {
				title: `${active === false ? '⏸ ' : ''}${title}`,
				subtitle: [subtitle, price ? `$${price}` : null]
					.filter(Boolean)
					.join(' · '),
			};
		},
	},
});
