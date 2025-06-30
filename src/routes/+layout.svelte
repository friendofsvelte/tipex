<script lang="ts">
	import '../app.css';
	import '../root.css';
	import 'iconify-icon';
	import { page } from '$app/stores';
	import '$lib/tipex/styles/CodeBlock.css';
	import Footer from '$item/Footer.svelte';
	import ThemeToggle from '$item/ThemeToggle.svelte';
	import TrackAppearance from '@friendofsvelte/toggle';

	interface LayoutProps {
		children?: import('svelte').Snippet;
	}

	let { children }: LayoutProps = $props();
</script>

<TrackAppearance />
<div class="home-wrapper">
	{#if $page.url.pathname !== '/'}
		<ThemeToggle className="fixed top-5 right-7" />
	{/if}
	<div class="max-w-4xl w-full">
		{@render children?.()}
	</div>
	<Footer />
</div>

<style lang="postcss">
    @reference "../app.css";
    .home-wrapper {
        @apply flex flex-col items-center justify-center;
        @apply py-10 px-3;
    }
</style>