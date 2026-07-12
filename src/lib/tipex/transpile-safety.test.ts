import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

// Regression test for https://github.com/friendofsvelte/tipex/issues/45
//
// When a consumer's TypeScript config targets < ES2019, tsc downlevels rest
// elements in destructuring patterns (`let { ...rest } = $props()`) into the
// `__rest(...)` helper. That rewrite detaches `$bindable()` initializers from
// the compiled Svelte props, breaking two-way binding (`bind:tipex`,
// `bind:focused`) in consumer builds. Tipex.svelte must therefore never use a
// rest element in its `$props()` destructure.

const tipexSveltePath = fileURLToPath(new URL('./Tipex.svelte', import.meta.url));
const tipexSvelteSource = readFileSync(tipexSveltePath, 'utf-8');

function extractScriptBlocks(source: string): string[] {
	const blocks = [...source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(
		(match) => match[1]
	);
	return blocks;
}

describe('Tipex.svelte transpile safety (issue #45)', () => {
	const scriptBlocks = extractScriptBlocks(tipexSvelteSource);

	it('contains exactly two <script> blocks (module + instance)', () => {
		expect(scriptBlocks).toHaveLength(2);
	});

	it('props destructure survives ES2017 transpilation (issue #45)', () => {
		for (const block of scriptBlocks) {
			const { outputText } = ts.transpileModule(block, {
				compilerOptions: {
					target: ts.ScriptTarget.ES2017,
					verbatimModuleSyntax: true
				}
			});
			// The __rest helper is emitted only when a rest element in an object
			// destructuring pattern is downleveled; its presence means
			// `$bindable()` props will break in consumer builds targeting ES2017.
			expect(outputText).not.toContain('__rest(');
		}
	});

	it('$props() destructure contains no rest element in the raw source', () => {
		const instanceScript = scriptBlocks[1];
		const destructureMatch = instanceScript.match(/let \{([\s\S]*?)\}: TipexProps = \$props\(\)/);
		expect(destructureMatch).not.toBeNull();
		expect(destructureMatch![1]).not.toMatch(/\.\.\./);
	});
});
