<script lang="ts">
	import EditLinkMenu from '../link/EditLinkMenu.svelte';
	import Fa6SolidCopy from '../icons/Fa6SolidCopy.svelte';
	import { cn } from '$lib/helper/cls.js';
	import { utility, type UtilityProps } from './utility.js';

	let {
		children,
		tipex,
		class: className = '',
		buttonClass = ''
	}: UtilityProps = $props();

	let enableLinkEdit = $state(false);

	// Get the slots from utility
	const { button } = $derived(utility());

	const buttonClasses = $derived(cn(button(), buttonClass));

	function copy() {
		navigator.clipboard.writeText(tipex?.getHTML() || '');
		tipex?.chain().focus().run();
	}
</script>

{#if !enableLinkEdit}
	<button
		class={buttonClasses}
		onclick={copy}
		type="button"
		aria-label="Copy HTML">
		<Fa6SolidCopy class="h-4 w-4" />
	</button>
	{@render children?.()}
{/if}

<EditLinkMenu bind:enableLinkEdit {tipex} />