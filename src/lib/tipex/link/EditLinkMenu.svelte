<script lang="ts" context="module">
	export interface EditLinkMenuProps {
		enableLinkEdit?: boolean;
	}
</script>

<script lang="ts">
	import type { TipexEditor } from '../Tipex.svelte';
	import { getContext } from 'svelte';

	let { enableLinkEdit = $bindable(false) }: EditLinkMenuProps = $props();

	let tipex: TipexEditor = getContext('tipex');
	let linkInput: HTMLInputElement | undefined = $state();

	function handleLinkAndSave() {
		let isValidURL = linkInput.value.startsWith('http://')
			|| linkInput.value.startsWith('https://')
			|| linkInput.value.startsWith('mailto:')
			|| linkInput.value.startsWith('tel:')
			|| linkInput.value.startsWith('/');
		if (linkInput.value && isValidURL) {
			tipex.editor?.commands.setLink({ href: linkInput.value });
			enableLinkEdit = false;
		}
	}

	function handleEditLinkToggle() {
		enableLinkEdit = !enableLinkEdit;
	}

	function handlePasteLink() {
		navigator.clipboard.readText().then(text => {
			if (text.startsWith('http://')
				|| text.startsWith('https://')
				|| text.startsWith('mailto:')
				|| text.startsWith('tel:')
				|| text.startsWith('/')) {
				linkInput.value = text;
			}
		});
	}

	$effect(() => {
		if (enableLinkEdit) {
			handlePasteLink();
		}
	});
</script>

<button
	onclick={handleEditLinkToggle}
	class="tipex-edit-button tipex-button-extra tipex-button-rigid"
	class:active={enableLinkEdit}
>
	<iconify-icon icon={enableLinkEdit ? 'fa6-solid:xmark' : 'fa6-solid:link'}></iconify-icon>
</button>

{#if enableLinkEdit}
	<div class="tipex-link-edit-input-group">
		<input type="text" placeholder="Your link here" bind:this={linkInput}
					 value={tipex.editor?.getAttributes('link').href || ''} />
		<button class="tipex-edit-button tipex-button-extra tipex-button-free" type="button"
						onclick={handleLinkAndSave}>
			Save
		</button>
	</div>
{/if}
