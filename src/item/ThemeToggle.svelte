<script lang="ts">
    import {onMount} from "svelte";
    import {scale} from "svelte/transition";
    import {initDarkMode, isDarkMode, toggleDarkMode} from "@friendofsvelte/toggle";

    onMount(() => {
        initDarkMode();
    });
    export let className: string = '';
    import "@friendofsvelte/toggle/styles/Toggle.css"
</script>


{#if $isDarkMode !== null}
    <button
            class="dark-mode-button group {className}"
            class:isDarkMode={$isDarkMode}
            in:scale
            on:click={toggleDarkMode}>
        <iconify-icon icon={$isDarkMode ? 'fa-solid:moon' : 'fa-solid:sun'} class="group-active:animate-spin"></iconify-icon>
    </button>
{:else}
    <div class="h-7 w-7"/>
{/if}

