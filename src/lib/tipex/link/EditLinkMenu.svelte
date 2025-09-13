<script lang="ts" module>
	import type { TipexEditor } from '../Tipex.svelte';

	export interface EditLinkMenuProps {
		tipex: TipexEditor;
	}
</script>

<script lang="ts">
	let { tipex }: EditLinkMenuProps = $props();

	async function handleEditLinkToggle() {
		const currentHref = tipex?.getAttributes('link').href || '';

		// Try to get URL from clipboard
		let defaultValue = currentHref;
		try {
			const clipboardText = await navigator.clipboard.readText();
			if (clipboardText && isValidURL(clipboardText.trim())) {
				defaultValue = clipboardText.trim();
			}
		} catch (error) {
			// Clipboard access failed, use current href
			console.log('Clipboard access not available');
		}

		const newHref = prompt('Enter URL:', defaultValue);

		if (newHref !== null && newHref.trim() !== '') {
			const trimmedHref = newHref.trim();

			if (isValidURL(trimmedHref)) {
				tipex?.commands.setLink({ href: trimmedHref });
			} else {
				alert('Please enter a valid URL (starting with http://, https://, mailto:, tel:, or /)');
			}
		}

		// Refocus the editor after prompt
		tipex?.chain().focus().run();
	}

	function isValidURL(url: string): boolean {
		return (
			url.startsWith('http://') ||
			url.startsWith('https://') ||
			url.startsWith('mailto:') ||
			url.startsWith('tel:') ||
			url.startsWith('/')
		);
	}
</script>

<button
	onclick={handleEditLinkToggle}
	class:active={tipex?.isActive('link')}
	class="tipex-edit-button tipex-button-extra tipex-button-rigid"
	aria-label="Edit link"
	title="Edit link"
>
	<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1"
			d="M5.576 13.481a3.5 3.5 0 0 0 4.95 4.95m2.473-7.423a3.5 3.5 0 0 1 0 4.95l-2.475 2.475m-2.475-7.425l-2.475 2.475m12.857-2.957a3.5 3.5 0 1 0-4.95-4.95M11.01 13a3.5 3.5 0 0 1 0-4.95l2.474-2.475M15.958 13l2.475-2.475"
		/>
	</svg>
</button>
