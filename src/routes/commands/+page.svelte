<script>
	import { Highlight } from 'svelte-highlight';
	import { typescript } from 'svelte-highlight/languages';
</script>

<svelte:head>
	<title>Editor Commands | Tipex Editor</title>
	<meta name="description" content="Comprehensive guide to using editor commands in Tipex, a highly customizable text editor for Svelte and SvelteKit.">
</svelte:head>

<a href="/" class="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded-lg shadow-sm w-fit">
	<iconify-icon icon="fa6-solid:house" class="text-sm"></iconify-icon>
	Back to Home
</a>

<h1 class="mt-8">Editor Commands</h1>

<p>
	Tipex is built on top of TipTap and provides full access to TipTap's powerful command API. This guide covers common editor commands and their usage.
</p>

<h2 class="mt-8">Basic Content Management</h2>
<p>Here are the fundamental commands for managing editor content:</p>

<Highlight language={typescript} code={`// Set content
editor.commands.setContent('<p>Hello World</p>')

// Insert content at cursor position
editor.commands.insertContent('New content')

// Clear content
editor.commands.clearContent()

// Focus editor
editor.commands.focus()`} />

<h2 class="mt-8">Text Formatting</h2>
<p>Common text formatting commands:</p>

<Highlight language={typescript} code={`// Toggle bold
editor.commands.toggleBold()

// Toggle italic
editor.commands.toggleItalic()

// Toggle code
editor.commands.toggleCode()

// Toggle heading
editor.commands.toggleHeading({ level: 2 })`} />

<h2 class="mt-8">Working with Lists</h2>
<p>Commands for handling different types of lists:</p>

<Highlight language={typescript} code={`// Toggle bullet list
editor.commands.toggleBulletList()

// Toggle ordered list
editor.commands.toggleOrderedList()

// Toggle task list
editor.commands.toggleTaskList()

// Example of a list button implementation
<button
    aria-label="Toggle bullet list"
    onclick={() => tipex.chain().focus().toggleBulletList().run()}
    class="tipex-edit-button"
    class:active={tipex.isActive('bulletList')}
>
    <iconify-icon icon="fa6-solid:list"></iconify-icon>
</button>`} />

<h2 class="mt-8">Link Management</h2>
<p>Commands for working with links:</p>

<Highlight language={typescript} code={`// Set link
editor.commands.setLink({ href: 'https://example.com' })

// Unset link
editor.commands.unsetLink()

// Example of custom link handling
function handleLinkUpdate(url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        editor.chain()
            .focus()
            .setLink({ href: url })
            .run()
    }
}`} />

<h2 class="mt-8">Image Handling</h2>
<p>
	Tipex supports both base64 and URL-based images. Here's how to handle image uploads:
</p>

<Highlight language={typescript} code={`// For base64 images (e.g., pasted images)
// These are automatically handled by Tipex's default configuration

// For uploaded images
async function handleImageUpload(file) {
    // 1. Upload to your server
    const formData = new FormData()
    formData.append('image', file)

    try {
        const response = await fetch('/your-upload-endpoint', {
            method: 'POST',
            body: formData
        })
        const { url } = await response.json()

        // 2. Insert the image using the returned URL
        editor.commands.setImage({
            src: url,
            alt: 'Uploaded image',
            title: 'Image title'
        })
    } catch (error) {
        console.error('Upload failed:', error)
    }
}`} />

<h2 class="mt-8">Advanced Usage</h2>
<p>
	You can chain multiple commands together for complex operations:
</p>

<Highlight language={typescript} code={`// Chain multiple commands
editor.chain()
    .focus()
    .toggleBold()
    .toggleItalic()
    .run()

// Check if a command is active
const isBold = editor.isActive('bold')
const isHeading = editor.isActive('heading', { level: 2 })`} />

<blockquote class="mt-4">
	<p class="text-gray-700">
		<strong>Note:</strong> Tipex provides full access to TipTap's command API. For a complete reference of all available commands,
		visit the <a href="https://tiptap.dev/api/commands" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
		TipTap Commands API Documentation</a>.
	</p>
</blockquote>
