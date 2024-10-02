<script lang="ts" context="module">
	import { type Snippet } from 'svelte';
	import EditLinkMenu from '$lib/tipex/link/EditLinkMenu.svelte';
	import type { TipexEditor } from './Tipex.svelte';

	export interface UtilityProps {
		children?: Snippet;
		tipex: TipexEditor;
	}
</script>

<script lang="ts">
	let { children, tipex }: UtilityProps = $props();

	let enableLinkEdit = $state(false);
</script>

{#if !enableLinkEdit}
	<button
		type="button"
		class="tipex-edit-button tipex-button-extra tipex-button-rigid"
		onclick={() => {
            navigator.clipboard.writeText(tipex?.getHTML() || '');
            tipex?.chain().focus().run();
        }}>
		<iconify-icon icon="fa6-solid:copy"></iconify-icon>
	</button>
	{@render children?.()}
{/if}

<EditLinkMenu bind:enableLinkEdit />
