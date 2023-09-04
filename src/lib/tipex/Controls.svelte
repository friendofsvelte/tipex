<script lang="ts">
    import {tipexEditor, utilityButtonsComponent} from "$lib/tipex/editorStore";
</script>


{#if $tipexEditor}
    <div class="tipex-controller justify-between">
        <div class="flex gap-3 flex-wrap justify-between w-full">
            <div class="flex gap-2">
                <button
                        on:click={() => $tipexEditor?.chain().focus().toggleHeading({ level: 1 }).run()}
                        class="edit-button edit-btn-h1"
                        class:active={$tipexEditor?.isActive('heading', { level: 1 })}
                >
                    H1
                </button>

                <button
                        on:click={() => $tipexEditor?.chain().focus().toggleHeading({ level: 2 }).run()}
                        class="edit-button edit-btn-h2"
                        class:active={$tipexEditor?.isActive('heading', { level: 2 })}
                >
                    H2
                </button>

                <button
                        on:click={() => $tipexEditor?.chain().focus().setParagraph().run()}
                        class="edit-button edit-btn-hp"
                        class:active={$tipexEditor?.isActive('paragraph')}
                >
                    <iconify-icon icon="fa6-solid:paragraph"/>
                </button>

                <button
                        on:click={() => $tipexEditor?.chain().focus().toggleBold().run()}
                        class="edit-button edit-btn-bold"
                        class:active={$tipexEditor?.isActive('bold')}
                >
                    <iconify-icon icon="fa6-solid:bold"/>
                </button>

                <button
                        on:click={() => $tipexEditor?.chain().focus().toggleItalic().run()}
                        class="edit-button edit-btn-italic"
                        class:active={$tipexEditor?.isActive('italic')}
                >
                    <iconify-icon icon="fa6-solid:italic"/>
                </button>

                <button
                        on:click={() => $tipexEditor?.chain().focus().toggleCode().run()}
                        class="edit-button edit-btn-code"
                        class:active={$tipexEditor?.isActive('code')}
                >
                    <iconify-icon icon="fa6-solid:code"/>
                </button>

            </div>
            <div class="flex gap-2">
                {#if $utilityButtonsComponent !== undefined}
                    <svelte:component this={$utilityButtonsComponent}/>
                {/if}
            </div>
        </div>
    </div>
{/if}
