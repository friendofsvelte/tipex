<script lang="ts" module>
	import { type Snippet } from 'svelte';
	import EditLinkMenu from '../tipex/link/EditLinkMenu.svelte';
	import type { TipexEditor } from './Tipex.svelte';

	export interface UtilityProps {
		children?: Snippet;
		tipex: TipexEditor;
	}
</script>

<script lang="ts">
	import Fa6SolidCopy from './icons/Fa6SolidCopy.svelte';

	let { children, tipex }: UtilityProps = $props();

	let enableLinkEdit = $state(false);

	function copy() {
		navigator.clipboard.writeText(tipex?.getHTML() || '');
		tipex?.chain().focus().run();
	}
</script>

{#if !enableLinkEdit}
	<button
		class="tipex-edit-button tipex-button-extra tipex-button-rigid"
		onclick={copy}
		type="button"
		aria-label="Copy HTML">
		<Fa6SolidCopy display class="h-4 w-4" />
	</button>
	{@render children?.()}
{/if}

<EditLinkMenu bind:enableLinkEdit {tipex} />
