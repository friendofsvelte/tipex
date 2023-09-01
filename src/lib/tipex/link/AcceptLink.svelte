<script lang="ts">
    import {fade} from "svelte/transition";
    import Fa from "svelte-fa";
    import {faCheck, faExternalLink, faTimes} from "@fortawesome/free-solid-svg-icons";
    import {Editor} from "@tiptap/core";
    import {onMount} from "svelte";
    import {tipexEditor} from "$lib/tipex/editorStore.js";

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

<div class="link-hover-anchor" bind:this={editLinkElement}
     transition:fade
     style="display: {hideAnchorControl ? 'none' : 'flex'}">
    <!-- Open in new window: modifiedHoverAnchorStatus.dom.href -->
    <button type="button" class="link-hover-anchor-go-to link-hover" on:click={openLink}>
        <Fa icon={faExternalLink}/>
    </button>
    <button class="link-hover-anchor-accept link-hover" on:click={acceptLink}>
        <Fa icon={faCheck}/>
    </button>
    <button class="link-hover-anchor-cancel link-hover"
            on:click={cancelLink}>
        <Fa icon={faTimes}/>
    </button>
</div>
