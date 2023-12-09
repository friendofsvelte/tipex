<script lang="ts">
    import {onMount, onDestroy} from 'svelte';
    import type {ComponentType} from 'svelte';
    import "iconify-icon";
    import {Editor} from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import {FloatingMenu} from "@tiptap/extension-floating-menu";
    import DefaultControls from "$lib/tipex/DefaultControls.svelte";
    import AcceptLink from "$lib/tipex/link/AcceptLink.svelte";
    import {tipexEditor} from "./editor_store";
    import {defaultExtensions} from "./default";

    let tipexEditorElement: HTMLDivElement;
    let editLinkElement: HTMLDivElement;
    export let extensions = defaultExtensions;

    onMount(() => {
        if (editLinkElement && 'floatingMenu' in extensions) {
            extensions['floatingMenu'] = FloatingMenu.configure({
                pluginKey: 'floatingMenuLinkEdit',
                element: editLinkElement,
                shouldShow: ({editor}) => {
                    return editor.isActive('link')
                },
                tippyOptions: {
                    placement: 'top-start',
                    zIndex: 0,
                    popperOptions: {
                        placement: 'top-start',
                        strategy: 'fixed',
                    },
                    appendTo: () => document.body,
                },
            });
        }

        $tipexEditor = new Editor({
            element: tipexEditorElement,
            extensions: [
                StarterKit.configure(),
                ...Object.values(extensions),
            ],
            content: htmlContent as string,
            onTransaction() {
                // force re-render so `editor.isActive` works as expected
                $tipexEditor = $tipexEditor;
            },
            autofocus: true
        });
    });

    onDestroy(() => {
        if ($tipexEditor) {
            $tipexEditor.destroy();
        }
    });

    export let htmlContent = '';
    export let className = '';
    export let style = '';
    export let focusOnEdit = true;
    export let controlElement: ComponentType | null = null;
    export let headComponent: ComponentType | null = null;
    export let footComponent: ComponentType | null = null;

    let editorsParent: HTMLDivElement;
    export let isEditorFocused: boolean = false;

    onMount(async () => {
        const onFocusChange = function () {
            isEditorFocused = editorsParent.contains(document.activeElement);
        }
        onFocusChange();
        document.addEventListener('focusin', onFocusChange);
        document.addEventListener('focusout', onFocusChange);
    });
</script>

{#if 'floatingMenu' in extensions}
    <AcceptLink bind:editLinkElement/>
{/if}

<div class="tipex-editor {className}"
     bind:this={editorsParent}
     {style}
     class:isEditorFocused
     class:focusOnEdit>
    <div class="tipex-editor-wrap">
        {#if headComponent}
            <svelte:component this={headComponent}/>
        {:else}
            <slot name="headComponent"/>
        {/if}
        <div class="tipex-editor-section" bind:this={tipexEditorElement}></div>
        {#if controlElement}
            <svelte:component this={controlElement}/>
        {:else}
            <DefaultControls>
                <div class="tipex-utilities">
                    <slot name="utilities"/>
                </div>
            </DefaultControls>
        {/if}
        {#if footComponent}
            <svelte:component this={footComponent}/>
        {:else}
            <slot name="footComponent"/>
        {/if}
    </div>
</div>
