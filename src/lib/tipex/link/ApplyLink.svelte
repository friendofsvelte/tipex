<script lang="ts">
    import {tipexEditor} from "$lib/tipex/editor_store";
    import {onMount} from "svelte";
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
        console.log("Pasted text: ", 'clipboardText')
    }

    $: if (browser && enableLinkEdit) {
        pasteLink();
    }
</script>

{#if enableLinkEdit}
    <div class="tipex-link-edit-top">
        <div class="tipex-link-edit-wrap">
            <div class="tipex-link-edit-input-wrap">
                <input
                        type="text"
                        placeholder="Link"
                        bind:this={linkInput}
                        value={$tipexEditor?.getAttributes('link').href || ''}
                />
                <button
                        type="button"
                        on:click={() => {
								enableLinkEdit = false;
							}}
                >
                    <iconify-icon icon="fa6-solid:xmark"></iconify-icon>
                </button>
            </div>

            <!-- Save -->
            <button
                    type="button"
                    on:click={applyLinkAndSave}>
                Save
            </button>
        </div>
    </div>
{/if}