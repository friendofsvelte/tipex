<script lang="ts" context="module">
	import type { Snippet } from 'svelte';
	import type { TipexEditor } from './Tipex.svelte';

	export interface DefaultControlsProps {
		children?: Snippet;
		tipex: TipexEditor;
	}
</script>

<script lang="ts">
	let { children, tipex }: DefaultControlsProps = $props();
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
				<iconify-icon icon="fa6-solid:paragraph"></iconify-icon>
			</button>

			<button
				aria-label="Bold"
				onclick={() => tipex?.chain().focus().toggleBold().run()}
				class:active={tipex?.isActive('bold')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
			>
				<iconify-icon icon="fa6-solid:bold"></iconify-icon>
			</button>

			<button
				aria-label="Italic"
				onclick={() => tipex?.chain().focus().toggleItalic().run()}
				class:active={tipex?.isActive('italic')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
			>
				<iconify-icon icon="fa6-solid:italic"></iconify-icon>
			</button>

			<button
				aria-label="Code"
				onclick={() => tipex?.chain().focus().toggleCode().run()}
				class:active={tipex?.isActive('code')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
			>
				<iconify-icon icon="fa6-solid:code"></iconify-icon>
			</button>

		</div>
		{@render children?.()}
	</div>
{/if}
