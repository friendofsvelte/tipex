const customizeControlImplementation = `<Tipex body={body}
   controlComponent={CustomControl}
   />`;

const addHeadFootComponent = `<script lang="ts">
  import { Tipex } from "@friendofsvelte/tipex";
  import type { Editor } from '@tiptap/core';
  import DocumentHeader from "./DocumentHeader.svelte";
  import DocumentFooter from "./DocumentFooter.svelte";
  import CustomToolbar from "./CustomToolbar.svelte";
  
  let editor = $state<Editor>();
  let wordCount = $state(0);
  let lastSaved = $state<Date | null>(null);
  
  // Reactive word count using runes
  $effect(() => {
    if (editor) {
      const text = editor.getText();
      wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    }
  });
  
  // Auto-save functionality using runes
  $effect(() => {
    if (editor) {
      const debounceTimer = setTimeout(() => {
        saveDocument(editor.getHTML());
        lastSaved = new Date();
      }, 2000);
      
      return () => clearTimeout(debounceTimer);
    }
  });
  
  async function saveDocument(content: string) {
    try {
      await fetch('/api/documents/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, timestamp: new Date().toISOString() })
      });
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }
</script>

<Tipex bind:tipex={editor} body={body}>
  {#snippet head(tipex)}
    <DocumentHeader 
      {wordCount} 
      {lastSaved}
      characterCount={tipex.getText().length}
      readingTime={Math.ceil(wordCount / 200)}
    />
  {/snippet}
  
  {#snippet controlComponent(tipex)}
    <CustomToolbar 
      {tipex} 
      onSave={() => saveDocument(tipex.getHTML())}
      onExport={() => exportDocument(tipex.getHTML())}
    />
  {/snippet}
  
  {#snippet foot(tipex)}
    <DocumentFooter 
      status={lastSaved ? 'saved' : 'unsaved'}
      {wordCount}
      version="1.2.3"
    />
  {/snippet}
</Tipex>`;

const tweakingExtensions = `<script lang="ts">
  import { defaultExtensions, Tipex } from "@friendofsvelte/tipex";
  import { Heading } from '@tiptap/extension-heading';
  import { TextAlign } from '@tiptap/extension-text-align';
  import { Highlight } from '@tiptap/extension-highlight';
  import { Underline } from '@tiptap/extension-underline';
  import { Table } from '@tiptap/extension-table';
  import { TableRow } from '@tiptap/extension-table-row';
  import { TableHeader } from '@tiptap/extension-table-header';
  import { TableCell } from '@tiptap/extension-table-cell';
  import type { Extensions } from '@tiptap/core';
  
  // Custom extension configuration
  const customExtensions: Extensions = [
    ...defaultExtensions.filter(ext => ext.name !== 'heading'), // Remove default heading
    
    // Custom heading configuration
    Heading.configure({
      levels: [1, 2, 3, 4], // Only allow H1-H4
      HTMLAttributes: {
        class: 'custom-heading',
      },
    }),
    
    // Text alignment support
    TextAlign.configure({
      types: ['heading', 'paragraph'],
      alignments: ['left', 'center', 'right', 'justify'],
      defaultAlignment: 'left',
    }),
    
    // Highlighting with multiple colors
    Highlight.configure({
      multicolor: true,
      HTMLAttributes: {
        class: 'custom-highlight',
      },
    }),
    
    // Underline support
    Underline.configure({
      HTMLAttributes: {
        class: 'custom-underline',
      },
    }),
    
    // Table support
    Table.configure({
      resizable: true,
      HTMLAttributes: {
        class: 'custom-table',
      },
    }),
    TableRow,
    TableHeader,
    TableCell,
  ];
  
  let body = \`
    <h1>Welcome to Enhanced Tipex</h1>
    <p>This editor now supports:</p>
    <ul>
      <li>Custom heading levels (H1-H4 only)</li>
      <li>Text alignment options</li>
      <li><mark data-color="#ffeb3b">Multi-color highlighting</mark></li>
      <li><u>Underlined text</u></li>
      <li>Resizable tables</li>
    </ul>
  \`;
</script>

<Tipex extensions={customExtensions} {body} />`;

const advancedCustomExtension = `<script lang="ts">
  import { Extension, Node } from '@tiptap/core';
  import { Plugin, PluginKey } from 'prosemirror-state';
  import { defaultExtensions, Tipex } from "@friendofsvelte/tipex";
  
  // Custom extension for word count with live updates
  const WordCountExtension = Extension.create({
    name: 'wordCount',
    
    addStorage() {
      return {
        words: 0,
        characters: 0,
        charactersWithSpaces: 0,
        sentences: 0,
        paragraphs: 0,
      };
    },
    
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('wordCount'),
          appendTransaction: (transactions, oldState, newState) => {
            const docChanged = transactions.some(transaction => transaction.docChanged);
            if (!docChanged) return;
            
            const text = newState.doc.textContent;
            const words = text.match(/\S+/g) || [];
            const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
            const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
            
            this.storage.words = words.length;
            this.storage.characters = text.replace(/\s/g, '').length;
            this.storage.charactersWithSpaces = text.length;
            this.storage.sentences = sentences.length;
            this.storage.paragraphs = paragraphs.length;
            
            // Dispatch custom event
            this.editor.emit('wordCountUpdate', this.storage);
          },
        }),
      ];
    },
  });
  
  // Custom callout/admonition extension
  const CalloutExtension = Node.create({
    name: 'callout',
    group: 'block',
    content: 'block+',
    
    addAttributes() {
      return {
        type: {
          default: 'info',
          parseHTML: element => element.getAttribute('data-type'),
          renderHTML: attributes => ({ 'data-type': attributes.type }),
        },
        title: {
          default: null,
          parseHTML: element => element.getAttribute('data-title'),
          renderHTML: attributes => ({ 'data-title': attributes.title }),
        },
      };
    },
    
    parseHTML() {
      return [{ tag: 'div[data-callout]' }];
    },
    
    renderHTML({ HTMLAttributes }) {
      return ['div', { ...HTMLAttributes, 'data-callout': '' }, 0];
    },
    
    addCommands() {
      return {
        setCallout: (attributes) => ({ commands }) => {
          return commands.wrapIn(this.name, attributes);
        },
        toggleCallout: (attributes) => ({ commands }) => {
          return commands.toggleWrap(this.name, attributes);
        },
      };
    },
  });
  
  // Emoji picker extension
  const EmojiExtension = Extension.create({
    name: 'emoji',
    
    addCommands() {
      return {
        insertEmoji: (emoji: string) => ({ commands }) => {
          return commands.insertContent(emoji);
        },
      };
    },
    
    addKeyboardShortcuts() {
      return {
        'Mod-Shift-e': () => {
          // Trigger emoji picker
          this.editor.emit('openEmojiPicker');
          return true;
        },
      };
    },
  });
  
  const enhancedExtensions = [
    ...defaultExtensions,
    WordCountExtension,
    CalloutExtension,
    EmojiExtension,
  ];
  
  let editor = $state();
  let stats = $state({ words: 0, characters: 0, sentences: 0, paragraphs: 0 });
  
  function handleEditorReady(tipex) {
    tipex.on('wordCountUpdate', (newStats) => {
      stats = newStats;
    });
    
    tipex.on('openEmojiPicker', () => {
      // Open emoji picker modal/dropdown
      showEmojiPicker(tipex);
    });
  }
  
  function showEmojiPicker(tipex) {
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇'];
    const picker = document.createElement('div');
    picker.className = 'emoji-picker';
    picker.innerHTML = emojis.map(emoji => 
      \`<button onclick="insertEmoji('\${emoji}')">\${emoji}</button>\`
    ).join('');
    
    document.body.appendChild(picker);
    
    window.insertEmoji = (emoji) => {
      tipex.commands.insertEmoji(emoji);
      document.body.removeChild(picker);
    };
  }
</script>

<Tipex 
  extensions={enhancedExtensions} 
  bind:tipex={editor}
  onready={handleEditorReady}
  body={body}
>
  {#snippet head()}
    <div class="editor-stats">
      <span>Words: {stats.words}</span>
      <span>Characters: {stats.characters}</span>
      <span>Sentences: {stats.sentences}</span>
      <span>Paragraphs: {stats.paragraphs}</span>
    </div>
  {/snippet}
  
  {#snippet controlComponent(tipex)}
    <div class="enhanced-controls">
      <!-- Callout buttons -->
      <button onclick={() => tipex.commands.setCallout({ type: 'info', title: 'Info' })}>
        Info Callout
      </button>
      <button onclick={() => tipex.commands.setCallout({ type: 'warning', title: 'Warning' })}>
        Warning Callout
      </button>
      
      <!-- Emoji button -->
      <button onclick={() => tipex.emit('openEmojiPicker')}>
        😀 Emoji
      </button>
    </div>
  {/snippet}
</Tipex>`;

const collaborativeExtension = `<script lang="ts">
  import { Extension } from '@tiptap/core';
  import { Collaboration } from '@tiptap/extension-collaboration';
  import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor';
  import * as Y from 'yjs';
  import { WebsocketProvider } from 'y-websocket';
  import { defaultExtensions, Tipex } from "@friendofsvelte/tipex";
  
  // Collaborative editing setup
  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider('ws://localhost:1234', 'tipex-room', ydoc);
  
  const collaborativeExtensions = [
    ...defaultExtensions,
    
    Collaboration.configure({
      document: ydoc,
    }),
    
    CollaborationCursor.configure({
      provider: provider,
      user: {
        name: 'John Doe',
        color: '#f783ac',
      },
    }),
  ];
  
  let editor = $state();
  let connectedUsers = $state([]);
  
  function handleEditorReady(tipex) {
    provider.on('status', event => {
      console.log('Connection status:', event.status);
    });
    
    provider.awareness.on('change', () => {
      connectedUsers = Array.from(provider.awareness.getStates().values());
    });
  }
</script>

<Tipex 
  extensions={collaborativeExtensions}
  bind:tipex={editor}
  onready={handleEditorReady}
  body=""
>
  {#snippet head()}
    <div class="collaboration-info">
      <span>Connected users: {connectedUsers.length}</span>
      <div class="user-avatars">
        {#each connectedUsers as user}
          <div 
            class="user-avatar" 
            style="background-color: {user.color}"
            title={user.name}
          >
            {user.name.charAt(0)}
          </div>
        {/each}
      </div>
    </div>
  {/snippet}
</Tipex>`;

const tailwindV4Theming = `/* Custom Tipex Theme with Tailwind v4 */
@import "tailwindcss";

@theme {
  /* Custom Tipex Design System */
  --color-tipex-*: initial;
  
  /* Brand Colors */
  --color-tipex-primary: #8b5cf6; /* Purple brand */
  --color-tipex-primary-dark: #a78bfa;
  --color-tipex-secondary: #64748b;
  --color-tipex-secondary-dark: #94a3b8;
  
  /* Custom Editor Theme */
  --color-tipex-editor-bg: #fefefe;
  --color-tipex-editor-bg-dark: #0c0a09;
  --color-tipex-editor-border: #e2e8f0;
  --color-tipex-editor-border-dark: #292524;
  --color-tipex-editor-text: #0f172a;
  --color-tipex-editor-text-dark: #fafaf9;
  
  /* Premium Control Colors */
  --color-tipex-control-bg: #ffffff;
  --color-tipex-control-bg-dark: #1c1917;
  --color-tipex-control-hover: #f8fafc;
  --color-tipex-control-hover-dark: #292524;
  --color-tipex-control-active: #ede9fe;
  --color-tipex-control-active-dark: #581c87;
  --color-tipex-control-border: #cbd5e1;
  --color-tipex-control-border-dark: #44403c;
  
  /* Enhanced Typography */
  --text-tipex-xs: 0.8125rem;
  --text-tipex-sm: 0.9375rem;
  --text-tipex-base: 1.0625rem;
  --text-tipex-lg: 1.1875rem;
  --text-tipex-xl: 1.375rem;
  --text-tipex-2xl: 1.625rem;
  
  /* Custom Spacing */
  --spacing-tipex-xs: 0.375rem;
  --spacing-tipex-sm: 0.625rem;
  --spacing-tipex-md: 1.125rem;
  --spacing-tipex-lg: 1.75rem;
  --spacing-tipex-xl: 2.25rem;
  
  /* Modern Shadows */
  --shadow-tipex-sm: 0 1px 3px 0 rgb(0 0 0 / 0.08);
  --shadow-tipex-md: 0 4px 8px -2px rgb(0 0 0 / 0.12);
  --shadow-tipex-lg: 0 8px 16px -4px rgb(0 0 0 / 0.16);
  --shadow-tipex-focus: 0 0 0 3px rgb(139 92 246 / 0.4);
  --shadow-tipex-focus-dark: 0 0 0 3px rgb(167 139 250 / 0.4);
}

/* Custom Dark Mode Variant */
@custom-variant dark (&:where(.dark, .dark *));

/* Premium Component Styling */
@layer components {
  .tipex-editor-premium {
    @apply bg-gradient-to-br from-tipex-editor-bg via-white to-tipex-control-bg
           dark:from-tipex-editor-bg-dark dark:via-stone-900 dark:to-tipex-control-bg-dark
           border-2 border-tipex-editor-border dark:border-tipex-editor-border-dark
           rounded-tipex-lg shadow-tipex-md;
  }
  
  .tipex-editor-premium.focused.focal {
    @apply shadow-tipex-focus dark:shadow-tipex-focus-dark
           border-tipex-primary dark:border-tipex-primary-dark
           outline-none ring-2 ring-tipex-primary/20 dark:ring-tipex-primary-dark/20;
  }
  
  .tipex-control-premium {
    @apply bg-tipex-control-bg/90 dark:bg-tipex-control-bg-dark/90
           backdrop-blur-sm border border-tipex-control-border/50 dark:border-tipex-control-border-dark/50
           rounded-tipex-md shadow-tipex-sm;
  }
  
  .tipex-button-premium {
    @apply px-tipex-md py-tipex-sm
           bg-gradient-to-b from-tipex-control-bg to-tipex-control-hover
           dark:from-tipex-control-bg-dark dark:to-tipex-control-hover-dark
           border border-tipex-control-border dark:border-tipex-control-border-dark
           rounded-tipex-sm shadow-tipex-sm
           hover:shadow-tipex-md hover:scale-105
           active:scale-95 active:shadow-tipex-sm
           transition-all duration-150 ease-out
           focus:outline-none focus:ring-2 focus:ring-tipex-primary/40;
  }
  
  .tipex-button-premium.active {
    @apply bg-gradient-to-b from-tipex-control-active to-tipex-primary/10
           dark:from-tipex-control-active-dark dark:to-tipex-primary-dark/10
           border-tipex-primary dark:border-tipex-primary-dark
           text-tipex-primary dark:text-tipex-primary-dark
           shadow-tipex-md ring-2 ring-tipex-primary/20 dark:ring-tipex-primary-dark/20;
  }
  
  .tipex-scrollbar-premium {
    scrollbar-width: thin;
    scrollbar-color: rgb(139 92 246 / 0.3) transparent;
  }
  
  .tipex-scrollbar-premium::-webkit-scrollbar {
    width: 6px;
  }
  
  .tipex-scrollbar-premium::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .tipex-scrollbar-premium::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, rgb(139 92 246 / 0.3), rgb(139 92 246 / 0.5));
    border-radius: 3px;
  }
  
  .tipex-scrollbar-premium::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, rgb(139 92 246 / 0.5), rgb(139 92 246 / 0.7));
  }
  
  .dark .tipex-scrollbar-premium {
    scrollbar-color: rgb(167 139 250 / 0.4) transparent;
  }
  
  .dark .tipex-scrollbar-premium::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, rgb(167 139 250 / 0.3), rgb(167 139 250 / 0.5));
  }
  
  .dark .tipex-scrollbar-premium::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, rgb(167 139 250 / 0.5), rgb(167 139 250 / 0.7));
  }
}`;

export default {
	customizeControlImplementation,
	addHeadFootComponent,
	tweakingExtensions,
	advancedCustomExtension,
	collaborativeExtension,
	tailwindV4Theming
};
