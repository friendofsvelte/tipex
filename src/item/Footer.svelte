<footer>
	<a href="https://github.com/friendofsvelte/tipex" target="_blank" rel="noopener">
		Maybe, Star us on Github?
	</a>

	<a href="https://bishwas.net" target="_blank">
		About Author
	</a>
</footer>


<style lang="postcss">
    footer {
        @apply flex flex-row items-center justify-between w-full max-w-3xl;
        @apply mt-10;
        @apply pt-3 px-2 border-t border-neutral-200 dark:border-neutral-700;
    }

    footer a {
        @apply text-gray-500 dark:text-gray-400;
        @apply hover:text-gray-700 dark:hover:text-gray-300;
        @apply text-sm;
    }
</style>