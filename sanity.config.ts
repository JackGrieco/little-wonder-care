import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
	name: 'little-wonder-care',
	title: 'Little Wonder Care',

	projectId: 'bf0ainjd',
	dataset: 'production',

	plugins: [
		structureTool({
			structure: (S) =>
				S.list()
					.title('Content')
					.items([
						S.listItem()
							.title('Blog Posts')
							.schemaType('blog')
							.child(S.documentTypeList('blog').title('Blog Posts')),
						S.listItem()
							.title('Testimonials')
							.schemaType('testimonial')
							.child(S.documentTypeList('testimonial').title('Testimonials')),
						S.listItem()
							.title('FAQs')
							.schemaType('faq')
							.child(S.documentTypeList('faq').title('FAQs')),
						S.listItem()
							.title('Service Packages')
							.schemaType('servicePackage')
							.child(
								S.documentTypeList('servicePackage').title('Service Packages'),
							),
					]),
		}),
		visionTool(),
	],

	schema: {
		types: schemaTypes,
	},
});
