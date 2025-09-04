<script lang="ts">
	import Tipex from '$lib/tipex/Tipex.svelte';
	import '$lib/tipex/styles/index.css';

	import PropsTable from '$item/PropsTable.svelte';
	import { Highlight, HighlightSvelte } from 'svelte-highlight';
	import { shell, typescript } from 'svelte-highlight/languages';
	import codes from '$item/codes/index.js';
	import ThemeToggle from '$item/ThemeToggle.svelte';
	import { page } from '$app/state';
	import type { Editor } from '@tiptap/core';

	let editor: Editor | undefined = $state();

	const htmlContent = $derived(editor?.getHTML());
	// $inspect('htmlContent', htmlContent);
</script>

<svelte:head>
	<title>Tipex Editor - Svelte Text Editor | Friend Of Svelte</title>
	<meta name="description"
				content="Tipex - A powerful, customizable rich text editor for Svelte and SvelteKit. Built on TipTap and ProseMirror with beautiful theming, extensive customization options, and seamless integration.">
</svelte:head>

<div class="head-section">
	<h1>Tipex Editor
		<span
			class="text-sm text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
			{__VERSION__}
		</span>
	</h1>
	<div class="icon-link-section">
		<a class="w-8 h-8 rounded-2xl"
			 aria-label="NPM Package"
			 href="https://www.npmjs.com/package/@friendofsvelte/tipex"
			 target="_blank" rel="noopener">
			<iconify-icon icon="logos:npm-icon" class="w-4"></iconify-icon>
		</a>
		<a
			class="px-2 h-8 rounded-2xl gap-1"
			href="https://github.com/friendofsvelte/tipex"
			target="_blank" rel="noopener">
			<iconify-icon icon="fa6-brands:github"
										class="text-gray-700 dark:text-gray-200 w-4"></iconify-icon>
			{#if page.data.repo && 'stargazers_count' in page.data.repo}
				<span class="ml-1 text-gray-600 dark:text-gray-400">{page.data.repo.stargazers_count}+</span>
			{/if}
		</a>
		<a class="h-8 px-3 flex items-center gap-2 shrink-0 rounded-2xl !text-yellow-600"
			 href="https://www.buymeacoffee.com/bishwasbh"
			 target="_blank" rel="noopener">
			<iconify-icon icon="simple-icons:buymeacoffee" class="w-4"></iconify-icon>
			<span class="text-sm">Support Development</span>
		</a>
		<ThemeToggle />
	</div>
</div>

<p>
	Tipex is a cutting-edge rich text editor designed specifically for Svelte applications. Built on the powerful foundations of
	<a target="_blank" rel="noopener" href="https://tiptap.dev/">TipTap</a> and
	<a target="_blank" rel="noopener noreferrer" href="https://prosemirror.net/">ProseMirror</a>, Tipex provides developers
	with an intuitive, highly customizable editing experience while abstracting away the complexity of underlying technologies.
	Whether you're building a simple blog or a complex content management system, Tipex scales to meet your needs.
</p>

<Tipex
	bind:tipex={editor}>
</Tipex>

<h2 class="mt-8">Key Features</h2>
<ul class="list-disc pl-5 space-y-2 text-black dark:text-white">
	<li><strong>Rich Text Editing:</strong> Full support for formatting, links, lists, images, and code blocks</li>
	<li><strong>Highly Customizable:</strong> Extensive theming and component customization options</li>
	<li><strong>Svelte Native:</strong> Built specifically for Svelte with reactive bindings and modern svelte 5 runes syntax</li>
	<li><strong>Accessible:</strong> WCAG compliant with keyboard navigation and screen reader support</li>
	<li><strong>Extensible:</strong> Plugin architecture allows for custom functionality</li>
	<li><strong>TypeScript Ready:</strong> Full TypeScript support with comprehensive type definitions</li>
</ul>

<h2 class="mt-8">Installation</h2>
<p>
	Install Tipex from <a href="https://www.npmjs.com/package/@friendofsvelte/tipex"
															target="_blank" rel="noopener">NPM</a> using your preferred package manager.
</p>
<Highlight language={shell} code={codes.install} />

<h2 class="mt-8">Examples & Variants</h2>
<p>
	Check out <a href="https://github.com/Bishwas-py/tipex-editor-variants" target="_blank" rel="noopener">Tipex Editor Variants</a> and its <a href="https://tipex-editor-variants.pages.dev/" target="_blank" rel="noopener">live preview</a> for examples showcasing what you can build with Tipex, including multiple themes and configurations.
</p>


<h2 class="mt-8">Quick Start</h2>
<p>
	Get started with Tipex in just a few lines of code. Import the component and its styles, then use it in your Svelte application.
</p>
<HighlightSvelte code={codes.usage} />

<h3 class="mt-7">Configuration Options</h3>
<p>Tipex provides several boolean props for quick configuration:</p>
<ul class="list-disc pl-5 text-black dark:text-white space-y-1">
	<li>
		<code>floating</code>: Enable/disable the floating selection toolbar (<code>!floating</code> to disable)
	</li>
	<li>
		<code>focal</code>: Enable/disable focus ring styling (<code>!focal</code> to disable)
	</li>
</ul>

<h2 class="mt-8">Styling & Theming</h2>
<p>
	Tipex is built with <strong>Tailwind CSS v4</strong> and uses the modern `@import "tailwindcss"` syntax along with the new `@theme` configuration system. 
	Import the CSS file to get started with beautiful, responsive styling powered by the latest Tailwind architecture.
</p>
<Highlight language={typescript} code={codes.styling} />

<blockquote class="mt-2">
	<p>
		<strong>Tailwind v4 Architecture:</strong> Tipex leverages Tailwind CSS v4's advanced features including the new `@theme` configuration, 
		CSS custom properties integration, and the modern import system. The styles use `@layer components` for organization, 
		CSS custom properties for theming (`--color-tipex-*`), and the new `@custom-variant` syntax for dark mode handling. 
		This provides superior performance, better DX, and more flexible customization compared to older Tailwind versions.
	</p>
</blockquote>

<h2 class="mt-8">Props & Configuration</h2>
<p>
	Tipex accepts a comprehensive set of props for customization and configuration. Here are the available options:
</p>
<PropsTable />

<h2 class="mt-8">Editor Instance Access</h2>
<p>
	Access the TipTap editor instance to programmatically control the editor, execute commands, or listen to events.
</p>
<HighlightSvelte code={codes.access} />
<p>
	The editor instance provides access to the full TipTap API, including commands for content manipulation, 
	state management, and event handling. This allows for advanced integrations and custom functionality.
</p>

<h2 class="mt-8">Advanced Customization</h2>
<p>
	Tipex is architected with customization at its core. Every aspect of the editor can be tailored to your needs:
</p>
<ul class="list-disc pl-5 text-black dark:text-white space-y-1">
	<li><strong>Custom Controls:</strong> Replace or extend the default toolbar with your own components</li>
	<li><strong>Theme Customization:</strong> Comprehensive CSS custom properties for colors, spacing, and typography</li>
	<li><strong>Extension System:</strong> Add new functionality through TipTap's extension architecture</li>
	<li><strong>Event Handling:</strong> React to editor events for custom workflows</li>
	<li><strong>Content Validation:</strong> Implement custom validation and sanitization logic</li>
</ul>
<p>
	Visit the <a href="/customization" class="text-blue-600 hover:underline">customization guide</a> for detailed examples and advanced techniques.
</p>

<h2 class="mt-8">Commands & API</h2>
<p>
	Leverage the powerful command system to programmatically interact with the editor. Tipex provides full compatibility 
	with <a href="https://tiptap.dev" target="_blank" rel="noopener noreferrer">TipTap's command API</a>, enabling:
</p>
<ul class="list-disc pl-5 text-black dark:text-white space-y-1">
	<li>Content insertion and manipulation</li>
	<li>Formatting and styling operations</li>
	<li>Selection and cursor management</li>
	<li>Undo/redo functionality</li>
	<li>Custom command chaining</li>
</ul>
<p>
	Explore the <a href="/commands" class="text-blue-600 hover:underline">commands documentation</a> for comprehensive examples and use cases.
</p>

<h2 class="mt-8">Performance & Accessibility</h2>
<p>
	Tipex is optimized for performance and accessibility:
</p>
<ul class="list-disc pl-5 text-black dark:text-white space-y-1">
	<li><strong>Lazy Loading:</strong> Components and extensions load only when needed</li>
	<li><strong>Virtual Scrolling:</strong> Efficient handling of large documents</li>
	<li><strong>ARIA Support:</strong> Full screen reader compatibility</li>
	<li><strong>Keyboard Navigation:</strong> Complete keyboard control for all features</li>
	<li><strong>Focus Management:</strong> Proper focus handling for complex interactions</li>
</ul>

<h2 class="mt-4">About Friend Of Svelte</h2>
<div class="flex flex-col md:flex-row gap-2 md:gap-3 mb-2 mt-2">
	<img src="https://avatars.githubusercontent.com/u/143795012?s=200&v=4" alt="Friend Of Svelte Logo"
			 class="w-12 h-12 rounded" />
	<p>
		<a href="https://github.com/friendofsvelte" target="_blank" rel="noopener">Friend Of Svelte</a> is a
		community-driven organization dedicated to creating high-quality, open-source tools and resources for the Svelte ecosystem.
		Our mission is to empower developers with exceptional tools that enhance productivity and developer experience.
	</p>
</div>

<p>
	Join our growing community of contributors and help shape the future of Svelte development. 
	We welcome contributions of all kinds - from code and documentation to feedback and feature requests.
</p>

<blockquote class="mt-2">
	<p>
		<strong>Developer Story:</strong> Learn about the journey of creating Tipex and becoming a 
		<a href="https://bishwas.net/svelte-developer"
			 class="text-blue-600 hover:underline"
			 target="_blank">master Svelte developer</a> in our founder's blog.
	</p>
</blockquote>

<style lang="postcss">
</style>