# Tipex

Tipex stands as an advanced rich text editor tailored for Svelte, meticulously engineered with the robust
frameworks [Tiptap](https://tiptap.dev/) and [Prosemirror](https://prosemirror.net/). It empowers developers to
effortlessly craft rich text editors, liberating them from the intricacies of underlying technologies, style management,
and related complexities.

> Svelte5 and runes mode activated! ✨🔮

## Key Features

- 🚀 **Svelte 5 Ready**: Built with Svelte 5's latest features including runes and snippets
- 🎨 **Automatic Control Detection**: Smart control system that automatically detects whether to show default or custom controls
- 🔌 **Plugin Architecture**: Extensible through Tiptap extensions
- 📱 **Responsive**: Works great on both desktop and mobile devices
- 🎯 **Floating Menu**: Context-aware floating toolbar for enhanced editing experience
- 🔗 **Link Management**: Built-in link handling with preview and editing capabilities
- 🎭 **Theming Support**: Easy styling with CSS variables and utility classes
- ⚡ **Performance Optimized**: Leverages Svelte's reactivity for smooth editing
- 💼 **TypeScript Support**: Full TypeScript support for better development experience

## Installation

Install the package from [NPM](https://www.npmjs.com/package/@friendofsvelte/tipex):

```bash
npm install "@friendofsvelte/tipex"
```

Check out [Tipex Editor Variants](https://github.com/Bishwas-py/tipex-editor-variants) and its [live preview](https://tipex-editor-variants.pages.dev/) for examples showcasing what you can build with the Tipex Svelte text editor, including multiple themes and configurations.

## Basic Usage

Import the component and use it in your component:

```svelte
<script lang="ts">
	import { Tipex } from '@friendofsvelte/tipex';

	let body = `<p>This <a target="_blank" rel="noopener noreferrer" href="">content</a> is written by <a target="_blank" rel="noopener noreferrer" href="http://bishwas.net/">Bishwas</a> in 2023.</p>`;
</script>

<Tipex
	{body}
	floating
	style="margin-top: 1rem; margin-bottom: 0;"
	class="h-[70vh] border border-neutral-200"
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

Tipex leverages Tiptap's extension system for enhanced functionality:

```typescript
import { Tipex } from "@friendofsvelte/tipex";
import { TextAlign } from '@tiptap/extension-text-align';

const extensions = [
	TextAlign.configure({
		types: ['heading', 'paragraph'],
	}),
];

// Use in component
<Tipex { extensions }
/>
```

### Floating Menu

The floating menu provides context-aware formatting options:

```svelte
<Tipex floating /> // Enables the floating menu
```

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
	import { Tipex, Controls, Utility } from '@friendofsvelte/tipex';

	let body = '';
</script>

<Tipex {body}>
	{#snippet controlComponent(editor)}
		<Controls {editor}>
			<div class="tipex-utilities">
				<Utility {editor} />
				<CustomButton {editor} />
			</div>
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
	{#snippet controlComponent(editor)}
		<MyCustomControls {editor} />
	{/snippet}
</Tipex>
```

## How to get html content from editor?

```svelte
<script lang="ts">
	import { Tipex } from '@friendofsvelte/tipex';

	let body = '';
	let editor: Editor | undefined = $state();

	const htmlContent = $derived(editor?.getHTML()); // Get HTML content
</script>

<Tipex {body} bind:tipex={editor} />
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
