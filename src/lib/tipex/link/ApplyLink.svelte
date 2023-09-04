<script>
    import {tipexEditor} from "$lib/tipex/editorStore";

    export let enableLinkEdit = false;
    let linkInput = null;

    function applyLinkAndSave() {
        let isValidURL = linkInput.value.startsWith('http://')
            || linkInput.value.startsWith('https://')
            || linkInput.value.startsWith('mailto:')
            || linkInput.value.startsWith('tel:')
            || linkInput.value.startsWith('/');
        if (linkInput.value && isValidURL) {
            $tipexEditor?.commands.setLink({ href: linkInput.value });
            enableLinkEdit = false;
        }
    }
</script>

{#if enableLinkEdit}
    <div class="backdrop-filter backdrop-blur-sm rounded-md ml-auto w-full">
        <div class="flex gap-2 h-full w-full">
            <div class="link-edit-input-wrap">
                <input
                        type="text"
                        class="bg-transparent focus:outline-0 pl-2 pr-1 w-full"
                        placeholder="Link"
                        bind:this={linkInput}
                        value={$tipexEditor?.getAttributes('link').href || ''}
                />
                <button
                        type="button"
                        class="px-2 h-full flex items-center"
                        on:click={() => {
								enableLinkEdit = false;
							}}
                >
                    <iconify-icon icon="fa6-solid:xmark"></iconify-icon>
                </button>
            </div>

            <!-- Save -->
            <button
                    class="bg-gray-700 text-gray-200 rounded-md px-2 py-1"
                    type="button"
                    on:click={applyLinkAndSave}>
                Save
            </button>
        </div>
    </div>
{/if}