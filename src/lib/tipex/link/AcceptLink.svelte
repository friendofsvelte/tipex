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
            window.open($tipexEditor.getAttributes('link').href, 'popup', `width=600,height=900,location=0,top=0,left=0`);
        }
    }

    export let editLinkElement;

    let hideAnchorControl = true;
    onMount(() => {
        hideAnchorControl = false;
    });
</script>

<div class="tipex-link-hover-anchor" bind:this={editLinkElement}
     transition:fade
     style="display: {hideAnchorControl ? 'none' : 'flex'}">
    <!-- Open in new window: modifiedHoverAnchorStatus.dom.href -->
    <button type="button" class="tipex-link-hover-anchor-go-to tipex-link-hover" on:click={openLink}>
        <iconify-icon icon="fa6-solid:external-link"/>
    </button>
    <button class="tipex-link-hover-anchor-accept tipex-link-hover" on:click={acceptLink}>
        <iconify-icon icon="fa6-solid:check"/>
    </button>
    <button class="tipex-link-hover-anchor-cancel tipex-link-hover"
            on:click={cancelLink}>
        <iconify-icon icon="fa6-solid:times"/>
    </button>
</div>
