<script>
    import EditLinkMenu from "$lib/tipex/link/EditLinkMenu.svelte";
    import {tipexEditor} from "$lib/tipex/editor_store";

    let enableLinkEdit = false;
</script>

{#if !enableLinkEdit}
    <button
            type="button"
            class="tipex-edit-button tipex-button-extra tipex-button-rigid"
            on:click={() => {
            navigator.clipboard.writeText($tipexEditor?.getHTML() || '');
            $tipexEditor?.chain().focus().run();
        }}>
        <iconify-icon icon="fa6-solid:copy"/>
    </button>
    <slot/>
{/if}

<EditLinkMenu bind:enableLinkEdit/>
