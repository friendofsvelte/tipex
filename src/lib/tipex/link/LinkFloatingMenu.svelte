<script lang="ts" module>
	export { linkFloatingMenu } from './linkFloatingMenu.js';
	export type { LinkFloatingMenuProps } from './linkFloatingMenu.js';
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Editor } from '@tiptap/core';
	import { onMount } from 'svelte';
	import { cn } from '$lib/helper/cls.js';
	import { linkFloatingMenu } from './linkFloatingMenu.js';
	import Fa6SolidXmark from '../icons/Fa6SolidXmark.svelte';
	import Fa6SolidCheck from '../icons/Fa6SolidCheck.svelte';
	import Fa6SolidArrowUpRightFromSquare from '../icons/Fa6SolidArrowUpRightFromSquare.svelte';

	let {
		floatingRef = $bindable(),
		tipex,
		class: className = '',
		groupClass = '',
		buttonClass = ''
	}: LinkFloatingMenuProps = $props();

	let isVisible = $state(false);

	// Get the slots from linkFloatingMenu with our configuration
	const { group, button } = $derived(
		linkFloatingMenu({
			visible: isVisible
		})
	);

	const groupClasses = $derived(cn(group(), groupClass));
	const buttonClasses = $derived(cn(button(), buttonClass));

	function handleAcceptLink() {
		if (tipex instanceof Editor) {
			tipex.chain().focus(tipex.state.selection.$anchor.pos - tipex.state.selection.$anchor.parentOffset).run();
		}
	}

	function handleCancelLink() {
		if (tipex instanceof Editor) {
			tipex.chain().focus().unsetLink().run();
		}
	}

	function handleOpenLink() {
		if (tipex instanceof Editor) {
			window.open(tipex.getAttributes('link').href, 'popup', `width=700,height=900,location=0,top=0,right=0`);
		}
	}
</script>

<div
	class={groupClasses}
	bind:this={floatingRef}
	transition:fade
>
	<button
		type="button"
		class={buttonClasses}
		onclick={handleOpenLink}
		aria-label="Open link in new tab"
	>
		<Fa6SolidArrowUpRightFromSquare class="h-3 w-3" />
	</button>
	<button
		type="button"
		class={buttonClasses}
		onclick={handleAcceptLink}
		aria-label="Accept link"
	>
		<Fa6SolidCheck class="h-3 w-3" />
	</button>
	<button
		type="button"
		class={buttonClasses}
		onclick={handleCancelLink}
		aria-label="Cancel link"
	>
		<Fa6SolidXmark display class="h-3 w-3" />
	</button>
</div>