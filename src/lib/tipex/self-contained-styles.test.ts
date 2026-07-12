import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Regression guard for https://github.com/friendofsvelte/tipex/issues/43.
 *
 * Published components must not rely on Tailwind utility classes: consumer
 * apps do not run Tailwind over `node_modules`, so any non-`tipex-` class in
 * a static `class="..."` attribute ships unstyled. Every static class token
 * in `src/lib` must be a `tipex-*` class defined by the shipped stylesheets.
 */

const libDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tipexCssPath = path.join(libDir, 'tipex', 'styles', 'tipex.css');

function collectSvelteFiles(dir: string): string[] {
	const files: string[] = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...collectSvelteFiles(fullPath));
		} else if (entry.isFile() && entry.name.endsWith('.svelte')) {
			files.push(fullPath);
		}
	}
	return files;
}

const CLASS_ATTRIBUTE = /class\s*=\s*"([^"]*)"/g;

describe('self-contained control styles', () => {
	const svelteFiles = collectSvelteFiles(libDir);

	it('finds the published Svelte components', () => {
		expect(svelteFiles.length).toBeGreaterThan(0);
	});

	it('uses only tipex- prefixed classes in static class attributes', () => {
		for (const file of svelteFiles) {
			const source = readFileSync(file, 'utf-8');
			const relativePath = path.relative(libDir, file);
			for (const match of source.matchAll(CLASS_ATTRIBUTE)) {
				// Drop `{expression}` interpolations: only static tokens are checked.
				const staticValue = match[1].replace(/\{[^}]*\}/g, ' ');
				const tokens = staticValue.split(/\s+/).filter(Boolean);
				for (const token of tokens) {
					expect(
						token,
						`src/lib/${relativePath} uses non-shipped class "${token}" — every static class must start with "tipex-" and be defined in the shipped stylesheets`
					).toMatch(/^tipex-/);
				}
			}
		}
	});

	const requiredSelectors = [
		'tipex-icon',
		'tipex-icon-sm',
		'tipex-divider',
		'tipex-button-label',
		'tipex-underline',
		'tipex-strikethrough'
	];

	const tipexCss = readFileSync(tipexCssPath, 'utf-8');

	for (const className of requiredSelectors) {
		it(`defines .${className} in styles/tipex.css`, () => {
			// Match the exact selector followed by a selector boundary so that
			// e.g. `.tipex-icon-sm` does not satisfy the `.tipex-icon` check.
			const rule = new RegExp(`(^|[^\\w-])\\.${className}\\s*[{,]`, 'm');
			expect(
				tipexCss,
				`.${className} must be defined in src/lib/tipex/styles/tipex.css — components reference it`
			).toMatch(rule);
		});
	}
});
