# Tipex

Tipex stands as an advanced rich text editor tailored for Svelte, meticulously engineered with the robust
frameworks [Tiptap](https://tiptap.dev/) and [Prosemirror](https://prosemirror.net/). It empowers developers to
effortlessly craft rich text editors, liberating them from the intricacies of underlying technologies, style management,
and related complexities.

> Svelte5 and runes mode activated! ✨🔮

## Key Features

- 🚀 **Svelte 5 Ready**: Built with Svelte 5's latest features including runes and snippets
- 🎨 **Customizable Controls**: Flexible control system with both default and custom options
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

## Basic Usage

Import the component and use it in your component:

```svelte
<script lang="ts">
    import {Tipex} from "@friendofsvelte/tipex";
    
    let body = `<p>This <a target="_blank" rel="noopener noreferrer" href="">content</a> is written by <a target="_blank" rel="noopener noreferrer" href="http://bishwas.net/">Bishwas</a> in 2023.</p>`;
</script>

<Tipex 
    {body} 
    controls 
    floating
    style="margin-top: 1rem; margin-bottom: 0;"
    class="h-[70vh] border border-neutral-200"
/>
```

## Core Concepts

### Control Modes

Tipex offers two control modes:

1. **Default Controls** (`controls={true}`):
    - Pre-built formatting toolbar
    - Customizable through the `utilities` prop
    - Perfect for quick implementation

2. **Custom Controls** (`controls={false}`):
    - Full control over the editor interface
    - Use `controlComponent` for custom implementations
    - Ideal for specialized use cases

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
    import {Tipex} from "@friendofsvelte/tipex";
    
    let body = "";
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

### Custom Utilities

Add custom controls while keeping the default toolbar:

```svelte
<script lang="ts">
    import {Tipex} from "@friendofsvelte/tipex";
    
    let body = "";
</script>

<Tipex {body} controls>
    {#snippet utilities(editor)}
        <CustomFormatting {editor} />
    {/snippet}
</Tipex>
```

### Custom Control Component

Create a completely custom control interface:

```svelte
<script lang="ts">
    import {Tipex} from "@friendofsvelte/tipex";
    
    let body = "";
</script>

<Tipex {body} controls={false}>
    {#snippet controlComponent(editor)}
        <MyCustomControls {editor} />
    {/snippet}
</Tipex>
```

## How to get html content from editor?

```svelte
<script lang="ts">
    import {Tipex} from "@friendofsvelte/tipex";
    
    let body = "";
    let editor: Editor | undefined = $state();

	const htmlContent = $derived(editor?.getHTML()); // Get HTML content
 </script>
 
 <Tipex {body} bind:editor />
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