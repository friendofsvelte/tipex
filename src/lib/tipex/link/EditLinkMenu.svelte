<script lang="ts" module>
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

<div class="relative">
	{#if enableLinkEdit}
		<div class="tipex-link-edit-input-group">
			<input type="text" placeholder="Your link here" bind:this={linkInputRef}
						 value={tipex?.getAttributes('link').href || ''} />
			<button class="save-button" type="button" onclick={handleLinkAndSave}>
				Save
			</button>
			<button class="close-button" type="button" onclick={handleEditLinkToggle} aria-label="Close link editor">
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
					<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
				</svg>
			</button>
		</div>
	{/if}
	
	<button
		onclick={handleEditLinkToggle}
		class="tipex-edit-button tipex-button-extra tipex-button-rigid"
		class:active={enableLinkEdit}
		aria-label="Edit link"
	>
		<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.576 13.481a3.5 3.5 0 0 0 4.95 4.95m2.473-7.423a3.5 3.5 0 0 1 0 4.95l-2.475 2.475m-2.475-7.425l-2.475 2.475m12.857-2.957a3.5 3.5 0 1 0-4.95-4.95M11.01 13a3.5 3.5 0 0 1 0-4.95l2.474-2.475M15.958 13l2.475-2.475"/>
		</svg>
	</button>
</div>
