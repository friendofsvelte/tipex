<script>
	import { Highlight } from 'svelte-highlight';
	import { typescript } from 'svelte-highlight/languages';
	import commandsCodes from '$item/codes/commandsCodes.json' with { type: 'json' };
</script>

<svelte:head>
	<title>Editor Commands & API Reference | Tipex Editor</title>
	<meta
		name="description"
		content="Complete guide to Tipex editor commands and API. Learn how to programmatically control content, formatting, and editor behavior with comprehensive examples and best practices."
	/>
</svelte:head>

<a
	href="/"
	class="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded-lg shadow-sm w-fit"
>
	<iconify-icon icon="fa6-solid:house" class="text-sm"></iconify-icon>
	Back to Home
</a>

<h1 class="mt-8">Editor Commands & API Reference</h1>

<p>
	Tipex provides comprehensive access to TipTap's powerful command system, enabling full
	programmatic control over the editor. This guide covers essential commands, advanced techniques,
	and best practices for integrating editor functionality into your applications.
</p>

<h2 class="mt-8">Getting Started with Commands</h2>
<p>
	All commands are accessed through the editor instance. First, ensure you have a reference to the
	editor:
</p>

<Highlight language={typescript} code={commandsCodes.basicEditorSetup} />

<h2 class="mt-8">Content Management</h2>
<p>These commands handle basic content operations:</p>

<Highlight language={typescript} code={commandsCodes.contentManagement} />

<h2 class="mt-8">Text Formatting</h2>
<p>Apply and remove text formatting with these commands:</p>

<Highlight language={typescript} code={commandsCodes.textFormatting} />

<h2 class="mt-8">List Management</h2>
<p>Create and manage different types of lists:</p>

<Highlight language={typescript} code={commandsCodes.listManagement} />

<h2 class="mt-8">Link Management</h2>
<p>Handle links with validation and custom attributes:</p>

<Highlight language={typescript} code={commandsCodes.linkManagement} />

<h2 class="mt-8">Image Handling</h2>
<p>Comprehensive image management including uploads, validation, and optimization:</p>

<Highlight language={typescript} code={commandsCodes.imageHandling} />

<h2 class="mt-8">Selection & Cursor Management</h2>
<p>Control text selection and cursor positioning:</p>

<Highlight language={typescript} code={commandsCodes.selectionManagement} />

<h2 class="mt-8">History & Undo/Redo</h2>
<p>Manage editor history and undo/redo functionality:</p>

<Highlight language={typescript} code={commandsCodes.historyManagement} />

<h2 class="mt-8">Advanced Command Patterns</h2>
<p>Leverage command chaining and conditional execution for complex operations:</p>

<Highlight language={typescript} code={commandsCodes.advancedCommands} />

<h2 class="mt-8">Custom Commands</h2>
<p>Create your own commands for specialized functionality:</p>

<Highlight language={typescript} code={commandsCodes.customCommands} />

<h2 class="mt-8">Event-Driven Commands</h2>
<p>React to editor events and execute commands automatically:</p>

<Highlight language={typescript} code={commandsCodes.eventDrivenCommands} />

<h2 class="mt-8">Best Practices</h2>
<ul class="list-disc pl-5 space-y-2 text-black dark:text-white">
	<li>
		<strong>Always chain focus():</strong> Use <code>editor.chain().focus().command().run()</code> to
		ensure proper focus management
	</li>
	<li>
		<strong>Check command availability:</strong> Use <code>editor.can().command()</code> before executing
		commands
	</li>
	<li>
		<strong>Error handling:</strong> Wrap commands in try-catch blocks for production applications
	</li>
	<li>
		<strong>Performance:</strong> Batch multiple commands using <code>chain()</code> instead of individual
		calls
	</li>
	<li>
		<strong>State management:</strong> Use <code>editor.isActive()</code> to maintain UI state consistency
	</li>
	<li>
		<strong>Validation:</strong> Always validate user input before executing commands (URLs, file types,
		etc.)
	</li>
</ul>

<blockquote class="mt-8">
	<p class="text-gray-700 dark:text-gray-300">
		<strong>Complete API Reference:</strong> For the full list of available commands and their
		parameters, visit the
		<a
			href="https://tiptap.dev/api/commands"
			target="_blank"
			rel="noopener noreferrer"
			class="text-blue-600 hover:underline dark:text-blue-400"
		>
			official TipTap Commands API Documentation</a
		>. Tipex provides 100% compatibility with all TipTap commands.
	</p>
</blockquote>
