import { expect, test } from '@playwright/test';

test.describe('link floating menu', () => {
	test('stays hidden until a link is active', async ({ page }) => {
		await page.goto('/');
		const menu = page.locator('.tipex-floating-group').first();
		await expect(menu).toBeHidden();

		const editor = page.locator('.ProseMirror').first();
		await editor.click();
		await page.keyboard.press('ControlOrMeta+a');
		await page.keyboard.press('Backspace');
		await page.keyboard.type('see https://example.com ok');
		await editor.locator('a[href="https://example.com"]').click();

		await expect(menu).toBeVisible();
	});
});
