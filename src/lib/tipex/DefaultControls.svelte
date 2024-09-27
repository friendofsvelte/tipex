<script lang="ts" context="module">
	import type { Snippet } from 'svelte';
	import type { TipexEditor } from './Tipex.svelte';

	export interface DefaultControlsProps {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import type { TipexEditor } from './Tipex.svelte';
	import { getContext } from 'svelte';

	let tipex: TipexEditor = getContext('tipex');

	let { children }: DefaultControlsProps = $props();
</script>


{#if tipex.editor}
	<div class="tipex-controller">
		<div class="tipex-basic-controller-wrapper">
			<button
				aria-label="Heading 1"
				onclick={() => tipex.editor?.chain().focus().toggleHeading({ level: 1 }).run()}
				class:active={tipex.editor?.isActive('heading', { level: 1 })}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
			>
				H1
			</button>

			<button
				aria-label="Heading 2"
				onclick={() => tipex.editor?.chain().focus().toggleHeading({ level: 2 }).run()}
				class:active={tipex.editor?.isActive('heading', { level: 2 })}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
			>
				H2
			</button>

			<button
				aria-label="Paragraph/Normal text"
				onclick={() => tipex.editor?.chain().focus().setParagraph().run()}
				class:active={tipex.editor?.isActive('paragraph')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
			>
				<iconify-icon icon="fa6-solid:paragraph"></iconify-icon>
			</button>

			<button
				aria-label="Bold"
				onclick={() => tipex.editor?.chain().focus().toggleBold().run()}
				class:active={tipex.editor?.isActive('bold')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
			>
				<iconify-icon icon="fa6-solid:bold"></iconify-icon>
			</button>

			<button
				aria-label="Italic"
				onclick={() => tipex.editor?.chain().focus().toggleItalic().run()}
				class:active={tipex.editor?.isActive('italic')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
			>
				<iconify-icon icon="fa6-solid:italic"></iconify-icon>
			</button>

			<button
				aria-label="Code"
				onclick={() => tipex.editor?.chain().focus().toggleCode().run()}
				class:active={tipex.editor?.isActive('code')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
			>
				<iconify-icon icon="fa6-solid:code"></iconify-icon>
			</button>

		</div>
		{@render children?.()}
	</div>
{/if}
