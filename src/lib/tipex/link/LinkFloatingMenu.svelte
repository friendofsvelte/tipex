<script lang="ts" context="module">
	import type { TipexEditor } from '../Tipex.svelte';

	export interface LinkFloatingMenuProps {
		floatingMenuRef: HTMLDivElement | undefined;
		tipex: TipexEditor;
	}
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Editor } from '@tiptap/core';
	import { onMount } from 'svelte';

	let { floatingMenuRef = $bindable(), tipex }: LinkFloatingMenuProps = $props();

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

	let hideAnchorControl = $state(true);

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
