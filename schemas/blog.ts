import { defineField, defineType } from 'sanity';

export const blog = defineType({
	name: 'blog',
	title: 'Blog Post',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published At',
			type: 'datetime',
		}),
		defineField({
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.max(200),
		}),
		defineField({
			name: 'mainImage',
			title: 'Main Image',
			type: 'image',
			options: { hotspot: true },
			fields: [
				defineField({
					name: 'alt',
					title: 'Alt Text',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'array',
			of: [
				{ type: 'block' },
				{
					type: 'image',
					options: { hotspot: true },
					fields: [
						defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
						defineField({ name: 'caption', title: 'Caption', type: 'string' }),
					],
				},
			],
		}),
		defineField({
			name: 'seoTitle',
			title: 'SEO Title',
			type: 'string',
			description:
				'Overrides the post title for search engines (60 chars max recommended).',
			validation: (Rule) => Rule.max(60),
		}),
		defineField({
			name: 'seoDescription',
			title: 'SEO Description',
			type: 'text',
			rows: 2,
			description: 'Shown in search results. 155 chars max recommended.',
			validation: (Rule) => Rule.max(155),
		}),
	],
	preview: {
		select: { title: 'title', media: 'mainImage', date: 'publishedAt' },
		prepare({ title, media, date }) {
			return {
				title,
				media,
				subtitle: date ? new Date(date).toLocaleDateString('en-US') : 'No date',
			};
		},
	},
	orderings: [
		{
			title: 'Published, Newest First',
			name: 'publishedAtDesc',
			by: [{ field: 'publishedAt', direction: 'desc' }],
		},
	],
});
