<script lang="ts">
    import {fade} from "svelte/transition";
    import {Editor} from "@tiptap/core";
    import {onMount} from "svelte";
    import {tipexEditor} from "$lib/tipex/editor_store";

    function acceptLink() {
        if ($tipexEditor instanceof Editor) {
            $tipexEditor.chain().focus($tipexEditor.state.selection.$anchor.pos - $tipexEditor.state.selection.$anchor.parentOffset).run();
        }
    }

    function cancelLink() {
        if ($tipexEditor instanceof Editor) {
            $tipexEditor.chain().focus().unsetLink().run();
        }
    }

    function openLink() {
        if ($tipexEditor instanceof Editor) {
            window.open($tipexEditor.getAttributes('link').href, 'popup', `width=700,height=900,location=0,top=0,right=0`);
        }
    }

    export let floatingMenuElement;

    let hideAnchorControl = true;
    onMount(() => {
        hideAnchorControl = false;
    });
</script>

<div class="tipex-floating-group" bind:this={floatingMenuElement}
     transition:fade
     style="display: {hideAnchorControl ? 'none' : 'flex'}">
    <button type="button" class="tipex-floating-button" on:click={openLink}>
        <iconify-icon icon="fa6-solid:arrow-up-right-from-square"/>
    </button>
    <button type="button" class="tipex-floating-button" on:click={acceptLink}>
        <iconify-icon icon="fa6-solid:check"/>
    </button>
    <button type="button" class="tipex-floating-button"
            on:click={cancelLink}>
        <iconify-icon icon="fa6-solid:xmark"/>
    </button>
</div>
