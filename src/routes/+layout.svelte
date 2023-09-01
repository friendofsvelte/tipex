<script>
    import '../app.postcss';
    import '../root.postcss';
</script>

<div class="home-wrapper">
    <slot/>
</div>

<style lang="postcss">
    .home-wrapper {
        @apply flex flex-col items-center justify-center;
        @apply py-10 px-3;
    }
</style>