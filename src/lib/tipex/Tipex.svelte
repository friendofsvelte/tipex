<script lang="ts">
    import {onMount} from 'svelte';
    import "iconify-icon";
    import {Editor} from '@tiptap/core';
    import type {Transaction} from "@tiptap/core";
    import StarterKit from '@tiptap/starter-kit';
    import DefaultControls from "$lib/tipex/DefaultControls.svelte";
    import {tipexEditor} from "./editor_store";
    import {defaultExtensions} from "./default";
    import type {Extensions} from "@tiptap/core/src/types.js";
    import {prepareDefaultFloatingMenu} from "$lib/tipex/prepare.js";
    import LinkFloatingMenu from "$lib/tipex/link/LinkFloatingMenu.svelte";

    let tipexEditorElement: HTMLDivElement;

    export let extensions = defaultExtensions;
    export let floatingMenu: boolean = false;
    export let floatingMenuElement: HTMLDivElement;
    export let onEditorCreate: (editor: Editor) => void = () => {
    };
    export let onEditorDestroy: () => void = () => {
    };
    export let onEditorUpdate: (event: { editor: Editor, transaction: Transaction }) => void = () => {
    };

    onMount(() => {
        if (floatingMenu) {
            extensions['floatingMenu'] = prepareDefaultFloatingMenu(floatingMenuElement);
        }
        $tipexEditor = new Editor({
            element: tipexEditorElement,
            extensions: [
                StarterKit.configure(),
                ...Object.values(extensions) as Extensions,
            ],
            content: htmlContent as string,
            onTransaction() {
                // force re-render so `editor.isActive` works as expected
                $tipexEditor = $tipexEditor;
            },
            autofocus: true,
            onCreate: ({editor}) => {
                onEditorCreate(editor);
            },
            onDestroy: onEditorDestroy,
            onUpdate: onEditorUpdate
        });
    });

    export let htmlContent = '';
    export let className = '';
    export let style = '';
    export let focusOnEdit = true;

    let editorsParent: HTMLDivElement;
    export let isEditorFocused: boolean = false;

    onMount(async () => {
        const onFocusChange = (_ev) => {
            isEditorFocused = editorsParent && editorsParent.contains(document.activeElement);
        }
        onFocusChange();
        document.addEventListener('focusin', onFocusChange);
        document.addEventListener('focusout', onFocusChange);
    });

    export let displayDefaultControls = true;
</script>

{#if floatingMenu}
    <LinkFloatingMenu bind:floatingMenuElement/>
{/if}

<div class="tipex-editor {className}"
     bind:this={editorsParent}
     {style}
     class:isEditorFocused
     class:focusOnEdit>
    <div class="tipex-editor-wrap">
        <slot name="headComponent"/>
        <div class="tipex-editor-section" bind:this={tipexEditorElement}></div>
        {#if $$slots.controlElement}
            <slot name="controlElement"/>
        {:else if displayDefaultControls}
            <DefaultControls>
                {#if $$slots.utilities}
                    <div class="tipex-utilities">
                        <slot name="utilities"/>
                    </div>
                {/if}
            </DefaultControls>
        {/if}
        <slot name="footComponent"/>
    </div>
</div>

