import { expect, test, type Page } from '@playwright/test';

async function typeLink(page: Page) {
	const editor = page.locator('.ProseMirror').first();
	await editor.click();
	await page.keyboard.press('ControlOrMeta+a');
	await page.keyboard.press('Backspace');
	await page.keyboard.type('see https://example.com ok');
	return editor.locator('a[href="https://example.com"]');
}

test.describe('link floating menu', () => {
	test('stays hidden until a link is active', async ({ page }) => {
		await page.goto('/');
		const menu = page.locator('.tipex-floating-group').first();
		await expect(menu).toBeHidden();

		const link = await typeLink(page);
		await link.click();

		await expect(menu).toBeVisible();
	});

	test('anchors to the link when the editor is offset from the viewport edge', async ({ page }) => {
		await page.setViewportSize({ width: 1920, height: 1080 });
		await page.goto('/');
		const link = await typeLink(page);
		await link.click();

		const menu = page.locator('.tipex-floating-group').first();
		await expect(menu).toBeVisible();

		const linkBox = (await link.boundingBox())!;
		const menuBox = (await menu.boundingBox())!;

		// sits above the link, not pinned to the left edge of the viewport
		expect(menuBox.y + menuBox.height).toBeLessThanOrEqual(linkBox.y + 1);
		expect(linkBox.y - (menuBox.y + menuBox.height)).toBeLessThan(40);
		expect(menuBox.x).toBeGreaterThan(linkBox.x - 40);
		expect(menuBox.x).toBeLessThan(linkBox.x + linkBox.width + 40);
	});
});
