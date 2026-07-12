import { expect, test, type Locator } from '@playwright/test';

// Focus the ProseMirror root directly (no positional click, which could land on
// nested interactive nodes like task-list checkboxes), then select-all + delete.
// Retried via expect().toPass() polling until the editor is provably empty.
async function clearEditor(editor: Locator) {
	await expect(async () => {
		await editor.press('ControlOrMeta+A');
		await editor.press('Backspace');
		// TipTap leaves exactly one empty paragraph after clearing.
		await expect(editor.locator('p')).toHaveCount(1, { timeout: 1000 });
		await expect(editor).toHaveText('', { timeout: 1000 });
	}).toPass();
}

test.describe('Enter key semantics', () => {
	let editor: Locator;

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		editor = page.locator('.tipex-editor-section .ProseMirror');
		await expect(editor).toBeVisible();
		await clearEditor(editor);
	});

	test('Enter creates a new paragraph', async ({ page }) => {
		await page.keyboard.type('a');
		await page.keyboard.press('Enter');
		await page.keyboard.type('b');

		const paragraphs = editor.locator('p');
		await expect(paragraphs).toHaveCount(2);
		await expect(paragraphs.nth(0)).toHaveText('a');
		await expect(paragraphs.nth(1)).toHaveText('b');
		await expect(paragraphs.locator('br')).toHaveCount(0);
	});

	test('Shift+Enter inserts a hard break inside the same paragraph', async ({ page }) => {
		await page.keyboard.type('a');
		await page.keyboard.press('Shift+Enter');
		await page.keyboard.type('b');

		const paragraphs = editor.locator('p');
		await expect(paragraphs).toHaveCount(1);
		await expect(paragraphs.first().locator('br')).toHaveCount(1);
		await expect.poll(async () => paragraphs.first().innerHTML()).toMatch(/^a<br[^>]*>b$/);
	});
});
