import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
	name: 'testimonial',
	title: 'Testimonial',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'serviceType',
			title: 'Service Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Sleep Consulting', value: 'Sleep Consulting' },
					{ title: 'Postpartum Doula', value: 'Postpartum Doula' },
				],
				layout: 'radio',
			},
		}),
		defineField({
			name: 'childAge',
			title: 'Child Age',
			type: 'string',
			description: 'e.g. "4 months", "8 months", "2 years"',
		}),
		defineField({
			name: 'quote',
			title: 'Quote',
			type: 'text',
			rows: 4,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'rating',
			title: 'Rating (1–5)',
			type: 'number',
			validation: (Rule) => Rule.min(1).max(5).integer(),
			initialValue: 5,
		}),
		defineField({
			name: 'featured',
			title: 'Featured on Homepage',
			type: 'boolean',
			initialValue: false,
			description:
				'Show this testimonial in the homepage testimonials section.',
		}),
		defineField({
			name: 'photo',
			title: 'Photo (optional)',
			type: 'image',
			options: { hotspot: true },
			fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
		}),
	],
	preview: {
		select: {
			name: 'name',
			serviceType: 'serviceType',
			featured: 'featured',
			media: 'photo',
		},
		prepare({ name, serviceType, featured, media }) {
			return {
				title: name,
				media,
				subtitle: [serviceType, featured ? '⭐ Featured' : '']
					.filter(Boolean)
					.join(' · '),
			};
		},
	},
});
