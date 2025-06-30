<script>
	import { Highlight } from 'svelte-highlight';
	import { typescript } from 'svelte-highlight/languages';
</script>

<svelte:head>
	<title>Editor Commands & API Reference | Tipex Editor</title>
	<meta name="description" content="Complete guide to Tipex editor commands and API. Learn how to programmatically control content, formatting, and editor behavior with comprehensive examples and best practices.">
</svelte:head>

<a href="/" class="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded-lg shadow-sm w-fit">
	<iconify-icon icon="fa6-solid:house" class="text-sm"></iconify-icon>
	Back to Home
</a>

<h1 class="mt-8">Editor Commands & API Reference</h1>

<p>
	Tipex provides comprehensive access to TipTap's powerful command system, enabling full programmatic control over the editor. 
	This guide covers essential commands, advanced techniques, and best practices for integrating editor functionality into your applications.
</p>

<h2 class="mt-8">Getting Started with Commands</h2>
<p>
	All commands are accessed through the editor instance. First, ensure you have a reference to the editor:
</p>

<Highlight language={typescript} code={`// Get editor reference
let editor: Editor;

// In your component
<Tipex bind:tipex={editor} />

// Now you can use commands
editor.commands.setContent('<p>Hello World</p>')`} />

<h2 class="mt-8">Content Management</h2>
<p>These commands handle basic content operations:</p>

<Highlight language={typescript} code={`// Set entire editor content
editor.commands.setContent('<p>Hello World</p>')
editor.commands.setContent(htmlString, true) // true to emit update event

// Insert content at current cursor position
editor.commands.insertContent('New content')
editor.commands.insertContent('<p>HTML content</p>')

// Insert content at specific position
editor.commands.insertContentAt(10, 'Content at position 10')

// Clear all content
editor.commands.clearContent()
editor.commands.clearContent(true) // true to emit update event

// Focus the editor
editor.commands.focus()
editor.commands.focus('start') // Focus at start
editor.commands.focus('end')   // Focus at end
editor.commands.focus(10)      // Focus at specific position

// Blur (unfocus) the editor
editor.commands.blur()`} />

<h2 class="mt-8">Text Formatting</h2>
<p>Apply and remove text formatting with these commands:</p>

<Highlight language={typescript} code={`// Basic formatting toggles
editor.commands.toggleBold()
editor.commands.toggleItalic()
editor.commands.toggleStrike()
editor.commands.toggleCode()
editor.commands.toggleUnderline()

// Set formatting (without toggle)
editor.commands.setBold()
editor.commands.setItalic()
editor.commands.unsetBold()
editor.commands.unsetItalic()

// Heading management
editor.commands.toggleHeading({ level: 1 })
editor.commands.toggleHeading({ level: 2 })
editor.commands.setHeading({ level: 3 })
editor.commands.unsetHeading()

// Paragraph operations
editor.commands.setParagraph()

// Text alignment
editor.commands.setTextAlign('left')
editor.commands.setTextAlign('center')
editor.commands.setTextAlign('right')
editor.commands.setTextAlign('justify')
editor.commands.unsetTextAlign()`} />

<h2 class="mt-8">List Management</h2>
<p>Create and manage different types of lists:</p>

<Highlight language={typescript} code={`// Toggle list types
editor.commands.toggleBulletList()
editor.commands.toggleOrderedList()
editor.commands.toggleTaskList()

// Set specific list types
editor.commands.setBulletList()
editor.commands.setOrderedList()
editor.commands.setTaskList()

// List item operations
editor.commands.splitListItem('listItem')
editor.commands.sinkListItem('listItem')  // Indent
editor.commands.liftListItem('listItem')  // Outdent

// Task list specific
editor.commands.toggleTask()
editor.commands.setTaskList()

// Example: Smart list button with state
function createListButton(listType: 'bulletList' | 'orderedList' | 'taskList') {
    return {
        isActive: () => editor.isActive(listType),
        toggle: () => {
            switch(listType) {
                case 'bulletList':
                    editor.chain().focus().toggleBulletList().run()
                    break
                case 'orderedList':
                    editor.chain().focus().toggleOrderedList().run()
                    break
                case 'taskList':
                    editor.chain().focus().toggleTaskList().run()
                    break
            }
        }
    }
}`} />

<h2 class="mt-8">Link Management</h2>
<p>Handle links with validation and custom attributes:</p>

<Highlight language={typescript} code={`// Basic link operations
editor.commands.setLink({ href: 'https://example.com' })
editor.commands.setLink({ 
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer'
})
editor.commands.unsetLink()

// Advanced link handling with validation
function setLinkWithValidation(url: string, text?: string) {
    // Validate URL
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url
    }
    
    try {
        new URL(url) // Validate URL format
        
        if (text) {
            // Insert text with link
            editor.chain()
                .focus()
                .insertContent(\`<a href="\${url}" target="_blank" rel="noopener noreferrer">\${text}</a>\`)
                .run()
        } else {
            // Apply link to selection
            editor.chain()
                .focus()
                .setLink({ 
                    href: url, 
                    target: '_blank', 
                    rel: 'noopener noreferrer' 
                })
                .run()
        }
    } catch (error) {
        console.error('Invalid URL:', url)
    }
}

// Check if current selection/cursor is in a link
const isLinkActive = editor.isActive('link')
const linkAttributes = editor.getAttributes('link') // Get href, target, etc.`} />

<h2 class="mt-8">Image Handling</h2>
<p>
	Comprehensive image management including uploads, validation, and optimization:
</p>

<Highlight language={typescript} code={`// Basic image insertion
editor.commands.setImage({
    src: 'https://example.com/image.jpg',
    alt: 'Description',
    title: 'Image title'
})

// Handle file uploads with validation
async function handleImageUpload(file: File) {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Unsupported file type')
    }
    
    // Validate file size (e.g., 5MB limit)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
        throw new Error('File too large')
    }
    
    try {
        // Option 1: Upload to server
        const formData = new FormData()
        formData.append('image', file)
        
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        
        if (!response.ok) throw new Error('Upload failed')
        
        const { url, alt } = await response.json()
        
        editor.commands.setImage({
            src: url,
            alt: alt || file.name,
            title: file.name
        })
        
    } catch (error) {
        console.error('Image upload failed:', error)
        
        // Option 2: Fallback to base64 for small images
        if (file.size < 1024 * 1024) { // 1MB limit for base64
            const reader = new FileReader()
            reader.onload = (e) => {
                editor.commands.setImage({
                    src: e.target?.result as string,
                    alt: file.name,
                    title: file.name
                })
            }
            reader.readAsDataURL(file)
        }
    }
}

// Handle paste events for images
editor.on('paste', (event) => {
    const items = event.clipboardData?.items
    if (!items) return
    
    for (const item of items) {
        if (item.type.startsWith('image/')) {
            const file = item.getAsFile()
            if (file) {
                handleImageUpload(file)
                event.preventDefault()
            }
        }
    }
})`} />

<h2 class="mt-8">Selection & Cursor Management</h2>
<p>Control text selection and cursor positioning:</p>

<Highlight language={typescript} code={`// Selection operations
editor.commands.selectAll()
editor.commands.selectTextblockStart()
editor.commands.selectTextblockEnd()
editor.commands.selectNodeForward()
editor.commands.selectNodeBackward()

// Set selection to specific range
editor.commands.setTextSelection({ from: 0, to: 10 })
editor.commands.setTextSelection(5) // Set cursor at position 5

// Delete operations
editor.commands.deleteSelection()
editor.commands.deleteRange({ from: 0, to: 10 })
editor.commands.deleteCurrentNode()

// Navigation
editor.commands.goToNext()
editor.commands.goToPrevious()`} />

<h2 class="mt-8">History & Undo/Redo</h2>
<p>Manage editor history and undo/redo functionality:</p>

<Highlight language={typescript} code={`// Undo/Redo operations
editor.commands.undo()
editor.commands.redo()

// Check if undo/redo is available
const canUndo = editor.can().undo()
const canRedo = editor.can().redo()

// Clear history
editor.commands.clearHistory()

// Custom undo/redo buttons
function createHistoryButton(type: 'undo' | 'redo') {
    return {
        canExecute: () => type === 'undo' ? editor.can().undo() : editor.can().redo(),
        execute: () => type === 'undo' ? editor.commands.undo() : editor.commands.redo(),
        isDisabled: () => type === 'undo' ? !editor.can().undo() : !editor.can().redo()
    }
}`} />

<h2 class="mt-8">Advanced Command Patterns</h2>
<p>
	Leverage command chaining and conditional execution for complex operations:
</p>

<Highlight language={typescript} code={`// Command chaining for complex operations
editor.chain()
    .focus()
    .toggleBold()
    .toggleItalic()
    .setTextAlign('center')
    .run()

// Conditional command execution
if (editor.isActive('bold')) {
    editor.chain().focus().unsetBold().setItalic().run()
} else {
    editor.chain().focus().setBold().run()
}

// Check if command can be executed
const canToggleBold = editor.can().toggleBold()
const canSetHeading = editor.can().setHeading({ level: 2 })

// Custom command wrapper with error handling
function safeCommand(command: () => boolean) {
    try {
        const result = command()
        if (!result) {
            console.warn('Command execution failed')
        }
        return result
    } catch (error) {
        console.error('Command error:', error)
        return false
    }
}

// Usage
safeCommand(() => editor.chain().focus().toggleBold().run())

// Batch operations with transaction
editor.chain()
    .command(({ tr }) => {
        // Custom transaction operations
        tr.insertText('Hello')
        tr.addMark(0, 5, editor.schema.marks.bold.create())
        return true
    })
    .run()`} />

<h2 class="mt-8">Custom Commands</h2>
<p>Create your own commands for specialized functionality:</p>

<Highlight language={typescript} code={`// Define custom command
const customCommand = () => ({ commands }: { commands: any }) => {
    return commands.insertContent('Custom content inserted!')
}

// Register and use custom command
editor.commands.customCommand = customCommand()
editor.commands.customCommand()

// More complex custom command
const insertCurrentDate = () => ({ commands }: { commands: any }) => {
    const date = new Date().toLocaleDateString()
    return commands.insertContent(\`<p>Today is \${date}</p>\`)
}

// Smart formatting command
const smartFormat = (text: string) => ({ commands }: { commands: any }) => {
    // Auto-detect and apply formatting
    if (text.startsWith('# ')) {
        return commands.setHeading({ level: 1 })
    } else if (text.startsWith('## ')) {
        return commands.setHeading({ level: 2 })
    } else if (text.startsWith('- ')) {
        return commands.setBulletList()
    }
    return commands.setParagraph()
}`} />

<h2 class="mt-8">Event-Driven Commands</h2>
<p>React to editor events and execute commands automatically:</p>

<Highlight language={typescript} code={`// Listen to editor events and execute commands
editor.on('update', ({ editor }) => {
    // Auto-save functionality
    const content = editor.getHTML()
    localStorage.setItem('editor-content', content)
})

editor.on('selectionUpdate', ({ editor }) => {
    // Update UI based on selection
    const { from, to } = editor.state.selection
    console.log(\`Selection: \${from} to \${to}\`)
})

// Custom keyboard shortcuts with commands
editor.on('keydown', (event) => {
    // Custom Ctrl+Shift+D for current date
    if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault()
        editor.commands.insertContent(\`<p>\${new Date().toLocaleDateString()}</p>\`)
    }
    
    // Auto-format on Enter
    if (event.key === 'Enter') {
        const { $from } = editor.state.selection
        const currentLine = $from.parent.textContent
        
        if (currentLine.startsWith('# ')) {
            setTimeout(() => {
                editor.commands.setHeading({ level: 1 })
            }, 0)
        }
    }
})`} />

<h2 class="mt-8">Best Practices</h2>
<ul class="list-disc pl-5 space-y-2 text-black dark:text-white">
    <li><strong>Always chain focus():</strong> Use <code>editor.chain().focus().command().run()</code> to ensure proper focus management</li>
    <li><strong>Check command availability:</strong> Use <code>editor.can().command()</code> before executing commands</li>
    <li><strong>Error handling:</strong> Wrap commands in try-catch blocks for production applications</li>
    <li><strong>Performance:</strong> Batch multiple commands using <code>chain()</code> instead of individual calls</li>
    <li><strong>State management:</strong> Use <code>editor.isActive()</code> to maintain UI state consistency</li>
    <li><strong>Validation:</strong> Always validate user input before executing commands (URLs, file types, etc.)</li>
</ul>

<blockquote class="mt-8">
	<p class="text-gray-700 dark:text-gray-300">
		<strong>Complete API Reference:</strong> For the full list of available commands and their parameters,
		visit the <a href="https://tiptap.dev/api/commands" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">
		official TipTap Commands API Documentation</a>. Tipex provides 100% compatibility with all TipTap commands.
	</p>
</blockquote>
