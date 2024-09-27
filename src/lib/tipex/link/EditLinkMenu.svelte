<script lang="ts" context="module">
	import type { TipexEditor } from '../Tipex.svelte';
	export interface EditLinkMenuProps {
		enableLinkEdit?: boolean;
		tipex: TipexEditor;
	}
</script>

<script lang="ts">
	let { enableLinkEdit = $bindable(false), tipex }: EditLinkMenuProps = $props();

	let linkInputRef: HTMLInputElement | undefined = $state();

	function handleLinkAndSave() {
		if (!linkInputRef) return;
		let isValidURL = linkInputRef.value.startsWith('http://')
			|| linkInputRef.value.startsWith('https://')
			|| linkInputRef.value.startsWith('mailto:')
			|| linkInputRef.value.startsWith('tel:')
			|| linkInputRef.value.startsWith('/');
		if (linkInputRef.value && isValidURL) {
			tipex?.commands.setLink({ href: linkInputRef.value });
			enableLinkEdit = false;
		}
	}

	function handleEditLinkToggle() {
		enableLinkEdit = !enableLinkEdit;
	}

	function handlePasteLink() {
		navigator.clipboard.readText().then(text => {
			if (linkInputRef && (text.startsWith('http://')
				|| text.startsWith('https://')
				|| text.startsWith('mailto:')
				|| text.startsWith('tel:')
				|| text.startsWith('/'))) {
				linkInputRef.value = text;
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
		<input type="text" placeholder="Your link here" bind:this={linkInputRef}
					 value={tipex?.getAttributes('link').href || ''} />
		<button class="tipex-edit-button tipex-button-extra tipex-button-free" type="button"
						onclick={handleLinkAndSave}>
			Save
		</button>
	</div>
{/if}
