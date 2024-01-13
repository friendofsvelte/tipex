<script lang="ts">
    import {tipexEditor} from "$lib/tipex/editor_store";
    import {browser} from "$app/environment";

    export let enableLinkEdit = false;
    let linkInput: HTMLInputElement;

    function applyLinkAndSave() {
        let isValidURL = linkInput.value.startsWith('http://')
            || linkInput.value.startsWith('https://')
            || linkInput.value.startsWith('mailto:')
            || linkInput.value.startsWith('tel:')
            || linkInput.value.startsWith('/');
        if (linkInput.value && isValidURL) {
            $tipexEditor?.commands.setLink({href: linkInput.value});
            enableLinkEdit = false;
        }
    }

    function pasteLink() {
        navigator.clipboard.readText().then(text => {
            if (text.startsWith('http://')
                || text.startsWith('https://')
                || text.startsWith('mailto:')
                || text.startsWith('tel:')
                || text.startsWith('/')) {
                linkInput.value = text;
            }
        });
    }

    $: if (browser && enableLinkEdit) {
        pasteLink();
    }
</script>

<button
        on:click={() => {
            enableLinkEdit=!enableLinkEdit
        }}
        class="tipex-edit-button tipex-button-extra tipex-button-rigid"
        class:active={enableLinkEdit}
>
    <iconify-icon icon={enableLinkEdit ? 'fa6-solid:xmark' : 'fa6-solid:link'}/>
</button>

{#if enableLinkEdit}
    <div class="tipex-link-edit-input-group">
        <input type="text" placeholder="Your link here" bind:this={linkInput}
               value={$tipexEditor?.getAttributes('link').href || ''}/>
        <button class="tipex-edit-button tipex-button-extra tipex-button-free" type="button"
                on:click={applyLinkAndSave}>
            Save
        </button>
    </div>
{/if}
