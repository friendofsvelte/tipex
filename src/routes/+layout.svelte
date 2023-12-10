<script>
    import '../app.postcss';
    import '../root.css';
    import "svelte-highlight/styles/lightfair.css";
    import {page} from "$app/stores";
    import Footer from "$item/Footer.svelte";
    import ThemeToggle from "$item/ThemeToggle.svelte";
</script>

<div class="home-wrapper">
    {#if $page.url.pathname !== '/'}
        <ThemeToggle className="fixed top-5 right-7"/>
    {/if}
    <div class="max-w-4xl w-full">
        <slot/>
    </div>
    <Footer/>
</div>

<style lang="postcss">
    .home-wrapper {
        @apply flex flex-col items-center justify-center;
        @apply py-10 px-3;
    }
</style>