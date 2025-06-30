<script>
	import { typescript } from 'svelte-highlight/languages';
	import { Highlight, HighlightSvelte } from 'svelte-highlight';
	import advanceCodes from '$item/codes/advanceCodes';
	import codes from '$item/codes';
	import SlotPropsTable from '$item/SlotPropsTable.svelte';
</script>

<svelte:head>
	<title>Customization Guide | Tipex Editor</title>
	<meta 
		name="description"
		content="Complete customization guide for Tipex Editor. Learn how to customize themes, controls, extensions, and create your own unique editor experience for Svelte applications."
	/>
</svelte:head>

<a href="/" class="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded-lg shadow-sm w-fit">
	<iconify-icon icon="fa6-solid:house" class="text-sm"></iconify-icon>
	Back to Home
</a>

<h1 class="mt-8">Customization Guide</h1>
<p>
	Tipex is architected with customization as a core principle. Every aspect of the editor can be tailored to match your application's 
	design system and functional requirements. This comprehensive guide covers everything from basic styling to advanced extension development.
</p>

<h2 class="mt-8">Quick Customization Overview</h2>
<p>
	Tipex offers multiple layers of customization:
</p>
<ul class="list-disc pl-5 space-y-1 text-black dark:text-white">
	<li><strong>Theme Customization:</strong> Colors, spacing, typography, and visual styling</li>
	<li><strong>Component Replacement:</strong> Replace built-in controls with your own components</li>
	<li><strong>Extension System:</strong> Add new functionality through TipTap extensions</li>
	<li><strong>Event Handling:</strong> Custom behavior through event listeners</li>
	<li><strong>Layout Customization:</strong> Header, footer, and utility area modifications</li>
</ul>

<h2 class="mt-8" id="theme-customization">Theme & Styling Customization</h2>
<p>
	Tipex uses <strong>Tailwind CSS v4</strong> with the modern `@theme` configuration system and CSS custom properties for comprehensive theming. 
	You can override any aspect of the visual design using the new Tailwind v4 architecture:
</p>

<Highlight language={typescript} code={`/* Modern Tailwind v4 Theme Configuration */
@import "tailwindcss";

@theme {
  /* Tipex Design System Override */
  --color-tipex-*: initial;
  
  /* Custom Primary Colors */
  --color-tipex-primary: #10b981; /* Custom green */
  --color-tipex-primary-dark: #34d399;
  
  /* Editor Colors */
  --color-tipex-editor-bg: #fafafa;
  --color-tipex-editor-bg-dark: #0f172a;
  --color-tipex-editor-text: #111827;
  --color-tipex-editor-text-dark: #f9fafb;
  
  /* Control Colors */
  --color-tipex-control-bg: #ffffff;
  --color-tipex-control-bg-dark: #1f2937;
  --color-tipex-control-hover: #f1f5f9;
  --color-tipex-control-hover-dark: #374151;
  --color-tipex-control-active: #dcfce7;
  --color-tipex-control-active-dark: #1e3a8a;
  
  /* Typography Scale */
  --text-tipex-base: 1.125rem;
  --text-tipex-lg: 1.25rem;
  --text-tipex-xl: 1.5rem;
  
  /* Spacing Scale */
  --spacing-tipex-xs: 0.25rem;
  --spacing-tipex-sm: 0.5rem;
  --spacing-tipex-md: 1rem;
  --spacing-tipex-lg: 1.5rem;
  --spacing-tipex-xl: 2rem;
  
  /* Border Radius */
  --radius-tipex-sm: 0.25rem;
  --radius-tipex-md: 0.375rem;
  --radius-tipex-lg: 0.5rem;
  
  /* Shadows */
  --shadow-tipex-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-tipex-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-tipex-focus: 0 0 0 3px rgb(16 185 129 / 0.5);
  --shadow-tipex-focus-dark: 0 0 0 3px rgb(52 211 153 / 0.5);
}

/* Custom Dark Mode Variant (Tailwind v4) */
@custom-variant dark (&:where(.dark, .dark *));

/* Component Layer Customization */
@layer components {
  .tipex-editor {
    @apply bg-tipex-editor-bg dark:bg-tipex-editor-bg-dark 
           border-tipex-editor-border dark:border-tipex-editor-border-dark
           rounded-tipex-md;
  }
  
  .tipex-editor.focused.focal {
    @apply shadow-tipex-focus dark:shadow-tipex-focus-dark
           border-transparent outline-none;
  }
  
  .custom-editor-theme {
    @apply bg-gradient-to-br from-tipex-editor-bg to-tipex-control-bg
           dark:from-tipex-editor-bg-dark dark:to-tipex-control-bg-dark;
  }
}`} />

<h2 class="mt-8" id="in-built-utility-buttons">Built-in Utility Components</h2>

<p>
	The built-in utility section includes essential tools like copy functionality and link management. 
	You can easily integrate these or add your own custom utilities.
</p>

<figure class="image-tab">
	<img src="https://github.com/friendofsvelte/tipex/assets/42182303/c6feb3c0-9ed8-4f9e-88d2-42b7895a72a8"
			 alt="Tipex Editor utility buttons location and customization options"
			 class="w-full rounded-xl mt-2 shadow-xl border border-neutral-200 dark:border-neutral-700" />
	<figcaption>
		Utility buttons provide quick access to common editor functions
	</figcaption>
</figure>

<h3 class="mt-8">Adding Built-in Utilities</h3>
<p>
	Include the default utility buttons (copy, link management) in your editor:
</p>
<Highlight language={typescript} code={codes.insertUtils} />

<h3 class="mt-8">Custom Utility Integration</h3>
<p>
	Extend the utility area with your own custom buttons and functionality:
</p>
<Highlight language={typescript} code={codes.appendUtils} />

<p class="mt-4">
	Here's a more comprehensive example with multiple custom utilities:
</p>

<HighlightSvelte code={`<Tipex body={body}>
  {#snippet utilities(tipex)}
    <!-- Built-in utilities -->
    <Utility {tipex}/>
    
    <!-- Custom utilities -->
    <button 
      class="tipex-edit-button tipex-button-rigid"
      onclick={() => exportToPDF(tipex.getHTML())}
      aria-label="Export to PDF"
    >
      <iconify-icon icon="fa6-solid:file-pdf"></iconify-icon>
    </button>
    
    <button 
      class="tipex-edit-button tipex-button-rigid"
      onclick={() => insertTemplate(tipex)}
      aria-label="Insert template"
    >
      <iconify-icon icon="fa6-solid:file-contract"></iconify-icon>
    </button>
    
    <button 
      class="tipex-edit-button tipex-button-rigid"
      onclick={() => toggleFullscreen()}
      aria-label="Toggle fullscreen"
    >
      <iconify-icon icon="fa6-solid:expand"></iconify-icon>
    </button>
  {/snippet}
</Tipex>`} />

<SlotPropsTable />

<h3 id="new_custom_controls" class="mt-8">Complete Control Replacement</h3>
<p>
	Replace the entire control system with your own custom implementation:
</p>
<Highlight language={typescript} code={codes.overrideControl} />

<p class="mt-4">
	Here's a complete custom control implementation:
</p>

<HighlightSvelte language={typescript} code={`<script>
  import CustomToolbar from './CustomToolbar.svelte';
</script>

<Tipex body={body}>
  {#snippet controlComponent(tipex)}
    <CustomToolbar {tipex} />
  {/snippet}
</Tipex>

<!-- CustomToolbar.svelte -->
<script>
  export let tipex;
  
  let isActive = $derived((name, attrs = {}) => tipex?.isActive(name, attrs) ?? false);
  let canExecute = $derived((command) => tipex?.can()[command]() ?? false);
</script>

<div class="custom-toolbar">
  <div class="toolbar-section">
    <button 
      class="toolbar-btn"
      class:active={isActive('bold')}
      disabled={!canExecute('toggleBold')}
      onclick={() => tipex.chain().focus().toggleBold().run()}
    >
      <strong>B</strong>
    </button>
    
    <button 
      class="toolbar-btn"
      class:active={isActive('italic')}
      onclick={() => tipex.chain().focus().toggleItalic().run()}
    >
      <em>I</em>
    </button>
  </div>
  
  <div class="toolbar-section">
    <select 
      value={isActive('heading', {level: 1}) ? '1' : 
             isActive('heading', {level: 2}) ? '2' : 'p'}
      onchange={(e) => {
        const level = e.target.value;
        if (level === 'p') {
          tipex.chain().focus().setParagraph().run();
        } else {
          tipex.chain().focus().toggleHeading({level: parseInt(level)}).run();
        }
      }}
    >
      <option value="p">Paragraph</option>
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
    </select>
  </div>
</div>

<style>
	@reference "../app.css";
    .custom-toolbar {
      @apply flex gap-tipex-md p-tipex-lg
	  bg-tipex-control-bg dark:bg-tipex-control-bg-dark
      rounded-tipex-md shadow-tipex-sm
      border border-tipex-control-border dark:border-tipex-control-border-dark;
    }
</style>
`} />

<h3 class="mt-8">⚠️ Tailwind v4 ONLY - No Legacy Versions!</h3>
<p>
	<strong class="text-red-600 dark:text-red-400">IMPORTANT:</strong> Tipex exclusively uses and requires <strong>Tailwind CSS v4</strong>. 
	We do NOT support older versions (v1.x, v2.x, v3.x) as they lack the modern architecture required for Tipex's advanced theming system.
</p>

<div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mt-4 rounded-r-md">
	<div class="flex">
		<div class="flex-shrink-0">
			<iconify-icon icon="fa6-solid:triangle-exclamation" class="text-red-500 w-5 h-5"></iconify-icon>
		</div>
		<div class="ml-3">
			<h4 class="text-sm font-medium text-red-800 dark:text-red-200">Legacy Tailwind Versions Not Supported</h4>
			<div class="mt-2 text-sm text-red-700 dark:text-red-300">
				<ul class="list-disc pl-5 space-y-1">
					<li>Tailwind v3.x and older lack <code>@theme</code> configuration</li>
					<li>Missing <code>@custom-variant</code> syntax for advanced dark mode</li>
					<li>Inferior performance and larger bundle sizes</li>
					<li>Limited component layer organization</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<h3 class="mt-8">Tailwind v4 Advantages</h3>
<p>
	Tipex exclusively uses Tailwind CSS v4 for superior developer experience and performance:
</p>
<ul class="list-disc pl-5 space-y-2 text-black dark:text-white">
	<li><strong>🚀 Modern Import System:</strong> Clean `@import "tailwindcss"` syntax without configuration files</li>
	<li><strong>🎨 Native CSS Custom Properties:</strong> Direct integration with CSS variables in `@theme` blocks</li>
	<li><strong>⚡ Better Performance:</strong> Faster builds and smaller bundle sizes compared to v3.x</li>
	<li><strong>🛠️ Enhanced DX:</strong> Improved IntelliSense and better error messages</li>
	<li><strong>🌙 Custom Variants:</strong> Powerful `@custom-variant` syntax for complex state handling</li>
	<li><strong>📦 Component Layers:</strong> Better organization with `@layer components` for maintainable styles</li>
	<li><strong>🔮 Future-Proof:</strong> Built for modern CSS features and browser capabilities</li>
</ul>

<div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 mt-4 rounded-r-md">
	<div class="flex">
		<div class="flex-shrink-0">
			<iconify-icon icon="fa6-solid:circle-check" class="text-green-500 w-5 h-5"></iconify-icon>
		</div>
		<div class="ml-3">
			<h4 class="text-sm font-medium text-green-800 dark:text-green-200">Tailwind v4 Required</h4>
			<p class="mt-2 text-sm text-green-700 dark:text-green-300">
				Upgrade to Tailwind v4 immediately for the best Tipex experience. The new architecture is essential for Tipex's theming system to function properly.
			</p>
		</div>
	</div>
</div>

<blockquote class="mt-4">
	<p class="text-gray-700 dark:text-gray-300">
		<strong>Migration Note:</strong> If you're using older Tailwind versions (v1.x, v2.x, v3.x), you MUST upgrade to Tailwind v4 
		for Tipex to work correctly. The new architecture provides significantly better performance, developer experience, and maintainability.
	</p>
</blockquote>

<h2 class="mt-8">Advanced Layout Customization</h2>
<p>
	Tipex supports comprehensive layout customization through multiple slot areas:
</p>

<HighlightSvelte code={advanceCodes.addHeadFootComponent} />

<p class="mt-4">
	Here's a practical example with a custom header featuring document statistics:
</p>

<HighlightSvelte code={`<script>
  import { Tipex } from "@friendofsvelte/tipex";
  import DocumentStats from "./DocumentStats.svelte";
  import CustomControl from "./CustomControl.svelte";
  import SaveIndicator from "./SaveIndicator.svelte";
  
  let editor = $state();
  let lastSaved = $state(null);
  
  // Auto-save functionality using runes
  $effect(() => {
    if (editor) {
      const debounce = setTimeout(() => {
        saveDocument(editor.getHTML());
        lastSaved = new Date();
      }, 1000);
      
      return () => clearTimeout(debounce);
    }
  });
</script>

<Tipex bind:tipex={editor} body={body}>
  {#snippet head(tipex)}
    <div class="editor-header">
      <DocumentStats {tipex} />
      <SaveIndicator {lastSaved} />
    </div>
  {/snippet}
  
  {#snippet controlComponent(tipex)}
    <CustomControl {tipex} />
  {/snippet}
  
  {#snippet foot(tipex)}
    <div class="editor-footer">
      <span class="status">Ready</span>
      <span class="word-count">{getWordCount(tipex)} words</span>
    </div>
  {/snippet}
</Tipex>`} />

<h2 class="mt-8">Image Upload Customization</h2>
<p>
	Tipex provides flexible image handling. You can customize the upload process, validation, and storage:
</p>

<HighlightSvelte code={`<script>
  import { Tipex } from "@friendofsvelte/tipex";
  
  async function handleImageUpload(file) {
    // Custom validation
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Unsupported file type');
    }
    
    if (file.size > maxSize) {
      throw new Error('File too large');
    }
    
    // Upload to your service (Cloudinary, AWS S3, etc.)
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) throw new Error('Upload failed');
    
    const { url, publicId } = await response.json();
    
    return {
      src: url,
      alt: file.name,
      'data-public-id': publicId // For later deletion
    };
  }
  
  let editor;
</script>

<Tipex bind:tipex={editor} body={body}>
  {#snippet utilities(tipex)}
    <button 
      class="tipex-edit-button tipex-button-rigid"
      onclick={() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
          const file = e.target.files[0];
          if (file) {
            try {
              const imageData = await handleImageUpload(file);
              tipex.commands.setImage(imageData);
            } catch (error) {
              alert('Upload failed: ' + error.message);
            }
          }
        };
        input.click();
      }}
      aria-label="Upload image"
    >
      <iconify-icon icon="fa6-solid:image"></iconify-icon>
    </button>
  {/snippet}
</Tipex>`} />

<h2 class="mt-8" id="advanced-customization">Extension System</h2>

<p>
	Leverage TipTap's powerful extension system to add custom functionality. Tipex provides easy access to modify and extend the editor's capabilities:
</p>

<figure class="image-tab">
	<img src="https://github.com/friendofsvelte/tipex/assets/42182303/9aa4814f-b360-473f-85af-ba147d7e6a56"
			 alt="Advanced customization example showing custom extensions and theming in Tipex Editor"
			 class="w-full rounded-xl mt-2 shadow-xl border border-neutral-200 dark:border-neutral-800" />

	<figcaption>
		Advanced customization with custom extensions and theming. 
		<a href="https://github.com/Bishwas-py/tipexed-editor" target="_blank" class="text-blue-600 hover:underline">
			View Source Code
		</a>
	</figcaption>
</figure>

<h3 class="mt-8">Modifying Default Extensions</h3>
<p>
	Customize the built-in extensions to match your requirements:
</p>

<HighlightSvelte code={advanceCodes.tweakingExtensions} />

<h3 class="mt-8">Creating Custom Extensions</h3>
<p>
	Build your own extensions for specialized functionality:
</p>

<HighlightSvelte code={`<script>
  import { Extension } from '@tiptap/core';
  import { defaultExtensions, Tipex } from "@friendofsvelte/tipex";
  
  // Custom extension for highlighting text
  const Highlight = Extension.create({
    name: 'highlight',
    
    addOptions() {
      return {
        multicolor: true,
        HTMLAttributes: {},
      };
    },
    
    addGlobalAttributes() {
      return [
        {
          types: ['textStyle'],
          attributes: {
            backgroundColor: {
              default: null,
              parseHTML: element => element.style.backgroundColor,
              renderHTML: attributes => {
                if (!attributes.backgroundColor) return {};
                return { style: \`background-color: \${attributes.backgroundColor}\` };
              },
            },
          },
        },
      ];
    },
    
    addCommands() {
      return {
        setHighlight: (attributes) => ({ commands }) => {
          return commands.setMark('textStyle', attributes);
        },
        toggleHighlight: (attributes) => ({ commands }) => {
          return commands.toggleMark('textStyle', attributes);
        },
        unsetHighlight: () => ({ commands }) => {
          return commands.unsetMark('textStyle');
        },
      };
    },
  });
  
  // Custom extension for word count
  const WordCount = Extension.create({
    name: 'wordCount',
    
    addStorage() {
      return {
        wordCount: 0,
        characterCount: 0,
      };
    },
    
    onUpdate() {
      const text = this.editor.getText();
      this.storage.wordCount = text.split(/\\s+/).filter(word => word.length > 0).length;
      this.storage.characterCount = text.length;
    },
  });
  
  const customExtensions = [
    ...defaultExtensions,
    Highlight,
    WordCount,
    // Add more custom extensions
  ];
</script>

<Tipex extensions={customExtensions} body={body}>
  {#snippet controlComponent(tipex)}
    <div class="custom-controls">
      <!-- Highlight controls -->
      <button 
        onclick={() => tipex.commands.setHighlight({ backgroundColor: '#ffeb3b' })}
        class="tipex-edit-button"
      >
        <iconify-icon icon="fa6-solid:highlighter"></iconify-icon>
      </button>
      
      <!-- Word count display -->
      <span class="word-count">
        Words: {tipex.storage.wordCount?.wordCount || 0}
      </span>
    </div>
  {/snippet}
</Tipex>`} />

<h2 class="mt-8">Event-Driven Customization</h2>
<p>
	React to editor events for dynamic behavior and integrations:
</p>

<HighlightSvelte code={`<script>
  import { Tipex } from "@friendofsvelte/tipex";
  
  let editor = $state();
  let isTyping = $state(false);
  let typingTimer;
  
  function handleEditorReady(tipex) {
    // Auto-save setup
    tipex.on('update', ({ editor }) => {
      clearTimeout(typingTimer);
      isTyping = true;
      
      typingTimer = setTimeout(() => {
        isTyping = false;
        saveContent(editor.getHTML());
      }, 1000);
    });
    
    // Custom keyboard shortcuts
    tipex.on('keydown', (event) => {
      // Ctrl+S for save
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        saveContent(tipex.getHTML());
      }
      
      // Ctrl+Shift+L for link
      if (event.ctrlKey && event.shiftKey && event.key === 'L') {
        event.preventDefault();
        const url = prompt('Enter URL:');
        if (url) {
          tipex.commands.setLink({ href: url });
        }
      }
    });
    
    // Selection change handling
    tipex.on('selectionUpdate', ({ editor }) => {
      updateFloatingMenu(editor);
    });
    
    // Focus/blur handling
    tipex.on('focus', () => {
      document.body.classList.add('editor-focused');
    });
    
    tipex.on('blur', () => {
      document.body.classList.remove('editor-focused');
    });
  }
  
  async function saveContent(html) {
    try {
      await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: html })
      });
    } catch (error) {
      console.error('Save failed:', error);
    }
  }
</script>

<Tipex 
  bind:tipex={editor}
  body={body}
  onready={handleEditorReady}
>
  {#snippet head()}
    <div class="editor-status">
      {#if isTyping}
        <span class="status typing">Typing...</span>
      {:else}
        <span class="status saved">Saved</span>
      {/if}
    </div>
  {/snippet}
</Tipex>`} />

<h2 class="mt-8">Accessibility Customization</h2>
<p>
	Enhance accessibility with custom ARIA labels, keyboard navigation, and screen reader support:
</p>

<HighlightSvelte code={`<script>
  function enhanceAccessibility(tipex) {
    // Add custom ARIA labels
    const editorElement = tipex.view.dom;
    editorElement.setAttribute('aria-label', 'Rich text editor');
    editorElement.setAttribute('role', 'textbox');
    editorElement.setAttribute('aria-multiline', 'true');
    
    // Custom keyboard shortcuts for accessibility
    tipex.on('keydown', (event) => {
      // Alt+1-6 for headings
      if (event.altKey && event.key >= '1' && event.key <= '6') {
        event.preventDefault();
        const level = parseInt(event.key);
        tipex.commands.toggleHeading({ level });
        
        // Announce to screen readers
        announceToScreenReader(\`Heading level \${level} applied\`);
      }
      
      // Alt+L for list
      if (event.altKey && event.key === 'l') {
        event.preventDefault();
        tipex.commands.toggleBulletList();
        announceToScreenReader('Bullet list toggled');
      }
    });
  }
  
  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }
</script>

<Tipex 
  body={body}
  onready={enhanceAccessibility}
  aria-label="Document editor"
>
  {#snippet controlComponent(tipex)}
    <div class="accessible-controls" role="toolbar" aria-label="Formatting options">
      <button 
        class="tipex-edit-button"
        class:active={tipex.isActive('bold')}
        onclick={() => tipex.commands.toggleBold()}
        aria-label="Toggle bold formatting"
        aria-pressed={tipex.isActive('bold')}
      >
        <strong>B</strong>
      </button>
      
      <button 
        class="tipex-edit-button"
        class:active={tipex.isActive('italic')}
        onclick={() => tipex.commands.toggleItalic()}
        aria-label="Toggle italic formatting"
        aria-pressed={tipex.isActive('italic')}
      >
        <em>I</em>
      </button>
    </div>
  {/snippet}
</Tipex>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>`} />

<h2 class="mt-8">Performance Optimization with Tailwind v4</h2>
<p>
	Optimize your customized editor using Tailwind v4's performance benefits:
</p>

<ul class="list-disc pl-5 space-y-2 text-black dark:text-white">
	<li><strong>🎯 Tailwind v4 Tree Shaking:</strong> Automatic unused CSS elimination</li>
	<li><strong>⚡ Faster Builds:</strong> Improved build performance over legacy versions</li>
	<li><strong>📦 Smaller Bundles:</strong> More efficient CSS generation</li>
	<li><strong>🔄 Lazy Loading:</strong> Load extensions and components only when needed</li>
	<li><strong>⏱️ Debounced Updates:</strong> Throttle auto-save and real-time features</li>
	<li><strong>🖥️ Virtual Scrolling:</strong> For large documents, implement virtual scrolling</li>
	<li><strong>🧠 Memory Management:</strong> Clean up event listeners and subscriptions</li>
</ul>

<div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mt-4 rounded-r-md">
	<div class="flex">
		<div class="flex-shrink-0">
			<iconify-icon icon="fa6-solid:rocket" class="text-blue-500 w-5 h-5"></iconify-icon>
		</div>
		<div class="ml-3">
			<h4 class="text-sm font-medium text-blue-800 dark:text-blue-200">Tailwind v4 Performance Benefits</h4>
			<p class="mt-2 text-sm text-blue-700 dark:text-blue-300">
				Tailwind v4's modern architecture provides up to 50% faster builds and 30% smaller CSS bundles compared to v3.x, 
				making your Tipex editor load faster and perform better.
			</p>
		</div>
	</div>
</div>

<blockquote class="mt-8">
	<p class="text-gray-700 dark:text-gray-300">
		<strong>Best Practices with Tailwind v4:</strong> When customizing Tipex, leverage Tailwind v4's `@layer components`, 
		`@theme` configuration, and `@custom-variant` features. Always test your changes across different devices and browsers. 
		The modern Tailwind v4 architecture ensures better performance and maintainability compared to legacy versions.
	</p>
</blockquote>

<h2 class="mt-8">Advanced Tailwind v4 Theming</h2>
<p>
	Create sophisticated themes using Tailwind v4's advanced features. Here's a complete example of a premium theme configuration:
</p>

<Highlight language={typescript} code={advanceCodes.tailwindV4Theming} />

<p class="mt-4">
	This example demonstrates Tailwind v4's powerful theming capabilities including gradient backgrounds, 
	advanced shadows, custom scrollbars, and sophisticated component styling that would be much more complex in older Tailwind versions.
</p>

<blockquote class="mt-8">
	<p class="text-gray-700 dark:text-gray-300">
		<strong>🚫 Why Tailwind v4 Only:</strong> Tipex exclusively supports and promotes Tailwind CSS v4 because it represents the future of utility-first CSS. 
		The new architecture provides native CSS custom property integration, better performance, improved developer experience, and more maintainable code. 
		We strongly discourage and do NOT support using older Tailwind versions (v1.x, v2.x, v3.x) as they lack the modern features that make Tipex's theming system possible.
		<br><br>
		<strong class="text-red-600 dark:text-red-400">⚠️ Legacy Tailwind Warning:</strong> Attempting to use Tipex with older Tailwind versions will result in broken styling, 
		missing features, and poor performance. Upgrade to Tailwind v4 immediately.
	</p>
</blockquote>