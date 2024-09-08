<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Editor } from '@tiptap/core';
	import { onMount } from 'svelte';
	import { tipex } from '$lib/tipex/editor.svelte';

	function handleAcceptLink() {
		if (tipex.editor instanceof Editor) {
			tipex.editor.chain().focus(tipex.editor.state.selection.$anchor.pos - tipex.editor.state.selection.$anchor.parentOffset).run();
		}
	}

	function handleCancelLink() {
		if (tipex.editor instanceof Editor) {
			tipex.editor.chain().focus().unsetLink().run();
		}
	}

	function handleOpenLink() {
		if (tipex.editor instanceof Editor) {
			window.open(tipex.editor.getAttributes('link').href, 'popup', `width=700,height=900,location=0,top=0,right=0`);
		}
	}

	interface LinkFloatingMenuProps {
		floatingMenuRef: HTMLDivElement | undefined;
	}

	let hideAnchorControl = $state(true);
	let { floatingMenuRef = $bindable() }: LinkFloatingMenuProps = $props();

	const computedStyleString = $derived(`display: ${hideAnchorControl ? 'none' : 'flex'}`);

	onMount(() => {
		hideAnchorControl = false;
	});
</script>

<div class="tipex-floating-group"
		 bind:this={floatingMenuRef}
		 style={computedStyleString}
		 transition:fade>
	<button type="button" class="tipex-floating-button" onclick={handleOpenLink}>
		<iconify-icon icon="fa6-solid:arrow-up-right-from-square"></iconify-icon>
	</button>
	<button type="button" class="tipex-floating-button" onclick={handleAcceptLink}>
		<iconify-icon icon="fa6-solid:check"></iconify-icon>
	</button>
	<button type="button" class="tipex-floating-button" onclick={handleCancelLink}>
		<iconify-icon icon="fa6-solid:xmark"></iconify-icon>
	</button>
</div>
