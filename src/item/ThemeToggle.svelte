<script lang="ts">
	import { scale } from 'svelte/transition';
	import { appearance } from '@friendofsvelte/toggle';
	import '@friendofsvelte/toggle/styles/Toggle.css';
</script>


<button
	class="dark-mode-button group" class:isDarkMode={appearance} in:scale
	onclick={()=>appearance.dark=!appearance.dark}>
	<iconify-icon icon={appearance.dark ? 'fa-solid:moon' : 'fa-solid:sun'}
								class="group-active:animate-spin"></iconify-icon>
</button>
