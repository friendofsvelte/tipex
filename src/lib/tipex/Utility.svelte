<script lang="ts">
	import { getContext, type Snippet } from 'svelte';
	import EditLinkMenu from '$lib/tipex/link/EditLinkMenu.svelte';
	import type { TipexEditor } from './Tipex.svelte';

	let tipex: TipexEditor = getContext('tipex');

	interface UtilityProps {
		children?: Snippet;
	}

	let { children }: UtilityProps = $props();

	let enableLinkEdit = $state(false);
</script>

{#if !enableLinkEdit}
	<button
		type="button"
		class="tipex-edit-button tipex-button-extra tipex-button-rigid"
		onclick={() => {
            navigator.clipboard.writeText(tipex.editor?.getHTML() || '');
            tipex.editor?.chain().focus().run();
        }}>
		<iconify-icon icon="fa6-solid:copy"></iconify-icon>
	</button>
	{@render children?.()}
{/if}

<EditLinkMenu bind:enableLinkEdit />
