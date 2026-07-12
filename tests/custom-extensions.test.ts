import { expect, test } from '@playwright/test';

test('custom extensions replace defaults without duplicate extension warnings', async ({
	page
}) => {
	const consoleMessages: string[] = [];
	page.on('console', (message) => {
		consoleMessages.push(message.text());
	});

	await page.goto('/test/custom-extensions');

	const defaultEditor = page.locator('.editor-default .ProseMirror');
	const customEditor = page.locator('.editor-custom .ProseMirror');

	// Wait for the editors to mount, then check the console output. Regression for #46:
	// a custom `extensions` array must fully replace the defaults instead of being merged
	// on top of a hardcoded StarterKit, which made tiptap warn
	// "Duplicate extension names found: ['heading', ...]".
	await expect(defaultEditor).toHaveAttribute('contenteditable', 'true');
	const duplicateWarnings = consoleMessages.filter((text) => text.includes('Duplicate extension'));
	expect(duplicateWarnings).toEqual([]);

	// Both editors must mount as editable ProseMirror instances with their body content.
	await expect(customEditor).toHaveAttribute('contenteditable', 'true');
	await expect(defaultEditor).toContainText('default');
	await expect(customEditor).toContainText('custom');

	// The default StarterKit path must still work: typing lands in the document.
	await defaultEditor.click();
	await defaultEditor.pressSequentially(' typed');
	await expect(defaultEditor).toContainText('default typed');
});
