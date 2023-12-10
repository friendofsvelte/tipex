<script lang="ts">
    import {onMount} from "svelte";
    import {scale} from "svelte/transition";

    export function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        document.cookie = `appearanceMode=${isDarkMode ? 'dark' : 'light'}; path=/; max-age=31536000`;
        performDarkMode(isDarkMode);
    }

    function performDarkMode(isDarkModeValue: boolean) {
        document.cookie = `appearanceMode=${isDarkModeValue ? 'dark' : 'light'}; path=/; max-age=31536000`;
        if (isDarkModeValue) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    }

    function initDarkMode() {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        if (isDarkMode === null) {
            isDarkMode = prefersDarkMode.matches;
            performDarkMode(isDarkMode);
        }

        prefersDarkMode.addEventListener('change', e => {
            isDarkMode = e.matches;
            performDarkMode(isDarkMode);
        });
    }

    export let isDarkMode: boolean | null = null;
    onMount(() => {
        if (document.documentElement.classList.contains('dark')) {
            isDarkMode = true;
        } else if (document.documentElement.classList.contains('light')) {
            isDarkMode = false;
        }
        initDarkMode();
    });
    export let className: string = '';
</script>


{#if isDarkMode !== null}
    <button
            class="dark-mode-button group {className}"
            class:isDarkMode
            in:scale
            on:click={toggleDarkMode}>
        <iconify-icon icon={isDarkMode ? 'fa-solid:moon' : 'fa-solid:sun'} class="group-active:animate-spin"/>
    </button>
{:else}
    <div class="h-7 w-7"/>
{/if}


<style lang="postcss">
    .dark-mode-button {
        @apply bg-white dark:bg-stone-800;
        @apply rounded-xl p-1;
        @apply shadow-lg;
        @apply h-8 w-8;
        @apply cursor-pointer;
        @apply transition-transform duration-100;
        @apply hover:scale-110;
        @apply flex items-center justify-center;
    }

    .dark-mode-button:not(.isDarkMode) {
        @apply focus:text-blue-400 text-blue-900;
    }

    .dark-mode-button.isDarkMode {
        @apply focus:text-yellow-400 text-orange-200;
    }
</style>
