import { expect, test } from '@playwright/test';

/**
 * Regression guard for https://github.com/friendofsvelte/tipex/issues/43.
 *
 * The toolbar previously used Tailwind utilities (`h-4 w-4`, ...) that are
 * not compiled for consumers, collapsing icons and dividers to 0px. These
 * tests assert the rendered toolbar has real dimensions from the shipped
 * `tipex-*` classes alone.
 */

const EXPECTED_TOOLBAR_BUTTONS = 19;
const EXPECTED_TOOLBAR_SVGS = 14;
const EXPECTED_TOOLBAR_DIVIDERS = 4;

test('toolbar renders buttons, icons and dividers with real dimensions', async ({ page }) => {
	await page.goto('/');

	const controller = page.locator('.tipex-controller');
	await expect(controller).toBeVisible();

	const buttons = controller.locator('button');
	await expect(buttons).toHaveCount(EXPECTED_TOOLBAR_BUTTONS);

	const svgs = controller.locator('svg');
	await expect(svgs).toHaveCount(EXPECTED_TOOLBAR_SVGS);

	const dividers = controller.locator('.tipex-divider');
	await expect(dividers).toHaveCount(EXPECTED_TOOLBAR_DIVIDERS);

	// Every icon must render at >= 12x12px.
	await expect
		.poll(async () =>
			svgs.evaluateAll((elements) =>
				elements
					.map((element, index) => {
						const rect = element.getBoundingClientRect();
						const label = element.closest('button')?.getAttribute('aria-label') ?? `svg #${index}`;
						return { label, width: rect.width, height: rect.height };
					})
					.filter((box) => box.width < 12 || box.height < 12)
			)
		)
		.toEqual([]);

	// Every toolbar button must render at >= 20x20px.
	await expect
		.poll(async () =>
			buttons.evaluateAll((elements) =>
				elements
					.map((element, index) => {
						const rect = element.getBoundingClientRect();
						const label = element.getAttribute('aria-label') ?? `button #${index}`;
						return { label, width: rect.width, height: rect.height };
					})
					.filter((box) => box.width < 20 || box.height < 20)
			)
		)
		.toEqual([]);

	// Dividers must be ~1px wide vertical rules taller than 12px.
	await expect
		.poll(async () =>
			dividers.evaluateAll((elements) =>
				elements
					.map((element, index) => {
						const rect = element.getBoundingClientRect();
						return { divider: index, width: rect.width, height: rect.height };
					})
					.filter((box) => box.width < 0.5 || box.width > 2 || box.height <= 12)
			)
		)
		.toEqual([]);
});
