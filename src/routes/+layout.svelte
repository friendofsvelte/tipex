<script>
    import '../app.postcss';
    import '../root.css';
    import Footer from "$item/Footer.svelte";
</script>

<div class="home-wrapper">
    <slot/>
    <Footer/>
</div>

<style lang="postcss">
    .home-wrapper {
        @apply flex flex-col items-center justify-center;
        @apply py-10 px-3;
    }

</style>