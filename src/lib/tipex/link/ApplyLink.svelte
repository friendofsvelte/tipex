<script>
    import {tipexEditor} from "$lib/tipex/editorStore";
    import {faTimes} from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let openLinkEditMode = false;
    let linkInput = null;

    function applyLinkAndSave() {
        let isValidURL = linkInput.value.startsWith('http://')
            || linkInput.value.startsWith('https://')
            || linkInput.value.startsWith('mailto:')
            || linkInput.value.startsWith('tel:')
            || linkInput.value.startsWith('/');
        if (linkInput.value && isValidURL) {
            $tipexEditor?.commands.setLink({ href: linkInput.value });
            openLinkEditMode = false;
        }
    }
</script>

{#if openLinkEditMode}
    <div class="backdrop-filter backdrop-blur-sm rounded-md ml-auto w-full">
        <div class="flex gap-2 h-full w-full">
            <div class="w-full bg-gray-700 text-gray-200 rounded-md py-0 flex items-center divide-x divide-gray-500/30">
                <input
                        type="text"
                        class="bg-transparent focus:outline-0 pl-2 pr-1 w-full"
                        placeholder="Link"
                        bind:this={linkInput}
                        value={$tipexEditor?.getAttributes('link').href || ''}
                />
                <button
                        type="button"
                        class="px-2 h-full"
                        on:click={() => {
								openLinkEditMode = false;
							}}
                >
                    <Fa icon="{faTimes}" size="xs"/>
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