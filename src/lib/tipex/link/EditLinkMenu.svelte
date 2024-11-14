<script lang="ts" module>
	import type { TipexEditor } from '../Tipex.svelte';

	export interface EditLinkMenuProps {
		enableLinkEdit?: boolean;
		tipex: TipexEditor;
	}
</script>

<script lang="ts">
	import Fa6SolidXmark from '../icons/Fa6SolidXmark.svelte';
	import Fa6SolidLink from '../icons/Fa6SolidLink.svelte';

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
	aria-label="Edit link"
>
	{#if enableLinkEdit}
		<Fa6SolidXmark display class="h-4 w-4" />
	{:else}
		<Fa6SolidLink display class="h-4 w-4" />
	{/if}
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
