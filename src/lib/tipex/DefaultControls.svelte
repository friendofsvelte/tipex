<script lang="ts">
    import {tipexEditor} from "$lib/tipex/editor_store";
</script>


{#if $tipexEditor}
    <div class="tipex-controller">
        <div class="tipex-basic-controller-wrapper">
            <button
                    on:click={() => $tipexEditor?.chain().focus().toggleHeading({ level: 1 }).run()}
                    class:active={$tipexEditor?.isActive('heading', { level: 1 })}
                    class="tipex-edit-button tipex-button-extra tipex-button-rigid"
            >
                H1
            </button>

            <button
                    on:click={() => $tipexEditor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    class:active={$tipexEditor?.isActive('heading', { level: 2 })}
                    class="tipex-edit-button tipex-button-extra tipex-button-rigid"
            >
                H2
            </button>

            <button
                    on:click={() => $tipexEditor?.chain().focus().setParagraph().run()}
                    class:active={$tipexEditor?.isActive('paragraph')}
                    class="tipex-edit-button tipex-button-extra tipex-button-rigid"
            >
                <iconify-icon icon="fa6-solid:paragraph"/>
            </button>

            <button
                    on:click={() => $tipexEditor?.chain().focus().toggleBold().run()}
                    class:active={$tipexEditor?.isActive('bold')}
                    class="tipex-edit-button tipex-button-extra tipex-button-rigid"
            >
                <iconify-icon icon="fa6-solid:bold"/>
            </button>

            <button
                    on:click={() => $tipexEditor?.chain().focus().toggleItalic().run()}
                    class:active={$tipexEditor?.isActive('italic')}
                    class="tipex-edit-button tipex-button-extra tipex-button-rigid"
            >
                <iconify-icon icon="fa6-solid:italic"/>
            </button>

            <button
                    on:click={() => $tipexEditor?.chain().focus().toggleCode().run()}
                    class:active={$tipexEditor?.isActive('code')}
                    class="tipex-edit-button tipex-button-extra tipex-button-rigid"
            >
                <iconify-icon icon="fa6-solid:code"/>
            </button>

        </div>
        <slot/>
    </div>
{/if}
