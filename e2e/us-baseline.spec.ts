import { expect, test } from '@playwright/test';
import {
	US_PATHS,
	getBodyText,
	getInternalHrefs,
	openPage,
	slugFor,
} from './helpers';

// Guard for the US site: its text and internal links must not change while
// the Italian version is built. Update the snapshots only for intended changes.
for (const path of US_PATHS) {
	test(`US page ${path} keeps its text and links`, async ({ page }) => {
		const response = await openPage(page, path);
		expect(response?.status()).toBe(200);

		const slug = slugFor(path);
		expect(await getBodyText(page)).toMatchSnapshot(`${slug}.txt`);
		expect(
			JSON.stringify(await getInternalHrefs(page), null, 1),
		).toMatchSnapshot(`${slug}-links.txt`);
	});
}
