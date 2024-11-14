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
	import Fa6SolidParagraph from '$lib/tipex/icons/Fa6SolidParagraph.svelte';
	import Fa6SolidBold from '$lib/tipex/icons/Fa6SolidBold.svelte';
	import Fa6SolidItalic from '$lib/tipex/icons/Fa6SolidItalic.svelte';
	import Fa6SolidCode from '$lib/tipex/icons/Fa6SolidCode.svelte';

	let { children, tipex }: ControlsProps = $props();
</script>

{#if tipex}
	<div class="tipex-controller">
		<div class="tipex-basic-controller-wrapper">
			<button
				aria-label="Heading 1"
				onclick={() => tipex?.chain().focus().toggleHeading({ level: 1 }).run()}
				class:active={tipex?.isActive('heading', { level: 1 })}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
			>
				H1
			</button>

			<button
				aria-label="Heading 2"
				onclick={() => tipex?.chain().focus().toggleHeading({ level: 2 }).run()}
				class:active={tipex?.isActive('heading', { level: 2 })}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
			>
				H2
			</button>

			<button
				aria-label="Paragraph/Normal text"
				onclick={() => tipex?.chain().focus().setParagraph().run()}
				class:active={tipex?.isActive('paragraph')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
			>
				<Fa6SolidParagraph display class="h-4 w-4" />
			</button>

			<button
				aria-label="Bold"
				onclick={() => tipex?.chain().focus().toggleBold().run()}
				class:active={tipex?.isActive('bold')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
			>
				<Fa6SolidBold display class="h-4 w-4" />
			</button>

			<button
				aria-label="Italic"
				onclick={() => tipex?.chain().focus().toggleItalic().run()}
				class:active={tipex?.isActive('italic')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
			>
				<Fa6SolidItalic display class="h-4 w-4" />
			</button>

			<button
				aria-label="Code"
				onclick={() => tipex?.chain().focus().toggleCode().run()}
				class:active={tipex?.isActive('code')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
			>
				<Fa6SolidCode display class="h-4 w-4" />
			</button>

		</div>
		{@render children?.()}
	</div>
{/if}
