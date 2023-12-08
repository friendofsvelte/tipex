<script lang="ts">
    import {onMount, onDestroy, SvelteComponent} from 'svelte';
    import "iconify-icon";
    import {Editor} from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import {FloatingMenu} from "@tiptap/extension-floating-menu";
    import {tipexEditor} from "$lib/tipex/editor_store";
    import Controls from "$lib/tipex/Controls.svelte";
    import AcceptLink from "$lib/tipex/link/AcceptLink.svelte";
    import {defaultExtensions} from "$lib/tipex/default";

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

    $: isEditorFocused = !!($tipexEditor && 'focused' in $tipexEditor.view && $tipexEditor.view['focused']);

    export let htmlContent = '';
    export let className = '';
    export let style = '';
    export let focusOnEdit = true;
    export let controlElement = Controls;
    export let headComponent: undefined | typeof SvelteComponent;
    export let foolComponent: undefined | typeof SvelteComponent;
</script>

{#if 'floatingMenu' in extensions}
    <AcceptLink bind:editLinkElement/>
{/if}

<div class="tipex-editor {className}"
     {style} class:isEditorFocused class:focusOnEdit>
    <div class="tipex-editor-wrap">
        {#if headComponent}
            <svelte:component this={headComponent}/>
        {/if}
        <div class="tipex-editor-section" bind:this={tipexEditorElement}></div>
        {#if controlElement}
            <svelte:component this={controlElement}>
                <div class="tipex-utilities">
                    <slot name="utilities"/>
                </div>
            </svelte:component>
        {/if}
        {#if foolComponent}
            <svelte:component this={foolComponent}/>
        {/if}
    </div>
</div>
