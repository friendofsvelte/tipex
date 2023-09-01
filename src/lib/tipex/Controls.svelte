<script lang="ts">
    import {
        faBold,
        faCode,
        faCopy,
        faItalic,
        faParagraph, faSave,
        faSpinner,
        faLink
    } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import {tipexEditor, isLoading} from "$lib/tipex/editorStore";
    import ApplyLink from "$lib/tipex/link/ApplyLink.svelte";

    export let openLinkEditMode = false;
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
                    <Fa icon={faParagraph}/>
                </button>

                <button
                        on:click={() => $tipexEditor?.chain().focus().toggleBold().run()}
                        class="edit-button edit-btn-bold"
                        class:active={$tipexEditor?.isActive('bold')}
                >
                    <Fa icon={faBold}/>
                </button>

                <button
                        on:click={() => $tipexEditor?.chain().focus().toggleItalic().run()}
                        class="edit-button edit-btn-italic"
                        class:active={$tipexEditor?.isActive('italic')}
                >
                    <Fa icon={faItalic}/>
                </button>

                <button
                        on:click={() => $tipexEditor?.chain().focus().toggleCode().run()}
                        class="edit-button edit-btn-code"
                        class:active={$tipexEditor?.isActive('code')}
                >
                    <Fa icon={faCode}/>
                </button>

            </div>
            <div class="flex gap-2">
                <button
                        on:click={() => openLinkEditMode=!openLinkEditMode}
                        class="action-button w-12 click-effect"
                        class:active={openLinkEditMode}
                >
                    <Fa icon={faLink}/>
                </button>

                {#if !openLinkEditMode}
                    <!-- Copy HTML -->
                    <button
                            type="button"
                            class="action-button w-12 click-effect"
                            on:click={() => {
                                    navigator.clipboard.writeText($tipexEditor?.getHTML() || '');
                                    $tipexEditor?.chain().focus().run();
                            }}>
                        <Fa icon="{faCopy}"/>
                    </button>

                    <!-- Submit Button -->
                    <button
                            type="submit"
                            class="action-button w-12 click-effect"
                    >
                        <Fa icon={$isLoading ? faSpinner : faSave} spin={$isLoading}/>
                    </button>
                {/if}

            </div>
        </div>
        <ApplyLink bind:openLinkEditMode/>
    </div>
{/if}
