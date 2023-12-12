<script>
    import ApplyLink from "$lib/tipex/link/ApplyLink.svelte";
    import {tipexEditor} from "$lib/tipex/editor_store";

    let enableLinkEdit = false;
</script>

{#if !enableLinkEdit}
    <button
            type="button"
            class="tipex-action-button tipex-click-effect"
            on:click={() => {
            navigator.clipboard.writeText($tipexEditor?.getHTML() || '');
            $tipexEditor?.chain().focus().run();
        }}>
        <iconify-icon icon="fa6-solid:copy"/>
    </button>
    <slot/>
{/if}

<button
        on:click={() => {
            enableLinkEdit=!enableLinkEdit
        }}
        class="tipex-action-button tipex-click-effect"
        class:active={enableLinkEdit}
>
    <iconify-icon icon="fa6-solid:link"/>
</button>

<ApplyLink bind:enableLinkEdit={enableLinkEdit}/>
