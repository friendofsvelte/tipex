<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { TipexEditor } from './Tipex.svelte';

	/**
	 * Defines the properties for the default Controls component.
	 */
	export interface ControlsProps {
		children?: Snippet;
		tipex: TipexEditor;
	}
</script>

<script lang="ts">
	import Fa6SolidParagraph from './icons/Fa6SolidParagraph.svelte';
	import Fa6SolidBold from './icons/Fa6SolidBold.svelte';
	import Fa6SolidItalic from './icons/Fa6SolidItalic.svelte';
	import Fa6SolidCode from './icons/Fa6SolidCode.svelte';

	let { children, tipex }: ControlsProps = $props();
</script>

{#if tipex}
	<div class="tipex-controller">
		<div class="tipex-basic-controller-wrapper">
			<button
				onclick={() => tipex?.chain().focus().toggleHeading({ level: 1 }).run()}
				class:active={tipex?.isActive('heading', { level: 1 })}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Heading 1"
				type="button"
			>
				H1
			</button>

			<button
				onclick={() => tipex?.chain().focus().toggleHeading({ level: 2 }).run()}
				class:active={tipex?.isActive('heading', { level: 2 })}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Heading 2"
				type="button"
			>
				H2
			</button>

			<button
				onclick={() => tipex?.chain().focus().setParagraph().run()}
				class:active={tipex?.isActive('paragraph')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Paragraph/Normal text"
				type="button"
			>
				<Fa6SolidParagraph display class="h-4 w-4" />
			</button>

			<button
				onclick={() => tipex?.chain().focus().toggleBold().run()}
				class:active={tipex?.isActive('bold')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Bold"
				type="button"
			>
				<Fa6SolidBold display class="h-4 w-4" />
			</button>

			<button
				onclick={() => tipex?.chain().focus().toggleItalic().run()}
				class:active={tipex?.isActive('italic')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Italic"
				type="button"
			>
				<Fa6SolidItalic display class="h-4 w-4" />
			</button>

			<button
				onclick={() => tipex?.chain().focus().toggleCode().run()}
				class:active={tipex?.isActive('code')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Code"
				type="button"
			>
				<Fa6SolidCode display class="h-4 w-4" />
			</button>

		</div>
		{@render children?.()}
	</div>
{/if}
