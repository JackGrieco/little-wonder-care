import { defineField, defineType } from 'sanity';

export const faq = defineType({
	name: 'faq',
	title: 'FAQ',
	type: 'document',
	fields: [
		defineField({
			name: 'question',
			title: 'Question',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'answer',
			title: 'Answer',
			type: 'array',
			of: [{ type: 'block' }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			options: {
				list: [
					{ title: 'General', value: 'General' },
					{ title: 'Sleep Consulting', value: 'Sleep Consulting' },
					{ title: 'Postpartum Doula', value: 'Postpartum Doula' },
					{ title: 'Pricing', value: 'Pricing' },
				],
				layout: 'dropdown',
			},
			initialValue: 'General',
		}),
		defineField({
			name: 'order',
			title: 'Display Order',
			type: 'number',
			description:
				'Lower numbers appear first. Leave blank to sort alphabetically.',
		}),
	],
	preview: {
		select: { title: 'question', category: 'category', order: 'order' },
		prepare({ title, category, order }) {
			return {
				title,
				subtitle: [category, order != null ? `#${order}` : '']
					.filter(Boolean)
					.join(' · '),
			};
		},
	},
	orderings: [
		{
			title: 'Display Order',
			name: 'orderAsc',
			by: [{ field: 'order', direction: 'asc' }],
		},
		{
			title: 'Category',
			name: 'categoryAsc',
			by: [
				{ field: 'category', direction: 'asc' },
				{ field: 'order', direction: 'asc' },
			],
		},
	],
});
