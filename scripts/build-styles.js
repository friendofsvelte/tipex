/**
 * Compiles the library stylesheet entry (src/lib/tipex/styles/index.css)
 * into plain CSS at dist/tipex/styles/index.css.
 *
 * The source styles rely on Tailwind (@import 'tailwindcss', @theme, @apply,
 * @custom-variant). Consumer apps never run Tailwind over node_modules, so the
 * published entry stylesheet must be plain CSS that works without any Tailwind
 * setup in the consumer project.
 */
import { compile, optimize } from '@tailwindcss/node';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.join(root, 'src/lib/tipex/styles/index.css');
const output = path.join(root, 'dist/tipex/styles/index.css');

const css = await readFile(input, 'utf8');
const compiler = await compile(css, {
	base: path.dirname(input),
	onDependency: () => {}
});

// The library components only use `tipex-*` classes, so no utility candidates
// are needed; everything comes from the theme and the component stylesheets.
const compiled = compiler.build([]);
const { code } = optimize(compiled, { minify: false });

await writeFile(output, code);
console.log(`Compiled ${path.relative(root, input)} -> ${path.relative(root, output)}`);
