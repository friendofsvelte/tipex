<script lang="ts">
	import { scale } from 'svelte/transition';
	import { appearance } from '@friendofsvelte/toggle';
	import '@friendofsvelte/toggle/styles/Toggle.css';

	interface Props {
		className?: string;
	}

	let { className = '' }: Props = $props();
</script>

<button
	class="dark-mode-button group {className}"
	class:isDarkMode={appearance}
	in:scale
	onclick={() => (appearance.dark = !appearance.dark)}
	aria-label={appearance.dark ? 'Switch to light mode' : 'Switch to dark mode'}
>
	<iconify-icon
		icon={appearance.dark ? 'fa-solid:moon' : 'fa-solid:sun'}
		class="group-active:animate-spin"
	></iconify-icon>
</button>
