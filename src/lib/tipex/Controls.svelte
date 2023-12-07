<script lang="ts">
    import {tipexEditor} from "$lib/tipex/editorStore";
</script>


{#if $tipexEditor}
    <div class="tipex-controller">
        <div class="tipex-controller-wrapper">
            <div class="tipex-basic-controller-wrapper">
                <button
                        on:click={() => $tipexEditor?.chain().focus().toggleHeading({ level: 1 }).run()}
                        class="tipex-edit-button"
                        class:active={$tipexEditor?.isActive('heading', { level: 1 })}
                >
                    H1
                </button>

                <button
                        on:click={() => $tipexEditor?.chain().focus().toggleHeading({ level: 2 }).run()}
                        class="tipex-edit-button"
                        class:active={$tipexEditor?.isActive('heading', { level: 2 })}
                >
                    H2
                </button>

                <button
                        on:click={() => $tipexEditor?.chain().focus().setParagraph().run()}
                        class="tipex-edit-button"
                        class:active={$tipexEditor?.isActive('paragraph')}
                >
                    <iconify-icon icon="fa6-solid:paragraph"/>
                </button>

                <button
                        on:click={() => $tipexEditor?.chain().focus().toggleBold().run()}
                        class="tipex-edit-button"
                        class:active={$tipexEditor?.isActive('bold')}
                >
                    <iconify-icon icon="fa6-solid:bold"/>
                </button>

                <button
                        on:click={() => $tipexEditor?.chain().focus().toggleItalic().run()}
                        class="tipex-edit-button"
                        class:active={$tipexEditor?.isActive('italic')}
                >
                    <iconify-icon icon="fa6-solid:italic"/>
                </button>

                <button
                        on:click={() => $tipexEditor?.chain().focus().toggleCode().run()}
                        class="tipex-edit-button"
                        class:active={$tipexEditor?.isActive('code')}
                >
                    <iconify-icon icon="fa6-solid:code"/>
                </button>

            </div>
            <slot/>
        </div>
    </div>
{/if}
