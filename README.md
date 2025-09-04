# Tipex

Tipex stands as an advanced rich text editor tailored for Svelte, meticulously engineered with the robust
frameworks [Tiptap](https://tiptap.dev/) and [Prosemirror](https://prosemirror.net/). It empowers developers to
effortlessly craft rich text editors, liberating them from the intricacies of underlying technologies, style management,
and related complexities.

> Svelte 5 and runes mode activated! ✨🔮

## Key Features

- 🚀 **Svelte 5 Ready**: Built with Svelte 5's latest features including runes, snippets, and modern reactivity
- 🎨 **Smart Control System**: Automatically detects whether to show default or custom controls based on `controlComponent` prop
- 🔌 **Extensible Architecture**: Fully extensible through Tiptap's extension system with default extensions included
- 📱 **Mobile Responsive**: Optimized for both desktop and mobile with touch-friendly interactions
- 🎯 **Context-Aware Floating Menu**: Intelligent floating toolbar that appears on text selection
- 🔗 **Advanced Link Management**: Built-in link editing with clipboard integration and visual feedback
- ✅ **Task Lists**: Native support for interactive checkboxes and task management
- 🎭 **Modern Theming**: Built with Tailwind CSS v4 using OKLCH colors and CSS custom properties
- ⚡ **Performance Optimized**: Leverages Svelte's reactivity and efficient DOM updates
- 💼 **Full TypeScript Support**: Complete type safety with comprehensive type definitions
- 🎨 **Focus Management**: Smart focus detection with visual feedback and accessibility support

## Installation

Install the package from [NPM](https://www.npmjs.com/package/@friendofsvelte/tipex):

```bash
npm install "@friendofsvelte/tipex"
```

Check out [Tipex Editor Variants](https://github.com/Bishwas-py/tipex-editor-variants) and its [live preview](https://tipex-editor-variants.pages.dev/) for examples showcasing what you can build with the Tipex Svelte text editor, including multiple themes and configurations.

## Basic Usage

Import the component and styles, then use it in your Svelte component:

```svelte
<script lang="ts">
	import { Tipex } from '@friendofsvelte/tipex';
	import '@friendofsvelte/tipex/styles/index.css';

	let body = `<h1>My Project Notes</h1>
	<p>I've been working on this <strong>new feature</strong> for the past few days. 
	It's been quite <em>challenging</em> but I think I'm making good progress.</p>
	
	<h2>Things I need to do</h2>
	<ul data-type="taskList">
		<li data-type="taskItem" data-checked="true">Set up the development environment</li>
		<li data-type="taskItem" data-checked="false">Write the core functionality</li>
		<li data-type="taskItem" data-checked="false">Add error handling</li>
	</ul>
	
	<p>Check out the <a href="https://tiptap.dev/">TipTap documentation</a> for more features!</p>`;
</script>

<Tipex
	{body}
	floating
	focal
	style="margin-top: 1rem; margin-bottom: 0;"
	class="h-[70vh] border border-neutral-200/80"
/>
```

## Core Concepts

### Control System

Tipex features a simple and flexible control system:

1. **Default Controls** (automatic when no `controlComponent` is provided):
   - Pre-built formatting toolbar with essential editing tools
   - Built-in utility buttons (copy, link management)
   - Perfect for quick implementation

2. **Custom Controls** (when `controlComponent` snippet is provided):
   - Full control over the editor interface
   - Complete customization freedom
   - Can extend default controls or create entirely new interfaces
   - Ideal for specialized use cases

This simple approach provides maximum flexibility while maintaining ease of use.

### Extension System

Tipex leverages Tiptap's extension system for enhanced functionality. It comes with sensible defaults but you can extend or override them:

```svelte
<script lang="ts">
	import { Tipex, defaultExtensions } from '@friendofsvelte/tipex';
	import { TextAlign } from '@tiptap/extension-text-align';
	import { Highlight } from '@tiptap/extension-highlight';

	// Extend default extensions
	const customExtensions = [
		...defaultExtensions,
		TextAlign.configure({
			types: ['heading', 'paragraph'],
			alignments: ['left', 'center', 'right', 'justify'],
		}),
		Highlight.configure({
			multicolor: true,
		}),
	];

	let body = '';
</script>

<Tipex {body} extensions={customExtensions} />
```

### Floating Menu

The floating menu provides context-aware formatting options that appear when text is selected:

```svelte
<Tipex floating /> <!-- Enables the floating menu -->
```

### Focus Management

Tipex includes smart focus detection with visual feedback:

```svelte
<Tipex focal /> <!-- Default: shows focus ring -->
<Tipex !focal /> <!-- Disables focus ring -->
```

## Modern Theming with Tailwind CSS v4

Tipex is built with **Tailwind CSS v4** and uses modern OKLCH colors for better color accuracy and consistency. The theming system uses CSS custom properties that you can override:

```css
@import '@friendofsvelte/tipex/styles/index.css';

@theme {
  /* Override Tipex colors */
  --color-tipex-primary-500: oklch(0.65 0.11 285); /* Custom purple */
  --color-tipex-success-500: oklch(0.647 0.208 142.425); /* Custom green */
  
  /* Custom spacing */
  --spacing-tipex-md: 1.25rem;
  --spacing-tipex-lg: 2rem;
}
```

### Available CSS Custom Properties

- **Colors**: `--color-tipex-{50-950}`, `--color-tipex-primary-{50-950}`, `--color-tipex-success-{50-950}`
- **Spacing**: `--spacing-tipex-{xs,sm,md,lg,xl,2xl}`
- **Sizing**: `--size-tipex-{1-12}`
- **Typography**: `--text-tipex-{xs,sm,base,lg,xl,2xl}`
- **Border Radius**: `--radius-tipex-{sm,md}`
- **Z-Index**: `--z-tipex-{floating,controls}`

## Advanced Usage

### Custom Head and Foot Sections

Add custom components above or below the editor using Svelte 5 snippets:

```svelte
<script lang="ts">
	import { Tipex } from '@friendofsvelte/tipex';

	let body = '';
</script>

<Tipex {body}>
	{#snippet head(editor)}
		<CustomHeader {editor} />
	{/snippet}

	{#snippet foot(editor)}
		<CustomFooter {editor} />
	{/snippet}
</Tipex>
```

### Extending Default Controls

Add custom utilities while keeping the default toolbar:

```svelte
<script lang="ts">
	import { Tipex, Controls } from '@friendofsvelte/tipex';

	let body = '';
</script>

<Tipex {body}>
	{#snippet controlComponent(tipex)}
		<Controls {tipex}>
			<!-- Built-in utilities: copy HTML and link editing with clipboard integration -->
			<!-- Add custom utilities here -->
			<button class="tipex-edit-button tipex-button-rigid" aria-label="Export PDF">
				📄 Export
			</button>
		</Controls>
	{/snippet}
</Tipex>
```

### Custom Control Component

Create a completely custom control interface:

```svelte
<script lang="ts">
	import { Tipex } from '@friendofsvelte/tipex';

	let body = '';
</script>

<Tipex {body}>
	{#snippet controlComponent(tipex)}
		<div class="my-custom-controls">
			<button onclick={() => tipex.commands.toggleBold()}>
				<strong>B</strong>
			</button>
			<button onclick={() => tipex.commands.toggleItalic()}>
				<em>I</em>
			</button>
			<button onclick={() => tipex.commands.toggleTaskList()}>
				✅ Tasks
			</button>
		</div>
	{/snippet}
</Tipex>
```

## Props & Configuration

Based on the actual `TipexProps` interface, here are all available properties:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `body` | `string` | `''` | Initial HTML content for the editor |
| `tipex` | `TipexEditor` (bindable) | `undefined` | The editor instance - bind to access editor methods |
| `extensions` | `AnyExtension[]` (bindable) | `defaultExtensions` | Array of Tiptap extensions to use |
| `floating` | `boolean` | `false` | Enable floating menu on text selection |
| `focal` | `boolean` | `true` | Enable focus ring styling |
| `focused` | `boolean` (bindable) | `false` | Whether the editor is currently focused |
| `autofocus` | `boolean` | `true` | Auto-focus the editor on mount |
| `class` | `string` | `''` | Additional CSS classes for the editor container |
| `style` | `string` | `''` | Inline styles for the editor container |
| `ctxId` | `string` | `'_tipex'` | Context ID for the editor instance |
| `head` | `Snippet<[TipexEditor]>` | `undefined` | Content rendered above the editor |
| `foot` | `Snippet<[TipexEditor]>` | `undefined` | Content rendered below the editor |
| `controlComponent` | `Snippet<[TipexEditor]>` | `undefined` | Custom control component (replaces default controls) |
| `oncreate` | `(props: EditorEvents['create']) => void` | `() => {}` | Callback when editor is created |
| `ondestroy` | `(props: EditorEvents['destroy']) => void` | `() => {}` | Callback when editor is destroyed |
| `onupdate` | `(props: EditorEvents['update']) => void` | `() => {}` | Callback when editor content updates |

### Boolean Props with Negation

You can disable boolean props using the `!` prefix:

```svelte
<Tipex !focal !floating /> <!-- Disables focus ring and floating menu -->
```

## Getting Editor Content

Access the editor instance and its content using Svelte 5 runes:

```svelte
<script lang="ts">
	import { Tipex } from '@friendofsvelte/tipex';
	import type { Editor } from '@tiptap/core';

	let body = '';
	let editor: Editor | undefined = $state();

	// Reactive HTML content
	const htmlContent = $derived(editor?.getHTML() ?? '');
	
	// Reactive text content (no HTML tags)
	const textContent = $derived(editor?.getText() ?? '');
	
	// Reactive word count
	const wordCount = $derived(
		editor?.getText().split(/\s+/).filter(word => word.length > 0).length ?? 0
	);
</script>

<Tipex {body} bind:tipex={editor} />

<div class="editor-stats">
	<p>Words: {wordCount}</p>
	<p>Characters: {textContent.length}</p>
</div>

<details>
	<summary>HTML Output</summary>
	<pre>{htmlContent}</pre>
</details>
```

## Documentation

For comprehensive documentation, visit [tipex.pages.dev](https://tipex.pages.dev/).

## About Friend Of Svelte

![Friend Of Svelte Logo](https://avatars.githubusercontent.com/u/143795012?s=200&v=4)

[Friend Of Svelte](https://github.com/friendofsvelte) is a community-driven project to help Svelte developers find and
develop awesome Svelte resources. Our mission is to create high-quality, maintainable, and accessible tools for the
Svelte ecosystem.

### Join the Community

- 🌟 Star our repositories
- 🤝 Contribute to projects
- 📢 Share your ideas
- 👥 Open memberships for everyone

If you like this project, you can be one of the friends by contributing to the project. Memberships are open for
everyone.

## License

MIT Licensed. Copyright (c) 2023-2024 Friend of Svelte.
