<script lang="ts" module>
	export { editLink, type EditLinkMenuProps } from './editLink.js';
</script>

<script lang="ts">
	import Fa6SolidXmark from '../icons/Fa6SolidXmark.svelte';
	import Fa6SolidLink from '../icons/Fa6SolidLink.svelte';
	import { cn } from '$lib/helper/cls.js';
	import { editLink } from './editLink.js';
	import type { EditLinkMenuProps } from './editLink.js';

	let {
		enableLinkEdit = $bindable(false),
		tipex,
		class: className = '',
		buttonClass = '',
		inputGroupClass = '',
		inputClass = '',
		saveButtonClass = ''
	}: EditLinkMenuProps = $props();

	let linkInputRef: HTMLInputElement | undefined = $state();

	// Get the slots from editLink with our configuration
	const { button, inputGroup, input, saveButton } = $derived(
		editLink({
			active: enableLinkEdit
		})
	);

	const buttonClasses = $derived(cn(button(), buttonClass));
	const inputGroupClasses = $derived(cn(inputGroup(), inputGroupClass));
	const inputClasses = $derived(cn(input(), inputClass));
	const saveButtonClasses = $derived(cn(saveButton(), saveButtonClass));

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
	class={buttonClasses}
	aria-label="Edit link"
>
	{#if enableLinkEdit}
		<Fa6SolidXmark class="h-4 w-4" />
	{:else}
		<Fa6SolidLink class="h-4 w-4" />
	{/if}
</button>

{#if enableLinkEdit}
	<div class={inputGroupClasses}>
		<input
			type="text"
			placeholder="Your link here"
			bind:this={linkInputRef}
			class={inputClasses}
			value={tipex?.getAttributes('link').href || ''}
		/>
		<button class={saveButtonClasses} type="button" onclick={handleLinkAndSave}>
			Save
		</button>
	</div>
{/if}